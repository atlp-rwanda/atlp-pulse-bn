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
            email: 'admin@irembo.com',
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
            email: 'manager@mtn.com',
            password: hashSync('Andela123'),
            role: 'manager',
            organizations: ['MTN'],
        },
        {
            email: 'manager@irembo.com',
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
            email: 'coordinator@mtn.com',
            password: hashSync('Andela123'),
            role: 'coordinator',
            organizations: ['organization 2'],
        },
        {
            email: 'coordinator@irembo.com',
            password: hashSync('Andela123'),
            role: 'coordinator',
            organizations: ['Irembo'],
        },
        {
            email: 'coordinator2@irembo.com',
            password: hashSync('Andela123'),
            role: 'coordinator',
            organizations: ['Irembo'],
        },
        {
            email: 'coordinator3@irembo.com',
            password: hashSync('Andela123'),
            role: 'coordinator',
            organizations: ['Irembo'],
        },
        {
            email: 'coordinator4@irembo.com',
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
        {
            email: 'james@gmail.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Andela'],
        },
        





        {
          email: 'iranzi@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
        {
          email: 'irabona@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'irahareba@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'iradukunda@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'iratuzi@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'irahari@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'izabikora@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'irabigena@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'iraturinze@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'iradufite@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'ira@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'irambona@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'iratuyobora@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
     
        {
          email: 'irahatubera@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email:'irabikunze@pulse.co',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
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

        {
            email: 'justin@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'justin12@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'justin123@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'justin1234@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
           
      {
        email: 'byiza@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byiza1@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byiza2@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byiza3@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byiza4@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byiza5@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byiza6@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byiza7@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byiza8@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byiza9@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
      {
        email: 'byizaa@pulse.com',
        password: hashSync('Andela123'),
        role: 'user',
        organizations: ['Irembo'],
      },
         
    {
      email: 'emile@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email: 'emile1@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email: 'ineza@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email: 'emile2@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email: 'emile3@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
    {
      email: 'emile4@pulse.co',
      password: hashSync('Andela123'),
      role: 'user',
      organizations: ['Irembo'],
    },
        {
            email: 'justin5@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'keyi@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'keyi12@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'keyi123@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'keyi1234@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'keyi5@irembo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'tamm22@twitch.work',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'lybra008@gmailvn.net',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'fridrih6767@statemother.us',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'dacaying@statemother.us',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'tolikmeshkov@tehsisri.email',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'katemoor@tehsisri.email',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'lukshorn@arasempire.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: '10119106@nouraproperty.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'sofashkz@mailpluss.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },

        {
            email: 'binu023@pianoxltd.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'dragi@gmailni.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'sergeimodnyi@flimty-slim.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'vesnin3@pusatinfokita.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'kabinchi@frepsalan.store',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'mirteg@bukan.es',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'glimmertwin@dmxs8.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'kdgyq@hobbyperfect.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'katsuminagumo@ballenas.info',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
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
          organizations: ['Irembo'],
        },
        {
          email: 'ishimwe2@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'ishimwe3@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
    email: 'biganiro@gmail.com',
    password: hashSync('Andela123'),
    role: 'user',
    organizations: ['Irembo'],
  },
        {
          email: 'ishimwe4@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
      
        {
          email: 'ishimwe6@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'ishimwe7@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'ishimwe8@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'ishimwe9@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },


  
        {
          email: 'uwineza@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'jose@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
        {
          email: 'kamana@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro1@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro2@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro3@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro4@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro5@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro6@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro7@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro8@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
        {
          email: 'biganiro9@pulse.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
        {
          email: 'hatanga@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
        {
          email: 'richard@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
        {
          email: 'japhet@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
    
        {
          email: 'jules@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
        {
          email: 'vanessa@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
        {
          email: 'claudine@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
        {
          email: 'uwimana@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },
    
        {
          email: 'esther@gmail.com',
          password: hashSync('Andela123'),
          role: 'user',
          organizations: ['Irembo'],
        },









        {
            email: 'jxurok2006@vs-neustift.de',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
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
        {
            email: 'juddcmillman@mothermonth.us',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'nshavel1987@tubidu.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'ovleva@king.buzz',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'tylenol7@mailcuk.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'ktutylfq@disipulo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'goldielockx78@hitbase.net',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'colindie@24hinbox.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'vicpp@luddo.me',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'zhurgenbaeval@ebarg.net',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'yrabovhis@hitbase.net',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'claussmil@getcashstash.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'vuilyubomir@joeneo.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'lelolo@mobilebankapp.org',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'patovirta@andreicutie.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'vovadzy@emvil.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'den17081996@hitbase.net',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'serg1sin@pianoxltd.com',
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
    const admin3: any = await User.findOne({ email: 'admin@mtn.com' });
    const adminIrembo: any = await User.findOne({ email: 'admin@irembo.com' });
    const admin4: any = await User.findOne({ email: 'admin3@devpulse.co' });
    const manager: any = await User.findOne({ email: 'manager@devpulse.co' });
    const manager3: any = await User.findOne({ email: 'manager2@devpulse.co' });
    const manager4: any = await User.findOne({ email: 'manager3@devpulse.co' });
    const manager2: any = await User.findOne({ email: 'manager@mtn.com' });
    const managerIrembo: any = await User.findOne({ email: 'manager@irembo.com' });
    const coordinator: any = await User.findOne({
        email: 'coordinator@devpulse.co',
    });
    const coordinator1: any = await User.findOne({
        email: 'coordinator1@devpulse.co',
    });
    const coordinator2: any = await User.findOne({
        email: 'coordinator@mtn.com',
    });
    const coordinatorIrembo: any = await User.findOne({
        email: 'coordinator@irembo.com',
    });
    const coordinator2Irembo: any = await User.findOne({
        email: 'coordinator2@irembo.com',
    });
    const coordinator3Irembo: any = await User.findOne({
        email: 'coordinator3@irembo.com',
    });
    const coordinator4Irembo: any = await User.findOne({
        email: 'coordinator4@irembo.com',
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

    const justin: any = await User.findOne({ email: 'justin@irembo.com' });
    const justin12: any = await User.findOne({ email: 'justin12@irembo.com' });
    const justin123: any = await User.findOne({ email: 'justin123@irembo.com' });
    const justin1234: any = await User.findOne({ email: 'justin1234@irembo.com' });
    const justin5: any = await User.findOne({ email: 'justin5@irembo.com' });
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
    const biganiro: any = await User.findOne({ email: 'biganiro@gmail.com' });
    const uwineza: any = await User.findOne({ email: 'uwineza@gmail.com' });
const ishimwe: any = await User.findOne({ email: 'ishimwe@pulse.com' });
const ishimwe1: any = await User.findOne({ email: 'ishimwe1@pulse.com' });
const ishimwe2: any = await User.findOne({ email: 'ishimwe2@pulse.com' });
const ishimwe3: any = await User.findOne({ email: 'ishimwe3@pulse.com' });
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
const ishimwe4: any = await User.findOne({ email: 'ishimwe4@pulse.com' });
const ishimwe6: any = await User.findOne({ email: 'ishimwe6@pulse.com' });
const ishimwe7: any = await User.findOne({ email: 'ishimwe7@pulse.com' });
const ishimwe8: any = await User.findOne({ email: 'ishimwe8@pulse.com' });
const ishimwe9: any = await User.findOne({ email: 'ishimwe9@pulse.com' });

    const keyi: any = await User.findOne({ email: 'keyi@irembo.com' });
    const keyi12: any = await User.findOne({ email: 'keyi12@irembo.com' });
    const keyi123: any = await User.findOne({ email: 'keyi123@irembo.com' });
    const keyi1234: any = await User.findOne({ email: 'keyi1234@irembo.com' });
    const keyi5: any = await User.findOne({ email: 'keyi5@irembo.com' });

    const mamy: any = await User.findOne({ email: 'tamm22@twitch.work' })
    const mamy1: any = await User.findOne({ email: 'lybra008@gmailvn.net' })
    const mamy2: any = await User.findOne({ email: 'fridrih6767@statemother.us' })
    const mamy3: any = await User.findOne({ email: 'dacaying@statemother.us' })
    const mamy4: any = await User.findOne({ email: 'tolikmeshkov@tehsisri.email' })
    const mamy5: any = await User.findOne({ email: 'katemoor@tehsisri.email' })
    const mamy6: any = await User.findOne({ email: 'lukshorn@arasempire.com' })
    const mamy7: any = await User.findOne({ email: '10119106@nouraproperty.com' })
    const mamy8: any = await User.findOne({ email: 'sofashkz@mailpluss.com' })

    const petero: any = await User.findOne({ email: 'binu023@pianoxltd.com' })
    const petero1: any = await User.findOne({ email: 'dragi@gmailni.com' })
    const petero2: any = await User.findOne({ email: 'sergeimodnyi@flimty-slim.com' })
    const petero3: any = await User.findOne({ email: 'vesnin3@pusatinfokita.com' })
    const petero4: any = await User.findOne({ email: 'kabinchi@frepsalan.store' })
    const petero5: any = await User.findOne({ email: 'mirteg@bukan.es' })
    const petero6: any = await User.findOne({ email: 'glimmertwin@dmxs8.com' })
    const petero7: any = await User.findOne({ email: 'kdgyq@hobbyperfect.com' })
    const petero8: any = await User.findOne({ email: 'katsuminagumo@ballenas.info' })
    const petero9: any = await User.findOne({ email: 'jxurok2006@vs-neustift.de' })

    const ira: any = await User.findOne({ email: 'ira@pulse.co' });
    const irabigena: any = await User.findOne({ email: 'irabigena@pulse.co' });
    const iraturinze: any = await User.findOne({ email: 'iraturinze@pulse.co' });
    const iratuyobora: any = await User.findOne({ email: 'iratuyobora@pulse.co' });
    const irabikunze: any = await User.findOne({ email: 'irabikunze@pulse.co' });
    const iratuzi: any = await User.findOne({ email: 'iratuzi@pulse.co' });
    const iranzi: any = await User.findOne({ email: 'iranzi@pulse.co' });
    const irabona: any = await User.findOne({ email: 'irabona@pulse.co' });
    const irahareba: any = await User.findOne({ email: 'irahareba@pulse.co' });
    const irahatubera: any = await User.findOne({ email: 'irahatubera@pulse.co' });
    const izabikora: any = await User.findOne({ email: 'izabikora@pulse.co' });
    const iradufite: any = await User.findOne({ email: 'iradufite@pulse.co' });
    const iradukunda: any = await User.findOne({ email: 'iradukunda@pulse.co' });
    const irambona: any = await User.findOne({ email: 'irambona@pulse.co' });
    const irahari: any = await User.findOne({ email: 'irahari@pulse.co' });


  const byiza: any = await User.findOne({ email: 'byiza@pulse.com' });
  const byiza1: any = await User.findOne({ email: 'byiza1@pulse.com' });
  const byiza2: any = await User.findOne({ email: 'byiza2@pulse.com' });
  const byiza3: any = await User.findOne({ email: 'byiza3@pulse.com' });
  const byiza4: any = await User.findOne({ email: 'byiza4@pulse.com' });
  const byiza5: any = await User.findOne({ email: 'byiza5@pulse.com' });
  const byiza6: any = await User.findOne({ email: 'byiza6@pulse.com' });
  const byiza7: any = await User.findOne({ email: 'byiza7@pulse.com' });
  const byiza8: any = await User.findOne({ email: 'byiza8@pulse.com' });
  const byiza9: any = await User.findOne({ email: 'byiza9@pulse.com' });
  const byizaa: any = await User.findOne({ email: 'byizaa@pulse.com' });
    const emile: any = await User.findOne({ email: 'emile@pulse.co' });
    const emile1: any = await User.findOne({ email: 'emile1@pulse.co' });
    const emile2: any = await User.findOne({ email: 'emile2@pulse.co' });
    const emile3: any = await User.findOne({ email: 'emile3@pulse.co' });
    const emile4: any = await User.findOne({ email: 'emile4@pulse.co' });

    const konze: any = await User.findOne({ email: 'juddcmillman@mothermonth.us' })
    const konze1: any = await User.findOne({ email: 'nshavel1987@tubidu.com' })
    const konze2: any = await User.findOne({ email: 'ovleva@king.buzz' })
    const konze3: any = await User.findOne({ email: 'tylenol7@mailcuk.com' })
    const konze4: any = await User.findOne({ email: 'ktutylfq@disipulo.com' })
    const konze5: any = await User.findOne({ email: 'goldielockx78@hitbase.net' })
    const konze6: any = await User.findOne({ email: 'colindie@24hinbox.com' })
    const bigg: any = await User.findOne({ email: 'vicpp@luddo.me' })
  const Ineza: any = await User.findOne({ email: 'ineza@pulse.co' });
    const bigg1: any = await User.findOne({ email: 'zhurgenbaeval@ebarg.net' })
    const bigg2: any = await User.findOne({ email: 'yrabovhis@hitbase.net' })
    const bigg3: any = await User.findOne({ email: 'claussmil@getcashstash.com' })
    const bigg4: any = await User.findOne({ email: 'vuilyubomir@joeneo.com' })
    const bigg5: any = await User.findOne({ email: 'lelolo@mobilebankapp.org' })
    const bigg6: any = await User.findOne({ email: 'patovirta@andreicutie.com' })
    const bigg7: any = await User.findOne({ email: 'den17081996@hitbase.net' })
    const bigg8: any = await User.findOne({ email: 'serg1sin@pianoxltd.com' })

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
            user: adminIrembo.id,
            firstName: 'Admin',
            lastName: 'Irembo',
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
            user: managerIrembo.id,
            firstName: 'Manager',
            lastName: 'Irembo',
        },
        {
            user: manager4.id,
            firstName: 'Zaytzeff',
            lastName: 'Org 3',
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
      user: jose.id,
      firstName: 'jose',
      lastName: 'Umwari',
    },
   
  {
  user: uwineza.id,
  firstName: 'Uwineza',
  lastName: 'Joyce',
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
  firstName: 'biganiro',
  lastName: 'Olivier',
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
  user: biganiro.id,
  firstName: 'Diana',
  lastName: 'Muhire',
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
  lastName: 'Abayizera',
},
{
user: japhet.id,
firstName: 'Japhet',
lastName: 'Habayo',
},

    {
      user: Ineza.id,
      firstName: 'Ineza',
      lastName: 'Balgal',
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
            user: coordinatorIrembo.id,
            firstName: 'coordinator',
            lastName: 'Irembo',
        },
        {
            user: coordinator2Irembo.id,
            firstName: 'coordinator',
            lastName: 'Irembo',
        },
        {
            user: coordinator3Irembo.id,
            firstName: 'coordinator',
            lastName: 'Irembo',
        },
        {
          user: irahareba.id,
          firstName: 'Irahareba',
          lastName: 'Munic',
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
          user: irahatubera.id,
          firstName: 'Biganiro',
          lastName: 'Ira',
        },

    
    
        {
            user: coordinator4Irembo.id,
            firstName: 'coordinator',
            lastName: 'Irembo',
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
            firstName: 'jutty',
            lastName: 'Agarwal',
        },

        {
            user: justin.id,
            firstName: 'James',
            lastName: 'Agjutty',
        },
        {
            user: justin12.id,
            firstName: 'James',
            lastName: 'Agarwal',
        },
        {
            user: justin123.id,
            firstName: 'jutty',
            lastName: 'Agarwal',
        },
        {
            user: justin1234.id,
            firstName: 'Jhuj',
            lastName: 'Agarwal',
        },
        {
            user: justin5.id,
            firstName: 'James',
            lastName: 'Agjutty',
        },
        {
            user: keyi.id,
            firstName: 'James',
            lastName: 'Agjutty',
        },
        {
            user: keyi12.id,
            firstName: 'James',
            lastName: 'Agarwal',
        },
        {
            user: keyi123.id,
            firstName: 'jutty',
            lastName: 'Agarwal',
        },
        {
            user: keyi1234.id,
            firstName: 'Jhuj',
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
          user: ishimwe8.id,
          firstName: 'Tuyishime',
          lastName: 'Bosco',
        },
        {
          user: ishimwe9.id,
          firstName: 'Ishimwe',
          lastName: 'Josue',
        },
        {
            user: keyi5.id,
            firstName: 'James',
            lastName: 'Agjutty',
        },
        {
            user: mamy.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: mamy1.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: mamy2.id,
            firstName: 'bruno',
            lastName: 'keety',
        },

{
  user: byiza6.id,
  firstName: 'Ubute',
  lastName: 'Dior',
},
{
  user: byiza4.id,
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
  user: byiza5.id,
  firstName: 'Abayo',
  lastName: 'Dodos',
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
            user: mamy3.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: mamy4.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: mamy5.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: mamy6.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: mamy7.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: mamy8.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero1.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero2.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero3.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero4.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero5.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero6.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero7.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero8.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: petero9.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        {
            user: konze.id,
            firstName: 'Fatty',
            lastName: 'Bonny',
        },
        {
            user: konze1.id,
            firstName: 'Boy',
            lastName: 'Agaarwal',
        },
        {
            user: konze2.id,
            firstName: 'Ketty',
            lastName: 'Pere',
        },
        {
            user: konze3.id,
            firstName: 'Steven',
            lastName: 'Mbosso',
        },
        {
            user: konze4.id,
            firstName: 'Process',
            lastName: 'kano',
        },
        {
            user: konze5.id,
            firstName: 'agape',
            lastName: 'Atoy',
        },
        {
            user: konze6.id,
            firstName: 'moses',
            lastName: 'M',
        },
        {
            user: bigg.id,
            firstName: 'Peter',
            lastName: 'Mico',
        },
        {
            user: bigg1.id,
            firstName: 'Irembo',
            lastName: 'Gary',
        },
        {
            user: bigg2.id,
            firstName: 'Tipee',
            lastName: 'Hon',
        },
        {
            user: bigg3.id,
            firstName: 'Vite',
            lastName: 'Title',
        },
        {
            user: bigg4.id,
            firstName: 'Jimes',
            lastName: 'Happy',
        },
        {
            user: bigg5.id,
            firstName: 'Happy',
            lastName: 'Agaarwal',
        },
        {
            user: bigg6.id,
            firstName: 'Moon',
            lastName: 'Jay',
        },
        {
            user: bigg7.id,
            firstName: 'Hello',
            lastName: 'Boom',
        },
        {
            user: bigg8.id,
            firstName: 'bruno',
            lastName: 'keety',
        },
        
    ];
    await Profile.deleteMany({});
    await Profile.insertMany(profiles);

    return null;
};
export default seedUsers;
