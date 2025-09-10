import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Libros } from './data/libros';

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
            'POST /api/books',
            'POST /api/users'
        ]
    });
});

// API ENDPOINTS

// GET /api/books - Obtener todos los libros
app.get('/api/books', (req, res) => {
    res.json(Libros);
});

// POST /api/books - Agregar nuevo libro
app.post('/api/books', (req, res) => {
    const nuevoLibro = {
        id: Date.now(), // ID simple para el ejercicio
        ...req.body
    };
    
    Libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

// POST /api/users - Registrar usuario
app.post('/api/users', (req, res) => {
    const nuevoUsuario = {
        id: Date.now(),
        ...req.body
    };
    
    res.status(201).json({ 
        message: 'Usuario registrado exitosamente',
        usuario: nuevoUsuario
    });
});

export default app;