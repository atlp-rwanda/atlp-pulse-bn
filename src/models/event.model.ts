import mongoose, { Schema } from 'mongoose';
const Event = mongoose.model(
  'Event',
  new Schema({
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    hostName: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    timeToStart: {
      type: String,
      default: 'no remark',
    },
    timeToEnd: {
      type: String,
      required: true,
    },
    guests: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    invitationStatus: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    invitationReason: {
      type: String,
      default: '',
    },
    acceptedUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
);
export { Event };
