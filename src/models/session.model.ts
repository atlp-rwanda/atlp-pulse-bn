import mongoose, { Schema } from 'mongoose'

const sessionSchema = new Schema({
  Sessionname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
})

const Session = mongoose.model('Session', sessionSchema)

export default Session
