import { ApolloError } from 'apollo-server-errors'
import * as jwt from 'jsonwebtoken'
import { Profile, User, UserRole } from '../models/user'

const SECRET: string = process.env.SECRET || 'test_secret'

const resolvers: any = {
    Mutation: {
        async createUser(_: any, { email, password, role }: any) {
            const userExists = await User.findOne({ email: email })
            if (userExists)
                throw new ApolloError('email already taken', 'UserInputError')

            const emailExpression =
        /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const isValidEmail = emailExpression.test(String(email).toLowerCase())
            if (!isValidEmail)
                throw new ApolloError('invalid email format', 'ValidationError')
            if (password.length < 6)
                throw new ApolloError(
                    'password should be minimum 6 characters',
                    'ValidationError'
                )

            const user = await User.create({
                role: role || 'user',
                email: email,
                password,
            })
            const token = jwt.sign({ userId: user._id, role: user?.role }, SECRET, {
                expiresIn: '2h',
            })

            const newProfile = await Profile.create({
                user,
            })

            const newUser: string | null = await User.findByIdAndUpdate(
                user.id,
                {
                    profile: newProfile,
                },
                { new: true }
            )

            return { token, user: newUser }
        },
        async loginUser(_: any, { loginInput: { email, password } }: any) {
            const user: any = await User.findOne({ email: email })
            if (await user?.checkPass(password)) {
                const token = jwt.sign(
                    { userId: user._id, role: user._doc?.role || 'user' },
                    SECRET,
                    { expiresIn: '2h' }
                )
                const data = {
                    token: token,
                    user: user.toJSON(),
                }
                return data
            } else {
                throw new ApolloError('Invalid credential', 'UserInputError')
            }
        },
        async updateUserRole(_: any, { id, name }: any) {
            // Checking user privilege

            const roleExists = await UserRole.findOne({ name: name })
            if (!roleExists) throw new Error('This role doesn\'t exist')
            const updatedUser = await User.findOneAndUpdate(
                {
                    _id: id,
                },
                {
                    $set: {
                        role: name,
                    },
                },
                { new: true }
            )
            return updatedUser
        },
        async createUserRole(_: any, { name }: any) {
            const newRole = await UserRole.create({ name })
            return newRole
        },
    },
    User: {
        async profile(parent: any) {
            const profile = await Profile.findOne({
                where: { user: parent.id.toString() },
            })
            if (!profile) return null
            return profile.toJSON()
        },
    },
    Profile: {
        async user(parent: any) {
            const user = await User.findOne({
                where: { _id: parent.user.id.toString() },
            })
            if (!user) return null
            return user?.toJSON()
        },
    },
}
export default resolvers
