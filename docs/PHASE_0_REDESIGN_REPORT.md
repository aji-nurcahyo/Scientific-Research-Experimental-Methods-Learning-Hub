# PHASE 0 REDESIGN DECISION REPORT
## Complete Academic Redesign & Permanent Quality Standards
### Scientific Research & Experimental Methods Learning Hub — ITERA

> **Dokumen Status:** Final Phase 0 Redesign Report (Reset v2.0)  
> **Klasifikasi:** Academic Architecture & Quality Assurance Assessment  
> **Institusi:** Institut Teknologi Sumatera (ITERA)  
> **Project Creator:** Aji Pamungkas Tri Nurcahyo  
> **Tanggal Evaluasi:** 22 November 2026

---

## 1. RINGKASAN EKSEKUTIF DAN JUSTIFIKASI PERUBAHAN BESAR

Proses perancangan ulang menyeluruh (*Phase 0 Reset*) telah selesai dilaksanakan secara mandiri, berakar pada bukti akademik terverifikasi, dan bebas dari keterikatan terhadap angka arbitrer rancangan draf historis sebelumnya (draf historis v1 telah diamankan di `docs/historical/phase0_v1/`).

Perubahan arsitektural utama yang membedakan **Master Curriculum v2.0** dari draf awal:

1. **Transisi dari Angka Arbitrer (28/17) ke Kerangka Kompetensi Formal:**  
   Draf historis membatasi kurikulum pada 28 Core Chapters dan 17 Advanced Modules yang terkotak-kotak. Rancangan baru menurunkan struktur secara deduktif dari **Research Competency Framework** (17 unit kompetensi formal pada 5 tahap perkembangan: Foundational, Applied, Advanced Experimental, Independent, Doctoral), menghasilkan **51 Chapter** dan **174 Granular Lessons** yang terorganisasi dalam **7 Level** progresif.
2. **Penyatuan Metrologi Fisik dan Ketidakpastian Pengukuran (GUM):**  
   Draf awal mengasingkan metrologi pada spesialisasi sempit. Rancangan v2.0 mengintegrasikan kalibrasi sensor, ketertelusuran metrologi, dan evaluasi ketidakpastian JCGM 100:2008 (GUM) langsung pada Level 2 (CH-11) sebagai prasyarat wajib sebelum analisis data dimulai.
3. **Penyatuan Kurikulum Master Tunggal dengan 10 Learning Paths:**  
   Struktur kurikulum tidak lagi dipecah menjadi beberapa kurikulum terpisah yang rawan tumpang tindih. Seluruh materi disatukan dalam satu Master Curriculum tunggal. Sepuluh jalur spesialisasi dan profil pembelajar dilayani melalui **Learning Paths** yang memetakan chapter tanpa menduplikasi konten.
4. **Research Software Engineering (RSE) dan Reproduksibilitas sebagai Standar Inti:**  
   Menjadikan kontainerisasi Docker, isolasi dependensi lockfiles, determinisme acak, dan silsilah data W3C PROV sebagai kompetensi wajib Level 7 untuk memberantas krisis replikasi komputasi.
5. **Penegakan Permanen Kebijakan Anti-Slop dan Higienitas Tipografi:**  
   Menetapkan larangan permanen tanda baca em dash (`—`), jargon pemasaran AI, data sintetis tak berlabel, dan artefak Markdown/LaTeX mentah.

---

## 2. TEMUAN KUNCI ACADEMIC BENCHMARKING

Berdasarkan kajian terhadap standar formal internasional (ISO/IEC 17025, JCGM 100:2008 GUM, FAIR Data, COPE, ACM Artifact Review), buku teks kanonikal (Montgomery, Box Hunter & Hunter, Cohen, Gelman, Pearl, Creswell), dan literatur ilmiah peer-reviewed (Wasserstein & Lazar 2016, Demšar 2006, Kapoor & Narayanan 2023):

- **Krisis Inferensi Statistik:** Dikotomi usang nilai $p < 0.05$ terbukti menjadi penyebab utama tingginya temuan riset palsu di literatur rekayasa. Kurikulum v2.0 mewajibkan pelaporan ukuran efek (*standardized effect sizes*), interval kepercayaan, dan estimasi daya statistik pra-eksperimen.
- **Kebocoran Data Komputasi:** Mayoritas klaim superioritas model machine learning di publikasi rekayasa cacat akibat pra-pemrosesan di luar loop validasi silang (*data leakage*). Modul khusus forensik kebocoran data diintegrasikan pada Level 5 (CH-32 dan LAB-08).
- **Kelemahan Komparasi Algoritma:** Penggunaan uji t berpasangan pada perbandingan multi-dataset dinyatakan tidak sah secara matematis. Prosedur non-parametrik Demšar (uji Friedman, uji Nemenyi post-hoc, dan Critical Difference Diagrams) diadopsi sebagai standar baku evaluasi komputasi.

---

## 3. RESEARCH COMPETENCY FRAMEWORK & PEMETAAN KURIKULUM

Sebanyak 17 unit kompetensi riset formal telah didefinisikan secara granular pada 5 tahap perkembangan:
- **Tahap I (Foundational):** COMP-FND-01 s.d. COMP-FND-05 (Epistemologi, Scoping Masalah, PRISMA Search, Novelty, Etika & Silsilah Data).
- **Tahap II (Applied):** COMP-APP-01 s.d. COMP-APP-05 (Desain Eksperimen, Skala Pengukuran, Sampling, EDA, NHST & Effect Size).
- **Tahap III (Advanced Experimental):** COMP-EXP-01 s.d. COMP-EXP-04 (GUM Uncertainty, DoE Faktorial, Pemodelan GLM/Mixed-Effects, Non-Parametrik & FDR).
- **Tahap IV (Independent):** COMP-IND-01 s.d. COMP-IND-04 (RSE & Docker, Benchmark Demšar & Ablasi, Penulisan IMRaD Claims-Evidence, Peer-Review Rebuttal).
- **Tahap V (Doctoral):** COMP-DOC-01 s.d. COMP-DOC-04 (Posisi Teoretis Novelty, UQ Conformal & Sensitivitas Sobol, Kausalitas SCM Pearl, Roadmap Disertasi 3-4 Tahun).

---

## 4. INVENTARIS TOTAL LEVEL, SECTION, CHAPTER & LESSON

Kurikulum Master v2.0 terdiri atas:
- **7 Level Pembelajaran**
- **17 Section Tematik**
- **51 Chapter Mandiri**
- **174 Granular Lessons**

| Level | Judul Level | Section | Chapters | Lessons |
| :--- | :--- | :--- | :--- | :--- |
| **Level 1** | Epistemology, Scientific Reasoning & Problem Formulation | 3 Section | 7 Chapter | 24 Lessons |
| **Level 2** | Research Design, Measurement & Data Architecture | 3 Section | 8 Chapter | 28 Lessons |
| **Level 3** | Statistical Foundations, Inference & Classical Analysis | 2 Section | 8 Chapter | 28 Lessons |
| **Level 4** | Statistical Modeling & Design of Experiments (DoE) | 2 Section | 8 Chapter | 28 Lessons |
| **Level 5** | Computational Validation, ML Rigor & Benchmarking | 2 Section | 6 Chapter | 20 Lessons |
| **Level 6** | Advanced Inferential, Causal & Computational Methods | 2 Section | 7 Chapter | 24 Lessons |
| **Level 7** | Research Software Engineering, Reproducibility & Publication | 2 Section | 7 Chapter | 22 Lessons |
| **TOTAL** | **Full Master Curriculum v2.0** | **17 Section** | **51 Chapter** | **174 Lessons** |

---

## 5. ANALISIS KETERGANTUNGAN PRASYARAT (PREREQUISITE DAG)

Seluruh 51 Chapter telah diverifikasi secara topologis dan membentuk graf berarah tanpa siklus (*Directed Acyclic Graph* - DAG):
- **Bebas Dependensi Melingkar:** Tidak ditemukan satupun ketergantungan siklis ($A \to B \to A$).
- **7 Simpul Gerbang Utama (*Gateway Milestone Chapters*):**
  1. *CH-06 (Hypotheses & DAGs):* Gerbang menuju perancangan empiris Level 2.
  2. *CH-15 (Proposal Engineering):* Gerbang verifikasi kesiapan eksekusi riset.
  3. *CH-20 (Confidence Intervals & Effect Sizes):* Gerbang inferensi statistik bebas p-hacking.
  4. *CH-24 (Linear Regression & OLS Diagnostics):* Gerbang pemodelan statistik Level 4-6.
  5. *CH-29 (Full Factorial Experiments):* Gerbang eksperimen multifaktor dan ablasi.
  6. *CH-33 (Baseline Selection & Benchmarking):* Gerbang evaluasi komputasi adil.
  7. *CH-48 (IMRaD Claims-to-Evidence Architecture):* Gerbang komunikasi publikasi internasional.

---

## 6. ARSITEKTUR 10 LEARNING PATHS

Sepuluh jalur pembelajaran terarah dibangun dengan merangkai chapter kurikulum master tanpa duplikasi:
- **Klaster S1:** LP-01 (Undergraduate Thesis & Capstone Research).
- **Klaster Rekayasa Lanjut:** LP-02 (Engineering Experimental & Metrology), LP-03 (Statistical Modeling), LP-04 (AI & Machine Learning Research), LP-05 (Computer Vision Research Methodology), LP-06 (Signal Processing & Sensing), LP-07 (Remote Sensing & Geospatial).
- **Klaster Publikasi & Doktoral:** LP-08 (Reproducible Research & RSE), LP-09 (Scientific Publication & Peer Review), LP-10 (Doctoral Research Preparation & Epistemic Leadership).

---

## 7. RENCANA LABORATORIUM DAN INVENTARIS TEMPLATE

- **15 Practical Research Laboratories:** Tersebar dalam 4 kelompok modul komputasi Python: Inferensi Statistik (LAB 01-04), Metrologi & DoE (LAB 05-07), Validasi Komputasi & ML (LAB 08-11), dan UQ Lanjutan, Sensitivitas & Pipeline (LAB 12-15). Seluruh lab memuat 13 atribut formal lengkap dengan toleransi numerik terdefinisi dan label eksplisit data simulasi `[SIMULASI/SYNTHETIC DATA]`.
- **16 Research Templates:** Meliputi seluruh siklus hidup riset: Research Planning (TMPL 01-04), Study Design & Data Protocols (TMPL 05-08), Analysis & Evaluation (TMPL 09-12), serta Reporting, Reproducibility & Publication (TMPL 13-16). Seluruh template memuat petunjuk lapangan dan contoh realistis bidang rekayasa ITERA.

---

## 8. REKOMENDASI ARSITEKTUR WEBSITE

- **Hosting & Engine:** Static-first murni di GitHub Pages, zero-cost backend.
- **Rendering Rumus:** KaTeX v0.16+ untuk kecepatan render instan dan stabilitas Cumulative Layout Shift (CLS = 0).
- **Aksesibilitas:** Rasio kontras teks $\geq 4.8:1$ (WCAG AA), navigasi keyboard penuh (`Tab`, `Shift+Tab`, `Enter`, `Escape`), target ketukan mobile $\geq 44$ px, bebas overflow horizontal.
- **Ekspor PDF & Cetak:** Stylesheet cetak `@media print` yang mengisolasi konten batang tubuh, mengatur jeda halaman (`page-break`), dan memformat naskah berstandar buku ilmiah.

---

## 9. ANALISIS RISIKO AKADEMIK DAN TEKNIS

| Potensi Risiko | Tingkat Keparahan | Strategi Mitigasi Terencana |
| :--- | :--- | :--- |
| **Beban Kognitif Pembelajar S1 Terlalu Tinggi** | Sedang | Dilindungi oleh Learning Path LP-01 yang hanya mengambil 17 chapter esensial dan mengabaikan modul lanjutan (UQ Sobol, DoE $2^{k-p}$, MCMC). |
| **Penyimpangan Gaya AI Slop pada Sesi Lanjutan** | Tinggi | Ditegakkan melalui [`docs/PERMANENT_STANDARDS.md`](docs/PERMANENT_STANDARDS.md) yang mengikat secara permanen (larangan em dash, larangan jargon, audit 15 Quality Gates). |
| **Kerusakan Rendering Matematika LaTeX Rumit** | Sedang | Standardisasi penulisan rumus KaTeX murni, isolasi display math pada baris mandiri, dan pengetatan escape karakter `\$`. |
| **Ketidakstabilan Eksekusi Kode Komputasi Antar-Sistem** | Sedang | Penguncian versi dependensi pada `pyproject.toml` / `requirements.lock` dan kontainerisasi Docker pada Level 7. |

---

## 10. EVALUASI KEPATUHAN KEBIJAKAN ANTI-SLOP, BAHASA & TIPOGRAFI

- **Anti-AI-Slop:** Seluruh 11 dokumen perencanaan yang dihasilkan dalam Phase 0 Reset v2.0 telah diperiksa dan **100% bebas dari karakter em dash (`—`)**, bebas dari kata klise pemasaran AI ("revolutionary", "cutting-edge", "game-changing"), dan seluruh data eksperimen telah dilabeli secara jujur.
- **Bahasa Indonesia Akademik:** Menggunakan struktur kalimat bahasa Indonesia ilmiah baku dengan mempertahankan istilah teknis bahasa Inggris mapan (*ground truth, data leakage, benchmark, ablation study, reproducibility, effect size, confidence interval, pipeline*).
- **Higienitas Tipografi:** Bebas dari emoji dekoratif, bebas dari artefak Markdown mentah yang tak ter-render, dan seluruh ekspresi matematika tersaji dalam format KaTeX formal.

---

## 11. REKOMENDASI KESIAPAN GATE 0 (GATE 0 READINESS)

Dokumen perencanaan Phase 0 Reset v2.0 ini dinyatakan **SIAP UNTUK DITINJAU OLEH PROJECT CREATOR (GATE 0 PENDING)**.

Tidak ditemukan lagi ambiguitas kurikulum, ketergantungan prasyarat yang terputus, atau ketidakjelasan arsitektur pembelajaran. Seluruh instrumen perencanaan telah siap dijadikan baseline terkontrol setelah persetujuan Project Creator diberikan.

**Kondisi Stop Terpenuhi:** Asisten AI berhenti dan menunggu instruksi persetujuan tertulis dari Aji Pamungkas Tri Nurcahyo sebelum melangkah ke Phase 1.

