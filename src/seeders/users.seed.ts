/* eslint-disable */
import { hashSync } from 'bcryptjs';
import { User } from '../models/user';

const seedUsers = async () => {
	const users = [
		{
			email: 'tsa2341@gmail.com',
			password: hashSync('Andela123'),
			role: 'superAdmin',
		},
		{
			email: 'admin@pulse.com',
			password: hashSync('Andela123'),
			role: 'admin',
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

