import { Router } from 'express'
import { ramdomController } from '../controllers/random.controller.js'

const routerRandoms = Router()

// Randoms
routerRandoms.get('/randoms:cant?', ramdomController)

export default routerRandoms