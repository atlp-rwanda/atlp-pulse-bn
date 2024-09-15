import Ticket from '../models/ticket.model'
import { User } from '../models/user'

const generateSubject = (userId: string): string => {
  const subjects = [
    'Issue with login',
    'Request for password reset',
    'Bug report',
    'Feature request',
    'General inquiry',
  ]
  return `${
    subjects[Math.floor(Math.random() * subjects.length)]
  } for user ${userId}`
}

const generateMessage = (userId: string): string => {
  const messages = [
    'Hello, I am experiencing issues with my account. Please assist.',
    'I would like to request a password reset for my account.',
    'I have encountered a bug while using the application. Please investigate.',
    'I have a feature request that I believe would improve the application.',
    'I have a general question regarding the functionality of the app.',
  ]
  return `This is a sample ticket for user with ID ${userId}. ${
    messages[Math.floor(Math.random() * messages.length)]
  }`
}

const seedTickets = async (): Promise<void> => {
  try {
    await Ticket.deleteMany({})
    const assignees = await User.find({ role: 'user' }).select('_id')
    if (assignees.length === 0) {
      throw new Error('No assignees found with the role "user".')
    }
    const user = await User.findOne({
      role: { $in: ['admin', 'coordinator'] },
    }).select('_id')
    if (!user) {
      throw new Error('No user found with the role "admin" or "coordinator".')
    }
    const sampleTickets = []

    for (const assignee of assignees) {
      sampleTickets.push({
        subject: generateSubject(assignee._id.toString()),
        message: generateMessage(assignee._id.toString()),
        user: user._id,
        status: 'open',
        assignee: assignee._id,
      })
    }

    await Ticket.insertMany(sampleTickets)
  } catch (error: any) {
    console.error('Failed to seed tickets:', error)
    throw new Error('Failed to seed tickets')
  }
}

export default seedTickets
