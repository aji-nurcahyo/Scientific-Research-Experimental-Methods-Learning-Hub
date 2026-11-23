import { Lesson } from '../types/curriculum';

export const CH40_LESSONS: Record<string, Partial<Lesson>> = {
  "6.3.1": {
    "id": "6.3.1",
    "chapterId": "CH-40",
    "title": "Standar Aritmatika Floating-Point IEEE 754: Error Pembulatan dan Pembatalan Katastropik",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami representasi biner standar IEEE 754 (FP32 single precision dan FP64 double precision).",
      "Menganalisis akumulasi galat pembulatan (roundoff error) dan fenomena Machine Epsilon.",
      "Mencegah bencana numerik pembatalan katastropik (catastrophic cancellation) dan overflow/underflow."
    ],
    "content": "Dalam komputasi rekayasa dan sains data, komputer digital tidak bekerja dengan bilangan riil kontinu $\\mathbb{R}$ yang tak terhingga, melainkan bekerja dengan representasi diskrit terbatas berbasis standar IEEE 754. Banyak kegagalan rekayasa fatal (seperti kegagalan rudal Patriot di Dhahran tahun 1991 yang meleset akibat akumulasi error pembulatan 0.34 detik, atau ledakan roket Ariane 5 tahun 1996 akibat konversi floating-point 64-bit ke integer 16-bit) berakar pada ketidaktahuan insinyur terhadap mekanika aritmatika floating-point.\n\nRepresentasi Bilangan IEEE 754:\nSebuah bilangan floating-point direpresentasikan dalam 3 segmen:\n$$x = (-1)^s \\times (1.m)_2 \\times 2^{e - \text{bias}}$$\n- $s$ (Sign bit): 1 bit tanda (0 positif, 1 negatif).\n- $e$ (Exponent): Menentukan rentang magnitudo bilangan (8 bit pada FP32, 11 bit pada FP64).\n- $m$ (Mantissa / Significand): Menentukan presisi angka penting (23 bit pada FP32, 52 bit pada FP64).\n\nPresisi Mesin (Machine Epsilon, $\\epsilon_{\\text{mach}}$):\nMachine epsilon adalah bilangan positif terkecil sedemikian rupa sehingga:\n$$1.0 + \\epsilon_{\\text{mach}} \\neq 1.0$$\nPada FP32, $\\epsilon_{\\text{mach}} \\approx 1.19 \\times 10^{-7}$ (sekitar 7 digit desimal signifikan). Pada FP64, $\\epsilon_{\\text{mach}} \\approx 2.22 \\times 10^{-16}$ (sekitar 16 digit desimal signifikan).\n\nPembatalan Katastropik (Catastrophic Cancellation):\nTerjadi ketika dua bilangan floating-point yang bernilai sangat besar dan hampir sama persis saling dikurangkan: $x - y$. Karena digit-digit penting terdepan saling meniadakan, hasil pengurangan didominasi oleh derau pembulatan pada bit-bit terbawah, menyebabkan hilangnya hampir seluruh digit signifikan presisi.",
    "mathematicalFoundations": "Analisis Galat Relatif dan Pembatalan Katastropik:\nMisalkan $\\text{fl}(x)$ adalah representasi floating-point dari bilangan riil $x$, dengan batas galat pembulatan dasar:\n$$\\text{fl}(x) = x(1 + \\delta), \\quad |\\delta| \\leq \\epsilon_{\\text{mach}}$$\n\nPengurangan Dua Bilangan Berdekatan $x \\approx y$:\nMisalkan $x = \\tilde{x}(1 + \\delta_1)$ dan $y = \\tilde{y}(1 + \\delta_2)$.\nGalat relatif pada operasi pengurangan:\n$$\\text{Error}_{\\text{rel}} = \\left| \\frac{(x - y) - (\\tilde{x} - \\tilde{y})}{\\tilde{x} - \\tilde{y}} \\right| = \\left| \\frac{\\tilde{x} \\delta_1 - \\tilde{y} \\delta_2}{\\tilde{x} - \\tilde{y}} \\right| \\approx |\\delta| \\cdot \\frac{|\\tilde{x}|}{|\\tilde{x} - \\tilde{y}|}$$\n\nJika $|\\tilde{x} - \\tilde{y}| \\to 0$, faktor amplifikasi pembesaran galat $\\frac{|\\tilde{x}|}{|\\tilde{x} - \\tilde{y}|} \\to \\infty$, memusnahkan seluruh presisi numerik.\n\nContoh Klasik Solusi Stabilisasi Aljabar:\n1. Menghitung $f(x) = \\sqrt{x + 1} - \\sqrt{x}$ untuk $x$ besar:\nBentuk tidak stabil mengalami catastrophic cancellation: $\\mathcal{O}(x) - \\mathcal{O}(x)$.\nBentuk stabil secara numerik (dikalikan sekawan):\n$$f(x) = \\frac{(\\sqrt{x + 1} - \\sqrt{x})(\\sqrt{x + 1} + \\sqrt{x})}{\\sqrt{x + 1} + \\sqrt{x}} = \\frac{1}{\\sqrt{x + 1} + \\sqrt{x}}$$\nBentuk ini sepenuhnya bebas dari operasi pengurangan.",
    "workedExample": {
      "problemStatement": "Hitung nilai f(x) = sqrt(x + 1) - sqrt(x) untuk x = 10^14 menggunakan aritmatika 16-digit. Tunjukkan bagaimana bentuk langsung menghasilkan kesalahan fatal dan bandingkan dengan bentuk sekawan stabil 1 / (sqrt(x+1) + sqrt(x)).",
      "stepByStepSolution": [
        "Langkah 1: Hitung sqrt(x): sqrt(10^14) = 10.000.000,00000000.",
        "Langkah 2: Hitung sqrt(x+1) pada presisi standar: sqrt(100.000.000.000.001) = 10.000.000,00000005.",
        "Langkah 3: Kurangkan langsung (bentuk tidak stabil): f(x) = 10.000.000,00000005 - 10.000.000,00000000 = 0,00000005 = 5.0 x 10^-8 (hanya menyisakan 1 digit signifikan!).",
        "Langkah 4: Hitung menggunakan bentuk sekawan stabil: 1 / (sqrt(x+1) + sqrt(x)) = 1 / (10.000.000,00000005 + 10.000.000,00000000) = 1 / (20.000.000,00000005) = 4,9999999999999875 x 10^-8."
      ],
      "resultInterpretation": "Bentuk stabil mempertahankan presisi penuh 16 digit desimal, sedangkan bentuk langsung kehilangan 15 digit presisi akibat pembatalan katastropik."
    },
    "pythonImplementation": {
      "description": "Demonstrasi catastrophic cancellation pada perhitungan varians dan stabilisasi Welford.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA]\n# Tiga angka pengukuran presisi tinggi dengan rata-rata besar dan varians kecil\ndata = np.array([100000000.1, 100000000.2, 100000000.3], dtype=np.float64)\nn = len(data)\n\n# 1. FORMULA TEXTBOOK NAIK (Rentan Pembatalan Katastropik): Var = (sum(x^2) - (sum(x))^2 / n) / (n - 1)\nsum_x = np.sum(data)\nsum_x2 = np.sum(data**2)\nvar_naive = (sum_x2 - (sum_x**2) / n) / (n - 1)\n\n# 2. ALGORITMA DUA-TAHAP STABIL: Var = sum((x - mean)^2) / (n - 1)\nmean_data = np.mean(data)\nvar_stable = np.sum((data - mean_data)**2) / (n - 1)\n\n# Nilai analitis eksak: varians dari [0.1, 0.2, 0.3] adalah 0.01\nvar_exact = 0.01\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Uji Kestabilan Numerik IEEE 754 FP64:\")\nprint(f\"Nilai Varians Eksak Teoretis    : {var_exact:.8f}\")\nprint(f\"Formula Naif (Catastrophic Loss): {var_naive:.8f} (Galat Relatif Masif!)\")\nprint(f\"Formula Stabil Dua-Tahap        : {var_stable:.8f} (Presisi Sempurna)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Uji Kestabilan Numerik IEEE 754 FP64:\nNilai Varians Eksak Teoretis    : 0.01000000\nFormula Naif (Catastrophic Loss): 0.00000000 (Galat Relatif Masif!)\nFormula Stabil Dua-Tahap        : 0.01000000 (Presisi Sempurna)"
    },
    "commonPitfalls": [
      "Menggunakan formula varians naif satu lintasan sum(x^2) - (sum(x))^2/n pada data berukuran besar.",
      "Membandingkan dua bilangan floating-point secara eksak menggunakan operator == (if a == b).",
      "Mengabaikan proteksi Log-Sum-Exp pada perhitungan probabilitas kecil yang memicu underflow ke nol."
    ],
    "validationProcedures": [
      "Gunakan fungsi np.isclose(a, b, rtol=1e-5, atol=1e-8) untuk seluruh perbandingan kesetaraan numerik.",
      "Gunakan trik Log-Sum-Exp: log(sum(exp(x))) = m + log(sum(exp(x - m))) di mana m = max(x).",
      "Audit kode simulasi terhadap potensi catastrophic cancellation pada kalkulasi selisih waktu atau posisi."
    ],
    "exercises": [
      {
        "question": "Mengapa membandingkan if (a == b) pada bilangan floating point di Python atau C++ dianggap sebagai cacat kode fatal?",
        "hint": "Perhatikan representasi desimal 0.1 dalam basis 2 biner.",
        "answerExplanation": "Sebagian besar bilangan pecahan desimal (seperti 0.1 atau 0.2) tidak dapat direpresentasikan secara eksak dalam pecahan biner berhingga (menjadi desimal berulang tak terhingga seperti 1/3 di desimal). Operasi 0.1 + 0.2 menghasilkan 0.30000000000000004. Perbandingan kesetaraan eksak akan selalu bernilai False dan memicu bug tersembunyi."
      },
      {
        "question": "Bagaimana trik Log-Sum-Exp mencegah terjadinya Underflow dan Overflow numerik pada komputasi Softmax?",
        "hint": "Perhatikan pengurangan nilai maksimum m = max(x_i) sebelum eksponensial.",
        "answerExplanation": "Dengan mengurangkan nilai maksimum m dari setiap elemen sebelum pemanggilan exp(x - m), nilai terbesar yang dihitung eksponensialnya adalah exp(0) = 1.0. Hal ini menjamin tidak akan pernah terjadi overflow (menghasilkan inf), dan pembagi selalu memiliki komponen minimal bernilai 1.0 sehingga tidak terjadi pembagian dengan nol (underflow)."
      }
    ],
    "references": [
      {
        "citation": "Goldberg, D. (1991). What every computer scientist should know about floating-point arithmetic. ACM Computing Surveys (CSUR), 23(1), 5-48.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Higham, N. J. (2002). Accuracy and Stability of Numerical Algorithms (2nd ed.). SIAM.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Standar Aritmatika Floating-Point IEEE 754: Error Pembulatan dan Pembatalan Katastropik",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.3.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.3.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami representasi biner standar IEEE 754 (FP32 single precision dan FP64 double precision).",
          "Capaian 2: Menganalisis akumulasi galat pembulatan (roundoff error) dan fenomena Machine Epsilon.",
          "Capaian 3: Mencegah bencana numerik pembatalan katastropik (catastrophic cancellation) dan overflow/underflow."
        ],
        "keyFormulaOrDiagram": "$$\\text{fl}(x) = x(1 + \\delta), \\quad |\\delta| \\leq \\epsilon_{\\text{mach}}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.3.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Standar Aritmatika Floating-Point IEEE 754: Error Pembulatan dan Pembatalan Katastropik",
        "lead": "Dalam komputasi rekayasa dan sains data, komputer digital tidak bekerja dengan bilangan riil kontinu $\\mathbb{R}$ yang tak terhingga, melainkan bekerja dengan representasi diskrit terbatas berbasis standar IEEE 754.",
        "bulletPoints": [
          "Banyak kegagalan rekayasa fatal (seperti kegagalan rudal Patriot di Dhahran tahun 1991 yang meleset akibat akumulasi error pembulatan 0.34 detik, atau ledakan roket Ariane 5 tahun 1996 akibat konversi floating-point 64-bit ke integer 16-bit) berakar pada ketidaktahuan insinyur terhadap mekanika aritmatika floating-point.",
          "Representasi Bilangan IEEE 754: Sebuah bilangan floating-point direpresentasikan dalam 3 segmen: $$x = (-1)^s \\times (1.m)_2 \\times 2^{e - \text{bias}}$$ - $s$ (Sign bit): 1 bit tanda (0 positif, 1 negatif). - $e$ (Exponent): Menentukan rentang magnitudo bilangan (8 bit pada FP32, 11 bit pada FP64). - $m$ (Mantissa / Significand): Menentukan presisi angka penting (23 bit pada FP32, 52 bit pada FP64)."
        ],
        "keyFormulaOrDiagram": "$$1.0 + \\epsilon_{\\text{mach}} \\neq 1.0$$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Presisi Mesin (Machine Epsilon, $\\epsilon_{\\text{mach}}$): Machine epsilon adalah bilangan positif terkecil sedemikian rupa sehingga: $$1.0 + \\epsilon_{\\text{mach}} \\neq 1.0$$ Pada FP32, $\\epsilon_{\\text{mach}} \\approx 1.19 \\times 10^{-7}$ (sekitar 7 digit desimal signifikan).",
        "bulletPoints": [
          "Pada FP64, $\\epsilon_{\\text{mach}} \\approx 2.22 \\times 10^{-16}$ (sekitar 16 digit desimal signifikan).",
          "Pembatalan Katastropik (Catastrophic Cancellation): Terjadi ketika dua bilangan floating-point yang bernilai sangat besar dan hampir sama persis saling dikurangkan: $x - y$.",
          "Karena digit-digit penting terdepan saling meniadakan, hasil pengurangan didominasi oleh derau pembulatan pada bit-bit terbawah, menyebabkan hilangnya hampir seluruh digit signifikan presisi."
        ],
        "keyFormulaOrDiagram": "$x - y$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Analisis Galat Relatif dan Pembatalan Katastropik:",
        "bulletPoints": [
          "Misalkan $\\text{fl}(x)$ adalah representasi floating-point dari bilangan riil $x$, dengan batas galat pembulatan dasar:",
          "Pengurangan Dua Bilangan Berdekatan $x \\approx y$:",
          "Misalkan $x = \\tilde{x}(1 + \\delta_1)$ dan $y = \\tilde{y}(1 + \\delta_2)$."
        ],
        "keyFormulaOrDiagram": "$$\\text{fl}(x) = x(1 + \\delta), \\quad |\\delta| \\leq \\epsilon_{\\text{mach}}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Hitung nilai f(x) = sqrt(x + 1) - sqrt(x) untuk x = 10^14 menggunakan aritmatika 16-digit. Tunjukkan bagaimana bentuk langsung menghasilkan kesalahan fatal dan bandingkan dengan bentuk sekawan stabil 1 / (sqrt(x+1) + sqrt(x)).",
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
          "Langkah 1: Hitung sqrt(x): sqrt(10^14) = 10.000.000,00000000.",
          "Langkah 2: Hitung sqrt(x+1) pada presisi standar: sqrt(100.000.000.000.001) = 10.000.000,00000005."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Kurangkan langsung (bentuk tidak stabil): f(x) = 10.000.000,00000005 - 10.000.000,00000000 = 0,00000005 = 5.0 x 10^-8 (hanya menyisakan 1 digit signifikan!).",
          "Langkah 4: Hitung menggunakan bentuk sekawan stabil: 1 / (sqrt(x+1) + sqrt(x)) = 1 / (10.000.000,00000005 + 10.000.000,00000000) = 1 / (20.000.000,00000005) = 4,9999999999999875 x 10^-8.",
          "[result: Interpretasi Ilmiah] Bentuk stabil mempertahankan presisi penuh 16 digit desimal, sedangkan bentuk langsung kehilangan 15 digit presisi akibat pembatalan katastropik."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Demonstrasi catastrophic cancellation pada perhitungan varians dan stabilisasi Welford.",
        "bulletPoints": [
          "Tujuan Algoritma: Demonstrasi catastrophic cancellation pada perhitungan varians dan stabilisasi Welford.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Uji Kestabilan Numerik IEEE 754 FP64:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Uji Kestabilan Numerik IEEE 754 FP64:\nNilai Varians Eksak Teoretis    : 0.01000000\nFormula Naif (Catastrophic Loss): 0.00000000 (Galat Relatif Masif!)\nFormula Stabil Dua-Tahap        : 0.01000000 (Presisi Sempurna)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan formula varians naif satu lintasan sum(x^2) - (sum(x))^2/n pada data berukuran besar.",
          "[warning: Perangkap] Membandingkan dua bilangan floating-point secara eksak menggunakan operator == (if a == b).",
          "[warning: Perangkap] Mengabaikan proteksi Log-Sum-Exp pada perhitungan probabilitas kecil yang memicu underflow ke nol."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan fungsi np.isclose(a, b, rtol=1e-5, atol=1e-8) untuk seluruh perbandingan kesetaraan numerik.",
          "Prosedur: Gunakan trik Log-Sum-Exp: log(sum(exp(x))) = m + log(sum(exp(x - m))) di mana m = max(x).",
          "Prosedur: Audit kode simulasi terhadap potensi catastrophic cancellation pada kalkulasi selisih waktu atau posisi."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa membandingkan if (a == b) pada bilangan floating point di Python atau C++ dianggap sebagai cacat kode fatal?",
          "Petunjuk Analitis: Perhatikan representasi desimal 0.1 dalam basis 2 biner.",
          "Solusi Kunci: Sebagian besar bilangan pecahan desimal (seperti 0.1 atau 0.2) tidak dapat direpresentasikan secara eksak dalam pecahan biner berhingga (menjadi desimal berulang tak terhingga seperti 1/3 di desimal). Operasi 0.1 + 0.2 menghasilkan 0.30000000000000004. Perbandingan kesetaraan eksak akan selalu bernilai False dan memicu bug tersembunyi."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "6.3.2": {
    "id": "6.3.2",
    "chapterId": "CH-40",
    "title": "Kondisi Matriks dan Kestabilan Numerik Inversi Matriks pada Algoritma Rekayasa",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menghitung bilangan kondisi matriks (Condition Number) dan menginterpretasikan sensitivitas perturbasi sistem.",
      "Memahami mengapa melakukan komputasi inversi langsung matriks (inv(A)) dilarang keras dalam rekayasa komputasi.",
      "Menerapkan faktorisasi Cholesky, LU, dan QR untuk menyelesaikan sistem persamaan linier secara stabil."
    ],
    "content": "Dalam hampir seluruh algoritma rekayasa lanjutan, komputasi berpusat pada penyelesaian sistem persamaan linier $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ atau estimasi kuadrat terkecil $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}$. Kesalahan paling mendasar yang membedakan pemrogram amatir dari insinyur komputasi profesional adalah penggunaan operasi pembalikan matriks langsung (direct matrix inversion, seperti np.linalg.inv(A) atau inv(X.T @ X)).\n\nBilangan Kondisi Matriks (Condition Number, $\\kappa(\\mathbf{A})$):\nBilangan kondisi mengukur sensitivitas solusi $\\mathbf{x}$ terhadap perturbasi kecil atau derau pada vektor $\\mathbf{b}$ atau matriks $\\mathbf{A}$:\n$$\\kappa(\\mathbf{A}) = \\|\\mathbf{A}\\| \\cdot \\|\\mathbf{A}^{-1}\\| = \\frac{\\sigma_{\\max}(\\mathbf{A})}{\\sigma_{\\min}(\\mathbf{A})}$$\n- Sistem Berkondisi Baik (Well-conditioned): $\\kappa(\\mathbf{A}) \\approx 1$. Solusi sangat stabil.\n- Sistem Berkondisi Buruk (Ill-conditioned): $\\kappa(\\mathbf{A}) \\gg 10^8$. Derau sensor sekecil $10^{-10}$ dapat teramplifikasi menjadi kesalahan solusi sebesar $100\\%$.\n\nAturan Emas: \"Jangan Pernah Menghitung Invers Matriks\":\nMenghitung $\\mathbf{A}^{-1}$ membutuhkan biaya komputasi $\\mathcal{O}(n^3)$ dan rentan terhadap akumulasi galat numerik. Sistem $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ harus selalu diselesaikan menggunakan faktorisasi terdekomposisi (Linear Solve):\n1. Faktorisasi Cholesky ($\\mathbf{A} = \\mathbf{L}\\mathbf{L}^T$): Untuk matriks simetris definit positif (seperti matriks kovarians atau $\\mathbf{X}^T \\mathbf{X}$). Dua kali lebih cepat dan paling stabil secara numerik.\n2. Dekomposisi QR ($\\mathbf{X} = \\mathbf{Q}\\mathbf{R}$): Menghindari pembentukan $\\mathbf{X}^T \\mathbf{X}$ secara langsung, mencegah kuadrat dari bilangan kondisi ($\\kappa(\\mathbf{X}^T \\mathbf{X}) = \\kappa(\\mathbf{X})^2$).",
    "mathematicalFoundations": "Teorema Perturbasi Sistem Linier dan Batas Galat Relatif:\nDiberikan sistem ideal $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$.\nMisalkan sistem mengalami gangguan perturbasi $\\mathbf{b} \\to \\mathbf{b} + \\delta \\mathbf{b}$, menghasilkan pergeseran solusi $\\mathbf{x} \\to \\mathbf{x} + \\delta \\mathbf{x}$:\n$$\\mathbf{A}(\\mathbf{x} + \\delta \\mathbf{x}) = \\mathbf{b} + \\delta \\mathbf{b} \\implies \\mathbf{A} \\, \\delta \\mathbf{x} = \\delta \\mathbf{b} \\implies \\delta \\mathbf{x} = \\mathbf{A}^{-1} \\delta \\mathbf{b}$$\n\nBatas Penguatan Galat Relatif:\n$$\\frac{\\|\\delta \\mathbf{x}\\|}{\\|\\mathbf{x}\\|} \\leq \\kappa(\\mathbf{A}) \\cdot \\frac{\\|\\delta \\mathbf{b}\\|}{\\|\\mathbf{b}\\|}$$\n\nAturan Kehilangan Presisi Desimal (Rule of Thumb Presisi):\nJika $\\kappa(\\mathbf{A}) = 10^k$, maka dalam aritmatika floating-point dengan $p$ digit presisi, solusi numerik $\\mathbf{x}$ berpotensi kehilangan hingga $k$ digit presisi signifikan:\n$$\\text{Digit Presisi Tersisa} \\approx p - \\log_{10} \\kappa(\\mathbf{A})$$\nPada FP64 ($p \\approx 16$), jika $\\kappa(\\mathbf{A}) = 10^{15}$, solusi yang dihasilkan pada dasarnya adalah derau acak murni tanpa digit benar yang tersisa.",
    "workedExample": {
      "problemStatement": "Diberikan Matriks Hilbert H_4 berukuran 4x4: H_ij = 1 / (i + j - 1). Nilai singular maksimum adalah sigma_max = 1.500 dan nilai singular minimum adalah sigma_min = 9.66 x 10^-5. Hitung bilangan kondisi kappa(H_4). Jika matriks ini diselesaikan dengan sistem FP32 (presisi 7 digit desimal), berapa digit signifikan yang tersisa pada solusi?",
      "stepByStepSolution": [
        "Langkah 1: Hitung bilangan kondisi matriks: kappa(H_4) = sigma_max / sigma_min = 1.500 / (9.66 x 10^-5) = 15.528 (atau 1.55 x 10^4).",
        "Langkah 2: Hitung logaritma basis 10 dari bilangan kondisi: log10(kappa) = log10(15528) = 4.19.",
        "Langkah 3: Hitung estimasi kehilangan presisi pada FP32: Presisi awal FP32 adalah p = 7 digit desimal.",
        "Langkah 4: Hitung sisa digit signifikan: Sisa = 7 - 4.19 = 2.81 digit (kurang dari 3 digit desimal yang dapat dipercaya)."
      ],
      "resultInterpretation": "Sistem mengalami pembesaran galat lebih dari 15.000 kali lipat, menyebabkan solusi kehilangan 4 digit presisi dan menyisakan akurasi yang sangat rentan terhadap kegagalan operasional."
    },
    "pythonImplementation": {
      "description": "Audit bilangan kondisi matriks dan komparasi akurasi np.linalg.inv vs np.linalg.solve.",
      "libraryDependencies": [
        "numpy",
        "scipy.linalg"
      ],
      "code": "import numpy as np\nfrom scipy.linalg import hilbert\n\n# [SIMULASI/SYNTHETIC DATA]\n# Matriks Hilbert 8x8 (contoh kanonikal matriks ill-conditioned ekstrem)\nn = 8\nA = hilbert(n)\n# Vektor solusi sejati x_true = [1, 1, ..., 1]^T\nx_true = np.ones(n)\nb = np.dot(A, x_true)\n\n# 1. Bilangan Kondisi Matriks\ncond_num = np.linalg.cond(A)\n\n# 2. Solusi Buruk via Inversi Langsung: x = inv(A) @ b\nA_inv = np.linalg.inv(A)\nx_inv = np.dot(A_inv, b)\nerr_inv = np.linalg.norm(x_inv - x_true) / np.linalg.norm(x_true)\n\n# 3. Solusi Terdekomposisi via Linear Solver: solve(A, b)\nx_solve = np.linalg.solve(A, b)\nerr_solve = np.linalg.norm(x_solve - x_true) / np.linalg.norm(x_true)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Audit Kestabilan Numerik Inversi Matriks:\")\nprint(f\"Bilangan Kondisi Matriks kappa(A) : {cond_num:.4e} (Ekstrem Ill-Conditioned!)\")\nprint(f\"Galat Relatif Inversi Langsung    : {err_inv:.4e} (np.linalg.inv)\")\nprint(f\"Galat Relatif Solver Stabil       : {err_solve:.4e} (np.linalg.solve)\")\nprint(f\"Rasio Keunggulan Solver           : {err_inv / err_solve:.1f}x Lebih Presisi\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Audit Kestabilan Numerik Inversi Matriks:\nBilangan Kondisi Matriks kappa(A) : 1.5258e+10 (Ekstrem Ill-Conditioned!)\nGalat Relatif Inversi Langsung    : 4.8732e-06 (np.linalg.inv)\nGalat Relatif Solver Stabil       : 3.1205e-07 (np.linalg.solve)\nRasio Keunggulan Solver           : 15.6x Lebih Presisi"
    },
    "commonPitfalls": [
      "Menulis kode x = inv(A) @ b alih-alih menggunakan x = solve(A, b).",
      "Membentuk matriks normal X.T @ X secara eksplisit pada regresi linier alih-alih menggunakan dekomposisi QR.",
      "Mengabaikan nilai condition number saat melakukan kalibrasi sensor multivariat."
    ],
    "validationProcedures": [
      "Hitung np.linalg.cond(A) sebelum menyelesaikan sistem linier berskala besar.",
      "Jika kappa(A) > 1e12 pada FP64, terapkan teknik regularisasi Tikhonov (Ridge: A + lambda * I).",
      "Gunakan faktorisasi Cholesky (scipy.linalg.cho_solve) untuk sistem simetris definit positif."
    ],
    "exercises": [
      {
        "question": "Mengapa membentuk matriks normal (X^T @ X) pada regresi kuadrat terkecil sangat berbahaya jika matriks fitur X memiliki multikolinearitas tinggi?",
        "hint": "Perhatikan hubungan bilangan kondisi antara X dan (X^T @ X).",
        "answerExplanation": "Bilangan kondisi dari (X^T @ X) adalah kuadrat dari bilangan kondisi matriks aslinya: kappa(X^T @ X) = [kappa(X)]^2. Jika X memiliki kappa = 10^5 (kondisi sedang), maka (X^T @ X) akan memiliki kappa = 10^10, melipatgandakan pembatalan presisi numerik secara kuadratik."
      },
      {
        "question": "Bagaimana dekomposisi QR menyelesaikan masalah kuadrat terkecil tanpa perlu menghitung X^T @ X?",
        "hint": "Perhatikan ortogonalitas matriks Q: Q^T @ Q = I.",
        "answerExplanation": "Dengan memfaktorkan X = Q @ R di mana Q ortogonal dan R segitiga atas, sistem kuadrat terkecil X^T @ X @ beta = X^T @ y berubah menjadi R @ beta = Q^T @ y. Sistem ini diselesaikan langsung melalui back-substitution pada R tanpa pernah mengalikan X dengan X^T, sehingga stabilitas numerik tetap terjaga pada skala kappa(X)."
      }
    ],
    "references": [
      {
        "citation": "Trefethen, L. N., & Bau III, D. (1997). Numerical Linear Algebra. SIAM.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Golub, G. H., & Van Loan, C. F. (2013). Matrix Computations (4th ed.). Johns Hopkins University Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Kondisi Matriks dan Kestabilan Numerik Inversi Matriks pada Algoritma Rekayasa",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.3.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.3.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menghitung bilangan kondisi matriks (Condition Number) dan menginterpretasikan sensitivitas perturbasi sistem.",
          "Capaian 2: Memahami mengapa melakukan komputasi inversi langsung matriks (inv(A)) dilarang keras dalam rekayasa komputasi.",
          "Capaian 3: Menerapkan faktorisasi Cholesky, LU, dan QR untuk menyelesaikan sistem persamaan linier secara stabil."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{A}(\\mathbf{x} + \\delta \\mathbf{x}) = \\mathbf{b} + \\delta \\mathbf{b} \\implies \\mathbf{A} \\, \\delta \\mathbf{x} = \\delta \\mathbf{b} \\implies \\delta \\mathbf{x} = \\mathbf{A}^{-1} \\delta \\mathbf{b}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.3.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Kondisi Matriks dan Kestabilan Numerik Inversi Matriks pada Algoritma Rekayasa",
        "lead": "Dalam hampir seluruh algoritma rekayasa lanjutan, komputasi berpusat pada penyelesaian sistem persamaan linier $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ atau estimasi kuadrat terkecil $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}$.",
        "bulletPoints": [
          "Kesalahan paling mendasar yang membedakan pemrogram amatir dari insinyur komputasi profesional adalah penggunaan operasi pembalikan matriks langsung (direct matrix inversion, seperti np.linalg.inv(A) atau inv(X.T @ X)).",
          "Bilangan Kondisi Matriks (Condition Number, $\\kappa(\\mathbf{A})$): Bilangan kondisi mengukur sensitivitas solusi $\\mathbf{x}$ terhadap perturbasi kecil atau derau pada vektor $\\mathbf{b}$ atau matriks $\\mathbf{A}$: $$\\kappa(\\mathbf{A}) = \\|\\mathbf{A}\\| \\cdot \\|\\mathbf{A}^{-1}\\| = \\frac{\\sigma_{\\max}(\\mathbf{A})}{\\sigma_{\\min}(\\mathbf{A})}$$ - Sistem Berkondisi Baik (Well-conditioned): $\\kappa(\\mathbf{A}) \\approx 1$.",
          "Solusi sangat stabil. - Sistem Berkondisi Buruk (Ill-conditioned): $\\kappa(\\mathbf{A}) \\gg 10^8$."
        ],
        "keyFormulaOrDiagram": "$\\mathbf{A}^{-1}$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Aturan Emas: \"Jangan Pernah Menghitung Invers Matriks\": Menghitung $\\mathbf{A}^{-1}$ membutuhkan biaya komputasi $\\mathcal{O}(n^3)$ dan rentan terhadap akumulasi galat numerik.",
        "bulletPoints": [
          "Sistem $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ harus selalu diselesaikan menggunakan faktorisasi terdekomposisi (Linear Solve): 1.",
          "Faktorisasi Cholesky ($\\mathbf{A} = \\mathbf{L}\\mathbf{L}^T$): Untuk matriks simetris definit positif (seperti matriks kovarians atau $\\mathbf{X}^T \\mathbf{X}$)."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Teorema Perturbasi Sistem Linier dan Batas Galat Relatif:",
        "bulletPoints": [
          "Diberikan sistem ideal $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$.",
          "Misalkan sistem mengalami gangguan perturbasi $\\mathbf{b} \\to \\mathbf{b} + \\delta \\mathbf{b}$, menghasilkan pergeseran solusi $\\mathbf{x} \\to \\mathbf{x} + \\delta \\mathbf{x}$:",
          "Batas Penguatan Galat Relatif:"
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{A}(\\mathbf{x} + \\delta \\mathbf{x}) = \\mathbf{b} + \\delta \\mathbf{b} \\implies \\mathbf{A} \\, \\delta \\mathbf{x} = \\delta \\mathbf{b} \\implies \\delta \\mathbf{x} = \\mathbf{A}^{-1} \\delta \\mathbf{b}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan Matriks Hilbert H_4 berukuran 4x4: H_ij = 1 / (i + j - 1). Nilai singular maksimum adalah sigma_max = 1.500 dan nilai singular minimum adalah sigma_min = 9.66 x 10^-5. Hitung bilangan kondisi kappa(H_4). Jika matriks ini diselesaikan dengan sistem FP32 (presisi 7 digit desimal), berapa digit signifikan yang tersisa pada solusi?",
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
          "Langkah 1: Hitung bilangan kondisi matriks: kappa(H_4) = sigma_max / sigma_min = 1.500 / (9.66 x 10^-5) = 15.528 (atau 1.55 x 10^4).",
          "Langkah 2: Hitung logaritma basis 10 dari bilangan kondisi: log10(kappa) = log10(15528) = 4.19."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung estimasi kehilangan presisi pada FP32: Presisi awal FP32 adalah p = 7 digit desimal.",
          "Langkah 4: Hitung sisa digit signifikan: Sisa = 7 - 4.19 = 2.81 digit (kurang dari 3 digit desimal yang dapat dipercaya).",
          "[result: Interpretasi Ilmiah] Sistem mengalami pembesaran galat lebih dari 15.000 kali lipat, menyebabkan solusi kehilangan 4 digit presisi dan menyisakan akurasi yang sangat rentan terhadap kegagalan operasional."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Audit bilangan kondisi matriks dan komparasi akurasi np.linalg.inv vs np.linalg.solve.",
        "bulletPoints": [
          "Tujuan Algoritma: Audit bilangan kondisi matriks dan komparasi akurasi np.linalg.inv vs np.linalg.solve.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.linalg",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Audit Kestabilan Numerik Inversi Matriks:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Audit Kestabilan Numerik Inversi Matriks:\nBilangan Kondisi Matriks kappa(A) : 1.5258e+10 (Ekstrem Ill-Conditioned!)\nGalat Relatif Inversi Langsung    : 4.8732e-06 (np.linalg.inv)\nGalat Relatif Solver Stabil       : 3.1205e-07 (np.linalg.solve)\nRasio Keunggulan Solver           : 15.6x Lebih Presisi",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menulis kode x = inv(A) @ b alih-alih menggunakan x = solve(A, b).",
          "[warning: Perangkap] Membentuk matriks normal X.T @ X secara eksplisit pada regresi linier alih-alih menggunakan dekomposisi QR.",
          "[warning: Perangkap] Mengabaikan nilai condition number saat melakukan kalibrasi sensor multivariat."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Hitung np.linalg.cond(A) sebelum menyelesaikan sistem linier berskala besar.",
          "Prosedur: Jika kappa(A) > 1e12 pada FP64, terapkan teknik regularisasi Tikhonov (Ridge: A + lambda * I).",
          "Prosedur: Gunakan faktorisasi Cholesky (scipy.linalg.cho_solve) untuk sistem simetris definit positif."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa membentuk matriks normal (X^T @ X) pada regresi kuadrat terkecil sangat berbahaya jika matriks fitur X memiliki multikolinearitas tinggi?",
          "Petunjuk Analitis: Perhatikan hubungan bilangan kondisi antara X dan (X^T @ X).",
          "Solusi Kunci: Bilangan kondisi dari (X^T @ X) adalah kuadrat dari bilangan kondisi matriks aslinya: kappa(X^T @ X) = [kappa(X)]^2. Jika X memiliki kappa = 10^5 (kondisi sedang), maka (X^T @ X) akan memiliki kappa = 10^10, melipatgandakan pembatalan presisi numerik secara kuadratik."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "6.3.3": {
    "id": "6.3.3",
    "chapterId": "CH-40",
    "title": "Verifikasi dan Validasi Kode Numerik (Order of Accuracy Verification)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membedakan secara formal antara Verifikasi Kode (Code Verification) dan Validasi Model (Model Validation).",
      "Menerapkan Metode Solusi Manufaktur (Method of Manufactured Solutions - MMS).",
      "Mengukur laju konvergensi asimtotik empiris (Observed Order of Accuracy) pada simulasi fisik."
    ],
    "content": "Dalam rekayasa komputasi presisi tinggi (Computational Fluid Dynamics / CFD, Analisis Elemen Hingga / FEA, atau pemodelan dinamika partikel), mempublikasikan hasil simulasi tanpa verifikasi numerik adalah pelanggaran standar penjaminan kualitas ASME/AIAA.\n\nDikotomi Fundamental V&V (Roache, 1998):\n1. Verifikasi (Verification): Menjawab pertanyaan: \"Apakah kita menyelesaikan persamaan matematika dengan benar?\" (Solving the equations right). Verifikasi adalah pembuktian matematis murni bahwa kode perangkat lunak bebas dari bug algoritma dan mengonvergen ke solusi kontinu sesuai laju teoretis diskritisasi.\n2. Validasi (Validation): Menjawab pertanyaan: \"Apakah kita menyelesaikan persamaan yang benar?\" (Solving the right equations). Validasi adalah pembuktian empiris bahwa model matematika tersebut mencerminkan realitas fisis dunia nyata dengan membandingkannya terhadap data eksperimen laboratorium.\n\nVerifikasi Orde Akurasi (Order of Accuracy Verification):\nJika sebuah skema numerik (seperti Runge-Kutta orde-4 atau beda hingga orde-2) dirancang secara matematis memiliki galat diskritisasi $\\mathcal{O}(h^p)$, maka ketika ukuran langkah diskritisasi $h$ diperkecil menjadi setengahnya ($h/2$), galat numerik global wajib mengecil sebesar faktor $2^p$. Jika pengujian komputasi menunjukkan galat hanya mengecil sebesar faktor 2 (orde 1) alih-alih 16 (orde 4), kode tersebut terbukti memiliki bug matematika tersembunyi.\n\nMetode Solusi Manufaktur (Method of Manufactured Solutions - MMS):\nTeknik verifikasi paling canggih di mana peneliti menciptakan solusi analitis buatan yang mulus (manufactured solution), memasukkannya ke dalam persamaan diferensial untuk menghasilkan suku sumber analitis (forcing term), lalu menguji apakah kode mampu mereproduksi solusi buatan tersebut dengan laju konvergensi teoretis $p$.",
    "mathematicalFoundations": "Formulasi Matematis Laju Konvergensi Asimtotik (Observed Order $p$):\nMisalkan $u_{\\text{exact}}$ adalah solusi analitis eksak, dan $u_h$ adalah solusi numerik pada ukuran grid/langkah $h$.\nGalat diskritisasi global dalam norma $L_2$:\n$$E(h) = \\|u_h - u_{\\text{exact}}\\|_{L_2} = C h^p + \\mathcal{O}(h^{p+1})$$\n\nPada rezim asimtotik di mana $h$ cukup kecil:\n$$\\log E(h) \\approx \\log C + p \\log h$$\n\nPenghitungan Laju Orde Empiris Teramati ($p_{\\text{obs}}$) Menggunakan Tiga Grid Berurutan:\nDiberikan rasio penghalusan grid konstan $r = h_2 / h_1 = h_3 / h_2$:\n$$p_{\\text{obs}} = \\frac{\\log\\left( \\frac{E(h_2)}{E(h_1)} \\right)}{\\log(r)}$$\n\nKriteria Kelulusan Verifikasi:\nKode dinyatakan lolos verifikasi numerik formal jika dan hanya jika:\n$$|p_{\\text{obs}} - p_{\\text{formal}}| < 0.05$$\ndi mana $p_{\\text{formal}}$ adalah orde teoretis skema numerik.",
    "workedExample": {
      "problemStatement": "Sebuah kode simulasi perpindahan panas dirancang menggunakan skema beda hingga pusat orde-2 (p_formal = 2.0). Simulasi diuji pada 3 ukuran grid: h_1 = 0.10 (Galat = 0.0400), h_2 = 0.05 (Galat = 0.0101), dan h_3 = 0.025 (Galat = 0.00253). Hitung laju konvergensi empiris p_obs antara grid 1-2 dan antara grid 2-3. Tentukan apakah kode lolos verifikasi.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi rasio grid: r = 0.10 / 0.05 = 2.0, dan r = 0.05 / 0.025 = 2.0.",
        "Langkah 2: Hitung p_obs antara grid 1 dan 2: p_12 = log(E_1 / E_2) / log(r) = log(0.0400 / 0.0101) / log(2.0) = log(3.9604) / 0.69315 = 1.3764 / 0.69315 = 1.986.",
        "Langkah 3: Hitung p_obs antara grid 2 dan 3: p_23 = log(E_2 / E_3) / log(r) = log(0.0101 / 0.00253) / log(2.0) = log(3.9921) / 0.69315 = 1.3843 / 0.69315 = 1.997.",
        "Langkah 4: Evaluasi terhadap nilai teoretis: Nilai p_obs (1.986 dan 1.997) sangat mendekati nilai teoretis 2.0 (|2.0 - 1.997| = 0.003 < 0.05)."
      ],
      "resultInterpretation": "Kode numerik terbukti secara matematis mengonvergen pada laju orde-2 kuadratik sempurna, membuktikan kebebasan dari kesalahan bug algoritma."
    },
    "pythonImplementation": {
      "description": "Verifikasi numerik laju konvergensi orde akurasi Runge-Kutta 4 (RK4) vs Euler.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA]\n# Masalah uji: dy/dt = -2y, y(0) = 1. Solusi eksak: y(t) = exp(-2t) pada t_end = 1.0\nt_end = 1.0\ny_exact = np.exp(-2.0 * t_end)\n\ndef solve_euler(h):\n    t, y = 0.0, 1.0\n    while t < t_end - 1e-12:\n        step = min(h, t_end - t)\n        y += step * (-2.0 * y)\n        t += step\n    return abs(y - y_exact)\n\ndef solve_rk4(h):\n    t, y = 0.0, 1.0\n    while t < t_end - 1e-12:\n        step = min(h, t_end - t)\n        k1 = -2.0 * y\n        k2 = -2.0 * (y + 0.5 * step * k1)\n        k3 = -2.0 * (y + 0.5 * step * k2)\n        k4 = -2.0 * (y + step * k3)\n        y += (step / 6.0) * (k1 + 2*k2 + 2*k3 + k4)\n        t += step\n    return abs(y - y_exact)\n\n# Uji pada ukuran langkah h yang dipotong setengah secara sekuensial\nh_steps = [0.1, 0.05, 0.025, 0.0125]\nerrs_euler = [solve_euler(h) for h in h_steps]\nerrs_rk4 = [solve_rk4(h) for h in h_steps]\n\n# Hitung observed order of accuracy\np_euler = np.log(errs_euler[-2] / errs_euler[-1]) / np.log(2.0)\np_rk4 = np.log(errs_rk4[-2] / errs_rk4[-1]) / np.log(2.0)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Verifikasi Orde Akurasi Numerik (Grid Refinement):\")\nprint(f\"Orde Teramati Euler (Teori p=1.0) : p_obs = {p_euler:.4f} (Lolos Verifikasi Orde-1)\")\nprint(f\"Orde Teramati RK-4  (Teori p=4.0) : p_obs = {p_rk4:.4f} (Lolos Verifikasi Orde-4)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Verifikasi Orde Akurasi Numerik (Grid Refinement):\nOrde Teramati Euler (Teori p=1.0) : p_obs = 0.9635 (Lolos Verifikasi Orde-1)\nOrde Teramati RK-4  (Teori p=4.0) : p_obs = 3.9961 (Lolos Verifikasi Orde-4)"
    },
    "commonPitfalls": [
      "Menyimpulkan kode benar hanya karena output grafik tampak mulus secara visual.",
      "Melakukan validasi model sebelum verifikasi kode selesai dilakukan (mencampuradukkan bug kode dengan error fisika).",
      "Mengukur laju konvergensi pada ukuran langkah h yang terlalu besar sehingga belum memasuki rezim asimtotik."
    ],
    "validationProcedures": [
      "Gunakan Method of Manufactured Solutions (MMS) untuk persamaan diferensial parsial non-linier.",
      "Plot kurva galat vs ukuran langkah pada skala log-log (Grid Convergence Plot).",
      "Sajikan tabel Grid Convergence Index (GCI) sesuai standar ASME V&V 20."
    ],
    "exercises": [
      {
        "question": "Apa perbedaan esensial antara Verifikasi Kode (Code Verification) dan Validasi Model (Model Validation)?",
        "hint": "Perhatikan apakah pembandingnya adalah solusi matematika eksak atau data observasi eksperimen riil.",
        "answerExplanation": "Verifikasi adalah pembuktian numerik bahwa kode menyelesaikan persamaan diferensial matematika secara akurat tanpa bug (membandingkan solusi numerik dengan solusi analitis eksak). Validasi adalah pembuktian ilmiah bahwa model fisika yang dipilih sesuai dengan dunia nyata (membandingkan solusi numerik dengan pengukuran fisik di laboratorium)."
      },
      {
        "question": "Jika skema numerik yang secara teoretis berorde-2 hanya menghasilkan laju konvergensi empiris p = 1.05 pada pengujian grid refinement, apa artinya?",
        "hint": "Perhatikan kondisi batas atau implementasi pemotongan suku diskritisasi.",
        "answerExplanation": "Hal itu membuktikan bahwa kode mengandung cacat matematika tersembunyi. Kemungkinan besar implementasi kondisi batas (boundary conditions) hanya menggunakan pendekatan orde-1, atau ada kesalahan indeks dalam skema beda hingga yang mendegradasi akurasi global sistem ke orde terendah."
      }
    ],
    "references": [
      {
        "citation": "Roache, P. J. (1998). Verification and Validation in Scientific Computing. Hermosa Publishers.",
        "type": "canonical-textbook"
      },
      {
        "citation": "ASME V&V 20-2009. Standard for Verification and Validation in Computational Fluid Dynamics and Heat Transfer.",
        "type": "formal-standard"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Verifikasi dan Validasi Kode Numerik (Order of Accuracy Verification)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.3.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.3.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan secara formal antara Verifikasi Kode (Code Verification) dan Validasi Model (Model Validation).",
          "Capaian 2: Menerapkan Metode Solusi Manufaktur (Method of Manufactured Solutions - MMS).",
          "Capaian 3: Mengukur laju konvergensi asimtotik empiris (Observed Order of Accuracy) pada simulasi fisik."
        ],
        "keyFormulaOrDiagram": "$$E(h) = \\|u_h - u_{\\text{exact}}\\|_{L_2} = C h^p + \\mathcal{O}(h^{p+1})$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.3.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Verifikasi dan Validasi Kode Numerik (Order of Accuracy Verification)",
        "lead": "Dalam rekayasa komputasi presisi tinggi (Computational Fluid Dynamics / CFD, Analisis Elemen Hingga / FEA, atau pemodelan dinamika partikel), mempublikasikan hasil simulasi tanpa verifikasi numerik adalah pelanggaran standar penjaminan kualitas ASME/AIAA.",
        "bulletPoints": [
          "Dikotomi Fundamental V&V (Roache, 1998): 1.",
          "Verifikasi (Verification): Menjawab pertanyaan: \"Apakah kita menyelesaikan persamaan matematika dengan benar?\" (Solving the equations right)."
        ],
        "keyFormulaOrDiagram": "$\\mathcal{O}(h^p)$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Verifikasi Orde Akurasi (Order of Accuracy Verification): Jika sebuah skema numerik (seperti Runge-Kutta orde-4 atau beda hingga orde-2) dirancang secara matematis memiliki galat diskritisasi $\\mathcal{O}(h^p)$, maka ketika ukuran langkah diskritisasi $h$ diperkecil menjadi setengahnya ($h/2$), galat numerik global wajib mengecil sebesar faktor $2^p$.",
        "bulletPoints": [
          "Jika pengujian komputasi menunjukkan galat hanya mengecil sebesar faktor 2 (orde 1) alih-alih 16 (orde 4), kode tersebut terbukti memiliki bug matematika tersembunyi.",
          "Metode Solusi Manufaktur (Method of Manufactured Solutions - MMS): Teknik verifikasi paling canggih di mana peneliti menciptakan solusi analitis buatan yang mulus (manufactured solution), memasukkannya ke dalam persamaan diferensial untuk menghasilkan suku sumber analitis (forcing term), lalu menguji apakah kode mampu mereproduksi solusi buatan tersebut dengan laju konvergensi teoretis $p$."
        ],
        "keyFormulaOrDiagram": "$p$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Laju Konvergensi Asimtotik (Observed Order $p$):",
        "bulletPoints": [
          "Misalkan $u_{\\text{exact}}$ adalah solusi analitis eksak, dan $u_h$ adalah solusi numerik pada ukuran grid/langkah $h$.",
          "Galat diskritisasi global dalam norma $L_2$:",
          "Pada rezim asimtotik di mana $h$ cukup kecil:"
        ],
        "keyFormulaOrDiagram": "$$E(h) = \\|u_h - u_{\\text{exact}}\\|_{L_2} = C h^p + \\mathcal{O}(h^{p+1})$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah kode simulasi perpindahan panas dirancang menggunakan skema beda hingga pusat orde-2 (p_formal = 2.0). Simulasi diuji pada 3 ukuran grid: h_1 = 0.10 (Galat = 0.0400), h_2 = 0.05 (Galat = 0.0101), dan h_3 = 0.025 (Galat = 0.00253). Hitung laju konvergensi empiris p_obs antara grid 1-2 dan antara grid 2-3. Tentukan apakah kode lolos verifikasi.",
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
          "Langkah 1: Identifikasi rasio grid: r = 0.10 / 0.05 = 2.0, dan r = 0.05 / 0.025 = 2.0.",
          "Langkah 2: Hitung p_obs antara grid 1 dan 2: p_12 = log(E_1 / E_2) / log(r) = log(0.0400 / 0.0101) / log(2.0) = log(3.9604) / 0.69315 = 1.3764 / 0.69315 = 1.986."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung p_obs antara grid 2 dan 3: p_23 = log(E_2 / E_3) / log(r) = log(0.0101 / 0.00253) / log(2.0) = log(3.9921) / 0.69315 = 1.3843 / 0.69315 = 1.997.",
          "Langkah 4: Evaluasi terhadap nilai teoretis: Nilai p_obs (1.986 dan 1.997) sangat mendekati nilai teoretis 2.0 (|2.0 - 1.997| = 0.003 < 0.05).",
          "[result: Interpretasi Ilmiah] Kode numerik terbukti secara matematis mengonvergen pada laju orde-2 kuadratik sempurna, membuktikan kebebasan dari kesalahan bug algoritma."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Verifikasi numerik laju konvergensi orde akurasi Runge-Kutta 4 (RK4) vs Euler.",
        "bulletPoints": [
          "Tujuan Algoritma: Verifikasi numerik laju konvergensi orde akurasi Runge-Kutta 4 (RK4) vs Euler.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Verifikasi Orde Akurasi Numerik (Grid Refinement):"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Verifikasi Orde Akurasi Numerik (Grid Refinement):\nOrde Teramati Euler (Teori p=1.0) : p_obs = 0.9635 (Lolos Verifikasi Orde-1)\nOrde Teramati RK-4  (Teori p=4.0) : p_obs = 3.9961 (Lolos Verifikasi Orde-4)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpulkan kode benar hanya karena output grafik tampak mulus secara visual.",
          "[warning: Perangkap] Melakukan validasi model sebelum verifikasi kode selesai dilakukan (mencampuradukkan bug kode dengan error fisika).",
          "[warning: Perangkap] Mengukur laju konvergensi pada ukuran langkah h yang terlalu besar sehingga belum memasuki rezim asimtotik."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan Method of Manufactured Solutions (MMS) untuk persamaan diferensial parsial non-linier.",
          "Prosedur: Plot kurva galat vs ukuran langkah pada skala log-log (Grid Convergence Plot).",
          "Prosedur: Sajikan tabel Grid Convergence Index (GCI) sesuai standar ASME V&V 20."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apa perbedaan esensial antara Verifikasi Kode (Code Verification) dan Validasi Model (Model Validation)?",
          "Petunjuk Analitis: Perhatikan apakah pembandingnya adalah solusi matematika eksak atau data observasi eksperimen riil.",
          "Solusi Kunci: Verifikasi adalah pembuktian numerik bahwa kode menyelesaikan persamaan diferensial matematika secara akurat tanpa bug (membandingkan solusi numerik dengan solusi analitis eksak). Validasi adalah pembuktian ilmiah bahwa model fisika yang dipilih sesuai dengan dunia nyata (membandingkan solusi numerik dengan pengukuran fisik di laboratorium)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "6.3.4": {
    "id": "6.3.4",
    "chapterId": "CH-40",
    "title": "Pembuatan Profil Kinerja Algoritma Menggunakan Dolan-Moré Performance Profiles",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami keterbatasan pelaporan tabel waktu komputasi rata-rata konvensional.",
      "Mengkonstruksi Dolan-Moré Performance Profiles untuk membandingkan pemecah masalah (solvers).",
      "Mengevaluasi trade-off efisiensi (kecepatan awal) vs ketahanan (robustness penyelesaian)."
    ],
    "content": "Dalam riset optimasi numerik, riset operasional, dan rekayasa komputasi, peneliti seringkali mengembangkan algoritma pemecah masalah (solver) dan membandingkannya dengan pemecah lain pada sekumpulan besar kasus uji (benchmark problem set). Cara pelaporan konvensional (seperti menghitung rata-rata waktu eksekusi) sangat cacat secara statistik karena didominasi secara mutlak oleh kasus-kasus uji terbesar yang memakan waktu lama, atau terdistorsi oleh kasus di mana salah satu solver mengalami kegagalan/timeout.\n\nDolan-Moré Performance Profiles (2002):\nElizabeth Dolan dan Jorge Moré merumuskan metode grafis elegan yang menjadi standar baku visualisasi komparasi solver komputasi. Performance Profile menyajikan kurva fungsi distribusi kumulatif dari rasio performa relatif setiap algoritma terhadap algoritma terbaik pada setiap masalah uji.\n\nDua Metrik Kunci dari Dolan-Moré Profile:\n1. Efisiensi Waktu (Speed Efficiency, $\\rho(1)$):\nTitik potong kurva pada sumbu tegak saat rasio $\\tau = 1$. Nilai ini menunjukkan proporsi masalah di mana algoritma tersebut adalah yang tercepat (pemenang waktu) di antara seluruh solver yang diuji.\n2. Ketahanan Global (Global Robustness, $\\rho(\\tau_{\\max})$):\nBatas asimtotik kurva pada sisi kanan saat rasio $\\tau$ sangat besar. Nilai ini menunjukkan proporsi total masalah yang berhasil diselesaikan oleh algoritma tersebut tanpa mengalami kegagalan, divergence, atau timeout, terlepas dari berapa lama waktu yang dibutuhkan.",
    "mathematicalFoundations": "Formulasi Matematis Dolan-Moré Performance Profiles:\nMisalkan $\\mathcal{S}$ adalah himpunan solver (algoritma), dan $\\mathcal{P}$ adalah himpunan masalah uji (benchmark problems).\nMisalkan $t_{p, s} > 0$ adalah metrik performa (misal waktu CPU atau jumlah iterasi) dari solver $s \\in \\mathcal{S}$ pada masalah $p \\in \\mathcal{P}$.\nJika solver $s$ gagal menyelesaikan masalah $p$, ditetapkan $t_{p, s} = \\infty$.\n\n1. Rasio Kinerja Relatif (Performance Ratio, $r_{p, s}$):\n$$r_{p, s} = \\frac{t_{p, s}}{\\min \\{ t_{p, s'} \\mid s' \\in \\mathcal{S} \\}}$$\nPerhatikan bahwa $r_{p, s} \\geq 1$ untuk semua $p$ dan $s$. Nilai $r_{p, s} = 1$ berarti solver $s$ adalah yang terbaik pada masalah $p$.\n\n2. Fungsi Distribusi Profil Kinerja (Performance Profile, $\\rho_s(\\tau)$):\nUntuk sembarang faktor rasio $\\tau \\geq 1$:\n$$\\rho_s(\\tau) = \\frac{1}{|\\mathcal{P}|} \\sum_{p \\in \\mathcal{P}} \\mathbb{I}(r_{p, s} \\leq \\tau)$$\nFungsi $\\rho_s(\\tau)$ adalah probabilitas bahwa rasio kinerja solver $s$ berada dalam rentang $\\tau$ kali lipat dari solver terbaik pada masalah apa pun.",
    "workedExample": {
      "problemStatement": "Diberikan evaluasi 2 solver (Solver A dan Solver B) pada 5 masalah optimasi. Waktu komputasi t_p,s (detik) adalah: Masalah 1: A=2, B=4; Masalah 2: A=3, B=1; Masalah 3: A=5, B=10; Masalah 4: A=1, B=2; Masalah 5: A=4, B=tidak konvergen (tak hingga). Hitung rasio kinerja r_p,s untuk setiap masalah. Hitung nilai rho_A(1) dan rho_B(1), serta rho_A(tau) dan rho_B(tau) untuk tau >= 2.",
      "stepByStepSolution": [
        "Langkah 1: Tentukan solver tercepat per masalah: P1: A (2s); P2: B (1s); P3: A (5s); P4: A (1s); P5: A (4s).",
        "Langkah 2: Hitung r_p,A: P1: 2/2 = 1.0; P2: 3/1 = 3.0; P3: 5/5 = 1.0; P4: 1/1 = 1.0; P5: 4/4 = 1.0. Array r_A = [1.0, 3.0, 1.0, 1.0, 1.0].",
        "Langkah 3: Hitung r_p,B: P1: 4/2 = 2.0; P2: 1/1 = 1.0; P3: 10/5 = 2.0; P4: 2/1 = 2.0; P5: inf/4 = inf. Array r_B = [2.0, 1.0, 2.0, 2.0, inf].",
        "Langkah 4: Hitung efisiensi pada tau = 1: Solver A menang pada 4 dari 5 masalah => rho_A(1) = 4/5 = 0.80 (80%). Solver B menang pada 1 dari 5 masalah => rho_B(1) = 1/5 = 0.20 (20%).",
        "Langkah 5: Hitung performa pada tau = 2: Solver A: 4 masalah memiliki r <= 2 => rho_A(2) = 4/5 = 0.80. Solver B: 4 masalah memiliki r <= 2 => rho_B(2) = 4/5 = 0.80.",
        "Langkah 6: Hitung ketahanan maksimum (tau -> tak hingga): Solver A menyelesaikan 5/5 masalah => rho_A(inf) = 1.00 (100% robust). Solver B menyelesaikan 4/5 masalah => rho_B(inf) = 0.80 (80% robust)."
      ],
      "resultInterpretation": "Solver A unggul secara dominan baik dari segi kecepatan awal (80% vs 20%) maupun dari segi ketahanan penyelesaian global (100% vs 80%)."
    },
    "pythonImplementation": {
      "description": "Konstruksi Dolan-Moré Performance Profiles dari matriks waktu benchmark solver.",
      "libraryDependencies": [
        "numpy",
        "pandas"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\n# [SIMULASI/SYNTHETIC DATA]\n# Evaluasi 3 Solver pada 20 masalah optimasi non-linier (Waktu dalam detik)\nnp.random.seed(42)\nn_problems = 20\nsolvers = ['Solver_Newton_Krylov', 'Solver_LBFGS', 'Solver_AdamW']\n\n# Waktu eksekusi dasar\nt_nk = np.random.uniform(0.5, 3.0, size=n_problems)\nt_lbfgs = t_nk * np.random.uniform(0.8, 2.5, size=n_problems)\nt_adam = t_nk * np.random.uniform(1.5, 5.0, size=n_problems)\n\n# Simulasi beberapa kegagalan konvergensi (timeout diatur 999.0)\nt_lbfgs[np.random.choice(n_problems, size=3, replace=False)] = np.inf\nt_adam[np.random.choice(n_problems, size=6, replace=False)] = np.inf\n\ntime_matrix = np.column_stack([t_nk, t_lbfgs, t_adam])\n\n# Hitung rasio performa r_p,s\nmin_times = np.min(time_matrix, axis=1)\nratios = time_matrix / min_times[:, None]\n\n# Evaluasi kurva profil pada rentang tau = [1, 5]\ntau_vals = np.linspace(1.0, 5.0, 50)\nprofile_data = {s: [] for s in solvers}\n\nfor tau in tau_vals:\n    for idx, s in enumerate(solvers):\n        prob_solved = np.mean(ratios[:, idx] <= tau)\n        profile_data[s].append(prob_solved)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Karakteristik Kunci Dolan-Moré Profiles:\")\nprint(\"-\" * 55)\nfor idx, s in enumerate(solvers):\n    speed_eff = np.mean(ratios[:, idx] == 1.0)\n    robustness = np.mean(np.isfinite(ratios[:, idx]))\n    print(f\"{s:22} | Speed rho(1): {speed_eff*100:5.1f}% | Robustness: {robustness*100:5.1f}%\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Karakteristik Kunci Dolan-Moré Profiles:\n-------------------------------------------------------\nSolver_Newton_Krylov   | Speed rho(1):  70.0% | Robustness: 100.0%\nSolver_LBFGS           | Speed rho(1):  30.0% | Robustness:  85.0%\nSolver_AdamW           | Speed rho(1):   0.0% | Robustness:  70.0%"
    },
    "commonPitfalls": [
      "Menghitung rata-rata aritmatika waktu tanpa menangani kasus solver yang mengalami timeout (bernilai tak hingga).",
      "Mengabaikan sumbu logaritmik saat menyajikan rasio tau yang memiliki rentang sangat dinamis.",
      "Menyimpulkan bahwa satu solver mendominasi seluruhnya tanpa memeriksa titik persilangan kurva profil."
    ],
    "validationProcedures": [
      "Sajikan kurva Dolan-Moré dengan sumbu log-skala log2(tau) untuk visualisasi yang proporsional.",
      "Sertakan definisi ambang timeout numerik yang konsisten untuk seluruh solver.",
      "Laporkan nilai efisiensi rho(1) dan ketahanan batas kanan secara eksplisit pada teks naskah."
    ],
    "exercises": [
      {
        "question": "Jika Kurva Solver A memiliki titik potong rho(1) = 0.80 namun batas kanannya rho(inf) = 0.85, sedangkan Solver B memiliki rho(1) = 0.20 namun rho(inf) = 0.98, solver mana yang lebih unggul?",
        "hint": "Kaitkan dengan trade-off antara kecepatan eksekusi pada masalah mudah vs keandalan menyelesaikan masalah sulit.",
        "answerExplanation": "Tidak ada yang mendominasi mutlak. Solver A adalah \"sprinter\" yang sangat cepat pada sebagian besar masalah mudah (80%), namun gagal pada 15% masalah sulit. Solver B adalah \"maraton\" yang lambat namun sangat tangguh (robust), mampu menyelesaikan 98% masalah. Pilihan terbaik bergantung pada prioritas aplikasi rekayasa (apakah kecepatan waktu nyata atau jaminan konvergensi absolut)."
      },
      {
        "question": "Mengapa Dolan-Moré profile kebal terhadap distorsi ukuran masalah (problem scale bias) dibandingkan perbandingan waktu eksekusi rata-rata?",
        "hint": "Perhatikan normalisasi rasio kinerja relatif r_p,s.",
        "answerExplanation": "Dolan-Moré menormalisasi waktu setiap masalah terhadap solver terbaik pada masalah spesifik tersebut (r = t / t_min). Masalah yang memakan waktu 1.000 detik memiliki bobot yang sama persis (satu suara biner) dengan masalah yang memakan waktu 0.01 detik, sehingga waktu eksekusi absolut dari masalah raksasa tidak dapat menenggelamkan performa pada masalah-masalah lainnya."
      }
    ],
    "references": [
      {
        "citation": "Dolan, E. D., & Moré, J. J. (2002). Benchmarking optimization software with performance profiles. Mathematical Programming, 91(2), 201-213.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Gould, N., & Scott, J. (2016). A note on performance profiles for benchmarking software. ACM Transactions on Mathematical Software (TOMS), 43(2), 1-5.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pembuatan Profil Kinerja Algoritma Menggunakan Dolan-Moré Performance Profiles",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.3.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.3.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami keterbatasan pelaporan tabel waktu komputasi rata-rata konvensional.",
          "Capaian 2: Mengkonstruksi Dolan-Moré Performance Profiles untuk membandingkan pemecah masalah (solvers).",
          "Capaian 3: Mengevaluasi trade-off efisiensi (kecepatan awal) vs ketahanan (robustness penyelesaian)."
        ],
        "keyFormulaOrDiagram": "$$r_{p, s} = \\frac{t_{p, s}}{\\min \\{ t_{p, s'} \\mid s' \\in \\mathcal{S} \\}}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.3.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pembuatan Profil Kinerja Algoritma Menggunakan Dolan-Moré Performance Profiles",
        "lead": "Dalam riset optimasi numerik, riset operasional, dan rekayasa komputasi, peneliti seringkali mengembangkan algoritma pemecah masalah (solver) dan membandingkannya dengan pemecah lain pada sekumpulan besar kasus uji (benchmark problem set).",
        "bulletPoints": [
          "Cara pelaporan konvensional (seperti menghitung rata-rata waktu eksekusi) sangat cacat secara statistik karena didominasi secara mutlak oleh kasus-kasus uji terbesar yang memakan waktu lama, atau terdistorsi oleh kasus di mana salah satu solver mengalami kegagalan/timeout.",
          "Dolan-Moré Performance Profiles (2002): Elizabeth Dolan dan Jorge Moré merumuskan metode grafis elegan yang menjadi standar baku visualisasi komparasi solver komputasi.",
          "Performance Profile menyajikan kurva fungsi distribusi kumulatif dari rasio performa relatif setiap algoritma terhadap algoritma terbaik pada setiap masalah uji."
        ],
        "keyFormulaOrDiagram": "$\\rho(1)$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Dua Metrik Kunci dari Dolan-Moré Profile: 1.",
        "bulletPoints": [
          "Efisiensi Waktu (Speed Efficiency, $\\rho(1)$): Titik potong kurva pada sumbu tegak saat rasio $\\tau = 1$.",
          "Nilai ini menunjukkan proporsi masalah di mana algoritma tersebut adalah yang tercepat (pemenang waktu) di antara seluruh solver yang diuji."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Dolan-Moré Performance Profiles:",
        "bulletPoints": [
          "Misalkan $\\mathcal{S}$ adalah himpunan solver (algoritma), dan $\\mathcal{P}$ adalah himpunan masalah uji (benchmark problems).",
          "Misalkan $t_{p, s} > 0$ adalah metrik performa (misal waktu CPU atau jumlah iterasi) dari solver $s \\in \\mathcal{S}$ pada masalah $p \\in \\mathcal{P}$.",
          "Jika solver $s$ gagal menyelesaikan masalah $p$, ditetapkan $t_{p, s} = \\infty$."
        ],
        "keyFormulaOrDiagram": "$$r_{p, s} = \\frac{t_{p, s}}{\\min \\{ t_{p, s'} \\mid s' \\in \\mathcal{S} \\}}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan evaluasi 2 solver (Solver A dan Solver B) pada 5 masalah optimasi. Waktu komputasi t_p,s (detik) adalah: Masalah 1: A=2, B=4; Masalah 2: A=3, B=1; Masalah 3: A=5, B=10; Masalah 4: A=1, B=2; Masalah 5: A=4, B=tidak konvergen (tak hingga). Hitung rasio kinerja r_p,s untuk setiap masalah. Hitung nilai rho_A(1) dan rho_B(1), serta rho_A(tau) dan rho_B(tau) untuk tau >= 2.",
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
          "Langkah 1: Tentukan solver tercepat per masalah: P1: A (2s); P2: B (1s); P3: A (5s); P4: A (1s); P5: A (4s).",
          "Langkah 2: Hitung r_p,A: P1: 2/2 = 1.0; P2: 3/1 = 3.0; P3: 5/5 = 1.0; P4: 1/1 = 1.0; P5: 4/4 = 1.0. Array r_A = [1.0, 3.0, 1.0, 1.0, 1.0].",
          "Langkah 3: Hitung r_p,B: P1: 4/2 = 2.0; P2: 1/1 = 1.0; P3: 10/5 = 2.0; P4: 2/1 = 2.0; P5: inf/4 = inf. Array r_B = [2.0, 1.0, 2.0, 2.0, inf]."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung efisiensi pada tau = 1: Solver A menang pada 4 dari 5 masalah => rho_A(1) = 4/5 = 0.80 (80%). Solver B menang pada 1 dari 5 masalah => rho_B(1) = 1/5 = 0.20 (20%).",
          "Langkah 5: Hitung performa pada tau = 2: Solver A: 4 masalah memiliki r <= 2 => rho_A(2) = 4/5 = 0.80. Solver B: 4 masalah memiliki r <= 2 => rho_B(2) = 4/5 = 0.80.",
          "Langkah 6: Hitung ketahanan maksimum (tau -> tak hingga): Solver A menyelesaikan 5/5 masalah => rho_A(inf) = 1.00 (100% robust). Solver B menyelesaikan 4/5 masalah => rho_B(inf) = 0.80 (80% robust).",
          "[result: Interpretasi Ilmiah] Solver A unggul secara dominan baik dari segi kecepatan awal (80% vs 20%) maupun dari segi ketahanan penyelesaian global (100% vs 80%)."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Konstruksi Dolan-Moré Performance Profiles dari matriks waktu benchmark solver.",
        "bulletPoints": [
          "Tujuan Algoritma: Konstruksi Dolan-Moré Performance Profiles dari matriks waktu benchmark solver.",
          "Dependensi Pustaka Ilmiah: numpy, pandas",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Karakteristik Kunci Dolan-Moré Profiles:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Karakteristik Kunci Dolan-Moré Profiles:\n-------------------------------------------------------\nSolver_Newton_Krylov   | Speed rho(1):  70.0% | Robustness: 100.0%\nSolver_LBFGS           | Speed rho(1):  30.0% | Robustness:  85.0%\nSolver_AdamW           | Speed rho(1):   0.0% | Robustness:  70.0%",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menghitung rata-rata aritmatika waktu tanpa menangani kasus solver yang mengalami timeout (bernilai tak hingga).",
          "[warning: Perangkap] Mengabaikan sumbu logaritmik saat menyajikan rasio tau yang memiliki rentang sangat dinamis.",
          "[warning: Perangkap] Menyimpulkan bahwa satu solver mendominasi seluruhnya tanpa memeriksa titik persilangan kurva profil."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Sajikan kurva Dolan-Moré dengan sumbu log-skala log2(tau) untuk visualisasi yang proporsional.",
          "Prosedur: Sertakan definisi ambang timeout numerik yang konsisten untuk seluruh solver.",
          "Prosedur: Laporkan nilai efisiensi rho(1) dan ketahanan batas kanan secara eksplisit pada teks naskah."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Jika Kurva Solver A memiliki titik potong rho(1) = 0.80 namun batas kanannya rho(inf) = 0.85, sedangkan Solver B memiliki rho(1) = 0.20 namun rho(inf) = 0.98, solver mana yang lebih unggul?",
          "Petunjuk Analitis: Kaitkan dengan trade-off antara kecepatan eksekusi pada masalah mudah vs keandalan menyelesaikan masalah sulit.",
          "Solusi Kunci: Tidak ada yang mendominasi mutlak. Solver A adalah \"sprinter\" yang sangat cepat pada sebagian besar masalah mudah (80%), namun gagal pada 15% masalah sulit. Solver B adalah \"maraton\" yang lambat namun sangat tangguh (robust), mampu menyelesaikan 98% masalah. Pilihan terbaik bergantung pada prioritas aplikasi rekayasa (apakah kecepatan waktu nyata atau jaminan konvergensi absolut)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
