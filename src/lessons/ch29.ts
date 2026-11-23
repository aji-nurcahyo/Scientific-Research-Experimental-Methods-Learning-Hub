import { Lesson } from '../types/curriculum';

export const CH29_LESSONS: Record<string, Partial<Lesson>> = {
  "4.6.1": {
    "id": "4.6.1",
    "chapterId": "CH-29",
    "title": "Arsitektur Desain Faktorial Penuh 2^k: Level Tinggi (+) dan Level Rendah (-)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami struktur geometri dan notasi matriks desain faktorial 2^k.",
      "Mengkonversi variabel fisik rekayasa ke dalam variabel terkode terstandarisasi (-1 dan +1).",
      "Memanfaatkan sifat ortogonalitas matriks desain untuk dekomposisi efek independen."
    ],
    "content": "Dalam perancangan eksperimen rekayasa, keluarga desain yang paling efisien, paling banyak digunakan, dan menjadi fondasi seluruh metodologi optimasi industri adalah Desain Faktorial Penuh 2^k (2^k Full Factorial Design). Angka 2 menunjukkan bahwa setiap faktor diuji tepat pada dua level, sedangkan eksponen k menunjukkan jumlah faktor yang diinvestigasi.\n\nDua Level Terstandarisasi:\nUntuk setiap faktor kuantitatif, peneliti memilih dua kondisi operasional yang mewakili:\n- Level Rendah (Low Level), diberi kode angka -1 (atau tanda minus \"-\").\n- Level Tinggi (High Level), diberi kode angka +1 (atau tanda plus \"+\").\n\nTransformasi Pengkodean (Coding Transformation):\nVariabel fisik terukur (Natural Variables, xi) dikonversi ke variabel terkode tanpa dimensi (Coded Variables, xi_coded) melalui pemetaan linier:\n$$x_{i, \\text{coded}} = \\frac{x_i - \\text{Titik Tengah}}{\\text{Setengah Rentang}} = \\frac{x_i - (x_{i, \\text{high}} + x_{i, \\text{low}})/2}{(x_{i, \\text{high}} - x_{i, \\text{low}})/2}$$\n\nPengkodean ini memiliki keunggulan aljabar yang luar biasa:\n1. Skala seragam: Seluruh faktor memiliki skala yang identik dari -1 hingga +1, sehingga magnitudo koefisien regresi dapat dibandingkan secara langsung untuk menentukan faktor mana yang paling dominan.\n2. Ortogonalitas sempurna: Matriks desain X memiliki kolom-kolom yang saling tegak lurus (perkalian skalar antarkolom adalah tepat nol). Akibatnya, estimasi dari setiap efek utama dan interaksi bersifat independen murni; penambahan atau pengurangan suatu suku tidak mengubah estimasi suku lainnya.",
    "mathematicalFoundations": "1. Notasi Baku Yates untuk Kombinasi Perlakuan:\nPada desain $2^k$, terdapat $2^k$ kombinasi perlakuan unik:\n- Simbol (1) merepresentasikan kondisi di mana seluruh faktor berada pada level rendah (-1).\n- Huruf kecil a, b, c, ab, abc, dll., merepresentasikan kombinasi perlakuan di mana hanya faktor-faktor yang disebutkan hurufnya yang berada pada level tinggi (+1), sedangkan faktor lainnya pada level rendah (-1).\nContoh untuk $2^2$:\n- (1): A = -1, B = -1\n- a: A = +1, B = -1\n- b: A = -1, B = +1\n- ab: A = +1, B = +1\n\n2. Matriks Desain Terkode Ortogonal $\\mathbf{X}$:\nUntuk desain $2^2$:\n$$\\mathbf{X} = \\begin{bmatrix} x_0 & x_1 & x_2 & x_1 x_2 \\\\ 1 & -1 & -1 & +1 \\\\ 1 & +1 & -1 & -1 \\\\ 1 & -1 & +1 & -1 \\\\ 1 & +1 & +1 & +1 \\end{bmatrix}$$\nSifat Ortogonalitas:\n$$\\mathbf{X}^T \\mathbf{X} = N \\mathbf{I} = 4 \\mathbf{I}_4$$\nInversi matriks menjadi sangat sepele:\n$$(\\mathbf{X}^T \\mathbf{X})^{-1} = \\frac{1}{N} \\mathbf{I}$$\nKoefisien regresi OLS dihitung langsung tanpa inversi matriks kompleks:\n$$\\hat{\\boldsymbol{\\beta}} = \\frac{1}{N} \\mathbf{X}^T \\mathbf{y}$$",
    "workedExample": {
      "problemStatement": "Dalam proses pengelasan laser lembaran aluminium, terdapat dua parameter utama: Daya Laser (P: 1500 Watt hingga 2500 Watt) dan Kecepatan Pengelasan (V: 20 mm/s hingga 40 mm/s). Tentukan rumus pengkodean untuk P dan V, serta tuliskan nilai terkode untuk uji coba pada Daya = 2250 Watt dan Kecepatan = 25 mm/s.",
      "stepByStepSolution": [
        "Langkah 1: Hitung titik tengah dan setengah rentang Daya Laser (P):\nTitik Tengah P_0 = (2500 + 1500) / 2 = 4000 / 2 = 2000 Watt.\nSetengah Rentang Delta_P = (2500 - 1500) / 2 = 1000 / 2 = 500 Watt.\nRumus Pengkodean: x_P = (P - 2000) / 500.",
        "Langkah 2: Hitung titik tengah dan setengah rentang Kecepatan Pengelasan (V):\nTitik Tengah V_0 = (40 + 20) / 2 = 60 / 2 = 30 mm/s.\nSetengah Rentang Delta_V = (40 - 20) / 2 = 20 / 2 = 10 mm/s.\nRumus Pengkodean: x_V = (V - 30) / 10.",
        "Langkah 3: Hitung nilai terkode untuk Daya = 2250 Watt:\nx_P = (2250 - 2000) / 500 = 250 / 500 = +0.50.",
        "Langkah 4: Hitung nilai terkode untuk Kecepatan = 25 mm/s:\nx_V = (25 - 30) / 10 = -5 / 10 = -0.50."
      ],
      "resultInterpretation": "Kondisi operasional (2250 Watt, 25 mm/s) dipetakan ke koordinat terkode (+0.50, -0.50). Transformasi ini menstandardisasi ruang input ke dalam domain terkode yang simetris."
    },
    "pythonImplementation": {
      "description": "Generasi matriks desain ortogonal faktorial 2^k lengkap dengan notasi Yates dan verifikasi ortogonalitas.",
      "libraryDependencies": [
        "numpy",
        "pandas"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\nk = 3  # Tiga faktor: A, B, C (2^3 = 8 runs)\nN = 2**k\n\n# Matriks level dasar (-1 dan +1)\nlevels = [-1, 1]\ngrid = np.array(np.meshgrid(levels, levels, levels)).T.reshape(-1, k)\n# Urutkan sesuai standar Yates (A berubah paling cepat, lalu B, lalu C)\nurutan = np.lexsort((grid[:, 0], grid[:, 1], grid[:, 2]))\nX_base = grid[urutan]\n\nx1, x2, x3 = X_base[:, 0], X_base[:, 1], X_base[:, 2]\n\n# Hitung kolom interaksi\nx12 = x1 * x2\nx13 = x1 * x3\nx23 = x2 * x3\nx123 = x1 * x2 * x3\nx0 = np.ones(N)\n\n# Susun matriks desain penuh X\nX_full = np.column_stack([x0, x1, x2, x3, x12, x13, x23, x123])\nkolom = ['Intersep', 'A', 'B', 'C', 'AB', 'AC', 'BC', 'ABC']\n\ndf_desain = pd.DataFrame(X_full, columns=kolom)\n\n# Verifikasi Ortogonalitas: X^T X = N * I\nXtX = X_full.T @ X_full\nis_orthogonal = np.allclose(XtX, N * np.eye(N))\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Matriks Desain Faktorial Penuh 2^3\")\nprint(df_desain.to_string(index=False))\nprint(f\"\\nVerifikasi Ortogonalitas (X^T X = {N} * I): {is_orthogonal}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Matriks Desain Faktorial Penuh 2^3\n Intersep    A    B    C   AB   AC   BC  ABC\n      1.0 -1.0 -1.0 -1.0  1.0  1.0  1.0 -1.0\n      1.0  1.0 -1.0 -1.0 -1.0 -1.0  1.0  1.0\n      1.0 -1.0  1.0 -1.0 -1.0  1.0 -1.0  1.0\n      1.0  1.0  1.0 -1.0  1.0 -1.0 -1.0 -1.0\n      1.0 -1.0 -1.0  1.0  1.0 -1.0 -1.0  1.0\n      1.0  1.0 -1.0  1.0 -1.0  1.0 -1.0 -1.0\n      1.0 -1.0  1.0  1.0 -1.0 -1.0  1.0 -1.0\n      1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0\n\nVerifikasi Ortogonalitas (X^T X = 8 * I): True"
    },
    "commonPitfalls": [
      "Menganalisis data faktorial 2^k menggunakan variabel fisik alami tanpa standarisasi pengkodean (-1, +1), sehingga kehilangan komparabilitas magnitudo koefisien.",
      "Mengira bahwa desain 2^k mampu mendeteksi kelengkungan orde-2 (curvature) kuadratik (desain 2 level hanya memodelkan respon linier murni).",
      "Lupa mengacak (randomize) urutan eksekusi ke-2^k kombinasi perlakuan."
    ],
    "validationProcedures": [
      "Verifikasi bahwa produk silang setiap pasang kolom pada matriks desain bernilai nol (sum(x_i * x_j) = 0).",
      "Pastikan rentang fisik yang dipilih untuk level -1 dan +1 cukup lebar untuk menghasilkan sinyal namun tetap berada dalam batas keselamatan proses.",
      "Tambahkan titik pusat (center points) jika ada kecurigaan kelengkungan non-linier pada respon."
    ],
    "exercises": [
      {
        "question": "Mengapa matriks desain terkode 2^k yang memenuhi sifat ortogonalitas X^T X = N * I sangat menguntungkan dalam analisis regresi?",
        "hint": "Perhatikan inversi matriks normal equation dan dependensi antar koefisien.",
        "answerExplanation": "Ortogonalitas menjamin bahwa matriks X^T X berbentuk diagonal murni, sehingga tidak diperlukan inversi matriks rumit dan seluruh koefisien regresi diestimasi secara independen murni tanpa saling mempengaruhi."
      }
    ],
    "references": [
      {
        "citation": "Box, G. E., Hunter, J. S., & Hunter, W. G. (2005). Statistics for Experimenters: Design, Innovation, and Discovery (2nd ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Arsitektur Desain Faktorial Penuh 2^k: Level Tinggi (+)...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.6.1.",
          "Capaian: Memahami struktur geometri dan notasi matriks desain faktorial 2^k.",
          "Capaian: Mengkonversi variabel fisik rekayasa ke dalam variabel terkode terstandarisasi (-1 dan +1).",
          "Capaian: Memanfaatkan sifat ortogonalitas matriks desain untuk dekomposisi efek independen."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{X} = \\begin{bmatrix} x_0 & x_1 & x_2 & x_1 x_2 \\\\ 1 & -1 & -1 & +1 \\\\ 1 & +1 & -1 & -1 \\\\ 1 & -1 & +1 & -1 \\\\ 1 & +1 & +1 & +1 \\end{bmatrix}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Arsitektur Desain Faktorial Penuh 2^k: Level Tinggi (+)...",
        "bulletPoints": [
          "Dalam perancangan eksperimen rekayasa, keluarga desain yang paling efisien, paling banyak digunakan, dan menjadi fondasi selu...",
          "Dua Level Terstandarisasi: Untuk setiap faktor kuantitatif, peneliti memilih dua kondisi operasional yang mewakili: - Level R...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Transformasi Pengkodean (Coding Transformation): Variabel fisik terukur (Natural Variables..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Transformasi Pengkodean (Coding Transformation): Variabel fisik terukur (Natural Variables, xi) dikonversi ke variabel terkod...",
          "Pengkodean ini memiliki keunggulan aljabar yang luar biasa: 1. Skala seragam: Seluruh faktor memiliki skala yang identik dari...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Notasi Baku Yates untuk Kombinasi Perlakuan:",
          "Pada desain $2^k$, terdapat $2^k$ kombinasi perlakuan unik:",
          "- Simbol (1) merepresentasikan kondisi di mana seluruh faktor berada pada level rendah (-1)."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{X} = \\begin{bmatrix} x_0 & x_1 & x_2 & x_1 x_2 \\\\ 1 & -1 & -1 & +1 \\\\ 1 & +1 & -1 & -1 \\\\ 1 & -1 & +1 & -1 \\\\ 1 & +1 & +1 & +1 \\end{bmatrix}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Dalam proses pengelasan laser lembaran aluminium, terdapat dua parameter utama: Daya Laser (P: 1500 Watt hingga 2500 Watt) dan Kecepatan Pen...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Hitung titik tengah dan setengah rentang Daya Laser (P): Titik Tengah P_0 = (2500 + 1500) / 2 = 400...",
          "Langkah 2: Hitung titik tengah dan setengah rentang Kecepatan Pengelasan (V): Titik Tengah V_0 = (40 + 20) / 2...",
          "Langkah 3: Hitung nilai terkode untuk Daya = 2250 Watt: x_P = (2250 - 2000) / 500 = 250 / 500 = +0.50.",
          "Interpretasi: Kondisi operasional (2250 Watt, 25 mm/s) dipetakan ke koordinat terkode (+0.50, -0.50). Transformasi ini menstandardisas..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Hitung nilai terkode untuk Kecepatan = 25 mm/s: x_V = (25 - 30) / 10 = -5 / 10..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Generasi matriks desain ortogonal faktorial 2^k lengkap dengan notasi Yates dan verifikasi ortogonalitas.",
          "Dependensi Pustaka: numpy, pandas",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Matriks Desain Faktorial Penuh 2^3"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Matriks Desain Faktorial Penuh 2^3 | Intersep A B C AB AC BC ABC..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menganalisis data faktorial 2^k menggunakan variabel fisik alami tanpa standarisasi pengkodean (-1, +1), sehin...",
          "Perangkap: Mengira bahwa desain 2^k mampu mendeteksi kelengkungan orde-2 (curvature) kuadratik (desain 2 level hanya memo...",
          "Perangkap: Lupa mengacak (randomize) urutan eksekusi ke-2^k kombinasi perlakuan."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Verifikasi bahwa produk silang setiap pasang kolom pada matriks desain bernilai nol (sum(x_i * x_j) = 0).",
          "Prosedur: Pastikan rentang fisik yang dipilih untuk level -1 dan +1 cukup lebar untuk menghasilkan sinyal namun tetap be...",
          "Prosedur: Tambahkan titik pusat (center points) jika ada kecurigaan kelengkungan non-linier pada respon."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa matriks desain terkode 2^k yang memenuhi sifat ortogonalitas X^T X = N * I sangat menguntungkan dalam analisis r...",
          "Petunjuk: Perhatikan inversi matriks normal equation dan dependensi antar koefisien.",
          "Solusi Kunci: Ortogonalitas menjamin bahwa matriks X^T X berbentuk diagonal murni, sehingga tidak diperlukan inversi matriks rumit dan..."
        ]
      }
    ]
  },
  "4.6.2": {
    "id": "4.6.2",
    "chapterId": "CH-29",
    "title": "Perhitungan Matematis Efek Utama (Main Effects) dan Efek Interaksi 2-Faktor",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menghitung efek utama (main effects) faktor menggunakan kalkulus kontras ortogonal.",
      "Menghitung efek interaksi dua faktor (two-factor interactions) secara aljabar.",
      "Memahami relasi matematis antara Efek Kontras dengan Koefisien Regresi Terkode (Efek = 2 * beta)."
    ],
    "content": "Dalam desain faktorial 2^k, salah satu konsep paling mendasar yang harus dipahami secara presisi adalah definisi Efek Utama (Main Effect). Efek utama dari suatu faktor merepresentasikan perubahan rata-rata pada variabel respon ketika faktor tersebut dinaikkan dari level rendah (-1) ke level tinggi (+1), dirata-ratakan di seluruh level faktor lainnya.\n\nSecara matematis, efek utama dihitung menggunakan Vektor Kontras (Contrast). Setiap kombinasi perlakuan diberi bobot tanda +1 atau -1 sesuai dengan kolom faktor yang bersangkutan pada matriks desain, dijumlahkan bersama nilai respon teramati, lalu dibagi dengan setengah jumlah total pengujian (n * 2^(k-1)).\n\nKonsep yang sama berlaku untuk Efek Interaksi Dua Faktor (Two-Factor Interaction, AB). Efek interaksi AB merepresentasikan separuh dari selisih antara efek faktor A pada level tinggi B dengan efek faktor A pada level rendah B. Bobot kontras untuk interaksi AB diperoleh secara elegan cukup dengan mengalikan kolom tanda faktor A dengan kolom tanda faktor B.\n\nPenting bagi peneliti untuk membedakan antara Efek Faktor (Effect) dan Koefisien Regresi (Regression Coefficient, beta). Dalam skala terkode [-1, +1], rentang total dari level rendah ke tinggi adalah 2 satuan (dari -1 ke +1). Oleh karena itu, koefisien regresi beta mewakili kemiringan per satu satuan perubahan, sehingga berlaku relasi matematis universal: Efek = 2 * beta.",
    "mathematicalFoundations": "1. Definisi Kontras Efek (Contrast):\nUntuk faktor atau interaksi sembarang pada desain $2^k$ dengan $n$ replikasi:\n$$\\text{Kontras} = \\sum_{i=1}^{2^k} c_i \\bar{y}_i = \\mathbf{c}^T \\bar{\\mathbf{y}}$$\ndi mana $c_i \\in \\{-1, +1\\}$ adalah elemen pada kolom tabel tanda desain.\n\n2. Estimasi Efek Utama dan Interaksi:\n$$\\text{Efek} = \\frac{\\text{Kontras}}{n \\cdot 2^{k-1}}$$\nUntuk desain $2^2$ dengan replikasi $n$:\n$$\\text{Efek } A = \\frac{[ab + a - b - (1)]}{2n}$$\n$$\\text{Efek } B = \\frac{[ab + b - a - (1)]}{2n}$$\n$$\\text{Efek } AB = \\frac{[ab + (1) - a - b]}{2n}$$\n\n3. Hubungan antara Efek Faktor dan Koefisien Model Regresi Terkode:\nModel regresi terkode:\n$$\\hat{y} = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\beta_{12} x_1 x_2$$\nPerhatikan bahwa ketika $x_1$ naik dari $-1$ ke $+1$, perubahan respon adalah:\n$$\\Delta \\hat{y} = [\\beta_0 + \\beta_1(+1)] - [\\beta_0 + \\beta_1(-1)] = 2\\beta_1$$\nOleh karena itu:\n$$\\text{Efek } A = 2 \\beta_1 \\implies \\beta_1 = \\frac{\\text{Efek } A}{2}$$\n$$\\text{Efek } AB = 2 \\beta_{12} \\implies \\beta_{12} = \\frac{\\text{Efek } AB}{2}$$\n\n4. Jumlah Kuadrat (Sum of Squares) Efek untuk ANOVA:\n$$\\text{SS}_{\\text{Efek}} = \\frac{(\\text{Kontras})^2}{n \\cdot 2^k} = \\frac{n \\cdot 2^k}{4} (\\text{Efek})^2$$\nSetiap efek utama dan interaksi memiliki tepat 1 derajat kebebasan.",
    "workedExample": {
      "problemStatement": "Pada pengujian efisiensi pemotongan logam dengan desain 2^2 (A = Kecepatan, B = Sudut Pahat) dengan n = 1 (single replicate), diperoleh data respon kekasaran permukaan (um):\n(1) = 20, a = 40, b = 30, ab = 52.\nHitung Kontras, Efek Utama A, Efek Utama B, Efek Interaksi AB, dan koefisien model regresi terkode beta.",
      "stepByStepSolution": [
        "Langkah 1: Hitung Kontras dan Efek Utama A (Kecepatan):\nKontras A = [ab + a - b - (1)] = 52 + 40 - 30 - 20 = 92 - 50 = +42.\nEfek A = Kontras A / (n * 2^(2-1)) = 42 / 2 = +21.0 um.\nbeta_1 = Efek A / 2 = 21.0 / 2 = +10.5.",
        "Langkah 2: Hitung Kontras dan Efek Utama B (Sudut Pahat):\nKontras B = [ab + b - a - (1)] = 52 + 30 - 40 - 20 = 82 - 60 = +22.\nEfek B = Kontras B / 2 = 22 / 2 = +11.0 um.\nbeta_2 = Efek B / 2 = 11.0 / 2 = +5.5.",
        "Langkah 3: Hitung Kontras dan Efek Interaksi AB:\nKontras AB = [ab + (1) - a - b] = 52 + 20 - 40 - 30 = 72 - 70 = +2.\nEfek AB = Kontras AB / 2 = 2 / 2 = +1.0 um.\nbeta_12 = Efek AB / 2 = 1.0 / 2 = +0.5.",
        "Langkah 4: Hitung Intersep beta_0 (Grand Mean):\nbeta_0 = (20 + 40 + 30 + 52) / 4 = 142 / 4 = 35.5."
      ],
      "resultInterpretation": "Model empiris terkode yang diperoleh adalah y_hat = 35.5 + 10.5*x1 + 5.5*x2 + 0.5*x1*x2. Menaikkan kecepatan (A) dari rendah ke tinggi meningkatkan kekasaran permukaan rata-rata sebesar 21.0 um, sedangkan kenaikan sudut (B) menaikkan kekasaran sebesar 11.0 um. Efek interaksi AB (+1.0 um) relatif kecil."
    },
    "pythonImplementation": {
      "description": "Kalkulasi kontras, efek faktorial, koefisien beta, dan Sum of Squares menggunakan Python.",
      "libraryDependencies": [
        "numpy",
        "pandas"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\n# Data respon eksperimen 2^2\n# Urutan: (1), a, b, ab\ny = np.array([20.0, 40.0, 30.0, 52.0])\nN = len(y)\n\n# Matriks tanda kontras\n# Kolom: Intersep, A, B, AB\ntanda = np.array([\n    [1, -1, -1,  1],\n    [1,  1, -1, -1],\n    [1, -1,  1, -1],\n    [1,  1,  1,  1]\n])\n\nkontras = tanda.T @ y\nefek = kontras / (N / 2.0)\nefek[0] = kontras[0] / N  # Rata-rata untuk intersep\nbeta = efek / 2.0\nbeta[0] = efek[0]         # Intersep tetap rata-rata\n\nss = (kontras**2) / N\n\nringkasan = pd.DataFrame({\n    'Faktor': ['Grand Mean', 'Efek A', 'Efek B', 'Interaksi AB'],\n    'Kontras': kontras,\n    'Estimasi Efek': efek,\n    'Koefisien Beta': beta,\n    'Sum of Squares (SS)': ss\n})\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil Analisis Efek Faktorial 2^2\")\nprint(ringkasan.to_string(index=False))\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Analisis Efek Faktorial 2^2\n      Faktor  Kontras  Estimasi Efek  Koefisien Beta  Sum of Squares (SS)\n  Grand Mean    142.0           35.5            35.5               5041.0\n      Efek A     42.0           21.0            10.5                441.0\n      Efek B     22.0           11.0             5.5                121.0\nInteraksi AB      2.0            1.0             0.5                  1.0"
    },
    "commonPitfalls": [
      "Menyamakan nilai Efek dengan nilai Koefisien Regresi beta (Efek = 2 * beta, kelalaian membagi dua adalah kesalahan paling sering pada ujian DoE).",
      "Salah menghitung tanda aljabar kontras interaksi (tanda interaksi harus merupakan perkalian eksak dari tanda faktor-faktor pembentuknya).",
      "Mengabaikan pembagi n * 2^(k-1) saat menghitung efek rata-rata."
    ],
    "validationProcedures": [
      "Verifikasi bahwa jumlah Sum of Squares seluruh efek ditambah SSE sama persis dengan SSTotal.",
      "Periksa konsistensi tanda: Koefisien regresi beta_j harus sama persis dengan Efek_j / 2.",
      "Konfirmasi bahwa vektor kontras memenuhi syarat ortogonalitas sum(c_i) = 0."
    ],
    "exercises": [
      {
        "question": "Pada desain faktorial 2^3, jika estimasi efek utama faktor A adalah Efek A = +16.0, berapakah nilai koefisien regresi beta_1 dalam model persamaan regresi terkode y = beta_0 + beta_1*x1 + ... ?",
        "hint": "Ingat hubungan matematis antara efek perubahan total (-1 ke +1) dan koefisien kemiringan beta.",
        "answerExplanation": "Koefisien regresi beta_1 adalah tepat separuh dari efek faktor: beta_1 = Efek A / 2 = 16.0 / 2 = +8.0."
      }
    ],
    "references": [
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Yates, F. (1937). The design and analysis of factorial experiments. Technical Communication No. 35 of the Commonwealth Bureau of Soils.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Perhitungan Matematis Efek Utama (Main Effects) dan Efe...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.6.2.",
          "Capaian: Menghitung efek utama (main effects) faktor menggunakan kalkulus kontras ortogonal.",
          "Capaian: Menghitung efek interaksi dua faktor (two-factor interactions) secara aljabar.",
          "Capaian: Memahami relasi matematis antara Efek Kontras dengan Koefisien Regresi Terkode (Efek = 2 * beta)."
        ],
        "keyFormulaOrDiagram": "$$\\text{Kontras} = \\sum_{i=1}^{2^k} c_i \\bar{y}_i = \\mathbf{c}^T \\bar{\\mathbf{y}}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Perhitungan Matematis Efek Utama (Main Effects) dan Efe...",
        "bulletPoints": [
          "Dalam desain faktorial 2^k, salah satu konsep paling mendasar yang harus dipahami secara presisi adalah definisi Efek Utama (...",
          "Secara matematis, efek utama dihitung menggunakan Vektor Kontras (Contrast). Setiap kombinasi perlakuan diberi bobot tanda +1...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Konsep yang sama berlaku untuk Efek Interaksi Dua Faktor (Two-Factor Interaction, AB). Efe..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Konsep yang sama berlaku untuk Efek Interaksi Dua Faktor (Two-Factor Interaction, AB). Efek interaksi AB merepresentasikan se...",
          "Penting bagi peneliti untuk membedakan antara Efek Faktor (Effect) dan Koefisien Regresi (Regression Coefficient, beta). Dala...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Definisi Kontras Efek (Contrast):",
          "Untuk faktor atau interaksi sembarang pada desain $2^k$ dengan $n$ replikasi:",
          "di mana $c_i \\in \\{-1, +1\\}$ adalah elemen pada kolom tabel tanda desain."
        ],
        "keyFormulaOrDiagram": "$$\\text{Kontras} = \\sum_{i=1}^{2^k} c_i \\bar{y}_i = \\mathbf{c}^T \\bar{\\mathbf{y}}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada pengujian efisiensi pemotongan logam dengan desain 2^2 (A = Kecepatan, B = Sudut Pahat) dengan n = 1 (single replicate), diperoleh data...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Hitung Kontras dan Efek Utama A (Kecepatan): Kontras A = [ab + a - b - (1)] = 52 + 40 - 30 - 20 = 9...",
          "Langkah 2: Hitung Kontras dan Efek Utama B (Sudut Pahat): Kontras B = [ab + b - a - (1)] = 52 + 30 - 40 - 20 =...",
          "Langkah 3: Hitung Kontras dan Efek Interaksi AB: Kontras AB = [ab + (1) - a - b] = 52 + 20 - 40 - 30 = 72 - 70...",
          "Interpretasi: Model empiris terkode yang diperoleh adalah y_hat = 35.5 + 10.5*x1 + 5.5*x2 + 0.5*x1*x2. Menaikkan kecepatan (A) dari re..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Hitung Intersep beta_0 (Grand Mean): beta_0 = (20 + 40 + 30 + 52) / 4 = 142 / 4..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Kalkulasi kontras, efek faktorial, koefisien beta, dan Sum of Squares menggunakan Python.",
          "Dependensi Pustaka: numpy, pandas",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil Analisis Efek Faktorial 2^2"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Analisis Efek Faktorial 2^2 | Faktor Kontras Estimasi Efek..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menyamakan nilai Efek dengan nilai Koefisien Regresi beta (Efek = 2 * beta, kelalaian membagi dua adalah kesal...",
          "Perangkap: Salah menghitung tanda aljabar kontras interaksi (tanda interaksi harus merupakan perkalian eksak dari tanda f...",
          "Perangkap: Mengabaikan pembagi n * 2^(k-1) saat menghitung efek rata-rata."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Verifikasi bahwa jumlah Sum of Squares seluruh efek ditambah SSE sama persis dengan SSTotal.",
          "Prosedur: Periksa konsistensi tanda: Koefisien regresi beta_j harus sama persis dengan Efek_j / 2.",
          "Prosedur: Konfirmasi bahwa vektor kontras memenuhi syarat ortogonalitas sum(c_i) = 0."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Pada desain faktorial 2^3, jika estimasi efek utama faktor A adalah Efek A = +16.0, berapakah nilai koefisien regresi be...",
          "Petunjuk: Ingat hubungan matematis antara efek perubahan total (-1 ke +1) dan koefisien kemiringan beta.",
          "Solusi Kunci: Koefisien regresi beta_1 adalah tepat separuh dari efek faktor: beta_1 = Efek A / 2 = 16.0 / 2 = +8.0."
        ]
      }
    ]
  },
  "4.6.3": {
    "id": "4.6.3",
    "chapterId": "CH-29",
    "title": "Analisis Interaksi 3-Faktor dan Plot Interaksi Dua Arah",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menafsirkan interaksi tingkat tinggi (three-factor interaction ABC) secara fisik.",
      "Membangun dan membaca Plot Interaksi Dua Arah (Two-Way Interaction Plots).",
      "Menerapkan prinsip hierarki efek (Hierarchical Ordering Principle) dalam pemodelan empiris."
    ],
    "content": "Ketika jumlah faktor dalam desain bertambah menjadi k >= 3, peneliti berhadapan dengan kemungkinan munculnya Interaksi Tingkat Tinggi (High-Order Interactions), seperti interaksi 3-faktor (ABC).\n\nMakna Fisis Interaksi 3-Faktor:\nInteraksi dua faktor (AB) mengukur bagaimana efek faktor A dipengaruhi oleh level faktor B. Interaksi tiga faktor (ABC) mengukur bagaimana efek interaksi dua faktor (AB) itu sendiri berubah tergantung pada level faktor ketiga (C). Secara grafis, keberadaan interaksi 3-faktor yang signifikan tercermin ketika plot interaksi dua arah (A x B) pada level C rendah (-1) menampilkan pola yang sama sekali berbeda dibandingkan plot interaksi (A x B) pada level C tinggi (+1).\n\nPrinsip Hierarki Efek (Hierarchical Ordering Principle):\nDalam sains eksperimental dan rekayasa fisik, berlaku aturan empiris yang sangat kuat:\n1. Efek utama (orde-1) cenderung lebih dominan daripada interaksi dua faktor (orde-2).\n2. Interaksi dua faktor (orde-2) cenderung jauh lebih dominan dan lebih sering muncul daripada interaksi tiga faktor (orde-3).\n3. Interaksi empat faktor atau lebih (orde >= 4) hampir tidak pernah terjadi dalam fenomena fisik nyata dan biasanya dapat diasumsikan sebagai noise murni (sparsity of effects principle).\n\nJika interaksi 3-faktor terbukti signifikan secara statistik, peneliti wajib memeriksa apakah hal tersebut mencerminkan mekanisme fisik yang nyata (seperti reaksi kimia kompleks tiga reaktan) atau merupakan artefak akibat adanya pencilan data tunggal (single outlier) pada satu sudut kubus faktorial.",
    "mathematicalFoundations": "1. Formulasi Kontras Interaksi Tiga Faktor (ABC):\nPada desain $2^3$, kolom tanda untuk interaksi $ABC$ diperoleh dari perkalian tiga kolom:\n$$c_{ABC, i} = c_{A, i} \\cdot c_{B, i} \\cdot c_{C, i}$$\nKontras $ABC$:\n$$\\text{Kontras}(ABC) = [abc + a + b + c] - [ab + ac + bc + (1)]$$\nEfek Interaksi Tiga Faktor:\n$$\\text{Efek } ABC = \\frac{\\text{Kontras}(ABC)}{n \\cdot 2^{3-1}} = \\frac{[abc + a + b + c] - [ab + ac + bc + (1)]}{4n}$$\n\n2. Representasi Geometris Kubus Faktorial $2^3$:\nTitik-titik pengujian membentuk 8 sudut dari sebuah kubus tiga dimensi di ruang terkode $[-1, +1]^3$.\n- Efek utama membandingkan 4 sudut pada satu sisi kubus terhadap 4 sudut pada sisi seberangnya.\n- Interaksi 2-faktor membandingkan bidang diagonal kubus.\n- Interaksi 3-faktor membandingkan dua himpunan 4 sudut tetrahedron yang saling berjalin (*intertwined tetrahedra*).\n\n3. Dekomposisi Plot Profil Interaksi Dua Arah:\nKemiringan garis respon faktor A pada level B tertentu:\n$$\\text{Slope}(A \\mid B = +1) = \\frac{\\bar{y}_{A+B+} - \\bar{y}_{A-B+}}{2}$$\n$$\\text{Slope}(A \\mid B = -1) = \\frac{\\bar{y}_{A+B-} - \\bar{y}_{A-B-}}{2}$$\nSelisih kemiringan kedua garis ini berbanding lurus dengan besarnya interaksi AB:\n$$\\text{Slope}(A \\mid B = +1) - \\text{Slope}(A \\mid B = -1) = 2 \\cdot \\beta_{AB} = \\text{Efek } AB$$",
    "workedExample": {
      "problemStatement": "Pada pengujian efisiensi pemisahan membran filtrasi (2^3 desain: A = Tekanan, B = Suhu, C = Konsentrasi Garam), diperoleh data respon:\nLevel C Rendah (-1): (1) = 40, a = 50, b = 45, ab = 55 (Plot A x B menunjukkan garis paralel sempurna, efek A = +10 pada B- dan B+).\nLevel C Tinggi (+1): c = 35, ac = 65, bc = 30, abc = 80 (Plot A x B menunjukkan garis tidak paralel, efek A = +30 pada B- dan +50 pada B+).\nHitung Efek Interaksi ABC dan jelaskan interpretasi grafisnya.",
      "stepByStepSolution": [
        "Langkah 1: Hitung Kontras ABC:\nKontras ABC = [abc + a + b + c] - [ab + ac + bc + (1)]\nSuku Positif: abc + a + b + c = 80 + 50 + 45 + 35 = 210.\nSuku Negatif: ab + ac + bc + (1) = 55 + 65 + 30 + 40 = 190.\nKontras ABC = 210 - 190 = +20.0.",
        "Langkah 2: Hitung Efek ABC (n = 1, k = 3):\nEfek ABC = Kontras ABC / 4 = 20.0 / 4 = +5.0.",
        "Langkah 3: Hitung interaksi AB pada masing-masing level C:\nPada C = -1: Efek AB_(C-) = [ab + (1) - a - b] / 2 = [55 + 40 - 50 - 45] / 2 = 0 / 2 = 0.0 (Garis paralel sempurna, tidak ada interaksi AB pada C rendah).\nPada C = +1: Efek AB_(C+) = [abc + c - ac - bc] / 2 = [80 + 35 - 65 - 30] / 2 = 20 / 2 = +10.0 (Terjadi interaksi positif kuat pada C tinggi).",
        "Langkah 4: Hitung selisih interaksi: [Efek AB_(C+) - Efek AB_(C-)] / 2 = [10.0 - 0.0] / 2 = +5.0."
      ],
      "resultInterpretation": "Efek interaksi 3-faktor ABC adalah +5.0. Secara visual, pada konsentrasi garam rendah (C-), faktor tekanan dan suhu beroperasi independen (garis paralel). Namun pada konsentrasi garam tinggi (C+), tekanan dan suhu menghasilkan interaksi sinergis masif (garis membuka tajam). Pola interaksi dua faktor berubah drastis akibat faktor ketiga."
    },
    "pythonImplementation": {
      "description": "Generasi data faktorial 2^3 dan visualisasi interaksi dua arah melintasi level faktor ketiga.",
      "libraryDependencies": [
        "numpy",
        "pandas"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\n# Data respon 2^3\ny_dict = {\n    '(1)': 40, 'a': 50, 'b': 45, 'ab': 55,\n    'c': 35, 'ac': 65, 'bc': 30, 'abc': 80\n}\n\n# Hitung kontras ABC\npos = y_dict['abc'] + y_dict['a'] + y_dict['b'] + y_dict['c']\nneg = y_dict['ab'] + y_dict['ac'] + y_dict['bc'] + y_dict['(1)']\nkontras_abc = pos - neg\nefek_abc = kontras_abc / 4.0\n\n# Evaluasi interaksi AB pada C rendah (-1) vs C tinggi (+1)\nab_c_low = (y_dict['ab'] + y_dict['(1)'] - y_dict['a'] - y_dict['b']) / 2.0\nab_c_high = (y_dict['abc'] + y_dict['c'] - y_dict['ac'] - y_dict['bc']) / 2.0\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Analisis Interaksi Tiga Faktor (ABC)\")\nprint(f\"Kontras ABC              : {kontras_abc:.2f}\")\nprint(f\"Estimasi Efek ABC        : {efek_abc:.2f}\")\nprint(f\"Interaksi AB pada C Low  : {ab_c_low:.2f} (Garis Paralel)\")\nprint(f\"Interaksi AB pada C High : {ab_c_high:.2f} (Garis Divergen Kuat)\")\nprint(f\"Verifikasi: (AB_high - AB_low)/2 = {(ab_c_high - ab_c_low)/2.0:.2f} (Cocok dengan Efek ABC)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Analisis Interaksi Tiga Faktor (ABC)\nKontras ABC              : 20.00\nEstimasi Efek ABC        : 5.00\nInteraksi AB pada C Low  : 0.00 (Garis Paralel)\nInteraksi AB pada C High : 10.00 (Garis Divergen Kuat)\nVerifikasi: (AB_high - AB_low)/2 = 5.00 (Cocok dengan Efek ABC)"
    },
    "commonPitfalls": [
      "Menyimpulkan adanya interaksi 3-faktor tanpa memeriksa plot residual (satu titik outlier tunggal dapat memicu signifikansi semu pada interaksi ABC).",
      "Mengabaikan prinsip hierarki efek dengan mempertahankan interaksi ABC di dalam model namun membuang efek utama A atau B.",
      "Memaksakan interpretasi fisik yang rumit pada interaksi 4-faktor yang sebenarnya hanyalah fluktuasi acak noise."
    ],
    "validationProcedures": [
      "Gunakan plot interaksi dua arah bersyarat (interaction plot by panels) untuk memvalidasi interaksi 3-faktor.",
      "Terapkan aturan hierarki model: jika suku interaksi dipertahankan, seluruh efek pembentuknya wajib dipertahankan.",
      "Periksa apakah ada outlier tunggal yang mendominasi nilai kontras ABC."
    ],
    "exercises": [
      {
        "question": "Apakah indikasi grafis yang paling jelas yang menunjukkan adanya efek interaksi tiga faktor (ABC) yang signifikan?",
        "hint": "Bandingkan plot interaksi dua faktor (A x B) pada level C rendah versus level C tinggi.",
        "answerExplanation": "Interaksi 3-faktor terlihat jelas ketika orientasi atau kemiringan garis pada plot interaksi dua arah (A x B) pada kondisi C rendah berbeda secara substansial (misalnya paralel) dibandingkan pada kondisi C tinggi (misalnya bersilangan atau divergen)."
      }
    ],
    "references": [
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Wu, C. F. J., & Hamada, M. S. (2011). Experiments: Planning, Analysis, and Optimization (2nd ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Analisis Interaksi 3-Faktor dan Plot Interaksi Dua Arah",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.6.3.",
          "Capaian: Menafsirkan interaksi tingkat tinggi (three-factor interaction ABC) secara fisik.",
          "Capaian: Membangun dan membaca Plot Interaksi Dua Arah (Two-Way Interaction Plots).",
          "Capaian: Menerapkan prinsip hierarki efek (Hierarchical Ordering Principle) dalam pemodelan empiris."
        ],
        "keyFormulaOrDiagram": "$$c_{ABC, i} = c_{A, i} \\cdot c_{B, i} \\cdot c_{C, i}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Analisis Interaksi 3-Faktor dan Plot Interaksi Dua Arah",
        "bulletPoints": [
          "Ketika jumlah faktor dalam desain bertambah menjadi k >= 3, peneliti berhadapan dengan kemungkinan munculnya Interaksi Tingka...",
          "Makna Fisis Interaksi 3-Faktor: Interaksi dua faktor (AB) mengukur bagaimana efek faktor A dipengaruhi oleh level faktor B. I...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Prinsip Hierarki Efek (Hierarchical Ordering Principle): Dalam sains eksperimental dan rek..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Prinsip Hierarki Efek (Hierarchical Ordering Principle): Dalam sains eksperimental dan rekayasa fisik, berlaku aturan empiris...",
          "Jika interaksi 3-faktor terbukti signifikan secara statistik, peneliti wajib memeriksa apakah hal tersebut mencerminkan mekan...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Formulasi Kontras Interaksi Tiga Faktor (ABC):",
          "Pada desain $2^3$, kolom tanda untuk interaksi $ABC$ diperoleh dari perkalian tiga kolom:",
          "Kontras $ABC$:"
        ],
        "keyFormulaOrDiagram": "$$c_{ABC, i} = c_{A, i} \\cdot c_{B, i} \\cdot c_{C, i}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada pengujian efisiensi pemisahan membran filtrasi (2^3 desain: A = Tekanan, B = Suhu, C = Konsentrasi Garam), diperoleh data respon: Level...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Hitung Kontras ABC: Kontras ABC = [abc + a + b + c] - [ab + ac + bc + (1)] Suku Positif: abc + a +...",
          "Langkah 2: Hitung Efek ABC (n = 1, k = 3): Efek ABC = Kontras ABC / 4 = 20.0 / 4 = +5.0.",
          "Langkah 3: Hitung interaksi AB pada masing-masing level C: Pada C = -1: Efek AB_(C-) = [ab + (1) - a - b] / 2...",
          "Interpretasi: Efek interaksi 3-faktor ABC adalah +5.0. Secara visual, pada konsentrasi garam rendah (C-), faktor tekanan dan suhu bero..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Hitung selisih interaksi: [Efek AB_(C+) - Efek AB_(C-)] / 2 = [10.0 - 0.0] / 2..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Generasi data faktorial 2^3 dan visualisasi interaksi dua arah melintasi level faktor ketiga.",
          "Dependensi Pustaka: numpy, pandas",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Analisis Interaksi Tiga Faktor (ABC)"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Analisis Interaksi Tiga Faktor (ABC) | Kontras ABC : 20.00 | Est..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menyimpulkan adanya interaksi 3-faktor tanpa memeriksa plot residual (satu titik outlier tunggal dapat memicu...",
          "Perangkap: Mengabaikan prinsip hierarki efek dengan mempertahankan interaksi ABC di dalam model namun membuang efek utama...",
          "Perangkap: Memaksakan interpretasi fisik yang rumit pada interaksi 4-faktor yang sebenarnya hanyalah fluktuasi acak noise..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan plot interaksi dua arah bersyarat (interaction plot by panels) untuk memvalidasi interaksi 3-faktor.",
          "Prosedur: Terapkan aturan hierarki model: jika suku interaksi dipertahankan, seluruh efek pembentuknya wajib dipertahank...",
          "Prosedur: Periksa apakah ada outlier tunggal yang mendominasi nilai kontras ABC."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Apakah indikasi grafis yang paling jelas yang menunjukkan adanya efek interaksi tiga faktor (ABC) yang signifikan?",
          "Petunjuk: Bandingkan plot interaksi dua faktor (A x B) pada level C rendah versus level C tinggi.",
          "Solusi Kunci: Interaksi 3-faktor terlihat jelas ketika orientasi atau kemiringan garis pada plot interaksi dua arah (A x B) pada kondi..."
        ]
      }
    ]
  },
  "4.6.4": {
    "id": "4.6.4",
    "chapterId": "CH-29",
    "title": "Analisis ANOVA untuk Desain Faktorial 2^k dan Model Prediktif Empiris",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Membangun tabel ANOVA lengkap untuk desain faktorial 2^k dengan derajat kebebasan tunggal per efek.",
      "Menerapkan Daniel Half-Normal Probability Plot untuk eksperimen single-replicate tanpa replikasi (n = 1).",
      "Mengkonstruksi persamaan regresi prediktif empiris dalam variabel terkode dan variabel alami."
    ],
    "content": "Setelah seluruh efek utama dan interaksi dalam desain faktorial 2^k dihitung, langkah berikutnya adalah melakukan pengujian signifikansi statistik formal melalui Analisis Varians (ANOVA) dan menyusun model prediktif empiris.\n\nTabel ANOVA Faktorial 2^k:\nPada desain dengan replikasi (n >= 2), setiap efek utama dan interaksi memiliki tepat 1 derajat kebebasan. Jumlah Kuadrat masing-masing efek diuji terhadap varians galat replikasi (MSE) menggunakan statistik uji F.\n\nTantangan Eksperimen Tanpa Replikasi (Unreplicated Factorial, n = 1):\nDalam banyak riset industri berbiaya tinggi, melakukan replikasi penuh desain 2^k tidak memungkinkan secara ekonomi. Pada kondisi n = 1, derajat kebebasan galat adalah nol (df_E = 0), sehingga uji F standar tidak dapat dihitung. Untuk mengatasi kebuntuan ini, Cuthbert Daniel (1959) memperkenalkan Half-Normal Probability Plot (atau Normal Probability Plot). Berdasarkan prinsip sparsity of effects, mayoritas efek dalam eksperimen adalah noise acak yang akan berbaris rapat di sepanjang garis lurus normal di dekat nol. Efek-efek yang menyimpang jauh ke kanan garis lurus adalah efek aktif (active effects) yang signifikan secara fisik. Efek-efek yang tidak aktif kemudian digabungkan (pooled) untuk membentuk estimasi MSE semu.\n\nModel Prediktif Empiris:\nModel regresi akhir hanya mempertahankan suku-suku yang terbukti signifikan secara statistik (dan suku pendukung hierarkisnya). Model ini memungkinkan insinyur memprediksi respon pada setiap titik di dalam ruang operasional dan menentukan titik optimum proses.",
    "mathematicalFoundations": "1. Tabel ANOVA Desain Faktorial $2^k$:\n$$\\text{SST} = \\sum_{j=1}^{2^k - 1} \\text{SS}_j + \\text{SSE}$$\ndi mana untuk setiap efek $j$:\n$$\\text{df}_j = 1, \\quad \\text{MS}_j = \\text{SS}_j$$\n$$F_j = \\frac{\\text{MS}_j}{\\text{MSE}} = \\frac{\\text{SS}_j}{\\text{SSE} / [2^k(n - 1)]} \\sim F_{1, \\, 2^k(n-1)}$$\n\n2. Penggabungan Efek Tidak Aktif (*Pooling*) pada Desain $n = 1$:\nMisalkan setelah inspeksi plot Daniel, dipilih $m$ efek signifikan yang dipertahankan. Sisanya sebanyak $(2^k - 1 - m)$ efek dianggap sebagai noise dan digabungkan menjadi estimasi galat:\n$$\\text{SSE}_{\\text{pooled}} = \\sum_{\\text{efek tidak aktif}} \\text{SS}_j, \\quad \\text{df}_{\\text{pooled}} = 2^k - 1 - m$$\n$$\\text{MSE}_{\\text{pooled}} = \\frac{\\text{SSE}_{\\text{pooled}}}{2^k - 1 - m}$$\nEfek-efek aktif kemudian diuji terhadap $\\text{MSE}_{\\text{pooled}}$ dengan uji $F$.\n\n3. Konversi Model Prediktif Terkode ke Variabel Alami:\nModel terkode:\n$$\\hat{y} = \\beta_0 + \\sum_{j=1}^k \\beta_j x_j + \\sum_{i < j} \\beta_{ij} x_i x_j$$\nSubstitusikan formula dekoding: $x_j = \\frac{\\xi_j - \\xi_{0j}}{\\Delta \\xi_j / 2}$ untuk memperoleh persamaan matematis dalam besaran fisik asli ($\\,^\\circ\\text{C}$, bar, RPM).",
    "workedExample": {
      "problemStatement": "Pada pengujian yield reaksi kimia dengan desain 2^3 tanpa replikasi (n = 1, 8 runs), diperoleh Sum of Squares total SST = 250.0. Dari plot efek Daniel, hanya efek A (SS_A = 160.0) dan interaksi AB (SS_AB = 60.0) yang terbukti aktif. Efek-efek lainnya (B, C, AC, BC, ABC) digabungkan menjadi galat residual. Buat tabel ANOVA teruji dan uji signifikansi faktor A pada alpha = 0.05.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi efek aktif: SS_A = 160.0 (df = 1), SS_AB = 60.0 (df = 1).",
        "Langkah 2: Hitung Jumlah Kuadrat Galat Penggabungan (SSE_pooled):\nSSE_pooled = SST - (SS_A + SS_AB) = 250.0 - (160.0 + 60.0) = 250.0 - 220.0 = 30.0.",
        "Langkah 3: Hitung derajat kebebasan galat gabungan:\ndf_pooled = Total efek (7) - Efek aktif (2) = 5 (yaitu B, C, AC, BC, ABC).",
        "Langkah 4: Hitung MSE_pooled:\nMSE_pooled = 30.0 / 5 = 6.00.",
        "Langkah 5: Hitung uji F untuk Efek A:\nF_A = MS_A / MSE_pooled = 160.0 / 6.00 = 26.67.\nNilai kritis F_(0.05, 1, 5) = 6.608.",
        "Langkah 6: Hitung uji F untuk Interaksi AB:\nF_AB = MS_AB / MSE_pooled = 60.0 / 6.00 = 10.00.\nF_AB (10.00) > 6.61."
      ],
      "resultInterpretation": "Faktor A (F = 26.67, p = 0.0036) dan interaksi AB (F = 10.00, p = 0.025) terbukti signifikan secara statistik pada alpha = 0.05 setelah pooling efek-efek kecil menjadi galat. Model empiris akhir mempertahankan A, B (sebagai efek pendukung hierarkis), dan AB."
    },
    "pythonImplementation": {
      "description": "Analisis ANOVA faktorial 2^k dengan pooling efek tidak aktif dan pembentukan model regresi empiris.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# Data SS dari eksperimen 2^3 (n=1)\nss_efek = {\n    'A': 160.0,\n    'B': 8.0,\n    'C': 4.0,\n    'AB': 60.0,\n    'AC': 6.0,\n    'BC': 7.0,\n    'ABC': 5.0\n}\nsst = sum(ss_efek.values())\n\n# Suku aktif yang dipilih dari plot Daniel\nefek_aktif = ['A', 'AB']\n\n# Hitung SSE dan df pooled\nsse_pooled = sum(ss for nama, ss in ss_efek.items() if nama not in efek_aktif)\ndf_pooled = len(ss_efek) - len(efek_aktif)\nmse_pooled = sse_pooled / df_pooled\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Faktorial 2^3 (Pooled Error)\")\nprint(f\"{'Sumber Efek':<14}{'SS':<10}{'df':<6}{'MS':<12}{'F-Stat':<10}{'p-value':<10}\")\nprint(\"-\" * 62)\nfor nama in efek_aktif:\n    ss_val = ss_efek[nama]\n    f_val = ss_val / mse_pooled\n    p_val = 1.0 - stats.f.cdf(f_val, dfn=1, dfd=df_pooled)\n    print(f\"{nama:<14}{ss_val:<10.1f}{1:<6}{ss_val:<12.2f}{f_val:<10.2f}{p_val:<10.4f}\")\n\nprint(f\"{'Residual (Pool)':<14}{sse_pooled:<10.1f}{df_pooled:<6}{mse_pooled:<12.2f}\")\nprint(f\"{'Total':<14}{sst:<10.1f}{7:<6}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Faktorial 2^3 (Pooled Error)\nSumber Efek   SS        df    MS          F-Stat    p-value   \n--------------------------------------------------------------\nA             160.0     1     160.00      26.67     0.0036    \nAB            60.0      1     60.00       10.00     0.0250    \nResidual (Pool)30.0      5     6.00        \nTotal         250.0     7"
    },
    "commonPitfalls": [
      "Melakukan pooling pada efek yang sebenarnya aktif ke dalam galat residual sehingga menggelembungkan MSE dan memicu Kesalahan Tipe II.",
      "Menyusun model prediktif menggunakan variabel alami secara langsung tanpa normalisasi pengkodean terlebih dahulu.",
      "Mengabaikan pemeriksaan residual model akhir setelah pemilihan efek signifikan selesai."
    ],
    "validationProcedures": [
      "Gunakan Normal/Half-Normal plot efek untuk mengidentifikasi kandidat efek aktif secara objektif pada n = 1.",
      "Pastikan derajat kebebasan galat gabungan (df_pooled) minimal 4 atau 5 untuk keandalan uji F.",
      "Verifikasi R-squared dan Adjusted R-squared dari model prediktif empiris final."
    ],
    "exercises": [
      {
        "question": "Pada eksperimen faktorial 2^k tanpa replikasi (n = 1), metode grafis apakah yang diakui secara luas untuk memisahkan efek aktif nyata dari fluktuasi noise acak?",
        "hint": "Metode ini memplot nilai efek terurut terhadap kuantil distribusi normal atau separuh normal.",
        "answerExplanation": "Half-Normal Probability Plot (Daniel Plot) atau Normal Probability Plot adalah metode standar emas: efek yang tidak aktif akan berderet rapat di sepanjang garis lurus dekat nol, sedangkan efek yang signifikan akan menyimpang nyata keluar dari garis tersebut."
      }
    ],
    "references": [
      {
        "citation": "Daniel, C. (1959). Use of half-normal plots in interpreting factorial two-level experiments. Technometrics, 1(4), 311-341.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Analisis ANOVA untuk Desain Faktorial 2^k dan Model Pre...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.6.4.",
          "Capaian: Membangun tabel ANOVA lengkap untuk desain faktorial 2^k dengan derajat kebebasan tunggal per efek.",
          "Capaian: Menerapkan Daniel Half-Normal Probability Plot untuk eksperimen single-replicate tanpa replikasi (n = 1).",
          "Capaian: Mengkonstruksi persamaan regresi prediktif empiris dalam variabel terkode dan variabel alami."
        ],
        "keyFormulaOrDiagram": "$$\\text{SST} = \\sum_{j=1}^{2^k - 1} \\text{SS}_j + \\text{SSE}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Analisis ANOVA untuk Desain Faktorial 2^k dan Model Pre...",
        "bulletPoints": [
          "Setelah seluruh efek utama dan interaksi dalam desain faktorial 2^k dihitung, langkah berikutnya adalah melakukan pengujian s...",
          "Tabel ANOVA Faktorial 2^k: Pada desain dengan replikasi (n >= 2), setiap efek utama dan interaksi memiliki tepat 1 derajat ke...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Tantangan Eksperimen Tanpa Replikasi (Unreplicated Factorial, n = 1): Dalam banyak riset i..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Tantangan Eksperimen Tanpa Replikasi (Unreplicated Factorial, n = 1): Dalam banyak riset industri berbiaya tinggi, melakukan...",
          "Model Prediktif Empiris: Model regresi akhir hanya mempertahankan suku-suku yang terbukti signifikan secara statistik (dan su...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Tabel ANOVA Desain Faktorial $2^k$:",
          "di mana untuk setiap efek $j$:",
          "2. Penggabungan Efek Tidak Aktif (*Pooling*) pada Desain $n = 1$:"
        ],
        "keyFormulaOrDiagram": "$$\\text{SST} = \\sum_{j=1}^{2^k - 1} \\text{SS}_j + \\text{SSE}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada pengujian yield reaksi kimia dengan desain 2^3 tanpa replikasi (n = 1, 8 runs), diperoleh Sum of Squares total SST = 250.0. Dari plot e...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi efek aktif: SS_A = 160.0 (df = 1), SS_AB = 60.0 (df = 1).",
          "Langkah 2: Hitung Jumlah Kuadrat Galat Penggabungan (SSE_pooled): SSE_pooled = SST - (SS_A + SS_AB) = 250.0 -...",
          "Langkah 3: Hitung derajat kebebasan galat gabungan: df_pooled = Total efek (7) - Efek aktif (2) = 5 (yaitu B,...",
          "Interpretasi: Faktor A (F = 26.67, p = 0.0036) dan interaksi AB (F = 10.00, p = 0.025) terbukti signifikan secara statistik pada alpha..."
        ],
        "keyFormulaOrDiagram": "Langkah 6: Hitung uji F untuk Interaksi AB: F_AB = MS_AB / MSE_pooled = 60.0 / 6.00 = 10.0..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Analisis ANOVA faktorial 2^k dengan pooling efek tidak aktif dan pembentukan model regresi empiris.",
          "Dependensi Pustaka: numpy, scipy.stats",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Tabel ANOVA Faktorial 2^3 (Pooled Error)"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Faktorial 2^3 (Pooled Error) | Sumber Efek SS df MS..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Melakukan pooling pada efek yang sebenarnya aktif ke dalam galat residual sehingga menggelembungkan MSE dan me...",
          "Perangkap: Menyusun model prediktif menggunakan variabel alami secara langsung tanpa normalisasi pengkodean terlebih dahu...",
          "Perangkap: Mengabaikan pemeriksaan residual model akhir setelah pemilihan efek signifikan selesai."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan Normal/Half-Normal plot efek untuk mengidentifikasi kandidat efek aktif secara objektif pada n = 1.",
          "Prosedur: Pastikan derajat kebebasan galat gabungan (df_pooled) minimal 4 atau 5 untuk keandalan uji F.",
          "Prosedur: Verifikasi R-squared dan Adjusted R-squared dari model prediktif empiris final."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Pada eksperimen faktorial 2^k tanpa replikasi (n = 1), metode grafis apakah yang diakui secara luas untuk memisahkan efe...",
          "Petunjuk: Metode ini memplot nilai efek terurut terhadap kuantil distribusi normal atau separuh normal.",
          "Solusi Kunci: Half-Normal Probability Plot (Daniel Plot) atau Normal Probability Plot adalah metode standar emas: efek yang tidak akti..."
        ]
      }
    ]
  }
};
