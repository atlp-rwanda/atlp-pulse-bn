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
			email: 'trainee@devpulse.com',
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
  const trainee:any = await User.findOne({email:'trainee@devpulse.com'})
  const trainee2:any = await User.findOne({email:'trainee1@pulse.com'})
  const trainee3:any = await User.findOne({email:'trainee2@devpulse.com'})
  const trainee4:any = await User.findOne({email:'trainee3@pulse.com'})
  const james:any = await User.findOne({email:'james@gmail.com'})
  const peter:any = await User.findOne({email:'peter@pulse.com'})
  const john:any = await User.findOne({email:'john@pulse.com'})
 
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
    {
      user:trainee2.id,
      firstName:'Peter',
      lastName:'Mbonyineza',
    },
    {
      user:trainee3.id,
      firstName:'Peter',
      lastName:'Mbonyineza',
    },
    {
      user:trainee4.id,
      firstName:'Jimmy',
      lastName:'Obonyo',
    },
    {
      user:james.id,
      firstName:'James',
      lastName:'Kamana',
    },
    {
      user:peter.id,
      firstName:'Peter',
      lastName:'Okwadha',
    },
    {
      user:john.id,
      firstName:'James',
      lastName:'Agarwal',
    },
  ]
  await Profile.deleteMany({});
	await Profile.insertMany(profiles);

	return null;
};
export default seedUsers;
