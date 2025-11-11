import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop';
import Inicio from './pages/Inicio'
import AgregarLibro from './pages/AgregarLibro'
import Catalogo from './pages/Catalogo'
import DesarrolloPersonal from './pages/DesarrolloPersonal'
import Fisica from './pages/Fisica'
import Matematicas from './pages/Matematicas'
import Fantasia from './pages/Fantasia'
import Registrate from './pages/Registrate'
import Contacto from './pages/Contacto'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

function App(){

  const [libros, setLibros] = useState([]);
  
  useEffect(() =>{
    fetch('http://localhost:3001/api/libros')
    .then(res => res.json())
    .then(data => setLibros(data))
    .catch(error => console.error('Error al cargar libros: ', error))
}, []);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className='flex-grow flex-1 p-4' style={{backgroundColor: '#4a2f24'}}>
          <Routes>
            <Route path='/' element={<Inicio libros={libros} />}/>
            <Route path='/Catalogo' element={<Catalogo libros={libros} />}/>
            <Route path='/AgregarLibro' element={<AgregarLibro setLibros={setLibros} />} />
            <Route path='/DesarrolloPersonal' element={<DesarrolloPersonal libros={libros} />}/>
            <Route path='/Fisica' element={<Fisica libros={libros} />}/>
            <Route path='/Matematicas' element={<Matematicas libros={libros} />}/>
            <Route path='/Fantasia' element={<Fantasia libros={libros} />}/>
            <Route path='/Registrate' element={<Registrate />}/>
            <Route path='/Contacto' element={<Contacto />}/>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App