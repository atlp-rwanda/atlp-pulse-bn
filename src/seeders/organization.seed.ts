/* eslint-disable */
import { User } from '../models/user'
import { Organization } from '../models/organization.model'
import { Roles } from '../types/roles'
import UserRole from '../models/userRoles'
import logger from '../utils/logger.utils'

const seedOrganizations = async () => {
  try {
    const andelaAdminRole = await UserRole.findOne({ title: Roles.Admin })
    const IremboAdminRole = await UserRole.findOne({ title: Roles.Admin })

    if (!andelaAdminRole || !IremboAdminRole) {
      throw new Error('Admin roles not found')
    }

    const andelaAdmins = await User.find({
      role: andelaAdminRole._id,
      organizations: { $in: ['Andela'] },
    })

    const IremboAdmins = await User.find({
      role: IremboAdminRole._id,
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

    const allOrg = await Organization.find({})
    logger.debug("Organizations seeded successfully", {allOrg})
    return null
  } catch (error) {
    console.error('Error seeding organizations:', error)
    throw error
  }
}

export default seedOrganizations