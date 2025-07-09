"use client"

import { useState } from "react";
import Mes from "./Month";
import Quincenal from './Quincenal'

function Selecionador() {
  const [componenteSeleccionado, setComponenteSeleccionado] =
    useState("Mes");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setComponenteSeleccionado(event.target.value);
  };

  return (
    <div>
      <select value={componenteSeleccionado} onChange={handleChange}
       className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
      >
        <option value="Mes">Mes</option>
        <option value="Quincenal">Quiencenal</option>
      </select>

      
        {componenteSeleccionado === "Mes" && <Mes />}
        {componenteSeleccionado === "Quincenal" && <Quincenal />}
    
      
    </div>
  );
}

export default Selecionador;
