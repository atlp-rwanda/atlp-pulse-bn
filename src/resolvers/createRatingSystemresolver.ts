import { systemRating } from '../models/ratingSystem'
import { Context } from './../context'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { RoleOfUser } from '../models/user'

const createRatingSystemresolver = {
  Query: {
    async getRatingSystems(_: any, { orgToken }: any, context: Context) {
      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(context))([RoleOfUser.ADMIN, RoleOfUser.SUPER_ADMIN, RoleOfUser.MANAGER])

      const ratingSystems = await systemRating.find({ organization: org._id })
      return ratingSystems
    },
    async getRatingSystem(parent: any, args: any) {
      const ratingSystem = await systemRating.findById(args.id)
      if (!ratingSystem) throw new Error('This rating system doesn\'t exist')
      return ratingSystem
    },
    async getDefaultGrading() {
      const defaultGradingSystem = await systemRating.find({
        defaultGrading: true,
      })
      return defaultGradingSystem
    },
  },

  Mutation: {
    async createRatingSystem(
      _: any,
      { name, grade, description, percentage, orgToken }: any,
      context: { role: string; userId: string }
    ) {
      ;(await checkUserLoggedIn(context))([RoleOfUser.ADMIN, RoleOfUser.SUPER_ADMIN, RoleOfUser.MANAGER])

      const ratingSystemExists = await systemRating.findOne({
        name: name,
      })
      const org = await checkLoggedInOrganization(orgToken)

      if (ratingSystemExists) throw new Error('Rating system already exists')
      const newRatingSystem = await systemRating.create({
        name,
        grade,
        description,
        percentage,
        userId: context.userId,
        organization: org?.id,
      })
      return newRatingSystem
    },
    async makeRatingdefault(parent: any, args: any) {
      systemRating
        .updateMany({ defaultGrading: true }, { defaultGrading: false })
        .then(() =>
          systemRating.updateOne({ _id: args.id }, { defaultGrading: true })
        )
        .then(() => systemRating.findOne({ _id: args.id }))

      const ratingSystems = await systemRating.find({})
      ratingSystems.map((ratingSystems) => {
        if (ratingSystems.defaultGrading) {
          ratingSystems.defaultGrading = false
        }
      })
      await systemRating.findByIdAndUpdate(args.id, { defaultGrading: true })
      return 'you have successfully set defaultRatingSystem'
    },

    async deleteRatingSystem(parent: any, args: any) {
      const ratingSystem = await systemRating.findById(args.id)

      if (!ratingSystem) throw new Error('This rating system doesn\'t exist')
      await systemRating.deleteOne({
        _id: args.id,
      })

      return 'You have successfully deleted tshis rating system'
    },
  },
}
export default createRatingSystemresolver
