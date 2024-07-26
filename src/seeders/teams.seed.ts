import Cohort from '../models/cohort.model';
import Team from '../models/team.model';
import { Organization } from '../models/organization.model';

const seedTeams = async () => {
  const cohort = await Cohort.find();
  const teams = [
    {
      name: 'Team I',
      cohort: cohort[0]?.id,
      organization: (await Organization.find())[0]?.id,
      startingPhase: '2023-07-07',
      // ttl: (await User.find({ role: 'ttl' }))[0]?.id,
    },
    {
      name: 'Team II',
      cohort: cohort[1]?.id,
      organization: (await Organization.find())[0]?.id,
      startingPhase: '2023-06-07',
      // ttl: (await User.find({ role: 'ttl' }))[1]?.id,
    },
    {
      name: 'Team III',
      cohort: cohort[2]?.id,
      organization: (await Organization.find())[1]?.id,
      startingPhase: '2023-07-07',
      // ttl: (await User.find({ role: 'ttl' }))[2]?.id,
    },
    {
      name: 'Team IV',
      cohort: cohort[3]?.id,
      organization: (await Organization.find())[1]?.id,
      startingPhase: '2023-07-07',
      // ttl: (await User.find({ role: 'ttl' }))[3]?.id,
    },
    {
      name: 'Team V',
      cohort: cohort[3]?.id,
      organization: (await Organization.find())[1]?.id,
      startingPhase: '2023-06-07',
      // ttl: (await User.find({ role: 'ttl' }))[4]?.id,
    },
  ];

  await Team.deleteMany({});

  await Team.insertMany(teams);
  return null;
};

export default seedTeams;
