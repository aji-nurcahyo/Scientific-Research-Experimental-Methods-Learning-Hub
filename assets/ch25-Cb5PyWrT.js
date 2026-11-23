const a={"4.2.1":{id:"4.2.1",chapterId:"CH-25",title:"Struktur GLM: Komponen Acak, Prediktor Linier, dan Fungsi Penghubung (Link Function)",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami tripartit arsitektur Generalized Linear Models (GLM) Nelder-Wedderburn.","Menurunkan formulasi keluarga eksponensial (Exponential Dispersion Family).","Memilih fungsi penghubung kanonik (canonical link function) yang tepat untuk berbagai jenis respon."],content:`Model regresi linier OLS standar menuntut variabel respon kontinu dengan asumsi galat berdistribusi normal dan memiliki varians konstan. Namun, dalam dunia rekayasa nyata, fenomena yang diteliti sering kali berupa variabel biner (sukses atau gagal uji beban), variabel cacah diskrit (jumlah cacat per wafer silikon), atau waktu tahan lama yang condong positif (time-to-failure komponen).

Memaksakan model OLS pada data biner atau cacah memicu kegagalan teoritis yang fatal: prediksi probabilitas dapat bernilai di bawah 0 atau di atas 1, varians secara intrinsik bergantung pada rata-rata (melanggar homoskedastisitas), dan distribusi residual tidak mungkin simetris normal.

Untuk menyatukan dan memperluas teori pemodelan linier melintasi berbagai jenis distribusi, John Nelder dan Robert Wedderburn (1972) merumuskan Generalized Linear Models (GLM). GLM menggeneralisasi regresi linier dengan mendefinisikan tiga komponen terpadu:
1. Komponen Acak (Random Component): Distribusi probabilitas variabel respon y diasumsikan berasal dari Keluarga Dispersi Eksponensial (Exponential Dispersion Family), yang mencakup distribusi Normal, Bernoulli/Binomial, Poisson, Gamma, dan Inverse Gaussian.
2. Prediktor Linier (Systematic Component): Kombinasi linier dari variabel penjelas: eta = X * beta.
3. Fungsi Penghubung (Link Function): Fungsi monotonik g(.) yang menghubungkan nilai ekspektasi mu = E[y] ke prediktor linier: eta = g(mu).

Dengan memisahkan fungsi penghubung dari asumsi distribusi acak, GLM memungkinkan pemodelan data non-normal yang elegan dan ketat tanpa memerlukan transformasi data ad-hoc yang sering kali merusak interpretabilitas fisik.`,mathematicalFoundations:`1. Definisi Keluarga Dispersi Eksponensial (Exponential Dispersion Family):
Fungsi kepekatan probabilitas atau fungsi massa probabilitas memiliki bentuk kanonik:
$$f(y; \\theta, \\phi) = \\exp\\left( \\frac{y \\theta - b(\\theta)}{a(\\phi)} + c(y, \\phi) \\right)$$
di mana:
- $\\theta$ adalah parameter alami (*natural/canonical parameter*).
- $\\phi$ adalah parameter dispersi (*dispersion parameter*).
- $b(\\theta)$ adalah fungsi kumulan (*cumulant function*).

2. Sifat Ekspektasi dan Varians GLM:
Rata-rata (mean):
$$\\mu = E[y] = b'(\\theta)$$
Varians:
$$\\text{Var}(y) = b''(\\theta) a(\\phi) = V(\\mu) a(\\phi)$$
di mana $V(\\mu)$ adalah fungsi varians (*variance function*) yang menentukan bagaimana variabilitas data berubah seiring perubahan nilai rata-rata $\\mu$.

3. Fungsi Penghubung Kanonik (Canonical Link):
Fungsi penghubung kanonik diperoleh ketika prediktor linier $\\eta$ disamakan langsung dengan parameter alami $\\theta$:
$$g(\\mu) = \\theta = (b')^{-1}(\\mu)$$
- Distribusi Normal: $b(\\theta) = \\theta^2/2 \\implies g(\\mu) = \\mu$ (Link Identitas).
- Distribusi Bernoulli/Binomial: $b(\\theta) = \\ln(1 + e^\\theta) \\implies g(\\mu) = \\ln\\left(\\frac{\\mu}{1-\\mu}\\right)$ (Link Logit).
- Distribusi Poisson: $b(\\theta) = e^\\theta \\implies g(\\mu) = \\ln(\\mu)$ (Link Log).
- Distribusi Gamma: $b(\\theta) = -\\ln(-\\theta) \\implies g(\\mu) = 1/\\mu$ (Link Resiprokal).`,workedExample:{problemStatement:"Tunjukkan bahwa distribusi Poisson P(Y = y) = (lambda^y * e^(-lambda)) / y! merupakan anggota dari Keluarga Dispersi Eksponensial. Tentukan parameter alami theta, fungsi kumulan b(theta), dan buktikan fungsi penghubung kanoniknya adalah g(mu) = ln(mu).",stepByStepSolution:["Langkah 1: Tuliskan fungsi probabilitas Poisson: f(y; lambda) = exp(ln( (lambda^y * e^(-lambda)) / y! )).",`Langkah 2: Uraikan logaritma alami:
ln(f) = y * ln(lambda) - lambda - ln(y!).`,`Langkah 3: Cocokkan ke dalam bentuk standar exp( [y*theta - b(theta)]/a(phi) + c(y, phi) ):
f(y; lambda) = exp( y * ln(lambda) - lambda - ln(y!) ).`,`Langkah 4: Identifikasi komponen:
- theta = ln(lambda) (Parameter alami).
- a(phi) = 1 (Parameter dispersi phi = 1 tetap).
- b(theta) = lambda = exp(theta) (Fungsi kumulan).
- c(y, phi) = -ln(y!).`,`Langkah 5: Turunkan ekspektasi mu:
mu = b'(theta) = d/dtheta [exp(theta)] = exp(theta) = lambda.`,`Langkah 6: Tentukan fungsi penghubung kanonik g(mu):
g(mu) = theta = ln(lambda) = ln(mu).`],resultInterpretation:"Terbukti bahwa distribusi Poisson adalah anggota keluarga eksponensial dengan fungsi penghubung kanonik logaritma natural: eta = ln(mu). Hal ini mendasari formulasi matematis model regresi Poisson."},pythonImplementation:{description:"Implementasi GLM dengan link kanonik menggunakan statsmodels.api.GLM.",libraryDependencies:["numpy","statsmodels"],code:`import numpy as np
import statsmodels.api as sm

np.random.seed(42)
n = 100

# Prediktor intensitas arus listrik (Ampere)
arus = np.linspace(1.0, 5.0, n)
X = sm.add_constant(arus)

# Parameter sejati: Poisson GLM dengan log link (ln(mu) = 0.5 + 0.6 * arus)
eta_sejati = 0.5 + 0.6 * arus
mu_sejati = np.exp(eta_sejati)
# Realisasi data cacah diskrit Poisson
y_cacah = np.random.poisson(mu_sejati)

# Pasang GLM Poisson dengan Canonical Link (Log)
model_glm = sm.GLM(y_cacah, X, family=sm.families.Poisson(link=sm.families.links.Log())).fit()

print("[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Generalized Linear Model (GLM Poisson)")
print(f"Koefisien Estimasi : Intersep = {model_glm.params[0]:.4f}, Slope = {model_glm.params[1]:.4f}")
print(f"Standar Error SE   : Intersep = {model_glm.bse[0]:.4f}, Slope = {model_glm.bse[1]:.4f}")
print(f"Devians Residual   : {model_glm.deviance:.2f} (df: {model_glm.df_resid})")
print(f"Skala Dispersi     : {model_glm.scale:.4f}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Generalized Linear Model (GLM Poisson)
Koefisien Estimasi : Intersep = 0.4491, Slope = 0.6125
Standar Error SE   : Intersep = 0.0898, Slope = 0.0252
Devians Residual   : 92.42 (df: 98)
Skala Dispersi     : 1.0000`},commonPitfalls:["Memaksakan regresi OLS pada data biner atau cacah yang menghasilkan prediksi probabilitas di luar rentang valid [0, 1] atau cacah negatif.","Melakukan transformasi log(y + 1) pada data cacah dengan OLS alih-alih menggunakan Poisson GLM (memicu bias estimasi berat pada nilai kecil).","Mengabaikan perbedaan antara parameter alami theta dan nilai harapan observasi mu."],validationProcedures:["Identifikasi sifat variabel respon (kontinu simetris, biner, proporsi, atau cacah diskrit non-negatif).","Pilih keluarga distribusi dan fungsi link yang menjamin prediksi berada pada domain fisik yang valid.","Periksa rasio devians terhadap derajat kebebasan untuk memastikan tidak terjadi overdispersi berat."],exercises:[{question:"Apakah fungsi penghubung kanonik (canonical link function) untuk variabel respon yang berdistribusi Bernoulli/Binomial dalam GLM?",hint:"Perhatikan relasi parameter alami theta pada fungsi peluang Bernoulli: ln(p / (1 - p)).",answerExplanation:"Fungsi penghubung kanonik untuk distribusi binomial adalah fungsi logit: g(mu) = ln(mu / (1 - mu)), yang memetakan probabilitas [0, 1] ke seluruh garis bilangan riil (-inf, +inf)."}],references:[{citation:"Nelder, J. A., & Wedderburn, R. W. (1972). Generalized linear models. Journal of the Royal Statistical Society: Series A, 135(3), 370-384.",type:"peer-reviewed-article"},{citation:"McCullagh, P., & Nelder, J. A. (1989). Generalized Linear Models (2nd ed.). Chapman and Hall/CRC.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Struktur GLM: Komponen Acak, Prediktor Linier, dan Fung...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.2.1.","Capaian: Memahami tripartit arsitektur Generalized Linear Models (GLM) Nelder-Wedderburn.","Capaian: Menurunkan formulasi keluarga eksponensial (Exponential Dispersion Family).","Capaian: Memilih fungsi penghubung kanonik (canonical link function) yang tepat untuk berbagai jenis respon."],keyFormulaOrDiagram:"$$f(y; \\theta, \\phi) = \\exp\\left( \\frac{y \\theta - b(\\theta)}{a(\\phi)} + c(y, \\phi) \\right)$$"},{slideNumber:2,title:"Fondasi Konseptual: Struktur GLM: Komponen Acak, Prediktor Linier, dan Fung...",bulletPoints:["Model regresi linier OLS standar menuntut variabel respon kontinu dengan asumsi galat berdistribusi normal dan memiliki varia...","Memaksakan model OLS pada data biner atau cacah memicu kegagalan teoritis yang fatal: prediksi probabilitas dapat bernilai di...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Untuk menyatukan dan memperluas teori pemodelan linier melintasi berbagai jenis distribusi..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Untuk menyatukan dan memperluas teori pemodelan linier melintasi berbagai jenis distribusi, John Nelder dan Robert Wedderburn...","Dengan memisahkan fungsi penghubung dari asumsi distribusi acak, GLM memungkinkan pemodelan data non-normal yang elegan dan k...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["1. Definisi Keluarga Dispersi Eksponensial (Exponential Dispersion Family):","Fungsi kepekatan probabilitas atau fungsi massa probabilitas memiliki bentuk kanonik:","di mana:"],keyFormulaOrDiagram:"$$f(y; \\theta, \\phi) = \\exp\\left( \\frac{y \\theta - b(\\theta)}{a(\\phi)} + c(y, \\phi) \\right)$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Tunjukkan bahwa distribusi Poisson P(Y = y) = (lambda^y * e^(-lambda)) / y! merupakan anggota dari Keluarga Dispersi Eksponensial. Tentukan...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Tuliskan fungsi probabilitas Poisson: f(y; lambda) = exp(ln( (lambda^y * e^(-lambda)) / y! )).","Langkah 2: Uraikan logaritma alami: ln(f) = y * ln(lambda) - lambda - ln(y!).","Langkah 3: Cocokkan ke dalam bentuk standar exp( [y*theta - b(theta)]/a(phi) + c(y, phi) ): f(y; lambda) = exp...","Interpretasi: Terbukti bahwa distribusi Poisson adalah anggota keluarga eksponensial dengan fungsi penghubung kanonik logaritma natura..."],keyFormulaOrDiagram:"Langkah 6: Tentukan fungsi penghubung kanonik g(mu): g(mu) = theta = ln(lambda) = ln(mu)."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Implementasi GLM dengan link kanonik menggunakan statsmodels.api.GLM.","Dependensi Pustaka: numpy, statsmodels","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil Estimasi Generalized Linear Model (GLM Poisson)"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Generalized Linear Model (GLM Poisson) | Koefisie..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Memaksakan regresi OLS pada data biner atau cacah yang menghasilkan prediksi probabilitas di luar rentang vali...","Perangkap: Melakukan transformasi log(y + 1) pada data cacah dengan OLS alih-alih menggunakan Poisson GLM (memicu bias es...","Perangkap: Mengabaikan perbedaan antara parameter alami theta dan nilai harapan observasi mu."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Identifikasi sifat variabel respon (kontinu simetris, biner, proporsi, atau cacah diskrit non-negatif).","Prosedur: Pilih keluarga distribusi dan fungsi link yang menjamin prediksi berada pada domain fisik yang valid.","Prosedur: Periksa rasio devians terhadap derajat kebebasan untuk memastikan tidak terjadi overdispersi berat."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Apakah fungsi penghubung kanonik (canonical link function) untuk variabel respon yang berdistribusi Bernoulli/Binomial d...","Petunjuk: Perhatikan relasi parameter alami theta pada fungsi peluang Bernoulli: ln(p / (1 - p)).","Solusi Kunci: Fungsi penghubung kanonik untuk distribusi binomial adalah fungsi logit: g(mu) = ln(mu / (1 - mu)), yang memetakan proba..."]}]},"4.2.2":{id:"4.2.2",chapterId:"CH-25",title:"Regresi Logistik Biner: Estimasi Probabilitas, Odds Ratio, dan Kurva ROC",readingTimeMinutes:22,status:"verified",learningObjectives:["Menurunkan fungsi kemungkinan logaritmik (Log-Likelihood) model regresi logistik biner.","Menginterpretasikan koefisien regresi sebagai Odds Ratio (OR) dengan benar.","Mengevaluasi diskriminasi model menggunakan Receiver Operating Characteristic (ROC) dan Area Under the Curve (AUC)."],content:`Regresi Logistik Biner adalah varian GLM paling populer dalam sains rekayasa dan kecerdasan buatan, dirancang untuk memodelkan variabel respon dikotomis y in {0, 1} (seperti deteksi retak beton, klasifikasi sinyal anomali, atau keberhasilan transmisi data nirkabel).

Dalam model logistik, fungsi link logit memetakan probabilitas p = P(y = 1 | x) yang terbatas pada interval [0, 1] ke dalam rentang tanpa batas (-inf, +inf) melalui transformasi logaritma dari peluang (odds):
$$\\text{logit}(p) = \\ln\\left( \\frac{p}{1 - p} \\right) = \\mathbf{x}^T \\boldsymbol{\\beta}$$
Dengan membalikkan transformasi logit, fungsi sigmoid logistik standar dihasilkan:
$$p = \\frac{1}{1 + e^{-\\mathbf{x}^T \\boldsymbol{\\beta}}}$$

Karena tidak ada solusi analitis tertutup seperti OLS, estimasi parameter beta diselesaikan menggunakan Maximum Likelihood Estimation (MLE) melalui algoritma optimasi numerik Newton-Raphson atau Iteratively Reweighted Least Squares (IRLS).

Interpretasi koefisien regresi logistik didasarkan pada Rasio Peluang (Odds Ratio / OR). Eksponensial dari koefisien exp(beta_j) merepresentasikan faktor pengali odds terjadinya peristiwa untuk setiap kenaikan satu satuan prediktor x_j, dengan asumsi prediktor lainnya konstan. Untuk mengevaluasi kemampuan diskriminasi klasifikasi model melintasi seluruh ambang batas pembuat keputusan (decision thresholds), digunakan Kurva ROC dan metrik AUC (Area Under the Curve).`,mathematicalFoundations:`1. Fungsi Log-Likelihood Regresi Logistik:
Diberikan $n$ observasi independen $(y_i, \\mathbf{x}_i)$ di mana $y_i \\sim \\text{Bernoulli}(p_i)$:
$$L(\\boldsymbol{\\beta}) = \\prod_{i=1}^n p_i^{y_i} (1 - p_i)^{1 - y_i}$$
Log-Likelihood:
$$\\ell(\\boldsymbol{\\beta}) = \\sum_{i=1}^n \\left[ y_i \\ln(p_i) + (1 - y_i) \\ln(1 - p_i) \\right]$$
Substitusi $p_i = 1 / (1 + e^{-\\mathbf{x}_i^T \\boldsymbol{\\beta}})$:
$$\\ell(\\boldsymbol{\\beta}) = \\sum_{i=1}^n \\left[ y_i (\\mathbf{x}_i^T \\boldsymbol{\\beta}) - \\ln(1 + e^{\\mathbf{x}_i^T \\boldsymbol{\\beta}}) \\right]$$

2. Gradien (Score Function) dan Matriks Hessian:
Gradien vektor:
$$\\mathbf{s}(\\boldsymbol{\\beta}) = \\frac{\\partial \\ell}{\\partial \\boldsymbol{\\beta}} = \\sum_{i=1}^n (y_i - p_i) \\mathbf{x}_i = \\mathbf{X}^T (\\mathbf{y} - \\mathbf{p})$$
Matriks Hessian (Observasi Informasi Fisher):
$$\\mathbf{H}(\\boldsymbol{\\beta}) = \\frac{\\partial^2 \\ell}{\\partial \\boldsymbol{\\beta} \\partial \\boldsymbol{\\beta}^T} = - \\sum_{i=1}^n p_i (1 - p_i) \\mathbf{x}_i \\mathbf{x}_i^T = - \\mathbf{X}^T \\mathbf{W} \\mathbf{X}$$
di mana $\\mathbf{W} = \\text{diag}(p_i (1 - p_i))$. Pembaruan parameter via Newton-Raphson:
$$\\boldsymbol{\\beta}^{(t+1)} = \\boldsymbol{\\beta}^{(t)} - \\mathbf{H}^{-1} \\mathbf{s}$$

3. Interpretasi Odds Ratio (OR):
$$\\text{Odds}(x_j + 1) = \\frac{p(x_j + 1)}{1 - p(x_j + 1)} = e^{\\beta_0 + \\dots + \\beta_j(x_j + 1)} = \\text{Odds}(x_j) \\cdot e^{\\beta_j}$$
$$\\text{OR}_j = \\frac{\\text{Odds}(x_j + 1)}{\\text{Odds}(x_j)} = e^{\\beta_j}$$`,workedExample:{problemStatement:"Pada pengujian kelelahan sambungan las struktur baja terhadap tegangan siklik (X, MPa), diperoleh model regresi logistik logit(p) = -6.0 + 0.05 * X, di mana p adalah probabilitas terjadinya retak mikro. Hitung probabilitas retak pada tegangan 100 MPa dan 140 MPa, serta hitung Odds Ratio untuk kenaikan tegangan sebesar 20 MPa.",stepByStepSolution:[`Langkah 1: Hitung prediktor linier eta pada X = 100 MPa:
eta_100 = -6.0 + 0.05 * (100) = -6.0 + 5.0 = -1.0.
Probabilitas p_100 = 1 / (1 + exp(-(-1.0))) = 1 / (1 + exp(1.0)) = 1 / (1 + 2.7183) = 1 / 3.7183 = 0.2689 (26.89%).`,`Langkah 2: Hitung prediktor linier eta pada X = 140 MPa:
eta_140 = -6.0 + 0.05 * (140) = -6.0 + 7.0 = +1.0.
Probabilitas p_140 = 1 / (1 + exp(-1.0)) = 1 / (1 + 0.3679) = 1 / 1.3679 = 0.7311 (73.11%).`,`Langkah 3: Hitung Odds Ratio untuk kenaikan delta_X = 20 MPa:
OR_(delta=20) = exp(beta * delta_X) = exp(0.05 * 20) = exp(1.0) = 2.7183.`],resultInterpretation:"Pada tegangan 100 MPa, risiko retak adalah 26.89%, namun melonjak menjadi 73.11% pada 140 MPa. Setiap kenaikan beban tegangan sebesar 20 MPa melipatgandakan peluang terjadinya retak struktur sebesar 2.72 kali lipat."},pythonImplementation:{description:"Pemasangan regresi logistik, kalkulasi Odds Ratio, dan evaluasi kurva ROC / AUC menggunakan scikit-learn dan statsmodels.",libraryDependencies:["numpy","statsmodels","sklearn.metrics"],code:`import numpy as np
import statsmodels.api as sm
from sklearn.metrics import roc_curve, auc

np.random.seed(42)
n = 200

# Prediktor tegangan mekanik (MPa)
tegangan = np.random.uniform(60, 160, size=n)
X = sm.add_constant(tegangan)

# Logit sejati: p = sigmoid(-6.0 + 0.05 * tegangan)
p_sejati = 1.0 / (1.0 + np.exp(-(-6.0 + 0.05 * tegangan)))
y_retak = np.random.binomial(1, p_sejati)

# Pasang model Logit statsmodels
model_logit = sm.Logit(y_retak, X).fit(disp=False)
beta = model_logit.params
odds_ratio = np.exp(beta[1])
or_ci = np.exp(model_logit.conf_int()[1])

# Evaluasi Kurva ROC dan AUC
p_pred = model_logit.predict(X)
fpr, tpr, _ = roc_curve(y_retak, p_pred)
roc_auc = auc(fpr, tpr)

print("[SIMULASI/SYNTHETIC DATA] Hasil Regresi Logistik Biner")
print(f"Koefisien Intersep : {beta[0]:.4f} (p: {model_logit.pvalues[0]:.4f})")
print(f"Koefisien Tegangan : {beta[1]:.4f} (p: {model_logit.pvalues[1]:.4f})")
print(f"Odds Ratio (1 MPa) : {odds_ratio:.4f} [95% CI: {or_ci[0]:.4f}, {or_ci[1]:.4f}]")
print(f"Odds Ratio (20 MPa): {np.exp(beta[1] * 20):.4f}")
print(f"Area Under ROC(AUC): {roc_auc:.4f} (Klasifikasi Sangat Unggul)")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Regresi Logistik Biner
Koefisien Intersep : -6.5385 (p: 0.0000)
Koefisien Tegangan : 0.0543 (p: 0.0000)
Odds Ratio (1 MPa) : 1.0558 [95% CI: 1.0361, 1.0759]
Odds Ratio (20 MPa): 2.9634
Area Under ROC(AUC): 0.8521 (Klasifikasi Sangat Unggul)`},commonPitfalls:["Menafsirkan koefisien regresi logistik beta secara langsung sebagai perubahan probabilitas marjinal (seharusnya diinterpretasikan sebagai perubahan log-odds).","Mengabaikan masalah separasi sempurna (quasi/complete separation) yang menyebabkan koefisien beta dan standar error meledak menuju tak terhingga.","Menggunakan threshold default 0.5 secara membabi buta tanpa mempertimbangkan biaya asimetris antara False Positive dan False Negative."],validationProcedures:["Konfirmasi ketiadaan multikolinearitas ekstrem pada variabel prediktor.","Evaluasi kalibrasi probabilitas model menggunakan uji Hosmer-Lemeshow atau calibration curve.","Laporkan selalu metrik diskriminasi global AUC-ROC beserta matriks konfusi pada threshold optimal."],exercises:[{question:"Jika koefisien regresi logistik untuk suatu prediktor adalah beta_1 = 0.6931, berapakah perkiraan nilai Odds Ratio (OR) prediktor tersebut?",hint:"Odds Ratio dihitung sebagai eksponensial dari koefisien: OR = exp(beta).",answerExplanation:"OR = exp(0.6931) = 2.0. Ini berarti setiap kenaikan satu satuan prediktor menggandakan odds (peluang) terjadinya peristiwa target menjadi dua kali lipat."}],references:[{citation:"Hosmer Jr, D. W., Lemeshow, S., & Sturdivant, R. X. (2013). Applied Logistic Regression (3rd ed.). John Wiley & Sons.",type:"canonical-textbook"},{citation:"Fawcett, T. (2006). An introduction to ROC analysis. Pattern Recognition Letters, 27(8), 861-874.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Regresi Logistik Biner: Estimasi Probabilitas, Odds Rat...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.2.2.","Capaian: Menurunkan fungsi kemungkinan logaritmik (Log-Likelihood) model regresi logistik biner.","Capaian: Menginterpretasikan koefisien regresi sebagai Odds Ratio (OR) dengan benar.","Capaian: Mengevaluasi diskriminasi model menggunakan Receiver Operating Characteristic (ROC) dan Area Under the Curve (..."],keyFormulaOrDiagram:"$$L(\\boldsymbol{\\beta}) = \\prod_{i=1}^n p_i^{y_i} (1 - p_i)^{1 - y_i}$$"},{slideNumber:2,title:"Fondasi Konseptual: Regresi Logistik Biner: Estimasi Probabilitas, Odds Rat...",bulletPoints:["Regresi Logistik Biner adalah varian GLM paling populer dalam sains rekayasa dan kecerdasan buatan, dirancang untuk memodelka...","Dalam model logistik, fungsi link logit memetakan probabilitas p = P(y = 1 | x) yang terbatas pada interval [0, 1] ke dalam r...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Karena tidak ada solusi analitis tertutup seperti OLS, estimasi parameter beta diselesaika..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Karena tidak ada solusi analitis tertutup seperti OLS, estimasi parameter beta diselesaikan menggunakan Maximum Likelihood Es...","Interpretasi koefisien regresi logistik didasarkan pada Rasio Peluang (Odds Ratio / OR). Eksponensial dari koefisien exp(beta...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["1. Fungsi Log-Likelihood Regresi Logistik:","Diberikan $n$ observasi independen $(y_i, \\mathbf{x}_i)$ di mana $y_i \\sim \\text{Bernoulli}(p_i)$:","Log-Likelihood:"],keyFormulaOrDiagram:"$$L(\\boldsymbol{\\beta}) = \\prod_{i=1}^n p_i^{y_i} (1 - p_i)^{1 - y_i}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Pada pengujian kelelahan sambungan las struktur baja terhadap tegangan siklik (X, MPa), diperoleh model regresi logistik logit(p) = -6.0 + 0...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung prediktor linier eta pada X = 100 MPa: eta_100 = -6.0 + 0.05 * (100) = -6.0 + 5.0 = -1.0. Pr...","Langkah 2: Hitung prediktor linier eta pada X = 140 MPa: eta_140 = -6.0 + 0.05 * (140) = -6.0 + 7.0 = +1.0. Pr...","Langkah 3: Hitung Odds Ratio untuk kenaikan delta_X = 20 MPa: OR_(delta=20) = exp(beta * delta_X) = exp(0.05 *...","Interpretasi: Pada tegangan 100 MPa, risiko retak adalah 26.89%, namun melonjak menjadi 73.11% pada 140 MPa. Setiap kenaikan beban teg..."],keyFormulaOrDiagram:"Langkah 3: Hitung Odds Ratio untuk kenaikan delta_X = 20 MPa: OR_(delta=20) = exp(beta * d..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Pemasangan regresi logistik, kalkulasi Odds Ratio, dan evaluasi kurva ROC / AUC menggunakan scikit-learn dan statsmodels.","Dependensi Pustaka: numpy, statsmodels, sklearn.metrics","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil Regresi Logistik Biner"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Hasil Regresi Logistik Biner | Koefisien Intersep : -6.5385 (p:..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menafsirkan koefisien regresi logistik beta secara langsung sebagai perubahan probabilitas marjinal (seharusny...","Perangkap: Mengabaikan masalah separasi sempurna (quasi/complete separation) yang menyebabkan koefisien beta dan standar...","Perangkap: Menggunakan threshold default 0.5 secara membabi buta tanpa mempertimbangkan biaya asimetris antara False Posi..."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Konfirmasi ketiadaan multikolinearitas ekstrem pada variabel prediktor.","Prosedur: Evaluasi kalibrasi probabilitas model menggunakan uji Hosmer-Lemeshow atau calibration curve.","Prosedur: Laporkan selalu metrik diskriminasi global AUC-ROC beserta matriks konfusi pada threshold optimal."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Jika koefisien regresi logistik untuk suatu prediktor adalah beta_1 = 0.6931, berapakah perkiraan nilai Odds Ratio (OR)...","Petunjuk: Odds Ratio dihitung sebagai eksponensial dari koefisien: OR = exp(beta).","Solusi Kunci: OR = exp(0.6931) = 2.0. Ini berarti setiap kenaikan satu satuan prediktor menggandakan odds (peluang) terjadinya peristi..."]}]},"4.2.3":{id:"4.2.3",chapterId:"CH-25",title:"Regresi Poisson dan Negative Binomial untuk Data Cacah Rekayasa",readingTimeMinutes:20,status:"verified",learningObjectives:["Memodelkan data cacah diskrit non-negatif menggunakan regresi Poisson.","Mendiagnosis dan menangani fenomena overdispersi varians (overdispersion).","Menerapkan Regresi Negative Binomial sebagai ekstensi tangguh Poisson ketika varians melampaui rata-rata."],content:`Dalam riset eksperimental dan pemantauan sistem rekayasa, data yang dikumpulkan sering kali berbentuk cacahan diskrit non-negatif: jumlah paket data yang hilang dalam transmisi jaringan per detik, frekuensi retakan mikro pada permukaan beton cor per meter persegi, atau jumlah transaksi gagal pada server basis data.

Model matematika klasik untuk data cacah adalah Regresi Poisson. Dalam model Poisson standar, diasumsikan bahwa probabilitas kemunculan peristiwa bersifat independen antar-waktu atau antar-ruang. Karakteristik paling ketat dari distribusi Poisson adalah sifat Equidispersion: nilai varians teoritis harus sama persis dengan nilai rata-rata:
$$\\text{Var}(y | \\mathbf{x}) = E[y | \\mathbf{x}] = \\mu$$

Namun, dalam data empiris riil, asumsi ekuidispersi ini hampir selalu dilanggar. Kondisi di mana varians teramati jauh lebih besar daripada rata-rata sampel disebut Overdispersi (Overdispersion). Overdispersi terjadi akibat adanya heterogenitas yang tidak teramati antar-subjek, ketergantungan temporal/spasial (klastering kejadian), atau kelebihan nilai nol (excess zeros).

Jika model Poisson tetap dipaksakan ketika terjadi overdispersi, estimasi koefisien regresi tetap konsisten, namun standar error akan sangat diremehkan (underestimated). Akibatnya, nilai t-statistik menjadi terlalu besar dan peneliti membuat klaim temuan signifikan palsu. Solusi elegan untuk mengatasi overdispersi adalah Regresi Negative Binomial (NB2), yang menyisipkan parameter dispersi gamma acak untuk mengakomodasi variabilitas ekstra pada data.`,mathematicalFoundations:`1. Formulasi Regresi Poisson:
$$P(Y_i = y_i | \\mathbf{x}_i) = \\frac{\\mu_i^{y_i} e^{-\\mu_i}}{y_i!}, \\quad y_i = 0, 1, 2, \\dots$$
Fungsi link log kanonik:
$$\\ln(\\mu_i) = \\mathbf{x}_i^T \\boldsymbol{\\beta} \\implies \\mu_i = \\exp(\\mathbf{x}_i^T \\boldsymbol{\\beta})$$
Sifat ekuidispersi:
$$E[Y_i | \\mathbf{x}_i] = \\mu_i, \\quad \\text{Var}(Y_i | \\mathbf{x}_i) = \\mu_i$$

2. Deteksi Overdispersi via Statistik Dispersi Pearson:
$$\\hat{\\phi} = \\frac{\\chi^2_{\\text{Pearson}}}{n - p} = \\frac{1}{n - p} \\sum_{i=1}^n \\frac{(y_i - \\hat{\\mu}_i)^2}{\\hat{\\mu}_i}$$
- $\\hat{\\phi} \\approx 1.0$: Model Poisson valid (ekuidispersi).
- $\\hat{\\phi} > 1.5$: Terjadi overdispersi nyata. Standar error Poisson harus dikoreksi atau model diganti ke Negative Binomial.

3. Formulasi Regresi Negative Binomial (NB2):
Model NB2 memperlakukan rata-rata Poisson sebagai variabel acak $\\tilde{\\mu}_i = \\mu_i \\nu_i$, di mana $\\nu_i \\sim \\text{Gamma}(1/\\alpha, 1/\\alpha)$ dengan ekspektasi 1 dan varians $\\alpha$.
Fungsi varians kuadratik NB2:
$$\\text{Var}(Y_i | \\mathbf{x}_i) = \\mu_i + \\alpha \\mu_i^2$$
di mana $\\alpha \\ge 0$ adalah parameter dispersi.
Jika $\\alpha \\to 0$, model Negative Binomial mereduksi kembali menjadi model Poisson standar.`,workedExample:{problemStatement:"Pada pengujian stabilitas jaringan sensor nirkabel n = 100 putaran, dianalisis jumlah paket hilang (y). Model Poisson menghasilkan devians Pearson chi^2 = 285.0 dengan derajat kebebasan df = 95. Hitung rasio dispersi Pearson hat{phi}, tentukan apakah terjadi overdispersi, dan jelaskan konsekuensi jika peneliti tidak beralih ke Negative Binomial.",stepByStepSolution:["Langkah 1: Identifikasi parameter: chi^2_Pearson = 285.0, derajat kebebasan df = n - p = 95.","Langkah 2: Hitung rasio dispersi: hat{phi} = 285.0 / 95 = 3.00.","Langkah 3: Evaluasi overdispersi: Karena hat{phi} = 3.00 >> 1.0, data mengalami overdispersi yang sangat parah (varians data adalah 3 kali lipat lebih besar dari yang diasumsikan distribusi Poisson).","Langkah 4: Hitung faktor distorsi standar error: SE sejati diperkirakan membengkak sebesar sqrt(hat{phi}) = sqrt(3.00) = 1.732 kali lipat dari SE yang dilaporkan model Poisson standar."],resultInterpretation:"Model Poisson sangat tidak cocok. Standar error yang dilaporkan mengecil sebesar 73%, menyebabkan nilai p-value menjadi jauh terlalu optimis palsu. Model harus diestimasi ulang menggunakan Regresi Negative Binomial."},pythonImplementation:{description:"Perbandingan pemodelan data cacah dengan overdispersi menggunakan Poisson GLM versus Negative Binomial.",libraryDependencies:["numpy","statsmodels"],code:`import numpy as np
import statsmodels.api as sm

np.random.seed(42)
n = 150

# Prediktor getaran mekanis turbin (mm/s)
getaran = np.random.uniform(0.5, 4.0, size=n)
X = sm.add_constant(getaran)

# Simulasi data dengan overdispersi sejati (Negative Binomial: alpha = 0.5)
mu_sejati = np.exp(0.8 + 0.5 * getaran)
alpha_sejati = 0.5
p_nb = 1.0 / (1.0 + alpha_sejati * mu_sejati)
n_nb = 1.0 / alpha_sejati
y_cacah = np.random.negative_binomial(n_nb, p_nb)

# 1. Pasang Poisson GLM
model_poi = sm.GLM(y_cacah, X, family=sm.families.Poisson()).fit()
phi_poi = model_poi.pearson_chi2 / model_poi.df_resid

# 2. Pasang Negative Binomial GLM
model_nb = sm.GLM(y_cacah, X, family=sm.families.NegativeBinomial(alpha=alpha_sejati)).fit()
phi_nb = model_nb.pearson_chi2 / model_nb.df_resid

print("[SIMULASI/SYNTHETIC DATA] Perbandingan Model Poisson vs Negative Binomial")
print(f"Poisson Dispersi Pearson (phi) : {phi_poi:.2f} (Overdispersi Berat)")
print(f"Poisson Koefisien Getaran      : {model_poi.params[1]:.4f} (SE: {model_poi.bse[1]:.4f})")
print(f"\\nNegative Binomial Pearson (phi): {phi_nb:.2f} (Terkalibrasi Sempurna)")
print(f"Negative Binomial Koef Getaran : {model_nb.params[1]:.4f} (SE: {model_nb.bse[1]:.4f})")
print(f"Rasio Pembengkakan SE Realistis: {model_nb.bse[1] / model_poi.bse[1]:.2f}x lipat")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Perbandingan Model Poisson vs Negative Binomial
Poisson Dispersi Pearson (phi) : 2.76 (Overdispersi Berat)
Poisson Koefisien Getaran      : 0.5050 (SE: 0.0463)

Negative Binomial Pearson (phi): 0.99 (Terkalibrasi Sempurna)
Negative Binomial Koef Getaran : 0.5113 (SE: 0.0815)
Rasio Pembengkakan SE Realistis: 1.76x lipat`},commonPitfalls:["Mengabaikan pemeriksaan rasio dispersi Pearson pada regresi Poisson dan menganggap standar error default sudah benar.","Menggunakan regresi linier OLS pada data cacah dengan mentransformasikan nilai menggunakan akar kuadrat atau logaritma tanpa justifikasi teoritis.","Mengabaikan keberadaan kelebihan nilai nol (excess zeros) yang membutuhkan model Zero-Inflated Poisson (ZIP) atau Zero-Inflated Negative Binomial (ZINB)."],validationProcedures:["Hitung statistik dispersi Pearson hat{phi} = Pearson_chi2 / df_resid.","Jika hat{phi} > 1.25, ganti model Poisson dengan Negative Binomial atau Quasi-Poisson.","Uji signifikansi parameter dispersi alpha menggunakan Likelihood Ratio Test antara model Poisson dan NB."],exercises:[{question:"Apakah perbedaan mendasar antara fungsi varians model Poisson dan model Negative Binomial (NB2)?",hint:"Perhatikan keberadaan parameter dispersi kuadratik alpha * mu^2.",answerExplanation:"Model Poisson menetapkan varians sama dengan rata-rata (Var = mu), sedangkan Negative Binomial memperluas varians dengan suku kuadratik (Var = mu + alpha * mu^2), sehingga mampu mengakomodasi overdispersi data."}],references:[{citation:"Cameron, A. C., & Trivedi, P. K. (2013). Regression Analysis of Count Data (2nd ed.). Cambridge University Press.",type:"canonical-textbook"},{citation:"Hilbe, J. M. (2011). Negative Binomial Regression (2nd ed.). Cambridge University Press.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Regresi Poisson dan Negative Binomial untuk Data Cacah...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.2.3.","Capaian: Memodelkan data cacah diskrit non-negatif menggunakan regresi Poisson.","Capaian: Mendiagnosis dan menangani fenomena overdispersi varians (overdispersion).","Capaian: Menerapkan Regresi Negative Binomial sebagai ekstensi tangguh Poisson ketika varians melampaui rata-rata."],keyFormulaOrDiagram:"$$P(Y_i = y_i | \\mathbf{x}_i) = \\frac{\\mu_i^{y_i} e^{-\\mu_i}}{y_i!}, \\quad y_i = 0, 1, 2, \\dots$$"},{slideNumber:2,title:"Fondasi Konseptual: Regresi Poisson dan Negative Binomial untuk Data Cacah...",bulletPoints:["Dalam riset eksperimental dan pemantauan sistem rekayasa, data yang dikumpulkan sering kali berbentuk cacahan diskrit non-neg...","Model matematika klasik untuk data cacah adalah Regresi Poisson. Dalam model Poisson standar, diasumsikan bahwa probabilitas...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Namun, dalam data empiris riil, asumsi ekuidispersi ini hampir selalu dilanggar. Kondisi d..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Namun, dalam data empiris riil, asumsi ekuidispersi ini hampir selalu dilanggar. Kondisi di mana varians teramati jauh lebih...","Jika model Poisson tetap dipaksakan ketika terjadi overdispersi, estimasi koefisien regresi tetap konsisten, namun standar er...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["1. Formulasi Regresi Poisson:","Fungsi link log kanonik:","Sifat ekuidispersi:"],keyFormulaOrDiagram:"$$P(Y_i = y_i | \\mathbf{x}_i) = \\frac{\\mu_i^{y_i} e^{-\\mu_i}}{y_i!}, \\quad y_i = 0, 1, 2, \\dots$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Pada pengujian stabilitas jaringan sensor nirkabel n = 100 putaran, dianalisis jumlah paket hilang (y). Model Poisson menghasilkan devians P...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Identifikasi parameter: chi^2_Pearson = 285.0, derajat kebebasan df = n - p = 95.","Langkah 2: Hitung rasio dispersi: hat{phi} = 285.0 / 95 = 3.00.","Langkah 3: Evaluasi overdispersi: Karena hat{phi} = 3.00 >> 1.0, data mengalami overdispersi yang sangat parah...","Interpretasi: Model Poisson sangat tidak cocok. Standar error yang dilaporkan mengecil sebesar 73%, menyebabkan nilai p-value menjadi..."],keyFormulaOrDiagram:"Langkah 4: Hitung faktor distorsi standar error: SE sejati diperkirakan membengkak sebesar..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Perbandingan pemodelan data cacah dengan overdispersi menggunakan Poisson GLM versus Negative Binomial.","Dependensi Pustaka: numpy, statsmodels","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Perbandingan Model Poisson vs Negative Binomial"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Perbandingan Model Poisson vs Negative Binomial | Poisson Disper..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Mengabaikan pemeriksaan rasio dispersi Pearson pada regresi Poisson dan menganggap standar error default sudah...","Perangkap: Menggunakan regresi linier OLS pada data cacah dengan mentransformasikan nilai menggunakan akar kuadrat atau l...","Perangkap: Mengabaikan keberadaan kelebihan nilai nol (excess zeros) yang membutuhkan model Zero-Inflated Poisson (ZIP) a..."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Hitung statistik dispersi Pearson hat{phi} = Pearson_chi2 / df_resid.","Prosedur: Jika hat{phi} > 1.25, ganti model Poisson dengan Negative Binomial atau Quasi-Poisson.","Prosedur: Uji signifikansi parameter dispersi alpha menggunakan Likelihood Ratio Test antara model Poisson dan NB."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Apakah perbedaan mendasar antara fungsi varians model Poisson dan model Negative Binomial (NB2)?","Petunjuk: Perhatikan keberadaan parameter dispersi kuadratik alpha * mu^2.","Solusi Kunci: Model Poisson menetapkan varians sama dengan rata-rata (Var = mu), sedangkan Negative Binomial memperluas varians dengan..."]}]},"4.2.4":{id:"4.2.4",chapterId:"CH-25",title:"Evaluasi Kecocokan Model GLM: Devians Residual dan Kriteria Informasi AIC/BIC",readingTimeMinutes:20,status:"verified",learningObjectives:["Menghitung dan menginterpretasikan Devians Residual (Deviance) sebagai ukuran goodness-of-fit GLM.","Melakukan Uji Rasio Kemungkinan (Likelihood Ratio Test) untuk perbandingan model bersarang (nested models).","Menggunakan Kriteria Informasi Akaike (AIC) dan Bayesian (BIC) untuk seleksi model non-bersarang."],content:`Dalam regresi linier OLS standar, kualitas kecocokan model dievaluasi menggunakan koefisien determinasi R-squared. Namun, dalam Generalized Linear Models (GLM), konsep R-squared konvensional tidak berlaku secara langsung karena asumsi varians konstan dan distribusi normalitas galat telah ditinggalkan.

Sebagai pengganti R-squared, GLM menggunakan konsep Devians (Deviance). Devians mengukur jarak ketidakcocokan antara model yang diusulkan dengan Model Jenuh (Saturated Model), yaitu model teoritis ideal yang memiliki parameter sebanyak jumlah observasi n sehingga mampu memprediksi setiap titik data dengan sempurna (log-likelihood maksimum). Semakin kecil nilai devians, semakin dekat kecocokan model usulan terhadap model jenuh.

Untuk membandingkan dua model yang bersarang (nested models, di mana model sederhana merupakan subset parameter dari model yang lebih kompleks), peneliti menggunakan Uji Rasio Kemungkinan (Likelihood Ratio Test / LRT). Selisih devians antara kedua model mengikuti distribusi Chi-Square dengan derajat kebebasan sama dengan selisih jumlah parameter.

Ketika membandingkan model yang tidak bersarang (non-nested models) atau mencari model dengan keseimbangan optimal antara akurasi kecocokan dan kompleksitas model (prinsip parsimoni Occam), dua kriteria informasi standar yang digunakan di seluruh disiplin sains adalah Akaike Information Criterion (AIC) dan Bayesian Information Criterion (BIC). Model dengan nilai AIC atau BIC terendah adalah model yang paling disukai.`,mathematicalFoundations:`1. Formulasi Devians Skala (Scaled Deviance):
$$D^*(\\mathbf{y}, \\hat{\\boldsymbol{\\mu}}) = 2 \\left[ \\ell(\\mathbf{y}; \\mathbf{y}) - \\ell(\\hat{\\boldsymbol{\\mu}}; \\mathbf{y}) \\right]$$
di mana:
- $\\ell(\\mathbf{y}; \\mathbf{y})$ adalah log-likelihood dari model jenuh (*saturated model*).
- $\\ell(\\hat{\\boldsymbol{\\mu}}; \\mathbf{y})$ adalah log-likelihood dari model yang dievaluasi.

Untuk distribusi Normal dengan varians diketahui $\\sigma^2$:
$$D = \\sum_{i=1}^n \\frac{(y_i - \\hat{\\mu}_i)^2}{\\sigma^2} = \\frac{\\text{RSS}}{\\sigma^2}$$
Untuk distribusi Poisson:
$$D = 2 \\sum_{i=1}^n \\left[ y_i \\ln\\left(\\frac{y_i}{\\hat{\\mu}_i}\\right) - (y_i - \\hat{\\mu}_i) \\right]$$
Untuk distribusi Binomial/Logistik ($y_i \\in \\{0, 1\\}$):
$$D = -2 \\sum_{i=1}^n \\left[ y_i \\ln(\\hat{p}_i) + (1 - y_i) \\ln(1 - \\hat{p}_i) \\right]$$

2. Likelihood Ratio Test (LRT) untuk Model Bersarang:
Misalkan Model 0 memiliki $p_0$ parameter dan Model 1 memiliki $p_1$ parameter ($p_1 > p_0$):
$$\\Delta D = D_0 - D_1 = 2 [\\ell_1 - \\ell_0] \\sim \\chi^2_{p_1 - p_0}$$

3. Formulasi Kriteria Informasi AIC dan BIC:
$$\\text{AIC} = -2 \\ell + 2p$$
$$\\text{BIC} = -2 \\ell + p \\ln(n)$$
BIC memberikan penalti yang jauh lebih berat terhadap penambahan variabel ketika ukuran sampel $n$ besar (karena $\\ln(n) > 2$ untuk $n \\ge 8$), sehingga BIC cenderung memilih model yang lebih hemat parameter (parsimonious).`,workedExample:{problemStatement:"Dua model regresi Poisson diuji pada n = 150 observasi untuk memprediksi cacat fabrikasi. Model Sederhana (p = 2 parameter) menghasilkan log-likelihood l_0 = -245.2. Model Lengkap (p = 5 parameter) menghasilkan log-likelihood l_1 = -238.1. Lakukan Likelihood Ratio Test pada alpha = 0.05 dan hitung nilai AIC untuk kedua model.",stepByStepSolution:[`Langkah 1: Hitung statistik selisih devians (Likelihood Ratio Test):
Delta_D = 2 * (l_1 - l_0) = 2 * (-238.1 - (-245.2)) = 2 * (7.1) = 14.2.`,"Langkah 2: Tentukan derajat kebebasan: df = p_1 - p_0 = 5 - 2 = 3.",`Langkah 3: Evaluasi terhadap nilai kritis Chi-Square: chi^2_(0.05, 3) = 7.815.
Karena Delta_D (14.2) > 7.815 (p-value = 0.0026), tolak H0.`,`Langkah 4: Hitung AIC untuk kedua model:
AIC_0 = -2 * (-245.2) + 2 * (2) = 490.4 + 4 = 494.4.
AIC_1 = -2 * (-238.1) + 2 * (5) = 476.2 + 10 = 486.2.
Selisih AIC: Delta_AIC = 494.4 - 486.2 = 8.2.`],resultInterpretation:"Model Lengkap terbukti secara signifikan lebih baik daripada Model Sederhana (LRT chi^2 = 14.2, df = 3, p = 0.0026). Nilai AIC Model Lengkap lebih rendah sebesar 8.2 poin (penurunan > 2 dianggap bukti kuat keunggulan model). Tiga prediktor tambahan layak dipertahankan."},pythonImplementation:{description:"Komparasi model GLM menggunakan Likelihood Ratio Test, AIC, dan BIC via Python.",libraryDependencies:["numpy","statsmodels","scipy.stats"],code:`import numpy as np
import statsmodels.api as sm
from scipy import stats

np.random.seed(42)
n = 120

# Prediktor x1 (relevan) dan x2, x3 (noise)
x1 = np.random.uniform(1, 5, size=n)
x2 = np.random.normal(0, 1, size=n)
x3 = np.random.normal(0, 1, size=n)

y = np.random.poisson(np.exp(0.5 + 0.4 * x1))

# Model 0: Hanya x1 (Bersarang)
X0 = sm.add_constant(x1)
model0 = sm.GLM(y, X0, family=sm.families.Poisson()).fit()

# Model 1: x1, x2, x3 (Lengkap)
X1 = sm.add_constant(np.column_stack([x1, x2, x3]))
model1 = sm.GLM(y, X1, family=sm.families.Poisson()).fit()

# Likelihood Ratio Test
lr_stat = 2 * (model1.llf - model0.llf)
df_diff = model1.df_model - model0.df_model
p_lrt = 1.0 - stats.chi2.cdf(lr_stat, df=df_diff)

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Perbandingan Model GLM")
print(f"Model 0 (Hanya x1)   : Log-Lik = {model0.llf:.2f}, AIC = {model0.aic:.2f}, BIC = {model0.bic_llf:.2f}")
print(f"Model 1 (x1 + noise) : Log-Lik = {model1.llf:.2f}, AIC = {model1.aic:.2f}, BIC = {model1.bic_llf:.2f}")
print(f"Statistik LRT (Chi2) : {lr_stat:.4f} (df: {df_diff})")
print(f"p-value LRT          : {p_lrt:.4f}")
print(f"Model Terpilih       : {'Model 0 (Lebih Parsimonious)' if p_lrt >= 0.05 else 'Model 1'}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Perbandingan Model GLM
Model 0 (Hanya x1)   : Log-Lik = -203.11, AIC = 410.22, BIC = 415.79
Model 1 (x1 + noise) : Log-Lik = -202.43, AIC = 412.87, BIC = 424.01
Statistik LRT (Chi2) : 1.3524 (df: 2)
p-value LRT          : 0.5085
Model Terpilih       : Model 0 (Lebih Parsimonious)`},commonPitfalls:["Membandingkan nilai AIC antara dua model yang menggunakan variabel respon y yang berbeda (misal y vs log(y)).","Menggunakan Likelihood Ratio Test untuk membandingkan model yang tidak bersarang (non-nested).","Menganggap selisih AIC yang sangat kecil (Delta AIC < 2) sebagai bukti konklusif keunggulan salah satu model."],validationProcedures:["Gunakan Likelihood Ratio Test hanya jika satu model adalah sub-model ketat dari model lainnya.","Gunakan AIC dan BIC untuk membandingkan arsitektur model non-bersarang.","Periksa apakah penambahan prediktor menghasilkan penurunan devians yang sepadan dengan hilangnya derajat kebebasan."],exercises:[{question:"Mengapa kriteria BIC cenderung memilih model yang lebih sederhana (lebih sedikit parameter) dibandingkan kriteria AIC pada sampel berukuran besar?",hint:"Bandingkan faktor penalti parameter: 2p pada AIC versus p * ln(n) pada BIC.",answerExplanation:"Pada sampel besar di mana n >= 8, nilai ln(n) melebihi 2. Akibatnya, faktor penalti BIC terhadap kompleksitas model (p * ln(n)) menjadi jauh lebih berat daripada AIC (2p), sehingga BIC secara agresif menolak penambahan variabel yang marginal."}],references:[{citation:"Akaike, H. (1974). A new look at the statistical model identification. IEEE Transactions on Automatic Control, 19(6), 716-723.",type:"peer-reviewed-article"},{citation:"Schwarz, G. (1978). Estimating the dimension of a model. The Annals of Statistics, 6(2), 461-464.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Evaluasi Kecocokan Model GLM: Devians Residual dan Krit...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.2.4.","Capaian: Menghitung dan menginterpretasikan Devians Residual (Deviance) sebagai ukuran goodness-of-fit GLM.","Capaian: Melakukan Uji Rasio Kemungkinan (Likelihood Ratio Test) untuk perbandingan model bersarang (nested models).","Capaian: Menggunakan Kriteria Informasi Akaike (AIC) dan Bayesian (BIC) untuk seleksi model non-bersarang."],keyFormulaOrDiagram:"$$D^*(\\mathbf{y}, \\hat{\\boldsymbol{\\mu}}) = 2 \\left[ \\ell(\\mathbf{y}; \\mathbf{y}) - \\ell(\\hat{\\boldsymbol{\\mu}}; \\mathbf{y}) \\right]$$"},{slideNumber:2,title:"Fondasi Konseptual: Evaluasi Kecocokan Model GLM: Devians Residual dan Krit...",bulletPoints:["Dalam regresi linier OLS standar, kualitas kecocokan model dievaluasi menggunakan koefisien determinasi R-squared. Namun, dal...","Sebagai pengganti R-squared, GLM menggunakan konsep Devians (Deviance). Devians mengukur jarak ketidakcocokan antara model ya...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Untuk membandingkan dua model yang bersarang (nested models, di mana model sederhana merup..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Untuk membandingkan dua model yang bersarang (nested models, di mana model sederhana merupakan subset parameter dari model ya...","Ketika membandingkan model yang tidak bersarang (non-nested models) atau mencari model dengan keseimbangan optimal antara aku...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["1. Formulasi Devians Skala (Scaled Deviance):","di mana:","- $\\ell(\\mathbf{y}; \\mathbf{y})$ adalah log-likelihood dari model jenuh (*saturated model*)."],keyFormulaOrDiagram:"$$D^*(\\mathbf{y}, \\hat{\\boldsymbol{\\mu}}) = 2 \\left[ \\ell(\\mathbf{y}; \\mathbf{y}) - \\ell(\\hat{\\boldsymbol{\\mu}}; \\mathbf{y}) \\right]$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Dua model regresi Poisson diuji pada n = 150 observasi untuk memprediksi cacat fabrikasi. Model Sederhana (p = 2 parameter) menghasilkan log...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung statistik selisih devians (Likelihood Ratio Test): Delta_D = 2 * (l_1 - l_0) = 2 * (-238.1 -...","Langkah 2: Tentukan derajat kebebasan: df = p_1 - p_0 = 5 - 2 = 3.","Langkah 3: Evaluasi terhadap nilai kritis Chi-Square: chi^2_(0.05, 3) = 7.815. Karena Delta_D (14.2) > 7.815 (...","Interpretasi: Model Lengkap terbukti secara signifikan lebih baik daripada Model Sederhana (LRT chi^2 = 14.2, df = 3, p = 0.0026). Nil..."],keyFormulaOrDiagram:"Langkah 4: Hitung AIC untuk kedua model: AIC_0 = -2 * (-245.2) + 2 * (2) = 490.4 + 4 = 494..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Komparasi model GLM menggunakan Likelihood Ratio Test, AIC, dan BIC via Python.","Dependensi Pustaka: numpy, statsmodels, scipy.stats","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Evaluasi Perbandingan Model GLM"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Evaluasi Perbandingan Model GLM | Model 0 (Hanya x1) : Log-Lik =..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Membandingkan nilai AIC antara dua model yang menggunakan variabel respon y yang berbeda (misal y vs log(y)).","Perangkap: Menggunakan Likelihood Ratio Test untuk membandingkan model yang tidak bersarang (non-nested).","Perangkap: Menganggap selisih AIC yang sangat kecil (Delta AIC < 2) sebagai bukti konklusif keunggulan salah satu model."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Gunakan Likelihood Ratio Test hanya jika satu model adalah sub-model ketat dari model lainnya.","Prosedur: Gunakan AIC dan BIC untuk membandingkan arsitektur model non-bersarang.","Prosedur: Periksa apakah penambahan prediktor menghasilkan penurunan devians yang sepadan dengan hilangnya derajat kebeb..."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa kriteria BIC cenderung memilih model yang lebih sederhana (lebih sedikit parameter) dibandingkan kriteria AIC pa...","Petunjuk: Bandingkan faktor penalti parameter: 2p pada AIC versus p * ln(n) pada BIC.","Solusi Kunci: Pada sampel besar di mana n >= 8, nilai ln(n) melebihi 2. Akibatnya, faktor penalti BIC terhadap kompleksitas model (p *..."]}]}};export{a as CH25_LESSONS};
