export interface Mesa {
  id: number;
  nombre: string;
  lider_1: string;
  lider_2: string;
}

export interface Caminante {
  id: string;
  nombre: string;
  mesa_id: number;
  num_cartas: number;
  num_fotos: number;
  notas: string | null;
  created_at: string;
}

export interface Foto {
  id: string;
  caminante_id: string;
  url: string;
  storage_path: string;
  created_at: string;
}

export interface MesaWithCaminantes extends Mesa {
  caminantes: Caminante[];
}
