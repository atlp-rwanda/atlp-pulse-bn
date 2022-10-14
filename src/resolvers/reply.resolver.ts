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
                rating: string | ObjectId;
                userEmail: string | ObjectId;
                sprint: IntegerType | ObjectId;
                quantityRemark: string | ObjectId;
                qualityRemark: string | ObjectId;
                professionalRemark: string | ObjectId;
                bodyQuantity: string;
                bodyQuality: string;
                bodyProfessional: string;
                
            },
            context: Context,
        ) => {
            try {
                const {userEmail, rating,sprint,quantityRemark, qualityRemark, professionalRemark, bodyQuantity, bodyQuality, bodyProfessional} = args;
                (await checkUserLoggedIn(context))(['trainee'])
                const remarkToReplyOn = await Rating.find({ where: { id: rating} })
                if (!remarkToReplyOn) throw new Error("The remark you want to reply on, no longer exist!")
                const newReply = new Notifications({
                    user: context.userId,
                    sprint,
                    rating,
                    quantityRemark: remarkToReplyOn[0].quantityRemark,
                    qualityRemark: remarkToReplyOn[0].qualityRemark,
                    professionalRemark: remarkToReplyOn[0].professionalRemark,
                    bodyQuantity,
                    bodyQuality,
                    bodyProfessional,


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