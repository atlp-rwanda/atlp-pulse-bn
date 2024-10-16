import { Profile } from '../models/profile.model'
/**
 * Logs user activity
 * @param {String} userId - The ID of the user performing the activity
 * @param {Object} details - activity details
 */
export const logActivity = async (userId: string, details: any) => {
  try {
    // user's profile

    const profile = await Profile.findOne({ user: userId })

    if (!profile) {
      throw new Error('Profile not found')
    }

    // Validate required fields
    if (!details.country_code || !details.date || !details.city) {
      throw new Error('Missing required fields for logging activity')
    }

    // add new activities to the profile's activity array

    profile.activity.push({
      country_code: details.country_code,
      country_name: details.country_name,
      IPv4: details.IPv4,
      city: details.city,
      state: details.state,
      postal: details.postal,
      latitude: details.latitude,
      longitude: details.longitude,
      failed: details.failed || 0,
      date: new Date(details.date).toISOString(),
    })

    await profile.save()
  } catch (error) {
    console.error('Failed to log activity:', error)
  }
}
