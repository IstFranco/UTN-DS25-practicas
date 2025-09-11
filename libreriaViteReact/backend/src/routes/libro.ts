import { Router } from 'express';
import { listarLibros, crearLibro } from '../controllers/libroController';

const router = Router();

// GET /api/books - Obtener todos los libros
router.get('/', listarLibros);

// POST /api/books - Agregar nuevo libro
router.post('/', crearLibro);

export default router;