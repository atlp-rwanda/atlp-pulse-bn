import mongoose, { model, Schema } from 'mongoose'

const ActivitySchema = new mongoose.Schema({
  country_code: { type: String },
  country_name: { type: String },
  IPv4: { type: String },
  city: { type: String },
  state: { type: String },
  postal: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  failed: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
})

const profileSchema = new Schema(
  {
    biography: {
      type: String,
    },
    avatar: {
      type: String,
    },
    cover: {
      type: String,
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

const Profile = mongoose.model('Profile', profileSchema)
export { Profile }
