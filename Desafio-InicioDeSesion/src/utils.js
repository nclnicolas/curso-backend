import { faker } from '@faker-js/faker/locale/es'
import { normalize, denormalize, schema } from 'normalizr'

/*++++++++++++++++++++++++++ 
+  CREAR PRODUCTOS RANDOM  +
+++++++++++++++++++++++++++*/
const createProducts = () => {
    let arr = []
    for (let i = 0; i < 5; i++) {
        arr.push({
            nombre: faker.commerce.product(),
            precio: faker.finance.amount(),
            foto: faker.internet.avatar()
        })
    }
    return(arr)
}

/*+++++++++++++++++++++++++++++++++++
+  NORMALIZACION Y DENORMALIZACION  +
++++++++++++++++++++++++++++++++++++*/

const autor = new schema.Entity('autores', {}, { idAttribute: "id" })
const texto = new schema.Entity('texto', {
    author: autor
})

const chat = new schema.Entity('chat', {
    author: autor,
    text: [texto]
}, { idAttribute: "id" })

const chatSchema = new schema.Array(chat)

const normalizeData = (data) => {
    const dataNormalizada = normalize(data, chatSchema)

    return dataNormalizada
}

const denormalizeData = (data) => {
    const dataDenormalizada = denormalize(data.result, chatSchema, data.entities)
    return dataDenormalizada
}

/*++++++++++++++++++++++++++++ 
+  EXPORTAMOS LAS FUNCIONES  +
+++++++++++++++++++++++++++++*/

export {
    createProducts,
    normalizeData,
    denormalizeData
}