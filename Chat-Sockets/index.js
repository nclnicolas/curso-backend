const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static("public"))

const messages = []

io.on("connection", socket =>{
    console.log("Nuevo cliente conectado")

    socket.emit("new-chat-message", messages)

    //linda chrome
    socket.on("new-message",  message =>{
        console.log(message)

        messages.push(message)

        console.log(messages)

        io.sockets.emit("new-chat-message", messages)
    })

})

const connectedServer = httpServer.listen(8080, ()=>{
    console.log("Servidor http con web sockets listo")
})

connectedServer.on("error", error => console.log)
