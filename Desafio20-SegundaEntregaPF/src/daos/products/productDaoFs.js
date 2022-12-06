import { FsConteiner } from "../../conteiners/fsConteiner.js"
import { dbsConfig } from "../../config.js"

const prodcutsdb = dbsConfig.fileSystem.pathProduct

const administrador = true

class ProductDaoFs extends FsConteiner {

    constructor() {
        super(prodcutsdb)
    }

    async getProductById (req, res) {  // Esta funcion devuelve un producto segun su ID
        const { id } = req.params
        try {
            if (!id) {
                res.send(await super.getAll())                         // en caso de no pasar id devolvemos todos los productos
            } else {
                const product = await super.getByID(id)
                if (product) {
                    res.send(product)
                } else {
                    res.status(400).json({ error: 'producto no encontrado' })
                }
            }
    
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }
    
    async saveProduct (req, res) {        // Guarda un prodcuto nuevo
        if (administrador == true) {
            const { name, price, urlImage, description, code, stock } = req.body                              // Tomamos el cuerpo
    
            if (!name || !price || !urlImage || !description || !code || !stock) {                          // Comprobamos que el cuerpo este completo
                res.status(400).json({ error: 'por favor ingrese todos los datos del producto' })
            } else {
    
                const product = req.body                                                                      // Tomamos el cuerpo 
                try {
                    await super.save(product)                                                              // Se lo pasamos al contendor
                    res.status(200).json({ messaje: 'producto guardado con exito' })
                } catch (error) {
                    res.status(400).json({ error: `${error}` })
                }
            }
        } else {
            res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
        }
    }
    
    async updateProductByID (req, res) {  // Recibe y actualiza un producto según su id.
        if (administrador == true) {
            const { id } = req.params                                                                   // Tomamos el ID
            const { name, price, urlImage, description, code, stock } = req.body                        // Tomamos el cuerpo
    
            if (!name || !price || !urlImage || !description || !code || !stock) {                    // Comprobamos que el cuerpo este completo
                res.status(400).json({ error: 'por favor ingrese todos los datos del producto' })
            } else {
                try {
                    const product = await super.getByID(id)
                    if (product) {
                        product.name = name
                        product.price = price
                        product.urlImage = urlImage
                        product.description = description
                        product.code = code
                        product.stock = stock
                        await super.updateById(id, product)
                        res.status(200).json({ messaje: 'producto actualizado con exito' })
                    } else {
                        res.status(400).json({ error: 'producto no encontrado' })
                    }
                } catch (error) {
                    res.status(400).json({ error: `${error}` })
                }
            }
        } else {
            res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
        }
    }
    
    async deleteProductById (req, res) {   // Esta funcion elimina un producto segun su ID
        if (administrador == true) {
            const { id } = req.params
            try {
                await super.deleteById(id)
                res.status(200).json({ messaje: 'producto borrado con exito' })
            } catch (error) {
                res.status(400).json({ error: `${error}` })
            }
        } else {
            res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
        }
    }
}

export default ProductDaoFs