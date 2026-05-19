import { Foto } from '../types';

interface GalleryProps {
  fotos: Foto[];
  onDelete: (foto: Foto) => void;
}

export default function Gallery({ fotos, onDelete }: GalleryProps) {
  if (fotos.length === 0) {
    return (
      <p className="text-navy/50 text-center py-4">No hay fotos aún</p>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {fotos.map(foto => (
        <img
          key={foto.id}
          src={foto.url}
          alt="Foto del caminante"
          className="w-full h-32 object-cover rounded-lg border-2 border-warm-200 hover:shadow-md transition-shadow"
        />
      ))}
    </div>
  );
}
