import Cohort from '../models/cohort.model';
import Team from '../models/team.model';

const seedTeams = async () => {
  const cohort = await Cohort.find();
  const teams = [
    {
      name: 'Team I',
      cohort: cohort[0]?.id,
    },
    {
      name: 'Team II',
      cohort: cohort[0]?.id,
    },
  ];

  await Team.deleteMany({});

  await Team.insertMany(teams);
  return null;
};

export default seedTeams;
