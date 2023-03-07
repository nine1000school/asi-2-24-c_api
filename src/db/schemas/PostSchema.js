import { Schema } from "mongoose"
import UserSchema from "./UserSchema.js"

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
    publishedAt: {
      type: Date,
    },
    user: {
      type: UserSchema,
      required: true,
    },
  },
  { timestamps: true }
)

export default PostSchema
