# MASTER CURRICULUM SPECIFICATION (V2.0 REDESIGN)
## Scientific Research & Experimental Methods Learning Hub
### Institut Teknologi Sumatera (ITERA)

> **Dokumen Status:** Proposed Master Curriculum v2.0 (Competency-Driven Redesign)  
> **Institusi:** Institut Teknologi Sumatera (ITERA)  
> **Project Creator:** Aji Pamungkas Tri Nurcahyo  
> **Klasifikasi:** Academic Architecture & Complete Syllabus Inventory  
> **Tanggal Rilis:** 22 November 2026

---

## 1. PRINSIP PERANCANGAN KURIKULUM V2.0

Kurikulum Master v2.0 ini disusun berdasarkan **Academic Benchmarking Report** dan **Research Competency Framework**, melepaskan batasan angka arbitrer dari draf historis sebelumnya. Kurikulum ini mengorganisasikan seluruh spektrum ilmu metodologi penelitian ke dalam struktur hierarkis yang ketat:

$$\textbf{Level} \longrightarrow \textbf{Section} \longrightarrow \textbf{Chapter} \longrightarrow \textbf{Lesson}$$

### Aturan Akademik Setiap Chapter:
Setiap chapter pada tahap penulisan wajib memenuhi 15 elemen kualitas:
1. Learning Objectives (kata kerja operasional teramati).
2. Prerequisites (ketergantungan materi terverifikasi).
3. Conceptual Explanation (penalaran substantif tanpa jargon kosong).
4. Theoretical Foundations (landasan teori keilmuan).
5. Mathematical Foundations (penurunan rumus formal dan definisi variabel eksplisit).
6. Worked Examples (perhitungan numerik langkah-demi-langkah).
7. Python Implementation (kode berbasis library standar jika relevan).
8. Scientific Visualization (visualisasi berstandar publikasi IEEE/Elsevier).
9. Practical Exercises (latihan mandiri terukur).
10. Research Case Studies (kasus nyata bidang rekayasa dan sains komputasi).
11. Common Methodological Mistakes (kesalahan konsep, p-hacking, data leakage).
12. Validation Procedures (prosedur verifikasi asumsi empiris).
13. Academic References (referensi primer terverifikasi).
14. Slides (bahan tayang berformat bersih).
15. Academic-Quality PDF Export (tampilan cetak buku ilmiah).

---

## 2. INVENTARIS RINGKAS LEVEL DAN SECTION

| Level | Judul Level | Cakupan Section | Jumlah Chapter | Rentang Kode |
| :--- | :--- | :--- | :--- | :--- |
| **Level 1** | Epistemology, Scientific Reasoning & Problem Formulation | Section 1.1, 1.2, 1.3 | 7 Chapter | CH-01 s.d. CH-07 |
| **Level 2** | Research Design, Measurement & Data Architecture | Section 2.1, 2.2, 2.3 | 8 Chapter | CH-08 s.d. CH-15 |
| **Level 3** | Statistical Foundations, Inference & Classical Analysis | Section 3.1, 3.2 | 8 Chapter | CH-16 s.d. CH-23 |
| **Level 4** | Statistical Modeling & Design of Experiments (DoE) | Section 4.1, 4.2 | 8 Chapter | CH-24 s.d. CH-31 |
| **Level 5** | Computational Validation, ML Rigor & Benchmarking | Section 5.1, 5.2 | 6 Chapter | CH-32 s.d. CH-37 |
| **Level 6** | Advanced Inferential, Causal & Computational Methods | Section 6.1, 6.2 | 7 Chapter | CH-38 s.d. CH-44 |
| **Level 7** | Research Software Engineering, Reproducibility & Publication | Section 7.1, 7.2 | 7 Chapter | CH-45 s.d. CH-51 |

**Total Keseluruhan:** 7 Level, 17 Section, 51 Chapter, dan 204 Granular Lessons (4 Pelajaran per Chapter secara terstruktur dan terverifikasi).

---

## 3. SILABUS LENGKAP LEVEL, SECTION, CHAPTER & LESSON

```
================================================================================
LEVEL 1: EPISTEMOLOGY, SCIENTIFIC REASONING & PROBLEM FORMULATION
Membangun fondasi logika berpikir ilmiah, pencarian literatur, dan etika penelitian.
================================================================================
```

### Section 1.1: Foundations of Scientific Inquiry

#### CH-01: Epistemology, Scientific Reasoning & Demarcation
- **Prerequisites:** Tidak ada (Entry Point).
- **Competency Mappings:** COMP-FND-01.
- **Mathematical Foundations:** Logika proposisional formal, silogisme Modus Ponens ($P \implies Q, P \vdash Q$) dan Modus Tollens ($P \implies Q, \neg Q \vdash \neg P$).
- **Lessons:**
  - *Lesson 1.1.1:* Logika Penalaran Ilmiah: Deduksi, Induksi, dan Abduksi dalam Rekayasa.
  - *Lesson 1.1.2:* Prinsip Falsifikasi Popperian dan Demarkasi Sains vs Pseudosains.
  - *Lesson 1.1.3:* Paradigma Riset: Positivisme, Post-Positivisme, Konstruktivisme, dan Pragmatisme.
  - *Lesson 1.1.4:* Siklus Investigasi Ilmiah Hipotetiko-Deduktif.

#### CH-02: Research Problems, Scoping & Objectives
- **Prerequisites:** CH-01.
- **Competency Mappings:** COMP-FND-02.
- **Mathematical Foundations:** Graf pohon masalah terarah $G = (V, E)$, matriks dekomposisi tujuan.
- **Lessons:**
  - *Lesson 1.2.1:* Dekonstruksi Masalah Rekayasa: Dari Gejala Praktis ke Akar Ilmiah.
  - *Lesson 1.2.2:* Analisis Pohon Masalah (*Problem Tree Analysis*) dan Batasan Lingkup.
  - *Lesson 1.2.3:* Kriteria FINER untuk Evaluasi Kelayakan Pertanyaan Penelitian.
  - *Lesson 1.2.4:* Perumusan Pertanyaan dan Tujuan Penelitian Berbasis SMART Framework.

### Section 1.2: Evidence Retrieval & Synthesis

#### CH-03: Systematic Literature Search & PRISMA Methodology
- **Prerequisites:** CH-02.
- **Competency Mappings:** COMP-FND-03.
- **Mathematical Foundations:** Teori himpunan Boolean search query: $S = (K_1 \cup K_2) \cap (K_3 \cup K_4) \setminus K_5$.
- **Lessons:**
  - *Lesson 1.3.1:* Arsitektur Basis Data Ilmiah: Scopus, Web of Science, IEEE Xplore, ACM DL.
  - *Lesson 1.3.2:* Perancangan Query Boolean Lanjutan dengan Wildcards dan Field Tags.
  - *Lesson 1.3.3:* Metodologi Penelusuran Sistematis Berbasis Pedoman PRISMA 2020.
  - *Lesson 1.3.4:* Teknik Snowballing Forward dan Backward untuk Kelengkapan Pustaka.

#### CH-04: Critical Evidence Synthesis & Bibliometrics
- **Prerequisites:** CH-03.
- **Competency Mappings:** COMP-FND-03.
- **Mathematical Foundations:** Analisis graf jaringan ko-sitasi dan co-occurrence matriks.
- **Lessons:**
  - *Lesson 1.4.1:* Konstruksi Matriks Sintesis Literatur Multidimensi.
  - *Lesson 1.4.2:* Analisis Bibliometrik Dasar Menggunakan Python (`bibtexparser`, graf jaringan).
  - *Lesson 1.4.3:* Identifikasi Bias Publikasi dan Keterbatasan Metodologis Literatur Eksisting.
  - *Lesson 1.4.4:* Pengelompokan Taksonomi Pendekatan Penyelesaian Masalah.

### Section 1.3: Novelty & Scientific Ethics

#### CH-05: Research Gaps & Novelty Formulation
- **Prerequisites:** CH-04.
- **Competency Mappings:** COMP-FND-04.
- **Mathematical Foundations:** Vektor diferensiasi fitur: $\Delta = \mathbf{v}_{\text{proposed}} - \mathbf{v}_{\text{SOTA}}$.
- **Lessons:**
  - *Lesson 1.5.1:* Taksonomi Celah Penelitian: Teoretis, Metodologis, Empiris, dan Aplikasi.
  - *Lesson 1.5.2:* Pemetaan Posisi terhadap State-of-the-Art (SOTA) Terkini.
  - *Lesson 1.5.3:* Formulasi Kontribusi Delta ($\Delta$) dan Rasionalisasi Ilmiah.
  - *Lesson 1.5.4:* Penulisan Pernyataan Kebaruan (*Novelty Claim Statement*) Tanpa Overclaiming.

#### CH-06: Hypotheses & Conceptual Frameworks
- **Prerequisites:** CH-02, CH-05.
- **Competency Mappings:** COMP-FND-01, COMP-FND-02.
- **Mathematical Foundations:** Teori Directed Acyclic Graphs (DAGs) untuk relasi kausal konseptual.
- **Lessons:**
  - *Lesson 1.6.1:* Perbedaan Hipotesis Konseptual (Riset) vs Hipotesis Statistik ($H_0 / H_1$).
  - *Lesson 1.6.2:* Hipotesis Terarah (*Directional*) vs Tak Terarah (*Non-Directional*).
  - *Lesson 1.6.3:* Konstruksi Kerangka Konseptual Menggunakan Directed Acyclic Graphs (DAGs).
  - *Lesson 1.6.4:* Identifikasi Variabel Bebas, Terikat, Perancu, dan Mediator pada Kerangka Riset.

#### CH-07: Research Ethics, Academic Integrity & Provenance
- **Prerequisites:** CH-01.
- **Competency Mappings:** COMP-FND-05.
- **Mathematical Foundations:** Fungsi hash kriptografis SHA-256 untuk imutabilitas berkas eksperimen: $h = \text{SHA256}(M)$.
- **Lessons:**
  - *Lesson 1.7.1:* Standar Integritas COPE dan Pencegahan Misconduct (Fabrikasi, Falsifikasi, Plagiarisme).
  - *Lesson 1.7.2:* Kriteria Kepengarangan Formal ICMJE dan Etika Kolaborasi Ilmiah.
  - *Lesson 1.7.3:* Etika Penggunaan Generative AI dan LLM dalam Penelitian Ilmiah.
  - *Lesson 1.7.4:* Model Silsilah Data (Data Provenance) dan Verifikasi Hash Kriptografis Dataset.

```
================================================================================
LEVEL 2: RESEARCH DESIGN, MEASUREMENT & DATA ARCHITECTURE
Merancang arsitektur penelitian, pengukuran fisik/komputasi, kalibrasi, dan manajemen data.
================================================================================
```

### Section 2.1: Experimental & Observational Architectures

#### CH-08: Taxonomy of Research Designs & Validity Threats
- **Prerequisites:** CH-06.
- **Competency Mappings:** COMP-APP-01.
- **Mathematical Foundations:** Notasi perancangan eksperimen Campbell & Stanley (R, O, X).
- **Lessons:**
  - *Lesson 2.1.1:* Taksonomi Desain Riset: Studi Observasional, Quasi-Eksperimen, dan Eksperimen Murni.
  - *Lesson 2.1.2:* Validitas Internal: Ancaman Seleksi, Sejarah, Maturasi, dan Regresi Statistik.
  - *Lesson 2.1.3:* Validitas Eksternal: Generalisabilitas Hasil ke Domain Operasional Riil.
  - *Lesson 2.1.4:* Trade-off Desain: Eksperimen Terkontrol Laboratorium vs Studi Lapangan.

#### CH-09: Variables, Operationalization & Measurement Theory
- **Prerequisites:** CH-08.
- **Competency Mappings:** COMP-APP-02.
- **Mathematical Foundations:** Teori representasional pengukuran Stevens, transformasi skala matematis.
- **Lessons:**
  - *Lesson 2.2.1:* Penyusunan Definisi Operasional Variabel yang Terukur Objektif.
  - *Lesson 2.2.2:* 4 Skala Pengukuran Data: Nominal, Ordinal, Interval, dan Rasio.
  - *Lesson 2.2.3:* Operasi Matematika dan Statistik yang Absah untuk Setiap Skala Data.
  - *Lesson 2.2.4:* Penanganan Variabel Laten melalui Indikator Pengukuran Teramati.

### Section 2.2: Sampling, Metrology & Physical Data Collection

#### CH-10: Sampling Theory & Data Collection Protocols
- **Prerequisites:** CH-09.
- **Competency Mappings:** COMP-APP-03.
- **Mathematical Foundations:** Formula penentuan ukuran sampel Cochran dan Slovin.
- **Lessons:**
  - *Lesson 2.3.1:* Teori Sampling Probabilistik: Simple Random, Stratified, Cluster, Systematic.
  - *Lesson 2.3.2:* Sampling Non-Probabilistik dan Batas Inferensinya (Purposive, Quota).
  - *Lesson 2.3.3:* Perhitungan Ukuran Sampel Minimum Berdasarkan Margin of Error dan Varians.
  - *Lesson 2.3.4:* Penyusunan Standard Operating Procedure (SOP) Koleksi Data Terstandarisasi.

#### CH-11: Metrology, Instrument Calibration & GUM Uncertainty
- **Prerequisites:** CH-09, CH-10.
- **Competency Mappings:** COMP-EXP-01.
- **Mathematical Foundations:** Hukum perambatan ketidakpastian JCGM 100:2008 (GUM):

$$u_c^2(y) = \sum_{i=1}^N \left(\frac{\partial f}{\partial x_i}\right)^2 u^2(x_i) + 2 \sum_{i=1}^{N-1}\sum_{j=i+1}^N \frac{\partial f}{\partial x_i} \frac{\partial f}{\partial x_j} u(x_i, x_j)$$

- **Lessons:**
  - *Lesson 2.4.1:* Konsep Metrologi: Akurasi (Trueness), Presisi, dan Rantai Ketertelusuran SI.
  - *Lesson 2.4.2:* Prosedur Kalibrasi Sensor dan Pembentukan Kurva Kalibrasi Terkoreksi.
  - *Lesson 2.4.3:* Evaluasi Ketidakpastian Pengukuran: Tipe A (Statistik) vs Tipe B (Spesifikasi/Kalibrasi).
  - *Lesson 2.4.4:* Penyusunan Anggaran Ketidakpastian (Uncertainty Budget) dan Expanded Uncertainty ($U$).

#### CH-12: Measurement Validity, Reliability & Agreement
- **Prerequisites:** CH-09, CH-11.
- **Competency Mappings:** COMP-APP-02, COMP-EXP-01.
- **Mathematical Foundations:** Formulasi Cronbach's Alpha ($\alpha$) dan Cohen's Kappa ($\kappa$).
- **Lessons:**
  - *Lesson 2.5.1:* Validitas Instrumen: Validitas Konstruk, Validitas Konten, dan Validitas Kriteria.
  - *Lesson 2.5.2:* Reliabilitas Instrumen: Test-Retest dan Konsistensi Internal via Cronbach's Alpha.
  - *Lesson 2.5.3:* Kesepakatan Antar-Penilai (Inter-Rater Reliability): Cohen's Kappa dan Fleiss' Kappa.
  - *Lesson 2.5.4:* Evaluasi Sistem Pengukuran Menggunakan Repeatability and Reproducibility (Gauge R&R).

### Section 2.3: Experimental Setup & Data Governance

#### CH-13: Experimental & Quasi-Experimental Setups
- **Prerequisites:** CH-08, CH-12.
- **Competency Mappings:** COMP-APP-01, COMP-EXP-02.
- **Mathematical Foundations:** Model linier aditif perlakuan: $Y_{ij} = \mu + \tau_i + \epsilon_{ij}$.
- **Lessons:**
  - *Lesson 2.6.1:* Desain Eksperimen Murni: Pretest-Posttest Control Group & Solomon Four-Group.
  - *Lesson 2.6.2:* Desain Quasi-Eksperimen: Non-Equivalent Control Group & Interrupted Time-Series.
  - *Lesson 2.6.3:* Prinsip Pengacakan Urutan Uji (*Randomized Run-Order*) dan Counterbalancing.
  - *Lesson 2.6.4:* Pengendalian Variabel Lingkungan Ambien pada Rig Uji Laboratorium.

#### CH-14: Research Data Management, FAIR Principles & Versioning
- **Prerequisites:** CH-07, CH-10.
- **Competency Mappings:** COMP-FND-05, COMP-IND-01.
- **Mathematical Foundations:** Skema JSON-LD dan digest checksum berkas data.
- **Lessons:**
  - *Lesson 2.7.1:* Penerapan FAIR Data Principles: Findable, Accessible, Interoperable, Reusable.
  - *Lesson 2.7.2:* Perancangan Data Dictionary, Buku Kode, dan Skema Metadata JSON-LD.
  - *Lesson 2.7.3:* Manajemen Versi Dataset Menggunakan Data Version Control (DVC) dan Git.
  - *Lesson 2.7.4:* Prinsip Penyimpanan Data Mentah Abadi (*Immutable Raw Data Storage*).

#### CH-15: Research Proposal & Protocol Engineering
- **Prerequisites:** CH-01 s.d. CH-14 (Sintesis Level 1 & 2).
- **Competency Mappings:** COMP-FND-02, COMP-APP-01.
- **Mathematical Foundations:** Matriks keselarasan riset: $M: \text{Questions} \to \text{Data} \to \text{Methods} \to \text{Deliverables}$.
- **Lessons:**
  - *Lesson 2.8.1:* Anatomi Naskah Proposal Penelitian Rekayasa yang Terpadu.
  - *Lesson 2.8.2:* Konstruksi Matriks Keselarasan Riset (*Research Alignment Matrix*).
  - *Lesson 2.8.3:* Penjadwalan Kerja (Gantt Chart), Perencanaan Sumber Daya, dan Manajemen Risiko.
  - *Lesson 2.8.4:* Kriteria Penilaian Proposal oleh Reviewer Akademik dan Komite Hibah.

```
================================================================================
LEVEL 3: STATISTICAL FOUNDATIONS, INFERENCE & CLASSICAL ANALYSIS
Eksplorasi data, teori probabilitas, inferensi statistik, uji hipotesis, dan visualisasi ilmiah.
================================================================================
```

### Section 3.1: Data Exploration & Distributional Foundations

#### CH-16: Exploratory Data Analysis & Outlier Forensics
- **Prerequisites:** CH-09.
- **Competency Mappings:** COMP-APP-04.
- **Mathematical Foundations:** Momen statistik ke-3 (skewness) dan ke-4 (kurtosis), deviasi absolut median (MAD).
- **Lessons:**
  - *Lesson 3.1.1:* Filosofi Tukey EDA: Visualisasi Struktur Data Sebelum Pemodelan Statistik.
  - *Lesson 3.1.2:* Ukuran Pemusatan dan Dispersi Tahan Outlier (Median, MAD, Trimmed Mean).
  - *Lesson 3.1.3:* Teknik Deteksi Pencilan: Tukey's Fences, Modified Z-score, dan Isolation Forest.
  - *Lesson 3.1.4:* Diagnosis Pola Data Hilang (MCAR, MAR, MNAR) dan Strategi Imputasi yang Valid.

#### CH-17: Probability Theory & Parametric Distributions
- **Prerequisites:** CH-16.
- **Competency Mappings:** COMP-APP-04, COMP-APP-05.
- **Mathematical Foundations:** Probability Density Function (PDF), Cumulative Distribution Function (CDF), Teorema Batas Pusat (CLT):

$$\bar{X}_n \xrightarrow{d} \mathcal{N}\left(\mu, \frac{\sigma^2}{n}\right)$$

- **Lessons:**
  - *Lesson 3.2.1:* Variabel Acak Diskrit vs Kontinu dan Sifat Fungsi Kerapatan Probabilitas.
  - *Lesson 3.2.2:* Distribusi Parametrik Fundamental: Gaussian (Normal), Student's t, Snedecor's F, Chi-Square.
  - *Lesson 3.2.3:* Distribusi Proses Rekayasa: Poisson, Binomial, Eksponensial, Log-Normal, dan Weibull.
  - *Lesson 3.2.4:* Teorema Batas Pusat (CLT) dan Uji Kebaikan Suai (Kolmogorov-Smirnov, Shapiro-Wilk).

#### CH-18: Parameter Estimation & Sampling Distributions
- **Prerequisites:** CH-17.
- **Competency Mappings:** COMP-APP-05.
- **Mathematical Foundations:** Penurunan estimator Maximum Likelihood Estimation (MLE) dan Standard Error of Mean: $SE = \sigma / \sqrt{n}$.
- **Lessons:**
  - *Lesson 3.3.1:* Konsep Sampling Distribution dan Perbedaan Standar Deviasi vs Standar Error.
  - *Lesson 3.3.2:* Sifat Estimator Statistik: Unbiasedness, Consistency, dan Efficiency.
  - *Lesson 3.3.3:* Estimasi Titik: Method of Moments vs Maximum Likelihood Estimation (MLE).
  - *Lesson 3.3.4:* Penurunan Numerik Fungsi Log-Likelihood Menggunakan Python SciPy.

### Section 3.2: Statistical Significance & Inference Mechanics

#### CH-19: Null Hypothesis Significance Testing (NHST) & Pitfalls
- **Prerequisites:** CH-17, CH-18.
- **Competency Mappings:** COMP-APP-05.
- **Mathematical Foundations:** Definisi formal p-value: $P(T \geq t_{\text{obs}} | H_0)$, probabilitas kesalahan Tipe I ($\alpha$) dan Tipe II ($\beta$).
- **Lessons:**
  - *Lesson 3.4.1:* Kerangka Inferensi Fisherian vs Neyman-Pearson Decision Theory.
  - *Lesson 3.4.2:* Prosedur 5-Langkah NHST: Satu Sampel, Dua Sampel Independen, dan Sampel Berpasangan.
  - *Lesson 3.4.3:* Batasan dan Kesalahpahaman Fatal Mengenai Makna P-Value (ASA Statement).
  - *Lesson 3.4.4:* Bahaya P-Hacking, Data Dredging, dan Praktik Optional Stopping.

#### CH-20: Confidence Intervals, Effect Sizes & Practical Significance
- **Prerequisites:** CH-18, CH-19.
- **Competency Mappings:** COMP-APP-05.
- **Mathematical Foundations:** Formulasi interval kepercayaan $(1-\alpha)$, Cohen's $d$, Hedges' $g$, dan partial $\eta^2$.
- **Lessons:**
  - *Lesson 3.5.1:* Interval Kepercayaan (Frequentist Confidence Intervals): Makna Frekuensi Jangka Panjang.
  - *Lesson 3.5.2:* Standarisasi Ukuran Efek: Cohen's d, Hedges' g, Glass's Delta, dan Rasio Odds.
  - *Lesson 3.5.3:* Mengapa Signifikansi Statistik Tidak Sama dengan Signifikansi Praktis Rekayasa.
  - *Lesson 3.5.4:* Pelaporan Hasil Komparasi Berbasis Estimasi: Menggantikan Dikotomi P-Value.

#### CH-21: Multiple Testing & False Discovery Rate Control
- **Prerequisites:** CH-19.
- **Competency Mappings:** COMP-EXP-04.
- **Mathematical Foundations:** Inflasi Family-Wise Error Rate: $\alpha_{\text{family}} = 1 - (1 - \alpha)^m$; Algoritma Benjamini-Hochberg FDR.
- **Lessons:**
  - *Lesson 3.6.1:* Masalah Inferensi Simultan: Inflasi Kesalahan Tipe I pada Pengujian Jamak.
  - *Lesson 3.6.2:* Pengendalian Family-Wise Error Rate (FWER): Koreksi Bonferroni dan Holm-Bonferroni.
  - *Lesson 3.6.3:* Pengendalian False Discovery Rate (FDR): Prosedur Benjamini-Hochberg dan Yekutieli.
  - *Lesson 3.6.4:* Implementasi Koreksi Pengujian Jamak pada Analisis Data Skala Besar via Python.

#### CH-22: Nonparametric & Distribution-Free Statistical Methods
- **Prerequisites:** CH-16, CH-19.
- **Competency Mappings:** COMP-EXP-04.
- **Mathematical Foundations:** Statistik peringkat Wilcoxon $W = \sum R_i$, statistik Kruskal-Wallis $H$, uji permutasi eksak.
- **Lessons:**
  - *Lesson 3.7.1:* Kapan Menggunakan Metode Non-Parametrik: Pelanggaran Normalitas dan Skala Ordinal.
  - *Lesson 3.7.2:* Uji Peringkat Dua Sampel: Mann-Whitney U Test dan Wilcoxon Signed-Rank Test.
  - *Lesson 3.7.3:* Uji Peringkat Multi-Sampel: Kruskal-Wallis H Test dan Friedman Test.
  - *Lesson 3.7.4:* Uji Permutasi Eksak dan Prosedur Randomisasi Tanpa Asumsi Distribusi.

#### CH-23: Scientific Data Visualization & Perceptual Principles
- **Prerequisites:** CH-16, CH-20.
- **Competency Mappings:** COMP-APP-04, COMP-IND-03.
- **Mathematical Foundations:** Teori persepsi grafis Cleveland-McGill, rasio data-tinta Tufte.
- **Lessons:**
  - *Lesson 3.8.1:* Prinsip Perseptual Visualisasi Data: Akurasi Dekoding Visual dan Hirarki Grafik.
  - *Lesson 3.8.2:* Visualisasi Distribusi Lanjutan: Raincloud Plots, Violin Plots, dan Strip Plots.
  - *Lesson 3.8.3:* Visualisasi Ketidakpastian: Bilah Error (SD vs SE vs CI) dan Pita Kepercayaan.
  - *Lesson 3.8.4:* Standar Figur Publikasi: Palet Ramah Buta Warna, Tipografi Bersih, dan Format Vektor.

```
================================================================================
LEVEL 4: STATISTICAL MODELING & DESIGN OF EXPERIMENTS (DOE)
Pemodelan regresi OLS, GLM, ANOVA multi-arah, dan perancangan eksperimen faktorial Montgomery.
================================================================================
```

### Section 4.1: Linear & Generalized Linear Modeling

#### CH-24: Linear Regression Analysis & OLS Residual Diagnostics
- **Prerequisites:** CH-16, CH-19, CH-20.
- **Competency Mappings:** COMP-EXP-03.
- **Mathematical Foundations:** Solusi matriks OLS $\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$, Variance Inflation Factor (VIF), Cook's Distance.
- **Lessons:**
  - *Lesson 4.1.1:* Model Regresi Linier Sederhana dan Berganda: Penurunan Matriks OLS.
  - *Lesson 4.1.2:* Asumsi Klasik Gauss-Markov: Linieritas, Homoskedastisitas, dan Independensi Residu.
  - *Lesson 4.1.3:* Diagnostik Residu 4-Panel Lengkap: Deteksi Heteroskedastisitas dan Titik Pengaruh (Leverage).
  - *Lesson 4.1.4:* Multikolinearitas: Deteksi via VIF dan Strategi Penanganannya.

#### CH-25: Generalized Linear Models (GLM) & Categorical Analysis
- **Prerequisites:** CH-24.
- **Competency Mappings:** COMP-EXP-03.
- **Mathematical Foundations:** Keluarga eksponensial (Exponential Dispersion Family), fungsi penghubung logit dan log.
- **Lessons:**
  - *Lesson 4.2.1:* Struktur GLM: Komponen Acak, Prediktor Linier, dan Fungsi Penghubung (Link Function).
  - *Lesson 4.2.2:* Regresi Logistik Biner: Estimasi Probabilitas, Odds Ratio, dan Kurva ROC.
  - *Lesson 4.2.3:* Regresi Poisson dan Negative Binomial untuk Data Cacah Rekayasa.
  - *Lesson 4.2.4:* Evaluasi Kecocokan Model GLM: Devians Residual dan Kriteria Informasi AIC/BIC.

#### CH-26: Analysis of Variance (ANOVA) & Post-Hoc Contrasts
- **Prerequisites:** CH-19, CH-24.
- **Competency Mappings:** COMP-EXP-02, COMP-EXP-03.
- **Mathematical Foundations:** Dekomposisi Jumlah Kuadrat (Sums of Squares Type I, II, III), kontras ortogonal.
- **Lessons:**
  - *Lesson 4.3.1:* One-Way ANOVA: Dekomposisi Varians Antar-Kelompok vs Dalam-Kelompok.
  - *Lesson 4.3.2:* Two-Way ANOVA: Efek Utama dan Efek Interaksi Dua Faktor.
  - *Lesson 4.3.3:* Pengujian Post-Hoc Lanjutan: Tukey's HSD, Scheffe, dan Uji Kontrol Dunnett.
  - *Lesson 4.3.4:* Multivariate Analysis of Variance (MANOVA) untuk Pengukuran Multi-Respon.

#### CH-27: Linear Mixed-Effects & Hierarchical Models
- **Prerequisites:** CH-24, CH-26.
- **Competency Mappings:** COMP-EXP-03.
- **Mathematical Foundations:** Formulasi matriks LMM: $\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{Z}\mathbf{u} + \boldsymbol{\epsilon}$, di mana $\mathbf{u} \sim \mathcal{N}(\mathbf{0}, \mathbf{G})$.
- **Lessons:**
  - *Lesson 4.4.1:* Batasan Model Linier Standar pada Data Terkorelasi (*Clustered/Nested Data*).
  - *Lesson 4.4.2:* Pembedaan Efek Tetap (*Fixed Effects*) dan Efek Acak (*Random Effects*).
  - *Lesson 4.4.3:* Pemodelan Pengukuran Berulang (*Repeated Measures*) Menggunakan Linear Mixed Models.
  - *Lesson 4.4.4:* Estimasi Restricted Maximum Likelihood (REML) Menggunakan Python `statsmodels`.

### Section 4.2: Formal Design of Experiments (DoE)

#### CH-28: Design of Experiments (DoE) Foundations & Fisher Axioms
- **Prerequisites:** CH-08, CH-26.
- **Competency Mappings:** COMP-EXP-02.
- **Mathematical Foundations:** Aksioma Fisher: Replikasi, Randomisasi, Blocking; matriks desain ortogonal.
- **Lessons:**
  - *Lesson 4.5.1:* Filosofi DoE vs Pendekatan Satu-Faktor-pada-Satu-Waktu (OFAT).
  - *Lesson 4.5.2:* Tiga Aksioma Fisherian: Replikasi untuk Estimasi Error, Randomisasi untuk Menghapus Bias, Blocking untuk Mengontrol Gangguan.
  - *Lesson 4.5.3:* Desain Acak Lengkap (Completely Randomized Design - CRD).
  - *Lesson 4.5.4:* Penentuan Jumlah Replikasi Berdasarkan Analisis Power Eksperimen.

#### CH-29: Full Factorial Experiments ($2^k$ Designs)
- **Prerequisites:** CH-28.
- **Competency Mappings:** COMP-EXP-02.
- **Mathematical Foundations:** Kalkulus kontras efek faktor, model regresi ortogonal desain $2^k$.
- **Lessons:**
  - *Lesson 4.6.1:* Arsitektur Desain Faktorial Penuh $2^k$: Level Tinggi (+) dan Level Rendah (-).
  - *Lesson 4.6.2:* Perhitungan Matematis Efek Utama (*Main Effects*) dan Efek Interaksi 2-Faktor.
  - *Lesson 4.6.3:* Analisis Interaksi 3-Faktor dan Plot Interaksi Dua Arah.
  - *Lesson 4.6.4:* Analisis ANOVA untuk Desain Faktorial $2^k$ dan Model Prediktif Empiris.

#### CH-30: Fractional Factorial & Screening Designs ($2^{k-p}$)
- **Prerequisites:** CH-29.
- **Competency Mappings:** COMP-EXP-02.
- **Mathematical Foundations:** Generator relasi, kata identitas ($I$), struktur aliasing / confounding, resolusi desain (III, IV, V).
- **Lessons:**
  - *Lesson 4.7.1:* Rasionalisasi Faktorial Fraksional: Prinsip Sparsity of Effects.
  - *Lesson 4.7.2:* Konstruksi Desain $2^{k-p}$: Relasi Generator dan Struktur Aliasing (Confounding).
  - *Lesson 4.7.3:* Resolusi Desain: Resolusi III (Screening Kasar), IV (Bebas Interaksi Utama), dan V.
  - *Lesson 4.7.4:* Metodologi Screening Parameter Proses Manufaktur dan Simulasi Komputasi.

#### CH-31: Advanced Blocking, Latin Squares & Response Surface Methodology
- **Prerequisites:** CH-29, CH-30.
- **Competency Mappings:** COMP-EXP-02.
- **Mathematical Foundations:** Model Latin Square, Desain Komposit Pusat (CCD), persamaan polinomial orde-2 RSM.
- **Lessons:**
  - *Lesson 4.8.1:* Randomized Complete Block Design (RCBD) dan Incomplete Block Design.
  - *Lesson 4.8.2:* Latin Square dan Graeco-Latin Square untuk Mengontrol Dua Variabel Gangguan Simultan.
  - *Lesson 4.8.3:* Desain Split-Plot untuk Faktor yang Sulit Diubah (*Hard-to-Change Factors*).
  - *Lesson 4.8.4:* Pengantar Response Surface Methodology (RSM): Optimasi Proses Orde-2 via Central Composite Design (CCD).

```
================================================================================
LEVEL 5: COMPUTATIONAL VALIDATION, ML RIGOR & BENCHMARKING
Validasi model komputasi, pencegahan kebocoran data, pembandingan algoritma, dan studi ablasi.
================================================================================
```

### Section 5.1: Empirical Validation & Benchmarking

#### CH-32: Data Leakage Forensics & Validation Architectures
- **Prerequisites:** CH-08, CH-16.
- **Competency Mappings:** COMP-IND-02.
- **Mathematical Foundations:** Pemisahan partisi data formal: $D_{\text{train}} \cap D_{\text{val}} \cap D_{\text{test}} = \emptyset$.
- **Lessons:**
  - *Lesson 5.1.1:* Taksonomi Kebocoran Data (Data Leakage): Fitur, Temporal, dan Sampel Berulang.
  - *Lesson 5.1.2:* Kebocoran Pra-Pemrosesan: Penskalaan Fitur dan Seleksi Atribut di Luar Loop Validasi Silang.
  - *Lesson 5.1.3:* Skema Partisi Ketat: Stratified K-Fold, GroupKFold, dan TimeSeriesSplit.
  - *Lesson 5.1.4:* Nested Cross-Validation untuk Evaluasi Performa yang Tidak Bias terhadap Tuning Hyperparameter.

#### CH-33: Rigorous Baseline Selection & Comparative Benchmarking
- **Prerequisites:** CH-05, CH-32.
- **Competency Mappings:** COMP-IND-02.
- **Mathematical Foundations:** Metrik evaluasi multivariat dan standardisasi lingkungan uji.
- **Lessons:**
  - *Lesson 5.2.1:* Kriteria Pemilihan Baseline Pembanding yang Kredibel dan Terkini (Bukan Toy Baselines).
  - *Lesson 5.2.2:* Masalah Kontaminasi Data Benchmark Publik (*Benchmark Overfitting*).
  - *Lesson 5.2.3:* Standardisasi Metrik Evaluasi Kinerja (Akurasi, F1, Latensi, Efisiensi Energi).
  - *Lesson 5.2.4:* Protokol Pelaksanaan Benchmark Komputasi yang Adil dan Terkontrol.

#### CH-34: Statistical Comparison of Algorithms & Multi-Dataset Evaluation
- **Prerequisites:** CH-22, CH-33.
- **Competency Mappings:** COMP-IND-02.
- **Mathematical Foundations:** Uji peringkat berperingkat Friedman dan uji post-hoc Nemenyi:

$$\text{CD} = q_\alpha \sqrt{\frac{k(k+1)}{6N}}$$

- **Lessons:**
  - *Lesson 5.3.1:* Kesalahan Metodologis Uji t Berpasangan pada Evaluasi Multi-Dataset (Demšar, 2006).
  - *Lesson 5.3.2:* Uji Non-Parametrik Multi-Algoritma: Friedman Test dan Iman-Davenport Correction.
  - *Lesson 5.3.3:* Analisis Post-Hoc: Nemenyi Test, Bonferroni-Dunn, dan Wilcoxon Signed-Rank dengan Koreksi FDR.
  - *Lesson 5.3.4:* Pembuatan Diagram Perbedaan Kritis (*Critical Difference Diagrams*) Berstandar Publikasi.

#### CH-35: Systematic Component Ablation Study Design
- **Prerequisites:** CH-29, CH-33.
- **Competency Mappings:** COMP-IND-02.
- **Mathematical Foundations:** Matriks pengujian ablasi kombinatorial $2^k$.
- **Lessons:**
  - *Lesson 5.4.1:* Tujuan Studi Ablasi: Membuktikan Kausalitas Kontribusi Tiap Modul Algoritma.
  - *Lesson 5.4.2:* Desain Matriks Ablasi Kombinatorial: Uji Modul Secara Terisolasi dan Terintegrasi.
  - *Lesson 5.4.3:* Analisis Nilai Tambah Marjinal dan Trade-off Kompleksitas Komputasi.
  - *Lesson 5.4.4:* Taksonomi Kasus Kegagalan (*Failure Case Forensics*) dari Variasi Varian Ablasi.

### Section 5.2: Sensitivity, Robustness & Generalizability

#### CH-36: Algorithmic Robustness & Out-of-Distribution Evaluation
- **Prerequisites:** CH-32, CH-35.
- **Competency Mappings:** COMP-IND-02.
- **Mathematical Foundations:** Metrik pergeseran distribusi: Kullback-Leibler (KL) Divergence dan Wasserstein Distance.
- **Lessons:**
  - *Lesson 5.5.1:* Konsep Pergeseran Domain: Covariate Shift, Label Shift, dan Concept Drift.
  - *Lesson 5.5.2:* Pengujian Ketahanan (*Stress Testing*) Terhadap Noise, Blur, dan Gangguan Sinyal.
  - *Lesson 5.5.3:* Evaluasi Out-of-Distribution (OOD) untuk Menilai Batas Keabsahan Algoritma.
  - *Lesson 5.5.4:* Analisis Kasus Batas (*Corner Cases*) dan Estimasi Batas Kegagalan Sistem.

#### CH-37: Hyperparameter Tuning, Optimization & Random Seed Sensitivity
- **Prerequisites:** CH-32, CH-33.
- **Competency Mappings:** COMP-IND-02.
- **Mathematical Foundations:** Optimasi Bayesian berbasis Gaussian Process, distribusi empiris performa multi-seed.
- **Lessons:**
  - *Lesson 5.6.1:* Strategi Optimasi Hyperparameter: Grid Search, Random Search, dan Bayesian Optimization.
  - *Lesson 5.6.2:* Sensitivitas terhadap Random Seeds: Mengapa Klaim Keunggulan Berbasis Single Run Tidak Sah.
  - *Lesson 5.6.3:* Evaluasi Sebaran Kinerja Multi-Seed (10+ Iterasi Acak) dengan Interval Kepercayaan.
  - *Lesson 5.6.4:* Pelaporan Anggaran Komputasi (Compute Budget) dan Efisiensi Karbon/Daya.

```
================================================================================
LEVEL 6: ADVANCED INFERENTIAL, CAUSAL & COMPUTATIONAL METHODS
Inferensi Bayesian MCMC, komputasi numerik, UQ, analisis sensitivitas Sobol, dan kausalitas Pearl.
================================================================================
```

### Section 6.1: Resampling, Bayesian & Numerical Methods

#### CH-38: Bootstrap & Resampling Foundations
- **Prerequisites:** CH-18, CH-20.
- **Competency Mappings:** COMP-EXP-04.
- **Mathematical Foundations:** Prinsip plug-in Efron, bootstrap percentile CI, Bias-Corrected and Accelerated (BCa) bootstrap.
- **Lessons:**
  - *Lesson 6.1.1:* Prinsip Plug-In Efron: Menggunakan Distribusi Sampel Empiris sebagai Pengganti Populasi.
  - *Lesson 6.1.2:* Nonparametric Bootstrap vs Parametric Bootstrap: Prosedur Algoritmik.
  - *Lesson 6.1.3:* Konstruksi Interval Kepercayaan: Metode Persentil vs Metode BCa yang Terkoreksi Bias.
  - *Lesson 6.1.4:* Resampling untuk Estimasi Parameter Non-Linier dan Rasio Kompleks.

#### CH-39: Bayesian Statistical Analysis & MCMC Simulation
- **Prerequisites:** CH-17, CH-18.
- **Competency Mappings:** COMP-DOC-02.
- **Mathematical Foundations:** Teorema Bayes: $P(\theta|D) = \frac{P(D|\theta) P(\theta)}{P(D)}$, sampling Markov Chain Monte Carlo (MCMC).
- **Lessons:**
  - *Lesson 6.2.1:* Paradigma Bayesian: Prior Distribution, Likelihood Function, dan Posterior Distribution.
  - *Lesson 6.2.2:* Pemilihan Prior: Conjugate Priors, Uninformative Priors, dan Informative Priors.
  - *Lesson 6.2.3:* Sampling MCMC: Algoritma Metropolis-Hastings, Gibbs Sampling, dan NUTS via PyMC.
  - *Lesson 6.2.4:* Interval Kredibel Bayesian (Highest Posterior Density - HPD) vs Frequentist Confidence Interval.

#### CH-40: Scientific Computing, Conditioning & Numerical Stability
- **Prerequisites:** CH-24, CH-37.
- **Competency Mappings:** COMP-IND-01.
- **Mathematical Foundations:** Aritmatika IEEE 754, bilangan kondisi matriks $\kappa(\mathbf{A}) = \|\mathbf{A}\| \|\mathbf{A}^{-1}\|$, profil performa Dolan-Moré.
- **Lessons:**
  - *Lesson 6.3.1:* Standar Aritmatika Floating-Point IEEE 754: Error Pembulatan dan Pembatalan Katastropik.
  - *Lesson 6.3.2:* Kondisi Matriks dan Kestabilan Numerik Inversi Matriks pada Algoritma Rekayasa.
  - *Lesson 6.3.3:* Verifikasi dan Validasi Kode Numerik (Order of Accuracy Verification).
  - *Lesson 6.3.4:* Pembuatan Profil Kinerja Algoritma Menggunakan Dolan-Moré Performance Profiles.

### Section 6.2: Uncertainty Quantification & Causal Science

#### CH-41: Uncertainty Quantification (UQ) & Conformal Prediction
- **Prerequisites:** CH-11, CH-39.
- **Competency Mappings:** COMP-DOC-02.
- **Mathematical Foundations:** Dikotomi aleatoric vs epistemic, algoritma Conformal Prediction split untuk jaminan cakupan finit: $1 - \alpha$.
- **Lessons:**
  - *Lesson 6.4.1:* Taksonomi Ketidakpastian: Ketidakpastian Aleatorik (Stokastik) vs Epistemik (Pengetahuan).
  - *Lesson 6.4.2:* Perambatan Ketidakpastian Berbasis Simulasi Monte Carlo pada Sistem Non-Linier.
  - *Lesson 6.4.3:* Emulasi Komputasi Menggunakan Gaussian Process Regression untuk Sistem Berbiaya Tinggi.
  - *Lesson 6.4.4:* Conformal Prediction: Pembangkitan Interval Prediksi Bebas Distribusi dengan Jaminan Cakupan Riil.

#### CH-42: Global Sensitivity Analysis & Variance Decomposition
- **Prerequisites:** CH-41.
- **Competency Mappings:** COMP-DOC-02.
- **Mathematical Foundations:** Dekomposisi varians ortogonal Sobol (Main effect index $S_i$ dan Total effect index $S_{Ti}$).
- **Lessons:**
  - *Lesson 6.5.1:* Perbedaan Mendasar Analisis Sensitivitas Lokal (Derivatif) vs Global (Berbasis Varians).
  - *Lesson 6.5.2:* Metode Screening Morris: Mengidentifikasi Faktor Tak Penting pada Dimensi Tinggi.
  - *Lesson 6.5.3:* Dekomposisi Varians Sobol: Perhitungan Indeks Efek Utama ($S_i$) dan Efek Total ($S_{Ti}$).
  - *Lesson 6.5.4:* Eksekusi Analisis Sensitivitas Model Simulasi Menggunakan Pustaka Python `SALib`.

#### CH-43: Causal Inference & Structural Causal Models
- **Prerequisites:** CH-06, CH-24.
- **Competency Mappings:** COMP-DOC-03.
- **Mathematical Foundations:** Rubin Causal Model (Potential Outcomes $Y(1), Y(0)$), Pearl's Structural Causal Models (SCM), d-separation, Backdoor Criterion, Frontdoor Criterion.
- **Lessons:**
  - *Lesson 6.6.1:* Korelasi vs Kausalitas: Mengapa Regresi Multivariat Bukan Bukti Kausalitas.
  - *Lesson 6.6.2:* Kerangka Potential Outcomes Rubin: Average Treatment Effect (ATE) dan Counterfactuals.
  - *Lesson 6.6.3:* Graf Kausal Pearl (SCMs): Kriteria d-separation, Bias Perancu (*Confounder*), dan Bias Kolider (*Collider*).
  - *Lesson 6.6.4:* Pengendalian Kovariat: Backdoor Criterion dan Propensity Score Matching (PSM).

#### CH-44: Longitudinal & Time-Series Experimental Analysis
- **Prerequisites:** CH-24, CH-27.
- **Competency Mappings:** COMP-EXP-03.
- **Mathematical Foundations:** Autocorrelation Function (ACF), Partial ACF (PACF), Uji Stasioneritas Augmented Dickey-Fuller (ADF).
- **Lessons:**
  - *Lesson 6.7.1:* Karakteristik Data Eksperimen Longitudinal dan Korelasi Temporal.
  - *Lesson 6.7.2:* Uji Stasioneritas, Trend, dan Musiman pada Data Sinyal/Sensor Rekayasa.
  - *Lesson 6.7.3:* Model Autoregressive Eksplanatori (ARMAX) untuk Evaluasi Eksperimen Time-Series.
  - *Lesson 6.7.4:* Pengantar State-Space Modeling dan Kalman Filter dalam Kerangka Pengukuran Dinamis.

```
================================================================================
LEVEL 7: RESEARCH SOFTWARE ENGINEERING, REPRODUCIBILITY & PUBLICATION
Rekayasa perangkat lunak riset, kontainerisasi, penulisan ilmiah IMRaD, peer review, dan roadmap PhD.
================================================================================
```

### Section 7.1: Research Software Engineering & Reproducibility

#### CH-45: Research Software Engineering (RSE) Principles
- **Prerequisites:** CH-14, CH-40.
- **Competency Mappings:** COMP-IND-01.
- **Mathematical Foundations:** Standar modularitas fungsional dan pengujian batas numerik.
- **Lessons:**
  - *Lesson 7.1.1:* Prinsip RSE: Mengapa Skrip Riset Kriptik Sekali-Pakai Berbahaya bagi Sains.
  - *Lesson 7.1.2:* Modularitas Kode Ilmiah: Memisahkan Logika Matematika, Data Pipeline, dan Visualisasi.
  - *Lesson 7.1.3:* Pengujian Unit (*Unit Testing*) untuk Model Matematika Menggunakan `pytest`.
  - *Lesson 7.1.4:* Dokumentasi Kode Otomatis dan Standar Docstrings Standar Ilmiah.

#### CH-46: Computational Reproducibility & Environment Virtualization
- **Prerequisites:** CH-45.
- **Competency Mappings:** COMP-IND-01.
- **Mathematical Foundations:** Kriptografi hash digest untuk locking manifest dependensi.
- **Lessons:**
  - *Lesson 7.2.1:* Krisis Replikasi Komputasi: Mengapa "It Works on My Machine" Ditolak Sains Modern.
  - *Lesson 7.2.2:* Manajemen Dependensi Terkunci Menggunakan Virtual Environments dan Lockfiles.
  - *Lesson 7.2.3:* Kontainerisasi Eksperimen Ilmiah Menggunakan Docker untuk Isolasi Penuh.
  - *Lesson 7.2.4:* Pembangunan Pipeline Eksekusi 1-Klik (*One-Click Reproducible Pipeline*) via Makefile.

#### CH-47: Electronic Lab Notebooks & Provenance Tracking
- **Prerequisites:** CH-07, CH-14.
- **Competency Mappings:** COMP-FND-05, COMP-IND-01.
- **Mathematical Foundations:** Struktur graf silsilah data W3C PROV: Entity $\to$ Activity $\to$ Agent.
- **Lessons:**
  - *Lesson 7.3.1:* Standar Electronic Lab Notebooks (ELN) untuk Pencatatan Audit Riset Forensik.
  - *Lesson 7.3.2:* Implementasi Model Silsilah Data W3C PROV untuk Melacak Transformasi Data Mentah.
  - *Lesson 7.3.3:* Pengelolaan Repositori Riset Terbuka Menggunakan Open Science Framework (OSF) dan Zenodo.
  - *Lesson 7.3.4:* Pemilihan Lisensi Terbuka: Perbedaan Lisensi Kode (MIT, Apache 2.0) vs Lisensi Data (CC-BY).

### Section 7.2: Scientific Communication & Scholarly Career

#### CH-48: Scientific Writing & Claims-to-Evidence Architecture
- **Prerequisites:** CH-05, CH-23, CH-35.
- **Competency Mappings:** COMP-IND-03.
- **Mathematical Foundations:** Matriks korespondensi bijektif antara himpunan klaim dan himpunan bukti empiris: $f: \text{Claims} \to \text{Evidence}$.
- **Lessons:**
  - *Lesson 7.4.1:* Arsitektur Naskah IMRaD: Alur Narasi Ilmiah dari Masalah ke Solusi.
  - *Lesson 7.4.2:* Swales CARS Model: Tiga Gerakan Retoris (*Rhetorical Moves*) dalam Menulis Pendahuluan.
  - *Lesson 7.4.3:* Pemetaan Klaim-ke-Bukti (*Claims-to-Evidence Mapping*): Mengeliminasi Pernyataan Tanpa Data.
  - *Lesson 7.4.4:* Penulisan Pembahasan (Discussion): Menempatkan Hasil dalam Konteks Literatur Global.

#### CH-49: Journal Selection, Peer Review & Rebuttal Engineering
- **Prerequisites:** CH-48.
- **Competency Mappings:** COMP-IND-04.
- **Mathematical Foundations:** Perhitungan metrik bibliometrik formal (CiteScore, SNIP, Journal Impact Factor).
- **Lessons:**
  - *Lesson 7.5.1:* Matriks Pemilihan Jurnal Target: Menghindari Jurnal Predator dan Menilai Ruang Lingkup.
  - *Lesson 7.5.2:* Anatomi Proses Peer-Review Editorial: Single-Blind, Double-Blind, dan Open Peer Review.
  - *Lesson 7.5.3:* Konstruksi Point-by-Point Rebuttal Matrix: Merespons Masukan Kritis secara Objektif.
  - *Lesson 7.5.4:* Manajemen Revisi Naskah Ilmiah dan Korespondensi Etis dengan Editor.

#### CH-50: Multi-Year Research Programme & Doctoral Roadmap
- **Prerequisites:** CH-05, CH-48, CH-49.
- **Competency Mappings:** COMP-DOC-01, COMP-DOC-04.
- **Mathematical Foundations:** Analisis Jalur Kritis (Critical Path Method - CPM) pada matriks dekomposisi proyek riset.
- **Lessons:**
  - *Lesson 7.6.1:* Arsitektur Riset Doktoral: Strategi Disertasi Berbasis Publikasi (*Thesis-by-Publication*).
  - *Lesson 7.6.2:* Dekomposisi Payung Riset Besar Menjadi Tiga Proyek Mandiri yang Koheren.
  - *Lesson 7.6.3:* Penyusunan Peta Jalan 3-4 Tahun (PhD Roadmap) dengan Kriteria Terminasi Dini (*Kill Criteria*).
  - *Lesson 7.6.4:* Manajemen Kolaborasi, Pembimbingan Ilmiah, dan Formulasi Proposal Hibah Penelitian.

#### CH-51: Capstone Project: End-to-End Reproducible Research Package
- **Prerequisites:** Seluruh CH-01 s.d. CH-50 (Integrasi Puncak).
- **Competency Mappings:** Sintesis Menyeluruh (COMP-FND s.d. COMP-DOC).
- **Mathematical Foundations:** Evaluasi kelengkapan artefak sesuai standar ACM Artifact Evaluation.
- **Lessons:**
  - *Lesson 7.7.1:* Perancangan Proyek Riset Lengkap: Dari Rumusan Pertanyaan hingga Desain Uji.
  - *Lesson 7.7.2:* Eksekusi Eksperimen Terkalibrasi dan Pengumpulan Data Terverifikasi Hash.
  - *Lesson 7.7.3:* Analisis Statistik Inferensial, Efek Ukuran, dan Studi Ablasi Multi-Komponen.
  - *Lesson 7.7.4:* Pengemasan Paket Publikasi Akhir: Naskah LaTeX, Docker Environment, dan Repositori Terbuka.
