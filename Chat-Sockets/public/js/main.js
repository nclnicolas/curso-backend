const socket = io.connect();

const button = document.getElementById("submit")

button?.addEventListener("click", ()=>{
    const message ={
        name: document.getElementById("name").value,
        message: document.getElementById("message").value,
    } 
    console.log(message)
    socket.emit('new-message', message)
})

socket.on("new-chat-message", messages =>{
    const html = messages.map(message => {
        return (`<div><strong>${message.name}</strong>:<em>${message.message}</em></div>`)
    }).join(' ')

    document.getElementById("chat").innerHTML = html
})


