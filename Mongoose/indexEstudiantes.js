const mongoose = require("mongoose");
const { estudiantes } = require("./models/estudiantes");
const URL = "mongodb://localhost:27017/mongooseExample";

//Conexion a mongoose
CRUD();

async function CRUD() {
  try {
    const connection = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");

    console.log("CREATED");
    const estu = {
      nombre: "Nicolas",
      apellido: "asdasd",
      edad: 27,
      dni: 123456,
      curso: "backEnd",
      nota: 7,
    };
    const schemaEstudiante = new estudiantes(estu);
    const savedEstudiante = await schemaEstudiante.save();

    console.log(savedEstudiante);

    console.log("READ");
    const listaEstudiante = await estudiantes.find({});
    console.log(listaEstudiante);
  } catch (error) {}
}
//----------------------------
