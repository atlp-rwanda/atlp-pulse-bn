/* eslint-disable */
import { Organization, User } from '../models/user';

const seedOrganizations = async () => {
  const admin = await User.find({ role: 'admin' });

  const organizations = [
    {
      name: 'Andela',
      description:
        'Master the professional and technical skills needed to accelerate your career and use technology to change the world.',
      admin: admin[0]._id,
    },
    {
      name: 'organization 2',
      description: 'Organization 2 description',
      admin: admin[1]._id,
    },
    {
      name: 'MTN',
      description: 'testing MTN',
      admin: admin[2]._id,
    },
    {
      name: 'organization 3',
      description: 'Organization 3 description',
      admin: admin[3]._id,
    },
  ];
  await Organization.deleteMany({});

  await Organization.insertMany(organizations);
  return null;
};
export default seedOrganizations;
