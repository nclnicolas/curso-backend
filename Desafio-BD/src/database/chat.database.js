/* Opciones para conexion a base de datos sqlite3 */
export const chatOptions = {
    client: 'sqlite3',
    connection: {
      filename: "./src/database/mydb.sqlite"
    },
    useNullAsDefault: true
  }