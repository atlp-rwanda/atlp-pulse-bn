import mongoose, { Schema } from 'mongoose'

const Cohort = mongoose.model(
    'Cohort',
    new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
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
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
    }),
)

export default Cohort
