import mongoose, { Document, Schema } from 'mongoose'

interface IAnswer {
  content: string
  author: mongoose.Types.ObjectId // Reference to User
  question: mongoose.Types.ObjectId
  createdAt?: Date // Optional if not needed
}

interface IQuestion extends Document {
  title: string
  content: string
  author: mongoose.Types.ObjectId // Reference to User
  createdAt?: Date // Optional if not needed
  answers: IAnswer[]
}

const answerSchema = new Schema<IAnswer>({
  content: { type: String, required: true },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
})

const questionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
})
const Answer = mongoose.model<IAnswer>('Answer', answerSchema)
const Question = mongoose.model<IQuestion>('Question', questionSchema)

export { Question, IQuestion, IAnswer, Answer }
