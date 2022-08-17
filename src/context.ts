import { Request } from "express";
import * as jwt from "jsonwebtoken"

const SECRET = process.env.SECRET || "test_secret"
export interface AuthTokenPayload {
    userId: string;
    role: string;

}

export const decodeAuthHeader=(authHeader:string): AuthTokenPayload =>{
    const token = authHeader.replace("Bearer ", "")
    if (!token) {
        throw new Error("No token was found")
    }

    jwt.verify(token, SECRET, (err, user)=>{
        console.log(err)
        if (err) throw new Error("Invalid or expired token")
        console.log(user)
        return user as AuthTokenPayload
    })
}

export interface Context {
    userId?: string;
    role?: string;
}

export const context = ({req}:{req: Request}): Context =>{
    const token = req && req.headers.authorization ? decodeAuthHeader(req.headers.authorization): null

    return {
        userId: token?.userId,
        role: token?.role
    }
}