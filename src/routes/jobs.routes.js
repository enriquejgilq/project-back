import { Router } from "express";
import { createJobs, deleteJobs, getAlljobssById, getJob, getJobs, updatejobs } from '../controllers/jobs.controller.js'
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();
router.get('/jobs', authRequired, getJobs)  //All data with autentication

router.get('/jobs/:id', getJob) //data detail 

router.get('/alljobs/:id', getAlljobssById) // all data user

router.post('/jobs', authRequired, createJobs)

router.delete('/jobs/:id', authRequired, deleteJobs)

router.put('/jobs/:id', authRequired, updatejobs)

export default router