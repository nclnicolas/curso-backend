const express = require('express')
const router = require('./routes/routes')
const path = require('path')

const app = express()
const PORT = 8080

app.listen(PORT, (req, res) => {
    console.log('Puerto escuchando en ', PORT)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/productos', router)