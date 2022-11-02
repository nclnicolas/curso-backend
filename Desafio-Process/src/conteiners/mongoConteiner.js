import mongoose from 'mongoose'
import { dbsConfig } from '../config/dbsConnect.js'
import { Chat } from '../models/chat.js'
import { normalizeData } from '../utils/denoNorma.js'

/*+++++++++++++++++++++++++++++++++++++
+ MONGO CONTEINER - CONECCION A LA DB +
++++++++++++++++++++++++++++++++++++++*/

await mongoose.connect(dbsConfig.mongodbAtlas.uri, dbsConfig.mongodbAtlas.options)

export class MongoConteiner {
    constructor() {
        this.collection = Chat
    }

    async getAll() {
        try {
            let data = await this.collection.find({}).lean()
            data.forEach(obj => {
                obj.id = obj['_id'].toString()
                delete (obj['_id'])
            })
            return normalizeData(data)
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(obj) {
        try {
            const { id, nombre, apellido, edad, alias, avatar } = obj.author
            if (!id || !nombre || !apellido || !edad || !alias || !avatar || !obj.text) throw new Error(`Error al guardar, se deben ingresar todos los datos`)
            const info = await this.collection.create(obj)
            return info
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }
}
