import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import socket from './sockets/socket.js'
import session from './config/session.js'
import passport from 'passport'
import path from 'path'
import { fileURLToPath } from 'url'
import routerSession from './routes/session.routes.js'
import routerRandoms from './routes/random.routes.js'
import routerInfo from './routes/info.routes.js'
import { args } from './config/yargs.js'

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
/* const PORT = process.env.PORT || 8080*/
app.set('port', args.puerto)

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
app.use('/api', routerSession)
app.use('/api', routerRandoms)
app.use('/', routerInfo)

export { app, http }