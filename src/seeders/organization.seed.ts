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
      name: 'Irembo',
      description: 'IremboGov is making the government more accessible and more efficient for everyone',
      admin: admin[2]._id,
    },
  ];
  await Organization.deleteMany({});

  await Organization.insertMany(organizations);
  return null;
};
export default seedOrganizations;
