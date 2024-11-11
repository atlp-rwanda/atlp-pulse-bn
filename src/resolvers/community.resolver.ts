import { ApolloError } from 'apollo-server'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { Question, IQuestion, IAnswer, Answer } from '../models/question.model'
import { Types } from 'mongoose'
import { GraphQLError } from 'graphql'
import { Context } from '../context'

const CommunityResolver = {
  Query: {
    async getAllQuestions(
      parent: undefined,
      args: { limit?: number; offset?: number },
      context: Context
    ): Promise<any> {
      try {
        const limit = args.limit ?? 10
        const offset = args.offset ?? 0

        const questions = await Question.find()
          .skip(offset)
          .limit(limit)
          .populate('author')
          .populate({
            path: 'answers',
            populate: {
              path: 'author',
            },
          })
          .exec()
        return questions.map((question: any) => {
          return {
            id: question._id.toString(),
            title: question.title,
            content: question.content,
            createdAt: question?.createdAt?.toISOString(),
            author:
              question.author && question.author.email
                ? {
                    id: question.author._id.toString(),
                    email: question?.author?.email || 'devpulse',
                    profile: question.author.profile
                      ? {
                          id: question.author.profile._id.toString(),
                          avatar: question.author.profile.avatar,
                          bio: question.author.profile.bio,
                        }
                      : null,
                  }
                : null,
            answers:
              question.answers.length > 0
                ? question.answers
                    .filter(
                      (answer: any) => answer.author && answer.author.email
                    )
                    .map((answer: any) => ({
                      id: answer._id.toString(),
                      content: answer?.content,
                      createdAt: answer.createdAt?.toISOString(),
                      author: answer.author
                        ? {
                            id: answer.author._id.toString(),
                            email: answer?.author?.email,
                            profile: answer.author.profile
                              ? {
                                  id: answer.author.profile._id.toString(),
                                  avatar: answer.author.profile.avatar,
                                  bio: answer.author.profile.bio,
                                }
                              : null,
                          }
                        : null,
                    }))
                : [],
          }
        })
      } catch (error) {
        const message = (error as Error).message
        throw new ApolloError(
          'An error occurred while fetching questions.',
          'INTERNAL_SERVER_ERROR',
          { detailedMessage: message }
        )
      }
    },

    async getQuestionById(
      parent: undefined,
      { id }: { id: string }
    ): Promise<IQuestion | null> {
      try {
        const question = await Question.findById(id).populate('answers.author')
        if (!question) throw new GraphQLError('Question not found')
        return question
      } catch (error) {
        const message = (error as Error).message
        throw new ApolloError(
          'An error occurred while fetching the question.',
          'INTERNAL_SERVER_ERROR',
          { detailedMessage: message }
        )
      }
    },
  },

  Mutation: {
    async createQuestion(
      parent: undefined,
      { title, content }: { title: string; content: string },
      context: Context
    ): Promise<IQuestion | any> {
      try {
        const user = await checkUserLoggedIn(context)
        if (!user) throw new GraphQLError('User not logged in')

        const newQuestion = new Question({
          title,
          content,
          author: new Types.ObjectId(context?.userId),
          createdAt: new Date(),
          answers: [],
        })

        await newQuestion.save()

        const populatedQuestion = await Question.findById(newQuestion._id)
          .populate('author')
          .exec()

        return populatedQuestion
      } catch (error) {
        const message = (error as Error).message
        throw new ApolloError(
          'An error occurred while creating a question.',
          'INTERNAL_SERVER_ERROR',
          { detailedMessage: message }
        )
      }
    },

    async createAnswer(
      parent: undefined,
      { questionId, content }: { questionId: string; content: string },
      context: Context
    ): Promise<IAnswer | any> {
      try {
        const user = await checkUserLoggedIn(context)
        if (!user) throw new GraphQLError('User not logged in')

        const question: any = await Question.findById(questionId)
        if (!question) throw new GraphQLError('Question not found')

        // Create the answer document
        const newAnswer: any = new Answer({
          content,
          author: new Types.ObjectId(context?.userId),
          question: new Types.ObjectId(questionId),
          createdAt: new Date(),
        })

        // Save the new answer to the database
        await newAnswer.save()

        // Push the new answer's ID to the question's answers array (instead of the full answer object)
        question.answers.push(newAnswer._id)
        await question.save()

        // Populate the newly created answer with author details
        const populatedAnswer: any = await Answer.findById(newAnswer._id)
          .populate('author')
          .exec()

        return {
          id: populatedAnswer?._id.toString(),
          content: populatedAnswer?.content,
          createdAt: populatedAnswer?.createdAt?.toISOString(),
          author: {
            id: populatedAnswer?.author._id.toString(),
            email: populatedAnswer?.author.email,
            profile: populatedAnswer?.author.profile
              ? {
                  id: populatedAnswer?.author.profile._id.toString(),
                  avatar: populatedAnswer?.author.profile.avatar,
                  bio: populatedAnswer?.author.profile.bio,
                }
              : null,
          },
          question: {
            id: question._id.toString(),
            title: question.title,
            content: question.content,
            createdAt: question?.createdAt?.toISOString(),
            author: {
              id: question.author._id.toString(),
              email: question.author.email,
            },
          },
        }
      } catch (error) {
        console.log(error)
        const message = (error as Error).message
        throw new ApolloError(
          'An error occurred while creating an answer.',
          'INTERNAL_SERVER_ERROR',
          { detailedMessage: message }
        )
      }
    },

    async deleteQuestion(
      parent: undefined,
      { id }: { id: string },
      context: Context
    ): Promise<IQuestion | null> {
      try {
        const user = await checkUserLoggedIn(context)
        if (!user) throw new GraphQLError('User not logged in')

        const question = await Question.findById(id)
        if (!question) throw new GraphQLError('Question not found')

        if (
          String(question.author) !== String(context.userId) &&
          !(context.role === 'superadmin')
        ) {
          throw new GraphQLError(
            'You are not authorized to delete this question'
          )
        }

        await Answer.deleteMany({ _id: { $in: question.answers } })

        await question.deleteOne()
        return question
      } catch (error) {
        const message = (error as Error).message
        throw new ApolloError(
          'An error occurred while deleting the question.',
          'INTERNAL_SERVER_ERROR',
          { detailedMessage: message }
        )
      }
    },

    async deleteAnswer(
      parent: undefined,
      { id }: { id: string },
      context: Context
    ): Promise<IAnswer | null> {
      try {
        const user = await checkUserLoggedIn(context)
        if (!user) throw new GraphQLError('User not logged in')

        const answer = await Answer.findById(id)
        if (!answer) throw new GraphQLError('Answer not found')

        // Check if the user is the author of the answer or a superadmin
        if (
          String(answer.author) !== String(context.userId) &&
          !(context.role === 'user')
        ) {
          throw new GraphQLError('You are not authorized to delete this answer')
        }

        // Delete the answer
        await answer.deleteOne()

        await Question.updateOne(
          { _id: answer.question },
          { $pull: { answers: answer._id } }
        )

        return answer
      } catch (error) {
        const message = (error as Error).message
        throw new ApolloError(
          'An error occurred while deleting the answer.',
          'INTERNAL_SERVER_ERROR',
          { detailedMessage: message }
        )
      }
    },
  },
}

export default CommunityResolver
