import { Schema } from "mongoose"
import CommentSchema from "./CommentSchema.js"
import UserDataSchema from "./UserDataSchema.js"

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    publishedAt: Date,
    user: {
      type: UserDataSchema,
      required: true,
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
)

export default PostSchema
