import mongoose, { model, Schema } from 'mongoose'

const organizationSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    gitHubOrganisation: {
        type: String,
    },
    activeRepos: {
        type: [String],
    },
    admin: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'rejected'],
        default: 'active',
    },
})

const Organization = model('Organization', organizationSchema)
export { Organization }
