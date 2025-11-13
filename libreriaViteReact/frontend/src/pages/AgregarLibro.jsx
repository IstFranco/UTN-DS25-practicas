import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { libroSchema } from '../validations/libroSchema';
import { useNavigate } from 'react-router-dom';

export default function AgregarLibro({ setLibros }) {
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: yupResolver(libroSchema)
    });

    const onSubmit = async (data) => {
        setServerError('');
        setSuccess('');
        
        const token = localStorage.getItem('userToken');

        if(!token) {
            setServerError('Error: Debes iniciar sesion para agregar un libro.');
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/libros`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.status === 401) {
                setServerError('Tu sesion ha expirado Por favor, inicie sesion nuevamente.')
                localStorage.removeItem('userToken');
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            if (!response.ok) {
                throw new Error(responseData.error || 'Error al agregar el libro');
            }

            setLibros(librosAnteriores => [responseData, ...librosAnteriores]);

            setSuccess(`¡Libro "${responseData.titulo}" agregado con éxito!`);
            reset();

        } catch (err) {
            setServerError(err.message);
        }
    };

    const formStyles = 'bg-white p-6 rounded shadow-md w-full max-w-lg space-y-4';
    const inputStyles = 'w-full mt-1 p-2 rounded border border-gray-300';
    const buttonStyles = 'bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition';

    return (
        <div className='p-6 flex justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className={formStyles}>
                <h2 className='text-xl font-bold text-center mb-2'>Agregar Nuevo Libro</h2>

                {serverError && <div className="error-message">{serverError}</div>}

                <div>
                    <label htmlFor='titulo' className='block font-medium'>Título</label>
                    <input
                        type='text' id='titulo'
                        {...register("titulo")}
                        className={`${inputStyles} ${errors.titulo ? 'input-error' : ''}`}
                    />
                    {errors.titulo && <span className="field-error">{errors.titulo.message}</span>}
                </div>

                <div>
                    <label htmlFor='autor' className='block font-medium'>Autor</label>
                    <input
                        type='text' id='autor'
                        {...register("autor")}
                        className={`${inputStyles} ${errors.autor ? 'input-error' : ''}`}
                    />
                    {errors.autor && <span className="field-error">{errors.autor.message}</span>}
                </div>

                <div>
                    <label htmlFor='genero' className='block font-medium'>Género</label>
                    <input
                        type='text' id='genero'
                        {...register("genero")}
                        className={`${inputStyles} ${errors.genero ? 'input-error' : ''}`}
                    />
                    {errors.genero && <span className="field-error">{errors.genero.message}</span>}
                </div>
                
                <div>
                    <label htmlFor='precio' className='block font-medium'>Precio</label>
                    <input
                        type='text'
                        id='precio'
                        {...register("precio")}
                        className={`${inputStyles} ${errors.precio ? 'input-error' : ''}`}
                    />
                    {errors.precio && <span className="field-error">{errors.precio.message}</span>}
                </div>
                
                <div>
                    <label htmlFor='imagen' className='block font-medium'>URL de Imagen (Opcional)</label>
                    <input
                        type='text' id='imagen'
                        {...register("imagen")}
                        className={`${inputStyles} ${errors.imagen ? 'input-error' : ''}`}
                    />
                    {errors.imagen && <span className="field-error">{errors.imagen.message}</span>}
                </div>

                <button type='submit' disabled={isSubmitting} className={buttonStyles}>
                    {isSubmitting ? 'Guardando...' : 'Agregar Libro'}
                </button>

                {success && <p className="text-green-600 text-center font-bold">{success}</p>}
            </form>
        </div>
    );
}