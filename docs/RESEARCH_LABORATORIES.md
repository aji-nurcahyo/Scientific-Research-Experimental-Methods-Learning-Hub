# PRACTICAL RESEARCH LABORATORIES
## Scientific Research & Experimental Methods Learning Hub
### Institut Teknologi Sumatera (ITERA)

> **Dokumen Status:** Proposed Baseline v2.0  
> **Klasifikasi:** Computational Laboratory Catalog & Experimental Protocols  
> **Penyusun:** Aji Pamungkas Tri Nurcahyo  
> **Tanggal:** 22 November 2026

---

## 1. STANDAR DAN PRINSIP LABORATORIUM KOMPUTASI

Seluruh modul laboratorium dalam Learning Hub ini dirancang dengan standar kualitas eksperimen yang ketat:
1. **Bebas Data Palsu:** Dilarang membuat angka eksperimen fiktif yang disamarkan seolah-olah data riil.
2. **Label Transparan:** Dataset yang dibangkitkan secara sintetis wajib diberi label eksplisit `[SIMULASI/SYNTHETIC DATA]`.
3. **Reproduksibilitas Penuh:** Setiap modul laboratorium wajib dapat dijalankan pada lingkungan Python standar dengan toleransi numerik yang terdefinisi.
4. **Interaktivitas Bertujuan:** Fitur interaktif hanya disertakan apabila terbukti secara pedagogis meningkatkan pemahaman intuisi konsep matematika atau statistik.
5. **Format Lengkap 13 Elemen:** Setiap modul laboratorium memuat 13 komponen standar secara konsisten.

---

## 2. KATALOG 15 MODUL LABORATORIUM KOMPUTASI

```
┌─────────────────────────────────────────────────────────────────────────┐
│ KELOMPOK A: STATISTICAL INFERENCE & HYPOTHESIS TESTING (LAB 01 - 04)    │
│ - LAB-01: NHST Pitfalls & P-Value Misconceptions                        │
│ - LAB-02: Frequentist Confidence Intervals & Coverage Simulation        │
│ - LAB-03: Statistical Power Analysis & Sample Size Determination        │
│ - LAB-04: Sampling Bias & Selection Distortion (Berkson's Fallacy)      │
├─────────────────────────────────────────────────────────────────────────┤
│ KELOMPOK B: METROLOGY, REGRESSION & EXPERIMENTAL DESIGN (LAB 05 - 07)   │
│ - LAB-05: GUM Uncertainty Evaluation & Differential Error Propagation   │
│ - LAB-06: Linear Regression Diagnostics & Gauss-Markov Violations       │
│ - LAB-07: Full Factorial DoE ($2^3$ Design) & Interaction Surface       │
├─────────────────────────────────────────────────────────────────────────┤
│ KELOMPOK C: COMPUTATIONAL VALIDATION & MACHINE LEARNING (LAB 08 - 11)   │
│ - LAB-08: Data Leakage Forensics & Cross-Validation Contamination      │
│ - LAB-09: Rigorous Multi-Dataset Algorithm Benchmarking (Demšar CD)     │
│ - LAB-10: Systematic Component Ablation Study Matrix                    │
│ - LAB-11: Algorithmic Robustness & Out-of-Distribution Stress-Testing   │
├─────────────────────────────────────────────────────────────────────────┤
│ KELOMPOK D: ADVANCED UNCERTAINTY, SENSITIVITY & PIPELINE (LAB 12 - 15)  │
│ - LAB-12: Nonparametric Bootstrap Resampling & BCa Intervals            │
│ - LAB-13: Uncertainty Quantification & Conformal Prediction Bounds     │
│ - LAB-14: Global Sensitivity Analysis via Sobol Variance Decomposition │
│ - LAB-15: End-to-End One-Click Reproducible Research Pipeline           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### SPESIFIKASI MODUL LABORATORIUM LENGKAP

#### LAB-01: NHST Pitfalls & P-Value Misconceptions
1. **Learning Objectives:** Menganalisis sebaran nilai p-value di bawah kondisi $H_0$ benar vs $H_1$ benar; mendemonstrasikan secara empiris bahaya *optional stopping* (menghentikan sampling saat p < 0.05).
2. **Prerequisites:** CH-17, CH-18, CH-19.
3. **Scientific Foundations:** Krisis replikasi sains; ASA Statement on P-Values; perbedaan inferensi Neyman-Pearson vs Fisherian.
4. **Mathematical Foundations:**
   - Di bawah $H_0$, p-value berdistribusi seragam: $P \sim \mathcal{U}(0, 1)$.
   - Di bawah $H_1$, p-value berdistribusi menceng kanan bergantung pada parameter non-sentralitas $\lambda$: $P \sim f(p; \lambda)$.
5. **Dataset / Experimental Input:** Pembangkitan data simulasi pseudorandom terkontrol (`numpy.random.default_rng(seed=42)`): 10.000 iterasi uji t dua sampel independen dengan $N = 30$, $\mu_1 = \mu_2 = 0$ (kondisi $H_0$), dan $\mu_1 = 0, \mu_2 = 0.5$ (kondisi $H_1$). `[SIMULASI/SYNTHETIC DATA]`.
6. **Python Implementation Plan:**
   - Pustaka: `numpy`, `scipy.stats`, `matplotlib`, `seaborn`.
   - Modul: Loop iterasi 10.000 sampling; perhitungan uji t independen; visualisasi histogram sebaran p-value; simulasi *peeking* (penambahan $n$ secara sekuensial hingga $p < 0.05$).
7. **Expected Results:**
   - Histogram p-value di bawah $H_0$ tampak datar sempurna (frekuensi $\approx 5\%$ untuk $p < 0.05$).
   - Histogram di bawah $H_1$ menunjukkan konsentrasi tinggi mendekati nol.
   - Simulasi *optional stopping* menunjukkan inflasi tingkat false positive nyata melonjak dari $5\%$ menjadi $> 25\%$.
8. **Validation Criteria:** Uji Kolmogorov-Smirnov pada array p-value $H_0$ terhadap $\mathcal{U}(0, 1)$ menghasilkan $p_{\text{KS}} > 0.05$.
9. **Numerical Tolerance:** Deviasi frekuensi p-value per bin $< 0.015$ dari nilai teoretis seragam ($0.10$ untuk bin lebar $0.10$).
10. **Common Methodological Errors:** Menyimpulkan bahwa p-value adalah probabilitas bahwa hipotesis nol benar ($P(H_0 | \text{Data})$); menganggap $p = 0.049$ memiliki signifikansi praktis tinggi dibanding $p = 0.051$.
11. **Exercises:**
    - Ubah parameter effect size $\delta$ dari 0.1 hingga 1.0 dan amati pergeseran kurva kepadatan p-value.
    - Hitung berapa banyak pengujian yang diperlukan dalam skema *optional stopping* untuk memalsukan signifikansi pada data acak murni.
12. **Assessment:** Laporan diagnostik komparasi sebaran p-value dan refleksi tertulis mengenai etika penetapan sample size pra-eksperimen.
13. **Reproducibility Instructions:** `python lab01_nhst_pitfalls.py --seed 42 --runs 10000 --output figures/lab01_pvalue_distribution.png`.

---

#### LAB-02: Frequentist Confidence Intervals & Coverage Probability Simulation
1. **Learning Objectives:** Membuktikan definisi formal interval kepercayaan Frequentist melalui simulasi frekuensi jangka panjang; membedakan interval kepercayaan dari interval kredibel Bayesian.
2. **Prerequisites:** CH-18, CH-19, CH-20.
3. **Scientific Foundations:** Definisi cakupan parameter populasi tetap ($\theta$ fixed, interval acak $[L, U]$).
4. **Mathematical Foundations:**
   - Interval kepercayaan $(1 - \alpha)$ untuk rata-rata dengan varians tak diketahui: $[\bar{X} - t_{\alpha/2, n-1} \frac{s}{\sqrt{n}}, \bar{X} + t_{\alpha/2, n-1} \frac{s}{\sqrt{n}}]$.
   - Proporsi cakupan empiris: $\hat{C} = \frac{1}{M} \sum_{m=1}^M \mathbb{I}(\mu \in [L_m, U_m])$.
5. **Dataset / Experimental Input:** Simulasi 10.000 sampel acak dari populasi Gaussian dengan $\mu = 50.0$ dan $\sigma = 10.0$. Variasi ukuran sampel $n \in \{10, 30, 100\}$. `[SIMULASI/SYNTHETIC DATA]`.
6. **Python Implementation Plan:**
   - Pustaka: `numpy`, `scipy.stats`, `matplotlib`.
   - Modul: Kalkulasi batas bawah ($L$) dan batas atas ($U$) per sampel; pengecekan logika boolean apakah $\mu$ berada dalam rentang; visualisasi plot 100 interval pertama (interval yang mencakup diberi warna netral, interval yang gagal mencakup diberi warna merah).
7. **Expected Results:**
   - Tepat sekitar $950 \pm 20$ dari $1.000$ interval mencakup nilai riil parameter $\mu = 50.0$ (proporsi cakupan empiris $\approx 95\%$).
   - Lebar interval mengecil secara proporsional terhadap $1/\sqrt{n}$.
8. **Validation Criteria:** Tingkat cakupan empiris $\hat{C}$ berada dalam rentang $94.5\% \leq \hat{C} \leq 95.5\%$ pada $10.000$ iterasi.
9. **Numerical Tolerance:** Margin of error proporsi pada $M = 10.000$: $\pm 1.96 \sqrt{\frac{0.95 \cdot 0.05}{10000}} \approx \pm 0.43\%$.
10. **Common Methodological Errors:** Menyatakan "terdapat probabilitas 95% bahwa rata-rata populasi berada dalam interval sampel yang didapatkan" (setelah interval dihitung, parameter berada di dalam atau di luar; probabilitas adalah sifat prosedur penarikan).
11. **Exercises:**
    - Lakukan simulasi interval kepercayaan ketika data berasal dari distribusi eksponensial yang sangat menceng, dan amati penurunan cakupan empiris pada sampel kecil ($n=5$).
    - Bandingkan lebar interval t-student vs z-score pada berbagai tingkat sampel.
12. **Assessment:** Analisis grafis cakupan interval kepercayaan dan interpretasi substantif batas cakupan pada data non-normal.
13. **Reproducibility Instructions:** `python lab02_confidence_coverage.py --seed 101 --samples 10000 --n 30`.

---

#### LAB-03: Statistical Power Analysis & Sample Size Determination
1. **Learning Objectives:** Menghitung kurva kekuatan uji (*statistical power curve*); menentukan ukuran sampel minimum untuk mendeteksi besaran efek tertentu; menganalisis risiko *underpowered studies*.
2. **Prerequisites:** CH-19, CH-20.
3. **Scientific Foundations:** Hubungan non-linier antara ukuran sampel, taraf signifikansi ($\alpha$), kekuatan uji ($1-\beta$), dan ukuran efek (Cohen's $d$).
4. **Mathematical Foundations:**
   - Kekuatan uji dua sampel: $1 - \beta = \Phi\left(\frac{|\mu_1 - \mu_2|}{\sigma \sqrt{2/n}} - z_{1-\alpha/2}\right) + \Phi\left(-\frac{|\mu_1 - \mu_2|}{\sigma \sqrt{2/n}} - z_{1-\alpha/2}\right)$.
5. **Dataset / Experimental Input:** Rentang parameter terdefinisi: $d \in [0.1, 1.2]$, $\alpha = 0.05$, target power $\in \{0.80, 0.90, 0.95\}$. `[SIMULASI/SYNTHETIC DATA]`.
6. **Python Implementation Plan:**
   - Pustaka: `statsmodels.stats.power`, `numpy`, `matplotlib`.
   - Modul: Generator kurva daya (`TTestIndPower`); perhitungan titik sampel kritis; plot multi-kurva daya untuk berbagai ukuran efek (efek kecil $d=0.2$, sedang $d=0.5$, besar $d=0.8$).
7. **Expected Results:**
   - Deteksi efek kecil ($d=0.2$) pada $\alpha=0.05$ dan power $0.80$ memerlukan minimal $n \approx 393$ subjek per kelompok.
   - Deteksi efek sedang ($d=0.5$) memerlukan $n \approx 64$ subjek per kelompok.
8. **Validation Criteria:** Nilai ukuran sampel keluaran fungsi Python berselisih tepat nol terhadap tabel analitis Cohen (1988).
9. **Numerical Tolerance:** Toleransi integer $\pm 1$ sampel akibat pembulatan batas atas.
10. **Common Methodological Errors:** Menentukan ukuran sampel sebesar 30 subjek hanya karena aturan praktis tanpa dasar perhitungan varians empiris; menjalankan *post-hoc power analysis* menggunakan effect size observasional yang terdistorsi.
11. **Exercises:**
    - Buat skrip yang menghitung penurunan power ketika $\alpha$ dikoreksi menggunakan Bonferroni dari $0.05$ menjadi $0.001$.
    - Hitung dampak penggunaan rasio sampel tidak seimbang ($n_1 \neq n_2$) terhadap penurunan efisiensi statistik.
12. **Assessment:** Dokumen kalkulasi ukuran sampel untuk proposal penelitian lengkap dengan kurva daya yang dapat diekspor.
13. **Reproducibility Instructions:** `python lab03_power_analysis.py --alpha 0.05 --power 0.80 --effect-sizes 0.2,0.5,0.8`.

---

#### LAB-04: Sampling Bias & Selection Distortion (Berkson's Fallacy)
1. **Learning Objectives:** Mendemonstrasikan secara komputasional bagaimana bias seleksi dan pengkondisian pada variabel kolider (*collider conditioning*) memicu korelasi semu palsu antara dua variabel independen.
2. **Prerequisites:** CH-06, CH-08, CH-10.
3. **Scientific Foundations:** Teori kausalitas Pearl; paradoks Berkson; bias seleksi pada sampling fasilitas medis atau pengujian komputasi khusus.
4. **Mathematical Foundations:**
   - Variabel $X$ dan $Y$ independen: $P(X, Y) = P(X)P(Y)$.
   - Seleksi $S = f(X, Y)$: $P(X, Y | S=1) \neq P(X|S=1)P(Y|S=1)$.
5. **Dataset / Experimental Input:** Simulasi populasi $N = 100.000$ unit dengan dua atribut fisik acak independen ($X \sim \mathcal{N}(0, 1)$, $Y \sim \mathcal{N}(0, 1)$). Probabilitas seleksi ke dalam sampel: $P(S=1) = \text{sigmoid}(2X + 2Y - 1)$. `[SIMULASI/SYNTHETIC DATA]`.
6. **Python Implementation Plan:**
   - Pustaka: `numpy`, `pandas`, `seaborn`, `matplotlib`.
   - Modul: Pembangkitan data populasi; seleksi sampel terbias; regresi OLS pada populasi vs sampel terpilih; scatter plot komparasi dua panel.
7. **Expected Results:**
   - Pada populasi penuh, korelasi Pearson $r_{X, Y} \approx 0.00$ ($p > 0.50$).
   - Pada sampel yang diseleksi ($S=1$), korelasi Pearson bergeser signifikan menjadi negatif kuat ($r_{X, Y} \approx -0.40$, $p < 0.001$).
8. **Validation Criteria:** Nilai p-value korelasi pada sampel terbias menunjukkan signifikansi palsu ($p < 0.01$).
9. **Numerical Tolerance:** Rentang korelasi populasi $|r| < 0.02$.
10. **Common Methodological Errors:** Mengabaikan mekanisme perekrutan sampel dan menyimpulkan hubungan kausal dari korelasi yang dihasilkan oleh kriteria seleksi data.
11. **Exercises:**
    - Modifikasi fungsi seleksi menjadi seleksi berbasis kuota industri dan amati distorsi kovarians yang terjadi.
    - Terapkan teknik inverse probability weighting (IPW) untuk memulihkan estimasi korelasi populasi yang tidak bias.
12. **Assessment:** Laporan investigasi mekanisme bias seleksi dan formulasi graf DAG untuk mengidentifikasi variabel kolider.
13. **Reproducibility Instructions:** `python lab04_berkson_bias.py --pop-size 100000 --seed 77`.

---

#### LAB-05: GUM Uncertainty Evaluation & Differential Error Propagation
1. **Learning Objectives:** Menyusun anggaran ketidakpastian pengukuran berstandar ISO/BIPM JCGM 100:2008 (GUM); menghitung perambatan ketidakpastian linier menggunakan kalkulus diferensial parsial; memvalidasi hasil analitis dengan simulasi Monte Carlo.
2. **Prerequisites:** CH-09, CH-11, CH-23.
3. **Scientific Foundations:** Standar internasional Guide to the Expression of Uncertainty in Measurement (GUM); evaluasi ketidakpastian Tipe A dan Tipe B.
4. **Mathematical Foundations:**
   - Fungsi pengukuran non-linier: $Y = f(X_1, X_2, \dots, X_N)$.
   - Deret Taylor orde-1: $u_c^2(y) = \sum_{i=1}^N \left(\frac{\partial f}{\partial x_i}\right)^2 u^2(x_i)$.
   - Expanded uncertainty: $U = k \cdot u_c(y)$, $k=2$ untuk interval cakupan $95.45\%$.
5. **Dataset / Experimental Input:** Studi kasus riil pengukuran daya listrik motor BLDC ($P = V \cdot I \cdot \cos\theta$). Data observasi 30 run pengujian sensor arus ($I$) dan sensor tegangan ($V$), ditambah spesifikasi kalibrasi pabrikan instrumen. `[DATASET TERSTANDARISASI & TERVERIFIKASI]`.
6. **Python Implementation Plan:**
   - Pustaka: `sympy` (derivasi simbolik turunan parsial), `numpy`, `scipy.stats`.
   - Modul: Penurunan otomatis fungsi koefisien sensitivitas $c_i = \frac{\partial f}{\partial x_i}$; penyusunan tabel anggaran ketidakpastian berformat pandas DataFrame; simulasi Monte Carlo 100.000 run untuk memeriksa efek ketidakpastian orde tinggi.
7. **Expected Results:**
   - Nilai ketidakpastian gabungan $u_c(P)$ dan expanded uncertainty $U_{95}$ terhitung dengan kontribusi varians terinci dari tiap sensor.
   - Hasil aproksimasi analitis GUM linier selaras dengan nilai deviasi standar simulasi Monte Carlo.
8. **Validation Criteria:** Selisih antara $u_c$ analitis GUM dan deviasi standar Monte Carlo $< 2\%$.
9. **Numerical Tolerance:** Toleransi numerik relatif $\epsilon \leq 0.02$.
10. **Common Methodological Errors:** Menjumlahkan ketidakpastian sensor secara linier sederhana ($u_{\text{total}} = u_1 + u_2$) alih-alih jumlah kuadrat kuadratur (*root-sum-squares*); mengabaikan batas toleransi sertifikat kalibrasi (Tipe B).
11. **Exercises:**
    - Tambahkan koefisien korelasi $r(V, I) = 0.35$ antara pembacaan tegangan dan arus, lalu amati kenaikan nilai ketidakpastian gabungan akibat suku kovarians.
    - Hitung derajat kebebasan efektif menggunakan formula Welch-Satterthwaite.
12. **Assessment:** Dokumen tabel Uncertainty Budget lengkap dengan identifikasi komponen ketidakpastian dominan.
13. **Reproducibility Instructions:** `python lab05_gum_uncertainty.py --runs 30 --mc-trials 100000`.

---

#### LAB-06: Linear Regression Diagnostics & Gauss-Markov Violations
1. **Learning Objectives:** Mendiagnosis dan mengoreksi pelanggaran asumsi klasik Gauss-Markov (heteroskedastisitas, non-linieritas, autokorelasi, pencilan berpengaruh) pada pemodelan regresi OLS rekayasa.
2. **Prerequisites:** CH-16, CH-20, CH-24.
3. **Scientific Foundations:** Teori estimasi OLS; teorema Gauss-Markov (BLUE: Best Linear Unbiased Estimator); bahaya mengandalkan $R^2$ tinggi tanpa memeriksa residu.
4. **Mathematical Foundations:**
   - Uji Breusch-Pagan untuk heteroskedastisitas: $LM = \frac{1}{2} \text{TSS}_{\text{aux}} \sim \chi^2(p)$.
   - Jarak Cook untuk titik pengaruh: $D_i = \frac{\sum (\hat{y}_j - \hat{y}_{j(i)})^2}{p \cdot s^2}$.
5. **Dataset / Experimental Input:** Dataset uji degradasi performa baterai: variabel siklus pengisian, suhu operasional, arus discharge, dan kapasitas sisa (150 sampel eksperimen). `[DATASET EKSPERIMENTAL]`.
6. **Python Implementation Plan:**
   - Pustaka: `statsmodels.api`, `statsmodels.stats.diagnostic`, `seaborn`, `matplotlib`.
   - Modul: Fitting model OLS; pembangkitan 4-panel diagnostik (Residuals vs Fitted, Normal Q-Q, Scale-Location, Residuals vs Leverage); pengujian formal Breusch-Pagan, Shapiro-Wilk pada residu, dan Durbin-Watson; penerapan transformasi Box-Cox untuk stabilisasi varians.
7. **Expected Results:**
   - Model awal memperlihatkan pola heteroskedastisitas berbentuk corong pada plot Residuals vs Fitted ($p_{\text{BP}} < 0.01$).
   - Transformasi variabel respon berhasil menstabilkan varians residu dan memulihkan normalitas.
8. **Validation Criteria:** Nilai p-value Breusch-Pagan pasca-transformasi $p_{\text{BP}} > 0.05$.
9. **Numerical Tolerance:** Batas toleransi statistik uji $\chi^2$ Breusch-Pagan $\pm 0.05$.
10. **Common Methodological Errors:** Melaporkan nilai $R^2 = 0.95$ sebagai bukti keberhasilan model padahal pola residu berbentuk kurva lengkung (menandakan kegagalan menangkap relasi non-linier).
11. **Exercises:**
    - Identifikasi 3 titik dengan Cook's distance tertinggi dan evaluasi apakah titik tersebut adalah outlier instrumen atau fenomena fisik riil.
    - Hitung Variance Inflation Factor (VIF) untuk mendeteksi multikolinearitas antar-sensor.
12. **Assessment:** Laporan diagnostik regresi lengkap dengan interpretasi visual 4-panel dan evaluasi asumsi sebelum vs sesudah koreksi.
13. **Reproducibility Instructions:** `python lab06_regression_diagnostics.py --dataset data/battery_degradation.csv`.

---

#### LAB-07: Full Factorial DoE ($2^3$ Design) & Interaction Surface
1. **Learning Objectives:** Merancang, mengeksekusi, dan menganalisis eksperimen faktorial penuh $2^3$; menghitung kontras efek utama dan efek interaksi 2-faktor; menyusun model prediktif berbasis ANOVA.
2. **Prerequisites:** CH-26, CH-28, CH-29.
3. **Scientific Foundations:** Metodologi Design of Experiments (DoE) Douglas Montgomery; kegagalan metode perlakuan satu-faktor-pada-satu-waktu (OFAT) dalam mendeteksi interaksi fisik.
4. **Mathematical Foundations:**
   - Matriks desain ortogonal $\mathbf{X}$ dengan kolom kontras $\pm 1$.
   - Efek faktor: $\text{Effect}_A = \bar{y}_{A+} - \bar{y}_{A-}$.
   - Dekomposisi varians ANOVA: $\text{SS}_{\text{Total}} = \text{SS}_A + \text{SS}_B + \text{SS}_C + \text{SS}_{AB} + \text{SS}_{AC} + \text{SS}_{BC} + \text{SS}_{ABC} + \text{SS}_E$.
5. **Dataset / Experimental Input:** Eksperimen optimasi proses pemesinan CNC: 3 faktor (Kecepatan potong $A$, Laju pemakanan $B$, Kedalaman potong $C$), 2 replikasi per konfigurasi ($N = 16$ run). Respon: Kekasaran permukaan ($R_a$, $\mu m$). `[DATASET EKSPERIMENTAL]`.
6. **Python Implementation Plan:**
   - Pustaka: `statsmodels.formula.api`, `pandas`, `matplotlib`, `seaborn`.
   - Modul: Generator jadwal urutan uji acak (*randomized run-sheet*); fitting model faktorial penuh; tabel ANOVA derajat kebebasan; visualisasi plot interaksi 2-arah dan diagram kontur permukaan respon.
7. **Expected Results:**
   - Faktor utama $A$ dan $B$ signifikan ($p < 0.001$).
   - Terdeteksi efek interaksi sinergis kuat antara $A$ dan $B$ ($p < 0.01$), membuktikan bahwa optimasi OFAT akan menghasilkan kesimpulan yang salah.
8. **Validation Criteria:** Nilai Sum of Squares pada tabel ANOVA Python identik secara analitis dengan penurunan rumus manual kontras.
9. **Numerical Tolerance:** Selisih kalkulasi SS $< 10^{-6}$.
10. **Common Methodological Errors:** Mengabaikan efek interaksi dan hanya melaporkan efek utama; tidak melakukan pengacakan urutan uji (*run-order randomization*) sehingga efek drift suhu mesin mengotori data.
11. **Exercises:**
    - Buat diagram Pareto efek terstandarisasi untuk memilah efek vital dari efek sepele.
    - Lakukan uji kecocokan kelengkungan model (*curvature check*) dengan menambahkan titik pusat (*center points*).
12. **Assessment:** Laporan analisis DoE faktorial lengkap dengan tabel ANOVA, plot efek interaksi, dan persamaan model prediksi.
13. **Reproducibility Instructions:** `python lab07_factorial_doe.py --replications 2 --seed 55`.

---

#### LAB-08: Data Leakage Forensics & Cross-Validation Contamination
1. **Learning Objectives:** Mendemonstrasikan secara empiris lonjakan akurasi palsu akibat kebocoran data (*data leakage*) pra-pemrosesan; mengimplementasikan skema cross-validation terisolasi yang kebal kontaminasi.
2. **Prerequisites:** CH-08, CH-16, CH-32.
3. **Scientific Foundations:** Krisis replikasi machine learning (Kapoor & Narayanan, 2023); pemisahan informasi ketat antara training set dan evaluation set.
4. **Mathematical Foundations:**
   - Penskalaan fitur: $\hat{\mu}_{\text{train}} = \frac{1}{n_{\text{train}}} \sum_{i \in \text{train}} x_i$.
   - Kontaminasi: Menggunakan $\hat{\mu}_{\text{all}} = \frac{1}{N} \sum_{i=1}^N x_i$ pada tahap normalisasi sebelum pemisahan data.
5. **Dataset / Experimental Input:** Dataset citra/fitur berdimensi tinggi dengan rasio sampel terhadap fitur kecil: $N = 200$ sampel, $P = 5.000$ fitur noise murni independen terhadap label ($y \sim \text{Bernoulli}(0.5)$). `[SIMULASI/SYNTHETIC DATA]`.
6. **Python Implementation Plan:**
   - Pustaka: `scikit-learn`, `numpy`.
   - Modul:
     - *Pipeline Bocor (Leaky):* Seleksi 20 fitur dengan korelasi tertinggi pada seluruh dataset $D$, dilanjutkan dengan 5-fold cross-validation.
     - *Pipeline Valid (Clean):* Seleksi fitur dilakukan strictly di dalam tiap fold training menggunakan `Pipeline` scikit-learn.
7. **Expected Results:**
   - Pipeline yang bocor melaporkan akurasi cross-validation palsu sebesar $\approx 85\% - 90\%$ ($p < 0.001$) padahal data adalah noise acak murni.
   - Pipeline yang bersih melaporkan akurasi riil sebesar $\approx 50\%$ (akurasi tebakan acak yang jujur).
8. **Validation Criteria:** Akurasi pipeline bersih berada dalam rentang tebakan acak teoretis $45\% - 55\%$.
9. **Numerical Tolerance:** Toleransi deviasi akurasi acak $\pm 5\%$.
10. **Common Methodological Errors:** Melakukan standardisasi fitur (StandardScaler), seleksi fitur, imputasi missing data, atau augmentasi citra sebelum membagi data menjadi train/test split.
11. **Exercises:**
    - Terapkan skema GroupKFold pada dataset yang memiliki rekaman berulang dari pasien/mesin yang sama dan amati perbedaan performa dibanding K-Fold standar.
    - Bangun custom scikit-learn Transformer yang mematuhi protokol anti-leakage.
12. **Assessment:** Laporan audit forensik kebocoran data dengan analisis selisih akurasi semu vs akurasi sejati.
13. **Reproducibility Instructions:** `python lab08_data_leakage.py --n-samples 200 --n-features 5000 --seed 42`.

---

#### LAB-09: Rigorous Multi-Dataset Algorithm Benchmarking (Demšar CD)
1. **Learning Objectives:** Menerapkan metodologi Janez Demšar (2006) untuk membandingkan performa jamak algoritma pada banyak benchmark dataset; menjalankan uji Friedman dan uji post-hoc Nemenyi; memvisualisasikan Critical Difference Diagrams.
2. **Prerequisites:** CH-21, CH-22, CH-33, CH-34.
3. **Scientific Foundations:** Pelanggaran asumsi uji t berpasangan pada evaluasi multi-dataset; standar emas pelaporan komparasi algoritma machine learning dan rekayasa komputasi.
4. **Mathematical Foundations:**
   - Peringkat rata-rata algoritma $j$: $R_j = \frac{1}{N} \sum_{i=1}^N r_i^j$.
   - Uji Friedman: $\chi_F^2 = \frac{12 N}{k(k+1)} \left[\sum R_j^2 - \frac{k(k+1)^2}{4}\right]$.
   - Critical Difference Nemenyi: $\text{CD} = q_\alpha \sqrt{\frac{k(k+1)}{6N}}$.
5. **Dataset / Experimental Input:** Matriks evaluasi metrik akurasi 5 algoritma (Algoritma Usulan vs 4 Baseline SOTA) pada 15 benchmark dataset standar. `[BENCHMARK DATASET TERSTANDARISASI]`.
6. **Python Implementation Plan:**
   - Pustaka: `scipy.stats`, `scikit-posthocs`, `matplotlib`.
   - Modul: Perhitungan matriks peringkat; uji signifikansi Friedman; koreksi Nemenyi dan Holm-Bonferroni; plot diagram Critical Difference (CD) horizontal dengan garis hubung antar-metode yang tidak berbeda signifikan.
7. **Expected Results:**
   - Uji Friedman menolak hipotesis kesetaraan performa seluruh algoritma ($p < 0.01$).
   - Diagram CD memperlihatkan algoritma usulan menempati peringkat rata-rata terbaik ($R_1 = 1.45$) dan terpisah melampaui batas CD terhadap 3 dari 4 baseline.
8. **Validation Criteria:** Nilai ambang CD analitis berselisih $< 10^{-4}$ dari tabel nilai kritis statistik Nemenyi pada taraf $\alpha = 0.05$.
9. **Numerical Tolerance:** Batas toleransi nilai CD $\pm 0.001$.
10. **Common Methodological Errors:** Menjalankan puluhan uji t berpasangan antar-algoritma per-dataset tanpa koreksi multiple testing dan mengklaim "menang di 12 dari 15 dataset" sebagai bukti ilmiah superioritas.
11. **Exercises:**
    - Bandingkan hasil uji Nemenyi (konservatif) vs prosedur Wilcoxon berpasangan yang dikoreksi False Discovery Rate (Benjamini-Hochberg).
    - Lakukan uji sensitivitas peringkat jika 2 dataset dengan varians ekstrem dihilangkan.
12. **Assessment:** Laporan komparasi benchmark algoritma lengkap dengan Critical Difference Diagram berstandar publikasi jurnal.
13. **Reproducibility Instructions:** `python lab09_demsar_benchmark.py --datasets 15 --algorithms 5`.

---

#### LAB-10: Systematic Component Ablation Study Matrix
1. **Learning Objectives:** Merancang dan mengeksekusi matriks eksperimen ablasi modular; membongkar kontribusi independen dan efek sinergis tiap komponen arsitektur sistem komputasi; mengidentifikasi komponen yang tidak esensial (*dead weight*).
2. **Prerequisites:** CH-29, CH-33, CH-35.
3. **Scientific Foundations:** Standar pelaporan naskah ilmiah papan atas; pembuktian kausalitas fungsi modul inovasi; pencegahan klaim kebaruan berbasis kompleksitas arsitektur semata.
4. **Mathematical Foundations:**
   - Dekomposisi performa sistem penuh: $f(A, B, C) = y_{\text{base}} + \Delta_A + \Delta_B + \Delta_C + I_{AB} + I_{AC} + I_{BC} + I_{ABC} + \epsilon$.
5. **Dataset / Experimental Input:** Pipeline deteksi cacat visual multi-tahap (Modul A: Preprocessing filter kontras adaptif, Modul B: Spatial attention mechanism, Modul C: Loss function focal-dice). Evaluasi pada dataset uji 1.000 citra. `[DATASET CITRA REKAYASA]`.
6. **Python Implementation Plan:**
   - Pustaka: `pandas`, `seaborn`, `matplotlib`, `scikit-learn`.
   - Modul: Eksekusi pengujian 8 konfigurasi kombinatorial ($2^3$: Base, Base+A, Base+B, Base+C, Base+AB, Base+AC, Base+BC, Full); kompilasi tabel metrik (mAP, F1, Latensi FPS); visualisasi kontribusi marjinal via waterfall chart.
7. **Expected Results:**
   - Terbukti bahwa penambahan Modul B memberikan lonjakan metrik terbesar ($\Delta F1 = +5.2\%$).
   - Terbukti bahwa Modul A hanya menyumbang $+0.3\%$ namun meningkatkan latensi komputasi sebesar $40\%$, memberikan bukti ilmiah bahwa Modul A tidak efisien untuk dipertahankan.
8. **Validation Criteria:** Seluruh varian ablasi dievaluasi pada seed pengacakan dan split dataset yang identik secara deterministik.
9. **Numerical Tolerance:** Pengulangan evaluasi multi-seed menghasilkan varians metrik $< 0.005$.
10. **Common Methodological Errors:** Mengklaim sistem baru unggul hanya dengan membandingkan versi utuh vs baseline awal tanpa mengisolasi kontribusi masing-masing komponen modul; menyembunyikan varian ablasi yang hasilnya lebih buruk.
11. **Exercises:**
    - Rancang matriks ablasi untuk skenario keterbatasan komputasi (pembobotan metrik akurasi terhadap memori dan FLOPs).
    - Analisis interaksi negatif antara dua modul yang saling meniadakan fungsi.
12. **Assessment:** Laporan Studi Ablasi Komprehensif dengan tabel dekonstruksi performa dan justifikasi pemilihan arsitektur final.
13. **Reproducibility Instructions:** `python lab10_ablation_matrix.py --config config/ablation_spec.yaml`.

---

#### LAB-11: Algorithmic Robustness & Out-of-Distribution Stress-Testing
1. **Learning Objectives:** Menguji ketahanan algoritma rekayasa terhadap degradasi input (sensor noise, variasi iluminasi, blur, gangguan kanal transmisi); memetakan kurva penurunan kinerja (*graceful degradation vs catastrophic failure*); mendeteksi batas domain keabsahan operasional.
2. **Prerequisites:** CH-32, CH-35, CH-36.
3. **Scientific Foundations:** Keandalan sistem rekayasa (*engineering dependability*); fenomena *domain shift / covariate shift*; ketahanan sistem keselamatan kritis (*safety-critical systems*).
4. **Mathematical Foundations:**
   - Injeksi gangguan terkontrol: $\tilde{\mathbf{x}} = \mathbf{x} + \boldsymbol{\epsilon}$, di mana $\boldsymbol{\epsilon} \sim \mathcal{N}(\mathbf{0}, \sigma_{\text{noise}}^2 \mathbf{I})$.
   - Metrik ketahanan terstandarisasi: Area Under the Performance Degradation Curve (AUPDC).
5. **Dataset / Experimental Input:** Dataset uji sinyal/citra terstandarisasi dengan 5 level intensitas gangguan terkalibrasi (Noise Gaussian, Blur Gerak, Kontras Rendah). `[DATASET STRESS-TEST]`.
6. **Python Implementation Plan:**
   - Pustaka: `numpy`, `scipy.ndimage`, `matplotlib`, `pandas`.
   - Modul: Pipeline injeksi perturbasi berjenjang; pengujian performa algoritma pada tiap tingkat keparahan gangguan; plotting kurva degradasi performa komparatif antara metode usulan vs 3 model pembanding.
7. **Expected Results:**
   - Metode pembanding konvensional mengalami penurunan kinerja drastis (*catastrophic drop*) pada level noise sedang.
   - Metode usulan memperlihatkan penurunan bertahap yang terkontrol (*graceful degradation*), membuktikan superioritas ketahanan sistem.
8. **Validation Criteria:** Tingkat keparahan gangguan dikalibrasi secara objektif menggunakan metrik Peak Signal-to-Noise Ratio (PSNR) terukur.
9. **Numerical Tolerance:** Toleransi nilai PSNR per level gangguan $\pm 0.2$ dB.
10. **Common Methodological Errors:** Mengevaluasi model hanya pada dataset uji bersih yang homogen; mengklaim model siap diimplementasikan di industri tanpa pernah melakukan uji ketahanan lingkungan ekstrem.
11. **Exercises:**
    - Tambahkan jenis gangguan adversarial sederhana dan amati kerentanan representasi fitur.
    - Hitung rasio penurunan performa relatif (Relative Performance Drop - RPD) untuk tiap variasi gangguan.
12. **Assessment:** Laporan Pengujian Ketahanan Sistem Komputasi lengkap dengan kurva degradasi performa dan failure case taxonomy.
13. **Reproducibility Instructions:** `python lab11_robustness_eval.py --perturbations gaussian,blur,contrast --levels 5`.

---

#### LAB-12: Nonparametric Bootstrap Resampling & BCa Intervals
1. **Learning Objectives:** Mengonstruksi interval kepercayaan non-parametrik menggunakan metode bootstrap Efron; menghitung interval persentil dan interval Bias-Corrected and Accelerated (BCa); mengaplikasikan resampling pada metrik rekayasa non-standar.
2. **Prerequisites:** CH-18, CH-20, CH-38.
3. **Scientific Foundations:** Teori resampling Bradley Efron; inferensi bebas asumsi distribusi parametrik; penanganan estimasi statistik pada data sampel kecil yang menceng.
4. **Mathematical Foundations:**
   - Distribusi empiris $\hat{F}_n$ dari sampel $\mathbf{x} = (x_1, \dots, x_n)$.
   - Replikasi bootstrap: $\hat{\theta}^{*b} = S(\mathbf{x}^{*b}), b=1, \dots, B$.
   - Interval BCa: Batas persentil disesuaikan dengan parameter bias-correction $z_0$ dan parameter akselerasi $a$.
5. **Dataset / Experimental Input:** Dataset pengukuran waktu antar-kerusakan sistem sensor (*Mean Time Between Failures* - MTBF) pada 25 unit mesin: distribusi log-normal menceng ekstrem. `[DATASET RELIABILITAS REKAYASA]`.
6. **Python Implementation Plan:**
   - Pustaka: `scipy.stats`, `numpy`, `matplotlib`.
   - Modul: Algoritma resampling $B = 10.000$ iterasi; kalkulasi parameter skewness jackknife untuk estimasi akselerasi $a$; kalkulasi interval BCa vs interval persentil standar; visualisasi sebaran distribusi replikasi bootstrap $\hat{\theta}^*$.
7. **Expected Results:**
   - Interval persentil standar menghasilkan batas yang tidak simetris terhadap estimasi titik akibat bias distribusi asli.
   - Interval BCa berhasil mengoreksi pergeseran bias dan memberikan cakupan interval kepercayaan $95\%$ yang valid.
8. **Validation Criteria:** Nilai estimasi $z_0$ dan $a$ konvergen pada iterasi bootstrap $B \geq 5.000$.
9. **Numerical Tolerance:** Toleransi batas interval kepercayaan BCa $\pm 0.5$ jam MTBF pada 10.000 replikasi.
10. **Common Methodological Errors:** Menggunakan rumus interval kepercayaan Student's t baku pada data waktu kegagalan yang menceng ekstrem; menggunakan jumlah replikasi bootstrap yang terlalu sedikit ($B < 1.000$) untuk estimasi interval persentil.
11. **Exercises:**
    - Terapkan metode bootstrap untuk menghitung interval kepercayaan 95% dari metrik rasio varians dua instrumen.
    - Bandingkan waktu komputasi vs presisi interval pada $B = 1.000, 5.000, 20.000$.
12. **Assessment:** Laporan analisis estimasi reliabilitas sistem rekayasa berbasis bootstrap BCa lengkap dengan visualisasi distribusi empiris.
13. **Reproducibility Instructions:** `python lab12_bootstrap_bca.py --bootstrap-runs 10000 --seed 88`.

---

#### LAB-13: Uncertainty Quantification & Conformal Prediction Bounds
1. **Learning Objectives:** Menerapkan metode kuantifikasi ketidakpastian prediktif (*predictive uncertainty quantification*); membedakan ketidakpastian aleatorik dan epistemik; mengimplementasikan algoritma Conformal Prediction split untuk menghasilkan interval prediksi bebas distribusi dengan jaminan cakupan finit yang terbukti secara matematis.
2. **Prerequisites:** CH-11, CH-39, CH-41.
3. **Scientific Foundations:** Teori Conformal Prediction (Vovk et al.); jaminan cakupan finit bebas asumsi distribusi (*distribution-free finite-sample guarantees*); keselamatan sistem kendali otonom.
4. **Mathematical Foundations:**
   - Skor non-konformitas absolut: $s_i = |y_i - \hat{\mu}(x_i)|$.
   - Kuantil terkalibrasi: $\hat{q} = \text{Quantile}\left(\frac{\lceil (n+1)(1-\alpha) \rceil}{n}; s_1, \dots, s_n\right)$.
   - Interval prediksi: $C(x_{n+1}) = [\hat{\mu}(x_{n+1}) - \hat{q}, \hat{\mu}(x_{n+1}) + \hat{q}]$ yang menjamin $P(Y_{n+1} \in C(X_{n+1})) \geq 1 - \alpha$.
5. **Dataset / Experimental Input:** Dataset regresi estimasi konsumsi energi kendaraan listrik berbasis kecepatan, kemiringan jalan, dan suhu ambien (1.000 titik data). `[DATASET SISTEM REKAYASA]`.
6. **Python Implementation Plan:**
   - Pustaka: `numpy`, `scikit-learn`, `matplotlib`.
   - Modul: Pembagian data 3-arah (Train, Calibration, Test); fitting model regresi dasar (Random Forest); kalkulasi skor non-konformitas pada data kalibrasi; pembangkitan interval prediksi pada data uji; verifikasi frekuensi cakupan empiris.
7. **Expected Results:**
   - Interval prediksi Conformal Prediction menghasilkan cakupan empiris tepat $\geq 90.0\%$ pada tingkat signifikansi $\alpha = 0.10$.
   - Lebar interval beradaptasi secara dinamis terhadap ketidakpastian lokal pada domain data yang jarang diobservasi.
8. **Validation Criteria:** Frekuensi data uji yang berada di dalam interval prediksi memenuhi $C_{\text{empiris}} \geq 1 - \alpha$.
9. **Numerical Tolerance:** Selisih cakupan empiris dari target teoritis $\leq 1.0\%$.
10. **Common Methodological Errors:** Menganggap residu regresi homoskedastik di seluruh domain input; menggunakan interval prediksi parametrik normal pada model non-linier kompleks yang memiliki error berdistribusi berat (*heavy-tailed errors*).
11. **Exercises:**
    - Terapkan Conformalized Quantile Regression (CQR) untuk menghasilkan interval prediksi dengan lebar adaptif yang asimetris.
    - Analisis dampak penurunan ukuran set kalibrasi ($n_{\text{cal}} = 50$ vs $500$) terhadap kestabilan kuantil $\hat{q}$.
12. **Assessment:** Laporan Kuantifikasi Ketidakpastian Prediktif dengan visualisasi pita interval prediksi conformal dan verifikasi cakupan matematis.
13. **Reproducibility Instructions:** `python lab13_conformal_prediction.py --alpha 0.10 --cal-size 0.3`.

---

#### LAB-14: Global Sensitivity Analysis via Sobol Variance Decomposition
1. **Learning Objectives:** Menerapkan analisis sensitivitas global berbasis varians; menghitung indeks sensitivitas efek utama ($S_i$) dan indeks efek total ($S_{Ti}$) menggunakan metode dekomposisi Sobol; membedakan parameter kritis dari parameter non-esensial dalam model simulasi rekayasa.
2. **Prerequisites:** CH-41, CH-42.
3. **Scientific Foundations:** Metodologi analisis sensitivitas Andrea Saltelli; kelemahan fatal analisis sensitivitas lokal (turunan parsial satu-faktor-pada-satu-waktu) pada sistem non-linier dan berinteraksi.
4. **Mathematical Foundations:**
   - Dekomposisi varians total: $\text{Var}(Y) = \sum_{i} V_i + \sum_{i < j} V_{ij} + \dots + V_{1 \dots k}$.
   - Indeks efek pertama (first-order): $S_i = \frac{\text{Var}_{X_i}(E_{\mathbf{X}_{\sim i}}[Y|X_i])}{\text{Var}(Y)}$.
   - Indeks efek total: $S_{Ti} = 1 - \frac{\text{Var}_{\mathbf{X}_{\sim i}}(E_{X_i}[Y|\mathbf{X}_{\sim i}])}{\text{Var}(Y)}$.
5. **Dataset / Experimental Input:** Model simulasi termal baterai rekayasa non-linier (Fungsi Ishigami terstandarisasi sebagai benchmark analitis matematis, dilanjutkan model termal 6 parameter fisik). `[MODEL SIMULASI REKAYASA & BENCHMARK ANALITIS]`.
6. **Python Implementation Plan:**
   - Pustaka: `SALib`, `numpy`, `matplotlib`.
   - Modul: Pembangkitan matriks sampel parameter kuasi-acak Saltelli; evaluasi fungsi respon model; kalkulasi indeks $S_i$ dan $S_{Ti}$ beserta interval kepercayaan bootstrap; visualisasi diagram batang sensitivitas Sobol berurut.
7. **Expected Results:**
   - Pada fungsi Ishigami, nilai $S_i$ dan $S_{Ti}$ terhitung identik dengan solusi analitis teoretis ($S_1 \approx 0.3138, S_2 \approx 0.4424, S_3 \approx 0.0000, S_{T3} \approx 0.2436$).
   - Parameter $X_3$ terbukti tidak memiliki efek langsung mandiri ($S_3 = 0$) namun memiliki efek interaksi non-linier besar melalui $S_{T3}$, membuktikan kekuatan dekomposisi varians global.
8. **Validation Criteria:** Selisih nilai indeks Sobol terhitung terhadap nilai analitis eksak Ishigami $< 0.015$ pada $N = 8.192$ sampel.
9. **Numerical Tolerance:** Deviasi numerik indeks Sobol $\leq 0.015$.
10. **Common Methodological Errors:** Mengandalkan analisis sensitivitas lokal (mengubah parameter $\pm 10\%$ satu per satu di sekitar titik dasar) yang sama sekali buta terhadap efek interaksi multi-parameter non-linier.
11. **Exercises:**
    - Lakukan skrining awal menggunakan metode Morris (Elementary Effects) dan bandingkan peringkat kepentingannya terhadap hasil Sobol.
    - Identifikasi parameter dengan $S_{Ti} < 0.01$ yang dapat dibekukan nilainya (*parameter fixing*) untuk mereduksi kompleksitas model.
12. **Assessment:** Laporan Analisis Sensitivitas Global Sistem Rekayasa lengkap dengan tabel indeks Sobol dan interpretasi fisik interaksi antar-parameter.
13. **Reproducibility Instructions:** `python lab14_sobol_sensitivity.py --samples 8192 --benchmark ishigami`.

---

#### LAB-15: End-to-End One-Click Reproducible Research Pipeline
1. **Learning Objectives:** Membangun paket repositori penelitian komputasi yang sepenuhnya reproduktif sesuai standar ACM Artifact Evaluation; mengintegrasikan versioning data, isolasi lingkungan kontainer, dan otomatisasi eksekusi dari data mentah hingga naskah PDF.
2. **Prerequisites:** CH-14, CH-45, CH-46, CH-47, CH-51.
3. **Scientific Foundations:** Krisis reproduksibilitas komputasi internasional; prinsip Research Software Engineering (RSE); pedoman keterbukaan data dan kode FAIR.
4. **Mathematical Foundations:** Kriptografi hash digest SHA-256 untuk verifikasi imutabilitas seluruh artefak riset: data mentah, skrip pemrosesan, berkas biner model, dan figur publikasi.
5. **Dataset / Experimental Input:** Proyek riset mini komparasi performa dua estimator sinyal dalam kanal terdistorsi (dataset mentah sensor, skrip pembersihan, skrip inferensi, skrip plotting, template naskah LaTeX). `[REPOSITORI RISET LENGKAP]`.
6. **Python Implementation Plan:**
   - Perangkat: `Docker`, `Makefile`, `Git`, `venv`, `click`, `LaTeX`.
   - Modul:
     - `Dockerfile` berbasis Debian/Python slim dengan lockfile dependensi presisi.
     - `Makefile` modular: `make setup`, `make data`, `make test`, `make analyze`, `make paper`, `make verify`.
     - Script pengujian unit matematika (`pytest`) dan skrip verifikasi checksum integritas data.
7. **Expected Results:**
   - Eksekusi satu perintah `make all` di dalam lingkungan bersih berhasil:
     1. Memverifikasi hash integritas data mentah.
     2. Menjalankan seluruh pipeline analisis data dan uji hipotesis.
     3. Membangun figur publikasi resolusi tinggi.
     4. Mengompilasi naskah artikel ilmiah berformat PDF via LaTeX.
     5. Menghasilkan audit report dengan status "ALL ARTIFACTS VERIFIED".
8. **Validation Criteria:** Eksekusi berulang pada mesin berbeda menghasilkan checksum SHA-256 berkas output numerik yang identik bit-per-bit.
9. **Numerical Tolerance:** Bit-exact determinism ($\epsilon = 0.0$) pada output tabel numerik dan toleransi render grafis standar.
10. **Common Methodological Errors:** Mengunggah repositori yang hanya memuat script Jupyter Notebook yang tidak terurut dengan path berkas hard-coded lokal (`C:\Users\Username\Desktop\...`) tanpa petunjuk instalasi dependensi.
11. **Exercises:**
    - Tambahkan modul validasi data otomatis menggunakan skema Pydantic untuk memvalidasi integritas format data input sebelum eksekusi.
    - Integrasikan GitHub Actions workflow sederhana untuk menjalankan pengujian unit otomatis saat terjadi perubahan kode.
12. **Assessment:** Repositori riset publik yang dievaluasi menggunakan kriteria ACM Artifact Review (Functional & Reusable).
13. **Reproducibility Instructions:** `git clone <repo> && cd <repo> && make all`.

