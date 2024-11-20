import { sendMessage } from '../helpers/sendForm'

const contactResolver = {
  Mutation: {
    sendMessage: async (
      _: any,
      {
        name,
        email,
        phone,
        message,
      }: { name: string; email: string; phone: string; message: string }
    ) => {
      try {
        const response = await sendMessage(name, email, phone, message)
        return response
      } catch (error) {
        throw new Error('Error sending message')
      }
    },
  },
}

export default contactResolver
