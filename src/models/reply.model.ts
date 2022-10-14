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
  bodyQuantity: {
    type: String,
    required: false,
  },

  bodyQuality: {
    type: String,
    required: false,
  },

  bodyProfessional: {
    type: String,
    required: false,
  },
},
{
  timestamps: true
}
);



export const Notifications = mongoose.model("Notifications", ReplySchema);

