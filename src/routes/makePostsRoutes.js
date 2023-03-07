import config from "../config.js"
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
        id: user._id,
        name: user.name,
      },
    })

    res.send({ result: post })
  })

  // READ collection
  app.get("/posts", async (req, res) => {
    const { author, limit = config.pagination.limit, page = 1 } = req.query

    const posts = await PostModel.find(author ? { "user.id": author } : {})
      .limit(limit)
      .skip((page - 1) * limit)

    res.send({ result: posts })
  })

  // READ single
  app.get("/posts/:postId", async (req, res) => {
    const { postId } = req.params

    try {
      const post = await PostModel.findOne({ _id: postId })

      if (!post) {
        res.status(404).send({ error: "Not found" })

        return
      }

      res.send({ result: post })
    } catch (err) {
      if (err.name === "CastError") {
        res.status(422).send({ error: "Invalid argument" })

        return
      }

      console.error(err)

      res.status(500).send({ error: "Oops. Something went wrong." })
    }
  })

  const obj = {
    x: 123,
  }

  obj.o = obj

  // UPDATE patch
  app.patch("/posts/:postId", auth, async (req, res) => {
    const {
      user,
      params: { postId },
      body: { title, content },
    } = req

    try {
      const post = await PostModel.findOne({
        _id: postId,
        "user.id": user._id,
      })

      if (!post) {
        res.status(404).send({ error: "Not found" })

        return
      }

      post.title = title ?? post.title
      post.content = content ?? post.content
      const updatedPost = await post.save()

      res.send({ result: updatedPost })
    } catch (err) {
      if (err.name === "CastError") {
        res.status(422).send({ error: "Invalid argument" })

        return
      }

      console.error(err)

      res.status(500).send({ error: "Oops. Something went wrong." })
    }
  })

  // DELETE
  app.delete("/posts/:postId", auth, async (req, res) => {
    const { postId } = req.params

    try {
      const post = await PostModel.findOne({ _id: postId })

      if (!post) {
        res.status(404).send({ error: "Not found" })

        return
      }

      await post.deleteOne()

      res.send({ result: post })
    } catch (err) {
      if (err.name === "CastError") {
        res.status(422).send({ error: "Invalid argument" })

        return
      }

      console.error(err)

      res.status(500).send({ error: "Oops. Something went wrong." })
    }
  })
}

export default makePostsRoutes
