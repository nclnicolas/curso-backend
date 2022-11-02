import { Router } from 'express'
import { logout, signin, signup, auth, sessionController } from '../controllers/user.controller.js'

/*+++++++++++
+ ENRUTADOR +
++++++++++++*/

const routerSession = Router()

routerSession.get('/productos-test', auth, sessionController)

// Registro
routerSession.get('/error-registro', (req, res) => res.render('errorRegistro'))
routerSession.get('/registro', (req, res) => res.render('registro'))
routerSession.post('/registro', signup)

// Login
routerSession.get('/error-login', (req, res) => res.render('errorlogin'))
routerSession.get('/login', (req, res) => res.render('login'))
routerSession.post('/login', signin)

// Logout
routerSession.get('/logout', logout)

export default routerSession