import { Notifications } from "../models/reply.model";


const replyResolver = {
    Query: {
        async getReplies(){
            const Comments = await Notifications.find({})
            return Comments;
        
       },
    },
           
    
    Mutation: {
        async addReply(_: any,{body}: any, context: { userId: String}) {
            const { userId } = context
            if (!userId) throw new Error("You are not authorized to perfom this task")

            const newReply = await Notifications.create({ body,author:context.userId});
            return newReply; 

        },
        async deleteReply(parent:any, args:any, context: {userId: String}) {
            const { userId } = context
            if(!userId) throw new Error("You are not logged in!!")
            const findComment= await Notifications.findById(args.id); 
            if(!findComment) throw new Error("The reply you want to delete does not exist")  
            const deleteComment = await Notifications.deleteOne({id:args.id});
            return ("The reply has been deleted successfully");
          }
    }
}




export default replyResolver