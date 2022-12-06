const socket = io.connect()

const buttonChat = document.getElementById("enviar")

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ COMPROBACION DE DATOS DE FORMULARIOS PARA ENVIAR AL SERVIDOR +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

buttonChat?.addEventListener("click", () => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regex.test(document.getElementById("email").value) || document.getElementById("mensaje").value != '' || document.getElementById("nombre").value != '' || document.getElementById("apellido").value != '' || document.getElementById("alias").value != '' || document.getElementById("urlAvatar").value != '' || !document.getElementById("edad").value) {
        const data = {
            author: {
                id: document.getElementById("email").value,
                nombre: document.getElementById("nombre").value,
                apellido: document.getElementById("apellido").value,
                edad: document.getElementById("edad").value,
                alias: document.getElementById("alias").value,
                avatar: document.getElementById("urlAvatar").value
            },
            text: document.getElementById("mensaje").value
        }
        document.getElementById('mensaje').value = ''
        socket.emit('cliente_nuevo_mensaje_chat', data)

    } else {
        document.getElementById('email').value = 'ingrese todos los datos de manera correcta'
    }
})

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ ENVIAMOS LOS DATOS RECIBIDOS POR EL SERVIDOR PARA INSERTAR EN EL HTML +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

socket.on('servidor_todos_los_mensajes', chat => {
    document.getElementById('chat').innerHTML = ''
    chat.forEach(mensaje => {
        document.getElementById('chat').innerHTML += `
            <div style="width:100vw">
                <img src="${mensaje.author.avatar}" height="30px"/>
                <span style="color: brown;">&nbsp[${mensaje.author.alias}]</span>
                <span class="fst-italic" style="color: green;">&nbsp: ${mensaje.text}</span>
            </div>
        `
    })
})
