/* eslint-disable */
import { info, log } from 'console';
import { systemRating } from '../models/ratingSystem';

const createRatingSystemresolver = {
  Query: {
    async getRatingSystems() {
      const ratingSystems = await systemRating.find({});
      return ratingSystems;
    },
    async getRatingSystem(parent: any, args: any) {
      const ratingSystem = await systemRating.findById(args.id);
      if (!ratingSystem) throw new Error("This rating system doesn't exist");
      return ratingSystem;
    },
  },
  Mutation: {
    async createRatingSystem(
      _: any,
      { name, grade, description, percentage }: any,
      context: { role: string; userId: string }
    ) {
      if (context.role === 'admin' || 'superAdmin' || 'manager') {
        const ratingSystemExists = await systemRating.findOne({
          name: name,
        });

        if (ratingSystemExists) throw new Error('Rating system already exists');
        const newRatingSystem = await systemRating.create({
          name,
          grade,
          description,
          percentage,
          userId: context.userId,
        });
        return newRatingSystem;
      } else {
        throw new Error('You are not allowed to perform this action');
      }
    },
    async makeRatingdefault(parent: any, args: any, context: { role: string }) {
      // const findRatingSystem = await systemRating.findById(args.id);
      // if (!findRatingSystem) throw new Error('rating system does not exist');
      // const ratingSystems = await systemRating.find({});
      // const gradings = ratingSystems.map((ratings) =>
      //   ratings.defaultGrading
      //     ? { ...ratings.toObject(), defaultGrading: false }
      //     : ratings
      // );
      // console.log(args.id, '=== theseare');
      const alreadySetGrading = systemRating
        .updateMany({ defaultGrading: true }, { defaultGrading: false })
        .then(() =>
          systemRating.updateOne({ _id: args.id }, { defaultGrading: true })
        )
        .then(() => systemRating.findOne({ _id: args.id }))
        .then((doc) => console.log(doc, '==='));
      // console.log(alreadySetGrading, 'tttrtrt');

      return 'you have successfully setdefaultRatingSystem';
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
