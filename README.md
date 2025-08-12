# PLATFORM - Foto Restorasi Manual

## Deskripsi
Aplikasi restorasi foto manual dengan frontend Next.js dan backend Python.

## Setup

1. Clone repository  
   ```bash
   git clone https://github.com/BAYRESTORE/PLATFORM.git
   cd PLATFORM

2. Install dependencies

npm install


3. Buat file .env.local dan isi dengan variabel berikut:

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SECRET_KEY=...
REPLICATE_API_TOKEN=...


4. Jalankan development server

npm run dev



Build & Deploy

Build aplikasi

npm run build

Jalankan aplikasi di mode production

npm start


Struktur Folder

/pages - Halaman dan API routes Next.js

/fitur/restorasi - Fitur utama restorasi foto

/dashboard - Panel user dan admin

/keamanan - Modul sistem keamanan

/shared - Komponen dan library bersama

dll...

