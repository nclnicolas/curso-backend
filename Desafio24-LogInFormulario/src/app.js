import router from './routes/routes.js'
import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import socket from './sockets/socket.js'
import path from 'path'
import { fileURLToPath } from 'url'
import session from './session.js'

/*+++++++++++++++++++++++++
+ CONFIGURACION DE LA APP +
++++++++++++++++++++++++++*/

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)

const PORT = process.env.PORT || 8080

app.set('view engine', '.ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('port', PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

socket(io)

app.use(session)

app.use('/api', router)

export {
    app,
    http
}