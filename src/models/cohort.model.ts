import mongoose, { Schema } from 'mongoose';
import { User } from './user';

const cohortSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    phase: {
      type: String,
      required: true,
    },
    coordinator: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    program: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Program',
    },
    members: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
  },
  {
    statics: {
      async disactivate(cohortId: any) {
        const cohort = await this.findByIdAndUpdate(cohortId, {
          active: false,
        });
        await User.updateMany({ cohort: cohort?.id }, { cohort: null });

        return cohort;
      },
    },
  }
);

function findActive(this: any, next: any) {
  this.where({ active: true });
  next();
}
cohortSchema.pre('find', findActive);
cohortSchema.pre('findOne', findActive);
cohortSchema.pre('findOneAndDelete', findActive);
cohortSchema.pre('findOneAndReplace', findActive);
cohortSchema.pre('findOneAndRemove', findActive);
cohortSchema.pre('findOneAndUpdate', findActive);

const Cohort = mongoose.model('Cohort', cohortSchema);
export default Cohort;
