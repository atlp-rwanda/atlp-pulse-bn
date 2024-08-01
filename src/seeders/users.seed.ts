import { hashSync } from 'bcryptjs'
import { User } from '../models/user'
import { Profile } from '../models/profile.model'

const organizations: any = {
  Andela: [],
  Irembo: [],
}

const seedUsers = async () => {
  // Random Users
  const users: Array<any> = [
    {
      firstName: 'ATLP',
      lastName: 'Devpulse',
      email: 'devpulse@proton.me',
      githubUserName: 'atlp-rwanda',
    },
    {
      firstName: 'Muhawenimana',
      lastName: 'Lydia',
      email: 'gatarelydie370@gmail.com',
      githubUserName: '',
    },
    {
      firstName: 'Leivin',
      lastName: 'NIYOYANDIKA',
      email: 'niyoyandikalie@gmail.com',
      githubUserName: '',
    },
    {
      firstName: 'Charles',
      lastName: 'Ntwari',
      email: 'ntwarichar@gmail.com',
      githubUserName: 'charlesntwari',
    },
    {
      firstName: 'Nshuti',
      lastName: 'Parfait',
      email: 'nshutiparfait99@gmail.com',
      githubUserName: '',
    },
    {
      firstName: 'Muheto',
      lastName: 'Darius',
      email: 'muhedarius96@gmail.com',
      githubUserName: '',
    },
    {
      firstName: 'Ndayambaje',
      lastName: 'Virgile',
      email: 'ndayambajevgschooling@gmail.com',
      githubUserName: '',
    },
    {
      firstName: 'NDATIMANA',
      lastName: 'Samuel',
      email: 'ndatimanasamuel1@gmail.com',
      githubUserName: 'blackd44',
    },
    {
      firstName: 'Ken',
      lastName: 'Mugisha',
      email: 'keneon2003@gmail.com',
      githubUserName: '',
    },
    {
      firstName: 'Kevin',
      lastName: 'Rukundo',
      email: 'kevinrukundo1@gmail.com',
      githubUserName: '',
    },
    {
      firstName: 'Patrick',
      lastName: 'Mugwaneza',
      email: 'mugwanezapatrick6@gmail.com',
      githubUserName: '',
    },
    {
      firstName: 'Elissa',
      lastName: 'NTIHINDUKA',
      email: 'ntihindukaelissa77@gmail.com',
      githubUserName: '',
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
          (user) => user.organizations.includes(org[0]) && user.role === 'user'
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
          ? userProfile.githubUserName
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
