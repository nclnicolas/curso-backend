const mostrarLista = (datos) => {
    if(datos.length === 0) console.log('Lista vacia');

    datos.forEach(dato => console.log(dato));
}
/* mostrarLista([2,3,4,5]) */

(function (datos = [1,2,34]){
    if(datos.length === 0) console.log('Lista vacia');

    datos.forEach(dato => console.log(dato));
})()

//------------ CLASES --------------------
class Client {
    constructor(nombre, email, telefono){
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.pets = [];
    }
    //Metodos
    comprar = () => {
        console.log(`Hola soy ${this.nombre} y estoy comprando`);
    }
    adoptarMascota = (mascota) => {
        this.pets.push(mascota);
    }
    mostrarMascota = () => {
        console.log(this.pets);
    }
}

let cliente1 = new Client('Nicolas', 'nico@gmail.com', 123123);
let cliente2 = new Client('Francisco', 'fran@gmail.com', 4445566);

cliente1.comprar();
cliente2.comprar();

cliente1.adoptarMascota('Perrito');
cliente2.adoptarMascota('Gatito');

cliente1.mostrarMascota();
cliente2.mostrarMascota();