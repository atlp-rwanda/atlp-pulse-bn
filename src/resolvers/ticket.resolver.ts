import { ApolloError, ValidationError } from 'apollo-server'
import Ticket from '../models/ticket.model'
import { Context } from '../context'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { User } from '../models/user'
import { Notification } from '../models/notification.model'
import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

export type TicketType = InstanceType<typeof Ticket>

type Reply = {
  ticketId: string
  replyMessage: string
}

async function createReply(
  ticket: any,
  user: any,
  context: Context,
  replyMessage: string,
  pubsub: any
) {
  // Replyier is SuperAdmin sender: context.userId, receiver: user
  if (context?.role === 'superAdmin') {
    const reply = {
      sender: context?.userId,
      receiver: user?.toString(),
      replyMessage,
    }

    ticket.replies.push(reply)
    ticket.status = 'admin-reply'

    await ticket.save({ validateBeforeSave: false })

    const ticketReply = ticket.replies[ticket.replies.length - 1]
    const sender = await User.findById(ticketReply.sender.toString())
      .populate('profile')
      .select('email profile id role organization')

    const notification: any = await Notification.create({
      receiver: user?.toString(),
      message: `A reply on ticket has been sent. ${ticket._id}`,
      sender: context?.userId,
      read: false,
      createdAt: new Date(),
    })

    notification.sender = sender

    pubsub.publish('SEND_NOTIFICATION_ON_TICKETS', {
      sendNotsOnTickets: notification,
    })

    ticketReply.sender = sender

    return ticketReply
  } else {
    const superAdmin = await User.findOne({ role: 'superAdmin' }).lean()
    const reply = {
      sender: context.userId,
      receiver: superAdmin?._id.toString(),
      replyMessage,
    }
    ticket.replies.push(reply)
    ticket.status = 'customer-reply'

    await ticket.save({ validateBeforeSave: false })
    const ticketReply = ticket.replies[ticket.replies.length - 1]

    const sender = await User.findById(ticketReply.sender.toString())
      .populate('profile')
      .select('email profile id role organization')

    const notification: any = await Notification.create({
      receiver: superAdmin?._id.toString(),
      message: `A reply on ticket has been sent. ${ticket._id}`,
      sender: context.userId,
      read: false,
      createdAt: new Date(),
    })

    notification.sender = sender

    pubsub.publish('SEND_NOTIFICATION_ON_TICKETS', {
      sendNotsOnTickets: notification,
    })

    ticketReply.sender = sender

    return ticketReply
  }
}

const resolvers = {
  Subscription: {
    ticketCreated: {
      subscribe: () => pubsub.asyncIterator('TICKET_CREATED'),
    },

    replyAdded: {
      subscribe: () => pubsub.asyncIterator('REPLY_ADDED'),
    },

    sendNotsOnTickets: {
      subscribe: () => pubsub.asyncIterator('SEND_NOTIFICATION_ON_TICKETS'),
    },
  },

  Query: {
    getAllTickets: async (_: any, arg: any, context: Context) => {
      try {
        ;(await checkUserLoggedIn(context))([
          'superAdmin',
          'admin',
          'manager',
          'coordinator',
          'trainee',
          'users',
        ])

        const filterObj: any = {}

        if (context.role !== 'superAdmin') filterObj.user = context.userId

        const tickets = await Ticket.find(filterObj)
          .populate({
            path: 'user',
            populate: {
              path: 'profile',
              model: 'Profile',
            },
          })
          .populate({
            path: 'replies',
            populate: {
              path: 'sender',
              model: 'User',
              populate: {
                path: 'profile',
                model: 'Profile',
              },
            },
          })
          .exec()

        return tickets
      } catch (error: any) {
        throw new ApolloError(error.message, '500')
      }
    },
  },

  Mutation: {
    createTicket: async (_: any, args: TicketType, context: Context) => {
      try {
        ;(await checkUserLoggedIn(context))([
          'admin',
          'coordinator',
          'manager',
          'trainee',
          'user',
        ])
        const { subject, message }: TicketType = args

        const ticket = await Ticket.create({
          user: context.userId,
          subject,
          message,
        })

        const subPayload: any = ticket.toJSON()

        const user = await User.findById(subPayload.user.toString())
          .populate('profile')
          .select('email profile id role organization')

        subPayload.user = user

        pubsub.publish('TICKET_CREATED', {
          ticketCreated: {
            ...subPayload,
          },
        })

        const superAdmin = await User.findOne({ role: 'superAdmin' })

        const notification: any = await Notification.create({
          receiver: superAdmin?._id,
          message: `Ticket has been sent to you. ${ticket._id}`,
          sender: context.userId,
          read: false,
          createdAt: new Date(),
        })

        notification.sender = user

        pubsub.publish('SEND_NOTIFICATION_ON_TICKETS', {
          sendNotsOnTickets: notification,
        })

        if (ticket)
          return {
            responseMsg:
              'Your message has been received! We will get back to you shortly.',
          }
      } catch (error: any) {
        throw new ApolloError(error.message, '500')
      }
    },

    replyToTicket: async (_: any, args: Reply, context: Context) => {
      try {
        if (!context.userId) throw new ValidationError('Loggin first')
        const { ticketId, replyMessage } = args

        const ticket = await Ticket.findById(ticketId)
        if (!ticket)
          throw new ValidationError(
            'Ticket you are replying to does not exist.'
          )

        const { user } = ticket
        if (
          user?.toString() !== context.userId &&
          context.role !== 'superAdmin'
        )
          throw new ValidationError(
            'Access denied! You can only reply if you are the owner of ticket, or you are the super admin.'
          )

        const res = await createReply(
          ticket,
          user,
          context,
          replyMessage,
          pubsub
        )

        const subPayload = {
          id: res._id.toString(),
          sender: res.sender,
          receiver: res.receiver,
          replyMessage: res.replyMessage,
          createdAt: res.createdAt,
          ticket: ticketId,
        }

        pubsub.publish('REPLY_ADDED', {
          replyAdded: subPayload,
        })

        return res
      } catch (error: any) {
        throw new ApolloError(error.message, '500')
      }
    },

    closeTicket: async (_: any, args: Reply, context: Context) => {
      const { ticketId } = args
      try {
        ;(await checkUserLoggedIn(context))([
          'admin',
          'coordinator',
          'manager',
          'trainee',
          'user',
        ])

        const ticket = await Ticket.findById(ticketId)

        if (!ticket) throw new ValidationError('Ticket does not exist.')

        if (
          context.userId !== ticket?.user?.toString() &&
          context.role !== 'superAdmin'
        )
          throw new ValidationError(
            'Access denied! You do not possess permission to close this ticket.'
          )

        ticket.status = 'closed'
        await ticket.save({ validateBeforeSave: false })

        return {
          responseMsg: 'Ticket was successfully closed!',
        }
      } catch (error: any) {
        throw new ApolloError(error.message, '500')
      }
    },
  },
}

export default resolvers
