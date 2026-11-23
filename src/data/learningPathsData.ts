import { LearningPath } from '../types/curriculum';

export const LEARNING_PATHS: LearningPath[] = [
  {
    "id": "LP-01",
    "title": "Undergraduate Thesis & Capstone Research Path",
    "targetAudience": "Mahasiswa program sarjana (S1) yang sedang menyusun proposal, mengeksekusi penelitian laboratorium/komputasi Tugas Akhir, atau Capstone Design Project di ITERA.",
    "category": "undergraduate",
    "entryRequirements": "Pemahaman dasar aljabar linier dan kemampuan pemrograman dasar tingkat satu.",
    "requiredCompetencies": [
      "COMP-FND-01",
      "COMP-FND-05",
      "COMP-APP-01",
      "COMP-APP-05",
      "COMP-IND-03"
    ],
    "requiredChapterIds": [
      "CH-01",
      "CH-02",
      "CH-03",
      "CH-05",
      "CH-06",
      "CH-07",
      "CH-08",
      "CH-09",
      "CH-10",
      "CH-12",
      "CH-14",
      "CH-15",
      "CH-16",
      "CH-19",
      "CH-20",
      "CH-23",
      "CH-48"
    ],
    "optionalChapterIds": [
      "CH-04",
      "CH-11",
      "CH-24",
      "CH-49"
    ],
    "practicalAssignments": [
      "Menyusun Problem Scoping Matrix dan Research Alignment Matrix.",
      "Melakukan audit PRISMA 2020 terhadap minimal 15 artikel bereputasi.",
      "Menjalankan analisis EDA, uji hipotesis komparatif, dan perhitungan Cohen's d pada data Tugas Akhir.",
      "Menyusun naskah draft proposal atau draf artikel IMRaD lengkap."
    ],
    "finalOutcomes": "Mampu merancang eksperimen Tugas Akhir yang bebas bias, menganalisis data empiris dengan inferensi statistik yang valid, dan menyusun laporan ilmiah yang memenuhi integritas akademik.",
    "assessableDeliverables": "Dokumen Proposal Tugas Akhir / Capstone lengkap dan Repositori Data Eksperimen terverifikasi."
  },
  {
    "id": "LP-02",
    "title": "Engineering Experimental & Physical Metrology Path",
    "targetAudience": "Dosen, asisten laboratorium, dan mahasiswa tingkat akhir yang menjalankan eksperimen pada rig uji fisik, sistem mekanik, sensorik, atau instrumen elektronika.",
    "category": "advanced-engineering",
    "entryRequirements": "Dasar kalkulus multivariabel dan fisika eksperimental.",
    "requiredCompetencies": [
      "COMP-APP-01",
      "COMP-APP-02",
      "COMP-EXP-01",
      "COMP-EXP-02",
      "COMP-EXP-03"
    ],
    "requiredChapterIds": [
      "CH-08",
      "CH-09",
      "CH-10",
      "CH-11",
      "CH-12",
      "CH-13",
      "CH-16",
      "CH-19",
      "CH-20",
      "CH-23",
      "CH-24",
      "CH-26",
      "CH-28",
      "CH-29",
      "CH-30",
      "CH-31",
      "CH-48"
    ],
    "optionalChapterIds": [
      "CH-25",
      "CH-27",
      "CH-41"
    ],
    "practicalAssignments": [
      "Mengkalibrasi sensor fisik dan membangun kurva kalibrasi tertelusur SI.",
      "Menyusun tabel Uncertainty Budget berstandar GUM Type A & B.",
      "Merancang dan menganalisis eksperimen faktorial $2^k$ untuk optimasi parameter proses fisik."
    ],
    "finalOutcomes": "Mampu merancang rig pengujian fisik terkontrol, mengkuantifikasi ketidakpastian instrumen sesuai standar internasional GUM, dan mengoptimalkan parameter eksperimen via DoE.",
    "assessableDeliverables": "Laporan Evaluasi Ketidakpastian Pengukuran GUM dan Rancangan DoE Faktorial lengkap dengan analisis ANOVA."
  },
  {
    "id": "LP-03",
    "title": "Statistical Modeling & Data Analysis Path",
    "targetAudience": "Peneliti data kuantitatif, analis data rekayasa, dan akademisi yang berfokus pada pemodelan statistik inferensial mendalam.",
    "category": "advanced-engineering",
    "entryRequirements": "Aljabar matriks dan kalkulus probabilitas.",
    "requiredCompetencies": [
      "COMP-APP-04",
      "COMP-APP-05",
      "COMP-EXP-02",
      "COMP-EXP-03",
      "COMP-EXP-04",
      "COMP-DOC-02"
    ],
    "requiredChapterIds": [
      "CH-16",
      "CH-17",
      "CH-18",
      "CH-19",
      "CH-20",
      "CH-21",
      "CH-22",
      "CH-23",
      "CH-24",
      "CH-25",
      "CH-26",
      "CH-27",
      "CH-38",
      "CH-39",
      "CH-44"
    ],
    "optionalChapterIds": [
      "CH-28",
      "CH-29",
      "CH-42",
      "CH-43"
    ],
    "practicalAssignments": [
      "Menjalankan 4-panel regression diagnostics dan mengatasi pelanggaran asumsi Gauss-Markov.",
      "Membangun Generalized Linear Mixed Model (GLMM) untuk data pengukuran berulang.",
      "Mengonstruksi bootstrap confidence intervals (BCa) dan koreksi False Discovery Rate (FDR)."
    ],
    "finalOutcomes": "Mampu membangun dan mengevaluasi model linier, GLM, dan mixed-effects, serta menerapkan inferensi parametrik dan non-parametrik yang tahan outlier.",
    "assessableDeliverables": "Notebook Analisis Pemodelan Statistik Komprehensif dengan diagnostik residual lengkap."
  },
  {
    "id": "LP-04",
    "title": "AI & Machine Learning Research Methodology Path",
    "targetAudience": "Peneliti dan mahasiswa yang mengembangkan, memodifikasi, atau mengevaluasi model machine learning dan deep learning untuk aplikasi rekayasa.",
    "category": "advanced-engineering",
    "entryRequirements": "Pemrograman Python tingkat lanjut dan konsep dasar machine learning.",
    "requiredCompetencies": [
      "COMP-IND-01",
      "COMP-IND-02",
      "COMP-EXP-04",
      "COMP-DOC-02"
    ],
    "requiredChapterIds": [
      "CH-05",
      "CH-14",
      "CH-16",
      "CH-19",
      "CH-20",
      "CH-21",
      "CH-22",
      "CH-32",
      "CH-33",
      "CH-34",
      "CH-35",
      "CH-36",
      "CH-37",
      "CH-40",
      "CH-41",
      "CH-46",
      "CH-48"
    ],
    "optionalChapterIds": [
      "CH-38",
      "CH-39",
      "CH-42",
      "CH-45"
    ],
    "practicalAssignments": [
      "Melakukan audit kebocoran data (*data leakage forensic*) pada pipeline ML eksisting.",
      "Menjalankan benchmark multi-dataset menggunakan uji Friedman dan menghasilkan Critical Difference Diagram.",
      "Merancang matriks studi ablasi sistematis untuk membongkar kontribusi modul arsitektur baru."
    ],
    "finalOutcomes": "Mampu merancang evaluasi model AI yang bebas dari data leakage, membandingkan performa algoritma secara statistik ketat, dan membuktikan novelty melalui studi ablasi.",
    "assessableDeliverables": "Laporan Benchmark Komparatif Algoritma berstandar naskah konferensi tier-1 (NeurIPS/ICLR/CVPR format)."
  },
  {
    "id": "LP-05",
    "title": "Computer Vision Research Methodology Path",
    "targetAudience": "Peneliti bidang visi komputer (fokus kepakaran utama creator), mencakup deteksi objek, segmentasi, tracking, dan pengenalan citra biomedis/rekayasa.",
    "category": "advanced-engineering",
    "entryRequirements": "Pengolahan citra digital dan deep learning untuk visi komputer.",
    "requiredCompetencies": [
      "COMP-IND-01",
      "COMP-IND-02",
      "COMP-EXP-04",
      "COMP-APP-02"
    ],
    "requiredChapterIds": [
      "CH-05",
      "CH-09",
      "CH-12",
      "CH-14",
      "CH-16",
      "CH-20",
      "CH-32",
      "CH-33",
      "CH-34",
      "CH-35",
      "CH-36",
      "CH-37",
      "CH-40",
      "CH-46",
      "CH-48"
    ],
    "optionalChapterIds": [
      "CH-11",
      "CH-41",
      "CH-43"
    ],
    "practicalAssignments": [
      "Mengkalibrasi kesepakatan anotasi bounding box antar-annotator menggunakan Fleiss' Kappa.",
      "Mengevaluasi trade-off mAP@IoU[0.5:0.95] vs latency pada berbagai variasi resolusi input.",
      "Menguji ketahanan model deteksi terhadap degradasi visual (blur, sensor noise, cuaca buruk) dan domain shift."
    ],
    "finalOutcomes": "Mampu mengevaluasi performa sistem visi komputer menggunakan metrik terstandarisasi, membuktikan ketahanan out-of-distribution, dan merancang benchmark visi yang dapat direproduksi.",
    "assessableDeliverables": "Laporan Metodologi Riset Computer Vision lengkap dengan matriks evaluasi mAP, kurva PR, dan failure case taxonomy."
  },
  {
    "id": "LP-06",
    "title": "Signal Processing & Sensing Experiments Path",
    "targetAudience": "Peneliti bidang pemrosesan sinyal digital, sensor IoT, instrumentasi telemetri, dan analisis getaran/akustik.",
    "category": "advanced-engineering",
    "entryRequirements": "Analisis sinyal dan sistem linier, transformasi Fourier.",
    "requiredCompetencies": [
      "COMP-EXP-01",
      "COMP-EXP-03",
      "COMP-APP-02",
      "COMP-APP-04"
    ],
    "requiredChapterIds": [
      "CH-09",
      "CH-10",
      "CH-11",
      "CH-12",
      "CH-16",
      "CH-17",
      "CH-18",
      "CH-20",
      "CH-23",
      "CH-24",
      "CH-27",
      "CH-40",
      "CH-41",
      "CH-44",
      "CH-48"
    ],
    "optionalChapterIds": [
      "CH-32",
      "CH-39",
      "CH-42"
    ],
    "practicalAssignments": [
      "Menentukan rasio Signal-to-Noise (SNR) dan batas estimasi varians fisik (CRLB).",
      "Menganalisis autokorelasi temporal dan stasioneritas sinyal sensor menggunakan ADF test.",
      "Memvalidasi akurasi filter estimasi sinyal terhadap gangguan artefak lingkungan."
    ],
    "finalOutcomes": "Mampu merancang akuisisi sinyal yang bebas aliasing, mengkalibrasi sensor dinamis, dan memvalidasi keandalan filter estimasi pada kondisi bising.",
    "assessableDeliverables": "Laporan Eksperimen Pemrosesan Sinyal dengan analisis SNR, spektrum frekuensi, dan evaluasi ketidakpastian dinamis."
  },
  {
    "id": "LP-07",
    "title": "Remote Sensing & Geospatial Intelligence Research Path",
    "targetAudience": "Peneliti penginderaan jauh, sistem informasi geografis (SIG), pemetaan drone, dan analisis citra satelit multispektral di ITERA.",
    "category": "advanced-engineering",
    "entryRequirements": "Dasar fotogrametri, penginderaan jauh, dan perangkat lunak spasial (QGIS/GDAL).",
    "requiredCompetencies": [
      "COMP-APP-01",
      "COMP-APP-03",
      "COMP-IND-02",
      "COMP-EXP-04"
    ],
    "requiredChapterIds": [
      "CH-08",
      "CH-09",
      "CH-10",
      "CH-11",
      "CH-12",
      "CH-14",
      "CH-16",
      "CH-19",
      "CH-20",
      "CH-23",
      "CH-32",
      "CH-33",
      "CH-34",
      "CH-36",
      "CH-48"
    ],
    "optionalChapterIds": [
      "CH-25",
      "CH-41",
      "CH-42"
    ],
    "practicalAssignments": [
      "Menghitung autokorelasi spasial (Moran's I) untuk membuktikan dependensi spasial unit sampel.",
      "Merancang protokol Spatial Cross-Validation berbasis buffer spasial untuk mencegah *spatial data leakage*.",
      "Membangun matriks kontingensi akurasi tematik dan mengevaluasi batasan koefisien Kappa vs Overall Accuracy."
    ],
    "finalOutcomes": "Mampu merancang sampling geografis yang valid, mengisolasi kebocoran spasial pada pemodelan prediksi bumi, dan mengevaluasi akurasi tematik citra secara akurat.",
    "assessableDeliverables": "Laporan Validasi Akurasi Penginderaan Jauh dengan peta galat spasial dan protokol spatial cross-validation."
  },
  {
    "id": "LP-08",
    "title": "Reproducible Computational Research & RSE Path",
    "targetAudience": "Software engineers in research, computational scientists, dan calon mahasiswa doktoral yang ingin memastikan seluruh output komputasinya terbebas dari krisis replikasi.",
    "category": "doctoral-publication",
    "entryRequirements": "Kemampuan Linux/Bash, Git, dan Python tingkat menengah.",
    "requiredCompetencies": [
      "COMP-FND-05",
      "COMP-IND-01",
      "COMP-IND-02"
    ],
    "requiredChapterIds": [
      "CH-07",
      "CH-13",
      "CH-14",
      "CH-24",
      "CH-32",
      "CH-37",
      "CH-40",
      "CH-45",
      "CH-46",
      "CH-47",
      "CH-51"
    ],
    "optionalChapterIds": [
      "CH-33",
      "CH-48"
    ],
    "practicalAssignments": [
      "Mengemas kode riset ke dalam modul Python teruji unit menggunakan `pytest`.",
      "Membangun Dockerfile terisolasi yang mengunci seluruh dependensi komputasi dan driver CUDA.",
      "Merancang pipeline otomatis 1-klik via Makefile yang mereproduksi figur paper dari data mentah."
    ],
    "finalOutcomes": "Mampu menerapkan prinsip Research Software Engineering (RSE), mengeliminasi ketergantungan mesin lokal, dan mempublikasikan paket riset komputasi yang lolos audit reproduksibilitas ACM/IEEE.",
    "assessableDeliverables": "Repositori Publik Reproducible Research Bundle (Docker, Makefile, DVC, testing)."
  },
  {
    "id": "LP-09",
    "title": "Scientific Publication & Scholarly Communication Path",
    "targetAudience": "Dosen, peneliti, dan mahasiswa pascasarjana yang sedang menyiapkan naskah artikel untuk jurnal internasional bereputasi (Scopus Q1/Q2, IEEE Transactions, Elsevier, Springer).",
    "category": "doctoral-publication",
    "entryRequirements": "Telah menyelesaikan pengumpulan data dan analisis statistik penelitian.",
    "requiredCompetencies": [
      "COMP-FND-03",
      "COMP-FND-04",
      "COMP-IND-03",
      "COMP-IND-04"
    ],
    "requiredChapterIds": [
      "CH-03",
      "CH-04",
      "CH-05",
      "CH-07",
      "CH-20",
      "CH-23",
      "CH-47",
      "CH-48",
      "CH-49"
    ],
    "optionalChapterIds": [
      "CH-35",
      "CH-50"
    ],
    "practicalAssignments": [
      "Menyusun matriks pemetaan Klaim-ke-Bukti (*Claims-to-Evidence Matrix*) untuk seluruh klaim naskah.",
      "Menulis seksi Introduction berbasis Swales CARS model dan seksi Discussion yang kontekstual.",
      "Membangun Point-by-Point Rebuttal Matrix untuk menanggapi simulasi komentar kritis reviewer."
    ],
    "finalOutcomes": "Mampu menyusun argumen ilmiah yang koheren, memilih jurnal target yang tepat tanpa terjebak jurnal predator, dan menavigasi proses peer-review hingga artikel dinyatakan accepted.",
    "assessableDeliverables": "Draf naskah artikel ilmiah berformat LaTeX lengkap dengan berkas supplementary material dan rebuttal matrix."
  },
  {
    "id": "LP-10",
    "title": "Doctoral Research Preparation & Epistemic Leadership Path",
    "targetAudience": "Calon mahasiswa S3, peneliti doktoral, dan pimpinan laboratorium riset yang merancang program penelitian jangka panjang yang inovatif dan berdampak global.",
    "category": "doctoral-publication",
    "entryRequirements": "Telah menyelesaikan jenjang magister (S2) atau sarjana unggul dengan rekam jejak riset kuat.",
    "requiredCompetencies": [
      "COMP-DOC-01",
      "COMP-DOC-04",
      "COMP-IND-01",
      "COMP-IND-04"
    ],
    "requiredChapterIds": [
      "CH-01",
      "CH-05",
      "CH-06",
      "CH-15",
      "CH-28",
      "CH-29",
      "CH-30",
      "CH-32",
      "CH-33",
      "CH-34",
      "CH-35",
      "CH-38",
      "CH-39",
      "CH-41",
      "CH-42",
      "CH-43",
      "CH-45",
      "CH-46",
      "CH-48",
      "CH-49",
      "CH-50",
      "CH-51"
    ],
    "optionalChapterIds": [],
    "practicalAssignments": [
      "Menyusun Doctoral Novelty Manifesto yang mendefinisikan kontribusi terhadap batas keilmuan (*frontier*).",
      "Merumuskan Structural Causal Model (DAG) dan analisis sensitivitas global untuk sistem usulan.",
      "Merancang Strategic PhD 3-Year Research Roadmap berbasis publikasi kumulatif (*thesis-by-publication*)."
    ],
    "finalOutcomes": "Memiliki kapasitas kepemimpinan ilmiah untuk merumuskan teori baru, mengelola risiko kegagalan eksperimen multi-tahun, dan menghasilkan kontribusi doktoral yang diakui komunitas internasional.",
    "assessableDeliverables": "Proposal Disertasi Doktoral Lengkap dan PhD Strategic 3-Year Roadmap."
  }
];
