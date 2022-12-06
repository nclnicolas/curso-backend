/*++++++++++++++++++
+ INICIO DE LA APP +
+++++++++++++++++++*/

import { app, http } from './app.js'
import { logger } from './config/logger.js'
import { modoCluster } from './app.js'
import cluster from 'cluster'
import { cpus } from 'os'

if (modoCluster && cluster.isPrimary) {
    const numCPUs = cpus().length
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
} else {
    const connectedServer = http.listen(app.get('port'), () => {
        logger.info("Servidor conectado, escuchando en " + app.get('port') + "- PID WORKER - ", process.pid)
    })
    connectedServer.on("error", error => console.log(error))
}
