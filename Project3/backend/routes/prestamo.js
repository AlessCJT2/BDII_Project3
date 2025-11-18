import express from 'express';
import { getPrestamos, createPrestamo, devolverPrestamo } from '../controllers/prestamoController.js';

const router = express.Router();

router.get('/', getPrestamos);
router.post('/', createPrestamo);
router.put('/:id/devolver', devolverPrestamo);

export default router;