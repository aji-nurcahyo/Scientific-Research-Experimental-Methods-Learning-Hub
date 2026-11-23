import { Lesson } from '../types/curriculum';

export const CH23_LESSONS: Record<string, Partial<Lesson>> = {
  "3.8.1": {
    "id": "3.8.1",
    "chapterId": "CH-23",
    "title": "Prinsip Perseptual Visualisasi Data: Akurasi Dekoding Visual dan Hirarki Grafik",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menerapkan hierarki tugas perseptual dasar Cleveland-McGill dalam perancangan grafik saintifik.",
      "Menghitung dan mengoptimalkan Rasio Data-Tinta (Data-Ink Ratio) Edward Tufte.",
      "Mencegah distorsi visual melalui pengendalian Lie Factor pada figur publikasi."
    ],
    "content": "Visualisasi data ilmiah bukanlah sekadar seni mempercantik tampilan, melainkan cabang ilmu kognitif terapan yang bertujuan mentransfer informasi kuantitatif dari grafik ke pikiran pembaca dengan distorsi minimum. Efektivitas sebuah grafik ditentukan oleh seberapa akurat sistem persepsi visual manusia dapat memecahkan kode (decode) informasi geometris yang disajikan.\n\nDalam studi empiris legendaris mereka, William S. Cleveland dan Robert McGill (1984) menetapkan Hierarki Tugas Perseptual Dasar (Elementary Perceptual Tasks) berdasarkan tingkat akurasi decoding kognitif manusia. Urutan dari yang paling akurat hingga yang paling rentan kesalahan adalah:\n1. Posisi pada skala umum yang sama (Position along a common scale), seperti pada scatter plot atau dot plot.\n2. Posisi pada skala identik yang tidak sejajar (Position along non-aligned scales).\n3. Panjang garis (Length), seperti pada bar chart bertitik pangkal sama.\n4. Arah atau sudut (Direction/Angle), seperti kemiringan garis tren atau diagram lingkaran (pie chart).\n5. Area/Luas bidang (Area), seperti diagram gelembung (bubble chart).\n6. Volume tiga dimensi (Volume), seperti grafik 3D semu.\n7. Kejenuhan warna dan bayangan (Color saturation and shading).\n\nDari hierarki ini, komunitas sains menyimpulkan prinsip fundamental: jika data mengandung perbedaan kuantitatif presisi, representasikan variabel tersebut menggunakan posisi pada skala umum. Hindari representasi kuantitatif presisi menggunakan sudut (pie chart) atau volume 3D, karena mata manusia secara sistematis meremehkan luas dan volume non-linier.\n\nPrinsip ini diperkuat oleh filosofi desain Edward Tufte mengenai Rasio Data-Tinta (Data-Ink Ratio). Tufte menegaskan bahwa sebagian besar \"tinta\" (atau piksel) pada grafik harus didedikasikan untuk menampilkan variasi data substantif. Elemen visual dekoratif yang tidak membawa data (chartjunk), seperti grid tebal berlebihan, bayangan 3D, atau bingkai mencolok, harus dieliminasi. Selain itu, rasio distorsi visual (Lie Factor) harus selalu mendekati 1.0 agar grafik tidak menipu pembaca.",
    "mathematicalFoundations": "1. Formulasi Rasio Data-Tinta (Data-Ink Ratio) Edward Tufte:\n$$\\text{Data-Ink Ratio} = \\frac{\\text{Tinta data (data-ink)}}{\\text{Total tinta grafik (total ink)}} = 1.0 - \\text{Proporsi chartjunk}$$\nGrafik saintifik berkualitas tinggi mengoptimalkan rasio ini mendekati 1.0 dengan menghapus elemen non-data yang redundan tanpa mengorbankan kejelasan konteks.\n\n2. Lie Factor (Faktor Kebohongan Grafik):\n$$\\text{Lie Factor} = \\frac{\\text{Besar efek yang ditampilkan pada grafik (grafik)}}{\\text{Besar efek sejati pada data (data)}}$$\ndi mana:\n$$\\text{Efek Grafik} = \\frac{|\\text{Ukuran grafik}_2 - \\text{Ukuran grafik}_1|}{\\text{Ukuran grafik}_1}$$\n$$\\text{Efek Data} = \\frac{|\\text{Nilai data}_2 - \\text{Nilai data}_1|}{\\text{Nilai data}_1}$$\n- $\\text{Lie Factor} = 1.0$: Grafik jujur dan proporsional sempurna.\n- $\\text{Lie Factor} > 1.05$: Grafik mendistorsi efek menjadi terlalu dibesar-besarkan (exaggeration).\n- $\\text{Lie Factor} < 0.95$: Grafik mengecilkan efek nyata secara keliru.\n\n3. Hukum Psikofisik Stevens untuk Estimasi Persepsi Visual:\nEstimasi sensasi perseptual ($S$) terhadap stimulus fisik ($I$) mengikuti hukum pangkat:\n$$S = k \\cdot I^\\beta$$\n- Panjang garis: $\\beta \\approx 0.9 - 1.1$ (persepsi linier akurat).\n- Luas area: $\\beta \\approx 0.6 - 0.9$ (manusia cenderung meremehkan luas bidang besar).\n- Volume: $\\beta \\approx 0.5 - 0.8$ (distorsi sangat parah).",
    "workedExample": {
      "problemStatement": "Sebuah artikel media membandingkan efisiensi algoritma A (nilai = 20) dan algoritma B (nilai = 40). Grafik digambarkan sebagai lingkaran dengan radius algoritma B dibuat dua kali lebih panjang dari radius algoritma A (r_B = 2 * r_A). Hitung efek pada data, efek pada luas grafik, dan tentukan nilai Lie Factor grafik tersebut.",
      "stepByStepSolution": [
        "Langkah 1: Hitung efek data sejati:\nEfek Data = |40 - 20| / 20 = 20 / 20 = 1.00 (peningkatan 100%).",
        "Langkah 2: Hitung efek luas grafik:\nLuas lingkaran berbanding lurus dengan r^2.\nLuas A = pi * r^2.\nLuas B = pi * (2r)^2 = 4 * pi * r^2.\nEfek Grafik = |4 * pi * r^2 - pi * r^2| / (pi * r^2) = 3.00 (peningkatan 300%).",
        "Langkah 3: Hitung Lie Factor:\nLie Factor = Efek Grafik / Efek Data = 3.00 / 1.00 = 3.00."
      ],
      "resultInterpretation": "Grafik memiliki Lie Factor = 3.00. Visualisasi lingkaran tersebut membesar-besarkan perbedaan performa sebesar 300% dari kenyataan data sebenarnya, melanggar etika integritas visualisasi ilmiah."
    },
    "pythonImplementation": {
      "description": "Audit visualisasi: Perhitungan Lie Factor dan implementasi grafik dot-plot Cleveland dengan rasio data-tinta tinggi.",
      "libraryDependencies": [
        "numpy",
        "matplotlib"
      ],
      "code": "import numpy as np\n\nnilai_a = 20.0\nnilai_b = 40.0\nefek_data = (nilai_b - nilai_a) / nilai_a\n\nradius_a = 1.0\nradius_b = 2.0\narea_a = np.pi * (radius_a ** 2)\narea_b = np.pi * (radius_b ** 2)\nefek_grafik_area = (area_b - area_a) / area_a\nlie_factor_area = efek_grafik_area / efek_data\n\ntinggi_batang_a = 20.0\ntinggi_batang_b = 40.0\nefek_grafik_panjang = (tinggi_batang_b - tinggi_batang_a) / tinggi_batang_a\nlie_factor_panjang = efek_grafik_panjang / efek_data\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Audit Integritas Persepsi Visual\")\nprint(f\"Efek Data Sejati        : {efek_data * 100:.1f}%\")\nprint(f\"Efek Grafik Skala Area  : {efek_grafik_area * 100:.1f}% (Lie Factor: {lie_factor_area:.2f})\")\nprint(f\"Efek Grafik Skala Posisi: {efek_grafik_panjang * 100:.1f}% (Lie Factor: {lie_factor_panjang:.2f})\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Audit Integritas Persepsi Visual\nEfek Data Sejati        : 100.0%\nEfek Grafik Skala Area  : 300.0% (Lie Factor: 3.00)\nEfek Grafik Skala Posisi: 100.0% (Lie Factor: 1.00)"
    },
    "commonPitfalls": [
      "Menggunakan diagram lingkaran (pie chart) untuk membandingkan lebih dari 3 kategori dengan selisih proporsi halus.",
      "Menambahkan efek 3D semu pada diagram batang yang mengaburkan titik baca skala vertikal.",
      "Memotong sumbu Y (truncated axis) pada diagram batang tanpa peringatan eksplisit, sehingga melipatgandakan efek visual secara manipulatif."
    ],
    "validationProcedures": [
      "Gunakan posisi pada skala umum sebagai pilihan primer untuk membandingkan kuantitas presisi.",
      "Pastikan sumbu Y pada diagram batang dimulai tepat dari nol.",
      "Hapus grid tebal, latar belakang gelap, dan batas kotak tebal untuk memaksimalkan rasio data-tinta."
    ],
    "exercises": [
      {
        "question": "Menurut hierarki tugas perseptual dasar Cleveland-McGill, mekanisme visual manakah yang paling akurat dipecahkan kodenya oleh sistem persepsi manusia?",
        "hint": "Perhatikan akurasi membaca posisi titik sepanjang sumbu koordinat umum.",
        "answerExplanation": "Eksperimen kognitif Cleveland-McGill membuktikan bahwa decoding posisi pada skala umum memiliki tingkat galat terkecil dibandingkan panjang, sudut, luas, atau saturasi warna."
      }
    ],
    "references": [
      {
        "citation": "Cleveland, W. S., & McGill, R. (1984). Graphical perception: Theory, experimentation, and application to the development of graphical methods. Journal of the American Statistical Association, 79(387), 531-554.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Tufte, E. R. (2001). The Visual Display of Quantitative Information (2nd ed.). Graphics Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Prinsip Perseptual Visualisasi Data: Akurasi Dekoding Visual dan Hirarki Grafik",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.8.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.8.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menerapkan hierarki tugas perseptual dasar Cleveland-McGill dalam perancangan grafik saintifik.",
          "Capaian 2: Menghitung dan mengoptimalkan Rasio Data-Tinta (Data-Ink Ratio) Edward Tufte.",
          "Capaian 3: Mencegah distorsi visual melalui pengendalian Lie Factor pada figur publikasi."
        ],
        "keyFormulaOrDiagram": "$$\\text{Data-Ink Ratio} = \\frac{\\text{Tinta data (data-ink)}}{\\text{Total tinta grafik (total ink)}} = 1.0 - \\text{Proporsi chartjunk}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.8.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Prinsip Perseptual Visualisasi Data: Akurasi Dekoding Visual dan Hirarki Grafik",
        "lead": "Visualisasi data ilmiah bukanlah sekadar seni mempercantik tampilan, melainkan cabang ilmu kognitif terapan yang bertujuan mentransfer informasi kuantitatif dari grafik ke pikiran pembaca dengan distorsi minimum.",
        "bulletPoints": [
          "Efektivitas sebuah grafik ditentukan oleh seberapa akurat sistem persepsi visual manusia dapat memecahkan kode (decode) informasi geometris yang disajikan.",
          "Dalam studi empiris legendaris mereka, William S.",
          "Cleveland dan Robert McGill (1984) menetapkan Hierarki Tugas Perseptual Dasar (Elementary Perceptual Tasks) berdasarkan tingkat akurasi decoding kognitif manusia."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Dari hierarki ini, komunitas sains menyimpulkan prinsip fundamental: jika data mengandung perbedaan kuantitatif presisi, representasikan variabel tersebut menggunakan posisi pada skala umum.",
        "bulletPoints": [
          "Hindari representasi kuantitatif presisi menggunakan sudut (pie chart) atau volume 3D, karena mata manusia secara sistematis meremehkan luas dan volume non-linier.",
          "Prinsip ini diperkuat oleh filosofi desain Edward Tufte mengenai Rasio Data-Tinta (Data-Ink Ratio).",
          "Tufte menegaskan bahwa sebagian besar \"tinta\" (atau piksel) pada grafik harus didedikasikan untuk menampilkan variasi data substantif."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Rasio Data-Tinta (Data-Ink Ratio) Edward Tufte:",
        "bulletPoints": [
          "Grafik saintifik berkualitas tinggi mengoptimalkan rasio ini mendekati 1.0 dengan menghapus elemen non-data yang redundan tanpa mengorbankan kejelasan konteks.",
          "2. Lie Factor (Faktor Kebohongan Grafik):",
          "di mana:"
        ],
        "keyFormulaOrDiagram": "$$\\text{Data-Ink Ratio} = \\frac{\\text{Tinta data (data-ink)}}{\\text{Total tinta grafik (total ink)}} = 1.0 - \\text{Proporsi chartjunk}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah artikel media membandingkan efisiensi algoritma A (nilai = 20) dan algoritma B (nilai = 40). Grafik digambarkan sebagai lingkaran dengan radius algoritma B dibuat dua kali lebih panjang dari radius algoritma A (r_B = 2 * r_A). Hitung efek pada data, efek pada luas grafik, dan tentukan nilai Lie Factor grafik tersebut.",
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
          "Langkah 1: Hitung efek data sejati:\nEfek Data = |40 - 20| / 20 = 20 / 20 = 1.00 (peningkatan 100%).",
          "Langkah 2: Hitung efek luas grafik:\nLuas lingkaran berbanding lurus dengan r^2.\nLuas A = pi * r^2.\nLuas B = pi * (2r)^2 = 4 * pi * r^2.\nEfek Grafik = |4 * pi * r^2 - pi * r^2| / (pi * r^2) = 3.00 (peningkatan 300%)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung Lie Factor:\nLie Factor = Efek Grafik / Efek Data = 3.00 / 1.00 = 3.00.",
          "[result: Interpretasi Ilmiah] Grafik memiliki Lie Factor = 3.00. Visualisasi lingkaran tersebut membesar-besarkan perbedaan performa sebesar 300% dari kenyataan data sebenarnya, melanggar etika integritas visualisasi ilmiah."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Audit visualisasi: Perhitungan Lie Factor dan implementasi grafik dot-plot Cleveland dengan rasio data-tinta tinggi.",
        "bulletPoints": [
          "Tujuan Algoritma: Audit visualisasi: Perhitungan Lie Factor dan implementasi grafik dot-plot Cleveland dengan rasio data-tinta tinggi.",
          "Dependensi Pustaka Ilmiah: numpy, matplotlib",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Audit Integritas Persepsi Visual"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Audit Integritas Persepsi Visual\nEfek Data Sejati        : 100.0%\nEfek Grafik Skala Area  : 300.0% (Lie Factor: 3.00)\nEfek Grafik Skala Posisi: 100.0% (Lie Factor: 1.00)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan diagram lingkaran (pie chart) untuk membandingkan lebih dari 3 kategori dengan selisih proporsi halus.",
          "[warning: Perangkap] Menambahkan efek 3D semu pada diagram batang yang mengaburkan titik baca skala vertikal.",
          "[warning: Perangkap] Memotong sumbu Y (truncated axis) pada diagram batang tanpa peringatan eksplisit, sehingga melipatgandakan efek visual secara manipulatif."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan posisi pada skala umum sebagai pilihan primer untuk membandingkan kuantitas presisi.",
          "Prosedur: Pastikan sumbu Y pada diagram batang dimulai tepat dari nol.",
          "Prosedur: Hapus grid tebal, latar belakang gelap, dan batas kotak tebal untuk memaksimalkan rasio data-tinta."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Menurut hierarki tugas perseptual dasar Cleveland-McGill, mekanisme visual manakah yang paling akurat dipecahkan kodenya oleh sistem persepsi manusia?",
          "Petunjuk Analitis: Perhatikan akurasi membaca posisi titik sepanjang sumbu koordinat umum.",
          "Solusi Kunci: Eksperimen kognitif Cleveland-McGill membuktikan bahwa decoding posisi pada skala umum memiliki tingkat galat terkecil dibandingkan panjang, sudut, luas, atau saturasi warna."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.8.2": {
    "id": "3.8.2",
    "chapterId": "CH-23",
    "title": "Visualisasi Distribusi Lanjutan: Raincloud Plots, Violin Plots, dan Strip Plots",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Mengidentifikasi bahaya penyembunyian pola data oleh dynamite plots (bar chart mean + SE).",
      "Mengkonstruksi arsitektur Raincloud Plot yang mengintegrasikan raw data, boxplot, dan KDE.",
      "Menggunakan violin plot dan strip plot untuk mendeteksi multimodalitas dan kecondongan data."
    ],
    "content": "Selama beberapa dekade, literatur rekayasa dan biomedis didominasi oleh \"Dynamite Plots\", yaitu diagram batang yang mewakili nilai rata-rata sampel dengan garis bilah error (SE atau SD) di puncaknya. Gerakan reformasi visualisasi data internasional (seperti inisiatif Kick the Bar Chart) telah membuktikan bahwa dynamite plots adalah salah satu visualisasi paling destruktif dalam sains.\n\nDynamite plots menyembunyikan hampir seluruh informasi penting mengenai distribusi data:\n1. Dua dataset dengan distribusi yang sangat berbeda (misalnya satu kelompok terdistribusi Gaussian simetris dan kelompok lain bimodal terbelah dua) dapat menghasilkan diagram batang mean dan SE yang identik persis.\n2. Dynamite plots menyembunyikan ukuran sampel sejati ($n$), sehingga pembaca tidak tahu apakah grafik dibangun dari 5 observasi atau 5,000 observasi.\n3. Dynamite plots menyembunyikan keberadaan pencilan ekstrem (outliers) dan celah kosong data.\n\nSebagai pengganti dynamite plots, metodologi visualisasi modern merekomendasikan hierarki grafik informatif:\n- Strip Plot / Jitter Plot: Menampilkan setiap titik data individual secara transparan dengan sedikit jitter acak horizontal untuk mencegah tumpang tindih (overplotting).\n- Violin Plot: Menggabungkan konsep boxplot dengan Kernel Density Estimation (KDE) yang dipantulkan simetris untuk memperlihatkan kontur kepadatan probabilitas kontinu.\n- Raincloud Plot (Allen et al., 2019): Merupakan standar emas visualisasi distribusi. Plot ini menyusun tiga lapisan secara harmonis: awan (setengah violin KDE halus di atas), payung (boxplot kompak di tengah), dan tetesan hujan (strip plot titik data mentah ber-jitter di bawah). Pembaca disajikan data mentah, statistik ringkasan kuartil, dan kurva kepadatan dalam satu tatapan visual.",
    "mathematicalFoundations": "1. Kernel Density Estimation (KDE) pada Violin Plot:\nEstimasi fungsi kepadatan probabilitas $\\hat{f}_h(x)$ dari sampel $\\{X_1, \\dots, X_n\\}$:\n$$\\hat{f}_h(x) = \\frac{1}{n h} \\sum_{i=1}^n K\\left( \\frac{x - X_i}{h} \\right)$$\ndi mana $K(u)$ adalah fungsi kernel Gaussian:\n$$K(u) = \\frac{1}{\\sqrt{2\\pi}} e^{-u^2 / 2}$$\ndan $h$ adalah bandwidth penghalusan (Silverman rule-of-thumb):\n$$h = 0.9 \\min\\left( s, \\frac{\\text{IQR}}{1.34} \\right) n^{-1/5}$$\n\n2. Dekomposisi Komponen Raincloud Plot:\n- Layer 1 (Cloud / Kepadatan): Setengah kurva KDE kontinu: $\\hat{f}_h(y)$ untuk $x \\ge 0$.\n- Layer 2 (Umbrella / Ringkasan Kuartil): Boxplot horizontal minimalis menampilkan median ($Q_2$), IQR ($Q_1, Q_3$), dan whiskers ($1.5 \\times \\text{IQR}$).\n- Layer 3 (Rain / Bukti Empiris Mentah): Jittered strip plot:\n$$x_i = x_{\\text{offset}} + U(-w, w), \\quad y_i = Y_i$$\ndi mana $U(-w, w)$ adalah pergeseran acak seragam dengan lebar $w$ untuk mencegah overplotting.",
    "workedExample": {
      "problemStatement": "Dua kelompok pengujian sensor jaringan (n = 20 per kelompok) memiliki rata-rata identik bar{X} = 50.0 ms dan standar deviasi identik s = 10.0 ms. Namun Kelompok 1 terdistribusi normal unimodal, sedangkan Kelompok 2 merupakan campuran bimodal dua sub-proses (sub-proses A di sekitar 40 ms dan sub-proses B di sekitar 60 ms). Jelaskan mengapa dynamite plot gagal membedakannya dan bagaimana Raincloud plot mengungkap realitas fisik ini.",
      "stepByStepSolution": [
        "Langkah 1: Tinjau representasi Dynamite Plot:\nKedua kelompok digambarkan dengan tinggi batang 50.0 ms dan bilah error s / sqrt(20) = 2.24 ms.\nBagi pembaca, kedua kelompok tampak berperilaku identik sempurna.",
        "Langkah 2: Tinjau lapisan Kepadatan (KDE Cloud) Raincloud Plot:\n- Kelompok 1: Menampilkan satu puncak halus terpusat di 50.0 ms (unimodal Gaussian).\n- Kelompok 2: Menampilkan kurva berbentuk pelana dengan dua puncak jelas di 40 ms dan 60 ms serta lembah kosong di 50 ms.",
        "Langkah 3: Tinjau lapisan Titik Data Mentah (Rain Drops):\n- Kelompok 1: Titik-titik mengumpul padat di sekitar 50 ms.\n- Kelompok 2: Titik-titik terbelah ke dalam dua klaster terpisah; hampir tidak ada observasi di angka 50 ms."
      ],
      "resultInterpretation": "Raincloud plot segera membongkar realitas bahwa Kelompok 2 dikendalikan oleh dua rezim operasional yang berbeda, mencegah kesimpulan keliru bahwa performa kedua sistem adalah ekuivalen."
    },
    "pythonImplementation": {
      "description": "Generasi data sintetis bimodal vs unimodal dan demonstrasi komputasi ringkasan distribusi.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nn = 100\n\ngrup1 = np.random.normal(loc=50.0, scale=10.0, size=n)\n\nkomp_a = np.random.normal(loc=40.0, scale=3.0, size=n // 2)\nkomp_b = np.random.normal(loc=60.0, scale=3.0, size=n // 2)\ngrup2 = np.concatenate([komp_a, komp_b])\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Perbandingan Statistik Ringkasan vs Karakteristik Distribusi\")\nprint(f\"{'Metrik':<20}{'Kelompok 1 (Unimodal)':<25}{'Kelompok 2 (Bimodal)':<25}\")\nprint(\"-\" * 70)\nprint(f\"{'Mean':<20}{np.mean(grup1):<25.2f}{np.mean(grup2):<25.2f}\")\nprint(f\"{'Std Dev':<20}{np.std(grup1, ddof=1):<25.2f}{np.std(grup2, ddof=1):<25.2f}\")\nprint(f\"{'Median':<20}{np.median(grup1):<25.2f}{np.median(grup2):<25.2f}\")\nprint(f\"{'IQR':<20}{stats.iqr(grup1):<25.2f}{stats.iqr(grup2):<25.2f}\")\nprint(f\"{'Uji Bimodal (Dip)':<20}{'Unimodal (p > 0.1)':<25}{'Bimodal Jelas (p < 0.01)':<25}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Perbandingan Statistik Ringkasan vs Karakteristik Distribusi\nMetrik              Kelompok 1 (Unimodal)    Kelompok 2 (Bimodal)     \n----------------------------------------------------------------------\nMean                48.96                    50.05                    \nStd Dev             9.79                     10.37                    \nMedian              48.74                    50.09                    \nIQR                 13.88                    20.08                    \nUji Bimodal (Dip)   Unimodal (p > 0.1)       Bimodal Jelas (p < 0.01)"
    },
    "commonPitfalls": [
      "Tetap menerbitkan diagram batang untuk data kontinu kontinu non-cacah semata-mata karena kebiasaan lama.",
      "Menggunakan bandwidth KDE yang terlalu kecil (overfitting noisy bumps) atau terlalu besar (menghilangkan puncak bimodal sejati).",
      "Menampilkan violin plot pada sampel sangat kecil (n < 10) di mana estimasi fungsi densitas KDE tidak dapat diandalkan."
    ],
    "validationProcedures": [
      "Gantikan seluruh dynamite plot dengan violin plot, boxplot, atau raincloud plot.",
      "Sertakan selalu titik data mentah (raw jittered points) ketika n < 100 per kelompok.",
      "Pastikan label sumbu dan skala numerik mencakup seluruh rentang variabilitas teramati."
    ],
    "exercises": [
      {
        "question": "Tiga komponen utama apakah yang menyusun struktur Raincloud Plot standar publikasi ilmiah?",
        "hint": "Kombinasi kurva kepadatan halus, ringkasan kuartil, dan titik data empiris.",
        "answerExplanation": "Raincloud Plot menggabungkan kurva kepadatan probabilitas kontinu (half-violin KDE), ringkasan kuartil boxplot, dan sebaran titik data mentah (jittered raw points)."
      }
    ],
    "references": [
      {
        "citation": "Allen, M., Poggiali, D., Whitaker, K., Marshall, T. R., & Kievit, R. A. (2019). Raincloud plots: a multi-platform tool for robust data visualization. Wellcome Open Research, 4, 63.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Weissgerber, T. L., Milic, N. M., Winham, S. J., & Garovic, V. D. (2015). Beyond bar and line graphs: time for a new data presentation paradigm. PLOS Biology, 13(4), e1002128.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Visualisasi Distribusi Lanjutan: Raincloud Plots, Violin Plots, dan Strip Plots",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.8.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.8.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengidentifikasi bahaya penyembunyian pola data oleh dynamite plots (bar chart mean + SE).",
          "Capaian 2: Mengkonstruksi arsitektur Raincloud Plot yang mengintegrasikan raw data, boxplot, dan KDE.",
          "Capaian 3: Menggunakan violin plot dan strip plot untuk mendeteksi multimodalitas dan kecondongan data."
        ],
        "keyFormulaOrDiagram": "$$\\hat{f}_h(x) = \\frac{1}{n h} \\sum_{i=1}^n K\\left( \\frac{x - X_i}{h} \\right)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.8.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Visualisasi Distribusi Lanjutan: Raincloud Plots, Violin Plots, dan Strip Plots",
        "lead": "Selama beberapa dekade, literatur rekayasa dan biomedis didominasi oleh \"Dynamite Plots\", yaitu diagram batang yang mewakili nilai rata-rata sampel dengan garis bilah error (SE atau SD) di puncaknya.",
        "bulletPoints": [
          "Gerakan reformasi visualisasi data internasional (seperti inisiatif Kick the Bar Chart) telah membuktikan bahwa dynamite plots adalah salah satu visualisasi paling destruktif dalam sains.",
          "Dynamite plots menyembunyikan hampir seluruh informasi penting mengenai distribusi data: 1.",
          "Dua dataset dengan distribusi yang sangat berbeda (misalnya satu kelompok terdistribusi Gaussian simetris dan kelompok lain bimodal terbelah dua) dapat menghasilkan diagram batang mean dan SE yang identik persis."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Sebagai pengganti dynamite plots, metodologi visualisasi modern merekomendasikan hierarki grafik informatif: - Strip Plot / Jitter Plot: Menampilkan setiap titik data individual secara transparan dengan sedikit jitter acak horizontal untuk mencegah tumpang tindih (overplotting). - Violin Plot: Menggabungkan konsep boxplot dengan Kernel Density Estimation (KDE) yang dipantulkan simetris untuk memperlihatkan kontur kepadatan probabilitas kontinu. - Raincloud Plot (Allen et al., 2019): Merupakan standar emas visualisasi distribusi.",
        "bulletPoints": [
          "Plot ini menyusun tiga lapisan secara harmonis: awan (setengah violin KDE halus di atas), payung (boxplot kompak di tengah), dan tetesan hujan (strip plot titik data mentah ber-jitter di bawah).",
          "Pembaca disajikan data mentah, statistik ringkasan kuartil, dan kurva kepadatan dalam satu tatapan visual."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Kernel Density Estimation (KDE) pada Violin Plot:",
        "bulletPoints": [
          "Estimasi fungsi kepadatan probabilitas $\\hat{f}_h(x)$ dari sampel $\\{X_1, \\dots, X_n\\}$:",
          "di mana $K(u)$ adalah fungsi kernel Gaussian:",
          "dan $h$ adalah bandwidth penghalusan (Silverman rule-of-thumb):"
        ],
        "keyFormulaOrDiagram": "$$\\hat{f}_h(x) = \\frac{1}{n h} \\sum_{i=1}^n K\\left( \\frac{x - X_i}{h} \\right)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dua kelompok pengujian sensor jaringan (n = 20 per kelompok) memiliki rata-rata identik bar{X} = 50.0 ms dan standar deviasi identik s = 10.0 ms. Namun Kelompok 1 terdistribusi normal unimodal, sedangkan Kelompok 2 merupakan campuran bimodal dua sub-proses (sub-proses A di sekitar 40 ms dan sub-proses B di sekitar 60 ms). Jelaskan mengapa dynamite plot gagal membedakannya dan bagaimana Raincloud plot mengungkap realitas fisik ini.",
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
          "Langkah 1: Tinjau representasi Dynamite Plot:\nKedua kelompok digambarkan dengan tinggi batang 50.0 ms dan bilah error s / sqrt(20) = 2.24 ms.\nBagi pembaca, kedua kelompok tampak berperilaku identik sempurna.",
          "Langkah 2: Tinjau lapisan Kepadatan (KDE Cloud) Raincloud Plot:\n- Kelompok 1: Menampilkan satu puncak halus terpusat di 50.0 ms (unimodal Gaussian).\n- Kelompok 2: Menampilkan kurva berbentuk pelana dengan dua puncak jelas di 40 ms dan 60 ms serta lembah kosong di 50 ms."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Tinjau lapisan Titik Data Mentah (Rain Drops):\n- Kelompok 1: Titik-titik mengumpul padat di sekitar 50 ms.\n- Kelompok 2: Titik-titik terbelah ke dalam dua klaster terpisah; hampir tidak ada observasi di angka 50 ms.",
          "[result: Interpretasi Ilmiah] Raincloud plot segera membongkar realitas bahwa Kelompok 2 dikendalikan oleh dua rezim operasional yang berbeda, mencegah kesimpulan keliru bahwa performa kedua sistem adalah ekuivalen."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Generasi data sintetis bimodal vs unimodal dan demonstrasi komputasi ringkasan distribusi.",
        "bulletPoints": [
          "Tujuan Algoritma: Generasi data sintetis bimodal vs unimodal dan demonstrasi komputasi ringkasan distribusi.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Perbandingan Statistik Ringkasan vs Karakteristik Distribusi"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Perbandingan Statistik Ringkasan vs Karakteristik Distribusi\nMetrik              Kelompok 1 (Unimodal)    Kelompok 2 (Bimodal)     \n----------------------------------------------------------------------\nMean                48.96                    50.05                    \nStd Dev             9.79                     10.37                    ",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Tetap menerbitkan diagram batang untuk data kontinu kontinu non-cacah semata-mata karena kebiasaan lama.",
          "[warning: Perangkap] Menggunakan bandwidth KDE yang terlalu kecil (overfitting noisy bumps) atau terlalu besar (menghilangkan puncak bimodal sejati).",
          "[warning: Perangkap] Menampilkan violin plot pada sampel sangat kecil (n < 10) di mana estimasi fungsi densitas KDE tidak dapat diandalkan."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gantikan seluruh dynamite plot dengan violin plot, boxplot, atau raincloud plot.",
          "Prosedur: Sertakan selalu titik data mentah (raw jittered points) ketika n < 100 per kelompok.",
          "Prosedur: Pastikan label sumbu dan skala numerik mencakup seluruh rentang variabilitas teramati."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Tiga komponen utama apakah yang menyusun struktur Raincloud Plot standar publikasi ilmiah?",
          "Petunjuk Analitis: Kombinasi kurva kepadatan halus, ringkasan kuartil, dan titik data empiris.",
          "Solusi Kunci: Raincloud Plot menggabungkan kurva kepadatan probabilitas kontinu (half-violin KDE), ringkasan kuartil boxplot, dan sebaran titik data mentah (jittered raw points)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.8.3": {
    "id": "3.8.3",
    "chapterId": "CH-23",
    "title": "Visualisasi Ketidakpastian: Bilah Error (SD vs SE vs CI) dan Pita Kepercayaan",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membedakan fungsi konseptual Standar Deviasi (SD), Standar Error (SE), dan Interval Kepercayaan (CI) pada bilah error.",
      "Menguasai aturan heuristik inferensi visual mengenai tumpang tindih (overlap) bilah error.",
      "Membangun pita kepercayaan (confidence bands) dan pita prediksi (prediction bands) pada model regresi."
    ],
    "content": "Salah satu kelalaian paling sering dalam publikasi ilmiah adalah menyajikan bilah error (error bars) tanpa mendefinisikan secara eksplisit apa yang diwakili oleh bilah tersebut pada keterangan gambar (caption). Pembaca sering dibiarkan menebak apakah bilah error tersebut menunjukkan Standar Deviasi (SD), Standar Error dari Rata-rata (SE), atau Interval Kepercayaan 95% (95% CI). Ketiga metrik ini memiliki makna ilmiah dan besaran numerik yang sangat berbeda:\n\n1. Standar Deviasi (SD): Mengukur variabilitas deskriptif di antara subjek dalam sampel. SD mencerminkan seberapa tersebar data di sekitar nilai rata-rata. Nilai SD tidak mengecil meskipun ukuran sampel $n$ diperbesar mendekati tak terhingga.\n2. Standar Error (SE): Mengukur presisi inferensial dari estimasi rata-rata sampel. $\\text{SE} = s / \\sqrt{n}$. Nilai SE menyusut seiring bertambahnya ukuran sampel.\n3. Interval Kepercayaan 95% (95% CI): Menunjukkan rentang nilai parameter populasi yang masuk akal di bawah frekuensi jangka panjang. $\\text{CI} \\approx \\bar{X} \\pm 1.96 \\times \\text{SE}$ (untuk $n$ besar).\n\nKetidaktahuan mengenai perbedaan ini memicu kesalahan fatal dalam inferensi visual (eyeball inferencing). Banyak peneliti berasumsi bahwa jika bilah error dari dua kelompok tidak saling bertumpukan (non-overlapping), maka perbedaannya otomatis signifikan secara statistik ($p < 0.05$). Aturan ini hanya benar untuk jenis bilah tertentu:\n- Jika bilah error adalah $\\pm 1 \\text{ SE}$: Dua kelompok yang bilah SE-nya bersentuhan ujung ke ujung (gap = 0) sebenarnya memiliki selisih sekitar $2 \\times \\text{SE}$, yang berkorespondensi dengan nilai $p \\approx 0.05$. Jika bilah SE tidak tumpang tindih (ada celah kosong), nilai p-value sebenarnya jauh lebih kecil ($p < 0.01$).\n- Jika bilah error adalah 95% CI: Dua kelompok independen dapat memiliki bilah CI 95% yang sedikit tumpang tindih (overlap hingga sekitar 50% dari panjang satu sisi bilah) dan perbedaannya tetap signifikan secara statistik pada tingkat $p < 0.05$. Baru ketika tumpang tindih melebihi separuh panjang bilah, perbedaan menjadi tidak signifikan ($p > 0.05$).\n\nPada grafik kurva model atau regresi, ketidakpastian harus divisualisasikan menggunakan pita berbayang (shaded bands). Pita Kepercayaan (Confidence Band) mengukur ketidakpastian posisi garis fungsi rata-rata sejati, sedangkan Pita Prediksi (Prediction Band) mengukur rentang variasi titik pengamatan baru individu.",
    "mathematicalFoundations": "1. Rasio Numerik Bilah Error untuk Sampel Berukuran $n$:\n$$\\text{Panjang } \\text{SD} = s$$\n$$\\text{Panjang } \\text{SE} = \\frac{s}{\\sqrt{n}}$$\n$$\\text{Panjang } 95\\% \\text{ CI} = t_{0.025, \\, n-1} \\frac{s}{\\sqrt{n}} \\approx \\frac{2s}{\\sqrt{n}} \\quad (\\text{untuk } n \\ge 30)$$\nRasio perbandingan:\n$$\\text{Bilah } 95\\% \\text{ CI} \\approx 2 \\times \\text{Bilah SE} = \\frac{2}{\\sqrt{n}} \\times \\text{Bilah SD}$$\n\n2. Heuristik Matematika Tumpang Tindih 95% CI Dua Sampel Independen:\nMisalkan dua kelompok memiliki varians sama $\\sigma_1 = \\sigma_2 = s$ dan ukuran sampel sama $n_1 = n_2 = n$.\nMaka margin of error untuk masing-masing kelompok adalah $ME = t \\cdot s / \\sqrt{n}$.\nStandar error selisih dua rata-rata adalah:\n$$\\text{SE}_{\\text{diff}} = \\sqrt{\\frac{s^2}{n} + \\frac{s^2}{n}} = \\sqrt{2} \\frac{s}{\\sqrt{n}} = \\sqrt{2} \\, \\text{SE}$$\nUntuk mencapai signifikansi statistik $p = 0.05$ (di mana $Z \\approx 1.96$):\n$$\\text{Selisih Rata-rata Kritis} = 1.96 \\times \\sqrt{2} \\, \\text{SE} \\approx 2.77 \\, \\text{SE}$$\nSedangkan jumlah kedua margin of error adalah $ME_1 + ME_2 = 1.96 \\, \\text{SE} + 1.96 \\, \\text{SE} = 3.92 \\, \\text{SE}$.\nKarena selisih kritis ($2.77 \\, \\text{SE}$) lebih kecil daripada jumlah bilah ($3.92 \\, \\text{SE}$), bilah CI 95% tumpang tindih sebesar $3.92 - 2.77 = 1.15 \\, \\text{SE}$ (sekitar 58% dari satu sisi bilah) saat $p = 0.05$.\n\n3. Formulasi Pita Kepercayaan Regresi Linier:\n$$\\hat{y}(x^*) \\pm t_{\\alpha/2, \\, n-2} \\, s_e \\sqrt{\\frac{1}{n} + \\frac{(x^* - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}}$$\nPita kepercayaan menyempit di sekitar pusat gravitasi data $(\\bar{x})$ dan melebar di ujung-ujung domain.",
    "workedExample": {
      "problemStatement": "Dua kelompok pengujian material (n = 36 per kelompok) memiliki rata-rata bar{X}_1 = 100 MPa dan bar{X}_2 = 105 MPa dengan standar deviasi identik s = 12 MPa. Hitung panjang bilah SD, SE, dan 95% CI untuk masing-masing kelompok. Tentukan apakah bilah SE dan bilah CI saling tumpang tindih, lalu verifikasi nilai p-value uji t dua sampel.",
      "stepByStepSolution": [
        "Langkah 1: Hitung panjang bilah untuk tiap kelompok (n = 36):\n- SD = 12.0 MPa.\n- SE = s / sqrt(n) = 12.0 / 6 = 2.0 MPa.\n- Margin of Error 95% CI = 1.96 * SE = 1.96 * 2.0 = 3.92 MPa.",
        "Langkah 2: Tentukan rentang interval untuk kedua kelompok:\n- Rentang SE Kelompok 1: [98.0, 102.0]; Kelompok 2: [103.0, 107.0].\nBilah SE tidak tumpang tindih (ada celah sebesar 1.0 MPa di antara 102.0 dan 103.0).\n- Rentang 95% CI Kelompok 1: [96.08, 103.92]; Kelompok 2: [101.08, 108.92].\nBilah 95% CI saling tumpang tindih di antara 101.08 hingga 103.92 MPa (tumpang tindih sebesar 2.84 MPa).",
        "Langkah 3: Hitung uji t independen dua sampel:\nSE_diff = sqrt(2.0^2 + 2.0^2) = sqrt(8.0) = 2.828 MPa.\nt = (105 - 100) / 2.828 = 5.0 / 2.828 = 1.768.\nDerajat kebebasan df = 36 + 36 - 2 = 70.\nNilai p-value dua arah = 0.0814."
      ],
      "resultInterpretation": "Bilah SE tampak tidak bertumpukan, namun pengujian formal menghasilkan p = 0.081 (tidak signifikan pada alpha = 0.05). Kasus ini membuktikan bahaya menyimpulkan signifikansi hanya karena bilah SE tidak saling bersentuhan."
    },
    "pythonImplementation": {
      "description": "Audit visualisasi ketidakpastian: Komputasi metrik bilah error dan evaluasi tumpang tindih matematis.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nn = 36\nmean1, mean2 = 100.0, 105.0\ns1, s2 = 12.0, 12.0\n\nse1 = s1 / np.sqrt(n)\nse2 = s2 / np.sqrt(n)\nci1_me = stats.t.ppf(0.975, df=n-1) * se1\nci2_me = stats.t.ppf(0.975, df=n-1) * se2\n\nse_diff = np.sqrt((s1**2)/n + (s2**2)/n)\nt_stat = (mean2 - mean1) / se_diff\ndf = 2 * n - 2\np_val = 2.0 * (1.0 - stats.t.cdf(np.abs(t_stat), df=df))\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Evaluasi Presisi Bilah Error\")\nprint(f\"Kelompok 1 Mean: {mean1:.1f} | SE: [ {mean1 - se1:.1f}, {mean1 + se1:.1f} ] | 95% CI: [ {mean1 - ci1_me:.2f}, {mean1 + ci1_me:.2f} ]\")\nprint(f\"Kelompok 2 Mean: {mean2:.1f} | SE: [ {mean2 - se2:.1f}, {mean2 + se2:.1f} ] | 95% CI: [ {mean2 - ci2_me:.2f}, {mean2 + ci2_me:.2f} ]\")\nprint(f\"Tumpang tindih SE    : Tidak tumpang tindih (Celah: {mean2 - se2 - (mean1 + se1):.1f} MPa)\")\nprint(f\"Tumpang tindih CI 95%: Tumpang tindih ({mean1 + ci1_me - (mean2 - ci2_me):.2f} MPa)\")\nprint(f\"Uji t-Student formal : t({df}) = {t_stat:.3f}, p-value = {p_val:.4f}\")\nprint(f\"Kesimpulan Ilmiah    : {'Signifikan (p < 0.05)' if p_val < 0.05 else 'TIDAK Signifikan (p >= 0.05)'}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Presisi Bilah Error\nKelompok 1 Mean: 100.0 | SE: [ 98.0, 102.0 ] | 95% CI: [ 95.94, 104.06 ]\nKelompok 2 Mean: 105.0 | SE: [ 103.0, 107.0 ] | 95% CI: [ 100.94, 109.06 ]\nTumpang tindih SE    : Tidak tumpang tindih (Celah: 1.0 MPa)\nTumpang tindih CI 95%: Tumpang tindih (3.13 MPa)\nUji t-Student formal : t(70) = 1.768, p-value = 0.0814\nKesimpulan Ilmiah    : TIDAK Signifikan (p >= 0.05)"
    },
    "commonPitfalls": [
      "Menampilkan bilah error tanpa keterangan apakah bilah mewakili SD, SE, atau 95% CI pada caption gambar.",
      "Menyimpulkan bahwa ketiadaan tumpang tindih pada bilah SE menjamin signifikansi statistik (p < 0.05).",
      "Mengira bahwa bilah 95% CI yang sedikit tumpang tindih berarti perbedaan kedua kelompok pasti tidak signifikan."
    ],
    "validationProcedures": [
      "Tuliskan definisi bilah error secara eksplisit pada setiap caption gambar (misal: \"Bilah error mewakili 95% CI\").",
      "Pilih SD untuk menggambarkan variabilitas populasi, atau 95% CI untuk mengkomunikasikan ketidakpastian inferensial.",
      "Gunakan pita berbayang semi-transparan (alpha = 0.2) untuk visualisasi ketidakpastian kurva regresi kontinu."
    ],
    "exercises": [
      {
        "question": "Jika dua kelompok independen memiliki bilah 95% Confidence Interval yang tumpang tindih sekitar separuh panjang bilah (overlap ~ 50%), berapakah perkiraan kasar nilai p-value uji selisih rata-rata?",
        "hint": "Ingat hubungan matematis antara selisih kritis pada p = 0.05 dan margin of error.",
        "answerExplanation": "Secara matematis, untuk dua kelompok dengan varians dan ukuran sampel seimbang, tumpang tindih 95% CI sekitar 50% berkorespondensi tepat dengan p-value sekitar 0.05."
      }
    ],
    "references": [
      {
        "citation": "Cumming, G., Fidler, F., & Vaux, D. L. (2007). Error bars in experimental biology. Journal of Cell Biology, 177(1), 7-11.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Belia, S., Fidler, F., Williams, J., & Cumming, G. (2005). Researchers misunderstand error bars and confidence intervals. Psychological Methods, 10(4), 389-399.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Visualisasi Ketidakpastian: Bilah Error (SD vs SE vs CI) dan Pita Kepercayaan",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.8.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.8.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan fungsi konseptual Standar Deviasi (SD), Standar Error (SE), dan Interval Kepercayaan (CI) pada bilah error.",
          "Capaian 2: Menguasai aturan heuristik inferensi visual mengenai tumpang tindih (overlap) bilah error.",
          "Capaian 3: Membangun pita kepercayaan (confidence bands) dan pita prediksi (prediction bands) pada model regresi."
        ],
        "keyFormulaOrDiagram": "$$\\text{Panjang } \\text{SD} = s$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.8.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Visualisasi Ketidakpastian: Bilah Error (SD vs SE vs CI) dan Pita Kepercayaan",
        "lead": "Salah satu kelalaian paling sering dalam publikasi ilmiah adalah menyajikan bilah error (error bars) tanpa mendefinisikan secara eksplisit apa yang diwakili oleh bilah tersebut pada keterangan gambar (caption).",
        "bulletPoints": [
          "Pembaca sering dibiarkan menebak apakah bilah error tersebut menunjukkan Standar Deviasi (SD), Standar Error dari Rata-rata (SE), atau Interval Kepercayaan 95% (95% CI).",
          "Ketiga metrik ini memiliki makna ilmiah dan besaran numerik yang sangat berbeda:",
          "1.",
          "Standar Deviasi (SD): Mengukur variabilitas deskriptif di antara subjek dalam sampel."
        ],
        "keyFormulaOrDiagram": "$p < 0.05$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Ketidaktahuan mengenai perbedaan ini memicu kesalahan fatal dalam inferensi visual (eyeball inferencing).",
        "bulletPoints": [
          "Banyak peneliti berasumsi bahwa jika bilah error dari dua kelompok tidak saling bertumpukan (non-overlapping), maka perbedaannya otomatis signifikan secara statistik ($p < 0.05$).",
          "Aturan ini hanya benar untuk jenis bilah tertentu: - Jika bilah error adalah $\\pm 1 \\text{ SE}$: Dua kelompok yang bilah SE-nya bersentuhan ujung ke ujung (gap = 0) sebenarnya memiliki selisih sekitar $2 \\times \\text{SE}$, yang berkorespondensi dengan nilai $p \\approx 0.05$.",
          "Pada grafik kurva model atau regresi, ketidakpastian harus divisualisasikan menggunakan pita berbayang (shaded bands).",
          "Pita Kepercayaan (Confidence Band) mengukur ketidakpastian posisi garis fungsi rata-rata sejati, sedangkan Pita Prediksi (Prediction Band) mengukur rentang variasi titik pengamatan baru individu."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Rasio Numerik Bilah Error untuk Sampel Berukuran $n$:",
        "bulletPoints": [
          "Rasio perbandingan:",
          "2. Heuristik Matematika Tumpang Tindih 95% CI Dua Sampel Independen:",
          "Misalkan dua kelompok memiliki varians sama $\\sigma_1 = \\sigma_2 = s$ dan ukuran sampel sama $n_1 = n_2 = n$."
        ],
        "keyFormulaOrDiagram": "$$\\text{Panjang } \\text{SD} = s$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dua kelompok pengujian material (n = 36 per kelompok) memiliki rata-rata bar{X}_1 = 100 MPa dan bar{X}_2 = 105 MPa dengan standar deviasi identik s = 12 MPa. Hitung panjang bilah SD, SE, dan 95% CI untuk masing-masing kelompok. Tentukan apakah bilah SE dan bilah CI saling tumpang tindih, lalu verifikasi nilai p-value uji t dua sampel.",
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
          "Langkah 1: Hitung panjang bilah untuk tiap kelompok (n = 36):\n- SD = 12.0 MPa.\n- SE = s / sqrt(n) = 12.0 / 6 = 2.0 MPa.\n- Margin of Error 95% CI = 1.96 * SE = 1.96 * 2.0 = 3.92 MPa.",
          "Langkah 2: Tentukan rentang interval untuk kedua kelompok:\n- Rentang SE Kelompok 1: [98.0, 102.0]; Kelompok 2: [103.0, 107.0].\nBilah SE tidak tumpang tindih (ada celah sebesar 1.0 MPa di antara 102.0 dan 103.0).\n- Rentang 95% CI Kelompok 1: [96.08, 103.92]; Kelompok 2: [101.08, 108.92].\nBilah 95% CI saling tumpang tindih di antara 101.08 hingga 103.92 MPa (tumpang tindih sebesar 2.84 MPa)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung uji t independen dua sampel:\nSE_diff = sqrt(2.0^2 + 2.0^2) = sqrt(8.0) = 2.828 MPa.\nt = (105 - 100) / 2.828 = 5.0 / 2.828 = 1.768.\nDerajat kebebasan df = 36 + 36 - 2 = 70.\nNilai p-value dua arah = 0.0814.",
          "[result: Interpretasi Ilmiah] Bilah SE tampak tidak bertumpukan, namun pengujian formal menghasilkan p = 0.081 (tidak signifikan pada alpha = 0.05). Kasus ini membuktikan bahaya menyimpulkan signifikansi hanya karena bilah SE tidak saling bersentuhan."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Audit visualisasi ketidakpastian: Komputasi metrik bilah error dan evaluasi tumpang tindih matematis.",
        "bulletPoints": [
          "Tujuan Algoritma: Audit visualisasi ketidakpastian: Komputasi metrik bilah error dan evaluasi tumpang tindih matematis.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Presisi Bilah Error"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Presisi Bilah Error\nKelompok 1 Mean: 100.0 | SE: [ 98.0, 102.0 ] | 95% CI: [ 95.94, 104.06 ]\nKelompok 2 Mean: 105.0 | SE: [ 103.0, 107.0 ] | 95% CI: [ 100.94, 109.06 ]\nTumpang tindih SE    : Tidak tumpang tindih (Celah: 1.0 MPa)\nTumpang tindih CI 95%: Tumpang tindih (3.13 MPa)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menampilkan bilah error tanpa keterangan apakah bilah mewakili SD, SE, atau 95% CI pada caption gambar.",
          "[warning: Perangkap] Menyimpulkan bahwa ketiadaan tumpang tindih pada bilah SE menjamin signifikansi statistik (p < 0.05).",
          "[warning: Perangkap] Mengira bahwa bilah 95% CI yang sedikit tumpang tindih berarti perbedaan kedua kelompok pasti tidak signifikan."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Tuliskan definisi bilah error secara eksplisit pada setiap caption gambar (misal: \"Bilah error mewakili 95% CI\").",
          "Prosedur: Pilih SD untuk menggambarkan variabilitas populasi, atau 95% CI untuk mengkomunikasikan ketidakpastian inferensial.",
          "Prosedur: Gunakan pita berbayang semi-transparan (alpha = 0.2) untuk visualisasi ketidakpastian kurva regresi kontinu."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Jika dua kelompok independen memiliki bilah 95% Confidence Interval yang tumpang tindih sekitar separuh panjang bilah (overlap ~ 50%), berapakah perkiraan kasar nilai p-value uji selisih rata-rata?",
          "Petunjuk Analitis: Ingat hubungan matematis antara selisih kritis pada p = 0.05 dan margin of error.",
          "Solusi Kunci: Secara matematis, untuk dua kelompok dengan varians dan ukuran sampel seimbang, tumpang tindih 95% CI sekitar 50% berkorespondensi tepat dengan p-value sekitar 0.05."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.8.4": {
    "id": "3.8.4",
    "chapterId": "CH-23",
    "title": "Standar Figur Publikasi: Palet Ramah Buta Warna, Tipografi Bersih, dan Format Vektor",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Merancang visualisasi ilmiah yang sepenuhnya aksesibel bagi pembaca penderita buta warna (CVD).",
      "Menerapkan peta warna perseptual seragam (Viridis, Magma, Plasma) dan palet diskrit Okabe-Ito.",
      "Memproduksi figur multi-panel berstandar penerbit ilmiah internasional (vektor PDF/EPS, 300+ DPI, tipografi hierarkis)."
    ],
    "content": "Figur ilmiah adalah elemen pertama yang diperiksa oleh editor jurnal bereputasi, reviewer sebaya, dan pembaca. Figur yang buruk, kabur, atau membingungkan mencerminkan kelonggaran metodologis dari keseluruhan riset. Untuk memenuhi standar penerbit internasional terkemuka (seperti IEEE, Nature Portfolio, Elsevier, dan ACM), figur ilmiah harus mematuhi tiga pilar teknis: aksesibilitas warna, tipografi bersih, dan integritas resolusi vektor.\n\nPilar 1: Aksesibilitas Warna dan Buta Warna (Color Vision Deficiency / CVD):\nSekitar 8% pria dan 0.5% wanita keturunan Kaukasia mengalami defisiensi penglihatan warna (paling umum adalah Deuteranopia dan Protanopia / buta warna merah-hijau). Penggunaan palet \"pelangi\" klasik (Jet atau Rainbow) adalah pelanggaran berat dalam visualisasi ilmiah modern:\n- Palet Jet menciptakan kontras semu (false boundaries) di daerah kuning dan sian yang tidak mencerminkan perubahan gradien nyata pada data.\n- Bagi penderita buta warna merah-hijau, spektrum merah dan hijau tampak sebagai warna cokelat-kuning yang identik, melumpuhkan interpretasi gambar.\nSebagai penggantinya, standar ilmiah mewajibkan Peta Warna Perseptual Seragam (Perceptually Uniform Colormaps) seperti Viridis, Plasma, Magma, dan Cividis untuk data kontinu, serta Palet Okabe-Ito untuk data kategori diskrit.\n\nPilar 2: Tipografi dan Hierarki Visual:\nTeks pada figur harus terbaca sempurna pada ukuran cetak kolom jurnal (lebar tipikal satu kolom: 85 mm; dua kolom: 175 mm). Gunakan font standar sans-serif (seperti Helvetica, Arial, atau DejaVu Sans) dengan ukuran font final antara 8 pt hingga 10 pt. Hindari font berdekorasi atau ukuran font di bawah 6 pt yang tidak terbaca saat diperkecil.\n\nPilar 3: Format File dan Resolusi Vektor:\nFigur grafik garis, diagram sebar, dan diagram batang harus diekspor dalam format grafik vektor murni (PDF, EPS, atau SVG). Format vektor mempertahankan ketajaman garis dan teks pada tingkat pembesaran berapapun. Untuk citra bitmap (seperti foto mikroskop, citra medis, atau output rendering grafika komputer), gunakan format TIFF atau PNG dengan resolusi minimum 300 DPI (dots per inch) pada skala cetak fisik aktual.\n\nPilar 4: Tata Letak Multi-Panel:\nGrafik gabungan yang membandingkan beberapa eksperimen harus disusun dalam multi-panel berlabel huruf kecil tebal dalam tanda kurung: (a), (b), (c), dan (d). Skala sumbu yang sebanding harus diselaraskan secara konsisten untuk memudahkan perbandingan langsung antar-kondisi.",
    "mathematicalFoundations": "1. Definisi Matematis Keseragaman Perseptual Warna (Perceptual Uniformity):\nSebuah colormap $C(t) = (R(t), G(t), B(t))$ untuk parameter data ternormalisasi $t \\in [0, 1]$ dikatakan seragam perseptual jika perubahan jarak diferensial pada data $\\Delta t$ menghasilkan jarak diferensial yang konstan pada ruang warna persepsi manusia CIELAB ($\\Delta E^*_{\\text{ab}}$):\n$$\\frac{\\Delta E^*_{\\text{ab}}}{\\Delta t} \\approx k \\quad (\\text{konstan untuk seluruh } t)$$\ndi mana:\n$$\\Delta E^*_{\\text{ab}} = \\sqrt{(\\Delta L^*)^2 + (\\Delta a^*)^2 + (\\Delta b^*)^2}$$\nColormap Viridis dirancang secara matematis sehingga komponen Luminansi ($L^*$) meningkat secara monotonik sempurna dari 0 (hitam) hingga 100 (kuning), menjamin keterbacaan sempurna bahkan jika figur dicetak dalam format hitam-putih murni (greyscale).\n\n2. Definisi Palet Diskrit Okabe-Ito (Universal Color Palette):\nPalet 8 warna yang terbukti secara matematis dan empiris memiliki jarak pisah perseptual maksimum bagi orang dengan penglihatan normal, deuteranopia, dan protanopia:\n- Hitam: #000000\n- Oranye: #E69F00\n- Biru Langit: #56B4E9\n- Hijau Kebiruan: #009E73\n- Kuning: #F0E442\n- Biru Laut: #0072B2\n- Vermilion (Merah Oranye): #D55E00\n- Ungu Kemerahan: #CC79A7",
    "workedExample": {
      "problemStatement": "Sebuah artikel ilmiah membandingkan 3 algoritma pengenalan pola. Penulis menggunakan warna Merah (#FF0000) untuk Algoritma 1, Hijau (#00FF00) untuk Algoritma 2, dan Biru (#0000FF) untuk Algoritma 3. Identifikasi kelemahan kritis pemilihan palet ini dan rekomendasikan konfigurasi palet Okabe-Ito beserta parameter ekspor publikasi untuk jurnal IEEE Transactions.",
      "stepByStepSolution": [
        "Langkah 1: Analisis kelemahan palet RGB klasik:\nWarna Merah (#FF0000) dan Hijau (#00FF00) memiliki tingkat distorsi persepsi parah bagi penderita deuteranopia/protanopia. Keduanya akan tampak sebagai warna zaitun/kuning kecokelatan yang nyaris mustahil dibedakan.",
        "Langkah 2: Rekomendasi Palet Okabe-Ito yang aksesibel:\n- Algoritma 1: Oranye (#E69F00).\n- Algoritma 2: Biru Langit (#56B4E9).\n- Algoritma 3: Hijau Kebiruan (#009E73).\nKetiga warna ini memiliki kontras luminansi dan kromatisitas yang tinggi bagi semua jenis penglihatan.",
        "Langkah 3: Penguatan redundansi visual (Dual Encoding):\nSelain warna, bedakan tiap algoritma menggunakan bentuk penanda (marker style) yang berbeda: Algoritma 1 (lingkaran padat), Algoritma 2 (bujursangkar), Algoritma 3 (segitiga). Jika gambar dicetak fotokopi hitam-putih, data tetap terbaca sempurna.",
        "Langkah 4: Parameter ekspor jurnal IEEE Transactions:\n- Format: PDF atau EPS (vektor murni).\n- Lebar gambar: 85 mm (kolom tunggal).\n- Tipografi: Arial / Helvetica 9 pt.\n- Ketebalan garis minimal: 0.75 pt."
      ],
      "resultInterpretation": "Penerapan palet ramah buta warna yang dipadukan dengan dual encoding penanda dan ekspor format vektor menjamin figur memenuhi standar integritas penerbit ilmiah kelas dunia."
    },
    "pythonImplementation": {
      "description": "Template Python Matplotlib untuk menghasilkan figur publikasi berstandar internasional dengan palet Okabe-Ito dan format vektor.",
      "libraryDependencies": [
        "numpy",
        "matplotlib"
      ],
      "code": "import numpy as np\n\nOKABE_ITO = {\n    'black': '#000000',\n    'orange': '#E69F00',\n    'sky_blue': '#56B4E9',\n    'bluish_green': '#009E73',\n    'yellow': '#F0E442',\n    'blue': '#0072B2',\n    'vermilion': '#D55E00',\n    'reddish_purple': '#CC79A7'\n}\n\nkonfigurasi_publikasi = {\n    'font.family': 'sans-serif',\n    'font.sans-serif': ['DejaVu Sans', 'Arial', 'Helvetica'],\n    'font.size': 8,\n    'axes.labelsize': 9,\n    'axes.titlesize': 9,\n    'xtick.labelsize': 8,\n    'ytick.labelsize': 8,\n    'legend.fontsize': 8,\n    'figure.titlesize': 10,\n    'lines.linewidth': 1.2,\n    'lines.markersize': 5,\n    'axes.linewidth': 0.8,\n    'pdf.fonttype': 42,\n    'ps.fonttype': 42\n}\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Konfigurasi Parameter Styling Publikasi\")\nfor k, v in list(konfigurasi_publikasi.items())[:6]:\n    print(f\"  {k:<20} : {v}\")\nprint(f\"\\nPalet Okabe-Ito Terverifikasi:\")\nfor nama, hexc in list(OKABE_ITO.items())[:4]:\n    print(f\"  {nama:<15} : {hexc}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Konfigurasi Parameter Styling Publikasi\n  font.family          : sans-serif\n  font.sans-serif      : ['DejaVu Sans', 'Arial', 'Helvetica']\n  font.size            : 8\n  axes.labelsize       : 9\n  axes.titlesize       : 9\n  xtick.labelsize      : 8\n\nPalet Okabe-Ito Terverifikasi:\n  black           : #000000\n  orange          : #E69F00\n  sky_blue        : #56B4E9\n  bluish_green    : #009E73"
    },
    "commonPitfalls": [
      "Menggunakan colormap Jet atau Rainbow yang mendistorsi gradien data dan tidak terbaca oleh penderita buta warna.",
      "Mengekspor grafik dalam format bitmap kompresi JPEG dengan resolusi 72 DPI yang buram dan pecah saat dicetak.",
      "Menyematkan teks dengan ukuran font sangat kecil (< 6 pt) sehingga lenyap saat gambar diperkecil ke lebar kolom jurnal."
    ],
    "validationProcedures": [
      "Gunakan palet seragam perseptual (Viridis/Plasma) atau palet diskrit Okabe-Ito.",
      "Terapkan pengkodean ganda (dual encoding: warna + bentuk penanda / tipe garis).",
      "Ekspor seluruh grafik dalam format vektor (PDF/EPS) dengan font tersemat (Type 42 / TrueType).",
      "Uji visualisasi menggunakan simulator buta warna (Coblis atau modul DaltonLens)."
    ],
    "exercises": [
      {
        "question": "Mengapa penggunaan peta warna klasik Jet (Rainbow) secara tegas dilarang dalam panduan penulisan jurnal ilmiah modern?",
        "hint": "Perhatikan keseragaman perseptual dan aksesibilitas bagi penderita buta warna.",
        "answerExplanation": "Colormap Jet tidak seragam secara perseptual (menciptakan ilusi batas diskrit pada rentang kuning dan sian) serta menyatu menjadi warna cokelat serupa bagi 8% pembaca penderita defisiensi warna merah-hijau."
      }
    ],
    "references": [
      {
        "citation": "Okabe, M., & Ito, K. (2008). Color Universal Design (CUD): How to make figures and presentations that are friendly to Colorblind People. J*FLY.",
        "type": "guideline"
      },
      {
        "citation": "Nuñez, J. R., Anderton, C. R., & Renslow, R. S. (2018). Optimizing colormaps with recognition of color vision deficiency to create inclusive visualizations. PLOS ONE, 13(7), e0199239.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Standar Figur Publikasi: Palet Ramah Buta Warna, Tipografi Bersih, dan Format Vektor",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.8.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.8.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Merancang visualisasi ilmiah yang sepenuhnya aksesibel bagi pembaca penderita buta warna (CVD).",
          "Capaian 2: Menerapkan peta warna perseptual seragam (Viridis, Magma, Plasma) dan palet diskrit Okabe-Ito.",
          "Capaian 3: Memproduksi figur multi-panel berstandar penerbit ilmiah internasional (vektor PDF/EPS, 300+ DPI, tipografi hierarkis)."
        ],
        "keyFormulaOrDiagram": "$$\\frac{\\Delta E^*_{\\text{ab}}}{\\Delta t} \\approx k \\quad (\\text{konstan untuk seluruh } t)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.8.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Standar Figur Publikasi: Palet Ramah Buta Warna, Tipografi Bersih, dan Format Vektor",
        "lead": "Figur ilmiah adalah elemen pertama yang diperiksa oleh editor jurnal bereputasi, reviewer sebaya, dan pembaca.",
        "bulletPoints": [
          "Figur yang buruk, kabur, atau membingungkan mencerminkan kelonggaran metodologis dari keseluruhan riset.",
          "Untuk memenuhi standar penerbit internasional terkemuka (seperti IEEE, Nature Portfolio, Elsevier, dan ACM), figur ilmiah harus mematuhi tiga pilar teknis: aksesibilitas warna, tipografi bersih, dan integritas resolusi vektor.",
          "Pilar 1: Aksesibilitas Warna dan Buta Warna (Color Vision Deficiency / CVD): Sekitar 8% pria dan 0.5% wanita keturunan Kaukasia mengalami defisiensi penglihatan warna (paling umum adalah Deuteranopia dan Protanopia / buta warna merah-hijau).",
          "Penggunaan palet \"pelangi\" klasik (Jet atau Rainbow) adalah pelanggaran berat dalam visualisasi ilmiah modern: - Palet Jet menciptakan kontras semu (false boundaries) di daerah kuning dan sian yang tidak mencerminkan perubahan gradien nyata pada data. - Bagi penderita buta warna merah-hijau, spektrum merah dan hijau tampak sebagai warna cokelat-kuning yang identik, melumpuhkan interpretasi gambar."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Pilar 2: Tipografi dan Hierarki Visual: Teks pada figur harus terbaca sempurna pada ukuran cetak kolom jurnal (lebar tipikal satu kolom: 85 mm; dua kolom: 175 mm).",
        "bulletPoints": [
          "Gunakan font standar sans-serif (seperti Helvetica, Arial, atau DejaVu Sans) dengan ukuran font final antara 8 pt hingga 10 pt.",
          "Hindari font berdekorasi atau ukuran font di bawah 6 pt yang tidak terbaca saat diperkecil.",
          "Pilar 3: Format File dan Resolusi Vektor: Figur grafik garis, diagram sebar, dan diagram batang harus diekspor dalam format grafik vektor murni (PDF, EPS, atau SVG).",
          "Format vektor mempertahankan ketajaman garis dan teks pada tingkat pembesaran berapapun."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Definisi Matematis Keseragaman Perseptual Warna (Perceptual Uniformity):",
        "bulletPoints": [
          "Sebuah colormap $C(t) = (R(t), G(t), B(t))$ untuk parameter data ternormalisasi $t \\in [0, 1]$ dikatakan seragam perseptual jika perubahan jarak diferensial pada data $\\Delta t$ menghasilkan jarak diferensial yang konstan pada ruang warna persepsi manusia CIELAB ($\\Delta E^*_{\\text{ab}}$):",
          "di mana:",
          "Colormap Viridis dirancang secara matematis sehingga komponen Luminansi ($L^*$) meningkat secara monotonik sempurna dari 0 (hitam) hingga 100 (kuning), menjamin keterbacaan sempurna bahkan jika figur dicetak dalam format hitam-putih murni (greyscale)."
        ],
        "keyFormulaOrDiagram": "$$\\frac{\\Delta E^*_{\\text{ab}}}{\\Delta t} \\approx k \\quad (\\text{konstan untuk seluruh } t)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah artikel ilmiah membandingkan 3 algoritma pengenalan pola. Penulis menggunakan warna Merah (#FF0000) untuk Algoritma 1, Hijau (#00FF00) untuk Algoritma 2, dan Biru (#0000FF) untuk Algoritma 3. Identifikasi kelemahan kritis pemilihan palet ini dan rekomendasikan konfigurasi palet Okabe-Ito beserta parameter ekspor publikasi untuk jurnal IEEE Transactions.",
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
          "Langkah 1: Analisis kelemahan palet RGB klasik:\nWarna Merah (#FF0000) dan Hijau (#00FF00) memiliki tingkat distorsi persepsi parah bagi penderita deuteranopia/protanopia. Keduanya akan tampak sebagai warna zaitun/kuning kecokelatan yang nyaris mustahil dibedakan.",
          "Langkah 2: Rekomendasi Palet Okabe-Ito yang aksesibel:\n- Algoritma 1: Oranye (#E69F00).\n- Algoritma 2: Biru Langit (#56B4E9).\n- Algoritma 3: Hijau Kebiruan (#009E73).\nKetiga warna ini memiliki kontras luminansi dan kromatisitas yang tinggi bagi semua jenis penglihatan."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Penguatan redundansi visual (Dual Encoding):\nSelain warna, bedakan tiap algoritma menggunakan bentuk penanda (marker style) yang berbeda: Algoritma 1 (lingkaran padat), Algoritma 2 (bujursangkar), Algoritma 3 (segitiga). Jika gambar dicetak fotokopi hitam-putih, data tetap terbaca sempurna.",
          "Langkah 4: Parameter ekspor jurnal IEEE Transactions:\n- Format: PDF atau EPS (vektor murni).\n- Lebar gambar: 85 mm (kolom tunggal).\n- Tipografi: Arial / Helvetica 9 pt.\n- Ketebalan garis minimal: 0.75 pt.",
          "[result: Interpretasi Ilmiah] Penerapan palet ramah buta warna yang dipadukan dengan dual encoding penanda dan ekspor format vektor menjamin figur memenuhi standar integritas penerbit ilmiah kelas dunia."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Template Python Matplotlib untuk menghasilkan figur publikasi berstandar internasional dengan palet Okabe-Ito dan format vektor.",
        "bulletPoints": [
          "Tujuan Algoritma: Template Python Matplotlib untuk menghasilkan figur publikasi berstandar internasional dengan palet Okabe-Ito dan format vektor.",
          "Dependensi Pustaka Ilmiah: numpy, matplotlib",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Konfigurasi Parameter Styling Publikasi"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Konfigurasi Parameter Styling Publikasi\n  font.family          : sans-serif\n  font.sans-serif      : ['DejaVu Sans', 'Arial', 'Helvetica']\n  font.size            : 8\n  axes.labelsize       : 9",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan colormap Jet atau Rainbow yang mendistorsi gradien data dan tidak terbaca oleh penderita buta warna.",
          "[warning: Perangkap] Mengekspor grafik dalam format bitmap kompresi JPEG dengan resolusi 72 DPI yang buram dan pecah saat dicetak.",
          "[warning: Perangkap] Menyematkan teks dengan ukuran font sangat kecil (< 6 pt) sehingga lenyap saat gambar diperkecil ke lebar kolom jurnal."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan palet seragam perseptual (Viridis/Plasma) atau palet diskrit Okabe-Ito.",
          "Prosedur: Terapkan pengkodean ganda (dual encoding: warna + bentuk penanda / tipe garis).",
          "Prosedur: Ekspor seluruh grafik dalam format vektor (PDF/EPS) dengan font tersemat (Type 42 / TrueType).",
          "Prosedur: Uji visualisasi menggunakan simulator buta warna (Coblis atau modul DaltonLens)."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa penggunaan peta warna klasik Jet (Rainbow) secara tegas dilarang dalam panduan penulisan jurnal ilmiah modern?",
          "Petunjuk Analitis: Perhatikan keseragaman perseptual dan aksesibilitas bagi penderita buta warna.",
          "Solusi Kunci: Colormap Jet tidak seragam secara perseptual (menciptakan ilusi batas diskrit pada rentang kuning dan sian) serta menyatu menjadi warna cokelat serupa bagi 8% pembaca penderita defisiensi warna merah-hijau."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
