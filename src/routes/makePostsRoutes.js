import PostModel from "../db/models/PostModel.js"
import auth from "../middlewares/auth.js"

const makePostsRoutes = ({ app }) => {
  // CREATE
  app.post("/posts", auth, async (req, res) => {
    const { title, content } = req.body
    const user = req.user
    const post = await PostModel.create({
      title,
      content,
      user: {
        _id: user._id,
        name: user.name,
      },
    })

    res.send(post)
  })

  // READ collection
  app.get("/posts", (req, res) => {
    const { author, limit = 2, page = 1 } = req.query
    const rows = Object.values(db.data.posts)
    const result = author ? rows.filter((post) => post.author === author) : rows

    res.send(result.slice((page - 1) * limit, page * limit))
  })

  // READ single
  app.get("/posts/:postId", (req, res) => {
    const { postId } = req.params
    const post = getPostById(postId, res)

    if (!post) {
      return
    }

    res.send(post)
  })

  // UPDATE patch
  app.patch("/posts/:postId", auth, async (req, res) => {
    const { postId } = req.params
    const { title, content, author } = req.body
    const updatedPost = await updatePostById(
      postId,
      { title, content, author },
      res
    )

    if (!updatedPost) {
      return
    }

    res.send(updatedPost)
  })

  // DELETE
  app.delete("/posts/:postId", auth, async (req, res) => {
    const { postId } = req.params
    const post = getPostById(postId, res)

    if (!post) {
      return
    }

    await db.write({
      posts: {
        [postId]: undefined,
      },
    })

    res.send(post)
  })
}

export default makePostsRoutes
