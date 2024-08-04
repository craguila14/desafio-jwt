import express from 'express';
const router = express.Router();
import { controller } from '../controllers/controller.js';
import { validateUser } from '../middlewares/validateUser.js';
import { validateToken } from '../middlewares/validateToken.js'

router.post('/usuarios', validateUser, controller.register)
router.post('/login', controller.login )
router.get('/usuarios', validateToken, controller.profile)

export default router

