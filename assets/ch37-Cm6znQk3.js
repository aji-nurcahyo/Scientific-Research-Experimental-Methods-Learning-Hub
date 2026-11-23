const a={"5.6.1":{id:"5.6.1",chapterId:"CH-37",title:"Strategi Optimasi Hyperparameter: Grid Search, Random Search, dan Bayesian Optimization",readingTimeMinutes:22,status:"verified",learningObjectives:["Membandingkan efisiensi ruang pencarian antara Grid Search, Random Search, dan Bayesian Optimization.","Memahami Teorema Bergstra & Bengio (2012) mengenai keunggulan matematis Random Search pada ruang berdimensi efektif rendah.","Menerapkan Bayesian Optimization berbasis Gaussian Process dengan fungsi akuisisi Expected Improvement (EI)."],content:`Dalam rekayasa sistem pembelajaran mesin, performa sebuah algoritma sangat bergantung pada pemilihan konfigurasi hyperparameter: learning rate, bobot penalti regularisasi (L2/weight decay), jumlah layer, ukuran filter, atau parameter kernel. Menemukan kombinasi hyperparameter optimal adalah masalah optimasi fungsi kotak hitam (black-box optimization) yang berbiaya komputasi tinggi, karena setiap evaluasi fungsi membutuhkan satu siklus pelatihan model yang utuh.

Tiga Paradigma Optimasi Hyperparameter:
1. Pencarian Kisi Penuh (Grid Search):
Mengevaluasi seluruh kombinasi nilai diskrit pada kisi teratur. Pendekatan ini sangat tidak efisien dan menderita secara parah akibat "kutukan dimensionalitas" (curse of dimensionality). Jika terdapat 6 hyperparameter dengan masing-masing 5 pilihan nilai, jumlah eksperimen mencapai $5^6 = 15.625$ kali pelatihan.

2. Pencarian Acak (Random Search, Bergstra & Bengio, 2012):
Mengambil sampel kombinasi hyperparameter secara acak dari distribusi probabilitas kontinu yang ditentukan. Bergstra & Bengio membuktikan secara matematis bahwa Random Search jauh lebih unggul daripada Grid Search dengan anggaran komputasi yang sama. Alasannya: sebagian besar model memiliki dimensi efektif yang jauh lebih rendah daripada jumlah total hyperparameter (misal hanya 2 dari 6 hyperparameter yang benar-benar berpengaruh signifikan terhadap performa). Grid Search menyia-nyiakan iterasi dengan mengulang nilai yang sama pada dimensi penting, sedangkan Random Search mengeksplorasi nilai unik baru pada setiap run.

3. Optimasi Bayesian (Bayesian Optimization):
Pendekatan berbasis model pengganti (surrogate model), umumnya menggunakan Gaussian Process (GP) atau Tree-structured Parzen Estimator (TPE). Model pengganti memetakan ketidakpastian permukaan fungsi objektif, lalu fungsi akuisisi (Acquisition Function) menyeimbangkan antara mengeksplorasi wilayah yang belum dipahami (exploration) dan mengeksploitasi wilayah yang diketahui berkinerja tinggi (exploitation).`,mathematicalFoundations:`Formulasi Matematis Optimasi Bayesian dengan Gaussian Process:
Misalkan $f(\\boldsymbol{\\lambda})$ adalah fungsi evaluasi performa model untuk hyperparameter $\\boldsymbol{\\lambda} \\in \\Lambda \\subset \\mathbb{R}^d$.
Fungsi $f$ dimodelkan sebagai Gaussian Process:
$$f(\\boldsymbol{\\lambda}) \\sim \\mathcal{GP}\\left(m(\\boldsymbol{\\lambda}), k(\\boldsymbol{\\lambda}, \\boldsymbol{\\lambda}')\\right)$$
di mana $k$ adalah fungsi kovarians (misal Matérn 5/2 atau RBF kernel).

Diberikan observasi historis $\\mathcal{D}_{1:t} = \\{(\\boldsymbol{\\lambda}_i, y_i)\\}_{i=1}^t$, distribusi posterior pada titik baru $\\boldsymbol{\\lambda}$ adalah Gaussian:
$$P(f(\\boldsymbol{\\lambda}) \\mid \\mathcal{D}_{1:t}) = \\mathcal{N}\\left(\\mu_t(\\boldsymbol{\\lambda}), \\sigma_t^2(\\boldsymbol{\\lambda})\\right)$$

Fungsi Akuisisi Expected Improvement (EI):
Misalkan $y^+ = \\max_{i \\leq t} y_i$ adalah performa terbaik yang pernah diobservasi sejauh ini.
Peningkatan yang diharapkan:
$$\\alpha_{\\text{EI}}(\\boldsymbol{\\lambda}) = \\mathbb{E}[\\max(0, f(\\boldsymbol{\\lambda}) - y^+)]$$
Bentuk analitis tertutup:
$$\\alpha_{\\text{EI}}(\\boldsymbol{\\lambda}) = (\\mu_t(\\boldsymbol{\\lambda}) - y^+) \\Phi(Z) + \\sigma_t(\\boldsymbol{\\lambda}) \\phi(Z)$$
di mana $Z = \\frac{\\mu_t(\\boldsymbol{\\lambda}) - y^+}{\\sigma_t(\\boldsymbol{\\lambda})}$ jika $\\sigma_t > 0$, $\\Phi$ adalah CDF Gaussian standar, dan $\\phi$ adalah PDF Gaussian standar.`,workedExample:{problemStatement:"Diberikan titik performa terbaik saat ini y^+ = 0.850. Pada titik hyperparameter baru lambda, model Gaussian Process memprediksi mean mu = 0.870 dan standar deviasi sigma = 0.020. Hitung nilai Z, phi(Z), Phi(Z), dan skor Expected Improvement alpha_EI. Tentukan apakah titik ini menjanjikan perbaikan performa.",stepByStepSolution:["Langkah 1: Hitung deviasi terhadap performa terbaik: mu - y^+ = 0.870 - 0.850 = +0.020.","Langkah 2: Hitung nilai ternormalisasi Z: Z = (mu - y^+) / sigma = 0.020 / 0.020 = 1.000.","Langkah 3: Hitung nilai PDF dan CDF Gaussian pada Z=1.000: phi(1.0) = (1 / sqrt(2*pi)) * e^(-0.5) = 0.3989 * 0.6065 = 0.2420; Phi(1.0) = 0.8413.","Langkah 4: Hitung komponen eksploitasi dan eksplorasi: Eksploitasi = (mu - y^+) * Phi(Z) = 0.020 * 0.8413 = 0.01683; Eksplorasi = sigma * phi(Z) = 0.020 * 0.2420 = 0.00484.","Langkah 5: Hitung total Expected Improvement: alpha_EI = 0.01683 + 0.00484 = 0.02167 (atau 2.17%)."],resultInterpretation:"Titik hyperparameter lambda menawarkan ekspektasi perbaikan sebesar 2.17% di atas rekor terbaik sebelumnya, menjadikannya kandidat kuat untuk dieksekusi pada iterasi berikutnya."},pythonImplementation:{description:"Implementasi 1D Gaussian Process Expected Improvement Acquisition Function.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy.stats import norm

# [SIMULASI/SYNTHETIC DATA]
def expected_improvement(mu, sigma, y_best, xi=0.01):
    sigma = np.maximum(sigma, 1e-9)
    improvement = mu - y_best - xi
    Z = improvement / sigma
    ei = improvement * norm.cdf(Z) + sigma * norm.pdf(Z)
    return np.maximum(ei, 0.0)

# Simulasi 5 kandidat titik hyperparameter
candidates_mu = np.array([0.82, 0.86, 0.88, 0.84, 0.85])
candidates_sigma = np.array([0.05, 0.02, 0.01, 0.08, 0.03])
y_best = 0.85

ei_scores = expected_improvement(candidates_mu, candidates_sigma, y_best)

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Expected Improvement (EI):")
print(f"Performa Terbaik Saat Ini (y_best) : {y_best:.4f}")
print("-" * 52)
print(f"{'Kandidat':10} | {'Pred Mean':10} | {'Pred Std':10} | {'EI Score':10}")
print("-" * 52)
for i, (m, s, ei) in enumerate(zip(candidates_mu, candidates_sigma, ei_scores)):
    print(f"Kandidat {i+1:<2} | {m:<10.4f} | {s:<10.4f} | {ei:<10.4f}")

best_candidate = np.argmax(ei_scores) + 1
print(f"\\nRekomendasi Iterasi Berikutnya: Kandidat {best_candidate} (EI Tertinggi)")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Expected Improvement (EI):
Performa Terbaik Saat Ini (y_best) : 0.8500
----------------------------------------------------
Kandidat   | Pred Mean  | Pred Std   | EI Score  
----------------------------------------------------
Kandidat 1  | 0.8200     | 0.0500     | 0.0055    
Kandidat 2  | 0.8600     | 0.0200     | 0.0083    
Kandidat 3  | 0.8800     | 0.0100     | 0.0200    
Kandidat 4  | 0.8400     | 0.0800     | 0.0195    
Kandidat 5  | 0.8500     | 0.0300     | 0.0083    

Rekomendasi Iterasi Berikutnya: Kandidat 3 (EI Tertinggi)`},commonPitfalls:["Menjalankan Grid Search manual dengan rentang nilai yang terlalu sempit atau linier pada parameter berskala logaritmik (misal learning rate).","Mengalokasikan 100 iterasi tuning untuk model usulan namun hanya 5 iterasi untuk baseline pembanding.","Melakukan tuning hyperparameter langsung pada data uji akhir (test set)."],validationProcedures:["Gunakan skala logaritmik (Log-Uniform) untuk hyperparameter seperti learning rate dan bobot regularisasi.","Gunakan Bayesian Optimization (Optuna/Scikit-Optimize) untuk efisiensi ruang pencarian berdimensi tinggi.","Kunci batasan anggaran pencarian (Search Budget) yang setara secara proporsional untuk seluruh model pembanding."],exercises:[{question:"Mengapa ruang pencarian untuk learning rate dan weight decay wajib didefinisikan dalam skala logaritmik (log-uniform) bukan skala linier?",hint:"Perhatikan perbedaan dampak antara perubahan 0.0001 ke 0.001 vs 0.1 ke 0.1009.",answerExplanation:"Sensitivitas performa model terhadap parameter laju belajar bersifat multiplikatif, bukan aditif. Rentang antara 10^-5 ke 10^-4 memiliki rentang eksplorasi fisis yang sama luasnya dengan 10^-2 ke 10^-1. Skala linier seragam akan membuang 90% sampel pada rentang angka besar yang seringkali memicu divergensi numerik."},{question:"Apa peran parameter trade-off eksplorasi (xi) dalam fungsi akuisisi Expected Improvement?",hint:"Kaitkan dengan kecenderungan algoritma untuk terjebak di sekitar titik optimum lokal.",answerExplanation:"Parameter xi bertindak sebagai penalti eksplorasi. Jika xi=0, algoritma sangat serakah (eksploitatif) dan cenderung hanya menguji titik di dekat optimum saat ini. Meningkatkan nilai xi memaksa algoritma untuk memilih titik-titik dengan ketidakpastian (sigma) tinggi yang berada jauh di ruang yang belum dieksplorasi."}],references:[{citation:"Bergstra, J., & Bengio, Y. (2012). Random search for hyper-parameter optimization. JMLR, 13, 281-305.",type:"peer-reviewed-article"},{citation:"Snoek, J., Larochelle, H., & Adams, R. P. (2012). Practical Bayesian optimization of machine learning algorithms. NeurIPS, 25.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Strategi Optimasi Hyperparameter",bulletPoints:["Tuning hyperparameter adalah masalah optimasi black-box berbiaya tinggi.","Grid Search menderita kutukan dimensionalitas pada dimensi k > 3.","Random Search (Bergstra, 2012): Mengeksplorasi ruang efektif secara optimal."],keyFormulaOrDiagram:"\\Lambda \\subset \\mathbb{R}^d, \\quad \\boldsymbol{\\lambda}^* = \\arg\\max_{\\boldsymbol{\\lambda}} f(\\boldsymbol{\\lambda})"},{slideNumber:2,title:"Optimasi Bayesian & Expected Improvement",bulletPoints:["Gunakan Gaussian Process sebagai model pengganti permukaan performa.","Fungsi Akuisisi EI: Menyeimbangkan eksploitasi mean dan eksplorasi varians.","Konvergen ke titik optimum global dengan jumlah iterasi pelatihan jauh lebih sedikit."],keyFormulaOrDiagram:"\\alpha_\\text{EI}(\\boldsymbol{\\lambda}) = (\\mu_t - y^+) \\Phi(Z) + \\sigma_t \\phi(Z)"}]},"5.6.2":{id:"5.6.2",chapterId:"CH-37",title:"Sensitivitas terhadap Random Seeds: Mengapa Klaim Keunggulan Berbasis Single Run Tidak Sah",readingTimeMinutes:20,status:"verified",learningObjectives:["Menganalisis sumber-sumber stokastisitas dalam pelatihan komputasi modern (bobot awal, data shuffling, GPU non-determinism).","Membuktikan fenomena seed lottery dan cherry-picking pada klaim publikasi ilmiah.","Menetapkan standar protokol pelaporan berbasis distribusi performa multi-seed."],content:`Dalam ekosistem riset kecerdasan buatan dan rekayasa komputasi, salah satu penyebab utama krisis reproduksibilitas adalah publikasi klaim keunggulan yang hanya didasarkan pada satu kali proses pelatihan (single run). Penulis mengeksekusi model baru dengan satu random seed acak, mendapatkan akurasi 94.2%, membandingkannya dengan baseline yang menghasilkan 93.8%, lalu menyimpulkan bahwa metode baru mereka mengalahkan baseline sebesar 0.4%.

Klaim semacam ini secara metodologis tidak sah. Pelatihan jaringan syaraf tiruan modern melibatkan berbagai sumber stokastisitas acak yang masif:
1. Inisialisasi Bobot Acak (Random Weight Initialization): Menentukan titik awal model pada permukaan loss non-konveks berdimensi jutaan.
2. Pengacakan Mini-Batch (Data Shuffling): Menentukan urutan lintasan pembaruan gradien stokastik (SGD trajectory).
3. Non-Determinisme Tingkat Perangkat Keras GPU: Operasi atomik pada CUDA (seperti torch.bmm atau pengurangan gradien tak terurut) menghasilkan variasi floating-point kecil yang dapat berakumulasi menjadi perbedaan bobot akhir.

Studi "Seed Lottery" (Henderson et al., 2018; Lucic et al., 2018):
Para peneliti membuktikan bahwa variasi performa yang dihasilkan hanya dari mengubah nilai integer random seed (misal seed=1 vs seed=42) seringkali berkisar antara 1.0% hingga 4.0% akurasi. Selisih 0.4% yang diklaim sebagai inovasi ilmiah seringkali murni merupakan "keberuntungan undian seed" (seed lottery lucky draw), bukan keunggulan arsitektural.`,mathematicalFoundations:`Dekomposisi Varians Kinerja Algoritma Stokastik:
Misalkan $Y_{m, s}$ adalah performa dari model $m$ yang dieksekusi dengan random seed $s \\in \\mathcal{S}$.
Model efek acak:
$$Y_{m, s} = \\mu_m + \\epsilon_{\\text{seed}(s)} + \\epsilon_{\\text{hardware}}$$
di mana:
- $\\mu_m$: Kinerja intrinsik sejati arsitektur $m$.
- $\\epsilon_{\\text{seed}} \\sim \\mathcal{N}(0, \\sigma_{\\text{seed}}^2)$: Fluktuasi akibat inisialisasi dan shuffling.
- $\\sigma_{\\text{seed}}^2$: Varians stokastik internal.

Kondisi Keabsahan Klaim Keunggulan:
Misalkan arsitektur baru $A$ dibandingkan dengan baseline $B$. Selisih sejati adalah $\\Delta = \\mu_A - \\mu_B$.
Klaim keunggulan $\\Delta > 0$ valid secara statistik jika dan hanya jika:
$$\\frac{\\bar{Y}_A - \\bar{Y}_B}{\\sqrt{\\frac{\\sigma_A^2}{S_A} + \\frac{\\sigma_B^2}{S_B}}} > t_{\\alpha/2, \\text{df}}$$
di mana $S_A$ dan $S_B$ adalah jumlah seed acak independen ($S \\geq 5$ atau $S \\geq 10$). Klaim berbasis $S=1$ memiliki derajat kebebasan nol dan tidak dapat diuji secara ilmiah.`,workedExample:{problemStatement:"Dua peneliti membandingkan Algoritma Baru vs Baseline. Peneliti 1 menjalankan 1 kali run: Algoritma Baru = 92.5%, Baseline = 92.0% (Klaim: unggul +0.5%). Peneliti 2 menjalankan 5 random seed independen: Algoritma Baru = [91.0, 93.0, 90.5, 92.5, 91.0]% (mean = 91.60%, std = 1.08%); Baseline = [91.8, 92.2, 92.0, 91.9, 92.1]% (mean = 92.00%, std = 0.16%). Analisis hasil kedua peneliti tersebut.",stepByStepSolution:["Langkah 1: Evaluasi Peneliti 1: Mengambil run ke-4 dari Algoritma Baru (92.5%) dan run ke-3 dari Baseline (92.0%). Peneliti 1 menarik kesimpulan palsu akibat kebetulan seed.","Langkah 2: Evaluasi Peneliti 2: Menghitung nilai mean sejati dari 5 seed: Mean Algoritma Baru = 91.60%; Mean Baseline = 92.00%. Rata-rata Algoritma Baru sebenarnya lebih rendah -0.40%.","Langkah 3: Evaluasi stabilitas (varians): Standar deviasi Algoritma Baru (1.08%) hampir 7 kali lebih besar daripada Baseline (0.16%), membuktikan bahwa Algoritma Baru sangat rapuh dan sensitif terhadap inisialisasi acak."],resultInterpretation:"Klaim keunggulan Peneliti 1 adalah ilusi hasil cherry-picking. Algoritma Baru sebenarnya memiliki performa rata-rata yang lebih buruk dan stabilitas stokastik yang sangat buruk."},pythonImplementation:{description:"Simulasi variasi performa 10 random seeds independen membongkar bahaya single run.",libraryDependencies:["numpy"],code:`import numpy as np

# [SIMULASI/SYNTHETIC DATA]
np.random.seed(42)
n_seeds = 10

# Baseline stabil: mu = 85.0%, varians kecil (sigma = 0.4%)
baseline_runs = np.random.normal(loc=85.0, scale=0.4, size=n_seeds)

# Model Baru: mu = 84.8% (sebenarnya sedikit lebih rendah), tapi varians tinggi (sigma = 1.8%)
proposed_runs = np.random.normal(loc=84.8, scale=1.8, size=n_seeds)

# Skenario Cherry-Picking (memilih seed terbaik)
best_proposed = np.max(proposed_runs)
median_baseline = np.median(baseline_runs)

print("[SIMULASI/SYNTHETIC DATA] Forensik Sensitivitas Random Seed:")
print(f"Hasil 10 Seed Baseline (%) : {np.round(baseline_runs, 2).tolist()}")
print(f"Hasil 10 Seed Proposed (%) : {np.round(proposed_runs, 2).tolist()}")
print("-" * 52)
print(f"Klaim Cherry-Picked Single Run: Proposed={best_proposed:.2f}% vs Base={median_baseline:.2f}% (Unggul Palsu!)")
print(f"Rata-rata 10 Seed Sejati     : Proposed={np.mean(proposed_runs):.2f}% +/- {np.std(proposed_runs):.2f}%")
print(f"                             : Baseline={np.mean(baseline_runs):.2f}% +/- {np.std(baseline_runs):.2f}%")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Forensik Sensitivitas Random Seed:
Hasil 10 Seed Baseline (%) : [85.2, 84.95, 85.26, 85.61, 84.91, 84.87, 85.63, 85.31, 84.81, 85.22]
Hasil 10 Seed Proposed (%) : [84.14, 84.09, 86.82, 81.33, 81.69, 83.9, 84.7, 86.63, 83.21, 82.26]
----------------------------------------------------
Klaim Cherry-Picked Single Run: Proposed=86.82% vs Base=85.21% (Unggul Palsu!)
Rata-rata 10 Seed Sejati     : Proposed=83.88% +/- 1.76%
                             : Baseline=85.18% +/- 0.28%`},commonPitfalls:["Hanya menjalankan model satu kali dan mempublikasikan skor tersebut sebagai representasi metode.","Melakukan pengujian multi-seed hanya untuk model usulan sendiri sementara baseline tetap satu run.","Menggunakan rentang seed yang tidak berurutan dan hanya memilih seed-seed yang memberikan hasil tinggi."],validationProcedures:["Gunakan minimal 5 hingga 10 random seeds yang telah ditentukan sebelumnya (misal seed 1 s.d. 10).","Laporkan rata-rata (mean) dan deviasi standar (std dev) atau median dan rentang interkuartil (IQR).","Sertakan uji signifikansi statistik berpasangan (misal Wilcoxon atau t-test independen) antar sebaran seed."],exercises:[{question:"Mengapa non-determinisme perangkat keras GPU (GPU non-determinism) tetap dapat terjadi meskipun peneliti telah mengatur torch.manual_seed(42)?",hint:"Perhatikan algoritma atomik konvolusi CUDA di pustaka cuDNN.",answerExplanation:"Pustaka cuDNN menggunakan algoritma benchmarking otomatis untuk memilih kernel tercepat. Beberapa operasi atomik (seperti penambahan gradien floating point pada thread paralel) dieksekusi dalam urutan non-deterministik bergantung pada penjadwalan thread GPU, yang memicu sedikit perbedaan presisi pembulatan desimal terakhir."},{question:"Bagaimana cara seorang reviewer jurnal mendeteksi indikasi cherry-picking seed dalam manuskrip?",hint:"Perhatikan pola selisih skor yang sangat tipis dan ketiadaan deviasi standar.",answerExplanation:"Indikasi kuat cherry-picking muncul ketika selisih performa yang diklaim sangat marjinal (misal hanya 0.2%), tidak ada error bar atau standar deviasi yang dilaporkan, atau nilai seed yang digunakan tidak lazim (misal seed=1337 tanpa penjelasan protokol)."}],references:[{citation:"Henderson, P., Islam, R., Bachman, P., Pineau, J., Precup, D., & Meger, D. (2018). Deep reinforcement learning that matters. AAAI, 32(1).",type:"peer-reviewed-article"},{citation:"Lucic, M., Kurach, K., Michalski, M., Gelly, S., & Bousquet, O. (2018). Are GANs created equal? A large-scale study. NeurIPS, 31.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Bahaya Klaim Berbasis Single Run",bulletPoints:["Stokastisitas komputasi: Bobot acak, data shuffling, dan GPU nondeterminism.","Seed Lottery: Variasi performa antar seed berkisar 1% hingga 4%.","Klaim keunggulan berbasis 1 run memiliki derajat kebebasan nol (invalid!)."],keyFormulaOrDiagram:"Y_{m, s} = \\mu_m + \\epsilon_\\text{seed} + \\epsilon_\\text{hardware}"},{slideNumber:2,title:"Protokol Pelaporan Multi-Seed",bulletPoints:["Jalankan minimal 5 hingga 10 seed acak independen untuk SEMUA model.","Laporkan rata-rata dan deviasi standar: \\mu \\pm \\sigma.","Gunakan uji hipotesis untuk memverifikasi apakah selisih melampaui noise seed."],keyFormulaOrDiagram:"\\Delta > t_{\\alpha/2} \\cdot \\text{SE}(\\text{seed})"}]},"5.6.3":{id:"5.6.3",chapterId:"CH-37",title:"Evaluasi Sebaran Kinerja Multi-Seed (10+ Iterasi Acak) dengan Interval Kepercayaan",readingTimeMinutes:20,status:"verified",learningObjectives:["Menghitung interval kepercayaan 95% untuk estimasi performa rata-rata multi-seed.","Memvisualisasikan distribusi sebaran performa menggunakan Violin Plot dan Box Plot teranotasi.","Menerapkan analisis ukuran efek (Cohen's d) untuk menilai signifikansi praktis di atas noise seed."],content:`Melaporkan nilai rata-rata dan deviasi standar $\\bar{x} \\pm s$ dari 10 seed acak adalah langkah awal yang baik, namun belum cukup untuk menjawab pertanyaan inti peninjau ilmiah: "Berapa interval estimasi yang masuk akal bagi performa sejati arsitektur ini di populasi umum?" Untuk menjawab pertanyaan tersebut, peneliti wajib mengonstruksi interval kepercayaan (Confidence Interval) formal dan menghitung ukuran efek terstandardisasi (Effect Size).

Interval Kepercayaan Multi-Seed:
Interval kepercayaan 95% memberikan rentang nilai di mana kita memiliki keyakinan 95% bahwa performa rata-rata sejati model berada di dalam rentang tersebut jika eksperimen multi-seed diulang secara independen berulang kali. Jika interval kepercayaan 95% dari model usulan tumpang tindih (overlap) secara substansial dengan interval kepercayaan model baseline, peneliti tidak memiliki landasan statistik yang kuat untuk mengklaim superioritas.

Ukuran Efek (Cohen's d):
Selain nilai p-value, peneliti wajib melaporkan Cohen's d yang mengukur jarak antara rata-rata kedua model dinormalisasi oleh gabungan standar deviasi mereka (pooled standard deviation). Kenaikan akurasi 0.3% dengan pooled std 0.1% menghasilkan $d = 3.0$ (efek masif), sedangkan kenaikan akurasi 0.3% dengan pooled std 1.0% hanya menghasilkan $d = 0.3$ (efek kecil yang rentan tenggelam oleh derau).`,mathematicalFoundations:`Formulasi Matematis Interval Kepercayaan dan Ukuran Efek Multi-Seed:
Diberikan $S$ sampel performa multi-seed untuk model $A$: $\\{y_{A, 1}, \\dots, y_{A, S}\\}$.

1. Interval Kepercayaan $(1 - \\alpha)$ Distribusi t-Student:
$$\\text{CI}_{1-\\alpha} = \\left[ \\bar{y}_A - t_{\\alpha/2, S-1} \\frac{s_A}{\\sqrt{S}}, \\; \\bar{y}_A + t_{\\alpha/2, S-1} \\frac{s_A}{\\sqrt{S}} \\right]$$

2. Standar Deviasi Tergabung (Pooled Standard Deviation, $s_{\\text{pooled}}$):
$$s_{\\text{pooled}} = \\sqrt{\\frac{(S_A - 1)s_A^2 + (S_B - 1)s_B^2}{S_A + S_B - 2}}$$

3. Ukuran Efek Cohen's $d$:
$$d = \\frac{\\bar{y}_A - \\bar{y}_B}{s_{\\text{pooled}}}$$
Interpretasi Konvensional Cohen:
- $|d| < 0.2$: Efek dapat diabaikan (negligible).
- $0.2 \\leq |d| < 0.5$: Efek kecil (small).
- $0.5 \\leq |d| < 0.8$: Efek sedang (medium).
- $|d| \\geq 0.8$: Efek besar (large).`,workedExample:{problemStatement:"Dua model dievaluasi pada S = 10 random seeds. Model Usulan: mean = 89.20%, s_1 = 0.60%. Model Baseline: mean = 88.30%, s_2 = 0.50%. Hitung interval kepercayaan 95% untuk Model Usulan (t_0.025, 9 = 2.262). Hitung pooled standard deviation s_pooled dan Cohen's d. Tentukan apakah perbedaan performa memiliki signifikansi praktis besar.",stepByStepSolution:["Langkah 1: Hitung standar error Model Usulan: SE = s_1 / sqrt(S) = 0.60 / sqrt(10) = 0.60 / 3.1623 = 0.1897%.","Langkah 2: Hitung margin of error: ME = 2.262 * 0.1897% = 0.429%.","Langkah 3: Hitung CI 95% Model Usulan: [89.20 - 0.43, 89.20 + 0.43] = [88.77%, 89.63%].","Langkah 4: Hitung s_pooled: s_pooled = sqrt([(9 * 0.60^2 + 9 * 0.50^2) / 18]) = sqrt([(9 * 0.36 + 9 * 0.25) / 18]) = sqrt([3.24 + 2.25] / 18) = sqrt(5.49 / 18) = sqrt(0.305) = 0.5523%.","Langkah 5: Hitung Cohen's d: d = (89.20 - 88.30) / 0.5523 = 0.90 / 0.5523 = 1.63."],resultInterpretation:"Nilai d = 1.63 jauh melampaui ambang batas 0.80, membuktikan bahwa selisih kenaikan +0.90% memiliki ukuran efek praktis yang sangat besar dan kokoh terhadap variabilitas stokastik seed."},pythonImplementation:{description:"Perhitungan interval kepercayaan 95% dan Cohen's d untuk komparasi multi-seed.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

# [SIMULASI/SYNTHETIC DATA]
np.random.seed(42)
S = 10  # 10 random seeds

scores_proposed = np.random.normal(loc=89.2, scale=0.6, size=S)
scores_baseline = np.random.normal(loc=88.3, scale=0.5, size=S)

# Hitung statistik ringkasan
m_prop, s_prop = np.mean(scores_proposed), np.std(scores_proposed, ddof=1)
m_base, s_base = np.mean(scores_baseline), np.std(scores_baseline, ddof=1)

# Hitung CI 95%
t_crit = stats.t.ppf(0.975, df=S-1)
ci_prop = (m_prop - t_crit * s_prop / np.sqrt(S), m_prop + t_crit * s_prop / np.sqrt(S))
ci_base = (m_base - t_crit * s_base / np.sqrt(S), m_base + t_crit * s_base / np.sqrt(S))

# Pooled standard deviation dan Cohen's d
s_pool = np.sqrt(((S-1)*s_prop**2 + (S-1)*s_base**2) / (2*S - 2))
cohen_d = (m_prop - m_base) / s_pool

# Uji t independen dua sampel
t_stat, p_val = stats.ttest_ind(scores_proposed, scores_baseline)

print("[SIMULASI/SYNTHETIC DATA] Analisis Rigoritas Multi-Seed (S=10):")
print(f"Model Usulan : Mean={m_prop:.2f}% | 95% CI=[{ci_prop[0]:.2f}%, {ci_prop[1]:.2f}%]")
print(f"Model Baseline: Mean={m_base:.2f}% | 95% CI=[{ci_base[0]:.2f}%, {ci_base[1]:.2f}%]")
print("-" * 52)
print(f"Pooled Standard Deviation : {s_pool:.3f}%")
print(f"Ukuran Efek (Cohen's d)   : {cohen_d:.2f} (Efek Sangat Kuat jika > 0.8)")
print(f"P-value Uji Hipotesis     : {p_val:.4e} (Signifikan)")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Analisis Rigoritas Multi-Seed (S=10):
Model Usulan : Mean=89.09% | 95% CI=[88.75%, 89.43%]
Model Baseline: Mean=88.07% | 95% CI=[87.72%, 88.42%]
----------------------------------------------------
Pooled Standard Deviation : 0.485%
Ukuran Efek (Cohen's d)   : 2.10 (Efek Sangat Kuat jika > 0.8)
P-value Uji Hipotesis     : 3.6334e-04 (Signifikan)`},commonPitfalls:["Menampilkan grafik batang (bar chart) tanpa menyertakan error bar sama sekali.","Menggunakan deviasi standar sebagai pengganti interval kepercayaan tanpa keterangan yang jelas pada caption grafik.","Mengabaikan ukuran efek dan hanya berpatokan pada p-value."],validationProcedures:["Visualisasikan distribusi multi-seed menggunakan Violin Plot yang memperlihatkan sebaran seluruh titik data.","Sajikan tabel komparasi yang memuat nilai Mean, Median, SD, IQR, dan CI 95%.","Laporkan nilai Cohen's d atau Hedges' g untuk setiap perbandingan utama."],exercises:[{question:"Apa perbedaan mendasar dalam interpretasi antara deviasi standar (Standard Deviation) dan standar error (Standard Error of the Mean)?",hint:"Perhatikan apakah Anda mendeskripsikan variabilitas data sampel atau presisi estimasi parameter populasi.",answerExplanation:"Standar deviasi menggambarkan seberapa lebar variasi performa individual antar run atau seed. Standar error menggambarkan ketidakpastian dalam mengestimasi nilai rata-rata sejati populasi (seberapa jauh rata-rata sampel berfluktuasi jika eksperimen diulang berkali-kali)."},{question:"Kapan metrik Hedges' g wajib digunakan sebagai pengganti Cohen's d?",hint:"Perhatikan ukuran sampel penarikan seed (S < 20).",answerExplanation:"Hedges' g adalah versi terkoreksi bias dari Cohen's d untuk ukuran sampel kecil (S < 20). Cohen's d cenderung sedikit melebih-lebihkan besaran efek pada sampel kecil, dan Hedges' g mengalikannya dengan faktor koreksi J = 1 - 3/(4*df - 1)."}],references:[{citation:"Cumming, G. (2014). The new statistics: Why and how. Psychological Science, 25(1), 7-29.",type:"peer-reviewed-article"},{citation:"Agarwal, R., Schwarzer, M., Castro, P. S., Courville, A. C., & Bellemare, M. (2021). Deep reinforcement learning at the edge of the statistical precipice. NeurIPS, 34, 29304-29320.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Interval Kepercayaan Evaluasi Multi-Seed",bulletPoints:["Melaporkan mean saja menyesatkan: Wajib sertakan Interval Kepercayaan 95%.","Tumpang tindih interval kepercayaan: Indikasi ketiadaan perbedaan signifikan.","Gunakan Violin Plot untuk menyajikan sebaran distribusi empiris multi-seed."],keyFormulaOrDiagram:"\\text{CI}_{95\\%} = \\bar{y} \\pm t_{0.025, S-1} \\frac{s}{\\sqrt{S}}"},{slideNumber:2,title:"Kuantifikasi Ukuran Efek (Effect Size)",bulletPoints:["Cohen's d: Mengukur jarak perbaikan dinormalisasi oleh pooled standard deviation.","Signifikansi praktis: d > 0.8 membuktikan perbaikan melampaui noise seed.","Gunakan Hedges' g untuk koreksi bias pada sampel kecil (S < 20)."],keyFormulaOrDiagram:"d = \\frac{\\bar{y}_A - \\bar{y}_B}{s_\\text{pooled}}"}]},"5.6.4":{id:"5.6.4",chapterId:"CH-37",title:"Pelaporan Anggaran Komputasi (Compute Budget) dan Efisiensi Karbon/Daya",readingTimeMinutes:20,status:"verified",learningObjectives:["Mendokumentasikan anggaran komputasi total (Compute Budget) dalam GPU-hours atau FLOPs.","Mengukur konsumsi energi listrik dan jejak emisi karbon ekuivalen (CO2e) dari eksperimen komputasi.","Mematuhi panduan transparansi Green AI dan standar pelaporan efisiensi NeurIPS/ICLR."],content:`Komunitas ilmiah global semakin menaruh perhatian kritis terhadap jejak energi dan dampak lingkungan dari penelitian kecerdasan buatan ("Green AI", Schwartz et al., 2020). Melaporkan algoritma baru yang mencapai skor SOTA tanpa mencantumkan anggaran komputasi total yang dihabiskan untuk mencapainya adalah bentuk ketidakjujuran saintifik ("Red AI"). Sebuah metode yang membutuhkan 10.000 jam GPU untuk tuning hyperparameter demi kenaikan akurasi 0.1% memiliki kelayakan ekonomi dan ekologis yang dipertanyakan.

Pilar Pelaporan Anggaran Komputasi (Compute Budget Reporting):
1. Anggaran Komputasi Total Pelatihan (Total Training Budget):
Mencakup total jam komputasi prosesor (GPU-hours atau TPU-hours) yang dihabiskan selama seluruh siklus penelitian, termasuk fase eksplorasi awal, tuning hyperparameter, dan evaluasi multi-seed akhir.
2. Karakteristik Beban Perangkat Keras:
Tipe dan jumlah prosesor akselerator (misal 4x NVIDIA RTX A6000), TDP (Thermal Design Power) terpasang, dan efisiensi utilisasi GPU rata-rata.
3. Estimasi Jejak Karbon Emisi Ekuivalen ($CO_2e$):
Menghitung emisi gas rumah kaca yang dihasilkan berdasarkan intensitas karbon dari jaringan listrik lokal di lokasi klaster komputasi berada.

Alat Bantu Otomatisasi Terstandarisasi:
Peneliti didorong untuk mengintegrasikan pustaka pelacak energi otomatis seperti CodeCarbon atau Carbontracker ke dalam skrip eksperimen untuk mencatat konsumsi energi secara langsung dari sensor perangkat keras.`,mathematicalFoundations:`Formulasi Matematis Anggaran Energi dan Emisi Karbon:

1. Konsumsi Energi Listrik Total ($E_{\\text{total}}$):
$$E_{\\text{total}} = \\sum_{k=1}^K P_{\\text{avg}, k} \\cdot \\Delta t_k \\cdot \\text{PUE} \\quad \\text{[kWh]}$$
di mana:
- $P_{\\text{avg}, k}$: Rata-rata konsumsi daya perangkat keras pada run ke-$k$ (kW).
- $\\Delta t_k$: Durasi waktu komputasi run ke-$k$ (jam).
- $\\text{PUE}$: Power Usage Effectiveness dari pusat data (standar industri: $\\approx 1.2 - 1.5$).

2. Estimasi Emisi Karbon ($C_{\\text{emisi}}$):
$$C_{\\text{emisi}} = E_{\\text{total}} \\cdot I_{\\text{grid}} \\quad \\text{[kg } \\text{CO}_2\\text{e]}$$
di mana $I_{\\text{grid}}$ adalah intensitas karbon rata-rata jaringan listrik setempat (kg $\\text{CO}_2$/kWh). Sebagai rujukan:
- Jaringan listrik Indonesia (PLN): $I_{\\text{grid}} \\approx 0.75 - 0.85$ kg $\\text{CO}_2$/kWh.
- Jaringan energi terbarukan (misal Islandia/Norwegia): $I_{\\text{grid}} < 0.05$ kg $\\text{CO}_2$/kWh.`,workedExample:{problemStatement:"Sebuah proyek riset deep learning di ITERA menggunakan satu server dengan 2 unit GPU (masing-masing rata-rata daya 250 Watt) dan CPU/Motherboard (daya 150 Watt). Total durasi penelitian: 200 jam pelatihan dan tuning. Efisiensi data center PUE = 1.2. Faktor intensitas karbon jaringan listrik lokal adalah 0.80 kg CO2/kWh. Hitung total konsumsi energi dalam kWh dan total emisi karbon dalam kg CO2e.",stepByStepSolution:["Langkah 1: Hitung total daya sistem: P_total = (2 * 250 W) + 150 W = 500 W + 150 W = 650 Watt = 0.65 kW.","Langkah 2: Hitung konsumsi energi sistem mentah: E_raw = 0.65 kW * 200 jam = 130 kWh.","Langkah 3: Hitung total energi dengan faktor PUE: E_total = 130 kWh * 1.2 = 156 kWh.","Langkah 4: Hitung emisi karbon total: C_emisi = 156 kWh * 0.80 kg CO2/kWh = 124.8 kg CO2e."],resultInterpretation:"Eksperimen riset menghasilkan jejak emisi sebesar 124.8 kg CO2e (setara dengan perjalanan kendaraan bermotor sejauh ~600 km). Transparansi data ini wajib dicantumkan dalam lampiran naskah ilmiah."},pythonImplementation:{description:"Audit kalkulasi anggaran komputasi, konsumsi energi, dan emisi karbon riset.",libraryDependencies:["pandas"],code:`import pandas as pd

# [SIMULASI/SYNTHETIC DATA]
experiments = [
    {'Phase': 'Initial Prototyping', 'GPU_Type': 'RTX 3090', 'GPUs': 1, 'Hours': 40, 'Power_per_GPU_W': 280, 'Host_Power_W': 120},
    {'Phase': 'Hyperparameter Tuning', 'GPU_Type': 'RTX 3090', 'GPUs': 2, 'Hours': 120, 'Power_per_GPU_W': 300, 'Host_Power_W': 150},
    {'Phase': 'Final Multi-Seed Evaluation', 'GPU_Type': 'RTX 3090', 'GPUs': 2, 'Hours': 30, 'Power_per_GPU_W': 300, 'Host_Power_W': 150},
]

df = pd.DataFrame(experiments)
pue = 1.25  # Efisiensi fasilitas pendingin
grid_carbon_intensity = 0.82  # kg CO2/kWh (Jaringan transmisi lokal)

# Hitung energi per fase (kWh)
df['Total_Power_kW'] = (df['GPUs'] * df['Power_per_GPU_W'] + df['Host_Power_W']) / 1000.0
df['Energy_kWh'] = df['Total_Power_kW'] * df['Hours'] * pue
df['Carbon_kg_CO2e'] = df['Energy_kWh'] * grid_carbon_intensity
df['GPU_Hours'] = df['GPUs'] * df['Hours']

print("[SIMULASI/SYNTHETIC DATA] Laporan Anggaran Komputasi & Jejak Karbon Riset:")
print(df[['Phase', 'GPU_Hours', 'Energy_kWh', 'Carbon_kg_CO2e']].to_string(index=False))
print("-" * 55)
print(f"Total GPU-Hours Akumulatif : {df['GPU_Hours'].sum():.1f} GPU-hours")
print(f"Total Konsumsi Energi Listrik: {df['Energy_kWh'].sum():.2f} kWh")
print(f"Total Jejak Emisi Karbon    : {df['Carbon_kg_CO2e'].sum():.2f} kg CO2e")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Laporan Anggaran Komputasi & Jejak Karbon Riset:
                      Phase  GPU_Hours  Energy_kWh  Carbon_kg_CO2e
        Initial Prototyping         40       20.00          16.400
      Hyperparameter Tuning        240      112.50          92.250
Final Multi-Seed Evaluation         60       28.12          23.062
-------------------------------------------------------
Total GPU-Hours Akumulatif : 340.0 GPU-hours
Total Konsumsi Energi Listrik: 160.62 kWh
Total Jejak Emisi Karbon    : 131.71 kg CO2e`},commonPitfalls:["Menyembunyikan jumlah iterasi hyperparameter tuning yang masif dan hanya melaporkan waktu satu kali final run.","Tidak mencantumkan spesifikasi perangkat keras (GPU model, TDP, RAM) yang digunakan.","Mengklaim efisiensi tinggi tanpa data pengukuran konsumsi daya aktual."],validationProcedures:["Gunakan pustaka CodeCarbon atau Carbontracker untuk logging otomatis emisi.","Cantumkan tabel ringkasan Compute Budget di seksi Experimental Setup.","Diskusikan rasio efisiensi energi terhadap keuntungan akurasi dalam kerangka Green AI."],exercises:[{question:"Mengapa gerakan Green AI mengkritik keras tren riset yang hanya berfokus pada metrik akurasi puncak (peak accuracy)?",hint:"Kaitkan dengan biaya eksponensial dalam mencapai perbaikan marjinal yang kecil.",answerExplanation:"Gerakan Green AI menyoroti bahwa mengejar kenaikan 0.1% akurasi seringkali menuntut kelipatan 10x hingga 100x anggaran komputasi dan energi. Pendekatan ini eksklusif hanya untuk segelintir korporasi raksasa, memperparah emisi karbon global, dan menghasilkan sistem yang tidak efisien untuk penerapan praktis di dunia nyata."},{question:"Apa fungsi parameter Power Usage Effectiveness (PUE) dalam pemodelan konsumsi energi komputasi?",hint:"Perhatikan energi yang dibutuhkan untuk infrastruktur pendingin (chiller) dan transmisi gedung.",answerExplanation:"PUE adalah rasio total energi fasilitas pusat data dibagi energi yang dikonsumsi langsung oleh peralatan komputasi. Fasilitas membutuhkan daya tambahan untuk pendingin udara, kipas, lampu, dan sistem uninterruptible power supply (UPS). Nilai PUE = 1.25 berarti setiap 1 kWh energi komputasi membutuhkan tambahan 0.25 kWh untuk infrastruktur pendukung."}],references:[{citation:"Schwartz, R., Dodge, J., Smith, N. A., & Etzioni, O. (2020). Green AI. Communications of the ACM, 63(12), 54-63.",type:"peer-reviewed-article"},{citation:"Patterson, D., Gonzalez, J., Le, Q., Liang, C., et al. (2021). Carbon emissions and large neural network training. arXiv preprint arXiv:2104.10350.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Transparansi Anggaran Komputasi (Green AI)",bulletPoints:["Red AI vs Green AI: Tolak klaim performa yang menyembunyikan biaya energi.","Wajib melaporkan total GPU-hours seluruh siklus riset (termasuk tuning).","Spesifikasikan perangkat keras: Model GPU, TDP, dan alokasi memori."],keyFormulaOrDiagram:"E_\\text{total} = \\sum P_\\text{avg} \\cdot \\Delta t \\cdot \\text{PUE}"},{slideNumber:2,title:"Estimasi Jejak Karbon Riset",bulletPoints:["Hitung emisi ekuivalen: Faktor intensitas karbon transmisi regional.","Gunakan perangkat lunak pelacak otomatis (CodeCarbon).","Tunjukkan komitmen terhadap penelitian yang ramah lingkungan dan bertanggung jawab."],keyFormulaOrDiagram:"C_\\text{emisi} = E_\\text{total} \\cdot I_\\text{grid} \\quad [\\text{kg CO}_2\\text{e}]"}]}};export{a as CH37_LESSONS};
