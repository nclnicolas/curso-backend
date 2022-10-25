/*++++++++++++++++++
+ INICIO DE LA APP +
+++++++++++++++++++*/

import { app, http } from './app.js'

const connectedServer = http.listen(app.get('port'), () => {
    console.log("Servidor conectado, escuchando en", app.get('port'))
})

connectedServer.on("error", error => console.log(error))