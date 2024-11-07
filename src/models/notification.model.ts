import mongoose, { Schema } from 'mongoose'

const Notification = mongoose.model(
  'Notification',
  new Schema(
    {
      receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      type: {
        type: String,
        enum: [
          'rating',
          'performance',
          'ticket',
          'trainee',
          'attendance',
          'team',
          'cohort',
          'session',
        ],
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
