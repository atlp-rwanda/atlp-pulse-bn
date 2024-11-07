import Cohort from '../models/cohort.model'
import Phase from '../models/phase.model'
import Program from '../models/program.model'
import User,{ RoleOfUser } from '../models/user'
import { Organization } from '../models/organization.model'

const seedCohorts = async () => {
  // Organization
  const andelaOrg = await Organization.findOne({ name: 'Andela' })
  const iremboOrg = await Organization.findOne({ name: 'Irembo' })

  // Programs
  const andelaPrograms = await Program.find({
    organization: andelaOrg?._id,
  })
  const iremboProgams = await Program.find({
    organization: iremboOrg?._id,
  })

  // Phases
  const andelaPhases = await Phase.find({
    organization: andelaOrg?._id,
  })

  const iremboPhases = await Phase.find({
    organization: andelaOrg?._id,
  })

  // Coordinators
  const andelaCoord = await User.find({
    organizations: {
      $elemMatch: {
        orgId: andelaOrg?._id,
        role: RoleOfUser.COORDINATOR,
      }
    },
  })
  const iremboCoord = await User.find({
    organizations: { 
      $elemMatch: {
        orgId: iremboOrg?._id,
        role: RoleOfUser.COORDINATOR,
      }
    },
  })

  const cohorts = [
    // Andela
    {
      name: 'cohort 1',
      phase: andelaPhases[0]._id.toHexString(),
      coordinator: andelaCoord[0]._id.toHexString(),
      program: andelaPrograms[0]._id.toHexString(),
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg?._id.toHexString(),
    },
    {
      name: 'cohort 2',
      phase: andelaPhases[1]._id.toHexString(),
      coordinator: andelaCoord[0]._id.toHexString(),
      program: andelaPrograms[0]._id.toHexString(),
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg?._id.toHexString(),
    },
    {
      name: 'Ndevu 12',
      phase: andelaPhases[0]._id.toHexString(),
      coordinator: andelaCoord[0]._id.toHexString(),
      program: andelaPrograms[0]._id.toHexString(),
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg?._id.toHexString(),
    },
    {
      name: 'Ndevu Project',
      phase: andelaPhases[1]._id.toHexString(),
      coordinator: andelaCoord[0]._id.toHexString(),
      program: andelaPrograms[0]._id.toHexString(),
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg?._id.toHexString(),
    },


    // Irembo
    {
      name: 'cohort 1',
      phase: iremboPhases[0]._id.toHexString(),
      coordinator: iremboCoord[0]._id.toHexString(),
      program: iremboProgams[0]._id.toHexString(),
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: iremboOrg?._id.toHexString(),
    },
    {
      name: 'cohort 2',
      phase: iremboPhases[1]._id.toHexString(),
      coordinator: iremboCoord[0]._id.toHexString(),
      program: iremboProgams[1]._id.toHexString(),
      startDate: new Date(),
      endDate: new Date(),
      organization: iremboOrg?._id.toHexString(),
    },
  ]

  await Cohort.deleteMany({})

  await Cohort.insertMany(cohorts)
  return null
}

export default seedCohorts
