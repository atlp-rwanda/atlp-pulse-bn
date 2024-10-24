import mongoose from 'mongoose'
import { RoleOfUser, UserRole } from '../models/user'

// Create seed data for user roles with explicit IDs
const userRolesSeed = [
  {
    name: RoleOfUser.SUPER_ADMIN,
  },
  {
    name: RoleOfUser.ADMIN,
  },
  {
    name: RoleOfUser.COORDINATOR,
  },
  {
    name: RoleOfUser.TTL,
  },
  {
    name: RoleOfUser.MANAGER,
  },
  {
    name: RoleOfUser.TRAINEE,
  },
]

async function seedUserRoles() {
  try {
    //Clear Existing data in the collection before seeding (Optional)
    await UserRole.deleteMany({})
    const roles = await UserRole.insertMany(userRolesSeed)
  } catch (err) {
    console.error('Error seeding user Roles:', err)
  }
}
export default seedUserRoles
