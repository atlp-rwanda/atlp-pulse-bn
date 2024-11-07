import mongoose, { Schema, Document } from 'mongoose'
import User from './user'

export interface CohortInterface extends Document {
  id?: string;
  name: string;
  phase: mongoose.Types.ObjectId;
  coordinator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  program: mongoose.Types.ObjectId;
  teams: number;
  active: boolean;
  startDate: Date;
  endDate?: Date; // Optional
  organization: mongoose.Types.ObjectId;
  isDeleted?: Boolean;
}

const cohortSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    phase: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Phase',
    },
    coordinator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    program: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Program',
    },
    teams: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    statics: {
      async disactivate(cohortId: any) {
        const cohort = await this.findByIdAndUpdate(cohortId, {
          active: false,
        })
        await User.updateMany({ cohort: cohort?.id }, { cohort: null })

        return cohort
      },
    },
  }
)

function findActive(this: any, next: any) {
  this.where({ active: true })
  next()
}
cohortSchema.pre('find', findActive)
cohortSchema.pre('findOne', findActive)
cohortSchema.pre('findOneAndDelete', findActive)
cohortSchema.pre('findOneAndReplace', findActive)
cohortSchema.pre('findOneAndRemove', findActive)
cohortSchema.pre('findOneAndUpdate', findActive)

const Cohort = mongoose.model('Cohort', cohortSchema)
export default Cohort