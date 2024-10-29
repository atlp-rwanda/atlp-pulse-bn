import mongoose, { Schema } from 'mongoose'

mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})
const ReplySchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sprint: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
ReplySchema.virtual('Rating', {
  ref: 'Rating',
  localField: 'user',
  foreignField: 'reply',
})

export const Notifications = mongoose.model('Replies', ReplySchema);
