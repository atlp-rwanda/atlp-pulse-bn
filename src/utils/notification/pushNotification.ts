import mongoose from 'mongoose'
import { Notification } from '../../models/notification.model'
import { pubSubPublish } from '../../resolvers/notification.resolvers'
import { User } from '../../models/user'

export const pushNotification = async (
  receiver: mongoose.Types.ObjectId,
  message: string,
  sender: mongoose.Types.ObjectId,
  type?: string
) => {
  const notification = await Notification.create({
    receiver: receiver,
    message: message,
    sender: sender,
    type,
  })

  const userExists = await User.findOne({ _id: receiver })

  if (userExists && userExists.pushNotifications) {
    pubSubPublish(notification)
  }
}
