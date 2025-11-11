import * as yup from 'yup';

export const usuarioRegisterSchema = yup.object().shape({
    usuario: yup.string()
        .required('El nombre de usuario es obligatorio')
        .min(3, 'Debe tener al menos 3 caracteres'),

    nombre: yup.string()
        .required('El nombre es obligatorio'),
    
    email: yup.string()
        .required('El email es requerido')
        .email('Debe ser un email válido'),

    password: yup.string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),

    edad: yup.number()
        .typeError('La edad debe ser un número') 
        .positive('La edad debe ser un número positivo')
        .integer('La edad debe ser un número entero')
        .optional(),
    
    sexo: yup.string().optional(),
    pais: yup.string().optional()
});