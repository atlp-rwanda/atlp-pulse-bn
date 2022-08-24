import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.secret


export const decodeAccessToken = async (token:any, secret:any) => {
  try {
    const decoded = await jwt.verify(token,secret )
  } catch (error) {
    console.log(error)
  }
}