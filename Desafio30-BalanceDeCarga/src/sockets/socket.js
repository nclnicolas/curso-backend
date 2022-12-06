import dbChat from "./socketSelect.js"
import { denormalizeData } from "../utils/denoNorma.js"
import { logger } from "../config/logger.js"

/*++++++++++++++++++++++++++++++++++++++
+ COMUNICACION DEL SOCKET DEL SERVIDOR +
+++++++++++++++++++++++++++++++++++++++*/

export default async (io) => {
    io.on('connection', async socket => {
        logger.info("Nuevo cliente conectado")

        let chatINFO = await dbChat.getAll()
        
        socket.emit('servidor_todos_los_mensajes', denormalizeData(chatINFO))

        socket.on('cliente_nuevo_mensaje_chat', async data => {
            await dbChat.save(data)
            let chat = await dbChat.getAll()
            io.sockets.emit('servidor_todos_los_mensajes', denormalizeData(chat))
        })
    })
}