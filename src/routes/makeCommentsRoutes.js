import config from "../config.js"
import PostModel from "../db/models/PostModel.js"
import auth from "../middlewares/auth.js"

const makeCommentsRoutes = ({ app }) => {
  // CREATE
  app.post("/comments", auth, async (req, res) => {
    const {
      user,
      body: { content },
      query: { postId },
    } = req
    const post = await PostModel.findOne({ _id: postId })

    if (!post) {
      res.status(404).send({ error: "Not found" })

      return
    }

    const comment = {
      user: {
        id: user._id,
        name: user.name,
      },
      content,
    }
    const result = await PostModel.updateOne(
      {
        _id: post.id,
      },
      {
        $push: {
          comments: comment,
        },
      }
    )

    res.send({ result })
  })
  // READ collection
  app.get("/comments", async (req, res) => {
    const { postId, limit = config.pagination.limit, page = 1 } = req.query
    const post = await PostModel.findOne({ _id: postId })

    if (!post) {
      res.status(404).send({ error: "Not found" })

      return
    }

    const comments =
      post.comments?.slice((page - 1) * limit, page * limit) || []

    res.send({ result: comments })
  })
  // UPDATE
  app.patch("/comments/:commentId", auth, async (req, res) => {
    const {
      params: { commentId },
      query: { postId },
      body: { content },
      user,
    } = req
    const post = await PostModel.findOne({
      _id: postId,
      "user.id": user._id,
    })
    const commentIndex = post?.comments?.findIndex(
      ({ _id }) => _id?.toHexString() === commentId
    )
    const comment = post?.comments?.[commentIndex]

    if (!post || !comment) {
      res.status(404).send({ error: "Not found" })

      return
    }

    await PostModel.updateOne(
      { _id: post._id },
      { [`comments.${commentIndex}.content`]: content }
    )

    comment.content = content

    res.send({ result: comment })
  })

  // DELETE
  app.delete("/comments/:commentId", auth, async (req, res) => {
    const {
      params: { commentId },
      query: { postId },
      user,
    } = req
    const post = await PostModel.findOne({
      _id: postId,
      "user.id": user._id,
    })
    const comment = post?.comments?.find(
      ({ _id }) => _id?.toHexString() === commentId
    )

    if (!post || !comment) {
      res.status(404).send({ error: "Not found" })

      return
    }

    await PostModel.updateOne(
      { _id: post._id },
      {
        $pull: {
          comments: { _id: comment._id },
        },
      }
    )

    res.send({ result: comment })
  })
}

export default makeCommentsRoutes
