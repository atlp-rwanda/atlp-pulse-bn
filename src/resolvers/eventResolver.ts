/* eslint-disable quotes */

import { Context, decodeAuthHeader } from '../context'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { Event } from '../models/event.model'
import { Notification } from '../models/notification.model'
import { User } from '../models/user'
import { sendEmail } from '../utils/sendEmail'
import { sendEmails } from '../utils/sendEmails'
import { sendInvitationEmail } from '../utils/sendInvitationEmail'
import generalTemplate from '../utils/templates/generalTemplate'
const eventResolvers: any = {
  Query: {
    getEvents: async (_: any, { authToken }: { authToken: string }) => {
      const decoded = decodeAuthHeader(authToken)
      return await Event.find({ user: decoded.userId })
    },
    getAcceptedEvents: async (_: any, { authToken }: { authToken: string }) => {
      const decoded = decodeAuthHeader(authToken)

      return await Event.find({
        acceptedUsers: decoded.userId,
      })
    },
  },
  Mutation: {
    async createEvent(
      _: any,
      { title, hostName, start, end, timeToStart, timeToEnd, guests }: any,
      context: Context
    ) {
      const event = await Event.create({
        user: context.userId,
        title,
        hostName,
        start,
        end,
        timeToStart,
        timeToEnd,
        guests,
        acceptedUsers: [],
      })

      // Send invitation emails to the guests
      const invitedGuests = await User.find({ email: { $in: guests } })
      event.guests.push(...guests)

      for (const guest of invitedGuests) {
        const content = generalTemplate({
          message:
            'You are invited to join the ' +
            event.title +
            ' meeting scheduled for ' +
            event.start +
            ' from ' +
            event.timeToStart +
            ' to ' +
            event.timeToEnd +
            '. The meeting will be hosted by ' +
            event.hostName +
            '. Your participation and attendance are highly appreciated, and we look forward to your valuable contributions during the meeting.',
          linkMessage: 'Follow this link to confirm invitation or cancel it.',
          buttonText: 'accept or reject',
          link: `${process.env.FRONTEND_LINK}/calendar/confirm?e=${event.id}`,
        })

        sendInvitationEmail(guest.email, content)
      }
      await event.save()
      return event
    },
    async respondToEventInvitation(
      _: any,
      { eventId, status, reason }: any,
      context: Context
    ) {
      const event = await Event.findById(eventId)
      if (!event) {
        throw new Error('Event not Found')
      }
      event.invitationStatus = status
      event.invitationReason = reason
      if (status === 'rejected') {
        // if (context.userId) {
        //   await sendEmails(
        //     process.env.ADMIN_EMAIL,
        //     process.env.ADMIN_PASS,
        //     process.env.EMAIL_USER,
        //     'Rejection of calendar',
        //     reason,
        //     'Dear sir',
        //     ""
        //   )
        // } else {
        //   throw new Error('User ID not found in the context')
        // }
        if (context.userId) {
          const addNotifications = await Notification.create({
            receiver: event.user,
            message: 'Hello, I refuse the invite because ' + reason,
            sender: context.userId,
            read: false,
            createdAt: new Date(),
          })

          // console.log('user11', addNotifications)
        } else {
          throw new Error('User ID not found in the context')
        }
      }
      console.log(context.email)
      if (status === 'accepted') {
        if (context.userId) {
          event.acceptedUsers.push(context?.userId as any)
        } else {
          throw new Error('User ID not found in the context')
        }
      }
      await event.save()
      return event
    },
  },
}
export default eventResolvers
