import React, { useState } from "react";

export default function BarraBusqueda({ onBuscar }) {
    const [termino, setTermino] = useState("");
    
    // e de evento
    const busqueda = (e) => {
        const valor = e.target.value;
        setTermino(valor); // guarda el valor
        onBuscar(valor); // muestra el valor, lo envía al componente padre.
    }

    return (
        <div className="mb-6">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Ingrese el título del libro que busca..."
                    value={termino}
                    onChange={busqueda} // ← ¡ESTO ES LO QUE FALTABA!
                    className="w-full p-3 pl-10 bg-[#b4978e] rounded-lg border-2 border-[#b4978e] focus:outline-none focus:border-[#8b6f66] text-gray-800"
                />
                {/* ícono de búsqueda */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700">
                    🔍
                </div>    
            </div>
        </div>
    );
}