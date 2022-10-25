const mongoose = require("mongoose");

const usuariosCollection = "usuarios";

const usuariosSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  email: { type: String, require: true, max: 30 },
});

const usuarios = mongoose.model(usuariosCollection, usuariosSchema);

module.exports = {usuarios};
