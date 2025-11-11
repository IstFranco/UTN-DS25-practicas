import React, { useState } from 'react';

export default function Registrate() {
    const [formData, setFormData] = useState({
        usuario: '',
        nombre: '',
        email: '',
        password: '',
        edad: '',
        sexo: '',
        pais: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const dataParaEnviar = { ...formData };
        if (dataParaEnviar.edad === '') delete dataParaEnviar.edad;
        if (dataParaEnviar.sexo === '') delete dataParaEnviar.sexo;
        if (dataParaEnviar.pais === '') delete dataParaEnviar.pais;
        
        try {
            const response = await fetch('http://localhost:3001/api/usuarios/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataParaEnviar),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Error al registrarse');

            setSuccess(`¡Usuario ${data.usuario} registrado con éxito!`);
            setFormData({ usuario: '', nombre: '', email: '', password: '', edad: '', sexo: '', pais: '' });

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='p-6 flex justify-center'>
            <form onSubmit={handleSubmit} className='bg-[#b4978e] p-6 rounded shadow w-80 text-sm text-gray-900 space-y-4'>
                <h2 className='text-xl font-bold text-center mb-2'>Registro de usuario</h2>

                <div>
                    <label htmlFor='usuario' className='block font-medium'>Nombre de usuario</label>
                    <input type='text' id='usuario' name='usuario' value={formData.usuario} onChange={handleChange} className='w-full mt-1 p-2 rounded border border-gray-900' required />
                </div>

                <div>
                    <label htmlFor='nombre' className='block font-medium'>Nombre completo</label>
                    <input type='text' id='nombre' name='nombre' value={formData.nombre} onChange={handleChange} className='w-full mt-1 p-2 rounded border border-gray-900' required />
                </div>

                <div>
                    <label htmlFor='email' className='block font-medium'>Email</label>
                    <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} className='w-full mt-1 p-2 rounded border border-gray-900' required />
                </div>

                <div>
                    <label htmlFor='password' className='block font-medium'>Contraseña</label>
                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} className='w-full mt-1 p-2 rounded border border-gray-900' required />
                </div>

                <div>
                    <label htmlFor='edad' className='block font-medium'>Edad</label>
                    <input type='number' id='edad' name='edad' value={formData.edad} onChange={handleChange} className='w-full mt-1 p-2 rounded border border-gray-900' />
                </div>

                <div>
                    <label htmlFor='sexo' className='block font-medium'>Sexo</label>
                    <select id='sexo' name='sexo' value={formData.sexo} onChange={handleChange} className='w-full mt-1 p-2 rounded border border-gray-900'>
                        <option value=''>Seleccionar</option>
                        <option value='masculino'>Masculino</option>
                        <option value='femenino'>Femenino</option>
                        <option value='otro'>Otro</option>
                        <option value='prefiero-no-decir'>Prefiero no decir</option>
                    </select>
                </div>

                <div>
                    <label htmlFor='pais' className='block font-medium'>País</label>
                    <input type='text' id='pais' name='pais' value={formData.pais} onChange={handleChange} className='w-full mt-1 p-2 rounded border border-gray-900' />
                </div>

                <button type='submit' className='bg-[#3d1f12] text-white w-full py-2 rounded hover:bg-[#2c140d] transition'>
                    Registrarse
                </button>

                {success && <p className="text-green-800 text-center font-bold">{success}</p>}
                {error && <p className="text-red-800 text-center font-bold">{error}</p>}
            </form>
        </div>
    );
}
