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


  ];

  await Program.deleteMany({});

  await Program.insertMany(programs);
  return null;
};

export default seedPrograms;