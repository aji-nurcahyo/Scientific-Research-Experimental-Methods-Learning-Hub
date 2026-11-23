# WEBSITE INFORMATION & TECHNICAL ARCHITECTURE
## Scientific Research & Experimental Methods Learning Hub
### Institut Teknologi Sumatera (ITERA)

> **Dokumen Status:** Proposed Baseline v2.0  
> **Klasifikasi:** Systems Architecture & Technical Specification  
> **Penyusun:** Aji Pamungkas Tri Nurcahyo  
> **Tanggal:** 22 November 2026

---

## 1. PRINSIP ARSITEKTUR SISTEM

Situs web *Scientific Research & Experimental Methods Learning Hub* dirancang sebagai portal pembelajaran akademik publik yang tangguh, cepat, ramah aksesibilitas, dan sepenuhnya kompatibel dengan **GitHub Pages** tanpa memerlukan backend berbayar:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PRINCIPLES OF TECHNICAL ARCHITECTURE                                    │
│ 1. Static-First & Zero Paid Backend: 100% hosting gratis di GitHub Pages│
│ 2. Rapid Math Rendering via KaTeX: Akselerasi LaTeX sisi klien instan  │
│ 3. Semantic Hierarchical Navigation: Level > Section > Chapter > Lesson │
│ 4. LocalStorage Progress Tracking: Bebas registrasi akun / database     │
│ 5. Print & PDF-Ready Stylesheets: Cetak materi berstandar buku ilmiah   │
│ 6. Strict WCAG AA Accessibility: Kontras >= 4.5:1, keyboard navigable   │
│ 7. Scalable Modular Content: Mendukung ratusan lesson tanpa refactor    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. PILIHAN TEKNOLOGI STATIC SITE (TECH STACK)

| Komponen | Pilihan Teknologi | Alasan Akademik & Teknis |
| :--- | :--- | :--- |
| **Hosting Platform** | GitHub Pages | Gratis, terintegrasi Git, stabil, mendukung custom domain, zero-maintenance server. |
| **Static Site Engine** | Static HTML5 / Vite / Docsify-Jekyll | Kompilasi statis murni, waktu muat halaman < 1 detik, kompatibel penuh dengan pipeline CI/CD GitHub Actions. |
| **Mathematical Engine** | KaTeX (v0.16+) | Render formula LaTeX 10x-100x lebih cepat dibanding MathJax, ukuran pustaka ringan (< 300 KB), tanpa pergeseran tata letak (layout shift / CLS = 0). |
| **Diagram Engine** | Mermaid.js | Merender flowchart, sequence, dan graf DAG langsung dari teks Markdown secara deklaratif. |
| **Typography & Fonts** | System Serif/Charter + Inter + JetBrains Mono | Teks batang tubuh berbasis Serif berwibawa (*Charter / Source Serif*), antarmuka navigasi bersih (*Inter*), ekspresi kode & matematika proporsional (*JetBrains Mono*). |
| **State & Tracking** | Client-side LocalStorage | Menyimpan progres pembelajar, bookmark lesson, dan skor lab interaktif di browser lokal tanpa pengumpulan data pribadi. |
| **Export Engine** | CSS Paged Media (`@media print`) | Format cetak otomatis yang memotong halaman secara rapi, mengatur nomor halaman, dan menyembunyikan navigasi saat ekspor ke PDF. |

---

## 3. STRUKTUR INFORMASI DAN HIRARKI NAVIGASI

Arsitektur navigasi website mengorganisasikan ribuan konsep ke dalam 5 pilar navigasi terpadu:

```
[WEBSITE HEADER: LOGO ITERA | SEARCH BAR | LEARNING PATHS | LABS | TEMPLATES | PROGRESS]
   │
   ├──► 1. MASTER CURRICULUM EXPLORER
   │      ├── Level 1: Epistemology & Problem Formulation (CH-01 - 07)
   │      ├── Level 2: Research Design & Metrology (CH-08 - 15)
   │      ├── Level 3: Statistical Foundations & Inference (CH-16 - 23)
   │      ├── Level 4: Modeling & Design of Experiments (CH-24 - 31)
   │      ├── Level 5: Computational Validation & ML Rigor (CH-32 - 37)
   │      ├── Level 6: Advanced Inferential & Causal Methods (CH-38 - 44)
   │      └── Level 7: RSE, Reproducibility & Publication (CH-45 - 51)
   │
   ├──► 2. LEARNING PATH DIRECTORY (10 Jalur Terarah)
   │      ├── LP-01: Undergraduate Thesis & Capstone
   │      ├── LP-02: Engineering Experimental & Metrology
   │      ├── LP-03: Statistical Modeling & Data Analysis
   │      ├── LP-04: AI & Machine Learning Research
   │      ├── LP-05: Computer Vision Research Methodology
   │      ├── LP-06: Signal Processing & Sensing
   │      ├── LP-07: Remote Sensing & Geospatial
   │      ├── LP-08: Reproducible Research & RSE
   │      ├── LP-09: Scientific Publication & Peer Review
   │      └── LP-10: Doctoral Research Preparation
   │
   ├──► 3. PRACTICAL RESEARCH LABORATORIES (15 Modul Komputasi)
   │      ├── Lab Directory dengan Filter Berdasarkan Topik
   │      ├── Interaktif Python Runner / Notebook Viewer
   │      └── Verifikasi Toleransi Numerik & Validasi Output
   │
   ├──► 4. RESEARCH TEMPLATES REPOSITORY (16 Template Baku)
   │      ├── Template Explorer berdasarkan Siklus Riset
   │      ├── Tampilan Panduan Lapangan & Contoh Kasus
   │      └── Tombol Download Format Markdown (.md), LaTeX (.tex), dan Word (.docx)
   │
   └──► 5. LEARNING HUB ECOSYSTEM (Tautan Silang ITERA)
          ├── Python Learning Hub
          ├── AI Learning Hub
          ├── IoT Learning Hub
          ├── Multimedia & Computer Vision Learning Hub
          ├── Signal Processing Learning Hub
          └── Remote Sensing & Geospatial Intelligence Learning Hub
```

---

## 4. ANATOMI HALAMAN CHAPTER DAN LESSON

Setiap halaman lesson memiliki tata letak yang konsisten dan berorientasi keterbacaan:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home > Level 3 > Section 3.2 > Chapter 20 > Lesson 3.5.2  │
├────────────────────────────────────────────────────────────────────────┤
│ TITLE: Standarisasi Ukuran Efek: Cohen's d, Hedges' g, dan Rasio Odds  │
│ [Prerequisites: CH-18, CH-19] • [Estimated Reading Time: 15 mins]     │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Learning Objectives (Observable Verbs)                              │
│ 2. Conceptual Explanation & Engineering Intuition                     │
│ 3. Mathematical Derivations & Formal Notation (KaTeX)                  │
│    - Solusi kuadrat pooled standard deviation                         │
│    - Koreksi bias sampel kecil Hedges                                 │
│ 4. Worked Calculation Example (Step-by-Step Numerical)                 │
│ 5. Python Implementation Block (SciPy / Pingouin)                      │
│ 6. Scientific Publication-Grade Visualization                         │
│ 7. Common Methodological Pitfalls (P-Hacking & Misinterpretations)     │
│ 8. Validation Procedures & Diagnostic Checks                          │
│ 9. Practical Exercises & Self-Assessment                              │
│ 10. Academic References & Canonical Reading Links                      │
├────────────────────────────────────────────────────────────────────────┤
│ BOTTOM CONTROLS:                                                       │
│ [Previous Lesson] • [Mark as Completed] • [Export PDF] • [Next Lesson] │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. SPESIFIKASI CETAK DAN EKSPOR PDF (`@media print`)

Untuk mendukung pencetakan langsung naskah menjadi buku saku atau modul ajar fisik yang rapi, stylesheet cetak dirancang dengan spesifikasi berikut:
- **Ukuran Kertas:** Standar A4 dengan margin 20 mm simetris.
- **Isolasi Konten:** Elemen navigasi header, sidebar, footer, search bar, dan tombol aksi otomatis disembunyikan (`display: none !important`).
- **Pemotongan Halaman (Page Breaks):**
  - Judul Bab (`h1`) selalu memulai halaman baru (`page-break-before: always`).
  - Blok persamaan matematika dan tabel data dicegah terpotong di tengah halaman (`break-inside: avoid`).
  - Elemen catatan penting (*alerts*) dipertahankan utuh pada satu halaman.
- **Tipografi Cetak:** Menggunakan warna hitam pekat (`#000000`) di atas latar putih murni (`#ffffff`) dengan ukuran font teks batang tubuh 10.5 pt dan line-height 1.4 untuk kenyamanan membaca di kertas fisik.
- **Ketertelusuran Sitasi:** Tautan eksternal otomatis menampilkan URL lengkap dalam tanda kurung di akhir teks (`a::after { content: " (" attr(href) ")"; }`).

---

## 6. SPESIFIKASI AKSESIBILITAS DAN RESPONSIFITAS (WCAG AA)

1. **Rasio Kontras Warna:**
   - Teks normal terhadap latar belakang: Minimal 4.8:1 (melampaui standar WCAG AA 4.5:1).
   - Teks besar (heading 18px+ tebal): Minimal 3.2:1 (melampaui standar 3.0:1).
   - Indikator fokus keyboard: Garis tepi kontras tinggi 2px dengan jarak offset yang jelas.
2. **Navigasi Keyboard Penuh:**
   - Seluruh tautan, tombol, dan kontrol interaktif dapat dijangkau dan dioperasikan menggunakan tombol `Tab`, `Shift+Tab`, `Enter`, dan `Space`.
   - Modul interaktif dapat ditutup menggunakan tombol `Escape`.
3. **Responsif Mobile:**
   - Target ketukan tombol layar sentuh minimal $44 \times 44$ piksel.
   - Tanpa overflow horizontal pada lebar layar 320px hingga 4K.
   - Persamaan matematika panjang yang melebihi lebar layar mobile dilengkapi wadah gulir horizontal (*overflow-x: auto*) dengan bayangan penanda batas (*scroll shadows*).

