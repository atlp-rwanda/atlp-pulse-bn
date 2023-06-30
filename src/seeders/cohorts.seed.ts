import Cohort from '../models/cohort.model';
import Phase from '../models/phase.model';
import Program from '../models/program.model';
import { Organization, User } from '../models/user';

const seedCohorts = async () => {
  // Organization
  const andelaOrg = await Organization.find({ name: 'Andela' });
  const iremboOrg = await Organization.find({ name: 'Irembo' });
  const KlabOrg = await Organization.find({ name: 'KLab' });
  const BkOrg = await Organization.find({ name: 'BK' });

  // Programs
  const andelaPrograms = await Program.find({
    $or: [
      { name: { $eq: 'Atlp 1' } },
      { name: { $eq: 'Atlp 2' } },
      { name: { $eq: 'Atlp 3' } },
    ],
  });
  const iremboProgams = await Program.find({
    $or: [
      { name: { $eq: 'Brainly Developers Program' } },
      { name: { $eq: 'Rwema' } },
    ],
  });
  const klabProgams = await Program.find({
    $or: [{ name: { $eq: 'Robotics' } }, { name: { $eq: 'IoT' } }],
  });
  const bkProgams = await Program.find({
    $or: [{ name: { $eq: 'program 1 BK' } }, { name: { $eq: 'program 2 BK' } }],
  });

  // Phases
  const phases = await Phase.find();

  // Coordinators
  const andelCoord = await User.find({
    role: 'coordinator',
    organizations: { $in: ['Andela'] },
  });
  const iremboCoord = await User.find({
    role: 'coordinator',
    organizations: { $in: ['Irembo'] },
  });
  const KLabCoord = await User.find({
    role: 'coordinator',
    organizations: { $in: ['KLab'] },
  });
  const BkCoord = await User.find({
    role: 'coordinator',
    organizations: { $in: ['BK'] },
  });

  const cohorts = [
    // Andela
    {
      name: 'cohort 1',
      phase: phases[0]._id.toHexString(),
      coordinator: andelCoord[0]._id.toHexString(),
      program: andelaPrograms[0]._id.toHexString(),
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 2',
      phase: phases[1]._id.toHexString(),
      coordinator: andelCoord[1]._id.toHexString(),
      program: andelaPrograms[0]._id.toHexString(),
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 3',
      phase: phases[2]._id.toHexString(),
      coordinator: andelCoord[2]._id.toHexString(),
      program: andelaPrograms[1]._id.toHexString(),
      teams: 1,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 4',
      phase: phases[2]._id.toHexString(),
      coordinator: andelCoord[3]._id.toHexString(),
      program: andelaPrograms[2]._id.toHexString(),
      teams: 2,
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 5',
      phase: phases[3]._id.toHexString(),
      coordinator: andelCoord[4]._id.toHexString(),
      program: andelaPrograms[0]._id.toHexString(),
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: andelaOrg[0]._id.toHexString(),
    },

    // Irembo
    {
      name: 'cohort 1',
      phase: phases[1]._id.toHexString(),
      coordinator: iremboCoord[0]._id.toHexString(),
      program: iremboProgams[0]._id.toHexString(),
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: iremboOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 2',
      phase: phases[2]._id.toHexString(),
      coordinator: iremboCoord[1]._id.toHexString(),
      program: iremboProgams[1]._id.toHexString(),
      startDate: new Date(),
      endDate: new Date(),
      organization: iremboOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 3',
      phase: phases[2]._id.toHexString(),
      coordinator: iremboCoord[2]._id.toHexString(),
      program: iremboProgams[0]._id.toHexString(),
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: iremboOrg[0]._id.toHexString(),
    },

    // KLAB
    {
      name: 'cohort 1',
      phase: phases[1]._id.toHexString(),
      coordinator: KLabCoord[0]._id.toHexString(),
      program: klabProgams[0],
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: KlabOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 2',
      phase: phases[1]._id.toHexString(),
      coordinator: KLabCoord[1]._id.toHexString(),
      program: klabProgams[1],
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: KlabOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 3',
      phase: phases[1]._id.toHexString(),
      coordinator: KLabCoord[2]._id.toHexString(),
      program: klabProgams[0],
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: KlabOrg[0]._id.toHexString(),
    },

    // BK
    {
      name: 'cohort 1',
      phase: phases[2]._id.toHexString(),
      coordinator: BkCoord[0]._id.toHexString(),
      program: bkProgams[0]._id.toHexString(),
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: BkOrg[0]._id.toHexString(),
    },
    {
      name: 'cohort 2',
      phase: phases[0]._id.toHexString(),
      coordinator: BkCoord[1]._id.toHexString(),
      program: bkProgams[1]._id.toHexString(),
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: BkOrg[0]._id.toHexString(),
    },
    {
      name: '3',
      phase: phases[1]._id.toHexString(),
      coordinator: BkCoord[2]._id.toHexString(),
      program: bkProgams[0]._id.toHexString(),
      active: true,
      startDate: new Date(),
      endDate: new Date(),
      organization: BkOrg[0]._id.toHexString(),
    },
  ];

  await Cohort.deleteMany({});

  await Cohort.insertMany(cohorts);
  return null;
};

export default seedCohorts;