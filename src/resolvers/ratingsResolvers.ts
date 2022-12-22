import mongoose from 'mongoose';
import { Rating, TempData } from '../models/ratings';
import { Organization, User } from '../models/user';
import { sendEmails } from '../utils/sendEmails';
import { Context } from './../context';
import Cohort from '../models/cohort.model';
import { systemRating } from '../models/ratingSystem';
import { checkUserLoggedIn } from '../helpers/user.helpers';
import { Notification } from '../models/notification.model';
import { authenticated, validateRole } from '../utils/validate-role';
import { checkLoggedInOrganization } from '../helpers/organization.helper';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { isTypeExtensionNode } from 'graphql';
import { formatError } from '../ErrorMsg';
import { forEachDefaultValue } from '@graphql-tools/utils';
const pubsub = new PubSub();
let message:any;


let org: InstanceType<typeof Organization>;
const ratingResolvers: any = {

  Subscription: {
    newRating: {
      subscribe: withFilter(
        (_: any, __: any) => pubsub.asyncIterator("NEW_RATING"),
        (payload, variables) => {
          // Only push an update if the comment is on
          // the correct repository for this operation
          return (
            payload.newRating.receiver === variables.receiver
          );

        }),
    },
    newReply: {
      subscribe:(_: any,__: any)=>pubsub.asyncIterator("NEW_REPLY"),
    }
  },
  Query: {
    async fetchRatings(
      _: any,
      { orgToken }: any,
      context: { role: string; userId: string }
    ) {
      // get the organization if someone  logs in
      org = await checkLoggedInOrganization(orgToken);
      const ratings = await Rating.find({
        coordinator: context.userId,
        organization: org,
      })
        .populate('user')
        .populate('cohort');
      return ratings;
    },

    async fetchRatingsForAdmin(_: any, { orgToken }: any) {
      org = await checkLoggedInOrganization(orgToken);

      const ratingsAdmin = await TempData.find({ organization: org })
        .populate('user')
        .populate('cohort');
      return ratingsAdmin;
    },

    async fetchAllRatings(_: any, { orgToken }: any) {
      org = await checkLoggedInOrganization(orgToken);
      const ratingsAdmin = await Rating.find({ organization: org })
        .populate('user')
        .populate('cohort');
      return ratingsAdmin;
    },

    async fetchTrainees(
      _: any,
      args: any,
      context: { role: string; userId: string }
    ) {
      const id = context.userId;
      if (!id) throw new Error('it seems you have not logged in');
      const trainees = await Cohort.find({ coordinator: id }).populate({
        path: 'members',
        populate: {
          path: 'program',
          match: context.role === 'coordinator',
          strictPopulate: false,
          populate: {
            path: 'organization',
            strictPopulate: false,
          },
        },
      });
      return trainees;
    },
    async fetchRatingByCohort(_: any, { CohortName }: any, context: Context) {
      // (await checkUserLoggedIn(context))(['admin']);
      (await checkUserLoggedIn(context))(['coordinator', 'admin', 'trainee']);
      return (
        await Rating.find({})
        .populate('cohort')
        .populate('user')
      ).filter((rating: any) => {
        return (
          rating?.cohort?.name == CohortName
        )
      }
      )
    },

    async fetchCohortsCoordinator(
      _: any,
      args: any,
      context: { role: string; userId: string }
    ) {
      const id = context.userId;
      if (!id) throw new Error('it seems you have not logged in');
      const trainees = await Cohort.find({
        coordinator: id,
        name: args.cohortName,
      }).populate({
        path: 'members',
        populate: {
          path: 'program',
          match: context.role === 'coordinator',
          strictPopulate: false,
          populate: {
            path: 'organization',
            strictPopulate: false,
          },
        },
      });
      return trainees;
    },

    async fetchRatingsTrainee(
      _: any,
      args: any,
      context: { role: string; userId: string }
    ) {
      const loggedId = context.userId;
      const findRatings = Rating.find({ user: loggedId })
        .populate('user')
        .populate('cohort');
      return findRatings;
    },
    async getAllNotification(
      _: any,
      arg: any,
      context: { role: string; userId: string }
    ) {
      const loggedId = context.userId;
      const findNotification = await Notification.find({ receiver: loggedId }).sort({createdAt:-1}).populate('sender');
      return findNotification;
    }
  },
  Mutation: {
    addRatings: authenticated(
      validateRole('coordinator')(
        async (
          root,
          {
            user,
            sprint,
            quantity,
            quantityRemark,
            quality,
            cohort,
            qualityRemark,
            professional_Skills,
            professionalRemark,
            bodyQuality,
            bodyQuantity,
            bodyProfessional,
            average,
            orgToken,
          },
          context: { userId: string },
        ) => {
          // get the organization if someone  logs in
          org = await checkLoggedInOrganization(orgToken);
          const userExists = await User.findOne({ _id: user });
          if (!userExists) throw new Error('User does not exist!');
          const Kohort = await Cohort.findOne({ _id: cohort });
          if (!Kohort) throw new Error('User does not exist!');
          const findSprint = await Rating.find({ sprint: sprint, user: user });
          if (findSprint.length !== 0)
            throw new Error('The sprint has recorded ratings');

          //  average generating

          average =
            (parseInt(quality) +
              parseInt(quantity) +
              parseInt(professional_Skills)) /
            3;

          if (!mongoose.isValidObjectId(user))
            throw new Error('Invalid user id');
          const saveUserRating = await Rating.create({
            user: userExists,
            sprint,
            quantity,
            quantityRemark,
            quality,
            cohort: Kohort,
            qualityRemark,
            bodyQuality,
            bodyQuantity,
            bodyProfessional,
            professional_Skills,
            professionalRemark,
            average,
            coordinator: context.userId,
            organization: org,
          });
          const coordinator = await User.findOne({ _id: context.userId });
          const addNotifications = await Notification.create({
            receiver:user,
            message:"Have rated you; check your scores.",
            sender:coordinator,
            read: false,
            createdAt: new Date(),

          });

          pubsub.publish("NEW_RATING", {
            newRating: {
              id: addNotifications._id,
              receiver:user,
              message:"Have rated you; check your scores.",
              sender:coordinator,
              read: false,
              createdAt: addNotifications.createdAt,
            }
          });
          await sendEmails(
            process.env.COORDINATOR_EMAIL,
            process.env.COORDINATOR_PASS,
            userExists.email,
            'Trainee',
            'This is to inform you that , new ratings are out now !',
            'Dear Trainee'
          );
          return saveUserRating;
        }
      )
    ),
    async deleteReply(parent: any, args: any) {
      const deleteComment = await Rating.deleteMany({});
      return 'The rating table has been deleted successfully';
    },
    updateRating: authenticated(
      validateRole('coordinator')(
        async (
          root,
          {
            user,
            sprint,
            quantity,
            quantityRemark,
            quality,
            cohort,
            qualityRemark,
            professional_Skills,
            professionalRemark,
            average,
            orgToken,
          },
          context: { userId: string }
        ) => {
          org = await checkLoggedInOrganization(orgToken);
          const oldData: any = await Rating.find({
            user: user,
            sprint: sprint,
          });
          const userExists = await Rating.find({
            where: { user: user, sprint: sprint },
          });
          if (!userExists) throw new Error('User does not exist!');
          const findSprint = await TempData.find({
            sprint: sprint,
            user: user,
          });
          if (findSprint.length !== 0)
            await TempData.deleteOne({ sprint: sprint, user: user });

          if (
            oldData[0]?.quantity == quantity[0].toString() &&
            oldData[0]?.quantityRemark == quantityRemark[0].toString() &&
            oldData[0]?.quality == quality[0].toString() &&
            oldData[0]?.qualityRemark == qualityRemark[0].toString() &&
            oldData[0]?.professional_Skills ==
            professional_Skills[0].toString() &&
            oldData[0]?.professionalRemark == professionalRemark[0].toString()
          ) {
            throw new Error('No changes to update!');
          } else if (
            oldData[0]?.quantity == quantity[0].toString() &&
            oldData[0]?.quality == quality[0].toString() &&
            oldData[0]?.professional_Skills ==
            professional_Skills[0].toString() &&
            (oldData[0]?.quantityRemark !== quantityRemark[0].toString() ||
              oldData[0]?.qualityRemark !== qualityRemark[0].toString() ||
              oldData[0]?.professionalRemark !==
              professionalRemark[0].toString())
          ) {
            try {
              const ratingsUpdates = await Rating.findOneAndUpdate(
                { user: user, sprint: sprint },
                {
                  quantity: oldData[0]?.quantity,
                  quantityRemark: quantityRemark[0]?.toString(),
                  quality: oldData[0]?.quality,
                  qualityRemark: qualityRemark[0]?.toString(),
                  professional_Skills: oldData[0]?.professional_Skills,
                  professionalRemark: professionalRemark[0]?.toString(),
                },
                { new: true }
              );
              return [ratingsUpdates];
            } catch (error) {
              console.log(error);
            }
          } else {
            const updateRating = await TempData.create({
              user,
              sprint,
              quantity:
                oldData[0]?.quantity == quantity[0].toString()
                  ? oldData[0]?.quantity
                  : [oldData[0]?.quantity + '->', quantity?.toString()],
              quantityRemark:
                oldData[0]?.quantityRemark == quantityRemark[0].toString()
                  ? oldData[0]?.quantityRemark
                  : [
                    oldData[0]?.quantityRemark + '->',
                    quantityRemark?.toString(),
                  ],
              quality:
                oldData[0]?.quality == quality[0].toString()
                  ? oldData[0]?.quality
                  : [oldData[0]?.quality + '->', quality?.toString()],
              qualityRemark:
                oldData[0]?.qualityRemark == qualityRemark[0].toString()
                  ? oldData[0]?.qualityRemark
                  : [
                    oldData[0]?.qualityRemark + '->',
                    qualityRemark?.toString(),
                  ],
              professional_Skills:
                oldData[0]?.professional_Skills ==
                  professional_Skills[0].toString()
                  ? oldData[0]?.professional_Skills
                  : [
                    oldData[0]?.professional_Skills + '->',
                    professional_Skills?.toString(),
                  ],
              professionalRemark:
                oldData[0]?.professionalRemark ==
                  professionalRemark[0].toString()
                  ? oldData[0]?.professionalRemark
                  : [
                    oldData[0]?.professionalRemark + '->',
                    professionalRemark?.toString(),
                  ],
              coordinator: context.userId,
              cohort: oldData[0]?.cohort,
              average: oldData[0].average,
              approved: false,
              organization: org,
            });

            await Rating.findOneAndUpdate(
              { user: user, sprint: sprint },
              {
                quantityRemark: quantityRemark[0]?.toString(),
                qualityRemark: qualityRemark[0]?.toString(),
                professionalRemark: professionalRemark[0]?.toString(),
              }
            );

            return updateRating;
          }
        }
      )
    ),

    approveRating: authenticated(
      validateRole('admin')(async (root, { user, sprint }) => {
        const oldData: any = await Rating.find({ user: user, sprint: sprint });
        const updatedData: any = await TempData.find({
          user: user,
          sprint: sprint,
        });
        const userToNotify = await User.find({ _id: updatedData[0].user });
        if (!userToNotify) throw new Error('User does not exist!');
        const update = await Rating.findOneAndUpdate(
          { user: user, sprint: sprint },
          {
            quantity:
              updatedData[0].quantity == ''
                ? oldData[0].quantity
                : updatedData[0]?.quantity[1],
            quantityRemark:
              updatedData[0].quantityRemark == 'no remark'
                ? oldData[0]?.quantityRemark
                : updatedData[0]?.quantityRemark[1],
            quality:
              updatedData[0].quality == ''
                ? oldData[0].quality
                : updatedData[0]?.quality[1],
            qualityRemark:
              updatedData[0].qualityRemark == 'no remark'
                ? oldData[0]?.qualityRemark
                : updatedData[0]?.qualityRemark[1],
            professional_Skills:
              updatedData[0].professional_Skills == ''
                ? oldData[0]?.professional_Skills
                : updatedData[0]?.professional_Skills[1],
            professionalRemark:
              updatedData[0].professionalRemark == 'no remark'
                ? oldData[0]?.professionalRemark
                : updatedData[0]?.professionalRemark[1],
            approved: true,
          },
          { new: true }
        );

        await TempData.deleteOne({ sprint: sprint, user: user });
        await sendEmails(
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS,
          userToNotify[0].email,
          'Trainee ratings',
          `The updates for ${userToNotify[0].email} has been approved, check new ratings `,
          'Dear Trainee'
        );
        return update;
      })
    ),
    updateToReply: authenticated(
      validateRole('trainee')(
        async (
          root,
          {
            user,
            sprint,
            quantity,
            quantityRemark,
            quality,
            qualityRemark,
            professional_Skills,
            professionalRemark,
            bodyQuality,
            bodyQuantity,
            bodyProfessional,
            orgToken,
          },
          context: { userId: string }
        ) => {
          org = await checkLoggedInOrganization(orgToken);
          const oldData: any = await Rating.find({
            user: user,
            sprint: sprint,
          });
          const updateReply = await Rating.findOneAndUpdate(
            { user: user, sprint: sprint },

            {
              bodyQuality: bodyQuality[0]?.toString(),
              bodyQuantity: bodyQuantity[0]?.toString(),
              bodyProfessional: bodyProfessional[0]?.toString(),
            },
            { new: true }
          );

          const traineee = await User.findOne({ _id:  context.userId });
          const rate = await Rating.findOne({
            user: user,
            sprint: sprint,
          });
          const addNotifications = await Notification.create({
            receiver:rate?.coordinator.toString().replace(/ObjectId\("(.*)"\)/, "$1"),
            message:"Have replied you on your remark",
            sender:traineee,
            read: false,
            createdAt: new Date(),

          });

          pubsub.publish("NEW_RATING", {
            newRating: {
              id: addNotifications._id,
              receiver:rate?.coordinator.toString().replace(/ObjectId\("(.*)"\)/, "$1"),
              message:"Have replied you on your remark",
              sender:traineee,
              read: false,
              createdAt: addNotifications.createdAt,
            }
          });
          return [updateReply];
        }
      )
    ),
    rejectRating: authenticated(
      validateRole('admin')(async (root, { user, sprint }) => {
        const updatedData: any = await TempData.find({
          user: user,
          sprint: sprint,
        });
        const userX = await User.find({ _id: updatedData[0].user });
        const findCoordinatorEmail = await User.find({
          _id: updatedData[0].coordinator,
        });
        if (!userX) throw new Error('User does not exist!');
        await TempData.deleteOne({ user: user, sprint: sprint });
        await sendEmails(
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS,
          findCoordinatorEmail[0].email,
          'Trainee ratings',
          `The updates for ${userX[0].email} has been rejected `,
          'Dear Trainee'
        );
        return `user ${userX[0].email} deleted successfully`;
      })
    ),
  },
};
export default ratingResolvers;
