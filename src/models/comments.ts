import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    performanceReview: {
      type: mongoose.Types.ObjectId,
      ref: "Performance",
      required: true,
    },
    author: {
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
    timestamps: true,
  }
);

const ReplySchema = new Schema({
  comment: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model("Comment", CommentSchema);
export const Reply = mongoose.model("Reply", ReplySchema);

