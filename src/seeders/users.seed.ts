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

    //mtn org
    //trainee
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
    {
      email: 'peter1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'john1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'peter2@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'john2@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'peter3@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'john3@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'peter4@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'john4@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'peter5@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },
    {
      email: 'john5@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['MTN'],
    },

    //coodro
    {
      email: 'coordinator@mtn.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['MTN'],
    },
    {
      email: 'coordinator2@mtn.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['MTN'],
    },
    {
      email: 'coordinator3@mtn.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['MTN'],
    },
    {
      email: 'coordinator4@mtn.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['MTN'],
    },
    //manager
    {
      email: 'manager@mtn.com',
      password: hashSync('Andela123'),
      role: 'manager',
      organizations: ['MTN'],
    },
    {
      email: 'manager2@mtn.com',
      password: hashSync('Andela123'),
      role: 'manager',
      organizations: ['MTN'],
    },
    {
      email: 'admin@mtn.com',
      password: hashSync('Andela123'),
      role: 'admin',
      organizations: ['MTN'],
    },
    // {
    //   email: 'admin@mtn.com',
    //   password: hashSync('Andela123'),
    //   role: 'admin',
    //   organizations: ['MTN'],
    // },
    //admin
  ];
  await User.deleteMany({});
  await User.insertMany(users);

  const superAdmin: any = await User.findOne({
    email: 'superadmin@devpulse.co',
  });
  const admin: any = await User.findOne({ email: 'admin@devpulse.co' });
  const admin2: any = await User.findOne({ email: 'admin2@devpulse.co' });
  const adminMtn: any = await User.findOne({ email: 'admin@mtn.com' });
  const admin4: any = await User.findOne({ email: 'admin3@devpulse.co' });
  const manager: any = await User.findOne({ email: 'manager@devpulse.co' });
  const manager3: any = await User.findOne({ email: 'manager2@devpulse.co' });
  const manager4: any = await User.findOne({ email: 'manager3@devpulse.co' });
  const managerMtn: any = await User.findOne({ email: 'manager@mtn.com' });
  const managerMtn2: any = await User.findOne({ email: 'manager2@mtn.com' });
  const coordinator: any = await User.findOne({
    email: 'coordinator@devpulse.co',
  });
  const coordinator1: any = await User.findOne({
    email: 'coordinator1@devpulse.co',
  });
  const coordinator3: any = await User.findOne({
    email: 'coordinator3@devpulse.co',
  });
  const coordinatorMtn: any = await User.findOne({
    email: 'coordinator@mtn.com',
  });
  const coordinatorMtn2: any = await User.findOne({
    email: 'coordinator2@mtn.com',
  });
  const coordinatorMtn3: any = await User.findOne({
    email: 'coordinator3@mtn.com',
  });
  const coordinatorMtn4: any = await User.findOne({
    email: 'coordinator4@mtn.com',
  });
  const trainee: any = await User.findOne({ email: 'trainee@devpulse.com' });
  const trainee2: any = await User.findOne({ email: 'trainee1@pulse.com' });
  const trainee3: any = await User.findOne({ email: 'trainee2@pulse.com' });
  const trainee4: any = await User.findOne({ email: 'trainee3@pulse.com' });
  const trainee5: any = await User.findOne({ email: 'test1@pulse.com' });
  const james: any = await User.findOne({ email: 'james@gmail.com' });
  const peter: any = await User.findOne({ email: 'peter@pulse.com' });
  const john: any = await User.findOne({ email: 'john@pulse.com' });
  const peter1: any = await User.findOne({ email: 'peter1@pulse.com' });
  const john1: any = await User.findOne({ email: 'john1@pulse.com' });
  const peter2: any = await User.findOne({ email: 'peter2@pulse.com' });
  const john2: any = await User.findOne({ email: 'john2@pulse.com' });
  const peter3: any = await User.findOne({ email: 'peter3@pulse.com' });
  const john3: any = await User.findOne({ email: 'john3@pulse.com' });
  const peter4: any = await User.findOne({ email: 'peter4@pulse.com' });
  const john4: any = await User.findOne({ email: 'john4@pulse.com' });
  const peter5: any = await User.findOne({ email: 'peter5@pulse.com' });
  const john5: any = await User.findOne({ email: 'john5@pulse.com' });

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
      user: adminMtn.id,
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
      user: manager3.id,
      firstName: 'Charlotte',
      lastName: 'Byiringiro',
    },
    {
      user: managerMtn.id,
      firstName: 'Zaytzeff',
      lastName: 'Mtn',
    },
    {
      user: managerMtn2.id,
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
      user: coordinatorMtn,
      firstName: 'coordinator',
      lastName: 'MTN',
    },
    {
      user: coordinatorMtn2,
      firstName: 'coordinator2',
      lastName: 'MTN',
    },
    {
      user: coordinatorMtn3,
      firstName: 'coordinator3',
      lastName: 'MTN',
    },
    {
      user: coordinatorMtn4,
      firstName: 'coordinator4',
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
    {
      user: peter1.id,
      firstName: 'Peter1',
      lastName: 'Okwadha',
    },
    {
      user: john1.id,
      firstName: 'James1',
      lastName: 'Agarwal',
    },
    {
      user: peter2.id,
      firstName: 'Peter2',
      lastName: 'Okwadha',
    },
    {
      user: john2.id,
      firstName: 'James2',
      lastName: 'Agarwal',
    },
    {
      user: peter3.id,
      firstName: 'Peter3',
      lastName: 'Okwadha',
    },
    {
      user: john3.id,
      firstName: 'James3',
      lastName: 'Agarwal',
    },
    {
      user: peter4.id,
      firstName: 'Peter4',
      lastName: 'Okwadha',
    },
    {
      user: john4.id,
      firstName: 'James4',
      lastName: 'Agarwal',
    },
    {
      user: peter5.id,
      firstName: 'Peter5',
      lastName: 'Okwadha',
    },
    {
      user: john5.id,
      firstName: 'Oooo',
      lastName: 'Agarwal',
    },
  ];
  await Profile.deleteMany({});
  await Profile.insertMany(profiles);

  return null;
};
export default seedUsers;
