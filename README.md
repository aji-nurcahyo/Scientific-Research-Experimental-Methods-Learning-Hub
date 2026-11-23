# Scientific Research & Experimental Methods Learning Hub
## From Scientific Thinking to Reproducible Research

> **Institusi:** Institut Teknologi Sumatera (ITERA)  
> **Project Creator:** Aji Pamungkas Tri Nurcahyo  
> **Live Learning Hub:** [aji-nurcahyo.github.io/Scientific-Research-Experimental-Methods-Learning-Hub](https://aji-nurcahyo.github.io/Scientific-Research-Experimental-Methods-Learning-Hub/)  
> **Target Audiens:** Mahasiswa Sarjana (S1), Peneliti & Dosen Rekayasa, Calon Peneliti Doktoral (PhD Candidates)  
> **Status Kurikulum:** 51 Bab, 204 Pelajaran Terverifikasi, 15 Laboratorium Komputasi, 16 Template Riset  

---

## 1. Tentang Learning Hub

**Scientific Research & Experimental Methods Learning Hub** adalah platform pembelajaran komprehensif mengenai metodologi penelitian ilmiah modern, metrologi rekayasa, perancangan eksperimen (*Design of Experiments*), statistika inferensial dan komputasional, serta replikasi dan reproduksibilitas riset.

Platform ini dirancang untuk menjembatani jurang pemisah antara penguasaan teori konseptual dan praktik eksekusi penelitian di laboratorium maupun komputasi melalui alur penalaran ilmiah yang ketat:

$$\text{Scientific Reasoning} \longrightarrow \text{Research Design} \longrightarrow \text{Data Collection} \longrightarrow \text{Analysis} \longrightarrow \text{Validation} \longrightarrow \text{Reproducibility} \longrightarrow \text{Scientific Communication}$$

---

## 2. Struktur Master Kurikulum v2.0

Kurikulum Master disusun berdasarkan pemetaan **17 Unit Kompetensi Riset Formal** pada **7 Tingkat Kemahiran**:

| Level | Judul Level Pembelajaran | Fokus Utama Keilmuan | Jumlah Bab | Jumlah Pelajaran |
| :--- | :--- | :--- | :--- | :--- |
| **Level 1** | Epistemology, Scientific Reasoning & Problem Formulation | Logika ilmiah, falsifikasi Popperian, penelusuran PRISMA, etika COPE | 7 Bab | 28 Pelajaran |
| **Level 2** | Research Design, Measurement & Data Architecture | Desain Campbell-Stanley, metrologi GUM, sampling, FAIR data management | 8 Bab | 32 Pelajaran |
| **Level 3** | Statistical Foundations, Inference & Classical Analysis | EDA robust, CLT, NHST, effect size, multiple testing FDR, visualisasi data | 8 Bab | 32 Pelajaran |
| **Level 4** | Statistical Modeling & Design of Experiments (DoE) | OLS diagnostics, GLM, ANOVA, DoE faktorial penuh $2^k$, faktorial fraksional | 8 Bab | 32 Pelajaran |
| **Level 5** | Computational Validation, ML Rigor & Benchmarking | Forensik data leakage, benchmark Demšar, CD diagrams, studi ablasi, uji OOD | 6 Bab | 24 Pelajaran |
| **Level 6** | Advanced Inferential, Causal & Computational Methods | Bootstrap BCa, Bayesian MCMC, kestabilan IEEE 754, kausalitas Pearl | 7 Bab | 28 Pelajaran |
| **Level 7** | Research Software Engineering, Reproducibility & Publication | RSE pytest, Docker, ELN W3C PROV, IMRaD claims-evidence, peer-review, Capstone | 7 Bab | 28 Pelajaran |
| **TOTAL** | **7 Tingkat Kemahiran Riset** | **Kurikulum Riset Terpadu** | **51 Bab** | **204 Pelajaran** |

---

## 3. Fitur Utama Pembelajaran

- **204 Pelajaran Beranotasi Lengkap:** Setiap pelajaran dilengkapi tujuan pembelajaran, formulasi matematika KaTeX, contoh kasus rekayasa nyata, blok kode Python yang dapat dieksekusi, diagnostik kesalahan umum, prosedur validasi, latihan mandiri, dan slide presentasi terintegrasi.
- **15 Laboratorium Riset Komputasi:** Berkas skrip Python mandiri (`labs/lab01_*.py` s.d. `lab15_*.py`) dan simulator in-browser interaktif (uji p-value Monte Carlo, cakupan interval kepercayaan, kalkulator statistical power, dan budget ketidakpastian ISO GUM).
- **16 Instrumen & Template Riset:** Template baku format Markdown siap salin dan unduh (.md) untuk proposal, datasheets for datasets, logbook forensik, rencana analisis statistik (SAP), hingga matriks tanggapan reviewer jurnal.
- **10 Jalur Pembelajaran Terspesialisasi (Learning Paths):** Panduan kurikulum terarah untuk tugas akhir sarjana, laboratorium fisik, pengujian model AI/ML, metodologi pemrosesan sinyal, hingga persiapan riset doktoral.
- **Ekspor Dokumen & Slide Akademik:** Slide deck bawaan dengan kontrol keyboard untuk seminar/kelas dan format cetak CSS ramah PDF tanpa gangguan elemen web.

---

## 4. Panduan Menjalankan di Komputer Lokal

### Prasyarat
- Node.js (versi 18 LTS atau 20 LTS)
- Python 3.10+ (dengan pustaka `numpy`, `scipy`, `pandas`, `scikit-learn`, `statsmodels`)

### Langkah Pemasangan & Menjalankan
```bash
# 1. Kloning repositori
git clone https://github.com/aji-nurcahyo/Scientific-Research-Experimental-Methods-Learning-Hub.git
cd Scientific-Research-Experimental-Methods-Learning-Hub

# 2. Pasang dependensi JavaScript
npm install

# 3. Jalankan server pengembangan lokal
npm run dev
```
Buka peramban di `http://localhost:5173/` untuk mengakses Learning Hub secara lokal.

### Menjalankan Rangkaian Uji Validasi Mandiri
```bash
# Validasi integritas kurikulum dan kepatuhan anti-slop
python scripts/validate_curriculum.py

# Verifikasi komputasi kode Python seluruh pelajaran
python scripts/verify_python_code.py

# Verifikasi 15 skrip laboratorium mandiri
python scripts/verify_labs.py

# Pemeriksaan tipe TypeScript dan pembangunan berkas produksi
npm run build
```

---

## 5. Dokumentasi Metodologi & Laporan Audit

Rincian lengkap perancangan dan laporan audit mutu tersedia di folder [`docs/`](docs/):
- [`docs/MASTER_CURRICULUM.md`](docs/MASTER_CURRICULUM.md): Silabus kurikulum 51 Bab dan 204 Pelajaran.
- [`docs/COMPETENCY_FRAMEWORK.md`](docs/COMPETENCY_FRAMEWORK.md): Kerangka 17 unit kompetensi riset.
- [`docs/CURRICULUM_RECONCILIATION.md`](docs/CURRICULUM_RECONCILIATION.md): Laporan rekonsiliasi inventaris kurikulum.
- [`docs/SCIENTIFIC_VERIFICATION_REPORT.md`](docs/SCIENTIFIC_VERIFICATION_REPORT.md): Laporan pengujian kode komputasi numerik.
- [`docs/LABORATORY_FUNCTIONAL_AUDIT.md`](docs/LABORATORY_FUNCTIONAL_AUDIT.md): Laporan audit fungsional 15 laboratorium.
- [`docs/SLIDES_PDF_VALIDATION.md`](docs/SLIDES_PDF_VALIDATION.md): Laporan validasi slide presentasi dan format cetak PDF.
- [`docs/UI_UX_ACCESSIBILITY_AUDIT.md`](docs/UI_UX_ACCESSIBILITY_AUDIT.md): Laporan audit aksesibilitas (WCAG AA) dan anti-slop.
- [`docs/PERFORMANCE_AUDIT.md`](docs/PERFORMANCE_AUDIT.md): Laporan analisis chunk dan efisiensi memori.
- [`docs/FINAL_ACADEMIC_AUDIT.md`](docs/FINAL_ACADEMIC_AUDIT.md): Laporan evaluasi taksonomi Bloom dan sitasi akademik.
- [`docs/FINAL_RELEASE_READINESS.md`](docs/FINAL_RELEASE_READINESS.md): Laporan kesiapan rilis publik dan tata kelola rilis.

---

*Institut Teknologi Sumatera (ITERA) • Laboratorium & Rekayasa Riset Mandiri*
