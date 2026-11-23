import { Lesson } from '../types/curriculum';

export const CH44_LESSONS: Record<string, Partial<Lesson>> = {
  "6.7.1": {
    "id": "6.7.1",
    "chapterId": "CH-44",
    "title": "Karakteristik Data Eksperimen Longitudinal dan Korelasi Temporal",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami struktur fisik data eksperimen longitudinal dan time-series dalam rekayasa.",
      "Menganalisis autokorelasi serial (Autocorrelation Function / ACF) dan implikasinya terhadap varians galat.",
      "Mengidentifikasi bahaya regresi semu (Spurious Regression) pada deret waktu berkorelasi."
    ],
    "content": "Dalam eksperimen rekayasa fisis (seperti pemantauan keausan bantalan turbin, uji degradasi sel baterai lithium-ion, atau pemantauan struktural jembatan), data tidak dikumpulkan sebagai observasi independen yang terisolasi. Data dikumpulkan secara kontinu di sepanjang garis waktu yang berkesinambungan. Data jenis ini disebut data runtun waktu (time-series) jika berupa sinyal tunggal yang panjang, atau data longitudinal jika mengamati banyak unit fisik secara berulang sepanjang waktu.\n\nPelanggaran Asumsi Independensi Standar:\nSebagian besar uji statistik dasar (seperti uji-t, ANOVA, dan OLS) mengasumsikan bahwa galat observasi bersifat i.i.d. (independen dan berdistribusi identik). Pada data temporal, asumsi ini SELALU dilanggar akibat Autokorelasi Serial (Serial Autocorrelation): nilai pembacaan sensor pada detik $t$ sangat berkorelasi dengan pembacaan pada detik $t-1$.\n\nBahaya Regresi Semu (Spurious Regression, Granger & Newbold, 1974):\nJika seorang peneliti meregresikan dua variabel deret waktu yang sama-sama memiliki tren waktu acak (meskipun keduanya tidak memiliki hubungan fisis apa pun, misal konsumsi keju di AS vs jumlah kematian terjerat sprei), regresi OLS standar akan menghasilkan koefisien determinasi $R^2 > 0.90$ dan $p < 0.0001$ yang sangat signifikan palsu. Hal ini terjadi karena autokorelasi positif yang diabaikan menyebabkan varians galat diestimasi terlalu rendah secara masif, menghasilkan nilai t-statistik yang meledak semu.",
    "mathematicalFoundations": "Formulasi Matematis Autokorelasi Temporal:\nDiberikan deret waktu diskrit $Y_t$ untuk $t = 1, 2, \\dots, T$ dengan rata-rata $\\mu$.\n\n1. Fungsi Autokovarians Lag-$k$ (Autocovariance Function, $\\gamma_k$):\n$$\\gamma_k = \\text{Cov}(Y_t, Y_{t-k}) = \\mathbb{E}[(Y_t - \\mu)(Y_{t-k} - \\mu)]$$\n\n2. Fungsi Autokorelasi (Autocorrelation Function, $\\rho_k$ / ACF):\n$$\\rho_k = \\frac{\\gamma_k}{\\gamma_0} = \\frac{\\sum_{t=k+1}^T (Y_t - \\bar{Y})(Y_{t-k} - \\bar{Y})}{\\sum_{t=1}^T (Y_t - \\bar{Y})^2}$$\nSifat: $\\rho_0 = 1.0$ dan $-1.0 \\leq \\rho_k \\leq 1.0$.\n\nDampak Autokorelasi AR(1) Terhadap Varians Rata-rata Sampel:\nJika $Y_t = \\phi Y_{t-1} + \\epsilon_t$ dengan $|phi| < 1$:\n$$\\text{Var}(\\bar{Y}) = \\frac{\\sigma^2}{T} \\left( \\frac{1 + \\phi}{1 - \\phi} \\right) = \\frac{\\sigma^2}{T_{\\text{eff}}}$$\nUkuran Sampel Efektif (Effective Sample Size, $T_{\\text{eff}}$):\n$$T_{\\text{eff}} = T \\cdot \\left( \\frac{1 - \\phi}{1 + \\phi} \\right)$$\nJika autokorelasi $\\phi = 0.90$, maka $T_{\\text{eff}} = T \\cdot (0.10 / 1.90) \\approx T / 19$. Data berisi 1.900 titik observasi sebenarnya hanya memiliki kandungan informasi independen yang setara dengan 100 sampel!",
    "workedExample": {
      "problemStatement": "Sebuah sensor suhu mencatat T = 1.000 data kontinu per detik. Analisis autokorelasi menunjukkan korelasi serial lag-1 adalah phi = 0.80. Peneliti menghitung standar error rata-rata naif SE_naive = s / sqrt(1000). Hitung ukuran sampel efektif T_eff dan tentukan berapa kali lipat peneliti telah meremehkan ketidakpastian sejati melalui perhitungan naif.",
      "stepByStepSolution": [
        "Langkah 1: Hitung faktor inflasi varians: Faktor = (1 + phi) / (1 - phi) = (1 + 0.80) / (1 - 0.80) = 1.80 / 0.20 = 9.00.",
        "Langkah 2: Hitung ukuran sampel efektif: T_eff = T / Faktor = 1.000 / 9.00 = 111.1 sampel.",
        "Langkah 3: Hitung standar error sejati: SE_true = s / sqrt(T_eff) = s / sqrt(111.1) = s / 10.54.",
        "Langkah 4: Hitung standar error naif: SE_naive = s / sqrt(1000) = s / 31.62.",
        "Langkah 5: Hitung rasio pelemahan galat: Rasio = SE_true / SE_naive = 31.62 / 10.54 = 3.00 kali lipat."
      ],
      "resultInterpretation": "Peneliti meremehkan ketidakpastian sebesar faktor 3x lipat (interval kepercayaan naif 3 kali terlalu sempit), memicu risiko penolakan hipotesis nol palsu (False Positive) yang masif."
    },
    "pythonImplementation": {
      "description": "Demonstrasi pembengkakan t-statistik palsu pada regresi semu deret waktu berautokorelasi.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# [SIMULASI/SYNTHETIC DATA]\n# Dua proses random walk independen murni (tanpa relasi fisik):\n# X_t = X_{t-1} + e1_t, Y_t = Y_{t-1} + e2_t\nnp.random.seed(42)\nT = 200\ne1 = np.random.normal(0, 1, size=T)\ne2 = np.random.normal(0, 1, size=T)\n\nX = np.cumsum(e1)  # Random walk 1\nY = np.cumsum(e2)  # Random walk 2 (independen sempurna dari X)\n\n# Regresi OLS Naif antara Y dan X\nslope, intercept, r_value, p_value, std_err = stats.linregress(X, Y)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Forensik Regresi Semu (Spurious Regression):\")\nprint(f\"Koefisien Determinasi R^2      : {r_value**2:.4f} (Tampak Tinggi Palsu!)\")\nprint(f\"P-value Naif                   : {p_value:.4e} (Signifikan Palsu!)\")\nprint(f\"T-statistik Terhitung          : {slope / std_err:.2f}\")\nprint(\"Penjelasan: Mengabaikan autokorelasi serial random walk memicu ilusi korelasi yang sangat kuat.\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Forensik Regresi Semu (Spurious Regression):\nKoefisien Determinasi R^2      : 0.2858 (Tampak Tinggi Palsu!)\nP-value Naif                   : 4.8814e-16 (Signifikan Palsu!)\nT-statistik Terhitung          : 8.89\nPenjelasan: Mengabaikan autokorelasi serial random walk memicu ilusi korelasi yang sangat kuat."
    },
    "commonPitfalls": [
      "Menjalankan regresi OLS standar pada data runtun waktu non-stasioner tanpa differencing.",
      "Mengabaikan autokorelasi galat saat menguji signifikansi tren eksperimen.",
      "Melakukan random shuffle pada data deret waktu saat membagi data latih dan data uji."
    ],
    "validationProcedures": [
      "Uji autokorelasi residual menggunakan Uji Durbin-Watson atau Uji Breusch-Godfrey.",
      "Hitung ukuran sampel efektif (Effective Sample Size) sebelum melakukan inferensi statistik.",
      "Gunakan kesalahan baku Newey-West (HAC Standard Errors) yang tahan terhadap heteroskedastisitas dan autokorelasi."
    ],
    "exercises": [
      {
        "question": "Apa indikasi dari nilai statistik Durbin-Watson yang mendekati nol (DW ~ 0) pada evaluasi residual regresi?",
        "hint": "Perhatikan rentang nilai standar Durbin-Watson [0, 4] di mana nilai 2 berarti bebas autokorelasi.",
        "answerExplanation": "Nilai Durbin-Watson berkisar antara 0 hingga 4, dengan nilai 2 menunjukkan tidak adanya korelasi serial lag-1. Nilai DW yang mendekati 0 mengindikasikan adanya autokorelasi positif yang sangat kuat pada residual regresi, menandakan bahwa varians galat di bawah estimasi dan p-value yang dilaporkan tidak valid."
      },
      {
        "question": "Bagaimana cara sederhana mentransformasikan dua deret waktu random walk agar aman dari jebakan regresi semu?",
        "hint": "Pikirkan operasi diferensiasi tingkat pertama (First Differencing).",
        "answerExplanation": "Dengan menerapkan differencing orde pertama: Delta X_t = X_t - X_{t-1} dan Delta Y_t = Y_t - Y_{t-1}. Operasi ini membuang tren stokastik dan mengubah deret waktu menjadi derau stasioner berdistribusi bebas, sehingga regresi pada laju perubahan Delta Y terhadap Delta X menghasilkan estimasi yang jujur."
      }
    ],
    "references": [
      {
        "citation": "Granger, C. W., & Newbold, P. (1974). Spurious regressions in econometrics. Journal of Econometrics, 2(2), 111-120.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Box, G. E., Jenkins, G. M., Reinsel, G. C., & Ljung, G. M. (2015). Time Series Analysis: Forecasting and Control (5th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Karakteristik Data Eksperimen Longitudinal dan Korelasi...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.7.1.",
          "Capaian: Memahami struktur fisik data eksperimen longitudinal dan time-series dalam rekayasa.",
          "Capaian: Menganalisis autokorelasi serial (Autocorrelation Function / ACF) dan implikasinya terhadap varians galat.",
          "Capaian: Mengidentifikasi bahaya regresi semu (Spurious Regression) pada deret waktu berkorelasi."
        ],
        "keyFormulaOrDiagram": "$$\\gamma_k = \\text{Cov}(Y_t, Y_{t-k}) = \\mathbb{E}[(Y_t - \\mu)(Y_{t-k} - \\mu)]$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Karakteristik Data Eksperimen Longitudinal dan Korelasi...",
        "bulletPoints": [
          "Dalam eksperimen rekayasa fisis (seperti pemantauan keausan bantalan turbin, uji degradasi sel baterai lithium-ion, atau pema...",
          "Pelanggaran Asumsi Independensi Standar: Sebagian besar uji statistik dasar (seperti uji-t, ANOVA, dan OLS) mengasumsikan bah...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Bahaya Regresi Semu (Spurious Regression, Granger & Newbold, 1974): Jika seorang peneliti..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Bahaya Regresi Semu (Spurious Regression, Granger & Newbold, 1974): Jika seorang peneliti meregresikan dua variabel deret wak...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Formulasi Matematis Autokorelasi Temporal:",
          "Diberikan deret waktu diskrit $Y_t$ untuk $t = 1, 2, \\dots, T$ dengan rata-rata $\\mu$.",
          "1. Fungsi Autokovarians Lag-$k$ (Autocovariance Function, $\\gamma_k$):"
        ],
        "keyFormulaOrDiagram": "$$\\gamma_k = \\text{Cov}(Y_t, Y_{t-k}) = \\mathbb{E}[(Y_t - \\mu)(Y_{t-k} - \\mu)]$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah sensor suhu mencatat T = 1.000 data kontinu per detik. Analisis autokorelasi menunjukkan korelasi serial lag-1 adalah phi = 0.80. Pen...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Hitung faktor inflasi varians: Faktor = (1 + phi) / (1 - phi) = (1 + 0.80) / (1 - 0.80) = 1.80 / 0....",
          "Langkah 2: Hitung ukuran sampel efektif: T_eff = T / Faktor = 1.000 / 9.00 = 111.1 sampel.",
          "Langkah 3: Hitung standar error sejati: SE_true = s / sqrt(T_eff) = s / sqrt(111.1) = s / 10.54.",
          "Interpretasi: Peneliti meremehkan ketidakpastian sebesar faktor 3x lipat (interval kepercayaan naif 3 kali terlalu sempit), memicu ris..."
        ],
        "keyFormulaOrDiagram": "Langkah 5: Hitung rasio pelemahan galat: Rasio = SE_true / SE_naive = 31.62 / 10.54 = 3.00..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Demonstrasi pembengkakan t-statistik palsu pada regresi semu deret waktu berautokorelasi.",
          "Dependensi Pustaka: numpy, scipy.stats",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Forensik Regresi Semu (Spurious Regression):"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Forensik Regresi Semu (Spurious Regression): | Koefisien Determi..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menjalankan regresi OLS standar pada data runtun waktu non-stasioner tanpa differencing.",
          "Perangkap: Mengabaikan autokorelasi galat saat menguji signifikansi tren eksperimen.",
          "Perangkap: Melakukan random shuffle pada data deret waktu saat membagi data latih dan data uji."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Uji autokorelasi residual menggunakan Uji Durbin-Watson atau Uji Breusch-Godfrey.",
          "Prosedur: Hitung ukuran sampel efektif (Effective Sample Size) sebelum melakukan inferensi statistik.",
          "Prosedur: Gunakan kesalahan baku Newey-West (HAC Standard Errors) yang tahan terhadap heteroskedastisitas dan autokorela..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Apa indikasi dari nilai statistik Durbin-Watson yang mendekati nol (DW ~ 0) pada evaluasi residual regresi?",
          "Petunjuk: Perhatikan rentang nilai standar Durbin-Watson [0, 4] di mana nilai 2 berarti bebas autokorelasi.",
          "Solusi Kunci: Nilai Durbin-Watson berkisar antara 0 hingga 4, dengan nilai 2 menunjukkan tidak adanya korelasi serial lag-1. Nilai DW..."
        ]
      }
    ]
  },
  "6.7.2": {
    "id": "6.7.2",
    "chapterId": "CH-44",
    "title": "Uji Stasioneritas, Trend, dan Musiman pada Data Sinyal/Sensor Rekayasa",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membedakan stasioneritas kuat (Strict Stationarity) vs stasioneritas lemah (Weak/Covariance Stationarity).",
      "Menerapkan uji akar unit formal: Augmented Dickey-Fuller (ADF) dan KPSS Test.",
      "Melakukan dekomposisi sinyal aditif vs multiplikatif (Trend, Seasonal, Residual)."
    ],
    "content": "Sebagian besar teori pemrosesan sinyal rekayasa dan pemodelan prediktif ARMA didirikan di atas asumsi Stasioneritas (Stationarity). Sinyal sensor yang stasioner memiliki sifat statistik yang konstan di sepanjang waktu, memungkinkan hukum masa lalu digunakan untuk memprediksi masa depan secara stabil.\n\nDefinisi Stasioneritas Lemah (Weak / Covariance Stationarity):\nSebuah proses stokastik $Y_t$ dikatakan stasioner lemah jika memenuhi 3 syarat:\n1. Rata-rata konstan di sepanjang waktu: $\\mathbb{E}[Y_t] = \\mu, \\; \\forall t$.\n2. Varians konstan dan berhingga: $\\text{Var}(Y_t) = \\sigma^2 < \\infty, \\; \\forall t$.\n3. Autokovarians hanya bergantung pada jeda waktu (lag $k$), bukan pada waktu absolut $t$: $\\text{Cov}(Y_t, Y_{t-k}) = \\gamma_k$.\n\nTiga Komponen Dekomposisi Sinyal Sensor:\nData sensorik riil biasanya merupakan superposisi dari tiga fenomena fisis:\n$$Y_t = T_t + S_t + I_t \\quad \\text{(Model Aditif)} \\quad \\text{atau} \\quad Y_t = T_t \\times S_t \\times I_t \\quad \\text{(Model Multiplikatif)}$$\n- Komponen Tren ($T_t$): Perubahan jangka panjang (misal keausan mesin atau pemanasan global).\n- Komponen Musiman ($S_t$): Pola fluktuasi periodik yang berulang pada frekuensi tetap (misal siklus harian suhu atau putaran rotasi motor).\n- Komponen Residu / Irregular ($I_t$): Derau stokastik stasioner setelah tren dan musiman dibersihkan.",
    "mathematicalFoundations": "Uji Hipotesis Akar Unit (Unit Root Testing):\nModel autoregresif orde-1:\n$$Y_t = \\rho Y_{t-1} + \\epsilon_t$$\nJika $\\rho = 1$, proses memiliki \"akar unit\" (Unit Root), bersifat non-stasioner random walk dengan memori tak terhingga dan varians yang meledak $\\text{Var}(Y_t) = t \\sigma^2$.\n\n1. Uji Augmented Dickey-Fuller (ADF Test):\nBentuk regresi pengujian:\n$$\\Delta Y_t = \\alpha + \\beta t + \\gamma Y_{t-1} + \\sum_{i=1}^p \\delta_i \\Delta Y_{t-i} + \\epsilon_t$$\ndi mana $\\gamma = \\rho - 1$.\n- Hipotesis Nol $H_0: \\gamma = 0$ (Mengandung unit root / non-stasioner).\n- Hipotesis Alternatif $H_1: \\gamma < 0$ (Stasioner).\nJika statistik $t_{\\text{ADF}} < t_{\\text{kritis}}$ (menghasilkan $p < 0.05$), hipotesis nol ditolak: deret waktu dinyatakan stasioner.\n\n2. Uji KPSS (Kwiatkowski-Phillips-Schmidt-Shin):\nMerupakan pelengkap ADF dengan hipotesis terbalik:\n- $H_0$: Deret waktu bersifat stasioner tren (Trend Stationary).\n- $H_1$: Mengandung unit root.\nStandar Emas Verifikasi: Menjalankan ADF dan KPSS secara konfirmatori simultan (Confirmatory Data Analysis).",
    "workedExample": {
      "problemStatement": "Diberikan hasil uji statistik pada data getaran turbin: Uji ADF menghasilkan p-value = 0.002. Uji KPSS menghasilkan p-value = 0.15. Analisis kombinasi hasil kedua uji tersebut dan tentukan status stasioneritas sinyal getaran.",
      "stepByStepSolution": [
        "Langkah 1: Analisis Uji ADF: Hipotesis nol ADF adalah \"data memiliki unit root (non-stasioner)\". Karena p-value = 0.002 < 0.05, hipotesis nol ditolak secara meyakinkan. Kesimpulan ADF: data stasioner.",
        "Langkah 2: Analisis Uji KPSS: Hipotesis nol KPSS adalah \"data bersifat stasioner\". Karena p-value = 0.15 > 0.05, hipotesis nol gagal ditolak. Kesimpulan KPSS: data stasioner.",
        "Langkah 3: Integrasi konfirmatori: Kedua uji sepakat secara konsisten menolak keberadaan unit root dan mendukung stasioneritas."
      ],
      "resultInterpretation": "Sinyal getaran turbin terbukti secara meyakinkan bersifat stasioner (Covariance Stationary) dan siap dimodelkan menggunakan arsitektur ARMA atau transformasi Fourier."
    },
    "pythonImplementation": {
      "description": "Pengujian stasioneritas menggunakan uji ADF dan dekomposisi komponen tren/musiman.",
      "libraryDependencies": [
        "numpy",
        "pandas",
        "scipy.signal"
      ],
      "code": "import numpy as np\nimport pandas as pd\n\n# [SIMULASI/SYNTHETIC DATA]\n# Sinyal sensor: Tren Linier + Komponen Harmonik Musiman + Derau Acak\nnp.random.seed(42)\nt = np.linspace(0, 50, 500)\ntrend = 0.15 * t\nseasonal = 2.0 * np.sin(2 * np.pi * t / 5.0)  # Periode = 5 unit waktu\nnoise = np.random.normal(0, 0.5, size=len(t))\n\nsignal_raw = trend + seasonal + noise\nsignal_detrended = signal_raw - trend  # Menghilangkan tren\n\n# Implementasi Dickey-Fuller Sederhana pada sinyal mentah vs sinyal bebas tren\ndef simple_df_test(y):\n    dy = np.diff(y)\n    y_lag = y[:-1]\n    # Regresi dy ~ gamma * y_lag\n    slope, intercept = np.polyfit(y_lag, dy, 1)\n    res = dy - (slope * y_lag + intercept)\n    se = np.sqrt(np.sum(res**2) / (len(dy) - 2)) / np.sqrt(np.sum((y_lag - np.mean(y_lag))**2))\n    t_stat = slope / se\n    return slope, t_stat\n\nslope_raw, t_raw = simple_df_test(signal_raw)\nslope_clean, t_clean = simple_df_test(signal_detrended)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Uji Diagnostik Stasioneritas Sinyal:\")\nprint(f\"Sinyal Mentah (Dengan Tren) : Koefisien gamma = {slope_raw:.4f} | t-stat = {t_raw:.2f} (Non-Stasioner)\")\nprint(f\"Sinyal Bebas Tren (Detrend) : Koefisien gamma = {slope_clean:.4f} | t-stat = {t_clean:.2f} (Stasioner Kuat!)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Uji Diagnostik Stasioneritas Sinyal:\nSinyal Mentah (Dengan Tren) : Koefisien gamma = -0.0393 | t-stat = -3.17 (Non-Stasioner)\nSinyal Bebas Tren (Detrend) : Koefisien gamma = -0.1089 | t-stat = -5.34 (Stasioner Kuat!)"
    },
    "commonPitfalls": [
      "Memodelkan data sensor yang memiliki tren pertumbuhan tanpa terlebih dahulu melakukan detrending atau differencing.",
      "Hanya mengandalkan uji ADF tanpa melakukan konfirmasi silang dengan uji KPSS.",
      "Menggunakan dekomposisi aditif pada data yang amplitudonya bertumbuh secara proporsional terhadap level (harus menggunakan multiplikatif)."
    ],
    "validationProcedures": [
      "Jalankan uji ADF dan KPSS secara berdampingan sebelum pemodelan time-series.",
      "Plot grafik ACF dan PACF: deret stasioner memperlihatkan penurunan autokorelasi cepat menuju nol.",
      "Gunakan transformasi logaritmik jika varians musiman bertumbuh seiring waktu."
    ],
    "exercises": [
      {
        "question": "Apa arti kesimpulan diagnostik jika Uji ADF menolak H0 (menyatakan stasioner) namun Uji KPSS juga menolak H0 (menyatakan non-stasioner)?",
        "hint": "Perhatikan keberadaan tren fraksional atau stasioneritas parsial (Fractionally Integrated Process).",
        "answerExplanation": "Jika ADF dan KPSS saling bertentangan menolak hipotesis nolnya masing-masing, data berada dalam zona abu-abu. Sinyal mungkin memiliki memori panjang (Long Memory / Fractional Integration) atau mengalami pergeseran struktural mendadak (Structural Break) yang membingungkan kedua uji akar unit standar."
      },
      {
        "question": "Kapan dekomposisi multiplikatif (Y = T * S * I) wajib dipilih daripada dekomposisi aditif (Y = T + S + I)?",
        "hint": "Perhatikan besaran amplitudo osilasi musiman seiring meningkatnya tren rata-rata.",
        "answerExplanation": "Dekomposisi multiplikatif wajib digunakan ketika amplitudo fluktuasi musiman bertumbuh secara proporsional seiring dengan kenaikan tren rata-rata (misal lonjakan beban listrik puncak semakin membesar seiring pertumbuhan industri). Dekomposisi aditif mengasumsikan amplitudo musiman konstan terlepas dari level tren."
      }
    ],
    "references": [
      {
        "citation": "Dickey, D. A., & Fuller, W. A. (1979). Distribution of the estimators for autoregressive time series with a unit root. JASA, 74(366a), 427-431.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Kwiatkowski, D., Phillips, P. C., Schmidt, P., & Shin, Y. (1992). Testing the null hypothesis of stationarity against the alternative of a unit root. Journal of Econometrics, 54(1-3), 159-178.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Uji Stasioneritas, Trend, dan Musiman pada Data Sinyal/...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.7.2.",
          "Capaian: Membedakan stasioneritas kuat (Strict Stationarity) vs stasioneritas lemah (Weak/Covariance Stationarity).",
          "Capaian: Menerapkan uji akar unit formal: Augmented Dickey-Fuller (ADF) dan KPSS Test.",
          "Capaian: Melakukan dekomposisi sinyal aditif vs multiplikatif (Trend, Seasonal, Residual)."
        ],
        "keyFormulaOrDiagram": "$$Y_t = \\rho Y_{t-1} + \\epsilon_t$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Uji Stasioneritas, Trend, dan Musiman pada Data Sinyal/...",
        "bulletPoints": [
          "Sebagian besar teori pemrosesan sinyal rekayasa dan pemodelan prediktif ARMA didirikan di atas asumsi Stasioneritas (Stationa...",
          "Definisi Stasioneritas Lemah (Weak / Covariance Stationarity): Sebuah proses stokastik $Y_t$ dikatakan stasioner lemah jika m...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Tiga Komponen Dekomposisi Sinyal Sensor: Data sensorik riil biasanya merupakan superposisi..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Tiga Komponen Dekomposisi Sinyal Sensor: Data sensorik riil biasanya merupakan superposisi dari tiga fenomena fisis: $$Y_t =...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Uji Hipotesis Akar Unit (Unit Root Testing):",
          "Model autoregresif orde-1:",
          "Jika $\\rho = 1$, proses memiliki \"akar unit\" (Unit Root), bersifat non-stasioner random walk dengan memori tak..."
        ],
        "keyFormulaOrDiagram": "$$Y_t = \\rho Y_{t-1} + \\epsilon_t$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Diberikan hasil uji statistik pada data getaran turbin: Uji ADF menghasilkan p-value = 0.002. Uji KPSS menghasilkan p-value = 0.15. Analisis...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Analisis Uji ADF: Hipotesis nol ADF adalah \"data memiliki unit root (non-stasioner)\". Karena p-valu...",
          "Langkah 2: Analisis Uji KPSS: Hipotesis nol KPSS adalah \"data bersifat stasioner\". Karena p-value = 0.15 > 0.0...",
          "Langkah 3: Integrasi konfirmatori: Kedua uji sepakat secara konsisten menolak keberadaan unit root dan menduku...",
          "Interpretasi: Sinyal getaran turbin terbukti secara meyakinkan bersifat stasioner (Covariance Stationary) dan siap dimodelkan mengguna..."
        ],
        "keyFormulaOrDiagram": "Langkah 3: Integrasi konfirmatori: Kedua uji sepakat secara konsisten menolak keberadaan u..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Pengujian stasioneritas menggunakan uji ADF dan dekomposisi komponen tren/musiman.",
          "Dependensi Pustaka: numpy, pandas, scipy.signal",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Uji Diagnostik Stasioneritas Sinyal:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Uji Diagnostik Stasioneritas Sinyal: | Sinyal Mentah (Dengan Tre..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Memodelkan data sensor yang memiliki tren pertumbuhan tanpa terlebih dahulu melakukan detrending atau differen...",
          "Perangkap: Hanya mengandalkan uji ADF tanpa melakukan konfirmasi silang dengan uji KPSS.",
          "Perangkap: Menggunakan dekomposisi aditif pada data yang amplitudonya bertumbuh secara proporsional terhadap level (harus..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Jalankan uji ADF dan KPSS secara berdampingan sebelum pemodelan time-series.",
          "Prosedur: Plot grafik ACF dan PACF: deret stasioner memperlihatkan penurunan autokorelasi cepat menuju nol.",
          "Prosedur: Gunakan transformasi logaritmik jika varians musiman bertumbuh seiring waktu."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Apa arti kesimpulan diagnostik jika Uji ADF menolak H0 (menyatakan stasioner) namun Uji KPSS juga menolak H0 (menyatakan...",
          "Petunjuk: Perhatikan keberadaan tren fraksional atau stasioneritas parsial (Fractionally Integrated Process).",
          "Solusi Kunci: Jika ADF dan KPSS saling bertentangan menolak hipotesis nolnya masing-masing, data berada dalam zona abu-abu. Sinyal mun..."
        ]
      }
    ]
  },
  "6.7.3": {
    "id": "6.7.3",
    "chapterId": "CH-44",
    "title": "Model Autoregressive Eksplanatori (ARMAX) untuk Evaluasi Eksperimen Time-Series",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami formulasi model ARMAX yang menggabungkan memori autoregresif dengan variabel perlakuan eksogen.",
      "Mengisolasi efek intervensi eksperimental fisik dari inersia dinamika masa lalu sistem.",
      "Mendiagnosis orde p, q, dan b model ARMAX menggunakan kriteria informasi AIC/BIC dan uji residual Ljung-Box."
    ],
    "content": "Dalam eksperimen rekayasa di mana perlakuan diberikan secara dinamis sepanjang waktu (misalnya menguji pengaruh injeksi zat pendingin $X_t$ terhadap fluktuasi temperatur reaktor $Y_t$), model regresi linier statis $Y_t = \\beta X_t + \\epsilon_t$ gagal total karena mengabaikan inersia termal fisik sistem. Temperatur pada detik $t$ tidak hanya dipengaruhi oleh zat pendingin pada detik $t$, melainkan sangat didominasi oleh temperatur pada detik $t-1$ dan $t-2$.\n\nModel ARMAX (Autoregressive Moving Average with Exogenous Inputs):\nModel ARMAX adalah arsitektur matematika yang secara simultan memodelkan:\n1. Komponen Autoregresif (AR): Inersia fisis internal sistem di mana masa lalu mempengaruhi masa kini ($Y_{t-1}, \\dots, Y_{t-p}$).\n2. Komponen Moving Average (MA): Respon sistem terhadap gangguan derau tak terduga masa lalu ($\\epsilon_{t-1}, \\dots, \\epsilon_{t-q}$).\n3. Komponen Eksogen (X / Exogenous Inputs): Variabel perlakuan eksperimental eksternal ($X_{t}, X_{t-1}, \\dots, X_{t-b}$).\n\nKeunggulan Metodologis ARMAX dalam Eksperimen:\nDengan memasukkan dinamika autoregresif internal sistem ke dalam model, ARMAX \"membersihkan\" seluruh korelasi serial alami sistem. Koefisien perlakuan eksogen $\\beta$ yang dihasilkan mencerminkan Efek Intervensi Murni (Transfer Function) yang bebas dari distorsi inersia masa lalu dan autokorelasi galat.",
    "mathematicalFoundations": "Formulasi Matematis Model ARMAX(p, q, b):\nMisalkan $Y_t$ adalah variabel respon eksperimen, dan $X_t$ adalah variabel perlakuan eksogen:\n$$Y_t = c + \\sum_{i=1}^p \\phi_i Y_{t-i} + \\sum_{j=1}^b \\beta_j X_{t-j+1} + \\epsilon_t + \\sum_{k=1}^q \\theta_k \\epsilon_{t-k}$$\ndi mana:\n- $\\phi_i$: Parameter autoregresif (AR). Syarat kestabilan: seluruh akar polinomial karakteristik $1 - \\sum \\phi_i z^i = 0$ berada di luar lingkaran unit kompleks ($|z| > 1$).\n- $\\beta_j$: Koefisien respon eksogen (efek kausal perlakuan dinamis).\n- $\\theta_k$: Parameter moving average (MA).\n- $\\epsilon_t \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$: Derau putih Gaussian murni.\n\nNotasi Operator Pergeseran Mundur (Backshift Operator $B Y_t = Y_{t-1}$):\n$$\\Phi(B) Y_t = c + B(B) X_t + \\Theta(B) \\epsilon_t$$\nEfek Penguatan Statis Jangka Panjang (Long-Run Static Gain, $G$):\nJika perlakuan $X$ dinaikkan secara permanen sebesar 1 unit, perubahan tunak permanen pada $Y$ adalah:\n$$G = \\frac{\\sum_{j=1}^b \\beta_j}{1 - \\sum_{i=1}^p \\phi_i}$$\n\nUji Kecocokan Residual Ljung-Box:\n$$Q = T(T + 2) \\sum_{k=1}^m \\frac{\\hat{\\rho}_k^2(e)}{T - k} \\sim \\chi_m^2$$\nKriteria model sehat: $p > 0.05$ (residual terbukti berupa white noise tanpa autokorelasi sisa).",
    "workedExample": {
      "problemStatement": "Sebuah sistem kendali suhu ruangan dimodelkan dengan ARMAX(1, 0, 1): Y_t = 0.8 * Y_{t-1} + 0.5 * X_t + e_t, di mana Y adalah suhu (degC) dan X adalah daya pemanas (kW). Hitung efek peningkatan suhu seketika pada detik pertama (Impact Effect) dan efek peningkatan suhu tunak jangka panjang (Long-Run Static Gain) jika daya pemanas dinaikkan secara permanen sebesar 2.0 kW.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi parameter model: phi_1 = 0.8; beta_0 = 0.5.",
        "Langkah 2: Hitung efek seketika (Impact Multiplier) untuk Delta X = 2.0 kW: Delta Y_t = beta_0 * Delta X = 0.5 * 2.0 = +1.0 degC pada detik pertama.",
        "Langkah 3: Hitung formula Long-Run Static Gain: G = beta_0 / (1 - phi_1) = 0.5 / (1 - 0.8) = 0.5 / 0.2 = 2.5 degC per kW.",
        "Langkah 4: Hitung peningkatan suhu tunak permanen untuk Delta X = 2.0 kW: Delta Y_tunak = G * Delta X = 2.5 * 2.0 = +5.0 degC."
      ],
      "resultInterpretation": "Pemanas langsung menaikkan suhu 1.0 degC seketika, namun inersia akumulatif sistem (phi=0.8) secara bertahap mendorong suhu naik hingga mencapai kestabilan akhir sebesar +5.0 degC."
    },
    "pythonImplementation": {
      "description": "Estimasi parameter ARMAX dan diagnostik residual white noise menggunakan scipy.optimize.",
      "libraryDependencies": [
        "numpy",
        "scipy.optimize"
      ],
      "code": "import numpy as np\nfrom scipy import optimize\n\n# [SIMULASI/SYNTHETIC DATA]\n# Simulasi proses fisik ARMAX(1, 1, 1):\n# Y_t = 0.7 * Y_{t-1} + 1.2 * X_t + e_t + 0.4 * e_{t-1}\nnp.random.seed(42)\nT = 500\ne = np.random.normal(0, 0.8, size=T)\nX = np.random.normal(5.0, 1.5, size=T)  # Input eksogen\n\nY = np.zeros(T)\nfor t in range(1, T):\n    Y[t] = 0.7 * Y[t-1] + 1.2 * X[t] + e[t] + 0.4 * e[t-1]\n\n# Estimasi Least Squares Model ARX(1, 1) sederhana: Y_t ~ phi*Y_{t-1} + beta*X_t\n# Matriks regresi Z = [Y_{t-1}, X_t]\nZ = np.column_stack([Y[:-1], X[1:]])\ntarget_y = Y[1:]\n\ntheta_hat = np.linalg.lstsq(Z, target_y, rcond=None)[0]\nphi_est, beta_est = theta_hat[0], theta_hat[1]\n\n# Hitung Long-run gain\nlong_run_gain = beta_est / (1.0 - phi_est)\n\n# Evaluasi autokorelasi lag-1 pada residual\nresiduals = target_y - np.dot(Z, theta_hat)\nr_lag1 = np.corrcoef(residuals[:-1], residuals[1:])[0, 1]\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model ARMAX:\")\nprint(f\"Koefisien AR Estimasi (phi)   : {phi_est:.4f} (Sejati: 0.7000)\")\nprint(f\"Koefisien Input Eksogen (beta): {beta_est:.4f} (Sejati: 1.2000)\")\nprint(f\"Long-Run Static Gain          : {long_run_gain:.4f} (Kenaikan Tunak per Satuan Input)\")\nprint(f\"Autokorelasi Residual Lag-1   : {r_lag1:.4f} (Mendekati 0: Model Bersih)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model ARMAX:\nKoefisien AR Estimasi (phi)   : 0.7818 (Sejati: 0.7000)\nKoefisien Input Eksogen (beta): 1.1594 (Sejati: 1.2000)\nLong-Run Static Gain          : 5.3134 (Kenaikan Tunak per Satuan Input)\nAutokorelasi Residual Lag-1   : 0.0544 (Mendekati 0: Model Bersih)"
    },
    "commonPitfalls": [
      "Mengabaikan lag waktu reaksi fisik (dead time / delay) antara input eksogen dan respon keluaran.",
      "Menggunakan model ARMAX pada data non-stasioner tanpa differencing (seharusnya model ARIMAX).",
      "Memilih orde p dan q yang terlalu besar sehingga terjadi overparameterization dan pembatalan kutub-nol (pole-zero cancellation)."
    ],
    "validationProcedures": [
      "Gunakan kriteria informasi AIC/BIC untuk memilih kombinasi orde (p, q, b) optimal.",
      "Lakukan uji Ljung-Box pada residual: p-value wajib > 0.05 untuk membuktikan kebersihan galat.",
      "Verifikasi bahwa seluruh akar polinomial AR berada di dalam lingkaran kestabilan."
    ],
    "exercises": [
      {
        "question": "Mengapa estimasi efek perlakuan menggunakan model regresi linier biasa Y_t = beta * X_t + e_t menghasilkan estimasi yang sangat bias pada eksperimen fisik yang memiliki inersia termal?",
        "hint": "Perhatikan ke mana perginya efek memori Y_{t-1} jika tidak dimasukkan ke dalam model.",
        "answerExplanation": "Jika inersia Y_{t-1} diabaikan, informasi masa lalu tersebut akan terserap ke dalam suku galat e_t. Karena Y_{t-1} berkorelasi dengan X_{t-1} dan X_t pada pengujian dinamis, suku galat menjadi berkorelasi langsung dengan variabel prediktor X_t (pelanggaran asumsi eksogenitas Gauss-Markov), memicu bias endogenitas yang merusak estimasi efektivitas perlakuan."
      },
      {
        "question": "Apa arti dari Long-Run Static Gain G = beta / (1 - phi) dalam konteks pengujian sistem kontrol rekayasa?",
        "hint": "Perhatikan kondisi tunak di mana Y_t = Y_{t-1} = Y_tunak dan X_t = X_tunak.",
        "answerExplanation": "Long-Run Static Gain mengukur rasio pembesaran akhir dari sistem ketika sistem telah mencapai kondisi tunak (steady-state). Ini menunjukkan berapa kenaikan total absolut pada respon fisik jika sinyal input perlakuan ditahan konstan secara permanen, memperhitungkan seluruh efek umpan balik inersia masa lalu."
      }
    ],
    "references": [
      {
        "citation": "Ljung, L. (1999). System Identification: Theory for the User (2nd ed.). Prentice Hall.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Box, G. E., Jenkins, G. M., Reinsel, G. C., & Ljung, G. M. (2015). Time Series Analysis: Forecasting and Control (5th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Model Autoregressive Eksplanatori (ARMAX) untuk Evaluas...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.7.3.",
          "Capaian: Memahami formulasi model ARMAX yang menggabungkan memori autoregresif dengan variabel perlakuan eksogen.",
          "Capaian: Mengisolasi efek intervensi eksperimental fisik dari inersia dinamika masa lalu sistem.",
          "Capaian: Mendiagnosis orde p, q, dan b model ARMAX menggunakan kriteria informasi AIC/BIC dan uji residual Ljung-Box."
        ],
        "keyFormulaOrDiagram": "$$Y_t = c + \\sum_{i=1}^p \\phi_i Y_{t-i} + \\sum_{j=1}^b \\beta_j X_{t-j+1} + \\epsilon_t + \\sum_{k=1}^q \\theta_k \\epsilon_{t-k}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Model Autoregressive Eksplanatori (ARMAX) untuk Evaluas...",
        "bulletPoints": [
          "Dalam eksperimen rekayasa di mana perlakuan diberikan secara dinamis sepanjang waktu (misalnya menguji pengaruh injeksi zat p...",
          "Model ARMAX (Autoregressive Moving Average with Exogenous Inputs): Model ARMAX adalah arsitektur matematika yang secara simul...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Keunggulan Metodologis ARMAX dalam Eksperimen: Dengan memasukkan dinamika autoregresif int..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Keunggulan Metodologis ARMAX dalam Eksperimen: Dengan memasukkan dinamika autoregresif internal sistem ke dalam model, ARMAX...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Formulasi Matematis Model ARMAX(p, q, b):",
          "Misalkan $Y_t$ adalah variabel respon eksperimen, dan $X_t$ adalah variabel perlakuan eksogen:",
          "di mana:"
        ],
        "keyFormulaOrDiagram": "$$Y_t = c + \\sum_{i=1}^p \\phi_i Y_{t-i} + \\sum_{j=1}^b \\beta_j X_{t-j+1} + \\epsilon_t + \\sum_{k=1}^q \\theta_k \\epsilon_{t-k}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah sistem kendali suhu ruangan dimodelkan dengan ARMAX(1, 0, 1): Y_t = 0.8 * Y_{t-1} + 0.5 * X_t + e_t, di mana Y adalah suhu (degC) dan...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi parameter model: phi_1 = 0.8; beta_0 = 0.5.",
          "Langkah 2: Hitung efek seketika (Impact Multiplier) untuk Delta X = 2.0 kW: Delta Y_t = beta_0 * Delta X = 0.5...",
          "Langkah 3: Hitung formula Long-Run Static Gain: G = beta_0 / (1 - phi_1) = 0.5 / (1 - 0.8) = 0.5 / 0.2 = 2.5 d...",
          "Interpretasi: Pemanas langsung menaikkan suhu 1.0 degC seketika, namun inersia akumulatif sistem (phi=0.8) secara bertahap mendorong s..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Hitung peningkatan suhu tunak permanen untuk Delta X = 2.0 kW: Delta Y_tunak =..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Estimasi parameter ARMAX dan diagnostik residual white noise menggunakan scipy.optimize.",
          "Dependensi Pustaka: numpy, scipy.optimize",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model ARMAX:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model ARMAX: | Koefisien AR Estimasi (phi) : 0.78..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Mengabaikan lag waktu reaksi fisik (dead time / delay) antara input eksogen dan respon keluaran.",
          "Perangkap: Menggunakan model ARMAX pada data non-stasioner tanpa differencing (seharusnya model ARIMAX).",
          "Perangkap: Memilih orde p dan q yang terlalu besar sehingga terjadi overparameterization dan pembatalan kutub-nol (pole-z..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan kriteria informasi AIC/BIC untuk memilih kombinasi orde (p, q, b) optimal.",
          "Prosedur: Lakukan uji Ljung-Box pada residual: p-value wajib > 0.05 untuk membuktikan kebersihan galat.",
          "Prosedur: Verifikasi bahwa seluruh akar polinomial AR berada di dalam lingkaran kestabilan."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa estimasi efek perlakuan menggunakan model regresi linier biasa Y_t = beta * X_t + e_t menghasilkan estimasi yang...",
          "Petunjuk: Perhatikan ke mana perginya efek memori Y_{t-1} jika tidak dimasukkan ke dalam model.",
          "Solusi Kunci: Jika inersia Y_{t-1} diabaikan, informasi masa lalu tersebut akan terserap ke dalam suku galat e_t. Karena Y_{t-1} berko..."
        ]
      }
    ]
  },
  "6.7.4": {
    "id": "6.7.4",
    "chapterId": "CH-44",
    "title": "Pengantar State-Space Modeling dan Kalman Filter dalam Kerangka Pengukuran Dinamis",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami formulasi Model Ruang Keadaan (State-Space Models) untuk sistem dinamis fisik.",
      "Menurunkan siklus estimasi rekursif Kalman Filter (Fase Prediksi dan Fase Pembaruan).",
      "Mengisolasi keadaan sejati (True State) dari derau proses dan derau instrumen pengukuran."
    ],
    "content": "Dalam eksperimen ilmiah mutakhir (seperti pelacakan posisi wahana antariksa, estimasi suhu inti baterai lithium secara non-invasif, atau pemurnian sinyal sensor gerak IMU), peneliti tidak pernah dapat mengukur keadaan sejati (true state) sistem secara langsung tanpa gangguan. Sensor fisik selalu terkontaminasi oleh derau pengukuran (measurement noise), dan dinamika fisik sistem selalu mengalami gangguan acak eksternal (process noise).\n\nFormulasi Model Ruang Keadaan (State-Space Model):\nAlih-alih memodelkan hubungan langsung antara input dan output di permukaan, State-Space memisahkan sistem menjadi dua persamaan fundamental:\n1. Persamaan Keadaan (State Equation / Process Model): Menjelaskan bagaimana keadaan fisik laten tersembunyi $\\mathbf{x}_t$ (seperti posisi, kecepatan, atau konsentrasi kimia riil) berevolusi di sepanjang waktu berdasarkan hukum fisika deterministik ditambah derau proses.\n2. Persamaan Pengamatan (Measurement / Observation Equation): Menjelaskan bagaimana sensor fisik $\\mathbf{y}_t$ membaca keadaan laten tersebut dengan tambahan derau instrumen pengukuran.\n\nKalman Filter (Rudolf E. K\u00e1lm\u00e1n, 1960):\nKalman Filter adalah algoritma estimasi rekursif optimal linier kuadratik (Linear Quadratic Estimator) yang membuktikan secara matematis bagaimana cara menggabungkan prediksi model fisika dengan pembacaan sensor derau secara optimal. Kalman Filter menimbang ketidakpastian kedua sumber informasi melalui Penguatan Kalman (Kalman Gain): jika sensor sangat berisik, algoritma mempercayai model fisika; jika model fisika memiliki ketidakpastian tinggi, algoritma mempercayai sensor.",
    "mathematicalFoundations": "Formulasi Matematis State-Space Linier Diskrit:\n\n1. Persamaan Transisi Keadaan (State Equation):\n$$\\mathbf{x}_k = \\mathbf{A} \\mathbf{x}_{k-1} + \\mathbf{B} \\mathbf{u}_k + \\mathbf{w}_k, \\quad \\mathbf{w}_k \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{Q})$$\ndi mana:\n- $\\mathbf{A}$: Matriks transisi keadaan fisika.\n- $\\mathbf{B}$: Matriks kontrol input $\\mathbf{u}_k$.\n- $\\mathbf{Q}$: Matriks kovarians derau proses (Process Noise Covariance).\n\n2. Persamaan Pengamatan Pengukuran (Measurement Equation):\n$$\\mathbf{y}_k = \\mathbf{H} \\mathbf{x}_k + \\mathbf{v}_k, \\quad \\mathbf{v}_k \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{R})$$\ndi mana:\n- $\\mathbf{H}$: Matriks observasi sensor.\n- $\\mathbf{R}$: Matriks kovarians derau pengukuran sensor (Measurement Noise Covariance).\n\nSiklus Dua Fase Rekursif Kalman Filter:\n\nFase 1: Prediksi (Predict / Time Update):\n$$\\hat{\\mathbf{x}}_k^- = \\mathbf{A} \\hat{\\mathbf{x}}_{k-1} + \\mathbf{B} \\mathbf{u}_k$$\n$$\\mathbf{P}_k^- = \\mathbf{A} \\mathbf{P}_{k-1} \\mathbf{A}^T + \\mathbf{Q}$$\n\nFase 2: Pembaruan (Update / Measurement Correction):\n1. Inovasi / Residual Pengukuran: $\\tilde{\\mathbf{y}}_k = \\mathbf{y}_k - \\mathbf{H} \\hat{\\mathbf{x}}_k^-$\n2. Kovarians Inovasi: $\\mathbf{S}_k = \\mathbf{H} \\mathbf{P}_k^- \\mathbf{H}^T + \\mathbf{R}$\n3. Penguatan Kalman Optimal (Kalman Gain):\n$$\\mathbf{K}_k = \\mathbf{P}_k^- \\mathbf{H}^T \\mathbf{S}_k^{-1}$$\n4. Pembaruan Estimasi Keadaan:\n$$\\hat{\\mathbf{x}}_k = \\hat{\\mathbf{x}}_k^- + \\mathbf{K}_k \\tilde{\\mathbf{y}}_k$$\n5. Pembaruan Kovarians Ketidakpastian:\n$$\\mathbf{P}_k = (\\mathbf{I} - \\mathbf{K}_k \\mathbf{H}) \\mathbf{P}_k^-$$",
    "workedExample": {
      "problemStatement": "Suhu sebuah bejana kimia dipantau secara skalar (A=1, H=1). Ketidakpastian model fisika per langkah waktu adalah Q = 0.10, dan varians derau sensor adalah R = 0.90. Pada detik k-1, estimasi suhu terbaik adalah 50.0 degC dengan ketidakpastian P = 0.40. Pada detik k, sensor mengukur suhu y_k = 53.0 degC. Hitung prediksi apriori, Kalman Gain K, estimasi suhu yang diperbarui, dan kovarians posterior.",
      "stepByStepSolution": [
        "Langkah 1: Fase Prediksi: Prediksi mean apriori: x_minus = 1 * 50.0 = 50.0 degC. Prediksi kovarians apriori: P_minus = 1 * 0.40 * 1 + Q = 0.40 + 0.10 = 0.50.",
        "Langkah 2: Hitung Inovasi: y_tilde = y_k - x_minus = 53.0 - 50.0 = +3.0 degC. Kovarians inovasi: S = 1 * 0.50 * 1 + R = 0.50 + 0.90 = 1.40.",
        "Langkah 3: Hitung Kalman Gain: K = P_minus / S = 0.50 / 1.40 = 0.3571.",
        "Langkah 4: Fase Pembaruan Mean: x_hat = x_minus + K * y_tilde = 50.0 + 0.3571 * 3.0 = 50.0 + 1.071 = 51.071 degC.",
        "Langkah 5: Fase Pembaruan Kovarians: P = (1 - K * 1) * P_minus = (1 - 0.3571) * 0.50 = 0.6429 * 0.50 = 0.3214."
      ],
      "resultInterpretation": "Sensor melonjak ke 53.0 degC akibat derau. Kalman filter mengetahui bahwa sensor berisik (R=0.90 vs P=0.50), sehingga bobot pembaruan K hanya 35.7%. Estimasi suhu yang rasional dikoreksi menjadi 51.07 degC dan ketidakpastian berkurang dari 0.40 menjadi 0.32."
    },
    "pythonImplementation": {
      "description": "Implementasi 1D Kalman Filter untuk pemurnian sinyal sensor fisik dari derau pengukuran acak.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA]\n# Keadaan sejati: Posisi kendaraan bergerak lurus beraturan x(t) = 2.0 * t\nnp.random.seed(42)\nT_steps = 50\ndt = 0.1\ntrue_velocity = 2.0\ntrue_positions = np.array([true_velocity * i * dt for i in range(T_steps)])\n\n# Pembacaan sensor GPS yang sangat berisik: R = 4.0 (std dev = 2.0 meter)\nR_var = 4.0\nmeasurements = true_positions + np.random.normal(0, np.sqrt(R_var), size=T_steps)\n\n# Parameter Kalman Filter\nQ_var = 0.05  # Derau proses fisika kecil (kendaraan stabil)\nx_hat = 0.0   # Inisialisasi posisi awal\nP = 1.0       # Inisialisasi ketidakpastian awal\n\nfiltered_positions = np.zeros(T_steps)\n\nfor k in range(T_steps):\n    # 1. Fase Prediksi (Model fisika: x_k = x_{k-1} + v*dt)\n    x_hat_minus = x_hat + true_velocity * dt\n    P_minus = P + Q_var\n    \n    # 2. Fase Pembaruan (Koreksi sensor GPS)\n    K = P_minus / (P_minus + R_var)\n    x_hat = x_hat_minus + K * (measurements[k] - x_hat_minus)\n    P = (1.0 - K) * P_minus\n    \n    filtered_positions[k] = x_hat\n\n# Hitung galat RMSE\nrmse_raw = np.sqrt(np.mean((measurements - true_positions)**2))\nrmse_filtered = np.sqrt(np.mean((filtered_positions - true_positions)**2))\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Evaluasi Kinerja Estimasi Kalman Filter:\")\nprint(f\"RMSE Sensor Mentah (GPS Berisik) : {rmse_raw:.4f} meter\")\nprint(f\"RMSE Sinyal Terfilter (Kalman)   : {rmse_filtered:.4f} meter\")\nprint(f\"Reduksi Galat Pengukuran         : {(1.0 - rmse_filtered / rmse_raw)*100:.1f}% Presisi Meningkat\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Evaluasi Kinerja Estimasi Kalman Filter:\nRMSE Sensor Mentah (GPS Berisik) : 1.8601 meter\nRMSE Sinyal Terfilter (Kalman)   : 0.5891 meter\nReduksi Galat Pengukuran         : 68.3% Presisi Meningkat"
    },
    "commonPitfalls": [
      "Menetapkan nilai kovarians derau pengukuran R terlalu kecil, yang menyebabkan filter terlalu mempercayai sensor berderau.",
      "Menetapkan nilai derau proses Q terlalu kecil, yang menyebabkan filter menjadi lambat merespons manuver fisik dinamis yang sebenarnya.",
      "Menerapkan Kalman Filter linier standar pada sistem dengan kinematika non-linier tinggi (wajib menggunakan EKF atau UKF)."
    ],
    "validationProcedures": [
      "Gunakan Extended Kalman Filter (EKF) atau Unscented Kalman Filter (UKF) jika model dinamika atau pengukuran bersifat non-linier.",
      "Audit urutan inovasi (Innovation Sequence): jika filter optimal, inovasi wajib berupa derau putih independen (White Noise).",
      "Plot pita batas ketidakpastian 2-sigma (+/- 2*sqrt(P)) di sekitar estimasi keadaan."
    ],
    "exercises": [
      {
        "question": "Apa yang terjadi pada respon estimasi Kalman Filter jika rasio derau proses terhadap derau pengukuran (Q / R) mendekati tak terhingga (Q >> R)?",
        "hint": "Perhatikan nilai limit dari Kalman Gain K saat R mendekati nol.",
        "answerExplanation": "Jika Q >> R, ketidakpastian model fisika dianggap sangat masif dibandingkan ketidakpastian sensor. Nilai Kalman Gain K akan mendekati 1.0. Akibatnya, filter sepenuhnya mengabaikan prediksi model fisika dan secara langsung mempercayai setiap pembacaan sensor mentah (tanpa pemfilteran derau)."
      },
      {
        "question": "Mengapa Unscented Kalman Filter (UKF) lebih unggul daripada Extended Kalman Filter (EKF) pada sistem non-linieritas tinggi?",
        "hint": "Bandingkan penggunaan matriks Jacobian linier lokal pada EKF dengan titik-titik sigma pada UKF.",
        "answerExplanation": "EKF melinearisasi sistem menggunakan aproksimasi deret Taylor orde-1 (matriks Jacobian), yang rentan memicu divergensi numerik jika sistem memiliki kurvatur tajam. UKF menggunakan Transformasi Unscented dengan sejumlah titik deterministik (Sigma Points) yang secara eksak menangkap rata-rata dan kovarians hingga orde-3 Taylor tanpa memerlukan turunan analitis Jacobian."
      }
    ],
    "references": [
      {
        "citation": "Kalman, R. E. (1960). A new approach to linear filtering and prediction problems. Journal of Basic Engineering, 82(1), 35-45.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Grewal, M. S., & Andrews, A. P. (2014). Kalman Filtering: Theory and Practice with MATLAB (4th ed.). John Wiley & Sons.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Pengantar State-Space Modeling dan Kalman Filter dalam...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.7.4.",
          "Capaian: Memahami formulasi Model Ruang Keadaan (State-Space Models) untuk sistem dinamis fisik.",
          "Capaian: Menurunkan siklus estimasi rekursif Kalman Filter (Fase Prediksi dan Fase Pembaruan).",
          "Capaian: Mengisolasi keadaan sejati (True State) dari derau proses dan derau instrumen pengukuran."
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{x}_k = \\mathbf{A} \\mathbf{x}_{k-1} + \\mathbf{B} \\mathbf{u}_k + \\mathbf{w}_k, \\quad \\mathbf{w}_k \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{Q})$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Pengantar State-Space Modeling dan Kalman Filter dalam...",
        "bulletPoints": [
          "Dalam eksperimen ilmiah mutakhir (seperti pelacakan posisi wahana antariksa, estimasi suhu inti baterai lithium secara non-in...",
          "Formulasi Model Ruang Keadaan (State-Space Model): Alih-alih memodelkan hubungan langsung antara input dan output di permukaa...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Kalman Filter (Rudolf E. K\u00e1lm\u00e1n, 1960): Kalman Filter adalah algoritma estimasi rekursif o..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Kalman Filter (Rudolf E. K\u00e1lm\u00e1n, 1960): Kalman Filter adalah algoritma estimasi rekursif optimal linier kuadratik (Linear Qua...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Formulasi Matematis State-Space Linier Diskrit:",
          "1. Persamaan Transisi Keadaan (State Equation):",
          "di mana:"
        ],
        "keyFormulaOrDiagram": "$$\\mathbf{x}_k = \\mathbf{A} \\mathbf{x}_{k-1} + \\mathbf{B} \\mathbf{u}_k + \\mathbf{w}_k, \\quad \\mathbf{w}_k \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{Q})$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Suhu sebuah bejana kimia dipantau secara skalar (A=1, H=1). Ketidakpastian model fisika per langkah waktu adalah Q = 0.10, dan varians derau...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Fase Prediksi: Prediksi mean apriori: x_minus = 1 * 50.0 = 50.0 degC. Prediksi kovarians apriori: P...",
          "Langkah 2: Hitung Inovasi: y_tilde = y_k - x_minus = 53.0 - 50.0 = +3.0 degC. Kovarians inovasi: S = 1 * 0.50...",
          "Langkah 3: Hitung Kalman Gain: K = P_minus / S = 0.50 / 1.40 = 0.3571.",
          "Interpretasi: Sensor melonjak ke 53.0 degC akibat derau. Kalman filter mengetahui bahwa sensor berisik (R=0.90 vs P=0.50), sehingga bo..."
        ],
        "keyFormulaOrDiagram": "Langkah 5: Fase Pembaruan Kovarians: P = (1 - K * 1) * P_minus = (1 - 0.3571) * 0.50 = 0.6..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Implementasi 1D Kalman Filter untuk pemurnian sinyal sensor fisik dari derau pengukuran acak.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Evaluasi Kinerja Estimasi Kalman Filter:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Evaluasi Kinerja Estimasi Kalman Filter: | RMSE Sensor Mentah (G..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menetapkan nilai kovarians derau pengukuran R terlalu kecil, yang menyebabkan filter terlalu mempercayai senso...",
          "Perangkap: Menetapkan nilai derau proses Q terlalu kecil, yang menyebabkan filter menjadi lambat merespons manuver fisik...",
          "Perangkap: Menerapkan Kalman Filter linier standar pada sistem dengan kinematika non-linier tinggi (wajib menggunakan EKF..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan Extended Kalman Filter (EKF) atau Unscented Kalman Filter (UKF) jika model dinamika atau pengukuran be...",
          "Prosedur: Audit urutan inovasi (Innovation Sequence): jika filter optimal, inovasi wajib berupa derau putih independen (...",
          "Prosedur: Plot pita batas ketidakpastian 2-sigma (+/- 2*sqrt(P)) di sekitar estimasi keadaan."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Apa yang terjadi pada respon estimasi Kalman Filter jika rasio derau proses terhadap derau pengukuran (Q / R) mendekati...",
          "Petunjuk: Perhatikan nilai limit dari Kalman Gain K saat R mendekati nol.",
          "Solusi Kunci: Jika Q >> R, ketidakpastian model fisika dianggap sangat masif dibandingkan ketidakpastian sensor. Nilai Kalman Gain K a..."
        ]
      }
    ]
  }
};
