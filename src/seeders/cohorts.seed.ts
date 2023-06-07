import Cohort from '../models/cohort.model';
import Phase from '../models/phase.model';
import Program from '../models/program.model';
import { Organization, User } from '../models/user';

const seedCohorts = async () => {
  const phases = await Phase.find();
  const users = await User.find();

  const cohorts = [
    {
      name: 'cohort 1',
      phase: phases[0]?.id,
      coordinator: users[5]?.id,
      program: (await Program.find())[0].id,
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: (await Organization.find())[0]?.id
    },
    {
      name: 'cohort 2',
      phase: phases[1]?.id,
      coordinator: users[5]?.id,
      program: (await Program.find())[0].id,
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: (await Organization.find())[0]?.id
    },
    {
      name: 'cohort 3',
      phase: phases[2]?.id,
      coordinator: users[6]?.id,
      program: (await Program.find())[1].id,
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: (await Organization.find())[1]?.id
    },
    {
      name: 'cohort 4',
      phase: phases[2]?.id,
      coordinator: users[6]?.id,
      program: (await Program.find())[1].id,
      teams: 2,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: (await Organization.find())[1]?.id
    },
    {
      name: 'cohort 4',
      phase: '2',
      coordinator: users[5]?.id,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort 5',
      phase: '3',
      coordinator: users[6]?.id,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort 6',
      phase: '1',
      coordinator: users[6]?.id,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },

    {
      name: 'cohort 19',
      phase: '2',
      coordinator: users[5]?.id,
      program: (await Program.find())[2].id,
    },
    {
      name: 'cohort eleven',
      phase: '2',
      coordinator: users[5]?.id,
      program: (await Program.find())[1].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort 20',
      phase: '3',
      coordinator: users[6]?.id,
      program: (await Program.find())[1].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort 21',
      phase: '1',
      coordinator: users[6]?.id,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort fourteen',
      phase: '2',
      coordinator: users[6]?.id,
      program: (await Program.find())[1].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort fifteen',
      phase: '2',
      coordinator: users[6]?.id,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
       {
      name: 'cohort 19',
      phase: '2',
      coordinator: users[5]?.id,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort 20',
      phase: '3',
      coordinator: users[6]?.id,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort 21',
      phase: '1',
      coordinator: users[5]?.id,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },


  ];

  await Cohort.deleteMany({});

  await Cohort.insertMany(cohorts);
  return null;
};

export default seedCohorts;