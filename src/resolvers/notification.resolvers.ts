
// import { Notification} from '../models/notification.model'
// import { authenticated, validateRole } from '../utils/validate-role';

// const notificationResolvers: any = {
//     Query: {
//         getSingleNotification: async (parent: any, args: any, context: any) => {
//             const { userId }: any = context
//             if (!userId) {
//                 throw new Error('You need to login first')
//             }
//             const notification = await Notification.findOne({ user: userId })
//             return notification
//         },
//         async getAllNotification() {
//             const Notifications = await Notification.find({});
//             return Notifications 
//         },   
//     },
//     Mutation: {
//             createNotification : authenticated( 
//                 validateRole('coordinator') (async (root, {
//                     image,
//                     name,
//                     message,
//                     date
//                 },
                    
//                    context: {userId:String})=>{
//                        const saveNotification = await Notification.create({
//                         image,
//                         name,
//                         message,
//                         date
//                        })
//                        return saveNotification;
//                    })
//             )


//     },
//   };

// export default notificationResolvers;