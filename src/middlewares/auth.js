import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import UserModel from "../db/models/UserModel.js"

const auth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(403).send({ error: "Forbidden" })

    return
  }

  try {
    const { payload } = jsonwebtoken.verify(
      authorization,
      config.security.jwt.secret
    )
    const user = await UserModel.findOne({ _id: payload.userId })

    if (!user) {
      res.status(403).send({ error: "Forbidden" })

      return
    }

    req.user = user

    next()
  } catch (err) {
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      res.status(403).send({ error: "Forbidden" })

      return
    }

    console.error(err)

    res.status(500).send({ error: "Oops. Something wrong." })
  }
}

export default auth
