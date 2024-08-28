import { Notification } from '../models/notification.model'
import { Context } from './../context'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { User } from '../models/user'
import { PubSub, withFilter } from 'graphql-subscriptions'

const pubSub = new PubSub()

export const pubSubPublish = (payload: any) => {
  pubSub.publish('SEND_NOTIFICATION', {
    pushNotification: payload,
  })
}

const notificationResolver = {
  Subscription: {
    pushNotification: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(['SEND_NOTIFICATION']),
        (payload, variable) => {
          return (
            payload.pushNotification.receiver.toString() === variable.receiverId
          )
        }
      ),
    },
  },
  Mutation: {
    deleteNotifications: async (parent: any, args: any, context: Context) => {
      ;(await checkUserLoggedIn(context))(['coordinator', 'trainee'])
      const findNotification = await Notification.findById(args.id)
      if (!findNotification)
        throw new Error('The notification you want to delete does not exist')
      await Notification.findByIdAndDelete({
        _id: args.id,
      })
      return 'successfully deleted notification'
    },

    markAsRead: async (parent: any, args: any, context: Context) => {
      ;(await checkUserLoggedIn(context))([
        'coordinator',
        'trainee',
        'superAdmin',
        'manager',
        'ttl',
        'user',
        'admin',
      ])

      const findNotification = await Notification.findById(args.id)
      if (!findNotification)
        throw new Error('The notification you want to update does not exist')
      await Notification.findByIdAndUpdate(
        { _id: args.id },
        {
          read: true,
        }
      )
      return 'successfully updated notification'
    },

    markAllAsRead: async (parent: any, args: any, context: Context) => {
      ;(await checkUserLoggedIn(context))(['coordinator', 'trainee'])
      const { userId } = context
      const findNotification = await Notification.find({ receiver: userId })
      if (!findNotification)
        throw new Error('The notification you want to update does not exist')
      await Notification.updateMany(
        { receiver: userId },
        {
          read: true,
        }
      )
      return 'successfully updated notification'
    },
  },
}
export default notificationResolver
