const http = require('http')


//Logica para identificar el mensaje enviado 
const getMensaje = () => {
    const hora = new Date().getHours();
    console.log(hora);

    if(hora >= 6 && hora <= 12){
        return 'Buenos dias';
    }else if(hora > 13 && hora <= 19){
        return 'Buenas tardes'
    }else{
        return 'Buenas noches'
    }
}

const server = http.createServer((req, res) => {
    res.end(getMensaje())
})

const connectedServer = server.listen(8080, () => {
    console.log(`Servidor HTTP escuchando el puerto ${connectedServer.address().port}`);
})

// -------------------------------------------------------
