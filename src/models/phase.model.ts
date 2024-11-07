import mongoose, { Schema } from 'mongoose';

export interface PhaseInterface {
  name: string;
  description: string;
  organization: mongoose.Types.ObjectId;
  isDeleted?: Boolean;
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
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  }
});

const Phase = mongoose.model('Phase', phaseSchema);
export default Phase;
