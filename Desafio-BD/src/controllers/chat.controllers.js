import { chatOptions } from '../database/chat.database.js'
import ChatConteiner from '../chatConteiner.js'

const client = new ChatConteiner(chatOptions)

const createTable = async () => {
    try {
        await client.createTableChat()
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const chatRead = async () => {
    try {
        const messages = await client.getMessages()
        return messages
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const messageInsert = async (message) => {

    try {
        await client.saveMessage(message)
        console.log('mensaje insertado con exito')
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

export const chatControllers = {
    createTable,
    chatRead,
    messageInsert
}