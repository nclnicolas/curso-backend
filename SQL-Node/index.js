import ClienteSQL from "./clienteSQL.js";

//Enviar opciones de conexion al cliente

const options = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "coderhouse2",
  },
};

const csql = new ClienteSQL(options);

//Realizar operaciones sobre la DB usando la conexion abierta que creamos

//Crear una tabla
csql
  .crearTabla()
  .then(() => {
    //Realizar acciones sobre la tabla que se creo

    console.log("Tabla creada!!");

    //Insertar datos en una tabla
    const articulos = [
      {
        nombre: "Lambo",
        codigo: "lamboL1",
        precio: 40000,
        stock: 2,
      },
      {
        nombre: "F40",
        codigo: "F40L2",
        precio: 70000,
        stock: 5,
      },
    ];
    return csql.insertar(articulos);
    //...
  })
  .then(() => {
    console.log("Articulos insertados");
  })
  .catch((err) => console.log(err));
