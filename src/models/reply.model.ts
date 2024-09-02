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
    quantityRemark: {
      type: String,
      required: false,
    },
    qualityRemark: {
      type: String,
      required: false,
    },
    professionalRemark: {
      type: String,
      required: false,
    },
    bodyQuantity: {
      type: String,
      required: false,
    },
    bodyQuality: {
      type: String,
      required: false,
    },

    bodyProfessional: {
      type: String,
      required: false,
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
