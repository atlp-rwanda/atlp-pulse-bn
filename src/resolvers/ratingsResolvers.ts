import { Rating, TempData } from '../models/ratings'
import { RoleOfUser, User } from '../models/user'
import { Organization } from '../models/organization.model'
import { sendEmails } from '../utils/sendEmails'
import { Context } from './../context'
import Cohort from '../models/cohort.model'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { Notification } from '../models/notification.model'
import {
  authenticated,
  validateRole,
  validateTtlOrCoordinator,
} from '../utils/validate-role'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import generalTemplate from '../utils/templates/generalTemplate'
import { PubSub, withFilter } from 'graphql-subscriptions'
import { ObjectId } from 'mongodb'
import phaseSchema from '../schema/phase.schema'
import { pushNotification } from '../utils/notification/pushNotification'
import mongoose, { Document, Types } from 'mongoose'
import { GraphQLError } from 'graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'
import { extractSheetRatings, FileRating } from '../utils/sheets/extractSheetRatings'
import Phase from '../models/phase.model'
import Team from '../models/team.model'
const pubsub = new PubSub()

const ratingEmailContent = generalTemplate({
  message:
    "We're excited to announce that your latest performance ratings are ready for review.",
  linkMessage: 'To access your new ratings, click the button below',
  buttonText: 'View Ratings',
  link: `${process.env.FRONTEND_LINK}/performance`,
  closingText:
    "If you have any questions or require additional information about your ratings, please don't hesitate to reach out to us.",
})

let org: InstanceType<typeof Organization>
const ratingResolvers: any = {
  Upload: GraphQLUpload,
  Subscription: {
    newRating: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('NEW_RATING'),
        (payload, variables) => {
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

    async fetchSprints(_:any, {orgToken}: {orgToken: string}, context: Context){
      const {userId, role} = (await checkUserLoggedIn(context))([ RoleOfUser.COORDINATOR, RoleOfUser.TTL])
      const user = await User.findById(userId)
      if(!user){
        throw new GraphQLError("No such user found",{
          extensions: {
            code: "USER_NOT_FOUND"
          }
        })
      }
      const org = await checkLoggedInOrganization(orgToken)
      if(!org){
        throw new GraphQLError("No such organization found",{
          extensions: {
            code: "ORGANIZATION_NOT_FOUND"
          }
        })
      }
      let cohort: any = null
      if(role === RoleOfUser.COORDINATOR){
        cohort = await Cohort.findOne({
          coordinator: userId,
          organization: org._id,
        })
      }
      if(role === RoleOfUser.TTL){
        cohort = await Cohort.findById(user?.cohort)
      }
      if(!cohort){
        throw new GraphQLError("No cohort is associated with this user",{
          extensions: {
            code: "COHORT_NOT_FOUND"
          }
        })
      }
      const ratings = await Rating.find({
        cohort: cohort._id,
        organization: org._id,
      })
      
      return ratings.map(rating=>rating.sprint).sort()
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
          match: context.role === RoleOfUser.COORDINATOR,
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
      ; (await checkUserLoggedIn(context))([
        RoleOfUser.COORDINATOR,
        RoleOfUser.ADMIN,
        RoleOfUser.TRAINEE,
        RoleOfUser.TTL,
      ])
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
          match: context.role === RoleOfUser.COORDINATOR,
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
      const findRatings = await Rating.find({ user: context.userId })
        .populate([
          'user',
          'cohort',
          {
            path: 'feedbacks',
            populate: 'sender',
          },
        ])
        .sort({ createdAt: -1 })
      return findRatings
    },
  },
  Mutation: {
    addRatings: authenticated(
      validateTtlOrCoordinator([RoleOfUser.COORDINATOR, RoleOfUser.TTL])(
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
          context: { userId: string; role: string }
        ) => {
          // get the organization if someone  logs in
          org = await checkLoggedInOrganization(orgToken)
          const userExists: any = await User.findOne({ _id: user })

          if (!userExists) throw new Error('User does not exist!')

          if (userExists.status?.status === 'drop') {
            throw new Error('The trainee is dropped')
          }

          const Kohort = await Cohort.findOne({ _id: cohort })
          const Phase = await Cohort.findOne({ _id: cohort }).populate(
            'phase',
            'name'
          )

          if (!Kohort) throw new Error('User does not exist!')
          if (!Phase) throw new Error('Phase does not exist!')

          const phaseName = await (Phase as any).phase.name

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
            phase: phaseName,
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
          if (coordinator) {
            pushNotification(
              user,
              `Your ${context.role} has rated you, check your scores.`,
              coordinator!._id,
              'rating'
            )
          }
          // if (userExists.pushNotifications) {
          //   pubsub.publish('NEW_RATING', {
          //     newRating: {
          //       id: addNotifications._id,
          //       receiver: user,
          //       message: 'Have rated you; check your scores.',
          //       sender: coordinator,
          //       read: false,
          //       createdAt: addNotifications.createdAt,
          //     },
          //   })
          // }
          if (userExists.emailNotifications) {
            await sendEmails(
              process.env.SENDER_EMAIL,
              process.env.ADMIN_PASS,
              userExists.email,
              'New Rating notice',
              ratingEmailContent
            )
            return saveUserRating.populate({
              path: 'feedbacks',
              populate: 'sender',
            })
          }
        }
      )
    ),
    async addRatingsByFile(_: any, { file, sprint, orgToken }: { file: FileUpload, sprint: number, orgToken: string }, context: Context) {
      const { userId, role } = (await checkUserLoggedIn(context))([RoleOfUser.COORDINATOR,RoleOfUser.MANAGER,RoleOfUser.TTL])
      const org = await checkLoggedInOrganization(orgToken)
      if (!org) {
        throw new GraphQLError("No such organization found", {
          extensions: {
            code: "ORGANIZATION_NOT_FOUND"
          }
        })
      }
      let currentCohort: any = null
      let userList: string[] = []

      //get user's cohort depending on role
      if(role === RoleOfUser.COORDINATOR){
        currentCohort = await Cohort.findOne({
          coordinator: userId,
          organization: org._id
        }).populate('phase')
        if(!currentCohort){
          throw new GraphQLError("This COORDINATOR account is not associated with any cohort",{
            extensions: {
              code: "COHORT_NOT_FOUND"
            }
          })
        }
        const cohortTrainees = await User.find({cohort: currentCohort._id})
        userList = cohortTrainees.map(trainee=>trainee.email)
      }

      if(role === RoleOfUser.TTL){
        const user = await User.findById(userId)
        currentCohort = await Cohort.findById(user?.cohort).populate('phase')
        if(!currentCohort){
          throw new GraphQLError("This TTL account is not associated with any cohort",{
            extensions: {
              code: "COHORT_NOT_FOUND"
            }
          })
        }
        const team = await Team.findById(user?.team).populate('members')
        if(!team){
          throw new GraphQLError("This TTL account is not associated with any team",{
            extensions: {
              code: "TEAM_NOT_FOUND"
            }
          })
        }
        userList = team.members.map(trainee=>(trainee as any)?.email)
      }

      if(!file){
        throw new GraphQLError("No file provided",{
          extensions: {
            code: "NO_FILE_FOUND"
          }
        })
      }
      const { validRows, invalidRows } = await extractSheetRatings(file)
      const NewRatings: any =[]
      const UpdatedRatings: any =[]
      const RejectedRatings: any =[...invalidRows]

      for(const row of validRows){
        //check if user exists
        const user = await User.findOne({email: row.email,})
        if(user && userList.includes(row.email)){
          //check if user is already rated
          const existingRating = await Rating.findOne({
            user: user._id,
            cohort: currentCohort._id,
            sprint,
          })

          //if rating exists, update it
          if(existingRating){
            const tempRating = await TempData.create({
              user: user._id,
              sprint: existingRating.sprint,
              quantity: existingRating.quantity === row.quantity.toString() ? [existingRating.quantity] : [`${existingRating.quantity}->`,row.quantity],
              quality: existingRating.quality === row.quality.toString() ? [existingRating.quality] : [`${existingRating.quality}->`,row.quality],
              professional_Skills: existingRating.professional_Skills === row.professional_skills.toString() ? [existingRating.professional_Skills] : [`${existingRating.professional_Skills}->`,row.professional_skills],
              feedbacks: [...existingRating.feedbacks.map(rating=>{
                if(rating.sender?.toString() === user._id.toString()){
                  return {...rating, content: row.feedBacks}
                }
                return rating
              })],
              oldFeedback: existingRating.feedbacks.map(feedback=>feedback.content),
              coordinator: existingRating.coordinator,
              cohort: existingRating.cohort,
              approved: false,
              average: (row.quantity + row.quality + row.professional_skills)/3,
              organization: existingRating.organization,
            })
            UpdatedRatings.push(tempRating)
            continue
          }

          const rating = await Rating.create({
            user: user._id,
            sprint: sprint,
            phase: (currentCohort.phase as any).name,
            quantity: row.quantity,
            feedbacks: [{
              sender: userId,
              content: row.feedBacks
            }],
            quality: row.quality,
            professional_Skills: row.professional_skills,
            approved: true,
            coordinator: currentCohort?.coordinator,
            cohort: currentCohort._id,
            average: (row.quality+row.quantity+row.professional_skills)/3,
            organization: org._id,
          })

          const populatedRating = await Rating.findById(rating._id)
          .populate({
            path: 'user',
            strictPopulate: false,
          })
          .populate({
            path: 'feedbacks',
            strictPopulate: false,
            populate: {
              path: 'sender',
              strictPopulate: false,
            }
          })
          .populate({
            path: 'cohort',
            strictPopulate: false,
          })

          NewRatings.push(populatedRating)

          await sendEmails(
            process.env.SENDER_EMAIL,
            process.env.ADMIN_PASS,
            user.email,
            'New Rating notice',
            ratingEmailContent
          )
        }else{
          RejectedRatings.push(row)
        }
      }
      return { 
        NewRatings,
        UpdatedRatings,
        RejectedRatings
      }
    },
    async deleteReply() {
      await Rating.deleteMany({})
      return 'The rating table has been deleted successfully'
    },
    updateRating: authenticated(
      validateTtlOrCoordinator([RoleOfUser.COORDINATOR, RoleOfUser.TTL])(
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
            feedbacks,
            orgToken,
          },
          context: { userId: string }
        ) => {
          const org = await checkLoggedInOrganization(orgToken)

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
          const feedbackContent = oldData?.feedbacks[0].content

          if (
            oldData?.quantity == quantity[0].toString() &&
            oldData?.quantityRemark == quantityRemark[0].toString() &&
            oldData?.quality == quality[0].toString() &&
            oldData?.qualityRemark == qualityRemark[0].toString() &&
            oldData?.professional_Skills == professional_Skills[0].toString() &&
            oldData?.professionalRemark == professionalRemark[0].toString() &&
            (oldData?.feedbacks?.[0]?.content ?? '') ==
            (feedbackContent ?? '') &&
            (feedbacks[0]?.toString() ?? '') == (feedbackContent ?? '')
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

              feedbacks: oldData?.feedbacks.map((feedback) => {
                feedbackContent === feedback.content
                  ? feedback.content
                  : [`${feedbackContent} -> `, feedbacks[0]?.toString()]

                return {
                  content: feedbacks[0]?.toString(),
                  sender: context.userId,
                  createdAt: new Date(),
                }
              }),
              oldFeedback: oldData?.feedbacks[0].content,
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

            // Send a notification to the admin
            const admin = await User.findOne({ role: RoleOfUser.ADMIN })
            if (admin) {
              await pushNotification(
                admin._id,
                `The rating for user ${userExists.email} was edited, you need to approve it`,
                new Types.ObjectId(context.userId),
                'rating'
              )
            }

            return updateRating
          }
        }
      )
    ),

    approveRating: authenticated(
      validateRole(RoleOfUser.ADMIN)(async (root, { user, sprint }) => {
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
          feedbacks: updatedData?.feedbacks ?? [],
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
            feedbacks: updates.feedbacks,
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
        if (userToNotify.emailNotifications) {
          const content = generalTemplate({
            message:
              'We would like to inform you that your ratings have been updated. use the button below to check out your new ratings.',
            buttonText: 'View Ratings',
            link: `${process.env.FRONTEND_LINK}/performance`,
            closingText:
              "If you have any questions or require additional information about your ratings, please don't hesitate to reach out to us.",
          })

          await sendEmails(
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS,
            userToNotify?.email,
            'Ratings notice',
            content
          )
        }

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
          org = await checkLoggedInOrganization(orgToken)
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
          if (!traineee) {
            throw new Error('Traineee not found')
          }
          const addNotifications = await Notification.create({
            receiver: rate?.coordinator
              ?.toString()
              ?.replace(/ObjectId\("(.*)"\)/, '$1'),
            message: 'Have replied you on your remark',
            sender: traineee,
            read: false,
            createdAt: new Date(),
          })

          if (traineee.pushNotifications) {
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
          }
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

      pushNotification(
        sender?.id == rate?.coordinator ? user : rate?.coordinator,
        `Rating feedback: ${content}`,
        sender?.id,
        'rating'
      )
      return {
        content,
        createdAt: new Date(),
        sender,
      }
    },

    rejectRating: authenticated(
      validateRole(RoleOfUser.ADMIN)(async (root, { user, sprint }) => {
        const updatedData: any = await TempData.findOne({
          user: user,
          sprint: sprint,
        })
        const userX = await User.findById(updatedData?.user)
        const findCoordinatorEmail = await User.findById(
          updatedData?.coordinator
        )
        if (!findCoordinatorEmail) {
          throw new Error('Traineee not found')
        }
        if (!userX) throw new Error('User does not exist!')
        await TempData.deleteOne({ user: user, sprint: sprint })
        if (findCoordinatorEmail.emailNotifications) {
          const content = generalTemplate({
            message: `We would like to inform you that the updates you made to the Trainee with email "${userX?.email}" have been rejected.`,
            closingText:
              'If you have any questions or require additional information on the action, please reach out to your admin.',
          })

          await sendEmails(
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS,
            findCoordinatorEmail?.email,
            'Ratings notice',
            content
          )
        }
        return `user ${userX?.email} deleted successfully`
      })
    ),
  },
}
export default ratingResolvers
