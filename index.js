import chalk from "chalk"
import express from "express"
import config from "./src/config.js"
import Database from "./src/db/Database.js"
import makePostsRoutes from "./src/routes/makePostsRoutes.js"
import makeUsersRoutes from "./src/routes/makeUsersRoutes.js"

const app = express()

const db = new Database(config.db.filename)

await db.load()

app.use(express.json())

makeUsersRoutes({ app, db })
makePostsRoutes({ app, db })
// makeCommentsRoutes({ app, db })
/////////////////////////////////////////////////////////

let requestCount = 0

const log = (req, res, next) => {
  requestCount += 1

  console.log(
    `${chalk.bgWhite.black(
      `#${String(requestCount).padStart(4, "0")}`
    )} ${chalk.blue(req.method)} ${req.url}`
  )

  next()
}

app.use(log)

let sessions = []

const auth = (req, res, next) => {
  const sessionToken = req.headers["x-session"]

  if (!sessions.includes(sessionToken)) {
    res.status(403).send({ error: "Invalid session token" })

    return
  }

  next()
}

app.post("/sign-in", (req, res) => {
  const { secret } = req.body

  if (secret !== "i-am-an-idiot-sandwich") {
    res.status(401).send({ error: "Invalid credentials" })

    return
  }

  const sessionToken = String(Math.random())
  sessions.push(sessionToken)

  res.send({ sessionToken })
})

app.get("/public", (req, res) => {
  res.send("PUBLIC")
})

app.get("/private", auth, (req, res) => {
  res.send("PRIVATE")
})

/////////////////////////////////////////////////////////
app.listen(config.port, () => console.log(`Listening on :${config.port}`))
