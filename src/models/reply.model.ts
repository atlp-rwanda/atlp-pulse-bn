import mongoose, { Schema } from "mongoose";


const ReplySchema = new Schema({ 
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: mongoose.Types.ObjectId,
    ref: "Rating",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
}
);



export const Notifications = mongoose.model("Notifications", ReplySchema);

