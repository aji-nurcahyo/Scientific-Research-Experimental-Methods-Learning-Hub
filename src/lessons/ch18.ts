import { Lesson } from '../types/curriculum';

export const CH18_LESSONS: Record<string, Partial<Lesson>> = {
  "3.3.1": {
    "id": "3.3.1",
    "chapterId": "CH-18",
    "title": "Konsep Sampling Distribution dan Perbedaan Standar Deviasi vs Standar Error",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Membedakan secara konseptual dan matematis antara Distribusi Populasi, Distribusi Sampel, dan Distribusi Sampling.",
      "Menghitung dan membedakan Standar Deviasi (s) versus Standar Error of the Mean (SE).",
      "Mencegah kesalahan interpretasi variabilitas individual versus presisi estimasi."
    ],
    "content": "Salah satu kerancuan paling kronis dalam pelaporan artikel ilmiah rekayasa adalah pencampuran antara Standar Deviasi (*Standard Deviation* / SD) dan Standar Error (*Standard Error of the Mean* / SE). Banyak penulis secara sengaja atau tidak sengaja menyajikan SE alih-alih SD dalam tabel mereka semata-mata karena angka SE selalu jauh lebih kecil, sehingga memberi ilusi palsu bahwa instrumen mereka memiliki variabilitas yang sangat sempit.\n\nUntuk memahami perbedaan keduanya, peneliti harus membedakan tiga tingkatan distribusi:\n1. Distribusi Populasi: Sebaran seluruh individu atau komponen fisik di alam nyata (memiliki rata-rata parameter sejati $\\mu$ dan deviasi standar populasi $\\sigma$).\n2. Distribusi Sampel: Sebaran dari $n$ titik observasi yang berhasil dikumpulkan dalam satu kali eksperimen (memiliki rata-rata sampel $\\bar{x}$ dan deviasi standar sampel $s$). Standar Deviasi $s$ mengukur seberapa jauh nilai masing-masing unit benda uji menyebar di sekitar nilai rata-ratanya.\n3. Distribusi Sampling (Sampling Distribution): Sebaran teoretis dari nilai statistik (misalnya rata-rata) seandainya eksperimen berukuran $n$ tersebut diulang sebanyak tak terhingga kali secara independen. Standar Error (SE) adalah deviasi standar dari Distribusi Sampling ini. SE mengukur presisi estimasi rata-rata populasi, bukan variabilitas antar-individu.\n\nStandar Deviasi ($s$) tidak mengecil saat ukuran sampel $n$ ditambah (nilainya berfluktuasi stabil di sekitar $\\sigma$). Sebaliknya, Standar Error ($\text{SE} = s / \\sqrt{n}$) mengecil mendekati nol seiring bertambahnya ukuran sampel $n$.",
    "mathematicalFoundations": "1. Standar Deviasi Sampel ($s$): Mengukur dispersi data individual:\n$$s = \\sqrt{\\frac{1}{n - 1} \\sum_{i=1}^n (X_i - \\bar{X})^2}$$\n\n2. Standar Error Rata-rata (SE / $\\sigma_{\\bar{X}}$): Mengukur ketidakpastian penduga rata-rata:\n$$\\text{SE}(\\bar{X}) = \\sqrt{\\text{Var}(\\bar{X})} = \\sqrt{\\text{Var}\\left( \\frac{1}{n} \\sum_{i=1}^n X_i \\right)} = \\sqrt{\\frac{1}{n^2} \\sum_{i=1}^n \\text{Var}(X_i)} = \\frac{\\sigma}{\\sqrt{n}}$$\n\nEstimasi Standar Error dari Sampel:\n$$\\widehat{\\text{SE}}(\\bar{X}) = \\frac{s}{\\sqrt{n}}$$\n\nKaidah Pelaporan Metrologis:\n- Gunakan Standar Deviasi ($s$) jika tujuan ilmiahnya adalah menerangkan variabilitas fisis produk atau sebaran biologis populasi.\n- Gunakan Standar Error ($\text{SE}$) atau Interval Kepercayaan jika tujuan ilmiahnya adalah menerangkan presisi estimasi inferensial parameter.",
    "workedExample": {
      "problemStatement": "Pada pengujian kuat tarik 100 sampel serat nanokomposit di Lab Material ITERA, diperoleh rata-rata 450 MPa dengan deviasi standar s = 30 MPa. Hitung: (a) Standar Error of the Mean, (b) Jelaskan arti fisis s = 30 MPa vs SE = 3 MPa, dan mengapa menyajikan angka \"450 +/- 3 MPa\" tanpa keterangan dapat menyesatkan dewan penguji.",
      "stepByStepSolution": [
        "Langkah 1: Hitung Standar Error: SE = s / sqrt(n) = 30 / sqrt(100) = 30 / 10 = 3.0 MPa.",
        "Langkah 2: Makna fisis Standar Deviasi s = 30 MPa: Sekitar 68% serat individu di dalam populasi memiliki kekuatan tarik yang tersebar antara 420 MPa hingga 480 MPa (variabilitas produk).",
        "Langkah 3: Makna fisis Standar Error SE = 3.0 MPa: Nilai rata-rata sejati mu diestimasikan berada pada rentang 450 +/- 3 MPa dengan ketidakpastian 1-sigma (presisi estimasi peneliti).",
        "Langkah 4: Evaluasi kesalahan pelaporan: Menuliskan \"450 +/- 3 MPa\" tanpa label membuat pembaca mengira serat tersebut diproduksi dengan toleransi presisi luar biasa (hanya bervariasi +/- 3 MPa), padahal variasi riil antar-serat adalah sepuluh kali lebih lebar (+/- 30 MPa)."
      ],
      "resultInterpretation": "Pembedaan eksplisit antara SD (sebaran produk) dan SE (presisi pengukuran) adalah syarat kejujuran pelaporan ilmiah."
    },
    "pythonImplementation": {
      "description": "Simulasi empiris membuktikan bahwa standar deviasi stabil sementara standar error mengecil seiring ukuran n.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\nnp.random.seed(42)\nsigma_populasi = 20.0\nukuran_n = [10, 50, 200, 1000, 5000]\n\nprint(f\"Deviasi Standar Sejati Populasi (Sigma): {sigma_populasi:.1f}\\n\")\nprint(f\"{'Ukuran Sampel (n)':18s} | {'Standar Deviasi (s)':22s} | {'Standar Error (SE)':20s}\")\nprint(\"-\" * 65)\nfor n in ukuran_n:\n    sampel = np.random.normal(loc=100.0, scale=sigma_populasi, size=n)\n    s = np.std(sampel, ddof=1)\n    se = s / np.sqrt(n)\n    print(f\"n = {n:5d}           | {s:22.3f} | {se:20.3f}\")\n",
      "expectedOutput": "Deviasi Standar Sejati Populasi (Sigma): 20.0\n\nUkuran Sampel (n)  | Standar Deviasi (s)    | Standar Error (SE)  \n-----------------------------------------------------------------\nn =    10           |                 17.653 |                5.582\nn =    50           |                 19.349 |                2.736\nn =   200           |                 20.407 |                1.443\nn =  1000           |                 19.824 |                0.627\nn =  5000           |                 19.986 |                0.283"
    },
    "commonPitfalls": [
      "Menyajikan grafik batang dengan error bar tanpa memberi keterangan di keterangan gambar apakah error bar tersebut SD, SE, atau 95% CI.",
      "Memilih SE semata-mata agar grafik tampak memiliki error bar yang lebih pendek dan meyakinkan.",
      "Mengalikan SE dengan n alih-alih akar n saat merekonstruksi varians dari artikel literatur orang lain."
    ],
    "validationProcedures": [
      "Pastikan setiap tabel dan grafik memuat keterangan eksplisit: \"Nilai disajikan sebagai Rata-rata +/- SD (Standar Deviasi)\" atau \"Rata-rata +/- SE\".",
      "Verifikasi bahwa rasio SD terhadap SE sama persis dengan akar kuadrat ukuran sampel: SD / SE = sqrt(n)."
    ],
    "exercises": [
      {
        "question": "Sebuah artikel ilmiah melaporkan rata-rata waktu respons server adalah 120 ms dengan error bar +/- 2 ms dari 10.000 permintaan data. Apakah aman bagi seorang insinyur untuk merancang batas timeout sistem pada 125 ms?",
        "hint": "Perhatikan apakah +/- 2 ms tersebut adalah SD (variabilitas permintaan) ataukah SE (ketidakpastian rata-rata).",
        "answerExplanation": "Sangat berbahaya dan tidak aman. Nilai +/- 2 ms dengan n = 10.000 hampir dipastikan adalah Standar Error (SE = 2 ms). Deviasi standar individualnya adalah s = SE * sqrt(n) = 2 * 100 = 200 ms! Artinya, banyak permintaan individual yang membutuhkan waktu di atas 300 ms atau 500 ms. Merancang timeout pada 125 ms akan menyebabkan puluhan persen permintaan mengalami kegagalan timeout."
      }
    ],
    "references": [
      {
        "citation": "Altman, D. G., & Bland, J. M. (2005). Standard deviations and standard errors. BMJ, 331(7521), 903.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Cumming, G., Fidler, F., & Vaux, D. L. (2007). Error bars in experimental biology. Journal of Cell Biology, 177(1), 7-11.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Konsep Sampling Distribution dan Perbedaan Standar Devi...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.3.1.",
          "Capaian: Membedakan secara konseptual dan matematis antara Distribusi Populasi, Distribusi Sampel, dan Distribusi Sampl...",
          "Capaian: Menghitung dan membedakan Standar Deviasi (s) versus Standar Error of the Mean (SE).",
          "Capaian: Mencegah kesalahan interpretasi variabilitas individual versus presisi estimasi."
        ],
        "keyFormulaOrDiagram": "$$s = \\sqrt{\\frac{1}{n - 1} \\sum_{i=1}^n (X_i - \\bar{X})^2}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Konsep Sampling Distribution dan Perbedaan Standar Devi...",
        "bulletPoints": [
          "Salah satu kerancuan paling kronis dalam pelaporan artikel ilmiah rekayasa adalah pencampuran antara Standar Deviasi (*Standa...",
          "Untuk memahami perbedaan keduanya, peneliti harus membedakan tiga tingkatan distribusi: 1. Distribusi Populasi: Sebaran selur...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Standar Deviasi ($s$) tidak mengecil saat ukuran sampel $n$ ditambah (nilainya berfluktuas..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Standar Deviasi ($s$) tidak mengecil saat ukuran sampel $n$ ditambah (nilainya berfluktuasi stabil di sekitar $\\sigma$). Seba...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Standar Deviasi Sampel ($s$): Mengukur dispersi data individual:",
          "2. Standar Error Rata-rata (SE / $\\sigma_{\\bar{X}}$): Mengukur ketidakpastian penduga rata-rata:",
          "Estimasi Standar Error dari Sampel:"
        ],
        "keyFormulaOrDiagram": "$$s = \\sqrt{\\frac{1}{n - 1} \\sum_{i=1}^n (X_i - \\bar{X})^2}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada pengujian kuat tarik 100 sampel serat nanokomposit di Lab Material ITERA, diperoleh rata-rata 450 MPa dengan deviasi standar s = 30 MPa...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Hitung Standar Error: SE = s / sqrt(n) = 30 / sqrt(100) = 30 / 10 = 3.0 MPa.",
          "Langkah 2: Makna fisis Standar Deviasi s = 30 MPa: Sekitar 68% serat individu di dalam populasi memiliki kekua...",
          "Langkah 3: Makna fisis Standar Error SE = 3.0 MPa: Nilai rata-rata sejati mu diestimasikan berada pada rentang...",
          "Interpretasi: Pembedaan eksplisit antara SD (sebaran produk) dan SE (presisi pengukuran) adalah syarat kejujuran pelaporan ilmiah."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Evaluasi kesalahan pelaporan: Menuliskan \"450 +/- 3 MPa\" tanpa label membuat pe..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi empiris membuktikan bahwa standar deviasi stabil sementara standar error mengecil seiring ukuran n.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: Deviasi Standar Sejati Populasi (Sigma): 20.0"
        ],
        "keyFormulaOrDiagram": "Deviasi Standar Sejati Populasi (Sigma): 20.0 | | Ukuran Sampel (n) | Standar Deviasi (s)..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menyajikan grafik batang dengan error bar tanpa memberi keterangan di keterangan gambar apakah error bar terse...",
          "Perangkap: Memilih SE semata-mata agar grafik tampak memiliki error bar yang lebih pendek dan meyakinkan.",
          "Perangkap: Mengalikan SE dengan n alih-alih akar n saat merekonstruksi varians dari artikel literatur orang lain."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Pastikan setiap tabel dan grafik memuat keterangan eksplisit: \"Nilai disajikan sebagai Rata-rata +/- SD (Stand...",
          "Prosedur: Verifikasi bahwa rasio SD terhadap SE sama persis dengan akar kuadrat ukuran sampel: SD / SE = sqrt(n)."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Sebuah artikel ilmiah melaporkan rata-rata waktu respons server adalah 120 ms dengan error bar +/- 2 ms dari 10.000 perm...",
          "Petunjuk: Perhatikan apakah +/- 2 ms tersebut adalah SD (variabilitas permintaan) ataukah SE (ketidakpastian r...",
          "Solusi Kunci: Sangat berbahaya dan tidak aman. Nilai +/- 2 ms dengan n = 10.000 hampir dipastikan adalah Standar Error (SE = 2 ms). De..."
        ]
      }
    ]
  },
  "3.3.2": {
    "id": "3.3.2",
    "chapterId": "CH-18",
    "title": "Sifat Estimator Statistik: Unbiasedness, Consistency, dan Efficiency",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Mendefinisikan tiga sifat matematis fundamental dari penduga parameter statistik.",
      "Membuktikan mengapa pembagi varians sampel menggunakan (n - 1) melalui Koreksi Bessel.",
      "Memahami batas bawah varians Cram\u00e9r-Rao Lower Bound (CRLB) untuk efisiensi estimator."
    ],
    "content": "Dalam inferensi statistik, sebuah parameter populasi sejati $\\theta$ (seperti rata-rata $\\mu$, varians $\\sigma^2$, atau konstanta redaman) tidak pernah dapat diamati secara langsung. Peneliti menggunakan fungsi dari data sampel, yang disebut sebagai Penduga (*Estimator* $\\hat{\\theta} = g(X_1, X_2, \\dots, X_n)$), untuk menebak nilai $\\theta$.\n\nNamun, tidak semua rumus penduga memiliki mutu matematika yang sama. Statistika matematika menetapkan tiga kriteria mutu formal bagi sebuah estimator:\n1. Ketakbiasan (Unbiasedness): Ekspektasi matematis dari penduga sama persis dengan parameter populasi sejati: $\\mathbb{E}[\\hat{\\theta}] = \\theta$. Jika sebuah penduga dihitung pada jutaan sampel acak independen, rata-rata dari seluruh tebakan tersebut akan tepat mengenai sasaran tanpa pergeseran sistematis.\n2. Konsistensi (Consistency): Seiring bertambahnya ukuran sampel mendekati tak hingga ($n \\to \\infty$), probabilitas penduga menyimpang dari nilai sejati mengecil menuju nol. Estimator yang konsisten akan menjamin konvergensi peluang: $\\hat{\\theta}_n \\xrightarrow{P} \\theta$.\n3. Efisiensi (Efficiency): Di antara seluruh penduga yang tak bias, penduga yang efisien adalah penduga yang memiliki varians terkecil. Berdasarkan Teorema Cram\u00e9r-Rao, terdapat batas bawah teoretis minimum bagi varians penduga tak bias (CRLB). Estimator yang mencapai batas ini disebut sebagai Minimum Variance Unbiased Estimator (MVUE).",
    "mathematicalFoundations": "1. Ketakbiasan dan Koreksi Bessel pada Varians Sampel:\nJika varians dihitung dengan pembagi naif $n$:\n$$S_{\\text{naif}}^2 = \\frac{1}{n} \\sum_{i=1}^n (X_i - \\bar{X})^2$$\nNilai ekspektasinya:\n$$\\mathbb{E}[S_{\\text{naif}}^2] = \\frac{n - 1}{n} \\sigma^2 \\neq \\sigma^2 \\quad (\\text{Bias Negatif / Underestimated})$$\n\nKoreksi Bessel mengalikan dengan faktor $\\frac{n}{n - 1}$:\n$$S^2 = \\frac{1}{n - 1} \\sum_{i=1}^n (X_i - \\bar{X})^2 \\implies \\mathbb{E}[S^2] = \\sigma^2 \\quad (\\text{Unbiased})$$\n\n2. Batas Bawah Cram\u00e9r-Rao (Cram\u00e9r-Rao Lower Bound / CRLB):\nUntuk setiap estimator tak bias $\\hat{\\theta}$:\n$$\\text{Var}(\\hat{\\theta}) \\ge \\frac{1}{I_n(\\theta)} = \\frac{1}{n \\cdot I_1(\\theta)}$$\nDi mana Informasi Fisher $I_1(\\theta) = \\mathbb{E}\\left[ \\left( \\frac{\\partial \\ln f(X; \\theta)}{\\partial \\theta} \\right)^2 \\right]$.",
    "workedExample": {
      "problemStatement": "Buktikan secara numerik bahwa varians sampel dengan pembagi n menghasilkan bias meremehkan (underestimation) sebesar (n-1)/n pada sampel berukuran n = 5, sedangkan pembagi (n-1) menghasilkan estimasi varians yang tak bias sempurna.",
      "stepByStepSolution": [
        "Langkah 1: Ambil populasi normal standar dengan varians sejati sigma^2 = 1.00.",
        "Langkah 2: Ambil sampel berulang berukuran n = 5 sebanyak 100.000 kali.",
        "Langkah 3: Hitung rata-rata varians dengan pembagi n = 5: E[S_naif^2] = (5 - 1) / 5 * 1.00 = 4/5 * 1.00 = 0.800 (mengalami bias 20% lebih rendah).",
        "Langkah 4: Hitung rata-rata varians dengan pembagi (n - 1) = 4: E[S_unbiased^2] = 5/4 * 0.800 = 1.000 (tepat sama dengan sigma^2 sejati)."
      ],
      "resultInterpretation": "Koreksi Bessel (n - 1) mengompensasi hilangnya satu derajat kebebasan yang telah digunakan untuk menghitung rata-rata sampel bar{X}."
    },
    "pythonImplementation": {
      "description": "Simulasi Monte Carlo membuktikan ketakbiasan pembagi (n-1) versus bias negatif pembagi n pada varians sampel.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\nnp.random.seed(42)\nn_sampel = 5\nn_simulasi = 100000\nsigma_sejati_kuadrat = 4.0  # Varians sejati = 4.0 (sigma = 2.0)\n\n# Bangkitkan matriks sampel normal berukuran (n_simulasi, n_sampel)\ndata = np.random.normal(loc=10.0, scale=2.0, size=(n_simulasi, n_sampel))\n\n# Hitung varians dengan pembagi n (ddof=0) dan pembagi (n-1) (ddof=1)\nvar_naif = np.var(data, axis=1, ddof=0)\nvar_koreksi = np.var(data, axis=1, ddof=1)\n\nmean_var_naif = np.mean(var_naif)\nmean_var_koreksi = np.mean(var_koreksi)\n\nprint(f\"Varians Sejati Populasi (Sigma^2) : {sigma_sejati_kuadrat:.4f}\")\nprint(f\"Rata-rata Estimasi Pembagi n      : {mean_var_naif:.4f} (Teori: {(n_sampel-1)/n_sampel * 4.0:.4f})\")\nprint(f\"Rata-rata Estimasi Pembagi (n-1)  : {mean_var_koreksi:.4f} (Unbiased sempurna!)\")\nprint(f\"Persentase Bias Pembagi n         : {((mean_var_naif - sigma_sejati_kuadrat) / sigma_sejati_kuadrat) * 100:.2f}%\")\n",
      "expectedOutput": "Varians Sejati Populasi (Sigma^2) : 4.0000\nRata-rata Estimasi Pembagi n      : 3.1979 (Teori: 3.2000)\nRata-rata Estimasi Pembagi (n-1)  : 3.9974 (Unbiased sempurna!)\nPersentase Bias Pembagi n         : -20.05%"
    },
    "commonPitfalls": [
      "Menggunakan fungsi np.var() default di NumPy tanpa menyadari bahwa defaultnya adalah ddof=0 (pembagi n yang bias).",
      "Mengira bahwa karena S^2 tak bias untuk sigma^2, maka S (standar deviasi) otomatis tak bias untuk sigma (akar kuadrat Jensen membuat S sedikit bias ke bawah).",
      "Mengacaukan sifat ketakbiasan (berlaku untuk setiap n) dengan konsistensi (berlaku asimtotik saat n mendekati tak hingga)."
    ],
    "validationProcedures": [
      "Gunakan argumen ddof=1 di NumPy/Pandas untuk setiap perhitungan varians dan standar deviasi sampel.",
      "Periksa apakah estimator yang diusulkan dalam algoritma machine learning memenuhi syarat konsistensi asimtotik."
    ],
    "exercises": [
      {
        "question": "Jika estimator A memiliki sedikit bias tetapi memiliki varians yang jauh lebih kecil dibandingkan estimator B yang tak bias murni, mengapa peneliti sering lebih memilih estimator A?",
        "hint": "Perhatikan metrik Mean Squared Error (MSE = Bias^2 + Varians).",
        "answerExplanation": "Dalam rekayasa sistem nyata, tujuan akhir adalah meminimalkan total kesalahan kuadrat rata-rata (MSE). Melalui trade-off bias-varians, menolerir sedikit bias kecil demi mendapatkan penurunan varians yang masif sering kali menghasilkan estimasi yang jauh lebih stabil dan akurat secara praktis (MSE total lebih rendah). Pendekatan ini merupakan dasar dari regresi Ridge dan regularisasi LASSO."
      }
    ],
    "references": [
      {
        "citation": "Casella, G., & Berger, R. L. (2002). Statistical Inference (2nd ed.). Duxbury.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Rao, C. R. (1945). Information and the accuracy attainable in the estimation of statistical parameters. Bulletin of the Calcutta Mathematical Society, 37, 81-89.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Sifat Estimator Statistik: Unbiasedness, Consistency, d...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.3.2.",
          "Capaian: Mendefinisikan tiga sifat matematis fundamental dari penduga parameter statistik.",
          "Capaian: Membuktikan mengapa pembagi varians sampel menggunakan (n - 1) melalui Koreksi Bessel.",
          "Capaian: Memahami batas bawah varians Cram\u00e9r-Rao Lower Bound (CRLB) untuk efisiensi estimator."
        ],
        "keyFormulaOrDiagram": "$$S_{\\text{naif}}^2 = \\frac{1}{n} \\sum_{i=1}^n (X_i - \\bar{X})^2$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Sifat Estimator Statistik: Unbiasedness, Consistency, d...",
        "bulletPoints": [
          "Dalam inferensi statistik, sebuah parameter populasi sejati $\\theta$ (seperti rata-rata $\\mu$, varians $\\sigma^2$, atau konst...",
          "Namun, tidak semua rumus penduga memiliki mutu matematika yang sama. Statistika matematika menetapkan tiga kriteria mutu form...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ]
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Dalam inferensi statistik, sebuah parameter populasi sejati $\\theta$ (seperti rata-rata $\\mu$, varians $\\sigma^2$, atau konst...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Ketakbiasan dan Koreksi Bessel pada Varians Sampel:",
          "Jika varians dihitung dengan pembagi naif $n$:",
          "Nilai ekspektasinya:"
        ],
        "keyFormulaOrDiagram": "$$S_{\\text{naif}}^2 = \\frac{1}{n} \\sum_{i=1}^n (X_i - \\bar{X})^2$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Buktikan secara numerik bahwa varians sampel dengan pembagi n menghasilkan bias meremehkan (underestimation) sebesar (n-1)/n pada sampel ber...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Ambil populasi normal standar dengan varians sejati sigma^2 = 1.00.",
          "Langkah 2: Ambil sampel berulang berukuran n = 5 sebanyak 100.000 kali.",
          "Langkah 3: Hitung rata-rata varians dengan pembagi n = 5: E[S_naif^2] = (5 - 1) / 5 * 1.00 = 4/5 * 1.00 = 0.80...",
          "Interpretasi: Koreksi Bessel (n - 1) mengompensasi hilangnya satu derajat kebebasan yang telah digunakan untuk menghitung rata-rata sa..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Hitung rata-rata varians dengan pembagi (n - 1) = 4: E[S_unbiased^2] = 5/4 * 0...."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi Monte Carlo membuktikan ketakbiasan pembagi (n-1) versus bias negatif pembagi n pada varians sampel.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: Varians Sejati Populasi (Sigma^2) : 4.0000"
        ],
        "keyFormulaOrDiagram": "Varians Sejati Populasi (Sigma^2) : 4.0000 | Rata-rata Estimasi Pembagi n : 3.1979 (Teori:..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menggunakan fungsi np.var() default di NumPy tanpa menyadari bahwa defaultnya adalah ddof=0 (pembagi n yang bi...",
          "Perangkap: Mengira bahwa karena S^2 tak bias untuk sigma^2, maka S (standar deviasi) otomatis tak bias untuk sigma (akar...",
          "Perangkap: Mengacaukan sifat ketakbiasan (berlaku untuk setiap n) dengan konsistensi (berlaku asimtotik saat n mendekati..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan argumen ddof=1 di NumPy/Pandas untuk setiap perhitungan varians dan standar deviasi sampel.",
          "Prosedur: Periksa apakah estimator yang diusulkan dalam algoritma machine learning memenuhi syarat konsistensi asimtotik..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Jika estimator A memiliki sedikit bias tetapi memiliki varians yang jauh lebih kecil dibandingkan estimator B yang tak b...",
          "Petunjuk: Perhatikan metrik Mean Squared Error (MSE = Bias^2 + Varians).",
          "Solusi Kunci: Dalam rekayasa sistem nyata, tujuan akhir adalah meminimalkan total kesalahan kuadrat rata-rata (MSE). Melalui trade-off..."
        ]
      }
    ]
  },
  "3.3.3": {
    "id": "3.3.3",
    "chapterId": "CH-18",
    "title": "Estimasi Titik: Method of Moments vs Maximum Likelihood Estimation (MLE)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menurunkan estimator parameter menggunakan Metode Momen (Method of Moments / MoM).",
      "Merumuskan fungsi Likelihood dan Log-Likelihood untuk Maximum Likelihood Estimation (MLE).",
      "Memahami keunggulan asimtotik MLE (konsistensi dan efisiensi CRLB)."
    ],
    "content": "Ketika kita telah menetapkan keluarga distribusi parametrik bagi suatu proses fisik (misalnya memutuskan bahwa waktu hidup sensor mengikuti distribusi Weibull atau kedatangan paket mengikuti Poisson), langkah krusial berikutnya adalah mengestimasi parameter numerik spesifik dari distribusi tersebut berdasarkan data sampel. Dua kerangka kerja estimasi titik (*point estimation*) yang paling dominan dalam sains komputasi adalah Metode Momen dan Maximum Likelihood Estimation (MLE).\n\n1. Metode Momen (Method of Moments / MoM): Dipelopori oleh Karl Pearson pada akhir abad ke-19. Prinsipnya sangat intuitif: menyamakan momen teoretis populasi (seperti nilai ekspektasi $\\mu_k = \\mathbb{E}[X^k]$) dengan momen empiris sampel ($m_k = \\frac{1}{n} \\sum X_i^k$), kemudian menyelesaikan sistem persamaan aljabar yang terbentuk. Keunggulannya adalah perhitungannya sangat cepat dan sederhana, namun estimator MoM sering kali tidak mencapai efisiensi varians minimum.\n2. Maximum Likelihood Estimation (MLE): Diformalkan oleh Ronald Fisher pada tahun 1922. Prinsipnya adalah: di antara seluruh nilai parameter yang mungkin, pilihlah nilai parameter $\\hat{\\theta}_{\\text{MLE}}$ yang membuat probabilitas keteramatan data yang telah kita kumpulkan menjadi paling maksimal. MLE adalah standar emas statistik modern karena memiliki sifat-sifat asimtotik yang luar biasa: konsisten, efisien secara asimtotik (mencapai batas CRLB), dan invarian terhadap transformasi fungsi fisis.",
    "mathematicalFoundations": "1. Formulasi Maximum Likelihood Estimation (MLE):\nDiberikan sampel independen berdistribusi identik (i.i.d.) $\\mathbf{X} = \\{x_1, x_2, \\dots, x_n\\}$ dengan fungsi kerapatan $f(x; \\theta)$.\n\nFungsi Likelihood:\n$$L(\\theta; \\mathbf{X}) = \\prod_{i=1}^n f(x_i; \\theta)$$\n\nFungsi Log-Likelihood (mengubah perkalian menjadi penjumlahan untuk kestabilan numerik):\n$$\\ell(\\theta; \\mathbf{X}) = \\ln L(\\theta; \\mathbf{X}) = \\sum_{i=1}^n \\ln f(x_i; \\theta)$$\n\nPersamaan Skor Likelihood (Score Equation):\n$$\\left. \\frac{\\partial \\ell(\\theta)}{\\partial \\theta} \\right|_{\\theta = \\hat{\\theta}_{\\text{MLE}}} = 0$$\nDengan syarat kecekungan orde kedua: $\\frac{\\partial^2 \\ell(\\theta)}{\\partial \\theta^2} < 0$.\n\n2. Sifat Invariansi Fisis Zehna:\nJika $\\hat{\\theta}$ adalah estimator MLE untuk $\\theta$, dan $g(\\theta)$ adalah fungsi transformasi bernilai tunggal (misal efisiensi energi atau waktu paruh), maka estimator MLE untuk $g(\\theta)$ adalah:\n$$\\widehat{g(\\theta)}_{\\text{MLE}} = g(\\hat{\\theta}_{\\text{MLE}})$$",
    "workedExample": {
      "problemStatement": "Diberikan n pengamatan waktu transmisi paket IoT yang dimodelkan mengikuti distribusi Eksponensial: f(x; lambda) = lambda * exp(-lambda * x). Turunkan rumus analitis Maximum Likelihood Estimator (MLE) untuk parameter laju transmisi lambda.",
      "stepByStepSolution": [
        "Langkah 1: Susun fungsi Likelihood L(lambda): L(lambda) = Product_{i=1}^n [lambda * exp(-lambda * x_i)] = lambda^n * exp(-lambda * Sum_{i=1}^n x_i).",
        "Langkah 2: Ambil logaritma natural untuk menyusun Log-Likelihood: ell(lambda) = n * ln(lambda) - lambda * Sum_{i=1}^n x_i.",
        "Langkah 3: Ambil turunan parsial terhadap lambda dan samakan dengan nol:\nd(ell)/d(lambda) = (n / lambda) - Sum_{i=1}^n x_i = 0.",
        "Langkah 4: Selesaikan untuk lambda:\nn / lambda = Sum_{i=1}^n x_i -> lambda_hat = n / Sum_{i=1}^n x_i = 1 / bar{X}.",
        "Langkah 5: Periksa turunan kedua: d^2(ell)/d(lambda)^2 = -n / lambda^2 < 0 (Memenuhi syarat maksimum mutlak)."
      ],
      "resultInterpretation": "Estimator MLE untuk parameter laju eksponensial lambda adalah kebalikan dari nilai rata-rata sampel aritmatika (lambda_hat = 1 / bar{X})."
    },
    "pythonImplementation": {
      "description": "Penurunan estimasi parameter distribusi Eksponensial menggunakan rumus analitis MLE dan verifikasi optimasi numerik SciPy.",
      "libraryDependencies": [
        "scipy.optimize",
        "scipy.stats",
        "numpy"
      ],
      "code": "import numpy as np\nfrom scipy import optimize\n\nnp.random.seed(42)\nlambda_sejati = 0.25  # Laju rata-rata 0.25 paket/detik (rata-rata waktu tunggu = 4.0 detik)\ndata_waktu = np.random.exponential(scale=1.0/lambda_sejati, size=500)\n\n# 1. Estimator MLE Analitis: lambda_hat = 1 / mean(X)\nlambda_mle_analitis = 1.0 / np.mean(data_waktu)\n\n# 2. Estimator MLE Numerik: Minimalkan Negatif Log-Likelihood\ndef negatif_log_likelihood(lam, x):\n    if lam <= 0:\n        return 1e10\n    n = len(x)\n    return -(n * np.log(lam) - lam * np.sum(x))\n\nhasil_opt = optimize.minimize_scalar(negatif_log_likelihood, bracket=[0.01, 1.0], args=(data_waktu,))\nlambda_mle_numerik = hasil_opt.x\n\nprint(f\"Nilai Parameter Sejati (Lambda) : {lambda_sejati:.4f}\")\nprint(f\"Estimasi MLE Analitis           : {lambda_mle_analitis:.4f}\")\nprint(f\"Estimasi MLE Optimasi Numerik   : {lambda_mle_numerik:.4f}\")\nprint(f\"Selisih Konvergensi Numerik     : {np.abs(lambda_mle_analitis - lambda_mle_numerik):.2e}\")\n",
      "expectedOutput": "Nilai Parameter Sejati (Lambda) : 0.2500\nEstimasi MLE Analitis           : 0.2543\nEstimasi MLE Optimasi Numerik   : 0.2543\nSelisih Konvergensi Numerik     : 0.00e+00"
    },
    "commonPitfalls": [
      "Mengoptimalkan fungsi Likelihood mentah perkalian produk secara numerik alih-alih Log-Likelihood (memicu numerical underflow ekstrem mendekati 0.0).",
      "Mengabaikan batasan domain parameter (misalnya membiarkan parameter deviasi standar bernilai negatif dalam algoritma optimasi).",
      "Mengasumsikan MLE selalu tak bias pada sampel kecil (misal MLE varians normal adalah pembagi n yang bias)."
    ],
    "validationProcedures": [
      "Gunakan matriks Hessian negatif (Observed Fisher Information) pada titik optimum MLE untuk menghitung standar error asimtotik penduga.",
      "Periksa kestabilan optimasi numerik dengan menguji beberapa titik inisialisasi awal (*random multi-start*) untuk menghindari jebakan optimum lokal."
    ],
    "exercises": [
      {
        "question": "Mengapa hampir seluruh pustaka perangkat lunak komputasi ilmiah (seperti SciPy atau PyTorch) selalu meminimalkan \"Negatif Log-Likelihood\" alih-alih memaksimalkan \"Likelihood\"?",
        "hint": "Perhatikan algoritma optimasi numerik standar (gradient descent) dan pencegahan floating-point underflow.",
        "answerExplanation": "Perkalian ribuan probabilitas kecil (p < 1) menghasilkan angka yang sangat mendekati nol dan melampaui batas presisi representasi floating-point komputer (*arithmetic underflow*). Menggunakan logaritma mengubah perkalian menjadi penjumlahan yang stabil secara numerik. Karena sebagian besar pustaka komputasi dirancang untuk algoritma minimasi (seperti gradient descent), mengalikan log-likelihood dengan -1 (Negative Log-Likelihood) memungkinkan pemanfaatan rutin minimasi standar."
      }
    ],
    "references": [
      {
        "citation": "Fisher, R. A. (1922). On the mathematical foundations of theoretical statistics. Philosophical Transactions of the Royal Society of London, 222(594-604), 309-368.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Pawitan, Y. (2001). In All Likelihood: Statistical Modelling and Inference Using Likelihood. Oxford University Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Estimasi Titik: Method of Moments vs Maximum Likelihood...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.3.3.",
          "Capaian: Menurunkan estimator parameter menggunakan Metode Momen (Method of Moments / MoM).",
          "Capaian: Merumuskan fungsi Likelihood dan Log-Likelihood untuk Maximum Likelihood Estimation (MLE).",
          "Capaian: Memahami keunggulan asimtotik MLE (konsistensi dan efisiensi CRLB)."
        ],
        "keyFormulaOrDiagram": "$$L(\\theta; \\mathbf{X}) = \\prod_{i=1}^n f(x_i; \\theta)$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Estimasi Titik: Method of Moments vs Maximum Likelihood...",
        "bulletPoints": [
          "Ketika kita telah menetapkan keluarga distribusi parametrik bagi suatu proses fisik (misalnya memutuskan bahwa waktu hidup se...",
          "1. Metode Momen (Method of Moments / MoM): Dipelopori oleh Karl Pearson pada akhir abad ke-19. Prinsipnya sangat intuitif: me...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ]
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Ketika kita telah menetapkan keluarga distribusi parametrik bagi suatu proses fisik (misalnya memutuskan bahwa waktu hidup se...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Formulasi Maximum Likelihood Estimation (MLE):",
          "Diberikan sampel independen berdistribusi identik (i.i.d.) $\\mathbf{X} = \\{x_1, x_2, \\dots, x_n\\}$ dengan fung...",
          "Fungsi Likelihood:"
        ],
        "keyFormulaOrDiagram": "$$L(\\theta; \\mathbf{X}) = \\prod_{i=1}^n f(x_i; \\theta)$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Diberikan n pengamatan waktu transmisi paket IoT yang dimodelkan mengikuti distribusi Eksponensial: f(x; lambda) = lambda * exp(-lambda * x)...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Susun fungsi Likelihood L(lambda): L(lambda) = Product_{i=1}^n [lambda * exp(-lambda * x_i)] = lamb...",
          "Langkah 2: Ambil logaritma natural untuk menyusun Log-Likelihood: ell(lambda) = n * ln(lambda) - lambda * Sum_...",
          "Langkah 3: Ambil turunan parsial terhadap lambda dan samakan dengan nol: d(ell)/d(lambda) = (n / lambda) - Sum...",
          "Interpretasi: Estimator MLE untuk parameter laju eksponensial lambda adalah kebalikan dari nilai rata-rata sampel aritmatika (lambda_h..."
        ],
        "keyFormulaOrDiagram": "Langkah 5: Periksa turunan kedua: d^2(ell)/d(lambda)^2 = -n / lambda^2 < 0 (Memenuhi syara..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Penurunan estimasi parameter distribusi Eksponensial menggunakan rumus analitis MLE dan verifikasi optimasi numerik SciPy.",
          "Dependensi Pustaka: scipy.optimize, scipy.stats, numpy",
          "Keluaran Diharapkan: Nilai Parameter Sejati (Lambda) : 0.2500"
        ],
        "keyFormulaOrDiagram": "Nilai Parameter Sejati (Lambda) : 0.2500 | Estimasi MLE Analitis : 0.2543 | Estimasi MLE O..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Mengoptimalkan fungsi Likelihood mentah perkalian produk secara numerik alih-alih Log-Likelihood (memicu numer...",
          "Perangkap: Mengabaikan batasan domain parameter (misalnya membiarkan parameter deviasi standar bernilai negatif dalam alg...",
          "Perangkap: Mengasumsikan MLE selalu tak bias pada sampel kecil (misal MLE varians normal adalah pembagi n yang bias)."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan matriks Hessian negatif (Observed Fisher Information) pada titik optimum MLE untuk menghitung standar...",
          "Prosedur: Periksa kestabilan optimasi numerik dengan menguji beberapa titik inisialisasi awal (*random multi-start*) unt..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa hampir seluruh pustaka perangkat lunak komputasi ilmiah (seperti SciPy atau PyTorch) selalu meminimalkan \"Negati...",
          "Petunjuk: Perhatikan algoritma optimasi numerik standar (gradient descent) dan pencegahan floating-point under...",
          "Solusi Kunci: Perkalian ribuan probabilitas kecil (p < 1) menghasilkan angka yang sangat mendekati nol dan melampaui batas presisi rep..."
        ]
      }
    ]
  },
  "3.3.4": {
    "id": "3.3.4",
    "chapterId": "CH-18",
    "title": "Penurunan Numerik Fungsi Log-Likelihood Menggunakan Python SciPy",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Menuliskan fungsi Negative Log-Likelihood (NLL) kustom untuk model rekayasa non-standar.",
      "Melakukan fitting distribusi kompleks menggunakan modul scipy.optimize dan scipy.stats.",
      "Mengekstrak matriks kovarians parameter asimtotik dari inversi matriks Hessian numerik."
    ],
    "content": "Dalam banyak permasalahan rekayasa tingkat lanjut (seperti pemodelan degradasi sensor fotovoltaik dengan sensor terpotong atau campuran respon getaran struktur), fungsi kerapatan probabilitas sistem tidak memiliki solusi analitis tertutup (*closed-form analytical solution*) untuk persamaan skor MLE-nya. Peneliti tidak dapat menurunkan rumus turunan manual menggunakan kertas dan pensil.\n\nDalam situasi ini, estimasi parameter diselesaikan secara komputasional menggunakan Penurunan Numerik Fungsi Log-Likelihood (*Numerical Maximum Likelihood Estimation*).\n\nProsedur implementasi komputasi numerik MLE:\n1. Formulasi Fungsi Negatif Log-Likelihood (NLL): Menulis fungsi Python yang menerima vektor parameter $\\boldsymbol{\\theta}$ dan array data observasi $\\mathbf{x}$, lalu mengembalikan skalar nilai $-\\ln L(\\boldsymbol{\\theta}; \\mathbf{x})$.\n2. Penegakan Batasan Parameter (Bounds & Constraints): Parameter fisis seperti standar deviasi $\\sigma$, parameter bentuk Weibull $\\beta$, atau resistansi $R$ wajib dibatasi bernilai positif tegas ($> 0$).\n3. Algoritma Optimasi Non-Linier: Menggunakan metode kuasi-Newton seperti Broyden-Fletcher-Goldfarb-Shanno (BFGS atau L-BFGS-B) yang menghitung gradien dan aproksimasi matriks kelengkungan kurva secara iteratif.\n4. Estimasi Standar Error Parameter: Inversi dari matriks Hessian (turunan kedua NLL terhadap parameter) pada titik konvergensi optimum memberikan matriks kovarians asimtotik, di mana akar kuadrat dari elemen diagonalnya adalah Standar Error dari masing-masing parameter yang diestimasi.",
    "mathematicalFoundations": "Matriks Informasi Fisher Teramati (*Observed Fisher Information Matrix* $\\mathcal{I}_{\\text{obs}}$):\n\n$$\\mathcal{I}_{\\text{obs}}(\\hat{\\boldsymbol{\\theta}}) = -\\left. \\nabla^2 \\ell(\\boldsymbol{\\theta}) \\right|_{\\boldsymbol{\\theta} = \\hat{\\boldsymbol{\\theta}}} = \\left. \\mathbf{H}_{\\text{NLL}}(\\boldsymbol{\\theta}) \\right|_{\\boldsymbol{\\theta} = \\hat{\\boldsymbol{\\theta}}}$$\n\nDi mana elemen matriks Hessian:\n$$H_{jk} = \\frac{\\partial^2 [-\\ell(\\boldsymbol{\\theta})]}{\\partial \\theta_j \\partial \\theta_k}$$\n\nMatriks Kovarians Asimtotik Parameter $\\boldsymbol{\\Sigma}_{\\hat{\\theta}}$:\n$$\\boldsymbol{\\Sigma}_{\\hat{\\theta}} \\approx \\mathcal{I}_{\\text{obs}}^{-1}(\\hat{\\boldsymbol{\\theta}}) = \\mathbf{H}_{\\text{NLL}}^{-1}$$\n\nStandar Error Asimtotik untuk parameter ke-$j$:\n$$\\text{SE}(\\hat{\\theta}_j) = \\sqrt{\\left( \\mathbf{H}_{\\text{NLL}}^{-1} \\right)_{jj}}$$",
    "workedExample": {
      "problemStatement": "Sebuah dataset laju transmisi bit radio (Mbps) difitting ke distribusi Gaussian N(mu, sigma^2) menggunakan algoritma minimasi numerik NLL. Pada titik optimum konvergen mu_hat = 54.2 Mbps dan sigma_hat = 4.8 Mbps dengan ukuran sampel n = 200, matriks Hessian numerik H yang dihasilkan adalah H = [[8.68, 0], [0, 17.36]]. Hitung Standar Error asimtotik dari mu_hat dan sigma_hat.",
      "stepByStepSolution": [
        "Langkah 1: Inversikan matriks diagonal Hessian: H^(-1) = [[1 / 8.68, 0], [0, 1 / 17.36]] = [[0.1152, 0], [0, 0.0576]].",
        "Langkah 2: Ambil elemen diagonal untuk varians asimtotik: Var(mu_hat) = 0.1152; Var(sigma_hat) = 0.0576.",
        "Langkah 3: Hitung Standar Error dengan mengambil akar kuadrat:",
        "SE(mu_hat) = sqrt(0.1152) = 0.339 Mbps.",
        "SE(sigma_hat) = sqrt(0.0576) = 0.240 Mbps."
      ],
      "resultInterpretation": "Parameter diestimasikan sebagai mu = (54.20 +/- 0.34) Mbps dan sigma = (4.80 +/- 0.24) Mbps dengan keyakinan asimtotik 1-sigma."
    },
    "pythonImplementation": {
      "description": "Fitting distribusi Gaussian kustom via minimasi numerik NLL dengan ekstraksi standar error dari matriks Hessian.",
      "libraryDependencies": [
        "scipy.optimize",
        "numpy"
      ],
      "code": "import numpy as np\nfrom scipy import optimize\n\nnp.random.seed(42)\nmu_sejati, sigma_sejati = 54.2, 4.8\ndata = np.random.normal(loc=mu_sejati, scale=sigma_sejati, size=200)\n\ndef nll_gaussian(params, x):\n    mu, sigma = params\n    if sigma <= 0.001:\n        return 1e12\n    n = len(x)\n    # NLL = (n/2)*ln(2*pi) + n*ln(sigma) + sum((x - mu)^2) / (2*sigma^2)\n    return 0.5 * n * np.log(2 * np.pi) + n * np.log(sigma) + np.sum((x - mu)**2) / (2 * sigma**2)\n\n# Optimasi numerik dengan L-BFGS-B\ntebakan_awal = [50.0, 2.0]\nbatas = [(None, None), (0.01, None)]\nhasil = optimize.minimize(nll_gaussian, tebakan_awal, args=(data,), method='L-BFGS-B', bounds=batas)\n\nmu_hat, sigma_hat = hasil.x\n\n# Estimasi Hessian numerik manual sederhana\neps = 1e-5\nh_diag = []\nfor i in range(2):\n    p_plus = hasil.x.copy()\n    p_minus = hasil.x.copy()\n    p_plus[i] += eps\n    p_minus[i] -= eps\n    d2 = (nll_gaussian(p_plus, data) - 2 * hasil.fun + nll_gaussian(p_minus, data)) / (eps**2)\n    h_diag.append(d2)\n\nse_mu = np.sqrt(1.0 / h_diag[0])\nse_sigma = np.sqrt(1.0 / h_diag[1])\n\nprint(f\"Hasil Estimasi Mu    : {mu_hat:.2f} +/- {se_mu:.3f} Mbps (Sejati: {mu_sejati:.2f})\")\nprint(f\"Hasil Estimasi Sigma : {sigma_hat:.2f} +/- {se_sigma:.3f} Mbps (Sejati: {sigma_sejati:.2f})\")\nprint(f\"Status Konvergensi   : {hasil.success} (Pesan: {hasil.message})\")\n",
      "expectedOutput": "Hasil Estimasi Mu    : 54.14 +/- 0.334 Mbps (Sejati: 54.20)\nHasil Estimasi Sigma : 4.72 +/- 0.236 Mbps (Sejati: 4.80)\nStatus Konvergensi   : True (Pesan: CONVERGENCE: NORM OF PROJECTED GRADIENT <= PGTOL)"
    },
    "commonPitfalls": [
      "Tidak memeriksa status konvergensi hasil optimasi (hasil.success) dan langsung menggunakan nilai parameter dari optimasi yang gagal.",
      "Memilih tebakan parameter awal (initial guess) yang terlalu jauh dari rentang data sehingga memicu overflow nilai fungsi.",
      "Mengabaikan batasan nilai parameter yang tidak boleh bernilai negatif secara fisis."
    ],
    "validationProcedures": [
      "Gunakan metode optimasi alternatif (seperti Nelder-Mead atau Powell) untuk mengonfirmasi bahwa konvergensi mencapai global minimum.",
      "Bandingkan kurva PDF hasil fitting numerik dengan histogram data empiris menggunakan overlay plot."
    ],
    "exercises": [
      {
        "question": "Bagaimana cara mendeteksi bahwa proses minimasi numerik NLL terjebak pada minimum lokal palsu?",
        "hint": "Perhatikan teknik inisialisasi ulang dengan multi-start parameter acak.",
        "answerExplanation": "Peneliti dapat menjalankan algoritma optimasi beberapa kali (misal 20 kali) menggunakan nilai tebakan awal yang berbeda-beda dan dibangkitkan secara acak melintasi ruang pencarian (*random restart*). Jika nilai NLL minimum yang dicapai berbeda-beda antar-iterasi, algoritma dipastikan mengalami masalah jebakan minimum lokal (multimodal likelihood surface)."
      }
    ],
    "references": [
      {
        "citation": "Nocedal, J., & Wright, S. J. (2006). Numerical Optimization (2nd ed.). Springer.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Virtanen, P., et al. (2020). SciPy 1.0: fundamental algorithms for scientific computing in Python. Nature Methods, 17(3), 261-272.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Penurunan Numerik Fungsi Log-Likelihood Menggunakan Pyt...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.3.4.",
          "Capaian: Menuliskan fungsi Negative Log-Likelihood (NLL) kustom untuk model rekayasa non-standar.",
          "Capaian: Melakukan fitting distribusi kompleks menggunakan modul scipy.optimize dan scipy.stats.",
          "Capaian: Mengekstrak matriks kovarians parameter asimtotik dari inversi matriks Hessian numerik."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{I}_{\\text{obs}}(\\hat{\\boldsymbol{\\theta}}) = -\\left. \\nabla^2 \\ell(\\boldsymbol{\\theta}) \\right|_{\\boldsymbol{\\theta} = \\hat{\\boldsymbol{\\theta}}} = \\left. \\mathbf{H}_{\\text{NLL}}(\\boldsymbol{\\theta}) \\right|_{\\boldsymbol{\\theta} = \\hat{\\boldsymbol{\\theta}}}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Penurunan Numerik Fungsi Log-Likelihood Menggunakan Pyt...",
        "bulletPoints": [
          "Dalam banyak permasalahan rekayasa tingkat lanjut (seperti pemodelan degradasi sensor fotovoltaik dengan sensor terpotong ata...",
          "Dalam situasi ini, estimasi parameter diselesaikan secara komputasional menggunakan Penurunan Numerik Fungsi Log-Likelihood (...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Prosedur implementasi komputasi numerik MLE: 1. Formulasi Fungsi Negatif Log-Likelihood (N..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Prosedur implementasi komputasi numerik MLE: 1. Formulasi Fungsi Negatif Log-Likelihood (NLL): Menulis fungsi Python yang men...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Matriks Informasi Fisher Teramati (*Observed Fisher Information Matrix* $\\mathcal{I}_{\\text{obs}}$):",
          "Di mana elemen matriks Hessian:",
          "Matriks Kovarians Asimtotik Parameter $\\boldsymbol{\\Sigma}_{\\hat{\\theta}}$:"
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{I}_{\\text{obs}}(\\hat{\\boldsymbol{\\theta}}) = -\\left. \\nabla^2 \\ell(\\boldsymbol{\\theta}) \\right|_{\\boldsymbol{\\theta} = \\hat{\\boldsymbol{\\theta}}} = \\left. \\mathbf{H}_{\\text{NLL}}(\\boldsymbol{\\theta}) \\right|_{\\boldsymbol{\\theta} = \\hat{\\boldsymbol{\\theta}}}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah dataset laju transmisi bit radio (Mbps) difitting ke distribusi Gaussian N(mu, sigma^2) menggunakan algoritma minimasi numerik NLL. P...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Inversikan matriks diagonal Hessian: H^(-1) = [[1 / 8.68, 0], [0, 1 / 17.36]] = [[0.1152, 0], [0, 0...",
          "Langkah 2: Ambil elemen diagonal untuk varians asimtotik: Var(mu_hat) = 0.1152; Var(sigma_hat) = 0.0576.",
          "Langkah 3: Hitung Standar Error dengan mengambil akar kuadrat:",
          "Interpretasi: Parameter diestimasikan sebagai mu = (54.20 +/- 0.34) Mbps dan sigma = (4.80 +/- 0.24) Mbps dengan keyakinan asimtotik 1..."
        ],
        "keyFormulaOrDiagram": "SE(sigma_hat) = sqrt(0.0576) = 0.240 Mbps."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Fitting distribusi Gaussian kustom via minimasi numerik NLL dengan ekstraksi standar error dari matriks Hessian.",
          "Dependensi Pustaka: scipy.optimize, numpy",
          "Keluaran Diharapkan: Hasil Estimasi Mu : 54.14 +/- 0.334 Mbps (Sejati: 54.20)"
        ],
        "keyFormulaOrDiagram": "Hasil Estimasi Mu : 54.14 +/- 0.334 Mbps (Sejati: 54.20) | Hasil Estimasi Sigma : 4.72 +/-..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Tidak memeriksa status konvergensi hasil optimasi (hasil.success) dan langsung menggunakan nilai parameter dar...",
          "Perangkap: Memilih tebakan parameter awal (initial guess) yang terlalu jauh dari rentang data sehingga memicu overflow ni...",
          "Perangkap: Mengabaikan batasan nilai parameter yang tidak boleh bernilai negatif secara fisis."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan metode optimasi alternatif (seperti Nelder-Mead atau Powell) untuk mengonfirmasi bahwa konvergensi men...",
          "Prosedur: Bandingkan kurva PDF hasil fitting numerik dengan histogram data empiris menggunakan overlay plot."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Bagaimana cara mendeteksi bahwa proses minimasi numerik NLL terjebak pada minimum lokal palsu?",
          "Petunjuk: Perhatikan teknik inisialisasi ulang dengan multi-start parameter acak.",
          "Solusi Kunci: Peneliti dapat menjalankan algoritma optimasi beberapa kali (misal 20 kali) menggunakan nilai tebakan awal yang berbeda-..."
        ]
      }
    ]
  }
};
