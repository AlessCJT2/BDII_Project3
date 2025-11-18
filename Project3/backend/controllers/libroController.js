import Libro from '../models/Libro.js';

export const getLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    console.error('Error GET libros:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createLibro = async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json(libro);
  } catch (error) {
    console.error('Error POST libro:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteLibro = async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ message: 'Libro eliminado' });
  } catch (error) {
    console.error('Error DELETE libro:', error);
    res.status(500).json({ message: 'Error interno' });
  }
};