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
      organizations: ['Kist 1'],
    },
    {
      email: 'admin4@devpulse.co',
      password: hashSync('Andela123'),
      role: 'admin',
      organizations: ['Kist 2'],
    },
    {
      email: 'admin5@devpulse.co',
      password: hashSync('Andela123'),
      role: 'admin',
      organizations: ['Kist 3'],
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
      email: 'biganiro@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'biganiro1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'biganiro2@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'biganiro3@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'biganiro4@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'biganiro5@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'biganiro6@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'biganiro7@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'biganiro8@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'biganiro9@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },




    {
      email: 'thierry@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'thierry1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'thierry2@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'thierry3@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'thierry4@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'thierry5@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'thierry6@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'thierr7y@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'thierry8@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'thierry9@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'emile@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'emile1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'emile2@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'emile3@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'emile4@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'himbaza@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },

    {
      email: 'himbaza1@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },

    {
      email: 'himbaza2@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'himbaza3@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'himbaza4@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'himbaza5@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'himbaz6@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'himbaza7@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'himbaza8@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'himbaza9@andela.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },



    {
      email: 'byiza@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'byiza1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'byiza2@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'byiza3@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'byiza4@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'byiza5@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'byiza6@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'byiza7@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'byiza7@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'byiza8@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'byizaa@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },

    {
      email: 'umuhoza@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'umuhoza1@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'umuhoza2@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'umuhoza3@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },,
    {
      email: 'umuhoza4@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'umuhoza5@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'umuhoza6@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'umuhoza7@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'umuhoza8@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'umuhoza9@mail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },



    {
      email: 'biganiro@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'uwineza@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'jose@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },

    {
      email: 'kamana@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },

    {
      email: 'hatanga@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },

    {
      email: 'richard@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },

    {
      email: 'japhet@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },


    {
      email: 'jules@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },

    {
      email: 'vanessa@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },

    {
      email: 'claudine@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },

    {
      email: 'uwimana@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },

    {
      email: 'esther@gmail.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
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
      email: 'ishimwe@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist1'],
    },
    {
      email: 'ishimwe1@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'ishimwe2@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'ishimwe3@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'ishimwe4@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'ishimwe5@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'ishimwe6@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'ishimwe7@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'ishimwe8@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'ishimwe9@pulse.com',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },







    {
      email: 'iranzi@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },

    {
      email: 'irabona@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'irahareba@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'iradukunda@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'iratuzi@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'irahari@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'izabikora@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'irabigena@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'iraturinze@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'iradufite@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email: 'ira@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email: 'irambona@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email: 'iratuyobora@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
 
    {
      email: 'irahatubera@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email:'irabikunze@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },



    {
      email:'umukundwa@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email:'bajonge@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email:'mbera@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email:'witonze@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email:'zawadi@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email:'sogori@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email:'kanyama@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
    },
    {
      email:'murera@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 2'],
    },
    {
      email:'cedric@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 3'],
    },
    {
      email:'mubyeyi@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Kist 1'],
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
  const admin4: any = await User.findOne({ email: 'admin4@devpulse.co' });
  const admin5: any = await User.findOne({ email: 'admin5@devpulse.co' });
  const manager: any = await User.findOne({ email: 'manager@devpulse.co' });
  const manager2: any = await User.findOne({ email: 'manager2@devpulse.co' });
  const coordinator: any = await User.findOne({
    email: 'coordinator@devpulse.co',
  });
  const trainee: any = await User.findOne({ email: 'trainee@devpulse.com' });
  const trainee2: any = await User.findOne({ email: 'trainee1@pulse.com' });
  const trainee3: any = await User.findOne({ email: 'trainee2@pulse.com' });
  const trainee4: any = await User.findOne({ email: 'trainee3@pulse.com' });

  const trainee10: any = await User.findOne({ email: 'umuhoza@mail.com' });
  const trainee11: any = await User.findOne({ email: 'umuhoza1@mail.com' });
  const trainee12: any = await User.findOne({ email: 'umuhoza2@mail.com' });
  const trainee13: any = await User.findOne({ email: 'umuhoza3@mail.com' });
  const trainee14: any = await User.findOne({ email: 'umuhoza4@mail.com' });
  const trainee15: any = await User.findOne({ email: 'umuhoza4@mail.com' });
  const trainee16: any = await User.findOne({ email: 'umuhoza6@mail.com' });
  const trainee17: any = await User.findOne({ email: 'umuhoza7@mail.com' });
  const trainee18: any = await User.findOne({ email: 'umuhoza8@mail.com' });
  const trainee19: any = await User.findOne({ email: 'umuhoza9@mail.com' });

  const ishimwe: any = await User.findOne({ email: 'ishimwe@pulse.com' });
  const ishimwe1: any = await User.findOne({ email: 'ishimwe1@pulse.com' });
  const ishimwe2: any = await User.findOne({ email: 'ishimwe2@pulse.com' });
  const ishimwe3: any = await User.findOne({ email: 'ishimwe3@pulse.com' });
  const ishimwe4: any = await User.findOne({ email: 'ishimwe4@pulse.com' });
  const ishimwe5: any = await User.findOne({ email: 'ishimwe5@pulse.com' });
  const ishimwe6: any = await User.findOne({ email: 'ishimwe6@pulse.com' });
  const ishimwe7: any = await User.findOne({ email: 'ishimwe7@pulse.com' });
  const ishimwe8: any = await User.findOne({ email: 'ishimwe8@pulse.com' });
  const ishimwe9: any = await User.findOne({ email: 'ishimwe9@pulse.com' });

  const himbaza: any = await User.findOne({ email: 'himbaza@pulse.co' });
  const himbaza1: any = await User.findOne({ email: 'himbaza1@pulse.co' });
  const himbaza2: any = await User.findOne({ email: 'himbaza2@pulse.co' });
  const himbaza3: any = await User.findOne({ email: 'himbaza3@pulse.co' });
  const himbaza4: any = await User.findOne({ email: 'himbaza4@pulse.co' });
  const himbaza5: any = await User.findOne({ email: 'himbaza5@pulse.co' });
  const himbaza6: any = await User.findOne({ email: 'himbaza6@pulse.co' });
  const himbaza7: any = await User.findOne({ email: 'himbaza7@pulse.co' });
  const himbaza8: any = await User.findOne({ email: 'himbaza8@pulse.co' });
  const himbaza9: any = await User.findOne({ email: 'himbaza9@pulse.co' });
  const thierry: any = await User.findOne({ email: 'thierry@pulse.co' });
  const thierry1: any = await User.findOne({ email: 'thierry1@pulse.co' });
  const thierry2: any = await User.findOne({ email: 'thierry2@pulse.co' });
  const thierry3: any = await User.findOne({ email: 'thierry3@pulse.co' });
  const thierry4: any = await User.findOne({ email: 'thierry4@pulse.co' });
  const thierry5: any = await User.findOne({ email: 'thierry5@pulse.co' });
  const thierry6: any = await User.findOne({ email: 'thierry6@pulse.co' });
  const thierry7: any = await User.findOne({ email: 'thierry7@pulse.co' });
  const thierry8: any = await User.findOne({ email: 'thierry8@pulse.co' });
  const thierry9: any = await User.findOne({ email: 'thierry9@pulse.co' });

  const esther: any = await User.findOne({ email: 'esther@gmail.com' });
  const uwimana: any = await User.findOne({ email: 'uwimana@gmail.com' });
  const claudine: any = await User.findOne({ email: 'claudine@gmail.com' });
  const richard: any = await User.findOne({ email: 'richard@gmail.com' });
  const japhet: any = await User.findOne({ email: 'japhet@gmail.com' });
  const vanessa: any = await User.findOne({ email: 'vanessa@gmail.com' });
  const jules: any = await User.findOne({ email: 'jules@gmail.com' });
  const hatanga: any = await User.findOne({ email: 'hatanga@gmail.com' });
  const kamana: any = await User.findOne({ email: 'kamana@gmail.com' });
  const jose: any = await User.findOne({ email: 'jose@gmail.com' });
  const uwineza: any = await User.findOne({ email: 'uwineza@gmail.com' });
  const biganiro: any = await User.findOne({ email: 'biganiro@gmail.com' });

  const byiza: any = await User.findOne({ email: 'byiza@gmail.com' });
  const byiza1: any = await User.findOne({ email: 'byiza1@gmail.com' });
  const byiza2: any = await User.findOne({ email: 'byiza2@gmail.com' });
  const byiza3: any = await User.findOne({ email: 'byiza3@gmail.com' });
  const byiza4: any = await User.findOne({ email: 'byiza4@gmail.com' });
  const byiza5: any = await User.findOne({ email: 'byiza5@gmail.com' });
  const byiza6: any = await User.findOne({ email: 'byiza6@gmail.com' });
  const byiza7: any = await User.findOne({ email: 'byiza7@gmail.com' });
  const byiza8: any = await User.findOne({ email: 'byiza8@gmail.com' });
  const byiza9: any = await User.findOne({ email: 'byiza9@gmail.com' });
  const byizaa: any = await User.findOne({ email: 'byizaa@gmail.com' });
  
  const emile: any = await User.findOne({ email: 'emile@pulse.co' });
  const emile1: any = await User.findOne({ email: 'emile@pulse.co' });
  const emile2: any = await User.findOne({ email: 'emile@pulse.co' });
  const emile3: any = await User.findOne({ email: 'emile@pulse.co' });
  const emile4: any = await User.findOne({ email: 'emile@pulse.co' });
  const james: any = await User.findOne({ email: 'james@gmail.com' });
  const peter: any = await User.findOne({ email: 'peter@pulse.com' });
  const john: any = await User.findOne({ email: 'john@pulse.com' });

  const ira: any = await User.findOne({ email: 'ira@pulse.co' });
  const irabigena: any = await User.findOne({ email: 'irabigena@pulse.co' });
  const iraturinze: any = await User.findOne({ email: 'iraturinze@pulse.co' });
  const iratuyobora: any = await User.findOne({ email: 'iratuyobora@pulse.co' });
  const irabikunze: any = await User.findOne({ email: 'irabikunze@pulse.co' });
  const iratuzi: any = await User.findOne({ email: 'iratuzi@pulse.co' });
  const iranzi: any = await User.findOne({ email: 'iranzi@pulse.co' });
  const irabona: any = await User.findOne({ email: 'irabona@pulse.co' });
  const izabikora: any = await User.findOne({ email: 'izabikora@pulse.co' });
  const iradufite: any = await User.findOne({ email: 'iradufite@pulse.co' });
  const iradukunda: any = await User.findOne({ email: 'iradukunda@pulse.co' });
  const irambona: any = await User.findOne({ email: 'irambona@pulse.co' });
  const irahari: any = await User.findOne({ email: 'irahari@pulse.co' });
  const Ineza: any = await User.findOne({ email: 'ineza@pulse.co' });
  const zawadi: any  = await User.findOne({ email: 'zawadi@devpulse.co' });
  const kanyama: any  = await User.findOne({ email: 'kanyama@devpulse.co' });
  const sogori: any  = await User.findOne({ email: 'sogori@devpulse.co' });
  const murera: any  = await User.findOne({ email: 'murera@devpulse.co' });
  const cedric: any  = await User.findOne({ email: 'cedric@devpulse.co' });
  const mubyeyi: any  = await User.findOne({ email: 'mubyeyi@devpulse.co' });
  const witonze: any  = await User.findOne({ email: 'witonze@devpulse.co' });
  const mbera: any  = await User.findOne({ email: 'mbera@devpulse.co' });
  const bajonge: any  = await User.findOne({ email: 'bajonge@devpulse.co' });
  const umukundwa: any  = await User.findOne({ email: 'umukundwa@devpulse.co' });

  const irahareba: any = await User.findOne({ email: 'irahareba@pulse.co' });
  const biganiroo: any = await User.findOne({ email: 'biganiro@pulse.com' });
  const biganiro1: any = await User.findOne({ email: 'biganiro1@pulse.com' });
  const biganiro2: any = await User.findOne({ email: 'biganiro2@pulse.com' });
  const biganiro3: any = await User.findOne({ email: 'biganiro3@pulse.com' });
  const biganiro4: any = await User.findOne({ email: 'biganiro4@pulse.com' });
  const biganiro5: any = await User.findOne({ email: 'biganiro5@pulse.com' });
  const biganiro6: any = await User.findOne({ email: 'biganiro6@pulse.com' });
  const biganiro7: any = await User.findOne({ email: 'biganiro7@pulse.com' });
  const biganiro8: any = await User.findOne({ email: 'biganiro8@pulse.com' });
  const biganiro9: any = await User.findOne({ email: 'biganiro9@pulse.com' });
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
    {
      user: biganiroo.id,
      firstName: 'Biga',
      lastName: 'boran',
    },
    {
      user: biganiro1.id,
      firstName: 'Bigabi',
      lastName: 'busmatti',
    },
    {
      user: biganiro2.id,
      firstName: 'Bisuma',
      lastName: 'Bughtii',
    },
    {
      user: biganiro3.id,
      firstName: 'Ishimwe',
      lastName: 'Amathi',
    },

    {
      user: biganiro4.id,
      firstName: 'Biscu',
      lastName: 'Moses',
    },
    {
      user: biganiro5.id,
      firstName: 'Birimatti',
      lastName: 'Mussa',
    },
    {
      user: biganiro6.id,
      firstName: 'Mukamusoni',
      lastName: 'Baughaa',
    },

    {
      user: biganiro7.id,
      firstName: 'Monnii',
      lastName: 'Muraghti',
    },

    {
      user: biganiro8.id,
      firstName: 'Monique',
      lastName: 'Miraba',
    },
    {
      user: biganiro9.id,
      firstName: 'Mositti',
      lastName: 'Mattuidi',
    },

    {
      user: irahareba.id,
      firstName: 'Irahareba',
      lastName: 'Munic',
    },
    {
      user: Ineza.id,
      firstName: 'Ineza',
      lastName: 'Balgal',
    },
    {
      user: irahari.id,
      firstName: 'Irahari',
      lastName: 'Monic',
    },
    {
      user: irambona.id,
      firstName: 'Irambona',
      lastName: 'Fulgence',
    },
    {
      user: iradukunda.id,
      firstName: 'Iradukunda',
      lastName: 'Phocas',
    },
    {
      user: iradufite.id,
      firstName: 'Iradufite',
      lastName: 'MEnghi',
    },
    {
      user: izabikora.id,
      firstName: 'Izabikora',
      lastName: 'Bugha',
    },
    {
      user: irabona.id,
      firstName: 'Irabona',
      lastName: 'Onole',
    },
    {
      user: iranzi.id,
      firstName: 'Iranze',
      lastName: 'Alga',
    },
    {
      user: iratuzi.id,
      firstName: 'Iratuzi',
      lastName: 'Muhil',
    },
    {
      user: irabikunze.id,
      firstName: 'Irabikunze',
      lastName: 'aime',
    },
    {
      user: ira.id,
      firstName: 'Ira',
      lastName: 'Ogaa',
    },



    {
      user: thierry.id,
      firstName: 'Thierry',
      lastName: 'Bahanda',
    }, {
      user: thierry1.id,
      firstName: 'Thierry',
      lastName: 'Bahanda',
    }, {
      user: thierry2.id,
      firstName: 'Titi',
      lastName: 'Bosco',
    }, {
      user: thierry3.id,
      firstName: 'Turibo',
      lastName: 'Tina',
    }, {
      user: thierry4.id,
      firstName: 'Bisizo',
      lastName: 'Tortoe',
    },
    {
      user: emile.id,
      firstName: 'Emile',
      lastName: 'Claude',
    },
    {
      user: emile1.id,
      firstName: 'Dukundimana',
      lastName: 'Aime',
    },
    {
      user: emile2.id,
      firstName: 'Muhoza',
      lastName: 'Aimable',
    },
    {
      user: emile3.id,
      firstName: 'Manifasha',
      lastName: 'Claude',
    },
    {
      user: emile4.id,
      firstName: 'Mukamana',
      lastName: 'Claude',
    },
    {
      user: irabigena.id,
      firstName: 'Irabigena',
      lastName: 'Bunary',
    },
    {
      user: iraturinze.id,
      firstName: 'Iraturinzze',
      lastName: 'Boss',
    },

    {
      user: iratuyobora.id,
      firstName: 'Iratuyobora',
      lastName: 'Alga',
    },

    {
      user: byiza7.id,
      firstName: 'Sano',
      lastName: 'Serge',
    },    {
      user: byiza8.id,
      firstName: 'Moses',
      lastName: 'Surgen',
    },
    {
      user: byiza9.id,
      firstName: 'Didas',
      lastName: 'Mboze',
    },
    {
      user: thierry5.id,
      firstName: 'Birabwa',
      lastName: 'Turthy',
    }, {
      user: thierry6.id,
      firstName: 'Mingi',
      lastName: 'Thiany',
    }, {
      user: thierry7.id,
      firstName: 'Beza',
      lastName: 'Alphonse',
    }, {
      user: thierry8.id,
      firstName: 'Toefel',
      lastName: 'Baruma',
    }, {
      user: thierry9.id,
      firstName: 'Tutu',
      lastName: 'Bisoso',
    },
    {
      user: byiza5.id,
      firstName: 'Abayo',
      lastName: 'Dodos',
    },
    {
      user: byiza6.id,
      firstName: 'Ubute',
      lastName: 'Dior',
    },

    {
      user: byiza.id,
      firstName: 'Byiza',
      lastName: 'Serge',
    },

    {
      user: byizaa.id,
      firstName: 'Byizanye',
      lastName: 'Samuel',
    },
    {
      user: byiza1.id,
      firstName: 'Uwera',
      lastName: 'Sarah',
    },
    {
      user: byiza2.id,
      firstName: 'Uwayo',
      lastName: 'Serge',
    },
    {
      user: byiza3.id,
      firstName: 'Berabose',
      lastName: 'None',
    },




    {
      user: jose.id,
      firstName: 'jose',
      lastName: 'Umwari',
    },
    {
    user: biganiro.id,
    firstName: 'biganiro',
    lastName: 'Olivier',
  },
  {
  user: uwineza.id,
  firstName: 'Uwineza',
  lastName: 'Joyce',
},

    {
      user: vanessa.id,
      firstName: 'Vanessa',
      lastName: 'KAbanyna',
    },
    {
    user: jules.id,
    firstName: 'Jules',
    lastName: 'Uwimana',
  },
  {
  user: hatanga.id,
  firstName: 'Hatanga',
  lastName: 'Emmy',
},
{
user: kamana.id,
firstName: 'kamana',
lastName: 'Claude',
},


{
  user: byiza4.id,
  firstName: 'Byishimbo',
  lastName: 'Beoulla',
},

{
  user: himbaza.id,
  firstName: 'himbaza',
  lastName: 'alain',
  },


{
  user: himbaza1.id,
  firstName: 'alain',
  lastName: 'dukunde',
  },


{
  user: himbaza2.id,
  firstName: 'nola',
  lastName: 'nola',
  },


{
  user: himbaza3.id,
  firstName: 'bikori',
  lastName: 'claude',
  },



{
  user: himbaza4.id,
  firstName: 'uwayenga',
  lastName: 'Claude',
  },

{
  user: himbaza5.id,
  firstName: 'Manishimwe',
  lastName: 'jean',
  },


{
  user: himbaza6.id,
  firstName: 'Sura',
  lastName: 'Bonneur',
  },


{
  user: himbaza7.id,
  firstName: 'Liberata',
  lastName: 'Asia',
  },


{
  user: himbaza8.id,
  firstName: 'Eval',
  lastName: 'Wagara',
  },



{
  user: himbaza9.id,
  firstName: 'Patox',
  lastName: 'Ishimwe',
  },


    {
      user: esther.id,
      firstName: 'Uwizeye',
      lastName: 'Esther',
    }, 
      {
      user: uwimana.id,
      firstName: 'Uwimana',
      lastName: 'Emeline',
    },
    {
   user: claudine.id,
    firstName: 'Umutoni',
    lastName: 'Claudine',
  },
  {
  user: richard.id,
  firstName: 'richard',
  lastName: 'Abayizer',
},
{
user: japhet.id,
firstName: 'Japhet',
lastName: 'Habayo',
},



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
      user: admin4.id,
      firstName: 'Aime',
      lastName: 'Paul',
    },
    {
      user: admin5.id,
      firstName: 'Simba',
      lastName: 'Orgene',
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
      user: ishimwe.id,
      firstName: 'Ishimwe',
      lastName: 'Aime',
    },
    {
      user: ishimwe1.id,
      firstName: 'Ishimwe',
      lastName: 'Aliance',
    },
    {
      user: ishimwe2.id,
      firstName: 'Ishimwe',
      lastName: 'Louise',
    },
    {
      user: ishimwe3.id,
      firstName: 'Ubwiza',
      lastName: 'Claudette',
    },
    {
      user: ishimwe4.id,
      firstName: 'Kayitesi',
      lastName: 'Aime',
    },
    {
      user: ishimwe5.id,
      firstName: 'Umuhoza',
      lastName: 'Charly',
    },
    {
      user: ishimwe6.id,
      firstName: 'Tumukunde',
      lastName: 'Aime',
    },
    {
      user: ishimwe7.id,
      firstName: 'Umutoni',
      lastName: 'Alice',
    },
    {
      user: trainee10.id,
      firstName: 'Mukamusoni',
      lastName: 'Lorance',
    },
    {
      user: trainee11.id,
      firstName: 'Ineza',
      lastName: 'Bonnifilde',
    },
    {
      user: trainee12.id,
      firstName: 'Nishimwe',
      lastName: 'Grace',
    },
    {
      user: trainee13.id,
      firstName: 'Ubutesi',
      lastName: 'Mornille',
    },
    {
      user: trainee14.id,
      firstName: 'Abayo',
      lastName: 'Emerance',
    },
    {
      user: trainee15.id,
      firstName: 'Ubukijije',
      lastName: 'Alua',
    },
    {
      user: trainee16.id,
      firstName: 'Amata',
      lastName: 'Hotrance',
    },
    {
      user: trainee17.id,
      firstName: 'Ubwiza',
      lastName: 'Bobo',
    },
    {
      user: trainee18.id,
      firstName: 'Uwera',
      lastName: 'Emma',
    },
    {
      user: trainee19.id,
      firstName: 'Umutoni',
      lastName: 'Epa',
    },

    {
      user: ishimwe8.id,
      firstName: 'Tuyishime',
      lastName: 'Bosco',
    },
    {
      user: ishimwe9.id,
      firstName: 'Ishimwe',
      lastName: 'Josue',
    },
  ];
  await Profile.deleteMany({});
  await Profile.insertMany(profiles);

  return null;
};
export default seedUsers;
