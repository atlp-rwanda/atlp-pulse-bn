import Program from '../models/program.model'
import { User } from '../models/user'
import { Organization } from '../models/organization.model'

const seedPrograms = async () => {
  const andelaManagers = await User.find({
    role: 'manager',
    organizations: { $in: ['Andela'] },
  })

  const IremboManagers = await User.find({
    role: 'manager',
    organizations: { $in: ['Irembo'] },
  })

  const andelaOrg = await Organization.find({ name: 'Andela' })
  const iremboOrg = await Organization.find({ name: 'Irembo' })
  const programs = [
    // Andela
    {
      name: 'Atlp 1',
      description: 'none',
      manager: andelaManagers[0]._id.toHexString(),
      organization: andelaOrg[0]._id.toHexString(),
    },
    {
      name: 'Atlp 2',
      description: 'none',
      manager: andelaManagers[0]._id.toHexString(),
      organization: andelaOrg[0]._id.toHexString(),
    },

    // Irembo
    {
      name: 'Brainly Developers Program',
      description: 'This belong to cohort 7',
      manager: IremboManagers[0]._id.toHexString(),
      organization: iremboOrg[0]._id.toHexString(),
    },

    {
      name: 'Rwema',
      description: 'none',
      manager: IremboManagers[0]._id.toHexString(),
      organization: iremboOrg[0]._id.toHexString(),
    },
  ]

  await Program.deleteMany({})

  await Program.insertMany(programs)
  return null
}

export default seedPrograms
