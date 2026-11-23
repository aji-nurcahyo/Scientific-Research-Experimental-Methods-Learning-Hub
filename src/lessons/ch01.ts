import { Lesson } from '../types/curriculum';

export const CH01_LESSONS: Record<string, Partial<Lesson>> = {
  "1.1.1": {
    "id": "1.1.1",
    "chapterId": "CH-01",
    "title": "Logika Penalaran Ilmiah: Deduksi, Induksi, dan Abduksi dalam Rekayasa",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Membedakan struktur silogisme deduktif, inferensi induktif, dan penalaran abduktif dalam konteks rekayasa.",
      "Menganalisis validitas dan kebenaran substantif dari suatu argumen ilmiah.",
      "Menerapkan penalaran abduktif untuk mendiagnosis anomali kegagalan pada sistem fisik atau komputasi."
    ],
    "content": "Penelitian ilmiah dalam bidang rekayasa dan sains komputasi berakar pada tiga bentuk penalaran inferensial: deduksi, induksi, dan abduksi. Memahami perbedaan mendasar ketiganya merupakan syarat mutlak sebelum seorang peneliti merancang metodologi eksperimen atau menarik kesimpulan dari data empiris.\n\nPenalaran deduktif (*deductive reasoning*) bergerak dari premis teoretis universal menuju kesimpulan spesifik yang bersifat pasti secara logis. Jika premis awal benar dan struktur silogisme valid, maka kesimpulan dijamin pasti benar. Dalam rekayasa, deduksi digunakan saat menurunkan implikasi matematis dari hukum-hukum fisis yang telah mapan, seperti hukum termodinamika atau persamaan gelombang Maxwell. Namun, deduksi murni tidak menghasilkan pengetahuan faktual baru tentang alam; deduksi hanya mengeksplisitkan apa yang telah terkandung dalam premis.\n\nPenalaran induktif (*inductive reasoning*) bekerja pada arah sebaliknya: menggeneralisasikan pola umum dari serangkaian observasi empiris yang terbatas. Ketika seorang insinyur menguji ketahanan tarik 100 sampel paduan titanium dan menemukan seluruhnya patah pada tegangan di atas 900 MPa, penarikan kesimpulan bahwa \"seluruh paduan titanium tipe tersebut memiliki kekuatan tarik di atas 900 MPa\" adalah langkah induktif. Induksi memperluas batas pengetahuan empiris, tetapi kesimpulannya bersifat probabilistik, tidak pernah mutlak pasti. Ancaman kegagalan induksi dikenal dalam filsafat sains sebagai *Problem of Induction* (David Hume): berapapun banyaknya bukti pendukung yang telah dikumpulkan, satu observasi anomali di masa depan dapat membatalkan generalisasi tersebut.\n\nPenalaran abduktif (*abductive reasoning*), yang diformalkan oleh Charles Sanders Peirce, adalah inferensi menuju penjelasan terbaik (*inference to the best explanation*). Abduksi dimulai dari observasi anomali yang mengejutkan, kemudian mengajukan hipotesis plausibel yang jika benar akan mampu menerangkan fenomena tersebut secara koheren. Abduksi menjadi motor penggerak fase awal riset rekayasa, khususnya dalam *root cause analysis*, diagnosis malfungsi sensor, dan perumusan arsitektur algoritma baru sebelum diuji secara deduktif dan induktif.",
    "mathematicalFoundations": "Struktur formal ketiga logika penalaran dinyatakan dalam kalkulus proposisional:\n\n1. **Deduksi (Modus Ponens):**\n$$\\text{Premis Mayor: } P \\implies Q$$\n$$\\text{Premis Minor: } P$$\n$$\\text{Kesimpulan: } \\therefore Q$$\nKarakteristik: Bersifat analitis, mengawetkan kebenaran (*truth-preserving*), derajat kepastian mutlak ($P(Q | P, P \\implies Q) = 1$).\n\n2. **Induksi (Generalisasi Statistik):**\n$$\\text{Observasi: } P(a_1) \\land Q(a_1), \\; P(a_2) \\land Q(a_2), \\; \\dots, \\; P(a_n) \\land Q(a_n)$$\n$$\\text{Kesimpulan: } \\therefore \\forall x (P(x) \\implies Q(x)) \\quad [\\text{dengan probabilitas } 1 - \\epsilon]$$\nKarakteristik: Bersifat sintetis, memperluas informasi (*ampliative*), derajat kepastian empiris probabilistik ($P < 1$).\n\n3. **Abduksi (Inference to the Best Explanation):**\n$$\\text{Fakta Mengejutkan: } Q$$\n$$\\text{Kondisi Penjelas: } \\text{Jika } H_k \\text{ benar, maka } Q \\text{ adalah konsekuensi logis } (H_k \\implies Q)$$\n$$\\text{Kriteria Keunggulan: } H_k \\text{ memiliki skor kecocokan tertinggi di antara alternatif } \\{H_1, H_2, \\dots, H_m\\}$$\n$$\\text{Kesimpulan: } \\therefore \\text{Ada alasan kuat untuk mencurigai bahwa } H_k \\text{ benar}$$",
    "workedExample": {
      "problemStatement": "Pada pengujian rig getaran turbin angin otonom, sensor akselerometer mendeteksi lonjakan harmonik ganjil ketiga sebesar 15 dB di atas batas baseline normal. Insinyur peneliti mengidentifikasi tiga hipotesis penyebab potensial: (H1) Resonansi struktur bilah akibat kecepatan angin kritis, (H2) Cacat mekanis pada bantalan poros (bearing defect), atau (H3) Noise elektromagnetik pada kabel transmisi ADC. Bagaimanakah alur penalaran abduksi diterapkan untuk menetapkan hipotesis terbaik, dan bagaimana deduksi-induksi digunakan untuk memvalidasinya?",
      "stepByStepSolution": [
        "Langkah 1 (Abduksi - Pembentukan Ruang Hipotesis): Insinyur memeriksa spektrum frekuensi dan suhu pengoperasian. H3 dieliminasi karena sensor menggunakan komunikasi diferensial berpelindung yang kebal noise kabel. H1 dieliminasi karena pengujian dilakukan pada kecepatan angin konstan di bawah ambang resonansi.",
        "Langkah 2 (Seleksi Penjelasan Terbaik): H2 (cacat bearing) memprediksi munculnya frekuensi cacat cincin luar (BPFO) yang tepat berimpit dengan harmonik ketiga yang terobservasi. Oleh karena itu, H2 dipilih secara abduktif sebagai penjelasan terbaik.",
        "Langkah 3 (Deduksi - Prediksi Teruji): Jika H2 benar, maka pelumasan ulang tidak akan menghilangkan puncak frekuensi cacat, dan inspeksi partikel oli (ferrografi) harus menunjukkan serpihan logam mikroskopis.",
        "Langkah 4 (Induksi - Verifikasi Empiris): Insinyur mengambil 10 sampel pelumas secara berkala. Pemeriksaan laboratorium membuktikan keberadaan partikel serpihan baja karbon pada seluruh 10 sampel (induksi empiris), mengonfirmasi keabsahan H2."
      ],
      "resultInterpretation": "Penyelidikan ilmiah berhasil menggabungkan abduksi (menemukan hipotesis penyebab paling rasional), deduksi (menurunkan prediksi yang dapat diuji), dan induksi (mengonfirmasi prediksi melalui observasi berulang)."
    },
    "pythonImplementation": {
      "description": "Simulasi komparasi Bayes factor untuk membedakan dua hipotesis penyebab anomali data sensor berdasarkan likelihood observasi empiris.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# Pembangkitan data observasi anomali getaran (akselerasi dalam m/s^2)\nnp.random.seed(42)\ndata_observasi = np.random.normal(loc=12.4, scale=1.8, size=30)\n\n# Hipotesis H1 (Kondisi Normal): mu = 10.0, sigma = 2.0\n# Hipotesis H2 (Kerusakan Bantalan): mu = 12.0, sigma = 1.8\nlog_lik_h1 = np.sum(stats.norm.logpdf(data_observasi, loc=10.0, scale=2.0))\nlog_lik_h2 = np.sum(stats.norm.logpdf(data_observasi, loc=12.0, scale=1.8))\n\n# Log Bayes Factor (H2 vs H1)\nlog_bf_21 = log_lik_h2 - log_lik_h1\nbayes_factor = np.exp(log_bf_21)\n\nprint(f\"Log-Likelihood H1: {log_lik_h1:.2f}\")\nprint(f\"Log-Likelihood H2: {log_lik_h2:.2f}\")\nprint(f\"Bayes Factor (H2 / H1): {bayes_factor:.2e}\")\n\nif bayes_factor > 100:\n    print(\"Kesimpulan Abduktif: Bukti empiris sangat kuat mendukung H2 (Kerusakan Bantalan).\")\n",
      "expectedOutput": "Log-Likelihood H1: -78.36\nLog-Likelihood H2: -59.74\nBayes Factor (H2 / H1): 1.22e+08\nKesimpulan Abduktif: Bukti empiris sangat kuat mendukung H2 (Kerusakan Bantalan)."
    },
    "commonPitfalls": [
      "Memperlakukan hipotesis abduktif seolah-olah telah terbukti benar secara mutlak tanpa pengujian deduktif-induktif lanjutan.",
      "Melakukan generalisasi induktif tergesa-gesa (*hasty generalization*) dari ukuran sampel yang terlalu kecil atau tidak acak.",
      "Melakukan penalaran yang menegaskan konsekuen (*affirming the consequent*): Jika P maka Q; Q terjadi; maka menyimpulkan P pasti benar."
    ],
    "validationProcedures": [
      "Verifikasi kepatuhan silogisme terhadap hukum logika formal untuk mencegah kesalahan deduksi.",
      "Pemeriksaan kecukupan ukuran sampel dan representativitas sampling frame untuk inferensi induktif.",
      "Uji sensitivitas model penjelas tandingan untuk memastikan hipotesis terpilih benar-benar *the best explanation*."
    ],
    "exercises": [
      {
        "question": "Seorang peneliti mengamati bahwa 50 model deep learning yang ditraining dengan optimizer Adam selalu konvergen lebih cepat dibanding SGD pada dataset citra medis miliknya. Peneliti tersebut menyimpulkan: \"Optimizer Adam pasti selalu lebih unggul dibanding SGD untuk seluruh jenis arsitektur komputasi visi\". Bentuk penalaran apakah yang digunakan, dan apa kelemahan fatal kesimpulannya?",
        "hint": "Perhatikan perpindahan dari observasi terbatas menuju klaim universal.",
        "answerExplanation": "Peneliti menggunakan penalaran induktif. Kelemahan fatalnya adalah generalisasi berlebihan (*overgeneralization*). Kesimpulan induktif hanya berlaku dengan tingkat probabilitas tertentu pada domain pengujian yang identik, dan tidak dapat digeneralisasikan secara universal ke seluruh arsitektur visi tanpa mempertimbangkan faktor regularisasi dan generalisasi out-of-distribution."
      }
    ],
    "references": [
      {
        "citation": "Peirce, C. S. (1931-1958). Collected Papers of Charles Sanders Peirce. Harvard University Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Popper, K. R. (1959). The Logic of Scientific Discovery. Hutchinson & Co.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Lipton, P. (2004). Inference to the Best Explanation (2nd ed.). Routledge.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Logika Penalaran Ilmiah: Deduksi, Induksi, dan Abduksi...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.1.1.",
          "Capaian: Membedakan struktur silogisme deduktif, inferensi induktif, dan penalaran abduktif dalam konteks rekayasa.",
          "Capaian: Menganalisis validitas dan kebenaran substantif dari suatu argumen ilmiah.",
          "Capaian: Menerapkan penalaran abduktif untuk mendiagnosis anomali kegagalan pada sistem fisik atau komputasi."
        ],
        "keyFormulaOrDiagram": "$$\\text{Premis Mayor: } P \\implies Q$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Logika Penalaran Ilmiah: Deduksi, Induksi, dan Abduksi...",
        "bulletPoints": [
          "Penelitian ilmiah dalam bidang rekayasa dan sains komputasi berakar pada tiga bentuk penalaran inferensial: deduksi, induksi,...",
          "Penalaran deduktif (*deductive reasoning*) bergerak dari premis teoretis universal menuju kesimpulan spesifik yang bersifat p...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Penalaran induktif (*inductive reasoning*) bekerja pada arah sebaliknya: menggeneralisasik..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Penalaran induktif (*inductive reasoning*) bekerja pada arah sebaliknya: menggeneralisasikan pola umum dari serangkaian obser...",
          "Penalaran abduktif (*abductive reasoning*), yang diformalkan oleh Charles Sanders Peirce, adalah inferensi menuju penjelasan...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Struktur formal ketiga logika penalaran dinyatakan dalam kalkulus proposisional:",
          "1. **Deduksi (Modus Ponens):**",
          "Karakteristik: Bersifat analitis, mengawetkan kebenaran (*truth-preserving*), derajat kepastian mutlak ($P(Q |..."
        ],
        "keyFormulaOrDiagram": "$$\\text{Premis Mayor: } P \\implies Q$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada pengujian rig getaran turbin angin otonom, sensor akselerometer mendeteksi lonjakan harmonik ganjil ketiga sebesar 15 dB di atas batas...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Abduksi - Pembentukan Ruang Hipotesis): Insinyur memeriksa spektrum frekuensi dan suhu pengoperasia...",
          "Langkah 2 (Seleksi Penjelasan Terbaik): H2 (cacat bearing) memprediksi munculnya frekuensi cacat cincin luar (...",
          "Langkah 3 (Deduksi - Prediksi Teruji): Jika H2 benar, maka pelumasan ulang tidak akan menghilangkan puncak fre...",
          "Interpretasi: Penyelidikan ilmiah berhasil menggabungkan abduksi (menemukan hipotesis penyebab paling rasional), deduksi (menurunkan p..."
        ],
        "keyFormulaOrDiagram": "Langkah 4 (Induksi - Verifikasi Empiris): Insinyur mengambil 10 sampel pelumas secara berk..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Simulasi komparasi Bayes factor untuk membedakan dua hipotesis penyebab anomali data sensor berdasarkan likelihood observasi empir...",
          "Dependensi Pustaka: numpy, scipy.stats",
          "Keluaran Diharapkan: Log-Likelihood H1: -78.36"
        ],
        "keyFormulaOrDiagram": "Log-Likelihood H1: -78.36 | Log-Likelihood H2: -59.74 | Bayes Factor (H2 / H1): 1.22e+08"
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Memperlakukan hipotesis abduktif seolah-olah telah terbukti benar secara mutlak tanpa pengujian deduktif-induk...",
          "Perangkap: Melakukan generalisasi induktif tergesa-gesa (*hasty generalization*) dari ukuran sampel yang terlalu kecil at...",
          "Perangkap: Melakukan penalaran yang menegaskan konsekuen (*affirming the consequent*): Jika P maka Q; Q terjadi; maka men..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Verifikasi kepatuhan silogisme terhadap hukum logika formal untuk mencegah kesalahan deduksi.",
          "Prosedur: Pemeriksaan kecukupan ukuran sampel dan representativitas sampling frame untuk inferensi induktif.",
          "Prosedur: Uji sensitivitas model penjelas tandingan untuk memastikan hipotesis terpilih benar-benar *the best explanatio..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Seorang peneliti mengamati bahwa 50 model deep learning yang ditraining dengan optimizer Adam selalu konvergen lebih cep...",
          "Petunjuk: Perhatikan perpindahan dari observasi terbatas menuju klaim universal.",
          "Solusi Kunci: Peneliti menggunakan penalaran induktif. Kelemahan fatalnya adalah generalisasi berlebihan (*overgeneralization*). Kesim..."
        ]
      }
    ]
  },
  "1.1.2": {
    "id": "1.1.2",
    "chapterId": "CH-01",
    "title": "Prinsip Falsifikasi Popperian dan Demarkasi Sains vs Pseudosains",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menjelaskan kriteria demarkasi Karl Popper antara sains empiris dan pseudosains.",
      "Merumuskan hipotesis rekayasa yang memenuhi kriteria keterfalsifikasian (falsifiability).",
      "Mengidentifikasi taktik imunisasi konseptual yang melemahkan keabsahan riset ilmiah."
    ],
    "content": "Salah satu kontribusi paling berpengaruh dalam filsafat sains modern adalah kriteria demarkasi Karl Popper dalam bukunya *The Logic of Scientific Discovery* (1959). Popper menolak pandangan positivisme logis kaum Lingkaran Wina yang mendasarkan sains pada prinsip verifikasi (*verifiability*). Menurut Popper, hukum ilmiah tidak akan pernah dapat diverifikasi secara tuntas oleh observasi empiris berapapun banyaknya bukti pendukung yang dikumpulkan, namun hukum tersebut dapat difalsifikasi secara mutlak hanya oleh satu bukti tandingan yang valid.\n\nKriteria demarkasi Popperian menyatakan bahwa suatu teori atau hipotesis hanya dapat dikategorikan sebagai ilmiah (*scientific*) apabila teori tersebut terbuka terhadap kemungkinan untuk dibuktikan salah (*falsifiable*). Teori yang tidak dapat dibayangkan kondisi empiris apa yang dapat membantahnya bukanlah teori ilmiah, melainkan doktrin metafisis atau pseudosains.\n\nDalam konteks penelitian rekayasa dan sains komputasi, prinsip falsifikasi memiliki implikasi praktis yang sangat tegas. Suatu klaim algoritma seperti \"metode kami bekerja dengan baik dan cerdas\" bukanlah hipotesis ilmiah karena bersifat kebal terhadap penyangkalan (*unfalsifiable*). Sebaliknya, klaim seperti \"algoritma kendali prediktif usulan mempertahankan osilasi sudut roll di bawah 2.5 derajat saat diuji pada kecepatan angin silang 15 m/s\" adalah hipotesis ilmiah yang kokoh, karena menyediakan kondisi batas yang jelas di mana klaim tersebut akan dinyatakan gagal jika deviasi melebihi 2.5 derajat.\n\nPeneliti rekayasa kerap terjebak dalam taktik imunisasi (*conventionalist stratagems* atau *ad-hoc immunizing hypotheses*): ketika eksperimen menghasilkan data yang bertentangan dengan model usulan, peneliti menambahkan pengecualian khusus secara retrospektif hanya untuk menyelamatkan hipotesis awal. Popper menegaskan bahwa modifikasi teori hanya diizinkan apabila modifikasi tersebut meningkatkan derajat keterfalsifikasian teori, bukan menurunkannya.",
    "mathematicalFoundations": "Formulasi asimetri logis antara verifikasi dan falsifikasi bersandar pada hukum Modus Tollens:\n\n$$\\text{Teori } T \\implies \\text{Prediksi Empiris } E$$\n$$\\text{Hasil Eksperimen: } \\neg E \\text{ (Prediksi tidak teramati)}$$\n$$\\text{Kesimpulan Logis: } \\therefore \\neg T \\text{ (Teori terfalsifikasi)}$$\n\nBandingkan dengan upaya verifikasi yang secara logis keliru:\n$$\\text{Teori } T \\implies \\text{Prediksi Empiris } E$$\n$$\\text{Hasil Eksperimen: } E \\text{ (Prediksi teramati)}$$\n$$\\text{Kesimpulan yang Salah: } \\therefore T \\text{ benar} \\quad [\\text{Logical Fallacy: Affirming the Consequent}]$$\n\nSecara formal, konfirmasi empiris $E$ hanya meningkatkan derajat koroborasi (*degree of corroboration*) teori $T$, tidak pernah membuktikannya benar mutlak:\n$$C(T, E) = \\frac{P(E|T) - P(E)}{P(E|T) - P(E \\land T) + P(E)}$$",
    "workedExample": {
      "problemStatement": "Evaluasi dua pernyataan klaim penelitian dalam proposal tesis rekayasa berikut: (Klaim A) \"Sistem pendingin berbasis thermoelectric generator (TEG) yang kami kembangkan mampu meningkatkan efisiensi pendinginan perangkat elektronik secara optimal pada berbagai kondisi beban panas.\" (Klaim B) \"Sistem pendingin TEG usulan menurunkan resistansi termal junction-to-ambient di bawah 0.45 K/W pada fluks panas 50 W/cm^2 dengan konsumsi daya listrik tambahan tidak melebihi 8.0 Watt.\" Tentukan mana klaim yang ilmiah menurut Popper dan rumuskan kondisi falsifikasinya.",
      "stepByStepSolution": [
        "Langkah 1 (Analisis Klaim A): Kata \"optimal\" dan \"berbagai kondisi\" bersifat ambigu dan tidak operasional. Jika pada pengujian resistansi termal melonjak, perancang dapat membela diri dengan menyatakan kondisi tersebut belum \"optimal\". Klaim A kebal terhadap pembuktian salah (unfalsifiable), sehingga tidak memenuhi standar ilmiah.",
        "Langkah 2 (Analisis Klaim B): Klaim B mendefinisikan batas kuantitatif tegas: resistansi termal $\\leq 0.45$ K/W pada fluks panas $50$ W/cm^2 dengan batas daya $\\leq 8.0$ W.",
        "Langkah 3 (Perumusan Kondisi Falsifikasi): Kondisi falsifikasi formal: Jika pada pengujian terkalibrasi dengan fluks $50$ W/cm^2, terukur resistansi termal $> 0.45$ K/W ATAU konsumsi daya $> 8.0$ W, maka klaim usulan dinyatakan terfalsifikasi secara objektif."
      ],
      "resultInterpretation": "Klaim B adalah pernyataan ilmiah berbobot tinggi karena secara sukarela menempatkan diri pada risiko untuk dibuktikan salah oleh data eksperimen terukur."
    },
    "pythonImplementation": {
      "description": "Implementasi evaluasi otomatis ambang falsifikasi performa model kendali rekayasa di bawah uji stres beban dinamis.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Definisi Kriteria Falsifikasi (Threshold Kontrak Ilmiah)\nAMBANG_RESISTANSI_TERMAL = 0.45  # K/W (Maksimum toleransi)\nAMBANG_DAYA_MAKSIMUM = 8.0      # Watt\n\n# Data Observasi 15 Run Pengujian Terkalibrasi (Fluks Panas = 50 W/cm^2)\nnp.random.seed(101)\nresistansi_terukur = np.random.normal(loc=0.42, scale=0.03, size=15)\ndaya_terukur = np.random.normal(loc=7.6, scale=0.3, size=15)\n\n# Pengecekan Falsifikasi\npelanggaran_resistansi = np.where(resistansi_terukur > AMBANG_RESISTANSI_TERMAL)[0]\npelanggaran_daya = np.where(daya_terukur > AMBANG_DAYA_MAKSIMUM)[0]\n\nprint(\"=== AUDIT FALSIFIKASI KLAIM ILMIAH ===\")\nprint(f\"Rata-rata Resistansi Termal: {np.mean(resistansi_terukur):.3f} K/W (Max: {np.max(resistansi_terukur):.3f})\")\nprint(f\"Rata-rata Konsumsi Daya: {np.mean(daya_terukur):.2f} W (Max: {np.max(daya_terukur):.2f})\")\n\nterfalsifikasi = len(pelanggaran_resistansi) > 0 or len(pelanggaran_daya) > 0\n\nif terfalsifikasi:\n    print(f\"STATUS: KLAIM TERFALSIFIKASI pada {len(pelanggaran_resistansi)} run resistansi dan {len(pelanggaran_daya)} run daya.\")\nelse:\n    print(\"STATUS: KLAIM TERSELAMATKAN (Terkoroborasi) pada seluruh 15 run pengujian.\")\n",
      "expectedOutput": "=== AUDIT FALSIFIKASI KLAIM ILMIAH ===\nRata-rata Resistansi Termal: 0.425 K/W (Max: 0.485)\nRata-rata Konsumsi Daya: 7.64 W (Max: 8.21)\nSTATUS: KLAIM TERFALSIFIKASI pada 3 run resistansi dan 2 run daya."
    },
    "commonPitfalls": [
      "Menuliskan rumusan masalah dan hipotesis yang menggunakan bahasa puitis atau kata sifat subjektif tanpa angka batas toleransi kuantitatif.",
      "Menyembunyikan run eksperimen yang gagal agar klaim naskah tampak selalu berhasil sempurna (cherry-picking).",
      "Menganggap bahwa jika eksperimen memfalsifikasi hipotesis awal maka penelitian dinyatakan \"gagal\" (falsifikasi yang valid adalah kontribusi saintifik sejati)."
    ],
    "validationProcedures": [
      "Audit hipotesis pra-eksperimen: Pastikan terdapat minimal satu skenario data yang dapat menggugurkan klaim.",
      "Pemeriksaan logbook forensik untuk mendeteksi penambahan hipotesis ad-hoc pasca-analisis data.",
      "Evaluasi transparansi pelaporan kegagalan sistem pada seksi Results dan Discussion."
    ],
    "exercises": [
      {
        "question": "Mengapa klaim \"Algoritma kecerdasan buatan kami memiliki akurasi tinggi karena terinspirasi oleh mekanisme otak biologis manusia\" dikategorikan sebagai klaim non-ilmiah (pseudosains) dalam rekayasa komputasi?",
        "hint": "Fokus pada apakah analogi biologis dapat dibuktikan salah secara komputasi.",
        "answerExplanation": "Klaim tersebut tidak ilmiah karena analogi inspirasi biologis tidak menyediakan kriteria falsifikasi matematis. Keunggulan algoritma harus diukur melalui metrik komparasi kuantitatif terhadap baseline terstandarisasi, bukan melalui klaim kemiripan kualitatif dengan organ biologis yang tidak dapat diverifikasi batas fungsionalnya."
      }
    ],
    "references": [
      {
        "citation": "Popper, K. R. (1959). The Logic of Scientific Discovery. London: Routledge.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Kuhn, T. S. (1962). The Structure of Scientific Revolutions. University of Chicago Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Lakatos, I. (1978). The Methodology of Scientific Research Programmes. Cambridge University Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Prinsip Falsifikasi Popperian dan Demarkasi Sains vs Ps...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.1.2.",
          "Capaian: Menjelaskan kriteria demarkasi Karl Popper antara sains empiris dan pseudosains.",
          "Capaian: Merumuskan hipotesis rekayasa yang memenuhi kriteria keterfalsifikasian (falsifiability).",
          "Capaian: Mengidentifikasi taktik imunisasi konseptual yang melemahkan keabsahan riset ilmiah."
        ],
        "keyFormulaOrDiagram": "$$\\text{Teori } T \\implies \\text{Prediksi Empiris } E$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Prinsip Falsifikasi Popperian dan Demarkasi Sains vs Ps...",
        "bulletPoints": [
          "Salah satu kontribusi paling berpengaruh dalam filsafat sains modern adalah kriteria demarkasi Karl Popper dalam bukunya *The...",
          "Kriteria demarkasi Popperian menyatakan bahwa suatu teori atau hipotesis hanya dapat dikategorikan sebagai ilmiah (*scientifi...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Dalam konteks penelitian rekayasa dan sains komputasi, prinsip falsifikasi memiliki implik..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Dalam konteks penelitian rekayasa dan sains komputasi, prinsip falsifikasi memiliki implikasi praktis yang sangat tegas. Suat...",
          "Peneliti rekayasa kerap terjebak dalam taktik imunisasi (*conventionalist stratagems* atau *ad-hoc immunizing hypotheses*): k...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Formulasi asimetri logis antara verifikasi dan falsifikasi bersandar pada hukum Modus Tollens:",
          "Bandingkan dengan upaya verifikasi yang secara logis keliru:",
          "Secara formal, konfirmasi empiris $E$ hanya meningkatkan derajat koroborasi (*degree of corroboration*) teori..."
        ],
        "keyFormulaOrDiagram": "$$\\text{Teori } T \\implies \\text{Prediksi Empiris } E$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Evaluasi dua pernyataan klaim penelitian dalam proposal tesis rekayasa berikut: (Klaim A) \"Sistem pendingin berbasis thermoelectric generato...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Analisis Klaim A): Kata \"optimal\" dan \"berbagai kondisi\" bersifat ambigu dan tidak operasional. Jik...",
          "Langkah 2 (Analisis Klaim B): Klaim B mendefinisikan batas kuantitatif tegas: resistansi termal $\\leq 0.45$ K/...",
          "Langkah 3 (Perumusan Kondisi Falsifikasi): Kondisi falsifikasi formal: Jika pada pengujian terkalibrasi dengan...",
          "Interpretasi: Klaim B adalah pernyataan ilmiah berbobot tinggi karena secara sukarela menempatkan diri pada risiko untuk dibuktikan sa..."
        ],
        "keyFormulaOrDiagram": "Langkah 3 (Perumusan Kondisi Falsifikasi): Kondisi falsifikasi formal: Jika pada pengujian..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Implementasi evaluasi otomatis ambang falsifikasi performa model kendali rekayasa di bawah uji stres beban dinamis.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: === AUDIT FALSIFIKASI KLAIM ILMIAH ==="
        ],
        "keyFormulaOrDiagram": "=== AUDIT FALSIFIKASI KLAIM ILMIAH === | Rata-rata Resistansi Termal: 0.425 K/W (Max: 0.48..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menuliskan rumusan masalah dan hipotesis yang menggunakan bahasa puitis atau kata sifat subjektif tanpa angka...",
          "Perangkap: Menyembunyikan run eksperimen yang gagal agar klaim naskah tampak selalu berhasil sempurna (cherry-picking).",
          "Perangkap: Menganggap bahwa jika eksperimen memfalsifikasi hipotesis awal maka penelitian dinyatakan \"gagal\" (falsifikasi..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Audit hipotesis pra-eksperimen: Pastikan terdapat minimal satu skenario data yang dapat menggugurkan klaim.",
          "Prosedur: Pemeriksaan logbook forensik untuk mendeteksi penambahan hipotesis ad-hoc pasca-analisis data.",
          "Prosedur: Evaluasi transparansi pelaporan kegagalan sistem pada seksi Results dan Discussion."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa klaim \"Algoritma kecerdasan buatan kami memiliki akurasi tinggi karena terinspirasi oleh mekanisme otak biologis...",
          "Petunjuk: Fokus pada apakah analogi biologis dapat dibuktikan salah secara komputasi.",
          "Solusi Kunci: Klaim tersebut tidak ilmiah karena analogi inspirasi biologis tidak menyediakan kriteria falsifikasi matematis. Keunggul..."
        ]
      }
    ]
  },
  "1.1.3": {
    "id": "1.1.3",
    "chapterId": "CH-01",
    "title": "Paradigma Riset: Positivisme, Post-Positivisme, Konstruktivisme, dan Pragmatisme",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membandingkan asumsi ontologis, epistemologis, dan aksiologis dari empat paradigma penelitian utama.",
      "Menganalisis relevansi paradigma pragmatisme dalam penelitian rekayasa terapan.",
      "Menyelaraskan paradigma riset yang dipilih dengan strategi pengumpulan dan validasi data."
    ],
    "content": "Setiap peneliti, secara sadar atau tidak, bekerja di bawah suatu paradigma penelitian tertentu. Paradigma adalah sistem keyakinan filosofis mendasar (*worldview*) yang memandu tindakan ilmiah, mencakup tiga dimensi utama: ontologi (apakah hakikat dari realitas yang diteliti?), epistemologi (apakah hakikat hubungan antara peneliti dan objek yang diketahui?), dan metodologi (bagaimana cara peneliti memperoleh pengetahuan tersebut?).\n\nDalam sejarah keilmuan, empat paradigma dominan membentuk lanskap metodologi:\n\n1. **Positivisme:** Berakar pada pandangan bahwa realitas bersifat objektif, tunggal, dan diatur oleh hukum-hukum alam deterministik yang independen dari pengamat (*naive realism*). Epistemologinya bersifat dualis dan objektif: peneliti dapat mengamati objek tanpa mempengaruhinya. Metodologinya berfokus pada eksperimen terkontrol ketat dan verifikasi kuantitatif.\n\n2. **Post-Positivisme:** Mengakui bahwa realitas objektif memang ada di luar sana, namun manusia tidak akan pernah mampu memahaminya secara sempurna karena keterbatasan panca indera dan ketidaksempurnaan instrumen (*critical realism*). Posisi epistemologinya menekankan objektivitas yang termodifikasi: kebenaran selalu bersifat aproksimatif dan probabilistik. Paradigma inilah yang menjadi landasan sains rekayasa eksperimental modern, di mana setiap pengukuran wajib menyertakan batas ketidakpastian (*uncertainty bounds*).\n\n3. **Konstruktivisme (Interpretivisme):** Memandang bahwa realitas bersifat majemuk, dinamis, dan dikonstruksi secara sosial melalui pengalaman manusia (*relativism*). Peneliti dan subjek penelitian saling berinteraksi secara tak terpisahkan. Paradigma ini dominan dalam penelitian ilmu sosial, interaksi manusia-komputer (HCI) kualitatif, dan studi penerimaan teknologi.\n\n4. **Pragmatisme:** Mengesampingkan perdebatan metafisis abstrak mengenai realitas murni dan memusatkan perhatian pada \"apa yang berhasil secara praktis\" (*what works*) untuk menyelesaikan masalah riil. Aksiologi pragmatisme berorientasi pada dampak solusi, nilai terapan, dan kegunaan instrumental. Pragmatisme menjadi landasan filosofis utama bagi penelitian rekayasa terapan (*applied engineering*) dan metodologi campuran (*mixed methods*), di mana insinyur menggabungkan pemodelan matematika, simulasi numerik, prototipe laboratorium, dan studi kelayakan ekonomi.",
    "mathematicalFoundations": "Matriks komparasi filosofis paradigma riset:\n\n$$\\mathbf{M}_{\\text{Paradigma}} = \\begin{pmatrix} \n\\text{Paradigma} & \\text{Ontologi} & \\text{Epistemologi} & \\text{Metodologi} \\\\\n\\text{Positivisme} & \\text{Realisme Naif} & \\text{Objektivis Dualis} & \\text{Eksperimen Verifikatif} \\\\\n\\text{Post-Positivisme} & \\text{Realisme Kritis} & \\text{Objektivis Probabilistik} & \\text{Falsifikasi & DoE} \\\\\n\\text{Konstruktivisme} & \\text{Relativisme Majemuk} & \\text{Subjektif Interaktif} & \\text{Hermeneutika & Kualitatif} \\\\\n\\text{Pragmatisme} & \\text{Realisme Instrumental} & \\text{Fungsional Praktis} & \\text{Mixed Methods & Design Science}\n\\end{pmatrix}$$",
    "workedExample": {
      "problemStatement": "Sebuah tim peneliti di ITERA mengembangkan sistem navigasi otonom untuk traktor bajak sawah pintar. Penelitian mencakup perancangan algoritma path-planning, pengujian akurasi GPS RTK di lahan berlumpur, serta evaluasi persepsi kemudahan penggunaan oleh kelompok petani lokal. Analisislah bagaimana integrasi paradigma Post-Positivisme dan Pragmatisme diterapkan dalam studi multi-tahap ini.",
      "stepByStepSolution": [
        "Langkah 1 (Fase Pengujian Sensor - Post-Positivisme): Pengujian akurasi koordinat GPS RTK beroperasi di bawah realisme kritis. Realitas posisi fisik traktor adalah objektif, namun data sensor mengandung noise atmosfer dan multipath. Peneliti menerapkan DoE terkontrol dan menghitung interval ketidakpastian 95% Root Mean Square Error (RMSE).",
        "Langkah 2 (Fase Algoritma Path-Planning - Pragmatisme): Peneliti mengevaluasi algoritma berdasarkan kriteria fungsional praktis: minimalisasi waktu putar di ujung pematang dan efisiensi konsumsi bahan bakar solar, bukan kesempurnaan teoretis konvergensial murni.",
        "Langkah 3 (Fase Penerimaan Petani - Elemen Konstruktivis dalam Payung Pragmatis): Wawancara mendalam mengenai kenyamanan antarmuka layar sentuh menggali persepsi subjektif petani untuk menyempurnakan interaksi pengguna."
      ],
      "resultInterpretation": "Penyelarasan paradigma yang jelas menghindarkan peneliti dari kekeliruan metode, seperti memperlakukan data kepuasan petani dengan uji t-student parametrik tanpa justifikasi skala interval."
    },
    "commonPitfalls": [
      "Mengklaim paradigma positivis murni pada penelitian rekayasa sensor modern yang jelas-jelas tunduk pada batas ketidakpastian Heisenberg dan noise stokastik.",
      "Mengabaikan pertimbangan aksiologis (etika, dampak lingkungan, dan nilai praktis) pada riset rekayasa.",
      "Mencampuradukkan metode kualitatif dan kuantitatif secara serampangan tanpa kerangka integrasi pragmatisme yang koheren."
    ],
    "validationProcedures": [
      "Pemeriksaan konsistensi epistemologis antara pertanyaan penelitian dan metode analisis yang dipilih.",
      "Verifikasi bahwa interpretasi temuan tidak melompat melampaui batas ontologis paradigma yang dinyatakan."
    ],
    "exercises": [
      {
        "question": "Mengapa riset rekayasa algoritma visi komputer yang menguji akurasi deteksi citra di laboratorium lebih tepat dipayungi oleh paradigma Post-Positivisme dibanding Positivisme Naif?",
        "hint": "Perhatikan keberadaan noise sensor, variasi iluminasi, dan keterbatasan dataset pelatihan.",
        "answerExplanation": "Karena akurasi deteksi pada data riil tidak pernah bernilai mutlak 100% deterministik. Post-positivisme mengakui bahwa kebenaran pengukuran model selalu dipengaruhi oleh bias sampling dataset, noise sensor kamera, dan kondisi batas domain operasional yang probabilistik."
      }
    ],
    "references": [
      {
        "citation": "Creswell, J. W., & Creswell, J. D. (2018). Research Design: Qualitative, Quantitative, and Mixed Methods Approaches (5th ed.). SAGE.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Guba, E. G., & Lincoln, Y. S. (1994). Competing paradigms in qualitative research. Handbook of Qualitative Research, 2, 105-117.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Paradigma Riset: Positivisme, Post-Positivisme, Konstru...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.1.3.",
          "Capaian: Membandingkan asumsi ontologis, epistemologis, dan aksiologis dari empat paradigma penelitian utama.",
          "Capaian: Menganalisis relevansi paradigma pragmatisme dalam penelitian rekayasa terapan.",
          "Capaian: Menyelaraskan paradigma riset yang dipilih dengan strategi pengumpulan dan validasi data."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{M}_{\\text{Paradigma}} = \\begin{pmatrix} \n\\text{Paradigma} & \\text{Ontologi} & \\text{Epistemologi} & \\text{Metodologi} \\\\\n\\text{Positivisme} & \\text{Realisme Naif} & \\text{Objektivis Dualis} & \\text{Eksperimen Verifikatif} \\\\\n\\text{Post-Positivisme} & \\text{Realisme Kritis} & \\text{Objektivis Probabilistik} & \\text{Falsifikasi & DoE} \\\\\n\\text{Konstruktivisme} & \\text{Relativisme Majemuk} & \\text{Subjektif Interaktif} & \\text{Hermeneutika & Kualitatif} \\\\\n\\text{Pragmatisme} & \\text{Realisme Instrumental} & \\text{Fungsional Praktis} & \\text{Mixed Methods & Design Science}\n\\end{pmatrix}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Paradigma Riset: Positivisme, Post-Positivisme, Konstru...",
        "bulletPoints": [
          "Setiap peneliti, secara sadar atau tidak, bekerja di bawah suatu paradigma penelitian tertentu. Paradigma adalah sistem keyak...",
          "Dalam sejarah keilmuan, empat paradigma dominan membentuk lanskap metodologi:",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "1. **Positivisme:** Berakar pada pandangan bahwa realitas bersifat objektif, tunggal, dan..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "1. **Positivisme:** Berakar pada pandangan bahwa realitas bersifat objektif, tunggal, dan diatur oleh hukum-hukum alam determ...",
          "2. **Post-Positivisme:** Mengakui bahwa realitas objektif memang ada di luar sana, namun manusia tidak akan pernah mampu mema...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Matriks komparasi filosofis paradigma riset:",
          "\\text{Paradigma} & \\text{Ontologi} & \\text{Epistemologi} & \\text{Metodologi} \\\\",
          "\\text{Positivisme} & \\text{Realisme Naif} & \\text{Objektivis Dualis} & \\text{Eksperimen Verifikatif} \\\\"
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{M}_{\\text{Paradigma}} = \\begin{pmatrix} \n\\text{Paradigma} & \\text{Ontologi} & \\text{Epistemologi} & \\text{Metodologi} \\\\\n\\text{Positivisme} & \\text{Realisme Naif} & \\text{Objektivis Dualis} & \\text{Eksperimen Verifikatif} \\\\\n\\text{Post-Positivisme} & \\text{Realisme Kritis} & \\text{Objektivis Probabilistik} & \\text{Falsifikasi & DoE} \\\\\n\\text{Konstruktivisme} & \\text{Relativisme Majemuk} & \\text{Subjektif Interaktif} & \\text{Hermeneutika & Kualitatif} \\\\\n\\text{Pragmatisme} & \\text{Realisme Instrumental} & \\text{Fungsional Praktis} & \\text{Mixed Methods & Design Science}\n\\end{pmatrix}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah tim peneliti di ITERA mengembangkan sistem navigasi otonom untuk traktor bajak sawah pintar. Penelitian mencakup perancangan algoritm...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1 (Fase Pengujian Sensor - Post-Positivisme): Pengujian akurasi koordinat GPS RTK beroperasi di bawah...",
          "Langkah 2 (Fase Algoritma Path-Planning - Pragmatisme): Peneliti mengevaluasi algoritma berdasarkan kriteria f...",
          "Langkah 3 (Fase Penerimaan Petani - Elemen Konstruktivis dalam Payung Pragmatis): Wawancara mendalam mengenai...",
          "Interpretasi: Penyelarasan paradigma yang jelas menghindarkan peneliti dari kekeliruan metode, seperti memperlakukan data kepuasan pet..."
        ],
        "keyFormulaOrDiagram": "Langkah 3 (Fase Penerimaan Petani - Elemen Konstruktivis dalam Payung Pragmatis): Wawancar..."
      },
      {
        "slideNumber": 7,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Mengklaim paradigma positivis murni pada penelitian rekayasa sensor modern yang jelas-jelas tunduk pada batas...",
          "Perangkap: Mengabaikan pertimbangan aksiologis (etika, dampak lingkungan, dan nilai praktis) pada riset rekayasa.",
          "Perangkap: Mencampuradukkan metode kualitatif dan kuantitatif secara serampangan tanpa kerangka integrasi pragmatisme yan..."
        ]
      },
      {
        "slideNumber": 8,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Pemeriksaan konsistensi epistemologis antara pertanyaan penelitian dan metode analisis yang dipilih.",
          "Prosedur: Verifikasi bahwa interpretasi temuan tidak melompat melampaui batas ontologis paradigma yang dinyatakan."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa riset rekayasa algoritma visi komputer yang menguji akurasi deteksi citra di laboratorium lebih tepat dipayungi...",
          "Petunjuk: Perhatikan keberadaan noise sensor, variasi iluminasi, dan keterbatasan dataset pelatihan.",
          "Solusi Kunci: Karena akurasi deteksi pada data riil tidak pernah bernilai mutlak 100% deterministik. Post-positivisme mengakui bahwa k..."
        ]
      }
    ]
  },
  "1.1.4": {
    "id": "1.1.4",
    "chapterId": "CH-01",
    "title": "Siklus Investigasi Ilmiah Hipotetiko-Deduktif",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Menguraikan tahapan siklus investigasi hipotetiko-deduktif dari observasi ke falsifikasi.",
      "Menerapkan perulangan umpan balik eksperimental untuk memutakhirkan model matematika.",
      "Mengidentifikasi titik henti siklus riset rekayasa berbasis kriteria konvergensi teknis."
    ],
    "content": "Metode ilmiah modern beroperasi sebagai siklus iteratif berkelanjutan yang dikenal sebagai siklus hipotetiko-deduktif (*hypothetico-deductive cycle*). Sains dan rekayasa tidak bergerak secara linier satu arah, melainkan membentuk spiral pembelajaran di mana setiap putaran eksperimen memperhalus, mengoreksi, atau menggantikan model teoretis sebelumnya.\n\nSiklus ini terdiri dari enam tahapan yang saling mengunci:\n1. **Observasi Awal & Eksplorasi Fenomena:** Menemukan inkonsistensi antara teori yang ada dengan fakta fisik teramati di laboratorium atau industri.\n2. **Perumusan Hipotesis Teoritis:** Mengembangkan model matematis atau konseptual baru yang mampu menerangkan mekanisme penyebab fenomena tersebut.\n3. **Deduksi Prediksi Eksperimental:** Menurunkan secara deduktif konsekuensi logis kuantitatif yang harus teramati jika hipotesis tersebut benar.\n4. **Perancangan & Eksekusi Eksperimen Terkontrol:** Menyiapkan instrumen terkalibrasi, mengendalikan variabel perancu, dan merekam data mentah dengan protokol yang dapat direplikasi.\n5. **Uji Falsifikasi & Analisis Data:** Membandingkan data empiris terhadap prediksi deduktif menggunakan inferensi statistik dan interval kepercayaan.\n6. **Pemutakhiran Model (Feedback Loop):** Jika data membantah prediksi, model ditolak atau dimodifikasi; jika data selaras, derajat keyakinan model meningkat dan membuka pertanyaan penelitian tingkat berikutnya.",
    "mathematicalFoundations": "Formalisasi siklus iteratif pemutakhiran model:\n\n$$\\mathbf{M}_{t+1} = \\mathcal{U}(\\mathbf{M}_t, \\mathcal{D}_t, \\mathcal{L})$$\n\ndi mana:\n- $\\mathbf{M}_t$: Status model teoretis pada iterasi ke-$t$.\n- $\\mathcal{D}_t$: Himpunan data observasi eksperimen baru $\\{(x_i, y_i)\\}_{i=1}^{n_t}$.\n- $\\mathcal{L}$: Operator penilai kecocokan empiris (Loss function / Likelihood).\n- $\\mathcal{U}$: Aturan pemutakhiran epistemologis (misal: penyesuaian parameter OLS, filter Bayes, atau perombakan struktur persamaan).\n\nKriteria Falsifikasi Iteratif:\n$$\\text{Reject } \\mathbf{M}_t \\iff \\mathcal{L}(\\mathbf{M}_t; \\mathcal{D}_t) > \\gamma_{\\text{critical}}$$",
    "workedExample": {
      "problemStatement": "Tunjukkan bagaimana siklus hipotetiko-deduktif diterapkan dalam pengembangan algoritma kompresi citra satelit tanpa kehilangan informasi tepi (edge-preserving compression).",
      "stepByStepSolution": [
        "Iterasi 1 (Model Linier Standar): Model awal mengasumsikan transformasi kosinus diskrit (DCT) standar cukup. Prediksi: rasio kompresi 8:1 dengan PSNR > 40 dB. Hasil eksperimen: PSNR tercapai 41 dB tetapi tepi jalan raya kabur (Edge Degradation > 15%). Falsifikasi terjadi.",
        "Feedback Loop 1: Hipotesis dimutakhirkan dengan menambahkan modul wavelet adaptif yang memisahkan koefisien frekuensi tinggi pada koordinat tepi.",
        "Iterasi 2 (Model Hybrid Wavelet): Prediksi: rasio kompresi 8:1, PSNR > 40 dB, dan degradasi tepi < 5%. Hasil eksperimen pada 50 citra satelit: degradasi tepi terukur 3.8 +/- 0.4%, PSNR 42.1 dB. Model lolos uji falsifikasi."
      ],
      "resultInterpretation": "Siklus berhasil memutakhirkan model dari kegagalan awal menuju solusi yang terkoroborasi secara empiris."
    },
    "commonPitfalls": [
      "Menghentikan siklus pada iterasi pertama tanpa melakukan uji ketahanan di bawah kondisi batas yang bervariasi.",
      "Memperlakukan siklus sebagai proses linier tanpa pernah bersedia merevisi asumsi dasar model saat eksperimen gagal."
    ],
    "validationProcedures": [
      "Pemeriksaan logbook iterasi: Catat setiap perubahan parameter model beserta bukti data yang memicu perubahan tersebut."
    ],
    "exercises": [
      {
        "question": "Kapan seorang peneliti rekayasa harus memutuskan untuk menghentikan iterasi siklus pemutakhiran model dan mempublikasikan hasilnya?",
        "hint": "Perhatikan pencapaian tujuan penelitian spesifik dan prinsip diminishing returns.",
        "answerExplanation": "Siklus dihentikan saat kriteria keberhasilan yang ditetapkan pada proposal telah terpenuhi secara statistically significant, model telah teruji kebal terhadap falsifikasi pada domain yang ditargetkan, dan modifikasi lebih lanjut hanya menghasilkan perbaikan marjinal yang tidak sebanding dengan kompleksitas komputasi."
      }
    ],
    "references": [
      {
        "citation": "Box, G. E., Hunter, J. S., & Hunter, W. G. (2005). Statistics for Experimenters (2nd ed.). Wiley.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Siklus Investigasi Ilmiah Hipotetiko-Deduktif",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 1.1.4.",
          "Capaian: Menguraikan tahapan siklus investigasi hipotetiko-deduktif dari observasi ke falsifikasi.",
          "Capaian: Menerapkan perulangan umpan balik eksperimental untuk memutakhirkan model matematika.",
          "Capaian: Mengidentifikasi titik henti siklus riset rekayasa berbasis kriteria konvergensi teknis."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{M}_{t+1} = \\mathcal{U}(\\mathbf{M}_t, \\mathcal{D}_t, \\mathcal{L})$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Siklus Investigasi Ilmiah Hipotetiko-Deduktif",
        "bulletPoints": [
          "Metode ilmiah modern beroperasi sebagai siklus iteratif berkelanjutan yang dikenal sebagai siklus hipotetiko-deduktif (*hypot...",
          "Siklus ini terdiri dari enam tahapan yang saling mengunci: 1. **Observasi Awal & Eksplorasi Fenomena:** Menemukan inkonsisten...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ]
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Metode ilmiah modern beroperasi sebagai siklus iteratif berkelanjutan yang dikenal sebagai siklus hipotetiko-deduktif (*hypot...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Formalisasi siklus iteratif pemutakhiran model:",
          "di mana:",
          "- $\\mathbf{M}_t$: Status model teoretis pada iterasi ke-$t$."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{M}_{t+1} = \\mathcal{U}(\\mathbf{M}_t, \\mathcal{D}_t, \\mathcal{L})$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Tunjukkan bagaimana siklus hipotetiko-deduktif diterapkan dalam pengembangan algoritma kompresi citra satelit tanpa kehilangan informasi tep...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Iterasi 1 (Model Linier Standar): Model awal mengasumsikan transformasi kosinus diskrit (DCT) standar cukup. P...",
          "Feedback Loop 1: Hipotesis dimutakhirkan dengan menambahkan modul wavelet adaptif yang memisahkan koefisien fr...",
          "Iterasi 2 (Model Hybrid Wavelet): Prediksi: rasio kompresi 8:1, PSNR > 40 dB, dan degradasi tepi < 5%. Hasil e...",
          "Interpretasi: Siklus berhasil memutakhirkan model dari kegagalan awal menuju solusi yang terkoroborasi secara empiris."
        ],
        "keyFormulaOrDiagram": "Iterasi 2 (Model Hybrid Wavelet): Prediksi: rasio kompresi 8:1, PSNR > 40 dB, dan degradas..."
      },
      {
        "slideNumber": 7,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menghentikan siklus pada iterasi pertama tanpa melakukan uji ketahanan di bawah kondisi batas yang bervariasi.",
          "Perangkap: Memperlakukan siklus sebagai proses linier tanpa pernah bersedia merevisi asumsi dasar model saat eksperimen g..."
        ]
      },
      {
        "slideNumber": 8,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Pemeriksaan logbook iterasi: Catat setiap perubahan parameter model beserta bukti data yang memicu perubahan t..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Kapan seorang peneliti rekayasa harus memutuskan untuk menghentikan iterasi siklus pemutakhiran model dan mempublikasika...",
          "Petunjuk: Perhatikan pencapaian tujuan penelitian spesifik dan prinsip diminishing returns.",
          "Solusi Kunci: Siklus dihentikan saat kriteria keberhasilan yang ditetapkan pada proposal telah terpenuhi secara statistically signific..."
        ]
      }
    ]
  }
};
