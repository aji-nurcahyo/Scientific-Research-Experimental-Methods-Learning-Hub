import { Lesson } from '../types/curriculum';

export const CH04_LESSONS: Record<string, Partial<Lesson>> = {
  "1.4.1": {
    "id": "1.4.1",
    "chapterId": "CH-04",
    "title": "Konstruksi Matriks Sintesis Literatur Multidimensi",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Merancang skema matriks sintesis komparatif lintas dimensi metodologi dan hasil.",
      "Mengekstraksi variabel perlakuan, metrik performa, dan asumsi dari korpus ilmiah.",
      "Mengidentifikasi inkonsistensi temuan antarpeneliti terdahulu secara terstruktur."
    ],
    "content": "Setelah korpus literatur berhasil dikumpulkan melalui protokol PRISMA, tantangan berikutnya adalah melakukan sintesis bukti secara kritis. Kesalahan umum peneliti pemula adalah menyusun tinjauan pustaka sebagai \"daftar belanja\" ringkasan per artikel secara berurutan tanpa integrasi konseptual. Tinjauan seperti ini tidak memberikan wawasan sintesis mengenai perkembangan keilmuan.\n\nMatriks sintesis literatur multidimensi adalah instrumen analitis untuk memetakan, mengelompokkan, dan membandingkan literatur berdasarkan parameter rekayasa yang seragam. Setiap baris mewakili studi yang dianalisis, sedangkan kolom memuat dimensi investigasi standar:\n1. Dimensi Masalah: Fokus spesifik, skala sistem, dan batasan lingkungan operasional.\n2. Dimensi Metodologis: Desain eksperimen, algoritma atau model fisika yang diajukan, konfigurasi perangkat keras atau simulasi.\n3. Dimensi Dataset dan Pengukuran: Sumber data, ukuran sampel, resolusi instrumen, dan teknik ground truthing.\n4. Dimensi Metrik Evaluasi: Metrik kuantitatif terstandarisasi (contoh: RMSE, F1-Score, efisiensi energi, latency).\n5. Dimensi Temuan dan Anomali: Hasil utama serta kondisi di mana metode yang diuji mengalami kegagalan.\n\nDengan membandingkan kolom yang sama di seluruh penelitian, peneliti dapat langsung melihat pola konsensus, kontradiksi temuan empiris, dan area yang belum pernah diuji sebelumnya.",
    "mathematicalFoundations": "Matriks sintesis dapat direpresentasikan sebagai matriks biner atau berbobot $\\mathbf{M} \\in \\mathbb{R}^{P \\times D}$, di mana $P$ adalah jumlah publikasi yang dianalisis dan $D$ adalah dimensi fitur analitis:\n\n$$M_{i,j} = \\begin{cases} 1, & \\text{jika publikasi } i \\text{ menguji dimensi/fitur } j \\\\ 0, & \\text{lainnya} \\end{cases}$$\n\nTingkat kejenuhan fitur (*feature saturation rate*) untuk dimensi $j$ dihitung sebagai:\n\n$$S_j = \\frac{1}{P} \\sum_{i=1}^P M_{i,j}$$\n\nJika $S_j \\approx 1$, dimensi tersebut merupakan praktik standar (baseline). Jika $S_j \\ll 1$, dimensi tersebut menandakan potensi celah penelitian metodologis yang jarang dieksplorasi.",
    "workedExample": {
      "problemStatement": "Berdasarkan analisis terhadap 20 artikel sistem deteksi retak jalan raya berbasis drone, 18 artikel menguji algoritma pada kondisi siang hari cerah, namun hanya 2 artikel yang menguji performa pada kondisi aspal basah setelah hujan. Hitung tingkat kejenuhan kedua fitur dan tentukan implikasi akademiknya.",
      "stepByStepSolution": [
        "Langkah 1: Hitung kejenuhan kondisi siang cerah: S_cerah = 18 / 20 = 0.90 (90%).",
        "Langkah 2: Hitung kejenuhan kondisi aspal basah: S_basah = 2 / 20 = 0.10 (10%).",
        "Langkah 3: Interpretasikan disparitas statistik ini. Kondisi siang cerah telah mencapai tahap saturasi tinggi, sehingga eksperimen baru pada kondisi tersebut memiliki nilai kebaruan rendah.",
        "Langkah 4: Kondisi aspal basah memiliki saturasi sangat rendah (10%), menandakan adanya blind spot empiris yang signifikan dalam literatur terkini."
      ],
      "resultInterpretation": "Peneliti dapat memformulasikan pertanyaan riset baru yang berfokus secara eksplisit pada robustnes deteksi dalam kondisi pantulan air pada permukaan aspal basah."
    },
    "pythonImplementation": {
      "description": "Program ekstraksi dan visualisasi ringkasan tabulasi matriks sintesis pustaka.",
      "libraryDependencies": [
        "pandas"
      ],
      "code": "import pandas as pd\n\n# Data simulasi matriks sintesis 5 studi riset sensor [SIMULASI/SYNTHETIC DATA]\ndata_studi = [\n    {\"Penulis\": \"Pratama (2021)\", \"Dataset Lapangan\": 1, \"Kondisi Ekstrem\": 0, \"Ablasi Model\": 0, \"Kode Terbuka\": 0},\n    {\"Penulis\": \"Wijaya (2022)\", \"Dataset Lapangan\": 1, \"Kondisi Ekstrem\": 0, \"Ablasi Model\": 1, \"Kode Terbuka\": 0},\n    {\"Penulis\": \"Nugroho (2023)\", \"Dataset Lapangan\": 0, \"Kondisi Ekstrem\": 1, \"Ablasi Model\": 0, \"Kode Terbuka\": 1},\n    {\"Penulis\": \"Santoso (2023)\", \"Dataset Lapangan\": 1, \"Kondisi Ekstrem\": 0, \"Ablasi Model\": 1, \"Kode Terbuka\": 1},\n    {\"Penulis\": \"Hidayat (2024)\", \"Dataset Lapangan\": 1, \"Kondisi Ekstrem\": 0, \"Ablasi Model\": 0, \"Kode Terbuka\": 0},\n]\n\ndf = pd.DataFrame(data_studi)\ndimensi = [\"Dataset Lapangan\", \"Kondisi Ekstrem\", \"Ablasi Model\", \"Kode Terbuka\"]\nsaturasi = df[dimensi].mean()\n\nprint(\"Persentase Kejenuhan Dimensi Metodologi:\")\nfor dim, val in saturasi.items():\n    print(f\"- {dim:20s}: {val * 100:.1f}%\")\n",
      "expectedOutput": "Persentase Kejenuhan Dimensi Metodologi:\n- Dataset Lapangan    : 80.0%\n- Kondisi Ekstrem     : 20.0%\n- Ablasi Model        : 40.0%\n- Kode Terbuka        : 40.0%"
    },
    "commonPitfalls": [
      "Mengisi matriks hanya dengan deskripsi verbal panjang tanpa kategorisasi atau standardisasi nilai kolom.",
      "Membandingkan hasil performa model antarpenelitian yang menggunakan dataset atau protokol evaluasi yang berbeda secara tidak adil.",
      "Mengabaikan kolom asumsi dan batasan operasional yang dinyatakan oleh penulis asli."
    ],
    "validationProcedures": [
      "Lakukan ekstraksi ulang secara independen pada 20% artikel secara acak untuk mengukur tingkat kesepakatan antar-pengekstrak (inter-coder reliability).",
      "Pastikan metrik yang dicatat memiliki satuan ukur yang konsisten di seluruh baris matriks."
    ],
    "exercises": [
      {
        "question": "Mengapa matriks sintesis literatur harus mencakup kolom \"keterbatasan yang diakui penulis\" (author-acknowledged limitations)?",
        "hint": "Keterbatasan eksplisit dari peneliti sebelumnya sering kali merupakan titik tolak langsung untuk penelitian lanjutan.",
        "answerExplanation": "Kolom keterbatasan memuat pengakuan langsung dari penulis mengenai kelemahan rancangan, keterbatasan dataset, atau batasan validitas metode mereka. Informasi ini memberikan landasan paling valid dan terjustifikasi untuk merumuskan celah riset berikutnya."
      }
    ],
    "references": [
      {
        "citation": "Webster, J., & Watson, R. T. (2002). Analyzing the past to prepare for the future: Writing a literature review. MIS Quarterly, 26(2), xiii-xxiii.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Bandara, W., et al. (2015). Achieving rigor and relevance in systems literature reviews. Communications of the AIS, 37, 154-204.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Konstruksi Matriks Sintesis Literatur Multidimensi",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 1.4.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.4.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Merancang skema matriks sintesis komparatif lintas dimensi metodologi dan hasil.",
          "Capaian 2: Mengekstraksi variabel perlakuan, metrik performa, dan asumsi dari korpus ilmiah.",
          "Capaian 3: Mengidentifikasi inkonsistensi temuan antarpeneliti terdahulu secara terstruktur."
        ],
        "keyFormulaOrDiagram": "$$M_{i,j} = \\begin{cases} 1, & \\text{jika publikasi } i \\text{ menguji dimensi/fitur } j \\\\ 0, & \\text{lainnya} \\end{cases}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 1.4.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Konstruksi Matriks Sintesis Literatur Multidimensi",
        "lead": "Setelah korpus literatur berhasil dikumpulkan melalui protokol PRISMA, tantangan berikutnya adalah melakukan sintesis bukti secara kritis.",
        "bulletPoints": [
          "Kesalahan umum peneliti pemula adalah menyusun tinjauan pustaka sebagai \"daftar belanja\" ringkasan per artikel secara berurutan tanpa integrasi konseptual.",
          "Tinjauan seperti ini tidak memberikan wawasan sintesis mengenai perkembangan keilmuan.",
          "Matriks sintesis literatur multidimensi adalah instrumen analitis untuk memetakan, mengelompokkan, dan membandingkan literatur berdasarkan parameter rekayasa yang seragam.",
          "Setiap baris mewakili studi yang dianalisis, sedangkan kolom memuat dimensi investigasi standar: 1."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Dengan membandingkan kolom yang sama di seluruh penelitian, peneliti dapat langsung melihat pola konsensus, kontradiksi temuan empiris, dan area yang belum pernah diuji sebelumnya.",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Matriks sintesis dapat direpresentasikan sebagai matriks biner atau berbobot $\\mathbf{M} \\in \\mathbb{R}^{P \\times D}$, di mana $P$ adalah jumlah publikasi yang dianalisis dan $D$ adalah dimensi fitur analitis:",
        "bulletPoints": [
          "Tingkat kejenuhan fitur (*feature saturation rate*) untuk dimensi $j$ dihitung sebagai:",
          "Jika $S_j \\approx 1$, dimensi tersebut merupakan praktik standar (baseline). Jika $S_j \\ll 1$, dimensi tersebut menandakan potensi celah penelitian metodologis yang jarang dieksplorasi."
        ],
        "keyFormulaOrDiagram": "$$M_{i,j} = \\begin{cases} 1, & \\text{jika publikasi } i \\text{ menguji dimensi/fitur } j \\\\ 0, & \\text{lainnya} \\end{cases}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Berdasarkan analisis terhadap 20 artikel sistem deteksi retak jalan raya berbasis drone, 18 artikel menguji algoritma pada kondisi siang hari cerah, namun hanya 2 artikel yang menguji performa pada kondisi aspal basah setelah hujan. Hitung tingkat kejenuhan kedua fitur dan tentukan implikasi akademiknya.",
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
          "Langkah 1: Hitung kejenuhan kondisi siang cerah: S_cerah = 18 / 20 = 0.90 (90%).",
          "Langkah 2: Hitung kejenuhan kondisi aspal basah: S_basah = 2 / 20 = 0.10 (10%)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Interpretasikan disparitas statistik ini. Kondisi siang cerah telah mencapai tahap saturasi tinggi, sehingga eksperimen baru pada kondisi tersebut memiliki nilai kebaruan rendah.",
          "Langkah 4: Kondisi aspal basah memiliki saturasi sangat rendah (10%), menandakan adanya blind spot empiris yang signifikan dalam literatur terkini.",
          "[result: Interpretasi Ilmiah] Peneliti dapat memformulasikan pertanyaan riset baru yang berfokus secara eksplisit pada robustnes deteksi dalam kondisi pantulan air pada permukaan aspal basah."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Program ekstraksi dan visualisasi ringkasan tabulasi matriks sintesis pustaka.",
        "bulletPoints": [
          "Tujuan Algoritma: Program ekstraksi dan visualisasi ringkasan tabulasi matriks sintesis pustaka.",
          "Dependensi Pustaka Ilmiah: pandas",
          "Keluaran Terverifikasi: Persentase Kejenuhan Dimensi Metodologi:"
        ],
        "keyFormulaOrDiagram": "Persentase Kejenuhan Dimensi Metodologi:\n- Dataset Lapangan    : 80.0%\n- Kondisi Ekstrem     : 20.0%\n- Ablasi Model        : 40.0%\n- Kode Terbuka        : 40.0%",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Mengisi matriks hanya dengan deskripsi verbal panjang tanpa kategorisasi atau standardisasi nilai kolom.",
          "[warning: Perangkap] Membandingkan hasil performa model antarpenelitian yang menggunakan dataset atau protokol evaluasi yang berbeda secara tidak adil.",
          "[warning: Perangkap] Mengabaikan kolom asumsi dan batasan operasional yang dinyatakan oleh penulis asli."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Lakukan ekstraksi ulang secara independen pada 20% artikel secara acak untuk mengukur tingkat kesepakatan antar-pengekstrak (inter-coder reliability).",
          "Prosedur: Pastikan metrik yang dicatat memiliki satuan ukur yang konsisten di seluruh baris matriks."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa matriks sintesis literatur harus mencakup kolom \"keterbatasan yang diakui penulis\" (author-acknowledged limitations)?",
          "Petunjuk Analitis: Keterbatasan eksplisit dari peneliti sebelumnya sering kali merupakan titik tolak langsung untuk penelitian lanjutan.",
          "Solusi Kunci: Kolom keterbatasan memuat pengakuan langsung dari penulis mengenai kelemahan rancangan, keterbatasan dataset, atau batasan validitas metode mereka. Informasi ini memberikan landasan paling valid dan terjustifikasi untuk merumuskan celah riset berikutnya."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "1.4.2": {
    "id": "1.4.2",
    "chapterId": "CH-04",
    "title": "Analisis Bibliometrik Dasar Menggunakan Python (bibtexparser, graf jaringan)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Mem-parsing berkas metadata bibliografi standar (.bib atau .ris) secara komputasional.",
      "Membangun matriks ko-okurensi kata kunci penulis untuk mendeteksi klaster tematik riset.",
      "Memvisualisasikan struktur jaringan sitasi menggunakan pemodelan graf berbobot."
    ],
    "content": "Analisis bibliometrik adalah penerapan metode kuantitatif dan statistik terhadap data kepustakaan untuk memetakan struktur intelektual suatu bidang keilmuan. Melalui pendekatan komputasional, peneliti dapat menganalisis ratusan hingga ribuan artikel secara obyektif, menghindari keterbatasan kapasitas pembacaan manual.\n\nDua bentuk pemetaan bibliometrik utama meliputi:\n1. Analisis Ko-okurensi Kata Kunci (Keyword Co-occurrence Analysis): Mengukur frekuensi kemunculan bersama dua kata kunci dalam satu artikel. Dua konsep yang sering muncul bersamaan menandakan adanya hubungan tematik atau konseptual yang erat.\n2. Analisis Ko-sitasi (Co-citation Analysis): Mengukur seberapa sering dua artikel terdahulu disitasi bersamaan oleh artikel-artikel baru. Tingginya derajat ko-sitasi mencerminkan bahwa kedua karya tersebut dianggap oleh komunitas ilmiah sebagai fondasi bagi perkembangan sub-bidang tertentu.\n\nDengan memanfaatkan bahasa pemrograman Python dan struktur data graf, peneliti dapat menghitung ukuran sentralitas simpul untuk mengidentifikasi artikel kunci yang berperan sebagai jembatan pengetahuan antar-disiplin.",
    "mathematicalFoundations": "Diberikan korpus dokumen $\\mathcal{D} = \\{d_1, d_2, \\dots, d_n\\}$ dan himpunan kata kunci unik $\\mathcal{K} = \\{k_1, k_2, \\dots, k_m\\}$.\n\nMatriks insidensi dokumen-kata kunci $\\mathbf{A} \\in \\{0, 1\\}^{n \\times m}$:\n$$A_{i,j} = \\begin{cases} 1, & \\text{jika } k_j \\in d_i \\\\ 0, & \\text{lainnya} \\end{cases}$$\n\nMatriks simetris ko-okurensi kata kunci $\\mathbf{C} \\in \\mathbb{N}^{m \\times m}$:\n$$\\mathbf{C} = \\mathbf{A}^T \\mathbf{A}$$\n\nDi mana elemen diagonal $C_{j,j}$ menyatakan frekuensi total kemunculan kata kunci $k_j$, dan elemen non-diagonal $C_{j,l}$ menyatakan frekuensi kemunculan bersama kata kunci $k_j$ dan $k_l$.\n\nNormalisasi kekuatan asosiasi (*Association Strength*):\n$$S(k_j, k_l) = \\frac{C_{j,l}}{C_{j,j} \\cdot C_{l,l}}$$",
    "workedExample": {
      "problemStatement": "Diberikan 3 artikel dengan kata kunci sebagai berikut: d1 = {LiDAR, SLAM}, d2 = {SLAM, Deep Learning}, d3 = {LiDAR, SLAM, Deep Learning}. Hitung matriks ko-okurensi kata kunci dan tentukan kata kunci dengan derajat sentralitas tertinggi.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi kata kunci unik: K1=LiDAR, K2=SLAM, K3=Deep Learning.",
        "Langkah 2: Hitung frekuensi diagonal: C11 = 2 (d1, d3); C22 = 3 (d1, d2, d3); C33 = 2 (d2, d3).",
        "Langkah 3: Hitung frekuensi ko-okurensi non-diagonal: C12 = 2 (d1, d3); C13 = 1 (d3); C23 = 2 (d2, d3).",
        "Langkah 4: Hitung derajat bobot graf (degree centrality): K1: 2+1=3; K2: 2+2=4; K3: 1+2=3."
      ],
      "resultInterpretation": "Kata kunci SLAM memiliki sentralitas tertinggi (derajat 4) dan frekuensi absolut tertinggi (3), menandakan posisinya sebagai simpul penghubung utama antara domain sensorik LiDAR dan algoritma Deep Learning."
    },
    "pythonImplementation": {
      "description": "Konstruksi matriks ko-okurensi kata kunci dari daftar metadata artikel menggunakan NumPy.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Data kata kunci dari kumpulan artikel hasil ekstraksi [SIMULASI/SYNTHETIC DATA]\nkumpulan_kata_kunci = [\n    [\"LiDAR\", \"SLAM\", \"Odometry\"],\n    [\"SLAM\", \"Deep Learning\", \"Sensor Fusion\"],\n    [\"LiDAR\", \"SLAM\", \"Deep Learning\"],\n    [\"Sensor Fusion\", \"Kalman Filter\", \"Odometry\"],\n    [\"Deep Learning\", \"Transformer\", \"SLAM\"]\n]\n\n# Ekstraksi perbendaharaan kata kunci unik terurut\nvocab = sorted(list(set(k for doc in kumpulan_kata_kunci for k in doc)))\nidx_map = {word: i for i, word in enumerate(vocab)}\nm = len(vocab)\n\n# Pembentukan matriks insidensi dokumen-istilah\nA = np.zeros((len(kumpulan_kata_kunci), m), dtype=int)\nfor doc_idx, doc in enumerate(kumpulan_kata_kunci):\n    for word in doc:\n        A[doc_idx, idx_map[word]] = 1\n\n# Matriks ko-okurensi C = A^T * A\nC = np.dot(A.T, A)\n\nprint(\"Perbendaharaan Istilah:\", vocab)\nprint(f\"\\nMatriks Ko-okurensi:\")\nprint(C)\n\n# Temukan pasangan istilah dengan ko-okurensi tertinggi di luar diagonal\nnp.fill_diagonal(C, 0)\nmax_idx = np.unravel_index(np.argmax(C), C.shape)\nprint(f\"\\nPasangan terkuat: {vocab[max_idx[0]]} <-> {vocab[max_idx[1]]} (Frekuensi: {C[max_idx]})\")\n",
      "expectedOutput": "Perbendaharaan Istilah: ['Deep Learning', 'Kalman Filter', 'LiDAR', 'Odometry', 'SLAM', 'Sensor Fusion', 'Transformer']\n\nMatriks Ko-okurensi:\n[[3 0 1 0 3 1 1]\n [0 1 0 1 0 1 0]\n [1 0 2 1 2 0 0]\n [0 1 1 2 1 1 0]\n [3 0 2 1 4 1 1]\n [1 1 0 1 1 2 0]\n [1 0 0 0 1 0 1]]\n\nPasangan terkuat: Deep Learning <-> SLAM (Frekuensi: 3)"
    },
    "commonPitfalls": [
      "Tidak melakukan pembersihan teks dan lemmatisasi sehingga kata sinonim atau bentuk jamak dihitung sebagai entitas terpisah (misal: \"neural network\" dan \"neural networks\").",
      "Mengambil kesimpulan kausalitas langsung dari tingginya metrik ko-sitasi tanpa menelaah konteks kutipan naskah.",
      "Mengabaikan efek pergeseran waktu (time-lag) di mana artikel klasik secara alami mengumpulkan sitasi lebih banyak dibanding artikel baru yang mutakhir."
    ],
    "validationProcedures": [
      "Normalisasikan singkatan dan akronim teknis sebelum komputasi graf untuk menjamin integritas simpul jaringan.",
      "Validasi klaster bibliometrik dengan memeriksa keselarasan tematik dokumen yang dikelompokkan bersama."
    ],
    "exercises": [
      {
        "question": "Apa perbedaan mendasar antara analisis ko-sitasi (co-citation) dan penggabungan bibliografis (bibliographic coupling)?",
        "hint": "Perhatikan apakah relasi diukur dari artikel masa lalu atau artikel masa kini.",
        "answerExplanation": "Analisis ko-sitasi mengukur seberapa sering dua karya masa lalu dikutip bersama oleh publikasi lain di masa depan (menggambarkan perspektif penerimaan komunitas ilmiah). Sebaliknya, penggabungan bibliografis mengukur seberapa banyak daftar referensi yang sama yang digunakan oleh dua artikel masa kini (menggambarkan kesamaan fondasi metodologis saat artikel ditulis)."
      }
    ],
    "references": [
      {
        "citation": "Van Eck, N. J., & Waltman, L. (2010). Software survey: VOSviewer, a computer program for bibliometric mapping. Scientometrics, 84(2), 523-538.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Donthu, N., et al. (2021). How to conduct a bibliometric analysis: An overview and guidelines. Journal of Business Research, 133, 285-296.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Analisis Bibliometrik Dasar Menggunakan Python (bibtexparser, graf jaringan)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 1.4.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.4.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mem-parsing berkas metadata bibliografi standar (.bib atau .ris) secara komputasional.",
          "Capaian 2: Membangun matriks ko-okurensi kata kunci penulis untuk mendeteksi klaster tematik riset.",
          "Capaian 3: Memvisualisasikan struktur jaringan sitasi menggunakan pemodelan graf berbobot."
        ],
        "keyFormulaOrDiagram": "$$A_{i,j} = \\begin{cases} 1, & \\text{jika } k_j \\in d_i \\\\ 0, & \\text{lainnya} \\end{cases}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 1.4.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Analisis Bibliometrik Dasar Menggunakan Python (bibtexparser, graf jaringan)",
        "lead": "Analisis bibliometrik adalah penerapan metode kuantitatif dan statistik terhadap data kepustakaan untuk memetakan struktur intelektual suatu bidang keilmuan.",
        "bulletPoints": [
          "Melalui pendekatan komputasional, peneliti dapat menganalisis ratusan hingga ribuan artikel secara obyektif, menghindari keterbatasan kapasitas pembacaan manual.",
          "Dua bentuk pemetaan bibliometrik utama meliputi: 1.",
          "Analisis Ko-okurensi Kata Kunci (Keyword Co-occurrence Analysis): Mengukur frekuensi kemunculan bersama dua kata kunci dalam satu artikel."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Dengan memanfaatkan bahasa pemrograman Python dan struktur data graf, peneliti dapat menghitung ukuran sentralitas simpul untuk mengidentifikasi artikel kunci yang berperan sebagai jembatan pengetahuan antar-disiplin.",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Diberikan korpus dokumen $\\mathcal{D} = \\{d_1, d_2, \\dots, d_n\\}$ dan himpunan kata kunci unik $\\mathcal{K} = \\{k_1, k_2, \\dots, k_m\\}$.",
        "bulletPoints": [
          "Matriks insidensi dokumen-kata kunci $\\mathbf{A} \\in \\{0, 1\\}^{n \\times m}$:",
          "Matriks simetris ko-okurensi kata kunci $\\mathbf{C} \\in \\mathbb{N}^{m \\times m}$:",
          "Di mana elemen diagonal $C_{j,j}$ menyatakan frekuensi total kemunculan kata kunci $k_j$, dan elemen non-diagonal $C_{j,l}$ menyatakan frekuensi kemunculan bersama kata kunci $k_j$ dan $k_l$."
        ],
        "keyFormulaOrDiagram": "$$A_{i,j} = \\begin{cases} 1, & \\text{jika } k_j \\in d_i \\\\ 0, & \\text{lainnya} \\end{cases}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan 3 artikel dengan kata kunci sebagai berikut: d1 = {LiDAR, SLAM}, d2 = {SLAM, Deep Learning}, d3 = {LiDAR, SLAM, Deep Learning}. Hitung matriks ko-okurensi kata kunci dan tentukan kata kunci dengan derajat sentralitas tertinggi.",
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
          "Langkah 1: Identifikasi kata kunci unik: K1=LiDAR, K2=SLAM, K3=Deep Learning.",
          "Langkah 2: Hitung frekuensi diagonal: C11 = 2 (d1, d3); C22 = 3 (d1, d2, d3); C33 = 2 (d2, d3)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung frekuensi ko-okurensi non-diagonal: C12 = 2 (d1, d3); C13 = 1 (d3); C23 = 2 (d2, d3).",
          "Langkah 4: Hitung derajat bobot graf (degree centrality): K1: 2+1=3; K2: 2+2=4; K3: 1+2=3.",
          "[result: Interpretasi Ilmiah] Kata kunci SLAM memiliki sentralitas tertinggi (derajat 4) dan frekuensi absolut tertinggi (3), menandakan posisinya sebagai simpul penghubung utama antara domain sensorik LiDAR dan algoritma Deep Learning."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Konstruksi matriks ko-okurensi kata kunci dari daftar metadata artikel menggunakan NumPy.",
        "bulletPoints": [
          "Tujuan Algoritma: Konstruksi matriks ko-okurensi kata kunci dari daftar metadata artikel menggunakan NumPy.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: Perbendaharaan Istilah: ['Deep Learning', 'Kalman Filter', 'LiDAR', 'Odometry', 'SLAM', 'Sensor Fusion', 'Transformer']"
        ],
        "keyFormulaOrDiagram": "Perbendaharaan Istilah: ['Deep Learning', 'Kalman Filter', 'LiDAR', 'Odometry', 'SLAM', 'Sensor Fusion', 'Transformer']\n\nMatriks Ko-okurensi:\n[[3 0 1 0 3 1 1]\n [0 1 0 1 0 1 0]",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Tidak melakukan pembersihan teks dan lemmatisasi sehingga kata sinonim atau bentuk jamak dihitung sebagai entitas terpisah (misal: \"neural network\" dan \"neural networks\").",
          "[warning: Perangkap] Mengambil kesimpulan kausalitas langsung dari tingginya metrik ko-sitasi tanpa menelaah konteks kutipan naskah.",
          "[warning: Perangkap] Mengabaikan efek pergeseran waktu (time-lag) di mana artikel klasik secara alami mengumpulkan sitasi lebih banyak dibanding artikel baru yang mutakhir."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Normalisasikan singkatan dan akronim teknis sebelum komputasi graf untuk menjamin integritas simpul jaringan.",
          "Prosedur: Validasi klaster bibliometrik dengan memeriksa keselarasan tematik dokumen yang dikelompokkan bersama."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apa perbedaan mendasar antara analisis ko-sitasi (co-citation) dan penggabungan bibliografis (bibliographic coupling)?",
          "Petunjuk Analitis: Perhatikan apakah relasi diukur dari artikel masa lalu atau artikel masa kini.",
          "Solusi Kunci: Analisis ko-sitasi mengukur seberapa sering dua karya masa lalu dikutip bersama oleh publikasi lain di masa depan (menggambarkan perspektif penerimaan komunitas ilmiah). Sebaliknya, penggabungan bibliografis mengukur seberapa banyak daftar referensi yang sama yang digunakan oleh dua artikel masa kini (menggambarkan kesamaan fondasi metodologis saat artikel ditulis)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "1.4.3": {
    "id": "1.4.3",
    "chapterId": "CH-04",
    "title": "Identifikasi Bias Publikasi dan Keterbatasan Metodologis Literatur Eksisting",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memahami mekanisme bias publikasi (publication bias) dan efek laci berkas (file drawer effect).",
      "Mendeteksi asimetri pelaporan hasil empiris menggunakan visualisasi Funnel Plot konseptual.",
      "Mengevaluasi secara kritis ancaman validitas internal pada rancangan eksperimen literatur terdahulu."
    ],
    "content": "Dalam membaca literatur ilmiah, seorang peneliti tidak boleh berasumsi bahwa setiap artikel yang telah dipublikasikan bebas dari cacat metodologis. Komunitas riset rentan terhadap fenomena publication bias atau efek laci berkas (file drawer effect): kecenderungan jurnal ilmiah dan reviewer untuk lebih memprioritaskan artikel dengan temuan positif atau peningkatan kinerja yang spektakuler. Eksperimen yang menunjukkan hasil netral atau kegagalan metode sering kali tidak pernah diterbitkan dan tersimpan di laci meja peneliti.\n\nAkibatnya, literatur yang terbit dapat menyajikan estimasi performa algoritma atau efektivitas material yang lebih optimis dibanding performa riil di lapangan.\n\nUntuk mengevaluasi korpus literatur secara kritis, peneliti harus memeriksa:\n1. Integritas Pembagian Data: Apakah studi terdahulu melakukan pemisahan dataset secara ketat, atau terdapat kebocoran data (data leakage) yang menyebabkan akurasi tampak tinggi secara artifisial?\n2. Representativitas Benchmark: Apakah metode hanya diuji pada dataset toy benchmark berskala kecil dengan kondisi pengujian yang diidealisasi?\n3. Pelaporan Varians: Apakah hasil eksperimen disajikan dengan standar deviasi dan uji signifikansi statistik, atau hanya menampilkan satu angka metrik terbaik dari eksperimen yang beruntung?\n4. Konflik Kepentingan dan Pendanaan: Apakah terdapat potensi bias komersial dari pihak sponsor yang mendanai riset?",
    "mathematicalFoundations": "Uji asimetri Funnel Plot untuk mendeteksi bias publikasi dapat dimodelkan secara statistik melalui regresi linier Egger:\n\n$$\\frac{\\hat{\\theta}_i}{\\text{SE}_i} = \\beta_0 + \\beta_1 \\left( \\frac{1}{\\text{SE}_i} \\right) + \\epsilon_i$$\n\nDi mana $\\hat{\\theta}_i$ adalah ukuran efek (effect size) yang dilaporkan studi ke-$i$, $\\text{SE}_i$ adalah galat baku (standard error), $\\beta_1$ mengestimasi ukuran efek gabungan yang terkoreksi presisi, dan intersep $\\beta_0$ mengukur derajat asimetri bias publikasi.\n\nJika $\\beta_0 = 0$, corong plot simetris (tidak terdapat indikasi bias publikasi sistematis). Jika $\\beta_0 \\neq 0$ secara signifikan ($p < 0.05$), terdapat indikasi kuat hilangnya studi berskala kecil dengan temuan netral.",
    "workedExample": {
      "problemStatement": "Sebuah tinjauan terhadap 10 publikasi sistem pengendali adaptif menunjukkan bahwa studi dengan ukuran sampel pengujian kecil (SE besar) selalu melaporkan efisiensi energi di atas 25%, sementara studi dengan sampel pengujian besar (SE kecil) melaporkan efisiensi rata-rata hanya 8%. Bagaimana peneliti menyimpulkan fenomena ini?",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi hubungan antara galat baku (ketidakpastian estimasi) dan besaran efek yang dilaporkan.",
        "Langkah 2: Amati bahwa tidak ada satu pun studi kecil yang melaporkan efisiensi rendah (< 10%). Pada distribusi wajar tanpa bias, studi kecil seharusnya tersebar merata di kedua sisi nilai rata-rata sejati.",
        "Langkah 3: Hitung intersep asimetri Egger konseptual yang menghasilkan intersep positif signifikan.",
        "Langkah 4: Simpulkan bahwa korpus literatur kemungkinan besar mengalami publication bias: studi kecil dengan hasil performa rendah tidak dikirimkan untuk dipublikasikan."
      ],
      "resultInterpretation": "Ekspektasi realistis untuk efisiensi sistem harus didasarkan pada temuan studi berskala besar (sekitar 8%), bukan pada klaim ekstrem dari studi bersampel kecil."
    },
    "pythonImplementation": {
      "description": "Simulasi deteksi asimetri funnel plot menggunakan perhitungan deviasi efek rata-rata.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Data efek efisiensi (%) dan standard error dari 8 studi [SIMULASI/SYNTHETIC DATA]\nstudi = [\n    {\"nama\": \"S1\", \"efek\": 28.0, \"se\": 4.5},\n    {\"nama\": \"S2\", \"efek\": 25.5, \"se\": 4.0},\n    {\"nama\": \"S3\", \"efek\": 22.0, \"se\": 3.2},\n    {\"nama\": \"S4\", \"efek\": 18.0, \"se\": 2.5},\n    {\"nama\": \"S5\", \"efek\": 12.0, \"se\": 1.5},\n    {\"nama\": \"S6\", \"efek\": 9.5,  \"se\": 1.0},\n    {\"nama\": \"S7\", \"efek\": 8.5,  \"se\": 0.8},\n    {\"nama\": \"S8\", \"efek\": 8.0,  \"se\": 0.7},\n]\n\nefek_arr = np.array([s[\"efek\"] for s in studi])\nse_arr = np.array([s[\"se\"] for s in studi])\n\n# Korelasi kualitatif antara presisi (1/se) dan nilai efek\npresisi = 1.0 / se_arr\nkorelasi = np.corrcoef(presisi, efek_arr)[0, 1]\n\nprint(f\"Korelasi Presisi vs Besaran Efek: {korelasi:.3f}\")\nif korelasi < -0.7:\n    print(\"Peringatan Kritis: Korelasi negatif sangat kuat mengindikasikan keberadaan bias publikasi (studi kecil melaporkan performa lebih tinggi secara sistematis).\")\n",
      "expectedOutput": "Korelasi Presisi vs Besaran Efek: -0.963\nPeringatan Kritis: Korelasi negatif sangat kuat mengindikasikan keberadaan bias publikasi (studi kecil melaporkan performa lebih tinggi secara sistematis)."
    },
    "commonPitfalls": [
      "Menerima klaim keunggulan performa pada artikel tanpa memeriksa apakah baseline pembanding dioptimasi secara adil (fair baseline tuning).",
      "Menyamakan ketiadaan bukti perbedaan (absence of evidence) dengan bukti ketiadaan efek (evidence of absence).",
      "Mengutip angka akurasi uji tanpa memperhatikan distribusi kelas dataset yang dapat mengalami ketimpangan ekstrem (class imbalance)."
    ],
    "validationProcedures": [
      "Periksa apakah studi terdahulu menyertakan rincian parameter hiper (hyperparameters) dan bibit acak (random seeds) untuk replikasi.",
      "Gunakan instrumen penilaian risiko bias terstruktur seperti ROBIS atau RoB 2 untuk menilai validitas internal."
    ],
    "exercises": [
      {
        "question": "Sebuah artikel mengklaim akurasi klasifikasi kerusakan mesin sebesar 99.2% pada dataset pengujian dengan komposisi 990 sampel normal dan 10 sampel rusak. Apa cacat metodologis utama dalam klaim tersebut?",
        "hint": "Perhatikan metrik dasar zero-rule classifier yang hanya memprediksi kelas mayoritas.",
        "answerExplanation": "Model yang memprediksi seluruh sampel sebagai \"normal\" secara naif tanpa belajar apa pun akan langsung memperoleh akurasi 99.0%. Metrik akurasi menyesatkan pada dataset dengan ketimpangan kelas ekstrem. Penulis seharusnya menggunakan metrik seperti Precision-Recall AUC, Balanced Accuracy, atau Matthews Correlation Coefficient (MCC)."
      }
    ],
    "references": [
      {
        "citation": "Egger, M., et al. (1997). Bias in meta-analysis detected by a simple, graphical test. BMJ, 315(7109), 629-634.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Ioannidis, J. P. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Identifikasi Bias Publikasi dan Keterbatasan Metodologis Literatur Eksisting",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 1.4.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.4.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami mekanisme bias publikasi (publication bias) dan efek laci berkas (file drawer effect).",
          "Capaian 2: Mendeteksi asimetri pelaporan hasil empiris menggunakan visualisasi Funnel Plot konseptual.",
          "Capaian 3: Mengevaluasi secara kritis ancaman validitas internal pada rancangan eksperimen literatur terdahulu."
        ],
        "keyFormulaOrDiagram": "$$\\frac{\\hat{\\theta}_i}{\\text{SE}_i} = \\beta_0 + \\beta_1 \\left( \\frac{1}{\\text{SE}_i} \\right) + \\epsilon_i$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 1.4.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Identifikasi Bias Publikasi dan Keterbatasan Metodologis Literatur Eksisting",
        "lead": "Dalam membaca literatur ilmiah, seorang peneliti tidak boleh berasumsi bahwa setiap artikel yang telah dipublikasikan bebas dari cacat metodologis.",
        "bulletPoints": [
          "Komunitas riset rentan terhadap fenomena publication bias atau efek laci berkas (file drawer effect): kecenderungan jurnal ilmiah dan reviewer untuk lebih memprioritaskan artikel dengan temuan positif atau peningkatan kinerja yang spektakuler.",
          "Eksperimen yang menunjukkan hasil netral atau kegagalan metode sering kali tidak pernah diterbitkan dan tersimpan di laci meja peneliti.",
          "Akibatnya, literatur yang terbit dapat menyajikan estimasi performa algoritma atau efektivitas material yang lebih optimis dibanding performa riil di lapangan."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Untuk mengevaluasi korpus literatur secara kritis, peneliti harus memeriksa: 1.",
        "bulletPoints": [
          "Integritas Pembagian Data: Apakah studi terdahulu melakukan pemisahan dataset secara ketat, atau terdapat kebocoran data (data leakage) yang menyebabkan akurasi tampak tinggi secara artifisial?",
          "2."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Uji asimetri Funnel Plot untuk mendeteksi bias publikasi dapat dimodelkan secara statistik melalui regresi linier Egger:",
        "bulletPoints": [
          "Di mana $\\hat{\\theta}_i$ adalah ukuran efek (effect size) yang dilaporkan studi ke-$i$, $\\text{SE}_i$ adalah galat baku (standard error), $\\beta_1$ mengestimasi ukuran efek gabungan yang terkoreksi presisi, dan intersep $\\beta_0$ mengukur derajat asimetri bias publikasi.",
          "Jika $\\beta_0 = 0$, corong plot simetris (tidak terdapat indikasi bias publikasi sistematis). Jika $\\beta_0 \\neq 0$ secara signifikan ($p < 0.05$), terdapat indikasi kuat hilangnya studi berskala kecil dengan temuan netral."
        ],
        "keyFormulaOrDiagram": "$$\\frac{\\hat{\\theta}_i}{\\text{SE}_i} = \\beta_0 + \\beta_1 \\left( \\frac{1}{\\text{SE}_i} \\right) + \\epsilon_i$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah tinjauan terhadap 10 publikasi sistem pengendali adaptif menunjukkan bahwa studi dengan ukuran sampel pengujian kecil (SE besar) selalu melaporkan efisiensi energi di atas 25%, sementara studi dengan sampel pengujian besar (SE kecil) melaporkan efisiensi rata-rata hanya 8%. Bagaimana peneliti menyimpulkan fenomena ini?",
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
          "Langkah 1: Identifikasi hubungan antara galat baku (ketidakpastian estimasi) dan besaran efek yang dilaporkan.",
          "Langkah 2: Amati bahwa tidak ada satu pun studi kecil yang melaporkan efisiensi rendah (< 10%). Pada distribusi wajar tanpa bias, studi kecil seharusnya tersebar merata di kedua sisi nilai rata-rata sejati."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung intersep asimetri Egger konseptual yang menghasilkan intersep positif signifikan.",
          "Langkah 4: Simpulkan bahwa korpus literatur kemungkinan besar mengalami publication bias: studi kecil dengan hasil performa rendah tidak dikirimkan untuk dipublikasikan.",
          "[result: Interpretasi Ilmiah] Ekspektasi realistis untuk efisiensi sistem harus didasarkan pada temuan studi berskala besar (sekitar 8%), bukan pada klaim ekstrem dari studi bersampel kecil."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi deteksi asimetri funnel plot menggunakan perhitungan deviasi efek rata-rata.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi deteksi asimetri funnel plot menggunakan perhitungan deviasi efek rata-rata.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: Korelasi Presisi vs Besaran Efek: -0.963"
        ],
        "keyFormulaOrDiagram": "Korelasi Presisi vs Besaran Efek: -0.963\nPeringatan Kritis: Korelasi negatif sangat kuat mengindikasikan keberadaan bias publikasi (studi kecil melaporkan performa lebih tinggi secara sistematis).",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menerima klaim keunggulan performa pada artikel tanpa memeriksa apakah baseline pembanding dioptimasi secara adil (fair baseline tuning).",
          "[warning: Perangkap] Menyamakan ketiadaan bukti perbedaan (absence of evidence) dengan bukti ketiadaan efek (evidence of absence).",
          "[warning: Perangkap] Mengutip angka akurasi uji tanpa memperhatikan distribusi kelas dataset yang dapat mengalami ketimpangan ekstrem (class imbalance)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Periksa apakah studi terdahulu menyertakan rincian parameter hiper (hyperparameters) dan bibit acak (random seeds) untuk replikasi.",
          "Prosedur: Gunakan instrumen penilaian risiko bias terstruktur seperti ROBIS atau RoB 2 untuk menilai validitas internal."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Sebuah artikel mengklaim akurasi klasifikasi kerusakan mesin sebesar 99.2% pada dataset pengujian dengan komposisi 990 sampel normal dan 10 sampel rusak. Apa cacat metodologis utama dalam klaim tersebut?",
          "Petunjuk Analitis: Perhatikan metrik dasar zero-rule classifier yang hanya memprediksi kelas mayoritas.",
          "Solusi Kunci: Model yang memprediksi seluruh sampel sebagai \"normal\" secara naif tanpa belajar apa pun akan langsung memperoleh akurasi 99.0%. Metrik akurasi menyesatkan pada dataset dengan ketimpangan kelas ekstrem. Penulis seharusnya menggunakan metrik seperti Precision-Recall AUC, Balanced Accuracy, atau Matthews Correlation Coefficient (MCC)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "1.4.4": {
    "id": "1.4.4",
    "chapterId": "CH-04",
    "title": "Pengelompokan Taksonomi Pendekatan Penyelesaian Masalah",
    "readingTimeMinutes": 16,
    "status": "verified",
    "learningObjectives": [
      "Membangun skema taksonomi hierarkis untuk memetakan rumpun solusi ilmiah.",
      "Mengidentifikasi titik percabangan paradigma (paradigm bifurcations) dalam literatur.",
      "Menempatkan kontribusi metodologi baru ke dalam peta taksonomi yang telah mapan."
    ],
    "content": "Sebuah kajian literatur yang matang tidak sekadar menginventarisasi apa yang telah dikerjakan orang lain, melainkan mengorganisasi keragaman solusi teknis ke dalam suatu struktur taksonomi konseptual. Taksonomi penelitian adalah sistem klasifikasi hierarkis yang mengelompokkan pendekatan-pendekatan yang memiliki kesamaan prinsip dasar mekanistik atau komputasional.\n\nMembangun taksonomi penelitian rekayasa melibatkan penentuan kriteria percabangan (branching criteria) pada setiap tingkatan:\n1. Tingkat Pertama (Paradigma Fundamental): Misalnya memisahkan antara pendekatan berbasis model analitis fisis (first-principles physics models) versus pendekatan berbasis data murni (data-driven machine learning).\n2. Tingkat Kedua (Strategi Komputasi): Pada rumpun data-driven, memisahkan antara pembelajaran terarah (supervised learning), tak terarah (unsupervised learning), dan penguatan (reinforcement learning).\n3. Tingkat Ketiga (Topologi Arsitektur): Pada rumpun supervised learning, memisahkan antara Convolutional Networks, Recurrent Architectures, dan Attention-based Transformers.\n4. Tingkat Keempat (Spesialisasi Domain): Modifikasi khusus untuk menangani batasan komputasi embedded, latensi riil, atau redundansi sensorik.\n\nDengan struktur taksonomi yang rapi, posisi relatif dari metode yang diajukan dalam penelitian kita dapat diterangkan dengan presisi kepada dewan penguji dan reviewer internasional.",
    "mathematicalFoundations": "Secara formal, taksonomi riset adalah pohon berakar $\\mathcal{T} = (\\mathcal{V}_T, \\mathcal{E}_T)$ dengan akar $r \\in \\mathcal{V}_T$ yang mewakili domain masalah universal.\n\nProperti pembagian taksonomi yang valid:\n1. Partisi Saling Lepas (Disjoint Partition):\nUntuk setiap simpul induk $u$ dengan himpunan anak $\\text{Children}(u) = \\{v_1, v_2, \\dots, v_k\\}$, ruang lingkup solusi harus saling lepas:\n$$\\text{Scope}(v_i) \\cap \\text{Scope}(v_j) = \\emptyset, \\quad \\forall i \\neq j$$\n\n2. Kelengkapan Cakupan (Exhaustive Coverage):\n$$\\bigcup_{i=1}^k \\text{Scope}(v_i) = \\text{Scope}(u)$$",
    "workedExample": {
      "problemStatement": "Rancang taksonomi 3 tingkat untuk metode inspeksi visual retak permukaan beton pada struktur infrastruktur sipil.",
      "stepByStepSolution": [
        "Langkah 1 (Akar Masalah): Inspeksi Visual Retak Beton Otomatis.",
        "Langkah 2 (Tingkat 1 - Paradigma Pemrosesan): (A) Pengolahan Citra Klasik (Digital Image Processing) vs (B) Pembelajaran Mesin Modern (Machine Learning).",
        "Langkah 3 (Tingkat 2 - Sub-pendekatan A): Pemfilteran Morfologi & Deteksi Tepi (Sobel/Canny) vs Segmentasi Ambang Batas Adaptif (Otsu/Sauvola).",
        "Langkah 4 (Tingkat 2 - Sub-pendekatan B): Klasifikasi Patch Tingkat Gambar (CNN dasar) vs Segmentasi Semantik Tingkat Piksel (U-Net/Mask R-CNN).",
        "Langkah 5 (Validasi): Pastikan setiap metode yang ada di literatur dapat ditempatkan pada salah satu daun pohon tanpa ambiguitas."
      ],
      "resultInterpretation": "Pohon taksonomi memperjelas batas antara teknik klasik yang hemat daya namun sensitif terhadap noise pencahayaan, dan teknik segmentasi semantik modern yang akurat namun membutuhkan beban komputasi tinggi."
    },
    "pythonImplementation": {
      "description": "Representasi struktur pohon taksonomi riset menggunakan struktur kamus bersarang rekursif.",
      "libraryDependencies": [],
      "code": "taksonomi_inspeksi = {\n    \"Inspeksi Visual Kerusakan\": {\n        \"Pengolahan Citra Tradisional\": {\n            \"Filter Tepi\": [\"Operator Sobel\", \"Detektor Canny\", \"Laplacian\"],\n            \"Segmentasi Ambang\": [\"Otsu Global\", \"Sauvola Lokal\", \"Niblack\"]\n        },\n        \"Pembelajaran Mesin Modern\": {\n            \"Klasifikasi Global\": [\"ResNet\", \"MobileNet\", \"EfficientNet\"],\n            \"Segmentasi Semantik\": [\"U-Net\", \"DeepLabV3+\", \"SegFormer\"]\n        }\n    }\n}\n\ndef cetak_pohon_taksonomi(cabang, kedalaman=0):\n    for kunci, nilai in cabang.items():\n        indentasi = \"  \" * kedalaman\n        if isinstance(nilai, dict):\n            print(f\"{indentasi}[Rumpun] {kunci}\")\n            cetak_pohon_taksonomi(nilai, kedalaman + 1)\n        elif isinstance(nilai, list):\n            print(f\"{indentasi}[Metode] {kunci}:\")\n            for item in nilai:\n                print(f\"{indentasi}  - {item}\")\n\ncetak_pohon_taksonomi(taksonomi_inspeksi)\n",
      "expectedOutput": "[Rumpun] Inspeksi Visual Kerusakan\n  [Rumpun] Pengolahan Citra Tradisional\n    [Metode] Filter Tepi:\n      - Operator Sobel\n      - Detektor Canny\n      - Laplacian\n    [Metode] Segmentasi Ambang:\n      - Otsu Global\n      - Sauvola Lokal\n      - Niblack\n  [Rumpun] Pembelajaran Mesin Modern\n    [Metode] Klasifikasi Global:\n      - ResNet\n      - MobileNet\n      - EfficientNet\n    [Metode] Segmentasi Semantik:\n      - U-Net\n      - DeepLabV3+\n      - SegFormer"
    },
    "commonPitfalls": [
      "Mencampurkan kriteria klasifikasi yang berbeda pada level hierarki yang sama (misal menggabungkan kriteria algoritma dengan kriteria merek perangkat keras).",
      "Menghasilkan taksonomi datar yang hanya berupa daftar panjang tanpa tingkatan abstraksi konseptual.",
      "Membuat kategori \"Lain-lain\" (Miscellaneous) yang menampung lebih dari 30% literatur karena kegagalan mendefinisikan prinsip partisi yang komprehensif."
    ],
    "validationProcedures": [
      "Uji ketahanan taksonomi dengan mengambil 10 artikel baru di luar korpus awal dan pastikan seluruhnya dapat diklasifikasikan dengan tepat.",
      "Konsultasikan struktur taksonomi dengan pakar bidang terkait untuk memverifikasi validitas batas paradigma."
    ],
    "exercises": [
      {
        "question": "Kapan sebuah metode riset baru dapat dikategorikan sebagai \"paradigma hibrida\" (hybrid paradigm) dalam taksonomi?",
        "hint": "Perhatikan integrasi fungsional dari dua prinsip yang sebelumnya terpisah pada cabang taksonomi yang berbeda.",
        "answerExplanation": "Sebuah pendekatan dikategorikan sebagai paradigma hibrida ketika metode tersebut menggabungkan dua prinsip mendasar dari cabang taksonomi yang berbeda untuk saling melengkapi kelemahan masing-masing (contoh: Physics-Informed Neural Networks / PINN, yang menyatukan pemodelan hukum diferensial fisis dengan optimasi regresi data mendalam)."
      }
    ],
    "references": [
      {
        "citation": "Bailey, K. D. (1994). Typologies and Taxonomies: An Introduction to Classification Techniques. SAGE Publications.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Uschold, M., & Gruninger, M. (1996). Ontologies: Principles, methods and applications. The Knowledge Engineering Review, 11(2), 93-136.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pengelompokan Taksonomi Pendekatan Penyelesaian Masalah",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 1.4.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.4.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membangun skema taksonomi hierarkis untuk memetakan rumpun solusi ilmiah.",
          "Capaian 2: Mengidentifikasi titik percabangan paradigma (paradigm bifurcations) dalam literatur.",
          "Capaian 3: Menempatkan kontribusi metodologi baru ke dalam peta taksonomi yang telah mapan."
        ],
        "keyFormulaOrDiagram": "$$\\text{Scope}(v_i) \\cap \\text{Scope}(v_j) = \\emptyset, \\quad \\forall i \\neq j$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 1.4.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pengelompokan Taksonomi Pendekatan Penyelesaian Masalah",
        "lead": "Sebuah kajian literatur yang matang tidak sekadar menginventarisasi apa yang telah dikerjakan orang lain, melainkan mengorganisasi keragaman solusi teknis ke dalam suatu struktur taksonomi konseptual.",
        "bulletPoints": [
          "Taksonomi penelitian adalah sistem klasifikasi hierarkis yang mengelompokkan pendekatan-pendekatan yang memiliki kesamaan prinsip dasar mekanistik atau komputasional.",
          "Membangun taksonomi penelitian rekayasa melibatkan penentuan kriteria percabangan (branching criteria) pada setiap tingkatan: 1.",
          "Tingkat Pertama (Paradigma Fundamental): Misalnya memisahkan antara pendekatan berbasis model analitis fisis (first-principles physics models) versus pendekatan berbasis data murni (data-driven machine learning)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Dengan struktur taksonomi yang rapi, posisi relatif dari metode yang diajukan dalam penelitian kita dapat diterangkan dengan presisi kepada dewan penguji dan reviewer internasional.",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Secara formal, taksonomi riset adalah pohon berakar $\\mathcal{T} = (\\mathcal{V}_T, \\mathcal{E}_T)$ dengan akar $r \\in \\mathcal{V}_T$ yang mewakili domain masalah universal.",
        "bulletPoints": [
          "Properti pembagian taksonomi yang valid:",
          "1. Partisi Saling Lepas (Disjoint Partition):",
          "Untuk setiap simpul induk $u$ dengan himpunan anak $\\text{Children}(u) = \\{v_1, v_2, \\dots, v_k\\}$, ruang lingkup solusi harus saling lepas:"
        ],
        "keyFormulaOrDiagram": "$$\\text{Scope}(v_i) \\cap \\text{Scope}(v_j) = \\emptyset, \\quad \\forall i \\neq j$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Rancang taksonomi 3 tingkat untuk metode inspeksi visual retak permukaan beton pada struktur infrastruktur sipil.",
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
          "Langkah 1 (Akar Masalah): Inspeksi Visual Retak Beton Otomatis.",
          "Langkah 2 (Tingkat 1 - Paradigma Pemrosesan): (A) Pengolahan Citra Klasik (Digital Image Processing) vs (B) Pembelajaran Mesin Modern (Machine Learning).",
          "Langkah 3 (Tingkat 2 - Sub-pendekatan A): Pemfilteran Morfologi & Deteksi Tepi (Sobel/Canny) vs Segmentasi Ambang Batas Adaptif (Otsu/Sauvola)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4 (Tingkat 2 - Sub-pendekatan B): Klasifikasi Patch Tingkat Gambar (CNN dasar) vs Segmentasi Semantik Tingkat Piksel (U-Net/Mask R-CNN).",
          "Langkah 5 (Validasi): Pastikan setiap metode yang ada di literatur dapat ditempatkan pada salah satu daun pohon tanpa ambiguitas.",
          "[result: Interpretasi Ilmiah] Pohon taksonomi memperjelas batas antara teknik klasik yang hemat daya namun sensitif terhadap noise pencahayaan, dan teknik segmentasi semantik modern yang akurat namun membutuhkan beban komputasi tinggi."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Representasi struktur pohon taksonomi riset menggunakan struktur kamus bersarang rekursif.",
        "bulletPoints": [
          "Tujuan Algoritma: Representasi struktur pohon taksonomi riset menggunakan struktur kamus bersarang rekursif.",
          "Dependensi Pustaka Ilmiah: Standard Scientific Libraries",
          "Keluaran Terverifikasi: [Rumpun] Inspeksi Visual Kerusakan"
        ],
        "keyFormulaOrDiagram": "[Rumpun] Inspeksi Visual Kerusakan\n  [Rumpun] Pengolahan Citra Tradisional\n    [Metode] Filter Tepi:\n      - Operator Sobel\n      - Detektor Canny",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Mencampurkan kriteria klasifikasi yang berbeda pada level hierarki yang sama (misal menggabungkan kriteria algoritma dengan kriteria merek perangkat keras).",
          "[warning: Perangkap] Menghasilkan taksonomi datar yang hanya berupa daftar panjang tanpa tingkatan abstraksi konseptual.",
          "[warning: Perangkap] Membuat kategori \"Lain-lain\" (Miscellaneous) yang menampung lebih dari 30% literatur karena kegagalan mendefinisikan prinsip partisi yang komprehensif."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Uji ketahanan taksonomi dengan mengambil 10 artikel baru di luar korpus awal dan pastikan seluruhnya dapat diklasifikasikan dengan tepat.",
          "Prosedur: Konsultasikan struktur taksonomi dengan pakar bidang terkait untuk memverifikasi validitas batas paradigma."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Kapan sebuah metode riset baru dapat dikategorikan sebagai \"paradigma hibrida\" (hybrid paradigm) dalam taksonomi?",
          "Petunjuk Analitis: Perhatikan integrasi fungsional dari dua prinsip yang sebelumnya terpisah pada cabang taksonomi yang berbeda.",
          "Solusi Kunci: Sebuah pendekatan dikategorikan sebagai paradigma hibrida ketika metode tersebut menggabungkan dua prinsip mendasar dari cabang taksonomi yang berbeda untuk saling melengkapi kelemahan masing-masing (contoh: Physics-Informed Neural Networks / PINN, yang menyatukan pemodelan hukum diferensial fisis dengan optimasi regresi data mendalam)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
