import mongoose, { Schema } from 'mongoose'
import { User } from './user'

const cohortSchema = new Schema({
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
})

cohortSchema.pre('remove', async function (next) {
    await User.updateMany({ cohort: this.id }, { cohort: null })
    return next()
})

const Cohort = mongoose.model('Cohort', cohortSchema)
export default Cohort
