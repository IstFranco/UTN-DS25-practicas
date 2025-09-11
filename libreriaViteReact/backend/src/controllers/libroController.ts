import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Libro } from '../types/libro';

const prisma = new PrismaClient();

// GET /api/books - Listar todos los libros
export const listarLibros = async (req: Request, res: Response) => {
    try {
        console.log('🔍 Intentando obtener libros de la base de datos...');
        const libros = await prisma.libro.findMany({
            orderBy: { createdAt: 'desc' }
        });
        console.log('✅ Libros obtenidos:', libros.length, 'registros');
        res.json(libros);
    } catch (error) {
        console.error('❌ Error detallado al obtener libros:', error);
        res.status(500).json({
            error: 'Error interno del servidor al obtener libros'
        });
    }
};

// POST /api/books - Crear nuevo libro
export const crearLibro = async (req: Request<{}, any, Libro>, res: Response) => {
    try {
        const nuevoLibro = await prisma.libro.create({
            data: req.body
        });
        
        res.status(201).json(nuevoLibro);
    } catch (error) {
        console.error('Error al crear libro:', error);
        res.status(500).json({
            error: 'Error interno del servidor al crear libro'
        });
    }
};