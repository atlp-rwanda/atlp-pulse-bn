import mongoose, { Schema } from 'mongoose'

const STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DENIED: 'denied',
}

const ROLE = {
  TRAINEE: 'trainee',
  ADMIN: 'admin',
  TTL: 'ttl',
  COORDINATOR: 'coordinator',
}
const InvitationSchema = new Schema({
  inviterId: {
    type: [mongoose.Types.ObjectId],
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
      inviteeId: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
      },
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
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
})

const Invitation = mongoose.model('Invitation', InvitationSchema)
export { Invitation }
