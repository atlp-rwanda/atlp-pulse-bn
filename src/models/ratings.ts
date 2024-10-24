import mongoose, { Schema } from 'mongoose'

const RatingSchema = new Schema(
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
    phase: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    feedbacks: [
      {
        sender: {
          type: mongoose.Types.ObjectId,
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
    coordinator: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cohort: {
      type: mongoose.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    average: {
      type: String,
      required: false,
    },
    organization: {
      type: mongoose.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },
  { timestamps: true } // already present
)

const Rating = mongoose.model('Rating', RatingSchema)

const TempData = mongoose.model(
  'TempData',
  new Schema(
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
      quantity: {
        type: [String],
        default: [],
      },
      quality: {
        type: [String],
        default: [],
      },
      professional_Skills: {
        type: [String],
        default: [],
      },
      feedbacks: [
        {
          sender: {
            type: mongoose.Types.ObjectId,
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
      oldFeedback: {
        type: [String],
        default: [],
      },
      coordinator: {
        type: mongoose.Types.ObjectId,
        ref: 'Cohort',
        required: true,
      },
      cohort: {
        type: mongoose.Types.ObjectId,
        ref: 'Cohort',
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      average: {
        type: String,
        required: false,
      },
      organization: {
        type: mongoose.Types.ObjectId,
        ref: 'Organization',
        required: true,
      },
    },
    { timestamps: true }
  )
)

export { Rating, TempData }
