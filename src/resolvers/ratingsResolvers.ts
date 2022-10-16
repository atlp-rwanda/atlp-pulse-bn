import mongoose from 'mongoose'
import { Rating, TempData } from '../models/ratings'
import { Organization, User } from '../models/user'
import  { sendEmail } from '../utils/sendEmails'
import Cohort from '../models/cohort.model'
import { authenticated, validateRole } from '../utils/validate-role'
import { checkLoggedInOrganization } from '../helpers/organization.helper'

let org: InstanceType<typeof Organization>

const ratingResolvers = {
    Query: {
        async fetchRatings(_:any,{ orgToken }: any,context: {role: string,userId: string}) { 
            // get the organization if someone  logs in  
            org = await checkLoggedInOrganization(orgToken)        
            const ratings = await Rating.find({coordinator: context.userId, organization: org}).populate('user')
            return ratings
        },

        async fetchRatingsForAdmin(_:any,{ orgToken }: any) {
            org = await checkLoggedInOrganization(orgToken) 
            const ratingsAdmin = await TempData.find({organization: org}).populate('user')
            return ratingsAdmin
        },

        async fetchTrainees(_:any,args: any,context: {role: string,userId: string}) {
            const id = context.userId
            if(!id)
                throw new Error('it seems you have not logged in')
            const trainees = await Cohort.find({ coordinator: id}).populate({
                path: 'members',
                populate: {
                    path: 'program',
                    match: context.role === 'coordinator',
                    strictPopulate: false,
                    populate: {
                        path: 'organization',
                        strictPopulate: false,
                    },
                }                         
            })
            return trainees
        },

        async fetchCohortsCoordinator(_:any,args: any,context: {role: string,userId: string}) {
            const id = context.userId
            if(!id)
                throw new Error('it seems you have not logged in')
            const trainees = await Cohort.find({ coordinator: id ,  name: args.cohortName }).populate({
                path: 'members',
                populate: {
                    path: 'program',
                    match: context.role === 'coordinator',
                    strictPopulate: false,
                    populate: {
                        path: 'organization',
                        strictPopulate: false,
                    },
                }                         
            })
            return trainees
        },

       

        async fetchRatingsTrainee(_:any,args: any,context: {role: string,userId: string} ) {
            const loggedId = context.userId
            const findRatings = Rating.find({user: loggedId}).populate('user')
            return findRatings
        }

    },
    Mutation: {
        addRatings: authenticated(
            validateRole('coordinator')(
                async (
                    root,
                    { user, sprint, quantity,quantityRemark, quality, qualityRemark,
                        professional_Skills, professionalRemark, orgToken }, context: {userId: string}
                ) => {
                    // get the organization if someone  logs in
                    org = await checkLoggedInOrganization(orgToken) 
                    const userExists = await User.findOne( { _id: user })
                    if (!userExists) 
                        throw new Error('User does not exist!')
                    const findSprint = await Rating.find({ sprint: sprint , user: user})
                    if(findSprint.length !== 0)
                        throw  new Error('The sprint has recorded ratings') 
                    if (!mongoose.isValidObjectId(user))
                        throw new Error('Invalid user id')
                    const saveUserRating = await Rating.create({
                        user,
                        sprint,
                        quantity,
                        quantityRemark,
                        quality,
                        qualityRemark,
                        professional_Skills,
                        professionalRemark,
                        coordinator: context.userId,
                        organization: org
                    })             
                    await sendEmail( process.env.COORDINATOR_EMAIL, process.env.COORDINATOR_PASS ,userExists.email, 'Trainee','Ratings Notification')
                    return saveUserRating
                }
            )
        ),


        updateRating: authenticated(
            validateRole('coordinator')(
                async (
                    root,
                    { user, sprint, quantity,quantityRemark, quality, qualityRemark, 
                        professional_Skills, professionalRemark, orgToken }
                ) => {
                    org = await checkLoggedInOrganization(orgToken)
                    const oldData: any = await Rating.find({ user: user, sprint: sprint})
                    const userExists = await Rating.find({ where: { user: user, sprint: sprint } })
                    if (!userExists) throw new Error('User does not exist!')
                    const findSprint = await TempData.find({ sprint: sprint , user: user})
                    if(findSprint.length !== 0)
                        await TempData.deleteOne({sprint: sprint , user: user})
                    const updateRating = await TempData.create({
                        user,
                        sprint,
                        quantity: oldData[0]?.quantity == quantity[0].toString() ? 
                            oldData[0]?.quantity : [oldData[0]?.quantity + '->', quantity?.toString()],
                        quantityRemark: oldData[0]?.quantityRemark == quantityRemark[0].toString() ? 
                            oldData[0]?.quantityRemark : [oldData[0]?.quantityRemark + '->', quantityRemark?.toString()],
                        quality: oldData[0]?.quality == quality[0].toString() ? 
                            oldData[0]?.quality : [oldData[0]?.quality+ '->', quality?.toString()],
                        qualityRemark: oldData[0]?.qualityRemark == qualityRemark[0].toString() ? 
                            oldData[0]?.qualityRemark : [oldData[0]?.qualityRemark +'->', qualityRemark?.toString()],
                        professional_Skills: oldData[0]?.professional_Skills == professional_Skills[0].toString() ? 
                            oldData[0]?.professional_Skills : [oldData[0]?.professional_Skills+ '->', professional_Skills?.toString()],
                        professionalRemark: oldData[0]?.professionalRemark == professionalRemark[0].toString() ? 
                            oldData[0]?.professionalRemark: [oldData[0]?.professionalRemark + '->', professionalRemark?.toString()],
                        approved:false,
                        organization: org
                    })
                    return updateRating
                }
            )
        ),

        approveRating: authenticated(
            validateRole('admin')(
                async (
                    root,
                    { user, sprint }
                ) => {
                    const oldData: any = await Rating.find({ user: user, sprint: sprint})
                    const updatedData: any = await TempData.find({ user: user, sprint: sprint})
                    const userToNotify= await User.find({_id: updatedData[0].user})
                    if (!userToNotify) 
                        throw new Error('User does not exist!')
                    const update = await Rating.findOneAndUpdate(
                        { user: user , sprint: sprint},
                        {
                            quantity: updatedData[0].quantity== '' ? 
                                oldData[0].quantity : updatedData[0]?.quantity[1] ,
                            quantityRemark: updatedData[0].quantityRemark == 'no remark' ? 
                                oldData[0]?.quantityRemark : updatedData[0]?.quantityRemark[1] ,
                            quality: updatedData[0].quality== '' ? oldData[0].quality : updatedData[0]?.quality[1],
                            qualityRemark: updatedData[0].qualityRemark == 'no remark' ? 
                                oldData[0]?.qualityRemark : updatedData[0]?.qualityRemark[1],
                            professional_Skills: updatedData[0].professional_Skills== '' ? 
                                oldData[0]?.professional_Skills : updatedData[0]?.professional_Skills[1] ,
                            professionalRemark: updatedData[0].professionalRemark == 'no remark' ? 
                                oldData[0]?.professionalRemark : updatedData[0]?.professionalRemark[1],
                            approved: true,
                        },
                        { new: true }
                    )

                    await TempData.deleteOne({sprint: sprint , user: user})
                    await sendEmail( process.env.ADMIN_EMAIL,process.env.ADMIN_PASS ,userToNotify[0].email, 'Trainee ratings','Ratings Notification')
                    return update
                }
            )
        ),


        rejectRating : authenticated(
            validateRole('admin')(
                async (
                    root,
                    { user, sprint }
                ) => {
                    const updatedData: any = await TempData.find({ user: user, sprint: sprint})
                    const userX= await User.find({_id: updatedData[0].user})
                    if (!userX) 
                        throw new Error('User does not exist!')
                    await TempData.deleteOne({ user: user, sprint: sprint})
                    return (`user ${userX[0].email} deleted successfully` )
                }
            )
        ),
    },
}
export default ratingResolvers