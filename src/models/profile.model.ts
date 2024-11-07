import mongoose, { model, Schema, Document } from 'mongoose'

interface IActivity extends mongoose.Types.Subdocument{
  id?: string,
  country_code?: string ,
  country_name?: string,
  IPv4?: string,
  city?: string,
  state?: string,
  postal?: string,
  latitude?: number,
  longitude?: number,
  failed?: number, 
  date?: Date,
}

export interface IProfile extends Document{
  id?: string,
  orgId: mongoose.Types.ObjectId,
  biography?: string,
  avatar?: string,
  cover?: string,
  activity: IActivity[],
  user: mongoose.Types.ObjectId,
  githubUsername?: string,
  resume?: string,
  isDeleted?: Boolean;
}

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
    orgId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
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
    activity: [ActivitySchema],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    githubUsername: {
      type: String,
    },
    resume: {
      type: String,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Profile = mongoose.model('Profile', profileSchema)
export { Profile }
