import * as yup from 'yup';

export const libroSchema = yup.object().shape({
    titulo: yup.string()
        .required('El título es obligatorio'),
    
    autor: yup.string()
        .required('El autor es obligatorio'),
    
    precio: yup.string() 
        .required('El precio es obligatorio'),
        
    genero: yup.string()
        .required('El género es obligatorio'),

    imagen: yup.string()
        .url('Debe ser una URL válida')
        .optional()
});