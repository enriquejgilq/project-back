import { Router } from "express";
import { login, register, logout, profile, verifyToken, findUserProfile, findUserById } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'


const router = Router()
router.get('/profileuser/:nickname', findUserProfile)
router.get('/findbyid/:id', findUserById)
router.get('/profile', authRequired, profile)
router.get('/verify', verifyToken)
router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)

export default router