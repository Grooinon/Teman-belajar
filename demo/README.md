# TemanBelajar — Front-End Demo Standalone

> **"Belajar Bersama, Berkembang Bersama."**

Folder ini berisi versi **Front-End Murni (Standalone Demo)** dari platform **TemanBelajar**.
Versi demo ini dibangun tanpa dependensi backend PHP maupun server database MySQL, sehingga dapat langsung dijalankan dan dicoba di browser secara instan.

---

## 🚀 Cara Menjalankan Demo

Ada beberapa cara mudah untuk menjalankan demo ini:

### Cara 1: Buka Langsung di Browser (Paling Mudah)
Cukup buka file `index.html` langsung dari File Explorer dengan mengklik dua kali (double click), atau klik kanan dan pilih **Open with Google Chrome / Microsoft Edge / Firefox**.

### Cara 2: Menggunakan Static Server (VS Code / Python / Node.js)
Jika Anda menggunakan Visual Studio Code atau terminal:

- **Menggunakan Live Server extension di VS Code**:
  Klik kanan pada `demo/index.html` dan pilih **Open with Live Server**.

- **Menggunakan Python**:
  ```bash
  cd demo
  python -m http.server 8000
  ```
  Lalu buka di browser: `http://localhost:8000`

- **Menggunakan npx serve**:
  ```bash
  npx serve demo
  ```

---

## 🌟 Fitur Utama Demo Front-End

1. **Role Switcher 1-Klik (Demo Bar di Atas Layar)**:
   - **🎓 Mahasiswa**: Aktif sebagai **Ananda Putra Utama** (NIM: 20240050086). Dapat mencari tutor, mengajukan sesi bimbingan, melihat jadwal, dan memberikan rating/ulasan bintang.
   - **⭐ Tutor**: Aktif sebagai **Bintang Pratama** (NIM: 21051214001). Dapat menerima/menolak pengajuan sesi bimbingan dari mahasiswa, menandai sesi sebagai selesai, dan mengubah status ketersediaan.
   - **🛡️ Admin**: Aktif sebagai **Admin Akademik TB**. Dapat mengelola pengguna, monitoring seluruh sesi belajar, kurikulum mata kuliah, moderasi ulasan publik, dan audit trail log.
   - **👤 Tamu (Guest Mode)**: Mode pengguna belum login untuk menguji alur login & registrasi.
   - **🔄 Reset Data Demo**: Tombol untuk mengembalikan seluruh state simulasi (sesi, ulasan, notifikasi) ke kondisi data awal.

2. **Simulasi State Terintegrasi (LocalStorage)**:
   - Ketika mahasiswa memesan sesi bimbingan di halaman `tutors.html` atau `tutor-detail.html`, pengajuan langsung muncul secara real-time di `student-dashboard.html` dan `tutor-dashboard.html`!
   - Tutor dapat mengklik tombol **Setujui Sesi** atau **Tolak Sesi**, yang otomatis mengirim notifikasi ke mahasiswa dan memperbarui status sesi.
   - Ketika sesi ditandai selesai oleh tutor, mahasiswa dapat mengklik **Beri Rating & Ulasan** yang langsung memperbarui rata-rata bintang tutor.

3. **Pencarian & Multi-Facet Filter Reaktif**:
   - Filter tutor berdasarkan kata kunci nama / mata kuliah secara live saat mengetik.
   - Filter berdasarkan Program Studi (Sistem Informasi, Teknik Informatika, Bisnis Digital, dll.).
   - Filter metode belajar (Online / Tatap Muka).
   - Filter tarif (Gratis sukarela vs Berbayar ringan).
   - Filter minimal rating bintang (⭐ 4.0+ atau ⭐ 4.5+).
   - Pengurutan (Rating tertinggi, Ulasan terbanyak, Tarif terendah).

4. **Kalkulator Jadwal & Estimasi Waktu Otomatis**:
   - Di modal pemesanan bimbingan, saat memilih jam mulai (misal 16:00) dan durasi (90 menit), sistem otomatis menghitung perkiraan jam selesai (17:30 WIB).

5. **Design System Modern & Responsif**:
   - Google Fonts (*Inter*) dengan hierarchy tipografi yang jelas.
   - Glassmorphism navbar dengan backdrop blur.
   - Palet warna Indigo/Blue, Sky, Emerald, dan Amber.
   - Micro-animations, card elevations, dan toast notification feedback.

---

## 📂 Struktur Halaman Demo

```
demo/
├── index.html               # Landing page utama (Hero, live stats, how-it-works, featured tutors, testimonials)
├── tutors.html              # Katalog pencarian tutor dengan multi-filter reaktif
├── tutor-detail.html        # Detail profil lengkap tutor, nilai matkul, jadwal rutin, & modal pemesanan
├── student-dashboard.html   # Portal dashboard mahasiswa: jadwal mendatang, pengajuan pending, beri rating
├── tutor-dashboard.html     # Portal dashboard tutor: kelola pengajuan masuk, jadwal mengajar, status ketersediaan
├── admin-dashboard.html     # Portal administrasi: tata kelola pengguna, monitoring sesi, kurikulum, audit log
├── login.html               # Halaman login dengan preset 1-klik untuk setiap peran pengguna
├── register.html            # Halaman pendaftaran mahasiswa & aktivasi mode tutor
├── how-it-works.html        # Alur panduan interaktif mahasiswa & tutor serta FAQ accordion
├── about.html               # Tentang visi platform, latar belakang, dan kode etik akademik
├── contact.html             # Layanan bantuan, kontak help desk, dan form saran
├── assets/
│   ├── css/
│   │   └── demo.css         # Design system custom, glassmorphism, badges, animasi, responsive layout
│   └── js/
│       ├── data.js          # Mock database lengkap & helper LocalStorage
│       └── demo-app.js      # Kontrol interaksi, role switcher, sistem toast, booking modal logic
└── README.md                # Dokumentasi panduan penggunaan demo
```

---

*Selamat mencoba dan mendemokan platform TemanBelajar!*
