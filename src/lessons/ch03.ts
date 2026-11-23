import { Lesson } from '../types/curriculum';

export const CH03_LESSONS: Record<string, Partial<Lesson>> = {
  "1.3.1": {
    "id": "1.3.1",
    "chapterId": "CH-03",
    "title": "Arsitektur Basis Data Ilmiah: Indeksasi, Metadata, dan Karakteristik Repositori",
    "readingTimeMinutes": 16,
    "status": "verified",
    "learningObjectives": [
      "Membedakan cakupan kurasi dan skema metadata antara basis data sitasi ilmiah utama.",
      "Memahami mekanisme indexing, pengelompokan subjek, dan normalisasi rekaman artikel.",
      "Memilih kombinasi pangkalan data yang optimal untuk topik penelitian bidang keteknikan."
    ],
    "content": "Penelusuran literatur dalam riset ilmiah memerlukan pemahaman atas arsitektur basis data akademik. Pangkalan data ilmiah tidak sekadar berfungsi sebagai mesin pencari teks, melainkan sebagai sistem temu balik informasi (information retrieval system) terstruktur yang mengelola metadata bibliografis, relasi sitasi, dan taksonomi disiplin ilmu.\n\nDalam penelitian teknik elektro, informatika, dan ilmu komputer, peneliti menghadapi beberapa kelompok basis data:\n\n1. Basis Data Multidisiplin Terkurasi: Basis data seperti Scopus dan Web of Science (WoS) menerapkan seleksi ketat terhadap jurnal dan prosiding. Keunggulannya terletak pada keteraturan metadata, pelacakan sitasi timbal-balik, serta kalkulasi metrik sitasi yang terstandardisasi.\n2. Repositori Spesifik Disiplin: Basis data seperti IEEE Xplore dan ACM Digital Library berfokus mendalam pada domain teknologi informasi, elektronika, telekomunikasi, dan ilmu komputer teoretis. Repositori ini sering memuat standar industri, arsip konferensi internasional, dan artikel teknis mutakhir.\n3. Mesin Pengindeks Terbuka: Mesin seperti Google Scholar dan Semantic Scholar mengindeks dokumen akademik secara web-scale. Meskipun cakupannya luas, metadata sering kali memiliki duplikasi atau inkonsistensi penulisan nama penulis dan instansi.\n\nStrategi penelusuran yang tangguh tidak pernah bertumpu pada satu pangkalan data tunggal. Penggabungan minimal satu repositori multidisiplin dan satu repositori spesifik disiplin menjamin ketercakupan pustaka yang representatif.",
    "mathematicalFoundations": "Pencarian pada pangkalan data terstruktur dapat dimodelkan sebagai fungsi pemetaan dari ruang dokumen $\\mathcal{D}$ menuju subset hasil $\\mathcal{R}$:\n\n$$\\mathcal{R} = \\{ d \\in \\mathcal{D} \\mid \\text{Score}(q, d) > \\tau \\}$$\n\nDi mana $q$ adalah string kueri terstruktur, $\\text{Score}(q, d)$ adalah relevansi dokumen berbasis pencocokan metadata field, dan $\\tau$ adalah ambang batas inklusi repositori.",
    "workedExample": {
      "problemStatement": "Seorang peneliti di ITERA ingin meneliti aplikasi computer vision untuk inspeksi kerusakan permukaan panel surya. Tentukan kombinasi sumber data dan strategi segmentasi repositori yang paling efisien.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi kata kunci inti dan domain disiplin (Energi Terbarukan + Visi Komputer).",
        "Langkah 2: Pilih IEEE Xplore sebagai repositori domain rekayasa tenaga listrik dan komputasi cerdas.",
        "Langkah 3: Pilih Scopus untuk menangkap artikel interdisipliner dari jurnal material dan penginderaan jauh.",
        "Langkah 4: Terapkan filter batas tahun 5 tahun terakhir untuk aspek algoritma visi, dan 10 tahun untuk pemodelan degradasi fisik sel surya."
      ],
      "resultInterpretation": "Kombinasi IEEE Xplore dan Scopus meminimalkan peluang hilangnya literatur penting pada irisan domain elektronika daya dan kecerdasan buatan."
    },
    "pythonImplementation": {
      "description": "Menghitung estimasi overlap pustaka dari dua sumber penelusuran menggunakan koefisien Jaccard.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "def jaccard_similarity(set_a, set_b):\n    intersection = len(set_a.intersection(set_b))\n    union = len(set_a.union(set_b))\n    return intersection / union if union > 0 else 0.0\n\n# Kumpulan identifier DOI artikel hasil penelusuran dua repositori [SIMULASI/SYNTHETIC DATA]\nscopus_dois = {f\"10.1109/tpwrd.2023.{i:04d}\" for i in range(100, 220)}\nieee_dois = {f\"10.1109/tpwrd.2023.{i:04d}\" for i in range(160, 280)}\n\nsimilarity = jaccard_similarity(scopus_dois, ieee_dois)\ntotal_unik = len(scopus_dois.union(ieee_dois))\n\nprint(f\"Jumlah artikel unik gabungan: {total_unik}\")\nprint(f\"Indeks Overlap Jaccard: {similarity:.3f}\")\n",
      "expectedOutput": "Jumlah artikel unik gabungan: 180\nIndeks Overlap Jaccard: 0.333"
    },
    "commonPitfalls": [
      "Hanya mengandalkan satu mesin pencari bebas tanpa memverifikasi kelengkapan rekaman metadata resmi.",
      "Mengabaikan prosiding konferensi bereputasi tinggi pada bidang ilmu komputer yang sering memuat terobosan algoritma lebih cepat daripada jurnal.",
      "Tidak mencatat tanggal unduh dan batasan filter penelusuran secara transparan."
    ],
    "validationProcedures": [
      "Lakukan uji silang DOI antara hasil dari dua repositori berbeda untuk mengonfirmasi konsistensi pengindeksan.",
      "Validasi ketersediaan teks lengkap dan verifikasi apakah metadata penulis serta afiliasi tercatat utuh."
    ],
    "exercises": [
      {
        "question": "Mengapa pencarian pada Google Scholar sering menghasilkan jumlah dokumen yang jauh lebih besar dibanding Scopus, namun membutuhkan waktu pembersihan data yang lebih lama?",
        "hint": "Perhatikan metode seleksi indeks otomatis versus kurasi dewan editor.",
        "answerExplanation": "Google Scholar mengindeks seluruh dokumen berformat akademik di web tanpa dewan kurasi ketat, sehingga mencakup laporan teknis, tesis, preprint, dan materi non-peer-reviewed. Hal ini menghasilkan cakupan luas namun menuntut penyaringan manual ekstra."
      }
    ],
    "references": [
      {
        "citation": "Bramer, W. M., et al. (2017). Optimal database combinations for literature searches in systematic reviews. Systematic Reviews, 6(1), 245.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Falagas, M. E., et al. (2008). Comparison of PubMed, Scopus, Web of Science, and Google Scholar. The FASEB Journal, 22(2), 338-342.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Arsitektur Basis Data Ilmiah: Indeksasi, Metadata, dan...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.3.1.",
          "Capaian: Membedakan cakupan kurasi dan skema metadata antara basis data sitasi ilmiah utama.",
          "Capaian: Memahami mekanisme indexing, pengelompokan subjek, dan normalisasi rekaman artikel.",
          "Capaian: Memilih kombinasi pangkalan data yang optimal untuk topik penelitian bidang keteknikan."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{R} = \\{ d \\in \\mathcal{D} \\mid \\text{Score}(q, d) > \\tau \\}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Arsitektur Basis Data Ilmiah: Indeksasi, Metadata, dan...",
        "bulletPoints": [
          "Penelusuran literatur dalam riset ilmiah memerlukan pemahaman atas arsitektur basis data akademik. Pangkalan data ilmiah tida...",
          "Dalam penelitian teknik elektro, informatika, dan ilmu komputer, peneliti menghadapi beberapa kelompok basis data:",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "1. Basis Data Multidisiplin Terkurasi: Basis data seperti Scopus dan Web of Science (WoS)..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "1. Basis Data Multidisiplin Terkurasi: Basis data seperti Scopus dan Web of Science (WoS) menerapkan seleksi ketat terhadap j...",
          "Strategi penelusuran yang tangguh tidak pernah bertumpu pada satu pangkalan data tunggal. Penggabungan minimal satu repositor...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Pencarian pada pangkalan data terstruktur dapat dimodelkan sebagai fungsi pemetaan dari ruang dokumen $\\mathca...",
          "Di mana $q$ adalah string kueri terstruktur, $\\text{Score}(q, d)$ adalah relevansi dokumen berbasis pencocokan..."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{R} = \\{ d \\in \\mathcal{D} \\mid \\text{Score}(q, d) > \\tau \\}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Seorang peneliti di ITERA ingin meneliti aplikasi computer vision untuk inspeksi kerusakan permukaan panel surya. Tentukan kombinasi sumber...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi kata kunci inti dan domain disiplin (Energi Terbarukan + Visi Komputer).",
          "Langkah 2: Pilih IEEE Xplore sebagai repositori domain rekayasa tenaga listrik dan komputasi cerdas.",
          "Langkah 3: Pilih Scopus untuk menangkap artikel interdisipliner dari jurnal material dan penginderaan jauh.",
          "Interpretasi: Kombinasi IEEE Xplore dan Scopus meminimalkan peluang hilangnya literatur penting pada irisan domain elektronika daya da..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Terapkan filter batas tahun 5 tahun terakhir untuk aspek algoritma visi, dan 10..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Menghitung estimasi overlap pustaka dari dua sumber penelusuran menggunakan koefisien Jaccard.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: Jumlah artikel unik gabungan: 180"
        ],
        "keyFormulaOrDiagram": "Jumlah artikel unik gabungan: 180 | Indeks Overlap Jaccard: 0.333"
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Hanya mengandalkan satu mesin pencari bebas tanpa memverifikasi kelengkapan rekaman metadata resmi.",
          "Perangkap: Mengabaikan prosiding konferensi bereputasi tinggi pada bidang ilmu komputer yang sering memuat terobosan algo...",
          "Perangkap: Tidak mencatat tanggal unduh dan batasan filter penelusuran secara transparan."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Lakukan uji silang DOI antara hasil dari dua repositori berbeda untuk mengonfirmasi konsistensi pengindeksan.",
          "Prosedur: Validasi ketersediaan teks lengkap dan verifikasi apakah metadata penulis serta afiliasi tercatat utuh."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa pencarian pada Google Scholar sering menghasilkan jumlah dokumen yang jauh lebih besar dibanding Scopus, namun m...",
          "Petunjuk: Perhatikan metode seleksi indeks otomatis versus kurasi dewan editor.",
          "Solusi Kunci: Google Scholar mengindeks seluruh dokumen berformat akademik di web tanpa dewan kurasi ketat, sehingga mencakup laporan..."
        ]
      }
    ]
  },
  "1.3.2": {
    "id": "1.3.2",
    "chapterId": "CH-03",
    "title": "Perancangan Query Boolean Lanjutan dengan Wildcards dan Field Tags",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Menyusun query penelusuran kompleks berbasis aljabar Boolean (AND, OR, NOT).",
      "Memanfaatkan operator pemangkasan (wildcards) dan penelusuran kedekatan (proximity operators).",
      "Mengintegrasikan field tags spesifik (Title, Abstract, Keywords) untuk membatasi ruang pencarian secara presisi."
    ],
    "content": "Kualitas literatur yang ditemukan dalam kajian pustaka berbanding lurus dengan ketepatan formulasi kueri penelusuran. Penelusuran sederhana menggunakan satu atau dua frasa umum sering menghasilkan salah satu dari dua kegagalan ekstrem: kelebihan informasi yang tidak relevan (false positives) atau hilangnya artikel rujukan kunci (false negatives).\n\nFormulasi kueri tingkat lanjut dibangun di atas tiga pilar aljabar Boolean:\n1. Operator OR: Menggabungkan sinonim, istilah alternatif, dan variasi ejaan. Operator ini memperluas himpunan hasil (menaikkan sensitivitas atau recall).\n2. Operator AND: Menghubungkan konsep-konsep penelitian yang berbeda. Operator ini mempersempit himpunan hasil (menaikkan spesifisitas atau precision).\n3. Operator NOT: Mengecualikan domain yang tidak diinginkan. Penggunaan operator NOT harus dilakukan secara hati-hati agar tidak memotong artikel relevan secara tidak sengaja.\n\nSelain operator dasar, pemanfaatan operator pemangkasan (wildcard seperti asterisk *) memungkinkan pencarian berbagai variasi bentuk kata dasar (contoh: detect* mencakup detect, detector, detection, detecting). Field tags seperti TITLE-ABS-KEY memastikan bahwa pencarian hanya diarahkan pada bagian inti identitas artikel, menghindari kemunculan kata kunci pada daftar pustaka artikel lain.",
    "mathematicalFoundations": "Pencarian Boolean dapat dianalisis melalui teori himpunan:\n\n$$S = \\left( \\bigcup_{i=1}^n K_{1,i} \\right) \\cap \\left( \\bigcup_{j=1}^m K_{2,j} \\right) \\setminus \\left( \\bigcup_{k=1}^p K_{3,k} \\right)$$\n\nDi mana himpunan $K_{1,i}$ adalah sinonim konsep primer, $K_{2,j}$ adalah sinonim konsep sekunder, dan $K_{3,k}$ adalah terminologi pengecualian. Sensitivitas ($Se$) dan Spesifisitas ($Sp$) dinyatakan sebagai:\n\n$$Se = \\frac{|S \\cap T|}{|T|}, \\quad Sp = \\frac{|\\bar{S} \\cap \\bar{T}|}{|\\bar{T}|}$$\n\nDengan $T$ adalah himpunan seluruh artikel yang relevan di alam semesta pustaka.",
    "workedExample": {
      "problemStatement": "Rancang string query Boolean untuk topik deteksi cacat sambungan las pipa baja berbasis citra sinar-X dan pembelajaran mendalam.",
      "stepByStepSolution": [
        "Langkah 1 (Konsep Domain Objek): (\"welding\" OR \"weld joint\" OR \"welded pipeline\")",
        "Langkah 2 (Konsep Modalitas Pengujian): (\"X-ray\" OR \"radiograph*\" OR \"radiographic testing\")",
        "Langkah 3 (Konsep Algoritma/Metode): (\"deep learning\" OR \"convolutional neural network\" OR \"YOLO\" OR \"object detection\")",
        "Langkah 4 (Sintesis String Query Final): (\"welding\" OR \"weld joint\" OR \"welded pipeline\") AND (\"X-ray\" OR \"radiograph*\") AND (\"deep learning\" OR \"convolutional\" OR \"neural network\")"
      ],
      "resultInterpretation": "Query ini menyeimbangkan sensitivitas penelusuran melalui perluasan sinonim teknis dan menjaga presisi dengan mengunci irisan ketiga konsep kunci."
    },
    "pythonImplementation": {
      "description": "Simulator evaluasi string Boolean query terhadap kumpulan metadata judul artikel.",
      "libraryDependencies": [
        "re"
      ],
      "code": "import re\n\nkoleksi_judul = [\n    \"Deep Convolutional Networks for X-ray Weld Defect Classification\",\n    \"Automated Ultrasonic Pipeline Inspection Using Neural Networks\",\n    \"Radiographic Defect Detection in Steel Welds via Vision Transformers\",\n    \"Magnetic Particle Testing for Surface Cracks in Welded Structures\"\n]\n\n# Pola regex representasi query: (weld*) AND (x-ray OR radiograph*) AND (deep learning OR neural OR transformer)\npola_weld = re.compile(r\"weld\", re.IGNORECASE)\npola_modalitas = re.compile(r\"(x-ray|radiograph)\", re.IGNORECASE)\npola_metode = re.compile(r\"(deep|neural|transformer)\", re.IGNORECASE)\n\nartikel_terpilih = []\nfor judul in koleksi_judul:\n    kondisi_1 = bool(pola_weld.search(judul))\n    kondisi_2 = bool(pola_modalitas.search(judul))\n    kondisi_3 = bool(pola_metode.search(judul))\n    \n    if kondisi_1 and kondisi_2 and kondisi_3:\n        artikel_terpilih.append(judul)\n\nprint(f\"Total judul cocok: {len(artikel_terpilih)}\")\nfor t in artikel_terpilih:\n    print(f\"- {t}\")\n",
      "expectedOutput": "Total judul cocok: 2\n- Deep Convolutional Networks for X-ray Weld Defect Classification\n- Radiographic Defect Detection in Steel Welds via Vision Transformers"
    },
    "commonPitfalls": [
      "Menggunakan tanda petik dua yang tidak sesuai format standar basis data (misalnya kutip melengkung dari pengolah kata).",
      "Mengabaikan tanda kurung kelompok operasi Boolean, yang menyebabkan urutan evaluasi logika menjadi keliru.",
      "Menggunakan operator NOT untuk topik yang masih baru berkembang sehingga artikel penting tereleminasi."
    ],
    "validationProcedures": [
      "Uji query terhadap 5 artikel rujukan utama (seed papers) yang wajib ditemukan untuk memastikan query tidak terlalu sempit.",
      "Analisis 50 artikel pertama hasil query untuk memastikan rasio presisi berada di atas batas toleransi yang dapat dikelola."
    ],
    "exercises": [
      {
        "question": "Jika suatu query menghasilkan 15.000 artikel, langkah perbaikan Boolean apa yang harus diambil tanpa menghilangkan kata kunci utama?",
        "hint": "Persempit target pencarian dari seluruh teks menjadi field tertentu atau tambahkan batasan konsep spesifik.",
        "answerExplanation": "Langkah pertama adalah membatasi field pencarian hanya pada Title-Abstract-Keywords, bukan Full Text. Langkah kedua adalah menambahkan konsep pembatas operasional spesifik menggunakan operator AND."
      }
    ],
    "references": [
      {
        "citation": "Booth, A., et al. (2021). Systematic Approaches to a Successful Literature Review. SAGE Publications.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Gough, D., Oliver, S., & Thomas, J. (2017). An Introduction to Systematic Reviews. SAGE Publications.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Perancangan Query Boolean Lanjutan dengan Wildcards dan...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.3.2.",
          "Capaian: Menyusun query penelusuran kompleks berbasis aljabar Boolean (AND, OR, NOT).",
          "Capaian: Memanfaatkan operator pemangkasan (wildcards) dan penelusuran kedekatan (proximity operators).",
          "Capaian: Mengintegrasikan field tags spesifik (Title, Abstract, Keywords) untuk membatasi ruang pencarian secara presis..."
        ],
        "keyFormulaOrDiagram": "$$S = \\left( \\bigcup_{i=1}^n K_{1,i} \\right) \\cap \\left( \\bigcup_{j=1}^m K_{2,j} \\right) \\setminus \\left( \\bigcup_{k=1}^p K_{3,k} \\right)$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Perancangan Query Boolean Lanjutan dengan Wildcards dan...",
        "bulletPoints": [
          "Kualitas literatur yang ditemukan dalam kajian pustaka berbanding lurus dengan ketepatan formulasi kueri penelusuran. Penelus...",
          "Formulasi kueri tingkat lanjut dibangun di atas tiga pilar aljabar Boolean: 1. Operator OR: Menggabungkan sinonim, istilah al...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Selain operator dasar, pemanfaatan operator pemangkasan (wildcard seperti asterisk *) memu..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Selain operator dasar, pemanfaatan operator pemangkasan (wildcard seperti asterisk *) memungkinkan pencarian berbagai variasi...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Pencarian Boolean dapat dianalisis melalui teori himpunan:",
          "Di mana himpunan $K_{1,i}$ adalah sinonim konsep primer, $K_{2,j}$ adalah sinonim konsep sekunder, dan $K_{3,k...",
          "Dengan $T$ adalah himpunan seluruh artikel yang relevan di alam semesta pustaka."
        ],
        "keyFormulaOrDiagram": "$$S = \\left( \\bigcup_{i=1}^n K_{1,i} \\right) \\cap \\left( \\bigcup_{j=1}^m K_{2,j} \\right) \\setminus \\left( \\bigcup_{k=1}^p K_{3,k} \\right)$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Rancang string query Boolean untuk topik deteksi cacat sambungan las pipa baja berbasis citra sinar-X dan pembelajaran mendalam.",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Konsep Domain Objek): (\"welding\" OR \"weld joint\" OR \"welded pipeline\")",
          "Langkah 2 (Konsep Modalitas Pengujian): (\"X-ray\" OR \"radiograph*\" OR \"radiographic testing\")",
          "Langkah 3 (Konsep Algoritma/Metode): (\"deep learning\" OR \"convolutional neural network\" OR \"YOLO\" OR \"object d...",
          "Interpretasi: Query ini menyeimbangkan sensitivitas penelusuran melalui perluasan sinonim teknis dan menjaga presisi dengan mengunci i..."
        ],
        "keyFormulaOrDiagram": "Langkah 4 (Sintesis String Query Final): (\"welding\" OR \"weld joint\" OR \"welded pipeline\")..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulator evaluasi string Boolean query terhadap kumpulan metadata judul artikel.",
          "Dependensi Pustaka: re",
          "Keluaran Diharapkan: Total judul cocok: 2"
        ],
        "keyFormulaOrDiagram": "Total judul cocok: 2 | - Deep Convolutional Networks for X-ray Weld Defect Classification..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menggunakan tanda petik dua yang tidak sesuai format standar basis data (misalnya kutip melengkung dari pengol...",
          "Perangkap: Mengabaikan tanda kurung kelompok operasi Boolean, yang menyebabkan urutan evaluasi logika menjadi keliru.",
          "Perangkap: Menggunakan operator NOT untuk topik yang masih baru berkembang sehingga artikel penting tereleminasi."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Uji query terhadap 5 artikel rujukan utama (seed papers) yang wajib ditemukan untuk memastikan query tidak ter...",
          "Prosedur: Analisis 50 artikel pertama hasil query untuk memastikan rasio presisi berada di atas batas toleransi yang dap..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Jika suatu query menghasilkan 15.000 artikel, langkah perbaikan Boolean apa yang harus diambil tanpa menghilangkan kata...",
          "Petunjuk: Persempit target pencarian dari seluruh teks menjadi field tertentu atau tambahkan batasan konsep sp...",
          "Solusi Kunci: Langkah pertama adalah membatasi field pencarian hanya pada Title-Abstract-Keywords, bukan Full Text. Langkah kedua adal..."
        ]
      }
    ]
  },
  "1.3.3": {
    "id": "1.3.3",
    "chapterId": "CH-03",
    "title": "Metodologi Penelusuran Sistematis Berbasis Pedoman PRISMA 2020",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami 4 fase alur pelaporan penelusuran sistematis PRISMA (Identifikasi, Skrining, Kelayakan, Inklusi).",
      "Menetapkan kriteria inklusi dan eksklusi secara eksplisit dan tidak ambigu.",
      "Menghasilkan diagram alir PRISMA yang memenuhi standar pelaporan ilmiah bereputasi."
    ],
    "content": "PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) adalah pedoman berbasis bukti yang dirancang untuk memastikan transparansi dan reproduksibilitas tinjauan pustaka sistematis. Dalam penelitian rekayasa dan ilmu komputer terapan, pengadopsian alur PRISMA 2020 memisahkan kajian pustaka yang terstruktur dari tinjauan naratif konvensional yang rentan terhadap bias subjektif peneliti.\n\nAlur kerja PRISMA 2020 terdiri atas empat tahapan sekuensial:\n\n1. Identifikasi (Identification): Menghimpun seluruh rekaman literatur mentah yang dihasilkan dari penelusuran pada seluruh basis data yang ditentukan, ditambah penelusuran sumber lain (laporan proyek, registri data). Pada tahap ini, seluruh duplikasi dokumen diidentifikasi dan dieliminasi.\n2. Skrining (Screening): Menilai judul dan abstrak setiap artikel berdasarkan kriteria relevansi awal. Artikel yang secara eksplisit tidak berhubungan dengan domain investigasi disisihkan.\n3. Kelayakan (Eligibility): Mengakses naskah lengkap (full-text) dari seluruh artikel yang lolos tahap skrining. Peneliti mengevaluasi naskah terhadap kriteria inklusi dan eksklusi terperinci, dengan mencatat alasan spesifik untuk setiap artikel yang dikeluarkan.\n4. Inklusi (Inclusion): Menetapkan korpus literatur final yang akan diekstraksi datanya, dianalisis metodologinya, atau disintesis dalam meta-analisis.\n\nTransparansi pencatatan angka pada setiap tahapan merupakan syarat mutlak agar penelitian pustaka dapat diaudit dan direplikasi oleh peneliti lain secara independen.",
    "mathematicalFoundations": "Konsistensi alur konservasi dokumen dalam diagram alir PRISMA dinyatakan melalui neraca kardinalitas himpunan:\n\n$$N_{\\text{identifikasi}} = N_{\\text{db1}} + N_{\\text{db2}} + \\dots + N_{\\text{dbK}}$$\n$$N_{\\text{skrining}} = N_{\\text{identifikasi}} - N_{\\text{duplikat}}$$\n$$N_{\\text{kelayakan}} = N_{\\text{skrining}} - N_{\\text{tolak-skrining}}$$\n$$N_{\\text{inklusi}} = N_{\\text{kelayakan}} - \\sum_{j=1}^m N_{\\text{eksklusi}, j}$$\n\nDi mana $N_{\\text{eksklusi}, j}$ mencatat jumlah artikel yang dikeluarkan berdasarkan alasan spesifik ke-$j$.",
    "workedExample": {
      "problemStatement": "Sebuah tinjauan sistematis tentang deteksi anomali pada smart grid menghasilkan 450 artikel dari Scopus, 380 dari IEEE Xplore, dan 120 dari Web of Science. Duplikasi otomatis mendeteksi 180 artikel ganda. Skrining judul/abstrak mengeliminasi 520 artikel yang tidak relevan. Dari artikel full-text yang diuji kelayakannya, 35 artikel tidak memiliki data empiris, 20 artikel menggunakan metrik evaluasi yang cacat, dan 15 artikel tidak tersedia full-text. Hitung jumlah artikel final yang diinklusi.",
      "stepByStepSolution": [
        "Langkah 1 (Total Identifikasi): 450 + 380 + 120 = 950 rekaman.",
        "Langkah 2 (Setelah Duplikasi): 950 - 180 = 770 rekaman untuk diskrining.",
        "Langkah 3 (Lolos Skrining Judul/Abstrak): 770 - 520 = 250 naskah teks lengkap dinilai kelayakannya.",
        "Langkah 4 (Total Eksklusi Kelayakan): 35 + 20 + 15 = 70 naskah dikeluarkan.",
        "Langkah 5 (Korpus Final yang Diinklusi): 250 - 70 = 180 artikel."
      ],
      "resultInterpretation": "Korpus riset akhir terdiri dari 180 artikel berkualitas tinggi yang siap dipetakan dalam matriks sintesis."
    },
    "pythonImplementation": {
      "description": "Program validasi neraca angka PRISMA 2020 dan verifikasi konsistensi pengurangan dokumen.",
      "libraryDependencies": [],
      "code": "class PrismaFlowTracker:\n    def __init__(self, raw_counts):\n        self.raw_counts = raw_counts\n        self.duplicates_removed = 0\n        self.screening_excluded = 0\n        self.eligibility_exclusions = {}\n\n    def remove_duplicates(self, count):\n        self.duplicates_removed = count\n\n    def screen_records(self, excluded_count):\n        self.screening_excluded = excluded_count\n\n    def add_eligibility_exclusion(self, reason, count):\n        self.eligibility_exclusions[reason] = count\n\n    def generate_summary(self):\n        total_identified = sum(self.raw_counts.values())\n        screened = total_identified - self.duplicates_removed\n        full_text_assessed = screened - self.screening_excluded\n        total_eligibility_excluded = sum(self.eligibility_exclusions.values())\n        final_included = full_text_assessed - total_eligibility_excluded\n\n        return {\n            \"Total Identified\": total_identified,\n            \"Screened\": screened,\n            \"Full-text Assessed\": full_text_assessed,\n            \"Excluded (Eligibility)\": total_eligibility_excluded,\n            \"Final Included\": final_included\n        }\n\ntracker = PrismaFlowTracker({\"IEEE\": 380, \"Scopus\": 450, \"WoS\": 120})\ntracker.remove_duplicates(180)\ntracker.screen_records(520)\ntracker.add_eligibility_exclusion(\"Tanpa data empiris\", 35)\ntracker.add_eligibility_exclusion(\"Metrik tidak standar\", 20)\ntracker.add_eligibility_exclusion(\"Teks lengkap tidak dapat diakses\", 15)\n\nringkasan = tracker.generate_summary()\nfor k, v in ringkasan.items():\n    print(f\"{k}: {v}\")\n",
      "expectedOutput": "Total Identified: 950\nScreened: 770\nFull-text Assessed: 250\nExcluded (Eligibility): 70\nFinal Included: 180"
    },
    "commonPitfalls": [
      "Tidak mencatat alasan pengeluaran artikel pada fase penilaian teks lengkap.",
      "Melakukan penyaringan subjektif tanpa kriteria inklusi dan eksklusi tertulis di awal.",
      "Ketidaksesuaian jumlah angka aritmetika antara diagram alir PRISMA dengan narasi di teks artikel."
    ],
    "validationProcedures": [
      "Gunakan protokol penilaian ganda independen (dua penilai) pada sampel 10% artikel untuk menguji reliabilitas Cohen Kappa.",
      "Lakukan audit keseimbangan angka di setiap simpul diagram alir PRISMA sebelum penulisan naskah akhir."
    ],
    "exercises": [
      {
        "question": "Mengapa kriteria eksklusi tidak boleh hanya berupa kebalikan kata demi kata dari kriteria inklusi?",
        "hint": "Kriteria inklusi mendefinisikan batasan populasi sasaran, sedangkan kriteria eksklusi menangani faktor pengganggu spesifik.",
        "answerExplanation": "Menyatakan kriteria eksklusi sekadar sebagai negasi (contoh: Inklusi: artikel berbahasa Inggris; Eksklusi: artikel bukan berbahasa Inggris) adalah redundan. Kriteria eksklusi harus menjelaskan kondisi spesifik yang menggugurkan kelayakan artikel yang sekilas memenuhi kriteria inklusi (misalnya: tidak memuat data kuantitatif primer atau menggunakan metode kalibrasi usang)."
      }
    ],
    "references": [
      {
        "citation": "Page, M. J., et al. (2021). The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ, 372, n71.",
        "type": "guideline"
      },
      {
        "citation": "Kitchenham, B., & Charters, S. (2007). Guidelines for performing Systematic Literature Reviews in Software Engineering. Keele University Technical Report.",
        "type": "guideline"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Metodologi Penelusuran Sistematis Berbasis Pedoman PRIS...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.3.3.",
          "Capaian: Memahami 4 fase alur pelaporan penelusuran sistematis PRISMA (Identifikasi, Skrining, Kelayakan, Inklusi).",
          "Capaian: Menetapkan kriteria inklusi dan eksklusi secara eksplisit dan tidak ambigu.",
          "Capaian: Menghasilkan diagram alir PRISMA yang memenuhi standar pelaporan ilmiah bereputasi."
        ],
        "keyFormulaOrDiagram": "$$N_{\\text{identifikasi}} = N_{\\text{db1}} + N_{\\text{db2}} + \\dots + N_{\\text{dbK}}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Metodologi Penelusuran Sistematis Berbasis Pedoman PRIS...",
        "bulletPoints": [
          "PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) adalah pedoman berbasis bukti yang dirancang untu...",
          "Alur kerja PRISMA 2020 terdiri atas empat tahapan sekuensial:",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "1. Identifikasi (Identification): Menghimpun seluruh rekaman literatur mentah yang dihasil..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "1. Identifikasi (Identification): Menghimpun seluruh rekaman literatur mentah yang dihasilkan dari penelusuran pada seluruh b...",
          "Transparansi pencatatan angka pada setiap tahapan merupakan syarat mutlak agar penelitian pustaka dapat diaudit dan direplika...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Konsistensi alur konservasi dokumen dalam diagram alir PRISMA dinyatakan melalui neraca kardinalitas himpunan:",
          "Di mana $N_{\\text{eksklusi}, j}$ mencatat jumlah artikel yang dikeluarkan berdasarkan alasan spesifik ke-$j$."
        ],
        "keyFormulaOrDiagram": "$$N_{\\text{identifikasi}} = N_{\\text{db1}} + N_{\\text{db2}} + \\dots + N_{\\text{dbK}}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah tinjauan sistematis tentang deteksi anomali pada smart grid menghasilkan 450 artikel dari Scopus, 380 dari IEEE Xplore, dan 120 dari...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Total Identifikasi): 450 + 380 + 120 = 950 rekaman.",
          "Langkah 2 (Setelah Duplikasi): 950 - 180 = 770 rekaman untuk diskrining.",
          "Langkah 3 (Lolos Skrining Judul/Abstrak): 770 - 520 = 250 naskah teks lengkap dinilai kelayakannya.",
          "Interpretasi: Korpus riset akhir terdiri dari 180 artikel berkualitas tinggi yang siap dipetakan dalam matriks sintesis."
        ],
        "keyFormulaOrDiagram": "Langkah 5 (Korpus Final yang Diinklusi): 250 - 70 = 180 artikel."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Program validasi neraca angka PRISMA 2020 dan verifikasi konsistensi pengurangan dokumen.",
          "Dependensi Pustaka: ",
          "Keluaran Diharapkan: Total Identified: 950"
        ],
        "keyFormulaOrDiagram": "Total Identified: 950 | Screened: 770 | Full-text Assessed: 250"
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Tidak mencatat alasan pengeluaran artikel pada fase penilaian teks lengkap.",
          "Perangkap: Melakukan penyaringan subjektif tanpa kriteria inklusi dan eksklusi tertulis di awal.",
          "Perangkap: Ketidaksesuaian jumlah angka aritmetika antara diagram alir PRISMA dengan narasi di teks artikel."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan protokol penilaian ganda independen (dua penilai) pada sampel 10% artikel untuk menguji reliabilitas C...",
          "Prosedur: Lakukan audit keseimbangan angka di setiap simpul diagram alir PRISMA sebelum penulisan naskah akhir."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa kriteria eksklusi tidak boleh hanya berupa kebalikan kata demi kata dari kriteria inklusi?",
          "Petunjuk: Kriteria inklusi mendefinisikan batasan populasi sasaran, sedangkan kriteria eksklusi menangani fakt...",
          "Solusi Kunci: Menyatakan kriteria eksklusi sekadar sebagai negasi (contoh: Inklusi: artikel berbahasa Inggris; Eksklusi: artikel bukan..."
        ]
      }
    ]
  },
  "1.3.4": {
    "id": "1.3.4",
    "chapterId": "CH-03",
    "title": "Teknik Snowballing Forward dan Backward untuk Kelengkapan Pustaka",
    "readingTimeMinutes": 16,
    "status": "verified",
    "learningObjectives": [
      "Menerapkan prosedur backward snowballing melalui pelacakan daftar referensi.",
      "Menerapkan prosedur forward snowballing memanfaatkan indeks sitasi masa kini.",
      "Menetapkan kriteria henti (stopping criteria) yang obyektif untuk mencegah eksplorasi rekursif tak terbatas."
    ],
    "content": "Penelusuran berbasis kata kunci pada basis data ilmiah sering memiliki kelemahan inheren akibat variasi terminologi ilmiah yang dinamis. Peneliti baru mungkin menggunakan istilah baru untuk konsep yang telah diteliti dua dekade sebelumnya dengan nomenklatur berbeda. Prosedur snowballing melengkapi penelusuran berbasis kueri dengan memanfaatkan topologi graf sitasi akademik.\n\nMetode snowballing diperkenalkan secara formal dalam rekayasa oleh Claes Wohlin (2014) dan terbagi menjadi dua arah:\n\n1. Backward Snowballing: Peneliti memeriksa daftar pustaka (referensi) dari artikel rujukan inti (seed papers). Tujuannya adalah melacak fondasi teoretis, data pembanding, atau instrumen pengukuran awal yang menjadi akar pengembangan metode.\n2. Forward Snowballing: Peneliti melacak seluruh artikel baru yang mensitasi artikel rujukan inti tersebut sejak tanggal publikasinya hingga saat ini. Tujuannya adalah mengidentifikasi modifikasi algoritma, sanggahan kritis, perbaikan kinerja, atau replikasi empiris terbaru.\n\nProses ini dilakukan secara iteratif dalam beberapa putaran (generasi). Namun, tanpa kriteria henti yang terdefinisi secara kuantitatif, snowballing berisiko menyebabkan penumpukan literatur yang tidak terkendali.",
    "mathematicalFoundations": "Representasi formal graf sitasi berarah $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$, dengan simpul artikel $v \\in \\mathcal{V}$ dan busur sitasi $(u, v) \\in \\mathcal{E}$ yang menandakan bahwa artikel $u$ mensitasi artikel $v$.\n\n1. Himpunan Backward Snowballing putaran ke-$k$:\n$$B^{(k)}(v) = \\{ u \\in \\mathcal{V} \\mid (v, u) \\in \\mathcal{E} \\}$$\n\n2. Himpunan Forward Snowballing putaran ke-$k$:\n$$F^{(k)}(v) = \\{ w \\in \\mathcal{V} \\mid (w, v) \\in \\mathcal{E} \\}$$\n\nKriteria Henti Konvergensi (Stopping Criterion):\nProses dihentikan ketika proporsi artikel relevan baru pada iterasi $k$ berada di bawah batas ambang:\n$$\\frac{|\\text{Candidate}^{(k)} \\cap \\text{Relevant}|}{|\\text{Candidate}^{(k)}|} < \\epsilon_{\\text{stop}}$$",
    "workedExample": {
      "problemStatement": "Dimulai dari 3 artikel rujukan inti (seed papers) tentang estimasi State of Charge (SoC) baterai berbasis Kalman Filter, dilakukan 1 putaran backward dan forward snowballing. Backward menghasilkan 60 kandidat, forward menghasilkan 45 kandidat. Setelah duplikasi antar-jalur dieliminasi dan kriteria inklusi diterapkan, berapa artikel baru yang ditambahkan jika presisi relevansi masing-masing adalah 20% dan 30%?",
      "stepByStepSolution": [
        "Langkah 1: Hitung artikel relevan dari backward snowballing: 60 * 0.20 = 12 artikel.",
        "Langkah 2: Hitung artikel relevan dari forward snowballing: 45 * 0.30 = 13.5 -> 14 artikel.",
        "Langkah 3: Lakukan uji tumpang tindih (overlap). Ditemukan 4 artikel relevan yang muncul di kedua arah sekaligus.",
        "Langkah 4: Hitung penambahan artikel bersih: (12 + 14) - 4 = 22 artikel baru."
      ],
      "resultInterpretation": "Melalui 1 putaran snowballing berimbang, korpus diperkaya dengan 22 artikel penting yang tidak tertangkap oleh kueri kata kunci awal."
    },
    "pythonImplementation": {
      "description": "Simulasi alur penelusuran graf sitasi maju dan mundur untuk menghitung artikel relevan yang terisolasi.",
      "libraryDependencies": [],
      "code": "def simulasi_snowballing(seed_papers, sitasi_graf, referensi_graf):\n    backward_kandidat = set()\n    forward_kandidat = set()\n\n    for p in seed_papers:\n        # Backward: telusuri referensi yang disitasi oleh p\n        backward_kandidat.update(referensi_graf.get(p, []))\n        # Forward: telusuri artikel yang mensitasi p\n        forward_kandidat.update(sitasi_graf.get(p, []))\n\n    total_unik = (backward_kandidat.union(forward_kandidat)) - set(seed_papers)\n    irisan = backward_kandidat.intersection(forward_kandidat)\n\n    return {\n        \"Backward Count\": len(backward_kandidat),\n        \"Forward Count\": len(forward_kandidat),\n        \"Irisan Maju-Mundur\": len(irisan),\n        \"Kandidat Baru Total\": len(total_unik)\n    }\n\n# Mock graf sitasi\nsitasi_data = {\n    \"P1\": [\"A1\", \"A2\", \"A3\"],\n    \"P2\": [\"A2\", \"A4\", \"A5\"],\n}\nreferensi_data = {\n    \"P1\": [\"R1\", \"R2\", \"A2\"],\n    \"P2\": [\"R2\", \"R3\"],\n}\n\nhasil = simulasi_snowballing([\"P1\", \"P2\"], sitasi_data, referensi_data)\nfor k, v in hasil.items():\n    print(f\"{k}: {v}\")\n",
      "expectedOutput": "Backward Count: 4\nForward Count: 5\nIrisan Maju-Mundur: 1\nKandidat Baru Total: 7"
    },
    "commonPitfalls": [
      "Memilih artikel awal (seed papers) yang berkualitas rendah atau tidak representatif sehingga mengarahkan penelusuran ke cabang literatur yang salah.",
      "Melanjutkan iterasi tanpa henti hingga menjangkau artikel yang menyimpang dari fokus riset inti.",
      "Tidak menyaring artikel kandidat dengan kriteria inklusi yang sama ketatnya dengan pencarian basis data utama."
    ],
    "validationProcedures": [
      "Validasi pemilihan seed papers dengan memverifikasi bahwa artikel tersebut dipublikasikan pada jurnal bereputasi atau memiliki indeks sitasi signifikan.",
      "Lakukan pengujian konvergensi: jika iterasi baru tidak lagi menghasilkan artikel relevan, hentikan penelusuran."
    ],
    "exercises": [
      {
        "question": "Kapan teknik forward snowballing paling berguna dibanding backward snowballing?",
        "hint": "Pertimbangkan faktor usia artikel rujukan awal dan dinamika perkembangan teknologi.",
        "answerExplanation": "Forward snowballing sangat berguna ketika peneliti memiliki artikel dasar (landmark paper) yang sudah terbit beberapa tahun lalu dan ingin mengetahui bagaimana teknologi atau model matematika dalam artikel tersebut telah dimodifikasi, dioptimalkan, atau diuji ulang oleh komunitas ilmiah terkini."
      }
    ],
    "references": [
      {
        "citation": "Wohlin, C. (2014). Guidelines for snowballing in systematic literature studies and a replication in software engineering. In Proceedings of EASE 2014, 1-10.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Jalali, S., & Wohlin, C. (2012). Systematic review versus snowballing: A forward snowballing study. In ESEM 2012, 29-38.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Teknik Snowballing Forward dan Backward untuk Kelengkap...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.3.4.",
          "Capaian: Menerapkan prosedur backward snowballing melalui pelacakan daftar referensi.",
          "Capaian: Menerapkan prosedur forward snowballing memanfaatkan indeks sitasi masa kini.",
          "Capaian: Menetapkan kriteria henti (stopping criteria) yang obyektif untuk mencegah eksplorasi rekursif tak terbatas."
        ],
        "keyFormulaOrDiagram": "$$B^{(k)}(v) = \\{ u \\in \\mathcal{V} \\mid (v, u) \\in \\mathcal{E} \\}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Teknik Snowballing Forward dan Backward untuk Kelengkap...",
        "bulletPoints": [
          "Penelusuran berbasis kata kunci pada basis data ilmiah sering memiliki kelemahan inheren akibat variasi terminologi ilmiah ya...",
          "Metode snowballing diperkenalkan secara formal dalam rekayasa oleh Claes Wohlin (2014) dan terbagi menjadi dua arah:",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "1. Backward Snowballing: Peneliti memeriksa daftar pustaka (referensi) dari artikel rujuka..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "1. Backward Snowballing: Peneliti memeriksa daftar pustaka (referensi) dari artikel rujukan inti (seed papers). Tujuannya ada...",
          "Proses ini dilakukan secara iteratif dalam beberapa putaran (generasi). Namun, tanpa kriteria henti yang terdefinisi secara k...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Representasi formal graf sitasi berarah $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$, dengan simpul artikel $v \\...",
          "1. Himpunan Backward Snowballing putaran ke-$k$:",
          "2. Himpunan Forward Snowballing putaran ke-$k$:"
        ],
        "keyFormulaOrDiagram": "$$B^{(k)}(v) = \\{ u \\in \\mathcal{V} \\mid (v, u) \\in \\mathcal{E} \\}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Dimulai dari 3 artikel rujukan inti (seed papers) tentang estimasi State of Charge (SoC) baterai berbasis Kalman Filter, dilakukan 1 putaran...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Hitung artikel relevan dari backward snowballing: 60 * 0.20 = 12 artikel.",
          "Langkah 2: Hitung artikel relevan dari forward snowballing: 45 * 0.30 = 13.5 -> 14 artikel.",
          "Langkah 3: Lakukan uji tumpang tindih (overlap). Ditemukan 4 artikel relevan yang muncul di kedua arah sekalig...",
          "Interpretasi: Melalui 1 putaran snowballing berimbang, korpus diperkaya dengan 22 artikel penting yang tidak tertangkap oleh kueri kat..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Hitung penambahan artikel bersih: (12 + 14) - 4 = 22 artikel baru."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi alur penelusuran graf sitasi maju dan mundur untuk menghitung artikel relevan yang terisolasi.",
          "Dependensi Pustaka: ",
          "Keluaran Diharapkan: Backward Count: 4"
        ],
        "keyFormulaOrDiagram": "Backward Count: 4 | Forward Count: 5 | Irisan Maju-Mundur: 1"
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Memilih artikel awal (seed papers) yang berkualitas rendah atau tidak representatif sehingga mengarahkan penel...",
          "Perangkap: Melanjutkan iterasi tanpa henti hingga menjangkau artikel yang menyimpang dari fokus riset inti.",
          "Perangkap: Tidak menyaring artikel kandidat dengan kriteria inklusi yang sama ketatnya dengan pencarian basis data utama."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Validasi pemilihan seed papers dengan memverifikasi bahwa artikel tersebut dipublikasikan pada jurnal bereputa...",
          "Prosedur: Lakukan pengujian konvergensi: jika iterasi baru tidak lagi menghasilkan artikel relevan, hentikan penelusuran..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Kapan teknik forward snowballing paling berguna dibanding backward snowballing?",
          "Petunjuk: Pertimbangkan faktor usia artikel rujukan awal dan dinamika perkembangan teknologi.",
          "Solusi Kunci: Forward snowballing sangat berguna ketika peneliti memiliki artikel dasar (landmark paper) yang sudah terbit beberapa ta..."
        ]
      }
    ]
  }
};
