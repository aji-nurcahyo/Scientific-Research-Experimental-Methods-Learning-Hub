import { Lesson } from '../types/curriculum';

export const CH30_LESSONS: Record<string, Partial<Lesson>> = {
  "4.7.1": {
    "id": "4.7.1",
    "chapterId": "CH-30",
    "title": "Rasionalisasi Faktorial Fraksional: Prinsip Sparsity of Effects",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami ledakan eksponensial (curse of dimensionality) pada desain faktorial penuh saat k membesar.",
      "Menerapkan Prinsip Sparsity of Effects (Prinsip Pareto) dalam screening eksperimental.",
      "Menghitung rasio reduksi beban eksperimen dengan fraksionasi desain 2^(k-p)."
    ],
    "content": "Desain faktorial penuh 2^k adalah alat eksperimen yang sangat kuat, namun memiliki keterbatasan ekonomi yang drastis ketika jumlah faktor yang ingin diselidiki cukup banyak. Jumlah pengujian bertambah secara eksponensial: untuk k = 4 faktor dibutuhkan 16 run, k = 6 faktor membutuhkan 64 run, k = 8 faktor membutuhkan 256 run, dan k = 10 faktor membutuhkan 1,024 run. Dalam dunia industri atau eksperimen laboratorium fisik berbiaya tinggi, menjalankan ratusan hingga ribuan run eksperimen sering kali mustahil secara anggaran dan waktu.\n\nLebih jauh lagi, pada desain 2^8 (256 run), terdapat 255 derajat kebebasan yang diestimasi. Dari 255 derajat kebebasan tersebut:\n- Hanya 8 derajat kebebasan mewakili Efek Utama.\n- Hanya 28 derajat kebebasan mewakili Interaksi 2-Faktor.\n- Sebanyak 219 derajat kebebasan lainnya (86% dari seluruh kapasitas eksperimen!) dihabiskan semata-mata untuk mengestimasi interaksi 3-faktor, 4-faktor, hingga 8-faktor.\n\nDi sinilah Prinsip Sparsity of Effects (sering disebut Prinsip Pareto dalam DoE) beroperasi: dalam hampir seluruh sistem fisik dan rekayasa riil, respon sistem didominasi secara mutlak oleh segelintir efek utama dan beberapa interaksi dua faktor berorde rendah. Interaksi tiga faktor atau lebih hampir selalu bernilai nol secara praktis dan hanya merupakan noise acak.\n\nRasionalisasi ini melahirkan Desain Faktorial Fraksional (Fractional Factorial Designs, notasi 2^(k-p)). Alih-alih menjalankan seluruh 2^k pengujian, peneliti hanya mengeksekusi sebagian kecil fraksi (1/2, 1/4, 1/8, atau 1/16 bagian dari desain penuh), namun tetap mampu mengidentifikasi efek-efek utama yang kritis dengan presisi tinggi.",
    "mathematicalFoundations": "1. Formulasi Fraksi Desain $2^{k-p}$:\n- $k$: Jumlah faktor fisik yang diselidiki.\n- $p$: Jumlah generator fraksionasi yang ditambahkan.\n- Ukuran eksperimen tereduksi:\n$$N = 2^{k-p} = \\frac{1}{2^p} \\times 2^k$$\nFraksi yang dieksekusi adalah $1 / 2^p$ dari eksperimen faktorial penuh.\nContoh:\n- $2^{4-1}$: Setengah fraksi ($1/2$ fraksi) dari 4 faktor $\\implies N = 2^3 = 8$ run (hemat 50%).\n- $2^{7-3}$: Seperdelapan fraksi ($1/8$ fraksi) dari 7 faktor $\\implies N = 2^4 = 16$ run (hemat 87.5% dari 128 run penuh).\n\n2. Rasio Efisiensi Informasi Derajat Kebebasan:\nPada desain $2^{k-p}$, seluruh $N$ observasi dialokasikan secara efisien untuk mengestimasi parameter-parameter orde rendah yang paling esensial:\n$$\\text{Efisiensi Alokasi} = \\frac{\\text{df}(\\text{Efek Utama}) + \\text{df}(\\text{Interaksi 2-Faktor})}{2^{k-p} - 1}$$\nPada desain screening yang dirancang dengan baik, efisiensi alokasi mendekati 100%, menghilangkan pemborosan sumber daya untuk interaksi orde tinggi.",
    "workedExample": {
      "problemStatement": "Sebuah pabrik semikonduktor ingin menyaring k = 6 parameter proses manufaktur chip (suhu oven, tekanan gas, waktu etsa, konsentrasi plasma, voltase bias, laju aliran reaktan). Biaya satu run pengujian adalah Rp 10.000.000. Bandingkan total biaya antara (a) Desain Faktorial Penuh 2^6 versus (b) Desain Faktorial Fraksional 2^(6-2) (seperempat fraksi).",
      "stepByStepSolution": [
        "Langkah 1: Hitung jumlah run dan biaya untuk Desain Penuh 2^6:\nJumlah run: N_penuh = 2^6 = 64 run.\nTotal Biaya Penuh = 64 * Rp 10.000.000 = Rp 640.000.000.",
        "Langkah 2: Hitung jumlah run dan biaya untuk Desain Fraksional 2^(6-2):\nk = 6, p = 2 generator.\nJumlah run: N_fraksional = 2^(6-2) = 2^4 = 16 run.\nTotal Biaya Fraksional = 16 * Rp 10.000.000 = Rp 160.000.000.",
        "Langkah 3: Hitung penghematan anggaran:\nPenghematan = Rp 640.000.000 - Rp 160.000.000 = Rp 480.000.000 (Penghematan sebesar 75%)."
      ],
      "resultInterpretation": "Desain faktorial fraksional 2^(6-2) memangkas biaya penelitian dari Rp 640 juta menjadi hanya Rp 160 juta (menghemat Rp 480 juta) hanya dengan 16 run pengujian, namun tetap mampu mengidentifikasi parameter-parameter kunci yang mengendalikan kualitas chip semikonduktor."
    },
    "pythonImplementation": {
      "description": "Perbandingan pertumbuhan kombinatorial jumlah run eksperimen faktorial penuh versus faktorial fraksional.",
      "libraryDependencies": [
        "numpy",
        "pandas"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\nk_factors = np.arange(3, 9)\n\nruns_full = 2**k_factors\n# Desain screening fraksional standar industri (16 runs untuk k=4 s.d. 8)\nruns_frac = [2**(k - 1) if k == 3 else 16 for k in k_factors]\nhemat_persen = (1.0 - np.array(runs_frac) / runs_full) * 100\n\ndf_perbandingan = pd.DataFrame({\n    'Jumlah Faktor (k)': k_factors,\n    'Run Penuh (2^k)': runs_full,\n    'Run Fraksional (2^(k-p))': runs_frac,\n    'Penghematan (%)': hemat_persen\n})\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Perbandingan Kapasitas DoE Penuh vs Fraksional\")\nprint(df_perbandingan.to_string(index=False))\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Perbandingan Kapasitas DoE Penuh vs Fraksional\n Jumlah Faktor (k)  Run Penuh (2^k)  Run Fraksional (2^(k-p))  Penghematan (%)\n                 3                8                         4            50.00\n                 4               16                        16             0.00\n                 5               32                        16            50.00\n                 6               64                        16            75.00\n                 7              128                        16            87.50\n                 8              256                        16            93.75"
    },
    "commonPitfalls": [
      "Memaksakan desain faktorial penuh pada banyak faktor (k >= 6) yang menghabiskan seluruh anggaran penelitian pada interaksi orde tinggi yang tidak berguna.",
      "Melakukan fraksionasi tanpa memahami konsekuensi aliasing/confounding antara efek utama dan interaksi.",
      "Mengira bahwa desain fraksional membuang data secara acak (fraksionasi dibangun di atas struktur aljabar grup yang sangat ketat)."
    ],
    "validationProcedures": [
      "Gunakan prinsip sparsity of effects sebagai dasar justifikasi pemilihan desain fraksional.",
      "Pilih fraksionasi yang menjamin derajat kebebasan cukup untuk mengestimasi seluruh faktor kunci.",
      "Rencanakan eksperimen lanjutan (follow-up/foldover) jika interaksi tertentu perlu diurai lebih lanjut."
    ],
    "exercises": [
      {
        "question": "Apakah landasan filosofis dan empiris utama yang menjustifikasi penggunaan Desain Faktorial Fraksional dalam riset rekayasa?",
        "hint": "Prinsip yang menyatakan bahwa sebagian besar variasi sistem dikendalikan oleh sedikit efek utama dan interaksi orde rendah.",
        "answerExplanation": "Prinsip Sparsity of Effects (Prinsip Pareto DoE): Sistem rekayasa nyata hampir selalu didominasi oleh segelintir efek utama dan interaksi orde rendah (2-faktor), sedangkan interaksi orde tinggi (>= 3) sangat jarang terjadi dan dapat diabaikan."
      }
    ],
    "references": [
      {
        "citation": "Box, G. E., & Hunter, J. S. (1961). The 2^(k-p) fractional factorial designs. Technometrics, 3(3), 311-351.",
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
        "layout": "concept",
        "title": "Tinjauan & Capaian: Rasionalisasi Faktorial Fraksional: Prinsip Sparsity of Effects",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.7.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.7.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami ledakan eksponensial (curse of dimensionality) pada desain faktorial penuh saat k membesar.",
          "Capaian 2: Menerapkan Prinsip Sparsity of Effects (Prinsip Pareto) dalam screening eksperimental.",
          "Capaian 3: Menghitung rasio reduksi beban eksperimen dengan fraksionasi desain 2^(k-p)."
        ],
        "keyFormulaOrDiagram": "$$N = 2^{k-p} = \\frac{1}{2^p} \\times 2^k$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.7.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Rasionalisasi Faktorial Fraksional: Prinsip Sparsity of Effects",
        "lead": "Desain faktorial penuh 2^k adalah alat eksperimen yang sangat kuat, namun memiliki keterbatasan ekonomi yang drastis ketika jumlah faktor yang ingin diselidiki cukup banyak.",
        "bulletPoints": [
          "Jumlah pengujian bertambah secara eksponensial: untuk k = 4 faktor dibutuhkan 16 run, k = 6 faktor membutuhkan 64 run, k = 8 faktor membutuhkan 256 run, dan k = 10 faktor membutuhkan 1,024 run.",
          "Dalam dunia industri atau eksperimen laboratorium fisik berbiaya tinggi, menjalankan ratusan hingga ribuan run eksperimen sering kali mustahil secara anggaran dan waktu.",
          "Lebih jauh lagi, pada desain 2^8 (256 run), terdapat 255 derajat kebebasan yang diestimasi.",
          "Dari 255 derajat kebebasan tersebut: - Hanya 8 derajat kebebasan mewakili Efek Utama. - Hanya 28 derajat kebebasan mewakili Interaksi 2-Faktor. - Sebanyak 219 derajat kebebasan lainnya (86% dari seluruh kapasitas eksperimen!) dihabiskan semata-mata untuk mengestimasi interaksi 3-faktor, 4-faktor, hingga 8-faktor."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Di sinilah Prinsip Sparsity of Effects (sering disebut Prinsip Pareto dalam DoE) beroperasi: dalam hampir seluruh sistem fisik dan rekayasa riil, respon sistem didominasi secara mutlak oleh segelintir efek utama dan beberapa interaksi dua faktor berorde rendah.",
        "bulletPoints": [
          "Interaksi tiga faktor atau lebih hampir selalu bernilai nol secara praktis dan hanya merupakan noise acak.",
          "Rasionalisasi ini melahirkan Desain Faktorial Fraksional (Fractional Factorial Designs, notasi 2^(k-p)).",
          "Alih-alih menjalankan seluruh 2^k pengujian, peneliti hanya mengeksekusi sebagian kecil fraksi (1/2, 1/4, 1/8, atau 1/16 bagian dari desain penuh), namun tetap mampu mengidentifikasi efek-efek utama yang kritis dengan presisi tinggi."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Fraksi Desain $2^{k-p}$:",
        "bulletPoints": [
          "- $k$: Jumlah faktor fisik yang diselidiki.",
          "- $p$: Jumlah generator fraksionasi yang ditambahkan.",
          "- Ukuran eksperimen tereduksi:"
        ],
        "keyFormulaOrDiagram": "$$N = 2^{k-p} = \\frac{1}{2^p} \\times 2^k$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah pabrik semikonduktor ingin menyaring k = 6 parameter proses manufaktur chip (suhu oven, tekanan gas, waktu etsa, konsentrasi plasma, voltase bias, laju aliran reaktan). Biaya satu run pengujian adalah Rp 10.000.000. Bandingkan total biaya antara (a) Desain Faktorial Penuh 2^6 versus (b) Desain Faktorial Fraksional 2^(6-2) (seperempat fraksi).",
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
          "Langkah 1: Hitung jumlah run dan biaya untuk Desain Penuh 2^6:\nJumlah run: N_penuh = 2^6 = 64 run.\nTotal Biaya Penuh = 64 * Rp 10.000.000 = Rp 640.000.000.",
          "Langkah 2: Hitung jumlah run dan biaya untuk Desain Fraksional 2^(6-2):\nk = 6, p = 2 generator.\nJumlah run: N_fraksional = 2^(6-2) = 2^4 = 16 run.\nTotal Biaya Fraksional = 16 * Rp 10.000.000 = Rp 160.000.000."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung penghematan anggaran:\nPenghematan = Rp 640.000.000 - Rp 160.000.000 = Rp 480.000.000 (Penghematan sebesar 75%).",
          "[result: Interpretasi Ilmiah] Desain faktorial fraksional 2^(6-2) memangkas biaya penelitian dari Rp 640 juta menjadi hanya Rp 160 juta (menghemat Rp 480 juta) hanya dengan 16 run pengujian, namun tetap mampu mengidentifikasi parameter-parameter kunci yang mengendalikan kualitas chip semikonduktor."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Perbandingan pertumbuhan kombinatorial jumlah run eksperimen faktorial penuh versus faktorial fraksional.",
        "bulletPoints": [
          "Tujuan Algoritma: Perbandingan pertumbuhan kombinatorial jumlah run eksperimen faktorial penuh versus faktorial fraksional.",
          "Dependensi Pustaka Ilmiah: numpy, pandas",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Perbandingan Kapasitas DoE Penuh vs Fraksional"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Perbandingan Kapasitas DoE Penuh vs Fraksional\n Jumlah Faktor (k)  Run Penuh (2^k)  Run Fraksional (2^(k-p))  Penghematan (%)\n                 3                8                         4            50.00\n                 4               16                        16             0.00\n                 5               32                        16            50.00",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Memaksakan desain faktorial penuh pada banyak faktor (k >= 6) yang menghabiskan seluruh anggaran penelitian pada interaksi orde tinggi yang tidak berguna.",
          "[warning: Perangkap] Melakukan fraksionasi tanpa memahami konsekuensi aliasing/confounding antara efek utama dan interaksi.",
          "[warning: Perangkap] Mengira bahwa desain fraksional membuang data secara acak (fraksionasi dibangun di atas struktur aljabar grup yang sangat ketat)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan prinsip sparsity of effects sebagai dasar justifikasi pemilihan desain fraksional.",
          "Prosedur: Pilih fraksionasi yang menjamin derajat kebebasan cukup untuk mengestimasi seluruh faktor kunci.",
          "Prosedur: Rencanakan eksperimen lanjutan (follow-up/foldover) jika interaksi tertentu perlu diurai lebih lanjut."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apakah landasan filosofis dan empiris utama yang menjustifikasi penggunaan Desain Faktorial Fraksional dalam riset rekayasa?",
          "Petunjuk Analitis: Prinsip yang menyatakan bahwa sebagian besar variasi sistem dikendalikan oleh sedikit efek utama dan interaksi orde rendah.",
          "Solusi Kunci: Prinsip Sparsity of Effects (Prinsip Pareto DoE): Sistem rekayasa nyata hampir selalu didominasi oleh segelintir efek utama dan interaksi orde rendah (2-faktor), sedangkan interaksi orde tinggi (>= 3) sangat jarang terjadi dan dapat diabaikan."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.7.2": {
    "id": "4.7.2",
    "chapterId": "CH-30",
    "title": "Konstruksi Desain 2^(k-p): Relasi Generator dan Struktur Aliasing (Confounding)",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Mengkonstruksi matriks desain 2^(k-p) menggunakan relasi generator (design generators).",
      "Menurunkan Persamaan Identitas (Defining Relation) menggunakan aljabar modulo-2.",
      "Memetakan Struktur Aliasing (Alias Patterns) untuk mengidentifikasi efek-efek yang terbaur (confounded)."
    ],
    "content": "Ketika kita memutuskan untuk menjalankan hanya sebagian fraksi dari desain faktorial penuh, timbul konsekuensi aljabar yang tidak dapat dihindari: hilangnya sebagian derajat kebebasan menyebabkan beberapa efek terbaur (confounded atau aliased) satu sama lain. Dua efek yang saling ter-alias tidak dapat dipisahkan secara independen oleh data dari eksperimen tersebut.\n\nKonstruksi Desain via Generator:\nUntuk membangun desain fraksional 2^(k-p):\n1. Pilih k - p faktor dasar dan bentuk matriks faktorial penuh 2^(k-p).\n2. Tambahkan p faktor baru dengan menyamakan level faktor baru tersebut terhadap kolom interaksi faktor-faktor dasar. Persamaan penetapan ini disebut Generator Desain (Design Generator).\n\nPersamaan Identitas (Defining Relation):\nDalam aljabar desain faktorial dua level, perkalian sebuah kolom dengan dirinya sendiri menghasilkan kolom konstanta +1 murni yang disebut Elemen Identitas I:\n$$x_j \\cdot x_j = x_j^2 = I$$\nJika faktor keempat D ditetapkan sebagai D = ABC, maka dengan mengalikan kedua sisi dengan D diperoleh:\n$$I = ABCD$$\nPersamaan I = ABCD disebut sebagai Persamaan Identitas (Defining Relation).\n\nStruktur Aliasing (Alias Structure):\nStruktur alias dari setiap efek diperoleh dengan mengalikan efek tersebut dengan persamaan identitas. Misalnya, jika I = ABCD:\n$$A \\cdot I = A \\cdot (ABCD) \\implies A = A^2 BCD = I \\cdot BCD = BCD$$\nArtinya, Efek Utama A ter-alias sempurna dengan Interaksi Tiga Faktor BCD (ditulis [A] = A + BCD). Ketika peneliti menghitung estimasi kontras untuk A, angka yang diperoleh sebenarnya adalah jumlah dari efek A dan efek BCD. Berdasarkan prinsip sparsity of effects, karena BCD diasumsikan nol, estimasi tersebut murni mencerminkan efek utama A.",
    "mathematicalFoundations": "1. Aritmatika Aljabar Desain Faktorial:\n- Elemen identitas: $I = (1, 1, \\dots, 1)^T$.\n- Sifat idempoten kuadratik: Untuk setiap faktor $X$, $X^2 = I$.\n- Sifat komutatif: $AB = BA$.\n\n2. Pola Aliasing pada Desain Setengah Fraksi $2^{4-1}$ dengan Generator $D = ABC$:\nPersamaan Identitas:\n$$I = ABCD$$\nPanjang kata identitas (*word length*) adalah 4.\n\nStruktur Aliasing Lengkap:\n- Efek Utama ter-alias dengan Interaksi 3-Faktor:\n  - $[A] = A \\cdot I = A(ABCD) = A + BCD$\n  - $[B] = B \\cdot I = B(ABCD) = B + ACD$\n  - $[C] = C \\cdot I = C(ABCD) = C + ABD$\n  - $[D] = D \\cdot I = D(ABCD) = D + ABC$\n- Interaksi 2-Faktor ter-alias berpasangan:\n  - $[AB] = AB(ABCD) = A^2 B^2 CD = CD \\implies [AB] = AB + CD$\n  - $[AC] = AC(ABCD) = BD \\implies [AC] = AC + BD$\n  - $[AD] = AD(ABCD) = BC \\implies [AD] = AD + BC$\n\n3. Interpretasi Estimasi:\nKontras yang dihitung dari kolom AB mengestimasi besaran $\\beta_{AB} + \\beta_{CD}$. Jika nilai kontras terbukti signifikan, data tidak dapat membedakan apakah efek tersebut berasal dari interaksi AB atau interaksi CD (keduanya saling terbaur).",
    "workedExample": {
      "problemStatement": "Diberikan desain fraksional 2^(3-1) dengan 3 faktor (A, B, C) dalam 4 run, di mana faktor C ditetapkan melalui generator C = AB. Tentukan persamaan identitas I, turunkan struktur aliasing untuk seluruh efek, dan jelaskan apakah efek utama A terbebas dari bias interaksi 2-faktor.",
      "stepByStepSolution": [
        "Langkah 1: Tuliskan relasi generator: C = AB.",
        "Langkah 2: Kalikan kedua sisi dengan C untuk mendapatkan Persamaan Identitas:\nC * C = AB * C\nI = ABC.",
        "Langkah 3: Turunkan alias untuk setiap efek dengan mengalikan terhadap I = ABC:\n- Efek A: A * I = A * (ABC) = A^2 BC = I * BC = BC -> [A] = A + BC.\n- Efek B: B * I = B * (ABC) = A B^2 C = AC -> [B] = B + AC.\n- Efek C: C * I = C * (ABC) = AB C^2 = AB -> [C] = C + AB.",
        "Langkah 4: Evaluasi keterbauran efek utama A:\n[A] = A + BC."
      ],
      "resultInterpretation": "Efek utama A ter-alias langsung dengan interaksi dua faktor BC. Jika interaksi antara suhu dan tekanan (BC) besar, nilai estimasi A akan terdistorsi secara langsung. Ini menunjukkan bahwa desain 2^(3-1) memiliki kelemahan di mana efek utama terbaur dengan interaksi 2-faktor."
    },
    "pythonImplementation": {
      "description": "Konstruksi matriks desain fraksional 2^(4-1) dengan generator D = ABC dan audit struktur aliasing.",
      "libraryDependencies": [
        "numpy",
        "pandas"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\n# 3 faktor dasar: A, B, C (2^3 = 8 runs)\nlevels = [-1, 1]\ngrid = np.array(np.meshgrid(levels, levels, levels)).T.reshape(-1, 3)\nurutan = np.lexsort((grid[:, 0], grid[:, 1], grid[:, 2]))\nX_base = grid[urutan]\n\nA = X_base[:, 0]\nB = X_base[:, 1]\nC = X_base[:, 2]\n\n# Generator: D = A * B * C\nD = A * B * C\n\n# Susun matriks desain fraksional 2^(4-1)\ndf_frac = pd.DataFrame({\n    'Run': np.arange(1, 9),\n    'A': A, 'B': B, 'C': C, 'D': D,\n    'AB': A * B, 'CD': C * D\n})\n\n# Verifikasi kolom AB identik dengan CD (Aliased)\nis_aliased_ab_cd = np.array_equal(df_frac['AB'], df_frac['CD'])\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Desain Faktorial Fraksional 2^(4-1) (Generator D = ABC)\")\nprint(df_frac.to_string(index=False))\nprint(f\"\\nVerifikasi Kolom AB == Kolom CD (Ter-alias Sempurna): {is_aliased_ab_cd}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Desain Faktorial Fraksional 2^(4-1) (Generator D = ABC)\n Run   A   B   C   D  AB  CD\n   1 -1 -1 -1 -1   1   1\n   2  1 -1 -1  1  -1  -1\n   3 -1  1 -1  1  -1  -1\n   4  1  1 -1 -1   1   1\n   5 -1 -1  1  1   1   1\n   6  1 -1  1 -1  -1  -1\n   7 -1  1  1 -1  -1  -1\n   8  1  1  1  1   1   1\n\nVerifikasi Kolom AB == Kolom CD (Ter-alias Sempurna): True"
    },
    "commonPitfalls": [
      "Menetapkan generator secara sembarangan yang menghasilkan kata identitas terlalu pendek sehingga membaurkan efek utama dengan efek utama lainnya.",
      "Mengira bahwa dua efek yang ter-alias dapat dipisahkan tanpa melakukan pengujian tambahan (foldover).",
      "Lupa mengalikan kata identitas ketika ada lebih dari satu generator (misal desain 2^(k-2) memiliki 3 kata identitas: I = W1 = W2 = W1W2)."
    ],
    "validationProcedures": [
      "Tuliskan seluruh persamaan identitas secara lengkap termasuk produk interaksinya.",
      "Periksa struktur alias untuk memastikan tidak ada efek utama yang ter-alias dengan efek utama lainnya.",
      "Dokumentasikan rantai keterbauran (alias chains) pada laporan hasil eksperimen."
    ],
    "exercises": [
      {
        "question": "Pada desain faktorial fraksional dengan persamaan identitas I = ABCD, apakah alias dari interaksi dua faktor AC?",
        "hint": "Kalikan suku AC dengan persamaan identitas ABCD dan sederhanakan suku kuadrat.",
        "answerExplanation": "AC * I = AC * (ABCD) = A^2 C^2 BD = (1)(1) BD = BD. Maka interaksi AC ter-alias sempurna dengan interaksi BD ([AC] = AC + BD)."
      }
    ],
    "references": [
      {
        "citation": "Box, G. E., & Hunter, J. S. (1961). The 2^(k-p) fractional factorial designs. Technometrics, 3(3), 311-351.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Konstruksi Desain 2^(k-p): Relasi Generator dan Struktur Aliasing (Confounding)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.7.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.7.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengkonstruksi matriks desain 2^(k-p) menggunakan relasi generator (design generators).",
          "Capaian 2: Menurunkan Persamaan Identitas (Defining Relation) menggunakan aljabar modulo-2.",
          "Capaian 3: Memetakan Struktur Aliasing (Alias Patterns) untuk mengidentifikasi efek-efek yang terbaur (confounded)."
        ],
        "keyFormulaOrDiagram": "$$I = ABCD$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.7.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Konstruksi Desain 2^(k-p): Relasi Generator dan Struktur Aliasing (Confounding)",
        "lead": "Ketika kita memutuskan untuk menjalankan hanya sebagian fraksi dari desain faktorial penuh, timbul konsekuensi aljabar yang tidak dapat dihindari: hilangnya sebagian derajat kebebasan menyebabkan beberapa efek terbaur (confounded atau aliased) satu sama lain.",
        "bulletPoints": [
          "Dua efek yang saling ter-alias tidak dapat dipisahkan secara independen oleh data dari eksperimen tersebut.",
          "Konstruksi Desain via Generator: Untuk membangun desain fraksional 2^(k-p): 1.",
          "Pilih k - p faktor dasar dan bentuk matriks faktorial penuh 2^(k-p)."
        ],
        "keyFormulaOrDiagram": "$$x_j \\cdot x_j = x_j^2 = I$$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Persamaan Identitas (Defining Relation): Dalam aljabar desain faktorial dua level, perkalian sebuah kolom dengan dirinya sendiri menghasilkan kolom konstanta +1 murni yang disebut Elemen Identitas I: $$x_j \\cdot x_j = x_j^2 = I$$ Jika faktor keempat D ditetapkan sebagai D = ABC, maka dengan mengalikan kedua sisi dengan D diperoleh: $$I = ABCD$$ Persamaan I = ABCD disebut sebagai Persamaan Identitas (Defining Relation).",
        "bulletPoints": [
          "Struktur Aliasing (Alias Structure): Struktur alias dari setiap efek diperoleh dengan mengalikan efek tersebut dengan persamaan identitas.",
          "Misalnya, jika I = ABCD: $$A \\cdot I = A \\cdot (ABCD) \\implies A = A^2 BCD = I \\cdot BCD = BCD$$ Artinya, Efek Utama A ter-alias sempurna dengan Interaksi Tiga Faktor BCD (ditulis [A] = A + BCD)."
        ],
        "keyFormulaOrDiagram": "$$A \\cdot I = A \\cdot (ABCD) \\implies A = A^2 BCD = I \\cdot BCD = BCD$$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Aritmatika Aljabar Desain Faktorial:",
        "bulletPoints": [
          "- Elemen identitas: $I = (1, 1, \\dots, 1)^T$.",
          "- Sifat idempoten kuadratik: Untuk setiap faktor $X$, $X^2 = I$.",
          "- Sifat komutatif: $AB = BA$."
        ],
        "keyFormulaOrDiagram": "$$I = ABCD$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan desain fraksional 2^(3-1) dengan 3 faktor (A, B, C) dalam 4 run, di mana faktor C ditetapkan melalui generator C = AB. Tentukan persamaan identitas I, turunkan struktur aliasing untuk seluruh efek, dan jelaskan apakah efek utama A terbebas dari bias interaksi 2-faktor.",
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
          "Langkah 1: Tuliskan relasi generator: C = AB.",
          "Langkah 2: Kalikan kedua sisi dengan C untuk mendapatkan Persamaan Identitas:\nC * C = AB * C\nI = ABC."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Turunkan alias untuk setiap efek dengan mengalikan terhadap I = ABC:\n- Efek A: A * I = A * (ABC) = A^2 BC = I * BC = BC -> [A] = A + BC.\n- Efek B: B * I = B * (ABC) = A B^2 C = AC -> [B] = B + AC.\n- Efek C: C * I = C * (ABC) = AB C^2 = AB -> [C] = C + AB.",
          "Langkah 4: Evaluasi keterbauran efek utama A:\n[A] = A + BC.",
          "[result: Interpretasi Ilmiah] Efek utama A ter-alias langsung dengan interaksi dua faktor BC. Jika interaksi antara suhu dan tekanan (BC) besar, nilai estimasi A akan terdistorsi secara langsung. Ini menunjukkan bahwa desain 2^(3-1) memiliki kelemahan di mana efek utama terbaur dengan interaksi 2-faktor."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Konstruksi matriks desain fraksional 2^(4-1) dengan generator D = ABC dan audit struktur aliasing.",
        "bulletPoints": [
          "Tujuan Algoritma: Konstruksi matriks desain fraksional 2^(4-1) dengan generator D = ABC dan audit struktur aliasing.",
          "Dependensi Pustaka Ilmiah: numpy, pandas",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Desain Faktorial Fraksional 2^(4-1) (Generator D = ABC)"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Desain Faktorial Fraksional 2^(4-1) (Generator D = ABC)\n Run   A   B   C   D  AB  CD\n   1 -1 -1 -1 -1   1   1\n   2  1 -1 -1  1  -1  -1\n   3 -1  1 -1  1  -1  -1",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menetapkan generator secara sembarangan yang menghasilkan kata identitas terlalu pendek sehingga membaurkan efek utama dengan efek utama lainnya.",
          "[warning: Perangkap] Mengira bahwa dua efek yang ter-alias dapat dipisahkan tanpa melakukan pengujian tambahan (foldover).",
          "[warning: Perangkap] Lupa mengalikan kata identitas ketika ada lebih dari satu generator (misal desain 2^(k-2) memiliki 3 kata identitas: I = W1 = W2 = W1W2)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Tuliskan seluruh persamaan identitas secara lengkap termasuk produk interaksinya.",
          "Prosedur: Periksa struktur alias untuk memastikan tidak ada efek utama yang ter-alias dengan efek utama lainnya.",
          "Prosedur: Dokumentasikan rantai keterbauran (alias chains) pada laporan hasil eksperimen."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Pada desain faktorial fraksional dengan persamaan identitas I = ABCD, apakah alias dari interaksi dua faktor AC?",
          "Petunjuk Analitis: Kalikan suku AC dengan persamaan identitas ABCD dan sederhanakan suku kuadrat.",
          "Solusi Kunci: AC * I = AC * (ABCD) = A^2 C^2 BD = (1)(1) BD = BD. Maka interaksi AC ter-alias sempurna dengan interaksi BD ([AC] = AC + BD)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.7.3": {
    "id": "4.7.3",
    "chapterId": "CH-30",
    "title": "Resolusi Desain: Resolusi III (Screening Kasar), IV (Bebas Interaksi Utama), dan V",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami klasifikasi formal resolusi desain faktorial (Resolusi III, IV, dan V).",
      "Menghubungkan panjang kata terpendek pada persamaan identitas dengan resolusi desain.",
      "Memilih resolusi yang tepat sesuai tahap kedewasaan riset (screening vs karakterisasi)."
    ],
    "content": "Tidak semua desain faktorial fraksional diciptakan setara. Kualitas, kekuatan inferensial, dan tingkat keamanan suatu desain 2^(k-p) diklasifikasikan secara formal menggunakan konsep Resolusi Desain (Design Resolution), yang dilambangkan dengan angka Romawi (III, IV, V, VI).\n\nSecara matematis, Resolusi Desain didefinisikan sebagai panjang kata terpendek (jumlah huruf minimum) yang terdapat dalam Persamaan Identitas (Defining Relation) desain tersebut. Tiga tingkatan resolusi paling penting dalam rekayasa:\n\n1. Desain Resolusi III:\nPanjang kata terpendek pada persamaan identitas adalah 3 (misal I = ABD).\n- Efek utama TIDAK ter-alias dengan efek utama lainnya.\n- Efek utama TER-ALIAS langsung dengan interaksi dua faktor (misal [A] = A + BD).\n- Kegunaan: Hanya cocok untuk eksperimen screening awal yang sangat kasar (tahap eksplorasi awal dengan banyak faktor), dengan asumsi mutlak bahwa seluruh interaksi 2-faktor bernilai nol.\n\n2. Desain Resolusi IV:\nPanjang kata terpendek pada persamaan identitas adalah 4 (misal I = ABCD).\n- Efek utama TIDAK ter-alias dengan efek utama lainnya dan TIDAK ter-alias dengan interaksi dua faktor. Efek utama hanya ter-alias dengan interaksi 3-faktor ([A] = A + BCD).\n- Interaksi dua faktor saling ter-alias satu sama lain (misal [AB] = AB + CD).\n- Kegunaan: Standar industri paling ideal untuk penyaringan parameter (screening designs). Peneliti dapat mengidentifikasi efek-efek utama secara bersih tanpa kontaminasi interaksi 2-faktor.\n\n3. Desain Resolusi V:\nPanjang kata terpendek pada persamaan identitas adalah 5 (misal I = ABCDE).\n- Efek utama bebas dari efek utama dan interaksi 2-faktor/3-faktor.\n- Interaksi dua faktor TIDAK ter-alias dengan interaksi dua faktor lainnya ([AB] = AB + CDE).\n- Kegunaan: Desain premium untuk karakterisasi proses mendalam dan optimasi presisi tinggi.",
    "mathematicalFoundations": "1. Definisi Formal Resolusi Desain:\nMisalkan $R$ adalah resolusi desain. Maka tidak ada efek orde $p$ yang ter-alias dengan efek orde lain yang kurang dari $R - p$:\n$$p + q \\ge R$$\ndi mana $p$ dan $q$ adalah orde dari dua efek yang saling ter-alias.\n\n- Pada Resolusi III ($R = 3$):\n  - Orde 1 (Efek Utama) + Orde 2 (Interaksi 2-Faktor) = 3. Maka Efek Utama ter-alias dengan Interaksi 2-Faktor.\n- Pada Resolusi IV ($R = 4$):\n  - Orde 1 (Efek Utama) + Orde 3 (Interaksi 3-Faktor) = 4. Efek Utama bersih dari Interaksi 2-Faktor.\n  - Orde 2 + Orde 2 = 4. Interaksi 2-Faktor ter-alias dengan Interaksi 2-Faktor lainnya.\n- Pada Resolusi V ($R = 5$):\n  - Orde 1 + Orde 4 = 5.\n  - Orde 2 + Orde 3 = 5. Interaksi 2-Faktor bersih dari Interaksi 2-Faktor lainnya.\n\n2. Aturan Kriteria Aberasi Minimum (Minimum Aberration Criterion):\nJika terdapat beberapa pilihan generator untuk ukuran run yang sama, pilih desain yang meminimalkan jumlah kata dengan panjang minimum pada persamaan identitas, sehingga meminimalkan jumlah pasangan efek yang ter-alias.",
    "workedExample": {
      "problemStatement": "Seorang peneliti memiliki 5 faktor (A, B, C, D, E) dan anggaran untuk 16 run pengujian (desain 2^(5-1)). Peneliti mempertimbangkan dua opsi generator untuk faktor kelima E: (Opsi 1) E = AB, atau (Opsi 2) E = ABCD. Tentukan resolusi desain untuk masing-masing opsi dan rekomendasikan opsi mana yang harus dipilih.",
      "stepByStepSolution": [
        "Langkah 1: Evaluasi Opsi 1 (Generator E = AB):\nPersamaan Identitas: I = ABE.\nPanjang kata terpendek adalah 3 huruf (A, B, E).\nMaka Opsi 1 adalah Desain Resolusi III (2^(5-1)_III).\nKonsekuensi: Efek utama C, D, dll ter-alias dengan interaksi 2-faktor (misal [A] = A + BE).",
        "Langkah 2: Evaluasi Opsi 2 (Generator E = ABCD):\nPersamaan Identitas: I = ABCDE.\nPanjang kata terpendek adalah 5 huruf (A, B, C, D, E).\nMaka Opsi 2 adalah Desain Resolusi V (2^(5-1)_V).\nKonsekuensi: Seluruh efek utama dan seluruh interaksi 2-faktor bersih murni tanpa ada keterbauran antar-sesamanya.",
        "Langkah 3: Bandingkan kedua opsi pada ukuran run yang sama (16 run):"
      ],
      "resultInterpretation": "Pilih Opsi 2 (E = ABCD). Kedua opsi membutuhkan jumlah pengujian yang identik sama (16 run), namun Opsi 2 menghasilkan Desain Resolusi V yang sangat unggul dan bersih, sedangkan Opsi 1 menghasilkan Desain Resolusi III yang penuh keterbauran berbahaya."
    },
    "pythonImplementation": {
      "description": "Audit otomatis resolusi desain faktorial fraksional berdasarkan panjang kata identitas.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "def evaluasi_resolusi(defining_words):\n    # Panjang kata terpendek menentukan resolusi\n    panjang_kata = [len(kata) for kata in defining_words]\n    resolusi = min(panjang_kata)\n    \n    romawi = {3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII'}\n    return romawi.get(resolusi, str(resolusi)), resolusi\n\n# Evaluasi dua rancangan desain 2^(5-1)\ndesain_1_words = ['ABE']\ndesain_2_words = ['ABCDE']\n\nres1_str, res1_num = evaluasi_resolusi(desain_1_words)\nres2_str, res2_num = evaluasi_resolusi(desain_2_words)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Audit Resolusi Desain Faktorial Fraksional\")\nprint(f\"Desain 1 (I = ABE)   : Resolusi {res1_str} -> Efek Utama TER-ALIAS dengan Interaksi 2-Faktor\")\nprint(f\"Desain 2 (I = ABCDE) : Resolusi {res2_str} -> Seluruh Efek Utama & Interaksi 2-Faktor BEBAS MURNI\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Audit Resolusi Desain Faktorial Fraksional\nDesain 1 (I = ABE)   : Resolusi III -> Efek Utama TER-ALIAS dengan Interaksi 2-Faktor\nDesain 2 (I = ABCDE) : Resolusi V -> Seluruh Efek Utama & Interaksi 2-Faktor BEBAS MURNI"
    },
    "commonPitfalls": [
      "Menggunakan desain Resolusi III untuk optimasi akhir proses (Resolusi III hanya valid untuk screening kasar).",
      "Mengasumsikan bahwa menambah jumlah run otomatis menaikkan resolusi (resolusi ditentukan oleh pemilihan relasi generator yang cerdas).",
      "Tidak menyadari bahwa pada Resolusi IV, interaksi 2-faktor saling ter-alias berpasangan sehingga tidak dapat diidentifikasi secara unik tanpa uji pembongkar (foldover)."
    ],
    "validationProcedures": [
      "Hitung panjang kata terpendek dari seluruh kombinasi kata pada persamaan identitas.",
      "Gunakan minimal Resolusi IV untuk eksperimen screening industri terpercaya.",
      "Gunakan Resolusi V jika interaksi dua faktor ingin diestimasi secara bebas tanpa bias."
    ],
    "exercises": [
      {
        "question": "Apakah karakteristik keterbauran (aliasing) mendasar dari sebuah Desain Faktorial Fraksional Resolusi IV?",
        "hint": "Perhatikan kebersihan efek utama dan status interaksi dua faktor.",
        "answerExplanation": "Pada Desain Resolusi IV, efek utama bersih sempurna dari keterbauran dengan efek utama lain dan interaksi dua faktor (hanya ter-alias dengan interaksi 3-faktor), namun interaksi dua faktor saling ter-alias satu sama lain."
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
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Resolusi Desain: Resolusi III (Screening Kasar), IV (Bebas Interaksi Utama), dan V",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.7.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.7.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami klasifikasi formal resolusi desain faktorial (Resolusi III, IV, dan V).",
          "Capaian 2: Menghubungkan panjang kata terpendek pada persamaan identitas dengan resolusi desain.",
          "Capaian 3: Memilih resolusi yang tepat sesuai tahap kedewasaan riset (screening vs karakterisasi)."
        ],
        "keyFormulaOrDiagram": "$$p + q \\ge R$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.7.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Resolusi Desain: Resolusi III (Screening Kasar), IV (Bebas Interaksi Utama), dan V",
        "lead": "Tidak semua desain faktorial fraksional diciptakan setara.",
        "bulletPoints": [
          "Kualitas, kekuatan inferensial, dan tingkat keamanan suatu desain 2^(k-p) diklasifikasikan secara formal menggunakan konsep Resolusi Desain (Design Resolution), yang dilambangkan dengan angka Romawi (III, IV, V, VI).",
          "Secara matematis, Resolusi Desain didefinisikan sebagai panjang kata terpendek (jumlah huruf minimum) yang terdapat dalam Persamaan Identitas (Defining Relation) desain tersebut.",
          "Tiga tingkatan resolusi paling penting dalam rekayasa:"
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "1.",
        "bulletPoints": [
          "Desain Resolusi III: Panjang kata terpendek pada persamaan identitas adalah 3 (misal I = ABD). - Efek utama TIDAK ter-alias dengan efek utama lainnya. - Efek utama TER-ALIAS langsung dengan interaksi dua faktor (misal [A] = A + BD). - Kegunaan: Hanya cocok untuk eksperimen screening awal yang sangat kasar (tahap eksplorasi awal dengan banyak faktor), dengan asumsi mutlak bahwa seluruh interaksi 2-faktor bernilai nol.",
          "2.",
          "Desain Resolusi IV: Panjang kata terpendek pada persamaan identitas adalah 4 (misal I = ABCD). - Efek utama TIDAK ter-alias dengan efek utama lainnya dan TIDAK ter-alias dengan interaksi dua faktor."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Definisi Formal Resolusi Desain:",
        "bulletPoints": [
          "Misalkan $R$ adalah resolusi desain. Maka tidak ada efek orde $p$ yang ter-alias dengan efek orde lain yang kurang dari $R - p$:",
          "di mana $p$ dan $q$ adalah orde dari dua efek yang saling ter-alias.",
          "- Pada Resolusi III ($R = 3$):"
        ],
        "keyFormulaOrDiagram": "$$p + q \\ge R$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Seorang peneliti memiliki 5 faktor (A, B, C, D, E) dan anggaran untuk 16 run pengujian (desain 2^(5-1)). Peneliti mempertimbangkan dua opsi generator untuk faktor kelima E: (Opsi 1) E = AB, atau (Opsi 2) E = ABCD. Tentukan resolusi desain untuk masing-masing opsi dan rekomendasikan opsi mana yang harus dipilih.",
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
          "Langkah 1: Evaluasi Opsi 1 (Generator E = AB):\nPersamaan Identitas: I = ABE.\nPanjang kata terpendek adalah 3 huruf (A, B, E).\nMaka Opsi 1 adalah Desain Resolusi III (2^(5-1)_III).\nKonsekuensi: Efek utama C, D, dll ter-alias dengan interaksi 2-faktor (misal [A] = A + BE).",
          "Langkah 2: Evaluasi Opsi 2 (Generator E = ABCD):\nPersamaan Identitas: I = ABCDE.\nPanjang kata terpendek adalah 5 huruf (A, B, C, D, E).\nMaka Opsi 2 adalah Desain Resolusi V (2^(5-1)_V).\nKonsekuensi: Seluruh efek utama dan seluruh interaksi 2-faktor bersih murni tanpa ada keterbauran antar-sesamanya."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Bandingkan kedua opsi pada ukuran run yang sama (16 run):",
          "[result: Interpretasi Ilmiah] Pilih Opsi 2 (E = ABCD). Kedua opsi membutuhkan jumlah pengujian yang identik sama (16 run), namun Opsi 2 menghasilkan Desain Resolusi V yang sangat unggul dan bersih, sedangkan Opsi 1 menghasilkan Desain Resolusi III yang penuh keterbauran berbahaya."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Audit otomatis resolusi desain faktorial fraksional berdasarkan panjang kata identitas.",
        "bulletPoints": [
          "Tujuan Algoritma: Audit otomatis resolusi desain faktorial fraksional berdasarkan panjang kata identitas.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Audit Resolusi Desain Faktorial Fraksional"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Audit Resolusi Desain Faktorial Fraksional\nDesain 1 (I = ABE)   : Resolusi III -> Efek Utama TER-ALIAS dengan Interaksi 2-Faktor\nDesain 2 (I = ABCDE) : Resolusi V -> Seluruh Efek Utama & Interaksi 2-Faktor BEBAS MURNI",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan desain Resolusi III untuk optimasi akhir proses (Resolusi III hanya valid untuk screening kasar).",
          "[warning: Perangkap] Mengasumsikan bahwa menambah jumlah run otomatis menaikkan resolusi (resolusi ditentukan oleh pemilihan relasi generator yang cerdas).",
          "[warning: Perangkap] Tidak menyadari bahwa pada Resolusi IV, interaksi 2-faktor saling ter-alias berpasangan sehingga tidak dapat diidentifikasi secara unik tanpa uji pembongkar (foldover)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Hitung panjang kata terpendek dari seluruh kombinasi kata pada persamaan identitas.",
          "Prosedur: Gunakan minimal Resolusi IV untuk eksperimen screening industri terpercaya.",
          "Prosedur: Gunakan Resolusi V jika interaksi dua faktor ingin diestimasi secara bebas tanpa bias."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apakah karakteristik keterbauran (aliasing) mendasar dari sebuah Desain Faktorial Fraksional Resolusi IV?",
          "Petunjuk Analitis: Perhatikan kebersihan efek utama dan status interaksi dua faktor.",
          "Solusi Kunci: Pada Desain Resolusi IV, efek utama bersih sempurna dari keterbauran dengan efek utama lain dan interaksi dua faktor (hanya ter-alias dengan interaksi 3-faktor), namun interaksi dua faktor saling ter-alias satu sama lain."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.7.4": {
    "id": "4.7.4",
    "chapterId": "CH-30",
    "title": "Metodologi Screening Parameter Proses Manufaktur dan Simulasi Komputasi",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Menerapkan alur kerja screening terstruktur dari banyak faktor (vital few vs trivial many).",
      "Menggunakan teknik Foldover Design untuk memisahkan efek utama dan interaksi yang ter-alias.",
      "Mengintegrasikan desain screening Plackett-Burman untuk efisiensi run non-pangkat-dua."
    ],
    "content": "Dalam fase awal penelitian rekayasa, pengembangan produk baru, atau simulasi komputasi numerik berdimensi tinggi, tim peneliti sering menghadapi daftar panjang variabel input potensial (10 hingga 50 parameter). Mencoba mengoptimalkan seluruh variabel ini secara simultan adalah pemborosan sumber daya yang masif.\n\nStrategi yang tepat adalah menerapkan Metodologi Screening Bertahap (Sequential Screening Strategy):\n1. Tahap 1: Screening Parameter (Parameter Screening): Menggunakan Desain Faktorial Fraksional Resolusi III/IV atau Desain Plackett-Burman untuk menguji puluhan faktor dalam jumlah run yang sangat hemat (misal 12 atau 16 run). Tujuannya adalah menyaring dan mengeliminasi variabel-variabel noise yang tidak berpengaruh, sehingga tersisa 2 hingga 4 faktor kritis (the vital few).\n2. Tahap 2: Penguraian Efek via Desain Foldover: Jika pada desain Resolusi IV ditemukan interaksi 2-faktor yang signifikan namun ter-alias (misal AB + CD signifikan), peneliti menjalankan batch tambahan pengujian dengan membalik seluruh tanda matriks desain (Full Foldover). Penambahan run foldover ini mengubah desain Resolusi IV menjadi Resolusi V, memisahkan seluruh efek interaksi dari pasangannya secara bersih.\n3. Tahap 3: Karakterisasi dan Optimasi Mendalam: Faktor-faktor kunci yang telah terisolasi kemudian dimasukkan ke dalam desain faktorial penuh atau Response Surface Methodology (RSM) untuk menemukan titik operasi optimal.\n\nDesain Plackett-Burman (1946):\nJika peneliti ingin menguji k faktor dalam kelipatan 4 pengujian (N = 12, 20, 24, 28, 36 run) alih-alih kelipatan pangkat dua (N = 8, 16, 32), Desain Plackett-Burman adalah solusi screening non-geometris yang sangat ekonomis. Pada Plackett-Burman, setiap efek utama ter-alias secara parsial (pecahan berbobot) dengan seluruh interaksi 2-faktor, memaksimalkan efisiensi run untuk identifikasi efek utama yang sangat dominan.",
    "mathematicalFoundations": "1. Teknik Foldover Penuh (Full Foldover):\nDiberikan desain fraksional awal $2^{k-p}$ dengan matriks $\\mathbf{X}_1$ dan respon $\\mathbf{y}_1$.\nBentuk matriks kedua $\\mathbf{X}_2 = -\\mathbf{X}_1$ (seluruh tanda perlakuan dibalik) dan kumpulkan respon $\\mathbf{y}_2$.\nGabungkan kedua eksperimen:\n- Estimasi Efek Utama Bersih:\n$$\\hat{\\boldsymbol{\\beta}}_{\\text{main}} = \\frac{1}{2} (\\hat{\\boldsymbol{\\beta}}_1 - \\hat{\\boldsymbol{\\beta}}_2)$$\nSeluruh interaksi 2-faktor saling meniadakan (cancel out) secara aljabar.\n- Estimasi Interaksi 2-Faktor Bersih:\n$$\\hat{\\boldsymbol{\\beta}}_{\\text{interaction}} = \\frac{1}{2} (\\hat{\\boldsymbol{\\beta}}_1 + \\hat{\\boldsymbol{\\beta}}_2)$$\nSeluruh efek utama saling meniadakan. Desain gabungan meningkat statusnya menjadi Resolusi IV atau V.\n\n2. Struktur Desain Plackett-Burman:\nDidasarkan pada matriks Hadamard $\\mathbf{H}_N$ berukuran $N \\times N$ (di mana $N$ adalah kelipatan 4):\n$$\\mathbf{H}_N^T \\mathbf{H}_N = N \\mathbf{I}_N$$\nDesain Plackett-Burman $N = 12$ mampu menyaring hingga $k = 11$ parameter proses hanya dalam 12 pengujian.",
    "workedExample": {
      "problemStatement": "Pada pengujian optimasi mesin cetak injeksi plastik 7 parameter (k = 7: suhu leleh, tekanan injeksi, waktu pendinginan, suhu cetakan, kecepatan injeksi, tekanan holding, waktu holding), peneliti menggunakan desain Plackett-Burman N = 12 run. Jelaskan mengapa Plackett-Burman N = 12 jauh lebih efisien daripada desain faktorial 2^(7-3) = 16 run dan apa batasannya.",
      "stepByStepSolution": [
        "Langkah 1: Tinjau kapasitas Desain Plackett-Burman N = 12:\nPlackett-Burman N = 12 mampu menguji hingga k = 11 faktor dalam 12 run.\nUntuk k = 7 faktor, tersisa 12 - 1 - 7 = 4 derajat kebebasan untuk estimasi galat residual.",
        "Langkah 2: Tinjau Desain Faktorial Fraksional 2^(7-3):\nMembutuhkan N = 2^4 = 16 run (4 run lebih banyak daripada Plackett-Burman).",
        "Langkah 3: Analisis batasan Plackett-Burman:\nPada Plackett-Burman, struktur aliasing bersifat kompleks: setiap efek utama ter-alias secara parsial dengan 45 interaksi dua faktor dengan bobot pecahan 1/3 atau -1/3. Desain ini hanya aman jika interaksi diasumsikan kecil/dapat diabaikan."
      ],
      "resultInterpretation": "Plackett-Burman N = 12 menghemat 25% run dibandingkan desain fraksional 16 run, menjadikannya pilihan ideal untuk penyaringan awal cepat guna membuang parameter yang jelas tidak aktif."
    },
    "pythonImplementation": {
      "description": "Implementasi teknik Full Foldover untuk memisahkan efek utama dari interaksi dua faktor.",
      "libraryDependencies": [
        "numpy",
        "pandas"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\n# Desain Awal Resolusi III: 2^(3-1) dengan C = AB (4 runs)\nX1 = np.array([\n    [-1, -1,  1],\n    [ 1, -1, -1],\n    [-1,  1, -1],\n    [ 1,  1,  1]\n])\n\n# Desain Foldover: Balik seluruh tanda (X2 = -X1)\nX2 = -X1\n\n# Gabungkan menjadi desain 8 runs\nX_combined = np.vstack([X1, X2])\nkolom = ['Faktor_A', 'Faktor_B', 'Faktor_C']\ndf_foldover = pd.DataFrame(X_combined, columns=kolom)\ndf_foldover['Batch'] = ['Awal']*4 + ['Foldover']*4\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Konstruksi Desain Full Foldover (4 -> 8 Runs)\")\nprint(df_foldover.to_string(index=False))\nprint(f\"\\nEfek Utama kini BERSIH MURNI dari Interaksi 2-Faktor (Resolusi III -> Resolusi IV).\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Konstruksi Desain Full Foldover (4 -> 8 Runs)\n Faktor_A  Faktor_B  Faktor_C    Batch\n       -1        -1         1     Awal\n        1        -1        -1     Awal\n       -1         1        -1     Awal\n        1         1         1     Awal\n        1         1        -1 Foldover\n       -1         1         1 Foldover\n        1        -1         1 Foldover\n       -1        -1        -1 Foldover\n\nEfek Utama kini BERSIH MURNI dari Interaksi 2-Faktor (Resolusi III -> Resolusi IV)."
    },
    "commonPitfalls": [
      "Melompati tahap screening dan langsung melakukan pemodelan orde-2 respons surface pada 10 faktor (membutuhkan ratusan run sia-sia).",
      "Mengabaikan teknik foldover ketika dua interaksi penting saling ter-alias pada desain Resolusi IV.",
      "Menggunakan Plackett-Burman untuk menarik kesimpulan mengenai interaksi dua faktor (Plackett-Burman hanya valid untuk efek utama)."
    ],
    "validationProcedures": [
      "Gunakan strategi eksperimen berurutan: Screening -> Foldover -> Optimasi RSM.",
      "Lakukan validasi konfirmasi (confirmation runs) pada kondisi faktor terbaik yang teridentifikasi dari screening.",
      "Pastikan variabel yang dibuang dari screening benar-benar memiliki efek mendekati nol di seluruh rentang operasi."
    ],
    "exercises": [
      {
        "question": "Bagaimana cara melakukan teknik Full Foldover pada desain faktorial fraksional dan apa keuntungan utamanya?",
        "hint": "Perhatikan pembalikan tanda seluruh kolom faktor dan peningkatan resolusi desain.",
        "answerExplanation": "Full Foldover dilakukan dengan menambahkan batch pengujian kedua di mana tanda seluruh faktor pada matriks desain awal dibalik (-X). Keuntungan utamanya adalah menaikkan resolusi desain (misal dari Resolusi III ke IV), sehingga seluruh efek utama terpisah bersih dari interaksi dua faktor."
      }
    ],
    "references": [
      {
        "citation": "Plackett, R. L., & Burman, J. P. (1946). The design of optimum multifactorial experiments. Biometrika, 33(4), 305-325.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Metodologi Screening Parameter Proses Manufaktur dan Simulasi Komputasi",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.7.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.7.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menerapkan alur kerja screening terstruktur dari banyak faktor (vital few vs trivial many).",
          "Capaian 2: Menggunakan teknik Foldover Design untuk memisahkan efek utama dan interaksi yang ter-alias.",
          "Capaian 3: Mengintegrasikan desain screening Plackett-Burman untuk efisiensi run non-pangkat-dua."
        ],
        "keyFormulaOrDiagram": "$$\\hat{\\boldsymbol{\\beta}}_{\\text{main}} = \\frac{1}{2} (\\hat{\\boldsymbol{\\beta}}_1 - \\hat{\\boldsymbol{\\beta}}_2)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.7.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Metodologi Screening Parameter Proses Manufaktur dan Simulasi Komputasi",
        "lead": "Dalam fase awal penelitian rekayasa, pengembangan produk baru, atau simulasi komputasi numerik berdimensi tinggi, tim peneliti sering menghadapi daftar panjang variabel input potensial (10 hingga 50 parameter).",
        "bulletPoints": [
          "Mencoba mengoptimalkan seluruh variabel ini secara simultan adalah pemborosan sumber daya yang masif.",
          "Strategi yang tepat adalah menerapkan Metodologi Screening Bertahap (Sequential Screening Strategy): 1.",
          "Tahap 1: Screening Parameter (Parameter Screening): Menggunakan Desain Faktorial Fraksional Resolusi III/IV atau Desain Plackett-Burman untuk menguji puluhan faktor dalam jumlah run yang sangat hemat (misal 12 atau 16 run)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Desain Plackett-Burman (1946): Jika peneliti ingin menguji k faktor dalam kelipatan 4 pengujian (N = 12, 20, 24, 28, 36 run) alih-alih kelipatan pangkat dua (N = 8, 16, 32), Desain Plackett-Burman adalah solusi screening non-geometris yang sangat ekonomis.",
        "bulletPoints": [
          "Pada Plackett-Burman, setiap efek utama ter-alias secara parsial (pecahan berbobot) dengan seluruh interaksi 2-faktor, memaksimalkan efisiensi run untuk identifikasi efek utama yang sangat dominan."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Teknik Foldover Penuh (Full Foldover):",
        "bulletPoints": [
          "Diberikan desain fraksional awal $2^{k-p}$ dengan matriks $\\mathbf{X}_1$ dan respon $\\mathbf{y}_1$.",
          "Bentuk matriks kedua $\\mathbf{X}_2 = -\\mathbf{X}_1$ (seluruh tanda perlakuan dibalik) dan kumpulkan respon $\\mathbf{y}_2$.",
          "Gabungkan kedua eksperimen:"
        ],
        "keyFormulaOrDiagram": "$$\\hat{\\boldsymbol{\\beta}}_{\\text{main}} = \\frac{1}{2} (\\hat{\\boldsymbol{\\beta}}_1 - \\hat{\\boldsymbol{\\beta}}_2)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada pengujian optimasi mesin cetak injeksi plastik 7 parameter (k = 7: suhu leleh, tekanan injeksi, waktu pendinginan, suhu cetakan, kecepatan injeksi, tekanan holding, waktu holding), peneliti menggunakan desain Plackett-Burman N = 12 run. Jelaskan mengapa Plackett-Burman N = 12 jauh lebih efisien daripada desain faktorial 2^(7-3) = 16 run dan apa batasannya.",
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
          "Langkah 1: Tinjau kapasitas Desain Plackett-Burman N = 12:\nPlackett-Burman N = 12 mampu menguji hingga k = 11 faktor dalam 12 run.\nUntuk k = 7 faktor, tersisa 12 - 1 - 7 = 4 derajat kebebasan untuk estimasi galat residual.",
          "Langkah 2: Tinjau Desain Faktorial Fraksional 2^(7-3):\nMembutuhkan N = 2^4 = 16 run (4 run lebih banyak daripada Plackett-Burman)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Analisis batasan Plackett-Burman:\nPada Plackett-Burman, struktur aliasing bersifat kompleks: setiap efek utama ter-alias secara parsial dengan 45 interaksi dua faktor dengan bobot pecahan 1/3 atau -1/3. Desain ini hanya aman jika interaksi diasumsikan kecil/dapat diabaikan.",
          "[result: Interpretasi Ilmiah] Plackett-Burman N = 12 menghemat 25% run dibandingkan desain fraksional 16 run, menjadikannya pilihan ideal untuk penyaringan awal cepat guna membuang parameter yang jelas tidak aktif."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi teknik Full Foldover untuk memisahkan efek utama dari interaksi dua faktor.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi teknik Full Foldover untuk memisahkan efek utama dari interaksi dua faktor.",
          "Dependensi Pustaka Ilmiah: numpy, pandas",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Konstruksi Desain Full Foldover (4 -> 8 Runs)"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Konstruksi Desain Full Foldover (4 -> 8 Runs)\n Faktor_A  Faktor_B  Faktor_C    Batch\n       -1        -1         1     Awal\n        1        -1        -1     Awal\n       -1         1        -1     Awal",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Melompati tahap screening dan langsung melakukan pemodelan orde-2 respons surface pada 10 faktor (membutuhkan ratusan run sia-sia).",
          "[warning: Perangkap] Mengabaikan teknik foldover ketika dua interaksi penting saling ter-alias pada desain Resolusi IV.",
          "[warning: Perangkap] Menggunakan Plackett-Burman untuk menarik kesimpulan mengenai interaksi dua faktor (Plackett-Burman hanya valid untuk efek utama)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan strategi eksperimen berurutan: Screening -> Foldover -> Optimasi RSM.",
          "Prosedur: Lakukan validasi konfirmasi (confirmation runs) pada kondisi faktor terbaik yang teridentifikasi dari screening.",
          "Prosedur: Pastikan variabel yang dibuang dari screening benar-benar memiliki efek mendekati nol di seluruh rentang operasi."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Bagaimana cara melakukan teknik Full Foldover pada desain faktorial fraksional dan apa keuntungan utamanya?",
          "Petunjuk Analitis: Perhatikan pembalikan tanda seluruh kolom faktor dan peningkatan resolusi desain.",
          "Solusi Kunci: Full Foldover dilakukan dengan menambahkan batch pengujian kedua di mana tanda seluruh faktor pada matriks desain awal dibalik (-X). Keuntungan utamanya adalah menaikkan resolusi desain (misal dari Resolusi III ke IV), sehingga seluruh efek utama terpisah bersih dari interaksi dua faktor."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
