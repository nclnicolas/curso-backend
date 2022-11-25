/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
+ DEBERAS COMENTAR Y DESCOMENTAR SEGUN ELECCION DE PERSISTENCIA +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// const PERS = 'fs'
// const PERS = 'mongodb'
// const PERS = 'firebase'

/*+++++++++++++++++++++++++++++++
+ CONFIGURACION DE PERSISTENCIA +
++++++++++++++++++++++++++++++++*/

/*
let dbChat
 switch (PERS) {
    case 'fs':
        const { FsConteiner } = await require('../conteiners/fsConteiner.js')
        dbChat = new FsConteiner()
        break

    case 'firebase':
        const { FirebaseConteiner } = await require('../conteiners/firebaseConteiner.js')
        dbChat = new FirebaseConteiner()
        break

    case 'mongodb':
        const { MongoConteiner } = await require('../conteiners/mongoConteiner.js')
        dbChat = new MongoConteiner()
        break
} */

const MongoConteiner = require('../conteiners/mongoConteiner.js')
const dbChat = new MongoConteiner()

module.exports = { dbChat }