import { Request, Response } from 'express';
import { Libros } from '../data/libros';
import { Libro } from '../types/libro'; 

// GET /api/books - Listar todos los libros
export const listarLibros = (req: Request, res: Response) => {
    try {
        res.json(Libros);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error interno del servidor al obtener libros' 
        });
    }
};

// POST /api/books - Crear nuevo libro
export const crearLibro = (req: Request, res: Response) => {
    try {
        const nuevoLibro = {
            id: Date.now(),
            ...req.body
        };
        
        Libros.push(nuevoLibro);
        
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error interno del servidor al crear libro' 
        });
    }
};