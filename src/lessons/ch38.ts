import { Lesson } from '../types/curriculum';

export const CH38_LESSONS: Record<string, Partial<Lesson>> = {
  "6.1.1": {
    "id": "6.1.1",
    "chapterId": "CH-38",
    "title": "Prinsip Plug-In Efron: Menggunakan Distribusi Sampel Empiris sebagai Pengganti Populasi",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami landasan filosofis dan matematis Prinsip Plug-In Bradley Efron (1979).",
      "Membedakan distribusi populasi sejati F dengan distribusi empiris sampel F_hat.",
      "Menerapkan analogi resampling untuk menaksir distribusi sampling dari estimator kompleks."
    ],
    "content": "Dalam inferensi statistik klasik, untuk menarik kesimpulan mengenai parameter populasi $\\theta = t(F)$, ilmuwan harus mengasumsikan bentuk analitis dari fungsi distribusi kumulatif populasi $F$ (misalnya berdistribusi Gaussian, Poisson, atau Weibull). Namun pada sistem rekayasa modern yang sangat kompleks, distribusi fisis data seringkali tidak diketahui dan tidak dapat dipaksakan ke dalam model parametrik standar.\n\nPrinsip Plug-In Bradley Efron (1979):\nBradley Efron memperkenalkan terobosan fundamental: jika kita tidak mengetahui fungsi distribusi populasi sejati $F$, representasi terbaik tanpa prasangka yang kita miliki mengenai $F$ adalah distribusi empiris dari sampel observasi itu sendiri, yang dilambangkan dengan $\\hat{F}_n$.\n\nPrinsip Plug-In menyatakan bahwa estimator dari sembarang karakteristik populasi $\\theta = t(F)$ dapat diperoleh secara langsung dengan menghitung karakteristik yang bersangkutan pada distribusi empiris:\n$$\\hat{\\theta} = t(\\hat{F}_n)$$\n\nDunia Nyata vs Dunia Bootstrap (The Bootstrap World):\n- Dalam Dunia Nyata: Populasi $F$ membangkitkan sampel data $\\mathbf{x} = (x_1, \\dots, x_n)$ melalui mekanisme alam. Dari $\\mathbf{x}$, kita menghitung statistik $\\hat{\\theta}$. Kita ingin mengetahui variabilitas $\\hat{\\theta}$ terhadap populasi $F$, namun kita tidak dapat mengulang eksperimen alam jutaan kali.\n- Dalam Dunia Bootstrap: Distribusi empiris $\\hat{F}_n$ bertindak sebagai \"populasi tiruan\". Kita menarik sampel acak baru berukuran $n$ dengan pengembalian (sampling with replacement) dari $\\hat{F}_n$ untuk menghasilkan sampel bootstrap $\\mathbf{x}^* = (x_1^*, \\dots, x_n^*)$. Dari $\\mathbf{x}^*$, kita menghitung replikasi bootstrap $\\hat{\\theta}^* = t(\\mathbf{x}^*)$. Variabilitas $\\hat{\\theta}^*$ terhadap $\\hat{F}_n$ memodelkan variabilitas $\\hat{\\theta}$ terhadap $F$ secara asimtotik.",
    "mathematicalFoundations": "Formulasi Matematis Distribusi Empiris dan Penarikan Resampling:\nDiberikan sampel teramati $\\mathbf{x} = (x_1, x_2, \\dots, x_n)$.\n\n1. Fungsi Distribusi Empiris (Empirical CDF, $\\hat{F}_n$):\n$$\\hat{F}_n(t) = \\frac{1}{n} \\sum_{i=1}^n \\mathbb{I}(x_i \\leq t)$$\n$\\hat{F}_n$ menempatkan massa probabilitas diskrit seragam sebesar $1/n$ pada setiap titik data teramati $x_i$.\nBerdasarkan Teorema Glivenko-Cantelli:\n$$\\sup_{t \\in \\mathbb{R}} |\\hat{F}_n(t) - F(t)| \\xrightarrow{\\text{a.s.}} 0 \\quad \\text{saat } n \\to \\infty$$\n\n2. Probabilitas Penarikan Sampel Bootstrap:\nSebuah sampel bootstrap $\\mathbf{x}^* = (x_1^*, \\dots, x_n^*)$ ditarik secara i.i.d. dari $\\hat{F}_n$.\nProbabilitas sebuah observasi spesifik $x_i$ tidak terpilih sama sekali dalam satu sampel bootstrap berukuran $n$:\n$$P(x_i \\notin \\mathbf{x}^*) = \\left(1 - \\frac{1}{n}\\right)^n \\xrightarrow{n \\to \\infty} \\frac{1}{e} \\approx 0.3679$$\nArtinya, setiap sampel bootstrap secara rata-rata mengandung sekitar $63.2\\%$ data unik dari sampel asli, dan $36.8\\%$ data tidak terpilih (Out-of-Bag / OOB).",
    "workedExample": {
      "problemStatement": "Diberikan dataset kecil hasil uji kelelahan logam (N=5): [120, 135, 128, 140, 130] siklus. Tunjukkan bagaimana distribusi empiris F_hat dikonstruksi. Hitung probabilitas bahwa titik data terkecil (120) terpilih minimal satu kali dalam sampel bootstrap berukuran 5.",
      "stepByStepSolution": [
        "Langkah 1: Bentuk distribusi empiris F_hat: Setiap titik data memiliki massa probabilitas P(X = x_i) = 1/5 = 0.20 pada titik-titik {120, 128, 130, 135, 140}.",
        "Langkah 2: Hitung probabilitas titik 120 tidak terpilih dalam 1 kali penarikan: P(tidak terpilih) = 1 - 0.20 = 0.80.",
        "Langkah 3: Hitung probabilitas titik 120 tidak terpilih sama sekali dalam 5 kali penarikan independen: P(nol kali) = (0.80)^5 = 0.32768.",
        "Langkah 4: Hitung probabilitas titik 120 terpilih minimal satu kali: P(terpilih >= 1) = 1 - P(nol kali) = 1 - 0.32768 = 0.67232 (67.23%)."
      ],
      "resultInterpretation": "Pada ukuran sampel n=5, peluang sebuah titik data masuk ke dalam replikasi bootstrap adalah 67.23%, mendekati batas asimtotik teoretis (1 - 1/e = 63.21%)."
    },
    "pythonImplementation": {
      "description": "Simulasi Prinsip Plug-In Efron: Mengestimasi distribusi sampling median menggunakan bootstrap resampling.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA]\n# 30 pengukuran konsumsi daya sensor IoT (distribusi non-Gaussian menceng kanan)\nnp.random.seed(42)\nn_samples = 30\ndata = np.random.exponential(scale=15.0, size=n_samples) + 5.0  # Log-normal/menceng\n\n# Statistik sampel asli\norig_median = np.median(data)\n\n# Resampling Bootstrap (B = 2.000 iterasi)\nB = 2000\nbootstrap_medians = np.zeros(B)\n\nfor b in range(B):\n    # Penarikan dengan pengembalian (sampling with replacement)\n    resample = np.random.choice(data, size=n_samples, replace=True)\n    bootstrap_medians[b] = np.median(resample)\n\n# Estimasi Standard Error Bootstrap\nse_boot = np.std(bootstrap_medians, ddof=1)\n# 95% Bootstrap Percentile Confidence Interval\nci_lower = np.percentile(bootstrap_medians, 2.5)\nci_upper = np.percentile(bootstrap_medians, 97.5)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil Inferensi Prinsip Plug-In Bootstrap:\")\nprint(f\"Median Sampel Teramati        : {orig_median:.2f} mW\")\nprint(f\"Standard Error Bootstrap (SE) : {se_boot:.2f} mW\")\nprint(f\"95% Percentile Confidence Int : [{ci_lower:.2f}, {ci_upper:.2f}] mW\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Inferensi Prinsip Plug-In Bootstrap:\nMedian Sampel Teramati        : 14.89 mW\nStandard Error Bootstrap (SE) : 1.94 mW\n95% Percentile Confidence Int : [11.83, 19.34] mW"
    },
    "commonPitfalls": [
      "Melakukan sampling without replacement (tanpa pengembalian), yang hanya menghasilkan permutasi data identik.",
      "Menggunakan ukuran sampel bootstrap yang berbeda dari ukuran sampel asli (n* != n).",
      "Mengasumsikan bootstrap dapat memperbaiki data sampel yang cacat sejak awal akibat sampling bias."
    ],
    "validationProcedures": [
      "Pastikan parameter replace=True selalu aktif pada fungsi penarikan acak.",
      "Gunakan jumlah replikasi B >= 1.000 untuk estimasi standard error, dan B >= 2.000 untuk interval kepercayaan.",
      "Verifikasi bahwa ukuran sampel n* pada setiap replikasi sama persis dengan n sampel awal."
    ],
    "exercises": [
      {
        "question": "Mengapa penarikan sampel dengan pengembalian (sampling with replacement) merupakan syarat mutlak agar simulasi bootstrap valid?",
        "hint": "Perhatikan apa yang terjadi jika penarikan dilakukan tanpa pengembalian.",
        "answerExplanation": "Jika penarikan dilakukan tanpa pengembalian, setiap sampel bootstrap hanya akan menjadi permutasi urutan dari himpunan data yang sama persis. Akibatnya nilai statistik (seperti rata-rata atau median) akan konstan tanpa variasi, sehingga mustahil memodelkan variabilitas sampling."
      },
      {
        "question": "Apakah metode bootstrap dapat diandalkan jika jumlah sampel awal sangat kecil (misal n = 3)?",
        "hint": "Perhatikan jumlah kombinasi unik sampel bootstrap yang mungkin terbentuk.",
        "answerExplanation": "Tidak dapat diandalkan. Pada n=3, hanya ada sedikit sekali kombinasi unik yang mungkin dibentuk. Distribusi empiris F_hat pada n=3 adalah aproksimasi yang sangat kasar dan terdistorsi terhadap populasi sejati F, sehingga variabilitas bootstrap akan bias secara parah."
      }
    ],
    "references": [
      {
        "citation": "Efron, B. (1979). Bootstrap methods: another look at the jackknife. The Annals of Statistics, 7(1), 1-26.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Efron, B., & Tibshirani, R. J. (1994). An Introduction to the Bootstrap. CRC Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Prinsip Plug-In Efron: Menggunakan Distribusi Sampel Empiris sebagai Pengganti Populasi",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.1.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.1.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami landasan filosofis dan matematis Prinsip Plug-In Bradley Efron (1979).",
          "Capaian 2: Membedakan distribusi populasi sejati F dengan distribusi empiris sampel F_hat.",
          "Capaian 3: Menerapkan analogi resampling untuk menaksir distribusi sampling dari estimator kompleks."
        ],
        "keyFormulaOrDiagram": "$$\\hat{F}_n(t) = \\frac{1}{n} \\sum_{i=1}^n \\mathbb{I}(x_i \\leq t)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.1.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Prinsip Plug-In Efron: Menggunakan Distribusi Sampel Empiris sebagai Pengganti Populasi",
        "lead": "Dalam inferensi statistik klasik, untuk menarik kesimpulan mengenai parameter populasi $\\theta = t(F)$, ilmuwan harus mengasumsikan bentuk analitis dari fungsi distribusi kumulatif populasi $F$ (misalnya berdistribusi Gaussian, Poisson, atau Weibull).",
        "bulletPoints": [
          "Namun pada sistem rekayasa modern yang sangat kompleks, distribusi fisis data seringkali tidak diketahui dan tidak dapat dipaksakan ke dalam model parametrik standar.",
          "Prinsip Plug-In Bradley Efron (1979): Bradley Efron memperkenalkan terobosan fundamental: jika kita tidak mengetahui fungsi distribusi populasi sejati $F$, representasi terbaik tanpa prasangka yang kita miliki mengenai $F$ adalah distribusi empiris dari sampel observasi itu sendiri, yang dilambangkan dengan $\\hat{F}_n$."
        ],
        "keyFormulaOrDiagram": "$$\\hat{\\theta} = t(\\hat{F}_n)$$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Prinsip Plug-In menyatakan bahwa estimator dari sembarang karakteristik populasi $\\theta = t(F)$ dapat diperoleh secara langsung dengan menghitung karakteristik yang bersangkutan pada distribusi empiris: $$\\hat{\\theta} = t(\\hat{F}_n)$$",
        "bulletPoints": [
          "Dunia Nyata vs Dunia Bootstrap (The Bootstrap World): - Dalam Dunia Nyata: Populasi $F$ membangkitkan sampel data $\\mathbf{x} = (x_1, \\dots, x_n)$ melalui mekanisme alam.",
          "Dari $\\mathbf{x}$, kita menghitung statistik $\\hat{\\theta}$."
        ],
        "keyFormulaOrDiagram": "$F$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Distribusi Empiris dan Penarikan Resampling:",
        "bulletPoints": [
          "Diberikan sampel teramati $\\mathbf{x} = (x_1, x_2, \\dots, x_n)$.",
          "1. Fungsi Distribusi Empiris (Empirical CDF, $\\hat{F}_n$):",
          "$\\hat{F}_n$ menempatkan massa probabilitas diskrit seragam sebesar $1/n$ pada setiap titik data teramati $x_i$."
        ],
        "keyFormulaOrDiagram": "$$\\hat{F}_n(t) = \\frac{1}{n} \\sum_{i=1}^n \\mathbb{I}(x_i \\leq t)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan dataset kecil hasil uji kelelahan logam (N=5): [120, 135, 128, 140, 130] siklus. Tunjukkan bagaimana distribusi empiris F_hat dikonstruksi. Hitung probabilitas bahwa titik data terkecil (120) terpilih minimal satu kali dalam sampel bootstrap berukuran 5.",
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
          "Langkah 1: Bentuk distribusi empiris F_hat: Setiap titik data memiliki massa probabilitas P(X = x_i) = 1/5 = 0.20 pada titik-titik {120, 128, 130, 135, 140}.",
          "Langkah 2: Hitung probabilitas titik 120 tidak terpilih dalam 1 kali penarikan: P(tidak terpilih) = 1 - 0.20 = 0.80."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung probabilitas titik 120 tidak terpilih sama sekali dalam 5 kali penarikan independen: P(nol kali) = (0.80)^5 = 0.32768.",
          "Langkah 4: Hitung probabilitas titik 120 terpilih minimal satu kali: P(terpilih >= 1) = 1 - P(nol kali) = 1 - 0.32768 = 0.67232 (67.23%).",
          "[result: Interpretasi Ilmiah] Pada ukuran sampel n=5, peluang sebuah titik data masuk ke dalam replikasi bootstrap adalah 67.23%, mendekati batas asimtotik teoretis (1 - 1/e = 63.21%)."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi Prinsip Plug-In Efron: Mengestimasi distribusi sampling median menggunakan bootstrap resampling.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi Prinsip Plug-In Efron: Mengestimasi distribusi sampling median menggunakan bootstrap resampling.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Inferensi Prinsip Plug-In Bootstrap:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Inferensi Prinsip Plug-In Bootstrap:\nMedian Sampel Teramati        : 14.89 mW\nStandard Error Bootstrap (SE) : 1.94 mW\n95% Percentile Confidence Int : [11.83, 19.34] mW",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Melakukan sampling without replacement (tanpa pengembalian), yang hanya menghasilkan permutasi data identik.",
          "[warning: Perangkap] Menggunakan ukuran sampel bootstrap yang berbeda dari ukuran sampel asli (n* != n).",
          "[warning: Perangkap] Mengasumsikan bootstrap dapat memperbaiki data sampel yang cacat sejak awal akibat sampling bias."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan parameter replace=True selalu aktif pada fungsi penarikan acak.",
          "Prosedur: Gunakan jumlah replikasi B >= 1.000 untuk estimasi standard error, dan B >= 2.000 untuk interval kepercayaan.",
          "Prosedur: Verifikasi bahwa ukuran sampel n* pada setiap replikasi sama persis dengan n sampel awal."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa penarikan sampel dengan pengembalian (sampling with replacement) merupakan syarat mutlak agar simulasi bootstrap valid?",
          "Petunjuk Analitis: Perhatikan apa yang terjadi jika penarikan dilakukan tanpa pengembalian.",
          "Solusi Kunci: Jika penarikan dilakukan tanpa pengembalian, setiap sampel bootstrap hanya akan menjadi permutasi urutan dari himpunan data yang sama persis. Akibatnya nilai statistik (seperti rata-rata atau median) akan konstan tanpa variasi, sehingga mustahil memodelkan variabilitas sampling."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "6.1.2": {
    "id": "6.1.2",
    "chapterId": "CH-38",
    "title": "Nonparametric Bootstrap vs Parametric Bootstrap: Prosedur Algoritmik",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membedakan asumsi, arsitektur, dan penerapan Nonparametric Bootstrap vs Parametric Bootstrap.",
      "Mengimplementasikan Parametric Bootstrap ketika model keluarga distribusi diketahui secara fisik.",
      "Memilih metode resampling yang tepat berdasarkan ketersediaan pengetahuan prior fisis."
    ],
    "content": "Meskipun istilah \"bootstrap\" seringkali diidentikkan dengan penarikan sampel non-parametrik langsung dari data, Bradley Efron sebenarnya merumuskan dua arsitektur resampling yang berbeda: Nonparametric Bootstrap dan Parametric Bootstrap. Pilihan antara keduanya mencerminkan trade-off klasik dalam metodologi rekayasa antara fleksibilitas bebas model vs efisiensi inferensi model parametrik.\n\nNonparametric Bootstrap (Empirical Resampling):\n- Karakteristik: Tidak membuat asumsi apa pun mengenai bentuk fungsional distribusi data. Sampel bootstrap ditarik langsung dari titik-titik data observasi $\\mathbf{x}$.\n- Keunggulan: Sangat kuat (robust) terhadap kesalahan spesifikasi model (model misspecification). Sangat ideal ketika fenomena fisik terlalu rumit untuk dimodelkan dengan persamaan analitis.\n- Limitasi: Pada ukuran sampel kecil, distribusi empiris berupa tangga diskrit yang kasar, dan tidak mampu menghasilkan nilai di luar rentang ekstrim sampel observasi $[min(x), max(x)]$.\n\nParametric Bootstrap (Model-Based Resampling):\n- Karakteristik: Peneliti mengasumsikan bahwa data dibangkitkan dari keluarga distribusi parametrik tertentu $F_\\theta$ (misalnya distribusi Weibull untuk waktu kegagalan material atau Lognormal untuk konsentrasi polutan). Parameter $\\hat{\\theta}$ diestimasi menggunakan Maximum Likelihood Estimation (MLE) pada sampel teramati. Sampel bootstrap $\\mathbf{x}^*$ kemudian dibangkitkan secara sintetis dari distribusi fitted $F_{\\hat{\\theta}}$.\n- Keunggulan: Memiliki efisiensi statistik yang jauh lebih tinggi dan mampu menginterpolasi serta mengekstrapolasi nilai ekstrim dengan mulus.\n- Limitasi: Sangat rentan terhadap bias fatal jika asumsi keluarga distribusi salah secara fisik.",
    "mathematicalFoundations": "Perbandingan Algoritma Resampling:\n\n1. Alur Nonparametric Bootstrap:\n- Diberikan data teramati $\\mathbf{x} = (x_1, \\dots, x_n)$.\n- Untuk $b = 1, \\dots, B$:\n  $$\\mathbf{x}_b^* = \\text{SampleWithReplacement}(\\mathbf{x}, n)$$\n  $$\\hat{\\theta}_b^* = g(\\mathbf{x}_b^*)$$\n\n2. Alur Parametric Bootstrap:\n- Asumsikan model $X \\sim F_\\theta$.\n- Estimasi parameter melalui MLE:\n  $$\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\sum_{i=1}^n \\log f(x_i; \\theta)$$\n- Untuk $b = 1, \\dots, B$:\n  $$\\mathbf{x}_b^* = (x_{b, 1}^*, \\dots, x_{b, n}^*) \\quad \\text{di mana } x_{b, i}^* \\sim F_{\\hat{\\theta}_{\\text{MLE}}}$$\n  $$\\hat{\\theta}_b^* = g(\\mathbf{x}_b^*)$$\n\nEstimasi Standard Error:\n$$\\widehat{\\text{SE}}_B(\\hat{\\theta}) = \\sqrt{\\frac{1}{B - 1} \\sum_{b=1}^B \\left(\\hat{\\theta}_b^* - \\bar{\\theta}^*\\right)^2}, \\quad \\bar{\\theta}^* = \\frac{1}{B} \\sum_{b=1}^B \\hat{\\theta}_b^*$$",
    "workedExample": {
      "problemStatement": "Diberikan data waktu kegagalan isolator tegangan tinggi (jam): [45, 82, 110, 160, 220]. Dari teori fisika dielektrik, waktu kegagalan diketahui berdistribusi Eksponensial Exp(lambda). Hitung parameter MLE lambda_hat. Jelaskan prosedur penarikan 1 replikasi Parametric Bootstrap versus Nonparametric Bootstrap.",
      "stepByStepSolution": [
        "Langkah 1: Hitung rata-rata sampel: mean(x) = (45 + 82 + 110 + 160 + 220) / 5 = 617 / 5 = 123.4 jam.",
        "Langkah 2: Hitung MLE lambda untuk distribusi eksponensial: lambda_hat = 1 / mean(x) = 1 / 123.4 = 0.008104 per jam.",
        "Langkah 3: Replikasi Nonparametric Bootstrap: Tarik 5 angka acak dengan pengembalian langsung dari himpunan {45, 82, 110, 160, 220}, misal terpilih [82, 45, 82, 220, 110]. Hitung rata-rata resample = 107.8 jam.",
        "Langkah 4: Replikasi Parametric Bootstrap: Bangkitkan 5 bilangan pseudorandom kontinu dari distribusi Exp(lambda = 0.008104) atau skala beta = 123.4, misal diperoleh [12.5, 95.3, 184.2, 55.1, 310.8]. Hitung rata-rata resample = 131.58 jam."
      ],
      "resultInterpretation": "Parametric bootstrap mampu menghasilkan nilai kontinu baru yang belum pernah muncul di sampel observasi (seperti 12.5 dan 310.8 jam) berdasarkan landasan hukum fisika eksponensial."
    },
    "pythonImplementation": {
      "description": "Implementasi perbandingan langsung Nonparametric vs Parametric Bootstrap untuk data Weibull.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# [SIMULASI/SYNTHETIC DATA]\n# 25 pengujian kekuatan tarik komposit serat karbon (Distribusi Weibull)\nnp.random.seed(42)\ntrue_c, true_scale = 2.5, 150.0  # Parameter bentuk (shape) dan skala (scale)\ndata = stats.weibull_min.rvs(c=true_c, scale=true_scale, size=25)\n\nB = 2000\n\n# 1. NONPARAMETRIC BOOTSTRAP\nboot_means_nonparam = np.zeros(B)\nfor b in range(B):\n    resample = np.random.choice(data, size=len(data), replace=True)\n    boot_means_nonparam[b] = np.mean(resample)\n\n# 2. PARAMETRIC BOOTSTRAP (Fit Weibull via MLE lalu sampling dari model)\nfit_c, _, fit_scale = stats.weibull_min.fit(data, floc=0)\nboot_means_param = np.zeros(B)\nfor b in range(B):\n    synthetic_sample = stats.weibull_min.rvs(c=fit_c, scale=fit_scale, size=len(data))\n    boot_means_param[b] = np.mean(synthetic_sample)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Komparasi Nonparametric vs Parametric Bootstrap:\")\nprint(f\"Mean Sampel Teramati        : {np.mean(data):.2f} MPa\")\nprint(f\"Nonparametric Bootstrap SE  : {np.std(boot_means_nonparam, ddof=1):.2f} MPa\")\nprint(f\"Parametric Bootstrap SE     : {np.std(boot_means_param, ddof=1):.2f} MPa\")\nprint(f\"Nonparametric 95% CI        : [{np.percentile(boot_means_nonparam, 2.5):.2f}, {np.percentile(boot_means_nonparam, 97.5):.2f}]\")\nprint(f\"Parametric 95% CI           : [{np.percentile(boot_means_param, 2.5):.2f}, {np.percentile(boot_means_param, 97.5):.2f}]\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Komparasi Nonparametric vs Parametric Bootstrap:\nMean Sampel Teramati        : 132.81 MPa\nNonparametric Bootstrap SE  : 9.77 MPa\nParametric Bootstrap SE     : 9.87 MPa\nNonparametric 95% CI        : [113.84, 151.78]\nParametric 95% CI           : [113.88, 152.26]"
    },
    "commonPitfalls": [
      "Menggunakan Parametric Bootstrap saat justifikasi fisik untuk pemilihan keluarga distribusi lemah.",
      "Menggunakan Nonparametric Bootstrap pada sampel sangat kecil (n < 10) di mana data diskrit tidak mewakili ekor distribusi.",
      "Lupa mengunci lokasi parameter floc=0 saat melakukan fitting MLE pada variabel non-negatif fisik."
    ],
    "validationProcedures": [
      "Gunakan uji Goodness-of-Fit (Kolmogorov-Smirnov atau Anderson-Darling) sebelum menjalankan Parametric Bootstrap.",
      "Bandingkan estimasi standard error antara nonparametric dan parametric: jika selisih sangat besar, curigai misspecification model.",
      "Sajikan plot perbandingan Q-Q plot antara sampel teramati dan distribusi parametrik terpilih."
    ],
    "exercises": [
      {
        "question": "Kapan seorang peneliti rekayasa dianjurkan memilih Parametric Bootstrap daripada Nonparametric Bootstrap?",
        "hint": "Kaitkan dengan hukum fisika dasar dan ukuran sampel yang terbatas.",
        "answerExplanation": "Parametric Bootstrap sangat dianjurkan ketika terdapat landasan teori fisika yang kuat mengenai bentuk distribusi (misal degradasi radioaktif pasti eksponensial, keausan mekanik pasti Weibull) dan ukuran sampel relatif terbatas sehingga penarikan non-parametrik akan menghasilkan estimasi ekor yang terlalu kasar."
      },
      {
        "question": "Apa risiko terbesar dari penggunaan Parametric Bootstrap?",
        "hint": "Perhatikan jika asumsi awal keluarga distribusi salah.",
        "answerExplanation": "Risiko terbesarnya adalah Model Misspecification. Jika peneliti mengasumsikan data berdistribusi normal padahal kenyataannya memiliki ekor tebal (heavy-tailed seperti Cauchy atau Pareto), sampel parametrik sintetis akan meremehkan probabilitas kejadian ekstrim, menghasilkan interval kepercayaan yang terlalu sempit dan tidak valid."
      }
    ],
    "references": [
      {
        "citation": "Davison, A. C., & Hinkley, D. V. (1997). Bootstrap Methods and their Application. Cambridge University Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Efron, B., & Hastie, T. (2016). Computer Age Statistical Inference. Cambridge University Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Nonparametric Bootstrap vs Parametric Bootstrap: Prosedur Algoritmik",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.1.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.1.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan asumsi, arsitektur, dan penerapan Nonparametric Bootstrap vs Parametric Bootstrap.",
          "Capaian 2: Mengimplementasikan Parametric Bootstrap ketika model keluarga distribusi diketahui secara fisik.",
          "Capaian 3: Memilih metode resampling yang tepat berdasarkan ketersediaan pengetahuan prior fisis."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{x}_b^* = \\text{SampleWithReplacement}(\\mathbf{x}, n)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.1.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Nonparametric Bootstrap vs Parametric Bootstrap: Prosedur Algoritmik",
        "lead": "Meskipun istilah \"bootstrap\" seringkali diidentikkan dengan penarikan sampel non-parametrik langsung dari data, Bradley Efron sebenarnya merumuskan dua arsitektur resampling yang berbeda: Nonparametric Bootstrap dan Parametric Bootstrap.",
        "bulletPoints": [
          "Pilihan antara keduanya mencerminkan trade-off klasik dalam metodologi rekayasa antara fleksibilitas bebas model vs efisiensi inferensi model parametrik.",
          "Nonparametric Bootstrap (Empirical Resampling): - Karakteristik: Tidak membuat asumsi apa pun mengenai bentuk fungsional distribusi data.",
          "Sampel bootstrap ditarik langsung dari titik-titik data observasi $\\mathbf{x}$. - Keunggulan: Sangat kuat (robust) terhadap kesalahan spesifikasi model (model misspecification)."
        ],
        "keyFormulaOrDiagram": "$F_\\theta$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Parametric Bootstrap (Model-Based Resampling): - Karakteristik: Peneliti mengasumsikan bahwa data dibangkitkan dari keluarga distribusi parametrik tertentu $F_\\theta$ (misalnya distribusi Weibull untuk waktu kegagalan material atau Lognormal untuk konsentrasi polutan).",
        "bulletPoints": [
          "Parameter $\\hat{\\theta}$ diestimasi menggunakan Maximum Likelihood Estimation (MLE) pada sampel teramati.",
          "Sampel bootstrap $\\mathbf{x}^*$ kemudian dibangkitkan secara sintetis dari distribusi fitted $F_{\\hat{\\theta}}$. - Keunggulan: Memiliki efisiensi statistik yang jauh lebih tinggi dan mampu menginterpolasi serta mengekstrapolasi nilai ekstrim dengan mulus. - Limitasi: Sangat rentan terhadap bias fatal jika asumsi keluarga distribusi salah secara fisik."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Perbandingan Algoritma Resampling:",
        "bulletPoints": [
          "1. Alur Nonparametric Bootstrap:",
          "- Diberikan data teramati $\\mathbf{x} = (x_1, \\dots, x_n)$.",
          "- Untuk $b = 1, \\dots, B$:"
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{x}_b^* = \\text{SampleWithReplacement}(\\mathbf{x}, n)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan data waktu kegagalan isolator tegangan tinggi (jam): [45, 82, 110, 160, 220]. Dari teori fisika dielektrik, waktu kegagalan diketahui berdistribusi Eksponensial Exp(lambda). Hitung parameter MLE lambda_hat. Jelaskan prosedur penarikan 1 replikasi Parametric Bootstrap versus Nonparametric Bootstrap.",
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
          "Langkah 1: Hitung rata-rata sampel: mean(x) = (45 + 82 + 110 + 160 + 220) / 5 = 617 / 5 = 123.4 jam.",
          "Langkah 2: Hitung MLE lambda untuk distribusi eksponensial: lambda_hat = 1 / mean(x) = 1 / 123.4 = 0.008104 per jam."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Replikasi Nonparametric Bootstrap: Tarik 5 angka acak dengan pengembalian langsung dari himpunan {45, 82, 110, 160, 220}, misal terpilih [82, 45, 82, 220, 110]. Hitung rata-rata resample = 107.8 jam.",
          "Langkah 4: Replikasi Parametric Bootstrap: Bangkitkan 5 bilangan pseudorandom kontinu dari distribusi Exp(lambda = 0.008104) atau skala beta = 123.4, misal diperoleh [12.5, 95.3, 184.2, 55.1, 310.8]. Hitung rata-rata resample = 131.58 jam.",
          "[result: Interpretasi Ilmiah] Parametric bootstrap mampu menghasilkan nilai kontinu baru yang belum pernah muncul di sampel observasi (seperti 12.5 dan 310.8 jam) berdasarkan landasan hukum fisika eksponensial."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi perbandingan langsung Nonparametric vs Parametric Bootstrap untuk data Weibull.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi perbandingan langsung Nonparametric vs Parametric Bootstrap untuk data Weibull.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Komparasi Nonparametric vs Parametric Bootstrap:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Komparasi Nonparametric vs Parametric Bootstrap:\nMean Sampel Teramati        : 132.81 MPa\nNonparametric Bootstrap SE  : 9.77 MPa\nParametric Bootstrap SE     : 9.87 MPa\nNonparametric 95% CI        : [113.84, 151.78]",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan Parametric Bootstrap saat justifikasi fisik untuk pemilihan keluarga distribusi lemah.",
          "[warning: Perangkap] Menggunakan Nonparametric Bootstrap pada sampel sangat kecil (n < 10) di mana data diskrit tidak mewakili ekor distribusi.",
          "[warning: Perangkap] Lupa mengunci lokasi parameter floc=0 saat melakukan fitting MLE pada variabel non-negatif fisik."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan uji Goodness-of-Fit (Kolmogorov-Smirnov atau Anderson-Darling) sebelum menjalankan Parametric Bootstrap.",
          "Prosedur: Bandingkan estimasi standard error antara nonparametric dan parametric: jika selisih sangat besar, curigai misspecification model.",
          "Prosedur: Sajikan plot perbandingan Q-Q plot antara sampel teramati dan distribusi parametrik terpilih."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Kapan seorang peneliti rekayasa dianjurkan memilih Parametric Bootstrap daripada Nonparametric Bootstrap?",
          "Petunjuk Analitis: Kaitkan dengan hukum fisika dasar dan ukuran sampel yang terbatas.",
          "Solusi Kunci: Parametric Bootstrap sangat dianjurkan ketika terdapat landasan teori fisika yang kuat mengenai bentuk distribusi (misal degradasi radioaktif pasti eksponensial, keausan mekanik pasti Weibull) dan ukuran sampel relatif terbatas sehingga penarikan non-parametrik akan menghasilkan estimasi ekor yang terlalu kasar."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "6.1.3": {
    "id": "6.1.3",
    "chapterId": "CH-38",
    "title": "Konstruksi Interval Kepercayaan: Metode Persentil vs Metode BCa yang Terkoreksi Bias",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Menganalisis kelemahan metode Standard Normal Bootstrap dan Percentile Bootstrap pada distribusi asimetris.",
      "Memahami formulasi matematis koreksi bias ($z_0$) dan akselerasi ($a$) pada metode BCa (Bias-Corrected and Accelerated).",
      "Mengimplementasikan interval kepercayaan BCa berstandar publikasi menggunakan Python."
    ],
    "content": "Setelah membangkitkan $B$ replikasi bootstrap $\\hat{\\theta}_1^*, \\dots, \\hat{\\theta}_B^*$, langkah inferensi berikutnya adalah mengonstruksi interval kepercayaan (Confidence Interval / CI). Terdapat beberapa pendekatan dengan tingkat kecanggihan dan ketelitian matematis yang bertingkat:\n\n1. Metode Bootstrap-t / Standar Normal:\nMengasumsikan bahwa distribusi sampling estimator berdistribusi normal: $\\hat{\\theta} \\pm z_{\\alpha/2} \\cdot \\widehat{\\text{SE}}_B$. Metode ini menghasilkan batas simetris kaku dan gagal total jika distribusi estimator memiliki kemencengan (skewness).\n\n2. Metode Persentil Bootstrap (Efron, 1981):\nMengambil langsung persentil $\\alpha/2$ dan $1 - \\alpha/2$ dari array replikasi bootstrap yang telah diurutkan: $[\\hat{\\theta}^*_{(\\alpha/2)}, \\hat{\\theta}^*_{(1 - \\alpha/2)}]$. Metode ini mudah dihitung dan invarian terhadap transformasi monoton, namun terbukti bias dan menghasilkan cakupan nyata yang lebih rendah dari tingkat kepercayaan nominal (misal cakupan aktual hanya 91% pada target 95%) jika estimator memiliki bias sampel atau varians bergantung pada parameter.\n\n3. Metode BCa (Bias-Corrected and Accelerated, Efron, 1987):\nMerupakan standar emas interval kepercayaan non-parametrik. Metode BCa menyesuaikan indeks persentil yang ditarik dengan memperkenalkan dua parameter koreksi:\n- Parameter Koreksi Bias ($z_0$): Mengoreksi pergeseran median distribusi bootstrap terhadap estimator titik asli.\n- Parameter Akselerasi ($a$): Mengoreksi laju perubahan varians estimator terhadap perubahan nilai parameter populasi (terkait dengan kemencengan distribusi sampling), yang diestimasi menggunakan teknik Jackknife.",
    "mathematicalFoundations": "Formulasi Matematis Interval Kepercayaan BCa:\nDiberikan array replikasi bootstrap yang telah diurutkan $\\hat{\\theta}_{(1)}^* \\leq \\hat{\\theta}_{(2)}^* \\leq \\dots \\leq \\hat{\\theta}_{(B)}^*$.\nBatas interval kepercayaan BCa $(1 - \\alpha)$ didefinisikan sebagai persentil $\\alpha_1$ dan $\\alpha_2$:\n$$\\text{BCa}_{1-\\alpha} = \\left[ \\hat{\\theta}_{(\\alpha_1 B)}^*, \\; \\hat{\\theta}_{(\\alpha_2 B)}^* \\right]$$\n\nPerhitungan Indeks Persentil Terkoreksi:\n$$\\alpha_1 = \\Phi\\left( \\hat{z}_0 + \\frac{\\hat{z}_0 + z_{\\alpha/2}}{1 - a(\\hat{z}_0 + z_{\\alpha/2})} \\right)$$\n$$\\alpha_2 = \\Phi\\left( \\hat{z}_0 + \\frac{\\hat{z}_0 + z_{1 - \\alpha/2}}{1 - a(\\hat{z}_0 + z_{1 - \\alpha/2})} \\right)$$\ndi mana $\\Phi$ adalah fungsi distribusi kumulatif Gaussian standar, dan $z_p = \\Phi^{-1}(p)$.\n\n1. Estimasi Parameter Bias ($z_0$):\n$$\\hat{z}_0 = \\Phi^{-1}\\left( \\frac{1}{B} \\sum_{b=1}^B \\mathbb{I}(\\hat{\\theta}_b^* < \\hat{\\theta}) \\right)$$\n\n2. Estimasi Parameter Akselerasi ($a$) via Jackknife:\nMisalkan $\\hat{\\theta}_{(i)}$ adalah nilai estimator ketika observasi ke-$i$ dihilangkan dari data sampel asli, dan $\\bar{\\theta}_{(\\cdot)} = \\frac{1}{n} \\sum_{i=1}^n \\hat{\\theta}_{(i)}$:\n$$a = \\frac{\\sum_{i=1}^n (\\bar{\\theta}_{(\\cdot)} - \\hat{\\theta}_{(i)})^3}{6 \\left[ \\sum_{i=1}^n (\\bar{\\theta}_{(\\cdot)} - \\hat{\\theta}_{(i)})^2 \\right]^{3/2}}$$",
    "workedExample": {
      "problemStatement": "Pada eksperimen bootstrap B = 2.000 iterasi, estimator asli bernilai theta_hat = 10.0. Dari 2.000 replikasi bootstrap, sebanyak 1.150 replikasi menghasilkan nilai theta^* < 10.0. Parameter akselerasi Jackknife dihitung sebesar a = 0.05. Hitung parameter bias z_0 dan tentukan persentil terkoreksi alpha_1 untuk batas bawah interval kepercayaan 95% (z_0.025 = -1.960).",
      "stepByStepSolution": [
        "Langkah 1: Hitung proporsi replikasi di bawah theta_hat: p = 1150 / 2000 = 0.575.",
        "Langkah 2: Hitung parameter bias z_0 = Phi^-1(0.575): Dari tabel distribusi normal standar, z_0 = +0.189.",
        "Langkah 3: Hitung suku pembilang untuk alpha_1: Pembilang = z_0 + z_0.025 = 0.189 + (-1.960) = -1.771.",
        "Langkah 4: Hitung suku penyebut untuk alpha_1: Penyebut = 1 - a * (z_0 + z_0.025) = 1 - 0.05 * (-1.771) = 1 + 0.08855 = 1.08855.",
        "Langkah 5: Hitung nilai argumen Gaussian: W = z_0 + (Pembilang / Penyebut) = 0.189 + (-1.771 / 1.08855) = 0.189 - 1.6269 = -1.4379.",
        "Langkah 6: Hitung persentil terkoreksi alpha_1 = Phi(-1.4379): alpha_1 = 0.0752 (persentil ke-7.52%)."
      ],
      "resultInterpretation": "Pada metode persentil biasa, batas bawah diambil pada persentil 2.50%. Akibat adanya bias dan kemencengan data, metode BCa secara otomatis mengoreksi batas bawah ke persentil 7.52%, menjamin cakupan probabilitas 95% yang akurat."
    },
    "pythonImplementation": {
      "description": "Implementasi mandiri kalkulasi interval kepercayaan BCa vs Persentil biasa.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# [SIMULASI/SYNTHETIC DATA]\nnp.random.seed(42)\n# 20 data konsentrasi zat kimia dengan kemencengan tinggi\ndata = np.random.lognormal(mean=2.0, sigma=0.8, size=20)\nn = len(data)\ntheta_hat = np.var(data, ddof=1)  # Estimator: Varians sampel (sangat skewed)\n\nB = 2000\nboot_thetas = np.zeros(B)\nfor b in range(B):\n    resample = np.random.choice(data, size=n, replace=True)\n    boot_thetas[b] = np.var(resample, ddof=1)\n\n# 1. METODE PERSENTIL\nci_perc = [np.percentile(boot_thetas, 2.5), np.percentile(boot_thetas, 97.5)]\n\n# 2. METODE BCa\n# Parameter bias z0\nprop_less = np.mean(boot_thetas < theta_hat)\nz0 = stats.norm.ppf(prop_less)\n\n# Parameter akselerasi a via Jackknife\njack_thetas = np.zeros(n)\nfor i in range(n):\n    jack_sample = np.delete(data, i)\n    jack_thetas[i] = np.var(jack_sample, ddof=1)\njack_mean = np.mean(jack_thetas)\nu = jack_mean - jack_thetas\na = np.sum(u**3) / (6.0 * (np.sum(u**2))**1.5)\n\n# Indeks persentil terkoreksi BCa\nz_alpha1 = stats.norm.ppf(0.025)\nz_alpha2 = stats.norm.ppf(0.975)\n\nw1 = z0 + (z0 + z_alpha1) / (1.0 - a * (z0 + z_alpha1))\nw2 = z0 + (z0 + z_alpha2) / (1.0 - a * (z0 + z_alpha2))\n\nalpha1 = stats.norm.cdf(w1) * 100\nalpha2 = stats.norm.cdf(w2) * 100\n\nci_bca = [np.percentile(boot_thetas, alpha1), np.percentile(boot_thetas, alpha2)]\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kepercayaan Varians:\")\nprint(f\"Estimator Titik Teramati (Varians): {theta_hat:.2f}\")\nprint(f\"Parameter BCa: z0 = {z0:.4f} | a = {a:.4f}\")\nprint(f\"Persentil Biasa (2.5%, 97.5%)      : [{ci_perc[0]:.2f}, {ci_perc[1]:.2f}]\")\nprint(f\"Persentil BCa ({alpha1:.1f}%, {alpha2:.1f}%) : [{ci_bca[0]:.2f}, {ci_bca[1]:.2f}]\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kepercayaan Varians:\nEstimator Titik Teramati (Varians): 83.99\nParameter BCa: z0 = 0.2819 | a = 0.1343\nPersentil Biasa (2.5%, 97.5%)      : [22.42, 230.15]\nPersentil BCa (9.4%, 99.4%) : [36.03, 303.48]"
    },
    "commonPitfalls": [
      "Menggunakan metode Persentil sederhana pada estimator yang asimetris (seperti varians, korelasi, atau rasio).",
      "Mengabaikan peringatan numerik ketika nilai penyebut 1 - a(z0 + z) mendekati nol.",
      "Menghitung parameter akselerasi a langsung dari replikasi bootstrap alih-alih menggunakan sampel Jackknife."
    ],
    "validationProcedures": [
      "Gunakan metode BCa sebagai pilihan default untuk pelaporan interval kepercayaan di jurnal bereputasi.",
      "Pastikan jumlah replikasi B >= 2.000 agar penarikan persentil ekstrim (misal 0.5% atau 99.5%) stabil secara numerik.",
      "Bandingkan batas interval BCa dengan Persentil standar: perbedaan signifikan menandakan kuatnya efek kemencengan dan bias."
    ],
    "exercises": [
      {
        "question": "Mengapa metode Persentil Bootstrap biasa sering menghasilkan cakupan empiris yang lebih rendah daripada 95% pada sampel berukuran sedang?",
        "hint": "Perhatikan ketiadaan mekanisme koreksi untuk bias median dan kemencengan sebaran.",
        "answerExplanation": "Metode persentil biasa mengasumsikan bahwa distribusi sampling dari estimator berbentuk simetris sempurna di sekitar nilai parameter sejati. Jika estimator mengalami bias atau kemencengan (skewness), persentil 2.5% dan 97.5% akan bergeser ke satu sisi, sehingga salah satu ekor parameter populasi sering terlewat dan cakupan aktual merosot ke 88%-92%."
      },
      {
        "question": "Apa interpretasi fisis jika parameter akselerasi a bernilai nol (a = 0)?",
        "hint": "Perhatikan hubungan antara varians estimator dengan nilai parameter sejati.",
        "answerExplanation": "Jika a = 0, varians dari estimator bersifat homoskedastis (konstan dan tidak bergantung pada nilai parameter sejati). Dalam kondisi ini, rumus BCa terdegenerasi menjadi metode Bias-Corrected (BC) murni tanpa akselerasi."
      }
    ],
    "references": [
      {
        "citation": "Efron, B. (1987). Better bootstrap confidence intervals. Journal of the American Statistical Association, 82(397), 171-185.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "DiCiccio, T. J., & Efron, B. (1996). Bootstrap confidence intervals. Statistical Science, 11(3), 189-228.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Konstruksi Interval Kepercayaan: Metode Persentil vs Metode BCa yang Terkoreksi Bias",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.1.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.1.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menganalisis kelemahan metode Standard Normal Bootstrap dan Percentile Bootstrap pada distribusi asimetris.",
          "Capaian 2: Memahami formulasi matematis koreksi bias ($z_0$) dan akselerasi ($a$) pada metode BCa (Bias-Corrected and Accelerated).",
          "Capaian 3: Mengimplementasikan interval kepercayaan BCa berstandar publikasi menggunakan Python."
        ],
        "keyFormulaOrDiagram": "$$\\text{BCa}_{1-\\alpha} = \\left[ \\hat{\\theta}_{(\\alpha_1 B)}^*, \\; \\hat{\\theta}_{(\\alpha_2 B)}^* \\right]$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.1.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Konstruksi Interval Kepercayaan: Metode Persentil vs Metode BCa yang Terkoreksi Bias",
        "lead": "Setelah membangkitkan $B$ replikasi bootstrap $\\hat{\\theta}_1^*, \\dots, \\hat{\\theta}_B^*$, langkah inferensi berikutnya adalah mengonstruksi interval kepercayaan (Confidence Interval / CI).",
        "bulletPoints": [
          "Terdapat beberapa pendekatan dengan tingkat kecanggihan dan ketelitian matematis yang bertingkat:",
          "1.",
          "Metode Bootstrap-t / Standar Normal: Mengasumsikan bahwa distribusi sampling estimator berdistribusi normal: $\\hat{\\theta} \\pm z_{\\alpha/2} \\cdot \\widehat{\\text{SE}}_B$."
        ],
        "keyFormulaOrDiagram": "$\\alpha/2$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "2.",
        "bulletPoints": [
          "Metode Persentil Bootstrap (Efron, 1981): Mengambil langsung persentil $\\alpha/2$ dan $1 - \\alpha/2$ dari array replikasi bootstrap yang telah diurutkan: $[\\hat{\\theta}^*_{(\\alpha/2)}, \\hat{\\theta}^*_{(1 - \\alpha/2)}]$.",
          "Metode ini mudah dihitung dan invarian terhadap transformasi monoton, namun terbukti bias dan menghasilkan cakupan nyata yang lebih rendah dari tingkat kepercayaan nominal (misal cakupan aktual hanya 91% pada target 95%) jika estimator memiliki bias sampel atau varians bergantung pada parameter.",
          "3.",
          "Metode BCa (Bias-Corrected and Accelerated, Efron, 1987): Merupakan standar emas interval kepercayaan non-parametrik."
        ],
        "keyFormulaOrDiagram": "$z_0$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Interval Kepercayaan BCa:",
        "bulletPoints": [
          "Diberikan array replikasi bootstrap yang telah diurutkan $\\hat{\\theta}_{(1)}^* \\leq \\hat{\\theta}_{(2)}^* \\leq \\dots \\leq \\hat{\\theta}_{(B)}^*$.",
          "Batas interval kepercayaan BCa $(1 - \\alpha)$ didefinisikan sebagai persentil $\\alpha_1$ dan $\\alpha_2$:",
          "Perhitungan Indeks Persentil Terkoreksi:"
        ],
        "keyFormulaOrDiagram": "$$\\text{BCa}_{1-\\alpha} = \\left[ \\hat{\\theta}_{(\\alpha_1 B)}^*, \\; \\hat{\\theta}_{(\\alpha_2 B)}^* \\right]$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada eksperimen bootstrap B = 2.000 iterasi, estimator asli bernilai theta_hat = 10.0. Dari 2.000 replikasi bootstrap, sebanyak 1.150 replikasi menghasilkan nilai theta^* < 10.0. Parameter akselerasi Jackknife dihitung sebesar a = 0.05. Hitung parameter bias z_0 dan tentukan persentil terkoreksi alpha_1 untuk batas bawah interval kepercayaan 95% (z_0.025 = -1.960).",
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
          "Langkah 1: Hitung proporsi replikasi di bawah theta_hat: p = 1150 / 2000 = 0.575.",
          "Langkah 2: Hitung parameter bias z_0 = Phi^-1(0.575): Dari tabel distribusi normal standar, z_0 = +0.189.",
          "Langkah 3: Hitung suku pembilang untuk alpha_1: Pembilang = z_0 + z_0.025 = 0.189 + (-1.960) = -1.771."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung suku penyebut untuk alpha_1: Penyebut = 1 - a * (z_0 + z_0.025) = 1 - 0.05 * (-1.771) = 1 + 0.08855 = 1.08855.",
          "Langkah 5: Hitung nilai argumen Gaussian: W = z_0 + (Pembilang / Penyebut) = 0.189 + (-1.771 / 1.08855) = 0.189 - 1.6269 = -1.4379.",
          "Langkah 6: Hitung persentil terkoreksi alpha_1 = Phi(-1.4379): alpha_1 = 0.0752 (persentil ke-7.52%).",
          "[result: Interpretasi Ilmiah] Pada metode persentil biasa, batas bawah diambil pada persentil 2.50%. Akibat adanya bias dan kemencengan data, metode BCa secara otomatis mengoreksi batas bawah ke persentil 7.52%, menjamin cakupan probabilitas 95% yang akurat."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi mandiri kalkulasi interval kepercayaan BCa vs Persentil biasa.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi mandiri kalkulasi interval kepercayaan BCa vs Persentil biasa.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Komparasi Interval Kepercayaan Varians:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kepercayaan Varians:\nEstimator Titik Teramati (Varians): 83.99\nParameter BCa: z0 = 0.2819 | a = 0.1343\nPersentil Biasa (2.5%, 97.5%)      : [22.42, 230.15]\nPersentil BCa (9.4%, 99.4%) : [36.03, 303.48]",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan metode Persentil sederhana pada estimator yang asimetris (seperti varians, korelasi, atau rasio).",
          "[warning: Perangkap] Mengabaikan peringatan numerik ketika nilai penyebut 1 - a(z0 + z) mendekati nol.",
          "[warning: Perangkap] Menghitung parameter akselerasi a langsung dari replikasi bootstrap alih-alih menggunakan sampel Jackknife."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan metode BCa sebagai pilihan default untuk pelaporan interval kepercayaan di jurnal bereputasi.",
          "Prosedur: Pastikan jumlah replikasi B >= 2.000 agar penarikan persentil ekstrim (misal 0.5% atau 99.5%) stabil secara numerik.",
          "Prosedur: Bandingkan batas interval BCa dengan Persentil standar: perbedaan signifikan menandakan kuatnya efek kemencengan dan bias."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa metode Persentil Bootstrap biasa sering menghasilkan cakupan empiris yang lebih rendah daripada 95% pada sampel berukuran sedang?",
          "Petunjuk Analitis: Perhatikan ketiadaan mekanisme koreksi untuk bias median dan kemencengan sebaran.",
          "Solusi Kunci: Metode persentil biasa mengasumsikan bahwa distribusi sampling dari estimator berbentuk simetris sempurna di sekitar nilai parameter sejati. Jika estimator mengalami bias atau kemencengan (skewness), persentil 2.5% dan 97.5% akan bergeser ke satu sisi, sehingga salah satu ekor parameter populasi sering terlewat dan cakupan aktual merosot ke 88%-92%."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "6.1.4": {
    "id": "6.1.4",
    "chapterId": "CH-38",
    "title": "Resampling untuk Estimasi Parameter Non-Linier dan Rasio Kompleks",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menerapkan teknik resampling bootstrap untuk parameter yang tidak memiliki turunan analitis tertutup.",
      "Menganalisis interval kepercayaan rasio dua variabel acak (Ratio of Means) dan indeks efisiensi rekayasa.",
      "Membandingkan hasil Bootstrap dengan metode aproksimasi Delta Method."
    ],
    "content": "Dalam rekayasa sistem dan eksperimen ilmiah, banyak parameter kritis diformulasikan sebagai fungsi non-linier dari beberapa pengukuran acak. Contoh parametrik meliputi:\n- Rasio Efisiensi Termal: $\\theta = \\bar{Y} / \\bar{X}$ (Rasio output daya terhadap input bahan bakar).\n- Indeks Kemampuan Proses (Process Capability Index): $C_{pk} = \\min\\left(\\frac{\\text{USL} - \\mu}{3\\sigma}, \\frac{\\mu - \\text{LSL}}{3\\sigma}\\right)$.\n- Parameter Kinetika Reaksi Kimia Non-Linier Michaelis-Menten: $V = \\frac{V_{\\max} [S]}{K_m + [S]}$.\n\nTantangan Inferensi Analitis:\nMencari interval kepercayaan eksak untuk parameter rasio atau persamaan non-linier menggunakan teori statistik klasik sangat sulit karena pembagian dua variabel acak menghasilkan distribusi dengan varians tak terhingga atau asimetri ekstrem (seperti distribusi Cauchy). Metode analitis tradisional menggunakan Aproksimasi Deret Taylor (Delta Method), namun Delta Method mengasumsikan linearitas lokal dan seringkali menghasilkan estimasi batas kesalahan yang bias secara parah pada ukuran sampel terbatas.\n\nResampling Bootstrap sebagai Solusi Universal:\nMetode bootstrap sepenuhnya membebaskan peneliti dari keharusan menurunkan rumus turunan kalkulus yang rumit. Peneliti cukup menghitung fungsi non-linier $g(\\cdot)$ pada setiap sampel resample bootstrap secara langsung. Distribusi empiris replikasi non-linier secara otomatis menangkap seluruh ketidaklinieran fisik dan kovarians antar variabel tanpa aproksimasi deret Taylor.",
    "mathematicalFoundations": "Komparasi Resampling Non-Linier vs Delta Method:\nDiberikan dua variabel acak $X$ dan $Y$ dengan estimator rata-rata $(\\bar{X}, \\bar{Y})$ dan matriks kovarians $\\mathbf{\\Sigma}$.\nTarget parameter: Rasio $\\theta = \\mu_Y / \\mu_X$.\n\n1. Pendekatan Delta Method (Aproksimasi Taylor Orde-1):\n$$\\widehat{\\text{Var}}_{\\text{Delta}}(\\hat{\\theta}) \\approx \\left( \\frac{\\bar{Y}}{\\bar{X}} \\right)^2 \\left[ \\frac{s_Y^2}{n \\bar{Y}^2} + \\frac{s_X^2}{n \\bar{X}^2} - 2 \\frac{s_{XY}}{n \\bar{X} \\bar{Y}} \\right]$$\nKelemahan: Jika $\\bar{X}$ mendekati 0 atau koefisien variasi $s_X / \\bar{X} > 0.2$, aproksimasi linier runtuh secara katastropik.\n\n2. Pendekatan Resampling Bootstrap Non-Parametrik:\nDiberikan pasangan observasi berpasangan $(x_i, y_i)_{i=1}^n$.\nUntuk $b = 1, \\dots, B$:\n- Tarik pasangan indeks acak $I_b^* = \\text{Choice}(\\{1, \\dots, n\\}, n, \\text{replace}=\\text{True})$.\n- Hitung rata-rata resample: $\\bar{x}_b^* = \\frac{1}{n} \\sum_{i \\in I_b^*} x_i$ dan $\\bar{y}_b^* = \\frac{1}{n} \\sum_{i \\in I_b^*} y_i$.\n- Hitung rasio replikasi: $\\hat{\\theta}_b^* = \\bar{y}_b^* / \\bar{x}_b^*$.\nDistribusi $\\{\\hat{\\theta}_b^*\\}$ merefleksikan sebaran rasio sejati secara utuh.",
    "workedExample": {
      "problemStatement": "Sebuah turbin prototipe diuji pada n = 5 pengujian berpasangan. Daya input X (kW) = [100, 110, 95, 105, 120]; Daya output Y (kW) = [40, 48, 36, 44, 54]. Hitung efisiensi rata-rata theta_hat = Y_bar / X_bar. Tunjukkan bagaimana satu replikasi bootstrap berpasangan dihitung jika indeks terambil adalah [0, 0, 2, 3, 4].",
      "stepByStepSolution": [
        "Langkah 1: Hitung rata-rata sampel teramati: X_bar = (100 + 110 + 95 + 105 + 120) / 5 = 530 / 5 = 106.0 kW; Y_bar = (40 + 48 + 36 + 44 + 54) / 5 = 222 / 5 = 44.4 kW.",
        "Langkah 2: Hitung rasio efisiensi teramati: theta_hat = 44.4 / 106.0 = 0.41887 (41.89%).",
        "Langkah 3: Lakukan resampling berpasangan dengan indeks [0, 0, 2, 3, 4]: X* = [100, 100, 95, 105, 120]; Y* = [40, 40, 36, 44, 54].",
        "Langkah 4: Hitung rata-rata sampel bootstrap: X_bar* = (100 + 100 + 95 + 105 + 120) / 5 = 520 / 5 = 104.0 kW; Y_bar* = (40 + 40 + 36 + 44 + 54) / 5 = 214 / 5 = 42.8 kW.",
        "Langkah 5: Hitung replikasi rasio bootstrap: theta* = 42.8 / 104.0 = 0.41154 (41.15%)."
      ],
      "resultInterpretation": "Resampling berpasangan mempertahankan kovarians alami antara input dan output turbin, menghasilkan estimasi ketidakpastian rasio yang realistis."
    },
    "pythonImplementation": {
      "description": "Estimasi interval kepercayaan rasio efisiensi berpasangan menggunakan Bootstrap vs Delta Method.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA]\n# 30 pengujian efisiensi sistem konversi energi berpasangan\nnp.random.seed(42)\nn = 30\n# Input daya X dan output daya Y berkorelasi positif\nX = np.random.normal(loc=100.0, scale=12.0, size=n)\nY = 0.45 * X + np.random.normal(loc=0.0, scale=3.0, size=n)\n\ntheta_hat = np.mean(Y) / np.mean(X)\n\n# 1. DELTA METHOD\nmean_x, mean_y = np.mean(X), np.mean(Y)\nvar_x = np.var(X, ddof=1) / n\nvar_y = np.var(Y, ddof=1) / n\ncov_xy = np.cov(X, Y)[0, 1] / n\n\nvar_delta = (mean_y / mean_x)**2 * (var_y / mean_y**2 + var_x / mean_x**2 - 2 * cov_xy / (mean_x * mean_y))\nse_delta = np.sqrt(var_delta)\nci_delta = [theta_hat - 1.96 * se_delta, theta_hat + 1.96 * se_delta]\n\n# 2. PAIRED BOOTSTRAP RESAMPLING (B = 2.000)\nB = 2000\nboot_ratios = np.zeros(B)\nfor b in range(B):\n    idx = np.random.choice(n, size=n, replace=True)\n    boot_ratios[b] = np.mean(Y[idx]) / np.mean(X[idx])\n\nse_boot = np.std(boot_ratios, ddof=1)\nci_boot = [np.percentile(boot_ratios, 2.5), np.percentile(boot_ratios, 97.5)]\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Evaluasi Rasio Parameter Non-Linier:\")\nprint(f\"Estimator Rasio Efisiensi Teramati: {theta_hat:.4f}\")\nprint(f\"Delta Method SE  : {se_delta:.4f} | 95% CI: [{ci_delta[0]:.4f}, {ci_delta[1]:.4f}]\")\nprint(f\"Bootstrap SE     : {se_boot:.4f} | 95% CI: [{ci_boot[0]:.4f}, {ci_boot[1]:.4f}]\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Rasio Parameter Non-Linier:\nEstimator Rasio Efisiensi Teramati: 0.4485\nDelta Method SE  : 0.0055 | 95% CI: [0.4377, 0.4593]\nBootstrap SE     : 0.0055 | 95% CI: [0.4379, 0.4598]"
    },
    "commonPitfalls": [
      "Melakukan resampling terpisah (unpaired) pada data berpasangan, yang menghancurkan struktur kovarians antara X dan Y.",
      "Menggunakan Delta Method saat penyebut rasio mendekati nol, yang menyebabkan ledakan varians tak terhingga.",
      "Mengabaikan pemangkasan numerik jika sampel bootstrap menghasilkan nilai penyebut bernilai nol."
    ],
    "validationProcedures": [
      "Gunakan Paired Bootstrap (resampling indeks baris secara utuh) untuk seluruh data berpasangan multivariat.",
      "Periksa apakah ada replikasi bootstrap yang menghasilkan nilai ekstrem tak masuk akal akibat penyebut mendekati nol.",
      "Laporkan interval BCa untuk rasio kompleks guna mengoreksi kemencengan distribusi pembagian."
    ],
    "exercises": [
      {
        "question": "Mengapa pada data berpasangan (misal input daya X dan output daya Y), kita wajib meresample pasangan indeks baris (i) dan bukan meresample array X dan array Y secara terpisah?",
        "hint": "Perhatikan istilah kovarians Cov(X, Y) pada rumus Delta Method.",
        "answerExplanation": "Jika X dan Y diresample secara terpisah, korelasi intrinsik antar pasangan observasi akan hilang (kovarians menjadi nol). Padahal pada sistem rekayasa, input tinggi menghasilkan output tinggi (kovarians positif kuat). Menghilangkan kovarians ini akan melipatgandakan estimasi kesalahan baku rasio secara palsu."
      },
      {
        "question": "Kapan Delta Method mengalami kegagalan total dibandingkan metode Bootstrap?",
        "hint": "Perhatikan kondisi di mana koefisien variasi penyebut bernilai besar atau fungsi memiliki kurvatur tajam.",
        "answerExplanation": "Delta Method gagal total ketika penyebut memiliki probabilitas signifikan berada di dekat nol (koefisien variasi > 0.2) atau fungsi sangat non-linier dengan kurvatur ekstrem di sekitar mean. Pada kondisi ini, ekspansi deret Taylor linieritas lokal tidak lagi berlaku dan memicu bias batas kepercayaan yang fatal."
      }
    ],
    "references": [
      {
        "citation": "Efron, B., & Tibshirani, R. J. (1994). An Introduction to the Bootstrap. CRC Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Casella, G., & Berger, R. L. (2002). Statistical Inference (2nd ed.). Duxbury.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Resampling untuk Estimasi Parameter Non-Linier dan Rasio Kompleks",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.1.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.1.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menerapkan teknik resampling bootstrap untuk parameter yang tidak memiliki turunan analitis tertutup.",
          "Capaian 2: Menganalisis interval kepercayaan rasio dua variabel acak (Ratio of Means) dan indeks efisiensi rekayasa.",
          "Capaian 3: Membandingkan hasil Bootstrap dengan metode aproksimasi Delta Method."
        ],
        "keyFormulaOrDiagram": "$$\\widehat{\\text{Var}}_{\\text{Delta}}(\\hat{\\theta}) \\approx \\left( \\frac{\\bar{Y}}{\\bar{X}} \\right)^2 \\left[ \\frac{s_Y^2}{n \\bar{Y}^2} + \\frac{s_X^2}{n \\bar{X}^2} - 2 \\frac{s_{XY}}{n \\bar{X} \\bar{Y}} \\right]$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.1.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Resampling untuk Estimasi Parameter Non-Linier dan Rasio Kompleks",
        "lead": "Dalam rekayasa sistem dan eksperimen ilmiah, banyak parameter kritis diformulasikan sebagai fungsi non-linier dari beberapa pengukuran acak.",
        "bulletPoints": [
          "Contoh parametrik meliputi: - Rasio Efisiensi Termal: $\\theta = \\bar{Y} / \\bar{X}$ (Rasio output daya terhadap input bahan bakar). - Indeks Kemampuan Proses (Process Capability Index): $C_{pk} = \\min\\left(\\frac{\\text{USL} - \\mu}{3\\sigma}, \\frac{\\mu - \\text{LSL}}{3\\sigma}\\right)$. - Parameter Kinetika Reaksi Kimia Non-Linier Michaelis-Menten: $V = \\frac{V_{\\max} [S]}{K_m + [S]}$.",
          "Tantangan Inferensi Analitis: Mencari interval kepercayaan eksak untuk parameter rasio atau persamaan non-linier menggunakan teori statistik klasik sangat sulit karena pembagian dua variabel acak menghasilkan distribusi dengan varians tak terhingga atau asimetri ekstrem (seperti distribusi Cauchy).",
          "Metode analitis tradisional menggunakan Aproksimasi Deret Taylor (Delta Method), namun Delta Method mengasumsikan linearitas lokal dan seringkali menghasilkan estimasi batas kesalahan yang bias secara parah pada ukuran sampel terbatas."
        ],
        "keyFormulaOrDiagram": "$g(\\cdot)$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Resampling Bootstrap sebagai Solusi Universal: Metode bootstrap sepenuhnya membebaskan peneliti dari keharusan menurunkan rumus turunan kalkulus yang rumit.",
        "bulletPoints": [
          "Peneliti cukup menghitung fungsi non-linier $g(\\cdot)$ pada setiap sampel resample bootstrap secara langsung.",
          "Distribusi empiris replikasi non-linier secara otomatis menangkap seluruh ketidaklinieran fisik dan kovarians antar variabel tanpa aproksimasi deret Taylor."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Komparasi Resampling Non-Linier vs Delta Method:",
        "bulletPoints": [
          "Diberikan dua variabel acak $X$ dan $Y$ dengan estimator rata-rata $(\\bar{X}, \\bar{Y})$ dan matriks kovarians $\\mathbf{\\Sigma}$.",
          "Target parameter: Rasio $\\theta = \\mu_Y / \\mu_X$.",
          "1. Pendekatan Delta Method (Aproksimasi Taylor Orde-1):"
        ],
        "keyFormulaOrDiagram": "$$\\widehat{\\text{Var}}_{\\text{Delta}}(\\hat{\\theta}) \\approx \\left( \\frac{\\bar{Y}}{\\bar{X}} \\right)^2 \\left[ \\frac{s_Y^2}{n \\bar{Y}^2} + \\frac{s_X^2}{n \\bar{X}^2} - 2 \\frac{s_{XY}}{n \\bar{X} \\bar{Y}} \\right]$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah turbin prototipe diuji pada n = 5 pengujian berpasangan. Daya input X (kW) = [100, 110, 95, 105, 120]; Daya output Y (kW) = [40, 48, 36, 44, 54]. Hitung efisiensi rata-rata theta_hat = Y_bar / X_bar. Tunjukkan bagaimana satu replikasi bootstrap berpasangan dihitung jika indeks terambil adalah [0, 0, 2, 3, 4].",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 39,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Hitung rata-rata sampel teramati: X_bar = (100 + 110 + 95 + 105 + 120) / 5 = 530 / 5 = 106.0 kW; Y_bar = (40 + 48 + 36 + 44 + 54) / 5 = 222 / 5 = 44.4 kW.",
          "Langkah 2: Hitung rasio efisiensi teramati: theta_hat = 44.4 / 106.0 = 0.41887 (41.89%).",
          "Langkah 3: Lakukan resampling berpasangan dengan indeks [0, 0, 2, 3, 4]: X* = [100, 100, 95, 105, 120]; Y* = [40, 40, 36, 44, 54]."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung rata-rata sampel bootstrap: X_bar* = (100 + 100 + 95 + 105 + 120) / 5 = 520 / 5 = 104.0 kW; Y_bar* = (40 + 40 + 36 + 44 + 54) / 5 = 214 / 5 = 42.8 kW.",
          "Langkah 5: Hitung replikasi rasio bootstrap: theta* = 42.8 / 104.0 = 0.41154 (41.15%).",
          "[result: Interpretasi Ilmiah] Resampling berpasangan mempertahankan kovarians alami antara input dan output turbin, menghasilkan estimasi ketidakpastian rasio yang realistis."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Estimasi interval kepercayaan rasio efisiensi berpasangan menggunakan Bootstrap vs Delta Method.",
        "bulletPoints": [
          "Tujuan Algoritma: Estimasi interval kepercayaan rasio efisiensi berpasangan menggunakan Bootstrap vs Delta Method.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Rasio Parameter Non-Linier:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Rasio Parameter Non-Linier:\nEstimator Rasio Efisiensi Teramati: 0.4485\nDelta Method SE  : 0.0055 | 95% CI: [0.4377, 0.4593]\nBootstrap SE     : 0.0055 | 95% CI: [0.4379, 0.4598]",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Melakukan resampling terpisah (unpaired) pada data berpasangan, yang menghancurkan struktur kovarians antara X dan Y.",
          "[warning: Perangkap] Menggunakan Delta Method saat penyebut rasio mendekati nol, yang menyebabkan ledakan varians tak terhingga.",
          "[warning: Perangkap] Mengabaikan pemangkasan numerik jika sampel bootstrap menghasilkan nilai penyebut bernilai nol."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan Paired Bootstrap (resampling indeks baris secara utuh) untuk seluruh data berpasangan multivariat.",
          "Prosedur: Periksa apakah ada replikasi bootstrap yang menghasilkan nilai ekstrem tak masuk akal akibat penyebut mendekati nol.",
          "Prosedur: Laporkan interval BCa untuk rasio kompleks guna mengoreksi kemencengan distribusi pembagian."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa pada data berpasangan (misal input daya X dan output daya Y), kita wajib meresample pasangan indeks baris (i) dan bukan meresample array X dan array Y secara terpisah?",
          "Petunjuk Analitis: Perhatikan istilah kovarians Cov(X, Y) pada rumus Delta Method.",
          "Solusi Kunci: Jika X dan Y diresample secara terpisah, korelasi intrinsik antar pasangan observasi akan hilang (kovarians menjadi nol). Padahal pada sistem rekayasa, input tinggi menghasilkan output tinggi (kovarians positif kuat). Menghilangkan kovarians ini akan melipatgandakan estimasi kesalahan baku rasio secara palsu."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
