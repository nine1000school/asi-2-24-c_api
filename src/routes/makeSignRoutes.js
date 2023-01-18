import { randomBytes } from "node:crypto"
import config from "../config.js"
import createResource from "../utils/createResource.js"
import hashPassword from "../utils/hashPassword.js"
import updateResourceById from "../utils/updateResourceById.js"

const makeSignRoutes = ({ app, db }) => {
  const createUser = createResource(db, "users")
  const updateUserById = updateResourceById(db, "users")

  app.post("/sign-up", async (req, res) => {
    const { email, password } = req.body
    const passwordHash = hashPassword(password)

    await createUser({ email, passwordHash })

    res.send({ result: true })
  })

  app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body
    const passwordHash = hashPassword(password)
    const user = Object.values(db.data.users).find(
      (user) => user.email === email
    )

    if (user.passwordHash !== passwordHash) {
      res.status(401).send({ error: "Invalid credentials" })

      return
    }

    const sessionToken = randomBytes(
      config.security.session.tokenLength
    ).toString("hex")

    await updateUserById(user.id, { sessionToken })

    res.send({ result: sessionToken })
  })
}

export default makeSignRoutes
