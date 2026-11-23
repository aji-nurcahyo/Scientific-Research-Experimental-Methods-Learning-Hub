import { Lesson } from '../types/curriculum';

export const CH32_LESSONS: Record<string, Partial<Lesson>> = {
  "5.1.1": {
    "id": "5.1.1",
    "chapterId": "CH-32",
    "title": "Taksonomi Kebocoran Data (Data Leakage): Fitur, Temporal, dan Sampel Berulang",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Mengidentifikasi taksonomi kebocoran data dalam pemodelan prediktif rekayasa.",
      "Membedakan kebocoran fitur (feature leakage), kebocoran temporal, dan duplikasi sampel (patient/device leakage).",
      "Menganalisis dampak optimisme semu (false optimism) terhadap reliabilitas deployment model."
    ],
    "content": "Kebocoran data (data leakage) adalah kesalahan metodologis paling merusak dalam komputasi rekayasa dan pembelajaran mesin. Kebocoran terjadi ketika informasi dari luar himpunan data latih (khususnya informasi dari target evaluasi masa depan atau data uji) secara tidak sengaja masuk ke dalam proses estimasi atau pembentukan representasi model. Akibatnya, model menunjukkan performa evaluasi yang luar biasa tinggi pada tahap pengujian internal, namun mengalami keruntuhan total saat diuji pada lingkungan operasional riil.\n\nTaksonomi Kebocoran Data:\n1. Kebocoran Fitur (Feature Leakage):\nTerjadi ketika sebuah variabel prediktor secara langsung mencerminkan variabel target atau merupakan konsekuensi dari kejadian target. Contoh: memasukkan durasi rawat inap pasien sebagai fitur dalam model yang memprediksi apakah pasien akan dirawat di ICU, padahal durasi hanya diketahui setelah seluruh proses perawatan selesai.\n\n2. Kebocoran Temporal (Temporal Leakage):\nTerjadi pada data runtun waktu atau proses dinamis ketika observasi dari masa depan (t + k) digunakan untuk memprediksi kondisi pada saat ini (t). Pengacakan acak murni (random shuffle) pada data sensor runtun waktu menghancurkan autokorelasi alami dan memasukkan kebocoran temporal secara sistematis.\n\n3. Kebocoran Sampel Berulang atau Pengelompokan (Subject/Device Leakage):\nTerjadi ketika observasi berganda dari satu entitas fisik (misalnya subjek pasien, turbin tertentu, atau sensor tertentu) tersebar di data latih dan data uji secara bersamaan. Model tidak mempelajari pola fisika umum, melainkan hanya menghafal karakteristik unik sensor individual tersebut.",
    "mathematicalFoundations": "Pemisahan Partisi Formal Bebas Kontaminasi:\nMisalkan $D = \\{(x_i, y_i, t_i, g_i)\\}_{i=1}^N$ adalah dataset dengan $x_i$ sebagai fitur, $y_i$ sebagai target, $t_i$ sebagai stempel waktu, dan $g_i$ sebagai pengenal grup (subjek/perangkat).\n\nPartisi data latih $D_{\\text{train}}$ dan data uji $D_{\\text{test}}$ wajib memenuhi tiga invarian ortogonal:\n\n1. Invarian Sampel:\n$$D_{\\text{train}} \\cap D_{\\text{test}} = \\emptyset$$\n\n2. Invarian Temporal (untuk data deret waktu):\n$$\\max_{i \\in D_{\\text{train}}} t_i < \\min_{j \\in D_{\\text{test}}} t_j$$\n\n3. Invarian Grup/Subjek (untuk data clustered):\n$$\\{g_i \\mid i \\in D_{\\text{train}}\\} \\cap \\{g_j \\mid j \\in D_{\\text{test}}\\} = \\emptyset$$\n\nJika salah satu invarian ini dilanggar, estimasi risiko empiris $\\hat{R}_{\\text{test}}(f)$ akan bias ke bawah secara asimtotik:\n$$\\mathbb{E}[\\hat{R}_{\\text{test}}(f)] < R_{\\text{true}}(f)$$",
    "workedExample": {
      "problemStatement": "Sebuah dataset getaran bantalan mekanik memiliki 10.000 jendela waktu yang diambil dari 10 bantalan uji (1.000 jendela per bantalan). Seorang peneliti mengacak seluruh 10.000 baris dan membaginya 80:20 menjadi train dan test. Model mencapai akurasi 99.2%. Namun pada turbin baru di industri, akurasi anjlok menjadi 61.4%. Jelaskan secara matematis letak kebocoran data tersebut.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi grup fisik: Grup g terdiri dari 10 ID bantalan.",
        "Langkah 2: Evaluasi pengacakan seragam (Uniform random split): Dengan mengacak 10.000 jendela, probabilitas jendela dari bantalan yang sama masuk ke train dan test mendekati 100%. Rata-rata 800 jendela dari Bantalan 1 ada di train, dan 200 jendela dari Bantalan 1 ada di test.",
        "Langkah 3: Analisis representasi fitur: Ciri-ciri spesifik mikroskopis Bantalan 1 (frekuensi harmonik spesifik cacat manufakturnya) dihafalkan oleh model.",
        "Langkah 4: Kesimpulan kebocoran: Model hanya menguji kemampuan pengenalan bantalan yang telah dilihat sebelumnya, bukan kemampuan generalisasi pada bantalan baru. Invarian grup dilanggar."
      ],
      "resultInterpretation": "Peneliti mengalami subject/device leakage. Solusi yang valid adalah GroupKFold berdasarkan ID bantalan (misal 8 bantalan untuk train, 2 bantalan terisolasi untuk test)."
    },
    "pythonImplementation": {
      "description": "Audit kebocoran data: membandingkan Random Split vs GroupKFold pada data multi-sensor.",
      "libraryDependencies": [
        "numpy",
        "sklearn.model_selection",
        "sklearn.ensemble",
        "sklearn.metrics"
      ],
      "code": "import numpy as np\nfrom sklearn.model_selection import train_test_split, GroupKFold\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\n# [SIMULASI/SYNTHETIC DATA]\nnp.random.seed(42)\nn_devices = 10\nsamples_per_device = 100\ntotal_samples = n_devices * samples_per_device\n\n# Buat grup perangkat\ngroups = np.repeat(np.arange(n_devices), samples_per_device)\ndevice_bias = np.repeat(np.random.randn(n_devices), samples_per_device)\n\n# Fitur dan target (target dipengaruhi sinyal + derau perangkat)\nX = np.random.randn(total_samples, 5) + device_bias[:, None] * 1.5\ny = (X[:, 0] * 0.8 + np.random.randn(total_samples) * 0.5 > 0).astype(int)\n\n# 1. EVALUASI DENGAN KEBOCORAN (Random Split)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nclf_leaky = RandomForestClassifier(random_state=42)\nclf_leaky.fit(X_train, y_train)\nacc_leaky = accuracy_score(y_test, clf_leaky.predict(X_test))\n\n# 2. EVALUASI BEBAS KEBOCORAN (GroupKFold pada ID Perangkat)\ngkf = GroupKFold(n_splits=5)\nacc_strict = []\nfor train_idx, test_idx in gkf.split(X, y, groups):\n    clf_strict = RandomForestClassifier(random_state=42)\n    clf_strict.fit(X[train_idx], y[train_idx])\n    acc_strict.append(accuracy_score(y[test_idx], clf_strict.predict(X[test_idx])))\n\nprint(f\"[SIMULASI/SYNTHETIC DATA] Hasil Audit Kebocoran:\")\nprint(f\"Akurasi Random Split (Mengandung Device Leakage) : {acc_leaky:.4f}\")\nprint(f\"Akurasi GroupKFold (Isolasi Fisik Perangkat Baku) : {np.mean(acc_strict):.4f}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Audit Kebocoran:\nAkurasi Random Split (Mengandung Device Leakage) : 0.8400\nAkurasi GroupKFold (Isolasi Fisik Perangkat Baku) : 0.7020"
    },
    "commonPitfalls": [
      "Mengacak data time-series dengan fungsi random shuffle standar pustaka.",
      "Melakukan oversampling (SMOTE) sebelum partisi train-test, yang menduplikasi sampel sintetis ke kedua set.",
      "Mengabaikan keterkaitan fisik hierarkis antara pasien, rumah sakit, instrumen, atau batch material."
    ],
    "validationProcedures": [
      "Verifikasi irisan nol antar himpunan grup train dan test.",
      "Audit stempel waktu maksimum data latih lebih kecil daripada stempel waktu minimum data uji.",
      "Periksa apakah ada fitur yang memiliki korelasi 1.0 dengan label target yang tidak rasional secara fisik."
    ],
    "exercises": [
      {
        "question": "Mengapa oversampling menggunakan SMOTE sebelum pemisahan data latih dan data uji merupakan bentuk kebocoran data yang fatal?",
        "hint": "Perhatikan bagaimana tetangga terdekat dihitung pada data sintetis baru.",
        "answerExplanation": "Jika SMOTE dijalankan sebelum pemisahan data, titik-titik data sintetis dibangkitkan dari interpolasi antara sampel yang nantinya menjadi data latih dan data uji. Akibatnya informasi dari data uji telah merembes masuk ke dalam data latih sebelum pemisahan."
      },
      {
        "question": "Pada eksperimen pengenalan sinyal EEG untuk deteksi kantuk pengemudi, skema partisi mana yang wajib digunakan: StratifiedKFold atau GroupKFold?",
        "hint": "Pertimbangkan variasi unik bentuk gelombang otak setiap manusia.",
        "answerExplanation": "Wajib menggunakan GroupKFold berdasarkan ID subjek/pengemudi. Menggunakan StratifiedKFold biasa akan menyebarkan sinyal subjek yang sama ke dalam train dan test, sehingga model hanya menguji pengenalan individu alih-alih generalisasi kantuk lintas manusia."
      }
    ],
    "references": [
      {
        "citation": "Kaufman, S., Rosset, S., Perlich, C., & Stitelman, O. (2012). Leakage in data mining: Formulation, detection, and avoidance. ACM Transactions on Knowledge Discovery from Data (TKDD), 6(4), 1-21.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Kapoor, S., & Narayanan, A. (2023). Leakage and the reproducibility crisis in machine-learning-based science. Patterns, 4(9), 100804.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Taksonomi Kebocoran Data (Data Leakage): Fitur, Temporal, dan Sampel Berulang",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.1.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.1.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengidentifikasi taksonomi kebocoran data dalam pemodelan prediktif rekayasa.",
          "Capaian 2: Membedakan kebocoran fitur (feature leakage), kebocoran temporal, dan duplikasi sampel (patient/device leakage).",
          "Capaian 3: Menganalisis dampak optimisme semu (false optimism) terhadap reliabilitas deployment model."
        ],
        "keyFormulaOrDiagram": "$$D_{\\text{train}} \\cap D_{\\text{test}} = \\emptyset$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.1.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Taksonomi Kebocoran Data (Data Leakage): Fitur, Temporal, dan Sampel Berulang",
        "lead": "Kebocoran data (data leakage) adalah kesalahan metodologis paling merusak dalam komputasi rekayasa dan pembelajaran mesin.",
        "bulletPoints": [
          "Kebocoran terjadi ketika informasi dari luar himpunan data latih (khususnya informasi dari target evaluasi masa depan atau data uji) secara tidak sengaja masuk ke dalam proses estimasi atau pembentukan representasi model.",
          "Akibatnya, model menunjukkan performa evaluasi yang luar biasa tinggi pada tahap pengujian internal, namun mengalami keruntuhan total saat diuji pada lingkungan operasional riil.",
          "Taksonomi Kebocoran Data: 1.",
          "Kebocoran Fitur (Feature Leakage): Terjadi ketika sebuah variabel prediktor secara langsung mencerminkan variabel target atau merupakan konsekuensi dari kejadian target."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "2.",
        "bulletPoints": [
          "Kebocoran Temporal (Temporal Leakage): Terjadi pada data runtun waktu atau proses dinamis ketika observasi dari masa depan (t + k) digunakan untuk memprediksi kondisi pada saat ini (t).",
          "Pengacakan acak murni (random shuffle) pada data sensor runtun waktu menghancurkan autokorelasi alami dan memasukkan kebocoran temporal secara sistematis.",
          "3.",
          "Kebocoran Sampel Berulang atau Pengelompokan (Subject/Device Leakage): Terjadi ketika observasi berganda dari satu entitas fisik (misalnya subjek pasien, turbin tertentu, atau sensor tertentu) tersebar di data latih dan data uji secara bersamaan."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Pemisahan Partisi Formal Bebas Kontaminasi:",
        "bulletPoints": [
          "Misalkan $D = \\{(x_i, y_i, t_i, g_i)\\}_{i=1}^N$ adalah dataset dengan $x_i$ sebagai fitur, $y_i$ sebagai target, $t_i$ sebagai stempel waktu, dan $g_i$ sebagai pengenal grup (subjek/perangkat).",
          "Partisi data latih $D_{\\text{train}}$ dan data uji $D_{\\text{test}}$ wajib memenuhi tiga invarian ortogonal:",
          "1. Invarian Sampel:"
        ],
        "keyFormulaOrDiagram": "$$D_{\\text{train}} \\cap D_{\\text{test}} = \\emptyset$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah dataset getaran bantalan mekanik memiliki 10.000 jendela waktu yang diambil dari 10 bantalan uji (1.000 jendela per bantalan). Seorang peneliti mengacak seluruh 10.000 baris dan membaginya 80:20 menjadi train dan test. Model mencapai akurasi 99.2%. Namun pada turbin baru di industri, akurasi anjlok menjadi 61.4%. Jelaskan secara matematis letak kebocoran data tersebut.",
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
          "Langkah 1: Identifikasi grup fisik: Grup g terdiri dari 10 ID bantalan.",
          "Langkah 2: Evaluasi pengacakan seragam (Uniform random split): Dengan mengacak 10.000 jendela, probabilitas jendela dari bantalan yang sama masuk ke train dan test mendekati 100%. Rata-rata 800 jendela dari Bantalan 1 ada di train, dan 200 jendela dari Bantalan 1 ada di test."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Analisis representasi fitur: Ciri-ciri spesifik mikroskopis Bantalan 1 (frekuensi harmonik spesifik cacat manufakturnya) dihafalkan oleh model.",
          "Langkah 4: Kesimpulan kebocoran: Model hanya menguji kemampuan pengenalan bantalan yang telah dilihat sebelumnya, bukan kemampuan generalisasi pada bantalan baru. Invarian grup dilanggar.",
          "[result: Interpretasi Ilmiah] Peneliti mengalami subject/device leakage. Solusi yang valid adalah GroupKFold berdasarkan ID bantalan (misal 8 bantalan untuk train, 2 bantalan terisolasi untuk test)."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Audit kebocoran data: membandingkan Random Split vs GroupKFold pada data multi-sensor.",
        "bulletPoints": [
          "Tujuan Algoritma: Audit kebocoran data: membandingkan Random Split vs GroupKFold pada data multi-sensor.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.model_selection, sklearn.ensemble, sklearn.metrics",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Audit Kebocoran:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Audit Kebocoran:\nAkurasi Random Split (Mengandung Device Leakage) : 0.8400\nAkurasi GroupKFold (Isolasi Fisik Perangkat Baku) : 0.7020",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Mengacak data time-series dengan fungsi random shuffle standar pustaka.",
          "[warning: Perangkap] Melakukan oversampling (SMOTE) sebelum partisi train-test, yang menduplikasi sampel sintetis ke kedua set.",
          "[warning: Perangkap] Mengabaikan keterkaitan fisik hierarkis antara pasien, rumah sakit, instrumen, atau batch material."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Verifikasi irisan nol antar himpunan grup train dan test.",
          "Prosedur: Audit stempel waktu maksimum data latih lebih kecil daripada stempel waktu minimum data uji.",
          "Prosedur: Periksa apakah ada fitur yang memiliki korelasi 1.0 dengan label target yang tidak rasional secara fisik."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa oversampling menggunakan SMOTE sebelum pemisahan data latih dan data uji merupakan bentuk kebocoran data yang fatal?",
          "Petunjuk Analitis: Perhatikan bagaimana tetangga terdekat dihitung pada data sintetis baru.",
          "Solusi Kunci: Jika SMOTE dijalankan sebelum pemisahan data, titik-titik data sintetis dibangkitkan dari interpolasi antara sampel yang nantinya menjadi data latih dan data uji. Akibatnya informasi dari data uji telah merembes masuk ke dalam data latih sebelum pemisahan."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "5.1.2": {
    "id": "5.1.2",
    "chapterId": "CH-32",
    "title": "Kebocoran Pra-Pemrosesan: Penskalaan Fitur dan Seleksi Atribut di Luar Loop Validasi Silang",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Mendeteksi kebocoran pemrosesan awal (preprocessing leakage) yang terjadi akibat standarisasi global.",
      "Membuktikan bias seleksi (selection bias) saat fitur diseleksi sebelum validasi silang.",
      "Mengimplementasikan pipeline scikit-learn terenkapsulasi untuk mengunci seluruh transformasi data dalam loop training."
    ],
    "content": "Bentuk kebocoran data yang paling umum dan sering lolos dari pengawasan tim peninjau jurnal ilmiah adalah kebocoran pra-pemrosesan (preprocessing leakage). Kesalahan ini terjadi ketika transformasi data seperti normalisasi min-max, standarisasi z-score, imputasi nilai hilang, reduksi dimensi PCA, atau seleksi fitur berbasis korelasi dihitung menggunakan keseluruhan dataset sebelum proses cross-validation dijalankan.\n\nMekanisme Bias Seleksi Fitur (Ambroise & McLachlan, 2002):\nMisalkan seorang peneliti memiliki dataset biomedis dengan 20.000 ekspresi gen namun hanya memiliki 50 sampel pasien (p >> n). Peneliti tersebut menghitung korelasi seluruh 20.000 gen terhadap label target pada seluruh 50 pasien, memilih 100 gen dengan korelasi tertinggi, lalu menjalankan 5-fold cross-validation pada 100 gen terpilih tersebut.\n\nMetodologi ini adalah kesalahan ilmiah fatal. Karena 100 gen tersebut dipilih menggunakan informasi dari seluruh 50 pasien (termasuk pasien yang akan menjadi data uji pada tiap fold), data acak murni sekalipun (Gaussian noise tanpa hubungan apapun dengan kanker) akan menghasilkan akurasi klasifikasi 95% hingga 100% palsu. Seluruh tahapan inferensi yang menyentuh data uji di dalam loop evaluasi merusak validitas statistik pengujian.",
    "mathematicalFoundations": "Formulasi Matematis Transformasi Terenkapsulasi:\nMisalkan $T_\\theta$ adalah operator pra-pemrosesan berparameter $\\theta$.\nPada standardisasi z-score:\n$$\\theta = (\\boldsymbol{\\mu}, \\boldsymbol{\\sigma})$$\n$$\\boldsymbol{\\mu} = \\frac{1}{|D_{\\text{train}}|} \\sum_{x_i \\in D_{\\text{train}}} x_i, \\quad \\boldsymbol{\\sigma} = \\sqrt{\\frac{1}{|D_{\\text{train}}|-1} \\sum_{x_i \\in D_{\\text{train}}} (x_i - \\boldsymbol{\\mu})^2}$$\n\nAturan Baku Pra-Pemrosesan Ilmiah:\n1. Tahap Estimasi Parameter (Fit):\n$$\\theta^* = \\text{Estimator}(D_{\\text{train}})$$\nHimpunan $D_{\\text{test}}$ tidak boleh dilibatkan dalam penghitungan $\\theta^*$.\n\n2. Tahap Transformasi:\n$$x_{\\text{train}}' = T_{\\theta^*}(x_{\\text{train}})$$\n$$x_{\\text{test}}' = T_{\\theta^*}(x_{\\text{test}})$$\n\nPelanggaran: Jika $\\theta^*$ dihitung dari $D_{\\text{train}} \\cup D_{\\text{test}}$, maka $\\hat{y}_{\\text{test}}$ dipengaruhi oleh $\\boldsymbol{\\mu}_{\\text{global}}$ dan $\\boldsymbol{\\sigma}_{\\text{global}}$, menyebabkan underestimasi kesalahan generalisasi.",
    "workedExample": {
      "problemStatement": "Buktikan melalui eksperimen komputasi bahwa seleksi 10 fitur terbaik dari 1.000 fitur acak murni (derau murni tanpa relasi) dapat menghasilkan akurasi di atas 80% jika seleksi dilakukan di luar loop cross-validation.",
      "stepByStepSolution": [
        "Langkah 1: Bangkitkan matriks data acak murni X berukuran 100 baris x 1.000 kolom dari distribusi N(0,1), dan label biner acak y berdistribusi Bernoulli(0.5).",
        "Langkah 2: Skenario Cacat: Hitung korelasi semua 1.000 kolom terhadap y pada seluruh 100 baris. Pilih 10 kolom dengan korelasi mutlak tertinggi. Jalankan 5-fold CV dengan k-NN pada 10 kolom tersebut.",
        "Langkah 3: Skenario Baku: Masukkan seleksi 10 fitur ke dalam objek Pipeline, sehingga pada setiap fold seleksi fitur hanya menggunakan 80 sampel train fold.",
        "Langkah 4: Hasil komparasi: Skenario cacat menghasilkan akurasi ~85% (palsu), sedangkan Pipeline baku menghasilkan akurasi ~50% (tepat sesuai ekspektasi teoretis tebakan acak)."
      ],
      "resultInterpretation": "Seleksi fitur di luar validasi silang menciptakan ilusi prediktif dari data derau acak murni."
    },
    "pythonImplementation": {
      "description": "Eksperimen sintetis pembuktian bias seleksi fitur pada derau acak murni.",
      "libraryDependencies": [
        "numpy",
        "sklearn.feature_selection",
        "sklearn.neighbors",
        "sklearn.pipeline",
        "sklearn.model_selection"
      ],
      "code": "import numpy as np\nfrom sklearn.feature_selection import SelectKBest, f_classif\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.model_selection import cross_val_score, KFold\n\n# [SIMULASI/SYNTHETIC DATA]\n# 100 sampel, 1000 fitur derau independen sempurna\nnp.random.seed(42)\nX_noise = np.random.randn(100, 1000)\ny_noise = np.random.randint(0, 2, size=100)\n\n# SKENARIO 1: KEBOCORAN (Seleksi fitur di luar loop CV)\nselector = SelectKBest(score_func=f_classif, k=10)\nX_selected = selector.fit_transform(X_noise, y_noise)\ncv = KFold(n_splits=5, shuffle=True, random_state=42)\nscores_leaky = cross_val_score(KNeighborsClassifier(n_neighbors=3), X_selected, y_noise, cv=cv)\n\n# SKENARIO 2: PIPELINE TERENKAPSULASI (Bebas kebocoran)\npipeline = Pipeline([\n    ('selector', SelectKBest(score_func=f_classif, k=10)),\n    ('knn', KNeighborsClassifier(n_neighbors=3))\n])\nscores_strict = cross_val_score(pipeline, X_noise, y_noise, cv=cv)\n\nprint(f\"[SIMULASI/SYNTHETIC DATA] Evaluasi Noise Murni:\")\nprint(f\"Akurasi Rata-rata Leaky Feature Selection : {np.mean(scores_leaky):.4f} (Ilusi Prediktif!)\")\nprint(f\"Akurasi Rata-rata Enkapsulasi Pipeline    : {np.mean(scores_strict):.4f} (Sesuai Peluang 50%)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Noise Murni:\nAkurasi Rata-rata Leaky Feature Selection : 0.8100 (Ilusi Prediktif!)\nAkurasi Rata-rata Enkapsulasi Pipeline    : 0.4900 (Sesuai Peluang 50%)"
    },
    "commonPitfalls": [
      "Menjalankan scaler.fit_transform(X) pada seluruh dataset sebelum pemanggilan train_test_split.",
      "Melakukan imputasi nilai hilang menggunakan mean global dari seluruh sampel.",
      "Mengekstraksi fitur komponen utama (PCA) pada seluruh dataset sebelum partisi validasi."
    ],
    "validationProcedures": [
      "Bungkus seluruh pemrosesan awal dan estimator ke dalam modul Pipeline terintegrasi.",
      "Pastikan fungsi fit hanya dipanggil pada objek latih (X_train) dan transform dipanggil pada (X_test).",
      "Lakukan uji sanity check dengan label target yang diacak: model harus menghasilkan performa tebakan acak."
    ],
    "exercises": [
      {
        "question": "Mengapa melakukan StandardScaler pada seluruh dataset sebelum train_test_split merupakan pelanggaran metodologis?",
        "hint": "Pikirkan nilai mean dan standar deviasi data uji.",
        "answerExplanation": "Karena mean dan standar deviasi yang dihitung untuk penskalaan mencakup nilai dari data uji. Informasi tentang distribusi data uji telah meresap ke dalam representasi fitur data latih sebelum pemodelan dimulai."
      },
      {
        "question": "Bagaimana cara mencegah kebocoran imputasi pada data sensor yang memiliki banyak nilai hilang (NaN)?",
        "hint": "Gunakan SimpleImputer di dalam Pipeline scikit-learn.",
        "answerExplanation": "Imputer harus dihitung statistiknya (misal median) hanya dari fold latih, lalu nilai median tersebut diterapkan untuk mengisi data hilang pada fold uji menggunakan objek Pipeline."
      }
    ],
    "references": [
      {
        "citation": "Ambroise, C., & McLachlan, G. J. (2002). Selection bias in gene extraction on the basis of microarray gene-expression data. PNAS, 99(10), 6562-6566.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Hastie, T., Tibshirani, R., & Friedman, J. (2009). The Elements of Statistical Learning (2nd ed.). Springer.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Kebocoran Pra-Pemrosesan: Penskalaan Fitur dan Seleksi Atribut di Luar Loop Validasi Silang",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.1.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.1.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mendeteksi kebocoran pemrosesan awal (preprocessing leakage) yang terjadi akibat standarisasi global.",
          "Capaian 2: Membuktikan bias seleksi (selection bias) saat fitur diseleksi sebelum validasi silang.",
          "Capaian 3: Mengimplementasikan pipeline scikit-learn terenkapsulasi untuk mengunci seluruh transformasi data dalam loop training."
        ],
        "keyFormulaOrDiagram": "$$\\theta = (\\boldsymbol{\\mu}, \\boldsymbol{\\sigma})$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.1.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Kebocoran Pra-Pemrosesan: Penskalaan Fitur dan Seleksi Atribut di Luar Loop Validasi Silang",
        "lead": "Bentuk kebocoran data yang paling umum dan sering lolos dari pengawasan tim peninjau jurnal ilmiah adalah kebocoran pra-pemrosesan (preprocessing leakage).",
        "bulletPoints": [
          "Kesalahan ini terjadi ketika transformasi data seperti normalisasi min-max, standarisasi z-score, imputasi nilai hilang, reduksi dimensi PCA, atau seleksi fitur berbasis korelasi dihitung menggunakan keseluruhan dataset sebelum proses cross-validation dijalankan.",
          "Mekanisme Bias Seleksi Fitur (Ambroise & McLachlan, 2002): Misalkan seorang peneliti memiliki dataset biomedis dengan 20.000 ekspresi gen namun hanya memiliki 50 sampel pasien (p >> n).",
          "Peneliti tersebut menghitung korelasi seluruh 20.000 gen terhadap label target pada seluruh 50 pasien, memilih 100 gen dengan korelasi tertinggi, lalu menjalankan 5-fold cross-validation pada 100 gen terpilih tersebut."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Metodologi ini adalah kesalahan ilmiah fatal.",
        "bulletPoints": [
          "Karena 100 gen tersebut dipilih menggunakan informasi dari seluruh 50 pasien (termasuk pasien yang akan menjadi data uji pada tiap fold), data acak murni sekalipun (Gaussian noise tanpa hubungan apapun dengan kanker) akan menghasilkan akurasi klasifikasi 95% hingga 100% palsu.",
          "Seluruh tahapan inferensi yang menyentuh data uji di dalam loop evaluasi merusak validitas statistik pengujian."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Transformasi Terenkapsulasi:",
        "bulletPoints": [
          "Misalkan $T_\\theta$ adalah operator pra-pemrosesan berparameter $\\theta$.",
          "Pada standardisasi z-score:",
          "Aturan Baku Pra-Pemrosesan Ilmiah:"
        ],
        "keyFormulaOrDiagram": "$$\\theta = (\\boldsymbol{\\mu}, \\boldsymbol{\\sigma})$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Buktikan melalui eksperimen komputasi bahwa seleksi 10 fitur terbaik dari 1.000 fitur acak murni (derau murni tanpa relasi) dapat menghasilkan akurasi di atas 80% jika seleksi dilakukan di luar loop cross-validation.",
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
          "Langkah 1: Bangkitkan matriks data acak murni X berukuran 100 baris x 1.000 kolom dari distribusi N(0,1), dan label biner acak y berdistribusi Bernoulli(0.5).",
          "Langkah 2: Skenario Cacat: Hitung korelasi semua 1.000 kolom terhadap y pada seluruh 100 baris. Pilih 10 kolom dengan korelasi mutlak tertinggi. Jalankan 5-fold CV dengan k-NN pada 10 kolom tersebut."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Skenario Baku: Masukkan seleksi 10 fitur ke dalam objek Pipeline, sehingga pada setiap fold seleksi fitur hanya menggunakan 80 sampel train fold.",
          "Langkah 4: Hasil komparasi: Skenario cacat menghasilkan akurasi ~85% (palsu), sedangkan Pipeline baku menghasilkan akurasi ~50% (tepat sesuai ekspektasi teoretis tebakan acak).",
          "[result: Interpretasi Ilmiah] Seleksi fitur di luar validasi silang menciptakan ilusi prediktif dari data derau acak murni."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Eksperimen sintetis pembuktian bias seleksi fitur pada derau acak murni.",
        "bulletPoints": [
          "Tujuan Algoritma: Eksperimen sintetis pembuktian bias seleksi fitur pada derau acak murni.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.feature_selection, sklearn.neighbors, sklearn.pipeline, sklearn.model_selection",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Noise Murni:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Noise Murni:\nAkurasi Rata-rata Leaky Feature Selection : 0.8100 (Ilusi Prediktif!)\nAkurasi Rata-rata Enkapsulasi Pipeline    : 0.4900 (Sesuai Peluang 50%)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menjalankan scaler.fit_transform(X) pada seluruh dataset sebelum pemanggilan train_test_split.",
          "[warning: Perangkap] Melakukan imputasi nilai hilang menggunakan mean global dari seluruh sampel.",
          "[warning: Perangkap] Mengekstraksi fitur komponen utama (PCA) pada seluruh dataset sebelum partisi validasi."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Bungkus seluruh pemrosesan awal dan estimator ke dalam modul Pipeline terintegrasi.",
          "Prosedur: Pastikan fungsi fit hanya dipanggil pada objek latih (X_train) dan transform dipanggil pada (X_test).",
          "Prosedur: Lakukan uji sanity check dengan label target yang diacak: model harus menghasilkan performa tebakan acak."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa melakukan StandardScaler pada seluruh dataset sebelum train_test_split merupakan pelanggaran metodologis?",
          "Petunjuk Analitis: Pikirkan nilai mean dan standar deviasi data uji.",
          "Solusi Kunci: Karena mean dan standar deviasi yang dihitung untuk penskalaan mencakup nilai dari data uji. Informasi tentang distribusi data uji telah meresap ke dalam representasi fitur data latih sebelum pemodelan dimulai."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "5.1.3": {
    "id": "5.1.3",
    "chapterId": "CH-32",
    "title": "Skema Partisi Ketat: Stratified K-Fold, GroupKFold, dan TimeSeriesSplit",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memilih skema partisi validasi yang selaras dengan struktur independensi data fisis.",
      "Menerapkan Stratified K-Fold untuk data dengan ketidakseimbangan kelas (class imbalance).",
      "Menggunakan GroupKFold dan TimeSeriesSplit untuk menghindari pelanggaran invarian independensi."
    ],
    "content": "Keberhasilan evaluasi empiris sebuah model sangat bergantung pada kesesuaian antara skema partisi validasi dengan asumsi fisis pembangkitan data (Data Generating Process). Menggunakan skema pemisahan acak sederhana (K-Fold standar) pada data dengan struktur hierarkis atau korelasi temporal adalah pelanggaran metodologis serius yang menghasilkan estimasi performa bias.\n\nPilihan Skema Partisi Ilmiah:\n1. Stratified K-Fold:\nDirancang untuk data klasifikasi, khususnya dengan ketidakseimbangan kelas ekstrem (misalnya deteksi anomali kegagalan mesin di mana cacat hanya 1%). Skema ini menjamin bahwa proporsi setiap kelas pada setiap fold latih dan uji sama persis dengan proporsi kelas pada populasi total.\n\n2. GroupKFold (Hierarchical/Clustered Data):\nWajib digunakan ketika beberapa observasi berasal dari entitas fisik yang sama. Seluruh observasi dari grup atau subjek tertentu dialokasikan secara utuh ke salah satu fold, sehingga tidak ada grup yang muncul di fold latih dan fold uji secara simultan.\n\n3. TimeSeriesSplit (Rolling/Expanding Window):\nWajib digunakan untuk data deret waktu dan proses kontinu. Pada setiap iterasi k, data latih hanya terdiri dari observasi masa lalu hingga waktu t, dan data uji adalah jendela waktu masa depan terdekat [t+1, t+w]. Data masa depan tidak pernah digunakan untuk memprediksi data masa lalu.",
    "mathematicalFoundations": "Formulasi Matematis Skema Partisi:\n\n1. Kriteria Stratifikasi Kelas:\nMisalkan $N_{c, k}$ adalah jumlah sampel kelas $c$ pada fold uji ke-$k$, dan $N_k$ adalah ukuran fold uji ke-$k$:\n$$\\frac{N_{c, k}}{N_k} \\approx \\frac{N_c}{N}, \\quad \\forall c \\in \\mathcal{C}, \\; \\forall k \\in \\{1, \\dots, K\\}$$\n\n2. Kriteria Disjoin Grup (GroupKFold):\nMisalkan $\\mathcal{G}_k^{\\text{test}}$ adalah himpunan grup pada fold uji ke-$k$:\n$$\\mathcal{G}_k^{\\text{test}} \\cap \\mathcal{G}_j^{\\text{test}} = \\emptyset, \\quad \\forall k \\neq j$$\n$$\\bigcup_{k=1}^K \\mathcal{G}_k^{\\text{test}} = \\mathcal{G}$$\n\n3. Kriteria Temporal (TimeSeriesSplit):\nFold ke-$k$ menggunakan data latih indeks $1$ hingga $m_k$, dan data uji indeks $m_k+1$ hingga $m_k+w$:\n$$\\max(t_{\\text{train}, k}) < \\min(t_{\\text{test}, k}), \\quad m_{k+1} > m_k$$",
    "workedExample": {
      "problemStatement": "Sebuah sistem pemantauan gempa bumi mencatat gelombang getaran per jam selama 1 tahun. Mengapa K-Fold acak standar tidak boleh digunakan untuk mengevaluasi model peramalan gempa tersebut?",
      "stepByStepSolution": [
        "Langkah 1: Sifat fisis data: Gelombang seismik memiliki ketergantungan temporal yang kuat (autokorelasi tinggi antar jam berurutan).",
        "Langkah 2: Dampak K-Fold acak: Jam ke-10 dimasukkan ke data uji, sementara jam ke-9 dan jam ke-11 dimasukkan ke data latih.",
        "Langkah 3: Pelanggaran kausalitas: Model memprediksi jam ke-10 dengan menginterpolasi nilai jam ke-9 dan jam ke-11 yang berada di masa depan terhadap jam ke-10.",
        "Langkah 4: Rekomendasi: Wajib menggunakan TimeSeriesSplit atau Blocked Cross-Validation dengan celah pemisah (gap) untuk menghilangkan kebocoran autokorelasi."
      ],
      "resultInterpretation": "Penerapan K-Fold acak pada deret waktu adalah kebocoran masa depan yang memalsukan akurasi prediksi nyata."
    },
    "pythonImplementation": {
      "description": "Implementasi dan perbandingan visualisasi pemisahan TimeSeriesSplit vs KFold standar.",
      "libraryDependencies": [
        "numpy",
        "sklearn.model_selection"
      ],
      "code": "import numpy as np\nfrom sklearn.model_selection import KFold, TimeSeriesSplit\n\n# [SIMULASI/SYNTHETIC DATA]\nn_samples = 10\nindices = np.arange(n_samples)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Perbandingan Partisi Indeks:\")\nprint(\"--- Standard K-Fold (Shuffle=False) ---\")\nkf = KFold(n_splits=3)\nfor fold, (train_idx, test_idx) in enumerate(kf.split(indices)):\n    print(f\"Fold {fold+1}: Train={train_idx.tolist()} | Test={test_idx.tolist()}\")\n\nprint(\"\\n--- TimeSeriesSplit (Ekspansi Masa Lalu ke Masa Depan) ---\")\ntscv = TimeSeriesSplit(n_splits=3)\nfor fold, (train_idx, test_idx) in enumerate(tscv.split(indices)):\n    print(f\"Fold {fold+1}: Train={train_idx.tolist()} | Test={test_idx.tolist()}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Perbandingan Partisi Indeks:\n--- Standard K-Fold (Shuffle=False) ---\nFold 1: Train=[4, 5, 6, 7, 8, 9] | Test=[0, 1, 2, 3]\nFold 2: Train=[0, 1, 2, 3, 7, 8, 9] | Test=[4, 5, 6]\nFold 3: Train=[0, 1, 2, 3, 4, 5, 6] | Test=[7, 8, 9]\n\n--- TimeSeriesSplit (Ekspansi Masa Lalu ke Masa Depan) ---\nFold 1: Train=[0, 1, 2, 3] | Test=[4, 5]\nFold 2: Train=[0, 1, 2, 3, 4, 5] | Test=[6, 7]\nFold 3: Train=[0, 1, 2, 3, 4, 5, 6, 7] | Test=[8, 9]"
    },
    "commonPitfalls": [
      "Menggunakan random shuffle pada data runtun waktu sensor.",
      "Mengabaikan struktur cluster data spasial (misal sensor cuaca yang berdekatan saling bocor sinyal).",
      "Menggunakan KFold biasa pada dataset medis dengan multi-scan per pasien."
    ],
    "validationProcedures": [
      "Gunakan StratifiedKFold saat ketidakseimbangan kelas lebih ekstrem dari 1:5.",
      "Gunakan GroupKFold ketika entitas sumber data memiliki observasi multipel.",
      "Periksa secara terprogram bahwa indeks uji selalu lebih besar dari indeks latih pada skema waktu."
    ],
    "exercises": [
      {
        "question": "Kapan PurgedGroupTimeSeriesSplit diperlukan dalam penelitian rekayasa finansial atau industri proses?",
        "hint": "Pikirkan fenomena overlap pada label masa depan (misal prediksi volatilitas 5 hari ke depan).",
        "answerExplanation": "PurgedGroupTimeSeriesSplit diperlukan saat label target dihitung dari jendela masa depan yang tumpang tindih. Purging menghapus sampel latih yang berdekatan dengan batas uji, dan embargo menambahkan jeda pengaman untuk menghilangkan residu korelasi serial."
      },
      {
        "question": "Apa risiko terbesar dari penggunaan ukuran fold k yang terlalu kecil (misal k=2) versus k yang terlalu besar (misal Leave-One-Out / LOOCV)?",
        "hint": "Perhatikan trade-off antara bias estimasi dan varians komputasi.",
        "answerExplanation": "Nilai k yang kecil (k=2) memiliki bias estimasi tinggi karena hanya melatih pada 50% data. Sebaliknya LOOCV (k=N) memiliki bias rendah namun varians komputasi sangat tinggi antar fold serta biaya eksekusi yang masif."
      }
    ],
    "references": [
      {
        "citation": "Arlot, S., & Celisse, A. (2010). A survey of cross-validation procedures for model selection. Statistics Surveys, 4, 40-79.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Bergmeir, C., & Benítez, J. M. (2012). On the use of cross-validation for time series predictor evaluation. Information Sciences, 191, 192-213.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Skema Partisi Ketat: Stratified K-Fold, GroupKFold, dan TimeSeriesSplit",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.1.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.1.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memilih skema partisi validasi yang selaras dengan struktur independensi data fisis.",
          "Capaian 2: Menerapkan Stratified K-Fold untuk data dengan ketidakseimbangan kelas (class imbalance).",
          "Capaian 3: Menggunakan GroupKFold dan TimeSeriesSplit untuk menghindari pelanggaran invarian independensi."
        ],
        "keyFormulaOrDiagram": "$$\\frac{N_{c, k}}{N_k} \\approx \\frac{N_c}{N}, \\quad \\forall c \\in \\mathcal{C}, \\; \\forall k \\in \\{1, \\dots, K\\}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.1.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Skema Partisi Ketat: Stratified K-Fold, GroupKFold, dan TimeSeriesSplit",
        "lead": "Keberhasilan evaluasi empiris sebuah model sangat bergantung pada kesesuaian antara skema partisi validasi dengan asumsi fisis pembangkitan data (Data Generating Process).",
        "bulletPoints": [
          "Menggunakan skema pemisahan acak sederhana (K-Fold standar) pada data dengan struktur hierarkis atau korelasi temporal adalah pelanggaran metodologis serius yang menghasilkan estimasi performa bias.",
          "Pilihan Skema Partisi Ilmiah: 1.",
          "Stratified K-Fold: Dirancang untuk data klasifikasi, khususnya dengan ketidakseimbangan kelas ekstrem (misalnya deteksi anomali kegagalan mesin di mana cacat hanya 1%)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "2.",
        "bulletPoints": [
          "GroupKFold (Hierarchical/Clustered Data): Wajib digunakan ketika beberapa observasi berasal dari entitas fisik yang sama.",
          "Seluruh observasi dari grup atau subjek tertentu dialokasikan secara utuh ke salah satu fold, sehingga tidak ada grup yang muncul di fold latih dan fold uji secara simultan.",
          "3.",
          "TimeSeriesSplit (Rolling/Expanding Window): Wajib digunakan untuk data deret waktu dan proses kontinu."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Skema Partisi:",
        "bulletPoints": [
          "1. Kriteria Stratifikasi Kelas:",
          "Misalkan $N_{c, k}$ adalah jumlah sampel kelas $c$ pada fold uji ke-$k$, dan $N_k$ adalah ukuran fold uji ke-$k$:",
          "2. Kriteria Disjoin Grup (GroupKFold):"
        ],
        "keyFormulaOrDiagram": "$$\\frac{N_{c, k}}{N_k} \\approx \\frac{N_c}{N}, \\quad \\forall c \\in \\mathcal{C}, \\; \\forall k \\in \\{1, \\dots, K\\}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah sistem pemantauan gempa bumi mencatat gelombang getaran per jam selama 1 tahun. Mengapa K-Fold acak standar tidak boleh digunakan untuk mengevaluasi model peramalan gempa tersebut?",
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
          "Langkah 1: Sifat fisis data: Gelombang seismik memiliki ketergantungan temporal yang kuat (autokorelasi tinggi antar jam berurutan).",
          "Langkah 2: Dampak K-Fold acak: Jam ke-10 dimasukkan ke data uji, sementara jam ke-9 dan jam ke-11 dimasukkan ke data latih."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Pelanggaran kausalitas: Model memprediksi jam ke-10 dengan menginterpolasi nilai jam ke-9 dan jam ke-11 yang berada di masa depan terhadap jam ke-10.",
          "Langkah 4: Rekomendasi: Wajib menggunakan TimeSeriesSplit atau Blocked Cross-Validation dengan celah pemisah (gap) untuk menghilangkan kebocoran autokorelasi.",
          "[result: Interpretasi Ilmiah] Penerapan K-Fold acak pada deret waktu adalah kebocoran masa depan yang memalsukan akurasi prediksi nyata."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi dan perbandingan visualisasi pemisahan TimeSeriesSplit vs KFold standar.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi dan perbandingan visualisasi pemisahan TimeSeriesSplit vs KFold standar.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.model_selection",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Perbandingan Partisi Indeks:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Perbandingan Partisi Indeks:\n--- Standard K-Fold (Shuffle=False) ---\nFold 1: Train=[4, 5, 6, 7, 8, 9] | Test=[0, 1, 2, 3]\nFold 2: Train=[0, 1, 2, 3, 7, 8, 9] | Test=[4, 5, 6]\nFold 3: Train=[0, 1, 2, 3, 4, 5, 6] | Test=[7, 8, 9]",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menggunakan random shuffle pada data runtun waktu sensor.",
          "[warning: Perangkap] Mengabaikan struktur cluster data spasial (misal sensor cuaca yang berdekatan saling bocor sinyal).",
          "[warning: Perangkap] Menggunakan KFold biasa pada dataset medis dengan multi-scan per pasien."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan StratifiedKFold saat ketidakseimbangan kelas lebih ekstrem dari 1:5.",
          "Prosedur: Gunakan GroupKFold ketika entitas sumber data memiliki observasi multipel.",
          "Prosedur: Periksa secara terprogram bahwa indeks uji selalu lebih besar dari indeks latih pada skema waktu."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Kapan PurgedGroupTimeSeriesSplit diperlukan dalam penelitian rekayasa finansial atau industri proses?",
          "Petunjuk Analitis: Pikirkan fenomena overlap pada label masa depan (misal prediksi volatilitas 5 hari ke depan).",
          "Solusi Kunci: PurgedGroupTimeSeriesSplit diperlukan saat label target dihitung dari jendela masa depan yang tumpang tindih. Purging menghapus sampel latih yang berdekatan dengan batas uji, dan embargo menambahkan jeda pengaman untuk menghilangkan residu korelasi serial."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "5.1.4": {
    "id": "5.1.4",
    "chapterId": "CH-32",
    "title": "Nested Cross-Validation untuk Evaluasi Performa yang Tidak Bias terhadap Tuning Hyperparameter",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami mekanisme bias optimisme yang timbul akibat penggabungan seleksi model dan estimasi performa.",
      "Merancang arsitektur Nested Cross-Validation (K-Fold Luar dan K-Fold Dalam).",
      "Menginterpretasikan variasi hyperparameter optimal antar fold eksternal sebagai indikator kestabilan arsitektur."
    ],
    "content": "Dalam literatur rekayasa komputasi, salah satu pelanggaran metodologis yang paling merajalela adalah melaporkan skor akurasi terbaik dari proses grid search hyperparameter sebagai estimasi kesalahan generalisasi model. Pendekatan ini dinamakan evaluasi yang teroptimasi secara parsial (optimistically biased evaluation).\n\nMengapa CV Standar Menghasilkan Bias Optimisme?\nJika seorang peneliti menjalankan 5-fold cross-validation pada 100 kombinasi hyperparameter yang berbeda dan memilih kombinasi dengan nilai rata-rata tertinggi, skor tersebut bukan lagi estimasi kesalahan generalisasi yang tidak bias. Pemilihan hyperparameter terbaik didasarkan pada data evaluasi yang sama. Peneliti pada dasarnya telah melakukan \"p-hacking komputasional\" dengan menguji 100 konfigurasi dan memilih yang paling beruntung pada partisi data tersebut.\n\nArsitektur Nested Cross-Validation:\nUntuk memperoleh estimasi performa yang benar-benar tidak bias, proses pemilihan hyperparameter (model selection) wajib dipisahkan secara hierarkis dari proses evaluasi performa (model assessment).\n1. Loop Luar (Outer Loop): Bertugas mengestimasi performa generalisasi model akhir. Data dibagi menjadi $K_{\\text{outer}}$ lipatan.\n2. Loop Dalam (Inner Loop): Dijalankan hanya di dalam data latih loop luar. Bertugas mencari konfigurasi hyperparameter optimal $\\lambda^*$ menggunakan $K_{\\text{inner}}$ lipatan.\nModel yang telah dituning dengan $\\lambda^*$ kemudian dievaluasi pada data uji loop luar yang sama sekali belum pernah dilihat.",
    "mathematicalFoundations": "Algoritma Formal Nested Cross-Validation:\nDiberikan dataset $D$:\n1. Bagi $D$ menjadi $K$ subset disjoin ${D_1, D_2, \\dots, D_K}$.\n2. Untuk setiap fold luar $k \\in \\{1, \\dots, K\\}$:\n   a. Tentukan himpunan uji luar: $D_{\\text{test}}^{(k)} = D_k$.\n   b. Tentukan himpunan latih luar: $D_{\\text{train}}^{(k)} = D \\setminus D_k$.\n   c. Di dalam $D_{\\text{train}}^{(k)}$, jalankan $M$-fold inner CV untuk mengevaluasi himpunan kandidat hyperparameter $\\Lambda$:\n      $$\\lambda_k^* = \\arg\\max_{\\lambda \\in \\Lambda} \\frac{1}{M} \\sum_{m=1}^M \\text{Score}(f_{\\lambda, D_{\\text{train}}^{(k)} \\setminus D_{m}^{(k)}}, D_{m}^{(k)})$$\n   d. Latih ulang model menggunakan $\\lambda_k^*$ pada seluruh $D_{\\text{train}}^{(k)}$:\n      $$f_k^* = \\text{Train}(D_{\\text{train}}^{(k)}, \\lambda_k^*)$$\n   e. Hitung performa murni pada $D_{\\text{test}}^{(k)}$:\n      $$S_k = \\text{Metric}(f_k^*, D_{\\text{test}}^{(k)})$$\n3. Estimasi performa generalisasi akhir yang tidak bias:\n$$\\hat{S}_{\\text{nested}} = \\frac{1}{K} \\sum_{k=1}^K S_k$$",
    "workedExample": {
      "problemStatement": "Jelaskan perbedaan antara skor CV terbaik dari GridSearchCV biasa dan skor dari Nested CV pada dataset kecil (N=80). Mengapa GridSearchCV biasa cenderung melebih-lebihkan performa hingga 5-10%?",
      "stepByStepSolution": [
        "Langkah 1: Mekanisme GridSearchCV biasa: 5 fold dievaluasi untuk 50 kombinasi hyperparameter. Konfigurasi terpilih adalah konfigurasi yang menghasilkan skor rata-rata tertinggi di kelima fold tersebut.",
        "Langkah 2: Terjadinya kebocoran seleksi: Informasi dari kelima fold telah digunakan secara bersamaan untuk memilih hyperparameter. Tidak ada data independen tersisa untuk memverifikasi apakah hyperparameter tersebut memang unggul atau hanya beruntung pada keanehan noise data.",
        "Langkah 3: Peran Outer Fold Nested CV: Memegang 20% data di luar jangkauan grid search. Konfigurasi terpilih di inner loop diuji pada data yang belum pernah berkontribusi pada keputusan pemilihan hyperparameter.",
        "Langkah 4: Evaluasi empiris: Penelitian Varma & Simon (2006) membuktikan bahwa pada sampel kecil, bias optimisme GridSearchCV biasa berkisar antara 5% hingga 15% dibanding Nested CV."
      ],
      "resultInterpretation": "Nested CV adalah standar emas obligatori untuk publikasi bereputasi ketika tuning hyperparameter dilakukan pada sampel terbatas."
    },
    "pythonImplementation": {
      "description": "Implementasi Nested Cross-Validation (5x3) menggunakan scikit-learn.",
      "libraryDependencies": [
        "numpy",
        "sklearn.datasets",
        "sklearn.svm",
        "sklearn.model_selection"
      ],
      "code": "import numpy as np\nfrom sklearn.datasets import make_classification\nfrom sklearn.svm import SVC\nfrom sklearn.model_selection import KFold, GridSearchCV, cross_val_score\n\n# [SIMULASI/SYNTHETIC DATA]\n# Dataset sintetis dimensi tinggi dengan sampel kecil\nX, y = make_classification(n_samples=100, n_features=20, n_informative=5, random_state=42)\n\n# Definisikan ruang hyperparameter\nparam_grid = {'C': [0.1, 1, 10, 100], 'gamma': [0.001, 0.01, 0.1, 1]}\n\n# 1. Non-nested CV (Optimistic Bias)\ninner_cv = KFold(n_splits=3, shuffle=True, random_state=42)\nouter_cv = KFold(n_splits=5, shuffle=True, random_state=42)\n\nclf_non_nested = GridSearchCV(estimator=SVC(kernel='rbf'), param_grid=param_grid, cv=inner_cv)\nclf_non_nested.fit(X, y)\noptimistic_score = clf_non_nested.best_score_\n\n# 2. Nested CV (Unbiased Assessment)\nclf_nested = GridSearchCV(estimator=SVC(kernel='rbf'), param_grid=param_grid, cv=inner_cv)\nnested_scores = cross_val_score(clf_nested, X, y, cv=outer_cv, scoring='accuracy')\n\nprint(f\"[SIMULASI/SYNTHETIC DATA] Hasil Komparasi Validasi:\")\nprint(f\"Non-Nested CV Score (Terbias Optimis)   : {optimistic_score:.4f}\")\nprint(f\"Nested CV Score (Estimasi Tak Bias Riil) : {nested_scores.mean():.4f} +/- {nested_scores.std():.4f}\")\nprint(f\"Besaran Bias Optimisme                  : {optimistic_score - nested_scores.mean():.4f}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Komparasi Validasi:\nNon-Nested CV Score (Terbias Optimis)   : 0.8904\nNested CV Score (Estimasi Tak Bias Riil) : 0.8400 +/- 0.0800\nBesaran Bias Optimisme                  : 0.0504"
    },
    "commonPitfalls": [
      "Melaporkan best_score_ dari objek GridSearchCV sebagai akurasi klaim publikasi.",
      "Mengira bahwa model akhir hasil Nested CV adalah rata-rata bobot dari k-model luar.",
      "Menggunakan random seed yang sama pada inner dan outer loop sehingga lipatan menjadi identik."
    ],
    "validationProcedures": [
      "Gunakan GridSearchCV sebagai objek estimator di dalam pemanggilan cross_val_score.",
      "Latih model akhir pada seluruh dataset dengan hyperparameter hasil tuning inner loop dari fold terbaik atau seleksi ulang global.",
      "Laporkan rata-rata dan deviasi standar skor outer fold untuk menunjukkan stabilitas."
    ],
    "exercises": [
      {
        "question": "Mengapa model akhir yang dideploy ke produksi bukan merupakan salah satu dari K model yang dihasilkan pada outer fold Nested CV?",
        "hint": "Perhatikan tujuan dari masing-masing komponen: evaluasi performa vs produksi model final.",
        "answerExplanation": "Nested CV dirancang secara eksklusif untuk mengestimasi kesalahan generalisasi dari seluruh proses pelatihan secara tidak bias. Untuk model produksi akhir, grid search dijalankan pada 100% data untuk memperoleh hyperparameter terbaik, lalu model dilatih penuh menggunakan konfigurasi tersebut."
      },
      {
        "question": "Jika setiap outer fold memilih kombinasi hyperparameter yang sangat berbeda secara drastis, apa arti ilmiah dari fenomena tersebut?",
        "hint": "Pertimbangkan kestabilan permukaan fungsi loss dan sensitivitas data.",
        "answerExplanation": "Hal itu mengindikasikan bahwa lanskap hyperparameter sangat tidak stabil dan dataset sensitif terhadap perubahan subset kecil, atau ukuran data terlalu sedikit untuk mendukung jumlah hyperparameter yang dicari."
      }
    ],
    "references": [
      {
        "citation": "Varma, S., & Simon, R. (2006). Bias in error estimation when using cross-validation for model selection. BMC Bioinformatics, 7(1), 91.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Cawley, G. C., & Talbot, N. L. (2010). On over-fitting in model selection and subsequent selection bias in performance evaluation. JMLR, 11, 2079-2107.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Nested Cross-Validation untuk Evaluasi Performa yang Tidak Bias terhadap Tuning Hyperparameter",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 5.1.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 5.1.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami mekanisme bias optimisme yang timbul akibat penggabungan seleksi model dan estimasi performa.",
          "Capaian 2: Merancang arsitektur Nested Cross-Validation (K-Fold Luar dan K-Fold Dalam).",
          "Capaian 3: Menginterpretasikan variasi hyperparameter optimal antar fold eksternal sebagai indikator kestabilan arsitektur."
        ],
        "keyFormulaOrDiagram": "$$\\lambda_k^* = \\arg\\max_{\\lambda \\in \\Lambda} \\frac{1}{M} \\sum_{m=1}^M \\text{Score}(f_{\\lambda, D_{\\text{train}}^{(k)} \\setminus D_{m}^{(k)}}, D_{m}^{(k)})$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 5.1.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Nested Cross-Validation untuk Evaluasi Performa yang Tidak Bias terhadap Tuning Hyperparameter",
        "lead": "Dalam literatur rekayasa komputasi, salah satu pelanggaran metodologis yang paling merajalela adalah melaporkan skor akurasi terbaik dari proses grid search hyperparameter sebagai estimasi kesalahan generalisasi model.",
        "bulletPoints": [
          "Pendekatan ini dinamakan evaluasi yang teroptimasi secara parsial (optimistically biased evaluation).",
          "Mengapa CV Standar Menghasilkan Bias Optimisme?",
          "Jika seorang peneliti menjalankan 5-fold cross-validation pada 100 kombinasi hyperparameter yang berbeda dan memilih kombinasi dengan nilai rata-rata tertinggi, skor tersebut bukan lagi estimasi kesalahan generalisasi yang tidak bias."
        ],
        "keyFormulaOrDiagram": "$K_{\\text{outer}}$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Arsitektur Nested Cross-Validation: Untuk memperoleh estimasi performa yang benar-benar tidak bias, proses pemilihan hyperparameter (model selection) wajib dipisahkan secara hierarkis dari proses evaluasi performa (model assessment).",
        "bulletPoints": [
          "1.",
          "Loop Luar (Outer Loop): Bertugas mengestimasi performa generalisasi model akhir."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Algoritma Formal Nested Cross-Validation:",
        "bulletPoints": [
          "Diberikan dataset $D$:",
          "1. Bagi $D$ menjadi $K$ subset disjoin ${D_1, D_2, \\dots, D_K}$.",
          "2. Untuk setiap fold luar $k \\in \\{1, \\dots, K\\}$:"
        ],
        "keyFormulaOrDiagram": "$$\\lambda_k^* = \\arg\\max_{\\lambda \\in \\Lambda} \\frac{1}{M} \\sum_{m=1}^M \\text{Score}(f_{\\lambda, D_{\\text{train}}^{(k)} \\setminus D_{m}^{(k)}}, D_{m}^{(k)})$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Jelaskan perbedaan antara skor CV terbaik dari GridSearchCV biasa dan skor dari Nested CV pada dataset kecil (N=80). Mengapa GridSearchCV biasa cenderung melebih-lebihkan performa hingga 5-10%?",
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
          "Langkah 1: Mekanisme GridSearchCV biasa: 5 fold dievaluasi untuk 50 kombinasi hyperparameter. Konfigurasi terpilih adalah konfigurasi yang menghasilkan skor rata-rata tertinggi di kelima fold tersebut.",
          "Langkah 2: Terjadinya kebocoran seleksi: Informasi dari kelima fold telah digunakan secara bersamaan untuk memilih hyperparameter. Tidak ada data independen tersisa untuk memverifikasi apakah hyperparameter tersebut memang unggul atau hanya beruntung pada keanehan noise data."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Peran Outer Fold Nested CV: Memegang 20% data di luar jangkauan grid search. Konfigurasi terpilih di inner loop diuji pada data yang belum pernah berkontribusi pada keputusan pemilihan hyperparameter.",
          "Langkah 4: Evaluasi empiris: Penelitian Varma & Simon (2006) membuktikan bahwa pada sampel kecil, bias optimisme GridSearchCV biasa berkisar antara 5% hingga 15% dibanding Nested CV.",
          "[result: Interpretasi Ilmiah] Nested CV adalah standar emas obligatori untuk publikasi bereputasi ketika tuning hyperparameter dilakukan pada sampel terbatas."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi Nested Cross-Validation (5x3) menggunakan scikit-learn.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi Nested Cross-Validation (5x3) menggunakan scikit-learn.",
          "Dependensi Pustaka Ilmiah: numpy, sklearn.datasets, sklearn.svm, sklearn.model_selection",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Komparasi Validasi:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Komparasi Validasi:\nNon-Nested CV Score (Terbias Optimis)   : 0.8904\nNested CV Score (Estimasi Tak Bias Riil) : 0.8400 +/- 0.0800\nBesaran Bias Optimisme                  : 0.0504",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Melaporkan best_score_ dari objek GridSearchCV sebagai akurasi klaim publikasi.",
          "[warning: Perangkap] Mengira bahwa model akhir hasil Nested CV adalah rata-rata bobot dari k-model luar.",
          "[warning: Perangkap] Menggunakan random seed yang sama pada inner dan outer loop sehingga lipatan menjadi identik."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan GridSearchCV sebagai objek estimator di dalam pemanggilan cross_val_score.",
          "Prosedur: Latih model akhir pada seluruh dataset dengan hyperparameter hasil tuning inner loop dari fold terbaik atau seleksi ulang global.",
          "Prosedur: Laporkan rata-rata dan deviasi standar skor outer fold untuk menunjukkan stabilitas."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa model akhir yang dideploy ke produksi bukan merupakan salah satu dari K model yang dihasilkan pada outer fold Nested CV?",
          "Petunjuk Analitis: Perhatikan tujuan dari masing-masing komponen: evaluasi performa vs produksi model final.",
          "Solusi Kunci: Nested CV dirancang secara eksklusif untuk mengestimasi kesalahan generalisasi dari seluruh proses pelatihan secara tidak bias. Untuk model produksi akhir, grid search dijalankan pada 100% data untuk memperoleh hyperparameter terbaik, lalu model dilatih penuh menggunakan konfigurasi tersebut."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
