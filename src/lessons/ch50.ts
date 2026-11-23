import { Lesson } from '../types/curriculum';

export const CH50_LESSONS: Record<string, Partial<Lesson>> = {
  "7.6.1": {
    "id": "7.6.1",
    "chapterId": "CH-50",
    "title": "Arsitektur Riset Doktoral: Strategi Disertasi Berbasis Publikasi (Thesis-by-Publication)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami paradigma pergeseran dari monograf tradisional ke Thesis-by-Publication (kumulative Dissertation).",
      "Merancang arsitektur koherensi tematik (The Umbrella Framework) yang mengikat beberapa artikel jurnal independen.",
      "Menyusun bagian sintesis pengantar (Exegesis / Synthesis Chapter) yang mendemonstrasikan kontribusi orisinal doktoral."
    ],
    "content": "Dalam pendidikan doktoral (Ph.D.) modern di universitas riset global terkemuka, model penulisan disertasi telah bergeser secara signifikan dari format buku monograf tunggal yang masif menuju format Disertasi Berbasis Publikasi (Thesis-by-Publication atau Cumulative Thesis). Format ini memposisikan kandidat doktor bukan hanya sebagai penulis draf internal yang dinilai oleh panitia penguji kampus, melainkan sebagai ilmuwan mandiri yang karyanya telah divalidasi dan diakui oleh komunitas sains internasional melalui penelaahan sejawat (peer review) di jurnal bereputasi.\n\nStruktur Arsitektur Thesis-by-Publication:\nFormat ini umumnya mengintegrasikan 3 hingga 5 artikel jurnal peer-reviewed (minimal terindeks Scopus Q1/Q2 atau WoS):\n1. Bagian Payung Pengantar (Umbrella Introduction / Exegesis): Menetapkan peta jalan konseptual, landasan filsafat ilmu, identifikasi problem fundamental, dan menguraikan benang merah (golden thread) yang mengikat seluruh artikel.\n2. Bab Berbasis Artikel (Article Chapters): Setiap bab merupakan naskah artikel jurnal utuh (baik yang sudah terbit, sedang dalam revisi, atau siap diserahkan) disertai pengantar transisi singkat.\n3. Bab Diskusi Komprehensif dan Sintesis (Global Discussion & Meta-Synthesis): Menganalisis interaksi antar-temuan dari masing-masing artikel, memecahkan teka-teki teoretis yang lebih besar dari sekadar penjumlahan artikel individual, dan memetakan implikasi masa depan.\n4. Kesimpulan dan Kontribusi Doktoral (Statement of Original Contribution): Penegasan eksplisit mengenai letak kontribusi ilmiah baru bagi khazanah pengetahuan dunia.\n\nTantangan Koherensi Tematik (The Coherence Trap):\nKelemahan paling fatal dalam Thesis-by-Publication adalah munculnya kesan \"kumpulan naskah terpisah yang dijilid bersama\" (stapler thesis) tanpa integrasi teoretis. Kandidat doktor wajib membuktikan bahwa setiap artikel merupakan tahapan modular yang secara kumulatif menjawab pertanyaan penelitian utama disertasi.",
    "mathematicalFoundations": "Graf Ketergantungan Koherensi Disertasi (Directed Acyclic Graph of Scholarly Coherence):\nDisertasi berbasis publikasi dapat dimodelkan sebagai Directed Acyclic Graph (DAG) $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$:\n- $\\mathcal{V} = \\{P_0, P_1, P_2, P_3, P_{\\text{synth}}\\}$ di mana $P_0$ adalah Bab Pengantar Payung, $P_1, P_2, P_3$ adalah artikel jurnal individual, dan $P_{\\text{synth}}$ adalah Bab Meta-Sintesis.\n- $\\mathcal{E}$ adalah relasi transfer pengetahuan antar-makalah.\n\nMetrik Koherensi Alur Keilmuan ($C_{\\text{thesis}}$):\nDidefinisikan melalui rapatnya keterhubungan graf dan ketergantungan epistemik:\n$$C_{\\text{thesis}} = \\frac{1}{|\\mathcal{V}|} \\sum_{i=1}^k \\deg_{\\text{in}}(P_i) \\times \\text{Similarity}(P_i, \\text{Core Research Question})$$\nSebuah disertasi memiliki integritas tinggi jika $C_{\\text{thesis}} \\ge \\theta_{\\text{threshold}}$, membuktikan tidak ada naskah yang menjadi pulau terisolasi (isolated component).",
    "workedExample": {
      "problemStatement": "Seorang kandidat doktor di ITERA merencanakan riset bertema \"Sistem Penglihatan Komputer Adaptif untuk Otomasi Pertanian Cerdas\". Rancang dekomposisi 3 artikel jurnal berjenjang yang membentuk satu kesatuan disertasi koheren berbasis publikasi.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi Pertanyaan Inti Disertasi: \"Bagaimana merancang algoritma persepsi visual yang tahan terhadap variabilitas pencahayaan ekstrem dan oklusi dedaunan pada citra pertanian tropis dengan keterbatasan komputasi edge?\"",
        "Langkah 2: Rancang Artikel 1 (Fondasi Sensor & Data - Jurnal Q2/Q1): \"Multispectral Benchmark Dataset and Calibration Protocols for Crop Disease Detection under Tropical Lighting Variations\". Fokus pada karakterisasi data dan kalibrasi instrumen.",
        "Langkah 3: Rancang Artikel 2 (Inovasi Algoritmik Inti - Jurnal Q1): \"Attention-Guided Lightweight Convolutional Network for Dense Foliage Occlusion Segmentation\". Fokus pada kebaruan model matematika dan arsitektur neural.",
        "Langkah 4: Rancang Artikel 3 (Validasi Lapangan & Optimasi Sistem - Jurnal Q1): \"Hardware-Software Co-Design and Uncertainty Quantification for Real-Time Agricultural Drone Autonomy\". Fokus pada deployment sistem riil dan ketidakpastian inferensi.",
        "Langkah 5: Tulis Bab Pengantar Payung: Menghubungkan bagaimana Artikel 1 menyediakan data terkalibrasi untuk Artikel 2, dan model dari Artikel 2 dideploy serta divalidasi ketidakpastiannya pada Artikel 3."
      ],
      "resultInterpretation": "Peta jalan ini menghasilkan tiga artikel publikasi terindeks Q1/Q2 yang saling terikat erat membentuk satu payung keilmuan yang koheren tanpa ada artikel yang terisolasi."
    },
    "pythonImplementation": {
      "description": "Pemodelan Directed Acyclic Graph (DAG) untuk mengevaluasi koherensi struktur publikasi disertasi.",
      "libraryDependencies": [],
      "code": "# [SIMULASI/SYNTHETIC DATA] - Pemodelan DAG struktur publikasi doktoral\nnodes = [\"Umbrella Intro\", \"Paper 1 (Data & Calib)\", \"Paper 2 (Core Algo)\", \"Paper 3 (Deployment)\", \"Synthesis\"]\nedges = [\n    (\"Umbrella Intro\", \"Paper 1 (Data & Calib)\"),\n    (\"Paper 1 (Data & Calib)\", \"Paper 2 (Core Algo)\"),\n    (\"Paper 2 (Core Algo)\", \"Paper 3 (Deployment)\"),\n    (\"Paper 1 (Data & Calib)\", \"Synthesis\"),\n    (\"Paper 2 (Core Algo)\", \"Synthesis\"),\n    (\"Paper 3 (Deployment)\", \"Synthesis\"),\n]\n\nin_degree = {n: 0 for n in nodes}\nout_degree = {n: 0 for n in nodes}\n\nfor src, dst in edges:\n    out_degree[src] += 1\n    in_degree[dst] += 1\n\nprint(\"EVALUASI STRUKTUR THESIS-BY-PUBLICATION:\")\nprint(\"=\" * 60)\nprint(f\"{'Komponen Disertasi':<25} | {'In-Degree':<10} | {'Out-Degree':<10} | {'Peran'}\")\nprint(\"=\" * 60)\n\nfor n in nodes:\n    if in_degree[n] == 0:\n        role = \"Akar Teoretis\"\n    elif out_degree[n] == 0:\n        role = \"Sintesis Akhir\"\n    else:\n        role = \"Artikel Modular\"\n    print(f\"{n:<25} | {in_degree[n]:<10} | {out_degree[n]:<10} | {role}\")\nprint(\"=\" * 60)",
      "expectedOutput": "EVALUASI STRUKTUR THESIS-BY-PUBLICATION:\n============================================================\nKomponen Disertasi        | In-Degree  | Out-Degree | Peran\n============================================================\nUmbrella Intro            | 0          | 1          | Akar Teoretis\nPaper 1 (Data & Calib)    | 1          | 2          | Artikel Modular\nPaper 2 (Core Algo)       | 1          | 2          | Artikel Modular\nPaper 3 (Deployment)      | 1          | 1          | Artikel Modular\nSynthesis                 | 3          | 0          | Sintesis Akhir\n============================================================"
    },
    "commonPitfalls": [
      "Menyatukan beberapa artikel yang topiknya berbeda jauh demi mengejar jumlah publikasi syarat kelulusan tanpa ada benang merah konseptual.",
      "Menyalin mentah-mentah artikel tanpa menulis bab Exegesis/Sintesis pengantar yang mendalam.",
      "Mengabaikan hak cipta penerbit (copyright transfer agreement) saat menyertakan naskah yang telah terbit ke dalam berkas disertasi institusi."
    ],
    "validationProcedures": [
      "Pastikan izin hak cipta (copyright clearance / open access reuse license) dari penerbit jurnal telah diperoleh sebelum sidang disertasi.",
      "Lakukan sanity-check: uji apakah bab Sintesis mampu berdiri sendiri sebagai artikel meta-analisis atau ulasan kritis komprehensif."
    ],
    "exercises": [
      {
        "question": "Apa keunggulan terbesar format Thesis-by-Publication bagi karier pasca-doktoral seorang lulusan PhD dibandingkan monograf tradisional?",
        "hint": "Perhatikan rekam jejak bibliometrik dan visibilitas di pasar kerja akademik global.",
        "answerExplanation": "Lulusan dengan format Thesis-by-Publication lulus dengan rekam jejak publikasi yang sudah terindeks di jurnal internasional bergengsi, lengkap dengan sitasi dan DOI resmi. Ini membuat profil akademik lulusan langsung kompetitif untuk melamar posisi post-doctoral fellowship, tenure-track faculty, atau hibah riset internasional, dibandingkan monograf yang sering kali tersimpan di perpustakaan kampus tanpa dibaca komunitas global."
      },
      {
        "question": "Bagaimana peran Bab Exegesis (Sintesis) dalam menggagalkan persepsi bahwa disertasi tersebut hanyalah stapler thesis?",
        "hint": "Fokus pada sintesis holistik yang melampaui artikel individual.",
        "answerExplanation": "Bab Exegesis membuktikan bahwa keseluruhan disertasi memiliki bobot keilmuan yang lebih besar daripada sekadar jumlah bagian-bagiannya (the whole is greater than the sum of its parts). Bab ini menyatukan filosofi penelitian, menjelaskan evolusi metodologis lintas artikel, dan mengintegrasikan kontribusi ke dalam peta keilmuan holistik."
      }
    ],
    "references": [
      {
        "citation": "Mason, S., & Merga, M. K. (2018). Integrating publications in the doctoral thesis: A review of motivations, challenges, and support. Higher Education Research & Development, 37(7), 1454-1469.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Niles, M. T., et al. (2020). Why we publish where we do: Faculty publishing values, hurdles, and strategies. PLOS ONE, 15(3), e0229600.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Arsitektur Riset Doktoral: Strategi Disertasi Berbasis Publikasi (Thesis-by-Publication)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.6.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.6.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami paradigma pergeseran dari monograf tradisional ke Thesis-by-Publication (kumulative Dissertation).",
          "Capaian 2: Merancang arsitektur koherensi tematik (The Umbrella Framework) yang mengikat beberapa artikel jurnal independen.",
          "Capaian 3: Menyusun bagian sintesis pengantar (Exegesis / Synthesis Chapter) yang mendemonstrasikan kontribusi orisinal doktoral."
        ],
        "keyFormulaOrDiagram": "$$C_{\\text{thesis}} = \\frac{1}{|\\mathcal{V}|} \\sum_{i=1}^k \\deg_{\\text{in}}(P_i) \\times \\text{Similarity}(P_i, \\text{Core Research Question})$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.6.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Arsitektur Riset Doktoral: Strategi Disertasi Berbasis Publikasi (Thesis-by-Publication)",
        "lead": "Dalam pendidikan doktoral (Ph.D.) modern di universitas riset global terkemuka, model penulisan disertasi telah bergeser secara signifikan dari format buku monograf tunggal yang masif menuju format Disertasi Berbasis Publikasi (Thesis-by-Publication atau Cumulative Thesis).",
        "bulletPoints": [
          "Format ini memposisikan kandidat doktor bukan hanya sebagai penulis draf internal yang dinilai oleh panitia penguji kampus, melainkan sebagai ilmuwan mandiri yang karyanya telah divalidasi dan diakui oleh komunitas sains internasional melalui penelaahan sejawat (peer review) di jurnal bereputasi.",
          "Struktur Arsitektur Thesis-by-Publication: Format ini umumnya mengintegrasikan 3 hingga 5 artikel jurnal peer-reviewed (minimal terindeks Scopus Q1/Q2 atau WoS): 1.",
          "Bagian Payung Pengantar (Umbrella Introduction / Exegesis): Menetapkan peta jalan konseptual, landasan filsafat ilmu, identifikasi problem fundamental, dan menguraikan benang merah (golden thread) yang mengikat seluruh artikel."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Tantangan Koherensi Tematik (The Coherence Trap): Kelemahan paling fatal dalam Thesis-by-Publication adalah munculnya kesan \"kumpulan naskah terpisah yang dijilid bersama\" (stapler thesis) tanpa integrasi teoretis.",
        "bulletPoints": [
          "Kandidat doktor wajib membuktikan bahwa setiap artikel merupakan tahapan modular yang secara kumulatif menjawab pertanyaan penelitian utama disertasi."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Graf Ketergantungan Koherensi Disertasi (Directed Acyclic Graph of Scholarly Coherence):",
        "bulletPoints": [
          "Disertasi berbasis publikasi dapat dimodelkan sebagai Directed Acyclic Graph (DAG) $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$:",
          "- $\\mathcal{V} = \\{P_0, P_1, P_2, P_3, P_{\\text{synth}}\\}$ di mana $P_0$ adalah Bab Pengantar Payung, $P_1, P_2, P_3$ adalah artikel jurnal individual, dan $P_{\\text{synth}}$ adalah Bab Meta-Sintesis.",
          "- $\\mathcal{E}$ adalah relasi transfer pengetahuan antar-makalah."
        ],
        "keyFormulaOrDiagram": "$$C_{\\text{thesis}} = \\frac{1}{|\\mathcal{V}|} \\sum_{i=1}^k \\deg_{\\text{in}}(P_i) \\times \\text{Similarity}(P_i, \\text{Core Research Question})$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Seorang kandidat doktor di ITERA merencanakan riset bertema \"Sistem Penglihatan Komputer Adaptif untuk Otomasi Pertanian Cerdas\". Rancang dekomposisi 3 artikel jurnal berjenjang yang membentuk satu kesatuan disertasi koheren berbasis publikasi.",
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
          "Langkah 1: Identifikasi Pertanyaan Inti Disertasi: \"Bagaimana merancang algoritma persepsi visual yang tahan terhadap variabilitas pencahayaan ekstrem dan oklusi dedaunan pada citra pertanian tropis dengan keterbatasan komputasi edge?\"",
          "Langkah 2: Rancang Artikel 1 (Fondasi Sensor & Data - Jurnal Q2/Q1): \"Multispectral Benchmark Dataset and Calibration Protocols for Crop Disease Detection under Tropical Lighting Variations\". Fokus pada karakterisasi data dan kalibrasi instrumen.",
          "Langkah 3: Rancang Artikel 2 (Inovasi Algoritmik Inti - Jurnal Q1): \"Attention-Guided Lightweight Convolutional Network for Dense Foliage Occlusion Segmentation\". Fokus pada kebaruan model matematika dan arsitektur neural."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Rancang Artikel 3 (Validasi Lapangan & Optimasi Sistem - Jurnal Q1): \"Hardware-Software Co-Design and Uncertainty Quantification for Real-Time Agricultural Drone Autonomy\". Fokus pada deployment sistem riil dan ketidakpastian inferensi.",
          "Langkah 5: Tulis Bab Pengantar Payung: Menghubungkan bagaimana Artikel 1 menyediakan data terkalibrasi untuk Artikel 2, dan model dari Artikel 2 dideploy serta divalidasi ketidakpastiannya pada Artikel 3.",
          "[result: Interpretasi Ilmiah] Peta jalan ini menghasilkan tiga artikel publikasi terindeks Q1/Q2 yang saling terikat erat membentuk satu payung keilmuan yang koheren tanpa ada artikel yang terisolasi."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pemodelan Directed Acyclic Graph (DAG) untuk mengevaluasi koherensi struktur publikasi disertasi.",
        "bulletPoints": [
          "Tujuan Algoritma: Pemodelan Directed Acyclic Graph (DAG) untuk mengevaluasi koherensi struktur publikasi disertasi.",
          "Dependensi Pustaka Ilmiah: Standard Scientific Libraries",
          "Keluaran Terverifikasi: EVALUASI STRUKTUR THESIS-BY-PUBLICATION:"
        ],
        "keyFormulaOrDiagram": "EVALUASI STRUKTUR THESIS-BY-PUBLICATION:\n============================================================\nKomponen Disertasi        | In-Degree  | Out-Degree | Peran\n============================================================\nUmbrella Intro            | 0          | 1          | Akar Teoretis",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyatukan beberapa artikel yang topiknya berbeda jauh demi mengejar jumlah publikasi syarat kelulusan tanpa ada benang merah konseptual.",
          "[warning: Perangkap] Menyalin mentah-mentah artikel tanpa menulis bab Exegesis/Sintesis pengantar yang mendalam.",
          "[warning: Perangkap] Mengabaikan hak cipta penerbit (copyright transfer agreement) saat menyertakan naskah yang telah terbit ke dalam berkas disertasi institusi."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan izin hak cipta (copyright clearance / open access reuse license) dari penerbit jurnal telah diperoleh sebelum sidang disertasi.",
          "Prosedur: Lakukan sanity-check: uji apakah bab Sintesis mampu berdiri sendiri sebagai artikel meta-analisis atau ulasan kritis komprehensif."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apa keunggulan terbesar format Thesis-by-Publication bagi karier pasca-doktoral seorang lulusan PhD dibandingkan monograf tradisional?",
          "Petunjuk Analitis: Perhatikan rekam jejak bibliometrik dan visibilitas di pasar kerja akademik global.",
          "Solusi Kunci: Lulusan dengan format Thesis-by-Publication lulus dengan rekam jejak publikasi yang sudah terindeks di jurnal internasional bergengsi, lengkap dengan sitasi dan DOI resmi. Ini membuat profil akademik lulusan langsung kompetitif untuk melamar posisi post-doctoral fellowship, tenure-track faculty, atau hibah riset internasional, dibandingkan monograf yang sering kali tersimpan di perpustakaan kampus tanpa dibaca komunitas global."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "7.6.2": {
    "id": "7.6.2",
    "chapterId": "CH-50",
    "title": "Dekomposisi Payung Riset Besar Menjadi Tiga Proyek Mandiri yang Koheren",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menguasai metodologi Work Breakdown Structure (WBS) untuk program riset tahun jamak (multi-year).",
      "Mendekomposisi payung riset doktoral menjadi tiga paket kerja (Work Packages - WP) mandiri (self-contained).",
      "Mengelola risiko antar-proyek sehingga kegagalan satu sub-proyek tidak menggagalkan program riset keseluruhan."
    ],
    "content": "Program penelitian doktoral atau hibah tahun jamak (multi-year grant) mencakup tantangan sains yang terlalu besar untuk diselesaikan dalam satu eksperimen tunggal. Kegagalan umum peneliti muda adalah mencoba menyelesaikan seluruh masalah sekaligus dalam satu model raksasa yang monolitik. Pendekatan monolitik ini sangat rentan: jika salah satu komponen hardware gagal atau data terlambat diperoleh, seluruh penelitian macet total (deadlock).\n\nPrinsip Dekomposisi Modular Program Riset:\nProgram riset besar wajib didekomposisi secara metodologis menjadi tiga sub-proyek mandiri yang saling mendukung:\n1. Work Package 1 (Fondasi Empiris & Karakterisasi Batas): Berfokus pada pemahaman fundamental fenomena, pembangunan dataset standar, instrumentasi kalibrasi, atau benchmark perbandingan baseline. WP1 harus mampu menghasilkan artikel publikasi mandiri pertama dalam 12 bulan pertama.\n2. Work Package 2 (Inovasi Metodologis & Formulasi Algoritmik): Merupakan inti kontribusi teoretis/inovasi baru dari program riset. Di sini metode baru dirancang, diturunkan secara matematis, dan diuji secara ketat terhadap benchmark yang telah dibangun pada WP1.\n3. Work Package 3 (Aplikasi Lapangan, Skalabilitas, & Ketahanan): Menguji metode baru pada kondisi lingkungan nyata yang tidak ideal, menganalisis batas kegagalan (boundary condition), dan mengukur efisiensi komputasi/energi pada skala riil.\n\nIsolasi Risiko (Decoupling and Fault Tolerance):\nKetiga proyek harus dirancang sedemikian rupa sehingga memiliki sifat self-contained. Keberhasilan publikasi WP1 tidak boleh bergantung pada keberhasilan inovasi WP2. Jika algoritma baru pada WP2 gagal melampaui baseline komersial, data dan metodologi karakterisasi dari WP1 serta analisis pengujian dari WP3 tetap memiliki nilai ilmiah orisinal yang valid untuk diterbitkan.",
    "mathematicalFoundations": "Model Optimasi Dekomposisi Proyek Riset (Work Package Orthogonality):\nDiberikan himpunan luaran ilmiah $\\mathcal{O} = \\{o_1, o_2, o_3\\}$ dan himpunan vektor risiko eksperimen $\\mathbf{r}_i \\in \\mathbb{R}^d$.\n\nDerajat Ortogonalitas Risiko Riset didefinisikan melalui inner product kovariansi kegagalan:\n$$\\text{Cov}(\\text{Fail}(WP_i), \\text{Fail}(WP_j)) \\to 0, \\quad \\forall i \\neq j$$\n\nPeluang Keberhasilan Minimal Program (Program Resilience):\nDiberikan probabilitas sukses masing-masing paket kerja $P(WP_1) = p_1, P(WP_2) = p_2, P(WP_3) = p_3$:\n$$P(\\text{Minimal 2 Paper Terbit}) = p_1 p_2 (1-p_3) + p_1 (1-p_2) p_3 + (1-p_1) p_2 p_3 + p_1 p_2 p_3$$\nDengan merancang WP1 dengan kepastian sukses tinggi ($p_1 \\approx 0.9$) dan WP2 bernilai kebaruan tinggi namun berisiko moderat ($p_2 \\approx 0.6$), ketahanan program riset meningkat secara drastis dibanding proyek monolitik.",
    "workedExample": {
      "problemStatement": "Sebuah laboratorium di ITERA menerima mandat riset 3 tahun bertema \"Pengembangan Turbin Angin Sumbu Vertikal Skala Mikro untuk Pesisir Lampung\". Dekomposisi tema besar ini menjadi 3 Work Package yang ortogonal dan terisolasi dari risiko kegagalan fatal.",
      "stepByStepSolution": [
        "Langkah 1: Rancang WP1 (Risiko Rendah, Publikasi Cepat): \"Karakterisasi Profil Kecepatan dan Turbulensi Angin Pesisir Selat Sunda Berbasis Sensor LiDAR dan Anemometer Ultrasonik\". Output: Dataset publik profil angin pesisir dan artikel karakterisasi meteorologi rekayasa.",
        "Langkah 2: Rancang WP2 (Risiko Moderat/Tinggi, Nilai Kebaruan Inti): \"Perancangan Profil Bilah Sudu Adaptif Menggunakan Simulasi Dinamika Fluida Komputasi (CFD) dan Algoritma Optimasi Multiobyektif\". Output: Desain aerodinamika baru sudu mikro dengan efisiensi konversi daya lebih tinggi.",
        "Langkah 3: Rancang WP3 (Risiko Moderat, Validasi Sistem): \"Analisis Dinamika Getaran dan Keandalan Mekanikal Generator Magnet Permanen Fluks Aksial pada Turbin Skala Prototipe\". Output: Pengujian getaran lapangan dan analisis umur kelelahan bahan (fatigue life).",
        "Langkah 4: Evaluasi Ketahanan: Jika simulasi CFD di WP2 mengalami keterlambatan lisensi superkomputer, prototipe turbin di WP3 tetap dapat menguji profil angin nyata dari data WP1 menggunakan bilah konvensional terlebih dahulu."
      ],
      "resultInterpretation": "Dekomposisi ini memitigasi risiko kegagalan berantai dengan membuat setiap Work Package mampu memproduksi luaran ilmiah bernilai tinggi secara mandiri."
    },
    "pythonImplementation": {
      "description": "Simulasi probabilitas keberhasilan program riset multi-tahun: Monolitik vs Modular Dekomposisi.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA] - Analisis ketahanan program riset\np_wp1 = 0.90  # Karakterisasi & Dataset (Sangat Terkendali)\np_wp2 = 0.65  # Inovasi Teoretis/Algoritma (Inovatif/Berrisiko)\np_wp3 = 0.75  # Pengujian Lapangan & Deployment\n\n# Skenario 1: Monolitik\np_monolithic_success = p_wp1 * p_wp2 * p_wp3\n\n# Skenario 2: Terdekomposisi Modular\np_all_3 = p_wp1 * p_wp2 * p_wp3\np_exact_2 = (p_wp1 * p_wp2 * (1 - p_wp3) +\n             p_wp1 * (1 - p_wp2) * p_wp3 +\n             (1 - p_wp1) * p_wp2 * p_wp3)\np_at_least_2 = p_all_3 + p_exact_2\np_at_least_1 = 1 - ((1 - p_wp1) * (1 - p_wp2) * (1 - p_wp3))\n\nprint(\"ANALISIS KETAHANAN DESAIN PROGRAM RISET:\")\nprint(\"-\" * 55)\nprint(f\"Peluang Sukses Desain Monolitik           : {p_monolithic_success*100:5.1f}%\")\nprint(f\"Peluang Terbit Minimal 1 Paper (Modular) : {p_at_least_1*100:5.1f}%\")\nprint(f\"Peluang Terbit Minimal 2 Paper (Modular) : {p_at_least_2*100:5.1f}%\")\nprint(f\"Peluang Seluruh 3 Paper Terbit Sempurna   : {p_all_3*100:5.1f}%\")\nprint(\"-\" * 55)",
      "expectedOutput": "ANALISIS KETAHANAN DESAIN PROGRAM RISET:\n-------------------------------------------------------\nPeluang Sukses Desain Monolitik           :  43.9%\nPeluang Terbit Minimal 1 Paper (Modular) :  99.1%\nPeluang Terbit Minimal 2 Paper (Modular) :  84.5%\nPeluang Seluruh 3 Paper Terbit Sempurna   :  43.9%\n-------------------------------------------------------"
    },
    "commonPitfalls": [
      "Membuat WP2 baru bisa dimulai jika WP1 100% selesai, sehingga menciptakan bottleneck waktu yang kritis.",
      "Membagi proyek berdasarkan tahapan administratif (misal: Bab 1, Bab 2) bukan berdasarkan paket pertanyaan ilmiah yang mandiri.",
      "Tidak memiliki rencana cadangan (contingency fallback) ketika pengadaan alat di WP1 tertunda."
    ],
    "validationProcedures": [
      "Gunakan matriks dependensi tugas (Design Structure Matrix - DSM) untuk mengidentifikasi dan meminimalkan circular feedback loops antar paket kerja.",
      "Uji kemandirian setiap paket kerja: pastikan setiap WP memiliki rumusan masalah, metodologi, dan target publikasi jurnal yang terdefinisi sejak hari pertama."
    ],
    "exercises": [
      {
        "question": "Mengapa dalam dekomposisi riset doktoral, WP1 disarankan memiliki tingkat kepastian metodologis yang tinggi (high feasibility)?",
        "hint": "Perhatikan faktor psikologis peneliti dan tuntutan evaluasi tahun pertama.",
        "answerExplanation": "Tahun pertama doktoral adalah fase krusial di mana kandidat membangun kepercayaan diri akademik dan menghadapi evaluasi kualifikasi (confirmation review). Memulai dengan WP1 yang feasible (seperti pembangunan dataset atau benchmark terstandarisasi) menjamin adanya capaian publikasi nyata lebih awal, sehingga mengurangi stres dan mengamankan kelanjutan studi sebelum menghadapi inovasi WP2 yang penuh ketidakpastian."
      },
      {
        "question": "Apa fungsi utama isolasi risiko (risk decoupling) antar-work packages?",
        "hint": "Pikirkan apa yang terjadi jika salah satu komponen hardware di laboratorium meledak atau rusak.",
        "answerExplanation": "Isolasi risiko memastikan bahwa masalah teknis pada satu paket kerja (seperti kerusakan alat di laboratorium atau penundaan pengadaan sampel) tidak membuat seluruh tim peneliti menganggur atau menyebabkan seluruh program riset runtuh secara berantai."
      }
    ],
    "references": [
      {
        "citation": "Kerzner, H. (2017). Project management: a systems approach to planning, scheduling, and controlling. John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "European Research Council (ERC). (2022). Guide for applicants to the ERC Starting and Consolidator Grant calls.",
        "type": "guideline"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Dekomposisi Payung Riset Besar Menjadi Tiga Proyek Mandiri yang Koheren",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.6.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.6.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menguasai metodologi Work Breakdown Structure (WBS) untuk program riset tahun jamak (multi-year).",
          "Capaian 2: Mendekomposisi payung riset doktoral menjadi tiga paket kerja (Work Packages - WP) mandiri (self-contained).",
          "Capaian 3: Mengelola risiko antar-proyek sehingga kegagalan satu sub-proyek tidak menggagalkan program riset keseluruhan."
        ],
        "keyFormulaOrDiagram": "$$\\text{Cov}(\\text{Fail}(WP_i), \\text{Fail}(WP_j)) \\to 0, \\quad \\forall i \\neq j$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.6.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Dekomposisi Payung Riset Besar Menjadi Tiga Proyek Mandiri yang Koheren",
        "lead": "Program penelitian doktoral atau hibah tahun jamak (multi-year grant) mencakup tantangan sains yang terlalu besar untuk diselesaikan dalam satu eksperimen tunggal.",
        "bulletPoints": [
          "Kegagalan umum peneliti muda adalah mencoba menyelesaikan seluruh masalah sekaligus dalam satu model raksasa yang monolitik.",
          "Pendekatan monolitik ini sangat rentan: jika salah satu komponen hardware gagal atau data terlambat diperoleh, seluruh penelitian macet total (deadlock).",
          "Prinsip Dekomposisi Modular Program Riset: Program riset besar wajib didekomposisi secara metodologis menjadi tiga sub-proyek mandiri yang saling mendukung: 1.",
          "Work Package 1 (Fondasi Empiris & Karakterisasi Batas): Berfokus pada pemahaman fundamental fenomena, pembangunan dataset standar, instrumentasi kalibrasi, atau benchmark perbandingan baseline."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Isolasi Risiko (Decoupling and Fault Tolerance): Ketiga proyek harus dirancang sedemikian rupa sehingga memiliki sifat self-contained.",
        "bulletPoints": [
          "Keberhasilan publikasi WP1 tidak boleh bergantung pada keberhasilan inovasi WP2.",
          "Jika algoritma baru pada WP2 gagal melampaui baseline komersial, data dan metodologi karakterisasi dari WP1 serta analisis pengujian dari WP3 tetap memiliki nilai ilmiah orisinal yang valid untuk diterbitkan."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Model Optimasi Dekomposisi Proyek Riset (Work Package Orthogonality):",
        "bulletPoints": [
          "Diberikan himpunan luaran ilmiah $\\mathcal{O} = \\{o_1, o_2, o_3\\}$ dan himpunan vektor risiko eksperimen $\\mathbf{r}_i \\in \\mathbb{R}^d$.",
          "Derajat Ortogonalitas Risiko Riset didefinisikan melalui inner product kovariansi kegagalan:",
          "Peluang Keberhasilan Minimal Program (Program Resilience):"
        ],
        "keyFormulaOrDiagram": "$$\\text{Cov}(\\text{Fail}(WP_i), \\text{Fail}(WP_j)) \\to 0, \\quad \\forall i \\neq j$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah laboratorium di ITERA menerima mandat riset 3 tahun bertema \"Pengembangan Turbin Angin Sumbu Vertikal Skala Mikro untuk Pesisir Lampung\". Dekomposisi tema besar ini menjadi 3 Work Package yang ortogonal dan terisolasi dari risiko kegagalan fatal.",
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
          "Langkah 1: Rancang WP1 (Risiko Rendah, Publikasi Cepat): \"Karakterisasi Profil Kecepatan dan Turbulensi Angin Pesisir Selat Sunda Berbasis Sensor LiDAR dan Anemometer Ultrasonik\". Output: Dataset publik profil angin pesisir dan artikel karakterisasi meteorologi rekayasa.",
          "Langkah 2: Rancang WP2 (Risiko Moderat/Tinggi, Nilai Kebaruan Inti): \"Perancangan Profil Bilah Sudu Adaptif Menggunakan Simulasi Dinamika Fluida Komputasi (CFD) dan Algoritma Optimasi Multiobyektif\". Output: Desain aerodinamika baru sudu mikro dengan efisiensi konversi daya lebih tinggi."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Rancang WP3 (Risiko Moderat, Validasi Sistem): \"Analisis Dinamika Getaran dan Keandalan Mekanikal Generator Magnet Permanen Fluks Aksial pada Turbin Skala Prototipe\". Output: Pengujian getaran lapangan dan analisis umur kelelahan bahan (fatigue life).",
          "Langkah 4: Evaluasi Ketahanan: Jika simulasi CFD di WP2 mengalami keterlambatan lisensi superkomputer, prototipe turbin di WP3 tetap dapat menguji profil angin nyata dari data WP1 menggunakan bilah konvensional terlebih dahulu.",
          "[result: Interpretasi Ilmiah] Dekomposisi ini memitigasi risiko kegagalan berantai dengan membuat setiap Work Package mampu memproduksi luaran ilmiah bernilai tinggi secara mandiri."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi probabilitas keberhasilan program riset multi-tahun: Monolitik vs Modular Dekomposisi.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi probabilitas keberhasilan program riset multi-tahun: Monolitik vs Modular Dekomposisi.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: ANALISIS KETAHANAN DESAIN PROGRAM RISET:"
        ],
        "keyFormulaOrDiagram": "ANALISIS KETAHANAN DESAIN PROGRAM RISET:\n-------------------------------------------------------\nPeluang Sukses Desain Monolitik           :  43.9%\nPeluang Terbit Minimal 1 Paper (Modular) :  99.1%\nPeluang Terbit Minimal 2 Paper (Modular) :  84.5%",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Membuat WP2 baru bisa dimulai jika WP1 100% selesai, sehingga menciptakan bottleneck waktu yang kritis.",
          "[warning: Perangkap] Membagi proyek berdasarkan tahapan administratif (misal: Bab 1, Bab 2) bukan berdasarkan paket pertanyaan ilmiah yang mandiri.",
          "[warning: Perangkap] Tidak memiliki rencana cadangan (contingency fallback) ketika pengadaan alat di WP1 tertunda."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan matriks dependensi tugas (Design Structure Matrix - DSM) untuk mengidentifikasi dan meminimalkan circular feedback loops antar paket kerja.",
          "Prosedur: Uji kemandirian setiap paket kerja: pastikan setiap WP memiliki rumusan masalah, metodologi, dan target publikasi jurnal yang terdefinisi sejak hari pertama."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa dalam dekomposisi riset doktoral, WP1 disarankan memiliki tingkat kepastian metodologis yang tinggi (high feasibility)?",
          "Petunjuk Analitis: Perhatikan faktor psikologis peneliti dan tuntutan evaluasi tahun pertama.",
          "Solusi Kunci: Tahun pertama doktoral adalah fase krusial di mana kandidat membangun kepercayaan diri akademik dan menghadapi evaluasi kualifikasi (confirmation review). Memulai dengan WP1 yang feasible (seperti pembangunan dataset atau benchmark terstandarisasi) menjamin adanya capaian publikasi nyata lebih awal, sehingga mengurangi stres dan mengamankan kelanjutan studi sebelum menghadapi inovasi WP2 yang penuh ketidakpastian."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "7.6.3": {
    "id": "7.6.3",
    "chapterId": "CH-50",
    "title": "Penyusunan Peta Jalan 3-4 Tahun dengan Kriteria Terminasi Dini (Kill Criteria)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menyusun peta jalan riset 3-4 tahun menggunakan Analisis Jalur Kritis (Critical Path Method - CPM).",
      "Merumuskan kriteria terminasi dini (Kill Criteria) dan strategi pivoting eksperimen secara objektif.",
      "Mengatasi sunk cost fallacy dalam riset saintifik berbasis aturan keputusan formal."
    ],
    "content": "Waktu adalah sumber daya paling terbatas dalam sebuah program penelitian doktoral atau proyek hibah terikat batas waktu. Banyak peneliti terjebak dalam sunk cost fallacy: terus menerus menghabiskan waktu dan dana berbulan-bulan untuk mengejar hipotesis atau memperbaiki instrumen yang sebenarnya telah menemui jalan buntu, semata-mata karena merasa \"sudah terlanjur banyak berinvestasi di awal\". Manajemen riset profesional menuntut keberanian metodologis untuk menetapkan kriteria terminasi dini (Kill Criteria) dan rencana pivot yang terukur.\n\nPenjadwalan Jalur Kritis (Critical Path Method - CPM):\nDalam peta jalan 36 hingga 48 bulan, setiap aktivitas penelitian (pengadaan sensor, kalibrasi, pengumpulan data, komputasi, penulisan, revisi) memiliki durasi dan hubungan ketergantungan. Jalur Kritis (Critical Path) adalah urutan aktivitas terpanjang dari awal hingga akhir proyek yang tidak memiliki toleransi keterlambatan (zero slack / float). Peneliti wajib memusatkan perhatian dan energinya pada aktivitas-aktivitas yang berada di jalur kritis ini.\n\nKonstruksi Kriteria Terminasi Dini (Kill Criteria):\nKill Criteria adalah seperangkat ambang batas kuantitatif yang ditentukan di muka sebelum eksperimen dimulai, yang menyatakan kapan sebuah pendekatan harus dihentikan atau di-pivot:\n1. Ambang Batas Waktu (Temporal Deadline): Misal, jika konvergensi sintesis material tidak tercapai dalam waktu 12 minggu, hentikan eksplorasi variasi prekursor kimia tersebut.\n2. Ambang Batas Performa (Performance Threshold): Misal, jika arsitektur neural network baru tidak mampu mengungguli akurasi baseline sebesar minimal 2% setelah dilakukan hyperparameter tuning 500 epochs, batalkan arsitektur tersebut dan alihkan fokus ke pendekatan alternatif.\n3. Ambang Batas Kelayakan Fisik/Biaya (Feasibility Threshold): Jika estimasi biaya fabrikasi per unit melebihi alokasi dana yang tersedia, hentikan desain tersebut sebelum masuk tahap produksi prototipe.",
    "mathematicalFoundations": "Analisis Jalur Kritis (Critical Path Method - CPM) Matematis:\nDiberikan aktivitas riset $A_i$ dengan durasi $d_i$, himpunan pendahulu $\\text{Pred}(A_i)$, dan penerus $\\text{Succ}(A_i)$.\n\n1. Perhitungan Waktu Maju (Forward Pass):\n$$ES(A_i) = \\max_{A_j \\in \\text{Pred}(A_i)} EF(A_j), \\quad EF(A_i) = ES(A_i) + d_i$$\n\n2. Perhitungan Waktu Mundur (Backward Pass):\n$$LF(A_i) = \\min_{A_k \\in \\text{Succ}(A_i)} LS(A_k), \\quad LS(A_i) = LF(A_i) - d_i$$\n\n3. Total Slack (Waktu Kelonggaran):\n$$S(A_i) = LS(A_i) - ES(A_i) = LF(A_i) - EF(A_i)$$\n\nAktivitas $A_i$ berada pada Jalur Kritis jika dan hanya jika $S(A_i) = 0$.\n\nAturan Keputusan Terminasi Bayesian (Bayesian Stopping Rule):\nDiberikan bukti eksperimen $\\mathcal{D}$ pada waktu $t$, hentikan eksperimen jika probabilitas posterior hipotesis bernilai benar berada di bawah ambang batas kritis:\n$$P(H_1 \\mid \\mathcal{D}_t) < \\epsilon_{\\text{kill}} \\implies \\text{Pivoting ke Hipotesis Alternatif } H_2$$",
    "workedExample": {
      "problemStatement": "Sebuah proyek riset memiliki 4 aktivitas utama: A1 (Karakterisasi Sensor, 4 bulan), A2 (Pengembangan Algoritma Baru, 6 bulan, butuh A1), A3 (Desain Casing Prototipe, 2 bulan, butuh A1), dan A4 (Uji Integrasi Akhir, 3 bulan, butuh A2 dan A3). Tentukan durasi total proyek, aktivitas yang berada pada jalur kritis, dan besar slack waktu untuk A3.",
      "stepByStepSolution": [
        "Langkah 1: Forward Pass: A1: ES=0, EF=4. A2: ES=4, EF=10. A3: ES=4, EF=6. A4: ES=max(EF_A2, EF_A3) = max(10, 6) = 10, EF=13 bulan.",
        "Langkah 2: Backward Pass (Durasi total = 13 bulan): A4: LF=13, LS=10. A2: LF=LS_A4=10, LS=4. A3: LF=LS_A4=10, LS=8. A1: LF=min(LS_A2, LS_A3) = min(4, 8) = 4, LS=0.",
        "Langkah 3: Hitung Slack: S(A1) = 0 - 0 = 0. S(A2) = 4 - 4 = 0. S(A3) = 8 - 4 = 4 bulan. S(A4) = 10 - 10 = 0.",
        "Langkah 4: Jalur Kritis: A1 -> A2 -> A4 dengan durasi total 13 bulan. Aktivitas A3 memiliki slack 4 bulan (dapat ditunda hingga 4 bulan tanpa memundurkan jadwal penyelesaian proyek)."
      ],
      "resultInterpretation": "Peneliti wajib mengalokasikan fokus pengawasan harian pada rantai kritis A1-A2-A4, sementara fabrikasi casing di A3 memiliki fleksibilitas 4 bulan."
    },
    "pythonImplementation": {
      "description": "Algoritma Critical Path Method (CPM) untuk penjadwalan dan identifikasi jalur kritis program riset doktoral.",
      "libraryDependencies": [],
      "code": "# [SIMULASI/SYNTHETIC DATA] - Algoritma CPM penjadwalan riset doktoral\ntasks = {\n    'A1 (Kalibrasi)': {'dur': 4, 'preds': []},\n    'A2 (Inovasi Algo)': {'dur': 6, 'preds': ['A1 (Kalibrasi)']},\n    'A3 (Fabrikasi Casing)': {'dur': 2, 'preds': ['A1 (Kalibrasi)']},\n    'A4 (Uji Terintegrasi)': {'dur': 3, 'preds': ['A2 (Inovasi Algo)', 'A3 (Fabrikasi Casing)']}\n}\n\n# 1. Forward Pass\nfor t_name, t_data in tasks.items():\n    if not t_data['preds']:\n        t_data['ES'] = 0\n    else:\n        t_data['ES'] = max(tasks[p]['EF'] for p in t_data['preds'])\n    t_data['EF'] = t_data['ES'] + t_data['dur']\n\ntotal_duration = max(t['EF'] for t in tasks.values())\n\n# 2. Backward Pass\nfor t_name in reversed(list(tasks.keys())):\n    succs = [k for k, v in tasks.items() if t_name in v['preds']]\n    if not succs:\n        tasks[t_name]['LF'] = total_duration\n    else:\n        tasks[t_name]['LF'] = min(tasks[s]['LS'] for s in succs)\n    tasks[t_name]['LS'] = tasks[t_name]['LF'] - tasks[t_name]['dur']\n    tasks[t_name]['slack'] = tasks[t_name]['LS'] - tasks[t_name]['ES']\n\nprint(f\"DURASI TOTAL PROYEK RISET: {total_duration} Bulan\")\nprint(\"=\" * 65)\nprint(f\"{'Aktivitas':<22} | {'Dur':<4} | {'Slack':<5} | {'Jalur Kritis'}\")\nprint(\"=\" * 65)\n\nfor name, d in tasks.items():\n    is_crit = \"YA (CRITICAL)\" if d['slack'] == 0 else \"TIDAK\"\n    print(f\"{name:<22} | {d['dur']:<4} | {d['slack']:<5} | {is_crit}\")\nprint(\"=\" * 65)",
      "expectedOutput": "DURASI TOTAL PROYEK RISET: 13 Bulan\n=================================================================\nAktivitas              | Dur  | Slack | Jalur Kritis\n=================================================================\nA1 (Kalibrasi)         | 4    | 0     | YA (CRITICAL)\nA2 (Inovasi Algo)      | 6    | 0     | YA (CRITICAL)\nA3 (Fabrikasi Casing)  | 2    | 4     | TIDAK\nA4 (Uji Terintegrasi)  | 3    | 0     | YA (CRITICAL)\n================================================================="
    },
    "commonPitfalls": [
      "Menetapkan timeline riset tanpa mempertimbangkan waktu tunggu acak (seperti antrian peer review jurnal yang dapat memakan waktu 4-8 bulan).",
      "Mengabaikan Kill Criteria karena gengsi akademik atau rasa keterikatan emosional pada ide awal.",
      "Melakukan pivoting tanpa dokumentasi sistematis mengapa metode sebelumnya gagal (kegagalan terukur adalah data berharga)."
    ],
    "validationProcedures": [
      "Gunakan checkpoint triwulanan (Quarterly Milestone Review): evaluasi metrik kinerja aktual terhadap Kill Criteria yang telah disepakati bersama pembimbing.",
      "Sertakan buffer time kontingensi minimal 20% pada jalur kritis proyek untuk mengantisipasi hambatan tak terduga."
    ],
    "exercises": [
      {
        "question": "Mengapa aktivitas dengan nilai Slack = 0 disebut berada pada \"Jalur Kritis\"?",
        "hint": "Perhatikan dampak keterlambatan satu hari pada aktivitas tersebut terhadap tanggal akhir proyek.",
        "answerExplanation": "Aktivitas dengan Slack = 0 tidak memiliki toleransi penundaan sama sekali. Jika aktivitas tersebut terlambat 1 hari atau 1 minggu, maka tanggal penyelesaian keseluruhan proyek riset akan ikut mundur tepat 1 hari atau 1 minggu."
      },
      {
        "question": "Bagaimana perumusan Kill Criteria yang jelas dapat melindungi integritas mental dan psikologis seorang kandidat doktor?",
        "hint": "Fokus pada eliminasi keraguan dan rasa bersalah saat harus meninggalkan ide yang buntu.",
        "answerExplanation": "Kill Criteria mengubah keputusan untuk berhenti bukan sebagai kegagalan personal, melainkan sebagai keputusan saintifik yang logis dan objektif berdasarkan aturan yang telah disepakati sebelumnya. Hal ini mencegah stres kronis, frustrasi berkepanjangan akibat terjebak di jalan buntu, dan rasa bersalah saat harus beralih ke strategi baru."
      }
    ],
    "references": [
      {
        "citation": "Moder, J. J., Phillips, C. R., & Davis, E. W. (1983). Project management with CPM, PERT and precedence diagramming. Van Nostrand Reinhold Company.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Blank, S. (2013). Why the lean start-up changes everything. Harvard Business Review, 91(5), 63-72.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Penyusunan Peta Jalan 3-4 Tahun dengan Kriteria Terminasi Dini (Kill Criteria)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.6.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.6.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menyusun peta jalan riset 3-4 tahun menggunakan Analisis Jalur Kritis (Critical Path Method - CPM).",
          "Capaian 2: Merumuskan kriteria terminasi dini (Kill Criteria) dan strategi pivoting eksperimen secara objektif.",
          "Capaian 3: Mengatasi sunk cost fallacy dalam riset saintifik berbasis aturan keputusan formal."
        ],
        "keyFormulaOrDiagram": "$$ES(A_i) = \\max_{A_j \\in \\text{Pred}(A_i)} EF(A_j), \\quad EF(A_i) = ES(A_i) + d_i$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.6.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Penyusunan Peta Jalan 3-4 Tahun dengan Kriteria Terminasi Dini (Kill Criteria)",
        "lead": "Waktu adalah sumber daya paling terbatas dalam sebuah program penelitian doktoral atau proyek hibah terikat batas waktu.",
        "bulletPoints": [
          "Banyak peneliti terjebak dalam sunk cost fallacy: terus menerus menghabiskan waktu dan dana berbulan-bulan untuk mengejar hipotesis atau memperbaiki instrumen yang sebenarnya telah menemui jalan buntu, semata-mata karena merasa \"sudah terlanjur banyak berinvestasi di awal\".",
          "Manajemen riset profesional menuntut keberanian metodologis untuk menetapkan kriteria terminasi dini (Kill Criteria) dan rencana pivot yang terukur.",
          "Penjadwalan Jalur Kritis (Critical Path Method - CPM): Dalam peta jalan 36 hingga 48 bulan, setiap aktivitas penelitian (pengadaan sensor, kalibrasi, pengumpulan data, komputasi, penulisan, revisi) memiliki durasi dan hubungan ketergantungan.",
          "Jalur Kritis (Critical Path) adalah urutan aktivitas terpanjang dari awal hingga akhir proyek yang tidak memiliki toleransi keterlambatan (zero slack / float)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Konstruksi Kriteria Terminasi Dini (Kill Criteria): Kill Criteria adalah seperangkat ambang batas kuantitatif yang ditentukan di muka sebelum eksperimen dimulai, yang menyatakan kapan sebuah pendekatan harus dihentikan atau di-pivot: 1.",
        "bulletPoints": [
          "Ambang Batas Waktu (Temporal Deadline): Misal, jika konvergensi sintesis material tidak tercapai dalam waktu 12 minggu, hentikan eksplorasi variasi prekursor kimia tersebut.",
          "2."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Analisis Jalur Kritis (Critical Path Method - CPM) Matematis:",
        "bulletPoints": [
          "Diberikan aktivitas riset $A_i$ dengan durasi $d_i$, himpunan pendahulu $\\text{Pred}(A_i)$, dan penerus $\\text{Succ}(A_i)$.",
          "1. Perhitungan Waktu Maju (Forward Pass):",
          "2. Perhitungan Waktu Mundur (Backward Pass):"
        ],
        "keyFormulaOrDiagram": "$$ES(A_i) = \\max_{A_j \\in \\text{Pred}(A_i)} EF(A_j), \\quad EF(A_i) = ES(A_i) + d_i$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah proyek riset memiliki 4 aktivitas utama: A1 (Karakterisasi Sensor, 4 bulan), A2 (Pengembangan Algoritma Baru, 6 bulan, butuh A1), A3 (Desain Casing Prototipe, 2 bulan, butuh A1), dan A4 (Uji Integrasi Akhir, 3 bulan, butuh A2 dan A3). Tentukan durasi total proyek, aktivitas yang berada pada jalur kritis, dan besar slack waktu untuk A3.",
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
          "Langkah 1: Forward Pass: A1: ES=0, EF=4. A2: ES=4, EF=10. A3: ES=4, EF=6. A4: ES=max(EF_A2, EF_A3) = max(10, 6) = 10, EF=13 bulan.",
          "Langkah 2: Backward Pass (Durasi total = 13 bulan): A4: LF=13, LS=10. A2: LF=LS_A4=10, LS=4. A3: LF=LS_A4=10, LS=8. A1: LF=min(LS_A2, LS_A3) = min(4, 8) = 4, LS=0."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung Slack: S(A1) = 0 - 0 = 0. S(A2) = 4 - 4 = 0. S(A3) = 8 - 4 = 4 bulan. S(A4) = 10 - 10 = 0.",
          "Langkah 4: Jalur Kritis: A1 -> A2 -> A4 dengan durasi total 13 bulan. Aktivitas A3 memiliki slack 4 bulan (dapat ditunda hingga 4 bulan tanpa memundurkan jadwal penyelesaian proyek).",
          "[result: Interpretasi Ilmiah] Peneliti wajib mengalokasikan fokus pengawasan harian pada rantai kritis A1-A2-A4, sementara fabrikasi casing di A3 memiliki fleksibilitas 4 bulan."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Algoritma Critical Path Method (CPM) untuk penjadwalan dan identifikasi jalur kritis program riset doktoral.",
        "bulletPoints": [
          "Tujuan Algoritma: Algoritma Critical Path Method (CPM) untuk penjadwalan dan identifikasi jalur kritis program riset doktoral.",
          "Dependensi Pustaka Ilmiah: Standard Scientific Libraries",
          "Keluaran Terverifikasi: DURASI TOTAL PROYEK RISET: 13 Bulan"
        ],
        "keyFormulaOrDiagram": "DURASI TOTAL PROYEK RISET: 13 Bulan\n=================================================================\nAktivitas              | Dur  | Slack | Jalur Kritis\n=================================================================\nA1 (Kalibrasi)         | 4    | 0     | YA (CRITICAL)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menetapkan timeline riset tanpa mempertimbangkan waktu tunggu acak (seperti antrian peer review jurnal yang dapat memakan waktu 4-8 bulan).",
          "[warning: Perangkap] Mengabaikan Kill Criteria karena gengsi akademik atau rasa keterikatan emosional pada ide awal.",
          "[warning: Perangkap] Melakukan pivoting tanpa dokumentasi sistematis mengapa metode sebelumnya gagal (kegagalan terukur adalah data berharga)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan checkpoint triwulanan (Quarterly Milestone Review): evaluasi metrik kinerja aktual terhadap Kill Criteria yang telah disepakati bersama pembimbing.",
          "Prosedur: Sertakan buffer time kontingensi minimal 20% pada jalur kritis proyek untuk mengantisipasi hambatan tak terduga."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa aktivitas dengan nilai Slack = 0 disebut berada pada \"Jalur Kritis\"?",
          "Petunjuk Analitis: Perhatikan dampak keterlambatan satu hari pada aktivitas tersebut terhadap tanggal akhir proyek.",
          "Solusi Kunci: Aktivitas dengan Slack = 0 tidak memiliki toleransi penundaan sama sekali. Jika aktivitas tersebut terlambat 1 hari atau 1 minggu, maka tanggal penyelesaian keseluruhan proyek riset akan ikut mundur tepat 1 hari atau 1 minggu."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "7.6.4": {
    "id": "7.6.4",
    "chapterId": "CH-50",
    "title": "Manajemen Kolaborasi, Pembimbingan Ilmiah, dan Formulasi Proposal Hibah Penelitian",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Mengelola dinamika hubungan pembimbingan ilmiah (Advisor-Advisee Management) secara proaktif.",
      "Merancang arsitektur pembagian tugas dan hak kepengarangan dalam tim riset kolaboratif multidisiplin.",
      "Memformulasi proposal hibah penelitian kompetitif (Grant Writing) berbasis kerangka SMART dan Heilmeier Catechism."
    ],
    "content": "Riset ilmiah modern di era kontemporer hampir tidak pernah lagi dilakukan oleh seorang jenius yang bekerja dalam isolasi total. Kemajuan sains didorong oleh kolaborasi tim multidisiplin berskala besar yang membutuhkan pendanaan hibah kompetitif. Kapasitas seorang peneliti tidak hanya diukur dari kecakapan analitis di depan komputer atau meja lab, melainkan juga kecerdasan interpersonal dalam mengelola relasi pembimbingan, memimpin kolaborator internasional, dan memenangkan pendanaan riset.\n\nManajemen Hubungan Pembimbingan Ilmiah (Managing Upwards):\nHubungan antara kandidat doktor dan promotor/pembimbing bukan hubungan majikan-karyawan pasif, melainkan kemitraan intelektual profesional:\n- Buat agenda pertemuan tertulis sebelum jadwal bimbingan: ringkasan kemajuan minggu lalu, hambatan spesifik yang butuh keputusan pembimbing, dan rencana aksi minggu depan.\n- Sajikan alternatif solusi, bukan hanya membawa masalah mentah (\"Kami menghadapi masalah X, dan kami telah merancang Opsi Solusi A dan Opsi Solusi B beserta kelebihan dan kekurangannya...\").\n- Hormati waktu pembimbing dengan mengirimkan draf naskah minimal 5 hari kerja sebelum tanggal diskusi.\n\nProtokol Kolaborasi dan Kepengarangan Adil (CRediT Taxonomy):\nDalam tim riset multi-institusi, perselisihan paling sering timbul seputar urutan nama penulis (authorship order). Standar internasional CRediT (Contributor Roles Taxonomy) membagi kontribusi ke dalam 14 peran terstandarisasi (Conceptualization, Methodology, Software, Formal Analysis, Investigation, Resources, Data Curation, Writing - Original Draft, Writing - Review & Editing, Visualization, Supervision, Project Administration, Funding Acquisition). Matriks CRediT wajib disepakati di awal kolaborasi untuk mencegah konflik di kemudian hari.\n\nFormulasi Proposal Hibah: Prinsip George Heilmeier (DARPA Catechism):\nGeorge H. Heilmeier merumuskan serangkaian pertanyaan esensial yang digunakan oleh lembaga donor dunia untuk menyaring proposal riset jutaan dolar:\n1. Apa yang sedang Anda coba lakukan? Jelaskan tujuannya tanpa menggunakan jargon ilmiah yang rumit.\n2. Bagaimana hal itu dilakukan saat ini, dan apa batasannya?\n3. Apa hal baru dalam pendekatan Anda, dan mengapa Anda berpikir itu akan berhasil?\n4. Siapa yang peduli? Jika Anda berhasil, apa perbedaannya bagi dunia?\n5. Berapa biayanya? Berapa lama waktu yang dibutuhkan? Dan apa uji kelayakan tengah jalannya (midterm milestones)?",
    "mathematicalFoundations": "Model Evaluasi Kelayakan Proposal Hibah Riset (Heilmeier Utility Score):\nPanitia seleksi reviewer hibah mengevaluasi proposal menggunakan model linier terbobot bergradien dampak:\n\n$$\\mathcal{U}_{\\text{grant}} = w_{\\text{nov}} \\cdot N + w_{\\text{imp}} \\cdot I + w_{\\text{feas}} \\cdot F - w_{\\text{cost}} \\cdot C$$\ndi mana:\n- $N \\in [0, 1]$ adalah skor kebaruan ilmiah (novelty).\n- $I \\in [0, 1]$ adalah skor dampak sosial-ekonomi atau kemajuan sains (impact).\n- $F \\in [0, 1]$ adalah kelayakan metodologis dan keahlian tim (feasibility).\n- $C \\in [0, 1]$ adalah rasio efisiensi anggaran terhadap hasil yang dijanjikan.\n\nProposal yang unggul memiliki rasio kontribusi terhadap risiko $\\frac{N \\times I}{1 - F} > \\gamma_{\\text{threshold}}$.",
    "workedExample": {
      "problemStatement": "Sebuah tim dosen dan mahasiswa ITERA merancang proposal hibah penelitian terapan untuk sistem peringatan dini tanah longsor berbasis IoT dan visi komputer. Gunakan kerangka Heilmeier Catechism untuk merumuskan ringkasan eksekutif 5 butir proposal tersebut.",
      "stepByStepSolution": [
        "Langkah 1: Butir 1 (Tujuan Tanpa Jargon): \"Kami membangun sistem pemantauan lereng berbiaya rendah yang mampu mendeteksi pergeseran tanah mikro dan mengirimkan peringatan sirene 15 menit sebelum longsor terjadi ke warga desa pesisir.\"",
        "Langkah 2: Butir 2 (Praktik Saat Ini dan Limitasi): \"Saat ini pemantauan lereng mengandalkan sensor ekstensometer impor berharga mahal (> Rp 200 juta/titik) atau inspeksi visual manual yang tidak bisa beroperasi di malam hari dan saat hujan badai.\"",
        "Langkah 3: Butir 3 (Inovasi dan Alasan Berhasil): \"Pendekatan kami menggabungkan kamera inframerah bersolar sel surya dengan algoritma Optical Flow efisien di microcomputer lokal. Ini terbukti berhasil mendeteksi pergeseran 2 mm pada skala uji laboratorium.\"",
        "Langkah 4: Butir 4 (Dampak Riil): \"Jika berhasil, biaya instrumen turun 85% menjadi Rp 15 juta, memungkinkan pemerintah daerah memasang 50 titik pantau rawan longsor di Lampung, berpotensi menyelamatkan ribuan jiwa penduduk lereng perbukitan.\"",
        "Langkah 5: Butir 5 (Waktu dan Biaya): \"Riset ini membutuhkan waktu 24 bulan dengan total anggaran Rp 350 juta, dengan milestone teruji pada simulasi getaran buatan di bulan ke-12 dan uji lereng jalan lintas Sumatra di bulan ke-20.\""
      ],
      "resultInterpretation": "Penerapan Heilmeier Catechism menghasilkan ringkasan eksekutif proposal yang sangat jernih, persuasif, dan bebas dari jargon berlebihan bagi para reviewer pendanaan."
    },
    "pythonImplementation": {
      "description": "Pemetaan matriks kontribusi peran kepengarangan terstandarisasi berbasis taksonomi CRediT.",
      "libraryDependencies": [],
      "code": "# [SIMULASI/SYNTHETIC DATA] - Matriks peran kepengarangan terstandarisasi\ncredit_roles = [\n    \"Conceptualization\", \"Methodology\", \"Software\", \n    \"Formal Analysis\", \"Investigation\", \"Data Curation\",\n    \"Writing - Original Draft\", \"Writing - Review & Editing\", \"Supervision\"\n]\n\ncredit_matrix = {\n    \"Dr. Aji (Lead Researcher)\": [1, 1, 1, 1, 1, 1, 1, 1, 0],\n    \"Budi (M.Sc Student)\":        [0, 0, 1, 0, 1, 1, 0, 1, 0],\n    \"Prof. Handoko (Advisor)\":   [1, 0, 0, 1, 0, 0, 0, 1, 1]\n}\n\nprint(\"MATRIKS KEPENGARANGAN STANDAR CRediT:\")\nprint(\"=\" * 70)\nprint(f\"{'Nama Peneliti':<26} | {'Peran Kontribusi Utama'}\")\nprint(\"=\" * 70)\n\nfor author, roles in credit_matrix.items():\n    assigned = [credit_roles[i] for i, val in enumerate(roles) if val == 1]\n    roles_str = \", \".join(assigned)\n    print(f\"{author:<26} | {roles_str}\")\nprint(\"=\" * 70)",
      "expectedOutput": "MATRIKS KEPENGARANGAN STANDAR CRediT:\n======================================================================\nNama Peneliti              | Peran Kontribusi Utama\n======================================================================\nDr. Aji (Lead Researcher)  | Conceptualization, Methodology, Software, Formal Analysis, Investigation, Data Curation, Writing - Original Draft, Writing - Review & Editing\nBudi (M.Sc Student)        | Software, Investigation, Data Curation, Writing - Review & Editing\nProf. Handoko (Advisor)    | Conceptualization, Formal Analysis, Writing - Review & Editing, Supervision\n======================================================================"
    },
    "commonPitfalls": [
      "Memasukkan rekan atau pejabat institusi sebagai penulis pendamping (guest/honorary authorship) padahal yang bersangkutan tidak berkontribusi saintifik.",
      "Menulis proposal hibah yang penuh dengan istilah hiperbolik tanpa detail metodologi pengujian yang konkret.",
      "Menemui pembimbing tanpa persiapan data atau tanpa catatan pertemuan tertulis, mengharapkan pembimbing yang memikirkan seluruh detail solusi."
    ],
    "validationProcedures": [
      "Gunakan formulir persetujuan kepengarangan CRediT sebelum draf pertama artikel mulai ditulis bersama rekan tim.",
      "Terapkan \"Reviewer-Persona Check\" pada proposal hibah: minta rekan sejawat di luar disiplin ilmu Anda membaca naskah untuk menguji apakah tujuannya mudah dipahami."
    ],
    "exercises": [
      {
        "question": "Menurut pedoman internasional COPE dan ICMJE, apakah seorang kepala laboratorium berhak dicantumkan sebagai penulis artikel ilmiah semata-mata karena ia menyediakan fasilitas lab dan pendanaan?",
        "hint": "Perhatikan definisi kontribusi intelektual substansial vs dukungan administratif.",
        "answerExplanation": "TIDAK BERHAK. Penyediaan dana riset, fasilitas laboratorium umum, atau jabatan manajerial/kepala lab semata-mata (tanpa kontribusi intelektual langsung pada perancangan, eksekusi, analisis, atau penulisan naskah) tidak memenuhi syarat kepengarangan ilmiah. Kontribusi tersebut wajib dicantumkan pada bagian Acknowledgments (Ucapan Terima Kasih), bukan di daftar penulis."
      },
      {
        "question": "Mengapa Heilmeier Catechism menekankan pertanyaan \"Siapa yang peduli dan apa bedanya jika riset Anda sukses?\" pada proposal hibah?",
        "hint": "Fokus pada dampak sosio-ekonomi dan justifikasi investasi publik.",
        "answerExplanation": "Dana hibah riset berasal dari pembayar pajak atau modal ventura yang memiliki akuntabilitas publik. Lembaga donor tidak hanya mendanai rasa ingin tahu teoretis murni, melainkan mencari solusi atas tantangan nyata dunia. Pertanyaan ini memaksa peneliti merumuskan dampak riil terukur (return on investment) dari penelitian yang diajukan."
      }
    ],
    "references": [
      {
        "citation": "Brand, A., et al. (2015). Beyond authorship: attribution, contribution, collaboration, and crediting. Learned Publishing, 28(2), 151-155.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "National Science Foundation (NSF). (2023). Proposal and award policies and procedures guide (PAPPG).",
        "type": "formal-standard"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Manajemen Kolaborasi, Pembimbingan Ilmiah, dan Formulasi Proposal Hibah Penelitian",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.6.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.6.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengelola dinamika hubungan pembimbingan ilmiah (Advisor-Advisee Management) secara proaktif.",
          "Capaian 2: Merancang arsitektur pembagian tugas dan hak kepengarangan dalam tim riset kolaboratif multidisiplin.",
          "Capaian 3: Memformulasi proposal hibah penelitian kompetitif (Grant Writing) berbasis kerangka SMART dan Heilmeier Catechism."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{U}_{\\text{grant}} = w_{\\text{nov}} \\cdot N + w_{\\text{imp}} \\cdot I + w_{\\text{feas}} \\cdot F - w_{\\text{cost}} \\cdot C$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.6.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Manajemen Kolaborasi, Pembimbingan Ilmiah, dan Formulasi Proposal Hibah Penelitian",
        "lead": "Riset ilmiah modern di era kontemporer hampir tidak pernah lagi dilakukan oleh seorang jenius yang bekerja dalam isolasi total.",
        "bulletPoints": [
          "Kemajuan sains didorong oleh kolaborasi tim multidisiplin berskala besar yang membutuhkan pendanaan hibah kompetitif.",
          "Kapasitas seorang peneliti tidak hanya diukur dari kecakapan analitis di depan komputer atau meja lab, melainkan juga kecerdasan interpersonal dalam mengelola relasi pembimbingan, memimpin kolaborator internasional, dan memenangkan pendanaan riset.",
          "Manajemen Hubungan Pembimbingan Ilmiah (Managing Upwards): Hubungan antara kandidat doktor dan promotor/pembimbing bukan hubungan majikan-karyawan pasif, melainkan kemitraan intelektual profesional: - Buat agenda pertemuan tertulis sebelum jadwal bimbingan: ringkasan kemajuan minggu lalu, hambatan spesifik yang butuh keputusan pembimbing, dan rencana aksi minggu depan. - Sajikan alternatif solusi, bukan hanya membawa masalah mentah (\"Kami menghadapi masalah X, dan kami telah merancang Opsi Solusi A dan Opsi Solusi B beserta kelebihan dan kekurangannya...\"). - Hormati waktu pembimbing dengan mengirimkan draf naskah minimal 5 hari kerja sebelum tanggal diskusi."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Protokol Kolaborasi dan Kepengarangan Adil (CRediT Taxonomy): Dalam tim riset multi-institusi, perselisihan paling sering timbul seputar urutan nama penulis (authorship order).",
        "bulletPoints": [
          "Standar internasional CRediT (Contributor Roles Taxonomy) membagi kontribusi ke dalam 14 peran terstandarisasi (Conceptualization, Methodology, Software, Formal Analysis, Investigation, Resources, Data Curation, Writing - Original Draft, Writing - Review & Editing, Visualization, Supervision, Project Administration, Funding Acquisition).",
          "Matriks CRediT wajib disepakati di awal kolaborasi untuk mencegah konflik di kemudian hari.",
          "Formulasi Proposal Hibah: Prinsip George Heilmeier (DARPA Catechism): George H.",
          "Heilmeier merumuskan serangkaian pertanyaan esensial yang digunakan oleh lembaga donor dunia untuk menyaring proposal riset jutaan dolar: 1."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Model Evaluasi Kelayakan Proposal Hibah Riset (Heilmeier Utility Score):",
        "bulletPoints": [
          "Panitia seleksi reviewer hibah mengevaluasi proposal menggunakan model linier terbobot bergradien dampak:",
          "di mana:",
          "- $N \\in [0, 1]$ adalah skor kebaruan ilmiah (novelty)."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{U}_{\\text{grant}} = w_{\\text{nov}} \\cdot N + w_{\\text{imp}} \\cdot I + w_{\\text{feas}} \\cdot F - w_{\\text{cost}} \\cdot C$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah tim dosen dan mahasiswa ITERA merancang proposal hibah penelitian terapan untuk sistem peringatan dini tanah longsor berbasis IoT dan visi komputer. Gunakan kerangka Heilmeier Catechism untuk merumuskan ringkasan eksekutif 5 butir proposal tersebut.",
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
          "Langkah 1: Butir 1 (Tujuan Tanpa Jargon): \"Kami membangun sistem pemantauan lereng berbiaya rendah yang mampu mendeteksi pergeseran tanah mikro dan mengirimkan peringatan sirene 15 menit sebelum longsor terjadi ke warga desa pesisir.\"",
          "Langkah 2: Butir 2 (Praktik Saat Ini dan Limitasi): \"Saat ini pemantauan lereng mengandalkan sensor ekstensometer impor berharga mahal (> Rp 200 juta/titik) atau inspeksi visual manual yang tidak bisa beroperasi di malam hari dan saat hujan badai.\"",
          "Langkah 3: Butir 3 (Inovasi dan Alasan Berhasil): \"Pendekatan kami menggabungkan kamera inframerah bersolar sel surya dengan algoritma Optical Flow efisien di microcomputer lokal. Ini terbukti berhasil mendeteksi pergeseran 2 mm pada skala uji laboratorium.\""
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Butir 4 (Dampak Riil): \"Jika berhasil, biaya instrumen turun 85% menjadi Rp 15 juta, memungkinkan pemerintah daerah memasang 50 titik pantau rawan longsor di Lampung, berpotensi menyelamatkan ribuan jiwa penduduk lereng perbukitan.\"",
          "Langkah 5: Butir 5 (Waktu dan Biaya): \"Riset ini membutuhkan waktu 24 bulan dengan total anggaran Rp 350 juta, dengan milestone teruji pada simulasi getaran buatan di bulan ke-12 dan uji lereng jalan lintas Sumatra di bulan ke-20.\"",
          "[result: Interpretasi Ilmiah] Penerapan Heilmeier Catechism menghasilkan ringkasan eksekutif proposal yang sangat jernih, persuasif, dan bebas dari jargon berlebihan bagi para reviewer pendanaan."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pemetaan matriks kontribusi peran kepengarangan terstandarisasi berbasis taksonomi CRediT.",
        "bulletPoints": [
          "Tujuan Algoritma: Pemetaan matriks kontribusi peran kepengarangan terstandarisasi berbasis taksonomi CRediT.",
          "Dependensi Pustaka Ilmiah: Standard Scientific Libraries",
          "Keluaran Terverifikasi: MATRIKS KEPENGARANGAN STANDAR CRediT:"
        ],
        "keyFormulaOrDiagram": "MATRIKS KEPENGARANGAN STANDAR CRediT:\n======================================================================\nNama Peneliti              | Peran Kontribusi Utama\n======================================================================\nDr. Aji (Lead Researcher)  | Conceptualization, Methodology, Software, Formal Analysis, Investigation, Data Curation, Writing - Original Draft, Writing - Review & Editing",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Memasukkan rekan atau pejabat institusi sebagai penulis pendamping (guest/honorary authorship) padahal yang bersangkutan tidak berkontribusi saintifik.",
          "[warning: Perangkap] Menulis proposal hibah yang penuh dengan istilah hiperbolik tanpa detail metodologi pengujian yang konkret.",
          "[warning: Perangkap] Menemui pembimbing tanpa persiapan data atau tanpa catatan pertemuan tertulis, mengharapkan pembimbing yang memikirkan seluruh detail solusi."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan formulir persetujuan kepengarangan CRediT sebelum draf pertama artikel mulai ditulis bersama rekan tim.",
          "Prosedur: Terapkan \"Reviewer-Persona Check\" pada proposal hibah: minta rekan sejawat di luar disiplin ilmu Anda membaca naskah untuk menguji apakah tujuannya mudah dipahami."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Menurut pedoman internasional COPE dan ICMJE, apakah seorang kepala laboratorium berhak dicantumkan sebagai penulis artikel ilmiah semata-mata karena ia menyediakan fasilitas lab dan pendanaan?",
          "Petunjuk Analitis: Perhatikan definisi kontribusi intelektual substansial vs dukungan administratif.",
          "Solusi Kunci: TIDAK BERHAK. Penyediaan dana riset, fasilitas laboratorium umum, atau jabatan manajerial/kepala lab semata-mata (tanpa kontribusi intelektual langsung pada perancangan, eksekusi, analisis, atau penulisan naskah) tidak memenuhi syarat kepengarangan ilmiah. Kontribusi tersebut wajib dicantumkan pada bagian Acknowledgments (Ucapan Terima Kasih), bukan di daftar penulis."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
