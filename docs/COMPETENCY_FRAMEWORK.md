# RESEARCH COMPETENCY FRAMEWORK
## Scientific Research & Experimental Methods Learning Hub
### Institut Teknologi Sumatera (ITERA)

> **Dokumen Status:** Dokumen Baseline Phase 0 (Reset v2.0)  
> **Klasifikasi:** Competency-Based Academic Blueprint  
> **Penyusun:** Aji Pamungkas Tri Nurcahyo  
> **Tanggal:** 22 November 2026

---

## 1. STRUKTUR DAN TAHAPAN PERKEMBANGAN KOMPETENSI

Kerangka kompetensi ini dibangun untuk memandu perkembangan intelektual dan keterampilan teknis peneliti dari tingkat sarjana pemula hingga peneliti doktoral mandiri. Kerangka ini mengadopsi taksonomi Bloom yang disempurnakan (Revised Bloom's Taxonomy) dan taksonomi keterampilan praktis Miller (Knows $\rightarrow$ Knows How $\rightarrow$ Shows How $\rightarrow$ Does).

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TAHAP V: DOCTORAL & SCIENTIFIC LEADERSHIP (COMP-DOC)                    │
│ - Teori fundamental, novelty formulation, program riset jangka panjang  │
├─────────────────────────────────────────────────────────────────────────┤
│ TAHAP IV: INDEPENDENT & REPRODUCIBLE RESEARCH (COMP-IND)                │
│ - Computational reproducibility, RSE, peer review, scientific writing   │
├─────────────────────────────────────────────────────────────────────────┤
│ TAHAP III: ADVANCED EXPERIMENTAL & METROLOGICAL RIGOR (COMP-EXP)        │
│ - Design of Experiments, GUM uncertainty, multivariable ANOVA, UQ       │
├─────────────────────────────────────────────────────────────────────────┤
│ TAHAP II: APPLIED RESEARCH & EMPIRICAL INVESTIGATION (COMP-APP)         │
│ - Research design, sampling, exploratory data analysis, NHST, regresi   │
├─────────────────────────────────────────────────────────────────────────┤
│ TAHAP I: FOUNDATIONAL SCIENTIFIC THINKING & ETHICS (COMP-FND)           │
│ - Epistemologi, identifikasi problem, PRISMA search, integritas ilmiah  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. SPESIFIKASI DOMAIN KOMPETENSI RISET

### TAHAP I: FOUNDATIONAL SCIENTIFIC THINKING & ETHICS

#### COMP-FND-01: Epistemological Reasoning & Scientific Logic
- **Deskripsi:** Mampu membedakan penalaran induktif, deduktif, dan abduktif; menerapkan prinsip falsifikasi Popperian; dan menentukan paradigma riset yang sesuai dengan masalah rekayasa.
- **Knowledge Requirements:** Silogisme Modus Ponens dan Modus Tollens, kriteria demarkasi sains vs pseudosains, ontologi dan epistemologi positivisme, post-positivisme, dan pragmatisme.
- **Practical Skills:** Mengonstruksi alur penalaran ilmiah dari fenomena empiris menuju hipotesis teruji; memetakan premis dan kesimpulan logis dalam argumen riset.
- **Mathematical Foundations:** Logika proposisional formal: $P \implies Q$, $\neg Q \implies \neg P$.
- **Prerequisites:** Tidak ada (titik masuk dasar).
- **Expected Proficiency (Bloom):** Understand $\rightarrow$ Analyze.
- **Measurable Learning Outcomes:**
  - Mengidentifikasi kecacatan logika (*logical fallacies*) dalam argumentasi teknis.
  - Merumuskan pernyataan hipotesis yang memenuhi syarat keterfalsifikasian (*falsifiability*).
- **Assessment Evidence:** Lembar analisis dekonstruksi klaim ilmiah terhadap 2 artikel rekayasa yang kontradiktif.

#### COMP-FND-02: Research Problem Scoping & Alignment
- **Deskripsi:** Mampu mentranslasikan masalah praktis di industri atau masyarakat menjadi pertanyaan penelitian ilmiah yang terukur menggunakan kriteria FINER dan SMART.
- **Knowledge Requirements:** Struktur pohon masalah (*problem tree*), kriteria FINER (Feasible, Interesting, Novel, Ethical, Relevant), taksonomi tujuan penelitian.
- **Practical Skills:** Menguraikan akar penyebab masalah rekayasa; membatasi ruang lingkup riset; menyusun matriks keselarasan masalah-pertanyaan-tujuan.
- **Mathematical Foundations:** Relasi pemetaan himpunan dan graf terarah pohon masalah $G = (V, E)$.
- **Prerequisites:** COMP-FND-01.
- **Expected Proficiency (Bloom):** Analyze $\rightarrow$ Evaluate.
- **Measurable Learning Outcomes:**
  - Menyusun minimal 3 pertanyaan penelitian turunan dari satu rumusan masalah kompleks.
  - Mengevaluasi kelayakan teknis dan sumber daya menggunakan rubrik FINER.
- **Assessment Evidence:** Dokumen Problem Scoping Matrix yang memetakan akar masalah, pertanyaan riset, dan indikator keberhasilan terukur.

#### COMP-FND-03: Systematic Literature Retrieval & Evidence Synthesis
- **Deskripsi:** Mampu melakukan penelusuran pustaka secara sistematis menggunakan alur PRISMA 2020 dan menyintesis literatur menjadi peta taksonomi keilmuan.
- **Knowledge Requirements:** Aljabar Boolean untuk query pencarian, indeks pangkalan data ilmiah (Scopus, IEEE Xplore, WoS), pedoman PRISMA 2020, teknik snowballing.
- **Practical Skills:** Merancang string pencarian komprehensif dengan wildcard dan operator logika; menyaring naskah berdasarkan kriteria inklusi/eksklusi; menyusun matriks sintesis komparatif.
- **Mathematical Foundations:** Teori himpunan pada operasi Boolean penelusuran: $A \cap (B \cup C) \setminus D$.
- **Prerequisites:** COMP-FND-02.
- **Expected Proficiency (Bloom):** Apply $\rightarrow$ Synthesize.
- **Measurable Learning Outcomes:**
  - Membangun diagram alir PRISMA 2020 lengkap dari tahap identifikasi hingga inklusi naskah.
  - Mengelompokkan minimal 25 artikel primer ke dalam matriks sintesis tematik multi-parameter.
- **Assessment Evidence:** Diagram alir PRISMA terverifikasi dan Matriks Sintesis Literatur komprehensif berformat tabular.

#### COMP-FND-04: Research Gap & Novelty Formulation
- **Deskripsi:** Mampu menemukan celah penelitian (*research gap*) nyata dari literatur terkini dan merumuskan klaim kebaruan (*novelty claim*) yang rasional dan terukur.
- **Knowledge Requirements:** Taksonomi kesenjangan keilmuan: theoretical gap, methodological gap, empirical gap, application gap; konsep state-of-the-art (SOTA).
- **Practical Skills:** Membandingkan keterbatasan solusi yang ada; memformulasi *delta contribution* ($\Delta = \text{Proposed} - \text{SOTA}$); menyusun pernyataan novelty tanpa klaim berlebihan.
- **Mathematical Foundations:** Matriks diferensiasi vektor atribut fitur metode usulan vs baseline.
- **Prerequisites:** COMP-FND-03.
- **Expected Proficiency (Bloom):** Evaluate $\rightarrow$ Create.
- **Measurable Learning Outcomes:**
  - Merumuskan pernyataan kebaruan dalam 1 paragraf terpadu yang memuat basis bukti literatur pendukung.
  - Menunjukkan batas diferensiasi metode usulan terhadap minimal 3 metode pembanding SOTA.
- **Assessment Evidence:** Dokumen Research Gap & Novelty Formulation Report lengkap dengan sitasi pendukung.

#### COMP-FND-05: Research Ethics, Integrity & Provenance
- **Deskripsi:** Mampu menegakkan integritas akademik, mematuhi pedoman etika publikasi COPE, mencegah misconduct, dan mengelola silsilah data riset (*provenance*).
- **Knowledge Requirements:** Pedoman COPE, kriteria kepengarangan ICMJE, definisi fabrikasi, falsifikasi, plagiarisme (FFP), etika penggunaan Generative AI dalam riset, W3C PROV-DM model.
- **Practical Skills:** Memverifikasi orisinalitas naskah; mengelola persetujuan etik (*ethics clearance*); mencatat jejak silsilah modifikasi data mentah; menghitung hash kriptografis berkas eksperimen.
- **Mathematical Foundations:** Fungsi hash kriptografis satu arah (SHA-256) untuk jaminan imutabilitas data: $h = H(M)$.
- **Prerequisites:** COMP-FND-01.
- **Expected Proficiency (Bloom):** Understand $\rightarrow$ Apply $\rightarrow$ Evaluate.
- **Measurable Learning Outcomes:**
  - Mendeteksi indikasi manipulasi data atau penyimpangan kepengarangan pada studi kasus nyata.
  - Membangun skrip verifikasi integritas checksum SHA-256 untuk seluruh dataset eksperimen.
- **Assessment Evidence:** Sertifikat audit integritas data eksperimen dan pernyataan kepatuhan etika riset.

---

### TAHAP II: APPLIED RESEARCH & EMPIRICAL INVESTIGATION

#### COMP-APP-01: Research Design & Validity Framework
- **Deskripsi:** Mampu memilih dan merancang desain penelitian yang selaras dengan pertanyaan riset, serta mengendalikan ancaman terhadap validitas internal dan eksternal.
- **Knowledge Requirements:** Taksonomi desain penelitian Campbell & Stanley (pre-experimental, quasi-experimental, true experimental, observational), validitas konstruk, internal, eksternal, dan statistik.
- **Practical Skills:** Mengidentifikasi variabel independen, dependen, perancu (*confounding*), moderator, dan mediator; merancang perlakuan dan kelompok kontrol; memitigasi efek maturasi, seleksi, dan instrumen.
- **Mathematical Foundations:** Notasi desain eksperimen formal (R, O, X) dan perumusan model linier dasar: $Y = \beta_0 + \beta_1 X + \epsilon$.
- **Prerequisites:** COMP-FND-02, COMP-FND-04.
- **Expected Proficiency (Bloom):** Apply $\rightarrow$ Analyze.
- **Measurable Learning Outcomes:**
  - Mengonstruksi diagram alir desain eksperimen yang mengisolasi variabel perancu utama.
  - Mengklasifikasikan 5 potensi ancaman validitas internal beserta strategi mitigasinya.
- **Assessment Evidence:** Dokumen Experimental Design Plan (EDP) yang memuat skema kontrol perlakuan.

#### COMP-APP-02: Operational Definitions & Measurement Scales
- **Deskripsi:** Mampu menyusun definisi operasional variabel abstrak ke dalam indikator empiris yang terukur dengan skala pengukuran data yang tepat.
- **Knowledge Requirements:** Teori representasional pengukuran (Stevens), 4 skala pengukuran (nominal, ordinal, interval, rasio), sifat matematis yang diizinkan pada tiap skala, validitas isi dan muka.
- **Practical Skills:** Menyusun rubrik dan instrumen pengukuran fisik maupun komputasi; menetapkan batasan operasional variabel; memetakan skala data pada uji statistik yang kompatibel.
- **Mathematical Foundations:** Transformasi skala yang diperbolehkan: transformasi monotonik (ordinal), transformasi linier positif $y = ax + b$ (interval), transformasi kesebandingan $y = ax$ (rasio).
- **Prerequisites:** COMP-APP-01.
- **Expected Proficiency (Bloom):** Apply $\rightarrow$ Analyze.
- **Measurable Learning Outcomes:**
  - Merumuskan definisi operasional untuk 3 variabel kompleks (misal: "efisiensi komputasi", "ketahanan model", "kualitas sinyal").
  - Menentukan operasi matematika yang absah untuk masing-masing skala variabel.
- **Assessment Evidence:** Lembar Spesifikasi Operasional Variabel lengkap dengan batasan skala dan unit pengukuran.

#### COMP-APP-03: Sampling Theory & Data Collection Protocols
- **Deskripsi:** Mampu merancang skema sampling probabilistik dan non-probabilistik yang representatif, menghitung ukuran sampel minimum, dan menyusun protokol pengumpulan data terstandardisasi.
- **Knowledge Requirements:** Simple random sampling, stratified sampling, cluster sampling, systematic sampling; non-probability sampling; non-response bias; teorema limit pusat; formula Cochran dan Slovin.
- **Practical Skills:** Menghitung ukuran sampel minimum berdasarkan margin of error dan tingkat kepercayaan; membuat jadwal penarikan sampel teracak; menyusun Standard Operating Procedure (SOP) akuisisi data lapangan/laboratorium.
- **Mathematical Foundations:** Formula penentuan ukuran sampel Cochran untuk proporsi dan rata-rata kontinu:

$$n_0 = \frac{Z^2 \cdot p(1-p)}{e^2}, \quad n = \frac{n_0}{1 + \frac{n_0 - 1}{N}}$$

- **Prerequisites:** COMP-APP-02.
- **Expected Proficiency (Bloom):** Apply $\rightarrow$ Evaluate.
- **Measurable Learning Outcomes:**
  - Menghitung ukuran sampel minimum yang diperlukan untuk mendeteksi perbedaan tertentu pada taraf signifikansi $\alpha = 0.05$.
  - Menyusun protokol pengumpulan data langkah-demi-langkah yang meminimalkan bias seleksi.
- **Assessment Evidence:** Data Collection Protocol SOP dan skrip simulasi penarikan sampel acak terstrata dengan Python.

#### COMP-APP-04: Exploratory Data Analysis & Outlier Diagnostics
- **Deskripsi:** Mampu mengeksplorasi struktur data secara grafis dan numerik, memeriksa pola distribusi, mengidentifikasi data hilang (*missing values*), serta mendeteksi pencilan (*outliers*) secara objektif.
- **Knowledge Requirements:** Prinsip EDA John Tukey, ukuran pemusatan (mean terpotong, median) dan dispersi (MAD, IQR), koefisien skewness dan kurtosis, mekanisme data hilang (MCAR, MAR, MNAR), teknik deteksi pencilan (Z-score, Tukey's fences, Isolation Forest).
- **Practical Skills:** Membuat skrip otomatisasi pembersihan data; memvisualisasikan sebaran data dengan diagram box, violin, dan raincloud; menerapkan strategi imputasi data yang dapat dipertanggungjawabkan.
- **Mathematical Foundations:** Rumus deviasi absolut median (MAD):

$$\text{MAD} = \text{median}(|X_i - \text{median}(X)|)$$

dan ambang Tukey's fences: $[Q_1 - 1.5 \cdot \text{IQR}, Q_3 + 1.5 \cdot \text{IQR}]$.
- **Prerequisites:** COMP-APP-02.
- **Expected Proficiency (Bloom):** Analyze.
- **Measurable Learning Outcomes:**
  - Mendeteksi dan mengkategorikan outlier pada dataset eksperimen multivariat.
  - Memilih antara penghapusan, transformasi data, atau penggunaan metode tahan outlier dengan justifikasi ilmiah.
- **Assessment Evidence:** Notebook Python Exploratory Data Analysis yang memuat profil kualitas data, diagnostik outlier, dan visualisasi distribusi.

#### COMP-APP-05: Null Hypothesis Significance Testing & Practical Significance
- **Deskripsi:** Mampu merancang dan mengeksekusi uji hipotesis null (NHST) secara benar, menginterpretasikan p-value tanpa salah kaprah, menghitung effect size, dan membedakan signifikansi statistik dari signifikansi praktis.
- **Knowledge Requirements:** Kerangka Fisherian vs Neyman-Pearson, kesalahan Tipe I ($\alpha$) dan Tipe II ($\beta$), definisi matematis p-value, ukuran efek terstandarisasi (Cohen's $d$, Hedges' $g$, $r$, $\eta^2$), batas interval kepercayaan $(1-\alpha)$, bahaya p-hacking dan *optional stopping*.
- **Practical Skills:** Memilih uji statistik parametrik (z-test, t-test satu/dua sampel, paired t-test) berdasarkan asumsi data; menghitung nilai uji dan p-value; menghitung interval kepercayaan untuk effect size; melaporkan hasil statistik sesuai gaya baku IEEE/APA.
- **Mathematical Foundations:** Formulasi uji t dua sampel independen dengan varians homogen:

$$t = \frac{\bar{X}_1 - \bar{X}_2}{s_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}, \quad s_p = \sqrt{\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2}}$$

dan Hedges' $g$ untuk koreksi bias sampel kecil: $g \approx d \left(1 - \frac{3}{4(n_1+n_2)-9}\right)$.
- **Prerequisites:** COMP-APP-03, COMP-APP-04.
- **Expected Proficiency (Bloom):** Apply $\rightarrow$ Analyze $\rightarrow$ Evaluate.
- **Measurable Learning Outcomes:**
  - Menjalankan uji signifikansi komparatif dan menyertakan nilai effect size beserta interval kepercayaannya.
  - Menjelaskan mengapa nilai $p < 0.05$ belum tentu mencerminkan keunggulan performa rekayasa yang bermakna.
- **Assessment Evidence:** Laporan komparasi statistik performa dua metode rekayasa lengkap dengan tabel inferensi, effect size, dan narasi interpretatif.

---

### TAHAP III: ADVANCED EXPERIMENTAL & METROLOGICAL RIGOR

#### COMP-EXP-01: Metrology, Calibration & Measurement Uncertainty (GUM)
- **Deskripsi:** Mampu mengevaluasi ketidakpastian pengukuran instrumen rekayasa sesuai standar JCGM 100:2008 (GUM), merancang kurva kalibrasi tertelusur, dan menghitung perambatan ketidakpastian linier/non-linier.
- **Knowledge Requirements:** Rantai ketertelusuran SI, perbedaan akurasi (*trueness*) vs presisi, evaluasi ketidakpastian Tipe A dan Tipe B, faktor cakupan ($k$), expanded uncertainty ($U = k \cdot u_c$), hukum perambatan ketidakpastian Taylor.
- **Practical Skills:** Mengkalibrasi sensor fisik terhadap standar acuan; menurunkan persamaan matematis model pengukuran; menghitung koefisien sensitivitas parsial; menyusun tabel anggaran ketidakpastian (*uncertainty budget table*).
- **Mathematical Foundations:** Hukum perambatan ketidakpastian gabungan:

$$u_c^2(y) = \sum_{i=1}^N \left(\frac{\partial f}{\partial x_i}\right)^2 u^2(x_i) + 2 \sum_{i=1}^{N-1}\sum_{j=i+1}^N \frac{\partial f}{\partial x_i} \frac{\partial f}{\partial x_j} u(x_i, x_j)$$

- **Prerequisites:** COMP-APP-02, COMP-APP-05.
- **Expected Proficiency (Bloom):** Apply $\rightarrow$ Calculate $\rightarrow$ Evaluate.
- **Measurable Learning Outcomes:**
  - Mengonstruksi lembar evaluasi ketidakpastian pengukuran terpadu untuk sistem sensor eksperimental.
  - Menghitung expanded uncertainty ($k=2$, tingkat kepercayaan 95%) dari fungsi pengukuran multivariabel.
- **Assessment Evidence:** Uncertainty Budget Report berstandar GUM untuk instrumen pengujian rekayasa.

#### COMP-EXP-02: Design of Experiments (DoE) & Factorial Analysis
- **Deskripsi:** Mampu merancang eksperimen multifaktor menggunakan metodologi DoE formal (desain faktorial $2^k$, faktorial fraksional $2^{k-p}$), mengidentifikasi efek utama dan interaksi, serta menerapkan blocking dan randomisasi.
- **Knowledge Requirements:** Aksioma Fisher (replikasi, randomisasi, blocking), ortogonalitas desain, confounding dan aliasing pattern, resolusi desain (Resolution III, IV, V), Response Surface Methodology (RSM).
- **Practical Skills:** Mengonstruksi matriks desain faktorial; menyusun urutan uji acak (*randomized run-order*); menganalisis efek interaksi multi-faktor via ANOVA; memvisualisasikan interaction plots dan contour surfaces.
- **Mathematical Foundations:** Model regresi desain faktorial $2^k$:

$$Y = \beta_0 + \sum_{i=1}^k \beta_i x_i + \sum_{i < j} \beta_{ij} x_i x_j + \cdots + \epsilon$$

dan perhitungan kontras efek faktor: $\text{Effect}_A = \frac{1}{n 2^{k-1}} \left[ \text{Contrast}_A \right]$.
- **Prerequisites:** COMP-APP-01, COMP-APP-05.
- **Expected Proficiency (Bloom):** Apply $\rightarrow$ Create $\rightarrow$ Analyze.
- **Measurable Learning Outcomes:**
  - Merancang matriks eksperimen faktorial fraksional beresolusi minimal IV untuk menguji 5 faktor dengan jumlah run terbatas.
  - Membedakan pengaruh langsung faktor utama dari efek sinergis/antagonis interaksi dua faktor.
- **Assessment Evidence:** Rancangan eksperimen DoE lengkap dengan matriks generator aliasing dan analisis ANOVA hasil uji.

#### COMP-EXP-03: Statistical Modeling & Generalized Linear Models
- **Deskripsi:** Mampu membangun, mendiagnosis, dan memvalidasi model regresi linier multivariat, Generalized Linear Models (GLM), dan Linear Mixed-Effects Models (LMM) untuk data terstruktur.
- **Knowledge Requirements:** Asumsi klasik Gauss-Markov (linieritas, homoskedastisitas, normalitas residu, independensi), multikolinearitas (VIF), keluarga eksponensial (logistik, Poisson), efek acak vs efek tetap pada data pengukuran berulang (*repeated measures*).
- **Practical Skills:** Mendiagnosis pelanggaran asumsi OLS melalui plot residu 4-panel; fitting model regresi logistik dan Poisson; memodelkan variasi subjek acak menggunakan pustaka `statsmodels` atau `lme4`.
- **Mathematical Foundations:** Estimasi parameter OLS via aljabar matriks:

$$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}, \quad \text{Cov}(\hat{\boldsymbol{\beta}}) = \sigma^2 (\mathbf{X}^T \mathbf{X})^{-1}$$

dan fungsi logit GLM: $\ln\left(\frac{p}{1-p}\right) = \mathbf{X}\boldsymbol{\beta}$.
- **Prerequisites:** COMP-APP-05, COMP-EXP-02.
- **Expected Proficiency (Bloom):** Analyze $\rightarrow$ Evaluate.
- **Measurable Learning Outcomes:**
  - Melakukan evaluasi diagnostik residu model regresi dan menerapkan koreksi transformasi yang tepat jika asumsi terlanggar.
  - Membangun model mixed-effects untuk memisahkan variasi perlakuan dari variasi acak batch eksperimen.
- **Assessment Evidence:** Notebook analisis regresi terpadu yang memuat diagnostik residu, uji multikolinearitas, dan interpretasi koefisien.

#### COMP-EXP-04: Nonparametric Resampling & Error Rate Control
- **Deskripsi:** Mampu menerapkan metode inferensi bebas distribusi (uji non-parametrik, bootstrap resampling, permutation test) dan mengendalikan inflasi kesalahan pengujian jamak (Multiple Comparisons) via FDR.
- **Knowledge Requirements:** Uji peringkat Mann-Whitney, Wilcoxon, Kruskal-Wallis, Friedman; teori bootstrap Efron (percentile CI, BCa); Family-Wise Error Rate (Bonferroni, Holm); False Discovery Rate (Benjamini-Hochberg).
- **Practical Skills:** Membangun interval kepercayaan bootstrap untuk metrik non-linier; mengoreksi array p-value dari ratusan pengujian simultan; menyusun diagram signifikansi komparatif algoritma.
- **Mathematical Foundations:** Inflasi FWER pada $m$ pengujian: $\alpha_{\text{family}} = 1 - (1 - \alpha)^m$; prosedur Benjamini-Hochberg: $P_{(k)} \leq \frac{k}{m} Q$.
- **Prerequisites:** COMP-APP-05.
- **Expected Proficiency (Bloom):** Apply $\rightarrow$ Evaluate.
- **Measurable Learning Outcomes:**
  - Mengonstruksi interval kepercayaan 95% via bootstrap 10.000 iterasi untuk metrik yang tidak memiliki distribusi parametrik baku.
  - Menerapkan koreksi FDR Benjamini-Hochberg pada pengujian simultan untuk menekan tingkat temuan palsu di bawah $5\%$.
- **Assessment Evidence:** Skrip Python koreksi multiple testing dan kalkulasi bootstrap CI lengkap dengan perbandingan kurva empiris.

---

### TAHAP IV: INDEPENDENT & REPRODUCIBLE RESEARCH

#### COMP-IND-01: Research Software Engineering & Computational Reproducibility
- **Deskripsi:** Mampu membangun pipeline komputasi riset yang sepenuhnya otomatis, modular, terisolasi, dan dapat direproduksi secara independen oleh pihak lain (*one-click reproduction*).
- **Knowledge Requirements:** Taksonomi reproduksibilitas ACM/IEEE, kontrol seed pseudorandom komputasi, kontainerisasi sistem (Docker), manajemen dependensi terisolasi (Virtual environments, Poetry/Conda, lockfiles), pelacakan versi data (Git + DVC), prinsip modularitas kode riset.
- **Practical Skills:** Membungkus eksperimen komputasi ke dalam Dockerfile yang terisolasi; mengunci seluruh dependensi paket hingga versi build; merancang skrip eksekusi satu-perintah (*entrypoint script* / Makefile); memastikan determinisme numerik.
- **Mathematical Foundations:** Determinisme algoritma pseudorandom number generators (PRNG) dan kriptografi hash digest berkas kode/lingkungan.
- **Prerequisites:** COMP-FND-05, COMP-APP-04.
- **Expected Proficiency (Bloom):** Apply $\rightarrow$ Create.
- **Measurable Learning Outcomes:**
  - Mengemas proyek komputasi ilmiah ke dalam repositori dengan lingkungan terkunci yang berhasil dijalankan ulang pada mesin bersih.
  - Membuktikan bahwa hasil angka dan figur pada dokumen dapat direproduksi identik dari data mentah via eksekusi skrip otomatis.
- **Assessment Evidence:** Repositori GitHub/GitLab publik yang dilengkapi Dockerfile, Makefile, requirements lock, dan panduan reproduksi 1-klik.

#### COMP-IND-02: Rigorous Benchmarking & Component Ablation
- **Deskripsi:** Mampu merancang protokol komparasi algoritma yang adil terhadap baseline terkini, mencegah data leakage, dan membongkar kontribusi marjinal tiap modul melalui studi ablasi sistematis.
- **Knowledge Requirements:** Taksonomi kebocoran data (data leakage), protokol k-fold cross-validation terstrata dan terkelompok (GroupKFold), protokol perbandingan multi-dataset Demšar, desain matriks ablasi kombinatorial.
- **Practical Skills:** Membangun pipeline evaluasi terisolasi bebas train-test contamination; merancang matriks eksperimen ablasi ($A, B, C$); menghitung signifikansi selisih performa antar varian; membuat Critical Difference Diagrams.
- **Mathematical Foundations:** Uji peringkat berperingkat Friedman dan statistik Nemenyi post-hoc:

$$\chi_F^2 = \frac{12 N}{k(k+1)} \left[ \sum_{j=1}^k R_j^2 - \frac{k(k+1)^2}{4} \right]$$

- **Prerequisites:** COMP-EXP-02, COMP-EXP-04, COMP-IND-01.
- **Expected Proficiency (Bloom):** Analyze $\rightarrow$ Evaluate $\rightarrow$ Create.
- **Measurable Learning Outcomes:**
  - Merancang dan mengeksekusi studi ablasi multi-komponen untuk memverifikasi apakah komponen usulan benar-benar menyumbang peningkatan performa.
  - Membangun diagram Critical Difference (CD) yang memperlihatkan peringkat keunggulan algoritma usulan vs 4 baseline secara statistik.
- **Assessment Evidence:** Laporan Studi Ablasi Komprehensif dan Benchmarking Report berstandar naskah konferensi papan atas.

#### COMP-IND-03: Scientific Argumentation & Manuscript Architecture
- **Deskripsi:** Mampu menyusun artikel ilmiah berstruktur IMRaD yang koheren, menerapkan rhetorical moves model Swales CARS, dan memetakan setiap klaim abstrak pada bukti data empiris yang tak terbantahkan.
- **Knowledge Requirements:** Model retoris Swales CARS (Create-A-Research-Space), arsitektur naskah IMRaD, Claims-to-Evidence Mapping Framework, teknik visualisasi tabel dan figur ilmiah standar penerbit bereputasi (IEEE, Elsevier, Springer).
- **Practical Skills:** Menulis bagian pendahuluan yang memikat dan argumentatif; menyajikan hasil objektif tanpa opini pada seksi Results; mengonstruksi diskusi mendalam yang menempatkan temuan dalam peta literatur global pada seksi Discussion.
- **Mathematical Foundations:** Logika relasional argumen ilmiah: $\forall c \in \text{Claims}, \exists e \in \text{Evidence} \text{ s.t. } e \vdash c$.
- **Prerequisites:** COMP-FND-04, COMP-APP-05, COMP-IND-02.
- **Expected Proficiency (Bloom):** Evaluate $\rightarrow$ Create.
- **Measurable Learning Outcomes:**
  - Menyusun draf naskah ilmiah lengkap (Introduction, Methods, Results, Discussion) berbasis template LaTeX standar jurnal internasional.
  - Memverifikasi bahwa setiap klaim keunggulan pada abstrak memiliki pasangan figur, tabel, atau pembuktian statistik di dalam batang tubuh naskah.
- **Assessment Evidence:** Naskah artikel ilmiah lengkap berformat LaTeX/PDF siap submit yang lolos audit Claims-to-Evidence.

#### COMP-IND-04: Peer Review Navigation & Scholarly Rebuttal
- **Deskripsi:** Mampu menavigasi proses editorial peer-review, mengevaluasi target jurnal secara kritis, dan menyusun naskah tanggapan ulasan reviewer (*rebuttal letter*) secara profesional, santun, dan berbasis bukti.
- **Knowledge Requirements:** Metrik bibliometrik jurnal (Scopus CiteScore, Clarivate Journal Impact Factor, SJR), karakteristik jurnal predator vs bereputasi, model peer-review (single-blind, double-blind, open review), struktur Point-by-Point Rebuttal Matrix.
- **Practical Skills:** Mengidentifikasi jurnal target yang sesuai dengan scope naskah; membedakan komentar substantif vs minor dari reviewer; menyusun naskah sanggahan dengan melampirkan data/analisis tambahan; merumuskan revisi teks naskah secara transparan.
- **Mathematical Foundations:** Formulasi metrik bibliometrik: perhitungan Impact Factor 2-tahunan dan h-index peneliti.
- **Prerequisites:** COMP-IND-03.
- **Expected Proficiency (Bloom):** Evaluate $\rightarrow$ Create.
- **Measurable Learning Outcomes:**
  - Memilih 3 target jurnal bereputasi tinggi dengan mempertimbangkan kesesuaian cakupan, kecepatan review, dan model aksesibilitas.
  - Menyusun dokumen Point-by-Point Rebuttal Matrix untuk menanggapi 10 butir kritik reviewer yang kritis secara meyakinkan dan objektif.
- **Assessment Evidence:** Dokumen Rebuttal Matrix dan naskah revisi bertanda (*marked-up manuscript*) yang memenuhi etika akademik internasional.

---

### TAHAP V: DOCTORAL & SCIENTIFIC LEADERSHIP

#### COMP-DOC-01: Epistemic Novelty & Theoretical Positioning
- **Deskripsi:** Mampu merumuskan kontribusi keilmuan orisinal tingkat doktoral dengan meletakkan fondasi teoretis baru atau mentransformasikan metodologi yang telah ada pada batas terdepan sains (*research frontier*).
- **Knowledge Requirements:** Teori pergeseran paradigma (Kuhn), program riset ilmiah (Lakatos), analisis ontologis batas teori terkini, strategi positioning kontribusi ilmiah (konseptual, teoretis, algoritmik, empiris skala masif).
- **Practical Skills:** Membedah asumsi implisit pada teori dominan; menyusun pembuktian formal atau argumentasi teoretis atas keunggulan metode baru; merancang hipotesis falsifikasi tandingan (*competing hypotheses*).
- **Mathematical Foundations:** Pembuktian formal batas asimptotik, konvergensi algoritma, atau reduksi kompleksitas komputasional.
- **Prerequisites:** COMP-IND-02, COMP-IND-03.
- **Expected Proficiency (Bloom):** Evaluate $\rightarrow$ Create $\rightarrow$ Originate.
- **Measurable Learning Outcomes:**
  - Merumuskan pernyataan kebaruan doktoral (*Doctoral Novelty Manifesto*) yang mendefinisikan kontribusi terhadap batas keilmuan global.
  - Membuktikan batas keabsahan matematis dari metode usulan di bawah kondisi batas ekstrem.
- **Assessment Evidence:** Dokumen Theoretical Contribution & Novelty Specification berstandar proposal disertasi doktoral.

#### COMP-DOC-02: Advanced Uncertainty Quantification & Sensitivity Analysis
- **Deskripsi:** Mampu melakukan kuantifikasi ketidakpastian mendalam (membedakan aleatoric dan epistemic uncertainty), menerapkan emulasi Gaussian Process, dan menjalankan analisis sensitivitas global berbasis varians (Sobol indices).
- **Knowledge Requirements:** Teori probabilitas lanjut, dikotomi aleatoric vs epistemic, Polynomial Chaos Expansion (PCE), Gaussian Process (GP) regression untuk emulasi komputasi, dekomposisi varians ortogonal Sobol (main effect $S_i$ dan total effect $S_{Ti}$), metode screening Morris.
- **Practical Skills:** Membangun emulator GP untuk mensimulasikan sistem rekayasa berbiaya komputasi tinggi; menghitung indeks sensitivitas global Sobol; merancang interval prediksi bebas distribusi via *Conformal Prediction*.
- **Mathematical Foundations:** Dekomposisi varians Sobol:

$$\text{Var}(Y) = \sum_{i=1}^d V_i + \sum_{i < j} V_{ij} + \cdots + V_{1, \dots, d}, \quad S_i = \frac{V_i}{\text{Var}(Y)}, \quad S_{Ti} = 1 - \frac{\text{Var}_{\sim i}(E_{i}(Y|\mathbf{X}_{\sim i}))}{\text{Var}(Y)}$$

- **Prerequisites:** COMP-EXP-01, COMP-EXP-03.
- **Expected Proficiency (Bloom):** Analyze $\rightarrow$ Evaluate $\rightarrow$ Create.
- **Measurable Learning Outcomes:**
  - Mengidentifikasi variabel input sistem rekayasa yang paling berpengaruh terhadap varians output menggunakan indeks Sobol.
  - Menghasilkan kurva ketidakpastian gabungan yang memisahkan error acak sensor dari ketidaktahuan struktur model (*model discrepancy*).
- **Assessment Evidence:** Modul Kuantifikasi Ketidakpastian Komprehensif dan Laporan Analisis Sensitivitas Global.

#### COMP-DOC-03: Causal Inference & Structural Causal Modeling
- **Deskripsi:** Mampu membedakan asosiasi statistik dari hubungan kausal sejati, memodelkan graf kausal menggunakan Structural Causal Models (SCMs), menerapkan do-calculus, dan mengatasi perancu tak teramati (*unobserved confounding*).
- **Knowledge Requirements:** Rubin Causal Model (Potential Outcomes, Average Treatment Effect, Counterfactuals), Pearl's Structural Causal Models (SCM), Directed Acyclic Graphs (DAGs), kriteria d-separation, backdoor criterion, frontdoor criterion, Instrumental Variables (IV), Propensity Score Matching (PSM).
- **Practical Skills:** Mengidentifikasi bias perancu (*confounding bias*) dan bias kolider (*collider bias*) pada graf penelitian; menentukan set penyesuaian kovariat yang cukup via backdoor criterion; mengeksekusi inferensi kausal komputasi via pustaka `DoWhy` atau `CausalInference`.
- **Mathematical Foundations:** Kalkulus intervensi Pearl:

$$P(Y=y | \text{do}(X=x)) = \sum_z P(Y=y | X=x, Z=z) P(Z=z)$$

di bawah pemenuhan backdoor criterion terhadap himpunan variabel $Z$.
- **Prerequisites:** COMP-APP-05, COMP-EXP-03.
- **Expected Proficiency (Bloom):** Analyze $\rightarrow$ Evaluate $\rightarrow$ Create.
- **Measurable Learning Outcomes:**
  - Membangun model DAG penelitian dan membuktikan secara formal apakah efek kausal dari intervensi dapat diidentifikasi (*identifiable*).
  - Mengeliminasi bias seleksi pada data observasional menggunakan metode pencocokan skor kecenderungan (*propensity score matching*).
- **Assessment Evidence:** Causal Inference Research Report yang memuat diagram DAG, pengujian backdoor criterion, dan estimasi efek perlakuan kausal sejati.

#### COMP-DOC-04: Multi-Year Doctoral Roadmap & Research Programme Governance
- **Deskripsi:** Mampu merancang program riset multi-tahun yang terpadu, menyusun peta jalan disertasi (*thesis-by-publication*), mengelola risiko kegagalan eksperimen, dan memimpin kolaborasi riset ilmiah.
- **Knowledge Requirements:** Strategi publikasi kumulatif (*thesis-by-publication*), manajemen portofolio proyek riset, mitigasi risiko teknis dan kriteria terminasi dini (*kill criteria*), tata kelola repositori data jangka panjang, manajemen hibah penelitian.
- **Practical Skills:** Memecah payung riset besar menjadi 3-4 proyek mandiri yang saling mendukung; menyusun jadwal Gantt chart terukur dengan milestone publikasi semesteran; menetapkan batasan kapan suatu jalur eksperimen harus dihentikan jika hipotesis terfalsifikasi.
- **Mathematical Foundations:** Analisis jalur kritis (*Critical Path Method* - CPM) dan matriks alokasi probabilitas keberhasilan portofolio riset.
- **Prerequisites:** COMP-DOC-01, COMP-IND-03.
- **Expected Proficiency (Bloom):** Evaluate $\rightarrow$ Create $\rightarrow$ Lead.
- **Measurable Learning Outcomes:**
  - Mengonstruksi peta jalan riset 3-4 tahun yang memetakan relasi antara pertanyaan riset, output eksperimen, dan target jurnal internasional bereputasi.
  - Merumuskan rencana mitigasi risiko dan jalur cadangan (*fallback plans*) untuk setiap risiko eksperimen berkategori tinggi.
- **Assessment Evidence:** Dokumen PhD Strategic Research Roadmap lengkap dengan struktur dekomposisi kerja (WBS), jadwal publikasi, dan protokol penjaminan mutu ilmiah.

