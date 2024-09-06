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
    quantityRemark: {
      type: String,
      default: 'no remark',
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
    qualityRemark: {
      type: String,
      default: 'no remark',
    },
    professional_Skills: {
      type: String,
      required: true,
    },
    professionalRemark: {
      type: String,
      default: 'no remark',
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

const Rating = mongoose.model('Rating', RatingSchema)

const TempData = mongoose.model(
  'TempData',
  new Schema({
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
    quantityRemark: {
      type: [String],
      default: ['no remark'],
    },
    quality: {
      type: [String],
      default: [],
    },
    qualityRemark: {
      type: [String],
      default: ['no remark'],
    },
    professional_Skills: {
      type: [String],
      default: [],
    },
    professionalRemark: {
      type: [String],
      default: ['no remark'],
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
  })
)

export { Rating, TempData }
