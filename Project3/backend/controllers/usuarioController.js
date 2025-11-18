import Usuario from '../models/Usuario.js';
import Libro from '../models/Libro.js';

// GET todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// POST crear usuario (ESTE FALTABA → POR ESO NUNCA SE CREABAN BIEN)
export const createUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(400).json({ message: error.message });
  }
};

// POST prestar libro (AHORA SÍ GUARDA EN ATLAS)
export const prestarLibro = async (req, res) => {
  try {
    const { codigo_usuario, isbn } = req.body;

    const libro = await Libro.findOne({ isbn });
    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });

    const usuario = await Usuario.findOneAndUpdate(
      { codigo_usuario },
      {
        $push: {
          prestamos_actuales: {
            libro_isbn: isbn,
            titulo: libro.titulo,
            fecha_prestamo: new Date()
          }
        }
      },
      { new: true }
    );

    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    console.log('PRÉSTAMO GUARDADO EN ATLAS:', usuario.prestamos_actuales);
    res.json(usuario);
  } catch (error) {
    console.error('Error en prestarLibro:', error);
    res.status(500).json({ message: 'Error al prestar libro' });
  }
};

// POST devolver libro
export const devolverLibro = async (req, res) => {
  try {
    const { codigo_usuario, isbn } = req.body;

    const usuario = await Usuario.findOneAndUpdate(
      { codigo_usuario },
      { $pull: { prestamos_actuales: { libro_isbn: isbn } } },
      { new: true }
    );

    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    console.log('LIBRO DEVUELTO EN ATLAS');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al devolver' });
  }
};