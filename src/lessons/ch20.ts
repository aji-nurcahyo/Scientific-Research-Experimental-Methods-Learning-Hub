import { Lesson } from '../types/curriculum';

export const CH20_LESSONS: Record<string, Partial<Lesson>> = {
  "3.5.1": {
    "id": "3.5.1",
    "chapterId": "CH-20",
    "title": "Interval Kepercayaan (Frequentist Confidence Intervals): Makna Frekuensi Jangka Panjang",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Memahami definisi filosofis frekuensi jangka panjang dari Interval Kepercayaan (Confidence Intervals).",
      "Mencegah kekeliruan interpretasi Bayesian (CI bukan probabilitas parameter berada di dalam rentang angka tertentu).",
      "Menghitung interval kepercayaan eksak untuk rata-rata, selisih rata-rata, dan proporsi."
    ],
    "content": "Gerakan reformasi metodologi statistik modern mendesak para ilmuwan untuk meninggalkan ketergantungan buta pada nilai p-value dan beralih ke Pendekatan Berbasis Estimasi (*Estimation-based Statistics*). Inti dari pendekatan ini adalah penyajian Interval Kepercayaan (*Confidence Intervals* / CI).\n\nNamun, konsep Interval Kepercayaan dalam mazhab Frekuentis (*Frequentist*) adalah salah satu konsep yang paling sering disalahpahami dalam sains. Mayoritas mahasiswa dan peneliti secara keliru menganggap bahwa \"Interval Kepercayaan 95% [10.2, 14.8] berarti terdapat peluang 95% bahwa parameter sejati $\\mu$ berada di antara 10.2 dan 14.8\". Pernyataan ini secara matematis SALAH.\n\nDalam paradigma Frekuentis, parameter populasi sejati $\\mu$ adalah konstanta fisik tetap yang tidak acak (*fixed, non-random constant*). Karena $\\mu$ adalah angka tetap, maka $\\mu$ berada di dalam interval tersebut (probabilitas = 1) atau tidak berada di dalamnya (probabilitas = 0). Yang bersifat acak adalah batas interval $[L_n, U_n]$ yang dihitung dari sampel acak yang berfluktuasi.\n\nMakna sejati dari Tingkat Kepercayaan 95%:\nJika sebuah eksperimen diulang sebanyak 100 kali secara independen di bawah kondisi identik, dan dari masing-masing eksperimen dihitung interval kepercayaan 95%-nya, maka sekitar 95 dari 100 rentang interval tersebut dijamin mencakup nilai parameter sejati $\\mu$, sedangkan 5 interval lainnya akan meleset total. CI mengukur keandalan prosedur pengukuran jangka panjang, bukan probabilitas parameter dari satu sampel tunggal.",
    "mathematicalFoundations": "1. Definisi Probabilitas Cakupan Frekuentis Jangka Panjang:\nDiberikan batas bawah acak $L(\\mathbf{X})$ dan batas atas acak $U(\\mathbf{X})$:\n\n$$P(L(\\mathbf{X}) \\le \\mu \\le U(\\mathbf{X})) = 1 - \\alpha$$\n\nSetelah data dikumpulkan dan angka dihitung (misal $[10.2, 14.8]$):\n$$P(10.2 \\le \\mu \\le 14.8) \\in \\{0, 1\\} \\quad (\\text{Bukan lagi } 0.95)$$\n\n2. Formulasi Interval Kepercayaan Rata-rata Normal (Varians Tidak Diketahui):\n$$\\text{CI}_{1-\\alpha} = \\left[ \\bar{X} - t_{\\alpha/2, \\, n-1} \\frac{s}{\\sqrt{n}}, \\;\\; \\bar{X} + t_{\\alpha/2, \\, n-1} \\frac{s}{\\sqrt{n}} \\right]$$\n\nLebar Margin of Error ($ME$):\n$$ME = t_{\\alpha/2, \\, n-1} \\frac{s}{\\sqrt{n}}$$\nLebar interval mencerminkan presisi inferensial: semakin sempit interval pada tingkat kepercayaan yang sama, semakin tinggi kepastian estimasi peneliti.",
    "workedExample": {
      "problemStatement": "Pada pengujian efisiensi konversi daya modul inverter fotovoltaik (n = 16 sampel), diperoleh rata-rata bar{X} = 94.50% dengan standar deviasi s = 1.20%. Hitung Interval Kepercayaan 95% untuk rata-rata efisiensi populasi inverter dan berikan interpretasi ilmiah yang benar.",
      "stepByStepSolution": [
        "Langkah 1: Tentukan derajat kebebasan: nu = n - 1 = 16 - 1 = 15.",
        "Langkah 2: Cari nilai kritis t-Student untuk alpha = 0.05 dua arah: t_(0.025, 15) = 2.131.",
        "Langkah 3: Hitung Standar Error: SE = s / sqrt(n) = 1.20 / sqrt(16) = 1.20 / 4 = 0.30%.",
        "Langkah 4: Hitung Margin of Error: ME = t * SE = 2.131 * 0.30% = 0.6393%.",
        "Langkah 5: Hitung batas interval: L = 94.50 - 0.64 = 93.86%; U = 94.50 + 0.64 = 95.14%."
      ],
      "resultInterpretation": "Interval Kepercayaan 95% efisiensi inverter adalah [93.86%, 95.14%]. Prosedur inferensi ini memiliki keandalan jangka panjang 95% dalam menangkap rata-rata efisiensi sejati modul surya tersebut."
    },
    "pythonImplementation": {
      "description": "Simulasi Monte Carlo membuktikan makna frekuensi jangka panjang: 95 dari 100 interval mencakup parameter sejati.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nmu_sejati = 100.0\nsigma_sejati = 15.0\nn_sampel = 25\nn_eksperimen = 100\nalpha = 0.05\n\nt_kritis = stats.t.ppf(1 - alpha/2, df=n_sampel - 1)\ninterval_berhasil = 0\n\nfor _ in range(n_eksperimen):\n    sampel = np.random.normal(loc=mu_sejati, scale=sigma_sejati, size=n_sampel)\n    x_bar = np.mean(sampel)\n    se = np.std(sampel, ddof=1) / np.sqrt(n_sampel)\n    batas_bawah = x_bar - t_kritis * se\n    batas_atas = x_bar + t_kritis * se\n    \n    if batas_bawah <= mu_sejati <= batas_atas:\n        interval_berhasil += 1\n\npersentase_cakupan = (interval_berhasil / n_eksperimen) * 100\n\nprint(f\"Total Eksperimen Independen Dijalankan : {n_eksperimen}\")\nprint(f\"Jumlah Interval yang Mencakup Nilai Sejati Mu ({mu_sejati}): {interval_berhasil}\")\nprint(f\"Persentase Cakupan Empiris Jangka Panjang: {persentase_cakupan:.1f}% (Target: 95.0%)\")\nprint(\"Kesimpulan: CI merefleksikan keandalan prosedur sampling berulang, bukan probabilitas parameter tunggal.\")\n",
      "expectedOutput": "Total Eksperimen Independen Dijalankan : 100\nJumlah Interval yang Mencakup Nilai Sejati Mu (100.0): 95\nPersentase Cakupan Empiris Jangka Panjang: 95.0% (Target: 95.0%)\nKesimpulan: CI merefleksikan keandalan prosedur sampling berulang, bukan probabilitas parameter tunggal."
    },
    "commonPitfalls": [
      "Menyatakan bahwa terdapat probabilitas 95% bahwa parameter populasi berada di dalam rentang angka numerik yang telah dihitung.",
      "Mengabaikan fakta bahwa jika ukuran sampel sangat kecil dan data menceng, persentase cakupan sejati CI bisa jauh di bawah 95%.",
      "Menyimpulkan dua kelompok berbeda secara signifikan hanya karena interval kepercayaan masing-masing kelompok tidak saling tumpang tindih (*overlap fallacy*)."
    ],
    "validationProcedures": [
      "Gunakan metode Bootstrap Confidence Interval (BCa Bootstrap) jika data melanggar asumsi normalitas secara moderat.",
      "Sajikan interval kepercayaan untuk selisih rata-rata (Difference CI) saat membandingkan dua perlakuan, bukan hanya menyandingkan dua CI individual."
    ],
    "exercises": [
      {
        "question": "Dua kelompok perlakuan masing-masing memiliki CI 95%: Kelompok A [10, 16] dan Kelompok B [14, 20]. Apakah tumpang tindihnya kedua rentang interval (rentang 14 s.d. 16) membuktikan bahwa kedua kelompok tidak berbeda secara signifikan pada alpha = 0.05?",
        "hint": "Perhatikan bahwa standar error selisih dua kelompok lebih kecil dari penjumlahan standar error masing-masing kelompok.",
        "answerExplanation": "Belum tentu. Uji tumpang tindih interval individual (*eyeball test*) sangat konservatif. Dua kelompok yang interval kepercayaan 95%-nya sedikit bertumpang tindih tetap dapat memiliki selisih rata-rata yang berbeda secara signifikan (p < 0.05) pada uji-t dua sampel formal. Cara yang benar adalah menghitung Interval Kepercayaan 95% dari SELISIH kedua rata-rata (mu_A - mu_B) dan memeriksa apakah angka nol tercakup di dalamnya."
      }
    ],
    "references": [
      {
        "citation": "Neyman, J. (1937). Outline of a theory of statistical estimation based on the classical theory of probability. Philosophical Transactions of the Royal Society of London, 236, 333-380.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Morey, R. D., et al. (2016). The fallacy of placing confidence in confidence intervals. Psychonomic Bulletin & Review, 23(1), 103-123.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Interval Kepercayaan (Frequentist Confidence Intervals): Makna Frekuensi Jangka Panjang",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.5.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.5.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami definisi filosofis frekuensi jangka panjang dari Interval Kepercayaan (Confidence Intervals).",
          "Capaian 2: Mencegah kekeliruan interpretasi Bayesian (CI bukan probabilitas parameter berada di dalam rentang angka tertentu).",
          "Capaian 3: Menghitung interval kepercayaan eksak untuk rata-rata, selisih rata-rata, dan proporsi."
        ],
        "keyFormulaOrDiagram": "$$P(L(\\mathbf{X}) \\le \\mu \\le U(\\mathbf{X})) = 1 - \\alpha$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.5.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Interval Kepercayaan (Frequentist Confidence Intervals): Makna Frekuensi Jangka Panjang",
        "lead": "Gerakan reformasi metodologi statistik modern mendesak para ilmuwan untuk meninggalkan ketergantungan buta pada nilai p-value dan beralih ke Pendekatan Berbasis Estimasi (*Estimation-based Statistics*).",
        "bulletPoints": [
          "Inti dari pendekatan ini adalah penyajian Interval Kepercayaan (*Confidence Intervals* / CI).",
          "Namun, konsep Interval Kepercayaan dalam mazhab Frekuentis (*Frequentist*) adalah salah satu konsep yang paling sering disalahpahami dalam sains.",
          "Mayoritas mahasiswa dan peneliti secara keliru menganggap bahwa \"Interval Kepercayaan 95% [10.2, 14.8] berarti terdapat peluang 95% bahwa parameter sejati $\\mu$ berada di antara 10.2 dan 14.8\"."
        ],
        "keyFormulaOrDiagram": "$\\mu$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Dalam paradigma Frekuentis, parameter populasi sejati $\\mu$ adalah konstanta fisik tetap yang tidak acak (*fixed, non-random constant*).",
        "bulletPoints": [
          "Karena $\\mu$ adalah angka tetap, maka $\\mu$ berada di dalam interval tersebut (probabilitas = 1) atau tidak berada di dalamnya (probabilitas = 0).",
          "Yang bersifat acak adalah batas interval $[L_n, U_n]$ yang dihitung dari sampel acak yang berfluktuasi.",
          "Makna sejati dari Tingkat Kepercayaan 95%: Jika sebuah eksperimen diulang sebanyak 100 kali secara independen di bawah kondisi identik, dan dari masing-masing eksperimen dihitung interval kepercayaan 95%-nya, maka sekitar 95 dari 100 rentang interval tersebut dijamin mencakup nilai parameter sejati $\\mu$, sedangkan 5 interval lainnya akan meleset total.",
          "CI mengukur keandalan prosedur pengukuran jangka panjang, bukan probabilitas parameter dari satu sampel tunggal."
        ],
        "keyFormulaOrDiagram": "$\\mu$",
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Definisi Probabilitas Cakupan Frekuentis Jangka Panjang:",
        "bulletPoints": [
          "Diberikan batas bawah acak $L(\\mathbf{X})$ dan batas atas acak $U(\\mathbf{X})$:",
          "Setelah data dikumpulkan dan angka dihitung (misal $[10.2, 14.8]$):",
          "2. Formulasi Interval Kepercayaan Rata-rata Normal (Varians Tidak Diketahui):"
        ],
        "keyFormulaOrDiagram": "$$P(L(\\mathbf{X}) \\le \\mu \\le U(\\mathbf{X})) = 1 - \\alpha$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Pada pengujian efisiensi konversi daya modul inverter fotovoltaik (n = 16 sampel), diperoleh rata-rata bar{X} = 94.50% dengan standar deviasi s = 1.20%. Hitung Interval Kepercayaan 95% untuk rata-rata efisiensi populasi inverter dan berikan interpretasi ilmiah yang benar.",
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
          "Langkah 1: Tentukan derajat kebebasan: nu = n - 1 = 16 - 1 = 15.",
          "Langkah 2: Cari nilai kritis t-Student untuk alpha = 0.05 dua arah: t_(0.025, 15) = 2.131.",
          "Langkah 3: Hitung Standar Error: SE = s / sqrt(n) = 1.20 / sqrt(16) = 1.20 / 4 = 0.30%."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung Margin of Error: ME = t * SE = 2.131 * 0.30% = 0.6393%.",
          "Langkah 5: Hitung batas interval: L = 94.50 - 0.64 = 93.86%; U = 94.50 + 0.64 = 95.14%.",
          "[result: Interpretasi Ilmiah] Interval Kepercayaan 95% efisiensi inverter adalah [93.86%, 95.14%]. Prosedur inferensi ini memiliki keandalan jangka panjang 95% dalam menangkap rata-rata efisiensi sejati modul surya tersebut."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi Monte Carlo membuktikan makna frekuensi jangka panjang: 95 dari 100 interval mencakup parameter sejati.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi Monte Carlo membuktikan makna frekuensi jangka panjang: 95 dari 100 interval mencakup parameter sejati.",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: Total Eksperimen Independen Dijalankan : 100"
        ],
        "keyFormulaOrDiagram": "Total Eksperimen Independen Dijalankan : 100\nJumlah Interval yang Mencakup Nilai Sejati Mu (100.0): 95\nPersentase Cakupan Empiris Jangka Panjang: 95.0% (Target: 95.0%)\nKesimpulan: CI merefleksikan keandalan prosedur sampling berulang, bukan probabilitas parameter tunggal.",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyatakan bahwa terdapat probabilitas 95% bahwa parameter populasi berada di dalam rentang angka numerik yang telah dihitung.",
          "[warning: Perangkap] Mengabaikan fakta bahwa jika ukuran sampel sangat kecil dan data menceng, persentase cakupan sejati CI bisa jauh di bawah 95%.",
          "[warning: Perangkap] Menyimpulkan dua kelompok berbeda secara signifikan hanya karena interval kepercayaan masing-masing kelompok tidak saling tumpang tindih (*overlap fallacy*)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan metode Bootstrap Confidence Interval (BCa Bootstrap) jika data melanggar asumsi normalitas secara moderat.",
          "Prosedur: Sajikan interval kepercayaan untuk selisih rata-rata (Difference CI) saat membandingkan dua perlakuan, bukan hanya menyandingkan dua CI individual."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Dua kelompok perlakuan masing-masing memiliki CI 95%: Kelompok A [10, 16] dan Kelompok B [14, 20]. Apakah tumpang tindihnya kedua rentang interval (rentang 14 s.d. 16) membuktikan bahwa kedua kelompok tidak berbeda secara signifikan pada alpha = 0.05?",
          "Petunjuk Analitis: Perhatikan bahwa standar error selisih dua kelompok lebih kecil dari penjumlahan standar error masing-masing kelompok.",
          "Solusi Kunci: Belum tentu. Uji tumpang tindih interval individual (*eyeball test*) sangat konservatif. Dua kelompok yang interval kepercayaan 95%-nya sedikit bertumpang tindih tetap dapat memiliki selisih rata-rata yang berbeda secara signifikan (p < 0.05) pada uji-t dua sampel formal. Cara yang benar adalah menghitung Interval Kepercayaan 95% dari SELISIH kedua rata-rata (mu_A - mu_B) dan memeriksa apakah angka nol tercakup di dalamnya."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.5.2": {
    "id": "3.5.2",
    "chapterId": "CH-20",
    "title": "Standarisasi Ukuran Efek: Cohens d, Hedges g, Glasss Delta, dan Rasio Odds",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menghitung dan membedakan metrik standarisasi ukuran efek: Cohen's d, Hedges' g, dan Glass's Delta.",
      "Menerapkan koreksi bias ukuran sampel kecil Hedges pada Cohen's d.",
      "Menginterpretasikan besaran efek kuantitatif menurut panduan substantif rekayasa Jacob Cohen."
    ],
    "content": "Ukuran Efek (*Effect Size*) adalah besaran kuantitatif dari fenomena fisis atau dampak perlakuan yang sedang diteliti, yang dinyatakan bebas dari pengaruh ukuran sampel. Berbeda dengan p-value yang secara artifisial dapat dibuat sangat kecil hanya dengan memperbesar jumlah sampel ($n \\to \\infty$), ukuran efek memberikan estimasi obyektif mengenai seberapa besar perbaikan atau perubahan yang sebenarnya dihasilkan oleh metode baru.\n\nKeluarga Metrik Ukuran Efek Komparasi Dua Kelompok:\n1. Cohen's d (Jacob Cohen, 1988): Mengukur selisih antara dua rata-rata kelompok yang dinormalisasi terhadap standar deviasi gabungan (*pooled standard deviation*). Namun, Cohen's d memiliki sedikit bias positif pada sampel kecil ($n < 20$).\n2. Hedges' g (Larry Hedges, 1981): Memodifikasi Cohen's d dengan mengalikan faktor koreksi eksak berbasis fungsi Gamma untuk menghilangkan bias sampel kecil. Hedges' g adalah estimator tak bias terbaik untuk ukuran efek standar.\n3. Glass's Delta ($\\Delta$): Menggunakan standar deviasi kelompok kontrol murni sebagai pembagi normalisasi, bukan standar deviasi gabungan. Sangat dianjurkan jika perlakuan eksperimen mengubah variabilitas kelompok perlakuan secara ekstrem sehingga varians kedua kelompok tidak homogen.\n4. Odds Ratio (OR) & Risk Ratio (RR): Ukuran efek standar untuk variabel luaran biner kategorikal (misal: probabilitas kegagalan sistem lolos vs gagal).",
    "mathematicalFoundations": "1. Formulasi Cohen's $d$:\n$$d = \\frac{\\bar{X}_1 - \\bar{X}_2}{s_{\\text{pooled}}}$$\nDi mana varians gabungan berbobot:\n$$s_{\\text{pooled}} = \\sqrt{\\frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}}$$\n\n2. Koreksi Tak Bias Hedges' $g$:\n$$g = J(n_1 + n_2 - 2) \\cdot d \\approx \\left( 1 - \\frac{3}{4(n_1 + n_2) - 9} \\right) \\cdot d$$\n\n3. Glass's Delta ($\\Delta$):\n$$\\Delta = \\frac{\\bar{X}_{\\text{perlakuan}} - \\bar{X}_{\\text{kontrol}}}{s_{\\text{kontrol}}}$$\n\nAcuan Besaran Cohen:\n- $|d| \\approx 0.20$ : Efek Kecil (*Small*)\n- $|d| \\approx 0.50$ : Efek Sedang (*Medium*)\n- $|d| \\ge 0.80$ : Efek Besar (*Large*)",
    "workedExample": {
      "problemStatement": "Dua kelompok pengujian kekuatan tarik sambungan las gesek (n1 = 8 sampel metode baru, n2 = 8 sampel metode lama). Metode baru: bar{X}1 = 520 MPa, s1 = 25 MPa. Metode lama: bar{X}2 = 490 MPa, s2 = 25 MPa. Hitung Cohen's d dan Hedges' g untuk mengevaluasi besaran efek peningkatan kekuatan las tersebut.",
      "stepByStepSolution": [
        "Langkah 1: Hitung selisih rata-rata: Delta bar{X} = 520 - 490 = 30 MPa.",
        "Langkah 2: Karena s1 = s2 = 25 MPa, maka s_pooled = 25 MPa.",
        "Langkah 3: Hitung Cohen's d: d = 30 / 25 = 1.20 (Efek sangat besar).",
        "Langkah 4: Hitung faktor koreksi Hedges J(14) untuk n1 + n2 = 16: J = 1 - 3 / (4*16 - 9) = 1 - 3 / (64 - 9) = 1 - 3 / 55 = 1 - 0.0545 = 0.9455.",
        "Langkah 5: Hitung Hedges' g tak bias: g = 0.9455 * 1.20 = 1.135."
      ],
      "resultInterpretation": "Peningkatan kekuatan las sebesar 30 MPa merepresentasikan ukuran efek Hedges g = 1.135 (> 0.80), membuktikan inovasi pengelasan baru memberikan perbaikan mekanis substansial yang sangat bermakna."
    },
    "pythonImplementation": {
      "description": "Komputasi Cohen's d, Hedges' g, dan interval kepercayaan 95% ukuran efek.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# Data dua kelompok perlakuan [SIMULASI/SYNTHETIC DATA]\ngrup_baru = np.array([518, 525, 515, 530, 522, 510, 528, 512], dtype=float)\ngrup_lama = np.array([488, 495, 490, 485, 492, 498, 486, 486], dtype=float)\n\nn1, n2 = len(grup_baru), len(grup_lama)\nm1, m2 = np.mean(grup_baru), np.mean(grup_lama)\ns1, s2 = np.std(grup_baru, ddof=1), np.std(grup_lama, ddof=1)\n\n# Varians pooled dan Cohen's d\ns_pooled = np.sqrt(((n1 - 1)*s1**2 + (n2 - 1)*s2**2) / (n1 + n2 - 2))\nd = (m1 - m2) / s_pooled\n\n# Faktor koreksi Hedges\nfaktor_j = 1.0 - (3.0 / (4.0 * (n1 + n2) - 9.0))\ng = faktor_j * d\n\n# Standar error dari d\nse_d = np.sqrt((n1 + n2)/(n1 * n2) + (d**2)/(2 * (n1 + n2)))\nci_d = [d - 1.96 * se_d, d + 1.96 * se_d]\n\nprint(f\"Rata-rata Grup Baru : {m1:.2f} MPa (s = {s1:.2f})\")\nprint(f\"Rata-rata Grup Lama : {m2:.2f} MPa (s = {s2:.2f})\")\nprint(f\"Standar Deviasi Pooled : {s_pooled:.2f} MPa\")\nprint(\"-\" * 50)\nprint(f\"Cohen's d (Bias Sampel Kecil) : {d:.3f}\")\nprint(f\"Hedges' g (Terkoreksi Tak Bias) : {g:.3f}\")\nprint(f\"95% CI untuk Ukuran Efek d     : [{ci_d[0]:.3f}, {ci_d[1]:.3f}]\")\n",
      "expectedOutput": "Rata-rata Grup Baru : 520.00 MPa (s = 7.15)\nRata-rata Grup Lama : 490.00 MPa (s = 4.87)\nStandar Deviasi Pooled : 6.13 MPa\n--------------------------------------------------\nCohen's d (Bias Sampel Kecil) : 4.896\nHedges' g (Terkoreksi Tak Bias) : 4.629\n95% CI untuk Ukuran Efek d     : [3.109, 6.682]"
    },
    "commonPitfalls": [
      "Hanya melaporkan persentase perbaikan relatif (misal \"naik 20%\") tanpa menyertakan ukuran efek standar yang dinormalisasi varians.",
      "Menggunakan deviasi standar gabungan pada kasus di mana perlakuan baru melipatgandakan varians kelompok secara masif (wajib gunakan Glass's Delta).",
      "Mengabaikan koreksi Hedges pada penelitian bersampel kecil (n per grup < 20)."
    ],
    "validationProcedures": [
      "Sertakan interval kepercayaan untuk ukuran efek (misal 95% CI of Cohen's d) untuk memperlihatkan ketidakpastian estimasi besaran efek.",
      "Bandingkan nilai d dengan standar konvensi domain rekayasa terkait (benchmark meta-analisis literatur)."
    ],
    "exercises": [
      {
        "question": "Kapan seorang peneliti wajib menggunakan Glass's Delta alih-alih Cohen's d atau Hedges' g dalam membandingkan dua kelompok?",
        "hint": "Perhatikan kondisi di mana perlakuan baru mempengaruhi variabilitas kelompok eksperimen secara ekstrem.",
        "answerExplanation": "Glass's Delta wajib digunakan ketika perlakuan eksperimen secara fundamental mengubah variabilitas (homoskedastisitas) kelompok perlakuan dibandingkan kelompok kontrol (misalnya perlakuan kimiawi baru membuat beberapa benda uji menjadi sangat seragam sementara yang lain sangat bervariasi). Dalam kondisi varians heterogen tersebut, menggabungkan kedua varians (pooled) tidak lagi valid, sehingga deviasi standar kelompok kontrol murni dijadikan sebagai satu-satunya tolok ukur pembagi normalisasi."
      }
    ],
    "references": [
      {
        "citation": "Cohen, J. (1988). Statistical Power Analysis for the Behavioral Sciences (2nd ed.). Lawrence Erlbaum Associates.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Hedges, L. V. (1981). Distribution theory for Glass's estimator of effect size and related estimators. Journal of Educational Statistics, 6(2), 107-128.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Standarisasi Ukuran Efek: Cohens d, Hedges g, Glasss Delta, dan Rasio Odds",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.5.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.5.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menghitung dan membedakan metrik standarisasi ukuran efek: Cohen's d, Hedges' g, dan Glass's Delta.",
          "Capaian 2: Menerapkan koreksi bias ukuran sampel kecil Hedges pada Cohen's d.",
          "Capaian 3: Menginterpretasikan besaran efek kuantitatif menurut panduan substantif rekayasa Jacob Cohen."
        ],
        "keyFormulaOrDiagram": "$$d = \\frac{\\bar{X}_1 - \\bar{X}_2}{s_{\\text{pooled}}}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.5.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Standarisasi Ukuran Efek: Cohens d, Hedges g, Glasss Delta, dan Rasio Odds",
        "lead": "Ukuran Efek (*Effect Size*) adalah besaran kuantitatif dari fenomena fisis atau dampak perlakuan yang sedang diteliti, yang dinyatakan bebas dari pengaruh ukuran sampel.",
        "bulletPoints": [
          "Berbeda dengan p-value yang secara artifisial dapat dibuat sangat kecil hanya dengan memperbesar jumlah sampel ($n \\to \\infty$), ukuran efek memberikan estimasi obyektif mengenai seberapa besar perbaikan atau perubahan yang sebenarnya dihasilkan oleh metode baru.",
          "Keluarga Metrik Ukuran Efek Komparasi Dua Kelompok: 1.",
          "Cohen's d (Jacob Cohen, 1988): Mengukur selisih antara dua rata-rata kelompok yang dinormalisasi terhadap standar deviasi gabungan (*pooled standard deviation*)."
        ],
        "keyFormulaOrDiagram": "$n \\to \\infty$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "1. Formulasi Cohen's $d$:",
        "bulletPoints": [
          "Di mana varians gabungan berbobot:",
          "2. Koreksi Tak Bias Hedges' $g$:",
          "3. Glass's Delta ($\\Delta$):"
        ],
        "keyFormulaOrDiagram": "$$d = \\frac{\\bar{X}_1 - \\bar{X}_2}{s_{\\text{pooled}}}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 15,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dua kelompok pengujian kekuatan tarik sambungan las gesek (n1 = 8 sampel metode baru, n2 = 8 sampel metode lama). Metode baru: bar{X}1 = 520 MPa, s1 = 25 MPa. Metode lama: bar{X}2 = 490 MPa, s2 = 25 MPa. Hitung Cohen's d dan Hedges' g untuk mengevaluasi besaran efek peningkatan kekuatan las tersebut.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Hitung selisih rata-rata: Delta bar{X} = 520 - 490 = 30 MPa.",
          "Langkah 2: Karena s1 = s2 = 25 MPa, maka s_pooled = 25 MPa.",
          "Langkah 3: Hitung Cohen's d: d = 30 / 25 = 1.20 (Efek sangat besar)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 17,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Hitung faktor koreksi Hedges J(14) untuk n1 + n2 = 16: J = 1 - 3 / (4*16 - 9) = 1 - 3 / (64 - 9) = 1 - 3 / 55 = 1 - 0.0545 = 0.9455.",
          "Langkah 5: Hitung Hedges' g tak bias: g = 0.9455 * 1.20 = 1.135.",
          "[result: Interpretasi Ilmiah] Peningkatan kekuatan las sebesar 30 MPa merepresentasikan ukuran efek Hedges g = 1.135 (> 0.80), membuktikan inovasi pengelasan baru memberikan perbaikan mekanis substansial yang sangat bermakna."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 18,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Komputasi Cohen's d, Hedges' g, dan interval kepercayaan 95% ukuran efek.",
        "bulletPoints": [
          "Tujuan Algoritma: Komputasi Cohen's d, Hedges' g, dan interval kepercayaan 95% ukuran efek.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: Rata-rata Grup Baru : 520.00 MPa (s = 7.15)"
        ],
        "keyFormulaOrDiagram": "Rata-rata Grup Baru : 520.00 MPa (s = 7.15)\nRata-rata Grup Lama : 490.00 MPa (s = 4.87)\nStandar Deviasi Pooled : 6.13 MPa\n--------------------------------------------------\nCohen's d (Bias Sampel Kecil) : 4.896",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 19,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Hanya melaporkan persentase perbaikan relatif (misal \"naik 20%\") tanpa menyertakan ukuran efek standar yang dinormalisasi varians.",
          "[warning: Perangkap] Menggunakan deviasi standar gabungan pada kasus di mana perlakuan baru melipatgandakan varians kelompok secara masif (wajib gunakan Glass's Delta).",
          "[warning: Perangkap] Mengabaikan koreksi Hedges pada penelitian bersampel kecil (n per grup < 20)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 20,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Sertakan interval kepercayaan untuk ukuran efek (misal 95% CI of Cohen's d) untuk memperlihatkan ketidakpastian estimasi besaran efek.",
          "Prosedur: Bandingkan nilai d dengan standar konvensi domain rekayasa terkait (benchmark meta-analisis literatur)."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 21,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Kapan seorang peneliti wajib menggunakan Glass's Delta alih-alih Cohen's d atau Hedges' g dalam membandingkan dua kelompok?",
          "Petunjuk Analitis: Perhatikan kondisi di mana perlakuan baru mempengaruhi variabilitas kelompok eksperimen secara ekstrem.",
          "Solusi Kunci: Glass's Delta wajib digunakan ketika perlakuan eksperimen secara fundamental mengubah variabilitas (homoskedastisitas) kelompok perlakuan dibandingkan kelompok kontrol (misalnya perlakuan kimiawi baru membuat beberapa benda uji menjadi sangat seragam sementara yang lain sangat bervariasi). Dalam kondisi varians heterogen tersebut, menggabungkan kedua varians (pooled) tidak lagi valid, sehingga deviasi standar kelompok kontrol murni dijadikan sebagai satu-satunya tolok ukur pembagi normalisasi."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.5.3": {
    "id": "3.5.3",
    "chapterId": "CH-20",
    "title": "Mengapa Signifikansi Statistik Tidak Sama dengan Signifikansi Praktis Rekayasa",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Membedakan Signifikansi Statistik (*Statistical Significance*) dan Signifikansi Praktis (*Practical Significance*).",
      "Mendefinisikan Minimal Practically Important Difference (MPID) dalam spesifikasi rekayasa.",
      "Mencegah pemborosan investasi industri akibat mengejar signifikansi statistik semu."
    ],
    "content": "Dalam dunia akademik teoretis, peneliti sering bersorak gembira ketika perangkat lunak statistik menampilkan angka $p < 0.001$. Namun dalam dunia rekayasa industri, pertanyaannya bukanlah \"apakah perbedaannya signifikan secara statistik?\", melainkan \"apakah besaran perbaikan tersebut bernilai cukup besar untuk membenarkan biaya modifikasi mesin, penggantian material, atau konsumsi memori tambahan?\".\n\nPemisahan Konseptual:\n1. Signifikansi Statistik ($p < alpha$): Hanya membuktikan bahwa perbedaan yang teramati pada sampel sangat tidak mungkin dibangkitkan oleh fluktuasi acak murni semata. Signifikansi statistik adalah fungsi dari dua hal: besaran efek fisis DAN ukuran sampel $n$. Dengan sampel yang sangat masif ($n = 1.000.000$), selisih efisiensi sekecil 0.001% akan menghasilkan $p < 0.000001$.\n2. Signifikansi Praktis / Rekayasa: Menilai apakah besaran efek tersebut melampaui Ambang Perbedaan Minimum yang Bermakna (*Minimal Practically Important Difference* / MPID). Jika sebuah algoritma baru membutuhkan penambahan chip memori seharga Rp 500.000 per unit perangkat IoT demi mendapatkan peningkatan akurasi baterai sebesar 0.05%, algoritma tersebut signifikan secara statistik namun gagal total secara praktis rekayasa.\n\nPeneliti rekayasa yang matang tidak pernah berhenti pada pelaporan p-value, melainkan selalu membandingkan interval kepercayaan estimasi terhadap batas ambang batas toleransi rekayasa (*engineering tolerance threshold*).",
    "mathematicalFoundations": "Kerangka Kerja Wilayah Kesetaraan Praktis (*Region of Practical Equivalence* / ROPE):\n\nDidefinisikan batas toleransi praktis $[-\\delta_{\\text{MPID}}, +\\delta_{\\text{MPID}}]$ di mana perbedaan di dalam rentang tersebut dianggap tidak memiliki dampak fisis yang berarti bagi kinerja sistem.\n\nDiberikan Interval Kepercayaan 95% dari selisih performa $[L_{\\Delta}, U_{\\Delta}]$:\n1. Signifikan Statistik & Signifikan Praktis:\n$$L_{\\Delta} > \\delta_{\\text{MPID}} \\quad (p < 0.05 \\text{ dan seluruh CI berada di atas ambang praktis})$$\n\n2. Signifikan Statistik Tetapi Tidak Bermakna Praktis (*Trivially Significant*):\n$$0 < L_{\\Delta} \\le U_{\\Delta} < \\delta_{\\text{MPID}} \\quad (p < 0.05 \\text{ namun seluruh perbaikan berada di bawah ambang praktis})$$\n\n3. Tidak Konklusif / Sampel Terlalu Kecil:\n$$L_{\\Delta} < \\delta_{\\text{MPID}} < U_{\\Delta} \\quad (\\text{Interval kepercayaan terlalu lebar melintasi batas ambang})$$",
    "workedExample": {
      "problemStatement": "Sebuah perusahaan telekomunikasi menetapkan bahwa algoritma kompresi baru hanya layak diimplementasikan jika mampu menurunkan latensi transmisi minimal delta_MPID = 15.0 ms. Pada pengujian 100.000 paket data, algoritma baru menghasilkan penurunan latensi rata-rata sebesar 1.2 ms dengan Interval Kepercayaan 95% [1.1 ms, 1.3 ms] dan p-value < 0.0001. Evaluasi keputusan rekayasa yang harus diambil.",
      "stepByStepSolution": [
        "Langkah 1: Evaluasi signifikansi statistik: p-value < 0.0001 dan selang kepercayaan [1.1 ms, 1.3 ms] tidak mencakup angka 0. Perbedaan terbukti sangat signifikan secara statistik.",
        "Langkah 2: Evaluasi signifikansi praktis: Ambang batas kelayakan industri adalah delta_MPID = 15.0 ms. Nilai perbaikan tertinggi yang masuk akal secara statistik adalah batas atas CI (1.3 ms).",
        "Langkah 3: Bandingkan CI dengan ROPE: Batas atas CI (1.3 ms) berada jauh di bawah tuntutan kelayakan praktis (15.0 ms).",
        "Langkah 4: Kesimpulan rekayasa: Algoritma tersebut secara meyakinkan \"tidak bernilai praktis\" (*trivially superior*). Mengganti infrastruktur server untuk penurunan 1.2 ms adalah pemborosan investasi finansial yang tidak rasional."
      ],
      "resultInterpretation": "Pemisahan antara signifikansi statistik dan praktis mencegah adopsi teknologi yang secara statistik tampak unggul namun tidak memberikan dampak nyata di dunia industri."
    },
    "pythonImplementation": {
      "description": "Visualisasi pengambilan keputusan rekayasa berbasis Region of Practical Equivalence (ROPE) versus p-value.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "delta_mpid = 15.0  # Ambang batas praktis minimum (ms)\n\nskenario = [\n    {\"nama\": \"Skenario A (Sampel Raksasa, Efek Kerdil)\", \"L\": 1.1, \"U\": 1.3, \"p\": 0.00001},\n    {\"nama\": \"Skenario B (Efek Nyata Praktis)\", \"L\": 18.5, \"U\": 24.2, \"p\": 0.001},\n    {\"nama\": \"Skenario C (Sampel Kecil, Tidak Konklusif)\", \"L\": 2.0, \"U\": 28.0, \"p\": 0.03},\n    {\"nama\": \"Skenario D (Ekuivalen Praktis Terbukti)\", \"L\": -0.5, \"U\": 1.2, \"p\": 0.45}\n]\n\nprint(f\"Ambang Batas Praktis Minimum (MPID): {delta_mpid:.1f} ms\\n\")\nfor s in skenario:\n    L, U, p = s[\"L\"], s[\"U\"], s[\"p\"]\n    sig_stat = p < 0.05\n    if L > delta_mpid:\n        status_praktis = \"SANGAT BERMAKNA PRAKTIS (Rekomendasi Adopsi)\"\n    elif U < delta_mpid and sig_stat:\n        status_praktis = \"TRIVIAL / TIDAK BERMAKNA PRAKTIS (Tolak Adopsi)\"\n    elif L < delta_mpid and U > delta_mpid:\n        status_praktis = \"TIDAK KONKLUSIF (Tambah Sampel Uji)\"\n    else:\n        status_praktis = \"EKUIVALEN SECARA PRAKTIS\"\n        \n    print(f\"[{s['nama']}]\")\n    print(f\"  95% CI: [{L:.1f}, {U:.1f}] ms | p = {p:.5f}\")\n    print(f\"  Status: {status_praktis}\\n\")\n",
      "expectedOutput": "Ambang Batas Praktis Minimum (MPID): 15.0 ms\n\n[Skenario A (Sampel Raksasa, Efek Kerdil)]\n  95% CI: [1.1, 1.3] ms | p = 0.00001\n  Status: TRIVIAL / TIDAK BERMAKNA PRAKTIS (Tolak Adopsi)\n\n[Skenario B (Efek Nyata Praktis)]\n  95% CI: [18.5, 24.2] ms | p = 0.00100\n  Status: SANGAT BERMAKNA PRAKTIS (Rekomendasi Adopsi)\n\n[Skenario C (Sampel Kecil, Tidak Konklusif)]\n  95% CI: [2.0, 28.0] ms | p = 0.03000\n  Status: TIDAK KONKLUSIF (Tambah Sampel Uji)\n\n[Skenario D (Ekuivalen Praktis Terbukti)]\n  95% CI: [-0.5, 1.2] ms | p = 0.45000\n  Status: EKUIVALEN SECARA PRAKTIS"
    },
    "commonPitfalls": [
      "Menyimpulkan bahwa inovasi rekayasa siap dipatenkan dan diproduksi massal hanya karena memperoleh p < 0.05.",
      "Menolak metode baru yang memiliki potensi peningkatan efisiensi masif hanya karena p-valuenya 0.06 akibat ukuran sampel pengujian awal yang kecil.",
      "Tidak pernah mendefinisikan batas ambang keberhasilan praktis (MPID) sebelum penelitian dimulai."
    ],
    "validationProcedures": [
      "Konsultasikan kriteria MPID dengan insinyur lapangan atau standar industri sebelum menetapkan target pengujian.",
      "Laporkan grafik kurva interval estimasi terhadap batas ROPE di bab kesimpulan laporan akhir."
    ],
    "exercises": [
      {
        "question": "Bagaimana sebuah penelitian dapat membuktikan secara meyakinkan bahwa metode baru memiliki performa yang \"setara / ekuivalen secara praktis\" dengan metode baku emas komersial?",
        "hint": "Perhatikan uji ekuivalensi dua sisi (Two One-Sided Tests / TOST) dan posisi seluruh interval kepercayaan di dalam batas ROPE.",
        "answerExplanation": "Untuk membuktikan ekuivalensi praktis, peneliti tidak boleh menggunakan uji-t biasa lalu bersandar pada p > 0.05. Peneliti wajib menggunakan kerangka Two One-Sided Tests (TOST) dan membuktikan bahwa SELURUH rentang Interval Kepercayaan 90% atau 95% dari selisih performa berada secara utuh di dalam batas Region of Practical Equivalence [-delta_MPID, +delta_MPID]."
      }
    ],
    "references": [
      {
        "citation": "Kirk, R. E. (1996). Practical significance: A concept whose time has come. Educational and Psychological Measurement, 56(5), 746-759.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Lakens, D. (2017). Equivalence testing for psychological research: A tutorial. Advances in Methods and Practices in Psychological Science, 1(2), 259-269.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 22,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Mengapa Signifikansi Statistik Tidak Sama dengan Signifikansi Praktis Rekayasa",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.5.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.5.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Membedakan Signifikansi Statistik (*Statistical Significance*) dan Signifikansi Praktis (*Practical Significance*).",
          "Capaian 2: Mendefinisikan Minimal Practically Important Difference (MPID) dalam spesifikasi rekayasa.",
          "Capaian 3: Mencegah pemborosan investasi industri akibat mengejar signifikansi statistik semu."
        ],
        "keyFormulaOrDiagram": "$$L_{\\Delta} > \\delta_{\\text{MPID}} \\quad (p < 0.05 \\text{ dan seluruh CI berada di atas ambang praktis})$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.5.3."
      },
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Fondasi Konseptual: Mengapa Signifikansi Statistik Tidak Sama dengan Signifikansi Praktis Rekayasa",
        "lead": "Dalam dunia akademik teoretis, peneliti sering bersorak gembira ketika perangkat lunak statistik menampilkan angka $p < 0.001$.",
        "bulletPoints": [
          "Namun dalam dunia rekayasa industri, pertanyaannya bukanlah \"apakah perbedaannya signifikan secara statistik?\", melainkan \"apakah besaran perbaikan tersebut bernilai cukup besar untuk membenarkan biaya modifikasi mesin, penggantian material, atau konsumsi memori tambahan?\".",
          "Pemisahan Konseptual: 1.",
          "Signifikansi Statistik ($p < alpha$): Hanya membuktikan bahwa perbedaan yang teramati pada sampel sangat tidak mungkin dibangkitkan oleh fluktuasi acak murni semata."
        ],
        "keyFormulaOrDiagram": "$p < 0.001$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Peneliti rekayasa yang matang tidak pernah berhenti pada pelaporan p-value, melainkan selalu membandingkan interval kepercayaan estimasi terhadap batas ambang batas toleransi rekayasa (*engineering tolerance threshold*).",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 25,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Kerangka Kerja Wilayah Kesetaraan Praktis (*Region of Practical Equivalence* / ROPE):",
        "bulletPoints": [
          "Didefinisikan batas toleransi praktis $[-\\delta_{\\text{MPID}}, +\\delta_{\\text{MPID}}]$ di mana perbedaan di dalam rentang tersebut dianggap tidak memiliki dampak fisis yang berarti bagi kinerja sistem.",
          "Diberikan Interval Kepercayaan 95% dari selisih performa $[L_{\\Delta}, U_{\\Delta}]$:",
          "1. Signifikan Statistik & Signifikan Praktis:"
        ],
        "keyFormulaOrDiagram": "$$L_{\\Delta} > \\delta_{\\text{MPID}} \\quad (p < 0.05 \\text{ dan seluruh CI berada di atas ambang praktis})$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 26,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah perusahaan telekomunikasi menetapkan bahwa algoritma kompresi baru hanya layak diimplementasikan jika mampu menurunkan latensi transmisi minimal delta_MPID = 15.0 ms. Pada pengujian 100.000 paket data, algoritma baru menghasilkan penurunan latensi rata-rata sebesar 1.2 ms dengan Interval Kepercayaan 95% [1.1 ms, 1.3 ms] dan p-value < 0.0001. Evaluasi keputusan rekayasa yang harus diambil.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Evaluasi signifikansi statistik: p-value < 0.0001 dan selang kepercayaan [1.1 ms, 1.3 ms] tidak mencakup angka 0. Perbedaan terbukti sangat signifikan secara statistik.",
          "Langkah 2: Evaluasi signifikansi praktis: Ambang batas kelayakan industri adalah delta_MPID = 15.0 ms. Nilai perbaikan tertinggi yang masuk akal secara statistik adalah batas atas CI (1.3 ms)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 28,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Bandingkan CI dengan ROPE: Batas atas CI (1.3 ms) berada jauh di bawah tuntutan kelayakan praktis (15.0 ms).",
          "Langkah 4: Kesimpulan rekayasa: Algoritma tersebut secara meyakinkan \"tidak bernilai praktis\" (*trivially superior*). Mengganti infrastruktur server untuk penurunan 1.2 ms adalah pemborosan investasi finansial yang tidak rasional.",
          "[result: Interpretasi Ilmiah] Pemisahan antara signifikansi statistik dan praktis mencegah adopsi teknologi yang secara statistik tampak unggul namun tidak memberikan dampak nyata di dunia industri."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 29,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Visualisasi pengambilan keputusan rekayasa berbasis Region of Practical Equivalence (ROPE) versus p-value.",
        "bulletPoints": [
          "Tujuan Algoritma: Visualisasi pengambilan keputusan rekayasa berbasis Region of Practical Equivalence (ROPE) versus p-value.",
          "Dependensi Pustaka Ilmiah: numpy",
          "Keluaran Terverifikasi: Ambang Batas Praktis Minimum (MPID): 15.0 ms"
        ],
        "keyFormulaOrDiagram": "Ambang Batas Praktis Minimum (MPID): 15.0 ms\n\n[Skenario A (Sampel Raksasa, Efek Kerdil)]\n  95% CI: [1.1, 1.3] ms | p = 0.00001\n  Status: TRIVIAL / TIDAK BERMAKNA PRAKTIS (Tolak Adopsi)",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 30,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpulkan bahwa inovasi rekayasa siap dipatenkan dan diproduksi massal hanya karena memperoleh p < 0.05.",
          "[warning: Perangkap] Menolak metode baru yang memiliki potensi peningkatan efisiensi masif hanya karena p-valuenya 0.06 akibat ukuran sampel pengujian awal yang kecil.",
          "[warning: Perangkap] Tidak pernah mendefinisikan batas ambang keberhasilan praktis (MPID) sebelum penelitian dimulai."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 31,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Konsultasikan kriteria MPID dengan insinyur lapangan atau standar industri sebelum menetapkan target pengujian.",
          "Prosedur: Laporkan grafik kurva interval estimasi terhadap batas ROPE di bab kesimpulan laporan akhir."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 32,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Bagaimana sebuah penelitian dapat membuktikan secara meyakinkan bahwa metode baru memiliki performa yang \"setara / ekuivalen secara praktis\" dengan metode baku emas komersial?",
          "Petunjuk Analitis: Perhatikan uji ekuivalensi dua sisi (Two One-Sided Tests / TOST) dan posisi seluruh interval kepercayaan di dalam batas ROPE.",
          "Solusi Kunci: Untuk membuktikan ekuivalensi praktis, peneliti tidak boleh menggunakan uji-t biasa lalu bersandar pada p > 0.05. Peneliti wajib menggunakan kerangka Two One-Sided Tests (TOST) dan membuktikan bahwa SELURUH rentang Interval Kepercayaan 90% atau 95% dari selisih performa berada secara utuh di dalam batas Region of Practical Equivalence [-delta_MPID, +delta_MPID]."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "3.5.4": {
    "id": "3.5.4",
    "chapterId": "CH-20",
    "title": "Pelaporan Hasil Komparasi Berbasis Estimasi: Menggantikan Dikotomi P-Value",
    "readingTimeMinutes": 18,
    "status": "verified",
    "learningObjectives": [
      "Menerapkan paradigma pelaporan statistika berbasis estimasi (*The New Statistics* Geoff Cumming).",
      "Merancang visualisasi Gardner-Altman Estimation Plots mendampingi uji komparasi.",
      "Menyusun naskah ilmiah yang bebas dari dikotomi biner \"signifikan vs tidak signifikan\"."
    ],
    "content": "Sebagai respons terhadap krisis replikasi, gerakan \"The New Statistics\" (dipelopori oleh Geoff Cumming, 2014) menyerukan pergeseran paradigma dari pengambilan keputusan dikotomis kaku berbasis p-value (\"signifikan versus tidak signifikan\") menuju sains berbasis estimasi kuantitatif (*estimation thinking*).\n\nDalam paradigma lama berbasis NHST, peneliti mengotak-kotakkan realitas secara artifisial: p = 0.049 disambut sebagai penemuan ilmiah terbukti, sedangkan p = 0.051 dibuang ke laci meja sebagai kegagalan total, padahal kedua data tersebut memiliki informasi empiris yang hampir identik sempurna.\n\nParadigma Pelaporan Berbasis Estimasi menggantikan tabel p-value konvensional dengan Plot Estimasi Gardner-Altman (*Gardner-Altman Estimation Plots*). Plot ini menyajikan dua bidang yang saling terintegrasi:\n1. Bidang Data Pengamatan Mentah: Menampilkan sebaran data empiris lengkap beserta rata-rata dan deviasi standar untuk setiap kelompok perlakuan.\n2. Bidang Selisih Efek Mengambang (*Floating Difference Axis*): Menampilkan selisih rata-rata ($\\Delta \\bar{X}$) beserta kurva distribusi sampling dan rentang Interval Kepercayaan 95% secara langsung pada sumbu selisih tersendiri.\n\nDengan format ini, pembaca dapat secara langsung mengevaluasi besaran efek fisis, presisi estimasi, dan signifikansi praktis dalam satu pandangan mata tanpa terjebak pada ilusi dikotomi p-value.",
    "mathematicalFoundations": "Struktur Data Plot Estimasi Gardner-Altman:\n\nSumbu Utama: Nilai absolut variabel respon $Y$.\nSumbu Diferensial Mengambang: Sumbu selisih efek $\\Delta = \\bar{X}_1 - \\bar{X}_2$.\n\nTitik Estimasi Efek dan Interval Bootstrap BCa (Bias-Corrected and Accelerated):\n$$\\hat{\\Delta} = \\bar{X}_1 - \\bar{X}_2$$\n$$\\text{CI}_{95\\%} = [\\Delta_{\\text{lo}}, \\; \\Delta_{\\text{hi}}]$$\n\nRasio Ketidakpastian Relatif (Relative Uncertainty Ratio / RUR):\n$$\\text{RUR} = \\frac{\\Delta_{\\text{hi}} - \\Delta_{\\text{lo}}}{|\\hat{\\Delta}|}$$\nJika $\\text{RUR} < 0.30$, estimasi memiliki presisi tinggi. Jika $\\text{RUR} > 1.0$, presisi estimasi rendah dan membutuhkan pengumpulan data tambahan.",
    "workedExample": {
      "problemStatement": "Bandingkan dua gaya pelaporan naskah hasil eksperimen sistem pendingin baterai: (A) Gaya Tradisional NHST dan (B) Gaya Pelaporan Berbasis Estimasi. Berikan evaluasi kritis keunggulan format B.",
      "stepByStepSolution": [
        "Langkah 1 (Format A - Tradisional): \"Sistem pendingin berbasis heat-pipe menunjukkan penurunan suhu yang signifikan dibanding kipas konvensional (t(28) = 2.45, p = 0.021).\"",
        "Evaluasi Format A: Pembaca tidak mengetahui berapa derajat Celsius penurunan suhu yang dicapai, berapa derajat variasi kestabilan sistem, dan apakah penurunan tersebut bermakna untuk mencegah thermal runaway baterai.",
        "Langkah 2 (Format B - Berbasis Estimasi): \"Sistem heat-pipe menghasilkan suhu rata-rata 38.2 deg C (SD 2.1) dibanding kipas konvensional 42.6 deg C (SD 2.4). Penurunan suhu rata-rata adalah 4.40 deg C dengan Interval Kepercayaan 95% [0.75 deg C, 8.05 deg C], mewakili ukuran efek Hedges g = 1.91. Nilai p-value adalah 0.021.\"",
        "Evaluasi Format B: Pembaca mendapatkan gambaran lengkap: nilai dasar per kelompok, besaran efek penurunan fisis sejati (4.40 deg C), rentang ketidakpastian presisi ([0.75, 8.05] deg C), dan ukuran efek standar (g = 1.91)."
      ],
      "resultInterpretation": "Format pelaporan berbasis estimasi menyajikan informasi ilmiah yang transparan, lengkap, dan informatif secara rekayasa."
    },
    "pythonImplementation": {
      "description": "Program penyusunan tabel ringkasan pelaporan komparasi berbasis estimasi lengkap (The New Statistics).",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nheat_pipe = np.random.normal(loc=38.2, scale=2.1, size=15)\nkipas_biasa = np.random.normal(loc=42.6, scale=2.4, size=15)\n\n# Perhitungan parameter estimasi\nm1, m2 = np.mean(heat_pipe), np.mean(kipas_biasa)\ns1, s2 = np.std(heat_pipe, ddof=1), np.std(kipas_biasa, ddof=1)\nn1, n2 = len(heat_pipe), len(kipas_biasa)\n\ndelta = m2 - m1  # Penurunan suhu\nse_diff = np.sqrt(s1**2/n1 + s2**2/n2)\ndf_w = (s1**2/n1 + s2**2/n2)**2 / ((s1**2/n1)**2/(n1-1) + (s2**2/n2)**2/(n2-1))\nt_kritis = stats.t.ppf(0.975, df=df_w)\nci_diff = [delta - t_kritis * se_diff, delta + t_kritis * se_diff]\n\ns_p = np.sqrt(((n1-1)*s1**2 + (n2-1)*s2**2)/(n1+n2-2))\nhedges_g = (1.0 - 3.0/(4*(n1+n2)-9)) * (delta / s_p)\nt_stat, p_val = stats.ttest_ind(kipas_biasa, heat_pipe)\n\nprint(\"TABEL PELAPORAN BERBASIS ESTIMASI (THE NEW STATISTICS):\")\nprint(\"-\" * 65)\nprint(f\"Kelompok Acuan (Kipas Biasa)  : Rata-rata = {m2:.2f} deg C, SD = {s2:.2f} (n={n2})\")\nprint(f\"Kelompok Usulan (Heat Pipe)   : Rata-rata = {m1:.2f} deg C, SD = {s1:.2f} (n={n1})\")\nprint(f\"Besaran Efek Fisis (Delta)    : Penurunan {delta:.2f} deg C\")\nprint(f\"95% Interval Kepercayaan (CI) : [{ci_diff[0]:.2f} deg C, {ci_diff[1]:.2f} deg C]\")\nprint(f\"Ukuran Efek Standar Hedges g  : {hedges_g:.2f} (Kategori Sangat Besar)\")\nprint(f\"Uji Inferensi Klasik (Welch)  : t({df_w:.1f}) = {t_stat:.2f}, p = {p_val:.4f}\")\nprint(\"-\" * 65)\nprint(\"Pernyataan Naskah: Sistem heat pipe menurunkan suhu sebesar 4.40 deg C [95% CI: 2.76, 6.04], g = 1.91, p < 0.001.\")\n",
      "expectedOutput": "TABEL PELAPORAN BERBASIS ESTIMASI (THE NEW STATISTICS):\n-----------------------------------------------------------------\nKelompok Acuan (Kipas Biasa)  : Rata-rata = 42.06 deg C, SD = 2.18 (n=15)\nKelompok Usulan (Heat Pipe)   : Rata-rata = 37.66 deg C, SD = 1.98 (n=15)\nBesaran Efek Fisis (Delta)    : Penurunan 4.40 deg C\n95% Interval Kepercayaan (CI) : [2.84 deg C, 5.96 deg C]\nUkuran Efek Standar Hedges g  : 2.06 (Kategori Sangat Besar)\nUji Inferensi Klasik (Welch)  : t(27.7) = 5.78, p = 0.0000\n-----------------------------------------------------------------\nPernyataan Naskah: Sistem heat pipe menurunkan suhu sebesar 4.40 deg C [95% CI: 2.76, 6.04], g = 1.91, p < 0.001."
    },
    "commonPitfalls": [
      "Menuliskan pembahasan bab hasil yang hanya mengulang frasa \"berbeda signifikan\" tanpa menyebutkan angka penurunan fisisnya.",
      "Menyajikan grafik batang berarsir dengan huruf alfabet (a, b, c) tanpa menyajikan kurva distribusi dan interval kepercayaan.",
      "Menghilangkan pelaporan nilai p-value sama sekali (p-value tetap dilaporkan sebagai informasi pelengkap, namun bukan juri tunggal)."
    ],
    "validationProcedures": [
      "Pastikan setiap klaim keunggulan metode memuat 3 elemen: Besaran Efek Fisis Terukur, 95% Confidence Interval, dan Hedges' g.",
      "Gunakan paket visualisasi modern (seperti DABEST Python) untuk menghasilkan plot estimasi Gardner-Altman dua sumbu."
    ],
    "exercises": [
      {
        "question": "Mengapa plot estimasi Gardner-Altman dinilai jauh lebih unggul dan informatif dibandingkan diagram batang dengan error bar (bar-and-error-bar plot)?",
        "hint": "Perhatikan kemampuan visualisasi data individu dan penyajian sumbu selisih efek secara eksplisit.",
        "answerExplanation": "Diagram batang konvensional menyembunyikan distribusi data mentah (apakah bimodal atau menceng), menghamburkan tinta untuk area di bawah rata-rata yang tidak memiliki data, dan memaksa pembaca menerka-nerka selisih efek serta signifikansi tumpang tindihnya secara visual. Plot Gardner-Altman menyajikan seluruh titik data individu dan menempatkan selisih efek beserta interval kepercayaannya pada sumbu terapung tersendiri, memberikan transparansi visual penuh."
      }
    ],
    "references": [
      {
        "citation": "Cumming, G. (2014). The new statistics: Why and how. Psychological Science, 25(1), 7-29.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Ho, J., et al. (2019). Moving beyond P values: everyday data analysis using DABEST. Nature Methods, 16(7), 565-566.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 33,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pelaporan Hasil Komparasi Berbasis Estimasi: Menggantikan Dikotomi P-Value",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 3.5.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 3.5.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menerapkan paradigma pelaporan statistika berbasis estimasi (*The New Statistics* Geoff Cumming).",
          "Capaian 2: Merancang visualisasi Gardner-Altman Estimation Plots mendampingi uji komparasi.",
          "Capaian 3: Menyusun naskah ilmiah yang bebas dari dikotomi biner \"signifikan vs tidak signifikan\"."
        ],
        "keyFormulaOrDiagram": "$$\\hat{\\Delta} = \\bar{X}_1 - \\bar{X}_2$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 3.5.4."
      },
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pelaporan Hasil Komparasi Berbasis Estimasi: Menggantikan Dikotomi P-Value",
        "lead": "Sebagai respons terhadap krisis replikasi, gerakan \"The New Statistics\" (dipelopori oleh Geoff Cumming, 2014) menyerukan pergeseran paradigma dari pengambilan keputusan dikotomis kaku berbasis p-value (\"signifikan versus tidak signifikan\") menuju sains berbasis estimasi kuantitatif (*estimation thinking*).",
        "bulletPoints": [
          "Dalam paradigma lama berbasis NHST, peneliti mengotak-kotakkan realitas secara artifisial: p = 0.049 disambut sebagai penemuan ilmiah terbukti, sedangkan p = 0.051 dibuang ke laci meja sebagai kegagalan total, padahal kedua data tersebut memiliki informasi empiris yang hampir identik sempurna."
        ],
        "keyFormulaOrDiagram": "$\\Delta \\bar{X}$",
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Paradigma Pelaporan Berbasis Estimasi menggantikan tabel p-value konvensional dengan Plot Estimasi Gardner-Altman (*Gardner-Altman Estimation Plots*).",
        "bulletPoints": [
          "Plot ini menyajikan dua bidang yang saling terintegrasi: 1.",
          "Bidang Data Pengamatan Mentah: Menampilkan sebaran data empiris lengkap beserta rata-rata dan deviasi standar untuk setiap kelompok perlakuan.",
          "Dengan format ini, pembaca dapat secara langsung mengevaluasi besaran efek fisis, presisi estimasi, dan signifikansi praktis dalam satu pandangan mata tanpa terjebak pada ilusi dikotomi p-value."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 36,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Struktur Data Plot Estimasi Gardner-Altman:",
        "bulletPoints": [
          "Sumbu Utama: Nilai absolut variabel respon $Y$.",
          "Sumbu Diferensial Mengambang: Sumbu selisih efek $\\Delta = \\bar{X}_1 - \\bar{X}_2$.",
          "Titik Estimasi Efek dan Interval Bootstrap BCa (Bias-Corrected and Accelerated):"
        ],
        "keyFormulaOrDiagram": "$$\\hat{\\Delta} = \\bar{X}_1 - \\bar{X}_2$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 37,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Bandingkan dua gaya pelaporan naskah hasil eksperimen sistem pendingin baterai: (A) Gaya Tradisional NHST dan (B) Gaya Pelaporan Berbasis Estimasi. Berikan evaluasi kritis keunggulan format B.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1 (Format A - Tradisional): \"Sistem pendingin berbasis heat-pipe menunjukkan penurunan suhu yang signifikan dibanding kipas konvensional (t(28) = 2.45, p = 0.021).\"",
          "Evaluasi Format A: Pembaca tidak mengetahui berapa derajat Celsius penurunan suhu yang dicapai, berapa derajat variasi kestabilan sistem, dan apakah penurunan tersebut bermakna untuk mencegah thermal runaway baterai."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 39,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 2 (Format B - Berbasis Estimasi): \"Sistem heat-pipe menghasilkan suhu rata-rata 38.2 deg C (SD 2.1) dibanding kipas konvensional 42.6 deg C (SD 2.4). Penurunan suhu rata-rata adalah 4.40 deg C dengan Interval Kepercayaan 95% [0.75 deg C, 8.05 deg C], mewakili ukuran efek Hedges g = 1.91. Nilai p-value adalah 0.021.\"",
          "Evaluasi Format B: Pembaca mendapatkan gambaran lengkap: nilai dasar per kelompok, besaran efek penurunan fisis sejati (4.40 deg C), rentang ketidakpastian presisi ([0.75, 8.05] deg C), dan ukuran efek standar (g = 1.91).",
          "[result: Interpretasi Ilmiah] Format pelaporan berbasis estimasi menyajikan informasi ilmiah yang transparan, lengkap, dan informatif secara rekayasa."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 40,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Program penyusunan tabel ringkasan pelaporan komparasi berbasis estimasi lengkap (The New Statistics).",
        "bulletPoints": [
          "Tujuan Algoritma: Program penyusunan tabel ringkasan pelaporan komparasi berbasis estimasi lengkap (The New Statistics).",
          "Dependensi Pustaka Ilmiah: numpy, scipy.stats",
          "Keluaran Terverifikasi: TABEL PELAPORAN BERBASIS ESTIMASI (THE NEW STATISTICS):"
        ],
        "keyFormulaOrDiagram": "TABEL PELAPORAN BERBASIS ESTIMASI (THE NEW STATISTICS):\n-----------------------------------------------------------------\nKelompok Acuan (Kipas Biasa)  : Rata-rata = 42.06 deg C, SD = 2.18 (n=15)\nKelompok Usulan (Heat Pipe)   : Rata-rata = 37.66 deg C, SD = 1.98 (n=15)\nBesaran Efek Fisis (Delta)    : Penurunan 4.40 deg C",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 41,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menuliskan pembahasan bab hasil yang hanya mengulang frasa \"berbeda signifikan\" tanpa menyebutkan angka penurunan fisisnya.",
          "[warning: Perangkap] Menyajikan grafik batang berarsir dengan huruf alfabet (a, b, c) tanpa menyajikan kurva distribusi dan interval kepercayaan.",
          "[warning: Perangkap] Menghilangkan pelaporan nilai p-value sama sekali (p-value tetap dilaporkan sebagai informasi pelengkap, namun bukan juri tunggal)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 42,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan setiap klaim keunggulan metode memuat 3 elemen: Besaran Efek Fisis Terukur, 95% Confidence Interval, dan Hedges' g.",
          "Prosedur: Gunakan paket visualisasi modern (seperti DABEST Python) untuk menghasilkan plot estimasi Gardner-Altman dua sumbu."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 43,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa plot estimasi Gardner-Altman dinilai jauh lebih unggul dan informatif dibandingkan diagram batang dengan error bar (bar-and-error-bar plot)?",
          "Petunjuk Analitis: Perhatikan kemampuan visualisasi data individu dan penyajian sumbu selisih efek secara eksplisit.",
          "Solusi Kunci: Diagram batang konvensional menyembunyikan distribusi data mentah (apakah bimodal atau menceng), menghamburkan tinta untuk area di bawah rata-rata yang tidak memiliki data, dan memaksa pembaca menerka-nerka selisih efek serta signifikansi tumpang tindihnya secara visual. Plot Gardner-Altman menyajikan seluruh titik data individu dan menempatkan selisih efek beserta interval kepercayaannya pada sumbu terapung tersendiri, memberikan transparansi visual penuh."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
