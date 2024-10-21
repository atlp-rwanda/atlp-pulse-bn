import mongoose, { Schema } from 'mongoose'

const AttendanceSchema = new Schema({
  week: {
    type: Number,
    required: true,
  },
  phase: {
    type: mongoose.Types.ObjectId,
    ref: 'Phase',
    required: true,
  },
  cohort: {
    type: mongoose.Types.ObjectId,
    ref: 'Cohort',
    required: true,
  },

  teams: [
    {
      date: {
        type: Date,
        required: false,
        default: () => new Date(),
      },
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
      },
      trainees: [
        {
          trainee: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
          },
          status: [
            {
              day: {
                type: String,
                enum: ['mon', 'tue', 'wed', 'thu', 'fri'],
                required: true
              },
              date: {
                type: Date,
                required: true
              },
              score: {
                type: String,
                enum: [0, 1, 2],
                required: true
              },
            },
          ],
        },
      ],
    }
  ],
}, { timestamps: true })

AttendanceSchema.index(
  {
    phase: 1,
    cohort: 1,
    createdAt: 1
  },
  { unique: true }
);

const Attendance = mongoose.model('Attendance', AttendanceSchema)
export { Attendance }
