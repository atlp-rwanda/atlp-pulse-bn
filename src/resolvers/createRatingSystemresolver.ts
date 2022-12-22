/* eslint-disable */
import { info, log } from 'console';
import { systemRating } from '../models/ratingSystem';
import { Context } from "./../context";
import { checkUserLoggedIn } from "../helpers/user.helpers";
import { checkLoggedInOrganization } from "../helpers/organization.helper";


const createRatingSystemresolver = {
  Query: {
    async getRatingSystems(_: any, { orgToken }: any, context: Context) {
    const  org = await checkLoggedInOrganization(orgToken);

    (await checkUserLoggedIn(context))(['admin', 'superAdmin', 'manager']);

      const ratingSystems = await systemRating.find({organization: org});
      return ratingSystems;
    },
    async getRatingSystem(parent: any, args: any) {
      const ratingSystem = await systemRating.findById(args.id);
      if (!ratingSystem) throw new Error("This rating system doesn't exist");
      return ratingSystem;
    },
   async getDefaultGrading () {
     const defaultGradingSystem = await systemRating.find({defaultGrading: true})
     return defaultGradingSystem;
   }
  },

  Mutation: {
    async createRatingSystem(
      _: any,
      { name, grade, description, percentage, orgToken }: any,
      context: { role: string; userId: string }
    ) {
      if (context.role === 'admin' || 'superAdmin' || 'manager') {
        const ratingSystemExists = await systemRating.findOne({
        name: name,
      });
      const org = await checkLoggedInOrganization(orgToken);

      if (ratingSystemExists) throw new Error('Rating system already exists');
      const newRatingSystem = await systemRating.create({
        name,
        grade,
        description,
        percentage,
        userId: context.userId,
        organization: org?.id
      });
      return newRatingSystem;
    }else {
        throw new Error('You are not allowed to perform this action');
      }
    },
    async makeRatingdefault(parent: any, args: any, context: { role: string }) {
      const alreadySetGrading = systemRating
        .updateMany({ defaultGrading: true }, { defaultGrading: false })
        .then(() =>
          systemRating.updateOne({ _id: args.id }, { defaultGrading: true })
        )
        .then(() => systemRating.findOne({ _id: args.id }))
        .then((doc) => console.log(doc, '==='));
      const ratingSystems = await systemRating.find({});
      ratingSystems.map((ratingSystems) => {
        if (ratingSystems.defaultGrading) {
          ratingSystems.defaultGrading = false;
        }
      });
      const setdefaultRatingSystem = await systemRating.findByIdAndUpdate(
        args.id,
        { defaultGrading: true }
      );
      return 'you have successfully set defaultRatingSystem';
    },

    async deleteRatingSystem(parent: any, args: any) {
      const ratingSystem = await systemRating.findById(args.id);

      if (!ratingSystem) throw new Error("This rating system doesn't exist");
      const deleteRatingSystem = await systemRating.deleteOne({
        _id: args.id,
      });

      return 'You have successfully deleted tshis rating system';
    },
  },
};
export default createRatingSystemresolver;