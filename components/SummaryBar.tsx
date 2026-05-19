'use client';

interface SummaryBarProps {
  totalCaminantes: number;
  totalCartas: number;
  totalFotos: number;
}

export default function SummaryBar({ totalCaminantes, totalCartas, totalFotos }: SummaryBarProps) {
  return (
    <div className="bg-[#1A3C5E] text-white rounded-lg p-4 mb-6 shadow-md">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-3xl font-bold">{totalCaminantes}</div>
          <div className="text-sm opacity-80">Caminantes</div>
        </div>
        <div>
          <div className="text-3xl font-bold">{totalCartas}</div>
          <div className="text-sm opacity-80">Cartas</div>
        </div>
        <div>
          <div className="text-3xl font-bold">{totalFotos}</div>
          <div className="text-sm opacity-80">Fotos</div>
        </div>
      </div>
    </div>
  );
}
