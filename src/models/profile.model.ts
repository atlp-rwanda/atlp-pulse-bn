import mongoose, { model, Schema } from 'mongoose'

const profileSchema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        biography: {
            type: String,
        },
        avatar: {
            type: String,
        },
        cover: {
            type: String,
        },
        gender: {
            type: String,
        },
        dateOfBirth: {
            type: Date,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        githubUsername: {
            type: String,
        },
        resume: {
            type: String,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

profileSchema.virtual('name').get(function () {
    return this.firstName + ' ' + this.lastName
})

const Profile = mongoose.model('Profile', profileSchema)
export { Profile }
