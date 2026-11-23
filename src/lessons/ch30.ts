import { Lesson } from '../types/curriculum';

export const CH30_LESSONS: Record<string, Partial<Lesson>> = {
  '4.7.1': {
    id: '4.7.1',
    chapterId: 'CH-30',
    title: 'Rasionalisasi Faktorial Fraksional: Prinsip Sparsity of Effects',
    readingTimeMinutes: 20,
    status: 'verified',
    learningObjectives: [
      'Memahami ledakan eksponensial (curse of dimensionality) pada desain faktorial penuh saat k membesar.',
      'Menerapkan Prinsip Sparsity of Effects (Prinsip Pareto) dalam screening eksperimental.',
      'Menghitung rasio reduksi beban eksperimen dengan fraksionasi desain 2^(k-p).',
    ],
    content: `Desain faktorial penuh 2^k adalah alat eksperimen yang sangat kuat, namun memiliki keterbatasan ekonomi yang drastis ketika jumlah faktor yang ingin diselidiki cukup banyak. Jumlah pengujian bertambah secara eksponensial: untuk k = 4 faktor dibutuhkan 16 run, k = 6 faktor membutuhkan 64 run, k = 8 faktor membutuhkan 256 run, dan k = 10 faktor membutuhkan 1,024 run. Dalam dunia industri atau eksperimen laboratorium fisik berbiaya tinggi, menjalankan ratusan hingga ribuan run eksperimen sering kali mustahil secara anggaran dan waktu.

Lebih jauh lagi, pada desain 2^8 (256 run), terdapat 255 derajat kebebasan yang diestimasi. Dari 255 derajat kebebasan tersebut:
- Hanya 8 derajat kebebasan mewakili Efek Utama.
- Hanya 28 derajat kebebasan mewakili Interaksi 2-Faktor.
- Sebanyak 219 derajat kebebasan lainnya (86% dari seluruh kapasitas eksperimen!) dihabiskan semata-mata untuk mengestimasi interaksi 3-faktor, 4-faktor, hingga 8-faktor.

Di sinilah Prinsip Sparsity of Effects (sering disebut Prinsip Pareto dalam DoE) beroperasi: dalam hampir seluruh sistem fisik dan rekayasa riil, respon sistem didominasi secara mutlak oleh segelintir efek utama dan beberapa interaksi dua faktor berorde rendah. Interaksi tiga faktor atau lebih hampir selalu bernilai nol secara praktis dan hanya merupakan noise acak.

Rasionalisasi ini melahirkan Desain Faktorial Fraksional (Fractional Factorial Designs, notasi 2^(k-p)). Alih-alih menjalankan seluruh 2^k pengujian, peneliti hanya mengeksekusi sebagian kecil fraksi (1/2, 1/4, 1/8, atau 1/16 bagian dari desain penuh), namun tetap mampu mengidentifikasi efek-efek utama yang kritis dengan presisi tinggi.`,
    mathematicalFoundations: `1. Formulasi Fraksi Desain $2^{k-p}$:
- $k$: Jumlah faktor fisik yang diselidiki.
- $p$: Jumlah generator fraksionasi yang ditambahkan.
- Ukuran eksperimen tereduksi:
$$N = 2^{k-p} = \\frac{1}{2^p} \\times 2^k$$
Fraksi yang dieksekusi adalah $1 / 2^p$ dari eksperimen faktorial penuh.
Contoh:
- $2^{4-1}$: Setengah fraksi ($1/2$ fraksi) dari 4 faktor $\\implies N = 2^3 = 8$ run (hemat 50%).
- $2^{7-3}$: Seperdelapan fraksi ($1/8$ fraksi) dari 7 faktor $\\implies N = 2^4 = 16$ run (hemat 87.5% dari 128 run penuh).

2. Rasio Efisiensi Informasi Derajat Kebebasan:
Pada desain $2^{k-p}$, seluruh $N$ observasi dialokasikan secara efisien untuk mengestimasi parameter-parameter orde rendah yang paling esensial:
$$\\text{Efisiensi Alokasi} = \\frac{\\text{df}(\\text{Efek Utama}) + \\text{df}(\\text{Interaksi 2-Faktor})}{2^{k-p} - 1}$$
Pada desain screening yang dirancang dengan baik, efisiensi alokasi mendekati 100%, menghilangkan pemborosan sumber daya untuk interaksi orde tinggi.`,
    workedExample: {
      problemStatement: 'Sebuah pabrik semikonduktor ingin menyaring k = 6 parameter proses manufaktur chip (suhu oven, tekanan gas, waktu etsa, konsentrasi plasma, voltase bias, laju aliran reaktan). Biaya satu run pengujian adalah Rp 10.000.000. Bandingkan total biaya antara (a) Desain Faktorial Penuh 2^6 versus (b) Desain Faktorial Fraksional 2^(6-2) (seperempat fraksi).',
      stepByStepSolution: [
        'Langkah 1: Hitung jumlah run dan biaya untuk Desain Penuh 2^6:\nJumlah run: N_penuh = 2^6 = 64 run.\nTotal Biaya Penuh = 64 * Rp 10.000.000 = Rp 640.000.000.',
        'Langkah 2: Hitung jumlah run dan biaya untuk Desain Fraksional 2^(6-2):\nk = 6, p = 2 generator.\nJumlah run: N_fraksional = 2^(6-2) = 2^4 = 16 run.\nTotal Biaya Fraksional = 16 * Rp 10.000.000 = Rp 160.000.000.',
        'Langkah 3: Hitung penghematan anggaran:\nPenghematan = Rp 640.000.000 - Rp 160.000.000 = Rp 480.000.000 (Penghematan sebesar 75%).',
      ],
      resultInterpretation: 'Desain faktorial fraksional 2^(6-2) memangkas biaya penelitian dari Rp 640 juta menjadi hanya Rp 160 juta (menghemat Rp 480 juta) hanya dengan 16 run pengujian, namun tetap mampu mengidentifikasi parameter-parameter kunci yang mengendalikan kualitas chip semikonduktor.',
    },
    pythonImplementation: {
      description: 'Perbandingan pertumbuhan kombinatorial jumlah run eksperimen faktorial penuh versus faktorial fraksional.',
      libraryDependencies: ['numpy', 'pandas'],
      code: `import numpy as np
import pandas as pd

k_factors = np.arange(3, 9)

runs_full = 2**k_factors
# Desain screening fraksional standar industri (16 runs untuk k=4 s.d. 8)
runs_frac = [2**(k - 1) if k == 3 else 16 for k in k_factors]
hemat_persen = (1.0 - np.array(runs_frac) / runs_full) * 100

df_perbandingan = pd.DataFrame({
    'Jumlah Faktor (k)': k_factors,
    'Run Penuh (2^k)': runs_full,
    'Run Fraksional (2^(k-p))': runs_frac,
    'Penghematan (%)': hemat_persen
})

print("[SIMULASI/SYNTHETIC DATA] Perbandingan Kapasitas DoE Penuh vs Fraksional")
print(df_perbandingan.to_string(index=False))
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Perbandingan Kapasitas DoE Penuh vs Fraksional
 Jumlah Faktor (k)  Run Penuh (2^k)  Run Fraksional (2^(k-p))  Penghematan (%)
                 3                8                         4            50.00
                 4               16                        16             0.00
                 5               32                        16            50.00
                 6               64                        16            75.00
                 7              128                        16            87.50
                 8              256                        16            93.75`,
    },
    commonPitfalls: [
      'Memaksakan desain faktorial penuh pada banyak faktor (k >= 6) yang menghabiskan seluruh anggaran penelitian pada interaksi orde tinggi yang tidak berguna.',
      'Melakukan fraksionasi tanpa memahami konsekuensi aliasing/confounding antara efek utama dan interaksi.',
      'Mengira bahwa desain fraksional membuang data secara acak (fraksionasi dibangun di atas struktur aljabar grup yang sangat ketat).',
    ],
    validationProcedures: [
      'Gunakan prinsip sparsity of effects sebagai dasar justifikasi pemilihan desain fraksional.',
      'Pilih fraksionasi yang menjamin derajat kebebasan cukup untuk mengestimasi seluruh faktor kunci.',
      'Rencanakan eksperimen lanjutan (follow-up/foldover) jika interaksi tertentu perlu diurai lebih lanjut.',
    ],
    exercises: [
      {
        question: 'Apakah landasan filosofis dan empiris utama yang menjustifikasi penggunaan Desain Faktorial Fraksional dalam riset rekayasa?',
        hint: 'Prinsip yang menyatakan bahwa sebagian besar variasi sistem dikendalikan oleh sedikit efek utama dan interaksi orde rendah.',
        answerExplanation: 'Prinsip Sparsity of Effects (Prinsip Pareto DoE): Sistem rekayasa nyata hampir selalu didominasi oleh segelintir efek utama dan interaksi orde rendah (2-faktor), sedangkan interaksi orde tinggi (>= 3) sangat jarang terjadi dan dapat diabaikan.',
      },
    ],
    references: [
      { citation: 'Box, G. E., & Hunter, J. S. (1961). The 2^(k-p) fractional factorial designs. Technometrics, 3(3), 311-351.', type: 'peer-reviewed-article' },
      { citation: 'Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.', type: 'canonical-textbook' },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Kutukan Dimensi Desain Penuh',
        bulletPoints: [
          'Desain 2^k meledak secara eksponensial (k=6 butuh 64 run, k=8 butuh 256 run).',
          '80-90% kapasitas terbuang untuk mengestimasi interaksi orde tinggi (ABC, ABCD).',
          'Biaya dan waktu meningkat di luar batas rasionalitas industri.',
        ],
      },
      {
        slideNumber: 2,
        title: 'Prinsip Sparsity of Effects & Desain 2^(k-p)',
        bulletPoints: [
          'Prinsip Pareto: Respon sistem fisik dikendalikan oleh efek-efek vitalitas rendah.',
          'Fraksionasi 2^(k-p) mengeksekusi sebagian kecil subset terstruktur.',
          'Menghemat 50% hingga 90%+ biaya eksperimen dengan efisiensi informasi maksimal.',
        ],
        keyFormulaOrDiagram: '$$N = 2^{k-p} = \\frac{2^k}{2^p}$$',
      },
    ],
  },

  '4.7.2': {
    id: '4.7.2',
    chapterId: 'CH-30',
    title: 'Konstruksi Desain 2^(k-p): Relasi Generator dan Struktur Aliasing (Confounding)',
    readingTimeMinutes: 22,
    status: 'verified',
    learningObjectives: [
      'Mengkonstruksi matriks desain 2^(k-p) menggunakan relasi generator (design generators).',
      'Menurunkan Persamaan Identitas (Defining Relation) menggunakan aljabar modulo-2.',
      'Memetakan Struktur Aliasing (Alias Patterns) untuk mengidentifikasi efek-efek yang terbaur (confounded).',
    ],
    content: `Ketika kita memutuskan untuk menjalankan hanya sebagian fraksi dari desain faktorial penuh, timbul konsekuensi aljabar yang tidak dapat dihindari: hilangnya sebagian derajat kebebasan menyebabkan beberapa efek terbaur (confounded atau aliased) satu sama lain. Dua efek yang saling ter-alias tidak dapat dipisahkan secara independen oleh data dari eksperimen tersebut.

Konstruksi Desain via Generator:
Untuk membangun desain fraksional 2^(k-p):
1. Pilih k - p faktor dasar dan bentuk matriks faktorial penuh 2^(k-p).
2. Tambahkan p faktor baru dengan menyamakan level faktor baru tersebut terhadap kolom interaksi faktor-faktor dasar. Persamaan penetapan ini disebut Generator Desain (Design Generator).

Persamaan Identitas (Defining Relation):
Dalam aljabar desain faktorial dua level, perkalian sebuah kolom dengan dirinya sendiri menghasilkan kolom konstanta +1 murni yang disebut Elemen Identitas I:
$$x_j \\cdot x_j = x_j^2 = I$$
Jika faktor keempat D ditetapkan sebagai D = ABC, maka dengan mengalikan kedua sisi dengan D diperoleh:
$$I = ABCD$$
Persamaan I = ABCD disebut sebagai Persamaan Identitas (Defining Relation).

Struktur Aliasing (Alias Structure):
Struktur alias dari setiap efek diperoleh dengan mengalikan efek tersebut dengan persamaan identitas. Misalnya, jika I = ABCD:
$$A \\cdot I = A \\cdot (ABCD) \\implies A = A^2 BCD = I \\cdot BCD = BCD$$
Artinya, Efek Utama A ter-alias sempurna dengan Interaksi Tiga Faktor BCD (ditulis [A] = A + BCD). Ketika peneliti menghitung estimasi kontras untuk A, angka yang diperoleh sebenarnya adalah jumlah dari efek A dan efek BCD. Berdasarkan prinsip sparsity of effects, karena BCD diasumsikan nol, estimasi tersebut murni mencerminkan efek utama A.`,
    mathematicalFoundations: `1. Aritmatika Aljabar Desain Faktorial:
- Elemen identitas: $I = (1, 1, \\dots, 1)^T$.
- Sifat idempoten kuadratik: Untuk setiap faktor $X$, $X^2 = I$.
- Sifat komutatif: $AB = BA$.

2. Pola Aliasing pada Desain Setengah Fraksi $2^{4-1}$ dengan Generator $D = ABC$:
Persamaan Identitas:
$$I = ABCD$$
Panjang kata identitas (*word length*) adalah 4.

Struktur Aliasing Lengkap:
- Efek Utama ter-alias dengan Interaksi 3-Faktor:
  - $[A] = A \\cdot I = A(ABCD) = A + BCD$
  - $[B] = B \\cdot I = B(ABCD) = B + ACD$
  - $[C] = C \\cdot I = C(ABCD) = C + ABD$
  - $[D] = D \\cdot I = D(ABCD) = D + ABC$
- Interaksi 2-Faktor ter-alias berpasangan:
  - $[AB] = AB(ABCD) = A^2 B^2 CD = CD \\implies [AB] = AB + CD$
  - $[AC] = AC(ABCD) = BD \\implies [AC] = AC + BD$
  - $[AD] = AD(ABCD) = BC \\implies [AD] = AD + BC$

3. Interpretasi Estimasi:
Kontras yang dihitung dari kolom AB mengestimasi besaran $\\beta_{AB} + \\beta_{CD}$. Jika nilai kontras terbukti signifikan, data tidak dapat membedakan apakah efek tersebut berasal dari interaksi AB atau interaksi CD (keduanya saling terbaur).`,
    workedExample: {
      problemStatement: 'Diberikan desain fraksional 2^(3-1) dengan 3 faktor (A, B, C) dalam 4 run, di mana faktor C ditetapkan melalui generator C = AB. Tentukan persamaan identitas I, turunkan struktur aliasing untuk seluruh efek, dan jelaskan apakah efek utama A terbebas dari bias interaksi 2-faktor.',
      stepByStepSolution: [
        'Langkah 1: Tuliskan relasi generator: C = AB.',
        'Langkah 2: Kalikan kedua sisi dengan C untuk mendapatkan Persamaan Identitas:\nC * C = AB * C\nI = ABC.',
        'Langkah 3: Turunkan alias untuk setiap efek dengan mengalikan terhadap I = ABC:\n- Efek A: A * I = A * (ABC) = A^2 BC = I * BC = BC -> [A] = A + BC.\n- Efek B: B * I = B * (ABC) = A B^2 C = AC -> [B] = B + AC.\n- Efek C: C * I = C * (ABC) = AB C^2 = AB -> [C] = C + AB.',
        'Langkah 4: Evaluasi keterbauran efek utama A:\n[A] = A + BC.',
      ],
      resultInterpretation: 'Efek utama A ter-alias langsung dengan interaksi dua faktor BC. Jika interaksi antara suhu dan tekanan (BC) besar, nilai estimasi A akan terdistorsi secara langsung. Ini menunjukkan bahwa desain 2^(3-1) memiliki kelemahan di mana efek utama terbaur dengan interaksi 2-faktor.',
    },
    pythonImplementation: {
      description: 'Konstruksi matriks desain fraksional 2^(4-1) dengan generator D = ABC dan audit struktur aliasing.',
      libraryDependencies: ['numpy', 'pandas'],
      code: `import numpy as np
import pandas as pd

# 3 faktor dasar: A, B, C (2^3 = 8 runs)
levels = [-1, 1]
grid = np.array(np.meshgrid(levels, levels, levels)).T.reshape(-1, 3)
urutan = np.lexsort((grid[:, 0], grid[:, 1], grid[:, 2]))
X_base = grid[urutan]

A = X_base[:, 0]
B = X_base[:, 1]
C = X_base[:, 2]

# Generator: D = A * B * C
D = A * B * C

# Susun matriks desain fraksional 2^(4-1)
df_frac = pd.DataFrame({
    'Run': np.arange(1, 9),
    'A': A, 'B': B, 'C': C, 'D': D,
    'AB': A * B, 'CD': C * D
})

# Verifikasi kolom AB identik dengan CD (Aliased)
is_aliased_ab_cd = np.array_equal(df_frac['AB'], df_frac['CD'])

print("[SIMULASI/SYNTHETIC DATA] Desain Faktorial Fraksional 2^(4-1) (Generator D = ABC)")
print(df_frac.to_string(index=False))
print(f"\nVerifikasi Kolom AB == Kolom CD (Ter-alias Sempurna): {is_aliased_ab_cd}")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Desain Faktorial Fraksional 2^(4-1) (Generator D = ABC)
 Run   A   B   C   D  AB  CD
   1 -1 -1 -1 -1   1   1
   2  1 -1 -1  1  -1  -1
   3 -1  1 -1  1  -1  -1
   4  1  1 -1 -1   1   1
   5 -1 -1  1  1   1   1
   6  1 -1  1 -1  -1  -1
   7 -1  1  1 -1  -1  -1
   8  1  1  1  1   1   1

Verifikasi Kolom AB == Kolom CD (Ter-alias Sempurna): True`,
    },
    commonPitfalls: [
      'Menetapkan generator secara sembarangan yang menghasilkan kata identitas terlalu pendek sehingga membaurkan efek utama dengan efek utama lainnya.',
      'Mengira bahwa dua efek yang ter-alias dapat dipisahkan tanpa melakukan pengujian tambahan (foldover).',
      'Lupa mengalikan kata identitas ketika ada lebih dari satu generator (misal desain 2^(k-2) memiliki 3 kata identitas: I = W1 = W2 = W1W2).',
    ],
    validationProcedures: [
      'Tuliskan seluruh persamaan identitas secara lengkap termasuk produk interaksinya.',
      'Periksa struktur alias untuk memastikan tidak ada efek utama yang ter-alias dengan efek utama lainnya.',
      'Dokumentasikan rantai keterbauran (alias chains) pada laporan hasil eksperimen.',
    ],
    exercises: [
      {
        question: 'Pada desain faktorial fraksional dengan persamaan identitas I = ABCD, apakah alias dari interaksi dua faktor AC?',
        hint: 'Kalikan suku AC dengan persamaan identitas ABCD dan sederhanakan suku kuadrat.',
        answerExplanation: 'AC * I = AC * (ABCD) = A^2 C^2 BD = (1)(1) BD = BD. Maka interaksi AC ter-alias sempurna dengan interaksi BD ([AC] = AC + BD).',
      },
    ],
    references: [
      { citation: 'Box, G. E., & Hunter, J. S. (1961). The 2^(k-p) fractional factorial designs. Technometrics, 3(3), 311-351.', type: 'peer-reviewed-article' },
      { citation: 'Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.', type: 'canonical-textbook' },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Konstruksi Desain 2^(k-p)',
        bulletPoints: [
          'Bangun 2^(k-p) run dasar dari k-p faktor.',
          'Tetapkan p faktor tambahan via generator interaksi faktor dasar.',
          'Contoh 2^(4-1): Faktor D = ABC.',
        ],
        keyFormulaOrDiagram: '$$D = ABC \\implies I = ABCD$$',
      },
      {
        slideNumber: 2,
        title: 'Struktur Aliasing (Confounding)',
        bulletPoints: [
          'Dua efek ter-alias tidak dapat dipisahkan secara independen oleh data.',
          'Pola alias diperoleh dengan mengalikan efek terhadap kata identitas I.',
          'Pada I = ABCD: Efek utama bebas dari interaksi 2-faktor ([A] = A + BCD).',
        ],
        keyFormulaOrDiagram: '$$[A] = A + BCD, \\quad [AB] = AB + CD$$',
      },
    ],
  },

  '4.7.3': {
    id: '4.7.3',
    chapterId: 'CH-30',
    title: 'Resolusi Desain: Resolusi III (Screening Kasar), IV (Bebas Interaksi Utama), dan V',
    readingTimeMinutes: 20,
    status: 'verified',
    learningObjectives: [
      'Memahami klasifikasi formal resolusi desain faktorial (Resolusi III, IV, dan V).',
      'Menghubungkan panjang kata terpendek pada persamaan identitas dengan resolusi desain.',
      'Memilih resolusi yang tepat sesuai tahap kedewasaan riset (screening vs karakterisasi).',
    ],
    content: `Tidak semua desain faktorial fraksional diciptakan setara. Kualitas, kekuatan inferensial, dan tingkat keamanan suatu desain 2^(k-p) diklasifikasikan secara formal menggunakan konsep Resolusi Desain (Design Resolution), yang dilambangkan dengan angka Romawi (III, IV, V, VI).

Secara matematis, Resolusi Desain didefinisikan sebagai panjang kata terpendek (jumlah huruf minimum) yang terdapat dalam Persamaan Identitas (Defining Relation) desain tersebut. Tiga tingkatan resolusi paling penting dalam rekayasa:

1. Desain Resolusi III:
Panjang kata terpendek pada persamaan identitas adalah 3 (misal I = ABD).
- Efek utama TIDAK ter-alias dengan efek utama lainnya.
- Efek utama TER-ALIAS langsung dengan interaksi dua faktor (misal [A] = A + BD).
- Kegunaan: Hanya cocok untuk eksperimen screening awal yang sangat kasar (tahap eksplorasi awal dengan banyak faktor), dengan asumsi mutlak bahwa seluruh interaksi 2-faktor bernilai nol.

2. Desain Resolusi IV:
Panjang kata terpendek pada persamaan identitas adalah 4 (misal I = ABCD).
- Efek utama TIDAK ter-alias dengan efek utama lainnya dan TIDAK ter-alias dengan interaksi dua faktor. Efek utama hanya ter-alias dengan interaksi 3-faktor ([A] = A + BCD).
- Interaksi dua faktor saling ter-alias satu sama lain (misal [AB] = AB + CD).
- Kegunaan: Standar industri paling ideal untuk penyaringan parameter (screening designs). Peneliti dapat mengidentifikasi efek-efek utama secara bersih tanpa kontaminasi interaksi 2-faktor.

3. Desain Resolusi V:
Panjang kata terpendek pada persamaan identitas adalah 5 (misal I = ABCDE).
- Efek utama bebas dari efek utama dan interaksi 2-faktor/3-faktor.
- Interaksi dua faktor TIDAK ter-alias dengan interaksi dua faktor lainnya ([AB] = AB + CDE).
- Kegunaan: Desain premium untuk karakterisasi proses mendalam dan optimasi presisi tinggi.`,
    mathematicalFoundations: `1. Definisi Formal Resolusi Desain:
Misalkan $R$ adalah resolusi desain. Maka tidak ada efek orde $p$ yang ter-alias dengan efek orde lain yang kurang dari $R - p$:
$$p + q \\ge R$$
di mana $p$ dan $q$ adalah orde dari dua efek yang saling ter-alias.

- Pada Resolusi III ($R = 3$):
  - Orde 1 (Efek Utama) + Orde 2 (Interaksi 2-Faktor) = 3. Maka Efek Utama ter-alias dengan Interaksi 2-Faktor.
- Pada Resolusi IV ($R = 4$):
  - Orde 1 (Efek Utama) + Orde 3 (Interaksi 3-Faktor) = 4. Efek Utama bersih dari Interaksi 2-Faktor.
  - Orde 2 + Orde 2 = 4. Interaksi 2-Faktor ter-alias dengan Interaksi 2-Faktor lainnya.
- Pada Resolusi V ($R = 5$):
  - Orde 1 + Orde 4 = 5.
  - Orde 2 + Orde 3 = 5. Interaksi 2-Faktor bersih dari Interaksi 2-Faktor lainnya.

2. Aturan Kriteria Aberasi Minimum (Minimum Aberration Criterion):
Jika terdapat beberapa pilihan generator untuk ukuran run yang sama, pilih desain yang meminimalkan jumlah kata dengan panjang minimum pada persamaan identitas, sehingga meminimalkan jumlah pasangan efek yang ter-alias.`,
    workedExample: {
      problemStatement: 'Seorang peneliti memiliki 5 faktor (A, B, C, D, E) dan anggaran untuk 16 run pengujian (desain 2^(5-1)). Peneliti mempertimbangkan dua opsi generator untuk faktor kelima E: (Opsi 1) E = AB, atau (Opsi 2) E = ABCD. Tentukan resolusi desain untuk masing-masing opsi dan rekomendasikan opsi mana yang harus dipilih.',
      stepByStepSolution: [
        'Langkah 1: Evaluasi Opsi 1 (Generator E = AB):\nPersamaan Identitas: I = ABE.\nPanjang kata terpendek adalah 3 huruf (A, B, E).\nMaka Opsi 1 adalah Desain Resolusi III (2^(5-1)_III).\nKonsekuensi: Efek utama C, D, dll ter-alias dengan interaksi 2-faktor (misal [A] = A + BE).',
        'Langkah 2: Evaluasi Opsi 2 (Generator E = ABCD):\nPersamaan Identitas: I = ABCDE.\nPanjang kata terpendek adalah 5 huruf (A, B, C, D, E).\nMaka Opsi 2 adalah Desain Resolusi V (2^(5-1)_V).\nKonsekuensi: Seluruh efek utama dan seluruh interaksi 2-faktor bersih murni tanpa ada keterbauran antar-sesamanya.',
        'Langkah 3: Bandingkan kedua opsi pada ukuran run yang sama (16 run):',
      ],
      resultInterpretation: 'Pilih Opsi 2 (E = ABCD). Kedua opsi membutuhkan jumlah pengujian yang identik sama (16 run), namun Opsi 2 menghasilkan Desain Resolusi V yang sangat unggul dan bersih, sedangkan Opsi 1 menghasilkan Desain Resolusi III yang penuh keterbauran berbahaya.',
    },
    pythonImplementation: {
      description: 'Audit otomatis resolusi desain faktorial fraksional berdasarkan panjang kata identitas.',
      libraryDependencies: ['numpy'],
      code: `def evaluasi_resolusi(defining_words):
    # Panjang kata terpendek menentukan resolusi
    panjang_kata = [len(kata) for kata in defining_words]
    resolusi = min(panjang_kata)
    
    romawi = {3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII'}
    return romawi.get(resolusi, str(resolusi)), resolusi

# Evaluasi dua rancangan desain 2^(5-1)
desain_1_words = ['ABE']
desain_2_words = ['ABCDE']

res1_str, res1_num = evaluasi_resolusi(desain_1_words)
res2_str, res2_num = evaluasi_resolusi(desain_2_words)

print("[SIMULASI/SYNTHETIC DATA] Audit Resolusi Desain Faktorial Fraksional")
print(f"Desain 1 (I = ABE)   : Resolusi {res1_str} -> Efek Utama TER-ALIAS dengan Interaksi 2-Faktor")
print(f"Desain 2 (I = ABCDE) : Resolusi {res2_str} -> Seluruh Efek Utama & Interaksi 2-Faktor BEBAS MURNI")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Audit Resolusi Desain Faktorial Fraksional
Desain 1 (I = ABE)   : Resolusi III -> Efek Utama TER-ALIAS dengan Interaksi 2-Faktor
Desain 2 (I = ABCDE) : Resolusi V -> Seluruh Efek Utama & Interaksi 2-Faktor BEBAS MURNI`,
    },
    commonPitfalls: [
      'Menggunakan desain Resolusi III untuk optimasi akhir proses (Resolusi III hanya valid untuk screening kasar).',
      'Mengasumsikan bahwa menambah jumlah run otomatis menaikkan resolusi (resolusi ditentukan oleh pemilihan relasi generator yang cerdas).',
      'Tidak menyadari bahwa pada Resolusi IV, interaksi 2-faktor saling ter-alias berpasangan sehingga tidak dapat diidentifikasi secara unik tanpa uji pembongkar (foldover).',
    ],
    validationProcedures: [
      'Hitung panjang kata terpendek dari seluruh kombinasi kata pada persamaan identitas.',
      'Gunakan minimal Resolusi IV untuk eksperimen screening industri terpercaya.',
      'Gunakan Resolusi V jika interaksi dua faktor ingin diestimasi secara bebas tanpa bias.',
    ],
    exercises: [
      {
        question: 'Apakah karakteristik keterbauran (aliasing) mendasar dari sebuah Desain Faktorial Fraksional Resolusi IV?',
        hint: 'Perhatikan kebersihan efek utama dan status interaksi dua faktor.',
        answerExplanation: 'Pada Desain Resolusi IV, efek utama bersih sempurna dari keterbauran dengan efek utama lain dan interaksi dua faktor (hanya ter-alias dengan interaksi 3-faktor), namun interaksi dua faktor saling ter-alias satu sama lain.',
      },
    ],
    references: [
      { citation: 'Box, G. E., Hunter, J. S., & Hunter, W. G. (2005). Statistics for Experimenters: Design, Innovation, and Discovery (2nd ed.). John Wiley & Sons.', type: 'canonical-textbook' },
      { citation: 'Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.', type: 'canonical-textbook' },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Klasifikasi Resolusi Desain',
        bulletPoints: [
          'Resolusi didefinisikan oleh panjang kata terpendek pada persamaan identitas.',
          'Resolusi III: Efek utama ter-alias dengan interaksi 2-faktor (Screening Kasar).',
          'Resolusi IV: Efek utama bersih; interaksi 2-faktor saling ter-alias (Standar Screening).',
          'Resolusi V: Efek utama dan interaksi 2-faktor bebas murni (Karakterisasi).',
        ],
        keyFormulaOrDiagram: '$$\\text{Resolusi } R: \\quad p + q \\ge R$$',
      },
      {
        slideNumber: 2,
        title: 'Panduan Pemilihan Resolusi',
        bulletPoints: [
          'Tahap Screening Awal: Gunakan Resolusi IV (misal 2^(k-p) 16 run).',
          'Hindari Resolusi III kecuali faktor sangat banyak dan sumber daya sangat kritis.',
          'Optimasi & Surface Fitting: Wajib Resolusi V atau Desain Komposit.',
        ],
      },
    ],
  },

  '4.7.4': {
    id: '4.7.4',
    chapterId: 'CH-30',
    title: 'Metodologi Screening Parameter Proses Manufaktur dan Simulasi Komputasi',
    readingTimeMinutes: 22,
    status: 'verified',
    learningObjectives: [
      'Menerapkan alur kerja screening terstruktur dari banyak faktor (vital few vs trivial many).',
      'Menggunakan teknik Foldover Design untuk memisahkan efek utama dan interaksi yang ter-alias.',
      'Mengintegrasikan desain screening Plackett-Burman untuk efisiensi run non-pangkat-dua.',
    ],
    content: `Dalam fase awal penelitian rekayasa, pengembangan produk baru, atau simulasi komputasi numerik berdimensi tinggi, tim peneliti sering menghadapi daftar panjang variabel input potensial (10 hingga 50 parameter). Mencoba mengoptimalkan seluruh variabel ini secara simultan adalah pemborosan sumber daya yang masif.

Strategi yang tepat adalah menerapkan Metodologi Screening Bertahap (Sequential Screening Strategy):
1. Tahap 1: Screening Parameter (Parameter Screening): Menggunakan Desain Faktorial Fraksional Resolusi III/IV atau Desain Plackett-Burman untuk menguji puluhan faktor dalam jumlah run yang sangat hemat (misal 12 atau 16 run). Tujuannya adalah menyaring dan mengeliminasi variabel-variabel noise yang tidak berpengaruh, sehingga tersisa 2 hingga 4 faktor kritis (the vital few).
2. Tahap 2: Penguraian Efek via Desain Foldover: Jika pada desain Resolusi IV ditemukan interaksi 2-faktor yang signifikan namun ter-alias (misal AB + CD signifikan), peneliti menjalankan batch tambahan pengujian dengan membalik seluruh tanda matriks desain (Full Foldover). Penambahan run foldover ini mengubah desain Resolusi IV menjadi Resolusi V, memisahkan seluruh efek interaksi dari pasangannya secara bersih.
3. Tahap 3: Karakterisasi dan Optimasi Mendalam: Faktor-faktor kunci yang telah terisolasi kemudian dimasukkan ke dalam desain faktorial penuh atau Response Surface Methodology (RSM) untuk menemukan titik operasi optimal.

Desain Plackett-Burman (1946):
Jika peneliti ingin menguji k faktor dalam kelipatan 4 pengujian (N = 12, 20, 24, 28, 36 run) alih-alih kelipatan pangkat dua (N = 8, 16, 32), Desain Plackett-Burman adalah solusi screening non-geometris yang sangat ekonomis. Pada Plackett-Burman, setiap efek utama ter-alias secara parsial (pecahan berbobot) dengan seluruh interaksi 2-faktor, memaksimalkan efisiensi run untuk identifikasi efek utama yang sangat dominan.`,
    mathematicalFoundations: `1. Teknik Foldover Penuh (Full Foldover):
Diberikan desain fraksional awal $2^{k-p}$ dengan matriks $\\mathbf{X}_1$ dan respon $\\mathbf{y}_1$.
Bentuk matriks kedua $\\mathbf{X}_2 = -\\mathbf{X}_1$ (seluruh tanda perlakuan dibalik) dan kumpulkan respon $\\mathbf{y}_2$.
Gabungkan kedua eksperimen:
- Estimasi Efek Utama Bersih:
$$\\hat{\\boldsymbol{\\beta}}_{\\text{main}} = \\frac{1}{2} (\\hat{\\boldsymbol{\\beta}}_1 - \\hat{\\boldsymbol{\\beta}}_2)$$
Seluruh interaksi 2-faktor saling meniadakan (cancel out) secara aljabar.
- Estimasi Interaksi 2-Faktor Bersih:
$$\\hat{\\boldsymbol{\\beta}}_{\\text{interaction}} = \\frac{1}{2} (\\hat{\\boldsymbol{\\beta}}_1 + \\hat{\\boldsymbol{\\beta}}_2)$$
Seluruh efek utama saling meniadakan. Desain gabungan meningkat statusnya menjadi Resolusi IV atau V.

2. Struktur Desain Plackett-Burman:
Didasarkan pada matriks Hadamard $\\mathbf{H}_N$ berukuran $N \\times N$ (di mana $N$ adalah kelipatan 4):
$$\\mathbf{H}_N^T \\mathbf{H}_N = N \\mathbf{I}_N$$
Desain Plackett-Burman $N = 12$ mampu menyaring hingga $k = 11$ parameter proses hanya dalam 12 pengujian.`,
    workedExample: {
      problemStatement: 'Pada pengujian optimasi mesin cetak injeksi plastik 7 parameter (k = 7: suhu leleh, tekanan injeksi, waktu pendinginan, suhu cetakan, kecepatan injeksi, tekanan holding, waktu holding), peneliti menggunakan desain Plackett-Burman N = 12 run. Jelaskan mengapa Plackett-Burman N = 12 jauh lebih efisien daripada desain faktorial 2^(7-3) = 16 run dan apa batasannya.',
      stepByStepSolution: [
        'Langkah 1: Tinjau kapasitas Desain Plackett-Burman N = 12:\nPlackett-Burman N = 12 mampu menguji hingga k = 11 faktor dalam 12 run.\nUntuk k = 7 faktor, tersisa 12 - 1 - 7 = 4 derajat kebebasan untuk estimasi galat residual.',
        'Langkah 2: Tinjau Desain Faktorial Fraksional 2^(7-3):\nMembutuhkan N = 2^4 = 16 run (4 run lebih banyak daripada Plackett-Burman).',
        'Langkah 3: Analisis batasan Plackett-Burman:\nPada Plackett-Burman, struktur aliasing bersifat kompleks: setiap efek utama ter-alias secara parsial dengan 45 interaksi dua faktor dengan bobot pecahan 1/3 atau -1/3. Desain ini hanya aman jika interaksi diasumsikan kecil/dapat diabaikan.',
      ],
      resultInterpretation: 'Plackett-Burman N = 12 menghemat 25% run dibandingkan desain fraksional 16 run, menjadikannya pilihan ideal untuk penyaringan awal cepat guna membuang parameter yang jelas tidak aktif.',
    },
    pythonImplementation: {
      description: 'Implementasi teknik Full Foldover untuk memisahkan efek utama dari interaksi dua faktor.',
      libraryDependencies: ['numpy', 'pandas'],
      code: `import numpy as np
import pandas as pd

# Desain Awal Resolusi III: 2^(3-1) dengan C = AB (4 runs)
X1 = np.array([
    [-1, -1,  1],
    [ 1, -1, -1],
    [-1,  1, -1],
    [ 1,  1,  1]
])

# Desain Foldover: Balik seluruh tanda (X2 = -X1)
X2 = -X1

# Gabungkan menjadi desain 8 runs
X_combined = np.vstack([X1, X2])
kolom = ['Faktor_A', 'Faktor_B', 'Faktor_C']
df_foldover = pd.DataFrame(X_combined, columns=kolom)
df_foldover['Batch'] = ['Awal']*4 + ['Foldover']*4

print("[SIMULASI/SYNTHETIC DATA] Konstruksi Desain Full Foldover (4 -> 8 Runs)")
print(df_foldover.to_string(index=False))
print("\nEfek Utama kini BERSIH MURNI dari Interaksi 2-Faktor (Resolusi III -> Resolusi IV).")
`,
      expectedOutput: `[SIMULASI/SYNTHETIC DATA] Konstruksi Desain Full Foldover (4 -> 8 Runs)
 Faktor_A  Faktor_B  Faktor_C    Batch
       -1        -1         1     Awal
        1        -1        -1     Awal
       -1         1        -1     Awal
        1         1         1     Awal
        1         1        -1 Foldover
       -1         1         1 Foldover
        1        -1         1 Foldover
       -1        -1        -1 Foldover

Efek Utama kini BERSIH MURNI dari Interaksi 2-Faktor (Resolusi III -> Resolusi IV).`,
    },
    commonPitfalls: [
      'Melompati tahap screening dan langsung melakukan pemodelan orde-2 respons surface pada 10 faktor (membutuhkan ratusan run sia-sia).',
      'Mengabaikan teknik foldover ketika dua interaksi penting saling ter-alias pada desain Resolusi IV.',
      'Menggunakan Plackett-Burman untuk menarik kesimpulan mengenai interaksi dua faktor (Plackett-Burman hanya valid untuk efek utama).',
    ],
    validationProcedures: [
      'Gunakan strategi eksperimen berurutan: Screening -> Foldover -> Optimasi RSM.',
      'Lakukan validasi konfirmasi (confirmation runs) pada kondisi faktor terbaik yang teridentifikasi dari screening.',
      'Pastikan variabel yang dibuang dari screening benar-benar memiliki efek mendekati nol di seluruh rentang operasi.',
    ],
    exercises: [
      {
        question: 'Bagaimana cara melakukan teknik Full Foldover pada desain faktorial fraksional dan apa keuntungan utamanya?',
        hint: 'Perhatikan pembalikan tanda seluruh kolom faktor dan peningkatan resolusi desain.',
        answerExplanation: 'Full Foldover dilakukan dengan menambahkan batch pengujian kedua di mana tanda seluruh faktor pada matriks desain awal dibalik (-X). Keuntungan utamanya adalah menaikkan resolusi desain (misal dari Resolusi III ke IV), sehingga seluruh efek utama terpisah bersih dari interaksi dua faktor.',
      },
    ],
    references: [
      { citation: 'Plackett, R. L., & Burman, J. P. (1946). The design of optimum multifactorial experiments. Biometrika, 33(4), 305-325.', type: 'peer-reviewed-article' },
      { citation: 'Montgomery, D. C. (2017). Design and Analysis of Experiments (9th ed.). John Wiley & Sons.', type: 'canonical-textbook' },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Strategi Screening Sekuensial',
        bulletPoints: [
          'Tahap 1: Screening luas (10-30 faktor) via 2^(k-p) atau Plackett-Burman.',
          'Saring variabel noise: Sisakan 2-4 faktor kritis (vital few).',
          'Tahap 2: Foldover untuk memisahkan interaksi ter-alias.',
          'Tahap 3: Optimasi mendalam via Response Surface Methodology.',
        ],
      },
      {
        slideNumber: 2,
        title: 'Teknik Full Foldover & Plackett-Burman',
        bulletPoints: [
          'Foldover: Balik seluruh tanda matriks (X2 = -X1).',
          'Menaikkan resolusi desain secara instan (III -> IV).',
          'Plackett-Burman: Desain kelipatan 4 run sangat ekonomis untuk screening awal.',
        ],
      },
    ],
  },
};
