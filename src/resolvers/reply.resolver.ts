import { Notifications } from "../models/reply.model";
import { Rating, TempData } from "../models/ratings";
import { User } from "../models/user"
import { IntegerType, ObjectId } from 'mongodb'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { Context } from './../context'
import { ApolloError } from "apollo-server";
import { Error } from "mongoose";


const replyResolver = {
    Query: {
        async getReplies(_:any,args: any,context: Context)  {
            (await checkUserLoggedIn(context))(['coordinator', 'trainee'])
            const replies = await Notifications.find({})
            return replies;
        
       },
    },
           
    
    Mutation: {
        addReply: async (
            _: any,
            args: {
                userEmail: string | ObjectId;
                sprint: IntegerType | ObjectId;
                quantityRemark: string | ObjectId;
                qualityRemark: string | ObjectId;
                professionalRemark: string | ObjectId;
                coordinator: string | ObjectId;
                body: string;
                
            },
            context: Context,
        ) => {
            try {
                const {userEmail,sprint, coordinator,quantityRemark, qualityRemark, professionalRemark, body} = args;
                (await checkUserLoggedIn(context))(['trainee'])
                const remarkToReplyOn = await Rating.find({ where: { user: userEmail, sprint: sprint } })
                const forCoordinator = await User.findOne({ email: coordinator, role: "coordinator" })
                
                if(!forCoordinator) throw new Error("This coordinator does not exist")

                const newReply = new Notifications({
                    user: context.userId,
                    sprint,
                    quantityRemark: remarkToReplyOn[0].quantityRemark,
                    qualityRemark: remarkToReplyOn[0].qualityRemark,
                    professionalRemark: remarkToReplyOn[0].professionalRemark,
                    coordinator: forCoordinator?.id,
                    body,

                })
                return newReply.save()
            } catch (error) {
                const { message } = error as { message: any }
                throw new ApolloError(message.toString(), '500')
            }
        },

        async deleteReply(parent:any, args:any, context: Context) {
            (await checkUserLoggedIn(context))(['coordinator', 'trainee'])
            const findComment= await Notifications.findById(args.id); 
            if(!findComment) throw new Error("The reply you want to delete does not exist")  
            const deleteComment = await Notifications.deleteOne({id:args.id});
            return ("The reply has been deleted successfully");
          }
    }
}




export default replyResolver