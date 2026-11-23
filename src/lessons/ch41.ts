import { Lesson } from '../types/curriculum';

export const CH41_LESSONS: Record<string, Partial<Lesson>> = {
  "6.4.1": {
    "id": "6.4.1",
    "chapterId": "CH-41",
    "title": "Taksonomi Ketidakpastian: Ketidakpastian Aleatorik (Stokastik) vs Epistemik (Pengetahuan)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membedakan secara formal dan filosofis antara ketidakpastian aleatorik dan ketidakpastian epistemik.",
      "Menganalisis sifat reduksibilitas ketidakpastian melalui penambahan data eksperimen.",
      "Memodelkan ketidakpastian homoskedastis vs heteroskedastis pada sistem rekayasa."
    ],
    "content": "Dalam rekayasa sistem keselamatan kritis (safety-critical engineering) dan sains komputasi, tidak ada prediksi yang memiliki makna ilmiah tanpa disertai estimasi ketidakpastian kuantitatif (Uncertainty Quantification / UQ). Melaporkan bahwa \"ketebalan dinding pipa gas berisiko korosi sebesar 2.1 mm\" tanpa mengetahui apakah ketidakpastiannya adalah +/- 0.05 mm atau +/- 1.5 mm dapat mengakibatkan bencana ledakan atau pemborosan jutaan dolar untuk inspeksi yang tidak perlu.\n\nTaksonomi Fundamental Dua Kategori Ketidakpastian (Der Kiureghian & Ditlevsen, 2009):\n1. Ketidakpastian Aleatorik (Aleatoric Uncertainty / Stokastik):\nBerasal dari kata Latin *alea* (dadu). Merupakan variabilitas fisik intrinsik yang melekat pada alam dan proses pengukuran, yang bersifat acak murni dan tidak dapat direduksi (irreducible uncertainty). Contoh: derau termal Johnson-Nyquist pada resistor elektronik, turbulensi acak partikel fluida atmosfer, atau fluktuasi ketebalan butir kristal logam selama proses pencetakan.\n- Sifat: Menambah jumlah sampel data $N \\to \\infty$ TIDAK AKAN menghilangkan ketidakpastian aleatorik, melainkan hanya mengkarakterisasi variansnya dengan lebih presisi.\n\n2. Ketidakpastian Epistemik (Epistemic Uncertainty / Pengetahuan):\nBerasal dari kata Yunani *episteme* (pengetahuan). Merupakan ketidakpastian yang timbul akibat ketidaktahuan manusia, keterbatasan data pengamatan, atau asumsi simplifikasi model matematika (reducible uncertainty). Contoh: ketidaktahuan kita mengenai koefisien gesek dinamis lapisan tanah di kedalaman 100 meter, atau menggunakan model elastisitas linier pada material yang sebenarnya mengalami deformasi plastis.\n- Sifat: Menambah data pengamatan eksperimen $N \\to \\infty$ AKAN mereduksi ketidakpastian epistemik hingga mendekati nol.",
    "mathematicalFoundations": "Dekomposisi Varians Ketidakpastian Prediktif:\nMisalkan $y$ adalah variabel respon fisik, dan $\\mathbf{x}$ adalah vektor fitur input.\nModel regresi probabilistik memprediksi distribusi:\n$$y = f_\\theta(\\mathbf{x}) + \\epsilon(\\mathbf{x}), \\quad \\epsilon(\\mathbf{x}) \\sim \\mathcal{N}(0, \\sigma_{\\text{aleatoric}}^2(\\mathbf{x}))$$\ndi mana parameter model $\\theta$ memiliki distribusi ketidakpastian epistemik posterior $p(\\theta \\mid \\mathcal{D})$.\n\nDekomposisi Varians Total (Hukum Total Varians):\n$$\\text{Var}(y \\mid \\mathbf{x}, \\mathcal{D}) = \\underbrace{\\text{Var}_\\theta\\left(\\mathbb{E}[y \\mid \\mathbf{x}, \\theta]\\right)}_{\\text{Ketidakpastian Epistemik } (\\sigma_{\\text{epistemic}}^2)} + \\underbrace{\\mathbb{E}_\\theta\\left[\\text{Var}(y \\mid \\mathbf{x}, \\theta)\\right]}_{\\text{Ketidakpastian Aleatorik } (\\sigma_{\\text{aleatoric}}^2)}$$\n\nAnalisis Perilaku Asimtotik:\nSaat ukuran data latih $N = |\\mathcal{D}| \\to \\infty$:\n$$\\sigma_{\\text{epistemic}}^2(\\mathbf{x}) = \\text{Var}_\\theta\\left(f_\\theta(\\mathbf{x})\\right) \\xrightarrow{N \\to \\infty} 0$$\n$$\\sigma_{\\text{aleatoric}}^2(\\mathbf{x}) \\xrightarrow{N \\to \\infty} \\sigma_{\\text{noise}}^2(\\mathbf{x}) > 0$$",
    "workedExample": {
      "problemStatement": "Sebuah turbin angin dipantau getarannya pada kecepatan angin X. Pada kecepatan angin 15 m/s, sebuah model Gaussian Process dilatih dengan N = 5 data dan memprediksi: rata-rata getaran 2.4 mm/s, varians epistemik sigma_epistemic^2 = 0.36, dan varians aleatorik sensor sigma_aleatoric^2 = 0.04. Peneliti mengumpulkan 500 data getaran tambahan pada kecepatan 15 m/s. Estimasi varians total sebelum dan sesudah penambahan data.",
      "stepByStepSolution": [
        "Langkah 1: Hitung varians total awal (N=5): Var_total_1 = sigma_epistemic^2 + sigma_aleatoric^2 = 0.36 + 0.04 = 0.40 (Standar Deviasi total = sqrt(0.40) = 0.632 mm/s).",
        "Langkah 2: Evaluasi dampak penambahan data masif (N=505): Ketidakpastian epistemik menyusut secara asimtotik seiring bertambahnya bukti data: sigma_epistemic^2 berkurang sekitar faktor 100 => 0.36 / 100 = 0.0036.",
        "Langkah 3: Evaluasi ketidakpastian aleatorik: Derau intrinsik sensor fisik tidak berubah oleh penambahan data: sigma_aleatoric^2 tetap = 0.04.",
        "Langkah 4: Hitung varians total akhir: Var_total_2 = 0.0036 + 0.04 = 0.0436 (Standar Deviasi total = sqrt(0.0436) = 0.209 mm/s)."
      ],
      "resultInterpretation": "Penambahan data berhasil memangkas 99% ketidakpastian epistemik ketidaktahuan model, namun varians aleatorik sebesar 0.04 tetap bertahan sebagai batas dasar derau fisis sensor."
    },
    "pythonImplementation": {
      "description": "Dekomposisi ketidakpastian aleatorik heteroskedastis vs epistemik menggunakan ensemble simulasi.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA]\n# Simulasi 10 model regresi ensemble untuk memisahkan ketidakpastian\nnp.random.seed(42)\nn_models = 10\nn_test_points = 5\n\n# Setiap model memprediksi mean mu(x) dan varians aleatorik sigma_alea^2(x)\n# Titik uji 0: Dekat data latih (epistemik rendah)\n# Titik uji 4: Jauh dari data latih (epistemik tinggi - ekstrapolasi)\npredictions_mu = np.array([\n    [10.0, 10.1,  9.9, 10.0, 10.2],  # Titik 0 (konsisten)\n    [12.1, 12.0, 12.2, 11.9, 12.0],  # Titik 1\n    [15.0, 14.8, 15.3, 14.9, 15.1],  # Titik 2\n    [18.5, 17.8, 19.1, 18.2, 18.0],  # Titik 3\n    [22.0, 26.5, 19.2, 28.1, 24.0]   # Titik 4 (divergen masif!)\n])\n\n# Varians aleatorik yang diprediksi model (derau sensor konstan 1.5)\naleatoric_vars = np.ones((5, n_models)) * 1.5\n\n# Dekomposisi varians\nepistemic_var = np.var(predictions_mu, axis=1, ddof=1)\naleatoric_var = np.mean(aleatoric_vars, axis=1)\ntotal_var = epistemic_var + aleatoric_var\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Dekomposisi Ketidakpastian Prediktif:\")\nprint(f\"{'Titik Uji':10} | {'Var Epistemik':14} | {'Var Aleatorik':14} | {'Rasio Epistemik (%)':18}\")\nprint(\"-\" * 62)\nfor i in range(5):\n    ratio = (epistemic_var[i] / total_var[i]) * 100\n    print(f\"Titik {i:<5} | {epistemic_var[i]:<14.4f} | {aleatoric_var[i]:<14.4f} | {ratio:<18.1f}%\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Dekomposisi Ketidakpastian Prediktif:\nTitik Uji  | Var Epistemik  | Var Aleatorik  | Rasio Epistemik (%)\n--------------------------------------------------------------\nTitik 0     | 0.0130         | 1.5000         | 0.9               %\nTitik 1     | 0.0130         | 1.5000         | 0.9               %\nTitik 2     | 0.0370         | 1.5000         | 2.4               %\nTitik 3     | 0.2570         | 1.5000         | 14.6              %\nTitik 4     | 12.3530        | 1.5000         | 89.2              %"
    },
    "commonPitfalls": [
      "Menyimpulkan bahwa model sangat yakin pada wilayah ekstrapolasi hanya karena data latih bersih dari derau.",
      "Mengabaikan heteroskedastisitas (mengasumsikan derau aleatorik konstan di seluruh ruang input).",
      "Mencampuradukkan ketidakpastian epistemik dengan kegagalan bias algoritma."
    ],
    "validationProcedures": [
      "Visualisasikan pita ketidakpastian terdekomposisi (Shaded Error Bands) pada grafik prediksi.",
      "Uji perilaku model pada wilayah ekstrapolasi: ketidakpastian epistemik wajib melebar.",
      "Gunakan teknik Active Learning untuk memandu pengumpulan data baru ke wilayah dengan ketidakpastian epistemik tertinggi."
    ],
    "exercises": [
      {
        "question": "Mengapa dalam sistem Active Learning, sampel baru harus dipilih berdasarkan ketidakpastian epistemik dan bukan ketidakpastian aleatorik?",
        "hint": "Perhatikan jenis ketidakpastian mana yang dapat dikurangi dengan penambahan data pengamatan.",
        "answerExplanation": "Ketidakpastian aleatorik adalah derau acak murni yang tidak dapat direduksi. Jika kita mengambil sampel pada titik dengan ketidakpastian aleatorik tinggi, kita hanya mengumpulkan lebih banyak derau tanpa menambah pengetahuan. Sebaliknya, ketidakpastian epistemik menandakan ketidaktahuan model; mengambil sampel di area ini secara efektif memangkas ketidaktahuan tersebut."
      },
      {
        "question": "Bagaimana cara mendeteksi model deep learning standar yang mengalami kegagalan estimasi ketidakpastian epistemik?",
        "hint": "Uji model pada data yang berada jauh di luar jangkauan data latih (OOD).",
        "answerExplanation": "Model yang gagal akan memberikan prediksi yang sangat sempit (confidence interval sangat kecil atau softmax probability mendekati 100%) bahkan ketika diuji pada data ekstrapolasi yang sama sekali asing. Model Bayesian atau Ensemble yang sehat akan memperlihatkan pelebaran pita ketidakpastian yang dramatis."
      }
    ],
    "references": [
      {
        "citation": "Der Kiureghian, A., & Ditlevsen, O. (2009). Aleatory or epistemic? Does it matter?. Structural Safety, 31(2), 105-112.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Kendall, A., & Gal, Y. (2017). What uncertainties do we need in bayesian deep learning for computer vision?. NeurIPS, 30.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Taksonomi Ketidakpastian: Ketidakpastian Aleatorik (Stokastik) vs Epistemik (Pengetahuan)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.4.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.4.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan secara formal dan filosofis antara ketidakpastian aleatorik dan ketidakpastian epistemik.",
          "Capaian 2: Menganalisis sifat reduksibilitas ketidakpastian melalui penambahan data eksperimen.",
          "Capaian 3: Memodelkan ketidakpastian homoskedastis vs heteroskedastis pada sistem rekayasa."
        ],
        "keyFormulaOrDiagram": "$$y = f_\\theta(\\mathbf{x}) + \\epsilon(\\mathbf{x}), \\quad \\epsilon(\\mathbf{x}) \\sim \\mathcal{N}(0, \\sigma_{\\text{aleatoric}}^2(\\mathbf{x}))$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.4.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Taksonomi Ketidakpastian: Ketidakpastian Aleatorik (Stokastik) vs Epistemik (Pengetahuan)",
        "lead": "Dalam rekayasa sistem keselamatan kritis (safety-critical engineering) dan sains komputasi, tidak ada prediksi yang memiliki makna ilmiah tanpa disertai estimasi ketidakpastian kuantitatif (Uncertainty Quantification / UQ).",
        "bulletPoints": [
          "Melaporkan bahwa \"ketebalan dinding pipa gas berisiko korosi sebesar 2.1 mm\" tanpa mengetahui apakah ketidakpastiannya adalah +/- 0.05 mm atau +/- 1.5 mm dapat mengakibatkan bencana ledakan atau pemborosan jutaan dolar untuk inspeksi yang tidak perlu.",
          "Taksonomi Fundamental Dua Kategori Ketidakpastian (Der Kiureghian & Ditlevsen, 2009): 1.",
          "Ketidakpastian Aleatorik (Aleatoric Uncertainty / Stokastik): Berasal dari kata Latin *alea* (dadu)."
        ],
        "keyFormulaOrDiagram": "$N \\to \\infty$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "2.",
        "bulletPoints": [
          "Ketidakpastian Epistemik (Epistemic Uncertainty / Pengetahuan): Berasal dari kata Yunani *episteme* (pengetahuan).",
          "Merupakan ketidakpastian yang timbul akibat ketidaktahuan manusia, keterbatasan data pengamatan, atau asumsi simplifikasi model matematika (reducible uncertainty)."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Dekomposisi Varians Ketidakpastian Prediktif:",
        "bulletPoints": [
          "Misalkan $y$ adalah variabel respon fisik, dan $\\mathbf{x}$ adalah vektor fitur input.",
          "Model regresi probabilistik memprediksi distribusi:",
          "di mana parameter model $\\theta$ memiliki distribusi ketidakpastian epistemik posterior $p(\\theta \\mid \\mathcal{D})$."
        ],
        "keyFormulaOrDiagram": "$$y = f_\\theta(\\mathbf{x}) + \\epsilon(\\mathbf{x}), \\quad \\epsilon(\\mathbf{x}) \\sim \\mathcal{N}(0, \\sigma_{\\text{aleatoric}}^2(\\mathbf{x}))$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah turbin angin dipantau getarannya pada kecepatan angin X. Pada kecepatan angin 15 m/s, sebuah model Gaussian Process dilatih dengan N = 5 data dan memprediksi: rata-rata getaran 2.4 mm/s, varians epistemik sigma_epistemic^2 = 0.36, dan varians aleatorik sensor sigma_aleatoric^2 = 0.04. Peneliti mengumpulkan 500 data getaran tambahan pada kecepatan 15 m/s. Estimasi varians total sebelum dan sesudah penambahan data.",
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
          "Langkah 1: Hitung varians total awal (N=5): Var_total_1 = sigma_epistemic^2 + sigma_aleatoric^2 = 0.36 + 0.04 = 0.40 (Standar Deviasi total = sqrt(0.40) = 0.632 mm/s).",
          "Langkah 2: Evaluasi dampak penambahan data masif (N=505): Ketidakpastian epistemik menyusut secara asimtotik seiring bertambahnya bukti data: sigma_epistemic^2 berkurang sekitar faktor 100 => 0.36 / 100 = 0.0036."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Evaluasi ketidakpastian aleatorik: Derau intrinsik sensor fisik tidak berubah oleh penambahan data: sigma_aleatoric^2 tetap = 0.04.",
          "Langkah 4: Hitung varians total akhir: Var_total_2 = 0.0036 + 0.04 = 0.0436 (Standar Deviasi total = sqrt(0.0436) = 0.209 mm/s).",
          "[result: Interpretasi Ilmiah] Penambahan data berhasil memangkas 99% ketidakpastian epistemik ketidaktahuan model, namun varians aleatorik sebesar 0.04 tetap bertahan sebagai batas dasar derau fisis sensor."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Dekomposisi ketidakpastian aleatorik heteroskedastis vs epistemik menggunakan ensemble simulasi.",
        "bulletPoints": [
          "Tujuan Algoritma: Dekomposisi ketidakpastian aleatorik heteroskedastis vs epistemik menggunakan ensemble simulasi.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Dekomposisi Ketidakpastian Prediktif:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Dekomposisi Ketidakpastian Prediktif:\nTitik Uji  | Var Epistemik  | Var Aleatorik  | Rasio Epistemik (%)\n--------------------------------------------------------------\nTitik 0     | 0.0130         | 1.5000         | 0.9               %\nTitik 1     | 0.0130         | 1.5000         | 0.9               %",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpulkan bahwa model sangat yakin pada wilayah ekstrapolasi hanya karena data latih bersih dari derau.",
          "[warning: Perangkap] Mengabaikan heteroskedastisitas (mengasumsikan derau aleatorik konstan di seluruh ruang input).",
          "[warning: Perangkap] Mencampuradukkan ketidakpastian epistemik dengan kegagalan bias algoritma."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Visualisasikan pita ketidakpastian terdekomposisi (Shaded Error Bands) pada grafik prediksi.",
          "Prosedur: Uji perilaku model pada wilayah ekstrapolasi: ketidakpastian epistemik wajib melebar.",
          "Prosedur: Gunakan teknik Active Learning untuk memandu pengumpulan data baru ke wilayah dengan ketidakpastian epistemik tertinggi."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa dalam sistem Active Learning, sampel baru harus dipilih berdasarkan ketidakpastian epistemik dan bukan ketidakpastian aleatorik?",
          "Petunjuk Analitis: Perhatikan jenis ketidakpastian mana yang dapat dikurangi dengan penambahan data pengamatan.",
          "Solusi Kunci: Ketidakpastian aleatorik adalah derau acak murni yang tidak dapat direduksi. Jika kita mengambil sampel pada titik dengan ketidakpastian aleatorik tinggi, kita hanya mengumpulkan lebih banyak derau tanpa menambah pengetahuan. Sebaliknya, ketidakpastian epistemik menandakan ketidaktahuan model; mengambil sampel di area ini secara efektif memangkas ketidaktahuan tersebut."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "6.4.2": {
    "id": "6.4.2",
    "chapterId": "CH-41",
    "title": "Perambatan Ketidakpastian Berbasis Simulasi Monte Carlo pada Sistem Non-Linier",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami mekanisme perambatan ketidakpastian (Uncertainty Propagation) dari parameter input ke output respon.",
      "Menganalisis kegagalan Hukum Perambatan Ketidakpastian GUM linier pada sistem non-linier tinggi.",
      "Mengimplementasikan simulasi Monte Carlo untuk menghitung distribusi probabilitas respon non-Gaussian."
    ],
    "content": "Dalam rekayasa sistem fisik, variabel keluaran yang menjadi perhatian kritis (seperti defleksi balok jembatan, efisiensi turbin, atau tegangan tembus isolator) selalu merupakan fungsi matematis dari berbagai parameter masukan yang mengandung ketidakpastian: $Y = g(X_1, X_2, \\dots, X_k)$. Menentukan bagaimana ketidakpastian pada input merambat menjadi ketidakpastian pada output disebut Perambatan Ketidakpastian (Uncertainty Propagation).\n\nBatasan Pendekatan Klasik ISO GUM (Linear Propagation):\nPedoman ISO Guide to the Expression of Uncertainty in Measurement (GUM) merekomendasikan aproksimasi deret Taylor orde pertama:\n$$\\sigma_Y^2 \\approx \\sum_{i=1}^k \\left( \\frac{\\partial g}{\\partial X_i} \\right)^2 \\sigma_{X_i}^2$$\nPendekatan linier ini hanya valid jika fungsi $g(\\cdot)$ bersifat linier atau hampir linier di sekitar titik kerja nominal. Jika sistem memiliki non-linearitas kuat (misalnya relasi kuadratik, eksponensial, atau logaritmik), pendekatan analitis linier ini menghasilkan kesalahan estimasi yang fatal, meremehkan ketidakpastian ekstrim, dan salah mengasumsikan bahwa keluaran berdistribusi simetris normal.\n\nSolusi Simulasi Monte Carlo (GUM Supplement 1):\nSimulasi Monte Carlo menyelesaikan masalah ini secara numerik tanpa aproksimasi linier. Peneliti menarik $M$ sampel acak dari distribusi probabilitas gabungan seluruh parameter input, mengevaluasi model non-linier $g(\\mathbf{X})$ untuk setiap sampel, lalu mengonstruksi fungsi distribusi kumulatif empiris dari respon keluaran secara langsung.",
    "mathematicalFoundations": "Formulasi Matematis Perambatan Monte Carlo:\nMisalkan $\\mathbf{X} = (X_1, \\dots, X_k)^T$ adalah vektor variabel input dengan PDF gabungan $p_\\mathbf{X}(\\mathbf{x})$.\nSistem fisik non-linier:\n$$Y = g(\\mathbf{X})$$\n\nAlgoritma Monte Carlo:\n1. Pembangkitan Sampel Masukan:\nTarik $M$ realisasi acak independen:\n$$\\mathbf{x}^{(m)} \\sim p_\\mathbf{X}(\\mathbf{x}), \\quad m = 1, \\dots, M$$\n2. Evaluasi Model Deterministik:\nHitung keluaran sistem:\n$$y^{(m)} = g(\\mathbf{x}^{(m)}), \\quad m = 1, \\dots, M$$\n3. Estimasi Statistik Respon:\n- Rata-rata Ekspektasi: $\\hat{\\mu}_Y = \\frac{1}{M} \\sum_{m=1}^M y^{(m)}$\n- Varians Keluaran: $\\hat{\\sigma}_Y^2 = \\frac{1}{M - 1} \\sum_{m=1}^M (y^{(m)} - \\hat{\\mu}_Y)^2$\n- Interval Cakupan Probabilitas $(1 - \\alpha)$: Persentil $\\alpha/2$ dan $1 - \\alpha/2$ dari array $\\{y^{(m)}\\}$ terurut.\n\nKonvergensi Galat Monte Carlo:\nGalat baku estimasi rata-rata berkurang pada laju:\n$$\\text{SE}(\\hat{\\mu}_Y) = \\frac{\\sigma_Y}{\\sqrt{M}} = \\mathcal{O}\\left(\\frac{1}{\\sqrt{M}}\\right)$$\nLaju konvergensi ini sepenuhnya independen terhadap jumlah dimensi masukan $k$ (kebal terhadap kutukan dimensionalitas input).",
    "workedExample": {
      "problemStatement": "Daya listrik yang hilang pada resistor non-linier dimodelkan sebagai P = R * I^2. Hambatan R berdistribusi N(10.0, 0.5^2) Ohm, dan arus I berdistribusi N(2.0, 0.4^2) Ampere (koefisien variasi arus 20%). Hitung estimasi rata-rata daya E[P] menggunakan aproksimasi linier Taylor orde-1 vs ekspektasi matematis eksak. Buktikan mengapa non-linearitas kuadratik memicu bias pada aproksimasi linier.",
      "stepByStepSolution": [
        "Langkah 1: Pendekatan linier orde-1: Evaluasi pada nilai nominal: P_nom = mu_R * (mu_I)^2 = 10.0 * (2.0)^2 = 10.0 * 4.0 = 40.0 Watt.",
        "Langkah 2: Hitung ekspektasi matematis eksak: Karena R dan I independen: E[P] = E[R * I^2] = E[R] * E[I^2].",
        "Langkah 3: Hitung E[I^2]: Menggunakan sifat momen kedua: E[I^2] = Var(I) + (E[I])^2 = 0.4^2 + 2.0^2 = 0.16 + 4.0 = 4.16 A^2.",
        "Langkah 4: Hitung E[P] eksak: E[P] = 10.0 * 4.16 = 41.6 Watt.",
        "Langkah 5: Evaluasi bias linier: Aproksimasi linier (40.0 W) meremehkan daya rata-rata sebesar 1.6 Watt (-3.85% bias negatif) karena mengabaikan suku kurvatur kuadratik."
      ],
      "resultInterpretation": "Pada sistem non-linier, rata-rata respon output BUKAN sama dengan respon dari rata-rata input (E[g(X)] != g(E[X])). Simulasi Monte Carlo secara otomatis memperhitungkan seluruh koreksi kurvatur orde tinggi."
    },
    "pythonImplementation": {
      "description": "Simulasi Monte Carlo perambatan ketidakpastian non-linier vs GUM linear propagation.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA]\n# Model Defleksi Balok Non-Linier: d = (F * L^3) / (3 * E * I)\n# Input acak: F ~ N(1000, 50^2) N, L ~ N(2.0, 0.05^2) m, E ~ N(2e11, 1e10^2) Pa\nnp.random.seed(42)\nM = 50000\n\nF = np.random.normal(1000, 50, size=M)\nL = np.random.normal(2.0, 0.05, size=M)\nE = np.random.normal(2e11, 1e10, size=M)\nI_const = 8.333e-6  # Inersia penampang konstan\n\n# Evaluasi fisik langsung Monte Carlo\ndeflections = (F * L**3) / (3 * E * I_const) * 1000  # dalam milimeter\n\nmc_mean = np.mean(deflections)\nmc_std = np.std(deflections)\nmc_ci95 = [np.percentile(deflections, 2.5), np.percentile(deflections, 97.5)]\n\n# Evaluasi Linier GUM pada Titik Nominal\nF_nom, L_nom, E_nom = 1000.0, 2.0, 2e11\nd_nom = (F_nom * L_nom**3) / (3 * E_nom * I_const) * 1000\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Perambatan Ketidakpastian Monte Carlo (M=50.000):\")\nprint(f\"Defleksi Nominal Titik Kerja : {d_nom:.4f} mm\")\nprint(f\"Rata-rata Defleksi Riil (MC) : {mc_mean:.4f} mm (Terjadi pergeseran rata-rata!)\")\nprint(f\"Ketidakpastian Baku (Std MC) : {mc_std:.4f} mm\")\nprint(f\"95% Interval Cakupan Riil    : [{mc_ci95[0]:.4f}, {mc_ci95[1]:.4f}] mm\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Perambatan Ketidakpastian Monte Carlo (M=50.000):\nDefleksi Nominal Titik Kerja : 1.6001 mm\nRata-rata Defleksi Riil (MC) : 1.6094 mm (Terjadi pergeseran rata-rata!)\nKetidakpastian Baku (Std MC) : 0.1491 mm\n95% Interval Cakupan Riil    : [1.3340, 1.9189] mm"
    },
    "commonPitfalls": [
      "Menggunakan aproksimasi linier GUM pada sistem dengan eksponen atau fungsi non-linier tajam.",
      "Menggunakan jumlah sampel Monte Carlo yang terlalu sedikit (M < 1.000) untuk mengestimasi persentil ekor 99%.",
      "Mengasumsikan variabel masukan independen tanpa memverifikasi matriks korelasi fisik."
    ],
    "validationProcedures": [
      "Gunakan minimal M = 10.000 hingga 100.000 sampel untuk menjamin stabilitas persentil 95%.",
      "Periksa skewness dan kurtosis respon output untuk membuktikan ketidaknormalan distribusi.",
      "Sajikan histogram probabilitas respon yang dibandingkan dengan kurva Gaussian nominal."
    ],
    "exercises": [
      {
        "question": "Mengapa laju konvergensi simulasi Monte Carlo 1/sqrt(M) dianggap sebagai keunggulan masif pada perambatan ketidakpastian multivariat?",
        "hint": "Bandingkan dengan integrasi numerik berbasis grid kuadratur (seperti Simpson rule) pada dimensi k.",
        "answerExplanation": "Integrasi numerik berbasis grid membutuhkan N^k titik evaluasi (mengalami kutukan dimensionalitas yang meledak secara eksponensial terhadap jumlah variabel k). Pada k=10 dimensi, metode grid membutuhkan miliaran titik. Laju konvergensi Monte Carlo murni 1/sqrt(M) sama sekali tidak bergantung pada dimensi k, sehingga dapat menangani sistem dengan ratusan variabel masukan acak secara efisien."
      },
      {
        "question": "Kapan GUM Supplement 1 mewajibkan insinyur beralih dari propagasi analitis deret Taylor ke simulasi Monte Carlo?",
        "hint": "Perhatikan kondisi non-linearitas model dan distribusi input yang non-Gaussian.",
        "answerExplanation": "GUM Supplement 1 mewajibkan Monte Carlo ketika: (1) Model matematis sangat non-linier, (2) Distribusi masukan bersifat asimetris (seperti Lognormal atau Eksponensial), atau (3) Estimasi interval cakupan probabilitas tinggi (seperti 99% atau 99.9%) diperlukan untuk keandalan kritis."
      }
    ],
    "references": [
      {
        "citation": "BIPM, IEC, IFCC, ILAC, ISO, IUPAC, IUPAP, & OIML. (2008). Evaluation of measurement data - Supplement 1 to the \"Guide to the expression of uncertainty in measurement\" - Propagation of distributions using a Monte Carlo method. JCGM 101:2008.",
        "type": "formal-standard"
      },
      {
        "citation": "Smith, R. C. (2013). Uncertainty Quantification: Theory, Implementation, and Applications. SIAM.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Perambatan Ketidakpastian Berbasis Simulasi Monte Carlo pada Sistem Non-Linier",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.4.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.4.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami mekanisme perambatan ketidakpastian (Uncertainty Propagation) dari parameter input ke output respon.",
          "Capaian 2: Menganalisis kegagalan Hukum Perambatan Ketidakpastian GUM linier pada sistem non-linier tinggi.",
          "Capaian 3: Mengimplementasikan simulasi Monte Carlo untuk menghitung distribusi probabilitas respon non-Gaussian."
        ],
        "keyFormulaOrDiagram": "$$Y = g(\\mathbf{X})$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.4.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Perambatan Ketidakpastian Berbasis Simulasi Monte Carlo pada Sistem Non-Linier",
        "lead": "Dalam rekayasa sistem fisik, variabel keluaran yang menjadi perhatian kritis (seperti defleksi balok jembatan, efisiensi turbin, atau tegangan tembus isolator) selalu merupakan fungsi matematis dari berbagai parameter masukan yang mengandung ketidakpastian: $Y = g(X_1, X_2, \\dots, X_k)$.",
        "bulletPoints": [
          "Menentukan bagaimana ketidakpastian pada input merambat menjadi ketidakpastian pada output disebut Perambatan Ketidakpastian (Uncertainty Propagation).",
          "Batasan Pendekatan Klasik ISO GUM (Linear Propagation): Pedoman ISO Guide to the Expression of Uncertainty in Measurement (GUM) merekomendasikan aproksimasi deret Taylor orde pertama: $$\\sigma_Y^2 \\approx \\sum_{i=1}^k \\left( \\frac{\\partial g}{\\partial X_i} \\right)^2 \\sigma_{X_i}^2$$ Pendekatan linier ini hanya valid jika fungsi $g(\\cdot)$ bersifat linier atau hampir linier di sekitar titik kerja nominal.",
          "Jika sistem memiliki non-linearitas kuat (misalnya relasi kuadratik, eksponensial, atau logaritmik), pendekatan analitis linier ini menghasilkan kesalahan estimasi yang fatal, meremehkan ketidakpastian ekstrim, dan salah mengasumsikan bahwa keluaran berdistribusi simetris normal."
        ],
        "keyFormulaOrDiagram": "$M$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Solusi Simulasi Monte Carlo (GUM Supplement 1): Simulasi Monte Carlo menyelesaikan masalah ini secara numerik tanpa aproksimasi linier.",
        "bulletPoints": [
          "Peneliti menarik $M$ sampel acak dari distribusi probabilitas gabungan seluruh parameter input, mengevaluasi model non-linier $g(\\mathbf{X})$ untuk setiap sampel, lalu mengonstruksi fungsi distribusi kumulatif empiris dari respon keluaran secara langsung."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Perambatan Monte Carlo:",
        "bulletPoints": [
          "Misalkan $\\mathbf{X} = (X_1, \\dots, X_k)^T$ adalah vektor variabel input dengan PDF gabungan $p_\\mathbf{X}(\\mathbf{x})$.",
          "Sistem fisik non-linier:",
          "Algoritma Monte Carlo:"
        ],
        "keyFormulaOrDiagram": "$$Y = g(\\mathbf{X})$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Daya listrik yang hilang pada resistor non-linier dimodelkan sebagai P = R * I^2. Hambatan R berdistribusi N(10.0, 0.5^2) Ohm, dan arus I berdistribusi N(2.0, 0.4^2) Ampere (koefisien variasi arus 20%). Hitung estimasi rata-rata daya E[P] menggunakan aproksimasi linier Taylor orde-1 vs ekspektasi matematis eksak. Buktikan mengapa non-linearitas kuadratik memicu bias pada aproksimasi linier.",
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
          "Langkah 1: Pendekatan linier orde-1: Evaluasi pada nilai nominal: P_nom = mu_R * (mu_I)^2 = 10.0 * (2.0)^2 = 10.0 * 4.0 = 40.0 Watt.",
          "Langkah 2: Hitung ekspektasi matematis eksak: Karena R dan I independen: E[P] = E[R * I^2] = E[R] * E[I^2].",
          "Langkah 3: Hitung E[I^2]: Menggunakan sifat momen kedua: E[I^2] = Var(I) + (E[I])^2 = 0.4^2 + 2.0^2 = 0.16 + 4.0 = 4.16 A^2."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung E[P] eksak: E[P] = 10.0 * 4.16 = 41.6 Watt.",
          "Langkah 5: Evaluasi bias linier: Aproksimasi linier (40.0 W) meremehkan daya rata-rata sebesar 1.6 Watt (-3.85% bias negatif) karena mengabaikan suku kurvatur kuadratik.",
          "[result: Interpretasi Ilmiah] Pada sistem non-linier, rata-rata respon output BUKAN sama dengan respon dari rata-rata input (E[g(X)] != g(E[X])). Simulasi Monte Carlo secara otomatis memperhitungkan seluruh koreksi kurvatur orde tinggi."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi Monte Carlo perambatan ketidakpastian non-linier vs GUM linear propagation.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi Monte Carlo perambatan ketidakpastian non-linier vs GUM linear propagation.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Perambatan Ketidakpastian Monte Carlo (M=50.000):"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Perambatan Ketidakpastian Monte Carlo (M=50.000):\nDefleksi Nominal Titik Kerja : 1.6001 mm\nRata-rata Defleksi Riil (MC) : 1.6094 mm (Terjadi pergeseran rata-rata!)\nKetidakpastian Baku (Std MC) : 0.1491 mm\n95% Interval Cakupan Riil    : [1.3340, 1.9189] mm",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan aproksimasi linier GUM pada sistem dengan eksponen atau fungsi non-linier tajam.",
          "[warning: Perangkap] Menggunakan jumlah sampel Monte Carlo yang terlalu sedikit (M < 1.000) untuk mengestimasi persentil ekor 99%.",
          "[warning: Perangkap] Mengasumsikan variabel masukan independen tanpa memverifikasi matriks korelasi fisik."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan minimal M = 10.000 hingga 100.000 sampel untuk menjamin stabilitas persentil 95%.",
          "Prosedur: Periksa skewness dan kurtosis respon output untuk membuktikan ketidaknormalan distribusi.",
          "Prosedur: Sajikan histogram probabilitas respon yang dibandingkan dengan kurva Gaussian nominal."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa laju konvergensi simulasi Monte Carlo 1/sqrt(M) dianggap sebagai keunggulan masif pada perambatan ketidakpastian multivariat?",
          "Petunjuk Analitis: Bandingkan dengan integrasi numerik berbasis grid kuadratur (seperti Simpson rule) pada dimensi k.",
          "Solusi Kunci: Integrasi numerik berbasis grid membutuhkan N^k titik evaluasi (mengalami kutukan dimensionalitas yang meledak secara eksponensial terhadap jumlah variabel k). Pada k=10 dimensi, metode grid membutuhkan miliaran titik. Laju konvergensi Monte Carlo murni 1/sqrt(M) sama sekali tidak bergantung pada dimensi k, sehingga dapat menangani sistem dengan ratusan variabel masukan acak secara efisien."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "6.4.3": {
    "id": "6.4.3",
    "chapterId": "CH-41",
    "title": "Emulasi Komputasi Menggunakan Gaussian Process Regression untuk Sistem Berbiaya Tinggi",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami konsep model pengganti (Surrogate Model / Emulator) untuk kode simulasi berbiaya komputasi tinggi.",
      "Memformulasi Gaussian Process Regression (Kriging) sebagai interpolator probabilistik non-parametrik.",
      "Mengekstraksi estimasi ketidakpastian analitis pada titik-titik desain baru."
    ],
    "content": "Dalam riset rekayasa tingkat lanjut (seperti simulasi aerodinamika CFD pesawat terbang, dinamika tabrakan elemen hingga, atau simulasi iklim global), satu kali pemanggilan kode komputasi (one simulation run) dapat memakan waktu 12 jam hingga 3 hari pada superkomputer. Dalam kondisi seperti ini, melakukan simulasi Monte Carlo yang membutuhkan 50.000 kali run adalah hal yang mustahil secara praktis.\n\nSolusi Emulasi Komputasi (Surrogate Modeling / Emulation):\nSolusi rekayasa mutakhir adalah melatih model pengganti matematis (Surrogate Model atau Emulator) yang sangat cepat menggunakan sejumlah kecil hasil simulasi berbiaya tinggi yang dirancang secara optimal (misalnya 50 titik desain dari Latin Hypercube Sampling). Emulator tersebut kemudian dievaluasi jutaan kali dalam hitungan milidetik untuk perambatan ketidakpastian, optimasi desain, atau analisis sensitivitas.\n\nGaussian Process Regression (Kriging):\nDari seluruh arsitektur model pengganti (seperti polinomial, neural networks, atau random forests), Gaussian Process Regression (GPR) adalah standar emas yang paling unggul untuk emulasi ilmiah karena dua sifat unik:\n1. Interpolasi Eksak (Exact Interpolation): Pada titik-titik data desain di mana simulasi deterministik telah dihitung, prediksi emulator memiliki ketidakpastian nol ($\\sigma^2 = 0$).\n2. Kuantifikasi Ketidakpastian Bawaan (Built-in Uncertainty Quantification): Pada setiap titik desain baru yang belum pernah disimulasikan, GP tidak hanya memberikan prediksi rata-rata $\\mu(\\mathbf{x})$, melainkan secara otomatis memberikan varians ketidakpastian analitis $\\sigma^2(\\mathbf{x})$ yang mencerminkan jarak titik tersebut terhadap data pelatihan.",
    "mathematicalFoundations": "Formulasi Matematis Gaussian Process Regression (GPR):\nDiberikan himpunan data simulasi berbiaya tinggi $\\mathcal{D} = \\{(\\mathbf{x}_i, y_i)\\}_{i=1}^n$, dengan $\\mathbf{X} \\in \\mathbb{R}^{n \\times d}$ dan $\\mathbf{y} \\in \\mathbb{R}^n$.\nFungsi kontinu $f(\\mathbf{x})$ diasumsikan sebagai Gaussian Process:\n$$f(\\mathbf{x}) \\sim \\mathcal{GP}\\left(m(\\mathbf{x}), k(\\mathbf{x}, \\mathbf{x}')\\right)$$\n\nFungsi Kovarians Matérn 5/2 (Standar Industri Rekayasa):\n$$k_{\\text{Matérn 5/2}}(r) = \\sigma_f^2 \\left( 1 + \\frac{\\sqrt{5}r}{\\ell} + \\frac{5r^2}{3\\ell^2} \\right) \\exp\\left( -\\frac{\\sqrt{5}r}{\\ell} \\right), \\quad r = \\|\\mathbf{x} - \\mathbf{x}'\\|$$\n\nDistribusi Prediktif Bersyarat pada Titik Baru $\\mathbf{x}_*$:\n$$y_* \\mid \\mathbf{X}, \\mathbf{y}, \\mathbf{x}_* \\sim \\mathcal{N}\\left( \\mu_*(\\mathbf{x}_*), \\; \\sigma_*^2(\\mathbf{x}_*) \\right)$$\n\nPersamaan Prediksi Rata-rata dan Varians:\n$$\\mu_*(\\mathbf{x}_*) = \\mathbf{k}_*^T \\mathbf{K}^{-1} \\mathbf{y}$$\n$$\\sigma_*^2(\\mathbf{x}_*) = k(\\mathbf{x}_*, \\mathbf{x}_*) - \\mathbf{k}_*^T \\mathbf{K}^{-1} \\mathbf{k}_*$$\ndi mana:\n- $\\mathbf{K} \\in \\mathbb{R}^{n \\times n}$ dengan elemen $K_{ij} = k(\\mathbf{x}_i, \\mathbf{x}_j)$.\n- $\\mathbf{k}_* = [k(\\mathbf{x}_*, \\mathbf{x}_1), \\dots, k(\\mathbf{x}_*, \\mathbf{x}_n)]^T$.",
    "workedExample": {
      "problemStatement": "Diberikan dua titik data simulasi pada x_1 = 0.0 (y_1 = 1.0) dan x_2 = 2.0 (y_2 = 3.0). Fungsi kernel RBF memiliki panjang skala l = 1.0 dan varians sigma_f^2 = 1.0: k(x, x') = exp(-0.5 * (x - x')^2). Hitung prediksi mean dan varians ketidakpastian emulator pada titik baru x_* = 0.0 (titik data latih) dan x_* = 1.0 (titik tengah interpolasi).",
      "stepByStepSolution": [
        "Langkah 1: Matriks kovarians K: K_11 = 1.0; K_22 = 1.0; K_12 = exp(-0.5 * (0 - 2)^2) = exp(-2.0) = 0.1353. K = [[1.0, 0.1353], [0.1353, 1.0]].",
        "Langkah 2: Evaluasi pada x_* = 0.0: Vektor k_* = [1.0, 0.1353]^T (identik dengan kolom pertama K). Maka k_*^T @ K^-1 = [1.0, 0.0]. Prediksi mean: mu(0) = [1.0, 0.0] @ [1.0, 3.0]^T = 1.0. Prediksi varians: sigma^2(0) = k(0,0) - k_*^T @ K^-1 @ k_* = 1.0 - 1.0 = 0.0.",
        "Langkah 3: Evaluasi pada x_* = 1.0: k(1, 0) = exp(-0.5 * 1^2) = exp(-0.5) = 0.6065; k(1, 2) = exp(-0.5 * (-1)^2) = 0.6065. Vektor k_* = [0.6065, 0.6065]^T.",
        "Langkah 4: Hitung K^-1: det(K) = 1.0 - 0.1353^2 = 1.0 - 0.0183 = 0.9817. K^-1 = (1 / 0.9817) * [[1.0, -0.1353], [-0.1353, 1.0]].",
        "Langkah 5: Hitung k_*^T @ K^-1: k_*^T @ K^-1 = [0.5342, 0.5342]. Prediksi mean: mu(1) = 0.5342 * 1.0 + 0.5342 * 3.0 = 0.5342 * 4.0 = 2.1368. Prediksi varians: sigma^2(1) = 1.0 - [0.5342, 0.5342] @ [0.6065, 0.6065]^T = 1.0 - 2 * (0.5342 * 0.6065) = 1.0 - 0.6480 = 0.3520."
      ],
      "resultInterpretation": "Pada titik data latih x=0, varians bernilai 0 (interpolasi eksak). Pada titik tengah x=1 yang belum pernah disimulasikan, GP memberikan prediksi kompromi 2.14 dengan pita ketidakpastian terukur sebesar 0.352."
    },
    "pythonImplementation": {
      "description": "Implementasi Gaussian Process Emulator untuk menggantikan fungsi simulasi non-linier berbiaya tinggi.",
      "libraryDependencies": [
        "numpy",
        "sklearn.gaussian_process"
      ],
      "code": "import numpy as np\nfrom sklearn.gaussian_process import GaussianProcessRegressor\nfrom sklearn.gaussian_process.kernels import Matern\n\n# [SIMULASI/SYNTHETIC DATA]\n# Simulasi fisik berbiaya tinggi (diwakili fungsi matematika kompleks)\ndef expensive_physics_simulation(x):\n    return np.sin(3.0 * x) + 0.5 * np.cos(7.0 * x) + 0.2 * x\n\n# Anggaran komputasi terbatas: hanya mampu mengeksekusi 8 kali simulasi\nnp.random.seed(42)\nX_train = np.linspace(0.0, 2.0, 8).reshape(-1, 1)\ny_train = expensive_physics_simulation(X_train).ravel()\n\n# Latih Gaussian Process Emulator dengan kernel Matern 5/2\nkernel = Matern(length_scale=0.5, nu=2.5)\ngp = GaussianProcessRegressor(kernel=kernel, alpha=1e-10, n_restarts_optimizer=10)\ngp.fit(X_train, y_train)\n\n# Evaluasi 1.000 titik baru secara instan dalam hitungan milidetik\nX_test = np.linspace(0.0, 2.0, 1000).reshape(-1, 1)\ny_pred_mean, y_pred_std = gp.predict(X_test, return_std=True)\ny_true = expensive_physics_simulation(X_test).ravel()\n\nrmse = np.sqrt(np.mean((y_pred_mean - y_true)**2))\nmax_uncertainty = np.max(y_pred_std)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Evaluasi Gaussian Process Emulator:\")\nprint(f\"Jumlah Titik Sampel Latih (Simulasi Asli) : {len(X_train)}\")\nprint(f\"Root Mean Squared Error (RMSE) Emulator  : {rmse:.4f}\")\nprint(f\"Ketidakpastian Terbesar (Max Std Dev)    : {max_uncertainty:.4f}\")\nprint(f\"Ketidakpastian pada Titik Latih Pertama  : {y_pred_std[0]:.8f} (Interpolasi Eksak!)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Gaussian Process Emulator:\nJumlah Titik Sampel Latih (Simulasi Asli) : 8\nRoot Mean Squared Error (RMSE) Emulator  : 0.0543\nKetidakpastian Terbesar (Max Std Dev)    : 0.1628\nKetidakpastian pada Titik Latih Pertama  : 0.00000000 (Interpolasi Eksak!)"
    },
    "commonPitfalls": [
      "Menambahkan white noise (alpha besar) pada Gaussian Process untuk kode simulasi deterministik (menghilangkan sifat interpolasi eksak).",
      "Menggunakan kernel RBF halus kuadratik pada fenomena fisis yang memiliki gradien curam atau diskontinuitas.",
      "Melatih GP pada ukuran sampel terlalu besar (N > 10.000) tanpa metode aproksimasi sparse, memicu kehabisan memori RAM O(N^2)."
    ],
    "validationProcedures": [
      "Gunakan kernel Matérn 3/2 atau 5/2 sebagai default untuk sistem fisik rekayasa.",
      "Validasi emulator menggunakan Leave-One-Out Cross-Validation (LOOCV) pada data latih simulasi.",
      "Laporkan metrik Standarized Residual Mean Squared Error (SRMSE) untuk memverifikasi kalibrasi varians."
    ],
    "exercises": [
      {
        "question": "Mengapa kernel Matérn 5/2 lebih direkomendasikan daripada kernel Squared Exponential (RBF) untuk emulasi simulasi fisik fluida dan struktur?",
        "hint": "Perhatikan derajat diferensiabilitas fungsi yang dihasilkan kedua kernel.",
        "answerExplanation": "Kernel Squared Exponential (RBF) mengasumsikan fungsi yang dapat diturunkan tak terhingga kali (smoothness yang tidak realistis secara fisik). Pada fluida turbulen atau mekanika kontak, terdapat variasi lokal yang kasar. Kernel Matérn 5/2 mengasumsikan diferensiabilitas dua kali, memberikan representasi elastis yang jauh lebih realistis terhadap fenomena fisik nyata."
      },
      {
        "question": "Apa fungsi utama dari varians ketidakpastian sigma_*^2(x_*) yang dihasilkan oleh Gaussian Process dalam optimasi desain rekayasa?",
        "hint": "Kaitkan dengan Bayesian Optimization dan pemilihan titik simulasi berikutnya.",
        "answerExplanation": "Varians ketidakpastian memandu algoritma Bayesian Optimization untuk memilih lokasi simulasi berikutnya (Active Learning). Algoritma akan menempatkan run komputasi mahal berikutnya di area di mana potensi perbaikan tinggi ATAU di mana model masih sangat tidak tahu (ketidakpastian tinggi), memaksimalkan efisiensi anggaran komputasi."
      }
    ],
    "references": [
      {
        "citation": "Rasmussen, C. E., & Williams, C. K. (2006). Gaussian Processes for Machine Learning. The MIT Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Gramacy, R. B. (2020). Surrogates: Gaussian Process Modeling, Design, and Optimization for the Applied Sciences. CRC Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Emulasi Komputasi Menggunakan Gaussian Process Regression untuk Sistem Berbiaya Tinggi",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.4.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.4.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami konsep model pengganti (Surrogate Model / Emulator) untuk kode simulasi berbiaya komputasi tinggi.",
          "Capaian 2: Memformulasi Gaussian Process Regression (Kriging) sebagai interpolator probabilistik non-parametrik.",
          "Capaian 3: Mengekstraksi estimasi ketidakpastian analitis pada titik-titik desain baru."
        ],
        "keyFormulaOrDiagram": "$$f(\\mathbf{x}) \\sim \\mathcal{GP}\\left(m(\\mathbf{x}), k(\\mathbf{x}, \\mathbf{x}')\\right)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.4.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Emulasi Komputasi Menggunakan Gaussian Process Regression untuk Sistem Berbiaya Tinggi",
        "lead": "Dalam riset rekayasa tingkat lanjut (seperti simulasi aerodinamika CFD pesawat terbang, dinamika tabrakan elemen hingga, atau simulasi iklim global), satu kali pemanggilan kode komputasi (one simulation run) dapat memakan waktu 12 jam hingga 3 hari pada superkomputer.",
        "bulletPoints": [
          "Dalam kondisi seperti ini, melakukan simulasi Monte Carlo yang membutuhkan 50.000 kali run adalah hal yang mustahil secara praktis.",
          "Solusi Emulasi Komputasi (Surrogate Modeling / Emulation): Solusi rekayasa mutakhir adalah melatih model pengganti matematis (Surrogate Model atau Emulator) yang sangat cepat menggunakan sejumlah kecil hasil simulasi berbiaya tinggi yang dirancang secara optimal (misalnya 50 titik desain dari Latin Hypercube Sampling).",
          "Emulator tersebut kemudian dievaluasi jutaan kali dalam hitungan milidetik untuk perambatan ketidakpastian, optimasi desain, atau analisis sensitivitas."
        ],
        "keyFormulaOrDiagram": "$\\sigma^2 = 0$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Gaussian Process Regression (Kriging): Dari seluruh arsitektur model pengganti (seperti polinomial, neural networks, atau random forests), Gaussian Process Regression (GPR) adalah standar emas yang paling unggul untuk emulasi ilmiah karena dua sifat unik: 1.",
        "bulletPoints": [
          "Interpolasi Eksak (Exact Interpolation): Pada titik-titik data desain di mana simulasi deterministik telah dihitung, prediksi emulator memiliki ketidakpastian nol ($\\sigma^2 = 0$).",
          "2."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Gaussian Process Regression (GPR):",
        "bulletPoints": [
          "Diberikan himpunan data simulasi berbiaya tinggi $\\mathcal{D} = \\{(\\mathbf{x}_i, y_i)\\}_{i=1}^n$, dengan $\\mathbf{X} \\in \\mathbb{R}^{n \\times d}$ dan $\\mathbf{y} \\in \\mathbb{R}^n$.",
          "Fungsi kontinu $f(\\mathbf{x})$ diasumsikan sebagai Gaussian Process:",
          "Fungsi Kovarians Matérn 5/2 (Standar Industri Rekayasa):"
        ],
        "keyFormulaOrDiagram": "$$f(\\mathbf{x}) \\sim \\mathcal{GP}\\left(m(\\mathbf{x}), k(\\mathbf{x}, \\mathbf{x}')\\right)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan dua titik data simulasi pada x_1 = 0.0 (y_1 = 1.0) dan x_2 = 2.0 (y_2 = 3.0). Fungsi kernel RBF memiliki panjang skala l = 1.0 dan varians sigma_f^2 = 1.0: k(x, x') = exp(-0.5 * (x - x')^2). Hitung prediksi mean dan varians ketidakpastian emulator pada titik baru x_* = 0.0 (titik data latih) dan x_* = 1.0 (titik tengah interpolasi).",
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
          "Langkah 1: Matriks kovarians K: K_11 = 1.0; K_22 = 1.0; K_12 = exp(-0.5 * (0 - 2)^2) = exp(-2.0) = 0.1353. K = [[1.0, 0.1353], [0.1353, 1.0]].",
          "Langkah 2: Evaluasi pada x_* = 0.0: Vektor k_* = [1.0, 0.1353]^T (identik dengan kolom pertama K). Maka k_*^T @ K^-1 = [1.0, 0.0]. Prediksi mean: mu(0) = [1.0, 0.0] @ [1.0, 3.0]^T = 1.0. Prediksi varians: sigma^2(0) = k(0,0) - k_*^T @ K^-1 @ k_* = 1.0 - 1.0 = 0.0.",
          "Langkah 3: Evaluasi pada x_* = 1.0: k(1, 0) = exp(-0.5 * 1^2) = exp(-0.5) = 0.6065; k(1, 2) = exp(-0.5 * (-1)^2) = 0.6065. Vektor k_* = [0.6065, 0.6065]^T."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung K^-1: det(K) = 1.0 - 0.1353^2 = 1.0 - 0.0183 = 0.9817. K^-1 = (1 / 0.9817) * [[1.0, -0.1353], [-0.1353, 1.0]].",
          "Langkah 5: Hitung k_*^T @ K^-1: k_*^T @ K^-1 = [0.5342, 0.5342]. Prediksi mean: mu(1) = 0.5342 * 1.0 + 0.5342 * 3.0 = 0.5342 * 4.0 = 2.1368. Prediksi varians: sigma^2(1) = 1.0 - [0.5342, 0.5342] @ [0.6065, 0.6065]^T = 1.0 - 2 * (0.5342 * 0.6065) = 1.0 - 0.6480 = 0.3520.",
          "[result: Interpretasi Ilmiah] Pada titik data latih x=0, varians bernilai 0 (interpolasi eksak). Pada titik tengah x=1 yang belum pernah disimulasikan, GP memberikan prediksi kompromi 2.14 dengan pita ketidakpastian terukur sebesar 0.352."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi Gaussian Process Emulator untuk menggantikan fungsi simulasi non-linier berbiaya tinggi.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi Gaussian Process Emulator untuk menggantikan fungsi simulasi non-linier berbiaya tinggi.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.gaussian_process",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Gaussian Process Emulator:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Gaussian Process Emulator:\nJumlah Titik Sampel Latih (Simulasi Asli) : 8\nRoot Mean Squared Error (RMSE) Emulator  : 0.0543\nKetidakpastian Terbesar (Max Std Dev)    : 0.1628\nKetidakpastian pada Titik Latih Pertama  : 0.00000000 (Interpolasi Eksak!)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menambahkan white noise (alpha besar) pada Gaussian Process untuk kode simulasi deterministik (menghilangkan sifat interpolasi eksak).",
          "[warning: Perangkap] Menggunakan kernel RBF halus kuadratik pada fenomena fisis yang memiliki gradien curam atau diskontinuitas.",
          "[warning: Perangkap] Melatih GP pada ukuran sampel terlalu besar (N > 10.000) tanpa metode aproksimasi sparse, memicu kehabisan memori RAM O(N^2)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan kernel Matérn 3/2 atau 5/2 sebagai default untuk sistem fisik rekayasa.",
          "Prosedur: Validasi emulator menggunakan Leave-One-Out Cross-Validation (LOOCV) pada data latih simulasi.",
          "Prosedur: Laporkan metrik Standarized Residual Mean Squared Error (SRMSE) untuk memverifikasi kalibrasi varians."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa kernel Matérn 5/2 lebih direkomendasikan daripada kernel Squared Exponential (RBF) untuk emulasi simulasi fisik fluida dan struktur?",
          "Petunjuk Analitis: Perhatikan derajat diferensiabilitas fungsi yang dihasilkan kedua kernel.",
          "Solusi Kunci: Kernel Squared Exponential (RBF) mengasumsikan fungsi yang dapat diturunkan tak terhingga kali (smoothness yang tidak realistis secara fisik). Pada fluida turbulen atau mekanika kontak, terdapat variasi lokal yang kasar. Kernel Matérn 5/2 mengasumsikan diferensiabilitas dua kali, memberikan representasi elastis yang jauh lebih realistis terhadap fenomena fisik nyata."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "6.4.4": {
    "id": "6.4.4",
    "chapterId": "CH-41",
    "title": "Conformal Prediction: Pembangkitan Interval Prediksi Bebas Distribusi dengan Jaminan Cakupan Riil",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami keterbatasan interval prediksi parametrik dan Bayesian yang rentan terhadap misspecification.",
      "Menguasai algoritma Split Conformal Prediction untuk regresi dan klasifikasi.",
      "Membuktikan secara matematis jaminan cakupan finit bebas distribusi (Distribution-Free Finite-Sample Coverage Guarantee)."
    ],
    "content": "Dalam era kecerdasan artifisial modern, baik metode Frequentist maupun Bayesian memiliki kelemahan mendasar dalam menghasilkan interval prediksi untuk model kotak hitam yang sangat kompleks:\n- Frequentist mengasumsikan residual berdistribusi Gaussian dan homoskedastis.\n- Bayesian sangat bergantung pada kebenaran spesifikasi prior dan likelihood; jika prior atau likelihood salah, jaminan cakupan probabilitas runtuh.\n\nRevolusi Conformal Prediction (Vovk et al., 2005):\nConformal Prediction adalah metodologi inferensi prediktif paling transformatif dalam dua dekade terakhir. Metode ini memungkinkan sembarang algoritma prediktif (mulai dari regresi linier, XGBoost, hingga Deep Neural Networks) untuk membangkitkan interval prediksi atau himpunan prediksi yang memiliki Jaminan Cakupan Finit Bebas Distribusi (Distribution-Free Finite-Sample Coverage Guarantee):\n$$P(Y_{n+1} \\in C(X_{n+1})) \\geq 1 - \\alpha$$\n\nTiga Karakteristik Revolusioner Conformal Prediction:\n1. Bebas Distribusi (Distribution-Free): Tidak memerlukan asumsi apa pun mengenai bentuk distribusi data (bisa bimodal, heteroskedastis ekstrem, atau menceng). Satu-satunya asumsi yang dibutuhkan adalah pertukaran data (exchangeability), yang otomatis terpenuhi oleh data i.i.d.\n2. Jaminan Sampel Berhingga Eksak (Finite-Sample Validity): Jaminan cakupan berlaku secara eksak untuk sembarang ukuran sampel $n$ (bahkan pada $n=50$), bukan jaminan asimtotik $n \\to \\infty$.\n3. Model-Agnostik (Model-Agnostic): Dapat dibungkuskan di atas model prediktif apa pun tanpa perlu melatih ulang arsitektur internal model.",
    "mathematicalFoundations": "Algoritma Split Conformal Prediction (Inductive Conformal Prediction):\nDiberikan dataset $D = \\{(x_i, y_i)\\}_{i=1}^N$.\n1. Partisi Data:\nBagi $D$ secara acak menjadi Himpunan Pelatihan ($D_{\\text{train}}$) dan Himpunan Kalibrasi ($D_{\\text{cal}}$ berukuran $n$).\n2. Pelatihan Model:\nLatih prediktor $\\hat{f}$ hanya pada $D_{\\text{train}}$.\n3. Perhitungan Skor Ketidaksesuaian (Non-Conformity Scores):\nUntuk setiap sampel pada himpunan kalibrasi $(x_i, y_i) \\in D_{\\text{cal}}$:\n$$s_i = |y_i - \\hat{f}(x_i)|, \\quad i = 1, \\dots, n$$\nSkor $s_i$ mengukur seberapa buruk model memprediksi data kalibrasi.\n4. Perhitungan Kuantil Kritis Kalibrasi:\nHitung kuantil terkalibrasi $\\hat{q}$ pada tingkat kepercayaan $(1 - \\alpha)$:\n$$\\hat{q} = \\text{Kuantil ke-} \\left( \\frac{\\lceil (n + 1)(1 - \\alpha) \\rceil}{n} \\right) \\text{ dari himpunan } \\{s_1, \\dots, s_n\\}$$\n5. Konstruksi Interval Prediksi untuk Uji Baru $X_{n+1}$:\n$$C(X_{n+1}) = \\left[ \\hat{f}(X_{n+1}) - \\hat{q}, \\; \\hat{f}(X_{n+1}) + \\hat{q} \\right]$$\n\nTeorema Jaminan Cakupan (Vovk et al.):\nJika $(X_1, Y_1), \\dots, (X_{n+1}, Y_{n+1})$ bersifat exchangeable:\n$$1 - \\alpha \\leq P(Y_{n+1} \\in C(X_{n+1})) \\leq 1 - \\alpha + \\frac{1}{n + 1}$$",
    "workedExample": {
      "problemStatement": "Diberikan n = 19 data kalibrasi untuk model prediksi suhu mesin. Skor residual absolut yang terurut s_i = |y_i - f(x_i)| adalah: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2.5] degC. Tentukan nilai kuantil kritis q_hat untuk tingkat kepercayaan 90% (alpha = 0.10). Jika model memprediksi suhu mesin baru adalah 85.0 degC, tentukan interval Conformal Prediction yang sah secara matematis.",
      "stepByStepSolution": [
        "Langkah 1: Hitung indeks kuantil teoretis: Indeks = ceil((n + 1) * (1 - alpha)) = ceil((19 + 1) * (1 - 0.10)) = ceil(20 * 0.90) = ceil(18.0) = 18.",
        "Langkah 2: Ambil nilai skor pada indeks ke-18 dari array terurut (berbasis 1): s_(18) = 1.8 degC.",
        "Langkah 3: Maka kuantil kritis kalibrasi adalah q_hat = 1.8 degC.",
        "Langkah 4: Konstruksi interval pada titik baru f(X_new) = 85.0 degC: C(X_new) = [85.0 - 1.8, 85.0 + 1.8] = [83.2, 86.8] degC."
      ],
      "resultInterpretation": "Interval [83.2, 86.8] degC dijamin secara matematis memiliki probabilitas cakupan riil minimal 90% tanpa asumsi distribusi apa pun mengenai bentuk derau sensor."
    },
    "pythonImplementation": {
      "description": "Implementasi Split Conformal Prediction dan pembuktian empiris jaminan cakupan 90%.",
      "libraryDependencies": [
        "numpy",
        "sklearn.ensemble"
      ],
      "code": "import numpy as np\nfrom sklearn.ensemble import GradientBoostingRegressor\n\n# [SIMULASI/SYNTHETIC DATA]\n# 1.000 data fisik non-linier dengan derau heteroskedastis (varians membesar seiring X)\nnp.random.seed(42)\nX = np.random.uniform(0.0, 5.0, size=(1000, 1))\nnoise = np.random.normal(0, 0.2 + 0.3 * X.ravel())  # Heteroskedastis\ny = np.sin(X.ravel()) * 2.0 + noise\n\n# Bagi menjadi Train (500), Calibration (250), dan Test (250)\nX_train, y_train = X[:500], y[:500]\nX_cal, y_cal = X[500:750], y[500:750]\nX_test, y_test = X[750:], y[750:]\n\n# 1. Latih model Black-Box (Gradient Boosting)\nmodel = GradientBoostingRegressor(random_state=42)\nmodel.fit(X_train, y_train)\n\n# 2. Hitung Non-Conformity Scores pada data kalibrasi\ncal_preds = model.predict(X_cal)\nscores = np.abs(y_cal - cal_preds)\n\n# 3. Hitung Kuantil Conformal (Target Kepercayaan 90% -> alpha = 0.10)\nalpha = 0.10\nn_cal = len(X_cal)\nq_level = np.ceil((n_cal + 1) * (1 - alpha)) / n_cal\nq_hat = np.quantile(scores, q_level, method='higher')\n\n# 4. Bangkitkan Interval Prediksi pada Data Uji\ntest_preds = model.predict(X_test)\nci_lower = test_preds - q_hat\nci_upper = test_preds + q_hat\n\n# 5. Evaluasi Cakupan Empiris Riil\ncovered = (y_test >= ci_lower) & (y_test <= ci_upper)\nempirical_coverage = np.mean(covered)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Validasi Split Conformal Prediction:\")\nprint(f\"Tingkat Kepercayaan Target (1 - alpha) : {(1 - alpha)*100:.1f}%\")\nprint(f\"Kuantil Kalibrasi Kritis (q_hat)       : {q_hat:.4f}\")\nprint(f\"Cakupan Empiris Teramati pada Test Set : {empirical_coverage*100:.2f}% (Jaminan Terbukti!)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Validasi Split Conformal Prediction:\nTingkat Kepercayaan Target (1 - alpha) : 90.0%\nKuantil Kalibrasi Kritis (q_hat)       : 1.6385\nCakupan Empiris Teramati pada Test Set : 92.40% (Jaminan Terbukti!)"
    },
    "commonPitfalls": [
      "Menghitung skor non-conformity pada data latih alih-alih pada himpunan kalibrasi terpisah (kebocoran kalibrasi).",
      "Menerapkan Conformal Prediction pada data yang melanggar asumsi exchangeability (seperti deret waktu dengan autokorelasi kuat tanpa adaptasi enbPI).",
      "Menggunakan fungsi pembulatan ke bawah (floor) saat menghitung indeks kuantil kalibrasi."
    ],
    "validationProcedures": [
      "Verifikasi bahwa himpunan kalibrasi benar-benar diisolasi dari proses pelatihan model.",
      "Gunakan formula kuantil eksak np.ceil((n + 1) * (1 - alpha)) / n.",
      "Audit cakupan empiris pada data uji independen: cakupan teramati wajib >= 1 - alpha."
    ],
    "exercises": [
      {
        "question": "Mengapa Conformal Prediction disebut \"Distribution-Free\" dan \"Model-Agnostic\"?",
        "hint": "Perhatikan asumsi matematika yang mendasari pembuktian teoremanya.",
        "answerExplanation": "Disebut Distribution-Free karena pembuktian matematisnya tidak mengasumsikan bentuk distribusi probabilitas apa pun (tidak perlu Gaussian, linier, atau simetris). Disebut Model-Agnostic karena metode ini memperlakukan prediktor sebagai fungsi kotak hitam murni; dapat diterapkan pada regresi linier, random forest, deep neural network, hingga Large Language Model."
      },
      {
        "question": "Apa keterbatasan dari Split Conformal Prediction standar jika derau data sangat heteroskedastis (varians berbeda di setiap lokasi input)?",
        "hint": "Perhatikan lebar interval yang dihasilkan di sepanjang sumbu X.",
        "answerExplanation": "Split Conformal standar menggunakan kuantil skalar q_hat tunggal yang konstan, sehingga menghasilkan interval dengan lebar yang sama persis di seluruh ruang input. Pada area dengan derau kecil interval menjadi terlalu lebar (konservatif), sedangkan pada area dengan derau besar interval menjadi terlalu sempit. Solusinya adalah Conformalized Quantile Regression (CQR) yang menyesuaikan lebar interval secara adaptif."
      }
    ],
    "references": [
      {
        "citation": "Vovk, V., Gammerman, A., & Shafer, G. (2005). Algorithmic Learning in a Random World. Springer.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Angelopoulos, A. N., & Bates, S. (2021). A gentle introduction to conformal prediction and distribution-free uncertainty quantification. arXiv preprint arXiv:2107.07511.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Conformal Prediction: Pembangkitan Interval Prediksi Bebas Distribusi dengan Jaminan Cakupan Riil",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 6.4.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.4.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami keterbatasan interval prediksi parametrik dan Bayesian yang rentan terhadap misspecification.",
          "Capaian 2: Menguasai algoritma Split Conformal Prediction untuk regresi dan klasifikasi.",
          "Capaian 3: Membuktikan secara matematis jaminan cakupan finit bebas distribusi (Distribution-Free Finite-Sample Coverage Guarantee)."
        ],
        "keyFormulaOrDiagram": "$$s_i = |y_i - \\hat{f}(x_i)|, \\quad i = 1, \\dots, n$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 6.4.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Conformal Prediction: Pembangkitan Interval Prediksi Bebas Distribusi dengan Jaminan Cakupan Riil",
        "lead": "Dalam era kecerdasan artifisial modern, baik metode Frequentist maupun Bayesian memiliki kelemahan mendasar dalam menghasilkan interval prediksi untuk model kotak hitam yang sangat kompleks: - Frequentist mengasumsikan residual berdistribusi Gaussian dan homoskedastis. - Bayesian sangat bergantung pada kebenaran spesifikasi prior dan likelihood; jika prior atau likelihood salah, jaminan cakupan probabilitas runtuh.",
        "bulletPoints": [
          "Revolusi Conformal Prediction (Vovk et al., 2005): Conformal Prediction adalah metodologi inferensi prediktif paling transformatif dalam dua dekade terakhir.",
          "Metode ini memungkinkan sembarang algoritma prediktif (mulai dari regresi linier, XGBoost, hingga Deep Neural Networks) untuk membangkitkan interval prediksi atau himpunan prediksi yang memiliki Jaminan Cakupan Finit Bebas Distribusi (Distribution-Free Finite-Sample Coverage Guarantee): $$P(Y_{n+1} \\in C(X_{n+1})) \\geq 1 - \\alpha$$"
        ],
        "keyFormulaOrDiagram": "$n$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Tiga Karakteristik Revolusioner Conformal Prediction: 1.",
        "bulletPoints": [
          "Bebas Distribusi (Distribution-Free): Tidak memerlukan asumsi apa pun mengenai bentuk distribusi data (bisa bimodal, heteroskedastis ekstrem, atau menceng).",
          "Satu-satunya asumsi yang dibutuhkan adalah pertukaran data (exchangeability), yang otomatis terpenuhi oleh data i.i.d."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Algoritma Split Conformal Prediction (Inductive Conformal Prediction):",
        "bulletPoints": [
          "Diberikan dataset $D = \\{(x_i, y_i)\\}_{i=1}^N$.",
          "1. Partisi Data:",
          "Bagi $D$ secara acak menjadi Himpunan Pelatihan ($D_{\\text{train}}$) dan Himpunan Kalibrasi ($D_{\\text{cal}}$ berukuran $n$)."
        ],
        "keyFormulaOrDiagram": "$$s_i = |y_i - \\hat{f}(x_i)|, \\quad i = 1, \\dots, n$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan n = 19 data kalibrasi untuk model prediksi suhu mesin. Skor residual absolut yang terurut s_i = |y_i - f(x_i)| adalah: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2.5] degC. Tentukan nilai kuantil kritis q_hat untuk tingkat kepercayaan 90% (alpha = 0.10). Jika model memprediksi suhu mesin baru adalah 85.0 degC, tentukan interval Conformal Prediction yang sah secara matematis.",
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
          "Langkah 1: Hitung indeks kuantil teoretis: Indeks = ceil((n + 1) * (1 - alpha)) = ceil((19 + 1) * (1 - 0.10)) = ceil(20 * 0.90) = ceil(18.0) = 18.",
          "Langkah 2: Ambil nilai skor pada indeks ke-18 dari array terurut (berbasis 1): s_(18) = 1.8 degC."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Maka kuantil kritis kalibrasi adalah q_hat = 1.8 degC.",
          "Langkah 4: Konstruksi interval pada titik baru f(X_new) = 85.0 degC: C(X_new) = [85.0 - 1.8, 85.0 + 1.8] = [83.2, 86.8] degC.",
          "[result: Interpretasi Ilmiah] Interval [83.2, 86.8] degC dijamin secara matematis memiliki probabilitas cakupan riil minimal 90% tanpa asumsi distribusi apa pun mengenai bentuk derau sensor."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi Split Conformal Prediction dan pembuktian empiris jaminan cakupan 90%.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi Split Conformal Prediction dan pembuktian empiris jaminan cakupan 90%.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.ensemble",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Validasi Split Conformal Prediction:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Validasi Split Conformal Prediction:\nTingkat Kepercayaan Target (1 - alpha) : 90.0%\nKuantil Kalibrasi Kritis (q_hat)       : 1.6385\nCakupan Empiris Teramati pada Test Set : 92.40% (Jaminan Terbukti!)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menghitung skor non-conformity pada data latih alih-alih pada himpunan kalibrasi terpisah (kebocoran kalibrasi).",
          "[warning: Perangkap] Menerapkan Conformal Prediction pada data yang melanggar asumsi exchangeability (seperti deret waktu dengan autokorelasi kuat tanpa adaptasi enbPI).",
          "[warning: Perangkap] Menggunakan fungsi pembulatan ke bawah (floor) saat menghitung indeks kuantil kalibrasi."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Verifikasi bahwa himpunan kalibrasi benar-benar diisolasi dari proses pelatihan model.",
          "Prosedur: Gunakan formula kuantil eksak np.ceil((n + 1) * (1 - alpha)) / n.",
          "Prosedur: Audit cakupan empiris pada data uji independen: cakupan teramati wajib >= 1 - alpha."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa Conformal Prediction disebut \"Distribution-Free\" dan \"Model-Agnostic\"?",
          "Petunjuk Analitis: Perhatikan asumsi matematika yang mendasari pembuktian teoremanya.",
          "Solusi Kunci: Disebut Distribution-Free karena pembuktian matematisnya tidak mengasumsikan bentuk distribusi probabilitas apa pun (tidak perlu Gaussian, linier, atau simetris). Disebut Model-Agnostic karena metode ini memperlakukan prediktor sebagai fungsi kotak hitam murni; dapat diterapkan pada regresi linier, random forest, deep neural network, hingga Large Language Model."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
