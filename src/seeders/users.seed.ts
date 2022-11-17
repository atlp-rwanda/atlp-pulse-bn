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
  const coordinator10: any = await User.findOne({
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
  const karimba: any = await User.findOne({ email: 'bettttyy19@brainly.tech' });
  const karimbavianney: any = await User.findOne({
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
