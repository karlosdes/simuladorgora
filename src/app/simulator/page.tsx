"use client"
import FiltrosSoat from '@/components/FilterSoat';
import { SimuletorFilter } from "@/types/filter.type";
import "./style.css";


function page() {

  const handleFiltrosChange = (filtros : SimuletorFilter) => {
    console.log('Filtros seleccionados:', filtros);
    // Aquí puedes hacer fetch de los datos filtrados si quieres
  };

  return (
    <div className=" titleOne flex flex-col items-center justify-center m-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className=" text-3xl font-extrabold text-back-700 mb-2" >
        Calcule su cuota
      </h2>
      
      <p className="text-sm text-gray-600 mb-6 italic">
        * Estos valores podrán estar sujetos a cambios
      </p>


      <hr className="w-full border-t-4 border-yellow-400 my-6 md:w-3/4 lg:w-1/4" />


      <section>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Filtrar SOAT</h1>
          <FiltrosSoat onChange={handleFiltrosChange} />
          {/* Aquí iría tu tabla o resultados filtrados */}
        </div>
      </section>
    </div>
  );
}

export default page;

