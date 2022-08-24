import mongoose, { Schema } from 'mongoose';

const Cohort = mongoose.model(
  'Cohort',
  new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    coordinator: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phase: {
      type: String,
      required: true,
    },
    members: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
    },
  })
);
export default Cohort;
