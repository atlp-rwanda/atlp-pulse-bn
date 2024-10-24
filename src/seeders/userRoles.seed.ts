import mongoose from 'mongoose'
import UserRole from '../models/userRoles'

// Create seed data for user roles with explicit IDs
const userRolesSeed = [
  {
    title: 'superAdmin',
  },
  {
    title: 'admin',
  },
  {
    title: 'coordinator',
  },
  {
    title: 'ttl',
  },
  {
    title: 'manager',
  },
  {
    title: 'trainee',
  },
]

async function seedUserRoles(): Promise<any[]> {
  try {
    //Clear Existing data in the collection before seeding (Optional)
    await UserRole.deleteMany({})
    const roles = await UserRole.insertMany(userRolesSeed)
    return roles
  } catch (err) {
    console.error('Error seeding user Roles:', err)
    return []
  }
}
export default seedUserRoles
