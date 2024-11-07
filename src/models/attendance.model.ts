import mongoose, { Schema } from 'mongoose'

const AttendanceSchema = new Schema({
  week: {
    type: Number,
    required: true,
  },
  phase: {
    type: Schema.Types.ObjectId,
    ref: 'Phase',
    required: true,
  },
  cohort: {
    type: Schema.Types.ObjectId,
    ref: 'Cohort',
    required: true,
  },

  teams: [
    {
      date: {
        type: Date,
        required: false,
        default: () => {
          const date = new Date();
          if (date.getUTCHours() >= 22) {
            date.setUTCDate(date.getUTCDate() + 1);
            date.setUTCHours(0, 0, 0, 0);
          }
          return date
        },
      },
      team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
      },
      trainees: [
        {
          trainee: {
            type: Schema.Types.ObjectId,
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
