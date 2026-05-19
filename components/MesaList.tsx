'use client';

import { Mesa, Caminante } from '@/types';

interface MesaListProps {
  mesas: Mesa[];
  caminantes: Caminante[];
  searchQuery: string;
  onCaminanteClick: (id: string) => void;
}

export default function MesaList({ mesas, caminantes, searchQuery, onCaminanteClick }: MesaListProps) {
  const filteredCaminantes = (caminantes: Caminante[]) => {
    if (!searchQuery) return caminantes;
    return caminantes.filter(c =>
      c.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      {mesas.map(mesa => {
        const mesaCaminantes = filteredCaminantes(
          caminantes.filter(c => c.mesa_id === mesa.id).sort((a, b) => a.nombre.localeCompare(b.nombre))
        );

        return (
          <div key={mesa.id} className="bg-white border border-navy rounded-lg shadow-md overflow-hidden">
            <div className="bg-navy text-cream p-4">
              <h2 className="text-xl font-bold" style={{ color: '#1A3C5E' }}>{mesa.nombre}</h2>
              <p className="text-gray-800 text-sm">{/* Updated to dark gray */}
                Líderes: {mesa.lider_1} / {mesa.lider_2}
              </p>
            </div>
            <div className="p-4">
              {mesaCaminantes.length === 0 ? (
                <p className="text-navy/50 text-center py-4">No se encontraron caminantes</p>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {mesaCaminantes.map(caminante => (
                    <div
                      key={caminante.id}
                      className="bg-cream border border-navy rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => onCaminanteClick(caminante.id)}
                    >
                      <h3 className="font-semibold text-navy" style={{ color: '#1A3C5E' }}>{caminante.nombre}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 bg-gold text-cream text-xs px-2 py-1 rounded-full">
                          📧 {caminante.num_cartas}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-gold text-cream text-xs px-2 py-1 rounded-full">
                          📷 {caminante.num_fotos}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
