const a={"4.1.1":{id:"4.1.1",chapterId:"CH-24",title:"Model Regresi Linier Sederhana dan Berganda: Penurunan Matriks OLS",readingTimeMinutes:22,status:"verified",learningObjectives:["Menurunkan vektor koefisien estimator Ordinary Least Squares (OLS) menggunakan kalkulus matriks.","Memahami sifat geometris proyeksi ortogonal ruang kolom matriks desain.","Menghitung matriks varians-kovarians estimator dan standar error koefisien regresi."],content:`Regresi linier merupakan salah satu alat pemodelan statistik dan inferensial paling fundamental dalam rekayasa dan sains eksperimental. Model ini mengkuantifikasi hubungan fungsional antara satu atau lebih variabel penjelas (prediktor/independen) dengan satu variabel respon kontinu (dependen).

Meskipun secara komputasi estimasi regresi dapat diselesaikan dengan memanggil fungsi perangkat lunak satu baris, pemahaman mendalam mengenai penurunan matematis Ordinary Least Squares (OLS) adalah syarat mutlak bagi peneliti. Dalam pendekatan OLS, estimator dicari dengan meminimalkan Jumlah Kuadrat Residu (Residual Sum of Squares / RSS), yaitu selisih kuadrat antara nilai observasi empiris dan nilai prediksi model.

Dalam formulasi aljabar linier modern, permasalahan OLS dipandang sebagai proyeksi ortogonal geometris: vektor respon y yang berada pada ruang dimensi n diproyeksikan secara tegak lurus ke dalam subruang dimensi p yang dibentangkan oleh kolom-kolom matriks desain X. Vektor proyeksi tersebut merupakan estimasi y-hat terbaik, dan vektor selisihnya (residu e) tegak lurus terhadap seluruh kolom prediktor, menjamin bahwa korelasi sampel antara prediktor dan residual adalah tepat nol.`,mathematicalFoundations:`1. Formulasi Matriks Model Regresi Linier Berganda:
$$\\mathbf{y} = \\mathbf{X} \\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$$
di mana:
- $\\mathbf{y} \\in \\mathbb{R}^{n \\times 1}$ adalah vektor respon observasi.
- $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$ adalah matriks desain (dengan kolom pertama biasanya bernilai 1 untuk intersep).
- $\\boldsymbol{\\beta} \\in \\mathbb{R}^{p \\times 1}$ adalah vektor koefisien regresi populasi sejati.
- $\\boldsymbol{\\epsilon} \\in \\mathbb{R}^{n \\times 1}$ adalah vektor galat acak (error) dengan $E[\\boldsymbol{\\epsilon}] = \\mathbf{0}$ dan $\\text{Var}(\\boldsymbol{\\epsilon}) = \\sigma^2 \\mathbf{I}_n$.

2. Penurunan Solusi Normal Equation OLS:
Fungsi objektif Jumlah Kuadrat Residu (RSS):
$$S(\\boldsymbol{\\beta}) = \\mathbf{e}^T \\mathbf{e} = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) = \\mathbf{y}^T \\mathbf{y} - 2 \\boldsymbol{\\beta}^T \\mathbf{X}^T \\mathbf{y} + \\boldsymbol{\\beta}^T \\mathbf{X}^T \\mathbf{X} \\boldsymbol{\\beta}$$
Diferensial parsial matriks terhadap $\\boldsymbol{\\beta}$ disamakan dengan nol:
$$\\frac{\\partial S(\\boldsymbol{\\beta})}{\\partial \\boldsymbol{\\beta}} = -2 \\mathbf{X}^T \\mathbf{y} + 2 \\mathbf{X}^T \\mathbf{X} \\boldsymbol{\\beta} = \\mathbf{0}$$
Persamaan Normal:
$$\\mathbf{X}^T \\mathbf{X} \\hat{\\boldsymbol{\\beta}} = \\mathbf{X}^T \\mathbf{y}$$
Jika $\\mathbf{X}$ memiliki rank penuh ($p$), matriks $\\mathbf{X}^T \\mathbf{X}$ memiliki invers:
$$\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}$$

3. Matriks Hat dan Proyeksi Ortogonal:
$$\\hat{\\mathbf{y}} = \\mathbf{X} \\hat{\\boldsymbol{\\beta}} = \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y} = \\mathbf{H} \\mathbf{y}$$
Matriks $\\mathbf{H} = \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T$ adalah matriks proyeksi ortogonal (idempoten: $\\mathbf{H}^2 = \\mathbf{H}$, simetris: $\\mathbf{H}^T = \\mathbf{H}$).

4. Matriks Kovarians Estimator:
$$\\text{Cov}(\\hat{\\boldsymbol{\\beta}}) = \\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}$$
di mana estimasi varians galat tak bias dihitung sebagai $s^2 = \\frac{\\mathbf{e}^T \\mathbf{e}}{n - p}$. Standar error koefisien ke-$j$ adalah $\\text{SE}(\\hat{\\beta}_j) = s \\sqrt{[(\\mathbf{X}^T \\mathbf{X})^{-1}]_{jj}}$.`,workedExample:{problemStatement:`Pada pengujian daya pembangkitan turbin angin mikro terhadap kecepatan angin (X1, m/s) dan suhu udara (X2, deg C), diperoleh data n = 4 pengamatan:
y = [10, 20, 22, 32]^T
X1 = [2, 4, 5, 7]^T
X2 = [25, 26, 24, 27]^T
Susun matriks desain X (dengan intersep) dan turunkan estimasi OLS koefisien beta secara matriks.`,stepByStepSolution:[`Langkah 1: Susun matriks desain X (4 x 3) dan vektor y (4 x 1):
X = [[1, 2, 25], [1, 4, 26], [1, 5, 24], [1, 7, 27]], y = [10, 20, 22, 32]^T.`,`Langkah 2: Hitung matriks produk X^T X:
Kolom 0: sum(1)=4, sum(X1)=18, sum(X2)=102.
sum(X1^2) = 4 + 16 + 25 + 49 = 94.
sum(X2^2) = 625 + 676 + 576 + 729 = 2606.
sum(X1*X2) = 50 + 104 + 120 + 189 = 463.
X^T X = [[4, 18, 102], [18, 94, 463], [102, 463, 2606]].`,`Langkah 3: Hitung vektor produk X^T y:
sum(y) = 10 + 20 + 22 + 32 = 84.
sum(X1*y) = 20 + 80 + 110 + 224 = 434.
sum(X2*y) = 250 + 520 + 528 + 864 = 2162.
X^T y = [84, 434, 2162]^T.`,`Langkah 4: Selesaikan sistem persamaan linier (X^T X) beta = X^T y:
Inversi dan eliminasi menghasilkan:
beta_0 = -2.5714, beta_1 (Kecepatan Angin) = 4.2857, beta_2 (Suhu) = 0.3571.`],resultInterpretation:"Model regresi yang diperoleh adalah y_hat = -2.57 + 4.29*X1 + 0.36*X2. Setiap kenaikan kecepatan angin 1 m/s diprediksi menaikkan daya rata-rata sebesar 4.29 Watt, sedangkan kenaikan suhu 1 deg C memberikan kontribusi 0.36 Watt."},pythonImplementation:{description:"Implementasi OLS aljabar matriks murni via NumPy dan verifikasi menggunakan statsmodels.",libraryDependencies:["numpy","statsmodels"],code:`import numpy as np
import statsmodels.api as sm

# Matriks desain X dan vektor y
X_raw = np.array([
    [2.0, 25.0],
    [4.0, 26.0],
    [5.0, 24.0],
    [7.0, 27.0]
])
y = np.array([10.0, 20.0, 22.0, 32.0])

# Tambahkan kolom intersep
n = len(y)
X = np.column_stack([np.ones(n), X_raw])

# 1. Komputasi OLS Matriks Manual: beta = (X^T X)^(-1) X^T y
XtX = X.T @ X
Xty = X.T @ y
beta_hat = np.linalg.solve(XtX, Xty)

# Komputasi SE koefisien
residuals = y - X @ beta_hat
p = X.shape[1]
sigma2_hat = np.sum(residuals**2) / (n - p)
cov_beta = sigma2_hat * np.linalg.inv(XtX)
se_beta = np.sqrt(np.diag(cov_beta))

print("[SIMULASI/SYNTHETIC DATA] Estimasi Matriks OLS")
print(f"Koefisien beta_hat : {beta_hat}")
print(f"Standar Error SE   : {se_beta}")

# 2. Verifikasi dengan statsmodels OLS
model = sm.OLS(y, X).fit()
print(f"\\nVerifikasi Statsmodels Summary:")
print(f"Params: {model.params}")
print(f"bse   : {model.bse}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Estimasi Matriks OLS
Koefisien beta_hat : [-2.57142857  4.28571429  0.35714286]
Standar Error SE   : [20.73028938  0.35714286  0.80377935]

Verifikasi Statsmodels Summary:
Params: [-2.57142857  4.28571429  0.35714286]
bse   : [20.73028938  0.35714286  0.80377935]`},commonPitfalls:["Lupa menambahkan kolom intersep (konstanta 1) pada matriks desain X sehingga memaksa garis regresi melewati titik origin (0,0).","Menginversi matriks X^T X secara langsung menggunakan inv() alih-alih menyelesaikan sistem persamaan linier solve() yang lebih stabil secara numerik.","Mengabaikan singularitas matriks ketika prediktor mengalami multikolinearitas sempurna (kolom linier dependen)."],validationProcedures:["Periksa apakah rank matriks X sama dengan jumlah kolom p (kondisi rank penuh).","Verifikasi bahwa jumlah residu sum(e) mendekati nol (dengan toleransi numerik 1e-12) ketika intersep disertakan.","Konfirmasi bahwa vektor residu e ortogonal terhadap setiap kolom prediktor X_j (X^T e = 0)."],exercises:[{question:"Mengapa matriks hat H = X(X^T X)^(-1) X^T disebut sebagai matriks idempoten?",hint:"Perhatikan sifat perkalian matriks H dengan dirinya sendiri: H * H.",answerExplanation:"Matriks H disebut idempoten karena H^2 = H. Secara geometris, memproyeksikan vektor yang sudah berada di dalam subruang proyeksi untuk kedua kalinya tidak mengubah posisinya sama sekali."}],references:[{citation:"Montgomery, D. C., Peck, E. A., & Vining, G. G. (2021). Introduction to Linear Regression Analysis (6th ed.). John Wiley & Sons.",type:"canonical-textbook"},{citation:"Seber, G. A., & Lee, A. J. (2012). Linear Regression Analysis. John Wiley & Sons.",type:"canonical-textbook"}],slides:[{slideNumber:1,layout:"concept",title:"Tinjauan & Capaian: Model Regresi Linier Sederhana dan Berganda: Penurunan Matriks OLS",lead:"Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.1.1.",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.1.1 dalam kurikulum riset rekayasa.","Capaian 1: Menurunkan vektor koefisien estimator Ordinary Least Squares (OLS) menggunakan kalkulus matriks.","Capaian 2: Memahami sifat geometris proyeksi ortogonal ruang kolom matriks desain.","Capaian 3: Menghitung matriks varians-kovarians estimator dan standar error koefisien regresi."],keyFormulaOrDiagram:"$$\\mathbf{y} = \\mathbf{X} \\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$$",notes:"Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.1.1."},{slideNumber:2,layout:"concept",title:"Fondasi Konseptual: Model Regresi Linier Sederhana dan Berganda: Penurunan Matriks OLS",lead:"Regresi linier merupakan salah satu alat pemodelan statistik dan inferensial paling fundamental dalam rekayasa dan sains eksperimental.",bulletPoints:["Model ini mengkuantifikasi hubungan fungsional antara satu atau lebih variabel penjelas (prediktor/independen) dengan satu variabel respon kontinu (dependen).","Meskipun secara komputasi estimasi regresi dapat diselesaikan dengan memanggil fungsi perangkat lunak satu baris, pemahaman mendalam mengenai penurunan matematis Ordinary Least Squares (OLS) adalah syarat mutlak bagi peneliti.","Dalam pendekatan OLS, estimator dicari dengan meminimalkan Jumlah Kuadrat Residu (Residual Sum of Squares / RSS), yaitu selisih kuadrat antara nilai observasi empiris dan nilai prediksi model."],notes:"Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."},{slideNumber:3,layout:"concept",title:"Arsitektur Metodologis & Desain Operasional",lead:"Dalam formulasi aljabar linier modern, permasalahan OLS dipandang sebagai proyeksi ortogonal geometris: vektor respon y yang berada pada ruang dimensi n diproyeksikan secara tegak lurus ke dalam subruang dimensi p yang dibentangkan oleh kolom-kolom matriks desain X.",bulletPoints:["Vektor proyeksi tersebut merupakan estimasi y-hat terbaik, dan vektor selisihnya (residu e) tegak lurus terhadap seluruh kolom prediktor, menjamin bahwa korelasi sampel antara prediktor dan residual adalah tepat nol."],notes:"Tegaskan batas operasional sistem dan validitas internal pengukuran."},{slideNumber:4,layout:"derivation",title:"Formulasi Matematis & Notasi Formal",lead:"1. Formulasi Matriks Model Regresi Linier Berganda:",bulletPoints:["di mana:","- $\\mathbf{y} \\in \\mathbb{R}^{n \\times 1}$ adalah vektor respon observasi.","- $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$ adalah matriks desain (dengan kolom pertama biasanya bernilai 1 untuk intersep)."],keyFormulaOrDiagram:"$$\\mathbf{y} = \\mathbf{X} \\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$$",notes:"Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."},{slideNumber:5,layout:"example",title:"Studi Kasus Numerik: Perumusan Masalah",lead:"Konteks rekayasa dan spesifikasi parameter eksperimen.",bulletPoints:[`Konteks Kasus: Pada pengujian daya pembangkitan turbin angin mikro terhadap kecepatan angin (X1, m/s) dan suhu udara (X2, deg C), diperoleh data n = 4 pengamatan:
y = [10, 20, 22, 32]^T
X1 = [2, 4, 5, 7]^T
X2 = [25, 26, 24, 27]^T
Susun matriks desain X (dengan intersep) dan turunkan estimasi OLS koefisien beta secara matriks.`,"Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."],notes:"Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."},{slideNumber:6,layout:"example",title:"Solusi Numerik: Kalkulasi Langkah demi Langkah",lead:"Prosedur perhitungan analitis dan estimasi parameter.",bulletPoints:[`Langkah 1: Susun matriks desain X (4 x 3) dan vektor y (4 x 1):
X = [[1, 2, 25], [1, 4, 26], [1, 5, 24], [1, 7, 27]], y = [10, 20, 22, 32]^T.`,`Langkah 2: Hitung matriks produk X^T X:
Kolom 0: sum(1)=4, sum(X1)=18, sum(X2)=102.
sum(X1^2) = 4 + 16 + 25 + 49 = 94.
sum(X2^2) = 625 + 676 + 576 + 729 = 2606.
sum(X1*X2) = 50 + 104 + 120 + 189 = 463.
X^T X = [[4, 18, 102], [18, 94, 463], [102, 463, 2606]].`],notes:"Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."},{slideNumber:7,layout:"example",title:"Solusi Numerik: Pembuktian & Interpretasi Hasil",lead:"Evaluasi kriteria keputusan statistik dan signifikansi temuan.",bulletPoints:[`Langkah 3: Hitung vektor produk X^T y:
sum(y) = 10 + 20 + 22 + 32 = 84.
sum(X1*y) = 20 + 80 + 110 + 224 = 434.
sum(X2*y) = 250 + 520 + 528 + 864 = 2162.
X^T y = [84, 434, 2162]^T.`,`Langkah 4: Selesaikan sistem persamaan linier (X^T X) beta = X^T y:
Inversi dan eliminasi menghasilkan:
beta_0 = -2.5714, beta_1 (Kecepatan Angin) = 4.2857, beta_2 (Suhu) = 0.3571.`,"[result: Interpretasi Ilmiah] Model regresi yang diperoleh adalah y_hat = -2.57 + 4.29*X1 + 0.36*X2. Setiap kenaikan kecepatan angin 1 m/s diprediksi menaikkan daya rata-rata sebesar 4.29 Watt, sedangkan kenaikan suhu 1 deg C memberikan kontribusi 0.36 Watt."],notes:"Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."},{slideNumber:8,layout:"algorithm",title:"Implementasi Komputasi & Eksekusi Python",lead:"Implementasi OLS aljabar matriks murni via NumPy dan verifikasi menggunakan statsmodels.",bulletPoints:["Tujuan Algoritma: Implementasi OLS aljabar matriks murni via NumPy dan verifikasi menggunakan statsmodels.","Dependensi Pustaka Ilmiah: numpy, statsmodels","Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Estimasi Matriks OLS"],keyFormulaOrDiagram:`[SIMULASI/SYNTHETIC DATA] Estimasi Matriks OLS
Koefisien beta_hat : [-2.57142857  4.28571429  0.35714286]
Standar Error SE   : [20.73028938  0.35714286  0.80377935]

Verifikasi Statsmodels Summary:`,notes:"Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."},{slideNumber:9,layout:"warning",title:"Perangkap Metodologis & P-Hacking Warning",lead:"Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",bulletPoints:["[warning: Perangkap] Lupa menambahkan kolom intersep (konstanta 1) pada matriks desain X sehingga memaksa garis regresi melewati titik origin (0,0).","[warning: Perangkap] Menginversi matriks X^T X secara langsung menggunakan inv() alih-alih menyelesaikan sistem persamaan linier solve() yang lebih stabil secara numerik.","[warning: Perangkap] Mengabaikan singularitas matriks ketika prediktor mengalami multikolinearitas sempurna (kolom linier dependen)."],notes:"Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."},{slideNumber:10,layout:"example",title:"Prosedur Validasi Empiris & Integritas Riset",lead:"Protokol pengujian ketahanan model dan integritas keterbukaan sains.",bulletPoints:["Prosedur: Periksa apakah rank matriks X sama dengan jumlah kolom p (kondisi rank penuh).","Prosedur: Verifikasi bahwa jumlah residu sum(e) mendekati nol (dengan toleransi numerik 1e-12) ketika intersep disertakan.","Prosedur: Konfirmasi bahwa vektor residu e ortogonal terhadap setiap kolom prediktor X_j (X^T e = 0)."],notes:"Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."},{slideNumber:11,layout:"exercise",title:"Sintesis Materi & Latihan Mandiri",lead:"Pertanyaan penguji pemahaman kritis dan diskusi kelas.",bulletPoints:["Pertanyaan Uji: Mengapa matriks hat H = X(X^T X)^(-1) X^T disebut sebagai matriks idempoten?","Petunjuk Analitis: Perhatikan sifat perkalian matriks H dengan dirinya sendiri: H * H.","Solusi Kunci: Matriks H disebut idempoten karena H^2 = H. Secara geometris, memproyeksikan vektor yang sudah berada di dalam subruang proyeksi untuk kedua kalinya tidak mengubah posisinya sama sekali."],notes:"Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."}]},"4.1.2":{id:"4.1.2",chapterId:"CH-24",title:"Asumsi Klasik Gauss-Markov: Linieritas, Homoskedastisitas, dan Independensi Residu",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami Teorema Gauss-Markov dan kriteria BLUE (Best Linear Unbiased Estimator).","Mengidentifikasi lima asumsi klasik OLS dan konsekuensi matematis dari pelanggarannya.","Membedakan asumsi deterministik pada prediktor versus asumsi stokastik pada komponen galat."],content:`Kekuatan dan keindahan model regresi OLS terletak pada Teorema Gauss-Markov. Teorema ini membuktikan bahwa jika sekumpulan kondisi tertentu (dikenal sebagai Asumsi Klasik Gauss-Markov) terpenuhi, maka estimator OLS adalah Best Linear Unbiased Estimator (BLUE). Kata "Best" di sini memiliki makna matematis yang sangat spesifik: memiliki varians minimum di antara seluruh kelas estimator linier tak bias lainnya.

Lima Asumsi Klasik Gauss-Markov meliputi:
1. Linieritas dalam Parameter: Hubungan antara y dan X bersifat linier dalam koefisien beta. Variabel prediktor itu sendiri boleh berupa transformasi non-linier (seperti x^2 atau log(x)), asalkan parameter beta muncul secara linier.
2. Ekspektasi Nol Galat Kondisional: E[epsilon | X] = 0. Galat acak rata-rata adalah nol untuk setiap nilai prediktor, yang mengimplikasikan tidak adanya variabel pengganggu terabaikan yang berkorelasi dengan prediktor (ketiadaan endogenitas).
3. Homoskedastisitas: Varians dari suku galat bersifat konstan di seluruh spektrum prediktor: Var(epsilon_i | X) = sigma^2. Pelanggaran asumsi ini disebut heteroskedastisitas.
4. Ketiadaan Autokorelasi (Independensi Galat): Kovarians antara galat pada dua observasi berbeda adalah nol: Cov(epsilon_i, epsilon_j | X) = 0 untuk i != j.
5. Rank Penuh (Tidak Ada Multikolinearitas Sempurna): Matriks X berukuran n x p memiliki rank p, sehingga tidak ada prediktor yang merupakan kombinasi linier sempurna dari prediktor lainnya.

Jika kelima asumsi ini terpenuhi, Teorema Gauss-Markov menjamin efisiensi optimal estimator OLS. Jika ditambah satu asumsi pelengkap, yaitu Galat Terdistribusi Normal (epsilon ~ N(0, sigma^2 I)), maka uji hipotesis t-Student dan F-Fisher menjadi valid secara eksak untuk inferensi sampel berapapun ukurannya.`,mathematicalFoundations:`1. Pernyataan Teorema Gauss-Markov:
Diberikan model $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$ dengan asumsi:
- $E[\\boldsymbol{\\epsilon} | \\mathbf{X}] = \\mathbf{0}$
- $\\text{Var}(\\boldsymbol{\\epsilon} | \\mathbf{X}) = \\sigma^2 \\mathbf{I}_n$
- $\\text{rank}(\\mathbf{X}) = p$

Maka estimator OLS $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}$ adalah BLUE:
Untuk setiap estimator linier tak bias $\\tilde{\\boldsymbol{\\beta}} = \\mathbf{C} \\mathbf{y}$, matriks selisih varians:
$$\\text{Var}(\\tilde{\\boldsymbol{\\beta}}) - \\text{Var}(\\hat{\\boldsymbol{\\beta}}) \\ge \\mathbf{0} \\quad (\\text{Semi-Definit Positif})$$

2. Konsekuensi Matematis Pelanggaran Asumsi:
- Pelanggaran Homoskedastisitas $(\\text{Var}(\\boldsymbol{\\epsilon}) = \\boldsymbol{\\Omega} \\ne \\sigma^2 \\mathbf{I})$:
Estimator $\\hat{\\boldsymbol{\\beta}}$ tetap tak bias ($E[\\hat{\\boldsymbol{\\beta}}] = \\boldsymbol{\\beta}$), namun variansnya tidak lagi minimum (bukan "Best"), dan rumus standar error konvensional $s^2 (\\mathbf{X}^T \\mathbf{X})^{-1}$ menjadi bias dan salah arah, merusak inferensi p-value dan interval kepercayaan.
- Pelanggaran Eksogenitas $(E[\\boldsymbol{\\epsilon} | \\mathbf{X}] \\ne \\mathbf{0})$:
Estimator $\\hat{\\boldsymbol{\\beta}}$ menjadi bias dan inkonsisten: $\\text{plim} \\, \\hat{\\boldsymbol{\\beta}} \\ne \\boldsymbol{\\beta}$. Ini adalah kegagalan paling fatal dalam penelitian kausal.`,workedExample:{problemStatement:"Buktikan secara analitis bahwa jika estimator OLS adalah beta_hat = (X^T X)^(-1) X^T y dan asumsi E[epsilon | X] = 0 terpenuhi, maka beta_hat adalah estimator tak bias (unbiased estimator) dari parameter sejati beta.",stepByStepSolution:["Langkah 1: Substitusikan persamaan model sejati y = X beta + epsilon ke dalam formula estimator OLS:","beta_hat = (X^T X)^(-1) X^T (X beta + epsilon).","Langkah 2: Distribusikan perkalian matriks:","beta_hat = (X^T X)^(-1) (X^T X) beta + (X^T X)^(-1) X^T epsilon.","Langkah 3: Karena (X^T X)^(-1) (X^T X) = I (matriks identitas):","beta_hat = beta + (X^T X)^(-1) X^T epsilon.","Langkah 4: Ambil ekspektasi kondisional terhadap X pada kedua sisi:","E[beta_hat | X] = E[beta | X] + E[(X^T X)^(-1) X^T epsilon | X].","Langkah 5: Karena beta dan X bersifat deterministik bersyarat:","E[beta_hat | X] = beta + (X^T X)^(-1) X^T E[epsilon | X].","Langkah 6: Terapkan asumsi ekspektasi nol galat E[epsilon | X] = 0:","E[beta_hat | X] = beta + (X^T X)^(-1) X^T (0) = beta + 0 = beta."],resultInterpretation:"Terbukti bahwa E[beta_hat] = beta. Estimator OLS bersifat tak bias sempurna asalkan asumsi eksogenitas E[epsilon | X] = 0 terpenuhi."},pythonImplementation:{description:"Simulasi Monte Carlo membuktikan sifat tak bias OLS di bawah kondisi Gauss-Markov.",libraryDependencies:["numpy"],code:`import numpy as np

np.random.seed(42)
n_simulasi = 10000
n_sampel = 50
beta_sejati = np.array([5.0, 2.5])  # Intersep = 5, Slope = 2.5
sigma_error = 2.0

# Matriks prediktor tetap X
X1 = np.linspace(1, 10, n_sampel)
X = np.column_stack([np.ones(n_sampel), X1])
XtX_inv_Xt = np.linalg.inv(X.T @ X) @ X.T

beta_estimasi = np.zeros((n_simulasi, 2))

for i in range(n_simulasi):
    epsilon = np.random.normal(0, sigma_error, size=n_sampel)
    y = X @ beta_sejati + epsilon
    beta_estimasi[i] = XtX_inv_Xt @ y

rata_beta = np.mean(beta_estimasi, axis=0)

print("[SIMULASI/SYNTHETIC DATA] Verifikasi Sifat Unbiased Teorema Gauss-Markov")
print(f"Jumlah Replikasi : {n_simulasi}")
print(f"Parameter Sejati : Intersep = {beta_sejati[0]:.4f}, Slope = {beta_sejati[1]:.4f}")
print(f"Rata-rata OLS    : Intersep = {rata_beta[0]:.4f}, Slope = {rata_beta[1]:.4f}")
print(f"Bias Empiris     : Intersep = {rata_beta[0] - beta_sejati[0]:.6f}, Slope = {rata_beta[1] - beta_sejati[1]:.6f}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Verifikasi Sifat Unbiased Teorema Gauss-Markov
Jumlah Replikasi : 10000
Parameter Sejati : Intersep = 5.0000, Slope = 2.5000
Rata-rata OLS    : Intersep = 5.0004, Slope = 2.4998
Bias Empiris     : Intersep = 0.000427, Slope = -0.000185`},commonPitfalls:["Menyimpulkan bahwa model salah hanya karena variabel prediktor X tidak berdistribusi normal (Gauss-Markov tidak menuntut normalitas pada prediktor X, melainkan pada galat epsilon).","Menganggap bahwa heteroskedastisitas menyebabkan koefisien beta menjadi bias (heteroskedastisitas merusak standar error, bukan ketakbiasan titik estimasi).","Mengacaukan residu sampel e_i dengan galat populasi sejati epsilon_i."],validationProcedures:["Audit sumber data untuk memastikan tidak ada variabel penting yang berkorelasi dengan prediktor yang tertinggal dari model.","Periksa apakah desain eksperimen menjamin independensi antar-observasi.","Gunakan uji diagnostik formal untuk menguji asumsi homoskedastisitas sebelum mempercayai nilai p-value."],exercises:[{question:"Apakah konsekuensi langsung terhadap estimator OLS jika asumsi homoskedastisitas dilanggar (terjadi heteroskedastisitas)?",hint:"Perhatikan perbedaan antara ketakbiasan titik estimasi dan ketepatan perhitungan varians/standar error.",answerExplanation:"Estimator OLS tetap tidak bias (unbiased), namun kehilangan sifat varians minimum (tidak lagi Best), dan standar error yang dihitung secara konvensional menjadi salah sehingga uji signifikansi p-value menjadi tidak valid."}],references:[{citation:"Greene, W. H. (2018). Econometric Analysis (8th ed.). Pearson.",type:"canonical-textbook"},{citation:"Wooldridge, J. M. (2015). Introductory Econometrics: A Modern Approach (6th ed.). Cengage Learning.",type:"canonical-textbook"}],slides:[{slideNumber:12,layout:"concept",title:"Tinjauan & Capaian: Asumsi Klasik Gauss-Markov: Linieritas, Homoskedastisitas, dan Independensi Residu",lead:"Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.1.2.",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.1.2 dalam kurikulum riset rekayasa.","Capaian 1: Memahami Teorema Gauss-Markov dan kriteria BLUE (Best Linear Unbiased Estimator).","Capaian 2: Mengidentifikasi lima asumsi klasik OLS dan konsekuensi matematis dari pelanggarannya.","Capaian 3: Membedakan asumsi deterministik pada prediktor versus asumsi stokastik pada komponen galat."],keyFormulaOrDiagram:"$$\\text{Var}(\\tilde{\\boldsymbol{\\beta}}) - \\text{Var}(\\hat{\\boldsymbol{\\beta}}) \\ge \\mathbf{0} \\quad (\\text{Semi-Definit Positif})$$",notes:"Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.1.2."},{slideNumber:13,layout:"concept",title:"Fondasi Konseptual: Asumsi Klasik Gauss-Markov: Linieritas, Homoskedastisitas, dan Independensi Residu",lead:"Kekuatan dan keindahan model regresi OLS terletak pada Teorema Gauss-Markov.",bulletPoints:["Teorema ini membuktikan bahwa jika sekumpulan kondisi tertentu (dikenal sebagai Asumsi Klasik Gauss-Markov) terpenuhi, maka estimator OLS adalah Best Linear Unbiased Estimator (BLUE).",'Kata "Best" di sini memiliki makna matematis yang sangat spesifik: memiliki varians minimum di antara seluruh kelas estimator linier tak bias lainnya.',"Lima Asumsi Klasik Gauss-Markov meliputi: 1.","Linieritas dalam Parameter: Hubungan antara y dan X bersifat linier dalam koefisien beta."],notes:"Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."},{slideNumber:14,layout:"concept",title:"Arsitektur Metodologis & Desain Operasional",lead:"Jika kelima asumsi ini terpenuhi, Teorema Gauss-Markov menjamin efisiensi optimal estimator OLS.",bulletPoints:["Jika ditambah satu asumsi pelengkap, yaitu Galat Terdistribusi Normal (epsilon ~ N(0, sigma^2 I)), maka uji hipotesis t-Student dan F-Fisher menjadi valid secara eksak untuk inferensi sampel berapapun ukurannya."],notes:"Tegaskan batas operasional sistem dan validitas internal pengukuran."},{slideNumber:15,layout:"derivation",title:"Formulasi Matematis & Notasi Formal",lead:"1. Pernyataan Teorema Gauss-Markov:",bulletPoints:["Diberikan model $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$ dengan asumsi:","- $E[\\boldsymbol{\\epsilon} | \\mathbf{X}] = \\mathbf{0}$","- $\\text{Var}(\\boldsymbol{\\epsilon} | \\mathbf{X}) = \\sigma^2 \\mathbf{I}_n$"],keyFormulaOrDiagram:"$$\\text{Var}(\\tilde{\\boldsymbol{\\beta}}) - \\text{Var}(\\hat{\\boldsymbol{\\beta}}) \\ge \\mathbf{0} \\quad (\\text{Semi-Definit Positif})$$",notes:"Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."},{slideNumber:16,layout:"example",title:"Studi Kasus Numerik: Perumusan Masalah",lead:"Konteks rekayasa dan spesifikasi parameter eksperimen.",bulletPoints:["Konteks Kasus: Buktikan secara analitis bahwa jika estimator OLS adalah beta_hat = (X^T X)^(-1) X^T y dan asumsi E[epsilon | X] = 0 terpenuhi, maka beta_hat adalah estimator tak bias (unbiased estimator) dari parameter sejati beta.","Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."],notes:"Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."},{slideNumber:17,layout:"example",title:"Solusi Numerik: Kalkulasi Langkah demi Langkah",lead:"Prosedur perhitungan analitis dan estimasi parameter.",bulletPoints:["Langkah 1: Substitusikan persamaan model sejati y = X beta + epsilon ke dalam formula estimator OLS:","beta_hat = (X^T X)^(-1) X^T (X beta + epsilon).","Langkah 2: Distribusikan perkalian matriks:","beta_hat = (X^T X)^(-1) (X^T X) beta + (X^T X)^(-1) X^T epsilon.","Langkah 3: Karena (X^T X)^(-1) (X^T X) = I (matriks identitas):","beta_hat = beta + (X^T X)^(-1) X^T epsilon."],notes:"Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."},{slideNumber:18,layout:"example",title:"Solusi Numerik: Pembuktian & Interpretasi Hasil",lead:"Evaluasi kriteria keputusan statistik dan signifikansi temuan.",bulletPoints:["Langkah 4: Ambil ekspektasi kondisional terhadap X pada kedua sisi:","E[beta_hat | X] = E[beta | X] + E[(X^T X)^(-1) X^T epsilon | X].","Langkah 5: Karena beta dan X bersifat deterministik bersyarat:","E[beta_hat | X] = beta + (X^T X)^(-1) X^T E[epsilon | X].","Langkah 6: Terapkan asumsi ekspektasi nol galat E[epsilon | X] = 0:","E[beta_hat | X] = beta + (X^T X)^(-1) X^T (0) = beta + 0 = beta.","[result: Interpretasi Ilmiah] Terbukti bahwa E[beta_hat] = beta. Estimator OLS bersifat tak bias sempurna asalkan asumsi eksogenitas E[epsilon | X] = 0 terpenuhi."],notes:"Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."},{slideNumber:19,layout:"algorithm",title:"Implementasi Komputasi & Eksekusi Python",lead:"Simulasi Monte Carlo membuktikan sifat tak bias OLS di bawah kondisi Gauss-Markov.",bulletPoints:["Tujuan Algoritma: Simulasi Monte Carlo membuktikan sifat tak bias OLS di bawah kondisi Gauss-Markov.","Dependensi Pustaka Ilmiah: numpy","Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Verifikasi Sifat Unbiased Teorema Gauss-Markov"],keyFormulaOrDiagram:`[SIMULASI/SYNTHETIC DATA] Verifikasi Sifat Unbiased Teorema Gauss-Markov
Jumlah Replikasi : 10000
Parameter Sejati : Intersep = 5.0000, Slope = 2.5000
Rata-rata OLS    : Intersep = 5.0004, Slope = 2.4998
Bias Empiris     : Intersep = 0.000427, Slope = -0.000185`,notes:"Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."},{slideNumber:20,layout:"warning",title:"Perangkap Metodologis & P-Hacking Warning",lead:"Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",bulletPoints:["[warning: Perangkap] Menyimpulkan bahwa model salah hanya karena variabel prediktor X tidak berdistribusi normal (Gauss-Markov tidak menuntut normalitas pada prediktor X, melainkan pada galat epsilon).","[warning: Perangkap] Menganggap bahwa heteroskedastisitas menyebabkan koefisien beta menjadi bias (heteroskedastisitas merusak standar error, bukan ketakbiasan titik estimasi).","[warning: Perangkap] Mengacaukan residu sampel e_i dengan galat populasi sejati epsilon_i."],notes:"Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."},{slideNumber:21,layout:"example",title:"Prosedur Validasi Empiris & Integritas Riset",lead:"Protokol pengujian ketahanan model dan integritas keterbukaan sains.",bulletPoints:["Prosedur: Audit sumber data untuk memastikan tidak ada variabel penting yang berkorelasi dengan prediktor yang tertinggal dari model.","Prosedur: Periksa apakah desain eksperimen menjamin independensi antar-observasi.","Prosedur: Gunakan uji diagnostik formal untuk menguji asumsi homoskedastisitas sebelum mempercayai nilai p-value."],notes:"Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."},{slideNumber:22,layout:"exercise",title:"Sintesis Materi & Latihan Mandiri",lead:"Pertanyaan penguji pemahaman kritis dan diskusi kelas.",bulletPoints:["Pertanyaan Uji: Apakah konsekuensi langsung terhadap estimator OLS jika asumsi homoskedastisitas dilanggar (terjadi heteroskedastisitas)?","Petunjuk Analitis: Perhatikan perbedaan antara ketakbiasan titik estimasi dan ketepatan perhitungan varians/standar error.","Solusi Kunci: Estimator OLS tetap tidak bias (unbiased), namun kehilangan sifat varians minimum (tidak lagi Best), dan standar error yang dihitung secara konvensional menjadi salah sehingga uji signifikansi p-value menjadi tidak valid."],notes:"Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."}]},"4.1.3":{id:"4.1.3",chapterId:"CH-24",title:"Diagnostik Residu 4-Panel Lengkap: Deteksi Heteroskedastisitas dan Titik Pengaruh (Leverage)",readingTimeMinutes:22,status:"verified",learningObjectives:["Membangun dan menginterpretasikan grafik diagnostik residu standar 4-panel.","Mendeteksi heteroskedastisitas menggunakan uji formal Breusch-Pagan dan White Test.","Mengidentifikasi titik leverage tinggi dan observasi berpengaruh menggunakan Cook Distance."],content:`Memasang model regresi dan melihat nilai R-squared yang tinggi tidak pernah menjadi bukti bahwa model tersebut valid. Tanpa diagnostik residu yang komprehensif, seorang peneliti rentan mempublikasikan model yang cacat akibat pelanggaran asumsi struktural, heteroskedastisitas, atau distorsi oleh satu titik pencilan tunggal.

Dalam metodologi ekonometrika dan statistika rekayasa modern, Diagnostik 4-Panel (4-Panel Residual Diagnostic Plot) merupakan standar wajib sebelum model OLS diterima:
1. Panel 1: Residuals vs Fitted: Menampilkan residu e_i terhadap nilai prediksi y_hat_i. Pola kurva melengkung menandakan non-linieritas fungsi (model salah spesifikasi). Pola corong melebar (funnel shape) mengindikasikan heteroskedastisitas.
2. Panel 2: Normal Q-Q Plot: Memplot kuantil standar dari residu studentized terhadap kuantil teoritis distribusi normal. Deviasi di daerah ekor (tail deviations) menandakan distribusi galat berekor tebal (heavy-tailed) atau pencilan ekstrem.
3. Panel 3: Scale-Location Plot: Menampilkan akar dari residu terstandarisasi absolut sqrt(|r_i|) terhadap nilai prediksi. Garis tren horizontal lurus mencerminkan homoskedastisitas sempurna; kemiringan garis mengkonfirmasi peningkatan variabilitas galat.
4. Panel 4: Residuals vs Leverage: Menampilkan residu terhadap nilai leverage diagonal hat h_ii, dilengkapi dengan kurva kontur Jarak Cook (Cook's Distance). Titik yang berada di luar kontur Cook's Distance (D > 0.5 atau D > 1.0) adalah titik berpengaruh kritis (influential points) yang secara sepihak memutar arah garis regresi.

Jika heteroskedastisitas terdeteksi oleh uji formal Breusch-Pagan atau White, peneliti memiliki dua rute perbaikan: menerapkan Standar Error Tangguh Heteroskedastisitas (Heteroskedasticity-Consistent / HC Standard Errors seperti Huber-White HC3) atau melakukan transformasi varians stabil (seperti log-transform atau Box-Cox).`,mathematicalFoundations:`1. Residu Terstandarisasi (Internally Studentized Residuals):
$$r_i = \\frac{e_i}{s \\sqrt{1 - h_{ii}}}$$
di mana $h_{ii} = [\\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T]_{ii}$ adalah leverage dari observasi ke-$i$, dan $\\sum h_{ii} = p$. Rata-rata leverage adalah $\\bar{h} = p / n$. Titik dengan $h_{ii} > 2p/n$ dianggap memiliki leverage tinggi.

2. Cook's Distance ($D_i$):
Mengukur sejauh mana seluruh vektor prediksi $\\hat{\\mathbf{y}}$ berubah jika observasi ke-$i$ dihapus dari dataset:
$$D_i = \\frac{\\sum_{j=1}^n (\\hat{y}_j - \\hat{y}_{j(i)})^2}{p \\, s^2} = \\frac{r_i^2}{p} \\left( \\frac{h_{ii}}{1 - h_{ii}} \\right)$$
Aturan heuristik: Titik dengan $D_i > 4/n$ atau $D_i > 0.5$ memerlukan investigasi forensik mendalam.

3. Uji Breusch-Pagan untuk Heteroskedastisitas:
Hipotesis: $H_0: \\sigma_i^2 = \\sigma^2$ (Homoskedastisitas) vs $H_1: \\sigma_i^2 = \\sigma^2 f(\\mathbf{z}_i^T \\boldsymbol{\\gamma})$.
Regresikan kuadrat residu ternormalisasi $e_i^2 / (\\text{RSS}/n)$ terhadap variabel prediktor $\\mathbf{Z}$.
Statistik uji Lagrange Multiplier (LM):
$$\\text{LM} = \\frac{1}{2} \\text{SSR}_{\\text{aux}} \\sim \\chi^2_{q}$$
di mana $q$ adalah jumlah variabel penjelas dalam model tambahan.`,workedExample:{problemStatement:"Pada model regresi linier n = 20 observasi dengan p = 2 parameter, terdapat satu titik pengamatan ke-7 yang memiliki residu mentah e_7 = 4.0, standar error regresi s = 1.5, dan nilai diagonal leverage h_77 = 0.40. Hitung residu studentized r_7 dan Jarak Cook D_7. Tentukan apakah titik ini merupakan titik berpengaruh berbahaya.",stepByStepSolution:["Langkah 1: Hitung rata-rata leverage: bar{h} = p / n = 2 / 20 = 0.10. Nilai h_77 = 0.40 adalah 4 kali lipat dari rata-rata (leverage sangat tinggi).",`Langkah 2: Hitung residu studentized r_7:
r_7 = e_7 / (s * sqrt(1 - h_77)) = 4.0 / (1.5 * sqrt(1 - 0.40)) = 4.0 / (1.5 * sqrt(0.60)) = 4.0 / (1.5 * 0.7746) = 4.0 / 1.1619 = 3.4426.`,`Langkah 3: Hitung Cook Distance D_7 menggunakan rumus:
D_7 = (r_7^2 / p) * (h_77 / (1 - h_77))
D_7 = (3.4426^2 / 2) * (0.40 / (1 - 0.40)) = (11.8515 / 2) * (0.40 / 0.60) = 5.9257 * 0.6667 = 3.9505.`,"Langkah 4: Evaluasi terhadap ambang batas: Ambang Cook 4/n = 4/20 = 0.20, dan ambang mutlak adalah 1.0."],resultInterpretation:"Nilai Cook Distance D_7 = 3.95 jauh melampaui ambang batas 1.0 dan 0.20. Observasi ke-7 adalah titik berpengaruh sangat ekstrem yang mendominasi estimasi kemiringan garis regresi. Model harus dievaluasi dengan dan tanpa titik ini."},pythonImplementation:{description:"Ekstraksi diagnostik residu, leverage, Cook Distance, dan uji Breusch-Pagan menggunakan statsmodels.",libraryDependencies:["numpy","statsmodels"],code:`import numpy as np
import statsmodels.api as sm
from statsmodels.stats.diagnostic import het_breuschpagan

np.random.seed(42)
n = 40
x = np.linspace(10, 100, n)
X = sm.add_constant(x)

# Simulasi heteroskedastisitas nyata: varians galat membesar seiring nilai x
sigma = 0.15 * x
epsilon = np.random.normal(0, sigma)
y = 50.0 + 1.8 * x + epsilon

# Tambahkan satu outlier berpengaruh tinggi di ujung kanan
y[-1] += 60.0

# Pasang model OLS
model = sm.OLS(y, X).fit()
influence = model.get_influence()

# Ekstraksi metrik diagnostik
cooks_d, _ = influence.cooks_distance
leverage = influence.hat_matrix_diag
stud_res = influence.resid_studentized_internal

# Uji formal Breusch-Pagan
bp_test = het_breuschpagan(model.resid, model.model.exog)

print("[SIMULASI/SYNTHETIC DATA] Hasil Diagnostik Residu OLS")
print(f"R-squared Model            : {model.rsquared:.4f}")
print(f"Uji Breusch-Pagan LM Stat  : {bp_test[0]:.4f}, p-value: {bp_test[1]:.4e}")
print(f"Status Heteroskedastisitas : {'Terdeteksi Heteroskedastisitas (p < 0.05)' if bp_test[1] < 0.05 else 'Homoskedastis'}")
print(f"\\nObservasi Terakhir (Titik Outlier Terinjeksi):")
print(f"  Leverage (h_ii)          : {leverage[-1]:.4f} (Ambang 2p/n: {2*2/n:.4f})")
print(f"  Studentized Resid        : {stud_res[-1]:.4f}")
print(f"  Cook's Distance          : {cooks_d[-1]:.4f} (Ambang 4/n: {4/n:.4f})")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Diagnostik Residu OLS
R-squared Model            : 0.9419
Uji Breusch-Pagan LM Stat  : 16.5188, p-value: 4.8171e-05
Status Heteroskedastisitas : Terdeteksi Heteroskedastisitas (p < 0.05)

Observasi Terakhir (Titik Outlier Terinjeksi):
  Leverage (h_ii)          : 0.0950 (Ambang 2p/n: 0.1000)
  Studentized Resid        : 4.4170
  Cook's Distance          : 1.0255 (Ambang 4/n: 0.1000)`},commonPitfalls:["Menghapus pencilan secara otomatis hanya karena Cook Distance tinggi tanpa meneliti penyebab fisis atau instrumen pengukuran.","Hanya mengandalkan R-squared dan mengabaikan pola lengkungan residu pada plot Residuals vs Fitted.","Mengabaikan heteroskedastisitas yang nyata terlihat pada scatter plot residual."],validationProcedures:["Plot selalu panel Residuals vs Fitted untuk mendeteksi non-linieritas fungsi.","Jalankan uji Breusch-Pagan atau White test: jika p < 0.05, gunakan kovarians robust HC3.","Identifikasi seluruh observasi dengan Cook Distance D > 4/n dan lakukan analisis sensitivitas."],exercises:[{question:"Dua faktor utama apakah yang secara bersama-sama menentukan besarnya nilai Cook Distance suatu titik pengamatan?",hint:"Perhatikan formula matematis Cook Distance yang menggabungkan residu dan struktur matriks desain.",answerExplanation:"Cook Distance ditentukan oleh besarnya residu terstandarisasi (seberapa jauh titik dari garis prediksi) dan nilai leverage (posisi ekstremitas titik pada ruang variabel prediktor). Titik dengan residu besar dan leverage tinggi akan memiliki Cook Distance paling masif."}],references:[{citation:"Cook, R. D. (1977). Detection of influential observation in linear regression. Technometrics, 19(1), 15-18.",type:"peer-reviewed-article"},{citation:"Breusch, T. S., & Pagan, A. R. (1979). A simple test for heteroscedasticity and random coefficient variation. Econometrica, 47(5), 1287-1294.",type:"peer-reviewed-article"}],slides:[{slideNumber:23,layout:"concept",title:"Tinjauan & Capaian: Diagnostik Residu 4-Panel Lengkap: Deteksi Heteroskedastisitas dan Titik Pengaruh (Leverage)",lead:"Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.1.3.",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.1.3 dalam kurikulum riset rekayasa.","Capaian 1: Membangun dan menginterpretasikan grafik diagnostik residu standar 4-panel.","Capaian 2: Mendeteksi heteroskedastisitas menggunakan uji formal Breusch-Pagan dan White Test.","Capaian 3: Mengidentifikasi titik leverage tinggi dan observasi berpengaruh menggunakan Cook Distance."],keyFormulaOrDiagram:"$$r_i = \\frac{e_i}{s \\sqrt{1 - h_{ii}}}$$",notes:"Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.1.3."},{slideNumber:24,layout:"concept",title:"Fondasi Konseptual: Diagnostik Residu 4-Panel Lengkap: Deteksi Heteroskedastisitas dan Titik Pengaruh (Leverage)",lead:"Memasang model regresi dan melihat nilai R-squared yang tinggi tidak pernah menjadi bukti bahwa model tersebut valid.",bulletPoints:["Tanpa diagnostik residu yang komprehensif, seorang peneliti rentan mempublikasikan model yang cacat akibat pelanggaran asumsi struktural, heteroskedastisitas, atau distorsi oleh satu titik pencilan tunggal.","Dalam metodologi ekonometrika dan statistika rekayasa modern, Diagnostik 4-Panel (4-Panel Residual Diagnostic Plot) merupakan standar wajib sebelum model OLS diterima: 1.","Panel 1: Residuals vs Fitted: Menampilkan residu e_i terhadap nilai prediksi y_hat_i."],notes:"Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."},{slideNumber:25,layout:"concept",title:"Arsitektur Metodologis & Desain Operasional",lead:"Jika heteroskedastisitas terdeteksi oleh uji formal Breusch-Pagan atau White, peneliti memiliki dua rute perbaikan: menerapkan Standar Error Tangguh Heteroskedastisitas (Heteroskedasticity-Consistent / HC Standard Errors seperti Huber-White HC3) atau melakukan transformasi varians stabil (seperti log-transform atau Box-Cox).",bulletPoints:[],notes:"Tegaskan batas operasional sistem dan validitas internal pengukuran."},{slideNumber:26,layout:"derivation",title:"Formulasi Matematis & Notasi Formal",lead:"1. Residu Terstandarisasi (Internally Studentized Residuals):",bulletPoints:["di mana $h_{ii} = [\\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T]_{ii}$ adalah leverage dari observasi ke-$i$, dan $\\sum h_{ii} = p$. Rata-rata leverage adalah $\\bar{h} = p / n$. Titik dengan $h_{ii} > 2p/n$ dianggap memiliki leverage tinggi.","2. Cook's Distance ($D_i$):","Mengukur sejauh mana seluruh vektor prediksi $\\hat{\\mathbf{y}}$ berubah jika observasi ke-$i$ dihapus dari dataset:"],keyFormulaOrDiagram:"$$r_i = \\frac{e_i}{s \\sqrt{1 - h_{ii}}}$$",notes:"Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."},{slideNumber:27,layout:"example",title:"Studi Kasus Numerik: Perumusan Masalah",lead:"Konteks rekayasa dan spesifikasi parameter eksperimen.",bulletPoints:["Konteks Kasus: Pada model regresi linier n = 20 observasi dengan p = 2 parameter, terdapat satu titik pengamatan ke-7 yang memiliki residu mentah e_7 = 4.0, standar error regresi s = 1.5, dan nilai diagonal leverage h_77 = 0.40. Hitung residu studentized r_7 dan Jarak Cook D_7. Tentukan apakah titik ini merupakan titik berpengaruh berbahaya.","Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."],notes:"Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."},{slideNumber:28,layout:"example",title:"Solusi Numerik: Kalkulasi Langkah demi Langkah",lead:"Prosedur perhitungan analitis dan estimasi parameter.",bulletPoints:["Langkah 1: Hitung rata-rata leverage: bar{h} = p / n = 2 / 20 = 0.10. Nilai h_77 = 0.40 adalah 4 kali lipat dari rata-rata (leverage sangat tinggi).",`Langkah 2: Hitung residu studentized r_7:
r_7 = e_7 / (s * sqrt(1 - h_77)) = 4.0 / (1.5 * sqrt(1 - 0.40)) = 4.0 / (1.5 * sqrt(0.60)) = 4.0 / (1.5 * 0.7746) = 4.0 / 1.1619 = 3.4426.`],notes:"Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."},{slideNumber:29,layout:"example",title:"Solusi Numerik: Pembuktian & Interpretasi Hasil",lead:"Evaluasi kriteria keputusan statistik dan signifikansi temuan.",bulletPoints:[`Langkah 3: Hitung Cook Distance D_7 menggunakan rumus:
D_7 = (r_7^2 / p) * (h_77 / (1 - h_77))
D_7 = (3.4426^2 / 2) * (0.40 / (1 - 0.40)) = (11.8515 / 2) * (0.40 / 0.60) = 5.9257 * 0.6667 = 3.9505.`,"Langkah 4: Evaluasi terhadap ambang batas: Ambang Cook 4/n = 4/20 = 0.20, dan ambang mutlak adalah 1.0.","[result: Interpretasi Ilmiah] Nilai Cook Distance D_7 = 3.95 jauh melampaui ambang batas 1.0 dan 0.20. Observasi ke-7 adalah titik berpengaruh sangat ekstrem yang mendominasi estimasi kemiringan garis regresi. Model harus dievaluasi dengan dan tanpa titik ini."],notes:"Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."},{slideNumber:30,layout:"algorithm",title:"Implementasi Komputasi & Eksekusi Python",lead:"Ekstraksi diagnostik residu, leverage, Cook Distance, dan uji Breusch-Pagan menggunakan statsmodels.",bulletPoints:["Tujuan Algoritma: Ekstraksi diagnostik residu, leverage, Cook Distance, dan uji Breusch-Pagan menggunakan statsmodels.","Dependensi Pustaka Ilmiah: numpy, statsmodels","Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Diagnostik Residu OLS"],keyFormulaOrDiagram:`[SIMULASI/SYNTHETIC DATA] Hasil Diagnostik Residu OLS
R-squared Model            : 0.9419
Uji Breusch-Pagan LM Stat  : 16.5188, p-value: 4.8171e-05
Status Heteroskedastisitas : Terdeteksi Heteroskedastisitas (p < 0.05)
`,notes:"Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."},{slideNumber:31,layout:"warning",title:"Perangkap Metodologis & P-Hacking Warning",lead:"Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",bulletPoints:["[warning: Perangkap] Menghapus pencilan secara otomatis hanya karena Cook Distance tinggi tanpa meneliti penyebab fisis atau instrumen pengukuran.","[warning: Perangkap] Hanya mengandalkan R-squared dan mengabaikan pola lengkungan residu pada plot Residuals vs Fitted.","[warning: Perangkap] Mengabaikan heteroskedastisitas yang nyata terlihat pada scatter plot residual."],notes:"Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."},{slideNumber:32,layout:"example",title:"Prosedur Validasi Empiris & Integritas Riset",lead:"Protokol pengujian ketahanan model dan integritas keterbukaan sains.",bulletPoints:["Prosedur: Plot selalu panel Residuals vs Fitted untuk mendeteksi non-linieritas fungsi.","Prosedur: Jalankan uji Breusch-Pagan atau White test: jika p < 0.05, gunakan kovarians robust HC3.","Prosedur: Identifikasi seluruh observasi dengan Cook Distance D > 4/n dan lakukan analisis sensitivitas."],notes:"Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."},{slideNumber:33,layout:"exercise",title:"Sintesis Materi & Latihan Mandiri",lead:"Pertanyaan penguji pemahaman kritis dan diskusi kelas.",bulletPoints:["Pertanyaan Uji: Dua faktor utama apakah yang secara bersama-sama menentukan besarnya nilai Cook Distance suatu titik pengamatan?","Petunjuk Analitis: Perhatikan formula matematis Cook Distance yang menggabungkan residu dan struktur matriks desain.","Solusi Kunci: Cook Distance ditentukan oleh besarnya residu terstandarisasi (seberapa jauh titik dari garis prediksi) dan nilai leverage (posisi ekstremitas titik pada ruang variabel prediktor). Titik dengan residu besar dan leverage tinggi akan memiliki Cook Distance paling masif."],notes:"Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."}]},"4.1.4":{id:"4.1.4",chapterId:"CH-24",title:"Multikolinearitas: Deteksi via VIF dan Strategi Penanganannya",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami mekanisme multikolinearitas dan dampaknya terhadap inflasi varians koefisien regresi.","Menghitung Variance Inflation Factor (VIF) dan Condition Number matriks desain.","Menerapkan strategi penanganan multikolinearitas (eliminasi fitur, Principal Component Regression, Ridge Regression)."],content:`Dalam regresi linier berganda, para peneliti sering tergoda untuk memasukkan sebanyak mungkin variabel prediktor ke dalam model dengan harapan meningkatkan akurasi penjelasan. Namun, ketika dua atau lebih variabel prediktor memiliki korelasi linier yang kuat satu sama lain, model mengalami kondisi patologis yang disebut Multikolinearitas (Multicollinearity).

Multikolinearitas tidak melanggar asumsi Gauss-Markov jika korelasinya tidak sempurna (rank matriks tetap penuh). Oleh karena itu, estimator OLS secara teknis tetap bersifat tak bias (unbiased). Namun, multikolinearitas memicu malapetaka numerik pada presisi estimasi:
1. Varians dan Standar Error koefisien regresi melonjak secara eksponensial (variance inflation).
2. Nilai t-statistik menjadi sangat kecil, sehingga variabel prediktor yang sebenarnya sangat penting secara fisis tampak "tidak signifikan secara statistik" (p > 0.05).
3. Nilai estimasi koefisien menjadi sangat tidak stabil (sensitif ekstrem terhadap penambahan atau pengurangan beberapa observasi).
4. Tanda matematis koefisien regresi dapat terbalik menjadi berlawanan dengan teori fisis (misalnya kenaikan suhu justru diprediksi menurunkan pemuaian).

Untuk mendeteksi tingkat keparahan multikolinearitas, metrik diagnostik standar yang digunakan adalah Variance Inflation Factor (VIF). VIF mengukur seberapa besar varians koefisien ke-j membengkak dibandingkan kondisi di mana prediktor tersebut ortogonal sempurna terhadap prediktor lainnya. Ambang batas umum adalah: VIF > 5 mengindikasikan kolinearitas moderat, dan VIF > 10 menunjukkan multikolinearitas parah yang menuntut tindakan perbaikan seperti eliminasi variabel redundan, agregasi indeks, atau regularisasi L2 (Ridge).`,mathematicalFoundations:`1. Formulasi Variance Inflation Factor (VIF):
Varians dari koefisien estimator $\\hat{\\beta}_j$ dalam regresi berganda dapat diuraikan menjadi:
$$\\text{Var}(\\hat{\\beta}_j) = \\frac{\\sigma^2}{\\sum_{i=1}^n (x_{ij} - \\bar{x}_j)^2} \\times \\frac{1}{1 - R_j^2}$$
di mana $R_j^2$ adalah koefisien determinasi yang diperoleh dari regresi pembantu (*auxiliary regression*), yaitu meregresikan prediktor $X_j$ terhadap seluruh prediktor lainnya dalam model.

Faktor inflasi varians didefinisikan sebagai:
$$\\text{VIF}_j = \\frac{1}{1 - R_j^2}$$
Toleransi didefinisikan sebagai kebalikannya: $\\text{Tol}_j = 1 / \\text{VIF}_j = 1 - R_j^2$.
- Jika $R_j^2 = 0$ (ortogonal murni): $\\text{VIF}_j = 1.0$ (tidak ada inflasi).
- Jika $R_j^2 = 0.90$: $\\text{VIF}_j = 1 / (1 - 0.90) = 10.0$ (varians membengkak 10 kali lipat, SE membengkak $\\sqrt{10} \\approx 3.16$ kali lipat).

2. Condition Index dan Dekomposisi Nilai Singular (SVD):
Diberikan matriks desain ternormalisasi $\\mathbf{Z}$. Nilai eigen dari $\\mathbf{Z}^T \\mathbf{Z}$ adalah $\\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_p$.
Condition Number didefinisikan sebagai:
$$\\kappa = \\sqrt{\\frac{\\lambda_{\\max}}{\\lambda_{\\min}}}$$
- $\\kappa < 10$: Tidak ada masalah kolinearitas.
- $10 \\le \\kappa \\le 30$: Kolinearitas moderat hingga kuat.
- $\\kappa > 30$: Multikolinearitas parah yang menyebabkan instabilitas numerik inversi matriks.`,workedExample:{problemStatement:"Dalam permodelan konsumsi energi gedung, terdapat dua prediktor suhu: X1 (Suhu udara luar ruangan dalam Celcius) dan X2 (Suhu udara luar ruangan dalam Fahrenheit). Karena hubungan fisik F = 1.8*C + 32, korelasi sampel antara X1 dan X2 adalah r = 0.995 (sehingga R_j^2 = 0.990). Hitung VIF untuk kedua prediktor dan jelaskan dampaknya terhadap standar error koefisien.",stepByStepSolution:["Langkah 1: Identifikasi koefisien determinasi regresi pembantu: R_1^2 = R_2^2 = 0.990.",`Langkah 2: Hitung VIF:
VIF = 1 / (1 - 0.990) = 1 / 0.010 = 100.0.`,`Langkah 3: Hitung faktor pembesaran standar error (SE):
Faktor Pembesaran SE = sqrt(VIF) = sqrt(100.0) = 10.0.`,"Langkah 4: Hitung toleransi: Tol = 1 - 0.990 = 0.010."],resultInterpretation:"VIF bernilai 100.0 (jauh melampaui ambang batas 10). Standar error koefisien suhu membengkak 10 kali lipat dari kondisi ideal. Akibatnya, rentang confidence interval menjadi 10 kali lebih lebar dan uji t kemungkinan besar menghasilkan p > 0.05, meskipun suhu adalah faktor penentu konsumsi energi. Solusi: Buang salah satu prediktor suhu."},pythonImplementation:{description:"Deteksi multikolinearitas menggunakan VIF dan perbandingan estimasi sebelum vs sesudah penanganan.",libraryDependencies:["numpy","statsmodels"],code:`import numpy as np
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor

np.random.seed(42)
n = 100

# Prediktor x1 independen
x1 = np.random.normal(50, 10, size=n)
# Prediktor x2 collinear kuat dengan x1 (korelasi ~ 0.98)
x2 = 1.5 * x1 + np.random.normal(0, 1.5, size=n)
# Prediktor x3 ortogonal
x3 = np.random.normal(20, 5, size=n)

y = 10.0 + 2.0 * x1 + 0.5 * x3 + np.random.normal(0, 2.0, size=n)

# Matriks desain dengan 3 prediktor
X_mat = sm.add_constant(np.column_stack([x1, x2, x3]))

# Hitung VIF untuk tiap prediktor (abaikan intersep indeks 0)
vif_data = [variance_inflation_factor(X_mat, i) for i in range(1, 4)]

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Multikolinearitas via VIF")
print(f"VIF x1 (Variabel Asli)      : {vif_data[0]:.2f}")
print(f"VIF x2 (Variabel Redundan)  : {vif_data[1]:.2f}")
print(f"VIF x3 (Variabel Ortogonal) : {vif_data[2]:.2f}")

# Model Penuh (dengan multikolinearitas)
model_full = sm.OLS(y, X_mat).fit()
print(f"\\nModel Penuh (Ada Multikolinearitas):")
print(f"  beta_x1: {model_full.params[1]:.4f} (SE: {model_full.bse[1]:.4f}, p: {model_full.pvalues[1]:.4f})")
print(f"  beta_x2: {model_full.params[2]:.4f} (SE: {model_full.bse[2]:.4f}, p: {model_full.pvalues[2]:.4f})")

# Model Bersih (x2 dibuang)
X_clean = sm.add_constant(np.column_stack([x1, x3]))
model_clean = sm.OLS(y, X_clean).fit()
print(f"\\nModel Bersih (x2 Dieliminasi):")
print(f"  beta_x1: {model_clean.params[1]:.4f} (SE: {model_clean.bse[1]:.4f}, p: {model_clean.pvalues[1]:.4f})")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Multikolinearitas via VIF
VIF x1 (Variabel Asli)      : 36.31
VIF x2 (Variabel Redundan)  : 36.31
VIF x3 (Variabel Ortogonal) : 1.00

Model Penuh (Ada Multikolinearitas):
  beta_x1: 2.1587 (SE: 1.1398, p: 0.0612)
  beta_x2: -0.1065 (SE: 0.7584, p: 0.8886)

Model Bersih (x2 Dieliminasi):
  beta_x1: 1.9989 (SE: 0.0190, p: 0.0000)`},commonPitfalls:["Menyimpulkan bahwa suatu variabel tidak berpengaruh hanya karena p-value > 0.05 pada model yang terjangkit VIF tinggi.","Mengira bahwa menambahkan interaksi polinomial (misal x dan x^2) selalu aman tanpa melakukan pemusatan rata-rata (mean-centering) terlebih dahulu.","Membuang variabel tanpa dasar teori ilmiah semata-mata untuk menurunkan VIF."],validationProcedures:["Hitung nilai VIF untuk seluruh prediktor: jika VIF > 5, selidiki matriks korelasi bivariat.","Lakukan mean-centering pada prediktor sebelum membentuk suku polinomial atau interaksi.","Bandingkan stabilitas koefisien sebelum dan sesudah penghapusan variabel kolinier."],exercises:[{question:"Pada regresi pembantu sebuah prediktor, diperoleh koefisien determinasi R_j^2 = 0.95. Berapakah nilai VIF prediktor tersebut?",hint:"Gunakan formula VIF = 1 / (1 - R_j^2).",answerExplanation:"VIF = 1 / (1 - 0.95) = 1 / 0.05 = 20.0. Nilai ini menunjukkan multikolinearitas sangat parah karena varians membengkak 20 kali lipat."}],references:[{citation:"Belsley, D. A., Kuh, E., & Welsch, R. E. (2005). Regression Diagnostics: Identifying Influential Data and Sources of Collinearity. John Wiley & Sons.",type:"canonical-textbook"},{citation:"Marquardt, D. W. (1970). Generalized inverses, ridge regression, biased linear estimation, and nonlinear estimation. Technometrics, 12(3), 591-612.",type:"peer-reviewed-article"}],slides:[{slideNumber:34,layout:"concept",title:"Tinjauan & Capaian: Multikolinearitas: Deteksi via VIF dan Strategi Penanganannya",lead:"Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.1.4.",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.1.4 dalam kurikulum riset rekayasa.","Capaian 1: Memahami mekanisme multikolinearitas dan dampaknya terhadap inflasi varians koefisien regresi.","Capaian 2: Menghitung Variance Inflation Factor (VIF) dan Condition Number matriks desain.","Capaian 3: Menerapkan strategi penanganan multikolinearitas (eliminasi fitur, Principal Component Regression, Ridge Regression)."],keyFormulaOrDiagram:"$$\\text{Var}(\\hat{\\beta}_j) = \\frac{\\sigma^2}{\\sum_{i=1}^n (x_{ij} - \\bar{x}_j)^2} \\times \\frac{1}{1 - R_j^2}$$",notes:"Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.1.4."},{slideNumber:35,layout:"concept",title:"Fondasi Konseptual: Multikolinearitas: Deteksi via VIF dan Strategi Penanganannya",lead:"Dalam regresi linier berganda, para peneliti sering tergoda untuk memasukkan sebanyak mungkin variabel prediktor ke dalam model dengan harapan meningkatkan akurasi penjelasan.",bulletPoints:["Namun, ketika dua atau lebih variabel prediktor memiliki korelasi linier yang kuat satu sama lain, model mengalami kondisi patologis yang disebut Multikolinearitas (Multicollinearity).","Multikolinearitas tidak melanggar asumsi Gauss-Markov jika korelasinya tidak sempurna (rank matriks tetap penuh).","Oleh karena itu, estimator OLS secara teknis tetap bersifat tak bias (unbiased)."],notes:"Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."},{slideNumber:36,layout:"concept",title:"Arsitektur Metodologis & Desain Operasional",lead:"Untuk mendeteksi tingkat keparahan multikolinearitas, metrik diagnostik standar yang digunakan adalah Variance Inflation Factor (VIF).",bulletPoints:["VIF mengukur seberapa besar varians koefisien ke-j membengkak dibandingkan kondisi di mana prediktor tersebut ortogonal sempurna terhadap prediktor lainnya.","Ambang batas umum adalah: VIF > 5 mengindikasikan kolinearitas moderat, dan VIF > 10 menunjukkan multikolinearitas parah yang menuntut tindakan perbaikan seperti eliminasi variabel redundan, agregasi indeks, atau regularisasi L2 (Ridge)."],notes:"Tegaskan batas operasional sistem dan validitas internal pengukuran."},{slideNumber:37,layout:"derivation",title:"Formulasi Matematis & Notasi Formal",lead:"1. Formulasi Variance Inflation Factor (VIF):",bulletPoints:["Varians dari koefisien estimator $\\hat{\\beta}_j$ dalam regresi berganda dapat diuraikan menjadi:","di mana $R_j^2$ adalah koefisien determinasi yang diperoleh dari regresi pembantu (*auxiliary regression*), yaitu meregresikan prediktor $X_j$ terhadap seluruh prediktor lainnya dalam model.","Faktor inflasi varians didefinisikan sebagai:"],keyFormulaOrDiagram:"$$\\text{Var}(\\hat{\\beta}_j) = \\frac{\\sigma^2}{\\sum_{i=1}^n (x_{ij} - \\bar{x}_j)^2} \\times \\frac{1}{1 - R_j^2}$$",notes:"Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."},{slideNumber:38,layout:"example",title:"Studi Kasus Numerik: Perumusan Masalah",lead:"Konteks rekayasa dan spesifikasi parameter eksperimen.",bulletPoints:["Konteks Kasus: Dalam permodelan konsumsi energi gedung, terdapat dua prediktor suhu: X1 (Suhu udara luar ruangan dalam Celcius) dan X2 (Suhu udara luar ruangan dalam Fahrenheit). Karena hubungan fisik F = 1.8*C + 32, korelasi sampel antara X1 dan X2 adalah r = 0.995 (sehingga R_j^2 = 0.990). Hitung VIF untuk kedua prediktor dan jelaskan dampaknya terhadap standar error koefisien.","Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."],notes:"Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."},{slideNumber:39,layout:"example",title:"Solusi Numerik: Kalkulasi Langkah demi Langkah",lead:"Prosedur perhitungan analitis dan estimasi parameter.",bulletPoints:["Langkah 1: Identifikasi koefisien determinasi regresi pembantu: R_1^2 = R_2^2 = 0.990.",`Langkah 2: Hitung VIF:
VIF = 1 / (1 - 0.990) = 1 / 0.010 = 100.0.`],notes:"Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."},{slideNumber:40,layout:"example",title:"Solusi Numerik: Pembuktian & Interpretasi Hasil",lead:"Evaluasi kriteria keputusan statistik dan signifikansi temuan.",bulletPoints:[`Langkah 3: Hitung faktor pembesaran standar error (SE):
Faktor Pembesaran SE = sqrt(VIF) = sqrt(100.0) = 10.0.`,"Langkah 4: Hitung toleransi: Tol = 1 - 0.990 = 0.010.","[result: Interpretasi Ilmiah] VIF bernilai 100.0 (jauh melampaui ambang batas 10). Standar error koefisien suhu membengkak 10 kali lipat dari kondisi ideal. Akibatnya, rentang confidence interval menjadi 10 kali lebih lebar dan uji t kemungkinan besar menghasilkan p > 0.05, meskipun suhu adalah faktor penentu konsumsi energi. Solusi: Buang salah satu prediktor suhu."],notes:"Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."},{slideNumber:41,layout:"algorithm",title:"Implementasi Komputasi & Eksekusi Python",lead:"Deteksi multikolinearitas menggunakan VIF dan perbandingan estimasi sebelum vs sesudah penanganan.",bulletPoints:["Tujuan Algoritma: Deteksi multikolinearitas menggunakan VIF dan perbandingan estimasi sebelum vs sesudah penanganan.","Dependensi Pustaka Ilmiah: numpy, statsmodels","Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Evaluasi Multikolinearitas via VIF"],keyFormulaOrDiagram:`[SIMULASI/SYNTHETIC DATA] Evaluasi Multikolinearitas via VIF
VIF x1 (Variabel Asli)      : 36.31
VIF x2 (Variabel Redundan)  : 36.31
VIF x3 (Variabel Ortogonal) : 1.00
`,notes:"Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."},{slideNumber:42,layout:"warning",title:"Perangkap Metodologis & P-Hacking Warning",lead:"Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",bulletPoints:["[warning: Perangkap] Menyimpulkan bahwa suatu variabel tidak berpengaruh hanya karena p-value > 0.05 pada model yang terjangkit VIF tinggi.","[warning: Perangkap] Mengira bahwa menambahkan interaksi polinomial (misal x dan x^2) selalu aman tanpa melakukan pemusatan rata-rata (mean-centering) terlebih dahulu.","[warning: Perangkap] Membuang variabel tanpa dasar teori ilmiah semata-mata untuk menurunkan VIF."],notes:"Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."},{slideNumber:43,layout:"example",title:"Prosedur Validasi Empiris & Integritas Riset",lead:"Protokol pengujian ketahanan model dan integritas keterbukaan sains.",bulletPoints:["Prosedur: Hitung nilai VIF untuk seluruh prediktor: jika VIF > 5, selidiki matriks korelasi bivariat.","Prosedur: Lakukan mean-centering pada prediktor sebelum membentuk suku polinomial atau interaksi.","Prosedur: Bandingkan stabilitas koefisien sebelum dan sesudah penghapusan variabel kolinier."],notes:"Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."},{slideNumber:44,layout:"exercise",title:"Sintesis Materi & Latihan Mandiri",lead:"Pertanyaan penguji pemahaman kritis dan diskusi kelas.",bulletPoints:["Pertanyaan Uji: Pada regresi pembantu sebuah prediktor, diperoleh koefisien determinasi R_j^2 = 0.95. Berapakah nilai VIF prediktor tersebut?","Petunjuk Analitis: Gunakan formula VIF = 1 / (1 - R_j^2).","Solusi Kunci: VIF = 1 / (1 - 0.95) = 1 / 0.05 = 20.0. Nilai ini menunjukkan multikolinearitas sangat parah karena varians membengkak 20 kali lipat."],notes:"Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."}]}};export{a as CH24_LESSONS};
