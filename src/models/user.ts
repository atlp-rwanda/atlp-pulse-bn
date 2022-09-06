import bcrypt from 'bcryptjs'
import mongoose, { model, Schema } from 'mongoose'

mongoose.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    },
})

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
})

userSchema.methods.checkPass = async function (password: string) {
    const pass = await bcrypt.compare(password, this.password)
    return pass
}

const profileSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
})

profileSchema.virtual('name').get(function () {
    return this.firstName + ' ' + this.lastName
})



const User = model('User', userSchema)
const Profile = mongoose.model('Profile', profileSchema)

export { User, Profile }
