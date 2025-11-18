import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: String,
  anio_publicacion: Number,
  cantidad_total: Number
}, { timestamps: true });

export default mongoose.model('Libro', libroSchema);