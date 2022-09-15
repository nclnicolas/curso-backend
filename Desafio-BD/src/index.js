import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { engine } from 'express-handlebars'
import router from './routes/routes.js'
import { chatControllers } from './controllers/chat.controllers.js'
import { productController } from './controllers/products.controllers.js'
import path from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({path: '../.env' })

const PORT = process.env.PORT || 8080

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

  const productos = await productController.getAllProducts()

  socket.emit('servidor_todos_los_productos', productos)

  const chatINFO = await chatControllers.chatRead()

  socket.emit('servidor_todos_los_mensajes', chatINFO)

  socket.on('cliente_nuevo_producto_guardado', async data => {
    await productController.saveProductFromForm(data)
    io.sockets.emit('servidor_todos_los_productos', await productController.getAllProducts())
  })

  socket.on('cliente_nuevo_mensaje_chat', async data => {
    await chatControllers.messageInsert(data)
    io.sockets.emit('servidor_todos_los_mensajes', await chatControllers.chatRead())
  })
})

const connectedServer = http.listen(PORT, () => {
  console.log("Servidor http con web sockets listo, escuchando en puerto: ", PORT)
})

connectedServer.on("error", error => console.log)