/* A- Crear un proyecto en node.js que genere 10000 números aleatorios en el rango  de 1 a 20.
B- Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados.
 */

function numeroRandom(min, max) {
  const valor = Math.random() * (max - min) + min;
  return Math.floor(valor);
}

const numbers = {};
for (let i = 0; i < 10; i++) {
  const valor = numeroRandom(1, 20);
  console.log(Math.floor(valor)); //floor redondea el valor para abajo

  if (numbers[valor]) {
    numbers[valor]++;
  } else {
    numbers[valor] = 1;
  }
}

console.log(numbers);
