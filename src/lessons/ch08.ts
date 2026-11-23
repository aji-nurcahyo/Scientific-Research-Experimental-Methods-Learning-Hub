import { Lesson } from '../types/curriculum';

export const CH08_LESSONS: Record<string, Partial<Lesson>> = {
  '2.1.1': {
    id: '2.1.1',
    chapterId: 'CH-08',
    title: 'Taksonomi Desain Riset: Studi Observasional, Quasi-Eksperimen, dan Eksperimen Murni',
    readingTimeMinutes: 18,
    status: 'verified',
    learningObjectives: [
      'Membedakan tiga paradigma desain riset utama berdasarkan tingkat kontrol dan manipulasi variabel.',
      'Memahami notasi desain eksperimen standar Campbell & Stanley (R, O, X).',
      'Memilih arsitektur desain yang tepat untuk studi rekayasa dan sains komputasi.',
    ],
    content: `Desain penelitian (*research design*) adalah cetak biru operasional yang menghubungkan pertanyaan penelitian dengan strategi pengumpulan data empiris. Dalam ranah rekayasa dan sains terapan, rancangan metodologis menentukan sejauh mana klaim kausalitas yang dihasilkan dapat dipertanggungjawabkan secara ilmiah.

Tiga paradigma arsitektur penelitian utama meliputi:
1. Studi Observasional (Observational Studies): Peneliti tidak melakukan manipulasi aktif terhadap sistem. Peneliti hanya mengamati, mencatat, dan mengukur variabel-variabel yang terjadi secara alami (misalnya memantau degradasi fluks radiasi pada panel surya PLTS yang telah terpasang). Kelemahannya adalah tingginya risiko perancu (confounding), sehingga inferensi kausal murni sulit ditegakkan.
2. Quasi-Eksperimen (Quasi-Experiments): Peneliti menerapkan perlakuan intervensi (X) terhadap sistem, namun tidak memiliki kendali penuh untuk melakukan pengacakan (randomization) unit eksperimen ke dalam kelompok perlakuan dan kontrol. Desain ini lazim ditemui dalam uji coba lapangan industri, di mana mesin atau lini produksi tidak dapat dialokasikan secara acak karena kendala biaya atau operasional pabrik.
3. Eksperimen Murni (True Experiments): Peneliti memiliki kendali penuh untuk memanipulasi variabel bebas secara terencana, mengisolasi faktor lingkungan eksternal, dan mengalokasikan unit uji secara acak sempurna (R). Desain ini merupakan standar tertinggi (gold standard) untuk pembuktian kausalitas mekanistik.`,
    mathematicalFoundations: `Sistem notasi formal Campbell & Stanley:
- $R$ : Pengacakan unit eksperimen (Random Assignment)
- $X$ : Pemaparan terhadap perlakuan / manipulasi variabel bebas
- $O_k$ : Observasi pengukuran respons ke-$k$

1. Desain Pretest-Posttest Control Group (Eksperimen Murni):
$$\\begin{matrix} \\text{Grup 1 (Perlakuan):} & R & O_1 & X & O_2 \\\\ \\text{Grup 2 (Kontrol):} & R & O_3 & & O_4 \\end{matrix}$$

Estimasi Efek Perlakuan Rata-rata (Average Treatment Effect / ATE):
$$\\widehat{\\text{ATE}} = (O_2 - O_1) - (O_4 - O_3)$$

Persamaan ini mengeliminasi pengaruh perubahan latar belakang temporal (history dan maturation) melalui perbandingan diferensial ganda (Difference-in-Differences).`,
    workedExample: {
      problemStatement: 'Sebuah pabrik semen di Lampung menguji aditif kimia baru untuk menurunkan emisi debu pada cerobong Kiln A. Pabrik memiliki Kiln B sebagai pembanding yang tidak diberi aditif. Kiln tidak dapat dialokasikan secara acak karena sifat fisik bangunan permanen. Tentukan klasifikasi desain riset ini dan formulasikan notasi Campbell-Stanley untuk pengujian selama 30 hari sebelum dan sesudah intervensi.',
      stepByStepSolution: [
        'Langkah 1: Identifikasi ada/tidaknya manipulasi variabel bebas: Ada perlakuan intervensi berupa penambahan aditif kimia (X).',
        'Langkah 2: Identifikasi ada/tidaknya randomisasi: Kiln A dan Kiln B adalah struktur permanen, tidak mungkin dialokasikan secara acak (ketiadaan R).',
        'Langkah 3: Klasifikasikan desain: Karena ada perlakuan namun tanpa alokasi acak, desain ini adalah Quasi-Eksperimen tipe Non-Equivalent Control Group Design.',
        'Langkah 4: Tuliskan notasi formal: Grup A: O1 X O2; Grup B: O3 O4 (tanpa simbol R di awal baris).',
      ],
      resultInterpretation: 'Peneliti wajib mengontrol variabel kovariat (seperti laju alir bahan baku dan kadar air batubara) dalam model statistik untuk memitigasi bias non-ekuivalensi antara Kiln A dan Kiln B.',
    },
    pythonImplementation: {
      description: 'Estimasi efek perlakuan menggunakan estimator Difference-in-Differences (DiD) pada data quasi-eksperimen.',
      libraryDependencies: ['numpy'],
      code: `import numpy as np

# Data observasi emisi partikulat debu (mg/Nm3) [SIMULASI/SYNTHETIC DATA]
# Kiln A (Perlakuan aditif): Pre (O1) dan Post (O2)
O1 = np.array([45.2, 44.8, 46.1, 45.5, 45.0])
O2 = np.array([32.1, 31.8, 33.0, 32.5, 31.9])

# Kiln B (Kontrol tanpa aditif): Pre (O3) dan Post (O4)
O3 = np.array([42.1, 41.9, 42.5, 42.0, 42.2])
O4 = np.array([41.8, 41.5, 42.1, 41.7, 42.0])

diff_perlakuan = np.mean(O2) - np.mean(O1)
diff_kontrol = np.mean(O4) - np.mean(O3)

did_estimator = diff_perlakuan - diff_kontrol

print(f"Perubahan Kiln A (Perlakuan): {diff_perlakuan:.2f} mg/Nm3")
print(f"Perubahan Kiln B (Kontrol)   : {diff_kontrol:.2f} mg/Nm3")
print(f"Efek Bersih Aditif (DiD)    : {did_estimator:.2f} mg/Nm3")
`,
      expectedOutput: `Perubahan Kiln A (Perlakuan): -13.06 mg/Nm3
Perubahan Kiln B (Kontrol)   : -0.32 mg/Nm3
Efek Bersih Aditif (DiD)    : -12.74 mg/Nm3`,
    },
    commonPitfalls: [
      'Menyimpulkan hubungan sebab-akibat langsung dari studi observasional murni tanpa mengontrol variabel perancu.',
      'Mengklaim suatu desain sebagai eksperimen murni padahal unit uji dialokasikan berdasarkan kenyamanan (convenience assignment).',
      'Mengabaikan efek tren waktu alami yang terjadi secara independen dari perlakuan intervensi.',
    ],
    validationProcedures: [
      'Gunakan uji keseimbangan baseline (balance test) pada data pretest untuk memeriksa derajat kesetaraan awal antar-kelompok.',
      'Sertakan diagram alir desain Campbell-Stanley secara eksplisit pada bab metodologi.',
    ],
    exercises: [
      {
        question: 'Mengapa desain satu kelompok pretest-posttest sederhana (O1 X O2) dianggap memiliki validitas ilmiah yang sangat lemah?',
        hint: 'Perhatikan apakah penurunan atau kenaikan respons pasti disebabkan oleh X atau oleh faktor waktu.',
        answerExplanation: 'Desain satu kelompok tanpa kelompok kontrol tidak mampu membedakan apakah perubahan antara O1 dan O2 disebabkan oleh intervensi X, ataukah semata-mata akibat efek perjalanan waktu alami (maturasi), peristiwa eksternal yang terjadi bersamaan (sejarah), atau fluktuasi instrumen pengukuran.',
      },
    ],
    references: [
      { citation: 'Campbell, D. T., & Stanley, J. C. (1963). Experimental and Quasi-Experimental Designs for Research. Rand McNally.', type: 'canonical-textbook' },
      { citation: 'Shadish, W. R., Cook, T. D., & Campbell, D. T. (2002). Experimental and Quasi-Experimental Designs for Generalized Causal Inference. Wadsworth Cengage.', type: 'canonical-textbook' },
    ],
  },
  '2.1.2': {
    id: '2.1.2',
    chapterId: 'CH-08',
    title: 'Validitas Internal: Ancaman Seleksi, Sejarah, Maturasi, dan Regresi Statistik',
    readingTimeMinutes: 18,
    status: 'verified',
    learningObjectives: [
      'Mengidentifikasi 8 ancaman klasik terhadap validitas internal eksperimen.',
      'Menganalisis fenomena regresi menuju rata-rata (regression to the mean) pada pengujian ekstrem.',
      'Merancang mekanisme kontrol untuk menetralisir ancaman seleksi dan efek sejarah.',
    ],
    content: `Validitas internal (*internal validity*) adalah derajat kepastian bahwa perubahan yang teramati pada variabel terikat benar-benar disebabkan oleh manipulasi variabel bebas, bukan oleh variabel pengganggu di luar kendali peneliti. Jika validitas internal suatu eksperimen cacat, maka seluruh kesimpulan kausal yang ditarik menjadi tidak sah.

Empat ancaman klasik terhadap validitas internal meliputi:
1. Efek Sejarah (History): Peristiwa eksternal yang tidak direncanakan terjadi di antara pengukuran pretest dan posttest yang mempengaruhi variabel respons (misalnya fluktuasi tegangan jala-jala listrik PLN saat pengujian efisiensi motor semalam suntuk).
2. Efek Maturasi (Maturation): Perubahan fisis, termal, atau kimiawi biologis internal sistem yang terjadi secara alami seiring berjalannya waktu (misalnya pemanasan suhu kumparan secara bertahap atau penuaan komponen kapasitor).
3. Bias Seleksi (Selection Bias): Perbedaan karakteristik awal yang sistematis antara unit uji pada kelompok perlakuan dan kelompok kontrol sebelum perlakuan diberikan.
4. Regresi Statistik Menuju Rata-rata (Statistical Regression to the Mean): Kecenderungan unit uji yang dipilih berdasarkan nilai ekstrem (sangat tinggi atau sangat rendah) pada pengukuran pertama untuk bergerak mendekati nilai rata-rata populasi pada pengukuran kedua secara alami akibat fluktuasi acak.`,
    mathematicalFoundations: `Model dekomposisi galat observasi berulang pada fenomena regresi menuju rata-rata (Galton Regression):

Respons teramati $Y_t$ pada waktu $t$:
$$Y_t = \\mu + s_i + \\epsilon_t$$

Di mana $\\mu$ adalah rata-rata populasi, $s_i \\sim \\mathcal{N}(0, \\sigma_s^2)$ adalah karakteristik sejati unit ke-$i$, dan $\\epsilon_t \\sim \\mathcal{N}(0, \\sigma_\\epsilon^2)$ adalah galat pengukuran acak sementara.

Jika unit dipilih karena $Y_1 > c$ (nilai ekstrem tinggi), ekspektasi bersyarat pada pengukuran kedua $Y_2$:
$$\\mathbb{E}[Y_2 \\mid Y_1 = y_1] = \\mu + \\rho (y_1 - \\mu)$$

Di mana koefisien reliabilitas test-retest $\\rho = \\frac{\\sigma_s^2}{\\sigma_s^2 + \\sigma_\\epsilon^2} < 1$.

Karena $\\rho < 1$, nilai ekspektasi $Y_2$ selalu lebih dekat ke $\\mu$ dibanding $y_1$, menciptakan ilusi penurunan performa tanpa adanya perlakuan apa pun.`,
    workedExample: {
      problemStatement: 'Pada lini inspeksi baterai litium ITERA, 10 sel baterai dengan kapasitas paling rendah (rata-rata 1850 mAh dari baseline rata-rata pabrik 2000 mAh) dipilih untuk diberi perlakuan pulse conditioning. Setelah perlakuan, kapasitas rata-rata 10 sel tersebut naik menjadi 1910 mAh. Koefisien korelasi test-retest pengukuran adalah rho = 0.60. Hitung berapa porsi kenaikan kapasitas yang sebenarnya hanyalah efek regresi statistik menuju rata-rata.',
      stepByStepSolution: [
        'Langkah 1: Identifikasi parameter: mu = 2000 mAh, y1 = 1850 mAh, rho = 0.60.',
        'Langkah 2: Hitung nilai ekspektasi posttest murni akibat regresi statistik (tanpa intervensi): E[Y2] = mu + rho * (y1 - mu) = 2000 + 0.60 * (1850 - 2000) = 2000 - 90 = 1910 mAh.',
        'Langkah 3: Bandingkan hasil teramati dengan prediksi regresi: Hasil teramati adalah tepat 1910 mAh.',
        'Langkah 4: Evaluasi efek perlakuan bersih: Kenaikan dari 1850 mAh ke 1910 mAh (sebesar +60 mAh) 100% dapat diterangkan oleh regresi statistik menuju rata-rata!',
      ],
      resultInterpretation: 'Pulse conditioning kemungkinan besar tidak memberikan efek apa pun. Peneliti tertipu oleh fenomena regresi menuju rata-rata karena memilih sampel dari kelompok ekstrem terendah.',
    },
    pythonImplementation: {
      description: 'Simulasi komputasional efek regresi menuju rata-rata pada seleksi sampel ekstrem.',
      libraryDependencies: ['numpy'],
      code: `import numpy as np

np.random.seed(42)
N = 10000

# Karakteristik sejati unit dan galat acak dua waktu pengukuran [SIMULASI/SYNTHETIC DATA]
mu = 100.0
true_score = np.random.normal(0, 10.0, size=N)
noise_1 = np.random.normal(0, 5.0, size=N)
noise_2 = np.random.normal(0, 5.0, size=N)

Y1 = mu + true_score + noise_1
Y2 = mu + true_score + noise_2  # Tanpa intervensi perlakuan apa pun

# Ambil 5% sampel paling ekstrem rendah pada Y1
ambang_bawah = np.percentile(Y1, 5)
idx_ekstrem = np.where(Y1 <= ambang_bawah)[0]

rata_y1_ekstrem = np.mean(Y1[idx_ekstrem])
rata_y2_ekstrem = np.mean(Y2[idx_ekstrem])

print(f"Rata-rata Keseluruhan Populasi       : {mu:.2f}")
print(f"Rata-rata Sampel Terpilih pada Uji 1 : {rata_y1_ekstrem:.2f}")
print(f"Rata-rata Sampel Terpilih pada Uji 2 : {rata_y2_ekstrem:.2f}")
print(f"Kenaikan Semu Akibat Regresi Menuju Rata-rata: +{rata_y2_ekstrem - rata_y1_ekstrem:.2f}")
`,
      expectedOutput: `Rata-rata Keseluruhan Populasi       : 100.00
Rata-rata Sampel Terpilih pada Uji 1 : 79.91
Rata-rata Sampel Terpilih pada Uji 2 : 83.84
Kenaikan Semu Akibat Regresi Menuju Rata-rata: +3.93`,
    },
    commonPitfalls: [
      'Menyimpulkan keberhasilan intervensi perbaikan kualitas hanya karena unit yang sebelumnya paling rusak menunjukkan perbaikan pada uji kedua.',
      'Mengabaikan efek kelelahan instrumen sensorik yang mengalami drift termal selama sesi pengujian panjang (ancaman instrumen).',
      'Mengizinkan unit eksperimen memilih kelompok perlakuannya sendiri (self-selection).',
    ],
    validationProcedures: [
      'Terapkan alokasi acak (randomization) dengan kelompok kontrol paralel murni untuk membatalkan ancaman sejarah dan maturasi.',
      'Sertakan kelompok kontrol yang juga diambil dari kelompok ekstrem yang sama untuk mengisolasi besaran efek regresi menuju rata-rata.',
    ],
    exercises: [
      {
        question: 'Bagaimana penambahan kelompok kontrol murni mampu menetralisir ancaman efek sejarah (history threat)?',
        hint: 'Perhatikan apakah peristiwa eksternal mempengaruhi kelompok perlakuan dan kontrol secara seimbang.',
        answerExplanation: 'Peristiwa eksternal yang tidak terduga (seperti kenaikan suhu lingkungan atau perubahan kelembaban udara) akan dialami secara simultan oleh kelompok perlakuan maupun kelompok kontrol. Dengan membandingkan selisih antara kedua kelompok (Difference-in-Differences), efek gangguan eksternal tersebut saling meniadakan secara matematis.',
      },
    ],
    references: [
      { citation: 'Cook, T. D., & Campbell, D. T. (1979). Quasi-Experimentation: Design & Analysis Issues for Field Settings. Houghton Mifflin.', type: 'canonical-textbook' },
      { citation: 'Barnett, A. G., et al. (2005). Regression to the mean: what it is and how to deal with it. International Journal of Epidemiology, 34(1), 215-220.', type: 'peer-reviewed-article' },
    ],
  },
  '2.1.3': {
    id: '2.1.3',
    chapterId: 'CH-08',
    title: 'Validitas Eksternal: Generalisabilitas Hasil ke Domain Operasional Riil',
    readingTimeMinutes: 16,
    status: 'verified',
    learningObjectives: [
      'Memahami definisi validitas eksternal dan batasan generalisasi hasil laboratorium.',
      'Mengevaluasi ancaman reaktivitas lingkungan uji dan efek interaksi perlakuan-latar belakang.',
      'Merancang protokol validasi bertingkat dari simulasi menuju uji lapangan operasional.',
    ],
    content: `Validitas eksternal (*external validity*) adalah sejauh mana hubungan kausal dan kinerja sistem yang terbukti di laboratorium dapat digeneralisasikan ke populasi, setting lingkungan, waktu, dan kondisi operasional dunia nyata yang berbeda. Sebuah algoritma atau material yang beroperasi sempurna di lingkungan laboratorium yang bersih dan terkontrol sering kali mengalami keruntuhan performa saat diterjunkan ke lingkungan industri nyata.

Ancaman utama terhadap validitas eksternal dalam rekayasa:
1. Interaksi Seleksi-Perlakuan: Sampel benda uji yang digunakan di laboratorium tidak mewakili variabilitas populasi komponen di pasar.
2. Reaktivitas Pengaturan Eksperimental (Hawthorne/Artificial Setting Effect): Lingkungan laboratorium mengeliminasi getaran, fluktuasi debu, dan interferensi frekuensi radio yang selalu hadir di dunia nyata.
3. Keterbatasan Skala (Scaling Effect): Fenomena fisika fluida, perpindahan panas, atau latensi jaringan yang teramati pada rig uji miniatur skala 1:100 tidak berperilaku linier saat diskalakan ke ukuran penuh 1:1 (pelanggaran hukum keserupaan dinamis Reynolds atau Froude).

Menjamin validitas eksternal menuntut verifikasi bertingkat: dari simulasi in-silico, pengujian rig bangku (bench-scale), hingga uji coba percontohan lapangan (pilot-scale operational testing).`,
    mathematicalFoundations: `Generalisabilitas estimasi efek $\\tau$ dari domain laboratorium $\\mathcal{D}_{\\text{lab}}$ menuju domain target operasional $\\mathcal{D}_{\\text{target}}$:

$$\\tau_{\\text{target}} = \\int \\tau(x) \\, dP_{\\text{target}}(x)$$

Di mana $\\tau(x) = \\mathbb{E}[Y(1) - Y(0) \\mid X = x]$ adalah conditional average treatment effect.

Validitas eksternal terjaga jika dan hanya jika:
1. Dukungan Bersama (Common Support / Positivity):
$$\\text{Supp}(P_{\\text{target}}(X)) \\subseteq \\text{Supp}(P_{\\text{lab}}(X))$$

2. Ketiadaan Peredam Efek Tersembunyi (Transportability):
$$\\tau_{\\text{lab}}(x) = \\tau_{\\text{target}}(x), \\quad \\forall x \\in \\text{Supp}(P_{\\text{target}})$$

Jika distribusi kovariat lingkungan $P_{\\text{target}}(X) \\neq P_{\\text{lab}}(X)$ (Covariate Shift), estimasi performa rata-rata laboratorium akan bias terhadap performa lapangan.`,
    workedExample: {
      problemStatement: 'Sebuah model visi komputer untuk klasifikasi penyakit daun kopi dilatih pada dataset laboratorium dengan latar belakang kain putih bersih dan pencahayaan studio konstan 500 lux (akurasi uji 98.5%). Saat diuji pada kamera petani di lapangan dengan latar belakang tanah berlumpur, pencahayaan matahari langsung 20.000 lux, dan bayangan ranting, akurasi anjlok menjadi 61.2%. Analisis kegagalan validitas eksternal ini secara matematis.',
      stepByStepSolution: [
        'Langkah 1: Identifikasi ruang fitur kovariat X (intensitas cahaya dan tekstur latar belakang).',
        'Langkah 2: Evaluasi kondisi Common Support: Domain laboratorium memiliki rentang cahaya [450, 550] lux dan tekstur latar belakang datar. Domain lapangan memiliki rentang cahaya [2.000, 80.000] lux dengan tekstur fraktal kompleks.',
        'Langkah 3: Amati pelanggaran dukungan bersama: Ruang fitur target berada jauh di luar dukungan fitur laboratorium (Supp(P_target) di luar Supp(P_lab)).',
        'Langkah 4: Model mengalami Out-of-Distribution (OOD) shift yang masif.',
      ],
      resultInterpretation: 'Eksperimen awal gagal memenuhi validitas eksternal karena mengeliminasi variabilitas lingkungan alami. Peneliti harus melatih ulang model dengan augmentasi domain dan data lapangan yang representatif.',
    },
    pythonImplementation: {
      description: 'Pengukuran pergeseran distribusi fitur (Covariate Shift) antara data laboratorium dan data operasional lapangan.',
      libraryDependencies: ['numpy', 'scipy.stats'],
      code: `import numpy as np
from scipy import stats

np.random.seed(42)

# Distribusi intensitas cahaya (lux) pada dua domain [SIMULASI/SYNTHETIC DATA]
data_lab = np.random.normal(loc=500.0, scale=20.0, size=500)
data_lapangan = np.random.exponential(scale=5000.0, size=500) + 1000.0

# Uji dua sampel Kolmogorov-Smirnov untuk menguji kesamaan distribusi
ks_stat, p_val = stats.ks_2samp(data_lab, data_lapangan)

print(f"Rata-rata Intensitas Cahaya Lab     : {np.mean(data_lab):.1f} lux")
print(f"Rata-rata Intensitas Cahaya Lapangan : {np.mean(data_lapangan):.1f} lux")
print(f"Statistik Kolmogorov-Smirnov (KS)   : {ks_stat:.4f}")
print(f"Nilai p-value                       : {p_val:.4e}")

if p_val < 0.001:
    print("Peringatan Kritis: Terjadi pergeseran distribusi ekstrem (Covariate Shift). Validitas eksternal terancam runtuh.")
`,
      expectedOutput: `Rata-rata Intensitas Cahaya Lab     : 500.2 lux
Rata-rata Intensitas Cahaya Lapangan : 6046.2 lux
Statistik Kolmogorov-Smirnov (KS)   : 1.0000
Nilai p-value                       : 0.0000e+00
Peringatan Kritis: Terjadi pergeseran distribusi ekstrem (Covariate Shift). Validitas eksternal terancam runtuh.`,
    },
    commonPitfalls: [
      'Menyimpulkan bahwa algoritma siap diterapkan secara komersial hanya berdasarkan evaluasi pada dataset benchmark publik yang steril.',
      'Mengabaikan efek keausan mekanis atau degradasi termal komponen saat beralih dari pengujian durasi pendek ke operasional kontinu.',
      'Melakukan klaim generalisasi universal untuk semua kondisi tanpa menguji batas toleransi ekstrem lingkungan.',
    ],
    validationProcedures: [
      'Lakukan uji silang domain (cross-dataset and out-of-domain evaluation) pada data yang dihimpun dari geografi dan sensor berbeda.',
      'Sertakan pengujian stres (stress testing) dengan memaparkan sistem pada kondisi batas kebisingan maksimum.',
    ],
    exercises: [
      {
        question: 'Apa perbedaan antara validitas populasi (population validity) dan validitas ekologis (ecological validity)?',
        hint: 'Perhatikan apakah generalisasi ditujukan pada keragaman unit subjek atau keragaman kondisi lingkungan fisis.',
        answerExplanation: 'Validitas populasi berfokus pada apakah temuan dapat digeneralisasikan ke kelompok subjek atau unit uji lain yang lebih luas. Sebaliknya, validitas ekologis berfokus pada apakah temuan yang diperoleh di bawah kondisi buatan laboratorium tetap berlaku di bawah setting kondisi lingkungan fisik dunia nyata yang bising dan dinamis.',
      },
    ],
    references: [
      { citation: 'Pearl, J., & Bareinboim, E. (2014). External validity: From do-calculus to transportability across populations. Statistical Science, 29(4), 579-595.', type: 'peer-reviewed-article' },
      { citation: 'Lucas, J. W. (2003). Theory-testing, generalization, and the problem of external validity. Sociological Theory, 21(3), 236-253.', type: 'peer-reviewed-article' },
    ],
  },
  '2.1.4': {
    id: '2.1.4',
    chapterId: 'CH-08',
    title: 'Trade-off Desain: Eksperimen Terkontrol Laboratorium vs Studi Lapangan',
    readingTimeMinutes: 18,
    status: 'verified',
    learningObjectives: [
      'Menganalisis dilema trade-off mendasar antara validitas internal dan validitas eksternal.',
      'Merancang desain eksperimen hibrida (laboratorium lapangan / field experiments) yang seimbang.',
      'Memilih metodologi pengujian yang optimal sesuai tahap kematangan teknologi (TRL).',
    ],
    content: `Dalam setiap penyelidikan ilmiah rekayasa, peneliti selalu dihadapkan pada dilema kompromi mendasar (*fundamental methodological dilemma*): semakin tinggi kontrol eksperimental yang diterapkan untuk mematikan seluruh variabel pengganggu (meningkatkan validitas internal), semakin steril dan artifisial lingkungan pengujian tersebut, yang berakibat pada penurunan realisme dan kemampuan generalisasi ke dunia nyata (menurunkan validitas eksternal).

Sebaliknya, pengujian yang dilakukan langsung di lapangan operasional industri (field trial) memiliki realisme ekologis yang sempurna, namun menghadapkan peneliti pada puluhan variabel pengganggu tak terukur yang dapat mendistorsi pembuktian mekanisme kausal.

Strategi rekayasa modern menyelesaikan dilema ini melalui pendekatan bertahap berbasis Tingkat Kesiapterapan Teknologi (Technology Readiness Level / TRL):
- TRL 1-3 (Validitas Internal Dominan): Eksperimen skala bangku laboratorium murni dengan variabel perancu yang diisolasi ketat untuk membuktikan prinsip fisis dasar.
- TRL 4-6 (Transisi Hibrida): Pengujian rig skala percontohan dengan memasukkan faktor perturbasi lingkungan terkontrol (hardware-in-the-loop simulation).
- TRL 7-9 (Validitas Eksternal Dominan): Uji coba lapangan terdistribusi penuh di lingkungan operasional aktual untuk memverifikasi keandalan dan daya tahan sistem.`,
    mathematicalFoundations: `Fungsi utilitas kualitas desain penelitian $\\mathcal{U}_{\\text{desain}}$ dapat dimodelkan sebagai optimasi terbobot:

$$\\max_{\\mathbf{w}} \\mathcal{U}_{\\text{desain}} = w_{\\text{int}} \\cdot \\mathcal{V}_{\\text{int}}(\\mathbf{c}) + w_{\\text{ext}} \\cdot \\mathcal{V}_{\\text{ext}}(\\mathbf{c})$$
$$\\text{dengan kendala: } \\mathcal{V}_{\\text{int}} + \\mathcal{V}_{\\text{ext}} \\le \\mathcal{B}_{\\text{tradeoff}}, \\quad \\text{Biaya}(\\mathbf{c}) \\le \\text{Anggaran}$$

Di mana $\\mathbf{c} \\in [0, 1]^K$ merepresentasikan vektor tingkat isolasi kontrol lingkungan eksperimen.

Ketika tingkat isolasi dinaikkan ($c_k \\to 1$), $\\mathcal{V}_{\\text{int}}$ meningkat secara asimtotik, namun $\\mathcal{V}_{\\text{ext}}$ menurun:
$$\\frac{\\partial \\mathcal{V}_{\\text{int}}}{\\partial c_k} > 0, \\quad \\frac{\\partial \\mathcal{V}_{\\text{ext}}}{\\partial c_k} < 0$$`,
    workedExample: {
      problemStatement: 'Sebuah tim peneliti ITERA merancang sistem pemantauan gempa bumi berbasis jaringan sensor akselerometer MEMS berbiaya rendah. Rancang strategi pengujian terpadu yang memadukan keunggulan eksperimen laboratorium dan studi lapangan.',
      stepByStepSolution: [
        'Langkah 1 (Fase Laboratorium - Validitas Internal Tinggi): Tempatkan sensor pada meja getar (shake table) terkontrol. Masukkan sinyal sinusoidal murni dengan amplitudo dan frekuensi presisi untuk mengkalibrasi sensitivitas sensor dan memverifikasi respon transfer fungsi tanpa noise luar.',
        'Langkah 2 (Fase Hibrida - Simulasi Hardware-in-the-Loop): Putar rekaman sinyal gempa bumi bersejarah riil pada shake table di dalam ruang uji termal dengan suhu bervariasi -10°C hingga +50°C untuk menguji kompensasi drift suhu.',
        'Langkah 3 (Fase Lapangan - Validitas Eksternal Tinggi): Pasang 10 unit sensor di lereng Gunung Anak Krakatau selama 3 bulan. Evaluasi performa sistem dalam menangani cuaca hujan tropis, paparan gas sulfur korosif, dan interupsi daya panel surya.',
      ],
      resultInterpretation: 'Kombinasi tiga fase memastikan bahwa algoritma memiliki dasar kalibrasi fisis yang valid secara internal di lab dan terbukti tangguh secara eksternal di habitat operasional riil.',
    },
    pythonImplementation: {
      description: 'Simulasi kurva trade-off antara validitas internal dan eksternal berdasarkan tingkat isolasi lingkungan.',
      libraryDependencies: ['numpy'],
      code: `import numpy as np

# Derajat isolasi lingkungan pengujian (0 = alam liar penuh, 1 = ruang hampa steril lab)
isolasi = np.linspace(0.05, 0.95, 10)

# Pemodelan validitas internal (meningkat seiring isolasi) dan eksternal (menurun seiring isolasi)
validitas_internal = 1.0 - np.exp(-3.5 * isolasi)
validitas_eksternal = np.exp(-2.5 * isolasi)

# Skor gabungan harmonik (F1-score analogi metodologis)
skor_seimbang = 2 * (validitas_internal * validitas_eksternal) / (validitas_internal + validitas_eksternal)

print("Analisis Trade-off Desain Riset:")
print(f"{'Isolasi Lab':12s} | {'Val. Internal':14s} | {'Val. Eksternal':14s} | {'Skor Keseimbangan':18s}")
print("-" * 65)
for iso, vi, ve, sc in zip(isolasi, validitas_internal, validitas_eksternal, skor_seimbang):
    print(f"{iso:12.2f} | {vi:14.3f} | {ve:14.3f} | {sc:18.3f}")

idx_opt = np.argmax(skor_seimbang)
print(f"\nTitik Kompromi Optimal: Isolasi = {isolasi[idx_opt]:.2f} (Skor = {skor_seimbang[idx_opt]:.3f})")
`,
      expectedOutput: `Analisis Trade-off Desain Riset:
Isolasi Lab  | Val. Internal  | Val. Eksternal | Skor Keseimbangan 
-----------------------------------------------------------------
        0.05 |          0.161 |          0.882 |              0.272
        0.15 |          0.408 |          0.687 |              0.513
        0.25 |          0.583 |          0.535 |              0.558
        0.35 |          0.706 |          0.417 |              0.524
        0.45 |          0.793 |          0.325 |              0.461
        0.55 |          0.854 |          0.253 |              0.390
        0.65 |          0.897 |          0.197 |              0.323
        0.75 |          0.928 |          0.153 |              0.263
        0.85 |          0.949 |          0.119 |              0.212
        0.95 |          0.964 |          0.093 |              0.170

Titik Kompromi Optimal: Isolasi = 0.25 (Skor = 0.558)`,
    },
    commonPitfalls: [
      'Terjebak pada pengujian laboratorium murni sehingga solusi tidak pernah dapat diimplementasikan dalam praktik industri nyata.',
      'Langsung melompat ke uji coba lapangan tanpa pengujian bangku awal, sehingga saat sistem gagal, peneliti tidak tahu komponen internal mana yang rusak.',
      'Mengabaikan biaya logistik dan risiko keselamatan pada uji lapangan skala penuh.',
    ],
    validationProcedures: [
      'Gunakan matriks readiness level (TRL checklist) untuk memetakan kesiapan sistem sebelum melangkah ke uji lapangan.',
      'Tetapkan parameter batas kegagalan kritis yang memicu penghentian darurat selama pengujian lapangan berlangsung.',
    ],
    exercises: [
      {
        question: 'Dalam penelitian sistem kemudi otonom kendaraan listrik, mengapa simulasi komputer (Software-in-the-Loop) wajib mendahului uji jalan raya publik?',
        hint: 'Pertimbangkan faktor keselamatan (safety), biaya kegagalan, dan pengujian skenario kecelakaan ekstrem (edge cases).',
        answerExplanation: 'Simulasi komputer memungkinkan pengujian jutaan skenario ekstrem (seperti rem blong mendadak atau pejalan kaki menyeberang tiba-tiba) secara cepat, berbiaya rendah, dan tanpa membahayakan nyawa manusia. Setelah algoritma terbukti stabil secara internal dalam simulasi dan rig bangku tertutup, uji jalan raya baru boleh dilakukan untuk memvalidasi performa eksternalnya.',
      },
    ],
    references: [
      { citation: 'NASA. (2012). Technology Readiness Level Demarcation. NASA Systems Engineering Handbook.', type: 'guideline' },
      { citation: 'Harrison, G. W., & List, J. A. (2004). Field experiments. Journal of Economic Literature, 42(4), 1009-1055.', type: 'peer-reviewed-article' },
    ],
  },
};

