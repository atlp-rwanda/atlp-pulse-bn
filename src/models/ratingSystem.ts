/* eslint-disable */
import mongoose, { Schema } from 'mongoose';
const systemRating = mongoose.model(
  'systemRating',
  new Schema({
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    grade: {
      type: [String],
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    percentage: {
      type: [String],
      required: false,
    },
     defaultGrading: {
      type: Boolean,
      default: false,
    },
    organization: {
      type: mongoose.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
   
  })
);


export { systemRating };