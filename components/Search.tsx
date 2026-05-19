'use client';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar caminante por nombre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg border-2 focus:outline-none bg-white text-#5C4A2A placeholder-#5C4A2A"
        style={{
          borderColor: '#C9A84C',
          color: '#5C4A2A',
          backgroundColor: 'white',
          placeholderColor: '#5C4A2A',
        }}
      />
    </div>
  );
}
