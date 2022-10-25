const mongoose = require("mongoose");
const { usuarios } = require("./models/usuarios");
const { estudiantes } = require("./models/estudiantes");
const URL = 'mongodb+srv://nclnicolas:<password>@cluster0.vumtzrg.mongodb.net/?retryWrites=true&w=majority'
//const URL = "mongodb://localhost:27017/mongooseExample";

//Conexion a mongoose
CRUD();

async function CRUD() {
  try {
    const connection = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");

    console.log("----------CREATED-----------");
    const usuario = { nombre: "Nicolas", email: "nico@gmail.com" };
    const schemaUsuario = new usuarios(usuario);
    const savedUser = await schemaUsuario.save();

    console.log(savedUser);

   /*  console.log("----------READ------------");
    const listaUsuarios = await usuarios.find({});
    console.log(listaUsuarios);

    const data = [
      {
        nombre: "Nicolas",
        apellido: "asdasd",
        edad: 27,
        dni: 123456,
        curso: "backEnd",
        nota: 7,
      },
    ];

    await data.forEach((item) => {
      const schemaStudent = new estudiantes(item);
      schemaStudent.save();
    });

    const listaEstudiante = await estudiantes.find({});
    console.log(listaEstudiante);

    console.log("----------UPDATE-----------");
    const estudianteUpdate = await estudiantes.updateOne(
      { nombre: "Nicolas" },
      { $set: { nota: 9 } }
    );
    console.log(estudianteUpdate);

    console.log("-----DELETE------");
    const estudianteEliminado = await estudiantes.deleteMany({
      nota: { $lt: 8 },
    });
    console.log(estudianteEliminado); */
  } catch (error) {
    if(error) console.log(error);
    console.log('db connected');  
  }
}
//----------------------------
