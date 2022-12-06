import { Schema, model } from "mongoose"

const productsCollection = "products"

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    urlImage: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    code: {
        type: Number,
        required: true
    }, 
    stock: {
        type: Number,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

export const product = model(productsCollection, productSchema)