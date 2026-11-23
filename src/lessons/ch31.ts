import { Lesson } from '../types/curriculum';

export const CH31_LESSONS: Record<string, Partial<Lesson>> = {
  "4.8.1": {
    "id": "4.8.1",
    "chapterId": "CH-31",
    "title": "Randomized Complete Block Design (RCBD) dan Incomplete Block Design",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Merancang Randomized Complete Block Design (RCBD) untuk mengontrol satu sumber gangguan homogen.",
      "Memahami keterbatasan kapasitas blok dan formulasi Balanced Incomplete Block Design (BIBD).",
      "Menganalisis tabel ANOVA dua arah tanpa interaksi untuk desain terblokir."
    ],
    "content": "Dalam eksperimen rekayasa, variabel gangguan (nuisance variables) adalah faktor-faktor yang diketahui mempengaruhi respon, namun bukan merupakan fokus utama dari penyelidikan ilmiah. Jika variabel gangguan ini diabaikan dan eksperimen dijalankan menggunakan Completely Randomized Design (CRD), variabilitas dari gangguan tersebut akan terserap ke dalam galat eksperimental (MSE), menenggelamkan signifikansi efek perlakuan yang sebenarnya nyata.\n\nRandomized Complete Block Design (RCBD):\nRCBD adalah strategi baku untuk mengontrol satu sumber variasi gangguan yang dapat diidentifikasi (seperti perbedaan batch material, teknisi penguji, atau hari pelaksanaan). Karakteristik RCBD:\n1. Kata \"Complete\" (Lengkap) berarti setiap blok menerima seluruh perlakuan secara lengkap tepat satu kali (ukuran blok b = jumlah perlakuan a).\n2. Kata \"Randomized\" (Teracak) berarti urutan alokasi perlakuan di dalam setiap blok diacak secara independen.\n3. Model RCBD mengasumsikan tidak adanya interaksi antara perlakuan dan blok (efek aditif murni).\n\nBalanced Incomplete Block Design (BIBD):\nDalam situasi fisik tertentu, ukuran blok yang tersedia secara alami lebih kecil daripada jumlah perlakuan yang ingin diuji (k < a). Misalnya, sebuah mesin uji keausan hanya memiliki 3 slot pengujian (k = 3), padahal peneliti ingin membandingkan 4 jenis pelumas (a = 4). Solusi matematisnya adalah Balanced Incomplete Block Design (BIBD). Dalam BIBD, setiap pasang perlakuan muncul bersama-sama di dalam blok yang sama sebanyak lambda kali yang konstan, mempertahankan perbandingan yang seimbang dan tidak bias.",
    "mathematicalFoundations": "1. Formulasi Model RCBD (Aditif Tanpa Interaksi):\n$$y_{ij} = \\mu + \\tau_i + \\beta_j + \\epsilon_{ij}, \\quad i = 1, \\dots, a; \\; j = 1, \\dots, b$$\ndi mana:\n- $\\tau_i$ adalah efek perlakuan ke-$i$ ($\\sum \\tau_i = 0$).\n- $\\beta_j$ adalah efek blok ke-$j$ ($\\sum \\beta_j = 0$).\n- $\\epsilon_{ij} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$.\n\n2. Dekomposisi Jumlah Kuadrat RCBD:\n$$\\text{SST} = \\text{SS}_{\\text{Treatment}} + \\text{SS}_{\\text{Block}} + \\text{SSE}$$\nDerajat kebebasan:\n$$(ab - 1) = (a - 1) + (b - 1) + (a - 1)(b - 1)$$\nStatistik Uji Perlakuan:\n$$F = \\frac{\\text{MS}_{\\text{Treatment}}}{\\text{MSE}} = \\frac{\\text{SS}_{\\text{Treatment}} / (a - 1)}{\\text{SSE} / [(a - 1)(b - 1)]} \\sim F_{a-1, \\, (a-1)(b-1)}$$\n\n3. Kondisi Keseimbangan Parameter BIBD:\n- $a$: Jumlah perlakuan total.\n- $b$: Jumlah blok total.\n- $k$: Ukuran per blok ($k < a$).\n- $r$: Replikasi per perlakuan di seluruh blok ($r < b$).\n- Relasi total observasi: $N = a r = b k$.\n- Parameter frekuensi kemunculan berpasangan $\\lambda$:\n$$\\lambda = \\frac{r(k - 1)}{a - 1}$$\nNilai $\\lambda$ wajib berupa bilangan bulat positif.",
    "workedExample": {
      "problemStatement": "Seorang peneliti ingin membandingkan a = 4 formulasi katalis menggunakan reaktor yang hanya memiliki kapasitas k = 3 tabung per batch (blok). Rencanakan desain BIBD: hitung jumlah replikasi r, jumlah blok b, dan frekuensi perpasangan lambda.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi parameter yang diberikan: a = 4 perlakuan, k = 3 ukuran blok (k < a).",
        "Langkah 2: Tentukan nilai r dan b terkecil yang memenuhi relasi N = a*r = b*k dan lambda bulat:\nlambda = r*(k - 1) / (a - 1) = r*(3 - 1) / (4 - 1) = 2r / 3.",
        "Langkah 3: Agar lambda berupa bilangan bulat positif, nilai r terkecil adalah kelipatan 3, yaitu r = 3.",
        "Langkah 4: Hitung parameter lainnya:\n- lambda = 2 * (3) / 3 = 2 (setiap pasang katalis akan bertemu bersama di dalam blok sebanyak 2 kali).\n- Total observasi: N = a * r = 4 * 3 = 12.\n- Jumlah blok: b = N / k = 12 / 3 = 4 blok.",
        "Langkah 5: Susun 4 blok BIBD:\nBlok 1: {A, B, C}\nBlok 2: {A, B, D}\nBlok 3: {A, C, D}\nBlok 4: {B, C, D}."
      ],
      "resultInterpretation": "Desain BIBD berhasil dirancang dengan b = 4 blok, r = 3 replikasi per katalis, dan lambda = 2. Setiap pasang katalis (misal A dan B, A dan C, dll) muncul bersama di 2 blok yang berbeda, menjamin perbandingan efisiensi katalis yang seimbang dan adil."
    },
    "pythonImplementation": {
      "description": "Implementasi analisis ANOVA untuk Randomized Complete Block Design (RCBD) menggunakan statsmodels.",
      "libraryDependencies": [
        "numpy",
        "pandas",
        "statsmodels"
      ],
      "code": "import numpy as np\nimport pandas as pd\nimport statsmodels.api as sm\nfrom statsmodels.formula.api import ols\n\nnp.random.seed(42)\n\n# 3 perlakuan (a = 3), 4 blok operator (b = 4)\nperlakuan = ['Katalis_1', 'Katalis_2', 'Katalis_3']\nblok = ['Operator_A', 'Operator_B', 'Operator_C', 'Operator_D']\n\ndf_list = []\nefek_blok = {'Operator_A': 0, 'Operator_B': 5, 'Operator_C': -3, 'Operator_D': 8}\nefek_perlakuan = {'Katalis_1': 50, 'Katalis_2': 65, 'Katalis_3': 45}\n\nfor b_name in blok:\n    for p_name in perlakuan:\n        mu = efek_perlakuan[p_name] + efek_blok[b_name]\n        y = mu + np.random.normal(0, 1.5)\n        df_list.append({'Perlakuan': p_name, 'Blok': b_name, 'Yield': y})\n\ndf_rcbd = pd.DataFrame(df_list)\n\n# Model RCBD aditif: Yield ~ Perlakuan + Blok (tanpa suku interaksi)\nmodel_rcbd = ols('Yield ~ C(Perlakuan) + C(Blok)', data=df_rcbd).fit()\nanova_table = sm.stats.anova_lm(model_rcbd, typ=2)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Randomized Complete Block Design (RCBD)\")\nprint(anova_table[['sum_sq', 'df', 'F', 'PR(>F)']])\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Randomized Complete Block Design (RCBD)\n                   sum_sq   df           F        PR(>F)\nC(Perlakuan)   876.439589  2.0  275.589832  2.167098e-06\nC(Blok)        247.962095  3.0   51.986877  1.077271e-04\nResidual         9.540788  6.0         NaN           NaN"
    },
    "commonPitfalls": [
      "Menyertakan suku interaksi antara perlakuan dan blok pada RCBD standar (pada n=1 per sel, tidak ada derajat kebebasan yang tersisa untuk mengestimasi galat jika interaksi disertakan).",
      "Lupa mengacak urutan perlakuan di dalam masing-masing blok.",
      "Menggunakan CRD padahal variabilitas antar-blok sangat besar, sehingga memicu hilangnya signifikansi statistik."
    ],
    "validationProcedures": [
      "Pastikan unit di dalam satu blok bersifat homogen dan variabilitas antar-blok dapat diidentifikasi.",
      "Verifikasi asumsi aditivitas (uji non-aditivitas Tukey untuk interaksi perlakuan-blok).",
      "Gunakan BIBD jika kapasitas fisik blok tidak mampu menampung seluruh perlakuan secara serentak."
    ],
    "exercises": [
      {
        "question": "Pada eksperimen RCBD dengan a = 4 perlakuan dan b = 5 blok, berapakah derajat kebebasan untuk komponen galat residual (SSE)?",
        "hint": "Derajat kebebasan galat pada RCBD dihitung sebagai df_E = (a - 1)(b - 1).",
        "answerExplanation": "Derajat kebebasan galat residual RCBD adalah df_E = (a - 1)(b - 1) = (4 - 1)(5 - 1) = 3 * 4 = 12."
      }
    ],
    "references": [
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Cox, D. R. (1958). Planning of Experiments. John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Randomized Complete Block Design (RCBD) dan Incomplete Block Design",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.8.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.8.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Merancang Randomized Complete Block Design (RCBD) untuk mengontrol satu sumber gangguan homogen.",
          "Capaian 2: Memahami keterbatasan kapasitas blok dan formulasi Balanced Incomplete Block Design (BIBD).",
          "Capaian 3: Menganalisis tabel ANOVA dua arah tanpa interaksi untuk desain terblokir."
        ],
        "keyFormulaOrDiagram": "$$y_{ij} = \\mu + \\tau_i + \\beta_j + \\epsilon_{ij}, \\quad i = 1, \\dots, a; \\; j = 1, \\dots, b$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.8.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Randomized Complete Block Design (RCBD) dan Incomplete Block Design",
        "lead": "Dalam eksperimen rekayasa, variabel gangguan (nuisance variables) adalah faktor-faktor yang diketahui mempengaruhi respon, namun bukan merupakan fokus utama dari penyelidikan ilmiah.",
        "bulletPoints": [
          "Jika variabel gangguan ini diabaikan dan eksperimen dijalankan menggunakan Completely Randomized Design (CRD), variabilitas dari gangguan tersebut akan terserap ke dalam galat eksperimental (MSE), menenggelamkan signifikansi efek perlakuan yang sebenarnya nyata.",
          "Randomized Complete Block Design (RCBD): RCBD adalah strategi baku untuk mengontrol satu sumber variasi gangguan yang dapat diidentifikasi (seperti perbedaan batch material, teknisi penguji, atau hari pelaksanaan).",
          "Karakteristik RCBD: 1."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Balanced Incomplete Block Design (BIBD): Dalam situasi fisik tertentu, ukuran blok yang tersedia secara alami lebih kecil daripada jumlah perlakuan yang ingin diuji (k < a).",
        "bulletPoints": [
          "Misalnya, sebuah mesin uji keausan hanya memiliki 3 slot pengujian (k = 3), padahal peneliti ingin membandingkan 4 jenis pelumas (a = 4).",
          "Solusi matematisnya adalah Balanced Incomplete Block Design (BIBD)."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Model RCBD (Aditif Tanpa Interaksi):",
        "bulletPoints": [
          "di mana:",
          "- $\\tau_i$ adalah efek perlakuan ke-$i$ ($\\sum \\tau_i = 0$).",
          "- $\\beta_j$ adalah efek blok ke-$j$ ($\\sum \\beta_j = 0$)."
        ],
        "keyFormulaOrDiagram": "$$y_{ij} = \\mu + \\tau_i + \\beta_j + \\epsilon_{ij}, \\quad i = 1, \\dots, a; \\; j = 1, \\dots, b$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Seorang peneliti ingin membandingkan a = 4 formulasi katalis menggunakan reaktor yang hanya memiliki kapasitas k = 3 tabung per batch (blok). Rencanakan desain BIBD: hitung jumlah replikasi r, jumlah blok b, dan frekuensi perpasangan lambda.",
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
          "Langkah 1: Identifikasi parameter yang diberikan: a = 4 perlakuan, k = 3 ukuran blok (k < a).",
          "Langkah 2: Tentukan nilai r dan b terkecil yang memenuhi relasi N = a*r = b*k dan lambda bulat:\nlambda = r*(k - 1) / (a - 1) = r*(3 - 1) / (4 - 1) = 2r / 3.",
          "Langkah 3: Agar lambda berupa bilangan bulat positif, nilai r terkecil adalah kelipatan 3, yaitu r = 3."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung parameter lainnya:\n- lambda = 2 * (3) / 3 = 2 (setiap pasang katalis akan bertemu bersama di dalam blok sebanyak 2 kali).\n- Total observasi: N = a * r = 4 * 3 = 12.\n- Jumlah blok: b = N / k = 12 / 3 = 4 blok.",
          "Langkah 5: Susun 4 blok BIBD:\nBlok 1: {A, B, C}\nBlok 2: {A, B, D}\nBlok 3: {A, C, D}\nBlok 4: {B, C, D}.",
          "[result: Interpretasi Ilmiah] Desain BIBD berhasil dirancang dengan b = 4 blok, r = 3 replikasi per katalis, dan lambda = 2. Setiap pasang katalis (misal A dan B, A dan C, dll) muncul bersama di 2 blok yang berbeda, menjamin perbandingan efisiensi katalis yang seimbang dan adil."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi analisis ANOVA untuk Randomized Complete Block Design (RCBD) menggunakan statsmodels.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi analisis ANOVA untuk Randomized Complete Block Design (RCBD) menggunakan statsmodels.",
          "Dependensi Pustaka Ilmiah: numpy, pandas, statsmodels",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Tabel ANOVA Randomized Complete Block Design (RCBD)"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Randomized Complete Block Design (RCBD)\n                   sum_sq   df           F        PR(>F)\nC(Perlakuan)   876.439589  2.0  275.589832  2.167098e-06\nC(Blok)        247.962095  3.0   51.986877  1.077271e-04\nResidual         9.540788  6.0         NaN           NaN",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyertakan suku interaksi antara perlakuan dan blok pada RCBD standar (pada n=1 per sel, tidak ada derajat kebebasan yang tersisa untuk mengestimasi galat jika interaksi disertakan).",
          "[warning: Perangkap] Lupa mengacak urutan perlakuan di dalam masing-masing blok.",
          "[warning: Perangkap] Menggunakan CRD padahal variabilitas antar-blok sangat besar, sehingga memicu hilangnya signifikansi statistik."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan unit di dalam satu blok bersifat homogen dan variabilitas antar-blok dapat diidentifikasi.",
          "Prosedur: Verifikasi asumsi aditivitas (uji non-aditivitas Tukey untuk interaksi perlakuan-blok).",
          "Prosedur: Gunakan BIBD jika kapasitas fisik blok tidak mampu menampung seluruh perlakuan secara serentak."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Pada eksperimen RCBD dengan a = 4 perlakuan dan b = 5 blok, berapakah derajat kebebasan untuk komponen galat residual (SSE)?",
          "Petunjuk Analitis: Derajat kebebasan galat pada RCBD dihitung sebagai df_E = (a - 1)(b - 1).",
          "Solusi Kunci: Derajat kebebasan galat residual RCBD adalah df_E = (a - 1)(b - 1) = (4 - 1)(5 - 1) = 3 * 4 = 12."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.8.2": {
    "id": "4.8.2",
    "chapterId": "CH-31",
    "title": "Latin Square dan Graeco-Latin Square untuk Mengontrol Dua Variabel Gangguan Simultan",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Merancang Desain Bujursangkar Latin (Latin Square Design) untuk mengontrol dua sumber gangguan ortogonal simultan.",
      "Memahami aturan ortogonalitas baris, kolom, dan huruf perlakuan (p x p grid).",
      "Mengembangkan desain ke Graeco-Latin Square untuk mengontrol tiga sumber gangguan sekaligus."
    ],
    "content": "Dalam banyak situasi pengujian rekayasa, eksperimen menghadapi dua sumber gangguan sekaligus yang beroperasi secara independen. Contoh klasik:\n- Pengujian emisi bahan bakar pada mesin mobil, di mana dua sumber variabilitas gangguan yang diketahui adalah: (1) Perbedaan operator pengemudi (baris), dan (2) Hari pengujian atau urutan rotasi kendaraan (kolom).\n- Pembandingan algoritma pada platform komputasi awan, di mana dua gangguan adalah: (1) Node pemrosesan fisik, dan (2) Waktu beban trafik jaringan puncak harian.\n\nJika digunakan desain faktorial penuh untuk mengontrol kedua gangguan tersebut bersama faktor perlakuan, jumlah run eksperimen akan meledak menjadi sangat besar (p^3 run). Solusi matematis paling brilian untuk masalah ini adalah Desain Bujursangkar Latin (Latin Square Design).\n\nPrinsip Latin Square:\nDesain Latin Square berukuran p x p memungkinkan pengujian p perlakuan (dilambangkan dengan huruf Latin A, B, C, D) sambil mengontrol secara simultan dua variabel gangguan (baris berukuran p dan kolom berukuran p) hanya dalam p^2 run pengujian (jauh lebih hemat daripada p^3 run). Aturan mutlak Latin Square adalah: setiap huruf perlakuan harus muncul tepat satu kali di setiap baris dan tepat satu kali di setiap kolom (seperti aturan teka-teki Sudoku).\n\nGraeco-Latin Square:\nJika terdapat tiga sumber gangguan simultan, desain dapat diperluas menjadi Graeco-Latin Square dengan menumpangkan huruf Yunani (alpha, beta, gamma) di atas huruf Latin secara ortogonal.",
    "mathematicalFoundations": "1. Formulasi Model Statistik Latin Square Design ($p \\times p$):\n$$y_{ijk} = \\mu + \\alpha_i + \\beta_j + \\tau_k + \\epsilon_{ijk}, \\quad i, j, k = 1, \\dots, p$$\ndi mana:\n- $\\alpha_i$ adalah efek baris gangguan ke-$i$ ($\\sum \\alpha_i = 0$).\n- $\\beta_j$ adalah efek kolom gangguan ke-$j$ ($\\sum \\beta_j = 0$).\n- $\\tau_k$ adalah efek perlakuan ke-$k$ ($\\sum \\tau_k = 0$).\n- $\\epsilon_{ijk} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$.\n- Model mengasumsikan efek aditif sempurna tanpa interaksi antara baris, kolom, dan perlakuan.\n\n2. Dekomposisi Jumlah Kuadrat Latin Square:\n$$\\text{SST} = \\text{SS}_{\\text{Row}} + \\text{SS}_{\\text{Column}} + \\text{SS}_{\\text{Treatment}} + \\text{SSE}$$\nDerajat kebebasan total adalah $N - 1 = p^2 - 1$:\n$$(p^2 - 1) = (p - 1) + (p - 1) + (p - 1) + (p - 1)(p - 2)$$\nPerhatikan derajat kebebasan galat:\n$$\\text{df}_{\\text{error}} = (p - 1)(p - 2)$$\nUntuk $p = 3$, $\\text{df}_{\\text{error}} = (2)(1) = 2$ (sangat kecil). Oleh karena itu, Latin Square umumnya direkomendasikan untuk $p \\ge 4$ atau direplikasi.\n\n3. Statistik Uji F untuk Perlakuan:\n$$F = \\frac{\\text{MS}_{\\text{Treatment}}}{\\text{MSE}} = \\frac{\\text{SS}_{\\text{Treatment}} / (p - 1)}{\\text{SSE} / [(p - 1)(p - 2)]} \\sim F_{p-1, \\, (p-1)(p-2)}$$",
    "workedExample": {
      "problemStatement": "Seorang insinyur ingin membandingkan p = 4 jenis ban mobil (A, B, C, D) terhadap laju keausan. Dua variabel gangguan yang dikontrol adalah: 4 Posisi Roda (Depan Kiri, Depan Kanan, Belakang Kiri, Belakang Kanan) dan 4 Mobil Uji. Rancang grid Latin Square 4x4 dan hitung derajat kebebasan galatnya.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi parameter: p = 4 perlakuan, Baris = 4 Mobil, Kolom = 4 Posisi Roda.",
        "Langkah 2: Susun grid Latin Square 4x4 standar:\nBaris 1 (Mobil 1): [A, B, C, D]\nBaris 2 (Mobil 2): [B, C, D, A]\nBaris 3 (Mobil 3): [C, D, A, B]\nBaris 4 (Mobil 4): [D, A, B, C].\nVerifikasi: Setiap huruf ban (A, B, C, D) muncul tepat satu kali di tiap baris mobil dan tepat satu kali di tiap kolom posisi roda.",
        "Langkah 3: Hitung total run: N = p^2 = 4^2 = 16 run (jauh lebih hemat daripada 4^3 = 64 run).",
        "Langkah 4: Hitung derajat kebebasan galat:\ndf_error = (p - 1)(p - 2) = (4 - 1)(4 - 2) = 3 * 2 = 6."
      ],
      "resultInterpretation": "Desain Latin Square 4x4 berhasil mengontrol variabilitas antar-mobil dan variabilitas posisi roda secara simultan hanya dengan 16 run pengujian dengan df galat = 6, menghasilkan efisiensi eksperimen 400% lebih tinggi dibanding desain faktorial penuh."
    },
    "pythonImplementation": {
      "description": "Analisis ANOVA Latin Square 4x4 untuk mengontrol dua sumber variasi gangguan simultan.",
      "libraryDependencies": [
        "numpy",
        "pandas",
        "statsmodels"
      ],
      "code": "import numpy as np\nimport pandas as pd\nimport statsmodels.api as sm\nfrom statsmodels.formula.api import ols\n\nnp.random.seed(42)\np = 4\n\n# Susunan Latin Square 4x4\nlatin_grid = np.array([\n    ['A', 'B', 'C', 'D'],\n    ['B', 'C', 'D', 'A'],\n    ['C', 'D', 'A', 'B'],\n    ['D', 'A', 'B', 'C']\n])\n\nbaris_list = []\nefek_baris = [10, 15, 8, 12]     # Gangguan Mobil\nefek_kolom = [5, 2, 7, 4]        # Gangguan Posisi Roda\nefek_perlakuan = {'A': 50, 'B': 62, 'C': 48, 'D': 70} # Respon Ban\n\nfor r in range(p):\n    for c in range(p):\n        treat = latin_grid[r, c]\n        mu = efek_perlakuan[treat] + efek_baris[r] + efek_kolom[c]\n        y = mu + np.random.normal(0, 1.2)\n        baris_list.append({\n            'Mobil': f'Mobil_{r+1}',\n            'Posisi': f'Posisi_{c+1}',\n            'Ban': treat,\n            'Keausan': y\n        })\n\ndf_ls = pd.DataFrame(baris_list)\n\n# Model Latin Square aditif: Keausan ~ Ban + Mobil + Posisi\nmodel = ols('Keausan ~ C(Ban) + C(Mobil) + C(Posisi)', data=df_ls).fit()\nanova_table = sm.stats.anova_lm(model, typ=2)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Latin Square Design 4x4\")\nprint(anova_table[['sum_sq', 'df', 'F', 'PR(>F)']])\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Latin Square Design 4x4\n                 sum_sq   df           F        PR(>F)\nC(Ban)      1354.214732  3.0  359.206268  1.107086e-06\nC(Mobil)     102.438514  3.0   27.171899  7.127883e-04\nC(Posisi)     54.896748  3.0   14.561338  3.896281e-03\nResidual       7.540209  6.0         NaN           NaN"
    },
    "commonPitfalls": [
      "Menerapkan Latin Square ketika dicurigai ada interaksi kuat antara baris dan kolom atau antara perlakuan dan gangguan (asumsi aditivitas runtuh).",
      "Menggunakan Latin Square ukuran 3x3 tanpa replikasi (df galat hanya 2, uji statistik menjadi sangat lemah).",
      "Tidak mengacak urutan baris, kolom, dan penetapan label huruf sebelum eksperimen dijalankan."
    ],
    "validationProcedures": [
      "Verifikasi bahwa setiap perlakuan muncul tepat satu kali di setiap baris dan setiap kolom.",
      "Pastikan ukuran perlakuan sama persis dengan jumlah level kedua variabel gangguan (harus berupa matriks bujursangkar p x p).",
      "Jika p <= 4, pertimbangkan mereplikasi bujursangkar Latin untuk meningkatkan derajat kebebasan galat."
    ],
    "exercises": [
      {
        "question": "Berapakah derajat kebebasan galat residual untuk sebuah Desain Bujursangkar Latin tunggal berukuran 5x5 (p = 5)?",
        "hint": "Gunakan formula derajat kebebasan galat Latin Square: df_E = (p - 1)(p - 2).",
        "answerExplanation": "Derajat kebebasan galat adalah df_E = (p - 1)(p - 2) = (5 - 1)(5 - 2) = 4 * 3 = 12."
      }
    ],
    "references": [
      {
        "citation": "Fisher, R. A. (1935). The Design of Experiments. Oliver and Boyd.",
        "type": "canonical-textbook"
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
        "title": "Tinjauan & Capaian: Latin Square dan Graeco-Latin Square untuk Mengontrol Dua Variabel Gangguan Simultan",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.8.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.8.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Merancang Desain Bujursangkar Latin (Latin Square Design) untuk mengontrol dua sumber gangguan ortogonal simultan.",
          "Capaian 2: Memahami aturan ortogonalitas baris, kolom, dan huruf perlakuan (p x p grid).",
          "Capaian 3: Mengembangkan desain ke Graeco-Latin Square untuk mengontrol tiga sumber gangguan sekaligus."
        ],
        "keyFormulaOrDiagram": "$$y_{ijk} = \\mu + \\alpha_i + \\beta_j + \\tau_k + \\epsilon_{ijk}, \\quad i, j, k = 1, \\dots, p$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.8.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Latin Square dan Graeco-Latin Square untuk Mengontrol Dua Variabel Gangguan Simultan",
        "lead": "Dalam banyak situasi pengujian rekayasa, eksperimen menghadapi dua sumber gangguan sekaligus yang beroperasi secara independen.",
        "bulletPoints": [
          "Contoh klasik: - Pengujian emisi bahan bakar pada mesin mobil, di mana dua sumber variabilitas gangguan yang diketahui adalah: (1) Perbedaan operator pengemudi (baris), dan (2) Hari pengujian atau urutan rotasi kendaraan (kolom). - Pembandingan algoritma pada platform komputasi awan, di mana dua gangguan adalah: (1) Node pemrosesan fisik, dan (2) Waktu beban trafik jaringan puncak harian.",
          "Jika digunakan desain faktorial penuh untuk mengontrol kedua gangguan tersebut bersama faktor perlakuan, jumlah run eksperimen akan meledak menjadi sangat besar (p^3 run).",
          "Solusi matematis paling brilian untuk masalah ini adalah Desain Bujursangkar Latin (Latin Square Design)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Prinsip Latin Square: Desain Latin Square berukuran p x p memungkinkan pengujian p perlakuan (dilambangkan dengan huruf Latin A, B, C, D) sambil mengontrol secara simultan dua variabel gangguan (baris berukuran p dan kolom berukuran p) hanya dalam p^2 run pengujian (jauh lebih hemat daripada p^3 run).",
        "bulletPoints": [
          "Aturan mutlak Latin Square adalah: setiap huruf perlakuan harus muncul tepat satu kali di setiap baris dan tepat satu kali di setiap kolom (seperti aturan teka-teki Sudoku).",
          "Graeco-Latin Square: Jika terdapat tiga sumber gangguan simultan, desain dapat diperluas menjadi Graeco-Latin Square dengan menumpangkan huruf Yunani (alpha, beta, gamma) di atas huruf Latin secara ortogonal."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Model Statistik Latin Square Design ($p \\times p$):",
        "bulletPoints": [
          "di mana:",
          "- $\\alpha_i$ adalah efek baris gangguan ke-$i$ ($\\sum \\alpha_i = 0$).",
          "- $\\beta_j$ adalah efek kolom gangguan ke-$j$ ($\\sum \\beta_j = 0$)."
        ],
        "keyFormulaOrDiagram": "$$y_{ijk} = \\mu + \\alpha_i + \\beta_j + \\tau_k + \\epsilon_{ijk}, \\quad i, j, k = 1, \\dots, p$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Seorang insinyur ingin membandingkan p = 4 jenis ban mobil (A, B, C, D) terhadap laju keausan. Dua variabel gangguan yang dikontrol adalah: 4 Posisi Roda (Depan Kiri, Depan Kanan, Belakang Kiri, Belakang Kanan) dan 4 Mobil Uji. Rancang grid Latin Square 4x4 dan hitung derajat kebebasan galatnya.",
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
          "Langkah 1: Identifikasi parameter: p = 4 perlakuan, Baris = 4 Mobil, Kolom = 4 Posisi Roda.",
          "Langkah 2: Susun grid Latin Square 4x4 standar:\nBaris 1 (Mobil 1): [A, B, C, D]\nBaris 2 (Mobil 2): [B, C, D, A]\nBaris 3 (Mobil 3): [C, D, A, B]\nBaris 4 (Mobil 4): [D, A, B, C].\nVerifikasi: Setiap huruf ban (A, B, C, D) muncul tepat satu kali di tiap baris mobil dan tepat satu kali di tiap kolom posisi roda."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung total run: N = p^2 = 4^2 = 16 run (jauh lebih hemat daripada 4^3 = 64 run).",
          "Langkah 4: Hitung derajat kebebasan galat:\ndf_error = (p - 1)(p - 2) = (4 - 1)(4 - 2) = 3 * 2 = 6.",
          "[result: Interpretasi Ilmiah] Desain Latin Square 4x4 berhasil mengontrol variabilitas antar-mobil dan variabilitas posisi roda secara simultan hanya dengan 16 run pengujian dengan df galat = 6, menghasilkan efisiensi eksperimen 400% lebih tinggi dibanding desain faktorial penuh."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Analisis ANOVA Latin Square 4x4 untuk mengontrol dua sumber variasi gangguan simultan.",
        "bulletPoints": [
          "Tujuan Algoritma: Analisis ANOVA Latin Square 4x4 untuk mengontrol dua sumber variasi gangguan simultan.",
          "Dependensi Pustaka Ilmiah: numpy, pandas, statsmodels",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Tabel ANOVA Latin Square Design 4x4"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Latin Square Design 4x4\n                 sum_sq   df           F        PR(>F)\nC(Ban)      1354.214732  3.0  359.206268  1.107086e-06\nC(Mobil)     102.438514  3.0   27.171899  7.127883e-04\nC(Posisi)     54.896748  3.0   14.561338  3.896281e-03",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menerapkan Latin Square ketika dicurigai ada interaksi kuat antara baris dan kolom atau antara perlakuan dan gangguan (asumsi aditivitas runtuh).",
          "[warning: Perangkap] Menggunakan Latin Square ukuran 3x3 tanpa replikasi (df galat hanya 2, uji statistik menjadi sangat lemah).",
          "[warning: Perangkap] Tidak mengacak urutan baris, kolom, dan penetapan label huruf sebelum eksperimen dijalankan."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Verifikasi bahwa setiap perlakuan muncul tepat satu kali di setiap baris dan setiap kolom.",
          "Prosedur: Pastikan ukuran perlakuan sama persis dengan jumlah level kedua variabel gangguan (harus berupa matriks bujursangkar p x p).",
          "Prosedur: Jika p <= 4, pertimbangkan mereplikasi bujursangkar Latin untuk meningkatkan derajat kebebasan galat."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Berapakah derajat kebebasan galat residual untuk sebuah Desain Bujursangkar Latin tunggal berukuran 5x5 (p = 5)?",
          "Petunjuk Analitis: Gunakan formula derajat kebebasan galat Latin Square: df_E = (p - 1)(p - 2).",
          "Solusi Kunci: Derajat kebebasan galat adalah df_E = (p - 1)(p - 2) = (5 - 1)(5 - 2) = 4 * 3 = 12."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.8.3": {
    "id": "4.8.3",
    "chapterId": "CH-31",
    "title": "Desain Split-Plot untuk Faktor yang Sulit Diubah (Hard-to-Change Factors)",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Mengidentifikasi kendala logistik faktor yang sulit diubah (hard-to-change factors) dalam industri.",
      "Memahami struktur dua tingkat pengacakan: Whole Plot (faktor makro) dan Sub-Plot (faktor mikro).",
      "Menghitung dan membedakan dua komponen galat residual yang berbeda: Error A dan Error B."
    ],
    "content": "Dalam eksperimen faktorial standar, diasumsikan bahwa seluruh kombinasi perlakuan dapat diacak urutannya secara bebas dan independen murni. Namun, dalam industri manufaktur, metalurgi, pertanian, dan pemrosesan kimia, asumsi ini sering kali mustahil dipenuhi secara praktis akibat adanya Faktor yang Sulit Diubah (Hard-to-Change Factors).\n\nContoh Kendala Fisik:\nSebuah eksperimen menguji pengaruh Suhu Tungku Pembakaran (Furnace Temperature: 800 C vs 1000 C) dan Waktu Penahanan (Holding Time: 15 menit vs 30 menit) terhadap kekerasan paduan logam. Mengubah suhu tungku pembakaran dari 800 C ke 1000 C membutuhkan waktu 6 jam pemanasan, dan mendinginkannya kembali membutuhkan waktu 12 jam. Mengacak urutan suhu secara murni setiap kali uji coba akan memakan waktu berbulan-bulan dan biaya energi yang sangat boros. Suhu tungku adalah faktor yang sulit diubah (Hard-to-Change / Whole-Plot factor), sedangkan waktu penahanan spesimen logam adalah faktor yang mudah diubah (Easy-to-Change / Sub-Plot factor).\n\nStruktur Desain Split-Plot:\nUntuk mengatasi kendala fisik ini secara elegan dan jujur, digunakan Desain Split-Plot:\n1. Whole Plot: Tingkat perlakuan makro (misal suhu tungku) diatur pada satu level tetap, membentuk satu \"plot utama\".\n2. Sub-Plot: Di dalam setiap plot utama tersebut, seluruh level dari faktor yang mudah diubah (misal waktu penahanan) dieksekusi secara teracak.\n\nKonsekuensi Statistika Krusial:\nDesain Split-Plot memiliki Dua Suku Galat Residual yang Berbeda:\n- Galat Plot Utama (Whole-Plot Error, Error A): Digunakan sebagai penyebut untuk menguji faktor yang sulit diubah. Karena ukuran replikasi whole plot sedikit, uji untuk faktor sulit ini memiliki kekuatan statistik yang lebih rendah.\n- Galat Sub-Plot (Sub-Plot Error, Error B): Digunakan sebagai penyebut untuk menguji faktor yang mudah diubah dan efek interaksinya. Uji ini memiliki derajat kebebasan lebih banyak dan kekuatan statistik yang sangat tinggi.",
    "mathematicalFoundations": "1. Formulasi Model Statistik Split-Plot:\n$$y_{ijk} = \\mu + \\rho_i + \\alpha_j + \\eta_{ij} + \\beta_k + (\\alpha\\beta)_{jk} + \\epsilon_{ijk}$$\ndi mana:\n- $\\rho_i$ adalah efek blok/replikasi ke-$i$ ($i = 1, \\dots, r$).\n- $\\alpha_j$ adalah efek faktor Whole-Plot (Hard-to-Change) ke-$j$ ($j = 1, \\dots, a$).\n- $\\eta_{ij} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma_{\\text{whole}}^2)$ adalah Galat Whole-Plot (**Error A**).\n- $\\beta_k$ adalah efek faktor Sub-Plot (Easy-to-Change) ke-$k$ ($k = 1, \\dots, b$).\n- $(\\alpha\\beta)_{jk}$ adalah efek interaksi Whole-Plot x Sub-Plot.\n- $\\epsilon_{ijk} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma_{\\text{sub}}^2)$ adalah Galat Sub-Plot (**Error B**).\n\n2. Dua Statistik Uji F Terpisah pada Tabel ANOVA:\n- Untuk Faktor Whole-Plot $A$:\n$$F_A = \\frac{\\text{MS}_A}{\\text{MS}_{\\text{Error A}}} \\sim F_{a-1, \\, (r-1)(a-1)}$$\n- Untuk Faktor Sub-Plot $B$ dan Interaksi $AB$:\n$$F_B = \\frac{\\text{MS}_B}{\\text{MS}_{\\text{Error B}}} \\sim F_{b-1, \\, a(r-1)(b-1)}$$\n$$F_{AB} = \\frac{\\text{MS}_{AB}}{\\text{MS}_{\\text{Error B}}} \\sim F_{(a-1)(b-1), \\, a(r-1)(b-1)}$$\nPerhatikan bahwa pengujian sub-plot diuji terhadap $\\text{MS}_{\\text{Error B}}$ yang umumnya jauh lebih kecil daripada $\\text{MS}_{\\text{Error A}}$.",
    "workedExample": {
      "problemStatement": "Pada pengujian perlakuan panas baja, Faktor A (Suhu Tungku: 2 level, Hard-to-change) dan Faktor B (Media Pendingin: 3 level, Easy-to-change) diuji dengan r = 3 blok replikasi (total N = 18). Dari analisis ANOVA diperoleh:\nMS_A = 120.0, MS_ErrorA = 15.0\nMS_B = 80.0, MS_AB = 40.0, MS_ErrorB = 4.0\nHitung statistik F untuk Faktor A, Faktor B, dan Interaksi AB dengan penyebut galat yang tepat.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi derajat kebebasan dan pasang penyebut galat yang tepat:\n- Faktor A (Whole plot): df_A = a - 1 = 2 - 1 = 1.\n  Penyebut: Error A dengan df = (r - 1)(a - 1) = (3 - 1)(2 - 1) = 2.\n- Faktor B (Sub plot): df_B = b - 1 = 3 - 1 = 2.\n  Penyebut: Error B dengan df = a(r - 1)(b - 1) = 2(2)(2) = 8.\n- Interaksi AB: df_AB = (a - 1)(b - 1) = (1)(2) = 2.\n  Penyebut: Error B (df = 8).",
        "Langkah 2: Hitung F untuk Faktor A (Suhu Tungku):\nF_A = MS_A / MS_ErrorA = 120.0 / 15.0 = 8.00 (df1 = 1, df2 = 2).\nNilai kritis F_(0.05, 1, 2) = 18.51 -> Tidak Signifikan.",
        "Langkah 3: Hitung F untuk Faktor B (Media Pendingin):\nF_B = MS_B / MS_ErrorB = 80.0 / 4.0 = 20.00 (df1 = 2, df2 = 8).\nNilai kritis F_(0.05, 2, 8) = 4.46 -> Sangat Signifikan (p < 0.001).",
        "Langkah 4: Hitung F untuk Interaksi AB:\nF_AB = MS_AB / MS_ErrorB = 40.0 / 4.0 = 10.00 (df1 = 2, df2 = 8).\nNilai kritis F_(0.05, 2, 8) = 4.46 -> Sangat Signifikan (p = 0.007)."
      ],
      "resultInterpretation": "Penyebut galat yang berbeda sangat menentukan keputusan inferensi. Faktor B dan interaksi AB diuji terhadap Error B (MSE = 4.0) dan terbukti sangat signifikan. Jika peneliti keliru menganalisisnya sebagai faktorial standar menggunakan gabungan galat, p-value untuk faktor A akan terbias palsu."
    },
    "pythonImplementation": {
      "description": "Pemodelan analisis split-plot dua tingkat galat menggunakan MixedLM statsmodels.",
      "libraryDependencies": [
        "numpy",
        "pandas",
        "statsmodels"
      ],
      "code": "import numpy as np\nimport pandas as pd\nimport statsmodels.formula.api as smf\n\nnp.random.seed(42)\nr_rep = 4  # 4 replikasi blok\na_levels = ['Temp_800', 'Temp_1000']  # Hard to change (Whole Plot)\nb_levels = ['Med_Air', 'Med_Minyak', 'Med_Polimer']  # Easy to change (Sub Plot)\n\ndata_list = []\nfor rep in range(r_rep):\n    for a in a_levels:\n        # Galat Whole Plot (Error A) untuk tiap setting tungku\n        error_a = np.random.normal(0, 3.0)\n        for b in b_levels:\n            # Respon fisik + Error Subplot (Error B)\n            mu = (100 if a == 'Temp_1000' else 80) + (15 if b == 'Med_Air' else 5)\n            y = mu + error_a + np.random.normal(0, 1.5)\n            data_list.append({\n                'Replikasi': f'Rep_{rep+1}',\n                'WholePlotID': f'WP_{rep+1}_{a}',\n                'Suhu': a,\n                'Media': b,\n                'Kekerasan': y\n            })\n\ndf_sp = pd.DataFrame(data_list)\n\n# Analisis Split-Plot via Linear Mixed Model\n# WholePlotID bertindak sebagai Random Intercept untuk menangkap Error A\nmodel_sp = smf.mixedlm(\"Kekerasan ~ C(Suhu) + C(Media) + C(Suhu):C(Media)\", \n                       df_sp, \n                       groups=df_sp[\"WholePlotID\"]).fit()\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model Split-Plot (MixedLM)\")\nprint(f\"Varians Error A (Whole-Plot) : {float(np.asarray(model_sp.cov_re)[0, 0]):.4f} (Sejati: 9.00)\")\nprint(f\"Varians Error B (Sub-Plot)   : {float(model_sp.scale):.4f} (Sejati: 2.25)\")\nprint(f\"Efek Suhu (Hard-to-Change)   : {model_sp.params['C(Suhu)[T.Temp_800]']:.2f} (SE: {model_sp.bse['C(Suhu)[T.Temp_800]']:.2f})\")\nprint(f\"Efek Media (Easy-to-Change)  : {model_sp.params['C(Media)[T.Med_Minyak]']:.2f} (SE: {model_sp.bse['C(Media)[T.Med_Minyak]']:.2f})\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model Split-Plot (MixedLM)\nVarians Error A (Whole-Plot) : 7.9154 (Sejati: 9.00)\nVarians Error B (Sub-Plot)   : 2.3412 (Sejati: 2.25)\nEfek Suhu (Hard-to-Change)   : -20.45 (SE: 2.11)\nEfek Media (Easy-to-Change)  : -10.12 (SE: 0.88)"
    },
    "commonPitfalls": [
      "Menganalisis eksperimen split-plot menggunakan Two-Way ANOVA standar dengan satu penyebut galat tunggal (mengecilkan p-value whole plot secara palsu).",
      "Mengabaikan kendala operasional hard-to-change dan mengklaim telah melakukan randomisasi penuh padahal suhu hanya diubah sekali.",
      "Melupakan bahwa faktor whole-plot memiliki kekuatan uji (power) yang jauh lebih rendah daripada faktor sub-plot."
    ],
    "validationProcedures": [
      "Identifikasi faktor mana yang sulit diubah (suhu, batch reaktor) dan tetapkan sebagai whole plot.",
      "Pastikan tabel ANOVA memuat dua baris galat terpisah: Error A dan Error B.",
      "Gunakan pemodelan Linear Mixed Models (LMM) dengan random intercept untuk unit whole plot sebagai pendekatan komputasi modern."
    ],
    "exercises": [
      {
        "question": "Mengapa analisis data eksperimen Split-Plot secara matematis wajib menggunakan dua komponen suku galat (Error A dan Error B) yang terpisah?",
        "hint": "Perhatikan perbedaan tingkat pengacakan antara faktor yang sulit diubah dan faktor yang mudah diubah.",
        "answerExplanation": "Desain Split-Plot memiliki dua unit eksperimen dengan ukuran berbeda akibat dua tingkat pengacakan. Faktor yang sulit diubah (whole plot) memiliki variabilitas galat yang lebih besar (Error A), sedangkan faktor yang mudah diubah diuji di dalam plot yang sama dengan variabilitas galat yang lebih kecil (Error B)."
      }
    ],
    "references": [
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Jones, B., & Nachtsheim, C. J. (2009). Split-plot designs: What, why, and how. Journal of Quality Technology, 41(4), 340-361.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Desain Split-Plot untuk Faktor yang Sulit Diubah (Hard-to-Change Factors)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.8.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.8.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengidentifikasi kendala logistik faktor yang sulit diubah (hard-to-change factors) dalam industri.",
          "Capaian 2: Memahami struktur dua tingkat pengacakan: Whole Plot (faktor makro) dan Sub-Plot (faktor mikro).",
          "Capaian 3: Menghitung dan membedakan dua komponen galat residual yang berbeda: Error A dan Error B."
        ],
        "keyFormulaOrDiagram": "$$y_{ijk} = \\mu + \\rho_i + \\alpha_j + \\eta_{ij} + \\beta_k + (\\alpha\\beta)_{jk} + \\epsilon_{ijk}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.8.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Desain Split-Plot untuk Faktor yang Sulit Diubah (Hard-to-Change Factors)",
        "lead": "Dalam eksperimen faktorial standar, diasumsikan bahwa seluruh kombinasi perlakuan dapat diacak urutannya secara bebas dan independen murni.",
        "bulletPoints": [
          "Namun, dalam industri manufaktur, metalurgi, pertanian, dan pemrosesan kimia, asumsi ini sering kali mustahil dipenuhi secara praktis akibat adanya Faktor yang Sulit Diubah (Hard-to-Change Factors).",
          "Contoh Kendala Fisik: Sebuah eksperimen menguji pengaruh Suhu Tungku Pembakaran (Furnace Temperature: 800 C vs 1000 C) dan Waktu Penahanan (Holding Time: 15 menit vs 30 menit) terhadap kekerasan paduan logam.",
          "Mengubah suhu tungku pembakaran dari 800 C ke 1000 C membutuhkan waktu 6 jam pemanasan, dan mendinginkannya kembali membutuhkan waktu 12 jam."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Struktur Desain Split-Plot: Untuk mengatasi kendala fisik ini secara elegan dan jujur, digunakan Desain Split-Plot: 1.",
        "bulletPoints": [
          "Whole Plot: Tingkat perlakuan makro (misal suhu tungku) diatur pada satu level tetap, membentuk satu \"plot utama\".",
          "2.",
          "Konsekuensi Statistika Krusial: Desain Split-Plot memiliki Dua Suku Galat Residual yang Berbeda: - Galat Plot Utama (Whole-Plot Error, Error A): Digunakan sebagai penyebut untuk menguji faktor yang sulit diubah.",
          "Karena ukuran replikasi whole plot sedikit, uji untuk faktor sulit ini memiliki kekuatan statistik yang lebih rendah. - Galat Sub-Plot (Sub-Plot Error, Error B): Digunakan sebagai penyebut untuk menguji faktor yang mudah diubah dan efek interaksinya."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Model Statistik Split-Plot:",
        "bulletPoints": [
          "di mana:",
          "- $\\rho_i$ adalah efek blok/replikasi ke-$i$ ($i = 1, \\dots, r$).",
          "- $\\alpha_j$ adalah efek faktor Whole-Plot (Hard-to-Change) ke-$j$ ($j = 1, \\dots, a$)."
        ],
        "keyFormulaOrDiagram": "$$y_{ijk} = \\mu + \\rho_i + \\alpha_j + \\eta_{ij} + \\beta_k + (\\alpha\\beta)_{jk} + \\epsilon_{ijk}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada pengujian perlakuan panas baja, Faktor A (Suhu Tungku: 2 level, Hard-to-change) dan Faktor B (Media Pendingin: 3 level, Easy-to-change) diuji dengan r = 3 blok replikasi (total N = 18). Dari analisis ANOVA diperoleh:\nMS_A = 120.0, MS_ErrorA = 15.0\nMS_B = 80.0, MS_AB = 40.0, MS_ErrorB = 4.0\nHitung statistik F untuk Faktor A, Faktor B, dan Interaksi AB dengan penyebut galat yang tepat.",
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
          "Langkah 1: Identifikasi derajat kebebasan dan pasang penyebut galat yang tepat:\n- Faktor A (Whole plot): df_A = a - 1 = 2 - 1 = 1.\n  Penyebut: Error A dengan df = (r - 1)(a - 1) = (3 - 1)(2 - 1) = 2.\n- Faktor B (Sub plot): df_B = b - 1 = 3 - 1 = 2.\n  Penyebut: Error B dengan df = a(r - 1)(b - 1) = 2(2)(2) = 8.\n- Interaksi AB: df_AB = (a - 1)(b - 1) = (1)(2) = 2.\n  Penyebut: Error B (df = 8).",
          "Langkah 2: Hitung F untuk Faktor A (Suhu Tungku):\nF_A = MS_A / MS_ErrorA = 120.0 / 15.0 = 8.00 (df1 = 1, df2 = 2).\nNilai kritis F_(0.05, 1, 2) = 18.51 -> Tidak Signifikan."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung F untuk Faktor B (Media Pendingin):\nF_B = MS_B / MS_ErrorB = 80.0 / 4.0 = 20.00 (df1 = 2, df2 = 8).\nNilai kritis F_(0.05, 2, 8) = 4.46 -> Sangat Signifikan (p < 0.001).",
          "Langkah 4: Hitung F untuk Interaksi AB:\nF_AB = MS_AB / MS_ErrorB = 40.0 / 4.0 = 10.00 (df1 = 2, df2 = 8).\nNilai kritis F_(0.05, 2, 8) = 4.46 -> Sangat Signifikan (p = 0.007).",
          "[result: Interpretasi Ilmiah] Penyebut galat yang berbeda sangat menentukan keputusan inferensi. Faktor B dan interaksi AB diuji terhadap Error B (MSE = 4.0) dan terbukti sangat signifikan. Jika peneliti keliru menganalisisnya sebagai faktorial standar menggunakan gabungan galat, p-value untuk faktor A akan terbias palsu."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pemodelan analisis split-plot dua tingkat galat menggunakan MixedLM statsmodels.",
        "bulletPoints": [
          "Tujuan Algoritma: Pemodelan analisis split-plot dua tingkat galat menggunakan MixedLM statsmodels.",
          "Dependensi Pustaka Ilmiah: numpy, pandas, statsmodels",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model Split-Plot (MixedLM)"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model Split-Plot (MixedLM)\nVarians Error A (Whole-Plot) : 7.9154 (Sejati: 9.00)\nVarians Error B (Sub-Plot)   : 2.3412 (Sejati: 2.25)\nEfek Suhu (Hard-to-Change)   : -20.45 (SE: 2.11)\nEfek Media (Easy-to-Change)  : -10.12 (SE: 0.88)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menganalisis eksperimen split-plot menggunakan Two-Way ANOVA standar dengan satu penyebut galat tunggal (mengecilkan p-value whole plot secara palsu).",
          "[warning: Perangkap] Mengabaikan kendala operasional hard-to-change dan mengklaim telah melakukan randomisasi penuh padahal suhu hanya diubah sekali.",
          "[warning: Perangkap] Melupakan bahwa faktor whole-plot memiliki kekuatan uji (power) yang jauh lebih rendah daripada faktor sub-plot."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Identifikasi faktor mana yang sulit diubah (suhu, batch reaktor) dan tetapkan sebagai whole plot.",
          "Prosedur: Pastikan tabel ANOVA memuat dua baris galat terpisah: Error A dan Error B.",
          "Prosedur: Gunakan pemodelan Linear Mixed Models (LMM) dengan random intercept untuk unit whole plot sebagai pendekatan komputasi modern."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa analisis data eksperimen Split-Plot secara matematis wajib menggunakan dua komponen suku galat (Error A dan Error B) yang terpisah?",
          "Petunjuk Analitis: Perhatikan perbedaan tingkat pengacakan antara faktor yang sulit diubah dan faktor yang mudah diubah.",
          "Solusi Kunci: Desain Split-Plot memiliki dua unit eksperimen dengan ukuran berbeda akibat dua tingkat pengacakan. Faktor yang sulit diubah (whole plot) memiliki variabilitas galat yang lebih besar (Error A), sedangkan faktor yang mudah diubah diuji di dalam plot yang sama dengan variabilitas galat yang lebih kecil (Error B)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.8.4": {
    "id": "4.8.4",
    "chapterId": "CH-31",
    "title": "Pengantar Response Surface Methodology (RSM): Optimasi Proses Orde-2 via Central Composite Design (CCD)",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami metodologi Response Surface Methodology (RSM) untuk optimasi proses multi-variabel kontinu.",
      "Merancang arsitektur Central Composite Design (CCD) yang menggabungkan faktorial, titik aksial, dan titik pusat.",
      "Menurunkan kondisi optimum titik stasioner (stationary point) menggunakan kalkulus gradien matriks kuadratik."
    ],
    "content": "Desain faktorial 2^k sangat efektif untuk menyaring faktor dan memodelkan aproksimasi linier orde-1. Namun, ketika proses rekayasa sudah mendekati wilayah optimum, hubungan antara parameter input dan respon hampir selalu melengkung (curvature). Model linier tidak lagi mampu memetakan puncak bukit respon (optimum maximum) atau lembah terdalam (optimum minimum).\n\nResponse Surface Methodology (RSM), yang dikembangkan oleh George E.P. Box dan K.B. Wilson (1951), adalah metodologi matematika dan statistik terpadu untuk memodelkan, memprediksi, dan mengoptimalkan respon kontinu multi-variabel melalui polinomial kuadratik orde-2.\n\nCentral Composite Design (CCD):\nDesain eksperimen standar emas untuk membangun model permukaan respon orde-2 adalah Central Composite Design (CCD). Struktur geometris CCD dibangun secara efisien dari tiga komponen:\n1. Poin Faktorial (Factorial Points): Desain 2^k (atau 2^(k-p)) pada koordinat (-1, +1), untuk mengestimasi efek linier dan interaksi dua faktor.\n2. Titik Pusat (Center Points): Replikasi pengujian pada titik pusat (0, 0, ..., 0), untuk mendeteksi kelengkungan murni dan mengestimasi varians galat eksperimental tanpa menambah perlakuan baru.\n3. Titik Aksial / Bintang (Axial / Star Points): Titik-titik pengujian yang ditempatkan pada sumbu koordinat pada jarak radial alpha: (-alpha, 0), (+alpha, 0), (0, -alpha), dll., untuk mengestimasi suku kelengkungan kuadratik murni (x1^2, x2^2).\n\nPenentuan Nilai Alpha:\nUntuk menjamin sifat Rotatability (presisi prediksi model seragam di seluruh arah radial dari titik pusat), nilai alpha ditetapkan sebesar alpha = (2^k)^(1/4). Melalui analisis kanonik matriks Hessian kuadratik, peneliti dapat menentukan secara analitis apakah titik stasioner yang ditemukan adalah Titik Maksimum Lokal, Titik Minimum Lokal, atau Titik Pelana (Saddle Point).",
    "mathematicalFoundations": "1. Model Polinomial Orde-2 Lengkap RSM:\n$$y = \\beta_0 + \\sum_{i=1}^k \\beta_i x_i + \\sum_{i=1}^k \\beta_{ii} x_i^2 + \\sum_{i < j} \\sum \\beta_{ij} x_i x_j + \\epsilon$$\nDalam notasi matriks kuadratik:\n$$\\hat{y}(\\mathbf{x}) = \\beta_0 + \\mathbf{x}^T \\mathbf{b} + \\mathbf{x}^T \\mathbf{B} \\mathbf{x}$$\ndi mana $\\mathbf{b} = [\\beta_1, \\dots, \\beta_k]^T$ dan matriks simetris Hessian $\\mathbf{B}$:\n$$\\mathbf{B} = \\begin{bmatrix} \\beta_{11} & \\frac{1}{2}\\beta_{12} & \\dots & \\frac{1}{2}\\beta_{1k} \\\\ \\frac{1}{2}\\beta_{12} & \\beta_{22} & \\dots & \\frac{1}{2}\\beta_{2k} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ \\frac{1}{2}\\beta_{1k} & \\frac{1}{2}\\beta_{2k} & \\dots & \\beta_{kk} \\end{bmatrix}$$\n\n2. Solusi Titik Stasioner Optimum (Stationary Point):\nTurunkan terhadap vektor $\\mathbf{x}$ dan samakan dengan nol:\n$$\\frac{\\partial \\hat{y}}{\\partial \\mathbf{x}} = \\mathbf{b} + 2 \\mathbf{B} \\mathbf{x} = \\mathbf{0}$$\n$$\\mathbf{x}_s = -\\frac{1}{2} \\mathbf{B}^{-1} \\mathbf{b}$$\nRespon yang diprediksi pada titik stasioner:\n$$\\hat{y}_s = \\beta_0 + \\frac{1}{2} \\mathbf{x}_s^T \\mathbf{b}$$\n\n3. Klasifikasi Karakteristik Titik Stasioner via Nilai Eigen Matriks $\\mathbf{B}$:\nMisalkan $\\lambda_1, \\dots, \\lambda_k$ adalah nilai eigen dari $\\mathbf{B}$:\n- Seluruh $\\lambda_i < 0$ (Definit Negatif): Titik stasioner adalah **Maksimum Lokal** (Puncak Bukit).\n- Seluruh $\\lambda_i > 0$ (Definit Positif): Titik stasioner adalah **Minimum Lokal** (Dasar Lembah).\n- $\\lambda_i$ memiliki tanda campuran (positif dan negatif): Titik stasioner adalah **Titik Pelana (Saddle Point)**.\n\n4. Nilai Rotatable Alpha untuk CCD:\n$$\\alpha = (N_F)^{1/4} = (2^k)^{1/4}$$\nUntuk $k = 2$: $\\alpha = (4)^{1/4} = \\sqrt{2} \\approx 1.414$.\nUntuk $k = 3$: $\\alpha = (8)^{1/4} \\approx 1.682$.",
    "workedExample": {
      "problemStatement": "Pada optimasi proses ekstraksi minyak atsiri 2 faktor (x1 = Suhu, x2 = Waktu), model kuadratik orde-2 RSM yang terestimasi adalah:\ny_hat = 82.5 + 4.0*x1 + 2.0*x2 - 2.5*x1^2 - 1.5*x2^2 - 1.0*x1*x2.\nSusun vektor b dan matriks B, hitung koordinat titik stasioner x_s, tentukan jenis optimumnya via nilai eigen, dan hitung respon yield maksimum yang diprediksi.",
      "stepByStepSolution": [
        "Langkah 1: Susun vektor linier b dan matriks kuadratik B:\nb = [4.0, 2.0]^T.\nbeta_11 = -2.5, beta_22 = -1.5, beta_12 = -1.0 -> elemen non-diagonal = beta_12 / 2 = -0.5.\nB = [[-2.5, -0.5], [-0.5, -1.5]].",
        "Langkah 2: Hitung determinan dan invers dari matriks B:\ndet(B) = (-2.5)(-1.5) - (-0.5)^2 = 3.75 - 0.25 = 3.50.\nB^(-1) = (1 / 3.50) * [[-1.5, 0.5], [0.5, -2.5]].",
        "Langkah 3: Hitung titik stasioner x_s = -0.5 * B^(-1) * b:\nB^(-1) * b = (1 / 3.5) * [ (-1.5 * 4.0 + 0.5 * 2.0), (0.5 * 4.0 - 2.5 * 2.0) ] = (1 / 3.5) * [ -6.0 + 1.0, 2.0 - 5.0 ] = (1 / 3.5) * [ -5.0, -3.0 ] = [-1.4286, -0.8571]^T.\nx_s = -0.5 * [-1.4286, -0.8571]^T = [+0.7143, +0.4286]^T.",
        "Langkah 4: Klasifikasi jenis optimum via nilai eigen B:\nPersamaan karakteristik: det(B - lambda*I) = (-2.5 - lambda)(-1.5 - lambda) - 0.25 = lambda^2 + 4.0*lambda + 3.50 = 0.\nlambda = [-4.0 +- sqrt(16.0 - 14.0)] / 2 = [-4.0 +- 1.4142] / 2.\nlambda_1 = -1.2929, lambda_2 = -2.7071.\nKarena KEDUA nilai eigen bertanda negatif murni (lambda < 0), titik stasioner adalah MAKSIMUM LOKAL SEJATI.",
        "Langkah 5: Hitung yield maksimum y_hat_s:\ny_hat_s = beta_0 + 0.5 * x_s^T * b = 82.5 + 0.5 * (0.7143 * 4.0 + 0.4286 * 2.0) = 82.5 + 0.5 * (2.8572 + 0.8572) = 82.5 + 0.5 * (3.7144) = 82.5 + 1.857 = 84.36%."
      ],
      "resultInterpretation": "Kondisi operasi optimal tercapai pada koordinat terkode Suhu x1 = +0.71 dan Waktu x2 = +0.43. Di titik puncak ini, yield ekstraksi maksimum diprediksi mencapai 84.36%."
    },
    "pythonImplementation": {
      "description": "Optimasi matematis RSM: Kalkulasi titik stasioner, analisis nilai eigen Hessian, dan prediksi respon maksimum.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Koefisien model kuadratik orde-2: y = 82.5 + 4*x1 + 2*x2 - 2.5*x1^2 - 1.5*x2^2 - 1*x1*x2\nbeta_0 = 82.5\nb = np.array([4.0, 2.0])\nB = np.array([\n    [-2.5, -0.5],\n    [-0.5, -1.5]\n])\n\n# 1. Hitung Titik Stasioner: x_s = -0.5 * B^(-1) * b\nB_inv = np.linalg.inv(B)\nx_s = -0.5 * B_inv @ b\n\n# 2. Analisis Nilai Eigen untuk Klasifikasi Permukaan\neigenvalues, _ = np.linalg.eig(B)\n\n# 3. Prediksi Respon Optimum\ny_s = beta_0 + 0.5 * (x_s.T @ b)\n\njenis_optimum = \"Maksimum Lokal\" if np.all(eigenvalues < 0) else (\"Minimum Lokal\" if np.all(eigenvalues > 0) else \"Titik Pelana (Saddle Point)\")\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Analisis Optimasi Response Surface Methodology (RSM)\")\nprint(f\"Koordinat Titik Stasioner (x_s) : x1 = {x_s[0]:.4f}, x2 = {x_s[1]:.4f}\")\nprint(f\"Nilai Eigen Matriks Hessian (B) : lambda_1 = {eigenvalues[0]:.4f}, lambda_2 = {eigenvalues[1]:.4f}\")\nprint(f\"Karakteristik Titik Stasioner   : {jenis_optimum}\")\nprint(f\"Prediksi Respon Optimum (y_max) : {y_s:.2f}%\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Analisis Optimasi Response Surface Methodology (RSM)\nKoordinat Titik Stasioner (x_s) : x1 = 0.7143, x2 = 0.4286\nNilai Eigen Matriks Hessian (B) : lambda_1 = -2.7071, lambda_2 = -1.2929\nKarakteristik Titik Stasioner   : Maksimum Lokal\nPrediksi Respon Optimum (y_max) : 84.36%"
    },
    "commonPitfalls": [
      "Menyimpulkan titik stasioner sebagai titik maksimum tanpa memeriksa nilai eigen matriks B (titik tersebut bisa jadi merupakan saddle point di mana respon justru menurun pada arah tertentu).",
      "Menghitung koordinat optimum yang jatuh jauh di luar wilayah eksperimen (|x_s| > alpha) dan memaksakan ekstrapolasi yang tidak valid.",
      "Mengabaikan titik pusat (center points) sehingga tidak dapat memisahkan galat eksperimental murni dari ketidakcocokan model (lack of fit)."
    ],
    "validationProcedures": [
      "Uji Lack of Fit model kuadratik: pastikan p-value lack of fit > 0.05 (model cocok dengan data).",
      "Periksa apakah titik stasioner x_s berada di dalam batas domain eksperimen teruji.",
      "Jalankan pengujian konfirmasi laboratorium fisik pada koordinat titik stasioner yang direkomendasikan."
    ],
    "exercises": [
      {
        "question": "Pada analisis kanonik model kuadratik RSM, jika matriks kuadratik Hessian B memiliki nilai eigen lambda_1 = +3.2 dan lambda_2 = -1.8, apakah jenis titik stasioner yang teridentifikasi?",
        "hint": "Perhatikan tanda dari masing-masing nilai eigen (satu positif dan satu negatif).",
        "answerExplanation": "Titik stasioner tersebut adalah Titik Pelana (Saddle Point). Pada arah vektor eigen pertama respon berbentuk lembah (minimum), sedangkan pada arah vektor eigen kedua respon berbentuk bukit (maksimum), sehingga sistem tidak memiliki titik ekstrem tunggal murni di wilayah tersebut."
      }
    ],
    "references": [
      {
        "citation": "Box, G. E., & Wilson, K. B. (1951). On the experimental attainment of optimum conditions. Journal of the Royal Statistical Society: Series B, 13(1), 1-38.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Myers, R. H., Montgomery, D. C., & Anderson-Cook, C. M. (2016). Response Surface Methodology: Process and Product Optimization Using Designed Experiments (4th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pengantar Response Surface Methodology (RSM): Optimasi Proses Orde-2 via Central Composite Design (CCD)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.8.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.8.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami metodologi Response Surface Methodology (RSM) untuk optimasi proses multi-variabel kontinu.",
          "Capaian 2: Merancang arsitektur Central Composite Design (CCD) yang menggabungkan faktorial, titik aksial, dan titik pusat.",
          "Capaian 3: Menurunkan kondisi optimum titik stasioner (stationary point) menggunakan kalkulus gradien matriks kuadratik."
        ],
        "keyFormulaOrDiagram": "$$y = \\beta_0 + \\sum_{i=1}^k \\beta_i x_i + \\sum_{i=1}^k \\beta_{ii} x_i^2 + \\sum_{i < j} \\sum \\beta_{ij} x_i x_j + \\epsilon$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.8.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pengantar Response Surface Methodology (RSM): Optimasi Proses Orde-2 via Central Composite Design (CCD)",
        "lead": "Desain faktorial 2^k sangat efektif untuk menyaring faktor dan memodelkan aproksimasi linier orde-1.",
        "bulletPoints": [
          "Namun, ketika proses rekayasa sudah mendekati wilayah optimum, hubungan antara parameter input dan respon hampir selalu melengkung (curvature).",
          "Model linier tidak lagi mampu memetakan puncak bukit respon (optimum maximum) atau lembah terdalam (optimum minimum).",
          "Response Surface Methodology (RSM), yang dikembangkan oleh George E.P.",
          "Box dan K.B."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Central Composite Design (CCD): Desain eksperimen standar emas untuk membangun model permukaan respon orde-2 adalah Central Composite Design (CCD).",
        "bulletPoints": [
          "Struktur geometris CCD dibangun secara efisien dari tiga komponen: 1.",
          "Poin Faktorial (Factorial Points): Desain 2^k (atau 2^(k-p)) pada koordinat (-1, +1), untuk mengestimasi efek linier dan interaksi dua faktor.",
          "Penentuan Nilai Alpha: Untuk menjamin sifat Rotatability (presisi prediksi model seragam di seluruh arah radial dari titik pusat), nilai alpha ditetapkan sebesar alpha = (2^k)^(1/4).",
          "Melalui analisis kanonik matriks Hessian kuadratik, peneliti dapat menentukan secara analitis apakah titik stasioner yang ditemukan adalah Titik Maksimum Lokal, Titik Minimum Lokal, atau Titik Pelana (Saddle Point)."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Model Polinomial Orde-2 Lengkap RSM:",
        "bulletPoints": [
          "Dalam notasi matriks kuadratik:",
          "di mana $\\mathbf{b} = [\\beta_1, \\dots, \\beta_k]^T$ dan matriks simetris Hessian $\\mathbf{B}$:",
          "2. Solusi Titik Stasioner Optimum (Stationary Point):"
        ],
        "keyFormulaOrDiagram": "$$y = \\beta_0 + \\sum_{i=1}^k \\beta_i x_i + \\sum_{i=1}^k \\beta_{ii} x_i^2 + \\sum_{i < j} \\sum \\beta_{ij} x_i x_j + \\epsilon$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada optimasi proses ekstraksi minyak atsiri 2 faktor (x1 = Suhu, x2 = Waktu), model kuadratik orde-2 RSM yang terestimasi adalah:\ny_hat = 82.5 + 4.0*x1 + 2.0*x2 - 2.5*x1^2 - 1.5*x2^2 - 1.0*x1*x2.\nSusun vektor b dan matriks B, hitung koordinat titik stasioner x_s, tentukan jenis optimumnya via nilai eigen, dan hitung respon yield maksimum yang diprediksi.",
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
          "Langkah 1: Susun vektor linier b dan matriks kuadratik B:\nb = [4.0, 2.0]^T.\nbeta_11 = -2.5, beta_22 = -1.5, beta_12 = -1.0 -> elemen non-diagonal = beta_12 / 2 = -0.5.\nB = [[-2.5, -0.5], [-0.5, -1.5]].",
          "Langkah 2: Hitung determinan dan invers dari matriks B:\ndet(B) = (-2.5)(-1.5) - (-0.5)^2 = 3.75 - 0.25 = 3.50.\nB^(-1) = (1 / 3.50) * [[-1.5, 0.5], [0.5, -2.5]].",
          "Langkah 3: Hitung titik stasioner x_s = -0.5 * B^(-1) * b:\nB^(-1) * b = (1 / 3.5) * [ (-1.5 * 4.0 + 0.5 * 2.0), (0.5 * 4.0 - 2.5 * 2.0) ] = (1 / 3.5) * [ -6.0 + 1.0, 2.0 - 5.0 ] = (1 / 3.5) * [ -5.0, -3.0 ] = [-1.4286, -0.8571]^T.\nx_s = -0.5 * [-1.4286, -0.8571]^T = [+0.7143, +0.4286]^T."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Klasifikasi jenis optimum via nilai eigen B:\nPersamaan karakteristik: det(B - lambda*I) = (-2.5 - lambda)(-1.5 - lambda) - 0.25 = lambda^2 + 4.0*lambda + 3.50 = 0.\nlambda = [-4.0 +- sqrt(16.0 - 14.0)] / 2 = [-4.0 +- 1.4142] / 2.\nlambda_1 = -1.2929, lambda_2 = -2.7071.\nKarena KEDUA nilai eigen bertanda negatif murni (lambda < 0), titik stasioner adalah MAKSIMUM LOKAL SEJATI.",
          "Langkah 5: Hitung yield maksimum y_hat_s:\ny_hat_s = beta_0 + 0.5 * x_s^T * b = 82.5 + 0.5 * (0.7143 * 4.0 + 0.4286 * 2.0) = 82.5 + 0.5 * (2.8572 + 0.8572) = 82.5 + 0.5 * (3.7144) = 82.5 + 1.857 = 84.36%.",
          "[result: Interpretasi Ilmiah] Kondisi operasi optimal tercapai pada koordinat terkode Suhu x1 = +0.71 dan Waktu x2 = +0.43. Di titik puncak ini, yield ekstraksi maksimum diprediksi mencapai 84.36%."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Optimasi matematis RSM: Kalkulasi titik stasioner, analisis nilai eigen Hessian, dan prediksi respon maksimum.",
        "bulletPoints": [
          "Tujuan Algoritma: Optimasi matematis RSM: Kalkulasi titik stasioner, analisis nilai eigen Hessian, dan prediksi respon maksimum.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Analisis Optimasi Response Surface Methodology (RSM)"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Analisis Optimasi Response Surface Methodology (RSM)\nKoordinat Titik Stasioner (x_s) : x1 = 0.7143, x2 = 0.4286\nNilai Eigen Matriks Hessian (B) : lambda_1 = -2.7071, lambda_2 = -1.2929\nKarakteristik Titik Stasioner   : Maksimum Lokal\nPrediksi Respon Optimum (y_max) : 84.36%",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpulkan titik stasioner sebagai titik maksimum tanpa memeriksa nilai eigen matriks B (titik tersebut bisa jadi merupakan saddle point di mana respon justru menurun pada arah tertentu).",
          "[warning: Perangkap] Menghitung koordinat optimum yang jatuh jauh di luar wilayah eksperimen (|x_s| > alpha) dan memaksakan ekstrapolasi yang tidak valid.",
          "[warning: Perangkap] Mengabaikan titik pusat (center points) sehingga tidak dapat memisahkan galat eksperimental murni dari ketidakcocokan model (lack of fit)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Uji Lack of Fit model kuadratik: pastikan p-value lack of fit > 0.05 (model cocok dengan data).",
          "Prosedur: Periksa apakah titik stasioner x_s berada di dalam batas domain eksperimen teruji.",
          "Prosedur: Jalankan pengujian konfirmasi laboratorium fisik pada koordinat titik stasioner yang direkomendasikan."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Pada analisis kanonik model kuadratik RSM, jika matriks kuadratik Hessian B memiliki nilai eigen lambda_1 = +3.2 dan lambda_2 = -1.8, apakah jenis titik stasioner yang teridentifikasi?",
          "Petunjuk Analitis: Perhatikan tanda dari masing-masing nilai eigen (satu positif dan satu negatif).",
          "Solusi Kunci: Titik stasioner tersebut adalah Titik Pelana (Saddle Point). Pada arah vektor eigen pertama respon berbentuk lembah (minimum), sedangkan pada arah vektor eigen kedua respon berbentuk bukit (maksimum), sehingga sistem tidak memiliki titik ekstrem tunggal murni di wilayah tersebut."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
