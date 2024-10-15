import axios from 'axios'

export interface GeoData {
  country_name?: string | null
  country_code?: string | null
  city?: string | null
  postal?: string | null
  region?: string | null
  latitude?: number | null
  longitude?: number | null
}
async function getGeoLocation(ipAddress: string): Promise<GeoData> {
  try {
    const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`)

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.data

    return {
      country_code: data.country_code || null,
      country_name: data.country_name || null,
      city: data.city || null,
      region: data.region || null, // Use the correct property name
      postal: data.postal || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
    }
  } catch (error) {
    console.error('Error fetching geolocation:', error)

    return {
      country_code: null,
      country_name: null,
      city: null,
      region: null,
      postal: null,
      latitude: null,
      longitude: null,
    }
  }
}

export default getGeoLocation
