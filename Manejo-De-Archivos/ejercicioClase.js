const {Contenedor} = require('./contenedor');
const test = new Contenedor('productos.txt');

const main = async () => {

    //Guardamos algunos productos
    await test.save({ title: 'Producto 1', price: 100, thumbnail: 'https://picsum.photos/200/300' });
    await test.save({ title: 'Producto 2', price: 100, thumbnail: 'https://picsum.photos/200/300' });
    await test.save({ title: 'Producto 3', price: 100, thumbnail: 'https://picsum.photos/200/300' });

    //Obtenemos todos los productos
    let products = await test.getAll();
    console.log(products);

    //Obtenemos un producto por id
    const product = await test.getById(1);
    console.log('GET BY ID: ', product);

    //Eliminamos un producto por id
    await test.deleteById(1);
    products = await test.getAll();
    console.log('Sin el Producto con ID 3: ', products);

    //Eliminamos todos los productos
    await test.deleteAll();
    products = await test.getAll();
    console.log('Sin Productos: ', products);
}

main();