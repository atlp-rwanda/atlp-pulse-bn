import { hashSync } from 'bcryptjs'
import User, { RoleOfUser } from '../models/user'
import { Profile } from '../models/profile.model'

const organizations: any = {
  Andela: [],
  Irembo: [],
}

export const users: Array<any> = [
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
  {
    firstName: 'Serge',
    lastName: 'Shema',
    email: 'shemaserge@gmail.com',
    githubUserName: '',
  },
  {
    firstName: 'David',
    lastName: 'Irankunda',
    email: 'irankundadavid@gmail.com',
    githubUserName: '',
  },
]

const seedUsers = async () => {
  try {
    // Clear existing users and profiles
    await User.deleteMany({})
    await Profile.deleteMany({})

    // Define sample users

    const registerUsers:Array<any>= []

    users.forEach((user: any)=>{
      if(registerUsers.find(registerUser=>registerUser.email===user.email)) return
      registerUsers.push({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashSync('Test@12345')
      })
    })

    //Add SUPER_ADMIN
    registerUsers.unshift({
      firstName: 'samuel',
      lastName: 'Nishimwe',
      email: 'samuel.nishimwe@andela.com',
      password: hashSync('Test@12345'),
    })

    await User.insertMany(registerUsers)

    // // Generate profiles for registered users
    // const profiles = []
    // for (const element of dbUsers) {
    //   const userProfile = users.find((user) => user.email === element.email)
    //   if (userProfile) {
    //     profiles.push({
    //       user: element._id,
    //       githubUsername: userProfile.githubUserName || 'unavailable',
    //     })
    //   }
    // }

    // // Save profiles to the database
    // await Profile.insertMany(profiles)
  } catch (error) {
    throw new Error('Failed to seed users and profiles')
  }
}

export default seedUsers
