import { Lesson } from '../types/curriculum';

export const CH10_LESSONS: Record<string, Partial<Lesson>> = {
  '2.3.1': {
    id: '2.3.1',
    chapterId: 'CH-10',
    title: 'Teori Sampling Probabilistik: Simple Random, Stratified, Cluster, Systematic',
    readingTimeMinutes: 18,
    status: 'verified',
    learningObjectives: [
      'Membedakan 4 teknik sampling probabilistik utama dalam rekayasa sistem.',
      'Memahami alokasi proporsional dan optimal (Neyman allocation) pada sampling terstratifikasi.',
      'Menghitung efek desain (Design Effect / DEFF) pada cluster sampling bertingkat.',
    ],
    content: `Dalam riset rekayasa berskala besar, mustahil untuk menguji setiap komponen fisik yang diproduksi oleh pabrik atau memonitor setiap simpul sensor di wilayah geografis yang luas. Peneliti harus mengambil sebagian kecil elemen yang representatif melalui prosedur sampling probabilistik. Sampling probabilistik adalah metode pengambilan sampel di mana setiap elemen dalam populasi target memiliki peluang inklusi non-nol yang diketahui secara matematis.

Empat arsitektur sampling probabilistik utama meliputi:
1. Simple Random Sampling (SRS): Setiap elemen populasi memiliki peluang keterpilihan yang identik dan independen. Metode ini merupakan dasar teoretis paling murni, namun sering kali tidak efisien secara logistik pada populasi geografis luas.
2. Stratified Random Sampling: Populasi heterogen dipartisi menjadi sub-kelompok homogen yang saling lepas (*strata*), misalnya membagi menara transmisi berdasarkan jenis tanah fondasi (batuan keras, lempung, rawa gambut). Sampel kemudian diambil secara acak dari masing-masing stratum. Pendekatan ini menurunkan varians estimasi populasi secara signifikan.
3. Cluster Sampling: Populasi dipartisi menjadi kelompok-kelompok kecil (*clusters*) yang masing-masing mencerminkan miniatur heterogenitas populasi. Beberapa cluster kemudian dipilih secara acak, dan seluruh atau sebagian elemen di dalam cluster terpilih tersebut diukur. Metode ini sangat hemat biaya logistik survei lapangan.
4. Systematic Sampling: Elemen dipilih berdasarkan interval periodik $k = N/n$ setelah titik awal acak pertama ditentukan. Sangat lazim digunakan pada ban berjalan lini perakitan pabrik otomotif atau mikroelektronika.`,
    mathematicalFoundations: `Alokasi Optimal Neyman pada Stratified Sampling:

Diberikan populasi berukuran $N$ terbagi dalam $H$ strata dengan ukuran $N_h$ dan deviasi standar stratum $\\sigma_h$. Untuk total sampel $n$, ukuran sampel optimal pada stratum $h$ yang meminimalkan varians estimasi rata-rata populasi:

$$n_h = n \\cdot \\frac{N_h \\sigma_h}{\\sum_{i=1}^H N_i \\sigma_i}$$

Varians Penduga Rata-rata Stratifikasi (dengan finite population correction):
$$\\text{Var}(\\bar{y}_{\\text{strat}}) = \\sum_{h=1}^H \\left( \\frac{N_h}{N} \\right)^2 \\left( 1 - \\frac{n_h}{N_h} \\right) \\frac{s_h^2}{n_h}$$

Efek Desain (*Design Effect* / DEFF):
$$\\text{DEFF} = \\frac{\\text{Var}(\\bar{y}_{\\text{kompleks}})}{\\text{Var}(\\bar{y}_{\\text{SRS}})} = 1 + (m - 1) \\rho_{\\text{ICC}}$$

Di mana $m$ adalah ukuran rata-rata cluster dan $\\rho_{\\text{ICC}}$ adalah Intraclass Correlation Coefficient.`,
    workedExample: {
      problemStatement: 'Sebuah jaringan transmisi pipa gas di Sumatera Selatan memiliki total 10.000 titik sambungan pipa yang terbagi dalam 3 zona lingkungan: Zona Kering (N1 = 6000 titik, deviasi standar korosi s1 = 0.2 mm/tahun), Zona Lembap (N2 = 3000 titik, s2 = 0.5 mm/tahun), dan Zona Rawa Asam (N3 = 1000 titik, s3 = 1.2 mm/tahun). Rencanakan alokasi ukuran sampel total n = 500 titik inspeksi menggunakan Alokasi Neyman.',
      stepByStepSolution: [
        'Langkah 1: Hitung produk bobot N_h * s_h untuk masing-masing stratum:',
        'Stratum 1 (Kering): 6000 * 0.2 = 1200.',
        'Stratum 2 (Lembap): 3000 * 0.5 = 1500.',
        'Stratum 3 (Rawa Asam): 1000 * 1.2 = 1200.',
        'Langkah 2: Hitung jumlah total produk: 1200 + 1500 + 1200 = 3900.',
        'Langkah 3: Hitung alokasi sampel n_h = n * (N_h * s_h) / Total:',
        'n1 = 500 * (1200 / 3900) = 153.8 -> 154 titik inspeksi.',
        'n2 = 500 * (1500 / 3900) = 192.3 -> 192 titik inspeksi.',
        'n3 = 500 * (1200 / 3900) = 153.8 -> 154 titik inspeksi.',
      ],
      resultInterpretation: 'Meskipun Zona Rawa Asam hanya mencakup 10% dari total populasi pipa, tingginya laju variabilitas korosi di area tersebut menuntut alokasi sampel sebesar 30.8% dari total kuota inspeksi untuk meminimalkan ketidakpastian estimasi keseluruhan.',
    },
    pythonImplementation: {
      description: 'Komputasi alokasi ukuran sampel Neyman untuk stratified sampling multi-strata.',
      libraryDependencies: ['numpy'],
      code: `import numpy as np

# Parameter strata: [Nama, Populasi Nh, Standar Deviasi sh]
strata_data = [
    ("Zona Kering", 6000, 0.2),
    ("Zona Lembap", 3000, 0.5),
    ("Zona Rawa Asam", 1000, 1.2)
]

n_total = 500

N_h = np.array([item[1] for item in strata_data])
s_h = np.array([item[2] for item in strata_data])

# Alokasi Neyman
bobot_neyman = N_h * s_h
alokasi_n = np.round(n_total * (bobot_neyman / np.sum(bobot_neyman))).astype(int)

print(f"Total Target Sampel: {n_total}")
print("-" * 50)
for (nama, Nh, sh), nh in zip(strata_data, alokasi_n):
    fraksi = (nh / n_total) * 100
    print(f"- {nama:15s} (Nh={Nh:4d}, sh={sh:.1f}) -> Sampel nh: {nh:3d} ({fraksi:.1f}%)")
`,
      expectedOutput: `Total Target Sampel: 500
--------------------------------------------------
- Zona Kering     (Nh=6000, sh=0.2) -> Sampel nh: 154 (30.8%)
- Zona Lembap     (Nh=3000, sh=0.5) -> Sampel nh: 192 (38.4%)
- Zona Rawa Asam  (Nh=1000, sh=1.2) -> Sampel nh: 154 (30.8%)`,
    },
    commonPitfalls: [
      'Menggunakan simple random sampling pada populasi yang sangat terstratifikasi dengan varians yang jomplang antar-strata.',
      'Mengabaikan efek cluster (*clustering effect*) yang menyebabkan ukuran sampel efektif menjadi jauh lebih kecil dari jumlah observasi mentah.',
      'Melakukan systematic sampling pada data yang memiliki pola periodisitas tersembunyi yang bertepatan dengan interval sampling k (aliasing).',
    ],
    validationProcedures: [
      'Periksa apakah kerangka sampling (*sampling frame*) mencakup seluruh elemen populasi target tanpa kelalaian pendaftaran.',
      'Uji keacakan urutan data sebelum menerapkan sampling sistematik untuk menghindari efek harmonik resonan.',
    ],
    exercises: [
      {
        question: 'Dalam kondisi apa sampling terstratifikasi (stratified sampling) menghasilkan varians estimasi yang jauh lebih kecil dibandingkan simple random sampling?',
        hint: 'Perhatikan variabilitas di dalam stratum versus variabilitas antar-stratum.',
        answerExplanation: 'Stratified sampling paling unggul ketika variabilitas di dalam masing-masing stratum bersifat homogen (varians internal kecil), sementara perbedaan rata-rata antar-stratum sangat heterogen (varians eksternal besar). Pemisahan ini memutus kontribusi varians antar-stratum dari galat estimasi rata-rata.',
      },
    ],
    references: [
      { citation: 'Cochran, W. G. (1977). Sampling Techniques. John Wiley & Sons.', type: 'canonical-textbook' },
      { citation: 'Lohr, S. L. (2019). Sampling: Design and Analysis. Chapman and Hall/CRC.', type: 'canonical-textbook' },
    ],
  },
  '2.3.2': {
    id: '2.3.2',
    chapterId: 'CH-10',
    title: 'Sampling Non-Probabilistik dan Batas Inferensinya (Purposive, Quota)',
    readingTimeMinutes: 16,
    status: 'verified',
    learningObjectives: [
      'Memahami taksonomi metode sampling non-probabilistik (Purposive, Quota, Snowball, Convenience).',
      'Mengidentifikasi keterbatasan inferensi statistik formal pada data non-probabilistik.',
      'Menerapkan purposive sampling secara terjustifikasi pada studi kasus rekayasa kegagalan ekstrem.',
    ],
    content: `Sampling non-probabilistik adalah teknik pemilihan sampel di mana elemen populasi tidak dipilih melalui mekanisme pengacakan peluang formal. Konsekuensi matematis mendasar dari pendekatan ini adalah bahwa teori peluang klasik, margin of error terhitung, dan p-value formal kehilangan keabsahan deduktifnya, karena probabilitas inklusi setiap elemen tidak diketahui.

Meskipun demikian, dalam investigasi forensik rekayasa, tahap eksplorasi awal, atau uji ketahanan ekstrem, sampling non-probabilistik memiliki tempat metodologis yang sah:
1. Purposive Sampling (Judgmental Sampling): Peneliti sengaja memilih unit uji tertentu berdasarkan kriteria keahlian spesifik atau karakteristik kritis sistem. Contoh: dalam investigasi keruntuhan struktur, insinyur sengaja mengambil sampel beton dari titik konsentrasi tegangan geser tertinggi dan retakan pertama, bukan mengacak seluruh lantai gedung.
2. Quota Sampling: Menetapkan kuota representasi untuk beberapa segmen karakteristik sistem tanpa pengacakan formal di dalam segmen tersebut.
3. Convenience Sampling: Pengambilan sampel berdasarkan kemudahan akses dan ketersediaan logistik. Desain ini paling rentan terhadap bias seleksi masif dan dilarang untuk generalisasi populasi formal.

Peneliti yang menggunakan sampling non-probabilistik dilarang keras mengklaim bahwa data mereka merepresentasikan populasi universal tanpa peringatan batasan inferensi (*inferential caveats*) yang eksplisit.`,
    mathematicalFoundations: `Dalam kerangka inferensi populasi, penaksir rata-rata dari sampel non-probabilistik mengandung suku bias seleksi inheren:

$$\\mathbb{E}[\\bar{y}_{\\text{non-prob}}] - \\mu = \\frac{\\text{Cov}(Y, I)}{\\bar{\\pi}}$$

Di mana $Y$ adalah nilai karakteristik variabel, $I \\in \\{0, 1\\}$ adalah variabel indikator seleksi inklusi, dan $\\bar{\\pi} = P(I = 1)$ adalah proporsi sampel terambil.

Jika probabilitas seleksi $I$ berkorelasi dengan respons $Y$ (misalnya komponen yang sering rusak lebih mudah terdeteksi dan diambil sebagai sampel oleh teknisi), maka $\\text{Cov}(Y, I) \\neq 0$, yang memicu bias seleksi permanen yang tidak dapat dihilangkan berapapun besarnya jumlah sampel yang dikumpulkan.`,
    workedExample: {
      problemStatement: 'Sebuah survei kepuasan antarmuka software pemantau PLTS disebarkan melalui tautan web terbuka secara sukarela (convenience sampling). Dari 500 pengisi survei, 80% menyatakan antarmuka sangat lambat. Di saat yang sama, data telemetri server menunjukkan rata-rata latency API adalah 150 ms (kategori sangat cepat). Jelaskan secara metodologis mengapa survei tersebut menghasilkan kesimpulan yang kontradiktif.',
      stepByStepSolution: [
        'Langkah 1: Identifikasi mekanisme seleksi: Survei sukarela berbasis web adalah Non-Probabilistic Convenience/Self-Selection Sampling.',
        'Langkah 2: Evaluasi variabel indikator inklusi I: Pengguna yang mengalami kendala sistem atau memiliki keluhan jauh lebih termotivasi untuk mengisi kuesioner sukarela dibanding pengguna yang aplikasinya berjalan lancar.',
        'Langkah 3: Amati korelasi Cov(Y, I): Indikator partisipasi I berkorelasi kuat positif dengan tingkat ketidakpuasan Y (Cov(Y, I) > 0).',
        'Langkah 4: Evaluasi batas inferensi: Sampel mengalami bias seleksi kepuasan negatif ekstrem (*voluntary response bias*) dan tidak dapat mewakili populasi pengguna keseluruhan.',
      ],
      resultInterpretation: 'Hasil kuesioner tidak mencerminkan performa sistem riil. Peneliti wajib menggunakan telemetri obyektif atau sampling acak probabilistik berlapis untuk menarik kesimpulan performa aplikasi.',
    },
    pythonImplementation: {
      description: 'Simulasi kemunculan bias seleksi pada pengambilan sampel non-probabilistik sukarela.',
      libraryDependencies: ['numpy'],
      code: `import numpy as np

np.random.seed(42)
N = 10000

# Waktu respons sistem yang dialami pengguna (ms) [SIMULASI/SYNTHETIC DATA]
latency_sejati = np.random.lognormal(mean=4.5, sigma=0.5, size=N)  # Rata-rata ~ 100 ms

# Peluang seseorang mengisi kuesioner meningkat seiring tingginya latency (frustrasi pengguna)
prob_respons = 1.0 / (1.0 + np.exp(-(latency_sejati - 120.0) / 20.0))
terpilih = np.random.binomial(1, prob_respons, size=N) == 1

sampel_sukarela = latency_sejati[terpilih]

print(f"Rata-rata Latency Populasi Sejati (Seluruh Pengguna): {np.mean(latency_sejati):.2f} ms")
print(f"Jumlah Responden Sukarela Terkumpul                 : {len(sampel_sukarela)} dari {N}")
print(f"Rata-rata Latency Berdasarkan Sampel Sukarela      : {np.mean(sampel_sukarela):.2f} ms")
print(f"Besaran Bias Estimasi Non-Probabilistik             : +{np.mean(sampel_sukarela) - np.mean(latency_sejati):.2f} ms")
`,
      expectedOutput: `Rata-rata Latency Populasi Sejati (Seluruh Pengguna): 102.32 ms
Jumlah Responden Sukarela Terkumpul                 : 2795 dari 10000
Rata-rata Latency Berdasarkan Sampel Sukarela      : 139.11 ms
Besaran Bias Estimasi Non-Probabilistik             : +36.79 ms`,
    },
    commonPitfalls: [
      'Menghitung interval kepercayaan standar 95% pada sampel non-probabilistik seolah-olah data diambil secara acak murni.',
      'Mengklaim hasil purposive sampling sebagai generalisasi populasi regional tanpa batasan konteks eksplisit.',
      'Mengabaikan data yang tidak merespon (*non-response bias*) yang sering kali memiliki pola perbedaan sistematis.',
    ],
    validationProcedures: [
      'Jika sampling non-probabilistik terpaksa digunakan, cantumkan kriteria seleksi kualitatif secara transparan di awal naskah.',
      'Lakukan penimbangan pasca-stratifikasi (*post-stratification weighting*) jika data demografi populasi patokan tersedia.',
    ],
    exercises: [
      {
        question: 'Kapan teknik purposive sampling dinilai superior secara metodologis dibanding simple random sampling?',
        hint: 'Pikirkan kelangkaan fenomena ekstrem atau analisis forensik kegagalan fatal.',
        answerExplanation: 'Purposive sampling jauh lebih superior saat meneliti fenomena langka atau anomali ekstrem (seperti investigasi kecelakaan sirkuit pesawat ulang-alik atau kebocoran reaktor kimia). Pada kasus kelangkaan ekstrem tersebut, simple random sampling kemungkinan besar akan melewatkan 100% dari sedikit unit yang mengalami kerusakan kritis.',
      },
    ],
    references: [
      { citation: 'Baker, R., et al. (2013). Summary report of the AAPOR task force on non-probability sampling. Journal of Survey Statistics and Methodology, 1(2), 90-143.', type: 'guideline' },
      { citation: 'Elliott, M. R., & Valliant, R. (2017). Inference for nonprobability samples. Statistical Science, 32(2), 249-264.', type: 'peer-reviewed-article' },
    ],
  },
  '2.3.3': {
    id: '2.3.3',
    chapterId: 'CH-10',
    title: 'Perhitungan Ukuran Sampel Minimum Berdasarkan Margin of Error dan Varians',
    readingTimeMinutes: 18,
    status: 'verified',
    learningObjectives: [
      'Menghitung ukuran sampel minimum untuk estimasi proporsi menggunakan formula Cochran.',
      'Menerapkan koreksi populasi berhingga (Finite Population Correction / FPC).',
      'Menghitung kebutuhan ukuran sampel berbasis daya uji statistik (*statistical power analysis*).',
    ],
    content: `Salah satu kelemahan paling krusial dalam proposal penelitian skripsi dan tesis teknik adalah penentuan ukuran sampel yang sembarangan, misalnya hanya menggunakan "aturan praktis 30 sampel" tanpa dasar matematis yang jelas. Ukuran sampel yang terlalu kecil (*underpowered study*) menyebabkan eksperimen gagal mendeteksi perbedaan nyata yang sebenarnya ada (terjebak pada Galat Tipe II / False Negative). Sebaliknya, ukuran sampel yang terlalu besar memboroskan anggaran pengujian laboratorium dan waktu komputasi.

Penentuan ukuran sampel yang ilmiah harus didasarkan pada salah satu dari dua pendekatan inferensi:
1. Pendekatan Presisi Estimasi (Margin of Error): Berfokus pada seberapa sempit interval kepercayaan yang diinginkan di sekitar estimasi parameter populasi (misalnya: mengestimasi proporsi cacat solder PCB dengan batas toleransi galat $\\pm 3\\%$ pada tingkat kepercayaan $95\\%$).
2. Pendekatan Daya Uji Statistik (Power Analysis): Berfokus pada jaminan probabilitas matematis (biasanya $1 - \\beta = 80\\%$ atau $90\\%$) untuk menolak hipotesis nol jika metode usulan menghasilkan peningkatan kinerja sebesar ukuran efek minimum yang bermakna (*minimal clinically/practically important difference*).

Untuk populasi terbatas (misalnya jumlah total gardu distribusi di suatu distrik), formula Cochran harus disesuaikan menggunakan faktor koreksi populasi terhingga.`,
    mathematicalFoundations: `1. Formula Ukuran Sampel Cochran untuk Proporsi Populasi Tak Hingga:
$$n_0 = \\frac{Z_{\\alpha/2}^2 \\cdot p (1 - p)}{e^2}$$

Di mana $Z_{\\alpha/2}$ adalah skor-Z kritis (1.96 untuk CI 95%), $p$ adalah proporsi estimasi apriori (gunakan $p=0.50$ untuk kasus varians konservatif terburuk), dan $e$ adalah margin of error yang dapat ditoleransi.

2. Koreksi Populasi Terhingga (Finite Population Correction):
$$n = \\frac{n_0}{1 + \\frac{n_0 - 1}{N}}$$

3. Ukuran Sampel Komparasi Dua Rata-rata Independen Berbasis Daya Uji ($1 - \\beta$):
$$n = 2 \\left( \\frac{Z_{\\alpha/2} + Z_\\beta}{\\delta / \\sigma} \\right)^2 = 2 \\left( \\frac{Z_{\\alpha/2} + Z_\\beta}{d} \\right)^2$$

Di mana $d = \\frac{\\mu_1 - \\mu_2}{\\sigma}$ adalah ukuran efek standar Cohen's $d$, dan $Z_\\beta$ adalah skor-Z untuk daya uji (misal $Z_{0.20} = 0.842$ untuk power 80%).`,
    workedExample: {
      problemStatement: 'Seorang peneliti ingin membandingkan efisiensi algoritma tracking MPPT baru vs baseline standar. Berdasarkan studi literatur, standar deviasi efisiensi adalah sigma = 1.5%. Peneliti ingin mampu mendeteksi peningkatan efisiensi sekecil delta = 1.0% dengan tingkat signifikansi alpha = 0.05 (uji dua arah, Z_alpha/2 = 1.96) dan daya uji statistical power 80% (Z_beta = 0.842). Hitung jumlah siklus uji eksperimental minimum per kelompok algoritma.',
      stepByStepSolution: [
        'Langkah 1: Hitung ukuran efek Cohen d: d = delta / sigma = 1.0 / 1.5 = 0.667 (efek sedang-ke-besar).',
        'Langkah 2: Jumlahkan skor-Z kritis: Z_alpha/2 + Z_beta = 1.96 + 0.842 = 2.802.',
        'Langkah 3: Kuadratkan suku rasio: ((Z_alpha/2 + Z_beta) / d)^2 = (2.802 / 0.667)^2 = (4.201)^2 = 17.65.',
        'Langkah 4: Kalikan dengan 2 untuk dua kelompok independen: n = 2 * 17.65 = 35.3 -> bulatkan ke atas menjadi 36 siklus pengujian per kelompok.',
      ],
      resultInterpretation: 'Peneliti wajib menjalankan minimal 36 siklus pengujian pada algoritma baru dan 36 siklus pada algoritma standar (total 72 pengujian) agar eksperimen memiliki daya 80% mendeteksi peningkatan efisiensi 1.0%.',
    },
    pythonImplementation: {
      description: 'Kalkulator ukuran sampel terintegrasi untuk formula Cochran dengan FPC dan power analysis dua kelompok.',
      libraryDependencies: ['scipy.stats', 'numpy'],
      code: `import numpy as np
from scipy import stats

def hitung_sampel_proporsi(e=0.05, alpha=0.05, p=0.5, N=None):
    z = stats.norm.ppf(1 - alpha/2)
    n0 = (z**2 * p * (1 - p)) / (e**2)
    if N is not None:
        n = n0 / (1 + (n0 - 1) / N)
    else:
        n = n0
    return int(np.ceil(n))

def hitung_sampel_daya_uji(cohen_d, alpha=0.05, power=0.80):
    z_alpha = stats.norm.ppf(1 - alpha/2)
    z_beta = stats.norm.ppf(power)
    n_per_grup = 2 * ((z_alpha + z_beta) / cohen_d)**2
    return int(np.ceil(n_per_grup))

# Uji 1: Estimasi proporsi (Margin of Error 5%, CI 95%, Populasi N=500 gardu)
n_gardu = hitung_sampel_proporsi(e=0.05, alpha=0.05, p=0.5, N=500)

# Uji 2: Komparasi dua rata-rata (Cohen d = 0.667, Power 80%, Alpha 5%)
n_eksperimen = hitung_sampel_daya_uji(cohen_d=0.667, alpha=0.05, power=0.80)

print(f"Kebutuhan Sampel Proporsi Gardu (N=500, e=5%): {n_gardu} unit")
print(f"Kebutuhan Sampel Eksperimen per Kelompok (Power 80%): {n_eksperimen} sampel/kelompok")
`,
      expectedOutput: `Kebutuhan Sampel Proporsi Gardu (N=500, e=5%): 218 unit
Kebutuhan Sampel Eksperimen per Kelompok (Power 80%): 36 sampel/kelompok`,
    },
    commonPitfalls: [
      'Menggunakan rumus Slovin secara sembarangan untuk eksperimen komparasi laboratorium (rumus Slovin hanya pendekatan kasar untuk survei proporsi deskriptif).',
      'Tidak memperhitungkan kemungkinan data gugur atau drop-out selama pengujian jangka panjang (atrisi sampel).',
      'Mengabaikan daya uji statistik sehingga menyimpulkan metode baru "sama saja" padahal eksperimen mengalami Galat Tipe II akibat sampel terlalu kecil.',
    ],
    validationProcedures: [
      'Gunakan perangkat lunak resmi seperti G*Power untuk memverifikasi perhitungan ukuran sampel sebelum proposal diseminarkan.',
      'Tambahkan buffer ukuran sampel sebesar 10% hingga 15% untuk mengantisipasi data rusak atau kegagalan sensor.',
    ],
    exercises: [
      {
        question: 'Jika seorang peneliti ingin memperkecil margin of error dari 10% menjadi 5% pada estimasi proporsi populasi, berapa kali lipat jumlah sampel yang harus ditambah?',
        hint: 'Perhatikan hubungan kuadratik terbalik antara ukuran sampel n dan margin of error e dalam rumus Cochran.',
        answerExplanation: 'Ukuran sampel n berbanding terbalik dengan kuadrat margin of error (n proporsional 1 / e^2). Memperkecil margin of error menjadi setengahnya (dari 10% ke 5%) membutuhkan penambahan ukuran sampel sebesar (10/5)^2 = 4 kali lipat.',
      },
    ],
    references: [
      { citation: 'Cohen, J. (1988). Statistical Power Analysis for the Behavioral Sciences. Lawrence Erlbaum Associates.', type: 'canonical-textbook' },
      { citation: 'Faul, F., et al. (2007). G*Power 3: A flexible statistical power analysis program. Behavior Research Methods, 39(2), 175-191.', type: 'peer-reviewed-article' },
    ],
  },
  '2.3.4': {
    id: '2.3.4',
    chapterId: 'CH-10',
    title: 'Penyusunan Standard Operating Procedure (SOP) Koleksi Data Terstandarisasi',
    readingTimeMinutes: 16,
    status: 'verified',
    learningObjectives: [
      'Merancang dokumen Standard Operating Procedure (SOP) koleksi data yang memenuhi standar ISO 9001 / ISO 17025.',
      'Menetapkan protokol verifikasi kesiapan instrumen (pre-flight checks).',
      'Mencegah deviasi prosedural antar-operator pengambil data di lapangan.',
    ],
    content: `Data eksperimen yang paling canggih sekalipun akan menjadi sampah ilmiah jika proses pengumpulannya dilakukan tanpa prosedur terstandarisasi. Variasi cara memegang instrumen, perbedaan urutan penekanan tombol, atau kelalaian pemanasan awal (warm-up) sensor dapat memasukkan varians galat operator yang jauh melampaui efek perlakuan yang ingin diteliti.

Standard Operating Procedure (SOP) Koleksi Data adalah instruksi kerja tertulis langkah-demi-langkah yang menetapkan protokol baku pelaksanaan eksperimen. Dokumen SOP yang baik harus mencakup:
1. Prasyarat Lingkungan dan Keselamatan: Batas suhu, kelembaban, dan Alat Pelindung Diri (APD) yang wajib dipenuhi sebelum pengujian dimulai.
2. Pemeriksaan Kesiapan Instrumen (Pre-flight Inspection): Prosedur zero-offset calibration, pengecekan tegangan baterai instrumen, dan verifikasi koneksi grounding.
3. Alur Sekuensial Pengujian: Urutan manipulasi tombol, durasi penahanan kondisi tunak (*dwell time*), dan laju pengambilan sampel.
4. Kriteria Interupsi Darurat: Kondisi anomali yang mewajibkan pengujian dihentikan seketika dan data sesi tersebut ditandai batal (*invalidated*).
5. Format Penyimpanan Segera: Nomenklatur penamaan berkas otomatis dan prosedur pencadangan data ganda.

Dengan SOP yang ketat, data yang dikumpulkan oleh mahasiswa A pada hari Senin dapat digabungkan secara absah dengan data yang dikumpulkan oleh mahasiswa B pada hari Jumat tanpa bias personal.`,
    mathematicalFoundations: `Model Varians Pengukuran dengan Komponen Operator:

Total varians pengukuran teramati $\\sigma_{\\text{total}}^2$ terdekomposisi menjadi:

$$\\sigma_{\\text{total}}^2 = \\sigma_{\\text{sistem}}^2 + \\sigma_{\\text{instrumen}}^2 + \\sigma_{\\text{operator}}^2 + \\sigma_{\\text{lingkungan}}^2$$

Tujuan formal dari standarisasi SOP adalah mereduksi varians operator mendekati nol:

$$\\lim_{\\text{SOP} \\to \\text{ideal}} \\sigma_{\\text{operator}}^2 = 0 \\implies \\sigma_{\\text{total}}^2 \\approx \\sigma_{\\text{sistem}}^2 + \\sigma_{\\text{instrumen}}^2$$

Indeks Kepatuhan Prosedural (Procedural Compliance Index):
$$C_{\\text{SOP}} = \\frac{\\sum_{k=1}^M w_k \\cdot I_k}{\\sum_{k=1}^M w_k} \\ge 0.98$$

Di mana $I_k \\in \\{0, 1\\}$ menandai kepatuhan langkah ke-$k$ dengan bobot kekritisan $w_k$.`,
    workedExample: {
      problemStatement: 'Susun protokol pre-flight checklist 4 langkah dalam SOP pengukuran konduktivitas termal material komposit geopolimer menggunakan transient line source method di Laboratorium ITERA.',
      stepByStepSolution: [
        'Langkah 1 (Kondisi Ruang): Pastikan suhu ruang uji berada pada 23 +/- 1 °C dan kelembaban relatif 50 +/- 5% selama minimal 2 jam sebelum pengujian untuk mencapai kesetimbangan termal benda uji.',
        'Langkah 2 (Pemeriksaan Probe Jarum): Periksa kelurusan jarum sensor secara visual; bersihkan sisa pasta termal lama menggunakan alkohol isopropil 99%; ukur hambatan listrik elemen pemanas jarum (harus berada pada rentang spesifikasi 12.5 +/- 0.2 Ohm).',
        'Langkah 3 (Pemasangan Sampel): Oleskan pasta termal silikon ketebalan seragam (< 0.1 mm) pada permukaan probe; masukkan probe ke dalam lubang sampel dengan tekanan aksial konstan tanpa memutar jarum.',
        'Langkah 4 (Dwell Time Termal): Diamkan probe di dalam sampel selama minimal 15 menit tanpa pemanasan untuk meredakan gradien suhu transien akibat gesekan mekanis pemasangan.',
      ],
      resultInterpretation: 'Kepatuhan terhadap 4 langkah ini mencegah galat gradien suhu awal yang merupakan sumber 80% kesalahan pengukuran metode transient line source.',
    },
    pythonImplementation: {
      description: 'Program validasi checklist SOP otomatis sebelum inisialisasi skrip akuisisi data sensor.',
      libraryDependencies: [],
      code: `checklist_sop = [
    {"langkah": "Suhu Lingkungan Terkalibrasi (20-25 C)", "status": True, "kritis": True},
    {"langkah": "Grounding Instrumen Terhubung (< 5 Ohm)", "status": True, "kritis": True},
    {"langkah": "Pemanasan Sensor (Warm-up 15 menit)", "status": True, "kritis": True},
    {"langkah": "Zero-offset Sensor Selesai", "status": True, "kritis": True},
    {"langkah": "Pencadangan Berkas Logbook Siap", "status": False, "kritis": False}
]

def evaluasi_sop(items):
    kritis_lolos = all(it["status"] for it in items if it["kritis"])
    skor_kepatuhan = sum(it["status"] for it in items) / len(items)
    
    return kritis_lolos, skor_kepatuhan

lolos, skor = evaluasi_sop(checklist_sop)

print(f"Skor Kepatuhan SOP: {skor * 100:.1f}%")
if lolos:
    print("STATUS SISTEM: PRE-FLIGHT CHECKLIST LOLOS. Akuisisi data diizinkan.")
else:
    print("STATUS SISTEM: PERINGATAN! Langkah kritis gagal dipenuhi. Eksperimen dibatalkan otomatis.")
`,
      expectedOutput: `Skor Kepatuhan SOP: 80.0%
STATUS SISTEM: PRE-FLIGHT CHECKLIST LOLOS. Akuisisi data diizinkan.`,
    },
    commonPitfalls: [
      'Menuliskan SOP yang terlalu panjang dan teoritis sehingga diabaikan oleh teknisi dan asisten laboratorium.',
      'Tidak memperbarui versi dokumen SOP saat terjadi penggantian probe atau perangkat lunak antarmuka.',
      'Mengabaikan pencatatan nomor lot bahan kimia atau nomor seri perangkat pada setiap lembar data eksperimen.',
    ],
    validationProcedures: [
      'Lakukan audit uji petik kepatuhan SOP secara berkala dengan mengamati jalannya eksperimen tanpa pemberitahuan sebelumnya.',
      'Gunakan sistem tanda tangan digital atau checklist elektronik yang merekam timestamp eksekusi setiap tahapan.',
    ],
    exercises: [
      {
        question: 'Mengapa waktu pemanasan awal (warm-up time) wajib dimasukkan sebagai langkah wajib dalam SOP instrumen elektronik analog presisi tinggi?',
        hint: 'Perhatikan kestabilan suhu sambungan semikonduktor internal dan koefisien suhu resistansi.',
        answerExplanation: 'Komponen elektronik seperti op-amp penguat sinyal, referensi tegangan zener, dan konverter analog-ke-digital (ADC) mengalami perubahan karakteristik resistansi dan disipasi panas internal saat pertama kali dinyalakan. Instrumen membutuhkan waktu pemanasan (biasanya 15-30 menit) hingga distribusi suhu internal mencapai keadaan tunak (thermal equilibrium) untuk mencegah drift nilai nol.',
      },
    ],
    references: [
      { citation: 'ISO/IEC 17025:2017. General requirements for the competence of testing and calibration laboratories. ISO Standard.', type: 'formal-standard' },
      { citation: 'EPA. (2007). Guidance for Preparing Standard Operating Procedures (SOPs). EPA QA/G-6.', type: 'guideline' },
    ],
  },
};

