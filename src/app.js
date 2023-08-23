import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import jobsRoutes from './routes/jobs.routes.js'
import aboutMeRoutes from './routes/aboutme.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import fileUpload from 'express-fileupload';

const app = express()
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads"
}))

app.use("/api", authRoutes)
app.use("/api", jobsRoutes)
app.use("/api", aboutMeRoutes)


export default app;