import Program from '../models/program.model'
import User, { RoleOfUser } from '../models/user'
import { Organization } from '../models/organization.model'

const seedPrograms = async () => {
  const andelaOrg = await Organization.findOne({ name: 'Andela' })
  const iremboOrg = await Organization.findOne({ name: 'Irembo' })
  const andelaManagers = await User.find({
    organizations: {
      $elemMatch: {
        orgId: andelaOrg?._id,
        role: RoleOfUser.MANAGER,
      }
    },
  })

  const IremboManagers = await User.find({
    organizations: {
      $elemMatch: {
        orgId: iremboOrg?._id,
        role: RoleOfUser.MANAGER,
      }
    },
  })

  const programs = [
    // Andela
    {
      name: 'Atlp 1',
      description: 'none',
      manager: andelaManagers[0]._id.toHexString(),
      organization: andelaOrg?._id.toHexString(),
    },
    {
      name: 'Atlp 2',
      description: 'none',
      manager: andelaManagers[0]._id.toHexString(),
      organization: andelaOrg?._id.toHexString(),
    },

    // Irembo
    {
      name: 'Brainly Developers Program',
      description: 'This belong to cohort 7',
      manager: IremboManagers[0]._id.toHexString(),
      organization: iremboOrg?._id.toHexString(),
    },

    {
      name: 'Rwema',
      description: 'none',
      manager: IremboManagers[0]._id.toHexString(),
      organization: iremboOrg?._id.toHexString(),
    },
  ]

  await Program.deleteMany({})

  await Program.insertMany(programs)
  return null
}

export default seedPrograms
