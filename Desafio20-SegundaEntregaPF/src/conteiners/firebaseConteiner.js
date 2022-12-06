import admin from "firebase-admin"
import { dbsConfig } from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(dbsConfig.firebase)
})

const db = admin.firestore();

export class FirebaseConteiner {

    constructor(collectionName) {
        this.collection = db.collection(collectionName)
    }

    async getById (id) {
        try {
            const doc = await this.collection.doc(id).get()
            if (!doc.exists) {
                throw new Error(`Error al listar por id: no se encontró`)
            } else {
                const data = doc.data()
                return { ...data, id }
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll () {
        try {
            const result = []
            const snapshot = await this.collection.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save (obj) {
        try {
            const saved = await this.collection.add(obj);
            return { ...obj, id: saved.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async updateById (id, obj) {
        try {
            const updated = await this.collection.doc(String(id)).update(obj);
            return updated
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async deleteById (id) {
        try {
            const doc = await this.collection.doc(id).get()
            if (doc.exists) {
                await this.collection.doc(id).delete()
            } else {
                throw new Error(`Error al borrar por id: no se encontró`)
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}