import { Schema, model } from "mongoose"

const cartCollection = 'carts'

const cartSchema = Schema({
    products: {
        type: Array,
    }
},{
    timestamps: true,
    versionKey: false
})

export const cart = model(cartCollection, cartSchema)