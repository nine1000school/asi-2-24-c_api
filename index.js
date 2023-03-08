import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import config from "./src/config.js"
import makeCommentsRoutes from "./src/routes/makeCommentsRoutes.js"
import makePostsRoutes from "./src/routes/makePostsRoutes.js"
import makeSignRoutes from "./src/routes/makeSignRoutes.js"

const app = express()
const ctx = { app }

await mongoose.connect(config.db.uri)

app.use(cors())
app.use(express.json())

makeSignRoutes(ctx)
makePostsRoutes(ctx)
makeCommentsRoutes(ctx)

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
