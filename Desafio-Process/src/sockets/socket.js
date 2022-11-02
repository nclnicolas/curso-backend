import dbChat from "./socketSelect.js"
import { denormalizeData } from "../utils/denoNorma.js"

/*++++++++++++++++++++++++++++++++++++++
+ COMUNICACION DEL SOCKET DEL SERVIDOR +
+++++++++++++++++++++++++++++++++++++++*/

export default async (io) => {
    io.on('connection', async socket => {
        console.log('Un usuario se ha conectado')

        let chatINFO = await dbChat.getAll()
        
        socket.emit('servidor_todos_los_mensajes', denormalizeData(chatINFO))

        socket.on('cliente_nuevo_mensaje_chat', async data => {
            await dbChat.save(data)
            let chat = await dbChat.getAll()
            io.sockets.emit('servidor_todos_los_mensajes', denormalizeData(chat))
        })
    })
}