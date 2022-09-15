import knexLib from 'knex'

export default class PorductConteiner {
    constructor ( config ) {
        this.knex = knexLib(config)
    }

    async createTableProducts () {
        return this.knex.schema.dropTableIfExists('productos').finally(() => {
            return this.knex.schema.createTable('productos', table => {
                table.increments('id').primary()
                table.string('title', 50).notNullable()
                table.integer('price').notNullable()
                table.string('thumbnail').notNullable()
            })
        })
    }

    async saveProduct (product) {        // Guarda un archivo nuevo en el array de productos
        try {
            return this.knex('productos').insert(product)    
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }

    async getById (id) {  // Esta funcion devuelve un producto segun su ID
        try {
            return this.knex('productos').select('id', 'title', 'price', 'thumbnail').where({id : id})
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }

    async getAll () {  // Esta funcion devuelve todos los productos del archivo
        try {
            return this.knex('productos').select('*')
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }

    async updateById (id, data) {
        try {
            return this.knex('productos').where({id: id}).update(data)
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }

    async deleteById (id) { // Esta funcion elimina un producto segun su ID
        try {
            return this.knex('productos').where({id: id}).del()
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }

    async deleteAll () { //Esta funcion elimina todos los productos
        try {
            return this.knex('productos').del()
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }

    async closeClient () {
        this.knex.destroy()
    }
}