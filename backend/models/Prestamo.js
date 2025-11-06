import mongoose from 'mongoose';

const prestamoSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  libro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
  fecha_prestamo: { type: Date, default: Date.now },
  fecha_devolucion: Date
}, { timestamps: true });

export default mongoose.model('Prestamo', prestamoSchema);