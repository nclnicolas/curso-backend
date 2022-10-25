const express = require("express");
const { faker } = require("@faker-js/faker");
const app = require(express);

const populares = [];
let id = 0;

const generateUsers = () => {
  return {
    id: id++ ,
    nombre: faker.name.firstName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    imagen: faker.internet.avatar(),
  };
};

app.post("/api/usuarios/popular", (req, res) => {
  const cantidad = req.query.cant || 50;
  for (let index = 0; index < cantidad; index++) {
    const item = generateUsers();

    populares.push(item);
  }

  res.send(populares);
});

app.get("/api/usuarios/:id?", (req, res) => {
  const id = req.params.id;

  if(id){
    const item = populares.find((el) => el.id === Number(id))
    res.send(item);
  }else{
    res.send(populares);
  }
});

app.delete("/api/usuarios/:id", (req, res) => {
    const id = req.params.id;
  
    if(id){
      const item = populares.filter((el) => el.id !== Number(id))
      populares = [...item];
      res.send(item);
    }else{
      res.send({error: "id is required"});
    }
  });

app.listen(3000, () => {
  console.log("Server ON!");
});
