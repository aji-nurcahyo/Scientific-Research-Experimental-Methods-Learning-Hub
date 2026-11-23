# Validasi Komponen Slide Presentasi & Tata Letak Ekspor Cetak PDF

**Proyek:** Scientific Research & Experimental Methods Learning Hub  
**Institusi:** Institut Teknologi Sumatera (ITERA)  
**Pemilik Proyek:** Aji Pamungkas Tri Nurcahyo  
**Status Evaluasi:** PASS (Terverifikasi Penuh)  
**Tanggal:** 23 November 2026  

---

## 1. Verifikasi Komponen Slide Presentasi (`SlidesView.tsx`)

Setiap materi pembelajaran (seluruh 204 lessons) dilengkapi dengan deck slide presentasi akademis terstruktur (rata-rata 2 hingga 4 slide per lesson) yang dirancang untuk pengajaran kuliah, seminar riset, maupun presentasi proposal.

### Fitur dan Kepatuhan Interaktivitas
1. **Navigasi Keyboard Penuh:**
   - Tombol Panah Kanan (`ArrowRight`) atau Spasi: Berpindah ke slide berikutnya.
   - Tombol Panah Kiri (`ArrowLeft`): Kembali ke slide sebelumnya.
   - Tombol Escape (`Escape`): Keluar dari mode layar penuh (fullscreen).
2. **Mode Tampilan:**
   - Tampilan Kartu Terintegrasi: Menyatu dengan konten bacaan bab.
   - Mode Layar Penuh (Fullscreen Presentation Mode): Menghilangkan seluruh bilah navigasi dan sidebar untuk proyeksi proyektor kelas atau sharing layar virtual.
3. **Rendering Rumus KaTeX pada Slide:**
   - Seluruh blok `keyFormulaOrDiagram` dirender secara tajam menggunakan KaTeX display mode tanpa distorsi pikselasi.
   - Tipografi teks slide menggunakan rasio kontras tinggi (teks `#0f172a` pada latar `#ffffff`).

---

## 2. Audit Aturan CSS Cetak & Ekspor PDF (`@media print`)

Audit dilakukan terhadap aturan cetak dokumen peramban (`Ctrl+P` / Save as PDF) pada berkas `src/styles/index.css`:

### Kriteria dan Perbaikan yang Telah Diterapkan
1. **Pencegahan Halaman Pertama Kosong:**
   - *Masalah Sebelumnya:* Aturan `h1 { page-break-before: always; }` memaksa pemotongan halaman sebelum judul pertama artikel sehingga menghasilkan halaman pertama kosong.
   - *Solusi Terverifikasi:* Menambahkan selektor spesifik:
     ```css
     h1:first-of-type,
     header h1,
     .lesson-view > h1:first-child {
       page-break-before: avoid !important;
     }
     ```
2. **Pencegahan Orphan Headers:**
   - Seluruh elemen judul (`h2, h3, h4`) memiliki deklarasi `break-after: avoid !important;` untuk mencegah judul berada di bagian paling bawah halaman tanpa teks pengikut.
3. **Pencegahan Pemotongan Komponen Utuh:**
   - Kotak rumus matematika, tabel data, blok kode (`pre, code`), dan callout peringatan (`.academic-callout`, `.card`) memiliki deklarasi `break-inside: avoid !important;` agar tidak terbelah di antara dua halaman cetak.
4. **Pembersihan Antarmuka Web Saat Dicetak:**
   - Seluruh elemen non-akademik disembunyikan secara otomatis: `.topbar`, `.sidebar`, `.btn`, `button`, `.no-print`.
   - Warna latar diubah menjadi putih murni (`#ffffff`) dan warna teks menjadi hitam berstandar cetak (`#000000`).
5. **Format Tautan Referensi Akademik:**
   - Tautan eksternal yang diawali `http` atau `https` otomatis mencetak URL target di dalam tanda kurung untuk kemudahan rujukan cetak fisik:
     ```css
     a[href^="http"]::after, a[href^="https"]::after {
       content: " (" attr(href) ")";
       font-size: 0.8em;
       font-style: italic;
       color: #4b5563;
     }
     ```

---

## 3. Hasil Pengujian Visual Output PDF

- **Margin Halaman:** 20mm atas-bawah, 15mm kiri-kanan (Standar ISO A4 Portrait).
- **Legibilitas Tipografi:** KaTeX equations skala 100%, blok kode terformat rapi dengan word-break, dan tidak ada elemen tabel yang terpotong secara horizontal.
- **Kesimpulan:** Repositori sepenuhnya siap menghasilkan dokumen cetak dan ekspor PDF berkualitas akademik tinggi langsung melalui fungsi cetak bawaan browser.
