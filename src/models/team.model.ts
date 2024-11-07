import mongoose, { Schema } from 'mongoose'
import User from './user'

export interface TeamInterface {
  id?: string;
  name: string;
  cohort?: mongoose.Types.ObjectId;
  phase?: mongoose.Types.ObjectId;
  ttl?: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  startingPhase: Date;
  active: boolean;
  organization: mongoose.Types.ObjectId;
  isDeleted?: Boolean;
}

const teamSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    cohort: {
      type: Schema.Types.ObjectId,
      ref: 'Cohort',
    },
    ttl: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    startingPhase: {
      type: Date,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    phase: {
      type: Schema.Types.ObjectId,
      ref: 'Phase',
    },
    program: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
    },
    isJobActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    statics: {
      async disactivate(teamId: any) {
        const team = await this.findByIdAndUpdate(teamId, {
          active: false,
        })
        await User.updateMany({ team: team?.id }, { team: null })

        return team
      },
    },
  }
)

function findActive(this: any, next: any) {
  this.where({ active: true })
  next()
}
teamSchema.pre('find', findActive)
teamSchema.pre('findOne', findActive)
teamSchema.pre('findOneAndDelete', findActive)
teamSchema.pre('findOneAndReplace', findActive)
teamSchema.pre('findOneAndRemove', findActive)
teamSchema.pre('findOneAndUpdate', findActive)

const Team = mongoose.model('Team', teamSchema)
export default Team
