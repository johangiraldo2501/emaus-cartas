import { Mesa, Caminante } from '@/types';

interface PrintViewProps {
  mesas: Mesa[];
  caminantes: Caminante[];
}

export default function PrintView({ mesas, caminantes }: PrintViewProps) {
  return (
    <div className="bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-navy mb-8">
          Emaús 2026 — Lista de Caminantes
        </h1>

        <div className="space-y-8">
          {mesas.map(mesa => {
            const mesaCaminantes = caminantes
              .filter(c => c.mesa_id === mesa.id)
              .sort((a, b) => a.nombre.localeCompare(b.nombre));

            return (
              <div key={mesa.id}>
                <h2 className="text-xl font-bold text-navy border-b-2 border-gold pb-2 mb-3">
                  {mesa.nombre} — {mesa.lider_1} / {mesa.lider_2}
                </h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-navy">
                      <th className="text-left p-2 text-navy font-semibold">Nombre</th>
                      <th className="text-center p-2 text-navy font-semibold">Cartas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mesaCaminantes.map(caminante => (
                      <tr key={caminante.id} className="border-b border-gray-200">
                        <td className="p-2 text-navy">{caminante.nombre}</td>
                        <td className="p-2 text-center text-navy font-semibold">
                          {caminante.num_cartas}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
