import mongoose, { Schema } from 'mongoose'
import { User } from './user'
import { PhaseInterface } from './phase.model';

export interface CohortInterface {
  _id: mongoose.Types.ObjectId;
  name: string;
  phase: PhaseInterface;
  coordinator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  program: mongoose.Types.ObjectId;
  teams: number;
  active: boolean;
  startDate: Date;
  endDate?: Date; // Optional
  organization: mongoose.Types.ObjectId;
}

const cohortSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    phase: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Phase',
    },
    coordinator: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
    },
    program: {
      type: mongoose.Types.ObjectId,
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
      type: mongoose.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
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