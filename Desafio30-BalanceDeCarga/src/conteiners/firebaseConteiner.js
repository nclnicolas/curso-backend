import admin from "firebase-admin"
import { dbsConfig } from '../config/dbsConnect.js'
import { normalizeData } from '../utils/denoNorma.js'

/*++++++++++++++++++++++++++++++++++++++++
+ FIREBASE CONTEINER - CONECCION A LA DB +
+++++++++++++++++++++++++++++++++++++++++*/

admin.initializeApp({
    credential: admin.credential.cert(dbsConfig.firebase)
})

const db = admin.firestore();

export class FirebaseConteiner {

    constructor() {
        this.collection = db.collection('chat')
    }

    async getAll () {
        try {
            const result = []
            const snapshot = await this.collection.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return normalizeData(result)
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
}