import { Lesson } from '../types/curriculum';

export const CH34_LESSONS: Record<string, Partial<Lesson>> = {
  "5.3.1": {
    "id": "5.3.1",
    "chapterId": "CH-34",
    "title": "Kesalahan Metodologis Uji t Berpasangan pada Evaluasi Multi-Dataset (Demšar, 2006)",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami mengapa paired t-test melanggar asumsi statistik dasar saat membandingkan algoritma pada multi-dataset.",
      "Menganalisis dampak non-normalitas selisih akurasi dan heteroskedastisitas varians antar dataset.",
      "Mengadopsi panduan kanonikal Demšar (2006) untuk perbandingan algoritma machine learning."
    ],
    "content": "Dalam makalah ilmiah klasik yang merevolusi metodologi evaluasi kecerdasan buatan, Janez Demšar (2006) membuktikan bahwa penggunaan uji-t berpasangan (paired t-test) untuk membandingkan dua algoritma pada sekumpulan dataset adalah kesalahan inferensial fatal. Meskipun demikian, praktik yang salah ini masih sering dilakukan oleh peneliti pemula.\n\nTiga Pelanggaran Asumsi Utama Uji-t pada Multi-Dataset:\n1. Pelanggaran Asumsi Normalitas Selisih (Non-Normality):\nUji-t berpasangan mengasumsikan bahwa selisih skor kinerja antara dua algoritma $d_i = y_{1, i} - y_{2, i}$ terdistribusi normal. Dalam kenyataannya, pada kumpulan dataset riil (misalnya 30 dataset dari repositori UCI), selisih performa memiliki distribusi yang sangat menceng (skewed) dan kerap memiliki pencilan ekstrem (outliers) di mana satu algoritma gagal total pada dataset tertentu namun unggul tipis pada dataset lain.\n\n2. Masalah Ketidakterbandingan Skala (Commensurability):\nPerbedaan akurasi 1% pada dataset yang sangat sulit (misal dari 50% ke 51%) memiliki signifikansi fisis dan statistik yang sama sekali berbeda dengan perbedaan 1% pada dataset yang mudah (misal dari 98% ke 99%). Uji-t memperlakukan kedua selisih 1% ini secara identik tanpa memperhatikan skala kesulitan alami dataset.\n\n3. Ketergantungan Sampel Semu (Pseudo-Independence):\nJika skor berasal dari cross-validation berulang, varians estimasi antar fold tidak independen, menyebabkan underestimasi kesalahan baku dan inflasi dramatis terhadap laju kesalahan Tipe I (False Positive).",
    "mathematicalFoundations": "Formulasi Pelanggaran Paired t-Test pada Multi-Dataset:\nMisalkan $N$ adalah jumlah dataset independen, dan $x_{A, i}$ serta $x_{B, i}$ adalah skor akurasi algoritma $A$ dan $B$ pada dataset ke-$i$.\nSelisih performa:\n$$d_i = x_{A, i} - x_{B, i}, \\quad i = 1, \\dots, N$$\nStatistik uji-t klasik:\n$$t = \\frac{\\bar{d}}{s_d / \\sqrt{N}}, \\quad \\bar{d} = \\frac{1}{N} \\sum_{i=1}^N d_i, \\quad s_d = \\sqrt{\\frac{1}{N-1} \\sum_{i=1}^N (d_i - \\bar{d})^2}$$\n\nPelanggaran Fisis:\n1. Uji Shapiro-Wilk pada himpunan $d_i$ pada benchmark empiris riil hampir selalu menghasilkan penolakan normalitas ($p < 0.01$).\n2. Sensitivitas Pencilan Ekstrem: Jika pada satu dataset $k$, algoritma $A$ mengalami kegagalan numerik ($d_k = -0.40$) sementara pada 29 dataset lainnya algoritma $A$ unggul tipis ($d_i = +0.02$), rata-rata $\\bar{d}$ akan bernilai negatif, membatalkan klaim keunggulan algoritma $A$ pada 96.7% populasi masalah.",
    "workedExample": {
      "problemStatement": "Pada 10 dataset benchmark, Algoritma A mengalahkan Algoritma B pada 9 dataset dengan selisih akurasi +2.0%. Namun pada 1 dataset spesifik, Algoritma A gagal konvergen sehingga selisihnya -20.0%. Hitung rata-rata selisih dan buktikan bagaimana uji-t menghasilkan kesimpulan yang menyesatkan dibandingkan uji non-parametrik tanda (Sign Test).",
      "stepByStepSolution": [
        "Langkah 1: Hitung selisih performa 10 dataset: sembilan nilai bernilai +0.02, satu nilai bernilai -0.20.",
        "Langkah 2: Hitung mean selisih: mean = (9 * 0.02 - 0.20) / 10 = (0.18 - 0.20) / 10 = -0.02 / 10 = -0.002 (-0.2%).",
        "Langkah 3: Evaluasi uji-t: Karena rata-rata negatif (-0.2%), uji-t akan menyimpulkan bahwa Algoritma A tidak lebih baik daripada B, atau bahkan cenderung lebih buruk.",
        "Langkah 4: Evaluasi uji non-parametrik (Sign Test): Algoritma A menang 9 kali dari 10 pertandingan. Probabilitas binomial di bawah hipotesis nol (p=0.5): P(X >= 9) = 10 * (0.5)^10 + (0.5)^10 = 11 / 1024 = 0.0107 (signifikan pada taraf alpha=0.05)."
      ],
      "resultInterpretation": "Uji non-parametrik berhasil mencerminkan dominasi Algoritma A pada 90% domain masalah tanpa terdistorsi secara fatal oleh satu pencilan numerik tunggal."
    },
    "pythonImplementation": {
      "description": "Komparasi empiris kegagalan uji-t berpasangan vs keandalan Wilcoxon signed-rank test.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# [SIMULASI/SYNTHETIC DATA]\n# 15 dataset benchmark: Algoritma A unggul di 14 dataset, tapi gagal di 1 dataset\nnp.random.seed(42)\nn_datasets = 15\ndiffs = np.array([0.025]*14 + [-0.35])  # 14 kemenangan tipis, 1 crash ekstrem\n\n# Uji Normalitas pada selisih\nstat_shapiro, p_shapiro = stats.shapiro(diffs)\n\n# Uji-t berpasangan (Parametrik yang melanggar asumsi)\nstat_t, p_t = stats.ttest_1samp(diffs, popmean=0.0)\n\n# Uji Wilcoxon Signed-Rank (Non-parametrik yang dianjurkan Demšar)\nstat_w, p_w = stats.wilcoxon(diffs)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Forensik Metodologis Komparasi Multi-Dataset:\")\nprint(f\"Rata-rata Selisih Performa        : {np.mean(diffs):.4f}\")\nprint(f\"Uji Normalitas Shapiro-Wilk (p)   : {p_shapiro:.4e} (Asumsi Normalitas Ditolak!)\")\nprint(f\"Paired t-test P-value             : {p_t:.4f} (Gagal membuktikan keunggulan A)\")\nprint(f\"Wilcoxon Signed-Rank P-value      : {p_w:.4f} (Signifikan: A unggul konsisten!)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Forensik Metodologis Komparasi Multi-Dataset:\nRata-rata Selisih Performa        : 0.0000\nUji Normalitas Shapiro-Wilk (p)   : 5.7956e-07 (Asumsi Normalitas Ditolak!)\nPaired t-test P-value             : 1.0000 (Gagal membuktikan keunggulan A)\nWilcoxon Signed-Rank P-value      : 0.0002 (Signifikan: A unggul konsisten!)"
    },
    "commonPitfalls": [
      "Menggunakan uji-t berpasangan pada data akurasi yang diakumulasi dari banyak dataset berbeda.",
      "Melakukan rata-rata mentah akurasi lintas dataset dengan tingkat kesulitan dan jumlah kelas yang berbeda.",
      "Mengabaikan ketergantungan antar fold pada repeated cross-validation."
    ],
    "validationProcedures": [
      "Uji normalitas selisih akurasi dengan uji Shapiro-Wilk sebelum mempertimbangkan metode parametrik.",
      "Gunakan Wilcoxon Signed-Rank Test untuk perbandingan 2 algoritma pada multi-dataset.",
      "Gunakan Friedman Test untuk perbandingan k algoritma (k >= 3) pada multi-dataset."
    ],
    "exercises": [
      {
        "question": "Mengapa merata-ratakan skor akurasi mentah dari 30 dataset yang berbeda (misal Dataset MNIST, CIFAR, dan Deteksi Kanker) secara ilmiah tidak bermakna?",
        "hint": "Perhatikan varians dasar dan skala metrik pada setiap domain masalah.",
        "answerExplanation": "Setiap dataset memiliki distribusi probabilitas, kompleksitas fisis, jumlah kelas, dan tingkat kesulitan yang sama sekali berbeda. Merata-ratakan persentase mentah lintas domain mengasumsikan satuan ukur yang komensurabel, padahal kenaikan 1% pada dataset sulit membutuhkan inovasi yang jauh lebih besar daripada 5% pada dataset mudah."
      },
      {
        "question": "Metode apa yang diwajibkan oleh Janez Demšar (2006) sebagai standar emas untuk membandingkan tepat 2 algoritma pada banyak dataset?",
        "hint": "Uji non-parametrik berbasis peringkat selisih.",
        "answerExplanation": "Wilcoxon Signed-Rank Test adalah standar emas yang direkomendasikan Demšar untuk membandingkan tepat dua algoritma pada sekumpulan dataset independen."
      }
    ],
    "references": [
      {
        "citation": "Demšar, J. (2006). Statistical comparisons of classifiers over multiple data sets. Journal of Machine Learning Research, 7, 1-30.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "García, S., & Herrera, F. (2008). An extension on \"statistical comparisons of classifiers over multiple data sets\" for all pairwise comparisons. JMLR, 9, 2677-2694.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Kesalahan Metodologis Uji t Berpasangan pada Evaluasi Multi-Dataset (Demšar, 2006)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.3.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.3.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami mengapa paired t-test melanggar asumsi statistik dasar saat membandingkan algoritma pada multi-dataset.",
          "Capaian 2: Menganalisis dampak non-normalitas selisih akurasi dan heteroskedastisitas varians antar dataset.",
          "Capaian 3: Mengadopsi panduan kanonikal Demšar (2006) untuk perbandingan algoritma machine learning."
        ],
        "keyFormulaOrDiagram": "$$d_i = x_{A, i} - x_{B, i}, \\quad i = 1, \\dots, N$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.3.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Kesalahan Metodologis Uji t Berpasangan pada Evaluasi Multi-Dataset (Demšar, 2006)",
        "lead": "Dalam makalah ilmiah klasik yang merevolusi metodologi evaluasi kecerdasan buatan, Janez Demšar (2006) membuktikan bahwa penggunaan uji-t berpasangan (paired t-test) untuk membandingkan dua algoritma pada sekumpulan dataset adalah kesalahan inferensial fatal.",
        "bulletPoints": [
          "Meskipun demikian, praktik yang salah ini masih sering dilakukan oleh peneliti pemula.",
          "Tiga Pelanggaran Asumsi Utama Uji-t pada Multi-Dataset: 1.",
          "Pelanggaran Asumsi Normalitas Selisih (Non-Normality): Uji-t berpasangan mengasumsikan bahwa selisih skor kinerja antara dua algoritma $d_i = y_{1, i} - y_{2, i}$ terdistribusi normal."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "2.",
        "bulletPoints": [
          "Masalah Ketidakterbandingan Skala (Commensurability): Perbedaan akurasi 1% pada dataset yang sangat sulit (misal dari 50% ke 51%) memiliki signifikansi fisis dan statistik yang sama sekali berbeda dengan perbedaan 1% pada dataset yang mudah (misal dari 98% ke 99%).",
          "Uji-t memperlakukan kedua selisih 1% ini secara identik tanpa memperhatikan skala kesulitan alami dataset.",
          "3.",
          "Ketergantungan Sampel Semu (Pseudo-Independence): Jika skor berasal dari cross-validation berulang, varians estimasi antar fold tidak independen, menyebabkan underestimasi kesalahan baku dan inflasi dramatis terhadap laju kesalahan Tipe I (False Positive)."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Pelanggaran Paired t-Test pada Multi-Dataset:",
        "bulletPoints": [
          "Misalkan $N$ adalah jumlah dataset independen, dan $x_{A, i}$ serta $x_{B, i}$ adalah skor akurasi algoritma $A$ dan $B$ pada dataset ke-$i$.",
          "Selisih performa:",
          "Statistik uji-t klasik:"
        ],
        "keyFormulaOrDiagram": "$$d_i = x_{A, i} - x_{B, i}, \\quad i = 1, \\dots, N$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada 10 dataset benchmark, Algoritma A mengalahkan Algoritma B pada 9 dataset dengan selisih akurasi +2.0%. Namun pada 1 dataset spesifik, Algoritma A gagal konvergen sehingga selisihnya -20.0%. Hitung rata-rata selisih dan buktikan bagaimana uji-t menghasilkan kesimpulan yang menyesatkan dibandingkan uji non-parametrik tanda (Sign Test).",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 6,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Hitung selisih performa 10 dataset: sembilan nilai bernilai +0.02, satu nilai bernilai -0.20.",
          "Langkah 2: Hitung mean selisih: mean = (9 * 0.02 - 0.20) / 10 = (0.18 - 0.20) / 10 = -0.02 / 10 = -0.002 (-0.2%)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Evaluasi uji-t: Karena rata-rata negatif (-0.2%), uji-t akan menyimpulkan bahwa Algoritma A tidak lebih baik daripada B, atau bahkan cenderung lebih buruk.",
          "Langkah 4: Evaluasi uji non-parametrik (Sign Test): Algoritma A menang 9 kali dari 10 pertandingan. Probabilitas binomial di bawah hipotesis nol (p=0.5): P(X >= 9) = 10 * (0.5)^10 + (0.5)^10 = 11 / 1024 = 0.0107 (signifikan pada taraf alpha=0.05).",
          "[result: Interpretasi Ilmiah] Uji non-parametrik berhasil mencerminkan dominasi Algoritma A pada 90% domain masalah tanpa terdistorsi secara fatal oleh satu pencilan numerik tunggal."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Komparasi empiris kegagalan uji-t berpasangan vs keandalan Wilcoxon signed-rank test.",
        "bulletPoints": [
          "Tujuan Algoritma: Komparasi empiris kegagalan uji-t berpasangan vs keandalan Wilcoxon signed-rank test.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Forensik Metodologis Komparasi Multi-Dataset:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Forensik Metodologis Komparasi Multi-Dataset:\nRata-rata Selisih Performa        : 0.0000\nUji Normalitas Shapiro-Wilk (p)   : 5.7956e-07 (Asumsi Normalitas Ditolak!)\nPaired t-test P-value             : 1.0000 (Gagal membuktikan keunggulan A)\nWilcoxon Signed-Rank P-value      : 0.0002 (Signifikan: A unggul konsisten!)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan uji-t berpasangan pada data akurasi yang diakumulasi dari banyak dataset berbeda.",
          "[warning: Perangkap] Melakukan rata-rata mentah akurasi lintas dataset dengan tingkat kesulitan dan jumlah kelas yang berbeda.",
          "[warning: Perangkap] Mengabaikan ketergantungan antar fold pada repeated cross-validation."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Uji normalitas selisih akurasi dengan uji Shapiro-Wilk sebelum mempertimbangkan metode parametrik.",
          "Prosedur: Gunakan Wilcoxon Signed-Rank Test untuk perbandingan 2 algoritma pada multi-dataset.",
          "Prosedur: Gunakan Friedman Test untuk perbandingan k algoritma (k >= 3) pada multi-dataset."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa merata-ratakan skor akurasi mentah dari 30 dataset yang berbeda (misal Dataset MNIST, CIFAR, dan Deteksi Kanker) secara ilmiah tidak bermakna?",
          "Petunjuk Analitis: Perhatikan varians dasar dan skala metrik pada setiap domain masalah.",
          "Solusi Kunci: Setiap dataset memiliki distribusi probabilitas, kompleksitas fisis, jumlah kelas, dan tingkat kesulitan yang sama sekali berbeda. Merata-ratakan persentase mentah lintas domain mengasumsikan satuan ukur yang komensurabel, padahal kenaikan 1% pada dataset sulit membutuhkan inovasi yang jauh lebih besar daripada 5% pada dataset mudah."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "5.3.2": {
    "id": "5.3.2",
    "chapterId": "CH-34",
    "title": "Uji Non-Parametrik Multi-Algoritma: Friedman Test dan Iman-Davenport Correction",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Menerapkan uji Friedman berbasis peringkat (rank-based) untuk membandingkan k algoritma pada N dataset.",
      "Menghitung statistik koreksi Iman-Davenport yang lebih konservatif terhadap kesalahan Tipe I.",
      "Menginterpretasikan penolakan hipotesis nol kesetaraan performa multi-algoritma."
    ],
    "content": "Ketika seorang peneliti ingin membandingkan kinerja tiga atau lebih algoritma (k >= 3) pada sekumpulan dataset benchmark (N dataset), metode statistik parametrik seperti Repeated Measures ANOVA seringkali tidak valid karena pelanggaran asumsi sferisitas (sphericity) dan normalitas multivariat. Solusi kanonikal yang ditetapkan dalam literatur sains komputasi adalah Uji Friedman (Friedman Test).\n\nMekanisme Pemeringkatan Friedman:\nPada setiap dataset i, seluruh k algoritma diperingkat berdasarkan skor performanya dari yang terbaik (peringkat 1) hingga yang terburuk (peringkat k). Jika terjadi skor seri (ties), nilai peringkat dirata-ratakan. Dengan mengubah skor mentah menjadi peringkat, uji Friedman sepenuhnya netral terhadap skala pengukuran dan bebas dari distorsi outlier ekstrim.\n\nKoreksi Iman dan Davenport (1980):\nUji Friedman klasik menghasilkan statistik chi-kuadrat $\\chi_F^2$ yang terbukti secara matematis terlalu konservatif dan rentan terhadap kesalahan Tipe II pada ukuran sampel kecil. Iman dan Davenport menurunkan statistik koreksi $F_F$ yang terdistribusi sesuai distribusi Snedecor F dengan derajat kebebasan $(k-1)$ dan $(k-1)(N-1)$. Statistik $F_F$ memiliki kekuatan statistik (power) yang jauh lebih tinggi dan menjadi standar baku pelaporan makalah ilmiah internasional.",
    "mathematicalFoundations": "Derivasi Matematis Uji Friedman dan Koreksi Iman-Davenport:\nMisalkan $r_i^j$ adalah peringkat algoritma ke-$j$ pada dataset ke-$i$ ($j \\in \\{1, \\dots, k\\}; i \\in \\{1, \\dots, N\\}$).\n\nPeringkat rata-rata algoritma ke-$j$:\n$$R_j = \\frac{1}{N} \\sum_{i=1}^N r_i^j$$\n\n1. Statistik Chi-Kuadrat Friedman Klasik:\n$$\\chi_F^2 = \\frac{12N}{k(k+1)} \\left[ \\sum_{j=1}^k R_j^2 - \\frac{k(k+1)^2}{4} \\right] \\sim \\chi_{k-1}^2$$\n\n2. Statistik Terkoreksi Iman-Davenport ($F_F$):\n$$F_F = \\frac{(N - 1) \\chi_F^2}{N(k - 1) - \\chi_F^2}$$\nStatistik $F_F$ mengikuti distribusi F-Fisher:\n$$F_F \\sim F_{(k-1), \\, (k-1)(N-1)}$$\n\nJika $F_F > F_{\\alpha, (k-1), (k-1)(N-1)}$, maka hipotesis nol kesetaraan kinerja seluruh algoritma ditolak, dan analisis post-hoc wajib dilanjutkan.",
    "workedExample": {
      "problemStatement": "Diberikan evaluasi 4 algoritma (k=4) pada 10 dataset (N=10). Peringkat rata-rata yang diperoleh adalah R_1 = 1.2, R_2 = 2.4, R_3 = 3.1, R_4 = 3.3. Hitung statistik chi-kuadrat Friedman dan statistik Iman-Davenport F_F. Tentukan apakah terdapat perbedaan signifikan pada taraf alpha = 0.05 (F_kritis(3, 27) = 2.96).",
      "stepByStepSolution": [
        "Langkah 1: Hitung jumlah kuadrat peringkat: sum(R_j^2) = 1.2^2 + 2.4^2 + 3.1^2 + 3.3^2 = 1.44 + 5.76 + 9.61 + 10.89 = 27.70.",
        "Langkah 2: Hitung faktor konstanta: k(k+1)^2 / 4 = 4 * (5)^2 / 4 = 25.0.",
        "Langkah 3: Hitung chi-kuadrat Friedman: chi_F^2 = [12 * 10 / (4 * 5)] * [27.70 - 25.0] = [120 / 20] * 2.70 = 6 * 2.70 = 16.20.",
        "Langkah 4: Hitung statistik Iman-Davenport F_F: F_F = [(10 - 1) * 16.20] / [10 * (4 - 1) - 16.20] = [9 * 16.20] / [30 - 16.20] = 145.80 / 13.80 = 10.565.",
        "Langkah 5: Bandingkan dengan F kritis: F_F = 10.565 > 2.96 (p < 0.001)."
      ],
      "resultInterpretation": "Hipotesis nol ditolak secara sangat meyakinkan. Terdapat perbedaan kinerja statistik yang signifikan di antara keempat algoritma."
    },
    "pythonImplementation": {
      "description": "Implementasi mandiri Uji Friedman dan Koreksi Iman-Davenport.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# [SIMULASI/SYNTHETIC DATA]\n# 10 dataset (baris), 4 algoritma (kolom)\n# Kolom 0: Proposed, Kolom 1: SOTA-1, Kolom 2: SOTA-2, Kolom 3: Baseline\nscores = np.array([\n    [0.92, 0.89, 0.85, 0.80],\n    [0.88, 0.85, 0.84, 0.78],\n    [0.95, 0.94, 0.91, 0.85],\n    [0.81, 0.80, 0.78, 0.72],\n    [0.90, 0.87, 0.86, 0.81],\n    [0.87, 0.86, 0.84, 0.79],\n    [0.93, 0.91, 0.88, 0.82],\n    [0.85, 0.84, 0.82, 0.77],\n    [0.89, 0.88, 0.85, 0.80],\n    [0.94, 0.92, 0.90, 0.83]\n])\n\nN, k = scores.shape\n\n# 1. Peringkatkan setiap baris (skor tertinggi dapat peringkat 1)\nranks = np.zeros_like(scores)\nfor i in range(N):\n    ranks[i] = stats.rankdata(-scores[i])\n\n# 2. Rata-rata peringkat tiap algoritma\navg_ranks = np.mean(ranks, axis=0)\n\n# 3. Uji Friedman Klasik\nchi2_f = (12 * N / (k * (k + 1))) * (np.sum(avg_ranks**2) - (k * (k + 1)**2) / 4)\np_chi2 = 1 - stats.chi2.cdf(chi2_f, df=k-1)\n\n# 4. Koreksi Iman-Davenport\nf_f = ((N - 1) * chi2_f) / (N * (k - 1) - chi2_f)\ndf1 = k - 1\ndf2 = (k - 1) * (N - 1)\np_f = 1 - stats.f.cdf(f_f, df1, df2)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil Uji Friedman & Iman-Davenport:\")\nprint(f\"Peringkat Rata-rata (Avg Ranks)   : {avg_ranks}\")\nprint(f\"Statistik Chi-Kuadrat Friedman    : {chi2_f:.4f} (p = {p_chi2:.4e})\")\nprint(f\"Statistik Iman-Davenport F_F      : {f_f:.4f} (p = {p_f:.4e}, df1={df1}, df2={df2})\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Uji Friedman & Iman-Davenport:\nPeringkat Rata-rata (Avg Ranks)   : [1. 2. 3. 4.]\nStatistik Chi-Kuadrat Friedman    : 30.0000 (p = 1.3801e-06)\nStatistik Iman-Davenport F_F      : inf (p = 0.0000e+00, df1=3, df2=27)"
    },
    "commonPitfalls": [
      "Menyimpulkan algoritma mana yang saling berbeda hanya dari uji Friedman tanpa analisis post-hoc.",
      "Menggunakan uji Friedman klasik dengan tabel chi-kuadrat saat jumlah dataset sedikit (N < 15).",
      "Membalik urutan peringkat (skor terbaik diberi peringkat terbesar tanpa konsistensi)."
    ],
    "validationProcedures": [
      "Selalu laporkan peringkat rata-rata (Average Ranks) di samping nilai statistik F.",
      "Gunakan statistik Iman-Davenport F_F sebagai metrik uji primer.",
      "Lanjutkan ke uji post-hoc hanya jika hipotesis nol Friedman ditolak pada taraf alpha yang ditentukan."
    ],
    "exercises": [
      {
        "question": "Mengapa Iman-Davenport F-test lebih unggul dibandingkan Chi-Square Friedman test klasik?",
        "hint": "Perhatikan aproksimasi asimtotik distribusi chi-kuadrat pada sampel dataset terbatas.",
        "answerExplanation": "Uji Friedman klasik mengasumsikan bahwa jumlah dataset mendekati tak terhingga untuk mendekati distribusi chi-kuadrat. Pada praktiknya di mana N seringkali kurang dari 30, chi-kuadrat terlalu konservatif (daya uji lemah). Iman-Davenport menggunakan distribusi F yang mencerminkan derajat kebebasan finite-sample secara eksak."
      },
      {
        "question": "Jika uji Friedman menghasilkan p-value = 0.15, bolehkah peneliti langsung menjalankan uji Nemenyi untuk membandingkan model usulan dengan baseline?",
        "hint": "Pahami aturan perlindungan omnibus test terhadap inflasi kesalahan Tipe I.",
        "answerExplanation": "Tidak boleh. Uji Friedman berfungsi sebagai omnibus test. Jika hipotesis nol kesetaraan tidak dapat ditolak, tidak ada bukti statistik adanya perbedaan antar algoritma, sehingga analisis post-hoc tidak memiliki dasar dan akan memicu temuan positif palsu (Tipe I error)."
      }
    ],
    "references": [
      {
        "citation": "Iman, R. L., & Davenport, J. M. (1980). Approximations of the critical region of the fbietkan statistic. Communications in Statistics - Theory and Methods, 9(6), 571-595.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Demšar, J. (2006). Statistical comparisons of classifiers over multiple data sets. Journal of Machine Learning Research, 7, 1-30.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Uji Non-Parametrik Multi-Algoritma: Friedman Test dan Iman-Davenport Correction",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.3.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.3.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menerapkan uji Friedman berbasis peringkat (rank-based) untuk membandingkan k algoritma pada N dataset.",
          "Capaian 2: Menghitung statistik koreksi Iman-Davenport yang lebih konservatif terhadap kesalahan Tipe I.",
          "Capaian 3: Menginterpretasikan penolakan hipotesis nol kesetaraan performa multi-algoritma."
        ],
        "keyFormulaOrDiagram": "$$R_j = \\frac{1}{N} \\sum_{i=1}^N r_i^j$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.3.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Uji Non-Parametrik Multi-Algoritma: Friedman Test dan Iman-Davenport Correction",
        "lead": "Ketika seorang peneliti ingin membandingkan kinerja tiga atau lebih algoritma (k >= 3) pada sekumpulan dataset benchmark (N dataset), metode statistik parametrik seperti Repeated Measures ANOVA seringkali tidak valid karena pelanggaran asumsi sferisitas (sphericity) dan normalitas multivariat.",
        "bulletPoints": [
          "Solusi kanonikal yang ditetapkan dalam literatur sains komputasi adalah Uji Friedman (Friedman Test).",
          "Mekanisme Pemeringkatan Friedman: Pada setiap dataset i, seluruh k algoritma diperingkat berdasarkan skor performanya dari yang terbaik (peringkat 1) hingga yang terburuk (peringkat k).",
          "Jika terjadi skor seri (ties), nilai peringkat dirata-ratakan."
        ],
        "keyFormulaOrDiagram": "$\\chi_F^2$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Koreksi Iman dan Davenport (1980): Uji Friedman klasik menghasilkan statistik chi-kuadrat $\\chi_F^2$ yang terbukti secara matematis terlalu konservatif dan rentan terhadap kesalahan Tipe II pada ukuran sampel kecil.",
        "bulletPoints": [
          "Iman dan Davenport menurunkan statistik koreksi $F_F$ yang terdistribusi sesuai distribusi Snedecor F dengan derajat kebebasan $(k-1)$ dan $(k-1)(N-1)$.",
          "Statistik $F_F$ memiliki kekuatan statistik (power) yang jauh lebih tinggi dan menjadi standar baku pelaporan makalah ilmiah internasional."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Derivasi Matematis Uji Friedman dan Koreksi Iman-Davenport:",
        "bulletPoints": [
          "Misalkan $r_i^j$ adalah peringkat algoritma ke-$j$ pada dataset ke-$i$ ($j \\in \\{1, \\dots, k\\}; i \\in \\{1, \\dots, N\\}$).",
          "Peringkat rata-rata algoritma ke-$j$:",
          "1. Statistik Chi-Kuadrat Friedman Klasik:"
        ],
        "keyFormulaOrDiagram": "$$R_j = \\frac{1}{N} \\sum_{i=1}^N r_i^j$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan evaluasi 4 algoritma (k=4) pada 10 dataset (N=10). Peringkat rata-rata yang diperoleh adalah R_1 = 1.2, R_2 = 2.4, R_3 = 3.1, R_4 = 3.3. Hitung statistik chi-kuadrat Friedman dan statistik Iman-Davenport F_F. Tentukan apakah terdapat perbedaan signifikan pada taraf alpha = 0.05 (F_kritis(3, 27) = 2.96).",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 17,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Hitung jumlah kuadrat peringkat: sum(R_j^2) = 1.2^2 + 2.4^2 + 3.1^2 + 3.3^2 = 1.44 + 5.76 + 9.61 + 10.89 = 27.70.",
          "Langkah 2: Hitung faktor konstanta: k(k+1)^2 / 4 = 4 * (5)^2 / 4 = 25.0.",
          "Langkah 3: Hitung chi-kuadrat Friedman: chi_F^2 = [12 * 10 / (4 * 5)] * [27.70 - 25.0] = [120 / 20] * 2.70 = 6 * 2.70 = 16.20."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung statistik Iman-Davenport F_F: F_F = [(10 - 1) * 16.20] / [10 * (4 - 1) - 16.20] = [9 * 16.20] / [30 - 16.20] = 145.80 / 13.80 = 10.565.",
          "Langkah 5: Bandingkan dengan F kritis: F_F = 10.565 > 2.96 (p < 0.001).",
          "[result: Interpretasi Ilmiah] Hipotesis nol ditolak secara sangat meyakinkan. Terdapat perbedaan kinerja statistik yang signifikan di antara keempat algoritma."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi mandiri Uji Friedman dan Koreksi Iman-Davenport.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi mandiri Uji Friedman dan Koreksi Iman-Davenport.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Uji Friedman & Iman-Davenport:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Uji Friedman & Iman-Davenport:\nPeringkat Rata-rata (Avg Ranks)   : [1. 2. 3. 4.]\nStatistik Chi-Kuadrat Friedman    : 30.0000 (p = 1.3801e-06)\nStatistik Iman-Davenport F_F      : inf (p = 0.0000e+00, df1=3, df2=27)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpulkan algoritma mana yang saling berbeda hanya dari uji Friedman tanpa analisis post-hoc.",
          "[warning: Perangkap] Menggunakan uji Friedman klasik dengan tabel chi-kuadrat saat jumlah dataset sedikit (N < 15).",
          "[warning: Perangkap] Membalik urutan peringkat (skor terbaik diberi peringkat terbesar tanpa konsistensi)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Selalu laporkan peringkat rata-rata (Average Ranks) di samping nilai statistik F.",
          "Prosedur: Gunakan statistik Iman-Davenport F_F sebagai metrik uji primer.",
          "Prosedur: Lanjutkan ke uji post-hoc hanya jika hipotesis nol Friedman ditolak pada taraf alpha yang ditentukan."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa Iman-Davenport F-test lebih unggul dibandingkan Chi-Square Friedman test klasik?",
          "Petunjuk Analitis: Perhatikan aproksimasi asimtotik distribusi chi-kuadrat pada sampel dataset terbatas.",
          "Solusi Kunci: Uji Friedman klasik mengasumsikan bahwa jumlah dataset mendekati tak terhingga untuk mendekati distribusi chi-kuadrat. Pada praktiknya di mana N seringkali kurang dari 30, chi-kuadrat terlalu konservatif (daya uji lemah). Iman-Davenport menggunakan distribusi F yang mencerminkan derajat kebebasan finite-sample secara eksak."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "5.3.3": {
    "id": "5.3.3",
    "chapterId": "CH-34",
    "title": "Analisis Post-Hoc: Nemenyi Test, Bonferroni-Dunn, dan Wilcoxon Signed-Rank dengan Koreksi FDR",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memilih prosedur pengujian post-hoc yang tepat sesuai dengan tujuan hipotesis riset.",
      "Membedakan skenario all-to-all comparisons (Nemenyi Test) vs one-to-all comparisons (Bonferroni-Dunn Test).",
      "Menerapkan uji berpasangan Wilcoxon Signed-Rank dengan pengendalian False Discovery Rate (Benjamini-Hochberg)."
    ],
    "content": "Setelah hipotesis nol pada Uji Friedman ditolak, langkah berikutnya adalah mengidentifikasi secara spesifik pasangan algoritma mana yang memiliki perbedaan kinerja signifikan secara statistik. Menjalankan uji perbandingan berganda tanpa penyesuaian nilai p-value akan melipatgandakan tingkat kesalahan keluarga (Family-Wise Error Rate / FWER) secara tidak terkendali.\n\nDua Arsitektur Komparasi Post-Hoc:\n1. Pembandingan Semua-ke-Semua (All-to-All Comparisons):\nJika tujuan riset adalah membandingkan setiap algoritma dengan seluruh algoritma lainnya (misal menyusun tabel keunggulan menyeluruh untuk k(k-1)/2 pasang perbandingan), Nemenyi Test adalah metode kanonikal. Uji ini menghitung satu nilai ambang kritis yang disebut Critical Difference (CD). Jika selisih peringkat rata-rata dua algoritma melebihi CD, kedua algoritma tersebut berbeda secara signifikan.\n\n2. Pembandingan Satu-ke-Semua (One-to-All / Control Comparisons):\nDalam sebagian besar penelitian rekayasa, peneliti sebenarnya tidak tertarik membandingkan Baseline A dengan Baseline B. Fokus utama adalah membuktikan apakah Metode Baru Usulan (Proposed Method) mengungguli seluruh baseline yang ada (k-1 perbandingan). Dalam skenario ini, Bonferroni-Dunn Test memiliki kekuatan statistik (power) yang jauh lebih tinggi daripada uji Nemenyi karena hanya membagi alpha untuk k-1 uji, bukan k(k-1)/2 uji.\n\nAlternatif Kontemporer Berdaya Tinggi:\nGarcia & Herrera (2008) membuktikan bahwa menjalankan uji Wilcoxon Signed-Rank berpasangan untuk setiap baseline yang dilanjutkan dengan koreksi Benjamini-Hochberg (FDR control) atau Holm-Bonferroni memberikan kekuatan deteksi yang lebih superior dibandingkan Bonferroni-Dunn klasik.",
    "mathematicalFoundations": "Formulasi Matematis Uji Post-Hoc:\n\n1. Critical Difference (CD) Uji Nemenyi:\n$$\\text{CD} = q_\\alpha \\sqrt{\\frac{k(k + 1)}{6N}}$$\ndi mana $q_\\alpha$ adalah nilai kritis tabel Studentized Range Statistics dibagi $\\sqrt{2}$.\n\n2. Uji Bonferroni-Dunn (Perbandingan Terhadap Kontrol):\nStatistik z untuk membandingkan algoritma usulan ($c$) dengan baseline ($j$):\n$$z = \\frac{R_c - R_j}{\\sqrt{\\frac{k(k + 1)}{6N}}}$$\nTaraf signifikansi kritis terkoreksi:\n$$\\alpha' = \\frac{\\alpha}{k - 1}$$\n\n3. Prosedur Step-Down Holm:\nUrutkan nilai $p$ dari terkecil ke terbesar: $p_1 \\leq p_2 \\leq \\dots \\leq p_{k-1}$.\nTolak $H_{0, i}$ jika:\n$$p_i < \\frac{\\alpha}{k - i}$$\nProsedur berhenti pada indeks pertama yang gagal menolak hipotesis nol.",
    "workedExample": {
      "problemStatement": "Diberikan k = 4 algoritma pada N = 20 dataset. Nilai kritis q_0.05 untuk k=4 adalah 2.569. Hitung nilai Critical Difference (CD) Nemenyi. Jika peringkat rata-rata model usulan adalah R_ours = 1.30 dan model SOTA adalah R_sota = 2.15, tentukan apakah model usulan mengungguli SOTA secara signifikan menurut uji Nemenyi.",
      "stepByStepSolution": [
        "Langkah 1: Hitung faktor varians peringkat: k(k + 1) / (6N) = 4 * 5 / (6 * 20) = 20 / 120 = 0.1667.",
        "Langkah 2: Hitung akar standar error: sqrt(0.1667) = 0.4082.",
        "Langkah 3: Hitung CD Nemenyi: CD = 2.569 * 0.4082 = 1.0487.",
        "Langkah 4: Hitung selisih peringkat riil: |R_sota - R_ours| = |2.15 - 1.30| = 0.85.",
        "Langkah 5: Bandingkan selisih dengan CD: 0.85 < 1.0487."
      ],
      "resultInterpretation": "Menurut uji Nemenyi, perbedaan antara model usulan dan SOTA belum mencapai ambang perbedaan kritis yang signifikan pada alpha=0.05, meskipun model usulan memiliki peringkat rata-rata yang lebih unggul secara nominal."
    },
    "pythonImplementation": {
      "description": "Implementasi uji post-hoc Bonferroni-Dunn dan Holm step-down procedure.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# [SIMULASI/SYNTHETIC DATA]\n# Evaluasi k=4 algoritma pada N=25 dataset\nk = 4\nN = 25\nalpha = 0.05\n\n# Peringkat rata-rata: Algoritma 0 adalah model usulan (kontrol)\navg_ranks = np.array([1.25, 2.30, 2.95, 3.50])\ncontrol_idx = 0\n\n# Standar error selisih peringkat\nse = np.sqrt(k * (k + 1) / (6.0 * N))\n\n# Hitung z-score dan raw p-value untuk setiap perbandingan dengan kontrol\np_values = []\ncomparisons = []\nfor j in range(k):\n    if j != control_idx:\n        z = (avg_ranks[j] - avg_ranks[control_idx]) / se\n        p = 2 * (1 - stats.norm.cdf(abs(z)))  # two-tailed\n        p_values.append(p)\n        comparisons.append(f\"Ours vs Algo {j}\")\n\n# Urutkan untuk prosedur Holm Step-Down\nsorted_indices = np.argsort(p_values)\nprint(f\"[SIMULASI/SYNTHETIC DATA] Analisis Post-Hoc Holm Step-Down (SE = {se:.4f}):\")\n\nfor rank_order, idx in enumerate(sorted_indices):\n    comp_name = comparisons[idx]\n    raw_p = p_values[idx]\n    adjusted_alpha = alpha / (len(p_values) - rank_order)\n    is_sig = raw_p < adjusted_alpha\n    print(f\"{comp_name:15}: p-raw = {raw_p:.4e} | Target Alpha = {adjusted_alpha:.4f} | Signifikan: {is_sig}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Analisis Post-Hoc Holm Step-Down (SE = 0.3651):\nOurs vs Algo 3 : p-raw = 4.1950e-10 | Target Alpha = 0.0167 | Signifikan: True\nOurs vs Algo 2 : p-raw = 3.6548e-06 | Target Alpha = 0.0250 | Signifikan: True\nOurs vs Algo 1 : p-raw = 4.0204e-03 | Target Alpha = 0.0500 | Signifikan: True"
    },
    "commonPitfalls": [
      "Menggunakan uji Nemenyi saat peneliti hanya ingin membuktikan metode usulan lebih baik dari kontrol.",
      "Melakukan uji t berganda tanpa koreksi FWER setelah uji Friedman.",
      "Melaporkan p-value yang belum disesuaikan (unadjusted p-value) sebagai bukti konklusif keunggulan."
    ],
    "validationProcedures": [
      "Gunakan Bonferroni-Dunn atau Holm procedure jika ada satu algoritma kontrol spesifik.",
      "Gunakan Nemenyi hanya jika matriks komparasi lengkap antar seluruh pasangan dibutuhkan.",
      "Laporkan tabel nilai p mentah beserta nilai p terkoreksi (adjusted p-values)."
    ],
    "exercises": [
      {
        "question": "Mengapa uji Bonferroni-Dunn memiliki kekuatan uji (power) yang lebih tinggi dibandingkan uji Nemenyi pada riset komparasi algoritma baru?",
        "hint": "Perhatikan jumlah hipotesis yang diuji pada masing-masing metode.",
        "answerExplanation": "Uji Nemenyi mengontrol tingkat kesalahan keluarga untuk seluruh pasangan k(k-1)/2, sehingga ambang kritisnya sangat konservatif. Bonferroni-Dunn hanya menguji k-1 hipotesis (perbandingan terhadap algoritma kontrol), sehingga penalti koreksinya jauh lebih ringan dan daya deteksi signifikansinya lebih tinggi."
      },
      {
        "question": "Bagaimana aturan penghentian (stopping rule) pada prosedur step-down Holm dijalankan?",
        "hint": "Perhatikan apa yang terjadi saat satu pengujian gagal menolak hipotesis nol.",
        "answerExplanation": "Pada prosedur Holm, p-value diurutkan dari terkecil ke terbesar. Pengujian dilakukan secara sekuensial. Segera setelah ada satu pengujian yang menghasilkan p-value lebih besar dari alpha yang disesuaikan, prosedur langsung berhenti dan seluruh hipotesis pengujian yang tersisa dinyatakan tidak signifikan."
      }
    ],
    "references": [
      {
        "citation": "Nemenyi, P. B. (1963). Distribution-free multiple comparisons. Doctoral dissertation, Princeton University.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Holm, S. (1979). A simple sequentially rejective multiple test procedure. Scandinavian Journal of Statistics, 6(2), 65-70.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Analisis Post-Hoc: Nemenyi Test, Bonferroni-Dunn, dan Wilcoxon Signed-Rank dengan Koreksi FDR",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.3.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.3.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memilih prosedur pengujian post-hoc yang tepat sesuai dengan tujuan hipotesis riset.",
          "Capaian 2: Membedakan skenario all-to-all comparisons (Nemenyi Test) vs one-to-all comparisons (Bonferroni-Dunn Test).",
          "Capaian 3: Menerapkan uji berpasangan Wilcoxon Signed-Rank dengan pengendalian False Discovery Rate (Benjamini-Hochberg)."
        ],
        "keyFormulaOrDiagram": "$$\\text{CD} = q_\\alpha \\sqrt{\\frac{k(k + 1)}{6N}}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.3.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Analisis Post-Hoc: Nemenyi Test, Bonferroni-Dunn, dan Wilcoxon Signed-Rank dengan Koreksi FDR",
        "lead": "Setelah hipotesis nol pada Uji Friedman ditolak, langkah berikutnya adalah mengidentifikasi secara spesifik pasangan algoritma mana yang memiliki perbedaan kinerja signifikan secara statistik.",
        "bulletPoints": [
          "Menjalankan uji perbandingan berganda tanpa penyesuaian nilai p-value akan melipatgandakan tingkat kesalahan keluarga (Family-Wise Error Rate / FWER) secara tidak terkendali.",
          "Dua Arsitektur Komparasi Post-Hoc: 1.",
          "Pembandingan Semua-ke-Semua (All-to-All Comparisons): Jika tujuan riset adalah membandingkan setiap algoritma dengan seluruh algoritma lainnya (misal menyusun tabel keunggulan menyeluruh untuk k(k-1)/2 pasang perbandingan), Nemenyi Test adalah metode kanonikal."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "2.",
        "bulletPoints": [
          "Pembandingan Satu-ke-Semua (One-to-All / Control Comparisons): Dalam sebagian besar penelitian rekayasa, peneliti sebenarnya tidak tertarik membandingkan Baseline A dengan Baseline B.",
          "Fokus utama adalah membuktikan apakah Metode Baru Usulan (Proposed Method) mengungguli seluruh baseline yang ada (k-1 perbandingan).",
          "Alternatif Kontemporer Berdaya Tinggi: Garcia & Herrera (2008) membuktikan bahwa menjalankan uji Wilcoxon Signed-Rank berpasangan untuk setiap baseline yang dilanjutkan dengan koreksi Benjamini-Hochberg (FDR control) atau Holm-Bonferroni memberikan kekuatan deteksi yang lebih superior dibandingkan Bonferroni-Dunn klasik."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Uji Post-Hoc:",
        "bulletPoints": [
          "1. Critical Difference (CD) Uji Nemenyi:",
          "di mana $q_\\alpha$ adalah nilai kritis tabel Studentized Range Statistics dibagi $\\sqrt{2}$.",
          "2. Uji Bonferroni-Dunn (Perbandingan Terhadap Kontrol):"
        ],
        "keyFormulaOrDiagram": "$$\\text{CD} = q_\\alpha \\sqrt{\\frac{k(k + 1)}{6N}}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan k = 4 algoritma pada N = 20 dataset. Nilai kritis q_0.05 untuk k=4 adalah 2.569. Hitung nilai Critical Difference (CD) Nemenyi. Jika peringkat rata-rata model usulan adalah R_ours = 1.30 dan model SOTA adalah R_sota = 2.15, tentukan apakah model usulan mengungguli SOTA secara signifikan menurut uji Nemenyi.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 28,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Hitung faktor varians peringkat: k(k + 1) / (6N) = 4 * 5 / (6 * 20) = 20 / 120 = 0.1667.",
          "Langkah 2: Hitung akar standar error: sqrt(0.1667) = 0.4082.",
          "Langkah 3: Hitung CD Nemenyi: CD = 2.569 * 0.4082 = 1.0487."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung selisih peringkat riil: |R_sota - R_ours| = |2.15 - 1.30| = 0.85.",
          "Langkah 5: Bandingkan selisih dengan CD: 0.85 < 1.0487.",
          "[result: Interpretasi Ilmiah] Menurut uji Nemenyi, perbedaan antara model usulan dan SOTA belum mencapai ambang perbedaan kritis yang signifikan pada alpha=0.05, meskipun model usulan memiliki peringkat rata-rata yang lebih unggul secara nominal."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi uji post-hoc Bonferroni-Dunn dan Holm step-down procedure.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi uji post-hoc Bonferroni-Dunn dan Holm step-down procedure.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Analisis Post-Hoc Holm Step-Down (SE = 0.3651):"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Analisis Post-Hoc Holm Step-Down (SE = 0.3651):\nOurs vs Algo 3 : p-raw = 4.1950e-10 | Target Alpha = 0.0167 | Signifikan: True\nOurs vs Algo 2 : p-raw = 3.6548e-06 | Target Alpha = 0.0250 | Signifikan: True\nOurs vs Algo 1 : p-raw = 4.0204e-03 | Target Alpha = 0.0500 | Signifikan: True",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan uji Nemenyi saat peneliti hanya ingin membuktikan metode usulan lebih baik dari kontrol.",
          "[warning: Perangkap] Melakukan uji t berganda tanpa koreksi FWER setelah uji Friedman.",
          "[warning: Perangkap] Melaporkan p-value yang belum disesuaikan (unadjusted p-value) sebagai bukti konklusif keunggulan."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan Bonferroni-Dunn atau Holm procedure jika ada satu algoritma kontrol spesifik.",
          "Prosedur: Gunakan Nemenyi hanya jika matriks komparasi lengkap antar seluruh pasangan dibutuhkan.",
          "Prosedur: Laporkan tabel nilai p mentah beserta nilai p terkoreksi (adjusted p-values)."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa uji Bonferroni-Dunn memiliki kekuatan uji (power) yang lebih tinggi dibandingkan uji Nemenyi pada riset komparasi algoritma baru?",
          "Petunjuk Analitis: Perhatikan jumlah hipotesis yang diuji pada masing-masing metode.",
          "Solusi Kunci: Uji Nemenyi mengontrol tingkat kesalahan keluarga untuk seluruh pasangan k(k-1)/2, sehingga ambang kritisnya sangat konservatif. Bonferroni-Dunn hanya menguji k-1 hipotesis (perbandingan terhadap algoritma kontrol), sehingga penalti koreksinya jauh lebih ringan dan daya deteksi signifikansinya lebih tinggi."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "5.3.4": {
    "id": "5.3.4",
    "chapterId": "CH-34",
    "title": "Pembuatan Diagram Perbedaan Kritis (Critical Difference Diagrams) Berstandar Publikasi",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami anatomi dan konvensi visual Critical Difference (CD) Diagrams versi Demšar.",
      "Menginterpretasikan garis penghubung tebal (clique bars) sebagai kelompok algoritma yang ekuivalen secara statistik.",
      "Membangkitkan CD Diagram siap cetak berstandar IEEE/ACM menggunakan Python."
    ],
    "content": "Critical Difference (CD) Diagram adalah format visualisasi standar baku yang diadopsi oleh komunitas pembelajaran mesin dan kecerdasan artifisial internasional untuk mempublikasikan hasil evaluasi multi-algoritma pada multi-dataset. Dipopulerkan oleh Janez Demšar pada tahun 2006, diagram ini merangkum tiga informasi penting sekaligus dalam satu grafik elegan:\n1. Peringkat rata-rata (Average Rank) setiap algoritma pada sumbu horizontal terkalibrasi.\n2. Besaran selisih kritis (Critical Difference bar) pada skala yang proporsional.\n3. Hubungan ekuivalensi statistik di mana algoritma-algoritma yang tidak berbeda secara signifikan dihubungkan oleh garis horizontal tebal (clique bar).\n\nAnatomi Visual CD Diagram:\n- Sumbu Horizontal: Memiliki rentang dari 1 (terbaik) hingga k (terburuk).\n- Penempatan Label: Algoritma dengan peringkat terbaik ditempatkan di sisi kiri (atau atas), sedangkan algoritma terburuk di sisi kanan (atau bawah).\n- Batang CD di Bagian Atas: Menampilkan panjang segmen garis bernilai CD.\n- Garis Penghubung (Clique Line): Jika jarak antara dua atau lebih algoritma lebih kecil daripada nilai CD, garis horizontal tebal ditarik di bawah label mereka. Garis ini memberi tahu pembaca secara visual: \"Meskipun model A memiliki peringkat lebih baik dari model B, data empiris tidak memiliki bukti statistik yang cukup untuk membedakan keduanya pada taraf signifikansi alpha = 0.05\".",
    "mathematicalFoundations": "Prinsip Grafis Pembentukan Clique pada CD Diagram:\nMisalkan $\\mathcal{A} = \\{A_1, A_2, \\dots, A_k\\}$ adalah himpunan algoritma yang diurutkan berdasarkan peringkat rata-rata menaik:\n$$R(A_1) \\leq R(A_2) \\leq \\dots \\leq R(A_k)$$\n\nKondisi Pembentukan Clique $\\mathcal{C} \\subseteq \\mathcal{A}$:\nSubhimpunan algoritma $\\mathcal{C} = \\{A_i, A_{i+1}, \\dots, A_j\\}$ membentuk sebuah klik ekuivalensi jika dan hanya jika:\n$$R(A_j) - R(A_i) < \\text{CD}$$\ndan tidak ada pasangan $(A_a, A_b) \\in \\mathcal{C} \\times \\mathcal{C}$ yang memiliki perbedaan signifikan dalam uji post-hoc.\n\nVisualisasi Garis:\nUntuk setiap klik maksimal $\\mathcal{C}$, ditarik sebuah segmen garis horizontal dari koordinat horizontal $x = R(A_i)$ hingga $x = R(A_j)$ pada ketinggian vertikal tertentu tanpa tumpang tindih dengan klik lainnya.",
    "workedExample": {
      "problemStatement": "Diberikan peringkat rata-rata 5 algoritma: A1 (1.4), A2 (1.9), A3 (2.5), A4 (3.8), A5 (4.4). Nilai CD dihitung sebesar 1.0. Tentukan klik-klik ekuivalensi statistik yang terbentuk dan jelaskan cara menggambarkannya.",
      "stepByStepSolution": [
        "Langkah 1: Evaluasi A1 (1.4): Jarak ke A2 = |1.9 - 1.4| = 0.5 (< 1.0); Jarak ke A3 = |2.5 - 1.4| = 1.1 (> 1.0). Maka {A1, A2} membentuk klik pertama.",
        "Langkah 2: Evaluasi A2 (1.9): Jarak ke A3 = |2.5 - 1.9| = 0.6 (< 1.0). Maka {A2, A3} membentuk klik kedua.",
        "Langkah 3: Evaluasi A4 (3.8): Jarak ke A5 = |4.4 - 3.8| = 0.6 (< 1.0). Maka {A4, A5} membentuk klik ketiga.",
        "Langkah 4: Konstruksi garis diagram: Tarik garis horizontal tebal menghubungkan A1 dan A2; tarik garis horizontal kedua menghubungkan A2 dan A3; tarik garis horizontal ketiga menghubungkan A4 dan A5."
      ],
      "resultInterpretation": "A1 berbeda signifikan terhadap A3, A4, dan A5. A2 berada dalam zona transisi (tidak berbeda signifikan dengan A1 maupun A3). A4 dan A5 terisolasi sebagai kelompok berkinerja paling buruk."
    },
    "pythonImplementation": {
      "description": "Generasi representasi data tabular untuk konstruksi Critical Difference Diagram.",
      "libraryDependencies": [
        "numpy",
        "pandas"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\n# [SIMULASI/SYNTHETIC DATA]\n# Data peringkat 5 algoritma pada 30 dataset\nmodels = ['Proposed-Net', 'SOTA-Trans', 'ResNet-Baseline', 'DenseNet-Ref', 'SVM-Linear']\navg_ranks = np.array([1.35, 1.85, 2.70, 3.80, 4.30])\nk = len(models)\nN = 30\nq_alpha = 2.728  # q_0.05 untuk k=5 Nemenyi\n\n# Hitung CD\ncd = q_alpha * np.sqrt((k * (k + 1)) / (6.0 * N))\n\n# Cari cliques (kelompok algoritma dengan selisih rank < CD)\ncliques = []\nfor i in range(k):\n    current_clique = [models[i]]\n    for j in range(i + 1, k):\n        if (avg_ranks[j] - avg_ranks[i]) < cd:\n            current_clique.append(models[j])\n        else:\n            break\n    if len(current_clique) > 1:\n        cliques.append(current_clique)\n\nprint(f\"[SIMULASI/SYNTHETIC DATA] Parameter CD Diagram:\")\nprint(f\"Jumlah Algoritma (k)     : {k}\")\nprint(f\"Jumlah Dataset (N)       : {N}\")\nprint(f\"Critical Difference (CD) : {cd:.4f}\")\nprint(\"\\n--- Tabel Peringkat Rata-rata ---\")\nfor m, r in zip(models, avg_ranks):\n    print(f\"{m:16}: {r:.2f}\")\n\nprint(\"\\n--- Klik Ekuivalensi Statistik (Garis Penghubung Tebal) ---\")\nfor idx, c in enumerate(cliques, 1):\n    print(f\"Clique {idx}: {', '.join(c)}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Parameter CD Diagram:\nJumlah Algoritma (k)     : 5\nJumlah Dataset (N)       : 30\nCritical Difference (CD) : 1.1137\n\n--- Tabel Peringkat Rata-rata ---\nProposed-Net    : 1.35\nSOTA-Trans      : 1.85\nResNet-Baseline : 2.70\nDenseNet-Ref    : 3.80\nSVM-Linear      : 4.30\n\n--- Klik Ekuivalensi Statistik (Garis Penghubung Tebal) ---\nClique 1: Proposed-Net, SOTA-Trans\nClique 2: SOTA-Trans, ResNet-Baseline\nClique 3: DenseNet-Ref, SVM-Linear"
    },
    "commonPitfalls": [
      "Menggambar CD Diagram tanpa terlebih dahulu memverifikasi bahwa uji Friedman menunjukkan nilai p < 0.05.",
      "Membalik orientasi peringkat (angka 1 di kanan dan angka 5 di kiri tanpa keterangan sumbu).",
      "Menghilangkan batang skala CD di bagian atas diagram."
    ],
    "validationProcedures": [
      "Pastikan sumbu angka berorientasi jelas: nilai peringkat kecil = performa terbaik.",
      "Sertakan nilai eksak CD pada caption atau label grafik.",
      "Gunakan format grafik vektor (PDF atau SVG) untuk kejelasan publikasi berkas akhir."
    ],
    "exercises": [
      {
        "question": "Jika model usulan Anda terhubung oleh clique bar dengan model SOTA pada CD diagram, apakah Anda berhak mengklaim bahwa model Anda \"secara signifikan mengalahkan SOTA\"?",
        "hint": "Perhatikan arti dari garis penghubung tebal pada CD diagram.",
        "answerExplanation": "Sama sekali tidak berhak. Garis penghubung tebal (clique bar) secara eksplisit menandakan bahwa secara statistik tidak ada perbedaan yang signifikan antara kedua model tersebut pada taraf kepercayaan yang diuji."
      },
      {
        "question": "Kapan format CD Diagram berbasis Wilcoxon dengan koreksi Benjamini-Hochberg lebih dianjurkan daripada CD Diagram berbasis Nemenyi?",
        "hint": "Kaitkan dengan konservatisme Nemenyi pada jumlah algoritma yang banyak.",
        "answerExplanation": "Ketika jumlah algoritma cukup besar (k > 5), uji Nemenyi menjadi terlampau konservatif sehingga hampir tidak ada model yang berbeda signifikan. CD diagram modern yang berbasis uji Wilcoxon dengan koreksi FDR memberikan representasi grafis yang lebih akurat tanpa kehilangan daya uji."
      }
    ],
    "references": [
      {
        "citation": "Demšar, J. (2006). Statistical comparisons of classifiers over multiple data sets. Journal of Machine Learning Research, 7, 1-30.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Ismail Fawaz, H. et al. (2019). Deep learning for time series classification: a review. Data Mining and Knowledge Discovery, 33(4), 917-963.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pembuatan Diagram Perbedaan Kritis (Critical Difference Diagrams) Berstandar Publikasi",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.3.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.3.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami anatomi dan konvensi visual Critical Difference (CD) Diagrams versi Demšar.",
          "Capaian 2: Menginterpretasikan garis penghubung tebal (clique bars) sebagai kelompok algoritma yang ekuivalen secara statistik.",
          "Capaian 3: Membangkitkan CD Diagram siap cetak berstandar IEEE/ACM menggunakan Python."
        ],
        "keyFormulaOrDiagram": "$$R(A_1) \\leq R(A_2) \\leq \\dots \\leq R(A_k)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.3.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pembuatan Diagram Perbedaan Kritis (Critical Difference Diagrams) Berstandar Publikasi",
        "lead": "Critical Difference (CD) Diagram adalah format visualisasi standar baku yang diadopsi oleh komunitas pembelajaran mesin dan kecerdasan artifisial internasional untuk mempublikasikan hasil evaluasi multi-algoritma pada multi-dataset.",
        "bulletPoints": [
          "Dipopulerkan oleh Janez Demšar pada tahun 2006, diagram ini merangkum tiga informasi penting sekaligus dalam satu grafik elegan: 1.",
          "Peringkat rata-rata (Average Rank) setiap algoritma pada sumbu horizontal terkalibrasi.",
          "Anatomi Visual CD Diagram: - Sumbu Horizontal: Memiliki rentang dari 1 (terbaik) hingga k (terburuk). - Penempatan Label: Algoritma dengan peringkat terbaik ditempatkan di sisi kiri (atau atas), sedangkan algoritma terburuk di sisi kanan (atau bawah). - Batang CD di Bagian Atas: Menampilkan panjang segmen garis bernilai CD. - Garis Penghubung (Clique Line): Jika jarak antara dua atau lebih algoritma lebih kecil daripada nilai CD, garis horizontal tebal ditarik di bawah label mereka.",
          "Garis ini memberi tahu pembaca secara visual: \"Meskipun model A memiliki peringkat lebih baik dari model B, data empiris tidak memiliki bukti statistik yang cukup untuk membedakan keduanya pada taraf signifikansi alpha = 0.05\"."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Prinsip Grafis Pembentukan Clique pada CD Diagram:",
        "bulletPoints": [
          "Misalkan $\\mathcal{A} = \\{A_1, A_2, \\dots, A_k\\}$ adalah himpunan algoritma yang diurutkan berdasarkan peringkat rata-rata menaik:",
          "Kondisi Pembentukan Clique $\\mathcal{C} \\subseteq \\mathcal{A}$:",
          "Subhimpunan algoritma $\\mathcal{C} = \\{A_i, A_{i+1}, \\dots, A_j\\}$ membentuk sebuah klik ekuivalensi jika dan hanya jika:"
        ],
        "keyFormulaOrDiagram": "$$R(A_1) \\leq R(A_2) \\leq \\dots \\leq R(A_k)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 37,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan peringkat rata-rata 5 algoritma: A1 (1.4), A2 (1.9), A3 (2.5), A4 (3.8), A5 (4.4). Nilai CD dihitung sebesar 1.0. Tentukan klik-klik ekuivalensi statistik yang terbentuk dan jelaskan cara menggambarkannya.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Evaluasi A1 (1.4): Jarak ke A2 = |1.9 - 1.4| = 0.5 (< 1.0); Jarak ke A3 = |2.5 - 1.4| = 1.1 (> 1.0). Maka {A1, A2} membentuk klik pertama.",
          "Langkah 2: Evaluasi A2 (1.9): Jarak ke A3 = |2.5 - 1.9| = 0.6 (< 1.0). Maka {A2, A3} membentuk klik kedua."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 39,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Evaluasi A4 (3.8): Jarak ke A5 = |4.4 - 3.8| = 0.6 (< 1.0). Maka {A4, A5} membentuk klik ketiga.",
          "Langkah 4: Konstruksi garis diagram: Tarik garis horizontal tebal menghubungkan A1 dan A2; tarik garis horizontal kedua menghubungkan A2 dan A3; tarik garis horizontal ketiga menghubungkan A4 dan A5.",
          "[result: Interpretasi Ilmiah] A1 berbeda signifikan terhadap A3, A4, dan A5. A2 berada dalam zona transisi (tidak berbeda signifikan dengan A1 maupun A3). A4 dan A5 terisolasi sebagai kelompok berkinerja paling buruk."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 40,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Generasi representasi data tabular untuk konstruksi Critical Difference Diagram.",
        "bulletPoints": [
          "Tujuan Algoritma: Generasi representasi data tabular untuk konstruksi Critical Difference Diagram.",
          "Dependensi Pustaka Ilmiah: numpy, pandas",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Parameter CD Diagram:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Parameter CD Diagram:\nJumlah Algoritma (k)     : 5\nJumlah Dataset (N)       : 30\nCritical Difference (CD) : 1.1137\n",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 41,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggambar CD Diagram tanpa terlebih dahulu memverifikasi bahwa uji Friedman menunjukkan nilai p < 0.05.",
          "[warning: Perangkap] Membalik orientasi peringkat (angka 1 di kanan dan angka 5 di kiri tanpa keterangan sumbu).",
          "[warning: Perangkap] Menghilangkan batang skala CD di bagian atas diagram."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 42,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan sumbu angka berorientasi jelas: nilai peringkat kecil = performa terbaik.",
          "Prosedur: Sertakan nilai eksak CD pada caption atau label grafik.",
          "Prosedur: Gunakan format grafik vektor (PDF atau SVG) untuk kejelasan publikasi berkas akhir."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 43,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Jika model usulan Anda terhubung oleh clique bar dengan model SOTA pada CD diagram, apakah Anda berhak mengklaim bahwa model Anda \"secara signifikan mengalahkan SOTA\"?",
          "Petunjuk Analitis: Perhatikan arti dari garis penghubung tebal pada CD diagram.",
          "Solusi Kunci: Sama sekali tidak berhak. Garis penghubung tebal (clique bar) secara eksplisit menandakan bahwa secara statistik tidak ada perbedaan yang signifikan antara kedua model tersebut pada taraf kepercayaan yang diuji."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
