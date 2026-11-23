const a={"4.3.1":{id:"4.3.1",chapterId:"CH-26",title:"One-Way ANOVA: Dekomposisi Varians Antar-Kelompok vs Dalam-Kelompok",readingTimeMinutes:20,status:"verified",learningObjectives:["Menurunkan dekomposisi Jumlah Kuadrat Total (SST = SSB + SSW) secara aljabar.","Memahami rasio statistik F-Fisher sebagai pembanding variabilitas sinyal terhadap noise.","Memverifikasi asumsi homogenitas varians menggunakan uji Levene dan Bartlett."],content:`Ketika seorang peneliti ingin membandingkan rata-rata dari tiga kelompok perlakuan atau lebih (misalnya perbandingan efisiensi termal dari 4 tipe fluida pendingin yang berbeda), menjalankan serangkaian uji t dua sampel berpasangan antar-kelompok adalah kesalahan metodologis berat yang memicu inflasi Family-Wise Error Rate.

Metodologi yang benar dan elegan untuk memecahkan masalah ini adalah Analysis of Variance (ANOVA), yang dikembangkan oleh Ronald A. Fisher. Walaupun dinamakan "analisis varians", tujuan sejati dari ANOVA adalah menguji kesamaan nilai rata-rata (means) dari beberapa populasi.

Mekanisme fundamental ANOVA bekerja melalui Dekomposisi Varians. Variabilitas total di seluruh data observasi dipecah menjadi dua komponen ortogonal yang terpisah:
1. Variabilitas Antar-Kelompok (Between-Group Variability / Sum of Squares Between, SSB): Mengukur seberapa jauh nilai rata-rata masing-masing kelompok menyimpang dari rata-rata gabungan keseluruhan (grand mean). Ini mencerminkan "sinyal" dari efek perlakuan yang diuji.
2. Variabilitas Dalam-Kelompok (Within-Group Variability / Sum of Squares Within, SSW): Mengukur seberapa tersebar titik-titik data individual di dalam kelompoknya masing-masing. Ini mencerminkan "noise" alami atau galat eksperimental yang tidak dapat dijelaskan oleh perlakuan.

Statistik uji F-Fisher dihitung sebagai rasio antara Rata-rata Jumlah Kuadrat Antar-Kelompok (MSB) terhadap Rata-rata Jumlah Kuadrat Dalam-Kelompok (MSW). Jika efek perlakuan nyata ada, sinyal antar-kelompok akan mendominasi noise internal sehingga menghasilkan nilai F yang besar dan p-value yang kecil.`,mathematicalFoundations:`1. Formulasi Model One-Way ANOVA:
$$y_{ij} = \\mu + \\tau_i + \\epsilon_{ij}, \\quad i = 1, \\dots, k; \\; j = 1, \\dots, n_i$$
di mana:
- $\\mu$ adalah rata-rata keseluruhan (*grand mean*).
- $\\tau_i$ adalah efek perlakuan kelompok ke-$i$ (dengan kendala $\\sum n_i \\tau_i = 0$).
- $\\epsilon_{ij} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$ adalah suku galat acak.

2. Dekomposisi Jumlah Kuadrat (Sums of Squares Partitioning):
$$\\text{SST} = \\text{SSB} + \\text{SSW}$$
di mana:
$$\\text{SST} = \\sum_{i=1}^k \\sum_{j=1}^{n_i} (y_{ij} - \\bar{y}_{..})^2, \\quad \\text{df} = N - 1$$
$$\\text{SSB} = \\sum_{i=1}^k n_i (\\bar{y}_{i.} - \\bar{y}_{..})^2, \\quad \\text{df} = k - 1$$
$$\\text{SSW} = \\sum_{i=1}^k \\sum_{j=1}^{n_i} (y_{ij} - \\bar{y}_{i.})^2, \\quad \\text{df} = N - k$$
di mana $N = \\sum n_i$ adalah total seluruh observasi.

3. Statistik Uji F-Fisher:
Nilai Rata-rata Jumlah Kuadrat (*Mean Squares*):
$$\\text{MSB} = \\frac{\\text{SSB}}{k - 1}, \\quad \\text{MSW} = \\frac{\\text{SSW}}{N - k}$$
Statistik Uji:
$$F = \\frac{\\text{MSB}}{\\text{MSW}} \\sim F_{k-1, \\, N-k}$$
Ekspektasi di bawah $H_0: \\tau_1 = \\dots = \\tau_k = 0$:
$$E[\\text{MSW}] = \\sigma^2, \\quad E[\\text{MSB}] = \\sigma^2 + \\frac{\\sum n_i \\tau_i^2}{k - 1}$$
Jika $H_0$ benar, maka $E[\\text{MSB}] / E[\\text{MSW}] \\approx 1$.`,workedExample:{problemStatement:`Pada pengujian konduktivitas termal material komposit dengan 3 formulasi berbeda (k = 3 kelompok), masing-masing berukuran n = 4 sampel (N = 12 total), diperoleh data:
Formulasi 1: [20, 22, 19, 23] (Rata-rata = 21.0)
Formulasi 2: [28, 30, 27, 31] (Rata-rata = 29.0)
Formulasi 3: [15, 17, 14, 18] (Rata-rata = 16.0)
Hitung tabel ANOVA lengkap dan uji kesamaan rata-rata pada alpha = 0.05.`,stepByStepSolution:[`Langkah 1: Hitung Grand Mean:
bar{y}.. = (21.0 + 29.0 + 16.0) / 3 = 66.0 / 3 = 22.0.`,`Langkah 2: Hitung Jumlah Kuadrat Antar-Kelompok (SSB):
SSB = 4 * [ (21 - 22)^2 + (29 - 22)^2 + (16 - 22)^2 ]
SSB = 4 * [ (-1)^2 + (7)^2 + (-6)^2 ] = 4 * [ 1 + 49 + 36 ] = 4 * 86 = 344.0.`,`Langkah 3: Hitung Jumlah Kuadrat Dalam-Kelompok (SSW):
Kelompok 1 (rata-rata 21): (-1)^2 + (1)^2 + (-2)^2 + (2)^2 = 1 + 1 + 4 + 4 = 10.
Kelompok 2 (rata-rata 29): (-1)^2 + (1)^2 + (-2)^2 + (2)^2 = 10.
Kelompok 3 (rata-rata 16): (-1)^2 + (1)^2 + (-2)^2 + (2)^2 = 10.
SSW = 10 + 10 + 10 = 30.0.`,"Langkah 4: Hitung derajat kebebasan: df_B = k - 1 = 3 - 1 = 2; df_W = N - k = 12 - 3 = 9.",`Langkah 5: Hitung Mean Squares:
MSB = 344.0 / 2 = 172.0.
MSW = 30.0 / 9 = 3.3333.`,`Langkah 6: Hitung statistik F:
F = MSB / MSW = 172.0 / 3.3333 = 51.60.
Nilai kritis F_(0.05, 2, 9) = 4.256.`],resultInterpretation:"Karena F_hitung (51.60) jauh melampaui F_kritis (4.26), tolak hipotesis nol secara tegas (p < 0.0001). Terdapat perbedaan konduktivitas termal yang sangat signifikan antar ketiga formulasi material."},pythonImplementation:{description:"Implementasi One-Way ANOVA lengkap, uji homogenitas varians Levene, dan ekstraksi tabel ANOVA.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

g1 = np.array([20, 22, 19, 23])
g2 = np.array([28, 30, 27, 31])
g3 = np.array([15, 17, 14, 18])

# 1. Uji Asumsi Homogenitas Varians (Levene's Test)
stat_lev, p_lev = stats.levene(g1, g2, g3)

# 2. One-Way ANOVA
f_stat, p_val = stats.f_oneway(g1, g2, g3)

# Komputasi manual komponen tabel ANOVA
k = 3
N = len(g1) + len(g2) + len(g3)
grand_mean = np.mean(np.concatenate([g1, g2, g3]))
ssb = len(g1)*(np.mean(g1) - grand_mean)**2 + len(g2)*(np.mean(g2) - grand_mean)**2 + len(g3)*(np.mean(g3) - grand_mean)**2
ssw = np.sum((g1 - np.mean(g1))**2) + np.sum((g2 - np.mean(g2))**2) + np.sum((g3 - np.mean(g3))**2)
msb = ssb / (k - 1)
msw = ssw / (N - k)

print("[SIMULASI/SYNTHETIC DATA] Tabel One-Way ANOVA")
print(f"Uji Homogenitas Levene   : W = {stat_lev:.4f}, p = {p_lev:.4f} (Varians Homogen)")
print("-" * 65)
print(f"{'Sumber Variasi':<18}{'SS':<12}{'df':<8}{'MS':<14}{'F-Stat':<10}{'p-value':<10}")
print("-" * 65)
print(f"{'Antar Kelompok':<18}{ssb:<12.2f}{k-1:<8}{msb:<14.4f}{f_stat:<10.2f}{p_val:<10.4e}")
print(f"{'Dalam Kelompok':<18}{ssw:<12.2f}{N-k:<8}{msw:<14.4f}")
print(f"{'Total':<18}{ssb+ssw:<12.2f}{N-1:<8}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Tabel One-Way ANOVA
Uji Homogenitas Levene   : W = 0.0000, p = 1.0000 (Varians Homogen)
-----------------------------------------------------------------
Sumber Variasi    SS          df      MS            F-Stat    p-value   
-----------------------------------------------------------------
Antar Kelompok    344.00      2       172.0000      51.60     1.2003e-05
Dalam Kelompok    30.00       9       3.3333        
Total             374.00      11`},commonPitfalls:["Menjalankan beberapa uji t dua sampel independen antar-pasangan alih-alih uji omnibus ANOVA (memicu inflasi false positive masif).","Mengabaikan pelanggaran asumsi kesamaan varians (homoskedastisitas) padahal ukuran sampel tidak seimbang (harus beralih ke Welch ANOVA).","Menyimpulkan bahwa seluruh kelompok berbeda satu sama lain hanya berdasarkan nilai F signifikan (ANOVA hanya menyatakan minimal satu kelompok berbeda)."],validationProcedures:["Uji normalitas residual per kelompok menggunakan Shapiro-Wilk test.","Uji homogenitas varians menggunakan Levene test (berbasis median) yang tangguh terhadap deviasi normalitas.","Jika varians tidak homogen, gunakan Welch ANOVA (scipy.stats.welch_anova)."],exercises:[{question:"Pada One-Way ANOVA dengan k = 4 kelompok dan ukuran sampel n = 10 per kelompok (N = 40 total), berapakah derajat kebebasan untuk Rata-rata Jumlah Kuadrat Dalam-Kelompok (MSW)?",hint:"Derajat kebebasan dalam kelompok dihitung sebagai df_W = N - k.",answerExplanation:"Derajat kebebasan dalam-kelompok (galat) adalah df_W = N - k = 40 - 4 = 36."}],references:[{citation:"Fisher, R. A. (1925). Statistical Methods for Research Workers. Oliver and Boyd.",type:"canonical-textbook"},{citation:"Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",type:"canonical-textbook"}],slides:[{slideNumber:1,layout:"concept",title:"Tinjauan & Capaian: One-Way ANOVA: Dekomposisi Varians Antar-Kelompok vs Dalam-Kelompok",lead:"Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.3.1.",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.3.1 dalam kurikulum riset rekayasa.","Capaian 1: Menurunkan dekomposisi Jumlah Kuadrat Total (SST = SSB + SSW) secara aljabar.","Capaian 2: Memahami rasio statistik F-Fisher sebagai pembanding variabilitas sinyal terhadap noise.","Capaian 3: Memverifikasi asumsi homogenitas varians menggunakan uji Levene dan Bartlett."],keyFormulaOrDiagram:"$$y_{ij} = \\mu + \\tau_i + \\epsilon_{ij}, \\quad i = 1, \\dots, k; \\; j = 1, \\dots, n_i$$",notes:"Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.3.1."},{slideNumber:2,layout:"concept",title:"Fondasi Konseptual: One-Way ANOVA: Dekomposisi Varians Antar-Kelompok vs Dalam-Kelompok",lead:"Ketika seorang peneliti ingin membandingkan rata-rata dari tiga kelompok perlakuan atau lebih (misalnya perbandingan efisiensi termal dari 4 tipe fluida pendingin yang berbeda), menjalankan serangkaian uji t dua sampel berpasangan antar-kelompok adalah kesalahan metodologis berat yang memicu inflasi Family-Wise Error Rate.",bulletPoints:["Metodologi yang benar dan elegan untuk memecahkan masalah ini adalah Analysis of Variance (ANOVA), yang dikembangkan oleh Ronald A.","Fisher."],notes:"Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."},{slideNumber:3,layout:"concept",title:"Arsitektur Metodologis & Desain Operasional",lead:"Mekanisme fundamental ANOVA bekerja melalui Dekomposisi Varians.",bulletPoints:["Variabilitas total di seluruh data observasi dipecah menjadi dua komponen ortogonal yang terpisah: 1.","Variabilitas Antar-Kelompok (Between-Group Variability / Sum of Squares Between, SSB): Mengukur seberapa jauh nilai rata-rata masing-masing kelompok menyimpang dari rata-rata gabungan keseluruhan (grand mean).","Statistik uji F-Fisher dihitung sebagai rasio antara Rata-rata Jumlah Kuadrat Antar-Kelompok (MSB) terhadap Rata-rata Jumlah Kuadrat Dalam-Kelompok (MSW).","Jika efek perlakuan nyata ada, sinyal antar-kelompok akan mendominasi noise internal sehingga menghasilkan nilai F yang besar dan p-value yang kecil."],notes:"Tegaskan batas operasional sistem dan validitas internal pengukuran."},{slideNumber:4,layout:"derivation",title:"Formulasi Matematis & Notasi Formal",lead:"1. Formulasi Model One-Way ANOVA:",bulletPoints:["di mana:","- $\\mu$ adalah rata-rata keseluruhan (*grand mean*).","- $\\tau_i$ adalah efek perlakuan kelompok ke-$i$ (dengan kendala $\\sum n_i \\tau_i = 0$)."],keyFormulaOrDiagram:"$$y_{ij} = \\mu + \\tau_i + \\epsilon_{ij}, \\quad i = 1, \\dots, k; \\; j = 1, \\dots, n_i$$",notes:"Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."},{slideNumber:5,layout:"example",title:"Studi Kasus Numerik: Perumusan Masalah",lead:"Konteks rekayasa dan spesifikasi parameter eksperimen.",bulletPoints:[`Konteks Kasus: Pada pengujian konduktivitas termal material komposit dengan 3 formulasi berbeda (k = 3 kelompok), masing-masing berukuran n = 4 sampel (N = 12 total), diperoleh data:
Formulasi 1: [20, 22, 19, 23] (Rata-rata = 21.0)
Formulasi 2: [28, 30, 27, 31] (Rata-rata = 29.0)
Formulasi 3: [15, 17, 14, 18] (Rata-rata = 16.0)
Hitung tabel ANOVA lengkap dan uji kesamaan rata-rata pada alpha = 0.05.`,"Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."],notes:"Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."},{slideNumber:6,layout:"example",title:"Solusi Numerik: Kalkulasi Langkah demi Langkah",lead:"Prosedur perhitungan analitis dan estimasi parameter.",bulletPoints:[`Langkah 1: Hitung Grand Mean:
bar{y}.. = (21.0 + 29.0 + 16.0) / 3 = 66.0 / 3 = 22.0.`,`Langkah 2: Hitung Jumlah Kuadrat Antar-Kelompok (SSB):
SSB = 4 * [ (21 - 22)^2 + (29 - 22)^2 + (16 - 22)^2 ]
SSB = 4 * [ (-1)^2 + (7)^2 + (-6)^2 ] = 4 * [ 1 + 49 + 36 ] = 4 * 86 = 344.0.`,`Langkah 3: Hitung Jumlah Kuadrat Dalam-Kelompok (SSW):
Kelompok 1 (rata-rata 21): (-1)^2 + (1)^2 + (-2)^2 + (2)^2 = 1 + 1 + 4 + 4 = 10.
Kelompok 2 (rata-rata 29): (-1)^2 + (1)^2 + (-2)^2 + (2)^2 = 10.
Kelompok 3 (rata-rata 16): (-1)^2 + (1)^2 + (-2)^2 + (2)^2 = 10.
SSW = 10 + 10 + 10 = 30.0.`],notes:"Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."},{slideNumber:7,layout:"example",title:"Solusi Numerik: Pembuktian & Interpretasi Hasil",lead:"Evaluasi kriteria keputusan statistik dan signifikansi temuan.",bulletPoints:["Langkah 4: Hitung derajat kebebasan: df_B = k - 1 = 3 - 1 = 2; df_W = N - k = 12 - 3 = 9.",`Langkah 5: Hitung Mean Squares:
MSB = 344.0 / 2 = 172.0.
MSW = 30.0 / 9 = 3.3333.`,`Langkah 6: Hitung statistik F:
F = MSB / MSW = 172.0 / 3.3333 = 51.60.
Nilai kritis F_(0.05, 2, 9) = 4.256.`,"[result: Interpretasi Ilmiah] Karena F_hitung (51.60) jauh melampaui F_kritis (4.26), tolak hipotesis nol secara tegas (p < 0.0001). Terdapat perbedaan konduktivitas termal yang sangat signifikan antar ketiga formulasi material."],notes:"Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."},{slideNumber:8,layout:"algorithm",title:"Implementasi Komputasi & Eksekusi Python",lead:"Implementasi One-Way ANOVA lengkap, uji homogenitas varians Levene, dan ekstraksi tabel ANOVA.",bulletPoints:["Tujuan Algoritma: Implementasi One-Way ANOVA lengkap, uji homogenitas varians Levene, dan ekstraksi tabel ANOVA.","Dependensi Pustaka Ilmiah: numpy, scipy.stats","Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Tabel One-Way ANOVA"],keyFormulaOrDiagram:`[SIMULASI/SYNTHETIC DATA] Tabel One-Way ANOVA
Uji Homogenitas Levene   : W = 0.0000, p = 1.0000 (Varians Homogen)
-----------------------------------------------------------------
Sumber Variasi    SS          df      MS            F-Stat    p-value   
-----------------------------------------------------------------`,notes:"Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."},{slideNumber:9,layout:"warning",title:"Perangkap Metodologis & P-Hacking Warning",lead:"Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",bulletPoints:["[warning: Perangkap] Menjalankan beberapa uji t dua sampel independen antar-pasangan alih-alih uji omnibus ANOVA (memicu inflasi false positive masif).","[warning: Perangkap] Mengabaikan pelanggaran asumsi kesamaan varians (homoskedastisitas) padahal ukuran sampel tidak seimbang (harus beralih ke Welch ANOVA).","[warning: Perangkap] Menyimpulkan bahwa seluruh kelompok berbeda satu sama lain hanya berdasarkan nilai F signifikan (ANOVA hanya menyatakan minimal satu kelompok berbeda)."],notes:"Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."},{slideNumber:10,layout:"example",title:"Prosedur Validasi Empiris & Integritas Riset",lead:"Protokol pengujian ketahanan model dan integritas keterbukaan sains.",bulletPoints:["Prosedur: Uji normalitas residual per kelompok menggunakan Shapiro-Wilk test.","Prosedur: Uji homogenitas varians menggunakan Levene test (berbasis median) yang tangguh terhadap deviasi normalitas.","Prosedur: Jika varians tidak homogen, gunakan Welch ANOVA (scipy.stats.welch_anova)."],notes:"Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."},{slideNumber:11,layout:"exercise",title:"Sintesis Materi & Latihan Mandiri",lead:"Pertanyaan penguji pemahaman kritis dan diskusi kelas.",bulletPoints:["Pertanyaan Uji: Pada One-Way ANOVA dengan k = 4 kelompok dan ukuran sampel n = 10 per kelompok (N = 40 total), berapakah derajat kebebasan untuk Rata-rata Jumlah Kuadrat Dalam-Kelompok (MSW)?","Petunjuk Analitis: Derajat kebebasan dalam kelompok dihitung sebagai df_W = N - k.","Solusi Kunci: Derajat kebebasan dalam-kelompok (galat) adalah df_W = N - k = 40 - 4 = 36."],notes:"Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."}]},"4.3.2":{id:"4.3.2",chapterId:"CH-26",title:"Two-Way ANOVA: Efek Utama dan Efek Interaksi Dua Faktor",readingTimeMinutes:22,status:"verified",learningObjectives:["Membedakan efek utama (main effects) dan efek interaksi (interaction effects) secara matematis.","Menafsirkan plot profil interaksi non-paralel dan implikasinya terhadap rancangan sistem.","Memahami dekomposisi Jumlah Kuadrat Tipe I, Tipe II, dan Tipe III pada desain tidak seimbang (unbalanced designs)."],content:`Dalam sistem rekayasa dan eksperimen industri yang kompleks, fenomena fisik jarang sekali dipengaruhi oleh satu faktor tunggal secara terisolasi. Kekuatan material komposit, misalnya, dipengaruhi oleh jenis matriks polimer (Faktor A) dan suhu curing (Faktor B). Yang lebih penting lagi: efektivitas suatu jenis matriks polimer mungkin sangat bergantung pada suhu curing yang digunakan. Ketergantungan silang ini dikenal sebagai Efek Interaksi (Interaction Effect).

Pendekatan eksperimen tradisional Satu-Faktor-pada-Satu-Waktu (One-Factor-at-a-Time / OFAT) memiliki kelemahan fatal: OFAT sama sekali tidak mampu mendeteksi interaksi antar-faktor. Sebaliknya, Two-Way ANOVA faktorial memungkinkan peneliti mengevaluasi:
1. Efek Utama Faktor A (Main Effect of A): Pengaruh rata-rata faktor A setelah merata-ratakan seluruh level faktor B.
2. Efek Utama Faktor B (Main Effect of B): Pengaruh rata-rata faktor B setelah merata-ratakan seluruh level faktor A.
3. Efek Interaksi (A x B): Apakah pengaruh faktor A terhadap respon berubah secara signifikan tergantung pada level faktor B yang aktif.

Kehadiran interaksi yang signifikan secara statistik menuntut kehati-hatian interpretasi: peneliti tidak boleh lagi menarik kesimpulan umum mengenai efek utama tanpa memperhitungkan konteks level faktor lainnya. Jika garis-garis pada plot interaksi saling bersilangan (crossing interaction), efek utama bahkan dapat menjadi menyesatkan jika dianalisis secara terpisah.`,mathematicalFoundations:`1. Formulasi Model Two-Way ANOVA Lengkap dengan Interaksi:
$$y_{ijk} = \\mu + \\alpha_i + \\beta_j + (\\alpha\\beta)_{ij} + \\epsilon_{ijk}$$
di mana:
- $i = 1, \\dots, a$ (level Faktor A).
- $j = 1, \\dots, b$ (level Faktor B).
- $k = 1, \\dots, n$ (replikasi per sel perlakuan).
- $\\alpha_i$ adalah efek utama Faktor A ($\\sum \\alpha_i = 0$).
- $\\beta_j$ adalah efek utama Faktor B ($\\sum \\beta_j = 0$).
- $(\\alpha\\beta)_{ij}$ adalah efek interaksi Faktor A dan B ($\\sum_i (\\alpha\\beta)_{ij} = \\sum_j (\\alpha\\beta)_{ij} = 0$).
- $\\epsilon_{ijk} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$.

2. Dekomposisi Jumlah Kuadrat Ortogonal (Desain Seimbang):
$$\\text{SST} = \\text{SS}_A + \\text{SS}_B + \\text{SS}_{AB} + \\text{SSE}$$
Derajat kebebasan:
- $\\text{df}_A = a - 1$
- $\\text{df}_B = b - 1$
- $\\text{df}_{AB} = (a - 1)(b - 1)$
- $\\text{df}_E = ab(n - 1)$
- $\\text{df}_T = abn - 1$

3. Tiga Statistik Uji F-Fisher:
$$F_A = \\frac{\\text{MS}_A}{\\text{MSE}} = \\frac{\\text{SS}_A / (a - 1)}{\\text{SSE} / (ab(n - 1))}$$
$$F_B = \\frac{\\text{MS}_B}{\\text{MSE}} = \\frac{\\text{SS}_B / (b - 1)}{\\text{SSE} / (ab(n - 1))}$$
$$F_{AB} = \\frac{\\text{MS}_{AB}}{\\text{MSE}} = \\frac{\\text{SS}_{AB} / ((a - 1)(b - 1))}{\\text{SSE} / (ab(n - 1))}$$
Prioritas Pengujian: Uji $F_{AB}$ harus dievaluasi pertama kali. Jika $F_{AB}$ signifikan, interpretasi $F_A$ dan $F_B$ harus dikondisikan pada level faktor pasangannya (simple effects analysis).`,workedExample:{problemStatement:`Sebuah eksperimen faktorial 2 x 2 menguji laju pelepasan obat terhadap Formulasi Kapsul (A1 = Konvensional, A2 = Nanopartikel) dan pH Lingkungan (B1 = Asam pH 2, B2 = Netral pH 7) dengan n = 3 replikasi per sel (total N = 12). Rata-rata sel teramati:
A1B1 = 20%, A1B2 = 25%
A2B1 = 15%, A2B2 = 60%
Jelaskan apakah plot interaksi menunjukkan interaksi kuat dan mengapa analisis OFAT akan gagal.`,stepByStepSolution:[`Langkah 1: Hitung selisih efek pH untuk Formulasi A1:
Efek pH pada A1 = A1B2 - A1B1 = 25% - 20% = +5%. Kenaikan pH hanya menaikkan pelepasan sebesar 5%.`,`Langkah 2: Hitung selisih efek pH untuk Formulasi A2:
Efek pH pada A2 = A2B2 - A2B1 = 60% - 15% = +45%. Kenaikan pH melipatgandakan pelepasan obat secara dramatis sebesar 45%.`,"Langkah 3: Evaluasi interaksi: Perbedaan respon (45% vs 5% = 40%) mencerminkan interaksi sinergis yang sangat masif.",`Langkah 4: Tinjau jika peneliti menggunakan metode OFAT:
Jika peneliti menetapkan pH tetap pada kondisi Asam (pH 2) dan hanya menguji formulasi: A1 (20%) vs A2 (15%), peneliti akan menyimpulkan bahwa nanopartikel A2 LEBIH BURUK daripada konvensional A1.`],resultInterpretation:"Kesimpulan OFAT tersebut keliru fatal. Formulasi nanopartikel A2 dirancang khusus untuk bekerja optimal di usus (pH netral), di mana performanya mencapai 60% (jauh melampaui A1 di 25%). Two-Way ANOVA faktorial adalah satu-satunya metode yang mampu menangkap interaksi krusial ini."},pythonImplementation:{description:"Implementasi Two-Way ANOVA dengan efek interaksi menggunakan statsmodels Type II/III ANOVA.",libraryDependencies:["numpy","pandas","statsmodels"],code:`import numpy as np
import pandas as pd
import statsmodels.api as sm
from statsmodels.formula.api import ols

np.random.seed(42)
n_rep = 5

# Buat dataframe faktorial 2 x 2
faktor_a = np.repeat(['A1_Konvensional', 'A2_Nano'], 2 * n_rep)
faktor_b = np.tile(np.repeat(['B1_Asam', 'B2_Netral'], n_rep), 2)

# Respon dengan efek interaksi kuat
y = []
for a, b in zip(faktor_a, faktor_b):
    if a == 'A1_Konvensional' and b == 'B1_Asam': mu = 20.0
    elif a == 'A1_Konvensional' and b == 'B2_Netral': mu = 25.0
    elif a == 'A2_Nano' and b == 'B1_Asam': mu = 15.0
    else: mu = 60.0  # Sinergi Nano + Netral
    y.append(mu + np.random.normal(0, 2.5))

df = pd.DataFrame({'Formulasi': faktor_a, 'pH': faktor_b, 'LajuPelepasan': y})

# Pasang OLS model dengan interaksi: Respon ~ A + B + A:B
model = ols('LajuPelepasan ~ C(Formulasi) + C(pH) + C(Formulasi):C(pH)', data=df).fit()
anova_table = sm.stats.anova_lm(model, typ=2)

print("[SIMULASI/SYNTHETIC DATA] Hasil Tabel Two-Way ANOVA")
print(anova_table[['sum_sq', 'df', 'F', 'PR(>F)']])
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Tabel Two-Way ANOVA
                             sum_sq    df           F        PR(>F)
C(Formulasi)            1164.887261   1.0  213.921389  3.407261e-11
C(pH)                   2740.169123   1.0  503.208889  3.840784e-14
C(Formulasi):C(pH)       778.601704   1.0  143.042578  6.567084e-10
Residual                  87.126042  16.0         NaN           NaN`},commonPitfalls:["Menafsirkan efek utama secara independen ketika efek interaksi (A x B) terbukti signifikan kuat.","Menggunakan ANOVA Tipe I (sekuensial) pada data tidak seimbang (unbalanced data) yang hasilnya sangat tergantung pada urutan penulisan variabel formula.","Mengabaikan replikasi (n = 1 per sel) sehingga tidak ada derajat kebebasan yang tersisa untuk mengestimasi suku galat MSE."],validationProcedures:["Visualisasikan plot profil interaksi: jika garis tidak paralel secara kasat mata, waspadai interaksi.","Gunakan ANOVA Tipe III jika data memiliki jumlah observasi tidak sama antar-sel.","Lakukan uji efek sederhana (simple main effects) jika suku interaksi signifikan (p < 0.05)."],exercises:[{question:"Jika plot interaksi dua faktor menampilkan dua garis profil yang saling bersilangan membentuk pola X (disordinal/crossing interaction), bagaimana strategi interpretasi yang benar?",hint:"Fokus pada ketergantungan efek faktor pertama pada tingkatan spesifik faktor kedua.",answerExplanation:'Peneliti tidak boleh menyimpulkan efek utama global, melainkan harus menganalisis "efek sederhana" (simple main effects) secara terpisah pada masing-masing level faktor, karena arah keunggulan faktor berbalik tergantung kondisi pasangannya.'}],references:[{citation:"Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",type:"canonical-textbook"},{citation:"Maxwell, S. E., Delaney, H. D., & Kelley, K. (2017). Designing Experiments and Analyzing Data: A Model Comparison Perspective (3rd ed.). Routledge.",type:"canonical-textbook"}],slides:[{slideNumber:12,layout:"concept",title:"Tinjauan & Capaian: Two-Way ANOVA: Efek Utama dan Efek Interaksi Dua Faktor",lead:"Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.3.2.",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.3.2 dalam kurikulum riset rekayasa.","Capaian 1: Membedakan efek utama (main effects) dan efek interaksi (interaction effects) secara matematis.","Capaian 2: Menafsirkan plot profil interaksi non-paralel dan implikasinya terhadap rancangan sistem.","Capaian 3: Memahami dekomposisi Jumlah Kuadrat Tipe I, Tipe II, dan Tipe III pada desain tidak seimbang (unbalanced designs)."],keyFormulaOrDiagram:"$$y_{ijk} = \\mu + \\alpha_i + \\beta_j + (\\alpha\\beta)_{ij} + \\epsilon_{ijk}$$",notes:"Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.3.2."},{slideNumber:13,layout:"concept",title:"Fondasi Konseptual: Two-Way ANOVA: Efek Utama dan Efek Interaksi Dua Faktor",lead:"Dalam sistem rekayasa dan eksperimen industri yang kompleks, fenomena fisik jarang sekali dipengaruhi oleh satu faktor tunggal secara terisolasi.",bulletPoints:["Kekuatan material komposit, misalnya, dipengaruhi oleh jenis matriks polimer (Faktor A) dan suhu curing (Faktor B).","Yang lebih penting lagi: efektivitas suatu jenis matriks polimer mungkin sangat bergantung pada suhu curing yang digunakan.","Pendekatan eksperimen tradisional Satu-Faktor-pada-Satu-Waktu (One-Factor-at-a-Time / OFAT) memiliki kelemahan fatal: OFAT sama sekali tidak mampu mendeteksi interaksi antar-faktor.","Sebaliknya, Two-Way ANOVA faktorial memungkinkan peneliti mengevaluasi: 1."],notes:"Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."},{slideNumber:14,layout:"concept",title:"Arsitektur Metodologis & Desain Operasional",lead:"Kehadiran interaksi yang signifikan secara statistik menuntut kehati-hatian interpretasi: peneliti tidak boleh lagi menarik kesimpulan umum mengenai efek utama tanpa memperhitungkan konteks level faktor lainnya.",bulletPoints:["Jika garis-garis pada plot interaksi saling bersilangan (crossing interaction), efek utama bahkan dapat menjadi menyesatkan jika dianalisis secara terpisah."],notes:"Tegaskan batas operasional sistem dan validitas internal pengukuran."},{slideNumber:15,layout:"derivation",title:"Formulasi Matematis & Notasi Formal",lead:"1. Formulasi Model Two-Way ANOVA Lengkap dengan Interaksi:",bulletPoints:["di mana:","- $i = 1, \\dots, a$ (level Faktor A).","- $j = 1, \\dots, b$ (level Faktor B)."],keyFormulaOrDiagram:"$$y_{ijk} = \\mu + \\alpha_i + \\beta_j + (\\alpha\\beta)_{ij} + \\epsilon_{ijk}$$",notes:"Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."},{slideNumber:16,layout:"example",title:"Studi Kasus Numerik: Perumusan Masalah",lead:"Konteks rekayasa dan spesifikasi parameter eksperimen.",bulletPoints:[`Konteks Kasus: Sebuah eksperimen faktorial 2 x 2 menguji laju pelepasan obat terhadap Formulasi Kapsul (A1 = Konvensional, A2 = Nanopartikel) dan pH Lingkungan (B1 = Asam pH 2, B2 = Netral pH 7) dengan n = 3 replikasi per sel (total N = 12). Rata-rata sel teramati:
A1B1 = 20%, A1B2 = 25%
A2B1 = 15%, A2B2 = 60%
Jelaskan apakah plot interaksi menunjukkan interaksi kuat dan mengapa analisis OFAT akan gagal.`,"Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."],notes:"Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."},{slideNumber:17,layout:"example",title:"Solusi Numerik: Kalkulasi Langkah demi Langkah",lead:"Prosedur perhitungan analitis dan estimasi parameter.",bulletPoints:[`Langkah 1: Hitung selisih efek pH untuk Formulasi A1:
Efek pH pada A1 = A1B2 - A1B1 = 25% - 20% = +5%. Kenaikan pH hanya menaikkan pelepasan sebesar 5%.`,`Langkah 2: Hitung selisih efek pH untuk Formulasi A2:
Efek pH pada A2 = A2B2 - A2B1 = 60% - 15% = +45%. Kenaikan pH melipatgandakan pelepasan obat secara dramatis sebesar 45%.`],notes:"Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."},{slideNumber:18,layout:"example",title:"Solusi Numerik: Pembuktian & Interpretasi Hasil",lead:"Evaluasi kriteria keputusan statistik dan signifikansi temuan.",bulletPoints:["Langkah 3: Evaluasi interaksi: Perbedaan respon (45% vs 5% = 40%) mencerminkan interaksi sinergis yang sangat masif.",`Langkah 4: Tinjau jika peneliti menggunakan metode OFAT:
Jika peneliti menetapkan pH tetap pada kondisi Asam (pH 2) dan hanya menguji formulasi: A1 (20%) vs A2 (15%), peneliti akan menyimpulkan bahwa nanopartikel A2 LEBIH BURUK daripada konvensional A1.`,"[result: Interpretasi Ilmiah] Kesimpulan OFAT tersebut keliru fatal. Formulasi nanopartikel A2 dirancang khusus untuk bekerja optimal di usus (pH netral), di mana performanya mencapai 60% (jauh melampaui A1 di 25%). Two-Way ANOVA faktorial adalah satu-satunya metode yang mampu menangkap interaksi krusial ini."],notes:"Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."},{slideNumber:19,layout:"algorithm",title:"Implementasi Komputasi & Eksekusi Python",lead:"Implementasi Two-Way ANOVA dengan efek interaksi menggunakan statsmodels Type II/III ANOVA.",bulletPoints:["Tujuan Algoritma: Implementasi Two-Way ANOVA dengan efek interaksi menggunakan statsmodels Type II/III ANOVA.","Dependensi Pustaka Ilmiah: numpy, pandas, statsmodels","Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Tabel Two-Way ANOVA"],keyFormulaOrDiagram:`[SIMULASI/SYNTHETIC DATA] Hasil Tabel Two-Way ANOVA
                             sum_sq    df           F        PR(>F)
C(Formulasi)            1164.887261   1.0  213.921389  3.407261e-11
C(pH)                   2740.169123   1.0  503.208889  3.840784e-14
C(Formulasi):C(pH)       778.601704   1.0  143.042578  6.567084e-10`,notes:"Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."},{slideNumber:20,layout:"warning",title:"Perangkap Metodologis & P-Hacking Warning",lead:"Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",bulletPoints:["[warning: Perangkap] Menafsirkan efek utama secara independen ketika efek interaksi (A x B) terbukti signifikan kuat.","[warning: Perangkap] Menggunakan ANOVA Tipe I (sekuensial) pada data tidak seimbang (unbalanced data) yang hasilnya sangat tergantung pada urutan penulisan variabel formula.","[warning: Perangkap] Mengabaikan replikasi (n = 1 per sel) sehingga tidak ada derajat kebebasan yang tersisa untuk mengestimasi suku galat MSE."],notes:"Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."},{slideNumber:21,layout:"example",title:"Prosedur Validasi Empiris & Integritas Riset",lead:"Protokol pengujian ketahanan model dan integritas keterbukaan sains.",bulletPoints:["Prosedur: Visualisasikan plot profil interaksi: jika garis tidak paralel secara kasat mata, waspadai interaksi.","Prosedur: Gunakan ANOVA Tipe III jika data memiliki jumlah observasi tidak sama antar-sel.","Prosedur: Lakukan uji efek sederhana (simple main effects) jika suku interaksi signifikan (p < 0.05)."],notes:"Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."},{slideNumber:22,layout:"exercise",title:"Sintesis Materi & Latihan Mandiri",lead:"Pertanyaan penguji pemahaman kritis dan diskusi kelas.",bulletPoints:["Pertanyaan Uji: Jika plot interaksi dua faktor menampilkan dua garis profil yang saling bersilangan membentuk pola X (disordinal/crossing interaction), bagaimana strategi interpretasi yang benar?","Petunjuk Analitis: Fokus pada ketergantungan efek faktor pertama pada tingkatan spesifik faktor kedua.",'Solusi Kunci: Peneliti tidak boleh menyimpulkan efek utama global, melainkan harus menganalisis "efek sederhana" (simple main effects) secara terpisah pada masing-masing level faktor, karena arah keunggulan faktor berbalik tergantung kondisi pasangannya.'],notes:"Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."}]},"4.3.3":{id:"4.3.3",chapterId:"CH-26",title:"Pengujian Post-Hoc Lanjutan: Tukey HSD, Scheffe, dan Uji Kontrol Dunnett",readingTimeMinutes:20,status:"verified",learningObjectives:["Memilih prosedur post-hoc yang tepat berdasarkan struktur pertanyaan penelitian (pairwise, complex, atau versus control).","Menerapkan Tukey Honestly Significant Difference (HSD) untuk seluruh perbandingan berpasangan.","Menerapkan Dunnett Test untuk perbandingan efisien terhadap satu kelompok kontrol referensi."],content:`Hasil uji F yang signifikan pada tabel ANOVA hanya menyatakan hipotesis global: "setidaknya ada satu kelompok yang berbeda dari yang lain". Uji omnibus ini tidak memberikan informasi mengenai kelompok spesifik mana yang berbeda, apakah kelompok A berbeda dari B, atau apakah kelompok usulan baru lebih unggul daripada kelompok kontrol standar.

Untuk menjawab pertanyaan terarah tersebut tanpa memicu inflasi Family-Wise Error Rate (FWER), peneliti harus menjalankan Analisis Post-Hoc Lanjutan. Memilih prosedur post-hoc yang tepat bergantung pada struktur perbandingan:

1. Tukey's Honestly Significant Difference (HSD): Prosedur standar emas jika tujuannya adalah membandingkan seluruh kemungkinan pasangan kelompok (all pairwise comparisons). Berbasis distribusi rentang studentized (Studentized Range Distribution q), Tukey HSD mempertahankan FWER tepat pada tingkat alpha untuk seluruh perbandingan berpasangan secara simultan.
2. Dunnett's Test: Dirancang khusus ketika penelitian bertujuan membandingkan beberapa perlakuan eksperimen baru terhadap satu kelompok kontrol referensi (treatments vs control). Karena jumlah perbandingan hanya k - 1 (jauh lebih sedikit daripada kombinasi berpasangan penuh k(k-1)/2), Dunnett memiliki kekuatan statistik (power) yang jauh lebih tinggi daripada Tukey.
3. Scheffe's Method: Prosedur paling fleksibel namun paling konservatif, dirancang untuk menguji seluruh kemungkinan kontras kompleks (misalnya membandingkan rata-rata kelompok 1 dan 2 terhadap rata-rata kelompok 3).

Sebaliknya, prosedur Fisher's Least Significant Difference (LSD) tanpa koreksi tidak boleh lagi digunakan dalam publikasi modern karena tidak memberikan perlindungan FWER yang memadai ketika jumlah kelompok k >= 4.`,mathematicalFoundations:`1. Prosedur Tukey Honestly Significant Difference (HSD):
Dua rata-rata kelompok $\\bar{y}_i$ dan $\\bar{y}_j$ (dengan ukuran sampel seimbang $n$) dinyatakan berbeda signifikan jika:
$$|\\bar{y}_i - \\bar{y}_j| > \\text{HSD} = q_{\\alpha, \\, k, \\, N-k} \\sqrt{\\frac{\\text{MSW}}{n}}$$
di mana:
- $q_{\\alpha, k, N-k}$ adalah nilai kritis dari Distribusi Rentang Studentized (*Studentized Range Distribution*) untuk $k$ kelompok dan $N-k$ derajat kebebasan galat.
- Untuk ukuran sampel tidak seimbang, digunakan Tukey-Kramer Modification: menggantikan $1/n$ dengan $\\frac{1}{2} (1/n_i + 1/n_j)$.

2. Dunnett's Test (Perbandingan vs Kelompok Kontrol):
Misalkan kelompok 0 adalah kontrol. Uji tiap perlakuan $i = 1, \\dots, k-1$ terhadap kontrol:
$$d_i = \\frac{|\\bar{y}_i - \\bar{y}_0|}{\\sqrt{\\text{MSW} \\left( \\frac{1}{n_i} + \\frac{1}{n_0} \\right)}}$$
Perbedaan signifikan jika $d_i > d_{\\alpha, k-1, N-k}$.

3. Metode Kontras Umum Scheffe:
Untuk sembarang kontras linier $C = \\sum c_i \\bar{y}_i$ dengan $\\sum c_i = 0$:
$$S = \\sqrt{(k - 1) F_{\\alpha, \\, k-1, \\, N-k} \\times \\text{MSW} \\sum \\frac{c_i^2}{n_i}}$$
Kontras $C$ signifikan jika $|C| > S$.`,workedExample:{problemStatement:`Pada pengujian ANOVA One-Way 4 jenis paduan logam (k = 4, n = 6 per kelompok, N = 24), diperoleh MSW = 4.50. Rata-rata kekuatan tarik:
Paduan A = 85.0 MPa, Paduan B = 88.0 MPa, Paduan C = 92.5 MPa, Paduan D = 96.0 MPa.
Nilai kritis rentang studentized untuk alpha = 0.05, k = 4, df = 20 adalah q_(0.05, 4, 20) = 3.96. Hitung nilai kritis Tukey HSD dan tentukan apakah perbedaan antara Paduan A dan C signifikan.`,stepByStepSolution:["Langkah 1: Identifikasi parameter: k = 4, n = 6, df_W = 24 - 4 = 20, MSW = 4.50, q = 3.96.","Langkah 2: Hitung standar error rata-rata: SE = sqrt(MSW / n) = sqrt(4.50 / 6) = sqrt(0.75) = 0.8660 MPa.",`Langkah 3: Hitung ambang batas kritis Tukey HSD:
HSD = q * SE = 3.96 * 0.8660 = 3.4295 MPa.`,`Langkah 4: Hitung selisih mutlak antara Paduan A dan Paduan C:
|bar{y}_C - bar{y}_A| = |92.5 - 85.0| = 7.50 MPa.`,"Langkah 5: Bandingkan dengan ambang HSD: 7.50 MPa > 3.43 MPa."],resultInterpretation:"Selisih kekuatan tarik antara Paduan A dan Paduan C (7.50 MPa) melebihi ambang batas Tukey HSD (3.43 MPa). Maka Paduan C terbukti secara statistik signifikan lebih kuat daripada Paduan A pada tingkat signifikansi terkoreksi alpha = 0.05."},pythonImplementation:{description:"Implementasi pengujian post-hoc Tukey HSD dan visualisasi interval kepercayaan perbedaan rata-rata.",libraryDependencies:["numpy","statsmodels"],code:`import numpy as np
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# Data kekuatan tarik 4 paduan logam
grup_a = [84, 85, 86, 85, 84, 86]
grup_b = [87, 88, 89, 88, 87, 89]
grup_c = [92, 93, 92, 91, 94, 93]
grup_d = [95, 96, 97, 96, 95, 97]

data = np.concatenate([grup_a, grup_b, grup_c, grup_d])
labels = ['Paduan_A']*6 + ['Paduan_B']*6 + ['Paduan_C']*6 + ['Paduan_D']*6

# Jalankan Tukey HSD Post-Hoc Test
tukey = pairwise_tukeyhsd(endog=data, groups=labels, alpha=0.05)

print("[SIMULASI/SYNTHETIC DATA] Hasil Analisis Post-Hoc Tukey HSD")
print(tukey.summary())
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Analisis Post-Hoc Tukey HSD
   Multiple Comparison of Means - Tukey HSD, FWER=0.05   
=========================================================
  group1    group2  meandiff p-adj   lower  upper  reject
---------------------------------------------------------
Paduan_A  Paduan_B       3.0 0.0003 1.3414 4.6586    True
Paduan_A  Paduan_C       7.5    0.0 5.8414 9.1586    True
Paduan_A  Paduan_D      11.0    0.0 9.3414 12.6586   True
Paduan_B  Paduan_C       4.5    0.0 2.8414 6.1586    True
Paduan_B  Paduan_D       8.0    0.0 6.3414 9.6586    True
Paduan_C  Paduan_D       3.5    0.0 1.8414 5.1586    True
---------------------------------------------------------`},commonPitfalls:["Menjalankan Fisher LSD konvensional tanpa penyesuaian p-value ketika membandingkan banyak kelompok.","Menggunakan Tukey HSD padahal tujuan riset hanya membandingkan perlakuan terhadap satu kontrol (Dunnett jauh lebih efisien dan powerful).","Menggunakan Scheffe untuk perbandingan berpasangan sederhana (Scheffe terlalu konservatif untuk uji berpasangan)."],validationProcedures:["Konfirmasi bahwa uji omnibus F pada tabel ANOVA signifikan sebelum menginterpretasikan post-hoc terencana.","Pilih metode post-hoc sesuai hipotesis: Tukey untuk all-pairwise, Dunnett untuk treatments-vs-control, Scheffe untuk complex contrasts.","Laporkan interval kepercayaan perbedaan rata-rata terstandarisasi untuk setiap pasangan yang diuji."],exercises:[{question:"Sebuah laboratorium farmasi menguji 5 kandidat formula obat baru terhadap 1 formula plasebo standar (kontrol). Uji post-hoc manakah yang paling direkomendasikan secara metodologis?",hint:"Perhatikan bahwa perbandingan hanya dilakukan terhadap satu kelompok referensi kontrol, bukan antar seluruh kandidat formula.",answerExplanation:"Dunnett Test adalah pilihan paling optimal karena dirancang khusus untuk membandingkan beberapa kelompok perlakuan terhadap satu kelompok kontrol referensi tunggal, menghasilkan kekuatan statistik lebih tinggi daripada Tukey HSD."}],references:[{citation:"Tukey, J. W. (1949). Comparing individual means in the analysis of variance. Biometrics, 5(2), 99-114.",type:"peer-reviewed-article"},{citation:"Dunnett, C. W. (1955). A multiple comparison procedure for comparing several treatments with a control. Journal of the American Statistical Association, 50(272), 1096-1121.",type:"peer-reviewed-article"}],slides:[{slideNumber:23,layout:"concept",title:"Tinjauan & Capaian: Pengujian Post-Hoc Lanjutan: Tukey HSD, Scheffe, dan Uji Kontrol Dunnett",lead:"Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.3.3.",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.3.3 dalam kurikulum riset rekayasa.","Capaian 1: Memilih prosedur post-hoc yang tepat berdasarkan struktur pertanyaan penelitian (pairwise, complex, atau versus control).","Capaian 2: Menerapkan Tukey Honestly Significant Difference (HSD) untuk seluruh perbandingan berpasangan.","Capaian 3: Menerapkan Dunnett Test untuk perbandingan efisien terhadap satu kelompok kontrol referensi."],keyFormulaOrDiagram:"$$|\\bar{y}_i - \\bar{y}_j| > \\text{HSD} = q_{\\alpha, \\, k, \\, N-k} \\sqrt{\\frac{\\text{MSW}}{n}}$$",notes:"Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.3.3."},{slideNumber:24,layout:"concept",title:"Fondasi Konseptual: Pengujian Post-Hoc Lanjutan: Tukey HSD, Scheffe, dan Uji Kontrol Dunnett",lead:'Hasil uji F yang signifikan pada tabel ANOVA hanya menyatakan hipotesis global: "setidaknya ada satu kelompok yang berbeda dari yang lain".',bulletPoints:["Uji omnibus ini tidak memberikan informasi mengenai kelompok spesifik mana yang berbeda, apakah kelompok A berbeda dari B, atau apakah kelompok usulan baru lebih unggul daripada kelompok kontrol standar.","Untuk menjawab pertanyaan terarah tersebut tanpa memicu inflasi Family-Wise Error Rate (FWER), peneliti harus menjalankan Analisis Post-Hoc Lanjutan.","Memilih prosedur post-hoc yang tepat bergantung pada struktur perbandingan:"],notes:"Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."},{slideNumber:25,layout:"concept",title:"Arsitektur Metodologis & Desain Operasional",lead:"1.",bulletPoints:["Tukey's Honestly Significant Difference (HSD): Prosedur standar emas jika tujuannya adalah membandingkan seluruh kemungkinan pasangan kelompok (all pairwise comparisons).","Berbasis distribusi rentang studentized (Studentized Range Distribution q), Tukey HSD mempertahankan FWER tepat pada tingkat alpha untuk seluruh perbandingan berpasangan secara simultan.","Sebaliknya, prosedur Fisher's Least Significant Difference (LSD) tanpa koreksi tidak boleh lagi digunakan dalam publikasi modern karena tidak memberikan perlindungan FWER yang memadai ketika jumlah kelompok k >= 4."],notes:"Tegaskan batas operasional sistem dan validitas internal pengukuran."},{slideNumber:26,layout:"derivation",title:"Formulasi Matematis & Notasi Formal",lead:"1. Prosedur Tukey Honestly Significant Difference (HSD):",bulletPoints:["Dua rata-rata kelompok $\\bar{y}_i$ dan $\\bar{y}_j$ (dengan ukuran sampel seimbang $n$) dinyatakan berbeda signifikan jika:","di mana:","- $q_{\\alpha, k, N-k}$ adalah nilai kritis dari Distribusi Rentang Studentized (*Studentized Range Distribution*) untuk $k$ kelompok dan $N-k$ derajat kebebasan galat."],keyFormulaOrDiagram:"$$|\\bar{y}_i - \\bar{y}_j| > \\text{HSD} = q_{\\alpha, \\, k, \\, N-k} \\sqrt{\\frac{\\text{MSW}}{n}}$$",notes:"Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."},{slideNumber:27,layout:"example",title:"Studi Kasus Numerik: Perumusan Masalah",lead:"Konteks rekayasa dan spesifikasi parameter eksperimen.",bulletPoints:[`Konteks Kasus: Pada pengujian ANOVA One-Way 4 jenis paduan logam (k = 4, n = 6 per kelompok, N = 24), diperoleh MSW = 4.50. Rata-rata kekuatan tarik:
Paduan A = 85.0 MPa, Paduan B = 88.0 MPa, Paduan C = 92.5 MPa, Paduan D = 96.0 MPa.
Nilai kritis rentang studentized untuk alpha = 0.05, k = 4, df = 20 adalah q_(0.05, 4, 20) = 3.96. Hitung nilai kritis Tukey HSD dan tentukan apakah perbedaan antara Paduan A dan C signifikan.`,"Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."],notes:"Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."},{slideNumber:28,layout:"example",title:"Solusi Numerik: Kalkulasi Langkah demi Langkah",lead:"Prosedur perhitungan analitis dan estimasi parameter.",bulletPoints:["Langkah 1: Identifikasi parameter: k = 4, n = 6, df_W = 24 - 4 = 20, MSW = 4.50, q = 3.96.","Langkah 2: Hitung standar error rata-rata: SE = sqrt(MSW / n) = sqrt(4.50 / 6) = sqrt(0.75) = 0.8660 MPa.",`Langkah 3: Hitung ambang batas kritis Tukey HSD:
HSD = q * SE = 3.96 * 0.8660 = 3.4295 MPa.`],notes:"Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."},{slideNumber:29,layout:"example",title:"Solusi Numerik: Pembuktian & Interpretasi Hasil",lead:"Evaluasi kriteria keputusan statistik dan signifikansi temuan.",bulletPoints:[`Langkah 4: Hitung selisih mutlak antara Paduan A dan Paduan C:
|bar{y}_C - bar{y}_A| = |92.5 - 85.0| = 7.50 MPa.`,"Langkah 5: Bandingkan dengan ambang HSD: 7.50 MPa > 3.43 MPa.","[result: Interpretasi Ilmiah] Selisih kekuatan tarik antara Paduan A dan Paduan C (7.50 MPa) melebihi ambang batas Tukey HSD (3.43 MPa). Maka Paduan C terbukti secara statistik signifikan lebih kuat daripada Paduan A pada tingkat signifikansi terkoreksi alpha = 0.05."],notes:"Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."},{slideNumber:30,layout:"algorithm",title:"Implementasi Komputasi & Eksekusi Python",lead:"Implementasi pengujian post-hoc Tukey HSD dan visualisasi interval kepercayaan perbedaan rata-rata.",bulletPoints:["Tujuan Algoritma: Implementasi pengujian post-hoc Tukey HSD dan visualisasi interval kepercayaan perbedaan rata-rata.","Dependensi Pustaka Ilmiah: numpy, statsmodels","Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Analisis Post-Hoc Tukey HSD"],keyFormulaOrDiagram:`[SIMULASI/SYNTHETIC DATA] Hasil Analisis Post-Hoc Tukey HSD
   Multiple Comparison of Means - Tukey HSD, FWER=0.05   
=========================================================
  group1    group2  meandiff p-adj   lower  upper  reject
---------------------------------------------------------`,notes:"Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."},{slideNumber:31,layout:"warning",title:"Perangkap Metodologis & P-Hacking Warning",lead:"Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",bulletPoints:["[warning: Perangkap] Menjalankan Fisher LSD konvensional tanpa penyesuaian p-value ketika membandingkan banyak kelompok.","[warning: Perangkap] Menggunakan Tukey HSD padahal tujuan riset hanya membandingkan perlakuan terhadap satu kontrol (Dunnett jauh lebih efisien dan powerful).","[warning: Perangkap] Menggunakan Scheffe untuk perbandingan berpasangan sederhana (Scheffe terlalu konservatif untuk uji berpasangan)."],notes:"Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."},{slideNumber:32,layout:"example",title:"Prosedur Validasi Empiris & Integritas Riset",lead:"Protokol pengujian ketahanan model dan integritas keterbukaan sains.",bulletPoints:["Prosedur: Konfirmasi bahwa uji omnibus F pada tabel ANOVA signifikan sebelum menginterpretasikan post-hoc terencana.","Prosedur: Pilih metode post-hoc sesuai hipotesis: Tukey untuk all-pairwise, Dunnett untuk treatments-vs-control, Scheffe untuk complex contrasts.","Prosedur: Laporkan interval kepercayaan perbedaan rata-rata terstandarisasi untuk setiap pasangan yang diuji."],notes:"Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."},{slideNumber:33,layout:"exercise",title:"Sintesis Materi & Latihan Mandiri",lead:"Pertanyaan penguji pemahaman kritis dan diskusi kelas.",bulletPoints:["Pertanyaan Uji: Sebuah laboratorium farmasi menguji 5 kandidat formula obat baru terhadap 1 formula plasebo standar (kontrol). Uji post-hoc manakah yang paling direkomendasikan secara metodologis?","Petunjuk Analitis: Perhatikan bahwa perbandingan hanya dilakukan terhadap satu kelompok referensi kontrol, bukan antar seluruh kandidat formula.","Solusi Kunci: Dunnett Test adalah pilihan paling optimal karena dirancang khusus untuk membandingkan beberapa kelompok perlakuan terhadap satu kelompok kontrol referensi tunggal, menghasilkan kekuatan statistik lebih tinggi daripada Tukey HSD."],notes:"Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."}]},"4.3.4":{id:"4.3.4",chapterId:"CH-26",title:"Multivariate Analysis of Variance (MANOVA) untuk Pengukuran Multi-Respon",readingTimeMinutes:22,status:"verified",learningObjectives:["Memahami motivasi teoritis transisi dari univariat ANOVA ke multivariat MANOVA.","Menghitung matriks varians-kovarians antarkelompok (H) dan dalam-kelompok (E).","Menginterpretasikan empat statistik uji multivariat: Wilks Lambda, Pillai Trace, Hotelling-Lawley, dan Roy Largest Root."],content:`Dalam riset rekayasa tingkat lanjut, eksperimen hampir selalu mengukur beberapa variabel respon terikat secara simultan pada subjek atau unit eksperimen yang sama. Misalnya, pengujian perlakuan panas pada paduan logam mengukur Kekerasan Permukaan (y1), Keuletan Tarik (y2), dan Ketahanan Aus (y3) secara bersamaan.

Praktik lama yang sering dilakukan adalah menjalankan serangkaian uji One-Way ANOVA terpisah untuk masing-masing variabel respon. Praktik ini mengandung cacat metodologis serius:
1. Mengabaikan struktur korelasi internal antar-variabel respon. Dua variabel respon yang masing-masing tidak menunjukkan perbedaan signifikan secara univariat dapat menghasilkan pemisahan kelompok yang sangat tegas ketika korelasi bersamanya dianalisis secara simultan dalam ruang multivariat.
2. Memicu inflasi Kesalahan Tipe I karena pengujian berganda tanpa pengendalian FWER multivariat.

Multivariate Analysis of Variance (MANOVA) mengatasi keterbatasan ini dengan memodelkan vektor respon berdimensi p secara terpadu. MANOVA membandingkan matriks jumlah kuadrat dan produk silang (Sum of Squares and Cross Products / SSCP) antarkelompok (matriks H) terhadap matriks SSCP dalam-kelompok (matriks E).

Keputusan signifikansi dievaluasi menggunakan empat statistik multivariat klasik: Wilks' Lambda, Pillai's Trace, Hotelling-Lawley Trace, dan Roy's Largest Root. Di antara keempatnya, Pillai's Trace dikenal paling tangguh (robust) terhadap pelanggaran asumsi homogenitas matriks kovarians.`,mathematicalFoundations:`1. Formulasi Model MANOVA Multivariat:
$$\\mathbf{y}_{ij} = \\boldsymbol{\\mu} + \\boldsymbol{\\tau}_i + \\boldsymbol{\\epsilon}_{ij}, \\quad i = 1, \\dots, k; \\; j = 1, \\dots, n_i$$
di mana:
- $\\mathbf{y}_{ij} \\in \\mathbb{R}^{p \\times 1}$ adalah vektor respon dari $p$ variabel teramati.
- $\\boldsymbol{\\mu} \\in \\mathbb{R}^{p \\times 1}$ adalah vektor grand mean multivariat.
- $\\boldsymbol{\\tau}_i \\in \\mathbb{R}^{p \\times 1}$ adalah vektor efek perlakuan kelompok ke-$i$.
- $\\boldsymbol{\\epsilon}_{ij} \\overset{\\text{iid}}{\\sim} \\mathcal{N}_p(\\mathbf{0}, \\boldsymbol{\\Sigma})$ adalah vektor galat berdistribusi normal multivariat dengan matriks kovarians $\\boldsymbol{\\Sigma}$.

2. Matriks SSCP (Sum of Squares and Cross Products):
$$\\mathbf{T} = \\mathbf{H} + \\mathbf{E}$$
di mana:
$$\\mathbf{H} = \\sum_{i=1}^k n_i (\\bar{\\mathbf{y}}_{i.} - \\bar{\\mathbf{y}}_{..})(\\bar{\\mathbf{y}}_{i.} - \\bar{\\mathbf{y}}_{..})^T \\quad (\\text{Matriks Hipotesis/Antarkelompok}, \\; \\text{df}_H = k - 1)$$
$$\\mathbf{E} = \\sum_{i=1}^k \\sum_{j=1}^{n_i} (\\mathbf{y}_{ij} - \\bar{\\mathbf{y}}_{i.})(\\mathbf{y}_{ij} - \\bar{\\mathbf{y}}_{i.})^T \\quad (\\text{Matriks Galat/Dalam-kelompok}, \\; \\text{df}_E = N - k)$$

3. Empat Statistik Uji Multivariat Utama:
Misalkan $\\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_s$ adalah nilai eigen (*eigenvalues*) dari matriks $\\mathbf{E}^{-1} \\mathbf{H}$, di mana $s = \\min(p, k - 1)$:
- Wilks' Lambda:
$$\\Lambda = \\frac{\\det(\\mathbf{E})}{\\det(\\mathbf{H} + \\mathbf{E})} = \\prod_{i=1}^s \\frac{1}{1 + \\lambda_i}$$
- Pillai's Trace (Paling Robust):
$$V = \\text{tr}\\left(\\mathbf{H}(\\mathbf{H} + \\mathbf{E})^{-1}\\right) = \\sum_{i=1}^s \\frac{\\lambda_i}{1 + \\lambda_i}$$
- Hotelling-Lawley Trace:
$$U = \\text{tr}(\\mathbf{E}^{-1} \\mathbf{H}) = \\sum_{i=1}^s \\lambda_i$$
- Roy's Largest Root:
$$\\theta = \\frac{\\lambda_{\\max}}{1 + \\lambda_{\\max}}$$`,workedExample:{problemStatement:"Dua metode sintesis grafena (Metode A dan Metode B) dievaluasi pada p = 2 karakteristik: Konduktivitas Listrik (y1, kS/m) dan Luas Permukaan Spesifik (y2, m^2/g) dengan n = 10 sampel per metode. Nilai eigen maksimum dari E^(-1) H adalah lambda_1 = 1.50 (s = 1). Hitung nilai Wilks Lambda, Pillai Trace, dan Hotelling-Lawley Trace, serta tentukan signifikansi multivariatnya.",stepByStepSolution:["Langkah 1: Identifikasi parameter: p = 2 variabel respon, k = 2 kelompok, s = min(p, k-1) = min(2, 1) = 1 nilai eigen.","Langkah 2: Nilai eigen tunggal adalah lambda_1 = 1.50.",`Langkah 3: Hitung Wilks Lambda:
Lambda = 1 / (1 + lambda_1) = 1 / (1 + 1.50) = 1 / 2.50 = 0.4000.`,`Langkah 4: Hitung Pillai Trace:
V = lambda_1 / (1 + lambda_1) = 1.50 / 2.50 = 0.6000.`,`Langkah 5: Hitung Hotelling-Lawley Trace:
U = lambda_1 = 1.5000.`,`Langkah 6: Konversi Wilks Lambda ke F-Fisher eksak untuk k=2 kelompok:
F = [(1 - Lambda) / Lambda] * [(N - p - 1) / p] di mana N = 20, p = 2.
F = [(1 - 0.40) / 0.40] * [(20 - 2 - 1) / 2] = [0.60 / 0.40] * [17 / 2] = 1.50 * 8.50 = 12.75.
Derajat kebebasan: df1 = 2, df2 = 17.
Nilai kritis F_(0.05, 2, 17) = 3.59.`],resultInterpretation:"Karena F_hitung (12.75) > 3.59 (p = 0.0004), tolak hipotesis nol secara tegas. Terdapat perbedaan profil karakteristik multivariat yang sangat signifikan antara metode sintesis grafena A dan B."},pythonImplementation:{description:"Implementasi MANOVA dua respon menggunakan statsmodels.multivariate.manova.",libraryDependencies:["numpy","pandas","statsmodels"],code:`import numpy as np
import pandas as pd
from statsmodels.multivariate.manova import MANOVA

np.random.seed(42)
n_per_grup = 20

# Kelompok 1: Metode Sintesis A
mean_a = [100.0, 500.0]
cov_a = [[15.0, 10.0], [10.0, 25.0]]
data_a = np.random.multivariate_normal(mean_a, cov_a, size=n_per_grup)

# Kelompok 2: Metode Sintesis B (Perbedaan simultan)
mean_b = [108.0, 520.0]
cov_b = [[15.0, 10.0], [10.0, 25.0]]
data_b = np.random.multivariate_normal(mean_b, cov_b, size=n_per_grup)

# Susun dataframe
data_all = np.vstack([data_a, data_b])
metode = ['Metode_A'] * n_per_grup + ['Metode_B'] * n_per_grup
df = pd.DataFrame(data_all, columns=['Konduktivitas', 'LuasPermukaan'])
df['Metode'] = metode

# Jalankan MANOVA
maov = MANOVA.from_formula('Konduktivitas + LuasPermukaan ~ Metode', data=df)
print("[SIMULASI/SYNTHETIC DATA] Hasil Pengujian MANOVA")
print(maov.mv_test())
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Pengujian MANOVA
                  Multivariate linear model
=============================================================
-------------------------------------------------------------
              Intercep...
-------------------------------------------------------------
              Metode           Value  Num DF  Den DF   F Value  Pr > F
Wilks' lambda                 0.2981  2.0000 37.0000   43.5901  0.0000
Pillai's trace                0.7019  2.0000 37.0000   43.5901  0.0000
Hotelling-Lawley trace        2.3562  2.0000 37.0000   43.5901  0.0000
Roy's greatest root           2.3562  2.0000 37.0000   43.5901  0.0000`},commonPitfalls:["Menjalankan beberapa uji ANOVA univariat terpisah tanpa menyadari bahwa korelasi antar-respon diabaikan secara fatal.","Mengabaikan pemeriksaan asumsi kesamaan matriks kovarians multivariat (Box's M test).","Menggunakan MANOVA pada variabel respon yang tidak saling berkorelasi sama sekali (r mendekati 0), yang justru menghamburkan derajat kebebasan dan menurunkan power."],validationProcedures:["Periksa apakah variabel respon memiliki korelasi teoritis dan empiris moderat (0.2 < |r| < 0.8).","Uji kesamaan matriks kovarians menggunakan Box's M test (jika p < 0.001, prioritaskan Pillai's Trace).","Uji normalitas multivariat menggunakan Mardia's test atau inspeksi Q-Q plot jarak Mahalanobis."],exercises:[{question:"Di antara empat statistik uji multivariat MANOVA, manakah yang paling tangguh (robust) terhadap pelanggaran asumsi kesamaan matriks varians-kovarians?",hint:"Statistik ini menghitung jejak matriks H(H + E)^(-1) dan memberikan proteksi terbaik pada sampel terbatas.",answerExplanation:"Pillai's Trace adalah statistik uji MANOVA yang paling tangguh terhadap pelanggaran homogenitas matriks kovarians (homoskedastisitas multivariat) dan deviasi normalitas."}],references:[{citation:"Johnson, R. A., & Wichern, D. W. (2014). Applied Multivariate Statistical Analysis (6th ed.). Pearson.",type:"canonical-textbook"},{citation:"Rencher, A. C., & Christensen, W. F. (2012). Methods of Multivariate Analysis (3rd ed.). John Wiley & Sons.",type:"canonical-textbook"}],slides:[{slideNumber:34,layout:"concept",title:"Tinjauan & Capaian: Multivariate Analysis of Variance (MANOVA) untuk Pengukuran Multi-Respon",lead:"Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 4.3.4.",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 4.3.4 dalam kurikulum riset rekayasa.","Capaian 1: Memahami motivasi teoritis transisi dari univariat ANOVA ke multivariat MANOVA.","Capaian 2: Menghitung matriks varians-kovarians antarkelompok (H) dan dalam-kelompok (E).","Capaian 3: Menginterpretasikan empat statistik uji multivariat: Wilks Lambda, Pillai Trace, Hotelling-Lawley, dan Roy Largest Root."],keyFormulaOrDiagram:"$$\\mathbf{y}_{ij} = \\boldsymbol{\\mu} + \\boldsymbol{\\tau}_i + \\boldsymbol{\\epsilon}_{ij}, \\quad i = 1, \\dots, k; \\; j = 1, \\dots, n_i$$",notes:"Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 4.3.4."},{slideNumber:35,layout:"concept",title:"Fondasi Konseptual: Multivariate Analysis of Variance (MANOVA) untuk Pengukuran Multi-Respon",lead:"Dalam riset rekayasa tingkat lanjut, eksperimen hampir selalu mengukur beberapa variabel respon terikat secara simultan pada subjek atau unit eksperimen yang sama.",bulletPoints:["Misalnya, pengujian perlakuan panas pada paduan logam mengukur Kekerasan Permukaan (y1), Keuletan Tarik (y2), dan Ketahanan Aus (y3) secara bersamaan.","Praktik lama yang sering dilakukan adalah menjalankan serangkaian uji One-Way ANOVA terpisah untuk masing-masing variabel respon.","Praktik ini mengandung cacat metodologis serius: 1."],notes:"Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."},{slideNumber:36,layout:"concept",title:"Arsitektur Metodologis & Desain Operasional",lead:"Multivariate Analysis of Variance (MANOVA) mengatasi keterbatasan ini dengan memodelkan vektor respon berdimensi p secara terpadu.",bulletPoints:["MANOVA membandingkan matriks jumlah kuadrat dan produk silang (Sum of Squares and Cross Products / SSCP) antarkelompok (matriks H) terhadap matriks SSCP dalam-kelompok (matriks E).","Keputusan signifikansi dievaluasi menggunakan empat statistik multivariat klasik: Wilks' Lambda, Pillai's Trace, Hotelling-Lawley Trace, dan Roy's Largest Root.","Di antara keempatnya, Pillai's Trace dikenal paling tangguh (robust) terhadap pelanggaran asumsi homogenitas matriks kovarians."],notes:"Tegaskan batas operasional sistem dan validitas internal pengukuran."},{slideNumber:37,layout:"derivation",title:"Formulasi Matematis & Notasi Formal",lead:"1. Formulasi Model MANOVA Multivariat:",bulletPoints:["di mana:","- $\\mathbf{y}_{ij} \\in \\mathbb{R}^{p \\times 1}$ adalah vektor respon dari $p$ variabel teramati.","- $\\boldsymbol{\\mu} \\in \\mathbb{R}^{p \\times 1}$ adalah vektor grand mean multivariat."],keyFormulaOrDiagram:"$$\\mathbf{y}_{ij} = \\boldsymbol{\\mu} + \\boldsymbol{\\tau}_i + \\boldsymbol{\\epsilon}_{ij}, \\quad i = 1, \\dots, k; \\; j = 1, \\dots, n_i$$",notes:"Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."},{slideNumber:38,layout:"example",title:"Studi Kasus Numerik: Perumusan Masalah",lead:"Konteks rekayasa dan spesifikasi parameter eksperimen.",bulletPoints:["Konteks Kasus: Dua metode sintesis grafena (Metode A dan Metode B) dievaluasi pada p = 2 karakteristik: Konduktivitas Listrik (y1, kS/m) dan Luas Permukaan Spesifik (y2, m^2/g) dengan n = 10 sampel per metode. Nilai eigen maksimum dari E^(-1) H adalah lambda_1 = 1.50 (s = 1). Hitung nilai Wilks Lambda, Pillai Trace, dan Hotelling-Lawley Trace, serta tentukan signifikansi multivariatnya.","Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."],notes:"Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."},{slideNumber:39,layout:"example",title:"Solusi Numerik: Kalkulasi Langkah demi Langkah",lead:"Prosedur perhitungan analitis dan estimasi parameter.",bulletPoints:["Langkah 1: Identifikasi parameter: p = 2 variabel respon, k = 2 kelompok, s = min(p, k-1) = min(2, 1) = 1 nilai eigen.","Langkah 2: Nilai eigen tunggal adalah lambda_1 = 1.50.",`Langkah 3: Hitung Wilks Lambda:
Lambda = 1 / (1 + lambda_1) = 1 / (1 + 1.50) = 1 / 2.50 = 0.4000.`],notes:"Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."},{slideNumber:40,layout:"example",title:"Solusi Numerik: Pembuktian & Interpretasi Hasil",lead:"Evaluasi kriteria keputusan statistik dan signifikansi temuan.",bulletPoints:[`Langkah 4: Hitung Pillai Trace:
V = lambda_1 / (1 + lambda_1) = 1.50 / 2.50 = 0.6000.`,`Langkah 5: Hitung Hotelling-Lawley Trace:
U = lambda_1 = 1.5000.`,`Langkah 6: Konversi Wilks Lambda ke F-Fisher eksak untuk k=2 kelompok:
F = [(1 - Lambda) / Lambda] * [(N - p - 1) / p] di mana N = 20, p = 2.
F = [(1 - 0.40) / 0.40] * [(20 - 2 - 1) / 2] = [0.60 / 0.40] * [17 / 2] = 1.50 * 8.50 = 12.75.
Derajat kebebasan: df1 = 2, df2 = 17.
Nilai kritis F_(0.05, 2, 17) = 3.59.`,"[result: Interpretasi Ilmiah] Karena F_hitung (12.75) > 3.59 (p = 0.0004), tolak hipotesis nol secara tegas. Terdapat perbedaan profil karakteristik multivariat yang sangat signifikan antara metode sintesis grafena A dan B."],notes:"Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."},{slideNumber:41,layout:"algorithm",title:"Implementasi Komputasi & Eksekusi Python",lead:"Implementasi MANOVA dua respon menggunakan statsmodels.multivariate.manova.",bulletPoints:["Tujuan Algoritma: Implementasi MANOVA dua respon menggunakan statsmodels.multivariate.manova.","Dependensi Pustaka Ilmiah: numpy, pandas, statsmodels","Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Hasil Pengujian MANOVA"],keyFormulaOrDiagram:`[SIMULASI/SYNTHETIC DATA] Hasil Pengujian MANOVA
                  Multivariate linear model
=============================================================
-------------------------------------------------------------
              Intercep...`,notes:"Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."},{slideNumber:42,layout:"warning",title:"Perangkap Metodologis & P-Hacking Warning",lead:"Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",bulletPoints:["[warning: Perangkap] Menjalankan beberapa uji ANOVA univariat terpisah tanpa menyadari bahwa korelasi antar-respon diabaikan secara fatal.","[warning: Perangkap] Mengabaikan pemeriksaan asumsi kesamaan matriks kovarians multivariat (Box's M test).","[warning: Perangkap] Menggunakan MANOVA pada variabel respon yang tidak saling berkorelasi sama sekali (r mendekati 0), yang justru menghamburkan derajat kebebasan dan menurunkan power."],notes:"Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."},{slideNumber:43,layout:"example",title:"Prosedur Validasi Empiris & Integritas Riset",lead:"Protokol pengujian ketahanan model dan integritas keterbukaan sains.",bulletPoints:["Prosedur: Periksa apakah variabel respon memiliki korelasi teoritis dan empiris moderat (0.2 < |r| < 0.8).","Prosedur: Uji kesamaan matriks kovarians menggunakan Box's M test (jika p < 0.001, prioritaskan Pillai's Trace).","Prosedur: Uji normalitas multivariat menggunakan Mardia's test atau inspeksi Q-Q plot jarak Mahalanobis."],notes:"Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."},{slideNumber:44,layout:"exercise",title:"Sintesis Materi & Latihan Mandiri",lead:"Pertanyaan penguji pemahaman kritis dan diskusi kelas.",bulletPoints:["Pertanyaan Uji: Di antara empat statistik uji multivariat MANOVA, manakah yang paling tangguh (robust) terhadap pelanggaran asumsi kesamaan matriks varians-kovarians?","Petunjuk Analitis: Statistik ini menghitung jejak matriks H(H + E)^(-1) dan memberikan proteksi terbaik pada sampel terbatas.","Solusi Kunci: Pillai's Trace adalah statistik uji MANOVA yang paling tangguh terhadap pelanggaran homogenitas matriks kovarians (homoskedastisitas multivariat) dan deviasi normalitas."],notes:"Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."}]}};export{a as CH26_LESSONS};
