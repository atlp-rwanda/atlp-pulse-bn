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
      user: karimbavianney.id,
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
      user: coordinator10.id,
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
  ];
  await Profile.deleteMany({});
  await Profile.insertMany(profiles);

  return null;
};
export default seedUsers;