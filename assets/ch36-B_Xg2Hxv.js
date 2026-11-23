const a={"5.5.1":{id:"5.5.1",chapterId:"CH-36",title:"Konsep Pergeseran Domain: Covariate Shift, Label Shift, dan Concept Drift",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami dekomposisi probabilitas bersama P(X, Y) dalam membedakan jenis pergeseran domain.","Membedakan secara formal antara Covariate Shift, Label Shift, dan Concept Drift.","Mendeteksi pergeseran domain pada data sensorik dan visi komputer menggunakan uji divergensi probabilitas."],content:`Sebagian besar algoritma pembelajaran mesin dan inferensi statistik didirikan di atas asumsi i.i.d. (independent and identically distributed): data latih dan data uji masa depan diasumsikan dibangkitkan dari distribusi probabilitas bersama yang identik, yaitu $P_{\\text{train}}(X, Y) = P_{\\text{test}}(X, Y)$. Dalam dunia rekayasa nyata, asumsi ini hampir selalu dilanggar. Kondisi cuaca berubah, sensor mengalami degradasi penuaan fisik, populasi pengguna berevolusi, dan lingkungan manufaktur bergeser.

Taksonomi Matematis Pergeseran Distribusi (Distribution Shifts):
Berdasarkan aturan rantai probabilitas bersama $P(X, Y) = P(X) P(Y|X) = P(Y) P(X|Y)$, pergeseran distribusi diklasifikasikan menjadi tiga bentuk fundamental:

1. Pergeseran Kovariat (Covariate Shift):
Distribusi fitur input berubah antara tahap latihan dan tahap operasional, namun mekanisme pemetaan fisik dasar dari fitur ke label tetap konstan.
$$P_{\\text{train}}(X) \\neq P_{\\text{test}}(X) \\quad \\text{tetapi} \\quad P_{\\text{train}}(Y|X) = P_{\\text{test}}(Y|X)$$
Contoh: Kamera deteksi cacat dilatih pada pencahayaan laboratorium 500 lux, namun dioperasikan di lantai pabrik pada pencahayaan 200 lux. Hubungan visual antara goresan dan label cacat tetap sama, namun sebaran piksel input bergeser ke rentang yang lebih gelap.

2. Pergeseran Label (Label Shift / Prior Shift):
Distribusi marginal dari target $Y$ bergeser, namun mekanisme pembangkitan fitur bersyarat $P(X|Y)$ tetap konstan.
$$P_{\\text{train}}(Y) \\neq P_{\\text{test}}(Y) \\quad \\text{tetapi} \\quad P_{\\text{train}}(X|Y) = P_{\\text{test}}(X|Y)$$
Contoh: Model diagnosis medis dilatih selama musim non-epidemi (prevalensi penyakit 1%), namun diuji saat puncak pandemi (prevalensi melonjak menjadi 30%). Gejala radiologis penyakit ($X|Y$) tidak berubah, namun proporsi kasus sakit meroket.

3. Pergeseran Konsep (Concept Drift):
Hubungan intrinsik antara input dan output berubah secara mendasar.
$$P_{\\text{train}}(Y|X) \\neq P_{\\text{test}}(Y|X)$$
Contoh: Akibat keausan mekanis mesin turbin setelah 5 tahun beroperasi, profil getaran tertentu yang pada mesin baru dikategorikan normal, kini menandakan kegagalan struktural fatal.`,mathematicalFoundations:`Metrik Divergensi Pergeseran Distribusi:
Untuk mengukur secara kuantitatif besaran pergeseran antara distribusi $P$ dan $Q$:

1. Kullback-Leibler (KL) Divergence:
$$D_{\\text{KL}}(P \\parallel Q) = \\int_{\\mathcal{X}} p(x) \\log \\left( \\frac{p(x)}{q(x)} \\right) \\, dx$$

2. Maximum Mean Discrepancy (MMD) dalam Ruang Hilbert (RKHS):
Bebas asumsi kepadatan parametrik, menggunakan fungsi kernel $k(\\cdot, \\cdot)$:
$$\\text{MMD}^2(\\mathcal{F}, P, Q) = \\mathbb{E}_{x, x' \\sim P}[k(x, x')] - 2\\mathbb{E}_{x \\sim P, y \\sim Q}[k(x, y)] + \\mathbb{E}_{y, y' \\sim Q}[k(y, y')]$$

3. Wasserstein Distance (Earth Mover's Distance):
Mengukur jarak optimal transport yang mencerminkan geometri metrik ruang fitur:
$$W_1(P, Q) = \\inf_{\\gamma \\in \\Pi(P, Q)} \\mathbb{E}_{(x, y) \\sim \\gamma}[\\|x - y\\|]$$`,workedExample:{problemStatement:"Dua sensor getaran mencatat data pada dua hari yang berbeda. Hari 1 (Data Latih) berdistribusi N(0, 1). Hari 2 (Data Operasional) berdistribusi N(1, 1). Hitung nilai KL Divergence D_KL(P_train || P_test). Jika fungsi target f(x) = sign(x), tunjukkan apakah ini merupakan Covariate Shift murni atau Concept Drift.",stepByStepSolution:["Langkah 1: Gunakan formula analitis KL Divergence untuk dua distribusi Gaussian univariat N(mu_1, sigma_1^2) dan N(mu_2, sigma_2^2): D_KL = log(sigma_2/sigma_1) + (sigma_1^2 + (mu_1 - mu_2)^2) / (2 * sigma_2^2) - 0.5.","Langkah 2: Substitusi nilai: mu_1 = 0, mu_2 = 1, sigma_1 = 1, sigma_2 = 1.","Langkah 3: Hitung D_KL: D_KL = log(1) + (1 + (0 - 1)^2) / (2 * 1) - 0.5 = 0 + (1 + 1)/2 - 0.5 = 1.0 - 0.5 = 0.50 nats.","Langkah 4: Analisis jenis pergeseran: Hubungan target f(x) = sign(x) tidak berubah (setiap nilai x > 0 tetap diberi label +1). Hanya distribusi marginal input P(X) yang bergeser dari mu=0 ke mu=1."],resultInterpretation:"Terjadi Covariate Shift murni dengan besaran divergensi KL sebesar 0.50 nats tanpa adanya Concept Drift."},pythonImplementation:{description:"Deteksi pergeseran kovariat menggunakan uji Maximum Mean Discrepancy (MMD) dengan kernel RBF.",libraryDependencies:["numpy","sklearn.metrics.pairwise"],code:`import numpy as np
from sklearn.metrics.pairwise import rbf_kernel

# [SIMULASI/SYNTHETIC DATA]
np.random.seed(42)
n_samples = 200

# Distribusi Latih (In-Distribution): N(0, 1)
X_train = np.random.normal(loc=0.0, scale=1.0, size=(n_samples, 2))

# Distribusi Uji 1: Tanpa Pergeseran (In-Distribution baru)
X_test_clean = np.random.normal(loc=0.0, scale=1.0, size=(n_samples, 2))

# Distribusi Uji 2: Mengalami Covariate Shift (Pergeseran Mean dan Skala)
X_test_shifted = np.random.normal(loc=1.2, scale=1.5, size=(n_samples, 2))

def compute_mmd(X, Y, gamma=0.5):
    K_XX = rbf_kernel(X, X, gamma=gamma)
    K_YY = rbf_kernel(Y, Y, gamma=gamma)
    K_XY = rbf_kernel(X, Y, gamma=gamma)
    return np.mean(K_XX) + np.mean(K_YY) - 2 * np.mean(K_XY)

mmd_clean = compute_mmd(X_train, X_test_clean)
mmd_shifted = compute_mmd(X_train, X_test_shifted)

print("[SIMULASI/SYNTHETIC DATA] Deteksi Pergeseran Distribusi (MMD Metric):")
print(f"MMD Antara Train vs Test Bersih     : {mmd_clean:.4f} (Mendekati 0: Distribusi Identik)")
print(f"MMD Antara Train vs Test Tergeser   : {mmd_shifted:.4f} (Tinggi: Terjadi Pergeseran Domain!)")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Deteksi Pergeseran Distribusi (MMD Metric):
MMD Antara Train vs Test Bersih     : 0.0039 (Mendekati 0: Distribusi Identik)
MMD Antara Train vs Test Tergeser   : 0.3644 (Tinggi: Terjadi Pergeseran Domain!)`},commonPitfalls:["Menyimpulkan model siap dideploy hanya berdasarkan pengujian pada data uji yang dibelah dari sesi rekaman yang sama.","Menyamakan penanganan covariate shift (teknik reweighting P_test/P_train) dengan concept drift (memerlukan continual learning).","Mengabaikan efek pergeseran musiman atau perubahan suhu ambien pada sensor rekayasa."],validationProcedures:["Hitung metrik MMD atau Wasserstein distance antara data train dan data uji produksi berkala.","Terapkan pengujian Kolmogorov-Smirnov atau Chi-Square untuk setiap fitur secara univariat.","Pantau performa model secara real-time dengan melacak metrik prediksi vs ground truth sampel audit berkala."],exercises:[{question:"Teknik apa yang dapat digunakan untuk mengkompensasi Covariate Shift jika distribusi data uji P_test(X) diketahui namun tanpa label?",hint:"Kaitkan dengan rasio kepadatan probabilitas (importance weighting).",answerExplanation:"Teknik Importance Weighting (Densiy Ratio Estimation) dapat digunakan, di mana setiap sampel latih x_i diberi bobot w(x_i) = P_test(x_i) / P_train(x_i) saat menghitung fungsi loss sehingga model memprioritaskan area yang sering muncul di data uji."},{question:"Mengapa Concept Drift merupakan pergeseran yang paling berbahaya dibandingkan Covariate Shift?",hint:"Perhatikan apakah pengetahuan yang telah dipelajari model masa lalu masih valid.",answerExplanation:"Pada Concept Drift, aturan pemetaan fisis P(Y|X) telah berubah. Informasi masa lalu yang dipelajari model bukan lagi sekadar tidak lengkap, melainkan telah menjadi salah secara fundamental. Model aktif membuat keputusan salah dengan tingkat keyakinan (confidence) yang tinggi."}],references:[{citation:"Quionero-Candela, J., Sugiyama, M., Schwaighofer, A., & Shen, H. S. (2009). Dataset Shift in Machine Learning. The MIT Press.",type:"canonical-textbook"},{citation:"Gama, J., Žliobaitė, I., Bifet, A., Pechenizkiy, M., & Bouchachia, A. (2014). A survey on concept drift adaptation. ACM Computing Surveys (CSUR), 46(4), 1-37.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Konsep Pergeseran Domain: Covariate Shift, Label Shift,...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 5.5.1.","Capaian: Memahami dekomposisi probabilitas bersama P(X, Y) dalam membedakan jenis pergeseran domain.","Capaian: Membedakan secara formal antara Covariate Shift, Label Shift, dan Concept Drift.","Capaian: Mendeteksi pergeseran domain pada data sensorik dan visi komputer menggunakan uji divergensi probabilitas."],keyFormulaOrDiagram:"$$D_{\\text{KL}}(P \\parallel Q) = \\int_{\\mathcal{X}} p(x) \\log \\left( \\frac{p(x)}{q(x)} \\right) \\, dx$$"},{slideNumber:2,title:"Fondasi Konseptual: Konsep Pergeseran Domain: Covariate Shift, Label Shift,...",bulletPoints:["Sebagian besar algoritma pembelajaran mesin dan inferensi statistik didirikan di atas asumsi i.i.d. (independent and identica...","Taksonomi Matematis Pergeseran Distribusi (Distribution Shifts): Berdasarkan aturan rantai probabilitas bersama $P(X, Y) = P(...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"1. Pergeseran Kovariat (Covariate Shift): Distribusi fitur input berubah antara tahap lati..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["1. Pergeseran Kovariat (Covariate Shift): Distribusi fitur input berubah antara tahap latihan dan tahap operasional, namun me...","2. Pergeseran Label (Label Shift / Prior Shift): Distribusi marginal dari target $Y$ bergeser, namun mekanisme pembangkitan f...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Metrik Divergensi Pergeseran Distribusi:","Untuk mengukur secara kuantitatif besaran pergeseran antara distribusi $P$ dan $Q$:","1. Kullback-Leibler (KL) Divergence:"],keyFormulaOrDiagram:"$$D_{\\text{KL}}(P \\parallel Q) = \\int_{\\mathcal{X}} p(x) \\log \\left( \\frac{p(x)}{q(x)} \\right) \\, dx$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Dua sensor getaran mencatat data pada dua hari yang berbeda. Hari 1 (Data Latih) berdistribusi N(0, 1). Hari 2 (Data Operasional) berdistrib...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Gunakan formula analitis KL Divergence untuk dua distribusi Gaussian univariat N(mu_1, sigma_1^2) d...","Langkah 2: Substitusi nilai: mu_1 = 0, mu_2 = 1, sigma_1 = 1, sigma_2 = 1.","Langkah 3: Hitung D_KL: D_KL = log(1) + (1 + (0 - 1)^2) / (2 * 1) - 0.5 = 0 + (1 + 1)/2 - 0.5 = 1.0 - 0.5 = 0....","Interpretasi: Terjadi Covariate Shift murni dengan besaran divergensi KL sebesar 0.50 nats tanpa adanya Concept Drift."],keyFormulaOrDiagram:"Langkah 4: Analisis jenis pergeseran: Hubungan target f(x) = sign(x) tidak berubah (setiap..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Deteksi pergeseran kovariat menggunakan uji Maximum Mean Discrepancy (MMD) dengan kernel RBF.","Dependensi Pustaka: numpy, sklearn.metrics.pairwise","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Deteksi Pergeseran Distribusi (MMD Metric):"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Deteksi Pergeseran Distribusi (MMD Metric): | MMD Antara Train v..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menyimpulkan model siap dideploy hanya berdasarkan pengujian pada data uji yang dibelah dari sesi rekaman yang...","Perangkap: Menyamakan penanganan covariate shift (teknik reweighting P_test/P_train) dengan concept drift (memerlukan con...","Perangkap: Mengabaikan efek pergeseran musiman atau perubahan suhu ambien pada sensor rekayasa."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Hitung metrik MMD atau Wasserstein distance antara data train dan data uji produksi berkala.","Prosedur: Terapkan pengujian Kolmogorov-Smirnov atau Chi-Square untuk setiap fitur secara univariat.","Prosedur: Pantau performa model secara real-time dengan melacak metrik prediksi vs ground truth sampel audit berkala."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Teknik apa yang dapat digunakan untuk mengkompensasi Covariate Shift jika distribusi data uji P_test(X) diketahui namun...","Petunjuk: Kaitkan dengan rasio kepadatan probabilitas (importance weighting).","Solusi Kunci: Teknik Importance Weighting (Densiy Ratio Estimation) dapat digunakan, di mana setiap sampel latih x_i diberi bobot w(x_..."]}]},"5.5.2":{id:"5.5.2",chapterId:"CH-36",title:"Pengujian Ketahanan (Stress Testing) Terhadap Noise, Blur, dan Gangguan Sinyal",readingTimeMinutes:20,status:"verified",learningObjectives:["Merancang protokol stress-testing komputasi untuk menguji ketahanan model rekayasa.","Mengukur kurva degradasi performa terhadap peningkatan intensitas gangguan fisik.","Mengadopsi benchmark standardisasi ketahanan seperti ImageNet-C atau Signal-C."],content:`Sebuah sistem penglihatan komputer atau pemrosesan sinyal rekayasa yang mencapai akurasi 98% di laboratorium bersih seringkali mengalami penurunan performa drastis ketika beroperasi di lapangan industri nyata. Lensa kamera tertutup debu, fokus optik sedikit kabur (defocus blur), kabel transmisi sensor terpapar derau elektromagnetik (Gaussian noise), atau kompresi video jaringan mengalami kehilangan paket data (packet loss).

Prinsip Stress Testing Komputasi:
Alih-alih hanya menguji model pada kondisi ideal, peneliti wajib melakukan pengujian stres (stress testing) sistematis dengan memasukkan gangguan fisik terkalibrasi secara bertingkat. Protokol ini diinspirasi oleh benchmark kanonikal Hendrycks & Dietterich (2019) yang memperkenalkan ImageNet-C.

Tiga Dimensi Gangguan Fisik Terkalibrasi:
1. Derau Aditif dan Multiplikatif (Noise Corruptions): Gaussian noise, Poisson noise, salt-and-pepper noise, dan speckle noise.
2. Distorsi Optik dan Sensorik (Blur Corruptions): Defocus blur, motion blur akibat getaran mesin, zoom blur, dan kabut atmosfer (fog).
3. Efek Digital dan Transmisi (Digital Corruptions): Kompresi JPEG artefak lossy, downsampling spasial, dan pergeseran kecerahan (brightness).`,mathematicalFoundations:`Formulasi Model Kerusakan Sinyal Terkalibrasi:
Misalkan $x \\in \\mathcal{X}$ adalah sinyal atau citra bersih, dan $s \\in \\{1, 2, 3, 4, 5\\}$ adalah tingkat keparahan gangguan (severity level):
$$x_{\\text{corrupt}} = \\mathcal{T}(x; s, \\theta_{\\text{type}})$$

1. Derau Gaussian Aditif:
$$x_{\\text{corrupt}} = x + \\eta, \\quad \\eta \\sim \\mathcal{N}(0, \\sigma^2(s)), \\quad \\sigma(s) = s \\times \\sigma_0$$

2. Derau Kabur Gerak (Motion Blur):
Operasi konvolusi dengan kernel linier berarah $k(s, \\theta)$:
$$x_{\\text{corrupt}} = x * k(s, \\theta)$$

Metrik Ketahanan Relatif (Relative Robustness / mCE):
Tingkat Kesalahan Kerusakan Rata-rata (mean Corruption Error, mCE):
$$\\text{mCE} = \\frac{1}{C} \\sum_{c=1}^C \\frac{\\sum_{s=1}^5 E_{s, c}^{\\text{model}}}{\\sum_{s=1}^5 E_{s, c}^{\\text{baseline}}}$$
di mana $E_{s, c}$ adalah tingkat kesalahan pada tipe kerusakan $c$ dengan keparahan $s$. Nilai $\\text{mCE} < 1.0$ membuktikan bahwa model lebih tahan terhadap gangguan lapangan dibandingkan arsitektur baseline.`,workedExample:{problemStatement:"Sebuah model inspeksi visual dievaluasi pada 5 tingkat keparahan derau Gaussian. Akurasi bersih adalah 95.0%. Akurasi pada level 1 s.d. 5 adalah: L1 = 92.0%, L2 = 88.0%, L3 = 80.0%, L4 = 65.0%, L5 = 40.0%. Baseline standar memiliki akurasi pada level 1 s.d. 5 berturut-turut: 90.0%, 82.0%, 70.0%, 50.0%, 25.0%. Hitung total laju kesalahan (Error Rate) pada seluruh tingkat keparahan untuk kedua model, dan hitung rasio Relative Corruption Error.",stepByStepSolution:["Langkah 1: Konversi akurasi ke error rate E = (100 - Akurasi): Model Usulan: E_1=8%, E_2=12%, E_3=20%, E_4=35%, E_5=60%. Total Error Usulan = 8 + 12 + 20 + 35 + 60 = 135%.","Langkah 2: Error rate Baseline: E_1=10%, E_2=18%, E_3=30%, E_4=50%, E_5=75%. Total Error Baseline = 10 + 18 + 30 + 50 + 75 = 183%.","Langkah 3: Hitung Relative Corruption Error: Rel_Error = Total Error Usulan / Total Error Baseline = 135 / 183 = 0.7377."],resultInterpretation:"Model yang diusulkan memiliki Relative Corruption Error sebesar 0.738 (26.2% lebih rendah dari baseline), membuktikan ketahanan fisik yang lebih superior di bawah gangguan derau."},pythonImplementation:{description:"Stress testing performa klasifikasi di bawah derau Gaussian aditif bertingkat.",libraryDependencies:["numpy","sklearn.metrics"],code:`import numpy as np
from sklearn.metrics import accuracy_score

# [SIMULASI/SYNTHETIC DATA]
np.random.seed(42)
n_test = 500
n_features = 10

# Bangkitkan data uji bersih dan label
X_clean = np.random.randn(n_test, n_features)
# Aturan keputusan linear sederhana
weights = np.random.randn(n_features)
y_true = (np.dot(X_clean, weights) > 0).astype(int)

# Definisikan dua model prediktor: Model Rapuh (Fragile) vs Model Kokoh (Robust)
def predict_fragile(X):
    # Model sangat sensitif terhadap perubahan margin kecil
    return (np.dot(X, weights) > 0).astype(int)

def predict_robust(X):
    # Model memiliki margin regularisasi yang lebih lebar
    reg_weights = weights * 0.8
    return (np.dot(X, reg_weights) > 0).astype(int)

# Uji pada 5 level keparahan noise (sigma bertingkat)
severities = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5]
results_fragile = []
results_robust = []

for s in severities:
    noise = np.random.normal(loc=0.0, scale=s, size=X_clean.shape)
    X_corrupt = X_clean + noise
    
    acc_f = accuracy_score(y_true, predict_fragile(X_corrupt))
    acc_r = accuracy_score(y_true, predict_robust(X_corrupt))
    results_fragile.append(acc_f)
    results_robust.append(acc_r)

print("[SIMULASI/SYNTHETIC DATA] Hasil Stress Testing Gangguan Derau:")
print(f"{'Severity (Sigma)':18} | {'Model Rapuh Acc':16} | {'Model Kokoh Acc':16}")
print("-" * 56)
for s, af, ar in zip(severities, results_fragile, results_robust):
    print(f"{s:<18.1f} | {af*100:<15.2f}% | {ar*100:<15.2f}%")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Stress Testing Gangguan Derau:
Severity (Sigma)   | Model Rapuh Acc  | Model Kokoh Acc 
--------------------------------------------------------
0.0                | 100.00         % | 100.00         %
0.5                | 92.40          % | 92.40          %
1.0                | 81.60          % | 81.60          %
1.5                | 74.40          % | 74.40          %
2.0                | 69.80          % | 69.80          %
2.5                | 65.60          % | 65.60          %`},commonPitfalls:["Hanya menguji model pada kondisi ideal dan mengabaikan evaluasi robustness.","Memasukkan tipe noise pengujian ke dalam data latih secara eksplisit (data contamination on stress test).","Mengasumsikan bahwa model yang memiliki akurasi bersih lebih tinggi otomatis lebih tahan terhadap gangguan."],validationProcedures:["Gunakan korpus gangguan terstandarisasi (misal ImageNet-C, CIFAR-10-C).","Plot kurva degradasi performa (Performance Decay Curve) sebagai fungsi dari intensitas gangguan.","Sertakan metrik mean Corruption Error (mCE) relatif terhadap model standar."],exercises:[{question:"Mengapa melatih model secara langsung dengan menyertakan seluruh variasi noise pengujian (misal melatih langsung dengan Gaussian noise sigma=2.0) membatalkan validitas pengujian ketahanan (robustness test)?",hint:"Perhatikan perbedaan antara out-of-distribution robustness dan in-distribution memorization.",answerExplanation:"Jika jenis derau pengujian disertakan dalam pelatihan, derau tersebut telah menjadi bagian dari distribusi latih (in-distribution). Pengujian tidak lagi menguji ketahanan model terhadap gangguan tak terduga (unforeseen corruptions), melainkan hanya menguji kemampuan menghafal pola derau yang sudah diajarkan."},{question:"Metrik apa yang digunakan oleh benchmark ImageNet-C untuk menstandarisasi tingkat kesulitan antar tipe gangguan yang berbeda fisisnya (misal fog vs blur vs salt-and-pepper)?",hint:"Kaitkan dengan baseline AlexNet dan perhitungan mean Corruption Error.",answerExplanation:"Benchmark ImageNet-C menggunakan tingkat kesalahan arsitektur baseline kanonikal (AlexNet) pada setiap level keparahan untuk menormalisasi skor error. Tingkat keparahan 1 hingga 5 dikalibrasi secara perseptual dan matematis sehingga laju penurunan performa baseline seimbang di seluruh jenis gangguan."}],references:[{citation:"Hendrycks, D., & Dietterich, T. (2019). Benchmarking neural network robustness to common corruptions and perturbations. ICLR.",type:"peer-reviewed-article"},{citation:"Geirhos, R., Temme, C. R., Rauber, J., Schütt, H. H., Bethge, M., & Wichmann, F. A. (2018). Generalisation in humans and deep neural networks. NeurIPS, 31.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Pengujian Ketahanan (Stress Testing) Terhadap Noise, Bl...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 5.5.2.","Capaian: Merancang protokol stress-testing komputasi untuk menguji ketahanan model rekayasa.","Capaian: Mengukur kurva degradasi performa terhadap peningkatan intensitas gangguan fisik.","Capaian: Mengadopsi benchmark standardisasi ketahanan seperti ImageNet-C atau Signal-C."],keyFormulaOrDiagram:"$$x_{\\text{corrupt}} = \\mathcal{T}(x; s, \\theta_{\\text{type}})$$"},{slideNumber:2,title:"Fondasi Konseptual: Pengujian Ketahanan (Stress Testing) Terhadap Noise, Bl...",bulletPoints:["Sebuah sistem penglihatan komputer atau pemrosesan sinyal rekayasa yang mencapai akurasi 98% di laboratorium bersih seringkal...","Prinsip Stress Testing Komputasi: Alih-alih hanya menguji model pada kondisi ideal, peneliti wajib melakukan pengujian stres...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Tiga Dimensi Gangguan Fisik Terkalibrasi: 1. Derau Aditif dan Multiplikatif (Noise Corrupt..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Tiga Dimensi Gangguan Fisik Terkalibrasi: 1. Derau Aditif dan Multiplikatif (Noise Corruptions): Gaussian noise, Poisson nois...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Formulasi Model Kerusakan Sinyal Terkalibrasi:","Misalkan $x \\in \\mathcal{X}$ adalah sinyal atau citra bersih, dan $s \\in \\{1, 2, 3, 4, 5\\}$ adalah tingkat kep...","1. Derau Gaussian Aditif:"],keyFormulaOrDiagram:"$$x_{\\text{corrupt}} = \\mathcal{T}(x; s, \\theta_{\\text{type}})$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Sebuah model inspeksi visual dievaluasi pada 5 tingkat keparahan derau Gaussian. Akurasi bersih adalah 95.0%. Akurasi pada level 1 s.d. 5 ad...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Konversi akurasi ke error rate E = (100 - Akurasi): Model Usulan: E_1=8%, E_2=12%, E_3=20%, E_4=35%...","Langkah 2: Error rate Baseline: E_1=10%, E_2=18%, E_3=30%, E_4=50%, E_5=75%. Total Error Baseline = 10 + 18 +...","Langkah 3: Hitung Relative Corruption Error: Rel_Error = Total Error Usulan / Total Error Baseline = 135 / 183...","Interpretasi: Model yang diusulkan memiliki Relative Corruption Error sebesar 0.738 (26.2% lebih rendah dari baseline), membuktikan ke..."],keyFormulaOrDiagram:"Langkah 3: Hitung Relative Corruption Error: Rel_Error = Total Error Usulan / Total Error..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Stress testing performa klasifikasi di bawah derau Gaussian aditif bertingkat.","Dependensi Pustaka: numpy, sklearn.metrics","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil Stress Testing Gangguan Derau:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Hasil Stress Testing Gangguan Derau: | Severity (Sigma) | Model..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Hanya menguji model pada kondisi ideal dan mengabaikan evaluasi robustness.","Perangkap: Memasukkan tipe noise pengujian ke dalam data latih secara eksplisit (data contamination on stress test).","Perangkap: Mengasumsikan bahwa model yang memiliki akurasi bersih lebih tinggi otomatis lebih tahan terhadap gangguan."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Gunakan korpus gangguan terstandarisasi (misal ImageNet-C, CIFAR-10-C).","Prosedur: Plot kurva degradasi performa (Performance Decay Curve) sebagai fungsi dari intensitas gangguan.","Prosedur: Sertakan metrik mean Corruption Error (mCE) relatif terhadap model standar."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa melatih model secara langsung dengan menyertakan seluruh variasi noise pengujian (misal melatih langsung dengan...","Petunjuk: Perhatikan perbedaan antara out-of-distribution robustness dan in-distribution memorization.","Solusi Kunci: Jika jenis derau pengujian disertakan dalam pelatihan, derau tersebut telah menjadi bagian dari distribusi latih (in-dis..."]}]},"5.5.3":{id:"5.5.3",chapterId:"CH-36",title:"Evaluasi Out-of-Distribution (OOD) untuk Menilai Batas Keabsahan Algoritma",readingTimeMinutes:20,status:"verified",learningObjectives:["Membedakan In-Distribution (ID), Near-OOD, dan Far-OOD dalam evaluasi model prediktif.","Memahami fenomena overconfidence pada jaringan syaraf tiruan saat menerima input anomali.","Menerapkan deteksi OOD berbasis skor ketidakpastian (Energy score, Mahalanobis distance, Maximum Softmax Probability)."],content:`Sebuah kelemahan berbahaya dari model deep learning modern adalah sifat overconfident: model cenderung memprediksi kelas tertentu dengan probabilitas 99.9% bahkan ketika diberikan input yang sepenuhnya aneh, rusak, atau berasal dari domain yang sama sekali belum pernah dipelajari (Out-of-Distribution / OOD data). Sebagai contoh, model klasifikasi citra medis yang dilatih untuk mendiagnosis pneumonia pada paru-paru manusia mungkin memprediksi citra sinar-X seekor anjing sebagai "Pneumonia Akut" dengan keyakinan 99%.

Taksonomi Spektrum OOD:
1. In-Distribution (ID): Sampel yang berasal dari distribusi data latih yang sama persis (misal pasien dari rumah sakit yang sama dengan protokol pencitraan identik).
2. Near-OOD (Semantik Bergeser Halus): Sampel yang berasal dari kelas yang belum pernah dilihat dalam pelatihan namun memiliki fitur visual yang mirip (misal model dilatih pada kucing vs anjing, lalu diuji pada rubah).
3. Far-OOD (Anomali Total): Sampel yang berasal dari domain fisik yang sama sekali asing (misal model teks medis menerima input kode biner perangkat lunak).

Prinsip Deteksi OOD:
Sistem rekayasa yang bertanggung jawab wajib memiliki mekanisme penolakan (abstention / reject option). Jika sebuah input terdeteksi sebagai OOD, sistem tidak boleh memaksakan prediksi, melainkan harus mengembalikan sinyal "Ketidakpastian Tinggi / Memerlukan Intervensi Manusia".`,mathematicalFoundations:`Metode Estimasi Skor OOD:

1. Maximum Softmax Probability (MSP Baseline, Hendrycks & Gimpel, 2017):
Diberikan vektor logit $f(x) \\in \\mathbb{R}^C$:
$$p_c(x) = \\frac{e^{f_c(x)}}{\\sum_{j=1}^C e^{f_j(x)}}$$
$$S_{\\text{MSP}}(x) = \\max_{c \\in \\{1, \\dots, C\\}} p_c(x)$$
Kelemahan: Softmax memaksakan total probabilitas bernilai 1, memicu probabilitas semu yang tinggi akibat pembagian eksponensial.

2. Skor Energi Bebas (Energy-Based OOD, Liu et al., 2020):
Menghubungkan logit dengan konsep termodinamika Helmholtz Free Energy:
$$E(x; f) = -T \\cdot \\log \\sum_{c=1}^C e^{f_c(x) / T}$$
Skor deteksi OOD: $S_{\\text{Energy}}(x) = -E(x; f)$.
Skor energi tidak dinormalisasi oleh pembagi softmax, sehingga berkorelasi langsung dengan log kepadatan probabilitas marginal input $\\log p(x)$.

3. Metrik Evaluasi Deteksi OOD:
- AUROC (Area Under the ROC Curve): Probabilitas bahwa sampel ID memiliki skor ketidakanomalian lebih tinggi dari sampel OOD.
- FPR95 (False Positive Rate at 95% True Positive Rate): Persentase data OOD yang salah lolos saat 95% data ID berhasil diterima.`,workedExample:{problemStatement:"Dua logit keluaran untuk kelas [A, B] adalah: Sampel 1 (ID) = [10.0, 2.0]; Sampel 2 (OOD) = [-5.0, -8.0]. Hitung probabilitas Softmax untuk kedua sampel (T=1.0). Jelaskan mengapa skor Softmax gagal mendeteksi bahwa Sampel 2 adalah anomali, sedangkan Skor Energi berhasil mendeteksinya.",stepByStepSolution:["Langkah 1: Hitung Softmax Sampel 1: p_A = e^10 / (e^10 + e^2) = 22026.5 / (22026.5 + 7.39) = 0.9997 (99.97%).","Langkah 2: Hitung Softmax Sampel 2: p_A = e^-5 / (e^-5 + e^-8) = 0.00674 / (0.00674 + 0.000335) = 0.00674 / 0.007075 = 0.9526 (95.26%).","Langkah 3: Evaluasi kelemahan Softmax: Sampel 2 memiliki magnitudo logit sangat negatif (artinya model tidak mengenali fitur apa pun), namun probabilitas softmax-nya tetap mencapai 95.3% (overconfident palsu).","Langkah 4: Hitung Skor Energi E = -log(sum(e^logit)): E(Sampel 1) = -log(e^10 + e^2) = -log(22033.9) = -10.00; E(Sampel 2) = -log(e^-5 + e^-8) = -log(0.007075) = +4.95."],resultInterpretation:"Skor Energi Sampel 2 (+4.95) sangat jauh lebih tinggi dibandingkan Sampel 1 (-10.00), secara instan mengidentifikasi Sampel 2 sebagai Out-of-Distribution yang berbahaya."},pythonImplementation:{description:"Komparasi deteksi OOD antara Maximum Softmax Probability (MSP) vs Energy-based Detection.",libraryDependencies:["numpy","sklearn.metrics"],code:`import numpy as np
from sklearn.metrics import roc_auc_score

# [SIMULASI/SYNTHETIC DATA]
np.random.seed(42)
n_samples = 300
n_classes = 3

# Logit data In-Distribution (ID): magnitudo tinggi pada salah satu kelas
logits_id = np.random.normal(loc=0.0, scale=1.0, size=(n_samples, n_classes))
logits_id[:, 0] += 6.0  # Kelas 0 dominan kuat

# Logit data Out-of-Distribution (OOD): magnitudo rendah merata di semua kelas
logits_ood = np.random.normal(loc=-4.0, scale=0.8, size=(n_samples, n_classes))

def msp_scores(logits):
    exp_l = np.exp(logits - np.max(logits, axis=1, keepdims=True))
    probs = exp_l / np.sum(exp_l, axis=1, keepdims=True)
    return np.max(probs, axis=1)

def energy_scores(logits, T=1.0):
    # Skor energi negatif (semakin tinggi semakin ID)
    return T * np.log(np.sum(np.exp(logits / T), axis=1))

# Hitung skor untuk ID dan OOD
msp_id = msp_scores(logits_id)
msp_ood = msp_scores(logits_ood)

energy_id = energy_scores(logits_id)
energy_ood = energy_scores(logits_ood)

# Ground truth: 1 untuk ID, 0 untuk OOD
y_eval = np.array([1]*n_samples + [0]*n_samples)
all_msp = np.concatenate([msp_id, msp_ood])
all_energy = np.concatenate([energy_id, energy_ood])

auroc_msp = roc_auc_score(y_eval, all_msp)
auroc_energy = roc_auc_score(y_eval, all_energy)

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Kemampuan Deteksi OOD:")
print(f"AUROC Deteksi OOD berbasis MSP (Softmax) : {auroc_msp:.4f}")
print(f"AUROC Deteksi OOD berbasis Energy Score  : {auroc_energy:.4f} (Separasi Superior!)")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Kemampuan Deteksi OOD:
AUROC Deteksi OOD berbasis MSP (Softmax) : 0.6272
AUROC Deteksi OOD berbasis Energy Score  : 1.0000 (Separasi Superior!)`},commonPitfalls:["Menggunakan probabilitas Softmax mentah sebagai ukuran keyakinan prediksi yang dapat dipercaya.","Hanya menguji akurasi klasifikasi tanpa menguji kemampuan menolak data anomali.","Menggunakan dataset uji OOD yang terlalu mirip dengan data ID sehingga tidak menguji batas fisik model."],validationProcedures:["Gunakan metrik AUROC dan FPR95 untuk mengukur keandalan deteksi OOD.","Sertakan uji Far-OOD (misal CIFAR-10 sebagai ID, SVHN atau Text sebagai OOD).","Implementasikan opsi penolakan otomatis (selective prediction) berbasis threshold energi."],exercises:[{question:"Mengapa normalisasi Softmax memicu keyakinan palsu (overconfidence) pada data Out-of-Distribution?",hint:"Perhatikan penyebut pada pembagian probabilitas Softmax.",answerExplanation:"Penyebut fungsi Softmax membagi setiap eksponensial logit dengan total penjumlahan seluruh eksponensial logit. Jika seluruh logit bernilai sangat negatif (misal -10, -11, -12), eksponensialnya sangat kecil, namun perbandingan relatif antara e^-10 terhadap total tetap menghasilkan persentase probabilitas yang sangat tinggi (~70%), menipu pengamat."},{question:"Apa arti fisis dari metrik FPR95 dalam evaluasi keamanan sistem otonom?",hint:"Kaitkan dengan persentase bahaya data anomali yang lolos tanpa terdeteksi.",answerExplanation:"FPR95 mengukur berapa persen data anomali asing yang gagal dideteksi (lolos sebagai data normal) ketika sistem dikalibrasi untuk mempertahankan 95% data operasional normal. Semakin rendah nilai FPR95, semakin aman sistem dari ancaman kegagalan fatal."}],references:[{citation:"Hendrycks, D., & Gimpel, K. (2017). A baseline for detecting misclassified and out-of-distribution examples in neural networks. ICLR.",type:"peer-reviewed-article"},{citation:"Liu, W., Wang, X., Owens, J., & Li, Y. (2020). Energy-based out-of-distribution detection. NeurIPS, 33, 21464-21475.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Evaluasi Out-of-Distribution (OOD) untuk Menilai Batas...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 5.5.3.","Capaian: Membedakan In-Distribution (ID), Near-OOD, dan Far-OOD dalam evaluasi model prediktif.","Capaian: Memahami fenomena overconfidence pada jaringan syaraf tiruan saat menerima input anomali.","Capaian: Menerapkan deteksi OOD berbasis skor ketidakpastian (Energy score, Mahalanobis distance, Maximum Softmax Proba..."],keyFormulaOrDiagram:"$$p_c(x) = \\frac{e^{f_c(x)}}{\\sum_{j=1}^C e^{f_j(x)}}$$"},{slideNumber:2,title:"Fondasi Konseptual: Evaluasi Out-of-Distribution (OOD) untuk Menilai Batas...",bulletPoints:["Sebuah kelemahan berbahaya dari model deep learning modern adalah sifat overconfident: model cenderung memprediksi kelas tert...","Taksonomi Spektrum OOD: 1. In-Distribution (ID): Sampel yang berasal dari distribusi data latih yang sama persis (misal pasie...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Prinsip Deteksi OOD: Sistem rekayasa yang bertanggung jawab wajib memiliki mekanisme penol..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Prinsip Deteksi OOD: Sistem rekayasa yang bertanggung jawab wajib memiliki mekanisme penolakan (abstention / reject option)....","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Metode Estimasi Skor OOD:","1. Maximum Softmax Probability (MSP Baseline, Hendrycks & Gimpel, 2017):","Diberikan vektor logit $f(x) \\in \\mathbb{R}^C$:"],keyFormulaOrDiagram:"$$p_c(x) = \\frac{e^{f_c(x)}}{\\sum_{j=1}^C e^{f_j(x)}}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Dua logit keluaran untuk kelas [A, B] adalah: Sampel 1 (ID) = [10.0, 2.0]; Sampel 2 (OOD) = [-5.0, -8.0]. Hitung probabilitas Softmax untuk...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung Softmax Sampel 1: p_A = e^10 / (e^10 + e^2) = 22026.5 / (22026.5 + 7.39) = 0.9997 (99.97%).","Langkah 2: Hitung Softmax Sampel 2: p_A = e^-5 / (e^-5 + e^-8) = 0.00674 / (0.00674 + 0.000335) = 0.00674 / 0....","Langkah 3: Evaluasi kelemahan Softmax: Sampel 2 memiliki magnitudo logit sangat negatif (artinya model tidak m...","Interpretasi: Skor Energi Sampel 2 (+4.95) sangat jauh lebih tinggi dibandingkan Sampel 1 (-10.00), secara instan mengidentifikasi Sam..."],keyFormulaOrDiagram:"Langkah 4: Hitung Skor Energi E = -log(sum(e^logit)): E(Sampel 1) = -log(e^10 + e^2) = -lo..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Komparasi deteksi OOD antara Maximum Softmax Probability (MSP) vs Energy-based Detection.","Dependensi Pustaka: numpy, sklearn.metrics","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Evaluasi Kemampuan Deteksi OOD:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Evaluasi Kemampuan Deteksi OOD: | AUROC Deteksi OOD berbasis MSP..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menggunakan probabilitas Softmax mentah sebagai ukuran keyakinan prediksi yang dapat dipercaya.","Perangkap: Hanya menguji akurasi klasifikasi tanpa menguji kemampuan menolak data anomali.","Perangkap: Menggunakan dataset uji OOD yang terlalu mirip dengan data ID sehingga tidak menguji batas fisik model."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Gunakan metrik AUROC dan FPR95 untuk mengukur keandalan deteksi OOD.","Prosedur: Sertakan uji Far-OOD (misal CIFAR-10 sebagai ID, SVHN atau Text sebagai OOD).","Prosedur: Implementasikan opsi penolakan otomatis (selective prediction) berbasis threshold energi."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa normalisasi Softmax memicu keyakinan palsu (overconfidence) pada data Out-of-Distribution?","Petunjuk: Perhatikan penyebut pada pembagian probabilitas Softmax.","Solusi Kunci: Penyebut fungsi Softmax membagi setiap eksponensial logit dengan total penjumlahan seluruh eksponensial logit. Jika selu..."]}]},"5.5.4":{id:"5.5.4",chapterId:"CH-36",title:"Analisis Kasus Batas (Corner Cases) dan Estimasi Batas Kegagalan Sistem",readingTimeMinutes:20,status:"verified",learningObjectives:["Merancang metodologi pencarian kasus batas (Corner Case Discovery) pada sistem rekayasa.","Mengestimasi batas kegagalan operasional (Operational Boundary Limits) secara kuantitatif.","Mengintegrasikan uji Boundary Value Analysis (BVA) ke dalam audit keselamatan komputasi."],content:`Dalam rekayasa sistem kritis (seperti kendali reaktor nuklir, navigasi pesawat nirawak, dan perangkat medis otonom), kegagalan hampir tidak pernah terjadi pada kondisi rata-rata atau kondisi nominal yang sering diuji. Kegagalan sistemik fatal selalu terjadi pada sudut-sudut ekstrem dari ruang parameter operasional (Corner Cases), di mana dua atau lebih parameter lingkungan secara bersamaan mencapai batas toleransi fisiknya.

Definisi Kasus Batas (Edge Case vs Corner Case):
1. Edge Case: Kondisi ekstrem yang terjadi di sepanjang satu parameter tunggal (misalnya temperatur sensor mencapai batas maksimum 100 C sementara tekanan dan getaran berada pada kondisi normal).
2. Corner Case: Kondisi ekstrem yang terjadi akibat kombinasi simultan dari beberapa parameter yang masing-masing mungkin masih berada dalam batas wajar, namun interaksinya memicu kegagalan sistem (misalnya temperatur 85 C, getaran frekuensi 120 Hz, dan kelembapan 90% terjadi pada detik yang sama).

Estimasi Batas Kegagalan Sistem (System Failure Boundary Estimation):
Peneliti tidak boleh hanya melaporkan bahwa model memiliki "akurasi 95%". Riset rekayasa wajib memetakan secara eksplisit batas ruang operasional yang aman (Safe Operating Envelope):
- Berapa batas kecepatan angin maksimum di mana algoritma kestabilan drone masih mampu mengoreksi posisi?
- Berapa rasio derau sinyal minimum (SNR minimum) sebelum algoritma estimasi fase kehilangan penguncian (loss of lock)?`,mathematicalFoundations:`Formulasi Ruang Keadaan Aman dan Permukaan Batas Kegagalan:
Misalkan parameter lingkungan eksternal dinyatakan sebagai vektor $\\mathbf{z} \\in \\mathcal{Z} \\subset \\mathbb{R}^d$.
Fungsi performa sistem dinyatakan sebagai $\\psi(\\mathbf{z}) \\in \\mathbb{R}$, dengan kriteria kegagalan operasional:
$$\\psi(\\mathbf{z}) < \\psi_{\\text{crit}}$$

Ruang Operasional Aman (Safe Operating Envelope, $\\Omega_{\\text{safe}}$):
$$\\Omega_{\\text{safe}} = \\{\\mathbf{z} \\in \\mathcal{Z} \\mid \\psi(\\mathbf{z}) \\geq \\psi_{\\text{crit}}\\}$$

Permukaan Batas Kegagalan (Failure Boundary Surface, $\\partial \\Omega$):
$$\\partial \\Omega = \\{\\mathbf{z} \\in \\mathcal{Z} \\mid \\psi(\\mathbf{z}) = \\psi_{\\text{crit}}\\}$$

Jarak Margin Keamanan Terdekat (Critical Safety Margin, $d_{\\text{safe}}$):
Jika kondisi operasional saat ini adalah $\\mathbf{z}_0$:
$$d_{\\text{safe}} = \\min_{\\mathbf{z} \\in \\partial \\Omega} \\|\\mathbf{z} - \\mathbf{z}_0\\|_{\\mathbf{\\Sigma}^{-1}}$$
di mana $\\|\\cdot\\|_{\\mathbf{\\Sigma}^{-1}}$ adalah jarak Mahalanobis yang dinormalisasi oleh matriks kovarians fluktuasi lingkungan.`,workedExample:{problemStatement:"Sebuah sistem radar Doppler memiliki performa deteksi target yang dimodelkan sebagai: SNR(R, V) = 30 - 0.5*R - 0.2*V (dB), di mana R adalah jarak target (km) dan V adalah kecepatan relatif target (m/s). Syarat deteksi aman sistem adalah SNR >= 10 dB. Tentukan persamaan garis batas kegagalan pada bidang (R, V). Jika jarak operasional target adalah R=30 km, hitung kecepatan maksimum V sebelum sistem mengalami kegagalan deteksi.",stepByStepSolution:["Langkah 1: Tetapkan persamaan batas kegagalan: psi(R, V) = psi_crit. 30 - 0.5*R - 0.2*V = 10.","Langkah 2: Sederhanakan persamaan aljabar: 0.5*R + 0.2*V = 20. Kalikan kedua sisi dengan 10: 5*R + 2*V = 200.","Langkah 3: Tentukan persamaan eksplisit untuk V: 2*V = 200 - 5*R => V_batas = 100 - 2.5*R.","Langkah 4: Hitung batas kecepatan pada R = 30 km: V_max = 100 - 2.5 * 30 = 100 - 75 = 25 m/s."],resultInterpretation:"Pada jarak target 30 km, sistem radar hanya mampu mempertahankan batas deteksi aman jika kecepatan target tidak melebihi 25 m/s (90 km/jam). Di atas batas ini, radar mengalami kegagalan operasional."},pythonImplementation:{description:"Pemetaan batas permukaan kegagalan menggunakan Support Vector Boundary Estimator.",libraryDependencies:["numpy","sklearn.svm"],code:`import numpy as np
from sklearn.svm import SVC

# [SIMULASI/SYNTHETIC DATA]
# Eksplorasi 2 parameter operasional: Suhu (degC) vs Getaran (G)
np.random.seed(42)
n_experiments = 400

temp = np.random.uniform(20, 100, size=n_experiments)
vibe = np.random.uniform(1, 10, size=n_experiments)
Z = np.column_stack([temp, vibe])

# Kriteria fisis kegagalan mesin (interaksi non-linier kuadratik)
# Mesin gagal jika kombinasi suhu dan getaran melampaui batas energi material
stress = (temp / 60.0)**2 + (vibe / 6.0)**2
y_status = (stress < 1.8).astype(int)  # 1: Aman, 0: Gagal

# Latih boundary estimator untuk memetakan batas permukaan kegagalan
clf = SVC(kernel='rbf', C=10.0)
clf.fit(Z, y_status)

# Hitung akurasi estimasi batas aman
acc = clf.score(Z, y_status)

print("[SIMULASI/SYNTHETIC DATA] Pemetaan Batas Kegagalan Operasional (Corner Cases):")
print(f"Jumlah Titik Uji Parameter Ruang   : {n_experiments}")
print(f"Proporsi Status Aman Operasional   : {np.mean(y_status)*100:.1f}%")
print(f"Proporsi Kasus Batas/Gagal         : {(1 - np.mean(y_status))*100:.1f}%")
print(f"Keakuratan Estimasi Permukaan (SVM): {acc*100:.2f}%")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Pemetaan Batas Kegagalan Operasional (Corner Cases):
Jumlah Titik Uji Parameter Ruang   : 400
Proporsi Status Aman Operasional   : 65.2%
Proporsi Kasus Batas/Gagal         : 34.8%
Keakuratan Estimasi Permukaan (SVM): 99.50%`},commonPitfalls:["Hanya menguji nilai ekstrem pada satu variabel saja (mengabaikan efek interaksi multivariabel).","Mengasumsikan batas aman berbentuk persegi linier sederhana, padahal pada sistem fisis seringkali berbentuk hiperbolik non-linier.","Tidak mencantumkan batas spesifikasi operasional maksimum (Operating Envelope) dalam laporan riset."],validationProcedures:["Gunakan teknik Adaptive Stress Testing berbasis reinforcement learning untuk memburu corner cases secara otomatis.","Petakan kurva kontur batas kegagalan pada ruang parameter utama.","Laporkan jarak margin keamanan terkecil terhadap kondisi operasional nominal."],exercises:[{question:"Apa perbedaan mendasar antara Edge Case dan Corner Case dalam rekayasa perangkat lunak dan sistem otonom?",hint:"Perhatikan jumlah parameter independen yang berada pada kondisi ekstrem.",answerExplanation:"Edge case terjadi ketika tepat satu parameter berada pada batas ekstrem toleransinya sementara parameter lain normal. Corner case terjadi ketika kombinasi dua atau lebih parameter ekstrem terjadi secara simultan, menciptakan interaksi tak terduga yang tidak pernah terdeteksi pada pengujian satu per satu."},{question:"Mengapa pengujian berbasis Grid Search seragam sangat tidak efisien untuk menemukan corner cases pada dimensi tinggi?",hint:"Kaitkan dengan kutukan dimensionalitas (curse of dimensionality) dan volume ruang hipersfer.",answerExplanation:"Pada dimensi tinggi (d > 5), volume ruang parameter bertumbuh secara eksponensial. Sebagian besar volume berada di sudut-sudut hipersfer yang sangat jarang tersentuh oleh grid acak seragam. Diperlukan metode optimasi terarah (seperti Bayesian Optimization atau Genetic Algorithms) untuk memandu pencarian ke zona kritis."}],references:[{citation:"Koopman, P., & Wagner, M. (2016). Challenges in autonomous vehicle testing and validation. SAE International Journal of Transportation Safety, 4(1), 15-24.",type:"peer-reviewed-article"},{citation:"Koren, M., Alsaif, S., Lee, R., & Kochenderfer, M. J. (2018). Adaptive stress testing for autonomous vehicles. IEEE Transactions on Intelligent Vehicles, 3(4), 449-459.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Analisis Kasus Batas (Corner Cases) dan Estimasi Batas...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 5.5.4.","Capaian: Merancang metodologi pencarian kasus batas (Corner Case Discovery) pada sistem rekayasa.","Capaian: Mengestimasi batas kegagalan operasional (Operational Boundary Limits) secara kuantitatif.","Capaian: Mengintegrasikan uji Boundary Value Analysis (BVA) ke dalam audit keselamatan komputasi."],keyFormulaOrDiagram:"$$\\psi(\\mathbf{z}) < \\psi_{\\text{crit}}$$"},{slideNumber:2,title:"Fondasi Konseptual: Analisis Kasus Batas (Corner Cases) dan Estimasi Batas...",bulletPoints:["Dalam rekayasa sistem kritis (seperti kendali reaktor nuklir, navigasi pesawat nirawak, dan perangkat medis otonom), kegagala...","Definisi Kasus Batas (Edge Case vs Corner Case): 1. Edge Case: Kondisi ekstrem yang terjadi di sepanjang satu parameter tungg...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Estimasi Batas Kegagalan Sistem (System Failure Boundary Estimation): Peneliti tidak boleh..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Estimasi Batas Kegagalan Sistem (System Failure Boundary Estimation): Peneliti tidak boleh hanya melaporkan bahwa model memil...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Formulasi Ruang Keadaan Aman dan Permukaan Batas Kegagalan:","Misalkan parameter lingkungan eksternal dinyatakan sebagai vektor $\\mathbf{z} \\in \\mathcal{Z} \\subset \\mathbb{...","Fungsi performa sistem dinyatakan sebagai $\\psi(\\mathbf{z}) \\in \\mathbb{R}$, dengan kriteria kegagalan operasi..."],keyFormulaOrDiagram:"$$\\psi(\\mathbf{z}) < \\psi_{\\text{crit}}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Sebuah sistem radar Doppler memiliki performa deteksi target yang dimodelkan sebagai: SNR(R, V) = 30 - 0.5*R - 0.2*V (dB), di mana R adalah...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Tetapkan persamaan batas kegagalan: psi(R, V) = psi_crit. 30 - 0.5*R - 0.2*V = 10.","Langkah 2: Sederhanakan persamaan aljabar: 0.5*R + 0.2*V = 20. Kalikan kedua sisi dengan 10: 5*R + 2*V = 200.","Langkah 3: Tentukan persamaan eksplisit untuk V: 2*V = 200 - 5*R => V_batas = 100 - 2.5*R.","Interpretasi: Pada jarak target 30 km, sistem radar hanya mampu mempertahankan batas deteksi aman jika kecepatan target tidak melebihi..."],keyFormulaOrDiagram:"Langkah 4: Hitung batas kecepatan pada R = 30 km: V_max = 100 - 2.5 * 30 = 100 - 75 = 25 m..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Pemetaan batas permukaan kegagalan menggunakan Support Vector Boundary Estimator.","Dependensi Pustaka: numpy, sklearn.svm","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Pemetaan Batas Kegagalan Operasional (Corner Cases):"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Pemetaan Batas Kegagalan Operasional (Corner Cases): | Jumlah Ti..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Hanya menguji nilai ekstrem pada satu variabel saja (mengabaikan efek interaksi multivariabel).","Perangkap: Mengasumsikan batas aman berbentuk persegi linier sederhana, padahal pada sistem fisis seringkali berbentuk hi...","Perangkap: Tidak mencantumkan batas spesifikasi operasional maksimum (Operating Envelope) dalam laporan riset."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Gunakan teknik Adaptive Stress Testing berbasis reinforcement learning untuk memburu corner cases secara otoma...","Prosedur: Petakan kurva kontur batas kegagalan pada ruang parameter utama.","Prosedur: Laporkan jarak margin keamanan terkecil terhadap kondisi operasional nominal."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Apa perbedaan mendasar antara Edge Case dan Corner Case dalam rekayasa perangkat lunak dan sistem otonom?","Petunjuk: Perhatikan jumlah parameter independen yang berada pada kondisi ekstrem.","Solusi Kunci: Edge case terjadi ketika tepat satu parameter berada pada batas ekstrem toleransinya sementara parameter lain normal. Co..."]}]}};export{a as CH36_LESSONS};
