import mongoose, { model, Schema } from 'mongoose'

const ActivitySchema = new mongoose.Schema({
  country_code: { type: String, default: null },
  country_name: { type: String, default: null },
  IPv4: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  postal: { type: String, default: null },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  failed: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
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
    activity: [ActivitySchema],
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

const Profile = mongoose.model('Profile', profileSchema)
export { Profile }
