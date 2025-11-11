import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import libro from './routes/libro';
import usuario from './routes/usuario';
import reseña from './routes/reseña';

// Configurar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ya no se que hacer para que se impirman los datos migrados.
// Middleware de debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Ruta de prueba - buena ptractica
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Librería funcionando correctamente!',
        version: '1.0.0',
        endpoints: [
            'GET /api/libros',
            'POST /api/libros',
            'GET /api/usuarios',
            'POST /api/usuarios',
            'GET /api/reseñas',
            'POST /api/reseñas'
//            'POST /api/users'
        ]
    });
});

app.use('/api/libros', libro);
app.use('/api/usuarios', usuario);
app.use('/api/reseñas', reseña);

console.log('✅ --- ¡Archivo de rutas de USUARIO cargado! --- ✅');

export default app;