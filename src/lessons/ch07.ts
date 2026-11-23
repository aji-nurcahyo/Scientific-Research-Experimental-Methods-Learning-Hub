import { Lesson } from '../types/curriculum';

export const CH07_LESSONS: Record<string, Partial<Lesson>> = {
  '1.7.1': {
    id: '1.7.1',
    chapterId: 'CH-07',
    title: 'Standar Integritas COPE dan Pencegahan Misconduct (FFP)',
    readingTimeMinutes: 18,
    status: 'verified',
    learningObjectives: [
      'Memahami taksonomi pelanggaran integritas ilmiah berat: Fabrikasi, Falsifikasi, dan Plagiarisme (FFP).',
      'Menerapkan pedoman Committee on Publication Ethics (COPE) dalam pengelolaan data dan pelaporan riset.',
      'Membangun sistem pencegahan kesalahan metodologis dan kelalaian pencatatan laboratorium.',
    ],
    content: `Integritas akademik adalah fondasi paling mendasar dari seluruh usaha ilmiah. Sains berkembang atas dasar rasa percaya bahwa data, prosedur, dan hasil yang dipublikasikan oleh para ilmuwan merupakan representasi jujur dari realitas empiris. Ketika integritas ini dikompromikan, seluruh bangunan keilmuan yang berdiri di atas temuan tersebut terancam runtuh.

Komunitas ilmiah internasional melalui badan-badan seperti Committee on Publication Ethics (COPE) dan National Science Foundation (NSF) mendefinisikan tiga pelanggaran integritas ilmiah paling berat (The Big Three Misconducts):
1. Fabrikasi (Fabrication): Tindakan mengarang data mentah, rekaman sensor, atau hasil pengujian yang sebenarnya tidak pernah dilakukan dalam eksperimen nyata.
2. Falsifikasi (Falsification): Tindakan memanipulasi instrumen penelitian, mengubah nilai pengukuran, merekayasa gambar citra mikroskop atau grafik spektral, atau membuang pencilan (*outliers*) secara sewenang-wenang tanpa protokol statistik yang terjustifikasi agar hasil tampak mendukung hipotesis yang diinginkan.
3. Plagiarisme (Plagiarism): Tindakan mengadopsi ide, kata-kata, gambar, rancangan sirkuit, atau kode program orang lain tanpa memberikan atribusi sitasi yang layak dan eksplisit.

Selain ketiga pelanggaran fatal di atas, praktik ilmiah yang meragukan (Questionable Research Practices / QRP) seperti p-hacking, pelaporan hasil selektif, dan publikasi ganda (salami slicing) juga merusak reliabilitas literatur rekayasa.`,
    mathematicalFoundations: `Pencegahan falsifikasi selektif terhadap pencilan (outliers) diatur melalui kriteria eliminasi data statistik formal, seperti Uji Grubbs atau Rentang Interkuartil (IQR):

Batas eliminasi data berdasarkan kriteria Tukey:
$$\\text{Batas Bawah} = Q_1 - 1.5 \\times \\text{IQR}$$
$$\\text{Batas Atas} = Q_3 + 1.5 \\times \\text{IQR}$$

Di mana $\\text{IQR} = Q_3 - Q_1$.

Protokol Integritas: Pengeluaran titik data $x_i$ di luar rentang tersebut hanya sah jika:
1. Alasan fisik kerusakan sensor atau malfungsi daya listrik tercatat pada logbook laboratorium.
2. Analisis sensitivitas dilakukan dengan melaporkan hasil pengujian model dalam dua kondisi: dengan pencilan dan tanpa pencilan.`,
    workedExample: {
      problemStatement: 'Pada pengujian 50 sampel beton geopolimer, 48 sampel menunjukkan kuat tekan rata-rata 32 MPa dengan deviasi standar 1.8 MPa. Dua sampel lainnya hanya mencapai 18 MPa. Peneliti ingin menghapus kedua data rendah tersebut agar rata-rata grup mencapai target spesifikasi 30 MPa. Evaluasi tindakan ini berdasarkan etika integritas data ilmiah.',
      stepByStepSolution: [
        'Langkah 1: Identifikasi tindakan yang diusulkan: Menghapus dua titik data rendah tanpa investigasi fisik independen.',
        'Langkah 2: Evaluasi status etik: Menghapus data semata-mata agar hasil eksperimen memenuhi target desain adalah bentuk falsifikasi data (manipulasi hasil empiris).',
        'Langkah 3: Tindakan ilmiah yang benar: Periksa log pencampuran material. Apakah kedua sampel tersebut mengalami retak cetakan atau gelembung udara berlebih saat pengecoran?',
        'Langkah 4: Pelaporan transparan: Jika terdapat anomali fisik terdokumentasi, laporkan alasan pengeluaran sampel secara eksplisit di naskah. Jika tidak ditemukan anomali fisik, kedua sampel wajib dipertahankan dan fenomena variabilitas tersebut harus dibahas secara jujur sebagai keterbatasan kestabilan formula beton.',
      ],
      resultInterpretation: 'Integritas menuntut transparansi penuh atas variabilitas data, karena kegagalan material di lapangan sering bersumber dari sampel-sampel outlier yang diabaikan.',
    },
    pythonImplementation: {
      description: 'Pemeriksaan integritas logbook data eksperimen untuk mendeteksi penyimpangan dan mencatat jejak audit.',
      libraryDependencies: ['numpy'],
      code: `import numpy as np

# Data pengujian kuat tekan beton (MPa) [SIMULASI/SYNTHETIC DATA]
data_mentah = np.array([
    32.1, 31.8, 33.0, 31.5, 32.7, 32.2, 18.2, 33.5, 31.9, 17.9,
    32.4, 32.0, 33.1, 31.7, 32.8, 32.3, 32.5, 31.6, 33.2, 32.1
])

q1 = np.percentile(data_mentah, 25)
q3 = np.percentile(data_mentah, 75)
iqr = q3 - q1
batas_bawah = q1 - 1.5 * iqr
batas_atas = q3 + 1.5 * iqr

pencilan = data_mentah[(data_mentah < batas_bawah) | (data_mentah > batas_atas)]

print(f"Kuartil 1: {q1:.2f}, Kuartil 3: {q3:.2f}, IQR: {iqr:.2f}")
print(f"Ambang Batas Wajar: [{batas_bawah:.2f}, {batas_atas:.2f}]")
print(f"Data Pencilan Teridentifikasi: {pencilan}")
print("Protokol Etik: Titik pencilan wajib diinvestigasi penyebab fisiknya dan dilaporkan secara transparan.")
`,
      expectedOutput: `Kuartil 1: 31.78, Kuartil 3: 32.72, IQR: 0.95
Ambang Batas Wajar: [30.35, 34.15]
Data Pencilan Teridentifikasi: [18.2 17.9]
Protokol Etik: Titik pencilan wajib diinvestigasi penyebab fisiknya dan dilaporkan secara transparan.`,
    },
    commonPitfalls: [
      'Menghapus titik data pengujian yang tidak sesuai dengan hipotesis tanpa dokumentasi dan justifikasi metodologis terbuka.',
      'Melakukan parafrase dangkal terhadap naskah orang lain tanpa mencantumkan sitasi sumber asli (plagiarisme mosaik).',
      'Menggunakan perangkat lunak pengolah gambar untuk menghilangkan noise atau artefak pada citra eksperimental tanpa mendeklarasikan proses filter tersebut.',
    ],
    validationProcedures: [
      'Simpan salinan berkas data mentah primer (raw data) yang bersifat *read-only* segera setelah pengujian laboratorium selesai.',
      'Gunakan perangkat lunak pengecek kesamaan teks resmi sebelum mengirimkan naskah ke jurnal atau dewan penguji.',
    ],
    exercises: [
      {
        question: 'Apa perbedaan antara kesalahan ilmiah yang tidak disengaja (honest scientific error) dengan tindakan pemalsuan (falsification)?',
        hint: 'Perhatikan unsur niat (intent) dan transparansi prosedur.',
        answerExplanation: 'Kesalahan ilmiah jujur terjadi akibat keterbatasan instrumen yang tidak diketahui, galat matematis yang tidak disengaja, atau asumsi yang belakangan terbukti keliru. Peneliti yang membuat kesalahan jujur akan secara terbuka menerbitkan koreksi (erratum). Sebaliknya, falsifikasi melibatkan niat sadar untuk memanipulasi, menyembunyikan, atau mendistorsi data agar mencapai kesimpulan tertentu.',
      },
    ],
    references: [
      { citation: 'Committee on Publication Ethics (COPE). (2019). Core Practices for Journal Editors and Publishers. COPE Guidelines.', type: 'guideline' },
      { citation: 'National Academies of Sciences, Engineering, and Medicine. (2017). Fostering Integrity in Research. The National Academies Press.', type: 'canonical-textbook' },
    ],
  },
  '1.7.2': {
    id: '1.7.2',
    chapterId: 'CH-07',
    title: 'Kriteria Kepengarangan Formal ICMJE dan Etika Kolaborasi Ilmiah',
    readingTimeMinutes: 16,
    status: 'verified',
    learningObjectives: [
      'Menerapkan 4 kriteria kepengarangan formal International Committee of Medical Journal Editors (ICMJE).',
      'Mengidentifikasi dan mencegah praktik penulisan kehormatan (gift/honorary authorship) dan penulisan siluman (ghost authorship).',
      'Menetapkan urutan kepengarangan (author ordering) berbasis kontribusi objektif dan transparan.',
    ],
    content: `Penetapan daftar penulis pada artikel ilmiah bukan sekadar persoalan pembagian prestise atau penghargaan sosial, melainkan penetapan akuntabilitas publik atas kebenaran ilmiah yang tertulis. Nama yang tercantum pada naskah bertanggung jawab secara etis dan hukum atas integritas karya tersebut.

Standar kepengarangan yang diakui secara global dirumuskan oleh International Committee of Medical Journal Editors (ICMJE), yang menetapkan bahwa kepengarangan sah jika dan hanya jika seseorang memenuhi keempat kriteria secara simultan:
1. Kontribusi substansial terhadap konsepsi atau desain karya, ATAU akuisisi, analisis, atau interpretasi data penelitian.
2. Terlibat aktif dalam penyusunan draf naskah ilmiah ATAU melakukan revisi kritis terhadap konten intelektual penting naskah.
3. Memberikan persetujuan akhir (final approval) terhadap versi naskah yang akan dipublikasikan.
4. Bersedia bertanggung jawab secara akuntabel atas seluruh aspek penelitian, memastikan bahwa setiap pertanyaan mengenai akurasi atau integritas bagian mana pun diinvestigasi secara tuntas.

Seseorang yang hanya menyediakan pendanaan, menyediakan fasilitas laboratorium, atau sekadar melakukan pengoreksian tata bahasa tanpa keterlibatan intelektual TIDAK berhak menjadi penulis. Kontribusi teknis semacam itu harus dicatat secara terhormat pada bagian Ucapan Terima Kasih (Acknowledgments).`,
    mathematicalFoundations: `Status kelayakan kepengarangan individu $i$ dinyatakan sebagai konjungsi logika biner dari keempat kriteria ICMJE:

$$\\text{AuthorEligibility}(i) = C_{1}(i) \\land C_{2}(i) \\land C_{3}(i) \\land C_{4}(i)$$

Di mana $C_k(i) \\in \\{0, 1\\}$.

Jika $\\exists k \\in \\{1, 2, 3, 4\\}$ sedemikian rupa sehingga $C_k(i) = 0$, maka individu $i$ dialokasikan ke himpunan kontributor non-penulis:
$$i \\in \\mathcal{A}_{\\text{acknowledgments}}$$`,
    workedExample: {
      problemStatement: 'Dalam sebuah proyek riset di laboratorium, Kepala Laboratorium menyediakan instrumen spektrometer dan dana operasional, namun tidak pernah membaca draf naskah dan tidak terlibat dalam interpretasi data. Apakah Kepala Laboratorium memenuhi syarat sebagai co-author menurut standar ICMJE?',
      stepByStepSolution: [
        'Langkah 1: Evaluasi Kriteria 1 (Kontribusi Intelektual): Menyediakan alat dan dana tidak memenuhi definisi kontribusi intelektual desain atau analisis data (C1 = 0).',
        'Langkah 2: Evaluasi Kriteria 2 (Penyusunan/Revisi Kritis): Tidak terlibat dalam draf naskah (C2 = 0).',
        'Langkah 3: Evaluasi Kriteria 3 (Persetujuan Akhir): Tidak membaca naskah final (C3 = 0).',
        'Langkah 4: Evaluasi Kriteria 4 (Akuntabilitas): Tidak dapat mempertanggungjawabkan rincian hasil eksperimen (C4 = 0).',
        'Langkah 5: Kesimpulan kepengarangan: Kepala Laboratorium tidak memenuhi syarat sebagai penulis. Memasukkan namanya merupakan pelanggaran etika berupa kepengarangan kehormatan (gift/honorary authorship). Kontribusi fasilitas beliau wajib diakui pada bagian Acknowledgments.',
      ],
      resultInterpretation: 'Penerapan standar ICMJE melindungi peneliti dari tekanan hierarkis institusional dan menjaga keadilan kontribusi ilmiah.',
    },
    pythonImplementation: {
      description: 'Evaluasi kelayakan daftar penulis berdasarkan matriks kontribusi taksonomi CRediT (Contributor Roles Taxonomy).',
      libraryDependencies: [],
      code: `peran_credit = [
    "Konseptualisasi", "Metodologi", "Pemrograman", "Validasi",
    "Analisis Formal", "Penyelidikan", "Penulisan Draf Asli", "Penulisan Ulas & Sunting"
]

# Rekam kontribusi anggota tim [SIMULASI/SYNTHETIC DATA]
anggota = {
    "Dr. Andi": {"Konseptualisasi": True, "Metodologi": True, "Penulisan Ulas & Sunting": True},
    "Budi (Mahasiswa)": {"Pemrograman": True, "Validasi": True, "Penyelidikan": True, "Penulisan Draf Asli": True},
    "Ir. Citra (Teknisi Lab)": {"Penyelidikan": True},  # Hanya membantu teknis instrumen
    "Prof. Doni (Pejabat)": {}  # Hanya memfasilitasi izin ruangan
}

print("Penilaian Kepengarangan Berdasarkan Kontribusi CRediT:")
for nama, peran in anggota.items():
    total_kontribusi = len(peran)
    terlibat_naskah = peran.get("Penulisan Draf Asli", False) or peran.get("Penulisan Ulas & Sunting", False)
    
    if total_kontribusi >= 2 and terlibat_naskah:
        status = "Layak Menjadi Penulis (Co-Author)"
    else:
        status = "Dicantumkan pada Acknowledgments"
    print(f"- {nama:25s}: {status} (Peran aktif: {list(peran.keys())})")
`,
      expectedOutput: `Penilaian Kepengarangan Berdasarkan Kontribusi CRediT:
- Dr. Andi                 : Layak Menjadi Penulis (Co-Author) (Peran aktif: ['Konseptualisasi', 'Metodologi', 'Penulisan Ulas & Sunting'])
- Budi (Mahasiswa)         : Layak Menjadi Penulis (Co-Author) (Peran aktif: ['Pemrograman', 'Validasi', 'Penyelidikan', 'Penulisan Draf Asli'])
- Ir. Citra (Teknisi Lab)  : Dicantumkan pada Acknowledgments (Peran aktif: ['Penyelidikan'])
- Prof. Doni (Pejabat)     : Dicantumkan pada Acknowledgments (Peran aktif: [])`,
    },
    commonPitfalls: [
      'Menambahkan nama peneliti senior atau pembimbing secara sepihak untuk meningkatkan peluang penerimaan naskah (gift authorship).',
      'Menghilangkan nama mahasiswa tingkat sarjana yang berkontribusi menulis kode dan mengambil data lapangan primer (ghost authorship).',
      'Tidak menyepakati urutan nama penulis di awal kolaborasi penelitian sehingga menimbulkan sengketa di akhir masa riset.',
    ],
    validationProcedures: [
      'Susun Kontrak Kepengarangan Tertulis (Authorship Agreement) di awal proyek yang menetapkan peran spesifik menggunakan taksonomi CRediT.',
      'Mintakan konfirmasi persetujuan tertulis dari seluruh calon penulis sebelum naskah diunggah ke sistem jurnal.',
    ],
    exercises: [
      {
        question: 'Apa peran dan tanggung jawab utama dari seorang Penulis Korespondensi (Corresponding Author)?',
        hint: 'Perhatikan komunikasi administratif dengan editor jurnal dan masyarakat ilmiah setelah artikel terbit.',
        answerExplanation: 'Penulis Korespondensi bertanggung jawab mengelola seluruh komunikasi formal dengan dewan editor jurnal selama proses peer review, memastikan kelengkapan data administratif dan deklarasi etika tim, serta bertindak sebagai kontak utama bagi publik ilmiah yang membutuhkan klarifikasi data atau materi riset setelah publikasi.',
      },
    ],
    references: [
      { citation: 'International Committee of Medical Journal Editors (ICMJE). (2023). Defining the Role of Authors and Contributors. ICMJE Recommendations.', type: 'guideline' },
      { citation: 'Brand, A., et al. (2015). Beyond authorship: attribution, contribution, collaboration, and credit. Learned Publishing, 28(2), 151-155.', type: 'peer-reviewed-article' },
    ],
  },
  '1.7.3': {
    id: '1.7.3',
    chapterId: 'CH-07',
    title: 'Etika Penggunaan Generative AI dan LLM dalam Penelitian Ilmiah',
    readingTimeMinutes: 18,
    status: 'verified',
    learningObjectives: [
      'Menerapkan batasan etis penggunaan Large Language Models (LLM) dalam penulisan ilmiah.',
      'Memahami alasan hukum dan etika mengapa AI tidak dapat didaftarkan sebagai penulis (co-author).',
      'Mendeklarasikan penggunaan instrumen AI secara transparan dan akuntabel sesuai pedoman penerbit internasional.',
    ],
    content: `Perkembangan pesat Generative Artificial Intelligence dan Large Language Models (LLM) membawa perubahan revolusioner sekaligus tantangan etis besar dalam ekosistem penelitian ilmiah. Model kecerdasan buatan generatif memiliki kemampuan tinggi untuk merapikan gaya bahasa, menerjemahkan kode komputasi, dan menyusun sintesis informasi teks dengan kecepatan luar biasa.

Namun, lembaga penerbit ilmiah internasional (seperti Springer Nature, IEEE, Elsevier, dan ACM) telah menetapkan regulasi etika yang tegas terkait pemanfaatan AI:
1. AI Tidak Boleh Menjadi Penulis: Model AI tidak dapat memenuhi kriteria kepengarangan ICMJE/COPE karena model AI tidak memiliki kepribadian hukum, tidak dapat menandatangani dokumen konflik kepentingan, dan tidak dapat memikul tanggung jawab pidana maupun perdata atas integritas data yang dihasilkannya.
2. Tanggung Jawab Mutlak Manusia: Penulis manusia memikul akuntabilitas penuh 100% atas setiap kalimat, klaim, atau referensi yang ada pada naskah. Jika AI menghasilkan halusinasi pustaka (referensi palsu) atau data fiktif dan penulis menyertakannya ke dalam naskah, kesalahan tersebut sepenuhnya merupakan kelalaian pelanggaran etik penulis.
3. Deklarasi Terbuka (Mandatory Transparency): Penggunaan alat bantu generatif untuk pembuatan draf teks, pembersihan data, atau pembuatan visualisasi wajib dinyatakan secara eksplisit pada bagian deklarasi naskah (menyebutkan nama model, versi, dan fungsi penggunaannya).

AI harus diposisikan secara tepat sebagai instrumen bantuan penulisan dan produktivitas komputasional, bukan sebagai entitas pemikir ilmiah independen.`,
    mathematicalFoundations: `Model halusinasi LLM dapat dipahami secara probabilistik sebagai generasi autoregresif rantai Markov berorde tinggi:

$$P(w_t \\mid w_1, w_2, \\dots, w_{t-1}) = \\text{Softmax}\\left( \\frac{\\mathbf{z}_t}{\\tau} \\right)$$

Di mana model mengoptimalkan kemiripan distribusi linguistik (*statistical plausibility*), BUKAN kebenaran faktual ilmiah (*factual truth*).

Probabilitas munculnya setidaknya satu referensi halusinasi dalam daftar pustaka berisi $N$ entitas dengan tingkat galat halusinasi model $\\epsilon$:
$$P(\\text{Halusinasi} \\ge 1) = 1 - (1 - \\epsilon)^N$$

Jika $\\epsilon = 0.08$ dan $N = 30$, maka $P(\\text{Halusinasi} \\ge 1) = 1 - (0.92)^{30} \\approx 0.918$ (lebih dari 91% kemungkinan terdapat referensi fiktif).`,
    workedExample: {
      problemStatement: 'Seorang mahasiswa menggunakan LLM untuk mencari referensi mengenai rumus redaman gelombang akustik pada lumpur panas. AI memberikan satu sitasi jurnal yang tampak meyakinkan: "Pratama, B. (2021). Acoustic Attenuation in Geothermal Slurry. IEEE Trans. Geosci., 45(3), 112-120." Setelah dicari di Scopus dan IEEE Xplore, artikel tersebut tidak pernah ada. Jelaskan mekanisme terjadinya fenomena ini dan tindakan etis yang wajib dilakukan.',
      stepByStepSolution: [
        'Langkah 1: Identifikasi fenomena: Terjadi halusinasi literatur (bibliographic hallucination). Model AI merangkai nama penulis Indonesia, topik yang diminta, dan nama jurnal IEEE yang terdengar realistis berdasarkan probabilitas kemunculan kata.',
        'Langkah 2: Evaluasi dampak: Memasukkan referensi fiktif ke dalam proposal atau skripsi merupakan pelanggaran fabrikasi data kepustakaan.',
        'Langkah 3: Tindakan perbaikan: Hapus sitasi tersebut secara permanen. Lakukan pencarian ulang secara langsung pada pangkalan data resmi (IEEE Xplore/Scopus) untuk menemukan artikel empiris riil.',
        'Langkah 4: Aturan verifikasi: Jangan pernah mencantumkan referensi apa pun yang belum pernah diverifikasi keberadaan berkas digital DOI aslinya oleh mata manusia.',
      ],
      resultInterpretation: 'Verifikasi faktual oleh manusia adalah filter mutlak yang tidak boleh dilewati dalam penggunaan AI generatif.',
    },
    pythonImplementation: {
      description: 'Program verifikasi format pengenal DOI untuk mendeteksi anomali pada daftar referensi hasil generasi otomatis.',
      libraryDependencies: ['re'],
      code: `import re

# Pola standar regex pengenal DOI resmi
pola_doi = re.compile(r"^10\.\d{4,9}/[-._;()/:A-Za-z0-9]+$")

daftar_pustaka_uji = [
    {"judul": "Karakterisasi Akustik", "doi": "10.1109/tgrs.2021.3051234"},
    {"judul": "Halusinasi AI Model", "doi": "10.9999/bukan-doi-asli-hanya-teks"},
    {"judul": "Jaringan Syaraf Tiruan", "doi": "invalid_doi_format"},
    {"judul": "Sensor IoT Perkebunan", "doi": "10.1016/j.compag.2022.106890"}
]

print("Audit Kredensial DOI Referensi:")
for item in daftar_pustaka_uji:
    doi = item["doi"]
    valid = bool(pola_doi.match(doi))
    status = "Format Valid (Perlu Uji Lanjut Resolver)" if valid else "FORMAT CACAT / INDIKASI HALUSINASI"
    print(f"- {item['judul']:25s} | DOI: {doi:30s} -> {status}")
`,
      expectedOutput: `Audit Kredensial DOI Referensi:
- Karakterisasi Akustik     | DOI: 10.1109/tgrs.2021.3051234             -> Format Valid (Perlu Uji Lanjut Resolver)
- Halusinasi AI Model       | DOI: 10.9999/bukan-doi-asli-hanya-teks     -> Format Valid (Perlu Uji Lanjut Resolver)
- Jaringan Syaraf Tiruan    | DOI: invalid_doi_format                    -> FORMAT CACAT / INDIKASI HALUSINASI
- Sensor IoT Perkebunan     | DOI: 10.1016/j.compag.2022.106890         -> Format Valid (Perlu Uji Lanjut Resolver)`,
    },
    commonPitfalls: [
      'Menyalin mentah-mentah teks paragraf dari prompt AI ke dalam naskah ilmiah tanpa penyuntingan dan verifikasi mendalam.',
      'Mempercayai angka statistik, konstanta fisis, atau ringkasan literatur dari LLM tanpa mengecek sumber primer.',
      'Merasa tidak perlu mendeklarasikan penggunaan AI jika hasilnya telah diedit ulang sebagian oleh penulis.',
    ],
    validationProcedures: [
      'Gunakan resolver resmi DOI (https://doi.org) untuk memvalidasi bahwa setiap artikel yang disitasi benar-benar terdaftar di CrossRef.',
      'Sertakan teks pernyataan keterbukaan AI (AI statement) pada bab metodologi yang merinci prompt inti dan tujuan penggunaannya.',
    ],
    exercises: [
      {
        question: 'Apakah diperbolehkan menggunakan AI generatif untuk memperbaiki tata bahasa (grammar polishing) pada naskah artikel yang ditulis oleh peneliti yang bukan penutur asli bahasa Inggris?',
        hint: 'Perhatikan batas antara perbaikan linguistik versus penciptaan konten intelektual baru.',
        answerExplanation: 'Sebagian besar penerbit ilmiah internasional memperbolehkan penggunaan AI untuk perbaikan tata bahasa, kejelasan ekspresi kalimat, dan ejaan. Hal ini dipandang setara dengan menggunakan jasa penyunting bahasa profesional. Namun, penggunaan tersebut tetap wajib dideklarasikan secara transparan, dan penulis tetap bertanggung jawab penuh atas makna kalimat yang dihasilkan.',
      },
    ],
    references: [
      { citation: 'Nature. (2023). Tools such as ChatGPT threaten transparent science; here are our ground rules for their use. Nature, 613(7945), 612.', type: 'guideline' },
      { citation: 'Elsevier. (2023). The use of generative AI and AI-assisted technologies in writing for Elsevier. Elsevier Author Guidelines.', type: 'guideline' },
    ],
  },
  '1.7.4': {
    id: '1.7.4',
    chapterId: 'CH-07',
    title: 'Model Silsilah Data (Data Provenance) dan Verifikasi Hash Kriptografis Dataset',
    readingTimeMinutes: 18,
    status: 'verified',
    learningObjectives: [
      'Membangun model silsilah data (data provenance graph) yang mencatat seluruh transformasi data eksperimen.',
      'Menerapkan fungsi hash kriptografis SHA-256 untuk menjamin integritas dan imutabilitas artefak data.',
      'Memenuhi standar prinsip FAIR (Findable, Accessible, Interoperable, Reusable) dalam manajemen data riset.',
    ],
    content: `Reproduksibilitas sains modern menuntut agar data eksperimen tidak hanya disimpan sebagai berkas mati, melainkan disertai dengan catatan silsilah data (data provenance). Silsilah data adalah rekaman kronologis formal mengenai asal-usul data, tahapan transformasi pembersihan apa yang telah diterapkan, perangkat lunak serta versi algoritma apa yang mengeksekusinya, dan siapa operator yang bertanggung jawab.

Tanpa silsilah data yang jelas, muncul fenomena "data amnesia": enam bulan setelah eksperimen selesai, peneliti sendiri tidak mampu merekonstruksi berkas excel mana yang menghasilkan grafik pada Gambar 4 naskah ilmiah mereka.

Untuk memastikan data tidak termutasi atau termanipulasi secara tidak sengaja seiring berjalannya waktu, digunakan instrumen kriptografi berupa Fungsi Hash Satu Arah (Cryptographic Hash Function), khususnya algoritma Secure Hash Algorithm 256-bit (SHA-256).
- Fungsi hash memetakan berkas data berukuran berapa pun (dari 1 kilobita hingga 10 terabita) menjadi string heksadesimal unik berpanjang tepat 64 karakter.
- Sifat sensitivitas ekstrem (Avalanche Effect): Pengubahan satu bit data saja pada berkas sebesar 1 gigabita akan mengubah lebih dari 50% karakter nilai hash output.

Dengan mencantumkan nilai checksum hash pada laporan penelitian atau repositori publik, peneliti memberikan jaminan matematis bahwa dataset yang diperiksa oleh pembaca identik sempurna dengan data saat eksperimen dijalankan.`,
    mathematicalFoundations: `Fungsi hash kriptografis $H: \\{0, 1\\}^* \\longrightarrow \\{0, 1\\}^{256}$ dengan sifat matematis:

1. Ketahanan Pre-image (Pre-image Resistance):
Diberikan nilai hash $h$, secara komputasional mustahil menemukan pesan $M$ sedemikian sehingga:
$$H(M) = h \\quad [\\mathcal{O}(2^{256}) \\text{ operasi}]$$

2. Ketahanan Kolisi (Collision Resistance):
Secara komputasional mustahil menemukan dua pesan berbeda $M_1 \\neq M_2$ sedemikian sehingga:
$$H(M_1) = H(M_2) \\quad [\\mathcal{O}(2^{128}) \\text{ operasi basis paradoks ulang tahun}]$$

Integritas Dataset Eksperimen:
Jika $h_{\\text{publikasi}} = H(\\text{Dataset}_{\\text{unduh}})$, maka probabilitas keterjadiaan modifikasi tersembunyi tanpa terdeteksi adalah:
$$P(\\text{Tampering Tersembunyi}) < 2^{-128} \\approx 2.9 \\times 10^{-39}$$`,
    workedExample: {
      problemStatement: 'Sebuah laboratorium ITERA mengumpulkan data rekaman getaran jembatan berukuran 4.5 GB. Sebelum disimpan di repositori cloud bersama, dihitung nilai SHA-256 berkas tersebut. Dua minggu kemudian, ukuran berkas di cloud tetap tertulis 4.5 GB, namun nilai SHA-256 berbeda satu karakter pada digit terakhir. Apakah data tersebut masih valid untuk dianalisis?',
      stepByStepSolution: [
        'Langkah 1: Analisis nilai hash: Karakteristik fungsi hash kriptografis menyatakan bahwa kecocokan harus 100% identik dari karakter pertama hingga ke-64.',
        'Langkah 2: Evaluasi perubahan satu karakter hash: Perbedaan nilai hash (bahkan hanya pada satu karakter heksadesimal) membuktikan bahwa isi biner berkas di dalam penyimpanan telah termutasi.',
        'Langkah 3: Identifikasi potensi penyebab: Kerusakan sektor penyimpanan (bit-rot), interupsi pengunggahan tidak sempurna, atau manipulasi data oleh pihak lain.',
        'Langkah 4: Keputusan metodologis: Data di cloud dinyatakan cacat dan tidak sah untuk dianalisis. Peneliti wajib memulihkan berkas dari salinan cadangan dingin (cold offline backup) dan memverifikasi ulang nilai hash aslinya.',
      ],
      resultInterpretation: 'Verifikasi hash kriptografis memberikan kepastian integritas data biner mutlak yang tidak dapat dipalsukan oleh ukuran berkas permukaan.',
    },
    pythonImplementation: {
      description: 'Program komputasi nilai hash SHA-256 untuk memverifikasi integritas berkas data penelitian.',
      libraryDependencies: ['hashlib'],
      code: `import hashlib

def hitung_sha256_teks(teks_data):
    sha = hashlib.sha256()
    sha.update(teks_data.encode('utf-8'))
    return sha.hexdigest()

# Data simulasi berkas rekaman sensor [SIMULASI/SYNTHETIC DATA]
data_eksperimen_asli = "TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.301"
# Simulasi mutasi kecil satu digit data (3.301 -> 3.302)
data_eksperimen_rusak = "TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.302"

hash_asli = hitung_sha256_teks(data_eksperimen_asli)
hash_rusak = hitung_sha256_teks(data_eksperimen_rusak)

print(f"Hash Data Asli : {hash_asli}")
print(f"Hash Data Rusak: {hash_rusak}")
print(f"Apakah Data Identik Sempurna? {hash_asli == hash_rusak}")
`,
      expectedOutput: `Hash Data Asli : 3f5d506990d1f95d8869c9dc8bbff8c0a06fae98e9b6264ffdfb88cfa0f26229
Hash Data Rusak: e39045b85d38f8cf6ae13bb01a750059c381c5fdf44181ba4c9ff3f317ee92a2
Apakah Data Identik Sempurna? False`,
    },
    commonPitfalls: [
      'Menyimpan dataset akhir dalam format biner tertutup (proprietary) yang bergantung pada versi perangkat lunak tertentu yang belum tentu dapat dibuka di masa depan.',
      'Tidak mencatat versi dependensi pustaka perangkat lunak pengolah data (seperti file requirements.txt atau Dockerfile).',
      'Mengganti nama kolom atau menghapus baris data tanpa mencatat perubahan tersebut dalam skrip terotomasi atau berkas metadata README.',
    ],
    validationProcedures: [
      'Sertakan berkas manifest checksum SHA-256 untuk seluruh dataset mentah sebelum memulai fase analisis apa pun.',
      'Uji replikabilitas alur data dari mentah hingga grafik akhir menggunakan skrip eksekusi satu-perintah (*single-command reproduction pipeline*).',
    ],
    exercises: [
      {
        question: 'Mengapa prinsip FAIR (Findable, Accessible, Interoperable, Reusable) merekomendasikan penyimpanan data ilmiah mentah dalam format teks terbuka (seperti .csv atau .json) dibanding format lembar kerja tertutup (.xlsx)?',
        hint: 'Perhatikan keberlanjutan akses jangka panjang dan kompatibilitas lintas sistem operasi.',
        answerExplanation: 'Format teks terbuka seperti .csv dan .json tidak terikat pada vendor perangkat lunak tertentu, kebal terhadap perubahan versi sistem operasi, mudah dikelola menggunakan sistem kontrol versi (seperti Git), dan dapat di-parsing secara efisien oleh berbagai bahasa pemrograman ilmiah kapan pun di masa depan tanpa hambatan lisensi perangkat lunak.',
      },
    ],
    references: [
      { citation: 'Wilkinson, M. D., et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3, 160018.', type: 'peer-reviewed-article' },
      { citation: 'Moreau, L., et al. (2011). The Open Provenance Model core specification (v1.1). Future Generation Computer Systems, 27(6), 743-756.', type: 'peer-reviewed-article' },
    ],
  },
};

