/*++++++++++++++++++
+ INICIO DE LA APP +
+++++++++++++++++++*/

const { app, http } = require('./app.js')

const connectedServer = http.listen(app.get('port'), () => {
    console.log("Servidor conectado, escuchando en " + app.get('port'))
})
connectedServer.on("error", error => console.log(error))
