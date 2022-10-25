import { Router } from 'express'
import { logout, signin, signup, auth, sessionController } from '../controllers/user.controller.js'

/*+++++++++++
+ ENRUTADOR +
++++++++++++*/

const router = Router()

router.get('/productos-test', auth, sessionController)

// Registro
router.get('/error-registro', (req, res) => res.render('errorRegistro'))
router.get('/registro', (req, res) => res.render('registro'))
router.post('/registro', signup)

// Login
router.get('/error-login', (req, res) => res.render('errorlogin'))
router.get('/login', (req, res) => res.render('login'))
router.post('/login', signin)

// Logout
router.get('/logout', logout)

export default router