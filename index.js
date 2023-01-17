import express from "express"
import config from "./src/config.js"
import Database from "./src/db/Database.js"
import makeRoutes from "./src/makeRoutes.js"

const app = express()

const db = new Database(config.db.filename)

await db.load()

app.use(express.json())

makeRoutes({ app, db })

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
