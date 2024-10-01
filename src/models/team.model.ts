import mongoose, { Schema } from 'mongoose'
import { User } from './user'

const teamSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    cohort: {
      type: mongoose.Types.ObjectId,
      ref: 'Cohort',
    },
    ttl: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    members: {
      type: [mongoose.Types.ObjectId],
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
      type: mongoose.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    manager: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    phase: {
      type: mongoose.Types.ObjectId,
      ref: 'Phase',
    },
    program: {
      type: mongoose.Types.ObjectId,
      ref: 'Program',
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
