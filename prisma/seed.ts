import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insertar tipos de vehículos
  const vehicleTypes = [
    "Motos",
    "Camperos y Camionetas",
    "Carga o Mixta",
    "Oficiales Especiales",
    "Autos Familiares",
    "Vehiculos Para Seis o Mas Pasajeros",
    "Autos De Negocios y Taxis",
    "Buses y Busetas De Servicio Publico Urbano",
    "Servicio Publico Intermunicipal"
  ];

  await Promise.all(
    vehicleTypes.map((type) =>
      prisma.vehicles.upsert({
        where: { type_vehicle: type },
        update: {},
        create: {
          type_vehicle: type,
        },
      })
    )
  );

  // Insertar subtipos de vehículos
  const subtypes = [
    "Ciclomotor", "Menos de 100 c.c.", "De 100 a 200 c.c.", "Mas de 200 c.c",
    "Motocarros, Tricimoto, Cuadriciclos", "Motocarro 5 pasajeros", "Menos de 1500 c.c",
    "1500 a 2500", "Mas de 2500 c.c", "Menos de 2500", "2500 o mas", "menos de 5 toneladas",
    "De 5 a 15 toneladas", "Mas de 15 toneladas", "Menor 10 pasajeros", "10 o mas pasajeros"
  ];

  await Promise.all(
    subtypes.map((type) =>
      prisma.subtypes.upsert({
        where: { type: type },
        update: {},
        create: {
          type,
        },
      })
    )
  );

  // Insertar edades
  const ages = ["0 o 9 años", "10 años o mas"];

  await Promise.all(
    ages.map((age) =>
      prisma.ages.upsert({
        where: { age: age },
        update: {},
        create: {
          age,
        },
      })
    )
  );

  // Datos de SOAT
  const soatData: {
    Vehicle_id: number;
    subtype_id?: number;
    age_id?: number;
    cost: number;
  }[] = [
    { Vehicle_id: 1, subtype_id: 1, cost: 117900 },
    { Vehicle_id: 1, subtype_id: 2, cost: 243400 },
    { Vehicle_id: 1, subtype_id: 3, cost: 326300 },
    { Vehicle_id: 1, subtype_id: 4, cost: 758300 },
    { Vehicle_id: 1, subtype_id: 5, cost: 367800 },
    { Vehicle_id: 1, subtype_id: 6, cost: 367800 },
    { Vehicle_id: 2, subtype_id: 7, age_id: 1, cost: 789600 },
    { Vehicle_id: 2, subtype_id: 7, age_id: 2, cost: 949200 },
    { Vehicle_id: 2, subtype_id: 8, age_id: 1, cost: 942800 },
    { Vehicle_id: 2, subtype_id: 8, age_id: 2, cost: 1116800 },
    { Vehicle_id: 2, subtype_id: 9, age_id: 1, cost: 1105900 },
    { Vehicle_id: 2, subtype_id: 9, age_id: 2, cost: 1269000 },
    { Vehicle_id: 3, subtype_id: 12, cost: 884700 },
    { Vehicle_id: 3, subtype_id: 13, cost: 1277600 },
    { Vehicle_id: 3, subtype_id: 14, cost: 1615500 },
    { Vehicle_id: 4, subtype_id: 7, cost: 995500 },
    { Vehicle_id: 4, subtype_id: 8, cost: 1255100 },
    { Vehicle_id: 4, subtype_id: 9, cost: 1504700 },
    { Vehicle_id: 5, subtype_id: 7, age_id: 1, cost: 445300 },
    { Vehicle_id: 5, subtype_id: 7, age_id: 2, cost: 590400 },
    { Vehicle_id: 5, subtype_id: 8, age_id: 1, cost: 542400 },
    { Vehicle_id: 5, subtype_id: 8, age_id: 2, cost: 674700 },
    { Vehicle_id: 5, subtype_id: 9, age_id: 1, cost: 633500 },
    { Vehicle_id: 5, subtype_id: 9, age_id: 2, cost: 751300 },
    { Vehicle_id: 6, subtype_id: 10, age_id: 1, cost: 794100 },
    { Vehicle_id: 6, subtype_id: 10, age_id: 2, cost: 1013600 },
    { Vehicle_id: 6, subtype_id: 11, age_id: 1, cost: 1063000 },
    { Vehicle_id: 6, subtype_id: 11, age_id: 2, cost: 1276400 },
    { Vehicle_id: 7, subtype_id: 7, age_id: 1, cost: 267900 },
    { Vehicle_id: 7, subtype_id: 7, age_id: 2, cost: 334500 },
    { Vehicle_id: 7, subtype_id: 8, age_id: 1, cost: 332700 },
    { Vehicle_id: 7, subtype_id: 8, age_id: 2, cost: 410900 },
    { Vehicle_id: 7, subtype_id: 9, age_id: 1, cost: 429000 },
    { Vehicle_id: 7, subtype_id: 9, age_id: 2, cost: 503200 },
    { Vehicle_id: 8, cost: 640000 },
    { Vehicle_id: 9, subtype_id: 15, cost: 632700 },
    { Vehicle_id: 9, subtype_id: 16, cost: 917700 },
  ];

  await Promise.all(
    soatData.map((soat) =>
      prisma.soats.upsert({
        where: {
          vehicle_id_subtype_id_age_id: {
            vehicle_id: soat.Vehicle_id,
            subtype_id: soat.subtype_id ?? null,
            age_id: soat.age_id ?? null,
          },
        },
        update: { cost: soat.cost },
        create: {
          vehicle_id: soat.Vehicle_id,
          subtype_id: soat.subtype_id ?? null,
          age_id: soat.age_id ?? null,
          cost: soat.cost,
        },
      })
    )
  );

  console.log("Datos insertados correctamente en la base de datos.");
}

main()
  .catch((e) => {
    console.error("Error durante el seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   const vehicleTypes = [
//     "Motos",
//     "Camperos y Camionetas",
//     "Carga o Mixta",
//     "Oficiales Especiales",
//     "Autos Familiares",
//     "Vehiculos Para Seis o Mas Pasajeros",
//     "Autos De Negocios y Taxis",
//     "Buses y Busetas De Servicio Publico Urbano",
//     "Servicio Publico Intermunicipal"
//   ];

//   await Promise.all(
//     vehicleTypes.map((type) =>
//       prisma.vehicles.create({
//         data: { type_vehicle: type },
//       })
//     )
//   );

//   const subtypes = [
//     "Ciclomotor", "Menos de 100 c.c.", "De 100 a 200 c.c.", "Mas de 200 c.c",
//     "Motocarros, Tricimoto, Cuadriciclos", "Motocarro 5 pasajeros", "Menos de 1500 c.c",
//     "1500 a 2500", "Mas de 2500 c.c", "Menos de 2500", "2500 o mas", "menos de 5 toneladas",
//     "De 5 a 15 toneladas", "Mas de 15 toneladas", "Menor 10 pasajeros", "10 o mas pasajeros"
//   ];

//   await Promise.all(
//     subtypes.map((type) =>
//       prisma.subtypes.create({
//         data: { type },
//       })
//     )
//   );


//   const ages = ["0 o 9 años", "10 años o mas"];

//   await Promise.all(
//     ages.map((age) =>
//       prisma.ages.create({
//         data: { age },
//       })
//     )
//   );

  
//   const soatData: {
//     Vehicle_id: number;
//     subtype_id?: number;
//     age_id?: number;
//     cost: number;
//   }[] = [
//     { Vehicle_id: 1, subtype_id: 1, cost: 117900 },
//     { Vehicle_id: 1, subtype_id: 2, cost: 243400 },
//     { Vehicle_id: 1, subtype_id: 3, cost: 326300 },
//     { Vehicle_id: 1, subtype_id: 4, cost: 758300 },
//     { Vehicle_id: 1, subtype_id: 5, cost: 367800 },
//     { Vehicle_id: 1, subtype_id: 6, cost: 367800 },
//     { Vehicle_id: 2, subtype_id: 7, age_id: 1, cost: 789600 },
//     { Vehicle_id: 2, subtype_id: 7, age_id: 2, cost: 949200 },
//     { Vehicle_id: 2, subtype_id: 8, age_id: 1, cost: 942800 },
//     { Vehicle_id: 2, subtype_id: 8, age_id: 2, cost: 1116800 },
//     { Vehicle_id: 2, subtype_id: 9, age_id: 1, cost: 1105900 },
//     { Vehicle_id: 2, subtype_id: 9, age_id: 2, cost: 1269000 },
//     { Vehicle_id: 3, subtype_id: 12, cost: 884700 },
//     { Vehicle_id: 3, subtype_id: 13, cost: 1277600 },
//     { Vehicle_id: 3, subtype_id: 14, cost: 1615500 },
//     { Vehicle_id: 4, subtype_id: 7, cost: 995500 },
//     { Vehicle_id: 4, subtype_id: 8, cost: 1255100 },
//     { Vehicle_id: 4, subtype_id: 9, cost: 1504700 },
//     { Vehicle_id: 5, subtype_id: 7, age_id: 1, cost: 445300 },
//     { Vehicle_id: 5, subtype_id: 7, age_id: 2, cost: 590400 },
//     { Vehicle_id: 5, subtype_id: 8, age_id: 1, cost: 542400 },
//     { Vehicle_id: 5, subtype_id: 8, age_id: 2, cost: 674700 },
//     { Vehicle_id: 5, subtype_id: 9, age_id: 1, cost: 633500 },
//     { Vehicle_id: 5, subtype_id: 9, age_id: 2, cost: 751300 },
//     { Vehicle_id: 6, subtype_id: 10, age_id: 1, cost: 794100 },
//     { Vehicle_id: 6, subtype_id: 10, age_id: 2, cost: 1013600 },
//     { Vehicle_id: 6, subtype_id: 11, age_id: 1, cost: 1063000 },
//     { Vehicle_id: 6, subtype_id: 11, age_id: 2, cost: 1276400 },
//     { Vehicle_id: 7, subtype_id: 7, age_id: 1, cost: 267900 },
//     { Vehicle_id: 7, subtype_id: 7, age_id: 2, cost: 334500 },
//     { Vehicle_id: 7, subtype_id: 8, age_id: 1, cost: 332700 },
//     { Vehicle_id: 7, subtype_id: 8, age_id: 2, cost: 410900 },
//     { Vehicle_id: 7, subtype_id: 9, age_id: 1, cost: 429000 },
//     { Vehicle_id: 7, subtype_id: 9, age_id: 2, cost: 503200 },
//     { Vehicle_id: 8, cost: 640000 },
//     { Vehicle_id: 9, subtype_id: 15, cost: 632700 },
//     { Vehicle_id: 9, subtype_id: 16, cost: 917700 },
//   ];

//   await Promise.all(
//     soatData.map((soat) =>
//       prisma.soats.create({
//         data: {
//           vehicle_id: soat.Vehicle_id,
//           subtype_id: soat.subtype_id ?? null,
//           age_id: soat.age_id ?? null,
//           cost: soat.cost,
//         },
//       })
//     )
//   );

//   console.log("Datos insertados correctamente en la base de datos.");
// }

// main()
//   .catch((e) => {
//     console.error("Error durante el seeding:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
