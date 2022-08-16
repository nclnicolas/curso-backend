const express = require("express");
/* const { Router } = express */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* const personas = Router()
const mascotas = Router()

const listaPersonas = [];
const listaMascotas = [];

const validarDatos = (req, res, next) => {
    const { nombre, edad } = req.body;
    if(!nombre || !edad){
        res.status(400).send('middleware1: Te falta algun dato')
    }
    next();
}

personas.get('/', (req, res) => {
   res.send(listaPersonas)
})

personas.post('/', validarDatos,  (req, res) => {
    
    listaPersonas.push({ nombre, edad })
   res.send('Persona guardada con exito')
})

mascotas.get('/', (req, res) => {
    res.send(listaMascotas)
 })
 
 mascotas.post('/', (req, res) => {
    const { nombre, raza } = req.body;
    if(!nombre || !raza){
        res.statusCode(400).send('Te falta algun dato')
    }

    listaMascotas.push({ nombre, raza })

   res.send('Mascota guardada con exito')
 })

app.use('/personas', personas)
app.use('/mascotas', mascotas) */

//-----------------------------------------
const multer = require("multer");
app.use(express.static('public'));

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}${Date.now()}`);
  },
});

const upload = multer({ storage: storage });

app.post("/uploadfile", upload.single("archivo"), (req, res, next) => {
  const file = req.file;

  if (!file) {
    //En caso de error
    const error = new Error("Por favor carga un archivo valido");
    error.httpStatusCode = 400;
    return next(error);
  }
  //En caso de exito
  res.send(file);
});

//--SERVIDOR--
const PORT = 3002;
app.listen(PORT, () => {
  console.log("Server on");
});
