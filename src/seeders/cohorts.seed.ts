import Cohort from '../models/cohort.model';
import Program from '../models/program.model';
import { User } from '../models/user';

const seedCohorts = async () => {
  const coordinator1 = (
    await User.findOne({ email: 'coordinator@devpulse.co' })
  )?.id;
  const coordinator2 = (
    await User.findOne({ email: 'coordinator1@devpulse.co' })
  )?.id;
  const coordinator3 = (await User.findOne({ email: 'coordinator@mtn.com' }))
    ?.id;
  const coordinator4 = (
    await User.findOne({ email: 'coordinator3@devpulse.co' })
  )?.id;

  const cohorts = [
    {
      name: 'cohort 1',
      phase: '1',
      coordinator: coordinator1,
      program: (await Program.find())[0].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort 2',
      phase: '2',
      coordinator: coordinator2,
      program: (await Program.find())[1].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'MTN cohort 1',
      phase: '2',
      coordinator: coordinator3,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'MTN cohort 2',
      phase: '2',
      coordinator: coordinator3,
      program: (await Program.find())[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'ORG3 cohort 1',
      phase: '2',
      coordinator: coordinator4,
      program: (await Program.find())[3].id,
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
