import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import config from "./src/config.js"
import makePostsRoutes from "./src/routes/makePostsRoutes.js"
import makeSignRoutes from "./src/routes/makeSignRoutes.js"
import makeUsersRoutes from "./src/routes/makeUsersRoutes.js"

const app = express()
const ctx = { app }

await mongoose.connect(config.db.uri)

app.use(cors())
app.use(express.json())

makeUsersRoutes(ctx)
makePostsRoutes(ctx)
makeSignRoutes(ctx)

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
