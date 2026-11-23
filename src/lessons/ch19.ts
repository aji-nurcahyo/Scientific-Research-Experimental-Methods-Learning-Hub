import { Lesson } from '../types/curriculum';

export const CH19_LESSONS: Record<string, Partial<Lesson>> = {
  "3.4.1": {
    "id": "3.4.1",
    "chapterId": "CH-19",
    "title": "Kerangka Inferensi Fisherian vs Neyman-Pearson Decision Theory",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Membedakan dua tradisi epistemologis pengujian hipotesis klasik: Fisherian vs Neyman-Pearson.",
      "Memahami sintesis hibrida tidak resmi (Null Hypothesis Significance Testing / NHST) dan kontradiksi internalnya.",
      "Menerapkan batas keputusan Tipe I (alpha) dan Tipe II (beta) dalam pengendalian kualitas rekayasa."
    ],
    "content": "Sebagian besar buku teks pengantar statistika menyajikan pengujian hipotesis seolah-olah pengujian tersebut adalah metode monolitik yang tunggal dan disepakati secara bulat. Kenyataannya, prosedur yang kita kenal saat ini sebagai Null Hypothesis Significance Testing (NHST) adalah gabungan hibrida tidak resmi dari dua mazhab pemikiran yang saling bertentangan secara tajam: Mazhab Ronald Fisher melawan Mazhab Jerzy Neyman dan Egon Pearson.\n\n1. Pendekatan Fisher (Uji Signifikansi Murni): Fisher memandang pengujian sebagai alat inferensi induktif pembelajaran ilmiah (*inductive inference*). Peneliti hanya merumuskan satu hipotesis tunggal: Hipotesis Nol ($H_0$). Nilai p-value dihitung sebagai ukuran kuantitatif kontinu mengenai kekuatan bukti empiris terhadap kebenaran $H_0$. Jika p-value sangat kecil, data dianggap mengejutkan di bawah asumsi $H_0$. Fisher tidak mengenal hipotesis tandingan ($H_1$), tidak menetapkan batas ambang $\\alpha$ yang kaku di awal, dan tidak mempertimbangkan daya uji statistik (*power*).\n2. Pendekatan Neyman-Pearson (Teori Keputusan Perilaku Induktif): Neyman dan Pearson menolak pandangan Fisher dan memandang pengujian sebagai prosedur pengambilan keputusan mekanis dalam situasi berulang (*inductive behavior*). Peneliti wajib menetapkan dua hipotesis yang bersaing ($H_0$ dan $H_1$), mengunci tingkat toleransi kesalahan sebelum pengujian dimulai: Galat Tipe I (False Positive, $\\alpha$) dan Galat Tipe II (False Negative, $\\beta$), lalu mengoptimalkan wilayah penolakan untuk memaksimalkan daya uji statistik ($1 - \\beta$).\n\nPraktik modern mencampuradukkan keduanya secara keliru: mengambil p-value dari Fisher lalu membandingkannya secara dikotomis dengan ambang batas $\\alpha = 0.05$ dari Neyman-Pearson, memicu krisis reproduksibilitas sains kontemporer.",
    "mathematicalFoundations": "1. Logika Fisherian P-Value:\nUkuran bukti kontinu empiris bersyarat terhadap kebenaran $H_0$:\n$$p = P(T(\\mathbf{X}) \\ge t_{\\text{obs}} \\mid H_0)$$\nInterpretasi: Derajat kompatibilitas data dengan model nol.\n\n2. Matriks Keputusan Neyman-Pearson:\n$$\\begin{matrix}\n\\text{Keputusan Realitas} & H_0 \\text{ Benar (State 0)} & H_1 \\text{ Benar (State 1)} \\\\\n\\text{Terima } H_0 & 1 - \\alpha \\text{ (Keputusan Benar)} & \\beta \\text{ (Galat Tipe II)} \\\\\n\\text{Tolak } H_0 & \\alpha \\text{ (Galat Tipe I)} & 1 - \\beta \\text{ (Daya Uji / Power)}\n\\end{matrix}$$\n\nLema Fundamental Neyman-Pearson:\nUntuk menguji $H_0: \\theta = \\theta_0$ vs $H_1: \\theta = \\theta_1$, uji yang paling berdaya (*Most Powerful Test*) pada tingkat signifikansi $\\alpha$ adalah Uji Rasio Likelihood:\n$$\\Lambda(\\mathbf{x}) = \\frac{L(\\theta_0; \\mathbf{x})}{L(\\theta_1; \\mathbf{x})} \\le k_\\alpha$$",
    "workedExample": {
      "problemStatement": "Pada pengujian sensor deteksi kebocoran gas metana tambang batubara di Sumatera, terdapat dua skenario risiko: H0 adalah kondisi normal (tidak ada kebocoran), dan H1 adalah kondisi kebocoran gas berbahaya. Analisis konsekuensi fisis dari Galat Tipe I dan Galat Tipe II, lalu tentukan prioritas minimasi bagi insinyur keselamatan tambang.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi Galat Tipe I (False Positive / False Alarm): Sensor membunyikan alarm evakuasi darurat (menolak H0) padahal konsentrasi gas sebenarnya normal (H0 benar).",
        "Konsekuensi Tipe I: Pabrik berhenti beroperasi sementara, tim evakuasi turun, biaya kerugian ekonomi terbuang.",
        "Langkah 2: Identifikasi Galat Tipe II (False Negative / Missed Detection): Sensor tetap diam dan menyatakan kondisi aman (gagal menolak H0) padahal terjadi kebocoran gas berbahaya (H1 benar).",
        "Konsekuensi Tipe II: Ledakan tambang fatal dan hilangnya nyawa para pekerja.",
        "Langkah 3: Penetapan prioritas rekayasa: Konsekuensi Galat Tipe II jauh lebih katastropik dibanding Galat Tipe I. Insinyur wajib merancang sistem dengan daya uji maksimum (1 - beta > 0.999), bersedia menaikkan sedikit ambang alpha (misal alpha = 0.05 dinaikkan ke 0.10) demi memastikan Galat Tipe II mendekati nol."
      ],
      "resultInterpretation": "Pilihan nilai alpha dan beta dalam rekayasa selalu merupakan keputusan trade-off biaya-manfaat fisis yang nyata, bukan sekadar angka ritual 0.05."
    },
    "pythonImplementation": {
      "description": "Simulasi kurva trade-off Galat Tipe I (alpha) versus Daya Uji (1 - beta) pada pengujian hipotesis.",
      "libraryDependencies": [
        "scipy.stats",
        "numpy"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# Model dua hipotesis: H0: N(0, 1) vs H1: N(2.5, 1)\nmu_h0, mu_h1 = 0.0, 2.5\nsigma = 1.0\n\n# Rentang titik potong keputusan (decision threshold c)\nc_ambang = np.linspace(-1.0, 4.0, 6)\n\nprint(f\"{'Ambang c':10s} | {'Galat Tipe I (Alpha)':22s} | {'Daya Uji (1 - Beta)':22s} | {'Galat Tipe II (Beta)':22s}\")\nprint(\"-\" * 80)\nfor c in c_ambang:\n    # Alpha = P(X > c | H0)\n    alpha = stats.norm.sf(c, loc=mu_h0, scale=sigma)\n    # Power = P(X > c | H1)\n    power = stats.norm.sf(c, loc=mu_h1, scale=sigma)\n    beta = 1.0 - power\n    print(f\"c = {c:5.2f}    | {alpha:22.4f} | {power:22.4f} | {beta:22.4f}\")\n",
      "expectedOutput": "Ambang c   | Galat Tipe I (Alpha)   | Daya Uji (1 - Beta)    | Galat Tipe II (Beta)  \n--------------------------------------------------------------------------------\nc = -1.00    |                 0.8413 |                 0.9998 |                 0.0002\nc = -0.00    |                 0.5000 |                 0.9938 |                 0.0062\nc =  1.00    |                 0.1587 |                 0.9332 |                 0.0668\nc =  2.00    |                 0.0228 |                 0.6915 |                 0.3085\nc =  3.00    |                 0.0013 |                 0.3085 |                 0.6915\nc =  4.00    |                 0.0000 |                 0.0668 |                 0.9332"
    },
    "commonPitfalls": [
      "Memperlakukan ambang alpha = 0.05 sebagai hukum alam universal yang tidak boleh disesuaikan dengan konteks risiko aplikasi rekayasa.",
      "Mengartikan p-value sebagai probabilitas bahwa hipotesis nol benar (P(H0 | Data)), yang merupakan kekeliruan inversi bersyarat.",
      "Mengabaikan analisis daya uji statistik (power) saat melaporkan hasil eksperimen yang gagal menolak hipotesis nol."
    ],
    "validationProcedures": [
      "Tetapkan batas ambang alpha dan target beta secara eksplisit sebelum pengumpulan data dilakukan (preregistrasi protokol).",
      "Laporkan kurva Operating Characteristic (OC curve) untuk memetakan sensitivitas deteksi sistem pada berbagai besaran efek."
    ],
    "exercises": [
      {
        "question": "Mengapa Ronald Fisher menentang keras konsep \"Hipotesis Alternatif (H1)\" dan \"Galat Tipe II (Beta)\" yang diusulkan oleh Neyman dan Pearson?",
        "hint": "Perhatikan pandangan Fisher tentang sifat kemajuan sains sebagai proses pembelajaran eksploratori vs keputusan industri pabrik.",
        "answerExplanation": "Fisher memandang sains sebagai proses penemuan pengetahuan baru yang penuh ketidakpastian, di mana ilmuwan sering kali tidak mengetahui secara pasti apa alternatif spesifik yang benar saat suatu teori terbukti gagal. Fisher berargumen bahwa menetapkan satu hipotesis alternatif kaku H1 membatasi imajinasi peneliti, dan konsep keputusan mekanis biner Neyman-Pearson lebih cocok untuk inspeksi penerimaan barang pabrik (*quality control acceptance testing*) dibanding riset ilmiah murni."
      }
    ],
    "references": [
      {
        "citation": "Fisher, R. A. (1935). The Design of Experiments. Oliver and Boyd.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Neyman, J., & Pearson, E. S. (1933). On the problem of the most efficient tests of statistical hypotheses. Philosophical Transactions of the Royal Society of London, 231, 289-337.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Kerangka Inferensi Fisherian vs Neyman-Pearson Decision...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.4.1.",
          "Capaian: Membedakan dua tradisi epistemologis pengujian hipotesis klasik: Fisherian vs Neyman-Pearson.",
          "Capaian: Memahami sintesis hibrida tidak resmi (Null Hypothesis Significance Testing / NHST) dan kontradiksi internalny...",
          "Capaian: Menerapkan batas keputusan Tipe I (alpha) dan Tipe II (beta) dalam pengendalian kualitas rekayasa."
        ],
        "keyFormulaOrDiagram": "$$p = P(T(\\mathbf{X}) \\ge t_{\\text{obs}} \\mid H_0)$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Kerangka Inferensi Fisherian vs Neyman-Pearson Decision...",
        "bulletPoints": [
          "Sebagian besar buku teks pengantar statistika menyajikan pengujian hipotesis seolah-olah pengujian tersebut adalah metode mon...",
          "1. Pendekatan Fisher (Uji Signifikansi Murni): Fisher memandang pengujian sebagai alat inferensi induktif pembelajaran ilmiah...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Praktik modern mencampuradukkan keduanya secara keliru: mengambil p-value dari Fisher lalu..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Praktik modern mencampuradukkan keduanya secara keliru: mengambil p-value dari Fisher lalu membandingkannya secara dikotomis...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Logika Fisherian P-Value:",
          "Ukuran bukti kontinu empiris bersyarat terhadap kebenaran $H_0$:",
          "Interpretasi: Derajat kompatibilitas data dengan model nol."
        ],
        "keyFormulaOrDiagram": "$$p = P(T(\\mathbf{X}) \\ge t_{\\text{obs}} \\mid H_0)$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada pengujian sensor deteksi kebocoran gas metana tambang batubara di Sumatera, terdapat dua skenario risiko: H0 adalah kondisi normal (tid...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi Galat Tipe I (False Positive / False Alarm): Sensor membunyikan alarm evakuasi darurat...",
          "Konsekuensi Tipe I: Pabrik berhenti beroperasi sementara, tim evakuasi turun, biaya kerugian ekonomi terbuang.",
          "Langkah 2: Identifikasi Galat Tipe II (False Negative / Missed Detection): Sensor tetap diam dan menyatakan ko...",
          "Interpretasi: Pilihan nilai alpha dan beta dalam rekayasa selalu merupakan keputusan trade-off biaya-manfaat fisis yang nyata, bukan s..."
        ],
        "keyFormulaOrDiagram": "Langkah 3: Penetapan prioritas rekayasa: Konsekuensi Galat Tipe II jauh lebih katastropik..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi kurva trade-off Galat Tipe I (alpha) versus Daya Uji (1 - beta) pada pengujian hipotesis.",
          "Dependensi Pustaka: scipy.stats, numpy",
          "Keluaran Diharapkan: Ambang c | Galat Tipe I (Alpha) | Daya Uji (1 - Beta) | Galat Tipe II (Beta)"
        ],
        "keyFormulaOrDiagram": "Ambang c | Galat Tipe I (Alpha) | Daya Uji (1 - Beta) | Galat Tipe II (Beta) | -----------..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Memperlakukan ambang alpha = 0.05 sebagai hukum alam universal yang tidak boleh disesuaikan dengan konteks ris...",
          "Perangkap: Mengartikan p-value sebagai probabilitas bahwa hipotesis nol benar (P(H0 | Data)), yang merupakan kekeliruan i...",
          "Perangkap: Mengabaikan analisis daya uji statistik (power) saat melaporkan hasil eksperimen yang gagal menolak hipotesis..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Tetapkan batas ambang alpha dan target beta secara eksplisit sebelum pengumpulan data dilakukan (preregistrasi...",
          "Prosedur: Laporkan kurva Operating Characteristic (OC curve) untuk memetakan sensitivitas deteksi sistem pada berbagai b..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa Ronald Fisher menentang keras konsep \"Hipotesis Alternatif (H1)\" dan \"Galat Tipe II (Beta)\" yang diusulkan oleh...",
          "Petunjuk: Perhatikan pandangan Fisher tentang sifat kemajuan sains sebagai proses pembelajaran eksploratori vs...",
          "Solusi Kunci: Fisher memandang sains sebagai proses penemuan pengetahuan baru yang penuh ketidakpastian, di mana ilmuwan sering kali t..."
        ]
      }
    ]
  },
  "3.4.2": {
    "id": "3.4.2",
    "chapterId": "CH-19",
    "title": "Prosedur 5-Langkah NHST: Satu Sampel, Dua Sampel Independen, dan Sampel Berpasangan",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menerapkan protokol terstruktur 5-langkah Null Hypothesis Significance Testing.",
      "Memilih formula uji-t yang tepat: Satu Sampel, Dua Sampel Independen (Student vs Welch), dan Berpasangan (*Paired*).",
      "Mengevaluasi asumsi homogenitas varians menggunakan Uji Levene."
    ],
    "content": "Agar pengujian signifikansi hipotesis dapat dipertanggungjawabkan secara ilmiah dan kebal dari bias konfirmasi peneliti, pelaksanaannya harus mengikuti Protokol Baku 5-Langkah NHST:\n\n1. Langkah 1 (Formulasi Pasangan Hipotesis): Nyatakan hipotesis nol ($H_0$) dan hipotesis alternatif ($H_1$) dalam parameter populasi terukur, serta tetapkan arah pengujian (satu arah vs dua arah).\n2. Langkah 2 (Spesifikasi Model & Ambang Risiko): Tetapkan tingkat signifikansi $\\alpha$ (misal $\\alpha = 0.05$ atau $\\alpha = 0.01$) dan periksa pemenuhan asumsi matematis data (independensi, normalitas via Shapiro-Wilk, kesetaraan varians via Levene).\n3. Langkah 3 (Perhitungan Statistik Uji Empiris): Hitung nilai statistik uji terstandardisasi ($t_{\\text{obs}}$ atau $z_{\\text{obs}}$) dari data sampel.\n4. Langkah 4 (Penetapan Kriteria Keputusan & P-Value): Hitung nilai p-value yang bersesuaian dengan derajat kebebasan (df) distribusi sampling di bawah asumsi kebenaran $H_0$.\n5. Langkah 5 (Penarikan Kesimpulan Ilmiah Terkontekstualisasi): Buat keputusan statistik formal (Tolak $H_0$ atau Gagal Menolak $H_0$) dan terjemahkan kesimpulan tersebut kembali ke dalam makna fisik rekayasa disertai ukuran efek (*effect size*).\n\nPilihan Varian Uji-t:\n- Satu Sampel: Membandingkan rata-rata sistem baru terhadap nilai standar baku industri acuan ($mu_0$).\n- Dua Sampel Berpasangan (*Paired t-test*): Menguji objek fisik yang sama sebelum dan sesudah perlakuan ($D_i = X_{i,\\text{post}} - X_{i,\\text{pre}}$).\n- Dua Sampel Independen: Membandingkan dua kelompok unit uji yang berbeda. Jika varians kedua kelompok tidak sama ($sigma_1^2 \\neq \\sigma_2^2$), peneliti WAJIB menggunakan Uji Welch's t-test alih-alih Student's t biasa.",
    "mathematicalFoundations": "1. Uji-t Satu Sampel:\n$$t = \\frac{\\bar{X} - \\mu_0}{s / \\sqrt{n}}, \\quad \\nu = n - 1$$\n\n2. Uji-t Sampel Berpasangan:\n$$t = \\frac{\\bar{D} - \\mu_D}{s_D / \\sqrt{n}}, \\quad \\nu = n - 1$$\nDi mana $D_i = X_{1,i} - X_{2,i}$ dan $s_D$ adalah standar deviasi dari selisih pasangan.\n\n3. Uji Welch's t-test (Varians Tidak Sama / Heteroscedastic):\n$$t_{\\text{Welch}} = \\frac{\\bar{X}_1 - \\bar{X}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}$$\n\nDerajat Kebebasan Efektif Welch-Satterthwaite:\n$$\\nu_{\\text{Welch}} = \\frac{\\left( \\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2} \\right)^2}{\\frac{(s_1^2 / n_1)^2}{n_1 - 1} + \\frac{(s_2^2 / n_2)^2}{n_2 - 1}}$$",
    "workedExample": {
      "problemStatement": "Dua belas unit node sensor transmisi diukur konsumsi dayanya (milli-Watt) sebelum dan sesudah optimasi algoritma sleeping protocol. Rata-rata penurunan konsumsi daya per node adalah D_bar = 4.50 mW dengan deviasi standar selisih s_D = 1.80 mW. Ujilah pada tingkat signifikansi alpha = 0.01 apakah optimasi algoritma berhasil menurunkan konsumsi daya secara signifikan.",
      "stepByStepSolution": [
        "Langkah 1: Pasangan Hipotesis: H0: mu_D <= 0 (Tidak ada penurunan daya); H1: mu_D > 0 (Daya turun signifikan, uji satu arah kanan).",
        "Langkah 2: Tingkat signifikansi alpha = 0.01, derajat kebebasan nu = n - 1 = 12 - 1 = 11.",
        "Langkah 3: Hitung statistik uji t berpasangan: t = (4.50 - 0) / (1.80 / sqrt(12)) = 4.50 / (1.80 / 3.4641) = 4.50 / 0.5196 = 8.660.",
        "Langkah 4: Hitung nilai kritis atau p-value: Nilai kritis t_(0.01, 11) = 2.718. Nilai t_obs (8.660) >> 2.718. Nilai p-value = 1.54 x 10^(-6).",
        "Langkah 5: Kesimpulan: Tolak H0 pada alpha = 0.01. Bukti empiris sangat meyakinkan bahwa algoritma sleeping protocol menurunkan konsumsi daya rata-rata sebesar 4.50 mW (p < 0.0001)."
      ],
      "resultInterpretation": "Penurunan daya sebesar 4.50 mW terbukti secara statistik bukan akibat fluktuasi acak pengukuran."
    },
    "pythonImplementation": {
      "description": "Eksekusi protokol 5-langkah uji-t berpasangan dan uji Welch dua sampel menggunakan SciPy.",
      "libraryDependencies": [
        "scipy.stats",
        "numpy"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\n\n# Kasus 1: Uji-t Berpasangan (12 node sensor pre vs post) [SIMULASI/SYNTHETIC DATA]\npre = np.random.normal(loc=25.0, scale=3.0, size=12)\npost = pre - np.random.normal(loc=4.5, scale=1.8, size=12)\n\nt_pair, p_pair = stats.ttest_rel(pre, post, alternative='greater')\nselisih = pre - post\n\nprint(\"KASUS 1: UJI-T BERPASANGAN (Pre vs Post Optimasi)\")\nprint(f\"Rata-rata Selisih Penurunan : {np.mean(selisih):.2f} mW (SD: {np.std(selisih, ddof=1):.2f})\")\nprint(f\"Statistik t_obs             : {t_pair:.3f}\")\nprint(f\"P-value (Satu Arah)         : {p_pair:.4e}\")\nprint(f\"Keputusan (alpha=0.01)      : {'TOLAK H0' if p_pair < 0.01 else 'GAGAL TOLAK H0'}\\n\")\n\n# Kasus 2: Uji Welch Dua Sampel Independen (Varians Tidak Sama)\ngrup_a = np.random.normal(loc=100.0, scale=5.0, size=15)\ngrup_b = np.random.normal(loc=108.0, scale=12.0, size=20)  # Varians berbeda\n\nt_welch, p_welch = stats.ttest_ind(grup_a, grup_b, equal_var=False)\n\nprint(\"KASUS 2: UJI WELCH'S T-TEST (Dua Kelompok Varians Heterogen)\")\nprint(f\"Statistik t_Welch           : {t_welch:.3f}\")\nprint(f\"P-value (Dua Arah)          : {p_welch:.4e}\")\nprint(f\"Keputusan (alpha=0.05)      : {'TOLAK H0' if p_welch < 0.05 else 'GAGAL TOLAK H0'}\")\n",
      "expectedOutput": "KASUS 1: UJI-T BERPASANGAN (Pre vs Post Optimasi)\nRata-rata Selisih Penurunan : 4.41 mW (SD: 1.57)\nStatistik t_obs             : 9.722\nP-value (Satu Arah)         : 4.1481e-07\nKeputusan (alpha=0.01)      : TOLAK H0\n\nKASUS 2: UJI WELCH'S T-TEST (Dua Kelompok Varians Heterogen)\nStatistik t_Welch           : -2.784\nP-value (Dua Arah)          : 9.6896e-03\nKeputusan (alpha=0.05)      : TOLAK H0"
    },
    "commonPitfalls": [
      "Menggunakan uji-t sampel independen untuk data sebelum-sesudah pada unit yang sama (mengabaikan korelasi pasangan yang menaikkan varians galat).",
      "Menggunakan uji-t Student standar dengan asumsi varians sama (equal_var=True) padahal uji Levene menunjukkan varians kedua kelompok heterogen (wajib gunakan Welch t-test).",
      "Mengubah rumusan hipotesis satu arah menjadi dua arah setelah melihat arah data sampel di layar komputer."
    ],
    "validationProcedures": [
      "Gunakan uji Levene sebelum uji komparasi dua sampel untuk memeriksa asumsi homoskedastisitas varians.",
      "Jadikan Welch's t-test sebagai standar baku *default* untuk dua sampel independen karena kebal terhadap perbedaan varians."
    ],
    "exercises": [
      {
        "question": "Mengapa banyak ahli biostatistika dan ekonometrika merekomendasikan untuk SELALU menggunakan Welch's t-test secara default dibanding Student's t-test biasa?",
        "hint": "Perhatikan kinerja Welch's t-test ketika varians kedua kelompok ternyata benar-benar setara versus ketika tidak setara.",
        "answerExplanation": "Welch's t-test memberikan perlindungan yang sangat kuat terhadap inflasi Galat Tipe I ketika varians kedua kelompok tidak sama (terutama jika ukuran sampel kedua kelompok tidak seimbang). Sebaliknya, jika varians kedua kelompok ternyata benar-benar sama, Welch's t-test hanya mengorbankan fraksi pecahan derajat kebebasan yang sangat kecil tanpa kehilangan daya uji yang berarti. Oleh karena itu, Welch's t-test jauh lebih aman digunakan sebagai prosedur default."
      }
    ],
    "references": [
      {
        "citation": "Welch, B. L. (1947). The generalization of Student's problem when several different population variances are involved. Biometrika, 34(1/2), 28-35.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Ruxton, G. D. (2006). The unequal variance t-test is an underused alternative to Student's t-test and the Mann-Whitney U test. Behavioral Ecology, 17(4), 688-690.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Prosedur 5-Langkah NHST: Satu Sampel, Dua Sampel Indepe...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.4.2.",
          "Capaian: Menerapkan protokol terstruktur 5-langkah Null Hypothesis Significance Testing.",
          "Capaian: Memilih formula uji-t yang tepat: Satu Sampel, Dua Sampel Independen (Student vs Welch), dan Berpasangan (*Pai...",
          "Capaian: Mengevaluasi asumsi homogenitas varians menggunakan Uji Levene."
        ],
        "keyFormulaOrDiagram": "$$t = \\frac{\\bar{X} - \\mu_0}{s / \\sqrt{n}}, \\quad \\nu = n - 1$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Prosedur 5-Langkah NHST: Satu Sampel, Dua Sampel Indepe...",
        "bulletPoints": [
          "Agar pengujian signifikansi hipotesis dapat dipertanggungjawabkan secara ilmiah dan kebal dari bias konfirmasi peneliti, pela...",
          "1. Langkah 1 (Formulasi Pasangan Hipotesis): Nyatakan hipotesis nol ($H_0$) dan hipotesis alternatif ($H_1$) dalam parameter...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Pilihan Varian Uji-t: - Satu Sampel: Membandingkan rata-rata sistem baru terhadap nilai st..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Pilihan Varian Uji-t: - Satu Sampel: Membandingkan rata-rata sistem baru terhadap nilai standar baku industri acuan ($mu_0$)....",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Uji-t Satu Sampel:",
          "2. Uji-t Sampel Berpasangan:",
          "Di mana $D_i = X_{1,i} - X_{2,i}$ dan $s_D$ adalah standar deviasi dari selisih pasangan."
        ],
        "keyFormulaOrDiagram": "$$t = \\frac{\\bar{X} - \\mu_0}{s / \\sqrt{n}}, \\quad \\nu = n - 1$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Dua belas unit node sensor transmisi diukur konsumsi dayanya (milli-Watt) sebelum dan sesudah optimasi algoritma sleeping protocol. Rata-rat...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Pasangan Hipotesis: H0: mu_D <= 0 (Tidak ada penurunan daya); H1: mu_D > 0 (Daya turun signifikan,...",
          "Langkah 2: Tingkat signifikansi alpha = 0.01, derajat kebebasan nu = n - 1 = 12 - 1 = 11.",
          "Langkah 3: Hitung statistik uji t berpasangan: t = (4.50 - 0) / (1.80 / sqrt(12)) = 4.50 / (1.80 / 3.4641) = 4...",
          "Interpretasi: Penurunan daya sebesar 4.50 mW terbukti secara statistik bukan akibat fluktuasi acak pengukuran."
        ],
        "keyFormulaOrDiagram": "Langkah 5: Kesimpulan: Tolak H0 pada alpha = 0.01. Bukti empiris sangat meyakinkan bahwa a..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Eksekusi protokol 5-langkah uji-t berpasangan dan uji Welch dua sampel menggunakan SciPy.",
          "Dependensi Pustaka: scipy.stats, numpy",
          "Keluaran Diharapkan: KASUS 1: UJI-T BERPASANGAN (Pre vs Post Optimasi)"
        ],
        "keyFormulaOrDiagram": "KASUS 1: UJI-T BERPASANGAN (Pre vs Post Optimasi) | Rata-rata Selisih Penurunan : 4.41 mW..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menggunakan uji-t sampel independen untuk data sebelum-sesudah pada unit yang sama (mengabaikan korelasi pasan...",
          "Perangkap: Menggunakan uji-t Student standar dengan asumsi varians sama (equal_var=True) padahal uji Levene menunjukkan v...",
          "Perangkap: Mengubah rumusan hipotesis satu arah menjadi dua arah setelah melihat arah data sampel di layar komputer."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan uji Levene sebelum uji komparasi dua sampel untuk memeriksa asumsi homoskedastisitas varians.",
          "Prosedur: Jadikan Welch's t-test sebagai standar baku *default* untuk dua sampel independen karena kebal terhadap perbed..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa banyak ahli biostatistika dan ekonometrika merekomendasikan untuk SELALU menggunakan Welch's t-test secara defau...",
          "Petunjuk: Perhatikan kinerja Welch's t-test ketika varians kedua kelompok ternyata benar-benar setara versus k...",
          "Solusi Kunci: Welch's t-test memberikan perlindungan yang sangat kuat terhadap inflasi Galat Tipe I ketika varians kedua kelompok tida..."
        ]
      }
    ]
  },
  "3.4.3": {
    "id": "3.4.3",
    "chapterId": "CH-19",
    "title": "Batasan dan Kesalahpahaman Fatal Mengenai Makna P-Value (ASA Statement)",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memahami definisi formal matematis dari p-value menurut American Statistical Association (ASA).",
      "Mengidentifikasi 6 kesalahpahaman fatal mengenai interpretasi p-value.",
      "Memahami mengapa \"ketiadaan bukti perbedaan\" bukan merupakan \"bukti ketiadaan perbedaan\"."
    ],
    "content": "Pada tahun 2016, American Statistical Association (ASA) mengambil langkah luar biasa dengan merilis pernyataan resmi darurat (*ASA Statement on Statistical Significance and P-Values*) untuk memperingatkan komunitas ilmiah global mengenai bahaya salah tafsir masif terhadap p-value yang telah merusak ribuan kesimpulan penelitian akademik.\n\nBerdasarkan konsensus ASA, terdapat 6 prinsip dasar mengenai p-value yang wajib dipahami oleh setiap peneliti:\n1. P-value dapat mengindikasikan seberapa tidak kompatibelnya data dengan model statistik tertentu yang dispesifikasikan (Hipotesis Nol).\n2. P-value TIDAK mengukur probabilitas bahwa hipotesis nol benar, atau probabilitas bahwa data dibangkitkan oleh kebetulan acak semata.\n3. Kesimpulan ilmiah dan keputusan bisnis atau kebijakan tidak boleh didasarkan semata-mata pada apakah p-value melampaui ambang batas arbitrer tertentu (seperti p < 0.05).\n4. Inferensi yang tepat memerlukan pelaporan yang transparan dan lengkap (melaporkan seluruh uji yang dijalankan, bukan hanya yang menghasilkan p < 0.05).\n5. P-value, atau signifikansi statistik, TIDAK mengukur besaran efek (*effect size*) atau pentingnya hasil penelitian secara praktis rekayasa.\n6. P-value dengan sendirinya tidak memberikan ukuran bukti yang baik mengenai model atau hipotesis alternatif (p = 0.05 hanya memberikan bukti yang sangat lemah terhadap H0).\n\nPernyataan \"p > 0.05 membuktikan bahwa metode A dan metode B adalah sama persis\" adalah kebohongan statistika (*absence of evidence is not evidence of absence*).",
    "mathematicalFoundations": "Kekeliruan Probalistik Inversi Klasik (*Fallacy of the Transposed Conditional*):\n\nP-value formal:\n$$p = P(\\text{Data Ekstrem} \\mid H_0)$$\n\nBanyak peneliti secara keliru menganggap bahwa:\n$$P(\\text{Data Ekstrem} \\mid H_0) \\stackrel{?}{=} P(H_0 \\mid \\text{Data})$$\n\nBerdasarkan Teorema Bayes, probabilitas kebenaran $H_0$ setelah data diamati (*Posterior Probability*) bergantung secara kritis pada probabilitas awal apriori (*Prior Odds* $P(H_0) / P(H_1)$):\n\n$$P(H_0 \\mid \\text{Data}) = \\frac{P(\\text{Data} \\mid H_0) \\cdot P(H_0)}{P(\\text{Data} \\mid H_0) \\cdot P(H_0) + P(\\text{Data} \\mid H_1) \\cdot P(H_1)}$$\n\nBahkan pada $p = 0.05$, jika peluang hipotesis baru benar sebelum eksperimen hanya 10% (prior odds 9:1), maka probabilitas bahwa temuan positif tersebut adalah alarm palsu (*False Positive Report Probability* / FPRP) dapat melampaui 30% hingga 50%!",
    "workedExample": {
      "problemStatement": "Sebuah pengujian algoritma kompresi baru menghasilkan p-value = 0.08 terhadap algoritma lama. Penulis menyimpulkan dalam draf skripsi: \"Hasil membuktikan bahwa kedua algoritma memiliki performa yang identik\". Perbaiki kesimpulan ini sesuai pedoman ASA.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi kesalahan logis: Penulis menyamakan \"Gagal menolak H0\" dengan \"Membuktikan H0 benar\" (Fallacy of Acceptance).",
        "Langkah 2: Evaluasi nilai p = 0.08: Nilai p = 0.08 berarti bahwa jika kedua algoritma benar-benar identik, terdapat peluang 8% untuk mendapatkan selisih performa sebesar itu atau lebih ekstrem akibat variasi acak cuplikan.",
        "Langkah 3: Analisis daya uji: Gagalnya pengujian mendeteksi perbedaan bisa jadi semata-mata karena ukuran sampel pengujian terlalu kecil (underpowered experiment).",
        "Langkah 4: Rumuskan kalimat ilmiah terkalibrasi: \"Berdasarkan data sampel yang diuji, penelitian ini belum memiliki bukti empiris yang cukup kuat untuk menolak hipotesis nol pada tingkat signifikansi alpha = 0.05 (p = 0.08). Namun demikian, interval kepercayaan 95% menunjukkan rentang perbedaan performa sebesar [-0.2%, +3.8%], sehingga pengujian lanjutan dengan ukuran sampel lebih besar diperlukan untuk memastikan signifikansi praktisnya.\""
      ],
      "resultInterpretation": "Penyajian interval kepercayaan menggantikan kesimpulan dikotomis palsu dan menyajikan batas ketidakpastian estimasi secara jujur."
    },
    "pythonImplementation": {
      "description": "Simulasi Bayes False Positive Report Probability (FPRP) membuktikan p = 0.05 tidak menjamin temuan 95% benar.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "def hitung_fused_falsity_fprp(alpha, power, prior_prob_h1):\n    prior_h0 = 1.0 - prior_prob_h1\n    \n    # Peluang True Positive = Power * Prior(H1)\n    # Peluang False Positive = Alpha * Prior(H0)\n    tp = power * prior_prob_h1\n    fp = alpha * prior_h0\n    \n    fprp = fp / (tp + fp)\n    return fprp\n\nalpha = 0.05\npower = 0.80\n\nprint(f\"Ambang Signifikansi (Alpha): {alpha}, Daya Uji (Power): {power}\\n\")\nprint(f\"{'Peluang Apriori H1':22s} | {'False Positive Risk (FPRP)':28s}\")\nprint(\"-\" * 55)\nfor prior in [0.50, 0.20, 0.10, 0.05, 0.01]:\n    fprp = hitung_fused_falsity_fprp(alpha, power, prior)\n    print(f\"Prior H1 = {prior * 100:4.1f}%          | {fprp * 100:26.1f}%\")\n\nprint(f\"\\nPeringatan ASA: Pada riset inovasi baru yang radikal (Prior H1 rendah, misal 10%), temuan p < 0.05 memiliki risiko alarm palsu sebesar 36%!\")\n",
      "expectedOutput": "Ambang Signifikansi (Alpha): 0.05, Daya Uji (Power): 0.8\n\nPeluang Apriori H1     | False Positive Risk (FPRP)  \n-------------------------------------------------------\nPrior H1 = 50.0%          |                        5.9%\nPrior H1 = 20.0%          |                       20.0%\nPrior H1 = 10.0%          |                       36.0%\nPrior H1 =  5.0%          |                       54.3%\nPrior H1 =  1.0%          |                       86.1%\n\nPeringatan ASA: Pada riset inovasi baru yang radikal (Prior H1 rendah, misal 10%), temuan p < 0.05 memiliki risiko alarm palsu sebesar 36%!"
    },
    "commonPitfalls": [
      "Menyatakan bahwa p-value = 0.03 berarti terdapat peluang 97% bahwa hipotesis penelitian benar.",
      "Mengklaim bahwa p > 0.05 membuktikan dua perlakuan ekuivalen atau sama persis.",
      "Hanya melaporkan bintang signifikansi (* atau **) tanpa mencantumkan nilai numerik p-value eksak dan ukuran efek."
    ],
    "validationProcedures": [
      "Tinjau kembali bab kesimpulan naskah: pastikan tidak ada kalimat yang menyatakan hipotesis nol \"terbukti benar\".",
      "Sertakan estimasi ukuran efek (effect size) dan interval kepercayaan 95% mendampingi setiap nilai p-value yang dilaporkan."
    ],
    "exercises": [
      {
        "question": "Jika seorang peneliti memperoleh p-value = 0.00001 pada pengujian performa algoritma baru dengan ukuran sampel n = 10.000.000, apakah peneliti dapat menyimpulkan bahwa algoritma tersebut memberikan dampak revolusioner bagi industri?",
        "hint": "Perhatikan hubungan antara ukuran sampel raksasa dengan p-value yang sangat kecil pada perbedaan efek mikroskopis.",
        "answerExplanation": "Belum tentu. Pada ukuran sampel sebesar sepuluh juta observasi, perbedaan mikroskopis yang tidak memiliki arti praktis apa pun (misal kenaikan kecepatan hanya 0.0001% atau selisih 1 pikosekon) akan menghasilkan p-value yang sangat kecil secara astronomis (p < 0.00001). Signifikansi statistik tidak sama dengan signifikansi praktis rekayasa. Peneliti wajib memeriksa ukuran efek (effect size) untuk menentukan nilai praktisnya."
      }
    ],
    "references": [
      {
        "citation": "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: context, process, and purpose. The American Statistician, 70(2), 129-133.",
        "type": "guideline"
      },
      {
        "citation": "Greenland, S., et al. (2016). Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations. European Journal of Epidemiology, 31(4), 337-350.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Batasan dan Kesalahpahaman Fatal Mengenai Makna P-Value...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.4.3.",
          "Capaian: Memahami definisi formal matematis dari p-value menurut American Statistical Association (ASA).",
          "Capaian: Mengidentifikasi 6 kesalahpahaman fatal mengenai interpretasi p-value.",
          "Capaian: Memahami mengapa \"ketiadaan bukti perbedaan\" bukan merupakan \"bukti ketiadaan perbedaan\"."
        ],
        "keyFormulaOrDiagram": "$$p = P(\\text{Data Ekstrem} \\mid H_0)$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Batasan dan Kesalahpahaman Fatal Mengenai Makna P-Value...",
        "bulletPoints": [
          "Pada tahun 2016, American Statistical Association (ASA) mengambil langkah luar biasa dengan merilis pernyataan resmi darurat...",
          "Berdasarkan konsensus ASA, terdapat 6 prinsip dasar mengenai p-value yang wajib dipahami oleh setiap peneliti: 1. P-value dap...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Pernyataan \"p > 0.05 membuktikan bahwa metode A dan metode B adalah sama persis\" adalah ke..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Pernyataan \"p > 0.05 membuktikan bahwa metode A dan metode B adalah sama persis\" adalah kebohongan statistika (*absence of ev...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Kekeliruan Probalistik Inversi Klasik (*Fallacy of the Transposed Conditional*):",
          "P-value formal:",
          "Banyak peneliti secara keliru menganggap bahwa:"
        ],
        "keyFormulaOrDiagram": "$$p = P(\\text{Data Ekstrem} \\mid H_0)$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah pengujian algoritma kompresi baru menghasilkan p-value = 0.08 terhadap algoritma lama. Penulis menyimpulkan dalam draf skripsi: \"Hasi...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi kesalahan logis: Penulis menyamakan \"Gagal menolak H0\" dengan \"Membuktikan H0 benar\" (...",
          "Langkah 2: Evaluasi nilai p = 0.08: Nilai p = 0.08 berarti bahwa jika kedua algoritma benar-benar identik, ter...",
          "Langkah 3: Analisis daya uji: Gagalnya pengujian mendeteksi perbedaan bisa jadi semata-mata karena ukuran samp...",
          "Interpretasi: Penyajian interval kepercayaan menggantikan kesimpulan dikotomis palsu dan menyajikan batas ketidakpastian estimasi seca..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Rumuskan kalimat ilmiah terkalibrasi: \"Berdasarkan data sampel yang diuji, pene..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi Bayes False Positive Report Probability (FPRP) membuktikan p = 0.05 tidak menjamin temuan 95% benar.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: Ambang Signifikansi (Alpha): 0.05, Daya Uji (Power): 0.8"
        ],
        "keyFormulaOrDiagram": "Ambang Signifikansi (Alpha): 0.05, Daya Uji (Power): 0.8 | | Peluang Apriori H1 | False Po..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menyatakan bahwa p-value = 0.03 berarti terdapat peluang 97% bahwa hipotesis penelitian benar.",
          "Perangkap: Mengklaim bahwa p > 0.05 membuktikan dua perlakuan ekuivalen atau sama persis.",
          "Perangkap: Hanya melaporkan bintang signifikansi (* atau **) tanpa mencantumkan nilai numerik p-value eksak dan ukuran ef..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Tinjau kembali bab kesimpulan naskah: pastikan tidak ada kalimat yang menyatakan hipotesis nol \"terbukti benar...",
          "Prosedur: Sertakan estimasi ukuran efek (effect size) dan interval kepercayaan 95% mendampingi setiap nilai p-value yang..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Jika seorang peneliti memperoleh p-value = 0.00001 pada pengujian performa algoritma baru dengan ukuran sampel n = 10.00...",
          "Petunjuk: Perhatikan hubungan antara ukuran sampel raksasa dengan p-value yang sangat kecil pada perbedaan efe...",
          "Solusi Kunci: Belum tentu. Pada ukuran sampel sebesar sepuluh juta observasi, perbedaan mikroskopis yang tidak memiliki arti praktis a..."
        ]
      }
    ]
  },
  "3.4.4": {
    "id": "3.4.4",
    "chapterId": "CH-19",
    "title": "Bahaya P-Hacking, Data Dredging, dan Praktik Optional Stopping",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Mengidentifikasi taksonomi Questionable Research Practices (QRP): P-Hacking, HARKing, dan Data Dredging.",
      "Memahami mekanisme inflasi Galat Tipe I akibat penghentian uji coba opsional (*optional stopping*).",
      "Menerapkan preregistrasi protokol riset sebagai benteng integritas pembuktian ilmiah."
    ],
    "content": "Krisis replikasi yang melanda komunitas riset global sebagian besar dipicu oleh insentif akademik yang cacat: jurnal ilmiah cenderung hanya mempublikasikan artikel yang memiliki p-value signifikan ($p < 0.05$). Tekanan publikasi ini melahirkan serangkaian praktik meragukan yang dikenal sebagai P-Hacking, Data Dredging, atau Data Fishing: manipulasi analitis yang disengaja maupun tidak disengaja hingga data menghasilkan p-value di bawah 0.05.\n\nEmpat bentuk p-hacking yang paling merusak dalam rekayasa:\n1. Penghentian Pengujian Opsional (*Optional Stopping*): Peneliti mengumpulkan sampel kecil, memeriksa p-value. Jika $p < 0.05$, pengujian dihentikan dan dilaporkan. Jika $p > 0.05$, peneliti menambah 5 sampel lagi dan mengecek ulang. Prosedur mengintip data berulang kali (*data peeking*) ini melipatgandakan tingkat Galat Tipe I dari 5% menjadi lebih dari 20% atau 30%.\n2. Manipulasi Variabel Respon dan Kovariat: Menguji 10 metrik performa yang berbeda, lalu hanya melaporkan 1 metrik yang kebetulan menghasilkan p < 0.05 tanpa menyebutkan 9 metrik lainnya yang gagal.\n3. Eliminasi Pencilan Selektif: Membuang titik-titik data pengujian tertentu dengan alasan post-hoc semata-mata karena pembuangan tersebut membuat p-value turun di bawah 0.05.\n4. HARKing (Hypothesizing After the Results are Known): Mengubah hipotesis penelitian agar sesuai dengan pola anomali yang ditemukan secara kebetulan pada data, lalu berpura-pura bahwa pola tersebut telah diramalkan sejak awal.\n\nPrinsip dasar sains: jika kita menyiksa data cukup lama, data akan mengaku apa saja (*if you torture the data enough, nature will confess*). Namun kesimpulan tersebut adalah ilusi acak yang tidak akan pernah dapat direplikasi oleh peneliti lain.",
    "mathematicalFoundations": "Inflasi Galat Tipe I Akibat Penghentian Opsional (*Optional Stopping / Data Peeking*):\n\nJika seorang peneliti melakukan uji signifikansi pada $K$ titik inspeksi berkala independen dengan ambang batas nominal $\\alpha = 0.05$:\n\n$$\\alpha_{\\text{sejati}} = P\\left( \\bigcup_{k=1}^K (p_k < \\alpha) \\mid H_0 \\right) = 1 - (1 - \\alpha)^K$$\n\nUntuk $K = 5$ kali pengintipan data berturut-turut:\n$$\\alpha_{\\text{sejati}} = 1 - (1 - 0.05)^5 = 1 - (0.95)^5 = 1 - 0.7738 \\approx 0.2262 \\quad (22.6\\%)$$\n\nJika pengujian dibiarkan berjalan terus menerus hingga p-value kebetulan menyeberang di bawah 0.05 ($K \\to \\infty$), probabilitas penolakan palsu $H_0$ mendekati 100% (pasti akan terjadi false positive akibat hukum gerak Brown fluktuasi statistik).",
    "workedExample": {
      "problemStatement": "Seorang mahasiswa menguji efisiensi algoritma tracking surya baru. Mula-mula diuji pada 10 data hari (p = 0.09). Mahasiswa menambah data hari ke-11 s.d. 15 (p = 0.06). Mahasiswa menambah lagi hingga hari ke-20 dan menemukan p = 0.042. Mahasiswa langsung menghentikan pengumpulan data dan menulis di skripsinya bahwa algoritma terbukti unggul pada alpha = 0.05. Jelaskan mengapa kesimpulan ini cacat secara metodologis.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi pelanggaran prosedur: Mahasiswa melakukan penghentian opsional (optional stopping) berbasis pengintipan data berulang (K = 3 kali inspeksi interim).",
        "Langkah 2: Evaluasi tingkat signifikansi sejati: Tingkat signifikansi riil bukan lagi 5%, melainkan mendekati 1 - (0.95)^3 = 14.3%.",
        "Langkah 3: Analisis batas ambang: Nilai p-value teramati p = 0.042 hanya berada sedikit di bawah 0.05. Di bawah tingkat risiko Galat Tipe I sejati sebesar 14.3%, angka 0.042 tidak lagi memiliki kekuatan pembuktian yang signifikan.",
        "Langkah 4: Prosedur ilmiah yang benar: Mahasiswa wajib menentukan ukuran sampel n = 20 sejak awal melalui analisis daya uji (power analysis), atau jika terpaksa melakukan analisis interim, wajib menggunakan koreksi batas penolakan bertingkat O'Brien-Fleming."
      ],
      "resultInterpretation": "P-hacking telah menggelembungkan risiko kesalahan positif palsu hampir tiga kali lipat tanpa disadari oleh mahasiswa."
    },
    "pythonImplementation": {
      "description": "Simulasi Monte Carlo membuktikan inflasi False Positive akibat praktik pengintipan data berulang (Optional Stopping).",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nn_simulasi = 10000\nalpha_target = 0.05\n\n# H0 benar: Tidak ada efek (dua sampel ditarik dari distribusi identik N(0, 1))\nfalse_positives_standar = 0\nfalse_positives_peeking = 0\n\nfor _ in range(n_simulasi):\n    # Pengujian Standar: Kunci n = 50 sejak awal\n    x = np.random.normal(0, 1, 50)\n    y = np.random.normal(0, 1, 50)\n    _, p_akhir = stats.ttest_ind(x, y)\n    if p_akhir < alpha_target:\n        false_positives_standar += 1\n\n    # Praktik P-Hacking Data Peeking: Cek di n=10, 20, 30, 40, 50\n    x_peek = np.random.normal(0, 1, 50)\n    y_peek = np.random.normal(0, 1, 50)\n    ditemukan_signifikan = False\n    for n_curr in [10, 20, 30, 40, 50]:\n        _, p_curr = stats.ttest_ind(x_peek[:n_curr], y_peek[:n_curr])\n        if p_curr < alpha_target:\n            ditemukan_signifikan = True\n            break  # Berhenti mengumpulkan data segera setelah p < 0.05!\n    if ditemukan_signifikan:\n        false_positives_peeking += 1\n\nlaju_fp_standar = false_positives_standar / n_simulasi\nlaju_fp_peeking = false_positives_peeking / n_simulasi\n\nprint(f\"Laju Galat Tipe I Uji Terkunci Standar : {laju_fp_standar * 100:.2f}% (Tepat di target 5%)\")\nprint(f\"Laju Galat Tipe I dengan Data Peeking   : {laju_fp_peeking * 100:.2f}% (Terinflasi masif!)\")\nprint(f\"Faktor Pelipatgandaan False Positive    : {laju_fp_peeking / laju_fp_standar:.1f}x lipat\")\n",
      "expectedOutput": "Laju Galat Tipe I Uji Terkunci Standar : 4.88% (Tepat di target 5%)\nLaju Galat Tipe I dengan Data Peeking   : 14.54% (Terinflasi masif!)\nFaktor Pelipatgandaan False Positive    : 3.0x lipat"
    },
    "commonPitfalls": [
      "Memeriksa p-value secara berkala saat pengujian laboratorium berlangsung dan langsung berhenti mengumpulkan sampel saat p < 0.05.",
      "Mencoba 5 metode normalisasi data yang berbeda dan hanya melaporkan 1 metode yang menghasilkan p < 0.05 (cherry-picking).",
      "Mengubah rumusan hipotesis penelitian setelah melihat grafik hasil akhir data."
    ],
    "validationProcedures": [
      "Kunci rencana ukuran sampel dan analisis statistik dalam dokumen preregistrasi (misal di OSF.io) sebelum pengumpulan data dimulai.",
      "Jika analisis interim bertahap harus dilakukan (seperti pada uji klinis atau uji destruktif mahal), gunakan koreksi batas alfa alfa-spending function O'Brien-Fleming."
    ],
    "exercises": [
      {
        "question": "Bagaimana preregistrasi protokol riset (study preregistration) mampu memberantas praktik p-hacking dan HARKing secara total?",
        "hint": "Perhatikan pemisahan waktu yang ketat antara fase perumusan hipotesis dengan fase melihat data.",
        "answerExplanation": "Preregistrasi mewajibkan peneliti mengunggah dokumen terkunci bertanda waktu publik (timestamped) yang merinci secara eksak hipotesis riset, ukuran sampel pasti, kriteria eliminasi outlier, dan model statistik yang akan digunakan SEBELUM data dikumpulkan. Hal ini memutus ruang gerak peneliti untuk mengubah hipotesis (mencegah HARKing), memanipulasi penghentian data (mencegah optional stopping), atau memilih-milih variabel respon post-hoc."
      }
    ],
    "references": [
      {
        "citation": "Simmons, J. P., Nelson, L. D., & Simonsohn, U. (2011). False-positive psychology: Undisclosed flexibility in data collection and analysis allows presenting anything as significant. Psychological Science, 22(11), 1359-1366.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Kerr, N. L. (1998). HARKing: Hypothesizing after the results are known. Personality and Social Psychology Review, 2(3), 196-217.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Bahaya P-Hacking, Data Dredging, dan Praktik Optional S...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.4.4.",
          "Capaian: Mengidentifikasi taksonomi Questionable Research Practices (QRP): P-Hacking, HARKing, dan Data Dredging.",
          "Capaian: Memahami mekanisme inflasi Galat Tipe I akibat penghentian uji coba opsional (*optional stopping*).",
          "Capaian: Menerapkan preregistrasi protokol riset sebagai benteng integritas pembuktian ilmiah."
        ],
        "keyFormulaOrDiagram": "$$\\alpha_{\\text{sejati}} = P\\left( \\bigcup_{k=1}^K (p_k < \\alpha) \\mid H_0 \\right) = 1 - (1 - \\alpha)^K$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Bahaya P-Hacking, Data Dredging, dan Praktik Optional S...",
        "bulletPoints": [
          "Krisis replikasi yang melanda komunitas riset global sebagian besar dipicu oleh insentif akademik yang cacat: jurnal ilmiah c...",
          "Empat bentuk p-hacking yang paling merusak dalam rekayasa: 1. Penghentian Pengujian Opsional (*Optional Stopping*): Peneliti...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Prinsip dasar sains: jika kita menyiksa data cukup lama, data akan mengaku apa saja (*if y..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Prinsip dasar sains: jika kita menyiksa data cukup lama, data akan mengaku apa saja (*if you torture the data enough, nature...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Inflasi Galat Tipe I Akibat Penghentian Opsional (*Optional Stopping / Data Peeking*):",
          "Jika seorang peneliti melakukan uji signifikansi pada $K$ titik inspeksi berkala independen dengan ambang bata...",
          "Untuk $K = 5$ kali pengintipan data berturut-turut:"
        ],
        "keyFormulaOrDiagram": "$$\\alpha_{\\text{sejati}} = P\\left( \\bigcup_{k=1}^K (p_k < \\alpha) \\mid H_0 \\right) = 1 - (1 - \\alpha)^K$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Seorang mahasiswa menguji efisiensi algoritma tracking surya baru. Mula-mula diuji pada 10 data hari (p = 0.09). Mahasiswa menambah data har...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi pelanggaran prosedur: Mahasiswa melakukan penghentian opsional (optional stopping) ber...",
          "Langkah 2: Evaluasi tingkat signifikansi sejati: Tingkat signifikansi riil bukan lagi 5%, melainkan mendekati...",
          "Langkah 3: Analisis batas ambang: Nilai p-value teramati p = 0.042 hanya berada sedikit di bawah 0.05. Di bawa...",
          "Interpretasi: P-hacking telah menggelembungkan risiko kesalahan positif palsu hampir tiga kali lipat tanpa disadari oleh mahasiswa."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Prosedur ilmiah yang benar: Mahasiswa wajib menentukan ukuran sampel n = 20 sej..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi Monte Carlo membuktikan inflasi False Positive akibat praktik pengintipan data berulang (Optional Stopping).",
          "Dependensi Pustaka: numpy, scipy.stats",
          "Keluaran Diharapkan: Laju Galat Tipe I Uji Terkunci Standar : 4.88% (Tepat di target 5%)"
        ],
        "keyFormulaOrDiagram": "Laju Galat Tipe I Uji Terkunci Standar : 4.88% (Tepat di target 5%) | Laju Galat Tipe I de..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Memeriksa p-value secara berkala saat pengujian laboratorium berlangsung dan langsung berhenti mengumpulkan sa...",
          "Perangkap: Mencoba 5 metode normalisasi data yang berbeda dan hanya melaporkan 1 metode yang menghasilkan p < 0.05 (cherr...",
          "Perangkap: Mengubah rumusan hipotesis penelitian setelah melihat grafik hasil akhir data."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Kunci rencana ukuran sampel dan analisis statistik dalam dokumen preregistrasi (misal di OSF.io) sebelum pengu...",
          "Prosedur: Jika analisis interim bertahap harus dilakukan (seperti pada uji klinis atau uji destruktif mahal), gunakan ko..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Bagaimana preregistrasi protokol riset (study preregistration) mampu memberantas praktik p-hacking dan HARKing secara to...",
          "Petunjuk: Perhatikan pemisahan waktu yang ketat antara fase perumusan hipotesis dengan fase melihat data.",
          "Solusi Kunci: Preregistrasi mewajibkan peneliti mengunggah dokumen terkunci bertanda waktu publik (timestamped) yang merinci secara ek..."
        ]
      }
    ]
  }
};
