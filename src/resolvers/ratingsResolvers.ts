import Rating from '../models/ratings'
import User, { RoleOfUser } from '../models/user'
import { Organization } from '../models/organization.model'
import { sendEmails } from '../utils/sendEmails'
import { Context } from './../context'
import Cohort from '../models/cohort.model'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { Notification } from '../models/notification.model'
import { checkLoggedInOrganization, isPartOfOrganization } from '../helpers/organization.helper'
import generalTemplate from '../utils/templates/generalTemplate'
import { PubSub, withFilter } from 'graphql-subscriptions'
import { pushNotification } from '../utils/notification/pushNotification'
import { GraphQLError } from 'graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'
import { extractSheetRatings, FileRating } from '../utils/sheets/extractSheetRatings'
import Team from '../models/team.model'
import Sprint from '../models/sprint.model'
import { validateNumber, validateObjectId, validateStringField } from '../validations'
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
const ratingResolvers = {
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
    async FetchRatings(
      _: any,
      { orgToken }: {orgToken: string},
      context: Context
    ) {
      // get the organization if someone  logs in
      org = await checkLoggedInOrganization(orgToken)
      const {user, orgUserData} = (await checkUserLoggedIn(org, context))(Object.values(RoleOfUser))
      switch(orgUserData.role){
        case RoleOfUser.SUPER_ADMIN:
        case RoleOfUser.ADMIN:
        case RoleOfUser.MANAGER:
          return await Rating.find({
            organization: org._id,
            approved: true,
          }).populate(['user','cohort',{
            path: 'feedbacks',
            populate: 'sender'
          }])
        case RoleOfUser.COORDINATOR:
          const cohorts = await Cohort.find({
            coordinator: user._id,
            organization: org._id
          })
          return await Rating.find({
            cohort:{
              $in: cohorts.map(cohort=>cohort._id)
            },
            organization: org._id,
            approved: true,
          }).populate(['user','cohort',{
            path: 'feedbacks',
            populate: 'sender'
          }])
        case RoleOfUser.TTL:
          const ttlTeam = await Team.findOne({
            ttl: user._id,
            organization: org._id,
          })
          if(!ttlTeam){
            throw new GraphQLError("You are not assigned to any team as a ttl",{
              extensions: {
                code: "TEAM_NOT_FOUND"
              }
            })
          }
          return await Rating.find({
            user: {
              $in: ttlTeam.members
            },
            organization: org._id,
            approved: true,
          }).populate(['user','cohort',{
            path: 'feedbacks',
            populate: 'sender'
          }])
        case RoleOfUser.TRAINEE:
          return await Rating.find({
            user: user._id,
            organization: org._id,
            approved: true,
          })
        default:
          throw new GraphQLError("Invalid User Role",{
            extensions:{
              code: "FORBIDDEN"
            }
          })
      }
    },

    async FetchRatingsByCohort(_:any, {cohortId, orgToken}: {cohortId: string,orgToken: string}, context: Context){
      const org = await checkLoggedInOrganization(orgToken)
      const {user, orgUserData} = (await checkUserLoggedIn(org,context))([ RoleOfUser.ADMIN, RoleOfUser.MANAGER, RoleOfUser.COORDINATOR, RoleOfUser.TTL])

      const cohort = await Cohort.findById(cohortId)
      if(!cohort){
        throw new GraphQLError("No cohort is associated with this user",{
          extensions: {
            code: "COHORT_NOT_FOUND"
          }
        })
      }
      if(cohort.organization.toString() !== org._id.toString()){
        throw new GraphQLError(`Cohort ${cohort.name} is not part of organization ${org.name}`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      const ratings = await Rating.find({
        cohort: cohort._id,
        organization: org._id,
        approved: true,
      }).populate(['user','cohort',{
        path: 'feedbacks',
        populate: 'sender'
      }])
      return ratings
    },

    FetchRatingUpdates: async(_:any,{orgToken}:{orgToken: string}, context: Context)=>{
      validateStringField(orgToken, "Please provide a valid organization token")
      const org = await checkLoggedInOrganization(orgToken)
      const {user, orgUserData} = (await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN])
      const ratingUpdates = await Rating.find({
        organization: org._id,
        approved: false,
      }).populate(['user','cohort',{
        path: 'feedbacks',
        populate: 'sender'
      }])
      return ratingUpdates
    },

    FetchRatingsBySprint: async(_:any,{sprintId, orgToken}:{sprintId: string, orgToken: string},context: Context)=>{
      validateObjectId(sprintId, "Please enter a valid sprint Id")
      validateStringField(orgToken, "Please enter a valid organization token")
      const org = await checkLoggedInOrganization(orgToken)
      const {user, orgUserData} = (await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN,RoleOfUser.COORDINATOR,RoleOfUser.TTL,RoleOfUser.TRAINEE])
      const sprint = await Sprint.findById(sprintId)
      if(!sprint){
        throw new GraphQLError("No such sprint found",{
          extensions:{
            code: "SPRINT_NOT_FOUND"
          }
        })
      }
      if(sprint.organization.toString() !== org._id.toString()){
        throw new GraphQLError(`This sprint was not found in organization ${org.name}`,{
          extensions:{
            code: "FORBIDDEN"
          }
        })
      }
      switch(orgUserData.role){
        case RoleOfUser.ADMIN:
          return await Rating.find({
            sprint: sprint._id,
            organization: org._id,
            approved: true
          })
        case RoleOfUser.COORDINATOR:
          const cohorts = await Cohort.find({
            coordinator: user._id,
            organization: org._id,
          })
          if(cohorts.length===0){
            throw new GraphQLError("No cohorts are assigned to you",{
              extensions:{
                code: "FORBIDDEN"
              }
            })
          }
          return await Rating.find({
            sprint:sprint._id,
            cohort:{
              $in: cohorts.map(cohort=>cohort._id)
            },
            organization: org._id
          })
        case RoleOfUser.TTL:
          const ttlTeam = await Team.findOne({
            ttl: user._id,
            organization: org._id
          })
          if(!ttlTeam){
            throw new GraphQLError("No team is assigned to you",{
              extensions:{
                code: "FORBIDDEN"
              }
            })
          }
          return await Rating.find({
            user: {
              $in: ttlTeam.members,
            },
            sprint: sprint._id,
            organization: org._id,
          })
        case RoleOfUser.TRAINEE:
          return Rating.find({
            user: user._id,
            sprint: sprint._id,
            organization: org._id
          })
        default:
          throw new GraphQLError("Invalid Role",{
            extensions:{
              code: "FORBIDDEN"
            }
          })
      }
    },

    // async fetchTrainees(
    //   _: any,
    //   args: any,
    //   context: { role: string; userId: string }
    // ) {
    //   const id = context.userId
    //   if (!id) throw new Error('it seems you have not logged in')
    //   const trainees = await Cohort.find({ coordinator: id }).populate({
    //     path: 'members',
    //     populate: {
    //       path: 'program',
    //       match: context.role === RoleOfUser.COORDINATOR,
    //       strictPopulate: false,
    //       populate: {
    //         path: 'organization',
    //         strictPopulate: false,
    //       },
    //     },
    //   })

    //   return trainees
    // },

    // async fetchRatingByCohort(_: any, { CohortName }: any, context: Context) {
    //   ; (await checkUserLoggedIn(context))([
    //     RoleOfUser.COORDINATOR,
    //     RoleOfUser.ADMIN,
    //     RoleOfUser.TRAINEE,
    //     RoleOfUser.TTL,
    //   ])
    //   return (
    //     await Rating.find({}).populate([
    //       'cohort',
    //       'user',
    //       {
    //         path: 'feedbacks',
    //         populate: 'sender',
    //       },
    //     ])
    //   ).filter((rating: any) => {
    //     return !!rating.cohort && rating.cohort.name == CohortName
    //   })
    // },

    // async fetchCohortsCoordinator(
    //   _: any,
    //   args: any,
    //   context: { role: string; userId: string }
    // ) {
    //   const id = context.userId
    //   if (!id) throw new Error('it seems you have not logged in')
    //   const trainees = await Cohort.find({
    //     coordinator: id,
    //     name: args.cohortName,
    //   }).populate({
    //     path: 'members',
    //     populate: {
    //       path: 'program',
    //       match: context.role === RoleOfUser.COORDINATOR,
    //       strictPopulate: false,
    //       populate: {
    //         path: 'organization',
    //         strictPopulate: false,
    //       },
    //     },
    //   })
    //   return trainees
    // },
  },
  Mutation: {
    AddRatings: async (
          _:any,
          {userId,sprintId,quantity,quality,professional_Skills,feedback,orgToken}:{
            userId: string,
            sprintId: string,
            quantity: number,
            quality: number,
            professional_Skills: string,
            feedback: string
            orgToken: string
          },
          context: Context
        ) => {
      //validation
      validateObjectId(userId, "Please enter a valid userId")
      validateObjectId(sprintId, "Please enter a valid sprintId")
      validateNumber(quantity, 0, 2, "Please enter a quantity value between 0 and 2")
      validateNumber(quality, 0, 2, "Please enter a quality value between 0 and 2")
      validateNumber(professional_Skills, 0, 2, "Please enter a professional_skills between 0 and 2")
      validateStringField(feedback, "Please enter valid feeback")
      validateStringField(orgToken, "Please enter a valid organization token")
          // get the organization if someone  logs in
          org = await checkLoggedInOrganization(orgToken)
          const { user, orgUserData: loggedInUserData } = (await checkUserLoggedIn(org, context))([RoleOfUser.COORDINATOR, RoleOfUser.TTL])
          const userExists = await User.findById(userId)

          if (!userExists){
            throw new GraphQLError('No such user found',{
              extensions: {
                code: "USER_NOT_FOUND"
              }
            })
          }
          const userData = isPartOfOrganization(userExists, org)
          //check if trainee is dropped
          if (userData.status?.status === 'drop') {
            throw new GraphQLError('The trainee is dropped',{
              extensions:{
                code: "FORBIDDEN"
              }
            })
          }
          //check if user is a trainee
          if (userData.role === RoleOfUser.TRAINEE) {
            throw new GraphQLError('This user is not a trainee',{
              extensions:{
                code: "FORBIDDEN"
              }
            })
          }
          //check if user belongs to coordinator's cohort or ttl's team
          switch(loggedInUserData.role){
            case RoleOfUser.COORDINATOR:
              const coordinatorCohorts = await Cohort.find({
                coordinator: user._id,
                organization: org._id
              })
              if(userData.cohort && !coordinatorCohorts.map(cohort=>cohort._id.toString()).includes(userData.cohort.toString())){
                throw new GraphQLError(`User ${userExists.email} is not part of cohorts assigned to you.`,{
                  extensions: {
                    code: "FORBIDDEN"
                  }
                })
              }
              break
            case RoleOfUser.TTL:
              const team = await Team.findOne({
                ttl: user._id,
                organization: org._id
              })
              if(!team){
                throw new GraphQLError("No team is assigned to you",{
                  extensions:{
                    code: "TEAM_NOT_FOUND"
                  }
                })
              }
              if(userData.team && userData.team.toString() !== team._id.toString()){
                throw new GraphQLError(`User ${userExists.email} is not part of the team assigned to you`,{
                  extensions: {
                    code: "FORBIDDEN"
                  }
                })
              }
            break
            default:
              throw new GraphQLError("Invalid Role", {
                extensions: {
                  code: "FORBIDDEN"
                }
              })
          }
          //check if sprint exists
          const sprint = await Sprint.findById(sprintId).populate('phase')
          if (!sprint){
            throw new GraphQLError('No such sprint found',{
              extensions: {
                code: "SPRINT_NOT_FOUND"
              }
            })
          }
          if(sprint.organization.toString() !== org._id.toString()){
            throw new GraphQLError(`This sprint is not found in organization ${org.name}`,{
              extensions:{
                code: "FORBIDDEN"
              }
            })
          }
          //check if trainee is not already rated
          const existingRating = await Rating.findOne({
            sprint: sprint._id,
            user: userExists._id,
            organization: org._id,
          })
          if(existingRating){
            throw new GraphQLError(`User ${userExists.email}'s sprint ${sprint.sprintNbr} is already rated`,{
              extensions: {
                code: "FORBIDDEN"
              }
            })
          }
          const newRating = await Rating.create({
            user: userExists._id,
            sprint: sprint._id,
            phase: sprint.phase,
            quality: quality,
            quantity: quantity,
            professional_Skills: professional_Skills,
            feedbacks: [{
              sender: user._id,
              content: feedback
            }],
            cohort: userData.cohort,
            organization: org._id
          })

          if(userData.pushNotifications){
            pushNotification(
              userExists._id,
              `New ratings for sprint ${sprint.sprintNbr} are ready`,
              user._id,
              org._id,
              'rating'
            )
          }
          if (userData.emailNotifications) {
            await sendEmails(
              process.env.SENDER_EMAIL,
              process.env.ADMIN_PASS,
              userExists.email,
              'New Rating notice',
              ratingEmailContent
          )
          await newRating.populate({
            path: 'feedbacks',
            populate: 'sender'
          })
        }
    },
    async AddRatingsByFile(_: any, { file,sprintId, orgToken }: { file: FileUpload, sprintId: string, orgToken: string }, context: Context) {
      const org = await checkLoggedInOrganization(orgToken)
      const { user, orgUserData: loggedInUserData } = (await checkUserLoggedIn(org, context))([RoleOfUser.COORDINATOR,RoleOfUser.MANAGER,RoleOfUser.TTL])
      const sprint = await Sprint.findById(sprintId)
      if(!sprint){
        throw new GraphQLError("No such sprint found",{
          extensions: {
            code: "SPRINT_NOT_FOUND"
          }
        })
      }
      if(sprint.organization.toString() !== org._id.toString()){
        throw new GraphQLError(`This sprint was not found in organization ${org.name}`,{
          extensions:{
            code: "FORBIDDEN"
          }
        })
      }

      let coordinatorCohorts: any[] = []
      let ttlTeam = null

      switch(loggedInUserData.role){
        case RoleOfUser.COORDINATOR:
          const cohorts = await Cohort.find({
            coordinator: user._id,
            organization: org._id
          })
          if(cohorts.length===0){
            throw new GraphQLError("You not assigned as coordinator to any cohort",{
              extensions:{
                code: "FORBIDDEN"
              }
            })
          }
          coordinatorCohorts= cohorts.map(cohort=>cohort._id.toString())
          break
        case RoleOfUser.TTL:
          ttlTeam = await Team.findOne({
            ttl: user._id,
            organization: org._id
          })
          if(!ttlTeam){
            throw new GraphQLError("You not assigned as ttl to any team",{
              extensions:{
                code: "FORBIDDEN"
              }
            })
          }
          break
        default:
          throw new GraphQLError(`User ${user.email} has invalid user role`,{
            extensions: {
              code: "FORBIDDEn"
            }
          })
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
        const existingUser = await User.findOne({
          email: row.email,
        })
        if(!existingUser){
          RejectedRatings.push(existingUser)
          continue
        }
        const userData = existingUser.organizations.find(data=>data.orgId.toString()===org._id.toString())
        if(!userData){
          RejectedRatings.push(row)
          continue
        }
        //check if the logged in user has permission to rate this user
        if (loggedInUserData.role === RoleOfUser.COORDINATOR && !coordinatorCohorts.includes(userData.cohort?.toString())) {
          RejectedRatings.push(row)
          continue
        }
        if(loggedInUserData.role === RoleOfUser.TTL && ttlTeam && ttlTeam._id.toString() === userData.team?.toString()){
          RejectedRatings.push(row)
          continue
        }
          //check if user is already rated
          const existingRating = await Rating.findOne({
            user: user._id,
            sprint: sprint._id,
            organization: org._id,
          })

          //if rating exists, update it
          if(existingRating){
            const temporaryRating = await Sprint.create({
              user: existingUser._id,
              sprint: sprint._id,
              quantity: row.quantity,
              quality: row.quality,
              professional_Skills: row.professional_skills,
              feedbacks: [{
                sender: user._id,
                content: row.feedBacks,
              }],
              cohort: existingRating.cohort,
              approved: false,
              organization: existingRating.organization,
            })
            UpdatedRatings.push(temporaryRating)
            continue
          }

          const rating = await Rating.create({
            user: existingUser._id,
            sprint: sprint._id,
            phase: sprint.phase,
            quantity: row.quantity,
            feedbacks: [{
              sender: user._id,
              content: row.feedBacks
            }],
            quality: row.quality,
            professional_Skills: row.professional_skills,
            approved: true,
            cohort: userData.cohort,
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

          if(userData.pushNotifications){
            pushNotification(
              existingUser._id,
              `New ratings for sprint ${sprint.sprintNbr} are ready`,
              user._id,
              org._id,
              'rating'
            )
          }
          if(userData.emailNotifications){
            await sendEmails(
              process.env.SENDER_EMAIL,
              process.env.ADMIN_PASS,
              existingUser.email,
              'New Rating notice',
              ratingEmailContent
            )
          }
      }
      return { 
        NewRatings,
        UpdatedRatings,
        RejectedRatings
      }
    },
    UpdateRating:
        async (_: any,{userId,sprintId,quantity,quality,professional_Skills,feedback,orgToken}:{
            userId:string,
            sprintId: string,
            quantity: number,
            quality: number,
            professional_Skills: number,
            feedback: string,
            orgToken: string
          },
          context: Context
        ) => {
          //validation
          validateObjectId(userId,"Please enter a valid userId")
          validateObjectId(sprintId,"Please enter a valid sprintId")
          validateNumber(quantity,0,2,"Please enter a quantity value between 0 and 2")
          validateNumber(quality,0,2,"Please enter a quality value between 0 and 2")
          validateNumber(professional_Skills,0,2, "Please enter a professional_skills between 0 and 2")
          validateStringField(feedback,"Please enter valid feeback")
          validateStringField(orgToken, "Please enter a valid organization token")

          const org = await checkLoggedInOrganization(orgToken)
          const {user, orgUserData: loggedInUserData} = (await checkUserLoggedIn(org, context))([RoleOfUser.COORDINATOR, RoleOfUser.TTL])
          const userExists = await User.findById(userId)
          if (!userExists){
            throw new GraphQLError('User does not exist!',{
              extensions: {
                code: "USER_NOT_FOUND"
              }
            }) 
          } 
          const userData = isPartOfOrganization(userExists, org)
          if(loggedInUserData.role === RoleOfUser.COORDINATOR){
            const cohorts = await Cohort.find({
              coordinator: user._id,
              organization: org._id,
            })
            if(!cohorts.map(cohort=>cohort._id.toString()).includes(userData.cohort?.toString() || "")){
              throw new GraphQLError("This user is not part of the cohorts assined to you",{
                extensions: {
                  code: "FORBIDDEN"
                }
              })
            }
          }
          if(loggedInUserData.role === RoleOfUser.TTL){
            const ttlTeam = await Team.findOne({
              ttl: user._id,
              organization: org._id,
            })
            if(!ttlTeam){
              throw new GraphQLError("Tou have not been assigned to a team",{
                extensions: {
                  code: "FORBIDDEN"
                }
              })
            }
            if(ttlTeam._id.toString() === userData.team?.toString()){
              throw new GraphQLError("This user is not part of the team assigned to you",{
                extensions: {
                  code: "FORBIDDEN"
                }
              })
            }
          }
          const sprint = await Sprint.findById(sprintId)
          if(!sprint){
            throw new GraphQLError("Sprint not found",{
              extensions:{
                code: "SPRINT_NOT_FOUND"
              }
            })
          }
          if(sprint.organization.toString() !== org._id.toString()){
            throw new GraphQLError(`his sprint was not found in organization ${org.name}`,{
              extensions:{
                code: "FORBIDDEN"
              }
            })
          }
          const existingRating = await Rating.findOne({
            user: userExists._id,
            sprint: sprint._id,
            approved: true
          })
          if(!existingRating){
            throw new GraphQLError(`Sprint ${sprint.sprintNbr} is not yet rated`,{
              extensions: {
                code: "FROBIDDEN"
              }
            })
          }
          
          const updatedRating = await Rating.create({
            user: userExists._id,
            sprint: sprint._id,
            quantity,
            quality,
            professional_Skills,
            feedbacks: [{
              sender: user._id,
              content: feedback
            }],
            cohort: userData.cohort,
            organization: org._id,
            approved: false,
          })
            for(const adminId of org.admin){
              await pushNotification(
                adminId,
                `The rating for user ${userExists.email} was edited, you need to approve it`,
                user._id,
                org._id,
                'rating'
              )
            }
            return updatedRating
          }
        },

    ApproveOrRejectRating: async (_:any, { ratingId, action, orgToken }: {ratingId: string, action: string, orgToken: string}, context: Context) => {
      const org = await checkLoggedInOrganization(orgToken)
      const {user, orgUserData: loggedInUserData} = (await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN])
      //check if the rating update exists
      const ratingUpdate = await Rating.findById(ratingId)
      if(!ratingUpdate){
        throw new GraphQLError("No such rating found",{
          extensions:{
            code: "RATING_NOT_FOUND"
          }
        })
      }
      if(ratingUpdate.organization.toString() !== org._id.toString()){
        throw new GraphQLError(`This rating update was not found in organization ${org.name}`,{
          extensions:{
            code: "FORBIDDEN"
          }
        })
      }
      if(ratingUpdate.approved){
        throw new GraphQLError("This rating is already approved",{
          extensions:{
            code: "FORBIDDEN"
          }
        })
      }
      const realRating = await Rating.findOne({
        user: ratingUpdate.user,
        sprint: ratingUpdate.sprint,
        organization: org._id,
        approved: true
      })
      if(!realRating){
        throw new GraphQLError("This rating you are trying to update does not exist",{
          extensions:{
            code: "FORBIDDEN"
          }
        })
      }
      const ratedUser = await User.findById(realRating.user)
      if(!ratedUser){
        throw new GraphQLError("The user your are trying to rate no longer exists",{
          extensions:{
            code: "USER_NOT_FOUND"
          }
        })
      }
      const userData = isPartOfOrganization(ratedUser, org)
      switch(action){
        case "approve":
          realRating.quality = ratingUpdate.quality,
          realRating.quantity = ratingUpdate.quantity,
          realRating.professional_Skills = ratingUpdate.professional_Skills
          const previousfeedback = realRating.feedbacks.find(feedback=> feedback.sender?.toString() === ratingUpdate.feedbacks[0].sender?.toString())
          if(previousfeedback){
            previousfeedback.content=ratingUpdate.feedbacks[0].content
          }else{
            realRating.feedbacks.push({
              sender: ratingUpdate.feedbacks[0].sender,
              content: ratingUpdate.feedbacks[0].content,
              createdAt: ratingUpdate.feedbacks[0].createdAt
            })
          }
          await realRating.save()
          if (userData.emailNotifications) {
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
              ratedUser.email,
              'Ratings notice',
              content
            )
          }
          break
        case "reject":
          await Rating.findByIdAndDelete(ratingId)
          if (loggedInUserData.emailNotifications) {
            const content = generalTemplate({
              message: `We would like to inform you that the updates you made to the Trainee with email "${ratedUser.email}" have been rejected.`,
              closingText:
                'If you have any questions or require additional information on the action, please reach out to your admin.',
            })

            await sendEmails(
              process.env.ADMIN_EMAIL,
              process.env.ADMIN_PASS,
              user.email,
              'Ratings notice',
              content
            )
          }
          break
        default:
          throw new GraphQLError("Invalid Action, please approve or reject this rating update",{
            extensions:{
              code: "USER_INPUT_ERROR"
            }
          })
      }
      return realRating
    },
    // updateToReply: authenticated(
    //   validateRole('trainee')(
    //     async (
    //       root,
    //       {
    //         user,
    //         sprint,
    //         orgToken,
    //       },
    //       context: { userId: string }
    //     ) => {
    //       org = await checkLoggedInOrganization(orgToken)
    //       const updateReply = await Rating.findOneAndUpdate(
    //         { user: user, sprint: sprint },
    //         { new: true }
    //       )

    //       const traineee = await User.findOne({ _id: context.userId })
    //       const rate = await Rating.findOne({
    //         user: user,
    //         sprint: sprint,
    //       })
    //       if (!traineee) {
    //         throw new Error('Traineee not found')
    //       }
    //       const addNotifications = await Notification.create({
    //         receiver: rate?.coordinator
    //           ?.toString()
    //           ?.replace(/ObjectId\("(.*)"\)/, '$1'),
    //         message: 'Have replied you on your remark',
    //         sender: traineee,
    //         read: false,
    //         createdAt: new Date(),
    //       })

    //       if (traineee.pushNotifications) {
    //         pubsub.publish('NEW_RATING', {
    //           newRating: {
    //             id: addNotifications._id,
    //             receiver: rate?.coordinator
    //               ?.toString()
    //               ?.replace(/ObjectId\("(.*)"\)/, '$1'),
    //             message: addNotifications.message,
    //             sender: traineee,
    //             read: false,
    //             createdAt: addNotifications.createdAt,
    //           },
    //         })
    //       }
    //       return [updateReply]
    //     }
    //   )
    // ),
    AddRatingFeedback: async (
      _: any,
      { ratingId, feedback, orgToken }: { ratingId: string, feedback: string, orgToken: string},
      context: Context
    ) => {
      validateObjectId(ratingId, "Please provide a valid rating Id")
      validateStringField(feedback, "Please provide valid feedback")
      const org = await checkLoggedInOrganization(orgToken)
      const {user, orgUserData} = (await checkUserLoggedIn(org, context))([RoleOfUser.COORDINATOR, RoleOfUser.TTL])
      const rating = await Rating.findById(ratingId)
      if (!rating){
        throw new GraphQLError(`No such rating found`,{
          extensions: {
            code: "RATING_NOT_FOUND"
          }
        })
      }
      if(rating.organization.toString()!==org._id.toString()){
        throw new GraphQLError(`This rating was not found in organization ${org.name}`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      if(!rating.approved){
        throw new GraphQLError("This rating update is not yet approved",{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      rating.feedbacks.push({
        content: feedback,
        sender: user._id,
        createdAt: new Date(),
      })
      await rating.save()

      // pubsub.publish('NEW_FEEDBACK', {
      //   sprint,
      //   user,
      //   newfeedback: {
      //     content,
      //     createdAt: new Date(),
      //     sender,
      //   },
      // })
      // pubsub.publish('NEW_FEEDBACKS', {
      //   sprint,
      //   user,
      //   newfeedbacks: {
      //     sprint,
      //     user,
      //     data: {
      //       content,
      //       createdAt: new Date(),
      //       sender,
      //     },
      //   },
      // })

      pushNotification(
        rating.user,
        `Rating feedback: ${feedback}`,
        user._id,
        org._id,
        'rating'
      )
      return rating
    },
}
export default ratingResolvers
