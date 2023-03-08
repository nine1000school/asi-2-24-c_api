import { Schema } from "mongoose"
import UserDataSchema from "./UserDataSchema.js"

const CommentSchema = new Schema(
  {
    user: {
      type: UserDataSchema,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default CommentSchema
