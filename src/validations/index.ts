import { isBefore } from "date-fns"
import { GraphQLError } from "graphql"
import { isValidObjectId } from "mongoose"
import { z } from "zod"

export function validateEmail(email: any, errorMsg: string){
    const data = z.string().email().safeParse(email)
    if(data.error){
        throw new GraphQLError(errorMsg,{
            extensions: {
                code: "VALIDATION_ERROR"
            }
        })
    }
}

export function validateStringField(field: any, errorMsg: string){
    const data = z.string().min(2).safeParse(field)
    if(data.error){
        throw new GraphQLError(errorMsg,{
            extensions: {
                code: "VALIDATION_ERROR"
            }
        })
    }
}

export function validateURLField(field: any, errorMsg: string){
    const data = z.string().url().safeParse(field)
    if(data.error){
        throw new GraphQLError(errorMsg,{
            extensions: {
                code: "VALIDATION_ERROR"
            }
        })
    }
}

export function validateObjectId(field: any, errorMsg: string){
    if(!isValidObjectId(field)){
        throw new GraphQLError(errorMsg,{
            extensions: {
                code: "VALIDATION_ERROR"
            }
        })
    }
}

export function validateNumber(field: any,lower: number,upper: number,errorMsg: string){
    const {error} = z.number().gte(lower).lte(upper).safeParse(field)
    if(error){
        throw new GraphQLError(errorMsg,{
            extensions: {
                code: "VALIDATION_ERROR"
            }
        })
    }
}

export function validatePasswordField(field: string, errorMsg: string){
    const data = z.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/).safeParse(field)
    if(data.error){
        throw new GraphQLError(errorMsg,{
            extensions: {
                code: "VALIDATION_ERROR"
            }
        })
    }
}

export function validateDate(date: any, allowDatesBeforeToday: Boolean, errorMsg: string){
    const data = z.string().date().safeParse(date)
    if(data.error){
        throw new GraphQLError(errorMsg,{
            extensions: {
                code: "VALIDATION_ERROR"
            }
        })
    }
    if(!allowDatesBeforeToday && isBefore(date, new Date())){
        throw new GraphQLError("This date must be today or in the future",{
            extensions: {
                code: "USER_INPUT_ERROR"
            }
        })
    }
}

