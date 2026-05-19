'use client';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F0E8', color: '#1A3C5E' }}>
      <header className="p-4" style={{ backgroundColor: '#1A3C5E', color: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-center" style={{ color: 'white' }}>
            <span className="text-[#C9A84C]">Emaús 2026</span> — Gestión de Cartas y Fotos
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
