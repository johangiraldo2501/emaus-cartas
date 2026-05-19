'use client';
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react';

interface PhotoUploadProps {
  caminanteId: string;
  onUploadSuccess: () => void;
}


export default function PhotoUpload({ caminanteId, onUploadSuccess }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${caminanteId}/${Date.now()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from('fotos-caminantes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('fotos-caminantes')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('fotos')
        .insert({
          caminante_id: caminanteId,
          url: urlData.publicUrl,
          storage_path: fileName,
        });

      if (insertError) throw insertError;

      onUploadSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir la foto');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <label className="inline-block bg-gold text-navy font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-gold/80 transition-colors">
        {uploading ? 'Subiendo...' : '📷 Subir foto'}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
      </label>
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}