import Cohort from '../models/cohort.model'
import Program from '../models/program.model'
import { User } from '../models/user'

const seedCohorts = async () => {
    const coordinatorId = (await User.findOne({ role: 'coordinator' }))?.id

    const cohorts = [
        {
            name: 'cohort 1',
            phase: '1',
            coordinator: coordinatorId,
            program: (await Program.find())[0].id,
            startDate: new Date(),
            endDate: new Date(),
        },
        {
            name: 'cohort 2',
            phase: '2',
            coordinator: coordinatorId,
            program: (await Program.find())[1].id,
            startDate: new Date(),
            endDate: new Date(),
        },
    ]

    await Cohort.deleteMany({})

    await Cohort.insertMany(cohorts)
    return null
}

export default seedCohorts

