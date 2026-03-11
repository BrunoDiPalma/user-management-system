import express from "express"
import usersRoutes from "./routes/userRoutes.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", usersRoutes)

export default app