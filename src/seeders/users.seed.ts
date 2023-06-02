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
      email: 'peter@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Andela'],
    },
    {
      email: 'john@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['organization 2'],
    },



    {
      email: 'test1@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'admin4@devpulse.co',
      password: hashSync('Organization123'),
      role: 'admin',
      organizations: ['Organization 3'],
    },
    {
      email: 'admin3@devpulse.co',
      password: hashSync('Organization123'),
      role: 'admin',
      organizations: ['organization 3'],
    },
    {
      email: 'admin5@devpulse.co',
      password: hashSync('Organization123'),
      role: 'admin',
      organizations: ['Organization 3'],
    },    {
      email: 'admin6@devpulse.co',
      password: hashSync('Organization123'),
      role: 'admin',
      organizations: ['Organization 3'],
    },
    {
      email: 'manager3@devpulse.co',
      password: hashSync('Organization123'),
      role: 'manager',
      organizations: ['Organization 3'],
    },
    {
      email: 'manager4@devpulse.co',
      password: hashSync('Organization123'),
      role: 'manager',
      organizations: ['Organization 3'],
    },
    {
      email: 'manager5@devpulse.co',
      password: hashSync('Organization123'),
      role: 'manager',
      organizations: ['Organization 3'],
    },
    {
      email: 'manager6@devpulse.co',
      password: hashSync('Organization123'),
      role: 'manager',
      organizations: ['organization 3'],
    },
    {
      email: 'coordinator3@devpulse.co',
      password: hashSync('Organization123'),
      role: 'coordinator',
      organizations: ['Organization 3'],
    },
    {
      email: 'coordinator4@devpulse.co',
      password: hashSync('Organization123'),
      role: 'coordinator',
      organizations: ['organization 3'],
    },
    {
      email: 'coordinator5@devpulse.co',
      password: hashSync('Organization123'),
      role: 'coordinator',
      organizations: ['organization 3'],
    },   
    {
      email: 'coordinator6@devpulse.co',
      password: hashSync('Organization123'),
      role: 'coordinator',
      organizations: ['organization 3'],
    },
    {
      email: 'coordinator7@devpulse.co',
      password: hashSync('Organization123'),
      role: 'coordinator',
      organizations: ['organization 3'],
    },
    {
      email: 'coordinator8@devpulse.co',
      password: hashSync('Organization123'),
      role: 'coordinator',
      organizations: ['organization 3'],
    },
    {
      email: 'coordinator9@devpulse.co',
      password: hashSync('Organization123'),
      role: 'coordinator',
      organizations: ['organization 3'],
    },
    {
      email: 'coordinator10@devpulse.co',
      password: hashSync('Organization123'),
      role: 'coordinator',
      organizations: ['organization 3'],
    },
    {
      email: 'test2@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'test3@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'test4@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['organization 3'],
    },
    {
      email: 'test5@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['organization 3'],
    },
    {
      email: 'test6@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'test7@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'test8@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['organization 3'],
    },{
      email: 'test9@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'test10@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'fabrice@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['organization 3'],
    },
    {
      email: 'fabricerug@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'fabricenkuku@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['organization 3'],
    },
    {
      email: 'fabricekayi@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'rugfabrice@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['organization 3'],
    },
    {
      email: 'fabricenziranziza@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'fabricekayitankore@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'shemankubito@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'shemalucie@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'shema@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'shemakanyandekwe@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'shemarodri@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'shema1@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'shema2@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'shema3@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },
    {
      email: 'shemajohn@pulse.com',
      password: hashSync('Organization123'),
      role: 'trainee',
      organizations: ['Organization 3'],
    },

    {
    email: 'karimba@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'karimbavianney@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'karimba1@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'karimbajean@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'karimbafiston@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'karimbajohn12@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
    {
    email: 'karimbafiston12@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'karimbajohn1@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },



  {
    email: 'inkuba@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'inkuba1@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },  {
    email: 'inkuba2@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'inkuba3@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },  {
    email: 'inkuba4@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'inkuba5@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  }, 
   {
    email: 'inkuba6@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'inkuba7@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  }, 
   {
    email: 'inkubajean@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'inkubajohn@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
   {
    email: 'wilson@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'wilsonjohn@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'generator@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'generato.r@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'generat.or@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'generat.o.r@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'genera.tor@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'genera.to.r@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'genera.t.or@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'genera.t.o.r@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'gener.ator@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },

  
  
  {
    email: 'danydrink@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
   {
    email: 'mikedany@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'milestonedany@pulse.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'davedany@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'danydimtri@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'danyhelper@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'dannyclug@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'danychang@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'danychen@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'alanwalker@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'alanphilip@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'alanjames@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'alanclavin@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'dimalan@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'alandest@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'alanpulg@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },


  {
    email: 'hakizimanaaline@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanaalain@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanastani@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanawilson@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanadestin@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanaphilip@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanadio123@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanadivin@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanaclara@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanadenys@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'hakizimanaquerry@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'cyanzayire@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'cyanzayiredeus@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },
  {
    email: 'theophilehakizumwami@gmail.com',
    password: hashSync('Organization123'),
    role: 'trainee',
    organizations: ['Organization 3'],
  },

  ];
  await User.deleteMany({});
  await User.insertMany(users);

  const superAdmin: any = await User.findOne({
    email: 'superadmin@devpulse.co',
  });
  const admin: any = await User.findOne({ email: 'admin@devpulse.co' });
  const admin2: any = await User.findOne({ email: 'admin2@devpulse.co' });
  const manager: any = await User.findOne({ email: 'manager@devpulse.co' });
  const manager2: any = await User.findOne({ email: 'manager2@devpulse.co' });
  const coordinator: any = await User.findOne({
    email: 'coordinator@devpulse.co',
  });
  const trainee: any = await User.findOne({ email: 'trainee@devpulse.com' });
  const trainee2: any = await User.findOne({ email: 'trainee1@pulse.com' });
  const trainee3: any = await User.findOne({ email: 'trainee2@pulse.com' });
  const trainee4: any = await User.findOne({ email: 'trainee3@pulse.com' });
  const james: any = await User.findOne({ email: 'james@gmail.com' });
  const peter: any = await User.findOne({ email: 'peter@pulse.com' });
  const john: any = await User.findOne({ email: 'john@pulse.com' });


  const test1: any = await User.findOne({ email: 'test1@pulse.com' });
  const admin4: any = await User.findOne({ email: 'admin4@devpulse.co' });
  const admin3: any = await User.findOne({ email: 'admin3@devpulse.co' });
  const admin5: any = await User.findOne({ email: 'admin5@devpulse.co' });
  const admin6: any = await User.findOne({ email: 'admin6@devpulse.co' });
  const manager3: any = await User.findOne({ email: 'manager3@devpulse.co' });
  const manager4: any = await User.findOne({ email: 'manager4@devpulse.co' });
  const manager5: any = await User.findOne({ email: 'manager5@devpulse.co' });
  const manager6: any = await User.findOne({ email: 'manager6@devpulse.co' });
  const coordinator3: any = await User.findOne({ email: 'coordinator3@devpulse.co' });
  const coordinator4: any = await User.findOne({ email: 'coordinator4@devpulse.co' });
  const coordinator5: any = await User.findOne({ email: 'coordinator5@devpulse.co' });
  const coordinator6: any = await User.findOne({ email: 'coordinator6@devpulse.co' });
  const coordinator7: any = await User.findOne({ email: 'coordinator7@devpulse.co' });
  const coordinator8: any = await User.findOne({ email: 'coordinator8@devpulse.co' });
  const coordinator9: any = await User.findOne({ email: 'coordinator9@devpulse.co' });
  const coordinator10: any = await User.findOne({ email: 'coordinator10@devpulse.co' });
  const test2: any = await User.findOne({ email: 'test2@pulse.com' });
  const test3: any = await User.findOne({ email: 'test3@pulse.com' });
  const test4: any = await User.findOne({ email: 'test4@pulse.com' });
  const test5: any = await User.findOne({ email: 'test5@pulse.com' });
  const test6: any = await User.findOne({ email: 'test6@pulse.com' });
  const test7: any = await User.findOne({ email: 'test7@pulse.com' });
  const test8: any = await User.findOne({ email: 'test8@pulse.com' });
  const test9: any = await User.findOne({ email: 'test9@pulse.com' });
  const test10: any = await User.findOne({ email: 'test10@pulse.com' });
  const fabrice: any = await User.findOne({ email: 'fabrice@pulse.com' });
  const fabricerug: any = await User.findOne({ email: 'fabricerug@pulse.com' });
  const fabricenkuku: any = await User.findOne({ email: 'fabricenkuku@pulse.com' });
  const fabricekayi: any = await User.findOne({ email: 'fabricekayi@pulse.com' });
  const rugfabrice: any = await User.findOne({ email: 'rugfabrice@pulse.com' });
  const fabricenziranziza: any = await User.findOne({ email: 'fabricenziranziza@pulse.com' });
  const fabricekayitankore: any = await User.findOne({ email: 'fabricekayitankore@pulse.com' });
  const shemankubito: any = await User.findOne({ email: 'shemankubito@pulse.com' });
  const shemalucie: any = await User.findOne({ email: 'shemalucie@pulse.com' });
  const shema: any = await User.findOne({ email: 'shema@pulse.com' });
  const shemakanyandekwe: any = await User.findOne({ email: 'shemakanyandekwe@pulse.com' });
  const shemarodri: any = await User.findOne({ email: 'shemarodri@pulse.com' });
  const shema1: any = await User.findOne({ email: 'shema1@pulse.com' });
  const shema2: any = await User.findOne({ email: 'shema2@pulse.com' });
  const shema3: any = await User.findOne({ email: 'shema3@pulse.com' });
  const karimba: any = await User.findOne({ email: 'karimba@pulse.com' });
  const karimbavianney: any = await User.findOne({ email: 'karimbavianney@pulse.com' });
  const karimba1: any = await User.findOne({ email: 'karimba1@pulse.com' });
  const karimbajean: any = await User.findOne({ email: 'karimbajean@pulse.com' });
  const karimbafiston: any = await User.findOne({ email: 'karimbafiston@pulse.com' });
  const karimbajohn12: any = await User.findOne({ email: 'karimbajohn12@pulse.com' });
  const karimbajohn1: any = await User.findOne({ email: 'karimbajohn1@pulse.com' });
  const karimbafiston12: any = await User.findOne({ email: 'karimbafiston12@pulse.com' });
  const inkuba: any = await User.findOne({ email: 'inkuba@pulse.com' });
  const inkuba1: any = await User.findOne({ email: 'inkuba1@pulse.com' });
  const inkuba2: any = await User.findOne({ email: 'inkuba2@pulse.com' });
  const inkuba3: any = await User.findOne({ email: 'inkuba3@pulse.com' });
  const inkuba4: any = await User.findOne({ email: 'inkuba4@pulse.com' });
  const inkuba5: any = await User.findOne({ email: 'inkuba5@pulse.com' });
  const inkuba6: any = await User.findOne({ email: 'inkuba6@pulse.com' });
  const inkuba7: any = await User.findOne({ email: 'inkuba7@pulse.com' });
  const inkubajean: any = await User.findOne({ email: 'inkubajean@pulse.com' });
  const shemajohn: any = await User.findOne({ email: 'shemajohn@pulse.com' });
  const wilson: any = await User.findOne({ email: 'wilson@pulse.com' });
  const wilsonjohn: any = await User.findOne({ email: 'wilsonjohn@pulse.com' });
  const inkubajohn: any = await User.findOne({ email: 'inkubajohn@pulse.com' });
  const generator: any = await User.findOne({ email: 'generator@gmail.com' });
  const generator1: any = await User.findOne({ email: 'generato.r@gmail.com' });
  const generator2: any = await User.findOne({ email: 'generat.or@gmail.com' });
  const generator3: any = await User.findOne({ email: 'generat.o.r@gmail.com' });
  const generator4: any = await User.findOne({ email: 'genera.tor@gmail.com' });
  const generator5: any = await User.findOne({ email: 'genera.to.r@gmail.com' });
  const generator6: any = await User.findOne({ email: 'genera.t.or@gmail.com' });
  const generator7: any = await User.findOne({ email: 'genera.t.o.r@gmail.com' });
  const generator8: any = await User.findOne({ email: 'gener.ator@gmail.com' });
  const dany: any = await User.findOne({ email: 'danydrink@pulse.com' });
  const dany1: any = await User.findOne({ email: 'mikedany@pulse.com' });
  const dany2: any = await User.findOne({ email: 'milestonedany@pulse.com' });
  const dany3: any = await User.findOne({ email: 'davedany@gmail.com' });
  const dany4: any = await User.findOne({ email: 'danydimtri@gmail.com' });
  const dany5: any = await User.findOne({ email: 'danyhelper@gmail.com' });
  const dany6: any = await User.findOne({ email: 'dannyclug@gmail.com' });
  const dany7: any = await User.findOne({ email: 'danychang@gmail.com' });
  const dany8: any = await User.findOne({ email: 'danychen@gmail.com' });
  const alan: any = await User.findOne({ email: 'alanwalker@gmail.com' });
  const alan1: any = await User.findOne({ email: 'alanphilip@gmail.com' });
  const alan2: any = await User.findOne({ email: 'alanjames@gmail.com' });
  const alan3: any = await User.findOne({ email: 'alanclavin@gmail.com' });
  const alan4: any = await User.findOne({ email: 'dimalan@gmail.com' });
  const alan5: any = await User.findOne({ email: 'alandest@gmail.com' });
  const alan6: any = await User.findOne({ email: 'alanpulg@gmail.com' });
  const hakizimana: any = await User.findOne({ email: 'hakizimanaaline@gmail.com' });
  const hakizimana1: any = await User.findOne({ email: 'hakizimanaalain@gmail.com' });
  const hakizimana2: any = await User.findOne({ email: 'hakizimanastani@gmail.com' });
  const hakizimana3: any = await User.findOne({ email: 'hakizimanawilson@gmail.com' });
  const hakizimana4: any = await User.findOne({ email: 'hakizimanadestin@gmail.com' });
  const hakizimana5: any = await User.findOne({ email: 'hakizimanaphilip@gmail.com' });
  const hakizimana6: any = await User.findOne({ email: 'hakizimanadio123@gmail.com' });
  const hakizimana7: any = await User.findOne({ email: 'hakizimanadivin@gmail.com' });
  const hakizimana8: any = await User.findOne({ email: 'hakizimanaclara@gmail.com' });
  const hakizimana9: any = await User.findOne({ email: 'hakizimanadenys@gmail.com' });
  const hakizimana10: any = await User.findOne({ email: 'hakizimanaquerry@gmail.com' });
  const cyanzayire: any = await User.findOne({ email: 'cyanzayire@gmail.com' });
  const cyanzayire1: any = await User.findOne({ email: 'cyanzayiredeus@gmail.com' });
  const hakizumwami1: any = await User.findOne({ email: 'theophilehakizumwami@gmail.com' });

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
      user: coordinator.id,
      firstName: 'Yvonne',
      lastName: 'Mbabazi',
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
    user: test1.id,
    firstName: 'Gary',
    lastName: 'Mukasa',
  },
  {
    user: admin4.id,
    firstName: 'Mike',
    lastName: 'Akello',
  },
  {
    user: admin3.id,
    firstName: 'Steven',
    lastName: 'Mugabo',
  },
  {
    user: admin5.id,
    firstName: 'Charlotte',
    lastName: 'Byiringiro',
  },
  {
    user: admin6.id,
    firstName: 'Zaytzeff',
    lastName: 'Amani',
  },
  {
    user: manager3.id,
    firstName: 'Yvonne',
    lastName: 'Mbabazi',
  },
  {
    user: manager4.id,
    firstName: 'John',
    lastName: 'Birungi',
  },
  {
    user: manager5.id,
    firstName: 'Peter',
    lastName: 'Mbonyineza',
  },
  {
    user: manager6.id,
    firstName: 'Eric',
    lastName: 'Mugisha',
  },
  {
    user: coordinator3.id,
    firstName: 'Jimmy',
    lastName: 'Obonyo',
  },
  {
    user: coordinator4.id,
    firstName: 'James',
    lastName: 'Kamana',
  },
  {
    user: coordinator5.id,
    firstName: 'Peter',
    lastName: 'Okwadha',
  },
  {
    user: coordinator6.id,
    firstName: 'James',
    lastName: 'Agarwal',
  }, 

  {
     user: test2.id,
  firstName: 'Gary',
  lastName: 'Mukasa',
},
{
  user: test3.id,
  firstName: 'Mike',
  lastName: 'Akello',
},
{
  user: test4.id,
  firstName: 'Steven',
  lastName: 'Mugabo',
},
{
  user: test5.id,
  firstName: 'Charlotte',
  lastName: 'Byiringiro',
},
{
  user: test6.id,
  firstName: 'Zaytzeff',
  lastName: 'Amani',
},
{
  user: test7.id,
  firstName: 'Yvonne',
  lastName: 'Mbabazi',
},
{
  user: test8.id,
  firstName: 'John',
  lastName: 'Birungi',
},
{
  user: test9.id,
  firstName: 'Peter',
  lastName: 'Mbonyineza',
},
{
  user: test10.id,
  firstName: 'Eric',
  lastName: 'Mugisha',
},
{
  user: fabrice.id,
  firstName: 'Jimmy',
  lastName: 'Obonyo',
},
{
  user: fabricerug.id,
  firstName: 'James',
  lastName: 'Kamana',
},
{
  user: fabricenkuku.id,
  firstName: 'Peter',
  lastName: 'Okwadha',
},
{
  user: fabricekayi.id,
  firstName: 'James',
  lastName: 'Agarwal',
},

{
  user: rugfabrice.id,
  firstName: 'Jimmy',
  lastName: 'Obonyo',
},
{
  user: fabricenziranziza.id,
  firstName: 'James',
  lastName: 'Kamana',
},
{
  user: fabricekayitankore.id,
  firstName: 'Peter',
  lastName: 'Okwadha',
},
{
  user: shemankubito.id,
  firstName: 'James',
  lastName: 'Agarwal',
}, 
{
   user: shemalucie.id,
firstName: 'Gary',
lastName: 'Mukasa',
},
{
   user: shema.id,
firstName: 'Gary',
lastName: 'Mukasa',
},
{
user: shemakanyandekwe.id,
firstName: 'Mike',
lastName: 'Akello',
},
{
user: shemarodri.id,
firstName: 'Steven',
lastName: 'Mugabo',
},
{
user: shema1.id,
firstName: 'Charlotte',
lastName: 'Byiringiro',
},
{
user: shema2.id,
firstName: 'Zaytzeff',
lastName: 'Amani',
},
{
user: shema3.id,
firstName: 'Yvonne',
lastName: 'Mbabazi',
},
{
user: karimba.id,
firstName: 'John',
lastName: 'Birungi',
},
{
user: karimbavianney.id,
firstName: 'Peter',
lastName: 'Mbonyineza',
},
{
user: karimba1.id,
firstName: 'Eric',
lastName: 'Mugisha',
},
{
user: karimbajean.id,
firstName: 'Jimmy',
lastName: 'Obonyo',
},
{
user: karimbafiston.id,
firstName: 'James',
lastName: 'Kamana',
},
{
user: karimbajohn12.id,
firstName: 'Peter',
lastName: 'Okwadha',
},
{
user: karimbajohn1.id,
firstName: 'James',
lastName: 'Agarwal',
},

{
  user: karimbafiston12.id,
  firstName: 'Steven',
  lastName: 'Mugabo',
  },
  {
  user: inkuba.id,
  firstName: 'Charlotte',
  lastName: 'Byiringiro',
  },
  {
  user: inkuba1.id,
  firstName: 'Zaytzeff',
  lastName: 'Amani',
  },
  {
  user: inkuba2.id,
  firstName: 'Yvonne',
  lastName: 'Mbabazi',
  },
  {
  user: inkuba3.id,
  firstName: 'John',
  lastName: 'Birungi',
  },
  {
  user: inkuba4.id,
  firstName: 'Peter',
  lastName: 'Mbonyineza',
  },
  {
  user: inkuba5.id,
  firstName: 'Eric',
  lastName: 'Mugisha',
  },
  {
  user: inkuba6.id,
  firstName: 'Jimmy',
  lastName: 'Obonyo',
  },
  {
  user: inkuba7.id,
  firstName: 'James',
  lastName: 'Kamana',
  },
  {
  user: inkubajean.id,
  firstName: 'Peter',
  lastName: 'Okwadha',
  },
  {
  user: shemajohn.id,
  firstName: 'James',
  lastName: 'Agarwal',
  },
  {
  user: wilson.id,
  firstName: 'James',
  lastName: 'Agarwal',
  },
  {
  user: wilsonjohn.id,
  firstName: 'James',
  lastName: 'Agarwal',
  },
  {
  user: inkubajohn.id,
  firstName: 'James',
  lastName: 'Agarwal',
  },

  {
    user: generator.id,
    firstName: 'Peter',
    lastName: 'Mbonyineza',
    },
    {
    user: generator1.id,
    firstName: 'Eric',
    lastName: 'Mugisha',
    },
    {
    user: generator2.id,
    firstName: 'Jimmy',
    lastName: 'Obonyo',
    },
    {
    user: generator3.id,
    firstName: 'James',
    lastName: 'Kamana',
    },
    {
    user: generator4.id,
    firstName: 'Peter',
    lastName: 'Okwadha',
    },
    {
    user: generator5.id,
    firstName: 'GEn',
    lastName: 'Agarwal',
    },
    {
    user: generator6.id,
    firstName: 'GEn',
    lastName: 'Agarwal',
    },
    {
    user: generator7.id,
    firstName: 'GEn',
    lastName: 'Agarwal',
    },
    {
    user: generator8.id,
    firstName: 'generator',
    lastName: 'Agarwal',
    },



    {
      user: dany.id,
      firstName: 'James',
      lastName: 'Agarwal',
      },
      {
      user: dany1.id,
      firstName: 'James',
      lastName: 'Agarwal',
      },
      {
      user: dany2.id,
      firstName: 'James',
      lastName: 'Agarwal',
      },
      {
      user: dany3.id,
      firstName: 'James',
      lastName: 'Agarwal',
      },
    
      {
        user: dany4.id,
        firstName: 'Peter',
        lastName: 'Mbonyineza',
        },
        {
        user: dany5.id,
        firstName: 'Eric',
        lastName: 'Mugisha',
        },
        {
        user: dany6.id,
        firstName: 'Jimmy',
        lastName: 'Obonyo',
        },
        {
        user: dany7.id,
        firstName: 'James',
        lastName: 'Kamana',
        },
        {
        user: dany8.id,
        firstName: 'Peter',
        lastName: 'Okwadha',
        },
        {
        user: alan.id,
        firstName: 'GEn',
        lastName: 'Agarwal',
        },
        {
        user: alan1.id,
        firstName: 'GEn',
        lastName: 'Agarwal',
        },
        {
        user: alan2.id,
        firstName: 'GEn',
        lastName: 'Agarwal',
        },
        {
        user: alan3.id,
        firstName: 'Alan',
        lastName: 'Agarwal',
        },
        {
        user: alan4.id,
        firstName: 'Alan',
        lastName: 'Agarwal',
        },
        {
        user: alan5.id,
        firstName: 'Alan',
        lastName: 'Agarwal',
        },
        {
        user: alan6.id,
        firstName: 'Alan',
        lastName: 'Agarwal',
        },
        {
        user: coordinator7.id,
        firstName: 'Alan',
        lastName: 'Agarwal',
        },
        {
        user: coordinator8.id,
        firstName: 'Alan',
        lastName: 'Agarwal',
        },
        {
        user: coordinator9.id,
        firstName: 'Alan',
        lastName: 'Agarwal',
        },
        {
        user: coordinator10.id,
        firstName: 'Alan',
        lastName: 'Agarwal',
        },


        {
        user: hakizimana.id,
        firstName: 'Peter',
        lastName: 'Okwadha',
        },
        {
        user: hakizimana1.id,
        firstName: 'GEn',
        lastName: 'Agarwal',
        },
        {
        user: hakizimana2.id,
        firstName: 'GEn',
        lastName: 'Agarwal',
        },
        {
        user: hakizimana3.id,
        firstName: 'GEn',
        lastName: 'Agarwal',
        },
        {
        user: hakizimana4.id,
        firstName: 'Alan',
        lastName: 'Agarwal',
        },
        {
        user: hakizimana5.id,
        firstName: 'Hakizimana',
        lastName: 'Dev',
        },
        {
        user: hakizimana6.id,
        firstName: 'Hakizimana',
        lastName: 'Dev',
        },
        {
        user: hakizimana7.id,
        firstName: 'Hakizimana',
        lastName: 'Dev',
        },
        {
        user: hakizimana8.id,
        firstName: 'Hakizimana',
        lastName: 'Dev',
        },
        {
        user: hakizimana9.id,
        firstName: 'Hakizimana',
        lastName: 'Dev',
        },
        {
        user: hakizimana10.id,
        firstName: 'Hakizimana',
        lastName: 'Dev',
        },
        {
        user: cyanzayire.id,
        firstName: 'cyanzayire',
        lastName: 'Dev',
        },
        {
        user: cyanzayire1.id,
        firstName: 'cyanzayire',
        lastName: 'Dev',
        },
        {
        user: hakizumwami1.id,
        firstName: 'cyanzayire',
        lastName: 'Dev',
        },
  ];
  await Profile.deleteMany({});
  await Profile.insertMany(profiles);

  return null;
};
export default seedUsers;
