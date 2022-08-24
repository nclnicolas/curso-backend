const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Servidor Iniciado');
});

server.on('error', err => console.log('Error en el servidor', err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(require('./routes'));