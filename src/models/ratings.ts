import mongoose, { Schema } from 'mongoose'

const RatingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sprint: {
      type: Schema.Types.ObjectId,
      ref: 'Sprint',
      required: true,
    },
    phase: {
      type: Schema.Types.ObjectId,
      ref: 'Phase',
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    feedbacks: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    quality: {
      type: String,
      required: true,
    },
    professional_Skills: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    cohort: {
      type: Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },
  { timestamps: true } // already present
)

const Rating = mongoose.model('Rating', RatingSchema)

export default Rating
