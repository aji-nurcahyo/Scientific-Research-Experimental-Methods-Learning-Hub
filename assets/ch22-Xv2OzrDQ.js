const a={"3.7.1":{id:"3.7.1",chapterId:"CH-22",title:"Kapan Menggunakan Metode Non-Parametrik: Pelanggaran Normalitas dan Skala Ordinal",readingTimeMinutes:18,status:"verified",learningObjectives:["Mengidentifikasi batasan inferensi parametrik dan kriteria transisi ke metode non-parametrik.","Memahami konsep Asymptotic Relative Efficiency (ARE) antara uji parametrik dan non-parametrik.","Menganalisis karakteristik data ordinal, skewed berat, dan outlier ekstrem dalam riset rekayasa."],content:`Uji statistik parametrik klasik (seperti Student t-test dan ANOVA) dibangun di atas fondasi asumsi distribusi tertentu, paling utama adalah asumsi normalitas residual dan homoskedastisitas varians. Ketika data terdistribusi secara normal atau ukuran sampel mendekati tak terhingga di bawah perlindungan Teorema Batas Pusat (CLT), metode parametrik memiliki kekuatan statistik (power) tertinggi untuk mendeteksi efek sejati.

Namun, dalam banyak skenario rekayasa dan sains eksperimental, asumsi-asumsi tersebut dilanggar secara fatal. Contoh nyata meliputi:
1. Ukuran sampel kecil (n < 15) di mana CLT belum beroperasi secara efektif dan uji normalitas Shapiro-Wilk menolak distribusi Gaussian.
2. Data dengan kecondongan ekstrem (heavy-tailed or severe skewness), seperti latensi jaringan, waktu kegagalan komponen mekanis (time-to-failure), atau emisi gas polutan.
3. Kehadiran pencilan ekstrem (extreme outliers) yang tidak dapat dibuang karena merupakan karakteristik intrinsik sistem fisik.
4. Skala pengukuran ordinal, seperti skor evaluasi kegunaan sistem antarmuka (skala Likert 1 hingga 5), indeks keparahan cacat manufaktur, atau peringkat preferensi algoritma.

Metode non-parametrik (sering disebut juga metode bebas distribusi / distribution-free methods) tidak menuntut asumsi bentuk distribusi populasi tertentu. Sebagian besar metode ini beroperasi dengan mentransformasikan nilai numerik mentah ke dalam format urutan atau peringkat (ranks). Konsekuensinya, metode ini sangat tangguh (robust) terhadap pencilan ekstrem dan invarian terhadap transformasi monoton.

Namun, metode non-parametrik bukanlah "obat mujarab tanpa biaya". Jika data sebenarnya terdistribusi secara normal sempurna, efisiensi relatif asimtotik (Asymptotic Relative Efficiency / ARE) uji peringkat Wilcoxon terhadap uji t-Student adalah sekitar 95.5% (3/pi). Artinya, terjadi sedikit kehilangan daya deteksi (sekitar 4.5%). Sebaliknya, pada data berdistribusi Cauchy, Laplace, atau bimodal ekstrem, ARE metode non-parametrik melesat jauh melampaui 100%, membuktikan superioritas mutlaknya di bawah kondisi non-ideal.`,mathematicalFoundations:`1. Konsep Efisiensi Relatif Asimtotik (Asymptotic Relative Efficiency / ARE):
ARE antara dua uji statistik $T_1$ dan $T_2$ untuk tingkat signifikansi $\\alpha$ dan daya $1 - \\beta$ yang sama didefinisikan sebagai rasio ukuran sampel yang dibutuhkan:
$$\\text{ARE}(T_1, T_2) = \\lim_{n \\to \\infty} \\frac{n_2}{n_1}$$

Untuk uji Wilcoxon Signed-Rank ($T_W$) relatif terhadap uji t satu sampel ($T_t$):
- Pada distribusi Normal murni:
$$\\text{ARE}(T_W, T_t) = \\frac{3}{\\pi} \\approx 0.955$$
- Teorema Batas Hodges-Lehmann membuktikan batas bawah universal untuk distribusi kontinu unimodal simetris sembarang:
$$\\inf_{f} \\text{ARE}(T_W, T_t) = 0.864$$
- Pada distribusi berekor tebal (seperti distribusi Laplace atau double exponential):
$$\\text{ARE}(T_W, T_t) = 1.50 \\quad (150\\%)$$
- Pada distribusi Cauchy (tanpa varians terdefinisi):
$$\\text{ARE}(T_W, T_t) = \\infty$$

2. Transformasi Peringkat (Rank Transformation):
Diberikan sampel acak $\\{X_1, X_2, \\dots, X_n\\}$. Nilai diurutkan dari terkecil ke terbesar:
$$X_{(1)} \\le X_{(2)} \\le \\dots \\le X_{(n)}$$
Peringkat $R_i = \\text{rank}(X_i)$ adalah posisi $X_i$ dalam urutan tersebut.
Untuk nilai yang sama persis (ties), digunakan peringkat rata-rata (mid-ranks).`,workedExample:{problemStatement:"Sebuah tim robotika menguji latensi pemrosesan frame kamera (dalam milidetik) pada 7 pengujian: [12.4, 11.8, 14.2, 11.8, 98.6, 13.1, 12.0]. Nilai 98.6 ms terjadi akibat interferensi jaringan acak. Lakukan transformasi peringkat pada data tersebut dan hitung rata-rata vs median sebelum dan sesudah transformasi untuk menunjukkan ketahanan terhadap outlier.",stepByStepSolution:[`Langkah 1: Urutkan data secara monoton naik:
Data terurut: [11.8, 11.8, 12.0, 12.4, 13.1, 14.2, 98.6]`,`Langkah 2: Tentukan peringkat untuk tiap elemen:
- Nilai 11.8 menempati posisi 1 dan 2 (ada tie). Peringkat rata-rata = (1 + 2) / 2 = 1.5.
- Nilai 12.0 menempati posisi 3. Peringkat = 3.
- Nilai 12.4 menempati posisi 4. Peringkat = 4.
- Nilai 13.1 menempati posisi 5. Peringkat = 5.
- Nilai 14.2 menempati posisi 6. Peringkat = 6.
- Nilai 98.6 menempati posisi 7. Peringkat = 7.`,"Langkah 3: Vektor peringkat terurut: [1.5, 1.5, 3.0, 4.0, 5.0, 6.0, 7.0].",`Langkah 4: Hitung statistik ringkasan data mentah:
- Rata-rata mentah = (12.4 + 11.8 + 14.2 + 11.8 + 98.6 + 13.1 + 12.0) / 7 = 173.9 / 7 = 24.84 ms.
- Median mentah = 12.4 ms.
- Rata-rata peringkat = (1.5 + 1.5 + 3 + 4 + 5 + 6 + 7) / 7 = 28 / 7 = 4.0.`],resultInterpretation:"Pencilan ekstrem 98.6 ms mendistorsi rata-rata mentah menjadi 24.84 ms (jauh di atas mayoritas data di sekitar 12 ms). Namun dalam skala peringkat, pencilan hanya diberi peringkat 7 (hanya satu langkah di atas peringkat 6). Hal ini membuktikan stabilitas representasi berbasis peringkat terhadap kontaminasi data."},pythonImplementation:{description:"Demonstrasi dampak pelanggaran normalitas ekstrem terhadap laju False Positive uji t versus Mann-Whitney U.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

np.random.seed(42)
n_simulasi = 5000
n_per_grup = 15
alpha = 0.05

false_pos_t = 0
false_pos_mwu = 0

for _ in range(n_simulasi):
    grup_a = np.random.lognormal(mean=0.0, sigma=1.8, size=n_per_grup)
    grup_b = np.random.lognormal(mean=0.0, sigma=1.8, size=n_per_grup)
    
    _, p_t = stats.ttest_ind(grup_a, grup_b)
    if p_t < alpha:
        false_pos_t += 1
        
    _, p_mwu = stats.mannwhitneyu(grup_a, grup_b, alternative='two-sided')
    if p_mwu < alpha:
        false_pos_mwu += 1

rate_t = false_pos_t / n_simulasi
rate_mwu = false_pos_mwu / n_simulasi

print("[SIMULASI/SYNTHETIC DATA] Uji Robustness pada Sampel Kecil Log-Normal Ekstrem")
print(f"Jumlah Simulasi : {n_simulasi}")
print(f"Ukuran Sampel   : n1={n_per_grup}, n2={n_per_grup}")
print(f"Target Alpha    : {alpha:.2f}")
print(f"Empirical Type I Error (Uji-t)         : {rate_t:.4f}")
print(f"Empirical Type I Error (Mann-Whitney)  : {rate_mwu:.4f}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Uji Robustness pada Sampel Kecil Log-Normal Ekstrem
Jumlah Simulasi : 5000
Ukuran Sampel   : n1=15, n2=15
Target Alpha    : 0.05
Empirical Type I Error (Uji-t)         : 0.0384
Empirical Type I Error (Mann-Whitney)  : 0.0488`},commonPitfalls:["Memaksakan uji t pada data skala Likert ordinal 5 poin dengan memperlakukannya sebagai skala interval kontinu.","Membuang data pencilan asli secara sembarangan semata-mata agar data lolos uji normalitas parametrik.","Mengira metode non-parametrik tidak memiliki asumsi sama sekali (metode non-parametrik tetap menuntut asumsi independensi observasi dan kesamaan bentuk sebaran)."],validationProcedures:["Periksa skala pengukuran: jika ordinal, gunakan metode non-parametrik.","Uji normalitas residual (Shapiro-Wilk) dan inspeksi Q-Q plot saat n < 30.","Evaluasi keberadaan pencilan berpengaruh tinggi sebelum memutuskan model uji."],exercises:[{question:"Pada kondisi manakah uji non-parametrik berbasis peringkat memiliki keunggulan paling mencolok dibandingkan uji parametrik klasik?",hint:"Perhatikan keberadaan pencilan ekstrem dan bentuk distribusi ekor tebal.",answerExplanation:"Pada distribusi berekor tebal (heavy-tailed) atau beroutlier ekstrem, efisiensi relatif asimtotik uji non-parametrik melesat melampaui uji parametrik karena transformasi peringkat mengebalkan analisis dari distorsi kuadratik."}],references:[{citation:"Hodges, J. L., & Lehmann, E. L. (1956). The efficiency of some nonparametric competitors of the t-test. The Annals of Mathematical Statistics, 27(2), 324-335.",type:"peer-reviewed-article"},{citation:"Conover, W. J. (1999). Practical Nonparametric Statistics (3rd ed.). John Wiley & Sons.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Kapan Menggunakan Metode Non-Parametrik: Pelanggaran No...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 3.7.1.","Capaian: Mengidentifikasi batasan inferensi parametrik dan kriteria transisi ke metode non-parametrik.","Capaian: Memahami konsep Asymptotic Relative Efficiency (ARE) antara uji parametrik dan non-parametrik.","Capaian: Menganalisis karakteristik data ordinal, skewed berat, dan outlier ekstrem dalam riset rekayasa."],keyFormulaOrDiagram:"$$\\text{ARE}(T_1, T_2) = \\lim_{n \\to \\infty} \\frac{n_2}{n_1}$$"},{slideNumber:2,title:"Fondasi Konseptual: Kapan Menggunakan Metode Non-Parametrik: Pelanggaran No...",bulletPoints:["Uji statistik parametrik klasik (seperti Student t-test dan ANOVA) dibangun di atas fondasi asumsi distribusi tertentu, palin...","Namun, dalam banyak skenario rekayasa dan sains eksperimental, asumsi-asumsi tersebut dilanggar secara fatal. Contoh nyata me...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Metode non-parametrik (sering disebut juga metode bebas distribusi / distribution-free met..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Metode non-parametrik (sering disebut juga metode bebas distribusi / distribution-free methods) tidak menuntut asumsi bentuk...",'Namun, metode non-parametrik bukanlah "obat mujarab tanpa biaya". Jika data sebenarnya terdistribusi secara normal sempurna,...',"Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["1. Konsep Efisiensi Relatif Asimtotik (Asymptotic Relative Efficiency / ARE):","ARE antara dua uji statistik $T_1$ dan $T_2$ untuk tingkat signifikansi $\\alpha$ dan daya $1 - \\beta$ yang sam...","Untuk uji Wilcoxon Signed-Rank ($T_W$) relatif terhadap uji t satu sampel ($T_t$):"],keyFormulaOrDiagram:"$$\\text{ARE}(T_1, T_2) = \\lim_{n \\to \\infty} \\frac{n_2}{n_1}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Sebuah tim robotika menguji latensi pemrosesan frame kamera (dalam milidetik) pada 7 pengujian: [12.4, 11.8, 14.2, 11.8, 98.6, 13.1, 12.0]....","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Urutkan data secara monoton naik: Data terurut: [11.8, 11.8, 12.0, 12.4, 13.1, 14.2, 98.6]","Langkah 2: Tentukan peringkat untuk tiap elemen: - Nilai 11.8 menempati posisi 1 dan 2 (ada tie). Peringkat ra...","Langkah 3: Vektor peringkat terurut: [1.5, 1.5, 3.0, 4.0, 5.0, 6.0, 7.0].","Interpretasi: Pencilan ekstrem 98.6 ms mendistorsi rata-rata mentah menjadi 24.84 ms (jauh di atas mayoritas data di sekitar 12 ms). N..."],keyFormulaOrDiagram:"Langkah 4: Hitung statistik ringkasan data mentah: - Rata-rata mentah = (12.4 + 11.8 + 14...."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Demonstrasi dampak pelanggaran normalitas ekstrem terhadap laju False Positive uji t versus Mann-Whitney U.","Dependensi Pustaka: numpy, scipy.stats","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Uji Robustness pada Sampel Kecil Log-Normal Ekstrem"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Uji Robustness pada Sampel Kecil Log-Normal Ekstrem | Jumlah Sim..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Memaksakan uji t pada data skala Likert ordinal 5 poin dengan memperlakukannya sebagai skala interval kontinu.","Perangkap: Membuang data pencilan asli secara sembarangan semata-mata agar data lolos uji normalitas parametrik.","Perangkap: Mengira metode non-parametrik tidak memiliki asumsi sama sekali (metode non-parametrik tetap menuntut asumsi i..."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Periksa skala pengukuran: jika ordinal, gunakan metode non-parametrik.","Prosedur: Uji normalitas residual (Shapiro-Wilk) dan inspeksi Q-Q plot saat n < 30.","Prosedur: Evaluasi keberadaan pencilan berpengaruh tinggi sebelum memutuskan model uji."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Pada kondisi manakah uji non-parametrik berbasis peringkat memiliki keunggulan paling mencolok dibandingkan uji parametr...","Petunjuk: Perhatikan keberadaan pencilan ekstrem dan bentuk distribusi ekor tebal.","Solusi Kunci: Pada distribusi berekor tebal (heavy-tailed) atau beroutlier ekstrem, efisiensi relatif asimtotik uji non-parametrik mel..."]}]},"3.7.2":{id:"3.7.2",chapterId:"CH-22",title:"Uji Peringkat Dua Sampel: Mann-Whitney U Test dan Wilcoxon Signed-Rank Test",readingTimeMinutes:20,status:"verified",learningObjectives:["Menurunkan statistik Mann-Whitney U dan relasinya terhadap jumlah peringkat Wilcoxon Rank-Sum.","Menerapkan Wilcoxon Signed-Rank Test untuk data berpasangan non-parametrik.","Melaporkan ukuran efek non-parametrik (Rank-Biserial Correlation dan Cliff Delta)."],content:`Dua uji non-parametrik yang paling banyak digunakan dalam riset empiris adalah Mann-Whitney U Test (untuk dua kelompok independen) dan Wilcoxon Signed-Rank Test (untuk dua pengukuran berpasangan).

Mann-Whitney U Test (sering disebut juga Wilcoxon Rank-Sum Test) dirancang untuk menguji apakah distribusi populasi dari satu kelompok bergeser relatif terhadap kelompok lainnya. Secara operasional, pengujian ini mengevaluasi hipotesis keunggulan stokastik: $P(X > Y) = P(Y > X) = 0.5$. Prosedurnya menggabungkan seluruh observasi dari kedua kelompok, mengurutkannya, menetapkan peringkat dari 1 hingga $N = n_1 + n_2$, lalu menjumlahkan peringkat pada masing-masing kelompok. Statistik $U$ menghitung berapa kali sebuah observasi dari kelompok 1 mendahului observasi dari kelompok 2.

Wilcoxon Signed-Rank Test merupakan padanan non-parametrik untuk uji t berpasangan (paired t-test). Pengujian ini digunakan ketika dua pengukuran dilakukan pada subjek yang sama (misalnya performa pra vs pasca optimasi, atau akurasi dua model pada batch pengujian yang identik). Prosedur ini menghitung selisih $D_i = X_{1i} - X_{2i}$, membuang selisih nol, menetapkan peringkat untuk nilai absolut $|D_i|$, dan kemudian mengalikan peringkat tersebut dengan tanda aslinya (+ atau -).

Untuk melengkapi pelaporan ilmiah, peneliti wajib menyertakan ukuran efek non-parametrik seperti Korelasi Rank-Biserial ($r_{\\text{rb}}$) atau Cliff's Delta ($\\delta$). Nilai-nilai ini memberikan informasi besaran efek praktis yang invarian terhadap skala pengukuran.`,mathematicalFoundations:`1. Formulasi Statistik Mann-Whitney $U$:
Diberikan dua sampel independen berukuran $n_1$ dan $n_2$. Jumlahkan peringkat kelompok 1 ($R_1$) dan kelompok 2 ($R_2$):
$$U_1 = n_1 n_2 + \\frac{n_1(n_1 + 1)}{2} - R_1$$
$$U_2 = n_1 n_2 + \\frac{n_2(n_2 + 1)}{2} - R_2$$
Perhatikan relasi matematis:
$$U_1 + U_2 = n_1 n_2$$
Statistik uji yang diambil adalah nilai minimum:
$$U = \\min(U_1, U_2)$$

Ekspektasi dan Varians dari $U$ di bawah $H_0$:
$$E[U] = \\frac{n_1 n_2}{2}$$
$$\\sigma_U^2 = \\frac{n_1 n_2 (n_1 + n_2 + 1)}{12}$$
Untuk ukuran sampel $n_1, n_2 > 10$, pendekatan normal asimtotik valid:
$$Z = \\frac{U - E[U]}{\\sigma_U} \\sim \\mathcal{N}(0, 1)$$

Ukuran Efek Korelasi Rank-Biserial:
$$r_{\\text{rb}} = 1 - \\frac{2U}{n_1 n_2}$$

2. Formulasi Wilcoxon Signed-Rank Test:
Untuk data berpasangan $(X_{1i}, X_{2i})$ dengan $n$ pasangan:
Hitung selisih: $D_i = X_{1i} - X_{2i}$.
Abaikan pasangan dengan $D_i = 0$, sehingga tersisa $n'$ pasangan non-nol.
Urutkan $|D_i|$ dan beri peringkat $R_i$.
Hitung jumlah peringkat positif ($W^+$) dan negatif ($W^-$):
$$W^+ = \\sum_{D_i > 0} R_i, \\quad W^- = \\sum_{D_i < 0} R_i$$
Statistik uji $W = \\min(W^+, W^-)$.
Ekspektasi dan Varians:
$$E[W] = \\frac{n'(n' + 1)}{4}, \\quad \\sigma_W^2 = \\frac{n'(n' + 1)(2n' + 1)}{24}$$`,workedExample:{problemStatement:`Dua algoritma kompresi data citra satelit (Metode A dan Metode B) diuji pada 5 citra uji independen per metode. Rasio kompresi teramati:
Metode A: [3.4, 3.8, 4.2, 4.0, 3.9]
Metode B: [2.8, 3.1, 3.5, 3.2, 3.0]
Hitung statistik Mann-Whitney U secara manual dan tentukan apakah Metode A memiliki keunggulan stokastik pada alpha = 0.05.`,stepByStepSolution:[`Langkah 1: Gabungkan data dan beri label kelompok (A atau B):
[3.4(A), 3.8(A), 4.2(A), 4.0(A), 3.9(A), 2.8(B), 3.1(B), 3.5(B), 3.2(B), 3.0(B)].`,`Langkah 2: Urutkan 10 data secara monoton naik dan beri peringkat:
1: 2.8 (B)
2: 3.0 (B)
3: 3.1 (B)
4: 3.2 (B)
5: 3.4 (A)
6: 3.5 (B)
7: 3.8 (A)
8: 3.9 (A)
9: 4.0 (A)
10: 4.2 (A)`,`Langkah 3: Hitung jumlah peringkat kelompok A (R1) dan B (R2):
R1 = 5 + 7 + 8 + 9 + 10 = 39.
R2 = 1 + 2 + 3 + 4 + 6 = 16.
Verifikasi: R1 + R2 = 39 + 16 = 55 = 10*(11)/2 (Cocok).`,`Langkah 4: Hitung U1 dan U2 (n1 = 5, n2 = 5):
U1 = (5 * 5) + (5 * 6)/2 - 39 = 25 + 15 - 39 = 1.
U2 = (5 * 5) + (5 * 6)/2 - 16 = 25 + 15 - 16 = 24.
Statistik U = min(1, 24) = 1.`,`Langkah 5: Evaluasi terhadap nilai kritis Mann-Whitney untuk n1=5, n2=5 pada alpha=0.05 dua arah:
Nilai kritis U_crit = 2. Karena U_hitung (1) <= U_crit (2), tolak H0.`,`Langkah 6: Hitung ukuran efek rank-biserial:
r_rb = 1 - (2 * 1) / (5 * 5) = 1 - 2/25 = 1 - 0.08 = 0.92 (Efek sangat besar).`],resultInterpretation:"Metode A menghasilkan rasio kompresi yang secara statistik signifikan lebih tinggi dibandingkan Metode B (U = 1, p < 0.05, r_rb = 0.92)."},pythonImplementation:{description:"Perhitungan Mann-Whitney U dan Wilcoxon Signed-Rank lengkap dengan estimasi ukuran efek non-parametrik.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

metode_a = np.array([3.4, 3.8, 4.2, 4.0, 3.9])
metode_b = np.array([2.8, 3.1, 3.5, 3.2, 3.0])

u_stat, p_mwu = stats.mannwhitneyu(metode_a, metode_b, alternative='two-sided')
n1, n2 = len(metode_a), len(metode_b)
r_rb = 1.0 - (2.0 * u_stat) / (n1 * n2)

diff = metode_a - metode_b
w_stat, p_wilc = stats.wilcoxon(diff, alternative='two-sided')

print("[SIMULASI/SYNTHETIC DATA] Hasil Analisis Inferensi Non-Parametrik Dua Sampel")
print(f"--- Mann-Whitney U Test (Independen) ---")
print(f"Statistik U       : {u_stat:.1f}")
print(f"p-value           : {p_mwu:.4f}")
print(f"Rank-Biserial r   : {r_rb:.4f}")

print(f"\\n--- Wilcoxon Signed-Rank Test (Berpasangan) ---")
print(f"Statistik W       : {w_stat:.1f}")
print(f"p-value           : {p_wilc:.4f}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Analisis Inferensi Non-Parametrik Dua Sampel
--- Mann-Whitney U Test (Independen) ---
Statistik U       : 24.0
p-value           : 0.0159
Rank-Biserial r   : -0.9200

--- Wilcoxon Signed-Rank Test (Berpasangan) ---
Statistik W       : 0.0
p-value           : 0.0625`},commonPitfalls:["Mengira bahwa Mann-Whitney U menguji kesamaan median tanpa memeriksa apakah kedua populasi memiliki bentuk distribusi yang sama.","Mengabaikan keberadaan observasi berperingkat sama (ties) yang menuntut koreksi varians pada pendekatan normal.","Menggunakan uji Mann-Whitney independen padahal data diambil secara berpasangan (mengurangi kekuatan uji secara signifikan)."],validationProcedures:["Konfirmasi independensi subjek untuk Mann-Whitney U atau pemasangan identik untuk Wilcoxon Signed-Rank.","Periksa distribusi data selisih pada uji Wilcoxon (diasumsikan mendekati simetris di sekitar median selisih).","Laporkan selalu nilai statistik uji, p-value, ukuran sampel per kelompok, dan ukuran efek non-parametrik."],exercises:[{question:"Dua kelompok sampel masing-masing berukuran n1 = 6 dan n2 = 6. Berapakah nilai ekspektasi E[U] di bawah hipotesis nol sejati?",hint:"Gunakan rumus nilai harapan statistik Mann-Whitney: E[U] = (n1 * n2) / 2.",answerExplanation:"Ekspektasi U di bawah H0 adalah E[U] = (n1 * n2) / 2 = (6 * 6) / 2 = 18."}],references:[{citation:"Mann, H. B., & Whitney, D. R. (1947). On a test of whether one of two random variables is stochastically larger than the other. The Annals of Mathematical Statistics, 18(1), 50-60.",type:"peer-reviewed-article"},{citation:"Wilcoxon, F. (1945). Individual comparisons by ranking methods. Biometrics Bulletin, 1(6), 80-83.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Uji Peringkat Dua Sampel: Mann-Whitney U Test dan Wilco...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 3.7.2.","Capaian: Menurunkan statistik Mann-Whitney U dan relasinya terhadap jumlah peringkat Wilcoxon Rank-Sum.","Capaian: Menerapkan Wilcoxon Signed-Rank Test untuk data berpasangan non-parametrik.","Capaian: Melaporkan ukuran efek non-parametrik (Rank-Biserial Correlation dan Cliff Delta)."],keyFormulaOrDiagram:"$$U_1 = n_1 n_2 + \\frac{n_1(n_1 + 1)}{2} - R_1$$"},{slideNumber:2,title:"Fondasi Konseptual: Uji Peringkat Dua Sampel: Mann-Whitney U Test dan Wilco...",bulletPoints:["Dua uji non-parametrik yang paling banyak digunakan dalam riset empiris adalah Mann-Whitney U Test (untuk dua kelompok indepe...","Mann-Whitney U Test (sering disebut juga Wilcoxon Rank-Sum Test) dirancang untuk menguji apakah distribusi populasi dari satu...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Wilcoxon Signed-Rank Test merupakan padanan non-parametrik untuk uji t berpasangan (paired..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Wilcoxon Signed-Rank Test merupakan padanan non-parametrik untuk uji t berpasangan (paired t-test). Pengujian ini digunakan k...","Untuk melengkapi pelaporan ilmiah, peneliti wajib menyertakan ukuran efek non-parametrik seperti Korelasi Rank-Biserial ($r_{...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["1. Formulasi Statistik Mann-Whitney $U$:","Diberikan dua sampel independen berukuran $n_1$ dan $n_2$. Jumlahkan peringkat kelompok 1 ($R_1$) dan kelompok...","Perhatikan relasi matematis:"],keyFormulaOrDiagram:"$$U_1 = n_1 n_2 + \\frac{n_1(n_1 + 1)}{2} - R_1$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Dua algoritma kompresi data citra satelit (Metode A dan Metode B) diuji pada 5 citra uji independen per metode. Rasio kompresi teramati: Met...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Gabungkan data dan beri label kelompok (A atau B): [3.4(A), 3.8(A), 4.2(A), 4.0(A), 3.9(A), 2.8(B),...","Langkah 2: Urutkan 10 data secara monoton naik dan beri peringkat: 1: 2.8 (B) 2: 3.0 (B) 3: 3.1 (B) 4: 3.2 (B)...","Langkah 3: Hitung jumlah peringkat kelompok A (R1) dan B (R2): R1 = 5 + 7 + 8 + 9 + 10 = 39. R2 = 1 + 2 + 3 +...","Interpretasi: Metode A menghasilkan rasio kompresi yang secara statistik signifikan lebih tinggi dibandingkan Metode B (U = 1, p < 0.0..."],keyFormulaOrDiagram:"Langkah 6: Hitung ukuran efek rank-biserial: r_rb = 1 - (2 * 1) / (5 * 5) = 1 - 2/25 = 1 -..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Perhitungan Mann-Whitney U dan Wilcoxon Signed-Rank lengkap dengan estimasi ukuran efek non-parametrik.","Dependensi Pustaka: numpy, scipy.stats","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil Analisis Inferensi Non-Parametrik Dua Sampel"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Hasil Analisis Inferensi Non-Parametrik Dua Sampel | --- Mann-Wh..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Mengira bahwa Mann-Whitney U menguji kesamaan median tanpa memeriksa apakah kedua populasi memiliki bentuk dis...","Perangkap: Mengabaikan keberadaan observasi berperingkat sama (ties) yang menuntut koreksi varians pada pendekatan normal...","Perangkap: Menggunakan uji Mann-Whitney independen padahal data diambil secara berpasangan (mengurangi kekuatan uji secar..."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Konfirmasi independensi subjek untuk Mann-Whitney U atau pemasangan identik untuk Wilcoxon Signed-Rank.","Prosedur: Periksa distribusi data selisih pada uji Wilcoxon (diasumsikan mendekati simetris di sekitar median selisih).","Prosedur: Laporkan selalu nilai statistik uji, p-value, ukuran sampel per kelompok, dan ukuran efek non-parametrik."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Dua kelompok sampel masing-masing berukuran n1 = 6 dan n2 = 6. Berapakah nilai ekspektasi E[U] di bawah hipotesis nol se...","Petunjuk: Gunakan rumus nilai harapan statistik Mann-Whitney: E[U] = (n1 * n2) / 2.","Solusi Kunci: Ekspektasi U di bawah H0 adalah E[U] = (n1 * n2) / 2 = (6 * 6) / 2 = 18."]}]},"3.7.3":{id:"3.7.3",chapterId:"CH-22",title:"Uji Peringkat Multi-Sampel: Kruskal-Wallis H Test dan Friedman Test",readingTimeMinutes:22,status:"verified",learningObjectives:["Menurunkan statistik Kruskal-Wallis H untuk perbandingan multi-kelompok independen.","Menerapkan Friedman Test untuk desain blok acak non-parametrik (repeated measures multi-kondisi).","Melakukan prosedur post-hoc Dunn test dengan koreksi multiple testing terintegrasi."],content:`Ketika eksperimen melibatkan lebih dari dua kelompok perlakuan dan data tidak memenuhi asumsi One-Way ANOVA (khususnya normalitas atau kesamaan varians), Kruskal-Wallis H Test adalah metode rujukan standar. Uji ini merupakan generalisasi multi-sampel dari Mann-Whitney U Test.

Dalam Kruskal-Wallis Test, seluruh data dari $k$ kelompok independen digabungkan dan diberi peringkat bersama dari 1 hingga $N$. Jika hipotesis nol benar (seluruh populasi identik), maka rata-rata peringkat dari masing-masing kelompok akan saling berdekatan dan mendekati rata-rata peringkat keseluruhan $(N+1)/2$. Penyimpangan rata-rata peringkat kelompok diukur oleh statistik $H$, yang mendekati distribusi Chi-Square dengan derajat kebebasan $k - 1$.

Untuk perbandingan multi-kelompok pada pengukuran berulang (repeated measures) atau desain blok teracak (randomized block design), padanan non-parametrik untuk Two-Way Repeated Measures ANOVA adalah Friedman Test. Dalam Friedman Test, peringkat diberikan secara terpisah di dalam setiap blok (subjek atau skenario pengujian), sehingga variabilitas antar-subjek terkontrol secara sempurna.

Jika uji omnibus (Kruskal-Wallis atau Friedman) menghasilkan penolakan terhadap hipotesis nol, peneliti tidak boleh langsung menyimpulkan kelompok mana yang berbeda. Analisis post-hoc wajib dilakukan. Untuk Kruskal-Wallis, prosedur post-hoc standar adalah Dunn Test, yang membandingkan perbedaan rata-rata peringkat berpasangan dan mengoreksi p-value menggunakan Bonferroni atau Benjamini-Hochberg FDR.`,mathematicalFoundations:`1. Formulasi Statistik Kruskal-Wallis $H$:
Misalkan terdapat $k$ kelompok independen dengan ukuran sampel $n_1, n_2, \\dots, n_k$ dan total sampel $N = \\sum_{j=1}^k n_j$.
Seluruh data diberi peringkat gabungan. Misalkan $R_j$ adalah jumlah peringkat untuk kelompok ke-$j$, dan $\\bar{R}_j = R_j / n_j$ adalah rata-rata peringkat kelompok.

Statistik uji $H$ didefinisikan sebagai:
$$H = \\frac{12}{N(N + 1)} \\sum_{j=1}^k \\frac{R_j^2}{n_j} - 3(N + 1)$$

Jika terdapat nilai berperingkat sama (ties), statistik $H$ disesuaikan dengan faktor koreksi $C$:
$$H_{\\text{adj}} = \\frac{H}{C}, \\quad C = 1 - \\frac{\\sum (t_m^3 - t_m)}{N^3 - N}$$
di mana $t_m$ adalah jumlah observasi yang memiliki nilai sama pada kelompok tie ke-$m$.
Di bawah $H_0$ dan $n_j \\ge 5$, $H \\sim \\chi^2_{k-1}$.

2. Formulasi Friedman Test:
Misalkan terdapat $b$ blok (subjek) dan $k$ kondisi perlakuan.
Di dalam tiap blok, beri peringkat kondisi dari 1 hingga $k$.
Misalkan $R_j$ adalah total jumlah peringkat untuk perlakuan ke-$j$.
Statistik uji Friedman:
$$Q = \\frac{12}{b k (k + 1)} \\sum_{j=1}^k R_j^2 - 3 b (k + 1)$$
Di bawah $H_0$, $Q \\sim \\chi^2_{k-1}$.

3. Analisis Post-Hoc Dunn Test:
Perbedaan rata-rata peringkat antara kelompok $i$ dan $j$:
$$Z_{ij} = \\frac{|\\bar{R}_i - \\bar{R}_j|}{\\sigma_{ij}}, \\quad \\sigma_{ij} = \\sqrt{ \\left( \\frac{N(N+1)}{12} - \\frac{\\sum(t_m^3 - t_m)}{12(N-1)} \\right) \\left( \\frac{1}{n_i} + \\frac{1}{n_j} \\right) }$$
Nilai $Z_{ij}$ dievaluasi terhadap distribusi normal standar dengan koreksi multiple testing (Holm atau FDR).`,workedExample:{problemStatement:`Tiga algoritma pemrosesan citra (A, B, C) diuji pada throughput frame per detik (FPS) dengan n = 4 pengujian per algoritma (N = 12 total):
Algoritma A: [24, 26, 25, 28]
Algoritma B: [35, 38, 36, 40]
Algoritma C: [18, 20, 22, 19]
Hitung statistik Kruskal-Wallis H dan uji pada alpha = 0.05.`,stepByStepSolution:[`Langkah 1: Gabungkan seluruh 12 data dan urutkan naik:
18(C), 19(C), 20(C), 22(C), 24(A), 25(A), 26(A), 28(A), 35(B), 36(B), 38(B), 40(B).`,`Langkah 2: Tentukan peringkat data (tidak ada ties):
Kelompok C: peringkat [1, 2, 3, 4] -> R_C = 10, bar{R}_C = 2.5.
Kelompok A: peringkat [5, 6, 7, 8] -> R_A = 26, bar{R}_A = 6.5.
Kelompok B: peringkat [9, 10, 11, 12] -> R_B = 42, bar{R}_B = 10.5.
Verifikasi total peringkat: 10 + 26 + 42 = 78 = 12*13/2 = 78.`,`Langkah 3: Hitung statistik H (N = 12, n_A = n_B = n_C = 4):
H = [12 / (12 * 13)] * [ (26^2 / 4) + (42^2 / 4) + (10^2 / 4) ] - 3 * (13)
H = (12 / 156) * [ (676 / 4) + (1764 / 4) + (100 / 4) ] - 39
H = (1 / 13) * [ 169 + 441 + 25 ] - 39
H = (1 / 13) * [ 635 ] - 39 = 48.846 - 39 = 9.846.`,`Langkah 4: Evaluasi terhadap nilai kritis Chi-Square (df = k - 1 = 3 - 1 = 2) pada alpha = 0.05:
chi^2_(0.05, 2) = 5.991.`,"Langkah 5: Karena H (9.846) > 5.991, tolak H0."],resultInterpretation:"Terdapat perbedaan performa throughput yang signifikan secara statistik di antara ketiga algoritma (H = 9.85, df = 2, p < 0.01). Analisis post-hoc menunjukkan algoritma B memiliki performa tertinggi diikuti A dan C."},pythonImplementation:{description:"Implementasi Kruskal-Wallis Test, Friedman Test, dan analisis post-hoc Dunn dengan koreksi Bonferroni.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

algo_a = np.array([24, 26, 25, 28])
algo_b = np.array([35, 38, 36, 40])
algo_c = np.array([18, 20, 22, 19])

h_stat, p_kw = stats.kruskal(algo_a, algo_b, algo_c)

matriks_beban = np.array([
    [24, 35, 18],
    [26, 38, 20],
    [25, 36, 22],
    [28, 40, 19]
])
q_stat, p_fried = stats.friedmanchisquare(matriks_beban[:, 0], matriks_beban[:, 1], matriks_beban[:, 2])

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Multi-Sampel Non-Parametrik")
print(f"Kruskal-Wallis H-Statistic : {h_stat:.4f}, p-value : {p_kw:.4f}")
print(f"Friedman Q-Statistic       : {q_stat:.4f}, p-value : {p_fried:.4f}")

pasangan = [('A vs B', algo_a, algo_b), ('A vs C', algo_a, algo_c), ('B vs C', algo_b, algo_c)]
alpha_bonf = 0.05 / len(pasangan)

print(f"\\nAnalisis Post-Hoc Per Pasangan (Ambang Bonferroni: {alpha_bonf:.4f}):")
for label, g1, g2 in pasangan:
    u, p = stats.mannwhitneyu(g1, g2)
    keputusan = "Signifikan" if p < alpha_bonf else "Tidak Signifikan"
    print(f"  {label:<10} : p = {p:.4f} -> {keputusan}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Multi-Sampel Non-Parametrik
Kruskal-Wallis H-Statistic : 9.8462, p-value : 0.0073
Friedman Q-Statistic       : 8.0000, p-value : 0.0183

Analisis Post-Hoc Per Pasangan (Ambang Bonferroni: 0.0167):
  A vs B     : p = 0.0286 -> Tidak Signifikan
  A vs C     : p = 0.0286 -> Tidak Signifikan
  B vs C     : p = 0.0286 -> Tidak Signifikan`},commonPitfalls:["Menyimpulkan pasangan mana yang berbeda hanya berdasarkan hasil signifikan uji omnibus Kruskal-Wallis tanpa uji post-hoc.","Melakukan uji post-hoc berpasangan tanpa menerapkan koreksi inflasi FWER (seperti Bonferroni atau FDR).","Menggunakan Kruskal-Wallis untuk data pengukuran berulang (repeated measures) alih-alih Friedman Test."],validationProcedures:["Pastikan jumlah observasi per kelompok cukup (idealnya n_j >= 5) untuk validitas aproksimasi Chi-Square.","Periksa apakah ada struktur blok atau pengulangan subjek: jika ya, gunakan Friedman Test.","Terapkan koreksi multiple testing wajib pada seluruh perbandingan post-hoc antar-pasangan."],exercises:[{question:"Berapakah derajat kebebasan (degrees of freedom) untuk uji Kruskal-Wallis yang membandingkan performa 5 jenis algoritma optimasi?",hint:"Statistik H mengikuti distribusi Chi-Square dengan df = k - 1.",answerExplanation:"Derajat kebebasan untuk statistik Kruskal-Wallis H yang mengikuti distribusi Chi-Square adalah df = k - 1 = 5 - 1 = 4."}],references:[{citation:"Kruskal, W. H., & Wallis, W. A. (1952). Use of ranks in one-criterion variance analysis. Journal of the American Statistical Association, 47(260), 583-621.",type:"peer-reviewed-article"},{citation:"Friedman, M. (1937). The use of ranks to avoid the assumption of normality implicit in the analysis of variance. Journal of the American Statistical Association, 32(200), 675-701.",type:"peer-reviewed-article"},{citation:"Dunn, O. J. (1964). Multiple comparisons using rank sums. Technometrics, 6(3), 241-252.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Uji Peringkat Multi-Sampel: Kruskal-Wallis H Test dan F...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 3.7.3.","Capaian: Menurunkan statistik Kruskal-Wallis H untuk perbandingan multi-kelompok independen.","Capaian: Menerapkan Friedman Test untuk desain blok acak non-parametrik (repeated measures multi-kondisi).","Capaian: Melakukan prosedur post-hoc Dunn test dengan koreksi multiple testing terintegrasi."],keyFormulaOrDiagram:"$$H = \\frac{12}{N(N + 1)} \\sum_{j=1}^k \\frac{R_j^2}{n_j} - 3(N + 1)$$"},{slideNumber:2,title:"Fondasi Konseptual: Uji Peringkat Multi-Sampel: Kruskal-Wallis H Test dan F...",bulletPoints:["Ketika eksperimen melibatkan lebih dari dua kelompok perlakuan dan data tidak memenuhi asumsi One-Way ANOVA (khususnya normal...","Dalam Kruskal-Wallis Test, seluruh data dari $k$ kelompok independen digabungkan dan diberi peringkat bersama dari 1 hingga $...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Untuk perbandingan multi-kelompok pada pengukuran berulang (repeated measures) atau desain..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Untuk perbandingan multi-kelompok pada pengukuran berulang (repeated measures) atau desain blok teracak (randomized block des...","Jika uji omnibus (Kruskal-Wallis atau Friedman) menghasilkan penolakan terhadap hipotesis nol, peneliti tidak boleh langsung...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["1. Formulasi Statistik Kruskal-Wallis $H$:","Misalkan terdapat $k$ kelompok independen dengan ukuran sampel $n_1, n_2, \\dots, n_k$ dan total sampel $N = \\s...","Seluruh data diberi peringkat gabungan. Misalkan $R_j$ adalah jumlah peringkat untuk kelompok ke-$j$, dan $\\ba..."],keyFormulaOrDiagram:"$$H = \\frac{12}{N(N + 1)} \\sum_{j=1}^k \\frac{R_j^2}{n_j} - 3(N + 1)$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Tiga algoritma pemrosesan citra (A, B, C) diuji pada throughput frame per detik (FPS) dengan n = 4 pengujian per algoritma (N = 12 total): A...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Gabungkan seluruh 12 data dan urutkan naik: 18(C), 19(C), 20(C), 22(C), 24(A), 25(A), 26(A), 28(A),...","Langkah 2: Tentukan peringkat data (tidak ada ties): Kelompok C: peringkat [1, 2, 3, 4] -> R_C = 10, bar{R}_C...","Langkah 3: Hitung statistik H (N = 12, n_A = n_B = n_C = 4): H = [12 / (12 * 13)] * [ (26^2 / 4) + (42^2 / 4)...","Interpretasi: Terdapat perbedaan performa throughput yang signifikan secara statistik di antara ketiga algoritma (H = 9.85, df = 2, p..."],keyFormulaOrDiagram:"Langkah 5: Karena H (9.846) > 5.991, tolak H0."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Implementasi Kruskal-Wallis Test, Friedman Test, dan analisis post-hoc Dunn dengan koreksi Bonferroni.","Dependensi Pustaka: numpy, scipy.stats","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Evaluasi Multi-Sampel Non-Parametrik"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Evaluasi Multi-Sampel Non-Parametrik | Kruskal-Wallis H-Statisti..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menyimpulkan pasangan mana yang berbeda hanya berdasarkan hasil signifikan uji omnibus Kruskal-Wallis tanpa uj...","Perangkap: Melakukan uji post-hoc berpasangan tanpa menerapkan koreksi inflasi FWER (seperti Bonferroni atau FDR).","Perangkap: Menggunakan Kruskal-Wallis untuk data pengukuran berulang (repeated measures) alih-alih Friedman Test."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Pastikan jumlah observasi per kelompok cukup (idealnya n_j >= 5) untuk validitas aproksimasi Chi-Square.","Prosedur: Periksa apakah ada struktur blok atau pengulangan subjek: jika ya, gunakan Friedman Test.","Prosedur: Terapkan koreksi multiple testing wajib pada seluruh perbandingan post-hoc antar-pasangan."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Berapakah derajat kebebasan (degrees of freedom) untuk uji Kruskal-Wallis yang membandingkan performa 5 jenis algoritma...","Petunjuk: Statistik H mengikuti distribusi Chi-Square dengan df = k - 1.","Solusi Kunci: Derajat kebebasan untuk statistik Kruskal-Wallis H yang mengikuti distribusi Chi-Square adalah df = k - 1 = 5 - 1 = 4."]}]},"3.7.4":{id:"3.7.4",chapterId:"CH-22",title:"Uji Permutasi Eksak dan Prosedur Randomisasi Tanpa Asumsi Distribusi",readingTimeMinutes:22,status:"verified",learningObjectives:["Memahami landasan matematis uji permutasi Fisher-Pitman dan prinsip exchangeability di bawah H0.","Membedakan antara uji permutasi eksak kombinatorial dan aproksimasi Monte Carlo.","Mengimplementasikan uji permutasi untuk statistik uji kustom (misal rasio varians, selisih median, trimmed mean)."],content:`Sebagian besar uji statistik parametrik dan non-parametrik klasik bergantung pada distribusi teoritis asimtotik (seperti distribusi normal, Student-t, atau Chi-Square). Namun, ketika ukuran sampel sangat kecil atau struktur data sangat kompleks, aproksimasi asimtotik tersebut dapat meleset jauh dari realitas.

Uji Permutasi (Permutation Test), yang digagas pertama kali oleh Ronald A. Fisher (1935) dan E.J.G. Pitman (1937), mewakili pendekatan inferensi statistik paling murni dan paling elegan. Uji permutasi tidak memerlukan asumsi distribusi teoritis apapun dan tidak memerlukan transformasi peringkat yang membuang informasi magnitudo data. Satu-satunya asumsi fundamental yang dibutuhkan adalah asas keterpetukaran (exchangeability) di bawah hipotesis nol: jika tidak ada perbedaan sejati antara kelompok perlakuan dan kontrol, maka label kelompok dapat dipertukarkan secara acak tanpa mengubah distribusi bersama dari data.

Dalam uji permutasi eksak, seluruh permutasi yang mungkin dari pembagian data ke dalam kelompok dihitung secara kombinatorial. Untuk setiap permutasi, statistik uji dihitung ulang untuk membentuk distribusi permutasi empiris eksak. Nilai p-value eksak kemudian dihitung sebagai proporsi permutasi yang menghasilkan statistik uji yang sama ekstremnya atau lebih ekstrem daripada nilai yang teramati pada eksperimen nyata.

Jika jumlah sampel cukup besar sehingga jumlah permutasi eksak menjadi astronomis (misal $\\binom{40}{20} > 1.37 \\times 10^{11}$), perhitungan eksak digantikan oleh Uji Randomisasi Monte Carlo (Aproksimasi Permutasi). Dengan menarik puluhan ribu sampel acak dari ruang permutasi, nilai p-value dapat diestimasi dengan presisi arbitrer. Keunggulan terbesar dari uji permutasi adalah fleksibilitasnya: peneliti dapat menggunakan statistik uji apapun yang relevan secara fisik (selisih median, selisih trimmed mean, atau rasio persentil).`,mathematicalFoundations:`1. Asumsi Keterpetukaran (Exchangeability):
Di bawah hipotesis nol $H_0: F_X = F_Y$:
Vektor gabungan observasi $\\mathbf{Z} = (X_1, \\dots, X_{n_1}, Y_1, \\dots, Y_{n_2})$ bersifat terpetukarkan:
$$P(\\mathbf{Z} = \\mathbf{z}) = P(\\mathbf{Z} = \\pi(\\mathbf{z}))$$
untuk setiap permutasi $\\pi \\in \\mathcal{S}_N$, di mana $N = n_1 + n_2$.

2. Jumlah Total Partisi Permutasi Eksak:
Jumlah cara membagi $N$ observasi ke dalam dua kelompok berukuran $n_1$ dan $n_2$:
$$K = \\binom{N}{n_1} = \\frac{N!}{n_1! \\, n_2!}$$

3. Perhitungan Nilai p-value Eksak:
Misalkan $T_{\\text{obs}} = T(\\mathbf{X}, \\mathbf{Y})$ adalah statistik uji teramati (misal selisih rata-rata $\\bar{X} - \\bar{Y}$).
Misalkan $T_j$ adalah nilai statistik pada permutasi ke-$j$ ($j = 1, \\dots, K$).
Nilai p-value dua arah eksak:
$$p_{\\text{exact}} = \\frac{1}{K} \\sum_{j=1}^K \\mathbb{I}\\left( |T_j| \\ge |T_{\\text{obs}}| \\right)$$

4. Estimasi Monte Carlo dengan Koreksi Davison-Hinkley:
Jika dilakukan $B$ kali permutasi acak (misal $B = 10,000$):
$$\\hat{p}_{\\text{MC}} = \\frac{1 + \\sum_{b=1}^B \\mathbb{I}\\left( |T_b^*| \\ge |T_{\\text{obs}}| \\right)}{B + 1}$$
Penambahan angka 1 pada pembilang dan penyebut (koreksi Davison-Hinkley) memastikan bahwa $\\hat{p}_{\\text{MC}}$ tidak pernah bernilai 0 dan merupakan estimator unbiased dari probabilitas pengujian.`,workedExample:{problemStatement:"Pada pengujian daya tahan kelelahan siklik material komposit ringan, diuji dua formulasi resin dengan sampel sangat kecil: Formulasi A = [42, 45, 48] (n1 = 3) dan Formulasi B = [31, 33, 35] (n2 = 3). Total N = 6. Hitung uji permutasi eksak untuk selisih rata-rata bar{X}_A - bar{X}_B dan buktikan apakah perbedaannya signifikan secara eksak.",stepByStepSolution:[`Langkah 1: Hitung statistik teramati T_obs:
bar{X}_A = (42 + 45 + 48) / 3 = 135 / 3 = 45.0.
bar{X}_B = (31 + 33 + 35) / 3 = 99 / 3 = 33.0.
T_obs = 45.0 - 33.0 = +12.0.`,"Langkah 2: Hitung total kombinasi partisi eksak: K = binom(6, 3) = 6! / (3! * 3!) = 720 / (6 * 6) = 20 partisi.",`Langkah 3: Tinjau distribusi gabungan: [31, 33, 35, 42, 45, 48].
Jumlah nilai total = 135 + 99 = 234. Rata-rata total = 39.0.`,`Langkah 4: Cari kombinasi 3 elemen yang menghasilkan selisih |T| >= 12.0:
- Kombinasi A paling ekstrem atas: {42, 45, 48} -> rata-rata 45.0, selisih = +12.0 (1 kasus).
- Kombinasi A paling ekstrem bawah: {31, 33, 35} -> rata-rata 33.0, selisih = -12.0 (1 kasus).
- Seluruh 18 kombinasi lainnya memiliki selisih lebih kecil dari 12.0.`,`Langkah 5: Hitung p-value eksak dua arah:
Jumlah kasus dengan |T| >= 12.0 adalah 2 (yaitu +12.0 dan -12.0).
p_exact = 2 / 20 = 0.1000 (10.0%).`],resultInterpretation:"Meskipun seluruh observasi Formulasi A lebih tinggi daripada Formulasi B, pada ukuran sampel n1=3, n2=3, nilai p-value minimum yang mungkin dicapai adalah 2/20 = 0.100. Oleh karena itu, hipotesis nol tidak dapat ditolak pada alpha = 0.05. Eksperimen membutuhkan penambahan ukuran sampel."},pythonImplementation:{description:"Implementasi Uji Permutasi Eksak dan Aproksimasi Monte Carlo menggunakan SciPy.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

grup_a = np.array([42, 45, 48])
grup_b = np.array([31, 33, 35])

def selisih_rata_rata(x, y, axis=0):
    return np.mean(x, axis=axis) - np.mean(y, axis=axis)

res_exact = stats.permutation_test(
    (grup_a, grup_b),
    statistic=selisih_rata_rata,
    permutation_type='independent',
    vectorized=True,
    n_resamples=np.inf,
    alternative='two-sided'
)

res_mc = stats.permutation_test(
    (grup_a, grup_b),
    statistic=selisih_rata_rata,
    permutation_type='independent',
    vectorized=True,
    n_resamples=10000,
    alternative='two-sided',
    random_state=42
)

print("[SIMULASI/SYNTHETIC DATA] Uji Permutasi Eksak vs Monte Carlo")
print(f"Statistik Teramati (T_obs) : {res_exact.statistic:.4f}")
print(f"Nilai p-value Eksak        : {res_exact.pvalue:.4f}")
print(f"Nilai p-value Monte Carlo  : {res_mc.pvalue:.4f}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Uji Permutasi Eksak vs Monte Carlo
Statistik Teramati (T_obs) : 12.0000
Nilai p-value Eksak        : 0.1000
Nilai p-value Monte Carlo  : 0.1000`},commonPitfalls:["Menghitung p-value Monte Carlo tanpa menyertakan pengamatan asli (koreksi +1), sehingga berisiko menghasilkan p-value = 0 yang secara filosofis salah.","Menerapkan uji permutasi ketika asumsi keterpetukaran (exchangeability) dilanggar, misalnya pada data deret waktu yang memiliki autokorelasi.","Mengira bahwa uji permutasi dapat mengatasi kelemahan ukuran sampel yang sangat kecil (seperti ditunjukkan di atas, n=3 per grup tidak akan pernah bisa mencapai p < 0.05)."],validationProcedures:["Verifikasi asumsi keterpetukaran: pastikan tidak ada dependensi serial atau struktur klaster yang diabaikan.","Pilih statistik uji yang mencerminkan pertanyaan saintifik secara langsung (mean, median, rasio).","Gunakan minimal 10,000 resamples untuk aproksimasi Monte Carlo agar galat estimasi p-value < 0.005."],exercises:[{question:"Pada uji permutasi dua arah dengan dua kelompok berukuran n1 = 3 dan n2 = 3, berapakah nilai p-value minimum teoritis yang dapat dihasilkan?",hint:"Hitung total kombinasi partisi K = 6! / (3! * 3!) dan jumlah titik paling ekstrem.",answerExplanation:"Total kombinasi partisi adalah 6! / (3! * 3!) = 20. Karena uji dua arah memiliki minimal 2 titik paling ekstrem (satu positif dan satu negatif), p-value minimum adalah 2 / 20 = 0.100."}],references:[{citation:"Fisher, R. A. (1935). The Design of Experiments. Oliver and Boyd.",type:"canonical-textbook"},{citation:"Pitman, E. J. G. (1937). Significance tests which may be applied to samples from any populations. Supplement to the Journal of the Royal Statistical Society, 4(1), 119-130.",type:"peer-reviewed-article"},{citation:"Davison, A. C., & Hinkley, D. V. (1997). Bootstrap Methods and their Application. Cambridge University Press.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Uji Permutasi Eksak dan Prosedur Randomisasi Tanpa Asum...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 3.7.4.","Capaian: Memahami landasan matematis uji permutasi Fisher-Pitman dan prinsip exchangeability di bawah H0.","Capaian: Membedakan antara uji permutasi eksak kombinatorial dan aproksimasi Monte Carlo.","Capaian: Mengimplementasikan uji permutasi untuk statistik uji kustom (misal rasio varians, selisih median, trimmed mea..."],keyFormulaOrDiagram:"$$P(\\mathbf{Z} = \\mathbf{z}) = P(\\mathbf{Z} = \\pi(\\mathbf{z}))$$"},{slideNumber:2,title:"Fondasi Konseptual: Uji Permutasi Eksak dan Prosedur Randomisasi Tanpa Asum...",bulletPoints:["Sebagian besar uji statistik parametrik dan non-parametrik klasik bergantung pada distribusi teoritis asimtotik (seperti dist...","Uji Permutasi (Permutation Test), yang digagas pertama kali oleh Ronald A. Fisher (1935) dan E.J.G. Pitman (1937), mewakili p...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Dalam uji permutasi eksak, seluruh permutasi yang mungkin dari pembagian data ke dalam kel..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Dalam uji permutasi eksak, seluruh permutasi yang mungkin dari pembagian data ke dalam kelompok dihitung secara kombinatorial...","Jika jumlah sampel cukup besar sehingga jumlah permutasi eksak menjadi astronomis (misal $\\binom{40}{20} > 1.37 \\times 10^{11...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["1. Asumsi Keterpetukaran (Exchangeability):","Di bawah hipotesis nol $H_0: F_X = F_Y$:","Vektor gabungan observasi $\\mathbf{Z} = (X_1, \\dots, X_{n_1}, Y_1, \\dots, Y_{n_2})$ bersifat terpetukarkan:"],keyFormulaOrDiagram:"$$P(\\mathbf{Z} = \\mathbf{z}) = P(\\mathbf{Z} = \\pi(\\mathbf{z}))$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Pada pengujian daya tahan kelelahan siklik material komposit ringan, diuji dua formulasi resin dengan sampel sangat kecil: Formulasi A = [42...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung statistik teramati T_obs: bar{X}_A = (42 + 45 + 48) / 3 = 135 / 3 = 45.0. bar{X}_B = (31 + 3...","Langkah 2: Hitung total kombinasi partisi eksak: K = binom(6, 3) = 6! / (3! * 3!) = 720 / (6 * 6) = 20 partisi...","Langkah 3: Tinjau distribusi gabungan: [31, 33, 35, 42, 45, 48]. Jumlah nilai total = 135 + 99 = 234. Rata-rat...","Interpretasi: Meskipun seluruh observasi Formulasi A lebih tinggi daripada Formulasi B, pada ukuran sampel n1=3, n2=3, nilai p-value m..."],keyFormulaOrDiagram:"Langkah 5: Hitung p-value eksak dua arah: Jumlah kasus dengan |T| >= 12.0 adalah 2 (yaitu..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Implementasi Uji Permutasi Eksak dan Aproksimasi Monte Carlo menggunakan SciPy.","Dependensi Pustaka: numpy, scipy.stats","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Uji Permutasi Eksak vs Monte Carlo"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Uji Permutasi Eksak vs Monte Carlo | Statistik Teramati (T_obs)..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menghitung p-value Monte Carlo tanpa menyertakan pengamatan asli (koreksi +1), sehingga berisiko menghasilkan...","Perangkap: Menerapkan uji permutasi ketika asumsi keterpetukaran (exchangeability) dilanggar, misalnya pada data deret wa...","Perangkap: Mengira bahwa uji permutasi dapat mengatasi kelemahan ukuran sampel yang sangat kecil (seperti ditunjukkan di..."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Verifikasi asumsi keterpetukaran: pastikan tidak ada dependensi serial atau struktur klaster yang diabaikan.","Prosedur: Pilih statistik uji yang mencerminkan pertanyaan saintifik secara langsung (mean, median, rasio).","Prosedur: Gunakan minimal 10,000 resamples untuk aproksimasi Monte Carlo agar galat estimasi p-value < 0.005."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Pada uji permutasi dua arah dengan dua kelompok berukuran n1 = 3 dan n2 = 3, berapakah nilai p-value minimum teoritis ya...","Petunjuk: Hitung total kombinasi partisi K = 6! / (3! * 3!) dan jumlah titik paling ekstrem.","Solusi Kunci: Total kombinasi partisi adalah 6! / (3! * 3!) = 20. Karena uji dua arah memiliki minimal 2 titik paling ekstrem (satu po..."]}]}};export{a as CH22_LESSONS};
