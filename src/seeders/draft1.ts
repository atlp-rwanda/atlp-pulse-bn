// {
//     user: byiza6.id,
//     firstName: 'Ubute',
//     lastName: 'Dior',
//   },

//   {
//     user: byiza.id,
//     firstName: 'Byiza',
//     lastName: 'Serge',
//   },

//   {
//     user: byizaa.id,
//     firstName: 'Byizanye',
//     lastName: 'Samuel',
//   },
//   {
//     user: byiza1.id,
//     firstName: 'Uwera',
//     lastName: 'Sarah',
//   },
//   {
//     user: byiza2.id,
//     firstName: 'Uwayo',
//     lastName: 'Serge',
//   },
//   {
//     user: byiza3.id,
//     firstName: 'Berabose',
//     lastName: 'None',
//   },

//   {
//     user: byiza5.id,
//     firstName: 'Abayo',
//     lastName: 'Dodos',
//   },



//   {
//     email: 'byiza@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Irembo'],
//   },
//   {
//     email: 'byiza1@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Kist 2'],
//   },
//   {
//     email: 'byiza2@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Kist 3'],
//   },
//   {
//     email: 'byiza3@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Irembo'],
//   },
//   {
//     email: 'byiza4@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Kist 2'],
//   },
//   {
//     email: 'byiza5@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Kist 3'],
//   },
//   {
//     email: 'byiza6@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Irembo'],
//   },
//   {
//     email: 'byiza7@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Kist 2'],
//   },
//   {
//     email: 'byiza7@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Kist 3'],
//   },
//   {
//     email: 'byiza8@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Kist 2'],
//   },
//   {
//     email: 'byizaa@pulse.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Kist 3'],
//   },

//   {
//     email: 'umuhoza@mail.com',
//     password: hashSync('Andela123'),
//     role: 'user',
//     organizations: ['Kist 2'],
//   },
//   const byiza: any = await User.findOne({ email: 'byiza@gmail.com' });
//   const byiza1: any = await User.findOne({ email: 'byiza1@gmail.com' });
//   const byiza2: any = await User.findOne({ email: 'byiza2@gmail.com' });
//   const byiza3: any = await User.findOne({ email: 'byiza3@gmail.com' });
//   const byiza4: any = await User.findOne({ email: 'byiza4@gmail.com' });
//   const byiza5: any = await User.findOne({ email: 'byiza5@gmail.com' });
//   const byiza6: any = await User.findOne({ email: 'byiza6@gmail.com' });
//   const byiza7: any = await User.findOne({ email: 'byiza7@gmail.com' });
//   const byiza8: any = await User.findOne({ email: 'byiza8@gmail.com' });
//   const byiza9: any = await User.findOne({ email: 'byiza9@gmail.com' });
//   const byizaa: any = await User.findOne({ email: 'byizaa@gmail.com' });

//   {
//     user: byiza7.id,
//     firstName: 'Sano',
//     lastName: 'Serge',
//   },    {
//     user: byiza8.id,
//     firstName: 'Moses',
//     lastName: 'Surgen',
//   },
//   {
//     user: byiza9.id,
//     firstName: 'Didas',
//     lastName: 'Mboze',
//   },




//   {
//     user: byiza4.id,
//     firstName: 'Byishimbo',
//     lastName: 'Beoulla',
//   },
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
      email: 'admin3@devpulse.co',
      password: hashSync('Andela123'),
      role: 'admin',
      organizations: ['Irembo'],
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
      email: 'manager3@devpulse.co',
      password: hashSync('Andela123'),
      role: 'manager',
      organizations: ['Irembo'],
    },

    {
      email: 'manager4@devpulse.co',
      password: hashSync('Andela123'),
      role: 'manager',
      organizations: ['Irembo'],
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
      email: 'coordinator2@devpulse.co',
      password: hashSync('Andela123'),
      role: 'coordinator',
      organizations: ['Irembo'],
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

   
 
    // {
    //   email: 'emile@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'emile1@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'ineza@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'emile2@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'emile3@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'emile4@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

   



   
    // {
    //   email: 'uwineza@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'jose@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

    // {
    //   email: 'kamana@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

    // {
    //   email: 'hatanga@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

    // {
    //   email: 'richard@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

    // {
    //   email: 'japhet@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },


    // {
    //   email: 'jules@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

    // {
    //   email: 'vanessa@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

    // {
    //   email: 'claudine@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

    // {
    //   email: 'uwimana@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

    // {
    //   email: 'esther@gmail.com',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },


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

      
    //     {
    //       email: 'umuhoza@mail.com',
    //       password: hashSync('Andela123'),
    //       role: 'user',
    //       organizations: ['Irembo'],
    //     },


    // {
    //   email: 'iranzi@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },

    // {
    //   email: 'irabona@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'irahareba@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'iradukunda@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'iratuzi@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'irahari@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'izabikora@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'irabigena@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'iraturinze@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'iradufite@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'ira@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'irambona@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email: 'iratuyobora@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
 
    // {
    //   email: 'irahatubera@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },
    // {
    //   email:'irabikunze@pulse.co',
    //   password: hashSync('Andela123'),
    //   role: 'user',
    //   organizations: ['Irembo'],
    // },



    {
      email:'umukundwa@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email:'bajonge@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email:'mbera@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email:'witonze@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email:'zawadi@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email:'sogori@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email:'kanyama@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email:'murera@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email:'cedric@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email:'mubyeyi@devpulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },



    

  ];
  await User.deleteMany({});
  await User.insertMany(users);

  const superAdmin: any = await User.findOne({
    email: 'superadmin@devpulse.co',
  });
  const admin: any = await User.findOne({ email: 'admin@devpulse.co' });
  const admin2: any = await User.findOne({ email: 'admin2@devpulse.co' });
  const admin3: any = await User.findOne({ email: 'admin3@devpulse.co' });
  const manager: any = await User.findOne({ email: 'manager@devpulse.co' });
  const manager2: any = await User.findOne({ email: 'manager2@devpulse.co' });
  const manager3: any = await User.findOne({ email: 'manager3@devpulse.co' });
  const manager4: any = await User.findOne({ email: 'manager4@devpulse.co' });
  const coordinator: any = await User.findOne({
    email: 'coordinator@devpulse.co',
  });
  const coordinator2: any = await User.findOne({
    email: 'coordinator2@devpulse.co',
  });

  const trainee: any = await User.findOne({ email: 'trainee@devpulse.com' });
  const trainee2: any = await User.findOne({ email: 'trainee1@pulse.com' });
  const trainee3: any = await User.findOne({ email: 'trainee2@pulse.com' });
  const trainee4: any = await User.findOne({ email: 'trainee4@pulse.com' });








  const james: any = await User.findOne({ email: 'james@gmail.com' });
  const peter: any = await User.findOne({ email: 'peter@pulse.com' });
  const john: any = await User.findOne({ email: 'john@pulse.com' });






  const zawadi: any  = await User.findOne({ email: 'zawadi@devpulse.co' });
  const kanyama: any  = await User.findOne({ email: 'kanyama@devpulse.co' });
  const sogori: any  = await User.findOne({ email: 'sogori@devpulse.co' });
  const murera: any  = await User.findOne({ email: 'murera@devpulse.co' });
  const cedric: any  = await User.findOne({ email: 'cedric@devpulse.co' });
  const mubyeyi: any  = await User.findOne({ email: 'mubyeyi@devpulse.co' });
  const witonze: any  = await User.findOne({ email: 'witonze@devpulse.co' });
  const mbera: any  = await User.findOne({ email: 'mbera@devpulse.co' });
  const bajonge: any  = await User.findOne({ email: 'bajonge@devpulse.co' });
  // const umukundwa: any  = await User.findOne({ email: 'umukundwa@devpulse.co' });


  const profiles = [

    {
      user: zawadi.id,
      firstName: 'Niyo',
      lastName: 'Zawadi',
    },
    {
      user: kanyama.id,
      firstName: 'Kanyamanza',
      lastName: 'Ben',
    },
    {
      user: sogori.id,
      firstName: 'Sogori',
      lastName: 'Aime',
    },
    {
      user: murera.id,
      firstName: 'Murera',
      lastName: 'Kanyanza',
    },
    {
      user: cedric.id,
      firstName: 'Dukundane',
      lastName: 'Cedric',
    },
    {
      user: mubyeyi.id,
      firstName: 'Mubyeyi',
      lastName: 'Sylivia',
    },
    {
      user: witonze.id,
      firstName: 'Witonze',
      lastName: 'Kazungu',
    },
    {
      user: mbera.id,
      firstName: 'Mbera',
      lastName: 'Matius',
    },
    {
      user: bajonge.id,
      firstName: 'Bajonge',
      lastName: 'Silas',
    },
    {
      user: umukundwa.id,
      firstName: 'Umukundwa',
      lastName: 'Emerance',
    },


    


//   {
//     user: byiza4.id,
//     firstName: 'Byishimbo',
//     lastName: 'Beoulla',
//   },

 

 







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
      firstName: 'Alain',
      lastName: 'Claude',
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
      firstName: 'Charlotte',
      lastName: 'Byiringiro',
    },
    {
      user: manager4.id,
      firstName: 'Zaytzeff',
      lastName: 'Amani',
    },
    {
      user: coordinator.id,
      firstName: 'Yvonne',
      lastName: 'Mbabazi',
    },
    {
      user: coordinator2.id,
      firstName: 'Humura',
      lastName: 'Sarah',
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



// {
//     name: 'Irembo',
//     description: 'Organization for Irembo',
//     admin: admin[2]._id,
//     },






  