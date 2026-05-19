'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Caminante, Foto } from '../types';
import PhotoUpload from './PhotoUpload';
import Gallery from './Gallery';

interface WalkerCardProps {
  caminante: Caminante;
  fotos: Foto[];
  onUpdateCartas: (id: string, delta: number) => void;
  onUpdateNotas: (id: string, notas: string) => void;
  onDelete: (foto: Foto) => void;
}

export default function WalkerCard({
  caminante,
  fotos,
  onUpdateCartas,
  onUpdateNotas,
}: WalkerCardProps) {
  const router = useRouter();
  const [notas, setNotas] = useState(caminante.notas || '');
  const [saved, setSaved] = useState(false);

  const handleNotasChange = (value: string) => {
    setNotas(value);
    setSaved(false);
  };

  const handleSaveNotas = async () => {
    await onUpdateNotas(caminante.id, notas);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="bg-white border border-navy rounded-lg shadow-lg overflow-hidden">
      <div className="bg-navy text-cream p-4 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="text-cream hover:text-gold transition-colors text-lg"
        >
          ← Volver
        </button>
        <h2 className="text-2xl font-bold flex-1" style={{ color: '#1A3C5E' }}>{caminante.nombre}</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Cartas */}
        <div className="flex items-center justify-between bg-cream border border-navy rounded-lg p-4">
          <div className="flex items-center gap-2 text-navy" style={{ color: '#1A3C5E' }}>
            <span className="text-xl">📧</span>
            {/* Number with large styling */}
            <span className="text-xl font-bold mx-2">{caminante.num_cartas}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateCartas(caminante.id, -1)}
              className="bg-gray-300 text-gray-800 font-bold px-3 py-1 rounded text-lg"
              aria-label="Disminuir cartas"
            >
              -
            </button>
            <button
              onClick={() => onUpdateCartas(caminante.id, 1)}
              className="bg-yellow-500 text-white font-bold px-3 py-1 rounded text-lg"
              aria-label="Aumentar cartas"
            >
              +
            </button>
          </div>
        </div>

        {/* Fotos */}
        <div className="flex items-center justify-between bg-cream border border-navy rounded-lg p-4">
          <div className="flex items-center gap-2 text-navy" style={{ color: '#1A3C5E' }}>
            <span className="text-xl">📷</span>
            <span className="text-lg font-semibold mx-2">{fotos.length}</span>
          </div>
          <PhotoUpload
            caminanteId={caminante.id}
            onUploadSuccess={() => {
              router.refresh();
            }}
          />
        </div>

        {/* Gallery */}
        <Gallery fotos={fotos} />

        {/* Notas */}
        <div>
          <h3 className="text-lg font-semibold text-navy mb-3">Notas</h3>
          <textarea
            value={notas}
            onChange={(e) => handleNotasChange(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-navy focus:border-gold focus:outline-none bg-cream text-navy min-h-[100px]"
            placeholder="Escribe notas aquí..."
          />
          <button
            onClick={handleSaveNotas}
            className={`mt-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
              saved ? 'bg-green-600 text-white' : 'bg-navy text-cream hover:bg-navy/80'
            }`}
          >
            {saved ? '✓ Guardado' : 'Guardar notas'}
          </button>
        </div>
      </div>
    </div>
  );
}
