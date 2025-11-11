import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const crearReseña = async (req: Request, res: Response) => {
    try {
        const { comentario, puntuacion, usuarioId, libroId } = req.body;

        if (!comentario || !puntuacion || !usuarioId || !libroId) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios: comentario, puntuacion, usuarioId y libroId'
            });
        }
        
        const puntuacionNum = parseInt(puntuacion, 10);
        const usuarioIdNum = parseInt(usuarioId, 10);
        const libroIdNum = parseInt(libroId, 10);
        
        if (isNaN(puntuacionNum) || isNaN(usuarioIdNum) || isNaN(libroIdNum)) {
            return res.status(400).json({ error: 'Puntuacion, usuarioId y libroId deben ser números' });
        }

        const nuevaReseña = await prisma.reseña.create({
            data: { comentario, puntuacion: puntuacionNum, usuarioId: usuarioIdNum, libroId: libroIdNum }
        });
        
        res.status(201).json(nuevaReseña);

    } catch (error: any) {
        if (error.code === 'P2003') {
            return res.status(404).json({ error: 'El usuario o el libro especificado no existe' });
        }
        
        res.status(500).json({ error: 'Error interno del servidor al crear reseña' });
    }
};

export const listarReseñasPorLibro = async (req: Request, res: Response) => {
    try {
        const { libroId } = req.params;
        const libroIdNum = parseInt(libroId, 10);

        if (isNaN(libroIdNum)) {
            return res.status(400).json({ error: 'El ID del libro debe ser un número' });
        }

        const reseñas = await prisma.reseña.findMany({
            where: { libroId: libroIdNum },
            orderBy: { createdAt: 'desc' },
            include: { usuario: { select: { id: true, usuario: true } } }
        });

        res.json(reseñas);

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al obtener reseñas' });
    }
};
