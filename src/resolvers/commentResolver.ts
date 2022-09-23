import { Comment, Reply, Performance } from "../models/comments";




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
       },
       async getReplies(){
           const Replies = await Reply.find({})
           return Replies;
       }
           
    },
    Mutation: {
        async addComment(_: any,{body,timestamps}: any, context: {author: string}) {
            const newComment = await Comment.create({ body,timestamps,author:context.author});
            return newComment;

        },
        // async addReply(){

        // },
        async deleteComment(parent:any, args:any) {
            const findComment= await Comment.findById(args.commentId); 
            if(!findComment) throw new Error("The Comment you want to delete is not exist")  
            const deleteComment = await Comment.deleteOne({id:args.commentId});
            return ("The comment has been deleted successfully");
          }
    }
}




export default CommentResolver