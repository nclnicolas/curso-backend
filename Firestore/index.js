var admin = require("firebase-admin");

var serviceAccount = require("./db/connection.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function CRUD(){
    const db = admin.firestore();
    const query = db.collection('usuarios');

    try {
       /*  const doc = query.doc('1');
        await doc.create({ nombre: 'Nicolas'})

        const doc2 = query.doc('2');
        await doc2.create({ nombre: 'Pedrito'})

        const doc3 = query.doc('3');
        await doc3.create({ nombre: 'Gonzalo'})

        console.log('Datos insertados!!!'); */

        const querySnap = await query.get()
        const docs = querySnap.docs;

        const data = docs.map((item) => ({
            nombre: item.data().nombre
        }))
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

CRUD();







console.log('Base de datos conectada');