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
      email: 'fanny@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'delice@gmail.com',
      password: hashSync('Google123'),
      role: 'admin',
      organizations: ['Google'],
    },
    {
      email: 'abijuru@gmail.com',
      password: hashSync('Google123'),
      role: 'admin',
      organizations: ['Google'],
    },
    {
      email: 'sam123@gmail.com',
      password: hashSync('Google123'),
      role: 'admin',
      organizations: ['Google'],
    },
    {
      email: 'samusoni@gmail.com',
      password: hashSync('Google123'),
      role: 'admin',
      organizations: ['Google'],
    },
    {
      email: 'samusoni1@gmail.com',
      password: hashSync('Google123'),
      role: 'manager',
      organizations: ['Google'],
    },
    {
      email: 'samusoni10@gmail.com',
      password: hashSync('Google123'),
      role: 'manager',
      organizations: ['Google'],
    },
    {
      email: 'sonia10@gmail.com',
      password: hashSync('Google123'),
      role: 'manager',
      organizations: ['Google'],
    },
    {
      email: 'sonia1@gmail.com',
      password: hashSync('Google123'),
      role: 'manager',
      organizations: ['Google'],
    },
    {
      email: 'sonia001@gmail.com',
      password: hashSync('Google123'),
      role: 'coordinator',
      organizations: ['Google'],
    },
    {
      email: 'sonyy@gmail.com',
      password: hashSync('Google123'),
      role: 'coordinator',
      organizations: ['Google'],
    },
    {
      email: 'sonyy1234@gmail.com',
      password: hashSync('Google123'),
      role: 'coordinator',
      organizations: ['Google'],
    },
    {
      email: 'sinaaa@gmail.com',
      password: hashSync('Google123'),
      role: 'coordinator',
      organizations: ['Google'],
    },
    {
      email: 'sinaapia@gmail.com',
      password: hashSync('Google123'),
      role: 'coordinator',
      organizations: ['Google'],
    },
    {
      email: 'susanapia@gmail.com',
      password: hashSync('Google123'),
      role: 'coordinator',
      organizations: ['Google'],
    },
    {
      email: 'susanapia1@gmail.com',
      password: hashSync('Google123'),
      role: 'coordinator',
      organizations: ['Google'],
    },
    {
      email: 'susanaa1@gmail.com',
      password: hashSync('Google123'),
      role: 'coordinator',
      organizations: ['Google'],
    },
    {
      email: 'susanaa1009@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'susanaa109@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'nanaa109@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'nanaa1@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'nanaa19@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'tessa19@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'tessaoyaa@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'tessaoya@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'tesaoya@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'teta@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'tetabella@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'tetabella01@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'tetabella1@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'tetabetty@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'tetabetty1@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'sistetabetty1@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'sistetabetty@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'sisbetty@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'betty@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'betty1@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'betty11@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'betty12@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'betty14@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'bett14@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'bett19@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },

    {
      email: 'bettttyy19@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Kalisamayoo@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Kalisamay9oo@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Kalisamayo09@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Kalisamayo709@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Kalisam09@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Kalisam00@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Kalim00@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },

    {
      email: 'ngona@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ngona8@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Celine2@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Celine3@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Celine4@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Celine5@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Celine6@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Celine7@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Celinejean@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Celinejohn@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Musoni@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'Musonijohn@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'pepper@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'pepperalla@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'pepperallasiyaa@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'pallilon@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'pallilon.on@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'pallilon.on.oi@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'belise@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'belise900@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'belise90@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },

    {
      email: 'dieudonedrink@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'mikedieudone@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'milestonedieudone@pulse.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'davedieudone@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'dieudonedimtri@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'dieudonehelper@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'dannyclug@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'dieudonechang@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'dieudonechen@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'eliowalker@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'eliophilip@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'eliojames@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'elioclavin@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'dimelio@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'eliodest@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'eliopulg@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },

    {
      email: 'ishimwealine@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimwealain@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimwestani@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimweMusoni@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimwedestin@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimwephilip@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimwedio123@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimwedivin@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimweclara@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimwedenys@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'ishimwequerry@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'karekezi@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'karekezideus@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
    },
    {
      email: 'kezaaabelitrie@gmail.com',
      password: hashSync('Google123'),
      role: 'trainee',
      organizations: ['Google'],
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
  const admin4: any = await User.findOne({ email: 'delice@gmail.com' });
  const admin3: any = await User.findOne({ email: 'abijuru@gmail.com' });
  const admin5: any = await User.findOne({ email: 'sam123@gmail.com' });
  const admin6: any = await User.findOne({ email: 'samusoni@gmail.com' });
  const manager3: any = await User.findOne({ email: 'samusoni1@gmail.com' });
  const manager4: any = await User.findOne({ email: 'samusoni10@gmail.com' });
  const manager5: any = await User.findOne({ email: 'sonia10@gmail.com' });
  const manager6: any = await User.findOne({ email: 'sonia1@gmail.com' });
  const coordinator3: any = await User.findOne({ email: 'sonia001@gmail.com' });
  const coordinator4: any = await User.findOne({ email: 'sonyy@gmail.com' });
  const coordinator5: any = await User.findOne({
    email: 'sonyy1234@gmail.com',
  });
  const coordinator6: any = await User.findOne({ email: 'sinaaa@gmail.com' });
  const coordinator7: any = await User.findOne({ email: 'sinaapia@gmail.com' });
  const coordinator8: any = await User.findOne({
    email: 'susanapia@gmail.com',
  });
  const coordinator9: any = await User.findOne({
    email: 'susanapia1@gmail.com',
  });
  const coordinator10: any = await User.findOne({
    email: 'susanaa1@gmail.com',
  });
  const test2: any = await User.findOne({ email: 'susanaa1009@gmail.com' });
  const test3: any = await User.findOne({ email: 'susanaa109@gmail.com' });
  const test4: any = await User.findOne({ email: 'nanaa109@gmail.com' });
  const test5: any = await User.findOne({ email: 'nanaa1@gmail.com' });
  const test6: any = await User.findOne({ email: 'nanaa19@gmail.com' });
  const test7: any = await User.findOne({ email: 'tessa19@gmail.com' });
  const test8: any = await User.findOne({ email: 'tessaoyaa@gmail.com' });
  const test9: any = await User.findOne({ email: 'tessaoya@gmail.com' });
  const test10: any = await User.findOne({ email: 'tesaoya@gmail.com' });
  const fabrice: any = await User.findOne({ email: 'teta@gmail.com' });
  const fabricerug: any = await User.findOne({ email: 'tetabella@gmail.com' });
  const fabricenkuku: any = await User.findOne({
    email: 'tetabella01@gmail.com',
  });
  const fabricekayi: any = await User.findOne({
    email: 'tetabella1@gmail.com',
  });
  const rugfabrice: any = await User.findOne({ email: 'tetabetty@gmail.com' });
  const fabricenziranziza: any = await User.findOne({
    email: 'tetabetty1@gmail.com',
  });
  const fabricekayitankore: any = await User.findOne({
    email: 'sistetabetty1@gmail.com',
  });
  const shemankubito: any = await User.findOne({
    email: 'sistetabetty@gmail.com',
  });
  const shemalucie: any = await User.findOne({ email: 'sisbetty@gmail.com' });
  const shema: any = await User.findOne({ email: 'betty@gmail.com' });
  const shemakanyandekwe: any = await User.findOne({
    email: 'betty1@gmail.com',
  });
  const shemarodri: any = await User.findOne({ email: 'betty11@gmail.com' });
  const shema1: any = await User.findOne({ email: 'betty12@gmail.com' });
  const shema2: any = await User.findOne({ email: 'betty14@gmail.com' });
  const shema3: any = await User.findOne({ email: 'bett14@gmail.com' });
  const karimba: any = await User.findOne({ email: 'bettttyy19@gmail.com' });
  const karimbavianney: any = await User.findOne({
    email: 'Kalisamayoo@gmail.com',
  });
  const karimba1: any = await User.findOne({ email: 'Kalisamay9oo@gmail.com' });
  const karimbajean: any = await User.findOne({
    email: 'Kalisamayo09@gmail.com',
  });
  const karimbafiston: any = await User.findOne({
    email: 'Kalisamayo709@gmail.com',
  });
  const karimbajohn12: any = await User.findOne({
    email: 'Kalisam09@gmail.com',
  });
  const karimbajohn1: any = await User.findOne({ email: 'Kalim00@gmail.com' });
  const karimbafiston12: any = await User.findOne({
    email: 'Kalisam00@gmail.com',
  });
  const Celine: any = await User.findOne({ email: 'ngona@gmail.com' });
  const Celine1: any = await User.findOne({ email: 'ngona8@gmail.com' });
  const Celine2: any = await User.findOne({ email: 'Celine2@pulse.com' });
  const Celine3: any = await User.findOne({ email: 'Celine3@pulse.com' });
  const Celine4: any = await User.findOne({ email: 'Celine4@pulse.com' });
  const Celine5: any = await User.findOne({ email: 'Celine5@pulse.com' });
  const Celine6: any = await User.findOne({ email: 'Celine6@pulse.com' });
  const Celine7: any = await User.findOne({ email: 'Celine7@pulse.com' });
  const Celinejean: any = await User.findOne({ email: 'Celinejean@pulse.com' });
  const shemajohn: any = await User.findOne({ email: 'bett19@gmail.com' });
  const Musoni: any = await User.findOne({ email: 'Musoni@pulse.com' });
  const Musonijohn: any = await User.findOne({ email: 'Musonijohn@pulse.com' });
  const Celinejohn: any = await User.findOne({ email: 'Celinejohn@pulse.com' });
  const pepper: any = await User.findOne({ email: 'pepper@gmail.com' });
  const pepper1: any = await User.findOne({ email: 'pepperalla@gmail.com' });
  const pepper2: any = await User.findOne({
    email: 'pepperallasiyaa@gmail.com',
  });
  const pepper3: any = await User.findOne({ email: 'pallilon@gmail.com' });
  const pepper4: any = await User.findOne({ email: 'pallilon.on@gmail.com' });
  const pepper5: any = await User.findOne({
    email: 'pallilon.on.oi@gmail.com',
  });
  const pepper6: any = await User.findOne({ email: 'belise@gmail.com' });
  const pepper7: any = await User.findOne({ email: 'belise900@gmail.com' });
  const pepper8: any = await User.findOne({ email: 'belise90@gmail.com' });
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
    email: 'davedieudone@gmail.com',
  });
  const dieudone4: any = await User.findOne({
    email: 'dieudonedimtri@gmail.com',
  });
  const dieudone5: any = await User.findOne({
    email: 'dieudonehelper@gmail.com',
  });
  const dieudone6: any = await User.findOne({ email: 'dannyclug@gmail.com' });
  const dieudone7: any = await User.findOne({
    email: 'dieudonechang@gmail.com',
  });
  const dieudone8: any = await User.findOne({
    email: 'dieudonechen@gmail.com',
  });
  const elio: any = await User.findOne({ email: 'eliowalker@gmail.com' });
  const elio1: any = await User.findOne({ email: 'eliophilip@gmail.com' });
  const elio2: any = await User.findOne({ email: 'eliojames@gmail.com' });
  const elio3: any = await User.findOne({ email: 'elioclavin@gmail.com' });
  const elio4: any = await User.findOne({ email: 'dimelio@gmail.com' });
  const elio5: any = await User.findOne({ email: 'eliodest@gmail.com' });
  const elio6: any = await User.findOne({ email: 'eliopulg@gmail.com' });
  const ishimwe: any = await User.findOne({ email: 'ishimwealine@gmail.com' });
  const ishimwe1: any = await User.findOne({ email: 'ishimwealain@gmail.com' });
  const ishimwe2: any = await User.findOne({ email: 'ishimwestani@gmail.com' });
  const ishimwe3: any = await User.findOne({
    email: 'ishimweMusoni@gmail.com',
  });
  const ishimwe4: any = await User.findOne({
    email: 'ishimwedestin@gmail.com',
  });
  const ishimwe5: any = await User.findOne({
    email: 'ishimwephilip@gmail.com',
  });
  const ishimwe6: any = await User.findOne({
    email: 'ishimwedio123@gmail.com',
  });
  const ishimwe7: any = await User.findOne({ email: 'ishimwedivin@gmail.com' });
  const ishimwe8: any = await User.findOne({ email: 'ishimweclara@gmail.com' });
  const ishimwe9: any = await User.findOne({ email: 'ishimwedenys@gmail.com' });
  const ishimwe10: any = await User.findOne({
    email: 'ishimwequerry@gmail.com',
  });
  const karekezi: any = await User.findOne({ email: 'karekezi@gmail.com' });
  const karekezi1: any = await User.findOne({
    email: 'karekezideus@gmail.com',
  });
  const hakizumwami1: any = await User.findOne({
    email: 'kezaaabelitrie@gmail.com',
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
      user: ishimwe.id,
      firstName: 'Peter',
      lastName: 'Okwadha',
    },
    {
      user: ishimwe1.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: ishimwe2.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: ishimwe3.id,
      firstName: 'GEn',
      lastName: 'Agarwal',
    },
    {
      user: ishimwe4.id,
      firstName: 'elio',
      lastName: 'Agarwal',
    },
    {
      user: ishimwe5.id,
      firstName: 'ishimwe',
      lastName: 'Dev',
    },
    {
      user: ishimwe6.id,
      firstName: 'ishimwe',
      lastName: 'Dev',
    },
    {
      user: ishimwe7.id,
      firstName: 'ishimwe',
      lastName: 'Dev',
    },
    {
      user: ishimwe8.id,
      firstName: 'ishimwe',
      lastName: 'Dev',
    },
    {
      user: ishimwe9.id,
      firstName: 'ishimwe',
      lastName: 'Dev',
    },
    {
      user: ishimwe10.id,
      firstName: 'ishimwe',
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
