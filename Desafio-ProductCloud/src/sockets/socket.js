/* import dbChat from "./socketSelect.js"
import { denormalizeData } from "../utils/denoNorma.js" */

const { dbChat } = require("./socketSelect.js")
const { denormalizeData } = require("../utils/denoNorma.js")

/*++++++++++++++++++++++++++++++++++++++
+ COMUNICACION DEL SOCKET DEL SERVIDOR +
+++++++++++++++++++++++++++++++++++++++*/


const socket = async (io) => {
    io.on('connection', async socket => {

        let chatINFO = await dbChat.getAll()

        socket.emit('servidor_todos_los_mensajes', denormalizeData(chatINFO))

        socket.on('cliente_nuevo_mensaje_chat', async data => {
            await dbChat.save(data)
            let chat = await dbChat.getAll()
            io.sockets.emit('servidor_todos_los_mensajes', denormalizeData(chat))
        })
    })
}

module.exports = { socket }