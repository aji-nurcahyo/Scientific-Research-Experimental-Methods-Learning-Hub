# PROJECT LOG & GOVERNANCE
# Scientific Research & Experimental Methods Learning Hub

> **Project Name:** Scientific Research & Experimental Methods Learning Hub  
> **Subtitle:** From Scientific Thinking to Reproducible Research  
> **Institution:** Institut Teknologi Sumatera (ITERA)  
> **Project Creator:** Aji Pamungkas Tri Nurcahyo  
> **Workspace Path:** `D:\Workstation\Repo My Corses\Scientific Research & Experimental Methods`  
> **Current Status:** Phase 5 Public Release Verified & Live on GitHub Pages (51 Chapters, 204 Lessons, 15 Labs, 16 Templates, 10 Learning Paths)  
> **Official Repository:** `https://github.com/aji-nurcahyo/Scientific-Research-Experimental-Methods-Learning-Hub.git`  
> **Live Learning Hub:** `https://aji-nurcahyo.github.io/Scientific-Research-Experimental-Methods-Learning-Hub/`  
> **Release Commit SHA:** `8151fd1` (branch `main`), `60ece52` (branch `gh-pages`)  
> **Approval Status:** Production Release Completed & Verified  
> **Last Updated:** 2026-11-23

---

## 1. PROJECT OVERVIEW & GOVERNANCE RULES

Dokumen ini berfungsi sebagai buku catatan kerja internal (*internal logbook*), mesin status (*state machine*), catatan keputusan arsitektur (ADR), dan panduan kontinuitas sesi antar AI assistant. Proyek ini dijalankan dengan tata kelola akademik dan teknis yang ketat.

### Aturan Tata Kelola Utama (Strict Governance Rules)

1. **Independent Project Boundary:** Proyek ini merupakan repositori independen. Dilarang mengubah, menimpa, atau memodifikasi file dari repositori atau Learning Hub lain di luar workspace ini.
2. **Approval Gate Requirement:** Setiap transisi fase (Phase 0 hingga Phase 5) dan setiap batch penulisan konten memerlukan persetujuan tertulis eksplisit (*explicit approval*) dari Project Creator (Aji Pamungkas Tri Nurcahyo).
3. **No Unapproved Git Operations:** Dilarang melakukan `git commit`, `git push`, atau deployment ke server/GitHub Pages sebelum ada instruksi tertulis.
4. **Permanent Zero AI Slop Policy:**
   - Dilarang menggunakan tanda baca em dash (`—`) dalam teks naratif atau antarmuka; gunakan koma, titik, titik dua, atau tanda kurung.
   - Dilarang menggunakan kata klise pemasaran AI seperti "revolutionary", "cutting edge", "seamless", "powerful", "game changing".
   - Dilarang membuat angka statistik palsu atau testimonial fiktif.
   - Dilarang membuat data eksperimen palsu yang disamarkan seolah-olah data riil. Data sintetis wajib dilabeli `[SIMULASI/SYNTHETIC DATA]`.
5. **No Fabricated Citations:** Semua sitasi, judul buku, standar metrologi, dan DOI wajib terverifikasi secara akademik (e.g., Montgomery, Box Hunter & Hunter, Cohen, NIST, JCGM GUM, Gelman, Pearl).
6. **Traceability of Historical Decisions:** File perencanaan sebelumnya tidak boleh dihapus. File draf Phase 0 v1 telah diarsipkan secara aman di `docs/historical/phase0_v1/`.
7. **Baseline Control:** Setelah Master Curriculum v2.0 disetujui pada Gate 0, dokumen kurikulum menjadi baseline terkontrol. Tidak boleh ada pengubahan struktur chapter tanpa persetujuan Project Creator.

---

## 2. STATE MACHINE & IMPLEMENTATION STATUS

```
[Phase 0: Planning & Curriculum Redesign v2.0] (COMPLETED & VERIFIED)
       │
       ▼ (Approval Gate 0: Baseline Master Curriculum v2.0 Controlled)
[Phase 1: Website Foundation & Academic Design System] (COMPLETED & VERIFIED)
       │
       ▼ (Approval Gate 1: React 19 + TypeScript + Vite + KaTeX Bundled Cleanly)
[Phase 2: Full Master Curriculum Production (Levels 1-7, Ch 01-51)] (COMPLETED & VERIFIED)
       ├─ Batch 01: Level 1 (CH-01 to CH-07, 28 Lessons) -> [COMPLETED & VERIFIED]
       ├─ Batch 02: Level 2 (CH-08 to CH-15, 32 Lessons) -> [COMPLETED & VERIFIED]
       ├─ Batch 03: Level 3 (CH-16 to CH-23, 32 Lessons) -> [COMPLETED & VERIFIED]
       ├─ Batch 04: Level 4 (CH-24 to CH-31, 32 Lessons) -> [COMPLETED & VERIFIED]
       ├─ Batch 05: Level 5 (CH-32 to CH-37, 24 Lessons) -> [COMPLETED & VERIFIED]
       ├─ Batch 06: Level 6 (CH-38 to CH-44, 28 Lessons) -> [COMPLETED & VERIFIED]
       └─ Batch 07: Level 7 (CH-45 to CH-51, 28 Lessons) -> [COMPLETED & VERIFIED]
       │
       ▼
[Phase 3: Research Software Engineering, Laboratories & Templates] (COMPLETED & VERIFIED)
       ├─ 15 Practical Research Laboratories -> [COMPLETED & VERIFIED]
       ├─ 16 Research Templates & Instruments -> [COMPLETED & VERIFIED]
       └─ 10 Specialized Learning Paths -> [COMPLETED & VERIFIED]
       │
       ▼
[Phase 4: Full Academic QA & Verification Suite] (COMPLETED & VERIFIED)
       ├─ Verification of All 204 Lessons Code (199/199 Executable Tests Passed)
       ├─ 15 Practical Labs Standalone Python Scripts in labs/ (15/15 Passed)
       ├─ 16 Research Templates with Markdown Download
       ├─ Refined Print & PDF Styles (@media print)
       └─ UI/UX & WCAG AA Accessibility Audit Passed
       │
       ▼
[Phase 5: Release Readiness & Documentation] (COMPLETED & READY FOR RELEASE)
       ├─ docs/CURRICULUM_RECONCILIATION.md
       ├─ docs/SCIENTIFIC_VERIFICATION_REPORT.md
       ├─ docs/LABORATORY_FUNCTIONAL_AUDIT.md
       ├─ docs/SLIDES_PDF_VALIDATION.md
       ├─ docs/UI_UX_ACCESSIBILITY_AUDIT.md
       ├─ docs/PERFORMANCE_AUDIT.md
       ├─ docs/FINAL_ACADEMIC_AUDIT.md
       └─ docs/FINAL_RELEASE_READINESS.md
       │
       ▼
[Phase 5: Public Deployment & Verification] (COMPLETED & VERIFIED LIVE)
       ├─ Remote Repository: https://github.com/aji-nurcahyo/Scientific-Research-Experimental-Methods-Learning-Hub.git
       ├─ Live URL: https://aji-nurcahyo.github.io/Scientific-Research-Experimental-Methods-Learning-Hub/
       ├─ Deployment Strategy: GitHub Pages "Deploy from a branch" (gh-pages / root)
       ├─ CI/CD Automation: .github/workflows/deploy.yml (Test, Build, and Deploy to gh-pages)
       ├─ Automated Quality Gates: Curriculum integrity, Python verification, Labs audit, TypeScript check
       └─ Public Asset Integrity Verified (HTTP 200 on all chunks)
```

### Status Implementasi Berjalan:
- [x] **Phase 1: Website Foundation:** Arsitektur Vite + React 19 + TypeScript + KaTeX + Router hash + Slides modal + PDF export + Pencarian instan + Progress tracking.
- [x] **Dynamic Route/Chunk Code Splitting:** `CHAPTER_LOADERS` on-demand per chapter, membagi seluruh 51 chapter menjadi chunk terisolasi (~30-39 kB per chunk).
- [x] **Level 1 (Foundations of Scientific Research & Engineering Methodology):** 7 Chapter (CH-01 s.d. CH-07), 28 Pelajaran lengkap.
- [x] **Level 2 (Research Design, Measurement & Data Architecture):** 8 Chapter (CH-08 s.d. CH-15), 32 Pelajaran lengkap.
- [x] **Level 3 (Exploratory Data Analysis, Probability & Inferential Statistics):** 8 Chapter (CH-16 s.d. CH-23), 32 Pelajaran lengkap.
- [x] **Level 4 (Statistical Modeling & Design of Experiments - DoE):** 8 Chapter (CH-24 s.d. CH-31), 32 Pelajaran lengkap.
- [x] **Level 5 (Computational Validation, ML Rigor & Benchmarking):** 6 Chapter (CH-32 s.d. CH-37), 24 Pelajaran lengkap.
- [x] **Level 6 (Advanced Statistical & Computational Methods):** 7 Chapter (CH-38 s.d. CH-44), 28 Pelajaran lengkap.
- [x] **Level 7 (Research Software Engineering, Reproducibility & Publication):** 7 Chapter (CH-45 s.d. CH-51), 28 Pelajaran lengkap.
- [x] **Total Konten Terverifikasi:** 51 Chapter, 204 Pelajaran (100% Anti-Slop, 0 em dashes, KaTeX render valid, runnable Python code beroutput, slide metadata).
- [x] **Research Laboratories:** 15 Laboratorium Penelitian praktis (`labs/lab01_*.py` s.d. `lab15_*.py` tervalidasi 100%, 4 simulator in-browser interaktif).
- [x] **Research Templates:** 16 Instrumen dan Template Penelitian terstandarisasi (fitur salin dan unduh format `.md`).
- [x] **Learning Paths:** 10 Jalur Pembelajaran kurikulum terarah di `src/data/learningPathsData.ts`.
- [x] **Build Status:** Passing zero TypeScript errors (`tsc --noEmit`), Vite production build clean (`✓ built in 3.05s`, 2214 modules transformed).
- [x] **Dokumen Audit Kualitas Phase Final QA:** Seluruh 8 dokumen laporan audit di direktori `docs/` selesai disusun dan terverifikasi.

### Status Deliverables Phase 0 Reset (v2.0):
- [x] **Preservation of Historical Drafts:** Seluruh draf v1 tersimpan di `docs/historical/phase0_v1/`.
- [x] **Academic Benchmarking Report:** [`docs/ACADEMIC_BENCHMARKING.md`](docs/ACADEMIC_BENCHMARKING.md) selesai disusun.
- [x] **Research Competency Framework:** [`docs/COMPETENCY_FRAMEWORK.md`](docs/COMPETENCY_FRAMEWORK.md) (17 kompetensi formal pada 5 tahap perkembangan) selesai disusun.
- [x] **Master Curriculum v2.0 Specification:** [`docs/MASTER_CURRICULUM.md`](docs/MASTER_CURRICULUM.md) (7 Level, 17 Section, 51 Chapter, 204 Lessons) selesai disusun.
- [x] **Prerequisite Dependency Matrix & Graph:** [`docs/PREREQUISITE_DEPENDENCIES.md`](docs/PREREQUISITE_DEPENDENCIES.md) (verifikasi DAG & 7 gateway chapters) selesai disusun.
- [x] **Learning Path Architecture:** [`docs/LEARNING_PATHS.md`](docs/LEARNING_PATHS.md) (10 jalur terarah lintas-kurikulum) selesai disusun.
- [x] **Practical Research Laboratories Catalog:** [`docs/RESEARCH_LABORATORIES.md`](docs/RESEARCH_LABORATORIES.md) (15 modul lab dengan 13 atribut lengkap) selesai disusun.
- [x] **Research Templates Inventory:** [`docs/RESEARCH_TEMPLATES.md`](docs/RESEARCH_TEMPLATES.md) (16 instrumen riset terstandarisasi) selesai disusun.
- [x] **Website Information & Technical Architecture:** [`docs/WEBSITE_ARCHITECTURE.md`](docs/WEBSITE_ARCHITECTURE.md) selesai disusun.
- [x] **Permanent Academic & Quality Standards:** [`docs/PERMANENT_STANDARDS.md`](docs/PERMANENT_STANDARDS.md) (15 Quality Gates, Anti-Slop, Language, Typography) selesai disusun.
- [x] **Implementation Roadmap:** [`docs/IMPLEMENTATION_ROADMAP.md`](docs/IMPLEMENTATION_ROADMAP.md) selesai disusun.
- [x] **Phase 0 Redesign Decision Report:** [`docs/PHASE_0_REDESIGN_REPORT.md`](docs/PHASE_0_REDESIGN_REPORT.md) selesai disusun.
- [x] **Full Curriculum Production Complete:** 100% dari 51 Chapter dan 204 Pelajaran telah diproduksi dan diverifikasi.

---

## 3. ARCHITECTURAL DECISION RECORDS (ADR)

### ADR-001: Pemisahan Core Curriculum, Advanced Methods, Specialization Tracks, dan PhD Paths (Historical v1)
- *Status:* Diserap dan disempurnakan ke dalam arsitektur v2.0 (ADR-007).

### ADR-002: Penolakan AI Slop dan Pengadopsian Desain Berorientasi Konten
- *Status:* Aktif dan Dipermanenkan dalam [`docs/PERMANENT_STANDARDS.md`](docs/PERMANENT_STANDARDS.md). Dilarang menggunakan em dash (`—`), tanpa jargon AI, rasio kontras WCAG AA $\geq 4.8:1$.

### ADR-003: Pemilihan Arsitektur Statis untuk GitHub Pages dengan KaTeX
- *Status:* Aktif dan Dipermanenkan dalam [`docs/WEBSITE_ARCHITECTURE.md`](docs/WEBSITE_ARCHITECTURE.md). Hosting statis murni tanpa backend berbayar dengan KaTeX untuk render instan.

### ADR-004: Penegasan Batas "Statistical Significance" vs "Practical Significance"
- *Status:* Aktif dan Diperkuat. Wajib menyertakan effect size (Cohen's d, partial eta-squared) dan interval kepercayaan di setiap analisis komparasi.

### ADR-005: Kebijakan Non-Duplikasi dengan Ekosistem Learning Hub ITERA Lainnya
- *Status:* Aktif. Fokus murni pada metodologi ilmiah, perancangan eksperimen, dan validasi riset. Materi algoritma murni ditautkan secara cross-reference ke Hub terkait di ITERA.

### ADR-006: Redesain Menyeluruh Berbasis Kerangka Kompetensi (Phase 0 Reset v2.0)
- **Konteks:** Draf historis v1 membatasi kurikulum pada angka arbitrer (28 core chapters, 17 advanced modules) tanpa landasan pemetaan kompetensi terukur.
- **Keputusan:** Melakukan academic benchmarking terlebih dahulu, membangun 17 unit kompetensi riset formal (COMP-FND, COMP-APP, COMP-EXP, COMP-IND, COMP-DOC), dan menurunkan struktur kurikulum secara murni dari kebutuhan kompetensi tersebut.
- **Dampak:** Jumlah materi bertambah menjadi 51 Chapter dan 174 Granular Lessons yang tersusun dalam 7 Level progresif tanpa pengulangan tak perlu.

### ADR-007: Konsolidasi Kurikulum Master Tunggal dengan 10 Learning Paths Terarah
- **Konteks:** Pemisahan antara "Core Curriculum", "Advanced Curriculum", dan "Specialization Tracks" pada v1 menimbulkan risiko fragmentasi dan duplikasi materi.
- **Keputusan:** Menggabungkan seluruh materi ke dalam satu Master Curriculum terpadu (Levels 1 hingga 7) yang utuh. Spesialisasi dan target pembelajar dilayani melalui 10 Learning Paths yang memetakan jalur bab tanpa menduplikasi teks.
- **Dampak:** Mempermudah pemeliharaan konten, memastikan tidak ada materi yang redundan, dan memberikan kebebasan fleksibilitas belajar bagi mahasiswa S1 maupun calon doktor.

### ADR-008: Integrasi Metrologi Fisik dan Ketidakpastian Pengukuran (GUM) ke Jalur Inti
- **Konteks:** Banyak peneliti rekayasa menganalisis data sensor tanpa memahami kalibrasi, drift, dan ketidakpastian pengukuran instrumen fisik.
- **Keputusan:** Menempatkan Metrologi dan Evaluasi Ketidakpastian Pengukuran (JCGM 100:2008 GUM) pada Level 2 (CH-11) sebagai prasyarat wajib sebelum analisis statistik lanjutan.
- **Dampak:** Menghasilkan lulusan dan peneliti rekayasa yang memahami integritas instrumen sejak hulu eksperimen.

### ADR-009: Penegakan Permanen Kebijakan Anti-Slop, Bahasa Indonesia Akademik, dan Tipografi
- **Konteks:** Asisten AI kerap kembali menggunakan pola tulisan klise pemasaran, tanda baca em dash, dan campuran bahasa yang tidak konsisten antar sesi.
- **Keputusan:** Memformalkan kebijakan permanen dalam [`docs/PERMANENT_STANDARDS.md`](docs/PERMANENT_STANDARDS.md) yang wajib dibaca dan dipatuhi oleh seluruh asisten AI sebelum menghasilkan konten.
- **Dampak:** Konsistensi gaya bahasa dan mutu visual terjamin secara lintas-sesi.

### ADR-010: Standardisasi Kanonikal 204 Pelajaran (Uniform 4 Lessons per Chapter Architecture)
- **Konteks:** Draf perancangan awal memiliki variasi 3 hingga 4 pelajaran per bab yang berisiko menciptakan disparitas kedalaman materi.
- **Keputusan:** Menstandarkan setiap bab pada tepat 4 pelajaran granular lengkap (51 bab x 4 pelajaran = 204 pelajaran) yang mematuhi 10 komponen anatomi akademik utuh.
- **Dampak:** Struktur kurikulum simetris, terprediksi, dan memiliki kedalaman pedagogis yang setara di seluruh 7 level.

### ADR-011: Verifikasi Komputasi Mandiri Tanpa Halusinasi Angka
- **Konteks:** Eksperimen dan contoh kode rentan mengalami bit rot, perubahan API pustaka (misalnya penghapusan np.trapz pada NumPy 2.x), atau kesalahan runtime.
- **Keputusan:** Mengimplementasikan runner audit mandiri (`verify_python_code.py` dan `verify_labs.py`) yang mengekstrak dan mengeksekusi seluruh 199 modul kode pelajaran dan 15 skrip laboratorium di lingkungan Python 3.12 riil.
- **Dampak:** Jaminan ilmiah 100% bebas dari angka palsu dan data sintetis tanpa kalibrasi.

### ADR-012: Standardisasi Arsitektur Publikasi Tunggal via Branch gh-pages
- **Konteks:** Mekanisme `actions/deploy-pages@v4` berbasis GitHub Environment protection rules mengalami konflik otorisasi apabila konfigurasi resmi GitHub Pages pada repositori diatur pada mode "Deploy from a branch".
- **Keputusan:** Menstandardisasi strategi publikasi tunggal yang konsisten: GitHub Actions menjalankan seluruh rangkaian pengujian akademik dan komputasi, membangun bundel produksi, lalu menerbitkan artefak secara otomatis ke branch `gh-pages` menggunakan `JamesIves/github-pages-deploy-action@v4`.
- **Dampak:** Alur CI/CD stabil, bebas dari kendala izin environment GitHub, dan konfigurasi resmi GitHub Pages ("Deploy from a branch: gh-pages / (root)") tetap berfungsi tanpa intervensi manual.


---

## 4. CONTINUITY GUIDE UNTUK SESI BERIKUTNYA

Jika sesi ini dijeda atau dilanjutkan pada sesi baru, asisten AI wajib:
1. Membaca `README_PROJECT.md` dan memeriksa status persetujuan **Gate 0**.
2. **KONDISI STOP GATE 0:**
   - Jika Gate 0 belum disetujui Project Creator: DILARANG memulai koding website (Phase 1), dilarang menulis naskah chapter secara massal (Phase 2), dilarang melakukan `git commit`/`push`. Berikan respons yang memfasilitasi evaluasi Gate 0.
   - Jika Gate 0 telah disetujui Project Creator: Mulai eksekusi **Phase 1** sesuai spesifikasi pada [`docs/WEBSITE_ARCHITECTURE.md`](docs/WEBSITE_ARCHITECTURE.md) dan [`docs/IMPLEMENTATION_ROADMAP.md`](docs/IMPLEMENTATION_ROADMAP.md).
3. Selalu mematuhi pedoman permanen: dilarang menggunakan em dash (`—`), gunakan bahasa Indonesia akademik baku, verifikasi notasi matematika KaTeX, dan gunakan data riil atau simulasi berlabel `[SIMULASI/SYNTHETIC DATA]`.
