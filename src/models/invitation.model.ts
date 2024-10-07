import mongoose, { Schema } from 'mongoose'
import { RoleOfUser } from './user'

const STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DENIED: 'denied',
  CANCELLED: 'cancelled',
}

const ROLE = {
  TRAINEE: RoleOfUser.TRAINEE,
  ADMIN: RoleOfUser.ADMIN,
  TTL: RoleOfUser.TTL,
  COORDINATOR: RoleOfUser.COORDINATOR,
}
const InvitationSchema = new Schema({
  inviterId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: STATUS,
    default: STATUS.PENDING,
  },
  invitees: [
    {
      email: {
        type: String,
        requried: false,
      },
      role: {
        type: String,
        enum: ROLE,
        default: ROLE.TRAINEE,
      },
    },
  ],
  orgName: {
    type: String,
    required: true,
  },
  orgToken: {
    type: String,
    required: true,
  },
  invitationToken:{
    type: String,
    maxlength: 2048,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
})

const Invitation = mongoose.model('Invitation', InvitationSchema)
export { Invitation }
