import prisma from "@/libs/prisma";

async function loadSoat() {
  const soat = await prisma.soats.findMany({
  include: {
    vehicle: true,
    subtype: true,
    age: true,
  },
});
  return soat
}

async function HomePage() {
  const soat = await loadSoat();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Lista de SOAT</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Vehículo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Subtipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Edad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Costo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {soat.map((soat) => (
              <tr key={soat.soat_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {soat.vehicle?.type_vehicle ?? 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {soat.subtype?.type ?? 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {soat.age?.age ?? 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${soat.cost.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;

