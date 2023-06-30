import mongoose from 'mongoose'
import { Rating, TempData } from '../models/ratings'
import { Organization, User } from '../models/user'
import { sendEmails } from '../utils/sendEmails'
import { Context } from './../context'
import Cohort from '../models/cohort.model'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { Notification } from '../models/notification.model'
import { authenticated, validateRole } from '../utils/validate-role'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { PubSub, withFilter } from 'graphql-subscriptions'
import { ObjectId } from 'mongodb'
const pubsub = new PubSub()

let org: InstanceType<typeof Organization>
const ratingResolvers: any = {
  Subscription: {
    newRating: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('NEW_RATING'),
        (payload, variables) => {
          // Only push an update if the comment is on
          // the correct repository for this operation
          return payload.newRating.receiver === variables.receiver
        }
      ),
    },
    newfeedback: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('NEW_FEEDBACK'),
        (payload, variables: { sprint: string; user: string }): boolean =>
          payload.sprint == variables.sprint && payload.user == variables.user
      ),
    },
    newfeedbacks: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('NEW_FEEDBACKS'),
        (payload, variables: { sprint_user: string }): boolean => {
          // make sure that sprint_user is the string on an json array
          // in format of [{ spring: '1', user: 'userId' }, ...]

          const arr: { sprint: string; user: string }[] = JSON.parse(
            variables.sprint_user
          )
          return arr.some(
            (val) => val.sprint == payload.sprint && val.user == payload.user
          )
        }
      ),
    },
    newReply: {
      subscribe: () => pubsub.asyncIterator('NEW_REPLY'),
    },
  },
  Query: {
    async fetchRatings(
      _: any,
      { orgToken }: any,
      context: { role: string; userId: string }
    ) {
      // get the organization if someone  logs in
      org = await checkLoggedInOrganization(orgToken)
      const ratings = await Rating.find({
        coordinator: context.userId,
        organization: org,
      })
        .populate('user')
        .populate('cohort')
      return ratings
    },

    async fetchRatingsForAdmin(_: any, { orgToken }: any) {
      org = await checkLoggedInOrganization(orgToken)

      const ratingsAdmin = await TempData.find({ organization: org })
        .populate('user')
        .populate('cohort')
      return ratingsAdmin
    },

    async fetchAllRatings(_: any, { orgToken }: any) {
      org = await checkLoggedInOrganization(orgToken)
      const ratingsAdmin = await Rating.find({ organization: org })
        .populate('user')
        .populate('cohort')
      return ratingsAdmin
    },

    async fetchTrainees(
      _: any,
      args: any,
      context: { role: string; userId: string }
    ) {
      const id = context.userId
      if (!id) throw new Error('it seems you have not logged in')
      const trainees = await Cohort.find({ coordinator: id }).populate({
        path: 'members',
        populate: {
          path: 'program',
          match: context.role === 'coordinator',
          strictPopulate: false,
          populate: {
            path: 'organization',
            strictPopulate: false,
          },
        },
      })
      return trainees
    },

    async fetchRatingByCohort(_: any, { CohortName }: any, context: Context) {
      ;(await checkUserLoggedIn(context))(['coordinator', 'admin', 'trainee'])
      return (
        await Rating.find({}).populate([
          'cohort',
          'user',
          {
            path: 'feedbacks',
            populate: 'sender',
          },
        ])
      ).filter((rating: any) => {
        return !!rating.cohort && rating.cohort.name == CohortName
      })
    },

    async fetchCohortsCoordinator(
      _: any,
      args: any,
      context: { role: string; userId: string }
    ) {
      const id = context.userId
      if (!id) throw new Error('it seems you have not logged in')
      const trainees = await Cohort.find({
        coordinator: id,
        name: args.cohortName,
      }).populate({
        path: 'members',
        populate: {
          path: 'program',
          match: context.role === 'coordinator',
          strictPopulate: false,
          populate: {
            path: 'organization',
            strictPopulate: false,
          },
        },
      })
      return trainees
    },

    async fetchRatingsTrainee(
      _: any,
      args: any,
      context: { role: string; userId: string }
    ) {
      const findRatings = await Rating.find({ user: context.userId }).populate([
        'user',
        'cohort',
        {
          path: 'feedbacks',
          populate: 'sender',
        },
      ])
      return findRatings
    },
    async getAllNotification(
      _: any,
      arg: any,
      context: { role: string; userId: string }
    ) {
      const loggedId = context.userId
      const findNotification = await Notification.find({ receiver: loggedId })
        .sort({ createdAt: -1 })
        .populate('sender')
      return findNotification
    },
  },
  Mutation: {
    addRatings: authenticated(
      validateRole('coordinator')(
        async (
          root,
          {
            user,
            sprint,
            quantity,
            quantityRemark,
            quality,
            cohort,
            qualityRemark,
            professional_Skills,
            professionalRemark,
            bodyQuality,
            bodyQuantity,
            bodyProfessional,
            average,
            orgToken,
          },
          context: { userId: string }
        ) => {
          // get the organization if someone  logs in
          org = await checkLoggedInOrganization(orgToken)
          const userExists = await User.findOne({ _id: user })
          if (!userExists) throw new Error('User does not exist!')
          const Kohort = await Cohort.findOne({ _id: cohort })
          if (!Kohort) throw new Error('User does not exist!')
          const findSprint = await Rating.find({ sprint: sprint, user: user })
          if (findSprint.length !== 0)
            throw new Error('The sprint has recorded ratings')

          //  average generating

          average =
            (parseInt(quality) +
              parseInt(quantity) +
              parseInt(professional_Skills)) /
            3

          if (!mongoose.isValidObjectId(user))
            throw new Error('Invalid user id')
          const saveUserRating = await Rating.create({
            user: userExists,
            sprint,
            quantity,
            quantityRemark,
            quality,
            cohort: Kohort,
            qualityRemark,
            feedbacks: [],
            bodyQuality,
            bodyQuantity,
            bodyProfessional,
            professional_Skills,
            professionalRemark,
            average,
            coordinator: context.userId,
            organization: org,
          })
          const coordinator = await User.findOne({ _id: context.userId })
          const addNotifications = await Notification.create({
            receiver: user,
            message: 'Have rated you; check your scores.',
            sender: coordinator,
            read: false,
            createdAt: new Date(),
          })

          pubsub.publish('NEW_RATING', {
            newRating: {
              id: addNotifications._id,
              receiver: user,
              message: 'Have rated you; check your scores.',
              sender: coordinator,
              read: false,
              createdAt: addNotifications.createdAt,
            },
          })
          await sendEmails(
            process.env.COORDINATOR_EMAIL,
            process.env.COORDINATOR_PASS,
            userExists.email,
            'Trainee',
            'This is to inform you that, new ratings are out now !',
            'Dear Trainee'
          )
          return saveUserRating.populate({
            path: 'feedbacks',
            populate: 'sender',
          })
        }
      )
    ),
    async deleteReply() {
      await Rating.deleteMany({})
      return 'The rating table has been deleted successfully'
    },
    updateRating: authenticated(
      validateRole('coordinator')(
        async (
          root,
          {
            user,
            sprint,
            quantity,
            quantityRemark,
            quality,
            qualityRemark,
            professional_Skills,
            professionalRemark,
            orgToken,
          },
          context: { userId: string }
        ) => {
          org = await checkLoggedInOrganization(orgToken)

          const userExists = await User.findById(user)
          if (!userExists) throw new Error('User does not exist!')

          const oldData = await Rating.findOne({
            user: user,
            sprint: sprint,
          })
          const currentUpdated = await TempData.find({
            sprint: sprint,
            user: user,
          })
          if (currentUpdated.length !== 0)
            await TempData.deleteMany({ sprint: sprint, user: user })

          if (
            oldData?.quantity == quantity[0].toString() &&
            oldData?.quantityRemark == quantityRemark[0].toString() &&
            oldData?.quality == quality[0].toString() &&
            oldData?.qualityRemark == qualityRemark[0].toString() &&
            oldData?.professional_Skills == professional_Skills[0].toString() &&
            oldData?.professionalRemark == professionalRemark[0].toString()
          ) {
            throw new Error('No changes to update!')
          } else {
            const updateRating = await TempData.create({
              user,
              sprint,
              quantity:
                oldData?.quantity == quantity[0].toString()
                  ? oldData?.quantity
                  : [`${oldData?.quantity} ->`, quantity?.toString()],
              quantityRemark:
                oldData?.quantityRemark == quantityRemark[0].toString()
                  ? oldData?.quantityRemark
                  : [
                  // eslint-disable-next-line indent
                  `${oldData?.quantityRemark} ->`,
                    quantityRemark?.toString(),
                  ],
              quality:
                oldData?.quality == quality[0].toString()
                  ? oldData?.quality
                  : [`${oldData?.quality} ->`, quality?.toString()],
              qualityRemark:
                oldData?.qualityRemark == qualityRemark[0].toString()
                  ? oldData?.qualityRemark
                  : [`${oldData?.qualityRemark} ->`, qualityRemark?.toString()],
              professional_Skills:
                oldData?.professional_Skills ==
                professional_Skills[0].toString()
                  ? oldData?.professional_Skills
                  : [
                    `${oldData?.professional_Skills} ->`,
                    professional_Skills?.toString(),
                  ],
              professionalRemark:
                oldData?.professionalRemark == professionalRemark[0].toString()
                  ? oldData?.professionalRemark
                  : [
                    `${oldData?.professionalRemark} ->`,
                    professionalRemark?.toString(),
                  ],
              coordinator: context.userId,
              cohort: oldData?.cohort,
              average: oldData?.average,
              approved: false,
              organization: org,
            })

            await Rating.findOneAndUpdate(
              { user: user, sprint: sprint },
              {
                quantityRemark: quantityRemark[0]?.toString(),
                qualityRemark: qualityRemark[0]?.toString(),
                professionalRemark: professionalRemark[0]?.toString(),
              }
            )

            return updateRating
          }
        }
      )
    ),

    approveRating: authenticated(
      validateRole('admin')(async (root, { user, sprint }) => {
        const updatedData = await TempData.findOne({
          user: user,
          sprint: sprint,
        })
        const userToNotify = await User.findById(updatedData?.user)
        if (!userToNotify) throw new Error('User does not exist!')

        const updates = {
          quantity: updatedData?.quantity[1] ?? updatedData?.quantity[0],
          quantityRemark:
            updatedData?.quantityRemark[1] ?? updatedData?.quantityRemark[0],
          quality: updatedData?.quality[1] ?? updatedData?.quality[0],
          qualityRemark:
            updatedData?.qualityRemark[1] ?? updatedData?.qualityRemark[0],
          professional_Skills:
            updatedData?.professional_Skills[1] ??
            updatedData?.professional_Skills[0],
          professionalRemark:
            updatedData?.professionalRemark[1] ??
            updatedData?.professionalRemark[0],
        }

        const update = await Rating.findOneAndUpdate(
          { user: user, sprint: sprint },
          {
            quantity: updates.quantity,
            quantityRemark: updates.quantityRemark,
            quality: updates.quality,
            qualityRemark: updates.qualityRemark,
            professional_Skills: updates.professional_Skills,
            professionalRemark: updates.professionalRemark,
            approved: true,
            average:
              (Number(updates.quality) +
                Number(updates.quantity) +
                Number(updates.professional_Skills)) /
              3,
          },
          { new: true }
        )

        await TempData.deleteOne({ sprint: sprint, user: user })
        await sendEmails(
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS,
          userToNotify?.email,
          'Trainee ratings',
          `The updates for ${userToNotify?.email} has been approved, check new ratings `,
          'Dear Trainee'
        )
        return update
      })
    ),
    updateToReply: authenticated(
      validateRole('trainee')(
        async (
          root,
          {
            user,
            sprint,
            bodyQuality,
            bodyQuantity,
            bodyProfessional,
            orgToken,
          },
          context: { userId: string }
        ) => {
          org = await checkLoggedInOrganization(orgToken);
          await Rating.find({
            user: user,
            sprint: sprint,
          });
          const updateReply = await Rating.findOneAndUpdate(
            { user: user, sprint: sprint },
            {
              bodyQuality: bodyQuality[0]?.toString(),
              bodyQuantity: bodyQuantity[0]?.toString(),
              bodyProfessional: bodyProfessional[0]?.toString(),
            },
            { new: true }
          )

          const traineee = await User.findOne({ _id: context.userId })
          const rate = await Rating.findOne({
            user: user,
            sprint: sprint,
          })
          const addNotifications = await Notification.create({
            receiver: rate?.coordinator
              ?.toString()
              ?.replace(/ObjectId\("(.*)"\)/, '$1'),
            message: 'Have replied you on your remark',
            sender: traineee,
            read: false,
            createdAt: new Date(),
          })

          pubsub.publish('NEW_RATING', {
            newRating: {
              id: addNotifications._id,
              receiver: rate?.coordinator
                ?.toString()
                ?.replace(/ObjectId\("(.*)"\)/, '$1'),
              message: addNotifications.message,
              sender: traineee,
              read: false,
              createdAt: addNotifications.createdAt,
            },
          })
          return [updateReply]
        }
      )
    ),
    AddRatingFeedback: async (
      _: unknown,
      { sprint, user, content }: any,
      context: { userId: string }
    ) => {
      if (!content.trim()) throw new Error('feedback must not be empty')

      const rate = await Rating.findOne({
        user: new ObjectId(user),
        sprint: sprint,
      })

      if (!rate) throw new Error(`rating in sprint ${sprint} does not found`)

      const sender = await User.findOne({ _id: context.userId })

      rate?.feedbacks?.push({
        content,
        sender: sender?.id,
        createdAt: new Date(),
      })
      await rate?.save()

      pubsub.publish('NEW_FEEDBACK', {
        sprint,
        user,
        newfeedback: {
          content,
          createdAt: new Date(),
          sender,
        },
      })
      pubsub.publish('NEW_FEEDBACKS', {
        sprint,
        user,
        newfeedbacks: {
          sprint,
          user,
          data: {
            content,
            createdAt: new Date(),
            sender,
          },
        },
      })

      const addNotifications = await Notification.create({
        receiver: sender?.id == rate?.coordinator ? user : rate?.coordinator,
        message: content,
        sender: sender?.id,
        read: false,
        createdAt: new Date(),
      })
      pubsub.publish('NEW_REPLY', {
        newRating: {
          id: addNotifications._id,
          receiver: addNotifications.receiver,
          message: addNotifications.message,
          sender: addNotifications.sender,
          read: false,
          createdAt: addNotifications.createdAt,
        },
      })
      return {
        content,
        createdAt: new Date(),
        sender,
      }
    },

    rejectRating: authenticated(
      validateRole('admin')(async (root, { user, sprint }) => {
        const updatedData: any = await TempData.findOne({
          user: user,
          sprint: sprint,
        })
        const userX = await User.findById(updatedData?.user)
        const findCoordinatorEmail = await User.findById(
          updatedData?.coordinator
        )
        if (!userX) throw new Error('User does not exist!')
        await TempData.deleteOne({ user: user, sprint: sprint })
        await sendEmails(
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS,
          findCoordinatorEmail?.email,
          'Trainee ratings',
          `The updates for ${userX?.email} has been rejected `,
          'Dear Trainee'
        )
        return `user ${userX?.email} deleted successfully`
      })
    ),
  },
}
export default ratingResolvers
