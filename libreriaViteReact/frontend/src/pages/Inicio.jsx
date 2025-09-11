import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BarraBusqueda from '../components/BarraBusqueda';

export default function Inicio({ libros }) {

    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [mostrarTodo, setMostrarTodo] = useState(false);

    if (!libros || !Array.isArray(libros)) {
        return <div className="text-white text-center p-6">Cargando...</div>;
    }

    const inicio = libros.filter(
        (libro) => libro.destacado === true
    );

    const manejarBusqueda = (termino) => {
        setTerminoBusqueda(termino);
        setMostrarTodo(termino.length > 0);
    };

    const librosMostrar = mostrarTodo 
        ? inicio.filter(libro => 
            libro.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())
        )
        : inicio;

    return (
        <div className='p-6'>
            
            <h1 className='text-3xl md:text-4xl font-bold text-center text-white mb-8 border-b-4 border-[#b4978e] inline-block pb-2'>
                {mostrarTodo ? '🔍 Resultados de búsqueda' : '✨Títulos destacados✨'}
            </h1>
            
            <BarraBusqueda onBuscar={manejarBusqueda} />

            <p className='text-[#e0d6d3] mt-3 text-sm md:text-base italic'>
                {mostrarTodo 
                    ? `Encontramos ${librosMostrar.length} libro(s) con "${terminoBusqueda}"`
                    : 'Descubrí nuestras recomendaciones más elegidas por los lectores'
                }
            </p>

            <div className='p-6 grid gap-6 md:grid-cols-3 justify-center'>
                {librosMostrar.map((libro) => (
                    <Link 
                        to={`/${libro.genero}`}
                        key={libro.id}
                        className='p-6 rounded shadow w-60 mx-auto hover:scale-105 transition-transform'
                        style={{ backgroundColor: '#b4978e' }}
                    >
                        <img
                            src={libro.imagen}
                            alt={libro.nombre}
                            className='h-[300px] w-[200px] object-contain mx-auto'
                        />
                        <h2 className='text-lg font-bold mt-2'>{libro.titulo}</h2>
                        <p className='text-sm text-gray-600'>{libro.autor}</p>
                        <p className='text-m font-bold text-gray-900'>{libro.precio}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
