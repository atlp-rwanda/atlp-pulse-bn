/* eslint-disable quotes */

import { decodeAuthHeader } from '../context';
import { Event } from '../models/event.model';
import { User } from '../models/user';
const eventResolvers: any = {
  Query: {
    getEvents: async (_: any, { authToken }: { authToken: string }) => {
      const decoded = decodeAuthHeader(authToken);
      return await Event.find({ user: decoded.userId });
    },
  },
  Mutation: {
    async createEvent(
      _: any,
      {
        guests,
        title,
        hostName,
        start,
        end,
        timeToStart,
        timeToEnd,
        authToken,
      }: any
    ) {
      const allGuests: any[] = [];
      const guestInfo = guests.split(',').map((v: string) => v.trim());

      for (let a = 0; a < guestInfo.length; a++) {
        allGuests[a] = await User.find({ email: guestInfo[a] });
      }
      console.log(allGuests);
      // const decoded = decodeAuthHeader(authToken);
      // const event = await Event.create({
      //   user: decoded.userId,
      //   title,
      //   hostName,
      //   start,
      //   end,
      //   timeToStart,
      //   timeToEnd,
      // });
      // return event;
      return {
        title: 'Suave990 Event',
        hostName: 'suave',
        start: '13:00',
        end: '12:00',
        timeToStart: '12/12/2023',
        timeToEnd: '12/12/2023',
      };
    },
  },
};
export default eventResolvers;
