import ChatConteiner from './chatConteiner.js'
import { chatOptions } from './database/chat.database.js'
import ProductConteiner from './productConteiner.js'
import { productsOptions } from './database/products.database.js'

const clientChat = new ChatConteiner(chatOptions)
const clientProducts = new ProductConteiner(productsOptions)

const createTableChat = async () => {
    await clientChat.createTableChat()
}

const createTableProducts = async () => {
    await clientProducts.createTableProducts()
}

createTableChat()
createTableProducts()