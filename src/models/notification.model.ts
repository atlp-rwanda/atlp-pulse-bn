import mongoose, { Schema } from 'mongoose'

const Notification = mongoose.model(
  'Notification',
  new Schema(
    {
      receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      type: {
        type: String,
        enum: ['rating', 'performance', 'ticket', 'trainee', 'attendance', 'team', 'cohort'],
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
)

export { Notification }
