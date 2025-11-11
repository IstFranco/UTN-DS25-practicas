import { Router } from 'express';
import { crearReseña, listarReseñasPorLibro } from '../controllers/reseñaController';

const router = Router();

// Middleware de debugging
router.use((req, res, next) => {
    console.log(`[Router Reseñas] Ruta llamada: ${req.method} ${req.path}`);
    next();
});

// POST /api/reseñas -> Crear una nueva reseña
router.post('/', crearReseña);

// GET /api/reseñas/libro/:libroId -> Listar todas las reseñas de un libro específico
router.get('/libro/:libroId', listarReseñasPorLibro);


export default router;