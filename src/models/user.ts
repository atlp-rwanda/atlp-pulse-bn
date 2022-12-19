import bcrypt from 'bcryptjs';
import mongoose, { model, Schema } from 'mongoose';
import { systemRating } from './ratingSystem';
mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const userSchema = new Schema({
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
  cohort: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'Cohort',
  },
  organizations: {
    type: [String],
    required: true,
  },
});

userSchema.methods.checkPass = async function (password: string) {
  const pass = await bcrypt.compare(password, this.password);
  return pass;
};

userSchema.pre('remove', async function (next) {
  const prof = await Profile.findOne({ user: this._id });
  if (prof) await prof.remove();
  return next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return next();
});

const profileSchema = new Schema({
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
});

profileSchema.virtual('name').get(function () {
  return this.firstName + ' ' + this.lastName;
});

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
);

const organizationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  admin: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    required: true,
  },
});

const User = model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);
const Organization = model('Organization', organizationSchema);

export { User, Profile, UserRole, Organization };
