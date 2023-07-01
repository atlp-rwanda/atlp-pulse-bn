import { ApolloError, ValidationError } from 'apollo-server';
import Ticket from '../models/ticket.model';
import { Context } from '../context';
import { checkUserLoggedIn } from '../helpers/user.helpers';
import { Profile, User } from '../models/user';
import { Notification } from '../models/notification.model';

export type TicketType = InstanceType<typeof Ticket>;

async function getUserData(allTickets: Array<any>) {
  const tickets = allTickets.map(async (ticket: any) => {
    const profile = await Profile.findOne({
      user: ticket?.user?._id,
    }).lean();

    if (profile) {
      return {
        ...ticket,
        user: {
          ...ticket.user,
          firstName: profile.firstName,
          lastName: profile.lastName,
        },
      };
    } else {
      return {
        ...ticket,
        user: {
          ...ticket.user,
          firstName: '',
          lastName: '',
        },
      };
    }
  });

  return tickets;
}

const resolvers = {
  Query: {
    getAllTickets: async (_: any, arg: any, context: Context) => {
      try {
        (await checkUserLoggedIn(context))(['superAdmin']);

        let tickets = await Ticket.find()
          .populate({
            path: 'user',
            select: 'email',
          })
          .lean();

        tickets = await Promise.all(await getUserData(tickets));

        return tickets;
      } catch (error: any) {
        throw new ApolloError(error.message, '500');
      }
    },
  },

  Mutation: {
    createTicket: async (_: any, args: TicketType, context: Context) => {
      try {
        const { subject, message }: TicketType = args;

        if (!context.userId) throw new ValidationError('Loggin first');

        const ticket = await Ticket.create({
          user: context.userId,
          subject,
          message,
        });

        const superAdmin = await User.findOne({ role: 'superAdmin' });

        await Notification.create({
          receiver: superAdmin?._id,
          message: `Ticket has been sent to you. ${ticket._id}`,
          sender: context.userId,
          read: false,
          createdAt: new Date(),
        });

        if (ticket)
          return {
            responseMsg:
              'Your message has been received! We will get back to you shortly.',
          };
      } catch (error: any) {
        throw new ApolloError(error.message, '500');
      }
    },
  },
};

export default resolvers;
