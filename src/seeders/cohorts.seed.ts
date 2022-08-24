import Cohort from '../models/cohort';

const cohorts = async () => {
  await Cohort.deleteMany({});
  await (
    await Cohort.create({
      name: 'Coders',
      coordinator: '63168439a8e97e5166656981',
      phase: 'team-project',
    })
  ).save();

  await (
    await Cohort.create({
      name: 'Strikers',
      coordinator: '63168439a8e97e5166656981',
      phase: 'core-concepts',
    })
  ).save();
};

export default cohorts;
