"use client"

import { SimuletorFilter } from '@/types/filter.type';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form'; 
import Selecionador from './Selecionar';

const VehicleSchema = z.object({
  vehicle_id: z.number(),
  type_vehicle: z.string(),
});

const SubtypeSchema = z.object({
  subtype_id: z.number(),
  type: z.string(),
});

const AgeSchema = z.object({
  age_id: z.number(),
  age: z.string(),
});

const OpcionesSchema = z.object({
  vehicles: z.array(VehicleSchema),
  subtypes: z.array(SubtypeSchema),
  ages: z.array(AgeSchema),
});

type Vehicle = z.infer<typeof VehicleSchema>;
type Subtype = z.infer<typeof SubtypeSchema>;
type Age = z.infer<typeof AgeSchema>;


export default function FiltrosSoat({
  onChange,
}: {
  onChange: (filter: SimuletorFilter) => void;
}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [subtypes, setSubtypes] = useState<Subtype[]>([]);
  const [ages, setAges] = useState<Age[]>([]);

  // Usamos React Hook Form para manejar el estado del formulario
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SimuletorFilter>({
    defaultValues: {
      vehicle_id: '',
      subtype_id: '',
      age_id: '',
    },
  });

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const res = await fetch('/api/opciones');
        const data = await res.json();

        const parsed = OpcionesSchema.safeParse(data);

        if (!parsed.success) {
          console.error('❌ Error de validación Zod:', parsed.error);
          return;
        }

        const { vehicles, subtypes, ages } = parsed.data;

        setVehicles(vehicles);
        setSubtypes(subtypes);
        setAges(ages);
      } catch (error) {
        console.error('❌ Error al obtener datos de /api/opciones:', error);
      }
    };

    fetchDatos();
  }, []);

  // Esta función manejará el submit del formulario y enviará los valores al padre
  const onSubmit = (data: SimuletorFilter) => {
    onChange(data);
    console.log(data); // Aquí ves los valores que el usuario ha seleccionado
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 my-6">
      {/* Vehículo */}
      <div>
        <label className="block mb-1 font-medium">Vehículo</label>
        <select
          {...register('vehicle_id', { required: 'Selecciona un vehículo' })}  // Con RHF, registramos el input
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="">Seleccionar vehículo</option>
          {vehicles.map((v) => (
            <option key={v.vehicle_id} value={v.type_vehicle}>
              {v.type_vehicle}
            </option>
          ))}
        </select>
        {errors.vehicle_id && <span className="text-red-500">{errors.vehicle_id.message}</span>} {/* Error en el campo */}
      </div>

      {/* Subtipo */}
      <div>
        <label className="block mb-1 font-medium">Subtipo</label>
        <select
          {...register('subtype_id', { required: 'Selecciona un subtipo' })}  // Registramos el campo
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="">Seleccionar subtipo</option>
          {subtypes.map((s) => (
            <option key={s.subtype_id} value={s.type}>
              {s.type}
            </option>
          ))}
        </select>
        {errors.subtype_id && <span className="text-red-500">{errors.subtype_id.message}</span>} {/* Error en el campo */}
      </div>

      {/* Edad */}
      <div>
        <label className="block mb-1 font-medium">Edad</label>
        <select
          {...register('age_id', { required: 'Selecciona una edad' })}  // Registramos el campo
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="">Seleccionar edad</option>
          {ages.map((e) => (
            <option key={e.age_id} value={e.age}>
              {e.age}
            </option>
          ))}
        </select>
        {errors.age_id && <span className="text-red-500">{errors.age_id.message}</span>} {/* Error en el campo */}
      </div>

      <Selecionador/>

      {/* Botón para enviar el formulario */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}  
          className="bg-yellow-300 text-white p-2 rounded "
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

// "use client"

// import { SimuletorFilter } from '@/types/filter.type';
// import { useEffect, useState } from 'react';
// import { z } from 'zod';

// // Zod schemas basados en tu modelo Prisma
// const VehicleSchema = z.object({
//   vehicle_id: z.number(),
//   type_vehicle: z.string(),
// });

// const SubtypeSchema = z.object({
//   subtype_id: z.number(),
//   type: z.string(),
// });

// const AgeSchema = z.object({
//   age_id: z.number(),
//   age: z.string(),
// });

// const OpcionesSchema = z.object({
//   vehicles: z.array(VehicleSchema),
//   subtypes: z.array(SubtypeSchema),
//   ages: z.array(AgeSchema),
// });

// type Vehicle = z.infer<typeof VehicleSchema>;
// type Subtype = z.infer<typeof SubtypeSchema>;
// type Age = z.infer<typeof AgeSchema>;

// export default function FiltrosSoat({
//   onChange,
// }: {
//   onChange: (filter: SimuletorFilter) => void;
// }) {
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [subtypes, setSubtypes] = useState<Subtype[]>([]);
//   const [ages, setAges] = useState<Age[]>([]);

//   const [filter, setFilter] = useState<SimuletorFilter>({
//     vehicle_id: '',
//     subtype_id: '',
//     age_id: '',
//   });

//   useEffect(() => {
//     const fetchDatos = async () => {
//       try {
//         const res = await fetch('/api/opciones');
//         const data = await res.json();

//         const parsed = OpcionesSchema.safeParse(data);

//         if (!parsed.success) {
//           console.error('❌ Error de validación Zod:', parsed.error);
//           return;
//         }

//         const { vehicles, subtypes, ages } = parsed.data;

//         setVehicles(vehicles);
//         setSubtypes(subtypes);
//         setAges(ages);
//       } catch (error) {
//         console.error('❌ Error al obtener datos de /api/opciones:', error);
//       }
//     };

//     fetchDatos();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     const nuevosFiltros = { ...filter, [name]: value };
//     setFilter(nuevosFiltros);
//     onChange(nuevosFiltros);
//     console.log(nuevosFiltros);
//   };

  

//   return (
//     <div className="flex flex-col md:flex-row gap-4 my-6">
//       {/* Vehículo */}
//       <div>
//         <label className="block mb-1 font-medium">Vehículo</label>
//         <select
//           id = "selctVehicle"
//           name="vehicle_id"
//           value={filter.vehicle_id}
//           onChange={handleChange}
//           className="border border-gray-300 rounded px-3 py-2 w-full"
//         >
//           <option value="">Seleccionar vehículo</option>
//           {vehicles.map((v) => (
//             <option key={v.vehicle_id} value={v.type_vehicle}>
//               {v.type_vehicle}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Subtipo */}
//       <div>
//         <label className="block mb-1 font-medium">Subtipo</label>
//         <select
//           name="subtype_id"
//           value={filter.subtype_id}
//           onChange={handleChange}
//           className="border border-gray-300 rounded px-3 py-2 w-full"
//         >
//           <option value="">Seleccionar subtipo</option>
//           {subtypes.map((s) => (
//             <option key={s.subtype_id} value={s.type}>
//               {s.type}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Edad */}
//       <div>
//         <label className="block mb-1 font-medium">Edad</label>
//         <select
//           name="age_id"
//           value={filter.age_id}
//           onChange={handleChange}
//           className="border border-gray-300 rounded px-3 py-2 w-full"
//         >
//           <option value="">Seleccionar edad</option>
//           {ages.map((e) => (
//             <option key={e.age_id} value={e.age}>
//               {e.age}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }


// 'use client';
// import { SimuletorFilter } from '@/types/filter.type';
// import { Age, Soat, Subtype, Vehicle } from '@prisma/client';
// import { useEffect, useState } from 'react';

// export default function FiltrosSoat({ onChange } : {onChange : (filter: SimuletorFilter) => void}) {
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [subtypes, setSubtypes] = useState<Subtype[]>([]);
//   const [ages, setAges] = useState<Age[]>([]);

//   // const [tipos, setTipos] = useState <Pick<Soat, "" | "suptipoId" > []>([])
//   // console.log("tipos: " , tipos)

//   const [filter, setFilter] = useState<SimuletorFilter>({
//     vehicle_id: '',
//     subtype_id: '',
//     age_id: '',
    
//   });

//   useEffect(() => {
//     const fetchDatos = async () => {
//       const res = await fetch('/api/opciones');
//       const data = await res.json();
//       setVehicles(data.vehicles);
//       setSubtypes(data.subtypes);
//       setAges(data.ages);
//     };

//     fetchDatos();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const nuevosFiltros = { ...filter, [name]: value };
//     setFilter(nuevosFiltros);

//     if (onChange) onChange(nuevosFiltros);
//     console.log(nuevosFiltros)
//   };    
  

//   return (
//     <div className="flex flex-col md:flex-row gap-4 my-6">
//       {/* Vehículo */}
//       <div>
//         <label className="block mb-1 font-medium">Vehículo</label>
//         <select
//           name="vehicle_id"
//           value={filter.vehicle_id}
//           onChange={handleChange}
//           className="border border-gray-300 rounded px-3 py-2 w-full"
//         >
//           <option value="">Seleccionar vehículo</option>
//           {vehicles.map((v) => (
//             <option key={v.vehicle_id} value={v.vehicle_id}>
//               {v.type_vehicle}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Subtipo */}
//       <div>
//         <label className="block mb-1 font-medium">Subtipo</label>
//         <select
//           name="subtype_id"
//           value={filter.subtype_id}
//           onChange={handleChange}
//           className="border border-gray-300 rounded px-3 py-2 w-full"
//         >
//           <option value="">Seleccionar subtipo</option>
//           {subtypes.map((s) => (
//             <option key={s.subtype_id} value={s.subtype_id}>
//               {s.type}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Edad */}
//       <div>
//         <label className="block mb-1 font-medium">Edad</label>
//         <select
//           name="age_id"
//           value={filter.age_id}
//           onChange={handleChange}
//           className="border border-gray-300 rounded px-3 py-2 w-full"
//         >
//           <option value="">Seleccionar edad</option>
//           {ages.map((e) => (
//             <option key={e.age_id} value={e.age_id}>
//               {e.age}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }
