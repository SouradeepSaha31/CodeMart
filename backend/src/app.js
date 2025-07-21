import express from 'express'
const app = express()
import cors from 'cors' 
import cookieParser from 'cookie-parser'

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
))
app.use(express.json({limit:"30kb"}))
app.use(express.urlencoded({ extended: true, limit: "30kb" }))
app.use(express.static('public'))
app.use(cookieParser())

import { userRouter } from "./routers/user.route.js"

app.use("/api/v1/user", userRouter);



export {app}