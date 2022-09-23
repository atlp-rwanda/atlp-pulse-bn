import { Comment, Reply } from "../models/comments";




const CommentResolver = {
    Query: {
        async getComments(){
            const Comments = await Comment.find({})
            return Comments;
        
       },
       async getComment(parent:any, args:any){
           const SingleComment = await Comment.findById(args.id)
           if(!SingleComment) throw new Error("Comment not found");
           return SingleComment;
       }
    },
           
    
    Mutation: {
        async addComment(_: any,{body}: any, context: {role: string, userId: string}) {
            const { userId } = context
            if(!userId) throw new Error("You are not logged in!!")
            //  if(context.role !== 'trainee') throw new Error("You are not trainee")
            const newComment = await Comment.create({ body,author:context.userId});
            return newComment; 

        },
        async addReply(_: any,{body}: any, context: {userId: String}){
            const { userId } = context
            if(!userId) throw new Error("You are not logged in!!")

            const newReply = await Reply.create({body,author:context.userId})
            return newReply;

        },
        async deleteComment(parent:any, args:any, context: {userId: String}) {
            const { userId } = context
            if(!userId) throw new Error("You are not logged in!!")
            const findComment= await Comment.findById(args.id); 
            if(!findComment) throw new Error("The Comment you want to delete is not exist")  
            const deleteComment = await Comment.deleteOne({id:args.id});
            return ("The comment has been deleted successfully");
          }
    }
}




export default CommentResolver