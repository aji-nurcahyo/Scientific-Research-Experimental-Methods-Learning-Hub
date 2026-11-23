const a={"5.2.1":{id:"5.2.1",chapterId:"CH-33",title:"Kriteria Pemilihan Baseline Pembanding yang Kredibel dan Terkini (Bukan Toy Baselines)",readingTimeMinutes:20,status:"verified",learningObjectives:["Menetapkan kriteria pemilihan baseline pembanding yang kredibel dan berstandar internasional.","Mengidentifikasi taktik manipulasi ilmiah strawman baseline (toy baselines) dalam publikasi rekayasa.","Menyusun portofolio baseline multi-lapisan: naive baseline, standar industri mapan, dan model state-of-the-art (SOTA)."],content:`Klaim kontribusi ilmiah dalam rekayasa komputasi dan kecerdasan artifisial selalu bersifat komparatif: sebuah metode baru diklaim berharga karena memiliki akurasi yang lebih tinggi, latensi yang lebih rendah, atau kebutuhan memori yang lebih efisien dibandingkan metode yang sudah ada. Namun, validitas klaim ini sepenuhnya runtuh jika baseline pembanding yang digunakan tidak representatif atau sengaja diperlemah.

Praktik Manipulasi Ilmiah "Strawman Baseline":
Taktik yang sering ditemukan dalam manuskrip berkualitas rendah adalah membandingkan algoritma deep learning mutakhir yang dirancang penulis hanya dengan Multi-Layer Perceptron (MLP) sederhana dari tahun 1990 atau k-NN tanpa tuning hyperparameter (strawman baseline). Dengan mengalahkan baseline usang tersebut, penulis mengklaim telah menciptakan terobosan. Praktik ini secara langsung melanggar integritas ilmiah.

Taksonomi Portofolio Baseline Wajib:
Sebuah eksperimen komputasi bereputasi tinggi wajib menyertakan minimal 3 lapisan baseline:
1. Baseline Kanonikal Naive (Lower Bound): Metode paling sederhana untuk memastikan masalah memang memerlukan solusi kompleks (misalnya regresi linier, majority class voting, atau moving average).
2. Standar Industri Mapan (Established Industry Standard): Algoritma yang secara luas menjadi tulang punggung operasional di industri terkait (misalnya XGBoost atau LightGBM pada data tabular, ResNet-50 pada visi komputer).
3. Kompetitor Kontemporer State-of-the-Art (Direct Competitors): 2 hingga 4 metode terbaru dari literatur jurnal atau konferensi top dalam 2-3 tahun terakhir yang memecahkan masalah identik.`,mathematicalFoundations:`Kriteria Rasio Peningkatan Kinerja Relatif Terstandarisasi:
Misalkan $M(f)$ adalah metrik kinerja (misal F1-score atau mAP di mana nilai lebih tinggi lebih baik).
Diberikan:
- $M_{\\text{naive}}$: Kinerja baseline paling sederhana.
- $M_{\\text{SOTA}}$: Kinerja pembanding terbaik terkini.
- $M_{\\text{prop}}$: Kinerja metode yang diusulkan.

Peningkatan Relatif Terhadap SOTA ($R_{\\text{SOTA}}$):
$$R_{\\text{SOTA}} = \\frac{M_{\\text{prop}} - M_{\\text{SOTA}}}{M_{\\text{SOTA}}} \\times 100\\%$$

Peningkatan Relatif Terhadap Rentang Kelayakan (Feasible Headroom Improvement, $H$):
Jika $M_{\\max}$ adalah batas teoretis maksimum (misal 1.0 atau 100%):
$$H = \\frac{M_{\\text{prop}} - M_{\\text{SOTA}}}{M_{\\max} - M_{\\text{SOTA}}} \\times 100\\%$$
Metrik $H$ mengukur berapa persen dari sisa ruang kesalahan (error headroom) yang berhasil ditutup oleh metode yang diusulkan.`,workedExample:{problemStatement:"Pada deteksi cacat permukaan logam, sebuah baseline SOTA memiliki mAP 0.920 (92.0%). Metode yang Anda usulkan mencapai mAP 0.936 (93.6%). Hitung kenaikan relatif standar (R_SOTA) dan persentase penutupan sisa ruang kesalahan (Feasible Headroom Improvement H). Interpretasikan hasilnya.",stepByStepSolution:["Langkah 1: Hitung peningkatan relatif standar terhadap SOTA: R_SOTA = ((0.936 - 0.920) / 0.920) * 100% = (0.016 / 0.920) * 100% = 1.74%.","Langkah 2: Tentukan batas teoretis maksimum mAP: M_max = 1.000.","Langkah 3: Hitung sisa ruang kesalahan SOTA: Headroom = 1.000 - 0.920 = 0.080 (8.0%).","Langkah 4: Hitung penutupan headroom (H): H = (0.016 / 0.080) * 100% = 20.0%."],resultInterpretation:"Meskipun kenaikan nominal hanya 1.6% (atau 1.74% relatif), metode yang diusulkan berhasil memangkas 20% dari total sisa kesalahan yang belum terpecahkan oleh model terbaik di dunia."},pythonImplementation:{description:"Audit komparasi multi-baseline dengan metrik headroom reduction.",libraryDependencies:["numpy","pandas"],code:`import numpy as np
import pandas as pd

# [SIMULASI/SYNTHETIC DATA]
baselines = {
    'Naive Baseline (Majority)': 0.520,
    'Industry Standard (ResNet-50)': 0.865,
    'Recent SOTA 1 (ConvNeXt-T)': 0.912,
    'Recent SOTA 2 (Swin-T)': 0.924,
    'Proposed Method (Ours)': 0.941
}

sota_score = baselines['Recent SOTA 2 (Swin-T)']
max_possible = 1.000

results = []
for name, score in baselines.items():
    rel_improvement = ((score - sota_score) / sota_score) * 100
    headroom_closed = ((score - sota_score) / (max_possible - sota_score)) * 100 if score >= sota_score else np.nan
    results.append({
        'Model': name,
        'Metric Score': score,
        'Rel. to SOTA (%)': rel_improvement,
        'Headroom Closed (%)': headroom_closed
    })

df = pd.DataFrame(results)
print("[SIMULASI/SYNTHETIC DATA] Audit Portofolio Baseline:")
print(df.to_string(index=False))
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Audit Portofolio Baseline:
                         Model  Metric Score  Rel. to SOTA (%)  Headroom Closed (%)
     Naive Baseline (Majority)         0.520        -43.722944                  NaN
 Industry Standard (ResNet-50)         0.865         -6.385281                  NaN
        Recent SOTA 1 (ConvNeXt-T)         0.912         -1.298701                  NaN
          Recent SOTA 2 (Swin-T)         0.924          0.000000             0.000000
         Proposed Method (Ours)         0.941          1.839827            22.368421`},commonPitfalls:["Membandingkan model baru hanya dengan pustaka default tanpa men-tuning parameter baseline sama sekali.","Menggunakan arsitektur pembanding yang dipublikasikan lebih dari 10 tahun lalu sebagai satu-satunya rujukan SOTA.","Melatih baseline dengan jumlah epoch atau ukuran batch yang jauh lebih sedikit daripada metode sendiri."],validationProcedures:["Alokasikan komputasi tuning yang setara (computational budget parity) untuk setiap baseline pembanding.","Verifikasi bahwa implementasi baseline mereproduksi performa yang dilaporkan pada makalah aslinya.","Cantumkan nomor versi, repositori resmi, dan konfigurasi hyperparameter lengkap untuk seluruh baseline."],exercises:[{question:"Mengapa membandingkan model kompleks dengan parameter default baseline dianggap sebagai bentuk kecurangan ilmiah terselubung?",hint:"Perhatikan potensi performa baseline jika dioptimasi dengan baik.",answerExplanation:"Sebagian besar pustaka menyertakan hyperparameter default yang konservatif. Jika penulis menghabiskan waktu berhari-hari mengoptimasi model usulan sendiri namun membiarkan baseline menggunakan parameter default yang sub-optimal, selisih performa yang terjadi mencerminkan ketidakadilan alokasi optimasi, bukan keunggulan arsitektur."},{question:"Kapan sebuah naive baseline sederhana (misal rata-rata historis) wajib ditampilkan dalam makalah?",hint:"Pikirkan tentang justifikasi kompleksitas algoritma.",answerExplanation:"Naive baseline wajib selalu ditampilkan untuk membuktikan bahwa masalah yang diteliti memang non-trivial. Jika model deep learning bernilai miliaran rupiah hanya unggul 0.5% dari rata-rata historis sederhana, kontribusi praktisnya patut dipertanyakan."}],references:[{citation:"Lipton, Z. C., & Steinhardt, J. (2019). Troubling trends in machine learning scholarship. Communications of the ACM, 62(12), 45-53.",type:"peer-reviewed-article"},{citation:"Bouthillier, X., Delaunay, P., Laurent, C., Bouthillier, V., et al. (2021). Accounting for variance in machine learning benchmarks. MLSys, 3, 747-769.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Integritas Pemilihan Baseline Komparasi",bulletPoints:["Klaim ilmiah bersifat komparatif: Nilai kontribusi ditentukan oleh kualitas pembanding.","Bahaya Strawman Baseline: Mengalahkan model usang bukan bukti kontribusi nyata.","Portofolio Tiga Lapis: Naive baseline, Standar Industri, dan SOTA mutakhir."],keyFormulaOrDiagram:"H = \\frac{M_\\text{prop} - M_\\text{SOTA}}{M_\\max - M_\\text{SOTA}} \\times 100\\%"},{slideNumber:2,title:"Prinsip Keadilan Anggaran Komputasi",bulletPoints:["Alokasikan waktu tuning yang adil untuk seluruh baseline pembanding.","Gunakan repositori dan bobot resmi terverifikasi dari pengembang asli.","Laporkan metrik penutupan ruang kesalahan (Headroom Closed)."],keyFormulaOrDiagram:"\\text{Budget}(B_1) = \\text{Budget}(B_2) = \\text{Budget}(\\text{Ours})"}]},"5.2.2":{id:"5.2.2",chapterId:"CH-33",title:"Masalah Kontaminasi Data Benchmark Publik (Benchmark Overfitting)",readingTimeMinutes:20,status:"verified",learningObjectives:["Menganalisis fenomena adaptive overfitting pada dataset benchmark publik standar.","Memahami implikasi uji hipotesis berulang (multiple testing) oleh komunitas riset global pada satu test set tetap.","Merancang protokol evaluasi out-of-benchmark untuk membuktikan kemampuan generalisasi sejati."],content:`Dalam ekosistem riset pembelajaran mesin global, dataset benchmark standar seperti ImageNet, CIFAR-10, KITTI, atau MIMIC-III memainkan peran penting dalam memacu inovasi. Namun, penggunaan dataset uji yang sama selama bertahun-tahun oleh ribuan peneliti menghasilkan anomali epistemologis yang disebut Benchmark Overfitting atau Adaptive Overfitting.

Mekanisme Adaptive Overfitting (Dwork et al., 2015):
Secara teoretis, data uji (test set) hanya boleh dievaluasi tepat satu kali untuk mempertahankan jaminan generalisasi statistik. Namun dalam praktiknya, komunitas ilmiah global mengevaluasi jutaan arsitektur pada test set publik yang sama, mempublikasikan arsitektur yang menang secara marjinal, dan mengabaikan arsitektur yang kalah. Melalui proses seleksi alam publikasi ini, arsitektur-arsitektur modern secara adaptif mengalami overfitting terhadap keunikan dan derau spesifik dari test set publik tersebut.

Studi Recht et al. (2019) "Do ImageNet Classifiers Generalize to ImageNet?":
Para peneliti membuat dataset uji baru (ImageNet-v2) yang dikumpulkan dengan mengikuti protokol sampling identik dengan ImageNet asli. Hasilnya sangat mengejutkan: seluruh model SOTA teratas mengalami penurunan akurasi absolut antara 11% hingga 14% pada dataset baru tersebut. Hal ini membuktikan bahwa sebagian besar skor tinggi pada benchmark publik adalah hasil adaptasi terhadap artefak sampling, bukan generalisasi konsep visual yang sesungguhnya.`,mathematicalFoundations:`Pelemahan Jaminan Generalisasi Akibat Pengujian Adaptif:
Dalam kerangka statistik klasik, batas selisih antara risiko empiris data uji $\\hat{R}_N(f)$ dan risiko populasi sejati $R(f)$ untuk hipotesis tunggal $f$ berukuran sampel $N$ diatur oleh ketidaksamaan Hoeffding:
$$P(|\\hat{R}_N(f) - R(f)| > \\epsilon) \\leq 2e^{-2N\\epsilon^2}$$

Namun jika sebuah rangkaian $K$ model adaptif \${f_1, f_2, \\dots, f_K}$ dievaluasi secara sekuensial pada test set yang sama di mana model ke-$k$ dirancang berdasarkan umpan balik performa model ke-$(k-1)$, batas kesalahan terdegenerasi secara eksponensial terhadap kedalaman adaptasi. Berdasarkan Teorema Generalisasi Diferensial Privasi (Dwork et al., 2015):
Ukuran sampel yang dibutuhkan untuk mencegah overfitting adaptif berskala:
$$N = \\mathcal{O}(\\sqrt{K})$$
Jika komunitas menguji $K = 100.000$ model pada test set berukuran $N=10.000$, degradasi performa di dunia nyata menjadi tak terhindarkan.`,workedExample:{problemStatement:"Sebuah model inspeksi visual pabrik mencapai akurasi 98.5% pada dataset benchmark publik PCB defect. Namun saat diuji pada 500 papan PCB yang baru diproduksi hari ini di pabrik yang sama, akurasi turun menjadi 88.0%. Berikan penjelasan ilmiah mengenai 2 faktor utama penyebab degradasi ini.",stepByStepSolution:["Langkah 1: Faktor 1 (Benchmark Overfitting): Model telah mengoptimalkan representasi visualnya pada sudut pencahayaan, posisi kamera, dan artefak kompresi gambar yang spesifik terdapat pada dataset benchmark PCB publik.","Langkah 2: Faktor 2 (Pergeseran Distribusi Mikro): Produksi hari ini memiliki variasi batch solder baru, perbedaan suhu ruang, atau sedikit pergeseran fokus optik mikroskop (covariate shift) yang tidak terwakili dalam benchmark statis.","Langkah 3: Evaluasi metodologis: Peneliti melakukan kesalahan dengan mengasumsikan test set benchmark publik mewakili seluruh domain fisik operasional."],resultInterpretation:"Peneliti wajib menguji model pada cross-domain dataset independen untuk memvalidasi klaim keandalan industri."},pythonImplementation:{description:"Simulasi degradasi performa model akibat pengujian adaptif berulang pada satu test set tetap.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np

# [SIMULASI/SYNTHETIC DATA]
# Simulasi 1000 iterasi penelitian komunitas pada test set berukuran N=200
np.random.seed(42)
N_test = 200
true_quality = 0.80  # Kualitas sejati model di populasi (80%)

# Komunitas mencoba 500 variasi arsitektur yang sebenarnya memiliki kualitas identik
n_architectures = 500
test_results = []
pop_errors = []

for i in range(n_architectures):
    # Setiap model memprediksi 200 sampel uji
    sample_acc = np.mean(np.random.binomial(1, true_quality, size=N_test))
    test_results.append(sample_acc)

# Komunitas mempublikasikan model yang memenangkan papan peringkat (leaderboard)
best_reported_acc = np.max(test_results)
best_model_idx = np.argmax(test_results)

# Uji model pemenang tersebut pada dataset uji baru independen (fresh test set)
fresh_test_acc = np.mean(np.random.binomial(1, true_quality, size=N_test))

print(f"[SIMULASI/SYNTHETIC DATA] Forensik Adaptive Benchmark Overfitting:")
print(f"Kualitas Sejati Model di Populasi         : {true_quality:.4f}")
print(f"Skor Juara Leaderboard Publik             : {best_reported_acc:.4f} (Optimisme Semu!)")
print(f"Performa Juara pada Dataset Baru Mandiri  : {fresh_test_acc:.4f}")
print(f"Penurunan Performa Absolut (Drop)         : {(best_reported_acc - fresh_test_acc)*100:.2f}%")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Forensik Adaptive Benchmark Overfitting:
Kualitas Sejati Model di Populasi         : 0.8000
Skor Juara Leaderboard Publik             : 0.8850 (Optimisme Semu!)
Performa Juara pada Dataset Baru Mandiri  : 0.7950
Penurunan Performa Absolut (Drop)         : 9.00%`},commonPitfalls:["Menganggap bahwa akurasi tinggi pada satu benchmark publik membuktikan keunggulan universal model.","Menggunakan data uji benchmark secara berulang untuk menentukan kapan training epoch harus dihentikan (early stopping on test set).","Mengabaikan keberadaan label yang salah atau ambigu di dalam dataset benchmark populer."],validationProcedures:["Gunakan minimal 2 hingga 3 dataset independen dari sumber berbeda untuk mengevaluasi klaim arsitektur baru.","Kumpulkan dataset uji baru yang diambil dari lingkungan fisik aktual (zero-shot transfer atau out-of-domain evaluation).","Audit konsistensi label benchmark menggunakan metode Confident Learning untuk mengidentifikasi label noise."],exercises:[{question:"Apa temuan utama studi Recht et al. (2019) mengenai reproduksibilitas akurasi ImageNet pada ImageNet-v2?",hint:"Fokus pada penurunan akurasi absolut di seluruh arsitektur model.",answerExplanation:"Studi menemukan bahwa seluruh model klasifikasi (dari AlexNet hingga ResNet mutakhir) mengalami penurunan akurasi absolut 11% hingga 14% ketika diuji pada ImageNet-v2, membuktikan adanya overfitting komunitas terhadap karakteristik spesifik set uji asli."},{question:"Bagaimana cara seorang peneliti membuktikan bahwa arsitekturnya tidak mengalami benchmark overfitting?",hint:"Pikirkan evaluasi lintas domain atau cross-dataset validation.",answerExplanation:"Peneliti dapat menguji model yang dilatih pada Benchmark A langsung pada Benchmark B dan C tanpa penyesuaian bobot tambahan (cross-dataset evaluation) untuk menunjukkan generalisasi representasi fitur sejati."}],references:[{citation:"Recht, B., Roelofs, R., Schmidt, L., & Shankar, V. (2019). Do ImageNet classifiers generalize to ImageNet?. ICML, 5389-5400.",type:"peer-reviewed-article"},{citation:"Dwork, C., Feldman, V., Hardt, M., Pitassi, T., Reingold, O., & Roth, A. (2015). The reusable holdout: Preserving validity in adaptive data analysis. Science, 349(6248), 636-638.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Krisis Kontaminasi Benchmark Publik",bulletPoints:["Prinsip statistik: Test set hanya boleh dievaluasi tepat satu kali.","Realitas komunitas: Ribuan peneliti mengevaluasi test set yang sama berulang kali.","Hasil: Seleksi alam publikasi melahirkan adaptive benchmark overfitting."],keyFormulaOrDiagram:"N = \\mathcal{O}(\\sqrt{K}) \\implies \\text{Perlu } N \\text{ masif jika } K \\text{ besar}"},{slideNumber:2,title:"Strategi Mitigasi Epistemologis",bulletPoints:["Evaluasi Multi-Dataset: Evaluasi wajib dilakukan minimal pada 3 dataset independen.","Cross-Domain Transfer: Uji model pada dataset dari sensor atau laboratorium berbeda.","Audit Kualitas Anotasi: Bersihkan label noise sebelum menarik kesimpulan keunggulan."],keyFormulaOrDiagram:"\\Delta_\\text{generalization} = \\text{Score}_\\text{public} - \\text{Score}_\\text{independent}"}]},"5.2.3":{id:"5.2.3",chapterId:"CH-33",title:"Standardisasi Metrik Evaluasi Kinerja (Akurasi, F1, Latensi, Efisiensi Energi)",readingTimeMinutes:20,status:"verified",learningObjectives:["Memilih metrik evaluasi statistik yang tepat berdasarkan karakteristik distribusi data dan utilitas aplikasi.","Membedakan Macro-F1, Micro-F1, dan Weighted-F1 pada skenario ketidakseimbangan kelas.","Mengintegrasikan metrik komputasi fisik: Throughput, Latensi P99, Footprint Memori, dan Konsumsi Energi (Joules/Inference)."],content:`Dalam riset rekayasa, menilai performa sistem hanya berdasarkan satu metrik statistik tunggal (seperti akurasi klasifikasi) adalah indikasi kedangkalan analisis ilmiah. Akurasi 99% tidak memiliki makna informatif jika 99% dari data sampel memang termasuk dalam kelas normal (kejadian anomali hanya 1%). Selain itu, sebuah algoritma yang unggul 0.5% dalam akurasi namun membutuhkan memori 100 kali lebih besar dan latensi 10 kali lebih lambat tidak layak diterapkan dalam sistem rekayasa nyata.

Matriks Metrik Kinerja Multidimensi:
1. Metrik Kualitas Prediksi (Predictive Quality):
- Precision dan Recall: Mengukur keseimbangan antara kepastian temuan dan kelengkapan deteksi.
- Macro-F1 vs Micro-F1: Macro-F1 menghitung rata-rata aritmatika unweighted dari F1 setiap kelas, memberikan bobot yang setara untuk kelas langka. Sebaliknya, Micro-F1 menghitung total agregat True Positives global, sehingga didominasi oleh kelas mayoritas.
- Area Under the Precision-Recall Curve (PR-AUC): Jauh lebih informatif dan tahan terhadap ketidakseimbangan kelas ekstrem dibandingkan ROC-AUC.

2. Metrik Efisiensi Komputasi Fisik (Operational Quality):
- Latensi Rata-rata dan P99 (Percentile 99): Mengukur batas keterlambatan terburuk sistem untuk aplikasi real-time.
- Kebutuhan Komputasi Algoritmik: Floating-Point Operations (FLOPs) dan jumlah parameter terbobot.
- Konsumsi Energi Fisik: Energi per inferensi yang diukur langsung pada antarmuka daya keras (Joules/inferensi atau Watt-jam).`,mathematicalFoundations:`Formulasi Matematis Metrik Multidimensi:

1. Macro-Averaged F1 vs Micro-Averaged F1 untuk $C$ Kelas:
$$\\text{Precision}_c = \\frac{\\text{TP}_c}{\\text{TP}_c + \\text{FP}_c}, \\quad \\text{Recall}_c = \\frac{\\text{TP}_c}{\\text{TP}_c + \\text{FN}_c}$$
$$F_{1, c} = 2 \\cdot \\frac{\\text{Precision}_c \\cdot \\text{Recall}_c}{\\text{Precision}_c + \\text{Recall}_c}$$
$$\\text{Macro-F1} = \\frac{1}{C} \\sum_{c=1}^C F_{1, c}$$
$$\\text{Micro-F1} = \\frac{2 \\sum_{c=1}^C \\text{TP}_c}{2 \\sum_{c=1}^C \\text{TP}_c + \\sum_{c=1}^C \\text{FP}_c + \\sum_{c=1}^C \\text{FN}_c}$$

2. Metrik Efisiensi Energi Spesifik ($E_{\\text{inf}}$):
Jika daya listrik seketika $P(t)$ (Watt) diukur selama durasi waktu inferensi $T$ (detik):
$$E_{\\text{inf}} = \\int_0^T P(t) \\, dt \\quad \\text{[Joules/Inference]}$$

3. Trade-off Pareto Multikriteria (Efisiensi vs Kualitas):
Model $A$ mendominasi model $B$ secara Pareto ($A \\succ B$) jika dan hanya jika:
$$\\text{Macro-F1}(A) \\geq \\text{Macro-F1}(B) \\quad \\land \\quad E_{\\text{inf}}(A) \\leq E_{\\text{inf}}(B)$$
dengan minimal satu ketidaksamaan tegas.`,workedExample:{problemStatement:"Pada dataset klasifikasi 3-kelas: Kelas 0 (90 sampel), Kelas 1 (5 sampel), Kelas 2 (5 sampel). Sebuah model memprediksi seluruh sampel sebagai Kelas 0. Hitung Akurasi, Micro-F1, dan Macro-F1 dari model tersebut. Jelaskan mengapa Macro-F1 wajib dilaporkan.",stepByStepSolution:["Langkah 1: Hitung TP, FP, FN untuk setiap kelas: Kelas 0: TP=90, FP=10, FN=0; Kelas 1: TP=0, FP=0, FN=5; Kelas 2: TP=0, FP=0, FN=5.","Langkah 2: Hitung Akurasi global: Akurasi = (90 + 0 + 0) / 100 = 90.0%.","Langkah 3: Hitung Micro-F1: Total TP = 90, Total FP = 10, Total FN = 10. Micro-F1 = (2 * 90) / (2 * 90 + 10 + 10) = 180 / 200 = 0.900 (90.0%).","Langkah 4: Hitung F1 per kelas: F1_0 = (2 * 90/100 * 90/90) / (90/100 + 90/90) = (2 * 0.9 * 1.0) / 1.9 = 1.8 / 1.9 = 0.947; F1_1 = 0.000; F1_2 = 0.000.","Langkah 5: Hitung Macro-F1: Macro-F1 = (0.947 + 0.0 + 0.0) / 3 = 0.3157 (31.6%)."],resultInterpretation:"Akurasi dan Micro-F1 (90%) memberikan kesan palsu bahwa model sangat baik, padahal model sama sekali gagal mendeteksi Kelas 1 dan Kelas 2. Macro-F1 (31.6%) secara jujur mencerminkan kegagalan total model pada kelas-kelas kritis."},pythonImplementation:{description:"Perhitungan komparasi metrik kualitas prediksi dan pengukuran latensi P99.",libraryDependencies:["numpy","sklearn.metrics","time"],code:`import numpy as np
import time
from sklearn.metrics import accuracy_score, f1_score

# [SIMULASI/SYNTHETIC DATA]
# 100 sampel klasifikasi 3-kelas dengan ketidakseimbangan ekstrem
y_true = np.array([0]*90 + [1]*5 + [2]*5)
y_pred_dummy = np.zeros(100, dtype=int)  # Memprediksi selalu kelas 0

acc = accuracy_score(y_true, y_pred_dummy)
micro_f1 = f1_score(y_true, y_pred_dummy, average='micro')
macro_f1 = f1_score(y_true, y_pred_dummy, average='macro')

# Simulasi profil latensi inferensi (1.000 panggilan batch)
latencies = np.random.normal(loc=12.0, scale=2.5, size=1000)  # dalam milidetik
latencies = np.clip(latencies, 5.0, 50.0)  # hilangkan nilai negatif
p50 = np.percentile(latencies, 50)
p95 = np.percentile(latencies, 95)
p99 = np.percentile(latencies, 99)

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Metrik Terstandarisasi:")
print(f"Akurasi Sederhana       : {acc*100:.2f}% (Menyesatkan pada Imbalance)")
print(f"Micro-Averaged F1       : {micro_f1*100:.2f}% (Didominasi Kelas Mayoritas)")
print(f"Macro-Averaged F1       : {macro_f1*100:.2f}% (Mencerminkan Kinerja Sejati)")
print(f"--- Profil Latensi Komputasi (ms) ---")
print(f"Median (P50)            : {p50:.2f} ms")
print(f"Percentile 95 (P95)     : {p95:.2f} ms")
print(f"Worst-Case Tail (P99)   : {p99:.2f} ms")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Metrik Terstandarisasi:
Akurasi Sederhana       : 90.00% (Menyesatkan pada Imbalance)
Micro-Averaged F1       : 90.00% (Didominasi Kelas Mayoritas)
Macro-Averaged F1       : 31.58% (Mencerminkan Kinerja Sejati)
--- Profil Latensi Komputasi (ms) ---
Median (P50)            : 11.96 ms
Percentile 95 (P95)     : 16.03 ms
Worst-Case Tail (P99)   : 18.06 ms`},commonPitfalls:["Melaporkan akurasi sederhana pada dataset dengan ketidakseimbangan kelas ekstrem.","Hanya mengukur latensi rata-rata dan mengabaikan tail latency (P99) yang krusial bagi sistem real-time.","Mengukur waktu eksekusi tanpa fase warm-up GPU/CPU, yang mencampuradukkan waktu inisialisasi modul."],validationProcedures:["Gunakan Macro-F1 atau PR-AUC sebagai metrik primer untuk data tidak seimbang.","Sertakan kurva batas Pareto (Pareto Frontier) yang memetakan Macro-F1 vs Latensi/FLOPs.","Lakukan pengulangan minimal 100 kali inferensi dengan pemanasan awal (warm-up) sebelum mencatat waktu eksekusi."],exercises:[{question:"Mengapa dalam sistem kendali otomotif atau robotika otonom, latensi persentil ke-99 (P99) jauh lebih penting daripada latensi rata-rata?",hint:"Pikirkan konsekuensi keterlambatan respons rem pada kondisi terburuk.",answerExplanation:"Dalam sistem keselamatan kritis (safety-critical), keterlambatan satu kali saja pada skenario terburuk (tail latency) dapat menyebabkan kegagalan fisik fatal atau tabrakan. Latensi rata-rata dapat menyembunyikan lonjakan delay ekstrem akibat garbage collection atau thread contention."},{question:"Kapan kurva PR-AUC (Precision-Recall) lebih direkomendasikan daripada ROC-AUC?",hint:"Perhatikan pengaruh jumlah True Negatives yang sangat besar pada False Positive Rate.",answerExplanation:"PR-AUC sangat direkomendasikan ketika kelas positif sangat langka. ROC-AUC melibatkan False Positive Rate yang membagi dengan True Negatives yang masif, sehingga kurva ROC dapat tampak luar biasa optimis meskipun model menghasilkan banyak sekali False Positives."}],references:[{citation:"Saito, T., & Rehmsmeier, M. (2015). The precision-recall plot is more informative than the ROC plot when evaluating imbalanced datasets. PloS ONE, 10(3), e0118432.",type:"peer-reviewed-article"},{citation:"Canesi, E. et al. (2023). A survey on energy efficiency in deep learning: Metrics, benchmarks, and techniques. ACM Computing Surveys, 55(14), 1-38.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Standarisasi Metrik Kinerja Multidimensi",bulletPoints:["Akurasi menyesatkan pada data kelas tidak seimbang.","Macro-F1 memberikan bobot yang setara untuk kelas langka dan kritis.","PR-AUC lebih informatif dibandingkan ROC-AUC pada deteksi anomali."],keyFormulaOrDiagram:"\\text{Macro-F1} = \\frac{1}{C} \\sum_{c=1}^C F_{1, c}"},{slideNumber:2,title:"Karakterisasi Kinerja Fisik & Energi",bulletPoints:["Latensi P99: Mengukur keandalan sistem pada kasus keterlambatan terburuk.","Konsumsi Energi: Ukur daya fisik langsung (Joules per inferensi).","Analisis Pareto: Evaluasi trade-off optimal antara akurasi dan kompleksitas."],keyFormulaOrDiagram:"E_\\text{inf} = \\int_0^T P(t) \\, dt \\quad [\\text{Joules/Inference}]"}]},"5.2.4":{id:"5.2.4",chapterId:"CH-33",title:"Protokol Pelaksanaan Benchmark Komputasi yang Adil dan Terkontrol",readingTimeMinutes:20,status:"verified",learningObjectives:["Menyusun protokol benchmark komputasi yang menjamin keadilan lingkungan dan keterulangan pengujian.","Mengontrol variabel pengganggu perangkat keras (thermal throttling, background processes, power states).","Mendokumentasikan kartu spesifikasi benchmark (Hardware & Environment Manifest) berstandar ACM."],content:`Membandingkan efisiensi komputasi dari dua algoritma yang berbeda membutuhkan ketelitian kontrol lingkungan yang setara dengan eksperimen fisika presisi tinggi. Seringkali perbedaan kecepatan eksekusi 20% yang diklaim sebagai keunggulan algoritma sebenarnya hanya disebabkan oleh perbedaan fluktuasi termal CPU (thermal throttling), intervensi thread sistem operasi di latar belakang, atau alokasi memori yang tidak dihangatkan (cold cache).

Variabel Pengganggu dalam Benchmark Komputasi:
1. Pemanasan Cache dan GPU JIT (Cold vs Warm Execution):
Eksekusi pertama dari sebuah model selalu memakan waktu jauh lebih lama akibat inisialisasi CUDA context, alokasi memori dinamis, dan kompilasi graf komputasi (JIT compilation). Mengikutsertakan eksekusi pertama ke dalam rata-rata akan merusak estimasi latensi.

2. Fluktuasi Frekuensi Jam (Dynamic Frequency Scaling / Turboboost):
Prosesor modern secara dinamis menaikkan frekuensi jam saat beban kerja dimulai, kemudian menurunkan frekuensi saat suhu chip meningkat (thermal throttling). Jika metode A diuji saat prosesor masih dingin dan metode B diuji setelah prosesor memanas, metode B akan tampak lebih lambat secara tidak adil.

3. Alokasi Memori dan Garbage Collection (GC):
Bahasa pemrograman tingkat tinggi seperti Python atau Java memicu garbage collection secara acak. Benchmark wajib mengontrol siklus GC agar tidak tumpang tindih secara timpang tindih di salah satu algoritma saja.`,mathematicalFoundations:`Model Komparasi Kinerja Komputasi Terkontrol:
Waktu eksekusi teramati $T_{\\text{obs}}$ dari algoritma $A$ pada iterasi ke-$i$ dapat dimodelkan sebagai:
$$T_{\\text{obs}, i}(A) = T_{\\text{det}}(A) + \\epsilon_{\\text{env}, i} + \\delta_{\\text{thermal}}(t_i)$$
di mana:
- $T_{\\text{det}}(A)$: Kompleksitas waktu deterministik intrinsik algoritma.
- $\\epsilon_{\\text{env}, i} \\sim \\mathcal{N}(0, \\sigma_{\\text{sys}}^2)$: Derau acak sistem operasi.
- $\\delta_{\\text{thermal}}(t_i)$: Komponen degradasi akibat panas akumulatif.

Protokol Standardisasi Pengukuran:
1. Fase Stabilisasi Termal dan Pemanasan (Warm-up Phase):
$$i \\in \\{1, \\dots, W\\} \\implies \\text{abaikan pengukuran}$$
2. Fase Pengukuran Berulang Teracak (Interleaved Random Execution):
Alih-alih menguji model A 100 kali berturut-turut lalu model B 100 kali, eksekusi dilakukan secara berselang-seling teracak:
$$\\text{Urutan: } A, B, B, A, B, A, A, B, \\dots$$
Strategi ini mendistribusikan efek thermal throttling dan background load secara simetris ke seluruh metode.`,workedExample:{problemStatement:"Jelaskan mengapa mengeksekusi Algoritma A sebanyak 100 kali pada jam 08:00 pagi, lalu mengeksekusi Algoritma B sebanyak 100 kali pada jam 12:00 siang di workstation laboratorium yang sama dapat menghasilkan kesimpulan komparasi latensi yang invalid.",stepByStepSolution:["Langkah 1: Perubahan suhu lingkungan laboratorium: Suhu ruang pada jam 12:00 siang umumnya lebih tinggi daripada jam 08:00 pagi, mempengaruhi efektivitas pendinginan heatsink.","Langkah 2: Beban sistem operasi dan jaringan: Pada siang hari, proses background pengguna lain atau pembaruan otomatis sistem operasi lebih aktif.","Langkah 3: Thermal throttling: Workstation mungkin telah beroperasi selama 4 jam penuh pada jam 12:00, menyebabkan batas frekuensi prosesor (thermal limit) tertekan ke batas bawah.","Langkah 4: Solusi ilmiah: Pengujian wajib dijalankan dalam satu sesi eksekusi terkontrol dengan skema interleaved random scheduling dan pencatatan log suhu CPU/GPU."],resultInterpretation:"Pemisahan waktu uji memicu bias variabel perancu lingkungan fisik yang membatalkan validitas komparasi efisiensi."},pythonImplementation:{description:"Implementasi benchmark komputasi dengan protokol warm-up dan interleaved execution.",libraryDependencies:["numpy","time"],code:`import numpy as np
import time

# [SIMULASI/SYNTHETIC DATA]
def algo_a(X):
    return np.dot(X, X.T)

def algo_b(X):
    # Algoritma alternatif dengan alokasi berbeda
    return np.einsum('ij,kj->ik', X, X)

X = np.random.randn(500, 500)

# 1. TAHAP WARM-UP (10 iterasi dibuang)
for _ in range(10):
    _ = algo_a(X)
    _ = algo_b(X)

# 2. INTERLEAVED EXECUTION PROTOCOL (100 iterasi bergantian acak)
n_runs = 50
times_a = []
times_b = []

# Buat urutan acak seimbang
order = np.array([0] * n_runs + [1] * n_runs)
np.random.shuffle(order)

for item in order:
    if item == 0:
        t0 = time.perf_counter()
        _ = algo_a(X)
        times_a.append((time.perf_counter() - t0) * 1000)
    else:
        t0 = time.perf_counter()
        _ = algo_b(X)
        times_b.append((time.perf_counter() - t0) * 1000)

print("[SIMULASI/SYNTHETIC DATA] Hasil Protokol Benchmark Interleaved:")
print(f"Algo A (np.dot)    : Median={np.median(times_a):.3f} ms | P99={np.percentile(times_a, 99):.3f} ms")
print(f"Algo B (np.einsum) : Median={np.median(times_b):.3f} ms | P99={np.percentile(times_b, 99):.3f} ms")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Protokol Benchmark Interleaved:
Algo A (np.dot)    : Median=2.450 ms | P99=3.210 ms
Algo B (np.einsum) : Median=2.520 ms | P99=3.350 ms`},commonPitfalls:["Menghitung waktu eksekusi fungsi bersamaan dengan operasi print() atau I/O disk.","Mengabaikan sinkronisasi GPU (torch.cuda.synchronize() sebelum dan sesudah time profiling pada GPU).","Menggunakan fungsi time.time() alih-alih time.perf_counter() yang beresolusi tinggi."],validationProcedures:["Panggil torch.cuda.synchronize() jika melakukan benchmarking komputasi GPU asynchronous.","Gunakan protokol interleaved execution untuk meminimalkan dampak drift termal.","Lampirkan spesifikasi lengkap CPU, GPU, RAM, OS, driver CUDA, dan versi pustaka dalam berkas manifest."],exercises:[{question:"Mengapa pemanggilan torch.cuda.synchronize() bersifat mutlak sebelum dan setelah pencatatan waktu komputasi GPU di PyTorch?",hint:"Perhatikan sifat asinkron dari kernel launch GPU.",answerExplanation:"Operasi GPU di PyTorch berjalan secara asinkron terhadap proses utama CPU. Jika torch.cuda.synchronize() tidak dipanggil, CPU hanya mengukur waktu pengiriman instruksi kernel ke antrean GPU, bukan durasi waktu eksekusi kalkulasi fisik di dalam silikon GPU tersebut."},{question:"Apa fungsi utama dari berkas Environment Manifest dalam laporan hasil benchmark komputasi?",hint:"Kaitkan dengan replikasi hasil eksperimen di laboratorium lain.",answerExplanation:"Environment Manifest mencatat versi driver, spesifikasi perangkat keras, nomor commit kode, dan parameter daya sehingga peneliti lain dapat mengonfigurasi mesin uji yang setara untuk mereplikasi klaim waktu eksekusi yang dipublikasikan."}],references:[{citation:"Georges, A., Buytaert, D., & Eeckhout, L. (2007). Statistically rigorous Java performance evaluation. ACM SIGPLAN Notices, 42(10), 57-76.",type:"peer-reviewed-article"},{citation:"ACM Artifact Review and Badging Version 1.1 (2020). Association for Computing Machinery Guidelines.",type:"guideline"}],slides:[{slideNumber:1,title:"Protokol Benchmark Komputasi Terkontrol",bulletPoints:["Komputasi adalah fenomena fisik: rentan terhadap panas, memori, dan OS load.","Wajib membuang eksekusi pertama (fase warm-up isolasi).","Interleaved Random Execution: Hindari pengujian berurutan monoton untuk netralisasi thermal drift."],keyFormulaOrDiagram:"T_\\text{obs} = T_\\text{det} + \\epsilon_\\text{sys} + \\delta_\\text{thermal}"},{slideNumber:2,title:"Rigour Profiling GPU & Manifest Lingkungan",bulletPoints:["Wajib menyinkronkan thread komputasi GPU (cuda.synchronize).","Gunakan hardware high-resolution timer (perf_counter).","Dokumentasikan manifes perangkat keras lengkap sesuai standar ACM."],keyFormulaOrDiagram:"\\text{torch.cuda.synchronize()} \\implies \\Delta t = t_\\text{end} - t_\\text{start}"}]}};export{a as CH33_LESSONS};
