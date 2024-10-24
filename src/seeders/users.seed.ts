import { hashSync } from 'bcryptjs'
import { User } from '../models/user'
import { Profile } from '../models/profile.model'
import seedUserRoles from './userRoles.seed'
import mongoose from 'mongoose'
import logger from '../utils/logger.utils'

const organizations: any = {
  Andela: [],
  Irembo: [],
}

const seedUsers = async () => {
  try {
    // Seed user roles and get the roles with their IDs
    const roles = await seedUserRoles()

    logger.debug('Roles: ', {roles});

    if (roles.length === 0) {
      throw new Error('Error seeding user roles')
    }
    // Create a function to get role ID by title
    const roleId = (title: string): mongoose.Types.ObjectId => {
      const role = roles.find((role) => role.title === title)
      if (!role) {
        throw new Error(`Role with title "${title}" not found`)
      }
      return role._id
    }
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
        firstName: 'paciFique',
        lastName: 'Mbonimana',
        email: 'pacifiquemboni123@gmail.com',
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
      {
        firstName: 'Jean Paul Elisa',
        lastName: 'Ndevu',
        email: 'jeanpaulelisa77@gmail.com',
        githubUserName: 'Ndevu12',
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
            (user) => user.organizations.includes(org[0]) && user.role && user.role.toString() === roleId('admin').toString()
          ).length === usersTypes.admin
        )
          break

        registerUsers.push({
          email: element.email,
          password: hashSync('Test@12345'),
          role: roleId('admin'),
          organizations: [org[0]],
        })
      }

      // Manager
      for (const element of org[1]) {
        if (registerUsers.find((user) => user.email === element.email)) continue

        if (
          registerUsers.filter(
            (user) =>
              user.organizations.includes(org[0]) && user.role && user.role.toString() === roleId('manager').toString()
          ).length === usersTypes.manager
        )
          break

        registerUsers.push({
          email: element.email,
          password: hashSync('Test@12345'),
          role: roleId('manager'),
          organizations: [org[0]],
        })
      }

      // Coordinators
      for (const element of org[1]) {
        if (registerUsers.find((user) => user.email === element.email)) continue

        if (
          registerUsers.filter(
            (user) =>
              user.organizations.includes(org[0]) && user.role && user.role.toString() === roleId('coordinator').toString()
          ).length === usersTypes.coordinators
        )
          break

        registerUsers.push({
          email: element.email,
          password: hashSync('Test@12345'),
          role: roleId('coordinator'),
          organizations: [org[0]],
        })
      }

      //  REMOVE THESE TWO LINES AFTER TESTING
      const testingRoleFunction = roleId('coordinator');

      console.log('testingRoleFunction', {testingRoleFunction});

      // Trainee change into Users
      for (const element of org[1]) {
        if (registerUsers.find((user) => user.email === element.email)) continue

        if (
          registerUsers.filter(
            (user) => user.organizations.includes(org[0]) && user.role && user.role.toString() === roleId('trainee').toString()
          ).length === usersTypes.users
        )
          break

        registerUsers.push({
          email: element.email,
          password: hashSync('Test@12345'),
          role: roleId('trainee'),
          organizations: [org[0]],
        })
      }

      // TTL
      for (let i = 0; i < org[1].length; i++) {
        if (registerUsers.find((user) => user.email === org[1][i].email)) continue

        if (
          registerUsers.filter(
            (user) => user.organizations.includes(org[0]) && user.role && user.role.toString() === roleId('ttl').toString()
          ).length === usersTypes.ttl
        )
          break

        registerUsers.push({
          email: org[1][i].email,
          password: hashSync('Test@12345'),
          role: roleId('ttl'),
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
      role: roleId('superAdmin'),
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

    return null
  } catch (error) {
    console.error('Error seeding users INSIDE USER SEEDER:', error)
    process.exit(1)
  }
}

export default seedUsers