import Cohort from '../models/cohort.model';
import Phase from '../models/phase.model';
import Program from '../models/program.model';
import { Organization, User } from '../models/user';

const seedCohorts = async () => {
  const phases = await Phase.find();
  const users = await User.find();
  const coordinatorId = (await User.findOne({ role: 'coordinator' }))?.id;
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
  const coordinatorIrembo = (
    await User.findOne({ email: 'coordinator@irembo.com' })
  )?.id;
  const coordinator2Irembo = (
    await User.findOne({ email: 'coordinator2@irembo.com' })
  )?.id;
  const coordinator3Irembo = (
    await User.findOne({ email: 'coordinator3@irembo.com' })
  )?.id;
  const coordinator4Irembo = (
    await User.findOne({ email: 'coordinator4@irembo.com' })
  )?.id;
  const organizations = await Organization.find();
  const programs = await Program.find();

  const cohorts = [
    {
      name: 'cohort 1',
      phase: phases[0]?.id,
      coordinator: users[5]?.id,
      program: programs[0].id,
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[0]?.id,
    },
    {
      name: 'cohort 2',
      phase: phases[1]?.id,
      coordinator: users[5]?.id,
      program: programs[0].id,
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[0]?.id,
    },
    {
      name: 'cohort 3',
      phase: phases[2]?.id,
      coordinator: users[6]?.id,
      program: programs[1].id,
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[1]?.id,
    },
    {
      name: 'cohort 4',
      phase: phases[2]?.id,
      coordinator: users[6]?.id,
      program: programs[1].id,
      teams: 2,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[1]?.id,
    },
    {
      name: 'cohort 4',
      phase: phases[2]?.id,
      coordinator: users[5]?.id,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[0]?.id,
    },
    {
      name: 'cohort 5',
      phase: phases[3]?.id,
      coordinator: users[6]?.id,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[1]?.id,
    },
    {
      name: 'cohort 6',
      phase: phases[1]?.id,
      coordinator: users[6]?.id,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[2]?.id,
    },
    {
      name: 'cohort 19',
      phase: phases[2]?.id,
      coordinator: users[5]?.id,
      program: programs[2].id,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[2]?.id,
    },
    {
      name: 'cohort eleven',
      phase: phases[2]?.id,
      coordinator: users[5]?.id,
      program: programs[1].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[2]?.id,
    },
    {
      name: 'cohort 20',
      phase: phases[3]?.id,
      coordinator: users[6]?.id,
      program: programs[1].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[3]?.id,
    },
    {
      name: 'cohort 21',
      phase: phases[0]?.id,
      coordinator: users[6]?.id,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[3]?.id,
    },
    {
      name: 'cohort fourteen',
      phase: phases[1]?.id,
      coordinator: users[6]?.id,
      program: programs[1].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[3]?.id,
    },
    {
      name: 'cohort fifteen',
      phase: phases[1]?.id,
      coordinator: users[6]?.id,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[4]?.id,
    },
    {
      name: 'cohort 19',
      phase: phases[1]?.id,
      coordinator: users[5]?.id,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[4]?.id,
    },
    {
      name: 'cohort 20',
      phase: phases[2]?.id,
      coordinator: users[6]?.id,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[4]?.id,
    },
    {
      name: 'cohort 21',
      phase: phases[0]?.id,
      coordinator: users[5]?.id,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[5]?.id,
    },
    {
      name: 'MTN cohort 1',
      phase: phases[1]?.id,
      coordinator: coordinator3,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[5]?.id,
    },
    {
      name: 'MTN cohort 2',
      phase: phases[1]?.id,
      coordinator: coordinator3,
      program: programs[2].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[5]?.id,
    },
    {
      name: 'ORG3 cohort 1',
      phase: phases[1]?.id,
      coordinator: coordinator4,
      program: programs[3].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[6]?.id,
    },
    {
      name: 'Program 1 cohort 1',
      phase: phases[0]?.id,
      coordinator: coordinatorIrembo,
      program: programs[4].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[6]?.id,
    },
    {
      name: 'Program 1 cohort 2',
      phase: phases[1]?.id,
      coordinator: coordinator2Irembo,
      program: programs[4].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[6]?.id,
    },
    {
      name: 'Program 2 cohort 1',
      phase: phases[1]?.id,
      coordinator: coordinator3Irembo,
      program: programs[5].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[6]?.id,
    },
    {
      name: 'Program 2 cohort 2',
      phase: phases[1]?.id,
      coordinator: coordinator4Irembo,
      program: programs[5].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: organizations[2]?.id,
    },
  ];

  await Cohort.deleteMany({});

  await Cohort.insertMany(cohorts);
  return null;
};

export default seedCohorts;
