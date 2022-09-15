import { Router } from 'express'
import { productController } from '../controllers/products.controllers.js'

const router = Router()

// GET '/api/productos' -> devuelve todos los productos.
router.get('/', productController.getAllProducts)

// GET '/api/productos/:id' -> devuelve un producto según su id.
router.get('/:id', productController.getProductById)

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post('/', productController.productSave)

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put('/:id', productController.productUpdateById)

// DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/:id', productController.productDeleteById)

// DELETE '/api/productos/' -> borra todos los productos de la tabla
router.delete('/', productController.productDeleteAll)

export default router