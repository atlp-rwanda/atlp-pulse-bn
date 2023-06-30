/* eslint-disable quotes */

import { Context, decodeAuthHeader } from '../context';
import { Event } from '../models/event.model';
import { User } from '../models/user';
import { sendInvitationEmail } from '../utils/sendInvitationEmail';
const eventResolvers: any = {
  Query: {
    getEvents: async (_: any, { authToken }: { authToken: string }) => {
      const decoded = decodeAuthHeader(authToken);
      return await Event.find({ user: decoded.userId });
    },
    getAcceptedEvents: async (_: any, { authToken }: { authToken: string }) => {
      const decoded = decodeAuthHeader(authToken);
      return await Event.find({
        acceptedUsers: decoded.userId,
      });
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
        guests,
      }: any,
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
      });
      // Send invitation emails to the guests
      const invitedGuests = await User.find({ _id: { $in: guests } });
      event.guests.push(...guests);

      for (const guest of invitedGuests) {
        sendInvitationEmail(guest.email, event.title,  event.start, event.id, event.hostName, event.timeToStart, event.timeToEnd);
      }
      await event.save();
      return event;
    },
    async respondToEventInvitation(
      _: any,
      { eventId, status, reason }: any,
      context: Context
    ) {
      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error('Event not Found');
      }
      event.invitationStatus = status;
      event.invitationReason = reason;
      if (status === 'accepted') {
        if (context.userId) {
          event.acceptedUsers.push((context?.userId as any));
        } else {
          throw new Error('User ID not found in the context');
        }
      }
      await event.save();
      return event;
    },
  },
};
export default eventResolvers;
