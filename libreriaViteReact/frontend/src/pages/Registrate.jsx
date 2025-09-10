import React from 'react'

export default function Registrate() {
    return (
        <div className='p-6 flex justify-center'>
            <form className='bg-[#b4978e] p-6 rounded shadow w-80 text-sm text-gray-900 space-y-4'>
                <h2 className='text-xl font-bold text-center mb-2'>Registro de usuario</h2>

                <div>
                    <label htmlFor='usuario' className='block font-medium'>Nombre de usuario</label>
                    <input
                        type='text'
                        id='usuario'
                        name='usuario'
                        className='w-full mt-1 p-2 rounded border border-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3d1f12]'
                        required
                    />
                </div>

                <div>
                    <label htmlFor='nombre' className='block font-medium'>Nombre completo</label>
                    <input
                        type='text'
                        id='nombre'
                        name='nombre'
                        className='w-full mt-1 p-2 rounded border border-gray-900'
                        required
                    />
                </div>

                <div>
                    <label htmlFor='email' className='block font-medium'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='w-full mt-1 p-2 rounded border border-gray-900'
                        required
                    />
                </div>

                <div>
                    <label htmlFor='password' className='block font-medium'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className='w-full mt-1 p-2 rounded border border-gray-900'
                        required
                    />
                </div>

                <div>
                    <label htmlFor='edad' className='block font-medium'>Edad</label>
                    <input
                        type='number'
                        id='edad'
                        name='edad'
                        className='w-full mt-1 p-2 rounded border border-gray-900'
                    />
                </div>

                <div>
                    <label htmlFor='sexo' className='block font-medium'>Sexo</label>
                    <select
                        id='sexo'
                        name='sexo'
                        className='w-full mt-1 p-2 rounded border border-gray-900'
                    >
                        <option value=''>Seleccionar</option>
                        <option value='masculino'>Masculino</option>
                        <option value='femenino'>Femenino</option>
                        <option value='otro'>Otro</option>
                        <option value='prefiero-no-decir'>Prefiero no decir</option>
                    </select>
                </div>

                <div>
                    <label htmlFor='pais' className='block font-medium'>País</label>
                    <input
                        type='text'
                        id='pais'
                        name='pais'
                        className='w-full mt-1 p-2 rounded border border-gray-900'
                    />
                </div>

                <button
                    type='submit'
                    className='bg-[#3d1f12] text-white w-full py-2 rounded hover:bg-[#2c140d] transition'
                >
                    Registrarse
                </button>
            </form>
        </div>
    )
}
