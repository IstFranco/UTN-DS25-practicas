import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='w-full p-4 text-white bg-cover bg-center bg-no-repeat min-h-[8rem]' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1632684140995-27b3244734af?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <nav className='flex flex-col items-start md:items-center'>
                <h1 className='text-4xl md:text-5xl font-bold sant-serif drop-shadow-md mb-3'>
                    📚 Alejandría <span className="text-[#f0e6dc]">FO</span>
                </h1>
                <ul className='border border-black w-full px-4 py-2 flex flex-col items-start md:flex-row md:justify-between md:items-center'>
                    <li className='border border-black p-0.5'>
                        <Link to='/'>🏠Inicio</Link>
                    </li>
                    <li>
                        <Link to='/Catalogo'>📚Catalogo</Link>
                    </li>
                    <li>
                        <Link to='AgregarLibro'>✔️Agregar Libro</Link>
                    </li>
                    <li>
                        <Link to='/DesarrolloPersonal'>🔑Desarrollo Personal</Link>
                    </li>
                    <li>
                        <Link to='/Fisica'>⚖️Fisica</Link>
                    </li>
                    <li>
                        <Link to='/Matematicas'>📊Matematicas</Link>
                    </li>
                    <li>
                        <Link to='/Fantasia'>🌌Fantasia</Link>
                    </li>
                    <li>
                        <Link to='/Registrate'>💯Registrate</Link>
                    </li>
                    <li>
                        <Link to='/Contacto'>📌Contacto</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
