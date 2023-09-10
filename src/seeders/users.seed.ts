import { hashSync } from 'bcryptjs'
import { User, Profile } from '../models/user'

const organizations: any = {
  Andela: [],
  Irembo: [],
}

const seedUsers = async () => {
  // Random Users
  const users: Array<any> = [
    {
      firstName: 'Olivier',
      lastName: 'Ganishuri',
      email: 'oliviertech212@gmail.com',
      guthubUserName: 'oliviertech212',
    },
    {
      firstName: 'Martha',
      lastName: 'Twesigye',
      email: 'twesimartha@gmail.com',
      guthubUserName: 'Marthatwesi',
    },
    {
      firstName: 'Aline',
      lastName: 'Uwera',
      email: 'alineuwera00@gmail.com',
      guthubUserName: '',
    },
    {
      firstName: 'Christella',
      lastName: 'Ufiteyezu',
      email: 'ufiteyezuchristella@gmail.com',
      guthubUserName: 'chrill-christella',
    },
    {
      firstName: 'Patrick',
      lastName: 'MANIBAHO',
      email: 'patsicko@gmail.com',
      guthubUserName: 'patsicko',
    },
    {
      firstName: 'Abdulkhaliq',
      lastName: 'Kananura',
      email: 'kananuraabdulkhaliq59@gmail.com',
      guthubUserName: 'AbdulKhaliq59',
    },
    {
      firstName: 'Benn Dalton',
      lastName: 'IRADUKUNDA',
      email: 'irabd44@gmail.com',
      guthubUserName: 'blackd44',
    },
    {
      firstName: 'Patience',
      lastName: 'INEZA',
      email: 'inezapatience2@gmail.com',
      guthubUserName: 'Patienceineza',
    },
    {
      firstName: 'Lucie',
      lastName: 'Niyomutoni',
      email: 'niyomutonilucie@gmail.com',
      githubUserName: 'Luciefifi',
    },
    {
      firstName: 'Olivier',
      lastName: 'Habihirwe',
      email: 'habiholivier10@gmail.com',
      guthubUserName: 'Habihirwe',
    },
    {
      firstName: 'Marie Rose Mystica',
      lastName: 'Dukuzeyezu',
      email: 'dukumystica20@gmail.com',
      guthubUserName: 'Mystica52',
    },
    {
      firstName: 'Martha',
      lastName: 'Iradukunda',
      email: 'marthairadukunda1@gmail.com',
      guthubUserName: '',
    },
    {
      firstName: 'Eric',
      lastName: 'Ndungutse',
      email: 'dav.ndungutse@gmail.com',
      guthubUserName: 'ericndungutse',
    },
    {
      firstName: 'Eric',
      lastName: 'Tuyizere',
      email: 'eric.tuyizere.ndungutse@gmail.com',
      guthubUserName: 'ericndungutse',
    },
  ]

  // Share random Users Among organizations
  organizations.Andela = [...users.slice(0, 7)]
  organizations.Irembo = [...users.slice(7, users.length + 1)]

  // Numbers of users per organization
  const usersTypes = {
    admin: 1,
    manager: 1,
    coordinators: 1,
    users: 2,
    ttl: 2,
  }

  // Create an array of users who will be registered
  const registerUsers: Array<any> = []

  // Populate registerUsers
  Object.entries(organizations).forEach((org: any) => {
    // Admin
    for (const element of org[1]) {
      // Check if user exist in registerUsers

      if (registerUsers.find((user) => user.email === element.email)) {
        continue
      }

      if (
        registerUsers.filter(
          (user) => user.organizations.includes(org[0]) && user.role === 'admin'
        ).length === usersTypes.admin
      )
        break

      registerUsers.push({
        email: element.email,
        password: hashSync('Test@12345'),
        role: 'admin',
        organizations: [org[0]],
      })
    }

    // Manager
    for (const element of org[1]) {
      if (registerUsers.find((user) => user.email === element.email)) continue

      if (
        registerUsers.filter(
          (user) =>
            user.organizations.includes(org[0]) && user.role === 'manager'
        ).length === usersTypes.manager
      )
        break

      registerUsers.push({
        email: element.email,
        password: hashSync('Test@12345'),
        role: 'manager',
        organizations: [org[0]],
      })
    }

    // Coordinators
    for (const element of org[1]) {
      if (registerUsers.find((user) => user.email === element.email)) continue

      if (
        registerUsers.filter(
          (user) =>
            user.organizations.includes(org[0]) && user.role === 'coordinator'
        ).length === usersTypes.coordinators
      )
        break

      registerUsers.push({
        email: element.email,
        password: hashSync('Test@12345'),
        role: 'coordinator',
        organizations: [org[0]],
      })
    }

    // Tranee change into Users
    for (const element of org[1]) {
      if (registerUsers.find((user) => user.email === element.email)) continue
  
      if (
        registerUsers.filter(
          (user) =>
            user.organizations.includes(org[0]) && user.role === 'user'
        ).length === usersTypes.users
      )
        break
  
      registerUsers.push({
        email: element.email,
        password: hashSync('Test@12345'),
        role: 'user', 
        organizations: [org[0]],
      })
    }

    // ttl
    for (let i = 0; i < org[1].length; i++) {
      if (registerUsers.find((user) => user.email === org[1][i].email)) continue

      if (
        registerUsers.filter(
          (user) => user.organizations.includes(org[0]) && user.role === 'ttl'
        ).length === usersTypes.ttl
      )
        break

      registerUsers.push({
        email: org[1][i].email,
        password: hashSync('Test@12345'),
        role: 'ttl',
        organizations: [org[0]],
      })
    }
  })

  // Save Users to the database
  await User.deleteMany({})

  // SuperAdmin
  registerUsers.unshift({
    email: 'samuel.nishimwe@andela.com',
    password: hashSync('Test@12345'),
    role: 'superAdmin',
    organizations: ['Andela'],
  })

  await User.insertMany(registerUsers)

  // Query users that have been registered from database
  const profiles = []
  const dbUsers = await User.find().select('_id email')

  // For every db user, generate a profile
  for (const element of dbUsers) {
    const userProfile = users.find((user) => user.email === element.email)

    if (userProfile) {
      profiles.push({
        user: element._id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        githubUsername: userProfile
          ? userProfile.guthubUserName
          : 'unavailable',
      })
    }
  }

  await Profile.deleteMany({})
  await Profile.insertMany(profiles)

  //   return null;
  return null
}

export default seedUsers
