import { hashSync } from 'bcryptjs';
import { User, Profile } from '../models/user';

const seedUsers = async () => {
  const users = [
    {
      email: 'superadmin@devpulse.co',
      password: hashSync('Andela123'),
      role: 'superAdmin',
      organizations: ['Andela'],
    },
    {
      email: 'admin@devpulse.co',
      password: hashSync('Andela123'),
      role: 'admin',
      organizations: ['Andela'],
    },
    {
      email: 'admin2@devpulse.co',
      password: hashSync('Andela123'),
      role: 'admin',
      organizations: ['organization 2'],
    },
    {
      email: 'admin@mtn.com',
      password: hashSync('Andela123'),
      role: 'admin',
      organizations: ['MTN'],
    },
    {
      email: 'manager@devpulse.co',
      password: hashSync('Andela123'),
      role: 'manager',
      organizations: ['Andela'],
    },
    {
      email: 'manager2@devpulse.co',
      password: hashSync('Andela123'),
      role: 'manager',
      organizations: ['organization 2'],
    },
    {
      email: 'manager@mtn.com',
      password: hashSync('Andela123'),
      role: 'manager',
      organizations: ['MTN'],
    },
    {
      email: 'coordinator@devpulse.co',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['Andela'],
    },
    {
      email: 'coordinator1@devpulse.co',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['organization 2'],
    },
    {
      email: 'coordinator@mtn.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['organization 2'],
    },
    {
      email: 'trainee@devpulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Andela'],
    },
    {
      email: 'trainee1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Andela'],
    },
    {
      email: 'trainee2@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['organization 2'],
    },
    {
      email: 'trainee3@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['organization 2'],
    },
    {
      email: 'james@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Andela'],
    },
    {
      email: 'peter@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'john@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },

    //p
    {
      email: 'test1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['organization 3'],
    },
    {
      email: 'admin3@devpulse.co',
      password: hashSync('Andela123'),
      role: 'admin',
      organizations: ['organization 3'],
    },
    {
      email: 'manager3@devpulse.co',
      password: hashSync('Andela123'),
      role: 'manager',
      organizations: ['organization 3'],
    },
    {
      email: 'coordinator3@devpulse.co',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['organization 3'],
    },
  ];
  await User.deleteMany({});
  await User.insertMany(users);

  const superAdmin: any = await User.findOne({
    email: 'superadmin@devpulse.co',
  });
  const admin: any = await User.findOne({ email: 'admin@devpulse.co' });
  const admin2: any = await User.findOne({ email: 'admin2@devpulse.co' });
  const admin3: any = await User.findOne({ email: 'admin@mtn.com' });
  const admin4: any = await User.findOne({ email: 'admin3@devpulse.co' });
  const manager: any = await User.findOne({ email: 'manager@devpulse.co' });
  const manager3: any = await User.findOne({ email: 'manager2@devpulse.co' });
  const manager4: any = await User.findOne({ email: 'manager3@devpulse.co' });
  const manager2: any = await User.findOne({ email: 'manager@mtn.com' });
  const coordinator: any = await User.findOne({
    email: 'coordinator@devpulse.co',
  });
  const coordinator1: any = await User.findOne({
    email: 'coordinator1@devpulse.co',
  });
  const coordinator2: any = await User.findOne({
    email: 'coordinator@mtn.com',
  });
  const coordinator3: any = await User.findOne({
    email: 'coordinator3@devpulse.co',
  });
  const trainee: any = await User.findOne({ email: 'trainee@devpulse.com' });
  const trainee2: any = await User.findOne({ email: 'trainee1@pulse.com' });
  const trainee3: any = await User.findOne({ email: 'trainee2@pulse.com' });
  const trainee4: any = await User.findOne({ email: 'trainee3@pulse.com' });
  const trainee5: any = await User.findOne({ email: 'test1@pulse.com' });
  const james: any = await User.findOne({ email: 'james@gmail.com' });
  const peter: any = await User.findOne({ email: 'peter@pulse.com' });
  const john: any = await User.findOne({ email: 'john@pulse.com' });

  const profiles = [
    {
      user: superAdmin.id,
      firstName: 'Gary',
      lastName: 'Mukasa',
    },
    {
      user: admin.id,
      firstName: 'Mike',
      lastName: 'Akello',
    },
    {
      user: admin2.id,
      firstName: 'Steven',
      lastName: 'Mugabo',
    },
    {
      user: admin3.id,
      firstName: 'Admin',
      lastName: 'MTN',
    },
    {
      user: admin4.id,
      firstName: 'Admin',
      lastName: 'Org 3',
    },
    {
      user: manager.id,
      firstName: 'Charlotte',
      lastName: 'Byiringiro',
    },
    {
      user: manager2.id,
      firstName: 'Zaytzeff',
      lastName: 'Amani',
    },
    {
      user: manager3.id,
      firstName: 'Manager',
      lastName: 'MTN',
    },
    {
      user: manager4.id,
      firstName: 'Zaytzeff',
      lastName: 'Org 3',
    },
    {
      user: coordinator.id,
      firstName: 'Yvonne',
      lastName: 'Mbabazi',
    },
    {
      user: coordinator1.id,
      firstName: 'Yvonne1',
      lastName: 'Mbabazi',
    },
    {
      user: coordinator2.id,
      firstName: 'coordinator',
      lastName: 'MTN',
    },
    {
      user: coordinator3.id,
      firstName: 'coordinator',
      lastName: 'Org',
    },
    {
      user: trainee.id,
      firstName: 'John',
      lastName: 'Birungi',
    },
    {
      user: trainee2.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: trainee3.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: trainee4.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: james.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: peter.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: john.id,
      firstName: 'James',
      lastName: 'Agarwal',
    },
  ];
  await Profile.deleteMany({});
  await Profile.insertMany(profiles);

  return null;
};
export default seedUsers;
