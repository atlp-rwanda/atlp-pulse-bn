import Cohort from '../models/cohort.model';
import Phase from '../models/phase.model';
import Program from '../models/program.model';
import { User } from '../models/user';

const seedCohorts = async () => {
  const coordinatorId = (await User.findOne({ role: 'coordinator' }))?.id;
  const phases=(await Phase.find())
  const cohorts = [
    {
      name: 'cohort 1',
      phase: phases[1]?.id,
      coordinator: coordinatorId,
      program: (await Program.find())[0].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort 2',
      phase: phases[0]?.id,
      coordinator: coordinatorId,
      program: (await Program.find())[1].id,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      name: 'cohort 3',
      phase: phases[0]?.id,
      coordinator: coordinatorId,
      program: (await Program.find())[1].id,
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