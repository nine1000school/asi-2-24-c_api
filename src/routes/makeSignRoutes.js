import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import UserModel from "../db/models/UserModel.js"
import hashPassword from "../utils/hashPassword.js"

const makeSignRoutes = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const { email, password } = req.body
    const passwordHash = hashPassword(password)

    await UserModel.create({ email, passwordHash })

    res.send({ result: true })
  })

  app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body
    const passwordHash = hashPassword(password)
    const user = await UserModel.findOne({ email })

    if (!user || user.passwordHash !== passwordHash) {
      res.status(401).send({ error: "Invalid credentials" })

      return
    }

    const sessionToken = jsonwebtoken
      .sign(
        {
          payload: {
            userId: user.id,
          },
        },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn }
      )
      .toString("hex")

    res.send({ result: sessionToken })
  })
}

export default makeSignRoutes
