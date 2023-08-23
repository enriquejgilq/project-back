import { Router } from "express"
import { getAllAboutme, getAboutme, getAboutmePublic, createAboutMe, deleteAboutMe, updateAboutme } from '../controllers/aboutme.controller.js'
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();
router.get('/aboutme', authRequired, getAllAboutme) //Todos los resultados

router.get('/aboutme/:id', authRequired, getAboutme) //resultado por id

router.get('/aboutmepublic/:nickname', getAboutmePublic) //el ultimo guardado publico por nickname

router.post('/aboutme', authRequired, createAboutMe) //crear 

router.delete('/aboutme/:id', authRequired, deleteAboutMe) //borrar 

router.put('/aboutme/:id', authRequired, updateAboutme) //actualizar

export default router