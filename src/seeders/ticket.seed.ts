import Ticket from '../models/ticket.model'

const seedTickets = async () => {
  await Ticket.deleteMany({})

  return null
}

export default seedTickets
