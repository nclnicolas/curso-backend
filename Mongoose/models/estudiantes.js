const mongoose = require("mongoose");

const estudiantesCollection = "estudiantes";

const estudiantesSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  apellido: { type: String, require: true, max: 30 },
  edad: { type: Number, require: true },
  dni: { type: Number, require: true, unique: true },
  curso: { type: String, require: true },
  nota: { type: Number, require: true },
});

const estudiantes = mongoose.model(estudiantesCollection, estudiantesSchema);

module.exports = {estudiantes};