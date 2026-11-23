# Rekonsiliasi Kurikulum Master: Audit Inventaris dan Resolusi Diskrepansi

**Proyek:** Scientific Research & Experimental Methods Learning Hub  
**Institusi:** Institut Teknologi Sumatera (ITERA)  
**Pemilik Proyek:** Aji Pamungkas Tri Nurcahyo  
**Status Audit:** Terverifikasi Penuh (PASS)  
**Tanggal:** 23 November 2026  

---

## 1. Latar Belakang dan Resolusi Diskrepansi Angka (174 vs 204 Lessons)

Dalam proses evaluasi akhir, ditemukan perbedaan pencatatan jumlah pelajaran (lessons) pada laporan-laporan tahap awal dibandingkan dengan implementasi aktual:
- Laporan awal Phase 0 mencatat target perencanaan: **51 Chapter, 174 Lessons**.
- Implementasi aktual repositori mencatat: **51 Chapter, 204 Lessons**.

### Investigasi Akar Masalah (Root Cause Analysis)
1. **Draf Awal Phase 0 (`PHASE_0_REDESIGN_REPORT.md`):**  
   Pada rancangan tabel awal Phase 0, distribusi target disusun secara heterogen:
   - Level 1: 7 Chapter x ~3-4 Lessons = 24 Lessons
   - Level 2: 8 Chapter x ~3-4 Lessons = 28 Lessons
   - Level 3: 8 Chapter x ~3-4 Lessons = 28 Lessons
   - Level 4: 8 Chapter x ~3-4 Lessons = 28 Lessons
   - Level 5: 6 Chapter x ~3-4 Lessons = 20 Lessons
   - Level 6: 7 Chapter x ~3-4 Lessons = 24 Lessons
   - Level 7: 7 Chapter x ~3-4 Lessons = 22 Lessons
   - **Total Awal:** 24 + 28 + 28 + 28 + 20 + 24 + 22 = **174 Lessons**.
2. **Standardisasi Anatomi Kurikulum Master v2.0 (`MASTER_CURRICULUM.md`):**  
   Ketika Master Curriculum v2.0 diformalkan, demi menjamin kedalaman akademik yang setara dan kepatuhan penuh terhadap 10 Bagian Anatomi Akademik, arsitektur kurikulum distandardisasi menjadi **4 Granular Lessons per Chapter secara seragam untuk seluruh 51 Chapter**.
   - Perhitungan Baku: $51 \text{ Chapter} \times 4 \text{ Lesson} = 204 \text{ Lesson}$.
3. **Kesimpulan Audit:**  
   Tidak ada duplikasi atau penambahan materi liar. Angka 204 adalah representasi lengkap dan kanonikal dari Master Curriculum v2.0 di mana seluruh 51 chapter memiliki tepat 4 lesson utuh.

---

## 2. Audit Judul Chapter (Penyelarasan CH-16 s.d. CH-31)

Dalam prompt pengarahan, terdapat kekhawatiran mengenai inkonsistensi judul pada rentang CH-16 s.d. CH-31 akibat penggunaan judul singkatan percakapan pada prompt sebelumnya. Audit komparatif dilakukan antara Master Curriculum kanonikal dengan kode sumber TypeScript (`src/data/curriculumMeta.ts` dan `src/lessons/`):

| Kode | Judul Kanonikal (Master Curriculum v2.0) | Judul Metadata (`curriculumMeta.ts`) | Status Keselarasan |
| :--- | :--- | :--- | :--- |
| **CH-16** | Exploratory Data Analysis & Descriptive Statistics | Exploratory Data Analysis & Descriptive Statistics | 100% Identik |
| **CH-17** | Probability Distributions & Engineering Data Modeling | Probability Distributions & Engineering Data Modeling | 100% Identik |
| **CH-18** | Point & Interval Estimation Theory | Point & Interval Estimation Theory | 100% Identik |
| **CH-19** | Classical Hypothesis Testing: Single & Two-Sample Tests | Classical Hypothesis Testing: Single & Two-Sample Tests | 100% Identik |
| **CH-20** | Analysis of Variance (ANOVA) & Multiple Comparisons | Analysis of Variance (ANOVA) & Multiple Comparisons | 100% Identik |
| **CH-21** | Non-Parametric Statistical Methods | Non-Parametric Statistical Methods | 100% Identik |
| **CH-22** | Linear Regression & Correlation Diagnostics | Linear Regression & Correlation Diagnostics | 100% Identik |
| **CH-23** | Scientific Data Visualization & Statistical Graphics | Scientific Data Visualization & Statistical Graphics | 100% Identik |
| **CH-24** | Multiple Regression & Multivariable Modeling | Multiple Regression & Multivariable Modeling | 100% Identik |
| **CH-25** | Generalized Linear Models (GLM) for Engineering Data | Generalized Linear Models (GLM) for Engineering Data | 100% Identik |
| **CH-26** | Fundamentals of Design of Experiments (DoE) | Fundamentals of Design of Experiments (DoE) | 100% Identik |
| **CH-27** | Mixed-Effects Models & Hierarchical Data | Mixed-Effects Models & Hierarchical Data | 100% Identik |
| **CH-28** | Factorial & Fractional Factorial Experimental Designs | Factorial & Fractional Factorial Experimental Designs | 100% Identik |
| **CH-29** | Response Surface Methodology (RSM) & Robust Design | Response Surface Methodology (RSM) & Robust Design | 100% Identik |
| **CH-30** | Block Designs, Latin Squares & Covariance Analysis | Block Designs, Latin Squares & Covariance Analysis | 100% Identik |
| **CH-31** | Split-Plot, Repeated Measures & Nested Experimental Designs | Split-Plot, Repeated Measures & Nested Experimental Designs | 100% Identik |

**Hasil Temuan:** Seluruh judul bab dalam metadata dan berkas kode sumber adalah 100% selaras dengan Master Curriculum v2.0. Variasi sebelumnya hanya terjadi pada teks prompt pengarah dan tidak memengaruhi integritas repositori.

---

## 3. Inventaris Lengkap Distribusi Lesson per Level

| Level | Nama Level Akademik | Bab Terdaftar | Jumlah Lesson | Status Verifikasi |
| :--- | :--- | :--- | :--- | :--- |
| **Level 1** | Epistemology, Scientific Reasoning & Problem Formulation | CH-01 s.d. CH-07 | 28 Lessons | TERVERIFIKASI (100%) |
| **Level 2** | Research Design, Measurement & Data Architecture | CH-08 s.d. CH-15 | 32 Lessons | TERVERIFIKASI (100%) |
| **Level 3** | Statistical Foundations, Inference & Classical Analysis | CH-16 s.d. CH-23 | 32 Lessons | TERVERIFIKASI (100%) |
| **Level 4** | Statistical Modeling & Design of Experiments (DoE) | CH-24 s.d. CH-31 | 32 Lessons | TERVERIFIKASI (100%) |
| **Level 5** | Computational Validation, ML Rigor & Benchmarking | CH-32 s.d. CH-37 | 24 Lessons | TERVERIFIKASI (100%) |
| **Level 6** | Advanced Inferential, Causal & Computational Methods | CH-38 s.d. CH-44 | 28 Lessons | TERVERIFIKASI (100%) |
| **Level 7** | Research Software Engineering, Reproducibility & Publication | CH-45 s.d. CH-51 | 28 Lessons | TERVERIFIKASI (100%) |
| **TOTAL** | **7 Tingkat Kemahiran Riset** | **51 Chapter** | **204 Lessons** | **LULUS (100%)** |

---

## 4. Keputusan Rekonsiliasi Final

1. Angka kanonikal resmi Learning Hub ditetapkan secara permanen pada **51 Chapter dan 204 Lessons**.
2. Seluruh dokumentasi referensi (README, Master Curriculum, Roadmap) telah disinkronkan ke baseline 204 lessons.
3. Kepatuhan integritas: Tidak ada lesson yang dihapus, diganti, atau di-downgrade. Seluruh 204 lesson berstatus `verified` dengan 10 komponen anatomi akademik utuh.
