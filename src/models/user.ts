import bcrypt from 'bcryptjs'
import mongoose, { model, Schema } from 'mongoose'
import { Profile } from './profile.model'

export interface UserStatus {
  status: 'active' | 'drop' | 'suspended'
  reason?: string
  date?: Date
}
export interface OrgUserDataInterface{
  _id: mongoose.Types.ObjectId;
  orgId: mongoose.Types.ObjectId;
  role: string;
  team?: mongoose.Types.ObjectId;
  status: UserStatus;
  cohort?: mongoose.Types.ObjectId;
  program?: mongoose.Types.ObjectId;
  phase?: mongoose.Types.ObjectId;
  pushNotifications: boolean;
  emailNotifications: boolean;
  ratings?: mongoose.Types.ObjectId[];
}

export interface UserInterface {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  organizations: mongoose.Types.ObjectId[];
  firstName: String;
  lastName: String;
  name: String;
  address: String;
  city: String;
  country: String;
  phoneNumber: String;
}

export enum RoleOfUser {
  TRAINEE = 'trainee',
  COORDINATOR = 'coordinator',
  MANAGER = 'manager',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
  TTL = 'ttl',
}
mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})

const orgUserDataSchema = new Schema({
  orgId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Organization',
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
      enum: ['active', 'drop', 'suspended'],
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
  phase: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'Phase',
  },
  pushNotifications: {
    type: Boolean,
    default: true,
  },
  emailNotifications: {
    type: Boolean,
    default: true,
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
    organizations: {
      type: [orgUserDataSchema],
      required: true,
    },
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
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

userSchema.virtual('name').get(function () {
  return this.firstName + ' ' + this.lastName
})

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
const OrgUserData = model('OrgUserData', orgUserDataSchema)

export { User, UserRole, OrgUserData }
