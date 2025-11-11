import { z } from 'zod';

export const libroSchema = z.object({
    titulo: z.string().min(1, { 
        message: 'El título es obligatorio' 
    }),
    
    autor: z.string().min(1, { 
        message: 'El autor es obligatorio' 
    }),
    
    imagen: z.string().url({
        message: 'La imagen debe ser una URL válida'
    }).optional().or(z.literal('')),
    
    genero: z.string().min(1, { 
        message: 'El género es obligatorio' 
    }),
    
    precio: z.string().min(1, { 
        message: 'El precio es obligatorio' 
    }),
    
    destacado: z.boolean().optional().default(false),
});