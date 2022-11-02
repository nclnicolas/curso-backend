import { normalize, denormalize, schema } from 'normalizr'

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
    normalizeData,
    denormalizeData
}