import { GraphQLError } from "graphql"
import { Context } from "../context"
import { checkLoggedInOrganization } from "../helpers/organization.helper"
import { checkUserLoggedIn } from "../helpers/user.helpers"
import Phase from "../models/phase.model"
import { RoleOfUser } from "../models/user"
import Sprint from "../models/sprint.model"
import { validateDate, validateStringField } from "../validations"
import { isBefore } from "date-fns"

const sprintResolvers={
    Query:{
        getSprints:  async(_:any, {phaseId, orgToken}:{phaseId: string, orgToken: string}, context: Context)=>{
            validateStringField(phaseId, "Please provide a valid phaseId")
            const org = await checkLoggedInOrganization(orgToken)
            ;(await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN])
            const phase = await Phase.findOne({
                _id: phaseId,
                organization: org._id,
            })
            if(!phase){
                throw new GraphQLError("No such phase found",{
                    extensions: {
                        code: "PHASE_NOT_FOUND"
                    }
                })
            }
            const sprints = await Sprint.find({
                phase: phase._id,
                organization: org._id,
            })
            return sprints
        },
        getSprint:  async(_:any, {sprintId, orgToken}:{sprintId: string, orgToken: string}, context: Context)=>{
            validateStringField(sprintId, "Please provide a valid sprintId")
            const org = await checkLoggedInOrganization(orgToken)
            ;(await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN])
            const sprint = await Sprint.findOne({
                _id: sprintId,
                organization: org._id
            }).populate(['phase', 'organization'])
            if(!sprint){
                throw new GraphQLError("No such sprint found",{
                    extensions: {
                        code: "SPRINT_NOT_FOUND"
                    }
                })
            }
            return sprint
        }
    },
    Mutation:{
        createSprint: async(_:any, {phaseId,startDate,endDate,orgToken}: {phaseId: string, startDate: string, endDate: string, orgToken: string}, context: Context)=>{
            validateDate(startDate, false, "Please enter a valid date")
            validateDate(endDate, false, "Please enter a a valid date")
            if(isBefore(endDate, startDate)){
                throw new GraphQLError("start date can't be before start date",{
                    extensions:{
                        code: "USER_INPUT_ERROR"
                    }
                })
            }
            const org = await checkLoggedInOrganization(orgToken)
            ;(await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN])
            const phase = await Phase.findOne({
                _id: phaseId,
                organization: org._id,
            })
            if(!phase){
                throw new GraphQLError("No such phase found",{
                    extensions: {
                        code: "PHASE_NOT_FOUND"
                    }
                })
            }
            const sprints = await Sprint.find({
                phase: phase._id,
                organization: org._id,
            }).sort({
                sprintNbr: 1
            })
            const newSprint = await Sprint.create({
                phase: phase._id,
                sprintNbr: sprints.length === 0 ? 1 : sprints[sprints.length-1].sprintNbr+1,
                organization: org._id,
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            })
            await newSprint.populate(['phase', 'organization'])
            return newSprint
        },
        updateSprint: async(_:any, {sprintId,startDate, endDate, orgToken}:{sprintId: string, startDate: string, endDate: string, orgToken: string}, context: Context)=>{
            validateDate(startDate, false, "Please enter a valid date")
            validateDate(endDate, false, "Please enter a a valid date")
            if(isBefore(endDate, startDate)){
                throw new GraphQLError("start date can't be before start date",{
                    extensions:{
                        code: "USER_INPUT_ERROR"
                    }
                })
            }
            const org = await checkLoggedInOrganization(orgToken)
            ;(await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN])
            const sprint = await Sprint.findOne({
                _id: sprintId,
                organization: org._id
            }).populate(['phase', 'organization'])
            if(!sprint){
                throw new GraphQLError("No such sprint found",{
                    extensions: {
                        code: "SPRINT_NOT_FOUND"
                    }
                })
            }
            sprint.startDate = startDate
            sprint.endDate = endDate
            await sprint.save()
            return sprint
        },
        deleteSprint: async(_:any, {sprintId, orgToken}:{sprintId: string, orgToken: string}, context: Context)=>{
            const org = await checkLoggedInOrganization(orgToken)
            ;(await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN])
            const sprint = await Sprint.findOne({
                _id: sprintId,
                organization: org._id
            }).populate(['phase', 'organization'])
            if(!sprint){
                throw new GraphQLError("No such sprint found",{
                    extensions: {
                        code: "SPRINT_NOT_FOUND"
                    }
                })
            }
            await Sprint.findByIdAndDelete(sprintId)
        }
    }
}

export default sprintResolvers