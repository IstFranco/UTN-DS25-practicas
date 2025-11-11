import { Router } from 'express';
import { listarLibros, crearLibro, obtenerLibroPorId } from '../controllers/libroController';
import { validateSchema } from '../middleware/validateSchema'; 
import { libroSchema } from '../schemas/libroSchema';

const router = Router();

// Middleware de debugging temporal
router.use((req, res, next) => {
    console.log(`Ruta llamada: ${req.method} ${req.path}`);
    next();
});

// POST /api/libros/ -> Aquí aplicamos la validación
router.post(
    '/', 
    validateSchema(libroSchema),
    crearLibro
);

// GET /api/libros -> Listar todos los libros
router.get('/', listarLibros);

// GET /api/libros/:id -> Obtener un libro por ID (¡NUEVA RUTA!)
router.get('/:id', obtenerLibroPorId);

export default router;