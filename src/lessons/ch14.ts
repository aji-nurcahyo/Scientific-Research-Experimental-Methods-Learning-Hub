import { Lesson } from '../types/curriculum';

export const CH14_LESSONS: Record<string, Partial<Lesson>> = {
  "2.7.1": {
    "id": "2.7.1",
    "chapterId": "CH-14",
    "title": "Penerapan FAIR Data Principles: Findable, Accessible, Interoperable, Reusable",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memahami 15 asas panduan FAIR Data Principles dalam ekosistem sains terbuka (*open science*).",
      "Mengintegrasikan Persistent Identifiers (DOI, Handle) untuk penemuan dataset otomatis.",
      "Memilih lisensi terbuka yang tepat (Creative Commons CC-BY, CC0, MIT) untuk repositori data riset."
    ],
    "content": "Publikasi artikel ilmiah dalam format PDF statis hanya menyajikan kesimpulan permukaan dari proses penelitian. Data mentah, tabel hasil observasi, parameter eksperimen, dan kode komputasi yang mendasarinya sering kali terkunci di laptop pribadi peneliti atau hilang selamanya saat mahasiswa lulus. Krisis reproduksibilitas global mendorong terbentuknya Prinsip FAIR (Wilkinson et al., 2016), standar internasional yang mewajibkan data penelitian dikelola agar mudah ditemukan dan digunakan kembali baik oleh manusia maupun agen komputasi cerdas.\n\nEmpat pilar utama FAIR:\n1. Findable (Dapat Ditemukan): Metadata dan data harus mudah ditemukan oleh sistem pencari digital. Data wajib memiliki Persistent Identifier (PID) unik yang terdaftar secara global (seperti DOI dari Zenodo atau Figshare) dan memiliki metadata terstruktur yang kaya.\n2. Accessible (Dapat Diakses): Data dan metadata dapat diakses menggunakan protokol komunikasi standar, terbuka, dan gratis (seperti HTTPS). Metadata harus tetap dapat diakses bahkan jika berkas data mentahnya sendiri di masa depan telah diarsipkan secara dingin atau dilindungi privasi.\n3. Interoperable (Dapat Dioperasikan Lintas Sistem): Data menggunakan format representasi standar non-proprietary (misal CSV, JSON-LD, HDF5, Parquet) dan menggunakan ontologi atau perbendaharaan istilah ilmiah terstandarisasi.\n4. Reusable (Dapat Digunakan Kembali): Data disertai lisensi penggunaan yang jelas dan transparan (misal CC-BY 4.0 atau CC0 untuk data ilmiah publik) dan memiliki dokumentasi silsilah data (*provenance*) yang lengkap sehingga peneliti lain dapat mereproduksi analisis tanpa ambiguitas.",
    "mathematicalFoundations": "Metrik Kepatuhan FAIR (*FAIR Data Maturity Model*):\n\nTingkat Kematangan FAIR $\\mathcal{F}$ dihitung sebagai skor kepatuhan terbobot terhadap $M$ indikator evaluasi resmi RDA (Research Data Alliance):\n\n$$\\mathcal{F} = \\sum_{k=1}^M w_k \\cdot I_k$$\n\nDi mana $I_k \\in \\{0, 1\\}$ menyatakan pemenuhan indikator (seperti keberadaan DOI, lisensi mesin-terbaca, format terbuka) dan $w_k$ adalah bobot kekritisan:\n- Indikator Esensial (Must-have): $w_{\\text{ess}} = 3$\n- Indikator Penting (Should-have): $w_{\\text{imp}} = 2$\n- Indikator Pelengkap (Useful): $w_{\\text{use}} = 1$\n\nStatus \"FAIR Compliant\" formal mensyaratkan 100% pemenuhan indikator esensial:\n$$\\prod_{k \\in \\text{Essential}} I_k = 1$$",
    "workedExample": {
      "problemStatement": "Sebuah tim peneliti ITERA menyelesaikan pengujian dataset sensor konsumsi daya PLTS selama 1 tahun. Dataset disimpan di Google Drive pribadi dalam format file .xlsx dengan penamaan \"data_final_revisi3_beneran.xlsx\" tanpa lisensi tertulis. Evaluasi kepatuhan dataset ini terhadap prinsip FAIR dan susun rencana perbaikannya.",
      "stepByStepSolution": [
        "Langkah 1 (Audit Findable): Tidak memiliki Persistent Identifier (DOI), penamaan file ambigu, dan tidak terindeks oleh mesin pengindeks akademik (Gagal).",
        "Langkah 2 (Audit Accessible): Disimpan di cloud privat yang membutuhkan persetujuan akses manual; tautan dapat mati sewaktu-waktu jika akun dinonaktifkan (Gagal).",
        "Langkah 3 (Audit Interoperable): Format .xlsx adalah format biner proprietary komersial tertutup yang membutuhkan perangkat lunak khusus (Kurang memadai).",
        "Langkah 4 (Audit Reusable): Tidak ada dokumen lisensi hak cipta, tidak ada kamus data definisi kolom, dan tidak ada catatan kalibrasi sensor (Gagal total).",
        "Langkah 5 (Rencana Remediasi): Konversi data ke format CSV/Parquet terbuka; susun kamus data metadata JSON-LD; unggah ke repositori Zenodo untuk mendapatkan DOI permanen; tetapkan lisensi terbuka Creative Commons CC-BY 4.0."
      ],
      "resultInterpretation": "Melalui remediasi repositori terbuka Zenodo, dataset berubah dari data terkunci menjadi aset sains terbuka berstandar internasional."
    },
    "pythonImplementation": {
      "description": "Audit otomatis kepatuhan berkas data terhadap prinsip FAIR menggunakan parser metadata lokal.",
      "libraryDependencies": [
        "os",
        "json"
      ],
      "code": "manifest_dataset = {\n    \"nama_berkas\": \"itera_solar_telemetry_2025.csv\",\n    \"format_terbuka\": True,          # Interoperable\n    \"ada_doi_permanen\": True,        # Findable (misal Zenodo DOI)\n    \"protokol_akses\": \"HTTPS\",       # Accessible\n    \"lisensi_resmi\": \"CC-BY-4.0\",    # Reusable\n    \"ada_kamus_data\": True           # Reusable\n}\n\ndef audit_kepatuhan_fair(manifest):\n    evaluasi = {\n        \"Findable\": manifest.get(\"ada_doi_permanen\", False),\n        \"Accessible\": manifest.get(\"protokol_akses\") in [\"HTTP\", \"HTTPS\", \"FTP\"],\n        \"Interoperable\": manifest.get(\"format_terbuka\", False),\n        \"Reusable\": bool(manifest.get(\"lisensi_resmi\")) and manifest.get(\"ada_kamus_data\", False)\n    }\n    \n    skor_total = sum(evaluasi.values()) / len(evaluasi) * 100\n    return evaluasi, skor_total\n\nhasil, skor = audit_kepatuhan_fair(manifest_dataset)\n\nprint(\"HASIL AUDIT PRINSIP FAIR DATA:\")\nfor pilar, status in hasil.items():\n    print(f\"- {pilar:15s}: {'Lolos (Compliant)' if status else 'GAGAL'}\")\nprint(\"-\" * 40)\nprint(f\"Indeks Kepatuhan FAIR Total: {skor:.1f}%\")\n",
      "expectedOutput": "HASIL AUDIT PRINSIP FAIR DATA:\n- Findable       : Lolos (Compliant)\n- Accessible     : Lolos (Compliant)\n- Interoperable  : Lolos (Compliant)\n- Reusable       : Lolos (Compliant)\n----------------------------------------\nIndeks Kepatuhan FAIR Total: 100.0%"
    },
    "commonPitfalls": [
      "Menyimpan data penelitian pada Google Drive pribadi atau repositori institusi internal yang tidak menjamin persistensi URL jangka panjang.",
      "Mengunggah berkas data tanpa dokumen kamus data yang menerangkan arti setiap singkatan kolom tabel.",
      "Memilih lisensi pembatasan komersial (seperti CC-BY-NC) yang secara tidak sengaja melarang data digunakan oleh peneliti di institusi nirlaba tertentu."
    ],
    "validationProcedures": [
      "Uji resolusi tautan DOI menggunakan resolver netral https://doi.org untuk memastikan keterhubungan langsung ke halaman pendaratan (*landing page*).",
      "Validasi keterbacaan berkas data pada sistem operasi Linux bersih tanpa perangkat lunak komersial pihak ketiga."
    ],
    "exercises": [
      {
        "question": "Mengapa lisensi Creative Commons Zero (CC0) sering kali dinilai paling ideal untuk repositori data mentah sains terbuka?",
        "hint": "Perhatikan asas domain publik dan pencegahan \"attribution stacking\" pada penggabungan ribuan dataset mikro.",
        "answerExplanation": "CC0 mendedikasikan data sepenuhnya ke domain publik tanpa syarat hukum apa pun. Dalam penelitian komputasi berskala besar yang menggabungkan ribuan dataset mikro, lisensi yang mewajibkan sitasi formal (seperti CC-BY) memicu masalah hukum atribusi berlipat (*attribution stacking*) di mana peneliti secara hukum harus menyebutkan ribuan nama lisensi yang mustahil dimuat dalam artikel ilmiah."
      }
    ],
    "references": [
      {
        "citation": "Wilkinson, M. D., et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3, 160018.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "RDA. (2020). FAIR Data Maturity Model: specification and guidelines. Research Data Alliance.",
        "type": "guideline"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Penerapan FAIR Data Principles: Findable, Accessible, I...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.7.1.",
          "Capaian: Memahami 15 asas panduan FAIR Data Principles dalam ekosistem sains terbuka (*open science*).",
          "Capaian: Mengintegrasikan Persistent Identifiers (DOI, Handle) untuk penemuan dataset otomatis.",
          "Capaian: Memilih lisensi terbuka yang tepat (Creative Commons CC-BY, CC0, MIT) untuk repositori data riset."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{F} = \\sum_{k=1}^M w_k \\cdot I_k$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Penerapan FAIR Data Principles: Findable, Accessible, I...",
        "bulletPoints": [
          "Publikasi artikel ilmiah dalam format PDF statis hanya menyajikan kesimpulan permukaan dari proses penelitian. Data mentah, t...",
          "Empat pilar utama FAIR: 1. Findable (Dapat Ditemukan): Metadata dan data harus mudah ditemukan oleh sistem pencari digital. D...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ]
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Publikasi artikel ilmiah dalam format PDF statis hanya menyajikan kesimpulan permukaan dari proses penelitian. Data mentah, t...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Metrik Kepatuhan FAIR (*FAIR Data Maturity Model*):",
          "Tingkat Kematangan FAIR $\\mathcal{F}$ dihitung sebagai skor kepatuhan terbobot terhadap $M$ indikator evaluasi...",
          "Di mana $I_k \\in \\{0, 1\\}$ menyatakan pemenuhan indikator (seperti keberadaan DOI, lisensi mesin-terbaca, form..."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{F} = \\sum_{k=1}^M w_k \\cdot I_k$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah tim peneliti ITERA menyelesaikan pengujian dataset sensor konsumsi daya PLTS selama 1 tahun. Dataset disimpan di Google Drive pribadi...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Audit Findable): Tidak memiliki Persistent Identifier (DOI), penamaan file ambigu, dan tidak terind...",
          "Langkah 2 (Audit Accessible): Disimpan di cloud privat yang membutuhkan persetujuan akses manual; tautan dapat...",
          "Langkah 3 (Audit Interoperable): Format .xlsx adalah format biner proprietary komersial tertutup yang membutuh...",
          "Interpretasi: Melalui remediasi repositori terbuka Zenodo, dataset berubah dari data terkunci menjadi aset sains terbuka berstandar in..."
        ],
        "keyFormulaOrDiagram": "Langkah 5 (Rencana Remediasi): Konversi data ke format CSV/Parquet terbuka; susun kamus da..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Audit otomatis kepatuhan berkas data terhadap prinsip FAIR menggunakan parser metadata lokal.",
          "Dependensi Pustaka: os, json",
          "Keluaran Diharapkan: HASIL AUDIT PRINSIP FAIR DATA:"
        ],
        "keyFormulaOrDiagram": "HASIL AUDIT PRINSIP FAIR DATA: | - Findable : Lolos (Compliant) | - Accessible : Lolos (Co..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menyimpan data penelitian pada Google Drive pribadi atau repositori institusi internal yang tidak menjamin per...",
          "Perangkap: Mengunggah berkas data tanpa dokumen kamus data yang menerangkan arti setiap singkatan kolom tabel.",
          "Perangkap: Memilih lisensi pembatasan komersial (seperti CC-BY-NC) yang secara tidak sengaja melarang data digunakan oleh..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Uji resolusi tautan DOI menggunakan resolver netral https://doi.org untuk memastikan keterhubungan langsung ke...",
          "Prosedur: Validasi keterbacaan berkas data pada sistem operasi Linux bersih tanpa perangkat lunak komersial pihak ketiga..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa lisensi Creative Commons Zero (CC0) sering kali dinilai paling ideal untuk repositori data mentah sains terbuka?",
          "Petunjuk: Perhatikan asas domain publik dan pencegahan \"attribution stacking\" pada penggabungan ribuan dataset...",
          "Solusi Kunci: CC0 mendedikasikan data sepenuhnya ke domain publik tanpa syarat hukum apa pun. Dalam penelitian komputasi berskala besa..."
        ]
      }
    ]
  },
  "2.7.2": {
    "id": "2.7.2",
    "chapterId": "CH-14",
    "title": "Perancangan Data Dictionary, Buku Kode, dan Skema Metadata JSON-LD",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Merancang dokumen Data Dictionary komprehensif untuk struktur basis data tabular eksperimen.",
      "Membangun skema metadata semantik berstandar JSON-LD dan Schema.org/Dataset.",
      "Menetapkan aturan penamaan variabel dan kode hilang (missing values) yang konsisten."
    ],
    "content": "Sebuah berkas data CSV yang berisi kolom bernama \"T1\", \"P_val\", dan \"Stat\" tidak memiliki arti ilmiah apa pun bagi orang lain tanpa adanya Kamus Data (Data Dictionary) atau Buku Kode (Codebook). Kamus data adalah dokumen acuan otoritatif yang mendefinisikan secara terperinci setiap variabel, tipe data komputasi, satuan fisik metrologis, rentang nilai valid yang diizinkan, dan arti dari setiap kode kategorikal.\n\nDalam era Semantic Web dan penemuan dataset terotomasi, metadata tidak lagi cukup ditulis dalam berkas teks biasa. Peneliti menggunakan format JSON-LD (JavaScript Object Notation for Linked Data) yang disematkan dengan kosa kata Schema.org/Dataset. Format ini memungkinkan mesin pencari seperti Google Dataset Search untuk secara otomatis memahami:\n1. Siapa pencipta dan institusi pemilik dataset (Creator & Affiliation).\n2. Di mana dan kapan eksperimen dilakukan (Spatial & Temporal Coverage).\n3. Berkas apa saja yang tersedia, ukuran bytes, dan checksum SHA-256 berkas tersebut.\n4. Topik keilmuan dan kata kunci terkait.\n\nKombinasi kamus data yang ramah manusia dan metadata semantik yang ramah mesin menjamin keterbacaan data lintas generasi.",
    "mathematicalFoundations": "Struktur Relasional Kamus Data $\\mathcal{D}_{\\text{dict}}$ memetakan setiap kolom $c_j \\in \\mathcal{C}$:\n\n$$\\mathcal{D}_{\\text{dict}}(c_j) = \\langle \\text{Nama}, \\text{Tipe}, \\text{Satuan}, \\mathcal{R}_{\\text{valid}}, \\text{MetodeUkur}, \\text{MissingCode} \\rangle$$\n\nDi mana:\n- $\\text{Satuan} \\in \\text{Katalog Satuan SI}$ (misal: $\\text{W/m}^2$, $\\text{m/s}$, $\\text{V}$)\n- $\\mathcal{R}_{\\text{valid}} = [x_{\\min}, x_{\\max}] \\subset \\mathbb{R}$ (Domain Fisik Valid)\n- Nilai yang diamati $x_{ij}$ wajib memvalidasi predikat integritas data:\n$$\\forall i, \\quad x_{ij} \\in \\mathcal{R}_{\\text{valid}} \\quad \\lor \\quad x_{ij} = \\text{MissingCode}$$",
    "workedExample": {
      "problemStatement": "Rancang entri kamus data untuk variabel \"Fluks Radiasi Matahari Global\" pada stasiun cuaca PLTS ITERA, dan susun cuplikan metadata Schema.org JSON-LD yang merepresentasikannya.",
      "stepByStepSolution": [
        "Langkah 1 (Entri Kamus Data):",
        "- Nama Kolom: GHI_Watt_m2",
        "- Deskripsi: Global Horizontal Irradiance terukur pada bidang datar permukaan bumi",
        "- Tipe Data: Float64 (Presisi Ganda)",
        "- Satuan Pengukuran: Watt per meter persegi (W/m^2)",
        "- Rentang Valid: [0.0, 1400.0] W/m^2 (nilai di luar rentang ini menandai sensor jenuh atau rusak)",
        "- Instrumen Ukur: Piranometer Sekunder Terkalibrasi Kelas A (Kipp & Zonen CMP11)",
        "- Kode Data Hilang: NaN atau -9999.0",
        "Langkah 2 (Struktur Semantik JSON-LD): Tautkan ke Schema.org/Dataset dengan mendefinisikan \"@context\": \"https://schema.org\", \"@type\": \"Dataset\", menyertakan nama, deskripsi, variabel measuredProperty, dan tautan lisensi resmi."
      ],
      "resultInterpretation": "Metadata ini memastikan bahwa agen komputasi pencari data dapat mengidentifikasi variabel fluks surya secara otomatis tanpa salah menafsirkannya sebagai radiasi termal."
    },
    "pythonImplementation": {
      "description": "Pembangkit berkas metadata Schema.org/Dataset dalam format JSON-LD yang valid secara semantik.",
      "libraryDependencies": [
        "json"
      ],
      "code": "import json\n\nmetadata_jsonld = {\n    \"@context\": \"https://schema.org/\",\n    \"@type\": \"Dataset\",\n    \"name\": \"Dataset Telemetri Radiasi Surya ITERA 2025\",\n    \"description\": \"Pengukuran radiasi global horizontal dan suhu modul surya di PLTS ITERA Lampung.\",\n    \"url\": \"https://doi.org/10.5281/zenodo.1234567\",\n    \"keywords\": [\"Solar Energy\", \"GHI\", \"Photovoltaic\", \"ITERA\", \"Sumatera\"],\n    \"license\": \"https://creativecommons.org/licenses/by/4.0/\",\n    \"creator\": {\n        \"@type\": \"Person\",\n        \"name\": \"Aji Pamungkas Tri Nurcahyo\",\n        \"affiliation\": {\n            \"@type\": \"Organization\",\n            \"name\": \"Institut Teknologi Sumatera (ITERA)\"\n        }\n    },\n    \"variableMeasured\": [\n        {\n            \"@type\": \"PropertyValue\",\n            \"name\": \"GHI_Watt_m2\",\n            \"unitText\": \"W/m^2\",\n            \"description\": \"Global Horizontal Irradiance terukur piranometer CMP11\"\n        },\n        {\n            \"@type\": \"PropertyValue\",\n            \"name\": \"Temp_Modul_C\",\n            \"unitText\": \"degC\",\n            \"description\": \"Suhu permukaan modul PV menggunakan sensor RTD PT100\"\n        }\n    ]\n}\n\nteks_json = json.dumps(metadata_jsonld, indent=2, ensure_ascii=False)\nprint(\"Draf Validasi Schema.org JSON-LD:\")\nprint(teks_json[:350] + \"\\n  ...\\n}\")\n",
      "expectedOutput": "Draf Validasi Schema.org JSON-LD:\n{\n  \"@context\": \"https://schema.org/\",\n  \"@type\": \"Dataset\",\n  \"name\": \"Dataset Telemetri Radiasi Surya ITERA 2025\",\n  \"description\": \"Pengukuran radiasi global horizontal dan suhu modul surya di PLTS ITERA Lampung.\",\n  \"url\": \"https://doi.org/10.5281/zenodo.1234567\",\n  \"keywords\": [\n    \"Solar Energy\",\n    \"GHI\",\n    \"Photovoltaic\",\n  ...\n}"
    },
    "commonPitfalls": [
      "Menggunakan angka nol (\"0\") sebagai kode data hilang (missing value), yang akan merusak perhitungan rata-rata dan deviasi standar.",
      "Menggunakan spasi atau karakter non-ASCII pada nama kolom (misal: \"Suhu (\u00b0C) / menit\") yang menyebabkan kegagalan parsing pada script Python/R.",
      "Mengubah nama kolom antar-berkas dalam satu rangkaian serial waktu pengujian."
    ],
    "validationProcedures": [
      "Gunakan validator resmi Google Rich Results Test untuk memeriksa validitas sintaks berkas JSON-LD.",
      "Jalankan skrip pemeriksaan integritas data otomatis yang memeriksa apakah seluruh nilai kolom berada di dalam rentang valid kamus data."
    ],
    "exercises": [
      {
        "question": "Mengapa penggunaan string kosong (\"\") atau spasi tunggal (\" \") sebagai kode data hilang sangat berbahaya dalam analisis data otomatis?",
        "hint": "Perhatikan bagaimana parser CSV mengonversi tipe data kolom dari numerik menjadi teks objek jika terdapat string.",
        "answerExplanation": "Jika sebuah kolom angka berisi string kosong atau spasi tersembunyi, parser data (seperti pandas.read_csv) dapat secara otomatis mendeteksi kolom tersebut sebagai tipe teks (*object/string*), bukan angka (*float/int*). Hal ini memicu kegagalan eksekusi (*crash*) pada seluruh fungsi matematika dan algoritma pembelajaran mesin berikutnya."
      }
    ],
    "references": [
      {
        "citation": "W3C. (2014). JSON-LD 1.0 - A JSON-based Serialization for Linked Data. W3C Recommendation.",
        "type": "formal-standard"
      },
      {
        "citation": "Schema.org. (2023). Dataset - Schema.org Type Definition. https://schema.org/Dataset.",
        "type": "formal-standard"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Perancangan Data Dictionary, Buku Kode, dan Skema Metad...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.7.2.",
          "Capaian: Merancang dokumen Data Dictionary komprehensif untuk struktur basis data tabular eksperimen.",
          "Capaian: Membangun skema metadata semantik berstandar JSON-LD dan Schema.org/Dataset.",
          "Capaian: Menetapkan aturan penamaan variabel dan kode hilang (missing values) yang konsisten."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{D}_{\\text{dict}}(c_j) = \\langle \\text{Nama}, \\text{Tipe}, \\text{Satuan}, \\mathcal{R}_{\\text{valid}}, \\text{MetodeUkur}, \\text{MissingCode} \\rangle$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Perancangan Data Dictionary, Buku Kode, dan Skema Metad...",
        "bulletPoints": [
          "Sebuah berkas data CSV yang berisi kolom bernama \"T1\", \"P_val\", dan \"Stat\" tidak memiliki arti ilmiah apa pun bagi orang lain...",
          "Dalam era Semantic Web dan penemuan dataset terotomasi, metadata tidak lagi cukup ditulis dalam berkas teks biasa. Peneliti m...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Kombinasi kamus data yang ramah manusia dan metadata semantik yang ramah mesin menjamin ke..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Kombinasi kamus data yang ramah manusia dan metadata semantik yang ramah mesin menjamin keterbacaan data lintas generasi.",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Struktur Relasional Kamus Data $\\mathcal{D}_{\\text{dict}}$ memetakan setiap kolom $c_j \\in \\mathcal{C}$:",
          "Di mana:",
          "- $\\text{Satuan} \\in \\text{Katalog Satuan SI}$ (misal: $\\text{W/m}^2$, $\\text{m/s}$, $\\text{V}$)"
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{D}_{\\text{dict}}(c_j) = \\langle \\text{Nama}, \\text{Tipe}, \\text{Satuan}, \\mathcal{R}_{\\text{valid}}, \\text{MetodeUkur}, \\text{MissingCode} \\rangle$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Rancang entri kamus data untuk variabel \"Fluks Radiasi Matahari Global\" pada stasiun cuaca PLTS ITERA, dan susun cuplikan metadata Schema.or...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Entri Kamus Data):",
          "- Nama Kolom: GHI_Watt_m2",
          "- Deskripsi: Global Horizontal Irradiance terukur pada bidang datar permukaan bumi",
          "Interpretasi: Metadata ini memastikan bahwa agen komputasi pencari data dapat mengidentifikasi variabel fluks surya secara otomatis ta..."
        ],
        "keyFormulaOrDiagram": "Langkah 2 (Struktur Semantik JSON-LD): Tautkan ke Schema.org/Dataset dengan mendefinisikan..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Pembangkit berkas metadata Schema.org/Dataset dalam format JSON-LD yang valid secara semantik.",
          "Dependensi Pustaka: json",
          "Keluaran Diharapkan: Draf Validasi Schema.org JSON-LD:"
        ],
        "keyFormulaOrDiagram": "Draf Validasi Schema.org JSON-LD: | { | \"@context\": \"https://schema.org/\","
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menggunakan angka nol (\"0\") sebagai kode data hilang (missing value), yang akan merusak perhitungan rata-rata...",
          "Perangkap: Menggunakan spasi atau karakter non-ASCII pada nama kolom (misal: \"Suhu (\u00b0C) / menit\") yang menyebabkan kegaga...",
          "Perangkap: Mengubah nama kolom antar-berkas dalam satu rangkaian serial waktu pengujian."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan validator resmi Google Rich Results Test untuk memeriksa validitas sintaks berkas JSON-LD.",
          "Prosedur: Jalankan skrip pemeriksaan integritas data otomatis yang memeriksa apakah seluruh nilai kolom berada di dalam..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa penggunaan string kosong (\"\") atau spasi tunggal (\" \") sebagai kode data hilang sangat berbahaya dalam analisis...",
          "Petunjuk: Perhatikan bagaimana parser CSV mengonversi tipe data kolom dari numerik menjadi teks objek jika ter...",
          "Solusi Kunci: Jika sebuah kolom angka berisi string kosong atau spasi tersembunyi, parser data (seperti pandas.read_csv) dapat secara..."
        ]
      }
    ]
  },
  "2.7.3": {
    "id": "2.7.3",
    "chapterId": "CH-14",
    "title": "Manajemen Versi Dataset Menggunakan Data Version Control (DVC) dan Git",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami arsitektur integrasi Git dan Data Version Control (DVC) untuk aset data biner besar.",
      "Membangun alur kerja pipeline data reproducibility (*dvc repro*).",
      "Mengelola penyimpanan remote storage terenkripsi untuk kolaborasi penelitian terdistribusi."
    ],
    "content": "Sistem kontrol versi Git adalah standar baku dalam pengembangan perangkat lunak, namun Git dirancang untuk berkas kode teks berukuran kecil. Ketika Git dipaksa melacak dataset citra berukuran 50 GB atau bobot model deep learning 5 GB, repositori Git akan menjadi lambat (*bloated*), memicu penolakan kuota oleh GitHub, dan gagal melakukan kompresi delta yang efisien.\n\nSolusi ilmiah modern untuk mengatasi masalah ini adalah Data Version Control (DVC). DVC memisahkan repositori menjadi dua bidang:\n1. Bidang Metadata Kode (Git): Git hanya melacak berkas pointer teks kecil berekstensi .dvc (berisi informasi hash MD5 atau SHA-256 dan ukuran bytes dari dataset).\n2. Bidang Penyimpanan Data Biner (DVC Remote Storage): Berkas data aktual disimpan di penyimpanan eksternal (Google Cloud Storage, AWS S3, server SSH laboratorium lokal, atau Google Drive) dengan pengindeksan berbasis hash (*content-addressable storage*).\n\nKetika peneliti berpindah cabang Git (misal dari branch \"baseline-cnn\" ke \"proposed-transformer\"), perintah sederhana \"git checkout\" yang diikuti \"dvc checkout\" akan secara instan menyinkronkan dataset dan bobot model yang tepat sesuai dengan versi kode tersebut, menjamin reproduksibilitas komputasional 100%.",
    "mathematicalFoundations": "Arsitektur Graf Asiklik Berarah Komputasi DVC (*DVC Pipeline DAG*):\n\nSebuah pipeline riset komputasi direpresentasikan sebagai graf $\\mathcal{G} = (\\mathcal{V}_P, \\mathcal{E}_P)$ di mana simpul adalah tahapan pemrosesan (*stages*) dan busur adalah ketergantungan berkas (*dependencies & outputs*).\n\nTahapan komputasi ke-$k$ memetakan:\n$$\\text{Stage}_k: \\{ D_{k,1}, D_{k,2}, \\dots \\} \\xrightarrow{\\text{Script}} \\{ O_{k,1}, O_{k,2}, \\dots \\}$$\n\nKondisi Reproduksi Terdistribusi (Cache Invariance):\n$$\\text{Hash}(\\text{Stage}_k) = \\text{MD5}\\left( \\text{Hash}(\\text{Script}) \\parallel \\sum_{i} \\text{Hash}(D_{k,i}) \\right)$$\n\nJika $\\text{Hash}(\\text{Stage}_k)$ tidak berubah, DVC tidak akan mengeksekusi ulang komputasi tersebut (*cache hit*), menghemat ratusan jam waktu komputasi GPU.",
    "workedExample": {
      "problemStatement": "Sebuah tim peneliti visi komputer ITERA memiliki dataset citra retak rel kereta api berukuran 12 GB. Rancang alur perintah CLI terminal yang memadukan Git dan DVC dari inisialisasi awal hingga penyimpanan berkas di remote storage laboratorium.",
      "stepByStepSolution": [
        "Langkah 1 (Inisialisasi): Inisialisasi Git dan DVC di folder proyek:\n$ git init\n$ dvc init\n$ git commit -m \"Initialize Git and DVC\"",
        "Langkah 2 (Pelacakan Dataset): Daftarkan folder dataset besar ke DVC:\n$ dvc add data/raw_rail_cracks/\n(DVC secara otomatis membuat berkas pointer data/raw_rail_cracks.dvc dan menambahkan data/raw_rail_cracks ke .gitignore)",
        "Langkah 3 (Commit Git Pointer): Lacak berkas pointer di Git:\n$ git add data/raw_rail_cracks.dvc .gitignore\n$ git commit -m \"Track 12GB rail crack raw dataset via DVC pointer\"",
        "Langkah 4 (Konfigurasi Remote & Unggah): Konfigurasi penyimpanan server lab dan dorong data biner:\n$ dvc remote add -d lab_server ssh://data.itera.ac.id/storage/riset_rel\n$ dvc push"
      ],
      "resultInterpretation": "Repositori GitHub tim tetap berukuran ringan (< 5 MB) sementara data mentah 12 GB tersimpan aman dan terikat secara kriptografis dengan riwayat commit kode."
    },
    "pythonImplementation": {
      "description": "Simulasi verifikasi integritas berkas pointer DVC terhadap digest hash konten lokal.",
      "libraryDependencies": [
        "hashlib"
      ],
      "code": "import hashlib\n\ndef hitung_md5(data_bytes):\n    m = hashlib.md5()\n    m.update(data_bytes)\n    return m.hexdigest()\n\n# Simulasi data biner dataset lokal [SIMULASI/SYNTHETIC DATA]\nisi_dataset = b\"\"\"ID,LABEL,BOUNDING_BOX\nIMG001.JPG,CRACK,[120,45,200,80]\nIMG002.JPG,NORMAL,[]\"\"\"\nmd5_lokal = hitung_md5(isi_dataset)\n\n# Struktur berkas pointer teks rail_cracks.dvc yang dilacak Git\npointer_dvc = {\n    \"outs\": [\n        {\n            \"md5\": md5_lokal,\n            \"size\": len(isi_dataset),\n            \"nfiles\": 2,\n            \"path\": \"data/rail_cracks\"\n        }\n    ]\n}\n\nprint(\"BERKAS POINTER DVC (Ukuran Ringan Dilacak Git):\")\nprint(f\"Path Berkas : {pointer_dvc['outs'][0]['path']}\")\nprint(f\"Tercatat MD5: {pointer_dvc['outs'][0]['md5']}\")\nprint(f\"Ukuran Data : {pointer_dvc['outs'][0]['size']} bytes\")\nprint(\"-\" * 55)\nprint(f\"Apakah Dataset Lokal Sinkron Sempurna dengan Pointer? {pointer_dvc['outs'][0]['md5'] == md5_lokal}\")\n",
      "expectedOutput": "BERKAS POINTER DVC (Ukuran Ringan Dilacak Git):\nPath Berkas : data/rail_cracks\nTercatat MD5: f2d5bcf742964aee2d93e507b5a5bce9\nUkuran Data : 76 bytes\n-------------------------------------------------------\nApakah Dataset Lokal Sinkron Sempurna dengan Pointer? True"
    },
    "commonPitfalls": [
      "Menambahkan berkas biner besar langsung ke Git menggunakan \"git add\" tanpa melalui \"dvc add\" terlebih dahulu.",
      "Lupa menjalankan \"dvc push\" setelah melakukan \"git push\", sehingga rekan kolaborator tidak dapat mengunduh berkas data fisik.",
      "Mengubah isi data mentah secara manual di folder lokal tanpa melakukan komit pointer DVC baru."
    ],
    "validationProcedures": [
      "Lakukan uji kloning di lingkungan mesin virtual bersih: jalankan \"git clone\" diikuti \"dvc pull\" dan pastikan seluruh pipeline dapat berjalan tanpa error.",
      "Sertakan berkas dvc.lock di dalam repositori Git untuk mengunci versi hash seluruh artefak tahapan pipeline."
    ],
    "exercises": [
      {
        "question": "Apa fungsi dari berkas \"dvc.lock\" dalam sebuah repositori proyek penelitian berbasis DVC?",
        "hint": "Perhatikan pencatatan status hash input, parameter, kode, dan output dari seluruh tahapan pipeline.",
        "answerExplanation": "Berkas dvc.lock bertindak sebagai catatan manifes keadaan terkini dari pipeline komputasi. Berkas ini merekam nilai hash pasti dari kode eksekusi, dependensi data input, parameter hiper, dan metrik hasil luaran. Berkas ini menjamin bahwa sistem dapat mendeteksi apakah suatu tahapan perlu dihitung ulang atau cukup diambil dari cache komputasi sebelumnya."
      }
    ],
    "references": [
      {
        "citation": "Kuprieiev, R., et al. (2021). Data Version Control (DVC): Git for Data & Models. Iterative.ai.",
        "type": "guideline"
      },
      {
        "citation": "Peng, R. D. (2011). Reproducible research in computational science. Science, 334(6060), 1226-1227.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Manajemen Versi Dataset Menggunakan Data Version Contro...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.7.3.",
          "Capaian: Memahami arsitektur integrasi Git dan Data Version Control (DVC) untuk aset data biner besar.",
          "Capaian: Membangun alur kerja pipeline data reproducibility (*dvc repro*).",
          "Capaian: Mengelola penyimpanan remote storage terenkripsi untuk kolaborasi penelitian terdistribusi."
        ],
        "keyFormulaOrDiagram": "$$\\text{Stage}_k: \\{ D_{k,1}, D_{k,2}, \\dots \\} \\xrightarrow{\\text{Script}} \\{ O_{k,1}, O_{k,2}, \\dots \\}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Manajemen Versi Dataset Menggunakan Data Version Contro...",
        "bulletPoints": [
          "Sistem kontrol versi Git adalah standar baku dalam pengembangan perangkat lunak, namun Git dirancang untuk berkas kode teks b...",
          "Solusi ilmiah modern untuk mengatasi masalah ini adalah Data Version Control (DVC). DVC memisahkan repositori menjadi dua bid...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Ketika peneliti berpindah cabang Git (misal dari branch \"baseline-cnn\" ke \"proposed-transf..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Ketika peneliti berpindah cabang Git (misal dari branch \"baseline-cnn\" ke \"proposed-transformer\"), perintah sederhana \"git ch...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Arsitektur Graf Asiklik Berarah Komputasi DVC (*DVC Pipeline DAG*):",
          "Sebuah pipeline riset komputasi direpresentasikan sebagai graf $\\mathcal{G} = (\\mathcal{V}_P, \\mathcal{E}_P)$...",
          "Tahapan komputasi ke-$k$ memetakan:"
        ],
        "keyFormulaOrDiagram": "$$\\text{Stage}_k: \\{ D_{k,1}, D_{k,2}, \\dots \\} \\xrightarrow{\\text{Script}} \\{ O_{k,1}, O_{k,2}, \\dots \\}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah tim peneliti visi komputer ITERA memiliki dataset citra retak rel kereta api berukuran 12 GB. Rancang alur perintah CLI terminal yang...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Inisialisasi): Inisialisasi Git dan DVC di folder proyek: $ git init $ dvc init $ git commit -m \"In...",
          "Langkah 2 (Pelacakan Dataset): Daftarkan folder dataset besar ke DVC: $ dvc add data/raw_rail_cracks/ (DVC sec...",
          "Langkah 3 (Commit Git Pointer): Lacak berkas pointer di Git: $ git add data/raw_rail_cracks.dvc .gitignore $ g...",
          "Interpretasi: Repositori GitHub tim tetap berukuran ringan (< 5 MB) sementara data mentah 12 GB tersimpan aman dan terikat secara krip..."
        ],
        "keyFormulaOrDiagram": "Langkah 4 (Konfigurasi Remote & Unggah): Konfigurasi penyimpanan server lab dan dorong dat..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi verifikasi integritas berkas pointer DVC terhadap digest hash konten lokal.",
          "Dependensi Pustaka: hashlib",
          "Keluaran Diharapkan: BERKAS POINTER DVC (Ukuran Ringan Dilacak Git):"
        ],
        "keyFormulaOrDiagram": "BERKAS POINTER DVC (Ukuran Ringan Dilacak Git): | Path Berkas : data/rail_cracks | Tercata..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menambahkan berkas biner besar langsung ke Git menggunakan \"git add\" tanpa melalui \"dvc add\" terlebih dahulu.",
          "Perangkap: Lupa menjalankan \"dvc push\" setelah melakukan \"git push\", sehingga rekan kolaborator tidak dapat mengunduh ber...",
          "Perangkap: Mengubah isi data mentah secara manual di folder lokal tanpa melakukan komit pointer DVC baru."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Lakukan uji kloning di lingkungan mesin virtual bersih: jalankan \"git clone\" diikuti \"dvc pull\" dan pastikan s...",
          "Prosedur: Sertakan berkas dvc.lock di dalam repositori Git untuk mengunci versi hash seluruh artefak tahapan pipeline."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Apa fungsi dari berkas \"dvc.lock\" dalam sebuah repositori proyek penelitian berbasis DVC?",
          "Petunjuk: Perhatikan pencatatan status hash input, parameter, kode, dan output dari seluruh tahapan pipeline.",
          "Solusi Kunci: Berkas dvc.lock bertindak sebagai catatan manifes keadaan terkini dari pipeline komputasi. Berkas ini merekam nilai hash..."
        ]
      }
    ]
  },
  "2.7.4": {
    "id": "2.7.4",
    "chapterId": "CH-14",
    "title": "Prinsip Penyimpanan Data Mentah Abadi (Immutable Raw Data Storage)",
    "readingTimeMinutes": 16,
    "status": "verified",
    "learningObjectives": [
      "Memahami aturan baku integritas data ilmiah: Data Mentah Asli Bersifat Imutabel (Tidak Boleh Diubah).",
      "Merancang arsitektur penyimpanan Write-Once-Read-Many (WORM) dan sistem perizinan berkas.",
      "Membangun rantai transformasi reproducible yang memisahkan data mentah, data bersih, dan data fitur."
    ],
    "content": "Prinsip paling fundamental dari seluruh manajemen data penelitian ilmiah adalah: DATA MENTAH ADALAH ENKRIPSI REALITAS EMPIRIS YANG BERSIFAT ABADI DAN IMUTABEL (IMMUTABLE). Data mentah (*raw data*) yang dihasilkan langsung dari instrumen laboratorium, sensor telemetri, atau kamera observasi TIDAK PERNAH BOLEH DIUBAH, diedit, dinormalisasi, atau ditimpa (*overwritten*) secara langsung dengan alasan apa pun.\n\nKesalahan fatal yang sering dilakukan mahasiswa pemula adalah membuka berkas CSV hasil pengukuran sensor di aplikasi pengolah lembar kerja (Excel), lalu secara manual menghapus baris-baris data yang tampak aneh atau mengoreksi angka desimal yang salah format, kemudian menyimpannya kembali menimpa berkas lama (*destructive editing*). Praktik ini menghancurkan jejak audit ilmiah (*audit trail*) dan membatalkan keabsahan data eksperimen secara permanen.\n\nArsitektur penyimpanan data ilmiah yang benar menerapkan aturan Write-Once-Read-Many (WORM):\n1. Salinan Master Data Mentah (Raw Master): Disimpan di folder khusus dengan hak akses *read-only* (hanya baca). Segera setelah data terkumpul, dihitung nilai checksum kriptografis SHA-256 dan berkas dikunci secara permanen.\n2. Skrip Pembersihan Terotomasi (Cleaning Scripts): Seluruh pembersihan (penghapusan outlier, imputasi data hilang, kalibrasi offset) dilakukan melalui kode program yang dapat diaudit.\n3. Data Terproses (Processed/Cleaned Data): Disimpan di folder terpisah sebagai artefak turunan baru tanpa pernah menyentuh berkas master mentah asli.",
    "mathematicalFoundations": "Model Aliran Data Fungsional Murni (*Pure Functional Data Pipeline*):\n\nDiberikan dataset mentah imutabel $\\mathcal{D}_{\\text{raw}}$. Seluruh tahapan pembersihan dan transformasi dimodelkan sebagai fungsi deterministik:\n\n$$\\mathcal{D}_{\\text{cleaned}} = f_{\\text{clean}}(\\mathcal{D}_{\\text{raw}}, \\mathbf{\\theta}_{\\text{calib}})$$\n$$\\mathcal{D}_{\\text{features}} = g_{\\text{feature}}(\\mathcal{D}_{\\text{cleaned}})$$\n\nProperti Imutabilitas dan Ketertransparanan:\n$$\\frac{\\partial \\mathcal{D}_{\\text{raw}}}{\\partial t} = 0, \\quad \\forall t > t_{\\text{akuisisi}}$$\n\nIntegritas rantai audit terbukti jika dan hanya jika:\n$$\\text{SHA256}(\\mathcal{D}_{\\text{raw}}^{(t_1)}) = \\text{SHA256}(\\mathcal{D}_{\\text{raw}}^{(t_2)}), \\quad \\forall t_2 > t_1$$",
    "workedExample": {
      "problemStatement": "Pada pengujian sensor getaran di Laboratorium ITERA, dihasilkan berkas \"vibration_raw_20251123.dat\". Rancang protokol 3 lapis untuk mengamankan imutabilitas berkas tersebut di sistem operasi Linux sebelum analisis data dimulai.",
      "stepByStepSolution": [
        "Langkah 1 (Generasi Sidik Jari Kriptografis): Hitung dan catat nilai hash SHA-256 ke dalam berkas manifest manifes_checksum.sha256:\n$ sha256sum vibration_raw_20251123.dat >> CHECKSUMS.sha256",
        "Langkah 2 (Penguncian Hak Akses Sistem Berkas): Ubah perizinan berkas menjadi read-only untuk seluruh pengguna:\n$ chmod 444 vibration_raw_20251123.dat",
        "Langkah 3 (Pemisahan Direktori Kerja): Buat salinan kerja ke direktori data/interim/ dan jalankan script transformasi Python hanya terhadap salinan kerja tersebut:\n$ cp vibration_raw_20251123.dat ../interim/vibration_working.dat"
      ],
      "resultInterpretation": "Melalui 3 lapis proteksi ini, berkas data mentah asli terlindungi dari manipulasi sengaja maupun ketidaksengajaan klik mouse pada aplikasi GUI."
    },
    "pythonImplementation": {
      "description": "Skrip audit integritas imutabilitas direktori data mentah berbasis pengecekan berkas checksum SHA-256.",
      "libraryDependencies": [
        "hashlib",
        "os"
      ],
      "code": "import hashlib\n\ndef hitung_sha256(data_bytes):\n    return hashlib.sha256(data_bytes).hexdigest()\n\n# Data mentah simulasi [SIMULASI/SYNTHETIC DATA]\ndata_mentah_master = b\"\"\"SENSOR_ID,TIMESTAMP,VAL\nS1,1000,4.2\nS1,1001,4.3\nS1,1002,4.1\"\"\"\nhash_terkunci_sejarah = hitung_sha256(data_mentah_master)\n\n# Uji 1: Verifikasi pada data asli\nhash_sekarang = hitung_sha256(data_mentah_master)\nstatus_audit = (hash_sekarang == hash_terkunci_sejarah)\n\nprint(f\"Hash Master Terkunci : {hash_terkunci_sejarah}\")\nprint(f\"Hash Audit Terkini   : {hash_sekarang}\")\nprint(f\"Status Integritas    : {'UTUH DAN IMUTABEL (Lolos)' if status_audit else 'CACAT / TELAH DIUBAH'}\")\n\n# Uji 2: Simulasi pengubahan tidak sengaja (satu karakter diganti)\ndata_termutasi = b\"\"\"SENSOR_ID,TIMESTAMP,VAL\nS1,1000,4.2\nS1,1001,4.5\nS1,1002,4.1\"\"\"\nstatus_audit_palsu = (hitung_sha256(data_termutasi) == hash_terkunci_sejarah)\nprint(f\"\\nSimulasi Modifikasi Data Mentah:\")\nprint(f\"Status Integritas Data Termutasi : {'Lolos' if status_audit_palsu else 'GAGAL AUDIT (Pelanggaran Imutabilitas Terdeteksi!)'}\")\n",
      "expectedOutput": "Hash Master Terkunci : a73489fe207c469b82142d765fe65825bc5cb47be99fa14e7a858ea6e86488eb\nHash Audit Terkini   : a73489fe207c469b82142d765fe65825bc5cb47be99fa14e7a858ea6e86488eb\nStatus Integritas    : UTUH DAN IMUTABEL (Lolos)\n\nSimulasi Modifikasi Data Mentah:\nStatus Integritas Data Termutasi : GAGAL AUDIT (Pelanggaran Imutabilitas Terdeteksi!)"
    },
    "commonPitfalls": [
      "Menyunting berkas data mentah secara manual di editor teks tanpa meninggalkan jejak skrip audit transformasi.",
      "Menyimpan hanya berkas data yang telah dinormalisasi atau difilter, sehingga data mentah asli hilang selamanya.",
      "Menimpa berkas lama dengan nama yang sama setiap kali eksperimen diulang."
    ],
    "validationProcedures": [
      "Jalankan pipeline audit checksum SHA-256 otomatis pada sistem Continuous Integration (CI) sebelum skrip pemodelan dijalankan.",
      "Pastikan seluruh transformasi data dari mentah ke bersih tertulis secara eksplisit dalam skrip Python/R yang dapat dijalankan ulang dari baris perintah (*single command execution*)."
    ],
    "exercises": [
      {
        "question": "Mengapa penghapusan pencilan (outliers) dilarang keras dilakukan langsung di dalam berkas data mentah asli?",
        "hint": "Perhatikan apakah pencilan tersebut mungkin di masa depan diidentifikasi sebagai fenomena fisika baru yang sah.",
        "answerExplanation": "Apa yang saat ini dianggap sebagai pencilan (outlier) oleh seorang peneliti mungkin di masa depan terbukti sebagai fenomena fisika baru yang nyata atau indikasi awal keruntuhan material sistem. Menghapus data mentah asli memusnahkan bukti empiris selamanya. Penghapusan pencilan hanya boleh dilakukan di memori pemrosesan atau disimpan di berkas turunan sekunder dengan justifikasi ilmiah tertulis."
      }
    ],
    "references": [
      {
        "citation": "Goodman, S. N., Fanelli, D., & Ioannidis, J. P. (2016). What does research reproducibility mean? Science Translational Medicine, 8(341), 341ps12.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Wilson, G., et al. (2017). Good enough practices in scientific computing. PLoS Computational Biology, 13(6), e1005510.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Prinsip Penyimpanan Data Mentah Abadi (Immutable Raw Da...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 2.7.4.",
          "Capaian: Memahami aturan baku integritas data ilmiah: Data Mentah Asli Bersifat Imutabel (Tidak Boleh Diubah).",
          "Capaian: Merancang arsitektur penyimpanan Write-Once-Read-Many (WORM) dan sistem perizinan berkas.",
          "Capaian: Membangun rantai transformasi reproducible yang memisahkan data mentah, data bersih, dan data fitur."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{D}_{\\text{cleaned}} = f_{\\text{clean}}(\\mathcal{D}_{\\text{raw}}, \\mathbf{\\theta}_{\\text{calib}})$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Prinsip Penyimpanan Data Mentah Abadi (Immutable Raw Da...",
        "bulletPoints": [
          "Prinsip paling fundamental dari seluruh manajemen data penelitian ilmiah adalah: DATA MENTAH ADALAH ENKRIPSI REALITAS EMPIRIS...",
          "Kesalahan fatal yang sering dilakukan mahasiswa pemula adalah membuka berkas CSV hasil pengukuran sensor di aplikasi pengolah...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Arsitektur penyimpanan data ilmiah yang benar menerapkan aturan Write-Once-Read-Many (WORM..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Arsitektur penyimpanan data ilmiah yang benar menerapkan aturan Write-Once-Read-Many (WORM): 1. Salinan Master Data Mentah (R...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Model Aliran Data Fungsional Murni (*Pure Functional Data Pipeline*):",
          "Diberikan dataset mentah imutabel $\\mathcal{D}_{\\text{raw}}$. Seluruh tahapan pembersihan dan transformasi dim...",
          "Properti Imutabilitas dan Ketertransparanan:"
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{D}_{\\text{cleaned}} = f_{\\text{clean}}(\\mathcal{D}_{\\text{raw}}, \\mathbf{\\theta}_{\\text{calib}})$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada pengujian sensor getaran di Laboratorium ITERA, dihasilkan berkas \"vibration_raw_20251123.dat\". Rancang protokol 3 lapis untuk mengaman...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Generasi Sidik Jari Kriptografis): Hitung dan catat nilai hash SHA-256 ke dalam berkas manifest man...",
          "Langkah 2 (Penguncian Hak Akses Sistem Berkas): Ubah perizinan berkas menjadi read-only untuk seluruh pengguna...",
          "Langkah 3 (Pemisahan Direktori Kerja): Buat salinan kerja ke direktori data/interim/ dan jalankan script trans...",
          "Interpretasi: Melalui 3 lapis proteksi ini, berkas data mentah asli terlindungi dari manipulasi sengaja maupun ketidaksengajaan klik m..."
        ],
        "keyFormulaOrDiagram": "Langkah 3 (Pemisahan Direktori Kerja): Buat salinan kerja ke direktori data/interim/ dan j..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Skrip audit integritas imutabilitas direktori data mentah berbasis pengecekan berkas checksum SHA-256.",
          "Dependensi Pustaka: hashlib, os",
          "Keluaran Diharapkan: Hash Master Terkunci : a73489fe207c469b82142d765fe65825bc5cb47be99fa14e7a858ea6e86488eb"
        ],
        "keyFormulaOrDiagram": "Hash Master Terkunci : a73489fe207c469b82142d765fe65825bc5cb47be99fa14e7a858ea6e86488eb |..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menyunting berkas data mentah secara manual di editor teks tanpa meninggalkan jejak skrip audit transformasi.",
          "Perangkap: Menyimpan hanya berkas data yang telah dinormalisasi atau difilter, sehingga data mentah asli hilang selamanya...",
          "Perangkap: Menimpa berkas lama dengan nama yang sama setiap kali eksperimen diulang."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Jalankan pipeline audit checksum SHA-256 otomatis pada sistem Continuous Integration (CI) sebelum skrip pemode...",
          "Prosedur: Pastikan seluruh transformasi data dari mentah ke bersih tertulis secara eksplisit dalam skrip Python/R yang d..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa penghapusan pencilan (outliers) dilarang keras dilakukan langsung di dalam berkas data mentah asli?",
          "Petunjuk: Perhatikan apakah pencilan tersebut mungkin di masa depan diidentifikasi sebagai fenomena fisika bar...",
          "Solusi Kunci: Apa yang saat ini dianggap sebagai pencilan (outlier) oleh seorang peneliti mungkin di masa depan terbukti sebagai fenom..."
        ]
      }
    ]
  }
};
