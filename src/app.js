import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import jobsRoutes from './routes/jobs.routes.js'
import aboutMeRoutes from './routes/aboutme.routes.js'
import cookieParser from 'cookie-parser';


const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use(cors({
        origin: true,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Authorization', 'Content-type', 'company-path'],
        exposedHeaders: ['Authorization'],
    }));
} else {
    app.use(cors({ origin: process.env.CORS_ORIGIN_DEV, credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', }))
}
app.use(cookieParser())
app.use(morgan("dev"));
app.use(express.json())



app.use("/api", authRoutes)
app.use("/api", jobsRoutes)
app.use("/api", aboutMeRoutes)


export default app;