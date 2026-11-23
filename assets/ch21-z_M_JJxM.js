const a={"3.6.1":{id:"3.6.1",chapterId:"CH-21",title:"Masalah Inferensi Simultan: Inflasi Kesalahan Tipe I pada Pengujian Jamak",readingTimeMinutes:18,status:"verified",learningObjectives:["Memahami mekanisme inflasi Kesalahan Tipe I (False Positive) ketika menguji banyak hipotesis secara simultan.","Menghitung Family-Wise Error Rate (FWER) teoretis sebagai fungsi dari jumlah pengujian.","Mengidentifikasi bahaya silent multiplicity dan data dredging pada eksperimen modern."],content:`Dalam metodologi pengujian hipotesis klasik Neyman-Pearson, tingkat signifikansi alpha (umumnya ditetapkan sebesar 0.05) mengontrol probabilitas melakukan Kesalahan Tipe I untuk satu uji hipotesis tunggal. Namun, pada era penelitian modern yang kaya data (seperti bioinformatika, evaluasi multi-metrik machine learning, sensor array IoT, atau A/B testing multi-varian), peneliti jarang sekali melakukan hanya satu pengujian.

Ketika puluhan, ratusan, atau ribuan hipotesis diuji secara simultan pada himpunan data yang sama tanpa koreksi statistik, batas kesalahan nominal alpha tidak lagi berlaku untuk keseluruhan rangkaian uji. Peluang menemukan setidaknya satu hasil yang tampak "signifikan secara statistik" semata-mata karena kebetulan acak (fluktuasi stokastik) meningkat tajam mendekati kepastian 100%. Fenomena ini dikenal sebagai masalah inferensi simultan (multiplicity problem).

Sebagai contoh ilustratif: jika seorang peneliti menguji 20 fitur atau metrik yang sebenarnya sama sekali tidak memiliki efek (semua hipotesis nol benar), peluang mengamati setidaknya satu hasil "signifikan" pada tingkat alpha = 0.05 bukanlah 5%, melainkan melonjak menjadi 1 - (1 - 0.05)^20 = 0.6415 (sekitar 64.2%). Peneliti yang tidak menyadari inflasi ini akan mempublikasikan "temuan palsu" (false discovery) dengan penuh keyakinan semu. Masalah ini diperparah oleh silent multiplicity, yaitu ketika peneliti menguji banyak hipotesis namun hanya melaporkan pengujian yang menghasilkan p-value < 0.05 ke dalam naskah publikasi.`,mathematicalFoundations:`1. Formulasi Family-Wise Error Rate (FWER) untuk Pengujian Independen:
Misalkan terdapat $m$ hipotesis nol independen $H_{0,1}, H_{0,2}, \\dots, H_{0,m}$, di mana seluruh hipotesis nol tersebut adalah benar (kondisi global null hypothesis).

Jika tiap pengujian dilakukan pada tingkat signifikansi nominal $\\alpha$, maka probabilitas sebuah pengujian tidak menghasilkan Kesalahan Tipe I adalah $1 - \\alpha$.

Karena seluruh pengujian diasumsikan saling independen, probabilitas bahwa seluruh $m$ pengujian secara bersamaan tidak menghasilkan Kesalahan Tipe I adalah:
$$P(\\text{Tidak ada false positive}) = (1 - \\alpha)^m$$

Oleh karena itu, Family-Wise Error Rate (FWER), didefinisikan sebagai probabilitas membuat setidaknya satu Kesalahan Tipe I di antara seluruh $m$ pengujian:
$$\\alpha_{\\text{family}} = \\text{FWER} = 1 - (1 - \\alpha)^m$$

2. Derivasi Aproksimasi Deret Taylor:
Untuk nilai $m \\alpha \\ll 1$, ekspansi binomial memberikan:
$$\\text{FWER} = 1 - \\left( 1 - m\\alpha + \\frac{m(m-1)}{2}\\alpha^2 - \\dots \\right) \\approx m\\alpha$$

3. Batas Atas Pertidaksamaan Boole (Union Bound) untuk Pengujian Dependen:
Jika pengujian tidak independen (memiliki korelasi), pertidaksamaan Boole menetapkan batas atas universal:
$$\\text{FWER} = P\\left( \\bigcup_{i=1}^m \\{p_i \\le \\alpha\\} \\right) \\le \\sum_{i=1}^m P(p_i \\le \\alpha) = m\\alpha$$`,workedExample:{problemStatement:"Sebuah laboratorium computer vision membandingkan algoritma deteksi objek baru terhadap baseline pada 15 metrik performa independen (m = 15). Seluruh pengujian dilakukan pada tingkat signifikansi nominal alpha = 0.05. Hitung probabilitas kumulatif terjadinya setidaknya satu kesalahan false positive (FWER). Berapa FWER jika jumlah pengujian bertambah menjadi 50 dan 100?",stepByStepSolution:["Langkah 1: Identifikasi parameter: alpha = 0.05, m = 15.","Langkah 2: Hitung probabilitas tidak ada false positive untuk 15 uji: (1 - 0.05)^15 = (0.95)^15 = 0.4633.","Langkah 3: Hitung FWER untuk m = 15: FWER = 1 - 0.4633 = 0.5367 (53.67%).","Langkah 4: Hitung FWER untuk m = 50: FWER = 1 - (0.95)^50 = 1 - 0.0769 = 0.9231 (92.31%).","Langkah 5: Hitung FWER untuk m = 100: FWER = 1 - (0.95)^100 = 1 - 0.0059 = 0.9941 (99.41%)."],resultInterpretation:"Tanpa koreksi pengujian jamak, peluang melaporkan setidaknya satu kesimpulan keliru pada 15 metrik adalah 53.67%. Pada 100 metrik, kepastian menemukan temuan palsu mencapai 99.41%, membuktikan bahwa p-value nominal tanpa koreksi menjadi tidak bermakna."},pythonImplementation:{description:"Simulasi Monte Carlo membuktikan inflasi empiris FWER ketika menguji m hipotesis nol sejati.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

np.random.seed(42)
n_simulasi = 5000
alpha_nominal = 0.05
daftar_m = [1, 5, 10, 20, 50]

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Inflasi FWER pada Pengujian Jamak")
print(f"{'m (Uji)':<10}{'FWER Teoretis':<18}{'FWER Empiris':<18}")
print("-" * 46)

for m in daftar_m:
    t_stat, p_values = stats.ttest_ind(
        np.random.normal(0, 1, size=(n_simulasi, m, 30)),
        np.random.normal(0, 1, size=(n_simulasi, m, 30)),
        axis=2
    )
    ada_false_positive = np.any(p_values < alpha_nominal, axis=1)
    fwer_empiris = np.mean(ada_false_positive)
    fwer_teoretis = 1.0 - (1.0 - alpha_nominal)**m
    print(f"{m:<10}{fwer_teoretis:<18.4f}{fwer_empiris:<18.4f}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Inflasi FWER pada Pengujian Jamak
m (Uji)   FWER Teoretis     FWER Empiris      
----------------------------------------------
1         0.0500            0.0494            
5         0.2262            0.2248            
10        0.4013            0.3952            
20        0.6415            0.6406            
50        0.9231            0.9238`},commonPitfalls:["Menguji puluhan fitur atau kombinasi hyperparameter lalu hanya mempublikasikan fitur dengan p < 0.05 tanpa menyebutkan total uji yang dilakukan.","Mengira bahwa tingkat kesalahan tetap 5% terlepas dari berapa banyak uji hipotesis yang dijalankan pada dataset yang sama.","Melakukan subgroup analysis berulang kali hingga menemukan kelompok bagian yang menghasilkan hasil signifikan secara statistik."],validationProcedures:["Dokumentasikan seluruh hipotesis yang diuji sejak awal protokol eksperimen (pre-registration).","Hitung rasio inflasi FWER jika pengujian tidak dikoreksi untuk menyadarkan tim peneliti.","Terapkan koreksi statistik formal seperti Bonferroni, Holm, atau FDR ketika m > 1."],exercises:[{question:"Jika seorang peneliti melakukan 14 pengujian hipotesis independen tanpa koreksi pada alpha = 0.05 di bawah H0 sejati, berapakah probabilitas peneliti membuat setidaknya satu Kesalahan Tipe I?",hint:"Gunakan rumus probabilitas komplemen: FWER = 1 - (1 - alpha)^m.",answerExplanation:"FWER = 1 - (1 - 0.05)^14 = 1 - (0.95)^14 = 1 - 0.4877 = 0.5123 atau sekitar 51.2%. Peluang menemukan setidaknya satu temuan palsu melebihi 50%."}],references:[{citation:"Shaffer, J. P. (1995). Multiple hypothesis testing. Annual Review of Psychology, 46(1), 561-584.",type:"peer-reviewed-article"},{citation:"Bender, R., & Lange, S. (2001). Adjusting for multiple testing - when and how? Journal of Clinical Epidemiology, 54(4), 343-349.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Masalah Inferensi Simultan",bulletPoints:["Pengujian hipotesis tunggal menjamin batas kesalahan Tipe I sebesar alpha (5%).","Pada pengujian jamak (m uji), peluang false positive terakumulasi secara eksponensial.","Pada m=20 uji independen, peluang kesalahan kumulatif melonjak hingga 64.2%."],keyFormulaOrDiagram:"$$\\text{FWER} = 1 - (1 - \\alpha)^m$$"},{slideNumber:2,title:"Kalkulus FWER & Bahaya Silent Multiplicity",bulletPoints:["FWER = 1 - (1 - alpha)^m untuk uji independen, dan <= m * alpha di bawah dependensi sembarang.","Silent multiplicity terjadi jika peneliti menyembunyikan pengujian yang gagal dari naskah.","Solusi etis dan ilmiah: transparansi total seluruh uji dan penerapan prosedur koreksi jamak."]}]},"3.6.2":{id:"3.6.2",chapterId:"CH-21",title:"Pengendalian Family-Wise Error Rate (FWER): Koreksi Bonferroni dan Holm-Bonferroni",readingTimeMinutes:20,status:"verified",learningObjectives:["Menurunkan formulasi koreksi Bonferroni berbasis pertidaksamaan Boole.","Memahami mekanisme prosedur sekuensial Holm-Bonferroni (step-down procedure).","Membandingkan kekuatan statistik (statistical power) antara Bonferroni klasik dan Holm-Bonferroni."],content:`Family-Wise Error Rate (FWER) didefinisikan sebagai probabilitas terjadinya setidaknya satu Kesalahan Tipe I di antara seluruh keluarga hipotesis yang diuji. Pengendalian FWER bertujuan menjaga agar FWER secara keseluruhan tidak melebihi ambang batas yang ditentukan (misalnya $\\alpha = 0.05$).

Metode pengendalian FWER paling sederhana dan paling tua adalah Koreksi Bonferroni (Bonferroni Correction). Dalam pendekatan ini, setiap hipotesis individual $H_{0,i}$ diuji menggunakan ambang signifikansi yang disesuaikan: $\\alpha_{\\text{adj}} = \\alpha / m$, atau secara ekuivalen nilai p-value yang disesuaikan dihitung sebagai $p_{\\text{adj}, i} = \\min(1, m \\cdot p_i)$. Meskipun sangat mudah diterapkan dan valid di bawah struktur ketergantungan data apapun, koreksi Bonferroni dikenal sangat konservatif, terutama ketika jumlah hipotesis $m$ besar. Akibatnya, kekuatan statistik (power) menurun drastis, sehingga risiko Kesalahan Tipe II (False Negative) meningkat secara substansial.

Untuk mengatasi kelemahan konservatisme Bonferroni tanpa mengorbankan kendali ketat terhadap FWER, Sture Holm (1979) memperkenalkan prosedur bertahap turun (step-down procedure) yang dikenal sebagai Koreksi Holm-Bonferroni. Prosedur Holm mengurutkan seluruh nilai p-value dari yang terkecil ke yang terbesar, lalu menguji secara sekuensial dengan ambang batas yang melonggar bertahap: $\\alpha / (m - i + 1)$. Prosedur Holm secara matematis terbukti mengendalikan FWER pada level $\\alpha$ persis seperti Bonferroni, namun memiliki kekuatan statistik yang secara tegas lebih tinggi (*strictly more powerful*). Oleh karena itu, dalam praktik ilmiah modern, tidak ada alasan metodologis untuk menggunakan Bonferroni bersahaja ketika prosedur Holm tersedia.`,mathematicalFoundations:`1. Derivasi Koreksi Bonferroni:
Berdasarkan pertidaksamaan Boole (Union Bound):
$$P\\left( \\bigcup_{i=1}^m \\{p_i \\le \\alpha'\\} \\right) \\le \\sum_{i=1}^m P(p_i \\le \\alpha') = m \\alpha'$$
Agar FWER kumulatif $\\le \\alpha$, tetapkan:
$$m \\alpha' = \\alpha \\implies \\alpha' = \\frac{\\alpha}{m}$$

2. Algoritma Sekuensial Holm-Bonferroni (Step-Down):
Diberikan $m$ hipotesis nol dengan nilai p-value teramati.
Langkah 1: Urutkan nilai p-value secara monoton naik:
$$p_{(1)} \\le p_{(2)} \\le \\dots \\le p_{(m)}$$
yang berkorespondensi dengan hipotesis $H_{(1)}, H_{(2)}, \\dots, H_{(m)}$.

Langkah 2: Tentukan ambang signifikansi bertahap untuk langkah $i$:
$$\\alpha_i = \\frac{\\alpha}{m - i + 1}$$

Langkah 3: Cari indeks terkecil $k$ sedemikian rupa sehingga:
$$p_{(k)} > \\frac{\\alpha}{m - k + 1}$$

Langkah 4: Keputusan: Tolak seluruh hipotesis nol $H_{(1)}, \\dots, H_{(k-1)}$ dan gagal menolak $H_{(k)}, \\dots, H_{(m)}$.
Jika $p_{(1)} > \\alpha / m$, maka tidak ada hipotesis yang ditolak. Jika kondisi penolakan terpenuhi hingga akhir, tolak seluruh $m$ hipotesis.

3. Formula Penyesuaian Nilai p-value Terkoreksi Holm:
$$\\tilde{p}_{(i)} = \\max_{j \\le i} \\left\\{ \\min\\left(1, (m - j + 1) p_{(j)}\\right) \\right\\}$$
Operator pemaksimuman memastikan bahwa p-value yang disesuaikan tetap mempertahankan sifat monoton naik.`,workedExample:{problemStatement:"Pada pengujian perbandingan performa 4 arsitektur model deep learning terhadap baseline (m = 4), diperoleh nilai p-value mentah: p_1 = 0.012, p_2 = 0.045, p_3 = 0.008, p_4 = 0.150. Lakukan pengujian pada tingkat alpha = 0.05 menggunakan (a) Koreksi Bonferroni dan (b) Prosedur Holm-Bonferroni.",stepByStepSolution:["Langkah 1: Identifikasi parameter: alpha = 0.05, m = 4.","Langkah 2 (Bonferroni): Ambang batas alpha_adj = 0.05 / 4 = 0.0125.","Evaluasi Bonferroni:","- p_3 = 0.008 < 0.0125 -> Tolak H0 (Signifikan).","- p_1 = 0.012 < 0.0125 -> Tolak H0 (Signifikan).","- p_2 = 0.045 >= 0.0125 -> Gagal tolak H0.","- p_4 = 0.150 >= 0.0125 -> Gagal tolak H0.","Langkah 3 (Holm-Bonferroni): Urutkan p-value naik:","p_(1) = 0.008 (H3), p_(2) = 0.012 (H1), p_(3) = 0.045 (H2), p_(4) = 0.150 (H4).","Langkah 4 (Evaluasi Sekuensial Holm):","- Uji p_(1) = 0.008 vs alpha/(4 - 1 + 1) = 0.05/4 = 0.0125. Karena 0.008 <= 0.0125, tolak H3.","- Uji p_(2) = 0.012 vs alpha/(4 - 2 + 1) = 0.05/3 = 0.0167. Karena 0.012 <= 0.0167, tolak H1.","- Uji p_(3) = 0.045 vs alpha/(4 - 3 + 1) = 0.05/2 = 0.0250. Karena 0.045 > 0.0250, berhenti dan gagal tolak H2.","- Otomatis p_(4) (H4) gagal tolak."],resultInterpretation:"Pada kasus ini, kedua metode menolak H3 dan H1 serta mempertahankan H2 dan H4. Namun, perhatikan bahwa ambang uji Holm pada langkah ke-2 melonggar menjadi 0.0167 (dibandingkan Bonferroni yang tetap 0.0125), memberikan kekuatan statistik yang lebih besar."},pythonImplementation:{description:"Implementasi perbandingan koreksi Bonferroni dan Holm-Bonferroni menggunakan library statsmodels.",libraryDependencies:["numpy","statsmodels"],code:`import numpy as np
from statsmodels.stats.multitest import multipletests

p_vals = np.array([0.008, 0.012, 0.045, 0.150, 0.022])
m = len(p_vals)
alpha = 0.05

reject_bonf, p_bonf, _, _ = multipletests(p_vals, alpha=alpha, method='bonferroni')
reject_holm, p_holm, _, _ = multipletests(p_vals, alpha=alpha, method='holm')

print("[SIMULASI/SYNTHETIC DATA] Hasil Koreksi FWER (Bonferroni vs Holm)")
print(f"{'No':<4}{'p-Mentah':<12}{'p-Bonferroni':<15}{'Tolak?':<10}{'p-Holm':<12}{'Tolak?':<10}")
print("-" * 63)
for i in range(m):
    print(f"{i+1:<4}{p_vals[i]:<12.4f}{p_bonf[i]:<15.4f}{str(reject_bonf[i]):<10}{p_holm[i]:<12.4f}{str(reject_holm[i]):<10}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Koreksi FWER (Bonferroni vs Holm)
No  p-Mentah    p-Bonferroni   Tolak?    p-Holm      Tolak?    
---------------------------------------------------------------
1   0.0080      0.0400         True      0.0400      True      
2   0.0120      0.0600         False     0.0480      True      
3   0.0450      0.2250         False     0.0900      False     
4   0.1500      0.7500         False     0.1500      False     
5   0.0220      0.1100         False     0.0660      False`},commonPitfalls:["Menghitung p-value Bonferroni secara manual dengan mengalikan m * p tanpa membatasi nilai maksimum pada 1.0 (menghasilkan p-value > 1.0 yang tidak valid).","Tetap menggunakan Bonferroni klasik padahal Holm-Bonferroni selalu memberikan power lebih tinggi dengan jaminan perlindungan FWER yang identik.","Menerapkan koreksi FWER pada studi eksploratori skala masif (ribuan fitur) sehingga melumpuhkan seluruh penemuan ilmiah."],validationProcedures:["Pastikan nilai p-value yang disesuaikan tidak melebihi 1.0.","Verifikasi bahwa urutan p-value pada metode Holm tersusun secara monoton naik.","Gunakan Holm-Bonferroni sebagai default jika tujuan utama analisis adalah pengendalian FWER ketat."],exercises:[{question:"Mengapa prosedur Holm-Bonferroni secara metodologis lebih disukai daripada koreksi Bonferroni klasik?",hint:"Fokus pada adaptivitas ambang signifikansi bertahap dan daya statistik.",answerExplanation:"Holm-Bonferroni melonggarkan ambang batas penolakan secara bertahap pada tiap tahapan sekuensial (alpha / (m - i + 1)) sehingga kekuatan statistik (power) meningkat tanpa melanggar jaminan pengendalian FWER pada tingkat alpha."}],references:[{citation:"Bonferroni, C. E. (1936). Teoria statistica delle classi e calcolo delle probabilita. Pubblicazioni del R Istituto Superiore di Scienze Economiche e Commerciali di Firenze, 8, 3-62.",type:"canonical-textbook"},{citation:"Holm, S. (1979). A simple sequentially rejective multiple test procedure. Scandinavian Journal of Statistics, 6(2), 65-70.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Pengendalian Family-Wise Error Rate (FWER)",bulletPoints:["FWER: Probabilitas membuat setidaknya satu false positive di seluruh keluarga pengujian.","Bonferroni mengalokasikan alpha sama rata: alpha_adj = alpha / m.","Kelemahan Bonferroni: sangat konservatif, power statistik menurun drastis saat m besar."],keyFormulaOrDiagram:"$$\\alpha_{\\text{adj}} = \\frac{\\alpha}{m}$$"},{slideNumber:2,title:"Keunggulan Prosedur Sekuensial Holm-Bonferroni",bulletPoints:["Urutkan p-value naik: p_(1) <= p_(2) <= ... <= p_(m).","Bandingkan p_(i) terhadap ambang adaptif: alpha / (m - i + 1).","Berhenti begitu syarat uji tidak terpenuhi; tolak seluruh hipotesis sebelumnya."],keyFormulaOrDiagram:"$$\\alpha_i = \\frac{\\alpha}{m - i + 1}$$"}]},"3.6.3":{id:"3.6.3",chapterId:"CH-21",title:"Pengendalian False Discovery Rate (FDR): Prosedur Benjamini-Hochberg dan Yekutieli",readingTimeMinutes:22,status:"verified",learningObjectives:["Membedakan paradigma False Discovery Rate (FDR) dengan Family-Wise Error Rate (FWER).","Menerapkan algoritma step-up Benjamini-Hochberg (BH) untuk mengendalikan proporsi temuan palsu.","Memahami kapan prosedur Benjamini-Yekutieli (BY) diperlukan di bawah korelasi negatif atau arbitrer."],content:`Ketika penelitian melibatkan pengujian ratusan, ribuan, atau jutaan hipotesis secara simultan (misalnya genomika fungsional, pencarian biomarker, evaluasi ribuan model machine learning, atau neuroimaging fMRI), pengendalian FWER menjadi terlalu restriktif. Mengendalikan peluang terjadinya satu pun kesalahan false positive pada tingkat 0.05 di antara 10,000 uji menuntut p-value individual lebih kecil dari $0.05 / 10000 = 5 \\times 10^{-6}$. Standar ekstrem ini menyebabkan hampir seluruh penemuan ilmiah sejati terlewatkan (daya uji hancur).

Untuk mengatasi kebuntuan metodologis ini, Yoav Benjamini dan Yosef Hochberg (1995) merumuskan paradigma baru: False Discovery Rate (FDR). Alih-alih memastikan nol kesalahan false positive dalam keluarga pengujian, FDR mengendalikan ekspektasi proporsi kesalahan penemuan (false discoveries) di antara seluruh hipotesis yang ditolak (discoveries).

Jika seorang peneliti mendeklarasikan 100 hipotesis signifikan di bawah ambang kendali FDR $Q = 0.05$, maka secara rata-rata, sekitar 5 dari 100 temuan tersebut diperkirakan merupakan false positive, sedangkan 95 temuan lainnya adalah sinyal nyata. Toleransi terukur terhadap sebagian kecil kesalahan false positive ini menghasilkan lonjakan dramatis pada kekuatan statistik eksperimen.

Prosedur Benjamini-Hochberg (BH) merupakan prosedur bertahap naik (step-up procedure) yang menjamin pengendalian FDR pada level $Q$ untuk statistik uji yang independen atau memiliki ketergantungan regresi positif (Positive Regression Dependency on Subsets / PRDS). Untuk kasus ketergantungan umum atau korelasi negatif arbitrer, Benjamini dan Daniel Yekutieli (2001) mengembangkan prosedur BY yang menyisipkan faktor harmonik pengkoreksi.`,mathematicalFoundations:`1. Definisi Matematis Matriks Hasil Pengujian Hipotesis:
Misalkan terdapat $m$ hipotesis yang diuji:
- $m_0$: Jumlah hipotesis nol sejati (tidak diketahui peneliti).
- $m - m_0$: Jumlah hipotesis alternatif sejati.
- $R$: Jumlah total hipotesis yang ditolak oleh prosedur (discoveries).
- $V$: Jumlah hipotesis nol sejati yang keliru ditolak (false discoveries / Tipe I).
- $S$: Jumlah hipotesis alternatif sejati yang berhasil ditolak (true discoveries).

False Discovery Proportion (FDP) didefinisikan sebagai rasio:
$$\\text{FDP} = \\begin{cases} \\frac{V}{R}, & \\text{jika } R > 0 \\\\ 0, & \\text{jika } R = 0 \\end{cases}$$

False Discovery Rate (FDR) adalah nilai harapan (ekspektasi) dari FDP:
$$\\text{FDR} = E[\\text{FDP}] = E\\left[ \\frac{V}{R} \\;\\Big|\\; R > 0 \\right] P(R > 0)$$

2. Algoritma Step-Up Benjamini-Hochberg (BH):
Diberikan $m$ p-value teramati dan tingkat kendali FDR yang diinginkan $Q$ (misal $Q = 0.05$).
Langkah 1: Urutkan nilai p-value secara monoton naik:
$$p_{(1)} \\le p_{(2)} \\le \\dots \\le p_{(m)}$$
Langkah 2: Cari indeks terbesar $k$ sedemikian rupa sehingga:
$$p_{(k)} \\le \\frac{k}{m} Q$$
Langkah 3: Tolak seluruh hipotesis $H_{(1)}, H_{(2)}, \\dots, H_{(k)}$. Jika tidak ada indeks yang memenuhi, tidak ada hipotesis yang ditolak.

3. Prosedur Benjamini-Yekutieli (BY) untuk Dependensi Arbitrer:
Jika pengujian memiliki ketergantungan arbitrer (korelasi negatif antar variabel), ambang batas dimodifikasi dengan membagi konstanta harmonik $c(m)$:
$$p_{(k)} \\le \\frac{k}{m \\cdot c(m)} Q, \\quad \\text{di mana } c(m) = \\sum_{i=1}^m \\frac{1}{i} \\approx \\ln(m) + \\gamma$$
di mana $\\gamma \\approx 0.5772$ adalah konstanta Euler-Mascheroni.`,workedExample:{problemStatement:"Dalam screening 8 fitur diagnostik anomali vibrasi turbin pembangkit listrik (m = 8), diperoleh p-value terurut: p_(1)=0.001, p_(2)=0.007, p_(3)=0.015, p_(4)=0.021, p_(5)=0.040, p_(6)=0.065, p_(7)=0.110, p_(8)=0.220. Terapkan prosedur Benjamini-Hochberg pada tingkat FDR Q = 0.05 untuk menentukan fitur yang signifikan.",stepByStepSolution:["Langkah 1: Hitung ambang batas kritis BH: (i / m) * Q untuk tiap i = 1, 2, ..., 8 dengan Q = 0.05, m = 8.","Langkah 2: Evaluasi masing-masing pengujian secara bertahap:","- i = 1: p_(1) = 0.001 vs (1/8)*0.05 = 0.00625. Memenuhi (0.001 <= 0.00625).","- i = 2: p_(2) = 0.007 vs (2/8)*0.05 = 0.01250. Memenuhi (0.007 <= 0.01250).","- i = 3: p_(3) = 0.015 vs (3/8)*0.05 = 0.01875. Memenuhi (0.015 <= 0.01875).","- i = 4: p_(4) = 0.021 vs (4/8)*0.05 = 0.02500. Memenuhi (0.021 <= 0.02500).","- i = 5: p_(5) = 0.040 vs (5/8)*0.05 = 0.03125. Tidak memenuhi (0.040 > 0.03125).","- i = 6: p_(6) = 0.065 vs (6/8)*0.05 = 0.03750. Tidak memenuhi.","- i = 7: p_(7) = 0.110 vs (7/8)*0.05 = 0.04375. Tidak memenuhi.","- i = 8: p_(8) = 0.220 vs (8/8)*0.05 = 0.05000. Tidak memenuhi.","Langkah 3: Cari indeks terbesar k yang memenuhi kondisi p_(k) <= (k/m)*Q. Indeks terbesar adalah k = 4.","Langkah 4: Tolak seluruh hipotesis hingga indeks k = 4: Fitur 1, 2, 3, dan 4 dideklarasikan signifikan."],resultInterpretation:"Empat fitur pertama terbukti signifikan pada FDR 5%. Perhatikan bahwa jika menggunakan Bonferroni klasik (alpha/m = 0.05/8 = 0.00625), hanya fitur 1 yang terdeteksi, sehingga 3 fitur penting lainnya akan terbuang sia-sia."},pythonImplementation:{description:"Implementasi prosedur Benjamini-Hochberg (BH) dan Benjamini-Yekutieli (BY) untuk screening anomali sensor.",libraryDependencies:["numpy","statsmodels"],code:`import numpy as np
from statsmodels.stats.multitest import multipletests

p_vals = np.array([0.001, 0.007, 0.015, 0.021, 0.040, 0.065, 0.110, 0.220])
m = len(p_vals)
q_target = 0.05

reject_bh, p_bh, _, _ = multipletests(p_vals, alpha=q_target, method='fdr_bh')
reject_by, p_by, _, _ = multipletests(p_vals, alpha=q_target, method='fdr_by')

print("[SIMULASI/SYNTHETIC DATA] Analisis Screening Sensor via FDR Control")
print(f"{'Fitur':<8}{'p-Mentah':<12}{'p-Adj (BH)':<14}{'Tolak BH?':<12}{'p-Adj (BY)':<14}{'Tolak BY?':<10}")
print("-" * 70)
for i in range(m):
    print(f"Sensor {i+1:<3}{p_vals[i]:<12.4f}{p_bh[i]:<14.4f}{str(reject_bh[i]):<12}{p_by[i]:<14.4f}{str(reject_by[i]):<10}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Analisis Screening Sensor via FDR Control
Fitur   p-Mentah    p-Adj (BH)    Tolak BH?   p-Adj (BY)    Tolak BY? 
----------------------------------------------------------------------
Sensor 1   0.0010      0.0080        True        0.0217        True      
Sensor 2   0.0070      0.0280        True        0.0761        False     
Sensor 3   0.0150      0.0400        True        0.1087        False     
Sensor 4   0.0210      0.0420        True        0.1141        False     
Sensor 5   0.0400      0.0640        False       0.1739        False     
Sensor 6   0.0650      0.0867        False       0.2356        False     
Sensor 7   0.1100      0.1257        False       0.3417        False     
Sensor 8   0.2200      0.2200        False       0.5979        False`},commonPitfalls:["Menyamakan FDR dengan FWER, mengira bahwa FDR 5% berarti ada peluang 5% terjadinya kesalahan tunggal.","Menggunakan koreksi FWER pada data berdimensi tinggi yang berujung pada hilangnya penemuan ilmiah yang valid.","Mengabaikan ketergantungan korelasi kuat antar variabel dan memaksakan penggunaan BH standar padahal struktur korelasi menuntut BY."],validationProcedures:["Identifikasi tujuan penelitian: apakah studi konfirmatori (gunakan FWER) atau studi penemuan eksploratori/screening (gunakan FDR).","Periksa apakah p-value terurut memotong garis lurus kritis (k/m)*Q dari arah atas ke bawah.","Dokumentasikan nilai target Q dan algoritma spesifik yang digunakan dalam metodologi paper."],exercises:[{question:"Dalam konteks pengujian skala besar, apa keunggulan utama pengendalian False Discovery Rate (FDR) dibandingkan Family-Wise Error Rate (FWER)?",hint:"Perhatikan toleransi terhadap proporsi kesalahan kecil dan statistical power.",answerExplanation:"FDR mengontrol proporsi false discovery di antara seluruh temuan positif yang dideklarasikan, sehingga menghindari konservatisme ekstrem FWER pada studi eksploratori berdimensi tinggi dan meningkatkan kekuatan uji secara signifikan."}],references:[{citation:"Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: a practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B, 57(1), 289-300.",type:"peer-reviewed-article"},{citation:"Benjamini, Y., & Yekutieli, D. (2001). The control of the false discovery rate in multiple testing under dependency. The Annals of Statistics, 29(4), 1165-1188.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Paradigma False Discovery Rate (FDR)",bulletPoints:["FWER mengontrol P(V >= 1): tidak boleh ada satupun false positive.","FDR mengontrol E[V / R]: mengontrol proporsi kesalahan di antara seluruh temuan.","Tepat untuk riset eksploratori, bioinformatika, neuroimaging, dan sensor screening."],keyFormulaOrDiagram:"$$\\text{FDR} = E\\left[ \\frac{V}{R} \\;\\Big|\\; R > 0 \\right] P(R > 0)$$"},{slideNumber:2,title:"Algoritma Benjamini-Hochberg (BH)",bulletPoints:["Urutkan p-value naik: p_(1) <= p_(2) <= ... <= p_(m).","Bandingkan terhadap garis linier: (i / m) * Q.","Cari indeks terbesar k sedemikian sehingga p_(k) <= (k/m)*Q; tolak seluruh H_(1) s.d. H_(k)."],keyFormulaOrDiagram:"$$k^* = \\max \\left\\{ i \\;:\\; p_{(i)} \\le \\frac{i}{m} Q \\right\\}$$"}]},"3.6.4":{id:"3.6.4",chapterId:"CH-21",title:"Implementasi Koreksi Pengujian Jamak pada Analisis Data Skala Besar via Python",readingTimeMinutes:20,status:"verified",learningObjectives:["Membangun pipeline end-to-end analisis pengujian jamak menggunakan Python dan statsmodels.","Memvisualisasikan hasil pengujian jamak menggunakan Manhattan plot dan kurva p-value terurut vs ambang BH.","Menerapkan praktik terbaik pelaporan statistik untuk studi genomika, sensorik, dan machine learning."],content:`Dalam alur kerja analitik data rekayasa skala besar, peneliti berhadapan dengan data berdimensi tinggi di mana ribuan pengujian hipotesis dieksekusi secara otomatis oleh skrip komputasi. Mengimplementasikan koreksi pengujian jamak secara manual rentan terhadap kesalahan indeks pengurutan, pemotongan batas probabilitas, dan salah tafsir.

Library ekosistem ilmiah Python menyediakan pustaka standar industri melalui modul statsmodels.stats.multitest. Fungsi multipletests mendukung berbagai metode terverifikasi, mulai dari Bonferroni, Sidak, Holm, Holm-Sidak, hingga Benjamini-Hochberg (fdr_bh) dan Benjamini-Yekutieli (fdr_by).

Di samping menghasilkan keputusan biner tolak atau gagal tolak dan p-value yang disesuaikan, visualisasi grafik sangat krusial untuk mengaudit integritas inferensi. Dua format visualisasi standar yang diakui dalam komunitas ilmiah internasional adalah:
1. Plot Kurva Benjamini-Hochberg: Menampilkan p-value empiris terurut terhadap garis ambang kritis teoritis $(i/m) Q$. Titik potong terjauh menentukan batas deklarasi penemuan.
2. Manhattan Plot: Menggambarkan -log10(p-value) dari setiap variabel atau sensor di sepanjang indeks posisi, dilengkapi dengan garis horizontal batas ambang Bonferroni dan batas ambang FDR. Titik-titik di atas garis batas ini merepresentasikan kandidat penemuan yang terbukti tahan terhadap koreksi simultan.`,mathematicalFoundations:`1. Transformasi Skala Manhattan (-log10 P-Value):
Untuk mempermudah visualisasi nilai probabilitas yang sangat kecil:
$$y_i = -\\log_{10}(p_i)$$
Jika ambang signifikansi terkoreksi adalah $\\alpha_{\\text{cutoff}}$, maka garis batas horizontal digambarkan pada ketinggian:
$$y_{\\text{threshold}} = -\\log_{10}(\\alpha_{\\text{cutoff}})$$

2. Kriteria Titik Potong Benjamini-Hochberg:
Titik potong kritis $k^*$ ditentukan oleh:
$$k^* = \\max \\left\\{ i \\in \\{1, \\dots, m\\} \\;:\\; p_{(i)} \\le \\frac{i}{m} Q \\right\\}$$
Ambang p-value efektif (effective p-value threshold) untuk pengujian adalah:
$$p_{\\text{crit}} = p_{(k^*)}$$
Seluruh pengujian dengan $p_i \\le p_{\\text{crit}}$ dinyatakan signifikan pada tingkat FDR $Q$.`,workedExample:{problemStatement:"Pada pengujian stabilitas termal 1,000 titik pengukuran sensor pada turbin gas, diperoleh 1,000 nilai p-value. Terdapat 50 sensor dengan anomali termal nyata (sinyal kuat) dan 950 sensor dalam kondisi normal (noise). Bandingkan hasil deteksi antara tanpa koreksi (alpha=0.05), koreksi Bonferroni, dan koreksi Benjamini-Hochberg (Q=0.05).",stepByStepSolution:["Langkah 1: Kumpulkan p-value dari 1,000 sensor.","Langkah 2: Evaluasi tanpa koreksi (alpha = 0.05): Setiap sensor dengan p < 0.05 ditolak. Dari 950 sensor normal, diperkirakan terjadi 950 * 0.05 = 47 false positive.","Langkah 3: Evaluasi Bonferroni: Ambang kritis alpha_adj = 0.05 / 1000 = 0.00005. Jumlah false positive ditekan mendekati 0, namun sensor anomali dengan sinyal moderat (misal p = 0.0002) gagal terdeteksi (false negative tinggi).","Langkah 4: Evaluasi Benjamini-Hochberg: Cari indeks k terbesar sedemikian sehingga p_(k) <= (k/1000)*0.05. Sensor dengan sinyal moderat berhasil diselamatkan dengan jaminan false discovery rate maksimal 5% dari total sensor yang ditandai."],resultInterpretation:"Tanpa koreksi, deteksi dipenuhi oleh hampir 50 alarm palsu. Bonferroni terlalu ketat dan menghilangkan anomali nyata. Prosedur Benjamini-Hochberg memberikan titik optimal antara sensitivitas deteksi dan pengendalian kesalahan false positive."},pythonImplementation:{description:"Pipeline Python lengkap untuk pengujian jamak skala besar, perbandingan metode, dan audit hasil diagnostik.",libraryDependencies:["numpy","statsmodels","scipy.stats"],code:`import numpy as np
from statsmodels.stats.multitest import multipletests

np.random.seed(42)
m = 1000
m_signal = 50
m_noise = m - m_signal

p_noise = np.random.uniform(0, 1, size=m_noise)
p_signal = np.random.beta(0.3, 10.0, size=m_signal)
p_all = np.concatenate([p_signal, p_noise])
ground_truth = np.array([True] * m_signal + [False] * m_noise)

rej_raw = p_all < 0.05
rej_bonf, _, _, _ = multipletests(p_all, alpha=0.05, method='bonferroni')
rej_holm, _, _, _ = multipletests(p_all, alpha=0.05, method='holm')
rej_bh, p_bh, _, _ = multipletests(p_all, alpha=0.05, method='fdr_bh')

def hitung_metrik(rej, truth):
    tp = np.sum(rej & truth)
    fp = np.sum(rej & ~truth)
    fn = np.sum(~rej & truth)
    fdp = fp / np.maximum(tp + fp, 1)
    return tp, fp, fn, fdp

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Benchmark Pengujian Jamak 1000 Sensor")
print(f"{'Metode':<16}{'True Pos (TP)':<16}{'False Pos (FP)':<16}{'False Neg (FN)':<16}{'FDP Realisasi':<16}")
print("-" * 80)
for nama, rej in [('Raw (p < 0.05)', rej_raw), ('Bonferroni', rej_bonf), ('Holm', rej_holm), ('FDR (BH)', rej_bh)]:
    tp, fp, fn, fdp = hitung_metrik(rej, ground_truth)
    print(f"{nama:<16}{tp:<16}{fp:<16}{fn:<16}{fdp:<16.4f}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Benchmark Pengujian Jamak 1000 Sensor
Metode          True Pos (TP)   False Pos (FP)  False Neg (FN)  FDP Realisasi   
--------------------------------------------------------------------------------
Raw (p < 0.05)  49              47              1               0.4896          
Bonferroni      24              0               26              0.0000          
Holm            24              0               26              0.0000          
FDR (BH)        42              2               8               0.0455`},commonPitfalls:["Menjalankan fungsi multipletests pada data yang belum dibersihkan dari nilai p-value NaN atau tak terhingga.","Melaporkan p-value yang disesuaikan tanpa menyertakan nama metode koreksi spesifik dan paket perangkat lunak beserta versinya.","Mengabaikan pemeriksaan False Discovery Proportion teramati saat melakukan verifikasi simulasi metode baru."],validationProcedures:["Periksa apakah p-value masukan berada tepat dalam rentang tertutup [0, 1].","Verifikasi bahwa realisasi FDP pada data simulasi terkendali di bawah tingkat target Q (misal < 0.05).","Cantumkan script reproduktifitas lengkap untuk pemrosesan pengujian jamak pada lampiran artikel ilmiah."],exercises:[{question:"Berdasarkan hasil eksperimen 1,000 sensor di atas, mengapa metode FDR (BH) dianggap paling seimbang untuk deteksi anomali skala besar?",hint:"Perhatikan perbandingan True Positive, False Positive, dan False Discovery Proportion realisasi.",answerExplanation:"FDR berhasil mendeteksi 42 sinyal sejati dengan hanya 2 false positive, sehingga rasio kesalahan penemuan FDP = 2/(42+2) = 4.55%, terkendali tepat di bawah target Q = 5%, menjaga trade-off optimal antara sensitivitas dan spesifisitas."}],references:[{citation:"Seabold, S., & Perktold, J. (2010). statsmodels: Econometric and statistical modeling with python. In 9th Python in Science Conference.",type:"peer-reviewed-article"},{citation:"Storey, J. D. (2002). A direct approach to false discovery rates. Journal of the Royal Statistical Society: Series B, 64(3), 479-498.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Komparasi Kinerja Koreksi Jamak",bulletPoints:["Uji tanpa koreksi: 47 alarm palsu dari 950 data noise (FDP 48.96%).","Bonferroni/Holm: 0 alarm palsu, namun melewatkan 26 sinyal anomali sejati.","FDR (Benjamini-Hochberg): 42 sinyal tertangkap, hanya 2 alarm palsu (FDP 4.55%)."],keyFormulaOrDiagram:"$$\\text{FDP} = \\frac{\\text{False Positives}}{\\text{Total Discoveries}}$$"},{slideNumber:2,title:"Pipeline Praktis Python",bulletPoints:["Gunakan statsmodels.stats.multitest.multipletests sebagai engine standar.","Validasi input p-value: pastikan tidak ada nilai NaN atau out-of-range [0, 1].","Visualisasikan titik potong ambang kritis untuk transparansi ilmiah."]}]}};export{a as CH21_LESSONS};
