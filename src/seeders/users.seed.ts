import { hashSync } from 'bcryptjs'
import { User, Profile } from '../models/user'

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
            email: 'adminirembo@devpulse.co',
            password: hashSync('Andela123'),
            role: 'admin',
            organizations: ['Irembo'],
        },
        {
            email: 'admin2irembo@devpulse.co',
            password: hashSync('Andela123'),
            role: 'admin',
            organizations: ['Irembo'],
        },
        {
            email: 'managerirembo@devpulse.co',
            password: hashSync('Andela123'),
            role: 'manager',
            organizations: ['Irembo'],
        },
        {
            email: 'manager2irembo@devpulse.co',
            password: hashSync('Andela123'),
            role: 'manager',
            organizations: ['Irembo'],
        },
        {
            email: 'coordinatorirembo@devpulse.co',
            password: hashSync('Andela123'),
            role: 'coordinator',
            organizations: ['Irembo'],
        },
        {
            email: 'coordinator1irembo@devpulse.co',
            password: hashSync('Andela123'),
            role: 'coordinator',
            organizations: ['Irembo'],
        },
        {
            email: 'traineeirembo@devpulse.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'trainee1irembo@pulse.com',
            password: hashSync(''),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'trainee2irembo@pulse.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'trainee3irembo@pulse.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'augsep04@tubidu.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'jepressler@jagomail.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'axxys1@hotmail.red',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'mryzt212@asifboot.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'javedakhter01@shonecool.online',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'musclerider@asifboot.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'vampireprincess5493@uhpanel.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'stprakarpov@kimsangung.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'spthal@email-temp.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'dasquish@unair.nl',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: '657ziffzer35@gmailwe.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'keelywyn@bomukic.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'lsajnaalex@shiro.pw',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'jimbullock@hansenhu.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'jhodge@shiro.pw',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'brewer23000@musicandsunshine.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'sergeyzdobnov@mailcuk.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'ksms103@f2021.me',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'rey040309@24hinbox.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'obgicou@goblinhammer.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'irenkakola@sbuttone.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'homoeoge@superhostformula.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'kthr@mailrfngon.xyz',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'ivanchikovqoxy@mailcuk.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'emifieva133@livegolftv.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'truggy1@livegolftv.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'cbad08@shonecool.online',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'deathdream@email-temp.com',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
        },
        {
            email: 'selose@big00012mine.cf',
            password: hashSync('Andela123'),
            role: 'user',
            organizations: ['Irembo'],
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
    ]
    await User.deleteMany({})
    await User.insertMany(users)

    const superAdmin: any = await User.findOne({email: 'superadmin@devpulse.co'})
    const admin: any = await User.findOne({ email: 'admin@devpulse.co' })
    const admin2: any = await User.findOne({ email: 'admin2@devpulse.co' })
    const manager: any = await User.findOne({ email: 'manager@devpulse.co' })
    const manager2: any = await User.findOne({ email: 'manager2@devpulse.co' })
    const coordinator: any = await User.findOne({ email: 'coordinator@devpulse.co'})
    const trainee: any = await User.findOne({ email: 'trainee@devpulse.com' })
    const trainee2: any = await User.findOne({ email: 'trainee1@pulse.com' })
    const trainee3: any = await User.findOne({ email: 'trainee2@pulse.com' })
    const trainee4: any = await User.findOne({ email: 'trainee3@pulse.com' })
    const james: any = await User.findOne({ email: 'james@gmail.com' })
    const peter: any = await User.findOne({ email: 'peter@pulse.com' })
    const john: any = await User.findOne({ email: 'john@pulse.com' })

    const adminirembo: any = await User.findOne({ email: 'adminirembo@devpulse.co' })
    const admin2irembo: any = await User.findOne({ email: 'admin2irembo@devpulse.co' })
    const managerirembo: any = await User.findOne({ email: 'managerirembo@devpulse.co' })
    const manager2irembo: any = await User.findOne({ email: 'manager2irembo@devpulse.co' })
    const coordinatorirembo: any = await User.findOne({ email: 'coordinatorirembo@devpulse.co'})
    const traineeirembo: any = await User.findOne({ email: 'traineeirembo@devpulse.com' })
    const trainee1irembo: any = await User.findOne({ email: 'trainee1irembo@pulse.com' })
    const trainee2irembo: any = await User.findOne({ email: 'trainee2irembo@pulse.com' })
    const trainee3irembo: any = await User.findOne({ email: 'trainee3irembo@pulse.com' })
    const bosco: any = await User.findOne({ email: 'augsep04@tubidu.com' })
    const bosco1: any = await User.findOne({ email: 'jepressler@jagomail.com' })
    const bosco2: any = await User.findOne({ email: 'axxys1@hotmail.red' })
    const bosco3: any = await User.findOne({ email: 'mryzt212@asifboot.com' })
    const bosco4: any = await User.findOne({ email: 'javedakhter01@shonecool.online' })
    const bosco5: any = await User.findOne({ email: 'musclerider@asifboot.com' })
    const bosco6: any = await User.findOne({ email: 'vampireprincess5493@uhpanel.com' })
    const keyi: any = await User.findOne({ email: 'stprakarpov@kimsangung.com' })
    const keyi1: any = await User.findOne({ email: 'spthal@email-temp.com' })
    const keyi2: any = await User.findOne({ email: 'dasquish@unair.nl' })
    const keyii: any = await User.findOne({ email: '657ziffzer35@gmailwe.com' })
    const keyi3: any = await User.findOne({ email: 'keelywyn@bomukic.com' })
    const keyi4: any = await User.findOne({ email: 'lsajnaalex@shiro.pw' })
    const keyi5: any = await User.findOne({ email: 'jimbullock@hansenhu.com' })
    const keyi6: any = await User.findOne({ email: 'jhodge@shiro.pw' })
    const yvette: any = await User.findOne({ email: 'brewer23000@musicandsunshine.com' })
    const yvette1: any = await User.findOne({ email: 'sergeyzdobnov@mailcuk.com' })
    const yvette2: any = await User.findOne({ email: 'ksms103@f2021.me' })
    const yvette3: any = await User.findOne({ email: 'rey040309@24hinbox.com' })
    const yvette4: any = await User.findOne({ email: 'obgicou@goblinhammer.com' })
    const yvette5: any = await User.findOne({ email: 'irenkakola@sbuttone.com' })
    const yvette6: any = await User.findOne({ email: 'homoeoge@superhostformula.com' })
    const moses: any = await User.findOne({ email: 'kthr@mailrfngon.xyz' })
    const moses1: any = await User.findOne({ email: 'ivanchikovqoxy@mailcuk.com' })
    const moses2: any = await User.findOne({ email: 'emifieva133@livegolftv.com' })
    const moses3: any = await User.findOne({ email: 'truggy1@livegolftv.com' })
    const moses4: any = await User.findOne({ email: 'cbad08@shonecool.online' })
    const moses5: any = await User.findOne({ email: 'deathdream@email-temp.com' })
    const moses6: any = await User.findOne({ email: 'selose@big00012mine.cf' })
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

    const mamy: any = await User.findOne({ email: 'tamm22@twitch.work' })
    const mamy1: any = await User.findOne({ email: 'lybra008@gmailvn.net' })
    const mamy2: any = await User.findOne({ email: 'fridrih6767@statemother.us' })
    const mamy3: any = await User.findOne({ email: 'dacaying@statemother.us' })
    const mamy4: any = await User.findOne({ email: 'tolikmeshkov@tehsisri.email' })
    const mamy5: any = await User.findOne({ email: 'katemoor@tehsisri.email' })
    const mamy6: any = await User.findOne({ email: 'lukshorn@arasempire.com' })
    const mamy7: any = await User.findOne({ email: '10119106@nouraproperty.com' })
    const mamy8: any = await User.findOne({ email: 'sofashkz@mailpluss.com' })










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
            user: adminirembo.id,
            firstName: 'James',
            lastName: 'Admam',
        },
        {
            user: admin2irembo.id,
            firstName: 'Agwelo',
            lastName: 'yite',
        },
        {
            user: managerirembo.id,
            firstName: 'juti',
            lastName: 'arwal',
        },
        {
            user: manager2irembo.id,
            firstName: 'Jane',
            lastName: 'Agar',
        },
        {
            user: coordinatorirembo.id,
            firstName: 'James',
            lastName: 'Agarwal',
        },
        {
            user: trainee1irembo.id,
            firstName: 'key',
            lastName: 'Agarwald',
        },
        {
            user: traineeirembo.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: trainee2irembo.id,
            firstName: 'Peters',
            lastName: 'rwal',
        },
        {
            user: trainee3irembo.id,
            firstName: 'BOV',
            lastName: 'HJ',
        },
        {
            user: bosco.id,
            firstName: 'Bosco',
            lastName: 'Boob',
        },
        {
            user: bosco1.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: bosco2.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: bosco3.id,
            firstName: 'Assym',
            lastName: 'Myty',
        },
        {
            user: bosco4.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: bosco5.id,
            firstName: 'Vitty',
            lastName: 'Agl',
        },
        {
            user: bosco6.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: keyi.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: keyi1.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: keyi2.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: keyii.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: keyi3.id,
            firstName: 'Bja',
            lastName: 'Byy',
        },
        {
            user: keyi4.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: keyi5.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: keyi6.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: yvette.id,
            firstName: 'Heyt',
            lastName: 'Agaarwal',
        },
        {
            user: yvette1.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: yvette2.id,
            firstName: 'Jammes',
            lastName: 'Agaarwal',
        },
        {
            user: yvette3.id,
            firstName: 'Jay',
            lastName: 'Minny',
        },
        {
            user: yvette4.id,
            firstName: 'Patty',
            lastName: 'Patty1',
        },
        {
            user: yvette6.id,
            firstName: 'Viggo',
            lastName: 'Nono',
        },
        {
            user: yvette5.id,
            firstName: 'manq',
            lastName: 'ddaa',
        },
        {
            user: moses.id,
            firstName: 'caay',
            lastName: 'Aarwal',
        },
        {
            user: moses1.id,
            firstName: 'noty',
            lastName: 'mant',
        },
        {
            user: moses2.id,
            firstName: 'Daddy',
            lastName: 'Post',
        },
        {
            user: moses3.id,
            firstName: 'Moxy',
            lastName: 'willy',
        },
        {
            user: moses4.id,
            firstName: 'Most',
            lastName: 'Patty',
        },
        {
            user: moses5.id,
            firstName: 'Boony',
            lastName: 'Afal',
        },
        {
            user: moses6.id,
            firstName: 'Bayz',
            lastName: 'Namy',
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
    ]
    await Profile.deleteMany({})
    await Profile.insertMany(profiles)

    return null
}
export default seedUsers
