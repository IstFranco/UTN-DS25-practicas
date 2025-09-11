import { Router } from 'express';
import { listarLibros, crearLibro } from '../controllers/libroController';

const router = Router();

// Middleware de debugging temporal
router.use((req, res, next) => {
    console.log(`Ruta llamada: ${req.method} ${req.path}`);
    next();
});

router.get('/', listarLibros);
router.post('/', crearLibro);

export default router;