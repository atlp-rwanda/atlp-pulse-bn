import jwt from 'jsonwebtoken'
import { emailExpression } from '../helpers/user.helpers'
import { sendEmail } from './sendEmail'
export function generateOtp(length = 6): string {
  let otp = ''
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10)
  }
  return otp
}
const SECRET = (process.env.SECRET as string) || 'mysq_unique_secret'

export function encodeOtpToToken(otp: string, email: string): string {
  const payload = { otp, email }
  const token = jwt.sign(payload, SECRET, { expiresIn: '360m' })
  return token
}

export function verifyOtpToken(token: string, inputOtp: string): boolean {
  try {
    // Decode the token
    const decoded = jwt.verify(token, SECRET) as { otp: string }

    // Check if the OTP matches
    return decoded.otp === inputOtp
  } catch (error) {
    console.error('Token verification failed:', error)
    return false
  }
}
