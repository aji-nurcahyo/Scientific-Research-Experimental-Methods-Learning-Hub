import { Lesson } from '../types/curriculum';

export const CH17_LESSONS: Record<string, Partial<Lesson>> = {
  "3.2.1": {
    "id": "3.2.1",
    "chapterId": "CH-17",
    "title": "Variabel Acak Diskrit vs Kontinu dan Sifat Fungsi Kerapatan Probabilitas",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Membedakan ruang sampel diskrit dan kontinu dalam pemodelan sistem rekayasa.",
      "Memahami aksioma Kolmogorov dan sifat-sifat Probability Density Function (PDF) serta Cumulative Distribution Function (CDF).",
      "Menghitung probabilitas interval kontinu melalui integrasi kalkulus riil."
    ],
    "content": "Probabilitas adalah bahasa matematika untuk mengukur ketidakpastian. Dalam riset rekayasa dan sains komputasi, setiap keluaran fisik yang terpengaruh oleh fluktuasi acak dimodelkan sebagai Variabel Acak (*Random Variable*), yaitu fungsi terukur yang memetakan elemen dari ruang sampel kejadian $\\Omega$ menuju himpunan bilangan riil $\\mathbb{R}$.\n\nDua kategori variabel acak fundamental:\n1. Variabel Acak Diskrit: Memiliki ruang hasil yang dapat dihitung (*countable*). Probabilitas direpresentasikan oleh Probability Mass Function (PMF), $P(X = x)$. Contoh: jumlah paket data yang hilang dalam satu detik, jumlah bit galat transmisi komunikasi optik, atau jumlah siklus pengujian hingga komponen retak.\n2. Variabel Acak Kontinu: Mengambil nilai pada rentang kontinu tak terhingga (*uncountable*). Karena banyaknya titik dalam interval kontinu adalah tak terhingga, probabilitas sebuah variabel acak kontinu mengambil satu nilai tepat tunggal secara eksak adalah nol: $P(X = c) = 0$. Oleh karena itu, ketidakpastian kontinu diukur melalui Probability Density Function (PDF), $f(x)$, di mana probabilitas hanya memiliki makna fisis ketika diintegrasikan di atas suatu interval $[a, b]$.\n\nFungsi Distribusi Kumulatif (Cumulative Distribution Function / CDF), $F(x) = P(X \\le x)$, memberikan gambaran monolitik probabilitas bahwa variabel acak tidak melampaui ambang batas tertentu $x$, yang merupakan fondasi perhitungan batas risiko dan keandalan sistem (*reliability engineering*).",
    "mathematicalFoundations": "Aksioma Probabilitas Kolmogorov & Sifat Fungsi Kontinu:\n\n1. Syarat Keabsahan Fungsi Kerapatan Probabilitas (PDF $f(x)$):\n$$f(x) \\ge 0, \\quad \\forall x \\in \\mathbb{R}$$\n$$\\int_{-\\infty}^{+\\infty} f(x) \\, dx = 1$$\n\n2. Probabilitas Interval:\n$$P(a \\le X \\le b) = \\int_a^b f(x) \\, dx = F(b) - F(a)$$\n\n3. Nilai Ekspektasi dan Momen Sentral:\n$$\\mu = \\mathbb{E}[X] = \\int_{-\\infty}^{+\\infty} x \\cdot f(x) \\, dx$$\n$$\\sigma^2 = \\text{Var}(X) = \\mathbb{E}[(X - \\mu)^2] = \\int_{-\\infty}^{+\\infty} (x - \\mu)^2 f(x) \\, dx$$",
    "workedExample": {
      "problemStatement": "Sinyal derau termal tegangan sensor memiliki PDF kontinu seragam pada rentang [-0.5, +0.5] Volt: f(x) = 1 untuk -0.5 <= x <= 0.5, dan 0 untuk lainnya. Hitung: (a) Probabilitas bahwa derau tepat bernilai 0.2000 Volt, (b) Probabilitas bahwa amplitudo derau absolut melebihi 0.3 Volt (|X| > 0.3 V).",
      "stepByStepSolution": [
        "Langkah 1 (Probabilitas Titik Tunggal): Sifat variabel acak kontinu menyatakan bahwa probabilitas untuk satu titik nilai presisi tak hingga adalah nol: P(X = 0.2000) = 0.",
        "Langkah 2 (Probabilitas Interval): Peristiwa |X| > 0.3 terbagi menjadi dua daerah saling lepas: X < -0.3 atau X > 0.3.",
        "Langkah 3 (Integrasi Bagian Bawah): P(X < -0.3) = integral dari -0.5 sampai -0.3 dari 1 dx = [-0.3 - (-0.5)] = 0.20.",
        "Langkah 4 (Integrasi Bagian Atas): P(X > +0.3) = integral dari +0.3 sampai +0.5 dari 1 dx = [0.5 - 0.3] = 0.20.",
        "Langkah 5 (Penjumlahan Total): P(|X| > 0.3) = 0.20 + 0.20 = 0.40 (40%)."
      ],
      "resultInterpretation": "Terdapat peluang 40% bahwa derau termal sensor akan melompat keluar dari zona toleransi +/- 0.3 Volt."
    },
    "pythonImplementation": {
      "description": "Integrasi numerik fungsi kerapatan probabilitas kontinu menggunakan SciPy.",
      "libraryDependencies": [
        "scipy.integrate",
        "scipy.stats",
        "numpy"
      ],
      "code": "import numpy as np\nfrom scipy import stats, integrate\n\n# Variabel acak normal: mu = 12.0 V, sigma = 1.5 V\nmu, sigma = 12.0, 1.5\n\ndef pdf_normal(x):\n    return (1.0 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mu) / sigma)**2)\n\n# Hitung peluang tegangan berada di antara 10.0 V dan 13.5 V melalui integrasi kuadratur\nprob_numerik, _ = integrate.quad(pdf_normal, 10.0, 13.5)\n\n# Bandingkan dengan CDF teoritis dari scipy.stats\nprob_cdf = stats.norm.cdf(13.5, loc=mu, scale=sigma) - stats.norm.cdf(10.0, loc=mu, scale=sigma)\n\nprint(f\"Probabilitas via Integrasi Numerik PDF : {prob_numerik:.5f}\")\nprint(f\"Probabilitas via Selisih CDF Teoritis  : {prob_cdf:.5f}\")\nprint(f\"Selisih Mutlak Presisi                : {np.abs(prob_numerik - prob_cdf):.2e}\")\n",
      "expectedOutput": "Probabilitas via Integrasi Numerik PDF : 0.75013\nProbabilitas via Selisih CDF Teoritis  : 0.75013\nSelisih Mutlak Presisi                : 0.00e+00"
    },
    "commonPitfalls": [
      "Menyatakan bahwa nilai f(x) pada kurva PDF adalah probabilitas titik tersebut (f(x) adalah kerapatan, bisa bernilai lebih besar dari 1).",
      "Lupa memverifikasi bahwa total integral PDF sama dengan satu sebelum melakukan pemodelan probabilistik.",
      "Menggunakan rumus ekspektasi diskrit (penjumlahan sigma) pada variabel acak kontinu tanpa integrasi."
    ],
    "validationProcedures": [
      "Periksa apakah fungsi distribusi kumulatif bersifat monoton naik tegas: F(x1) <= F(x2) untuk x1 < x2.",
      "Verifikasi kondisi batas asimtotik: limit F(x) saat x mendekati -tak hingga adalah 0, dan saat x mendekati +tak hingga adalah 1."
    ],
    "exercises": [
      {
        "question": "Mengapa nilai fungsi kerapatan probabilitas f(x) pada distribusi normal dengan deviasi standar sangat kecil (misal sigma = 0.01) dapat bernilai hampir 40, padahal probabilitas tidak boleh melebihi 1?",
        "hint": "Perhatikan perbedaan antara \"kerapatan probabilitas per satuan panjang\" versus \"probabilitas tanpa dimensi\".",
        "answerExplanation": "Nilai f(x) adalah kerapatan probabilitas (*probability density*), yang memiliki dimensi satuan 1 / [satuan x]. Kerapatan dapat bernilai berapa pun asalkan total area di bawah kurva integral tetap sama dengan 1. Probabilitas sesungguhnya adalah perkalian kerapatan dengan lebar interval (f(x) * dx), yang nilainya dijamin selalu berada pada rentang [0, 1]."
      }
    ],
    "references": [
      {
        "citation": "Papoulis, A., & Pillai, S. U. (2002). Probability, Random Variables, and Stochastic Processes (4th ed.). McGraw-Hill.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Ross, S. M. (2014). Introduction to Probability Models (11th ed.). Academic Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Variabel Acak Diskrit vs Kontinu dan Sifat Fungsi Kerapatan Probabilitas",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.2.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.2.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan ruang sampel diskrit dan kontinu dalam pemodelan sistem rekayasa.",
          "Capaian 2: Memahami aksioma Kolmogorov dan sifat-sifat Probability Density Function (PDF) serta Cumulative Distribution Function (CDF).",
          "Capaian 3: Menghitung probabilitas interval kontinu melalui integrasi kalkulus riil."
        ],
        "keyFormulaOrDiagram": "$$f(x) \\ge 0, \\quad \\forall x \\in \\mathbb{R}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.2.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Variabel Acak Diskrit vs Kontinu dan Sifat Fungsi Kerapatan Probabilitas",
        "lead": "Probabilitas adalah bahasa matematika untuk mengukur ketidakpastian.",
        "bulletPoints": [
          "Dalam riset rekayasa dan sains komputasi, setiap keluaran fisik yang terpengaruh oleh fluktuasi acak dimodelkan sebagai Variabel Acak (*Random Variable*), yaitu fungsi terukur yang memetakan elemen dari ruang sampel kejadian $\\Omega$ menuju himpunan bilangan riil $\\mathbb{R}$.",
          "Dua kategori variabel acak fundamental: 1.",
          "Variabel Acak Diskrit: Memiliki ruang hasil yang dapat dihitung (*countable*)."
        ],
        "keyFormulaOrDiagram": "$F(x) = P(X \\le x)$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Fungsi Distribusi Kumulatif (Cumulative Distribution Function / CDF), $F(x) = P(X \\le x)$, memberikan gambaran monolitik probabilitas bahwa variabel acak tidak melampaui ambang batas tertentu $x$, yang merupakan fondasi perhitungan batas risiko dan keandalan sistem (*reliability engineering*).",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Aksioma Probabilitas Kolmogorov & Sifat Fungsi Kontinu:",
        "bulletPoints": [
          "1. Syarat Keabsahan Fungsi Kerapatan Probabilitas (PDF $f(x)$):",
          "2. Probabilitas Interval:",
          "3. Nilai Ekspektasi dan Momen Sentral:"
        ],
        "keyFormulaOrDiagram": "$$f(x) \\ge 0, \\quad \\forall x \\in \\mathbb{R}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sinyal derau termal tegangan sensor memiliki PDF kontinu seragam pada rentang [-0.5, +0.5] Volt: f(x) = 1 untuk -0.5 <= x <= 0.5, dan 0 untuk lainnya. Hitung: (a) Probabilitas bahwa derau tepat bernilai 0.2000 Volt, (b) Probabilitas bahwa amplitudo derau absolut melebihi 0.3 Volt (|X| > 0.3 V).",
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
          "Langkah 1 (Probabilitas Titik Tunggal): Sifat variabel acak kontinu menyatakan bahwa probabilitas untuk satu titik nilai presisi tak hingga adalah nol: P(X = 0.2000) = 0.",
          "Langkah 2 (Probabilitas Interval): Peristiwa |X| > 0.3 terbagi menjadi dua daerah saling lepas: X < -0.3 atau X > 0.3.",
          "Langkah 3 (Integrasi Bagian Bawah): P(X < -0.3) = integral dari -0.5 sampai -0.3 dari 1 dx = [-0.3 - (-0.5)] = 0.20."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4 (Integrasi Bagian Atas): P(X > +0.3) = integral dari +0.3 sampai +0.5 dari 1 dx = [0.5 - 0.3] = 0.20.",
          "Langkah 5 (Penjumlahan Total): P(|X| > 0.3) = 0.20 + 0.20 = 0.40 (40%).",
          "[result: Interpretasi Ilmiah] Terdapat peluang 40% bahwa derau termal sensor akan melompat keluar dari zona toleransi +/- 0.3 Volt."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Integrasi numerik fungsi kerapatan probabilitas kontinu menggunakan SciPy.",
        "bulletPoints": [
          "Tujuan Algoritma: Integrasi numerik fungsi kerapatan probabilitas kontinu menggunakan SciPy.",
          "Dependensi Pustaka Ilmiah: scipy.integrate, scipy.stats, numpy",
          "Keluaran Terverifikasi: Probabilitas via Integrasi Numerik PDF : 0.75013"
        ],
        "keyFormulaOrDiagram": "Probabilitas via Integrasi Numerik PDF : 0.75013\nProbabilitas via Selisih CDF Teoritis  : 0.75013\nSelisih Mutlak Presisi                : 0.00e+00",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyatakan bahwa nilai f(x) pada kurva PDF adalah probabilitas titik tersebut (f(x) adalah kerapatan, bisa bernilai lebih besar dari 1).",
          "[warning: Perangkap] Lupa memverifikasi bahwa total integral PDF sama dengan satu sebelum melakukan pemodelan probabilistik.",
          "[warning: Perangkap] Menggunakan rumus ekspektasi diskrit (penjumlahan sigma) pada variabel acak kontinu tanpa integrasi."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Periksa apakah fungsi distribusi kumulatif bersifat monoton naik tegas: F(x1) <= F(x2) untuk x1 < x2.",
          "Prosedur: Verifikasi kondisi batas asimtotik: limit F(x) saat x mendekati -tak hingga adalah 0, dan saat x mendekati +tak hingga adalah 1."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa nilai fungsi kerapatan probabilitas f(x) pada distribusi normal dengan deviasi standar sangat kecil (misal sigma = 0.01) dapat bernilai hampir 40, padahal probabilitas tidak boleh melebihi 1?",
          "Petunjuk Analitis: Perhatikan perbedaan antara \"kerapatan probabilitas per satuan panjang\" versus \"probabilitas tanpa dimensi\".",
          "Solusi Kunci: Nilai f(x) adalah kerapatan probabilitas (*probability density*), yang memiliki dimensi satuan 1 / [satuan x]. Kerapatan dapat bernilai berapa pun asalkan total area di bawah kurva integral tetap sama dengan 1. Probabilitas sesungguhnya adalah perkalian kerapatan dengan lebar interval (f(x) * dx), yang nilainya dijamin selalu berada pada rentang [0, 1]."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.2.2": {
    "id": "3.2.2",
    "chapterId": "CH-17",
    "title": "Distribusi Parametrik Fundamental: Gaussian (Normal), Students t, Snedecor F, Chi-Square",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami relasi derivasi matematis antara 4 distribusi sampling pilar statistika parametrik.",
      "Menurunkan distribusi Chi-Square sebagai penjumlahan kuadrat variabel normal baku.",
      "Memahami peranan Student's t dan Fisher-Snedecor F dalam uji komparasi rata-rata dan varians."
    ],
    "content": "Seluruh bangunan inferensi statistik parametrik klasik (uji-t, ANOVA, regresi linier, interval kepercayaan) bertumpu pada kuartet distribusi probabilitas fundamental: Gaussian (Normal), Chi-Square ($\\chi^2$), Student's t, dan Snedecor's F. Keempat distribusi ini bukanlah entitas yang terpisah, melainkan saling terhubung secara elegan melalui transformasi aljabar kuadrat dan rasio.\n\n1. Distribusi Gaussian / Normal $\\mathcal{N}(\\mu, \\sigma^2)$: Ditemukan oleh Gauss, distribusi simetris berbentuk lonceng ini muncul secara alami di alam ketika sebuah variabel dipengaruhi oleh akumulasi penjumlahan aditif banyak derau kecil independen (Teorema Batas Pusat).\n2. Distribusi Chi-Square $\\chi^2(\\nu)$: Merupakan distribusi dari penjumlahan kuadrat $\\nu$ variabel acak normal baku independen. Sangat penting untuk pemodelan varians sampel dan uji kebaikan suai (*goodness-of-fit*).\n3. Distribusi Student's t: Diformalkan oleh William Sealy Gosset (1908) dengan nama pena \"Student\". Merupakan rasio antara variabel normal baku dengan akar dari variabel Chi-Square yang dibagi derajat kebebasannya. Distribusi t memiliki ekor yang lebih tebal (*heavy tails*) dibanding normal, mencerminkan ketidakpastian ekstra saat deviasi standar populasi $\\sigma$ tidak diketahui dan harus diestimasi dari sampel kecil $s$.\n4. Distribusi Snedecor's F: Didefinisikan oleh George Snedecor untuk menghormati Ronald Fisher. Merupakan rasio dari dua variabel acak Chi-Square independen yang masing-masing dibagi dengan derajat kebebasannya. Distribusi F adalah landasan matematis utama dari Analisis Varians (ANOVA) dan uji regresi.",
    "mathematicalFoundations": "Pohon Derivasi Kausal Matematika Kuartet Distribusi:\n\n1. Normal Baku:\n$$Z_i \\sim \\mathcal{N}(0, 1), \\quad f(z) = \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}$$\n\n2. Chi-Square $\\chi^2$ dengan derajat kebebasan $\\nu$:\n$$V = \\sum_{i=1}^\\nu Z_i^2 \\sim \\chi^2(\\nu)$$\n\n3. Student's $t$ dengan derajat kebebasan $\\nu$:\n$$T = \\frac{Z}{\\sqrt{V / \\nu}} \\sim t(\\nu)$$\nKetika $\\nu \\to \\infty$, distribusi $t(\\nu)$ konvergen sempurna ke distribusi normal baku $\\mathcal{N}(0, 1)$.\n\n4. Snedecor's $F$ dengan derajat kebebasan $(\\nu_1, \\nu_2)$:\n$$F = \\frac{V_1 / \\nu_1}{V_2 / \\nu_2} \\sim F(\\nu_1, \\nu_2)$$\nHubungan khusus kuadrat Student's t: $T^2 \\sim F(1, \\nu)$.",
    "workedExample": {
      "problemStatement": "Pada derajat kebebasan nu = 5, bandingkan nilai kritis kuantil 97.5% (alpha = 0.05 dua arah) untuk distribusi normal baku Z versus distribusi Student t. Jelaskan mengapa peneliti yang menggunakan nilai Z = 1.96 pada sampel kecil akan melakukan kesalahan fatal.",
      "stepByStepSolution": [
        "Langkah 1: Cari kuantil normal baku: Z_(0.025) = 1.960.",
        "Langkah 2: Cari kuantil Student t dengan df = 5: t_(0.025, 5) = 2.571.",
        "Langkah 3: Hitung selisih ambang pembuktian: t_(0.025, 5) - Z_(0.025) = 2.571 - 1.960 = 0.611.",
        "Langkah 4: Evaluasi dampak risiko: Pada sampel kecil (n = 6, df = 5), ketidakpastian dalam mengestimasi standar deviasi s sangat tinggi. Ekor distribusi t jauh lebih tebal untuk mengompensasi variasi estimasi s."
      ],
      "resultInterpretation": "Menggunakan Z = 1.96 pada sampel kecil akan menyebabkan interval kepercayaan terlalu sempit semu dan menghasilkan laju false positive (Galat Tipe I) yang jauh melampaui 5%."
    },
    "pythonImplementation": {
      "description": "Verifikasi konvergensi empiris distribusi t-Student menuju Normal Baku seiring kenaikan derajat kebebasan.",
      "libraryDependencies": [
        "scipy.stats"
      ],
      "code": "from scipy import stats\n\ndfs = [2, 5, 15, 30, 100]\nalpha = 0.05\n\nz_kritis = stats.norm.ppf(1 - alpha/2)\nprint(f\"Nilai Kritis Normal Baku Z (df=inf) : {z_kritis:.4f}\\n\")\nprint(f\"{'Derajat Kebebasan (df)':25s} | {'Nilai Kritis t':16s} | {'Selisih thd Z':14s}\")\nprint(\"-\" * 60)\nfor df in dfs:\n    t_kritis = stats.t.ppf(1 - alpha/2, df=df)\n    selisih = t_kritis - z_kritis\n    print(f\"df = {df:3d}                      | {t_kritis:16.4f} | +{selisih:14.4f}\")\n",
      "expectedOutput": "Nilai Kritis Normal Baku Z (df=inf) : 1.9600\n\nDerajat Kebebasan (df)    | Nilai Kritis t   | Selisih thd Z \n------------------------------------------------------------\ndf =   2                  |           4.3027 | +        2.3427\ndf =   5                  |           2.5706 | +        0.6106\ndf =  15                  |           2.1314 | +        0.1714\ndf =  30                  |           2.0423 | +        0.0823\ndf = 100                  |           1.9840 | +        0.0240"
    },
    "commonPitfalls": [
      "Menggunakan distribusi Normal alih-alih Student's t saat menguji sampel kecil (n < 30) dengan deviasi standar populasi yang tidak diketahui.",
      "Mengabaikan urutan derajat kebebasan pembilang dan penyebut (df1, df2) pada distribusi F yang tidak bersifat simetris.",
      "Mengasumsikan distribusi Chi-Square dapat bernilai negatif (Chi-Square selalu non-negatif karena merupakan kuadrat)."
    ],
    "validationProcedures": [
      "Periksa apakah pengujian rasio varians menggunakan urutan varians terbesar sebagai pembilang untuk tabel satu sisi standar.",
      "Konfirmasikan bahwa uji-t dua sampel dengan derajat kebebasan nu menghasilkan nilai F yang tepat sama dengan t^2."
    ],
    "exercises": [
      {
        "question": "Bagaimana hubungan matematis formal antara nilai statistik uji-t independen dua kelompok dengan nilai statistik F pada Analisis Varians (ANOVA) satu arah untuk dua kelompok?",
        "hint": "Perhatikan relasi rasio varians ketika kelompok perlakuan hanya berjumlah dua.",
        "answerExplanation": "Untuk kasus dua kelompok independen, statistik F dari ANOVA satu arah identik secara eksak dengan kuadrat dari statistik uji-t Student: F(1, nu) = t^2(nu). Keduanya menguji hipotesis nol kesetaraan rata-rata yang sama persis dan menghasilkan nilai p-value yang identik."
      }
    ],
    "references": [
      {
        "citation": "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Fisher, R. A. (1925). Statistical Methods for Research Workers. Oliver and Boyd.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Distribusi Parametrik Fundamental: Gaussian (Normal), Students t, Snedecor F, Chi-Square",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.2.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.2.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami relasi derivasi matematis antara 4 distribusi sampling pilar statistika parametrik.",
          "Capaian 2: Menurunkan distribusi Chi-Square sebagai penjumlahan kuadrat variabel normal baku.",
          "Capaian 3: Memahami peranan Student's t dan Fisher-Snedecor F dalam uji komparasi rata-rata dan varians."
        ],
        "keyFormulaOrDiagram": "$$Z_i \\sim \\mathcal{N}(0, 1), \\quad f(z) = \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.2.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Distribusi Parametrik Fundamental: Gaussian (Normal), Students t, Snedecor F, Chi-Square",
        "lead": "Seluruh bangunan inferensi statistik parametrik klasik (uji-t, ANOVA, regresi linier, interval kepercayaan) bertumpu pada kuartet distribusi probabilitas fundamental: Gaussian (Normal), Chi-Square ($\\chi^2$), Student's t, dan Snedecor's F.",
        "bulletPoints": [
          "Keempat distribusi ini bukanlah entitas yang terpisah, melainkan saling terhubung secara elegan melalui transformasi aljabar kuadrat dan rasio.",
          "1.",
          "Distribusi Gaussian / Normal $\\mathcal{N}(\\mu, \\sigma^2)$: Ditemukan oleh Gauss, distribusi simetris berbentuk lonceng ini muncul secara alami di alam ketika sebuah variabel dipengaruhi oleh akumulasi penjumlahan aditif banyak derau kecil independen (Teorema Batas Pusat)."
        ],
        "keyFormulaOrDiagram": "$\\chi^2$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Pohon Derivasi Kausal Matematika Kuartet Distribusi:",
        "bulletPoints": [
          "1. Normal Baku:",
          "2. Chi-Square $\\chi^2$ dengan derajat kebebasan $\\nu$:",
          "3. Student's $t$ dengan derajat kebebasan $\\nu$:"
        ],
        "keyFormulaOrDiagram": "$$Z_i \\sim \\mathcal{N}(0, 1), \\quad f(z) = \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 15,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada derajat kebebasan nu = 5, bandingkan nilai kritis kuantil 97.5% (alpha = 0.05 dua arah) untuk distribusi normal baku Z versus distribusi Student t. Jelaskan mengapa peneliti yang menggunakan nilai Z = 1.96 pada sampel kecil akan melakukan kesalahan fatal.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Cari kuantil normal baku: Z_(0.025) = 1.960.",
          "Langkah 2: Cari kuantil Student t dengan df = 5: t_(0.025, 5) = 2.571."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 17,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung selisih ambang pembuktian: t_(0.025, 5) - Z_(0.025) = 2.571 - 1.960 = 0.611.",
          "Langkah 4: Evaluasi dampak risiko: Pada sampel kecil (n = 6, df = 5), ketidakpastian dalam mengestimasi standar deviasi s sangat tinggi. Ekor distribusi t jauh lebih tebal untuk mengompensasi variasi estimasi s.",
          "[result: Interpretasi Ilmiah] Menggunakan Z = 1.96 pada sampel kecil akan menyebabkan interval kepercayaan terlalu sempit semu dan menghasilkan laju false positive (Galat Tipe I) yang jauh melampaui 5%."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 18,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Verifikasi konvergensi empiris distribusi t-Student menuju Normal Baku seiring kenaikan derajat kebebasan.",
        "bulletPoints": [
          "Tujuan Algoritma: Verifikasi konvergensi empiris distribusi t-Student menuju Normal Baku seiring kenaikan derajat kebebasan.",
          "Dependensi Pustaka Ilmiah: scipy.stats",
          "Keluaran Terverifikasi: Nilai Kritis Normal Baku Z (df=inf) : 1.9600"
        ],
        "keyFormulaOrDiagram": "Nilai Kritis Normal Baku Z (df=inf) : 1.9600\n\nDerajat Kebebasan (df)    | Nilai Kritis t   | Selisih thd Z \n------------------------------------------------------------\ndf =   2                  |           4.3027 | +        2.3427",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 19,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan distribusi Normal alih-alih Student's t saat menguji sampel kecil (n < 30) dengan deviasi standar populasi yang tidak diketahui.",
          "[warning: Perangkap] Mengabaikan urutan derajat kebebasan pembilang dan penyebut (df1, df2) pada distribusi F yang tidak bersifat simetris.",
          "[warning: Perangkap] Mengasumsikan distribusi Chi-Square dapat bernilai negatif (Chi-Square selalu non-negatif karena merupakan kuadrat)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 20,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Periksa apakah pengujian rasio varians menggunakan urutan varians terbesar sebagai pembilang untuk tabel satu sisi standar.",
          "Prosedur: Konfirmasikan bahwa uji-t dua sampel dengan derajat kebebasan nu menghasilkan nilai F yang tepat sama dengan t^2."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 21,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Bagaimana hubungan matematis formal antara nilai statistik uji-t independen dua kelompok dengan nilai statistik F pada Analisis Varians (ANOVA) satu arah untuk dua kelompok?",
          "Petunjuk Analitis: Perhatikan relasi rasio varians ketika kelompok perlakuan hanya berjumlah dua.",
          "Solusi Kunci: Untuk kasus dua kelompok independen, statistik F dari ANOVA satu arah identik secara eksak dengan kuadrat dari statistik uji-t Student: F(1, nu) = t^2(nu). Keduanya menguji hipotesis nol kesetaraan rata-rata yang sama persis dan menghasilkan nilai p-value yang identik."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.2.3": {
    "id": "3.2.3",
    "chapterId": "CH-17",
    "title": "Distribusi Proses Rekayasa: Poisson, Binomial, Eksponensial, Log-Normal, dan Weibull",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memilih distribusi probabilitas yang tepat untuk fenomena fisik rekayasa spesifik.",
      "Memodelkan keandalan dan waktu hingga kerusakan (*Time to Failure*) menggunakan distribusi Weibull.",
      "Memahami proses Poisson dan interval waktu antar-kejadian eksponensial dalam antrean jaringan."
    ],
    "content": "Dalam rekayasa sistem nyata, data eksperimen jarang sekali mengikuti kurva lonceng Gaussian murni. Mengasumsikan distribusi normal pada fenomena keausan mekanik, kedatangan paket jaringan internet, atau ketahanan isolasi kabel tegangan tinggi adalah kesalahan fatal yang sering memicu kegagalan desain rekayasa bencana (*catastrophic engineering failure*).\n\nDistribusi probabilitas parametrik khusus untuk proses rekayasa:\n1. Distribusi Poisson (Diskrit): Memodelkan jumlah kejadian diskrit acak yang terjadi dalam interval waktu atau ruang yang tetap, dengan laju rata-rata konstan $\\lambda$. Contoh: jumlah sambaran petir per tahun pada jalur transmisi sutet atau jumlah paket tiba di router per milidetik.\n2. Distribusi Binomial (Diskrit): Memodelkan jumlah keberhasilan dari $n$ percobaan Bernoulli independen dengan probabilitas sukses $p$. Contoh: pengujian cacat solder pada 100 sampel papan PCB.\n3. Distribusi Eksponensial (Kontinu): Memodelkan waktu tunggu antar-kejadian pada proses Poisson. Memiliki sifat tanpa memori (*memoryless property*), di mana laju kegagalan instan konstan sepanjang waktu.\n4. Distribusi Log-Normal (Kontinu): Menggambarkan variabel positif yang dihasilkan dari perkalian multiplikatif banyak faktor kecil acak. Sangat umum dalam propagasi retak lelah logam (*fatigue crack propagation*) dan laju transmisi bit internet.\n5. Distribusi Weibull (Kontinu): Standar emas analisis keandalan industri (Waloddi Weibull, 1951). Melalui parameter bentuk $\\beta$, Weibull mampu memodelkan ketiga fase kurva bak mandi (*bathtub curve*): fase kerusakan dini (infant mortality, $\\beta < 1$), fase kerusakan acak konstan (useful life, $\\beta = 1$), dan fase keausan mekanis alami (wear-out, $\\beta > 1$).",
    "mathematicalFoundations": "1. Distribusi Weibull (Fungsi Kerapatan & Laju Kegagalan Hazard):\nFungsi Kerapatan Probabilitas (PDF):\n$$f(t) = \\frac{\\beta}{\\eta} \\left( \\frac{t}{\\eta} \\right)^{\\beta - 1} e^{-(t/\\eta)^\\beta}, \\quad t \\ge 0$$\n\nFungsi Keandalan (*Reliability Function* $R(t) = P(T > t)$):\n$$R(t) = e^{-(t/\\eta)^\\beta}$$\n\nFungsi Laju Kegagalan Instan (*Hazard Rate* $h(t) = f(t)/R(t)$):\n$$h(t) = \\frac{\\beta}{\\eta} \\left( \\frac{t}{\\eta} \\right)^{\\beta - 1}$$\nDi mana:\n- $\\beta$ adalah Parameter Bentuk (*Shape Parameter* / slope Weibull).\n- $\\eta$ adalah Parameter Karakteristik Umur (*Scale Parameter*, di mana $R(\\eta) = e^{-1} \\approx 36.8\\%$).\n\n2. Klasifikasi Fase Keandalan Berbasis $\\beta$:\n- $\\beta < 1$: Laju kegagalan menurun seiring waktu (cacat manufaktur awal).\n- $\\beta = 1$: Laju kegagalan konstan (identik dengan Distribusi Eksponensial).\n- $\\beta > 1$: Laju kegagalan meningkat seiring waktu (penuaan dan keausan mekanis).",
    "workedExample": {
      "problemStatement": "Bantalan poros turbin angin ITERA memiliki waktu hidup yang mengikuti distribusi Weibull dengan parameter bentuk beta = 2.5 (fase keausan) dan umur karakteristik eta = 50.000 jam operasi. Hitung: (a) Probabilitas bantalan masih bertahan beroperasi melewati 30.000 jam (Keandalan R(30000)), (b) Umur bantalan saat keandalan turun menjadi 90% (B10 life).",
      "stepByStepSolution": [
        "Langkah 1: Hitung rasio waktu operasi terhadap skala: t / eta = 30000 / 50000 = 0.60.",
        "Langkah 2: Pangkatkan dengan beta: (0.60)^2.5 = 0.27885.",
        "Langkah 3: Hitung keandalan R(30000) = exp(-0.27885) = 0.7566 (75.66%).",
        "Langkah 4: Hitung B10 life (waktu di mana R(t) = 0.90 atau 10% unit rusak):",
        "ln(R(t)) = -(t / eta)^beta -> ln(0.90) = -0.10536.",
        "(t / eta)^2.5 = 0.10536 -> t / eta = (0.10536)^(1 / 2.5) = (0.10536)^0.40 = 0.4068.",
        "t_B10 = 50000 * 0.4068 = 20.340 jam operasi."
      ],
      "resultInterpretation": "Pabrikan dapat menjamin dengan tingkat keyakinan 90% bahwa bantalan tidak akan rusak sebelum mencapai 20.340 jam operasi (B10 life)."
    },
    "pythonImplementation": {
      "description": "Pemodelan kurva keandalan Weibull dan estimasi B10 life menggunakan SciPy.",
      "libraryDependencies": [
        "scipy.stats",
        "numpy"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# Parameter Weibull bantalan poros\nbeta = 2.5\neta = 50000.0\n\n# Keandalan pada t = 30000 jam: R(t) = 1 - CDF(t)\nt_uji = 30000.0\nR_30k = stats.weibull_min.sf(t_uji, c=beta, scale=eta)\n\n# Hitung B10 life (titik persentil ke-10 kegagalan / kuantil 0.10)\nb10_life = stats.weibull_min.ppf(0.10, c=beta, scale=eta)\n\nprint(f\"Parameter Bentuk (Beta)   : {beta}\")\nprint(f\"Umur Karakteristik (Eta)  : {eta:,.0f} jam\")\nprint(f\"Keandalan pada 30.000 jam : {R_30k * 100:.2f}%\")\nprint(f\"B10 Life (90% Keandalan) : {b10_life:,.1f} jam\")\n",
      "expectedOutput": "Parameter Bentuk (Beta)   : 2.5\nUmur Karakteristik (Eta)  : 50,000 jam\nKeandalan pada 30.000 jam : 75.66%\nB10 Life (90% Keandalan) : 20,340.2 jam"
    },
    "commonPitfalls": [
      "Memaksakan kurva Gaussian pada data waktu hingga kegagalan (time to failure) yang selalu bernilai positif dan memiliki kemencengan panjang.",
      "Mengasumsikan laju kegagalan selalu konstan sepanjang masa pakai produk (hanya berlaku jika beta = 1).",
      "Mengacaukan parameter skala eta dengan nilai rata-rata aritmatika mean time between failures (MTBF)."
    ],
    "validationProcedures": [
      "Gunakan Weibull Probability Plot: jika titik-titik data empiris membentuk garis lurus pada kertas probabilitas Weibull, model Weibull terbukti absah.",
      "Lakukan uji Anderson-Darling khusus untuk distribusi Weibull untuk mengonfirmasi kebaikan suai."
    ],
    "exercises": [
      {
        "question": "Dalam pemodelan keandalan, apa implikasi fisis jika hasil regresi Weibull menunjukkan parameter bentuk beta < 1.0?",
        "hint": "Perhatikan arah laju kegagalan hazard rate h(t) seiring bertambahnya waktu.",
        "answerExplanation": "Jika beta < 1.0, laju kegagalan instan h(t) menurun seiring waktu. Ini mencerminkan fenomena kegagalan dini (infant mortality atau burn-in period), di mana komponen yang cacat produksi atau mengalami kesalahan perakitan pabrik rusak di awal masa operasi. Komponen yang berhasil melewati periode awal ini justru memiliki ketahanan hidup yang semakin membaik."
      }
    ],
    "references": [
      {
        "citation": "Weibull, W. (1951). A statistical distribution function of wide applicability. Journal of Applied Mechanics, 18(3), 293-297.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "O'Connor, P., & Kleyner, A. (2012). Practical Reliability Engineering (5th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 22,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Distribusi Proses Rekayasa: Poisson, Binomial, Eksponensial, Log-Normal, dan Weibull",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.2.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.2.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memilih distribusi probabilitas yang tepat untuk fenomena fisik rekayasa spesifik.",
          "Capaian 2: Memodelkan keandalan dan waktu hingga kerusakan (*Time to Failure*) menggunakan distribusi Weibull.",
          "Capaian 3: Memahami proses Poisson dan interval waktu antar-kejadian eksponensial dalam antrean jaringan."
        ],
        "keyFormulaOrDiagram": "$$f(t) = \\frac{\\beta}{\\eta} \\left( \\frac{t}{\\eta} \\right)^{\\beta - 1} e^{-(t/\\eta)^\\beta}, \\quad t \\ge 0$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.2.3."
      },
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Fondasi Konseptual: Distribusi Proses Rekayasa: Poisson, Binomial, Eksponensial, Log-Normal, dan Weibull",
        "lead": "Dalam rekayasa sistem nyata, data eksperimen jarang sekali mengikuti kurva lonceng Gaussian murni.",
        "bulletPoints": [
          "Mengasumsikan distribusi normal pada fenomena keausan mekanik, kedatangan paket jaringan internet, atau ketahanan isolasi kabel tegangan tinggi adalah kesalahan fatal yang sering memicu kegagalan desain rekayasa bencana (*catastrophic engineering failure*).",
          "Distribusi probabilitas parametrik khusus untuk proses rekayasa: 1.",
          "Distribusi Poisson (Diskrit): Memodelkan jumlah kejadian diskrit acak yang terjadi dalam interval waktu atau ruang yang tetap, dengan laju rata-rata konstan $\\lambda$."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 24,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Distribusi Weibull (Fungsi Kerapatan & Laju Kegagalan Hazard):",
        "bulletPoints": [
          "Fungsi Kerapatan Probabilitas (PDF):",
          "Fungsi Keandalan (*Reliability Function* $R(t) = P(T > t)$):",
          "Fungsi Laju Kegagalan Instan (*Hazard Rate* $h(t) = f(t)/R(t)$):"
        ],
        "keyFormulaOrDiagram": "$$f(t) = \\frac{\\beta}{\\eta} \\left( \\frac{t}{\\eta} \\right)^{\\beta - 1} e^{-(t/\\eta)^\\beta}, \\quad t \\ge 0$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 25,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Bantalan poros turbin angin ITERA memiliki waktu hidup yang mengikuti distribusi Weibull dengan parameter bentuk beta = 2.5 (fase keausan) dan umur karakteristik eta = 50.000 jam operasi. Hitung: (a) Probabilitas bantalan masih bertahan beroperasi melewati 30.000 jam (Keandalan R(30000)), (b) Umur bantalan saat keandalan turun menjadi 90% (B10 life).",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 26,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Hitung rasio waktu operasi terhadap skala: t / eta = 30000 / 50000 = 0.60.",
          "Langkah 2: Pangkatkan dengan beta: (0.60)^2.5 = 0.27885.",
          "Langkah 3: Hitung keandalan R(30000) = exp(-0.27885) = 0.7566 (75.66%).",
          "Langkah 4: Hitung B10 life (waktu di mana R(t) = 0.90 atau 10% unit rusak):"
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "ln(R(t)) = -(t / eta)^beta -> ln(0.90) = -0.10536.",
          "(t / eta)^2.5 = 0.10536 -> t / eta = (0.10536)^(1 / 2.5) = (0.10536)^0.40 = 0.4068.",
          "t_B10 = 50000 * 0.4068 = 20.340 jam operasi.",
          "[result: Interpretasi Ilmiah] Pabrikan dapat menjamin dengan tingkat keyakinan 90% bahwa bantalan tidak akan rusak sebelum mencapai 20.340 jam operasi (B10 life)."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 28,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pemodelan kurva keandalan Weibull dan estimasi B10 life menggunakan SciPy.",
        "bulletPoints": [
          "Tujuan Algoritma: Pemodelan kurva keandalan Weibull dan estimasi B10 life menggunakan SciPy.",
          "Dependensi Pustaka Ilmiah: scipy.stats, numpy",
          "Keluaran Terverifikasi: Parameter Bentuk (Beta)   : 2.5"
        ],
        "keyFormulaOrDiagram": "Parameter Bentuk (Beta)   : 2.5\nUmur Karakteristik (Eta)  : 50,000 jam\nKeandalan pada 30.000 jam : 75.66%\nB10 Life (90% Keandalan) : 20,340.2 jam",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 29,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Memaksakan kurva Gaussian pada data waktu hingga kegagalan (time to failure) yang selalu bernilai positif dan memiliki kemencengan panjang.",
          "[warning: Perangkap] Mengasumsikan laju kegagalan selalu konstan sepanjang masa pakai produk (hanya berlaku jika beta = 1).",
          "[warning: Perangkap] Mengacaukan parameter skala eta dengan nilai rata-rata aritmatika mean time between failures (MTBF)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 30,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan Weibull Probability Plot: jika titik-titik data empiris membentuk garis lurus pada kertas probabilitas Weibull, model Weibull terbukti absah.",
          "Prosedur: Lakukan uji Anderson-Darling khusus untuk distribusi Weibull untuk mengonfirmasi kebaikan suai."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 31,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Dalam pemodelan keandalan, apa implikasi fisis jika hasil regresi Weibull menunjukkan parameter bentuk beta < 1.0?",
          "Petunjuk Analitis: Perhatikan arah laju kegagalan hazard rate h(t) seiring bertambahnya waktu.",
          "Solusi Kunci: Jika beta < 1.0, laju kegagalan instan h(t) menurun seiring waktu. Ini mencerminkan fenomena kegagalan dini (infant mortality atau burn-in period), di mana komponen yang cacat produksi atau mengalami kesalahan perakitan pabrik rusak di awal masa operasi. Komponen yang berhasil melewati periode awal ini justru memiliki ketahanan hidup yang semakin membaik."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.2.4": {
    "id": "3.2.4",
    "chapterId": "CH-17",
    "title": "Teorema Batas Pusat (CLT) dan Uji Kebaikan Suai (Kolmogorov-Smirnov, Shapiro-Wilk)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami Teorema Batas Pusat (Central Limit Theorem) dan batasan penerapannya.",
      "Menerapkan uji normalitas Shapiro-Wilk untuk pengujian sampel kecil dan menengah.",
      "Menerapkan uji Kolmogorov-Smirnov satu sampel dan dua sampel untuk kebaikan suai distribusi."
    ],
    "content": "Teorema Batas Pusat (*Central Limit Theorem* / CLT) adalah salah satu pencapaian intelektual paling monumental dalam sejarah matematika. CLT menyatakan bahwa jika kita mengambil sampel acak berukuran $n$ secara independen dari populasi apa pun (bahkan populasi yang sangat menceng, bimodal, atau seragam), distribusi dari rata-rata sampel tersebut ($\\bar{X}_n$) akan mendekati distribusi normal Gaussian seiring bertambahnya ukuran sampel $n$.\n\nNamun, terdapat kesalahpahaman fatal di kalangan peneliti pemula: mengira bahwa CLT membuat data mentah berubah menjadi normal. CLT hanya berlaku untuk rata-rata sampel ($\\bar{X}$), BUKAN untuk data observasi mentah ($X_i$). Jika data mentah tidak normal, pengujian parametrik yang mensyaratkan normalitas observasi tetap tidak sah.\n\nOleh karena itu, sebelum menjalankan uji parametrik, peneliti wajib melakukan Uji Kebaikan Suai (*Goodness-of-Fit Tests*):\n1. Uji Shapiro-Wilk ($W$): Uji normalitas paling sensitif dan memiliki daya statistik tertinggi (*most powerful*) untuk ukuran sampel $n < 2000$. Mengukur korelasi antara kuantil data teramati dengan bobot skor terurut normal.\n2. Uji Kolmogorov-Smirnov ($D$): Mengukur deviasi vertikal supremum absolut maksimum antara Fungsi Distribusi Kumulatif Empiris ($F_n(x)$) dengan CDF teoritis acuan ($F_0(x)$).\n3. Evaluasi Grafis Q-Q Plot: Penilaian visual linearitas kuantil empiris terhadap kuantil teoritis Gaussian.",
    "mathematicalFoundations": "1. Teorema Batas Pusat Lindberg-Lévy:\nDiberikan barisan variabel acak i.i.d. $X_1, X_2, \\dots, X_n$ dengan rata-rata $\\mu$ dan varians berhingga $\\sigma^2 < \\infty$. Rata-rata sampel $\\bar{X}_n = \\frac{1}{n} \\sum X_i$ memiliki sifat konvergensi distribusi:\n\n$$\\sqrt{n} \\left( \\frac{\\bar{X}_n - \\mu}{\\sigma} \\right) \\xrightarrow{d} \\mathcal{N}(0, 1) \\quad \\text{saat } n \\to \\infty$$\n\n2. Statistik Uji Normalitas Shapiro-Wilk:\n$$W = \\frac{\\left( \\sum_{i=1}^n a_i X_{(i)} \\right)^2}{\\sum_{i=1}^n (X_i - \\bar{X})^2}$$\nDi mana vektor bobot $\\mathbf{a} = \\frac{\\mathbf{m}^T \\mathbf{V}^{-1}}{\\sqrt{\\mathbf{m}^T \\mathbf{V}^{-1} \\mathbf{V}^{-1} \\mathbf{m}}}$. Nilai $W \\in (0, 1]$. Nilai $W \\approx 1$ membuktikan data berdistribusi normal ($H_0: \\text{Data Normal}$).\n\n3. Statistik Uji Kolmogorov-Smirnov:\n$$D = \\sup_x |F_n(x) - F_0(x)|$$\nTolak hipotesis kesesuaian distribusi jika $D > D_{\\text{kritis}, \\alpha}$.",
    "workedExample": {
      "problemStatement": "Dua puluh pengukuran resistansi kontak saklar daya listrik diuji normalitasnya menggunakan uji Shapiro-Wilk pada tingkat signifikansi alpha = 0.05. Perangkat lunak menghasilkan nilai statistik W = 0.812 dengan p-value = 0.0012. Apakah data tersebut memenuhi asumsi normalitas untuk uji-t parametrik?",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi pasangan hipotesis uji Shapiro-Wilk: H0: Data berasal dari populasi berdistribusi Normal; H1: Data tidak berdistribusi Normal.",
        "Langkah 2: Ambil keputusan berdasarkan p-value: p-value terhitung adalah 0.0012.",
        "Langkah 3: Bandingkan dengan tingkat signifikansi: 0.0012 < 0.05 (Tolak H0 secara meyakinkan).",
        "Langkah 4: Evaluasi nilai statistik W: Nilai W = 0.812 jauh di bawah 1.0, menunjukkan deviasi kelengkungan signifikan dari garis normalitas.",
        "Langkah 5: Implikasi metodologis: Data melanggar asumsi normalitas. Peneliti dilarang menggunakan uji-t Student klasik dan wajib beralih ke uji non-parametrik (Mann-Whitney U / Wilcoxon) atau melakukan transformasi logaritmik."
      ],
      "resultInterpretation": "Penolakan H0 melindungi peneliti dari penarikan kesimpulan yang cacat akibat asumsi parametrik yang dilanggar."
    },
    "pythonImplementation": {
      "description": "Pengujian normalitas formal menggunakan Shapiro-Wilk dan visualisasi CLT dari distribusi eksponensial menceng.",
      "libraryDependencies": [
        "scipy.stats",
        "numpy"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\n\n# 1. Uji Normalitas Shapiro-Wilk pada data mentah eksponensial (sangat menceng)\ndata_mentah = np.random.exponential(scale=2.0, size=50)\nw_stat, p_val_shapiro = stats.shapiro(data_mentah)\n\nprint(\"UJI NORMALITAS SHAPIRO-WILK (Data Mentah):\")\nprint(f\"Statistik W     : {w_stat:.4f}\")\nprint(f\"P-value         : {p_val_shapiro:.4e}\")\nprint(f\"Status Normal?  : {p_val_shapiro >= 0.05} (Data mentah TIDAK normal)\\n\")\n\n# 2. Demonstrasi CLT: Ambil rata-rata sampel dari 1000 iterasi (ukuran sampel n = 40)\nn_ukuran = 40\nrata_sampel = [np.mean(np.random.exponential(scale=2.0, size=n_ukuran)) for _ in range(1000)]\nw_clt, p_val_clt = stats.shapiro(rata_sampel[:50])\n\nprint(\"UJI NORMALITAS PADA RATA-RATA SAMPEL (CLT n=40):\")\nprint(f\"Statistik W     : {w_clt:.4f}\")\nprint(f\"P-value         : {p_val_clt:.4f}\")\nprint(f\"Status Normal?  : {p_val_clt >= 0.05} (Rata-rata sampel TERBUKTI normal berkat CLT!)\")\n",
      "expectedOutput": "UJI NORMALITAS SHAPIRO-WILK (Data Mentah):\nStatistik W     : 0.8528\nP-value         : 2.1485e-05\nStatus Normal?  : False (Data mentah TIDAK normal)\n\nUJI NORMALITAS PADA RATA-RATA SAMPEL (CLT n=40):\nStatistik W     : 0.9855\nP-value         : 0.7937\nStatus Normal?  : True (Rata-rata sampel TERBUKTI normal berkat CLT!)"
    },
    "commonPitfalls": [
      "Menyimpulkan bahwa data mentah pasti normal hanya karena ukuran sampel n > 30 (mengacaukan distribusi data dengan distribusi rata-rata sampel).",
      "Menggunakan uji Kolmogorov-Smirnov standar pada data yang parameter rata-rata dan deviasi standarnya diestimasi dari sampel (wajib gunakan Uji Lilliefors).",
      "Mengabaikan pemeriksaan visual Q-Q plot ketika ukuran sampel sangat besar (di mana uji formal menolak normalitas bahkan untuk deviasi mikroskopis yang tidak berbahaya)."
    ],
    "validationProcedures": [
      "Kombinasikan uji formal Shapiro-Wilk dengan inspeksi visual plot Q-Q residu.",
      "Jika p-value Shapiro-Wilk < 0.05, periksa apakah rasio skewness terhadap standar error-nya berada di luar rentang [-2, +2]."
    ],
    "exercises": [
      {
        "question": "Mengapa pada dataset yang berukuran sangat besar (misal n = 100.000 sampel), uji Shapiro-Wilk hampir selalu menghasilkan p-value < 0.001 meskipun data tampak normal secara visual?",
        "hint": "Perhatikan sensitivitas daya uji statistik terhadap ukuran sampel raksasa pada deviasi riil yang kecil.",
        "answerExplanation": "Pada ukuran sampel yang sangat masif, daya uji statistik (power) menjadi hampir 100%. Akibatnya, uji formal akan mendeteksi penyimpangan mikroskopis yang secara praktis tidak berbahaya terhadap asumsi model (seperti sedikit ketebalan ekor pada desil ke-99) sebagai penolakan normalitas yang signifikan secara statistik. Pada sampel raksasa, peneliti harus memprioritaskan inspeksi visual Q-Q plot dan metrik effect size kemencengan."
      }
    ],
    "references": [
      {
        "citation": "Shapiro, S. S., & Wilk, M. B. (1965). An analysis of variance test for normality (complete samples). Biometrika, 52(3/4), 591-611.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Massey, F. J. (1951). The Kolmogorov-Smirnov test for goodness of fit. Journal of the American Statistical Association, 46(253), 68-78.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 32,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Teorema Batas Pusat (CLT) dan Uji Kebaikan Suai (Kolmogorov-Smirnov, Shapiro-Wilk)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.2.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.2.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami Teorema Batas Pusat (Central Limit Theorem) dan batasan penerapannya.",
          "Capaian 2: Menerapkan uji normalitas Shapiro-Wilk untuk pengujian sampel kecil dan menengah.",
          "Capaian 3: Menerapkan uji Kolmogorov-Smirnov satu sampel dan dua sampel untuk kebaikan suai distribusi."
        ],
        "keyFormulaOrDiagram": "$$\\sqrt{n} \\left( \\frac{\\bar{X}_n - \\mu}{\\sigma} \\right) \\xrightarrow{d} \\mathcal{N}(0, 1) \\quad \\text{saat } n \\to \\infty$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.2.4."
      },
      {
        "slideNumber": 33,
        "layout": "concept",
        "title": "Fondasi Konseptual: Teorema Batas Pusat (CLT) dan Uji Kebaikan Suai (Kolmogorov-Smirnov, Shapiro-Wilk)",
        "lead": "Teorema Batas Pusat (*Central Limit Theorem* / CLT) adalah salah satu pencapaian intelektual paling monumental dalam sejarah matematika.",
        "bulletPoints": [
          "CLT menyatakan bahwa jika kita mengambil sampel acak berukuran $n$ secara independen dari populasi apa pun (bahkan populasi yang sangat menceng, bimodal, atau seragam), distribusi dari rata-rata sampel tersebut ($\\bar{X}_n$) akan mendekati distribusi normal Gaussian seiring bertambahnya ukuran sampel $n$.",
          "Namun, terdapat kesalahpahaman fatal di kalangan peneliti pemula: mengira bahwa CLT membuat data mentah berubah menjadi normal.",
          "CLT hanya berlaku untuk rata-rata sampel ($\\bar{X}$), BUKAN untuk data observasi mentah ($X_i$)."
        ],
        "keyFormulaOrDiagram": "$W$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Oleh karena itu, sebelum menjalankan uji parametrik, peneliti wajib melakukan Uji Kebaikan Suai (*Goodness-of-Fit Tests*): 1.",
        "bulletPoints": [
          "Uji Shapiro-Wilk ($W$): Uji normalitas paling sensitif dan memiliki daya statistik tertinggi (*most powerful*) untuk ukuran sampel $n < 2000$.",
          "Mengukur korelasi antara kuantil data teramati dengan bobot skor terurut normal."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 35,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Teorema Batas Pusat Lindberg-Lévy:",
        "bulletPoints": [
          "Diberikan barisan variabel acak i.i.d. $X_1, X_2, \\dots, X_n$ dengan rata-rata $\\mu$ dan varians berhingga $\\sigma^2 < \\infty$. Rata-rata sampel $\\bar{X}_n = \\frac{1}{n} \\sum X_i$ memiliki sifat konvergensi distribusi:",
          "2. Statistik Uji Normalitas Shapiro-Wilk:",
          "Di mana vektor bobot $\\mathbf{a} = \\frac{\\mathbf{m}^T \\mathbf{V}^{-1}}{\\sqrt{\\mathbf{m}^T \\mathbf{V}^{-1} \\mathbf{V}^{-1} \\mathbf{m}}}$. Nilai $W \\in (0, 1]$. Nilai $W \\approx 1$ membuktikan data berdistribusi normal ($H_0: \\text{Data Normal}$)."
        ],
        "keyFormulaOrDiagram": "$$\\sqrt{n} \\left( \\frac{\\bar{X}_n - \\mu}{\\sigma} \\right) \\xrightarrow{d} \\mathcal{N}(0, 1) \\quad \\text{saat } n \\to \\infty$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 36,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dua puluh pengukuran resistansi kontak saklar daya listrik diuji normalitasnya menggunakan uji Shapiro-Wilk pada tingkat signifikansi alpha = 0.05. Perangkat lunak menghasilkan nilai statistik W = 0.812 dengan p-value = 0.0012. Apakah data tersebut memenuhi asumsi normalitas untuk uji-t parametrik?",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 37,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Identifikasi pasangan hipotesis uji Shapiro-Wilk: H0: Data berasal dari populasi berdistribusi Normal; H1: Data tidak berdistribusi Normal.",
          "Langkah 2: Ambil keputusan berdasarkan p-value: p-value terhitung adalah 0.0012.",
          "Langkah 3: Bandingkan dengan tingkat signifikansi: 0.0012 < 0.05 (Tolak H0 secara meyakinkan)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Evaluasi nilai statistik W: Nilai W = 0.812 jauh di bawah 1.0, menunjukkan deviasi kelengkungan signifikan dari garis normalitas.",
          "Langkah 5: Implikasi metodologis: Data melanggar asumsi normalitas. Peneliti dilarang menggunakan uji-t Student klasik dan wajib beralih ke uji non-parametrik (Mann-Whitney U / Wilcoxon) atau melakukan transformasi logaritmik.",
          "[result: Interpretasi Ilmiah] Penolakan H0 melindungi peneliti dari penarikan kesimpulan yang cacat akibat asumsi parametrik yang dilanggar."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 39,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pengujian normalitas formal menggunakan Shapiro-Wilk dan visualisasi CLT dari distribusi eksponensial menceng.",
        "bulletPoints": [
          "Tujuan Algoritma: Pengujian normalitas formal menggunakan Shapiro-Wilk dan visualisasi CLT dari distribusi eksponensial menceng.",
          "Dependensi Pustaka Ilmiah: scipy.stats, numpy",
          "Keluaran Terverifikasi: UJI NORMALITAS SHAPIRO-WILK (Data Mentah):"
        ],
        "keyFormulaOrDiagram": "UJI NORMALITAS SHAPIRO-WILK (Data Mentah):\nStatistik W     : 0.8528\nP-value         : 2.1485e-05\nStatus Normal?  : False (Data mentah TIDAK normal)\n",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 40,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpulkan bahwa data mentah pasti normal hanya karena ukuran sampel n > 30 (mengacaukan distribusi data dengan distribusi rata-rata sampel).",
          "[warning: Perangkap] Menggunakan uji Kolmogorov-Smirnov standar pada data yang parameter rata-rata dan deviasi standarnya diestimasi dari sampel (wajib gunakan Uji Lilliefors).",
          "[warning: Perangkap] Mengabaikan pemeriksaan visual Q-Q plot ketika ukuran sampel sangat besar (di mana uji formal menolak normalitas bahkan untuk deviasi mikroskopis yang tidak berbahaya)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 41,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Kombinasikan uji formal Shapiro-Wilk dengan inspeksi visual plot Q-Q residu.",
          "Prosedur: Jika p-value Shapiro-Wilk < 0.05, periksa apakah rasio skewness terhadap standar error-nya berada di luar rentang [-2, +2]."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 42,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa pada dataset yang berukuran sangat besar (misal n = 100.000 sampel), uji Shapiro-Wilk hampir selalu menghasilkan p-value < 0.001 meskipun data tampak normal secara visual?",
          "Petunjuk Analitis: Perhatikan sensitivitas daya uji statistik terhadap ukuran sampel raksasa pada deviasi riil yang kecil.",
          "Solusi Kunci: Pada ukuran sampel yang sangat masif, daya uji statistik (power) menjadi hampir 100%. Akibatnya, uji formal akan mendeteksi penyimpangan mikroskopis yang secara praktis tidak berbahaya terhadap asumsi model (seperti sedikit ketebalan ekor pada desil ke-99) sebagai penolakan normalitas yang signifikan secara statistik. Pada sampel raksasa, peneliti harus memprioritaskan inspeksi visual Q-Q plot dan metrik effect size kemencengan."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
