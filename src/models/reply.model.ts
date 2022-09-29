import mongoose, { Schema } from "mongoose";


const ReplySchema = new Schema({ 
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  remark: {
    type: String,
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

