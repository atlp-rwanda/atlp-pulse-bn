import mongoose, { Schema } from 'mongoose'

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
    },
)

programSchema.virtual('cohorts', {
    ref: 'Cohort',
    localField: '_id',
    foreignField: 'program',
})

const Program = mongoose.model('Program', programSchema)

export default Program

