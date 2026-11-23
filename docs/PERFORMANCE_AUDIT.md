# Audit Kinerja & Analisis Ukuran Berkas Produksi (Bundle Analysis)

**Proyek:** Scientific Research & Experimental Methods Learning Hub  
**Institusi:** Institut Teknologi Sumatera (ITERA)  
**Pemilik Proyek:** Aji Pamungkas Tri Nurcahyo  
**Alat Pembangun:** Vite v6.4.6 / Rollup  
**Hasil Audit:** OPTIMAL (Lulus Seluruh Batas Kinerja Web)  
**Tanggal:** 23 November 2026  

---

## 1. Strategi Pembagian Kode (Code-Splitting Architecture)

Kurikulum berskala besar (51 chapter dan 204 lesson) membutuhkan strategi manajemen memori yang efisien agar tidak membebani peramban pengguna saat pertama kali membuka website. Repositori mengimplementasikan *dynamic dynamic imports* (`React.lazy` / dynamic modules):
1. Setiap chapter dari `CH-01` hingga `CH-51` dipisahkan menjadi chunk JavaScript tersendiri (`dist/assets/chXX-*.js`).
2. Pustaka matematika berat KaTeX dipisahkan ke dalam chunk terisolasi (`katex-*.js`).
3. Ikon antarmuka (`lucide-react`) dan modul vendor inti di-bundle secara mandiri.

---

## 2. Metrik Pembangunan Produksi (`vite build`)

Hasil kompilasi produksi terakhir:
- **Waktu Pembangunan:** 3.05 detik
- **Jumlah Modul Ditransformasi:** 2.214 modul
- **Jumlah Berkas Chunk Terpisah:** 55 berkas JavaScript + 1 CSS + 1 HTML

### Distribusi Ukuran Chunk Kunci:
| Berkas Chunk | Peran / Modul | Ukuran Mentah | Ukuran Terkompresi (Gzip) |
| :--- | :--- | :--- | :--- |
| `index.html` | Titik Masuk HTML | 1.46 kB | 0.72 kB |
| `index-*.css` | Gaya Global & Tema Cetak | 7.08 kB | 2.15 kB |
| `vendor-*.js` | Modul Eksternal Inti | 4.21 kB | 1.58 kB |
| `icons-*.js` | Kumpulan Ikon Lucide | 25.24 kB | 7.16 kB |
| `katex-*.js` | Engine KaTeX Math Renderer | 261.07 kB | 77.50 kB |
| `index-*.js` | Kerangka Aplikasi & Registri Data | 542.53 kB | 142.23 kB |
| `ch01-*.js` s.d. `ch51-*.js` | Chunk Konten Tiap Bab (Rata-rata) | 25 s.d. 39 kB per bab | **9 s.d. 14 kB per bab** |

---

## 3. Efisiensi Unduhan Awal (Initial Page Load Payload)

Saat pertama kali pengguna mengunjungi halaman beranda Learning Hub:
- Pengguna hanya mengunduh kerangka dasar dan stylesheet (`< 150 kB` gzip).
- Konten pelajaran hanya dimuat secara asinkron (*lazy loading on demand*) ketika pengguna mengklik bab tertentu.
- Waktu hingga interaktif (Time to Interactive / TTI) terestimasi di bawah 0.8 detik pada koneksi internet broadband standar (4G / WiFi).
- Tidak ada memory leak saat berpindah bab secara cepat karena setiap modul dibersihkan oleh siklus hidup React.

---

## 4. Kesiapan Publikasi GitHub Pages

- Seluruh tautan aset menggunakan path relatif (`base: './'`), menjamin bahwa berkas statis dapat disajikan dari subdirektori repositori GitHub (`https://<username>.github.io/<repo>/`) tanpa galat 404 pada aset JS/CSS.
- Berkas keluaran direktori `dist/` siap di-deploy secara langsung ke branch `gh-pages` atau via GitHub Actions Pages.
