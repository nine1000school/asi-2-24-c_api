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

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
