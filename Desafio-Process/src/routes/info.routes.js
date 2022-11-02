import { Router } from 'express'
import { infoController } from '../controllers/info.controller.js'

const routerInfo = Router()

// Randoms
routerInfo.get('/info', infoController)

export default routerInfo