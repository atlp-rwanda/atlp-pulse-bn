import Phase from '../models/phase.model';
import { Organization, User } from '../models/user';

const seedPhases = async () => {

  const phases = [
    {
      name: 'Phase I',
      description: 'Core concept',
      organization: (await Organization.find())[0]?.id,
    },
    {
      name: 'Phase II',
      description: 'Team project',
      organization: (await Organization.find())[0]?.id,
    },
    {
      name: 'Phase I',
      description: 'Core Concept phase',
      organization: (await Organization.find())[1]?.id,
    },
    {
      name: 'Phase II',
      description: 'Team project phase',
      organization: (await Organization.find())[1]?.id,
    },
  ];

  await Phase.deleteMany({});

  await Phase.insertMany(phases);
  return null;
};

export default seedPhases;
