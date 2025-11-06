const Libro = require('../models/Libro');

const crearLibro = async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json({ success: true, data: libro });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const obtenerLibros = async (req, res) => {
  try {
    const { titulo, categoria, disponible } = req.query;
    let filtro = {};
    if (titulo) filtro.titulo = new RegExp(titulo, 'i');
    if (categoria) filtro.categoria = categoria;
    if (disponible) filtro.disponible = disponible === 'true';

    const libros = await Libro.find(filtro).sort({ titulo: 1 });
    res.json({ success: true, data: libros, total: libros.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const obtenerLibro = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) return res.status(404).json({ success: false, error: 'Libro no encontrado' });
    res.json({ success: true, data: libro });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const actualizarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!libro) return res.status(404).json({ success: false, error: 'Libro no encontrado' });
    res.json({ success: true, data: libro });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    if (!libro) return res.status(404).json({ success: false, error: 'Libro no encontrado' });
    res.json({ success: true, message: 'Libro eliminado' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { crearLibro, obtenerLibros, obtenerLibro, actualizarLibro, eliminarLibro };