import { Router } from "express";
import { createJobs, deleteJobs, getAlljobssByNickName, getJob, getJobs, updatejobs } from '../controllers/jobs.controller.js'
import { authRequired } from "../middlewares/validateToken.js";
import fileUpload from 'express-fileupload';

const router = Router();
router.get('/jobs', authRequired, getJobs)  //All data with autentication

router.get('/jobs/:id', getJob) //data detail 

router.get('/alljobs/:nickname', getAlljobssByNickName) // all data user

router.post('/jobs', authRequired, fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads"
}), createJobs)

router.delete('/jobs/:id', authRequired, deleteJobs)

router.put('/jobs/:id', authRequired, updatejobs)

export default router