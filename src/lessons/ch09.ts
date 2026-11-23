import { Lesson } from '../types/curriculum';

export const CH09_LESSONS: Record<string, Partial<Lesson>> = {
  "2.2.1": {
    "id": "2.2.1",
    "chapterId": "CH-09",
    "title": "Penyusunan Definisi Operasional Variabel yang Terukur Objektif",
    "readingTimeMinutes": 16,
    "status": "verified",
    "learningObjectives": [
      "Membedakan definisi konseptual (teoretis) dan definisi operasional variabel.",
      "Menetapkan prosedur instrumen, satuan baku, dan algoritma ekstraksi variabel secara kuantitatif.",
      "Menghilangkan ambiguitas pengukuran dalam protokol eksperimen."
    ],
    "content": "Sebuah konsep ilmiah yang cemerlang tidak memiliki nilai empiris jika tidak dapat dioperasionalkan ke dalam entitas fisik atau komputasi yang terukur. Definisi konseptual menjelaskan arti teoritis dari suatu variabel dalam kerangka disiplin ilmu (misalnya: \"efisiensi termal adalah rasio kerja berguna terhadap energi kalor masuk\"). Sebaliknya, definisi operasional menjelaskan secara eksplisit dan tidak ambigu langkah-langkah mekanis, instrumen, satuan fisik, dan prosedur komputasi yang digunakan untuk menghasilkan angka pengukuran tersebut di laboratorium.\n\nDalam penelitian rekayasa, definisi operasional yang baik harus memenuhi tiga syarat:\n1. Spesifikasi Instrumen: Menyebutkan perangkat pengukur, nomor model, dan konfigurasi kalibrasi (misalnya: \"diukur menggunakan osiloskop digital Rigol DS1054Z pada bandwidth 50 MHz\").\n2. Prosedur Sampling Sinyal: Menyebutkan laju cuplik, durasi observasi, dan kondisi lingkungan saat data diambil.\n3. Rumus Reduksi Data: Menyebutkan formula matematika yang memproses data mentah menjadi nilai variabel final (misalnya: \"dihitung sebagai nilai Root Mean Square dari sinyal tegangan pada 100 siklus keadaan tunak\").\n\nTanpa definisi operasional yang presisi, pengulangan eksperimen oleh laboratorium lain akan menghasilkan data yang tidak sebanding.",
    "mathematicalFoundations": "Pemetaan pengukuran operasional $\\mathcal{M}$ dari ruang keadaan fisik sistem $\\Omega$ menuju ruang bilangan riil $\\mathbb{R}$:\n\n$$\\mathcal{M}: \\Omega \\longrightarrow \\mathbb{R}^k$$\n\nKriteria Ketunggalan Operasional (*Operational Uniqueness*):\nDefinisi operasional dikatakan tertutup dan valid jika untuk setiap keadaan sistem $\\omega_1, \\omega_2 \\in \\Omega$:\n\n$$\\omega_1 \\sim_{\\text{fisis}} \\omega_2 \\implies \\|\\mathcal{M}(\\omega_1) - \\mathcal{M}(\\omega_2)\\| \\le \\epsilon_{\\text{noise}}$$\n\nDi mana $\\epsilon_{\\text{noise}}$ adalah batas ketidakpastian resolusi instrumen pengukuran.",
    "workedExample": {
      "problemStatement": "Susun definisi operasional lengkap untuk variabel \"Kekasaran Permukaan Poros Baja\" pada proses pemesinan bubut di Bengkel Mekanik ITERA.",
      "stepByStepSolution": [
        "Langkah 1 (Definisi Konseptual): Deviasi ketidakteraturan mikrogeometris permukaan benda kerja dari garis profil rata-ratanya.",
        "Langkah 2 (Instrumen & Probe): Profilometer kontak stylus portabel (Mitutoyo Surftest SJ-210) dengan radius ujung intan 2 mikrometer dan gaya penekanan 0.75 mN.",
        "Langkah 3 (Kondisi Pengukuran): Panjang evaluasi profil L = 4.0 mm, cut-off filter Gauss lambda_c = 0.8 mm, kecepatan pemindaian 0.5 mm/s, dilakukan pada 3 titik keliling poros bersudut 120 derajat pada suhu ruang 25 +/- 1 \u00b0C.",
        "Langkah 4 (Parameter Kuantitatif): Rata-rata aritmatika deviasi profil kasar Ra (dalam satuan mikrometer, um), dihitung otomatis melalui integrasi digital simpangan profil."
      ],
      "resultInterpretation": "Definisi ini menghilangkan seluruh ambiguitas operasional sehingga peneliti mana pun dapat mereplikasi pengukuran dengan hasil yang identik."
    },
    "pythonImplementation": {
      "description": "Komputasi parameter kekasaran permukaan aritmetika (Ra) dari sinyal profil ketinggian stylus mentah.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Data ketinggian profil stylus z(x) dalam mikrometer [SIMULASI/SYNTHETIC DATA]\nnp.random.seed(42)\ndx = 0.001  # interval sampling 1 mikrometer\nx = np.arange(0, 4.0, dx)\nz_mentah = 1.2 * np.sin(2 * np.pi * 5 * x) + np.random.normal(0, 0.4, size=len(x))\n\n# 1. Hapus komponen garis rata-rata (mean line centering)\nz_tengah = z_mentah - np.mean(z_mentah)\n\n# 2. Hitung kekasaran rata-rata aritmetika Ra: (1/L) * integral |z(x)| dx\nRa = np.mean(np.abs(z_tengah))\nRz = np.max(z_tengah) - np.min(z_tengah)\n\nprint(f\"Panjang Evaluasi Profil (L) : {x[-1]:.2f} mm\")\nprint(f\"Jumlah Titik Cuplik         : {len(x)}\")\nprint(f\"Parameter Kekasaran Ra      : {Ra:.3f} um\")\nprint(f\"Tinggi Puncak-Lembah Rz     : {Rz:.3f} um\")\n",
      "expectedOutput": "Panjang Evaluasi Profil (L) : 4.00 mm\nJumlah Titik Cuplik         : 4000\nParameter Kekasaran Ra      : 1.018 um\nTinggi Puncak-Lembah Rz     : 5.485 um"
    },
    "commonPitfalls": [
      "Menuliskan definisi operasional yang masih memuat kata-kata sifat subjektif seperti \"diukur secara teliti\" atau \"dalam waktu singkat\".",
      "Mengabaikan spesifikasi kondisi lingkungan ambien yang mempengaruhi pemuaian atau kelistrikan sensor.",
      "Menggunakan indikator proksi yang tidak memiliki korelasi fisis langsung dengan konsep yang hendak diukur."
    ],
    "validationProcedures": [
      "Mintalah teknisi laboratorium independen untuk melakukan pengukuran hanya dengan membaca dokumen definisi operasional tanpa instruksi lisan tambahan.",
      "Periksa apakah satuan ukur telah mengikuti Sistem Satuan Internasional (SI)."
    ],
    "exercises": [
      {
        "question": "Mengapa definisi \"Kualitas jaringan internet diukur berdasarkan kepuasan pengguna\" dinilai cacat sebagai definisi operasional dalam riset teknik elektro/telekomunikasi?",
        "hint": "Perhatikan objektivitas dan instrumen metrik telekomunikasi yang baku.",
        "answerExplanation": "Kepuasan pengguna bersifat subjektif, rentan terhadap bias psikologis persepsi, dan tidak dapat ditelusuri ke instrumen metrologi jaringan. Definisi operasional teknik elektro harus menggunakan metrik fisik objektif seperti Packet Loss Rate (%), Round Trip Latency (ms), Throughput (Mbps), dan Jitter (ms) yang dicatat menggunakan penganalisis paket terstandarisasi."
      }
    ],
    "references": [
      {
        "citation": "Bridgman, P. W. (1927). The Logic of Modern Physics. Macmillan.",
        "type": "canonical-textbook"
      },
      {
        "citation": "ISO 4287:1997. Geometrical Product Specifications (GPS) - Surface texture: Profile method. ISO Standard.",
        "type": "formal-standard"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Penyusunan Definisi Operasional Variabel yang Terukur O...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.2.1.",
          "Capaian: Membedakan definisi konseptual (teoretis) dan definisi operasional variabel.",
          "Capaian: Menetapkan prosedur instrumen, satuan baku, dan algoritma ekstraksi variabel secara kuantitatif.",
          "Capaian: Menghilangkan ambiguitas pengukuran dalam protokol eksperimen."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{M}: \\Omega \\longrightarrow \\mathbb{R}^k$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Penyusunan Definisi Operasional Variabel yang Terukur O...",
        "bulletPoints": [
          "Sebuah konsep ilmiah yang cemerlang tidak memiliki nilai empiris jika tidak dapat dioperasionalkan ke dalam entitas fisik ata...",
          "Dalam penelitian rekayasa, definisi operasional yang baik harus memenuhi tiga syarat: 1. Spesifikasi Instrumen: Menyebutkan p...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Tanpa definisi operasional yang presisi, pengulangan eksperimen oleh laboratorium lain aka..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Tanpa definisi operasional yang presisi, pengulangan eksperimen oleh laboratorium lain akan menghasilkan data yang tidak seba...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Pemetaan pengukuran operasional $\\mathcal{M}$ dari ruang keadaan fisik sistem $\\Omega$ menuju ruang bilangan r...",
          "Kriteria Ketunggalan Operasional (*Operational Uniqueness*):",
          "Definisi operasional dikatakan tertutup dan valid jika untuk setiap keadaan sistem $\\omega_1, \\omega_2 \\in \\Om..."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{M}: \\Omega \\longrightarrow \\mathbb{R}^k$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Susun definisi operasional lengkap untuk variabel \"Kekasaran Permukaan Poros Baja\" pada proses pemesinan bubut di Bengkel Mekanik ITERA.",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Definisi Konseptual): Deviasi ketidakteraturan mikrogeometris permukaan benda kerja dari garis prof...",
          "Langkah 2 (Instrumen & Probe): Profilometer kontak stylus portabel (Mitutoyo Surftest SJ-210) dengan radius uj...",
          "Langkah 3 (Kondisi Pengukuran): Panjang evaluasi profil L = 4.0 mm, cut-off filter Gauss lambda_c = 0.8 mm, ke...",
          "Interpretasi: Definisi ini menghilangkan seluruh ambiguitas operasional sehingga peneliti mana pun dapat mereplikasi pengukuran dengan..."
        ],
        "keyFormulaOrDiagram": "Langkah 4 (Parameter Kuantitatif): Rata-rata aritmatika deviasi profil kasar Ra (dalam sat..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Komputasi parameter kekasaran permukaan aritmetika (Ra) dari sinyal profil ketinggian stylus mentah.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: Panjang Evaluasi Profil (L) : 4.00 mm"
        ],
        "keyFormulaOrDiagram": "Panjang Evaluasi Profil (L) : 4.00 mm | Jumlah Titik Cuplik : 4000 | Parameter Kekasaran R..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menuliskan definisi operasional yang masih memuat kata-kata sifat subjektif seperti \"diukur secara teliti\" ata...",
          "Perangkap: Mengabaikan spesifikasi kondisi lingkungan ambien yang mempengaruhi pemuaian atau kelistrikan sensor.",
          "Perangkap: Menggunakan indikator proksi yang tidak memiliki korelasi fisis langsung dengan konsep yang hendak diukur."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Mintalah teknisi laboratorium independen untuk melakukan pengukuran hanya dengan membaca dokumen definisi oper...",
          "Prosedur: Periksa apakah satuan ukur telah mengikuti Sistem Satuan Internasional (SI)."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa definisi \"Kualitas jaringan internet diukur berdasarkan kepuasan pengguna\" dinilai cacat sebagai definisi operas...",
          "Petunjuk: Perhatikan objektivitas dan instrumen metrik telekomunikasi yang baku.",
          "Solusi Kunci: Kepuasan pengguna bersifat subjektif, rentan terhadap bias psikologis persepsi, dan tidak dapat ditelusuri ke instrumen..."
        ]
      }
    ]
  },
  "2.2.2": {
    "id": "2.2.2",
    "chapterId": "CH-09",
    "title": "4 Skala Pengukuran Data: Nominal, Ordinal, Interval, dan Rasio",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memahami hierarki taksonomi 4 skala pengukuran data menurut teori S.S. Stevens (1946).",
      "Mengidentifikasi karakteristik nol mutlak (absolute zero) dan kesetaraan interval.",
      "Menentukan skala yang tepat untuk berbagai parameter fisis, algoritmis, dan kuesioner rekayasa."
    ],
    "content": "Pada tahun 1946, psikolog dan metrolog Stanley Smith Stevens menerbitkan karya monumental di majalah *Science* yang memformulasikan representasi pengukuran ke dalam empat skala hierarkis. Pemahaman atas skala pengukuran merupakan syarat mutlak dalam analisis data rekayasa, karena skala data secara ketat menentukan operasi matematika dan uji statistik mana yang absah (*permissible*) untuk digunakan.\n\nEmpat skala pengukuran tersebut adalah:\n1. Skala Nominal: Tingkat paling mendasar yang hanya berfungsi sebagai label atau identitas kategori kualitatif tanpa adanya urutan atau peringkat. Contoh: tipe topologi jaringan (Star, Mesh, Ring) atau jenis bahan konduktor (Tembaga, Aluminium, Perak).\n2. Skala Ordinal: Memiliki sifat pelabelan ditambah dengan adanya relasi pemeringkatan atau urutan logis ($A > B > C$), namun jarak atau selisih matematis antar-peringkat tidak diketahui atau tidak seragam. Contoh: tingkat kekerasan mineral skala Mohs, skala kematangan teknologi (TRL 1 hingga 9), atau skala likert kepuasan (Sangat Lambat, Lambat, Cepat).\n3. Skala Interval: Memiliki urutan pemeringkatan dan interval (jarak) matematis yang sama antar-angka, namun TIDAK memiliki titik nol alami mutlak (*arbitrary zero*). Angka nol pada skala interval bukan berarti ketiadaan kuantitas fisis. Contoh: suhu dalam skala Celsius atau Fahrenheit (0 \u00b0C bukan berarti ketiadaan kalor total di alam).\n4. Skala Rasio: Tingkat pengukuran tertinggi dan paling sempurna. Memiliki urutan, jarak interval yang presisi, dan memiliki TITIK NOL MUTLAK (*absolute zero*). Nilai nol menandakan ketiadaan besaran fisik total. Contoh: suhu dalam Kelvin (0 K = ketiadaan energi kinetik partikel total), tegangan listrik (Volt), arus (Ampere), massa (kg), dan waktu tunda/latensi (detik).",
    "mathematicalFoundations": "Teori Pengukuran Representasional Stevens dinyatakan melalui grup transformasi invarian:\n\n1. Nominal: Invarian terhadap transformasi permutasi satu-ke-satu (Bijeksi):\n$$y = f(x), \\quad f \\text{ satu-ke-satu}$$\n\n2. Ordinal: Invarian terhadap transformasi monotonik naik tegas (*strictly increasing monotonic*):\n$$y = f(x), \\quad x_1 > x_2 \\implies f(x_1) > f(x_2)$$\n\n3. Interval: Invarian terhadap transformasi afin positif linier (*positive linear / affine transformation*):\n$$y = a x + b, \\quad a > 0, \\; b \\in \\mathbb{R}$$\nRasio interval terlestarikan: $\\frac{y_2 - y_1}{y_4 - y_3} = \\frac{x_2 - x_1}{x_4 - x_3}$.\n\n4. Rasio: Invarian terhadap transformasi keserupaan geometris linier (*similarity transformation*):\n$$y = a x, \\quad a > 0$$\nRasio mutlak nilai terlestarikan: $\\frac{y_2}{y_1} = \\frac{x_2}{x_1}$.",
    "workedExample": {
      "problemStatement": "Jelaskan mengapa pernyataan \"Suhu air 40 \u00b0C adalah dua kali lebih panas dibanding suhu air 20 \u00b0C\" merupakan kesalahan interpretasi skala matematis, sedangkan pernyataan \"Tegangan 40 Volt adalah dua kali lebih besar dari 20 Volt\" adalah pernyataan yang absah.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi skala pengukuran suhu Celsius: Skala Celsius adalah Skala Interval, dengan titik nol arbitrer (titik beku air murni pada 1 atm).",
        "Langkah 2: Uji invariansi rasio pada Celsius: Konversikan ke Kelvin: 20 \u00b0C = 293.15 K; 40 \u00b0C = 313.15 K. Rasio energi termal sejati adalah 313.15 / 293.15 = 1.068 (hanya naik 6.8%, bukan naik 100%). Rasio matematis tidak invarian terhadap konversi satuan pada skala interval.",
        "Langkah 3: Identifikasi skala pengukuran tegangan listrik (Volt): Skala Volt adalah Skala Rasio dengan nol mutlak (0 V = beda potensial elektrostatik nol).",
        "Langkah 4: Uji invariansi rasio pada Volt: 40 V / 20 V = 2.0. Jika diubah ke milivolt: 40000 mV / 20000 mV = 2.0. Rasio terlestarikan sempurna di bawah transformasi skala apa pun."
      ],
      "resultInterpretation": "Operasi rasio atau perkalian hanya memiliki makna fisis pada data berskala rasio, dan dilarang diterapkan secara langsung pada data berskala interval atau ordinal."
    },
    "pythonImplementation": {
      "description": "Verifikasi invariansi transformasi skala pada data Interval (Celsius ke Fahrenheit) vs Rasio (Meter ke Inci).",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Uji Skala Interval: Suhu (Celsius vs Fahrenheit: F = 1.8 * C + 32)\nc1, c2 = 20.0, 40.0\nf1, f2 = 1.8 * c1 + 32.0, 1.8 * c2 + 32.0\n\nrasio_c = c2 / c1\nrasio_f = f2 / f1\n\nprint(\"EVALUASI SKALA INTERVAL (Suhu):\")\nprint(f\"Rasio dalam Celsius    : {c2:.1f} / {c1:.1f} = {rasio_c:.3f}\")\nprint(f\"Rasio dalam Fahrenheit : {f2:.1f} / {f1:.1f} = {rasio_f:.3f}\")\nprint(f\"Apakah Rasio Terlestarikan? {np.isclose(rasio_c, rasio_f)} (Operasi rasio TIDAK absah)\\n\")\n\n# Uji Skala Rasio: Jarak (Meter vs Inci: inch = 39.3701 * m)\nm1, m2 = 2.0, 4.0\nin1, in2 = 39.3701 * m1, 39.3701 * m2\n\nrasio_m = m2 / m1\nrasio_in = in2 / in1\n\nprint(\"EVALUASI SKALA RASIO (Panjang):\")\nprint(f\"Rasio dalam Meter : {m2:.1f} / {m1:.1f} = {rasio_m:.3f}\")\nprint(f\"Rasio dalam Inci  : {in2:.1f} / {in1:.1f} = {rasio_in:.3f}\")\nprint(f\"Apakah Rasio Terlestarikan? {np.isclose(rasio_m, rasio_in)} (Operasi rasio ABSAH)\")\n",
      "expectedOutput": "EVALUASI SKALA INTERVAL (Suhu):\nRasio dalam Celsius    : 40.0 / 20.0 = 2.000\nRasio dalam Fahrenheit : 104.0 / 68.0 = 1.529\nApakah Rasio Terlestarikan? False (Operasi rasio TIDAK absah)\n\nEVALUASI SKALA RASIO (Panjang):\nRasio dalam Meter : 4.0 / 2.0 = 2.000\nRasio dalam Inci  : 157.5 / 78.7 = 2.000\nApakah Rasio Terlestarikan? True (Operasi rasio ABSAH)"
    },
    "commonPitfalls": [
      "Menghitung rata-rata aritmatika dan standar deviasi pada data skala ordinal seperti skor kuesioner Likert (1 sampai 5) tanpa justifikasi model laten.",
      "Mengasumsikan bahwa angka nol selalu berarti ketiadaan fisik (seperti pada derajat Celsius atau waktu kalender masehi).",
      "Mengkodekan data nominal menjadi angka (misal: Jawa=1, Sumatra=2, Bali=3) lalu memasukkannya ke dalam model regresi linier biasa seolah-olah memiliki urutan numerik."
    ],
    "validationProcedures": [
      "Gunakan tabel periksa skala pengukuran Stevens sebelum menjalankan paket perangkat lunak statistik apa pun.",
      "Untuk data nominal berkategori ganda, lakukan one-hot encoding sebelum pemodelan komputasi."
    ],
    "exercises": [
      {
        "question": "Dalam pemantauan gempa bumi, Skala Richter dan Skala Modified Mercalli Intensity (MMI) termasuk ke dalam jenis skala pengukuran apa?",
        "hint": "Perhatikan apakah Skala Richter didasarkan pada logaritma energi fisik terukur atau persepsi kerusakan visual manusia.",
        "answerExplanation": "Skala MMI adalah Skala Ordinal karena didasarkan pada tingkatan deskripsi kerusakan visual teramati dari I hingga XII tanpa jarak interval fisik yang seragam. Skala Richter adalah Skala Interval logaritmik terhadap amplitudo gelombang seismik acuan, di mana setiap kenaikan 1 skala mencerminkan pelipatan amplitudo 10 kali lipat."
      }
    ],
    "references": [
      {
        "citation": "Stevens, S. S. (1946). On the theory of scales of measurement. Science, 103(2684), 677-680.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Michell, J. (1997). Numbers as quantitative relations and the foundation of measurement in psychology. British Journal of Psychology, 88(3), 355-383.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: 4 Skala Pengukuran Data: Nominal, Ordinal, Interval, da...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.2.2.",
          "Capaian: Memahami hierarki taksonomi 4 skala pengukuran data menurut teori S.S. Stevens (1946).",
          "Capaian: Mengidentifikasi karakteristik nol mutlak (absolute zero) dan kesetaraan interval.",
          "Capaian: Menentukan skala yang tepat untuk berbagai parameter fisis, algoritmis, dan kuesioner rekayasa."
        ],
        "keyFormulaOrDiagram": "$$y = f(x), \\quad f \\text{ satu-ke-satu}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: 4 Skala Pengukuran Data: Nominal, Ordinal, Interval, da...",
        "bulletPoints": [
          "Pada tahun 1946, psikolog dan metrolog Stanley Smith Stevens menerbitkan karya monumental di majalah *Science* yang memformul...",
          "Empat skala pengukuran tersebut adalah: 1. Skala Nominal: Tingkat paling mendasar yang hanya berfungsi sebagai label atau ide...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ]
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Pada tahun 1946, psikolog dan metrolog Stanley Smith Stevens menerbitkan karya monumental di majalah *Science* yang memformul...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Teori Pengukuran Representasional Stevens dinyatakan melalui grup transformasi invarian:",
          "1. Nominal: Invarian terhadap transformasi permutasi satu-ke-satu (Bijeksi):",
          "2. Ordinal: Invarian terhadap transformasi monotonik naik tegas (*strictly increasing monotonic*):"
        ],
        "keyFormulaOrDiagram": "$$y = f(x), \\quad f \\text{ satu-ke-satu}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Jelaskan mengapa pernyataan \"Suhu air 40 \u00b0C adalah dua kali lebih panas dibanding suhu air 20 \u00b0C\" merupakan kesalahan interpretasi skala mat...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi skala pengukuran suhu Celsius: Skala Celsius adalah Skala Interval, dengan titik nol a...",
          "Langkah 2: Uji invariansi rasio pada Celsius: Konversikan ke Kelvin: 20 \u00b0C = 293.15 K; 40 \u00b0C = 313.15 K. Rasio...",
          "Langkah 3: Identifikasi skala pengukuran tegangan listrik (Volt): Skala Volt adalah Skala Rasio dengan nol mut...",
          "Interpretasi: Operasi rasio atau perkalian hanya memiliki makna fisis pada data berskala rasio, dan dilarang diterapkan secara langsun..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Uji invariansi rasio pada Volt: 40 V / 20 V = 2.0. Jika diubah ke milivolt: 400..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Verifikasi invariansi transformasi skala pada data Interval (Celsius ke Fahrenheit) vs Rasio (Meter ke Inci).",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: EVALUASI SKALA INTERVAL (Suhu):"
        ],
        "keyFormulaOrDiagram": "EVALUASI SKALA INTERVAL (Suhu): | Rasio dalam Celsius : 40.0 / 20.0 = 2.000 | Rasio dalam..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menghitung rata-rata aritmatika dan standar deviasi pada data skala ordinal seperti skor kuesioner Likert (1 s...",
          "Perangkap: Mengasumsikan bahwa angka nol selalu berarti ketiadaan fisik (seperti pada derajat Celsius atau waktu kalender...",
          "Perangkap: Mengkodekan data nominal menjadi angka (misal: Jawa=1, Sumatra=2, Bali=3) lalu memasukkannya ke dalam model re..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan tabel periksa skala pengukuran Stevens sebelum menjalankan paket perangkat lunak statistik apa pun.",
          "Prosedur: Untuk data nominal berkategori ganda, lakukan one-hot encoding sebelum pemodelan komputasi."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Dalam pemantauan gempa bumi, Skala Richter dan Skala Modified Mercalli Intensity (MMI) termasuk ke dalam jenis skala pen...",
          "Petunjuk: Perhatikan apakah Skala Richter didasarkan pada logaritma energi fisik terukur atau persepsi kerusak...",
          "Solusi Kunci: Skala MMI adalah Skala Ordinal karena didasarkan pada tingkatan deskripsi kerusakan visual teramati dari I hingga XII ta..."
        ]
      }
    ]
  },
  "2.2.3": {
    "id": "2.2.3",
    "chapterId": "CH-09",
    "title": "Operasi Matematika dan Statistik yang Absah untuk Setiap Skala Data",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memetakan statistik deskriptif dan inferensial yang absah untuk masing-masing skala pengukuran Stevens.",
      "Memahami batas penerapan statistik parametrik versus non-parametrik.",
      "Mencegah kesalahan kalkulasi rata-rata pada skala data berperingkat."
    ],
    "content": "Perangkat lunak analisis statistik (seperti SPSS, R, atau pustaka Python Scipy) akan memproses angka apa pun yang dimasukkan oleh pengguna tanpa memperingatkan apakah operasi tersebut masuk akal secara metodologis. Jika peneliti memasukkan kode wilayah (1 untuk Lampung, 2 untuk Sumsel, 3 untuk Bengkulu) lalu memerintahkan komputer untuk menghitung rata-ratanya (misal keluar angka 2.1), komputer akan menghitungnya dengan patuh, namun angka 2.1 tersebut sama sekali tidak memiliki arti fisis.\n\nKaidah pemetaan operasi statistik yang absah (*permissible statistics*):\n1. Data Nominal:\n   - Operasi Matematika: Ekivalensi ($=$ atau $\\neq$).\n   - Ukuran Pemusatan: Modus (Mode). Rata-rata dan Median tidak diizinkan.\n   - Ukuran Dispersi: Entropi informasi atau rasio variasi kualitatif.\n   - Uji Statistik: Chi-Square Goodness of Fit, Uji Eksak Fisher.\n2. Data Ordinal:\n   - Operasi Matematika: Ekivalensi dan Urutan Relatif ($>$ atau $<$).\n   - Ukuran Pemusatan: Median dan Persentil.\n   - Ukuran Dispersi: Jangkauan Interkuartil (IQR). Rata-rata dan Standar Deviasi secara formal tidak valid.\n   - Uji Statistik: Uji Non-Parametrik (Mann-Whitney U, Wilcoxon Signed-Rank, Kruskal-Wallis, Korelasi Spearman).\n3. Data Interval:\n   - Operasi Matematika: Tambah dan Kurang ($+$ dan $-$).\n   - Ukuran Pemusatan: Rata-rata Aritmatika (Arithmetic Mean).\n   - Ukuran Dispersi: Standar Deviasi, Varians.\n   - Uji Statistik: Statistik Parametrik (Uji-t Student, ANOVA, Regresi Linier, Korelasi Pearson).\n4. Data Rasio:\n   - Operasi Matematika: Seluruh operasi aritmatika dasar ($+, -, \\times, \\div$).\n   - Ukuran Pemusatan: Rata-rata Geometrik (Geometric Mean), Rata-rata Harmonik, Rata-rata Aritmatika.\n   - Ukuran Dispersi: Koefisien Variasi ($CV = \\sigma / \\mu$).\n   - Uji Statistik: Seluruh metode parametrik canggih dan transformasi logaritmik multivariat.",
    "mathematicalFoundations": "Prinsip Kesahihan Statistik Stevens: Suatu fungsi statistik $T(X_1, X_2, \\dots, X_n)$ dikatakan bermakna (*meaningful*) di bawah skala pengukuran tertentu jika kebenaran proposisi empiris:\n\n$$\\mathcal{P}: T(X) > T(Y)$$\n\ntetap invarian di bawah seluruh transformasi $f \\in \\mathcal{G}$ yang diizinkan untuk skala tersebut:\n\n$$T(X) > T(Y) \\iff T(f(X)) > T(f(Y))$$\n\nUntuk skala ordinal, transformasi monotonik $f(x) = x^3$ dapat mengubah urutan nilai rata-rata aritmatika (Mean(X) > Mean(Y) bisa berubah menjadi Mean(f(X)) < Mean(f(Y))), membuktikan bahwa rata-rata aritmatika tidak bermakna pada data ordinal. Namun, urutan median selalu terlestarikan: $\\text{Med}(f(X)) = f(\\text{Med}(X))$.",
    "workedExample": {
      "problemStatement": "Diberikan dua kelompok responden penguji aplikasi antarmuka robotik: Kelompok A memberikan skor kepuasan ordinal [1, 2, 5], Kelompok B memberikan skor [2, 3, 3]. Hitung rata-rata aritmatika dan median masing-masing kelompok. Terapkan transformasi monotonik f(x) = x^3 pada data ordinal tersebut dan periksa apakah kesimpulan komparasi kedua kelompok tetap konsisten.",
      "stepByStepSolution": [
        "Langkah 1: Hitung pada data asli: Mean(A) = (1+2+5)/3 = 2.67; Mean(B) = (2+3+3)/3 = 2.67 (Rata-rata sama). Median(A) = 2; Median(B) = 3 (Kelompok B lebih tinggi).",
        "Langkah 2: Terapkan transformasi monotonik sah skala ordinal f(x) = x^3: Kelompok A baru: [1, 8, 125]; Kelompok B baru: [8, 27, 27].",
        "Langkah 3: Hitung pada data hasil transformasi: Mean(A_baru) = (1+8+125)/3 = 44.67; Mean(B_baru) = (8+27+27)/3 = 20.67. Sekarang Mean(A) jauh lebih tinggi dibanding Mean(B)!",
        "Langkah 4: Hitung median data baru: Median(A_baru) = 8; Median(B_baru) = 27. Median(B) tetap konsisten lebih tinggi dibanding Median(A)."
      ],
      "resultInterpretation": "Eksperimen ini membuktikan secara matematis mengapa penggunaan rata-rata aritmatika pada data ordinal menghasilkan kesimpulan yang tidak stabil dan menyesatkan. Peneliti wajib menggunakan median atau uji non-parametrik."
    },
    "pythonImplementation": {
      "description": "Demonstrasi keruntuhan konsistensi rata-rata versus stabilitas median pada data skala ordinal.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Data ordinal dua kelompok uji antarmuka [SIMULASI/SYNTHETIC DATA]\ngrup_a = np.array([1, 2, 5])\ngrup_b = np.array([2, 3, 3])\n\n# Transformasi monotonik sah skala ordinal: f(x) = x**3\nf_a = grup_a ** 3\nf_b = grup_b ** 3\n\nprint(\"SEBELUM TRANSFORMASI:\")\nprint(f\"Mean A: {np.mean(grup_a):.2f} | Mean B: {np.mean(grup_b):.2f} -> Sama\")\nprint(f\"Med A : {np.median(grup_a):.2f} | Med B : {np.median(grup_b):.2f} -> B lebih tinggi\")\n\nprint(f\"\\nSETELAH TRANSFORMASI MONOTONIK f(x) = x^3:\")\nprint(f\"Mean A: {np.mean(f_a):.2f} | Mean B: {np.mean(f_b):.2f} -> A JAUH lebih tinggi (Inversi Kesimpulan!)\")\nprint(f\"Med A : {np.median(f_a):.2f} | Med B : {np.median(f_b):.2f} -> B tetap lebih tinggi (Invarian/Stabil)\")\n",
      "expectedOutput": "SEBELUM TRANSFORMASI:\nMean A: 2.67 | Mean B: 2.67 -> Sama\nMed A : 2.00 | Med B : 3.00 -> B lebih tinggi\n\nSETELAH TRANSFORMASI MONOTONIK f(x) = x^3:\nMean A: 44.67 | Mean B: 20.67 -> A JAUH lebih tinggi (Inversi Kesimpulan!)\nMed A : 8.00 | Med B : 27.00 -> B tetap lebih tinggi (Invarian/Stabil)"
    },
    "commonPitfalls": [
      "Menjalankan uji-t Student independen atau ANOVA pada data kuesioner berskala Likert 1-5 tanpa menguji normalitas dan tanpa asumsi model respon butir (Item Response Theory).",
      "Menyajikan standar deviasi pada data yang berdistribusi sangat menceng (skewed) atau data berkategori ordinal.",
      "Mengalikan data skala interval (seperti suhu Celsius) dengan konstanta pembagi tanpa mengonversi terlebih dahulu ke skala rasio mutlak."
    ],
    "validationProcedures": [
      "Gunakan uji normalitas Shapiro-Wilk: jika asumsi distribusi Gaussian dilanggar pada data interval/rasio, alihkan analisis ke uji non-parametrik yang tangguh.",
      "Sajikan nilai Median bersama Interquartile Range (IQR) saat melaporkan data berskala ordinal."
    ],
    "exercises": [
      {
        "question": "Metode uji hipotesis non-parametrik manakah yang merupakan padanan dari uji-t dua sampel independen untuk data berskala ordinal?",
        "hint": "Uji ini membandingkan peringkat (ranks) dari kedua kelompok pengamatan.",
        "answerExplanation": "Padanan non-parametrik untuk uji-t sampel independen adalah Uji Mann-Whitney U (atau Wilcoxon Rank-Sum Test). Uji ini bekerja dengan mengurutkan seluruh gabungan data menjadi ranking ordinal tanpa bergantung pada asumsi normalitas distribusi populasi atau kesetaraan jarak interval."
      }
    ],
    "references": [
      {
        "citation": "Velleman, P. F., & Wilkinson, L. (1993). Nominal, ordinal, interval, and ratio typologies are misleading. The American Statistician, 47(1), 65-72.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Conover, W. J. (1999). Practical Nonparametric Statistics. John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Operasi Matematika dan Statistik yang Absah untuk Setia...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.2.3.",
          "Capaian: Memetakan statistik deskriptif dan inferensial yang absah untuk masing-masing skala pengukuran Stevens.",
          "Capaian: Memahami batas penerapan statistik parametrik versus non-parametrik.",
          "Capaian: Mencegah kesalahan kalkulasi rata-rata pada skala data berperingkat."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{P}: T(X) > T(Y)$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Operasi Matematika dan Statistik yang Absah untuk Setia...",
        "bulletPoints": [
          "Perangkat lunak analisis statistik (seperti SPSS, R, atau pustaka Python Scipy) akan memproses angka apa pun yang dimasukkan...",
          "Kaidah pemetaan operasi statistik yang absah (*permissible statistics*): 1. Data Nominal: - Operasi Matematika: Ekivalensi ($...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ]
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Perangkat lunak analisis statistik (seperti SPSS, R, atau pustaka Python Scipy) akan memproses angka apa pun yang dimasukkan...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Prinsip Kesahihan Statistik Stevens: Suatu fungsi statistik $T(X_1, X_2, \\dots, X_n)$ dikatakan bermakna (*mea...",
          "tetap invarian di bawah seluruh transformasi $f \\in \\mathcal{G}$ yang diizinkan untuk skala tersebut:",
          "Untuk skala ordinal, transformasi monotonik $f(x) = x^3$ dapat mengubah urutan nilai rata-rata aritmatika (Mea..."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{P}: T(X) > T(Y)$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Diberikan dua kelompok responden penguji aplikasi antarmuka robotik: Kelompok A memberikan skor kepuasan ordinal [1, 2, 5], Kelompok B membe...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Hitung pada data asli: Mean(A) = (1+2+5)/3 = 2.67; Mean(B) = (2+3+3)/3 = 2.67 (Rata-rata sama). Med...",
          "Langkah 2: Terapkan transformasi monotonik sah skala ordinal f(x) = x^3: Kelompok A baru: [1, 8, 125]; Kelompo...",
          "Langkah 3: Hitung pada data hasil transformasi: Mean(A_baru) = (1+8+125)/3 = 44.67; Mean(B_baru) = (8+27+27)/3...",
          "Interpretasi: Eksperimen ini membuktikan secara matematis mengapa penggunaan rata-rata aritmatika pada data ordinal menghasilkan kesim..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Hitung median data baru: Median(A_baru) = 8; Median(B_baru) = 27. Median(B) tet..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Demonstrasi keruntuhan konsistensi rata-rata versus stabilitas median pada data skala ordinal.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: SEBELUM TRANSFORMASI:"
        ],
        "keyFormulaOrDiagram": "SEBELUM TRANSFORMASI: | Mean A: 2.67 | Mean B: 2.67 -> Sama | Med A : 2.00 | Med B : 3.00..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menjalankan uji-t Student independen atau ANOVA pada data kuesioner berskala Likert 1-5 tanpa menguji normalit...",
          "Perangkap: Menyajikan standar deviasi pada data yang berdistribusi sangat menceng (skewed) atau data berkategori ordinal.",
          "Perangkap: Mengalikan data skala interval (seperti suhu Celsius) dengan konstanta pembagi tanpa mengonversi terlebih dahu..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan uji normalitas Shapiro-Wilk: jika asumsi distribusi Gaussian dilanggar pada data interval/rasio, alihk...",
          "Prosedur: Sajikan nilai Median bersama Interquartile Range (IQR) saat melaporkan data berskala ordinal."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Metode uji hipotesis non-parametrik manakah yang merupakan padanan dari uji-t dua sampel independen untuk data berskala...",
          "Petunjuk: Uji ini membandingkan peringkat (ranks) dari kedua kelompok pengamatan.",
          "Solusi Kunci: Padanan non-parametrik untuk uji-t sampel independen adalah Uji Mann-Whitney U (atau Wilcoxon Rank-Sum Test). Uji ini be..."
        ]
      }
    ]
  },
  "2.2.4": {
    "id": "2.2.4",
    "chapterId": "CH-09",
    "title": "Penanganan Variabel Laten melalui Indikator Pengukuran Teramati",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memahami definisi variabel laten (unobservable/latent variables) dalam konteks sistem rekayasa.",
      "Membangun model pengukuran refleksif versus formatif.",
      "Mereduksi dimensi indikator teramati menggunakan analisis faktor konfirmatori (CFA)."
    ],
    "content": "Dalam riset ilmiah rekayasa, tidak semua konsep penting dapat diukur secara langsung oleh sebuah sensor tunggal. Variabel seperti \"kesehatan struktural jembatan (structural health)\", \"kenyamanan berkendara kendaraan listrik (ride comfort)\", \"kualitas daya listrik (power quality)\", atau \"beban kognitif operator reaktor nuklir (mental workload)\" adalah konstruksi teoretis abstrak yang bersifat tidak teramati secara langsung (*latent variables*).\n\nUntuk mengukur variabel laten, peneliti harus menghubungkannya dengan serangkaian Indikator Pengukuran Teramati (*manifest/observed indicators*) melalui dua model pengukuran:\n1. Model Pengukuran Refleksif: Variabel laten dipandang sebagai akar penyebab yang mendasari variasi pada indikator teramati. Jika kondisi laten berubah, seluruh indikator teramati akan bergerak secara simultan searah. Contoh: degradasi kesehatan baterai laten (State of Health / SoH) menyebabkan kenaikan resistansi internal, penurunan kapasitas muatan, dan kenaikan suhu operasional secara bersamaan.\n2. Model Pengukuran Formatif: Indikator teramati dipandang sebagai faktor-faktor pembentuk atau penyusun dari variabel laten. Contoh: indeks stres operasional server dibentuk oleh gabungan utilisasi CPU, konsumsi bandwidth memori, dan laju baca-tulis disk I/O.\n\nDengan memanfaatkan teknik Structural Equation Modeling (SEM) dan Confirmatory Factor Analysis (CFA), peneliti dapat mengevaluasi seberapa akurat kombinasi sensor teramati mampu merefleksikan keadaan variabel laten sejati.",
    "mathematicalFoundations": "Model Pengukuran Refleksif Klasik (Factor Analytic Measurement Model):\n\n$$\\mathbf{x} = \\boldsymbol{\\Lambda}_x \\boldsymbol{\\xi} + \\boldsymbol{\\delta}$$\n\nDi mana:\n- $\\mathbf{x} \\in \\mathbb{R}^p$ adalah vektor indikator teramati ($p$ buah pembacaan sensor).\n- $\\boldsymbol{\\xi} \\in \\mathbb{R}^m$ adalah vektor variabel laten ($m \\ll p$).\n- $\\boldsymbol{\\Lambda}_x \\in \\mathbb{R}^{p \\times m}$ adalah matriks loading faktor (bobot regresi indikator terhadap laten).\n- $\\boldsymbol{\\delta} \\in \\mathbb{R}^p$ adalah galat pengukuran unik indikator dengan kovarians $\\boldsymbol{\\Theta}_\\delta$.\n\nMatriks Kovarians Teoretis Indikator Teramati $\\boldsymbol{\\Sigma}(\\boldsymbol{\\theta})$:\n$$\\boldsymbol{\\Sigma} = \\boldsymbol{\\Lambda}_x \\boldsymbol{\\Phi} \\boldsymbol{\\Lambda}_x^T + \\boldsymbol{\\Theta}_\\delta$$\n\nDi mana $\\boldsymbol{\\Phi} = \\text{Cov}(\\boldsymbol{\\xi})$ adalah matriks kovarians antar-variabel laten.",
    "workedExample": {
      "problemStatement": "Variabel laten \"Kualitas Daya Listrik (Power Quality)\" diukur melalui 3 indikator sensorik terstandarisasi: x1 = Deviasi Frekuensi (Hz), x2 = Total Harmonic Distortion (THD %), dan x3 = Voltage Sag Duration (ms). Matriks loading faktor ternormalisasi yang terestimasi adalah lambda = [0.85, 0.90, 0.78]. Hitung varians ekstrak rata-rata (Average Variance Extracted / AVE) untuk membuktikan apakah indikator-indikator tersebut memiliki validitas konvergen yang memadai (ambang batas standar AVE > 0.50).",
      "stepByStepSolution": [
        "Langkah 1: Kuadratkan masing-masing bobot loading faktor: lambda_1^2 = 0.85^2 = 0.7225; lambda_2^2 = 0.90^2 = 0.8100; lambda_3^2 = 0.78^2 = 0.6084.",
        "Langkah 2: Jumlahkan kuadrat loading faktor: 0.7225 + 0.8100 + 0.6084 = 2.1409.",
        "Langkah 3: Hitung nilai AVE: AVE = (Jumlah lambda_i^2) / K = 2.1409 / 3 = 0.7136 (71.4%).",
        "Langkah 4: Evaluasi terhadap ambang batas: Nilai AVE sebesar 0.714 jauh melampaui kriteria minimum 0.50."
      ],
      "resultInterpretation": "Model pengukuran memiliki validitas konvergen yang sangat kuat. Lebih dari 71% variansi ketiga sensor tersebut berhasil merefleksikan keadaan laten Kualitas Daya Listrik."
    },
    "pythonImplementation": {
      "description": "Ekstraksi skor variabel laten menggunakan Analisis Komponen Utama (PCA) sebagai aproksimasi faktor pertama.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Simulasi data 3 sensor teramati dari 1 variabel laten sejati [SIMULASI/SYNTHETIC DATA]\nnp.random.seed(42)\nn_sampel = 200\n\n# Variabel laten tersembunyi (misal: degradasi termal trafo)\nlaten_sejati = np.random.normal(0, 1.0, size=n_sampel)\n\n# Sensor teramati x1, x2, x3 dengan loading faktor 0.85, 0.90, 0.80 dan noise\nx1 = 0.85 * laten_sejati + np.random.normal(0, 0.3, size=n_sampel)\nx2 = 0.90 * laten_sejati + np.random.normal(0, 0.2, size=n_sampel)\nx3 = 0.80 * laten_sejati + np.random.normal(0, 0.4, size=n_sampel)\n\nX = np.column_stack([x1, x2, x3])\nX_terpusat = X - np.mean(X, axis=0)\n\n# Dekomposisi nilai singular (SVD) untuk mengekstrak komponen utama pertama\nU, S, Vt = np.linalg.svd(X_terpusat, full_matrices=False)\nskor_laten_estimasi = U[:, 0] * S[0]\n\n# Hitung korelasi estimasi dengan laten sejati\nkorelasi = np.abs(np.corrcoef(laten_sejati, skor_laten_estimasi)[0, 1])\n\nprint(f\"Proporsi Varians Terjelaskan Komponen 1: {(S[0]**2) / np.sum(S**2) * 100:.1f}%\")\nprint(f\"Korelasi Estimasi PCA dengan Laten Sejati: {korelasi:.4f}\")\nprint(\"Kesimpulan: Gabungan 3 sensor teramati berhasil merekonstruksi variabel laten dengan fidelitas tinggi.\")\n",
      "expectedOutput": "Proporsi Varians Terjelaskan Komponen 1: 89.2%\nKorelasi Estimasi PCA dengan Laten Sejati: 0.9818\nKesimpulan: Gabungan 3 sensor teramati berhasil merekonstruksi variabel laten dengan fidelitas tinggi."
    },
    "commonPitfalls": [
      "Memperlakukan satu indikator tunggal yang bising seolah-olah indikator tersebut adalah variabel laten itu sendiri.",
      "Mencampuradukkan indikator formatif dengan indikator refleksif dalam satu model pengukuran tanpa analisis spesifikasi struktur.",
      "Mengabaikan korelasi galat antar-sensor yang dipasang pada papan sirkuit fisik yang sama."
    ],
    "validationProcedures": [
      "Evaluasi Average Variance Extracted (AVE > 0.50) dan Composite Reliability (CR > 0.70) untuk mengonfirmasi validitas model pengukuran.",
      "Lakukan uji Fornell-Larcker untuk memastikan validitas diskriminan antar-variabel laten yang berbeda."
    ],
    "exercises": [
      {
        "question": "Dalam pemantauan struktur jembatan gantung, apakah sensor regangan (strain gauge) dan sensor perpindahan (displacement sensor) merupakan indikator refleksif atau formatif dari \"Kesehatan Struktural\"?",
        "hint": "Apakah kerusakan struktur yang terjadi menyebabkan perubahan regangan, ataukah regangan yang menyebabkan kerusakan struktur?",
        "answerExplanation": "Jika kerusakan struktural (laten) memicu deformasi fisis yang kemudian terdeteksi sebagai lonjakan regangan dan perpindahan oleh sensor, maka model tersebut adalah model Refleksif. Perubahan pada kondisi laten menyebabkan perubahan serentak pada pembacaan indikator sensor."
      }
    ],
    "references": [
      {
        "citation": "Bollen, K. A. (1989). Structural Equations with Latent Variables. John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Hair, J. F., et al. (2019). When to use and how to report the results of PLS-SEM. European Business Review, 31(1), 2-24.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Penanganan Variabel Laten melalui Indikator Pengukuran...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.2.4.",
          "Capaian: Memahami definisi variabel laten (unobservable/latent variables) dalam konteks sistem rekayasa.",
          "Capaian: Membangun model pengukuran refleksif versus formatif.",
          "Capaian: Mereduksi dimensi indikator teramati menggunakan analisis faktor konfirmatori (CFA)."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{x} = \\boldsymbol{\\Lambda}_x \\boldsymbol{\\xi} + \\boldsymbol{\\delta}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Penanganan Variabel Laten melalui Indikator Pengukuran...",
        "bulletPoints": [
          "Dalam riset ilmiah rekayasa, tidak semua konsep penting dapat diukur secara langsung oleh sebuah sensor tunggal. Variabel sep...",
          "Untuk mengukur variabel laten, peneliti harus menghubungkannya dengan serangkaian Indikator Pengukuran Teramati (*manifest/ob...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Dengan memanfaatkan teknik Structural Equation Modeling (SEM) dan Confirmatory Factor Anal..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Dengan memanfaatkan teknik Structural Equation Modeling (SEM) dan Confirmatory Factor Analysis (CFA), peneliti dapat mengeval...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Model Pengukuran Refleksif Klasik (Factor Analytic Measurement Model):",
          "Di mana:",
          "- $\\mathbf{x} \\in \\mathbb{R}^p$ adalah vektor indikator teramati ($p$ buah pembacaan sensor)."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{x} = \\boldsymbol{\\Lambda}_x \\boldsymbol{\\xi} + \\boldsymbol{\\delta}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Variabel laten \"Kualitas Daya Listrik (Power Quality)\" diukur melalui 3 indikator sensorik terstandarisasi: x1 = Deviasi Frekuensi (Hz), x2...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Kuadratkan masing-masing bobot loading faktor: lambda_1^2 = 0.85^2 = 0.7225; lambda_2^2 = 0.90^2 =...",
          "Langkah 2: Jumlahkan kuadrat loading faktor: 0.7225 + 0.8100 + 0.6084 = 2.1409.",
          "Langkah 3: Hitung nilai AVE: AVE = (Jumlah lambda_i^2) / K = 2.1409 / 3 = 0.7136 (71.4%).",
          "Interpretasi: Model pengukuran memiliki validitas konvergen yang sangat kuat. Lebih dari 71% variansi ketiga sensor tersebut berhasil..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Evaluasi terhadap ambang batas: Nilai AVE sebesar 0.714 jauh melampaui kriteria..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Ekstraksi skor variabel laten menggunakan Analisis Komponen Utama (PCA) sebagai aproksimasi faktor pertama.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: Proporsi Varians Terjelaskan Komponen 1: 89.2%"
        ],
        "keyFormulaOrDiagram": "Proporsi Varians Terjelaskan Komponen 1: 89.2% | Korelasi Estimasi PCA dengan Laten Sejati..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Memperlakukan satu indikator tunggal yang bising seolah-olah indikator tersebut adalah variabel laten itu send...",
          "Perangkap: Mencampuradukkan indikator formatif dengan indikator refleksif dalam satu model pengukuran tanpa analisis spes...",
          "Perangkap: Mengabaikan korelasi galat antar-sensor yang dipasang pada papan sirkuit fisik yang sama."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Evaluasi Average Variance Extracted (AVE > 0.50) dan Composite Reliability (CR > 0.70) untuk mengonfirmasi val...",
          "Prosedur: Lakukan uji Fornell-Larcker untuk memastikan validitas diskriminan antar-variabel laten yang berbeda."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Dalam pemantauan struktur jembatan gantung, apakah sensor regangan (strain gauge) dan sensor perpindahan (displacement s...",
          "Petunjuk: Apakah kerusakan struktur yang terjadi menyebabkan perubahan regangan, ataukah regangan yang menyeba...",
          "Solusi Kunci: Jika kerusakan struktural (laten) memicu deformasi fisis yang kemudian terdeteksi sebagai lonjakan regangan dan perpinda..."
        ]
      }
    ]
  }
};
