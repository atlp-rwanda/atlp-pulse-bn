/* eslint-disable */
import { RoleOfUser, User } from '../models/user'
import { Organization } from '../models/organization.model'

const seedOrganizations = async () => {
  const andelaAdmins = await User.find({
    role: RoleOfUser.ADMIN,
    organizations: { $in: ['Andela'] },
  })

  const IremboAdmins = await User.find({
    role: RoleOfUser.ADMIN,
    organizations: { $in: ['Irembo'] },
  })

  const organizations = [
    {
      name: 'Andela',
      description:
        'Master the professional and technical skills needed to accelerate your career and use technology to change the world.',
      admin: [...andelaAdmins.map((admin) => admin._id.toHexString())],
      gitHubOrganisation: 'atlp-rwanda',
      activeRepos: ['atlp-pulse-bn', 'atlp-pulse-fn'],
    },
    {
      name: 'Irembo',
      description: 'Organization 2 description',
      admin: [...IremboAdmins.map((admin) => admin._id.toHexString())],
    },
  ]

  await Organization.deleteMany({})
  await Organization.insertMany(organizations)
  return null
}
export default seedOrganizations
