import mongoose, { Schema } from "mongoose";
const systemRating = mongoose.model(
    "systemRating",
    new Schema({
      name: {
        type: String,
        required: true,
        unique: true,
      },
      grade: {
        type:[Number],
        required: true,
      },
      description: {
        type:[String],
        required:true,
      },
      percentage: {
        type:[Number],
        required:true
      },
    })
  );
  export {systemRating}