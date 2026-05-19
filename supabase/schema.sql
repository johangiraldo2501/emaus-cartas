-- Emaús 2026 Database Schema

-- Create tables
CREATE TABLE mesas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  lider_1 TEXT NOT NULL,
  lider_2 TEXT NOT NULL
);

CREATE TABLE caminantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  mesa_id INTEGER REFERENCES mesas(id),
  num_cartas INTEGER DEFAULT 0,
  num_fotos INTEGER DEFAULT 0,
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fotos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caminante_id UUID REFERENCES caminantes(id),
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert mesas and get their generated IDs
INSERT INTO mesas (nombre, lider_1, lider_2) VALUES
  ('Mesa 1', 'Deninson Mendoza', 'Carlos András Sarassa'),
  ('Mesa 2', 'Akram Pérez', 'Andrés Zambrano'),
  ('Mesa 3', 'Juan Carlos Solarte', 'Santiago Escobar'),
  ('Mesa 4', 'Fernando Barona', 'Carlos Fernández'),
  ('Mesa 5', 'Fabio Cataño', 'John Escobar'),
  ('Mesa 6', 'Duver Fabian Gallardo', 'Juan Carlos Jaramillo'),
  ('Mesa 7', 'Julían Flórez', 'Harold Isaacs'),
  ('Mesa 8', 'Luis Javier Socrassas', 'Roberto Vargas');

-- Insert caminantes for Mesa 1 (id = 1)
INSERT INTO caminantes (nombre, mesa_id) VALUES
  ('Alexander Acosta Caicedo', 1),
  ('Andrés Felipe Bedoya Sierra', 1),
  ('Carlos Alberto Ocampo Giraldo', 1),
  ('Ever Fernando Giraldo Tobón', 1),
  ('Juan Manuel Osorio', 1),
  ('Nicolas Alejandro Rodríguez Sáenz', 1);

-- Insert caminantes for Mesa 2 (id = 2)
INSERT INTO caminantes (nombre, mesa_id) VALUES
  ('Gustavo Adolfo Ferrerosa De La Rosa', 2),
  ('John Ferro', 2),
  ('José Delio Ramírez Bayer', 2),
  ('Juan Camilo Becerra', 2),
  ('Oscar Iván Aldana Marín', 2),
  ('William Alexander Gallardo Barrera', 2);

-- Insert caminantes for Mesa 3 (id = 3)
INSERT INTO caminantes (nombre, mesa_id) VALUES
  ('Andrés Felipe González', 3),
  ('Bernardo Bartolo Mejía Cuarán', 3),
  ('Helio Omar Buitrago Romero', 3),
  ('Juan David Rojas Muñoz', 3),
  ('Juan Nicolás Echeverry', 3),
  ('Juan Sebastián Ochoa Echeverry', 3);

-- Insert caminantes for Mesa 4 (id = 4)
INSERT INTO caminantes (nombre, mesa_id) VALUES
  ('Arles Castañeda Restrepo', 4),
  ('Duván Hernández Pineda', 4),
  ('Jaime Alberto Rodríguez', 4),
  ('John Gustavo León Erazo', 4),
  ('Wilson Duque', 4);

-- Insert caminantes for Mesa 5 (id = 5)
INSERT INTO caminantes (nombre, mesa_id) VALUES
  ('Francisco Javier Garca', 5),
  ('Giovanni Lemos Posso', 5),
  ('Juan Sebastián Mahecha Gómez', 5),
  ('Julio Andrés Barbosa Ocampo', 5);

-- Insert caminantes for Mesa 6 (id = 6)
INSERT INTO caminantes (nombre, mesa_id) VALUES
  ('Cesar Augusto Lemos Posso', 6),
  ('Francisco András Diez Castaño', 6),
  ('Jhon Segura', 6),
  ('John Edilberto Novoa Medellín', 6),
  ('Juan Carlos Solarte Montero', 6);

-- Insert caminantes for Mesa 7 (id = 7)
INSERT INTO caminantes (nombre, mesa_id) VALUES
  ('Danny Stiven Flórez Gonzálex', 7),
  ('Darwin Rengifo Vargas', 7),
  ('Dieg Fernando Carvajal Ruiz', 7),
  ('Juan Carlos Aguado Sepulveda', 7),
  ('Oscar Alexander Niño Duarte', 7);

-- Insert caminantes for Mesa 8 (id = 8)
INSERT INTO caminantes (nombre, mesa_id) VALUES
  ('Yeyson Ruiz Sandoval', 8),
  ('José Iván Tejada Solarte', 8),
  ('Juann Pablo Valencia Brito', 8),
  ('Nikkol José Chacín Araujo', 8),
  ('William Domínguez Zapata', 8);
