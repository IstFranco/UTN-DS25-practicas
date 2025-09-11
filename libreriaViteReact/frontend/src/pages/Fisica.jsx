import React from 'react'

export default function Fisica({ libros }) {
    
    if (!libros || !Array.isArray(libros)) {
        return <div className="text-white text-center p-6">Cargando...</div>;
    }
    
    const librosDesarrollo = libros.filter(
        (libro) => libro.genero === 'Fisica'
    );

    return (
        <div className='p-6 grid gap-6 md:grid-cols-3 justify-center'>
            {librosDesarrollo.map((libro) => (
                <div key={libro.id} className='p-6 rounded shadow w-60 mx-auto' style={{backgroundColor: '#b4978e'}}>
                    <img
                        src={libro.imagen}
                        alt={libro.nombre}
                        className='h-[300px] w-[200px] object-contain mx-auto'
                    />
                    <h2 className='text-lg font-bold mt-2'>{libro.titulo}</h2>
                    <p className='text-sm text-gray-600'>{libro.autor}</p>
                    <p className='text-m font-bold text-gray-900'>{libro.precio}</p>
                </div>
            ))}
        </div>
    );
}
