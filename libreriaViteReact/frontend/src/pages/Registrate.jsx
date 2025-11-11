import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usuarioRegisterSchema } from '../validations/usuarioSchema';

export default function Registrate() {
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: yupResolver(usuarioRegisterSchema)
    });

    const onSubmit = async (data) => {
        setServerError('');
        setSuccess('');
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}api/usuarios/registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Error al registrarse');
            }

            setSuccess(`¡Usuario ${responseData.usuario} registrado con éxito!`);
            reset();

        } catch (err) {
            setServerError(err.message);
        }
    };

    return (
        <div className='p-6 flex justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-[#b4978e] p-6 rounded shadow w-80 text-sm text-gray-900 space-y-4'>
                <h2 className='text-xl font-bold text-center mb-2'>Registro de usuario</h2>

                {serverError && <div className="error-message">{serverError}</div>}

                <div>
                    <label htmlFor='usuario' className='block font-medium'>Nombre de usuario</label>
                    <input
                        type='text'
                        id='usuario'
                        {...register("usuario")}
                        className={`w-full mt-1 p-2 rounded border border-gray-900 ${errors.usuario ? 'input-error' : ''}`}
                    />
                    {errors.usuario && <span className="field-error">{errors.usuario.message}</span>}
                </div>

                <div>
                    <label htmlFor='nombre' className='block font-medium'>Nombre completo</label>
                    <input
                        type='text'
                        id='nombre'
                        {...register("nombre")}
                        className={`w-full mt-1 p-2 rounded border border-gray-900 ${errors.nombre ? 'input-error' : ''}`}
                    />
                    {errors.nombre && <span className="field-error">{errors.nombre.message}</span>}
                </div>

                <div>
                    <label htmlFor='email' className='block font-medium'>Email</label>
                    <input
                        type='email'
                        id='email'
                        {...register("email")}
                        className={`w-full mt-1 p-2 rounded border border-gray-900 ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && <span className="field-error">{errors.email.message}</span>}
                </div>

                <div>
                    <label htmlFor='password' className='block font-medium'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        {...register("password")}
                        className={`w-full mt-1 p-2 rounded border border-gray-900 ${errors.password ? 'input-error' : ''}`}
                    />
                    {errors.password && <span className="field-error">{errors.password.message}</span>}
                </div>

                <div>
                    <label htmlFor='edad' className='block font-medium'>Edad</label>
                    <input
                        type='number'
                        id='edad'
                        {...register("edad")}
                        className={`w-full mt-1 p-2 rounded border border-gray-900 ${errors.edad ? 'input-error' : ''}`}
                    />
                    {errors.edad && <span className="field-error">{errors.edad.message}</span>}
                </div>

                <div>
                    <label htmlFor='sexo' className='block font-medium'>Sexo</label>
                    <select
                        id='sexo'
                        {...register("sexo")}
                        className='w-full mt-1 p-2 rounded border border-gray-900'
                    >
                        <option value=''>Seleccionar</option>
                        <option value='masculino'>Masculino</option>
                        <option value='femenino'>Femenino</option>
                        <option value='otro'>Otro</option>
                    </select>
                </div>

                <div>
                    <label htmlFor='pais' className='block font-medium'>País</label>
                    <input
                        type='text'
                        id='pais'
                        {...register("pais")}
                        className='w-full mt-1 p-2 rounded border border-gray-900'
                    />
                </div>

                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='bg-[#3d1f12] text-white w-full py-2 rounded hover:bg-[#2c140d] transition'
                >
                    {isSubmitting ? 'Registrando...' : 'Registrarse'}
                </button>

                {success && <p className="text-green-800 text-center font-bold">{success}</p>}
            </form>
        </div>
    );
}