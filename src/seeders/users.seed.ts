import { hashSync } from 'bcryptjs'
import { RoleOfUser, User } from '../models/user'
import { Profile } from '../models/profile.model'

const organizations: any = {
  Andela: [],
  Irembo: [],
}

const seedUsers = async () => {
  try {
    // Clear existing users and profiles
    await User.deleteMany({})
    await Profile.deleteMany({})

    // Define sample users
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
        firstName: 'paciFique',
        lastName: 'Mbonimana',
        email: 'pacifiquemboni123@gmail.com',
        githubUserName: '',
      },
      {
        firstName: 'Muheto',
        lastName: 'Darius',
        email: 'muhedarius@gmail.com',
        githubUserName: '',
      },
      {
        firstName: 'Kagabo',
        lastName: 'Darius',
        email: 'kagabodarius@gmail.com',
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

    // Distribute users among organizations
    organizations.Andela = [...users.slice(0, 7)]
    organizations.Irembo = [...users.slice(7)]

    // Define the number of users per role
    const usersTypes = {
      admin: 1,
      manager: 1,
      coordinators: 1,
      users: 2,
      ttl: 2,
    }

    // Create an array of users to be registered
    const registerUsers: Array<any> = []

    // Populate registerUsers with users for each organization
    Object.entries(organizations).forEach(([orgName, orgUsers]: any) => {
      // Admins
      for (const element of orgUsers) {
        if (registerUsers.find((user) => user.email === element.email)) continue
        if (
          registerUsers.filter(
            (user) =>
              user.organizations.includes(orgName) &&
              user.role === RoleOfUser.ADMIN
          ).length === usersTypes.admin
        )
          break
        registerUsers.push({
          email: element.email,
          password: hashSync('Test@12345'),
          role: RoleOfUser.ADMIN,
          organizations: [orgName],
        })
      }

      for (const element of orgUsers) {
        if (registerUsers.find((user) => user.email === element.email)) continue
        if (
          registerUsers.filter(
            (user) =>
              user.organizations.includes(orgName) &&
              user.role === RoleOfUser.MANAGER
          ).length === usersTypes.manager
        )
          break
        registerUsers.push({
          email: element.email,
          password: hashSync('Test@12345'),
          role: RoleOfUser.MANAGER,
          organizations: [orgName],
        })
      }

      // Coordinators
      for (const element of orgUsers) {
        if (registerUsers.find((user) => user.email === element.email)) continue
        if (
          registerUsers.filter(
            (user) =>
              user.organizations.includes(orgName) &&
              user.role === RoleOfUser.COORDINATOR
          ).length === usersTypes.coordinators
        )
          break
        registerUsers.push({
          email: element.email,
          password: hashSync('Test@12345'),
          role: RoleOfUser.COORDINATOR,
          organizations: [orgName],
        })
      }

      // Users
      for (const element of orgUsers) {
        if (registerUsers.find((user) => user.email === element.email)) continue
        if (
          registerUsers.filter(
            (user) =>
              user.organizations.includes(orgName) && user.role === 'user'
          ).length === usersTypes.users
        )
          break
        registerUsers.push({
          email: element.email,
          password: hashSync('Test@12345'),
          role: 'user',
          organizations: [orgName],
        })
      }

      // TTL
      for (const element of orgUsers) {
        if (registerUsers.find((user) => user.email === element.email)) continue
        if (
          registerUsers.filter(
            (user) =>
              user.organizations.includes(orgName) && user.role === 'ttl'
          ).length === usersTypes.ttl
        )
          break
        registerUsers.push({
          email: element.email,
          password: hashSync('Test@12345'),
          role: 'ttl',
          organizations: [orgName],
        })
      }
    })

    // Add SuperAdmin
    registerUsers.unshift({
      email: 'samuel.nishimwe@andela.com',
      password: hashSync('Test@12345'),
      role: RoleOfUser.SUPER_ADMIN,
      organizations: ['Andela'],
    })

    // Save users to the database
    await User.insertMany(registerUsers)

    // Generate profiles for registered users
    const profiles = []
    const dbUsers = await User.find().select('_id email')

    for (const element of dbUsers) {
      const userProfile = users.find((user) => user.email === element.email)

      if (userProfile) {
        profiles.push({
          user: element._id,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          githubUsername: userProfile.githubUserName || 'unavailable',
        })
      }
    }

    // Save profiles to the database
    await Profile.insertMany(profiles)
  } catch (error) {
    throw new Error('Failed to seed users and profiles')
  }
}

export default seedUsers
