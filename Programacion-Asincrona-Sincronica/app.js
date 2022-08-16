/* const ejecutar = (func, params) => func(params);
const saludar = (nombre) => console.log(`Hola ${nombre}`);

ejecutar(saludar, 'Nicolas'); */

//----------EJERCICIO-------------

/* const operacion = (valor1, valor2, func) => func(valor1, valor2);

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;
const modulo = (a, b) => a % b;

console.log(operacion(3, 9, resta)); */

//------------------------------------
//-------PROMESAS---------------------

function dividir(dividendo, divisor) {
  return new Promise((resolve, reject) => {
    if (divisor == 0) {
      reject("no se puede dividir por cero");
    } else {
      resolve(dividendo / divisor);
    }
  });
}

dividir(10, 2)
  .then((resultado) => {
    console.log(`resultado: ${resultado}`);
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  });

//---------------------------------------------