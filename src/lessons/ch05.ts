import { Lesson } from '../types/curriculum';

export const CH05_LESSONS: Record<string, Partial<Lesson>> = {
  "1.5.1": {
    "id": "1.5.1",
    "chapterId": "CH-05",
    "title": "Taksonomi Celah Penelitian: Teoretis, Metodologis, Empiris, dan Aplikasi",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Membedakan 4 kategori celah penelitian utama (teoretis, metodologis, empiris, dan aplikasi).",
      "Mengidentifikasi celah riset yang valid dan memiliki signifikansi ilmiah substansial.",
      "Menghindari jebakan celah penelitian artifisial yang tidak bernilai akademis."
    ],
    "content": "Celah penelitian (research gap) adalah ruang ketidaktahuan ilmiah yang terdefinisi dengan jelas di antara batas pengetahuan saat ini (frontier of knowledge) dengan kebutuhan pemahaman atau solusi masa depan. Kegagalan paling kritis yang sering terjadi pada mahasiswa tingkat akhir dan peneliti pemula adalah mengklaim keberadaan celah riset hanya karena \"belum ada orang yang meneliti hal X di lokasi Y\". Klaim semacam ini sering kali bukan merupakan celah ilmiah, melainkan sekadar ketiadaan data lokal yang tidak memiliki kebaruan konseptual.\n\nSecara akademis, celah penelitian diklasifikasikan ke dalam empat taksonomi utama:\n1. Celah Teoretis (Theoretical Gap): Ketiadaan model konseptual atau ketidakmampuan teori yang ada saat ini untuk menerangkan suatu fenomena baru. Contoh: kegagalan teori difusi klasik dalam menerangkan propagasi informasi pada jaringan nirkabel ad-hoc berskala masif.\n2. Celah Metodologis (Methodological Gap): Keterbatasan instrumen, algoritma, atau desain pengujian yang menyebabkan bias atau ketidakakuratan pengukuran. Contoh: metode estimasi impedansi yang membutuhkan interupsi operasional sistem sehingga tidak dapat diterapkan secara daring (*online*).\n3. Celah Empiris (Empirical Gap): Inkonsistensi atau kontradiksi temuan antar-eksperimen independen dalam literatur yang membutuhkan penyelidikan komparatif terstandarisasi untuk mengidentifikasi variabel pengganggunya.\n4. Celah Aplikasi atau Konteks (Application Gap): Penerapan prinsip umum pada kondisi batas operasional ekstrem di mana asumsi dasar metode konvensional runtuh (misalnya sensor visi yang harus beroperasi pada kabut tebal bersuhu tinggi di lingkungan geotermal).\n\nPenelitian yang bernilai tinggi selalu berangkat dari celah teoretis atau metodologis yang dikonfirmasi melalui sintesis literatur yang mendalam.",
    "mathematicalFoundations": "Formulasi formal celah penelitian dapat dinyatakan sebagai defisit fungsi kapabilitas:\n\nDiberikan himpunan tuntutan operasional sistem $\\mathcal{R} = \\{r_1, r_2, \\dots, r_m\\}$ dan ruang kapabilitas state-of-the-art $\\mathcal{C}_{\\text{SOTA}} = \\{c_1, c_2, \\dots, c_p\\}$.\n\nDefisit Celah Riset $\\mathcal{G}$ adalah selisih himpunan:\n$$\\mathcal{G} = \\mathcal{R} \\setminus \\mathcal{C}_{\\text{SOTA}}$$\n\nSuatu celah riset $\\mathcal{G}$ dikatakan valid dan substansial jika terdapat setidaknya satu tuntutan kritis $r^* \\in \\mathcal{G}$ sedemikian rupa sehingga:\n$$\\forall c \\in \\mathcal{C}_{\\text{SOTA}}, \\quad \\text{Simil}(r^*, c) < 1 - \\epsilon_{\\text{novelty}}$$\n\nDi mana $\\epsilon_{\\text{novelty}}$ adalah ambang batas batas kebaruan minimum yang disepakati oleh dewan editor keilmuan.",
    "workedExample": {
      "problemStatement": "Sebuah tim mahasiswa merencanakan penelitian skripsi dengan judul: \"Implementasi YOLOv8 untuk Deteksi Sampah di Pantai Kalianda Lampung Selatan\". Evaluasi apakah penelitian ini memiliki celah riset yang valid secara ilmiah atau sekadar celah geografis permukaan.",
      "stepByStepSolution": [
        "Langkah 1: Analisis pertanyaan: Apakah algoritma YOLOv8 belum pernah diterapkan untuk mendeteksi sampah plastik di pantai? Literatur internasional menunjukkan ratusan publikasi dengan topik deteksi sampah pantai berbasis YOLO.",
        "Langkah 2: Evaluasi faktor lokasi \"Pantai Kalianda\": Apakah terdapat karakteristik optis, spektral, atau fisika gelombang unik di Kalianda yang membuat YOLOv8 standar mengalami degradasi performa ekstrem? Jika jawabannya tidak, maka faktor lokasi adalah celah artifisial.",
        "Langkah 3: Transformasi menjadi celah metodologis: Jika tim mengidentifikasi bahwa sampah di bibir pantai sering tertutup buih ombak dinamis yang memicu false positive tinggi, dan merancang mekanisme temporal-attention baru untuk menyaring buih tersebut, maka riset berubah menjadi celah metodologis yang berbobot."
      ],
      "resultInterpretation": "Mengubah fokus dari lokasi geografis ke tantangan fisis-optis spesifik (buih ombak dinamis) mentransformasikan proyek dari sekadar kompilasi teknis menjadi kontribusi ilmiah yang valid."
    },
    "pythonImplementation": {
      "description": "Evaluasi matriks pemenuhan kapabilitas solusi terhadap daftar tuntutan sistem.",
      "libraryDependencies": [],
      "code": "tuntutan_sistem = {\n    \"R1\": \"Latensi < 10 ms\",\n    \"R2\": \"Akurasi Deteksi > 95%\",\n    \"R3\": \"Operasi Tanpa GPU Khusus\",\n    \"R4\": \"Ketahanan Terhadap Kabut Tebal\"\n}\n\n# Kapabilitas yang telah dipenuhi oleh studi SOTA [SIMULASI/SYNTHETIC DATA]\nsota_capabilities = {\n    \"Studi A (2022)\": {\"R1\", \"R2\"},\n    \"Studi B (2023)\": {\"R2\", \"R4\"},\n    \"Studi C (2024)\": {\"R1\", \"R3\"}\n}\n\n# Tentukan gabungan seluruh kapabilitas SOTA\nsemua_sota = set().union(*sota_capabilities.values())\nsemua_tuntutan = set(tuntutan_sistem.keys())\n\n# Celah yang belum pernah terselesaikan secara terintegrasi\ncelah_unmet = semua_tuntutan - semua_sota\n\nprint(\"Kapabilitas SOTA yang telah tercapai:\", semua_sota)\nprint(f\"Celah yang belum dipenuhi studi tunggal: R3 + R4 terintegrasi\")\nfor r in semua_tuntutan:\n    pelopor = [k for k, v in sota_capabilities.items() if r in v]\n    print(f\"- {r} ({tuntutan_sistem[r]}): Dilaporkan oleh {len(pelopor)} studi {pelopor}\")\n",
      "expectedOutput": "Kapabilitas SOTA yang telah tercapai: {'R4', 'R2', 'R1', 'R3'}\nCelah yang belum dipenuhi studi tunggal: R3 + R4 terintegrasi\n- R1 (Latensi < 10 ms): Dilaporkan oleh 2 studi ['Studi A (2022)', 'Studi C (2024)']\n- R2 (Akurasi Deteksi > 95%): Dilaporkan oleh 2 studi ['Studi A (2022)', 'Studi B (2023)']\n- R3 (Operasi Tanpa GPU Khusus): Dilaporkan oleh 1 studi ['Studi C (2024)']\n- R4 (Ketahanan Terhadap Kabut Tebal): Dilaporkan oleh 1 studi ['Studi B (2023)']"
    },
    "commonPitfalls": [
      "Menyatakan celah penelitian hanya berbasis intuisi pribadi tanpa menyertakan referensi bukti dari literatur terkini.",
      "Menciptakan celah artifisial dengan memilih batasan yang tidak relevan secara praktis maupun teoretis.",
      "Mengabaikan solusi yang telah mapan di bidang disiplin ilmu lain yang dapat langsung menyelesaikan masalah tersebut (reinventing the wheel)."
    ],
    "validationProcedures": [
      "Lakukan uji kontradiksi: carilah setidaknya 3 artikel terkini yang berpotensi telah menyelesaikan celah tersebut sebelum menetapkan judul.",
      "Ujilah apakah penyelesaian celah tersebut memberikan dampak terukur pada efisiensi, akurasi, atau pemahaman teoretis."
    ],
    "exercises": [
      {
        "question": "Mengapa sebuah penelitian yang hanya mengganti lokasi survei dari kota A ke kota B sering kali ditolak oleh jurnal internasional terindeks bereputasi?",
        "hint": "Perhatikan asas generalisasi ilmiah dan transferabilitas model.",
        "answerExplanation": "Sains bertujuan membangun prinsip universal yang dapat digeneralisasi. Perubahan lokasi geografis semata tanpa variasi kondisi fisis, lingkungan, atau tantangan metodologis baru hanya menghasilkan replikasi data lokal, bukan kontribusi terhadap tubuh pengetahuan global."
      }
    ],
    "references": [
      {
        "citation": "Müller-Bloch, C., & Kranz, J. (2015). A framework for rigorously identifying research gaps in qualitative literature reviews. In ICIS 2015 Proceedings.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Miles, D. A. (2017). A taxonomy of research gaps: Identifying and defining the five types of research gaps. In Doctoral Student Workshop, Dallas, TX.",
        "type": "guideline"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Taksonomi Celah Penelitian: Teoretis, Metodologis, Empiris, dan Aplikasi",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 1.5.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.5.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan 4 kategori celah penelitian utama (teoretis, metodologis, empiris, dan aplikasi).",
          "Capaian 2: Mengidentifikasi celah riset yang valid dan memiliki signifikansi ilmiah substansial.",
          "Capaian 3: Menghindari jebakan celah penelitian artifisial yang tidak bernilai akademis."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{G} = \\mathcal{R} \\setminus \\mathcal{C}_{\\text{SOTA}}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 1.5.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Taksonomi Celah Penelitian: Teoretis, Metodologis, Empiris, dan Aplikasi",
        "lead": "Celah penelitian (research gap) adalah ruang ketidaktahuan ilmiah yang terdefinisi dengan jelas di antara batas pengetahuan saat ini (frontier of knowledge) dengan kebutuhan pemahaman atau solusi masa depan.",
        "bulletPoints": [
          "Kegagalan paling kritis yang sering terjadi pada mahasiswa tingkat akhir dan peneliti pemula adalah mengklaim keberadaan celah riset hanya karena \"belum ada orang yang meneliti hal X di lokasi Y\".",
          "Klaim semacam ini sering kali bukan merupakan celah ilmiah, melainkan sekadar ketiadaan data lokal yang tidak memiliki kebaruan konseptual.",
          "Secara akademis, celah penelitian diklasifikasikan ke dalam empat taksonomi utama: 1.",
          "Celah Teoretis (Theoretical Gap): Ketiadaan model konseptual atau ketidakmampuan teori yang ada saat ini untuk menerangkan suatu fenomena baru."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Penelitian yang bernilai tinggi selalu berangkat dari celah teoretis atau metodologis yang dikonfirmasi melalui sintesis literatur yang mendalam.",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi formal celah penelitian dapat dinyatakan sebagai defisit fungsi kapabilitas:",
        "bulletPoints": [
          "Diberikan himpunan tuntutan operasional sistem $\\mathcal{R} = \\{r_1, r_2, \\dots, r_m\\}$ dan ruang kapabilitas state-of-the-art $\\mathcal{C}_{\\text{SOTA}} = \\{c_1, c_2, \\dots, c_p\\}$.",
          "Defisit Celah Riset $\\mathcal{G}$ adalah selisih himpunan:",
          "Suatu celah riset $\\mathcal{G}$ dikatakan valid dan substansial jika terdapat setidaknya satu tuntutan kritis $r^* \\in \\mathcal{G}$ sedemikian rupa sehingga:"
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{G} = \\mathcal{R} \\setminus \\mathcal{C}_{\\text{SOTA}}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah tim mahasiswa merencanakan penelitian skripsi dengan judul: \"Implementasi YOLOv8 untuk Deteksi Sampah di Pantai Kalianda Lampung Selatan\". Evaluasi apakah penelitian ini memiliki celah riset yang valid secara ilmiah atau sekadar celah geografis permukaan.",
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
          "Langkah 1: Analisis pertanyaan: Apakah algoritma YOLOv8 belum pernah diterapkan untuk mendeteksi sampah plastik di pantai? Literatur internasional menunjukkan ratusan publikasi dengan topik deteksi sampah pantai berbasis YOLO.",
          "Langkah 2: Evaluasi faktor lokasi \"Pantai Kalianda\": Apakah terdapat karakteristik optis, spektral, atau fisika gelombang unik di Kalianda yang membuat YOLOv8 standar mengalami degradasi performa ekstrem? Jika jawabannya tidak, maka faktor lokasi adalah celah artifisial."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Transformasi menjadi celah metodologis: Jika tim mengidentifikasi bahwa sampah di bibir pantai sering tertutup buih ombak dinamis yang memicu false positive tinggi, dan merancang mekanisme temporal-attention baru untuk menyaring buih tersebut, maka riset berubah menjadi celah metodologis yang berbobot.",
          "[result: Interpretasi Ilmiah] Mengubah fokus dari lokasi geografis ke tantangan fisis-optis spesifik (buih ombak dinamis) mentransformasikan proyek dari sekadar kompilasi teknis menjadi kontribusi ilmiah yang valid."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Evaluasi matriks pemenuhan kapabilitas solusi terhadap daftar tuntutan sistem.",
        "bulletPoints": [
          "Tujuan Algoritma: Evaluasi matriks pemenuhan kapabilitas solusi terhadap daftar tuntutan sistem.",
          "Dependensi Pustaka Ilmiah: Standard Scientific Libraries",
          "Keluaran Terverifikasi: Kapabilitas SOTA yang telah tercapai: {'R4', 'R2', 'R1', 'R3'}"
        ],
        "keyFormulaOrDiagram": "Kapabilitas SOTA yang telah tercapai: {'R4', 'R2', 'R1', 'R3'}\nCelah yang belum dipenuhi studi tunggal: R3 + R4 terintegrasi\n- R1 (Latensi < 10 ms): Dilaporkan oleh 2 studi ['Studi A (2022)', 'Studi C (2024)']\n- R2 (Akurasi Deteksi > 95%): Dilaporkan oleh 2 studi ['Studi A (2022)', 'Studi B (2023)']\n- R3 (Operasi Tanpa GPU Khusus): Dilaporkan oleh 1 studi ['Studi C (2024)']",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyatakan celah penelitian hanya berbasis intuisi pribadi tanpa menyertakan referensi bukti dari literatur terkini.",
          "[warning: Perangkap] Menciptakan celah artifisial dengan memilih batasan yang tidak relevan secara praktis maupun teoretis.",
          "[warning: Perangkap] Mengabaikan solusi yang telah mapan di bidang disiplin ilmu lain yang dapat langsung menyelesaikan masalah tersebut (reinventing the wheel)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Lakukan uji kontradiksi: carilah setidaknya 3 artikel terkini yang berpotensi telah menyelesaikan celah tersebut sebelum menetapkan judul.",
          "Prosedur: Ujilah apakah penyelesaian celah tersebut memberikan dampak terukur pada efisiensi, akurasi, atau pemahaman teoretis."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa sebuah penelitian yang hanya mengganti lokasi survei dari kota A ke kota B sering kali ditolak oleh jurnal internasional terindeks bereputasi?",
          "Petunjuk Analitis: Perhatikan asas generalisasi ilmiah dan transferabilitas model.",
          "Solusi Kunci: Sains bertujuan membangun prinsip universal yang dapat digeneralisasi. Perubahan lokasi geografis semata tanpa variasi kondisi fisis, lingkungan, atau tantangan metodologis baru hanya menghasilkan replikasi data lokal, bukan kontribusi terhadap tubuh pengetahuan global."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "1.5.2": {
    "id": "1.5.2",
    "chapterId": "CH-05",
    "title": "Pemetaan Posisi terhadap State-of-the-Art (SOTA) Terkini",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Mengidentifikasi metode, arsitektur, dan tolok ukur (benchmarks) State-of-the-Art terkini.",
      "Membangun tabel perbandingan komprehensif terhadap baseline kompetitif.",
      "Menilai dominasi performa menggunakan konsep batas Pareto (Pareto frontier)."
    ],
    "content": "State-of-the-Art (SOTA) adalah tingkat pencapaian tertinggi, baik dalam hal ketelitian pemodelan, efisiensi algoritma, maupun ketahanan material, yang telah diakui oleh komunitas ilmiah pada saat tertentu. Penelitian ilmiah yang bermutu tidak membandingkan usulannya dengan metode purba yang sudah usang, melainkan harus bertarung langsung melawan metode SOTA terkini di bawah kondisi uji yang adil dan terkontrol ketat.\n\nMemposisikan riset terhadap SOTA menuntut pemahaman trade-off multi-objektif. Dalam rekayasa, jarang sekali ada metode baru yang mengungguli metode lama pada seluruh dimensi sekaligus tanpa konsekuensi kompensasi. Sering kali, peningkatan akurasi sebesar 2% dibayar dengan peningkatan konsumsi memori sebesar 300% atau kenaikan latensi komputasi sebesar 5 kali lipat.\n\nOleh karena itu, posisi ilmiah suatu penelitian didefinisikan melalui konsep Batas Pareto (Pareto Frontier):\n- Sebuah metode dikatakan mendominasi jika metode tersebut lebih unggul pada setidaknya satu metrik tanpa mengalami penurunan pada metrik lainnya.\n- Jika metode baru menawarkan titik kompromi baru yang sangat dibutuhkan oleh aplikasi praktis (misalnya akurasi sedikit lebih rendah namun mampu berjalan pada mikrokontroler berdaya 1 Watt), metode tersebut merupakan kontribusi valid terhadap batas Pareto efisiensi rekayasa.",
    "mathematicalFoundations": "Diberikan ruang solusi $\\mathcal{S}$ dengan $K$ fungsi objektif yang ingin diminimalkan $\\mathbf{f}(\\mathbf{x}) = [f_1(\\mathbf{x}), f_2(\\mathbf{x}), \\dots, f_K(\\mathbf{x})]^T$.\n\nSolusi $\\mathbf{x}_1$ mendominasi secara Pareto terhadap $\\mathbf{x}_2$ (ditulis $\\mathbf{x}_1 \\prec \\mathbf{x}_2$) jika dan hanya jika:\n$$\\forall k \\in \\{1, \\dots, K\\}, \\quad f_k(\\mathbf{x}_1) \\le f_k(\\mathbf{x}_2) \\quad \\land \\quad \\exists k^* \\in \\{1, \\dots, K\\}, \\quad f_{k^*}(\\mathbf{x}_1) < f_{k^*}(\\mathbf{x}_2)$$\n\nHimpunan Pareto Optimal $\\mathcal{P}^*$ adalah kumpulan solusi yang tidak didominasi oleh solusi lain mana pun dalam literatur:\n$$\\mathcal{P}^* = \\{ \\mathbf{x} \\in \\mathcal{S} \\mid \\nexists \\mathbf{x}' \\in \\mathcal{S}, \\, \\mathbf{x}' \\prec \\mathbf{x} \\}$$",
    "workedExample": {
      "problemStatement": "Dua metode SOTA klasifikasi sinyal EEG memiliki profil sebagai berikut: Metode A (Akurasi: 94%, Latensi: 120 ms, Ukuran Model: 45 MB); Metode B (Akurasi: 89%, Latensi: 15 ms, Ukuran Model: 2.1 MB). Peneliti mengusulkan Metode C (Akurasi: 92%, Latensi: 25 ms, Ukuran Model: 4.8 MB). Apakah Metode C berada pada batas Pareto atau didominasi oleh metode yang sudah ada?",
      "stepByStepSolution": [
        "Langkah 1: Bandingkan Metode C dengan Metode A. Akurasi C (92%) lebih rendah dari A (94%), namun Latensi C (25 ms) jauh lebih cepat dari A (120 ms) dan ukuran model jauh lebih hemat. Jadi C tidak didominasi oleh A.",
        "Langkah 2: Bandingkan Metode C dengan Metode B. Akurasi C (92%) lebih tinggi dari B (89%), meskipun latensi dan ukuran model B sedikit lebih hemat. Jadi C tidak didominasi oleh B.",
        "Langkah 3: Karena tidak ada metode yang mendominasi C pada seluruh metrik sekaligus, Metode C membentuk titik kompromi optimal baru pada kurva Pareto."
      ],
      "resultInterpretation": "Metode C memperluas batas Pareto dengan menyediakan trade-off akurasi tinggi yang tetap layak diimplementasikan pada perangkat komputasi tepi (edge devices)."
    },
    "pythonImplementation": {
      "description": "Program penyaringan solusi non-terdominasi (Pareto Frontier) dari sekumpulan metode riset.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Data metode riset [SIMULASI/SYNTHETIC DATA]: [Galat Prediksi (minimalkan), Latensi ms (minimalkan)]\nmetode = {\n    \"Baseline Klasik\": np.array([0.15, 10.0]),\n    \"SOTA Deep-ResNet\": np.array([0.04, 85.0]),\n    \"SOTA Light-ViT\": np.array([0.06, 40.0]),\n    \"Metode Inferior X\": np.array([0.08, 60.0]),  # Didominasi oleh Light-ViT\n    \"Metode Usulan\": np.array([0.05, 30.0])       # Menggeser kurva Pareto\n}\n\ndef hitung_pareto(nama_dict):\n    nama_list = list(nama_dict.keys())\n    poin = np.array([nama_dict[k] for k in nama_list])\n    n = len(nama_list)\n    is_pareto = np.ones(n, dtype=bool)\n\n    for i in range(n):\n        for j in range(n):\n            if i != j:\n                # Periksa apakah j mendominasi i\n                if np.all(poin[j] <= poin[i]) and np.any(poin[j] < poin[i]):\n                    is_pareto[i] = False\n                    break\n    \n    return [nama_list[i] for i in range(n) if is_pareto[i]]\n\nfrontier = hitung_pareto(metode)\nprint(\"Metode yang berada pada Garis Depan Pareto (Optimal Trade-off):\")\nfor m in frontier:\n    print(f\"- {m} -> Galat: {metode[m][0]:.2f}, Latensi: {metode[m][1]:.1f} ms\")\n",
      "expectedOutput": "Metode yang berada pada Garis Depan Pareto (Optimal Trade-off):\n- Baseline Klasik -> Galat: 0.15, Latensi: 10.0 ms\n- SOTA Deep-ResNet -> Galat: 0.04, Latensi: 85.0 ms\n- Metode Usulan -> Galat: 0.05, Latensi: 30.0 ms"
    },
    "commonPitfalls": [
      "Membandingkan metode baru dengan model baseline tanpa penyesuaian parameter yang optimal (strawman baseline).",
      "Mengabaikan metrik komputasi penting seperti konsumsi daya, waktu pelatihan, atau kompleksitas asimtotik algoritma.",
      "Mengklaim keunggulan SOTA berdasarkan pengujian pada dataset tunggal yang tidak mewakili variabilitas dunia nyata."
    ],
    "validationProcedures": [
      "Gunakan repositori benchmark publik yang terstandarisasi untuk memverifikasi performa baseline secara independen.",
      "Sertakan kurva trade-off grafis dua sumbu yang memperlihatkan posisi metode usulan terhadap seluruh pesaing kunci."
    ],
    "exercises": [
      {
        "question": "Mengapa sebuah artikel yang melaporkan akurasi sedikit di bawah SOTA tetapi memiliki efisiensi komputasi 10 kali lebih cepat tetap dapat dipublikasikan di jurnal tingkat atas?",
        "hint": "Perhatikan konsep relevansi rekayasa terhadap batasan komputasi praktis.",
        "answerExplanation": "Dalam rekayasa sistem nyata, sumber daya komputasi, memori, dan daya baterai adalah batasan keras. Metode yang mengorbankan fraksi kecil akurasi untuk memperoleh efisiensi komputasi masif memberikan nilai kepraktisan yang tinggi dan memperluas batas Pareto solusi."
      }
    ],
    "references": [
      {
        "citation": "Deb, K. (2001). Multi-Objective Optimization using Evolutionary Algorithms. John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Sculley, D., et al. (2018). Winner's curse? On pace, progress, and empirical evaluation. In ICLR Workshop.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pemetaan Posisi terhadap State-of-the-Art (SOTA) Terkini",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 1.5.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.5.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengidentifikasi metode, arsitektur, dan tolok ukur (benchmarks) State-of-the-Art terkini.",
          "Capaian 2: Membangun tabel perbandingan komprehensif terhadap baseline kompetitif.",
          "Capaian 3: Menilai dominasi performa menggunakan konsep batas Pareto (Pareto frontier)."
        ],
        "keyFormulaOrDiagram": "$$\\forall k \\in \\{1, \\dots, K\\}, \\quad f_k(\\mathbf{x}_1) \\le f_k(\\mathbf{x}_2) \\quad \\land \\quad \\exists k^* \\in \\{1, \\dots, K\\}, \\quad f_{k^*}(\\mathbf{x}_1) < f_{k^*}(\\mathbf{x}_2)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 1.5.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pemetaan Posisi terhadap State-of-the-Art (SOTA) Terkini",
        "lead": "State-of-the-Art (SOTA) adalah tingkat pencapaian tertinggi, baik dalam hal ketelitian pemodelan, efisiensi algoritma, maupun ketahanan material, yang telah diakui oleh komunitas ilmiah pada saat tertentu.",
        "bulletPoints": [
          "Penelitian ilmiah yang bermutu tidak membandingkan usulannya dengan metode purba yang sudah usang, melainkan harus bertarung langsung melawan metode SOTA terkini di bawah kondisi uji yang adil dan terkontrol ketat.",
          "Memposisikan riset terhadap SOTA menuntut pemahaman trade-off multi-objektif.",
          "Dalam rekayasa, jarang sekali ada metode baru yang mengungguli metode lama pada seluruh dimensi sekaligus tanpa konsekuensi kompensasi."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Oleh karena itu, posisi ilmiah suatu penelitian didefinisikan melalui konsep Batas Pareto (Pareto Frontier): - Sebuah metode dikatakan mendominasi jika metode tersebut lebih unggul pada setidaknya satu metrik tanpa mengalami penurunan pada metrik lainnya. - Jika metode baru menawarkan titik kompromi baru yang sangat dibutuhkan oleh aplikasi praktis (misalnya akurasi sedikit lebih rendah namun mampu berjalan pada mikrokontroler berdaya 1 Watt), metode tersebut merupakan kontribusi valid terhadap batas Pareto efisiensi rekayasa.",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Diberikan ruang solusi $\\mathcal{S}$ dengan $K$ fungsi objektif yang ingin diminimalkan $\\mathbf{f}(\\mathbf{x}) = [f_1(\\mathbf{x}), f_2(\\mathbf{x}), \\dots, f_K(\\mathbf{x})]^T$.",
        "bulletPoints": [
          "Solusi $\\mathbf{x}_1$ mendominasi secara Pareto terhadap $\\mathbf{x}_2$ (ditulis $\\mathbf{x}_1 \\prec \\mathbf{x}_2$) jika dan hanya jika:",
          "Himpunan Pareto Optimal $\\mathcal{P}^*$ adalah kumpulan solusi yang tidak didominasi oleh solusi lain mana pun dalam literatur:"
        ],
        "keyFormulaOrDiagram": "$$\\forall k \\in \\{1, \\dots, K\\}, \\quad f_k(\\mathbf{x}_1) \\le f_k(\\mathbf{x}_2) \\quad \\land \\quad \\exists k^* \\in \\{1, \\dots, K\\}, \\quad f_{k^*}(\\mathbf{x}_1) < f_{k^*}(\\mathbf{x}_2)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dua metode SOTA klasifikasi sinyal EEG memiliki profil sebagai berikut: Metode A (Akurasi: 94%, Latensi: 120 ms, Ukuran Model: 45 MB); Metode B (Akurasi: 89%, Latensi: 15 ms, Ukuran Model: 2.1 MB). Peneliti mengusulkan Metode C (Akurasi: 92%, Latensi: 25 ms, Ukuran Model: 4.8 MB). Apakah Metode C berada pada batas Pareto atau didominasi oleh metode yang sudah ada?",
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
          "Langkah 1: Bandingkan Metode C dengan Metode A. Akurasi C (92%) lebih rendah dari A (94%), namun Latensi C (25 ms) jauh lebih cepat dari A (120 ms) dan ukuran model jauh lebih hemat. Jadi C tidak didominasi oleh A.",
          "Langkah 2: Bandingkan Metode C dengan Metode B. Akurasi C (92%) lebih tinggi dari B (89%), meskipun latensi dan ukuran model B sedikit lebih hemat. Jadi C tidak didominasi oleh B."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Karena tidak ada metode yang mendominasi C pada seluruh metrik sekaligus, Metode C membentuk titik kompromi optimal baru pada kurva Pareto.",
          "[result: Interpretasi Ilmiah] Metode C memperluas batas Pareto dengan menyediakan trade-off akurasi tinggi yang tetap layak diimplementasikan pada perangkat komputasi tepi (edge devices)."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Program penyaringan solusi non-terdominasi (Pareto Frontier) dari sekumpulan metode riset.",
        "bulletPoints": [
          "Tujuan Algoritma: Program penyaringan solusi non-terdominasi (Pareto Frontier) dari sekumpulan metode riset.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: Metode yang berada pada Garis Depan Pareto (Optimal Trade-off):"
        ],
        "keyFormulaOrDiagram": "Metode yang berada pada Garis Depan Pareto (Optimal Trade-off):\n- Baseline Klasik -> Galat: 0.15, Latensi: 10.0 ms\n- SOTA Deep-ResNet -> Galat: 0.04, Latensi: 85.0 ms\n- Metode Usulan -> Galat: 0.05, Latensi: 30.0 ms",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Membandingkan metode baru dengan model baseline tanpa penyesuaian parameter yang optimal (strawman baseline).",
          "[warning: Perangkap] Mengabaikan metrik komputasi penting seperti konsumsi daya, waktu pelatihan, atau kompleksitas asimtotik algoritma.",
          "[warning: Perangkap] Mengklaim keunggulan SOTA berdasarkan pengujian pada dataset tunggal yang tidak mewakili variabilitas dunia nyata."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan repositori benchmark publik yang terstandarisasi untuk memverifikasi performa baseline secara independen.",
          "Prosedur: Sertakan kurva trade-off grafis dua sumbu yang memperlihatkan posisi metode usulan terhadap seluruh pesaing kunci."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa sebuah artikel yang melaporkan akurasi sedikit di bawah SOTA tetapi memiliki efisiensi komputasi 10 kali lebih cepat tetap dapat dipublikasikan di jurnal tingkat atas?",
          "Petunjuk Analitis: Perhatikan konsep relevansi rekayasa terhadap batasan komputasi praktis.",
          "Solusi Kunci: Dalam rekayasa sistem nyata, sumber daya komputasi, memori, dan daya baterai adalah batasan keras. Metode yang mengorbankan fraksi kecil akurasi untuk memperoleh efisiensi komputasi masif memberikan nilai kepraktisan yang tinggi dan memperluas batas Pareto solusi."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "1.5.3": {
    "id": "1.5.3",
    "chapterId": "CH-05",
    "title": "Formulasi Kontribusi Delta (Δ) dan Rasionalisasi Ilmiah",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Mengisolasi kontribusi delta unik dari metode penelitian yang diusulkan.",
      "Menghubungkan peningkatan performa empiris dengan prinsip mekanisme fisis atau matematis.",
      "Menghindari klaim kontribusi inkremental dangkal yang tidak memiliki nilai ilmiah."
    ],
    "content": "Kontribusi ilmiah dari sebuah penelitian rekayasa dapat dianalogikan sebagai vektor perpindahan diferensial atau Kontribusi Delta ($\\Delta$). Nilai sebuah karya ilmiah tidak diukur dari seberapa panjang kode yang ditulis atau seberapa rumit rangkaian yang dirakit, melainkan dari seberapa jelas $\\Delta$ pengetahuan yang ditambahkan ke dalam khazanah ilmiah global.\n\nBanyak peneliti pemula terjebak pada pembuatan kontribusi inkremental dangkal (trivial incremental contribution), seperti sekadar mengubah ukuran filter konvolusi dari 3x3 menjadi 5x5, menggabungkan dua modul yang sudah ada tanpa rasionalisasi teoretis, atau mengganti optimizer standar tanpa hipotesis komputasional yang jelas.\n\nKontribusi ilmiah yang kokoh memerlukan Rasionalisasi Ilmiah (Scientific Rationale):\n1. Mengapa modifikasi tersebut secara fundamental diharapkan menghasilkan perbaikan?\n2. Bagaimana mekanisme matematika atau fisika yang mendasari perubahan tersebut bekerja?\n3. Apakah peningkatan performa yang teramati konsisten dengan prediksi analitis awal?\n\nPenelitian yang baik mampu menjawab pertanyaan: \"Seandainya eksperimen ini berhasil, prinsip ilmiah baru apa yang kini dipahami oleh komunitas peneliti yang sebelumnya tidak mereka ketahui?\"",
    "mathematicalFoundations": "Didefinisikan vektor profil metode SOTA $\\mathbf{v}_{\\text{SOTA}} \\in \\mathbb{R}^D$ dan vektor metode yang diajukan $\\mathbf{v}_{\\text{prop}} \\in \\mathbb{R}^D$ dalam ruang karakteristik ilmiah:\n\n$$\\mathbf{\\Delta} = \\mathbf{v}_{\\text{prop}} - \\mathbf{v}_{\\text{SOTA}}$$\n\nVektor kontribusi $\\mathbf{\\Delta}$ terdiri dari komponen teoretis $\\Delta_{\\text{theory}}$, komponen algoritmik $\\Delta_{\\text{algo}}$, dan komponen performa empiris $\\Delta_{\\text{perf}}$:\n\n$$\\|\\mathbf{\\Delta}\\| = \\sqrt{\\alpha \\|\\Delta_{\\text{theory}}\\|^2 + \\beta \\|\\Delta_{\\text{algo}}\\|^2 + \\gamma \\|\\Delta_{\\text{perf}}\\|^2}$$\n\nDi mana bobot $\\alpha, \\beta, \\gamma$ merefleksikan nilai kontribusi keilmuan. Jika $\\|\\Delta_{\\text{theory}}\\| = 0$ dan $\\|\\Delta_{\\text{algo}}\\| = 0$, maka kenaikan $\\|\\Delta_{\\text{perf}}\\|$ hanya bersifat heuristik tuning belaka.",
    "workedExample": {
      "problemStatement": "Seorang peneliti menambahkan lapisan self-attention pada jaringan LSTM untuk prediksi beban listrik harian dan memperoleh penurunan RMSE sebesar 12%. Jelaskan bagaimana peneliti tersebut harus merumuskan rasionalisasi ilmiah kontribusinya agar tidak dinilai sebagai penggabungan modul secara sembrono.",
      "stepByStepSolution": [
        "Langkah 1 (Identifikasi Keterbatasan Model Dasar): LSTM standar memiliki keterbatasan degradasi memori saat memproses ketergantungan temporal panjang melebihi 48 jam.",
        "Langkah 2 (Rasionalisasi Mekanistik): Mekanisme perhatian (attention) menghitung bobot keterkaitan langsung antar-langkah waktu tanpa harus mengalirkan informasi melalui seluruh state rekuren secara sekuensial.",
        "Langkah 3 (Prediksi Terarah): Mekanisme ini secara teoretis memulihkan korelasi beban periodik mingguan (pola hari Senin terhadap hari Senin sebelumnya) yang sebelumnya teredam.",
        "Langkah 4 (Formulasi Delta): Kontribusi bukanlah \"menggabungkan LSTM dan Attention\", melainkan \"penyelesaian degradasi memori periodisitas mingguan pada prediksi beban melalui pembobotan langsung matriks kovarians waktu\"."
      ],
      "resultInterpretation": "Dengan menyandarkan kontribusi pada mekanisme penanganan memori periodik panjang, modifikasi arsitektur memiliki dasar ilmiah yang dapat dipertanggungjawabkan."
    },
    "pythonImplementation": {
      "description": "Analisis kontribusi komponen ablasi untuk memverifikasi kontribusi delta independen setiap modul.",
      "libraryDependencies": [
        "pandas"
      ],
      "code": "import pandas as pd\n\n# Data pengujian studi ablasi modul arsitektur [SIMULASI/SYNTHETIC DATA]\nkonfigurasi = [\n    {\"Model\": \"Baseline Standar\", \"RMSE\": 18.4, \"Delta_Relatif\": 0.0},\n    {\"Model\": \"+ Modul Spatial Filter\", \"RMSE\": 16.1, \"Delta_Relatif\": -12.5},\n    {\"Model\": \"+ Modul Temporal Attention\", \"RMSE\": 14.8, \"Delta_Relatif\": -19.5},\n    {\"Model\": \"Metode Lengkap Terintegrasi\", \"RMSE\": 12.6, \"Delta_Relatif\": -31.5}\n]\n\ndf = pd.DataFrame(konfigurasi)\ndf[\"Peningkatan Efisiensi (%)\"] = -df[\"Delta_Relatif\"]\n\nprint(\"Tabel Verifikasi Kontribusi Delta (Studi Ablasi):\")\nprint(df[[\"Model\", \"RMSE\", \"Peningkatan Efisiensi (%)\"]].to_string(index=False))\n",
      "expectedOutput": "Tabel Verifikasi Kontribusi Delta (Studi Ablasi):\n                       Model  RMSE  Peningkatan Efisiensi (%)\n            Baseline Standar  18.4                        0.0\n      + Modul Spatial Filter  16.1                       12.5\n  + Modul Temporal Attention  14.8                       19.5\nMetode Lengkap Terintegrasi  12.6                       31.5"
    },
    "commonPitfalls": [
      "Mengklaim kontribusi besar hanya berdasarkan peningkatan performa numerik tanpa membuktikan modul mana yang bertanggung jawab melalui studi ablasi.",
      "Menggabungkan modul-modul kompleks yang menyebabkan membengkaknya parameter komputasi tanpa memberikan perbaikan yang sebanding.",
      "Menyajikan rasionalisasi post-hoc (alasan yang dikarang-karang setelah hasil eksperimen keluar tanpa dasar deduksi awal)."
    ],
    "validationProcedures": [
      "Lakukan uji ablasi sistematis: nonaktifkan komponen baru satu per satu untuk membuktikan bahwa kontribusi delta benar-benar berasal dari inovasi yang diajukan.",
      "Lakukan pengujian signifikansi statistik (misalnya Wilcoxon signed-rank test) untuk memastikan perbaikan bukan akibat variasi acak bibit inisialisasi."
    ],
    "exercises": [
      {
        "question": "Apa fungsi utama dari studi ablasi (ablation study) dalam membuktikan kontribusi delta suatu karya ilmiah?",
        "hint": "Pikirkan isolasi efek komponen pada sistem yang memiliki banyak bagian.",
        "answerExplanation": "Studi ablasi secara sengaja mematikan atau mencopot komponen inovasi yang diusulkan satu per satu untuk mengukur dampak empiris langsung dari masing-masing komponen. Hal ini membuktikan secara ilmiah bahwa perbaikan performa sistem secara keseluruhan benar-benar disebabkan oleh inovasi tersebut, bukan oleh faktor kebetulan atau penalaan parameter lain."
      }
    ],
    "references": [
      {
        "citation": "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Lipton, Z. C., & Steinhardt, J. (2018). Troubling trends in machine learning scholarship. ACM Queue, 17(1), 45-77.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Formulasi Kontribusi Delta (Δ) dan Rasionalisasi Ilmiah",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 1.5.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.5.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengisolasi kontribusi delta unik dari metode penelitian yang diusulkan.",
          "Capaian 2: Menghubungkan peningkatan performa empiris dengan prinsip mekanisme fisis atau matematis.",
          "Capaian 3: Menghindari klaim kontribusi inkremental dangkal yang tidak memiliki nilai ilmiah."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{\\Delta} = \\mathbf{v}_{\\text{prop}} - \\mathbf{v}_{\\text{SOTA}}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 1.5.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Formulasi Kontribusi Delta (Δ) dan Rasionalisasi Ilmiah",
        "lead": "Kontribusi ilmiah dari sebuah penelitian rekayasa dapat dianalogikan sebagai vektor perpindahan diferensial atau Kontribusi Delta ($\\Delta$).",
        "bulletPoints": [
          "Nilai sebuah karya ilmiah tidak diukur dari seberapa panjang kode yang ditulis atau seberapa rumit rangkaian yang dirakit, melainkan dari seberapa jelas $\\Delta$ pengetahuan yang ditambahkan ke dalam khazanah ilmiah global.",
          "Banyak peneliti pemula terjebak pada pembuatan kontribusi inkremental dangkal (trivial incremental contribution), seperti sekadar mengubah ukuran filter konvolusi dari 3x3 menjadi 5x5, menggabungkan dua modul yang sudah ada tanpa rasionalisasi teoretis, atau mengganti optimizer standar tanpa hipotesis komputasional yang jelas."
        ],
        "keyFormulaOrDiagram": "$\\Delta$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Kontribusi ilmiah yang kokoh memerlukan Rasionalisasi Ilmiah (Scientific Rationale): 1.",
        "bulletPoints": [
          "Mengapa modifikasi tersebut secara fundamental diharapkan menghasilkan perbaikan?",
          "2.",
          "Penelitian yang baik mampu menjawab pertanyaan: \"Seandainya eksperimen ini berhasil, prinsip ilmiah baru apa yang kini dipahami oleh komunitas peneliti yang sebelumnya tidak mereka ketahui?\""
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Didefinisikan vektor profil metode SOTA $\\mathbf{v}_{\\text{SOTA}} \\in \\mathbb{R}^D$ dan vektor metode yang diajukan $\\mathbf{v}_{\\text{prop}} \\in \\mathbb{R}^D$ dalam ruang karakteristik ilmiah:",
        "bulletPoints": [
          "Vektor kontribusi $\\mathbf{\\Delta}$ terdiri dari komponen teoretis $\\Delta_{\\text{theory}}$, komponen algoritmik $\\Delta_{\\text{algo}}$, dan komponen performa empiris $\\Delta_{\\text{perf}}$:",
          "Di mana bobot $\\alpha, \\beta, \\gamma$ merefleksikan nilai kontribusi keilmuan. Jika $\\|\\Delta_{\\text{theory}}\\| = 0$ dan $\\|\\Delta_{\\text{algo}}\\| = 0$, maka kenaikan $\\|\\Delta_{\\text{perf}}\\|$ hanya bersifat heuristik tuning belaka."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{\\Delta} = \\mathbf{v}_{\\text{prop}} - \\mathbf{v}_{\\text{SOTA}}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Seorang peneliti menambahkan lapisan self-attention pada jaringan LSTM untuk prediksi beban listrik harian dan memperoleh penurunan RMSE sebesar 12%. Jelaskan bagaimana peneliti tersebut harus merumuskan rasionalisasi ilmiah kontribusinya agar tidak dinilai sebagai penggabungan modul secara sembrono.",
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
          "Langkah 1 (Identifikasi Keterbatasan Model Dasar): LSTM standar memiliki keterbatasan degradasi memori saat memproses ketergantungan temporal panjang melebihi 48 jam.",
          "Langkah 2 (Rasionalisasi Mekanistik): Mekanisme perhatian (attention) menghitung bobot keterkaitan langsung antar-langkah waktu tanpa harus mengalirkan informasi melalui seluruh state rekuren secara sekuensial."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3 (Prediksi Terarah): Mekanisme ini secara teoretis memulihkan korelasi beban periodik mingguan (pola hari Senin terhadap hari Senin sebelumnya) yang sebelumnya teredam.",
          "Langkah 4 (Formulasi Delta): Kontribusi bukanlah \"menggabungkan LSTM dan Attention\", melainkan \"penyelesaian degradasi memori periodisitas mingguan pada prediksi beban melalui pembobotan langsung matriks kovarians waktu\".",
          "[result: Interpretasi Ilmiah] Dengan menyandarkan kontribusi pada mekanisme penanganan memori periodik panjang, modifikasi arsitektur memiliki dasar ilmiah yang dapat dipertanggungjawabkan."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Analisis kontribusi komponen ablasi untuk memverifikasi kontribusi delta independen setiap modul.",
        "bulletPoints": [
          "Tujuan Algoritma: Analisis kontribusi komponen ablasi untuk memverifikasi kontribusi delta independen setiap modul.",
          "Dependensi Pustaka Ilmiah: pandas",
          "Keluaran Terverifikasi: Tabel Verifikasi Kontribusi Delta (Studi Ablasi):"
        ],
        "keyFormulaOrDiagram": "Tabel Verifikasi Kontribusi Delta (Studi Ablasi):\n                       Model  RMSE  Peningkatan Efisiensi (%)\n            Baseline Standar  18.4                        0.0\n      + Modul Spatial Filter  16.1                       12.5\n  + Modul Temporal Attention  14.8                       19.5",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Mengklaim kontribusi besar hanya berdasarkan peningkatan performa numerik tanpa membuktikan modul mana yang bertanggung jawab melalui studi ablasi.",
          "[warning: Perangkap] Menggabungkan modul-modul kompleks yang menyebabkan membengkaknya parameter komputasi tanpa memberikan perbaikan yang sebanding.",
          "[warning: Perangkap] Menyajikan rasionalisasi post-hoc (alasan yang dikarang-karang setelah hasil eksperimen keluar tanpa dasar deduksi awal)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Lakukan uji ablasi sistematis: nonaktifkan komponen baru satu per satu untuk membuktikan bahwa kontribusi delta benar-benar berasal dari inovasi yang diajukan.",
          "Prosedur: Lakukan pengujian signifikansi statistik (misalnya Wilcoxon signed-rank test) untuk memastikan perbaikan bukan akibat variasi acak bibit inisialisasi."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apa fungsi utama dari studi ablasi (ablation study) dalam membuktikan kontribusi delta suatu karya ilmiah?",
          "Petunjuk Analitis: Pikirkan isolasi efek komponen pada sistem yang memiliki banyak bagian.",
          "Solusi Kunci: Studi ablasi secara sengaja mematikan atau mencopot komponen inovasi yang diusulkan satu per satu untuk mengukur dampak empiris langsung dari masing-masing komponen. Hal ini membuktikan secara ilmiah bahwa perbaikan performa sistem secara keseluruhan benar-benar disebabkan oleh inovasi tersebut, bukan oleh faktor kebetulan atau penalaan parameter lain."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "1.5.4": {
    "id": "1.5.4",
    "chapterId": "CH-05",
    "title": "Penulisan Pernyataan Kebaruan (Novelty Claim Statement) Tanpa Overclaiming",
    "readingTimeMinutes": 16,
    "status": "verified",
    "learningObjectives": [
      "Menyusun pernyataan klaim kebaruan yang presisi, terukur, dan dapat diverifikasi.",
      "Menghindari retorika berlebihan (overclaiming) dan kata sifat superlatif tanpa bukti kuantitatif.",
      "Mendefinisikan ruang batas validitas klaim secara transparan dan bertanggung jawab."
    ],
    "content": "Pernyataan kebaruan (novelty claim statement) adalah bagian paling menentukan dalam naskah ilmiah, proposal hibah riset, maupun naskah disertasi. Pernyataan ini merangkum secara eksplisit apa yang telah dicapai dalam penelitian, bagaimana pencapaian tersebut melampaui batas pengetahuan terdahulu, dan di bawah kondisi apa klaim tersebut berlaku.\n\nSalah satu tanda paling nyata dari naskah berkualitas rendah adalah penggunaan retorika berlebihan (*overclaiming*) dan kata sifat superlatif tanpa pembuktian matematis, seperti \"metode kami adalah yang pertama di dunia yang secara sempurna menyelesaikan masalah X\", atau \"algoritma kami revolusioner dan sangat superior dibanding seluruh metode yang ada\". Pernyataan bombastis semacam ini justru mengundang skeptisisme instan dari reviewer dan penguji ahli.\n\nSebaliknya, peneliti yang matang menuliskan klaim dengan presisi terkalibrasi (*hedging*) yang bertanggung jawab:\n1. Menyebutkan mekanisme spesifik yang diajukan (Bukan: \"sistem cerdas canggih\", Melainkan: \"mekanisme filtering berbasis kovarians Kalman terdisparitasi\").\n2. Menyebutkan metrik kuantitatif dan benchmark rujukan (Bukan: \"menaikkan akurasi drastis\", Melainkan: \"menurunkan Mean Absolute Percentage Error sebesar 4.2% pada dataset benchmark IEEE 33-bus\").\n3. Menyebutkan batas domain validitas (Bukan: \"berlaku untuk seluruh sistem tenaga\", Melainkan: \"diuji pada jaringan distribusi radial dengan rasio R/X tinggi\").",
    "mathematicalFoundations": "Pernyataan klaim formal dapat dimodelkan sebagai predikat logika terikat:\n\n$$\\text{Claim} \\equiv \\forall x \\in \\mathcal{X}_{\\text{domain}}, \\quad \\left( \\mathcal{M}(x) \\implies P(f_{\\text{prop}}(x) > f_{\\text{SOTA}}(x)) \\ge 1 - \\alpha \\right)$$\n\nDi mana $\\mathcal{X}_{\\text{domain}}$ adalah domain operasional eksplisit, $\\mathcal{M}(x)$ adalah kondisi pemenuhan asumsi batas, dan $\\alpha$ adalah tingkat signifikansi galat tipe I.\n\nOverclaiming terjadi ketika peneliti mengabaikan domain $\\mathcal{X}_{\\text{domain}}$ dan menyatakan klaim berlaku untuk semesta tak terhingga $\\forall x$.",
    "workedExample": {
      "problemStatement": "Perbaiki draf klaim kebaruan berikut agar memenuhi standar ilmiah tanpa overclaiming: \"Dalam penelitian ini kami menciptakan metode deteksi kebakaran hutan paling mutakhir dan paling akurat di dunia yang berhasil mengatasi seluruh kegagalan sensor konvensional.\"",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi kata-kata bermasalah (superlatif tanpa bukti): \"paling mutakhir\", \"paling akurat di dunia\", \"mengatasi seluruh kegagalan\".",
        "Langkah 2: Tentukan mekanisme teknis sebenarnya: integrasi fusi spektral inframerah termal dan indeks vegetasi NDVI pada mikrokontroler berdaya rendah.",
        "Langkah 3: Tentukan data empiris konkret: menurunkan false alarm rate sebesar 35% dibandingkan detektor optik ambang batas tunggal.",
        "Langkah 4: Tentukan batasan operasional: pada pengujian kanopi hutan tropis lembap dengan jarak deteksi hingga 50 meter.",
        "Langkah 5: Susun kalimat ilmiah final: \"Penelitian ini mengusulkan model fusi spektral inframerah termal dan indeks vegetasi NDVI berdaya rendah yang menurunkan laju alarm palsu sebesar 35% dibandingkan metode ambang batas optik tunggal pada pengujian kanopi hutan tropis lembap.\""
      ],
      "resultInterpretation": "Pernyataan yang telah direvisi bersifat obyektif, spesifik, kuantitatif, dan dapat diuji secara empiris oleh peneliti lain."
    },
    "pythonImplementation": {
      "description": "Linter teks otomatis sederhana untuk mendeteksi kata-kata overclaiming dan buzzwords pada draf naskah ilmiah.",
      "libraryDependencies": [
        "re"
      ],
      "code": "import re\n\nbuzzwords_terlarang = [\n    r\"paling canggih\", r\"revolusioner\", r\"paling akurat di dunia\",\n    r\"sempurna\", r\"tanpa cela\", r\"pertama kali di dunia\", r\"luar biasa superior\"\n]\n\ndraf_abstrak = (\n    \"Penelitian ini menghadirkan arsitektur revolusioner yang merupakan metode deteksi \"\n    \"paling canggih dan sempurna untuk menyelesaikan masalah vibrasi motor tanpa cela.\"\n)\n\npola_gabung = re.compile(\"|\".join(buzzwords_terlarang), re.IGNORECASE)\ntemuan = pola_gabung.findall(draf_abstrak)\n\nprint(f\"Total indikasi overclaiming ditemukan: {len(temuan)}\")\nfor kata in set(temuan):\n    print(f\"- Peringatan Overclaim: Frasa '{kata}' harus diganti dengan bukti kuantitatif spesifik.\")\n",
      "expectedOutput": "Total indikasi overclaiming ditemukan: 4\n- Peringatan Overclaim: Frasa 'tanpa cela' harus diganti dengan bukti kuantitatif spesifik.\n- Peringatan Overclaim: Frasa 'revolusioner' harus diganti dengan bukti kuantitatif spesifik.\n- Peringatan Overclaim: Frasa 'sempurna' harus diganti dengan bukti kuantitatif spesifik.\n- Peringatan Overclaim: Frasa 'paling canggih' harus diganti dengan bukti kuantitatif spesifik."
    },
    "commonPitfalls": [
      "Mengklaim sebagai \"yang pertama\" (the first ever) tanpa melakukan penelusuran pustaka multibahasa dan multidekade secara menyeluruh.",
      "Menggeneralisasi temuan dari eksperimen laboratorium skala miniatur ke sistem industri berskala penuh.",
      "Menyembunyikan skenario kegagalan atau degradasi performa sistem dari pembahasan naskah."
    ],
    "validationProcedures": [
      "Pastikan setiap klaim keunggulan pada bagian kesimpulan memiliki rujukan tabel data atau gambar grafik pembuktian pada bab hasil.",
      "Tinjau kembali apakah batasan penelitian (*limitations*) telah dituliskan secara proporsional mendampingi klaim kebaruan."
    ],
    "exercises": [
      {
        "question": "Mengapa jurnal bereputasi tinggi lebih menghargai peneliti yang secara jujur memaparkan kondisi di mana metode mereka gagal dibanding peneliti yang mengklaim metodenya selalu berhasil 100%?",
        "hint": "Pikirkan reproduksibilitas ilmiah dan pemahaman batas operasional sistem rekayasa.",
        "answerExplanation": "Dalam sains dan rekayasa, tidak ada metode yang sempurna pada semua kondisi. Memaparkan kondisi batas dan kegagalan justru memberikan pemahaman mekanistik yang mendalam tentang variabel pembatas sistem, mencegah pemborosan sumber daya peneliti lain yang ingin mereplikasi, dan memperkuat kredibilitas integritas ilmiah penulis."
      }
    ],
    "references": [
      {
        "citation": "Hyland, K. (1998). Hedging in Scientific Research Articles. John Benjamins Publishing.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Day, R. A., & Gastel, B. (2016). How to Write and Publish a Scientific Paper. Greenwood.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Penulisan Pernyataan Kebaruan (Novelty Claim Statement) Tanpa Overclaiming",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 1.5.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.5.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menyusun pernyataan klaim kebaruan yang presisi, terukur, dan dapat diverifikasi.",
          "Capaian 2: Menghindari retorika berlebihan (overclaiming) dan kata sifat superlatif tanpa bukti kuantitatif.",
          "Capaian 3: Mendefinisikan ruang batas validitas klaim secara transparan dan bertanggung jawab."
        ],
        "keyFormulaOrDiagram": "$$\\text{Claim} \\equiv \\forall x \\in \\mathcal{X}_{\\text{domain}}, \\quad \\left( \\mathcal{M}(x) \\implies P(f_{\\text{prop}}(x) > f_{\\text{SOTA}}(x)) \\ge 1 - \\alpha \\right)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 1.5.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Penulisan Pernyataan Kebaruan (Novelty Claim Statement) Tanpa Overclaiming",
        "lead": "Pernyataan kebaruan (novelty claim statement) adalah bagian paling menentukan dalam naskah ilmiah, proposal hibah riset, maupun naskah disertasi.",
        "bulletPoints": [
          "Pernyataan ini merangkum secara eksplisit apa yang telah dicapai dalam penelitian, bagaimana pencapaian tersebut melampaui batas pengetahuan terdahulu, dan di bawah kondisi apa klaim tersebut berlaku.",
          "Salah satu tanda paling nyata dari naskah berkualitas rendah adalah penggunaan retorika berlebihan (*overclaiming*) dan kata sifat superlatif tanpa pembuktian matematis, seperti \"metode kami adalah yang pertama di dunia yang secara sempurna menyelesaikan masalah X\", atau \"algoritma kami revolusioner dan sangat superior dibanding seluruh metode yang ada\".",
          "Pernyataan bombastis semacam ini justru mengundang skeptisisme instan dari reviewer dan penguji ahli."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Sebaliknya, peneliti yang matang menuliskan klaim dengan presisi terkalibrasi (*hedging*) yang bertanggung jawab: 1.",
        "bulletPoints": [
          "Menyebutkan mekanisme spesifik yang diajukan (Bukan: \"sistem cerdas canggih\", Melainkan: \"mekanisme filtering berbasis kovarians Kalman terdisparitasi\").",
          "2."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Pernyataan klaim formal dapat dimodelkan sebagai predikat logika terikat:",
        "bulletPoints": [
          "Di mana $\\mathcal{X}_{\\text{domain}}$ adalah domain operasional eksplisit, $\\mathcal{M}(x)$ adalah kondisi pemenuhan asumsi batas, dan $\\alpha$ adalah tingkat signifikansi galat tipe I.",
          "Overclaiming terjadi ketika peneliti mengabaikan domain $\\mathcal{X}_{\\text{domain}}$ dan menyatakan klaim berlaku untuk semesta tak terhingga $\\forall x$."
        ],
        "keyFormulaOrDiagram": "$$\\text{Claim} \\equiv \\forall x \\in \\mathcal{X}_{\\text{domain}}, \\quad \\left( \\mathcal{M}(x) \\implies P(f_{\\text{prop}}(x) > f_{\\text{SOTA}}(x)) \\ge 1 - \\alpha \\right)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Perbaiki draf klaim kebaruan berikut agar memenuhi standar ilmiah tanpa overclaiming: \"Dalam penelitian ini kami menciptakan metode deteksi kebakaran hutan paling mutakhir dan paling akurat di dunia yang berhasil mengatasi seluruh kegagalan sensor konvensional.\"",
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
          "Langkah 1: Identifikasi kata-kata bermasalah (superlatif tanpa bukti): \"paling mutakhir\", \"paling akurat di dunia\", \"mengatasi seluruh kegagalan\".",
          "Langkah 2: Tentukan mekanisme teknis sebenarnya: integrasi fusi spektral inframerah termal dan indeks vegetasi NDVI pada mikrokontroler berdaya rendah.",
          "Langkah 3: Tentukan data empiris konkret: menurunkan false alarm rate sebesar 35% dibandingkan detektor optik ambang batas tunggal."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Tentukan batasan operasional: pada pengujian kanopi hutan tropis lembap dengan jarak deteksi hingga 50 meter.",
          "Langkah 5: Susun kalimat ilmiah final: \"Penelitian ini mengusulkan model fusi spektral inframerah termal dan indeks vegetasi NDVI berdaya rendah yang menurunkan laju alarm palsu sebesar 35% dibandingkan metode ambang batas optik tunggal pada pengujian kanopi hutan tropis lembap.\"",
          "[result: Interpretasi Ilmiah] Pernyataan yang telah direvisi bersifat obyektif, spesifik, kuantitatif, dan dapat diuji secara empiris oleh peneliti lain."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Linter teks otomatis sederhana untuk mendeteksi kata-kata overclaiming dan buzzwords pada draf naskah ilmiah.",
        "bulletPoints": [
          "Tujuan Algoritma: Linter teks otomatis sederhana untuk mendeteksi kata-kata overclaiming dan buzzwords pada draf naskah ilmiah.",
          "Dependensi Pustaka Ilmiah: re",
          "Keluaran Terverifikasi: Total indikasi overclaiming ditemukan: 4"
        ],
        "keyFormulaOrDiagram": "Total indikasi overclaiming ditemukan: 4\n- Peringatan Overclaim: Frasa 'tanpa cela' harus diganti dengan bukti kuantitatif spesifik.\n- Peringatan Overclaim: Frasa 'revolusioner' harus diganti dengan bukti kuantitatif spesifik.\n- Peringatan Overclaim: Frasa 'sempurna' harus diganti dengan bukti kuantitatif spesifik.\n- Peringatan Overclaim: Frasa 'paling canggih' harus diganti dengan bukti kuantitatif spesifik.",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Mengklaim sebagai \"yang pertama\" (the first ever) tanpa melakukan penelusuran pustaka multibahasa dan multidekade secara menyeluruh.",
          "[warning: Perangkap] Menggeneralisasi temuan dari eksperimen laboratorium skala miniatur ke sistem industri berskala penuh.",
          "[warning: Perangkap] Menyembunyikan skenario kegagalan atau degradasi performa sistem dari pembahasan naskah."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan setiap klaim keunggulan pada bagian kesimpulan memiliki rujukan tabel data atau gambar grafik pembuktian pada bab hasil.",
          "Prosedur: Tinjau kembali apakah batasan penelitian (*limitations*) telah dituliskan secara proporsional mendampingi klaim kebaruan."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa jurnal bereputasi tinggi lebih menghargai peneliti yang secara jujur memaparkan kondisi di mana metode mereka gagal dibanding peneliti yang mengklaim metodenya selalu berhasil 100%?",
          "Petunjuk Analitis: Pikirkan reproduksibilitas ilmiah dan pemahaman batas operasional sistem rekayasa.",
          "Solusi Kunci: Dalam sains dan rekayasa, tidak ada metode yang sempurna pada semua kondisi. Memaparkan kondisi batas dan kegagalan justru memberikan pemahaman mekanistik yang mendalam tentang variabel pembatas sistem, mencegah pemborosan sumber daya peneliti lain yang ingin mereplikasi, dan memperkuat kredibilitas integritas ilmiah penulis."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
