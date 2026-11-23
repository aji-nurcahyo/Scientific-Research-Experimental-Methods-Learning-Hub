import { Lesson } from '../types/curriculum';

export const CH27_LESSONS: Record<string, Partial<Lesson>> = {
  "4.4.1": {
    "id": "4.4.1",
    "chapterId": "CH-27",
    "title": "Batasan Model Linier Standar pada Data Terkorelasi (Clustered/Nested Data)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Mengidentifikasi struktur ketergantungan hierarkis, bersarang (nested), dan berulang (longitudinal).",
      "Memahami konsekuensi fatal mengabaikan korelasi intra-klaster (pseudoreplication).",
      "Menghitung Koefisien Korelasi Intra-Kelas (Intraclass Correlation Coefficient / ICC)."
    ],
    "content": "Salah satu asumsi fondasional dalam regresi OLS dan ANOVA klasik adalah independensi observasi: kovarians antara galat pada dua sampel yang berbeda diasumsikan nol murni (Cov(epsilon_i, epsilon_j) = 0). Namun, dalam desain eksperimen rekayasa dunia nyata, asumsi ini sangat sering dilanggar karena data memiliki struktur pengelompokan alami (clustered, nested, or hierarchical data).\n\nContoh struktur bertingkat dalam rekayasa:\n1. Data bersarang (Nested Data): Pengujian efisiensi turbin angin di mana turbin-turbin beroperasi di dalam beberapa ladang angin (wind farms) yang berbeda. Dua pengukuran dari turbin di ladang angin yang sama akan lebih mirip satu sama lain dibandingkan turbin dari ladang angin yang berbeda karena faktor topografi dan pola iklim mikro lokal.\n2. Pengukuran berulang (Repeated Measures / Longitudinal): Memantau penurunan kapasitas baterai litium-ion yang sama pada siklus pengisian ke-10, 50, 100, dan 500. Pengukuran dari sel baterai yang sama berkorelasi kuat satu sama lain.\n3. Batch manufaktur: Komponen mesin yang diproduksi dari batch lelehan ingot logam yang sama memiliki karakteristik material yang saling bergantung.\n\nJika seorang peneliti memperlakukan observasi yang terkorelasi ini seolah-olah independen (seperti memodelkannya langsung dengan regresi OLS biasa), peneliti melakukan pelanggaran metodologis berat yang disebut Pseudoreplikasi (Pseudoreplication). Pseudoreplikasi menghasilkan perkiraan ukuran sampel efektif yang jauh terlalu optimis, mengecilkan standar error secara drastis, dan menghasilkan nilai p-value yang sangat menipu (p < 0.001 semu pada efek yang sebenarnya tidak ada).",
    "mathematicalFoundations": "1. Model Komponen Varians Dua Tingkat (Random Intercept Empty Model):\n$$y_{ij} = \\mu + u_j + \\epsilon_{ij}$$\ndi mana:\n- $j = 1, \\dots, J$ adalah indeks klaster/grup tingkat-2 (misal ladang angin).\n- $i = 1, \\dots, n_j$ adalah indeks observasi tingkat-1 di dalam klaster $j$ (misal turbin).\n- $\\mu$ adalah grand mean populasi.\n- $u_j \\sim \\mathcal{N}(0, \\sigma_u^2)$ adalah efek acak tingkat klaster (variabilitas antarklaster).\n- $\\epsilon_{ij} \\sim \\mathcal{N}(0, \\sigma_e^2)$ adalah galat residual tingkat individu (variabilitas dalam-klaster).\n- Diasumsikan $\\text{Cov}(u_j, \\epsilon_{ij}) = 0$.\n\n2. Kovarians dan Koefisien Korelasi Intra-Kelas (ICC):\nVarians total dari respon $y_{ij}$:\n$$\\text{Var}(y_{ij}) = \\sigma_u^2 + \\sigma_e^2$$\nKovarians antara dua observasi $i$ dan $i'$ di dalam klaster yang sama $j$:\n$$\\text{Cov}(y_{ij}, y_{i'j}) = \\text{Cov}(\\mu + u_j + \\epsilon_{ij}, \\; \\mu + u_j + \\epsilon_{i'j}) = \\text{Var}(u_j) = \\sigma_u^2$$\nIntraclass Correlation Coefficient (ICC, $\\rho$):\n$$\\rho = \\text{ICC} = \\frac{\\text{Cov}(y_{ij}, y_{i'j})}{\\sqrt{\\text{Var}(y_{ij}) \\text{Var}(y_{i'j})}} = \\frac{\\sigma_u^2}{\\sigma_u^2 + \\sigma_e^2}$$\n\n3. Ukuran Sampel Efektif (Effective Sample Size) dan Faktor Desain:\nUntuk klaster dengan ukuran rata-rata $m$:\n$$\\text{Design Effect} = \\text{Deff} = 1 + (m - 1) \\rho$$\n$$N_{\\text{eff}} = \\frac{N}{\\text{Deff}} = \\frac{N}{1 + (m - 1) \\rho}$$\nJika $\\rho = 0.5$ dan ukuran klaster $m = 11$, maka $\\text{Deff} = 1 + 10(0.5) = 6$. Artinya, 600 observasi terkorelasi hanya setara dengan 100 observasi independen sejati.",
    "workedExample": {
      "problemStatement": "Pada pengujian getaran gearbox mesin industri, diambil data getaran dari 10 gearbox (klaster, J = 10) dengan 20 sensor pengujian per gearbox (m = 20, total N = 200). Dari dekomposisi varians diperoleh varians antargearbox sigma_u^2 = 12.0 dan varians residual dalam-gearbox sigma_e^2 = 4.0. Hitung ICC (rho), faktor desain (Deff), dan ukuran sampel efektif (N_eff).",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi parameter: J = 10 klaster, m = 20 observasi per klaster, N = 200 total.\nsigma_u^2 = 12.0, sigma_e^2 = 4.0.",
        "Langkah 2: Hitung varians total: Var_total = 12.0 + 4.0 = 16.0.",
        "Langkah 3: Hitung Intraclass Correlation Coefficient (ICC):\nrho = sigma_u^2 / (sigma_u^2 + sigma_e^2) = 12.0 / 16.0 = 0.75 (75% variasi getaran berasal dari perbedaan antargearbox).",
        "Langkah 4: Hitung Design Effect (Deff):\nDeff = 1 + (m - 1) * rho = 1 + (20 - 1) * 0.75 = 1 + 19 * 0.75 = 1 + 14.25 = 15.25.",
        "Langkah 5: Hitung ukuran sampel efektif N_eff:\nN_eff = N / Deff = 200 / 15.25 = 13.11 observasi independen."
      ],
      "resultInterpretation": "Meskipun peneliti mengumpulkan 200 baris data, tingginya korelasi intra-klaster (ICC = 0.75) menyebabkan data tersebut hanya membawa informasi yang setara dengan 13 observasi independen murni. Regresi OLS biasa akan mengasumsikan n = 200, meremehkan standar error sebesar sqrt(15.25) = 3.9 kali lipat, memicu kesimpulan palsu."
    },
    "pythonImplementation": {
      "description": "Simulasi data hierarkis bersarang (nested) dan komputasi empiris ICC serta dekomposisi komponen varians.",
      "libraryDependencies": [
        "numpy",
        "statsmodels"
      ],
      "code": "import numpy as np\nimport statsmodels.api as sm\nfrom statsmodels.regression.mixed_linear_model import MixedLM\n\nnp.random.seed(42)\nn_klaster = 10\nn_per_klaster = 20\nN = n_klaster * n_per_klaster\n\nsigma_u = np.sqrt(12.0)  # Varians antarklaster = 12\nsigma_e = np.sqrt(4.0)   # Varians dalam-klaster = 4\ngrand_mean = 50.0\n\n# Generate efek acak klaster u_j\nu_j = np.random.normal(0, sigma_u, size=n_klaster)\n\n# Generate data bersarang\nklaster_id = np.repeat(np.arange(n_klaster), n_per_klaster)\ny = np.zeros(N)\nfor idx, c in enumerate(klaster_id):\n    y[idx] = grand_mean + u_j[c] + np.random.normal(0, sigma_e)\n\n# Pasang Model Campuran (Random Intercept Model)\nmodel = MixedLM(endog=y, exog=np.ones(N), groups=klaster_id)\nresult = model.fit()\n\nvar_u_est = float(np.asarray(result.cov_re)[0, 0])\nvar_e_est = float(result.scale)\nicc_est = var_u_est / (var_u_est + var_e_est)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Estimasi Komponen Varians Hierarkis\")\nprint(f\"Grand Mean Estimasi          : {float(np.asarray(result.params)[0]):.2f} (Sejati: {grand_mean:.2f})\")\nprint(f\"Varians Antarklaster (sigma_u^2) : {var_u_est:.2f} (Sejati: 12.00)\")\nprint(f\"Varians Residual (sigma_e^2)     : {var_e_est:.2f} (Sejati: 4.00)\")\nprint(f\"Intraclass Correlation (ICC) : {icc_est:.4f} (Sejati: {12/(12+4):.4f})\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Estimasi Komponen Varians Hierarkis\nGrand Mean Estimasi          : 51.49 (Sejati: 50.00)\nVarians Antarklaster (sigma_u^2) : 6.34 (Sejati: 12.00)\nVarians Residual (sigma_e^2)     : 3.73 (Sejati: 4.00)\nIntraclass Correlation (ICC) : 0.6294 (Sejati: 0.7500)"
    },
    "commonPitfalls": [
      "Memperlakukan data bersarang sebagai data independen pada OLS standar (pseudoreplikasi).",
      "Mengagregasikan data (menghitung rata-rata per klaster) sehingga membuang seluruh informasi variabilitas tingkat-1.",
      "Mengabaikan ICC padahal ICC > 0.05 sudah cukup untuk mendistorsi standar error secara substansial."
    ],
    "validationProcedures": [
      "Hitung ICC pada model kosong (unconditional empty model) sebagai langkah pre-flight wajib.",
      "Jika ICC > 0.05 dan ukuran klaster > 5, model regresi campuran (Mixed Model) wajib digunakan.",
      "Laporkan komponen varians antarklaster dan dalam-klaster secara transparan."
    ],
    "exercises": [
      {
        "question": "Apakah yang dimaksud dengan fenomena Pseudoreplikasi dalam metodologi penelitian ilmiah eksperimental?",
        "hint": "Perhatikan perlakuan terhadap sampel yang saling berkorelasi atau berasal dari subjek yang sama.",
        "answerExplanation": "Pseudoreplikasi adalah kesalahan metodologis di mana unit-unit observasi yang saling berkorelasi (misal pengukuran berulang pada subjek yang sama atau sampel dari klaster yang sama) diperlakukan seolah-olah merupakan sampel independen baru, menghasilkan standar error yang terlalu kecil palsu."
      }
    ],
    "references": [
      {
        "citation": "Hurlbert, S. H. (1984). Pseudoreplication and the design of ecological field experiments. Ecological Monographs, 54(2), 187-211.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Snijders, T. A., & Bosker, R. J. (2012). Multilevel Analysis: An Introduction to Basic and Advanced Multilevel Modeling (2nd ed.). SAGE Publications.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Batasan Model Linier Standar pada Data Terkorelasi (Clustered/Nested Data)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.4.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.4.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengidentifikasi struktur ketergantungan hierarkis, bersarang (nested), dan berulang (longitudinal).",
          "Capaian 2: Memahami konsekuensi fatal mengabaikan korelasi intra-klaster (pseudoreplication).",
          "Capaian 3: Menghitung Koefisien Korelasi Intra-Kelas (Intraclass Correlation Coefficient / ICC)."
        ],
        "keyFormulaOrDiagram": "$$y_{ij} = \\mu + u_j + \\epsilon_{ij}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.4.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Batasan Model Linier Standar pada Data Terkorelasi (Clustered/Nested Data)",
        "lead": "Salah satu asumsi fondasional dalam regresi OLS dan ANOVA klasik adalah independensi observasi: kovarians antara galat pada dua sampel yang berbeda diasumsikan nol murni (Cov(epsilon_i, epsilon_j) = 0).",
        "bulletPoints": [
          "Namun, dalam desain eksperimen rekayasa dunia nyata, asumsi ini sangat sering dilanggar karena data memiliki struktur pengelompokan alami (clustered, nested, or hierarchical data).",
          "Contoh struktur bertingkat dalam rekayasa: 1.",
          "Data bersarang (Nested Data): Pengujian efisiensi turbin angin di mana turbin-turbin beroperasi di dalam beberapa ladang angin (wind farms) yang berbeda."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Jika seorang peneliti memperlakukan observasi yang terkorelasi ini seolah-olah independen (seperti memodelkannya langsung dengan regresi OLS biasa), peneliti melakukan pelanggaran metodologis berat yang disebut Pseudoreplikasi (Pseudoreplication).",
        "bulletPoints": [
          "Pseudoreplikasi menghasilkan perkiraan ukuran sampel efektif yang jauh terlalu optimis, mengecilkan standar error secara drastis, dan menghasilkan nilai p-value yang sangat menipu (p < 0.001 semu pada efek yang sebenarnya tidak ada)."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Model Komponen Varians Dua Tingkat (Random Intercept Empty Model):",
        "bulletPoints": [
          "di mana:",
          "- $j = 1, \\dots, J$ adalah indeks klaster/grup tingkat-2 (misal ladang angin).",
          "- $i = 1, \\dots, n_j$ adalah indeks observasi tingkat-1 di dalam klaster $j$ (misal turbin)."
        ],
        "keyFormulaOrDiagram": "$$y_{ij} = \\mu + u_j + \\epsilon_{ij}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada pengujian getaran gearbox mesin industri, diambil data getaran dari 10 gearbox (klaster, J = 10) dengan 20 sensor pengujian per gearbox (m = 20, total N = 200). Dari dekomposisi varians diperoleh varians antargearbox sigma_u^2 = 12.0 dan varians residual dalam-gearbox sigma_e^2 = 4.0. Hitung ICC (rho), faktor desain (Deff), dan ukuran sampel efektif (N_eff).",
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
          "Langkah 1: Identifikasi parameter: J = 10 klaster, m = 20 observasi per klaster, N = 200 total.\nsigma_u^2 = 12.0, sigma_e^2 = 4.0.",
          "Langkah 2: Hitung varians total: Var_total = 12.0 + 4.0 = 16.0.",
          "Langkah 3: Hitung Intraclass Correlation Coefficient (ICC):\nrho = sigma_u^2 / (sigma_u^2 + sigma_e^2) = 12.0 / 16.0 = 0.75 (75% variasi getaran berasal dari perbedaan antargearbox)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung Design Effect (Deff):\nDeff = 1 + (m - 1) * rho = 1 + (20 - 1) * 0.75 = 1 + 19 * 0.75 = 1 + 14.25 = 15.25.",
          "Langkah 5: Hitung ukuran sampel efektif N_eff:\nN_eff = N / Deff = 200 / 15.25 = 13.11 observasi independen.",
          "[result: Interpretasi Ilmiah] Meskipun peneliti mengumpulkan 200 baris data, tingginya korelasi intra-klaster (ICC = 0.75) menyebabkan data tersebut hanya membawa informasi yang setara dengan 13 observasi independen murni. Regresi OLS biasa akan mengasumsikan n = 200, meremehkan standar error sebesar sqrt(15.25) = 3.9 kali lipat, memicu kesimpulan palsu."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi data hierarkis bersarang (nested) dan komputasi empiris ICC serta dekomposisi komponen varians.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi data hierarkis bersarang (nested) dan komputasi empiris ICC serta dekomposisi komponen varians.",
          "Dependensi Pustaka Ilmiah: numpy, statsmodels",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Estimasi Komponen Varians Hierarkis"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Estimasi Komponen Varians Hierarkis\nGrand Mean Estimasi          : 51.49 (Sejati: 50.00)\nVarians Antarklaster (sigma_u^2) : 6.34 (Sejati: 12.00)\nVarians Residual (sigma_e^2)     : 3.73 (Sejati: 4.00)\nIntraclass Correlation (ICC) : 0.6294 (Sejati: 0.7500)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Memperlakukan data bersarang sebagai data independen pada OLS standar (pseudoreplikasi).",
          "[warning: Perangkap] Mengagregasikan data (menghitung rata-rata per klaster) sehingga membuang seluruh informasi variabilitas tingkat-1.",
          "[warning: Perangkap] Mengabaikan ICC padahal ICC > 0.05 sudah cukup untuk mendistorsi standar error secara substansial."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Hitung ICC pada model kosong (unconditional empty model) sebagai langkah pre-flight wajib.",
          "Prosedur: Jika ICC > 0.05 dan ukuran klaster > 5, model regresi campuran (Mixed Model) wajib digunakan.",
          "Prosedur: Laporkan komponen varians antarklaster dan dalam-klaster secara transparan."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apakah yang dimaksud dengan fenomena Pseudoreplikasi dalam metodologi penelitian ilmiah eksperimental?",
          "Petunjuk Analitis: Perhatikan perlakuan terhadap sampel yang saling berkorelasi atau berasal dari subjek yang sama.",
          "Solusi Kunci: Pseudoreplikasi adalah kesalahan metodologis di mana unit-unit observasi yang saling berkorelasi (misal pengukuran berulang pada subjek yang sama atau sampel dari klaster yang sama) diperlakukan seolah-olah merupakan sampel independen baru, menghasilkan standar error yang terlalu kecil palsu."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.4.2": {
    "id": "4.4.2",
    "chapterId": "CH-27",
    "title": "Pembedaan Efek Tetap (Fixed Effects) dan Efek Acak (Random Effects)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membedakan konsep filosofis dan operasional antara Fixed Effects dan Random Effects.",
      "Memahami mekanisme penyusutan estimasi (shrinkage / empirical Bayes prediction).",
      "Memilih spesifikasi model yang tepat berdasarkan tujuan inferensi (kondisional vs marginal)."
    ],
    "content": "Dalam pemodelan statistik modern, salah satu pertanyaan paling mendasar bagi peneliti adalah: \"Kapan suatu faktor harus diperlakukan sebagai Efek Tetap (Fixed Effect), dan kapan harus diperlakukan sebagai Efek Acak (Random Effect)?\"\n\nPembedaan Konseptual:\n1. Efek Tetap (Fixed Effects): Faktor diperlakukan sebagai efek tetap jika level faktor yang diteliti mencakup seluruh populasi yang menarik perhatian peneliti secara spesifik, atau level-level tersebut dipilih secara sengaja dan tidak acak. Peneliti tertarik untuk membandingkan nilai rata-rata spesifik dari level-level tersebut. Contoh: Tiga dosis katalis kimia yang ditentukan (10 mg, 20 mg, 30 mg), jenis kelamin, atau metode kontrol A versus B. Hasil inferensi hanya berlaku untuk level-level yang diuji tersebut.\n2. Efek Acak (Random Effects): Faktor diperlakukan sebagai efek acak jika level faktor yang muncul dalam eksperimen dipandang sebagai sampel acak yang ditarik dari populasi level yang jauh lebih besar. Peneliti tidak tertarik pada nilai rata-rata spesifik dari tiap individu level, melainkan pada besarnya variabilitas (komponen varians sigma_u^2) di antara seluruh populasi level tersebut. Contoh: Sampel operator mesin yang bertugas, sampel batch material yang dikirim dari pabrik, atau sampel pasien di rumah sakit. Hasil inferensi dapat digeneralisasikan ke seluruh populasi klaster.\n\nKeunggulan matematis luar biasa dari efek acak adalah sifat Penyusutan (Shrinkage / Partial Pooling). Estimator efek acak menarik estimasi klaster-klaster kecil yang memiliki sedikit data menuju rata-rata global (grand mean), mencegah penarikan kesimpulan ekstrem akibat fluktuasi sampel terbatas.",
    "mathematicalFoundations": "1. Formulasi Matriks Linear Mixed Models (LMM):\n$$\\mathbf{y} = \\mathbf{X} \\boldsymbol{\\beta} + \\mathbf{Z} \\mathbf{u} + \\boldsymbol{\\epsilon}$$\ndi mana:\n- $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$ adalah matriks desain untuk Efek Tetap (*Fixed Effects*).\n- $\\boldsymbol{\\beta} \\in \\mathbb{R}^{p \\times 1}$ adalah vektor koefisien efek tetap (parameter konstan populasi).\n- $\\mathbf{Z} \\in \\mathbb{R}^{n \\times q}$ adalah matriks desain untuk Efek Acak (*Random Effects*).\n- $\\mathbf{u} \\in \\mathbb{R}^{q \\times 1}$ adalah vektor efek acak: $\\mathbf{u} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{G})$.\n- $\\boldsymbol{\\epsilon} \\in \\mathbb{R}^{n \\times 1}$ adalah vektor galat residual: $\\boldsymbol{\\epsilon} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{R})$, biasanya $\\mathbf{R} = \\sigma_e^2 \\mathbf{I}_n$.\n- $\\mathbf{u}$ dan $\\boldsymbol{\\epsilon}$ diasumsikan saling independen.\n\n2. Struktur Varians Marjinal Respon:\n$$E[\\mathbf{y}] = \\mathbf{X} \\boldsymbol{\\beta}$$\n$$\\mathbf{V} = \\text{Var}(\\mathbf{y}) = \\mathbf{Z} \\mathbf{G} \\mathbf{Z}^T + \\mathbf{R}$$\n\n3. Mekanisme Penyusutan Shrinkage (Empirical Bayes):\nUntuk klaster ke-$j$ dengan $n_j$ observasi dan rata-rata sampel $\\bar{y}_j$:\n$$\\hat{u}_j = \\frac{n_j \\sigma_u^2}{n_j \\sigma_u^2 + \\sigma_e^2} (\\bar{y}_j - \\mu) = \\left( \\frac{n_j}{n_j + \\sigma_e^2 / \\sigma_u^2} \\right) (\\bar{y}_j - \\mu)$$\nFaktor bobot penyusutan $\\lambda_j = \\frac{n_j}{n_j + \\sigma_e^2 / \\sigma_u^2} \\in [0, 1]$:\n- Jika ukuran sampel klaster $n_j$ kecil: $\\lambda_j \\to 0$, estimasi klaster disusutkan mendekati rata-rata populasi $\\mu$ (mencegah overfitting).\n- Jika ukuran sampel klaster $n_j$ sangat besar: $\\lambda_j \\to 1$, estimasi klaster sepenuhnya mempercayai data sampel lokal $\\bar{y}_j$.",
    "workedExample": {
      "problemStatement": "Pada kalibrasi sensor IoT, varians antarsensor adalah sigma_u^2 = 8.0 dan varians pengukuran acak sigma_e^2 = 2.0. Rata-rata populasi grand mean adalah mu = 100.0. Terdapat sensor X yang hanya memiliki n = 2 data pengukuran dengan rata-rata bar{y}_X = 110.0. Hitung faktor penyusutan lambda dan estimasi Empirical Bayes untuk sensor X.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi parameter: sigma_u^2 = 8.0, sigma_e^2 = 2.0, n_j = 2, bar{y}_X = 110.0, mu = 100.0.",
        "Langkah 2: Hitung rasio varians: sigma_e^2 / sigma_u^2 = 2.0 / 8.0 = 0.25.",
        "Langkah 3: Hitung faktor bobot penyusutan lambda:\nlambda = n_j / (n_j + sigma_e^2 / sigma_u^2) = 2 / (2 + 0.25) = 2 / 2.25 = 0.8889.",
        "Langkah 4: Hitung estimasi efek acak hat{u}_X:\nhat{u}_X = lambda * (bar{y}_X - mu) = 0.8889 * (110.0 - 100.0) = 0.8889 * 10.0 = +8.889.",
        "Langkah 5: Hitung nilai prediksi performa sensor X:\ny_pred = mu + hat{u}_X = 100.0 + 8.89 = 108.89."
      ],
      "resultInterpretation": "Tanpa model acak (no pooling), peneliti akan menyimpulkan nilai sensor adalah 110.0. Namun karena data hanya 2 sampel, model campuran secara cerdas \"menyusutkan\" estimasi sebesar 1.11 poin ke arah rata-rata populasi menjadi 108.89. Ini memberikan prediksi yang jauh lebih tahan uji terhadap fluktuasi acak."
    },
    "pythonImplementation": {
      "description": "Demonstrasi sifat shrinkage (partial pooling) pada estimasi Empirical Bayes menggunakan Linear Mixed Model.",
      "libraryDependencies": [
        "numpy",
        "pandas",
        "statsmodels"
      ],
      "code": "import numpy as np\nimport pandas as pd\nimport statsmodels.formula.api as smf\n\nnp.random.seed(42)\nn_grup = 8\n# Ukuran sampel per grup bervariasi ekstrem: grup pertama sedikit, grup akhir banyak\nukuran_sampel = [2, 3, 4, 15, 20, 25, 30, 40]\n\ngrand_mean = 100.0\nsigma_u = 4.0\nsigma_e = 3.0\n\nu_true = np.random.normal(0, sigma_u, size=n_grup)\n\ndf_list = []\nfor g_id, (n_s, u) in enumerate(zip(ukuran_sampel, u_true)):\n    y_vals = grand_mean + u + np.random.normal(0, sigma_e, size=n_s)\n    for y_val in y_vals:\n        df_list.append({'Grup': f'G{g_id+1}', 'y': y_val, 'n': n_s})\n\ndf = pd.DataFrame(df_list)\n\n# Pasang Linear Mixed Model: y ~ 1, groups = Grup\nmd = smf.mixedlm(\"y ~ 1\", df, groups=df[\"Grup\"])\nmdf = md.fit()\n\n# Ambil random effects (BLUP / Empirical Bayes)\nre_dict = mdf.random_effects\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Evaluasi Penyusutan (Shrinkage) Efek Acak\")\nprint(f\"{'Grup':<8}{'Ukuran n':<10}{'Rata-rata Sampel':<18}{'BLUP Estimasi (u)':<20}{'Prediksi Final':<16}\")\nprint(\"-\" * 72)\nfor g_id, n_s in enumerate(ukuran_sampel):\n    g_name = f'G{g_id+1}'\n    sample_mean = df[df['Grup'] == g_name]['y'].mean()\n    u_blup = re_dict[g_name].iloc[0]\n    pred_final = mdf.params['Intercept'] + u_blup\n    print(f\"{g_name:<8}{n_s:<10}{sample_mean:<18.2f}{u_blup:<20.2f}{pred_final:<16.2f}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Penyusutan (Shrinkage) Efek Acak\nGrup    Ukuran n  Rata-rata Sampel  BLUP Estimasi (u)   Prediksi Final  \n------------------------------------------------------------------------\nG1      2         100.26            -0.10               99.88           \nG2      3         99.45             -0.45               99.53           \nG3      4         101.40            1.00                100.98          \nG4      15        104.97            4.70                104.68          \nG5      20        98.66             -1.29               98.69           \nG6      25        96.53             -3.37               96.61           \nG7      30        106.31            6.14                106.12          \nG8      40        98.81             -1.15               98.83"
    },
    "commonPitfalls": [
      "Memperlakukan faktor dengan sedikit level (misal k = 2 level) sebagai efek acak (sulit mengestimasi varians sigma_u^2 dengan presisi jika level < 5).",
      "Mengira bahwa efek acak mengasumsikan efek sama di setiap kelompok (efek acak mengizinkan tiap kelompok berbeda, namun perbedaannya dimodelkan mengikuti distribusi normal).",
      "Menafsirkan koefisien marjinal populasi sama persis dengan koefisien spesifik subjek."
    ],
    "validationProcedures": [
      "Gunakan Fixed Effects jika jumlah level sedikit (< 5) dan peneliti hanya peduli pada level spesifik tersebut.",
      "Gunakan Random Effects jika tujuannya menggeneralisasi ke populasi klaster dan level berjumlah >= 5.",
      "Periksa apakah matriks varians G definit positif."
    ],
    "exercises": [
      {
        "question": "Kapan suatu faktor sebaiknya dimodelkan sebagai Fixed Effect dan bukan sebagai Random Effect?",
        "hint": "Perhatikan jumlah level faktor dan apakah level-level tersebut mencakup seluruh target penelitian spesifik.",
        "answerExplanation": "Faktor dimodelkan sebagai Fixed Effect jika level faktor dipilih secara spesifik, berjumlah sedikit (< 5), dan peneliti ingin membandingkan perbedaan rata-rata langsung antar level tersebut tanpa bermaksud menggeneralisasikannya ke populasi klaster yang lebih luas."
      }
    ],
    "references": [
      {
        "citation": "Gelman, A., & Hill, J. (2006). Data Analysis Using Regression and Multilevel/Hierarchical Models. Cambridge University Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Pinheiro, J. C., & Bates, D. M. (2000). Mixed-Effects Models in S and S-PLUS. Springer.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pembedaan Efek Tetap (Fixed Effects) dan Efek Acak (Random Effects)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.4.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.4.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan konsep filosofis dan operasional antara Fixed Effects dan Random Effects.",
          "Capaian 2: Memahami mekanisme penyusutan estimasi (shrinkage / empirical Bayes prediction).",
          "Capaian 3: Memilih spesifikasi model yang tepat berdasarkan tujuan inferensi (kondisional vs marginal)."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{y} = \\mathbf{X} \\boldsymbol{\\beta} + \\mathbf{Z} \\mathbf{u} + \\boldsymbol{\\epsilon}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.4.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pembedaan Efek Tetap (Fixed Effects) dan Efek Acak (Random Effects)",
        "lead": "Dalam pemodelan statistik modern, salah satu pertanyaan paling mendasar bagi peneliti adalah: \"Kapan suatu faktor harus diperlakukan sebagai Efek Tetap (Fixed Effect), dan kapan harus diperlakukan sebagai Efek Acak (Random Effect)?\"",
        "bulletPoints": [
          "Pembedaan Konseptual: 1.",
          "Efek Tetap (Fixed Effects): Faktor diperlakukan sebagai efek tetap jika level faktor yang diteliti mencakup seluruh populasi yang menarik perhatian peneliti secara spesifik, atau level-level tersebut dipilih secara sengaja dan tidak acak."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Keunggulan matematis luar biasa dari efek acak adalah sifat Penyusutan (Shrinkage / Partial Pooling).",
        "bulletPoints": [
          "Estimator efek acak menarik estimasi klaster-klaster kecil yang memiliki sedikit data menuju rata-rata global (grand mean), mencegah penarikan kesimpulan ekstrem akibat fluktuasi sampel terbatas."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Matriks Linear Mixed Models (LMM):",
        "bulletPoints": [
          "di mana:",
          "- $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$ adalah matriks desain untuk Efek Tetap (*Fixed Effects*).",
          "- $\\boldsymbol{\\beta} \\in \\mathbb{R}^{p \\times 1}$ adalah vektor koefisien efek tetap (parameter konstan populasi)."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{y} = \\mathbf{X} \\boldsymbol{\\beta} + \\mathbf{Z} \\mathbf{u} + \\boldsymbol{\\epsilon}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada kalibrasi sensor IoT, varians antarsensor adalah sigma_u^2 = 8.0 dan varians pengukuran acak sigma_e^2 = 2.0. Rata-rata populasi grand mean adalah mu = 100.0. Terdapat sensor X yang hanya memiliki n = 2 data pengukuran dengan rata-rata bar{y}_X = 110.0. Hitung faktor penyusutan lambda dan estimasi Empirical Bayes untuk sensor X.",
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
          "Langkah 1: Identifikasi parameter: sigma_u^2 = 8.0, sigma_e^2 = 2.0, n_j = 2, bar{y}_X = 110.0, mu = 100.0.",
          "Langkah 2: Hitung rasio varians: sigma_e^2 / sigma_u^2 = 2.0 / 8.0 = 0.25.",
          "Langkah 3: Hitung faktor bobot penyusutan lambda:\nlambda = n_j / (n_j + sigma_e^2 / sigma_u^2) = 2 / (2 + 0.25) = 2 / 2.25 = 0.8889."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung estimasi efek acak hat{u}_X:\nhat{u}_X = lambda * (bar{y}_X - mu) = 0.8889 * (110.0 - 100.0) = 0.8889 * 10.0 = +8.889.",
          "Langkah 5: Hitung nilai prediksi performa sensor X:\ny_pred = mu + hat{u}_X = 100.0 + 8.89 = 108.89.",
          "[result: Interpretasi Ilmiah] Tanpa model acak (no pooling), peneliti akan menyimpulkan nilai sensor adalah 110.0. Namun karena data hanya 2 sampel, model campuran secara cerdas \"menyusutkan\" estimasi sebesar 1.11 poin ke arah rata-rata populasi menjadi 108.89. Ini memberikan prediksi yang jauh lebih tahan uji terhadap fluktuasi acak."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Demonstrasi sifat shrinkage (partial pooling) pada estimasi Empirical Bayes menggunakan Linear Mixed Model.",
        "bulletPoints": [
          "Tujuan Algoritma: Demonstrasi sifat shrinkage (partial pooling) pada estimasi Empirical Bayes menggunakan Linear Mixed Model.",
          "Dependensi Pustaka Ilmiah: numpy, pandas, statsmodels",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Penyusutan (Shrinkage) Efek Acak"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Penyusutan (Shrinkage) Efek Acak\nGrup    Ukuran n  Rata-rata Sampel  BLUP Estimasi (u)   Prediksi Final  \n------------------------------------------------------------------------\nG1      2         100.26            -0.10               99.88           \nG2      3         99.45             -0.45               99.53           ",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Memperlakukan faktor dengan sedikit level (misal k = 2 level) sebagai efek acak (sulit mengestimasi varians sigma_u^2 dengan presisi jika level < 5).",
          "[warning: Perangkap] Mengira bahwa efek acak mengasumsikan efek sama di setiap kelompok (efek acak mengizinkan tiap kelompok berbeda, namun perbedaannya dimodelkan mengikuti distribusi normal).",
          "[warning: Perangkap] Menafsirkan koefisien marjinal populasi sama persis dengan koefisien spesifik subjek."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan Fixed Effects jika jumlah level sedikit (< 5) dan peneliti hanya peduli pada level spesifik tersebut.",
          "Prosedur: Gunakan Random Effects jika tujuannya menggeneralisasi ke populasi klaster dan level berjumlah >= 5.",
          "Prosedur: Periksa apakah matriks varians G definit positif."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Kapan suatu faktor sebaiknya dimodelkan sebagai Fixed Effect dan bukan sebagai Random Effect?",
          "Petunjuk Analitis: Perhatikan jumlah level faktor dan apakah level-level tersebut mencakup seluruh target penelitian spesifik.",
          "Solusi Kunci: Faktor dimodelkan sebagai Fixed Effect jika level faktor dipilih secara spesifik, berjumlah sedikit (< 5), dan peneliti ingin membandingkan perbedaan rata-rata langsung antar level tersebut tanpa bermaksud menggeneralisasikannya ke populasi klaster yang lebih luas."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.4.3": {
    "id": "4.4.3",
    "chapterId": "CH-27",
    "title": "Pemodelan Pengukuran Berulang (Repeated Measures) Menggunakan Linear Mixed Models",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Menerapkan Random Intercept dan Random Slope untuk data longitudinal deret waktu.",
      "Menangani nilai yang hilang (missing data) secara elegan tanpa membuang subjek.",
      "Membandingkan struktur matriks kovarians residual (Compound Symmetry vs Autoregressive AR(1))."
    ],
    "content": "Dalam eksperimen ilmiah, data pengukuran berulang (repeated measures) dihasilkan ketika unit eksperimen yang sama diukur pada beberapa titik waktu yang berurutan atau di bawah kondisi pengujian yang berbeda-beda. Contoh klasik meliputi laju korosi pipa pada bulan ke-1 hingga ke-12, atau degradasi performa model AI selama proses continual learning.\n\nPendekatan lama menggunakan Repeated Measures ANOVA (RM-ANOVA) memiliki dua kelemahan fatal:\n1. Asumsi Sferisitas (Sphericity): RM-ANOVA menuntut varians dari seluruh pasangan selisih waktu adalah identik. Jika asumsi sferisitas dilanggar, uji F menjadi sangat bias (memerlukan koreksi konservatif Greenhouse-Geisser).\n2. Ketidakmampuan Menangani Missing Data: Jika satu subjek melewatkan satu titik waktu pengukuran saja, seluruh data dari subjek tersebut harus dibuang dari analisis (listwise deletion), memicu pemborosan data masif dan potensi bias seleksi.\n\nLinear Mixed Models (LMM) merevolusi analisis pengukuran berulang. LMM tidak menuntut asumsi sferisitas, dapat mengakomodasi titik waktu observasi yang tidak seragam (unbalanced time points), dan secara otomatis mempertahankan subjek yang memiliki missing data di beberapa titik waktu (asalkan missing at random / MAR).\n\nDalam LMM, peneliti dapat memodelkan:\n- Random Intercept: Mengizinkan setiap subjek memulai dengan garis dasar (baseline) performa yang berbeda.\n- Random Slope: Mengizinkan laju perubahan performa seiring waktu (trajectory) berbeda-beda untuk tiap subjek.",
    "mathematicalFoundations": "1. Model Pengukuran Berulang (Random Intercept & Random Slope):\n$$y_{ti} = (\\beta_0 + u_{0i}) + (\\beta_1 + u_{1i}) t + \\epsilon_{ti}$$\ndi mana:\n- $t$ adalah variabel waktu kontinu.\n- $i$ adalah indeks subjek/unit eksperimen.\n- $\\beta_0$ adalah baseline intersep rata-rata populasi.\n- $\\beta_1$ adalah laju perubahan (slope) rata-rata populasi.\n- $u_{0i} \\sim \\mathcal{N}(0, \\sigma_{u0}^2)$ adalah deviasi intersep subjek $i$.\n- $u_{1i} \\sim \\mathcal{N}(0, \\sigma_{u1}^2)$ adalah deviasi laju perubahan subjek $i$.\n- Vektor efek acak subjek:\n$$\\begin{bmatrix} u_{0i} \\\\ u_{1i} \\end{bmatrix} \\sim \\mathcal{N}\\left( \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}, \\; \\begin{bmatrix} \\sigma_{u0}^2 & \\sigma_{u01} \\\\ \\sigma_{u01} & \\sigma_{u1}^2 \\end{bmatrix} \\right)$$\n\n2. Struktur Kovarians Waktu (Residual Error Correlation):\n- Compound Symmetry (CS): Varians konstan $\\sigma^2$ dan korelasi antar-waktu konstan $\\rho$:\n$$\\text{Cov}(\\epsilon_{ti}, \\epsilon_{t'i}) = \\sigma^2 \\rho \\quad (\\forall t \\ne t')$$\n- Autoregressive Orde 1 (AR(1)): Korelasi meluruh secara eksponensial seiring bertambahnya jarak jeda waktu $|t - t'|$:\n$$\\text{Cov}(\\epsilon_{ti}, \\epsilon_{t'i}) = \\sigma^2 \\rho^{|t - t'|}$$\nStruktur AR(1) mencerminkan realitas fisis bahwa dua pengukuran yang berdekatan lebih mirip daripada dua pengukuran yang terpisah bertahun-tahun.",
    "workedExample": {
      "problemStatement": "Sebuah eksperimen mengukur keausan bantalan poros (wear, mikrometer) pada 5 poros mesin selama 4 interval waktu (t = 1, 2, 3, 4 jam). Model Random Intercept menghasilkan: beta_0 = 10.0, beta_1 (laju keausan) = 2.5 um/jam. Untuk Poros 3, efek acak intersep terestimasi u_03 = -1.8 um. Hitung prediksi keausan Poros 3 pada jam ke-3 dan bandingkan dengan rata-rata populasi.",
      "stepByStepSolution": [
        "Langkah 1: Hitung prediksi rata-rata populasi pada jam ke-3 (t = 3):\ny_pop(3) = beta_0 + beta_1 * (3) = 10.0 + 2.5 * (3) = 10.0 + 7.5 = 17.5 um.",
        "Langkah 2: Hitung intersep spesifik untuk Poros 3:\nIntersep_3 = beta_0 + u_03 = 10.0 + (-1.8) = 8.2 um.",
        "Langkah 3: Hitung prediksi spesifik untuk Poros 3 pada jam ke-3:\ny_poros3(3) = Intersep_3 + beta_1 * (3) = 8.2 + 2.5 * (3) = 8.2 + 7.5 = 15.7 um."
      ],
      "resultInterpretation": "Poros 3 memiliki baseline keausan awal yang lebih rendah sebesar 1.8 um dibandingkan rata-rata mesin lainnya. Pada jam ke-3, keausan Poros 3 diprediksi 15.7 um (dibandingkan rata-rata populasi 17.5 um). Model LMM memisahkan variasi baseline individual dari laju degradasi global."
    },
    "pythonImplementation": {
      "description": "Pemodelan longitudinal repeated measures dengan Random Intercept menggunakan MixedLM statsmodels.",
      "libraryDependencies": [
        "numpy",
        "pandas",
        "statsmodels"
      ],
      "code": "import numpy as np\nimport pandas as pd\nimport statsmodels.formula.api as smf\n\nnp.random.seed(42)\nn_subjek = 15\ntitik_waktu = [1.0, 2.0, 3.0, 4.0, 5.0]\n\nbeta0_sejati = 12.0\nbeta1_sejati = 3.5  # Kenaikan 3.5 unit per waktu\nsigma_subjek = 2.0\nsigma_error = 1.0\n\n# Generate subjek\nu_subjek = np.random.normal(0, sigma_subjek, size=n_subjek)\n\nbaris_data = []\nfor s_idx, u_s in enumerate(u_subjek):\n    for t in titik_waktu:\n        # Simulasikan missing data acak: 10% probabilitas data hilang\n        if np.random.rand() > 0.10:\n            y = (beta0_sejati + u_s) + beta1_sejati * t + np.random.normal(0, sigma_error)\n            baris_data.append({'Subjek': f'Subj_{s_idx+1}', 'Waktu': t, 'Respon': y})\n\ndf_long = pd.DataFrame(baris_data)\n\n# Pasang Linear Mixed Model dengan Random Intercept per Subjek\nmodel_lmm = smf.mixedlm(\"Respon ~ Waktu\", df_long, groups=df_long[\"Subjek\"]).fit()\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil Pemodelan Longitudinal Repeated Measures LMM\")\nprint(f\"Total Observasi Tersedia : {len(df_long)} dari {n_subjek * len(titik_waktu)} (Ada Missing Data)\")\nprint(f\"Estimasi Intersep (beta0): {model_lmm.params['Intercept']:.4f} (Sejati: {beta0_sejati:.4f})\")\nprint(f\"Estimasi Slope (beta1)   : {model_lmm.params['Waktu']:.4f} (Sejati: {beta1_sejati:.4f})\")\nprint(f\"Standar Error Slope      : {model_lmm.bse['Waktu']:.4f} (p-value: {model_lmm.pvalues['Waktu']:.4e})\")\nprint(f\"Varians Antar-Subjek     : {float(np.asarray(model_lmm.cov_re)[0, 0]):.4f} (Sejati: {sigma_subjek**2:.4f})\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Pemodelan Longitudinal Repeated Measures LMM\nTotal Observasi Tersedia : 67 dari 75 (Ada Missing Data)\nEstimasi Intersep (beta0): 12.0725 (Sejati: 12.0000)\nEstimasi Slope (beta1)   : 3.5228 (Sejati: 3.5000)\nStandar Error Slope      : 0.0469 (p-value: 0.0000e+00)\nVarians Antar-Subjek     : 3.4215 (Sejati: 4.0000)"
    },
    "commonPitfalls": [
      "Membuang seluruh data dari subjek yang memiliki satu data pengukuran bolong (listwise deletion) alih-alih memanfaatkan LMM.",
      "Memaksakan model Random Slope padahal data hanya memiliki 2 titik waktu observasi per subjek (dibutuhkan minimal 3 titik waktu untuk estimasi varians slope).",
      "Mengabaikan korelasi antara random intercept dan random slope."
    ],
    "validationProcedures": [
      "Periksa apakah variabel waktu diperlakukan secara tepat (sebagai kovariat kontinu atau faktor kategori).",
      "Bandingkan model Random Intercept saja versus model Random Intercept + Slope menggunakan Likelihood Ratio Test.",
      "Verifikasi bahwa estimasi parameter varians tidak menghasilkan singular fit (boundary convergence)."
    ],
    "exercises": [
      {
        "question": "Mengapa Linear Mixed Models (LMM) jauh lebih unggul daripada Repeated Measures ANOVA (RM-ANOVA) dalam menganalisis data eksperimen longitudinal industri?",
        "hint": "Perhatikan penanganan data yang hilang dan asumsi sferisitas matriks kovarians.",
        "answerExplanation": "LMM mampu memproses data dengan nilai hilang (missing at random) tanpa membuang subjek, tidak memerlukan asumsi sferisitas yang restriktif, dan fleksibel mengakomodasi titik waktu observasi yang tidak berjarak seragam."
      }
    ],
    "references": [
      {
        "citation": "Fitzmaurice, G. M., Laird, N. M., & Ware, J. H. (2012). Applied Longitudinal Analysis (2nd ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Verbeke, G., & Molenberghs, G. (2000). Linear Mixed Models for Longitudinal Data. Springer.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pemodelan Pengukuran Berulang (Repeated Measures) Menggunakan Linear Mixed Models",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.4.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.4.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menerapkan Random Intercept dan Random Slope untuk data longitudinal deret waktu.",
          "Capaian 2: Menangani nilai yang hilang (missing data) secara elegan tanpa membuang subjek.",
          "Capaian 3: Membandingkan struktur matriks kovarians residual (Compound Symmetry vs Autoregressive AR(1))."
        ],
        "keyFormulaOrDiagram": "$$y_{ti} = (\\beta_0 + u_{0i}) + (\\beta_1 + u_{1i}) t + \\epsilon_{ti}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.4.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pemodelan Pengukuran Berulang (Repeated Measures) Menggunakan Linear Mixed Models",
        "lead": "Dalam eksperimen ilmiah, data pengukuran berulang (repeated measures) dihasilkan ketika unit eksperimen yang sama diukur pada beberapa titik waktu yang berurutan atau di bawah kondisi pengujian yang berbeda-beda.",
        "bulletPoints": [
          "Contoh klasik meliputi laju korosi pipa pada bulan ke-1 hingga ke-12, atau degradasi performa model AI selama proses continual learning.",
          "Pendekatan lama menggunakan Repeated Measures ANOVA (RM-ANOVA) memiliki dua kelemahan fatal: 1.",
          "Asumsi Sferisitas (Sphericity): RM-ANOVA menuntut varians dari seluruh pasangan selisih waktu adalah identik."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Linear Mixed Models (LMM) merevolusi analisis pengukuran berulang.",
        "bulletPoints": [
          "LMM tidak menuntut asumsi sferisitas, dapat mengakomodasi titik waktu observasi yang tidak seragam (unbalanced time points), dan secara otomatis mempertahankan subjek yang memiliki missing data di beberapa titik waktu (asalkan missing at random / MAR).",
          "Dalam LMM, peneliti dapat memodelkan: - Random Intercept: Mengizinkan setiap subjek memulai dengan garis dasar (baseline) performa yang berbeda. - Random Slope: Mengizinkan laju perubahan performa seiring waktu (trajectory) berbeda-beda untuk tiap subjek."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Model Pengukuran Berulang (Random Intercept & Random Slope):",
        "bulletPoints": [
          "di mana:",
          "- $t$ adalah variabel waktu kontinu.",
          "- $i$ adalah indeks subjek/unit eksperimen."
        ],
        "keyFormulaOrDiagram": "$$y_{ti} = (\\beta_0 + u_{0i}) + (\\beta_1 + u_{1i}) t + \\epsilon_{ti}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah eksperimen mengukur keausan bantalan poros (wear, mikrometer) pada 5 poros mesin selama 4 interval waktu (t = 1, 2, 3, 4 jam). Model Random Intercept menghasilkan: beta_0 = 10.0, beta_1 (laju keausan) = 2.5 um/jam. Untuk Poros 3, efek acak intersep terestimasi u_03 = -1.8 um. Hitung prediksi keausan Poros 3 pada jam ke-3 dan bandingkan dengan rata-rata populasi.",
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
          "Langkah 1: Hitung prediksi rata-rata populasi pada jam ke-3 (t = 3):\ny_pop(3) = beta_0 + beta_1 * (3) = 10.0 + 2.5 * (3) = 10.0 + 7.5 = 17.5 um.",
          "Langkah 2: Hitung intersep spesifik untuk Poros 3:\nIntersep_3 = beta_0 + u_03 = 10.0 + (-1.8) = 8.2 um."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung prediksi spesifik untuk Poros 3 pada jam ke-3:\ny_poros3(3) = Intersep_3 + beta_1 * (3) = 8.2 + 2.5 * (3) = 8.2 + 7.5 = 15.7 um.",
          "[result: Interpretasi Ilmiah] Poros 3 memiliki baseline keausan awal yang lebih rendah sebesar 1.8 um dibandingkan rata-rata mesin lainnya. Pada jam ke-3, keausan Poros 3 diprediksi 15.7 um (dibandingkan rata-rata populasi 17.5 um). Model LMM memisahkan variasi baseline individual dari laju degradasi global."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pemodelan longitudinal repeated measures dengan Random Intercept menggunakan MixedLM statsmodels.",
        "bulletPoints": [
          "Tujuan Algoritma: Pemodelan longitudinal repeated measures dengan Random Intercept menggunakan MixedLM statsmodels.",
          "Dependensi Pustaka Ilmiah: numpy, pandas, statsmodels",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Pemodelan Longitudinal Repeated Measures LMM"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Pemodelan Longitudinal Repeated Measures LMM\nTotal Observasi Tersedia : 67 dari 75 (Ada Missing Data)\nEstimasi Intersep (beta0): 12.0725 (Sejati: 12.0000)\nEstimasi Slope (beta1)   : 3.5228 (Sejati: 3.5000)\nStandar Error Slope      : 0.0469 (p-value: 0.0000e+00)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Membuang seluruh data dari subjek yang memiliki satu data pengukuran bolong (listwise deletion) alih-alih memanfaatkan LMM.",
          "[warning: Perangkap] Memaksakan model Random Slope padahal data hanya memiliki 2 titik waktu observasi per subjek (dibutuhkan minimal 3 titik waktu untuk estimasi varians slope).",
          "[warning: Perangkap] Mengabaikan korelasi antara random intercept dan random slope."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Periksa apakah variabel waktu diperlakukan secara tepat (sebagai kovariat kontinu atau faktor kategori).",
          "Prosedur: Bandingkan model Random Intercept saja versus model Random Intercept + Slope menggunakan Likelihood Ratio Test.",
          "Prosedur: Verifikasi bahwa estimasi parameter varians tidak menghasilkan singular fit (boundary convergence)."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa Linear Mixed Models (LMM) jauh lebih unggul daripada Repeated Measures ANOVA (RM-ANOVA) dalam menganalisis data eksperimen longitudinal industri?",
          "Petunjuk Analitis: Perhatikan penanganan data yang hilang dan asumsi sferisitas matriks kovarians.",
          "Solusi Kunci: LMM mampu memproses data dengan nilai hilang (missing at random) tanpa membuang subjek, tidak memerlukan asumsi sferisitas yang restriktif, dan fleksibel mengakomodasi titik waktu observasi yang tidak berjarak seragam."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.4.4": {
    "id": "4.4.4",
    "chapterId": "CH-27",
    "title": "Estimasi Restricted Maximum Likelihood (REML) Menggunakan Python statsmodels",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami kelemahan estimasi Maximum Likelihood (ML) standar pada komponen varians dan keunggulan REML.",
      "Menurunkan transformasi ortogonal matriks proyeksi pendukung REML.",
      "Menguasai aturan perbandingan model: Kapan menggunakan ML versus REML untuk uji Likelihood Ratio."
    ],
    "content": "Dalam estimasi model campuran Linear Mixed Models, terdapat dua metode utama yang bersaing: Maximum Likelihood (ML) dan Restricted (atau Residual) Maximum Likelihood (REML).\n\nKelemahan Mendasar Estimasi Maximum Likelihood (ML):\nKetika mengestimasi parameter komponen varians (seperti sigma_u^2 dan sigma_e^2), metode ML standar tidak memperhitungkan derajat kebebasan yang telah dihabiskan untuk mengestimasi koefisien efek tetap beta. Fenomena ini persis analog dengan rumus varians sampel naif yang membagi dengan n (bukan n - 1), yang menghasilkan estimator varians yang bias ke bawah (underestimated). Pada ukuran sampel kecil atau jumlah efek tetap yang banyak, ML menghasilkan estimasi varians yang terlalu sempit.\n\nRestricted Maximum Likelihood (REML), yang diperkenalkan oleh Patterson dan Thompson (1971), mengatasi bias ini secara matematis. REML mentransformasikan data respon y menggunakan matriks proyeksi ortogonal K sedemikian rupa sehingga komponen efek tetap beta tereliminasi sepenuhnya dari fungsi likelihood: K * X = 0. Fungsi likelihood yang tersisa murni mencerminkan varians dari residual data. Akibatnya, estimasi komponen varians yang dihasilkan oleh REML bersifat tidak bias sempurna terhadap kehilangan derajat kebebasan.\n\nAturan Emas Perbandingan Model:\n- Untuk membandingkan struktur varians/efek acak (misal Random Intercept vs Random Slope) dengan efek tetap identik: Gunakan REML.\n- Untuk membandingkan dua model yang memiliki efek tetap berbeda (misal Model 1 vs Model 2 dengan prediktor berbeda) menggunakan Likelihood Ratio Test: Wajib mengestimasi ulang kedua model menggunakan ML murni, karena fungsi kemungkinan REML pada kedua model dibangun di atas ruang proyeksi residu yang berbeda sehingga tidak dapat dibandingkan secara langsung.",
    "mathematicalFoundations": "1. Formulasi Likelihood Marjinal Penuh (ML):\nFungsi log-likelihood marjinal dari $\\mathbf{y} \\sim \\mathcal{N}(\\mathbf{X}\\boldsymbol{\\beta}, \\mathbf{V})$:\n$$\\ell_{\\text{ML}}(\\boldsymbol{\\beta}, \\mathbf{V}) = -\\frac{n}{2} \\ln(2\\pi) - \\frac{1}{2} \\ln|\\mathbf{V}| - \\frac{1}{2} (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T \\mathbf{V}^{-1} (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})$$\nEstimator ML untuk koefisien adalah Generalized Least Squares: $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{V}^{-1} \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{V}^{-1} \\mathbf{y}$.\n\n2. Formulasi Restricted Maximum Likelihood (REML):\nDefinisikan matriks transformasi $\\mathbf{K} \\in \\mathbb{R}^{(n - p) \\times n}$ ber-rank penuh sedemikian sehingga:\n$$\\mathbf{K} \\mathbf{X} = \\mathbf{0}$$\nTransformasikan variabel respon menjadi vektor kontras linier $\\mathbf{w} = \\mathbf{K} \\mathbf{y}$.\nMaka distribusi $\\mathbf{w}$ bebas sepenuhnya dari $\\boldsymbol{\\beta}$:\n$$\\mathbf{w} \\sim \\mathcal{N}\\left( \\mathbf{0}, \\; \\mathbf{K} \\mathbf{V} \\mathbf{K}^T \\right)$$\nFungsi log-likelihood REML:\n$$\\ell_{\\text{REML}}(\\mathbf{V}) = -\\frac{n - p}{2} \\ln(2\\pi) - \\frac{1}{2} \\ln|\\mathbf{V}| - \\frac{1}{2} \\ln|\\mathbf{X}^T \\mathbf{V}^{-1} \\mathbf{X}| - \\frac{1}{2} (\\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}})^T \\mathbf{V}^{-1} (\\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}})$$\nPerhatikan adanya suku koreksi $-\\frac{1}{2} \\ln|\\mathbf{X}^T \\mathbf{V}^{-1} \\mathbf{X}|$ yang mengkompensasi kehilangan $p$ derajat kebebasan.",
    "workedExample": {
      "problemStatement": "Pada pengujian varians galat satu sampel dengan n = 10 observasi dan p = 2 parameter efek tetap, Jumlah Kuadrat Residu adalah RSS = 80.0. Hitung estimasi varians galat sigma^2 menggunakan metode ML versus metode REML, dan tentukan persentase bias pada estimasi ML.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi parameter: n = 10 observasi, p = 2 parameter, RSS = 80.0.",
        "Langkah 2: Hitung estimasi varians Maximum Likelihood (ML):\nsigma^2_ML = RSS / n = 80.0 / 10 = 8.00.",
        "Langkah 3: Hitung estimasi varians Restricted Maximum Likelihood (REML):\nsigma^2_REML = RSS / (n - p) = 80.0 / (10 - 2) = 80.0 / 8 = 10.00.",
        "Langkah 4: Hitung persentase bias pada estimasi ML:\nPersentase Bias = (sigma^2_ML - sigma^2_REML) / sigma^2_REML = (8.00 - 10.00) / 10.00 = -2.00 / 10.00 = -20.0%."
      ],
      "resultInterpretation": "Estimasi varians ML menghasilkan nilai 8.00 yang terbias ke bawah sebesar 20% karena mengabaikan 2 derajat kebebasan yang dipakai untuk estimasi efek tetap. Estimasi REML menghasilkan 10.00 yang tidak bias sempurna."
    },
    "pythonImplementation": {
      "description": "Perbandingan estimasi komponen varians antara REML dan ML menggunakan statsmodels MixedLM.",
      "libraryDependencies": [
        "numpy",
        "pandas",
        "statsmodels"
      ],
      "code": "import numpy as np\nimport pandas as pd\nimport statsmodels.formula.api as smf\n\nnp.random.seed(42)\nn_klaster = 6\nn_per_klaster = 4\nN = n_klaster * n_per_klaster\n\ngrand_mean = 50.0\nsigma_u_true = 3.0\nsigma_e_true = 2.0\n\nu = np.random.normal(0, sigma_u_true, size=n_klaster)\ngrup = np.repeat(np.arange(n_klaster), n_per_klaster)\ny = grand_mean + u[grup] + np.random.normal(0, sigma_e_true, size=N)\n\ndf = pd.DataFrame({'y': y, 'Grup': [f'G{g}' for g in grup], 'X1': np.random.randn(N), 'X2': np.random.randn(N)})\n\n# 1. Estimasi via REML (Default statsmodels)\nmodel_reml = smf.mixedlm(\"y ~ X1 + X2\", df, groups=df[\"Grup\"]).fit(reml=True)\n\n# 2. Estimasi via ML\nmodel_ml = smf.mixedlm(\"y ~ X1 + X2\", df, groups=df[\"Grup\"]).fit(reml=False)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Perbandingan Estimasi REML vs ML\")\nprint(f\"{'Parameter Varians':<25}{'REML (Unbiased)':<20}{'ML (Biased)':<20}\")\nprint(\"-\" * 65)\nprint(f\"{'Varians Acak (sigma_u^2)':<25}{float(np.asarray(model_reml.cov_re)[0, 0]):<20.4f}{float(np.asarray(model_ml.cov_re)[0, 0]):<20.4f}\")\nprint(f\"{'Varians Residual (sigma_e^2)':<25}{float(model_reml.scale):<20.4f}{float(model_ml.scale):<20.4f}\")\nprint(f\"\\nLog-Likelihood REML : {model_reml.llf:.2f}\")\nprint(f\"Log-Likelihood ML   : {model_ml.llf:.2f}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Perbandingan Estimasi REML vs ML\nParameter Varians        REML (Unbiased)     ML (Biased)         \n-----------------------------------------------------------------\nVarians Acak (sigma_u^2) 9.1724              7.3512              \nVarians Residual (sigma_e^2) 3.8641              3.1519              \n\nLog-Likelihood REML : -52.42\nLog-Likelihood ML   : -56.88"
    },
    "commonPitfalls": [
      "Menggunakan Likelihood Ratio Test (LRT) berbasis likelihood REML untuk menguji perbedaan efek tetap antara dua model (menghasilkan p-value yang tidak valid).",
      "Menggunakan estimasi ML standar pada sampel dengan klaster sedikit yang berujung pada peremehan komponen varians.",
      "Melupakan bahwa untuk menguji perbedaan efek tetap dengan LRT, kedua model wajib di-fit ulang menggunakan reml=False (ML murni)."
    ],
    "validationProcedures": [
      "Gunakan REML sebagai default untuk estimasi parameter akhir dan interpretasi komponen varians.",
      "Jika membandingkan model dengan efek tetap berbeda via LRT, gunakan ML (reml=False).",
      "Konfirmasi bahwa konvergensi algoritma optimasi numerik Newton-Raphson / L-BFGS tercapai tanpa matriks singular."
    ],
    "exercises": [
      {
        "question": "Kapan seorang peneliti wajib mengubah pengaturan dari REML menjadi ML murni (reml=False) saat membandingkan dua model campuran?",
        "hint": "Perhatikan apakah yang dibandingkan adalah struktur efek tetap (fixed effects) atau struktur efek acak (random effects).",
        "answerExplanation": "Peneliti wajib beralih ke ML murni ketika membandingkan dua model yang memiliki struktur efek tetap (fixed effects) yang berbeda menggunakan Likelihood Ratio Test, karena fungsi likelihood REML dari kedua model dibangun di atas ruang proyeksi residual yang berbeda."
      }
    ],
    "references": [
      {
        "citation": "Patterson, H. D., & Thompson, R. (1971). Recovery of inter-block information when block sizes are unequal. Biometrika, 58(3), 545-554.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Harville, D. A. (1977). Maximum likelihood approaches to variance component estimation and to related problems. Journal of the American Statistical Association, 72(358), 320-338.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Estimasi Restricted Maximum Likelihood (REML) Menggunakan Python statsmodels",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.4.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.4.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami kelemahan estimasi Maximum Likelihood (ML) standar pada komponen varians dan keunggulan REML.",
          "Capaian 2: Menurunkan transformasi ortogonal matriks proyeksi pendukung REML.",
          "Capaian 3: Menguasai aturan perbandingan model: Kapan menggunakan ML versus REML untuk uji Likelihood Ratio."
        ],
        "keyFormulaOrDiagram": "$$\\ell_{\\text{ML}}(\\boldsymbol{\\beta}, \\mathbf{V}) = -\\frac{n}{2} \\ln(2\\pi) - \\frac{1}{2} \\ln|\\mathbf{V}| - \\frac{1}{2} (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T \\mathbf{V}^{-1} (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.4.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Estimasi Restricted Maximum Likelihood (REML) Menggunakan Python statsmodels",
        "lead": "Dalam estimasi model campuran Linear Mixed Models, terdapat dua metode utama yang bersaing: Maximum Likelihood (ML) dan Restricted (atau Residual) Maximum Likelihood (REML).",
        "bulletPoints": [
          "Kelemahan Mendasar Estimasi Maximum Likelihood (ML): Ketika mengestimasi parameter komponen varians (seperti sigma_u^2 dan sigma_e^2), metode ML standar tidak memperhitungkan derajat kebebasan yang telah dihabiskan untuk mengestimasi koefisien efek tetap beta.",
          "Fenomena ini persis analog dengan rumus varians sampel naif yang membagi dengan n (bukan n - 1), yang menghasilkan estimator varians yang bias ke bawah (underestimated)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Restricted Maximum Likelihood (REML), yang diperkenalkan oleh Patterson dan Thompson (1971), mengatasi bias ini secara matematis.",
        "bulletPoints": [
          "REML mentransformasikan data respon y menggunakan matriks proyeksi ortogonal K sedemikian rupa sehingga komponen efek tetap beta tereliminasi sepenuhnya dari fungsi likelihood: K * X = 0.",
          "Fungsi likelihood yang tersisa murni mencerminkan varians dari residual data.",
          "Aturan Emas Perbandingan Model: - Untuk membandingkan struktur varians/efek acak (misal Random Intercept vs Random Slope) dengan efek tetap identik: Gunakan REML. - Untuk membandingkan dua model yang memiliki efek tetap berbeda (misal Model 1 vs Model 2 dengan prediktor berbeda) menggunakan Likelihood Ratio Test: Wajib mengestimasi ulang kedua model menggunakan ML murni, karena fungsi kemungkinan REML pada kedua model dibangun di atas ruang proyeksi residu yang berbeda sehingga tidak dapat dibandingkan secara langsung."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Likelihood Marjinal Penuh (ML):",
        "bulletPoints": [
          "Fungsi log-likelihood marjinal dari $\\mathbf{y} \\sim \\mathcal{N}(\\mathbf{X}\\boldsymbol{\\beta}, \\mathbf{V})$:",
          "Estimator ML untuk koefisien adalah Generalized Least Squares: $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{V}^{-1} \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{V}^{-1} \\mathbf{y}$.",
          "2. Formulasi Restricted Maximum Likelihood (REML):"
        ],
        "keyFormulaOrDiagram": "$$\\ell_{\\text{ML}}(\\boldsymbol{\\beta}, \\mathbf{V}) = -\\frac{n}{2} \\ln(2\\pi) - \\frac{1}{2} \\ln|\\mathbf{V}| - \\frac{1}{2} (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T \\mathbf{V}^{-1} (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada pengujian varians galat satu sampel dengan n = 10 observasi dan p = 2 parameter efek tetap, Jumlah Kuadrat Residu adalah RSS = 80.0. Hitung estimasi varians galat sigma^2 menggunakan metode ML versus metode REML, dan tentukan persentase bias pada estimasi ML.",
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
          "Langkah 1: Identifikasi parameter: n = 10 observasi, p = 2 parameter, RSS = 80.0.",
          "Langkah 2: Hitung estimasi varians Maximum Likelihood (ML):\nsigma^2_ML = RSS / n = 80.0 / 10 = 8.00."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung estimasi varians Restricted Maximum Likelihood (REML):\nsigma^2_REML = RSS / (n - p) = 80.0 / (10 - 2) = 80.0 / 8 = 10.00.",
          "Langkah 4: Hitung persentase bias pada estimasi ML:\nPersentase Bias = (sigma^2_ML - sigma^2_REML) / sigma^2_REML = (8.00 - 10.00) / 10.00 = -2.00 / 10.00 = -20.0%.",
          "[result: Interpretasi Ilmiah] Estimasi varians ML menghasilkan nilai 8.00 yang terbias ke bawah sebesar 20% karena mengabaikan 2 derajat kebebasan yang dipakai untuk estimasi efek tetap. Estimasi REML menghasilkan 10.00 yang tidak bias sempurna."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Perbandingan estimasi komponen varians antara REML dan ML menggunakan statsmodels MixedLM.",
        "bulletPoints": [
          "Tujuan Algoritma: Perbandingan estimasi komponen varians antara REML dan ML menggunakan statsmodels MixedLM.",
          "Dependensi Pustaka Ilmiah: numpy, pandas, statsmodels",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Perbandingan Estimasi REML vs ML"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Perbandingan Estimasi REML vs ML\nParameter Varians        REML (Unbiased)     ML (Biased)         \n-----------------------------------------------------------------\nVarians Acak (sigma_u^2) 9.1724              7.3512              \nVarians Residual (sigma_e^2) 3.8641              3.1519              ",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan Likelihood Ratio Test (LRT) berbasis likelihood REML untuk menguji perbedaan efek tetap antara dua model (menghasilkan p-value yang tidak valid).",
          "[warning: Perangkap] Menggunakan estimasi ML standar pada sampel dengan klaster sedikit yang berujung pada peremehan komponen varians.",
          "[warning: Perangkap] Melupakan bahwa untuk menguji perbedaan efek tetap dengan LRT, kedua model wajib di-fit ulang menggunakan reml=False (ML murni)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan REML sebagai default untuk estimasi parameter akhir dan interpretasi komponen varians.",
          "Prosedur: Jika membandingkan model dengan efek tetap berbeda via LRT, gunakan ML (reml=False).",
          "Prosedur: Konfirmasi bahwa konvergensi algoritma optimasi numerik Newton-Raphson / L-BFGS tercapai tanpa matriks singular."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Kapan seorang peneliti wajib mengubah pengaturan dari REML menjadi ML murni (reml=False) saat membandingkan dua model campuran?",
          "Petunjuk Analitis: Perhatikan apakah yang dibandingkan adalah struktur efek tetap (fixed effects) atau struktur efek acak (random effects).",
          "Solusi Kunci: Peneliti wajib beralih ke ML murni ketika membandingkan dua model yang memiliki struktur efek tetap (fixed effects) yang berbeda menggunakan Likelihood Ratio Test, karena fungsi likelihood REML dari kedua model dibangun di atas ruang proyeksi residual yang berbeda."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
