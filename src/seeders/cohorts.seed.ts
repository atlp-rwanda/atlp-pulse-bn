import Cohort from '../models/cohort.model'
import Phase from '../models/phase.model'
import Program from '../models/program.model'
import { User } from '../models/user'
import { Organization } from '../models/organization.model'

const seedCohorts = async () => {
  // Organization
  const andelaOrg = await Organization.find({ name: 'Andela' })
  const iremboOrg = await Organization.find({ name: 'Irembo' })

  // Programs
  const andelaPrograms = await Program.find({
    $or: [{ name: { $eq: 'Atlp 1' } }, { name: { $eq: 'Atlp 2' } }],
  })
  const iremboProgams = await Program.find({
    $or: [
      { name: { $eq: 'Brainly Developers Program' } },
      { name: { $eq: 'Rwema' } },
    ],
  })

  // Phases
  const phases = await Phase.find()

  // Coordinators
  const andelCoord = await User.find({
    role: 'coordinator',
    organizations: { $in: ['Andela'] },
  })
  const iremboCoord = await User.find({
    role: 'coordinator',
    organizations: { $in: ['Irembo'] },
  })

  const cohorts = [
    // Andela
    {
      name: 'cohort 1',
      phase: phases[0]._id.toHexString(),
      coordinator: andelCoord[0]._id.toHexString(),
      program: andelaPrograms[0]._id.toHexString(),
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 2',
      phase: phases[1]._id.toHexString(),
      coordinator: andelCoord[0]._id.toHexString(),
      program: andelaPrograms[0]._id.toHexString(),
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg[0]._id.toHexString(),
    },

    // Irembo
    {
      name: 'cohort 1',
      phase: phases[1]._id.toHexString(),
      coordinator: iremboCoord[0]._id.toHexString(),
      program: iremboProgams[0]._id.toHexString(),
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: iremboOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 2',
      phase: phases[2]._id.toHexString(),
      coordinator: iremboCoord[0]._id.toHexString(),
      program: iremboProgams[1]._id.toHexString(),
      startDate: new Date(),
      endDate: new Date(),
      organization: iremboOrg[0]._id.toHexString(),
    },
  ]

  await Cohort.deleteMany({})

  await Cohort.insertMany(cohorts)
  return null
}

export default seedCohorts