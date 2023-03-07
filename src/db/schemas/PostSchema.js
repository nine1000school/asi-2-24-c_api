import { Schema } from "mongoose"

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
      type: new Schema(
        {
          id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
        },
        { _id: false }
      ),
      required: true,
    },
  },
  { timestamps: true }
)

export default PostSchema
