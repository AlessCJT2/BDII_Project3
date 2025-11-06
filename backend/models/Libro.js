const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: { type: String, default: 'General' },
  anio_publicacion: { type: Number },
  editorial: { type: String },
  cantidad_total: { type: Number, default: 1, min: 1 },
  cantidad_prestada: { type: Number, default: 0, min: 0 },
  disponible: { type: Boolean, default: true },
  etiquetas: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Libro', libroSchema);