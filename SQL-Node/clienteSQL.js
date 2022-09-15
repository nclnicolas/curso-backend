import knexLib from "knex";

//Creamos el cliente
class ClienteSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }

  crearTabla() {
    return this.knex.schema.dropTableIfExists("articulos").finally(() => {
      return this.knex.schema.createTable("articulos", (table) => {
        table.increments("id").primary();
        table.string("nombre", 15).notNullable();
        table.string("codigo", 10).notNullable();
        table.float("precio");
        table.integer("stock");
      });
    });
  }

  consultar() {
    return this.knex('articulos').select('*')
  }

  consultarById(id) {
    return this.knex('articulos').select(id)
  }

  insertar(data) {
    return this.knex('articulos').insert(data)
  }

  eliminar(id) {}

  actualizar(id) {}

  close() {
    this.knex.destroy();
  }
}

export default ClienteSQL;
