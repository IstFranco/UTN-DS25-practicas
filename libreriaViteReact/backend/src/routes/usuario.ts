import { Router } from 'express';
import { listarUsuarios, registrarUsuario, loginUsuario } from '../controllers/usuarioController';
import { validateSchema } from '../middleware/validateSchema';
import { usuarioRegisterSchema } from '../schemas/usuarioSchema';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// Middleware de debugging (útil para ver qué rutas se están usando)
router.use((req, res, next) => {
    console.log(`[Router Usuarios] Ruta llamada: ${req.method} ${req.path}`);
    next();
});

// POST /api/usuarios/registro -> Registrar un nuevo usuario
router.post(
    '/registro',
    validateSchema(usuarioRegisterSchema),
    registrarUsuario
);

router.post('/login', loginUsuario);

// Protegida
// GET /api/usuarios -> Listar todos los usuarios
router.get('/',
    authenticate,
    authorize('ADMIN'),
    listarUsuarios);

console.log('✅ --- ¡Archivo de rutas de USUARIO.TS cargado correctamente! --- ✅');

export default router;