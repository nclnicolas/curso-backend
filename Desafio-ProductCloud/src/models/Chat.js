// import { Schema, model } from "mongoose"
const { Schema, model } = require('mongoose')

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DEL MODELO NECESARIO PARA PERCISTENCIA DE CHAT EN MONGODB +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

const chatCollection = 'chat'

const chatSchema = Schema({
    author: {
        id: {
            type: String,
            required: true
        } ,
        nombre: {
            type: String,
            required: true
        } ,
        apellido: {
            type: String,
            required: true
        } ,
        edad: {
            type: String,
            required: true
        } ,
        alias: {
            type: String,
            required: true
        } ,
        avatar: {
            type: String,
            required: true
        }
    },
    text: {
        type: String,
        required: true
    }
},{
    timestamps: false,
    versionKey: false
})

exports.Chat = model(chatCollection, chatSchema)