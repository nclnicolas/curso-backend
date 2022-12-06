import mongoose from 'mongoose'
import { dbsConfig } from '../config.js'
import { chat } from '../models/chat.js'
import { normalizeData } from '../utils.js'

/*+++++++++++++++++++++++++++++++++++++
+ MONGO CONTEINER - CONECCION A LA DB +
++++++++++++++++++++++++++++++++++++++*/

await mongoose.connect(dbsConfig.mongodbAtlas.uri, dbsConfig.mongodbAtlas.options)

export class MongoConteiner {
    constructor() {
        this.collection = chat
    }

    async getAll () {
        try {
            let data = await this.collection.find({}).lean()
            data.forEach(obj => {
                obj.id = obj['_id'].toString()
                delete(obj['_id'])
            })
            return normalizeData(data)
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save (obj) {
        try {
            const info = await this.collection.create(obj)
            return info
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
}
