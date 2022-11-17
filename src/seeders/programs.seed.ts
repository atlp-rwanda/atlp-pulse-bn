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
      name: 'Atlp 4',
      description: 'this is program at org 3',
      manager: managers[3].id,
      organization: (await Organization.find())[3]?.id,
    },
  ];

  await Program.deleteMany({});

  await Program.insertMany(programs);
  return null;
};

export default seedPrograms;
