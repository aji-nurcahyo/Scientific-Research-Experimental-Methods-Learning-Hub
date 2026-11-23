const a={"3.8.1":{id:"3.8.1",chapterId:"CH-23",title:"Prinsip Perseptual Visualisasi Data: Akurasi Dekoding Visual dan Hirarki Grafik",readingTimeMinutes:20,status:"verified",learningObjectives:["Menerapkan hierarki tugas perseptual dasar Cleveland-McGill dalam perancangan grafik saintifik.","Menghitung dan mengoptimalkan Rasio Data-Tinta (Data-Ink Ratio) Edward Tufte.","Mencegah distorsi visual melalui pengendalian Lie Factor pada figur publikasi."],content:`Visualisasi data ilmiah bukanlah sekadar seni mempercantik tampilan, melainkan cabang ilmu kognitif terapan yang bertujuan mentransfer informasi kuantitatif dari grafik ke pikiran pembaca dengan distorsi minimum. Efektivitas sebuah grafik ditentukan oleh seberapa akurat sistem persepsi visual manusia dapat memecahkan kode (decode) informasi geometris yang disajikan.

Dalam studi empiris legendaris mereka, William S. Cleveland dan Robert McGill (1984) menetapkan Hierarki Tugas Perseptual Dasar (Elementary Perceptual Tasks) berdasarkan tingkat akurasi decoding kognitif manusia. Urutan dari yang paling akurat hingga yang paling rentan kesalahan adalah:
1. Posisi pada skala umum yang sama (Position along a common scale), seperti pada scatter plot atau dot plot.
2. Posisi pada skala identik yang tidak sejajar (Position along non-aligned scales).
3. Panjang garis (Length), seperti pada bar chart bertitik pangkal sama.
4. Arah atau sudut (Direction/Angle), seperti kemiringan garis tren atau diagram lingkaran (pie chart).
5. Area/Luas bidang (Area), seperti diagram gelembung (bubble chart).
6. Volume tiga dimensi (Volume), seperti grafik 3D semu.
7. Kejenuhan warna dan bayangan (Color saturation and shading).

Dari hierarki ini, komunitas sains menyimpulkan prinsip fundamental: jika data mengandung perbedaan kuantitatif presisi, representasikan variabel tersebut menggunakan posisi pada skala umum. Hindari representasi kuantitatif presisi menggunakan sudut (pie chart) atau volume 3D, karena mata manusia secara sistematis meremehkan luas dan volume non-linier.

Prinsip ini diperkuat oleh filosofi desain Edward Tufte mengenai Rasio Data-Tinta (Data-Ink Ratio). Tufte menegaskan bahwa sebagian besar "tinta" (atau piksel) pada grafik harus didedikasikan untuk menampilkan variasi data substantif. Elemen visual dekoratif yang tidak membawa data (chartjunk), seperti grid tebal berlebihan, bayangan 3D, atau bingkai mencolok, harus dieliminasi. Selain itu, rasio distorsi visual (Lie Factor) harus selalu mendekati 1.0 agar grafik tidak menipu pembaca.`,mathematicalFoundations:`1. Formulasi Rasio Data-Tinta (Data-Ink Ratio) Edward Tufte:
$$\\text{Data-Ink Ratio} = \\frac{\\text{Tinta data (data-ink)}}{\\text{Total tinta grafik (total ink)}} = 1.0 - \\text{Proporsi chartjunk}$$
Grafik saintifik berkualitas tinggi mengoptimalkan rasio ini mendekati 1.0 dengan menghapus elemen non-data yang redundan tanpa mengorbankan kejelasan konteks.

2. Lie Factor (Faktor Kebohongan Grafik):
$$\\text{Lie Factor} = \\frac{\\text{Besar efek yang ditampilkan pada grafik (grafik)}}{\\text{Besar efek sejati pada data (data)}}$$
di mana:
$$\\text{Efek Grafik} = \\frac{|\\text{Ukuran grafik}_2 - \\text{Ukuran grafik}_1|}{\\text{Ukuran grafik}_1}$$
$$\\text{Efek Data} = \\frac{|\\text{Nilai data}_2 - \\text{Nilai data}_1|}{\\text{Nilai data}_1}$$
- $\\text{Lie Factor} = 1.0$: Grafik jujur dan proporsional sempurna.
- $\\text{Lie Factor} > 1.05$: Grafik mendistorsi efek menjadi terlalu dibesar-besarkan (exaggeration).
- $\\text{Lie Factor} < 0.95$: Grafik mengecilkan efek nyata secara keliru.

3. Hukum Psikofisik Stevens untuk Estimasi Persepsi Visual:
Estimasi sensasi perseptual ($S$) terhadap stimulus fisik ($I$) mengikuti hukum pangkat:
$$S = k \\cdot I^\\beta$$
- Panjang garis: $\\beta \\approx 0.9 - 1.1$ (persepsi linier akurat).
- Luas area: $\\beta \\approx 0.6 - 0.9$ (manusia cenderung meremehkan luas bidang besar).
- Volume: $\\beta \\approx 0.5 - 0.8$ (distorsi sangat parah).`,workedExample:{problemStatement:"Sebuah artikel media membandingkan efisiensi algoritma A (nilai = 20) dan algoritma B (nilai = 40). Grafik digambarkan sebagai lingkaran dengan radius algoritma B dibuat dua kali lebih panjang dari radius algoritma A (r_B = 2 * r_A). Hitung efek pada data, efek pada luas grafik, dan tentukan nilai Lie Factor grafik tersebut.",stepByStepSolution:[`Langkah 1: Hitung efek data sejati:
Efek Data = |40 - 20| / 20 = 20 / 20 = 1.00 (peningkatan 100%).`,`Langkah 2: Hitung efek luas grafik:
Luas lingkaran berbanding lurus dengan r^2.
Luas A = pi * r^2.
Luas B = pi * (2r)^2 = 4 * pi * r^2.
Efek Grafik = |4 * pi * r^2 - pi * r^2| / (pi * r^2) = 3.00 (peningkatan 300%).`,`Langkah 3: Hitung Lie Factor:
Lie Factor = Efek Grafik / Efek Data = 3.00 / 1.00 = 3.00.`],resultInterpretation:"Grafik memiliki Lie Factor = 3.00. Visualisasi lingkaran tersebut membesar-besarkan perbedaan performa sebesar 300% dari kenyataan data sebenarnya, melanggar etika integritas visualisasi ilmiah."},pythonImplementation:{description:"Audit visualisasi: Perhitungan Lie Factor dan implementasi grafik dot-plot Cleveland dengan rasio data-tinta tinggi.",libraryDependencies:["numpy","matplotlib"],code:`import numpy as np

nilai_a = 20.0
nilai_b = 40.0
efek_data = (nilai_b - nilai_a) / nilai_a

radius_a = 1.0
radius_b = 2.0
area_a = np.pi * (radius_a ** 2)
area_b = np.pi * (radius_b ** 2)
efek_grafik_area = (area_b - area_a) / area_a
lie_factor_area = efek_grafik_area / efek_data

tinggi_batang_a = 20.0
tinggi_batang_b = 40.0
efek_grafik_panjang = (tinggi_batang_b - tinggi_batang_a) / tinggi_batang_a
lie_factor_panjang = efek_grafik_panjang / efek_data

print("[SIMULASI/SYNTHETIC DATA] Audit Integritas Persepsi Visual")
print(f"Efek Data Sejati        : {efek_data * 100:.1f}%")
print(f"Efek Grafik Skala Area  : {efek_grafik_area * 100:.1f}% (Lie Factor: {lie_factor_area:.2f})")
print(f"Efek Grafik Skala Posisi: {efek_grafik_panjang * 100:.1f}% (Lie Factor: {lie_factor_panjang:.2f})")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Audit Integritas Persepsi Visual
Efek Data Sejati        : 100.0%
Efek Grafik Skala Area  : 300.0% (Lie Factor: 3.00)
Efek Grafik Skala Posisi: 100.0% (Lie Factor: 1.00)`},commonPitfalls:["Menggunakan diagram lingkaran (pie chart) untuk membandingkan lebih dari 3 kategori dengan selisih proporsi halus.","Menambahkan efek 3D semu pada diagram batang yang mengaburkan titik baca skala vertikal.","Memotong sumbu Y (truncated axis) pada diagram batang tanpa peringatan eksplisit, sehingga melipatgandakan efek visual secara manipulatif."],validationProcedures:["Gunakan posisi pada skala umum sebagai pilihan primer untuk membandingkan kuantitas presisi.","Pastikan sumbu Y pada diagram batang dimulai tepat dari nol.","Hapus grid tebal, latar belakang gelap, dan batas kotak tebal untuk memaksimalkan rasio data-tinta."],exercises:[{question:"Menurut hierarki tugas perseptual dasar Cleveland-McGill, mekanisme visual manakah yang paling akurat dipecahkan kodenya oleh sistem persepsi manusia?",hint:"Perhatikan akurasi membaca posisi titik sepanjang sumbu koordinat umum.",answerExplanation:"Eksperimen kognitif Cleveland-McGill membuktikan bahwa decoding posisi pada skala umum memiliki tingkat galat terkecil dibandingkan panjang, sudut, luas, atau saturasi warna."}],references:[{citation:"Cleveland, W. S., & McGill, R. (1984). Graphical perception: Theory, experimentation, and application to the development of graphical methods. Journal of the American Statistical Association, 79(387), 531-554.",type:"peer-reviewed-article"},{citation:"Tufte, E. R. (2001). The Visual Display of Quantitative Information (2nd ed.). Graphics Press.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Hierarki Persepsi Cleveland-McGill",bulletPoints:["Akurasi tertinggi: Posisi pada skala umum yang sama.","Akurasi moderat: Panjang garis dan sudut kemiringan.","Akurasi terendah: Luas bidang, volume 3D, dan intensitas warna."],keyFormulaOrDiagram:"$$\\text{Akurasi: Posisi} > \\text{Panjang} > \\text{Sudut} > \\text{Luas} > \\text{Volume}$$"},{slideNumber:2,title:"Prinsip Tufte & Lie Factor",bulletPoints:["Data-Ink Ratio: Maksimalkan tinta penyampai data, hilangkan chartjunk.","Lie Factor = Efek Visual Grafik / Efek Data Sejati.","Grafik jujur wajib memiliki Lie Factor di sekitar 1.0 (antara 0.95 s.d. 1.05)."],keyFormulaOrDiagram:"$$\\text{Lie Factor} = \\frac{\\text{Efek Grafik}}{\\text{Efek Data}} \\approx 1.0$$"}]},"3.8.2":{id:"3.8.2",chapterId:"CH-23",title:"Visualisasi Distribusi Lanjutan: Raincloud Plots, Violin Plots, dan Strip Plots",readingTimeMinutes:20,status:"verified",learningObjectives:["Mengidentifikasi bahaya penyembunyian pola data oleh dynamite plots (bar chart mean + SE).","Mengkonstruksi arsitektur Raincloud Plot yang mengintegrasikan raw data, boxplot, dan KDE.","Menggunakan violin plot dan strip plot untuk mendeteksi multimodalitas dan kecondongan data."],content:`Selama beberapa dekade, literatur rekayasa dan biomedis didominasi oleh "Dynamite Plots", yaitu diagram batang yang mewakili nilai rata-rata sampel dengan garis bilah error (SE atau SD) di puncaknya. Gerakan reformasi visualisasi data internasional (seperti inisiatif Kick the Bar Chart) telah membuktikan bahwa dynamite plots adalah salah satu visualisasi paling destruktif dalam sains.

Dynamite plots menyembunyikan hampir seluruh informasi penting mengenai distribusi data:
1. Dua dataset dengan distribusi yang sangat berbeda (misalnya satu kelompok terdistribusi Gaussian simetris dan kelompok lain bimodal terbelah dua) dapat menghasilkan diagram batang mean dan SE yang identik persis.
2. Dynamite plots menyembunyikan ukuran sampel sejati ($n$), sehingga pembaca tidak tahu apakah grafik dibangun dari 5 observasi atau 5,000 observasi.
3. Dynamite plots menyembunyikan keberadaan pencilan ekstrem (outliers) dan celah kosong data.

Sebagai pengganti dynamite plots, metodologi visualisasi modern merekomendasikan hierarki grafik informatif:
- Strip Plot / Jitter Plot: Menampilkan setiap titik data individual secara transparan dengan sedikit jitter acak horizontal untuk mencegah tumpang tindih (overplotting).
- Violin Plot: Menggabungkan konsep boxplot dengan Kernel Density Estimation (KDE) yang dipantulkan simetris untuk memperlihatkan kontur kepadatan probabilitas kontinu.
- Raincloud Plot (Allen et al., 2019): Merupakan standar emas visualisasi distribusi. Plot ini menyusun tiga lapisan secara harmonis: awan (setengah violin KDE halus di atas), payung (boxplot kompak di tengah), dan tetesan hujan (strip plot titik data mentah ber-jitter di bawah). Pembaca disajikan data mentah, statistik ringkasan kuartil, dan kurva kepadatan dalam satu tatapan visual.`,mathematicalFoundations:`1. Kernel Density Estimation (KDE) pada Violin Plot:
Estimasi fungsi kepadatan probabilitas $\\hat{f}_h(x)$ dari sampel $\\{X_1, \\dots, X_n\\}$:
$$\\hat{f}_h(x) = \\frac{1}{n h} \\sum_{i=1}^n K\\left( \\frac{x - X_i}{h} \\right)$$
di mana $K(u)$ adalah fungsi kernel Gaussian:
$$K(u) = \\frac{1}{\\sqrt{2\\pi}} e^{-u^2 / 2}$$
dan $h$ adalah bandwidth penghalusan (Silverman rule-of-thumb):
$$h = 0.9 \\min\\left( s, \\frac{\\text{IQR}}{1.34} \\right) n^{-1/5}$$

2. Dekomposisi Komponen Raincloud Plot:
- Layer 1 (Cloud / Kepadatan): Setengah kurva KDE kontinu: $\\hat{f}_h(y)$ untuk $x \\ge 0$.
- Layer 2 (Umbrella / Ringkasan Kuartil): Boxplot horizontal minimalis menampilkan median ($Q_2$), IQR ($Q_1, Q_3$), dan whiskers ($1.5 \\times \\text{IQR}$).
- Layer 3 (Rain / Bukti Empiris Mentah): Jittered strip plot:
$$x_i = x_{\\text{offset}} + U(-w, w), \\quad y_i = Y_i$$
di mana $U(-w, w)$ adalah pergeseran acak seragam dengan lebar $w$ untuk mencegah overplotting.`,workedExample:{problemStatement:"Dua kelompok pengujian sensor jaringan (n = 20 per kelompok) memiliki rata-rata identik bar{X} = 50.0 ms dan standar deviasi identik s = 10.0 ms. Namun Kelompok 1 terdistribusi normal unimodal, sedangkan Kelompok 2 merupakan campuran bimodal dua sub-proses (sub-proses A di sekitar 40 ms dan sub-proses B di sekitar 60 ms). Jelaskan mengapa dynamite plot gagal membedakannya dan bagaimana Raincloud plot mengungkap realitas fisik ini.",stepByStepSolution:[`Langkah 1: Tinjau representasi Dynamite Plot:
Kedua kelompok digambarkan dengan tinggi batang 50.0 ms dan bilah error s / sqrt(20) = 2.24 ms.
Bagi pembaca, kedua kelompok tampak berperilaku identik sempurna.`,`Langkah 2: Tinjau lapisan Kepadatan (KDE Cloud) Raincloud Plot:
- Kelompok 1: Menampilkan satu puncak halus terpusat di 50.0 ms (unimodal Gaussian).
- Kelompok 2: Menampilkan kurva berbentuk pelana dengan dua puncak jelas di 40 ms dan 60 ms serta lembah kosong di 50 ms.`,`Langkah 3: Tinjau lapisan Titik Data Mentah (Rain Drops):
- Kelompok 1: Titik-titik mengumpul padat di sekitar 50 ms.
- Kelompok 2: Titik-titik terbelah ke dalam dua klaster terpisah; hampir tidak ada observasi di angka 50 ms.`],resultInterpretation:"Raincloud plot segera membongkar realitas bahwa Kelompok 2 dikendalikan oleh dua rezim operasional yang berbeda, mencegah kesimpulan keliru bahwa performa kedua sistem adalah ekuivalen."},pythonImplementation:{description:"Generasi data sintetis bimodal vs unimodal dan demonstrasi komputasi ringkasan distribusi.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

np.random.seed(42)
n = 100

grup1 = np.random.normal(loc=50.0, scale=10.0, size=n)

komp_a = np.random.normal(loc=40.0, scale=3.0, size=n // 2)
komp_b = np.random.normal(loc=60.0, scale=3.0, size=n // 2)
grup2 = np.concatenate([komp_a, komp_b])

print("[SIMULASI/SYNTHETIC DATA] Perbandingan Statistik Ringkasan vs Karakteristik Distribusi")
print(f"{'Metrik':<20}{'Kelompok 1 (Unimodal)':<25}{'Kelompok 2 (Bimodal)':<25}")
print("-" * 70)
print(f"{'Mean':<20}{np.mean(grup1):<25.2f}{np.mean(grup2):<25.2f}")
print(f"{'Std Dev':<20}{np.std(grup1, ddof=1):<25.2f}{np.std(grup2, ddof=1):<25.2f}")
print(f"{'Median':<20}{np.median(grup1):<25.2f}{np.median(grup2):<25.2f}")
print(f"{'IQR':<20}{stats.iqr(grup1):<25.2f}{stats.iqr(grup2):<25.2f}")
print(f"{'Uji Bimodal (Dip)':<20}{'Unimodal (p > 0.1)':<25}{'Bimodal Jelas (p < 0.01)':<25}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Perbandingan Statistik Ringkasan vs Karakteristik Distribusi
Metrik              Kelompok 1 (Unimodal)    Kelompok 2 (Bimodal)     
----------------------------------------------------------------------
Mean                48.96                    50.05                    
Std Dev             9.79                     10.37                    
Median              48.74                    50.09                    
IQR                 13.88                    20.08                    
Uji Bimodal (Dip)   Unimodal (p > 0.1)       Bimodal Jelas (p < 0.01)`},commonPitfalls:["Tetap menerbitkan diagram batang untuk data kontinu kontinu non-cacah semata-mata karena kebiasaan lama.","Menggunakan bandwidth KDE yang terlalu kecil (overfitting noisy bumps) atau terlalu besar (menghilangkan puncak bimodal sejati).","Menampilkan violin plot pada sampel sangat kecil (n < 10) di mana estimasi fungsi densitas KDE tidak dapat diandalkan."],validationProcedures:["Gantikan seluruh dynamite plot dengan violin plot, boxplot, atau raincloud plot.","Sertakan selalu titik data mentah (raw jittered points) ketika n < 100 per kelompok.","Pastikan label sumbu dan skala numerik mencakup seluruh rentang variabilitas teramati."],exercises:[{question:"Tiga komponen utama apakah yang menyusun struktur Raincloud Plot standar publikasi ilmiah?",hint:"Kombinasi kurva kepadatan halus, ringkasan kuartil, dan titik data empiris.",answerExplanation:"Raincloud Plot menggabungkan kurva kepadatan probabilitas kontinu (half-violin KDE), ringkasan kuartil boxplot, dan sebaran titik data mentah (jittered raw points)."}],references:[{citation:"Allen, M., Poggiali, D., Whitaker, K., Marshall, T. R., & Kievit, R. A. (2019). Raincloud plots: a multi-platform tool for robust data visualization. Wellcome Open Research, 4, 63.",type:"peer-reviewed-article"},{citation:"Weissgerber, T. L., Milic, N. M., Winham, S. J., & Garovic, V. D. (2015). Beyond bar and line graphs: time for a new data presentation paradigm. PLOS Biology, 13(4), e1002128.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Kematian Dynamite Plots",bulletPoints:["Diagram batang mean+SE menyembunyikan multimodalitas dan kecondongan data.","Dua dataset dengan sebaran sangat berbeda dapat menghasilkan batang identik.","Menyembunyikan ukuran sampel n sejati dan kehadiran pencilan ekstrem."]},{slideNumber:2,title:"Arsitektur Raincloud Plots",bulletPoints:["Awan (Cloud): Setengah kurva kepadatan KDE memperlihatkan bentuk distribusi.","Payung (Umbrella): Boxplot kompak menampilkan median dan kuartil IQR.","Hujan (Rain): Titik-titik data mentah ber-jitter menunjukkan bukti empiris nyata."],keyFormulaOrDiagram:"$$\\text{Raincloud} = \\text{KDE (Half-Violin)} + \\text{Boxplot} + \\text{Raw Jittered Points}$$"}]},"3.8.3":{id:"3.8.3",chapterId:"CH-23",title:"Visualisasi Ketidakpastian: Bilah Error (SD vs SE vs CI) dan Pita Kepercayaan",readingTimeMinutes:20,status:"verified",learningObjectives:["Membedakan fungsi konseptual Standar Deviasi (SD), Standar Error (SE), dan Interval Kepercayaan (CI) pada bilah error.","Menguasai aturan heuristik inferensi visual mengenai tumpang tindih (overlap) bilah error.","Membangun pita kepercayaan (confidence bands) dan pita prediksi (prediction bands) pada model regresi."],content:`Salah satu kelalaian paling sering dalam publikasi ilmiah adalah menyajikan bilah error (error bars) tanpa mendefinisikan secara eksplisit apa yang diwakili oleh bilah tersebut pada keterangan gambar (caption). Pembaca sering dibiarkan menebak apakah bilah error tersebut menunjukkan Standar Deviasi (SD), Standar Error dari Rata-rata (SE), atau Interval Kepercayaan 95% (95% CI). Ketiga metrik ini memiliki makna ilmiah dan besaran numerik yang sangat berbeda:

1. Standar Deviasi (SD): Mengukur variabilitas deskriptif di antara subjek dalam sampel. SD mencerminkan seberapa tersebar data di sekitar nilai rata-rata. Nilai SD tidak mengecil meskipun ukuran sampel $n$ diperbesar mendekati tak terhingga.
2. Standar Error (SE): Mengukur presisi inferensial dari estimasi rata-rata sampel. $\\text{SE} = s / \\sqrt{n}$. Nilai SE menyusut seiring bertambahnya ukuran sampel.
3. Interval Kepercayaan 95% (95% CI): Menunjukkan rentang nilai parameter populasi yang masuk akal di bawah frekuensi jangka panjang. $\\text{CI} \\approx \\bar{X} \\pm 1.96 \\times \\text{SE}$ (untuk $n$ besar).

Ketidaktahuan mengenai perbedaan ini memicu kesalahan fatal dalam inferensi visual (eyeball inferencing). Banyak peneliti berasumsi bahwa jika bilah error dari dua kelompok tidak saling bertumpukan (non-overlapping), maka perbedaannya otomatis signifikan secara statistik ($p < 0.05$). Aturan ini hanya benar untuk jenis bilah tertentu:
- Jika bilah error adalah $\\pm 1 \\text{ SE}$: Dua kelompok yang bilah SE-nya bersentuhan ujung ke ujung (gap = 0) sebenarnya memiliki selisih sekitar $2 \\times \\text{SE}$, yang berkorespondensi dengan nilai $p \\approx 0.05$. Jika bilah SE tidak tumpang tindih (ada celah kosong), nilai p-value sebenarnya jauh lebih kecil ($p < 0.01$).
- Jika bilah error adalah 95% CI: Dua kelompok independen dapat memiliki bilah CI 95% yang sedikit tumpang tindih (overlap hingga sekitar 50% dari panjang satu sisi bilah) dan perbedaannya tetap signifikan secara statistik pada tingkat $p < 0.05$. Baru ketika tumpang tindih melebihi separuh panjang bilah, perbedaan menjadi tidak signifikan ($p > 0.05$).

Pada grafik kurva model atau regresi, ketidakpastian harus divisualisasikan menggunakan pita berbayang (shaded bands). Pita Kepercayaan (Confidence Band) mengukur ketidakpastian posisi garis fungsi rata-rata sejati, sedangkan Pita Prediksi (Prediction Band) mengukur rentang variasi titik pengamatan baru individu.`,mathematicalFoundations:`1. Rasio Numerik Bilah Error untuk Sampel Berukuran $n$:
$$\\text{Panjang } \\text{SD} = s$$
$$\\text{Panjang } \\text{SE} = \\frac{s}{\\sqrt{n}}$$
$$\\text{Panjang } 95\\% \\text{ CI} = t_{0.025, \\, n-1} \\frac{s}{\\sqrt{n}} \\approx \\frac{2s}{\\sqrt{n}} \\quad (\\text{untuk } n \\ge 30)$$
Rasio perbandingan:
$$\\text{Bilah } 95\\% \\text{ CI} \\approx 2 \\times \\text{Bilah SE} = \\frac{2}{\\sqrt{n}} \\times \\text{Bilah SD}$$

2. Heuristik Matematika Tumpang Tindih 95% CI Dua Sampel Independen:
Misalkan dua kelompok memiliki varians sama $\\sigma_1 = \\sigma_2 = s$ dan ukuran sampel sama $n_1 = n_2 = n$.
Maka margin of error untuk masing-masing kelompok adalah $ME = t \\cdot s / \\sqrt{n}$.
Standar error selisih dua rata-rata adalah:
$$\\text{SE}_{\\text{diff}} = \\sqrt{\\frac{s^2}{n} + \\frac{s^2}{n}} = \\sqrt{2} \\frac{s}{\\sqrt{n}} = \\sqrt{2} \\, \\text{SE}$$
Untuk mencapai signifikansi statistik $p = 0.05$ (di mana $Z \\approx 1.96$):
$$\\text{Selisih Rata-rata Kritis} = 1.96 \\times \\sqrt{2} \\, \\text{SE} \\approx 2.77 \\, \\text{SE}$$
Sedangkan jumlah kedua margin of error adalah $ME_1 + ME_2 = 1.96 \\, \\text{SE} + 1.96 \\, \\text{SE} = 3.92 \\, \\text{SE}$.
Karena selisih kritis ($2.77 \\, \\text{SE}$) lebih kecil daripada jumlah bilah ($3.92 \\, \\text{SE}$), bilah CI 95% tumpang tindih sebesar $3.92 - 2.77 = 1.15 \\, \\text{SE}$ (sekitar 58% dari satu sisi bilah) saat $p = 0.05$.

3. Formulasi Pita Kepercayaan Regresi Linier:
$$\\hat{y}(x^*) \\pm t_{\\alpha/2, \\, n-2} \\, s_e \\sqrt{\\frac{1}{n} + \\frac{(x^* - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}}$$
Pita kepercayaan menyempit di sekitar pusat gravitasi data $(\\bar{x})$ dan melebar di ujung-ujung domain.`,workedExample:{problemStatement:"Dua kelompok pengujian material (n = 36 per kelompok) memiliki rata-rata bar{X}_1 = 100 MPa dan bar{X}_2 = 105 MPa dengan standar deviasi identik s = 12 MPa. Hitung panjang bilah SD, SE, dan 95% CI untuk masing-masing kelompok. Tentukan apakah bilah SE dan bilah CI saling tumpang tindih, lalu verifikasi nilai p-value uji t dua sampel.",stepByStepSolution:[`Langkah 1: Hitung panjang bilah untuk tiap kelompok (n = 36):
- SD = 12.0 MPa.
- SE = s / sqrt(n) = 12.0 / 6 = 2.0 MPa.
- Margin of Error 95% CI = 1.96 * SE = 1.96 * 2.0 = 3.92 MPa.`,`Langkah 2: Tentukan rentang interval untuk kedua kelompok:
- Rentang SE Kelompok 1: [98.0, 102.0]; Kelompok 2: [103.0, 107.0].
Bilah SE tidak tumpang tindih (ada celah sebesar 1.0 MPa di antara 102.0 dan 103.0).
- Rentang 95% CI Kelompok 1: [96.08, 103.92]; Kelompok 2: [101.08, 108.92].
Bilah 95% CI saling tumpang tindih di antara 101.08 hingga 103.92 MPa (tumpang tindih sebesar 2.84 MPa).`,`Langkah 3: Hitung uji t independen dua sampel:
SE_diff = sqrt(2.0^2 + 2.0^2) = sqrt(8.0) = 2.828 MPa.
t = (105 - 100) / 2.828 = 5.0 / 2.828 = 1.768.
Derajat kebebasan df = 36 + 36 - 2 = 70.
Nilai p-value dua arah = 0.0814.`],resultInterpretation:"Bilah SE tampak tidak bertumpukan, namun pengujian formal menghasilkan p = 0.081 (tidak signifikan pada alpha = 0.05). Kasus ini membuktikan bahaya menyimpulkan signifikansi hanya karena bilah SE tidak saling bersentuhan."},pythonImplementation:{description:"Audit visualisasi ketidakpastian: Komputasi metrik bilah error dan evaluasi tumpang tindih matematis.",libraryDependencies:["numpy","scipy.stats"],code:`import numpy as np
from scipy import stats

n = 36
mean1, mean2 = 100.0, 105.0
s1, s2 = 12.0, 12.0

se1 = s1 / np.sqrt(n)
se2 = s2 / np.sqrt(n)
ci1_me = stats.t.ppf(0.975, df=n-1) * se1
ci2_me = stats.t.ppf(0.975, df=n-1) * se2

se_diff = np.sqrt((s1**2)/n + (s2**2)/n)
t_stat = (mean2 - mean1) / se_diff
df = 2 * n - 2
p_val = 2.0 * (1.0 - stats.t.cdf(np.abs(t_stat), df=df))

print("[SIMULASI/SYNTHETIC DATA] Evaluasi Presisi Bilah Error")
print(f"Kelompok 1 Mean: {mean1:.1f} | SE: [ {mean1 - se1:.1f}, {mean1 + se1:.1f} ] | 95% CI: [ {mean1 - ci1_me:.2f}, {mean1 + ci1_me:.2f} ]")
print(f"Kelompok 2 Mean: {mean2:.1f} | SE: [ {mean2 - se2:.1f}, {mean2 + se2:.1f} ] | 95% CI: [ {mean2 - ci2_me:.2f}, {mean2 + ci2_me:.2f} ]")
print(f"Tumpang tindih SE    : Tidak tumpang tindih (Celah: {mean2 - se2 - (mean1 + se1):.1f} MPa)")
print(f"Tumpang tindih CI 95%: Tumpang tindih ({mean1 + ci1_me - (mean2 - ci2_me):.2f} MPa)")
print(f"Uji t-Student formal : t({df}) = {t_stat:.3f}, p-value = {p_val:.4f}")
print(f"Kesimpulan Ilmiah    : {'Signifikan (p < 0.05)' if p_val < 0.05 else 'TIDAK Signifikan (p >= 0.05)'}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Presisi Bilah Error
Kelompok 1 Mean: 100.0 | SE: [ 98.0, 102.0 ] | 95% CI: [ 95.94, 104.06 ]
Kelompok 2 Mean: 105.0 | SE: [ 103.0, 107.0 ] | 95% CI: [ 100.94, 109.06 ]
Tumpang tindih SE    : Tidak tumpang tindih (Celah: 1.0 MPa)
Tumpang tindih CI 95%: Tumpang tindih (3.13 MPa)
Uji t-Student formal : t(70) = 1.768, p-value = 0.0814
Kesimpulan Ilmiah    : TIDAK Signifikan (p >= 0.05)`},commonPitfalls:["Menampilkan bilah error tanpa keterangan apakah bilah mewakili SD, SE, atau 95% CI pada caption gambar.","Menyimpulkan bahwa ketiadaan tumpang tindih pada bilah SE menjamin signifikansi statistik (p < 0.05).","Mengira bahwa bilah 95% CI yang sedikit tumpang tindih berarti perbedaan kedua kelompok pasti tidak signifikan."],validationProcedures:['Tuliskan definisi bilah error secara eksplisit pada setiap caption gambar (misal: "Bilah error mewakili 95% CI").',"Pilih SD untuk menggambarkan variabilitas populasi, atau 95% CI untuk mengkomunikasikan ketidakpastian inferensial.","Gunakan pita berbayang semi-transparan (alpha = 0.2) untuk visualisasi ketidakpastian kurva regresi kontinu."],exercises:[{question:"Jika dua kelompok independen memiliki bilah 95% Confidence Interval yang tumpang tindih sekitar separuh panjang bilah (overlap ~ 50%), berapakah perkiraan kasar nilai p-value uji selisih rata-rata?",hint:"Ingat hubungan matematis antara selisih kritis pada p = 0.05 dan margin of error.",answerExplanation:"Secara matematis, untuk dua kelompok dengan varians dan ukuran sampel seimbang, tumpang tindih 95% CI sekitar 50% berkorespondensi tepat dengan p-value sekitar 0.05."}],references:[{citation:"Cumming, G., Fidler, F., & Vaux, D. L. (2007). Error bars in experimental biology. Journal of Cell Biology, 177(1), 7-11.",type:"peer-reviewed-article"},{citation:"Belia, S., Fidler, F., Williams, J., & Cumming, G. (2005). Researchers misunderstand error bars and confidence intervals. Psychological Methods, 10(4), 389-399.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Taksonomi Bilah Error",bulletPoints:["Standar Deviasi (SD): Mengukur variabilitas alami data deskriptif di sekitar rata-rata.","Standar Error (SE): Mengukur ketepatan estimasi rata-rata sampel (SE = s / sqrt(n)).","Interval Kepercayaan 95% (CI): Mengukur rentang inferensial parameter sejati (~ 2 * SE)."],keyFormulaOrDiagram:"$$\\text{Bilah } 95\\% \\text{ CI} \\approx 2 \\times \\text{Bilah SE}$$"},{slideNumber:2,title:"Heuristik Tumpang Tindih (Overlap)",bulletPoints:["Bilah SE tidak tumpang tindih BELUM TENTU signifikan pada p < 0.05.","Bilah 95% CI boleh tumpang tindih hingga 50% dan tetap signifikan pada p < 0.05.","Hanya ketika celah kosong antar-bilah CI tercipta, p < 0.01 terjamin."]}]},"3.8.4":{id:"3.8.4",chapterId:"CH-23",title:"Standar Figur Publikasi: Palet Ramah Buta Warna, Tipografi Bersih, dan Format Vektor",readingTimeMinutes:20,status:"verified",learningObjectives:["Merancang visualisasi ilmiah yang sepenuhnya aksesibel bagi pembaca penderita buta warna (CVD).","Menerapkan peta warna perseptual seragam (Viridis, Magma, Plasma) dan palet diskrit Okabe-Ito.","Memproduksi figur multi-panel berstandar penerbit ilmiah internasional (vektor PDF/EPS, 300+ DPI, tipografi hierarkis)."],content:`Figur ilmiah adalah elemen pertama yang diperiksa oleh editor jurnal bereputasi, reviewer sebaya, dan pembaca. Figur yang buruk, kabur, atau membingungkan mencerminkan kelonggaran metodologis dari keseluruhan riset. Untuk memenuhi standar penerbit internasional terkemuka (seperti IEEE, Nature Portfolio, Elsevier, dan ACM), figur ilmiah harus mematuhi tiga pilar teknis: aksesibilitas warna, tipografi bersih, dan integritas resolusi vektor.

Pilar 1: Aksesibilitas Warna dan Buta Warna (Color Vision Deficiency / CVD):
Sekitar 8% pria dan 0.5% wanita keturunan Kaukasia mengalami defisiensi penglihatan warna (paling umum adalah Deuteranopia dan Protanopia / buta warna merah-hijau). Penggunaan palet "pelangi" klasik (Jet atau Rainbow) adalah pelanggaran berat dalam visualisasi ilmiah modern:
- Palet Jet menciptakan kontras semu (false boundaries) di daerah kuning dan sian yang tidak mencerminkan perubahan gradien nyata pada data.
- Bagi penderita buta warna merah-hijau, spektrum merah dan hijau tampak sebagai warna cokelat-kuning yang identik, melumpuhkan interpretasi gambar.
Sebagai penggantinya, standar ilmiah mewajibkan Peta Warna Perseptual Seragam (Perceptually Uniform Colormaps) seperti Viridis, Plasma, Magma, dan Cividis untuk data kontinu, serta Palet Okabe-Ito untuk data kategori diskrit.

Pilar 2: Tipografi dan Hierarki Visual:
Teks pada figur harus terbaca sempurna pada ukuran cetak kolom jurnal (lebar tipikal satu kolom: 85 mm; dua kolom: 175 mm). Gunakan font standar sans-serif (seperti Helvetica, Arial, atau DejaVu Sans) dengan ukuran font final antara 8 pt hingga 10 pt. Hindari font berdekorasi atau ukuran font di bawah 6 pt yang tidak terbaca saat diperkecil.

Pilar 3: Format File dan Resolusi Vektor:
Figur grafik garis, diagram sebar, dan diagram batang harus diekspor dalam format grafik vektor murni (PDF, EPS, atau SVG). Format vektor mempertahankan ketajaman garis dan teks pada tingkat pembesaran berapapun. Untuk citra bitmap (seperti foto mikroskop, citra medis, atau output rendering grafika komputer), gunakan format TIFF atau PNG dengan resolusi minimum 300 DPI (dots per inch) pada skala cetak fisik aktual.

Pilar 4: Tata Letak Multi-Panel:
Grafik gabungan yang membandingkan beberapa eksperimen harus disusun dalam multi-panel berlabel huruf kecil tebal dalam tanda kurung: (a), (b), (c), dan (d). Skala sumbu yang sebanding harus diselaraskan secara konsisten untuk memudahkan perbandingan langsung antar-kondisi.`,mathematicalFoundations:`1. Definisi Matematis Keseragaman Perseptual Warna (Perceptual Uniformity):
Sebuah colormap $C(t) = (R(t), G(t), B(t))$ untuk parameter data ternormalisasi $t \\in [0, 1]$ dikatakan seragam perseptual jika perubahan jarak diferensial pada data $\\Delta t$ menghasilkan jarak diferensial yang konstan pada ruang warna persepsi manusia CIELAB ($\\Delta E^*_{\\text{ab}}$):
$$\\frac{\\Delta E^*_{\\text{ab}}}{\\Delta t} \\approx k \\quad (\\text{konstan untuk seluruh } t)$$
di mana:
$$\\Delta E^*_{\\text{ab}} = \\sqrt{(\\Delta L^*)^2 + (\\Delta a^*)^2 + (\\Delta b^*)^2}$$
Colormap Viridis dirancang secara matematis sehingga komponen Luminansi ($L^*$) meningkat secara monotonik sempurna dari 0 (hitam) hingga 100 (kuning), menjamin keterbacaan sempurna bahkan jika figur dicetak dalam format hitam-putih murni (greyscale).

2. Definisi Palet Diskrit Okabe-Ito (Universal Color Palette):
Palet 8 warna yang terbukti secara matematis dan empiris memiliki jarak pisah perseptual maksimum bagi orang dengan penglihatan normal, deuteranopia, dan protanopia:
- Hitam: #000000
- Oranye: #E69F00
- Biru Langit: #56B4E9
- Hijau Kebiruan: #009E73
- Kuning: #F0E442
- Biru Laut: #0072B2
- Vermilion (Merah Oranye): #D55E00
- Ungu Kemerahan: #CC79A7`,workedExample:{problemStatement:"Sebuah artikel ilmiah membandingkan 3 algoritma pengenalan pola. Penulis menggunakan warna Merah (#FF0000) untuk Algoritma 1, Hijau (#00FF00) untuk Algoritma 2, dan Biru (#0000FF) untuk Algoritma 3. Identifikasi kelemahan kritis pemilihan palet ini dan rekomendasikan konfigurasi palet Okabe-Ito beserta parameter ekspor publikasi untuk jurnal IEEE Transactions.",stepByStepSolution:[`Langkah 1: Analisis kelemahan palet RGB klasik:
Warna Merah (#FF0000) dan Hijau (#00FF00) memiliki tingkat distorsi persepsi parah bagi penderita deuteranopia/protanopia. Keduanya akan tampak sebagai warna zaitun/kuning kecokelatan yang nyaris mustahil dibedakan.`,`Langkah 2: Rekomendasi Palet Okabe-Ito yang aksesibel:
- Algoritma 1: Oranye (#E69F00).
- Algoritma 2: Biru Langit (#56B4E9).
- Algoritma 3: Hijau Kebiruan (#009E73).
Ketiga warna ini memiliki kontras luminansi dan kromatisitas yang tinggi bagi semua jenis penglihatan.`,`Langkah 3: Penguatan redundansi visual (Dual Encoding):
Selain warna, bedakan tiap algoritma menggunakan bentuk penanda (marker style) yang berbeda: Algoritma 1 (lingkaran padat), Algoritma 2 (bujursangkar), Algoritma 3 (segitiga). Jika gambar dicetak fotokopi hitam-putih, data tetap terbaca sempurna.`,`Langkah 4: Parameter ekspor jurnal IEEE Transactions:
- Format: PDF atau EPS (vektor murni).
- Lebar gambar: 85 mm (kolom tunggal).
- Tipografi: Arial / Helvetica 9 pt.
- Ketebalan garis minimal: 0.75 pt.`],resultInterpretation:"Penerapan palet ramah buta warna yang dipadukan dengan dual encoding penanda dan ekspor format vektor menjamin figur memenuhi standar integritas penerbit ilmiah kelas dunia."},pythonImplementation:{description:"Template Python Matplotlib untuk menghasilkan figur publikasi berstandar internasional dengan palet Okabe-Ito dan format vektor.",libraryDependencies:["numpy","matplotlib"],code:`import numpy as np

OKABE_ITO = {
    'black': '#000000',
    'orange': '#E69F00',
    'sky_blue': '#56B4E9',
    'bluish_green': '#009E73',
    'yellow': '#F0E442',
    'blue': '#0072B2',
    'vermilion': '#D55E00',
    'reddish_purple': '#CC79A7'
}

konfigurasi_publikasi = {
    'font.family': 'sans-serif',
    'font.sans-serif': ['DejaVu Sans', 'Arial', 'Helvetica'],
    'font.size': 8,
    'axes.labelsize': 9,
    'axes.titlesize': 9,
    'xtick.labelsize': 8,
    'ytick.labelsize': 8,
    'legend.fontsize': 8,
    'figure.titlesize': 10,
    'lines.linewidth': 1.2,
    'lines.markersize': 5,
    'axes.linewidth': 0.8,
    'pdf.fonttype': 42,
    'ps.fonttype': 42
}

print("[SIMULASI/SYNTHETIC DATA] Konfigurasi Parameter Styling Publikasi")
for k, v in list(konfigurasi_publikasi.items())[:6]:
    print(f"  {k:<20} : {v}")
print("
Palet Okabe-Ito Terverifikasi:")
for nama, hexc in list(OKABE_ITO.items())[:4]:
    print(f"  {nama:<15} : {hexc}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Konfigurasi Parameter Styling Publikasi
  font.family          : sans-serif
  font.sans-serif      : ['DejaVu Sans', 'Arial', 'Helvetica']
  font.size            : 8
  axes.labelsize       : 9
  axes.titlesize       : 9
  xtick.labelsize      : 8

Palet Okabe-Ito Terverifikasi:
  black           : #000000
  orange          : #E69F00
  sky_blue        : #56B4E9
  bluish_green    : #009E73`},commonPitfalls:["Menggunakan colormap Jet atau Rainbow yang mendistorsi gradien data dan tidak terbaca oleh penderita buta warna.","Mengekspor grafik dalam format bitmap kompresi JPEG dengan resolusi 72 DPI yang buram dan pecah saat dicetak.","Menyematkan teks dengan ukuran font sangat kecil (< 6 pt) sehingga lenyap saat gambar diperkecil ke lebar kolom jurnal."],validationProcedures:["Gunakan palet seragam perseptual (Viridis/Plasma) atau palet diskrit Okabe-Ito.","Terapkan pengkodean ganda (dual encoding: warna + bentuk penanda / tipe garis).","Ekspor seluruh grafik dalam format vektor (PDF/EPS) dengan font tersemat (Type 42 / TrueType).","Uji visualisasi menggunakan simulator buta warna (Coblis atau modul DaltonLens)."],exercises:[{question:"Mengapa penggunaan peta warna klasik Jet (Rainbow) secara tegas dilarang dalam panduan penulisan jurnal ilmiah modern?",hint:"Perhatikan keseragaman perseptual dan aksesibilitas bagi penderita buta warna.",answerExplanation:"Colormap Jet tidak seragam secara perseptual (menciptakan ilusi batas diskrit pada rentang kuning dan sian) serta menyatu menjadi warna cokelat serupa bagi 8% pembaca penderita defisiensi warna merah-hijau."}],references:[{citation:"Okabe, M., & Ito, K. (2008). Color Universal Design (CUD): How to make figures and presentations that are friendly to Colorblind People. J*FLY.",type:"guideline"},{citation:"Nuñez, J. R., Anderton, C. R., & Renslow, R. S. (2018). Optimizing colormaps with recognition of color vision deficiency to create inclusive visualizations. PLOS ONE, 13(7), e0199239.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Aksesibilitas Warna Ilmiah",bulletPoints:["8% pembaca pria mengalami buta warna merah-hijau (Deuteranopia/Protanopia).","Tinggalkan palet Jet/Rainbow: mendistorsi gradien data dan tidak aksesibel.","Gunakan colormap perseptual seragam: Viridis, Plasma, dan palet Okabe-Ito."],keyFormulaOrDiagram:"$$\\Delta E^*_{\\text{ab}} = \\sqrt{(\\Delta L^*)^2 + (\\Delta a^*)^2 + (\\Delta b^*)^2}$$"},{slideNumber:2,title:"Standar Ekspor & Tipografi Jurnal",bulletPoints:["Format vektor wajib (PDF/EPS): ketajaman tak terbatas pada pembesaran apapun.","Tipografi: Font sans-serif (Arial/Helvetica) 8-10 pt pada lebar kolom aktual.","Dual encoding: Padukan warna dengan penanda (markers) dan gaya garis."]}]}};export{a as CH23_LESSONS};
