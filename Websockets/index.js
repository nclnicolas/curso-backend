const express = require('express');
const app = express();
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const PORT = 8080;

app.use(express.static('public'));

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    

    //Capturar los mensajes enviados
    socket.on('mensajeEnviado', mensajes => {
        console.log(mensajes);
        io.sockets.emit('mensajesRecibidos', mensajes);
    })
})







const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP con websocket ON`);
})
connectedServer.on('error', error => console.log(error));



