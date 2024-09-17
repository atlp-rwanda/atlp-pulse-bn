import Cohort from '../models/cohort.model'
import { Organization } from '../models/organization.model'
import Program from '../models/program.model'

export default async function isAssgined(organName: string) {
  const programs: any = await Program.find().populate({
    path: 'organization',
    model: Organization,
    strictPopulate: false,
  })
  const cohorts: any = await Cohort.find().populate({
    path: 'program',
    model: Program,
    strictPopulate: false,
    populate: {
      path: 'organization',
      model: Organization,
      strictPopulate: false,
    },
  })
  let isAssignedToProgramOrCohort = false

  // Check if the user is assigned to any program associated with the organization
  for (const element of programs) {
    if (element.organization?.name === organName) {
      isAssignedToProgramOrCohort = true
      break
    }
  }

  // Check if the user is assigned to any cohort associated with the organization
  if (!isAssignedToProgramOrCohort) {
    for (const cohort of cohorts) {
      if (cohort.program.organization?.name === organName) {
        isAssignedToProgramOrCohort = true
        break
      }
    }
  }
  return isAssignedToProgramOrCohort
}
