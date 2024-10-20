import Cohort from '../models/cohort.model'
import { Organization } from '../models/organization.model'
import Program from '../models/program.model'
import { User } from '../models/user'

export default async function isAssigned(organName: string, userId: string) {
  // Fetch programs and populate organization
  const programs: any = await Program.find().populate({
    path: 'organization',
    model: Organization,
    strictPopulate: false,
  })

  const cohorts: any = await Cohort.find().populate({
    path: 'program',
    model: Program,
    strictPopulate: false,
    populate: [
      {
        path: 'organization',
        model: Organization,
        strictPopulate: false,
      },
      {
        path: 'users',
        model: User,
        strictPopulate: false,
      },
    ],
  })
  let isAssignedToProgramOrCohort = false

  // Check if the user is assigned to any program associated with the organization
  for (const element of programs) {
    if (element.organization?.name === organName) {
      isAssignedToProgramOrCohort = true
      return isAssignedToProgramOrCohort
    }
  }

  // Check if the user is assigned to any cohort associated with the organization
  for (const cohort of cohorts) {
    if (cohort.program.organization?.name === organName) {
      if (
        cohort.users.some(
          (user: { _id: { toString: () => string } }) =>
            user._id.toString() === userId
        )
      ) {
        isAssignedToProgramOrCohort = true
        return isAssignedToProgramOrCohort
      }
    }
  }
  return isAssignedToProgramOrCohort
}
