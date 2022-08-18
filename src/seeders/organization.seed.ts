/* eslint-disable */
import { Organization, User } from '../models/user';

const seedOrganizations = async () => {
	const admin = await User.find({ role: 'admin' });

	const organizations = [
		{
			name: 'andela',
			description: 'organization 1 description',
			admin: admin[0]._id,
		},
		{
			name: 'organization 2',
			description: 'organization 2 description',
			admin: admin[1]._id,
		},
	];
	await Organization.deleteMany({});

	await Organization.insertMany(organizations);
	return null;
};
export default seedOrganizations;

