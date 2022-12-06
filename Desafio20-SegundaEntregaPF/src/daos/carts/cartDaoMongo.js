import { MongoConteiner } from "../../conteiners/mongoConteiner.js"
import { cart } from '../../models/Cart.js'
import { product } from '../../models/Products.js'
import ProductDaoMongo from '../products/productDaoMongo.js'

const prodCollection = new ProductDaoMongo(product)

class CartDaoMongo extends MongoConteiner {

    constructor() {
        super(cart)
    }

    async saveCart(req, res) {
        try {
            const info = await super.save({ products: [] })
            res.send(info)
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
        
    }
    
    async deleteCartById (req, res) {   // Esta funcion elimina un carrito segun su ID
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ error: 'Es necesario un _id'}) 
            } else {
                await super.deleteById(id)
                res.status(200).json({ error: 'Carrito borrado con exito'})
            }
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }
    
    async getProductsFromCart (req, res) { // Esta funcion muestra todos los productos de un carrito
    
        const { id } = req.params                                
        try {
            const cart = await super.getById(id)
            res.send(cart[0].products)
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }
    
    async saveProductInCartByID (req, res) { // Esta funcion guarda un producto en un carrito
        const { id } = req.params                                           
        const { arrID } = req.body                                          
    
        try {
            const cart = await super.getById(id)
            if (cart) {
                for (let i=0; i<arrID.length; i++) {
                    let prod = await prodCollection.getById(arrID[i])
                    cart[0].products.push(prod[0])
                }
                await super.updateById(cart[0])
                res.status(200).json({ messaje: 'productos agregados con exito'})
            } else {
                res.status(400).json({ error: 'carrito no encontrado' })
            }
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }
    
    async deleteProductFromCartByID (req, res) { // Esta funcion borra un producto de un carrito
    
        const { id, id_prod } = req.params
    
        try {
            const cart = await super.getById(id)
            if (cart) {                                                                             
                const prodIndex = cart[0].products.findIndex(product => product._id == id_prod)         
                if (prodIndex != -1) {                                                              
                    cart[0].products.splice(prodIndex, 1)
                    await super.updateById(cart[0])
                    res.status(200).json({ messaje: 'producto borrado con éxito' })
                } else {
                    res.status(400).json({ error: 'producto no encontrado' })
                }
            } else {
                res.status(400).json({ error: 'carrito no encontrado' })
            }
    
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }   
    }
}

export default CartDaoMongo