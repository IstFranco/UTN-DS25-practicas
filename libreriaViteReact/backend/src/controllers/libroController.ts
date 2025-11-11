import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Libro } from '../types/libro';

const prisma = new PrismaClient();

// GET /api/libros - Listar todos los libros
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

// POST /api/libros - Crear nuevo libro
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

// GET /api/libros/:id - Obtener un libro por ID con sus reseñas
export const obtenerLibroPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const libroIdNum = parseInt(id, 10);

        if (isNaN(libroIdNum)) {
            return res.status(400).json({ error: 'El ID debe ser un número' });
        }

        console.log(`🔍 Buscando libro con ID: ${libroIdNum} y sus reseñas...`);

        const libro = await prisma.libro.findUnique({
            where: {
                id: libroIdNum
            },
            include: {
                reseñas: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                usuario: true 
                            }
                        }
                    }
                }
            }
        });

        if (!libro) {
            console.log(`❌ No se encontró el libro con ID: ${libroIdNum}`);
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        console.log(`✅ Libro [${libro.titulo}] y [${libro.reseñas.length}] reseñas obtenidas.`);
        res.json(libro);

    } catch (error) {
        console.error('❌ Error detallado al obtener libro por ID:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};