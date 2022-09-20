/* eslint-disable */
import { hashSync } from 'bcryptjs'
import { User } from '../models/user'

const seedUsers = async () => {
    const users = [
        {
            email: 'admin@gmail.com',
            password: hashSync('Andela123'),
            role: 'admin',
        },
        {
            email: 'coordinator@gmail.com',
            password: hashSync('Andela123'),
            role: 'coordinator',
        },
        {
            email: 'trainee@gmail.com',
            password: hashSync('Andela123'),
            role: 'trainee',
        },
    ]
    await User.deleteMany({})

    await User.insertMany(users)
    return null
}
export default seedUsers

