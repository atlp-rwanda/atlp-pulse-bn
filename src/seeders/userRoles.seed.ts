import mongoose from 'mongoose'
import { UserRole } from '../models/user'

// Create seed data for user roles with explicit IDs
const userRolesSeed = [
  {
    name: 'superAdmin',
  },
  {
    name: 'admin',
  },
  {
    name: 'coordinator',
  },
  {
    name: 'ttl',
  },
  {
    name: 'manager',
  },
  {
    name: 'trainee',
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
