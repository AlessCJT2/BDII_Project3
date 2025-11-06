const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
  libro_isbn: { type: String, required: true },
  fecha_prestamo: { type: Date, default: Date.now },
  fecha_devolucion: { type: Date }
});

const usuarioSchema = new mongoose.Schema({
  codigo_usuario: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  fecha_registro: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true },
  prestamos_actuales: [prestamoSchema]
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
