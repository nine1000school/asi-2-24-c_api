import getResourceByField from "../utils/getResourceByField.js"

const auth = (db) => {
  const getUserByField = getResourceByField(db, "users")
  const getUserBySessionToken = getUserByField("sessionToken")

  return (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
      res.status(403).send({ error: "Forbidden (no session token)" })

      return
    }

    const user = getUserBySessionToken(authorization)

    if (!user) {
      res.status(403).send({ error: "Forbidden (invalid token)" })

      return
    }

    req.user = user

    next()
  }
}

export default auth
