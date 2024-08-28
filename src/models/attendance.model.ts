import mongoose, { Schema } from 'mongoose'

const AttendanceSchema = new Schema({
  week: {
    type: String,
    required: true,
  },
  coordinatorId: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
  },
  trainees: [
    {
      traineeId: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
      },
      traineeEmail: {
        type: String,
        requried: false,
      },
      status: [
        {
          days: String,
          value: Number,
        },
      ],
    },
  ],
})

const Attendance = mongoose.model('Attendance', AttendanceSchema)
export { Attendance }
