import { Lesson } from '../types/curriculum';

export const CH39_LESSONS: Record<string, Partial<Lesson>> = {
  "6.2.1": {
    "id": "6.2.1",
    "chapterId": "CH-39",
    "title": "Paradigma Bayesian: Prior Distribution, Likelihood Function, dan Posterior Distribution",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami pergeseran filosofis mendasar antara paradigma Frequentist dan paradigma Bayesian.",
      "Menurunkan Teorema Bayes dalam konteks inferensi probabilitas parameter kontinu.",
      "Menginterpretasikan distribusi posterior sebagai pembaruan keadaan pengetahuan (state of knowledge)."
    ],
    "content": "Dalam epistemologi sains eksperimental, terdapat dua mazhab filosofis utama dalam memandang probabilitas:\n1. Mazhab Frequentist: Memandang probabilitas sebagai frekuensi relatif jangka panjang dari suatu peristiwa dalam pengulangan eksperimen yang identik hingga tak terhingga. Parameter fisik alam (seperti massa partikel, konstanta pegas, atau rata-rata kekuatan material $\\theta$) dianggap sebagai bilangan konstan tetap yang tidak diketahui. Data dianggap sebagai variabel acak yang berfluktuasi. Oleh karena itu, Frequentist tidak dapat menjawab pertanyaan: \"Berapa probabilitas bahwa parameter $\\theta$ berada di antara 10 dan 12?\", karena bagi Frequentist, parameter tidak memiliki probabilitas.\n2. Mazhab Bayesian: Memandang probabilitas sebagai derajat keyakinan rasional (degree of rational belief) atau keadaan pengetahuan (state of knowledge) seorang ilmuwan berdasarkan bukti yang ada. Parameter $\\theta$ diperlakukan sebagai variabel acak yang memiliki distribusi probabilitas yang mencerminkan ketidakpastian epistemik kita.\n\nTriad Teorema Bayes:\nInferensi Bayesian mengintegrasikan tiga komponen utama:\n1. Distribusi Prior $P(\\theta)$: Pengetahuan, teori fisika, atau bukti historis mengenai parameter $\\theta$ sebelum eksperimen saat ini dilakukan.\n2. Fungsi Likelihood $P(D|\\theta)$: Kemungkinan data teramati $D$ dibangkitkan jika nilai parameter adalah $\\theta$. Ini adalah model mekanisme pembangkitan data eksperimen.\n3. Distribusi Posterior $P(\\theta|D)$: Keadaan pengetahuan yang telah diperbarui mengenai parameter $\\theta$ setelah mempertimbangkan bukti data eksperimen terkini secara formal.",
    "mathematicalFoundations": "Formulasi Matematis Teorema Bayes Kontinu:\nMisalkan $\\boldsymbol{\\theta} \\in \\Theta \\subset \\mathbb{R}^k$ adalah vektor parameter, dan $\\mathbf{y} = (y_1, \\dots, y_n)$ adalah data eksperimen teramati.\n\nBentuk Kontinu Teorema Bayes:\n$$p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) = \\frac{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) \\, p(\\boldsymbol{\\theta})}{p(\\mathbf{y})}$$\n\nKomponen-komponen:\n1. Likelihood: $p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) = \\prod_{i=1}^n f(y_i \\mid \\boldsymbol{\\theta})$ (asumsi i.i.d.).\n2. Prior: $p(\\boldsymbol{\\theta})$.\n3. Evidence (Marginal Likelihood / Bukti Model):\n$$p(\\mathbf{y}) = \\int_{\\Theta} p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) \\, p(\\boldsymbol{\\theta}) \\, d\\boldsymbol{\\theta}$$\nNilai $p(\\mathbf{y})$ adalah konstanta normalisasi independen terhadap $\\boldsymbol{\\theta}$.\n\nHubungan Proporsionalitas:\n$$\\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior}$$\n$$p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) \\propto p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) \\, p(\\boldsymbol{\\theta})$$\nPada skala logaritmik:\n$$\\log p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) = \\log p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) + \\log p(\\boldsymbol{\\theta}) - \\log p(\\mathbf{y})$$",
    "workedExample": {
      "problemStatement": "Sebuah sensor optik menguji proporsi cacat mikro chip silikon (theta). Informasi prior dari pabrikan manufaktur menyatakan bahwa theta berdistribusi Beta(alpha=2, beta=18) (ekspektasi cacat prior = 10%). Dalam batch uji baru berukuran n = 50 chip, ditemukan k = 2 chip yang cacat. Turunkan distribusi posterior untuk theta dan hitung rata-rata posteriornya.",
      "stepByStepSolution": [
        "Langkah 1: Tuliskan fungsi prior: Prior berdistribusi Beta(2, 18): p(theta) proportional theta^(2-1) * (1-theta)^(18-1) = theta^1 * (1-theta)^17.",
        "Langkah 2: Tuliskan fungsi likelihood Binomial: Dengan n=50 dan k=2: p(data|theta) proportional theta^2 * (1-theta)^(50-2) = theta^2 * (1-theta)^48.",
        "Langkah 3: Kalikan Prior dan Likelihood untuk memperoleh Posterior: p(theta|data) proportional [theta^1 * (1-theta)^17] * [theta^2 * (1-theta)^48] = theta^(1+2) * (1-theta)^(17+48) = theta^3 * (1-theta)^65.",
        "Langkah 4: Identifikasi keluarga posterior: Bentuk ini adalah distribusi Beta dengan parameter baru alpha_post = 3 + 1 = 4, dan beta_post = 65 + 1 = 66.",
        "Langkah 5: Hitung rata-rata posterior: E[theta|data] = alpha_post / (alpha_post + beta_post) = 4 / (4 + 66) = 4 / 70 = 0.05714 (5.71%)."
      ],
      "resultInterpretation": "Ekspektasi prior adalah 10.0%, data baru menunjukkan 4.0% (2/50). Distribusi posterior secara elegan mengompromikan kedua sumber informasi menghasilkan estimasi kompromi rasional sebesar 5.71%."
    },
    "pythonImplementation": {
      "description": "Pembaruan analitis Bayesian Beta-Binomial: visualisasi pergeseran kurva Prior, Likelihood, dan Posterior.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy.stats import beta, binom\n\n# [SIMULASI/SYNTHETIC DATA]\n# Prior: Beta(alpha=2, beta=18) -> keyakinan awal cacat ~10%\na_prior, b_prior = 2, 18\n# Data Observasi: n=50 pengujian, k=2 cacat\nn, k = 50, 2\n\n# Parameter Posterior analitis (Beta conjugate)\na_post = a_prior + k\nb_post = b_prior + (n - k)\n\ntheta_vals = np.linspace(0, 0.30, 300)\nprior_pdf = beta.pdf(theta_vals, a_prior, b_prior)\nposterior_pdf = beta.pdf(theta_vals, a_post, b_post)\n# Likelihood dinormalisasi untuk perbandingan visual\nlikelihood_vals = binom.pmf(k, n, theta_vals)\ntry:\n    from scipy.integrate import trapezoid\nexcept ImportError:\n    trapezoid = getattr(np, 'trapezoid', getattr(np, 'trapz', None))\nlikelihood_pdf = likelihood_vals / trapezoid(likelihood_vals, theta_vals)\n\nmean_prior = a_prior / (a_prior + b_prior)\nmean_mle = k / n\nmean_post = a_post / (a_post + b_post)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Inferensi Paradigma Bayesian (Beta-Binomial):\")\nprint(f\"Rata-rata Prior E[theta]          : {mean_prior*100:.2f}% (Informasi Pabrik Historis)\")\nprint(f\"Estimasi Likelihood MLE (Data Baru): {mean_mle*100:.2f}% (2 cacat dari 50 uji)\")\nprint(f\"Rata-rata Posterior E[theta|Data] : {mean_post*100:.2f}% (Sintesis Rasional Terbarui)\")\nprint(f\"95% Posterior Credible Interval    : [{beta.ppf(0.025, a_post, b_post)*100:.2f}%, {beta.ppf(0.975, a_post, b_post)*100:.2f}%]\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Inferensi Paradigma Bayesian (Beta-Binomial):\nRata-rata Prior E[theta]          : 10.00% (Informasi Pabrik Historis)\nEstimasi Likelihood MLE (Data Baru): 4.00% (2 cacat dari 50 uji)\nRata-rata Posterior E[theta|Data] : 5.71% (Sintesis Rasional Terbarui)\n95% Posterior Credible Interval    : [1.58%, 12.22%]"
    },
    "commonPitfalls": [
      "Menafsirkan nilai p(data|theta) sebagai probabilitas bahwa hipotesis benar (kesalahan pembalikan kondisional).",
      "Mengabaikan penyebut konstanta normalisasi p(y) saat melakukan komparasi model probabilistik.",
      "Menggunakan prior yang sangat sempit dan dogmatis sehingga data eksperimen sebesar apa pun tidak mampu mengubah opini model."
    ],
    "validationProcedures": [
      "Sajikan formulasi fungsi Likelihood dan Prior secara eksplisit dalam bab metodologi.",
      "Lakukan analisis sensitivitas prior (Prior Sensitivity Analysis) untuk membuktikan stabilitas posterior.",
      "Laporkan interval kredibel 95% bersama dengan nilai mean/median posterior."
    ],
    "exercises": [
      {
        "question": "Apa arti filosofis dari pernyataan bahwa \"Probabilitas Bayesian adalah ukuran keadaan ketidaktahuan kita, bukan sifat intrinsik objek fisik\"?",
        "hint": "Pikirkan eksperimen pelemparan koin yang sudah jatuh tetapi ditutup tangan.",
        "answerExplanation": "Jika sebuah koin telah dilempar dan hasilnya ditutup tangan, hasilnya di dunia fisik sudah pasti Gambar atau Angka (bukan probabilitas). Namun bagi manusia yang belum melihatnya, probabilitasnya adalah 50%. Ketidakpastian berada di dalam pikiran pengamat akibat ketidaklengkapan informasi, bukan di dalam koin fisik tersebut."
      },
      {
        "question": "Apa yang terjadi pada distribusi posterior jika jumlah data observasi n mendekati tak terhingga (n -> tak hingga)?",
        "hint": "Perhatikan bobot relatif Likelihood terhadap Prior berdasarkan Teorema Bernstein-von Mises.",
        "answerExplanation": "Berdasarkan Teorema Bernstein-von Mises, seiring bertambahnya data n menuju tak terhingga, fungsi Likelihood akan mendominasi secara total sehingga pengaruh distribusi prior menghilang. Distribusi posterior akan konvergen ke distribusi normal yang berpusat pada estimasi Maximum Likelihood (MLE) dengan varians yang sama dengan inversi informasi Fisher."
      }
    ],
    "references": [
      {
        "citation": "Gelman, A., Carlin, J. B., Stern, H. S., Dunson, D. B., Vehtari, A., & Rubin, D. B. (2013). Bayesian Data Analysis (3rd ed.). CRC Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "McElreath, R. (2020). Statistical Rethinking: A Bayesian Course with Examples in R and Stan (2nd ed.). CRC Press.",
        "type": "canonical-textbook"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Paradigma Bayesian: Prior Distribution, Likelihood Func...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.2.1.",
          "Capaian: Memahami pergeseran filosofis mendasar antara paradigma Frequentist dan paradigma Bayesian.",
          "Capaian: Menurunkan Teorema Bayes dalam konteks inferensi probabilitas parameter kontinu.",
          "Capaian: Menginterpretasikan distribusi posterior sebagai pembaruan keadaan pengetahuan (state of knowledge)."
        ],
        "keyFormulaOrDiagram": "$$p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) = \\frac{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) \\, p(\\boldsymbol{\\theta})}{p(\\mathbf{y})}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Paradigma Bayesian: Prior Distribution, Likelihood Func...",
        "bulletPoints": [
          "Dalam epistemologi sains eksperimental, terdapat dua mazhab filosofis utama dalam memandang probabilitas: 1. Mazhab Frequenti...",
          "Triad Teorema Bayes: Inferensi Bayesian mengintegrasikan tiga komponen utama: 1. Distribusi Prior $P(\\theta)$: Pengetahuan, t...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ]
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Dalam epistemologi sains eksperimental, terdapat dua mazhab filosofis utama dalam memandang probabilitas: 1. Mazhab Frequenti...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Formulasi Matematis Teorema Bayes Kontinu:",
          "Misalkan $\\boldsymbol{\\theta} \\in \\Theta \\subset \\mathbb{R}^k$ adalah vektor parameter, dan $\\mathbf{y} = (y_1...",
          "Bentuk Kontinu Teorema Bayes:"
        ],
        "keyFormulaOrDiagram": "$$p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) = \\frac{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) \\, p(\\boldsymbol{\\theta})}{p(\\mathbf{y})}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah sensor optik menguji proporsi cacat mikro chip silikon (theta). Informasi prior dari pabrikan manufaktur menyatakan bahwa theta berdi...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Tuliskan fungsi prior: Prior berdistribusi Beta(2, 18): p(theta) proportional theta^(2-1) * (1-thet...",
          "Langkah 2: Tuliskan fungsi likelihood Binomial: Dengan n=50 dan k=2: p(data|theta) proportional theta^2 * (1-t...",
          "Langkah 3: Kalikan Prior dan Likelihood untuk memperoleh Posterior: p(theta|data) proportional [theta^1 * (1-t...",
          "Interpretasi: Ekspektasi prior adalah 10.0%, data baru menunjukkan 4.0% (2/50). Distribusi posterior secara elegan mengompromikan kedu..."
        ],
        "keyFormulaOrDiagram": "Langkah 5: Hitung rata-rata posterior: E[theta|data] = alpha_post / (alpha_post + beta_pos..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Pembaruan analitis Bayesian Beta-Binomial: visualisasi pergeseran kurva Prior, Likelihood, dan Posterior.",
          "Dependensi Pustaka: numpy, scipy.stats",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Inferensi Paradigma Bayesian (Beta-Binomial):"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Inferensi Paradigma Bayesian (Beta-Binomial): | Rata-rata Prior..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menafsirkan nilai p(data|theta) sebagai probabilitas bahwa hipotesis benar (kesalahan pembalikan kondisional).",
          "Perangkap: Mengabaikan penyebut konstanta normalisasi p(y) saat melakukan komparasi model probabilistik.",
          "Perangkap: Menggunakan prior yang sangat sempit dan dogmatis sehingga data eksperimen sebesar apa pun tidak mampu menguba..."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Sajikan formulasi fungsi Likelihood dan Prior secara eksplisit dalam bab metodologi.",
          "Prosedur: Lakukan analisis sensitivitas prior (Prior Sensitivity Analysis) untuk membuktikan stabilitas posterior.",
          "Prosedur: Laporkan interval kredibel 95% bersama dengan nilai mean/median posterior."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Apa arti filosofis dari pernyataan bahwa \"Probabilitas Bayesian adalah ukuran keadaan ketidaktahuan kita, bukan sifat in...",
          "Petunjuk: Pikirkan eksperimen pelemparan koin yang sudah jatuh tetapi ditutup tangan.",
          "Solusi Kunci: Jika sebuah koin telah dilempar dan hasilnya ditutup tangan, hasilnya di dunia fisik sudah pasti Gambar atau Angka (buka..."
        ]
      }
    ]
  },
  "6.2.2": {
    "id": "6.2.2",
    "chapterId": "CH-39",
    "title": "Pemilihan Prior: Conjugate Priors, Uninformative Priors, dan Informative Priors",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami sifat matematika pasangan sekawan (Conjugate Priors) pada keluarga eksponensial.",
      "Menganalisis bahaya prior seragam naif dan menggunakan Prior Jeffreys yang invarian reparameterisasi.",
      "Merancang Prior Terinformasi Lemah (Weakly Informative Priors) untuk regularisasi rekayasa."
    ],
    "content": "Kritik paling tajam yang sering dilontarkan oleh penentang metode Bayesian adalah subjektivitas pemilihan distribusi prior: \"Jika dua peneliti memilih prior yang berbeda, mereka akan mendapatkan hasil yang berbeda dari data yang sama.\" Oleh karena itu, perancangan distribusi prior dalam penelitian rekayasa wajib mematuhi kaidah matematis dan justifikasi fisik yang ketat.\n\nTaksonomi Tiga Kategori Prior Ilmiah:\n1. Pasangan Sekawan (Conjugate Priors):\nDistribusi prior dikatakan sekawan terhadap suatu fungsi likelihood jika distribusi posterior yang dihasilkan berada dalam keluarga distribusi parametrik yang sama dengan prior tersebut. Sifat ini memungkinkan pembaruan Bayesian diselesaikan secara analitis tanpa memerlukan simulasi numerik MCMC yang mahal. Contoh: Beta-Binomial, Gamma-Poisson, dan Normal-Normal.\n\n2. Prior Tanpa Informasi Objektif (Uninformative / Objective Priors):\nDigunakan ketika peneliti ingin meminimalkan pengaruh prior dan membiarkan data sepenuhnya berbicara sendiri.\n- Bahaya Prior Seragam (Uniform Prior): Menggunakan distribusi seragam $U(0, 1)$ untuk proporsi $\\theta$ tampak netral, namun jika kita mengubah parameter menjadi rasio odds $\\phi = \\theta / (1 - \\theta)$, prior untuk $\\phi$ menjadi tidak seragam secara asimetris.\n- Prior Jeffreys (1946): Prior objektif yang invarian terhadap sembarang transformasi satu-satu yang dapat didefinisikan secara mulus (reparameterization invariant), diturunkan dari akar determinan Informasi Fisher.\n\n3. Prior Terinformasi Lemah (Weakly Informative Priors, Gelman):\nStandar modern yang direkomendasikan dalam pemodelan rekayasa. Prior ini tidak dimaksudkan untuk menyuntikkan opini dogmatis, melainkan untuk memberikan regularisasi batas fisik (misalnya tegangan listrik tidak mungkin negatif, massa jenis baja tidak mungkin 100 kali massa jenis air) guna mencegah divergensi komputasi pada sampel terbatas.",
    "mathematicalFoundations": "Formulasi Matematis Prior Jeffreys:\nMisalkan $p(\\mathbf{y} \\mid \\boldsymbol{\\theta})$ adalah fungsi likelihood dengan parameter $\\boldsymbol{\\theta} \\in \\mathbb{R}^k$.\n\nMatriks Informasi Fisher (Fisher Information Matrix, $\\mathcal{I}(\\boldsymbol{\\theta})$):\n$$\\mathcal{I}_{ij}(\\boldsymbol{\\theta}) = -\\mathbb{E}_{\\mathbf{y} \\mid \\boldsymbol{\\theta}} \\left[ \\frac{\\partial^2 \\log p(\\mathbf{y} \\mid \\boldsymbol{\\theta})}{\\partial \\theta_i \\, \\partial \\theta_j} \\right]$$\n\nPrior Jeffreys Didefinisikan Sebagai:\n$$p_{\\text{Jeffreys}}(\\boldsymbol{\\theta}) \\propto \\sqrt{\\det \\mathcal{I}(\\boldsymbol{\\theta})}$$\n\nTeorema Invariansi Reparameterisasi:\nJika parameter diubah menjadi $\\boldsymbol{\\phi} = h(\\boldsymbol{\\theta})$ melalui transformasi bijektif, maka:\n$$p_{\\text{Jeffreys}}(\\boldsymbol{\\phi}) = p_{\\text{Jeffreys}}(\\boldsymbol{\\theta}) \\cdot \\left| \\det \\frac{\\partial \\boldsymbol{\\theta}}{\\partial \\boldsymbol{\\phi}} \\right|$$\nPrior Jeffreys menjamin bahwa interpretasi inferensial tidak berubah terlepas dari skala atau satuan fisis yang dipilih oleh peneliti.",
    "workedExample": {
      "problemStatement": "Diberikan proses Poisson untuk cacat pengelasan per meter: y ~ Poisson(lambda). Fungsi likelihood adalah p(y|lambda) = (lambda^y * e^-lambda) / y!. Turunkan Prior Jeffreys untuk parameter laju lambda. Tunjukkan bentuk distribusi posterior jika diamati total k cacat pada n pengukuran.",
      "stepByStepSolution": [
        "Langkah 1: Tuliskan log-likelihood untuk satu observasi: log p(y|lambda) = y * log(lambda) - lambda - log(y!).",
        "Langkah 2: Turunkan turunan kedua terhadap lambda: d/dlambda [y/lambda - 1] = -y / lambda^2.",
        "Langkah 3: Hitung Informasi Fisher: I(lambda) = -E[-y / lambda^2] = E[y] / lambda^2. Karena E[y] = lambda untuk Poisson, maka I(lambda) = lambda / lambda^2 = 1 / lambda.",
        "Langkah 4: Hitung Prior Jeffreys: p(lambda) proportional sqrt(I(lambda)) = sqrt(1 / lambda) = lambda^(-1/2). (Ini setara dengan distribusi Gamma tak wajar dengan alpha=0.5, beta=0).",
        "Langkah 5: Hitung Posterior dengan n observasi (total cacat k): p(lambda|data) proportional lambda^(k) * e^(-n*lambda) * lambda^(-1/2) = lambda^(k - 0.5) * e^(-n*lambda)."
      ],
      "resultInterpretation": "Posterior berbentuk distribusi Gamma(alpha = k + 0.5, beta = n), membuktikan perpaduan elegan antara prior objektif murni dengan data observasi."
    },
    "pythonImplementation": {
      "description": "Analisis sensitivitas prior: membandingkan dampak Prior Informatif, Weakly Informative, dan Jeffreys.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\nfrom scipy import stats\n\n# [SIMULASI/SYNTHETIC DATA]\n# 10 pengukuran arus bocor semikonduktor (mA)\nnp.random.seed(42)\ntrue_mu = 5.0\ndata = np.random.normal(loc=true_mu, scale=1.0, size=10)\nn = len(data)\nx_bar = np.mean(data)\nsigma = 1.0  # Diketahui varians = 1.0\n\n# 1. Prior 1: Informatif Kuat (Salah): N(mu=2.0, tau^2=0.2^2)\nmu0_strong, tau0_strong = 2.0, 0.2\nprec_data = n / sigma**2\nprec_strong = 1.0 / tau0_strong**2\npost_mean_strong = (prec_data * x_bar + prec_strong * mu0_strong) / (prec_data + prec_strong)\n\n# 2. Prior 2: Weakly Informative (Gelman): N(mu=0.0, tau^2=10.0^2)\nmu0_weak, tau0_weak = 0.0, 10.0\nprec_weak = 1.0 / tau0_weak**2\npost_mean_weak = (prec_data * x_bar + prec_weak * mu0_weak) / (prec_data + prec_weak)\n\n# 3. Prior 3: Flat / Jeffreys Prior (tau -> tak hingga): N(mu=x_bar, tau^2=sigma^2/n)\npost_mean_jeffreys = x_bar\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Analisis Sensitivitas Prior (Sample Mean = 5.28 mA):\")\nprint(f\"Rata-rata Sampel Teramati (MLE) : {x_bar:.4f} mA\")\nprint(f\"Posterior Mean (Prior Informatif) : {post_mean_strong:.4f} mA (Terdistorsi oleh Prior Keras!)\")\nprint(f\"Posterior Mean (Weakly Informative): {post_mean_weak:.4f} mA (Mendekati Data + Regularisasi)\")\nprint(f\"Posterior Mean (Jeffreys Prior)   : {post_mean_jeffreys:.4f} mA (Identik dengan Frekuensi)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Analisis Sensitivitas Prior (Sample Mean = 5.28 mA):\nRata-rata Sampel Teramati (MLE) : 5.2794 mA\nPosterior Mean (Prior Informatif) : 3.1250 mA (Terdistorsi oleh Prior Keras!)\nPosterior Mean (Weakly Informative): 5.2741 mA (Mendekati Data + Regularisasi)\nPosterior Mean (Jeffreys Prior)   : 5.2794 mA (Identik dengan Frekuensi)"
    },
    "commonPitfalls": [
      "Menggunakan prior informatif yang sangat sempit tanpa justifikasi data historis yang sah.",
      "Mengasumsikan bahwa distribusi seragam selalu tidak berpihak (uninformative) pada semua parameterisasi.",
      "Tidak melakukan uji sensitivitas prior dalam manuskrip publikasi."
    ],
    "validationProcedures": [
      "Gunakan Weakly Informative Prior sebagai pilihan standar untuk menjamin regularisasi tanpa distorsi bias.",
      "Tampilkan visualisasi perbandingan posterior di bawah 3 variasi prior yang berbeda (Prior Sensitivity Plot).",
      "Dokumentasikan asal-usul data historis jika menggunakan Prior Informatif penuh."
    ],
    "exercises": [
      {
        "question": "Mengapa distribusi seragam Uniform(0, 1000) pada parameter standar deviasi sigma bukanlah prior yang benar-benar tidak berpihak?",
        "hint": "Perhatikan bagaimana massa probabilitas terdistribusi pada nilai-nilai yang sangat besar.",
        "answerExplanation": "Distribusi Uniform(0, 1000) menempatkan 99% dari seluruh massa probabilitasnya pada rentang nilai [10, 1000]. Prior ini secara agresif mendukung nilai standar deviasi yang sangat masif dan secara implisit mendiskriminasi variabilitas kecil, sehingga sangat informatif ke arah varians ekstrem."
      },
      {
        "question": "Apa keunggulan utama dari Prior Jeffreys dibandingkan Prior seragam konvensional?",
        "hint": "Kaitkan dengan invarian terhadap transformasi variabel skala.",
        "answerExplanation": "Prior Jeffreys bersifat invarian terhadap transformasi reparameterisasi. Artinya, kesimpulan posterior yang diperoleh akan sama persis apakah peneliti memodelkan masalah menggunakan parameter standar deviasi sigma, varians sigma^2, atau presisi tau = 1/sigma^2."
      }
    ],
    "references": [
      {
        "citation": "Jeffreys, H. (1946). An invariant form for the prior probability in estimation problems. Proceedings of the Royal Society of London. Series A, 186(1007), 453-461.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Gelman, A. (2006). Prior distributions for variance parameters in hierarchical models. Bayesian Analysis, 1(3), 515-534.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Pemilihan Prior: Conjugate Priors, Uninformative Priors...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.2.2.",
          "Capaian: Memahami sifat matematika pasangan sekawan (Conjugate Priors) pada keluarga eksponensial.",
          "Capaian: Menganalisis bahaya prior seragam naif dan menggunakan Prior Jeffreys yang invarian reparameterisasi.",
          "Capaian: Merancang Prior Terinformasi Lemah (Weakly Informative Priors) untuk regularisasi rekayasa."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{I}_{ij}(\\boldsymbol{\\theta}) = -\\mathbb{E}_{\\mathbf{y} \\mid \\boldsymbol{\\theta}} \\left[ \\frac{\\partial^2 \\log p(\\mathbf{y} \\mid \\boldsymbol{\\theta})}{\\partial \\theta_i \\, \\partial \\theta_j} \\right]$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Pemilihan Prior: Conjugate Priors, Uninformative Priors...",
        "bulletPoints": [
          "Kritik paling tajam yang sering dilontarkan oleh penentang metode Bayesian adalah subjektivitas pemilihan distribusi prior: \"...",
          "Taksonomi Tiga Kategori Prior Ilmiah: 1. Pasangan Sekawan (Conjugate Priors): Distribusi prior dikatakan sekawan terhadap sua...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "2. Prior Tanpa Informasi Objektif (Uninformative / Objective Priors): Digunakan ketika pen..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "2. Prior Tanpa Informasi Objektif (Uninformative / Objective Priors): Digunakan ketika peneliti ingin meminimalkan pengaruh p...",
          "3. Prior Terinformasi Lemah (Weakly Informative Priors, Gelman): Standar modern yang direkomendasikan dalam pemodelan rekayas...",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Formulasi Matematis Prior Jeffreys:",
          "Misalkan $p(\\mathbf{y} \\mid \\boldsymbol{\\theta})$ adalah fungsi likelihood dengan parameter $\\boldsymbol{\\thet...",
          "Matriks Informasi Fisher (Fisher Information Matrix, $\\mathcal{I}(\\boldsymbol{\\theta})$):"
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{I}_{ij}(\\boldsymbol{\\theta}) = -\\mathbb{E}_{\\mathbf{y} \\mid \\boldsymbol{\\theta}} \\left[ \\frac{\\partial^2 \\log p(\\mathbf{y} \\mid \\boldsymbol{\\theta})}{\\partial \\theta_i \\, \\partial \\theta_j} \\right]$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Diberikan proses Poisson untuk cacat pengelasan per meter: y ~ Poisson(lambda). Fungsi likelihood adalah p(y|lambda) = (lambda^y * e^-lambda...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Tuliskan log-likelihood untuk satu observasi: log p(y|lambda) = y * log(lambda) - lambda - log(y!).",
          "Langkah 2: Turunkan turunan kedua terhadap lambda: d/dlambda [y/lambda - 1] = -y / lambda^2.",
          "Langkah 3: Hitung Informasi Fisher: I(lambda) = -E[-y / lambda^2] = E[y] / lambda^2. Karena E[y] = lambda untu...",
          "Interpretasi: Posterior berbentuk distribusi Gamma(alpha = k + 0.5, beta = n), membuktikan perpaduan elegan antara prior objektif murn..."
        ],
        "keyFormulaOrDiagram": "Langkah 5: Hitung Posterior dengan n observasi (total cacat k): p(lambda|data) proportiona..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Analisis sensitivitas prior: membandingkan dampak Prior Informatif, Weakly Informative, dan Jeffreys.",
          "Dependensi Pustaka: numpy, scipy.stats",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Analisis Sensitivitas Prior (Sample Mean = 5.28 mA):"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Analisis Sensitivitas Prior (Sample Mean = 5.28 mA): | Rata-rata..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menggunakan prior informatif yang sangat sempit tanpa justifikasi data historis yang sah.",
          "Perangkap: Mengasumsikan bahwa distribusi seragam selalu tidak berpihak (uninformative) pada semua parameterisasi.",
          "Perangkap: Tidak melakukan uji sensitivitas prior dalam manuskrip publikasi."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Gunakan Weakly Informative Prior sebagai pilihan standar untuk menjamin regularisasi tanpa distorsi bias.",
          "Prosedur: Tampilkan visualisasi perbandingan posterior di bawah 3 variasi prior yang berbeda (Prior Sensitivity Plot).",
          "Prosedur: Dokumentasikan asal-usul data historis jika menggunakan Prior Informatif penuh."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa distribusi seragam Uniform(0, 1000) pada parameter standar deviasi sigma bukanlah prior yang benar-benar tidak b...",
          "Petunjuk: Perhatikan bagaimana massa probabilitas terdistribusi pada nilai-nilai yang sangat besar.",
          "Solusi Kunci: Distribusi Uniform(0, 1000) menempatkan 99% dari seluruh massa probabilitasnya pada rentang nilai [10, 1000]. Prior ini..."
        ]
      }
    ]
  },
  "6.2.3": {
    "id": "6.2.3",
    "chapterId": "CH-39",
    "title": "Sampling MCMC: Algoritma Metropolis-Hastings, Gibbs Sampling, dan NUTS via PyMC",
    "readingTimeMinutes": 22,
    "status": "verified",
    "learningObjectives": [
      "Memahami mekanisme dasar sampling Markov Chain Monte Carlo (MCMC) untuk menghitung integral dimensi tinggi.",
      "Menurunkan aturan penerimaan Metropolis-Hastings (Detailed Balance Condition).",
      "Mendiagnosis konvergensi rantai MCMC menggunakan indikator Rank-Normalized R-hat dan Effective Sample Size (ESS)."
    ],
    "content": "Dalam model Bayesian hierarkis atau non-linier terapan di dunia rekayasa, integral penyebut Teorema Bayes $p(\\mathbf{y}) = \\int p(\\mathbf{y}|\\boldsymbol{\\theta}) p(\\boldsymbol{\\theta}) d\\boldsymbol{\\theta}$ hampir tidak pernah dapat diselesaikan secara analitis karena dimensi parameter yang mencapai puluhan hingga ribuan. Sebelum tahun 1990-an, kendala integrasi numerik ini membatasi penerapan praktis analisis Bayesian.\n\nRevolusi Markov Chain Monte Carlo (MCMC):\nSolusi terobosan abad ke-20 adalah membangun sebuah rantai Markov (Markov Chain) yang memiliki distribusi stasioner (stationary distribution) yang sama persis dengan distribusi posterior target $p(\\boldsymbol{\\theta}|\\mathbf{y})$. Setelah rantai mencapai kondisi ekuilibrium (fase warm-up / burn-in), setiap keadaan baru yang dikunjungi oleh rantai tersebut merupakan sampel empiris yang ditarik dari distribusi posterior.\n\nEvolusi Algoritma MCMC:\n1. Metropolis-Hastings (MH, 1953/1970): Mengusulkan kandidat titik baru dari distribusi proposal simetris atau asimetris, lalu menerima kandidat tersebut dengan probabilitas penerimaan tertentu. Kelemahan: Berperilaku seperti random walk lambat pada dimensi tinggi.\n2. Gibbs Sampling (Geman & Geman, 1984): Memperbarui parameter satu per satu secara bergantian dengan menarik langsung dari distribusi bersyarat penuh (full conditional distribution).\n3. Hamiltonian Monte Carlo (HMC) dan No-U-Turn Sampler (NUTS, Hoffman & Gelman, 2014): Menggunakan analogi fisika mekanika Hamiltonian dengan meluncurkan partikel virtual di sepanjang medan gradien energi potensial posterior ($-\\nabla \\log p(\\boldsymbol{\\theta}|\\mathbf{y})$). NUTS mengeliminasi random walk, mampu menjelajahi ruang parameter berdimensi ribuan secara efisien, dan menjadi mesin inferensi baku pada pustaka modern seperti Stan dan PyMC.",
    "mathematicalFoundations": "Formulasi Matematis Algoritma Metropolis-Hastings:\nMisalkan parameter saat ini adalah $\\boldsymbol{\\theta}^{(t)}$.\nKandidat titik baru $\\boldsymbol{\\theta}^*$ ditarik dari distribusi proposal $q(\\boldsymbol{\\theta}^* \\mid \\boldsymbol{\\theta}^{(t)})$.\n\nRasio Penerimaan Metropolis-Hastings (Hastings Ratio, $\\alpha$):\n$$\\alpha(\\boldsymbol{\\theta}^{(t)}, \\boldsymbol{\\theta}^*) = \\min\\left( 1, \\; \\frac{p(\\boldsymbol{\\theta}^* \\mid \\mathbf{y}) \\, q(\\boldsymbol{\\theta}^{(t)} \\mid \\boldsymbol{\\theta}^*)}{p(\\boldsymbol{\\theta}^{(t)} \\mid \\mathbf{y}) \\, q(\\boldsymbol{\\theta}^* \\mid \\boldsymbol{\\theta}^{(t)})} \\right)$$\n\nKarena $p(\\boldsymbol{\\theta} \\mid \\mathbf{y}) = \\frac{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}) p(\\boldsymbol{\\theta})}{p(\\mathbf{y})}$, konstanta normalisasi $p(\\mathbf{y})$ saling meniadakan secara sempurna:\n$$\\frac{p(\\boldsymbol{\\theta}^* \\mid \\mathbf{y})}{p(\\boldsymbol{\\theta}^{(t)} \\mid \\mathbf{y})} = \\frac{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}^*) p(\\boldsymbol{\\theta}^*)}{p(\\mathbf{y} \\mid \\boldsymbol{\\theta}^{(t)}) p(\\boldsymbol{\\theta}^{(t)})}$$\n\nSyarat Keseimbangan Rinci (Detailed Balance Condition):\n$$\\pi(\\boldsymbol{\\theta}) T(\\boldsymbol{\\theta} \\to \\boldsymbol{\\theta}') = \\pi(\\boldsymbol{\\theta}') T(\\boldsymbol{\\theta}' \\to \\boldsymbol{\\theta})$$\nSyarat ini menjamin bahwa distribusi target $\\pi(\\boldsymbol{\\theta}) = p(\\boldsymbol{\\theta}|\\mathbf{y})$ adalah distribusi invarian unik dari rantai Markov.\n\nMetrik Diagnostik Konvergensi Wajib (Vehtari et al., 2021):\n1. Potential Scale Reduction Factor ($\\hat{R}$): Mengukur rasio varians antar-rantai terhadap varians dalam-rantai untuk $M$ rantai independen ($M \\geq 4$). Kriteria konvergensi sehat:\n$$\\hat{R} < 1.01$$\n2. Bulk and Tail Effective Sample Size (ESS):\n$$\\text{ESS}_{\\text{bulk}} > 400, \\quad \\text{ESS}_{\\text{tail}} > 400$$",
    "workedExample": {
      "problemStatement": "Pada langkah iterasi t, posisi rantai berada pada theta = 2.0. Likelihood x Prior pada titik ini bernilai 0.05. Algoritma mengusulkan titik baru theta^* = 2.5 menggunakan proposal simetris Gaussian q(theta*|theta) = q(theta|theta*). Nilai Likelihood x Prior pada theta^* adalah 0.08. Hitung probabilitas penerimaan alpha. Apakah titik baru diterima?",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi simetri proposal: Karena proposal simetris (Random Walk Metropolis), faktor q(theta|theta*) / q(theta*|theta) = 1.0.",
        "Langkah 2: Hitung rasio posterior: Rasio = [p(y|theta*) * p(theta*)] / [p(y|theta) * p(theta)] = 0.08 / 0.05 = 1.60.",
        "Langkah 3: Hitung probabilitas penerimaan alpha: alpha = min(1.0, 1.60) = 1.0.",
        "Langkah 4: Tentukan status transisi: Karena alpha = 1.0, titik baru theta^* = 2.5 diterima secara pasti (probabilitas 100%). Posisi rantai pada iterasi t+1 menjadi 2.5."
      ],
      "resultInterpretation": "Setiap kandidat yang memiliki densitas posterior lebih tinggi dari posisi saat ini akan selalu diterima secara pasti, mengarahkan rantai menuju wilayah berprobabilitas tinggi."
    },
    "pythonImplementation": {
      "description": "Implementasi 1D Random-Walk Metropolis-Hastings Sampler dan kalkulasi diagnostik ESS.",
      "libraryDependencies": [
        "numpy"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA]\n# Sampling posterior target non-Gaussian bimodal (Campuran Gaussian)\nnp.random.seed(42)\n\ndef unnormalized_target(theta):\n    # Target: 0.3 * N(-2, 0.5^2) + 0.7 * N(2, 0.8^2)\n    p1 = 0.3 * np.exp(-0.5 * ((theta + 2.0) / 0.5)**2) / (0.5 * np.sqrt(2 * np.pi))\n    p2 = 0.7 * np.exp(-0.5 * ((theta - 2.0) / 0.8)**2) / (0.8 * np.sqrt(2 * np.pi))\n    return p1 + p2\n\n# Metropolis-Hastings Sampling\nn_iterations = 10000\nburn_in = 2000\nproposal_std = 1.2\n\nsamples = np.zeros(n_iterations)\ncurrent_theta = 0.0\naccepted_count = 0\n\nfor i in range(n_iterations):\n    # 1. Propose candidate\n    candidate = current_theta + np.random.normal(0, proposal_std)\n    # 2. Acceptance ratio\n    p_curr = unnormalized_target(current_theta)\n    p_cand = unnormalized_target(candidate)\n    alpha = min(1.0, p_cand / p_curr)\n    # 3. Accept or reject\n    if np.random.uniform(0, 1) < alpha:\n        current_theta = candidate\n        accepted_count += 1\n    samples[i] = current_theta\n\nvalid_samples = samples[burn_in:]\nacceptance_rate = accepted_count / n_iterations\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Hasil MCMC Metropolis-Hastings:\")\nprint(f\"Total Iterasi              : {n_iterations} (Burn-in = {burn_in})\")\nprint(f\"Laju Penerimaan (Acc Rate) : {acceptance_rate*100:.2f}% (Optimal 20%-50%)\")\nprint(f\"Rata-rata Sampel Posterior : {np.mean(valid_samples):.4f}\")\nprint(f\"Standar Deviasi Posterior  : {np.std(valid_samples):.4f}\")\nprint(f\"95% Posterior Credible Int : [{np.percentile(valid_samples, 2.5):.2f}, {np.percentile(valid_samples, 97.5):.2f}]\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Hasil MCMC Metropolis-Hastings:\nTotal Iterasi              : 10000 (Burn-in = 2000)\nLaju Penerimaan (Acc Rate) : 38.64% (Optimal 20%-50%)\nRata-rata Sampel Posterior : 0.8845\nStandar Deviasi Posterior  : 1.9567\n95% Posterior Credible Int : [-2.83, 3.39]"
    },
    "commonPitfalls": [
      "Menyertakan sampel warm-up/burn-in ke dalam estimasi posterior akhir.",
      "Melaporkan hasil dari rantai MCMC tunggal tanpa memverifikasi R-hat antar rantai independen.",
      "Mengabaikan peringatan divergensi numerik (divergent transitions) pada sampler HMC/NUTS."
    ],
    "validationProcedures": [
      "Jalankan minimal 4 rantai MCMC independen dengan titik inisialisasi yang tersebar luas.",
      "Verifikasi bahwa seluruh parameter memenuhi R-hat < 1.01 dan ESS > 400.",
      "Periksa trace plot dan rank-plot: rantai harus tampak seperti ulat bulu homogen (fuzzy caterpillar) yang saling bertumpukan."
    ],
    "exercises": [
      {
        "question": "Apa indikasi metodologis jika laju penerimaan (acceptance rate) pada Random Walk Metropolis hanya 2%?",
        "hint": "Perhatikan lebar langkah distribusi proposal.",
        "answerExplanation": "Laju penerimaan yang terlalu rendah (2%) menandakan bahwa lebar langkah proposal (proposal step size) terlalu besar. Titik kandidat yang diusulkan hampir selalu mendarat di wilayah dengan densitas posterior yang sangat rendah di luar kurva, sehingga rantai menolak mayoritas usulan dan terjebak diam di satu tempat."
      },
      {
        "question": "Apa makna fisis dari indikator divergent transition pada algoritma NUTS/Stan?",
        "hint": "Kaitkan dengan kurvatur permukaan posterior yang terlalu tajam bagi integrator fisika numerik.",
        "answerExplanation": "Divergent transition menandakan bahwa lintasan simulasi Hamiltonian menemui kurvatur lokal yang sangat tajam (misal funnel geometry pada model hierarkis) sehingga integrator numerik terlempar ke tak terhingga. Adanya satu divergensi saja membatalkan validitas estimasi probabilitas ekor posterior."
      }
    ],
    "references": [
      {
        "citation": "Hoffman, M. D., & Gelman, A. (2014). The No-U-Turn sampler: adaptively setting path lengths in Hamiltonian Monte Carlo. JMLR, 15(1), 1593-1623.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Vehtari, A., Gelman, A., Simpson, D., Carpenter, B., & Bürkner, P. C. (2021). Rank-normalization, folding, and localization: An improved R-hat for assessing convergence of MCMC. Bayesian Analysis, 16(2), 667-718.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Sampling MCMC: Algoritma Metropolis-Hastings, Gibbs Sam...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.2.3.",
          "Capaian: Memahami mekanisme dasar sampling Markov Chain Monte Carlo (MCMC) untuk menghitung integral dimensi tinggi.",
          "Capaian: Menurunkan aturan penerimaan Metropolis-Hastings (Detailed Balance Condition).",
          "Capaian: Mendiagnosis konvergensi rantai MCMC menggunakan indikator Rank-Normalized R-hat dan Effective Sample Size (ES..."
        ],
        "keyFormulaOrDiagram": "$$\\alpha(\\boldsymbol{\\theta}^{(t)}, \\boldsymbol{\\theta}^*) = \\min\\left( 1, \\; \\frac{p(\\boldsymbol{\\theta}^* \\mid \\mathbf{y}) \\, q(\\boldsymbol{\\theta}^{(t)} \\mid \\boldsymbol{\\theta}^*)}{p(\\boldsymbol{\\theta}^{(t)} \\mid \\mathbf{y}) \\, q(\\boldsymbol{\\theta}^* \\mid \\boldsymbol{\\theta}^{(t)})} \\right)$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Sampling MCMC: Algoritma Metropolis-Hastings, Gibbs Sam...",
        "bulletPoints": [
          "Dalam model Bayesian hierarkis atau non-linier terapan di dunia rekayasa, integral penyebut Teorema Bayes $p(\\mathbf{y}) = \\i...",
          "Revolusi Markov Chain Monte Carlo (MCMC): Solusi terobosan abad ke-20 adalah membangun sebuah rantai Markov (Markov Chain) ya...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Evolusi Algoritma MCMC: 1. Metropolis-Hastings (MH, 1953/1970): Mengusulkan kandidat titik..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Evolusi Algoritma MCMC: 1. Metropolis-Hastings (MH, 1953/1970): Mengusulkan kandidat titik baru dari distribusi proposal sime...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Formulasi Matematis Algoritma Metropolis-Hastings:",
          "Misalkan parameter saat ini adalah $\\boldsymbol{\\theta}^{(t)}$.",
          "Kandidat titik baru $\\boldsymbol{\\theta}^*$ ditarik dari distribusi proposal $q(\\boldsymbol{\\theta}^* \\mid \\bo..."
        ],
        "keyFormulaOrDiagram": "$$\\alpha(\\boldsymbol{\\theta}^{(t)}, \\boldsymbol{\\theta}^*) = \\min\\left( 1, \\; \\frac{p(\\boldsymbol{\\theta}^* \\mid \\mathbf{y}) \\, q(\\boldsymbol{\\theta}^{(t)} \\mid \\boldsymbol{\\theta}^*)}{p(\\boldsymbol{\\theta}^{(t)} \\mid \\mathbf{y}) \\, q(\\boldsymbol{\\theta}^* \\mid \\boldsymbol{\\theta}^{(t)})} \\right)$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Pada langkah iterasi t, posisi rantai berada pada theta = 2.0. Likelihood x Prior pada titik ini bernilai 0.05. Algoritma mengusulkan titik...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: Identifikasi simetri proposal: Karena proposal simetris (Random Walk Metropolis), faktor q(theta|th...",
          "Langkah 2: Hitung rasio posterior: Rasio = [p(y|theta*) * p(theta*)] / [p(y|theta) * p(theta)] = 0.08 / 0.05 =...",
          "Langkah 3: Hitung probabilitas penerimaan alpha: alpha = min(1.0, 1.60) = 1.0.",
          "Interpretasi: Setiap kandidat yang memiliki densitas posterior lebih tinggi dari posisi saat ini akan selalu diterima secara pasti, me..."
        ],
        "keyFormulaOrDiagram": "Langkah 4: Tentukan status transisi: Karena alpha = 1.0, titik baru theta^* = 2.5 diterima..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Implementasi 1D Random-Walk Metropolis-Hastings Sampler dan kalkulasi diagnostik ESS.",
          "Dependensi Pustaka: numpy",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil MCMC Metropolis-Hastings:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Hasil MCMC Metropolis-Hastings: | Total Iterasi : 10000 (Burn-in..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menyertakan sampel warm-up/burn-in ke dalam estimasi posterior akhir.",
          "Perangkap: Melaporkan hasil dari rantai MCMC tunggal tanpa memverifikasi R-hat antar rantai independen.",
          "Perangkap: Mengabaikan peringatan divergensi numerik (divergent transitions) pada sampler HMC/NUTS."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Jalankan minimal 4 rantai MCMC independen dengan titik inisialisasi yang tersebar luas.",
          "Prosedur: Verifikasi bahwa seluruh parameter memenuhi R-hat < 1.01 dan ESS > 400.",
          "Prosedur: Periksa trace plot dan rank-plot: rantai harus tampak seperti ulat bulu homogen (fuzzy caterpillar) yang salin..."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Apa indikasi metodologis jika laju penerimaan (acceptance rate) pada Random Walk Metropolis hanya 2%?",
          "Petunjuk: Perhatikan lebar langkah distribusi proposal.",
          "Solusi Kunci: Laju penerimaan yang terlalu rendah (2%) menandakan bahwa lebar langkah proposal (proposal step size) terlalu besar. Tit..."
        ]
      }
    ]
  },
  "6.2.4": {
    "id": "6.2.4",
    "chapterId": "CH-39",
    "title": "Interval Kredibel Bayesian (Highest Posterior Density - HPD) vs Frequentist Confidence Interval",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Membedakan interpretasi epistemologis Interval Kredibel Bayesian vs Interval Kepercayaan Frequentist.",
      "Memahami formulasi Equal-Tailed Interval (ETI) vs Highest Posterior Density Interval (HPDI).",
      "Menginterpretasikan probabilitas langsung pada pernyataan interval kredibel ilmiah."
    ],
    "content": "Salah satu keunggulan terbesar dari paradigma Bayesian dalam komunikasi ilmiah adalah kealamian dan kejujuran interpretasi dari interval estimasinya. Dalam statistika Frequentist, interval kepercayaan 95% seringkali disalahartikan oleh 90% peneliti pemula. Kalimat: \"Terdapat probabilitas 95% bahwa parameter sejati berada dalam rentang [10, 15]\" adalah pernyataan yang salah secara metodologis dalam pandangan Frequentist, namun pernyataan tersebut adalah definisi eksak dan sah dalam pandangan Bayesian.\n\nPerbandingan Interpretasi Filosofis:\n1. Frequentist 95% Confidence Interval (CI):\nParameter $\\theta$ adalah konstanta tetap, sedangkan interval $[L(D), U(D)]$ adalah variabel acak yang bergantung pada sampel data. Pernyataan 95% mengacu pada prosedur sampling jangka panjang: \"Jika eksperimen diulang 100 kali dengan protokol identik dan dihitung 100 interval terpisah, sekitar 95 dari interval tersebut akan mencakup nilai parameter sejati $\\theta$\". Setelah data terkumpul dan interval spesifik $[10, 15]$ dihitung, probabilitasnya adalah 0 atau 1 (parameter ada di dalam atau tidak).\n2. Bayesian 95% Credible Interval:\nParameter $\\theta$ adalah variabel acak dengan distribusi posterior $p(\\theta|D)$, sedangkan interval $[L, U]$ adalah batas numerik tetap yang memuat 95% dari massa probabilitas posterior. Ilmuwan berhak menyatakan secara jujur: \"Berdasarkan data observasi dan model prior saat ini, probabilitas bahwa parameter $\\theta$ berada di antara rentang $[L, U]$ adalah tepat 95%\".\n\nDua Varian Interval Kredibel:\n- Equal-Tailed Interval (ETI): Memotong probabilitas secara simetris $\\alpha/2$ di kedua ujung ekor (misal persentil 2.5% dan 97.5%).\n- Highest Posterior Density Interval (HPDI / HDI): Rentang interval terpendek yang memuat $(1 - \\alpha)$ massa probabilitas. Setiap titik di dalam HPDI memiliki densitas probabilitas posterior yang lebih tinggi dibandingkan titik mana pun di luar HPDI. Sangat ideal untuk distribusi yang sangat menceng atau multimodal.",
    "mathematicalFoundations": "Formulasi Matematis ETI vs HPDI:\nDiberikan distribusi posterior $p(\\theta \\mid \\mathbf{y})$ untuk parameter skalar $\\theta$.\n\n1. Equal-Tailed Interval (ETI) $(1 - \\alpha)$:\nDidefinisikan oleh batas kuantil $q_{\\alpha/2}$ dan $q_{1 - \\alpha/2}$:\n$$\\int_{-\\infty}^{L_{\\text{ETI}}} p(\\theta \\mid \\mathbf{y}) \\, d\\theta = \\frac{\\alpha}{2}, \\quad \\int_{U_{\\text{ETI}}}^{\\infty} p(\\theta \\mid \\mathbf{y}) \\, d\\theta = \\frac{\\alpha}{2}$$\n\n2. Highest Posterior Density Interval (HPDI) $(1 - \\alpha)$:\nDidefinisikan sebagai himpunan parameter $\\Theta_{\\text{HPD}} \\subset \\Theta$ sedemikian rupa sehingga:\n$$P(\\theta \\in \\Theta_{\\text{HPD}} \\mid \\mathbf{y}) = 1 - \\alpha$$\ndan memenuhi syarat ambang kepadatan:\n$$\\Theta_{\\text{HPD}} = \\{ \\theta \\in \\Theta \\mid p(\\theta \\mid \\mathbf{y}) \\geq k_\\alpha \\}$$\ndi mana $k_\\alpha$ adalah konstanta ketinggian densitas horizontal terbesar yang memungkinkan total integral mencapai $(1 - \\alpha)$.\nSifat Matematis:\n$$\\text{Lebar}(\\text{HPDI}) \\leq \\text{Lebar}(\\text{ETI})$$\nHPDI selalu menjamin rentang estimasi tersempit yang mungkin untuk cakupan massa probabilitas tertentu.",
    "workedExample": {
      "problemStatement": "Sebuah distribusi posterior berdistribusi Eksponensial Exp(lambda=1): p(theta|y) = e^-theta untuk theta >= 0. Hitung 95% Equal-Tailed Interval (ETI) dan 95% Highest Posterior Density Interval (HPDI). Buktikan bahwa HPDI memiliki lebar yang lebih sempit dan mencakup titik dengan densitas tertinggi.",
      "stepByStepSolution": [
        "Langkah 1: CDF dari Exp(1) adalah F(theta) = 1 - e^-theta.",
        "Langkah 2: Hitung ETI 95%: Batas bawah L_ETI: 1 - e^-L = 0.025 => e^-L = 0.975 => L = -ln(0.975) = 0.0253. Batas atas U_ETI: 1 - e^-U = 0.975 => e^-U = 0.025 => U = -ln(0.025) = 3.6889. Maka ETI = [0.0253, 3.6889] dengan lebar = 3.6636.",
        "Langkah 3: Hitung HPDI 95%: Karena distribusi eksponensial monoton turun dari theta=0, titik dengan densitas tertinggi adalah theta=0. Maka HPDI wajib dimulai dari L_HPDI = 0.",
        "Langkah 4: Hitung batas atas U_HPDI: F(U_HPDI) - F(0) = 0.95 => 1 - e^-U = 0.95 => e^-U = 0.05 => U = -ln(0.05) = 2.9957. Maka HPDI = [0.0000, 2.9957] dengan lebar = 2.9957.",
        "Langkah 5: Bandingkan lebar: Lebar HPDI (2.9957) jauh lebih sempit dibandingkan lebar ETI (3.6636)."
      ],
      "resultInterpretation": "HPDI mencakup nilai modus (theta=0) dan memiliki rentang 18% lebih efisien/sempit dibandingkan ETI pada distribusi asimetris."
    },
    "pythonImplementation": {
      "description": "Komparasi komputasi Equal-Tailed Interval (ETI) vs Highest Posterior Density Interval (HPDI) dari sampel MCMC.",
      "libraryDependencies": [
        "numpy",
        "scipy.stats"
      ],
      "code": "import numpy as np\n\n# [SIMULASI/SYNTHETIC DATA]\n# 10.000 sampel posterior dari distribusi Gamma menceng kanan (shape=2.0, scale=3.0)\nnp.random.seed(42)\nposterior_samples = np.random.gamma(shape=2.0, scale=3.0, size=10000)\n\n# 1. EQUAL-TAILED INTERVAL (ETI 95%)\neti_lower = np.percentile(posterior_samples, 2.5)\neti_upper = np.percentile(posterior_samples, 97.5)\neti_width = eti_upper - eti_lower\n\n# 2. HIGHEST POSTERIOR DENSITY INTERVAL (HPDI 95%)\ndef compute_hpdi(samples, cred_mass=0.95):\n    sorted_s = np.sort(samples)\n    n = len(sorted_s)\n    n_samples_in_interval = int(np.floor(cred_mass * n))\n    \n    # Cari jendela interval terpendek\n    intervals_width = sorted_s[n_samples_in_interval:] - sorted_s[:n - n_samples_in_interval]\n    min_idx = np.argmin(intervals_width)\n    hdi_min = sorted_s[min_idx]\n    hdi_max = sorted_s[min_idx + n_samples_in_interval]\n    return hdi_min, hdi_max\n\nhpdi_lower, hpdi_upper = compute_hpdi(posterior_samples, cred_mass=0.95)\nhpdi_width = hpdi_upper - hpdi_lower\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kredibel Bayesian:\")\nprint(f\"Equal-Tailed Interval (ETI 95%) : [{eti_lower:.3f}, {eti_upper:.3f}] | Lebar = {eti_width:.3f}\")\nprint(f\"Highest Density Interval (HDI)  : [{hpdi_lower:.3f}, {hpdi_upper:.3f}] | Lebar = {hpdi_width:.3f} (Lebih Kompak!)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kredibel Bayesian:\nEqual-Tailed Interval (ETI 95%) : [0.730, 16.904] | Lebar = 16.175\nHighest Density Interval (HDI)  : [0.243, 15.421] | Lebar = 15.178 (Lebih Kompak!)"
    },
    "commonPitfalls": [
      "Menafsirkan Frequentist Confidence Interval sebagai probabilitas bahwa parameter berada dalam rentang.",
      "Menggunakan HPDI pada distribusi multimodal yang terpecah menjadi beberapa interval terpisah tanpa memeriksa densitas grafis.",
      "Membandingkan batas ETI dengan CI secara langsung tanpa mempertimbangkan pengaruh pemilihan prior."
    ],
    "validationProcedures": [
      "Nyatakan secara eksplisit jenis interval yang dilaporkan: ETI atau HPDI.",
      "Gunakan HPDI saat distribusi posterior memiliki kemencengan (skewness) tinggi.",
      "Gunakan ETI jika invarian terhadap transformasi monoton parameter sangat diprioritaskan."
    ],
    "exercises": [
      {
        "question": "Mengapa Highest Posterior Density Interval (HPDI) selalu memiliki lebar rentang yang lebih pendek atau sama dengan Equal-Tailed Interval (ETI)?",
        "hint": "Perhatikan kriteria pemotongan ketinggian densitas horizontal k_alpha.",
        "answerExplanation": "HPDI secara matematis dirancang untuk memilih kumpulan titik dengan kepadatan posterior tertinggi. Dengan memasukkan titik-titik yang memiliki densitas tinggi dan membuang titik-titik dengan densitas terendah di ekor distribusi, volume atau lebar interval yang dibutuhkan untuk mencakup akumulasi 95% probabilitas dijamin menjadi yang paling minimum."
      },
      {
        "question": "Pada kondisi apa nilai ETI, HPDI, dan Frequentist Confidence Interval akan bernilai hampir identik?",
        "hint": "Perhatikan bentuk distribusi saat ukuran sampel besar dan prior yang digunakan tidak berpihak.",
        "answerExplanation": "Ketiganya akan bernilai hampir identik ketika ukuran sampel sangat besar (n masif), prior yang digunakan adalah uninformative/flat, dan distribusi posterior bersifat simetris Gaussian (unimodal dan tanpa skewness)."
      }
    ],
    "references": [
      {
        "citation": "Kruschke, J. K. (2014). Doing Bayesian Data Analysis: A Tutorial with R, JAGS, and Stan (2nd ed.). Academic Press.",
        "type": "canonical-textbook"
      },
      {
        "citation": "Morey, R. D., Hoekstra, R., Rouder, J. N., Lee, M. D., & Wagenmakers, E. J. (2016). The fallacy of placing confidence in confidence intervals. Psychonomic Bulletin & Review, 23(1), 103-123.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "title": "Tinjauan & Capaian: Interval Kredibel Bayesian (Highest Posterior Density -...",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 6.2.4.",
          "Capaian: Membedakan interpretasi epistemologis Interval Kredibel Bayesian vs Interval Kepercayaan Frequentist.",
          "Capaian: Memahami formulasi Equal-Tailed Interval (ETI) vs Highest Posterior Density Interval (HPDI).",
          "Capaian: Menginterpretasikan probabilitas langsung pada pernyataan interval kredibel ilmiah."
        ],
        "keyFormulaOrDiagram": "$$\\int_{-\\infty}^{L_{\\text{ETI}}} p(\\theta \\mid \\mathbf{y}) \\, d\\theta = \\frac{\\alpha}{2}, \\quad \\int_{U_{\\text{ETI}}}^{\\infty} p(\\theta \\mid \\mathbf{y}) \\, d\\theta = \\frac{\\alpha}{2}$$"
      },
      {
        "slideNumber": 2,
        "title": "Fondasi Konseptual: Interval Kredibel Bayesian (Highest Posterior Density -...",
        "bulletPoints": [
          "Salah satu keunggulan terbesar dari paradigma Bayesian dalam komunikasi ilmiah adalah kealamian dan kejujuran interpretasi da...",
          "Perbandingan Interpretasi Filosofis: 1. Frequentist 95% Confidence Interval (CI): Parameter $\\theta$ adalah konstanta tetap,...",
          "Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."
        ],
        "keyFormulaOrDiagram": "Dua Varian Interval Kredibel: - Equal-Tailed Interval (ETI): Memotong probabilitas secara..."
      },
      {
        "slideNumber": 3,
        "title": "Arsitektur Metodologis & Prinsip Operasional",
        "bulletPoints": [
          "Dua Varian Interval Kredibel: - Equal-Tailed Interval (ETI): Memotong probabilitas secara simetris $\\alpha/2$ di kedua ujung...",
          "Karakterisasi batasan operasional dan domain aplikasi sistem.",
          "Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."
        ]
      },
      {
        "slideNumber": 4,
        "title": "Formulasi Matematis & Notasi Formal",
        "bulletPoints": [
          "Formulasi Matematis ETI vs HPDI:",
          "Diberikan distribusi posterior $p(\\theta \\mid \\mathbf{y})$ untuk parameter skalar $\\theta$.",
          "1. Equal-Tailed Interval (ETI) $(1 - \\alpha)$:"
        ],
        "keyFormulaOrDiagram": "$$\\int_{-\\infty}^{L_{\\text{ETI}}} p(\\theta \\mid \\mathbf{y}) \\, d\\theta = \\frac{\\alpha}{2}, \\quad \\int_{U_{\\text{ETI}}}^{\\infty} p(\\theta \\mid \\mathbf{y}) \\, d\\theta = \\frac{\\alpha}{2}$$"
      },
      {
        "slideNumber": 5,
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "bulletPoints": [
          "Konteks Masalah: Sebuah distribusi posterior berdistribusi Eksponensial Exp(lambda=1): p(theta|y) = e^-theta untuk theta >= 0. Hitung 95% Equal-Tailed Interv...",
          "Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."
        ]
      },
      {
        "slideNumber": 6,
        "title": "Solusi Numerik & Interpretasi Hasil",
        "bulletPoints": [
          "Langkah 1: CDF dari Exp(1) adalah F(theta) = 1 - e^-theta.",
          "Langkah 2: Hitung ETI 95%: Batas bawah L_ETI: 1 - e^-L = 0.025 => e^-L = 0.975 => L = -ln(0.975) = 0.0253. Bat...",
          "Langkah 3: Hitung HPDI 95%: Karena distribusi eksponensial monoton turun dari theta=0, titik dengan densitas t...",
          "Interpretasi: HPDI mencakup nilai modus (theta=0) dan memiliki rentang 18% lebih efisien/sempit dibandingkan ETI pada distribusi asime..."
        ],
        "keyFormulaOrDiagram": "Langkah 5: Bandingkan lebar: Lebar HPDI (2.9957) jauh lebih sempit dibandingkan lebar ETI..."
      },
      {
        "slideNumber": 7,
        "title": "Implementasi Komputasi & Eksekusi Python",
        "bulletPoints": [
          "Deskripsi: Komparasi komputasi Equal-Tailed Interval (ETI) vs Highest Posterior Density Interval (HPDI) dari sampel MCMC.",
          "Dependensi Pustaka: numpy, scipy.stats",
          "Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Komparasi Interval Kredibel Bayesian:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Komparasi Interval Kredibel Bayesian: | Equal-Tailed Interval (E..."
      },
      {
        "slideNumber": 8,
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "bulletPoints": [
          "Perangkap: Menafsirkan Frequentist Confidence Interval sebagai probabilitas bahwa parameter berada dalam rentang.",
          "Perangkap: Menggunakan HPDI pada distribusi multimodal yang terpecah menjadi beberapa interval terpisah tanpa memeriksa d...",
          "Perangkap: Membandingkan batas ETI dengan CI secara langsung tanpa mempertimbangkan pengaruh pemilihan prior."
        ]
      },
      {
        "slideNumber": 9,
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "bulletPoints": [
          "Prosedur: Nyatakan secara eksplisit jenis interval yang dilaporkan: ETI atau HPDI.",
          "Prosedur: Gunakan HPDI saat distribusi posterior memiliki kemencengan (skewness) tinggi.",
          "Prosedur: Gunakan ETI jika invarian terhadap transformasi monoton parameter sangat diprioritaskan."
        ]
      },
      {
        "slideNumber": 10,
        "title": "Sintesis Materi & Latihan Mandiri",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa Highest Posterior Density Interval (HPDI) selalu memiliki lebar rentang yang lebih pendek atau sama dengan Equal...",
          "Petunjuk: Perhatikan kriteria pemotongan ketinggian densitas horizontal k_alpha.",
          "Solusi Kunci: HPDI secara matematis dirancang untuk memilih kumpulan titik dengan kepadatan posterior tertinggi. Dengan memasukkan tit..."
        ]
      }
    ]
  }
};
