import express from 'express';
import { getLibros, createLibro, deleteLibro } from '../controllers/libroController.js';

const router = express.Router();

router.get('/', getLibros);
router.post('/', createLibro);
router.delete('/:id', deleteLibro);

export default router;  