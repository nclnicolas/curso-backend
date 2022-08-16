//----------SETTIMEOUT-------------------

/* function hacerTarea(num, cb) {
    console.log('haciendo tarea'+ num);
    setTimeout(cb, 100)
}

console.log('haciendo tarea');
hacerTarea(1, () => {
    hacerTarea(2, () => {
        hacerTarea(3, () => {
            hacerTarea(4, () => {
                console.log('fin tarea');
            })
        })
    })
})
console.log('otras tareas'); */

//---------------------------------------
//--------LECTURA DE ARCHIVO-------------

const fs = require("fs");

try {
  const fileData = fs.readFileSync("./hola.txt", "utf-8");
  console.log(fileData);
} catch (err) {
  console.log("ERROR", err);
}

//---------------------------------------
//--------CREACION Y LECTURA DE ARCHIVOS-----------

const fecha = Date();
try {
  const writeData = fs.writeFileSync("./fyh.txt", fecha); //Se crea el archivo
  const fileData = fs.readFileSync("./fyh.txt", "utf-8"); //Se lee el archivo
  console.log(fileData);
} catch (err) {
  console.log("ERROR", err);
}
//-------------------------------------------------
//--------LECTURA ASINCRONA----------------

fs.readFile("./fyh.txt", "utf-8", (error, fileData) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Lectura Asincrona: ", fileData);
  }
});

//------------------------------------------
//---------------CON PROMESAS----------------------

const leerTc = fs.promises
  .readFile("./fyh.txt", "utf-8")
  .then((fileData) => {
    console.log("Con promesas: ", fileData);
  })
  .catch((err) => console.log("ERROR", err));

//-------------------------------------------------
//-------------CON ASYNC AWAIT---------------------
async function leerAA() {
  try {
    const contenido = await fs.promises.readFile("./fyh.txt", "utf-8");
    console.log("Con async await: ", contenido);
  } catch (err) {
    console.log("ERROR", err);
  }
}
leerAA();

//-------------------------------------------------

const example = fs.promises
  .writeFile("./escritura.txt", "ejemplo de escritura")
  .then((fileData) => {
    console.log("promess: ", fileData);
  })
  .catch((err) => console.log(err));

async function leer() {
  try {
    await fs.promises.writeFile("./escritura.txt", "ejemplo de escritura");
    const dataFile = await fs.promises.readFile("./escritura.txt", "utf-8");
    console.log(dataFile);

    return dataFile;
  } catch (err) {
    console.log(err);
  }
}
async function manipular() {
  const contenido = await leer();
}
//---------------------------------------------------------
/*
 * Escribir un programa ejecutable que realice las siguientes acciones:
 * A) Ejecutar la instrucción npm init -y
 * B) Lea el archivo package.json y declare un objeto
 * con el siguiente formato y datos:
 * const info = {
 *  contenidoStr: (contenido del archivo leído en formato string),
 *  contenidoObj: (contenido del archivo leído en formato objeto),
 *  size: (tamaño en bytes del archivo)
 * }
 * C) Muestre por consola el objeto info luego de leer el archivo.
 * D) Guardar el objeto info en un archivo llamado info.txt dentro
 * de la misma carpeta de package.json.
 * E) Incluir manejo de errores (con throw new Error)
 *
 * - Utilizar la lectura y escritura de archivos en modo asincrónico con callbacks.
 * - Para deserializar un string con contenido JSON utilizar JSON.parse
 * - Para serializar un objeto (convertirlo a string) y guardarlo
 * en un archivo utilizar JSON.stringify
 * - Considerar usar JSON.stringify(info, null, 2) para preservar el formato de
 * representación del objeto en el archivo (2 representa
 * en este caso la cantidad de
 * espacios de indentación usadas al representar el objeto como string.
 */
const info = {
  contenidoStr: "",
  contenidoObj: "",
  size: 0,
}; //Contenido de nuestro archivo info

fs.readFile("./package.json", "utf-8", (error, contenido) => {
  if (error) {
    throw new Error(error);
  } else {
    info.contenidoStr = contenido;
    info.contenidoObj = JSON.parse(contenido);
    info.size = contenido.length;
    console.log(info);
    fs.writeFile("./info.txt", JSON.stringify(info, null, 2), (err) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log("Se guardó el archivo info.txt");
      }
    });
  }
});

//------------------------------------------------------------------------------------

//---Lea el archivo info.txt -- Mostrar este objeto info en la consola.
//---Modifique el author a "Coderhouse" y guarde el objeto serializado en otro archivo llamado package.json.coder
//---Mostrar los errores por consola.

fs.promises
  .readFile("./info.txt", "utf-8")
  .then((contenido) => {
    const info = JSON.parse(contenido);
    console.log(info);
    info.contenidoObj.author = "CoderHouse";

    fs.promises
      .writeFile(
        "package.json.coder",
        JSON.stringify(info.contenidoObj, null, 2)
      )
      .then(() => console.log("Se guardo el archivo package.json.coder"))
      .catch((err) => console.log("ERROR", err));
  })
  .catch((err) => {
    console.log(err);
  });
