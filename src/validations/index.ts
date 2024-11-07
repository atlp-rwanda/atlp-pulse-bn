import { GraphQLError } from "graphql"
import { z } from "zod"

export function validateEmail(email: string, errorMsg: string){
    const data = z.string().email().safeParse(email)
    if(data.error){
        throw new GraphQLError(errorMsg,{
            extensions: {
                code: "VALIDATION_ERROR"
            }
        })
    }
}

export function validateStringField(field: string, errorMsg: string){
    const data = z.string().min(2).safeParse(field)
    if(data.error){
        throw new GraphQLError(errorMsg,{
            extensions: {
                code: "VALIDATION_ERROR"
            }
        })
    }
}

export function validateURLField(field: string, errorMsg: string){
    const data = z.string().url().safeParse(field)
    if(data.error){
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