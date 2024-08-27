import Session from '../models/session.model'

const seedSessions = async () => {
  const sessionsToSeed = [
    {
      Sessionname: 'Session 1',
      description: 'Description for Session 1',
      platform: 'Platform A',
      duration: '1 hour',
      organizer: 'Organizer X',
    },
    {
      Sessionname: 'Session 2',
      description: 'Description for Session 2',
      platform: 'Platform B',
      duration: '2 hours',
      organizer: 'Organizer Y',
    },
    // Add more session objects as needed
  ]

  await Session.deleteMany({})

  await Session.insertMany(sessionsToSeed)
  return null
}

export default seedSessions
