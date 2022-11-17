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

    const konze: any = await User.findOne({ email: 'juddcmillman@mothermonth.us' })
    const konze1: any = await User.findOne({ email: 'nshavel1987@tubidu.com' })
    const konze2: any = await User.findOne({ email: 'ovleva@king.buzz' })
    const konze3: any = await User.findOne({ email: 'tylenol7@mailcuk.com' })
    const konze4: any = await User.findOne({ email: 'ktutylfq@disipulo.com' })
    const konze5: any = await User.findOne({ email: 'goldielockx78@hitbase.net' })
    const konze6: any = await User.findOne({ email: 'colindie@24hinbox.com' })
    const bigg: any = await User.findOne({ email: 'vicpp@luddo.me' })
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
