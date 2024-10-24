import { Notifications } from '../models/reply.model'
import { Rating } from '../models/ratings'
import { RoleOfUser, User } from '../models/user'
import { IntegerType, ObjectId } from 'mongodb'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { Context } from './../context'
import { GraphQLError } from 'graphql'
import { Error } from 'mongoose'
import { pushNotification } from '../utils/notification/pushNotification'
import { Profile } from '../models/profile.model'

const replyResolver = {
  Query: {
    async getReplies(_: any, args: any, context: Context) {
      ;(await checkUserLoggedIn(context))([RoleOfUser.COORDINATOR, 'trainee'])
      const replies = await Notifications.find({})
      return replies
    },
    async getRepliesByUser(_: any, args: any, context: Context) {
      ;(await checkUserLoggedIn(context))([RoleOfUser.COORDINATOR, 'trainee'])
      const SpecificReplies = await Notifications.find({ user: args.userId })
      return SpecificReplies
    },
  },

  Mutation: {
    addReply: async (
      _: any,
      args: {
        rating: string | ObjectId
        userEmail: string | ObjectId
        sprint: IntegerType | ObjectId
        quantityRemark: string | ObjectId
        qualityRemark: string | ObjectId
        professionalRemark: string | ObjectId
        bodyQuantity: string
        bodyQuality: string
        bodyProfessional: string
      },
      context: Context
    ) => {
      try {
        const { rating, sprint, bodyQuantity, bodyQuality, bodyProfessional } =
          args
        ;(await checkUserLoggedIn(context))(['trainee'])
        const userExists = await User.findOne({ _id: context.userId })
        if (!userExists) throw new Error('User does not exist!')
        const findReply = await Notifications.find({
          sprint: sprint,
          user: context.userId,
        })
        if (findReply.length !== 0)
          throw new Error('Already replied on this remark')
        const remarkToReplyOn = await Rating.find({ _id: rating })
        if (!remarkToReplyOn)
          throw new Error('The remark you want to reply on, no longer exist!')
        const newReply = new Notifications({
          user: context.userId,
          sprint,
          rating,
          quantityRemark: remarkToReplyOn[0].quantityRemark,
          qualityRemark: remarkToReplyOn[0].qualityRemark,
          professionalRemark: remarkToReplyOn[0].professionalRemark,
          bodyQuantity,
          bodyQuality,
          bodyProfessional,
        })
        const userProfile = await Profile.findOne({ user: context.userId })
        const message = `${userProfile?.firstName} ${userProfile?.lastName} has replied to your ratings`
        pushNotification(
          remarkToReplyOn[0].coordinator as ObjectId,
          message,
          userExists.id,
          'rating'
        )
        return newReply.save()
      } catch (error) {
        const { message } = error as { message: any }
        throw new GraphQLError(message.toString(), {
          extensions: {
            code: '500',
          },
        })
      }
    },
  },
}

export default replyResolver
