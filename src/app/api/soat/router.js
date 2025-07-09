import { prisma } from '@/lib/prisma';

export async function GET(request) {
  const url = new URL(request.url);
  const vehiculoId = url.searchParams.get('vehiculoId');
  const subtipoId = url.searchParams.get('subtipoId');
  const edadId = url.searchParams.get('edadId');

  // Construir la condición de búsqueda
  const whereConditions = {};

  if (vehiculoId) {
    whereConditions.claseVihiculoId = parseInt(vehiculoId);
  }
  if (subtipoId) {
    whereConditions.suptipoId = parseInt(subtipoId);
  }
  if (edadId) {
    whereConditions.edadId = parseInt(edadId);
  }

  // Realizamos la consulta a la base de datos
  try {
    const soat = await prisma.soat.findMany({
      where: whereConditions,
      select: { costo: true }, // Solo seleccionamos el costo
    });

    if (soat.length > 0) {
      return new Response(JSON.stringify(soat[0]), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'No se encontró ningún resultado' }), { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al realizar la consulta' }),
      { status: 500 }
    );
  }
}
