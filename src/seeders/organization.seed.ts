/* eslint-disable */
import User, { RoleOfUser } from '../models/user'
import { ORG_STATUS, Organization } from '../models/organization.model'
import { Profile } from '../models/profile.model'
import { users as dbUsers } from './users.seed'

type UserRole={
  admin: number,
  manager: number,
  coordinator: number,
  trainee: number,
  user: number,
  ttl: number
}

const usersTypes: UserRole = {
  admin: 1,
  manager: 1,
  coordinator: 1,
  trainee: 2,
  user: 2,
  ttl: 2,
}

const seedOrganizations = async () => {

  try {
    await Organization.deleteMany({})
    const users = await User.find()
    const organizations = [
      {
        name: 'Andela',
        description:
          'Master the professional and technical skills needed to accelerate your career and use technology to change the world.',
        gitHubOrganisation: 'atlp-rwanda',
        activeRepos: ['atlp-pulse-bn', 'atlp-pulse-fn'],
        status: ORG_STATUS.ACTIVE,
      },
      {
        name: 'Irembo',
        description: 'Organization 2 description',
        status: ORG_STATUS.ACTIVE,
      },
    ]
    const orgs = await Organization.insertMany(organizations)
    let userCount = 1
    for (const org of orgs) {
      for (const role in usersTypes) {
        for (const user of users.slice(userCount, userCount+usersTypes[role as keyof UserRole])) {
          const profile = await Profile.create({
            user: user._id,
            githubUserName: dbUsers.find(dbUser => dbUser.email === user.email).githubUserName || 'unavailable',
            orgId: org._id,
          })
          user.organizations.push({
            orgId: org._id,
            role: role,
            profile: profile?._id
          })
          await user.save()
          if(role === RoleOfUser.ADMIN){
            org.admin.push(user.id)
            await org.save()
          }
        }
        userCount+=usersTypes[role as keyof UserRole]
      }
    }

    // add super admin to all organizations
    for(const org of orgs){
      const profile = await Profile.create({
        user: users[0]._id,
        orgId: org._id,
      })

      users[0].organizations.push({
        orgId: org._id,
        role: RoleOfUser.SUPER_ADMIN,
        profile: profile._id,
      })
    }
    await users[0].save()
  } catch (err: any) {
    console.log(err)
  }
}
export default seedOrganizations
