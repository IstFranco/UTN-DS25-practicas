import { Router } from 'express';
import { listarUsuarios, registrarUsuario } from '../controllers/usuarioController';
import { validateSchema } from '../middleware/validateSchema';
import { usuarioRegisterSchema } from '../schemas/usuarioSchema';

const router = Router();

// Middleware de debugging (útil para ver qué rutas se están usando)
router.use((req, res, next) => {
    console.log(`[Router Usuarios] Ruta llamada: ${req.method} ${req.path}`);
    next();
});

// GET /api/usuarios -> Listar todos los usuarios
router.get('/', listarUsuarios);

// POST /api/usuarios/registro -> Registrar un nuevo usuario
router.post(
    '/registro',
    validateSchema(usuarioRegisterSchema), // <-- ¡ESTA LÍNEA FALTABA!
    registrarUsuario
);

console.log('✅ --- ¡Archivo de rutas de USUARIO.TS cargado correctamente! --- ✅');

export default router;