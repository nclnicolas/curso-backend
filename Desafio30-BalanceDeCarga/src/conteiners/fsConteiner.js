import { dbsConfig } from '../config/dbsConnect.js'
import fs from 'fs'
import { v4 as newID } from 'uuid'
import { normalizeData, denormalizeData } from '../utils/denoNorma.js'

/*+++++++++++++++++++++++++++++++++++++++++++
+ FILE SYSTEM CONTEINER - CONECCION A LA DB +
++++++++++++++++++++++++++++++++++++++++++++*/

export class FsConteiner {
    constructor() {
        this.pathFile = dbsConfig.fileSystem.pathChat
    }

    async getAll() { 
        try {
            const data = await fs.promises.readFile(this.pathFile, 'utf-8', (err, data) => {
                if (err) throw err
                return data
            })
            return normalizeData(JSON.parse(data))
        } catch (error) {
            throw new Error('Error al leer db fs: ', error)
        }
    }

    async save(obj) {
        try {
            const db = await this.getAll()
            let dbDeno = denormalizeData(db)
            obj.id = newID()
            dbDeno.push(obj)
            await fs.promises.writeFile(this.pathFile, JSON.stringify(dbDeno, null, 2), err => {
                if (err) throw err
            })
        } catch (error) {
            throw new Error('Error al guardar en fs: ', error)
        }
    }
}