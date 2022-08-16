class Usuario {
    constructor(nombre, apellido){
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = [];
      this.mascotas = [];
    }
    getFullName = () => {
      console.log(`Hola mi nombre completo es ${this.nombre} ${this.apellido} `);
    }
    addMascota = (mascota) => {
      this.mascotas.push(mascota);
    }
    countMascotas = () => {
      console.log(`${this.nombre} tiene ${this.mascotas.length} mascota`);
    }
    addBook = (titulo, autor) => {
      this.libros.push({titulo, autor});
    }
    getBookNames = () => {
      return this.libros.map(el => `El titulo del libro es ${el.titulo.toUpperCase()} `);
    }
  }
 let usuario1 = new Usuario('Nicolas', 'Enriquez')
 
 usuario1.getFullName();
 usuario1.addMascota('Boquita');
 usuario1.addMascota('Madrid');
 usuario1.countMascotas();
 usuario1.addBook('El libro de la selva', 'pepito');
 usuario1.addBook('El senor de las moscas', 'Willian Golding');
console.log(usuario1.getBookNames());