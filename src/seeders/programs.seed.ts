import Program from '../models/program.model';
import { Organization, User } from '../models/user';

const seedPrograms = async () => {
  const managers = await User.find({ role: 'manager' });

  const programs = [
    {
      name: 'Atlp 1',
      description: 'none',
      manager: managers[0].id,
      organization: (await Organization.find())[0]?.id,
    },
    {
      name: 'Atlp 2',
      description: 'none',
      manager: managers[1].id,
      organization: (await Organization.find())[1]?.id,
    },
    {
      name: 'Atlp 3',
      description: 'This belong to cohort 3',
      manager: managers[2].id,
      organization: (await Organization.find())[2]?.id,
    },

    {
      name: 'Brainly Developers Program',
      description: 'This belong to cohort 7',
      manager: managers[2].id,
      organization: (await Organization.find())[3]?.id,
    },

    {
      name: 'Rwema',
      description: 'none',
      manager: managers[2].id,
      organization: (await Organization.find())[2]?.id,
    },
    {
      name: 'MTN',
      description: 'this is mtn program',
      manager: managers[2].id,
      organization: (await Organization.find())[2]?.id,
    },
    {
      name: 'Atlp 3',
      description: 'this is program at org 3',
      manager: managers[3].id,
      organization: (await Organization.find())[3]?.id,
    },
    {
      name: 'program 1 Irembo',
      description: 'this is program at Irembo',
      manager: managers[3]?.id,
      organization: (await Organization.find())[4]?.id,
    },
    {
      name: 'program 2 Irembo ',
      description: 'this is second program at Irembo',
      manager: managers[3]?.id,
      organization: (await Organization.find())[4]?.id,
    },
  ];

  await Program.deleteMany({});

  await Program.insertMany(programs);
  return null;
};

export default seedPrograms;
