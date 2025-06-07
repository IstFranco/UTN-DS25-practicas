import React from 'react'
import Header from './components/Header' //si pongo ./component/Header me da error, sacando el '.' no me aparece error, pero no anda la pagina..
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop';
import Inicio from './pages/Inicio' 
import DesarrolloPersonal from './pages/DesarrolloPersonal' 
import Fisica from './pages/Fisica' 
import Matematicas from './pages/Matematicas' 
import Fantasia from './pages/Fantasia' 
import Registrate from './pages/Registrate' 
import Contacto from './pages/Contacto' 
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

function App(){
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <ScrollToTop /> {/*} 🔁 Esto se ejecuta cada vez que cambia la ruta */}
        <Header />
        <main className='flex-grow flex-1 p-4' style={{backgroundColor: '#4a2f24'}}>
          {/*flex-grow no se si hace falta, ya que el main ocupa todo de por si.*/}
          <Routes>
            <Route path='/' element={<Inicio />}/>
            <Route path='/DesarrolloPersonal' element={<DesarrolloPersonal />}/>
            <Route path='/Fisica' element={<Fisica />}/>
            <Route path='/Matematicas' element={<Matematicas />}/>
            <Route path='/Fantasia' element={<Fantasia />}/>
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
