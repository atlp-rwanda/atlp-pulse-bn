import mongoose, { Schema } from "mongoose";


const ReplySchema = new Schema({ 
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  sprint: {
   type: Number,
   required: true,
  },
  quantityRemark: {
    type: String,
    required: false,
  },
  qualityRemark: {
    type: String,
    required: false,
  },
  professionalRemark: {
    type: String,
    required: false,
  },
  coordinator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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

