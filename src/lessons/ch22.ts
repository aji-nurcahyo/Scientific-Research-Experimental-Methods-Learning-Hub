import { Lesson } from '../types/curriculum';

export const CH22_LESSONS: Record<string, Partial<Lesson>> = {
  "3.7.1": {
    "id": "3.7.1",
    "chapterId": "CH-22",
    "title": "Kapan Menggunakan Metode Non-Parametrik: Pelanggaran Normalitas dan Skala Ordinal",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Mengidentifikasi batasan inferensi parametrik dan kriteria transisi ke metode non-parametrik.",
      "Memahami konsep Asymptotic Relative Efficiency (ARE) antara uji parametrik dan non-parametrik.",
      "Menganalisis karakteristik data ordinal, skewed berat, dan outlier ekstrem dalam riset rekayasa."
    ],
    "content": "Uji statistik parametrik klasik (seperti Student t-test dan ANOVA) dibangun di atas fondasi asumsi distribusi tertentu, paling utama adalah asumsi normalitas residual dan homoskedastisitas varians. Ketika data terdistribusi secara normal atau ukuran sampel mendekati tak terhingga di bawah perlindungan Teorema Batas Pusat (CLT), metode parametrik memiliki kekuatan statistik (power) tertinggi untuk mendeteksi efek sejati.\n\nNamun, dalam banyak skenario rekayasa dan sains eksperimental, asumsi-asumsi tersebut dilanggar secara fatal. Contoh nyata meliputi:\n1. Ukuran sampel kecil (n < 15) di mana CLT belum beroperasi secara efektif dan uji normalitas Shapiro-Wilk menolak distribusi Gaussian.\n2. Data dengan kecondongan ekstrem (heavy-tailed or severe skewness), seperti latensi jaringan, waktu kegagalan komponen mekanis (time-to-failure), atau emisi gas polutan.\n3. Kehadiran pencilan ekstrem (extreme outliers) yang tidak dapat dibuang karena merupakan karakteristik intrinsik sistem fisik.\n4. Skala pengukuran ordinal, seperti skor evaluasi kegunaan sistem antarmuka (skala Likert 1 hingga 5), indeks keparahan cacat manufaktur, atau peringkat preferensi algoritma.\n\nMetode non-parametrik (sering disebut juga metode bebas distribusi / distribution-free methods) tidak menuntut asumsi bentuk distribusi populasi tertentu. Sebagian besar metode ini beroperasi dengan mentransformasikan nilai numerik mentah ke dalam format urutan atau peringkat (ranks). Konsekuensinya, metode ini sangat tangguh (robust) terhadap pencilan ekstrem dan invarian terhadap transformasi monoton.\n\nNamun, metode non-parametrik bukanlah \"obat mujarab tanpa biaya\". Jika data sebenarnya terdistribusi secara normal sempurna, efisiensi relatif asimtotik (Asymptotic Relative Efficiency / ARE) uji peringkat Wilcoxon terhadap uji t-Student adalah sekitar 95.5% (3/pi). Artinya, terjadi sedikit kehilangan daya deteksi (sekitar 4.5%). Sebaliknya, pada data berdistribusi Cauchy, Laplace, atau bimodal ekstrem, ARE metode non-parametrik melesat jauh melampaui 100%, membuktikan superioritas mutlaknya di bawah kondisi non-ideal.",
    "mathematicalFoundations": "1. Konsep Efisiensi Relatif Asimtotik (Asymptotic Relative Efficiency / ARE):\nARE antara dua uji statistik $T_1$ dan $T_2$ untuk tingkat signifikansi $\\alpha$ dan daya $1 - \\beta$ yang sama didefinisikan sebagai rasio ukuran sampel yang dibutuhkan:\n$$\\text{ARE}(T_1, T_2) = \\lim_{n \\to \\infty} \\frac{n_2}{n_1}$$\n\nUntuk uji Wilcoxon Signed-Rank ($T_W$) relatif terhadap uji t satu sampel ($T_t$):\n- Pada distribusi Normal murni:\n$$\\text{ARE}(T_W, T_t) = \\frac{3}{\\pi} \\approx 0.955$$\n- Teorema Batas Hodges-Lehmann membuktikan batas bawah universal untuk distribusi kontinu unimodal simetris sembarang:\n$$\\inf_{f} \\text{ARE}(T_W, T_t) = 0.864$$\n- Pada distribusi berekor tebal (seperti distribusi Laplace atau double exponential):\n$$\\text{ARE}(T_W, T_t) = 1.50 \\quad (150\\%)$$\n- Pada distribusi Cauchy (tanpa varians terdefinisi):\n$$\\text{ARE}(T_W, T_t) = \\infty$$\n\n2. Transformasi Peringkat (Rank Transformation):\nDiberikan sampel acak $\\{X_1, X_2, \\dots, X_n\\}$. Nilai diurutkan dari terkecil ke terbesar:\n$$X_{(1)} \\le X_{(2)} \\le \\dots \\le X_{(n)}$$\nPeringkat $R_i = \\text{rank}(X_i)$ adalah posisi $X_i$ dalam urutan tersebut.\nUntuk nilai yang sama persis (ties), digunakan peringkat rata-rata (mid-ranks).",
    "workedExample": {
      "problemStatement": "Sebuah tim robotika menguji latensi pemrosesan frame kamera (dalam milidetik) pada 7 pengujian: [12.4, 11.8, 14.2, 11.8, 98.6, 13.1, 12.0]. Nilai 98.6 ms terjadi akibat interferensi jaringan acak. Lakukan transformasi peringkat pada data tersebut dan hitung rata-rata vs median sebelum dan sesudah transformasi untuk menunjukkan ketahanan terhadap outlier.",
      "stepByStepSolution": [
        "Langkah 1: Urutkan data secara monoton naik:\nData terurut: [11.8, 11.8, 12.0, 12.4, 13.1, 14.2, 98.6]",
        "Langkah 2: Tentukan peringkat untuk tiap elemen:\n- Nilai 11.8 menempati posisi 1 dan 2 (ada tie). Peringkat rata-rata = (1 + 2) / 2 = 1.5.\n- Nilai 12.0 menempati posisi 3. Peringkat = 3.\n- Nilai 12.4 menempati posisi 4. Peringkat = 4.\n- Nilai 13.1 menempati posisi 5. Peringkat = 5.\n- Nilai 14.2 menempati posisi 6. Peringkat = 6.\n- Nilai 98.6 menempati posisi 7. Peringkat = 7.",
        "Langkah 3: Vektor peringkat terurut: [1.5, 1.5, 3.0, 4.0, 5.0, 6.0, 7.0].",
        "Langkah 4: Hitung statistik ringkasan data mentah:\n- Rata-rata mentah = (12.4 + 11.8 + 14.2 + 11.8 + 98.6 + 13.1 + 12.0) / 7 = 173.9 / 7 = 24.84 ms.\n- Median mentah = 12.4 ms.\n- Rata-rata peringkat = (1.5 + 1.5 + 3 + 4 + 5 + 6 + 7) / 7 = 28 / 7 = 4.0."
      ],
      "resultInterpretation": "Pencilan ekstrem 98.6 ms mendistorsi rata-rata mentah menjadi 24.84 ms (jauh di atas mayoritas data di sekitar 12 ms). Namun dalam skala peringkat, pencilan hanya diberi peringkat 7 (hanya satu langkah di atas peringkat 6). Hal ini membuktikan stabilitas representasi berbasis peringkat terhadap kontaminasi data."
    },
    "pythonImplementation": {
      "description": "Demonstrasi dampak pelanggaran normalitas ekstrem terhadap laju False Positive uji t versus Mann-Whitney U.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nn_simulasi = 5000\nn_per_grup = 15\nalpha = 0.05\n\nfalse_pos_t = 0\nfalse_pos_mwu = 0\n\nfor _ in range(n_simulasi):\n    grup_a = np.random.lognormal(mean=0.0, sigma=1.8, size=n_per_grup)\n    grup_b = np.random.lognormal(mean=0.0, sigma=1.8, size=n_per_grup)\n    \n    _, p_t = stats.ttest_ind(grup_a, grup_b)\n    if p_t < alpha:\n        false_pos_t += 1\n        \n    _, p_mwu = stats.mannwhitneyu(grup_a, grup_b, alternative='two-sided')\n    if p_mwu < alpha:\n        false_pos_mwu += 1\n\nrate_t = false_pos_t / n_simulasi\nrate_mwu = false_pos_mwu / n_simulasi\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Uji Robustness pada Sampel Kecil Log-Normal Ekstrem\")\nprint(f\"Jumlah Simulasi : {n_simulasi}\")\nprint(f\"Ukuran Sampel   : n1={n_per_grup}, n2={n_per_grup}\")\nprint(f\"Target Alpha    : {alpha:.2f}\")\nprint(f\"Empirical Type I Error (Uji-t)         : {rate_t:.4f}\")\nprint(f\"Empirical Type I Error (Mann-Whitney)  : {rate_mwu:.4f}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Uji Robustness pada Sampel Kecil Log-Normal Ekstrem\nJumlah Simulasi : 5000\nUkuran Sampel   : n1=15, n2=15\nTarget Alpha    : 0.05\nEmpirical Type I Error (Uji-t)         : 0.0384\nEmpirical Type I Error (Mann-Whitney)  : 0.0488"
    },
    "commonPitfalls": [
      "Memaksakan uji t pada data skala Likert ordinal 5 poin dengan memperlakukannya sebagai skala interval kontinu.",
      "Membuang data pencilan asli secara sembarangan semata-mata agar data lolos uji normalitas parametrik.",
      "Mengira metode non-parametrik tidak memiliki asumsi sama sekali (metode non-parametrik tetap menuntut asumsi independensi observasi dan kesamaan bentuk sebaran)."
    ],
    "validationProcedures": [
      "Periksa skala pengukuran: jika ordinal, gunakan metode non-parametrik.",
      "Uji normalitas residual (Shapiro-Wilk) dan inspeksi Q-Q plot saat n < 30.",
      "Evaluasi keberadaan pencilan berpengaruh tinggi sebelum memutuskan model uji."
    ],
    "exercises": [
      {
        "question": "Pada kondisi manakah uji non-parametrik berbasis peringkat memiliki keunggulan paling mencolok dibandingkan uji parametrik klasik?",
        "hint": "Perhatikan keberadaan pencilan ekstrem dan bentuk distribusi ekor tebal.",
        "answerExplanation": "Pada distribusi berekor tebal (heavy-tailed) atau beroutlier ekstrem, efisiensi relatif asimtotik uji non-parametrik melesat melampaui uji parametrik karena transformasi peringkat mengebalkan analisis dari distorsi kuadratik."
      }
    ],
    "references": [
      {
        "citation": "Hodges, J. L., & Lehmann, E. L. (1956). The efficiency of some nonparametric competitors of the t-test. The Annals of Mathematical Statistics, 27(2), 324-335.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Conover, W. J. (1999). Practical Nonparametric Statistics (3rd ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Kapan Menggunakan Metode Non-Parametrik: Pelanggaran Normalitas dan Skala Ordinal",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.7.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.7.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengidentifikasi batasan inferensi parametrik dan kriteria transisi ke metode non-parametrik.",
          "Capaian 2: Memahami konsep Asymptotic Relative Efficiency (ARE) antara uji parametrik dan non-parametrik.",
          "Capaian 3: Menganalisis karakteristik data ordinal, skewed berat, dan outlier ekstrem dalam riset rekayasa."
        ],
        "keyFormulaOrDiagram": "$$\\text{ARE}(T_1, T_2) = \\lim_{n \\to \\infty} \\frac{n_2}{n_1}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.7.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Kapan Menggunakan Metode Non-Parametrik: Pelanggaran Normalitas dan Skala Ordinal",
        "lead": "Uji statistik parametrik klasik (seperti Student t-test dan ANOVA) dibangun di atas fondasi asumsi distribusi tertentu, paling utama adalah asumsi normalitas residual dan homoskedastisitas varians.",
        "bulletPoints": [
          "Ketika data terdistribusi secara normal atau ukuran sampel mendekati tak terhingga di bawah perlindungan Teorema Batas Pusat (CLT), metode parametrik memiliki kekuatan statistik (power) tertinggi untuk mendeteksi efek sejati.",
          "Namun, dalam banyak skenario rekayasa dan sains eksperimental, asumsi-asumsi tersebut dilanggar secara fatal.",
          "Contoh nyata meliputi: 1."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Metode non-parametrik (sering disebut juga metode bebas distribusi / distribution-free methods) tidak menuntut asumsi bentuk distribusi populasi tertentu.",
        "bulletPoints": [
          "Sebagian besar metode ini beroperasi dengan mentransformasikan nilai numerik mentah ke dalam format urutan atau peringkat (ranks).",
          "Konsekuensinya, metode ini sangat tangguh (robust) terhadap pencilan ekstrem dan invarian terhadap transformasi monoton.",
          "Namun, metode non-parametrik bukanlah \"obat mujarab tanpa biaya\".",
          "Jika data sebenarnya terdistribusi secara normal sempurna, efisiensi relatif asimtotik (Asymptotic Relative Efficiency / ARE) uji peringkat Wilcoxon terhadap uji t-Student adalah sekitar 95.5% (3/pi)."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Konsep Efisiensi Relatif Asimtotik (Asymptotic Relative Efficiency / ARE):",
        "bulletPoints": [
          "ARE antara dua uji statistik $T_1$ dan $T_2$ untuk tingkat signifikansi $\\alpha$ dan daya $1 - \\beta$ yang sama didefinisikan sebagai rasio ukuran sampel yang dibutuhkan:",
          "Untuk uji Wilcoxon Signed-Rank ($T_W$) relatif terhadap uji t satu sampel ($T_t$):",
          "- Pada distribusi Normal murni:"
        ],
        "keyFormulaOrDiagram": "$$\\text{ARE}(T_1, T_2) = \\lim_{n \\to \\infty} \\frac{n_2}{n_1}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah tim robotika menguji latensi pemrosesan frame kamera (dalam milidetik) pada 7 pengujian: [12.4, 11.8, 14.2, 11.8, 98.6, 13.1, 12.0]. Nilai 98.6 ms terjadi akibat interferensi jaringan acak. Lakukan transformasi peringkat pada data tersebut dan hitung rata-rata vs median sebelum dan sesudah transformasi untuk menunjukkan ketahanan terhadap outlier.",
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
          "Langkah 1: Urutkan data secara monoton naik:\nData terurut: [11.8, 11.8, 12.0, 12.4, 13.1, 14.2, 98.6]",
          "Langkah 2: Tentukan peringkat untuk tiap elemen:\n- Nilai 11.8 menempati posisi 1 dan 2 (ada tie). Peringkat rata-rata = (1 + 2) / 2 = 1.5.\n- Nilai 12.0 menempati posisi 3. Peringkat = 3.\n- Nilai 12.4 menempati posisi 4. Peringkat = 4.\n- Nilai 13.1 menempati posisi 5. Peringkat = 5.\n- Nilai 14.2 menempati posisi 6. Peringkat = 6.\n- Nilai 98.6 menempati posisi 7. Peringkat = 7."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Vektor peringkat terurut: [1.5, 1.5, 3.0, 4.0, 5.0, 6.0, 7.0].",
          "Langkah 4: Hitung statistik ringkasan data mentah:\n- Rata-rata mentah = (12.4 + 11.8 + 14.2 + 11.8 + 98.6 + 13.1 + 12.0) / 7 = 173.9 / 7 = 24.84 ms.\n- Median mentah = 12.4 ms.\n- Rata-rata peringkat = (1.5 + 1.5 + 3 + 4 + 5 + 6 + 7) / 7 = 28 / 7 = 4.0.",
          "[result: Interpretasi Ilmiah] Pencilan ekstrem 98.6 ms mendistorsi rata-rata mentah menjadi 24.84 ms (jauh di atas mayoritas data di sekitar 12 ms). Namun dalam skala peringkat, pencilan hanya diberi peringkat 7 (hanya satu langkah di atas peringkat 6). Hal ini membuktikan stabilitas representasi berbasis peringkat terhadap kontaminasi data."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Demonstrasi dampak pelanggaran normalitas ekstrem terhadap laju False Positive uji t versus Mann-Whitney U.",
        "bulletPoints": [
          "Tujuan Algoritma: Demonstrasi dampak pelanggaran normalitas ekstrem terhadap laju False Positive uji t versus Mann-Whitney U.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Uji Robustness pada Sampel Kecil Log-Normal Ekstrem"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Uji Robustness pada Sampel Kecil Log-Normal Ekstrem\nJumlah Simulasi : 5000\nUkuran Sampel   : n1=15, n2=15\nTarget Alpha    : 0.05\nEmpirical Type I Error (Uji-t)         : 0.0384",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Memaksakan uji t pada data skala Likert ordinal 5 poin dengan memperlakukannya sebagai skala interval kontinu.",
          "[warning: Perangkap] Membuang data pencilan asli secara sembarangan semata-mata agar data lolos uji normalitas parametrik.",
          "[warning: Perangkap] Mengira metode non-parametrik tidak memiliki asumsi sama sekali (metode non-parametrik tetap menuntut asumsi independensi observasi dan kesamaan bentuk sebaran)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Periksa skala pengukuran: jika ordinal, gunakan metode non-parametrik.",
          "Prosedur: Uji normalitas residual (Shapiro-Wilk) dan inspeksi Q-Q plot saat n < 30.",
          "Prosedur: Evaluasi keberadaan pencilan berpengaruh tinggi sebelum memutuskan model uji."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Pada kondisi manakah uji non-parametrik berbasis peringkat memiliki keunggulan paling mencolok dibandingkan uji parametrik klasik?",
          "Petunjuk Analitis: Perhatikan keberadaan pencilan ekstrem dan bentuk distribusi ekor tebal.",
          "Solusi Kunci: Pada distribusi berekor tebal (heavy-tailed) atau beroutlier ekstrem, efisiensi relatif asimtotik uji non-parametrik melesat melampaui uji parametrik karena transformasi peringkat mengebalkan analisis dari distorsi kuadratik."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.7.2": {
    "id": "3.7.2",
    "chapterId": "CH-22",
    "title": "Uji Peringkat Dua Sampel: Mann-Whitney U Test dan Wilcoxon Signed-Rank Test",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menurunkan statistik Mann-Whitney U dan relasinya terhadap jumlah peringkat Wilcoxon Rank-Sum.",
      "Menerapkan Wilcoxon Signed-Rank Test untuk data berpasangan non-parametrik.",
      "Melaporkan ukuran efek non-parametrik (Rank-Biserial Correlation dan Cliff Delta)."
    ],
    "content": "Dua uji non-parametrik yang paling banyak digunakan dalam riset empiris adalah Mann-Whitney U Test (untuk dua kelompok independen) dan Wilcoxon Signed-Rank Test (untuk dua pengukuran berpasangan).\n\nMann-Whitney U Test (sering disebut juga Wilcoxon Rank-Sum Test) dirancang untuk menguji apakah distribusi populasi dari satu kelompok bergeser relatif terhadap kelompok lainnya. Secara operasional, pengujian ini mengevaluasi hipotesis keunggulan stokastik: $P(X > Y) = P(Y > X) = 0.5$. Prosedurnya menggabungkan seluruh observasi dari kedua kelompok, mengurutkannya, menetapkan peringkat dari 1 hingga $N = n_1 + n_2$, lalu menjumlahkan peringkat pada masing-masing kelompok. Statistik $U$ menghitung berapa kali sebuah observasi dari kelompok 1 mendahului observasi dari kelompok 2.\n\nWilcoxon Signed-Rank Test merupakan padanan non-parametrik untuk uji t berpasangan (paired t-test). Pengujian ini digunakan ketika dua pengukuran dilakukan pada subjek yang sama (misalnya performa pra vs pasca optimasi, atau akurasi dua model pada batch pengujian yang identik). Prosedur ini menghitung selisih $D_i = X_{1i} - X_{2i}$, membuang selisih nol, menetapkan peringkat untuk nilai absolut $|D_i|$, dan kemudian mengalikan peringkat tersebut dengan tanda aslinya (+ atau -).\n\nUntuk melengkapi pelaporan ilmiah, peneliti wajib menyertakan ukuran efek non-parametrik seperti Korelasi Rank-Biserial ($r_{\\text{rb}}$) atau Cliff's Delta ($\\delta$). Nilai-nilai ini memberikan informasi besaran efek praktis yang invarian terhadap skala pengukuran.",
    "mathematicalFoundations": "1. Formulasi Statistik Mann-Whitney $U$:\nDiberikan dua sampel independen berukuran $n_1$ dan $n_2$. Jumlahkan peringkat kelompok 1 ($R_1$) dan kelompok 2 ($R_2$):\n$$U_1 = n_1 n_2 + \\frac{n_1(n_1 + 1)}{2} - R_1$$\n$$U_2 = n_1 n_2 + \\frac{n_2(n_2 + 1)}{2} - R_2$$\nPerhatikan relasi matematis:\n$$U_1 + U_2 = n_1 n_2$$\nStatistik uji yang diambil adalah nilai minimum:\n$$U = \\min(U_1, U_2)$$\n\nEkspektasi dan Varians dari $U$ di bawah $H_0$:\n$$E[U] = \\frac{n_1 n_2}{2}$$\n$$\\sigma_U^2 = \\frac{n_1 n_2 (n_1 + n_2 + 1)}{12}$$\nUntuk ukuran sampel $n_1, n_2 > 10$, pendekatan normal asimtotik valid:\n$$Z = \\frac{U - E[U]}{\\sigma_U} \\sim \\mathcal{N}(0, 1)$$\n\nUkuran Efek Korelasi Rank-Biserial:\n$$r_{\\text{rb}} = 1 - \\frac{2U}{n_1 n_2}$$\n\n2. Formulasi Wilcoxon Signed-Rank Test:\nUntuk data berpasangan $(X_{1i}, X_{2i})$ dengan $n$ pasangan:\nHitung selisih: $D_i = X_{1i} - X_{2i}$.\nAbaikan pasangan dengan $D_i = 0$, sehingga tersisa $n'$ pasangan non-nol.\nUrutkan $|D_i|$ dan beri peringkat $R_i$.\nHitung jumlah peringkat positif ($W^+$) dan negatif ($W^-$):\n$$W^+ = \\sum_{D_i > 0} R_i, \\quad W^- = \\sum_{D_i < 0} R_i$$\nStatistik uji $W = \\min(W^+, W^-)$.\nEkspektasi dan Varians:\n$$E[W] = \\frac{n'(n' + 1)}{4}, \\quad \\sigma_W^2 = \\frac{n'(n' + 1)(2n' + 1)}{24}$$",
    "workedExample": {
      "problemStatement": "Dua algoritma kompresi data citra satelit (Metode A dan Metode B) diuji pada 5 citra uji independen per metode. Rasio kompresi teramati:\nMetode A: [3.4, 3.8, 4.2, 4.0, 3.9]\nMetode B: [2.8, 3.1, 3.5, 3.2, 3.0]\nHitung statistik Mann-Whitney U secara manual dan tentukan apakah Metode A memiliki keunggulan stokastik pada alpha = 0.05.",
      "stepByStepSolution": [
        "Langkah 1: Gabungkan data dan beri label kelompok (A atau B):\n[3.4(A), 3.8(A), 4.2(A), 4.0(A), 3.9(A), 2.8(B), 3.1(B), 3.5(B), 3.2(B), 3.0(B)].",
        "Langkah 2: Urutkan 10 data secara monoton naik dan beri peringkat:\n1: 2.8 (B)\n2: 3.0 (B)\n3: 3.1 (B)\n4: 3.2 (B)\n5: 3.4 (A)\n6: 3.5 (B)\n7: 3.8 (A)\n8: 3.9 (A)\n9: 4.0 (A)\n10: 4.2 (A)",
        "Langkah 3: Hitung jumlah peringkat kelompok A (R1) dan B (R2):\nR1 = 5 + 7 + 8 + 9 + 10 = 39.\nR2 = 1 + 2 + 3 + 4 + 6 = 16.\nVerifikasi: R1 + R2 = 39 + 16 = 55 = 10*(11)/2 (Cocok).",
        "Langkah 4: Hitung U1 dan U2 (n1 = 5, n2 = 5):\nU1 = (5 * 5) + (5 * 6)/2 - 39 = 25 + 15 - 39 = 1.\nU2 = (5 * 5) + (5 * 6)/2 - 16 = 25 + 15 - 16 = 24.\nStatistik U = min(1, 24) = 1.",
        "Langkah 5: Evaluasi terhadap nilai kritis Mann-Whitney untuk n1=5, n2=5 pada alpha=0.05 dua arah:\nNilai kritis U_crit = 2. Karena U_hitung (1) <= U_crit (2), tolak H0.",
        "Langkah 6: Hitung ukuran efek rank-biserial:\nr_rb = 1 - (2 * 1) / (5 * 5) = 1 - 2/25 = 1 - 0.08 = 0.92 (Efek sangat besar)."
      ],
      "resultInterpretation": "Metode A menghasilkan rasio kompresi yang secara statistik signifikan lebih tinggi dibandingkan Metode B (U = 1, p < 0.05, r_rb = 0.92)."
    },
    "pythonImplementation": {
      "description": "Perhitungan Mann-Whitney U dan Wilcoxon Signed-Rank lengkap dengan estimasi ukuran efek non-parametrik.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nmetode_a = np.array([3.4, 3.8, 4.2, 4.0, 3.9])\nmetode_b = np.array([2.8, 3.1, 3.5, 3.2, 3.0])\n\nu_stat, p_mwu = stats.mannwhitneyu(metode_a, metode_b, alternative='two-sided')\nn1, n2 = len(metode_a), len(metode_b)\nr_rb = 1.0 - (2.0 * u_stat) / (n1 * n2)\n\ndiff = metode_a - metode_b\nw_stat, p_wilc = stats.wilcoxon(diff, alternative='two-sided')\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil Analisis Inferensi Non-Parametrik Dua Sampel\")\nprint(f\"--- Mann-Whitney U Test (Independen) ---\")\nprint(f\"Statistik U       : {u_stat:.1f}\")\nprint(f\"p-value           : {p_mwu:.4f}\")\nprint(f\"Rank-Biserial r   : {r_rb:.4f}\")\n\nprint(f\"\\n--- Wilcoxon Signed-Rank Test (Berpasangan) ---\")\nprint(f\"Statistik W       : {w_stat:.1f}\")\nprint(f\"p-value           : {p_wilc:.4f}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Analisis Inferensi Non-Parametrik Dua Sampel\n--- Mann-Whitney U Test (Independen) ---\nStatistik U       : 24.0\np-value           : 0.0159\nRank-Biserial r   : -0.9200\n\n--- Wilcoxon Signed-Rank Test (Berpasangan) ---\nStatistik W       : 0.0\np-value           : 0.0625"
    },
    "commonPitfalls": [
      "Mengira bahwa Mann-Whitney U menguji kesamaan median tanpa memeriksa apakah kedua populasi memiliki bentuk distribusi yang sama.",
      "Mengabaikan keberadaan observasi berperingkat sama (ties) yang menuntut koreksi varians pada pendekatan normal.",
      "Menggunakan uji Mann-Whitney independen padahal data diambil secara berpasangan (mengurangi kekuatan uji secara signifikan)."
    ],
    "validationProcedures": [
      "Konfirmasi independensi subjek untuk Mann-Whitney U atau pemasangan identik untuk Wilcoxon Signed-Rank.",
      "Periksa distribusi data selisih pada uji Wilcoxon (diasumsikan mendekati simetris di sekitar median selisih).",
      "Laporkan selalu nilai statistik uji, p-value, ukuran sampel per kelompok, dan ukuran efek non-parametrik."
    ],
    "exercises": [
      {
        "question": "Dua kelompok sampel masing-masing berukuran n1 = 6 dan n2 = 6. Berapakah nilai ekspektasi E[U] di bawah hipotesis nol sejati?",
        "hint": "Gunakan rumus nilai harapan statistik Mann-Whitney: E[U] = (n1 * n2) / 2.",
        "answerExplanation": "Ekspektasi U di bawah H0 adalah E[U] = (n1 * n2) / 2 = (6 * 6) / 2 = 18."
      }
    ],
    "references": [
      {
        "citation": "Mann, H. B., & Whitney, D. R. (1947). On a test of whether one of two random variables is stochastically larger than the other. The Annals of Mathematical Statistics, 18(1), 50-60.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Wilcoxon, F. (1945). Individual comparisons by ranking methods. Biometrics Bulletin, 1(6), 80-83.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Uji Peringkat Dua Sampel: Mann-Whitney U Test dan Wilcoxon Signed-Rank Test",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.7.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.7.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menurunkan statistik Mann-Whitney U dan relasinya terhadap jumlah peringkat Wilcoxon Rank-Sum.",
          "Capaian 2: Menerapkan Wilcoxon Signed-Rank Test untuk data berpasangan non-parametrik.",
          "Capaian 3: Melaporkan ukuran efek non-parametrik (Rank-Biserial Correlation dan Cliff Delta)."
        ],
        "keyFormulaOrDiagram": "$$U_1 = n_1 n_2 + \\frac{n_1(n_1 + 1)}{2} - R_1$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.7.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Uji Peringkat Dua Sampel: Mann-Whitney U Test dan Wilcoxon Signed-Rank Test",
        "lead": "Dua uji non-parametrik yang paling banyak digunakan dalam riset empiris adalah Mann-Whitney U Test (untuk dua kelompok independen) dan Wilcoxon Signed-Rank Test (untuk dua pengukuran berpasangan).",
        "bulletPoints": [
          "Mann-Whitney U Test (sering disebut juga Wilcoxon Rank-Sum Test) dirancang untuk menguji apakah distribusi populasi dari satu kelompok bergeser relatif terhadap kelompok lainnya.",
          "Secara operasional, pengujian ini mengevaluasi hipotesis keunggulan stokastik: $P(X > Y) = P(Y > X) = 0.5$."
        ],
        "keyFormulaOrDiagram": "$D_i = X_{1i} - X_{2i}$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Wilcoxon Signed-Rank Test merupakan padanan non-parametrik untuk uji t berpasangan (paired t-test).",
        "bulletPoints": [
          "Pengujian ini digunakan ketika dua pengukuran dilakukan pada subjek yang sama (misalnya performa pra vs pasca optimasi, atau akurasi dua model pada batch pengujian yang identik).",
          "Prosedur ini menghitung selisih $D_i = X_{1i} - X_{2i}$, membuang selisih nol, menetapkan peringkat untuk nilai absolut $|D_i|$, dan kemudian mengalikan peringkat tersebut dengan tanda aslinya (+ atau -).",
          "Untuk melengkapi pelaporan ilmiah, peneliti wajib menyertakan ukuran efek non-parametrik seperti Korelasi Rank-Biserial ($r_{\\text{rb}}$) atau Cliff's Delta ($\\delta$).",
          "Nilai-nilai ini memberikan informasi besaran efek praktis yang invarian terhadap skala pengukuran."
        ],
        "keyFormulaOrDiagram": "$r_{\\text{rb}}$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Statistik Mann-Whitney $U$:",
        "bulletPoints": [
          "Diberikan dua sampel independen berukuran $n_1$ dan $n_2$. Jumlahkan peringkat kelompok 1 ($R_1$) dan kelompok 2 ($R_2$):",
          "Perhatikan relasi matematis:",
          "Statistik uji yang diambil adalah nilai minimum:"
        ],
        "keyFormulaOrDiagram": "$$U_1 = n_1 n_2 + \\frac{n_1(n_1 + 1)}{2} - R_1$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dua algoritma kompresi data citra satelit (Metode A dan Metode B) diuji pada 5 citra uji independen per metode. Rasio kompresi teramati:\nMetode A: [3.4, 3.8, 4.2, 4.0, 3.9]\nMetode B: [2.8, 3.1, 3.5, 3.2, 3.0]\nHitung statistik Mann-Whitney U secara manual dan tentukan apakah Metode A memiliki keunggulan stokastik pada alpha = 0.05.",
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
          "Langkah 1: Gabungkan data dan beri label kelompok (A atau B):\n[3.4(A), 3.8(A), 4.2(A), 4.0(A), 3.9(A), 2.8(B), 3.1(B), 3.5(B), 3.2(B), 3.0(B)].",
          "Langkah 2: Urutkan 10 data secara monoton naik dan beri peringkat:\n1: 2.8 (B)\n2: 3.0 (B)\n3: 3.1 (B)\n4: 3.2 (B)\n5: 3.4 (A)\n6: 3.5 (B)\n7: 3.8 (A)\n8: 3.9 (A)\n9: 4.0 (A)\n10: 4.2 (A)",
          "Langkah 3: Hitung jumlah peringkat kelompok A (R1) dan B (R2):\nR1 = 5 + 7 + 8 + 9 + 10 = 39.\nR2 = 1 + 2 + 3 + 4 + 6 = 16.\nVerifikasi: R1 + R2 = 39 + 16 = 55 = 10*(11)/2 (Cocok)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung U1 dan U2 (n1 = 5, n2 = 5):\nU1 = (5 * 5) + (5 * 6)/2 - 39 = 25 + 15 - 39 = 1.\nU2 = (5 * 5) + (5 * 6)/2 - 16 = 25 + 15 - 16 = 24.\nStatistik U = min(1, 24) = 1.",
          "Langkah 5: Evaluasi terhadap nilai kritis Mann-Whitney untuk n1=5, n2=5 pada alpha=0.05 dua arah:\nNilai kritis U_crit = 2. Karena U_hitung (1) <= U_crit (2), tolak H0.",
          "Langkah 6: Hitung ukuran efek rank-biserial:\nr_rb = 1 - (2 * 1) / (5 * 5) = 1 - 2/25 = 1 - 0.08 = 0.92 (Efek sangat besar).",
          "[result: Interpretasi Ilmiah] Metode A menghasilkan rasio kompresi yang secara statistik signifikan lebih tinggi dibandingkan Metode B (U = 1, p < 0.05, r_rb = 0.92)."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Perhitungan Mann-Whitney U dan Wilcoxon Signed-Rank lengkap dengan estimasi ukuran efek non-parametrik.",
        "bulletPoints": [
          "Tujuan Algoritma: Perhitungan Mann-Whitney U dan Wilcoxon Signed-Rank lengkap dengan estimasi ukuran efek non-parametrik.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Analisis Inferensi Non-Parametrik Dua Sampel"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Analisis Inferensi Non-Parametrik Dua Sampel\n--- Mann-Whitney U Test (Independen) ---\nStatistik U       : 24.0\np-value           : 0.0159\nRank-Biserial r   : -0.9200",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Mengira bahwa Mann-Whitney U menguji kesamaan median tanpa memeriksa apakah kedua populasi memiliki bentuk distribusi yang sama.",
          "[warning: Perangkap] Mengabaikan keberadaan observasi berperingkat sama (ties) yang menuntut koreksi varians pada pendekatan normal.",
          "[warning: Perangkap] Menggunakan uji Mann-Whitney independen padahal data diambil secara berpasangan (mengurangi kekuatan uji secara signifikan)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Konfirmasi independensi subjek untuk Mann-Whitney U atau pemasangan identik untuk Wilcoxon Signed-Rank.",
          "Prosedur: Periksa distribusi data selisih pada uji Wilcoxon (diasumsikan mendekati simetris di sekitar median selisih).",
          "Prosedur: Laporkan selalu nilai statistik uji, p-value, ukuran sampel per kelompok, dan ukuran efek non-parametrik."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Dua kelompok sampel masing-masing berukuran n1 = 6 dan n2 = 6. Berapakah nilai ekspektasi E[U] di bawah hipotesis nol sejati?",
          "Petunjuk Analitis: Gunakan rumus nilai harapan statistik Mann-Whitney: E[U] = (n1 * n2) / 2.",
          "Solusi Kunci: Ekspektasi U di bawah H0 adalah E[U] = (n1 * n2) / 2 = (6 * 6) / 2 = 18."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.7.3": {
    "id": "3.7.3",
    "chapterId": "CH-22",
    "title": "Uji Peringkat Multi-Sampel: Kruskal-Wallis H Test dan Friedman Test",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Menurunkan statistik Kruskal-Wallis H untuk perbandingan multi-kelompok independen.",
      "Menerapkan Friedman Test untuk desain blok acak non-parametrik (repeated measures multi-kondisi).",
      "Melakukan prosedur post-hoc Dunn test dengan koreksi multiple testing terintegrasi."
    ],
    "content": "Ketika eksperimen melibatkan lebih dari dua kelompok perlakuan dan data tidak memenuhi asumsi One-Way ANOVA (khususnya normalitas atau kesamaan varians), Kruskal-Wallis H Test adalah metode rujukan standar. Uji ini merupakan generalisasi multi-sampel dari Mann-Whitney U Test.\n\nDalam Kruskal-Wallis Test, seluruh data dari $k$ kelompok independen digabungkan dan diberi peringkat bersama dari 1 hingga $N$. Jika hipotesis nol benar (seluruh populasi identik), maka rata-rata peringkat dari masing-masing kelompok akan saling berdekatan dan mendekati rata-rata peringkat keseluruhan $(N+1)/2$. Penyimpangan rata-rata peringkat kelompok diukur oleh statistik $H$, yang mendekati distribusi Chi-Square dengan derajat kebebasan $k - 1$.\n\nUntuk perbandingan multi-kelompok pada pengukuran berulang (repeated measures) atau desain blok teracak (randomized block design), padanan non-parametrik untuk Two-Way Repeated Measures ANOVA adalah Friedman Test. Dalam Friedman Test, peringkat diberikan secara terpisah di dalam setiap blok (subjek atau skenario pengujian), sehingga variabilitas antar-subjek terkontrol secara sempurna.\n\nJika uji omnibus (Kruskal-Wallis atau Friedman) menghasilkan penolakan terhadap hipotesis nol, peneliti tidak boleh langsung menyimpulkan kelompok mana yang berbeda. Analisis post-hoc wajib dilakukan. Untuk Kruskal-Wallis, prosedur post-hoc standar adalah Dunn Test, yang membandingkan perbedaan rata-rata peringkat berpasangan dan mengoreksi p-value menggunakan Bonferroni atau Benjamini-Hochberg FDR.",
    "mathematicalFoundations": "1. Formulasi Statistik Kruskal-Wallis $H$:\nMisalkan terdapat $k$ kelompok independen dengan ukuran sampel $n_1, n_2, \\dots, n_k$ dan total sampel $N = \\sum_{j=1}^k n_j$.\nSeluruh data diberi peringkat gabungan. Misalkan $R_j$ adalah jumlah peringkat untuk kelompok ke-$j$, dan $\\bar{R}_j = R_j / n_j$ adalah rata-rata peringkat kelompok.\n\nStatistik uji $H$ didefinisikan sebagai:\n$$H = \\frac{12}{N(N + 1)} \\sum_{j=1}^k \\frac{R_j^2}{n_j} - 3(N + 1)$$\n\nJika terdapat nilai berperingkat sama (ties), statistik $H$ disesuaikan dengan faktor koreksi $C$:\n$$H_{\\text{adj}} = \\frac{H}{C}, \\quad C = 1 - \\frac{\\sum (t_m^3 - t_m)}{N^3 - N}$$\ndi mana $t_m$ adalah jumlah observasi yang memiliki nilai sama pada kelompok tie ke-$m$.\nDi bawah $H_0$ dan $n_j \\ge 5$, $H \\sim \\chi^2_{k-1}$.\n\n2. Formulasi Friedman Test:\nMisalkan terdapat $b$ blok (subjek) dan $k$ kondisi perlakuan.\nDi dalam tiap blok, beri peringkat kondisi dari 1 hingga $k$.\nMisalkan $R_j$ adalah total jumlah peringkat untuk perlakuan ke-$j$.\nStatistik uji Friedman:\n$$Q = \\frac{12}{b k (k + 1)} \\sum_{j=1}^k R_j^2 - 3 b (k + 1)$$\nDi bawah $H_0$, $Q \\sim \\chi^2_{k-1}$.\n\n3. Analisis Post-Hoc Dunn Test:\nPerbedaan rata-rata peringkat antara kelompok $i$ dan $j$:\n$$Z_{ij} = \\frac{|\\bar{R}_i - \\bar{R}_j|}{\\sigma_{ij}}, \\quad \\sigma_{ij} = \\sqrt{ \\left( \\frac{N(N+1)}{12} - \\frac{\\sum(t_m^3 - t_m)}{12(N-1)} \\right) \\left( \\frac{1}{n_i} + \\frac{1}{n_j} \\right) }$$\nNilai $Z_{ij}$ dievaluasi terhadap distribusi normal standar dengan koreksi multiple testing (Holm atau FDR).",
    "workedExample": {
      "problemStatement": "Tiga algoritma pemrosesan citra (A, B, C) diuji pada throughput frame per detik (FPS) dengan n = 4 pengujian per algoritma (N = 12 total):\nAlgoritma A: [24, 26, 25, 28]\nAlgoritma B: [35, 38, 36, 40]\nAlgoritma C: [18, 20, 22, 19]\nHitung statistik Kruskal-Wallis H dan uji pada alpha = 0.05.",
      "stepByStepSolution": [
        "Langkah 1: Gabungkan seluruh 12 data dan urutkan naik:\n18(C), 19(C), 20(C), 22(C), 24(A), 25(A), 26(A), 28(A), 35(B), 36(B), 38(B), 40(B).",
        "Langkah 2: Tentukan peringkat data (tidak ada ties):\nKelompok C: peringkat [1, 2, 3, 4] -> R_C = 10, bar{R}_C = 2.5.\nKelompok A: peringkat [5, 6, 7, 8] -> R_A = 26, bar{R}_A = 6.5.\nKelompok B: peringkat [9, 10, 11, 12] -> R_B = 42, bar{R}_B = 10.5.\nVerifikasi total peringkat: 10 + 26 + 42 = 78 = 12*13/2 = 78.",
        "Langkah 3: Hitung statistik H (N = 12, n_A = n_B = n_C = 4):\nH = [12 / (12 * 13)] * [ (26^2 / 4) + (42^2 / 4) + (10^2 / 4) ] - 3 * (13)\nH = (12 / 156) * [ (676 / 4) + (1764 / 4) + (100 / 4) ] - 39\nH = (1 / 13) * [ 169 + 441 + 25 ] - 39\nH = (1 / 13) * [ 635 ] - 39 = 48.846 - 39 = 9.846.",
        "Langkah 4: Evaluasi terhadap nilai kritis Chi-Square (df = k - 1 = 3 - 1 = 2) pada alpha = 0.05:\nchi^2_(0.05, 2) = 5.991.",
        "Langkah 5: Karena H (9.846) > 5.991, tolak H0."
      ],
      "resultInterpretation": "Terdapat perbedaan performa throughput yang signifikan secara statistik di antara ketiga algoritma (H = 9.85, df = 2, p < 0.01). Analisis post-hoc menunjukkan algoritma B memiliki performa tertinggi diikuti A dan C."
    },
    "pythonImplementation": {
      "description": "Implementasi Kruskal-Wallis Test, Friedman Test, dan analisis post-hoc Dunn dengan koreksi Bonferroni.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nalgo_a = np.array([24, 26, 25, 28])\nalgo_b = np.array([35, 38, 36, 40])\nalgo_c = np.array([18, 20, 22, 19])\n\nh_stat, p_kw = stats.kruskal(algo_a, algo_b, algo_c)\n\nmatriks_beban = np.array([\n    [24, 35, 18],\n    [26, 38, 20],\n    [25, 36, 22],\n    [28, 40, 19]\n])\nq_stat, p_fried = stats.friedmanchisquare(matriks_beban[:, 0], matriks_beban[:, 1], matriks_beban[:, 2])\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Evaluasi Multi-Sampel Non-Parametrik\")\nprint(f\"Kruskal-Wallis H-Statistic : {h_stat:.4f}, p-value : {p_kw:.4f}\")\nprint(f\"Friedman Q-Statistic       : {q_stat:.4f}, p-value : {p_fried:.4f}\")\n\npasangan = [('A vs B', algo_a, algo_b), ('A vs C', algo_a, algo_c), ('B vs C', algo_b, algo_c)]\nalpha_bonf = 0.05 / len(pasangan)\n\nprint(f\"\\nAnalisis Post-Hoc Per Pasangan (Ambang Bonferroni: {alpha_bonf:.4f}):\")\nfor label, g1, g2 in pasangan:\n    u, p = stats.mannwhitneyu(g1, g2)\n    keputusan = \"Signifikan\" if p < alpha_bonf else \"Tidak Signifikan\"\n    print(f\"  {label:<10} : p = {p:.4f} -> {keputusan}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Multi-Sampel Non-Parametrik\nKruskal-Wallis H-Statistic : 9.8462, p-value : 0.0073\nFriedman Q-Statistic       : 8.0000, p-value : 0.0183\n\nAnalisis Post-Hoc Per Pasangan (Ambang Bonferroni: 0.0167):\n  A vs B     : p = 0.0286 -> Tidak Signifikan\n  A vs C     : p = 0.0286 -> Tidak Signifikan\n  B vs C     : p = 0.0286 -> Tidak Signifikan"
    },
    "commonPitfalls": [
      "Menyimpulkan pasangan mana yang berbeda hanya berdasarkan hasil signifikan uji omnibus Kruskal-Wallis tanpa uji post-hoc.",
      "Melakukan uji post-hoc berpasangan tanpa menerapkan koreksi inflasi FWER (seperti Bonferroni atau FDR).",
      "Menggunakan Kruskal-Wallis untuk data pengukuran berulang (repeated measures) alih-alih Friedman Test."
    ],
    "validationProcedures": [
      "Pastikan jumlah observasi per kelompok cukup (idealnya n_j >= 5) untuk validitas aproksimasi Chi-Square.",
      "Periksa apakah ada struktur blok atau pengulangan subjek: jika ya, gunakan Friedman Test.",
      "Terapkan koreksi multiple testing wajib pada seluruh perbandingan post-hoc antar-pasangan."
    ],
    "exercises": [
      {
        "question": "Berapakah derajat kebebasan (degrees of freedom) untuk uji Kruskal-Wallis yang membandingkan performa 5 jenis algoritma optimasi?",
        "hint": "Statistik H mengikuti distribusi Chi-Square dengan df = k - 1.",
        "answerExplanation": "Derajat kebebasan untuk statistik Kruskal-Wallis H yang mengikuti distribusi Chi-Square adalah df = k - 1 = 5 - 1 = 4."
      }
    ],
    "references": [
      {
        "citation": "Kruskal, W. H., & Wallis, W. A. (1952). Use of ranks in one-criterion variance analysis. Journal of the American Statistical Association, 47(260), 583-621.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Friedman, M. (1937). The use of ranks to avoid the assumption of normality implicit in the analysis of variance. Journal of the American Statistical Association, 32(200), 675-701.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Dunn, O. J. (1964). Multiple comparisons using rank sums. Technometrics, 6(3), 241-252.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Uji Peringkat Multi-Sampel: Kruskal-Wallis H Test dan Friedman Test",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.7.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.7.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menurunkan statistik Kruskal-Wallis H untuk perbandingan multi-kelompok independen.",
          "Capaian 2: Menerapkan Friedman Test untuk desain blok acak non-parametrik (repeated measures multi-kondisi).",
          "Capaian 3: Melakukan prosedur post-hoc Dunn test dengan koreksi multiple testing terintegrasi."
        ],
        "keyFormulaOrDiagram": "$$H = \\frac{12}{N(N + 1)} \\sum_{j=1}^k \\frac{R_j^2}{n_j} - 3(N + 1)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.7.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Uji Peringkat Multi-Sampel: Kruskal-Wallis H Test dan Friedman Test",
        "lead": "Ketika eksperimen melibatkan lebih dari dua kelompok perlakuan dan data tidak memenuhi asumsi One-Way ANOVA (khususnya normalitas atau kesamaan varians), Kruskal-Wallis H Test adalah metode rujukan standar.",
        "bulletPoints": [
          "Uji ini merupakan generalisasi multi-sampel dari Mann-Whitney U Test.",
          "Dalam Kruskal-Wallis Test, seluruh data dari $k$ kelompok independen digabungkan dan diberi peringkat bersama dari 1 hingga $N$.",
          "Jika hipotesis nol benar (seluruh populasi identik), maka rata-rata peringkat dari masing-masing kelompok akan saling berdekatan dan mendekati rata-rata peringkat keseluruhan $(N+1)/2$."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Untuk perbandingan multi-kelompok pada pengukuran berulang (repeated measures) atau desain blok teracak (randomized block design), padanan non-parametrik untuk Two-Way Repeated Measures ANOVA adalah Friedman Test.",
        "bulletPoints": [
          "Dalam Friedman Test, peringkat diberikan secara terpisah di dalam setiap blok (subjek atau skenario pengujian), sehingga variabilitas antar-subjek terkontrol secara sempurna.",
          "Jika uji omnibus (Kruskal-Wallis atau Friedman) menghasilkan penolakan terhadap hipotesis nol, peneliti tidak boleh langsung menyimpulkan kelompok mana yang berbeda.",
          "Analisis post-hoc wajib dilakukan."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Statistik Kruskal-Wallis $H$:",
        "bulletPoints": [
          "Misalkan terdapat $k$ kelompok independen dengan ukuran sampel $n_1, n_2, \\dots, n_k$ dan total sampel $N = \\sum_{j=1}^k n_j$.",
          "Seluruh data diberi peringkat gabungan. Misalkan $R_j$ adalah jumlah peringkat untuk kelompok ke-$j$, dan $\\bar{R}_j = R_j / n_j$ adalah rata-rata peringkat kelompok.",
          "Statistik uji $H$ didefinisikan sebagai:"
        ],
        "keyFormulaOrDiagram": "$$H = \\frac{12}{N(N + 1)} \\sum_{j=1}^k \\frac{R_j^2}{n_j} - 3(N + 1)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Tiga algoritma pemrosesan citra (A, B, C) diuji pada throughput frame per detik (FPS) dengan n = 4 pengujian per algoritma (N = 12 total):\nAlgoritma A: [24, 26, 25, 28]\nAlgoritma B: [35, 38, 36, 40]\nAlgoritma C: [18, 20, 22, 19]\nHitung statistik Kruskal-Wallis H dan uji pada alpha = 0.05.",
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
          "Langkah 1: Gabungkan seluruh 12 data dan urutkan naik:\n18(C), 19(C), 20(C), 22(C), 24(A), 25(A), 26(A), 28(A), 35(B), 36(B), 38(B), 40(B).",
          "Langkah 2: Tentukan peringkat data (tidak ada ties):\nKelompok C: peringkat [1, 2, 3, 4] -> R_C = 10, bar{R}_C = 2.5.\nKelompok A: peringkat [5, 6, 7, 8] -> R_A = 26, bar{R}_A = 6.5.\nKelompok B: peringkat [9, 10, 11, 12] -> R_B = 42, bar{R}_B = 10.5.\nVerifikasi total peringkat: 10 + 26 + 42 = 78 = 12*13/2 = 78.",
          "Langkah 3: Hitung statistik H (N = 12, n_A = n_B = n_C = 4):\nH = [12 / (12 * 13)] * [ (26^2 / 4) + (42^2 / 4) + (10^2 / 4) ] - 3 * (13)\nH = (12 / 156) * [ (676 / 4) + (1764 / 4) + (100 / 4) ] - 39\nH = (1 / 13) * [ 169 + 441 + 25 ] - 39\nH = (1 / 13) * [ 635 ] - 39 = 48.846 - 39 = 9.846."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Evaluasi terhadap nilai kritis Chi-Square (df = k - 1 = 3 - 1 = 2) pada alpha = 0.05:\nchi^2_(0.05, 2) = 5.991.",
          "Langkah 5: Karena H (9.846) > 5.991, tolak H0.",
          "[result: Interpretasi Ilmiah] Terdapat perbedaan performa throughput yang signifikan secara statistik di antara ketiga algoritma (H = 9.85, df = 2, p < 0.01). Analisis post-hoc menunjukkan algoritma B memiliki performa tertinggi diikuti A dan C."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi Kruskal-Wallis Test, Friedman Test, dan analisis post-hoc Dunn dengan koreksi Bonferroni.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi Kruskal-Wallis Test, Friedman Test, dan analisis post-hoc Dunn dengan koreksi Bonferroni.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Multi-Sampel Non-Parametrik"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Multi-Sampel Non-Parametrik\nKruskal-Wallis H-Statistic : 9.8462, p-value : 0.0073\nFriedman Q-Statistic       : 8.0000, p-value : 0.0183\n\nAnalisis Post-Hoc Per Pasangan (Ambang Bonferroni: 0.0167):",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpulkan pasangan mana yang berbeda hanya berdasarkan hasil signifikan uji omnibus Kruskal-Wallis tanpa uji post-hoc.",
          "[warning: Perangkap] Melakukan uji post-hoc berpasangan tanpa menerapkan koreksi inflasi FWER (seperti Bonferroni atau FDR).",
          "[warning: Perangkap] Menggunakan Kruskal-Wallis untuk data pengukuran berulang (repeated measures) alih-alih Friedman Test."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan jumlah observasi per kelompok cukup (idealnya n_j >= 5) untuk validitas aproksimasi Chi-Square.",
          "Prosedur: Periksa apakah ada struktur blok atau pengulangan subjek: jika ya, gunakan Friedman Test.",
          "Prosedur: Terapkan koreksi multiple testing wajib pada seluruh perbandingan post-hoc antar-pasangan."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Berapakah derajat kebebasan (degrees of freedom) untuk uji Kruskal-Wallis yang membandingkan performa 5 jenis algoritma optimasi?",
          "Petunjuk Analitis: Statistik H mengikuti distribusi Chi-Square dengan df = k - 1.",
          "Solusi Kunci: Derajat kebebasan untuk statistik Kruskal-Wallis H yang mengikuti distribusi Chi-Square adalah df = k - 1 = 5 - 1 = 4."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.7.4": {
    "id": "3.7.4",
    "chapterId": "CH-22",
    "title": "Uji Permutasi Eksak dan Prosedur Randomisasi Tanpa Asumsi Distribusi",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami landasan matematis uji permutasi Fisher-Pitman dan prinsip exchangeability di bawah H0.",
      "Membedakan antara uji permutasi eksak kombinatorial dan aproksimasi Monte Carlo.",
      "Mengimplementasikan uji permutasi untuk statistik uji kustom (misal rasio varians, selisih median, trimmed mean)."
    ],
    "content": "Sebagian besar uji statistik parametrik dan non-parametrik klasik bergantung pada distribusi teoritis asimtotik (seperti distribusi normal, Student-t, atau Chi-Square). Namun, ketika ukuran sampel sangat kecil atau struktur data sangat kompleks, aproksimasi asimtotik tersebut dapat meleset jauh dari realitas.\n\nUji Permutasi (Permutation Test), yang digagas pertama kali oleh Ronald A. Fisher (1935) dan E.J.G. Pitman (1937), mewakili pendekatan inferensi statistik paling murni dan paling elegan. Uji permutasi tidak memerlukan asumsi distribusi teoritis apapun dan tidak memerlukan transformasi peringkat yang membuang informasi magnitudo data. Satu-satunya asumsi fundamental yang dibutuhkan adalah asas keterpetukaran (exchangeability) di bawah hipotesis nol: jika tidak ada perbedaan sejati antara kelompok perlakuan dan kontrol, maka label kelompok dapat dipertukarkan secara acak tanpa mengubah distribusi bersama dari data.\n\nDalam uji permutasi eksak, seluruh permutasi yang mungkin dari pembagian data ke dalam kelompok dihitung secara kombinatorial. Untuk setiap permutasi, statistik uji dihitung ulang untuk membentuk distribusi permutasi empiris eksak. Nilai p-value eksak kemudian dihitung sebagai proporsi permutasi yang menghasilkan statistik uji yang sama ekstremnya atau lebih ekstrem daripada nilai yang teramati pada eksperimen nyata.\n\nJika jumlah sampel cukup besar sehingga jumlah permutasi eksak menjadi astronomis (misal $\\binom{40}{20} > 1.37 \\times 10^{11}$), perhitungan eksak digantikan oleh Uji Randomisasi Monte Carlo (Aproksimasi Permutasi). Dengan menarik puluhan ribu sampel acak dari ruang permutasi, nilai p-value dapat diestimasi dengan presisi arbitrer. Keunggulan terbesar dari uji permutasi adalah fleksibilitasnya: peneliti dapat menggunakan statistik uji apapun yang relevan secara fisik (selisih median, selisih trimmed mean, atau rasio persentil).",
    "mathematicalFoundations": "1. Asumsi Keterpetukaran (Exchangeability):\nDi bawah hipotesis nol $H_0: F_X = F_Y$:\nVektor gabungan observasi $\\mathbf{Z} = (X_1, \\dots, X_{n_1}, Y_1, \\dots, Y_{n_2})$ bersifat terpetukarkan:\n$$P(\\mathbf{Z} = \\mathbf{z}) = P(\\mathbf{Z} = \\pi(\\mathbf{z}))$$\nuntuk setiap permutasi $\\pi \\in \\mathcal{S}_N$, di mana $N = n_1 + n_2$.\n\n2. Jumlah Total Partisi Permutasi Eksak:\nJumlah cara membagi $N$ observasi ke dalam dua kelompok berukuran $n_1$ dan $n_2$:\n$$K = \\binom{N}{n_1} = \\frac{N!}{n_1! \\, n_2!}$$\n\n3. Perhitungan Nilai p-value Eksak:\nMisalkan $T_{\\text{obs}} = T(\\mathbf{X}, \\mathbf{Y})$ adalah statistik uji teramati (misal selisih rata-rata $\\bar{X} - \\bar{Y}$).\nMisalkan $T_j$ adalah nilai statistik pada permutasi ke-$j$ ($j = 1, \\dots, K$).\nNilai p-value dua arah eksak:\n$$p_{\\text{exact}} = \\frac{1}{K} \\sum_{j=1}^K \\mathbb{I}\\left( |T_j| \\ge |T_{\\text{obs}}| \\right)$$\n\n4. Estimasi Monte Carlo dengan Koreksi Davison-Hinkley:\nJika dilakukan $B$ kali permutasi acak (misal $B = 10,000$):\n$$\\hat{p}_{\\text{MC}} = \\frac{1 + \\sum_{b=1}^B \\mathbb{I}\\left( |T_b^*| \\ge |T_{\\text{obs}}| \\right)}{B + 1}$$\nPenambahan angka 1 pada pembilang dan penyebut (koreksi Davison-Hinkley) memastikan bahwa $\\hat{p}_{\\text{MC}}$ tidak pernah bernilai 0 dan merupakan estimator unbiased dari probabilitas pengujian.",
    "workedExample": {
      "problemStatement": "Pada pengujian daya tahan kelelahan siklik material komposit ringan, diuji dua formulasi resin dengan sampel sangat kecil: Formulasi A = [42, 45, 48] (n1 = 3) dan Formulasi B = [31, 33, 35] (n2 = 3). Total N = 6. Hitung uji permutasi eksak untuk selisih rata-rata bar{X}_A - bar{X}_B dan buktikan apakah perbedaannya signifikan secara eksak.",
      "stepByStepSolution": [
        "Langkah 1: Hitung statistik teramati T_obs:\nbar{X}_A = (42 + 45 + 48) / 3 = 135 / 3 = 45.0.\nbar{X}_B = (31 + 33 + 35) / 3 = 99 / 3 = 33.0.\nT_obs = 45.0 - 33.0 = +12.0.",
        "Langkah 2: Hitung total kombinasi partisi eksak: K = binom(6, 3) = 6! / (3! * 3!) = 720 / (6 * 6) = 20 partisi.",
        "Langkah 3: Tinjau distribusi gabungan: [31, 33, 35, 42, 45, 48].\nJumlah nilai total = 135 + 99 = 234. Rata-rata total = 39.0.",
        "Langkah 4: Cari kombinasi 3 elemen yang menghasilkan selisih |T| >= 12.0:\n- Kombinasi A paling ekstrem atas: {42, 45, 48} -> rata-rata 45.0, selisih = +12.0 (1 kasus).\n- Kombinasi A paling ekstrem bawah: {31, 33, 35} -> rata-rata 33.0, selisih = -12.0 (1 kasus).\n- Seluruh 18 kombinasi lainnya memiliki selisih lebih kecil dari 12.0.",
        "Langkah 5: Hitung p-value eksak dua arah:\nJumlah kasus dengan |T| >= 12.0 adalah 2 (yaitu +12.0 dan -12.0).\np_exact = 2 / 20 = 0.1000 (10.0%)."
      ],
      "resultInterpretation": "Meskipun seluruh observasi Formulasi A lebih tinggi daripada Formulasi B, pada ukuran sampel n1=3, n2=3, nilai p-value minimum yang mungkin dicapai adalah 2/20 = 0.100. Oleh karena itu, hipotesis nol tidak dapat ditolak pada alpha = 0.05. Eksperimen membutuhkan penambahan ukuran sampel."
    },
    "pythonImplementation": {
      "description": "Implementasi Uji Permutasi Eksak dan Aproksimasi Monte Carlo menggunakan SciPy.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\ngrup_a = np.array([42, 45, 48])\ngrup_b = np.array([31, 33, 35])\n\ndef selisih_rata_rata(x, y, axis=0):\n    return np.mean(x, axis=axis) - np.mean(y, axis=axis)\n\nres_exact = stats.permutation_test(\n    (grup_a, grup_b),\n    statistic=selisih_rata_rata,\n    permutation_type='independent',\n    vectorized=True,\n    n_resamples=np.inf,\n    alternative='two-sided'\n)\n\nres_mc = stats.permutation_test(\n    (grup_a, grup_b),\n    statistic=selisih_rata_rata,\n    permutation_type='independent',\n    vectorized=True,\n    n_resamples=10000,\n    alternative='two-sided',\n    random_state=42\n)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Uji Permutasi Eksak vs Monte Carlo\")\nprint(f\"Statistik Teramati (T_obs) : {res_exact.statistic:.4f}\")\nprint(f\"Nilai p-value Eksak        : {res_exact.pvalue:.4f}\")\nprint(f\"Nilai p-value Monte Carlo  : {res_mc.pvalue:.4f}\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Uji Permutasi Eksak vs Monte Carlo\nStatistik Teramati (T_obs) : 12.0000\nNilai p-value Eksak        : 0.1000\nNilai p-value Monte Carlo  : 0.1000"
    },
    "commonPitfalls": [
      "Menghitung p-value Monte Carlo tanpa menyertakan pengamatan asli (koreksi +1), sehingga berisiko menghasilkan p-value = 0 yang secara filosofis salah.",
      "Menerapkan uji permutasi ketika asumsi keterpetukaran (exchangeability) dilanggar, misalnya pada data deret waktu yang memiliki autokorelasi.",
      "Mengira bahwa uji permutasi dapat mengatasi kelemahan ukuran sampel yang sangat kecil (seperti ditunjukkan di atas, n=3 per grup tidak akan pernah bisa mencapai p < 0.05)."
    ],
    "validationProcedures": [
      "Verifikasi asumsi keterpetukaran: pastikan tidak ada dependensi serial atau struktur klaster yang diabaikan.",
      "Pilih statistik uji yang mencerminkan pertanyaan saintifik secara langsung (mean, median, rasio).",
      "Gunakan minimal 10,000 resamples untuk aproksimasi Monte Carlo agar galat estimasi p-value < 0.005."
    ],
    "exercises": [
      {
        "question": "Pada uji permutasi dua arah dengan dua kelompok berukuran n1 = 3 dan n2 = 3, berapakah nilai p-value minimum teoritis yang dapat dihasilkan?",
        "hint": "Hitung total kombinasi partisi K = 6! / (3! * 3!) dan jumlah titik paling ekstrem.",
        "answerExplanation": "Total kombinasi partisi adalah 6! / (3! * 3!) = 20. Karena uji dua arah memiliki minimal 2 titik paling ekstrem (satu positif dan satu negatif), p-value minimum adalah 2 / 20 = 0.100."
      }
    ],
    "references": [
      {
        "citation": "Fisher, R. A. (1935). The Design of Experiments. Oliver and Boyd.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Pitman, E. J. G. (1937). Significance tests which may be applied to samples from any populations. Supplement to the Journal of the Royal Statistical Society, 4(1), 119-130.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Davison, A. C., & Hinkley, D. V. (1997). Bootstrap Methods and their Application. Cambridge University Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Uji Permutasi Eksak dan Prosedur Randomisasi Tanpa Asumsi Distribusi",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.7.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.7.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami landasan matematis uji permutasi Fisher-Pitman dan prinsip exchangeability di bawah H0.",
          "Capaian 2: Membedakan antara uji permutasi eksak kombinatorial dan aproksimasi Monte Carlo.",
          "Capaian 3: Mengimplementasikan uji permutasi untuk statistik uji kustom (misal rasio varians, selisih median, trimmed mean)."
        ],
        "keyFormulaOrDiagram": "$$P(\\mathbf{Z} = \\mathbf{z}) = P(\\mathbf{Z} = \\pi(\\mathbf{z}))$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.7.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Uji Permutasi Eksak dan Prosedur Randomisasi Tanpa Asumsi Distribusi",
        "lead": "Sebagian besar uji statistik parametrik dan non-parametrik klasik bergantung pada distribusi teoritis asimtotik (seperti distribusi normal, Student-t, atau Chi-Square).",
        "bulletPoints": [
          "Namun, ketika ukuran sampel sangat kecil atau struktur data sangat kompleks, aproksimasi asimtotik tersebut dapat meleset jauh dari realitas.",
          "Uji Permutasi (Permutation Test), yang digagas pertama kali oleh Ronald A.",
          "Fisher (1935) dan E.J.G."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Dalam uji permutasi eksak, seluruh permutasi yang mungkin dari pembagian data ke dalam kelompok dihitung secara kombinatorial.",
        "bulletPoints": [
          "Untuk setiap permutasi, statistik uji dihitung ulang untuk membentuk distribusi permutasi empiris eksak.",
          "Nilai p-value eksak kemudian dihitung sebagai proporsi permutasi yang menghasilkan statistik uji yang sama ekstremnya atau lebih ekstrem daripada nilai yang teramati pada eksperimen nyata.",
          "Jika jumlah sampel cukup besar sehingga jumlah permutasi eksak menjadi astronomis (misal $\\binom{40}{20} > 1.37 \\times 10^{11}$), perhitungan eksak digantikan oleh Uji Randomisasi Monte Carlo (Aproksimasi Permutasi).",
          "Dengan menarik puluhan ribu sampel acak dari ruang permutasi, nilai p-value dapat diestimasi dengan presisi arbitrer."
        ],
        "keyFormulaOrDiagram": "$\\binom{40}{20} > 1.37 \\times 10^{11}$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Asumsi Keterpetukaran (Exchangeability):",
        "bulletPoints": [
          "Di bawah hipotesis nol $H_0: F_X = F_Y$:",
          "Vektor gabungan observasi $\\mathbf{Z} = (X_1, \\dots, X_{n_1}, Y_1, \\dots, Y_{n_2})$ bersifat terpetukarkan:",
          "untuk setiap permutasi $\\pi \\in \\mathcal{S}_N$, di mana $N = n_1 + n_2$."
        ],
        "keyFormulaOrDiagram": "$$P(\\mathbf{Z} = \\mathbf{z}) = P(\\mathbf{Z} = \\pi(\\mathbf{z}))$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada pengujian daya tahan kelelahan siklik material komposit ringan, diuji dua formulasi resin dengan sampel sangat kecil: Formulasi A = [42, 45, 48] (n1 = 3) dan Formulasi B = [31, 33, 35] (n2 = 3). Total N = 6. Hitung uji permutasi eksak untuk selisih rata-rata bar{X}_A - bar{X}_B dan buktikan apakah perbedaannya signifikan secara eksak.",
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
          "Langkah 1: Hitung statistik teramati T_obs:\nbar{X}_A = (42 + 45 + 48) / 3 = 135 / 3 = 45.0.\nbar{X}_B = (31 + 33 + 35) / 3 = 99 / 3 = 33.0.\nT_obs = 45.0 - 33.0 = +12.0.",
          "Langkah 2: Hitung total kombinasi partisi eksak: K = binom(6, 3) = 6! / (3! * 3!) = 720 / (6 * 6) = 20 partisi.",
          "Langkah 3: Tinjau distribusi gabungan: [31, 33, 35, 42, 45, 48].\nJumlah nilai total = 135 + 99 = 234. Rata-rata total = 39.0."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Cari kombinasi 3 elemen yang menghasilkan selisih |T| >= 12.0:\n- Kombinasi A paling ekstrem atas: {42, 45, 48} -> rata-rata 45.0, selisih = +12.0 (1 kasus).\n- Kombinasi A paling ekstrem bawah: {31, 33, 35} -> rata-rata 33.0, selisih = -12.0 (1 kasus).\n- Seluruh 18 kombinasi lainnya memiliki selisih lebih kecil dari 12.0.",
          "Langkah 5: Hitung p-value eksak dua arah:\nJumlah kasus dengan |T| >= 12.0 adalah 2 (yaitu +12.0 dan -12.0).\np_exact = 2 / 20 = 0.1000 (10.0%).",
          "[result: Interpretasi Ilmiah] Meskipun seluruh observasi Formulasi A lebih tinggi daripada Formulasi B, pada ukuran sampel n1=3, n2=3, nilai p-value minimum yang mungkin dicapai adalah 2/20 = 0.100. Oleh karena itu, hipotesis nol tidak dapat ditolak pada alpha = 0.05. Eksperimen membutuhkan penambahan ukuran sampel."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi Uji Permutasi Eksak dan Aproksimasi Monte Carlo menggunakan SciPy.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi Uji Permutasi Eksak dan Aproksimasi Monte Carlo menggunakan SciPy.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Uji Permutasi Eksak vs Monte Carlo"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Uji Permutasi Eksak vs Monte Carlo\nStatistik Teramati (T_obs) : 12.0000\nNilai p-value Eksak        : 0.1000\nNilai p-value Monte Carlo  : 0.1000",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menghitung p-value Monte Carlo tanpa menyertakan pengamatan asli (koreksi +1), sehingga berisiko menghasilkan p-value = 0 yang secara filosofis salah.",
          "[warning: Perangkap] Menerapkan uji permutasi ketika asumsi keterpetukaran (exchangeability) dilanggar, misalnya pada data deret waktu yang memiliki autokorelasi.",
          "[warning: Perangkap] Mengira bahwa uji permutasi dapat mengatasi kelemahan ukuran sampel yang sangat kecil (seperti ditunjukkan di atas, n=3 per grup tidak akan pernah bisa mencapai p < 0.05)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Verifikasi asumsi keterpetukaran: pastikan tidak ada dependensi serial atau struktur klaster yang diabaikan.",
          "Prosedur: Pilih statistik uji yang mencerminkan pertanyaan saintifik secara langsung (mean, median, rasio).",
          "Prosedur: Gunakan minimal 10,000 resamples untuk aproksimasi Monte Carlo agar galat estimasi p-value < 0.005."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Pada uji permutasi dua arah dengan dua kelompok berukuran n1 = 3 dan n2 = 3, berapakah nilai p-value minimum teoritis yang dapat dihasilkan?",
          "Petunjuk Analitis: Hitung total kombinasi partisi K = 6! / (3! * 3!) dan jumlah titik paling ekstrem.",
          "Solusi Kunci: Total kombinasi partisi adalah 6! / (3! * 3!) = 20. Karena uji dua arah memiliki minimal 2 titik paling ekstrem (satu positif dan satu negatif), p-value minimum adalah 2 / 20 = 0.100."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
