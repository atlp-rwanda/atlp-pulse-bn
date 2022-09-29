import mongoose, { Schema } from 'mongoose'
import Cohort from './cohort.model'

const programSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            default: '',
        },
        manager: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        organization: {
            type: mongoose.Types.ObjectId,
            ref: 'Organization',
            required: true,
        },
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
)

programSchema.virtual('cohorts', {
    ref: 'Cohort',
    localField: '_id',
    foreignField: 'program',
})
programSchema.pre('remove', async function (next) {
    await Cohort.deleteMany({ program: this.id })
    next()
})

const Program = mongoose.model('Program', programSchema)

export default Program
