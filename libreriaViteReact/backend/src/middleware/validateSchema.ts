import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateSchema = (schema: z.Schema) => 
    async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const validation = await schema.safeParseAsync(req.body);

        if (!validation.success) {
            return res.status(400).json({ 
                error: 'Datos de entrada inválidos',
                detalles: validation.error.format() 
            });
        }
        
        req.body = validation.data;

        next();

    } catch (error) {
        console.error('Error en el middleware de validación:', error);
        res.status(500).json({ error: 'Error interno durante la validación' });
    }
};