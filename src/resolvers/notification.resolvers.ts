import { Notification } from '../models/notification.model'
import { Context } from './../context'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { RoleOfUser, User } from '../models/user'
import { PubSub, withFilter } from 'graphql-subscriptions'
import { Query } from 'mongoose'
import { Profile } from '../models/profile.model'

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
  Query: {
    async getAllNotification(
      _: any,
      arg: any,
      context: { role: string; userId: string }
    ) {
      try {
        const loggedId = context.userId

        const findNotification = await Notification.find({
          receiver: loggedId,
        }).sort({ createdAt: -1 })

        const notifications = []
        for (let i = 0; i < findNotification.length; i++) {
          const profile = await Profile.findOne({
            user: findNotification[i].sender,
          })
          notifications.push({
            ...findNotification[i].toObject(),
            id: findNotification[i].id,
            sender: { profile: profile?.toObject() },
          })
        }

        return notifications
      } catch (error) {
        console.log(error)
      }
    },
  },
  Mutation: {
    deleteNotifications: async (parent: any, args: any, context: Context) => {
      ;(await checkUserLoggedIn(context))([RoleOfUser.COORDINATOR, RoleOfUser.TRAINEE])
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
        RoleOfUser.COORDINATOR,
        RoleOfUser.TRAINEE,
        RoleOfUser.SUPER_ADMIN,
        RoleOfUser.MANAGER,
        RoleOfUser.TTL,
        'user',
        RoleOfUser.ADMIN,
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
      ;(await checkUserLoggedIn(context))([RoleOfUser.COORDINATOR, RoleOfUser.TRAINEE])
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
