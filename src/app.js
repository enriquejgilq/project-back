import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import jobsRoutes from './routes/jobs.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser())
app.use("/api", authRoutes)
app.use("/api", jobsRoutes)


export default app;