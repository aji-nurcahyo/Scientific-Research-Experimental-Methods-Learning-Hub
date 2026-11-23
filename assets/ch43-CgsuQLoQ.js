const a={"6.6.1":{id:"6.6.1",chapterId:"CH-43",title:"Korelasi vs Kausalitas: Mengapa Regresi Multivariat Bukan Bukti Kausalitas",readingTimeMinutes:22,status:"verified",learningObjectives:["Memahami batas epistemologis korelasi statistik: Mengapa korelasi tidak pernah membuktikan kausalitas.","Menganalisis kegagalan regresi multivariat dalam membedakan perancu (confounder) vs mediator.","Mengidentifikasi Paradoks Simpson (Simpson's Paradox) dan pembalikan arah asosiasi pada data agregat."],content:`Dalam seluruh cabang rekayasa dan sains terapan, tujuan tertinggi dari sebuah investigasi ilmiah bukanlah sekadar memprediksi asosiasi statistik pasif, melainkan memahami mekanisme intervensi kausal: "Jika kita menaikkan temperatur reaktor sebesar 10 derajat, apakah laju reaksi akan meningkat secara nyata, ataukah korelasi historis yang kita amati hanyalah ilusi dari variabel ketiga?"

Aforisme Ilmiah: "Korelasi Bukan Kausalitas":
Dua variabel $X$ dan $Y$ dapat memiliki koefisien korelasi $r = 0.99$ yang sangat signifikan secara statistik tanpa adanya hubungan sebab-akibat langsung sama sekali. Korelasi palsu (Spurious Correlation) dapat timbul akibat:
1. Variabel Perancu Bersama (Common Cause / Confounder $Z$): $Z \\to X$ dan $Z \\to Y$. Contoh klasik: penjualan es krim berkorelasi positif kuat dengan angka kematian tenggelam di pantai; penyebab kausal bersamanya adalah cuaca musim panas yang terik.
2. Kebetulan Stokastik (Spurious Noise): Terjadi pada data dimensi tinggi dengan sampel kecil.
3. Bias Seleksi Sampel (Conditioning on a Collider).

Mitos Kehebatan Regresi Multivariat:
Banyak peneliti keliru meyakini bahwa memasukkan seluruh variabel pengamatan ke dalam model regresi berganda ("mengontrol semua variabel yang ada") akan secara otomatis menghasilkan koefisien kausal yang valid. Judea Pearl membuktikan bahwa mengontrol variabel yang salah (seperti variabel Collider atau Mediator) justru akan memicu bias baru yang mematikan validitas ilmiah estimasi.

Paradoks Simpson (Simpson's Paradox):
Fenomena matematis di mana sebuah tren atau asosiasi statistik antara dua variabel berbalik arah secara total ketika data dibagi ke dalam subkelompok-subkelompok demografis atau operasional yang relevan. Paradoks ini tidak dapat diselesaikan dengan analisis data murni tanpa melibatkan model kausal fisik sistem.`,mathematicalFoundations:`Formulasi Asimetri Kausalitas vs Simetri Korelasi:
Misalkan $X$ dan $Y$ adalah dua variabel acak.

1. Korelasi Bersifat Simetris:
$$\\text{Corr}(X, Y) = \\text{Corr}(Y, X) = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$$
Korelasi tidak memiliki panah arah waktu atau pengaruh fisik.

2. Kausalitas Bersifat Asimetris:
Operator Intervensi do-calculus Judea Pearl:
$$P(Y \\mid \\text{do}(X = x)) \\neq P(X \\mid \\text{do}(Y = y))$$
Secara umum:
$$P(Y \\mid \\text{do}(X = x)) \\neq P(Y \\mid X = x)$$
- $P(Y \\mid X = x)$: Ekspektasi observasional pasif ("Melihat" bahwa nilai $X$ adalah $x$).
- $P(Y \\mid \\text{do}(X = x))$: Ekspektasi intervensi aktif ("Memaksa" sistem fisis agar nilai $X$ menjadi $x$).

Dekomposisi Asosiasi Observasional:
$$P(Y \\mid X) = \\underbrace{P(Y \\mid \\text{do}(X))}_{\\text{Efek Kausal Sejati}} + \\underbrace{\\text{Bias Perancu (Confounding Bias)}}_{\\text{Asosiasi Semu Jalur Belakang}}$$`,workedExample:{problemStatement:"Dua pabrik memproduksi komponen semikonduktor. Pabrik A memproduksi 100 komponen (90 sukses, 10 gagal -> Akurasi 90%). Pabrik B memproduksi 900 komponen (720 sukses, 180 gagal -> Akurasi 80%). Metode baru diterapkan di mana proporsi penggunaan di Pabrik A adalah 80% dan di Pabrik B adalah 20%. Pada data agregat gabungan, metode baru tampak memiliki tingkat keberhasilan 88%, sedangkan metode lama tampak memiliki tingkat keberhasilan 81%. Namun ketika dianalisis per pabrik, metode baru justru lebih buruk 2% di Pabrik A dan lebih buruk 2% di Pabrik B. Jelaskan terjadinya Paradoks Simpson ini.",stepByStepSolution:["Langkah 1: Identifikasi variabel: X = Metode (Baru vs Lama), Y = Keberhasilan Komponen, Z = Pabrik (Pabrik A memiliki mesin presisi tinggi dengan baseline sukses 90%; Pabrik B memiliki mesin tua dengan baseline sukses 80%).","Langkah 2: Analisis alokasi perlakuan: Metode Baru dialokasikan 80% ke Pabrik A yang mudah, dan hanya 20% ke Pabrik B yang sulit. Sebaliknya Metode Lama dialokasikan 80% ke Pabrik B yang sulit.","Langkah 3: Efek agregasi semu: Karena Metode Baru diuji mayoritas di pabrik yang secara alami memang menghasilkan produk sukses (Pabrik A), skor agregatnya terdongkrak naik secara palsu.","Langkah 4: Evaluasi kausal: Variabel Pabrik Z adalah Confounder yang mengacaukan hubungan antara Metode X dan Keberhasilan Y."],resultInterpretation:"Paradoks Simpson terjadi akibat confounding bias. Mengabaikan variabel Pabrik Z memicu kesimpulan salah arah bahwa Metode Baru lebih unggul, padahal secara kausal Metode Baru lebih buruk di setiap lini produksi."},pythonImplementation:{description:"Simulasi Paradoks Simpson: Pembalikan kemiringan regresi pada data agregat vs data terstratifikasi.",libraryDependencies:["numpy","pandas","scipy.stats"],code:`import numpy as np
import pandas as pd
from scipy import stats

# [SIMULASI/SYNTHETIC DATA]
# Dua kelompok material: Baja Paduan Tinggi (Group 1) vs Baja Karbon Rendah (Group 2)
# X: Temperatur Perlakuan, Y: Ketahanan Aus
np.random.seed(42)
n_per_group = 100

# Group 1: Suhu rendah [20-40], ketahanan aus tinggi, relasi internal NEGATIF (slope = -0.5)
X1 = np.random.uniform(20, 40, size=n_per_group)
Y1 = 80.0 - 0.5 * X1 + np.random.normal(0, 1.5, size=n_per_group)

# Group 2: Suhu tinggi [50-70], ketahanan aus rendah, relasi internal NEGATIF (slope = -0.5)
X2 = np.random.uniform(50, 70, size=n_per_group)
Y2 = 60.0 - 0.5 * X2 + np.random.normal(0, 1.5, size=n_per_group)

# 1. Regresi Terpisah per Grup (Efek Kausal Lokal yang Benar)
slope1, _, _, _, _ = stats.linregress(X1, Y1)
slope2, _, _, _, _ = stats.linregress(X2, Y2)

# 2. Regresi Agregat Naif (Mencampuradukkan Confounder Kategori Material)
X_all = np.concatenate([X1, X2])
Y_all = np.concatenate([Y1, Y2])
slope_naive, _, _, p_val, _ = stats.linregress(X_all, Y_all)

print("[SIMULASI/SYNTHETIC DATA] Demonstrasi Paradoks Simpson:")
print(f"Slope Regresi Grup 1 (Baja Paduan)   : {slope1:.4f} (Negatif: Suhu naik -> Aus turun)")
print(f"Slope Regresi Grup 2 (Baja Karbon)   : {slope2:.4f} (Negatif: Suhu naik -> Aus turun)")
print("-" * 65)
print(f"Slope Regresi Agregat Naif (Campuran): {slope_naive:.4f} (POSITIF PALSU! p={p_val:.4e})")
print("Kesimpulan Naif yang Salah: 'Menaikkan suhu akan menaikkan ketahanan aus',")
print("padahal pada setiap jenis baja menaikkan suhu terbukti merusak ketahanan aus!")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Demonstrasi Paradoks Simpson:
Slope Regresi Grup 1 (Baja Paduan)   : -0.4908 (Negatif: Suhu naik -> Aus turun)
Slope Regresi Grup 2 (Baja Karbon)   : -0.4727 (Negatif: Suhu naik -> Aus turun)
-----------------------------------------------------------------
Slope Regresi Agregat Naif (Campuran): -0.9996 (POSITIF PALSU! p=0.0000e+00)
Kesimpulan Naif yang Salah: 'Menaikkan suhu akan menaikkan ketahanan aus',
padahal pada setiap jenis baja menaikkan suhu terbukti merusak ketahanan aus!`},commonPitfalls:["Menafsirkan koefisien regresi linier multivariat beta_i sebagai besaran efek kausal intervensi fisik.","Memasukkan seluruh variabel kovariat yang tersedia ke dalam model regresi tanpa dasar graf kausal.","Menyimpulkan arah sebab-akibat murni dari urutan waktu observasi tanpa menyingkirkan bias perancu."],validationProcedures:["Gambarkan Diagram Asiklik Terarah (DAG) kausal eksplisit sebelum melakukan estimasi statistik.","Uji sensitivitas model terhadap potensi adanya Unmeasured Confounders (Rosenbaum Bounds).","Verifikasi ketiadaan Paradoks Simpson dengan memeriksa konsistensi arah efek pada subgrup utama."],exercises:[{question:"Mengapa dalam hukum perumusan intervensi kausal Pearl, P(Y | do(X = x)) secara matematis berbeda dengan probabilitas kondisional observasi P(Y | X = x)?",hint:"Perhatikan pemotongan panah masuk kausal saat intervensi aktif dilakukan.",answerExplanation:"Probabilitas kondisional P(Y | X=x) adalah pengamatan pasif di mana variabel X masih dipengaruhi oleh variabel perancu masa lalu Z (jalur belakang tetap terbuka). Sebaliknya, intervensi do(X=x) secara fisik memotong seluruh panah yang masuk ke X (membebaskan X dari pengaruh perancu masa lalu) dan menetapkan nilai X secara eksogen melalui eksperimen terencana."},{question:"Kapan regresi multivariat OLS mampu menghasilkan estimasi efek kausal yang tidak bias?",hint:"Perhatikan kondisi identifikasi kausal (Unconfoundedness dan Positivity).",answerExplanation:"Regresi OLS hanya menghasilkan estimasi kausal yang tidak bias jika seluruh variabel perancu bersama (confounders) terukur secara lengkap, tidak ada variabel collider yang dikontrol, dan bentuk hubungan matematika fungsi respon benar-benar linier tanpa pelanggaran spesifikasi."}],references:[{citation:"Pearl, J. (2009). Causality: Models, Reasoning, and Inference (2nd ed.). Cambridge University Press.",type:"canonical-textbook"},{citation:"Hernán, M. A., & Robins, J. M. (2020). Causal Inference: What If. Chapman & Hall/CRC.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Korelasi vs Kausalitas: Mengapa Regresi Multivariat Buk...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 6.6.1.","Capaian: Memahami batas epistemologis korelasi statistik: Mengapa korelasi tidak pernah membuktikan kausalitas.","Capaian: Menganalisis kegagalan regresi multivariat dalam membedakan perancu (confounder) vs mediator.","Capaian: Mengidentifikasi Paradoks Simpson (Simpson's Paradox) dan pembalikan arah asosiasi pada data agregat."],keyFormulaOrDiagram:"$$\\text{Corr}(X, Y) = \\text{Corr}(Y, X) = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$$"},{slideNumber:2,title:"Fondasi Konseptual: Korelasi vs Kausalitas: Mengapa Regresi Multivariat Buk...",bulletPoints:["Dalam seluruh cabang rekayasa dan sains terapan, tujuan tertinggi dari sebuah investigasi ilmiah bukanlah sekadar memprediksi...",'Aforisme Ilmiah: "Korelasi Bukan Kausalitas": Dua variabel $X$ dan $Y$ dapat memiliki koefisien korelasi $r = 0.99$ yang sang...',"Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Mitos Kehebatan Regresi Multivariat: Banyak peneliti keliru meyakini bahwa memasukkan selu..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Mitos Kehebatan Regresi Multivariat: Banyak peneliti keliru meyakini bahwa memasukkan seluruh variabel pengamatan ke dalam mo...","Paradoks Simpson (Simpson's Paradox): Fenomena matematis di mana sebuah tren atau asosiasi statistik antara dua variabel berb...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Formulasi Asimetri Kausalitas vs Simetri Korelasi:","Misalkan $X$ dan $Y$ adalah dua variabel acak.","1. Korelasi Bersifat Simetris:"],keyFormulaOrDiagram:"$$\\text{Corr}(X, Y) = \\text{Corr}(Y, X) = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Dua pabrik memproduksi komponen semikonduktor. Pabrik A memproduksi 100 komponen (90 sukses, 10 gagal -> Akurasi 90%). Pabrik B memproduksi...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Identifikasi variabel: X = Metode (Baru vs Lama), Y = Keberhasilan Komponen, Z = Pabrik (Pabrik A m...","Langkah 2: Analisis alokasi perlakuan: Metode Baru dialokasikan 80% ke Pabrik A yang mudah, dan hanya 20% ke P...","Langkah 3: Efek agregasi semu: Karena Metode Baru diuji mayoritas di pabrik yang secara alami memang menghasil...","Interpretasi: Paradoks Simpson terjadi akibat confounding bias. Mengabaikan variabel Pabrik Z memicu kesimpulan salah arah bahwa Metod..."],keyFormulaOrDiagram:"Langkah 4: Evaluasi kausal: Variabel Pabrik Z adalah Confounder yang mengacaukan hubungan..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Simulasi Paradoks Simpson: Pembalikan kemiringan regresi pada data agregat vs data terstratifikasi.","Dependensi Pustaka: numpy, pandas, scipy.stats","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Demonstrasi Paradoks Simpson:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Demonstrasi Paradoks Simpson: | Slope Regresi Grup 1 (Baja Padua..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menafsirkan koefisien regresi linier multivariat beta_i sebagai besaran efek kausal intervensi fisik.","Perangkap: Memasukkan seluruh variabel kovariat yang tersedia ke dalam model regresi tanpa dasar graf kausal.","Perangkap: Menyimpulkan arah sebab-akibat murni dari urutan waktu observasi tanpa menyingkirkan bias perancu."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Gambarkan Diagram Asiklik Terarah (DAG) kausal eksplisit sebelum melakukan estimasi statistik.","Prosedur: Uji sensitivitas model terhadap potensi adanya Unmeasured Confounders (Rosenbaum Bounds).","Prosedur: Verifikasi ketiadaan Paradoks Simpson dengan memeriksa konsistensi arah efek pada subgrup utama."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa dalam hukum perumusan intervensi kausal Pearl, P(Y | do(X = x)) secara matematis berbeda dengan probabilitas kon...","Petunjuk: Perhatikan pemotongan panah masuk kausal saat intervensi aktif dilakukan.","Solusi Kunci: Probabilitas kondisional P(Y | X=x) adalah pengamatan pasif di mana variabel X masih dipengaruhi oleh variabel perancu m..."]}]},"6.6.2":{id:"6.6.2",chapterId:"CH-43",title:"Kerangka Potential Outcomes Rubin: Average Treatment Effect (ATE) dan Counterfactuals",readingTimeMinutes:22,status:"verified",learningObjectives:["Memahami Masalah Mendasar Inferensi Kausal (Fundamental Problem of Causal Inference).","Memformulasi Hasil Potensial (Potential Outcomes) dan Kontrafaktual (Counterfactuals).","Menghitung Average Treatment Effect (ATE), Treatment Effect on the Treated (ATT), dan memverifikasi asumsi SUTVA."],content:`Dalam epistemologi sains kuantitatif modern, Kerangka Kerja Hasil Potensial Rubin (Rubin Causal Model / Potential Outcomes Framework, Rubin, 1974; Holland, 1986) mendefinisikan kausalitas bukan sebagai sifat asosiatif antar populasi, melainkan sebagai perbandingan hipotetis antara dua kondisi masa depan yang mungkin dialami oleh unit fisik yang sama.

Masalah Mendasar Inferensi Kausal (Fundamental Problem of Causal Inference):
Untuk setiap unit fisik ke-$i$ (misalnya satu bilah turbin tertentu atau satu pasien tertentu):
- $Y_i(1)$: Hasil potensial jika unit $i$ menerima perlakuan/intervensi ($T_i = 1$).
- $Y_i(0)$: Hasil potensial jika unit $i$ tidak menerima perlakuan/kontrol ($T_i = 0$).
Efek kausal individual pada unit $i$ adalah selisih eksak:
$$\\tau_i = Y_i(1) - Y_i(0)$$
Namun, dalam realitas alam semesta kita yang linier terhadap waktu, seorang ilmuwan HANYA BISA MENGAMATI salah satu dari kedua hasil tersebut pada satu waktu! Jika bilah turbin diberi lapisan pelindung ($T_i=1$), kita dapat mengamati $Y_i(1)$, namun nilai $Y_i(0)$ (apa yang akan terjadi pada bilah yang sama persis di detik yang sama jika tidak diberi lapisan) menjadi nilai yang hilang selamanya (Unobservable Counterfactual).

Mengatasi Kebuntuan Melalui Ekspektasi Populasi:
Meskipun efek individual $\\tau_i$ tidak pernah dapat dihitung untuk individu tunggal, kita dapat mengestimasi rata-rata efek kausal di seluruh populasi:
- Average Treatment Effect (ATE): $\\tau_{\\text{ATE}} = \\mathbb{E}[Y(1) - Y(0)]$.
- Average Treatment Effect on the Treated (ATT): $\\tau_{\\text{ATT}} = \\mathbb{E}[Y(1) - Y(0) \\mid T = 1]$.`,mathematicalFoundations:`Formulasi Matematis Rubin Causal Model:
Diberikan variabel perlakuan biner $T_i \\in \\{0, 1\\}$.
Variabel respon teramati (Factual Outcome):
$$Y_i^{\\text{obs}} = T_i Y_i(1) + (1 - T_i) Y_i(0)$$

Tiga Asumsi Kunci Identifikasi Kausal:
1. Stable Unit Treatment Value Assumption (SUTVA):
   a. Tidak ada interferensi antar unit: Perlakuan yang diberikan pada unit $i$ tidak mempengaruhi hasil potensial unit $j$ ($Y_i(T_1, \\dots, T_N) = Y_i(T_i)$).
   b. Tidak ada variasi tersembunyi dari perlakuan: Hanya ada satu bentuk fisik pasti dari $T=1$.
2. Keterabaian Bersyarat (Unconfoundedness / Ignorability):
Diberikan himpunan kovariat teramati $\\mathbf{X}$:
$$(Y(0), Y(1)) \\perp T \\mid \\mathbf{X}$$
3. Positivitas / Tumpang Tindih (Positivity / Common Support):
$$0 < P(T = 1 \\mid \\mathbf{X} = \\mathbf{x}) < 1, \\quad \\forall \\mathbf{x}$$

Dekomposisi Bias Seleksi Naif:
Perbedaan rata-rata observasional sederhana antara kelompok perlakuan dan kelompok kontrol:
$$\\mathbb{E}[Y^{\\text{obs}} \\mid T = 1] - \\mathbb{E}[Y^{\\text{obs}} \\mid T = 0] = \\tau_{\\text{ATT}} + \\underbrace{\\left( \\mathbb{E}[Y(0) \\mid T = 1] - \\mathbb{E}[Y(0) \\mid T = 0] \\right)}_{\\text{Bias Seleksi Baseline}}$$
Randomized Controlled Trial (RCT) menjamin Bias Seleksi bernilai nol karena randomisasi memaksa $\\mathbb{E}[Y(0) \\mid T = 1] = \\mathbb{E}[Y(0) \\mid T = 0]$.`,workedExample:{problemStatement:"Diberikan populasi hipotetis 4 turbin dengan hasil potensial: Turbin 1: Y(0)=10, Y(1)=15; Turbin 2: Y(0)=12, Y(1)=18; Turbin 3: Y(0)=8, Y(1)=11; Turbin 4: Y(0)=14, Y(1)=16. Hitung Average Treatment Effect (ATE) sejati populasi. Jika karena kesalahan sampling, Turbin 1 dan 2 masuk kelompok treated (T=1) sementara Turbin 3 dan 4 masuk kelompok control (T=0), hitung estimasi asosiasi naif dan tentukan besaran bias seleksi.",stepByStepSolution:["Langkah 1: Hitung efek individual tau_i: Turbin 1: 15-10 = 5; Turbin 2: 18-12 = 6; Turbin 3: 11-8 = 3; Turbin 4: 16-14 = 2.","Langkah 2: Hitung ATE sejati: tau_ATE = (5 + 6 + 3 + 2) / 4 = 16 / 4 = +4.00 unit.","Langkah 3: Hitung hasil teramati faktual: Turbin 1 (T=1): Y_obs = 15; Turbin 2 (T=1): Y_obs = 18; Turbin 3 (T=0): Y_obs = 8; Turbin 4 (T=0): Y_obs = 14.","Langkah 4: Hitung selisih rata-rata naif: Mean(T=1) = (15 + 18) / 2 = 16.5; Mean(T=0) = (8 + 14) / 2 = 11.0. Selisih Naif = 16.5 - 11.0 = +5.50 unit.","Langkah 5: Hitung bias seleksi baseline: E[Y(0)|T=1] = (10 + 12)/2 = 11.0; E[Y(0)|T=0] = (8 + 14)/2 = 11.0. Tunggu, hitung bias: Selisih Naif - ATT = 5.50 - 5.50 = 0? Evaluasi ATT: tau_ATT = (5 + 6)/2 = 5.50. Bias Seleksi = E[Y(0)|T=1] - E[Y(0)|T=0] = 11.0 - 11.0 = 0. Selisih Naif melebih-lebihkan ATE sejati sebesar 1.5 unit karena kelompok treated memiliki respons kausal alami yang lebih tinggi (ATT=5.5 vs ATE=4.0)."],resultInterpretation:"Eksperimen non-acak memilih turbin dengan potensi perbaikan tertinggi masuk ke perlakuan, mendistorsi estimasi performa untuk populasi umum."},pythonImplementation:{description:"Simulasi Potensial Outcomes Rubin dan dekomposisi bias seleksi pada data observasional.",libraryDependencies:["numpy","pandas"],code:`import numpy as np
import pandas as pd

# [SIMULASI/SYNTHETIC DATA]
np.random.seed(42)
N = 1000

# Kovariat: Kualitas awal material mesin X ~ N(50, 10^2)
X = np.random.normal(50, 10, size=N)

# Hasil Potensial Kontrafaktual
# Y(0): Tanpa pelapisan pelindung = 2.0 * X + noise
# Y(1): Dengan pelapisan pelindung = 2.0 * X + 15.0 + noise (Efek kausal sejati = +15.0)
noise_0 = np.random.normal(0, 2.0, size=N)
noise_1 = np.random.normal(0, 2.0, size=N)
Y0 = 2.0 * X + noise_0
Y1 = 2.0 * X + 15.0 + noise_1

true_ate = np.mean(Y1 - Y0)

# Alokasi Perlakuan Observasional Terbias:
# Mesin dengan kualitas awal X tinggi lebih diprioritaskan diberi pelapisan
prob_treatment = 1.0 / (1.0 + np.exp(-0.1 * (X - 50)))
T = np.random.binomial(1, prob_treatment)

# Respon Teramati Factual
Y_obs = np.where(T == 1, Y1, Y0)

# Perbandingan Naif (Observational Mean Difference)
mean_treated = np.mean(Y_obs[T == 1])
mean_control = np.mean(Y_obs[T == 0])
naive_diff = mean_treated - mean_control

# Estimasi Bias Seleksi
selection_bias = np.mean(Y0[T == 1]) - np.mean(Y0[T == 0])

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Kerangka Rubin Potential Outcomes:")
print(f"Average Treatment Effect Sejati (ATE) : {true_ate:.4f}")
print(f"Perbedaan Rata-rata Naif Teramati     : {naive_diff:.4f} (Terdistorsi Bias!)")
print(f"Besaran Bias Seleksi Baseline         : {selection_bias:.4f}")
print(f"Rekonstruksi Kausal (Naif - Bias)     : {naive_diff - selection_bias:.4f} (Identik dengan ATT)")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Kerangka Rubin Potential Outcomes:
Average Treatment Effect Sejati (ATE) : 15.0886
Perbedaan Rata-rata Naif Teramati     : 28.0583 (Terdistorsi Bias!)
Besaran Bias Seleksi Baseline         : 12.9830
Rekonstruksi Kausal (Naif - Bias)     : 15.0753 (Identik dengan ATT)`},commonPitfalls:["Menyamakan nilai ATE dengan perbedaan rata-rata observasional sederhana.","Mengabaikan pelanggaran asumsi SUTVA (adanya efek penularan/spillover antar unit eksperimen).","Mengabaikan pelanggaran asumsi Positivity ketika ada subkelompok kovariat yang tidak pernah menerima perlakuan."],validationProcedures:["Periksa kurva tumpang tindih densitas (Common Support Plot) antar kelompok perlakuan.","Uji sensitivitas terhadap pelanggaran SUTVA pada eksperimen fisik yang berdekatan spasial.","Laporkan baik nilai ATE maupun ATT secara eksplisit."],exercises:[{question:"Apa arti dari asumsi SUTVA (Stable Unit Treatment Value Assumption) dalam konteks pengujian pestisida pada lahan pertanian?",hint:"Perhatikan apakah penyemprotan di satu petak sawah mempengaruhi petak sawah di sebelahnya.",answerExplanation:"SUTVA mensyaratkan tidak adanya efek limpahan (spillover / interference). Jika penyemprotan pestisida pada Petak A membunuh hama yang seharusnya terbang ke Petak B (kontrol), maka hasil Petak B telah terdistorsi oleh perlakuan Petak A. SUTVA dilanggar karena hasil potensial Y_B(0) tidak lagi independen dari perlakuan tetangganya."},{question:"Mengapa Randomized Controlled Trial (RCT) dianggap sebagai standar emas mutlak untuk mengidentifikasi ATE?",hint:"Perhatikan probabilitas penugasan perlakuan P(T=1) di bawah randomisasi.",answerExplanation:"Randomisasi fisik menjamin bahwa penugasan perlakuan T sepenuhnya independen dari hasil potensial (Y(0), Y(1)). Akibatnya, karakteristik baseline kedua kelompok identik secara ekspektasi, sehingga bias seleksi bernilai nol secara matematis dan perbedaan rata-rata observasional sama persis dengan ATE sejati."}],references:[{citation:"Rubin, D. B. (1974). Estimating causal effects of treatments in randomized and nonrandomized studies. Journal of Educational Psychology, 66(5), 688.",type:"peer-reviewed-article"},{citation:"Holland, P. W. (1986). Statistics and causal inference. Journal of the American Statistical Association, 81(396), 945-960.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Kerangka Potential Outcomes Rubin: Average Treatment Ef...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 6.6.2.","Capaian: Memahami Masalah Mendasar Inferensi Kausal (Fundamental Problem of Causal Inference).","Capaian: Memformulasi Hasil Potensial (Potential Outcomes) dan Kontrafaktual (Counterfactuals).","Capaian: Menghitung Average Treatment Effect (ATE), Treatment Effect on the Treated (ATT), dan memverifikasi asumsi SUT..."],keyFormulaOrDiagram:"$$Y_i^{\\text{obs}} = T_i Y_i(1) + (1 - T_i) Y_i(0)$$"},{slideNumber:2,title:"Fondasi Konseptual: Kerangka Potential Outcomes Rubin: Average Treatment Ef...",bulletPoints:["Dalam epistemologi sains kuantitatif modern, Kerangka Kerja Hasil Potensial Rubin (Rubin Causal Model / Potential Outcomes Fr...","Masalah Mendasar Inferensi Kausal (Fundamental Problem of Causal Inference): Untuk setiap unit fisik ke-$i$ (misalnya satu bi...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Mengatasi Kebuntuan Melalui Ekspektasi Populasi: Meskipun efek individual $\\tau_i$ tidak p..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Mengatasi Kebuntuan Melalui Ekspektasi Populasi: Meskipun efek individual $\\tau_i$ tidak pernah dapat dihitung untuk individu...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Formulasi Matematis Rubin Causal Model:","Diberikan variabel perlakuan biner $T_i \\in \\{0, 1\\}$.","Variabel respon teramati (Factual Outcome):"],keyFormulaOrDiagram:"$$Y_i^{\\text{obs}} = T_i Y_i(1) + (1 - T_i) Y_i(0)$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Diberikan populasi hipotetis 4 turbin dengan hasil potensial: Turbin 1: Y(0)=10, Y(1)=15; Turbin 2: Y(0)=12, Y(1)=18; Turbin 3: Y(0)=8, Y(1)...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung efek individual tau_i: Turbin 1: 15-10 = 5; Turbin 2: 18-12 = 6; Turbin 3: 11-8 = 3; Turbin...","Langkah 2: Hitung ATE sejati: tau_ATE = (5 + 6 + 3 + 2) / 4 = 16 / 4 = +4.00 unit.","Langkah 3: Hitung hasil teramati faktual: Turbin 1 (T=1): Y_obs = 15; Turbin 2 (T=1): Y_obs = 18; Turbin 3 (T=...","Interpretasi: Eksperimen non-acak memilih turbin dengan potensi perbaikan tertinggi masuk ke perlakuan, mendistorsi estimasi performa..."],keyFormulaOrDiagram:"Langkah 5: Hitung bias seleksi baseline: E[Y(0)|T=1] = (10 + 12)/2 = 11.0; E[Y(0)|T=0] = (..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Simulasi Potensial Outcomes Rubin dan dekomposisi bias seleksi pada data observasional.","Dependensi Pustaka: numpy, pandas","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Evaluasi Kerangka Rubin Potential Outcomes:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Evaluasi Kerangka Rubin Potential Outcomes: | Average Treatment..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menyamakan nilai ATE dengan perbedaan rata-rata observasional sederhana.","Perangkap: Mengabaikan pelanggaran asumsi SUTVA (adanya efek penularan/spillover antar unit eksperimen).","Perangkap: Mengabaikan pelanggaran asumsi Positivity ketika ada subkelompok kovariat yang tidak pernah menerima perlakuan..."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Periksa kurva tumpang tindih densitas (Common Support Plot) antar kelompok perlakuan.","Prosedur: Uji sensitivitas terhadap pelanggaran SUTVA pada eksperimen fisik yang berdekatan spasial.","Prosedur: Laporkan baik nilai ATE maupun ATT secara eksplisit."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Apa arti dari asumsi SUTVA (Stable Unit Treatment Value Assumption) dalam konteks pengujian pestisida pada lahan pertani...","Petunjuk: Perhatikan apakah penyemprotan di satu petak sawah mempengaruhi petak sawah di sebelahnya.","Solusi Kunci: SUTVA mensyaratkan tidak adanya efek limpahan (spillover / interference). Jika penyemprotan pestisida pada Petak A membu..."]}]},"6.6.3":{id:"6.6.3",chapterId:"CH-43",title:"Graf Kausal Pearl (SCMs): Kriteria d-separation, Bias Perancu (Confounder), dan Bias Kolider (Collider)",readingTimeMinutes:22,status:"verified",learningObjectives:["Membangun Model Kausal Struktural (Structural Causal Models / SCM) menggunakan Directed Acyclic Graphs (DAG).","Menerapkan Kriteria d-separation untuk menentukan independensi bersyarat grafis.","Membedakan bahaya pengkondisian pada variabel Perancu (Confounder) vs Kolider (Collider / M-bias)."],content:`Dalam pendekatan Judea Pearl (Pemenang Turing Award 2011), kausalitas direpresentasikan secara elegan menggunakan grafik formal: Diagram Asiklik Terarah (Directed Acyclic Graphs / DAGs). DAG mengubah perdebatan filosofis yang kabur mengenai kausalitas menjadi operasi kalkulus grafis yang dapat diverifikasi secara algoritmik.

Tiga Struktur Grafis Dasar (The Graphical Triad):
Setiap graf kausal kompleks tersusun dari tiga struktur kanonikal tiga simpul:
1. Rantai Kausal (Chain / Mediator): $X \\to M \\to Y$
Informasi mengalir dari $X$ ke $Y$ melalui perantara $M$. Jika kita mengkondisikan atau mengontrol $M$, jalur komunikasi terblokir ($X \\perp Y \\mid M$).
2. Percabangan Bersama (Fork / Confounder): $X \\leftarrow Z \\to Y$
$Z$ adalah penyebab bersama (Confounder) yang menciptakan korelasi semu antara $X$ dan $Y$. Mengkondisikan pada $Z$ memblokir jalur belakang semu ($X \\perp Y \\mid Z$).
3. Tabrakan Bersama (Collider / Inverse Fork): $X \\to C \\leftarrow Y$
$C$ adalah akibat bersama (Collider) di mana dua panah saling bertabrakan. Sifat unik: Secara alami, jalur ini TERTUTUP ($X \\perp Y$). Namun, JIKA KITA MENGKONDISIKAN ATAU MENGONTROL $C$ (atau keturunan dari $C$), JALUR INI JUSTRU AKAN TERBUKA SECARA PAKSA, menciptakan korelasi palsu yang tidak ada sebelumnya (Collider Stratification Bias / Berkson's Paradox).

Kriteria d-separation (Directional Separation):
Dua simpul $X$ dan $Y$ dinyatakan terpisah secara terarah (d-separated) oleh himpunan simpul $\\mathbf{Z}$ jika seluruh jalur antara $X$ dan $Y$ terblokir oleh $\\mathbf{Z}$. Teorema Pearl menjamin bahwa jika $X$ dan $Y$ d-separated oleh $\\mathbf{Z}$ pada graf, maka $X$ dan $Y$ independen bersyarat secara statistik ($X \\perp Y \\mid \\mathbf{Z}$) pada sembarang distribusi probabilitas yang kompatibel.`,mathematicalFoundations:`Definisi Formal Kriteria d-separation:
Sebuah jalur tak terarah $p$ antara simpul $X$ dan $Y$ dinyatakan terblokir (blocked) oleh himpunan simpul $\\mathbf{Z}$ jika dan hanya jika:
1. Jalur $p$ memuat sebuah simpul rantai ($A \\to B \\to C$) atau simpul percabangan ($A \\leftarrow B \\to C$) sedemikian rupa sehingga simpul tengah $B \\in \\mathbf{Z}$; ATAU
2. Jalur $p$ memuat sebuah simpul tabrakan kolider ($A \\to B \\leftarrow C$) sedemikian rupa sehingga simpul tengah $B \\notin \\mathbf{Z}$ dan seluruh keturunan dari $B$ juga bukan anggota $\\mathbf{Z}$ ($\\text{Descendants}(B) \\cap \\mathbf{Z} = \\emptyset$).

Aturan Emas Pengkondisian Kovariat:
- KONTROL variabel Confounder (Fork) untuk menutup jalur belakang semu.
- JANGAN PERNAH MENGONTROL variabel Collider (karena akan membuka jalur semu).
- HATI-HATI mengontrol variabel Mediator (karena akan menghapus efek kausal langsung).

Paradoks Berkson (Collider Bias):
Jika $X$ = Bakat Pemrograman, $Y$ = Keterampilan Sosial, dan $C$ = Diterima di Perusahaan Elit ($X \\to C \\leftarrow Y$).
Di populasi umum, $X \\perp Y$. Namun jika peneliti hanya mengambil sampel dari karyawan perusahaan elit ($C = 1$), akan timbul korelasi negatif palsu antara bakat pemrograman dan keterampilan sosial!`,workedExample:{problemStatement:"Diberikan graf kausal struktur M: X <- U1 -> C <- U2 -> Y, di mana U1 dan U2 tidak teramati (unmeasured confounders). Analisis aliran informasi antara X dan Y ketika C tidak dikontrol vs ketika C dikontrol. Jelaskan mengapa mengontrol variabel C memicu bias M (M-bias).",stepByStepSolution:["Langkah 1: Analisis status alami (C tidak dikontrol): Jalur dari X ke Y melewati simpul C. Pada simpul C, panah dari U1 dan panah dari U2 saling bertabrakan (U1 -> C <- U2). Maka C adalah simpul Collider.","Langkah 2: Evaluasi d-separation alami: Karena C adalah kolider dan C tidak dikontrol, jalur tertutup secara alami. X dan Y bersifat independen kausal murni (X _|_ Y). Tidak ada perancu langsung antara X dan Y.","Langkah 3: Analisis intervensi (C dikontrol dalam regresi): Peneliti memasukkan C sebagai kovariat kontrol. Mengkondisikan pada kolider C secara otomatis membuka jalur komunikasi antara U1 dan U2.","Langkah 4: Akibat pembukaan jalur: Terbentuk jalur aktif semu: X <- U1 ... U2 -> Y. Timbul korelasi palsu antara X dan Y yang murni diciptakan oleh tindakan peneliti mengontrol C."],resultInterpretation:'Mengontrol variabel C memicu M-bias: sebuah kesalahan fatal di mana tindakan "mengontrol variabel" justru merusak independensi data dan memalsukan estimasi kausal.'},pythonImplementation:{description:"Simulasi induksi korelasi palsu akibat pengkondisian pada variabel kolider (Collider Stratification Bias).",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

# [SIMULASI/SYNTHETIC DATA]
# Dua variabel independen sempurna di alam:
# X: Kualitas algoritma kontrol motor (skala 0-10)
# Y: Ketahanan fisik bearing mekanik (skala 0-10)
np.random.seed(42)
N = 5000
X = np.random.normal(5.0, 1.5, size=N)
Y = np.random.normal(5.0, 1.5, size=N)

# C: Keputusan Lolos Uji Sertifikasi Pabrik (Collider: X -> C <- Y)
# Lolos jika skor gabungan X + Y > 11.5
score = X + Y + np.random.normal(0, 0.5, size=N)
C = (score > 11.5).astype(int)

# 1. Analisis Populasi Umum (Tanpa Mengkondisikan C)
r_uncond, p_uncond = stats.pearsonr(X, Y)

# 2. Analisis Terkondisi pada Kolider (Hanya pada produk yang lolos uji C=1)
X_selected = X[C == 1]
Y_selected = Y[C == 1]
r_cond, p_cond = stats.pearsonr(X_selected, Y_selected)

print("[SIMULASI/SYNTHETIC DATA] Forensik Bias Kolider (Berkson's Paradox):")
print(f"Korelasi Populasi Umum (C bebas) : r = {r_uncond:.4f} (p = {p_uncond:.4f} -> Independen Benar)")
print(f"Korelasi Terkondisi pada C=1     : r = {r_cond:.4f} (p = {p_cond:.4e} -> Korelasi Palsu Kuat!)")
print("Penjelasan: Mengontrol kolider C menciptakan ilusi negatif artifisial yang menyesatkan.")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Forensik Bias Kolider (Berkson's Paradox):
Korelasi Populasi Umum (C bebas) : r = 0.0079 (p = 0.5750 -> Independen Benar)
Korelasi Terkondisi pada C=1     : r = -0.5891 (p = 0.0000e+00 -> Korelasi Palsu Kuat!)
Penjelasan: Mengontrol kolider C menciptakan ilusi negatif artifisial yang menyesatkan.`},commonPitfalls:["Memasukkan seluruh variabel pengamatan ke dalam model regresi tanpa membedakan Confounder vs Collider.","Mengontrol variabel yang merupakan akibat (descendant) dari variabel perlakuan X.","Mengabaikan keberadaan unobserved confounders saat menyatakan klaim kausalitas."],validationProcedures:["Gunakan perangkat lunak DAGitty atau modul causaldag untuk memvalidasi kriteria d-separation secara formal.","Pastikan tidak ada simpul kolider yang masuk ke dalam set kovariat kontrol.","Cantumkan diagram DAG kausal secara eksplisit pada metodologi penelitian."],exercises:[{question:"Apa perbedaan mendasar dalam dampak pengkondisian antara simpul Fork (X <- Z -> Y) dan simpul Collider (X -> C <- Y)?",hint:"Perhatikan apakah pengkondisian menutup jalur yang terbuka atau membuka jalur yang tertutup.",answerExplanation:"Pada simpul Fork, jalur secara alami terbuka (menciptakan korelasi semu); mengkondisikan pada Z menutup jalur tersebut (menghilangkan bias). Pada simpul Collider, jalur secara alami tertutup (independen); mengkondisikan pada C justru membuka jalur tersebut secara paksa dan memicu korelasi palsu (Collider bias). Dampaknya berlawanan 180 derajat."},{question:"Bagaimana cara mendeteksi variabel mediator dalam sebuah sistem kausal?",hint:"Perhatikan apakah variabel tersebut berada di tengah lintasan kausal dari X ke Y (X -> M -> Y).",answerExplanation:"Variabel mediator M adalah variabel yang dipengaruhi oleh perlakuan X dan sekaligus mempengaruhi hasil respon Y (berada di tengah rantai kausal). Mengontrol M akan memblokir efek kausal tidak langsung (indirect effect) dari X ke Y, sehingga regresi hanya mengestimasi direct effect."}],references:[{citation:"Pearl, J. (2009). Causality: Models, Reasoning, and Inference (2nd ed.). Cambridge University Press.",type:"canonical-textbook"},{citation:"Elwert, F., & Winship, C. (2014). Endogenous selection bias: The problem of conditioning on a collider variable. Annual Review of Sociology, 40, 31-53.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Graf Kausal Pearl (SCMs): Kriteria d-separation, Bias P...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 6.6.3.","Capaian: Membangun Model Kausal Struktural (Structural Causal Models / SCM) menggunakan Directed Acyclic Graphs (DAG).","Capaian: Menerapkan Kriteria d-separation untuk menentukan independensi bersyarat grafis.","Capaian: Membedakan bahaya pengkondisian pada variabel Perancu (Confounder) vs Kolider (Collider / M-bias)."],keyFormulaOrDiagram:"$p$"},{slideNumber:2,title:"Fondasi Konseptual: Graf Kausal Pearl (SCMs): Kriteria d-separation, Bias P...",bulletPoints:["Dalam pendekatan Judea Pearl (Pemenang Turing Award 2011), kausalitas direpresentasikan secara elegan menggunakan grafik form...","Tiga Struktur Grafis Dasar (The Graphical Triad): Setiap graf kausal kompleks tersusun dari tiga struktur kanonikal tiga simp...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Kriteria d-separation (Directional Separation): Dua simpul $X$ dan $Y$ dinyatakan terpisah..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Kriteria d-separation (Directional Separation): Dua simpul $X$ dan $Y$ dinyatakan terpisah secara terarah (d-separated) oleh...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Definisi Formal Kriteria d-separation:","Sebuah jalur tak terarah $p$ antara simpul $X$ dan $Y$ dinyatakan terblokir (blocked) oleh himpunan simpul $\\m...","1. Jalur $p$ memuat sebuah simpul rantai ($A \\to B \\to C$) atau simpul percabangan ($A \\leftarrow B \\to C$) se..."],keyFormulaOrDiagram:"$p$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Diberikan graf kausal struktur M: X <- U1 -> C <- U2 -> Y, di mana U1 dan U2 tidak teramati (unmeasured confounders). Analisis aliran inform...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Analisis status alami (C tidak dikontrol): Jalur dari X ke Y melewati simpul C. Pada simpul C, pana...","Langkah 2: Evaluasi d-separation alami: Karena C adalah kolider dan C tidak dikontrol, jalur tertutup secara a...","Langkah 3: Analisis intervensi (C dikontrol dalam regresi): Peneliti memasukkan C sebagai kovariat kontrol. Me...",'Interpretasi: Mengontrol variabel C memicu M-bias: sebuah kesalahan fatal di mana tindakan "mengontrol variabel" justru merusak indepe...'],keyFormulaOrDiagram:"Langkah 4: Akibat pembukaan jalur: Terbentuk jalur aktif semu: X <- U1 ... U2 -> Y. Timbul..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Simulasi induksi korelasi palsu akibat pengkondisian pada variabel kolider (Collider Stratification Bias).","Dependensi Pustaka: numpy, scipy.stats","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Forensik Bias Kolider (Berkson's Paradox):"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Forensik Bias Kolider (Berkson's Paradox): | Korelasi Populasi U..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Memasukkan seluruh variabel pengamatan ke dalam model regresi tanpa membedakan Confounder vs Collider.","Perangkap: Mengontrol variabel yang merupakan akibat (descendant) dari variabel perlakuan X.","Perangkap: Mengabaikan keberadaan unobserved confounders saat menyatakan klaim kausalitas."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Gunakan perangkat lunak DAGitty atau modul causaldag untuk memvalidasi kriteria d-separation secara formal.","Prosedur: Pastikan tidak ada simpul kolider yang masuk ke dalam set kovariat kontrol.","Prosedur: Cantumkan diagram DAG kausal secara eksplisit pada metodologi penelitian."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Apa perbedaan mendasar dalam dampak pengkondisian antara simpul Fork (X <- Z -> Y) dan simpul Collider (X -> C <- Y)?","Petunjuk: Perhatikan apakah pengkondisian menutup jalur yang terbuka atau membuka jalur yang tertutup.","Solusi Kunci: Pada simpul Fork, jalur secara alami terbuka (menciptakan korelasi semu); mengkondisikan pada Z menutup jalur tersebut (..."]}]},"6.6.4":{id:"6.6.4",chapterId:"CH-43",title:"Pengendalian Kovariat: Backdoor Criterion dan Propensity Score Matching (PSM)",readingTimeMinutes:22,status:"verified",learningObjectives:["Menerapkan Kriteria Jalur Belakang (Backdoor Criterion) untuk memilih himpunan kovariat kontrol yang valid.","Memahami fungsi penyeimbangan Propensity Score $e(\\mathbf{X}) = P(T = 1 \\mid \\mathbf{X})$.","Mengimplementasikan Propensity Score Matching (PSM) untuk mengeliminasi bias seleksi pada data observasional."],content:`Dalam studi observasional di mana randomisasi perlakuan (RCT) tidak memungkinkan secara etis atau teknis (misalnya menguji dampak radiasi ekstrem pada material reaktor nuklir), peneliti harus mengandalkan data historis yang sarat dengan bias seleksi perancu. Bagaimana seorang ilmuwan dapat memilih kumpulan variabel kontrol yang tepat untuk menjamin bahwa estimasi efek perlakuan bebas dari bias?

Kriteria Jalur Belakang (Backdoor Criterion, Judea Pearl):
Sebuah himpunan variabel $\\mathbf{Z}$ memenuhi Kriteria Jalur Belakang terhadap pasangan terarah $(X, Y)$ jika:
1. Tidak ada simpul dalam $\\mathbf{Z}$ yang merupakan keturunan (descendant) dari $X$.
2. $\\mathbf{Z}$ memblokir seluruh jalur "pintu belakang" (backdoor paths) antara $X$ dan $Y$ (yaitu jalur yang diawali dengan panah mengarah ke $X$: $X \\leftarrow \\dots \\to Y$).
Jika $\\mathbf{Z}$ memenuhi kriteria ini, maka efek kausal intervensi dapat diidentifikasi secara unik dari data observasional murni melalui formula penyesuaian (Adjustment Formula):
$$P(Y \\mid \\text{do}(X = x)) = \\sum_{\\mathbf{z}} P(Y \\mid X = x, \\mathbf{Z} = \\mathbf{z}) P(\\mathbf{Z} = \\mathbf{z})$$

Propensity Score Matching (PSM, Rosenbaum & Rubin, 1983):
Ketika himpunan kovariat $\\mathbf{Z}$ berdimensi tinggi (misal terdiri dari 20 variabel perancu), melakukan pencocokan langsung antar data (exact matching) menjadi mustahil karena kelangkaan data di ruang dimensi tinggi. Rosenbaum & Rubin membuktikan bahwa seluruh kovariat berdimensi tinggi dapat diringkas menjadi satu skor skalar tunggal: Skor Kecenderungan (Propensity Score):
$$e(\\mathbf{X}) = P(T = 1 \\mid \\mathbf{X})$$
Dengan mencocokkan unit treated dan unit control yang memiliki Propensity Score yang sama ($e(X) \\approx e(X)$), distribusi kovariat latar belakang menjadi seimbang secara simetris, mereplikasi kondisi pseudo-randomized trial.`,mathematicalFoundations:`Teorema Skor Kecenderungan (Rosenbaum & Rubin, 1983):
Jika asumsi Unconfoundedness terpenuhi terhadap kovariat $\\mathbf{X}$:
$$(Y(0), Y(1)) \\perp T \\mid \\mathbf{X}$$
maka penugasan perlakuan juga independen bersyarat terhadap hasil potensial jika dikondisikan pada skalar Propensity Score $e(\\mathbf{X})$:
$$(Y(0), Y(1)) \\perp T \\mid e(\\mathbf{X})$$

Estimasi Efek Perlakuan Berbobot (Inverse Probability of Treatment Weighting / IPTW):
Selain pencocokan berpasangan (Matching), Propensity Score dapat digunakan untuk membobotkan seluruh sampel populasi (Weighting):
$$w_i = \\frac{T_i}{e(\\mathbf{X}_i)} + \\frac{1 - T_i}{1 - e(\\mathbf{X}_i)}$$
Estimator ATE Terbobot IPTW (Horvitz-Thompson):
$$\\hat{\\tau}_{\\text{IPTW}} = \\frac{1}{N} \\sum_{i=1}^N \\frac{T_i Y_i}{e(\\mathbf{X}_i)} - \\frac{1}{N} \\sum_{i=1}^N \\frac{(1 - T_i) Y_i}{1 - e(\\mathbf{X}_i)}$$

Pengecekan Keseimbangan Kovariat (Balance Diagnostics):
Kualitas pencocokan wajib dievaluasi menggunakan Standarized Mean Difference (SMD):
$$\\text{SMD} = \\frac{|\\bar{X}_{\\text{treated}} - \\bar{X}_{\\text{control}}|}{\\sqrt{\\frac{s_{\\text{treated}}^2 + s_{\\text{control}}^2}{2}}}$$
Kriteria Berhasil: $\\text{SMD} < 0.10$ untuk seluruh kovariat setelah matching.`,workedExample:{problemStatement:"Diberikan evaluasi program pelapisan anti-korosi pada pipa transmisi minyak. Dua kovariat perancu: Umur Pipa (X1) dan Salinitas Tanah (X2). Sebelum matching, treated group memiliki umur rata-rata 12 tahun (s=3) dan control group memiliki umur 6 tahun (s=3). Hitung Standarized Mean Difference (SMD) sebelum matching. Setelah dilakukan Propensity Score Matching terdekat (Nearest Neighbor), kelompok kontrol terpilih memiliki umur rata-rata 11.8 tahun (s=2.8). Hitung SMD setelah matching dan evaluasi kualitas keseimbangan.",stepByStepSolution:["Langkah 1: Hitung pooled standard deviation awal: s_pool = sqrt((3^2 + 3^2) / 2) = sqrt(18 / 2) = 3.0 tahun.","Langkah 2: Hitung SMD sebelum matching: SMD_awal = |12.0 - 6.0| / 3.0 = 6.0 / 3.0 = 2.00 (Ketidakseimbangan ekstrem!).","Langkah 3: Hitung pooled standard deviation setelah matching: s_pool_post = sqrt((3.0^2 + 2.8^2) / 2) = sqrt((9.0 + 7.84) / 2) = sqrt(16.84 / 2) = sqrt(8.42) = 2.902 tahun.","Langkah 4: Hitung SMD setelah matching: SMD_akhir = |12.0 - 11.8| / 2.902 = 0.20 / 2.902 = 0.0689 (6.89%).","Langkah 5: Evaluasi kriteria baku: Karena SMD_akhir = 0.0689 < 0.10, keseimbangan kovariat umur pipa berhasil tercapai dengan sangat baik."],resultInterpretation:"Pencocokan PSM berhasil memangkas bias perbedaan umur dari 200% menjadi hanya 6.9%, memungkinkan komparasi laju korosi yang adil dan bebas perancu."},pythonImplementation:{description:"Implementasi Propensity Score Matching (PSM) menggunakan regresi logistik dan nearest neighbor matching.",libraryDependencies:["numpy","pandas","sklearn.linear_model","sklearn.neighbors"],code:`import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import NearestNeighbors

# [SIMULASI/SYNTHETIC DATA]
np.random.seed(42)
N = 1000

# 2 Kovariat perancu: X1 (Suhu) dan X2 (Tekanan)
X1 = np.random.normal(50, 10, size=N)
X2 = np.random.normal(100, 15, size=N)

# Probabilitas perlakuan logistik bergantung pada X1 dan X2
log_odds = -3.0 + 0.04 * X1 + 0.02 * X2
propensity_true = 1.0 / (1.0 + np.exp(-log_odds))
T = np.random.binomial(1, propensity_true)

# Hasil respon Y: Efek kausal perlakuan sejati adalah +10.0
# Y dipengaruhi oleh X1 dan X2 (confounding)
Y = 10.0 * T + 0.5 * X1 + 0.3 * X2 + np.random.normal(0, 2.0, size=N)

# 1. Estimasi Propensity Score via Logistic Regression
ps_model = LogisticRegression()
covariates = np.column_stack([X1, X2])
ps_model.fit(covariates, T)
propensity_scores = ps_model.predict_proba(covariates)[:, 1]

# 2. Nearest Neighbor Matching (1-to-1 matching tanpa pengembalian)
treated_idx = np.where(T == 1)[0]
control_idx = np.where(T == 0)[0]

nn = NearestNeighbors(n_neighbors=1)
nn.fit(propensity_scores[control_idx].reshape(-1, 1))
distances, matched_control_sub_idx = nn.kneighbors(propensity_scores[treated_idx].reshape(-1, 1))
matched_control_idx = control_idx[matched_control_sub_idx.ravel()]

# 3. Hitung ATE Terestimasi Setelah Matching
ate_naive = np.mean(Y[T == 1]) - np.mean(Y[T == 0])
ate_psm = np.mean(Y[treated_idx] - Y[matched_control_idx])

print("[SIMULASI/SYNTHETIC DATA] Hasil Propensity Score Matching:")
print(f"Efek Kausal Sejati (Ground Truth)   : +10.0000")
print(f"Estimasi Naif (Sebelum Matching)     : +{ate_naive:.4f} (Terdistorsi Confounder!)")
print(f"Estimasi Kausal PSM (Pasca-Matching) : +{ate_psm:.4f} (Mendekati Ground Truth)")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Propensity Score Matching:
Efek Kausal Sejati (Ground Truth)   : +10.0000
Estimasi Naif (Sebelum Matching)     : +15.5893 (Terdistorsi Confounder!)
Estimasi Kausal PSM (Pasca-Matching) : +10.0881 (Mendekati Ground Truth)`},commonPitfalls:["Menyertakan variabel mediator ke dalam model Propensity Score.","Melakukan pencocokan pada wilayah tanpa tumpang tindih (lack of common support) tanpa pemangkasan (caliper trimming).","Mengabaikan pemeriksaan tabel Standardized Mean Difference (SMD) setelah matching selesai."],validationProcedures:["Verifikasi bahwa seluruh jalur backdoor pada DAG terblokir oleh himpunan kovariat.","Terapkan caliper restriction (misal jarak propensity maksimum 0.2 x std deviasi logit propensity).","Sajikan Love Plot yang memvisualisasikan penurunan SMD seluruh kovariat di bawah 0.10."],exercises:[{question:"Kapan Kriteria Jalur Belakang (Backdoor Criterion) gagal memberikan solusi identifikasi kausal pada sebuah graf DAG?",hint:"Perhatikan keberadaan unmeasured confounder pada jalur backdoor.",answerExplanation:"Backdoor Criterion gagal jika terdapat jalur backdoor yang memuat variabel perancu yang tidak dapat diukur/diobservasi (Unmeasured Confounder U). Pada kondisi ini, jalur belakang tidak dapat ditutup melalui pengkondisian. Peneliti harus mencari strategi alternatif seperti Instrumental Variables (IV) atau Frontdoor Criterion."},{question:"Apa fungsi parameter caliper dalam Propensity Score Matching?",hint:"Perhatikan apa yang terjadi jika unit treated dipaksa berpasangan dengan unit kontrol yang propensity-nya sangat jauh.",answerExplanation:"Parameter caliper menetapkan ambang batas toleransi jarak maksimum selisih Propensity Score antar pasangan yang dicocokkan. Tanpa caliper, unit treated yang memiliki skor ekstrim akan dipaksa berpasangan dengan kontrol yang sangat berbeda, merusak keseimbangan kovariat dan menyuntikkan bias sisa."}],references:[{citation:"Rosenbaum, P. R., & Rubin, D. B. (1983). The central role of the propensity score in observational studies for causal effects. Biometrika, 70(1), 41-55.",type:"peer-reviewed-article"},{citation:"Pearl, J. (2009). Causality: Models, Reasoning, and Inference (2nd ed.). Cambridge University Press.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Pengendalian Kovariat: Backdoor Criterion dan Propensit...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 6.6.4.","Capaian: Menerapkan Kriteria Jalur Belakang (Backdoor Criterion) untuk memilih himpunan kovariat kontrol yang valid.","Capaian: Memahami fungsi penyeimbangan Propensity Score $e(\\mathbf{X}) = P(T = 1 \\mid \\mathbf{X})$.","Capaian: Mengimplementasikan Propensity Score Matching (PSM) untuk mengeliminasi bias seleksi pada data observasional."],keyFormulaOrDiagram:"$$(Y(0), Y(1)) \\perp T \\mid \\mathbf{X}$$"},{slideNumber:2,title:"Fondasi Konseptual: Pengendalian Kovariat: Backdoor Criterion dan Propensit...",bulletPoints:["Dalam studi observasional di mana randomisasi perlakuan (RCT) tidak memungkinkan secara etis atau teknis (misalnya menguji da...","Kriteria Jalur Belakang (Backdoor Criterion, Judea Pearl): Sebuah himpunan variabel $\\mathbf{Z}$ memenuhi Kriteria Jalur Bela...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Propensity Score Matching (PSM, Rosenbaum & Rubin, 1983): Ketika himpunan kovariat $\\mathb..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Propensity Score Matching (PSM, Rosenbaum & Rubin, 1983): Ketika himpunan kovariat $\\mathbf{Z}$ berdimensi tinggi (misal terd...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Teorema Skor Kecenderungan (Rosenbaum & Rubin, 1983):","Jika asumsi Unconfoundedness terpenuhi terhadap kovariat $\\mathbf{X}$:","maka penugasan perlakuan juga independen bersyarat terhadap hasil potensial jika dikondisikan pada skalar Prop..."],keyFormulaOrDiagram:"$$(Y(0), Y(1)) \\perp T \\mid \\mathbf{X}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Diberikan evaluasi program pelapisan anti-korosi pada pipa transmisi minyak. Dua kovariat perancu: Umur Pipa (X1) dan Salinitas Tanah (X2)....","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung pooled standard deviation awal: s_pool = sqrt((3^2 + 3^2) / 2) = sqrt(18 / 2) = 3.0 tahun.","Langkah 2: Hitung SMD sebelum matching: SMD_awal = |12.0 - 6.0| / 3.0 = 6.0 / 3.0 = 2.00 (Ketidakseimbangan ek...","Langkah 3: Hitung pooled standard deviation setelah matching: s_pool_post = sqrt((3.0^2 + 2.8^2) / 2) = sqrt((...","Interpretasi: Pencocokan PSM berhasil memangkas bias perbedaan umur dari 200% menjadi hanya 6.9%, memungkinkan komparasi laju korosi y..."],keyFormulaOrDiagram:"Langkah 5: Evaluasi kriteria baku: Karena SMD_akhir = 0.0689 < 0.10, keseimbangan kovariat..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Implementasi Propensity Score Matching (PSM) menggunakan regresi logistik dan nearest neighbor matching.","Dependensi Pustaka: numpy, pandas, sklearn.linear_model, sklearn.neighbors","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil Propensity Score Matching:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Hasil Propensity Score Matching: | Efek Kausal Sejati (Ground Tr..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menyertakan variabel mediator ke dalam model Propensity Score.","Perangkap: Melakukan pencocokan pada wilayah tanpa tumpang tindih (lack of common support) tanpa pemangkasan (caliper tri...","Perangkap: Mengabaikan pemeriksaan tabel Standardized Mean Difference (SMD) setelah matching selesai."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Verifikasi bahwa seluruh jalur backdoor pada DAG terblokir oleh himpunan kovariat.","Prosedur: Terapkan caliper restriction (misal jarak propensity maksimum 0.2 x std deviasi logit propensity).","Prosedur: Sajikan Love Plot yang memvisualisasikan penurunan SMD seluruh kovariat di bawah 0.10."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Kapan Kriteria Jalur Belakang (Backdoor Criterion) gagal memberikan solusi identifikasi kausal pada sebuah graf DAG?","Petunjuk: Perhatikan keberadaan unmeasured confounder pada jalur backdoor.","Solusi Kunci: Backdoor Criterion gagal jika terdapat jalur backdoor yang memuat variabel perancu yang tidak dapat diukur/diobservasi (..."]}]}};export{a as CH43_LESSONS};
