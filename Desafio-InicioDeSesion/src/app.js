import router from './routes/routes.js'
import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import socket from './sockets/socket.js'
import path from 'path'
import { fileURLToPath } from 'url'
import session from './config/session.js'
import passport from 'passport'

/*+++++++++++++++++++++++++
+ CONFIGURACION DE LA APP +
++++++++++++++++++++++++++*/

// Inicializacion
const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)
socket(io)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuracion
const PORT = process.env.PORT || 8080
app.set('port', PORT)

app.set('views', path.join(__dirname, 'views'))

// Configuracion de template
app.set('view engine', '.ejs')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Rutas
app.use('/api', router)

export { app, http }