import Prestamo from '../models/Prestamo.js';

export const getPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find()
      .populate('usuario_id', 'codigo_usuario nombre')
      .populate('libro_id', 'isbn titulo');
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPrestamo = async (req, res) => {
  const { usuario_id, libro_id } = req.body;
  const prestamo = new Prestamo({ usuario_id, libro_id });
  try {
    const nuevo = await prestamo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const devolverPrestamo = async (req, res) => {
  try {
    const prestamo = await Prestamo.findByIdAndUpdate(
      req.params.id,
      { fecha_devolucion: new Date() },
      { new: true }
    );
    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};