import { hashSync } from 'bcryptjs';
import { User, Profile } from '../models/user';

const seedUsers = async () => {
  const users = [
    {
      email: 'superadmin@devpulse.co',
      password: hashSync('Brainly123'),
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
      email: 'coordinator@irembo.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['Irembo']
    },
    {
      email: 'coordinator2@irembo.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['Irembo']
    },
    {
      email: 'coordinator3@irembo.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['Irembo']
    },
    {
      email: 'coordinator4@irembo.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['Irembo']
    },
    {
      email: 'coordinator@mtn.com',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['MTN']
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
      email: 'james@brainly.tech',
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

    
    {
      email: 'admin@brainly.co',
      password: hashSync('Brainly123'),
      role: 'admin',
      organizations: ['Brainly'],
    },
    {
      email: 'admin2@brainly.co',
      password: hashSync('Brainly123'),
      role: 'admin',
      organizations: ['Brainly'],
    },
    {
      email: 'manager@brainly.co',
      password: hashSync('Andela123'),
      role: 'manager',
      organizations: ['Brainly'],
    },
    {
      email: 'manager2@brainly.co',
      password: hashSync('Brainly123'),
      role: 'manager',
      organizations: ['Brainly'],
    },
    {
      email: 'coordinator@brainly.co',
      password: hashSync('brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'coordinator1@brainly.co',
      password: hashSync('Brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'trainee@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'user',
      organizations: ['Brainly'],
    },
    {
      email: 'trainee1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'user',
      organizations: ['Brainly'],
    },
    {
      email: 'trainee2@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'user',
      organizations: ['Brainly'],
    },
    {
      email: 'trainee3@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'user',
      organizations: ['Brainly'],
    },
    {
      email: 'james@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'user',
      organizations: ['Brainly'],
    },
    {
      email: 'peter@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'user',
      organizations: ['Brainly'],
    },
    {
      email: 'john@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'user',
      organizations: ['Brainly'],
    },
    {
      email: 'fanny@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'delice@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'admin',
      organizations: ['Brainly'],
    },
    {
      email: 'abijuru@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'admin',
      organizations: ['Brainly'],
    },
    {
      email: 'sam123@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'admin',
      organizations: ['Brainly'],
    },
    {
      email: 'samusoni@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'admin',
      organizations: ['Brainly'],
    },
    {
      email: 'samusoni1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'manager',
      organizations: ['Brainly'],
    },
    {
      email: 'samusoni10@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'manager',
      organizations: ['Brainly'],
    },
    {
      email: 'sonia10@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'manager',
      organizations: ['Brainly'],
    },
    {
      email: 'sonia1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'manager',
      organizations: ['Brainly'],
    },
    {
      email: 'sonia001@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'sonyy@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'sonyy1234@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'sinaaa@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'sinaapia@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'susanapia@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'susanapia1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'susanaa1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'coordinator',
      organizations: ['Brainly'],
    },
    {
      email: 'susanaa1009@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'susanaa109@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'nanaa109@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'nanaa1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'nanaa19@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'tessa19@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'tessaoyaa@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'tessaoya@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'tesaoya@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'teta@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'tetabella@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'tetabella01@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'tetabella1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'tetabetty@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'tetabetty1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'sistetabetty1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'sistetabetty@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'sisbetty@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'betty@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'betty1@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'betty11@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'betty12@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'betty14@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'bett14@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'bett19@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },

    {
      email: 'bettttyy19@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Kalisamayoo@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Kalisamay9oo@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Kalisamayo09@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Kalisamayo709@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Kalisam09@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Kalisam00@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Kalim00@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },

    {
      email: 'ngona@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'ngona8@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Celine2@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Celine3@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Celine4@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Celine5@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Celine6@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Celine7@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Celinejean@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Celinejohn@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Musoni@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'Musonijohn@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'pepper@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'pepperalla@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'pepperallasiyaa@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'pallilon@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'pallilon.on@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'pallilon.on.oi@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'belise@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'belise900@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'belise90@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },

    {
      email: 'dieudonedrink@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mikedieudone@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'milestonedieudone@pulse.com',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'davedieudone@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'dieudonedimtri@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'dieudonehelper@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'dannyclug@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'dieudonechang@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'dieudonechen@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'eliowalker@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'eliophilip@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'eliojames@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'elioclavin@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'dimelio@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'eliodest@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'eliopulg@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },

    {
      email: 'mugaboaline@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugaboalain@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugabostani@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugaboMusoni@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugabodestin@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugabophilip@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugabodio123@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugabodivin@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugaboclara@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugabodenys@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'mugaboquerry@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'karekezi@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'karekezideus@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },
    {
      email: 'kezaaabelitrie@brainly.tech',
      password: hashSync('Brainly123'),
      role: 'trainee',
      organizations: ['Brainly'],
    },

  
  


    {
      email: 'coise@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'klay@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'admin',
      organizations: ['Kigalihub'],
    },
    {
      email: 'curry@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'admin',
      organizations: ['Kigalihub'],
    },
    {
      email: 'greendray@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'admin',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bonnieclyde@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'admin',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bonnieclyde1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'manager',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bonnieclyde2@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'manager',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bonnieclyde3@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'manager',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bonnieclyde4@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'manager',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bonnieclyde5@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'coordinator',
      organizations: ['Kigalihub'],
    },
    {
      email: 'byuma@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'coordinator',
      organizations: ['Kigalihub'],
    },
    {
      email: 'byuma01@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'coordinator',
      organizations: ['Kigalihub'],
    },
    {
      email: 'byuma02@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'coordinator',
      organizations: ['Kigalihub'],
    },
    {
      email: 'kanyami@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'coordinator',
      organizations: ['Kigalihub'],
    },
    {
      email: 'kanyami1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'coordinator',
      organizations: ['Kigalihub'],
    },
    {
      email: 'kanyami2@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'coordinator',
      organizations: ['Kigalihub'],
    },
    {
      email: 'kanyami3@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'coordinator',
      organizations: ['Kigalihub'],
    },
    {
      email: 'kanyami4@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'kanyami5@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'boneza@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'boneza1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'boneza2@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'boneza3@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'boneza4@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'kanyamico@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'kanyamico1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'sanomcange@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'sanomcangelos1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'sanomcangelos@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'sanomc@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'sanomcange@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'sanomcangeloss1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'sanomcangeloss@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'sanomcangeloss2@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bjaywaka@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bjaywakaa@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bjaywakaa1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bjaywakaa11@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bjaywakaa12@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bjaywakaa14@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'greatking@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'greatkings@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },

    {
      email: 'greatkings1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'greatkings2@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'wiseman@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'wisemann@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'jordanpoole@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'jordanpoole1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'jordanpoole2@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'jordanpoole3@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },

    {
      email: 'gunnerr@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'gunner@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'gunners@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'gunners1@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'gunners2@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'gunners3@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'gunners4@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'gunners5@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'bencurso@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'rwego@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'rwegoyve@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'rwegoyves@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'rwegamoanos@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'rwegamo@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'rwegorwema@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'sucresmg@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'pato.ui@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'pato.ui.ux@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'chrissucres@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'chrissucremugani@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'chrissucre@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },

    {
      email: 'chrisswalker@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'princeofkigali@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'princeofkigalii@pulse.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'princeofkigalii1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'princeofkigalii2@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'nibyoyva@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'nibyoyvan@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'nibyoyvanov@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'nibyoyvanovic@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'nibyoyvanovico@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'julish@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'julishimwe@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'juxjulish@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'juxjulish1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'juxjulish2@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'juxjulish3@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },

    {
      email: 'julish14@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'julienish14@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'julienish15@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'rwegoyvess@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'julienish16@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'julienish17@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'aldaburume@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'aldaburumee@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'aldaburume1@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'aldaburume2@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'aldaburume3@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'wardell@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'benwhito@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
    },
    {
      email: 'dellcurry@gmail.com',
      password: hashSync('Kigalihub123'),
      role: 'trainee',
      organizations: ['Kigalihub'],
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
  const coordinator: any = await User.findOne({ email: 'coordinator@devpulse.co' });

  const trainee: any = await User.findOne({ email: 'trainee@devpulse.com' });
  const trainee2: any = await User.findOne({ email: 'trainee1@pulse.com' });
  const trainee3: any = await User.findOne({ email: 'trainee2@pulse.com' });
  const trainee4: any = await User.findOne({ email: 'trainee3@pulse.com' });
  const james: any = await User.findOne({ email: 'james@gmail.com' });
  const peter: any = await User.findOne({ email: 'peter@pulse.com' });
  const john: any = await User.findOne({ email: 'john@pulse.com' });


  const test1: any = await User.findOne({ email: 'fanny@gmail.com' });
  const admin4: any = await User.findOne({ email: 'delice@brainly.tech' });
  const admin3: any = await User.findOne({ email: 'abijuru@brainly.tech' });
  const admin5: any = await User.findOne({ email: 'sam123@brainly.tech' });
  const admin6: any = await User.findOne({ email: 'samusoni@brainly.tech' });
  const manager3: any = await User.findOne({ email: 'samusoni1@brainly.tech' });
  const manager4: any = await User.findOne({ email: 'samusoni10@brainly.tech' });
  const manager5: any = await User.findOne({ email: 'sonia10@brainly.tech' });
  const manager6: any = await User.findOne({ email: 'sonia1@brainly.tech' });
  const coordinator3: any = await User.findOne({ email: 'sonia001@brainly.tech' });
  const coordinator4: any = await User.findOne({ email: 'sonyy@brainly.tech' });
  const coordinator5: any = await User.findOne({
    email: 'sonyy1234@brainly.tech',
  });
  const coordinator6: any = await User.findOne({ email: 'sinaaa@brainly.tech' });
  const coordinator7: any = await User.findOne({ email: 'sinaapia@brainly.tech' });
  const coordinator8: any = await User.findOne({
    email: 'susanapia@brainly.tech',
  });
  const coordinator9: any = await User.findOne({
    email: 'susanapia1@brainly.tech',
  });
  const coordinator11: any = await User.findOne({
    email: 'susanaa1@brainly.tech',
  });
  const test2: any = await User.findOne({ email: 'susanaa1009@brainly.tech' });
  const test3: any = await User.findOne({ email: 'susanaa109@brainly.tech' });
  const test4: any = await User.findOne({ email: 'nanaa109@brainly.tech' });
  const test5: any = await User.findOne({ email: 'nanaa1@brainly.tech' });
  const test6: any = await User.findOne({ email: 'nanaa19@brainly.tech' });
  const test7: any = await User.findOne({ email: 'tessa19@brainly.tech' });
  const test8: any = await User.findOne({ email: 'tessaoyaa@brainly.tech' });
  const test9: any = await User.findOne({ email: 'tessaoya@brainly.tech' });
  const test10: any = await User.findOne({ email: 'tesaoya@brainly.tech' });
  const fabrice: any = await User.findOne({ email: 'teta@brainly.tech' });
  const fabricerug: any = await User.findOne({ email: 'tetabella@brainly.tech' });
  const fabricenkuku: any = await User.findOne({
    email: 'tetabella01@brainly.tech',
  });
  const fabricekayi: any = await User.findOne({
    email: 'tetabella1@brainly.tech',
  });
  const rugfabrice: any = await User.findOne({ email: 'tetabetty@brainly.tech' });
  const fabricenziranziza: any = await User.findOne({
    email: 'tetabetty1@brainly.tech',
  });
  const fabricekayitankore: any = await User.findOne({
    email: 'sistetabetty1@brainly.tech',
  });
  const shemankubito: any = await User.findOne({
    email: 'sistetabetty@brainly.tech',
  });
  const shemalucie: any = await User.findOne({ email: 'sisbetty@brainly.tech' });
  const shema: any = await User.findOne({ email: 'betty@brainly.tech' });
  const shemakanyandekwe: any = await User.findOne({
    email: 'betty1@brainly.tech',
  });
  const shemarodri: any = await User.findOne({ email: 'betty11@brainly.tech' });
  const shema1: any = await User.findOne({ email: 'betty12@brainly.tech' });
  const shema2: any = await User.findOne({ email: 'betty14@brainly.tech' });
  const shema3: any = await User.findOne({ email: 'bett14@brainly.tech' });
  const karimb: any = await User.findOne({ email: 'bettttyy19@brainly.tech' });
  const karimbavianne: any = await User.findOne({
    email: 'Kalisamayoo@brainly.tech',
  });
  const karimba1: any = await User.findOne({ email: 'Kalisamay9oo@brainly.tech' });
  const karimbajean: any = await User.findOne({
    email: 'Kalisamayo09@brainly.tech',
  });
  const karimbafiston: any = await User.findOne({
    email: 'Kalisamayo709@brainly.tech',
  });
  const karimbajohn12: any = await User.findOne({
    email: 'Kalisam09@brainly.tech',
  });
  const karimbajohn1: any = await User.findOne({ email: 'Kalim00@brainly.tech' });
  const karimbafiston12: any = await User.findOne({
    email: 'Kalisam00@brainly.tech',
  });
  const Celine: any = await User.findOne({ email: 'ngona@brainly.tech' });
  const Celine1: any = await User.findOne({ email: 'ngona8@brainly.tech' });
  const Celine2: any = await User.findOne({ email: 'Celine2@pulse.com' });
  const Celine3: any = await User.findOne({ email: 'Celine3@pulse.com' });
  const Celine4: any = await User.findOne({ email: 'Celine4@pulse.com' });
  const Celine5: any = await User.findOne({ email: 'Celine5@pulse.com' });
  const Celine6: any = await User.findOne({ email: 'Celine6@pulse.com' });
  const Celine7: any = await User.findOne({ email: 'Celine7@pulse.com' });
  const Celinejean: any = await User.findOne({ email: 'Celinejean@pulse.com' });
  const shemajohn: any = await User.findOne({ email: 'bett19@brainly.tech' });
  const Musoni: any = await User.findOne({ email: 'Musoni@pulse.com' });
  const Musonijohn: any = await User.findOne({ email: 'Musonijohn@pulse.com' });
  const Celinejohn: any = await User.findOne({ email: 'Celinejohn@pulse.com' });
  const pepper: any = await User.findOne({ email: 'pepper@brainly.tech' });
  const pepper1: any = await User.findOne({ email: 'pepperalla@brainly.tech' });
  const pepper2: any = await User.findOne({
    email: 'pepperallasiyaa@brainly.tech',
  });
  const pepper3: any = await User.findOne({ email: 'pallilon@brainly.tech' });
  const pepper4: any = await User.findOne({ email: 'pallilon.on@brainly.tech' });
  const pepper5: any = await User.findOne({
    email: 'pallilon.on.oi@brainly.tech',
  });
  const pepper6: any = await User.findOne({ email: 'belise@brainly.tech' });
  const pepper7: any = await User.findOne({ email: 'belise900@brainly.tech' });
  const pepper8: any = await User.findOne({ email: 'belise90@brainly.tech' });
  const dieudone: any = await User.findOne({
    email: 'dieudonedrink@pulse.com',
  });
  const dieudone1: any = await User.findOne({
    email: 'mikedieudone@pulse.com',
  });
  const dieudone2: any = await User.findOne({
    email: 'milestonedieudone@pulse.com',
  });
  const dieudone3: any = await User.findOne({
    email: 'davedieudone@brainly.tech',
  });
  const dieudone4: any = await User.findOne({
    email: 'dieudonedimtri@brainly.tech',
  });
  const dieudone5: any = await User.findOne({
    email: 'dieudonehelper@brainly.tech',
  });
  const dieudone6: any = await User.findOne({ email: 'dannyclug@brainly.tech' });
  const dieudone7: any = await User.findOne({
    email: 'dieudonechang@brainly.tech',
  });
  const dieudone8: any = await User.findOne({
    email: 'dieudonechen@brainly.tech',
  });
  const elio: any = await User.findOne({ email: 'eliowalker@brainly.tech' });
  const elio1: any = await User.findOne({ email: 'eliophilip@brainly.tech' });
  const elio2: any = await User.findOne({ email: 'eliojames@brainly.tech' });
  const elio3: any = await User.findOne({ email: 'elioclavin@brainly.tech' });
  const elio4: any = await User.findOne({ email: 'dimelio@brainly.tech' });
  const elio5: any = await User.findOne({ email: 'eliodest@brainly.tech' });
  const elio6: any = await User.findOne({ email: 'eliopulg@brainly.tech' });
  const mugabo: any = await User.findOne({ email: 'mugaboaline@brainly.tech' });
  const mugabo1: any = await User.findOne({ email: 'mugaboalain@brainly.tech' });
  const mugabo2: any = await User.findOne({ email: 'mugabostani@brainly.tech' });
  const mugabo3: any = await User.findOne({
    email: 'mugaboMusoni@brainly.tech',
  });
  const mugabo4: any = await User.findOne({
    email: 'mugabodestin@brainly.tech',
  });
  const mugabo5: any = await User.findOne({
    email: 'mugabophilip@brainly.tech',
  });
  const mugabo6: any = await User.findOne({
    email: 'mugabodio123@brainly.tech',
  });
  const mugabo7: any = await User.findOne({ email: 'mugabodivin@brainly.tech' });
  const mugabo8: any = await User.findOne({ email: 'mugaboclara@brainly.tech' });
  const mugabo9: any = await User.findOne({ email: 'mugabodenys@brainly.tech' });
  const mugabo10: any = await User.findOne({
    email: 'mugaboquerry@brainly.tech',
  });
  const karekezi: any = await User.findOne({ email: 'karekezi@brainly.tech' });
  const karekezi1: any = await User.findOne({
    email: 'karekezideus@brainly.tech',
  });
  const hakizumwami1: any = await User.findOne({
    email: 'kezaaabelitrie@brainly.tech',
  });


  const done1: any = await User.findOne({ email: 'coise@gmail.com' });
  const adminThree: any = await User.findOne({ email: 'klay@gmail.com' });
  const adminFour: any = await User.findOne({ email: 'curry@gmail.com' });
  const adminFive: any = await User.findOne({ email: 'greendray@gmail.com' });
  const adminSix: any = await User.findOne({ email: 'bonnieclyde@gmail.com' });
  const managerThree: any = await User.findOne({ email: 'bonnieclyde1@gmail.com' });
  const managerFour: any = await User.findOne({ email: 'bonnieclyde2@gmail.com' });
  const managerFive: any = await User.findOne({ email: 'bonnieclyde3 @gmail.com' });
  const managerSix: any = await User.findOne({ email: 'bonnieclyde3 @gmail.com' });
  const coordinatorThree: any = await User.findOne({ email: 'bonnieclyde5@gmail.com' });
  const coordinatorFour: any = await User.findOne({ email: 'byuma@gmail.com' });
  const coordinatorFive: any = await User.findOne({
    email: 'byuma01@gmail.com',
  });
  const coordinatorSix: any = await User.findOne({ email: 'byuma02@gmail.com' });
  const coordinatorSev: any = await User.findOne({ email: 'kanyami@gmail.com' });
  const coordinatorEig: any = await User.findOne({
    email: 'kanyami1@gmail.com',
  });
  const coordinatorNin: any = await User.findOne({
    email: 'kanyami2@gmail.com',
  });
  const coordinator10: any = await User.findOne({
    email: 'kanyami3@gmail.com',
  });
  const done2: any = await User.findOne({ email: 'kanyami4@gmail.com' });
  const done3: any = await User.findOne({ email: 'kanyami5@gmail.com' });
  const done4: any = await User.findOne({ email: 'boneza@gmail.com' });
  const done5: any = await User.findOne({ email: 'boneza1@gmail.com' });
  const done6: any = await User.findOne({ email: 'boneza2@gmail.com' });
  const done7: any = await User.findOne({ email: 'boneza3@gmail.com' });
  const done8: any = await User.findOne({ email: 'boneza4@gmail.com' });
  const done9: any = await User.findOne({ email: 'kanyamico@gmail.com' });
  const done10: any = await User.findOne({ email: 'kanyamico1@gmail.com' });
  const macAngelos: any = await User.findOne({ email: 'sanomcange@gmail.com' });
  const macAngelos2: any = await User.findOne({ email: 'sanomcangelos1@gmail.com' });
  const macAngelos3: any = await User.findOne({
    email: 'sanomcangelos@gmail.com',
  });
  const macAngelos4: any = await User.findOne({
    email: 'sanomc@gmail.com',
  });
  const macAngelos5: any = await User.findOne({ email: 'sanomcange@gmail.com' });
  const macAngelos6: any = await User.findOne({
    email: 'sanomcangeloss1@gmail.com',
  });
  const macAngelos7: any = await User.findOne({
    email: 'sanomcangeloss@gmail.com',
  });
  const macAngelos8: any = await User.findOne({
    email: 'sanomcangeloss2@gmail.com',
  });
  const bjayziri: any = await User.findOne({ email: 'bjaywaka@gmail.com' });
  const bjayziri1: any = await User.findOne({ email: 'bjaywakaa@gmail.com' });
  const bjayziri2: any = await User.findOne({
    email: 'bjaywakaa1@gmail.com',
  });
  const bjayziri3: any = await User.findOne({ email: 'bjaywakaa11@gmail.com' });
  const bjayziri4: any = await User.findOne({ email: 'bjaywakaa12@gmail.com' });
  const bjayziri5: any = await User.findOne({ email: 'bjaywakaa14@gmail.com' });
  const great: any = await User.findOne({ email: 'greatking@gmail.com' });
  const karimba: any = await User.findOne({ email: 'greatkings1@gmail.com' });
  const karimbavianney: any = await User.findOne({
    email: 'greatkings2@gmail.com',
  });
  const greatkakaaas: any = await User.findOne({ email: 'wiseman@gmail.com' });
  const greatkakaaa: any = await User.findOne({
    email: 'wisemann@gmail.com',
  });
  const greatkakaa: any = await User.findOne({
    email: 'jordanpoole@gmail.com',
  });
  const greatkaka: any = await User.findOne({
    email: 'jordanpoole1@gmail.com',
  });
  const greatkaka1: any = await User.findOne({ email: 'jordanpoole3@gmail.com' });
  const greatkakas: any = await User.findOne({
    email: 'jordanpoole2@gmail.com',
  });
  const gunner: any = await User.findOne({ email: 'gunnerr@gmail.com' });
  const gunner1: any = await User.findOne({ email: 'gunner@gmail.com' });
  const gunners: any = await User.findOne({ email: 'gunners@pulse.com' });
  const gunners1: any = await User.findOne({ email: 'gunners1@pulse.com' });
  const gunners2: any = await User.findOne({ email: 'gunners2@pulse.com' });
  const gunners3: any = await User.findOne({ email: 'gunners3@pulse.com' });
  const gunners4: any = await User.findOne({ email: 'gunners4@pulse.com' });
  const gunners5: any = await User.findOne({ email: 'gunners5@pulse.com' });
  const bencurso: any = await User.findOne({ email: 'bencurso@pulse.com' });
  const bjayzirijohn: any = await User.findOne({ email: 'greatkings@gmail.com' });
  const rwegoyve: any = await User.findOne({ email: 'rwegoyve@pulse.com' });
  const rwegoyves: any = await User.findOne({ email: 'rwegoyves@pulse.com' });
  const rwego: any = await User.findOne({ email: 'rwego@pulse.com' });
  const sucres: any = await User.findOne({ email: 'rwegamoanos@gmail.com' });
  const sucres1: any = await User.findOne({ email: 'rwegamo@gmail.com' });
  const sucres2: any = await User.findOne({
    email: 'rwegorwema@gmail.com',
  });
  const sucres3: any = await User.findOne({ email: 'sucresmg@gmail.com' });
  const sucres4: any = await User.findOne({ email: 'pato.ui@gmail.com' });
  const sucres5: any = await User.findOne({
    email: 'pato.ui.ux@gmail.com',
  });
  const sucres6: any = await User.findOne({ email: 'chrissucres@gmail.com' });
  const sucres7: any = await User.findOne({ email: 'chrissucremugani@gmail.com' });
  const sucres8: any = await User.findOne({ email: 'chrissucre@gmail.com' });
  const princeniby: any = await User.findOne({
    email: 'chrisswalker@pulse.com',
  });
  const princeniby1: any = await User.findOne({
    email: 'princeofkigali@pulse.com',
  });
  const princeniby2: any = await User.findOne({
    email: 'princeofkigalii@pulse.com',
  });
  const princeniby3: any = await User.findOne({
    email: 'princeofkigalii1@gmail.com',
  });
  const princeniby4: any = await User.findOne({
    email: 'princeofkigalii2@gmail.com',
  });
  const princeniby5: any = await User.findOne({
    email: 'nibyoyva@gmail.com',
  });
  const princeniby6: any = await User.findOne({ email: 'nibyoyvan@gmail.com' });
  const princeniby7: any = await User.findOne({
    email: 'nibyoyvanov@gmail.com',
  });
  const princeniby8: any = await User.findOne({
    email: 'nibyoyvanovic@gmail.com',
  });
  const uno: any = await User.findOne({ email: 'nibyoyvanovico@gmail.com' });
  const uno1: any = await User.findOne({ email: 'julish@gmail.com' });
  const uno2: any = await User.findOne({ email: 'julishimwe@gmail.com' });
  const uno3: any = await User.findOne({ email: 'juxjulish@gmail.com' });
  const uno4: any = await User.findOne({ email: 'juxjulish1@gmail.com' });
  const uno5: any = await User.findOne({ email: 'juxjulish2@gmail.com' });
  const uno6: any = await User.findOne({ email: 'juxjulish3@gmail.com' });
  const didasmb: any = await User.findOne({ email: 'julish14@gmail.com' });
  const didasmb1: any = await User.findOne({ email: 'julienish14@gmail.com' });
  const didasmb2: any = await User.findOne({ email: 'julienish15@gmail.com' });
  const didasmb3: any = await User.findOne({
    email: 'rwegoyvess@gmail.com',
  });
  const didasmb4: any = await User.findOne({
    email: 'julienish16@gmail.com',
  });
  const didasmb5: any = await User.findOne({
    email: 'julienish17@gmail.com',
  });
  const didasmb6: any = await User.findOne({
    email: 'aldaburume@gmail.com',
  });
  const didasmb7: any = await User.findOne({ email: 'aldaburumee@gmail.com' });
  const didasmb8: any = await User.findOne({ email: 'aldaburume1@gmail.com' });
  const didasmb9: any = await User.findOne({ email: 'aldaburume2@gmail.com' });
  const didasmb10: any = await User.findOne({
    email: 'aldaburume3@gmail.com',
  });
  const wardell: any = await User.findOne({ email: 'wardell@gmail.com' });
  const benwhito: any = await User.findOne({
    email: 'benwhito@gmail.com',
  });
  const dellcurry: any = await User.findOne({
    email: 'dellcurry@gmail.com',
  });

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
      lastName: 'Kwanda',
    },
    

    {
      user: done1.id,
      firstName: 'Gary',
      lastName: 'Mukasa',
    },
    {
      user: adminThree.id,
      firstName: 'Mike',
      lastName: 'Akello',
    },
    {
      user: adminFour.id,
      firstName: 'Steven',
      lastName: 'Mugabo',
    },
    {
      user: adminFive.id,
      firstName: 'Charlotte',
      lastName: 'Byiringiro',
    },
    {
      user: adminSix.id,
      firstName: 'Zaytzeff',
      lastName: 'Amani',
    },
    {
      user: managerThree.id,
      firstName: 'Yvonne',
      lastName: 'Mbabazi',
    },
    {
      user: managerFour.id,
      firstName: 'John',
      lastName: 'Birungi',
    },
    {
      user: managerFive.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: managerSix.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: coordinatorThree.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: coordinatorFour.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: coordinatorFive.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: coordinatorSix.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },

    {
      user: done2.id,
      firstName: 'Gary',
      lastName: 'Mukasa',
    },
    {
      user: done3.id,
      firstName: 'Mike',
      lastName: 'Akello',
    },
    {
      user: done4.id,
      firstName: 'Steven',
      lastName: 'Mugabo',
    },
    {
      user: done5.id,
      firstName: 'Charlotte',
      lastName: 'Byiringiro',
    },
    {
      user: done6.id,
      firstName: 'Zaytzeff',
      lastName: 'Amani',
    },
    {
      user: done7.id,
      firstName: 'Yvonne',
      lastName: 'Mbabazi',
    },
    {
      user: done8.id,
      firstName: 'John',
      lastName: 'Birungi',
    },
    {
      user: done9.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: done10.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: macAngelos.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: macAngelos2.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: macAngelos3.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: macAngelos4.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },

    {
      user: macAngelos5.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: macAngelos6.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: macAngelos7.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: macAngelos8.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },
    {
      user: bjayziri.id,
      firstName: 'Gary',
      lastName: 'Mukasa',
    },
    {
      user: bjayziri1.id,
      firstName: 'Gary',
      lastName: 'Mukasa',
    },
    {
      user: bjayziri2.id,
      firstName: 'Mike',
      lastName: 'Akello',
    },
    {
      user: bjayziri3.id,
      firstName: 'Steven',
      lastName: 'Mugabo',
    },
    {
      user: bjayziri4.id,
      firstName: 'Charlotte',
      lastName: 'Byiringiro',
    },
    {
      user: bjayziri5.id,
      firstName: 'Zaytzeff',
      lastName: 'Amani',
    },
    {
      user: great.id,
      firstName: 'Yvonne',
      lastName: 'Mbabazi',
    },
    {
      user: karimba.id,
      firstName: 'John',
      lastName: 'Birungi',
    },
    {
      user: karimbavianne.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: greatkakaaas.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: greatkakaaa.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: greatkakaa.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: greatkaka.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: greatkaka1.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },

    {
      user: greatkakas.id,
      firstName: 'Steven',
      lastName: 'Mugabo',
    },
    {
      user: gunner.id,
      firstName: 'Charlotte',
      lastName: 'Byiringiro',
    },
    {
      user: gunner1.id,
      firstName: 'Zaytzeff',
      lastName: 'Amani',
    },
    {
      user: gunners.id,
      firstName: 'Yvonne',
      lastName: 'Mbabazi',
    },
    {
      user: gunners1.id,
      firstName: 'John',
      lastName: 'Birungi',
    },
    {
      user: gunners2.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: gunners3.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: gunners4.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: gunners5.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: bencurso.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: bjayzirijohn.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },
    {
      user: rwegoyve.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },
    {
      user: rwegoyves.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },
    {
      user: rwego.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },

    {
      user: sucres.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: sucres1.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: sucres2.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: sucres3.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: sucres4.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: sucres5.id,
      firstName: 'Rshyaka',
      lastName: 'Kwanda',
    },
    {
      user: sucres6.id,
      firstName: 'Rshyaka',
      lastName: 'Kwanda',
    },
    {
      user: sucres7.id,
      firstName: 'Rshyaka',
      lastName: 'Kwanda',
    },
    {
      user: sucres8.id,
      firstName: 'sucres',
      lastName: 'Kwanda',
    },

    {
      user: princeniby.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },
    {
      user: princeniby1.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },
    {
      user: princeniby2.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },
    {
      user: princeniby3.id,
      firstName: 'James',
      lastName: 'Kwanda',
    },

    {
      user: princeniby4.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: princeniby5.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: princeniby6.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: princeniby7.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: princeniby8.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: uno.id,
      firstName: 'Rshyaka',
      lastName: 'Kwanda',
    },
    {
      user: uno1.id,
      firstName: 'Rshyaka',
      lastName: 'Kwanda',
    },
    {
      user: uno2.id,
      firstName: 'Rshyaka',
      lastName: 'Kwanda',
    },
    {
      user: uno3.id,
      firstName: 'uno',
      lastName: 'Kwanda',
    },
    {
      user: uno4.id,
      firstName: 'uno',
      lastName: 'Kwanda',
    },
    {
      user: uno5.id,
      firstName: 'uno',
      lastName: 'Kwanda',
    },
    {
      user: uno6.id,
      firstName: 'uno',
      lastName: 'Kwanda',
    },
    {
      user: coordinatorSev.id,
      firstName: 'uno',
      lastName: 'Kwanda',
    },
    {
      user: coordinatorEig.id,
      firstName: 'uno',
      lastName: 'Kwanda',
    },
    {
      user: coordinatorNin.id,
      firstName: 'uno',
      lastName: 'Kwanda',
    },
    {
      user: coordinator11.id,
      firstName: 'uno',
      lastName: 'Kwanda',
    },

    {
      user: didasmb.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: didasmb1.id,
      firstName: 'Rshyaka',
      lastName: 'Kwanda',
    },
    {
      user: didasmb2.id,
      firstName: 'Rshyaka',
      lastName: 'Kwanda',
    },
    {
      user: didasmb3.id,
      firstName: 'Rshyaka',
      lastName: 'Kwanda',
    },
    {
      user: didasmb4.id,
      firstName: 'uno',
      lastName: 'Kwanda',
    },
    {
      user: didasmb5.id,
      firstName: 'didasmb',
      lastName: 'Dev',
    },
    {
      user: didasmb6.id,
      firstName: 'didasmb',
      lastName: 'Dev',
    },
    {
      user: didasmb7.id,
      firstName: 'didasmb',
      lastName: 'Dev',
    },
    {
      user: didasmb8.id,
      firstName: 'didasmb',
      lastName: 'Dev',
    },
    {
      user: didasmb9.id,
      firstName: 'didasmb',
      lastName: 'Dev',
    },
    {
      user: didasmb10.id,
      firstName: 'didasmb',
      lastName: 'Dev',
    },
    {
      user: wardell.id,
      firstName: 'wardell',
      lastName: 'Dev',
    },
    {
      user: benwhito.id,
      firstName: 'wardell',
      lastName: 'Dev',
    },
    {
      user: dellcurry.id,
      firstName: 'wardell',
      lastName: 'Dev',
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
      user: karimb.id,
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
      user: Celine.id,
      firstName: 'Charlotte',
      lastName: 'Byiringiro',
    },
    {
      user: Celine1.id,
      firstName: 'Zaytzeff',
      lastName: 'Amani',
    },
    {
      user: Celine2.id,
      firstName: 'Yvonne',
      lastName: 'Mbabazi',
    },
    {
      user: Celine3.id,
      firstName: 'John',
      lastName: 'Birungi',
    },
    {
      user: Celine4.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: Celine5.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: Celine6.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: Celine7.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: Celinejean.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: shemajohn.id,
      firstName: 'James',
      lastName: 'Agarwal',
    },
    {
      user: Musoni.id,
      firstName: 'James',
      lastName: 'Agarwal',
    },
    {
      user: Musonijohn.id,
      firstName: 'James',
      lastName: 'Agarwal',
    },
    {
      user: Celinejohn.id,
      firstName: 'James',
      lastName: 'Agarwal',
    },

    {
      user: pepper.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: pepper1.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: pepper2.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: pepper3.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: pepper4.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: pepper5.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: pepper6.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: pepper7.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: pepper8.id,
      firstName: 'pepper',
      lastName: 'Agarwal',
    },

    {
      user: dieudone.id,
      firstName: 'James',
      lastName: 'Agarwal',
    },
    {
      user: dieudone1.id,
      firstName: 'James',
      lastName: 'Agarwal',
    },
    {
      user: dieudone2.id,
      firstName: 'James',
      lastName: 'Agarwal',
    },
    {
      user: dieudone3.id,
      firstName: 'James',
      lastName: 'Agarwal',
    },

    {
      user: dieudone4.id,
      firstName: 'Peter',
      lastName: 'Mbonyineza',
    },
    {
      user: dieudone5.id,
      firstName: 'Eric',
      lastName: 'Mugisha',
    },
    {
      user: dieudone6.id,
      firstName: 'Jimmy',
      lastName: 'Obonyo',
    },
    {
      user: dieudone7.id,
      firstName: 'James',
      lastName: 'Kamana',
    },
    {
      user: dieudone8.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: elio.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: elio1.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: elio2.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: elio3.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },
    {
      user: elio4.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },
    {
      user: elio5.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },
    {
      user: elio6.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },
    {
      user: coordinator7.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },
    {
      user: coordinator8.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },
    {
      user: coordinator9.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },
    {
      user: coordinator10.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },

    {
      user: mugabo.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: mugabo1.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: mugabo2.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: mugabo3.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: mugabo4.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },
    {
      user: mugabo5.id,
      firstName: 'mugabo',
      lastName: 'Dev',
    },
    {
      user: mugabo6.id,
      firstName: 'mugabo',
      lastName: 'Dev',
    },
    {
      user: mugabo7.id,
      firstName: 'mugabo',
      lastName: 'Dev',
    },
    {
      user: mugabo8.id,
      firstName: 'mugabo',
      lastName: 'Dev',
    },
    {
      user: mugabo9.id,
      firstName: 'mugabo',
      lastName: 'Dev',
    },
    {
      user: mugabo10.id,
      firstName: 'mugabo',
      lastName: 'Dev',
    },
    {
      user: karekezi.id,
      firstName: 'karekezi',
      lastName: 'Dev',
    },
    {
      user: karekezi1.id,
      firstName: 'karekezi',
      lastName: 'Dev',
    },
    {
      user: hakizumwami1.id,
      firstName: 'karekezi',
      lastName: 'Dev',
    },

    
  ];
  await Profile.deleteMany({});
  await Profile.insertMany(profiles);

  return null;
};
export default seedUsers;