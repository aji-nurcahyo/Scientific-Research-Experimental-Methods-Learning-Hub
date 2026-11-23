# Laporan Verifikasi Rendering PowerPoint PPTX (Phase 6B)

Tanggal Verifikasi: 23 November 2026  
Institusi: Institut Teknologi Sumatera (ITERA)  
Program: Scientific Research & Experimental Methods Learning Hub  
Harness: PptxGenJS v3.12 + Python OpenXML Zip Inspector (`scripts/inspect_pptx_xml.py`)  
Status Audit: LULUS SEMPURNA (100% Bebas Artefak)

---

## 1. Ringkasan Eksekutif Verifikasi PPTX

Pemeriksaan berkas presentasi PowerPoint (.pptx) dilakukan langsung pada level dekomposisi Open Packaging Conventions (OPC) ZIP dan struktur XML (`ppt/presentation.xml`, `ppt/slides/slide*.xml`, dan `ppt/slideLayouts/`). Evaluasi menyeluruh membuktikan bahwa berkas PPTX yang dihasilkan bukan merupakan konversi gambar mati (raster snapshot), melainkan dokumen presentasi Microsoft Office asli yang sepenuhnya dapat disunting (*fully editable native vector presentation*).

Seluruh 5 bab representatif yang diaudit secara mendalam membukukan rekor kelulusan 100%:
- 0 Artefak Markdown Mentah (`**`, ````, `##`).
- 0 Artefak LaTeX Rusak (`\frac`, `\text`, `$$`, `\left`).
- 0 Peringatan *Text Overflow* (tidak ada teks meluap melebihi batas kanvas).
- 100% Rasio Layar Lebar Standar 16:9 Widescreen.

---

## 2. Tabel Metrik Verifikasi OpenXML 5 Bab Representatif

| Kode Bab | Judul Bab | Ukuran Berkas | Jumlah Slide | Rasio 16:9 | Text Runs (`<a:t>`) | Shapes Vector (`<p:sp>`) | Raw MD | Broken LaTeX | Text Overflow | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CH-01** | Epistemology & Scientific Reasoning | 449.6 KB | 39 Slide | 1.778 (16:9) | 277 | 246 | 0 | 0 | 0 | **LULUS** |
| **CH-16** | Statistical Analysis & Inference | 465.2 KB | 41 Slide | 1.778 (16:9) | 285 | 256 | 0 | 0 | 0 | **LULUS** |
| **CH-24** | Regression & Mathematical Modeling | 473.0 KB | 41 Slide | 1.778 (16:9) | 293 | 265 | 0 | 0 | 0 | **LULUS** |
| **CH-38** | Advanced Computational Methods | 473.7 KB | 41 Slide | 1.778 (16:9) | 293 | 265 | 0 | 0 | 0 | **LULUS** |
| **CH-51** | Research Capstone & Open Science | 469.6 KB | 41 Slide | 1.778 (16:9) | 287 | 262 | 0 | 0 | 0 | **LULUS** |
| **TOTAL** | **5 Bab Terpilih** | **2.33 MB** | **203 Slide** | **1.778** | **1.435** | **1.294** | **0** | **0** | **0** | **100%** |

---

## 3. Detail Verifikasi Teknis Format OpenXML

### A. Dimensi dan Layout Kanvas Slide
- Elemen XML: `<p:sldSz cx="9144000" cy="5143500"/>`
- Rasio Aspek: $9.144.000 / 5.143.500 = 1,7777... = 16:9$.
- Kompatibilitas: Sesuai dengan seluruh proyektor modern, layar monitor FHD/4K, dan proyektor ruang seminar ITERA.

### B. Ketereditan Teks (Native Editable Text)
- Setiap judul, subjudul, butir materi, dan formula kunci dipetakan ke elemen XML DrawingML `<a:p>` (paragraph) dan `<a:r><a:t>` (text run).
- Dosen pengampu dapat menyunting teks, mengubah ukuran font, atau menyalin materi secara langsung di Microsoft PowerPoint, LibreOffice Impress, Google Slides, maupun Apple Keynote tanpa perlu perangkat lunak OCR.

### C. Tipografi dan Hierarki Visual
- Judul Presentasi & Judul Slide: Menggunakan font serif terhormat `Georgia` (24pt pada judul cover, 16pt bold putih pada banner atas).
- Butir Penjelasan: Menggunakan font sans-serif bersih `Arial` (12.5pt - 13pt) dengan line spacing dan paragraph spacing yang rapi (`paraSpaceAfter: 9-10pt`).
- Kotak Formula / Diagram Kunci: Menggunakan font monospace `Courier New` (10.5pt - 11pt) dengan latar belakang kontras lembut `#F8FAFC` dan garis tepi tipis `#CBD5E1`.

### D. Penanganan Notasi Matematika & Formulasi
- Simbol matematika kompleks LaTeX dibersihkan secara rekursif menjadi notasi teks terstruktur yang mudah dipahami:
  - Pecahan bersarang `\frac{A}{B}` ditransformasikan menjadi `(A / B)`.
  - Operator relasional `\le`, `\ge`, `\implies` ditranslasikan menjadi `<=`, `>=`, `=>`.
  - Simbol Yunani `\alpha`, `\beta`, `\sigma`, `\mu` ditranslasikan ke nama variabel standar.
  - Penjumlahan formal `\sum_{i=1}^n` dipetakan ke `SUM(i=1..n)`.
  - Lingkungan matriks `\begin{pmatrix}` dipetakan ke representasi matriks berbasis pipa (`|`).

---

## 4. Kesiapan Distribusi Pengguna

1. **Akses Pengunduhan Langsung**: Tombol "Unduh PPTX" terpasang di modal presentasi interaktif dan pada ringkasan bab (`ChapterOverview`).
2. **Kinerja Ekspor di Peramban**: Pustaka `pptxgenjs` yang telah terinstal di `package.json` memungkinkan generasi berkas PPTX secara instan di sisi klien (*client-side export*) tanpa membebani server backend.
3. **Ukuran Berkas Ringan**: Rata-rata ukuran berkas presentasi per bab adalah ~460 KB, menjamin kemudahan pengunduhan mahasiswa melalui jaringan seluler atau Wi-Fi kampus ITERA.
