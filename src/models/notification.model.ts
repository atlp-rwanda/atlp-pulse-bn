import mongoose, { Schema } from 'mongoose';

const Notification = mongoose.model(
  'Notification',
  new Schema({
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    createdAt: {
        type: String,
        required: true, 
    },
    read: {
        type: Boolean,
        required: true,  
    }
  })
);

export { Notification };