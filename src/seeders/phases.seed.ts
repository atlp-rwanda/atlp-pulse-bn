import Phase from '../models/phase.model'
import { Organization } from '../models/organization.model'

const seedPhases = async () => {
  const organizations  = await Organization.find()
  const phases = [
    {
      name: 'Phase I',
      description: 'Core concept',
      organization: organizations[0]?.id,
    },
    {
      name: 'Phase II',
      description: 'Team project',
      organization: organizations[0]?.id,
    },
    {
      name: 'Phase I',
      description: 'Core Concept phase',
      organization: organizations[1]?.id,
    },
    {
      name: 'Phase II',
      description: 'Team project phase',
      organization: organizations[1]?.id,
    },
  ]

  await Phase.deleteMany({})

  await Phase.insertMany(phases)
  return null
}

export default seedPhases
