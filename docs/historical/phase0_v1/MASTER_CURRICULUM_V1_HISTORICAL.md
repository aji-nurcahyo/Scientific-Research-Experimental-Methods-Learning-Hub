# MASTER CURRICULUM SPECIFICATION
## Scientific Research & Experimental Methods Learning Hub
### From Scientific Thinking to Reproducible Research

> **Institusi:** Institut Teknologi Sumatera (ITERA)  
> **Project Creator:** Aji Pamungkas Tri Nurcahyo  
> **Target Audiens:** Mahasiswa S1 (Tugas Akhir/Capstone), Dosen & Peneliti Rekayasa, Calon Peneliti Doktoral (PhD Candidates)  
> **Dokumen Versi:** 1.0 (Phase 0 Baseline)  
> **Tanggal Rilis:** 22 November 2026

---

## DAFTAR ISI

1. [Kerangka Filosofis dan Pedagogis](#1-kerangka-filosofis-dan-pedagogis)
2. [Evaluasi Kritis atas 28 Kandidat Chapter Inti](#2-evaluasi-kritis-atas-28-kandidat-chapter-inti)
3. [Master Core Curriculum (Level 1 hingga Level 4)](#3-master-core-curriculum)
4. [Advanced Experimental & Statistical Methods (17 Modul Lanjutan)](#4-advanced-experimental--statistical-methods)
5. [Research Specialization Tracks (S1 hingga S6)](#5-research-specialization-tracks)
6. [Research & PhD Learning Paths (R1 hingga R6)](#6-research--phd-learning-paths)
7. [Katalog Practical Research Laboratories (13 Modul Komputasi)](#7-katalog-practical-research-laboratories)
8. [Inventaris Research Templates (14 Template Akademik Standar)](#8-inventaris-research-templates)
9. [Standar Metrologi dan Referensi Akademik Terverifikasi](#9-standar-metrologi-dan-referensi-akademik-terverifikasi)
10. [Arsitektur Website dan Anti-Slop Academic Design System](#10-arsitektur-website-dan-anti-slop-academic-design-system)
11. [Matriks Integrasi Lintas Learning Hub ITERA](#11-matriks-integrasi-lintas-learning-hub-itera)
12. [Roadmap Implementasi dan Quality Assurance Gates](#12-roadmap-implementasi-dan-quality-assurance-gates)

---

## 1. KERANGKA FILOSOFIS DAN PEDAGOGIS

Learning Hub ini dirancang dengan prinsip **Constructive Alignment** (Biggs) dan taksonomi pembelajaran kognitif bertingkat (Bloom's Revised Taxonomy). Pendekatan yang digunakan menolak metode hafalan instrumen statistik dan berfokus pada alur pemikiran ilmiah:

$$\text{Scientific Reasoning} \longrightarrow \text{Research Design} \longrightarrow \text{Data Collection} \longrightarrow \text{Analysis} \longrightarrow \text{Validation} \longrightarrow \text{Reproducibility} \longrightarrow \text{Scientific Communication}$$

### Standar Pembahasan Tiap Metode:
Setiap metode atau instrumen yang dibahas dalam Learning Hub ini wajib memenuhi 9 kriteria ketat:
1. **Kapan Digunakan:** Indikasi ilmiah dan domain masalah yang tepat.
2. **Mengapa Digunakan:** Rasionalisasi teoretis dibanding metode alternatif.
3. **Asumsi yang Diperlukan:** Kondisi batas matematika dan empiris yang wajib dipenuhi.
4. **Mathematical Foundations:** Penurunan rumus formal, notasi eksplisit, dan definisi variabel.
5. **Contoh Perhitungan Manual/Konseptual:** Langkah demi langkah numerik yang transparan.
6. **Implementasi Komputasi:** Kode Python berbasis library standar (*NumPy, SciPy, Statsmodels, Pingouin, Scikit-learn*).
7. **Keterbatasan Metode:** Batas keabsahan generalisasi dan kendala komputasi/fisik.
8. **Kesalahan Umum Peneliti:** Kekeliruan tafsir (*misconceptions*), *p-hacking*, pengabaian *effect size*, dan *data leakage*.
9. **Prosedur Validasi:** Cara memverifikasi asumsi (*diagnostic checks*, residu, uji sensitivitas).

---

## 2. EVALUASI KRITIS ATAS 28 KANDIDAT CHAPTER INTI

Rancangan awal mengusulkan 28 chapter yang terbagi dalam 4 Level. Berikut adalah evaluasi kritis mengenai kecukupan, kedalaman, dan penyesuaian yang diterapkan:

### A. Level 1: Foundations of Scientific Research (Chapters 1 - 7)
- **Evaluasi:** Sangat solid dalam membangun landasan epistemologi dan logika inferensi induktif-deduktif.
- **Penyempurnaan:** Chapter 6 (*Hypotheses & Conceptual Frameworks*) diperkuat dengan introduksi *Directed Acyclic Graphs* (DAGs) untuk memodelkan hubungan kausal awal sebelum pengujian statistik. Chapter 7 (*Ethics*) menambahkan etika penggunaan Generative AI dalam riset akademik serta pedoman COPE terkini.

### B. Level 2: Research Design & Data Collection (Chapters 8 - 14)
- **Evaluasi:** Memiliki cakupan yang seimbang antara riset observasional dan eksperimental.
- **Penyempurnaan:** Chapter 9 (*Variables & Measurements*) mengadopsi standar Guide to the Expression of Uncertainty in Measurement (GUM) untuk definisi ketidakpastian instrumen rekayasa. Chapter 13 (*Data Management*) diselaraskan penuh dengan prinsip FAIR (*Findable, Accessible, Interoperable, Reusable*).

### C. Level 3: Statistical & Computational Analysis (Chapters 15 - 21)
- **Evaluasi:** Sangat komprehensif, namun rentan terjebak pada dikotomi usang *p-value < 0.05*.
- **Penyempurnaan:** Chapter 18 (*Confidence Intervals & Effect Sizes*) dan Chapter 19 (*Hypothesis Testing*) diposisikan secara berdampingan dengan penekanan pada koreksi *Multiple Testing* (Bonferroni, Benjamini-Hochberg FDR) untuk mencegah inflasi Type I error. Penegasan *Practical Significance vs Statistical Significance* diletakkan sebagai syarat kelulusan bab.

### D. Level 4: Research Evaluation & Communication (Chapters 22 - 28)
- **Evaluasi:** Menutup siklus riset dengan aspek replikasi dan diseminasi.
- **Penyempurnaan:** Chapter 24 (*Reproducibility*) diperkuat dengan aspek Research Software Engineering (RSE), mencakup *virtual environment*, *random seed control*, dan *versioned artifact tracking*. Chapter 28 (*Capstone*) dirancang sebagai proyek portofolio nyata yang menghasilkan *reproducible research package* lengkap.

**Kesimpulan Evaluasi:** Jumlah 28 Chapter Inti dipertahankan karena memiliki struktur modular yang sangat harmonis (7 Chapter per Level). Kedalaman materi diperluas secara substansial melalui sub-topik dan laboratorium komputasi.

---

## 3. MASTER CORE CURRICULUM

```
┌────────────────────────────────────────────────────────────────────────┐
│ LEVEL 1: Foundations of Scientific Research (Chapters 1 - 7)          │
├────────────────────────────────────────────────────────────────────────┤
│ LEVEL 2: Research Design & Data Collection (Chapters 8 - 14)           │
├────────────────────────────────────────────────────────────────────────┤
│ LEVEL 3: Statistical & Computational Analysis (Chapters 15 - 21)       │
├────────────────────────────────────────────────────────────────────────┤
│ LEVEL 4: Research Evaluation & Communication (Chapters 22 - 28)        │
└────────────────────────────────────────────────────────────────────────┘
```

### LEVEL 1: FOUNDATIONS OF SCIENTIFIC RESEARCH

#### Chapter 1: Scientific Thinking & the Research Process
- **Prerequisites:** Tidak ada.
- **Learning Objectives:** Membedakan penalaran induktif, deduktif, dan abduktif; memetakan siklus penelitian ilmiah; mengidentifikasi batasan metode saintifik.
- **Topik Utama:** Epistemologi dasar, metode ilmiah hipotetiko-deduktif (Popperian falsification), siklus iteratif teori-hipotesis-eksperimen-observasi.
- **Pondasi Formal:** Logika proposisional formal, silogisme *Modus Ponens* dan *Modus Tollens*.
- **Contoh Kasus:** Pergeseran paradigma dari model fisis empiris ke model data-driven dalam rekayasa sensor.
- **Lab Komputasi:** Simulasi verifikasi vs falsifikasi hipotesis dengan model sederhana.
- **Kesalahan Umum:** Menganggap riset berhasil hanya jika hipotesis awal terbukti benar (confirmation bias).

#### Chapter 2: Types of Research & Research Paradigms
- **Prerequisites:** Chapter 1.
- **Learning Objectives:** Mengklasifikasikan jenis penelitian berdasarkan tujuan, pendekatan, dan paradigma ontologis/epistemologis.
- **Topik Utama:** Riset fundamental vs terapan, eksploratori vs eksplanatori vs konfirmatori, paradigma positivisme, post-positivisme, dan pragmatisme dalam rekayasa.
- **Pondasi Formal:** Taksonomi klasifikasi riset dan kriteria demarkasi sains.
- **Contoh Kasus:** Perbedaan perlakuan metodologis antara studi kelayakan komputasional dengan validasi prototipe laboratorium.
- **Lab Komputasi:** Analisis perbandingan arsitektur penelitian kualitatif-kuantitatif-campuran.
- **Kesalahan Umum:** Memaksakan pendekatan kuantitatif murni pada fase eksplorasi perumusan masalah.

#### Chapter 3: Research Problems, Questions & Objectives
- **Prerequisites:** Chapters 1, 2.
- **Learning Objectives:** Merumuskan masalah penelitian yang signifikan; menurunkan pertanyaan penelitian dengan kriteria FINER; menyusun tujuan riset yang SMART.
- **Topik Utama:** Identifikasi masalah di lapangan/industri/teori, pohon masalah (*problem tree*), kriteria FINER (Feasible, Interesting, Novel, Ethical, Relevant), struktur SMART.
- **Pondasi Formal:** Dekomposisi graf pohon masalah dan pemetaan relasi logis tujuan terhadap pertanyaan.
- **Contoh Kasus:** Perumusan masalah degradasi akurasi sistem pengenalan objek dalam kondisi pencahayaan rendah.
- **Lab Komputasi:** Evaluator interaktif kelayakan pertanyaan penelitian berdasarkan matriks skor bobot.
- **Kesalahan Umum:** Merumuskan pertanyaan riset yang bersifat teknis implementatif biasa ("bagaimana cara membuat website...") alih-alih pertanyaan ilmiah ("bagaimana pengaruh arsitektur X terhadap latensi Y...").

#### Chapter 4: Literature Search & Research Mapping
- **Prerequisites:** Chapter 3.
- **Learning Objectives:** Menyusun strategi pencarian sistematis; menyaring literatur menggunakan pedoman PRISMA; membangun peta taksonomi keilmuan.
- **Topik Utama:** Boolean logic, query database ilmiah (Scopus, IEEE Xplore, Web of Science, PubMed), diagram alir PRISMA 2020, bibliometric analysis, snowballing technique.
- **Pondasi Formal:** Teori himpunan pada operasi Boolean penelusuran pustaka ($A \cap B \setminus C$).
- **Contoh Kasus:** Pemetaan literatur mengenai algoritma deteksi anomali pada sinyal sensor IoT dari tahun 2020 hingga 2026.
- **Lab Komputasi:** Ekstraksi dan klasterisasi metadata BibTeX menggunakan Python (`bibtexparser`, graf sitasi).
- **Kesalahan Umum:** Menggunakan Google Search tanpa kata kunci terkontrol dan mengabaikan literatur primer bereputasi.

#### Chapter 5: Research Gaps & Novelty
- **Prerequisites:** Chapter 4.
- **Learning Objectives:** Mengidentifikasi dan mengkategorikan celah penelitian (*research gaps*); merumuskan klaim kebaruan (*novelty statement*) yang dapat dipertahankan.
- **Topik Utama:** Taksonomi gap: theoretical, methodological, empirical, population, dan application gap; matriks perbandingan *state-of-the-art* (SOTA).
- **Pondasi Formal:** Matriks diferensiasi fitur dan ruang kontribusi keilmuan (*delta contribution*).
- **Contoh Kasus:** Mengidentifikasi *methodological gap* pada kompresi model deep learning untuk mikrokontroler berdaya rendah.
- **Lab Komputasi:** Pembuatan matriks sintesis literatur otomatis dan visualisasi celah riset.
- **Kesalahan Umum:** Mengklaim novelty hanya karena "belum pernah diterapkan di lokasi X" tanpa ada perbedaan metodologis fundamental.

#### Chapter 6: Hypotheses & Conceptual Frameworks
- **Prerequisites:** Chapters 3, 5.
- **Learning Objectives:** Merumuskan hipotesis terarah dan tak terarah; membedakan hipotesis riset dan hipotesis statistik; membangun Directed Acyclic Graph (DAG).
- **Topik Utama:** Relasi kausalitas awal, variabel laten dan teramati, pembentukan hipotesis null ($H_0$) dan alternatif ($H_1$), konstruksi diagram alir konseptual.
- **Pondasi Formal:** Teori graf asiklik terarah (DAG) untuk representasi hubungan kausal; formalisasi $H_0: \theta = \theta_0$ vs $H_1: \theta \neq \theta_0$.
- **Contoh Kasus:** Kerangka konseptual pengaruh suhu lingkungan dan frekuensi sampling terhadap degradasi akurasi estimasi state of charge (SoC) baterai.
- **Lab Komputasi:** Pemodelan DAG variabel penelitian dengan pustaka Python `pgmpy` atau `graphviz`.
- **Kesalahan Umum:** Menyusun hipotesis statistik yang tidak selaras dengan hipotesis riset konseptual.

#### Chapter 7: Research Ethics & Academic Integrity
- **Prerequisites:** Chapters 1, 6.
- **Learning Objectives:** Menerapkan pedoman integritas riset internasional; menghindari fabrikasi, falsifikasi, dan plagiarisme; mengelola etika kecerdasan buatan dalam penulisan ilmiah.
- **Topik Utama:** Pedoman COPE, kriteria kepenulisan (ICMJE criteria), Institutional Review Board (IRB), etika data eksperimen, transparansi penggunaan LLM/AI.
- **Pondasi Formal:** Indeks kesamaan teks (*similarity index*), standar verifikasi orisinalitas, dan *consent documentation*.
- **Contoh Kasus:** Analisis kasus penarikan paper (*retraction*) akibat duplikasi gambar mikroskopi atau manipulasi kurva kalibrasi.
- **Lab Komputasi:** Audit jejak digital data riset dan verifikasi hash integritas berkas data (*SHA-256 provenance*).
- **Kesalahan Umum:** *Salami slicing* (memecah satu penelitian utuh menjadi banyak artikel kecil) dan *ghost/guest authorship*.

---

### LEVEL 2: RESEARCH DESIGN & DATA COLLECTION

#### Chapter 8: Research Design Fundamentals
- **Prerequisites:** Level 1.
- **Learning Objectives:** Memilih desain penelitian yang tepat sesuai pertanyaan riset; membedakan studi observasional, eksperimental, dan quasi-eksperimental.
- **Topik Utama:** Taksonomi desain riset kuantitatif, kontrol variabel eksternal, validitas internal vs validitas eksternal.
- **Pondasi Formal:** Notasi perancangan eksperimen Campbell & Stanley (X, O, R).
- **Contoh Kasus:** Perancangan komparasi efisiensi komputasi dua arsitektur transformer: uji terkontrol vs pengujian data produksi.
- **Lab Komputasi:** Simulasi alokasi unit eksperimen dan evaluasi trade-off validitas internal-eksternal.
- **Kesalahan Umum:** Mengklaim hubungan sebab-akibat dari desain observasional murni tanpa kontrol variabel perancu.

#### Chapter 9: Variables, Measurements & Operational Definitions
- **Prerequisites:** Chapter 8.
- **Learning Objectives:** Mengidentifikasi tipe-tipe variabel; menyusun definisi operasional variabel yang terukur; menerapkan skala pengukuran data.
- **Topik Utama:** Variabel independen, dependen, perancu (*confounding*), moderator, mediator; skala nominal, ordinal, interval, rasio; standar metrologi GUM.
- **Pondasi Formal:** Teori representasional pengukuran; fungsi pemetaan empiris ke domain numerik $f: \mathcal{A} \rightarrow \mathbb{R}$.
- **Contoh Kasus:** Operasionalisasi "akurasi pelacakan visual" ke dalam metrik Euclidean error, framerate (FPS), dan drift rate.
- **Lab Komputasi:** Skrip validasi tipe data dan verifikasi skala variabel otomatis.
- **Kesalahan Umum:** Memperlakukan data skala ordinal (e.g., skala Likert 1-5) seolah-olah data interval rasio murni tanpa justifikasi statistika yang memadai.

#### Chapter 10: Sampling & Data Collection
- **Prerequisites:** Chapters 8, 9.
- **Learning Objectives:** Membedakan teknik probability dan non-probability sampling; menghitung ukuran sampel minimum; mencegah bias pengambilan sampel.
- **Topik Utama:** Simple random, stratified, cluster, systematic sampling; purposing sampling; sampling frame, non-response bias, sensor sampling rates.
- **Pondasi Formal:** Penentuan ukuran sampel via rumus Slovin, formula Cochran, dan estimasi varians populasi:

$$n = \frac{Z^2 \cdot \sigma^2}{E^2}$$

- **Contoh Kasus:** Pengambilan sampel citra drone lahan kelapa sawit untuk representasi variasi topografi dan kelembaban.
- **Lab Komputasi:** Simulasi Monte Carlo efek ukuran sampel terhadap kestabilan estimasi parameter populasi.
- **Kesalahan Umum:** *Convenience sampling* yang digeneralisasikan secara over-klaim ke seluruh populasi target.

#### Chapter 11: Measurement Validity & Reliability
- **Prerequisites:** Chapters 9, 10.
- **Learning Objectives:** Mengukur validitas konstruk, konten, dan kriteria; menghitung koefisien reliabilitas instrumen dan kesepakatan penilai.
- **Topik Utama:** Construct, internal, external, ecological validity; test-retest reliability, inter-rater reliability (Cohen's Kappa, Fleiss' Kappa), Cronbach's Alpha.
- **Pondasi Formal:** Formulasi matematika Cronbach's Alpha:

$$\alpha = \frac{K}{K - 1} \left( 1 - \frac{\sum_{i=1}^K \sigma_{Y_i}^2}{\sigma_X^2} \right)$$

dan Cohen's Kappa $\kappa = \frac{P_o - P_e}{1 - P_e}$.
- **Contoh Kasus:** Kalibrasi kesepakatan anotasi bounding box antara tiga pakar medis pada citra rontgen.
- **Lab Komputasi:** Skrip Python perhitungan Cohen's Kappa dan Cronbach's Alpha dari matriks anotasi mentah.
- **Kesalahan Umum:** Menganggap instrumen yang reliabel (konsisten) pasti valid (mengukur hal yang benar).

#### Chapter 12: Experimental and Quasi-Experimental Designs
- **Prerequisites:** Chapters 8, 11.
- **Learning Objectives:** Merancang eksperimen laboratorium dan lapangan; menerapkan teknik pengacakan dan kontrol; mengatasi ancaman validitas internal.
- **Topik Utama:** Pretest-posttest control group design, Solomon four-group design, interrupted time-series, regression discontinuity, counterbalancing.
- **Pondasi Formal:** Model linier eksperimental $Y_{ij} = \mu + \tau_i + \epsilon_{ij}$ dengan $\epsilon_{ij} \sim \mathcal{N}(0, \sigma^2)$.
- **Contoh Kasus:** Uji coba dampak algoritma kompresi baru terhadap konsumsi energi baterai sensor edge: perbandingan eksperimen murni vs quasi-eksperimen di pabrik.
- **Lab Komputasi:** Generator jadwal pengacakan eksperimen (*randomized run-order*) dan visualisasi efek carryover.
- **Kesalahan Umum:** Terjadinya *history threat* atau *maturation threat* pada eksperimen pretest-posttest tanpa kelompok kontrol pembanding.

#### Chapter 13: Research Data Management & FAIR Principles
- **Prerequisites:** Chapters 9, 10.
- **Learning Objectives:** Menerapkan prinsip FAIR dalam repositori data; merancang skema metadata dan data dictionary; mengamankan integritas data mentah.
- **Topik Utama:** FAIR Data Principles (Findable, Accessible, Interoperable, Reusable), raw data immutable storage, data version control (DVC), format terbuka (CSV, HDF5, Parquet), dokumentasi etika dan anonimisasi data.
- **Pondasi Formal:** Skema struktur metadata JSON-LD / schema.org untuk dataset ilmiah.
- **Contoh Kasus:** Manajemen data time-series vibrasi mesin industri sebesar 500 GB dengan struktur partisi waktu dan metadata sensor.
- **Lab Komputasi:** Pipeline otomatis pembuatan *Data Dictionary* dan pengecekan integritas checksum MD5/SHA256 untuk setiap berkas eksperimen.
- **Kesalahan Umum:** Mengedit file data mentah secara langsung (*in-place modification*) menggunakan spreadsheet tanpa jejak audit.

#### Chapter 14: Research Proposal Development
- **Prerequisites:** Chapters 1 hingga 13 (Sintesis Level 1 & 2).
- **Learning Objectives:** Menyusun proposal penelitian yang komprehensif, koheren, dan siap dievaluasi oleh komite akademik atau penyedia hibah riset.
- **Topik Utama:** Anatomi proposal penelitian standar, keterpaduan latar belakang-pertanyaan-metode, jadwal kerja (Gantt chart), mitigasi risiko teknis, alokasi anggaran, kriteria evaluasi reviewer.
- **Pondasi Formal:** Matriks keselarasan riset (*Research Alignment Matrix*) yang memetakan Question $\leftrightarrow$ Data Needed $\leftrightarrow$ Method $\leftrightarrow$ Expected Output.
- **Contoh Kasus:** Proposal Tugas Akhir S1 Teknik Elektro/Informatika mengenai sistem deteksi cacat manufaktur berbasis computer vision.
- **Lab Komputasi:** Template generator proposal berbasis Markdown/LaTeX dengan validasi kelengkapan seksi otomatis.
- **Kesalahan Umum:** Menuliskan metodologi yang terlalu abstrak tanpa merinci variabel, instrumen, dan prosedur pengujian spesifik.

---

### LEVEL 3: STATISTICAL & COMPUTATIONAL ANALYSIS

#### Chapter 15: Descriptive Statistics & Exploratory Data Analysis
- **Prerequisites:** Level 1 & Level 2.
- **Learning Objectives:** Menghitung dan menginterpretasikan ukuran pemusatan dan penyebaran data; mendeteksi pencilan (*outliers*); melakukan eksplorasi data visual.
- **Topik Utama:** Mean, median, mode, variance, standard deviation, IQR, skewness, kurtosis; teknik deteksi outlier (Tukey's fences, z-score, Isolation Forest); prinsip visualisasi Tukey EDA.
- **Pondasi Formal:** Formulasi momen statistik ke-3 dan ke-4:

$$\text{Skewness} = \frac{\frac{1}{n}\sum (x_i - \bar{x})^3}{\left(\frac{1}{n}\sum (x_i - \bar{x})^2\right)^{3/2}}, \quad \text{Kurtosis} = \frac{\frac{1}{n}\sum (x_i - \bar{x})^4}{\left(\frac{1}{n}\sum (x_i - \bar{x})^2\right)^2} - 3$$

- **Contoh Kasus:** Eksplorasi karakteristik latensi transmisi paket jaringan nirkabel pada lingkungan industri bising.
- **Lab Komputasi:** Automated EDA pipeline dengan pembersihan data dan pembuatan ringkasan visual multi-dimensi.
- **Kesalahan Umum:** Mengandalkan mean pada distribusi yang menceng ekstrem (*skewed*) tanpa memeriksa median dan dispersi IQR.

#### Chapter 16: Probability & Statistical Distributions
- **Prerequisites:** Chapter 15.
- **Learning Objectives:** Membedakan variabel acak diskrit dan kontinu; memilih distribusi probabilitas yang sesuai untuk fenomena fisik/komputasi; menguji kecocokan distribusi.
- **Topik Utama:** Distribusi Gaussian (Normal), Student's t, F, Chi-Square, Poisson, Binomial, Eksponensial, Log-normal; fungsi kerapatan probabilitas (PDF) dan kumulatif (CDF); uji Goodness-of-Fit (Kolmogorov-Smirnov, Shapiro-Wilk).
- **Pondasi Formal:** PDF distribusi Normal multivariat dan teorema batas pusat (Central Limit Theorem):

$$\bar{X}_n \xrightarrow{d} \mathcal{N}\left(\mu, \frac{\sigma^2}{n}\right) \quad \text{saat } n \to \infty$$

- **Contoh Kasus:** Pemodelan waktu antar-kedatangan (*inter-arrival time*) permintaan inferensi pada GPU server menggunakan distribusi Poisson dan Eksponensial.
- **Lab Komputasi:** Uji kesesuaian distribusi empiris terhadap 10 distribusi teoretis menggunakan SciPy `scipy.stats.fit`.
- **Kesalahan Umum:** Mengasumsikan semua data eksperimen berdistribusi normal tanpa melakukan uji normalitas empiris atau inspeksi Q-Q plot.

#### Chapter 17: Statistical Inference & Parameter Estimation
- **Prerequisites:** Chapters 15, 16.
- **Learning Objectives:** Menjelaskan konsep sampling distribution dan standard error; menghitung point estimation; memahami prinsip Maximum Likelihood Estimation (MLE).
- **Topik Utama:** Sampling distribution, Standard Error of the Mean ($SE = \sigma / \sqrt{n}$), sifat estimator (unbiasedness, consistency, efficiency), Method of Moments vs Maximum Likelihood Estimation (MLE).
- **Pondasi Formal:** Penurunan fungsi log-likelihood:

$$\ell(\theta) = \sum_{i=1}^n \ln f(x_i; \theta), \quad \frac{\partial \ell(\theta)}{\partial \theta} = 0$$

- **Contoh Kasus:** Estimasi parameter laju kegagalan modul sensor suhu pada kondisi operasional ekstrem via MLE.
- **Lab Komputasi:** Optimasi numerik fungsi log-likelihood kustom menggunakan `scipy.optimize.minimize`.
- **Kesalahan Umum:** Menyamakan standar deviasi sampel ($s$) dengan standar error rata-rata ($SE$).

#### Chapter 18: Confidence Intervals & Effect Sizes
- **Prerequisites:** Chapter 17.
- **Learning Objectives:** Mengonstruksi dan menginterpretasikan interval kepercayaan; menghitung berbagai ukuran efek; membedakan signifikansi praktis dari signifikansi statistik.
- **Topik Utama:** Confidence interval untuk rata-rata dan selisih rata-rata (z-interval, t-interval); bootstrap CI; Cohen's d, Hedges' g, Glass's $\Delta$, Pearson's $r$, Odds Ratio, partial $\eta^2$.
- **Pondasi Formal:** Interval kepercayaan $(1 - \alpha)$:

$$\bar{x} \pm t_{\alpha/2, n-1} \cdot \frac{s}{\sqrt{n}}$$

dan Cohen's $d$:

$$d = \frac{\bar{x}_1 - \bar{x}_2}{s_{\text{pooled}}}, \quad s_{\text{pooled}} = \sqrt{\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2}}$$

- **Contoh Kasus:** Pengukuran peningkatan efisiensi kompresi algoritma: apakah selisih rata-rata 1.2% memiliki dampak praktis di industri?
- **Lab Komputasi:** Perhitungan bootstrap confidence intervals 95% dengan 10.000 resamples menggunakan Python.
- **Kesalahan Umum:** Mengartikan CI 95% sebagai "probabilitas 95% parameter populasi berada dalam rentang tersebut" (kekeliruan interpretasi Bayesian pada kerangka Frequentist).

#### Chapter 19: Hypothesis Testing & Multiple Comparisons
- **Prerequisites:** Chapters 17, 18.
- **Learning Objectives:** Menjalankan uji hipotesis null (NHST); mengidentifikasi kesalahan Type I ($\alpha$) dan Type II ($\beta$); mengoreksi inflasi error pada pengujian jamak (*multiple testing*).
- **Topik Utama:** Prosedur 5-langkah NHST, nilai p-value dan batasannya, One-sample t-test, Two-sample independent t-test, Paired t-test; Family-Wise Error Rate (FWER), False Discovery Rate (FDR), koreksi Bonferroni, Holm-Bonferroni, Benjamini-Hochberg.
- **Pondasi Formal:** Inflasi FWER pada $m$ pengujian independen:

$$\alpha_{\text{family}} = 1 - (1 - \alpha)^m$$

Prosedur Benjamini-Hochberg: mencari $k$ terbesar sedemikian rupa sehingga $P_{(k)} \leq \frac{k}{m} Q$.
- **Contoh Kasus:** Pengujian perbandingan performa 10 variasi arsitektur deep learning terhadap baseline pada benchmark citra.
- **Lab Komputasi:** Demonstrasi p-hacking interaktif dan implementasi koreksi FDR Benjamini-Hochberg via `statsmodels.stats.multitest`.
- **Kesalahan Umum:** Menguji 20 hipotesis secara simultan tanpa koreksi multiple testing dan mengklaim temuan yang memiliki $p < 0.05$ sebagai penemuan signifikan.

#### Chapter 20: Regression & Comparative Analysis
- **Prerequisites:** Chapters 17, 18, 19.
- **Learning Objectives:** Membangun model regresi linier sederhana dan berganda; memverifikasi asumsi klasik regresi Gauss-Markov; mengevaluasi goodness-of-fit.
- **Topik Utama:** Ordinary Least Squares (OLS), One-Way ANOVA, Two-Way ANOVA; asumsi Gauss-Markov: linieritas, homoskedastisitas (Breusch-Pagan test), normalitas residual (Q-Q plot), independensi (Durbin-Watson); koefisien determinasi ($R^2$, adjusted $R^2$), multikolinearitas (VIF).
- **Pondasi Formal:** Solusi matriks OLS:

$$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}, \quad \text{Var}(\hat{\boldsymbol{\beta}}) = \sigma^2 (\mathbf{X}^T \mathbf{X})^{-1}$$

- **Contoh Kasus:** Pemodelan konsumsi daya komputasi drone otonom berdasarkan kecepatan terbang, beban muatan, dan kecepatan angin.
- **Lab Komputasi:** Diagnostik regresi lengkap 4-panel (Residuals vs Fitted, Normal Q-Q, Scale-Location, Residuals vs Leverage / Cook's distance).
- **Kesalahan Umum:** Menyimpulkan kausalitas dari nilai $R^2$ yang tinggi pada data observasional yang mengandung confounding variables tak terkontrol.

#### Chapter 21: Scientific Data Visualization
- **Prerequisites:** Chapter 15.
- **Learning Objectives:** Merancang visualisasi ilmiah yang akurat secara perseptual; memilih tipe plot yang tepat untuk distribusi dan perbandingan; memastikan aksesibilitas visual.
- **Topik Utama:** Grammar of graphics, Edward Tufte principles (data-ink ratio, lie factor), visualisasi ketidakpastian (error bars, confidence bands), perbandingan distribusi (Box plot, Violin plot, Raincloud plot, Strip plot), palet warna ramah buta warna (*colorblind-safe palettes* seperti Viridis, Tol).
- **Pondasi Formal:** Teori persepsi grafis Cleveland & McGill; rasio ketidakpastian visual terhadap skala data.
- **Contoh Kasus:** Visualisasi perbandingan benchmark waktu inferensi 5 algoritma dengan raincloud plot yang menampilkan raw data, boxplot, dan kernel density secara simultan.
- **Lab Komputasi:** Pembuatan figure berstandar publikasi IEEE/Elsevier resolusi 300+ DPI menggunakan `matplotlib` dan `seaborn`.
- **Kesalahan Umum:** Menggunakan diagram batang (bar chart) untuk menyajikan data kontinu heterogen (*dynamite plots*) yang menyembunyikan distribusi dan outlier.

---

### LEVEL 4: RESEARCH EVALUATION & COMMUNICATION

#### Chapter 22: Research Results & Interpretation
- **Prerequisites:** Level 1, 2, dan 3.
- **Learning Objectives:** Menginterpretasikan hasil analisis statistik dalam konteks keilmuan; menghindari bias konfirmasi; mengapresiasi dan melaporkan hasil negatif (*negative results*).
- **Topik Utama:** Sintesis bukti empiris, interpretasi substantif vs statistik, penanganan anomali data, bahaya *HARKing* (Hypothesizing After the Results are Known), nilai akademik hasil negatif dalam mencegah publikasi bias.
- **Pondasi Formal:** Matriks keselarasan temuan terhadap hipotesis awal dan interval ketidakpastian.
- **Contoh Kasus:** Analisis kegagalan algoritma optimasi konvensional saat dihadapkan pada permukaan fungsi non-konveks berdimensi tinggi.
- **Lab Komputasi:** Framework kompilasi hasil eksperimen dan audit integritas hipotesis pra-eksperimen vs pasca-eksperimen.
- **Kesalahan Umum:** Mengubah narasi hipotesis awal secara retrospektif agar tampak selaras dengan hasil yang tidak terduga (*HARKing*).

#### Chapter 23: Experimental Evaluation & Error Analysis
- **Prerequisites:** Chapters 18, 20, 22.
- **Learning Objectives:** Mengidentifikasi dan memisahkan error sistematis dan error acak; menghitung perambatan ketidakpastian (*propagation of uncertainty*); mengevaluasi batas deteksi instrumen.
- **Topik Utama:** Systematic errors (bias/drift), random errors (noise), Guide to the Expression of Uncertainty in Measurement (GUM Type A dan Type B evaluation), hukum perambatan ketidakpastian (propagation of uncertainty), analisis sensitivitas lokal.
- **Pondasi Formal:** Formulasi perambatan ketidakpastian linier:

$$u_c^2(y) = \sum_{i=1}^n \left( \frac{\partial f}{\partial x_i} \right)^2 u^2(x_i) + 2 \sum_{i=1}^{n-1} \sum_{j=i+1}^n \frac{\partial f}{\partial x_i} \frac{\partial f}{\partial x_j} u(x_i, x_j)$$

- **Contoh Kasus:** Evaluasi ketidakpastian gabungan pengukuran daya listrik pada motor BLDC berbasis sensor arus Hall-effect dan sensor tegangan diferensial.
- **Lab Komputasi:** Modul kalkulator otomatis ketidakpastian pengukuran GUM menggunakan diferensiasi simbolik `SymPy`.
- **Kesalahan Umum:** Menjumlahkan ketidakpastian komponen secara linier sederhana tanpa memperhitungkan turunan parsial kuadratis dan korelasi antar-variabel.

#### Chapter 24: Reproducibility & Research Software Engineering
- **Prerequisites:** Level 3.
- **Learning Objectives:** Membedakan *reproducibility*, *replicability*, dan *repeatability*; menerapkan praktik Research Software Engineering (RSE); membungkus pipeline eksperimen dalam lingkungan terisolasi.
- **Topik Utama:** Krisis replikasi sains, taksonomi reproduksibilitas ACM/IEEE, kontrol seed pseudorandom, kontainerisasi (Docker), manajemen dependency (*virtual environments*, `pyproject.toml`, `requirements.lock`), versioning pipeline data (Git + DVC).
- **Pondasi Formal:** Penentuan determinisme komputasional dan fungsi hash kriptografis kondisi lingkungan eksperimen.
- **Contoh Kasus:** Membuat reproduksi 1-klik untuk eksperimen training dan evaluasi model komputasi visi menggunakan Docker dan Makefile.
- **Lab Komputasi:** Pembangunan automated reproducible pipeline dari pemuatan data, training, evaluasi statistik, hingga pembangkitan tabel paper.
- **Kesalahan Umum:** Menjalankan eksperimen komputasi tanpa mencatat `random_state` dan versi spesifik pustaka yang digunakan.

#### Chapter 25: Research Documentation & Scientific Provenance
- **Prerequisites:** Chapters 13, 24.
- **Learning Objectives:** Menyusun logbook penelitian laboratorium yang memenuhi standar forensik akademik; mengelola silsilah data (*data provenance*); membuat dokumentasi kode ilmiah yang berkelanjutan.
- **Topik Utama:** Electronic Lab Notebooks (ELN), pencatatan instrumen dan kalibrasi harian, model silsilah data W3C PROV, dokumentasi kode ilmiah (Docstrings, Sphinx, MkDocs), lisensi data dan open-source (CC-BY, MIT, Apache 2.0).
- **Pondasi Formal:** Struktur graf silsilah data: Entity $\rightarrow$ Activity $\rightarrow$ Agent.
- **Contoh Kasus:** Penyusunan logbook eksperimen kimia material sensor gas selama 6 bulan pengujian siklus termal.
- **Lab Komputasi:** Pembangkitan laporan riwayat eksekusi riset otomatis berformat Markdown dari metadata sistem.
- **Kesalahan Umum:** Mengandalkan catatan di kertas lepas yang tidak bertanggal dan tidak dapat dilacak asal-usul perubahannya.

#### Chapter 26: Scientific Writing & Academic Argumentation
- **Prerequisites:** Level 1, Level 3, Chapters 22, 23.
- **Learning Objectives:** Menyusun struktur naskah IMRaD yang koheren; menerapkan rhetorical moves (Swales CARS model); memisahkan penyajian fakta hasil dari interpretasi diskusi.
- **Topik Utama:** IMRaD (Introduction, Methods, Results, and Discussion), Swales Create-A-Research-Space (CARS) model untuk pendahuluan, penyusunan argumen berbasis klaim-bukti-penalaran (*claim-evidence-reasoning framework*), gaya penulisan ilmiah bahasa Inggris dan bahasa Indonesia baku.
- **Pondasi Formal:** Model retoris CARS: Move 1 (Establishing a territory) $\rightarrow$ Move 2 (Establishing a niche) $\rightarrow$ Move 3 (Occupying the niche).
- **Contoh Kasus:** Transformasi draf laporan eksperimen mentah menjadi naskah artikel ilmiah berkualitas standar jurnal Q1/Q2.
- **Lab Komputasi:** Analisis keterbacaan teks naskah (*Flesch-Kincaid readability score*) dan pengecekan konsistensi istilah teknis.
- **Kesalahan Umum:** Mencampuradukkan deskripsi data objektif pada bab Results dengan spekulasi interpretatif yang seharusnya berada pada bab Discussion.

#### Chapter 27: Publication & Peer Review
- **Prerequisites:** Chapter 26.
- **Learning Objectives:** Memilih target jurnal yang tepat dan menghindari jurnal predator; memahami proses editorial peer-review; menyusun respons terhadap reviewer (*rebuttal letter*) secara profesional.
- **Topik Utama:** Matriks seleksi jurnal (Scopus SJR, Clarivate JCR Impact Factor, open access APC vs subscription), proses peer review (single-blind, double-blind, open review), etika korespondensi, strategi menyusun Point-by-Point Rebuttal Matrix, hak cipta (*copyright transfer agreements* vs *Creative Commons*).
- **Pondasi Formal:** Metrik bibliometrik formal: rumus h-index, SNIP, CiteScore, dan Impact Factor.
- **Contoh Kasus:** Menghadapi ulasan tajam reviewer mengenai kekurangan kelompok kontrol dan menyusun respons yang santun disertai data tambahan.
- **Lab Komputasi:** Generator matriks tanggapan reviewer otomatis dengan pelacakan status revisi tiap butir kritik.
- **Kesalahan Umum:** Merespons masukan reviewer secara emosional atau mengabaikan butir pertanyaan sulit yang diajukan oleh mitra bebestari.

#### Chapter 28: Capstone: End-to-End Reproducible Research Project
- **Prerequisites:** Chapters 1 hingga 27 (Integrasi Menyeluruh).
- **Learning Objectives:** Mengeksekusi satu siklus riset rekayasa lengkap mulai dari identifikasi gap hingga paket naskah dan kode yang sepenuhnya reproduktif.
- **Topik Utama:** Integrasi seluruh kompetensi: Gap $\rightarrow$ Hipotesis $\rightarrow$ Experimental Design $\rightarrow$ Koleksi Data Terkalibrasi $\rightarrow$ Analisis Statistik Inferensial & Effect Size $\rightarrow$ Validasi Ketidakpastian $\rightarrow$ Naskah IMRaD $\rightarrow$ Reproducible Artifact Package.
- **Pondasi Formal:** Audit checklist kesesuaian terhadap standar pelaporan internasional (EQUATOR / IEEE Reproducibility Guidelines).
- **Contoh Kasus:** Eksekusi proyek perbandingan performa metode estimasi sinyal dalam kanal terdistorsi menggunakan data riil dan sintetik.
- **Lab Komputasi:** Repositori publik final yang berisi: data mentah, skrip Python, environment spec, logbook, dokumen naskah PDF, dan lisensi terbuka.
- **Kesalahan Umum:** Menghasilkan laporan akhir tanpa melampirkan dataset atau kode yang dapat dijalankan ulang secara independen oleh pihak lain.

---

## 4. ADVANCED EXPERIMENTAL & STATISTICAL METHODS

Kurikulum Lanjutan dirancang bagi peneliti yang membutuhkan kedalaman analisis melebihi kurikulum standar sarjana. Modul-modul ini disusun berbasis kebutuhan pembuktian matematis dan perancangan eksperimen tingkat tinggi:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   ADVANCED PREREQUISITE GRAPH                          │
├────────────────────────────────────────────────────────────────────────┤
│ Core Level 3 (Chapters 15 - 21)                                        │
│   │                                                                    │
│   ├──► A01: Advanced Probability & Statistical Inference               │
│   │     │                                                              │
│   │     ├──► A07: Nonparametric Statistical Methods                   │
│   │     ├──► A08: Bootstrap & Resampling Methods                       │
│   │     └──► A09: Bayesian Statistical Analysis                        │
│   │                                                                    │
│   ├──► A02: Power Analysis & Sample Size Estimation                    │
│   │     │                                                              │
│   │     └──► A03: Design of Experiments (DoE Foundations)              │
│   │           │                                                        │
│   │           ├──► A04: Factorial & Fractional Factorial Designs       │
│   │           ├──► A05: Randomization, Blocking & Latin Squares        │
│   │           └──► A06: Advanced ANOVA, MANOVA & Post-Hoc Contrasts    │
│   │                                                                    │
│   ├──► A10: Generalized Linear Models & Hierarchical/Mixed Effects     │
│   ├──► A11: Multiple Comparisons & False Discovery Rate (FDR)          │
│   ├──► A12: Uncertainty Quantification (UQ - Aleatoric vs Epistemic)   │
│   │     │                                                              │
│   │     └──► A13: Global Sensitivity Analysis (Sobol Indices)          │
│   │                                                                    │
│   ├──► A14: Causal Inference & Structural Causal Models (Pearl / Rubin)│
│   ├──► A15: Robust Statistical Methods & Outlier Resistance            │
│   ├──► A16: Longitudinal & Time-Series Experimental Analysis           │
│   └──► A17: Scientific Computing, Conditioning & Numerical Stability   │
└────────────────────────────────────────────────────────────────────────┘
```

### Rincian 17 Modul Lanjutan:

#### A01 — Advanced Probability & Statistical Inference
- **Prerequisites:** Core Chapters 16, 17.
- **Fokus Teori:** Teorema konvergensi (Convergence in Probability, Convergence in Distribution, Slutsky's Theorem), Delta method, Fisher Information Matrix, Cramér-Rao Lower Bound (CRLB).
- **Aplikasi Rekayasa:** Menentukan batas teoretis ketepatan estimasi parameter sensor minimum yang dapat dicapai secara fisik.

#### A02 — Power Analysis & Sample Size Estimation
- **Prerequisites:** Core Chapters 18, 19.
- **Fokus Teori:** Hubungan non-linier antara effect size ($\delta$), tingkat signifikansi ($\alpha$), kekuatan uji ($1-\beta$), dan ukuran sampel ($N$); non-central $t$, $F$, dan $\chi^2$ distributions.
- **Aplikasi Rekayasa:** Menentukan jumlah run pengujian aerodinamika di wind tunnel atau iterasi simulasi komputasi agar tidak terjadi under-powered study.

#### A03 — Design of Experiments (DoE) Foundations
- **Prerequisites:** Core Chapters 8, 12, A02.
- **Fokus Teori:** Prinsip Montgomery, Fisher's experimental axioms: replication, randomization, local control (blocking); orthogonal designs, response surface methodology (RSM) preview.
- **Aplikasi Rekayasa:** Pengaturan parameter mesin CNC atau sintering keramik untuk meminimalkan kekasaran permukaan.

#### A04 — Factorial & Fractional Factorial Experiments
- **Prerequisites:** A03.
- **Fokus Teori:** Desain faktorial penuh $2^k$, efek utama (*main effects*), interaksi 2-faktor dan 3-faktor; desain faktorial fraksional $2^{k-p}$, resolusi desain (Resolution III, IV, V), generator relasi dan aliasing (confounding pattern).
- **Aplikasi Rekayasa:** Screening 7 parameter proses manufaktur semikonduktor hanya dengan 16 kali eksperimen tanpa kehilangan informasi interaksi penting.

#### A05 — Randomization, Blocking & Replication
- **Prerequisites:** A03.
- **Fokus Teori:** Randomized Complete Block Design (RCBD), Latin Square Design, Graeco-Latin Square, Incomplete Block Design (BIBD), Split-Plot Designs.
- **Aplikasi Rekayasa:** Mengeliminasi pengaruh variasi batch bahan baku dan fluktuasi operator dalam pengujian kekuatan tarik material komposit.

#### A06 — ANOVA and Post-Hoc Comparisons
- **Prerequisites:** Core Chapter 20, A03.
- **Fokus Teori:** Dekomposisi jumlah kuadrat (Sums of Squares Type I, II, III); One-way, Two-way, Multi-way ANOVA; MANOVA; pengujian post-hoc: Tukey's Honestly Significant Difference (HSD), Scheffé, Dunnett's test (perbandingan vs kontrol), orthogonal contrasts.
- **Aplikasi Rekayasa:** Komparasi konsumsi memori dan latensi dari 4 arsitektur inferensi edge AI pada 3 jenis perangkat keras berbeda.

#### A07 — Nonparametric Statistical Methods
- **Prerequisites:** Core Chapters 16, 19.
- **Fokus Teori:** Prosedur bebas distribusi (*distribution-free tests*): Mann-Whitney U test, Wilcoxon Signed-Rank test, Kruskal-Wallis H test, Friedman test; Exact Permutation tests dan uji acak (Randomization tests).
- **Aplikasi Rekayasa:** Perbandingan keandalan algoritma pemrosesan citra pada dataset pengujian yang sangat tidak teratur (*skewed*) dengan jumlah sampel terbatas.

#### A08 — Bootstrap & Resampling Methods
- **Prerequisites:** Core Chapters 17, 18.
- **Fokus Teori:** Teori bootstrap Bradley Efron: empirical distribution function $\hat{F}_n$, plug-in principle, non-parametric bootstrap, parametric bootstrap, percentile CI, Bias-Corrected and Accelerated (BCa) bootstrap, cross-validation resampling.
- **Aplikasi Rekayasa:** Mengonstruksi interval kepercayaan 95% untuk metrik non-standar seperti rasio signal-to-interference atau parameter kurva ROC AUC.

#### A09 — Bayesian Statistical Analysis
- **Prerequisites:** A01.
- **Fokus Teori:** Teorema Bayes dalam inferensi parameter: prior distribution, likelihood function, posterior distribution; conjugate priors; Markov Chain Monte Carlo (MCMC: Metropolis-Hastings, Gibbs Sampling, NUTS via Stan/PyMC); Highest Posterior Density (HPD) Credible Intervals vs Frequentist Confidence Intervals; Bayes Factors.
- **Aplikasi Rekayasa:** Memperbarui estimasi probabilitas kegagalan sistem pengereman otonom seiring masuknya data sensor telemetri secara real-time.

#### A10 — Statistical Modeling & Generalized Linear Models (GLM)
- **Prerequisites:** Core Chapter 20, A01.
- **Fokus Teori:** Keluarga eksponensial (Exponential Dispersion Family), link functions; Logistic Regression, Poisson Regression, Negative Binomial Regression; Linear Mixed-Effects Models (LMM) dan Generalized Linear Mixed Models (GLMM) untuk data berkorelasi (*clustered/nested data*).
- **Aplikasi Rekayasa:** Pemodelan cacat visual per wafer silikon (data cacah/Poisson) dengan memperhitungkan efek acak variasi mesin litografi.

#### A11 — Multiple Comparisons & False Discovery Rate (FDR)
- **Prerequisites:** Core Chapter 19.
- **Fokus Teori:** Masalah inferensi simultan masif; Family-Wise Error Rate (FWER) tingkat lanjut: closure principle, sequential rejection; False Discovery Rate (FDR) Benjamini-Hochberg, Benjamini-Yekutieli untuk variabel dependen; Storey's positive FDR (q-value).
- **Aplikasi Rekayasa:** Penyaringan ratusan fitur spektroskopi atau ribuan piksel citra hiperspektral untuk mendeteksi kontaminasi kimiawi tanpa menghasilkan ratusan alarm palsu.

#### A12 — Uncertainty Quantification (UQ)
- **Prerequisites:** Core Chapter 23, A01.
- **Fokus Teori:** Dikotomi aleatoric uncertainty (stokastik inheren) vs epistemic uncertainty (kekurangan pengetahuan/data); Monte Carlo uncertainty propagation; Polynomial Chaos Expansion (PCE); Gaussian Process regression untuk emulasi model komputasi mahal; Conformal Prediction untuk inferensi bebas distribusi dengan jaminan cakupan finit.
- **Aplikasi Rekayasa:** Menentukan batas ketidakpastian prediksi trajectory robot otonom saat melewati medan permukaan yang tidak diketahui secara pasti.

#### A13 — Sensitivity Analysis
- **Prerequisites:** A12.
- **Fokus Teori:** Analisis sensitivitas lokal (turunan parsial terstandarisasi) vs analisis sensitivitas global; metode berbasis varians: dekomposisi Sobol (Sobol main effect indices $S_i$, total effect indices $S_{Ti}$); metode Morris (elementary effects screening).
- **Aplikasi Rekayasa:** Mengidentifikasi 3 parameter fisik krusial dari 30 variabel simulasi termal baterai kendaraan listrik yang paling dominan mempengaruhi risiko *thermal runaway*.

#### A14 — Causal Inference & Structural Causal Models
- **Prerequisites:** Core Chapters 6, 20, A01.
- **Fokus Teori:** Rubin Causal Model (Potential Outcomes framework, Average Treatment Effect - ATE, Counterfactuals); Pearl's Structural Causal Models (SCMs), do-calculus, d-separation, backdoor criterion, frontdoor criterion; Instrumental Variables, Propensity Score Matching (PSM), Difference-in-Differences (DiD).
- **Aplikasi Rekayasa:** Memisahkan efek langsung pembaruan firmware terhadap efisiensi energi motor listrik dari efek perancu variasi suhu udara ambien.

#### A15 — Robust Statistical Methods
- **Prerequisites:** Core Chapters 15, 20.
- **Fokus Teori:** Titik kerusakan (*breakdown point*), fungsi pengaruh (*influence function*); M-estimators, Huber loss, Tukey's biweight; Least Trimmed Squares (LTS), Theil-Sen estimator untuk regresi tahan outlier; robust covariance estimation (Minimum Covariance Determinant - MCD).
- **Aplikasi Rekayasa:** Estimasi orientasi posisi robot (odometri) menggunakan data sensor GPS/IMU yang kerap mengalami lonjakan pembacaan sesaat (*spurious spikes/outliers*).

#### A16 — Longitudinal & Time-Series Experiments
- **Prerequisites:** Core Chapter 20, A10.
- **Fokus Teori:** Desain pengukuran berulang (*repeated measures*); korelasi temporal dan autokorelasi (ACF, PACF); stasioneritas (Augmented Dickey-Fuller test); model autoregresif eksplanatori (ARMAX); pemodelan state-space dan Kalman Filter dalam kerangka eksperimen longitudinal.
- **Aplikasi Rekayasa:** Memantau laju keausan bantalan poros mesin (*bearing degradation*) sepanjang 1.000 jam pengujian vibrasi kontinu.

#### A17 — Scientific Computing & Numerical Validation
- **Prerequisites:** Core Chapter 24.
- **Fokus Teori:** Aritmatika floating-point IEEE 754, kesalahan pembulatan (*round-off errors*), pembatalan katastropik (*catastrophic cancellation*); bilangan kondisi matriks (*matrix condition number* $\kappa(\mathbf{A})$); kestabilan numerik algoritma optimasi; metodologi validasi benchmarking komputasi (profil performa Dolan-Moré).
- **Aplikasi Rekayasa:** Memvalidasi bahwa algoritma inversi matriks kovarians pada Kalman filter tidak menghasilkan varians negatif akibat ketidakstabilan numerik.

---

## 5. RESEARCH SPECIALIZATION TRACKS

Specialization Tracks (S1 - S6) bukan materi fundamental yang berdiri sendiri, melainkan **jalur penerapan metodologi ilmiah** pada subdisiplin rekayasa spesifik.

### Track S1 — Engineering Experimental Methods
- **Fokus:** Kalibrasi instrumen, rantai ketertelusuran metrologi (*metrological traceability*), evaluasi ketidakpastian GUM Type A & B, repeatability and reproducibility (Gauge R&R), desain rig uji fisik, instrumentasi data acquisition (DAQ).
- **Penerapan Metodologis:** Menentukan apakah variasi hasil uji kekuatan tarik komposit berasal dari variasi material nyata atau dari ketidakstabilan sensor load cell dan operator uji.

### Track S2 — AI & Machine Learning Research Methods
- **Fokus:** Pencegahan *data leakage* (leakage fitur, leakage temporal, leakage preprocessing), validasi silang bertingkat (*stratified k-fold, grouped k-fold*), penentuan baseline kuat, seleksi benchmark independen, optimasi hyperparameter tanpa overfitting (Nested CV), uji signifikansi komparasi model (McNemar's test, 5x2 cv paired t-test), analisis ablasi ketat (*ablation studies*).
- **Penerapan Metodologis:** Menguji klaim keunggulan arsitektur deep learning baru terhadap 5 model SOTA dengan jaminan bebas bias pemisahan data (*train-test contamination*).

### Track S3 — Computer Vision Research Methodology
- **Fokus:** Metrik evaluasi deteksi, klasifikasi, segmentasi, dan tracking (Precision-Recall curve, mAP@IoU[0.5:0.95], Panoptic Quality, MOTA, HOTA); evaluasi kestabilan temporal; pergeseran domain (*domain shift / covariate shift*); eksperimen ketahanan terhadap degradasi visual (blur, noise, variasi iluminasi); benchmark visi yang sepenuhnya terstandarisasi.
- **Penerapan Metodologis:** Membuktikan bahwa algoritma deteksi cacat permukaan jalan tetap tangguh saat diuji pada domain citra yang belum pernah dilihat sebelumnya (*out-of-distribution evaluation*).

### Track S4 — Signal Processing & Sensing Experiments
- **Fokus:** Akuisisi sinyal, batas laju cuplik Nyquist-Shannon, kalibrasi sensor dinamis, pembentukan ground truth sinkron, estimasi Signal-to-Noise Ratio (SNR), evaluasi performa filter (Bessel, Butterworth, Chebyshev) vs Kalman filter, batasan estimasi fisik Cramér-Rao Lower Bound (CRLB).
- **Penerapan Metodologis:** Validasi eksperimental akurasi estimasi detak jantung menggunakan sensor photoplethysmography (PPG) di bawah gangguan artefak gerak (*motion artifacts*).

### Track S5 — Remote Sensing & Geospatial Research
- **Fokus:** Autokorelasi spasial (Moran's I), pencegahan *spatial data leakage* melalui spatial cross-validation (*buffer-based splitting*), evaluasi akurasi tematik (Confusion Matrix, Overall Accuracy, Producer's/User's Accuracy, kritik terhadap penggunaan Cohen's Kappa pada geospatial), trade-off resolusi spasial-spektral-temporal.
- **Penerapan Metodologis:** Mengembangkan model klasifikasi tutupan lahan berbasis citra satelit multispektral dengan jaminan unit sampel validasi terisolasi secara spasial dari data pelatihan.

### Track S6 — Scientific Publication & Research Management
- **Fokus:** Sintesis pemetaan literatur berbasis pedoman sistematis, arsitektur naskah ilmiah tingkat lanjut, manajemen proyek riset jangka panjang, strategi rilis data dan open-source (Zenodo, OSF), tata kelola kepengarangan dan etika publikasi, korespondensi penyuntingan dan manajemen revisi mayor/minor.
- **Penerapan Metodologis:** Mengelola konsorsium riset multi-disiplin untuk menghasilkan paket publikasi bereputasi tinggi yang dilengkapi dataset terverifikasi dan repositori kode yang siap diaudit.

---

## 6. RESEARCH & PHD LEARNING PATHS

Jalur pembelajaran mandiri berbasis aksi nyata bagi mahasiswa doktoral dan calon peneliti independen:

### R1 — Reading & Critically Evaluating Research Papers
- **Objektif:** Menguasai pembacaan naskah ilmiah secara efisien dan kritis; mengidentifikasi kelemahan metodologi tersembunyi, klaim yang berlebihan (*overclaiming*), dan asumsi yang tidak diverifikasi.
- **Silabus Praktik:**
  - Metode pembacaan 3-fase (*three-pass reading technique* Keshav).
  - Taksonomi kelemahan metodologis: *cherry-picking data, improper baselines, lack of error bars, metric mismatch*.
  - Rubrik evaluasi kritis naskah: Relevansi $\rightarrow$ Ketegasan Hipotesis $\rightarrow$ Ketepatan Desain $\rightarrow$ Bukti Empiris $\rightarrow$ Batasan Studi.
- **Output Portofolio:** *Critical Paper Review Report* berisi ulasan mendalam atas 3 artikel bereputasi tinggi di bidang masing-masing.

### R2 — Reproducing Published Research
- **Objektif:** Mengeksekusi replikasi komputasional atas artikel yang telah dipublikasikan; mendokumentasikan disparitas antara hasil yang dilaporkan di paper dengan hasil eksekusi independen.
- **Silabus Praktik:**
  - Prosedur isolasi lingkungan komputasi (identifikasi library mentah, CUDA dependencies, containerization).
  - Verifikasi integritas data publik vs pre-processing pipeline pengarang asli.
  - Dokumentasi disparitas hasil dan analisis sensitivitas terhadap *hyperparameter unmentioned*.
- **Output Portofolio:** *Reproduction Audit Package* berisi repositori kode yang berhasil mereplikasi kurva/tabel utama paper rujukan disertai catatan deviasi teknis.

### R3 — Designing a Novel Research Contribution
- **Objektif:** Merumuskan kontribusi ilmiah asli (*original scientific contribution*) dengan memetakan posisi riset secara presisi terhadap batas keilmuan terkini (*frontier*).
- **Silabus Praktik:**
  - Formulasi *Delta Statement*: $\Delta = \text{Our Method} - \text{SOTA Baseline}$.
  - Identifikasi tipe kontribusi: konseptual/teoretis, algoritmik/metodologis, atau pengujian empiris berskala baru.
  - Konstruksi hipotesis eksperimental tandingan (*competing hypotheses*) dan kriteria falsifikasi diri.
- **Output Portofolio:** *Novelty Positioning Manifesto* dan desain arsitektur eksperimen untuk validasi usulan inovasi.

### R4 — Advanced Research Evaluation
- **Objektif:** Menjalankan evaluasi komparatif komprehensif yang tidak dapat disanggah oleh reviewer jurnal papan atas; membongkar kontribusi tiap komponen melalui studi ablasi.
- **Silabus Praktik:**
  - Matriks eksperimen ablasi sistematis: pengujian komponen $A, B, C$ secara isolasi dan kombinasi ($A, A+B, A+C, A+B+C$).
  - Pengujian sensitivitas terhadap variasi random seeds (distribusi performa over 10+ runs, bukan single best run).
  - Evaluasi ketahanan (*robustness testing*) pada kondisi degradasi ekstrem dan evaluasi kegagalan (*failure case taxonomy*).
- **Output Portofolio:** *Comprehensive Evaluation & Ablation Report* yang menyajikan bukti signifikansi statistik, effect size, dan batas kegagalan metode.

### R5 — Writing & Publishing Research Articles
- **Objektif:** Mentransformasi bukti empiris menjadi naskah artikel ilmiah yang memikat, terstruktur secara logis, dan memenuhi standar transparansi jurnal bereputasi tinggi.
- **Silabus Praktik:**
  - Pemetaan Klaim-ke-Bukti (*Claims-to-Evidence Mapping*): memastikan setiap kalimat klaim pada Abstract didukung langsung oleh figur atau tabel pada Results.
  - Penulisan naskah interaktif: penyusunan narasi Discussion yang menempatkan hasil dalam konteks literatur global.
  - Penyusunan naskah suplementer (*Supplementary Material*): detail matematis lengkap, konfigurasi hyperparameter, dan pembuktian tambahan.
- **Output Portofolio:** Draf lengkap naskah artikel ilmiah berstandar LaTeX yang siap disubmit ke jurnal Q1/Q2.

### R6 — PhD Research Planning & Execution
- **Objektif:** Menyusun strategi riset doktoral 3-4 tahun; mengelola kesinambungan publikasi (*thesis-by-publication*); menjaga motivasi dan integritas akademik jangka panjang.
- **Silabus Praktik:**
  - Dekomposisi tema doktoral besar menjadi 3-4 pertanyaan riset koheren yang masing-masing bermuara pada satu artikel jurnal mandiri.
  - Penyusunan peta jalan (*PhD Research Roadmap*) dengan milestone tahunan dan kriteria terminasi dini (*kill criteria*) untuk jalur riset buntu.
  - Manajemen relasi akademik dengan promotor/supervisor dan strategi mitigasi risiko kegagalan eksperimen.
- **Output Portofolio:** *PhD 3-Year Strategic Research Roadmap* yang mencakup Gantt chart detail, matriks publikasi, dan rencana diseminasi ilmiah.

---

## 7. KATALOG PRACTICAL RESEARCH LABORATORIES

13 modul laboratorium interaktif komputasional berbasis Python dengan data riil atau simulasi terverifikasi (bebas angka palsu):

| Lab Code | Judul Laboratorium | Fokus Metodologis | Alat & Library Python |
| :--- | :--- | :--- | :--- |
| **LAB-01** | NHST Pitfalls & P-Value Misconceptions | Visualisasi sebaran p-value di bawah $H_0$ (seragam) vs $H_1$ (menceng); demonstrasi bahaya *optional stopping*. | `numpy`, `scipy.stats`, `matplotlib` |
| **LAB-02** | Confidence Intervals & True Coverage Simulation | Simulasi 10.000 interval kepercayaan untuk membuktikan makna frekuensi cakupan sejati $95\%$. | `numpy`, `scipy.stats`, `seaborn` |
| **LAB-03** | Effect Size vs Sample Size Playground | Eksplorasi interaktif Cohen's d: membedakan efek besar pada sampel kecil vs efek sepele pada sampel masif. | `numpy`, `pingouin`, `matplotlib` |
| **LAB-04** | Sampling Bias & Selection Distortion Simulator | Demonstrasi timbulnya korelasi semu akibat bias seleksi (Berkson's fallacy) dan sampling non-acak. | `pandas`, `seaborn` |
| **LAB-05** | Statistical Power & Sample Size Calculator | Kurva kekuatan uji interaktif; penentuan $N$ minimum untuk mendeteksi $\delta$ tertentu pada $\alpha=0.05$. | `statsmodels.stats.power`, `matplotlib` |
| **LAB-06** | Monte Carlo Experimentation & Error Propagation | Perambatan ketidakpastian non-linier melalui simulasi Monte Carlo vs perambatan diferensial Taylor GUM. | `numpy`, `sympy`, `scipy` |
| **LAB-07** | Regression Diagnostics & Residual Forensics | Deteksi pelanggaran asumsi OLS: heteroskedastisitas, non-linieritas, leverage point, dan autokorelasi residual. | `statsmodels.api`, `seaborn` |
| **LAB-08** | Cross-Validation & Data Leakage Demonstrator | Eksperimen terukur: membandingkan akurasi uji saat penskalaan fitur dilakukan sebelum vs di dalam loop CV (kebocoran 15-20%). | `scikit-learn`, `numpy` |
| **LAB-09** | Rigorous Benchmark Comparison of Algorithms | Uji perbandingan non-parametrik jamak (Friedman test + Nemenyi post-hoc) dan pembuatan Critical Difference Diagrams. | `scipy.stats`, `scikit-posthocs`, `matplotlib` |
| **LAB-10** | Systematic Ablation Study Design | Desain dan visualisasi matriks pengujian ablasi multi-komponen untuk membedah kontribusi modul algoritma. | `pandas`, `seaborn` |
| **LAB-11** | Uncertainty Quantification in Predictions | Pembangkitan interval prediksi bebas distribusi menggunakan *Conformal Prediction* dengan jaminan cakupan finit. | `numpy`, `scikit-learn`, `nonconformist` / manual |
| **LAB-12** | Factorial Experiment Analysis ($2^3$ Design) | Perhitungan efek utama dan interaksi DoE, konstruksi tabel ANOVA eksperimental, dan plot interaksi dua arah. | `statsmodels.formula.api`, `matplotlib` |
| **LAB-13** | End-to-End Reproducible Experiment Pipeline | Repositori proyek terisolasi: download data $\rightarrow$ preprocess $\rightarrow$ fit $\rightarrow$ hypothesis test $\rightarrow$ generate paper figure. | `Git`, `venv`, `click`/`argparse`, `matplotlib` |

---

## 8. INVENTARIS RESEARCH TEMPLATES

14 template operasional standar yang siap diunduh dan digunakan dalam riset nyata:

1. **TMPL-01: Research Proposal Specification Template**  
   Format terstruktur mencakup: Latar belakang masalah, Rumusan masalah (FINER), Pertanyaan riset, State-of-the-Art, Metodologi (desain, variabel, instrumen), Matriks keselarasan riset, dan Rencana mitigasi risiko.
2. **TMPL-02: Systematic Literature Review Matrix**  
   Tabel sintesis literatur multidimensi: Sitasi, Tujuan, Metodologi, Dataset/Instrumen, Metrik Evaluasi, Hasil Kunci, Keterbatasan yang Diakui, dan Relevansi terhadap Riset Peneliti.
3. **TMPL-03: Research Gap & Novelty Formulation Matrix**  
   Template identifikasi celah: Kategori gap, Bukti literatur pendukung, Keterbatasan solusi saat ini, Solusi usulan, dan Formulasi pernyataan kebaruan (*Novelty Claim Statement*).
4. **TMPL-04: Experimental Design Plan (EDP)**  
   Dokumen perancangan sebelum eksperimen dimulai: Hipotesis spesifik, Unit eksperimen, Faktor & Level, Rancangan perlakuan (CRD, RCBD, Faktorial), Variabel kontrol, Prosedur pengacakan, dan Perhitungan power analysis awal.
5. **TMPL-05: Data Collection & Calibration Protocol**  
   Standard Operating Procedure (SOP) pengumpulan data: Prosedur kalibrasi instrumen, Sertifikat kalibrasi, Kondisi lingkungan ambien (suhu, kelembaban), Langkah pengambilan sampel, dan Protokol penanganan anomali.
6. **TMPL-06: Dataset Documentation Card (Datasheets for Datasets Standard)**  
   Dokumentasi data standar Gebru et al.: Motivasi pembentukan dataset, Komposisi data, Proses koleksi data, Preprocessing/pembersihan, Penggunaan yang disarankan dan dilarang, serta Distribusi & pemeliharaan.
7. **TMPL-07: Experimental Logbook & Run Sheet**  
   Lembar pencatatan langsung uji laboratorium: Run ID, Tanggal & Jam, Operator, Konfigurasi parameter perlakuan, Pembacaan sensor mentah, Catatan kejadian tak terduga, dan Tanda tangan/hash integritas data.
8. **TMPL-08: Statistical Analysis Plan (SAP) Protocol**  
   Protokol pra-analisis untuk mencegah p-hacking: Kriteria inklusi/eksklusi data, Metode penanganan missing data dan outlier, Uji statistik spesifik yang akan dijalankan, Tingkat $\alpha$ dan koreksi multiple testing, serta Kriteria signifikansi praktis.
9. **TMPL-09: Benchmark Evaluation & Comparison Report**  
   Format baku pelaporan perbandingan algoritma/metode: Deskripsi baseline pembanding, Karakteristik dataset benchmark, Metrik performa, Hasil pengujian signifikansi statistik (p-value, effect size, confidence intervals), dan Analisis trade-off kompleksitas komputasi.
10. **TMPL-10: Component Ablation Study Report**  
    Format pengujian dekonstruksi sistem: Deskripsi modul $M_1, M_2, \dots, M_k$, Matriks konfigurasi ablasi, Hasil evaluasi performa per varian, Pembahasan kontribusi marjinal masing-masing modul, dan Identifikasi modul yang tidak esensial.
11. **TMPL-11: Reproducibility Checklist & Artifact Descriptor**  
    Daftar periksa verifikasi reproduksibilitas: Spesifikasi perangkat keras/lunak, Panduan instalasi dependensi, Random seeds yang digunakan, Lokasi repositori data terbuka, Script 1-klik untuk mereproduksi tabel & figur utama.
12. **TMPL-12: Scientific Manuscript Outline (IMRaD with Claims-Evidence Map)**  
    Kerangka naskah jurnal: Rencana judul, Abstract terstruktur, CARS model Introduction, Rincian Methods yang dapat direplikasi, Kerangka figur/tabel Results, Narasi interpretatif Discussion, dan Kesimpulan berbasis bukti.
13. **TMPL-13: Reviewer Response & Rebuttal Matrix**  
    Tabel korespondensi revisi: Nomor komentar reviewer, Kutipan komentar asli reviewer, Tanggapan logis pengarang, Perubahan spesifik yang dilakukan pada naskah (disertai nomor halaman dan baris), serta Data tambahan pendukung.
14. **TMPL-14: PhD 3-Year Research Roadmap & Milestone Tracker**  
    Perencanaan jangka panjang studi doktoral: Peta pohon masalah besar, Pembagian 3 sub-proyek riset, Target publikasi berkala, Milestone semesteran, Rencana partisipasi konferensi, dan Kriteria evaluasi kemajuan riset.

---

## 9. STANDAR METROLOGI DAN REFERENSI AKADEMIK TERVERIFIKASI

Seluruh konten akademik dalam Learning Hub ini bersandar pada literatur primer berbobot tinggi:

### Standar Eksperimen, Desain & Statistika Terapan:
- **Montgomery, D. C. (2017).** *Design and Analysis of Experiments* (9th ed.). John Wiley & Sons. (Rujukan utama perancangan eksperimen industri dan rekayasa).
- **Box, G. E., Hunter, J. S., & Hunter, W. G. (2005).** *Statistics for Experimenters: Design, Innovation, and Discovery* (2nd ed.). Wiley-Interscience. (Rujukan klasik inferensi induktif dan eksperimen fisik).
- **Cohen, J. (1988).** *Statistical Power Analysis for the Behavioral Sciences* (2nd ed.). Lawrence Erlbaum Associates. (Rujukan foundational power analysis dan effect size).
- **Gelman, A., Carlin, J. B., Stern, H. S., Dunson, D. B., Vehtari, A., & Rubin, D. B. (2013).** *Bayesian Data Analysis* (3rd ed.). Chapman and Hall/CRC. (Rujukan pemodelan dan komputasi Bayesian).
- **Pearl, J. (2009).** *Causality: Models, Reasoning, and Inference* (2nd ed.). Cambridge University Press. (Rujukan kausalitas dan Structural Causal Models).
- **NIST/SEMATECH (2012).** *e-Handbook of Statistical Methods*. National Institute of Standards and Technology. (Panduan komprehensif teknik statistik untuk praktisi rekayasa).

### Standar Metrologi dan Pengukuran:
- **JCGM 100:2008 (GUM 1995 with minor corrections).** *Evaluation of measurement data — Guide to the expression of uncertainty in measurement*. Joint Committee for Guides in Metrology / BIPM. (Standar dunia untuk evaluasi dan pernyataan ketidakpastian pengukuran).
- **ISO/IEC 17025:2017.** *General requirements for the competence of testing and calibration laboratories*. (Standar mutu laboratorium pengujian dan kalibrasi).

### Etika, Integritas & Pelaporan Ilmiah:
- **Committee on Publication Ethics (COPE).** *Core practices and guidelines for journal editors and authors*.
- **EQUATOR Network Guidelines.** *Enhancing the QUAlity and Transparency Of health and engineering Research* (pedoman pelaporan transparan).
- **ACM & IEEE.** *Codes of Ethics and Professional Conduct & Author Digital Library Guidelines*.
- **Wilkinson, M. D., et al. (2016).** *The FAIR Guiding Principles for scientific data management and stewardship*. Scientific Data, 3, 160018.

---

## 10. ARSITEKTUR WEBSITE DAN ANTI-SLOP ACADEMIC DESIGN SYSTEM

Website Learning Hub dibangun dengan spesifikasi ramah GitHub Pages tanpa layanan berbayar:

### A. Filosofi Visual Anti-Slop
- **Bebas AI Template Tropes:** Tidak menggunakan gradien ungu-biru generik, tidak menggunakan efek kaca (*glassmorphism*) berlebihan, tidak menggunakan terminal palsu di hero section, dan tidak menggunakan badge dekoratif tanpa fungsi.
- **Tipografi Berwibawa:** Memilih tipografi berketerbacaan tinggi untuk membaca artikel panjang (Serif berkelas untuk naskah ilmiah seperti *Charter* / *Source Serif*, sans-serif bersih untuk navigasi, dan *JetBrains Mono* / *Fira Code* untuk ekspresi matematika dan blok kode).
- **Rasio Kontras WCAG AA:** Semua teks memenuhi kontras minimal 4.5:1 terhadap latar belakang (dan 3:1 untuk teks besar). Tidak ada teks abu-abu terang di atas latar abu-abu.
- **Eliminasi Tanda Baca Em Dash:** Selaras dengan pedoman anti-slop, dilarang menggunakan karakter em dash (`—`) dalam teks naratif atau antarmuka. Digantikan dengan tanda baca koma, titik, titik dua, atau tanda kurung.
- **Zero Dead Controls:** Semua tombol, tab, tautan, dan elemen interaktif berfungsi nyata atau tidak ditampilkan sama sekali.
- **Respon Cepat & Aksesibel:** Desain responsif sempurna di perangkat seluler (target sentuh minimal 44px, tanpa overflow horizontal), dan dapat dinavigasi penuh menggunakan keyboard (`Tab`, `Shift+Tab`, `Enter`).

### B. Arsitektur Komputasi dan Rendering
- **Static Site Engine:** Kompatibel murni dengan generator statis GitHub Pages (Jekyll/Hugo/MkDocs Material atau Vite/HTML murni).
- **Mathematical Engine:** Menggunakan **KaTeX** untuk akselerasi rendering rumus LaTeX sisi klien (ringan, instan, tanpa flickering MathJax).
- **Offline / Low-Bandwidth Capable:** Aset skrip dan gaya terminimalisir, memastikan dapat diakses lancar di area dengan koneksi internet terbatas.
- **Export Engine:** Disediakan stylesheet cetak khusus (`@media print`) yang bersih dan rapi untuk memudahkan pencetakan langsung setiap chapter menjadi berkas PDF berkualitas buku saku.

---

## 11. MATRIKS INTEGRASI LINTAS LEARNING HUB ITERA

Learning Hub ini berfungsi sebagai **Platform Fondasi Metodologis** bagi rangkaian Learning Hub lain di ITERA:

| Learning Hub ITERA | Peran Hub Metodologi Riset | Titik Tautan / Cross-Reference |
| :--- | :--- | :--- |
| **Python Learning Hub** | Menyediakan landasan ilmiah untuk komputasi numerik dan simulasi data. | Menghubungkan Chapter 15-21 dan modul Lab Komputasi ke dasar sintaks Python & NumPy di Python Hub. |
| **AI Learning Hub** | Menyediakan metodologi evaluasi, validasi silang, dan pembuktian signifikansi algoritma AI. | Track S2 (AI Research Methods) menjadi rujukan verifikasi bebas data leakage bagi proyek-proyek di AI Hub. |
| **Multimedia & Computer Vision Hub** | Memberikan standar benchmark, metrik evaluasi visi (mAP, IoU), dan analisis ablasi. | Track S3 (Computer Vision Research Methodology) menjadi standar metodologi tugas akhir dan riset visi di CV Hub. |
| **IoT Learning Hub** | Menyediakan metode kalibrasi sensor, estimasi ketidakpastian pengukuran (GUM), dan penanganan noise sinyal. | Track S1 & S4 menjadi panduan eksperimen pengujian hardware dan transmisi telemetri di IoT Hub. |
| **Signal Processing Hub** | Menyediakan landasan matematis estimasi sinyal dalam noise, batas CRLB, dan validasi filter. | Track S4 (Signal Processing Experiments) memperkuat desain eksperimen uji sinyal. |
| **Remote Sensing & Geospatial Hub** | Mengatasi autokorelasi spasial, spatial data leakage, dan akurasi klasifikasi matriks kontingensi. | Track S5 (Remote Sensing Research) menjadi landasan analisis geospasial yang valid secara ilmiah. |

*Kebijakan Batas:* Learning Hub ini tidak akan menduplikasi tutorial sintaks pemrograman dasar atau penjelasan detail arsitektur convolutional neural network yang sudah dibahas tuntas di Hub lain. Fokusnya murni pada perancangan riset, pengujian statistik, pembuktian kebaruan, dan reproduksibilitas.

---

## 12. ROADMAP IMPLEMENTASI DAN QUALITY ASSURANCE GATES

Pengembangan proyek ini dibagi menjadi 6 fase bertahap dengan mekanisme persetujuan eksplisit (*Approval Gates*):

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PHASE 0: Master Curriculum & Academic Planning (SELESAI / REVIEW)      │
│ Gate 0: Persetujuan formal Master Curriculum oleh Project Creator       │
├─────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: Website Foundation & Academic Design System                    │
│ Gate 1: Verifikasi arsitektur navigasi, rendering KaTeX & anti-slop UI  │
├─────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: Core Curriculum Production (Batches 1 - 4)                     │
│ Gate 2: Verifikasi akurasi matematis, studi kasus & lab Chapters 1-28   │
├─────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: Advanced Curriculum & Specialization Tracks (A01-A17 & S1-S6)  │
│ Gate 3: Audit ketelitian DoE, Bayesian, Causal & track engineering      │
├─────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: Practical Research Laboratories & Templates (Labs & TMPL)      │
│ Gate 4: Uji eksekusi 13 script lab Python & verifikasi 14 template     │
├─────────────────────────────────────────────────────────────────────────┤
│ PHASE 5: Public Deployment & Verification                               │
│ Gate 5: Persetujuan final rilis dan deployment ke GitHub Pages          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Kriteria Kelulusan Tiap Gerbang (Gate Checklist):
- **Gate 0 (Saat Ini):** Kesepakatan atas struktur 28 Chapter Inti, 17 Modul Lanjutan, 6 Spesialisasi, 6 PhD Paths, 13 Labs, dan 14 Templates.
- **Gate 1:** Shell website statis berfungsi sempurna, lolos uji kontras WCAG AA, rendering matematika KaTeX tanpa error, struktur navigasi hierarkis siap pakai.
- **Gate 2:** Produksi materi Core per batch 7 chapter; setiap chapter memiliki formulasi matematis, contoh hitungan numerik, dan skrip Python yang telah diverifikasi run-nya.
- **Gate 3:** Produksi materi tingkat lanjut (DoE, Bayesian, Causal) dan 6 Spesialisasi rekayasa dengan verifikasi bebas error konseptual.
- **Gate 4:** Seluruh 13 skrip lab Python dapat dijalankan pada lingkungan bersih (*clean virtual environment*); seluruh 14 template telah dilengkapi contoh kasus nyata.
- **Gate 5:** Audit tautan mati (*broken link check*), audit performa visual di perangkat mobile, dan persetujuan eksplisit dari Aji Pamungkas Tri Nurcahyo untuk mempublikasikan repositori secara publik.

