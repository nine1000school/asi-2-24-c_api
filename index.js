import cors from "cors"
import express from "express"
import config from "./src/config.js"
import Database from "./src/db/Database.js"
import makePostsRoutes from "./src/routes/makePostsRoutes.js"
import makeSignRoutes from "./src/routes/makeSignRoutes.js"
import makeUsersRoutes from "./src/routes/makeUsersRoutes.js"

const app = express()
const db = new Database(config.db.filename)
const ctx = { app, db }

await db.load()

app.use(cors())
app.use(express.json())

makeUsersRoutes(ctx)
makePostsRoutes(ctx)
makeSignRoutes(ctx)

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
