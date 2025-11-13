import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        setServerError('');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email, password: data.password }), 
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Credenciales inválidas');
            }

            localStorage.setItem('userToken', responseData.token);
            
            reset();
            navigate('/AgregarLibro'); 

        } catch (err) {
            setServerError(err.message);
        }
    };

    return (
        <div className='p-6 flex justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-[#b4978e] p-6 rounded shadow w-80 text-sm text-gray-900 space-y-4'>
                <h2 className='text-xl font-bold text-center mb-2'>Iniciar Sesión</h2>

                {serverError && <div className="error-message">{serverError}</div>}

                <div>
                    <label htmlFor='email' className='block font-medium'>Email</label>
                    <input
                        type='email'
                        id='email'
                        {...register("email", { required: "Email es requerido" })}
                        className={`w-full mt-1 p-2 rounded border border-gray-900 ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && <span className="field-error">{errors.email.message}</span>}
                </div>

                <div>
                    <label htmlFor='password' className='block font-medium'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        {...register("password", { required: "Contraseña es requerida" })}
                        className={`w-full mt-1 p-2 rounded border border-gray-900 ${errors.password ? 'input-error' : ''}`}
                    />
                    {errors.password && <span className="field-error">{errors.password.message}</span>}
                </div>
                
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='bg-[#3d1f12] text-white w-full py-2 rounded hover:bg-[#2c140d] transition'
                >
                    {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>

                <p className="text-center mt-4">
                    ¿No tenes cuenta? <Link to="/registro-usuario" className="text-[#3d1f12] underline font-bold">Regístrate aquí</Link>
                </p>
            </form>
        </div>
    );
}