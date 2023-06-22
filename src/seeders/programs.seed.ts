import Program from '../models/program.model';
import { Organization, User } from '../models/user';

const seedPrograms = async () => {
  const andelaManagers = await User.find({
    role: 'manager',
    organizations: { $in: ['Andela'] },
  });

  const IremboManagers = await User.find({
    role: 'manager',
    organizations: { $in: ['Irembo'] },
  });

  const KLabManagers = await User.find({
    role: 'manager',
    organizations: { $in: ['KLab'] },
  });

  const BkManagers = await User.find({
    role: 'manager',
    organizations: { $in: ['BK'] },
  });

  const andelaOrg = await Organization.find({ name: 'Andela' });
  const iremboOrg = await Organization.find({ name: 'Irembo' });
  const KlabOrg = await Organization.find({ name: 'KLab' });
  const BkOrg = await Organization.find({ name: 'BK' });

  const programs = [
    // Andela
    {
      name: 'Atlp 1',
      description: 'none',
      manager: andelaManagers[0]._id.toHexString(),
      organization: andelaOrg[0]._id.toHexString(),
    },
    {
      name: 'Atlp 2',
      description: 'none',
      manager: andelaManagers[1]._id.toHexString(),
      organization: andelaOrg[0]._id.toHexString(),
    },
    {
      name: 'Atlp 3',
      description: 'This belong to cohort 3',
      manager: andelaManagers[2]._id.toHexString(),
      organization: andelaOrg[0]._id.toHexString(),
    },

    // Irembo
    {
      name: 'Brainly Developers Program',
      description: 'This belong to cohort 7',
      manager: IremboManagers[0]._id.toHexString(),
      organization: iremboOrg[0]._id.toHexString(),
    },

    {
      name: 'Rwema',
      description: 'none',
      manager: IremboManagers[1]._id.toHexString(),
      organization: iremboOrg[0]._id.toHexString(),
    },

    // BK
    {
      name: 'program 1 BK',
      description: 'this is program at Irembo',
      manager: BkManagers[0]._id.toHexString(),
      organization: BkOrg[0]._id.toHexString(),
    },
    {
      name: 'program 2 BK',
      description: 'this is second program at BK',
      manager: BkManagers[1]._id.toHexString(),
      organization: BkOrg[0]._id.toHexString(),
    },

    // KLab
    {
      name: 'Robotics',
      description: 'this is Klab program',
      manager: KLabManagers[0]._id.toHexString(),
      organization: KlabOrg[0]._id.toHexString(),
    },
    {
      name: 'IoT',
      description: 'this is program at Klab',
      manager: KLabManagers[1]._id.toHexString(),
      organization: KlabOrg[0]._id.toHexString(),
    },
  ];

  await Program.deleteMany({});

  await Program.insertMany(programs);
  return null;
};

export default seedPrograms;