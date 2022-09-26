/* eslint-disable */
import { hashSync } from 'bcryptjs';
import { User } from '../models/user';

const seedUsers = async () => {
	const users = [
		{
			email: 'superAdmin@pulse.com',
			password: hashSync('Andela123'),
			role: 'superAdmin',
		},
		{
			email: 'admin@pulse.com',
			password: hashSync('Andela123'),
			role: 'admin',
		},
		{
			email: 'admin2@pulse.com',
			password: hashSync('Andela123'),
			role: 'admin',
		},
		{
			email: 'manager@pulse.com',
			password: hashSync('Andela123'),
			role: 'manager',
		},
		{
			email: 'manager2@pulse.com',
			password: hashSync('Andela123'),
			role: 'manager',
		},
		{
			email: 'coordinator@pulse.com',
			password: hashSync('Andela123'),
			role: 'coordinator',
		},
		{
			email: 'trainee@pulse.com',
			password: hashSync('Andela123'),
			role: 'trainee',
		},
	];
	await User.deleteMany({});

	await User.insertMany(users);
	return null;
};
export default seedUsers;

