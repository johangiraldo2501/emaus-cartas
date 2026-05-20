'use client'

import { use, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Caminante {
  id: string
  nombre: string
  mesa_id: number
  num_cartas: number
  num_fotos: number
  notas: string
}

interface Foto {
  id: string
  caminante_id: string
  url: string
  storage_path: string
}

export default function WalkerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [caminante, setCaminante] = useState<Caminante | null>(null)
  const [fotos, setFotos] = useState<Foto[]>([])
  const [notas, setNotas] = useState('')
  const [loading, setLoading] = useState(true)

  const cargarDatos = async () => {
    const { data: cam } = await supabase.from('caminantes').select('*').eq('id', id).single()
    const { data: fots } = await supabase.from('fotos').select('*').eq('caminante_id', id)
    setCaminante(cam)
    setNotas(cam?.notas || '')
    setFotos(fots || [])
    setLoading(false)
  }

  useEffect(() => { cargarDatos() }, [id])

  const actualizarCartas = async (delta: number) => {
    if (!caminante) return
    const nuevo = Math.max(0, caminante.num_cartas + delta)
    await supabase.from('caminantes').update({ num_cartas: nuevo }).eq('id', id)
    setCaminante({ ...caminante, num_cartas: nuevo })
  }

  const subirFoto = async (file: File) => {
    const fileName = `${id}_${Date.now()}_${file.name}`
    const { error: upError } = await supabase.storage.from('fotos-caminantes').upload(fileName, file)
    if (upError) { alert('Error subiendo foto: ' + upError.message); return }
    const { data: urlData } = supabase.storage.from('fotos-caminantes').getPublicUrl(fileName)
    await supabase.from('fotos').insert({ caminante_id: id, url: urlData.publicUrl, storage_path: fileName })
    const { count } = await supabase.from('fotos').select('*', { count: 'exact', head: true }).eq('caminante_id', id)
await supabase.from('caminantes').update({ num_fotos: count || 0 }).eq('id', id)
    cargarDatos()
  }

  const eliminarFoto = async (foto: Foto) => {
    await supabase.storage.from('fotos-caminantes').remove([foto.storage_path])
    await supabase.from('fotos').delete().eq('id', foto.id)
    const { count } = await supabase.from('fotos').select('*', { count: 'exact', head: true }).eq('caminante_id', id)
await supabase.from('caminantes').update({ num_fotos: count || 0 }).eq('id', id)
    cargarDatos()
  }

  const guardarNotas = async () => {
    await supabase.from('caminantes').update({ notas }).eq('id', id)
    alert('Notas guardadas')
  }

  if (loading) return <div style={{ padding: '20px' }}>Cargando...</div>
  if (!caminante) return <div style={{ padding: '20px' }}>Caminante no encontrado</div>

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>

        {/* Header */}
        <div style={{ background: '#1A3C5E', color: 'white', padding: '16px 20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => window.location.href = '/'} style={{ background: 'none', border: '1px solid white', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
            ← Volver
          </button>
          <h1 style={{ margin: 0, fontSize: '20px' }}>{caminante.nombre}</h1>
        </div>

        {/* Cartas */}
        <div style={{ background: 'white', border: '1px solid #E0D5C0', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 12px', color: '#1A3C5E' }}>✉️ Cartas recibidas</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => actualizarCartas(-1)} style={{ background: '#E0D5C0', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}>−</button>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#1A3C5E' }}>{caminante.num_cartas}</span>
            <button onClick={() => actualizarCartas(1)} style={{ background: '#C9A84C', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>+</button>
          </div>
        </div>

        {/* Fotos */}
        <div style={{ background: 'white', border: '1px solid #E0D5C0', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, color: '#1A3C5E' }}>📷 Fotos ({fotos.length})</h3>
            <label style={{ marginLeft: 'auto', background: '#1A3C5E', color: 'white', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
              + Subir foto
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && subirFoto(e.target.files[0])} />
            </label>
          </div>
          {fotos.length === 0 && <p style={{ color: '#999', margin: 0 }}>No hay fotos aún</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {fotos.map((foto) => (
              <div key={foto.id} style={{ position: 'relative' }}>
                <img
                  src={foto.url}
                  alt="foto"
                  style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', display: 'block' }}
                  onClick={() => window.open(foto.url, '_blank')}
                />
                <button
                  onClick={() => eliminarFoto(foto)}
                  style={{ position: 'absolute', top: '4px', right: '4px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                >×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Notas */}
        <div style={{ background: 'white', border: '1px solid #E0D5C0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ margin: '0 0 12px', color: '#1A3C5E' }}>📝 Notas</h3>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Escribe notas aquí..."
            style={{ width: '100%', minHeight: '100px', border: '1px solid #E0D5C0', borderRadius: '6px', padding: '10px', fontSize: '14px', boxSizing: 'border-box' }}
          />
          <button onClick={guardarNotas} style={{ marginTop: '8px', background: '#1A3C5E', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
            Guardar notas
          </button>
        </div>

      </div>
    </div>
  )
}