/* eslint-disable quotes */

import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import { decodeAuthHeader } from '../context'
import { Event } from '../models/event.model'
import { User } from '../models/user'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import {
  sendEventCancellations,
  sendEventInvitations,
  sendEventUpdates,
  sendInvitationCancellations,
} from '../helpers/sendEventEmails'

enum INVITEE_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

type EventResponse = {
  email: string
  eventId: string
  response: 'accepted' | 'declined'
}

const validateDates = (start: string, end: string): string | null => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const dateRegex =
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):(00|[0-5]\d):(00|[0-5]\d).\d{3}Z$/

  if (!dateRegex.test(start)) return 'Invalid start date'
  if (!dateRegex.test(end)) return 'Invalid end date'
  if (startDate > endDate) return 'Event should start before it ends'

  return null
}

const validateTime = (
  timeToStart: string,
  timeToEnd: string
): string | null => {
  const timeToStartArr = timeToStart.split(':')
  const timeToEndArr = timeToEnd.split(':')
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

  if (!timeRegex.test(timeToStart)) return 'Invalid start time'
  if (!timeRegex.test(timeToEnd)) return 'Invalid end time'
  if (parseInt(timeToStartArr[0]) > parseInt(timeToEndArr[0]))
    return 'Event should start before it ends'

  if (parseInt(timeToStartArr[0]) === parseInt(timeToEndArr[0])) {
    if (parseInt(timeToStartArr[1]) > parseInt(timeToEndArr[1]))
      return 'Event should start before it ends'
  }

  return null
}

const decodeEventResponseToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.SECRET!) as EventResponse
  } catch (err: any) {
    throw new GraphQLError('Invalid Token', {
      extensions: {
        code: 'INVALID_EVENT_TOKEN',
      },
    })
  }
}

const eventResolvers: any = {
  Query: {
    getEvents: async (_: any, { authToken }: { authToken: string }) => {
      const { userId } = decodeAuthHeader(authToken)
      const user = await User.findById(userId)
      if (!user) {
        throw new GraphQLError('No such user found', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        })
      }
      //get all events that belong to the user along with events they accepted
      return await Event.find({
        $or: [
          { user: userId },
          {
            invitees: {
              $elemMatch: {
                email: user.email,
                status: INVITEE_STATUS.ACCEPTED,
              },
            },
          },
        ],
      })
    },

    getAcceptedEvents: async (_: any, { authToken }: { authToken: string }) => {
      const { userId } = decodeAuthHeader(authToken)
      const user = await User.findById(userId)
      if (!user) {
        throw new GraphQLError('No such user found', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        })
      }
      const events = await Event.find({
        invitees: {
          $elemMatch: { email: user.email, status: INVITEE_STATUS.ACCEPTED },
        },
      })
      return events
    },
    getEvent: async (
      _: any,
      { eventId, authToken }: { eventId: string; authToken: string }
    ) => {
      const { userId } = decodeAuthHeader(authToken)
      const user = await User.findById(userId)
      if (!user) {
        throw new GraphQLError('No such user found', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        })
      }
      const event = await Event.findById(eventId)
      if (!event) {
        throw new GraphQLError('No such event found', {
          extensions: {
            code: 'EVENT_NOT_FOUND',
          },
        })
      }
      return event
    },
  },
  Mutation: {
    async createEvent(
      _: any,
      {
        title,
        hostName,
        start,
        end,
        timeToStart,
        timeToEnd,
        authToken,
        orgToken,
        invitees = [],
      }: any
    ) {
      const decoded = decodeAuthHeader(authToken)
      const user = await User.findById(decoded.userId)
      if (!user) {
        throw new GraphQLError('No such user found', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        })
      }
      if (user.role === 'trainee') {
        throw new GraphQLError('User not authorized', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      const dateErrorMsg = validateDates(start, end)
      if (dateErrorMsg) {
        throw new GraphQLError(dateErrorMsg, {
          extensions: {
            code: 'BAD_REQUEST',
          },
        })
      }
      const timeErrorMsg = validateTime(timeToStart, timeToEnd)
      if (timeErrorMsg) {
        throw new GraphQLError(timeErrorMsg, {
          extensions: {
            code: 'BAD_REQUEST',
          },
        })
      }
      const org = await checkLoggedInOrganization(orgToken)
      if (!org) {
        throw new GraphQLError('Invalid organization token', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      //add the person who invited
      invitees = [user.email, ...invitees]

      //check for non-existing users and users that do not belong to the organization
      const validUsers = await User.find({
        email: { $in: invitees },
        organizations: { $in: [org.name] },
      })
      const validEmails = validUsers.map((user) => user.email)
      const invalidEmails = invitees.filter(
        (email: string) => !validEmails.includes(email)
      )
      if (invalidEmails.length) {
        throw new GraphQLError(
          `Invitees contain invalid users ${invalidEmails.toString()}`,
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        )
      }
      const duplicates = invitees.filter(
        (email: string, index: number) => invitees.indexOf(email) !== index
      )
      if (duplicates.length) {
        throw new GraphQLError(
          `Invitees contain duplicated users ${duplicates.toString()}`,
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        )
      }
      const inviteeArray = invitees.map((email: string) => {
        return {
          email: email,
          status: INVITEE_STATUS.PENDING,
        }
      })

      //set invinting user's invitation status to accepted
      inviteeArray[0].status = INVITEE_STATUS.ACCEPTED
      const event = await Event.create({
        user: decoded.userId,
        title,
        hostName,
        start,
        end,
        timeToStart,
        timeToEnd,
        invitees: inviteeArray,
      })

      event.invitees.forEach(async (invitee) => {
        await sendEventInvitations(
          invitee.email,
          event.id,
          event.title,
          event.hostName,
          event.start,
          event.end,
          event.timeToStart,
          event.timeToEnd
        )
      })

      return event
    },

    //fix editEvent
    async editEvent(
      _: any,
      {
        eventId,
        title,
        hostName,
        start,
        end,
        timeToStart,
        timeToEnd,
        authToken,
        orgToken,
        invitees = [],
      }: any
    ) {
      const decoded = decodeAuthHeader(authToken)
      const user = await User.findById(decoded.userId)
      if (!user) {
        throw new GraphQLError('No such user found', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        })
      }
      if (user.role === 'trainee') {
        throw new GraphQLError('User not authorized', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }
      const dateErrorMsg = validateDates(start, end)
      if (dateErrorMsg) {
        throw new GraphQLError(dateErrorMsg, {
          extensions: {
            code: 'BAD_REQUEST',
          },
        })
      }
      const timeErrMsg = validateTime(timeToStart, timeToEnd)
      if (timeErrMsg) {
        throw new GraphQLError(timeErrMsg, {
          extensions: {
            code: 'BAD_REQUEST',
          },
        })
      }
      const org = await checkLoggedInOrganization(orgToken)
      if (!org) {
        throw new GraphQLError('Invalid organization token', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      const event = await Event.findById(eventId)
      if (!event) {
        throw new GraphQLError('No such event found', {
          extensions: {
            code: 'EVENT_NOT_FOUND',
          },
        })
      }

      if (event.user.toString() !== user._id.toString()) {
        throw new GraphQLError('User not authorized', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      //check for non-existing users and users that do not belong to the organization
      const validUsers = await User.find({
        email: { $in: invitees },
        organizations: { $in: [org.name] },
      })
      const validEmails = validUsers.map((user) => user.email)
      const invalidEmails = invitees.filter(
        (email: string) => !validEmails.includes(email)
      )
      if (invalidEmails.length) {
        throw new GraphQLError(
          `Invitees contain invalid users ${invalidEmails.toString()}`,
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        )
      }
      const duplicates = invitees.filter(
        (email: string, index: number) => invitees.indexOf(email) !== index
      )
      if (duplicates.length) {
        throw new GraphQLError(
          `Invitees contain duplicated users ${duplicates.toString()}`,
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        )
      }

      const oldInvitees = event.invitees.map((invitee) => {
        return invitee.email
      })

      const newInvitees = invitees.filter(
        (email: string) => !oldInvitees.includes(email)
      )
      const excludedInvitees = oldInvitees
        .slice(1)
        .filter((email: string) => !invitees.includes(email))

      event.title = title
      event.hostName = hostName
      event.start = start
      event.end = end
      event.timeToStart = timeToStart
      event.timeToEnd = timeToEnd

      event.invitees.push(
        ...newInvitees.map((email: string) => {
          return {
            email: email,
            status: INVITEE_STATUS.PENDING,
          }
        })
      )

      event.invitees = event.invitees.filter(
        (invitee) => !excludedInvitees.includes(invitee.email)
      )
      await event.save()

      if (newInvitees.length) {
        newInvitees.forEach(async (email: string) => {
          await sendEventInvitations(
            email,
            event.id,
            event.title,
            event.hostName,
            event.start,
            event.end,
            event.timeToStart,
            event.timeToEnd
          )
        })
      }

      if (excludedInvitees.length) {
        excludedInvitees.forEach(async (email: string) => {
          await sendInvitationCancellations(email, event.title)
        })
      }

      const inviteesToUpdate = event.invitees.map((invitee) => invitee.email)
      inviteesToUpdate.forEach(async (email: string) => {
        await sendEventUpdates(
          email,
          event.title,
          event.hostName,
          event.start,
          event.end,
          event.timeToStart,
          event.timeToEnd
        )
      })

      return event
    },

    async cancelEvent(_: any, { eventId, authToken }: any) {
      const decoded = decodeAuthHeader(authToken)
      const user = await User.findById(decoded.userId)
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        })
      }
      if (user.role === 'trainee') {
        throw new GraphQLError('User not authorized', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }
      const event = await Event.findById(eventId)
      if (!event) {
        throw new GraphQLError('No such event found', {
          extensions: {
            code: 'EVENT_NOT_FOUND',
          },
        })
      }
      if (event.user.toString() !== user._id.toString()) {
        throw new GraphQLError('User not authorized', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }
      await Event.findByIdAndDelete(eventId)
      event.invitees.forEach(async (invitee) => {
        await sendEventCancellations(invitee.email, event.title)
      })
      return event
    },

    async respondToEventInvitation(
      _: any,
      { eventToken, authToken }: { eventToken: string; authToken: string }
    ) {
      const { userId } = decodeAuthHeader(authToken)
      const { email, eventId, response } = decodeEventResponseToken(eventToken)
      const user = await User.findById(userId)
      if (!user) {
        throw new GraphQLError('No such user found', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        })
      }
      if (user.email !== email) {
        throw new GraphQLError('Invalid Token', {
          extensions: {
            code: 'INVALID_EVENT_TOKEN',
          },
        })
      }
      const event = await Event.findById(eventId)
      if (!event) {
        throw new GraphQLError('No such event found', {
          extensions: {
            code: 'EVENT_NOT_FOUND',
          },
        })
      }
      const existingInvitee = event.invitees.find(
        (invitee) => invitee.email === user.email
      )
      if (!existingInvitee) {
        throw new GraphQLError('No such event invitee found', {
          extensions: {
            code: 'INVITEE_NOT_FOUND',
          },
        })
      }
      existingInvitee.status = response
      await event.save()
      return event
    },
  },
}
export default eventResolvers
