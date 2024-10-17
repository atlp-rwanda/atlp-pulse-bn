import { GraphQLError } from 'graphql'
import Ticket from '../models/ticket.model'
import { Context } from '../context'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { User } from '../models/user'
import { PubSub } from 'graphql-subscriptions'
import { pushNotification } from '../utils/notification/pushNotification'
import { sendEmail } from '../utils/sendEmail'

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
    const isSuperAdmin = context?.role === 'superAdmin'
    const reply: any = {
      sender: context?.userId,
      receiver: isSuperAdmin
        ? user?._id.toString()
        : (await User.findOne({ role: 'superAdmin' }))?._id.toString(),
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
    // getAllTickets: async (_: any, __: any, context: Context | any) => {
    //   try {
    //     await (
    //       await checkUserLoggedIn(context)
    //     )([
    //       'superAdmin',
    //       'admin',
    //       'manager',
    //       'coordinator',
    //       'trainee',
    //       'ttl',
    //       'users',
    //     ])

    //     const filterObj: any = (() => {
    //       if (['superAdmin', 'admin'].includes(context.role)) {
    //         return {}
    //       } else if (context.role === 'trainee') {
    //         return { $or: [{ assignee: context.userId }] }
    //       } else if (context.role === 'coordinator') {
    //         return { $or: [{ user: context.userId }] }
    //       }
    //       return { user: context.userId }
    //     })()

    //     const tickets: any[] = await Ticket.find(filterObj)
    //       .populate({
    //         path: 'user',
    //         populate: { path: 'profile', model: 'Profile' },
    //       })
    //       .populate({
    //         path: 'replies',
    //         populate: {
    //           path: 'sender',
    //           model: 'User',
    //           populate: { path: 'profile', model: 'Profile' },
    //         },
    //       })
    //       .populate({
    //         path: 'assignee',
    //         populate: { path: 'profile', model: 'Profile' },
    //       })
    //       .exec()

    //     return tickets.map((ticket) => ({
    //       ...ticket.toObject(),
    //       id: ticket._id.toString(),
    //     }))
    //   } catch (error: any) {
    //     throw new GraphQLError(error.message, {
    //       extensions: { code: '500' },
    //     })
    //   }
    // },
    getAllTickets: async (_: any, __: any, context: Context | any) => {
      try {
        await (
          await checkUserLoggedIn(context)
        )([
          'superAdmin',
          'admin',
          'manager',
          'coordinator',
          'trainee',
          'ttl',
          'users',
        ])

        const filterObj: any = (() => {
          if (['superAdmin', 'admin'].includes(context.role)) {
            return {}
          } else if (context.role === 'trainee') {
            return { $or: [{ assignee: context.userId }] }
          } else if (context.role === 'coordinator') {
            return { $or: [{ user: context.userId }] }
          }
          return { user: context.userId }
        })()

        const tickets: any[] = await Ticket.find(filterObj)
          .populate({
            path: 'user',
            populate: [
              { path: 'profile', model: 'Profile' },
              { path: 'team', model: 'Team' },
              { path: 'cohort', model: 'Cohort' },
            ],
          })
          .populate({
            path: 'assignee',
            populate: [
              { path: 'profile', model: 'Profile' },
              { path: 'team', model: 'Team' },
              { path: 'cohort', model: 'Cohort' },
            ],
          })
          .populate({
            path: 'replies',
            populate: {
              path: 'sender',
              model: 'User',
              populate: { path: 'profile', model: 'Profile' },
            },
          })
          .exec()

        return tickets.map((ticket) => ({
          ...ticket.toObject(),
          id: ticket._id.toString(),
          user: ticket.user
            ? {
                ...ticket.user.toObject(),
                id: ticket.user._id.toString(),
                team: ticket.user.team
                  ? {
                      id: ticket.user.team._id.toString(),
                      name: ticket.user.team.name,
                    }
                  : null,
                cohort: ticket.user.cohort
                  ? {
                      id: ticket.user.cohort._id.toString(),
                      name: ticket.user.cohort.name,
                    }
                  : null,
              }
            : null,
          assignee: ticket.assignee
            ? {
                ...ticket.assignee.toObject(),
                id: ticket.assignee._id.toString(),
                team: ticket.assignee.team
                  ? {
                      id: ticket.assignee.team._id.toString(),
                      name: ticket.assignee.team.name,
                    }
                  : null,
                cohort: ticket.assignee.cohort
                  ? {
                      id: ticket.assignee.cohort._id.toString(),
                      name: ticket.assignee.cohort.name,
                    }
                  : null,
              }
            : null,
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
        )(['admin', 'superAdmin', 'coordinator', 'ttl'])
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
          assignee || (await User.findOne({ role: 'superAdmin' }))?._id
        const senderId: any = context.userId
        await pushNotification(
          receiverId,
          `New ticket assigned to you. Ticket ID: ${ticket._id}`,
          senderId
        )
        if (assigneeUser) {
          await sendEmail(
            assigneeUser.email,
            'New Ticket Assigned',
            `A new ticket  with ID: ${ticket._id} and subject: ${ticket.subject} has been assigned to you`,
            `${process.env.FRONTEND_LINK}/tickets/${ticket._id}`,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS
          )
        }
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
          context.role !== 'superAdmin' &&
          context.role !== 'admin' &&
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
        )(['admin', 'coordinator', 'manager', 'trainee'])

        const ticket: any = await Ticket.findById(ticketId)
        if (!ticket)
          throw new GraphQLError('Ticket does not exist.', {
            extensions: { code: 'VALIDATION_ERROR' },
          })

        if (
          context.userId !== ticket.user.toString() &&
          context.role !== 'superAdmin'
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

    // updateTicket: async (
    //   _: any,
    //   { updateTicketId, input }: { updateTicketId: string; input: any },
    //   context: Context
    // ) => {
    //   try {
    //     await (
    //       await checkUserLoggedIn(context)
    //     )(['admin', 'coordinator', 'superAdmin', 'ttl'])

    //     const ticket = await Ticket.findById(updateTicketId)
    //     if (!ticket)
    //       throw new GraphQLError('Ticket not found', {
    //         extensions: { code: 'NOT_FOUND' },
    //       })

    //     if (
    //       context.role !== 'superAdmin' &&
    //       context.role !== 'admin' &&
    //       context.userId !== ticket.user.toString()
    //     ) {
    //       throw new GraphQLError('Access denied!', {
    //         extensions: { code: 'VALIDATION_ERROR' },
    //       })
    //     }

    //     const oldAssignee = ticket.assignee ? ticket.assignee.toString() : null

    //     if (input.subject) ticket.subject = input.subject
    //     if (input.message) ticket.message = input.message
    //     if (input.assignee) ticket.assignee = input.assignee
    //     if (input.status) ticket.status = input.status

    //     await ticket.save()

    //     if (input.assignee && input.assignee !== oldAssignee) {
    //       // Notify new assignee
    //       const newAssignee = await User.findById(input.assignee)
    //       if (newAssignee) {
    //         await sendEmail(
    //           newAssignee.email,
    //           'Ticket Assigned',
    //           `A ticket with ID: ${updateTicketId} and subject: ${ticket.subject} has been assigned to you.`,
    //           `${process.env.FRONTEND_LINK}/tickets/${updateTicketId}`,
    //           process.env.SENDER_EMAIL,
    //           process.env.SENDER_PASSWORD
    //         )
    //       }

    //       if (oldAssignee) {
    //         const previousAssignee = await User.findById(oldAssignee)
    //         if (previousAssignee) {
    //           await sendEmail(
    //             previousAssignee.email,
    //             'Ticket Reassigned',
    //             `The ticket  with ID: ${updateTicketId} and subject: ${ticket.subject} previously assigned to you has been reassigned. Subject: `,
    //             `${process.env.FRONTEND_LINK}/tickets`,
    //             process.env.SENDER_EMAIL,
    //             process.env.SENDER_PASSWORD
    //           )
    //         }
    //       }
    //     }

    //     return { responseMsg: 'Ticket was updated successfully!' }
    //   } catch (error: any) {
    //     throw new GraphQLError(error.message, {
    //       extensions: { code: '500' },
    //     })
    //   }
    // },
    updateTicket: async (
      _: any,
      { updateTicketId, input }: { updateTicketId: string; input: any },
      context: Context
    ) => {
      try {
        await (
          await checkUserLoggedIn(context)
        )(['admin', 'coordinator', 'superAdmin', 'ttl'])

        const ticket = await Ticket.findById(updateTicketId)
        if (!ticket)
          throw new GraphQLError('Ticket not found', {
            extensions: { code: 'NOT_FOUND' },
          })

        if (
          context.role !== 'superAdmin' &&
          context.role !== 'admin' &&
          context.userId !== ticket.user.toString()
        ) {
          throw new GraphQLError('Access denied!', {
            extensions: { code: 'VALIDATION_ERROR' },
          })
        }

        const oldAssignee = ticket.assignee ? ticket.assignee.toString() : null
        const oldStatus = ticket.status

        if (input.subject) ticket.subject = input.subject
        if (input.message) ticket.message = input.message
        if (input.assignee) ticket.assignee = input.assignee
        if (input.status) ticket.status = input.status

        await ticket.save()

        const senderId: any = context.userId

        if (input.status && input.status !== oldStatus) {
          const ticketOwner = await User.findById(ticket.user)

          if (ticketOwner) {
            await pushNotification(
              ticketOwner._id,
              `Your ticket (ID: ${updateTicketId}) status has been updated to: ${input.status}`,
              senderId
            )
            await sendEmail(
              ticketOwner.email,
              'Ticket Status Updated',
              `Your ticket (ID: ${updateTicketId}) status has been updated to: ${input.status}`,
              `${process.env.FRONTEND_LINK}/tickets/${updateTicketId}`,
              process.env.ADMIN_EMAIL,
              process.env.ADMIN_PASS
            )
          }

          if (input.status === 'closed') {
            const assignee = await User.findById(ticket.assignee)
            if (assignee) {
              await pushNotification(
                assignee._id,
                `The ticket (ID: ${updateTicketId}) assigned to you has been closed.`,
                senderId
              )
              await sendEmail(
                assignee.email,
                'Ticket Closed',
                `The ticket (ID: ${updateTicketId}) assigned to you has been closed.`,
                `${process.env.FRONTEND_LINK}/tickets/${updateTicketId}`,
                process.env.ADMIN_EMAIL,
                process.env.ADMIN_PASS
              )
            }
          }
        }

        if (input.assignee && input.assignee !== oldAssignee) {
          const newAssignee = await User.findById(input.assignee)
          if (newAssignee) {
            await pushNotification(
              newAssignee._id,
              `A ticket with ID: ${updateTicketId} and subject: ${ticket.subject} has been assigned to you.`,
              senderId
            )
            await sendEmail(
              newAssignee.email,
              'Ticket Assigned',
              `A ticket with ID: ${updateTicketId} and subject: ${ticket.subject} has been assigned to you.`,
              `${process.env.FRONTEND_LINK}/tickets/${updateTicketId}`,
              process.env.ADMIN_EMAIL,
              process.env.ADMIN_PASS
            )
          }

          if (oldAssignee) {
            const previousAssignee = await User.findById(oldAssignee)
            if (previousAssignee) {
              await pushNotification(
                previousAssignee._id,
                `The ticket with ID: ${updateTicketId} and subject: ${ticket.subject} previously assigned to you has been reassigned.`,
                senderId
              )
              await sendEmail(
                previousAssignee.email,
                'Ticket Reassigned',
                `The ticket with ID: ${updateTicketId} and subject: ${ticket.subject} previously assigned to you has been reassigned.`,
                `${process.env.FRONTEND_LINK}/tickets`,
                process.env.ADMIN_EMAIL,
                process.env.ADMIN_PASS
              )
            }
          }
        }

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
        )(['admin', 'coordinator', 'superAdmin', 'ttl'])

        const ticket = await Ticket.findById(id)
        if (!ticket)
          throw new GraphQLError('Ticket not found', {
            extensions: { code: 'NOT_FOUND' },
          })

        if (
          context.role !== 'superAdmin' &&
          context.role !== 'admin' &&
          context.userId !== ticket.user.toString()
        ) {
          throw new GraphQLError('Access denied!', {
            extensions: { code: 'VALIDATION_ERROR' },
          })
        }

        const senderId: any = context.userId

        // Notify ticket owner
        const ticketOwner = await User.findById(ticket.user)
        if (ticketOwner) {
          await pushNotification(
            ticketOwner._id,
            `Your ticket (ID: ${id}) has been deleted.`,
            senderId
          )
          await sendEmail(
            ticketOwner.email,
            'Ticket Deleted',
            `Your ticket with ID: ${id} and subject: ${ticket.subject} has been deleted.`,
            `${process.env.FRONTEND_LINK}/tickets`,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS
          )
        }

        if (ticket.assignee) {
          const assignee = await User.findById(ticket.assignee)
          if (assignee) {
            await pushNotification(
              assignee._id,
              `The ticket (ID: ${id}) previously assigned to you has been deleted.`,
              senderId
            )
            await sendEmail(
              assignee.email,
              'Ticket Deleted',
              `The ticket with ID: ${id} and subject: ${ticket.subject} previously assigned to you has been deleted.`,
              `${process.env.FRONTEND_LINK}/tickets`,
              process.env.ADMIN_EMAIL,
              process.env.ADMIN_PASS
            )
          }
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
