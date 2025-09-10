import React, { useState } from 'react'

export default function AgregarLibro({ setLibros }) {

    const [nuevoLibro, setNuevoLibro] = useState({
        titulo: '',
        autor: '',
        imagen: '',
        genero: '',
        precio: '',
        destacado: false,
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevoLibro({
            ...nuevoLibro,
            [name]: value
        });
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();

        try {
            // Preparar datos 
            const libroCompleto = {
                ...nuevoLibro,
                imagen: nuevoLibro.imagen || '/images/placeholder.jpg'
            };

            // ENVIAR al backend con fetch
            const response = await fetch('http://localhost:3001/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(libroCompleto)
            });

            // Recibir respuesta del backend
            const nuevoLibroCreado = await response.json();

            // Actualizar el estado local con el libro que devolvió el backend
            setLibros(librosActuales => [...librosActuales, nuevoLibroCreado]);
            
            // Limpiar formulario
            setNuevoLibro({ 
                titulo: '', 
                autor: '', 
                imagen: '', 
                genero: '', 
                precio: '', 
                destacado: false, 
            });
            alert('¡Libro agregado con éxito!');

        } catch (error) {
            console.error('Error al agregar libro: ', error);
            alert('Error al agregar el libro')
        }
    };

    return (
        <div>
            <div className="p-6 max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-center text-white mb-8">
                    📖 Agregar Nuevo Libro
                </h1>
                <form onSubmit={manejarSubmit} className="space-y-4">
                    <label className="block text-white mb-2">Titulo: </label>
                    <input
                        type="text"
                        name="titulo"
                        value={nuevoLibro.titulo}
                        onChange={manejarCambio}
                        className='w-full bg-[#f7e5df] p-3 rounded border border-gray-300'
                        placeholder='Ingrese el titulo'
                        required
                    />
                    <label className="block text-white mb-2">Autor: </label>
                    <input
                        type="text"
                        name="autor"
                        value={nuevoLibro.autor}
                        onChange={manejarCambio}
                        className='w-full bg-[#f7e5df] p-3 rounded border border-gray-300'
                        placeholder='Ingrese el autor'
                        required
                    />
                    <label className="block text-white mb-2">Imagen: </label>
                    <input
                        type="url"
                        name="imagen"
                        value={nuevoLibro.imagen}
                        onChange={manejarCambio}
                        className='w-full bg-[#f7e5df] p-3 rounded border border-gray-300'
                        placeholder='Ingrese la URL de la imagen'
                        required
                    />
                    <label className="block text-white mb-2">Genero: </label>
                    <input
                        type="text"
                        name="genero"
                        value={nuevoLibro.genero}
                        onChange={manejarCambio}
                        className='w-full bg-[#f7e5df] p-3 rounded border border-gray-300'
                        placeholder='Ingrese el genero (debe existir)'
                        required
                    />
                    <label className="block text-white mb-2">Precio: </label>
                    <input
                        type="Text"
                        name="precio"
                        value={nuevoLibro.precio}
                        onChange={manejarCambio}
                        className='w-full bg-[#f7e5df] p-3 rounded border border-gray-300'
                        placeholder='Formato: "$9999.99"'
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#b4978e] text-white p-3 rounded hover:bg-[#8b6f66] transition-colors cursor-pointer"
                    >
                        Agregar Libro
                    </button>

                </form>
            </div>
        </div>
    )
}