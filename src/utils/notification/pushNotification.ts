import mongoose from 'mongoose'
import { Notification } from '../../models/notification.model'
import { pubSubPublish } from '../../resolvers/notification.resolvers'
import { User } from '../../models/user'
import { Profile } from '../../models/profile.model'
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
  const profile = await Profile.findOne({ user: notification.sender })
  const sanitizedNotification = {
    ...notification.toObject(),
    id: notification.id,
    sender: { profile: profile?.toObject() },
  }
  const userExists = await User.findOne({ _id: receiver })
  if (userExists && userExists.pushNotifications) {
    pubSubPublish(sanitizedNotification)
  }
}
