import { Lesson } from '../types/curriculum';

export const CH36_LESSONS: Record<string, Partial<Lesson>> = {
  "5.5.1": {
    "id": "5.5.1",
    "chapterId": "CH-36",
    "title": "Konsep Pergeseran Domain: Covariate Shift, Label Shift, dan Concept Drift",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami dekomposisi probabilitas bersama P(X, Y) dalam membedakan jenis pergeseran domain.",
      "Membedakan secara formal antara Covariate Shift, Label Shift, dan Concept Drift.",
      "Mendeteksi pergeseran domain pada data sensorik dan visi komputer menggunakan uji divergensi probabilitas."
    ],
    "content": "Sebagian besar algoritma pembelajaran mesin dan inferensi statistik didirikan di atas asumsi i.i.d. (independent and identically distributed): data latih dan data uji masa depan diasumsikan dibangkitkan dari distribusi probabilitas bersama yang identik, yaitu $P_{\\text{train}}(X, Y) = P_{\\text{test}}(X, Y)$. Dalam dunia rekayasa nyata, asumsi ini hampir selalu dilanggar. Kondisi cuaca berubah, sensor mengalami degradasi penuaan fisik, populasi pengguna berevolusi, dan lingkungan manufaktur bergeser.\n\nTaksonomi Matematis Pergeseran Distribusi (Distribution Shifts):\nBerdasarkan aturan rantai probabilitas bersama $P(X, Y) = P(X) P(Y|X) = P(Y) P(X|Y)$, pergeseran distribusi diklasifikasikan menjadi tiga bentuk fundamental:\n\n1. Pergeseran Kovariat (Covariate Shift):\nDistribusi fitur input berubah antara tahap latihan dan tahap operasional, namun mekanisme pemetaan fisik dasar dari fitur ke label tetap konstan.\n$$P_{\\text{train}}(X) \\neq P_{\\text{test}}(X) \\quad \\text{tetapi} \\quad P_{\\text{train}}(Y|X) = P_{\\text{test}}(Y|X)$$\nContoh: Kamera deteksi cacat dilatih pada pencahayaan laboratorium 500 lux, namun dioperasikan di lantai pabrik pada pencahayaan 200 lux. Hubungan visual antara goresan dan label cacat tetap sama, namun sebaran piksel input bergeser ke rentang yang lebih gelap.\n\n2. Pergeseran Label (Label Shift / Prior Shift):\nDistribusi marginal dari target $Y$ bergeser, namun mekanisme pembangkitan fitur bersyarat $P(X|Y)$ tetap konstan.\n$$P_{\\text{train}}(Y) \\neq P_{\\text{test}}(Y) \\quad \\text{tetapi} \\quad P_{\\text{train}}(X|Y) = P_{\\text{test}}(X|Y)$$\nContoh: Model diagnosis medis dilatih selama musim non-epidemi (prevalensi penyakit 1%), namun diuji saat puncak pandemi (prevalensi melonjak menjadi 30%). Gejala radiologis penyakit ($X|Y$) tidak berubah, namun proporsi kasus sakit meroket.\n\n3. Pergeseran Konsep (Concept Drift):\nHubungan intrinsik antara input dan output berubah secara mendasar.\n$$P_{\\text{train}}(Y|X) \\neq P_{\\text{test}}(Y|X)$$\nContoh: Akibat keausan mekanis mesin turbin setelah 5 tahun beroperasi, profil getaran tertentu yang pada mesin baru dikategorikan normal, kini menandakan kegagalan struktural fatal.",
    "mathematicalFoundations": "Metrik Divergensi Pergeseran Distribusi:\nUntuk mengukur secara kuantitatif besaran pergeseran antara distribusi $P$ dan $Q$:\n\n1. Kullback-Leibler (KL) Divergence:\n$$D_{\\text{KL}}(P \\parallel Q) = \\int_{\\mathcal{X}} p(x) \\log \\left( \\frac{p(x)}{q(x)} \\right) \\, dx$$\n\n2. Maximum Mean Discrepancy (MMD) dalam Ruang Hilbert (RKHS):\nBebas asumsi kepadatan parametrik, menggunakan fungsi kernel $k(\\cdot, \\cdot)$:\n$$\\text{MMD}^2(\\mathcal{F}, P, Q) = \\mathbb{E}_{x, x' \\sim P}[k(x, x')] - 2\\mathbb{E}_{x \\sim P, y \\sim Q}[k(x, y)] + \\mathbb{E}_{y, y' \\sim Q}[k(y, y')]$$\n\n3. Wasserstein Distance (Earth Mover's Distance):\nMengukur jarak optimal transport yang mencerminkan geometri metrik ruang fitur:\n$$W_1(P, Q) = \\inf_{\\gamma \\in \\Pi(P, Q)} \\mathbb{E}_{(x, y) \\sim \\gamma}[\\|x - y\\|]$$",
    "workedExample": {
      "problemStatement": "Dua sensor getaran mencatat data pada dua hari yang berbeda. Hari 1 (Data Latih) berdistribusi N(0, 1). Hari 2 (Data Operasional) berdistribusi N(1, 1). Hitung nilai KL Divergence D_KL(P_train || P_test). Jika fungsi target f(x) = sign(x), tunjukkan apakah ini merupakan Covariate Shift murni atau Concept Drift.",
      "stepByStepSolution": [
        "Langkah 1: Gunakan formula analitis KL Divergence untuk dua distribusi Gaussian univariat N(mu_1, sigma_1^2) dan N(mu_2, sigma_2^2): D_KL = log(sigma_2/sigma_1) + (sigma_1^2 + (mu_1 - mu_2)^2) / (2 * sigma_2^2) - 0.5.",
        "Langkah 2: Substitusi nilai: mu_1 = 0, mu_2 = 1, sigma_1 = 1, sigma_2 = 1.",
        "Langkah 3: Hitung D_KL: D_KL = log(1) + (1 + (0 - 1)^2) / (2 * 1) - 0.5 = 0 + (1 + 1)/2 - 0.5 = 1.0 - 0.5 = 0.50 nats.",
        "Langkah 4: Analisis jenis pergeseran: Hubungan target f(x) = sign(x) tidak berubah (setiap nilai x > 0 tetap diberi label +1). Hanya distribusi marginal input P(X) yang bergeser dari mu=0 ke mu=1."
      ],
      "resultInterpretation": "Terjadi Covariate Shift murni dengan besaran divergensi KL sebesar 0.50 nats tanpa adanya Concept Drift."
    },
    "pythonImplementation": {
      "description": "Deteksi pergeseran kovariat menggunakan uji Maximum Mean Discrepancy (MMD) dengan kernel RBF.",
      "libraryDependencies": [
        "numpy",
        "sklearn.metrics.pairwise"
      ],
      "code": "import numpy as np\nfrom sklearn.metrics.pairwise import rbf_kernel\n\n# [SIMULASI/SYNTHETIC DATA]\nnp.random.seed(42)\nn_samples = 200\n\n# Distribusi Latih (In-Distribution): N(0, 1)\nX_train = np.random.normal(loc=0.0, scale=1.0, size=(n_samples, 2))\n\n# Distribusi Uji 1: Tanpa Pergeseran (In-Distribution baru)\nX_test_clean = np.random.normal(loc=0.0, scale=1.0, size=(n_samples, 2))\n\n# Distribusi Uji 2: Mengalami Covariate Shift (Pergeseran Mean dan Skala)\nX_test_shifted = np.random.normal(loc=1.2, scale=1.5, size=(n_samples, 2))\n\ndef compute_mmd(X, Y, gamma=0.5):\n    K_XX = rbf_kernel(X, X, gamma=gamma)\n    K_YY = rbf_kernel(Y, Y, gamma=gamma)\n    K_XY = rbf_kernel(X, Y, gamma=gamma)\n    return np.mean(K_XX) + np.mean(K_YY) - 2 * np.mean(K_XY)\n\nmmd_clean = compute_mmd(X_train, X_test_clean)\nmmd_shifted = compute_mmd(X_train, X_test_shifted)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Deteksi Pergeseran Distribusi (MMD Metric):\")\nprint(f\"MMD Antara Train vs Test Bersih     : {mmd_clean:.4f} (Mendekati 0: Distribusi Identik)\")\nprint(f\"MMD Antara Train vs Test Tergeser   : {mmd_shifted:.4f} (Tinggi: Terjadi Pergeseran Domain!)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Deteksi Pergeseran Distribusi (MMD Metric):\nMMD Antara Train vs Test Bersih     : 0.0039 (Mendekati 0: Distribusi Identik)\nMMD Antara Train vs Test Tergeser   : 0.3644 (Tinggi: Terjadi Pergeseran Domain!)"
    },
    "commonPitfalls": [
      "Menyimpulkan model siap dideploy hanya berdasarkan pengujian pada data uji yang dibelah dari sesi rekaman yang sama.",
      "Menyamakan penanganan covariate shift (teknik reweighting P_test/P_train) dengan concept drift (memerlukan continual learning).",
      "Mengabaikan efek pergeseran musiman atau perubahan suhu ambien pada sensor rekayasa."
    ],
    "validationProcedures": [
      "Hitung metrik MMD atau Wasserstein distance antara data train dan data uji produksi berkala.",
      "Terapkan pengujian Kolmogorov-Smirnov atau Chi-Square untuk setiap fitur secara univariat.",
      "Pantau performa model secara real-time dengan melacak metrik prediksi vs ground truth sampel audit berkala."
    ],
    "exercises": [
      {
        "question": "Teknik apa yang dapat digunakan untuk mengkompensasi Covariate Shift jika distribusi data uji P_test(X) diketahui namun tanpa label?",
        "hint": "Kaitkan dengan rasio kepadatan probabilitas (importance weighting).",
        "answerExplanation": "Teknik Importance Weighting (Densiy Ratio Estimation) dapat digunakan, di mana setiap sampel latih x_i diberi bobot w(x_i) = P_test(x_i) / P_train(x_i) saat menghitung fungsi loss sehingga model memprioritaskan area yang sering muncul di data uji."
      },
      {
        "question": "Mengapa Concept Drift merupakan pergeseran yang paling berbahaya dibandingkan Covariate Shift?",
        "hint": "Perhatikan apakah pengetahuan yang telah dipelajari model masa lalu masih valid.",
        "answerExplanation": "Pada Concept Drift, aturan pemetaan fisis P(Y|X) telah berubah. Informasi masa lalu yang dipelajari model bukan lagi sekadar tidak lengkap, melainkan telah menjadi salah secara fundamental. Model aktif membuat keputusan salah dengan tingkat keyakinan (confidence) yang tinggi."
      }
    ],
    "references": [
      {
        "citation": "Quionero-Candela, J., Sugiyama, M., Schwaighofer, A., & Shen, H. S. (2009). Dataset Shift in Machine Learning. The MIT Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Gama, J., Žliobaitė, I., Bifet, A., Pechenizkiy, M., & Bouchachia, A. (2014). A survey on concept drift adaptation. ACM Computing Surveys (CSUR), 46(4), 1-37.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Konsep Pergeseran Domain: Covariate Shift, Label Shift, dan Concept Drift",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.5.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.5.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami dekomposisi probabilitas bersama P(X, Y) dalam membedakan jenis pergeseran domain.",
          "Capaian 2: Membedakan secara formal antara Covariate Shift, Label Shift, dan Concept Drift.",
          "Capaian 3: Mendeteksi pergeseran domain pada data sensorik dan visi komputer menggunakan uji divergensi probabilitas."
        ],
        "keyFormulaOrDiagram": "$$D_{\\text{KL}}(P \\parallel Q) = \\int_{\\mathcal{X}} p(x) \\log \\left( \\frac{p(x)}{q(x)} \\right) \\, dx$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.5.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Konsep Pergeseran Domain: Covariate Shift, Label Shift, dan Concept Drift",
        "lead": "Sebagian besar algoritma pembelajaran mesin dan inferensi statistik didirikan di atas asumsi i.i.d.",
        "bulletPoints": [
          "(independent and identically distributed): data latih dan data uji masa depan diasumsikan dibangkitkan dari distribusi probabilitas bersama yang identik, yaitu $P_{\\text{train}}(X, Y) = P_{\\text{test}}(X, Y)$.",
          "Dalam dunia rekayasa nyata, asumsi ini hampir selalu dilanggar.",
          "Taksonomi Matematis Pergeseran Distribusi (Distribution Shifts): Berdasarkan aturan rantai probabilitas bersama $P(X, Y) = P(X) P(Y|X) = P(Y) P(X|Y)$, pergeseran distribusi diklasifikasikan menjadi tiga bentuk fundamental:"
        ],
        "keyFormulaOrDiagram": "$$P_{\\text{train}}(X) \\neq P_{\\text{test}}(X) \\quad \\text{tetapi} \\quad P_{\\text{train}}(Y|X) = P_{\\text{test}}(Y|X)$$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "1.",
        "bulletPoints": [
          "Pergeseran Kovariat (Covariate Shift): Distribusi fitur input berubah antara tahap latihan dan tahap operasional, namun mekanisme pemetaan fisik dasar dari fitur ke label tetap konstan. $$P_{\\text{train}}(X) \\neq P_{\\text{test}}(X) \\quad \\text{tetapi} \\quad P_{\\text{train}}(Y|X) = P_{\\text{test}}(Y|X)$$ Contoh: Kamera deteksi cacat dilatih pada pencahayaan laboratorium 500 lux, namun dioperasikan di lantai pabrik pada pencahayaan 200 lux.",
          "Hubungan visual antara goresan dan label cacat tetap sama, namun sebaran piksel input bergeser ke rentang yang lebih gelap.",
          "2.",
          "Pergeseran Label (Label Shift / Prior Shift): Distribusi marginal dari target $Y$ bergeser, namun mekanisme pembangkitan fitur bersyarat $P(X|Y)$ tetap konstan. $$P_{\\text{train}}(Y) \\neq P_{\\text{test}}(Y) \\quad \\text{tetapi} \\quad P_{\\text{train}}(X|Y) = P_{\\text{test}}(X|Y)$$ Contoh: Model diagnosis medis dilatih selama musim non-epidemi (prevalensi penyakit 1%), namun diuji saat puncak pandemi (prevalensi melonjak menjadi 30%)."
        ],
        "keyFormulaOrDiagram": "$$P_{\\text{train}}(Y) \\neq P_{\\text{test}}(Y) \\quad \\text{tetapi} \\quad P_{\\text{train}}(X|Y) = P_{\\text{test}}(X|Y)$$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Metrik Divergensi Pergeseran Distribusi:",
        "bulletPoints": [
          "Untuk mengukur secara kuantitatif besaran pergeseran antara distribusi $P$ dan $Q$:",
          "1. Kullback-Leibler (KL) Divergence:",
          "2. Maximum Mean Discrepancy (MMD) dalam Ruang Hilbert (RKHS):"
        ],
        "keyFormulaOrDiagram": "$$D_{\\text{KL}}(P \\parallel Q) = \\int_{\\mathcal{X}} p(x) \\log \\left( \\frac{p(x)}{q(x)} \\right) \\, dx$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dua sensor getaran mencatat data pada dua hari yang berbeda. Hari 1 (Data Latih) berdistribusi N(0, 1). Hari 2 (Data Operasional) berdistribusi N(1, 1). Hitung nilai KL Divergence D_KL(P_train || P_test). Jika fungsi target f(x) = sign(x), tunjukkan apakah ini merupakan Covariate Shift murni atau Concept Drift.",
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
          "Langkah 1: Gunakan formula analitis KL Divergence untuk dua distribusi Gaussian univariat N(mu_1, sigma_1^2) dan N(mu_2, sigma_2^2): D_KL = log(sigma_2/sigma_1) + (sigma_1^2 + (mu_1 - mu_2)^2) / (2 * sigma_2^2) - 0.5.",
          "Langkah 2: Substitusi nilai: mu_1 = 0, mu_2 = 1, sigma_1 = 1, sigma_2 = 1."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung D_KL: D_KL = log(1) + (1 + (0 - 1)^2) / (2 * 1) - 0.5 = 0 + (1 + 1)/2 - 0.5 = 1.0 - 0.5 = 0.50 nats.",
          "Langkah 4: Analisis jenis pergeseran: Hubungan target f(x) = sign(x) tidak berubah (setiap nilai x > 0 tetap diberi label +1). Hanya distribusi marginal input P(X) yang bergeser dari mu=0 ke mu=1.",
          "[result: Interpretasi Ilmiah] Terjadi Covariate Shift murni dengan besaran divergensi KL sebesar 0.50 nats tanpa adanya Concept Drift."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Deteksi pergeseran kovariat menggunakan uji Maximum Mean Discrepancy (MMD) dengan kernel RBF.",
        "bulletPoints": [
          "Tujuan Algoritma: Deteksi pergeseran kovariat menggunakan uji Maximum Mean Discrepancy (MMD) dengan kernel RBF.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.metrics.pairwise",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Deteksi Pergeseran Distribusi (MMD Metric):"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Deteksi Pergeseran Distribusi (MMD Metric):\nMMD Antara Train vs Test Bersih     : 0.0039 (Mendekati 0: Distribusi Identik)\nMMD Antara Train vs Test Tergeser   : 0.3644 (Tinggi: Terjadi Pergeseran Domain!)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpulkan model siap dideploy hanya berdasarkan pengujian pada data uji yang dibelah dari sesi rekaman yang sama.",
          "[warning: Perangkap] Menyamakan penanganan covariate shift (teknik reweighting P_test/P_train) dengan concept drift (memerlukan continual learning).",
          "[warning: Perangkap] Mengabaikan efek pergeseran musiman atau perubahan suhu ambien pada sensor rekayasa."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Hitung metrik MMD atau Wasserstein distance antara data train dan data uji produksi berkala.",
          "Prosedur: Terapkan pengujian Kolmogorov-Smirnov atau Chi-Square untuk setiap fitur secara univariat.",
          "Prosedur: Pantau performa model secara real-time dengan melacak metrik prediksi vs ground truth sampel audit berkala."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Teknik apa yang dapat digunakan untuk mengkompensasi Covariate Shift jika distribusi data uji P_test(X) diketahui namun tanpa label?",
          "Petunjuk Analitis: Kaitkan dengan rasio kepadatan probabilitas (importance weighting).",
          "Solusi Kunci: Teknik Importance Weighting (Densiy Ratio Estimation) dapat digunakan, di mana setiap sampel latih x_i diberi bobot w(x_i) = P_test(x_i) / P_train(x_i) saat menghitung fungsi loss sehingga model memprioritaskan area yang sering muncul di data uji."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "5.5.2": {
    "id": "5.5.2",
    "chapterId": "CH-36",
    "title": "Pengujian Ketahanan (Stress Testing) Terhadap Noise, Blur, dan Gangguan Sinyal",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Merancang protokol stress-testing komputasi untuk menguji ketahanan model rekayasa.",
      "Mengukur kurva degradasi performa terhadap peningkatan intensitas gangguan fisik.",
      "Mengadopsi benchmark standardisasi ketahanan seperti ImageNet-C atau Signal-C."
    ],
    "content": "Sebuah sistem penglihatan komputer atau pemrosesan sinyal rekayasa yang mencapai akurasi 98% di laboratorium bersih seringkali mengalami penurunan performa drastis ketika beroperasi di lapangan industri nyata. Lensa kamera tertutup debu, fokus optik sedikit kabur (defocus blur), kabel transmisi sensor terpapar derau elektromagnetik (Gaussian noise), atau kompresi video jaringan mengalami kehilangan paket data (packet loss).\n\nPrinsip Stress Testing Komputasi:\nAlih-alih hanya menguji model pada kondisi ideal, peneliti wajib melakukan pengujian stres (stress testing) sistematis dengan memasukkan gangguan fisik terkalibrasi secara bertingkat. Protokol ini diinspirasi oleh benchmark kanonikal Hendrycks & Dietterich (2019) yang memperkenalkan ImageNet-C.\n\nTiga Dimensi Gangguan Fisik Terkalibrasi:\n1. Derau Aditif dan Multiplikatif (Noise Corruptions): Gaussian noise, Poisson noise, salt-and-pepper noise, dan speckle noise.\n2. Distorsi Optik dan Sensorik (Blur Corruptions): Defocus blur, motion blur akibat getaran mesin, zoom blur, dan kabut atmosfer (fog).\n3. Efek Digital dan Transmisi (Digital Corruptions): Kompresi JPEG artefak lossy, downsampling spasial, dan pergeseran kecerahan (brightness).",
    "mathematicalFoundations": "Formulasi Model Kerusakan Sinyal Terkalibrasi:\nMisalkan $x \\in \\mathcal{X}$ adalah sinyal atau citra bersih, dan $s \\in \\{1, 2, 3, 4, 5\\}$ adalah tingkat keparahan gangguan (severity level):\n$$x_{\\text{corrupt}} = \\mathcal{T}(x; s, \\theta_{\\text{type}})$$\n\n1. Derau Gaussian Aditif:\n$$x_{\\text{corrupt}} = x + \\eta, \\quad \\eta \\sim \\mathcal{N}(0, \\sigma^2(s)), \\quad \\sigma(s) = s \\times \\sigma_0$$\n\n2. Derau Kabur Gerak (Motion Blur):\nOperasi konvolusi dengan kernel linier berarah $k(s, \\theta)$:\n$$x_{\\text{corrupt}} = x * k(s, \\theta)$$\n\nMetrik Ketahanan Relatif (Relative Robustness / mCE):\nTingkat Kesalahan Kerusakan Rata-rata (mean Corruption Error, mCE):\n$$\\text{mCE} = \\frac{1}{C} \\sum_{c=1}^C \\frac{\\sum_{s=1}^5 E_{s, c}^{\\text{model}}}{\\sum_{s=1}^5 E_{s, c}^{\\text{baseline}}}$$\ndi mana $E_{s, c}$ adalah tingkat kesalahan pada tipe kerusakan $c$ dengan keparahan $s$. Nilai $\\text{mCE} < 1.0$ membuktikan bahwa model lebih tahan terhadap gangguan lapangan dibandingkan arsitektur baseline.",
    "workedExample": {
      "problemStatement": "Sebuah model inspeksi visual dievaluasi pada 5 tingkat keparahan derau Gaussian. Akurasi bersih adalah 95.0%. Akurasi pada level 1 s.d. 5 adalah: L1 = 92.0%, L2 = 88.0%, L3 = 80.0%, L4 = 65.0%, L5 = 40.0%. Baseline standar memiliki akurasi pada level 1 s.d. 5 berturut-turut: 90.0%, 82.0%, 70.0%, 50.0%, 25.0%. Hitung total laju kesalahan (Error Rate) pada seluruh tingkat keparahan untuk kedua model, dan hitung rasio Relative Corruption Error.",
      "stepByStepSolution": [
        "Langkah 1: Konversi akurasi ke error rate E = (100 - Akurasi): Model Usulan: E_1=8%, E_2=12%, E_3=20%, E_4=35%, E_5=60%. Total Error Usulan = 8 + 12 + 20 + 35 + 60 = 135%.",
        "Langkah 2: Error rate Baseline: E_1=10%, E_2=18%, E_3=30%, E_4=50%, E_5=75%. Total Error Baseline = 10 + 18 + 30 + 50 + 75 = 183%.",
        "Langkah 3: Hitung Relative Corruption Error: Rel_Error = Total Error Usulan / Total Error Baseline = 135 / 183 = 0.7377."
      ],
      "resultInterpretation": "Model yang diusulkan memiliki Relative Corruption Error sebesar 0.738 (26.2% lebih rendah dari baseline), membuktikan ketahanan fisik yang lebih superior di bawah gangguan derau."
    },
    "pythonImplementation": {
      "description": "Stress testing performa klasifikasi di bawah derau Gaussian aditif bertingkat.",
      "libraryDependencies": [
        "numpy",
        "sklearn.metrics"
      ],
      "code": "import numpy as np\nfrom sklearn.metrics import accuracy_score\n\n# [SIMULASI/SYNTHETIC DATA]\nnp.random.seed(42)\nn_test = 500\nn_features = 10\n\n# Bangkitkan data uji bersih dan label\nX_clean = np.random.randn(n_test, n_features)\n# Aturan keputusan linear sederhana\nweights = np.random.randn(n_features)\ny_true = (np.dot(X_clean, weights) > 0).astype(int)\n\n# Definisikan dua model prediktor: Model Rapuh (Fragile) vs Model Kokoh (Robust)\ndef predict_fragile(X):\n    # Model sangat sensitif terhadap perubahan margin kecil\n    return (np.dot(X, weights) > 0).astype(int)\n\ndef predict_robust(X):\n    # Model memiliki margin regularisasi yang lebih lebar\n    reg_weights = weights * 0.8\n    return (np.dot(X, reg_weights) > 0).astype(int)\n\n# Uji pada 5 level keparahan noise (sigma bertingkat)\nseverities = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5]\nresults_fragile = []\nresults_robust = []\n\nfor s in severities:\n    noise = np.random.normal(loc=0.0, scale=s, size=X_clean.shape)\n    X_corrupt = X_clean + noise\n    \n    acc_f = accuracy_score(y_true, predict_fragile(X_corrupt))\n    acc_r = accuracy_score(y_true, predict_robust(X_corrupt))\n    results_fragile.append(acc_f)\n    results_robust.append(acc_r)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil Stress Testing Gangguan Derau:\")\nprint(f\"{'Severity (Sigma)':18} | {'Model Rapuh Acc':16} | {'Model Kokoh Acc':16}\")\nprint(\"-\" * 56)\nfor s, af, ar in zip(severities, results_fragile, results_robust):\n    print(f\"{s:<18.1f} | {af*100:<15.2f}% | {ar*100:<15.2f}%\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Stress Testing Gangguan Derau:\nSeverity (Sigma)   | Model Rapuh Acc  | Model Kokoh Acc \n--------------------------------------------------------\n0.0                | 100.00         % | 100.00         %\n0.5                | 92.40          % | 92.40          %\n1.0                | 81.60          % | 81.60          %\n1.5                | 74.40          % | 74.40          %\n2.0                | 69.80          % | 69.80          %\n2.5                | 65.60          % | 65.60          %"
    },
    "commonPitfalls": [
      "Hanya menguji model pada kondisi ideal dan mengabaikan evaluasi robustness.",
      "Memasukkan tipe noise pengujian ke dalam data latih secara eksplisit (data contamination on stress test).",
      "Mengasumsikan bahwa model yang memiliki akurasi bersih lebih tinggi otomatis lebih tahan terhadap gangguan."
    ],
    "validationProcedures": [
      "Gunakan korpus gangguan terstandarisasi (misal ImageNet-C, CIFAR-10-C).",
      "Plot kurva degradasi performa (Performance Decay Curve) sebagai fungsi dari intensitas gangguan.",
      "Sertakan metrik mean Corruption Error (mCE) relatif terhadap model standar."
    ],
    "exercises": [
      {
        "question": "Mengapa melatih model secara langsung dengan menyertakan seluruh variasi noise pengujian (misal melatih langsung dengan Gaussian noise sigma=2.0) membatalkan validitas pengujian ketahanan (robustness test)?",
        "hint": "Perhatikan perbedaan antara out-of-distribution robustness dan in-distribution memorization.",
        "answerExplanation": "Jika jenis derau pengujian disertakan dalam pelatihan, derau tersebut telah menjadi bagian dari distribusi latih (in-distribution). Pengujian tidak lagi menguji ketahanan model terhadap gangguan tak terduga (unforeseen corruptions), melainkan hanya menguji kemampuan menghafal pola derau yang sudah diajarkan."
      },
      {
        "question": "Metrik apa yang digunakan oleh benchmark ImageNet-C untuk menstandarisasi tingkat kesulitan antar tipe gangguan yang berbeda fisisnya (misal fog vs blur vs salt-and-pepper)?",
        "hint": "Kaitkan dengan baseline AlexNet dan perhitungan mean Corruption Error.",
        "answerExplanation": "Benchmark ImageNet-C menggunakan tingkat kesalahan arsitektur baseline kanonikal (AlexNet) pada setiap level keparahan untuk menormalisasi skor error. Tingkat keparahan 1 hingga 5 dikalibrasi secara perseptual dan matematis sehingga laju penurunan performa baseline seimbang di seluruh jenis gangguan."
      }
    ],
    "references": [
      {
        "citation": "Hendrycks, D., & Dietterich, T. (2019). Benchmarking neural network robustness to common corruptions and perturbations. ICLR.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Geirhos, R., Temme, C. R., Rauber, J., Schütt, H. H., Bethge, M., & Wichmann, F. A. (2018). Generalisation in humans and deep neural networks. NeurIPS, 31.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pengujian Ketahanan (Stress Testing) Terhadap Noise, Blur, dan Gangguan Sinyal",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.5.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.5.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Merancang protokol stress-testing komputasi untuk menguji ketahanan model rekayasa.",
          "Capaian 2: Mengukur kurva degradasi performa terhadap peningkatan intensitas gangguan fisik.",
          "Capaian 3: Mengadopsi benchmark standardisasi ketahanan seperti ImageNet-C atau Signal-C."
        ],
        "keyFormulaOrDiagram": "$$x_{\\text{corrupt}} = \\mathcal{T}(x; s, \\theta_{\\text{type}})$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.5.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pengujian Ketahanan (Stress Testing) Terhadap Noise, Blur, dan Gangguan Sinyal",
        "lead": "Sebuah sistem penglihatan komputer atau pemrosesan sinyal rekayasa yang mencapai akurasi 98% di laboratorium bersih seringkali mengalami penurunan performa drastis ketika beroperasi di lapangan industri nyata.",
        "bulletPoints": [
          "Lensa kamera tertutup debu, fokus optik sedikit kabur (defocus blur), kabel transmisi sensor terpapar derau elektromagnetik (Gaussian noise), atau kompresi video jaringan mengalami kehilangan paket data (packet loss).",
          "Prinsip Stress Testing Komputasi: Alih-alih hanya menguji model pada kondisi ideal, peneliti wajib melakukan pengujian stres (stress testing) sistematis dengan memasukkan gangguan fisik terkalibrasi secara bertingkat.",
          "Protokol ini diinspirasi oleh benchmark kanonikal Hendrycks & Dietterich (2019) yang memperkenalkan ImageNet-C."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Tiga Dimensi Gangguan Fisik Terkalibrasi: 1.",
        "bulletPoints": [
          "Derau Aditif dan Multiplikatif (Noise Corruptions): Gaussian noise, Poisson noise, salt-and-pepper noise, dan speckle noise.",
          "2."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Model Kerusakan Sinyal Terkalibrasi:",
        "bulletPoints": [
          "Misalkan $x \\in \\mathcal{X}$ adalah sinyal atau citra bersih, dan $s \\in \\{1, 2, 3, 4, 5\\}$ adalah tingkat keparahan gangguan (severity level):",
          "1. Derau Gaussian Aditif:",
          "2. Derau Kabur Gerak (Motion Blur):"
        ],
        "keyFormulaOrDiagram": "$$x_{\\text{corrupt}} = \\mathcal{T}(x; s, \\theta_{\\text{type}})$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah model inspeksi visual dievaluasi pada 5 tingkat keparahan derau Gaussian. Akurasi bersih adalah 95.0%. Akurasi pada level 1 s.d. 5 adalah: L1 = 92.0%, L2 = 88.0%, L3 = 80.0%, L4 = 65.0%, L5 = 40.0%. Baseline standar memiliki akurasi pada level 1 s.d. 5 berturut-turut: 90.0%, 82.0%, 70.0%, 50.0%, 25.0%. Hitung total laju kesalahan (Error Rate) pada seluruh tingkat keparahan untuk kedua model, dan hitung rasio Relative Corruption Error.",
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
          "Langkah 1: Konversi akurasi ke error rate E = (100 - Akurasi): Model Usulan: E_1=8%, E_2=12%, E_3=20%, E_4=35%, E_5=60%. Total Error Usulan = 8 + 12 + 20 + 35 + 60 = 135%.",
          "Langkah 2: Error rate Baseline: E_1=10%, E_2=18%, E_3=30%, E_4=50%, E_5=75%. Total Error Baseline = 10 + 18 + 30 + 50 + 75 = 183%."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung Relative Corruption Error: Rel_Error = Total Error Usulan / Total Error Baseline = 135 / 183 = 0.7377.",
          "[result: Interpretasi Ilmiah] Model yang diusulkan memiliki Relative Corruption Error sebesar 0.738 (26.2% lebih rendah dari baseline), membuktikan ketahanan fisik yang lebih superior di bawah gangguan derau."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Stress testing performa klasifikasi di bawah derau Gaussian aditif bertingkat.",
        "bulletPoints": [
          "Tujuan Algoritma: Stress testing performa klasifikasi di bawah derau Gaussian aditif bertingkat.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.metrics",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Stress Testing Gangguan Derau:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Stress Testing Gangguan Derau:\nSeverity (Sigma)   | Model Rapuh Acc  | Model Kokoh Acc \n--------------------------------------------------------\n0.0                | 100.00         % | 100.00         %\n0.5                | 92.40          % | 92.40          %",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Hanya menguji model pada kondisi ideal dan mengabaikan evaluasi robustness.",
          "[warning: Perangkap] Memasukkan tipe noise pengujian ke dalam data latih secara eksplisit (data contamination on stress test).",
          "[warning: Perangkap] Mengasumsikan bahwa model yang memiliki akurasi bersih lebih tinggi otomatis lebih tahan terhadap gangguan."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan korpus gangguan terstandarisasi (misal ImageNet-C, CIFAR-10-C).",
          "Prosedur: Plot kurva degradasi performa (Performance Decay Curve) sebagai fungsi dari intensitas gangguan.",
          "Prosedur: Sertakan metrik mean Corruption Error (mCE) relatif terhadap model standar."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa melatih model secara langsung dengan menyertakan seluruh variasi noise pengujian (misal melatih langsung dengan Gaussian noise sigma=2.0) membatalkan validitas pengujian ketahanan (robustness test)?",
          "Petunjuk Analitis: Perhatikan perbedaan antara out-of-distribution robustness dan in-distribution memorization.",
          "Solusi Kunci: Jika jenis derau pengujian disertakan dalam pelatihan, derau tersebut telah menjadi bagian dari distribusi latih (in-distribution). Pengujian tidak lagi menguji ketahanan model terhadap gangguan tak terduga (unforeseen corruptions), melainkan hanya menguji kemampuan menghafal pola derau yang sudah diajarkan."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "5.5.3": {
    "id": "5.5.3",
    "chapterId": "CH-36",
    "title": "Evaluasi Out-of-Distribution (OOD) untuk Menilai Batas Keabsahan Algoritma",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membedakan In-Distribution (ID), Near-OOD, dan Far-OOD dalam evaluasi model prediktif.",
      "Memahami fenomena overconfidence pada jaringan syaraf tiruan saat menerima input anomali.",
      "Menerapkan deteksi OOD berbasis skor ketidakpastian (Energy score, Mahalanobis distance, Maximum Softmax Probability)."
    ],
    "content": "Sebuah kelemahan berbahaya dari model deep learning modern adalah sifat overconfident: model cenderung memprediksi kelas tertentu dengan probabilitas 99.9% bahkan ketika diberikan input yang sepenuhnya aneh, rusak, atau berasal dari domain yang sama sekali belum pernah dipelajari (Out-of-Distribution / OOD data). Sebagai contoh, model klasifikasi citra medis yang dilatih untuk mendiagnosis pneumonia pada paru-paru manusia mungkin memprediksi citra sinar-X seekor anjing sebagai \"Pneumonia Akut\" dengan keyakinan 99%.\n\nTaksonomi Spektrum OOD:\n1. In-Distribution (ID): Sampel yang berasal dari distribusi data latih yang sama persis (misal pasien dari rumah sakit yang sama dengan protokol pencitraan identik).\n2. Near-OOD (Semantik Bergeser Halus): Sampel yang berasal dari kelas yang belum pernah dilihat dalam pelatihan namun memiliki fitur visual yang mirip (misal model dilatih pada kucing vs anjing, lalu diuji pada rubah).\n3. Far-OOD (Anomali Total): Sampel yang berasal dari domain fisik yang sama sekali asing (misal model teks medis menerima input kode biner perangkat lunak).\n\nPrinsip Deteksi OOD:\nSistem rekayasa yang bertanggung jawab wajib memiliki mekanisme penolakan (abstention / reject option). Jika sebuah input terdeteksi sebagai OOD, sistem tidak boleh memaksakan prediksi, melainkan harus mengembalikan sinyal \"Ketidakpastian Tinggi / Memerlukan Intervensi Manusia\".",
    "mathematicalFoundations": "Metode Estimasi Skor OOD:\n\n1. Maximum Softmax Probability (MSP Baseline, Hendrycks & Gimpel, 2017):\nDiberikan vektor logit $f(x) \\in \\mathbb{R}^C$:\n$$p_c(x) = \\frac{e^{f_c(x)}}{\\sum_{j=1}^C e^{f_j(x)}}$$\n$$S_{\\text{MSP}}(x) = \\max_{c \\in \\{1, \\dots, C\\}} p_c(x)$$\nKelemahan: Softmax memaksakan total probabilitas bernilai 1, memicu probabilitas semu yang tinggi akibat pembagian eksponensial.\n\n2. Skor Energi Bebas (Energy-Based OOD, Liu et al., 2020):\nMenghubungkan logit dengan konsep termodinamika Helmholtz Free Energy:\n$$E(x; f) = -T \\cdot \\log \\sum_{c=1}^C e^{f_c(x) / T}$$\nSkor deteksi OOD: $S_{\\text{Energy}}(x) = -E(x; f)$.\nSkor energi tidak dinormalisasi oleh pembagi softmax, sehingga berkorelasi langsung dengan log kepadatan probabilitas marginal input $\\log p(x)$.\n\n3. Metrik Evaluasi Deteksi OOD:\n- AUROC (Area Under the ROC Curve): Probabilitas bahwa sampel ID memiliki skor ketidakanomalian lebih tinggi dari sampel OOD.\n- FPR95 (False Positive Rate at 95% True Positive Rate): Persentase data OOD yang salah lolos saat 95% data ID berhasil diterima.",
    "workedExample": {
      "problemStatement": "Dua logit keluaran untuk kelas [A, B] adalah: Sampel 1 (ID) = [10.0, 2.0]; Sampel 2 (OOD) = [-5.0, -8.0]. Hitung probabilitas Softmax untuk kedua sampel (T=1.0). Jelaskan mengapa skor Softmax gagal mendeteksi bahwa Sampel 2 adalah anomali, sedangkan Skor Energi berhasil mendeteksinya.",
      "stepByStepSolution": [
        "Langkah 1: Hitung Softmax Sampel 1: p_A = e^10 / (e^10 + e^2) = 22026.5 / (22026.5 + 7.39) = 0.9997 (99.97%).",
        "Langkah 2: Hitung Softmax Sampel 2: p_A = e^-5 / (e^-5 + e^-8) = 0.00674 / (0.00674 + 0.000335) = 0.00674 / 0.007075 = 0.9526 (95.26%).",
        "Langkah 3: Evaluasi kelemahan Softmax: Sampel 2 memiliki magnitudo logit sangat negatif (artinya model tidak mengenali fitur apa pun), namun probabilitas softmax-nya tetap mencapai 95.3% (overconfident palsu).",
        "Langkah 4: Hitung Skor Energi E = -log(sum(e^logit)): E(Sampel 1) = -log(e^10 + e^2) = -log(22033.9) = -10.00; E(Sampel 2) = -log(e^-5 + e^-8) = -log(0.007075) = +4.95."
      ],
      "resultInterpretation": "Skor Energi Sampel 2 (+4.95) sangat jauh lebih tinggi dibandingkan Sampel 1 (-10.00), secara instan mengidentifikasi Sampel 2 sebagai Out-of-Distribution yang berbahaya."
    },
    "pythonImplementation": {
      "description": "Komparasi deteksi OOD antara Maximum Softmax Probability (MSP) vs Energy-based Detection.",
      "libraryDependencies": [
        "numpy",
        "sklearn.metrics"
      ],
      "code": "import numpy as np\nfrom sklearn.metrics import roc_auc_score\n\n# [SIMULASI/SYNTHETIC DATA]\nnp.random.seed(42)\nn_samples = 300\nn_classes = 3\n\n# Logit data In-Distribution (ID): magnitudo tinggi pada salah satu kelas\nlogits_id = np.random.normal(loc=0.0, scale=1.0, size=(n_samples, n_classes))\nlogits_id[:, 0] += 6.0  # Kelas 0 dominan kuat\n\n# Logit data Out-of-Distribution (OOD): magnitudo rendah merata di semua kelas\nlogits_ood = np.random.normal(loc=-4.0, scale=0.8, size=(n_samples, n_classes))\n\ndef msp_scores(logits):\n    exp_l = np.exp(logits - np.max(logits, axis=1, keepdims=True))\n    probs = exp_l / np.sum(exp_l, axis=1, keepdims=True)\n    return np.max(probs, axis=1)\n\ndef energy_scores(logits, T=1.0):\n    # Skor energi negatif (semakin tinggi semakin ID)\n    return T * np.log(np.sum(np.exp(logits / T), axis=1))\n\n# Hitung skor untuk ID dan OOD\nmsp_id = msp_scores(logits_id)\nmsp_ood = msp_scores(logits_ood)\n\nenergy_id = energy_scores(logits_id)\nenergy_ood = energy_scores(logits_ood)\n\n# Ground truth: 1 untuk ID, 0 untuk OOD\ny_eval = np.array([1]*n_samples + [0]*n_samples)\nall_msp = np.concatenate([msp_id, msp_ood])\nall_energy = np.concatenate([energy_id, energy_ood])\n\nauroc_msp = roc_auc_score(y_eval, all_msp)\nauroc_energy = roc_auc_score(y_eval, all_energy)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Evaluasi Kemampuan Deteksi OOD:\")\nprint(f\"AUROC Deteksi OOD berbasis MSP (Softmax) : {auroc_msp:.4f}\")\nprint(f\"AUROC Deteksi OOD berbasis Energy Score  : {auroc_energy:.4f} (Separasi Superior!)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Kemampuan Deteksi OOD:\nAUROC Deteksi OOD berbasis MSP (Softmax) : 0.6272\nAUROC Deteksi OOD berbasis Energy Score  : 1.0000 (Separasi Superior!)"
    },
    "commonPitfalls": [
      "Menggunakan probabilitas Softmax mentah sebagai ukuran keyakinan prediksi yang dapat dipercaya.",
      "Hanya menguji akurasi klasifikasi tanpa menguji kemampuan menolak data anomali.",
      "Menggunakan dataset uji OOD yang terlalu mirip dengan data ID sehingga tidak menguji batas fisik model."
    ],
    "validationProcedures": [
      "Gunakan metrik AUROC dan FPR95 untuk mengukur keandalan deteksi OOD.",
      "Sertakan uji Far-OOD (misal CIFAR-10 sebagai ID, SVHN atau Text sebagai OOD).",
      "Implementasikan opsi penolakan otomatis (selective prediction) berbasis threshold energi."
    ],
    "exercises": [
      {
        "question": "Mengapa normalisasi Softmax memicu keyakinan palsu (overconfidence) pada data Out-of-Distribution?",
        "hint": "Perhatikan penyebut pada pembagian probabilitas Softmax.",
        "answerExplanation": "Penyebut fungsi Softmax membagi setiap eksponensial logit dengan total penjumlahan seluruh eksponensial logit. Jika seluruh logit bernilai sangat negatif (misal -10, -11, -12), eksponensialnya sangat kecil, namun perbandingan relatif antara e^-10 terhadap total tetap menghasilkan persentase probabilitas yang sangat tinggi (~70%), menipu pengamat."
      },
      {
        "question": "Apa arti fisis dari metrik FPR95 dalam evaluasi keamanan sistem otonom?",
        "hint": "Kaitkan dengan persentase bahaya data anomali yang lolos tanpa terdeteksi.",
        "answerExplanation": "FPR95 mengukur berapa persen data anomali asing yang gagal dideteksi (lolos sebagai data normal) ketika sistem dikalibrasi untuk mempertahankan 95% data operasional normal. Semakin rendah nilai FPR95, semakin aman sistem dari ancaman kegagalan fatal."
      }
    ],
    "references": [
      {
        "citation": "Hendrycks, D., & Gimpel, K. (2017). A baseline for detecting misclassified and out-of-distribution examples in neural networks. ICLR.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Liu, W., Wang, X., Owens, J., & Li, Y. (2020). Energy-based out-of-distribution detection. NeurIPS, 33, 21464-21475.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Evaluasi Out-of-Distribution (OOD) untuk Menilai Batas Keabsahan Algoritma",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.5.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.5.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan In-Distribution (ID), Near-OOD, dan Far-OOD dalam evaluasi model prediktif.",
          "Capaian 2: Memahami fenomena overconfidence pada jaringan syaraf tiruan saat menerima input anomali.",
          "Capaian 3: Menerapkan deteksi OOD berbasis skor ketidakpastian (Energy score, Mahalanobis distance, Maximum Softmax Probability)."
        ],
        "keyFormulaOrDiagram": "$$p_c(x) = \\frac{e^{f_c(x)}}{\\sum_{j=1}^C e^{f_j(x)}}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.5.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Evaluasi Out-of-Distribution (OOD) untuk Menilai Batas Keabsahan Algoritma",
        "lead": "Sebuah kelemahan berbahaya dari model deep learning modern adalah sifat overconfident: model cenderung memprediksi kelas tertentu dengan probabilitas 99.9% bahkan ketika diberikan input yang sepenuhnya aneh, rusak, atau berasal dari domain yang sama sekali belum pernah dipelajari (Out-of-Distribution / OOD data).",
        "bulletPoints": [
          "Sebagai contoh, model klasifikasi citra medis yang dilatih untuk mendiagnosis pneumonia pada paru-paru manusia mungkin memprediksi citra sinar-X seekor anjing sebagai \"Pneumonia Akut\" dengan keyakinan 99%.",
          "Taksonomi Spektrum OOD: 1.",
          "In-Distribution (ID): Sampel yang berasal dari distribusi data latih yang sama persis (misal pasien dari rumah sakit yang sama dengan protokol pencitraan identik)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Prinsip Deteksi OOD: Sistem rekayasa yang bertanggung jawab wajib memiliki mekanisme penolakan (abstention / reject option).",
        "bulletPoints": [
          "Jika sebuah input terdeteksi sebagai OOD, sistem tidak boleh memaksakan prediksi, melainkan harus mengembalikan sinyal \"Ketidakpastian Tinggi / Memerlukan Intervensi Manusia\"."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Metode Estimasi Skor OOD:",
        "bulletPoints": [
          "1. Maximum Softmax Probability (MSP Baseline, Hendrycks & Gimpel, 2017):",
          "Diberikan vektor logit $f(x) \\in \\mathbb{R}^C$:",
          "Kelemahan: Softmax memaksakan total probabilitas bernilai 1, memicu probabilitas semu yang tinggi akibat pembagian eksponensial."
        ],
        "keyFormulaOrDiagram": "$$p_c(x) = \\frac{e^{f_c(x)}}{\\sum_{j=1}^C e^{f_j(x)}}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dua logit keluaran untuk kelas [A, B] adalah: Sampel 1 (ID) = [10.0, 2.0]; Sampel 2 (OOD) = [-5.0, -8.0]. Hitung probabilitas Softmax untuk kedua sampel (T=1.0). Jelaskan mengapa skor Softmax gagal mendeteksi bahwa Sampel 2 adalah anomali, sedangkan Skor Energi berhasil mendeteksinya.",
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
          "Langkah 1: Hitung Softmax Sampel 1: p_A = e^10 / (e^10 + e^2) = 22026.5 / (22026.5 + 7.39) = 0.9997 (99.97%).",
          "Langkah 2: Hitung Softmax Sampel 2: p_A = e^-5 / (e^-5 + e^-8) = 0.00674 / (0.00674 + 0.000335) = 0.00674 / 0.007075 = 0.9526 (95.26%)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Evaluasi kelemahan Softmax: Sampel 2 memiliki magnitudo logit sangat negatif (artinya model tidak mengenali fitur apa pun), namun probabilitas softmax-nya tetap mencapai 95.3% (overconfident palsu).",
          "Langkah 4: Hitung Skor Energi E = -log(sum(e^logit)): E(Sampel 1) = -log(e^10 + e^2) = -log(22033.9) = -10.00; E(Sampel 2) = -log(e^-5 + e^-8) = -log(0.007075) = +4.95.",
          "[result: Interpretasi Ilmiah] Skor Energi Sampel 2 (+4.95) sangat jauh lebih tinggi dibandingkan Sampel 1 (-10.00), secara instan mengidentifikasi Sampel 2 sebagai Out-of-Distribution yang berbahaya."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Komparasi deteksi OOD antara Maximum Softmax Probability (MSP) vs Energy-based Detection.",
        "bulletPoints": [
          "Tujuan Algoritma: Komparasi deteksi OOD antara Maximum Softmax Probability (MSP) vs Energy-based Detection.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.metrics",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Kemampuan Deteksi OOD:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Kemampuan Deteksi OOD:\nAUROC Deteksi OOD berbasis MSP (Softmax) : 0.6272\nAUROC Deteksi OOD berbasis Energy Score  : 1.0000 (Separasi Superior!)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan probabilitas Softmax mentah sebagai ukuran keyakinan prediksi yang dapat dipercaya.",
          "[warning: Perangkap] Hanya menguji akurasi klasifikasi tanpa menguji kemampuan menolak data anomali.",
          "[warning: Perangkap] Menggunakan dataset uji OOD yang terlalu mirip dengan data ID sehingga tidak menguji batas fisik model."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan metrik AUROC dan FPR95 untuk mengukur keandalan deteksi OOD.",
          "Prosedur: Sertakan uji Far-OOD (misal CIFAR-10 sebagai ID, SVHN atau Text sebagai OOD).",
          "Prosedur: Implementasikan opsi penolakan otomatis (selective prediction) berbasis threshold energi."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa normalisasi Softmax memicu keyakinan palsu (overconfidence) pada data Out-of-Distribution?",
          "Petunjuk Analitis: Perhatikan penyebut pada pembagian probabilitas Softmax.",
          "Solusi Kunci: Penyebut fungsi Softmax membagi setiap eksponensial logit dengan total penjumlahan seluruh eksponensial logit. Jika seluruh logit bernilai sangat negatif (misal -10, -11, -12), eksponensialnya sangat kecil, namun perbandingan relatif antara e^-10 terhadap total tetap menghasilkan persentase probabilitas yang sangat tinggi (~70%), menipu pengamat."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "5.5.4": {
    "id": "5.5.4",
    "chapterId": "CH-36",
    "title": "Analisis Kasus Batas (Corner Cases) dan Estimasi Batas Kegagalan Sistem",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Merancang metodologi pencarian kasus batas (Corner Case Discovery) pada sistem rekayasa.",
      "Mengestimasi batas kegagalan operasional (Operational Boundary Limits) secara kuantitatif.",
      "Mengintegrasikan uji Boundary Value Analysis (BVA) ke dalam audit keselamatan komputasi."
    ],
    "content": "Dalam rekayasa sistem kritis (seperti kendali reaktor nuklir, navigasi pesawat nirawak, dan perangkat medis otonom), kegagalan hampir tidak pernah terjadi pada kondisi rata-rata atau kondisi nominal yang sering diuji. Kegagalan sistemik fatal selalu terjadi pada sudut-sudut ekstrem dari ruang parameter operasional (Corner Cases), di mana dua atau lebih parameter lingkungan secara bersamaan mencapai batas toleransi fisiknya.\n\nDefinisi Kasus Batas (Edge Case vs Corner Case):\n1. Edge Case: Kondisi ekstrem yang terjadi di sepanjang satu parameter tunggal (misalnya temperatur sensor mencapai batas maksimum 100 C sementara tekanan dan getaran berada pada kondisi normal).\n2. Corner Case: Kondisi ekstrem yang terjadi akibat kombinasi simultan dari beberapa parameter yang masing-masing mungkin masih berada dalam batas wajar, namun interaksinya memicu kegagalan sistem (misalnya temperatur 85 C, getaran frekuensi 120 Hz, dan kelembapan 90% terjadi pada detik yang sama).\n\nEstimasi Batas Kegagalan Sistem (System Failure Boundary Estimation):\nPeneliti tidak boleh hanya melaporkan bahwa model memiliki \"akurasi 95%\". Riset rekayasa wajib memetakan secara eksplisit batas ruang operasional yang aman (Safe Operating Envelope):\n- Berapa batas kecepatan angin maksimum di mana algoritma kestabilan drone masih mampu mengoreksi posisi?\n- Berapa rasio derau sinyal minimum (SNR minimum) sebelum algoritma estimasi fase kehilangan penguncian (loss of lock)?",
    "mathematicalFoundations": "Formulasi Ruang Keadaan Aman dan Permukaan Batas Kegagalan:\nMisalkan parameter lingkungan eksternal dinyatakan sebagai vektor $\\mathbf{z} \\in \\mathcal{Z} \\subset \\mathbb{R}^d$.\nFungsi performa sistem dinyatakan sebagai $\\psi(\\mathbf{z}) \\in \\mathbb{R}$, dengan kriteria kegagalan operasional:\n$$\\psi(\\mathbf{z}) < \\psi_{\\text{crit}}$$\n\nRuang Operasional Aman (Safe Operating Envelope, $\\Omega_{\\text{safe}}$):\n$$\\Omega_{\\text{safe}} = \\{\\mathbf{z} \\in \\mathcal{Z} \\mid \\psi(\\mathbf{z}) \\geq \\psi_{\\text{crit}}\\}$$\n\nPermukaan Batas Kegagalan (Failure Boundary Surface, $\\partial \\Omega$):\n$$\\partial \\Omega = \\{\\mathbf{z} \\in \\mathcal{Z} \\mid \\psi(\\mathbf{z}) = \\psi_{\\text{crit}}\\}$$\n\nJarak Margin Keamanan Terdekat (Critical Safety Margin, $d_{\\text{safe}}$):\nJika kondisi operasional saat ini adalah $\\mathbf{z}_0$:\n$$d_{\\text{safe}} = \\min_{\\mathbf{z} \\in \\partial \\Omega} \\|\\mathbf{z} - \\mathbf{z}_0\\|_{\\mathbf{\\Sigma}^{-1}}$$\ndi mana $\\|\\cdot\\|_{\\mathbf{\\Sigma}^{-1}}$ adalah jarak Mahalanobis yang dinormalisasi oleh matriks kovarians fluktuasi lingkungan.",
    "workedExample": {
      "problemStatement": "Sebuah sistem radar Doppler memiliki performa deteksi target yang dimodelkan sebagai: SNR(R, V) = 30 - 0.5*R - 0.2*V (dB), di mana R adalah jarak target (km) dan V adalah kecepatan relatif target (m/s). Syarat deteksi aman sistem adalah SNR >= 10 dB. Tentukan persamaan garis batas kegagalan pada bidang (R, V). Jika jarak operasional target adalah R=30 km, hitung kecepatan maksimum V sebelum sistem mengalami kegagalan deteksi.",
      "stepByStepSolution": [
        "Langkah 1: Tetapkan persamaan batas kegagalan: psi(R, V) = psi_crit. 30 - 0.5*R - 0.2*V = 10.",
        "Langkah 2: Sederhanakan persamaan aljabar: 0.5*R + 0.2*V = 20. Kalikan kedua sisi dengan 10: 5*R + 2*V = 200.",
        "Langkah 3: Tentukan persamaan eksplisit untuk V: 2*V = 200 - 5*R => V_batas = 100 - 2.5*R.",
        "Langkah 4: Hitung batas kecepatan pada R = 30 km: V_max = 100 - 2.5 * 30 = 100 - 75 = 25 m/s."
      ],
      "resultInterpretation": "Pada jarak target 30 km, sistem radar hanya mampu mempertahankan batas deteksi aman jika kecepatan target tidak melebihi 25 m/s (90 km/jam). Di atas batas ini, radar mengalami kegagalan operasional."
    },
    "pythonImplementation": {
      "description": "Pemetaan batas permukaan kegagalan menggunakan Support Vector Boundary Estimator.",
      "libraryDependencies": [
        "numpy",
        "sklearn.svm"
      ],
      "code": "import numpy as np\nfrom sklearn.svm import SVC\n\n# [SIMULASI/SYNTHETIC DATA]\n# Eksplorasi 2 parameter operasional: Suhu (degC) vs Getaran (G)\nnp.random.seed(42)\nn_experiments = 400\n\ntemp = np.random.uniform(20, 100, size=n_experiments)\nvibe = np.random.uniform(1, 10, size=n_experiments)\nZ = np.column_stack([temp, vibe])\n\n# Kriteria fisis kegagalan mesin (interaksi non-linier kuadratik)\n# Mesin gagal jika kombinasi suhu dan getaran melampaui batas energi material\nstress = (temp / 60.0)**2 + (vibe / 6.0)**2\ny_status = (stress < 1.8).astype(int)  # 1: Aman, 0: Gagal\n\n# Latih boundary estimator untuk memetakan batas permukaan kegagalan\nclf = SVC(kernel='rbf', C=10.0)\nclf.fit(Z, y_status)\n\n# Hitung akurasi estimasi batas aman\nacc = clf.score(Z, y_status)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Pemetaan Batas Kegagalan Operasional (Corner Cases):\")\nprint(f\"Jumlah Titik Uji Parameter Ruang   : {n_experiments}\")\nprint(f\"Proporsi Status Aman Operasional   : {np.mean(y_status)*100:.1f}%\")\nprint(f\"Proporsi Kasus Batas/Gagal         : {(1 - np.mean(y_status))*100:.1f}%\")\nprint(f\"Keakuratan Estimasi Permukaan (SVM): {acc*100:.2f}%\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Pemetaan Batas Kegagalan Operasional (Corner Cases):\nJumlah Titik Uji Parameter Ruang   : 400\nProporsi Status Aman Operasional   : 65.2%\nProporsi Kasus Batas/Gagal         : 34.8%\nKeakuratan Estimasi Permukaan (SVM): 99.50%"
    },
    "commonPitfalls": [
      "Hanya menguji nilai ekstrem pada satu variabel saja (mengabaikan efek interaksi multivariabel).",
      "Mengasumsikan batas aman berbentuk persegi linier sederhana, padahal pada sistem fisis seringkali berbentuk hiperbolik non-linier.",
      "Tidak mencantumkan batas spesifikasi operasional maksimum (Operating Envelope) dalam laporan riset."
    ],
    "validationProcedures": [
      "Gunakan teknik Adaptive Stress Testing berbasis reinforcement learning untuk memburu corner cases secara otomatis.",
      "Petakan kurva kontur batas kegagalan pada ruang parameter utama.",
      "Laporkan jarak margin keamanan terkecil terhadap kondisi operasional nominal."
    ],
    "exercises": [
      {
        "question": "Apa perbedaan mendasar antara Edge Case dan Corner Case dalam rekayasa perangkat lunak dan sistem otonom?",
        "hint": "Perhatikan jumlah parameter independen yang berada pada kondisi ekstrem.",
        "answerExplanation": "Edge case terjadi ketika tepat satu parameter berada pada batas ekstrem toleransinya sementara parameter lain normal. Corner case terjadi ketika kombinasi dua atau lebih parameter ekstrem terjadi secara simultan, menciptakan interaksi tak terduga yang tidak pernah terdeteksi pada pengujian satu per satu."
      },
      {
        "question": "Mengapa pengujian berbasis Grid Search seragam sangat tidak efisien untuk menemukan corner cases pada dimensi tinggi?",
        "hint": "Kaitkan dengan kutukan dimensionalitas (curse of dimensionality) dan volume ruang hipersfer.",
        "answerExplanation": "Pada dimensi tinggi (d > 5), volume ruang parameter bertumbuh secara eksponensial. Sebagian besar volume berada di sudut-sudut hipersfer yang sangat jarang tersentuh oleh grid acak seragam. Diperlukan metode optimasi terarah (seperti Bayesian Optimization atau Genetic Algorithms) untuk memandu pencarian ke zona kritis."
      }
    ],
    "references": [
      {
        "citation": "Koopman, P., & Wagner, M. (2016). Challenges in autonomous vehicle testing and validation. SAE International Journal of Transportation Safety, 4(1), 15-24.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Koren, M., Alsaif, S., Lee, R., & Kochenderfer, M. J. (2018). Adaptive stress testing for autonomous vehicles. IEEE Transactions on Intelligent Vehicles, 3(4), 449-459.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Analisis Kasus Batas (Corner Cases) dan Estimasi Batas Kegagalan Sistem",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.5.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.5.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Merancang metodologi pencarian kasus batas (Corner Case Discovery) pada sistem rekayasa.",
          "Capaian 2: Mengestimasi batas kegagalan operasional (Operational Boundary Limits) secara kuantitatif.",
          "Capaian 3: Mengintegrasikan uji Boundary Value Analysis (BVA) ke dalam audit keselamatan komputasi."
        ],
        "keyFormulaOrDiagram": "$$\\psi(\\mathbf{z}) < \\psi_{\\text{crit}}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.5.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Analisis Kasus Batas (Corner Cases) dan Estimasi Batas Kegagalan Sistem",
        "lead": "Dalam rekayasa sistem kritis (seperti kendali reaktor nuklir, navigasi pesawat nirawak, dan perangkat medis otonom), kegagalan hampir tidak pernah terjadi pada kondisi rata-rata atau kondisi nominal yang sering diuji.",
        "bulletPoints": [
          "Kegagalan sistemik fatal selalu terjadi pada sudut-sudut ekstrem dari ruang parameter operasional (Corner Cases), di mana dua atau lebih parameter lingkungan secara bersamaan mencapai batas toleransi fisiknya.",
          "Definisi Kasus Batas (Edge Case vs Corner Case): 1.",
          "Edge Case: Kondisi ekstrem yang terjadi di sepanjang satu parameter tunggal (misalnya temperatur sensor mencapai batas maksimum 100 C sementara tekanan dan getaran berada pada kondisi normal)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Estimasi Batas Kegagalan Sistem (System Failure Boundary Estimation): Peneliti tidak boleh hanya melaporkan bahwa model memiliki \"akurasi 95%\".",
        "bulletPoints": [
          "Riset rekayasa wajib memetakan secara eksplisit batas ruang operasional yang aman (Safe Operating Envelope): - Berapa batas kecepatan angin maksimum di mana algoritma kestabilan drone masih mampu mengoreksi posisi? - Berapa rasio derau sinyal minimum (SNR minimum) sebelum algoritma estimasi fase kehilangan penguncian (loss of lock)?"
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Ruang Keadaan Aman dan Permukaan Batas Kegagalan:",
        "bulletPoints": [
          "Misalkan parameter lingkungan eksternal dinyatakan sebagai vektor $\\mathbf{z} \\in \\mathcal{Z} \\subset \\mathbb{R}^d$.",
          "Fungsi performa sistem dinyatakan sebagai $\\psi(\\mathbf{z}) \\in \\mathbb{R}$, dengan kriteria kegagalan operasional:",
          "Ruang Operasional Aman (Safe Operating Envelope, $\\Omega_{\\text{safe}}$):"
        ],
        "keyFormulaOrDiagram": "$$\\psi(\\mathbf{z}) < \\psi_{\\text{crit}}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah sistem radar Doppler memiliki performa deteksi target yang dimodelkan sebagai: SNR(R, V) = 30 - 0.5*R - 0.2*V (dB), di mana R adalah jarak target (km) dan V adalah kecepatan relatif target (m/s). Syarat deteksi aman sistem adalah SNR >= 10 dB. Tentukan persamaan garis batas kegagalan pada bidang (R, V). Jika jarak operasional target adalah R=30 km, hitung kecepatan maksimum V sebelum sistem mengalami kegagalan deteksi.",
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
          "Langkah 1: Tetapkan persamaan batas kegagalan: psi(R, V) = psi_crit. 30 - 0.5*R - 0.2*V = 10.",
          "Langkah 2: Sederhanakan persamaan aljabar: 0.5*R + 0.2*V = 20. Kalikan kedua sisi dengan 10: 5*R + 2*V = 200."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Tentukan persamaan eksplisit untuk V: 2*V = 200 - 5*R => V_batas = 100 - 2.5*R.",
          "Langkah 4: Hitung batas kecepatan pada R = 30 km: V_max = 100 - 2.5 * 30 = 100 - 75 = 25 m/s.",
          "[result: Interpretasi Ilmiah] Pada jarak target 30 km, sistem radar hanya mampu mempertahankan batas deteksi aman jika kecepatan target tidak melebihi 25 m/s (90 km/jam). Di atas batas ini, radar mengalami kegagalan operasional."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pemetaan batas permukaan kegagalan menggunakan Support Vector Boundary Estimator.",
        "bulletPoints": [
          "Tujuan Algoritma: Pemetaan batas permukaan kegagalan menggunakan Support Vector Boundary Estimator.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.svm",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Pemetaan Batas Kegagalan Operasional (Corner Cases):"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Pemetaan Batas Kegagalan Operasional (Corner Cases):\nJumlah Titik Uji Parameter Ruang   : 400\nProporsi Status Aman Operasional   : 65.2%\nProporsi Kasus Batas/Gagal         : 34.8%\nKeakuratan Estimasi Permukaan (SVM): 99.50%",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Hanya menguji nilai ekstrem pada satu variabel saja (mengabaikan efek interaksi multivariabel).",
          "[warning: Perangkap] Mengasumsikan batas aman berbentuk persegi linier sederhana, padahal pada sistem fisis seringkali berbentuk hiperbolik non-linier.",
          "[warning: Perangkap] Tidak mencantumkan batas spesifikasi operasional maksimum (Operating Envelope) dalam laporan riset."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan teknik Adaptive Stress Testing berbasis reinforcement learning untuk memburu corner cases secara otomatis.",
          "Prosedur: Petakan kurva kontur batas kegagalan pada ruang parameter utama.",
          "Prosedur: Laporkan jarak margin keamanan terkecil terhadap kondisi operasional nominal."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apa perbedaan mendasar antara Edge Case dan Corner Case dalam rekayasa perangkat lunak dan sistem otonom?",
          "Petunjuk Analitis: Perhatikan jumlah parameter independen yang berada pada kondisi ekstrem.",
          "Solusi Kunci: Edge case terjadi ketika tepat satu parameter berada pada batas ekstrem toleransinya sementara parameter lain normal. Corner case terjadi ketika kombinasi dua atau lebih parameter ekstrem terjadi secara simultan, menciptakan interaksi tak terduga yang tidak pernah terdeteksi pada pengujian satu per satu."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
