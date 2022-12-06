import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DE CONECCION A LAS DIFERENTES BASE DE DATOS +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { MONGO_USER, 
        MONGO_PASS, 
        GOOGLE_APLICATION_CREDENTIALS 
    } = process.env

export const dbsConfig = {

    fileSystem: {
        pathChat: path.join(__dirname, 'chat.txt'),
    },
    mongodbAtlas: {
        uri: `mongodb+srv://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}@cluster0.c94v8ws.mongodb.net/ecommerce`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    firebase: GOOGLE_APLICATION_CREDENTIALS
}