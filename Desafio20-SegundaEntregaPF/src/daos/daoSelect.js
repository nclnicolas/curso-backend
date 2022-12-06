const PERS = 'fs'
// const PERS = 'mongodb'
// const PERS = 'firebase'

let productDao
let cartDao

switch (PERS) {
    case 'firebase':
        const { default: ProductDaoFirebase } = await import('./products/productDaoFirebase.js')
        const { default: CartDaoFirebase } = await import('./carts/cartDaoFirebase.js')

        productDao = new ProductDaoFirebase()
        cartDao = new CartDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductDaoMongo } = await import('./products/productDaoMongo.js')
        const { default: CartDaoMongo } = await import('./carts/cartDaoMongo.js')

        productDao = new ProductDaoMongo()
        cartDao = new CartDaoMongo()
        break

    case 'fs':
        const { default: ProductDaoFs } = await import('./products/productDaoFs.js')
        const { default: CartDaoFs } = await import('./carts/cartDaoFs.js')

        productDao = new ProductDaoFs()
        cartDao = new CartDaoFs()
        break
}

export { productDao, cartDao }