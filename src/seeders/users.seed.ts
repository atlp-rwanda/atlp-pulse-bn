/* eslint-disable */
import { hashSync } from 'bcryptjs';
import { User, Profile } from '../models/user';


const seedUsers = async () => {
	const users = [
		{
			email: 'superAdmin@devpulse.co',
			password: hashSync('Andela123'),
			role: 'superAdmin',
		},
		{
			email: 'admin@devpulse.co',
			password: hashSync('Andela123'),
			role: 'admin',
		},
		{
			email: 'admin2@devpulse.co',
			password: hashSync('Andela123'),
			role: 'admin',
		},
		{
			email: 'manager@devpulse.co',
			password: hashSync('Andela123'),
			role: 'manager',
		},
		{
			email: 'manager2@devpulse.co',
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
			email: 'trainee@devpulse.co',
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

  const superAdmin: any= await User.findOne({email:'superAdmin@devpulse.co'})
  const admin: any = await User.findOne({email:'admin@devpulse.co'})
  const admin2: any = await User.findOne({email:'admin2@devpulse.co'})
  const manager:any = await User.findOne({email:'manager@devpulse.co'})
  const manager2:any = await User.findOne({email:'manager2@devpulse.co'})
  const coordinator:any = await User.findOne({email:'coordinator@devpulse.co'})
  const trainee:any = await User.findOne({email:'trainee@devpulse.co'})
   
  const profiles = [
    {
      user:superAdmin.id,
      firstName:'Gary',
      lastName:'Mukasa',
    },
    {
      user:admin.id,
      firstName:'Mike',
      lastName:'Akello'
    },
    {
      user:admin2.id,
      firstName:'Steven',
      lastName:'Mugabo',
    },
    {
      user:manager.id,
      firstName:'Charlotte',
      lastName:'Byiringiro',
    },
    {
      user:manager2.id,
      firstName:'Zaytzeff',
      lastName:'Amani',
    },
    {
      user:coordinator.id,
      firstName:'Yvonne',
      lastName:'Mbabazi',
    },
    {
      user:trainee.id,
      firstName:'John',
      lastName:'Birungi',
    },
  ]
  await Profile.deleteMany({});
	await Profile.insertMany(profiles);

	return null;
};
export default seedUsers;

