import express from 'express';
import { getUsuarios, createUsuario, prestarLibro, devolverLibro } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);           // ← ESTO ES CLAVE
router.post('/prestar', prestarLibro);
router.post('/devolver', devolverLibro);

export default router;