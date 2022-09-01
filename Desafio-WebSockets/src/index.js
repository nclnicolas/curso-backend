import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { engine } from 'express-handlebars'
import { router, productos } from './routes/routes.js'
import { guardarProducto, insertarChat, leerChat } from './functions.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/productos', router)

app.get('/productos', (req, res) => {
  res.render('form')
})

io.on('connection', async (socket) => {
  console.log('a user connected')

  socket.emit('servidor_todos_los_productos', productos)

  const chatINFO = await leerChat()

  socket.emit('servidor_todos_los_mensajes', chatINFO)

  socket.on('cliente_nuevo_producto_guardado', async data => {
    await guardarProducto(data)
    io.sockets.emit('servidor_todos_los_productos', productos)
  })

  socket.on('cliente_nuevo_mensaje_chat', async data => {
    await insertarChat(data)
    io.sockets.emit('servidor_todos_los_mensajes', await leerChat())
  })
})

const connectedServer = http.listen(8080, () => {
  console.log("Servidor http con web sockets listo")
})

connectedServer.on("error", error => console.log)
