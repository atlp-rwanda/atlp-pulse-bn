import mongoose, { Schema } from 'mongoose'
import Cohort from './cohort.model'

const programSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    manager: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    organization: {
      type: mongoose.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    statics: {
      async disactivate(programId: any) {
        const program = await this.findByIdAndUpdate(programId, {
          active: false,
        })
        const cohorts = await Cohort.find({ program: program?.id })
        cohorts.forEach((cohort) => {
          Cohort.disactivate(cohort.id)
        })

        return program
      },
    },
  }
)

function findActive(this: any, next: any) {
  this.where({ active: true })
  next()
}

programSchema.virtual('cohorts', {
  ref: 'Cohort',
  localField: '_id',
  foreignField: 'program',
})
programSchema.pre('find', findActive)
programSchema.pre('findOne', findActive)
programSchema.pre('findOneAndDelete', findActive)
programSchema.pre('findOneAndReplace', findActive)
programSchema.pre('findOneAndRemove', findActive)
programSchema.pre('findOneAndUpdate', findActive)

const Program = mongoose.model('Program', programSchema)

export default Program
