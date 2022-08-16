const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

/* const frase = 'Hola mundo';

app.get('/api/frase', (req, res) => {
    res.send(`La frase enviada es: ${frase}`)
})

app.get('/api/letras/:num', (req, res) => {
    let posicion = req.params.num;
    res.send(`La letra enviada es: ${frase.charAt(posicion)}`)
})

app.get('/api/palabras/:num', (req, res) => {
    let posicion = req.params.num;
    if(!num){
        res.sendStatus(400).send('Debes enviar un numero correcto')
    }
    res.send(frase.split( ' ')[posicion])
}) */

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// crear los endpoints necesarios para realizar todas las operaciones sobre una lista de usuarios {nombre: '', id: ''}   
const listaUsuarios = []


// crear un usuario
app.post('/usuario',  (req, res) => {
    const data = req.body

    console.log("data", data)

    if(!data){
        res.sendStatus(400)
    }

    listaUsuarios.push(data)

    res.send(listaUsuarios)
})


// listar todos los usuarios
app.get('/usuario', (req, res) => {
    res.send(listaUsuarios)
})

// traer un solo usuario con un id
app.get('/usuario/:id', () => {

})

// eliminar todos los usuarios
app.delete('/usuario', () => {
    
})

// eliminar el usuario con un id
app.delete('/usuario/:id', () => {

})

// modificar el usuario con un id
app.put('/usuario/:id', () => {

})







//-- SERVIDOR ---
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})