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
      email: 'admin@devpulse.co',
      password: hashSync('Andela123'),
      role: 'admin',
    },
    {
      email: 'admin2@pulse.com',
      password: hashSync('Andela123'),
      role: 'admin',
    },
    {
      email: 'manager@devpulse.co',
      password: hashSync('Andela123'),
      role: 'manager',
    },
    {
      email: 'manager2@pulse.com',
      password: hashSync('Andela123'),
      role: 'manager',
    },
    {
      email: 'coordinator@devpulse.co',
      password: hashSync('Andela123'),
      role: 'coordinator',
    },
    {
      email: 'coordinator1@devpulse.co',
      password: hashSync('Andela123'),
      role: 'coordinator',
    },
    {
      email: 'trainee@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
    },
    {
      email: 'trainee1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
    },
    {
      email: 'trainee2@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
    },
    {
      email: 'trainee3@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
    },
    {
      email: 'james@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
    },
    {
      email: 'peter@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
    },
    {
      email: 'john@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
    },
  ];
  await User.deleteMany({});

  await User.insertMany(users);
  return null;
};
export default seedUsers;
