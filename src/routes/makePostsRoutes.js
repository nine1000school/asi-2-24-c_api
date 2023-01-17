import createResource from "../utils/createResource.js"
import getResourceById from "../utils/getResourceById.js"

const makePostsRoutes = ({ app, db }) => {
  const getPostById = getResourceById(db, "posts")
  const createPost = createResource(db, "posts")

  // CREATE
  app.post("/posts", async (req, res) => {
    const { title, content, author } = req.body
    const post = await createPost({ title, content, author })

    res.send(post)
  })
}

export default makePostsRoutes
