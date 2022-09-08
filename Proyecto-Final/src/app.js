import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import productsRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('port', PORT)

app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartRouter)

export default app