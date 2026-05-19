# Emaús 2026 — Setup Guide

## 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Note your project URL and anon key from Settings → API

## 2. Create Database Tables

Go to SQL Editor in Supabase and run the SQL from `supabase/schema.sql`:

```sql
-- tables and seed data
```

Or copy the schema below.

## 3. Create Storage Bucket

1. Go to Storage → Buckets
2. Click "Create bucket"
3. Name: `fotos-caminantes`
4. Set to **Public**
5. Click Create

## 4. Seed Data

Run the insert statements from the schema to populate mesas and caminantes.

## 5. Configure Environment Variables

In the project root, create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 6. Install Dependencies

```bash
cd emaus-cartas
npm install
```

## 7. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 8. Usage

- View all mesas and caminantes on the main page
- Click a caminante to see their profile
- Use +/- buttons to adjust number of letters
- Upload photos via the photo upload button
- Write notes in the notes field
- Use search to find a caminante quickly
- Click "Imprimir lista" to print the roster

## SQL for Creating Tables

See `supabase/schema.sql` in the project.
