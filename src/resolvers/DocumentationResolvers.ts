import { DocumentNode, GraphQLError } from 'graphql'
import { Documentation } from '../models/documentation.model'

const DocumentationResolvers = {
  Query: {
    async getDocumentations(_: any, args: any, context: any) {
      const documentations = await Documentation.find()
      return documentations
    },
  },
  Mutation: {
    async addDocumentation(_: any, args: any, context: any) {
      console.log(args)
      const documentation = await Documentation.create(args)
      return documentation
    },
    async updateDocumentation(_: any, args: any, context: any) {
      const { id, title, description } = args
      const documentation = await Documentation.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      )
      if (!documentation) {
        throw new GraphQLError('Documentation not found.', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }
      return documentation
    },
    async deleteDocumentation(_: any, args: any, context: any) {
      const documentation = await Documentation.findByIdAndRemove(args.id)
      if (!documentation) {
        throw new GraphQLError('Documentation not found.', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }
      return 'Documentation deleted successfully'
    },

    async addSubDocumentation(_: any, args: any, context: any) {
      const { id, title, description } = args
      //find the documentation by id
      const documentation = await Documentation.findById(id)
      if (!documentation) {
        throw new GraphQLError('Documentation not found.', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }
      //update the documentation
      documentation.subDocuments.push({ title, description })
      await documentation.save()
      return documentation
    },
    async deleteSubDocumentation(_: any, args: any, context: any) {
      const { id, title, description } = args
      //find the documentation by id
      const documentation = await Documentation.findById(id)
      if (!documentation) {
        throw new GraphQLError('Documentation not found.', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }
      //update the documentation

      documentation.subDocuments = documentation.subDocuments.filter(
        (subDocument: any) => {
          return (
            subDocument.title !== title &&
            subDocument.description !== description
          )
        }
      )
      await documentation.save()

      return documentation
    },
  },
}

export default DocumentationResolvers
