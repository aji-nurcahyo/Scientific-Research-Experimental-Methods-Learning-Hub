const a={"4.8.1":{id:"4.8.1",chapterId:"CH-31",title:"Randomized Complete Block Design (RCBD) dan Incomplete Block Design",readingTimeMinutes:20,status:"verified",learningObjectives:["Merancang Randomized Complete Block Design (RCBD) untuk mengontrol satu sumber gangguan homogen.","Memahami keterbatasan kapasitas blok dan formulasi Balanced Incomplete Block Design (BIBD).","Menganalisis tabel ANOVA dua arah tanpa interaksi untuk desain terblokir."],content:`Dalam eksperimen rekayasa, variabel gangguan (nuisance variables) adalah faktor-faktor yang diketahui mempengaruhi respon, namun bukan merupakan fokus utama dari penyelidikan ilmiah. Jika variabel gangguan ini diabaikan dan eksperimen dijalankan menggunakan Completely Randomized Design (CRD), variabilitas dari gangguan tersebut akan terserap ke dalam galat eksperimental (MSE), menenggelamkan signifikansi efek perlakuan yang sebenarnya nyata.

Randomized Complete Block Design (RCBD):
RCBD adalah strategi baku untuk mengontrol satu sumber variasi gangguan yang dapat diidentifikasi (seperti perbedaan batch material, teknisi penguji, atau hari pelaksanaan). Karakteristik RCBD:
1. Kata "Complete" (Lengkap) berarti setiap blok menerima seluruh perlakuan secara lengkap tepat satu kali (ukuran blok b = jumlah perlakuan a).
2. Kata "Randomized" (Teracak) berarti urutan alokasi perlakuan di dalam setiap blok diacak secara independen.
3. Model RCBD mengasumsikan tidak adanya interaksi antara perlakuan dan blok (efek aditif murni).

Balanced Incomplete Block Design (BIBD):
Dalam situasi fisik tertentu, ukuran blok yang tersedia secara alami lebih kecil daripada jumlah perlakuan yang ingin diuji (k < a). Misalnya, sebuah mesin uji keausan hanya memiliki 3 slot pengujian (k = 3), padahal peneliti ingin membandingkan 4 jenis pelumas (a = 4). Solusi matematisnya adalah Balanced Incomplete Block Design (BIBD). Dalam BIBD, setiap pasang perlakuan muncul bersama-sama di dalam blok yang sama sebanyak lambda kali yang konstan, mempertahankan perbandingan yang seimbang dan tidak bias.`,mathematicalFoundations:`1. Formulasi Model RCBD (Aditif Tanpa Interaksi):
$$y_{ij} = \\mu + \\tau_i + \\beta_j + \\epsilon_{ij}, \\quad i = 1, \\dots, a; \\; j = 1, \\dots, b$$
di mana:
- $\\tau_i$ adalah efek perlakuan ke-$i$ ($\\sum \\tau_i = 0$).
- $\\beta_j$ adalah efek blok ke-$j$ ($\\sum \\beta_j = 0$).
- $\\epsilon_{ij} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$.

2. Dekomposisi Jumlah Kuadrat RCBD:
$$\\text{SST} = \\text{SS}_{\\text{Treatment}} + \\text{SS}_{\\text{Block}} + \\text{SSE}$$
Derajat kebebasan:
$$(ab - 1) = (a - 1) + (b - 1) + (a - 1)(b - 1)$$
Statistik Uji Perlakuan:
$$F = \\frac{\\text{MS}_{\\text{Treatment}}}{\\text{MSE}} = \\frac{\\text{SS}_{\\text{Treatment}} / (a - 1)}{\\text{SSE} / [(a - 1)(b - 1)]} \\sim F_{a-1, \\, (a-1)(b-1)}$$

3. Kondisi Keseimbangan Parameter BIBD:
- $a$: Jumlah perlakuan total.
- $b$: Jumlah blok total.
- $k$: Ukuran per blok ($k < a$).
- $r$: Replikasi per perlakuan di seluruh blok ($r < b$).
- Relasi total observasi: $N = a r = b k$.
- Parameter frekuensi kemunculan berpasangan $\\lambda$:
$$\\lambda = \\frac{r(k - 1)}{a - 1}$$
Nilai $\\lambda$ wajib berupa bilangan bulat positif.`,workedExample:{problemStatement:"Seorang peneliti ingin membandingkan a = 4 formulasi katalis menggunakan reaktor yang hanya memiliki kapasitas k = 3 tabung per batch (blok). Rencanakan desain BIBD: hitung jumlah replikasi r, jumlah blok b, dan frekuensi perpasangan lambda.",stepByStepSolution:["Langkah 1: Identifikasi parameter yang diberikan: a = 4 perlakuan, k = 3 ukuran blok (k < a).",`Langkah 2: Tentukan nilai r dan b terkecil yang memenuhi relasi N = a*r = b*k dan lambda bulat:
lambda = r*(k - 1) / (a - 1) = r*(3 - 1) / (4 - 1) = 2r / 3.`,"Langkah 3: Agar lambda berupa bilangan bulat positif, nilai r terkecil adalah kelipatan 3, yaitu r = 3.",`Langkah 4: Hitung parameter lainnya:
- lambda = 2 * (3) / 3 = 2 (setiap pasang katalis akan bertemu bersama di dalam blok sebanyak 2 kali).
- Total observasi: N = a * r = 4 * 3 = 12.
- Jumlah blok: b = N / k = 12 / 3 = 4 blok.`,`Langkah 5: Susun 4 blok BIBD:
Blok 1: {A, B, C}
Blok 2: {A, B, D}
Blok 3: {A, C, D}
Blok 4: {B, C, D}.`],resultInterpretation:"Desain BIBD berhasil dirancang dengan b = 4 blok, r = 3 replikasi per katalis, dan lambda = 2. Setiap pasang katalis (misal A dan B, A dan C, dll) muncul bersama di 2 blok yang berbeda, menjamin perbandingan efisiensi katalis yang seimbang dan adil."},pythonImplementation:{description:"Implementasi analisis ANOVA untuk Randomized Complete Block Design (RCBD) menggunakan statsmodels.",libraryDependencies:["numpy","pandas","statsmodels"],code:`import numpy as np
import pandas as pd
import statsmodels.api as sm
from statsmodels.formula.api import ols

np.random.seed(42)

# 3 perlakuan (a = 3), 4 blok operator (b = 4)
perlakuan = ['Katalis_1', 'Katalis_2', 'Katalis_3']
blok = ['Operator_A', 'Operator_B', 'Operator_C', 'Operator_D']

df_list = []
efek_blok = {'Operator_A': 0, 'Operator_B': 5, 'Operator_C': -3, 'Operator_D': 8}
efek_perlakuan = {'Katalis_1': 50, 'Katalis_2': 65, 'Katalis_3': 45}

for b_name in blok:
    for p_name in perlakuan:
        mu = efek_perlakuan[p_name] + efek_blok[b_name]
        y = mu + np.random.normal(0, 1.5)
        df_list.append({'Perlakuan': p_name, 'Blok': b_name, 'Yield': y})

df_rcbd = pd.DataFrame(df_list)

# Model RCBD aditif: Yield ~ Perlakuan + Blok (tanpa suku interaksi)
model_rcbd = ols('Yield ~ C(Perlakuan) + C(Blok)', data=df_rcbd).fit()
anova_table = sm.stats.anova_lm(model_rcbd, typ=2)

print("[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Randomized Complete Block Design (RCBD)")
print(anova_table[['sum_sq', 'df', 'F', 'PR(>F)']])
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Randomized Complete Block Design (RCBD)
                   sum_sq   df           F        PR(>F)
C(Perlakuan)   876.439589  2.0  275.589832  2.167098e-06
C(Blok)        247.962095  3.0   51.986877  1.077271e-04
Residual         9.540788  6.0         NaN           NaN`},commonPitfalls:["Menyertakan suku interaksi antara perlakuan dan blok pada RCBD standar (pada n=1 per sel, tidak ada derajat kebebasan yang tersisa untuk mengestimasi galat jika interaksi disertakan).","Lupa mengacak urutan perlakuan di dalam masing-masing blok.","Menggunakan CRD padahal variabilitas antar-blok sangat besar, sehingga memicu hilangnya signifikansi statistik."],validationProcedures:["Pastikan unit di dalam satu blok bersifat homogen dan variabilitas antar-blok dapat diidentifikasi.","Verifikasi asumsi aditivitas (uji non-aditivitas Tukey untuk interaksi perlakuan-blok).","Gunakan BIBD jika kapasitas fisik blok tidak mampu menampung seluruh perlakuan secara serentak."],exercises:[{question:"Pada eksperimen RCBD dengan a = 4 perlakuan dan b = 5 blok, berapakah derajat kebebasan untuk komponen galat residual (SSE)?",hint:"Derajat kebebasan galat pada RCBD dihitung sebagai df_E = (a - 1)(b - 1).",answerExplanation:"Derajat kebebasan galat residual RCBD adalah df_E = (a - 1)(b - 1) = (4 - 1)(5 - 1) = 3 * 4 = 12."}],references:[{citation:"Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",type:"canonical-textbook"},{citation:"Cox, D. R. (1958). Planning of Experiments. John Wiley & Sons.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Randomized Complete Block Design (RCBD)",bulletPoints:["Mengontrol satu sumber gangguan homogen yang dapat diidentifikasi.","Complete: Setiap blok memuat seluruh perlakuan tepat satu kali.","Randomized: Urutan perlakuan di dalam blok diacak murni."],keyFormulaOrDiagram:"$$y_{ij} = \\mu + \\tau_i + \\beta_j + \\epsilon_{ij}$$"},{slideNumber:2,title:"Balanced Incomplete Block Design (BIBD)",bulletPoints:["Digunakan ketika ukuran blok fisik k lebih kecil dari jumlah perlakuan a (k < a).","Keseimbangan: Setiap pasang perlakuan muncul bersama sebanyak lambda kali.","Mempertahankan perbandingan ortogonal dan tak bias tanpa kehilangan efisiensi."],keyFormulaOrDiagram:"$$\\lambda = \\frac{r(k - 1)}{a - 1} \\in \\mathbb{Z}^+$$"}]},"4.8.2":{id:"4.8.2",chapterId:"CH-31",title:"Latin Square dan Graeco-Latin Square untuk Mengontrol Dua Variabel Gangguan Simultan",readingTimeMinutes:20,status:"verified",learningObjectives:["Merancang Desain Bujursangkar Latin (Latin Square Design) untuk mengontrol dua sumber gangguan ortogonal simultan.","Memahami aturan ortogonalitas baris, kolom, dan huruf perlakuan (p x p grid).","Mengembangkan desain ke Graeco-Latin Square untuk mengontrol tiga sumber gangguan sekaligus."],content:`Dalam banyak situasi pengujian rekayasa, eksperimen menghadapi dua sumber gangguan sekaligus yang beroperasi secara independen. Contoh klasik:
- Pengujian emisi bahan bakar pada mesin mobil, di mana dua sumber variabilitas gangguan yang diketahui adalah: (1) Perbedaan operator pengemudi (baris), dan (2) Hari pengujian atau urutan rotasi kendaraan (kolom).
- Pembandingan algoritma pada platform komputasi awan, di mana dua gangguan adalah: (1) Node pemrosesan fisik, dan (2) Waktu beban trafik jaringan puncak harian.

Jika digunakan desain faktorial penuh untuk mengontrol kedua gangguan tersebut bersama faktor perlakuan, jumlah run eksperimen akan meledak menjadi sangat besar (p^3 run). Solusi matematis paling brilian untuk masalah ini adalah Desain Bujursangkar Latin (Latin Square Design).

Prinsip Latin Square:
Desain Latin Square berukuran p x p memungkinkan pengujian p perlakuan (dilambangkan dengan huruf Latin A, B, C, D) sambil mengontrol secara simultan dua variabel gangguan (baris berukuran p dan kolom berukuran p) hanya dalam p^2 run pengujian (jauh lebih hemat daripada p^3 run). Aturan mutlak Latin Square adalah: setiap huruf perlakuan harus muncul tepat satu kali di setiap baris dan tepat satu kali di setiap kolom (seperti aturan teka-teki Sudoku).

Graeco-Latin Square:
Jika terdapat tiga sumber gangguan simultan, desain dapat diperluas menjadi Graeco-Latin Square dengan menumpangkan huruf Yunani (alpha, beta, gamma) di atas huruf Latin secara ortogonal.`,mathematicalFoundations:`1. Formulasi Model Statistik Latin Square Design ($p \\times p$):
$$y_{ijk} = \\mu + \\alpha_i + \\beta_j + \\tau_k + \\epsilon_{ijk}, \\quad i, j, k = 1, \\dots, p$$
di mana:
- $\\alpha_i$ adalah efek baris gangguan ke-$i$ ($\\sum \\alpha_i = 0$).
- $\\beta_j$ adalah efek kolom gangguan ke-$j$ ($\\sum \\beta_j = 0$).
- $\\tau_k$ adalah efek perlakuan ke-$k$ ($\\sum \\tau_k = 0$).
- $\\epsilon_{ijk} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$.
- Model mengasumsikan efek aditif sempurna tanpa interaksi antara baris, kolom, dan perlakuan.

2. Dekomposisi Jumlah Kuadrat Latin Square:
$$\\text{SST} = \\text{SS}_{\\text{Row}} + \\text{SS}_{\\text{Column}} + \\text{SS}_{\\text{Treatment}} + \\text{SSE}$$
Derajat kebebasan total adalah $N - 1 = p^2 - 1$:
$$(p^2 - 1) = (p - 1) + (p - 1) + (p - 1) + (p - 1)(p - 2)$$
Perhatikan derajat kebebasan galat:
$$\\text{df}_{\\text{error}} = (p - 1)(p - 2)$$
Untuk $p = 3$, $\\text{df}_{\\text{error}} = (2)(1) = 2$ (sangat kecil). Oleh karena itu, Latin Square umumnya direkomendasikan untuk $p \\ge 4$ atau direplikasi.

3. Statistik Uji F untuk Perlakuan:
$$F = \\frac{\\text{MS}_{\\text{Treatment}}}{\\text{MSE}} = \\frac{\\text{SS}_{\\text{Treatment}} / (p - 1)}{\\text{SSE} / [(p - 1)(p - 2)]} \\sim F_{p-1, \\, (p-1)(p-2)}$$`,workedExample:{problemStatement:"Seorang insinyur ingin membandingkan p = 4 jenis ban mobil (A, B, C, D) terhadap laju keausan. Dua variabel gangguan yang dikontrol adalah: 4 Posisi Roda (Depan Kiri, Depan Kanan, Belakang Kiri, Belakang Kanan) dan 4 Mobil Uji. Rancang grid Latin Square 4x4 dan hitung derajat kebebasan galatnya.",stepByStepSolution:["Langkah 1: Identifikasi parameter: p = 4 perlakuan, Baris = 4 Mobil, Kolom = 4 Posisi Roda.",`Langkah 2: Susun grid Latin Square 4x4 standar:
Baris 1 (Mobil 1): [A, B, C, D]
Baris 2 (Mobil 2): [B, C, D, A]
Baris 3 (Mobil 3): [C, D, A, B]
Baris 4 (Mobil 4): [D, A, B, C].
Verifikasi: Setiap huruf ban (A, B, C, D) muncul tepat satu kali di tiap baris mobil dan tepat satu kali di tiap kolom posisi roda.`,"Langkah 3: Hitung total run: N = p^2 = 4^2 = 16 run (jauh lebih hemat daripada 4^3 = 64 run).",`Langkah 4: Hitung derajat kebebasan galat:
df_error = (p - 1)(p - 2) = (4 - 1)(4 - 2) = 3 * 2 = 6.`],resultInterpretation:"Desain Latin Square 4x4 berhasil mengontrol variabilitas antar-mobil dan variabilitas posisi roda secara simultan hanya dengan 16 run pengujian dengan df galat = 6, menghasilkan efisiensi eksperimen 400% lebih tinggi dibanding desain faktorial penuh."},pythonImplementation:{description:"Analisis ANOVA Latin Square 4x4 untuk mengontrol dua sumber variasi gangguan simultan.",libraryDependencies:["numpy","pandas","statsmodels"],code:`import numpy as np
import pandas as pd
import statsmodels.api as sm
from statsmodels.formula.api import ols

np.random.seed(42)
p = 4

# Susunan Latin Square 4x4
latin_grid = np.array([
    ['A', 'B', 'C', 'D'],
    ['B', 'C', 'D', 'A'],
    ['C', 'D', 'A', 'B'],
    ['D', 'A', 'B', 'C']
])

baris_list = []
efek_baris = [10, 15, 8, 12]     # Gangguan Mobil
efek_kolom = [5, 2, 7, 4]        # Gangguan Posisi Roda
efek_perlakuan = {'A': 50, 'B': 62, 'C': 48, 'D': 70} # Respon Ban

for r in range(p):
    for c in range(p):
        treat = latin_grid[r, c]
        mu = efek_perlakuan[treat] + efek_baris[r] + efek_kolom[c]
        y = mu + np.random.normal(0, 1.2)
        baris_list.append({
            'Mobil': f'Mobil_{r+1}',
            'Posisi': f'Posisi_{c+1}',
            'Ban': treat,
            'Keausan': y
        })

df_ls = pd.DataFrame(baris_list)

# Model Latin Square aditif: Keausan ~ Ban + Mobil + Posisi
model = ols('Keausan ~ C(Ban) + C(Mobil) + C(Posisi)', data=df_ls).fit()
anova_table = sm.stats.anova_lm(model, typ=2)

print("[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Latin Square Design 4x4")
print(anova_table[['sum_sq', 'df', 'F', 'PR(>F)']])
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Tabel ANOVA Latin Square Design 4x4
                 sum_sq   df           F        PR(>F)
C(Ban)      1354.214732  3.0  359.206268  1.107086e-06
C(Mobil)     102.438514  3.0   27.171899  7.127883e-04
C(Posisi)     54.896748  3.0   14.561338  3.896281e-03
Residual       7.540209  6.0         NaN           NaN`},commonPitfalls:["Menerapkan Latin Square ketika dicurigai ada interaksi kuat antara baris dan kolom atau antara perlakuan dan gangguan (asumsi aditivitas runtuh).","Menggunakan Latin Square ukuran 3x3 tanpa replikasi (df galat hanya 2, uji statistik menjadi sangat lemah).","Tidak mengacak urutan baris, kolom, dan penetapan label huruf sebelum eksperimen dijalankan."],validationProcedures:["Verifikasi bahwa setiap perlakuan muncul tepat satu kali di setiap baris dan setiap kolom.","Pastikan ukuran perlakuan sama persis dengan jumlah level kedua variabel gangguan (harus berupa matriks bujursangkar p x p).","Jika p <= 4, pertimbangkan mereplikasi bujursangkar Latin untuk meningkatkan derajat kebebasan galat."],exercises:[{question:"Berapakah derajat kebebasan galat residual untuk sebuah Desain Bujursangkar Latin tunggal berukuran 5x5 (p = 5)?",hint:"Gunakan formula derajat kebebasan galat Latin Square: df_E = (p - 1)(p - 2).",answerExplanation:"Derajat kebebasan galat adalah df_E = (p - 1)(p - 2) = (5 - 1)(5 - 2) = 4 * 3 = 12."}],references:[{citation:"Fisher, R. A. (1935). The Design of Experiments. Oliver and Boyd.",type:"canonical-textbook"},{citation:"Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Desain Bujursangkar Latin (p x p)",bulletPoints:["Mengontrol dua variabel gangguan independen secara simultan.","Format p x p: Baris (Gangguan 1), Kolom (Gangguan 2), Huruf (Perlakuan).","Aturan: Setiap huruf muncul tepat satu kali di tiap baris dan kolom."],keyFormulaOrDiagram:"$$N = p^2 \\ll p^3 \\quad (\\text{Hemat 75%+ run})$$"},{slideNumber:2,title:"Dekomposisi ANOVA Latin Square",bulletPoints:["SST = SS_Row + SS_Column + SS_Treatment + SSE.","Derajat kebebasan galat: df_E = (p - 1)(p - 2).","Graeco-Latin Square: Menambahkan huruf Yunani untuk 3 gangguan sekaligus."]}]},"4.8.3":{id:"4.8.3",chapterId:"CH-31",title:"Desain Split-Plot untuk Faktor yang Sulit Diubah (Hard-to-Change Factors)",readingTimeMinutes:22,status:"verified",learningObjectives:["Mengidentifikasi kendala logistik faktor yang sulit diubah (hard-to-change factors) dalam industri.","Memahami struktur dua tingkat pengacakan: Whole Plot (faktor makro) dan Sub-Plot (faktor mikro).","Menghitung dan membedakan dua komponen galat residual yang berbeda: Error A dan Error B."],content:`Dalam eksperimen faktorial standar, diasumsikan bahwa seluruh kombinasi perlakuan dapat diacak urutannya secara bebas dan independen murni. Namun, dalam industri manufaktur, metalurgi, pertanian, dan pemrosesan kimia, asumsi ini sering kali mustahil dipenuhi secara praktis akibat adanya Faktor yang Sulit Diubah (Hard-to-Change Factors).

Contoh Kendala Fisik:
Sebuah eksperimen menguji pengaruh Suhu Tungku Pembakaran (Furnace Temperature: 800 C vs 1000 C) dan Waktu Penahanan (Holding Time: 15 menit vs 30 menit) terhadap kekerasan paduan logam. Mengubah suhu tungku pembakaran dari 800 C ke 1000 C membutuhkan waktu 6 jam pemanasan, dan mendinginkannya kembali membutuhkan waktu 12 jam. Mengacak urutan suhu secara murni setiap kali uji coba akan memakan waktu berbulan-bulan dan biaya energi yang sangat boros. Suhu tungku adalah faktor yang sulit diubah (Hard-to-Change / Whole-Plot factor), sedangkan waktu penahanan spesimen logam adalah faktor yang mudah diubah (Easy-to-Change / Sub-Plot factor).

Struktur Desain Split-Plot:
Untuk mengatasi kendala fisik ini secara elegan dan jujur, digunakan Desain Split-Plot:
1. Whole Plot: Tingkat perlakuan makro (misal suhu tungku) diatur pada satu level tetap, membentuk satu "plot utama".
2. Sub-Plot: Di dalam setiap plot utama tersebut, seluruh level dari faktor yang mudah diubah (misal waktu penahanan) dieksekusi secara teracak.

Konsekuensi Statistika Krusial:
Desain Split-Plot memiliki Dua Suku Galat Residual yang Berbeda:
- Galat Plot Utama (Whole-Plot Error, Error A): Digunakan sebagai penyebut untuk menguji faktor yang sulit diubah. Karena ukuran replikasi whole plot sedikit, uji untuk faktor sulit ini memiliki kekuatan statistik yang lebih rendah.
- Galat Sub-Plot (Sub-Plot Error, Error B): Digunakan sebagai penyebut untuk menguji faktor yang mudah diubah dan efek interaksinya. Uji ini memiliki derajat kebebasan lebih banyak dan kekuatan statistik yang sangat tinggi.`,mathematicalFoundations:`1. Formulasi Model Statistik Split-Plot:
$$y_{ijk} = \\mu + \\rho_i + \\alpha_j + \\eta_{ij} + \\beta_k + (\\alpha\\beta)_{jk} + \\epsilon_{ijk}$$
di mana:
- $\\rho_i$ adalah efek blok/replikasi ke-$i$ ($i = 1, \\dots, r$).
- $\\alpha_j$ adalah efek faktor Whole-Plot (Hard-to-Change) ke-$j$ ($j = 1, \\dots, a$).
- $\\eta_{ij} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma_{\\text{whole}}^2)$ adalah Galat Whole-Plot (**Error A**).
- $\\beta_k$ adalah efek faktor Sub-Plot (Easy-to-Change) ke-$k$ ($k = 1, \\dots, b$).
- $(\\alpha\\beta)_{jk}$ adalah efek interaksi Whole-Plot x Sub-Plot.
- $\\epsilon_{ijk} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma_{\\text{sub}}^2)$ adalah Galat Sub-Plot (**Error B**).

2. Dua Statistik Uji F Terpisah pada Tabel ANOVA:
- Untuk Faktor Whole-Plot $A$:
$$F_A = \\frac{\\text{MS}_A}{\\text{MS}_{\\text{Error A}}} \\sim F_{a-1, \\, (r-1)(a-1)}$$
- Untuk Faktor Sub-Plot $B$ dan Interaksi $AB$:
$$F_B = \\frac{\\text{MS}_B}{\\text{MS}_{\\text{Error B}}} \\sim F_{b-1, \\, a(r-1)(b-1)}$$
$$F_{AB} = \\frac{\\text{MS}_{AB}}{\\text{MS}_{\\text{Error B}}} \\sim F_{(a-1)(b-1), \\, a(r-1)(b-1)}$$
Perhatikan bahwa pengujian sub-plot diuji terhadap $\\text{MS}_{\\text{Error B}}$ yang umumnya jauh lebih kecil daripada $\\text{MS}_{\\text{Error A}}$.`,workedExample:{problemStatement:`Pada pengujian perlakuan panas baja, Faktor A (Suhu Tungku: 2 level, Hard-to-change) dan Faktor B (Media Pendingin: 3 level, Easy-to-change) diuji dengan r = 3 blok replikasi (total N = 18). Dari analisis ANOVA diperoleh:
MS_A = 120.0, MS_ErrorA = 15.0
MS_B = 80.0, MS_AB = 40.0, MS_ErrorB = 4.0
Hitung statistik F untuk Faktor A, Faktor B, dan Interaksi AB dengan penyebut galat yang tepat.`,stepByStepSolution:[`Langkah 1: Identifikasi derajat kebebasan dan pasang penyebut galat yang tepat:
- Faktor A (Whole plot): df_A = a - 1 = 2 - 1 = 1.
  Penyebut: Error A dengan df = (r - 1)(a - 1) = (3 - 1)(2 - 1) = 2.
- Faktor B (Sub plot): df_B = b - 1 = 3 - 1 = 2.
  Penyebut: Error B dengan df = a(r - 1)(b - 1) = 2(2)(2) = 8.
- Interaksi AB: df_AB = (a - 1)(b - 1) = (1)(2) = 2.
  Penyebut: Error B (df = 8).`,`Langkah 2: Hitung F untuk Faktor A (Suhu Tungku):
F_A = MS_A / MS_ErrorA = 120.0 / 15.0 = 8.00 (df1 = 1, df2 = 2).
Nilai kritis F_(0.05, 1, 2) = 18.51 -> Tidak Signifikan.`,`Langkah 3: Hitung F untuk Faktor B (Media Pendingin):
F_B = MS_B / MS_ErrorB = 80.0 / 4.0 = 20.00 (df1 = 2, df2 = 8).
Nilai kritis F_(0.05, 2, 8) = 4.46 -> Sangat Signifikan (p < 0.001).`,`Langkah 4: Hitung F untuk Interaksi AB:
F_AB = MS_AB / MS_ErrorB = 40.0 / 4.0 = 10.00 (df1 = 2, df2 = 8).
Nilai kritis F_(0.05, 2, 8) = 4.46 -> Sangat Signifikan (p = 0.007).`],resultInterpretation:"Penyebut galat yang berbeda sangat menentukan keputusan inferensi. Faktor B dan interaksi AB diuji terhadap Error B (MSE = 4.0) dan terbukti sangat signifikan. Jika peneliti keliru menganalisisnya sebagai faktorial standar menggunakan gabungan galat, p-value untuk faktor A akan terbias palsu."},pythonImplementation:{description:"Pemodelan analisis split-plot dua tingkat galat menggunakan MixedLM statsmodels.",libraryDependencies:["numpy","pandas","statsmodels"],code:`import numpy as np
import pandas as pd
import statsmodels.formula.api as smf

np.random.seed(42)
r_rep = 4  # 4 replikasi blok
a_levels = ['Temp_800', 'Temp_1000']  # Hard to change (Whole Plot)
b_levels = ['Med_Air', 'Med_Minyak', 'Med_Polimer']  # Easy to change (Sub Plot)

data_list = []
for rep in range(r_rep):
    for a in a_levels:
        # Galat Whole Plot (Error A) untuk tiap setting tungku
        error_a = np.random.normal(0, 3.0)
        for b in b_levels:
            # Respon fisik + Error Subplot (Error B)
            mu = (100 if a == 'Temp_1000' else 80) + (15 if b == 'Med_Air' else 5)
            y = mu + error_a + np.random.normal(0, 1.5)
            data_list.append({
                'Replikasi': f'Rep_{rep+1}',
                'WholePlotID': f'WP_{rep+1}_{a}',
                'Suhu': a,
                'Media': b,
                'Kekerasan': y
            })

df_sp = pd.DataFrame(data_list)

# Analisis Split-Plot via Linear Mixed Model
# WholePlotID bertindak sebagai Random Intercept untuk menangkap Error A
model_sp = smf.mixedlm("Kekerasan ~ C(Suhu) + C(Media) + C(Suhu):C(Media)", 
                       df_sp, 
                       groups=df_sp["WholePlotID"]).fit()

print("[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model Split-Plot (MixedLM)")
print(f"Varians Error A (Whole-Plot) : {float(np.asarray(model_sp.cov_re)[0, 0]):.4f} (Sejati: 9.00)")
print(f"Varians Error B (Sub-Plot)   : {float(model_sp.scale):.4f} (Sejati: 2.25)")
print(f"Efek Suhu (Hard-to-Change)   : {model_sp.params['C(Suhu)[T.Temp_800]']:.2f} (SE: {model_sp.bse['C(Suhu)[T.Temp_800]']:.2f})")
print(f"Efek Media (Easy-to-Change)  : {model_sp.params['C(Media)[T.Med_Minyak]']:.2f} (SE: {model_sp.bse['C(Media)[T.Med_Minyak]']:.2f})")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Estimasi Model Split-Plot (MixedLM)
Varians Error A (Whole-Plot) : 7.9154 (Sejati: 9.00)
Varians Error B (Sub-Plot)   : 2.3412 (Sejati: 2.25)
Efek Suhu (Hard-to-Change)   : -20.45 (SE: 2.11)
Efek Media (Easy-to-Change)  : -10.12 (SE: 0.88)`},commonPitfalls:["Menganalisis eksperimen split-plot menggunakan Two-Way ANOVA standar dengan satu penyebut galat tunggal (mengecilkan p-value whole plot secara palsu).","Mengabaikan kendala operasional hard-to-change dan mengklaim telah melakukan randomisasi penuh padahal suhu hanya diubah sekali.","Melupakan bahwa faktor whole-plot memiliki kekuatan uji (power) yang jauh lebih rendah daripada faktor sub-plot."],validationProcedures:["Identifikasi faktor mana yang sulit diubah (suhu, batch reaktor) dan tetapkan sebagai whole plot.","Pastikan tabel ANOVA memuat dua baris galat terpisah: Error A dan Error B.","Gunakan pemodelan Linear Mixed Models (LMM) dengan random intercept untuk unit whole plot sebagai pendekatan komputasi modern."],exercises:[{question:"Mengapa analisis data eksperimen Split-Plot secara matematis wajib menggunakan dua komponen suku galat (Error A dan Error B) yang terpisah?",hint:"Perhatikan perbedaan tingkat pengacakan antara faktor yang sulit diubah dan faktor yang mudah diubah.",answerExplanation:"Desain Split-Plot memiliki dua unit eksperimen dengan ukuran berbeda akibat dua tingkat pengacakan. Faktor yang sulit diubah (whole plot) memiliki variabilitas galat yang lebih besar (Error A), sedangkan faktor yang mudah diubah diuji di dalam plot yang sama dengan variabilitas galat yang lebih kecil (Error B)."}],references:[{citation:"Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.",type:"canonical-textbook"},{citation:"Jones, B., & Nachtsheim, C. J. (2009). Split-plot designs: What, why, and how. Journal of Quality Technology, 41(4), 340-361.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Desain Split-Plot untuk Hard-to-Change Factors",bulletPoints:["Mengakomodasi kendala logistik faktor yang sulit/mahal diubah (misal suhu tungku).","Whole-Plot: Faktor makro yang sulit diubah.","Sub-Plot: Faktor mikro yang mudah diubah, diacak di dalam tiap whole-plot."]},{slideNumber:2,title:"Dua Suku Galat Terpisah",bulletPoints:["Error A (Whole-Plot Error): Penyebut untuk menguji faktor sulit.","Error B (Sub-Plot Error): Penyebut untuk menguji faktor mudah dan interaksi.","Mencegah inferensi false positive pada pengujian faktor industri."],keyFormulaOrDiagram:"$$F_{\\text{Whole}} = \\frac{\\text{MS}_A}{\\text{MS}_{\\text{Error A}}}, \\quad F_{\\text{Sub}} = \\frac{\\text{MS}_B}{\\text{MS}_{\\text{Error B}}}$$"}]},"4.8.4":{id:"4.8.4",chapterId:"CH-31",title:"Pengantar Response Surface Methodology (RSM): Optimasi Proses Orde-2 via Central Composite Design (CCD)",readingTimeMinutes:22,status:"verified",learningObjectives:["Memahami metodologi Response Surface Methodology (RSM) untuk optimasi proses multi-variabel kontinu.","Merancang arsitektur Central Composite Design (CCD) yang menggabungkan faktorial, titik aksial, dan titik pusat.","Menurunkan kondisi optimum titik stasioner (stationary point) menggunakan kalkulus gradien matriks kuadratik."],content:`Desain faktorial 2^k sangat efektif untuk menyaring faktor dan memodelkan aproksimasi linier orde-1. Namun, ketika proses rekayasa sudah mendekati wilayah optimum, hubungan antara parameter input dan respon hampir selalu melengkung (curvature). Model linier tidak lagi mampu memetakan puncak bukit respon (optimum maximum) atau lembah terdalam (optimum minimum).

Response Surface Methodology (RSM), yang dikembangkan oleh George E.P. Box dan K.B. Wilson (1951), adalah metodologi matematika dan statistik terpadu untuk memodelkan, memprediksi, dan mengoptimalkan respon kontinu multi-variabel melalui polinomial kuadratik orde-2.

Central Composite Design (CCD):
Desain eksperimen standar emas untuk membangun model permukaan respon orde-2 adalah Central Composite Design (CCD). Struktur geometris CCD dibangun secara efisien dari tiga komponen:
1. Poin Faktorial (Factorial Points): Desain 2^k (atau 2^(k-p)) pada koordinat (-1, +1), untuk mengestimasi efek linier dan interaksi dua faktor.
2. Titik Pusat (Center Points): Replikasi pengujian pada titik pusat (0, 0, ..., 0), untuk mendeteksi kelengkungan murni dan mengestimasi varians galat eksperimental tanpa menambah perlakuan baru.
3. Titik Aksial / Bintang (Axial / Star Points): Titik-titik pengujian yang ditempatkan pada sumbu koordinat pada jarak radial alpha: (-alpha, 0), (+alpha, 0), (0, -alpha), dll., untuk mengestimasi suku kelengkungan kuadratik murni (x1^2, x2^2).

Penentuan Nilai Alpha:
Untuk menjamin sifat Rotatability (presisi prediksi model seragam di seluruh arah radial dari titik pusat), nilai alpha ditetapkan sebesar alpha = (2^k)^(1/4). Melalui analisis kanonik matriks Hessian kuadratik, peneliti dapat menentukan secara analitis apakah titik stasioner yang ditemukan adalah Titik Maksimum Lokal, Titik Minimum Lokal, atau Titik Pelana (Saddle Point).`,mathematicalFoundations:`1. Model Polinomial Orde-2 Lengkap RSM:
$$y = \\beta_0 + \\sum_{i=1}^k \\beta_i x_i + \\sum_{i=1}^k \\beta_{ii} x_i^2 + \\sum_{i < j} \\sum \\beta_{ij} x_i x_j + \\epsilon$$
Dalam notasi matriks kuadratik:
$$\\hat{y}(\\mathbf{x}) = \\beta_0 + \\mathbf{x}^T \\mathbf{b} + \\mathbf{x}^T \\mathbf{B} \\mathbf{x}$$
di mana $\\mathbf{b} = [\\beta_1, \\dots, \\beta_k]^T$ dan matriks simetris Hessian $\\mathbf{B}$:
$$\\mathbf{B} = \\begin{bmatrix} \\beta_{11} & \\frac{1}{2}\\beta_{12} & \\dots & \\frac{1}{2}\\beta_{1k} \\\\ \\frac{1}{2}\\beta_{12} & \\beta_{22} & \\dots & \\frac{1}{2}\\beta_{2k} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ \\frac{1}{2}\\beta_{1k} & \\frac{1}{2}\\beta_{2k} & \\dots & \\beta_{kk} \\end{bmatrix}$$

2. Solusi Titik Stasioner Optimum (Stationary Point):
Turunkan terhadap vektor $\\mathbf{x}$ dan samakan dengan nol:
$$\\frac{\\partial \\hat{y}}{\\partial \\mathbf{x}} = \\mathbf{b} + 2 \\mathbf{B} \\mathbf{x} = \\mathbf{0}$$
$$\\mathbf{x}_s = -\\frac{1}{2} \\mathbf{B}^{-1} \\mathbf{b}$$
Respon yang diprediksi pada titik stasioner:
$$\\hat{y}_s = \\beta_0 + \\frac{1}{2} \\mathbf{x}_s^T \\mathbf{b}$$

3. Klasifikasi Karakteristik Titik Stasioner via Nilai Eigen Matriks $\\mathbf{B}$:
Misalkan $\\lambda_1, \\dots, \\lambda_k$ adalah nilai eigen dari $\\mathbf{B}$:
- Seluruh $\\lambda_i < 0$ (Definit Negatif): Titik stasioner adalah **Maksimum Lokal** (Puncak Bukit).
- Seluruh $\\lambda_i > 0$ (Definit Positif): Titik stasioner adalah **Minimum Lokal** (Dasar Lembah).
- $\\lambda_i$ memiliki tanda campuran (positif dan negatif): Titik stasioner adalah **Titik Pelana (Saddle Point)**.

4. Nilai Rotatable Alpha untuk CCD:
$$\\alpha = (N_F)^{1/4} = (2^k)^{1/4}$$
Untuk $k = 2$: $\\alpha = (4)^{1/4} = \\sqrt{2} \\approx 1.414$.
Untuk $k = 3$: $\\alpha = (8)^{1/4} \\approx 1.682$.`,workedExample:{problemStatement:`Pada optimasi proses ekstraksi minyak atsiri 2 faktor (x1 = Suhu, x2 = Waktu), model kuadratik orde-2 RSM yang terestimasi adalah:
y_hat = 82.5 + 4.0*x1 + 2.0*x2 - 2.5*x1^2 - 1.5*x2^2 - 1.0*x1*x2.
Susun vektor b dan matriks B, hitung koordinat titik stasioner x_s, tentukan jenis optimumnya via nilai eigen, dan hitung respon yield maksimum yang diprediksi.`,stepByStepSolution:[`Langkah 1: Susun vektor linier b dan matriks kuadratik B:
b = [4.0, 2.0]^T.
beta_11 = -2.5, beta_22 = -1.5, beta_12 = -1.0 -> elemen non-diagonal = beta_12 / 2 = -0.5.
B = [[-2.5, -0.5], [-0.5, -1.5]].`,`Langkah 2: Hitung determinan dan invers dari matriks B:
det(B) = (-2.5)(-1.5) - (-0.5)^2 = 3.75 - 0.25 = 3.50.
B^(-1) = (1 / 3.50) * [[-1.5, 0.5], [0.5, -2.5]].`,`Langkah 3: Hitung titik stasioner x_s = -0.5 * B^(-1) * b:
B^(-1) * b = (1 / 3.5) * [ (-1.5 * 4.0 + 0.5 * 2.0), (0.5 * 4.0 - 2.5 * 2.0) ] = (1 / 3.5) * [ -6.0 + 1.0, 2.0 - 5.0 ] = (1 / 3.5) * [ -5.0, -3.0 ] = [-1.4286, -0.8571]^T.
x_s = -0.5 * [-1.4286, -0.8571]^T = [+0.7143, +0.4286]^T.`,`Langkah 4: Klasifikasi jenis optimum via nilai eigen B:
Persamaan karakteristik: det(B - lambda*I) = (-2.5 - lambda)(-1.5 - lambda) - 0.25 = lambda^2 + 4.0*lambda + 3.50 = 0.
lambda = [-4.0 +- sqrt(16.0 - 14.0)] / 2 = [-4.0 +- 1.4142] / 2.
lambda_1 = -1.2929, lambda_2 = -2.7071.
Karena KEDUA nilai eigen bertanda negatif murni (lambda < 0), titik stasioner adalah MAKSIMUM LOKAL SEJATI.`,`Langkah 5: Hitung yield maksimum y_hat_s:
y_hat_s = beta_0 + 0.5 * x_s^T * b = 82.5 + 0.5 * (0.7143 * 4.0 + 0.4286 * 2.0) = 82.5 + 0.5 * (2.8572 + 0.8572) = 82.5 + 0.5 * (3.7144) = 82.5 + 1.857 = 84.36%.`],resultInterpretation:"Kondisi operasi optimal tercapai pada koordinat terkode Suhu x1 = +0.71 dan Waktu x2 = +0.43. Di titik puncak ini, yield ekstraksi maksimum diprediksi mencapai 84.36%."},pythonImplementation:{description:"Optimasi matematis RSM: Kalkulasi titik stasioner, analisis nilai eigen Hessian, dan prediksi respon maksimum.",libraryDependencies:["numpy"],code:`import numpy as np

# Koefisien model kuadratik orde-2: y = 82.5 + 4*x1 + 2*x2 - 2.5*x1^2 - 1.5*x2^2 - 1*x1*x2
beta_0 = 82.5
b = np.array([4.0, 2.0])
B = np.array([
    [-2.5, -0.5],
    [-0.5, -1.5]
])

# 1. Hitung Titik Stasioner: x_s = -0.5 * B^(-1) * b
B_inv = np.linalg.inv(B)
x_s = -0.5 * B_inv @ b

# 2. Analisis Nilai Eigen untuk Klasifikasi Permukaan
eigenvalues, _ = np.linalg.eig(B)

# 3. Prediksi Respon Optimum
y_s = beta_0 + 0.5 * (x_s.T @ b)

jenis_optimum = "Maksimum Lokal" if np.all(eigenvalues < 0) else ("Minimum Lokal" if np.all(eigenvalues > 0) else "Titik Pelana (Saddle Point)")

print("[SIMULASI/SYNTHETIC DATA] Analisis Optimasi Response Surface Methodology (RSM)")
print(f"Koordinat Titik Stasioner (x_s) : x1 = {x_s[0]:.4f}, x2 = {x_s[1]:.4f}")
print(f"Nilai Eigen Matriks Hessian (B) : lambda_1 = {eigenvalues[0]:.4f}, lambda_2 = {eigenvalues[1]:.4f}")
print(f"Karakteristik Titik Stasioner   : {jenis_optimum}")
print(f"Prediksi Respon Optimum (y_max) : {y_s:.2f}%")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Analisis Optimasi Response Surface Methodology (RSM)
Koordinat Titik Stasioner (x_s) : x1 = 0.7143, x2 = 0.4286
Nilai Eigen Matriks Hessian (B) : lambda_1 = -2.7071, lambda_2 = -1.2929
Karakteristik Titik Stasioner   : Maksimum Lokal
Prediksi Respon Optimum (y_max) : 84.36%`},commonPitfalls:["Menyimpulkan titik stasioner sebagai titik maksimum tanpa memeriksa nilai eigen matriks B (titik tersebut bisa jadi merupakan saddle point di mana respon justru menurun pada arah tertentu).","Menghitung koordinat optimum yang jatuh jauh di luar wilayah eksperimen (|x_s| > alpha) dan memaksakan ekstrapolasi yang tidak valid.","Mengabaikan titik pusat (center points) sehingga tidak dapat memisahkan galat eksperimental murni dari ketidakcocokan model (lack of fit)."],validationProcedures:["Uji Lack of Fit model kuadratik: pastikan p-value lack of fit > 0.05 (model cocok dengan data).","Periksa apakah titik stasioner x_s berada di dalam batas domain eksperimen teruji.","Jalankan pengujian konfirmasi laboratorium fisik pada koordinat titik stasioner yang direkomendasikan."],exercises:[{question:"Pada analisis kanonik model kuadratik RSM, jika matriks kuadratik Hessian B memiliki nilai eigen lambda_1 = +3.2 dan lambda_2 = -1.8, apakah jenis titik stasioner yang teridentifikasi?",hint:"Perhatikan tanda dari masing-masing nilai eigen (satu positif dan satu negatif).",answerExplanation:"Titik stasioner tersebut adalah Titik Pelana (Saddle Point). Pada arah vektor eigen pertama respon berbentuk lembah (minimum), sedangkan pada arah vektor eigen kedua respon berbentuk bukit (maksimum), sehingga sistem tidak memiliki titik ekstrem tunggal murni di wilayah tersebut."}],references:[{citation:"Box, G. E., & Wilson, K. B. (1951). On the experimental attainment of optimum conditions. Journal of the Royal Statistical Society: Series B, 13(1), 1-38.",type:"peer-reviewed-article"},{citation:"Myers, R. H., Montgomery, D. C., & Anderson-Cook, C. M. (2016). Response Surface Methodology: Process and Product Optimization Using Designed Experiments (4th ed.). John Wiley & Sons.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Response Surface Methodology (RSM)",bulletPoints:["Memetakan permukaan respon kontinu dan mencari titik optimum proses.","Model polinomial kuadratik orde-2: Menangkap kelengkungan (curvature).","Arsitektur CCD: Poin Faktorial + Titik Pusat + Titik Aksial (Bintang)."],keyFormulaOrDiagram:"$$\\hat{y} = \\beta_0 + \\mathbf{x}^T \\mathbf{b} + \\mathbf{x}^T \\mathbf{B} \\mathbf{x}$$"},{slideNumber:2,title:"Kalkulus Titik Stasioner & Hessian",bulletPoints:["Titik stasioner: x_s = -0.5 * B^(-1) * b.","Nilai eigen Hessian B menentukan karakteristik permukaan:","Semua lambda < 0: Maksimum Lokal; Semua lambda > 0: Minimum Lokal; Campuran: Saddle Point."],keyFormulaOrDiagram:"$$\\mathbf{x}_s = -\\frac{1}{2} \\mathbf{B}^{-1} \\mathbf{b}$$"}]}};export{a as CH31_LESSONS};
