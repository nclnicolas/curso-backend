/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
+ DEBERAS COMENTAR Y DESCOMENTAR SEGUN ELECCION DE PERSISTENCIA +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// const PERS = 'fs'
const PERS = 'mongodb'
// const PERS = 'firebase'

/*+++++++++++++++++++++++++++++++
+ CONFIGURACION DE PERSISTENCIA +
++++++++++++++++++++++++++++++++*/

let dbChat

switch (PERS) {
    case 'fs':
        const { FsConteiner } = await import('../conteiners/fsConteiner.js')
        dbChat = new FsConteiner()
        break

    case 'firebase':
        const { FirebaseConteiner } = await import('../conteiners/firebaseConteiner.js')
        dbChat = new FirebaseConteiner()
        break

    case 'mongodb':
        const { MongoConteiner } = await import('../conteiners/mongoConteiner.js')
        dbChat = new MongoConteiner()
        break
}

export default dbChat 