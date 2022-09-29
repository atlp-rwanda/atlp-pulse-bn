import mongoose, { Schema } from "mongoose";


const ReplySchema = new Schema({ 
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  remark: {
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



export const Reply = mongoose.model("Reply", ReplySchema);

