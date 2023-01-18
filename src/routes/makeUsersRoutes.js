import createResource from "../utils/createResource.js"
import getResourceById from "../utils/getResourceById.js"
import updateResourceById from "../utils/updateResourceById.js"

const makeUsersRoutes = ({ app, db }) => {
  const getUserById = getResourceById(db, "users")
  const updateUserById = updateResourceById(db, "users")
  const createUser = createResource(db, "users")

  // CREATE
  app.post("/users", async (req, res) => {
    const { email } = req.body
    const user = await createUser({ email })

    res.send(user)
  })

  // READ collection
  app.get("/users", async (req, res) => {
    res.send(db.data.users)
  })

  // READ single
  app.get("/users/:userId", async (req, res) => {
    const { userId } = req.params
    const user = getUserById(userId, res)

    if (!user) {
      return
    }

    res.send(user)
  })

  // UPDATE patch
  app.patch("/users/:userId", async (req, res) => {
    const { userId } = req.params
    const { email, password } = req.body
    const updatedUser = await updateUserById(userId, { email, password }, res)

    if (!updatedUser) {
      return
    }

    res.send(updatedUser)
  })

  // DELETE
  app.delete("/users/:userId", async (req, res) => {
    const { userId } = req.params
    const user = getUserById(userId, res)

    if (!user) {
      return
    }

    await db.write({
      users: {
        [userId]: undefined,
      },
    })

    res.send(user)
  })
}

export default makeUsersRoutes
