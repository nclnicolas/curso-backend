/* import { Router } from 'express'
import { ramdomController } from '../controllers/random.controller.js' */

const { Router } = require('express')
const { ramdomController } = require('../controllers/random.controller.js')

const routerRandoms = Router()

// Randoms
routerRandoms.get('/randoms:cant?', ramdomController)

module.exports = routerRandoms