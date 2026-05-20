'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';
import SummaryBar from '@/components/SummaryBar';
import Search from '@/components/Search';
import MesaList from '@/components/MesaList';
import PrintView from '@/components/PrintView';
import { Mesa, Caminante } from '@/types';

export default function Home() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [caminantes, setCaminantes] = useState<Caminante[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch mesas and caminantes with error handling
        const { data: mesaData, error: errorMesas } = await supabase
          .from('mesas')
          .select('*');
        const { data: caminanteData, error: errorCaminantes } = await supabase
          .from('caminantes')
          .select('*');

        // Debug logs
        console.log('mesas:', mesaData);
        console.log('caminantes:', caminanteData);
        console.log('error mesas:', errorMesas);
        console.log('error caminantes:', errorCaminantes);

        setMesas(mesaData || []);
        setCaminantes(caminanteData || []);
      } catch (err) {
        console.error('Unexpected error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalCaminantes = caminantes.length;
  const totalCartas = caminantes.reduce((sum, c) => sum + (c.num_cartas || 0), 0);
  const totalFotos = caminantes.reduce((sum, c) => sum + (c.num_fotos || 0), 0);

  if (loading) {
    return (
      <Layout>
        <div className="text-center text-navy">
          <p className="text-lg">Cargando datos...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SummaryBar
        totalCaminantes={totalCaminantes}
        totalCartas={totalCartas}
        totalFotos={totalFotos}
      />

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => window.print()}
          className="bg-navy text-cream px-4 py-2 rounded-lg hover:bg-navy/80 transition-colors font-semibold"
        >
          🖨️ Imprimir lista
        </button>
      </div>

      <Search value={searchQuery} onChange={setSearchQuery} />

      <MesaList
        mesas={mesas}
        caminantes={caminantes}
        searchQuery={searchQuery}
        onCaminanteClick={() => {}}
      />

      <div className="hidden print:block">
        <PrintView mesas={mesas} caminantes={caminantes} />
      </div>
    </Layout>
  );
}