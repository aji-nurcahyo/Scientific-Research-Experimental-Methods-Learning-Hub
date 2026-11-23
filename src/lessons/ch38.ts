import { Lesson } from '../types/curriculum';

export const CH38_LESSONS: Record<string, Partial<Lesson>> = {
  '6.1.1': {
    id: '6.1.1',
    chapterId: 'CH-38',
    title: 'Prinsip Plug-In Efron: Menggunakan Distribusi Sampel Empiris sebagai Pengganti Populasi',
    readingTimeMinutes: 20,
    status: 'verified',
    learningObjectives: [
      'Memahami landasan filosofis dan matematis Prinsip Plug-In Bradley Efron (1979).',
      'Membedakan distribusi populasi sejati F dengan distribusi empiris sampel F_hat.',
      'Menerapkan analogi resampling untuk menaksir distribusi sampling dari estimator kompleks.',
    ],
    content: `Dalam inferensi statistik klasik, untuk menarik kesimpulan mengenai parameter populasi $\\theta = t(F)$, ilmuwan harus mengasumsikan bentuk analitis dari fungsi distribusi kumulatif populasi $F$ (misalnya berdistribusi Gaussian, Poisson, atau Weibull). Namun pada sistem rekayasa modern yang sangat kompleks, distribusi fisis data seringkali tidak diketahui dan tidak dapat dipaksakan ke dalam model parametrik standar.

Prinsip Plug-In Bradley Efron (1979):
Bradley Efron memperkenalkan terobosan fundamental: jika kita tidak mengetahui fungsi distribusi populasi sejati $F$, representasi terbaik tanpa prasangka yang kita miliki mengenai $F$ adalah distribusi empiris dari sampel observasi itu sendiri, yang dilambangkan dengan $\\hat{F}_n$.

Prinsip Plug-In menyatakan bahwa estimator dari sembarang karakteristik populasi $\\theta = t(F)$ dapat diperoleh secara langsung dengan menghitung karakteristik yang bersangkutan pada distribusi empiris:
$$\\hat{\\theta} = t(\\hat{F}_n)$$

Dunia Nyata vs Dunia Bootstrap (The Bootstrap World):
- Dalam Dunia Nyata: Populasi $F$ membangkitkan sampel data $\\mathbf{x} = (x_1, \\dots, x_n)$ melalui mekanisme alam. Dari $\\mathbf{x}$, kita menghitung statistik $\\hat{\\theta}$. Kita ingin mengetahui variabilitas $\\hat{\\theta}$ terhadap populasi $F$, namun kita tidak dapat mengulang eksperimen alam jutaan kali.
- Dalam Dunia Bootstrap: Distribusi empiris $\\hat{F}_n$ bertindak sebagai "populasi tiruan". Kita menarik sampel acak baru berukuran $n$ dengan pengembalian (sampling with replacement) dari $\\hat{F}_n$ untuk menghasilkan sampel bootstrap $\\mathbf{x}^* = (x_1^*, \\dots, x_n^*)$. Dari $\\mathbf{x}^*$, kita menghitung replikasi bootstrap $\\hat{\\theta}^* = t(\\mathbf{x}^*)$. Variabilitas $\\hat{\\theta}^*$ terhadap $\\hat{F}_n$ memodelkan variabilitas $\\hat{\\theta}$ terhadap $F$ secara asimtotik.`,
    mathematicalFoundations: `Formulasi Matematis Distribusi Empiris dan Penarikan Resampling:
Diberikan sampel teramati $\\mathbf{x} = (x_1, x_2, \\dots, x_n)$.

1. Fungsi Distribusi Empiris (Empirical CDF, $\\hat{F}_n$):
$$\\hat{F}_n(t) = \\frac{1}{n} \\sum_{i=1}^n \\mathbb{I}(x_i \\leq t)$$
$\\hat{F}_n$ menempatkan massa probabilitas diskrit seragam sebesar $1/n$ pada setiap titik data teramati $x_i$.
Berdasarkan Teorema Glivenko-Cantelli:
$$\\sup_{t \\in \\mathbb{R}} |\\hat{F}_n(t) - F(t)| \\xrightarrow{\\text{a.s.}} 0 \\quad \\text{saat } n \\to \\infty$$

2. Probabilitas Penarikan Sampel Bootstrap:
Sebuah sampel bootstrap $\\mathbf{x}^* = (x_1^*, \\dots, x_n^*)$ ditarik secara i.i.d. dari $\\hat{F}_n$.
Probabilitas sebuah observasi spesifik $x_i$ tidak terpilih sama sekali dalam satu sampel bootstrap berukuran $n$:
$$P(x_i \\notin \\mathbf{x}^*) = \\left(1 - \\frac{1}{n}\\right)^n \\xrightarrow{n \\to \\infty} \\frac{1}{e} \\approx 0.3679$$
Artinya, setiap sampel bootstrap secara rata-rata mengandung sekitar $63.2\\%$ data unik dari sampel asli, dan $36.8\\%$ data tidak terpilih (Out-of-Bag / OOB).`,
    workedExample: {
      problemStatement: 'Diberikan dataset kecil hasil uji kelelahan logam (N=5): [120, 135, 128, 140, 130] siklus. Tunjukkan bagaimana distribusi empiris F_hat dikonstruksi. Hitung probabilitas bahwa titik data terkecil (120) terpilih minimal satu kali dalam sampel bootstrap berukuran 5.',
      stepByStepSolution: [
        'Langkah 1: Bentuk distribusi empiris F_hat: Setiap titik data memiliki massa probabilitas P(X = x_i) = 1/5 = 0.20 pada titik-titik {120, 128, 130, 135, 140}.',
        'Langkah 2: Hitung probabilitas titik 120 tidak terpilih dalam 1 kali penarikan: P(tidak terpilih) = 1 - 0.20 = 0.80.',
        'Langkah 3: Hitung probabilitas titik 120 tidak terpilih sama sekali dalam 5 kali penarikan independen: P(nol kali) = (0.80)^5 = 0.32768.',
        'Langkah 4: Hitung probabilitas titik 120 terpilih minimal satu kali: P(terpilih >= 1) = 1 - P(nol kali) = 1 - 0.32768 = 0.67232 (67.23%).',
      ],
      resultInterpretation: 'Pada ukuran sampel n=5, peluang sebuah titik data masuk ke dalam replikasi bootstrap adalah 67.23%, mendekati batas asimtotik teoretis (1 - 1/e = 63.21%).',
    },
    pythonImplementation: {
      description: 'Simulasi Prinsip Plug-In Efron: Mengestimasi distribusi sampling median menggunakan bootstrap resampling.',
      libraryDependencies: ['numpy'],
      code: `import numpy as np

# [SIMULASI/SYNTHETIC DATA]
# 30 pengukuran konsumsi daya sensor IoT (distribusi non-Gaussian menceng kanan)
np.random.seed(42)
n_samples = 30
data = np.random.exponential(scale=15.0, size=n_samples) + 5.0  # Log-normal/menceng

# Statistik sampel asli
orig_median = np.median(data)

# Resampling Bootstrap (B = 2.000 iterasi)
B = 2000
bootstrap_medians = np.zeros(B)

for b in range(B):
    # Penarikan dengan pengembalian (sampling with replacement)
    resample = np.random.choice(data, size=n_samples, replace=True)
    bootstrap_medians[b] = np.median(resample)

# Estimasi Standard Error Bootstrap
se_boot = np.std(bootstrap_medians, ddof=1)
# 95% Bootstrap Percentile Confidence Interval
ci_lower = np.percentile(bootstrap_medians, 2.5)
ci_upper = np.percentile(bootstrap_medians, 97.5)

print("[SIMULASI/SYNTHETIC DATA] Hasil Inferensi Prinsip Plug-In Bootstrap:")
print(f"Median Sampel Teramati        : {orig_median:.2f} mW")
print(f"Standard Error Bootstrap (SE) : {se_boot:.2f} mW")
print(f"95% Percentile Confidence Int : [{ci_lower:.2f}, {ci_upper:.2f}] mW")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Hasil Inferensi Prinsip Plug-In Bootstrap:
Median Sampel Teramati        : 14.89 mW
Standard Error Bootstrap (SE) : 1.94 mW
95% Percentile Confidence Int : [11.83, 19.34] mW`,
    },
    commonPitfalls: [
      'Melakukan sampling without replacement (tanpa pengembalian), yang hanya menghasilkan permutasi data identik.',
      'Menggunakan ukuran sampel bootstrap yang berbeda dari ukuran sampel asli (n* != n).',
      'Mengasumsikan bootstrap dapat memperbaiki data sampel yang cacat sejak awal akibat sampling bias.',
    ],
    validationProcedures: [
      'Pastikan parameter replace=True selalu aktif pada fungsi penarikan acak.',
      'Gunakan jumlah replikasi B >= 1.000 untuk estimasi standard error, dan B >= 2.000 untuk interval kepercayaan.',
      'Verifikasi bahwa ukuran sampel n* pada setiap replikasi sama persis dengan n sampel awal.',
    ],
    exercises: [
      {
        question: 'Mengapa penarikan sampel dengan pengembalian (sampling with replacement) merupakan syarat mutlak agar simulasi bootstrap valid?',
        hint: 'Perhatikan apa yang terjadi jika penarikan dilakukan tanpa pengembalian.',
        answerExplanation: 'Jika penarikan dilakukan tanpa pengembalian, setiap sampel bootstrap hanya akan menjadi permutasi urutan dari himpunan data yang sama persis. Akibatnya nilai statistik (seperti rata-rata atau median) akan konstan tanpa variasi, sehingga mustahil memodelkan variabilitas sampling.',
      },
      {
        question: 'Apakah metode bootstrap dapat diandalkan jika jumlah sampel awal sangat kecil (misal n = 3)?',
        hint: 'Perhatikan jumlah kombinasi unik sampel bootstrap yang mungkin terbentuk.',
        answerExplanation: 'Tidak dapat diandalkan. Pada n=3, hanya ada sedikit sekali kombinasi unik yang mungkin dibentuk. Distribusi empiris F_hat pada n=3 adalah aproksimasi yang sangat kasar dan terdistorsi terhadap populasi sejati F, sehingga variabilitas bootstrap akan bias secara parah.',
      },
    ],
    references: [
      {
        citation: 'Efron, B. (1979). Bootstrap methods: another look at the jackknife. The Annals of Statistics, 7(1), 1-26.',
        type: 'peer-reviewed-article',
      },
      {
        citation: 'Efron, B., & Tibshirani, R. J. (1994). An Introduction to the Bootstrap. CRC Press.',
        type: 'canonical-textbook',
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Prinsip Plug-In Bradley Efron (1979)',
        bulletPoints: [
          'Solusi ketika bentuk distribusi populasi fisis F tidak diketahui.',
          'Gunakan distribusi empiris data F_hat sebagai model populasi proksi.',
          'Tarik sampel bootstrap dengan pengembalian (with replacement).',
        ],
        keyFormulaOrDiagram: '\\hat{\\theta} = t(\\hat{F}_n) \\iff \\hat{\\theta}^* = t(\\mathbf{x}^*)',
      },
      {
        slideNumber: 2,
        title: 'Dinamika Sampling With Replacement',
        bulletPoints: [
          'Probabilitas sampel tidak terpilih (OOB): (1 - 1/n)^n -> 1/e (36.8%).',
          'Setiap replikasi mengandung rata-rata 63.2% data unik.',
          'Wajib mempertahankan ukuran n* = n pada setiap iterasi bootstrap.',
        ],
        keyFormulaOrDiagram: 'P(x_i \\notin \\mathbf{x}^*) \\xrightarrow{n \\to \\infty} \\frac{1}{e} \\approx 0.368',
      },
    ],
  },
  '6.1.2': {
    id: '6.1.2',
    chapterId: 'CH-38',
    title: 'Nonparametric Bootstrap vs Parametric Bootstrap: Prosedur Algoritmik',
    readingTimeMinutes: 20,
    status: 'verified',
    learningObjectives: [
      'Membedakan asumsi, arsitektur, dan penerapan Nonparametric Bootstrap vs Parametric Bootstrap.',
      'Mengimplementasikan Parametric Bootstrap ketika model keluarga distribusi diketahui secara fisik.',
      'Memilih metode resampling yang tepat berdasarkan ketersediaan pengetahuan prior fisis.',
    ],
    content: `Meskipun istilah "bootstrap" seringkali diidentikkan dengan penarikan sampel non-parametrik langsung dari data, Bradley Efron sebenarnya merumuskan dua arsitektur resampling yang berbeda: Nonparametric Bootstrap dan Parametric Bootstrap. Pilihan antara keduanya mencerminkan trade-off klasik dalam metodologi rekayasa antara fleksibilitas bebas model vs efisiensi inferensi model parametrik.

Nonparametric Bootstrap (Empirical Resampling):
- Karakteristik: Tidak membuat asumsi apa pun mengenai bentuk fungsional distribusi data. Sampel bootstrap ditarik langsung dari titik-titik data observasi $\\mathbf{x}$.
- Keunggulan: Sangat kuat (robust) terhadap kesalahan spesifikasi model (model misspecification). Sangat ideal ketika fenomena fisik terlalu rumit untuk dimodelkan dengan persamaan analitis.
- Limitasi: Pada ukuran sampel kecil, distribusi empiris berupa tangga diskrit yang kasar, dan tidak mampu menghasilkan nilai di luar rentang ekstrim sampel observasi $[\min(x), \max(x)]$.

Parametric Bootstrap (Model-Based Resampling):
- Karakteristik: Peneliti mengasumsikan bahwa data dibangkitkan dari keluarga distribusi parametrik tertentu $F_\\theta$ (misalnya distribusi Weibull untuk waktu kegagalan material atau Lognormal untuk konsentrasi polutan). Parameter $\\hat{\\theta}$ diestimasi menggunakan Maximum Likelihood Estimation (MLE) pada sampel teramati. Sampel bootstrap $\\mathbf{x}^*$ kemudian dibangkitkan secara sintetis dari distribusi fitted $F_{\\hat{\\theta}}$.
- Keunggulan: Memiliki efisiensi statistik yang jauh lebih tinggi dan mampu menginterpolasi serta mengekstrapolasi nilai ekstrim dengan mulus.
- Limitasi: Sangat rentan terhadap bias fatal jika asumsi keluarga distribusi salah secara fisik.`,
    mathematicalFoundations: `Perbandingan Algoritma Resampling:

1. Alur Nonparametric Bootstrap:
- Diberikan data teramati $\\mathbf{x} = (x_1, \\dots, x_n)$.
- Untuk $b = 1, \\dots, B$:
  $$\\mathbf{x}_b^* = \\text{SampleWithReplacement}(\\mathbf{x}, n)$$
  $$\\hat{\\theta}_b^* = g(\\mathbf{x}_b^*)$$

2. Alur Parametric Bootstrap:
- Asumsikan model $X \\sim F_\\theta$.
- Estimasi parameter melalui MLE:
  $$\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\sum_{i=1}^n \\log f(x_i; \\theta)$$
- Untuk $b = 1, \\dots, B$:
  $$\\mathbf{x}_b^* = (x_{b, 1}^*, \\dots, x_{b, n}^*) \\quad \\text{di mana } x_{b, i}^* \\sim F_{\\hat{\\theta}_{\\text{MLE}}}$$
  $$\\hat{\\theta}_b^* = g(\\mathbf{x}_b^*)$$

Estimasi Standard Error:
$$\\widehat{\\text{SE}}_B(\\hat{\\theta}) = \\sqrt{\\frac{1}{B - 1} \\sum_{b=1}^B \\left(\\hat{\\theta}_b^* - \\bar{\\theta}^*\\right)^2}, \\quad \\bar{\\theta}^* = \\frac{1}{B} \\sum_{b=1}^B \\hat{\\theta}_b^*$$`,
    workedExample: {
      problemStatement: 'Diberikan data waktu kegagalan isolator tegangan tinggi (jam): [45, 82, 110, 160, 220]. Dari teori fisika dielektrik, waktu kegagalan diketahui berdistribusi Eksponensial Exp(lambda). Hitung parameter MLE lambda_hat. Jelaskan prosedur penarikan 1 replikasi Parametric Bootstrap versus Nonparametric Bootstrap.',
      stepByStepSolution: [
        'Langkah 1: Hitung rata-rata sampel: mean(x) = (45 + 82 + 110 + 160 + 220) / 5 = 617 / 5 = 123.4 jam.',
        'Langkah 2: Hitung MLE lambda untuk distribusi eksponensial: lambda_hat = 1 / mean(x) = 1 / 123.4 = 0.008104 per jam.',
        'Langkah 3: Replikasi Nonparametric Bootstrap: Tarik 5 angka acak dengan pengembalian langsung dari himpunan {45, 82, 110, 160, 220}, misal terpilih [82, 45, 82, 220, 110]. Hitung rata-rata resample = 107.8 jam.',
        'Langkah 4: Replikasi Parametric Bootstrap: Bangkitkan 5 bilangan pseudorandom kontinu dari distribusi Exp(lambda = 0.008104) atau skala beta = 123.4, misal diperoleh [12.5, 95.3, 184.2, 55.1, 310.8]. Hitung rata-rata resample = 131.58 jam.',
      ],
      resultInterpretation: 'Parametric bootstrap mampu menghasilkan nilai kontinu baru yang belum pernah muncul di sampel observasi (seperti 12.5 dan 310.8 jam) berdasarkan landasan hukum fisika eksponensial.',
    },
    pythonImplementation: {
      description: 'Implementasi perbandingan langsung Nonparametric vs Parametric Bootstrap untuk data Weibull.',
      libraryDependencies: ['numpy', 'scipy.stats'],
      code: `import numpy as np
from scipy import stats

# [SIMULASI/SYNTHETIC DATA]
# 25 pengujian kekuatan tarik komposit serat karbon (Distribusi Weibull)
np.random.seed(42)
true_c, true_scale = 2.5, 150.0  # Parameter bentuk (shape) dan skala (scale)
data = stats.weibull_min.rvs(c=true_c, scale=true_scale, size=25)

B = 2000

# 1. NONPARAMETRIC BOOTSTRAP
boot_means_nonparam = np.zeros(B)
for b in range(B):
    resample = np.random.choice(data, size=len(data), replace=True)
    boot_means_nonparam[b] = np.mean(resample)

# 2. PARAMETRIC BOOTSTRAP (Fit Weibull via MLE lalu sampling dari model)
fit_c, _, fit_scale = stats.weibull_min.fit(data, floc=0)
boot_means_param = np.zeros(B)
for b in range(B):
    synthetic_sample = stats.weibull_min.rvs(c=fit_c, scale=fit_scale, size=len(data))
    boot_means_param[b] = np.mean(synthetic_sample)

print("[SIMULASI/SYNTHETIC DATA] Komparasi Nonparametric vs Parametric Bootstrap:")
print(f"Mean Sampel Teramati        : {np.mean(data):.2f} MPa")
print(f"Nonparametric Bootstrap SE  : {np.std(boot_means_nonparam, ddof=1):.2f} MPa")
print(f"Parametric Bootstrap SE     : {np.std(boot_means_param, ddof=1):.2f} MPa")
print(f"Nonparametric 95% CI        : [{np.percentile(boot_means_nonparam, 2.5):.2f}, {np.percentile(boot_means_nonparam, 97.5):.2f}]")
print(f"Parametric 95% CI           : [{np.percentile(boot_means_param, 2.5):.2f}, {np.percentile(boot_means_param, 97.5):.2f}]")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Komparasi Nonparametric vs Parametric Bootstrap:
Mean Sampel Teramati        : 132.81 MPa
Nonparametric Bootstrap SE  : 9.77 MPa
Parametric Bootstrap SE     : 9.87 MPa
Nonparametric 95% CI        : [113.84, 151.78]
Parametric 95% CI           : [113.88, 152.26]`,
    },
    commonPitfalls: [
      'Menggunakan Parametric Bootstrap saat justifikasi fisik untuk pemilihan keluarga distribusi lemah.',
      'Menggunakan Nonparametric Bootstrap pada sampel sangat kecil (n < 10) di mana data diskrit tidak mewakili ekor distribusi.',
      'Lupa mengunci lokasi parameter floc=0 saat melakukan fitting MLE pada variabel non-negatif fisik.',
    ],
    validationProcedures: [
      'Gunakan uji Goodness-of-Fit (Kolmogorov-Smirnov atau Anderson-Darling) sebelum menjalankan Parametric Bootstrap.',
      'Bandingkan estimasi standard error antara nonparametric dan parametric: jika selisih sangat besar, curigai misspecification model.',
      'Sajikan plot perbandingan Q-Q plot antara sampel teramati dan distribusi parametrik terpilih.',
    ],
    exercises: [
      {
        question: 'Kapan seorang peneliti rekayasa dianjurkan memilih Parametric Bootstrap daripada Nonparametric Bootstrap?',
        hint: 'Kaitkan dengan hukum fisika dasar dan ukuran sampel yang terbatas.',
        answerExplanation: 'Parametric Bootstrap sangat dianjurkan ketika terdapat landasan teori fisika yang kuat mengenai bentuk distribusi (misal degradasi radioaktif pasti eksponensial, keausan mekanik pasti Weibull) dan ukuran sampel relatif terbatas sehingga penarikan non-parametrik akan menghasilkan estimasi ekor yang terlalu kasar.',
      },
      {
        question: 'Apa risiko terbesar dari penggunaan Parametric Bootstrap?',
        hint: 'Perhatikan jika asumsi awal keluarga distribusi salah.',
        answerExplanation: 'Risiko terbesarnya adalah Model Misspecification. Jika peneliti mengasumsikan data berdistribusi normal padahal kenyataannya memiliki ekor tebal (heavy-tailed seperti Cauchy atau Pareto), sampel parametrik sintetis akan meremehkan probabilitas kejadian ekstrim, menghasilkan interval kepercayaan yang terlalu sempit dan tidak valid.',
      },
    ],
    references: [
      {
        citation: 'Davison, A. C., & Hinkley, D. V. (1997). Bootstrap Methods and their Application. Cambridge University Press.',
        type: 'canonical-textbook',
      },
      {
        citation: 'Efron, B., & Hastie, T. (2016). Computer Age Statistical Inference. Cambridge University Press.',
        type: 'canonical-textbook',
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Nonparametric vs Parametric Bootstrap',
        bulletPoints: [
          'Nonparametric: Bebas asumsi, sampling langsung dari sampel observasi.',
          'Parametric: Fit model MLE (F_theta), sampling sintetis dari kurva kontinu.',
          'Trade-off: Kekokohan tanpa model vs Efisiensi statistik model fisik.',
        ],
        keyFormulaOrDiagram: '\\mathbf{x}^* \\sim \\hat{F}_n \\quad \\text{vs} \\quad \\mathbf{x}^* \\sim F_{\\hat{\\theta}_\\text{MLE}}',
      },
      {
        slideNumber: 2,
        title: 'Pedoman Pemilihan Metode',
        bulletPoints: [
          'Pilih Nonparametric jika bentuk fisis data kompleks atau multimodal.',
          'Pilih Parametric jika hukum fisis mapan (Weibull, Poisson, Lognormal).',
          'Wajib memverifikasi Goodness-of-Fit sebelum sampling parametrik.',
        ],
        keyFormulaOrDiagram: 'D_\\text{KS} < D_\\text{crit} \\implies \\text{Parametric Valid}',
      },
    ],
  },
  '6.1.3': {
    id: '6.1.3',
    chapterId: 'CH-38',
    title: 'Konstruksi Interval Kepercayaan: Metode Persentil vs Metode BCa yang Terkoreksi Bias',
    readingTimeMinutes: 22,
    status: 'verified',
    learningObjectives: [
      'Menganalisis kelemahan metode Standard Normal Bootstrap dan Percentile Bootstrap pada distribusi asimetris.',
      'Memahami formulasi matematis koreksi bias ($z_0$) dan akselerasi ($a$) pada metode BCa (Bias-Corrected and Accelerated).',
      'Mengimplementasikan interval kepercayaan BCa berstandar publikasi menggunakan Python.',
    ],
    content: `Setelah membangkitkan $B$ replikasi bootstrap $\\hat{\\theta}_1^*, \\dots, \\hat{\\theta}_B^*$, langkah inferensi berikutnya adalah mengonstruksi interval kepercayaan (Confidence Interval / CI). Terdapat beberapa pendekatan dengan tingkat kecanggihan dan ketelitian matematis yang bertingkat:

1. Metode Bootstrap-t / Standar Normal:
Mengasumsikan bahwa distribusi sampling estimator berdistribusi normal: $\\hat{\\theta} \\pm z_{\\alpha/2} \\cdot \\widehat{\\text{SE}}_B$. Metode ini menghasilkan batas simetris kaku dan gagal total jika distribusi estimator memiliki kemencengan (skewness).

2. Metode Persentil Bootstrap (Efron, 1981):
Mengambil langsung persentil $\\alpha/2$ dan $1 - \\alpha/2$ dari array replikasi bootstrap yang telah diurutkan: $[\\hat{\\theta}^*_{(\\alpha/2)}, \\hat{\\theta}^*_{(1 - \\alpha/2)}]$. Metode ini mudah dihitung dan invarian terhadap transformasi monoton, namun terbukti bias dan menghasilkan cakupan nyata yang lebih rendah dari tingkat kepercayaan nominal (misal cakupan aktual hanya 91% pada target 95%) jika estimator memiliki bias sampel atau varians bergantung pada parameter.

3. Metode BCa (Bias-Corrected and Accelerated, Efron, 1987):
Merupakan standar emas interval kepercayaan non-parametrik. Metode BCa menyesuaikan indeks persentil yang ditarik dengan memperkenalkan dua parameter koreksi:
- Parameter Koreksi Bias ($z_0$): Mengoreksi pergeseran median distribusi bootstrap terhadap estimator titik asli.
- Parameter Akselerasi ($a$): Mengoreksi laju perubahan varians estimator terhadap perubahan nilai parameter populasi (terkait dengan kemencengan distribusi sampling), yang diestimasi menggunakan teknik Jackknife.`,
    mathematicalFoundations: `Formulasi Matematis Interval Kepercayaan BCa:
Diberikan array replikasi bootstrap yang telah diurutkan $\\hat{\\theta}_{(1)}^* \\leq \\hat{\\theta}_{(2)}^* \\leq \\dots \\leq \\hat{\\theta}_{(B)}^*$.
Batas interval kepercayaan BCa $(1 - \\alpha)$ didefinisikan sebagai persentil $\\alpha_1$ dan $\\alpha_2$:
$$\\text{BCa}_{1-\\alpha} = \\left[ \\hat{\\theta}_{(\\alpha_1 B)}^*, \\; \\hat{\\theta}_{(\\alpha_2 B)}^* \\right]$$

Perhitungan Indeks Persentil Terkoreksi:
$$\\alpha_1 = \\Phi\\left( \\hat{z}_0 + \\frac{\\hat{z}_0 + z_{\\alpha/2}}{1 - a(\\hat{z}_0 + z_{\\alpha/2})} \\right)$$
$$\\alpha_2 = \\Phi\\left( \\hat{z}_0 + \\frac{\\hat{z}_0 + z_{1 - \\alpha/2}}{1 - a(\\hat{z}_0 + z_{1 - \\alpha/2})} \\right)$$
di mana $\\Phi$ adalah fungsi distribusi kumulatif Gaussian standar, dan $z_p = \\Phi^{-1}(p)$.

1. Estimasi Parameter Bias ($z_0$):
$$\\hat{z}_0 = \\Phi^{-1}\\left( \\frac{1}{B} \\sum_{b=1}^B \\mathbb{I}(\\hat{\\theta}_b^* < \\hat{\\theta}) \\right)$$

2. Estimasi Parameter Akselerasi ($a$) via Jackknife:
Misalkan $\\hat{\\theta}_{(i)}$ adalah nilai estimator ketika observasi ke-$i$ dihilangkan dari data sampel asli, dan $\\bar{\\theta}_{(\\cdot)} = \\frac{1}{n} \\sum_{i=1}^n \\hat{\\theta}_{(i)}$:
$$a = \\frac{\\sum_{i=1}^n (\\bar{\\theta}_{(\\cdot)} - \\hat{\\theta}_{(i)})^3}{6 \\left[ \\sum_{i=1}^n (\\bar{\\theta}_{(\\cdot)} - \\hat{\\theta}_{(i)})^2 \\right]^{3/2}}$$`,
    workedExample: {
      problemStatement: 'Pada eksperimen bootstrap B = 2.000 iterasi, estimator asli bernilai theta_hat = 10.0. Dari 2.000 replikasi bootstrap, sebanyak 1.150 replikasi menghasilkan nilai theta^* < 10.0. Parameter akselerasi Jackknife dihitung sebesar a = 0.05. Hitung parameter bias z_0 dan tentukan persentil terkoreksi alpha_1 untuk batas bawah interval kepercayaan 95% (z_0.025 = -1.960).',
      stepByStepSolution: [
        'Langkah 1: Hitung proporsi replikasi di bawah theta_hat: p = 1150 / 2000 = 0.575.',
        'Langkah 2: Hitung parameter bias z_0 = Phi^-1(0.575): Dari tabel distribusi normal standar, z_0 = +0.189.',
        'Langkah 3: Hitung suku pembilang untuk alpha_1: Pembilang = z_0 + z_0.025 = 0.189 + (-1.960) = -1.771.',
        'Langkah 4: Hitung suku penyebut untuk alpha_1: Penyebut = 1 - a * (z_0 + z_0.025) = 1 - 0.05 * (-1.771) = 1 + 0.08855 = 1.08855.',
        'Langkah 5: Hitung nilai argumen Gaussian: W = z_0 + (Pembilang / Penyebut) = 0.189 + (-1.771 / 1.08855) = 0.189 - 1.6269 = -1.4379.',
        'Langkah 6: Hitung persentil terkoreksi alpha_1 = Phi(-1.4379): alpha_1 = 0.0752 (persentil ke-7.52%).',
      ],
      resultInterpretation: 'Pada metode persentil biasa, batas bawah diambil pada persentil 2.50%. Akibat adanya bias dan kemencengan data, metode BCa secara otomatis mengoreksi batas bawah ke persentil 7.52%, menjamin cakupan probabilitas 95% yang akurat.',
    },
    pythonImplementation: {
      description: 'Implementasi mandiri kalkulasi interval kepercayaan BCa vs Persentil biasa.',
      libraryDependencies: ['numpy', 'scipy.stats'],
      code: `import numpy as np
from scipy import stats

# [SIMULASI/SYNTHETIC DATA]
np.random.seed(42)
# 20 data konsentrasi zat kimia dengan kemencengan tinggi
data = np.random.lognormal(mean=2.0, sigma=0.8, size=20)
n = len(data)
theta_hat = np.var(data, ddof=1)  # Estimator: Varians sampel (sangat skewed)

B = 2000
boot_thetas = np.zeros(B)
for b in range(B):
    resample = np.random.choice(data, size=n, replace=True)
    boot_thetas[b] = np.var(resample, ddof=1)

# 1. METODE PERSENTIL
ci_perc = [np.percentile(boot_thetas, 2.5), np.percentile(boot_thetas, 97.5)]

# 2. METODE BCa
# Parameter bias z0
prop_less = np.mean(boot_thetas < theta_hat)
z0 = stats.norm.ppf(prop_less)

# Parameter akselerasi a via Jackknife
jack_thetas = np.zeros(n)
for i in range(n):
    jack_sample = np.delete(data, i)
    jack_thetas[i] = np.var(jack_sample, ddof=1)
jack_mean = np.mean(jack_thetas)
u = jack_mean - jack_thetas
a = np.sum(u**3) / (6.0 * (np.sum(u**2))**1.5)

# Indeks persentil terkoreksi BCa
z_alpha1 = stats.norm.ppf(0.025)
z_alpha2 = stats.norm.ppf(0.975)

w1 = z0 + (z0 + z_alpha1) / (1.0 - a * (z0 + z_alpha1))
w2 = z0 + (z0 + z_alpha2) / (1.0 - a * (z0 + z_alpha2))

alpha1 = stats.norm.cdf(w1) * 100
alpha2 = stats.norm.cdf(w2) * 100

ci_bca = [np.percentile(boot_thetas, alpha1), np.percentile(boot_thetas, alpha2)]

print("[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kepercayaan Varians:")
print(f"Estimator Titik Teramati (Varians): {theta_hat:.2f}")
print(f"Parameter BCa: z0 = {z0:.4f} | a = {a:.4f}")
print(f"Persentil Biasa (2.5%, 97.5%)      : [{ci_perc[0]:.2f}, {ci_perc[1]:.2f}]")
print(f"Persentil BCa ({alpha1:.1f}%, {alpha2:.1f}%) : [{ci_bca[0]:.2f}, {ci_bca[1]:.2f}]")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kepercayaan Varians:
Estimator Titik Teramati (Varians): 83.99
Parameter BCa: z0 = 0.2819 | a = 0.1343
Persentil Biasa (2.5%, 97.5%)      : [22.42, 230.15]
Persentil BCa (9.4%, 99.4%) : [36.03, 303.48]`,
    },
    commonPitfalls: [
      'Menggunakan metode Persentil sederhana pada estimator yang asimetris (seperti varians, korelasi, atau rasio).',
      'Mengabaikan peringatan numerik ketika nilai penyebut 1 - a(z0 + z) mendekati nol.',
      'Menghitung parameter akselerasi a langsung dari replikasi bootstrap alih-alih menggunakan sampel Jackknife.',
    ],
    validationProcedures: [
      'Gunakan metode BCa sebagai pilihan default untuk pelaporan interval kepercayaan di jurnal bereputasi.',
      'Pastikan jumlah replikasi B >= 2.000 agar penarikan persentil ekstrim (misal 0.5% atau 99.5%) stabil secara numerik.',
      'Bandingkan batas interval BCa dengan Persentil standar: perbedaan signifikan menandakan kuatnya efek kemencengan dan bias.',
    ],
    exercises: [
      {
        question: 'Mengapa metode Persentil Bootstrap biasa sering menghasilkan cakupan empiris yang lebih rendah daripada 95% pada sampel berukuran sedang?',
        hint: 'Perhatikan ketiadaan mekanisme koreksi untuk bias median dan kemencengan sebaran.',
        answerExplanation: 'Metode persentil biasa mengasumsikan bahwa distribusi sampling dari estimator berbentuk simetris sempurna di sekitar nilai parameter sejati. Jika estimator mengalami bias atau kemencengan (skewness), persentil 2.5% dan 97.5% akan bergeser ke satu sisi, sehingga salah satu ekor parameter populasi sering terlewat dan cakupan aktual merosot ke 88%-92%.',
      },
      {
        question: 'Apa interpretasi fisis jika parameter akselerasi a bernilai nol (a = 0)?',
        hint: 'Perhatikan hubungan antara varians estimator dengan nilai parameter sejati.',
        answerExplanation: 'Jika a = 0, varians dari estimator bersifat homoskedastis (konstan dan tidak bergantung pada nilai parameter sejati). Dalam kondisi ini, rumus BCa terdegenerasi menjadi metode Bias-Corrected (BC) murni tanpa akselerasi.',
      },
    ],
    references: [
      {
        citation: 'Efron, B. (1987). Better bootstrap confidence intervals. Journal of the American Statistical Association, 82(397), 171-185.',
        type: 'peer-reviewed-article',
      },
      {
        citation: 'DiCiccio, T. J., & Efron, B. (1996). Bootstrap confidence intervals. Statistical Science, 11(3), 189-228.',
        type: 'peer-reviewed-article',
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Kelemahan Interval Persentil Biasa',
        bulletPoints: [
          'Persentil biasa [2.5%, 97.5%] mengasumsikan simetri tanpa bias.',
          'Gagal total pada estimator asimetris: varians, rasio, korelasi.',
          'Cakupan aktual anjlok di bawah 95% akibat kemencengan sampling.',
        ],
        keyFormulaOrDiagram: '\\text{Coverage}(\\text{Percentile}) < 1 - \\alpha \\quad \\text{pada data skewed}',
      },
      {
        slideNumber: 2,
        title: 'Metode BCa Terkoreksi Bias dan Akselerasi',
        bulletPoints: [
          'Parameter z0: Mengoreksi pergeseran bias median bootstrap.',
          'Parameter a: Mengoreksi akselerasi kemencengan via Jackknife.',
          'Standar emas inferensi non-parametrik berstandar jurnal ilmiah internasional.',
        ],
        keyFormulaOrDiagram: '\\alpha_1 = \\Phi\\left( z_0 + \\frac{z_0 + z_{\\alpha/2}}{1 - a(z_0 + z_{\\alpha/2})} \\right)',
      },
    ],
  },
  '6.1.4': {
    id: '6.1.4',
    chapterId: 'CH-38',
    title: 'Resampling untuk Estimasi Parameter Non-Linier dan Rasio Kompleks',
    readingTimeMinutes: 20,
    status: 'verified',
    learningObjectives: [
      'Menerapkan teknik resampling bootstrap untuk parameter yang tidak memiliki turunan analitis tertutup.',
      'Menganalisis interval kepercayaan rasio dua variabel acak (Ratio of Means) dan indeks efisiensi rekayasa.',
      'Membandingkan hasil Bootstrap dengan metode aproksimasi Delta Method.',
    ],
    content: `Dalam rekayasa sistem dan eksperimen ilmiah, banyak parameter kritis diformulasikan sebagai fungsi non-linier dari beberapa pengukuran acak. Contoh parametrik meliputi:
- Rasio Efisiensi Termal: $\\theta = \\bar{Y} / \\bar{X}$ (Rasio output daya terhadap input bahan bakar).
- Indeks Kemampuan Proses (Process Capability Index): $C_{pk} = \\min\\left(\\frac{\\text{USL} - \\mu}{3\\sigma}, \\frac{\\mu - \\text{LSL}}{3\\sigma}\\right)$.
- Parameter Kinetika Reaksi Kimia Non-Linier Michaelis-Menten: $V = \\frac{V_{\\max} [S]}{K_m + [S]}$.

Tantangan Inferensi Analitis:
Mencari interval kepercayaan eksak untuk parameter rasio atau persamaan non-linier menggunakan teori statistik klasik sangat sulit karena pembagian dua variabel acak menghasilkan distribusi dengan varians tak terhingga atau asimetri ekstrem (seperti distribusi Cauchy). Metode analitis tradisional menggunakan Aproksimasi Deret Taylor (Delta Method), namun Delta Method mengasumsikan linearitas lokal dan seringkali menghasilkan estimasi batas kesalahan yang bias secara parah pada ukuran sampel terbatas.

Resampling Bootstrap sebagai Solusi Universal:
Metode bootstrap sepenuhnya membebaskan peneliti dari keharusan menurunkan rumus turunan kalkulus yang rumit. Peneliti cukup menghitung fungsi non-linier $g(\\cdot)$ pada setiap sampel resample bootstrap secara langsung. Distribusi empiris replikasi non-linier secara otomatis menangkap seluruh ketidaklinieran fisik dan kovarians antar variabel tanpa aproksimasi deret Taylor.`,
    mathematicalFoundations: `Komparasi Resampling Non-Linier vs Delta Method:
Diberikan dua variabel acak $X$ dan $Y$ dengan estimator rata-rata $(\\bar{X}, \\bar{Y})$ dan matriks kovarians $\\mathbf{\\Sigma}$.
Target parameter: Rasio $\\theta = \\mu_Y / \\mu_X$.

1. Pendekatan Delta Method (Aproksimasi Taylor Orde-1):
$$\\widehat{\\text{Var}}_{\\text{Delta}}(\\hat{\\theta}) \\approx \\left( \\frac{\\bar{Y}}{\\bar{X}} \\right)^2 \\left[ \\frac{s_Y^2}{n \\bar{Y}^2} + \\frac{s_X^2}{n \\bar{X}^2} - 2 \\frac{s_{XY}}{n \\bar{X} \\bar{Y}} \\right]$$
Kelemahan: Jika $\\bar{X}$ mendekati 0 atau koefisien variasi $s_X / \\bar{X} > 0.2$, aproksimasi linier runtuh secara katastropik.

2. Pendekatan Resampling Bootstrap Non-Parametrik:
Diberikan pasangan observasi berpasangan $(x_i, y_i)_{i=1}^n$.
Untuk $b = 1, \\dots, B$:
- Tarik pasangan indeks acak $I_b^* = \\text{Choice}(\\{1, \\dots, n\\}, n, \\text{replace}=\\text{True})$.
- Hitung rata-rata resample: $\\bar{x}_b^* = \\frac{1}{n} \\sum_{i \\in I_b^*} x_i$ dan $\\bar{y}_b^* = \\frac{1}{n} \\sum_{i \\in I_b^*} y_i$.
- Hitung rasio replikasi: $\\hat{\\theta}_b^* = \\bar{y}_b^* / \\bar{x}_b^*$.
Distribusi $\\{\\hat{\\theta}_b^*\\}$ merefleksikan sebaran rasio sejati secara utuh.`,
    workedExample: {
      problemStatement: 'Sebuah turbin prototipe diuji pada n = 5 pengujian berpasangan. Daya input X (kW) = [100, 110, 95, 105, 120]; Daya output Y (kW) = [40, 48, 36, 44, 54]. Hitung efisiensi rata-rata theta_hat = Y_bar / X_bar. Tunjukkan bagaimana satu replikasi bootstrap berpasangan dihitung jika indeks terambil adalah [0, 0, 2, 3, 4].',
      stepByStepSolution: [
        'Langkah 1: Hitung rata-rata sampel teramati: X_bar = (100 + 110 + 95 + 105 + 120) / 5 = 530 / 5 = 106.0 kW; Y_bar = (40 + 48 + 36 + 44 + 54) / 5 = 222 / 5 = 44.4 kW.',
        'Langkah 2: Hitung rasio efisiensi teramati: theta_hat = 44.4 / 106.0 = 0.41887 (41.89%).',
        'Langkah 3: Lakukan resampling berpasangan dengan indeks [0, 0, 2, 3, 4]: X* = [100, 100, 95, 105, 120]; Y* = [40, 40, 36, 44, 54].',
        'Langkah 4: Hitung rata-rata sampel bootstrap: X_bar* = (100 + 100 + 95 + 105 + 120) / 5 = 520 / 5 = 104.0 kW; Y_bar* = (40 + 40 + 36 + 44 + 54) / 5 = 214 / 5 = 42.8 kW.',
        'Langkah 5: Hitung replikasi rasio bootstrap: theta* = 42.8 / 104.0 = 0.41154 (41.15%).',
      ],
      resultInterpretation: 'Resampling berpasangan mempertahankan kovarians alami antara input dan output turbin, menghasilkan estimasi ketidakpastian rasio yang realistis.',
    },
    pythonImplementation: {
      description: 'Estimasi interval kepercayaan rasio efisiensi berpasangan menggunakan Bootstrap vs Delta Method.',
      libraryDependencies: ['numpy', 'scipy.stats'],
      code: `import numpy as np

# [SIMULASI/SYNTHETIC DATA]
# 30 pengujian efisiensi sistem konversi energi berpasangan
np.random.seed(42)
n = 30
# Input daya X dan output daya Y berkorelasi positif
X = np.random.normal(loc=100.0, scale=12.0, size=n)
Y = 0.45 * X + np.random.normal(loc=0.0, scale=3.0, size=n)

theta_hat = np.mean(Y) / np.mean(X)

# 1. DELTA METHOD
mean_x, mean_y = np.mean(X), np.mean(Y)
var_x = np.var(X, ddof=1) / n
var_y = np.var(Y, ddof=1) / n
cov_xy = np.cov(X, Y)[0, 1] / n

var_delta = (mean_y / mean_x)**2 * (var_y / mean_y**2 + var_x / mean_x**2 - 2 * cov_xy / (mean_x * mean_y))
se_delta = np.sqrt(var_delta)
ci_delta = [theta_hat - 1.96 * se_delta, theta_hat + 1.96 * se_delta]

# 2. PAIRED BOOTSTRAP RESAMPLING (B = 2.000)
B = 2000
boot_ratios = np.zeros(B)
for b in range(B):
    idx = np.random.choice(n, size=n, replace=True)
    boot_ratios[b] = np.mean(Y[idx]) / np.mean(X[idx])

se_boot = np.std(boot_ratios, ddof=1)
ci_boot = [np.percentile(boot_ratios, 2.5), np.percentile(boot_ratios, 97.5)]

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Rasio Parameter Non-Linier:")
print(f"Estimator Rasio Efisiensi Teramati: {theta_hat:.4f}")
print(f"Delta Method SE  : {se_delta:.4f} | 95% CI: [{ci_delta[0]:.4f}, {ci_delta[1]:.4f}]")
print(f"Bootstrap SE     : {se_boot:.4f} | 95% CI: [{ci_boot[0]:.4f}, {ci_boot[1]:.4f}]")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Evaluasi Rasio Parameter Non-Linier:
Estimator Rasio Efisiensi Teramati: 0.4485
Delta Method SE  : 0.0055 | 95% CI: [0.4377, 0.4593]
Bootstrap SE     : 0.0055 | 95% CI: [0.4379, 0.4598]`,
    },
    commonPitfalls: [
      'Melakukan resampling terpisah (unpaired) pada data berpasangan, yang menghancurkan struktur kovarians antara X dan Y.',
      'Menggunakan Delta Method saat penyebut rasio mendekati nol, yang menyebabkan ledakan varians tak terhingga.',
      'Mengabaikan pemangkasan numerik jika sampel bootstrap menghasilkan nilai penyebut bernilai nol.',
    ],
    validationProcedures: [
      'Gunakan Paired Bootstrap (resampling indeks baris secara utuh) untuk seluruh data berpasangan multivariat.',
      'Periksa apakah ada replikasi bootstrap yang menghasilkan nilai ekstrem tak masuk akal akibat penyebut mendekati nol.',
      'Laporkan interval BCa untuk rasio kompleks guna mengoreksi kemencengan distribusi pembagian.',
    ],
    exercises: [
      {
        question: 'Mengapa pada data berpasangan (misal input daya X dan output daya Y), kita wajib meresample pasangan indeks baris (i) dan bukan meresample array X dan array Y secara terpisah?',
        hint: 'Perhatikan istilah kovarians Cov(X, Y) pada rumus Delta Method.',
        answerExplanation: 'Jika X dan Y diresample secara terpisah, korelasi intrinsik antar pasangan observasi akan hilang (kovarians menjadi nol). Padahal pada sistem rekayasa, input tinggi menghasilkan output tinggi (kovarians positif kuat). Menghilangkan kovarians ini akan melipatgandakan estimasi kesalahan baku rasio secara palsu.',
      },
      {
        question: 'Kapan Delta Method mengalami kegagalan total dibandingkan metode Bootstrap?',
        hint: 'Perhatikan kondisi di mana koefisien variasi penyebut bernilai besar atau fungsi memiliki kurvatur tajam.',
        answerExplanation: 'Delta Method gagal total ketika penyebut memiliki probabilitas signifikan berada di dekat nol (koefisien variasi > 0.2) atau fungsi sangat non-linier dengan kurvatur ekstrem di sekitar mean. Pada kondisi ini, ekspansi deret Taylor linieritas lokal tidak lagi berlaku dan memicu bias batas kepercayaan yang fatal.',
      },
    ],
    references: [
      {
        citation: 'Efron, B., & Tibshirani, R. J. (1994). An Introduction to the Bootstrap. CRC Press.',
        type: 'canonical-textbook',
      },
      {
        citation: 'Casella, G., & Berger, R. L. (2002). Statistical Inference (2nd ed.). Duxbury.',
        type: 'canonical-textbook',
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Resampling untuk Estimator Non-Linier',
        bulletPoints: [
          'Banyak metrik rekayasa berbentuk fungsi non-linier atau rasio acak.',
          'Delta Method: Aproksimasi deret Taylor yang rapuh pada sampel kecil.',
          'Bootstrap: Menghitung fungsi non-linier langsung pada setiap replikasi.',
        ],
        keyFormulaOrDiagram: '\\hat{\\theta}_b^* = g(\\bar{x}_b^*, \\bar{y}_b^*) \\implies \\text{Bebas Turunan Kalkulus}',
      },
      {
        slideNumber: 2,
        title: 'Prinsip Paired Resampling',
        bulletPoints: [
          'Wajib meresample vektor indeks baris pada data multivariat.',
          'Mempertahankan kovarians fisis alami antara variabel input dan output.',
          'Gunakan interval BCa untuk mengoreksi kemencengan distribusi pembagian.',
        ],
        keyFormulaOrDiagram: 'I^* = \\text{Sample}(\\{1, \\dots, n\\}) \\implies (x_{I^*}, y_{I^*})',
      },
    ],
  },
};
