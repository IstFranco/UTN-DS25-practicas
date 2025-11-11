import { z } from 'zod';

export const usuarioRegisterSchema = z.object({
    usuario: z.string().min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres'
    }),
    
    nombre: z.string().min(1, {
        message: 'El nombre es obligatorio'
    }),
    
    email: z.string().email({
        message: 'Debe ser un email válido'
    }),
    
    password: z.string().min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }),
    
    //opcionales

    edad: z.coerce.number().int({
        message: 'La edad debe ser un número entero'
    }).positive({
        message: 'La edad debe ser un número positivo'
    }).optional(),
    
    sexo: z.string().optional(),
    
    pais: z.string().optional(),
});