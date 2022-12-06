import fs from 'fs'
import { v4 as newID } from 'uuid'

export class FsConteiner {
    constructor (pathFile) {
        this.pathFile = pathFile
    }

    async getAll () { // Devuleve todo
        try {
            const data = await fs.promises.readFile(this.pathFile, 'utf-8', (err, data) => {         // Consultamos por la informacion
                if(err) throw err
                return data
            })
            return JSON.parse(data)                                                                 // Retornamos la informacion parseada
        } catch (error) {
            throw new Error('Error al leer db fs: ', error)
        }
    }

    async getByID (id) { // Devuelve informacion segun un ID
        try {
            const db = await this.getAll()
            const info = db.find(product => product.id == id)                                       // Buscamos por ID y lo guardamos en una variable
            return info
        } catch (error) {
            throw new Error('Error al leer db fs por id: ', error)
        }
        
    }

    async save (obj) { // Crea y asigna un ID y un timestamp
        try {
            const db = await this.getAll()
            obj.id = newID()                                                                        // Asignamos un id
            obj.timestamp = Date.now()                                                              // Asignamos un timestamp
            db.push(obj)                                                                            // Pusheamos el obj en el array
            await fs.promises.writeFile(this.pathFile, JSON.stringify(db, null, 2), err => {        // Escribimos el archivo
                if(err) throw err
            })
        } catch (error) {
            throw new Error('Error al guardar en fs: ', error)
        }
    }

    async updateById (id, obj) {
        try {
            const db = await this.getAll()
            for (let i=0; i < db.length; i++) {
                if (db[i].id == id) {
                    db[i] = obj
                    break
                }
            }
            await fs.promises.writeFile(this.pathFile, JSON.stringify(db, null, 2), err => {         // Escribimos el archivo
                if(err) throw err
            })
        } catch (error) {
            throw new Error('Error al actualizar en fs por id: ', error)
        }
    }

    async deleteById (id) { // Borra segun un ID
        try {
            const db = await this.getAll()
            const pordIndex = db.findIndex(product => product.id == id)                                 // Buscamos el producto por su id y tomamos el indice del array
            if ( pordIndex != -1) {                                                                     // Si encuentra 
                db.splice(pordIndex, 1)                                                             // Borra el producto
                await fs.promises.writeFile(this.pathFile, JSON.stringify(db, null, 2), err => {       // Escribimos la nueva db
                    if(err) throw err
                })
            }
        } catch (error) {
            throw new Error('Error al borrar en fs por id: ', error)
        }
    }
}