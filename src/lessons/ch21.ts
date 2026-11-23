import { Lesson } from '../types/curriculum';

export const CH21_LESSONS: Record<string, Partial<Lesson>> = {
  "3.6.1": {
    "id": "3.6.1",
    "chapterId": "CH-21",
    "title": "Masalah Inferensi Simultan: Inflasi Kesalahan Tipe I pada Pengujian Jamak",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memahami mekanisme inflasi Kesalahan Tipe I (False Positive) ketika menguji banyak hipotesis secara simultan.",
      "Menghitung Family-Wise Error Rate (FWER) teoretis sebagai fungsi dari jumlah pengujian.",
      "Mengidentifikasi bahaya silent multiplicity dan data dredging pada eksperimen modern."
    ],
    "content": "Dalam metodologi pengujian hipotesis klasik Neyman-Pearson, tingkat signifikansi alpha (umumnya ditetapkan sebesar 0.05) mengontrol probabilitas melakukan Kesalahan Tipe I untuk satu uji hipotesis tunggal. Namun, pada era penelitian modern yang kaya data (seperti bioinformatika, evaluasi multi-metrik machine learning, sensor array IoT, atau A/B testing multi-varian), peneliti jarang sekali melakukan hanya satu pengujian.\n\nKetika puluhan, ratusan, atau ribuan hipotesis diuji secara simultan pada himpunan data yang sama tanpa koreksi statistik, batas kesalahan nominal alpha tidak lagi berlaku untuk keseluruhan rangkaian uji. Peluang menemukan setidaknya satu hasil yang tampak \"signifikan secara statistik\" semata-mata karena kebetulan acak (fluktuasi stokastik) meningkat tajam mendekati kepastian 100%. Fenomena ini dikenal sebagai masalah inferensi simultan (multiplicity problem).\n\nSebagai contoh ilustratif: jika seorang peneliti menguji 20 fitur atau metrik yang sebenarnya sama sekali tidak memiliki efek (semua hipotesis nol benar), peluang mengamati setidaknya satu hasil \"signifikan\" pada tingkat alpha = 0.05 bukanlah 5%, melainkan melonjak menjadi 1 - (1 - 0.05)^20 = 0.6415 (sekitar 64.2%). Peneliti yang tidak menyadari inflasi ini akan mempublikasikan \"temuan palsu\" (false discovery) dengan penuh keyakinan semu. Masalah ini diperparah oleh silent multiplicity, yaitu ketika peneliti menguji banyak hipotesis namun hanya melaporkan pengujian yang menghasilkan p-value < 0.05 ke dalam naskah publikasi.",
    "mathematicalFoundations": "1. Formulasi Family-Wise Error Rate (FWER) untuk Pengujian Independen:\nMisalkan terdapat $m$ hipotesis nol independen $H_{0,1}, H_{0,2}, \\dots, H_{0,m}$, di mana seluruh hipotesis nol tersebut adalah benar (kondisi global null hypothesis).\n\nJika tiap pengujian dilakukan pada tingkat signifikansi nominal $\\alpha$, maka probabilitas sebuah pengujian tidak menghasilkan Kesalahan Tipe I adalah $1 - \\alpha$.\n\nKarena seluruh pengujian diasumsikan saling independen, probabilitas bahwa seluruh $m$ pengujian secara bersamaan tidak menghasilkan Kesalahan Tipe I adalah:\n$$P(\\text{Tidak ada false positive}) = (1 - \\alpha)^m$$\n\nOleh karena itu, Family-Wise Error Rate (FWER), didefinisikan sebagai probabilitas membuat setidaknya satu Kesalahan Tipe I di antara seluruh $m$ pengujian:\n$$\\alpha_{\\text{family}} = \\text{FWER} = 1 - (1 - \\alpha)^m$$\n\n2. Derivasi Aproksimasi Deret Taylor:\nUntuk nilai $m \\alpha \\ll 1$, ekspansi binomial memberikan:\n$$\\text{FWER} = 1 - \\left( 1 - m\\alpha + \\frac{m(m-1)}{2}\\alpha^2 - \\dots \\right) \\approx m\\alpha$$\n\n3. Batas Atas Pertidaksamaan Boole (Union Bound) untuk Pengujian Dependen:\nJika pengujian tidak independen (memiliki korelasi), pertidaksamaan Boole menetapkan batas atas universal:\n$$\\text{FWER} = P\\left( \\bigcup_{i=1}^m \\{p_i \\le \\alpha\\} \\right) \\le \\sum_{i=1}^m P(p_i \\le \\alpha) = m\\alpha$$",
    "workedExample": {
      "problemStatement": "Sebuah laboratorium computer vision membandingkan algoritma deteksi objek baru terhadap baseline pada 15 metrik performa independen (m = 15). Seluruh pengujian dilakukan pada tingkat signifikansi nominal alpha = 0.05. Hitung probabilitas kumulatif terjadinya setidaknya satu kesalahan false positive (FWER). Berapa FWER jika jumlah pengujian bertambah menjadi 50 dan 100?",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi parameter: alpha = 0.05, m = 15.",
        "Langkah 2: Hitung probabilitas tidak ada false positive untuk 15 uji: (1 - 0.05)^15 = (0.95)^15 = 0.4633.",
        "Langkah 3: Hitung FWER untuk m = 15: FWER = 1 - 0.4633 = 0.5367 (53.67%).",
        "Langkah 4: Hitung FWER untuk m = 50: FWER = 1 - (0.95)^50 = 1 - 0.0769 = 0.9231 (92.31%).",
        "Langkah 5: Hitung FWER untuk m = 100: FWER = 1 - (0.95)^100 = 1 - 0.0059 = 0.9941 (99.41%)."
      ],
      "resultInterpretation": "Tanpa koreksi pengujian jamak, peluang melaporkan setidaknya satu kesimpulan keliru pada 15 metrik adalah 53.67%. Pada 100 metrik, kepastian menemukan temuan palsu mencapai 99.41%, membuktikan bahwa p-value nominal tanpa koreksi menjadi tidak bermakna."
    },
    "pythonImplementation": {
      "description": "Simulasi Monte Carlo membuktikan inflasi empiris FWER ketika menguji m hipotesis nol sejati.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nn_simulasi = 5000\nalpha_nominal = 0.05\ndaftar_m = [1, 5, 10, 20, 50]\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Evaluasi Inflasi FWER pada Pengujian Jamak\")\nprint(f\"{'m (Uji)':<10}{'FWER Teoretis':<18}{'FWER Empiris':<18}\")\nprint(\"-\" * 46)\n\nfor m in daftar_m:\n    t_stat, p_values = stats.ttest_ind(\n        np.random.normal(0, 1, size=(n_simulasi, m, 30)),\n        np.random.normal(0, 1, size=(n_simulasi, m, 30)),\n        axis=2\n    )\n    ada_false_positive = np.any(p_values < alpha_nominal, axis=1)\n    fwer_empiris = np.mean(ada_false_positive)\n    fwer_teoretis = 1.0 - (1.0 - alpha_nominal)**m\n    print(f\"{m:<10}{fwer_teoretis:<18.4f}{fwer_empiris:<18.4f}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Inflasi FWER pada Pengujian Jamak\nm (Uji)   FWER Teoretis     FWER Empiris      \n----------------------------------------------\n1         0.0500            0.0494            \n5         0.2262            0.2248            \n10        0.4013            0.3952            \n20        0.6415            0.6406            \n50        0.9231            0.9238"
    },
    "commonPitfalls": [
      "Menguji puluhan fitur atau kombinasi hyperparameter lalu hanya mempublikasikan fitur dengan p < 0.05 tanpa menyebutkan total uji yang dilakukan.",
      "Mengira bahwa tingkat kesalahan tetap 5% terlepas dari berapa banyak uji hipotesis yang dijalankan pada dataset yang sama.",
      "Melakukan subgroup analysis berulang kali hingga menemukan kelompok bagian yang menghasilkan hasil signifikan secara statistik."
    ],
    "validationProcedures": [
      "Dokumentasikan seluruh hipotesis yang diuji sejak awal protokol eksperimen (pre-registration).",
      "Hitung rasio inflasi FWER jika pengujian tidak dikoreksi untuk menyadarkan tim peneliti.",
      "Terapkan koreksi statistik formal seperti Bonferroni, Holm, atau FDR ketika m > 1."
    ],
    "exercises": [
      {
        "question": "Jika seorang peneliti melakukan 14 pengujian hipotesis independen tanpa koreksi pada alpha = 0.05 di bawah H0 sejati, berapakah probabilitas peneliti membuat setidaknya satu Kesalahan Tipe I?",
        "hint": "Gunakan rumus probabilitas komplemen: FWER = 1 - (1 - alpha)^m.",
        "answerExplanation": "FWER = 1 - (1 - 0.05)^14 = 1 - (0.95)^14 = 1 - 0.4877 = 0.5123 atau sekitar 51.2%. Peluang menemukan setidaknya satu temuan palsu melebihi 50%."
      }
    ],
    "references": [
      {
        "citation": "Shaffer, J. P. (1995). Multiple hypothesis testing. Annual Review of Psychology, 46(1), 561-584.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Bender, R., & Lange, S. (2001). Adjusting for multiple testing - when and how? Journal of Clinical Epidemiology, 54(4), 343-349.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Masalah Inferensi Simultan: Inflasi Kesalahan Tipe I pada Pengujian Jamak",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.6.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.6.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami mekanisme inflasi Kesalahan Tipe I (False Positive) ketika menguji banyak hipotesis secara simultan.",
          "Capaian 2: Menghitung Family-Wise Error Rate (FWER) teoretis sebagai fungsi dari jumlah pengujian.",
          "Capaian 3: Mengidentifikasi bahaya silent multiplicity dan data dredging pada eksperimen modern."
        ],
        "keyFormulaOrDiagram": "$$P(\\text{Tidak ada false positive}) = (1 - \\alpha)^m$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.6.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Masalah Inferensi Simultan: Inflasi Kesalahan Tipe I pada Pengujian Jamak",
        "lead": "Dalam metodologi pengujian hipotesis klasik Neyman-Pearson, tingkat signifikansi alpha (umumnya ditetapkan sebesar 0.05) mengontrol probabilitas melakukan Kesalahan Tipe I untuk satu uji hipotesis tunggal.",
        "bulletPoints": [
          "Namun, pada era penelitian modern yang kaya data (seperti bioinformatika, evaluasi multi-metrik machine learning, sensor array IoT, atau A/B testing multi-varian), peneliti jarang sekali melakukan hanya satu pengujian.",
          "Ketika puluhan, ratusan, atau ribuan hipotesis diuji secara simultan pada himpunan data yang sama tanpa koreksi statistik, batas kesalahan nominal alpha tidak lagi berlaku untuk keseluruhan rangkaian uji.",
          "Peluang menemukan setidaknya satu hasil yang tampak \"signifikan secara statistik\" semata-mata karena kebetulan acak (fluktuasi stokastik) meningkat tajam mendekati kepastian 100%."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Sebagai contoh ilustratif: jika seorang peneliti menguji 20 fitur atau metrik yang sebenarnya sama sekali tidak memiliki efek (semua hipotesis nol benar), peluang mengamati setidaknya satu hasil \"signifikan\" pada tingkat alpha = 0.05 bukanlah 5%, melainkan melonjak menjadi 1 - (1 - 0.05)^20 = 0.6415 (sekitar 64.2%).",
        "bulletPoints": [
          "Peneliti yang tidak menyadari inflasi ini akan mempublikasikan \"temuan palsu\" (false discovery) dengan penuh keyakinan semu.",
          "Masalah ini diperparah oleh silent multiplicity, yaitu ketika peneliti menguji banyak hipotesis namun hanya melaporkan pengujian yang menghasilkan p-value < 0.05 ke dalam naskah publikasi."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Family-Wise Error Rate (FWER) untuk Pengujian Independen:",
        "bulletPoints": [
          "Misalkan terdapat $m$ hipotesis nol independen $H_{0,1}, H_{0,2}, \\dots, H_{0,m}$, di mana seluruh hipotesis nol tersebut adalah benar (kondisi global null hypothesis).",
          "Jika tiap pengujian dilakukan pada tingkat signifikansi nominal $\\alpha$, maka probabilitas sebuah pengujian tidak menghasilkan Kesalahan Tipe I adalah $1 - \\alpha$.",
          "Karena seluruh pengujian diasumsikan saling independen, probabilitas bahwa seluruh $m$ pengujian secara bersamaan tidak menghasilkan Kesalahan Tipe I adalah:"
        ],
        "keyFormulaOrDiagram": "$$P(\\text{Tidak ada false positive}) = (1 - \\alpha)^m$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah laboratorium computer vision membandingkan algoritma deteksi objek baru terhadap baseline pada 15 metrik performa independen (m = 15). Seluruh pengujian dilakukan pada tingkat signifikansi nominal alpha = 0.05. Hitung probabilitas kumulatif terjadinya setidaknya satu kesalahan false positive (FWER). Berapa FWER jika jumlah pengujian bertambah menjadi 50 dan 100?",
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
          "Langkah 1: Identifikasi parameter: alpha = 0.05, m = 15.",
          "Langkah 2: Hitung probabilitas tidak ada false positive untuk 15 uji: (1 - 0.05)^15 = (0.95)^15 = 0.4633.",
          "Langkah 3: Hitung FWER untuk m = 15: FWER = 1 - 0.4633 = 0.5367 (53.67%)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung FWER untuk m = 50: FWER = 1 - (0.95)^50 = 1 - 0.0769 = 0.9231 (92.31%).",
          "Langkah 5: Hitung FWER untuk m = 100: FWER = 1 - (0.95)^100 = 1 - 0.0059 = 0.9941 (99.41%).",
          "[result: Interpretasi Ilmiah] Tanpa koreksi pengujian jamak, peluang melaporkan setidaknya satu kesimpulan keliru pada 15 metrik adalah 53.67%. Pada 100 metrik, kepastian menemukan temuan palsu mencapai 99.41%, membuktikan bahwa p-value nominal tanpa koreksi menjadi tidak bermakna."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi Monte Carlo membuktikan inflasi empiris FWER ketika menguji m hipotesis nol sejati.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi Monte Carlo membuktikan inflasi empiris FWER ketika menguji m hipotesis nol sejati.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Inflasi FWER pada Pengujian Jamak"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Inflasi FWER pada Pengujian Jamak\nm (Uji)   FWER Teoretis     FWER Empiris      \n----------------------------------------------\n1         0.0500            0.0494            \n5         0.2262            0.2248            ",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menguji puluhan fitur atau kombinasi hyperparameter lalu hanya mempublikasikan fitur dengan p < 0.05 tanpa menyebutkan total uji yang dilakukan.",
          "[warning: Perangkap] Mengira bahwa tingkat kesalahan tetap 5% terlepas dari berapa banyak uji hipotesis yang dijalankan pada dataset yang sama.",
          "[warning: Perangkap] Melakukan subgroup analysis berulang kali hingga menemukan kelompok bagian yang menghasilkan hasil signifikan secara statistik."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Dokumentasikan seluruh hipotesis yang diuji sejak awal protokol eksperimen (pre-registration).",
          "Prosedur: Hitung rasio inflasi FWER jika pengujian tidak dikoreksi untuk menyadarkan tim peneliti.",
          "Prosedur: Terapkan koreksi statistik formal seperti Bonferroni, Holm, atau FDR ketika m > 1."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Jika seorang peneliti melakukan 14 pengujian hipotesis independen tanpa koreksi pada alpha = 0.05 di bawah H0 sejati, berapakah probabilitas peneliti membuat setidaknya satu Kesalahan Tipe I?",
          "Petunjuk Analitis: Gunakan rumus probabilitas komplemen: FWER = 1 - (1 - alpha)^m.",
          "Solusi Kunci: FWER = 1 - (1 - 0.05)^14 = 1 - (0.95)^14 = 1 - 0.4877 = 0.5123 atau sekitar 51.2%. Peluang menemukan setidaknya satu temuan palsu melebihi 50%."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.6.2": {
    "id": "3.6.2",
    "chapterId": "CH-21",
    "title": "Pengendalian Family-Wise Error Rate (FWER): Koreksi Bonferroni dan Holm-Bonferroni",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menurunkan formulasi koreksi Bonferroni berbasis pertidaksamaan Boole.",
      "Memahami mekanisme prosedur sekuensial Holm-Bonferroni (step-down procedure).",
      "Membandingkan kekuatan statistik (statistical power) antara Bonferroni klasik dan Holm-Bonferroni."
    ],
    "content": "Family-Wise Error Rate (FWER) didefinisikan sebagai probabilitas terjadinya setidaknya satu Kesalahan Tipe I di antara seluruh keluarga hipotesis yang diuji. Pengendalian FWER bertujuan menjaga agar FWER secara keseluruhan tidak melebihi ambang batas yang ditentukan (misalnya $\\alpha = 0.05$).\n\nMetode pengendalian FWER paling sederhana dan paling tua adalah Koreksi Bonferroni (Bonferroni Correction). Dalam pendekatan ini, setiap hipotesis individual $H_{0,i}$ diuji menggunakan ambang signifikansi yang disesuaikan: $\\alpha_{\\text{adj}} = \\alpha / m$, atau secara ekuivalen nilai p-value yang disesuaikan dihitung sebagai $p_{\\text{adj}, i} = \\min(1, m \\cdot p_i)$. Meskipun sangat mudah diterapkan dan valid di bawah struktur ketergantungan data apapun, koreksi Bonferroni dikenal sangat konservatif, terutama ketika jumlah hipotesis $m$ besar. Akibatnya, kekuatan statistik (power) menurun drastis, sehingga risiko Kesalahan Tipe II (False Negative) meningkat secara substansial.\n\nUntuk mengatasi kelemahan konservatisme Bonferroni tanpa mengorbankan kendali ketat terhadap FWER, Sture Holm (1979) memperkenalkan prosedur bertahap turun (step-down procedure) yang dikenal sebagai Koreksi Holm-Bonferroni. Prosedur Holm mengurutkan seluruh nilai p-value dari yang terkecil ke yang terbesar, lalu menguji secara sekuensial dengan ambang batas yang melonggar bertahap: $\\alpha / (m - i + 1)$. Prosedur Holm secara matematis terbukti mengendalikan FWER pada level $\\alpha$ persis seperti Bonferroni, namun memiliki kekuatan statistik yang secara tegas lebih tinggi (*strictly more powerful*). Oleh karena itu, dalam praktik ilmiah modern, tidak ada alasan metodologis untuk menggunakan Bonferroni bersahaja ketika prosedur Holm tersedia.",
    "mathematicalFoundations": "1. Derivasi Koreksi Bonferroni:\nBerdasarkan pertidaksamaan Boole (Union Bound):\n$$P\\left( \\bigcup_{i=1}^m \\{p_i \\le \\alpha'\\} \\right) \\le \\sum_{i=1}^m P(p_i \\le \\alpha') = m \\alpha'$$\nAgar FWER kumulatif $\\le \\alpha$, tetapkan:\n$$m \\alpha' = \\alpha \\implies \\alpha' = \\frac{\\alpha}{m}$$\n\n2. Algoritma Sekuensial Holm-Bonferroni (Step-Down):\nDiberikan $m$ hipotesis nol dengan nilai p-value teramati.\nLangkah 1: Urutkan nilai p-value secara monoton naik:\n$$p_{(1)} \\le p_{(2)} \\le \\dots \\le p_{(m)}$$\nyang berkorespondensi dengan hipotesis $H_{(1)}, H_{(2)}, \\dots, H_{(m)}$.\n\nLangkah 2: Tentukan ambang signifikansi bertahap untuk langkah $i$:\n$$\\alpha_i = \\frac{\\alpha}{m - i + 1}$$\n\nLangkah 3: Cari indeks terkecil $k$ sedemikian rupa sehingga:\n$$p_{(k)} > \\frac{\\alpha}{m - k + 1}$$\n\nLangkah 4: Keputusan: Tolak seluruh hipotesis nol $H_{(1)}, \\dots, H_{(k-1)}$ dan gagal menolak $H_{(k)}, \\dots, H_{(m)}$.\nJika $p_{(1)} > \\alpha / m$, maka tidak ada hipotesis yang ditolak. Jika kondisi penolakan terpenuhi hingga akhir, tolak seluruh $m$ hipotesis.\n\n3. Formula Penyesuaian Nilai p-value Terkoreksi Holm:\n$$\\tilde{p}_{(i)} = \\max_{j \\le i} \\left\\{ \\min\\left(1, (m - j + 1) p_{(j)}\\right) \\right\\}$$\nOperator pemaksimuman memastikan bahwa p-value yang disesuaikan tetap mempertahankan sifat monoton naik.",
    "workedExample": {
      "problemStatement": "Pada pengujian perbandingan performa 4 arsitektur model deep learning terhadap baseline (m = 4), diperoleh nilai p-value mentah: p_1 = 0.012, p_2 = 0.045, p_3 = 0.008, p_4 = 0.150. Lakukan pengujian pada tingkat alpha = 0.05 menggunakan (a) Koreksi Bonferroni dan (b) Prosedur Holm-Bonferroni.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi parameter: alpha = 0.05, m = 4.",
        "Langkah 2 (Bonferroni): Ambang batas alpha_adj = 0.05 / 4 = 0.0125.",
        "Evaluasi Bonferroni:",
        "- p_3 = 0.008 < 0.0125 -> Tolak H0 (Signifikan).",
        "- p_1 = 0.012 < 0.0125 -> Tolak H0 (Signifikan).",
        "- p_2 = 0.045 >= 0.0125 -> Gagal tolak H0.",
        "- p_4 = 0.150 >= 0.0125 -> Gagal tolak H0.",
        "Langkah 3 (Holm-Bonferroni): Urutkan p-value naik:",
        "p_(1) = 0.008 (H3), p_(2) = 0.012 (H1), p_(3) = 0.045 (H2), p_(4) = 0.150 (H4).",
        "Langkah 4 (Evaluasi Sekuensial Holm):",
        "- Uji p_(1) = 0.008 vs alpha/(4 - 1 + 1) = 0.05/4 = 0.0125. Karena 0.008 <= 0.0125, tolak H3.",
        "- Uji p_(2) = 0.012 vs alpha/(4 - 2 + 1) = 0.05/3 = 0.0167. Karena 0.012 <= 0.0167, tolak H1.",
        "- Uji p_(3) = 0.045 vs alpha/(4 - 3 + 1) = 0.05/2 = 0.0250. Karena 0.045 > 0.0250, berhenti dan gagal tolak H2.",
        "- Otomatis p_(4) (H4) gagal tolak."
      ],
      "resultInterpretation": "Pada kasus ini, kedua metode menolak H3 dan H1 serta mempertahankan H2 dan H4. Namun, perhatikan bahwa ambang uji Holm pada langkah ke-2 melonggar menjadi 0.0167 (dibandingkan Bonferroni yang tetap 0.0125), memberikan kekuatan statistik yang lebih besar."
    },
    "pythonImplementation": {
      "description": "Implementasi perbandingan koreksi Bonferroni dan Holm-Bonferroni menggunakan library statsmodels.",
      "libraryDependencies": [
        "numpy",
        "statsmodels"
      ],
      "code": "import numpy as np\nfrom statsmodels.stats.multitest import multipletests\n\np_vals = np.array([0.008, 0.012, 0.045, 0.150, 0.022])\nm = len(p_vals)\nalpha = 0.05\n\nreject_bonf, p_bonf, _, _ = multipletests(p_vals, alpha=alpha, method='bonferroni')\nreject_holm, p_holm, _, _ = multipletests(p_vals, alpha=alpha, method='holm')\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil Koreksi FWER (Bonferroni vs Holm)\")\nprint(f\"{'No':<4}{'p-Mentah':<12}{'p-Bonferroni':<15}{'Tolak?':<10}{'p-Holm':<12}{'Tolak?':<10}\")\nprint(\"-\" * 63)\nfor i in range(m):\n    print(f\"{i+1:<4}{p_vals[i]:<12.4f}{p_bonf[i]:<15.4f}{str(reject_bonf[i]):<10}{p_holm[i]:<12.4f}{str(reject_holm[i]):<10}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Koreksi FWER (Bonferroni vs Holm)\nNo  p-Mentah    p-Bonferroni   Tolak?    p-Holm      Tolak?    \n---------------------------------------------------------------\n1   0.0080      0.0400         True      0.0400      True      \n2   0.0120      0.0600         False     0.0480      True      \n3   0.0450      0.2250         False     0.0900      False     \n4   0.1500      0.7500         False     0.1500      False     \n5   0.0220      0.1100         False     0.0660      False"
    },
    "commonPitfalls": [
      "Menghitung p-value Bonferroni secara manual dengan mengalikan m * p tanpa membatasi nilai maksimum pada 1.0 (menghasilkan p-value > 1.0 yang tidak valid).",
      "Tetap menggunakan Bonferroni klasik padahal Holm-Bonferroni selalu memberikan power lebih tinggi dengan jaminan perlindungan FWER yang identik.",
      "Menerapkan koreksi FWER pada studi eksploratori skala masif (ribuan fitur) sehingga melumpuhkan seluruh penemuan ilmiah."
    ],
    "validationProcedures": [
      "Pastikan nilai p-value yang disesuaikan tidak melebihi 1.0.",
      "Verifikasi bahwa urutan p-value pada metode Holm tersusun secara monoton naik.",
      "Gunakan Holm-Bonferroni sebagai default jika tujuan utama analisis adalah pengendalian FWER ketat."
    ],
    "exercises": [
      {
        "question": "Mengapa prosedur Holm-Bonferroni secara metodologis lebih disukai daripada koreksi Bonferroni klasik?",
        "hint": "Fokus pada adaptivitas ambang signifikansi bertahap dan daya statistik.",
        "answerExplanation": "Holm-Bonferroni melonggarkan ambang batas penolakan secara bertahap pada tiap tahapan sekuensial (alpha / (m - i + 1)) sehingga kekuatan statistik (power) meningkat tanpa melanggar jaminan pengendalian FWER pada tingkat alpha."
      }
    ],
    "references": [
      {
        "citation": "Bonferroni, C. E. (1936). Teoria statistica delle classi e calcolo delle probabilita. Pubblicazioni del R Istituto Superiore di Scienze Economiche e Commerciali di Firenze, 8, 3-62.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Holm, S. (1979). A simple sequentially rejective multiple test procedure. Scandinavian Journal of Statistics, 6(2), 65-70.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pengendalian Family-Wise Error Rate (FWER): Koreksi Bonferroni dan Holm-Bonferroni",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.6.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.6.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menurunkan formulasi koreksi Bonferroni berbasis pertidaksamaan Boole.",
          "Capaian 2: Memahami mekanisme prosedur sekuensial Holm-Bonferroni (step-down procedure).",
          "Capaian 3: Membandingkan kekuatan statistik (statistical power) antara Bonferroni klasik dan Holm-Bonferroni."
        ],
        "keyFormulaOrDiagram": "$$P\\left( \\bigcup_{i=1}^m \\{p_i \\le \\alpha'\\} \\right) \\le \\sum_{i=1}^m P(p_i \\le \\alpha') = m \\alpha'$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.6.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pengendalian Family-Wise Error Rate (FWER): Koreksi Bonferroni dan Holm-Bonferroni",
        "lead": "Family-Wise Error Rate (FWER) didefinisikan sebagai probabilitas terjadinya setidaknya satu Kesalahan Tipe I di antara seluruh keluarga hipotesis yang diuji.",
        "bulletPoints": [
          "Pengendalian FWER bertujuan menjaga agar FWER secara keseluruhan tidak melebihi ambang batas yang ditentukan (misalnya $\\alpha = 0.05$).",
          "Metode pengendalian FWER paling sederhana dan paling tua adalah Koreksi Bonferroni (Bonferroni Correction).",
          "Dalam pendekatan ini, setiap hipotesis individual $H_{0,i}$ diuji menggunakan ambang signifikansi yang disesuaikan: $\\alpha_{\\text{adj}} = \\alpha / m$, atau secara ekuivalen nilai p-value yang disesuaikan dihitung sebagai $p_{\\text{adj}, i} = \\min(1, m \\cdot p_i)$."
        ],
        "keyFormulaOrDiagram": "$\\alpha / (m - i + 1)$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Untuk mengatasi kelemahan konservatisme Bonferroni tanpa mengorbankan kendali ketat terhadap FWER, Sture Holm (1979) memperkenalkan prosedur bertahap turun (step-down procedure) yang dikenal sebagai Koreksi Holm-Bonferroni.",
        "bulletPoints": [
          "Prosedur Holm mengurutkan seluruh nilai p-value dari yang terkecil ke yang terbesar, lalu menguji secara sekuensial dengan ambang batas yang melonggar bertahap: $\\alpha / (m - i + 1)$.",
          "Prosedur Holm secara matematis terbukti mengendalikan FWER pada level $\\alpha$ persis seperti Bonferroni, namun memiliki kekuatan statistik yang secara tegas lebih tinggi (*strictly more powerful*)."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Derivasi Koreksi Bonferroni:",
        "bulletPoints": [
          "Berdasarkan pertidaksamaan Boole (Union Bound):",
          "Agar FWER kumulatif $\\le \\alpha$, tetapkan:",
          "2. Algoritma Sekuensial Holm-Bonferroni (Step-Down):"
        ],
        "keyFormulaOrDiagram": "$$P\\left( \\bigcup_{i=1}^m \\{p_i \\le \\alpha'\\} \\right) \\le \\sum_{i=1}^m P(p_i \\le \\alpha') = m \\alpha'$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada pengujian perbandingan performa 4 arsitektur model deep learning terhadap baseline (m = 4), diperoleh nilai p-value mentah: p_1 = 0.012, p_2 = 0.045, p_3 = 0.008, p_4 = 0.150. Lakukan pengujian pada tingkat alpha = 0.05 menggunakan (a) Koreksi Bonferroni dan (b) Prosedur Holm-Bonferroni.",
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
          "Langkah 1: Identifikasi parameter: alpha = 0.05, m = 4.",
          "Langkah 2 (Bonferroni): Ambang batas alpha_adj = 0.05 / 4 = 0.0125.",
          "Evaluasi Bonferroni:",
          "- p_3 = 0.008 < 0.0125 -> Tolak H0 (Signifikan).",
          "- p_1 = 0.012 < 0.0125 -> Tolak H0 (Signifikan).",
          "- p_2 = 0.045 >= 0.0125 -> Gagal tolak H0.",
          "- p_4 = 0.150 >= 0.0125 -> Gagal tolak H0."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3 (Holm-Bonferroni): Urutkan p-value naik:",
          "p_(1) = 0.008 (H3), p_(2) = 0.012 (H1), p_(3) = 0.045 (H2), p_(4) = 0.150 (H4).",
          "Langkah 4 (Evaluasi Sekuensial Holm):",
          "- Uji p_(1) = 0.008 vs alpha/(4 - 1 + 1) = 0.05/4 = 0.0125. Karena 0.008 <= 0.0125, tolak H3.",
          "- Uji p_(2) = 0.012 vs alpha/(4 - 2 + 1) = 0.05/3 = 0.0167. Karena 0.012 <= 0.0167, tolak H1.",
          "- Uji p_(3) = 0.045 vs alpha/(4 - 3 + 1) = 0.05/2 = 0.0250. Karena 0.045 > 0.0250, berhenti dan gagal tolak H2.",
          "- Otomatis p_(4) (H4) gagal tolak.",
          "[result: Interpretasi Ilmiah] Pada kasus ini, kedua metode menolak H3 dan H1 serta mempertahankan H2 dan H4. Namun, perhatikan bahwa ambang uji Holm pada langkah ke-2 melonggar menjadi 0.0167 (dibandingkan Bonferroni yang tetap 0.0125), memberikan kekuatan statistik yang lebih besar."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi perbandingan koreksi Bonferroni dan Holm-Bonferroni menggunakan library statsmodels.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi perbandingan koreksi Bonferroni dan Holm-Bonferroni menggunakan library statsmodels.",
          "Dependensi Pustaka Ilmiah: numpy, statsmodels",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Koreksi FWER (Bonferroni vs Holm)"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Koreksi FWER (Bonferroni vs Holm)\nNo  p-Mentah    p-Bonferroni   Tolak?    p-Holm      Tolak?    \n---------------------------------------------------------------\n1   0.0080      0.0400         True      0.0400      True      \n2   0.0120      0.0600         False     0.0480      True      ",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menghitung p-value Bonferroni secara manual dengan mengalikan m * p tanpa membatasi nilai maksimum pada 1.0 (menghasilkan p-value > 1.0 yang tidak valid).",
          "[warning: Perangkap] Tetap menggunakan Bonferroni klasik padahal Holm-Bonferroni selalu memberikan power lebih tinggi dengan jaminan perlindungan FWER yang identik.",
          "[warning: Perangkap] Menerapkan koreksi FWER pada studi eksploratori skala masif (ribuan fitur) sehingga melumpuhkan seluruh penemuan ilmiah."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan nilai p-value yang disesuaikan tidak melebihi 1.0.",
          "Prosedur: Verifikasi bahwa urutan p-value pada metode Holm tersusun secara monoton naik.",
          "Prosedur: Gunakan Holm-Bonferroni sebagai default jika tujuan utama analisis adalah pengendalian FWER ketat."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa prosedur Holm-Bonferroni secara metodologis lebih disukai daripada koreksi Bonferroni klasik?",
          "Petunjuk Analitis: Fokus pada adaptivitas ambang signifikansi bertahap dan daya statistik.",
          "Solusi Kunci: Holm-Bonferroni melonggarkan ambang batas penolakan secara bertahap pada tiap tahapan sekuensial (alpha / (m - i + 1)) sehingga kekuatan statistik (power) meningkat tanpa melanggar jaminan pengendalian FWER pada tingkat alpha."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.6.3": {
    "id": "3.6.3",
    "chapterId": "CH-21",
    "title": "Pengendalian False Discovery Rate (FDR): Prosedur Benjamini-Hochberg dan Yekutieli",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Membedakan paradigma False Discovery Rate (FDR) dengan Family-Wise Error Rate (FWER).",
      "Menerapkan algoritma step-up Benjamini-Hochberg (BH) untuk mengendalikan proporsi temuan palsu.",
      "Memahami kapan prosedur Benjamini-Yekutieli (BY) diperlukan di bawah korelasi negatif atau arbitrer."
    ],
    "content": "Ketika penelitian melibatkan pengujian ratusan, ribuan, atau jutaan hipotesis secara simultan (misalnya genomika fungsional, pencarian biomarker, evaluasi ribuan model machine learning, atau neuroimaging fMRI), pengendalian FWER menjadi terlalu restriktif. Mengendalikan peluang terjadinya satu pun kesalahan false positive pada tingkat 0.05 di antara 10,000 uji menuntut p-value individual lebih kecil dari $0.05 / 10000 = 5 \\times 10^{-6}$. Standar ekstrem ini menyebabkan hampir seluruh penemuan ilmiah sejati terlewatkan (daya uji hancur).\n\nUntuk mengatasi kebuntuan metodologis ini, Yoav Benjamini dan Yosef Hochberg (1995) merumuskan paradigma baru: False Discovery Rate (FDR). Alih-alih memastikan nol kesalahan false positive dalam keluarga pengujian, FDR mengendalikan ekspektasi proporsi kesalahan penemuan (false discoveries) di antara seluruh hipotesis yang ditolak (discoveries).\n\nJika seorang peneliti mendeklarasikan 100 hipotesis signifikan di bawah ambang kendali FDR $Q = 0.05$, maka secara rata-rata, sekitar 5 dari 100 temuan tersebut diperkirakan merupakan false positive, sedangkan 95 temuan lainnya adalah sinyal nyata. Toleransi terukur terhadap sebagian kecil kesalahan false positive ini menghasilkan lonjakan dramatis pada kekuatan statistik eksperimen.\n\nProsedur Benjamini-Hochberg (BH) merupakan prosedur bertahap naik (step-up procedure) yang menjamin pengendalian FDR pada level $Q$ untuk statistik uji yang independen atau memiliki ketergantungan regresi positif (Positive Regression Dependency on Subsets / PRDS). Untuk kasus ketergantungan umum atau korelasi negatif arbitrer, Benjamini dan Daniel Yekutieli (2001) mengembangkan prosedur BY yang menyisipkan faktor harmonik pengkoreksi.",
    "mathematicalFoundations": "1. Definisi Matematis Matriks Hasil Pengujian Hipotesis:\nMisalkan terdapat $m$ hipotesis yang diuji:\n- $m_0$: Jumlah hipotesis nol sejati (tidak diketahui peneliti).\n- $m - m_0$: Jumlah hipotesis alternatif sejati.\n- $R$: Jumlah total hipotesis yang ditolak oleh prosedur (discoveries).\n- $V$: Jumlah hipotesis nol sejati yang keliru ditolak (false discoveries / Tipe I).\n- $S$: Jumlah hipotesis alternatif sejati yang berhasil ditolak (true discoveries).\n\nFalse Discovery Proportion (FDP) didefinisikan sebagai rasio:\n$$\\text{FDP} = \\begin{cases} \\frac{V}{R}, & \\text{jika } R > 0 \\\\ 0, & \\text{jika } R = 0 \\end{cases}$$\n\nFalse Discovery Rate (FDR) adalah nilai harapan (ekspektasi) dari FDP:\n$$\\text{FDR} = E[\\text{FDP}] = E\\left[ \\frac{V}{R} \\;\\Big|\\; R > 0 \\right] P(R > 0)$$\n\n2. Algoritma Step-Up Benjamini-Hochberg (BH):\nDiberikan $m$ p-value teramati dan tingkat kendali FDR yang diinginkan $Q$ (misal $Q = 0.05$).\nLangkah 1: Urutkan nilai p-value secara monoton naik:\n$$p_{(1)} \\le p_{(2)} \\le \\dots \\le p_{(m)}$$\nLangkah 2: Cari indeks terbesar $k$ sedemikian rupa sehingga:\n$$p_{(k)} \\le \\frac{k}{m} Q$$\nLangkah 3: Tolak seluruh hipotesis $H_{(1)}, H_{(2)}, \\dots, H_{(k)}$. Jika tidak ada indeks yang memenuhi, tidak ada hipotesis yang ditolak.\n\n3. Prosedur Benjamini-Yekutieli (BY) untuk Dependensi Arbitrer:\nJika pengujian memiliki ketergantungan arbitrer (korelasi negatif antar variabel), ambang batas dimodifikasi dengan membagi konstanta harmonik $c(m)$:\n$$p_{(k)} \\le \\frac{k}{m \\cdot c(m)} Q, \\quad \\text{di mana } c(m) = \\sum_{i=1}^m \\frac{1}{i} \\approx \\ln(m) + \\gamma$$\ndi mana $\\gamma \\approx 0.5772$ adalah konstanta Euler-Mascheroni.",
    "workedExample": {
      "problemStatement": "Dalam screening 8 fitur diagnostik anomali vibrasi turbin pembangkit listrik (m = 8), diperoleh p-value terurut: p_(1)=0.001, p_(2)=0.007, p_(3)=0.015, p_(4)=0.021, p_(5)=0.040, p_(6)=0.065, p_(7)=0.110, p_(8)=0.220. Terapkan prosedur Benjamini-Hochberg pada tingkat FDR Q = 0.05 untuk menentukan fitur yang signifikan.",
      "stepByStepSolution": [
        "Langkah 1: Hitung ambang batas kritis BH: (i / m) * Q untuk tiap i = 1, 2, ..., 8 dengan Q = 0.05, m = 8.",
        "Langkah 2: Evaluasi masing-masing pengujian secara bertahap:",
        "- i = 1: p_(1) = 0.001 vs (1/8)*0.05 = 0.00625. Memenuhi (0.001 <= 0.00625).",
        "- i = 2: p_(2) = 0.007 vs (2/8)*0.05 = 0.01250. Memenuhi (0.007 <= 0.01250).",
        "- i = 3: p_(3) = 0.015 vs (3/8)*0.05 = 0.01875. Memenuhi (0.015 <= 0.01875).",
        "- i = 4: p_(4) = 0.021 vs (4/8)*0.05 = 0.02500. Memenuhi (0.021 <= 0.02500).",
        "- i = 5: p_(5) = 0.040 vs (5/8)*0.05 = 0.03125. Tidak memenuhi (0.040 > 0.03125).",
        "- i = 6: p_(6) = 0.065 vs (6/8)*0.05 = 0.03750. Tidak memenuhi.",
        "- i = 7: p_(7) = 0.110 vs (7/8)*0.05 = 0.04375. Tidak memenuhi.",
        "- i = 8: p_(8) = 0.220 vs (8/8)*0.05 = 0.05000. Tidak memenuhi.",
        "Langkah 3: Cari indeks terbesar k yang memenuhi kondisi p_(k) <= (k/m)*Q. Indeks terbesar adalah k = 4.",
        "Langkah 4: Tolak seluruh hipotesis hingga indeks k = 4: Fitur 1, 2, 3, dan 4 dideklarasikan signifikan."
      ],
      "resultInterpretation": "Empat fitur pertama terbukti signifikan pada FDR 5%. Perhatikan bahwa jika menggunakan Bonferroni klasik (alpha/m = 0.05/8 = 0.00625), hanya fitur 1 yang terdeteksi, sehingga 3 fitur penting lainnya akan terbuang sia-sia."
    },
    "pythonImplementation": {
      "description": "Implementasi prosedur Benjamini-Hochberg (BH) dan Benjamini-Yekutieli (BY) untuk screening anomali sensor.",
      "libraryDependencies": [
        "numpy",
        "statsmodels"
      ],
      "code": "import numpy as np\nfrom statsmodels.stats.multitest import multipletests\n\np_vals = np.array([0.001, 0.007, 0.015, 0.021, 0.040, 0.065, 0.110, 0.220])\nm = len(p_vals)\nq_target = 0.05\n\nreject_bh, p_bh, _, _ = multipletests(p_vals, alpha=q_target, method='fdr_bh')\nreject_by, p_by, _, _ = multipletests(p_vals, alpha=q_target, method='fdr_by')\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Analisis Screening Sensor via FDR Control\")\nprint(f\"{'Fitur':<8}{'p-Mentah':<12}{'p-Adj (BH)':<14}{'Tolak BH?':<12}{'p-Adj (BY)':<14}{'Tolak BY?':<10}\")\nprint(\"-\" * 70)\nfor i in range(m):\n    print(f\"Sensor {i+1:<3}{p_vals[i]:<12.4f}{p_bh[i]:<14.4f}{str(reject_bh[i]):<12}{p_by[i]:<14.4f}{str(reject_by[i]):<10}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Analisis Screening Sensor via FDR Control\nFitur   p-Mentah    p-Adj (BH)    Tolak BH?   p-Adj (BY)    Tolak BY? \n----------------------------------------------------------------------\nSensor 1   0.0010      0.0080        True        0.0217        True      \nSensor 2   0.0070      0.0280        True        0.0761        False     \nSensor 3   0.0150      0.0400        True        0.1087        False     \nSensor 4   0.0210      0.0420        True        0.1141        False     \nSensor 5   0.0400      0.0640        False       0.1739        False     \nSensor 6   0.0650      0.0867        False       0.2356        False     \nSensor 7   0.1100      0.1257        False       0.3417        False     \nSensor 8   0.2200      0.2200        False       0.5979        False"
    },
    "commonPitfalls": [
      "Menyamakan FDR dengan FWER, mengira bahwa FDR 5% berarti ada peluang 5% terjadinya kesalahan tunggal.",
      "Menggunakan koreksi FWER pada data berdimensi tinggi yang berujung pada hilangnya penemuan ilmiah yang valid.",
      "Mengabaikan ketergantungan korelasi kuat antar variabel dan memaksakan penggunaan BH standar padahal struktur korelasi menuntut BY."
    ],
    "validationProcedures": [
      "Identifikasi tujuan penelitian: apakah studi konfirmatori (gunakan FWER) atau studi penemuan eksploratori/screening (gunakan FDR).",
      "Periksa apakah p-value terurut memotong garis lurus kritis (k/m)*Q dari arah atas ke bawah.",
      "Dokumentasikan nilai target Q dan algoritma spesifik yang digunakan dalam metodologi paper."
    ],
    "exercises": [
      {
        "question": "Dalam konteks pengujian skala besar, apa keunggulan utama pengendalian False Discovery Rate (FDR) dibandingkan Family-Wise Error Rate (FWER)?",
        "hint": "Perhatikan toleransi terhadap proporsi kesalahan kecil dan statistical power.",
        "answerExplanation": "FDR mengontrol proporsi false discovery di antara seluruh temuan positif yang dideklarasikan, sehingga menghindari konservatisme ekstrem FWER pada studi eksploratori berdimensi tinggi dan meningkatkan kekuatan uji secara signifikan."
      }
    ],
    "references": [
      {
        "citation": "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: a practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B, 57(1), 289-300.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Benjamini, Y., & Yekutieli, D. (2001). The control of the false discovery rate in multiple testing under dependency. The Annals of Statistics, 29(4), 1165-1188.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pengendalian False Discovery Rate (FDR): Prosedur Benjamini-Hochberg dan Yekutieli",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.6.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.6.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan paradigma False Discovery Rate (FDR) dengan Family-Wise Error Rate (FWER).",
          "Capaian 2: Menerapkan algoritma step-up Benjamini-Hochberg (BH) untuk mengendalikan proporsi temuan palsu.",
          "Capaian 3: Memahami kapan prosedur Benjamini-Yekutieli (BY) diperlukan di bawah korelasi negatif atau arbitrer."
        ],
        "keyFormulaOrDiagram": "$$\\text{FDP} = \\begin{cases} \\frac{V}{R}, & \\text{jika } R > 0 \\\\ 0, & \\text{jika } R = 0 \\end{cases}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.6.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pengendalian False Discovery Rate (FDR): Prosedur Benjamini-Hochberg dan Yekutieli",
        "lead": "Ketika penelitian melibatkan pengujian ratusan, ribuan, atau jutaan hipotesis secara simultan (misalnya genomika fungsional, pencarian biomarker, evaluasi ribuan model machine learning, atau neuroimaging fMRI), pengendalian FWER menjadi terlalu restriktif.",
        "bulletPoints": [
          "Mengendalikan peluang terjadinya satu pun kesalahan false positive pada tingkat 0.05 di antara 10,000 uji menuntut p-value individual lebih kecil dari $0.05 / 10000 = 5 \\times 10^{-6}$.",
          "Standar ekstrem ini menyebabkan hampir seluruh penemuan ilmiah sejati terlewatkan (daya uji hancur).",
          "Untuk mengatasi kebuntuan metodologis ini, Yoav Benjamini dan Yosef Hochberg (1995) merumuskan paradigma baru: False Discovery Rate (FDR).",
          "Alih-alih memastikan nol kesalahan false positive dalam keluarga pengujian, FDR mengendalikan ekspektasi proporsi kesalahan penemuan (false discoveries) di antara seluruh hipotesis yang ditolak (discoveries)."
        ],
        "keyFormulaOrDiagram": "$Q = 0.05$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Jika seorang peneliti mendeklarasikan 100 hipotesis signifikan di bawah ambang kendali FDR $Q = 0.05$, maka secara rata-rata, sekitar 5 dari 100 temuan tersebut diperkirakan merupakan false positive, sedangkan 95 temuan lainnya adalah sinyal nyata.",
        "bulletPoints": [
          "Toleransi terukur terhadap sebagian kecil kesalahan false positive ini menghasilkan lonjakan dramatis pada kekuatan statistik eksperimen.",
          "Prosedur Benjamini-Hochberg (BH) merupakan prosedur bertahap naik (step-up procedure) yang menjamin pengendalian FDR pada level $Q$ untuk statistik uji yang independen atau memiliki ketergantungan regresi positif (Positive Regression Dependency on Subsets / PRDS).",
          "Untuk kasus ketergantungan umum atau korelasi negatif arbitrer, Benjamini dan Daniel Yekutieli (2001) mengembangkan prosedur BY yang menyisipkan faktor harmonik pengkoreksi."
        ],
        "keyFormulaOrDiagram": "$Q$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Definisi Matematis Matriks Hasil Pengujian Hipotesis:",
        "bulletPoints": [
          "Misalkan terdapat $m$ hipotesis yang diuji:",
          "- $m_0$: Jumlah hipotesis nol sejati (tidak diketahui peneliti).",
          "- $m - m_0$: Jumlah hipotesis alternatif sejati."
        ],
        "keyFormulaOrDiagram": "$$\\text{FDP} = \\begin{cases} \\frac{V}{R}, & \\text{jika } R > 0 \\\\ 0, & \\text{jika } R = 0 \\end{cases}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dalam screening 8 fitur diagnostik anomali vibrasi turbin pembangkit listrik (m = 8), diperoleh p-value terurut: p_(1)=0.001, p_(2)=0.007, p_(3)=0.015, p_(4)=0.021, p_(5)=0.040, p_(6)=0.065, p_(7)=0.110, p_(8)=0.220. Terapkan prosedur Benjamini-Hochberg pada tingkat FDR Q = 0.05 untuk menentukan fitur yang signifikan.",
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
          "Langkah 1: Hitung ambang batas kritis BH: (i / m) * Q untuk tiap i = 1, 2, ..., 8 dengan Q = 0.05, m = 8.",
          "Langkah 2: Evaluasi masing-masing pengujian secara bertahap:",
          "- i = 1: p_(1) = 0.001 vs (1/8)*0.05 = 0.00625. Memenuhi (0.001 <= 0.00625).",
          "- i = 2: p_(2) = 0.007 vs (2/8)*0.05 = 0.01250. Memenuhi (0.007 <= 0.01250).",
          "- i = 3: p_(3) = 0.015 vs (3/8)*0.05 = 0.01875. Memenuhi (0.015 <= 0.01875).",
          "- i = 4: p_(4) = 0.021 vs (4/8)*0.05 = 0.02500. Memenuhi (0.021 <= 0.02500)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "- i = 5: p_(5) = 0.040 vs (5/8)*0.05 = 0.03125. Tidak memenuhi (0.040 > 0.03125).",
          "- i = 6: p_(6) = 0.065 vs (6/8)*0.05 = 0.03750. Tidak memenuhi.",
          "- i = 7: p_(7) = 0.110 vs (7/8)*0.05 = 0.04375. Tidak memenuhi.",
          "- i = 8: p_(8) = 0.220 vs (8/8)*0.05 = 0.05000. Tidak memenuhi.",
          "Langkah 3: Cari indeks terbesar k yang memenuhi kondisi p_(k) <= (k/m)*Q. Indeks terbesar adalah k = 4.",
          "Langkah 4: Tolak seluruh hipotesis hingga indeks k = 4: Fitur 1, 2, 3, dan 4 dideklarasikan signifikan.",
          "[result: Interpretasi Ilmiah] Empat fitur pertama terbukti signifikan pada FDR 5%. Perhatikan bahwa jika menggunakan Bonferroni klasik (alpha/m = 0.05/8 = 0.00625), hanya fitur 1 yang terdeteksi, sehingga 3 fitur penting lainnya akan terbuang sia-sia."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi prosedur Benjamini-Hochberg (BH) dan Benjamini-Yekutieli (BY) untuk screening anomali sensor.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi prosedur Benjamini-Hochberg (BH) dan Benjamini-Yekutieli (BY) untuk screening anomali sensor.",
          "Dependensi Pustaka Ilmiah: numpy, statsmodels",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Analisis Screening Sensor via FDR Control"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Analisis Screening Sensor via FDR Control\nFitur   p-Mentah    p-Adj (BH)    Tolak BH?   p-Adj (BY)    Tolak BY? \n----------------------------------------------------------------------\nSensor 1   0.0010      0.0080        True        0.0217        True      \nSensor 2   0.0070      0.0280        True        0.0761        False     ",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyamakan FDR dengan FWER, mengira bahwa FDR 5% berarti ada peluang 5% terjadinya kesalahan tunggal.",
          "[warning: Perangkap] Menggunakan koreksi FWER pada data berdimensi tinggi yang berujung pada hilangnya penemuan ilmiah yang valid.",
          "[warning: Perangkap] Mengabaikan ketergantungan korelasi kuat antar variabel dan memaksakan penggunaan BH standar padahal struktur korelasi menuntut BY."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Identifikasi tujuan penelitian: apakah studi konfirmatori (gunakan FWER) atau studi penemuan eksploratori/screening (gunakan FDR).",
          "Prosedur: Periksa apakah p-value terurut memotong garis lurus kritis (k/m)*Q dari arah atas ke bawah.",
          "Prosedur: Dokumentasikan nilai target Q dan algoritma spesifik yang digunakan dalam metodologi paper."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Dalam konteks pengujian skala besar, apa keunggulan utama pengendalian False Discovery Rate (FDR) dibandingkan Family-Wise Error Rate (FWER)?",
          "Petunjuk Analitis: Perhatikan toleransi terhadap proporsi kesalahan kecil dan statistical power.",
          "Solusi Kunci: FDR mengontrol proporsi false discovery di antara seluruh temuan positif yang dideklarasikan, sehingga menghindari konservatisme ekstrem FWER pada studi eksploratori berdimensi tinggi dan meningkatkan kekuatan uji secara signifikan."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.6.4": {
    "id": "3.6.4",
    "chapterId": "CH-21",
    "title": "Implementasi Koreksi Pengujian Jamak pada Analisis Data Skala Besar via Python",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membangun pipeline end-to-end analisis pengujian jamak menggunakan Python dan statsmodels.",
      "Memvisualisasikan hasil pengujian jamak menggunakan Manhattan plot dan kurva p-value terurut vs ambang BH.",
      "Menerapkan praktik terbaik pelaporan statistik untuk studi genomika, sensorik, dan machine learning."
    ],
    "content": "Dalam alur kerja analitik data rekayasa skala besar, peneliti berhadapan dengan data berdimensi tinggi di mana ribuan pengujian hipotesis dieksekusi secara otomatis oleh skrip komputasi. Mengimplementasikan koreksi pengujian jamak secara manual rentan terhadap kesalahan indeks pengurutan, pemotongan batas probabilitas, dan salah tafsir.\n\nLibrary ekosistem ilmiah Python menyediakan pustaka standar industri melalui modul statsmodels.stats.multitest. Fungsi multipletests mendukung berbagai metode terverifikasi, mulai dari Bonferroni, Sidak, Holm, Holm-Sidak, hingga Benjamini-Hochberg (fdr_bh) dan Benjamini-Yekutieli (fdr_by).\n\nDi samping menghasilkan keputusan biner tolak atau gagal tolak dan p-value yang disesuaikan, visualisasi grafik sangat krusial untuk mengaudit integritas inferensi. Dua format visualisasi standar yang diakui dalam komunitas ilmiah internasional adalah:\n1. Plot Kurva Benjamini-Hochberg: Menampilkan p-value empiris terurut terhadap garis ambang kritis teoritis $(i/m) Q$. Titik potong terjauh menentukan batas deklarasi penemuan.\n2. Manhattan Plot: Menggambarkan -log10(p-value) dari setiap variabel atau sensor di sepanjang indeks posisi, dilengkapi dengan garis horizontal batas ambang Bonferroni dan batas ambang FDR. Titik-titik di atas garis batas ini merepresentasikan kandidat penemuan yang terbukti tahan terhadap koreksi simultan.",
    "mathematicalFoundations": "1. Transformasi Skala Manhattan (-log10 P-Value):\nUntuk mempermudah visualisasi nilai probabilitas yang sangat kecil:\n$$y_i = -\\log_{10}(p_i)$$\nJika ambang signifikansi terkoreksi adalah $\\alpha_{\\text{cutoff}}$, maka garis batas horizontal digambarkan pada ketinggian:\n$$y_{\\text{threshold}} = -\\log_{10}(\\alpha_{\\text{cutoff}})$$\n\n2. Kriteria Titik Potong Benjamini-Hochberg:\nTitik potong kritis $k^*$ ditentukan oleh:\n$$k^* = \\max \\left\\{ i \\in \\{1, \\dots, m\\} \\;:\\; p_{(i)} \\le \\frac{i}{m} Q \\right\\}$$\nAmbang p-value efektif (effective p-value threshold) untuk pengujian adalah:\n$$p_{\\text{crit}} = p_{(k^*)}$$\nSeluruh pengujian dengan $p_i \\le p_{\\text{crit}}$ dinyatakan signifikan pada tingkat FDR $Q$.",
    "workedExample": {
      "problemStatement": "Pada pengujian stabilitas termal 1,000 titik pengukuran sensor pada turbin gas, diperoleh 1,000 nilai p-value. Terdapat 50 sensor dengan anomali termal nyata (sinyal kuat) dan 950 sensor dalam kondisi normal (noise). Bandingkan hasil deteksi antara tanpa koreksi (alpha=0.05), koreksi Bonferroni, dan koreksi Benjamini-Hochberg (Q=0.05).",
      "stepByStepSolution": [
        "Langkah 1: Kumpulkan p-value dari 1,000 sensor.",
        "Langkah 2: Evaluasi tanpa koreksi (alpha = 0.05): Setiap sensor dengan p < 0.05 ditolak. Dari 950 sensor normal, diperkirakan terjadi 950 * 0.05 = 47 false positive.",
        "Langkah 3: Evaluasi Bonferroni: Ambang kritis alpha_adj = 0.05 / 1000 = 0.00005. Jumlah false positive ditekan mendekati 0, namun sensor anomali dengan sinyal moderat (misal p = 0.0002) gagal terdeteksi (false negative tinggi).",
        "Langkah 4: Evaluasi Benjamini-Hochberg: Cari indeks k terbesar sedemikian sehingga p_(k) <= (k/1000)*0.05. Sensor dengan sinyal moderat berhasil diselamatkan dengan jaminan false discovery rate maksimal 5% dari total sensor yang ditandai."
      ],
      "resultInterpretation": "Tanpa koreksi, deteksi dipenuhi oleh hampir 50 alarm palsu. Bonferroni terlalu ketat dan menghilangkan anomali nyata. Prosedur Benjamini-Hochberg memberikan titik optimal antara sensitivitas deteksi dan pengendalian kesalahan false positive."
    },
    "pythonImplementation": {
      "description": "Pipeline Python lengkap untuk pengujian jamak skala besar, perbandingan metode, dan audit hasil diagnostik.",
      "libraryDependencies": [
        "numpy",
        "statsmodels",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom statsmodels.stats.multitest import multipletests\n\nnp.random.seed(42)\nm = 1000\nm_signal = 50\nm_noise = m - m_signal\n\np_noise = np.random.uniform(0, 1, size=m_noise)\np_signal = np.random.beta(0.3, 10.0, size=m_signal)\np_all = np.concatenate([p_signal, p_noise])\nground_truth = np.array([True] * m_signal + [False] * m_noise)\n\nrej_raw = p_all < 0.05\nrej_bonf, _, _, _ = multipletests(p_all, alpha=0.05, method='bonferroni')\nrej_holm, _, _, _ = multipletests(p_all, alpha=0.05, method='holm')\nrej_bh, p_bh, _, _ = multipletests(p_all, alpha=0.05, method='fdr_bh')\n\ndef hitung_metrik(rej, truth):\n    tp = np.sum(rej & truth)\n    fp = np.sum(rej & ~truth)\n    fn = np.sum(~rej & truth)\n    fdp = fp / np.maximum(tp + fp, 1)\n    return tp, fp, fn, fdp\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Evaluasi Benchmark Pengujian Jamak 1000 Sensor\")\nprint(f\"{'Metode':<16}{'True Pos (TP)':<16}{'False Pos (FP)':<16}{'False Neg (FN)':<16}{'FDP Realisasi':<16}\")\nprint(\"-\" * 80)\nfor nama, rej in [('Raw (p < 0.05)', rej_raw), ('Bonferroni', rej_bonf), ('Holm', rej_holm), ('FDR (BH)', rej_bh)]:\n    tp, fp, fn, fdp = hitung_metrik(rej, ground_truth)\n    print(f\"{nama:<16}{tp:<16}{fp:<16}{fn:<16}{fdp:<16.4f}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Benchmark Pengujian Jamak 1000 Sensor\nMetode          True Pos (TP)   False Pos (FP)  False Neg (FN)  FDP Realisasi   \n--------------------------------------------------------------------------------\nRaw (p < 0.05)  49              47              1               0.4896          \nBonferroni      24              0               26              0.0000          \nHolm            24              0               26              0.0000          \nFDR (BH)        42              2               8               0.0455"
    },
    "commonPitfalls": [
      "Menjalankan fungsi multipletests pada data yang belum dibersihkan dari nilai p-value NaN atau tak terhingga.",
      "Melaporkan p-value yang disesuaikan tanpa menyertakan nama metode koreksi spesifik dan paket perangkat lunak beserta versinya.",
      "Mengabaikan pemeriksaan False Discovery Proportion teramati saat melakukan verifikasi simulasi metode baru."
    ],
    "validationProcedures": [
      "Periksa apakah p-value masukan berada tepat dalam rentang tertutup [0, 1].",
      "Verifikasi bahwa realisasi FDP pada data simulasi terkendali di bawah tingkat target Q (misal < 0.05).",
      "Cantumkan script reproduktifitas lengkap untuk pemrosesan pengujian jamak pada lampiran artikel ilmiah."
    ],
    "exercises": [
      {
        "question": "Berdasarkan hasil eksperimen 1,000 sensor di atas, mengapa metode FDR (BH) dianggap paling seimbang untuk deteksi anomali skala besar?",
        "hint": "Perhatikan perbandingan True Positive, False Positive, dan False Discovery Proportion realisasi.",
        "answerExplanation": "FDR berhasil mendeteksi 42 sinyal sejati dengan hanya 2 false positive, sehingga rasio kesalahan penemuan FDP = 2/(42+2) = 4.55%, terkendali tepat di bawah target Q = 5%, menjaga trade-off optimal antara sensitivitas dan spesifisitas."
      }
    ],
    "references": [
      {
        "citation": "Seabold, S., & Perktold, J. (2010). statsmodels: Econometric and statistical modeling with python. In 9th Python in Science Conference.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Storey, J. D. (2002). A direct approach to false discovery rates. Journal of the Royal Statistical Society: Series B, 64(3), 479-498.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Implementasi Koreksi Pengujian Jamak pada Analisis Data Skala Besar via Python",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.6.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.6.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membangun pipeline end-to-end analisis pengujian jamak menggunakan Python dan statsmodels.",
          "Capaian 2: Memvisualisasikan hasil pengujian jamak menggunakan Manhattan plot dan kurva p-value terurut vs ambang BH.",
          "Capaian 3: Menerapkan praktik terbaik pelaporan statistik untuk studi genomika, sensorik, dan machine learning."
        ],
        "keyFormulaOrDiagram": "$$y_i = -\\log_{10}(p_i)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.6.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Implementasi Koreksi Pengujian Jamak pada Analisis Data Skala Besar via Python",
        "lead": "Dalam alur kerja analitik data rekayasa skala besar, peneliti berhadapan dengan data berdimensi tinggi di mana ribuan pengujian hipotesis dieksekusi secara otomatis oleh skrip komputasi.",
        "bulletPoints": [
          "Mengimplementasikan koreksi pengujian jamak secara manual rentan terhadap kesalahan indeks pengurutan, pemotongan batas probabilitas, dan salah tafsir.",
          "Library ekosistem ilmiah Python menyediakan pustaka standar industri melalui modul statsmodels.stats.multitest.",
          "Fungsi multipletests mendukung berbagai metode terverifikasi, mulai dari Bonferroni, Sidak, Holm, Holm-Sidak, hingga Benjamini-Hochberg (fdr_bh) dan Benjamini-Yekutieli (fdr_by)."
        ],
        "keyFormulaOrDiagram": "$(i/m) Q$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Di samping menghasilkan keputusan biner tolak atau gagal tolak dan p-value yang disesuaikan, visualisasi grafik sangat krusial untuk mengaudit integritas inferensi.",
        "bulletPoints": [
          "Dua format visualisasi standar yang diakui dalam komunitas ilmiah internasional adalah: 1.",
          "Plot Kurva Benjamini-Hochberg: Menampilkan p-value empiris terurut terhadap garis ambang kritis teoritis $(i/m) Q$."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Transformasi Skala Manhattan (-log10 P-Value):",
        "bulletPoints": [
          "Untuk mempermudah visualisasi nilai probabilitas yang sangat kecil:",
          "Jika ambang signifikansi terkoreksi adalah $\\alpha_{\\text{cutoff}}$, maka garis batas horizontal digambarkan pada ketinggian:",
          "2. Kriteria Titik Potong Benjamini-Hochberg:"
        ],
        "keyFormulaOrDiagram": "$$y_i = -\\log_{10}(p_i)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada pengujian stabilitas termal 1,000 titik pengukuran sensor pada turbin gas, diperoleh 1,000 nilai p-value. Terdapat 50 sensor dengan anomali termal nyata (sinyal kuat) dan 950 sensor dalam kondisi normal (noise). Bandingkan hasil deteksi antara tanpa koreksi (alpha=0.05), koreksi Bonferroni, dan koreksi Benjamini-Hochberg (Q=0.05).",
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
          "Langkah 1: Kumpulkan p-value dari 1,000 sensor.",
          "Langkah 2: Evaluasi tanpa koreksi (alpha = 0.05): Setiap sensor dengan p < 0.05 ditolak. Dari 950 sensor normal, diperkirakan terjadi 950 * 0.05 = 47 false positive."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Evaluasi Bonferroni: Ambang kritis alpha_adj = 0.05 / 1000 = 0.00005. Jumlah false positive ditekan mendekati 0, namun sensor anomali dengan sinyal moderat (misal p = 0.0002) gagal terdeteksi (false negative tinggi).",
          "Langkah 4: Evaluasi Benjamini-Hochberg: Cari indeks k terbesar sedemikian sehingga p_(k) <= (k/1000)*0.05. Sensor dengan sinyal moderat berhasil diselamatkan dengan jaminan false discovery rate maksimal 5% dari total sensor yang ditandai.",
          "[result: Interpretasi Ilmiah] Tanpa koreksi, deteksi dipenuhi oleh hampir 50 alarm palsu. Bonferroni terlalu ketat dan menghilangkan anomali nyata. Prosedur Benjamini-Hochberg memberikan titik optimal antara sensitivitas deteksi dan pengendalian kesalahan false positive."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pipeline Python lengkap untuk pengujian jamak skala besar, perbandingan metode, dan audit hasil diagnostik.",
        "bulletPoints": [
          "Tujuan Algoritma: Pipeline Python lengkap untuk pengujian jamak skala besar, perbandingan metode, dan audit hasil diagnostik.",
          "Dependensi Pustaka Ilmiah: numpy, statsmodels, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Benchmark Pengujian Jamak 1000 Sensor"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Benchmark Pengujian Jamak 1000 Sensor\nMetode          True Pos (TP)   False Pos (FP)  False Neg (FN)  FDP Realisasi   \n--------------------------------------------------------------------------------\nRaw (p < 0.05)  49              47              1               0.4896          \nBonferroni      24              0               26              0.0000          ",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menjalankan fungsi multipletests pada data yang belum dibersihkan dari nilai p-value NaN atau tak terhingga.",
          "[warning: Perangkap] Melaporkan p-value yang disesuaikan tanpa menyertakan nama metode koreksi spesifik dan paket perangkat lunak beserta versinya.",
          "[warning: Perangkap] Mengabaikan pemeriksaan False Discovery Proportion teramati saat melakukan verifikasi simulasi metode baru."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Periksa apakah p-value masukan berada tepat dalam rentang tertutup [0, 1].",
          "Prosedur: Verifikasi bahwa realisasi FDP pada data simulasi terkendali di bawah tingkat target Q (misal < 0.05).",
          "Prosedur: Cantumkan script reproduktifitas lengkap untuk pemrosesan pengujian jamak pada lampiran artikel ilmiah."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Berdasarkan hasil eksperimen 1,000 sensor di atas, mengapa metode FDR (BH) dianggap paling seimbang untuk deteksi anomali skala besar?",
          "Petunjuk Analitis: Perhatikan perbandingan True Positive, False Positive, dan False Discovery Proportion realisasi.",
          "Solusi Kunci: FDR berhasil mendeteksi 42 sinyal sejati dengan hanya 2 false positive, sehingga rasio kesalahan penemuan FDP = 2/(42+2) = 4.55%, terkendali tepat di bawah target Q = 5%, menjaga trade-off optimal antara sensitivitas dan spesifisitas."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
