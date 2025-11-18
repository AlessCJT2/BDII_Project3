import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  codigo_usuario: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: String,
  // ← ESTO ES CLAVE: inicializamos el array para que siempre exista
  prestamos_actuales: {
    type: [{
      libro_isbn: { type: String, required: true },
      titulo: { type: String, required: true },
      fecha_prestamo: { type: Date, default: Date.now }
    }],
    default: []  // ← IMPORTANTE
  }
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);