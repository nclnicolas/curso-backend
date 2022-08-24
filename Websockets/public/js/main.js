const socket = io.connect();

const input = document.querySelector('input');
//Enviamos mensaje al servidor
input.addEventListener('input', () => {
    socket.emit( 'mensajeEnviado', input.value );
})


//Tomamos los mensajes que nos envian
socket.on('mensajesRecibidos', mensajes => {
    document.querySelector('p').innerText = mensajes;
})

