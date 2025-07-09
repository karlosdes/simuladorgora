import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET() {
  try {
    const vehicles = await prisma.vehicles.findMany();
    const subtypes = await prisma.subtypes.findMany();
    const ages = await prisma.ages.findMany();
    const soat = await prisma.soats.findMany()
    // const types = await prisma.soat.findMany({
    //     where: {
    //       claseVihiculoId: 1
    //     },
    //     select: {
    //       suptipoId: true
    //     }
    //   });
    return NextResponse.json({ vehicles, subtypes, ages, soat });
  } catch (error) {
    console.error('Error al obtener opciones:', error);
    return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });
  }
}
