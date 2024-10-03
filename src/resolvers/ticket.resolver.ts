import { GraphQLError } from 'graphql'
import Ticket from '../models/ticket.model'
import { Context } from '../context'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { RoleOfUser, User } from '../models/user'
import { PubSub } from 'graphql-subscriptions'
import { pushNotification } from '../utils/notification/pushNotification'

const pubsub = new PubSub()

export type TicketType = InstanceType<typeof Ticket>
export type UserType = InstanceType<typeof User>

type Reply = {
  ticketId: string
  replyMessage: string
}

async function createReply(
  ticket: TicketType,
  user: UserType,
  context: Context,
  replyMessage: string
) {
  try {
    const isSuperAdmin = context?.role === RoleOfUser.SUPER_ADMIN
    const reply: any = {
      sender: context?.userId,
      receiver: isSuperAdmin
        ? user?._id.toString()
        : (await User.findOne({ role: RoleOfUser.SUPER_ADMIN }))?._id.toString(),
      replyMessage,
    }

    ticket.replies.push(reply)
    ticket.status = isSuperAdmin ? 'admin-reply' : 'customer-reply'

    await ticket.save({ validateBeforeSave: false })

    const ticketReply = ticket.replies[ticket.replies.length - 1]
    const sender: any = await User.findById(ticketReply.sender.toString())
      .populate('profile')
      .select('email profile id role organization')

    if (!sender) {
      throw new GraphQLError('Sender not found', {
        extensions: { code: 'NOT_FOUND' },
      })
    }

    ticketReply.sender = sender
    const senderId: any = context.userId
    // Send notification
    await pushNotification(
      reply.receiver,
      `A reply on ticket has been sent. ${ticket._id}`,
      senderId
    )

    return ticketReply
  } catch (error: any) {
    throw new GraphQLError(error.message, {
      extensions: { code: '500' },
    })
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
    getAllTickets: async (_: any, __: any, context: Context | any) => {
      try {
        await (
          await checkUserLoggedIn(context)
        )([
          RoleOfUser.SUPER_ADMIN,
          RoleOfUser.ADMIN,
          RoleOfUser.MANAGER,
          RoleOfUser.COORDINATOR,
          RoleOfUser.TRAINEE,
          RoleOfUser.TTL,
          'users',
        ])

        // Allow admins to fetch all tickets
        const filterObj: any = (() => {
          if ([RoleOfUser.SUPER_ADMIN, RoleOfUser.ADMIN].includes(context.role)) {
            return {} // Admins can see all tickets
          } else if (context.role === 'trainee') {
            return { $or: [{ assignee: context.userId }] }
          } else if (context.role === RoleOfUser.COORDINATOR) {
            return { $or: [{ user: context.userId }] }
          }
          return { user: context.userId } // Regular users see their own tickets
        })()

        const tickets: any[] = await Ticket.find(filterObj)
          .populate({
            path: 'user',
            populate: { path: 'profile', model: 'Profile' },
          })
          .populate({
            path: 'replies',
            populate: {
              path: 'sender',
              model: 'User',
              populate: { path: 'profile', model: 'Profile' },
            },
          })
          .populate({
            path: 'assignee',
            populate: { path: 'profile', model: 'Profile' },
          })
          .exec()

        return tickets.map((ticket) => ({
          ...ticket.toObject(),
          id: ticket._id.toString(),
        }))
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: { code: '500' },
        })
      }
    },
  },

  Mutation: {
    createTicket: async (_: any, args: any, context: Context) => {
      try {
        await (
          await checkUserLoggedIn(context)
        )([RoleOfUser.ADMIN, RoleOfUser.SUPER_ADMIN, RoleOfUser.COORDINATOR, RoleOfUser.TTL])
        const { subject, message, assignee }: any = args

        let assigneeUser = null
        if (assignee) {
          assigneeUser = await User.findById(assignee)
          if (!assigneeUser) {
            throw new GraphQLError('Assignee not found', {
              extensions: { code: 'NOT_FOUND' },
            })
          }
        }

        const ticket = await Ticket.create({
          user: context.userId,
          subject,
          message,
          assignee: assignee,
        })

        const user = await User.findById(context.userId)
          .populate('profile')
          .select('email profile id role organization')

        if (!user) {
          throw new GraphQLError('User not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        }

        await ticket.populate('assignee')

        pubsub.publish('TICKET_CREATED', {
          ticketCreated: { ...ticket.toJSON(), user },
        })

        const receiverId: any =
          assignee || (await User.findOne({ role: RoleOfUser.SUPER_ADMIN }))?._id
        const senderId: any = context.userId
        await pushNotification(
          receiverId,
          `New ticket assigned to you. Ticket ID: ${ticket._id}`,
          senderId
        )

        return {
          responseMsg:
            'Your ticket has been created and assigned. We will get back to you shortly.',
        }
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: { code: '500' },
        })
      }
    },

    replyToTicket: async (
      _: any,
      { ticketId, replyMessage }: Reply,
      context: Context
    ) => {
      try {
        if (!context.userId)
          throw new GraphQLError('Login first', {
            extensions: { code: 'VALIDATION_ERROR' },
          })

        const ticket = await Ticket.findById(ticketId)
        if (!ticket)
          throw new GraphQLError('Ticket does not exist.', {
            extensions: { code: 'VALIDATION_ERROR' },
          })

        const { user }: any = ticket
        if (
          context.role !== RoleOfUser.SUPER_ADMIN &&
          context.role !== RoleOfUser.ADMIN &&
          user?.toString() !== context.userId
        ) {
          throw new GraphQLError('Access denied!', {
            extensions: { code: 'VALIDATION_ERROR' },
          })
        }

        const reply = await createReply(ticket, user, context, replyMessage)

        pubsub.publish('REPLY_ADDED', {
          replyAdded: {
            sender: reply.sender,
            receiver: reply.receiver,
            replyMessage: reply.replyMessage,
            createdAt: reply.createdAt,
            ticket: ticketId,
          },
        })

        return reply
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: { code: '500' },
        })
      }
    },

    closeTicket: async (
      _: any,
      { ticketId }: { ticketId: string },
      context: Context
    ) => {
      try {
        await (
          await checkUserLoggedIn(context)
        )([RoleOfUser.ADMIN, RoleOfUser.COORDINATOR, RoleOfUser.MANAGER, RoleOfUser.TRAINEE])

        const ticket: any = await Ticket.findById(ticketId)
        if (!ticket)
          throw new GraphQLError('Ticket does not exist.', {
            extensions: { code: 'VALIDATION_ERROR' },
          })

        if (
          context.userId !== ticket.user.toString() &&
          context.role !== RoleOfUser.SUPER_ADMIN
        ) {
          throw new GraphQLError('Access denied!', {
            extensions: { code: 'VALIDATION_ERROR' },
          })
        }

        ticket.status = 'closed'
        await ticket.save({ validateBeforeSave: false })
        const senderId: any = context.userId
        // Send notification
        await pushNotification(
          ticket.user,
          `Your ticket ${ticketId} has been closed.`,
          senderId
        )

        return { responseMsg: 'Ticket was successfully closed!' }
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: { code: '500' },
        })
      }
    },

    updateTicket: async (
      _: any,
      { updateTicketId, input }: { updateTicketId: string; input: any },
      context: Context
    ) => {
      try {
        await (
          await checkUserLoggedIn(context)
        )([RoleOfUser.ADMIN, RoleOfUser.COORDINATOR, RoleOfUser.SUPER_ADMIN, RoleOfUser.TTL])

        const ticket = await Ticket.findById(updateTicketId)
        if (!ticket)
          throw new GraphQLError('Ticket not found', {
            extensions: { code: 'NOT_FOUND' },
          })

        // Allow admins to update any ticket
        if (
          context.role !== RoleOfUser.SUPER_ADMIN &&
          context.role !== RoleOfUser.ADMIN &&
          context.userId !== ticket.user.toString()
        ) {
          throw new GraphQLError('Access denied!', {
            extensions: { code: 'VALIDATION_ERROR' },
          })
        }

        Object.assign(ticket, input)
        await ticket.save({ validateBeforeSave: false })

        return { responseMsg: 'Ticket was updated successfully!' }
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: { code: '500' },
        })
      }
    },

    deleteTicket: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        await (
          await checkUserLoggedIn(context)
        )([RoleOfUser.ADMIN, RoleOfUser.COORDINATOR, RoleOfUser.SUPER_ADMIN, RoleOfUser.TTL])

        const ticket = await Ticket.findById(id)
        if (!ticket)
          throw new GraphQLError('Ticket not found', {
            extensions: { code: 'NOT_FOUND' },
          })

        // Allow admins to delete any ticket
        if (
          context.role !== RoleOfUser.SUPER_ADMIN &&
          context.role !== RoleOfUser.ADMIN &&
          context.userId !== ticket.user.toString()
        ) {
          throw new GraphQLError('Access denied!', {
            extensions: { code: 'VALIDATION_ERROR' },
          })
        }

        await ticket.remove()

        return { responseMsg: 'Ticket was successfully deleted!' }
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: { code: '500' },
        })
      }
    },
  },
}

export default resolvers
