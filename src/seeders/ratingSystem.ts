import { Organization, User } from '../models/user';
import { systemRating } from '../models/ratingSystem';

const seedsystemRatings = async () => {
  const ratingSystem = [
    {
      userId: '1',
      name: 'NESA',
      grade: ['A', 'B', 'C'],
      description: [
        'Exceed Expectation',
        'Met expectation',
        'Below Expectation'
      ],
      percentage: ['75-100', '50-75', '35-50'],
      organization: (await Organization.find())[0]?.id
    },
    {
      userId: '2',
      name: 'UR',
      grade: ['1', '2', '3'],
      description: [
        'Exceed Expectation',
        'Met expectation',
        'Below Expectation'
      ],
      percentage: ['75-100', '50-75', '35-50'],
      organization: (await Organization.find())[1]?.id
    },
  ];
  await systemRating.deleteMany({});

  await systemRating.insertMany(ratingSystem);
  return null;
};
export default seedsystemRatings;