import mongoose, { Schema } from 'mongoose';

export interface PhaseInterface {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  organization: mongoose.Types.ObjectId;
}

const phaseSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organization: {
    type: mongoose.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
});

const Phase = mongoose.model('Phase', phaseSchema);
export default Phase;
