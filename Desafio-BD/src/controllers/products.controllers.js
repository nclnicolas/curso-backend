import fetch from 'node-fetch'
import { productsOptions } from '../database/products.database.js'
import ProductConteiner from '../productConteiner.js'

const client = new ProductConteiner(productsOptions)

const getAllProducts = async (req, res) => {
    try {
        const productos = await client.getAll()
        return productos
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const getProductById = async (req, res) => { // Devuelve un producto segun su id
    const { id } = req.params
    try {
        const producto = await client.getById(id)
        if (producto.length != 0) {
            res.send(producto)
        } else {
            res.status(400).json({ error: 'no existen productos con este id' })
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const productSave = async (req, res) => { // Guarda un producto en la db
    const { title, price, thumbnail } = req.body
    if (!title || !price || !thumbnail) {
        res.status(400).json({ error: 'por favor ingrese todos los datos' })
    } else {
        const data = { title, price, thumbnail }
        try {
            await client.saveProduct(data)
            res.status(200).json({message: 'producto insertado con exito'})
        } catch (error) {
            res.status(400).json({ error: error })
        }
    }
}

const productUpdateById = async (req, res) => {  // Actualiza un producto segun su id
    const { id } = req.params
    const { title, price, thumbnail } = req.body
    if (!title || !price || !thumbnail) {
        res.status(400).json({ error: 'ingrese todos los datos' })
    } else {
        const data = { title, price, thumbnail }
        try {
            await client.updateById(id, data)
            res.status(200).json({message: 'producto actualizado con exito'})
        } catch (error) {
            res.status(400).json({ error: error })
        }
    }
}

const productDeleteById = async (req, res) => { // Elimina u producto segun su id
    const { id } = req.params
    try {
        const producto = await client.getById(id)
        if (producto.length != 0) {
            await client.deleteById(id)
            res.status(200).json({ message: 'producto borrado con exito'})
        } else {
            res.status(400).json({ error: 'no existen productos con este id' })
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const productDeleteAll = async (req, res) => {
    try {
        await client.deleteAll()
        res.status(200).json({ message: 'todos los productos han sido borrados con exito'})
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const saveProductFromForm = async (data) => {
    
    try {
        const response = await fetch('http://localhost:8080/api/productos', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        })
        const result = await response.json()
        return result

    } catch (error) {
        let err = new Error(error)
        return err
    }
}

export const productController = {
    getAllProducts,
    getProductById,
    productSave,
    productUpdateById,
    productDeleteById,
    productDeleteAll,
    saveProductFromForm
}