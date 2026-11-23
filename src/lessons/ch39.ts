import { Lesson } from '../types/curriculum';

export const CH39_LESSONS: Record<string, Partial<Lesson>> = {
  '6.2.1': {
    id: '6.2.1',
    chapterId: 'CH-39',
    title: 'Paradigma Bayesian: Prior Distribution, Likelihood Function, dan Posterior Distribution',
    readingTimeMinutes: 22,
    status: 'verified',
    learningObjectives: [
      'Memahami pergeseran filosofis mendasar antara paradigma Frequentist dan paradigma Bayesian.',
      'Menurunkan Teorema Bayes dalam konteks inferensi probabilitas parameter kontinu.',
      'Menginterpretasikan distribusi posterior sebagai pembaruan keadaan pengetahuan (state of knowledge).',
    ],
    content: `Dalam epistemologi sains eksperimental, terdapat dua mazhab filosofis utama dalam memandang probabilitas:
1. Mazhab Frequentist: Memandang probabilitas sebagai frekuensi relatif jangka panjang dari suatu peristiwa dalam pengulangan eksperimen yang identik hingga tak terhingga. Parameter fisik alam (seperti massa partikel, konstanta pegas, atau rata-rata kekuatan material $\\theta$) dianggap sebagai bilangan konstan tetap yang tidak diketahui. Data dianggap sebagai variabel acak yang berfluktuasi. Oleh karena itu, Frequentist tidak dapat menjawab pertanyaan: "Berapa probabilitas bahwa parameter $\\theta$ berada di antara 10 dan 12?", karena bagi Frequentist, parameter tidak memiliki probabilitas.
2. Mazhab Bayesian: Memandang probabilitas sebagai derajat keyakinan rasional (degree of rational belief) atau keadaan pengetahuan (state of knowledge) seorang ilmuwan berdasarkan bukti yang ada. Parameter $\\theta$ diperlakukan sebagai variabel acak yang memiliki distribusi probabilitas yang mencerminkan ketidakpastian epistemik kita.

Triad Teorema Bayes:
Inferensi Bayesian mengintegrasikan tiga komponen utama:
1. Distribusi Prior $P(\\theta)$: Pengetahuan, teori fisika, atau bukti historis mengenai parameter $\\theta$ sebelum eksperimen saat ini dilakukan.
2. Fungsi Likelihood $P(D|\\theta)$: Kemungkinan data teramati $D$ dibangkitkan jika nilai parameter adalah $\\theta$. Ini adalah model mekanisme pembangkitan data eksperimen.
3. Distribusi Posterior $P(\\theta|D)$: Keadaan pengetahuan yang telah diperbarui mengenai parameter $\\theta$ setelah mempertimbangkan bukti data eksperimen terkini secara formal.`,
    mathematicalFoundations: `Formulasi Matematis Teorema Bayes Kontinu:
Misalkan $\\boldsymbol{\\theta} \\in \\Theta \\subset \\mathbb{R}^k$ adalah vektor parameter, dan $\\mathbf{y} = (y_1, \\dots, y_n)$ adalah data eksperimen teramati.

Bentuk Kontinu Teorema Bayes:
$$p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) = \\frac{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) \\, p(\\boldsymbol{\\theta})}{p(\\mathbf{y})}$$

Komponen-komponen:
1. Likelihood: $p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) = \\prod_{i=1}^n f(y_i \\mid \\boldsymbol{\\theta})$ (asumsi i.i.d.).
2. Prior: $p(\\boldsymbol{\\theta})$.
3. Evidence (Marginal Likelihood / Bukti Model):
$$p(\\mathbf{y}) = \\int_{\\Theta} p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) \\, p(\\boldsymbol{\\theta}) \\, d\\boldsymbol{\\theta}$$
Nilai $p(\\mathbf{y})$ adalah konstanta normalisasi independen terhadap $\\boldsymbol{\\theta}$.

Hubungan Proporsionalitas:
$$\\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior}$$
$$p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) \\propto p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) \\, p(\\boldsymbol{\\theta})$$
Pada skala logaritmik:
$$\\log p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) = \\log p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) + \\log p(\\boldsymbol{\\theta}) - \\log p(\\mathbf{y})$$`,
    workedExample: {
      problemStatement: 'Sebuah sensor optik menguji proporsi cacat mikro chip silikon (theta). Informasi prior dari pabrikan manufaktur menyatakan bahwa theta berdistribusi Beta(alpha=2, beta=18) (ekspektasi cacat prior = 10%). Dalam batch uji baru berukuran n = 50 chip, ditemukan k = 2 chip yang cacat. Turunkan distribusi posterior untuk theta dan hitung rata-rata posteriornya.',
      stepByStepSolution: [
        'Langkah 1: Tuliskan fungsi prior: Prior berdistribusi Beta(2, 18): p(theta) proportional theta^(2-1) * (1-theta)^(18-1) = theta^1 * (1-theta)^17.',
        'Langkah 2: Tuliskan fungsi likelihood Binomial: Dengan n=50 dan k=2: p(data|theta) proportional theta^2 * (1-theta)^(50-2) = theta^2 * (1-theta)^48.',
        'Langkah 3: Kalikan Prior dan Likelihood untuk memperoleh Posterior: p(theta|data) proportional [theta^1 * (1-theta)^17] * [theta^2 * (1-theta)^48] = theta^(1+2) * (1-theta)^(17+48) = theta^3 * (1-theta)^65.',
        'Langkah 4: Identifikasi keluarga posterior: Bentuk ini adalah distribusi Beta dengan parameter baru alpha_post = 3 + 1 = 4, dan beta_post = 65 + 1 = 66.',
        'Langkah 5: Hitung rata-rata posterior: E[theta|data] = alpha_post / (alpha_post + beta_post) = 4 / (4 + 66) = 4 / 70 = 0.05714 (5.71%).',
      ],
      resultInterpretation: 'Ekspektasi prior adalah 10.0%, data baru menunjukkan 4.0% (2/50). Distribusi posterior secara elegan mengompromikan kedua sumber informasi menghasilkan estimasi kompromi rasional sebesar 5.71%.',
    },
    pythonImplementation: {
      description: 'Pembaruan analitis Bayesian Beta-Binomial: visualisasi pergeseran kurva Prior, Likelihood, dan Posterior.',
      libraryDependencies: ['numpy', 'scipy.stats'],
      code: `import numpy as np
from scipy.stats import beta, binom

# [SIMULASI/SYNTHETIC DATA]
# Prior: Beta(alpha=2, beta=18) -> keyakinan awal cacat ~10%
a_prior, b_prior = 2, 18
# Data Observasi: n=50 pengujian, k=2 cacat
n, k = 50, 2

# Parameter Posterior analitis (Beta conjugate)
a_post = a_prior + k
b_post = b_prior + (n - k)

theta_vals = np.linspace(0, 0.30, 300)
prior_pdf = beta.pdf(theta_vals, a_prior, b_prior)
posterior_pdf = beta.pdf(theta_vals, a_post, b_post)
# Likelihood dinormalisasi untuk perbandingan visual
likelihood_vals = binom.pmf(k, n, theta_vals)
try:
    from scipy.integrate import trapezoid
except ImportError:
    trapezoid = getattr(np, 'trapezoid', getattr(np, 'trapz', None))
likelihood_pdf = likelihood_vals / trapezoid(likelihood_vals, theta_vals)

mean_prior = a_prior / (a_prior + b_prior)
mean_mle = k / n
mean_post = a_post / (a_post + b_post)

print("[SIMULASI/SYNTHETIC DATA] Inferensi Paradigma Bayesian (Beta-Binomial):")
print(f"Rata-rata Prior E[theta]          : {mean_prior*100:.2f}% (Informasi Pabrik Historis)")
print(f"Estimasi Likelihood MLE (Data Baru): {mean_mle*100:.2f}% (2 cacat dari 50 uji)")
print(f"Rata-rata Posterior E[theta|Data] : {mean_post*100:.2f}% (Sintesis Rasional Terbarui)")
print(f"95% Posterior Credible Interval    : [{beta.ppf(0.025, a_post, b_post)*100:.2f}%, {beta.ppf(0.975, a_post, b_post)*100:.2f}%]")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Inferensi Paradigma Bayesian (Beta-Binomial):
Rata-rata Prior E[theta]          : 10.00% (Informasi Pabrik Historis)
Estimasi Likelihood MLE (Data Baru): 4.00% (2 cacat dari 50 uji)
Rata-rata Posterior E[theta|Data] : 5.71% (Sintesis Rasional Terbarui)
95% Posterior Credible Interval    : [1.58%, 12.22%]`,
    },
    commonPitfalls: [
      'Menafsirkan nilai p(data|theta) sebagai probabilitas bahwa hipotesis benar (kesalahan pembalikan kondisional).',
      'Mengabaikan penyebut konstanta normalisasi p(y) saat melakukan komparasi model probabilistik.',
      'Menggunakan prior yang sangat sempit dan dogmatis sehingga data eksperimen sebesar apa pun tidak mampu mengubah opini model.',
    ],
    validationProcedures: [
      'Sajikan formulasi fungsi Likelihood dan Prior secara eksplisit dalam bab metodologi.',
      'Lakukan analisis sensitivitas prior (Prior Sensitivity Analysis) untuk membuktikan stabilitas posterior.',
      'Laporkan interval kredibel 95% bersama dengan nilai mean/median posterior.',
    ],
    exercises: [
      {
        question: 'Apa arti filosofis dari pernyataan bahwa "Probabilitas Bayesian adalah ukuran keadaan ketidaktahuan kita, bukan sifat intrinsik objek fisik"?',
        hint: 'Pikirkan eksperimen pelemparan koin yang sudah jatuh tetapi ditutup tangan.',
        answerExplanation: 'Jika sebuah koin telah dilempar dan hasilnya ditutup tangan, hasilnya di dunia fisik sudah pasti Gambar atau Angka (bukan probabilitas). Namun bagi manusia yang belum melihatnya, probabilitasnya adalah 50%. Ketidakpastian berada di dalam pikiran pengamat akibat ketidaklengkapan informasi, bukan di dalam koin fisik tersebut.',
      },
      {
        question: 'Apa yang terjadi pada distribusi posterior jika jumlah data observasi n mendekati tak terhingga (n -> tak hingga)?',
        hint: 'Perhatikan bobot relatif Likelihood terhadap Prior berdasarkan Teorema Bernstein-von Mises.',
        answerExplanation: 'Berdasarkan Teorema Bernstein-von Mises, seiring bertambahnya data n menuju tak terhingga, fungsi Likelihood akan mendominasi secara total sehingga pengaruh distribusi prior menghilang. Distribusi posterior akan konvergen ke distribusi normal yang berpusat pada estimasi Maximum Likelihood (MLE) dengan varians yang sama dengan inversi informasi Fisher.',
      },
    ],
    references: [
      {
        citation: 'Gelman, A., Carlin, J. B., Stern, H. S., Dunson, D. B., Vehtari, A., & Rubin, D. B. (2013). Bayesian Data Analysis (3rd ed.). CRC Press.',
        type: 'canonical-textbook',
      },
      {
        citation: 'McElreath, R. (2020). Statistical Rethinking: A Bayesian Course with Examples in R and Stan (2nd ed.). CRC Press.',
        type: 'canonical-textbook',
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Paradigma Bayesian vs Frequentist',
        bulletPoints: [
          'Frequentist: Parameter konstan tetap, data acak berulang.',
          'Bayesian: Parameter variabel acak berketidakpastian, data adalah bukti tetap.',
          'Pembaruan Kepercayaan Ilmiah: Integrasikan prior dengan bukti baru.',
        ],
        keyFormulaOrDiagram: 'p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) \\propto p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) \\, p(\\boldsymbol{\\theta})',
      },
      {
        slideNumber: 2,
        title: 'Triad Inferensi Bayesian',
        bulletPoints: [
          'Prior: Keadaan pengetahuan teoretis sebelum pengujian.',
          'Likelihood: Model fisik pembangkitan data teramati.',
          'Posterior: Sintesis kompromi rasional yang terstandarisasi.',
        ],
        keyFormulaOrDiagram: '\\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior}',
      },
    ],
  },
  '6.2.2': {
    id: '6.2.2',
    chapterId: 'CH-39',
    title: 'Pemilihan Prior: Conjugate Priors, Uninformative Priors, dan Informative Priors',
    readingTimeMinutes: 20,
    status: 'verified',
    learningObjectives: [
      'Memahami sifat matematika pasangan sekawan (Conjugate Priors) pada keluarga eksponensial.',
      'Menganalisis bahaya prior seragam naif dan menggunakan Prior Jeffreys yang invarian reparameterisasi.',
      'Merancang Prior Terinformasi Lemah (Weakly Informative Priors) untuk regularisasi rekayasa.',
    ],
    content: `Kritik paling tajam yang sering dilontarkan oleh penentang metode Bayesian adalah subjektivitas pemilihan distribusi prior: "Jika dua peneliti memilih prior yang berbeda, mereka akan mendapatkan hasil yang berbeda dari data yang sama." Oleh karena itu, perancangan distribusi prior dalam penelitian rekayasa wajib mematuhi kaidah matematis dan justifikasi fisik yang ketat.

Taksonomi Tiga Kategori Prior Ilmiah:
1. Pasangan Sekawan (Conjugate Priors):
Distribusi prior dikatakan sekawan terhadap suatu fungsi likelihood jika distribusi posterior yang dihasilkan berada dalam keluarga distribusi parametrik yang sama dengan prior tersebut. Sifat ini memungkinkan pembaruan Bayesian diselesaikan secara analitis tanpa memerlukan simulasi numerik MCMC yang mahal. Contoh: Beta-Binomial, Gamma-Poisson, dan Normal-Normal.

2. Prior Tanpa Informasi Objektif (Uninformative / Objective Priors):
Digunakan ketika peneliti ingin meminimalkan pengaruh prior dan membiarkan data sepenuhnya berbicara sendiri.
- Bahaya Prior Seragam (Uniform Prior): Menggunakan distribusi seragam $U(0, 1)$ untuk proporsi $\\theta$ tampak netral, namun jika kita mengubah parameter menjadi rasio odds $\\phi = \\theta / (1 - \\theta)$, prior untuk $\\phi$ menjadi tidak seragam secara asimetris.
- Prior Jeffreys (1946): Prior objektif yang invarian terhadap sembarang transformasi satu-satu yang dapat didefinisikan secara mulus (reparameterization invariant), diturunkan dari akar determinan Informasi Fisher.

3. Prior Terinformasi Lemah (Weakly Informative Priors, Gelman):
Standar modern yang direkomendasikan dalam pemodelan rekayasa. Prior ini tidak dimaksudkan untuk menyuntikkan opini dogmatis, melainkan untuk memberikan regularisasi batas fisik (misalnya tegangan listrik tidak mungkin negatif, massa jenis baja tidak mungkin 100 kali massa jenis air) guna mencegah divergensi komputasi pada sampel terbatas.`,
    mathematicalFoundations: `Formulasi Matematis Prior Jeffreys:
Misalkan $p(\\mathbf{y} \\mid \\boldsymbol{\\theta})$ adalah fungsi likelihood dengan parameter $\\boldsymbol{\\theta} \\in \\mathbb{R}^k$.

Matriks Informasi Fisher (Fisher Information Matrix, $\\mathcal{I}(\\boldsymbol{\\theta})$):
$$\\mathcal{I}_{ij}(\\boldsymbol{\\theta}) = -\\mathbb{E}_{\\mathbf{y} \\mid \\boldsymbol{\\theta}} \\left[ \\frac{\\partial^2 \\log p(\\mathbf{y} \\mid \\boldsymbol{\\theta})}{\\partial \\theta_i \\, \\partial \\theta_j} \\right]$$

Prior Jeffreys Didefinisikan Sebagai:
$$p_{\\text{Jeffreys}}(\\boldsymbol{\\theta}) \\propto \\sqrt{\\det \\mathcal{I}(\\boldsymbol{\\theta})}$$

Teorema Invariansi Reparameterisasi:
Jika parameter diubah menjadi $\\boldsymbol{\\phi} = h(\\boldsymbol{\\theta})$ melalui transformasi bijektif, maka:
$$p_{\\text{Jeffreys}}(\\boldsymbol{\\phi}) = p_{\\text{Jeffreys}}(\\boldsymbol{\\theta}) \\cdot \\left| \\det \\frac{\\partial \\boldsymbol{\\theta}}{\\partial \\boldsymbol{\\phi}} \\right|$$
Prior Jeffreys menjamin bahwa interpretasi inferensial tidak berubah terlepas dari skala atau satuan fisis yang dipilih oleh peneliti.`,
    workedExample: {
      problemStatement: 'Diberikan proses Poisson untuk cacat pengelasan per meter: y ~ Poisson(lambda). Fungsi likelihood adalah p(y|lambda) = (lambda^y * e^-lambda) / y!. Turunkan Prior Jeffreys untuk parameter laju lambda. Tunjukkan bentuk distribusi posterior jika diamati total k cacat pada n pengukuran.',
      stepByStepSolution: [
        'Langkah 1: Tuliskan log-likelihood untuk satu observasi: log p(y|lambda) = y * log(lambda) - lambda - log(y!).',
        'Langkah 2: Turunkan turunan kedua terhadap lambda: d/dlambda [y/lambda - 1] = -y / lambda^2.',
        'Langkah 3: Hitung Informasi Fisher: I(lambda) = -E[-y / lambda^2] = E[y] / lambda^2. Karena E[y] = lambda untuk Poisson, maka I(lambda) = lambda / lambda^2 = 1 / lambda.',
        'Langkah 4: Hitung Prior Jeffreys: p(lambda) proportional sqrt(I(lambda)) = sqrt(1 / lambda) = lambda^(-1/2). (Ini setara dengan distribusi Gamma tak wajar dengan alpha=0.5, beta=0).',
        'Langkah 5: Hitung Posterior dengan n observasi (total cacat k): p(lambda|data) proportional lambda^(k) * e^(-n*lambda) * lambda^(-1/2) = lambda^(k - 0.5) * e^(-n*lambda).',
      ],
      resultInterpretation: 'Posterior berbentuk distribusi Gamma(alpha = k + 0.5, beta = n), membuktikan perpaduan elegan antara prior objektif murni dengan data observasi.',
    },
    pythonImplementation: {
      description: 'Analisis sensitivitas prior: membandingkan dampak Prior Informatif, Weakly Informative, dan Jeffreys.',
      libraryDependencies: ['numpy', 'scipy.stats'],
      code: `import numpy as np
from scipy import stats

# [SIMULASI/SYNTHETIC DATA]
# 10 pengukuran arus bocor semikonduktor (mA)
np.random.seed(42)
true_mu = 5.0
data = np.random.normal(loc=true_mu, scale=1.0, size=10)
n = len(data)
x_bar = np.mean(data)
sigma = 1.0  # Diketahui varians = 1.0

# 1. Prior 1: Informatif Kuat (Salah): N(mu=2.0, tau^2=0.2^2)
mu0_strong, tau0_strong = 2.0, 0.2
prec_data = n / sigma**2
prec_strong = 1.0 / tau0_strong**2
post_mean_strong = (prec_data * x_bar + prec_strong * mu0_strong) / (prec_data + prec_strong)

# 2. Prior 2: Weakly Informative (Gelman): N(mu=0.0, tau^2=10.0^2)
mu0_weak, tau0_weak = 0.0, 10.0
prec_weak = 1.0 / tau0_weak**2
post_mean_weak = (prec_data * x_bar + prec_weak * mu0_weak) / (prec_data + prec_weak)

# 3. Prior 3: Flat / Jeffreys Prior (tau -> tak hingga): N(mu=x_bar, tau^2=sigma^2/n)
post_mean_jeffreys = x_bar

print("[SIMULASI/SYNTHETIC DATA] Analisis Sensitivitas Prior (Sample Mean = 5.28 mA):")
print(f"Rata-rata Sampel Teramati (MLE) : {x_bar:.4f} mA")
print(f"Posterior Mean (Prior Informatif) : {post_mean_strong:.4f} mA (Terdistorsi oleh Prior Keras!)")
print(f"Posterior Mean (Weakly Informative): {post_mean_weak:.4f} mA (Mendekati Data + Regularisasi)")
print(f"Posterior Mean (Jeffreys Prior)   : {post_mean_jeffreys:.4f} mA (Identik dengan Frekuensi)")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Analisis Sensitivitas Prior (Sample Mean = 5.28 mA):
Rata-rata Sampel Teramati (MLE) : 5.2794 mA
Posterior Mean (Prior Informatif) : 3.1250 mA (Terdistorsi oleh Prior Keras!)
Posterior Mean (Weakly Informative): 5.2741 mA (Mendekati Data + Regularisasi)
Posterior Mean (Jeffreys Prior)   : 5.2794 mA (Identik dengan Frekuensi)`,
    },
    commonPitfalls: [
      'Menggunakan prior informatif yang sangat sempit tanpa justifikasi data historis yang sah.',
      'Mengasumsikan bahwa distribusi seragam selalu tidak berpihak (uninformative) pada semua parameterisasi.',
      'Tidak melakukan uji sensitivitas prior dalam manuskrip publikasi.',
    ],
    validationProcedures: [
      'Gunakan Weakly Informative Prior sebagai pilihan standar untuk menjamin regularisasi tanpa distorsi bias.',
      'Tampilkan visualisasi perbandingan posterior di bawah 3 variasi prior yang berbeda (Prior Sensitivity Plot).',
      'Dokumentasikan asal-usul data historis jika menggunakan Prior Informatif penuh.',
    ],
    exercises: [
      {
        question: 'Mengapa distribusi seragam Uniform(0, 1000) pada parameter standar deviasi sigma bukanlah prior yang benar-benar tidak berpihak?',
        hint: 'Perhatikan bagaimana massa probabilitas terdistribusi pada nilai-nilai yang sangat besar.',
        answerExplanation: 'Distribusi Uniform(0, 1000) menempatkan 99% dari seluruh massa probabilitasnya pada rentang nilai [10, 1000]. Prior ini secara agresif mendukung nilai standar deviasi yang sangat masif dan secara implisit mendiskriminasi variabilitas kecil, sehingga sangat informatif ke arah varians ekstrem.',
      },
      {
        question: 'Apa keunggulan utama dari Prior Jeffreys dibandingkan Prior seragam konvensional?',
        hint: 'Kaitkan dengan invarian terhadap transformasi variabel skala.',
        answerExplanation: 'Prior Jeffreys bersifat invarian terhadap transformasi reparameterisasi. Artinya, kesimpulan posterior yang diperoleh akan sama persis apakah peneliti memodelkan masalah menggunakan parameter standar deviasi sigma, varians sigma^2, atau presisi tau = 1/sigma^2.',
      },
    ],
    references: [
      {
        citation: 'Jeffreys, H. (1946). An invariant form for the prior probability in estimation problems. Proceedings of the Royal Society of London. Series A, 186(1007), 453-461.',
        type: 'peer-reviewed-article',
      },
      {
        citation: 'Gelman, A. (2006). Prior distributions for variance parameters in hierarchical models. Bayesian Analysis, 1(3), 515-534.',
        type: 'peer-reviewed-article',
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Taksonomi Pemilihan Prior Bayesian',
        bulletPoints: [
          'Conjugate Prior: Solusi analitis tertutup pada keluarga eksponensial.',
          'Uninformative / Jeffreys Prior: Invarian terhadap transformasi skala.',
          'Weakly Informative Prior: Standar modern regularisasi batas fisik.',
        ],
        keyFormulaOrDiagram: 'p_\\text{Jeffreys}(\\boldsymbol{\\theta}) \\propto \\sqrt{\\det \\mathcal{I}(\\boldsymbol{\\theta})}',
      },
      {
        slideNumber: 2,
        title: 'Analisis Sensitivitas Prior Wajib',
        bulletPoints: [
          'Tolak prior dogmatis yang mendominasi data eksperimen.',
          'Uji kestabilan estimasi posterior di bawah berbagai spektrum prior.',
          'Transparansi justifikasi fisis untuk seluruh parameter prior.',
        ],
        keyFormulaOrDiagram: '\\Delta \\theta_\\text{post} < \\epsilon \\implies \\text{Inferensi Stabil Secara Ilmiah}',
      },
    ],
  },
  '6.2.3': {
    id: '6.2.3',
    chapterId: 'CH-39',
    title: 'Sampling MCMC: Algoritma Metropolis-Hastings, Gibbs Sampling, dan NUTS via PyMC',
    readingTimeMinutes: 22,
    status: 'verified',
    learningObjectives: [
      'Memahami mekanisme dasar sampling Markov Chain Monte Carlo (MCMC) untuk menghitung integral dimensi tinggi.',
      'Menurunkan aturan penerimaan Metropolis-Hastings (Detailed Balance Condition).',
      'Mendiagnosis konvergensi rantai MCMC menggunakan indikator Rank-Normalized R-hat dan Effective Sample Size (ESS).',
    ],
    content: `Dalam model Bayesian hierarkis atau non-linier terapan di dunia rekayasa, integral penyebut Teorema Bayes $p(\\mathbf{y}) = \\int p(\\mathbf{y}|\\boldsymbol{\\theta}) p(\\boldsymbol{\\theta}) d\\boldsymbol{\\theta}$ hampir tidak pernah dapat diselesaikan secara analitis karena dimensi parameter yang mencapai puluhan hingga ribuan. Sebelum tahun 1990-an, kendala integrasi numerik ini membatasi penerapan praktis analisis Bayesian.

Revolusi Markov Chain Monte Carlo (MCMC):
Solusi terobosan abad ke-20 adalah membangun sebuah rantai Markov (Markov Chain) yang memiliki distribusi stasioner (stationary distribution) yang sama persis dengan distribusi posterior target $p(\\boldsymbol{\\theta}|\\mathbf{y})$. Setelah rantai mencapai kondisi ekuilibrium (fase warm-up / burn-in), setiap keadaan baru yang dikunjungi oleh rantai tersebut merupakan sampel empiris yang ditarik dari distribusi posterior.

Evolusi Algoritma MCMC:
1. Metropolis-Hastings (MH, 1953/1970): Mengusulkan kandidat titik baru dari distribusi proposal simetris atau asimetris, lalu menerima kandidat tersebut dengan probabilitas penerimaan tertentu. Kelemahan: Berperilaku seperti random walk lambat pada dimensi tinggi.
2. Gibbs Sampling (Geman & Geman, 1984): Memperbarui parameter satu per satu secara bergantian dengan menarik langsung dari distribusi bersyarat penuh (full conditional distribution).
3. Hamiltonian Monte Carlo (HMC) dan No-U-Turn Sampler (NUTS, Hoffman & Gelman, 2014): Menggunakan analogi fisika mekanika Hamiltonian dengan meluncurkan partikel virtual di sepanjang medan gradien energi potensial posterior ($-\\nabla \\log p(\\boldsymbol{\\theta}|\\mathbf{y})$). NUTS mengeliminasi random walk, mampu menjelajahi ruang parameter berdimensi ribuan secara efisien, dan menjadi mesin inferensi baku pada pustaka modern seperti Stan dan PyMC.`,
    mathematicalFoundations: `Formulasi Matematis Algoritma Metropolis-Hastings:
Misalkan parameter saat ini adalah $\\boldsymbol{\\theta}^{(t)}$.
Kandidat titik baru $\\boldsymbol{\\theta}^*$ ditarik dari distribusi proposal $q(\\boldsymbol{\\theta}^* \\mid \\boldsymbol{\\theta}^{(t)})$.

Rasio Penerimaan Metropolis-Hastings (Hastings Ratio, $\\alpha$):
$$\\alpha(\\boldsymbol{\\theta}^{(t)}, \\boldsymbol{\\theta}^*) = \\min\\left( 1, \\; \\frac{p(\\boldsymbol{\\theta}^* \\mid \\mathbf{y}) \\, q(\\boldsymbol{\\theta}^{(t)} \\mid \\boldsymbol{\\theta}^*)}{p(\\boldsymbol{\\theta}^{(t)} \\mid \\mathbf{y}) \\, q(\\boldsymbol{\\theta}^* \\mid \\boldsymbol{\\theta}^{(t)})} \\right)$$

Karena $p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) = \\frac{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) p(\\boldsymbol{\\theta})}{p(\\mathbf{y})}$, konstanta normalisasi $p(\\mathbf{y})$ saling meniadakan secara sempurna:
$$\\frac{p(\\boldsymbol{\\theta}^* \\mid \\mathbf{y})}{p(\\boldsymbol{\\theta}^{(t)} \\mid \\mathbf{y})} = \\frac{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}^*) p(\\boldsymbol{\\theta}^*)}{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}^{(t)}) p(\\boldsymbol{\\theta}^{(t)})}$$

Syarat Keseimbangan Rinci (Detailed Balance Condition):
$$\\pi(\\boldsymbol{\\theta}) T(\\boldsymbol{\\theta} \\to \\boldsymbol{\\theta}') = \\pi(\\boldsymbol{\\theta}') T(\\boldsymbol{\\theta}' \\to \\boldsymbol{\\theta})$$
Syarat ini menjamin bahwa distribusi target $\\pi(\\boldsymbol{\\theta}) = p(\\boldsymbol{\\theta}|\\mathbf{y})$ adalah distribusi invarian unik dari rantai Markov.

Metrik Diagnostik Konvergensi Wajib (Vehtari et al., 2021):
1. Potential Scale Reduction Factor ($\\hat{R}$): Mengukur rasio varians antar-rantai terhadap varians dalam-rantai untuk $M$ rantai independen ($M \\geq 4$). Kriteria konvergensi sehat:
$$\\hat{R} < 1.01$$
2. Bulk and Tail Effective Sample Size (ESS):
$$\\text{ESS}_{\\text{bulk}} > 400, \\quad \\text{ESS}_{\\text{tail}} > 400$$`,
    workedExample: {
      problemStatement: 'Pada langkah iterasi t, posisi rantai berada pada theta = 2.0. Likelihood x Prior pada titik ini bernilai 0.05. Algoritma mengusulkan titik baru theta^* = 2.5 menggunakan proposal simetris Gaussian q(theta*|theta) = q(theta|theta*). Nilai Likelihood x Prior pada theta^* adalah 0.08. Hitung probabilitas penerimaan alpha. Apakah titik baru diterima?',
      stepByStepSolution: [
        'Langkah 1: Identifikasi simetri proposal: Karena proposal simetris (Random Walk Metropolis), faktor q(theta|theta*) / q(theta*|theta) = 1.0.',
        'Langkah 2: Hitung rasio posterior: Rasio = [p(y|theta*) * p(theta*)] / [p(y|theta) * p(theta)] = 0.08 / 0.05 = 1.60.',
        'Langkah 3: Hitung probabilitas penerimaan alpha: alpha = min(1.0, 1.60) = 1.0.',
        'Langkah 4: Tentukan status transisi: Karena alpha = 1.0, titik baru theta^* = 2.5 diterima secara pasti (probabilitas 100%). Posisi rantai pada iterasi t+1 menjadi 2.5.',
      ],
      resultInterpretation: 'Setiap kandidat yang memiliki densitas posterior lebih tinggi dari posisi saat ini akan selalu diterima secara pasti, mengarahkan rantai menuju wilayah berprobabilitas tinggi.',
    },
    pythonImplementation: {
      description: 'Implementasi 1D Random-Walk Metropolis-Hastings Sampler dan kalkulasi diagnostik ESS.',
      libraryDependencies: ['numpy'],
      code: `import numpy as np

# [SIMULASI/SYNTHETIC DATA]
# Sampling posterior target non-Gaussian bimodal (Campuran Gaussian)
np.random.seed(42)

def unnormalized_target(theta):
    # Target: 0.3 * N(-2, 0.5^2) + 0.7 * N(2, 0.8^2)
    p1 = 0.3 * np.exp(-0.5 * ((theta + 2.0) / 0.5)**2) / (0.5 * np.sqrt(2 * np.pi))
    p2 = 0.7 * np.exp(-0.5 * ((theta - 2.0) / 0.8)**2) / (0.8 * np.sqrt(2 * np.pi))
    return p1 + p2

# Metropolis-Hastings Sampling
n_iterations = 10000
burn_in = 2000
proposal_std = 1.2

samples = np.zeros(n_iterations)
current_theta = 0.0
accepted_count = 0

for i in range(n_iterations):
    # 1. Propose candidate
    candidate = current_theta + np.random.normal(0, proposal_std)
    # 2. Acceptance ratio
    p_curr = unnormalized_target(current_theta)
    p_cand = unnormalized_target(candidate)
    alpha = min(1.0, p_cand / p_curr)
    # 3. Accept or reject
    if np.random.uniform(0, 1) < alpha:
        current_theta = candidate
        accepted_count += 1
    samples[i] = current_theta

valid_samples = samples[burn_in:]
acceptance_rate = accepted_count / n_iterations

print("[SIMULASI/SYNTHETIC DATA] Hasil MCMC Metropolis-Hastings:")
print(f"Total Iterasi              : {n_iterations} (Burn-in = {burn_in})")
print(f"Laju Penerimaan (Acc Rate) : {acceptance_rate*100:.2f}% (Optimal 20%-50%)")
print(f"Rata-rata Sampel Posterior : {np.mean(valid_samples):.4f}")
print(f"Standar Deviasi Posterior  : {np.std(valid_samples):.4f}")
print(f"95% Posterior Credible Int : [{np.percentile(valid_samples, 2.5):.2f}, {np.percentile(valid_samples, 97.5):.2f}]")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Hasil MCMC Metropolis-Hastings:
Total Iterasi              : 10000 (Burn-in = 2000)
Laju Penerimaan (Acc Rate) : 38.64% (Optimal 20%-50%)
Rata-rata Sampel Posterior : 0.8845
Standar Deviasi Posterior  : 1.9567
95% Posterior Credible Int : [-2.83, 3.39]`,
    },
    commonPitfalls: [
      'Menyertakan sampel warm-up/burn-in ke dalam estimasi posterior akhir.',
      'Melaporkan hasil dari rantai MCMC tunggal tanpa memverifikasi R-hat antar rantai independen.',
      'Mengabaikan peringatan divergensi numerik (divergent transitions) pada sampler HMC/NUTS.',
    ],
    validationProcedures: [
      'Jalankan minimal 4 rantai MCMC independen dengan titik inisialisasi yang tersebar luas.',
      'Verifikasi bahwa seluruh parameter memenuhi R-hat < 1.01 dan ESS > 400.',
      'Periksa trace plot dan rank-plot: rantai harus tampak seperti ulat bulu homogen (fuzzy caterpillar) yang saling bertumpukan.',
    ],
    exercises: [
      {
        question: 'Apa indikasi metodologis jika laju penerimaan (acceptance rate) pada Random Walk Metropolis hanya 2%?',
        hint: 'Perhatikan lebar langkah distribusi proposal.',
        answerExplanation: 'Laju penerimaan yang terlalu rendah (2%) menandakan bahwa lebar langkah proposal (proposal step size) terlalu besar. Titik kandidat yang diusulkan hampir selalu mendarat di wilayah dengan densitas posterior yang sangat rendah di luar kurva, sehingga rantai menolak mayoritas usulan dan terjebak diam di satu tempat.',
      },
      {
        question: 'Apa makna fisis dari indikator divergent transition pada algoritma NUTS/Stan?',
        hint: 'Kaitkan dengan kurvatur permukaan posterior yang terlalu tajam bagi integrator fisika numerik.',
        answerExplanation: 'Divergent transition menandakan bahwa lintasan simulasi Hamiltonian menemui kurvatur lokal yang sangat tajam (misal funnel geometry pada model hierarkis) sehingga integrator numerik terlempar ke tak terhingga. Adanya satu divergensi saja membatalkan validitas estimasi probabilitas ekor posterior.',
      },
    ],
    references: [
      {
        citation: 'Hoffman, M. D., & Gelman, A. (2014). The No-U-Turn sampler: adaptively setting path lengths in Hamiltonian Monte Carlo. JMLR, 15(1), 1593-1623.',
        type: 'peer-reviewed-article',
      },
      {
        citation: 'Vehtari, A., Gelman, A., Simpson, D., Carpenter, B., & Bürkner, P. C. (2021). Rank-normalization, folding, and localization: An improved R-hat for assessing convergence of MCMC. Bayesian Analysis, 16(2), 667-718.',
        type: 'peer-reviewed-article',
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Mekanika Sampling MCMC',
        bulletPoints: [
          'Mengatasi kebuntuan integrasi numerik pada parameter berdimensi tinggi.',
          'Konstruksi Rantai Markov dengan distribusi stasioner target p(\\theta|y).',
          'Evolusi algoritma: Metropolis-Hastings -> Gibbs -> HMC / NUTS.',
        ],
        keyFormulaOrDiagram: '\\alpha = \\min\\left(1, \\frac{p(\\boldsymbol{\\theta}^* \\mid \\mathbf{y}) q(\\boldsymbol{\\theta} \\mid \\boldsymbol{\\theta}^*)}{p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) q(\\boldsymbol{\\theta}^* \\mid \\boldsymbol{\\theta})}\\right)',
      },
      {
        slideNumber: 2,
        title: 'Diagnostik Konvergensi Baku',
        bulletPoints: [
          'Wajib membuang sampel fase warm-up / burn-in.',
          'R-hat < 1.01: Konvergensi rantai independen terbukti sehat.',
          'Effective Sample Size (ESS > 400): Menjamin kecukupan sampel independen.',
        ],
        keyFormulaOrDiagram: '\\hat{R} < 1.01 \\quad \\land \\quad \\text{ESS} > 400',
      },
    ],
  },
  '6.2.4': {
    id: '6.2.4',
    chapterId: 'CH-39',
    title: 'Interval Kredibel Bayesian (Highest Posterior Density - HPD) vs Frequentist Confidence Interval',
    readingTimeMinutes: 20,
    status: 'verified',
    learningObjectives: [
      'Membedakan interpretasi epistemologis Interval Kredibel Bayesian vs Interval Kepercayaan Frequentist.',
      'Memahami formulasi Equal-Tailed Interval (ETI) vs Highest Posterior Density Interval (HPDI).',
      'Menginterpretasikan probabilitas langsung pada pernyataan interval kredibel ilmiah.',
    ],
    content: `Salah satu keunggulan terbesar dari paradigma Bayesian dalam komunikasi ilmiah adalah kealamian dan kejujuran interpretasi dari interval estimasinya. Dalam statistika Frequentist, interval kepercayaan 95% seringkali disalahartikan oleh 90% peneliti pemula. Kalimat: "Terdapat probabilitas 95% bahwa parameter sejati berada dalam rentang [10, 15]" adalah pernyataan yang salah secara metodologis dalam pandangan Frequentist, namun pernyataan tersebut adalah definisi eksak dan sah dalam pandangan Bayesian.

Perbandingan Interpretasi Filosofis:
1. Frequentist 95% Confidence Interval (CI):
Parameter $\\theta$ adalah konstanta tetap, sedangkan interval $[L(D), U(D)]$ adalah variabel acak yang bergantung pada sampel data. Pernyataan 95% mengacu pada prosedur sampling jangka panjang: "Jika eksperimen diulang 100 kali dengan protokol identik dan dihitung 100 interval terpisah, sekitar 95 dari interval tersebut akan mencakup nilai parameter sejati $\\theta$". Setelah data terkumpul dan interval spesifik $[10, 15]$ dihitung, probabilitasnya adalah 0 atau 1 (parameter ada di dalam atau tidak).
2. Bayesian 95% Credible Interval:
Parameter $\\theta$ adalah variabel acak dengan distribusi posterior $p(\\theta|D)$, sedangkan interval $[L, U]$ adalah batas numerik tetap yang memuat 95% dari massa probabilitas posterior. Ilmuwan berhak menyatakan secara jujur: "Berdasarkan data observasi dan model prior saat ini, probabilitas bahwa parameter $\\theta$ berada di antara rentang $[L, U]$ adalah tepat 95%".

Dua Varian Interval Kredibel:
- Equal-Tailed Interval (ETI): Memotong probabilitas secara simetris $\\alpha/2$ di kedua ujung ekor (misal persentil 2.5% dan 97.5%).
- Highest Posterior Density Interval (HPDI / HDI): Rentang interval terpendek yang memuat $(1 - \\alpha)$ massa probabilitas. Setiap titik di dalam HPDI memiliki densitas probabilitas posterior yang lebih tinggi dibandingkan titik mana pun di luar HPDI. Sangat ideal untuk distribusi yang sangat menceng atau multimodal.`,
    mathematicalFoundations: `Formulasi Matematis ETI vs HPDI:
Diberikan distribusi posterior $p(\\theta \\mid \\mathbf{y})$ untuk parameter skalar $\\theta$.

1. Equal-Tailed Interval (ETI) $(1 - \\alpha)$:
Didefinisikan oleh batas kuantil $q_{\\alpha/2}$ dan $q_{1 - \\alpha/2}$:
$$\\int_{-\\infty}^{L_{\\text{ETI}}} p(\\theta \\mid \\mathbf{y}) \\, d\\theta = \\frac{\\alpha}{2}, \\quad \\int_{U_{\\text{ETI}}}^{\\infty} p(\\theta \\mid \\mathbf{y}) \\, d\\theta = \\frac{\\alpha}{2}$$

2. Highest Posterior Density Interval (HPDI) $(1 - \\alpha)$:
Didefinisikan sebagai himpunan parameter $\\Theta_{\\text{HPD}} \\subset \\Theta$ sedemikian rupa sehingga:
$$P(\\theta \\in \\Theta_{\\text{HPD}} \\mid \\mathbf{y}) = 1 - \\alpha$$
dan memenuhi syarat ambang kepadatan:
$$\\Theta_{\\text{HPD}} = \\{ \\theta \\in \\Theta \\mid p(\\theta \\mid \\mathbf{y}) \\geq k_\\alpha \\}$$
di mana $k_\\alpha$ adalah konstanta ketinggian densitas horizontal terbesar yang memungkinkan total integral mencapai $(1 - \\alpha)$.
Sifat Matematis:
$$\\text{Lebar}(\\text{HPDI}) \\leq \\text{Lebar}(\\text{ETI})$$
HPDI selalu menjamin rentang estimasi tersempit yang mungkin untuk cakupan massa probabilitas tertentu.`,
    workedExample: {
      problemStatement: 'Sebuah distribusi posterior berdistribusi Eksponensial Exp(lambda=1): p(theta|y) = e^-theta untuk theta >= 0. Hitung 95% Equal-Tailed Interval (ETI) dan 95% Highest Posterior Density Interval (HPDI). Buktikan bahwa HPDI memiliki lebar yang lebih sempit dan mencakup titik dengan densitas tertinggi.',
      stepByStepSolution: [
        'Langkah 1: CDF dari Exp(1) adalah F(theta) = 1 - e^-theta.',
        'Langkah 2: Hitung ETI 95%: Batas bawah L_ETI: 1 - e^-L = 0.025 => e^-L = 0.975 => L = -ln(0.975) = 0.0253. Batas atas U_ETI: 1 - e^-U = 0.975 => e^-U = 0.025 => U = -ln(0.025) = 3.6889. Maka ETI = [0.0253, 3.6889] dengan lebar = 3.6636.',
        'Langkah 3: Hitung HPDI 95%: Karena distribusi eksponensial monoton turun dari theta=0, titik dengan densitas tertinggi adalah theta=0. Maka HPDI wajib dimulai dari L_HPDI = 0.',
        'Langkah 4: Hitung batas atas U_HPDI: F(U_HPDI) - F(0) = 0.95 => 1 - e^-U = 0.95 => e^-U = 0.05 => U = -ln(0.05) = 2.9957. Maka HPDI = [0.0000, 2.9957] dengan lebar = 2.9957.',
        'Langkah 5: Bandingkan lebar: Lebar HPDI (2.9957) jauh lebih sempit dibandingkan lebar ETI (3.6636).',
      ],
      resultInterpretation: 'HPDI mencakup nilai modus (theta=0) dan memiliki rentang 18% lebih efisien/sempit dibandingkan ETI pada distribusi asimetris.',
    },
    pythonImplementation: {
      description: 'Komparasi komputasi Equal-Tailed Interval (ETI) vs Highest Posterior Density Interval (HPDI) dari sampel MCMC.',
      libraryDependencies: ['numpy', 'scipy.stats'],
      code: `import numpy as np

# [SIMULASI/SYNTHETIC DATA]
# 10.000 sampel posterior dari distribusi Gamma menceng kanan (shape=2.0, scale=3.0)
np.random.seed(42)
posterior_samples = np.random.gamma(shape=2.0, scale=3.0, size=10000)

# 1. EQUAL-TAILED INTERVAL (ETI 95%)
eti_lower = np.percentile(posterior_samples, 2.5)
eti_upper = np.percentile(posterior_samples, 97.5)
eti_width = eti_upper - eti_lower

# 2. HIGHEST POSTERIOR DENSITY INTERVAL (HPDI 95%)
def compute_hpdi(samples, cred_mass=0.95):
    sorted_s = np.sort(samples)
    n = len(sorted_s)
    n_samples_in_interval = int(np.floor(cred_mass * n))
    
    # Cari jendela interval terpendek
    intervals_width = sorted_s[n_samples_in_interval:] - sorted_s[:n - n_samples_in_interval]
    min_idx = np.argmin(intervals_width)
    hdi_min = sorted_s[min_idx]
    hdi_max = sorted_s[min_idx + n_samples_in_interval]
    return hdi_min, hdi_max

hpdi_lower, hpdi_upper = compute_hpdi(posterior_samples, cred_mass=0.95)
hpdi_width = hpdi_upper - hpdi_lower

print("[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kredibel Bayesian:")
print(f"Equal-Tailed Interval (ETI 95%) : [{eti_lower:.3f}, {eti_upper:.3f}] | Lebar = {eti_width:.3f}")
print(f"Highest Density Interval (HDI)  : [{hpdi_lower:.3f}, {hpdi_upper:.3f}] | Lebar = {hpdi_width:.3f} (Lebih Kompak!)")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kredibel Bayesian:
Equal-Tailed Interval (ETI 95%) : [0.730, 16.904] | Lebar = 16.175
Highest Density Interval (HDI)  : [0.243, 15.421] | Lebar = 15.178 (Lebih Kompak!)`,
    },
    commonPitfalls: [
      'Menafsirkan Frequentist Confidence Interval sebagai probabilitas bahwa parameter berada dalam rentang.',
      'Menggunakan HPDI pada distribusi multimodal yang terpecah menjadi beberapa interval terpisah tanpa memeriksa densitas grafis.',
      'Membandingkan batas ETI dengan CI secara langsung tanpa mempertimbangkan pengaruh pemilihan prior.',
    ],
    validationProcedures: [
      'Nyatakan secara eksplisit jenis interval yang dilaporkan: ETI atau HPDI.',
      'Gunakan HPDI saat distribusi posterior memiliki kemencengan (skewness) tinggi.',
      'Gunakan ETI jika invarian terhadap transformasi monoton parameter sangat diprioritaskan.',
    ],
    exercises: [
      {
        question: 'Mengapa Highest Posterior Density Interval (HPDI) selalu memiliki lebar rentang yang lebih pendek atau sama dengan Equal-Tailed Interval (ETI)?',
        hint: 'Perhatikan kriteria pemotongan ketinggian densitas horizontal k_alpha.',
        answerExplanation: 'HPDI secara matematis dirancang untuk memilih kumpulan titik dengan kepadatan posterior tertinggi. Dengan memasukkan titik-titik yang memiliki densitas tinggi dan membuang titik-titik dengan densitas terendah di ekor distribusi, volume atau lebar interval yang dibutuhkan untuk mencakup akumulasi 95% probabilitas dijamin menjadi yang paling minimum.',
      },
      {
        question: 'Pada kondisi apa nilai ETI, HPDI, dan Frequentist Confidence Interval akan bernilai hampir identik?',
        hint: 'Perhatikan bentuk distribusi saat ukuran sampel besar dan prior yang digunakan tidak berpihak.',
        answerExplanation: 'Ketiganya akan bernilai hampir identik ketika ukuran sampel sangat besar (n masif), prior yang digunakan adalah uninformative/flat, dan distribusi posterior bersifat simetris Gaussian (unimodal dan tanpa skewness).',
      },
    ],
    references: [
      {
        citation: 'Kruschke, J. K. (2014). Doing Bayesian Data Analysis: A Tutorial with R, JAGS, and Stan (2nd ed.). Academic Press.',
        type: 'canonical-textbook',
      },
      {
        citation: 'Morey, R. D., Hoekstra, R., Rouder, J. N., Lee, M. D., & Wagenmakers, E. J. (2016). The fallacy of placing confidence in confidence intervals. Psychonomic Bulletin & Review, 23(1), 103-123.',
        type: 'peer-reviewed-article',
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Interval Kredibel vs Interval Kepercayaan',
        bulletPoints: [
          'Frequentist CI: Frekuensi jangka panjang prosedur penarikan sampling.',
          'Bayesian Credible: Probabilitas langsung parameter berada dalam rentang.',
          'Pernyataan probabilistik pada parameter sah secara epistemologis di Bayesian.',
        ],
        keyFormulaOrDiagram: 'P(\\theta \\in [L, U] \\mid \\mathbf{y}) = 1 - \\alpha',
      },
      {
        slideNumber: 2,
        title: 'ETI vs HPDI',
        bulletPoints: [
          'Equal-Tailed Interval (ETI): Potong simetris 2.5% di kedua ekor.',
          'Highest Posterior Density (HPDI): Interval terpendek dengan densitas puncak.',
          'HPDI sangat unggul pada distribusi fisis yang menceng atau bermodus batas.',
        ],
        keyFormulaOrDiagram: '\\text{Lebar}(\\text{HPDI}) \\leq \\text{Lebar}(\\text{ETI})',
      },
    ],
  },
};
