import bcrypt from 'bcryptjs'
import mongoose, { model, Schema } from 'mongoose'

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
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      
    },
    oneTimeCode: {
      type: String,
      code: String,
      required: false
    },
    oneTimeCodeExpiresAt: {
      type: Date,
      required: false
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

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    biography: {
      type: String,
    },
    avatar: {
      type: String,
    },
    cover: {
      type: String,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    githubUsername: {
      type: String,
    },
    resume: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

profileSchema.virtual('name').get(function () {
  return this.firstName + ' ' + this.lastName
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

const organizationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  gitHubOrganisation: {
    type: String,
  },
  activeRepos: {
    type: [String],
  },
  admin: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'rejected'],
    default: 'active',
  },
})

const AttendanceSchema = new Schema({
  week: {
    type: String,
    required: true,
  },
  coordinatorId: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
  },
  trainees: [
    {
      traineeId: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
      },
      traineeEmail: {
        type: String,
        requried: false,
      },
      status: [
        {
          days: String,
          value: Number,
        },
      ],
    },
  ],
})

const User = model('User', userSchema)
const Profile = mongoose.model('Profile', profileSchema)
const Organization = model('Organization', organizationSchema)
const Attendance = mongoose.model('Attendance', AttendanceSchema)

export { User, Profile, UserRole, Organization, Attendance }
