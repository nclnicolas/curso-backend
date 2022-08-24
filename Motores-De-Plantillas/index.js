const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const PORT = process.env.PORT || 8080;

const studentList = [
    {nombre: 'Nicolas'},
    {nombre: 'Evelin'},
    {nombre: 'Ayelen'}
]
//--ESTABLECEMOS LA CONFIG DE HANDLEBARS--
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')//Donde tendremos nuestras vistas
//--------

app.get('/', (req, res) => {
    res.render('datos', { studentList: studentList, listExists: true })
})

app.listen(PORT, () => {
    console.log('Servidor Iniciado');
})