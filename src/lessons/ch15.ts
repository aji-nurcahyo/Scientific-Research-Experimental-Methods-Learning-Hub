import { Lesson } from '../types/curriculum';

export const CH15_LESSONS: Record<string, Partial<Lesson>> = {
  "2.8.1": {
    "id": "2.8.1",
    "chapterId": "CH-15",
    "title": "Anatomi Naskah Proposal Penelitian Rekayasa yang Terpadu",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memahami struktur anatomi baku proposal penelitian rekayasa tingkat Sarjana, Magister, dan Doktoral.",
      "Membangun benang merah koheren (*golden thread*) dari latar belakang masalah hingga metodologi validasi.",
      "Menghindari inkonsistensi terminologi antar-bab dalam naskah proposal ilmiah."
    ],
    "content": "Proposal penelitian (*research proposal*) adalah dokumen operasional ilmiah dan kontrak intelektual formal antara peneliti dengan komite penguji akademik atau dewan penyandang dana (*funding agency*). Proposal yang berhasil tidak hanya menjawab pertanyaan \"apa yang ingin dibuat\", melainkan membuktikan secara meyakinkan \"mengapa masalah ini bernilai ilmiah\", \"mengapa metode yang dipilih adalah yang paling tepat\", dan \"bagaimana hasil akhirnya akan divalidasi secara objektif\".\n\nAnatomi standar proposal penelitian rekayasa yang terpadu terdiri dari 4 blok bangunan esensial:\n1. Blok Kontekstual & Celah Ilmiah (Bab 1: Pendahuluan): Memaparkan fenomena dunia nyata, mendekonstruksi gejala permukaan menjadi akar masalah ilmiah, menyajikan celah riset (*research gap*) yang terkonfirmasi oleh literatur SOTA, serta merumuskan rumusan masalah, batasan masalah, dan tujuan penelitian yang spesifik.\n2. Blok Kerangka Teoretis & Sintesis Literatur (Bab 2: Tinjauan Pustaka): Menyajikan landasan teori dasar mekanistik/fisis, tinjauan komprehensif state-of-the-art melalui matriks sintesis komparatif, dan kerangka konseptual kausal (DAG).\n3. Blok Arsitektur Metodologi & Validasi (Bab 3: Metode Penelitian): Menetapkan rancangan eksperimen, definisi operasional variabel, prosedur kalibrasi instrumen, rencana manajemen data (DMP), dan uji signifikansi statistik pembuktian hipotesis.\n4. Blok Kelayakan Eksekusi & Manajemen Risiko (Bab 4: Rencana Kerja): Menyajikan jadwal kerja Gantt Chart, anggaran sumber daya, dan rencana mitigasi risiko kegagalan teknis.\n\nBenang merah keilmuan (*golden thread*) harus mengalir mulus: setiap kata kunci pada judul harus bersumber dari masalah di Bab 1, terikat pada teori di Bab 2, dan memiliki tahapan eksperimen konkret di Bab 3.",
    "mathematicalFoundations": "Koherensi Struktural Proposal dapat dimodelkan sebagai fungsi pelestarian informasi (*information preservation*) antar-bab:\n\nDiberikan himpunan tujuan riset $\\mathcal{O} = \\{o_1, o_2, \\dots, o_k\\}$, himpunan metode $\\mathcal{M} = \\{m_1, m_2, \\dots, m_p\\}$, dan himpunan metrik evaluasi $\\mathcal{E} = \\{e_1, e_2, \\dots, e_q\\}$.\n\nKondisi Kelengkapan Tertutup (*Closed Completeness Criterion*):\n$$\\forall o_i \\in \\mathcal{O}, \\quad \\exists m_j \\in \\mathcal{M} \\quad \\text{sedemikian sehingga } m_j \\text{ mengeksekusi } o_i$$\n$$\\forall o_i \\in \\mathcal{O}, \\quad \\exists e_l \\in \\mathcal{E} \\quad \\text{sedemikian sehingga } e_l \\text{ mengukur keberhasilan } o_i$$\n\nJika $\\exists o^* \\in \\mathcal{O}$ yang tidak memiliki pasangan di $\\mathcal{M}$ (tujuan tanpa metode) atau tidak memiliki pasangan di $\\mathcal{E}$ (tujuan tanpa metrik validasi), maka naskah proposal dinyatakan mengalami diskontinuitas metodologis (*broken golden thread*).",
    "workedExample": {
      "problemStatement": "Seorang mahasiswa ITERA menuliskan Tujuan Penelitian ke-3 dalam proposal skripsi: \"Menganalisis efisiensi konsumsi daya algoritma pada mikrokontroler STM32\". Namun pada Bab 3 Metode Penelitian, mahasiswa tersebut hanya menjelaskan cara melatih model di Google Colab dan tidak menyebutkan pengujian perangkat keras apa pun. Analisis cacat proposal ini dan rumuskan perbaikannya.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi pelanggaran koherensi: Tujuan ke-3 menuntut data fisik konsumsi daya embedded hardware (STM32), namun Bab Metodologi hanya menyediakan eksperimen simulasi cloud (Google Colab).",
        "Langkah 2: Evaluasi dampak penilaian: Reviewer akan langsung menandai proposal ini sebagai \"metodologi tidak lengkap dan tujuan tidak terjawab\" yang memicu penolakan instan.",
        "Langkah 3: Opsi Perbaikan A (Menyelaraskan Metodologi): Tambahkan sub-bab baru di Bab 3 yang merinci: (a) Instrumen pengukur arus (shunt resistor + multimeter data logger), (b) Prosedur deployment model ke STM32 (konversi via TensorFlow Lite for Microcontrollers), dan (c) Metrik perhitungan daya (P = V * I).",
        "Langkah 4: Opsi Perbaikan B (Menyelaraskan Tujuan): Jika perangkat keras fisik tidak tersedia, ubah Tujuan ke-3 menjadi: \"Mengestimasi kompleksitas komputasional algoritma berdasarkan jumlah operasi titik mengambang (FLOPs) dan estimasi memori teoretis.\""
      ],
      "resultInterpretation": "Penyelarasan antara tujuan yang dijanjikan dengan prosedur yang dirancang memulihkan integritas naskah proposal."
    },
    "pythonImplementation": {
      "description": "Linter otomatis pemetaan relasi antar-tujuan dan ketersediaan metodologi pengujian.",
      "libraryDependencies": [],
      "code": "tujuan_penelitian = [\"O1_Akurasi\", \"O2_Latensi\", \"O3_Daya_Baterai\"]\nmetode_tersedia = {\n    \"O1_Akurasi\": \"K-Fold Cross Validation pada Dataset Uji\",\n    \"O2_Latensi\": \"Timer Timestamp Hardware ADC\",\n    # O3 tidak memiliki alokasi metodologi di naskah!\n}\n\ndef audit_kelengkapan_proposal(tujuan_list, metode_map):\n    cacat = []\n    for t in tujuan_list:\n        if t not in metode_map:\n            cacat.append(t)\n    return cacat\n\ntujuan_hilang = audit_kelengkapan_proposal(tujuan_penelitian, metode_tersedia)\n\nprint(\"AUDIT KOHERENSI ANATOMI PROPOSAL:\")\nfor t in tujuan_penelitian:\n    status = metode_map.get(t, \"TIDAK ADA METODE (DISKONTINUITAS)\") if 'metode_map' in locals() else metode_tersedia.get(t, \"TIDAK ADA METODE DI BAB 3!\")\n    print(f\"- {t:15s} -> {status}\")\n\nprint(\"-\" * 55)\nif tujuan_hilang:\n    print(f\"Peringatan Reviewer: Ditemukan {len(tujuan_hilang)} tujuan tanpa metodologi konkret: {tujuan_hilang}\")\nelse:\n    print(\"Status Anatomi: Proposal koheren sempurna.\")\n",
      "expectedOutput": "AUDIT KOHERENSI ANATOMI PROPOSAL:\n- O1_Akurasi     -> K-Fold Cross Validation pada Dataset Uji\n- O2_Latensi     -> Timer Timestamp Hardware ADC\n- O3_Daya_Baterai -> TIDAK ADA METODE DI BAB 3!\n-------------------------------------------------------\nPeringatan Reviewer: Ditemukan 1 tujuan tanpa metodologi konkret: ['O3_Daya_Baterai']"
    },
    "commonPitfalls": [
      "Menulis Bab 1 Pendahuluan yang berisi deskripsi buku teks umum (seperti sejarah ditemukannya panel surya) alih-alih fokus pada akar masalah dan celah riset.",
      "Menyajikan metodologi hanya dalam bentuk diagram alir umum (Mulai -> Studi Pustaka -> Ambil Data -> Analisis -> Selesai) tanpa rincian operasional teknis.",
      "Menggunakan batasan masalah untuk menutupi kemalasan metodologis (misalnya: \"penelitian dibatasi hanya pada data 1 hari karena keterbatasan waktu peneliti\")."
    ],
    "validationProcedures": [
      "Gunakan uji keterbacaan silang (*peer review internal*): berikan naskah proposal kepada rekan peneliti dari laboratorium berbeda untuk menguji apakah mereka memahami alur riset.",
      "Pastikan seluruh pustaka acuan yang disitasi di naskah tercantum utuh pada daftar pustaka (verifikasi bebas kutipan hantu)."
    ],
    "exercises": [
      {
        "question": "Apa perbedaan antara \"Batasan Masalah (Scope Delimitation)\" yang sah secara ilmiah dengan \"Keterbatasan Penelitian (Research Limitation)\"?",
        "hint": "Perhatikan apakah batasan tersebut merupakan keputusan sadar peneliti di awal ataukah kendala tak terkendali di luar kontrol peneliti.",
        "answerExplanation": "Batasan Masalah (Delimitation) adalah keputusan sadar yang sengaja ditetapkan oleh peneliti sejak awal untuk mengunci fokus riset pada parameter tertentu (misal membatasi rentang suhu pengujian 20-40 \u00b0C). Sebaliknya, Keterbatasan (Limitation) adalah kendala eksternal tak terhindarkan di luar kendali peneliti yang timbul selama riset berlangsung (misal instrumen pengukur rusak atau terhentinya pasokan daya listrik laboratorium)."
      }
    ],
    "references": [
      {
        "citation": "Locke, L. F., Spirduso, W. W., & Silverman, S. J. (2013). Proposals That Work: A Guide for Planning Dissertations and Grant Proposals. SAGE Publications.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Przeworski, A., & Salomon, F. (1995). On the Art of Writing Proposals. Social Science Research Council.",
        "type": "guideline"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Anatomi Naskah Proposal Penelitian Rekayasa yang Terpad...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.8.1.",
          "Capaian: Memahami struktur anatomi baku proposal penelitian rekayasa tingkat Sarjana, Magister, dan Doktoral.",
          "Capaian: Membangun benang merah koheren (*golden thread*) dari latar belakang masalah hingga metodologi validasi.",
          "Capaian: Menghindari inkonsistensi terminologi antar-bab dalam naskah proposal ilmiah."
        ],
        "keyFormulaOrDiagram": "$$\\forall o_i \\in \\mathcal{O}, \\quad \\exists m_j \\in \\mathcal{M} \\quad \\text{sedemikian sehingga } m_j \\text{ mengeksekusi } o_i$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Anatomi Naskah Proposal Penelitian Rekayasa yang Terpad...",
        "bulletPoints": [
          "Proposal penelitian (*research proposal*) adalah dokumen operasional ilmiah dan kontrak intelektual formal antara peneliti de...",
          "Anatomi standar proposal penelitian rekayasa yang terpadu terdiri dari 4 blok bangunan esensial: 1. Blok Kontekstual & Celah...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Benang merah keilmuan (*golden thread*) harus mengalir mulus: setiap kata kunci pada judul..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Benang merah keilmuan (*golden thread*) harus mengalir mulus: setiap kata kunci pada judul harus bersumber dari masalah di Ba...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Koherensi Struktural Proposal dapat dimodelkan sebagai fungsi pelestarian informasi (*information preservation...",
          "Diberikan himpunan tujuan riset $\\mathcal{O} = \\{o_1, o_2, \\dots, o_k\\}$, himpunan metode $\\mathcal{M} = \\{m_1...",
          "Kondisi Kelengkapan Tertutup (*Closed Completeness Criterion*):"
        ],
        "keyFormulaOrDiagram": "$$\\forall o_i \\in \\mathcal{O}, \\quad \\exists m_j \\in \\mathcal{M} \\quad \\text{sedemikian sehingga } m_j \\text{ mengeksekusi } o_i$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Seorang mahasiswa ITERA menuliskan Tujuan Penelitian ke-3 dalam proposal skripsi: \"Menganalisis efisiensi konsumsi daya algoritma pada mikro...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi pelanggaran koherensi: Tujuan ke-3 menuntut data fisik konsumsi daya embedded hardware...",
          "Langkah 2: Evaluasi dampak penilaian: Reviewer akan langsung menandai proposal ini sebagai \"metodologi tidak l...",
          "Langkah 3: Opsi Perbaikan A (Menyelaraskan Metodologi): Tambahkan sub-bab baru di Bab 3 yang merinci: (a) Inst...",
          "Interpretasi: Penyelarasan antara tujuan yang dijanjikan dengan prosedur yang dirancang memulihkan integritas naskah proposal."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Opsi Perbaikan B (Menyelaraskan Tujuan): Jika perangkat keras fisik tidak terse..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Linter otomatis pemetaan relasi antar-tujuan dan ketersediaan metodologi pengujian.",
          "Dependensi Pustaka: ",
          "Keluaran Diharapkan: AUDIT KOHERENSI ANATOMI PROPOSAL:"
        ],
        "keyFormulaOrDiagram": "AUDIT KOHERENSI ANATOMI PROPOSAL: | - O1_Akurasi -> K-Fold Cross Validation pada Dataset U..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menulis Bab 1 Pendahuluan yang berisi deskripsi buku teks umum (seperti sejarah ditemukannya panel surya) alih...",
          "Perangkap: Menyajikan metodologi hanya dalam bentuk diagram alir umum (Mulai -> Studi Pustaka -> Ambil Data -> Analisis -...",
          "Perangkap: Menggunakan batasan masalah untuk menutupi kemalasan metodologis (misalnya: \"penelitian dibatasi hanya pada da..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan uji keterbacaan silang (*peer review internal*): berikan naskah proposal kepada rekan peneliti dari la...",
          "Prosedur: Pastikan seluruh pustaka acuan yang disitasi di naskah tercantum utuh pada daftar pustaka (verifikasi bebas ku..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Apa perbedaan antara \"Batasan Masalah (Scope Delimitation)\" yang sah secara ilmiah dengan \"Keterbatasan Penelitian (Rese...",
          "Petunjuk: Perhatikan apakah batasan tersebut merupakan keputusan sadar peneliti di awal ataukah kendala tak te...",
          "Solusi Kunci: Batasan Masalah (Delimitation) adalah keputusan sadar yang sengaja ditetapkan oleh peneliti sejak awal untuk mengunci fo..."
        ]
      }
    ]
  },
  "2.8.2": {
    "id": "2.8.2",
    "chapterId": "CH-15",
    "title": "Konstruksi Matriks Keselarasan Riset (Research Alignment Matrix)",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Membangun Matriks Keselarasan Riset (Research Alignment Matrix / RAM) yang terhubung erat.",
      "Menyelaraskan secara bijective: Pertanyaan Riset -> Kebutuhan Data -> Metode Eksperimen -> Metrik Evaluasi -> Luaran Bukti.",
      "Menggunakan RAM sebagai instrumen audit metodologis sebelum sidang proposal."
    ],
    "content": "Matriks Keselarasan Riset (*Research Alignment Matrix* / RAM), atau sering disebut sebagai Matriks Konsistensi Metodologis, adalah instrumen paling ampuh untuk mendeteksi kecacatan logika dan lubang metodologis dalam proposal penelitian. RAM merangkum seluruh arsitektur proyek penelitian ke dalam satu tabel matriks komprehensif di mana setiap baris mewakili satu alur penyelidikan independen.\n\nSetiap baris dalam Matriks Keselarasan Riset wajib memetakan 5 pilar secara horizontal:\n1. Pertanyaan Penelitian Spesifik (Research Question): Apa ketidaktahuan ilmiah spesifik yang ingin dipecahkan?\n2. Kebutuhan Data Empiris (Required Data): Parameter fisik apa, dalam rentang berapa, dan dengan frekuensi sampling seperti apa yang dibutuhkan untuk menjawab pertanyaan tersebut?\n3. Metode dan Prosedur Pengujian (Experimental/Analytical Method): Rig uji apa, algoritma apa, dan SOP nomor berapa yang akan digunakan untuk mengumpulkan dan memproses data tersebut?\n4. Metrik dan Kriteria Keberhasilan Kuantitatif (Evaluation Metrics & Success Criteria): Ambang batas numerik apa yang menentukan apakah metode tersebut berhasil membuktikan hipotesis (misal: penurunan jitter < 2 ms pada CI 95%)?\n5. Luaran Bukti Konkret (Deliverable Artifacts): Grafik, tabel perbandingan, atau repositori data apa yang akan disajikan pada bab hasil laporan akhir?\n\nJika sebuah proposal mampu menyusun RAM yang solid dan tanpa celah, proposal tersebut hampir dipastikan akan lolos evaluasi metodologi pada komite penilai mana pun.",
    "mathematicalFoundations": "Representasi Formal Matriks Keselarasan Riset sebagai Pemetaan Bijektif:\n\nDidefinisikan tupel keselarasan penelitian $\\mathcal{T}_i$:\n$$\\mathcal{T}_i = \\langle Q_i, \\, D_i, \\, M_i, \\, E_i, \\, L_i \\rangle$$\n\nKondisi Keselarasan Homomorfik Sistematis:\n$$\\forall i \\in \\{1, 2, \\dots, K\\}:$$\n1. $Q_i \\longleftrightarrow D_i$ : Data $D_i$ mencukupi secara statistik (*statistically sufficient*) untuk menjawab $Q_i$.\n2. $D_i \\longleftrightarrow M_i$ : Metode $M_i$ mampu mengolah domain data $D_i$ tanpa melanggar asumsi matematis skala pengukuran Stevens.\n3. $M_i \\longleftrightarrow E_i$ : Metrik $E_i$ sensitif secara matematis terhadap variasi performa algoritma $M_i$.\n4. $E_i \\longleftrightarrow L_i$ : Luaran $L_i$ menyajikan visualisasi data yang transparan dari metrik $E_i$.\n\nDerajat Keselarasan Matriks (*Matrix Alignment Score*):\n$$\\text{RAM}_{\\text{score}} = \\frac{1}{K} \\sum_{i=1}^K \\mathbb{I}(\\mathcal{T}_i \\text{ valid})$$\nProposal hanya layak diseminarkan jika $\\text{RAM}_{\\text{score}} = 1.00$ (100% selaras tanpa baris bolong).",
    "workedExample": {
      "problemStatement": "Susun Matriks Keselarasan Riset (RAM) lengkap untuk proyek skripsi teknik elektro ITERA dengan judul: \"Optimasi Penjadwalan Pengisian Daya Kendaraan Listrik Berbasis Logika Fuzzy pada Kampus ITERA\".",
      "stepByStepSolution": [
        "Langkah 1 (Baris 1 - Karakterisasi Profil Beban):",
        "- Pertanyaan: Bagaimana pola fluktuasi profil beban dasar kelistrikan Gedung Kuliah ITERA?",
        "- Data: Rekaman daya aktif (kW) interval 15 menit selama 3 bulan dari smart meter PLN.",
        "- Metode: Analisis deret waktu deskriptif dan clustering k-means pola beban puncak.",
        "- Metrik: Varians beban intraday dan Peak-to-Average Ratio (PAR).",
        "- Luaran: Grafik kurva beban harian tipikal hari kerja vs akhir pekan.",
        "Langkah 2 (Baris 2 - Optimasi Fuzzy):",
        "- Pertanyaan: Bagaimana merancang aturan inferensi fuzzy untuk mencegah lonjakan beban puncak saat 50 kendaraan listrik diisi bersamaan?",
        "- Data: Waktu kedatangan kendaraan, State of Charge (SoC) awal, target keberangkatan, dan kapasitas trafo gardu.",
        "- Metode: Pemodelan logika fuzzy Mamdani dengan 27 basis aturan diuji pada simulator jaringan OpenDSS.",
        "- Metrik: Penurunan beban puncak transformator minimal 20% dan tidak ada tegangan bus di bawah 0.95 pu.",
        "- Luaran: Tabel komparasi pembebanan trafo (Uncontrolled vs Fuzzy) dan kurva profil tegangan bus."
      ],
      "resultInterpretation": "Setiap baris RAM memiliki keterikatan horizontal yang kokoh, menjamin bahwa tidak ada aktivitas pengumpulan data yang sia-sia atau tujuan yang tidak terukur."
    },
    "pythonImplementation": {
      "description": "Program validasi kelengkapan dan keterhubungan kolom Matriks Keselarasan Riset (RAM).",
      "libraryDependencies": [
        "pandas"
      ],
      "code": "import pandas as pd\n\n# Data Matriks Keselarasan Riset [SIMULASI/SYNTHETIC DATA]\nram_data = [\n    {\n        \"No\": \"RQ-1\",\n        \"Pertanyaan Riset\": \"Bagaimana pola fluktuasi beban dasar gedung?\",\n        \"Kebutuhan Data\": \"Daya aktif kW interval 15 menit (3 bulan)\",\n        \"Metode Pengujian\": \"Clustering K-Means Deret Waktu\",\n        \"Metrik Keberhasilan\": \"Silhouette Score > 0.65\",\n        \"Luaran Bukti\": \"Grafik Kurva Beban Tipikal\"\n    },\n    {\n        \"No\": \"RQ-2\",\n        \"Pertanyaan Riset\": \"Bagaimana mereduksi beban puncak pengisian EV?\",\n        \"Kebutuhan Data\": \"SoC baterai, waktu parkir, kapasitas trafo\",\n        \"Metode Pengujian\": \"Inferensi Fuzzy Mamdani di OpenDSS\",\n        \"Metrik Keberhasilan\": \"Reduksi Peak Load >= 20%\",\n        \"Luaran Bukti\": \"Kurva Profil Tegangan Bus & Beban Trafo\"\n    }\n]\n\ndf_ram = pd.DataFrame(ram_data)\n\nprint(\"MATRIKS KESELARASAN RISET (RESEARCH ALIGNMENT MATRIX):\")\nfor idx, row in df_ram.iterrows():\n    print(f\"[{row['No']}] {row['Pertanyaan Riset']}\")\n    print(f\"  -> Data   : {row['Kebutuhan Data']}\")\n    print(f\"  -> Metode : {row['Metode Pengujian']}\")\n    print(f\"  -> Metrik : {row['Metrik Keberhasilan']}\")\n    print(f\"  -> Luaran : {row['Luaran Bukti']}\\n\")\n",
      "expectedOutput": "MATRIKS KESELARASAN RISET (RESEARCH ALIGNMENT MATRIX):\n[RQ-1] Bagaimana pola fluktuasi beban dasar gedung?\n  -> Data   : Daya aktif kW interval 15 menit (3 bulan)\n  -> Metode : Clustering K-Means Deret Waktu\n  -> Metrik : Silhouette Score > 0.65\n  -> Luaran : Grafik Kurva Beban Tipikal\n\n[RQ-2] Bagaimana mereduksi beban puncak pengisian EV?\n  -> Data   : SoC baterai, waktu parkir, kapasitas trafo\n  -> Metode : Inferensi Fuzzy Mamdani di OpenDSS\n  -> Metrik : Reduksi Peak Load >= 20%\n  -> Luaran : Kurva Profil Tegangan Bus & Beban Trafo"
    },
    "commonPitfalls": [
      "Menuliskan metode pengujian yang sangat umum seperti \"menggunakan kecerdasan buatan\" tanpa menyebutkan algoritma dan metrik konkret.",
      "Menetapkan metrik keberhasilan yang bersifat kualitatif subjektif seperti \"sistem berjalan dengan baik dan lancar\".",
      "Mengabaikan keterkaitan data input: merancang algoritma kompleks namun tidak menjelaskan dari mana data input fisik akan diperoleh."
    ],
    "validationProcedures": [
      "Lakukan uji horizontal terbalik (*reverse audit*): mulai dari kolom Luaran Bukti dan periksa apakah bukti tersebut benar-benar mampu menjawab Pertanyaan Riset di kolom pertama.",
      "Sematkan tabel Matriks Keselarasan Riset di akhir Bab 1 atau awal Bab 3 proposal."
    ],
    "exercises": [
      {
        "question": "Mengapa kolom \"Metrik dan Kriteria Keberhasilan Kuantitatif\" dalam RAM wajib memiliki ambang batas numerik spesifik?",
        "hint": "Perhatikan kriteria pembeda antara proyek ilmiah eksperimental versus proyek instalasi hobi biasa.",
        "answerExplanation": "Ambang batas numerik spesifik (misal: akurasi > 92%, latency < 50 ms, konsumsi daya < 2 W) adalah kriteria batas demarkasi falsifikasi Popperian. Kriteria numerik ini menetapkan secara transparan sebelum eksperimen dimulai mengenai apa yang dianggap sebagai \"sukses\" versus \"gagal\", mencegah peneliti memanipulasi kesimpulan setelah melihat hasil data di lapangan."
      }
    ],
    "references": [
      {
        "citation": "Newman, I., & Covrig, D. (2013). Building consistency in research proposals: The alignment of purpose, questions, and methods. International Journal of Multiple Research Approaches, 7(1), 35-47.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Creswell, J. W., & Creswell, J. D. (2018). Research Design: Qualitative, Quantitative, and Mixed Methods Approaches. SAGE Publications.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Konstruksi Matriks Keselarasan Riset (Research Alignmen...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.8.2.",
          "Capaian: Membangun Matriks Keselarasan Riset (Research Alignment Matrix / RAM) yang terhubung erat.",
          "Capaian: Menyelaraskan secara bijective: Pertanyaan Riset -> Kebutuhan Data -> Metode Eksperimen -> Metrik Evaluasi ->...",
          "Capaian: Menggunakan RAM sebagai instrumen audit metodologis sebelum sidang proposal."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{T}_i = \\langle Q_i, \\, D_i, \\, M_i, \\, E_i, \\, L_i \\rangle$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Konstruksi Matriks Keselarasan Riset (Research Alignmen...",
        "bulletPoints": [
          "Matriks Keselarasan Riset (*Research Alignment Matrix* / RAM), atau sering disebut sebagai Matriks Konsistensi Metodologis, a...",
          "Setiap baris dalam Matriks Keselarasan Riset wajib memetakan 5 pilar secara horizontal: 1. Pertanyaan Penelitian Spesifik (Re...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Jika sebuah proposal mampu menyusun RAM yang solid dan tanpa celah, proposal tersebut hamp..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Jika sebuah proposal mampu menyusun RAM yang solid dan tanpa celah, proposal tersebut hampir dipastikan akan lolos evaluasi m...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Representasi Formal Matriks Keselarasan Riset sebagai Pemetaan Bijektif:",
          "Didefinisikan tupel keselarasan penelitian $\\mathcal{T}_i$:",
          "Kondisi Keselarasan Homomorfik Sistematis:"
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{T}_i = \\langle Q_i, \\, D_i, \\, M_i, \\, E_i, \\, L_i \\rangle$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Susun Matriks Keselarasan Riset (RAM) lengkap untuk proyek skripsi teknik elektro ITERA dengan judul: \"Optimasi Penjadwalan Pengisian Daya K...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Baris 1 - Karakterisasi Profil Beban):",
          "- Pertanyaan: Bagaimana pola fluktuasi profil beban dasar kelistrikan Gedung Kuliah ITERA?",
          "- Data: Rekaman daya aktif (kW) interval 15 menit selama 3 bulan dari smart meter PLN.",
          "Interpretasi: Setiap baris RAM memiliki keterikatan horizontal yang kokoh, menjamin bahwa tidak ada aktivitas pengumpulan data yang si..."
        ],
        "keyFormulaOrDiagram": "- Luaran: Tabel komparasi pembebanan trafo (Uncontrolled vs Fuzzy) dan kurva profil tegang..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Program validasi kelengkapan dan keterhubungan kolom Matriks Keselarasan Riset (RAM).",
          "Dependensi Pustaka: pandas",
          "Keluaran Diharapkan: MATRIKS KESELARASAN RISET (RESEARCH ALIGNMENT MATRIX):"
        ],
        "keyFormulaOrDiagram": "MATRIKS KESELARASAN RISET (RESEARCH ALIGNMENT MATRIX): | [RQ-1] Bagaimana pola fluktuasi b..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menuliskan metode pengujian yang sangat umum seperti \"menggunakan kecerdasan buatan\" tanpa menyebutkan algorit...",
          "Perangkap: Menetapkan metrik keberhasilan yang bersifat kualitatif subjektif seperti \"sistem berjalan dengan baik dan lan...",
          "Perangkap: Mengabaikan keterkaitan data input: merancang algoritma kompleks namun tidak menjelaskan dari mana data input..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Lakukan uji horizontal terbalik (*reverse audit*): mulai dari kolom Luaran Bukti dan periksa apakah bukti ters...",
          "Prosedur: Sematkan tabel Matriks Keselarasan Riset di akhir Bab 1 atau awal Bab 3 proposal."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa kolom \"Metrik dan Kriteria Keberhasilan Kuantitatif\" dalam RAM wajib memiliki ambang batas numerik spesifik?",
          "Petunjuk: Perhatikan kriteria pembeda antara proyek ilmiah eksperimental versus proyek instalasi hobi biasa.",
          "Solusi Kunci: Ambang batas numerik spesifik (misal: akurasi > 92%, latency < 50 ms, konsumsi daya < 2 W) adalah kriteria batas demarka..."
        ]
      }
    ]
  },
  "2.8.3": {
    "id": "2.8.3",
    "chapterId": "CH-15",
    "title": "Penjadwalan Kerja (Gantt Chart), Perencanaan Sumber Daya, dan Manajemen Risiko",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Menyusun jadwal penelitian menggunakan Gantt Chart berbasis Work Breakdown Structure (WBS).",
      "Menghitung Jalur Kritis (Critical Path Method / CPM) dan float waktu aktivitas.",
      "Membangun Matriks Penilaian Risiko (Risk Assessment Matrix) dan strategi rencana kontingensi."
    ],
    "content": "Sebuah proposal penelitian yang hebat secara teoretis tetap akan ditolak oleh komite pemberi hibah jika dewan penilai meragukan kelayakan eksekusi (*feasibility*) proyek tersebut. Banyak riset skripsi dan hibah penelitian mangkrak di tengah jalan karena kegagalan manajemen proyek: pesanan komponen mikrokontroler tertahan di bea cukai selama 3 bulan, sensor utama terbakar saat pengujian tanpa ada cadangan, atau waktu komputasi pelatihan model deep learning meleset dari 1 minggu menjadi 2 bulan.\n\nManajemen eksekusi riset yang profesional menuntut tiga perangkat operasional:\n1. Work Breakdown Structure (WBS) & Gantt Chart: Mendekomposisi proyek menjadi paket kerja diskrit (*work packages*), menetapkan dependensi antar-tugas (Finish-to-Start), dan memetakan tonggak capaian (*milestones*).\n2. Analisis Jalur Kritis (Critical Path Method / CPM): Mengidentifikasi urutan aktivitas terpanjang yang menentukan durasi total proyek. Setiap keterlambatan pada aktivitas di jalur kritis akan langsung memundurkan tanggal kelulusan atau batas akhir penyerahan laporan hibah.\n3. Matriks Manajemen Risiko Penelitian: Mengidentifikasi potensi risiko teknis, logistik, dan keselamatan kerja; mengukur probabilitas dan dampaknya; serta menyiapkan rencana mitigasi preventif dan rencana darurat kontingensi (*Plan B*).",
    "mathematicalFoundations": "1. Analisis Jalur Kritis (Critical Path Method):\nUntuk setiap aktivitas $i$ dengan durasi $D_i$:\n- Waktu Mulai Tercepat (*Early Start*): $ES_i = \\max_{p \\in \\text{Pred}(i)} (EF_p)$\n- Waktu Selesai Tercepat (*Early Finish*): $EF_i = ES_i + D_i$\n- Waktu Selesai Terlambat (*Late Finish*): $LF_i = \\min_{s \\in \\text{Succ}(i)} (LS_s)$\n- Waktu Mulai Terlambat (*Late Start*): $LS_i = LF_i - D_i$\n\nTotal Float (Kelonggaran Waktu):\n$$S_i = LS_i - ES_i = LF_i - EF_i$$\nAktivitas berada pada Jalur Kritis jika dan hanya jika $S_i = 0$.\n\n2. Nilai Kuantitatif Tingkat Keparahan Risiko (*Risk Severity Score*):\n$$\\mathcal{R} = P \\times I$$\nDi mana $P \\in \\{1, 2, \\dots, 5\\}$ adalah Probabilitas Keterjadian dan $I \\in \\{1, 2, \\dots, 5\\}$ adalah Dampak Keparahan (*Impact*). Risiko dengan $\\mathcal{R} \\ge 15$ wajib memiliki rencana kontingensi formal tertulis.",
    "workedExample": {
      "problemStatement": "Pada proyek riset radar kebocoran tanah ITERA, aktivitas kritis \"Pengiriman Modul Antena Ultra-Wideband Khusus dari Luar Negeri\" memiliki durasi pengiriman 8 minggu dengan probabilitas keterlambatan P = 4 (Tinggi) dan dampak terhadap kelulusan I = 5 (Fatal, proyek terhenti total). Hitung skor risiko R dan susun rencana mitigasi serta rencana kontingensinya.",
      "stepByStepSolution": [
        "Langkah 1: Hitung skor risiko: R = P * I = 4 * 5 = 20 (Kategori Risiko Kritis / Merah).",
        "Langkah 2: Rencana Mitigasi Preventif (Dilakukan sebelum masalah terjadi): Pesan komponen sejak hari pertama proposal disetujui; gunakan jasa pengiriman ekspres dengan pelacakan dokumen bea cukai prioritas.",
        "Langkah 3: Rencana Kontingensi / Plan B (Dilakukan jika komponen benar-benar tertahan/hilang): Siapkan rancangan antena mikrostrip cetak sendiri (PCB patch antenna) menggunakan mesin CNC PCB bengkel elektro ITERA sebagai instrumen alternatif cadangan.",
        "Langkah 4: Analisis kompromi Plan B: Antena cetak lokal memiliki bandwidth lebih sempit (resolusi kedalaman turun 15%), namun eksperimen tetap dapat diselesaikan tepat waktu tanpa membatalkan penelitian."
      ],
      "resultInterpretation": "Menyajikan rencana kontingensi Plan B yang realistis di dalam proposal membuktikan kematangan manajerial peneliti di mata dewan penguji."
    },
    "pythonImplementation": {
      "description": "Penghitungan Jalur Kritis (CPM) dan total float waktu pada jaringan aktivitas penelitian.",
      "libraryDependencies": [],
      "code": "# Jaringan aktivitas: {ID: [Durasi_Minggu, [Dependencies]]} [SIMULASI/SYNTHETIC DATA]\naktivitas = {\n    \"A_Studi_Pustaka\": [4, []],\n    \"B_Pemesanan_Sensor\": [8, []],\n    \"C_Fabrikasi_Rig\": [6, [\"A_Studi_Pustaka\"]],\n    \"D_Integrasi_Hardware\": [3, [\"B_Pemesanan_Sensor\", \"C_Fabrikasi_Rig\"]],\n    \"E_Pengujian_Lab\": [4, [\"D_Integrasi_Hardware\"]],\n    \"F_Penulisan_Laporan\": [3, [\"E_Pengujian_Lab\"]]\n}\n\n# Perhitungan Forward Pass (ES, EF)\nES = {}\nEF = {}\nfor act, (dur, preds) in aktivitas.items():\n    if not preds:\n        ES[act] = 0\n    else:\n        ES[act] = max(EF[p] for p in preds)\n    EF[act] = ES[act] + dur\n\ndurasi_total_proyek = max(EF.values())\n\n# Perhitungan Backward Pass (LF, LS)\nLF = {}\nLS = {}\nfor act in reversed(list(aktivitas.keys())):\n    succs = [k for k, v in aktivitas.items() if act in v[1]]\n    if not succs:\n        LF[act] = durasi_total_proyek\n    else:\n        LF[act] = min(LS[s] for s in succs)\n    LS[act] = LF[act] - aktivitas[act][0]\n\njalur_kritis = [act for act in aktivitas if ES[act] == LS[act]]\n\nprint(f\"DURASI TOTAL PROYEK PENELITIAN: {durasi_total_proyek} Minggu\")\nprint(\"-\" * 55)\nfor act in aktivitas:\n    float_time = LS[act] - ES[act]\n    status = \"**JALUR KRITIS**\" if float_time == 0 else f\"Float: {float_time} minggu\"\n    print(f\"- {act:22s} | Durasi: {aktivitas[act][0]}m | ES: {ES[act]:2d} | LF: {LF[act]:2d} | {status}\")\n\nprint(f\"\\nRute Jalur Kritis: {' -> '.join(jalur_kritis)}\")\n",
      "expectedOutput": "DURASI TOTAL PROYEK PENELITIAN: 18 Minggu\n-------------------------------------------------------\n- A_Studi_Pustaka        | Durasi: 4m | ES:  0 | LF:  5 | Float: 1 minggu\n- B_Pemesanan_Sensor     | Durasi: 8m | ES:  0 | LF:  8 | **JALUR KRITIS**\n- C_Fabrikasi_Rig        | Durasi: 6m | ES:  4 | LF: 11 | Float: 1 minggu\n- D_Integrasi_Hardware   | Durasi: 3m | ES:  8 | LF: 14 | **JALUR KRITIS**\n- E_Pengujian_Lab        | Durasi: 4m | ES: 11 | LF: 18 | **JALUR KRITIS**\n- F_Penulisan_Laporan    | Durasi: 3m | ES: 15 | LF: 18 | **JALUR KRITIS**\n\nRute Jalur Kritis: B_Pemesanan_Sensor -> D_Integrasi_Hardware -> E_Pengujian_Lab -> F_Penulisan_Laporan"
    },
    "commonPitfalls": [
      "Menyusun Gantt Chart yang tidak realistis dengan menumpuk seluruh analisis data dan penulisan naskah pada dua minggu terakhir semester.",
      "Mengabaikan ketergantungan sekuensial (misalnya menjadwalkan pengujian instrumen sebelum komponen fisik tiba di laboratorium).",
      "Mengisi tabel manajemen risiko dengan hal-hal sepele (seperti \"laptop terkena virus\") tanpa membahas kegagalan teknis metodologi."
    ],
    "validationProcedures": [
      "Tambahkan buffer waktu kontingensi sebesar 15% hingga 20% pada jadwal proyek untuk mengantisipasi keterlambatan tak terduga.",
      "Sertakan tonggak capaian konkret (*go/no-go milestone gates*) di mana kelanjutan riset dievaluasi secara formal."
    ],
    "exercises": [
      {
        "question": "Dalam Critical Path Method (CPM), apa arti dari aktivitas yang memiliki \"Total Float = 0\"?",
        "hint": "Perhatikan dampak keterlambatan aktivitas tersebut terhadap waktu penyelesaian akhir proyek.",
        "answerExplanation": "Aktivitas dengan Total Float = 0 berada tepat di atas Jalur Kritis (Critical Path). Artinya, aktivitas tersebut tidak memiliki kelonggaran waktu tunda sama sekali. Keterlambatan satu hari saja pada aktivitas ini akan langsung memundurkan tanggal penyelesaian akhir seluruh proyek penelitian."
      }
    ],
    "references": [
      {
        "citation": "Kerzner, H. (2017). Project Management: A Systems Approach to Planning, Scheduling, and Controlling (12th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "PMI. (2021). A Guide to the Project Management Body of Knowledge (PMBOK Guide - 7th ed.). Project Management Institute.",
        "type": "formal-standard"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Penjadwalan Kerja (Gantt Chart), Perencanaan Sumber Day...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.8.3.",
          "Capaian: Menyusun jadwal penelitian menggunakan Gantt Chart berbasis Work Breakdown Structure (WBS).",
          "Capaian: Menghitung Jalur Kritis (Critical Path Method / CPM) dan float waktu aktivitas.",
          "Capaian: Membangun Matriks Penilaian Risiko (Risk Assessment Matrix) dan strategi rencana kontingensi."
        ],
        "keyFormulaOrDiagram": "$$S_i = LS_i - ES_i = LF_i - EF_i$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Penjadwalan Kerja (Gantt Chart), Perencanaan Sumber Day...",
        "bulletPoints": [
          "Sebuah proposal penelitian yang hebat secara teoretis tetap akan ditolak oleh komite pemberi hibah jika dewan penilai meraguk...",
          "Manajemen eksekusi riset yang profesional menuntut tiga perangkat operasional: 1. Work Breakdown Structure (WBS) & Gantt Char...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ]
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Sebuah proposal penelitian yang hebat secara teoretis tetap akan ditolak oleh komite pemberi hibah jika dewan penilai meraguk...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "1. Analisis Jalur Kritis (Critical Path Method):",
          "Untuk setiap aktivitas $i$ dengan durasi $D_i$:",
          "- Waktu Mulai Tercepat (*Early Start*): $ES_i = \\max_{p \\in \\text{Pred}(i)} (EF_p)$"
        ],
        "keyFormulaOrDiagram": "$$S_i = LS_i - ES_i = LF_i - EF_i$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada proyek riset radar kebocoran tanah ITERA, aktivitas kritis \"Pengiriman Modul Antena Ultra-Wideband Khusus dari Luar Negeri\" memiliki du...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Hitung skor risiko: R = P * I = 4 * 5 = 20 (Kategori Risiko Kritis / Merah).",
          "Langkah 2: Rencana Mitigasi Preventif (Dilakukan sebelum masalah terjadi): Pesan komponen sejak hari pertama p...",
          "Langkah 3: Rencana Kontingensi / Plan B (Dilakukan jika komponen benar-benar tertahan/hilang): Siapkan rancang...",
          "Interpretasi: Menyajikan rencana kontingensi Plan B yang realistis di dalam proposal membuktikan kematangan manajerial peneliti di mat..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Analisis kompromi Plan B: Antena cetak lokal memiliki bandwidth lebih sempit (r..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Penghitungan Jalur Kritis (CPM) dan total float waktu pada jaringan aktivitas penelitian.",
          "Dependensi Pustaka: ",
          "Keluaran Diharapkan: DURASI TOTAL PROYEK PENELITIAN: 18 Minggu"
        ],
        "keyFormulaOrDiagram": "DURASI TOTAL PROYEK PENELITIAN: 18 Minggu | ----------------------------------------------..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menyusun Gantt Chart yang tidak realistis dengan menumpuk seluruh analisis data dan penulisan naskah pada dua...",
          "Perangkap: Mengabaikan ketergantungan sekuensial (misalnya menjadwalkan pengujian instrumen sebelum komponen fisik tiba d...",
          "Perangkap: Mengisi tabel manajemen risiko dengan hal-hal sepele (seperti \"laptop terkena virus\") tanpa membahas kegagalan..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Tambahkan buffer waktu kontingensi sebesar 15% hingga 20% pada jadwal proyek untuk mengantisipasi keterlambata...",
          "Prosedur: Sertakan tonggak capaian konkret (*go/no-go milestone gates*) di mana kelanjutan riset dievaluasi secara forma..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Dalam Critical Path Method (CPM), apa arti dari aktivitas yang memiliki \"Total Float = 0\"?",
          "Petunjuk: Perhatikan dampak keterlambatan aktivitas tersebut terhadap waktu penyelesaian akhir proyek.",
          "Solusi Kunci: Aktivitas dengan Total Float = 0 berada tepat di atas Jalur Kritis (Critical Path). Artinya, aktivitas tersebut tidak me..."
        ]
      }
    ]
  },
  "2.8.4": {
    "id": "2.8.4",
    "chapterId": "CH-15",
    "title": "Kriteria Penilaian Proposal oleh Reviewer Akademik dan Komite Hibah",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memahami rubrik evaluasi multi-kriteria dewan reviewer jurnal, sidang proposal, dan komite hibah (DIKTI, LPDP, NSF).",
      "Mengantisipasi 5 pertanyaan kritis jebakan metodologi yang sering diajukan dewan penguji.",
      "Menyusun strategi pertahanan proposal (*proposal defense strategy*) yang objektif dan berbasis bukti."
    ],
    "content": "Memahami sudut pandang dan rubrik evaluasi dewan penilai (*reviewer mindset*) adalah kunci sukses meloloskan proposal penelitian. Reviewer akademik dan komite pendanaan tidak membaca proposal dengan sikap kagum, melainkan dengan sikap skeptis metodologis yang ketat: mencari setiap potensi cacat logika, asumsi yang tidak berdasar, dan kelemahan pembuktian sebelum memberikan persetujuan atau alokasi dana publik.\n\nKomite hibah nasional (seperti DRTPM Kemendikbudristek, LPDP) dan internasional (seperti NSF, IEEE Foundation) secara konsisten menggunakan 4 kriteria evaluasi terbobot:\n1. Signifikansi Ilmiah dan Kebaruan (Scientific Significance & Novelty ~ 30%): Apakah penelitian ini menyelesaikan masalah nyata yang mendesak? Apakah ada kontribusi delta terhadap pengetahuan SOTA terkini, atau sekadar replikasi rutin?\n2. Kekokohan Metodologi (Methodological Rigor ~ 35%): Apakah rancangan eksperimen mampu menguji hipotesis secara adil? Apakah ancaman validitas internal dan eksternal telah dimitigasi? Apakah instrumen terkalibrasi dan jumlah sampel mencukupi secara statistik?\n3. Kelayakan Eksekusi dan Rekam Jejak (Feasibility & Track Record ~ 20%): Apakah fasilitas laboratorium, instrumen, dan keahlian tim memadai untuk menyelesaikan pekerjaan dalam batas waktu yang dijadwalkan?\n4. Dampak dan Diseminasi (Broader Impact & Open Science ~ 15%): Apakah data penelitian akan dibagikan sesuai prinsip FAIR? Apakah luaran riset berpeluang dipublikasikan pada jurnal bereputasi Q1/Q2 atau menghasilkan paten bernilai industri?",
    "mathematicalFoundations": "Model Evaluasi Multi-Kriteria Skor Terbobot Reviewer (*Reviewer Weighted Scoring Model*):\n\nSkor akhir proposal $\\mathcal{S}$ dinilai oleh panel $R$ reviewer independen:\n\n$$\\mathcal{S} = \\frac{1}{R} \\sum_{r=1}^R \\left( \\sum_{j=1}^M w_j \\cdot s_{r,j} \\right)$$\n\nDi mana:\n- $w_j$ adalah bobot kriteria ke-$j$ dengan $\\sum_{j=1}^M w_j = 1.0$.\n- $s_{r,j} \\in [0, 100]$ adalah skor yang diberikan reviewer $r$ untuk kriteria $j$.\n\nAmbang Batas Kelolosan Pendanaan (*Funding Cutoff Threshold*):\n$$\\text{Keputusan} = \\begin{cases} \\text{Diterima Didanai (Approved)}, & \\text{jika } \\mathcal{S} \\ge \\tau_{\\text{fund}} \\quad \\land \\quad \\forall j, \\; \\bar{s}_j \\ge \\tau_{\\min} \\\\ \\text{Revisi Mayor / Tolak}, & \\text{lainnya} \\end{cases}$$\nPerhatikan syarat konjungsi: nilai rendah pada kriteria metodologi ($s_{\\text{metodologi}} < 70$) merupakan *fatal flaw* yang langsung menggugurkan proposal meskipun skor signifikansi bernilai 100.",
    "workedExample": {
      "problemStatement": "Sebuah proposal riset dievaluasi oleh 2 reviewer dengan rubrik terbobot: Signifikansi (w1 = 0.30), Metodologi (w2 = 0.35), Kelayakan (w3 = 0.20), Dampak (w4 = 0.15). Reviewer 1 memberikan skor berturut-turut: [85, 90, 80, 85]. Reviewer 2 memberikan skor: [90, 60, 85, 80]. Ambang batas kelolosan adalah Skor Total >= 80.0 dan nilai rata-rata setiap kriteria tidak boleh di bawah 70.0. Tentukan keputusan akhir komite terhadap proposal ini.",
      "stepByStepSolution": [
        "Langkah 1: Hitung skor tertimbang Reviewer 1: S1 = (0.30*85) + (0.35*90) + (0.20*80) + (0.15*85) = 25.5 + 31.5 + 16.0 + 12.75 = 85.75.",
        "Langkah 2: Hitung skor tertimbang Reviewer 2: S2 = (0.30*90) + (0.35*60) + (0.20*85) + (0.15*80) = 27.0 + 21.0 + 17.0 + 12.00 = 77.00.",
        "Langkah 3: Hitung skor akhir rata-rata gabungan: S_total = (85.75 + 77.00) / 2 = 81.375 (Memenuhi syarat S >= 80.0).",
        "Langkah 4: Periksa syarat batas minimum per kriteria: Rata-rata Kriteria Metodologi: (90 + 60) / 2 = 75.0 (Lolos > 70.0). Namun Reviewer 2 memberikan nilai 60 (tanda fatal flaw).",
        "Langkah 5: Keputusan panel: Proposal lolos ambang agregat namun ditahan untuk klarifikasi metodologis (Status: Conditional Acceptance / Revisi Minor Terjadwal untuk merespons keberatan Reviewer 2)."
      ],
      "resultInterpretation": "Kelemahan metodologi pada Reviewer 2 menjadi fokus utama yang wajib diperbaiki sebelum dana penelitian dapat dicairkan."
    },
    "pythonImplementation": {
      "description": "Simulasi evaluasi panel reviewer multi-kriteria komite hibah penelitian.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\nbobot = np.array([0.30, 0.35, 0.20, 0.15])\nkriteria_nama = [\"Signifikansi\", \"Metodologi\", \"Kelayakan\", \"Dampak\"]\n\n# Skor reviewer [Reviewer 1, Reviewer 2] [SIMULASI/SYNTHETIC DATA]\nskor_r1 = np.array([85, 90, 80, 85])\nskor_r2 = np.array([90, 60, 85, 80])\n\nnilai_r1 = np.sum(bobot * skor_r1)\nnilai_r2 = np.sum(bobot * skor_r2)\nnilai_akhir = (nilai_r1 + nilai_r2) / 2.0\nrata_per_kriteria = (skor_r1 + skor_r2) / 2.0\n\nprint(f\"Skor Tertimbang Reviewer 1 : {nilai_r1:.2f}\")\nprint(f\"Skor Tertimbang Reviewer 2 : {nilai_r2:.2f}\")\nprint(f\"Skor Agregat Gabungan      : {nilai_akhir:.2f} / 100\")\nprint(\"-\" * 50)\nprint(\"Evaluasi Rata-rata per Kriteria:\")\nfor nama, rata in zip(kriteria_nama, rata_per_kriteria):\n    print(f\"- {nama:15s}: {rata:.1f} {'(Aman)' if rata >= 70 else '(PERINGATAN: Di Bawah Ambang!)'}\")\n",
      "expectedOutput": "Skor Tertimbang Reviewer 1 : 85.75\nSkor Tertimbang Reviewer 2 : 77.00\nSkor Agregat Gabungan      : 81.38 / 100\n--------------------------------------------------\nEvaluasi Rata-rata per Kriteria:\n- Signifikansi   : 87.5 (Aman)\n- Metodologi     : 75.0 (Aman)\n- Kelayakan      : 82.5 (Aman)\n- Dampak         : 82.5 (Aman)"
    },
    "commonPitfalls": [
      "Bersikap defensif secara emosional saat menghadapi kritik reviewer di ruang sidang alih-alih merespons dengan data dan bukti literatur.",
      "Mengabaikan format pedoman penulisan resmi hibah (seperti batas jumlah kata atau margin halaman) yang memicu diskualifikasi administratif.",
      "Tidak mencantumkan instrumen mitigasi risiko ketika mengajukan teknologi yang belum terbukti secara komersial."
    ],
    "validationProcedures": [
      "Gunakan formulir rubrik penilaian resmi komite untuk melakukan simulasi penilaian mandiri (*self-assessment*) sebelum pengiriman naskah.",
      "Siapkan berkas tabel tanggapan reviewer (*rebuttal matrix*) yang memetakan setiap kritik ke halaman revisi naskah secara transparan."
    ],
    "exercises": [
      {
        "question": "Ketika seorang reviewer sidang proposal menyatakan: \"Metode Anda tidak memiliki kebaruan karena algoritma X sudah pernah digunakan oleh peneliti Y\", bagaimana strategi jawaban ilmiah yang paling tepat?",
        "hint": "Gunakan formulasi delta kontribusi dan batas domain operasional yang telah dipelajari di CH-05.",
        "answerExplanation": "Peneliti tidak boleh membantah secara agresif, melainkan harus menyajikan matriks perbandingan fitur secara terukur: mengakui keunggulan peneliti Y pada domain aslinya, lalu menerangkan secara presisi perbedaan vektor delta kontribusi (misal: \"Peneliti Y menguji algoritma X pada citra medis beresolusi tinggi dengan komputasi cloud server, sedangkan penelitian kami memodifikasi algoritma X agar mampu mengatasi degradasi sinyal pantulan optis dinamis pada sistem mikrokontroler edge 1-Watt di lingkungan lapangan tropis\")."
      }
    ],
    "references": [
      {
        "citation": "National Science Foundation (NSF). (2020). Proposal & Award Policies & Procedures Guide (PAPPG). NSF 20-1.",
        "type": "guideline"
      },
      {
        "citation": "Kemendikbudristek. (2023). Panduan Penelitian dan Pengabdian kepada Masyarakat Edisi XIII. DRTPM.",
        "type": "guideline"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Kriteria Penilaian Proposal oleh Reviewer Akademik dan...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.8.4.",
          "Capaian: Memahami rubrik evaluasi multi-kriteria dewan reviewer jurnal, sidang proposal, dan komite hibah (DIKTI, LPDP,...",
          "Capaian: Mengantisipasi 5 pertanyaan kritis jebakan metodologi yang sering diajukan dewan penguji.",
          "Capaian: Menyusun strategi pertahanan proposal (*proposal defense strategy*) yang objektif dan berbasis bukti."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{S} = \\frac{1}{R} \\sum_{r=1}^R \\left( \\sum_{j=1}^M w_j \\cdot s_{r,j} \\right)$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Kriteria Penilaian Proposal oleh Reviewer Akademik dan...",
        "bulletPoints": [
          "Memahami sudut pandang dan rubrik evaluasi dewan penilai (*reviewer mindset*) adalah kunci sukses meloloskan proposal penelit...",
          "Komite hibah nasional (seperti DRTPM Kemendikbudristek, LPDP) dan internasional (seperti NSF, IEEE Foundation) secara konsist...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ]
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Memahami sudut pandang dan rubrik evaluasi dewan penilai (*reviewer mindset*) adalah kunci sukses meloloskan proposal penelit...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Model Evaluasi Multi-Kriteria Skor Terbobot Reviewer (*Reviewer Weighted Scoring Model*):",
          "Skor akhir proposal $\\mathcal{S}$ dinilai oleh panel $R$ reviewer independen:",
          "Di mana:"
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{S} = \\frac{1}{R} \\sum_{r=1}^R \\left( \\sum_{j=1}^M w_j \\cdot s_{r,j} \\right)$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah proposal riset dievaluasi oleh 2 reviewer dengan rubrik terbobot: Signifikansi (w1 = 0.30), Metodologi (w2 = 0.35), Kelayakan (w3 = 0...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Hitung skor tertimbang Reviewer 1: S1 = (0.30*85) + (0.35*90) + (0.20*80) + (0.15*85) = 25.5 + 31.5...",
          "Langkah 2: Hitung skor tertimbang Reviewer 2: S2 = (0.30*90) + (0.35*60) + (0.20*85) + (0.15*80) = 27.0 + 21.0...",
          "Langkah 3: Hitung skor akhir rata-rata gabungan: S_total = (85.75 + 77.00) / 2 = 81.375 (Memenuhi syarat S >=...",
          "Interpretasi: Kelemahan metodologi pada Reviewer 2 menjadi fokus utama yang wajib diperbaiki sebelum dana penelitian dapat dicairkan."
        ],
        "keyFormulaOrDiagram": "Langkah 5: Keputusan panel: Proposal lolos ambang agregat namun ditahan untuk klarifikasi..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi evaluasi panel reviewer multi-kriteria komite hibah penelitian.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: Skor Tertimbang Reviewer 1 : 85.75"
        ],
        "keyFormulaOrDiagram": "Skor Tertimbang Reviewer 1 : 85.75 | Skor Tertimbang Reviewer 2 : 77.00 | Skor Agregat Gab..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Bersikap defensif secara emosional saat menghadapi kritik reviewer di ruang sidang alih-alih merespons dengan...",
          "Perangkap: Mengabaikan format pedoman penulisan resmi hibah (seperti batas jumlah kata atau margin halaman) yang memicu d...",
          "Perangkap: Tidak mencantumkan instrumen mitigasi risiko ketika mengajukan teknologi yang belum terbukti secara komersial."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan formulir rubrik penilaian resmi komite untuk melakukan simulasi penilaian mandiri (*self-assessment*)...",
          "Prosedur: Siapkan berkas tabel tanggapan reviewer (*rebuttal matrix*) yang memetakan setiap kritik ke halaman revisi nas..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Ketika seorang reviewer sidang proposal menyatakan: \"Metode Anda tidak memiliki kebaruan karena algoritma X sudah pernah...",
          "Petunjuk: Gunakan formulasi delta kontribusi dan batas domain operasional yang telah dipelajari di CH-05.",
          "Solusi Kunci: Peneliti tidak boleh membantah secara agresif, melainkan harus menyajikan matriks perbandingan fitur secara terukur: men..."
        ]
      }
    ]
  }
};
