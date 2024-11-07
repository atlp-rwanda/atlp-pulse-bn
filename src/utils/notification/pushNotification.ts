import mongoose from 'mongoose'
import { Notification } from '../../models/notification.model'
import { pubSubPublish } from '../../resolvers/notification.resolvers'
import User from '../../models/user'
import { Profile } from '../../models/profile.model'
import { Organization } from '../../models/organization.model'
import { GraphQLError } from 'graphql'

export const pushNotification = async (
  receiver: mongoose.Types.ObjectId,
  message: string,
  sender: mongoose.Types.ObjectId,
  orgId: mongoose.Types.ObjectId,
  type?:
    | 'rating'
    | 'performance'
    | 'ticket'
    | 'trainee'
    | 'attendance'
    | 'team'
    | 'cohort'
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
  const org = await Organization.findOne({ _id: orgId})
  if(!org){
    throw new GraphQLError("No such organization found",{
        extensions:{
            code: "ORG_NOT_FOUND"
        }
    })
  }
  const userExists = await User.findOne({ _id: receiver })
  if(!userExists){
    throw new GraphQLError("No such user exists",{
        extensions:{
            code: "USER_NOT_FOUND"
        }
    })
  }
  const orgUserData = userExists?.organizations.find(data=>data.orgId.toString()===org._id.toString())
  if(!orgUserData){
    throw new GraphQLError(`User ${userExists.email} is not part ${org.name}`,{
        extensions:{
            code: "FORBIDDEN"
        }
    })
  }
  if (orgUserData.pushNotifications) {
    pubSubPublish(sanitizedNotification)
  }
}
