import bcrypt from 'bcryptjs'
import mongoose, { model, Schema } from 'mongoose'
import { Profile } from './profile.model'
import { Invitation } from './invitation.model'

mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    team: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'Team',
    },
    status: {
      status: {
        type: String,
        enum: ['active', 'drop'],
        default: 'active',
      },
      reason: String,
      date: {
        type: Date,
      },
    },
    cohort: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'Cohort',
    },
    program: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'Program',
    },
    organizations: {
      type: [String],
      required: true,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    invitationId: {
      type: mongoose.Types.ObjectId,
      ref: Invitation, // Replace 'Invitation' with the actual model name if different
      required: false,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

userSchema.virtual('profile', {
  ref: 'Profile',
  foreignField: 'user',
  localField: '_id',
  justOne: true,
})

userSchema.virtual('ratings', {
  localField: '_id',
  foreignField: 'user',
  ref: 'Rating',
})

userSchema.methods.checkPass = async function (password: string) {
  const pass = await bcrypt.compare(password, this.password)
  return pass
}

userSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    const prof = await Profile.findOne({ user: this._id })
    if (prof) await prof.remove()
    return next()
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const hash = await bcrypt.hash(this.password || '', 10)
  this.password = hash
  return next()
})

const UserRole = mongoose.model(
  'UserRole',
  new Schema({
    name: {
      type: String,
      ref: 'User',
      required: true,
      unique: true,
    },
  })
)

const User = model('User', userSchema)

export { User, UserRole }
