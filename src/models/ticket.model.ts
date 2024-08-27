import mongoose, { Schema } from 'mongoose'

const ticketSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'customer-reply', 'admin-reply', 'closed'],
      default: 'open',
    },
    replies: [
      {
        sender: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        receiver: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        replyMessage: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
)

ticketSchema.pre('find', function (next) {
  this.sort('-createdAt')
  next()
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket
