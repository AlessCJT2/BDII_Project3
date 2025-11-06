const express = require('express');
const router = express.Router();
const {
  crearLibro,
  obtenerLibros,
  obtenerLibro,
  actualizarLibro,
  eliminarLibro
} = require('../controllers/libroController');

router.post('/', crearLibro);           
router.get('/', obtenerLibros);      
router.get('/:id', obtenerLibro);      
router.put('/:id', actualizarLibro);    
router.delete('/:id', eliminarLibro);   

module.exports = router;