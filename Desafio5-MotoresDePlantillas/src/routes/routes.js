const { Router } = require("express");

const router = Router();

const productos = [];

let prodID = 1;

const getMaxId = () => {
  const ids = productos.map((item) => item.id);
  if (ids.length === 0) {
    return 0;
  }
  return Math.max(...ids);
};

router.get("/", (req, res) => {
  // GET '/api/productos' -> devuelve todos los productos.
  res.send(productos);
});

router.get("/:id", (req, res) => {
  // GET '/api/productos/:id' -> devuelve un producto según su id.
  const { id } = req.params;
  const prod = productos.filter((prod) => prod.id == id);
  if (prod.length == 0)
    res.status(400).json({ error: "producto no encontrado" });
  res.send(prod);
});

router.post("/", (req, res) => {
  // POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
  if (req.body.title && req.body.price && req.body.thumbnail) {
    const id = getMaxId() + 1;
    const p = {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      id: id,
    };
    productos.push(p);
    res.status(200).json(p);
  } else {
    res.status(400).json({ error: "La petición no es correcta" });
  }
});

router.put("/:id", (req, res) => {
  // PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
  const { id } = req.params;
  const { nombre, precio, urlImagen } = req.body;
  if (!nombre || !precio || !urlImagen) {
    res.status(400).json({ error: "producto no encontrado" });
  } else {
    let contador = 0;
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id == id) {
        productos[i].nombre = nombre;
        productos[i].precio = precio;
        productos[i].urlImagen = urlImagen;
        contador += 1;
        break;
      }
    }
    if (contador == 0)
      res.status(400).json({ error: "producto no encontrado" });
    res.send(productos);
  }
});

router.delete("/:id", (req, res) => {
  // DELETE '/api/productos/:id' -> elimina un producto según su id.
  const { id } = req.params;
  const largoActual = productos.length;
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == id) {
      productos.splice(i, 1);
    }
  }
  if (productos.length == largoActual)
    res.status(400).json({ error: "producto no encontrado" });
  res.send(productos);
});

module.exports = {
  router: router,
  productos: productos,
};
