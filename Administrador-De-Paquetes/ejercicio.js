const moment = require('moment')

const fechaActual = moment()

const nacimiento = moment('23-01-1994', "DD-MM-YYYY")

const dias = fechaActual.diff(nacimiento, 'years')

const nacAdias = nacimiento.diff(fechaActual, 'days')

console.log('Hoy es', fechaActual.format('DD-MM-YYYY'));
console.log('Yo naci el ', nacimiento.format('DD-MM-YYYY'));
console.log('Desde mi nacimiento han pasado ', dias, ' anos');
console.log('Desde mi nacimiento han pasado', nacAdias, ' dias');
