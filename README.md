# DSRT - Aplikasi Restorasi Foto Manual

## Deskripsi  
DSRT adalah aplikasi web untuk restorasi foto manual berbasis Next.js (frontend) dan Python (backend).  
Dirancang untuk membantu pengguna mengembalikan kualitas dan detail foto lama secara manual dengan fitur editing dan pengelolaan yang lengkap.

## Fitur Utama  
- Halaman publik: Homepage, About, Login, Register, Forgot Password, Coming Soon  
- Dashboard pengguna: Upload foto, workspace editing, manajemen hasil restorasi  
- Dashboard admin: Pengaturan keamanan, monitoring aktivitas, kontrol sistem  
- Fitur restorasi manual (non-AI) berbasis canvas editing  
- Sistem autentikasi dan otorisasi menggunakan Supabase  
- Sistem keamanan seperti anti-screenshot, auto-delete, dan session guard  
- Monitoring dan logging aktivitas pengguna dan sistem  
- API backend terstruktur untuk upload, restorasi, keamanan, dan monitoring  

## Struktur Folder

/pages                 # Halaman Next.js dan API routes /fitur/restorasi       # Fitur restorasi manual frontend & backend /dashboard             # Panel dashboard user dan admin /keamanan              # Sistem keamanan platform /shared                # Komponen, library, middleware, dan konstanta bersama /update-maintenance    # Dokumentasi patch, roadmap, dan update fitur

## Setup Lingkungan Pengembangan

1. Clone repository:  
   ```bash
   git clone https://github.com/BAYRESTORE/PLATFORM.git
   cd PLATFORM

2. Install dependencies:

npm install


3. Buat file .env.local dan isi variabel lingkungan berikut:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SECRET_KEY=your_secret_key
REPLICATE_API_TOKEN=your_replicate_api_token


4. Jalankan server pengembangan:

npm run dev



Build & Deployment

Build aplikasi untuk produksi:

npm run build

Jalankan aplikasi di mode produksi:

npm start


Catatan: Sesuaikan environment variables pada server produksi.

Cara Pengujian

Gunakan Jest untuk unit test:

npm run test


Kontribusi

Fork repository ini

Buat branch baru untuk fitur/bugfix: feature/nama-fitur atau bugfix/issue

Commit perubahan dengan pesan yang jelas

Push ke repository kamu

Buat Pull Request ke branch main di repo utama


Lisensi

Proyek ini menggunakan lisensi MIT.
Lihat file LICENSE untuk detail lebih lanjut.

Kontak

Jika ada pertanyaan, silakan hubungi:

Email: dsrt.artweb@gmail.com

Website: www.dsrt-artweb.online
