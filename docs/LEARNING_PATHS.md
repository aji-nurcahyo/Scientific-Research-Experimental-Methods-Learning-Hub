# LEARNING PATH ARCHITECTURE
## Scientific Research & Experimental Methods Learning Hub
### Institut Teknologi Sumatera (ITERA)

> **Dokumen Status:** Proposed Baseline v2.0  
> **Klasifikasi:** Outcome-Based Pedagogical Trajectories  
> **Penyusun:** Aji Pamungkas Tri Nurcahyo  
> **Tanggal:** 22 November 2026

---

## 1. KONSEP DAN STRUKTUR LEARNING PATH

Learning Path bukanlah silabus terpisah yang menduplikasi isi kurikulum, melainkan **jalur lintasan pembelajaran terarah** yang menggunakan kembali materi dari 51 Chapter Master Curriculum. Setiap Learning Path disusun untuk menjawab kebutuhan spesifik profil pembelajar dengan merangkai chapter wajib, chapter pilihan, penugasan praktis, dan luaran terukur (*assessable deliverables*).

Kurikulum ini menyediakan 10 Learning Paths yang dikelompokkan ke dalam 3 klaster pengguna utama:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ KLASTER 1: UNDERGRADUATE RESEARCH (MAHASISWA S1)                        │
│ - LP-01: Undergraduate Thesis & Capstone Research Path                 │
├─────────────────────────────────────────────────────────────────────────┤
│ KLASTER 2: ADVANCED ENGINEERING & SPECIALIZED EXPERIMENTS               │
│ - LP-02: Engineering Experimental & Physical Metrology Path             │
│ - LP-03: Statistical Modeling & Data Analysis Path                      │
│ - LP-04: AI & Machine Learning Research Methodology Path                │
│ - LP-05: Computer Vision Research Methodology Path                      │
│ - LP-06: Signal Processing & Sensing Experiments Path                   │
│ - LP-07: Remote Sensing & Geospatial Intelligence Research Path         │
├─────────────────────────────────────────────────────────────────────────┤
│ KLASTER 3: REPRODUCIBILITY, PUBLICATION & PHD PREPARATION               │
│ - LP-08: Reproducible Computational Research & RSE Path                 │
│ - LP-09: Scientific Publication & Scholarly Communication Path          │
│ - LP-10: Doctoral Research Preparation & Epistemic Leadership Path      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. SPESIFIKASI 10 LEARNING PATHS

### LP-01: Undergraduate Thesis & Capstone Research Path
- **Target Audience:** Mahasiswa program sarjana (S1) yang sedang menyusun proposal, mengeksekusi penelitian laboratorium/komputasi Tugas Akhir, atau Capstone Design Project di ITERA.
- **Entry Requirements:** Pemahaman dasar aljabar linier dan kemampuan pemrograman dasar tingkat satu.
- **Required Competencies:** COMP-FND-01 s.d. COMP-FND-05, COMP-APP-01 s.d. COMP-APP-05, COMP-IND-03.
- **Required Chapters:** CH-01, CH-02, CH-03, CH-05, CH-06, CH-07, CH-08, CH-09, CH-10, CH-12, CH-14, CH-15, CH-16, CH-19, CH-20, CH-23, CH-48.
- **Optional Chapters:** CH-04 (jika studi literatur mendalam), CH-11 (jika berbasis sensor fisik), CH-24 (jika memodelkan hubungan linier), CH-49 (jika menargetkan publikasi jurnal).
- **Practical Assignments:**
  1. Menyusun Problem Scoping Matrix dan Research Alignment Matrix.
  2. Melakukan audit PRISMA 2020 terhadap minimal 15 artikel bereputasi.
  3. Menjalankan analisis EDA, uji hipotesis komparatif, dan perhitungan Cohen's d pada data Tugas Akhir.
  4. Menyusun naskah draft proposal atau draf artikel IMRaD lengkap.
- **Final Learning Outcomes:** Mampu merancang eksperimen Tugas Akhir yang bebas bias, menganalisis data empiris dengan inferensi statistik yang valid, dan menyusun laporan ilmiah yang memenuhi integritas akademik.
- **Assessable Deliverables:** Dokumen Proposal Tugas Akhir / Capstone lengkap dan Repositori Data Eksperimen terverifikasi.

---

### LP-02: Engineering Experimental & Physical Metrology Path
- **Target Audience:** Dosen, asisten laboratorium, dan mahasiswa tingkat akhir yang menjalankan eksperimen pada rig uji fisik, sistem mekanik, sensorik, atau instrumen elektronika.
- **Entry Requirements:** Dasar kalkulus multivariabel dan fisika eksperimental.
- **Required Competencies:** COMP-APP-01, COMP-APP-02, COMP-EXP-01, COMP-EXP-02, COMP-EXP-03.
- **Required Chapters:** CH-08, CH-09, CH-10, CH-11, CH-12, CH-13, CH-16, CH-19, CH-20, CH-23, CH-24, CH-26, CH-28, CH-29, CH-30, CH-31, CH-48.
- **Optional Chapters:** CH-25 (jika respon biner/cacah), CH-27 (jika nested batch varians), CH-41 (jika UQ non-linier tinggi).
- **Practical Assignments:**
  1. Mengkalibrasi sensor fisik dan membangun kurva kalibrasi tertelusur SI.
  2. Menyusun tabel Uncertainty Budget berstandar GUM Type A & B.
  3. Merancang dan menganalisis eksperimen faktorial $2^k$ untuk optimasi parameter proses fisik.
- **Final Learning Outcomes:** Mampu merancang rig pengujian fisik terkontrol, mengkuantifikasi ketidakpastian instrumen sesuai standar internasional GUM, dan mengoptimalkan parameter eksperimen via DoE.
- **Assessable Deliverables:** Laporan Evaluasi Ketidakpastian Pengukuran GUM dan Rancangan DoE Faktorial lengkap dengan analisis ANOVA.

---

### LP-03: Statistical Modeling & Data Analysis Path
- **Target Audience:** Peneliti data kuantitatif, analis data rekayasa, dan akademisi yang berfokus pada pemodelan statistik inferensial mendalam.
- **Entry Requirements:** Aljabar matriks dan kalkulus probabilitas.
- **Required Competencies:** COMP-APP-04, COMP-APP-05, COMP-EXP-02, COMP-EXP-03, COMP-EXP-04, COMP-DOC-02.
- **Required Chapters:** CH-16, CH-17, CH-18, CH-19, CH-20, CH-21, CH-22, CH-23, CH-24, CH-25, CH-26, CH-27, CH-38, CH-39, CH-44.
- **Optional Chapters:** CH-28, CH-29 (DoE), CH-42 (Sensitivity), CH-43 (Causal Inference).
- **Practical Assignments:**
  1. Menjalankan 4-panel regression diagnostics dan mengatasi pelanggaran asumsi Gauss-Markov.
  2. Membangun Generalized Linear Mixed Model (GLMM) untuk data pengukuran berulang.
  3. Mengonstruksi bootstrap confidence intervals (BCa) dan koreksi False Discovery Rate (FDR).
- **Final Learning Outcomes:** Mampu membangun dan mengevaluasi model linier, GLM, dan mixed-effects, serta menerapkan inferensi parametrik dan non-parametrik yang tahan outlier.
- **Assessable Deliverables:** Notebook Analisis Pemodelan Statistik Komprehensif dengan diagnostik residual lengkap.

---

### LP-04: AI & Machine Learning Research Methodology Path
- **Target Audience:** Peneliti dan mahasiswa yang mengembangkan, memodifikasi, atau mengevaluasi model machine learning dan deep learning untuk aplikasi rekayasa.
- **Entry Requirements:** Pemrograman Python tingkat lanjut dan konsep dasar machine learning.
- **Required Competencies:** COMP-IND-01, COMP-IND-02, COMP-EXP-04, COMP-DOC-02.
- **Required Chapters:** CH-05, CH-14, CH-16, CH-19, CH-20, CH-21, CH-22, CH-32, CH-33, CH-34, CH-35, CH-36, CH-37, CH-40, CH-41, CH-46, CH-48.
- **Optional Chapters:** CH-38 (Bootstrap), CH-39 (Bayesian), CH-42 (Sobol), CH-45 (RSE).
- **Practical Assignments:**
  1. Melakukan audit kebocoran data (*data leakage forensic*) pada pipeline ML eksisting.
  2. Menjalankan benchmark multi-dataset menggunakan uji Friedman dan menghasilkan Critical Difference Diagram.
  3. Merancang matriks studi ablasi sistematis untuk membongkar kontribusi modul arsitektur baru.
- **Final Learning Outcomes:** Mampu merancang evaluasi model AI yang bebas dari data leakage, membandingkan performa algoritma secara statistik ketat, dan membuktikan novelty melalui studi ablasi.
- **Assessable Deliverables:** Laporan Benchmark Komparatif Algoritma berstandar naskah konferensi tier-1 (NeurIPS/ICLR/CVPR format).

---

### LP-05: Computer Vision Research Methodology Path
- **Target Audience:** Peneliti bidang visi komputer (fokus kepakaran utama creator), mencakup deteksi objek, segmentasi, tracking, dan pengenalan citra biomedis/rekayasa.
- **Entry Requirements:** Pengolahan citra digital dan deep learning untuk visi komputer.
- **Required Competencies:** COMP-IND-01, COMP-IND-02, COMP-EXP-04, COMP-APP-02.
- **Required Chapters:** CH-05, CH-09, CH-12, CH-14, CH-16, CH-20, CH-32, CH-33, CH-34, CH-35, CH-36, CH-37, CH-40, CH-46, CH-48.
- **Optional Chapters:** CH-11 (jika kalibrasi kamera fisik), CH-41 (UQ pada segmentasi), CH-43 (Causal CV).
- **Practical Assignments:**
  1. Mengkalibrasi kesepakatan anotasi bounding box antar-annotator menggunakan Fleiss' Kappa.
  2. Mengevaluasi trade-off mAP@IoU[0.5:0.95] vs latency pada berbagai variasi resolusi input.
  3. Menguji ketahanan model deteksi terhadap degradasi visual (blur, sensor noise, cuaca buruk) dan domain shift.
- **Final Learning Outcomes:** Mampu mengevaluasi performa sistem visi komputer menggunakan metrik terstandarisasi, membuktikan ketahanan out-of-distribution, dan merancang benchmark visi yang dapat direproduksi.
- **Assessable Deliverables:** Laporan Metodologi Riset Computer Vision lengkap dengan matriks evaluasi mAP, kurva PR, dan failure case taxonomy.

---

### LP-06: Signal Processing & Sensing Experiments Path
- **Target Audience:** Peneliti bidang pemrosesan sinyal digital, sensor IoT, instrumentasi telemetri, dan analisis getaran/akustik.
- **Entry Requirements:** Analisis sinyal dan sistem linier, transformasi Fourier.
- **Required Competencies:** COMP-EXP-01, COMP-EXP-03, COMP-APP-02, COMP-APP-04.
- **Required Chapters:** CH-09, CH-10, CH-11, CH-12, CH-16, CH-17, CH-18, CH-20, CH-23, CH-24, CH-27, CH-40, CH-41, CH-44, CH-48.
- **Optional Chapters:** CH-32 (jika sinyal dianalisis ML), CH-39 (Bayesian filtering), CH-42 (Sensitivitas).
- **Practical Assignments:**
  1. Menentukan rasio Signal-to-Noise (SNR) dan batas estimasi varians fisik (CRLB).
  2. Menganalisis autokorelasi temporal dan stasioneritas sinyal sensor menggunakan ADF test.
  3. Memvalidasi akurasi filter estimasi sinyal terhadap gangguan artefak lingkungan.
- **Final Learning Outcomes:** Mampu merancang akuisisi sinyal yang bebas aliasing, mengkalibrasi sensor dinamis, dan memvalidasi keandalan filter estimasi pada kondisi bising.
- **Assessable Deliverables:** Laporan Eksperimen Pemrosesan Sinyal dengan analisis SNR, spektrum frekuensi, dan evaluasi ketidakpastian dinamis.

---

### LP-07: Remote Sensing & Geospatial Intelligence Research Path
- **Target Audience:** Peneliti penginderaan jauh, sistem informasi geografis (SIG), pemetaan drone, dan analisis citra satelit multispektral di ITERA.
- **Entry Requirements:** Dasar fotogrametri, penginderaan jauh, dan perangkat lunak spasial (QGIS/GDAL).
- **Required Competencies:** COMP-APP-01, COMP-APP-03, COMP-IND-02, COMP-EXP-04.
- **Required Chapters:** CH-08, CH-09, CH-10, CH-11, CH-12, CH-14, CH-16, CH-19, CH-20, CH-23, CH-32, CH-33, CH-34, CH-36, CH-48.
- **Optional Chapters:** CH-25 (klasifikasi tutupan lahan), CH-41 (UQ spasial), CH-42 (sensitivitas parameter atmosferik).
- **Practical Assignments:**
  1. Menghitung autokorelasi spasial (Moran's I) untuk membuktikan dependensi spasial unit sampel.
  2. Merancang protokol Spatial Cross-Validation berbasis buffer spasial untuk mencegah *spatial data leakage*.
  3. Membangun matriks kontingensi akurasi tematik dan mengevaluasi batasan koefisien Kappa vs Overall Accuracy.
- **Final Learning Outcomes:** Mampu merancang sampling geografis yang valid, mengisolasi kebocoran spasial pada pemodelan prediksi bumi, dan mengevaluasi akurasi tematik citra secara akurat.
- **Assessable Deliverables:** Laporan Validasi Akurasi Penginderaan Jauh dengan peta galat spasial dan protokol spatial cross-validation.

---

### LP-08: Reproducible Computational Research & RSE Path
- **Target Audience:** Software engineers in research, computational scientists, dan calon mahasiswa doktoral yang ingin memastikan seluruh output komputasinya terbebas dari krisis replikasi.
- **Entry Requirements:** Kemampuan Linux/Bash, Git, dan Python tingkat menengah.
- **Required Competencies:** COMP-FND-05, COMP-IND-01, COMP-IND-02.
- **Required Chapters:** CH-07, CH-13, CH-14, CH-24, CH-32, CH-37, CH-40, CH-45, CH-46, CH-47, CH-51.
- **Optional Chapters:** CH-33 (Benchmarking), CH-48 (Writing).
- **Practical Assignments:**
  1. Mengemas kode riset ke dalam modul Python teruji unit menggunakan `pytest`.
  2. Membangun Dockerfile terisolasi yang mengunci seluruh dependensi komputasi dan driver CUDA.
  3. Merancang pipeline otomatis 1-klik via Makefile yang mereproduksi figur paper dari data mentah.
- **Final Learning Outcomes:** Mampu menerapkan prinsip Research Software Engineering (RSE), mengeliminasi ketergantungan mesin lokal, dan mempublikasikan paket riset komputasi yang lolos audit reproduksibilitas ACM/IEEE.
- **Assessable Deliverables:** Repositori Publik Reproducible Research Bundle (Docker, Makefile, DVC, testing).

---

### LP-09: Scientific Publication & Scholarly Communication Path
- **Target Audience:** Dosen, peneliti, dan mahasiswa pascasarjana yang sedang menyiapkan naskah artikel untuk jurnal internasional bereputasi (Scopus Q1/Q2, IEEE Transactions, Elsevier, Springer).
- **Entry Requirements:** Telah menyelesaikan pengumpulan data dan analisis statistik penelitian.
- **Required Competencies:** COMP-FND-03, COMP-FND-04, COMP-IND-03, COMP-IND-04.
- **Required Chapters:** CH-03, CH-04, CH-05, CH-07, CH-20, CH-23, CH-47, CH-48, CH-49.
- **Optional Chapters:** CH-35 (Ablation), CH-50 (PhD Roadmap).
- **Practical Assignments:**
  1. Menyusun matriks pemetaan Klaim-ke-Bukti (*Claims-to-Evidence Matrix*) untuk seluruh klaim naskah.
  2. Menulis seksi Introduction berbasis Swales CARS model dan seksi Discussion yang kontekstual.
  3. Membangun Point-by-Point Rebuttal Matrix untuk menanggapi simulasi komentar kritis reviewer.
- **Final Learning Outcomes:** Mampu menyusun argumen ilmiah yang koheren, memilih jurnal target yang tepat tanpa terjebak jurnal predator, dan menavigasi proses peer-review hingga artikel dinyatakan accepted.
- **Assessable Deliverables:** Draf naskah artikel ilmiah berformat LaTeX lengkap dengan berkas supplementary material dan rebuttal matrix.

---

### LP-10: Doctoral Research Preparation & Epistemic Leadership Path
- **Target Audience:** Calon mahasiswa S3, peneliti doktoral, dan pimpinan laboratorium riset yang merancang program penelitian jangka panjang yang inovatif dan berdampak global.
- **Entry Requirements:** Telah menyelesaikan jenjang magister (S2) atau sarjana unggul dengan rekam jejak riset kuat.
- **Required Competencies:** COMP-DOC-01 s.d. COMP-DOC-04, COMP-IND-01 s.d. COMP-IND-04.
- **Required Chapters:** CH-01, CH-05, CH-06, CH-15, CH-28, CH-29, CH-30, CH-32, CH-33, CH-34, CH-35, CH-38, CH-39, CH-41, CH-42, CH-43, CH-45, CH-46, CH-48, CH-49, CH-50, CH-51.
- **Optional Chapters:** Seluruh chapter lain sesuai tema domain spesifik disertasi.
- **Practical Assignments:**
  1. Menyusun Doctoral Novelty Manifesto yang mendefinisikan kontribusi terhadap batas keilmuan (*frontier*).
  2. Merumuskan Structural Causal Model (DAG) dan analisis sensitivitas global untuk sistem usulan.
  3. Merancang Strategic PhD 3-Year Research Roadmap berbasis publikasi kumulatif (*thesis-by-publication*).
- **Final Learning Outcomes:** Memiliki kapasitas kepemimpinan ilmiah untuk merumuskan teori baru, mengelola risiko kegagalan eksperimen multi-tahun, dan menghasilkan kontribusi doktoral yang diakui komunitas internasional.
- **Assessable Deliverables:** Proposal Disertasi Doktoral Lengkap dan PhD Strategic 3-Year Roadmap.

