/* eslint-disable */
import { systemRating } from '../models/ratingSystem';


const createRatingSystemresolver = {
    Query: {
        async getRatingSystems(){
            const ratingSystems = await systemRating.find({});
            return ratingSystems;
          },
         async getRatingSystem(parent:any, args:any){
          const ratingSystem = await systemRating.findById(args.id)
          if(!ratingSystem) throw new Error("This rating system doesn't exist");
          return ratingSystem;


         }
    },
    Mutation: {
        async createRatingSystem(_: any,{name,grade,description,percentage}: any, context: {role: string,userId: string}) {
            if(context.role !== 'admin') throw new Error("You are not allowed to perform this action")
            const ratingSystemExists = await systemRating.findOne({ name: name });
            if (ratingSystemExists) throw new Error("Rating system already exists");
            const newRatingSystem = await systemRating.create({ name,grade,description,percentage,userId:context.userId});
            return newRatingSystem;
          },
          async deleteRatingSystem(parent:any, args:any){
            const ratingSystem= await systemRating.findById(args.id);
            if(!ratingSystem) throw new Error("This rating system doesn't exist")
            const deleteRatingSystem = await systemRating.deleteOne({id:args.id});
            return ("You have successfully deleted this rating system");
          }
},
}
export default createRatingSystemresolver