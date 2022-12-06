import { FsConteiner } from "../../conteiners/fsConteiner.js"
import { dbsConfig } from "../../config.js"

const cartsdb = dbsConfig.fileSystem.pathCart
const prodcutsdb = new FsConteiner(dbsConfig.fileSystem.pathProduct)

class CartDaoFs extends FsConteiner {

    constructor() {
        super(cartsdb)
    }

    async saveCart (req, res) {    // Esta funcion guarda un carrito nuevo

        const cart = { products: [] }
        try {
            await super.save(cart)
            const db = await super.getAll()
            res.status(200).json({ messaje: `carrito creado con éxito, ID: ${db[db.length - 1].id}` })
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }
    
    async deleteCartById (req, res) {   // Esta funcion elimina un carrito segun su ID
    
        const { id } = req.params                                                                   // Tomamos el ID
        try { 
            if(await super.getByID(id)) {
                await super.deleteById(id)
                res.status(200).json({ messaje: 'carrito borrado con exito'})
            } else {
                res.status(400).json({ error: 'carrito no encontrado' })
            }
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
    
    async getProductsFromCart (req, res) { // Esta funcion muestra todos los productos de un carrito
    
        const { id } = req.params                                // Tomamos el ID
        try {
            const db = await super.getByID(id)
            res.send(db.products)
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
    
    async saveProductInCartByID (req, res) { // Esta funcion guarda un producto en un carrito
        const { id } = req.params                                           // Tomamos el ID
        const { arrID } = req.body                                          // Tomamos el array de productos a guardar
    
        try {
            const cart = await super.getByID(id)
            if (cart) {
                for (let i=0; i<arrID.length; i++) {
                    let prod = await prodcutsdb.getByID(arrID[i])
                    cart.products.push(prod)
                    
                }
                await super.updateById(id, cart)
                res.status(200).json({ messaje: 'productos agregados con exito'})
            } else {
                res.status(400).json({ error: 'carrito no encontrado' })
            }
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
    
    async deleteProductFromCartByID (req, res) { // Esta funcion borra un producto de un carrito
    
        const { id, id_prod } = req.params
    
        try {
            const cart = await super.getByID(id)
            if (cart) {                                                                             // En caso de encontrarlo
                const prodIndex = cart.products.findIndex(product => product.id == id_prod)         // Buscamos el indice del producto en el array
                if (prodIndex != -1) {                                                              // En caso de encontra run producto lo borramos
                    cart.products.splice(prodIndex, 1)
                    await super.updateById(id, cart)
                    res.status(200).json({ messaje: 'producto borrado con éxito' })
                } else {
                    res.status(400).json({ error: 'producto no encontrado' })
                }
            } else {
                res.status(400).json({ error: 'carrito no encontrado' })
            }
    
        } catch (error) {
    
        }
    }
}

export default CartDaoFs