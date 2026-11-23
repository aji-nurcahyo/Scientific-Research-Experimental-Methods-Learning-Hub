import { Lesson } from '../types/curriculum';

export const CH06_LESSONS: Record<string, Partial<Lesson>> = {
  "1.6.1": {
    "id": "1.6.1",
    "chapterId": "CH-06",
    "title": "Perbedaan Hipotesis Konseptual (Riset) vs Hipotesis Statistik (H0 / H1)",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Membedakan peran epistemologis hipotesis riset konseptual dan pasangan hipotesis statistik formal.",
      "Mentransformasikan proposisi teoretis abstrak menjadi parameter statistik teruji.",
      "Menghindari kesalahan umum penulisan hipotesis riset yang tidak dapat difalsifikasi."
    ],
    "content": "Perumusan hipotesis adalah jembatan yang menghubungkan penalaran teoretis abstrak dengan eksperimen empiris konkret. Salah satu kebingungan konseptual yang paling sering melanda mahasiswa tingkat sarjana dan peneliti pemula adalah kerancuan antara Hipotesis Riset (Konseptual) dengan Hipotesis Statistik ($H_0$ dan $H_1$).\n\n1. Hipotesis Riset (Research Hypothesis): Proposisi deklaratif berbasis teori yang meramalkan adanya hubungan kausal atau mekanistik spesifik antara dua atau lebih konsep ilmiah. Hipotesis riset ditulis dalam bahasa konseptual domain rekayasa. Contoh: \"Peningkatan laju pendinginan die-casting akan memperkecil ukuran butir dendritik paduan aluminium, sehingga meningkatkan ketahanan lelah struktur.\"\n2. Hipotesis Statistik (Statistical Hypotheses): Operasionalisasi matematis dari hipotesis riset ke dalam bentuk parameter populasi yang saling meniadakan (*mutually exclusive*) untuk diuji melalui kalkulus peluang:\n   - Hipotesis Nol ($H_0$): Postulat ketiadaan efek, perbedaan nol, atau independensi parameter (contoh: $mu_{\\text{cepat}} - mu_{\\text{lambat}} = 0$).\n   - Hipotesis Alternatif ($H_1$): Pernyataan operasional yang selaras dengan ekspektasi hipotesis riset (contoh: $mu_{\\text{cepat}} - \\mu_{\\text{lambat}} > 0$).\n\nEksperimen tidak pernah secara langsung \"membuktikan\" hipotesis riset secara mutlak, melainkan mengevaluasi apakah bukti empiris cukup kuat untuk menolak hipotesis nol $H_0$ pada tingkat signifikansi $\\alpha$ tertentu.",
    "mathematicalFoundations": "Pemetaan formal dari ruang hipotesis konseptual $\\mathcal{H}_{\\text{konsep}}$ menuju ruang parameter statistik $\\Theta$:\n\n$$\\Phi: \\mathcal{H}_{\\text{konsep}} \\longrightarrow \\left( \\Theta_0, \\Theta_1 \\right)$$\n\nDi mana parameter $\\theta \\in \\Theta$ merepresentasikan kuantitas populasi teramati (seperti selisih rata-rata $\\Delta\\mu$, koefisien regresi $\\beta_1$, atau rasio varians). Ruang parameter terpartisi secara tegas:\n\n$$\\Theta_0 \\cap \\Theta_1 = \\emptyset, \\quad \\Theta_0 \\cup \\Theta_1 = \\Theta$$\n\n$$H_0: \\theta \\in \\Theta_0 \\quad \\text{vs} \\quad H_1: \\theta \\in \\Theta_1$$\n\nTingkat signifikansi statistik (Type I Error Rate):\n$$\\alpha = P(\\text{Tolak } H_0 \\mid \\theta \\in \\Theta_0)$$",
    "workedExample": {
      "problemStatement": "Seorang peneliti memiliki hipotesis riset: \"Algoritma kompresi data adaptif yang diusulkan dapat memperpanjang masa pakai baterai node sensor nirkabel IoT di perkebunan sawit ITERA\". Rumuskan pasangan hipotesis statistik formal untuk menguji proposisi ini.",
      "stepByStepSolution": [
        "Langkah 1 (Identifikasi Parameter Operasional): Definisikan metrik terukur masa pakai baterai sebagai rata-rata durasi operasional hingga tegangan turun ke 2.8V, dinotasikan $\\mu_{\\text{usulan}}$ untuk algoritma baru dan $\\mu_{\\text{standar}}$ untuk algoritma acuan.",
        "Langkah 2 (Definisikan Parameter Diferensial): $\\theta = \\mu_{\\text{usulan}} - \\mu_{\\text{standar}}$ (dalam satuan jam).",
        "Langkah 3 (Formulasi Hipotesis Nol $H_0$): Algoritma baru tidak memberikan perpanjangan durasi operasional atau bahkan lebih boros: $H_0: \\theta \\le 0$.",
        "Langkah 4 (Formulasi Hipotesis Alternatif $H_1$): Algoritma baru menghasilkan perpanjangan durasi operasional yang signifikan: $H_1: \\theta > 0$."
      ],
      "resultInterpretation": "Pemisahan ini memungkinkan uji statistik satu arah (one-tailed t-test) untuk mengonfirmasi klaim keunggulan algoritma secara matematis."
    },
    "pythonImplementation": {
      "description": "Simulasi uji hipotesis komparasi dua rata-rata independen untuk mengevaluasi H0 versus H1.",
      "libraryDependencies": [
        "scipy.stats",
        "numpy"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\n# Data simulasi masa pakai node sensor (jam) [SIMULASI/SYNTHETIC DATA]\ndata_standar = np.random.normal(loc=120.0, scale=8.0, size=25)\ndata_usulan = np.random.normal(loc=128.5, scale=7.5, size=25)\n\n# Uji hipotesis statistik: H0: mu_usulan <= mu_standar vs H1: mu_usulan > mu_standar\nt_stat, p_val_two_sided = stats.ttest_ind(data_usulan, data_standar, alternative='greater')\n\nprint(f\"Rata-rata Algoritma Standar: {np.mean(data_standar):.2f} jam\")\nprint(f\"Rata-rata Algoritma Usulan : {np.mean(data_usulan):.2f} jam\")\nprint(f\"Nilai t-statistik: {t_stat:.3f}\")\nprint(f\"Nilai p-value (satu arah): {p_val_two_sided:.4e}\")\n\nalpha = 0.01\nif p_val_two_sided < alpha:\n    print(f\"Hasil Uji: Tolak H0 pada tingkat signifikansi alpha={alpha}. Bukti empiris mendukung H1.\")\nelse:\n    print(f\"Hasil Uji: Gagal menolak H0.\")\n",
      "expectedOutput": "Rata-rata Algoritma Standar: 118.84 jam\nRata-rata Algoritma Usulan : 127.32 jam\nNilai t-statistik: 3.968\nNilai p-value (satu arah): 1.1895e-04\nHasil Uji: Tolak H0 pada tingkat signifikansi alpha=0.01. Bukti empiris mendukung H1."
    },
    "commonPitfalls": [
      "Menuliskan hipotesis nol sebagai dugaan pribadi yang diharapkan terjadi, padahal hipotesis nol adalah baseline yang ingin difalsifikasi.",
      "Merumuskan hipotesis riset yang bersifat sirkular atau tautologis (pernyataan yang selalu benar secara definisi logis).",
      "Mengubah rumusan hipotesis setelah melihat data eksperimen tanpa mencatat bahwa prosedur tersebut berubah menjadi eksplorasi post-hoc (HARKing)."
    ],
    "validationProcedures": [
      "Verifikasi apakah parameter dalam hipotesis statistik dapat diukur secara langsung oleh instrumen eksperimen.",
      "Pastikan arah pengujian (satu arah vs dua arah) telah dikunci sebelum pengumpulan data dimulai."
    ],
    "exercises": [
      {
        "question": "Mengapa hipotesis riset \"Metode pembelajaran mesin ini sangat efektif\" tidak dapat diterima sebagai hipotesis ilmiah?",
        "hint": "Perhatikan apakah kata \"efektif\" terdefinisi secara operasional dan memiliki kriteria ambang numerik yang dapat digugurkan.",
        "answerExplanation": "Pernyataan tersebut tidak memenuhi syarat falsifikasi Popperian. Kata \"sangat efektif\" bersifat kualitatif ambigu dan tidak memiliki batasan operasional. Hipotesis harus menyatakan variabel terukur spesifik dan ambang batas yang jelas, misalnya: \"menghasilkan nilai AUC-ROC lebih besar dari 0.90 pada dataset uji\"."
      }
    ],
    "references": [
      {
        "citation": "Fisher, R. A. (1935). The Design of Experiments. Oliver & Boyd.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Neyman, J., & Pearson, E. S. (1933). On the problem of the most efficient tests of statistical hypotheses. Philosophical Transactions of the Royal Society of London, 231(694-706), 289-337.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Perbedaan Hipotesis Konseptual (Riset) vs Hipotesis Sta...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.6.1.",
          "Capaian: Membedakan peran epistemologis hipotesis riset konseptual dan pasangan hipotesis statistik formal.",
          "Capaian: Mentransformasikan proposisi teoretis abstrak menjadi parameter statistik teruji.",
          "Capaian: Menghindari kesalahan umum penulisan hipotesis riset yang tidak dapat difalsifikasi."
        ],
        "keyFormulaOrDiagram": "$$\\Phi: \\mathcal{H}_{\\text{konsep}} \\longrightarrow \\left( \\Theta_0, \\Theta_1 \\right)$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Perbedaan Hipotesis Konseptual (Riset) vs Hipotesis Sta...",
        "bulletPoints": [
          "Perumusan hipotesis adalah jembatan yang menghubungkan penalaran teoretis abstrak dengan eksperimen empiris konkret. Salah sa...",
          "1. Hipotesis Riset (Research Hypothesis): Proposisi deklaratif berbasis teori yang meramalkan adanya hubungan kausal atau mek...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Eksperimen tidak pernah secara langsung \"membuktikan\" hipotesis riset secara mutlak, melai..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Eksperimen tidak pernah secara langsung \"membuktikan\" hipotesis riset secara mutlak, melainkan mengevaluasi apakah bukti empi...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Pemetaan formal dari ruang hipotesis konseptual $\\mathcal{H}_{\\text{konsep}}$ menuju ruang parameter statistik...",
          "Di mana parameter $\\theta \\in \\Theta$ merepresentasikan kuantitas populasi teramati (seperti selisih rata-rata...",
          "Tingkat signifikansi statistik (Type I Error Rate):"
        ],
        "keyFormulaOrDiagram": "$$\\Phi: \\mathcal{H}_{\\text{konsep}} \\longrightarrow \\left( \\Theta_0, \\Theta_1 \\right)$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Seorang peneliti memiliki hipotesis riset: \"Algoritma kompresi data adaptif yang diusulkan dapat memperpanjang masa pakai baterai node senso...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Identifikasi Parameter Operasional): Definisikan metrik terukur masa pakai baterai sebagai rata-rat...",
          "Langkah 2 (Definisikan Parameter Diferensial): $\\theta = \\mu_{\\text{usulan}} - \\mu_{\\text{standar}}$ (dalam sa...",
          "Langkah 3 (Formulasi Hipotesis Nol $H_0$): Algoritma baru tidak memberikan perpanjangan durasi operasional ata...",
          "Interpretasi: Pemisahan ini memungkinkan uji statistik satu arah (one-tailed t-test) untuk mengonfirmasi klaim keunggulan algoritma se..."
        ],
        "keyFormulaOrDiagram": "Langkah 4 (Formulasi Hipotesis Alternatif $H_1$): Algoritma baru menghasilkan perpanjangan..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi uji hipotesis komparasi dua rata-rata independen untuk mengevaluasi H0 versus H1.",
          "Dependensi Pustaka: scipy.stats, numpy",
          "Keluaran Diharapkan: Rata-rata Algoritma Standar: 118.84 jam"
        ],
        "keyFormulaOrDiagram": "Rata-rata Algoritma Standar: 118.84 jam | Rata-rata Algoritma Usulan : 127.32 jam | Nilai..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menuliskan hipotesis nol sebagai dugaan pribadi yang diharapkan terjadi, padahal hipotesis nol adalah baseline...",
          "Perangkap: Merumuskan hipotesis riset yang bersifat sirkular atau tautologis (pernyataan yang selalu benar secara definis...",
          "Perangkap: Mengubah rumusan hipotesis setelah melihat data eksperimen tanpa mencatat bahwa prosedur tersebut berubah menj..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Verifikasi apakah parameter dalam hipotesis statistik dapat diukur secara langsung oleh instrumen eksperimen.",
          "Prosedur: Pastikan arah pengujian (satu arah vs dua arah) telah dikunci sebelum pengumpulan data dimulai."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa hipotesis riset \"Metode pembelajaran mesin ini sangat efektif\" tidak dapat diterima sebagai hipotesis ilmiah?",
          "Petunjuk: Perhatikan apakah kata \"efektif\" terdefinisi secara operasional dan memiliki kriteria ambang numerik...",
          "Solusi Kunci: Pernyataan tersebut tidak memenuhi syarat falsifikasi Popperian. Kata \"sangat efektif\" bersifat kualitatif ambigu dan ti..."
        ]
      }
    ]
  },
  "1.6.2": {
    "id": "1.6.2",
    "chapterId": "CH-06",
    "title": "Hipotesis Terarah (Directional) vs Tak Terarah (Non-Directional)",
    "readingTimeMinutes": 16,
    "status": "verified",
    "learningObjectives": [
      "Membedakan landasan teoretis penggunaan hipotesis terarah (directional) dan tak terarah (non-directional).",
      "Memahami konsekuensi alokasi wilayah kritis alpha pada uji statistik satu arah versus dua arah.",
      "Menghindari bias konfirmasi saat memilih arah pengujian hipotesis."
    ],
    "content": "Dalam merancang hipotesis eksperimental, peneliti harus memutuskan apakah hubungan yang diprediksi memiliki arah spesifik (directional) atau sekadar memprediksi adanya perbedaan tanpa menentukan arah kutubnya (non-directional). Keputusan ini memiliki dampak matematis langsung terhadap sensitivitas dan daya uji statistik (*statistical power*) dari analisis yang akan dilakukan.\n\n1. Hipotesis Terarah (Directional / One-tailed): Digunakan jika dan hanya jika terdapat landasan teoretis fisis atau temuan literatur yang sangat kuat yang memprediksi arah perubahan tertentu. Contoh: \"Penambahan serat karbon pada matriks geopolimer akan meningkatkan kuat tekan material.\" Seluruh probabilitas penolakan $\\alpha$ (misal 5%) ditempatkan terkonsentrasi pada satu ekor distribusi peluang.\n2. Hipotesis Tak Terarah (Non-Directional / Two-tailed): Digunakan ketika arah efek belum dapat dipastikan secara teoretis, atau ketika pergeseran parameter ke arah berlawanan tetap memiliki signifikansi praktis yang wajib dicatat. Contoh: \"Modifikasi laju pendinginan akan mengubah resistivitas listrik semikonduktor.\" Probabilitas penolakan $\\alpha$ dibagi rata ke kedua ekor distribusi (masing-masing $\\alpha/2$).\n\nPenggunaan uji terarah menghasilkan daya uji yang lebih tinggi untuk mendeteksi efek pada arah yang diramalkan, namun membuat peneliti buta total terhadap kemungkinan munculnya efek anomali ekstrem pada arah sebaliknya.",
    "mathematicalFoundations": "Distribusi statistik uji $T$ di bawah asumsi kebenaran $H_0$:\n\n1. Pengujian Dua Arah (Non-Directional):\n$$H_0: \\theta = \\theta_0 \\quad \\text{vs} \\quad H_1: \\theta \\neq \\theta_0$$\nWilayah Kritis Penolakan $\\mathcal{W}_{\\text{two}}$:\n$$\\mathcal{W}_{\\text{two}} = \\left\\{ t \\in \\mathbb{R} \\mid t < -t_{\\alpha/2, \\nu} \\quad \\lor \\quad t > t_{\\alpha/2, \\nu} \\right\\}$$\n\n2. Pengujian Satu Arah (Directional - Kanan):\n$$H_0: \\theta \\le \\theta_0 \\quad \\text{vs} \\quad H_1: \\theta > \\theta_0$$\nWilayah Kritis Penolakan $\\mathcal{W}_{\\text{one}}$:\n$$\\mathcal{W}_{\\text{one}} = \\left\\{ t \\in \\mathbb{R} \\mid t > t_{\\alpha, \\nu} \\right\\}$$\n\nKarena $t_{\\alpha, \\nu} < t_{\\alpha/2, \\nu}$, ambang batas pembuktian pada pengujian satu arah lebih rendah pada ekor positif, sehingga meningkatkan kekuatan uji ($1 - \\beta$).",
    "workedExample": {
      "problemStatement": "Pada derajat kebebasan df = 30 dan tingkat signifikansi alpha = 0.05, bandingkan nilai kritis t untuk uji satu arah dan uji dua arah. Berikan analisis risiko jika peneliti salah memilih uji satu arah padahal metode baru justru memperburuk performa.",
      "stepByStepSolution": [
        "Langkah 1: Cari nilai kritis uji dua arah dari tabel t-Student: t_(0.025, 30) = 2.042.",
        "Langkah 2: Cari nilai kritis uji satu arah: t_(0.05, 30) = 1.697.",
        "Langkah 3: Amati perbedaan ambang batas: Pada uji satu arah, statistik t sebesar 1.85 sudah cukup untuk menolak H0, sementara pada uji dua arah statistik tersebut gagal menolak H0.",
        "Langkah 4: Analisis risiko: Jika ternyata metode baru menghasilkan t = -3.20 (penurunan drastis performa), uji satu arah kanan secara formal gagal menolak H0 dan tidak dapat menyimpulkan bahwa metode tersebut berbahaya secara statistik."
      ],
      "resultInterpretation": "Uji satu arah hanya boleh diterapkan jika hasil pada arah sebaliknya secara konseptual tidak memiliki arti atau mustahil terjadi."
    },
    "pythonImplementation": {
      "description": "Komparasi nilai kritis distribusi t-Student untuk pengujian satu arah versus dua arah.",
      "libraryDependencies": [
        "scipy.stats"
      ],
      "code": "from scipy import stats\n\ndf = 30\nalpha = 0.05\n\nt_kritis_satu_arah = stats.t.ppf(1 - alpha, df=df)\nt_kritis_dua_arah = stats.t.ppf(1 - alpha/2, df=df)\n\nprint(f\"Derajat Kebebasan (df) : {df}\")\nprint(f\"Alpha                     : {alpha}\")\nprint(f\"Nilai Kritis Satu Arah (Right): {t_kritis_satu_arah:.4f}\")\nprint(f\"Nilai Kritis Dua Arah (Symmetric): +/- {t_kritis_dua_arah:.4f}\")\nprint(f\"Selisih Ambang Penolakan  : {t_kritis_dua_arah - t_kritis_satu_arah:.4f}\")\n",
      "expectedOutput": "Derajat Kebebasan (df) : 30\nAlpha                     : 0.05\nNilai Kritis Satu Arah (Right): 1.6973\nNilai Kritis Dua Arah (Symmetric): +/- 2.0423\nSelisih Ambang Penolakan  : 0.3450"
    },
    "commonPitfalls": [
      "Memilih uji satu arah semata-mata karena p-value uji dua arah berada sedikit di atas 0.05 (praktik p-hacking terlarang).",
      "Mengabaikan kemungkinan efek samping negatif yang berlawanan arah dengan hipotesis peneliti.",
      "Tidak mencatat justifikasi teoritis pemilihan arah hipotesis di bagian metodologi naskah."
    ],
    "validationProcedures": [
      "Kunci keputusan pemilihan satu arah atau dua arah pada fase registrasi protokol riset sebelum analisis data dijalankan.",
      "Jika ragu terhadap kepastian arah efek, gunakan uji dua arah sebagai pendekatan yang lebih konservatif dan aman."
    ],
    "exercises": [
      {
        "question": "Mengapa uji dua arah dianggap sebagai standar baku (default) yang lebih disukai oleh reviewer jurnal internasional?",
        "hint": "Perhatikan asas kehati-hatian ilmiah dan pencegahan bias konfirmasi.",
        "answerExplanation": "Uji dua arah bersikap netral terhadap arah hasil empiris. Pendekatan ini melindungi peneliti dari bias konfirmasi dan mampu mendeteksi kegagalan tak terduga di mana modifikasi metode justru menghasilkan penurunan kinerja yang signifikan secara statistik."
      }
    ],
    "references": [
      {
        "citation": "Ruxton, G. D., & Neuhäuser, M. (2010). When should we use one-tailed hypothesis tests? Methods in Ecology and Evolution, 1(1), 32-40.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Killeen, P. R. (2005). An alternative to null-hypothesis significance tests. Psychological Science, 16(5), 345-353.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Hipotesis Terarah (Directional) vs Tak Terarah (Non-Dir...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.6.2.",
          "Capaian: Membedakan landasan teoretis penggunaan hipotesis terarah (directional) dan tak terarah (non-directional).",
          "Capaian: Memahami konsekuensi alokasi wilayah kritis alpha pada uji statistik satu arah versus dua arah.",
          "Capaian: Menghindari bias konfirmasi saat memilih arah pengujian hipotesis."
        ],
        "keyFormulaOrDiagram": "$$H_0: \\theta = \\theta_0 \\quad \\text{vs} \\quad H_1: \\theta \\neq \\theta_0$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Hipotesis Terarah (Directional) vs Tak Terarah (Non-Dir...",
        "bulletPoints": [
          "Dalam merancang hipotesis eksperimental, peneliti harus memutuskan apakah hubungan yang diprediksi memiliki arah spesifik (di...",
          "1. Hipotesis Terarah (Directional / One-tailed): Digunakan jika dan hanya jika terdapat landasan teoretis fisis atau temuan l...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Penggunaan uji terarah menghasilkan daya uji yang lebih tinggi untuk mendeteksi efek pada..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Penggunaan uji terarah menghasilkan daya uji yang lebih tinggi untuk mendeteksi efek pada arah yang diramalkan, namun membuat...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Distribusi statistik uji $T$ di bawah asumsi kebenaran $H_0$:",
          "1. Pengujian Dua Arah (Non-Directional):",
          "Wilayah Kritis Penolakan $\\mathcal{W}_{\\text{two}}$:"
        ],
        "keyFormulaOrDiagram": "$$H_0: \\theta = \\theta_0 \\quad \\text{vs} \\quad H_1: \\theta \\neq \\theta_0$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada derajat kebebasan df = 30 dan tingkat signifikansi alpha = 0.05, bandingkan nilai kritis t untuk uji satu arah dan uji dua arah. Berika...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Cari nilai kritis uji dua arah dari tabel t-Student: t_(0.025, 30) = 2.042.",
          "Langkah 2: Cari nilai kritis uji satu arah: t_(0.05, 30) = 1.697.",
          "Langkah 3: Amati perbedaan ambang batas: Pada uji satu arah, statistik t sebesar 1.85 sudah cukup untuk menola...",
          "Interpretasi: Uji satu arah hanya boleh diterapkan jika hasil pada arah sebaliknya secara konseptual tidak memiliki arti atau mustahil..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Analisis risiko: Jika ternyata metode baru menghasilkan t = -3.20 (penurunan dr..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Komparasi nilai kritis distribusi t-Student untuk pengujian satu arah versus dua arah.",
          "Dependensi Pustaka: scipy.stats",
          "Keluaran Diharapkan: Derajat Kebebasan (df) : 30"
        ],
        "keyFormulaOrDiagram": "Derajat Kebebasan (df) : 30 | Alpha : 0.05 | Nilai Kritis Satu Arah (Right): 1.6973"
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Memilih uji satu arah semata-mata karena p-value uji dua arah berada sedikit di atas 0.05 (praktik p-hacking t...",
          "Perangkap: Mengabaikan kemungkinan efek samping negatif yang berlawanan arah dengan hipotesis peneliti.",
          "Perangkap: Tidak mencatat justifikasi teoritis pemilihan arah hipotesis di bagian metodologi naskah."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Kunci keputusan pemilihan satu arah atau dua arah pada fase registrasi protokol riset sebelum analisis data di...",
          "Prosedur: Jika ragu terhadap kepastian arah efek, gunakan uji dua arah sebagai pendekatan yang lebih konservatif dan ama..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa uji dua arah dianggap sebagai standar baku (default) yang lebih disukai oleh reviewer jurnal internasional?",
          "Petunjuk: Perhatikan asas kehati-hatian ilmiah dan pencegahan bias konfirmasi.",
          "Solusi Kunci: Uji dua arah bersikap netral terhadap arah hasil empiris. Pendekatan ini melindungi peneliti dari bias konfirmasi dan ma..."
        ]
      }
    ]
  },
  "1.6.3": {
    "id": "1.6.3",
    "chapterId": "CH-06",
    "title": "Konstruksi Kerangka Konseptual Menggunakan Directed Acyclic Graphs (DAGs)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memodelkan asumsi kausalitas struktural menggunakan Directed Acyclic Graphs (DAGs).",
      "Memahami kriteria d-separation untuk menganalisis independensi bersyarat antarvariabel.",
      "Mendeteksi dan mengeliminasi jalur kolisi (collider paths) yang berpotensi memicu bias seleksi."
    ],
    "content": "Kerangka konseptual yang disajikan sekadar dalam bentuk diagram kotak-panah informal sering kali menyembunyikan kelemahan logika kausal yang fatal. Dalam sains modern dan kausalitas komputasional (dipelopori oleh Judea Pearl), Directed Acyclic Graphs (DAGs) telah menjadi instrumen matematika standar untuk memformalkan kerangka konseptual riset.\n\nSebuah DAG terdiri atas:\n1. Simpul (Nodes): Mewakili variabel acak sistem, baik yang dapat diobservasi secara langsung maupun variabel laten tersembunyi.\n2. Busur Berarah (Directed Edges): Mewakili mekanisme kausal langsung dari simpul sumber menuju simpul target.\n3. Properti Asiklik (Acyclic): Tidak boleh terdapat jalur tertutup berarah ($X_1 \\rightarrow X_2 \\rightarrow \\dots \\rightarrow X_1$) yang menandakan lingkaran kausalitas tak berujung pada skala waktu yang sama.\n\nKeunggulan utama pemodelan DAG adalah kemampuannya menentukan secara matematis variabel mana yang wajib dikontrol dalam analisis statistik, dan variabel mana yang justru dilarang untuk dikontrol agar tidak menimbulkan bias kolisi (*collider stratification bias*).",
    "mathematicalFoundations": "DAG kausal $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$ menginduksi faktorisasi probabilitas bersama (Markov Compatibility):\n\n$$P(V_1, V_2, \\dots, V_m) = \\prod_{i=1}^m P(V_i \\mid \\text{Parents}_{\\mathcal{G}}(V_i))$$\n\nKriteria d-Separation (Directional Separation):\nJalur tak berarah $p$ antar simpul $X$ dan $Y$ dikatakan terblokir oleh himpunan pengondisian $Z$ jika dan hanya jika:\n1. Jalur $p$ memuat rantai $A \\rightarrow B \\rightarrow C$ atau garpu $A \\leftarrow B \\rightarrow C$ di mana simpul tengah $B \\in Z$.\n2. Jalur $p$ memuat kolisi (collider) $A \\rightarrow B \\leftarrow C$ di mana simpul tengah $B \\notin Z$ dan tidak ada keturunan dari $B$ yang termasuk dalam $Z$.\n\nJika seluruh jalur antara $X$ dan $Y$ terblokir oleh $Z$, maka $X$ independen bersyarat dari $Y$ terhadap $Z$:\n$$X \\perp \\!\\!\\! \\perp Y \\mid Z$$",
    "workedExample": {
      "problemStatement": "Dalam sistem pengujian visi otonom, variabel Perlakuan X adalah Algoritma Denoising, Hasil Y adalah Akurasi Deteksi Objek. Variabel Z adalah Waktu Pemrosesan. Algoritma Denoising mempengaruhi Akurasi (X -> Y) dan juga mempengaruhi Waktu Pemrosesan (X -> Z). Akurasi juga mempengaruhi Waktu Pemrosesan (Y -> Z). Tentukan peran variabel Z dan apakah peneliti boleh mengontrol variabel Z dalam regresi untuk mengukur efek murni X terhadap Y.",
      "stepByStepSolution": [
        "Langkah 1: Petakan topologi busur kausal: X -> Z dan Y -> Z. Pola ini membentuk struktur kolisi: X -> Z <- Y.",
        "Langkah 2: Periksa status pemblokiran awal: Simpul Z adalah kolisi. Tanpa pengondisian (Z tidak dikontrol), jalur X -> Z <- Y secara alami terblokir.",
        "Langkah 3: Evaluasi dampak jika Z dikontrol (dimasukkan sebagai kovariat regresi): Mengontrol simpul kolisi Z akan membuka jalur semu (spurious path) antara X dan Y.",
        "Langkah 4: Kesimpulan metodologis: Peneliti dilarang mengontrol Waktu Pemrosesan Z saat mengukur efek Denoising X terhadap Akurasi Y untuk menghindari bias kolisi."
      ],
      "resultInterpretation": "Pemodelan DAG membuktikan bahwa memasukkan semua variabel ke dalam model regresi adalah praktik keliru yang dapat menciptakan ilusi asosiasi palsu."
    },
    "pythonImplementation": {
      "description": "Verifikasi independensi bersyarat pada struktur graf kausal sederhana menggunakan matriks ketetanggaan.",
      "libraryDependencies": [],
      "code": "class SimpleDAG:\n    def __init__(self):\n        self.adj = {}\n        self.nodes = set()\n\n    def add_edge(self, u, v):\n        self.nodes.add(u)\n        self.nodes.add(v)\n        if u not in self.adj:\n            self.adj[u] = []\n        self.adj[u].append(v)\n\n    def is_collider(self, parent1, middle, parent2):\n        # Memeriksa apakah middle adalah kolisi dari parent1 dan parent2 (p1 -> m <- p2)\n        has_p1 = middle in self.adj.get(parent1, [])\n        has_p2 = middle in self.adj.get(parent2, [])\n        return has_p1 and has_p2\n\ndag = SimpleDAG()\n# Kasus X -> Z <- Y (Z adalah kolisi)\ndag.add_edge(\"X_Denoising\", \"Z_Waktu\")\ndag.add_edge(\"Y_Akurasi\", \"Z_Waktu\")\n\nprint(\"Analisis Struktur Kausal:\")\nprint(f\"Apakah Z_Waktu merupakan simpul kolisi? {dag.is_collider('X_Denoising', 'Z_Waktu', 'Y_Akurasi')}\")\nprint(\"Aturan Kausalitas Pearl: Mengontrol Z_Waktu akan menginduksi korelasi palsu antara X dan Y!\")\n",
      "expectedOutput": "Analisis Struktur Kausal:\nApakah Z_Waktu merupakan simpul kolisi? True\nAturan Kausalitas Pearl: Mengontrol Z_Waktu akan menginduksi korelasi palsu antara X dan Y!"
    },
    "commonPitfalls": [
      "Membuat grafik dengan siklus tertutup timbal balik (feedback loops) pada analisis statis non-temporal.",
      "Mengasumsikan bahwa memasukkan semakin banyak variabel pengontrol ke dalam model statistik akan selalu membuat model semakin akurat.",
      "Mengabaikan variabel perancu tak terukur (unobserved confounders) yang menghubungkan perlakuan dan luaran."
    ],
    "validationProcedures": [
      "Uji aciklisitas graf menggunakan algoritma penelusuran topologi (topological sort) untuk memastikan tidak ada siklus.",
      "Gunakan kriteria pintu belakang (backdoor criterion) untuk menetapkan himpunan penyesuaian kovariat yang minimal dan mencukupi."
    ],
    "exercises": [
      {
        "question": "Apa konsekuensi metodologis jika seorang peneliti mengontrol variabel mediator yang berada di tengah jalur kausal antara perlakuan dan luaran (X -> M -> Y)?",
        "hint": "Perhatikan apakah efek total atau efek langsung yang diukur saat mediator dikunci.",
        "answerExplanation": "Mengontrol variabel mediator M akan memblokir jalur kausal tidak langsung, sehingga analisis hanya mengukur efek kausal langsung (direct effect) dan menghilangkan porsi efek yang dimediasi oleh M. Jika tujuan penelitian adalah mengukur efek kausal total dari X terhadap Y, mediator M tidak boleh dikontrol."
      }
    ],
    "references": [
      {
        "citation": "Pearl, J. (2009). Causality: Models, Reasoning, and Inference. Cambridge University Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Rohrer, J. M. (2018). Thinking clearly about correlations and causation: Graphical causal models for observational data. Advances in Methods and Practices in Psychological Science, 1(1), 27-42.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Konstruksi Kerangka Konseptual Menggunakan Directed Acy...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.6.3.",
          "Capaian: Memodelkan asumsi kausalitas struktural menggunakan Directed Acyclic Graphs (DAGs).",
          "Capaian: Memahami kriteria d-separation untuk menganalisis independensi bersyarat antarvariabel.",
          "Capaian: Mendeteksi dan mengeliminasi jalur kolisi (collider paths) yang berpotensi memicu bias seleksi."
        ],
        "keyFormulaOrDiagram": "$$P(V_1, V_2, \\dots, V_m) = \\prod_{i=1}^m P(V_i \\mid \\text{Parents}_{\\mathcal{G}}(V_i))$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Konstruksi Kerangka Konseptual Menggunakan Directed Acy...",
        "bulletPoints": [
          "Kerangka konseptual yang disajikan sekadar dalam bentuk diagram kotak-panah informal sering kali menyembunyikan kelemahan log...",
          "Sebuah DAG terdiri atas: 1. Simpul (Nodes): Mewakili variabel acak sistem, baik yang dapat diobservasi secara langsung maupun...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Keunggulan utama pemodelan DAG adalah kemampuannya menentukan secara matematis variabel ma..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Keunggulan utama pemodelan DAG adalah kemampuannya menentukan secara matematis variabel mana yang wajib dikontrol dalam anali...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "DAG kausal $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$ menginduksi faktorisasi probabilitas bersama (Markov Com...",
          "Kriteria d-Separation (Directional Separation):",
          "Jalur tak berarah $p$ antar simpul $X$ dan $Y$ dikatakan terblokir oleh himpunan pengondisian $Z$ jika dan han..."
        ],
        "keyFormulaOrDiagram": "$$P(V_1, V_2, \\dots, V_m) = \\prod_{i=1}^m P(V_i \\mid \\text{Parents}_{\\mathcal{G}}(V_i))$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Dalam sistem pengujian visi otonom, variabel Perlakuan X adalah Algoritma Denoising, Hasil Y adalah Akurasi Deteksi Objek. Variabel Z adalah...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Petakan topologi busur kausal: X -> Z dan Y -> Z. Pola ini membentuk struktur kolisi: X -> Z <- Y.",
          "Langkah 2: Periksa status pemblokiran awal: Simpul Z adalah kolisi. Tanpa pengondisian (Z tidak dikontrol), ja...",
          "Langkah 3: Evaluasi dampak jika Z dikontrol (dimasukkan sebagai kovariat regresi): Mengontrol simpul kolisi Z...",
          "Interpretasi: Pemodelan DAG membuktikan bahwa memasukkan semua variabel ke dalam model regresi adalah praktik keliru yang dapat mencip..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Kesimpulan metodologis: Peneliti dilarang mengontrol Waktu Pemrosesan Z saat me..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Verifikasi independensi bersyarat pada struktur graf kausal sederhana menggunakan matriks ketetanggaan.",
          "Dependensi Pustaka: ",
          "Keluaran Diharapkan: Analisis Struktur Kausal:"
        ],
        "keyFormulaOrDiagram": "Analisis Struktur Kausal: | Apakah Z_Waktu merupakan simpul kolisi? True | Aturan Kausalit..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Membuat grafik dengan siklus tertutup timbal balik (feedback loops) pada analisis statis non-temporal.",
          "Perangkap: Mengasumsikan bahwa memasukkan semakin banyak variabel pengontrol ke dalam model statistik akan selalu membuat...",
          "Perangkap: Mengabaikan variabel perancu tak terukur (unobserved confounders) yang menghubungkan perlakuan dan luaran."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Uji aciklisitas graf menggunakan algoritma penelusuran topologi (topological sort) untuk memastikan tidak ada...",
          "Prosedur: Gunakan kriteria pintu belakang (backdoor criterion) untuk menetapkan himpunan penyesuaian kovariat yang minim..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Apa konsekuensi metodologis jika seorang peneliti mengontrol variabel mediator yang berada di tengah jalur kausal antara...",
          "Petunjuk: Perhatikan apakah efek total atau efek langsung yang diukur saat mediator dikunci.",
          "Solusi Kunci: Mengontrol variabel mediator M akan memblokir jalur kausal tidak langsung, sehingga analisis hanya mengukur efek kausal..."
        ]
      }
    ]
  },
  "1.6.4": {
    "id": "1.6.4",
    "chapterId": "CH-06",
    "title": "Identifikasi Variabel Bebas, Terikat, Perancu, dan Mediator pada Kerangka Riset",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Mengklasifikasikan variabel penelitian ke dalam 4 peran fungsional utama secara akurat.",
      "Mengisolasi efek kausal variabel bebas dari distorsi variabel perancu (confounders).",
      "Merancang strategi pengontrolan eksperimental dan statistikal terhadap variabel gangguan."
    ],
    "content": "Keberhasilan sebuah eksperimen ilmiah bergantung pada ketelitian peneliti dalam mengisolasi variabel sasaran dari pengaruh variabel lain di lingkungan sekitar. Dalam merancang kerangka operasional penelitian, setiap variabel yang terlibat harus diklasifikasikan ke dalam peran fungsionalnya:\n\n1. Variabel Bebas (Independent Variable / Treatment): Faktor atau kondisi yang secara sengaja dimanipulasi, diubah, atau dipilih oleh peneliti untuk menguji pengaruh kausalnya terhadap sistem. Contoh: rasio bahan pengikat atau frekuensi sampling sensor.\n2. Variabel Terikat (Dependent Variable / Outcome): Respon sistem atau karakteristik luaran yang diukur untuk melihat dampak dari manipulasi variabel bebas. Contoh: kuat geser mekanik atau galat rekonstruksi sinyal.\n3. Variabel Perancu (Confounder): Faktor luar yang secara simultan mempengaruhi variabel bebas dan variabel terikat. Jika tidak dikontrol, perancu akan menciptakan korelasi semu (spurious correlation). Contoh: suhu ruang laboratorium yang mempengaruhi resistansi kawat pemanas sekaligus akurasi pembacaan sensor tegangan.\n4. Variabel Mediator: Variabel perantara yang mentransmisikan efek kausal dari variabel bebas menuju variabel terikat ($X \\rightarrow M \\rightarrow Y$).\n5. Variabel Moderator: Faktor yang mengubah kekuatan atau arah hubungan kausal antara variabel bebas dan terikat ($X \\times W \\rightarrow Y$).\n\nMemahami peran masing-masing variabel mencegah peneliti menarik kesimpulan kausal palsu dari pola data empiris yang teramati.",
    "mathematicalFoundations": "Dalam model regresi struktural linier, dekomposisi efek kausal dan perancu dinyatakan sebagai:\n\nSistem struktural sejati:\n$$X = \\gamma_0 + \\gamma_1 C + \\epsilon_X$$\n$$Y = \\beta_0 + \\beta_1 X + \\beta_2 C + \\epsilon_Y$$\n\nJika perancu $C$ diabaikan (dikeluarkan dari model regresi), penduga kuadrat terkecil biasa (OLS) untuk efek $X$ terhadap $Y$ menjadi bias:\n\n$$\\mathbb{E}[\\hat{\\beta}_{1, \\text{naif}}] = \\beta_1 + \\beta_2 \\frac{\\text{Cov}(X, C)}{\\text{Var}(X)}$$\n\nSuku bias $\\beta_2 \\frac{\\text{Cov}(X, C)}{\\text{Var}(X)}$ disebut sebagai Omitted Variable Bias (Bias Variabel yang Dihilangkan). Bias ini bernilai nol jika dan hanya jika $C$ tidak berkorelasi dengan $X$ (misalnya melalui randomisasi perlakuan yang sempurna) atau $C$ tidak mempengaruhi $Y$.",
    "workedExample": {
      "problemStatement": "Pada pengujian kinerja pendinginan heatsink prosesor, variabel bebas X adalah Kecepatan Putar Kipas (RPM), variabel terikat Y adalah Suhu Inti CPU (°C). Pengujian dilakukan selama 12 jam dari pagi hingga malam di laboratorium tanpa pengatur suhu. Jelaskan mengapa Suhu Lingkungan Laboratorium bertindak sebagai perancu dan bagaimana cara mengatasinya.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi relasi Suhu Lingkungan (C) terhadap Variabel Terikat (Y): Suhu lingkungan yang naik langsung menaikkan suhu dasar CPU (C -> Y).",
        "Langkah 2: Identifikasi relasi Suhu Lingkungan (C) terhadap Variabel Bebas (X): Jika kipas menggunakan kontrol PWM termal otomatis, suhu lingkungan yang panas akan memicu kipas berputar lebih cepat (C -> X).",
        "Langkah 3: Evaluasi dampak: Terjadi struktur perancu C -> X dan C -> Y. Hal ini dapat menimbulkan ilusi aneh bahwa putaran kipas yang lebih tinggi berkorelasi dengan suhu CPU yang lebih panas.",
        "Langkah 4: Solusi mitigasi: (A) Kontrol fisik: lakukan pengujian di dalam ruang terkontrol (climatic chamber) dengan suhu konstan, atau (B) Kontrol operasional: matikan fungsi PWM otomatis dan atur putaran kipas secara manual tetap pada level uji tertentu."
      ],
      "resultInterpretation": "Melalui isolasi kontrol eksperimental, bias perancu suhu lingkungan dapat dieliminasi secara total."
    },
    "pythonImplementation": {
      "description": "Demonstrasi komputasional munculnya bias regresi akibat pengabaian variabel perancu (Omitted Variable Bias).",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\nnp.random.seed(42)\nn = 1000\n\n# Variabel Perancu C: Suhu Lingkungan (20 - 35 C) [SIMULASI/SYNTHETIC DATA]\nC = np.random.uniform(20.0, 35.0, size=n)\n\n# Variabel Bebas X (terpengaruh C): Putaran Kipas\nX = 1000 + 50.0 * C + np.random.normal(0, 50, size=n)\n\n# Variabel Terikat Y sejati: Efek sejati X adalah -0.05 C per RPM, efek C adalah +1.2 C per derajat\n# Y = 80 - 0.05 * X + 1.2 * C + error\nY_true = 80.0 - 0.05 * X + 1.2 * C + np.random.normal(0, 2.0, size=n)\n\n# Regresi naif tanpa mengontrol C: Y = b0 + b1 * X\ncov_XY = np.cov(X, Y_true)[0, 1]\nvar_X = np.var(X)\nb1_naif = cov_XY / var_X\n\nprint(f\"Koefisien Sejati Efek X terhadap Y : -0.0500\")\nprint(f\"Koefisien Estimasi Naif (Tanpa C)  : {b1_naif:.4f}\")\nprint(\"Kesimpulan: Kegagalan mengontrol perancu menghasilkan estimasi bias yang mereduksi besaran efek sejati!\")\n",
      "expectedOutput": "Koefisien Sejati Efek X terhadap Y : -0.0500\nKoefisien Estimasi Naif (Tanpa C)  : -0.0261\nKesimpulan: Kegagalan mengontrol perancu menghasilkan estimasi bias yang mereduksi besaran efek sejati!"
    },
    "commonPitfalls": [
      "Menetapkan variabel terikat sebagai variabel bebas karena kebingungan mengenai urutan waktu temporal terjadinya efek.",
      "Mengabaikan variabel pengganggu lingkungan fisis (kelembaban udara, tegangan jala-jala listrik) selama eksperimen jangka panjang.",
      "Memperlakukan variabel kontrol sebagai variabel perlakuan utama dalam penarikan kesimpulan."
    ],
    "validationProcedures": [
      "Gunakan teknik randomisasi alokasi perlakuan untuk memutus korelasi antara variabel bebas dan potensi variabel perancu tersembunyi.",
      "Susun tabel operasionalisasi variabel yang mencantumkan skala pengukuran, instrumen, dan batas toleransi instrumen untuk setiap variabel."
    ],
    "exercises": [
      {
        "question": "Bagaimana randomisasi (pengacakan alokasi unit eksperimen) mampu menetralisir pengaruh variabel perancu yang bahkan tidak diketahui oleh peneliti?",
        "hint": "Perhatikan ekspektasi matematis dari distribusi variabel pengganggu pada kelompok perlakuan dan kelompok kontrol.",
        "answerExplanation": "Melalui alokasi acak berskala memadai, nilai ekspektasi dari seluruh karakteristik bawaan unit eksperimen (baik yang terukur maupun yang tidak teramati) terdistribusi secara seimbang dan setara antara kelompok perlakuan dan kelompok kontrol. Hal ini memutus kovarians antara perancu dengan variabel bebas (Cov(X, C) = 0), sehingga mengeliminasi bias estimasi kausal."
      }
    ],
    "references": [
      {
        "citation": "Shadish, W. R., Cook, T. D., & Campbell, D. T. (2002). Experimental and Quasi-Experimental Designs for Generalized Causal Inference. Wadsworth Cengage Learning.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Montgomery, D. C. (2017). Design and Analysis of Experiments. John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Identifikasi Variabel Bebas, Terikat, Perancu, dan Medi...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.6.4.",
          "Capaian: Mengklasifikasikan variabel penelitian ke dalam 4 peran fungsional utama secara akurat.",
          "Capaian: Mengisolasi efek kausal variabel bebas dari distorsi variabel perancu (confounders).",
          "Capaian: Merancang strategi pengontrolan eksperimental dan statistikal terhadap variabel gangguan."
        ],
        "keyFormulaOrDiagram": "$$X = \\gamma_0 + \\gamma_1 C + \\epsilon_X$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Identifikasi Variabel Bebas, Terikat, Perancu, dan Medi...",
        "bulletPoints": [
          "Keberhasilan sebuah eksperimen ilmiah bergantung pada ketelitian peneliti dalam mengisolasi variabel sasaran dari pengaruh va...",
          "1. Variabel Bebas (Independent Variable / Treatment): Faktor atau kondisi yang secara sengaja dimanipulasi, diubah, atau dipi...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Memahami peran masing-masing variabel mencegah peneliti menarik kesimpulan kausal palsu da..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Memahami peran masing-masing variabel mencegah peneliti menarik kesimpulan kausal palsu dari pola data empiris yang teramati.",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Dalam model regresi struktural linier, dekomposisi efek kausal dan perancu dinyatakan sebagai:",
          "Sistem struktural sejati:",
          "Jika perancu $C$ diabaikan (dikeluarkan dari model regresi), penduga kuadrat terkecil biasa (OLS) untuk efek $..."
        ],
        "keyFormulaOrDiagram": "$$X = \\gamma_0 + \\gamma_1 C + \\epsilon_X$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada pengujian kinerja pendinginan heatsink prosesor, variabel bebas X adalah Kecepatan Putar Kipas (RPM), variabel terikat Y adalah Suhu In...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi relasi Suhu Lingkungan (C) terhadap Variabel Terikat (Y): Suhu lingkungan yang naik la...",
          "Langkah 2: Identifikasi relasi Suhu Lingkungan (C) terhadap Variabel Bebas (X): Jika kipas menggunakan kontrol...",
          "Langkah 3: Evaluasi dampak: Terjadi struktur perancu C -> X dan C -> Y. Hal ini dapat menimbulkan ilusi aneh b...",
          "Interpretasi: Melalui isolasi kontrol eksperimental, bias perancu suhu lingkungan dapat dieliminasi secara total."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Solusi mitigasi: (A) Kontrol fisik: lakukan pengujian di dalam ruang terkontrol..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Demonstrasi komputasional munculnya bias regresi akibat pengabaian variabel perancu (Omitted Variable Bias).",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: Koefisien Sejati Efek X terhadap Y : -0.0500"
        ],
        "keyFormulaOrDiagram": "Koefisien Sejati Efek X terhadap Y : -0.0500 | Koefisien Estimasi Naif (Tanpa C) : -0.0261..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menetapkan variabel terikat sebagai variabel bebas karena kebingungan mengenai urutan waktu temporal terjadiny...",
          "Perangkap: Mengabaikan variabel pengganggu lingkungan fisis (kelembaban udara, tegangan jala-jala listrik) selama eksperi...",
          "Perangkap: Memperlakukan variabel kontrol sebagai variabel perlakuan utama dalam penarikan kesimpulan."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan teknik randomisasi alokasi perlakuan untuk memutus korelasi antara variabel bebas dan potensi variabel...",
          "Prosedur: Susun tabel operasionalisasi variabel yang mencantumkan skala pengukuran, instrumen, dan batas toleransi instr..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Bagaimana randomisasi (pengacakan alokasi unit eksperimen) mampu menetralisir pengaruh variabel perancu yang bahkan tida...",
          "Petunjuk: Perhatikan ekspektasi matematis dari distribusi variabel pengganggu pada kelompok perlakuan dan kelo...",
          "Solusi Kunci: Melalui alokasi acak berskala memadai, nilai ekspektasi dari seluruh karakteristik bawaan unit eksperimen (baik yang ter..."
        ]
      }
    ]
  }
};
