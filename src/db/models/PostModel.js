import mongoose from "mongoose"
import PostSchema from "../schemas/PostSchema.js"

const PostModel = mongoose.model("Post", PostSchema)

export default PostModel
