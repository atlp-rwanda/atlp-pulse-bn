import bcrypt from 'bcryptjs';
import { Profile, User } from '../models/user';

const seedUsers = async () => {
  await User.deleteMany({});
  await (
    await User.create({
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin', 10),
      role: 'admin',
    })
  ).save();

  await (
    await User.create({
      email: 'coordinator@gmail.com',
      password: await bcrypt.hash('coordinator', 10),
      role: 'coordinator',
    })
  ).save();

  await (
    await User.create({
      email: 'trainee@gmail.com',
      password: await bcrypt.hash('trainee', 10),
      role: 'trainee',
    })
  ).save();
};

export default seedUsers;
