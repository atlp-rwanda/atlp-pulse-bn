/* eslint-disable quotes */

import { decodeAuthHeader } from '../context'
import { Event } from '../models/event.model'
const eventResolvers: any = {
  Query: {
    getEvents: async (_: any, { authToken }: { authToken: string }) => {
      const decoded = decodeAuthHeader(authToken)
      return await Event.find({ user: decoded.userId })
    },
  },
  Mutation: {
    async createEvent(
      _: any,
      { title, hostName, start, end, timeToStart, timeToEnd, authToken }: any
    ) {
      const decoded = decodeAuthHeader(authToken)
      const event = await Event.create({
        user: decoded.userId,
        title,
        hostName,
        start,
        end,
        timeToStart,
        timeToEnd,
      })
      return event
    },
  },
}
export default eventResolvers
