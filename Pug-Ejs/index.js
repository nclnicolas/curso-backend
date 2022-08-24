const express = require('express')

const app = express()
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res)=> {
    res.render('hello.pug', {mensaje: 'hola a todos'})
})
app.get('/datos', (req, res) => {
    //recibir parametros por query params
    const { min, max, value} = req.query;
    res.render('meter.pug', { min:20, max:40, value:40 })
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log('server on')
})
