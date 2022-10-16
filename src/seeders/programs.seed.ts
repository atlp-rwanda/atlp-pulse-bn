import Program from '../models/program.model'
import { Organization, User } from '../models/user'

const seedPrograms = async () => {
    const managers = await User.find({ role: 'manager' })

    const programs = [
        {
            name: 'Atlp 1',
            description: 'none',
            manager: managers[0].id,
            organization: (await Organization.find())[0]?.id,
        },
        {
            name: 'Atlp 2',
            description: 'none',
            manager: managers[1].id,
            organization: (await Organization.find())[1]?.id,
        },
    ]

    await Program.deleteMany({})

    await Program.insertMany(programs)
    return null
}

export default seedPrograms
