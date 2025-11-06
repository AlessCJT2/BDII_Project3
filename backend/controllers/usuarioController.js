const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json({ success: true, data: usuario });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const { nombre, email } = req.query;
    let filtro = {};
    if (nombre) filtro.nombre = new RegExp(nombre, 'i');
    if (email) filtro.email = new RegExp(email, 'i');

    const usuarios = await Usuario.find(filtro).select('-__v');
    res.json({ success: true, data: usuarios, total: usuarios.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    res.json({ success: true, data: usuario });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    res.json({ success: true, data: usuario });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    res.json({ success: true, message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { crearUsuario, obtenerUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario };