import { Router } from 'express'
import { infoController } from '../controllers/info.controller.js'
import compression from 'compression'

const routerInfo = Router()

// Randoms
routerInfo.get('/', compression(), infoController)

export default routerInfo