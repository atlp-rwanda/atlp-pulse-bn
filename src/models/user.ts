import bcrypt from 'bcryptjs'
import mongoose, { model, Types, Schema, Model } from 'mongoose'
import { Profile } from './profile.model'
import Rating from './ratings';

export enum USER_STATUS_ENUM{
  ACTIVE="active",
  DROP="drop",
  SUSPENDED="suspended"
}

export interface UserStatus {
  status: USER_STATUS_ENUM,
  reason?: string,
  date?: Date,
}
export interface IOrgUserData{
  _id: Types.ObjectId,
  id?: string;
  orgId: Types.ObjectId;
  role: string;
  team?: Types.ObjectId;
  status?: UserStatus;
  cohort?: Types.ObjectId;
  program?: Types.ObjectId;
  phase?: Types.ObjectId;
  profile?: Types.ObjectId;
  pushNotifications: boolean;
  emailNotifications: boolean;
  isDeleted: boolean;
}

export interface IUser{
  id?: string;
  email: string;
  password: string;
  organizations: Types.DocumentArray<IOrgUserData>;
  firstName?: string;
  lastName?: string;
  gender?: string;
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  isDeleted: boolean
}

export interface IUserMethods {
  checkPass(password: string): Promise<boolean>
}

type UserModel = Model<IUser,{},IUserMethods>

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

const orgUserDataSchema = new Schema<IOrgUserData>({
  orgId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Organization',
  },
  role: {
    type: String,
    default: 'user',
  },
  team: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Team',
  },
  status: {
    status: {
      type: String,
      enum: Object.values(USER_STATUS_ENUM),
      default: USER_STATUS_ENUM.ACTIVE,
    },
    reason: String,
    date: {
      type: Date,
    },
  },
  cohort: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Cohort',
  },
  program: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Program',
  },
  phase: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Phase',
  },
  profile: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Profile',
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
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
    isDeleted: {
      type: Boolean,
      default: false
    }
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('isDeleted')) return next()
  if(this.isDeleted){
    await Profile.updateMany({user: this._id},{
      $set: {isDeleted: true}
    })
    await Rating.updateMany({user: this._id},{
      $set: {isDeleted: true}
    })
  }
  next()
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const hash = await bcrypt.hash(this.password || '', 10)
  this.password = hash
  return next()
})

const User = model<IUser, UserModel>('User', userSchema)

export default User
