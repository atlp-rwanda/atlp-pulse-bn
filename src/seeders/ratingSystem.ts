import { Organization } from '../models/user'
import { systemRating } from '../models/ratingSystem'

const seedsystemRatings = async () => {
  const ratingSystem = [
    {
      userId: '1',
      name: 'NESA',
      grade: ['A', 'B', 'C'],
      description: [
        'Exceed Expectation',
        'Met expectation',
        'Below Expectation',
      ],
      percentage: ['75-100', '50-75', '35-50'],
      organization: (await Organization.find())[0]?.id,
    },
    {
      userId: '2',
      name: 'UR',
      grade: ['1', '2', '3'],
      description: [
        'Exceed Expectation',
        'Met expectation',
        'Below Expectation',
      ],
      percentage: ['75-100', '50-75', '35-50'],
      organization: (await Organization.find())[1]?.id,
    },
    {
      userId: '3',
      name: 'Andela',
      grade: ['0', '1', '2'],
      description: [
        'Below Expectation',
        'Met expectation',
        'Exceed Expectation',
      ],
      percentage: ['0-40', '40-70', '70-100'],
      organization: (await Organization.findOne({ name: 'Andela' }))?.id,
      defaultGrading: true,
    },
  ]
  await systemRating.deleteMany({})

  await systemRating.insertMany(ratingSystem)
  return null
}
export default seedsystemRatings
