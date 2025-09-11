import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import libroRoutes from './routes/libro';

// Configurar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba - buena ptractica
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Librería funcionando correctamente!',
        version: '1.0.0',
        endpoints: [
            'GET /api/books',
            'POST /api/books'
//            'POST /api/users'
        ]
    });
});

app.use('/api/books', libroRoutes);

export default app;