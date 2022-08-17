import mongoose, { model, Schema } from 'mongoose'
import bcrypt from "bcryptjs"

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
    profile: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
    },
})

userSchema.methods.checkPass = async function (password:string) {
    console.log(password)
    const pass = await bcrypt.compare(password, this.password)
    return pass
}


 const User = model("User", userSchema)

const Profile = mongoose.model(
    'Profile',
    new Schema({
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
)

export { User, Profile }
