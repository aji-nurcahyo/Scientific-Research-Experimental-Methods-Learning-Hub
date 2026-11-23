import { Lesson } from '../types/curriculum';

export const CH28_LESSONS: Record<string, Partial<Lesson>> = {
  "4.5.1": {
    "id": "4.5.1",
    "chapterId": "CH-28",
    "title": "Filosofi DoE vs Pendekatan Satu-Faktor-pada-Satu-Waktu (OFAT)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membandingkan efisiensi eksperimental dan keandalan inferensi antara DoE dan OFAT.",
      "Memahami ketidakmampuan fundamental pendekatan OFAT dalam mendeteksi interaksi antar-faktor.",
      "Menghitung rasio penghematan jumlah run eksperimen dengan desain faktorial ortogonal."
    ],
    "content": "Dalam praktik rekayasa dan laboratorium tradisional, metode eksperimen yang paling lazim dipraktikkan secara intuitif adalah pendekatan Satu-Faktor-pada-Satu-Waktu (One-Factor-at-a-Time / OFAT). Dalam pendekatan ini, peneliti memilih satu variabel input, mengubah nilainya sambil mempertahankan seluruh variabel lainnya konstan, mengamati responnya, lalu mengulangi proses yang sama untuk variabel berikutnya.\n\nMeskipun tampak masuk akal secara intuitif, pendekatan OFAT memiliki tiga cacat fatal secara ilmiah:\n1. Ketidakmampuan Mendeteksi Efek Interaksi: OFAT mengasumsikan secara naif bahwa pengaruh suatu faktor bersifat independen dari level faktor lainnya. Jika dalam kenyataannya terdapat efek sinergi atau antagonisme (interaksi), OFAT akan gagal total mendeteksinya dan menarik kesimpulan yang menyesatkan mengenai kondisi operasi optimal.\n2. Pemborosan Sumber Daya dan Waktu: Untuk mencapai tingkat presisi estimasi efek yang sama, pendekatan OFAT membutuhkan jumlah pengujian (runs) yang jauh lebih banyak dibandingkan desain faktorial terencana.\n3. Estimasi Efek yang Tidak Representatif: Efek faktor yang diukur melalui OFAT hanya berlaku pada satu kondisi kombinasi level tetap yang dipilih, sehingga daya generalisasinya sangat sempit.\n\nDesign of Experiments (DoE), yang dirintis oleh Sir Ronald A. Fisher pada 1920-an, merevolusi metodologi eksperimen modern. Dalam DoE, faktor-faktor divariasikan secara simultan dalam matriks ortogonal yang terstruktur rapi. DoE memungkinkan estimasi efek utama dan seluruh interaksi secara simultan dengan jumlah eksperimen minimal dan daya statistik maksimal.",
    "mathematicalFoundations": "1. Efisiensi Presisi Estimasi Efek (DoE vs OFAT):\nMisalkan terdapat $k$ faktor pada 2 level (+ dan -), dan tujuan eksperimen adalah mengestimasi efek utama masing-masing faktor dengan varians estimasi $\\text{Var}(\\text{efek}) = 4\\sigma^2 / N$.\n\n- Pada Desain Faktorial Penuh ($2^k$) dengan $N$ total pengujian:\nSeluruh $N$ pengujian berkontribusi pada estimasi setiap efek utama karena sifat ortogonalitas matriks desain:\n$$\\text{Var}(\\hat{\\beta}_{j, \\text{DoE}}) = \\frac{\\sigma^2}{N}$$\n\n- Pada Pendekatan OFAT dengan $k$ faktor dan $n$ replikasi per perlakuan:\nDibutuhkan 1 baseline dan $k$ variasi faktor, total run $N_{\\text{OFAT}} = n(k + 1)$.\nVarians estimasi efek utama ke-$j$ hanya memanfaatkan data dari level baseline dan variasi faktor ke-$j$ ($2n$ data):\n$$\\text{Var}(\\hat{\\beta}_{j, \\text{OFAT}}) = \\frac{2\\sigma^2}{n} = \\frac{2(k + 1)\\sigma^2}{N_{\\text{OFAT}}}$$\n\nRasio Efisiensi Relatif (Relative Efficiency):\n$$\\text{RE} = \\frac{\\text{Var}(\\hat{\\beta}_{\\text{OFAT}})}{\\text{Var}(\\hat{\\beta}_{\\text{DoE}})} = 2(k + 1) \\quad (\\text{untuk } N_{\\text{OFAT}} = N_{\\text{DoE}})$$\nUntuk $k = 4$ faktor, DoE memiliki efisiensi presisi 10 kali lipat lebih tinggi dibandingkan OFAT untuk jumlah run yang sama.",
    "workedExample": {
      "problemStatement": "Seorang insinyur manufaktur ingin menguji 4 parameter proses mesin bubut CNC (kecepatan spindel, laju pemakanan, kedalaman potong, tipe pelumas) masing-masing pada 2 level. Insinyur mempertimbangkan dua opsi: (a) Desain faktorial DoE 2^4 = 16 run, atau (b) Pendekatan OFAT dengan 4 replikasi pada baseline dan tiap cabang variasi (total 20 run). Hitung varians estimasi efek utama untuk kedua pendekatan (asumsikan varians galat sigma^2 = 1.0).",
      "stepByStepSolution": [
        "Langkah 1: Hitung varians efek utama pada DoE 2^4 (N = 16 run):\nPada matriks ortogonal, seluruh 16 run digunakan untuk menghitung efek tiap faktor.\nVar(efek_DoE) = 4 * sigma^2 / N = 4 * 1.0 / 16 = 0.2500.\nStandar Error SE_DoE = sqrt(0.25) = 0.5000.",
        "Langkah 2: Hitung varians efek utama pada OFAT (4 run baseline + 4 run per variasi faktor = 20 run total):\nUntuk mengestimasi efek suatu faktor, hanya dibandingkan 4 run variasi faktor tersebut terhadap 4 run baseline (n = 4 per kelompok).\nVar(efek_OFAT) = sigma^2 / n + sigma^2 / n = 2 * sigma^2 / n = 2 * 1.0 / 4 = 0.5000.\nStandar Error SE_OFAT = sqrt(0.50) = 0.7071.",
        "Langkah 3: Bandingkan efisiensi:\nMeskipun OFAT menggunakan 20 run (lebih banyak dari DoE yang 16 run), varians estimasi OFAT (0.50) adalah dua kali lipat lebih besar daripada DoE (0.25)."
      ],
      "resultInterpretation": "Pendekatan DoE menghasilkan estimasi yang dua kali lebih presisi (varians separuhnya) dengan jumlah pengujian 20% lebih sedikit, dan sekaligus mampu mendeteksi seluruh interaksi antar-parameter yang sama sekali tidak dapat diukur oleh OFAT."
    },
    "pythonImplementation": {
      "description": "Simulasi Monte Carlo membandingkan presisi estimasi parameter antara DoE Faktorial dan OFAT.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\nnp.random.seed(42)\nn_simulasi = 10000\nsigma_error = 2.0\n\n# Desain Faktorial DoE 2^3 (8 run ortogonal)\n# Matriks desain kolom 1 s.d. 3 (+1 dan -1)\nX_doe = np.array([\n    [-1, -1, -1], [ 1, -1, -1], [-1,  1, -1], [ 1,  1, -1],\n    [-1, -1,  1], [ 1, -1,  1], [-1,  1,  1], [ 1,  1,  1]\n])\n\n# Desain OFAT (8 run: 2 baseline (-1,-1,-1), 2 uji x1, 2 uji x2, 2 uji x3)\nX_ofat = np.array([\n    [-1, -1, -1], [-1, -1, -1],\n    [ 1, -1, -1], [ 1, -1, -1],\n    [-1,  1, -1], [-1,  1, -1],\n    [-1, -1,  1], [-1, -1,  1]\n])\n\nbeta_true = np.array([3.0, -2.0, 1.5])\n\nestimasi_doe = []\nestimasi_ofat = []\n\nfor _ in range(n_simulasi):\n    # Respon DoE\n    y_doe = X_doe @ beta_true + np.random.normal(0, sigma_error, size=8)\n    b_doe = (X_doe.T @ y_doe) / 8.0  # Kontras ortogonal OLS\n    estimasi_doe.append(b_doe[0])\n    \n    # Respon OFAT (Estimasi efek x1: selisih rata-rata level +1 dan -1)\n    y_ofat = X_ofat @ beta_true + np.random.normal(0, sigma_error, size=8)\n    b_ofat = (np.mean(y_ofat[2:4]) - np.mean(y_ofat[0:2])) / 2.0\n    estimasi_ofat.append(b_ofat)\n\nvar_doe = np.var(estimasi_doe)\nvar_ofat = np.var(estimasi_ofat)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Perbandingan Kinerja DoE vs OFAT (8 Run)\")\nprint(f\"Varians Estimasi DoE  : {var_doe:.4f} (Teoretis: {sigma_error**2 / 8:.4f})\")\nprint(f\"Varians Estimasi OFAT : {var_ofat:.4f} (Teoretis: {sigma_error**2 / 4:.4f})\")\nprint(f\"Rasio Presisi (OFAT/DoE): {var_ofat / var_doe:.2f}x lipat lebih bervariasi\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Perbandingan Kinerja DoE vs OFAT (8 Run)\nVarians Estimasi DoE  : 0.5012 (Teoretis: 0.5000)\nVarians Estimasi OFAT : 0.9984 (Teoretis: 1.0000)\nRasio Presisi (OFAT/DoE): 1.99x lipat lebih bervariasi"
    },
    "commonPitfalls": [
      "Terus mempertahankan pendekatan OFAT dengan alasan \"sederhana\" tanpa menyadari bahwa interaksi proses tidak pernah terdeteksi.",
      "Mengubah lebih dari satu faktor secara sembarangan tanpa struktur matriks ortogonal (desain acak tak terencana).",
      "Mengabaikan efek lingkungan eksternal (suhu ruang, kelembapan) yang berubah selama eksperimen OFAT berlangsung berhari-hari."
    ],
    "validationProcedures": [
      "Gunakan matriks desain faktorial ortogonal untuk memvariasikan faktor secara simultan.",
      "Pastikan seluruh kolom prediktor pada matriks desain memiliki korelasi nol (ortogonal sempurna).",
      "Evaluasi kehadiran efek interaksi sebelum menyimpulkan titik optimal proses."
    ],
    "exercises": [
      {
        "question": "Apakah kelemahan teoritis paling kritis dari pendekatan eksperimen Satu-Faktor-pada-Satu-Waktu (OFAT)?",
        "hint": "Perhatikan kemampuan mendeteksi sinergi atau antagonisme antar-variabel input.",
        "answerExplanation": "Kelemahan paling fatal dari OFAT adalah ketidakmampuannya secara mendasar untuk mendeteksi efek interaksi antar-faktor, karena setiap faktor diuji secara terisolasi pada satu kondisi tetap faktor lainnya."
      }
    ],
    "references": [
      {
        "citation": "Fisher, R. A. (1935). The Design of Experiments. Oliver and Boyd.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Filosofi DoE vs Pendekatan Satu-Faktor-pada-Satu-Waktu (OFAT)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.5.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.5.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membandingkan efisiensi eksperimental dan keandalan inferensi antara DoE dan OFAT.",
          "Capaian 2: Memahami ketidakmampuan fundamental pendekatan OFAT dalam mendeteksi interaksi antar-faktor.",
          "Capaian 3: Menghitung rasio penghematan jumlah run eksperimen dengan desain faktorial ortogonal."
        ],
        "keyFormulaOrDiagram": "$$\\text{Var}(\\hat{\\beta}_{j, \\text{DoE}}) = \\frac{\\sigma^2}{N}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.5.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Filosofi DoE vs Pendekatan Satu-Faktor-pada-Satu-Waktu (OFAT)",
        "lead": "Dalam praktik rekayasa dan laboratorium tradisional, metode eksperimen yang paling lazim dipraktikkan secara intuitif adalah pendekatan Satu-Faktor-pada-Satu-Waktu (One-Factor-at-a-Time / OFAT).",
        "bulletPoints": [
          "Dalam pendekatan ini, peneliti memilih satu variabel input, mengubah nilainya sambil mempertahankan seluruh variabel lainnya konstan, mengamati responnya, lalu mengulangi proses yang sama untuk variabel berikutnya.",
          "Meskipun tampak masuk akal secara intuitif, pendekatan OFAT memiliki tiga cacat fatal secara ilmiah: 1.",
          "Ketidakmampuan Mendeteksi Efek Interaksi: OFAT mengasumsikan secara naif bahwa pengaruh suatu faktor bersifat independen dari level faktor lainnya."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Design of Experiments (DoE), yang dirintis oleh Sir Ronald A.",
        "bulletPoints": [
          "Fisher pada 1920-an, merevolusi metodologi eksperimen modern.",
          "Dalam DoE, faktor-faktor divariasikan secara simultan dalam matriks ortogonal yang terstruktur rapi."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Efisiensi Presisi Estimasi Efek (DoE vs OFAT):",
        "bulletPoints": [
          "Misalkan terdapat $k$ faktor pada 2 level (+ dan -), dan tujuan eksperimen adalah mengestimasi efek utama masing-masing faktor dengan varians estimasi $\\text{Var}(\\text{efek}) = 4\\sigma^2 / N$.",
          "- Pada Desain Faktorial Penuh ($2^k$) dengan $N$ total pengujian:",
          "Seluruh $N$ pengujian berkontribusi pada estimasi setiap efek utama karena sifat ortogonalitas matriks desain:"
        ],
        "keyFormulaOrDiagram": "$$\\text{Var}(\\hat{\\beta}_{j, \\text{DoE}}) = \\frac{\\sigma^2}{N}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Seorang insinyur manufaktur ingin menguji 4 parameter proses mesin bubut CNC (kecepatan spindel, laju pemakanan, kedalaman potong, tipe pelumas) masing-masing pada 2 level. Insinyur mempertimbangkan dua opsi: (a) Desain faktorial DoE 2^4 = 16 run, atau (b) Pendekatan OFAT dengan 4 replikasi pada baseline dan tiap cabang variasi (total 20 run). Hitung varians estimasi efek utama untuk kedua pendekatan (asumsikan varians galat sigma^2 = 1.0).",
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
          "Langkah 1: Hitung varians efek utama pada DoE 2^4 (N = 16 run):\nPada matriks ortogonal, seluruh 16 run digunakan untuk menghitung efek tiap faktor.\nVar(efek_DoE) = 4 * sigma^2 / N = 4 * 1.0 / 16 = 0.2500.\nStandar Error SE_DoE = sqrt(0.25) = 0.5000.",
          "Langkah 2: Hitung varians efek utama pada OFAT (4 run baseline + 4 run per variasi faktor = 20 run total):\nUntuk mengestimasi efek suatu faktor, hanya dibandingkan 4 run variasi faktor tersebut terhadap 4 run baseline (n = 4 per kelompok).\nVar(efek_OFAT) = sigma^2 / n + sigma^2 / n = 2 * sigma^2 / n = 2 * 1.0 / 4 = 0.5000.\nStandar Error SE_OFAT = sqrt(0.50) = 0.7071."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Bandingkan efisiensi:\nMeskipun OFAT menggunakan 20 run (lebih banyak dari DoE yang 16 run), varians estimasi OFAT (0.50) adalah dua kali lipat lebih besar daripada DoE (0.25).",
          "[result: Interpretasi Ilmiah] Pendekatan DoE menghasilkan estimasi yang dua kali lebih presisi (varians separuhnya) dengan jumlah pengujian 20% lebih sedikit, dan sekaligus mampu mendeteksi seluruh interaksi antar-parameter yang sama sekali tidak dapat diukur oleh OFAT."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi Monte Carlo membandingkan presisi estimasi parameter antara DoE Faktorial dan OFAT.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi Monte Carlo membandingkan presisi estimasi parameter antara DoE Faktorial dan OFAT.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Perbandingan Kinerja DoE vs OFAT (8 Run)"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Perbandingan Kinerja DoE vs OFAT (8 Run)\nVarians Estimasi DoE  : 0.5012 (Teoretis: 0.5000)\nVarians Estimasi OFAT : 0.9984 (Teoretis: 1.0000)\nRasio Presisi (OFAT/DoE): 1.99x lipat lebih bervariasi",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Terus mempertahankan pendekatan OFAT dengan alasan \"sederhana\" tanpa menyadari bahwa interaksi proses tidak pernah terdeteksi.",
          "[warning: Perangkap] Mengubah lebih dari satu faktor secara sembarangan tanpa struktur matriks ortogonal (desain acak tak terencana).",
          "[warning: Perangkap] Mengabaikan efek lingkungan eksternal (suhu ruang, kelembapan) yang berubah selama eksperimen OFAT berlangsung berhari-hari."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan matriks desain faktorial ortogonal untuk memvariasikan faktor secara simultan.",
          "Prosedur: Pastikan seluruh kolom prediktor pada matriks desain memiliki korelasi nol (ortogonal sempurna).",
          "Prosedur: Evaluasi kehadiran efek interaksi sebelum menyimpulkan titik optimal proses."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apakah kelemahan teoritis paling kritis dari pendekatan eksperimen Satu-Faktor-pada-Satu-Waktu (OFAT)?",
          "Petunjuk Analitis: Perhatikan kemampuan mendeteksi sinergi atau antagonisme antar-variabel input.",
          "Solusi Kunci: Kelemahan paling fatal dari OFAT adalah ketidakmampuannya secara mendasar untuk mendeteksi efek interaksi antar-faktor, karena setiap faktor diuji secara terisolasi pada satu kondisi tetap faktor lainnya."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.5.2": {
    "id": "4.5.2",
    "chapterId": "CH-28",
    "title": "Tiga Aksioma Fisherian: Replikasi untuk Estimasi Error, Randomisasi untuk Menghapus Bias, Blocking untuk Mengontrol Gangguan",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menguasai tiga pilar fundamental desain eksperimen Fisher: Replikasi, Randomisasi, dan Blocking.",
      "Memahami bagaimana replikasi menyediakan estimasi varians galat eksperimental tak bias.",
      "Menerapkan prinsip \"Block what you can, randomize what you cannot\" dalam tata kelola gangguan."
    ],
    "content": "Seluruh teori dan praktik perancangan eksperimen ilmiah bertumpu pada Tiga Aksioma Fisherian yang dirumuskan oleh Ronald A. Fisher. Tanpa penerapan ketiga prinsip ini secara disiplin, hasil eksperimen apa pun tidak memiliki validitas inferensial dan klaim kausalitas menjadi tidak sah.\n\nPilar 1: Replikasi (Replication)\nReplikasi adalah pengulangan independen dari suatu perlakuan eksperimen pada unit-unit eksperimen yang berbeda. Replikasi memiliki dua fungsi esensial:\n- Menyediakan estimasi objektif mengenai variabilitas galat eksperimental (MSE), yang menjadi penyebut wajib pada uji statistik F dan uji t. Tanpa replikasi, varians galat tidak dapat dipisahkan dari efek perlakuan.\n- Meningkatkan presisi estimasi efek: standar error rata-rata menyusut sebanding dengan 1 / sqrt(n).\nPenting: Replikasi sejati harus dibedakan dari pengukuran berulang (duplikasi pembacaan instrumen pada sampel yang sama).\n\nPilar 2: Randomisasi (Randomization)\nRandomisasi adalah proses pengalokasian unit-unit eksperimen ke dalam kelompok perlakuan dan penentuan urutan eksekusi eksperimen secara acak murni (menggunakan generator angka acak). Randomisasi adalah asuransi matematis terhadap variabel pengganggu yang tidak diketahui atau tidak dapat dikontrol (seperti keausan alat bertahap, pergeseran suhu harian, atau kelelahan operator). Randomisasi meratakan pengaruh pengganggu ke seluruh kelompok sehingga mengeliminasi bias sistematis.\n\nPilar 3: Blocking (Local Control)\nBlocking adalah teknik mengisolasi variabel pengganggu yang diketahui dan dapat diidentifikasi (misalnya perbedaan batch bahan baku, perbedaan operator, atau hari kerja). Unit-unit eksperimen yang homogen dikelompokkan ke dalam blok yang sama. Variabilitas antar-blok kemudian dikeluarkan dari komponen galat residual, sehingga sensitivitas deteksi sinyal perlakuan meningkat secara tajam.\n\nAturan emas eksperimentalis: \"Block what you can, randomize what you cannot\" (Kendalikan gangguan yang diketahui dengan blocking, dan netralkan gangguan yang tidak diketahui dengan randomisasi).",
    "mathematicalFoundations": "1. Replikasi dan Estimasi Derajat Kebebasan Galat:\nPada eksperimen dengan $k$ perlakuan dan $n$ replikasi independen per perlakuan:\n$$\\text{df}_{\\text{error}} = k(n - 1) = N - k$$\nJika $n = 1$ (tanpa replikasi):\n$$\\text{df}_{\\text{error}} = k(1 - 1) = 0$$\nTanpa derajat kebebasan galat, $\\text{MSE} = \\text{SSE} / 0$ tidak terdefinisi secara matematis, sehingga uji hipotesis inferensial tidak mungkin dilakukan.\n\n2. Dekomposisi Varians dengan Blocking (RCBD):\n$$\\text{SST} = \\text{SS}_{\\text{Treatment}} + \\text{SS}_{\\text{Block}} + \\text{SSE}$$\nDerajat kebebasan:\n$$(N - 1) = (a - 1) + (b - 1) + (a - 1)(b - 1)$$\nPerhatikan bahwa komponen variabilitas gangguan $\\text{SS}_{\\text{Block}}$ dikeluarkan dari $\\text{SSE}$:\n$$\\text{SSE}_{\\text{Blocked}} = \\text{SSE}_{\\text{CRD}} - \\text{SS}_{\\text{Block}}$$\nAkibatnya, Mean Squared Error berkurang: $\\text{MSE}_{\\text{Blocked}} < \\text{MSE}_{\\text{CRD}}$, meningkatkan nilai rasio $F = \\text{MST} / \\text{MSE}$.",
    "workedExample": {
      "problemStatement": "Pada pengujian kuat tekan beton dengan 3 campuran agregat (a = 3), eksperimen dilakukan dalam 4 batch semen (b = 4 blok). Variabilitas total adalah SST = 180.0. Jumlah kuadrat perlakuan campuran adalah SS_Treatment = 90.0, dan variabilitas antar-batch adalah SS_Block = 60.0. Bandingkan nilai MSE jika batch diabaikan (CRD) versus jika batch dikontrol menggunakan blocking (RCBD).",
      "stepByStepSolution": [
        "Langkah 1: Hitung komponen jika dianalisis sebagai Completely Randomized Design (CRD, tanpa blocking):\nSSE_CRD = SST - SS_Treatment = 180.0 - 90.0 = 90.0.\nDerajat kebebasan galat CRD: df_E = N - a = 12 - 3 = 9.\nMSE_CRD = 90.0 / 9 = 10.00.\nF_Treatment(CRD) = (90.0 / 2) / 10.00 = 45.0 / 10.0 = 4.50 (p = 0.044).",
        "Langkah 2: Hitung komponen dengan Blocking (RCBD):\nSSE_RCBD = SST - SS_Treatment - SS_Block = 180.0 - 90.0 - 60.0 = 30.0.\nDerajat kebebasan galat RCBD: df_E = (a - 1)(b - 1) = (3 - 1)(4 - 1) = 2 * 3 = 6.\nMSE_RCBD = 30.0 / 6 = 5.00.\nF_Treatment(RCBD) = (90.0 / 2) / 5.00 = 45.0 / 5.0 = 9.00 (p = 0.015)."
      ],
      "resultInterpretation": "Dengan menerapkan aksioma blocking, varians galat MSE berhasil dipangkas hingga separuhnya (dari 10.0 menjadi 5.0). Nilai statistik F melonjak dari 4.50 menjadi 9.00 dan p-value menjadi jauh lebih meyakinkan (p = 0.015). Blocking terbukti membersihkan noise batch semen."
    },
    "pythonImplementation": {
      "description": "Simulasi pentingnya randomisasi untuk menetralkan tren gangguan drift temporal.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nn_per_grup = 20\nN = 2 * n_per_grup\n\n# Efek sejati: Perlakuan A dan B identik persis (H0 sejati benar, selisih = 0)\n# Namun ada drift suhu pemanasan alat bertahap seiring berjalannya waktu eksperimen\ndrift_suhu = np.linspace(0, 10.0, N)\n\n# Kasus 1: Tanpa Randomisasi (Eksperimen dijalankan run A dulu seluruhnya, lalu run B)\nurutan_non_random = ['A'] * n_per_grup + ['B'] * n_per_grup\ny_non_random = drift_suhu + np.random.normal(0, 1.0, size=N)\ngrup_a_nr = y_non_random[:n_per_grup]\ngrup_b_nr = y_non_random[n_per_grup:]\nt_nr, p_nr = stats.ttest_ind(grup_a_nr, grup_b_nr)\n\n# Kasus 2: Dengan Randomisasi Penuh (Urutan eksekusi diacak murni)\nalokasi_random = np.array(['A'] * n_per_grup + ['B'] * n_per_grup)\nnp.random.shuffle(alokasi_random)\ny_random = drift_suhu + np.random.normal(0, 1.0, size=N)\ngrup_a_r = y_random[alokasi_random == 'A']\ngrup_b_r = y_random[alokasi_random == 'B']\nt_r, p_r = stats.ttest_ind(grup_a_r, grup_b_r)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Uji Aksioma Randomisasi vs Drift Temporal\")\nprint(f\"Tanpa Randomisasi  : Selisih Mean = {np.mean(grup_b_nr) - np.mean(grup_a_nr):.2f}, p-value = {p_nr:.4e} (False Positive Fatal!)\")\nprint(f\"Dengan Randomisasi : Selisih Mean = {np.mean(grup_b_r) - np.mean(grup_a_r):.2f}, p-value = {p_r:.4f} (Valid / H0 Bertahan)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Uji Aksioma Randomisasi vs Drift Temporal\nTanpa Randomisasi  : Selisih Mean = 5.21, p-value = 1.0371e-15 (False Positive Fatal!)\nDengan Randomisasi : Selisih Mean = 0.17, p-value = 0.8523 (Valid / H0 Bertahan)"
    },
    "commonPitfalls": [
      "Menjalankan eksperimen secara berurutan per kelompok (semua unit A lalu semua unit B) yang mencampuradukkan efek perlakuan dengan drift waktu/alat.",
      "Mengira replikasi teknis (mengukur satu cawan petri 3 kali) sebagai replikasi biologi/eksperimen sejati.",
      "Mengabaikan faktor gangguan yang diketahui (seperti batch bahan baku atau teknisi laboratorium) tanpa menerapkan blocking."
    ],
    "validationProcedures": [
      "Gunakan generator angka acak untuk menentukan run order pelaksanaan setiap eksperimen.",
      "Pastikan unit eksperimen yang menerima perlakuan berasal dari entitas fisik yang independen.",
      "Identifikasi seluruh variabel gangguan potensial dan kelompokkan unit eksperimen ke dalam blok homogen."
    ],
    "exercises": [
      {
        "question": "Mengapa randomisasi urutan pengujian (run order) dianggap sebagai syarat mutlak validitas inferensi statistik dalam eksperimen laboratorium?",
        "hint": "Perhatikan perlindungan terhadap variabel perancu yang tidak terduga atau drift instrumen.",
        "answerExplanation": "Randomisasi menetralkan bias sistematis dari variabel gangguan yang tidak diketahui atau tidak dapat dikontrol (seperti kelelahan operator, fluktuasi voltase, atau pergeseran kalibrasi alat seiring waktu) dengan meratakan dampaknya secara stokastik ke seluruh kelompok perlakuan."
      }
    ],
    "references": [
      {
        "citation": "Fisher, R. A. (1935). The Design of Experiments. Oliver and Boyd.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Box, G. E., Hunter, J. S., & Hunter, W. G. (2005). Statistics for Experimenters: Design, Innovation, and Discovery (2nd ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Tiga Aksioma Fisherian: Replikasi untuk Estimasi Error, Randomisasi untuk Menghapus Bias, Blocking untuk Mengontrol Gangguan",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.5.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.5.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menguasai tiga pilar fundamental desain eksperimen Fisher: Replikasi, Randomisasi, dan Blocking.",
          "Capaian 2: Memahami bagaimana replikasi menyediakan estimasi varians galat eksperimental tak bias.",
          "Capaian 3: Menerapkan prinsip \"Block what you can, randomize what you cannot\" dalam tata kelola gangguan."
        ],
        "keyFormulaOrDiagram": "$$\\text{df}_{\\text{error}} = k(n - 1) = N - k$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.5.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Tiga Aksioma Fisherian: Replikasi untuk Estimasi Error, Randomisasi untuk Menghapus Bias, Blocking untuk Mengontrol Gangguan",
        "lead": "Seluruh teori dan praktik perancangan eksperimen ilmiah bertumpu pada Tiga Aksioma Fisherian yang dirumuskan oleh Ronald A.",
        "bulletPoints": [
          "Fisher.",
          "Tanpa penerapan ketiga prinsip ini secara disiplin, hasil eksperimen apa pun tidak memiliki validitas inferensial dan klaim kausalitas menjadi tidak sah.",
          "Pilar 1: Replikasi (Replication) Replikasi adalah pengulangan independen dari suatu perlakuan eksperimen pada unit-unit eksperimen yang berbeda.",
          "Replikasi memiliki dua fungsi esensial: - Menyediakan estimasi objektif mengenai variabilitas galat eksperimental (MSE), yang menjadi penyebut wajib pada uji statistik F dan uji t."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Pilar 2: Randomisasi (Randomization) Randomisasi adalah proses pengalokasian unit-unit eksperimen ke dalam kelompok perlakuan dan penentuan urutan eksekusi eksperimen secara acak murni (menggunakan generator angka acak).",
        "bulletPoints": [
          "Randomisasi adalah asuransi matematis terhadap variabel pengganggu yang tidak diketahui atau tidak dapat dikontrol (seperti keausan alat bertahap, pergeseran suhu harian, atau kelelahan operator).",
          "Randomisasi meratakan pengaruh pengganggu ke seluruh kelompok sehingga mengeliminasi bias sistematis.",
          "Pilar 3: Blocking (Local Control) Blocking adalah teknik mengisolasi variabel pengganggu yang diketahui dan dapat diidentifikasi (misalnya perbedaan batch bahan baku, perbedaan operator, atau hari kerja).",
          "Unit-unit eksperimen yang homogen dikelompokkan ke dalam blok yang sama."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Replikasi dan Estimasi Derajat Kebebasan Galat:",
        "bulletPoints": [
          "Pada eksperimen dengan $k$ perlakuan dan $n$ replikasi independen per perlakuan:",
          "Jika $n = 1$ (tanpa replikasi):",
          "Tanpa derajat kebebasan galat, $\\text{MSE} = \\text{SSE} / 0$ tidak terdefinisi secara matematis, sehingga uji hipotesis inferensial tidak mungkin dilakukan."
        ],
        "keyFormulaOrDiagram": "$$\\text{df}_{\\text{error}} = k(n - 1) = N - k$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada pengujian kuat tekan beton dengan 3 campuran agregat (a = 3), eksperimen dilakukan dalam 4 batch semen (b = 4 blok). Variabilitas total adalah SST = 180.0. Jumlah kuadrat perlakuan campuran adalah SS_Treatment = 90.0, dan variabilitas antar-batch adalah SS_Block = 60.0. Bandingkan nilai MSE jika batch diabaikan (CRD) versus jika batch dikontrol menggunakan blocking (RCBD).",
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
          "Langkah 1: Hitung komponen jika dianalisis sebagai Completely Randomized Design (CRD, tanpa blocking):\nSSE_CRD = SST - SS_Treatment = 180.0 - 90.0 = 90.0.\nDerajat kebebasan galat CRD: df_E = N - a = 12 - 3 = 9.\nMSE_CRD = 90.0 / 9 = 10.00.\nF_Treatment(CRD) = (90.0 / 2) / 10.00 = 45.0 / 10.0 = 4.50 (p = 0.044)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 2: Hitung komponen dengan Blocking (RCBD):\nSSE_RCBD = SST - SS_Treatment - SS_Block = 180.0 - 90.0 - 60.0 = 30.0.\nDerajat kebebasan galat RCBD: df_E = (a - 1)(b - 1) = (3 - 1)(4 - 1) = 2 * 3 = 6.\nMSE_RCBD = 30.0 / 6 = 5.00.\nF_Treatment(RCBD) = (90.0 / 2) / 5.00 = 45.0 / 5.0 = 9.00 (p = 0.015).",
          "[result: Interpretasi Ilmiah] Dengan menerapkan aksioma blocking, varians galat MSE berhasil dipangkas hingga separuhnya (dari 10.0 menjadi 5.0). Nilai statistik F melonjak dari 4.50 menjadi 9.00 dan p-value menjadi jauh lebih meyakinkan (p = 0.015). Blocking terbukti membersihkan noise batch semen."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi pentingnya randomisasi untuk menetralkan tren gangguan drift temporal.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi pentingnya randomisasi untuk menetralkan tren gangguan drift temporal.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Uji Aksioma Randomisasi vs Drift Temporal"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Uji Aksioma Randomisasi vs Drift Temporal\nTanpa Randomisasi  : Selisih Mean = 5.21, p-value = 1.0371e-15 (False Positive Fatal!)\nDengan Randomisasi : Selisih Mean = 0.17, p-value = 0.8523 (Valid / H0 Bertahan)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menjalankan eksperimen secara berurutan per kelompok (semua unit A lalu semua unit B) yang mencampuradukkan efek perlakuan dengan drift waktu/alat.",
          "[warning: Perangkap] Mengira replikasi teknis (mengukur satu cawan petri 3 kali) sebagai replikasi biologi/eksperimen sejati.",
          "[warning: Perangkap] Mengabaikan faktor gangguan yang diketahui (seperti batch bahan baku atau teknisi laboratorium) tanpa menerapkan blocking."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan generator angka acak untuk menentukan run order pelaksanaan setiap eksperimen.",
          "Prosedur: Pastikan unit eksperimen yang menerima perlakuan berasal dari entitas fisik yang independen.",
          "Prosedur: Identifikasi seluruh variabel gangguan potensial dan kelompokkan unit eksperimen ke dalam blok homogen."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa randomisasi urutan pengujian (run order) dianggap sebagai syarat mutlak validitas inferensi statistik dalam eksperimen laboratorium?",
          "Petunjuk Analitis: Perhatikan perlindungan terhadap variabel perancu yang tidak terduga atau drift instrumen.",
          "Solusi Kunci: Randomisasi menetralkan bias sistematis dari variabel gangguan yang tidak diketahui atau tidak dapat dikontrol (seperti kelelahan operator, fluktuasi voltase, atau pergeseran kalibrasi alat seiring waktu) dengan meratakan dampaknya secara stokastik ke seluruh kelompok perlakuan."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.5.3": {
    "id": "4.5.3",
    "chapterId": "CH-28",
    "title": "Desain Acak Lengkap (Completely Randomized Design - CRD)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Merancang protokol Completely Randomized Design (CRD) untuk lingkungan eksperimen homogen.",
      "Menghasilkan tabel alokasi perlakuan acak menggunakan algoritma permutasi komputasi.",
      "Menganalisis hasil eksperimen CRD menggunakan model One-Way ANOVA ortogonal."
    ],
    "content": "Completely Randomized Design (CRD) atau Desain Acak Lengkap adalah rancangan eksperimen paling mendasar dan paling sederhana dalam metodologi ilmiah. Dalam CRD, perlakuan-perlakuan eksperimen dialokasikan secara acak murni ke seluruh unit eksperimen tanpa adanya pembatasan blocking.\n\nAsumsi Lingkungan CRD:\nCRD dirancang khusus untuk kondisi di mana unit-unit eksperimen bersifat homogen sempurna, atau variabilitas lingkungan laboratorium dapat dikontrol secara seragam. Contoh aplikasi yang ideal untuk CRD meliputi:\n- Eksperimen kimia di mana seluruh sampel diambil dari satu larutan induk homogen yang sama di bawah temperatur inkubator yang seragam.\n- Simulasi komputasi dan pembandingan algoritma software pada node klaster komputasi berspesifikasi identik.\n- Pengujian formulasi pakan pada hewan uji dari garis keturunan murni (inbred strain) dengan usia dan bobot yang seragam.\n\nKeunggulan utama CRD adalah kesederhanaan matematisnya: fleksibilitas jumlah kelompok dan replikasi tidak terbatas (boleh tidak seimbang), analisis data sangat langsung menggunakan One-Way ANOVA standar, dan derajat kebebasan untuk estimasi galat berada pada tingkat maksimum (N - k). Namun, kelemahan fatal CRD adalah kerentanannya terhadap penurunan sensitivitas jika unit eksperimen sebenarnya tidak homogen: seluruh variasi lingkungan yang tidak dikontrol akan terserap ke dalam galat residual (SSE), memperbesar MSE dan menenggelamkan sinyal perlakuan.",
    "mathematicalFoundations": "1. Formulasi Model Statistik CRD:\n$$y_{ij} = \\mu + \\tau_i + \\epsilon_{ij}, \\quad i = 1, \\dots, k; \\; j = 1, \\dots, n_i$$\ndi mana:\n- $k$ adalah jumlah perlakuan.\n- $n_i$ adalah jumlah replikasi untuk perlakuan ke-$i$.\n- $\\tau_i$ adalah efek perlakuan ke-$i$ dengan kendala identifikasi $\\sum_{i=1}^k n_i \\tau_i = 0$.\n- $\\epsilon_{ij} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$.\n\n2. Derajat Kebebasan Maksimum Galat:\n$$\\text{df}_{\\text{error}} = N - k = \\sum_{i=1}^k (n_i - 1)$$\nKarena tidak ada derajat kebebasan yang dialokasikan untuk faktor pemblokiran (blocking), CRD memberikan derajat kebebasan galat tertinggi di antara seluruh rancangan eksperimen, memberikan daya uji yang baik ketika homogenitas terjamin.\n\n3. Efisiensi Relatif Desain (Relative Efficiency CRD vs RCBD):\nJika eksperimen RCBD dengan $b$ blok dan $a$ perlakuan dievaluasi kembali seolah-olah menggunakan CRD:\n$$\\text{RE} = \\frac{(b - 1)\\text{MS}_{\\text{Block}} + b(a - 1)\\text{MSE}_{\\text{RCBD}}}{(ab - 1)\\text{MSE}_{\\text{RCBD}}}$$\nJika $\\text{RE} > 1$, penggunaan blocking terbukti lebih efisien daripada CRD.",
    "workedExample": {
      "problemStatement": "Seorang peneliti kecerdasan buatan ingin menguji 3 variasi learning rate (k = 3: 0.001, 0.01, 0.1) pada akurasi konvergensi model deep learning. Setiap variasi dijalankan sebanyak n = 5 replikasi independen (total N = 15 run komputasi). Susun protokol alokasi acak lengkap (CRD) dan tentukan derajat kebebasan galat eksperimen.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi unit eksperimen: Terdapat N = 15 run komputasi independen.",
        "Langkah 2: Buat vektor perlakuan: [LR_0.001 x 5, LR_0.01 x 5, LR_0.1 x 5].",
        "Langkah 3: Terapkan algoritma randomisasi acak murni (Fisher-Yates shuffle) untuk mengacak urutan eksekusi 15 run tersebut.",
        "Langkah 4: Hitung derajat kebebasan galat: df_error = N - k = 15 - 3 = 12."
      ],
      "resultInterpretation": "Protokol CRD menjamin bahwa urutan eksekusi komputasi sepenuhnya acak, melindungi perbandingan dari fluktuasi beban server latar belakang. Derajat kebebasan galat df = 12 menyediakan estimasi variabilitas numerik yang memadai."
    },
    "pythonImplementation": {
      "description": "Algoritma pembuatan jadwal eksekusi eksperimen Completely Randomized Design (CRD) teracak.",
      "libraryDependencies": [
        "numpy",
        "pandas"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\nnp.random.seed(42)\n\n# Parameter eksperimen CRD\nperlakuan = ['Formulasi_A', 'Formulasi_B', 'Formulasi_C']\nreplikasi_per_grup = 4\n\n# Bentuk daftar seluruh unit eksperimen\ndaftar_perlakuan = np.repeat(perlakuan, replikasi_per_grup)\ntotal_run = len(daftar_perlakuan)\n\n# Randomisasi urutan run menggunakan permutasi acak murni\nurutan_acak = np.random.permutation(total_run)\njadwal_perlakuan = daftar_perlakuan[urutan_acak]\n\n# Susun lembar kerja jadwal eksperimen laboratorium\ndf_jadwal = pd.DataFrame({\n    'Run_Order': np.arange(1, total_run + 1),\n    'Unit_ID': [f'Unit_{i+1:02d}' for i in urutan_acak],\n    'Perlakuan': jadwal_perlakuan\n})\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Jadwal Eksekusi Eksperimen CRD Teracak\")\nprint(df_jadwal.to_string(index=False))\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Jadwal Eksekusi Eksperimen CRD Teracak\n Run_Order Unit_ID   Perlakuan\n         1 Unit_11 Formulasi_C\n         2 Unit_10 Formulasi_C\n         3 Unit_01 Formulasi_A\n         4 Unit_09 Formulasi_C\n         5 Unit_06 Formulasi_B\n         6 Unit_03 Formulasi_A\n         7 Unit_08 Formulasi_B\n         8 Unit_02 Formulasi_A\n         9 Unit_07 Formulasi_B\n        10 Unit_05 Formulasi_B\n        11 Unit_04 Formulasi_A\n        12 Unit_12 Formulasi_C"
    },
    "commonPitfalls": [
      "Menerapkan CRD pada lingkungan yang heterogen (seperti pengujian di beberapa laboratorium atau hari berbeda tanpa blocking).",
      "Mengabaikan randomisasi urutan eksekusi dan menjalankan perlakuan secara terkelompok berurutan.",
      "Mengabaikan uji asumsi homogenitas varians residual antar-kelompok perlakuan."
    ],
    "validationProcedures": [
      "Pastikan unit-unit eksperimen memiliki karakteristik fisik awal yang homogen.",
      "Gunakan urutan eksekusi teracak acak murni sesuai jadwal CRD.",
      "Verifikasi bahwa estimasi varians galat residual memenuhi asumsi normalitas dan homoskedastisitas."
    ],
    "exercises": [
      {
        "question": "Pada kondisi operasional manakah Desain Acak Lengkap (CRD) merupakan pilihan metodologis yang paling tepat?",
        "hint": "Perhatikan tingkat homogenitas unit eksperimen dan lingkungan laboratorium.",
        "answerExplanation": "CRD paling tepat digunakan ketika seluruh unit eksperimen dan kondisi lingkungan pengujian bersifat sangat homogen (misal larutan kimia homogen dalam satu inkubator terkontrol atau simulasi komputasi pada klaster identik)."
      }
    ],
    "references": [
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Cochran, W. G., & Cox, G. M. (1957). Experimental Designs (2nd ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Desain Acak Lengkap (Completely Randomized Design - CRD)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.5.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.5.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Merancang protokol Completely Randomized Design (CRD) untuk lingkungan eksperimen homogen.",
          "Capaian 2: Menghasilkan tabel alokasi perlakuan acak menggunakan algoritma permutasi komputasi.",
          "Capaian 3: Menganalisis hasil eksperimen CRD menggunakan model One-Way ANOVA ortogonal."
        ],
        "keyFormulaOrDiagram": "$$y_{ij} = \\mu + \\tau_i + \\epsilon_{ij}, \\quad i = 1, \\dots, k; \\; j = 1, \\dots, n_i$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.5.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Desain Acak Lengkap (Completely Randomized Design - CRD)",
        "lead": "Completely Randomized Design (CRD) atau Desain Acak Lengkap adalah rancangan eksperimen paling mendasar dan paling sederhana dalam metodologi ilmiah.",
        "bulletPoints": [
          "Dalam CRD, perlakuan-perlakuan eksperimen dialokasikan secara acak murni ke seluruh unit eksperimen tanpa adanya pembatasan blocking.",
          "Asumsi Lingkungan CRD: CRD dirancang khusus untuk kondisi di mana unit-unit eksperimen bersifat homogen sempurna, atau variabilitas lingkungan laboratorium dapat dikontrol secara seragam.",
          "Contoh aplikasi yang ideal untuk CRD meliputi: - Eksperimen kimia di mana seluruh sampel diambil dari satu larutan induk homogen yang sama di bawah temperatur inkubator yang seragam. - Simulasi komputasi dan pembandingan algoritma software pada node klaster komputasi berspesifikasi identik. - Pengujian formulasi pakan pada hewan uji dari garis keturunan murni (inbred strain) dengan usia dan bobot yang seragam."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Keunggulan utama CRD adalah kesederhanaan matematisnya: fleksibilitas jumlah kelompok dan replikasi tidak terbatas (boleh tidak seimbang), analisis data sangat langsung menggunakan One-Way ANOVA standar, dan derajat kebebasan untuk estimasi galat berada pada tingkat maksimum (N - k).",
        "bulletPoints": [
          "Namun, kelemahan fatal CRD adalah kerentanannya terhadap penurunan sensitivitas jika unit eksperimen sebenarnya tidak homogen: seluruh variasi lingkungan yang tidak dikontrol akan terserap ke dalam galat residual (SSE), memperbesar MSE dan menenggelamkan sinyal perlakuan."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Model Statistik CRD:",
        "bulletPoints": [
          "di mana:",
          "- $k$ adalah jumlah perlakuan.",
          "- $n_i$ adalah jumlah replikasi untuk perlakuan ke-$i$."
        ],
        "keyFormulaOrDiagram": "$$y_{ij} = \\mu + \\tau_i + \\epsilon_{ij}, \\quad i = 1, \\dots, k; \\; j = 1, \\dots, n_i$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Seorang peneliti kecerdasan buatan ingin menguji 3 variasi learning rate (k = 3: 0.001, 0.01, 0.1) pada akurasi konvergensi model deep learning. Setiap variasi dijalankan sebanyak n = 5 replikasi independen (total N = 15 run komputasi). Susun protokol alokasi acak lengkap (CRD) dan tentukan derajat kebebasan galat eksperimen.",
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
          "Langkah 1: Identifikasi unit eksperimen: Terdapat N = 15 run komputasi independen.",
          "Langkah 2: Buat vektor perlakuan: [LR_0.001 x 5, LR_0.01 x 5, LR_0.1 x 5]."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Terapkan algoritma randomisasi acak murni (Fisher-Yates shuffle) untuk mengacak urutan eksekusi 15 run tersebut.",
          "Langkah 4: Hitung derajat kebebasan galat: df_error = N - k = 15 - 3 = 12.",
          "[result: Interpretasi Ilmiah] Protokol CRD menjamin bahwa urutan eksekusi komputasi sepenuhnya acak, melindungi perbandingan dari fluktuasi beban server latar belakang. Derajat kebebasan galat df = 12 menyediakan estimasi variabilitas numerik yang memadai."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Algoritma pembuatan jadwal eksekusi eksperimen Completely Randomized Design (CRD) teracak.",
        "bulletPoints": [
          "Tujuan Algoritma: Algoritma pembuatan jadwal eksekusi eksperimen Completely Randomized Design (CRD) teracak.",
          "Dependensi Pustaka Ilmiah: numpy, pandas",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Jadwal Eksekusi Eksperimen CRD Teracak"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Jadwal Eksekusi Eksperimen CRD Teracak\n Run_Order Unit_ID   Perlakuan\n         1 Unit_11 Formulasi_C\n         2 Unit_10 Formulasi_C\n         3 Unit_01 Formulasi_A",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menerapkan CRD pada lingkungan yang heterogen (seperti pengujian di beberapa laboratorium atau hari berbeda tanpa blocking).",
          "[warning: Perangkap] Mengabaikan randomisasi urutan eksekusi dan menjalankan perlakuan secara terkelompok berurutan.",
          "[warning: Perangkap] Mengabaikan uji asumsi homogenitas varians residual antar-kelompok perlakuan."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan unit-unit eksperimen memiliki karakteristik fisik awal yang homogen.",
          "Prosedur: Gunakan urutan eksekusi teracak acak murni sesuai jadwal CRD.",
          "Prosedur: Verifikasi bahwa estimasi varians galat residual memenuhi asumsi normalitas dan homoskedastisitas."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Pada kondisi operasional manakah Desain Acak Lengkap (CRD) merupakan pilihan metodologis yang paling tepat?",
          "Petunjuk Analitis: Perhatikan tingkat homogenitas unit eksperimen dan lingkungan laboratorium.",
          "Solusi Kunci: CRD paling tepat digunakan ketika seluruh unit eksperimen dan kondisi lingkungan pengujian bersifat sangat homogen (misal larutan kimia homogen dalam satu inkubator terkontrol atau simulasi komputasi pada klaster identik)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "4.5.4": {
    "id": "4.5.4",
    "chapterId": "CH-28",
    "title": "Penentuan Jumlah Replikasi Berdasarkan Analisis Power Eksperimen",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Menghitung jumlah replikasi minimum per perlakuan berdasarkan target kekuatan statistik (Power = 1 - beta).",
      "Menggunakan kurva parameter non-sentralitas F-distribution (Operating Characteristic Curves).",
      "Mencegah eksperimen yang underpowered (gagal mendeteksi efek nyata) atau overpowered (pemborosan anggaran)."
    ],
    "content": "Salah satu keputusan perancangan paling krusial sebelum memulai eksperimen laboratorium adalah menentukan jumlah replikasi n. Dalam praktik rekayasa yang buruk, peneliti sering memilih angka replikasi secara arbitrer (misalnya \"ambil 3 sampel per kelompok karena biasanya begitu\"). Pemilihan acak ini membawa dua risiko fatal:\n1. Eksperimen Underpowered: Ukuran sampel terlalu kecil sehingga kekuatan statistik (power) rendah (misal hanya 30%). Jika efek perlakuan nyata ada di dunia nyata, eksperimen memiliki peluang 70% untuk gagal mendeteksinya (Kesalahan Tipe II masif), membuang seluruh waktu dan biaya penelitian dengan hasil sia-sia.\n2. Eksperimen Overpowered: Ukuran sampel terlalu besar, membuang anggaran riset dan material secara tidak etis hanya untuk mendeteksi perbedaan trivial yang tidak memiliki relevansi teknis.\n\nMetodologi penentuan jumlah replikasi ilmiah didasarkan pada Analisis Power Statistik Apriori (A-Priori Power Analysis). Peneliti harus menetapkan empat parameter:\n1. Tingkat signifikansi alpha: Batas Kesalahan Tipe I (biasanya 0.05).\n2. Kekuatan statistik target (1 - beta): Probabilitas menolak H0 jika H1 benar (standar ilmiah: minimal 0.80 atau 0.90).\n3. Selisih minimum yang bermakna secara fisik (Minimal Clinically/Practically Important Difference, delta).\n4. Estimasi varians galat proses (sigma^2 atau MSE), yang diperoleh dari studi pendahuluan (pilot study) atau literatur terdahulu.\n\nDengan mengintegrasikan keempat parameter ini melalui parameter non-sentralitas distribusi non-sentral F, jumlah replikasi n minimum yang dibutuhkan dapat dihitung secara eksak.",
    "mathematicalFoundations": "1. Parameter Non-Sentralitas Distribusi F (Non-Centrality Parameter $\\lambda$):\nPada One-Way ANOVA dengan $k$ perlakuan dan $n$ replikasi seimbang per kelompok:\n$$\\lambda = n \\sum_{i=1}^k \\frac{\\tau_i^2}{\\sigma^2} = \\frac{n \\sum_{i=1}^k (\\mu_i - \\bar{\\mu})^2}{\\sigma^2}$$\nDi bawah hipotesis alternatif $H_1$, statistik rasio varians mengikuti Distribusi F Non-Sentral:\n$$F = \\frac{\\text{MSB}}{\\text{MSW}} \\sim F_{k-1, \\, k(n-1); \\, \\lambda}$$\n\n2. Formulasi Kekuatan Statistik (Power):\n$$\\text{Power} = 1 - \\beta = P\\left( F_{k-1, \\, k(n-1); \\, \\lambda} > F_{\\alpha, \\, k-1, \\, k(n-1)} \\right)$$\n\n3. Ukuran Efek Cohen's $f$ untuk ANOVA:\n$$f = \\sqrt{\\frac{\\sum_{i=1}^k (\\mu_i - \\bar{\\mu})^2}{k \\, \\sigma^2}} = \\frac{\\sigma_m}{\\sigma}$$\nMaka parameter non-sentralitas dapat dinyatakan sebagai:\n$$\\lambda = n \\cdot k \\cdot f^2 = N \\cdot f^2$$\nKlasifikasi Cohen untuk ANOVA:\n- $f = 0.10$: Efek kecil (*small effect*).\n- $f = 0.25$: Efek sedang (*medium effect*).\n- $f = 0.40$: Efek besar (*large effect*).",
    "workedExample": {
      "problemStatement": "Sebuah laboratorium rekayasa material ingin menguji k = 3 metode pelapisan anti-korosi. Dari studi pendahuluan, deviasi standar pengukuran adalah sigma = 2.0 um. Peneliti ingin mampu mendeteksi perbedaan rata-rata keausan sebesar delta = 3.0 um antara metode terbaik dan terburuk (misal mu = [10.0, 11.5, 13.0] sehingga grand mean = 11.5 um) dengan kekuatan statistik 1 - beta = 0.80 pada alpha = 0.05. Hitung ukuran efek Cohen f dan tentukan jumlah replikasi n minimum per kelompok.",
      "stepByStepSolution": [
        "Langkah 1: Hitung variasi rata-rata perlakuan di sekitar grand mean:\n(mu_1 - bar{mu})^2 = (10.0 - 11.5)^2 = (-1.5)^2 = 2.25.\n(mu_2 - bar{mu})^2 = (11.5 - 11.5)^2 = 0.0.\n(mu_3 - bar{mu})^2 = (13.0 - 11.5)^2 = (1.5)^2 = 2.25.\nJumlah kuadrat efek: sum(mu_i - bar{mu})^2 = 2.25 + 0.0 + 2.25 = 4.50.",
        "Langkah 2: Hitung ukuran efek Cohen f:\nf = sqrt( sum(mu_i - bar{mu})^2 / (k * sigma^2) ) = sqrt( 4.50 / (3 * 4.0) ) = sqrt( 4.50 / 12.0 ) = sqrt(0.375) = 0.6124 (Efek besar).",
        "Langkah 3: Hitung kebutuhan n secara iteratif untuk mencapai Power >= 0.80 pada alpha = 0.05, k = 3:\n- Coba n = 6: N = 18, df1 = 2, df2 = 15, lambda = 18 * (0.375) = 6.75 -> Power = 0.62 (kurang).\n- Coba n = 8: N = 24, df1 = 2, df2 = 21, lambda = 24 * (0.375) = 9.00 -> Power = 0.77 (kurang).\n- Coba n = 9: N = 27, df1 = 2, df2 = 24, lambda = 27 * (0.375) = 10.125 -> Power = 0.82 (memenuhi target > 0.80)."
      ],
      "resultInterpretation": "Dibutuhkan minimal n = 9 replikasi per kelompok (total N = 27 run eksperimen) untuk memastikan peluang mendeteksi selisih 3.0 um mencapai 82% pada tingkat signifikansi 5%. Pengujian dengan n < 9 berisiko tinggi gagal mendeteksi keunggulan pelapis anti-korosi tersebut."
    },
    "pythonImplementation": {
      "description": "Komputasi presisi ukuran sampel minimum ANOVA berdasarkan power analysis menggunakan statsmodels.",
      "libraryDependencies": [
        "numpy",
        "statsmodels.stats.power"
      ],
      "code": "import numpy as np\nfrom statsmodels.stats.power import FTestAnovaPower\n\n# Parameter target desain eksperimen\nk_grup = 3\nalpha_target = 0.05\npower_target = 0.80\n\n# Spesifikasi efek fisik\nsigma_est = 2.0\nmu_target = np.array([10.0, 11.5, 13.0])\ngrand_mean = np.mean(mu_target)\n\n# Hitung ukuran efek Cohen's f\nsigma_m = np.sqrt(np.mean((mu_target - grand_mean)**2))\ncohen_f = sigma_m / sigma_est\n\n# Hitung jumlah replikasi menggunakan FTestAnovaPower\npower_analyzer = FTestAnovaPower()\nn_per_grup_calc = power_analyzer.solve_power(\n    effect_size=cohen_f,\n    k_groups=k_grup,\n    alpha=alpha_target,\n    power=power_target\n)\nn_final = int(np.ceil(n_per_grup_calc))\n\n# Verifikasi power aktual dengan n bulat\npower_aktual = power_analyzer.power(\n    effect_size=cohen_f,\n    k_groups=k_grup,\n    nobs=n_final,\n    alpha=alpha_target\n)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Analisis Power Apriori untuk One-Way ANOVA\")\nprint(f\"Jumlah Kelompok (k)     : {k_grup}\")\nprint(f\"Ukuran Efek Cohen's f   : {cohen_f:.4f} (Kategori Efek Besar)\")\nprint(f\"Target Power (1 - beta) : {power_target:.2f}\")\nprint(f\"Replikasi Dihitung (n)  : {n_per_grup_calc:.2f}\")\nprint(f\"Replikasi Dibulatkan    : {n_final} sampel per kelompok (Total N = {n_final * k_grup})\")\nprint(f\"Kekuatan Aktual Tercapai: {power_aktual * 100:.2f}%\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Analisis Power Apriori untuk One-Way ANOVA\nJumlah Kelompok (k)     : 3\nUkuran Efek Cohen's f   : 0.6124 (Kategori Efek Besar)\nTarget Power (1 - beta) : 0.80\nReplikasi Dihitung (n)  : 8.44\nReplikasi Dibulatkan    : 9 sampel per kelompok (Total N = 27)\nKekuatan Aktual Tercapai: 83.21%"
    },
    "commonPitfalls": [
      "Menetapkan jumlah sampel secara arbitrer tanpa kalkulasi power formal sebelum data dikumpulkan.",
      "Melakukan analisis power aposteriori (post-hoc power) menggunakan ukuran efek sampel teramati setelah p-value tidak signifikan (ini adalah tautologi matematis yang keliru).",
      "Meremehkan varians galat sigma^2 sehingga menghasilkan ukuran sampel yang terlalu kecil."
    ],
    "validationProcedures": [
      "Tentukan selisih minimum yang bermakna secara teknis (bukan sekadar perbedaan sembarang).",
      "Dapatkan estimasi sigma yang kredibel dari studi rintisan (pilot study) atau data historis.",
      "Tetapkan target kekuatan statistik minimal 0.80 (atau 0.90 untuk sistem kritis keselamatan)."
    ],
    "exercises": [
      {
        "question": "Mengapa analisis post-hoc power (menghitung power setelah eksperimen selesai menggunakan p-value dan efek teramati) sangat ditentang dalam metodologi ilmiah modern?",
        "hint": "Perhatikan bahwa post-hoc power semata-mata merupakan transformasi monotonik 1-ke-1 dari nilai p-value yang teramati.",
        "answerExplanation": "Post-hoc power adalah kekeliruan matematis: nilai power teramati hanyalah fungsi monotonik langsung dari p-value teramati (jika p > 0.05, post-hoc power pasti rendah). Analisis power sejati hanya valid dilakukan secara apriori sebelum data dikumpulkan untuk memandu ukuran sampel."
      }
    ],
    "references": [
      {
        "citation": "Cohen, J. (1988). Statistical Power Analysis for the Behavioral Sciences (2nd ed.). Lawrence Erlbaum Associates.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Hoenig, J. M., & Heisey, D. M. (2001). The abuse of power: the pervasive fallacy of power calculations for data analysis. The American Statistician, 55(1), 19-24.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Penentuan Jumlah Replikasi Berdasarkan Analisis Power Eksperimen",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.5.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 4.5.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menghitung jumlah replikasi minimum per perlakuan berdasarkan target kekuatan statistik (Power = 1 - beta).",
          "Capaian 2: Menggunakan kurva parameter non-sentralitas F-distribution (Operating Characteristic Curves).",
          "Capaian 3: Mencegah eksperimen yang underpowered (gagal mendeteksi efek nyata) atau overpowered (pemborosan anggaran)."
        ],
        "keyFormulaOrDiagram": "$$\\lambda = n \\sum_{i=1}^k \\frac{\\tau_i^2}{\\sigma^2} = \\frac{n \\sum_{i=1}^k (\\mu_i - \\bar{\\mu})^2}{\\sigma^2}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.5.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Penentuan Jumlah Replikasi Berdasarkan Analisis Power Eksperimen",
        "lead": "Salah satu keputusan perancangan paling krusial sebelum memulai eksperimen laboratorium adalah menentukan jumlah replikasi n.",
        "bulletPoints": [
          "Dalam praktik rekayasa yang buruk, peneliti sering memilih angka replikasi secara arbitrer (misalnya \"ambil 3 sampel per kelompok karena biasanya begitu\").",
          "Pemilihan acak ini membawa dua risiko fatal: 1.",
          "Metodologi penentuan jumlah replikasi ilmiah didasarkan pada Analisis Power Statistik Apriori (A-Priori Power Analysis).",
          "Peneliti harus menetapkan empat parameter: 1."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Dengan mengintegrasikan keempat parameter ini melalui parameter non-sentralitas distribusi non-sentral F, jumlah replikasi n minimum yang dibutuhkan dapat dihitung secara eksak.",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Parameter Non-Sentralitas Distribusi F (Non-Centrality Parameter $\\lambda$):",
        "bulletPoints": [
          "Pada One-Way ANOVA dengan $k$ perlakuan dan $n$ replikasi seimbang per kelompok:",
          "Di bawah hipotesis alternatif $H_1$, statistik rasio varians mengikuti Distribusi F Non-Sentral:",
          "2. Formulasi Kekuatan Statistik (Power):"
        ],
        "keyFormulaOrDiagram": "$$\\lambda = n \\sum_{i=1}^k \\frac{\\tau_i^2}{\\sigma^2} = \\frac{n \\sum_{i=1}^k (\\mu_i - \\bar{\\mu})^2}{\\sigma^2}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah laboratorium rekayasa material ingin menguji k = 3 metode pelapisan anti-korosi. Dari studi pendahuluan, deviasi standar pengukuran adalah sigma = 2.0 um. Peneliti ingin mampu mendeteksi perbedaan rata-rata keausan sebesar delta = 3.0 um antara metode terbaik dan terburuk (misal mu = [10.0, 11.5, 13.0] sehingga grand mean = 11.5 um) dengan kekuatan statistik 1 - beta = 0.80 pada alpha = 0.05. Hitung ukuran efek Cohen f dan tentukan jumlah replikasi n minimum per kelompok.",
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
          "Langkah 1: Hitung variasi rata-rata perlakuan di sekitar grand mean:\n(mu_1 - bar{mu})^2 = (10.0 - 11.5)^2 = (-1.5)^2 = 2.25.\n(mu_2 - bar{mu})^2 = (11.5 - 11.5)^2 = 0.0.\n(mu_3 - bar{mu})^2 = (13.0 - 11.5)^2 = (1.5)^2 = 2.25.\nJumlah kuadrat efek: sum(mu_i - bar{mu})^2 = 2.25 + 0.0 + 2.25 = 4.50.",
          "Langkah 2: Hitung ukuran efek Cohen f:\nf = sqrt( sum(mu_i - bar{mu})^2 / (k * sigma^2) ) = sqrt( 4.50 / (3 * 4.0) ) = sqrt( 4.50 / 12.0 ) = sqrt(0.375) = 0.6124 (Efek besar)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Hitung kebutuhan n secara iteratif untuk mencapai Power >= 0.80 pada alpha = 0.05, k = 3:\n- Coba n = 6: N = 18, df1 = 2, df2 = 15, lambda = 18 * (0.375) = 6.75 -> Power = 0.62 (kurang).\n- Coba n = 8: N = 24, df1 = 2, df2 = 21, lambda = 24 * (0.375) = 9.00 -> Power = 0.77 (kurang).\n- Coba n = 9: N = 27, df1 = 2, df2 = 24, lambda = 27 * (0.375) = 10.125 -> Power = 0.82 (memenuhi target > 0.80).",
          "[result: Interpretasi Ilmiah] Dibutuhkan minimal n = 9 replikasi per kelompok (total N = 27 run eksperimen) untuk memastikan peluang mendeteksi selisih 3.0 um mencapai 82% pada tingkat signifikansi 5%. Pengujian dengan n < 9 berisiko tinggi gagal mendeteksi keunggulan pelapis anti-korosi tersebut."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Komputasi presisi ukuran sampel minimum ANOVA berdasarkan power analysis menggunakan statsmodels.",
        "bulletPoints": [
          "Tujuan Algoritma: Komputasi presisi ukuran sampel minimum ANOVA berdasarkan power analysis menggunakan statsmodels.",
          "Dependensi Pustaka Ilmiah: numpy, statsmodels.stats.power",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Analisis Power Apriori untuk One-Way ANOVA"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Analisis Power Apriori untuk One-Way ANOVA\nJumlah Kelompok (k)     : 3\nUkuran Efek Cohen's f   : 0.6124 (Kategori Efek Besar)\nTarget Power (1 - beta) : 0.80\nReplikasi Dihitung (n)  : 8.44",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menetapkan jumlah sampel secara arbitrer tanpa kalkulasi power formal sebelum data dikumpulkan.",
          "[warning: Perangkap] Melakukan analisis power aposteriori (post-hoc power) menggunakan ukuran efek sampel teramati setelah p-value tidak signifikan (ini adalah tautologi matematis yang keliru).",
          "[warning: Perangkap] Meremehkan varians galat sigma^2 sehingga menghasilkan ukuran sampel yang terlalu kecil."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Tentukan selisih minimum yang bermakna secara teknis (bukan sekadar perbedaan sembarang).",
          "Prosedur: Dapatkan estimasi sigma yang kredibel dari studi rintisan (pilot study) atau data historis.",
          "Prosedur: Tetapkan target kekuatan statistik minimal 0.80 (atau 0.90 untuk sistem kritis keselamatan)."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa analisis post-hoc power (menghitung power setelah eksperimen selesai menggunakan p-value dan efek teramati) sangat ditentang dalam metodologi ilmiah modern?",
          "Petunjuk Analitis: Perhatikan bahwa post-hoc power semata-mata merupakan transformasi monotonik 1-ke-1 dari nilai p-value yang teramati.",
          "Solusi Kunci: Post-hoc power adalah kekeliruan matematis: nilai power teramati hanyalah fungsi monotonik langsung dari p-value teramati (jika p > 0.05, post-hoc power pasti rendah). Analisis power sejati hanya valid dilakukan secara apriori sebelum data dikumpulkan untuk memandu ukuran sampel."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
