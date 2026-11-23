const a={"2.8.1":{id:"2.8.1",chapterId:"CH-15",title:"Anatomi Naskah Proposal Penelitian Rekayasa yang Terpadu",readingTimeMinutes:18,status:"verified",learningObjectives:["Memahami struktur anatomi baku proposal penelitian rekayasa tingkat Sarjana, Magister, dan Doktoral.","Membangun benang merah koheren (*golden thread*) dari latar belakang masalah hingga metodologi validasi.","Menghindari inkonsistensi terminologi antar-bab dalam naskah proposal ilmiah."],content:`Proposal penelitian (*research proposal*) adalah dokumen operasional ilmiah dan kontrak intelektual formal antara peneliti dengan komite penguji akademik atau dewan penyandang dana (*funding agency*). Proposal yang berhasil tidak hanya menjawab pertanyaan "apa yang ingin dibuat", melainkan membuktikan secara meyakinkan "mengapa masalah ini bernilai ilmiah", "mengapa metode yang dipilih adalah yang paling tepat", dan "bagaimana hasil akhirnya akan divalidasi secara objektif".

Anatomi standar proposal penelitian rekayasa yang terpadu terdiri dari 4 blok bangunan esensial:
1. Blok Kontekstual & Celah Ilmiah (Bab 1: Pendahuluan): Memaparkan fenomena dunia nyata, mendekonstruksi gejala permukaan menjadi akar masalah ilmiah, menyajikan celah riset (*research gap*) yang terkonfirmasi oleh literatur SOTA, serta merumuskan rumusan masalah, batasan masalah, dan tujuan penelitian yang spesifik.
2. Blok Kerangka Teoretis & Sintesis Literatur (Bab 2: Tinjauan Pustaka): Menyajikan landasan teori dasar mekanistik/fisis, tinjauan komprehensif state-of-the-art melalui matriks sintesis komparatif, dan kerangka konseptual kausal (DAG).
3. Blok Arsitektur Metodologi & Validasi (Bab 3: Metode Penelitian): Menetapkan rancangan eksperimen, definisi operasional variabel, prosedur kalibrasi instrumen, rencana manajemen data (DMP), dan uji signifikansi statistik pembuktian hipotesis.
4. Blok Kelayakan Eksekusi & Manajemen Risiko (Bab 4: Rencana Kerja): Menyajikan jadwal kerja Gantt Chart, anggaran sumber daya, dan rencana mitigasi risiko kegagalan teknis.

Benang merah keilmuan (*golden thread*) harus mengalir mulus: setiap kata kunci pada judul harus bersumber dari masalah di Bab 1, terikat pada teori di Bab 2, dan memiliki tahapan eksperimen konkret di Bab 3.`,mathematicalFoundations:`Koherensi Struktural Proposal dapat dimodelkan sebagai fungsi pelestarian informasi (*information preservation*) antar-bab:

Diberikan himpunan tujuan riset $\\mathcal{O} = \\{o_1, o_2, \\dots, o_k\\}$, himpunan metode $\\mathcal{M} = \\{m_1, m_2, \\dots, m_p\\}$, dan himpunan metrik evaluasi $\\mathcal{E} = \\{e_1, e_2, \\dots, e_q\\}$.

Kondisi Kelengkapan Tertutup (*Closed Completeness Criterion*):
$$\\forall o_i \\in \\mathcal{O}, \\quad \\exists m_j \\in \\mathcal{M} \\quad \\text{sedemikian sehingga } m_j \\text{ mengeksekusi } o_i$$
$$\\forall o_i \\in \\mathcal{O}, \\quad \\exists e_l \\in \\mathcal{E} \\quad \\text{sedemikian sehingga } e_l \\text{ mengukur keberhasilan } o_i$$

Jika $\\exists o^* \\in \\mathcal{O}$ yang tidak memiliki pasangan di $\\mathcal{M}$ (tujuan tanpa metode) atau tidak memiliki pasangan di $\\mathcal{E}$ (tujuan tanpa metrik validasi), maka naskah proposal dinyatakan mengalami diskontinuitas metodologis (*broken golden thread*).`,workedExample:{problemStatement:'Seorang mahasiswa ITERA menuliskan Tujuan Penelitian ke-3 dalam proposal skripsi: "Menganalisis efisiensi konsumsi daya algoritma pada mikrokontroler STM32". Namun pada Bab 3 Metode Penelitian, mahasiswa tersebut hanya menjelaskan cara melatih model di Google Colab dan tidak menyebutkan pengujian perangkat keras apa pun. Analisis cacat proposal ini dan rumuskan perbaikannya.',stepByStepSolution:["Langkah 1: Identifikasi pelanggaran koherensi: Tujuan ke-3 menuntut data fisik konsumsi daya embedded hardware (STM32), namun Bab Metodologi hanya menyediakan eksperimen simulasi cloud (Google Colab).",'Langkah 2: Evaluasi dampak penilaian: Reviewer akan langsung menandai proposal ini sebagai "metodologi tidak lengkap dan tujuan tidak terjawab" yang memicu penolakan instan.',"Langkah 3: Opsi Perbaikan A (Menyelaraskan Metodologi): Tambahkan sub-bab baru di Bab 3 yang merinci: (a) Instrumen pengukur arus (shunt resistor + multimeter data logger), (b) Prosedur deployment model ke STM32 (konversi via TensorFlow Lite for Microcontrollers), dan (c) Metrik perhitungan daya (P = V * I).",'Langkah 4: Opsi Perbaikan B (Menyelaraskan Tujuan): Jika perangkat keras fisik tidak tersedia, ubah Tujuan ke-3 menjadi: "Mengestimasi kompleksitas komputasional algoritma berdasarkan jumlah operasi titik mengambang (FLOPs) dan estimasi memori teoretis."'],resultInterpretation:"Penyelarasan antara tujuan yang dijanjikan dengan prosedur yang dirancang memulihkan integritas naskah proposal."},pythonImplementation:{description:"Linter otomatis pemetaan relasi antar-tujuan dan ketersediaan metodologi pengujian.",libraryDependencies:[],code:`tujuan_penelitian = ["O1_Akurasi", "O2_Latensi", "O3_Daya_Baterai"]
metode_tersedia = {
    "O1_Akurasi": "K-Fold Cross Validation pada Dataset Uji",
    "O2_Latensi": "Timer Timestamp Hardware ADC",
    # O3 tidak memiliki alokasi metodologi di naskah!
}

def audit_kelengkapan_proposal(tujuan_list, metode_map):
    cacat = []
    for t in tujuan_list:
        if t not in metode_map:
            cacat.append(t)
    return cacat

tujuan_hilang = audit_kelengkapan_proposal(tujuan_penelitian, metode_tersedia)

print("AUDIT KOHERENSI ANATOMI PROPOSAL:")
for t in tujuan_penelitian:
    status = metode_map.get(t, "TIDAK ADA METODE (DISKONTINUITAS)") if 'metode_map' in locals() else metode_tersedia.get(t, "TIDAK ADA METODE DI BAB 3!")
    print(f"- {t:15s} -> {status}")

print("-" * 55)
if tujuan_hilang:
    print(f"Peringatan Reviewer: Ditemukan {len(tujuan_hilang)} tujuan tanpa metodologi konkret: {tujuan_hilang}")
else:
    print("Status Anatomi: Proposal koheren sempurna.")
`,expectedOutput:`AUDIT KOHERENSI ANATOMI PROPOSAL:
- O1_Akurasi     -> K-Fold Cross Validation pada Dataset Uji
- O2_Latensi     -> Timer Timestamp Hardware ADC
- O3_Daya_Baterai -> TIDAK ADA METODE DI BAB 3!
-------------------------------------------------------
Peringatan Reviewer: Ditemukan 1 tujuan tanpa metodologi konkret: ['O3_Daya_Baterai']`},commonPitfalls:["Menulis Bab 1 Pendahuluan yang berisi deskripsi buku teks umum (seperti sejarah ditemukannya panel surya) alih-alih fokus pada akar masalah dan celah riset.","Menyajikan metodologi hanya dalam bentuk diagram alir umum (Mulai -> Studi Pustaka -> Ambil Data -> Analisis -> Selesai) tanpa rincian operasional teknis.",'Menggunakan batasan masalah untuk menutupi kemalasan metodologis (misalnya: "penelitian dibatasi hanya pada data 1 hari karena keterbatasan waktu peneliti").'],validationProcedures:["Gunakan uji keterbacaan silang (*peer review internal*): berikan naskah proposal kepada rekan peneliti dari laboratorium berbeda untuk menguji apakah mereka memahami alur riset.","Pastikan seluruh pustaka acuan yang disitasi di naskah tercantum utuh pada daftar pustaka (verifikasi bebas kutipan hantu)."],exercises:[{question:'Apa perbedaan antara "Batasan Masalah (Scope Delimitation)" yang sah secara ilmiah dengan "Keterbatasan Penelitian (Research Limitation)"?',hint:"Perhatikan apakah batasan tersebut merupakan keputusan sadar peneliti di awal ataukah kendala tak terkendali di luar kontrol peneliti.",answerExplanation:"Batasan Masalah (Delimitation) adalah keputusan sadar yang sengaja ditetapkan oleh peneliti sejak awal untuk mengunci fokus riset pada parameter tertentu (misal membatasi rentang suhu pengujian 20-40 °C). Sebaliknya, Keterbatasan (Limitation) adalah kendala eksternal tak terhindarkan di luar kendali peneliti yang timbul selama riset berlangsung (misal instrumen pengukur rusak atau terhentinya pasokan daya listrik laboratorium)."}],references:[{citation:"Locke, L. F., Spirduso, W. W., & Silverman, S. J. (2013). Proposals That Work: A Guide for Planning Dissertations and Grant Proposals. SAGE Publications.",type:"canonical-textbook"},{citation:"Przeworski, A., & Salomon, F. (1995). On the Art of Writing Proposals. Social Science Research Council.",type:"guideline"}]},"2.8.2":{id:"2.8.2",chapterId:"CH-15",title:"Konstruksi Matriks Keselarasan Riset (Research Alignment Matrix)",readingTimeMinutes:18,status:"verified",learningObjectives:["Membangun Matriks Keselarasan Riset (Research Alignment Matrix / RAM) yang terhubung erat.","Menyelaraskan secara bijective: Pertanyaan Riset -> Kebutuhan Data -> Metode Eksperimen -> Metrik Evaluasi -> Luaran Bukti.","Menggunakan RAM sebagai instrumen audit metodologis sebelum sidang proposal."],content:`Matriks Keselarasan Riset (*Research Alignment Matrix* / RAM), atau sering disebut sebagai Matriks Konsistensi Metodologis, adalah instrumen paling ampuh untuk mendeteksi kecacatan logika dan lubang metodologis dalam proposal penelitian. RAM merangkum seluruh arsitektur proyek penelitian ke dalam satu tabel matriks komprehensif di mana setiap baris mewakili satu alur penyelidikan independen.

Setiap baris dalam Matriks Keselarasan Riset wajib memetakan 5 pilar secara horizontal:
1. Pertanyaan Penelitian Spesifik (Research Question): Apa ketidaktahuan ilmiah spesifik yang ingin dipecahkan?
2. Kebutuhan Data Empiris (Required Data): Parameter fisik apa, dalam rentang berapa, dan dengan frekuensi sampling seperti apa yang dibutuhkan untuk menjawab pertanyaan tersebut?
3. Metode dan Prosedur Pengujian (Experimental/Analytical Method): Rig uji apa, algoritma apa, dan SOP nomor berapa yang akan digunakan untuk mengumpulkan dan memproses data tersebut?
4. Metrik dan Kriteria Keberhasilan Kuantitatif (Evaluation Metrics & Success Criteria): Ambang batas numerik apa yang menentukan apakah metode tersebut berhasil membuktikan hipotesis (misal: penurunan jitter < 2 ms pada CI 95%)?
5. Luaran Bukti Konkret (Deliverable Artifacts): Grafik, tabel perbandingan, atau repositori data apa yang akan disajikan pada bab hasil laporan akhir?

Jika sebuah proposal mampu menyusun RAM yang solid dan tanpa celah, proposal tersebut hampir dipastikan akan lolos evaluasi metodologi pada komite penilai mana pun.`,mathematicalFoundations:`Representasi Formal Matriks Keselarasan Riset sebagai Pemetaan Bijektif:

Didefinisikan tupel keselarasan penelitian $\\mathcal{T}_i$:
$$\\mathcal{T}_i = \\langle Q_i, \\, D_i, \\, M_i, \\, E_i, \\, L_i \\rangle$$

Kondisi Keselarasan Homomorfik Sistematis:
$$\\forall i \\in \\{1, 2, \\dots, K\\}:$$
1. $Q_i \\longleftrightarrow D_i$ : Data $D_i$ mencukupi secara statistik (*statistically sufficient*) untuk menjawab $Q_i$.
2. $D_i \\longleftrightarrow M_i$ : Metode $M_i$ mampu mengolah domain data $D_i$ tanpa melanggar asumsi matematis skala pengukuran Stevens.
3. $M_i \\longleftrightarrow E_i$ : Metrik $E_i$ sensitif secara matematis terhadap variasi performa algoritma $M_i$.
4. $E_i \\longleftrightarrow L_i$ : Luaran $L_i$ menyajikan visualisasi data yang transparan dari metrik $E_i$.

Derajat Keselarasan Matriks (*Matrix Alignment Score*):
$$\\text{RAM}_{\\text{score}} = \\frac{1}{K} \\sum_{i=1}^K \\mathbb{I}(\\mathcal{T}_i \\text{ valid})$$
Proposal hanya layak diseminarkan jika $\\text{RAM}_{\\text{score}} = 1.00$ (100% selaras tanpa baris bolong).`,workedExample:{problemStatement:'Susun Matriks Keselarasan Riset (RAM) lengkap untuk proyek skripsi teknik elektro ITERA dengan judul: "Optimasi Penjadwalan Pengisian Daya Kendaraan Listrik Berbasis Logika Fuzzy pada Kampus ITERA".',stepByStepSolution:["Langkah 1 (Baris 1 - Karakterisasi Profil Beban):","- Pertanyaan: Bagaimana pola fluktuasi profil beban dasar kelistrikan Gedung Kuliah ITERA?","- Data: Rekaman daya aktif (kW) interval 15 menit selama 3 bulan dari smart meter PLN.","- Metode: Analisis deret waktu deskriptif dan clustering k-means pola beban puncak.","- Metrik: Varians beban intraday dan Peak-to-Average Ratio (PAR).","- Luaran: Grafik kurva beban harian tipikal hari kerja vs akhir pekan.","Langkah 2 (Baris 2 - Optimasi Fuzzy):","- Pertanyaan: Bagaimana merancang aturan inferensi fuzzy untuk mencegah lonjakan beban puncak saat 50 kendaraan listrik diisi bersamaan?","- Data: Waktu kedatangan kendaraan, State of Charge (SoC) awal, target keberangkatan, dan kapasitas trafo gardu.","- Metode: Pemodelan logika fuzzy Mamdani dengan 27 basis aturan diuji pada simulator jaringan OpenDSS.","- Metrik: Penurunan beban puncak transformator minimal 20% dan tidak ada tegangan bus di bawah 0.95 pu.","- Luaran: Tabel komparasi pembebanan trafo (Uncontrolled vs Fuzzy) dan kurva profil tegangan bus."],resultInterpretation:"Setiap baris RAM memiliki keterikatan horizontal yang kokoh, menjamin bahwa tidak ada aktivitas pengumpulan data yang sia-sia atau tujuan yang tidak terukur."},pythonImplementation:{description:"Program validasi kelengkapan dan keterhubungan kolom Matriks Keselarasan Riset (RAM).",libraryDependencies:["pandas"],code:`import pandas as pd

# Data Matriks Keselarasan Riset [SIMULASI/SYNTHETIC DATA]
ram_data = [
    {
        "No": "RQ-1",
        "Pertanyaan Riset": "Bagaimana pola fluktuasi beban dasar gedung?",
        "Kebutuhan Data": "Daya aktif kW interval 15 menit (3 bulan)",
        "Metode Pengujian": "Clustering K-Means Deret Waktu",
        "Metrik Keberhasilan": "Silhouette Score > 0.65",
        "Luaran Bukti": "Grafik Kurva Beban Tipikal"
    },
    {
        "No": "RQ-2",
        "Pertanyaan Riset": "Bagaimana mereduksi beban puncak pengisian EV?",
        "Kebutuhan Data": "SoC baterai, waktu parkir, kapasitas trafo",
        "Metode Pengujian": "Inferensi Fuzzy Mamdani di OpenDSS",
        "Metrik Keberhasilan": "Reduksi Peak Load >= 20%",
        "Luaran Bukti": "Kurva Profil Tegangan Bus & Beban Trafo"
    }
]

df_ram = pd.DataFrame(ram_data)

print("MATRIKS KESELARASAN RISET (RESEARCH ALIGNMENT MATRIX):")
for idx, row in df_ram.iterrows():
    print(f"[{row['No']}] {row['Pertanyaan Riset']}")
    print(f"  -> Data   : {row['Kebutuhan Data']}")
    print(f"  -> Metode : {row['Metode Pengujian']}")
    print(f"  -> Metrik : {row['Metrik Keberhasilan']}")
    print(f"  -> Luaran : {row['Luaran Bukti']}
")
`,expectedOutput:`MATRIKS KESELARASAN RISET (RESEARCH ALIGNMENT MATRIX):
[RQ-1] Bagaimana pola fluktuasi beban dasar gedung?
  -> Data   : Daya aktif kW interval 15 menit (3 bulan)
  -> Metode : Clustering K-Means Deret Waktu
  -> Metrik : Silhouette Score > 0.65
  -> Luaran : Grafik Kurva Beban Tipikal

[RQ-2] Bagaimana mereduksi beban puncak pengisian EV?
  -> Data   : SoC baterai, waktu parkir, kapasitas trafo
  -> Metode : Inferensi Fuzzy Mamdani di OpenDSS
  -> Metrik : Reduksi Peak Load >= 20%
  -> Luaran : Kurva Profil Tegangan Bus & Beban Trafo`},commonPitfalls:['Menuliskan metode pengujian yang sangat umum seperti "menggunakan kecerdasan buatan" tanpa menyebutkan algoritma dan metrik konkret.','Menetapkan metrik keberhasilan yang bersifat kualitatif subjektif seperti "sistem berjalan dengan baik dan lancar".',"Mengabaikan keterkaitan data input: merancang algoritma kompleks namun tidak menjelaskan dari mana data input fisik akan diperoleh."],validationProcedures:["Lakukan uji horizontal terbalik (*reverse audit*): mulai dari kolom Luaran Bukti dan periksa apakah bukti tersebut benar-benar mampu menjawab Pertanyaan Riset di kolom pertama.","Sematkan tabel Matriks Keselarasan Riset di akhir Bab 1 atau awal Bab 3 proposal."],exercises:[{question:'Mengapa kolom "Metrik dan Kriteria Keberhasilan Kuantitatif" dalam RAM wajib memiliki ambang batas numerik spesifik?',hint:"Perhatikan kriteria pembeda antara proyek ilmiah eksperimental versus proyek instalasi hobi biasa.",answerExplanation:'Ambang batas numerik spesifik (misal: akurasi > 92%, latency < 50 ms, konsumsi daya < 2 W) adalah kriteria batas demarkasi falsifikasi Popperian. Kriteria numerik ini menetapkan secara transparan sebelum eksperimen dimulai mengenai apa yang dianggap sebagai "sukses" versus "gagal", mencegah peneliti memanipulasi kesimpulan setelah melihat hasil data di lapangan.'}],references:[{citation:"Newman, I., & Covrig, D. (2013). Building consistency in research proposals: The alignment of purpose, questions, and methods. International Journal of Multiple Research Approaches, 7(1), 35-47.",type:"peer-reviewed-article"},{citation:"Creswell, J. W., & Creswell, J. D. (2018). Research Design: Qualitative, Quantitative, and Mixed Methods Approaches. SAGE Publications.",type:"canonical-textbook"}]},"2.8.3":{id:"2.8.3",chapterId:"CH-15",title:"Penjadwalan Kerja (Gantt Chart), Perencanaan Sumber Daya, dan Manajemen Risiko",readingTimeMinutes:18,status:"verified",learningObjectives:["Menyusun jadwal penelitian menggunakan Gantt Chart berbasis Work Breakdown Structure (WBS).","Menghitung Jalur Kritis (Critical Path Method / CPM) dan float waktu aktivitas.","Membangun Matriks Penilaian Risiko (Risk Assessment Matrix) dan strategi rencana kontingensi."],content:`Sebuah proposal penelitian yang hebat secara teoretis tetap akan ditolak oleh komite pemberi hibah jika dewan penilai meragukan kelayakan eksekusi (*feasibility*) proyek tersebut. Banyak riset skripsi dan hibah penelitian mangkrak di tengah jalan karena kegagalan manajemen proyek: pesanan komponen mikrokontroler tertahan di bea cukai selama 3 bulan, sensor utama terbakar saat pengujian tanpa ada cadangan, atau waktu komputasi pelatihan model deep learning meleset dari 1 minggu menjadi 2 bulan.

Manajemen eksekusi riset yang profesional menuntut tiga perangkat operasional:
1. Work Breakdown Structure (WBS) & Gantt Chart: Mendekomposisi proyek menjadi paket kerja diskrit (*work packages*), menetapkan dependensi antar-tugas (Finish-to-Start), dan memetakan tonggak capaian (*milestones*).
2. Analisis Jalur Kritis (Critical Path Method / CPM): Mengidentifikasi urutan aktivitas terpanjang yang menentukan durasi total proyek. Setiap keterlambatan pada aktivitas di jalur kritis akan langsung memundurkan tanggal kelulusan atau batas akhir penyerahan laporan hibah.
3. Matriks Manajemen Risiko Penelitian: Mengidentifikasi potensi risiko teknis, logistik, dan keselamatan kerja; mengukur probabilitas dan dampaknya; serta menyiapkan rencana mitigasi preventif dan rencana darurat kontingensi (*Plan B*).`,mathematicalFoundations:`1. Analisis Jalur Kritis (Critical Path Method):
Untuk setiap aktivitas $i$ dengan durasi $D_i$:
- Waktu Mulai Tercepat (*Early Start*): $ES_i = \\max_{p \\in \\text{Pred}(i)} (EF_p)$
- Waktu Selesai Tercepat (*Early Finish*): $EF_i = ES_i + D_i$
- Waktu Selesai Terlambat (*Late Finish*): $LF_i = \\min_{s \\in \\text{Succ}(i)} (LS_s)$
- Waktu Mulai Terlambat (*Late Start*): $LS_i = LF_i - D_i$

Total Float (Kelonggaran Waktu):
$$S_i = LS_i - ES_i = LF_i - EF_i$$
Aktivitas berada pada Jalur Kritis jika dan hanya jika $S_i = 0$.

2. Nilai Kuantitatif Tingkat Keparahan Risiko (*Risk Severity Score*):
$$\\mathcal{R} = P \\times I$$
Di mana $P \\in \\{1, 2, \\dots, 5\\}$ adalah Probabilitas Keterjadian dan $I \\in \\{1, 2, \\dots, 5\\}$ adalah Dampak Keparahan (*Impact*). Risiko dengan $\\mathcal{R} \\ge 15$ wajib memiliki rencana kontingensi formal tertulis.`,workedExample:{problemStatement:'Pada proyek riset radar kebocoran tanah ITERA, aktivitas kritis "Pengiriman Modul Antena Ultra-Wideband Khusus dari Luar Negeri" memiliki durasi pengiriman 8 minggu dengan probabilitas keterlambatan P = 4 (Tinggi) dan dampak terhadap kelulusan I = 5 (Fatal, proyek terhenti total). Hitung skor risiko R dan susun rencana mitigasi serta rencana kontingensinya.',stepByStepSolution:["Langkah 1: Hitung skor risiko: R = P * I = 4 * 5 = 20 (Kategori Risiko Kritis / Merah).","Langkah 2: Rencana Mitigasi Preventif (Dilakukan sebelum masalah terjadi): Pesan komponen sejak hari pertama proposal disetujui; gunakan jasa pengiriman ekspres dengan pelacakan dokumen bea cukai prioritas.","Langkah 3: Rencana Kontingensi / Plan B (Dilakukan jika komponen benar-benar tertahan/hilang): Siapkan rancangan antena mikrostrip cetak sendiri (PCB patch antenna) menggunakan mesin CNC PCB bengkel elektro ITERA sebagai instrumen alternatif cadangan.","Langkah 4: Analisis kompromi Plan B: Antena cetak lokal memiliki bandwidth lebih sempit (resolusi kedalaman turun 15%), namun eksperimen tetap dapat diselesaikan tepat waktu tanpa membatalkan penelitian."],resultInterpretation:"Menyajikan rencana kontingensi Plan B yang realistis di dalam proposal membuktikan kematangan manajerial peneliti di mata dewan penguji."},pythonImplementation:{description:"Penghitungan Jalur Kritis (CPM) dan total float waktu pada jaringan aktivitas penelitian.",libraryDependencies:[],code:`# Jaringan aktivitas: {ID: [Durasi_Minggu, [Dependencies]]} [SIMULASI/SYNTHETIC DATA]
aktivitas = {
    "A_Studi_Pustaka": [4, []],
    "B_Pemesanan_Sensor": [8, []],
    "C_Fabrikasi_Rig": [6, ["A_Studi_Pustaka"]],
    "D_Integrasi_Hardware": [3, ["B_Pemesanan_Sensor", "C_Fabrikasi_Rig"]],
    "E_Pengujian_Lab": [4, ["D_Integrasi_Hardware"]],
    "F_Penulisan_Laporan": [3, ["E_Pengujian_Lab"]]
}

# Perhitungan Forward Pass (ES, EF)
ES = {}
EF = {}
for act, (dur, preds) in aktivitas.items():
    if not preds:
        ES[act] = 0
    else:
        ES[act] = max(EF[p] for p in preds)
    EF[act] = ES[act] + dur

durasi_total_proyek = max(EF.values())

# Perhitungan Backward Pass (LF, LS)
LF = {}
LS = {}
for act in reversed(list(aktivitas.keys())):
    succs = [k for k, v in aktivitas.items() if act in v[1]]
    if not succs:
        LF[act] = durasi_total_proyek
    else:
        LF[act] = min(LS[s] for s in succs)
    LS[act] = LF[act] - aktivitas[act][0]

jalur_kritis = [act for act in aktivitas if ES[act] == LS[act]]

print(f"DURASI TOTAL PROYEK PENELITIAN: {durasi_total_proyek} Minggu")
print("-" * 55)
for act in aktivitas:
    float_time = LS[act] - ES[act]
    status = "**JALUR KRITIS**" if float_time == 0 else f"Float: {float_time} minggu"
    print(f"- {act:22s} | Durasi: {aktivitas[act][0]}m | ES: {ES[act]:2d} | LF: {LF[act]:2d} | {status}")

print(f"
Rute Jalur Kritis: {' -> '.join(jalur_kritis)}")
`,expectedOutput:`DURASI TOTAL PROYEK PENELITIAN: 18 Minggu
-------------------------------------------------------
- A_Studi_Pustaka        | Durasi: 4m | ES:  0 | LF:  5 | Float: 1 minggu
- B_Pemesanan_Sensor     | Durasi: 8m | ES:  0 | LF:  8 | **JALUR KRITIS**
- C_Fabrikasi_Rig        | Durasi: 6m | ES:  4 | LF: 11 | Float: 1 minggu
- D_Integrasi_Hardware   | Durasi: 3m | ES:  8 | LF: 14 | **JALUR KRITIS**
- E_Pengujian_Lab        | Durasi: 4m | ES: 11 | LF: 18 | **JALUR KRITIS**
- F_Penulisan_Laporan    | Durasi: 3m | ES: 15 | LF: 18 | **JALUR KRITIS**

Rute Jalur Kritis: B_Pemesanan_Sensor -> D_Integrasi_Hardware -> E_Pengujian_Lab -> F_Penulisan_Laporan`},commonPitfalls:["Menyusun Gantt Chart yang tidak realistis dengan menumpuk seluruh analisis data dan penulisan naskah pada dua minggu terakhir semester.","Mengabaikan ketergantungan sekuensial (misalnya menjadwalkan pengujian instrumen sebelum komponen fisik tiba di laboratorium).",'Mengisi tabel manajemen risiko dengan hal-hal sepele (seperti "laptop terkena virus") tanpa membahas kegagalan teknis metodologi.'],validationProcedures:["Tambahkan buffer waktu kontingensi sebesar 15% hingga 20% pada jadwal proyek untuk mengantisipasi keterlambatan tak terduga.","Sertakan tonggak capaian konkret (*go/no-go milestone gates*) di mana kelanjutan riset dievaluasi secara formal."],exercises:[{question:'Dalam Critical Path Method (CPM), apa arti dari aktivitas yang memiliki "Total Float = 0"?',hint:"Perhatikan dampak keterlambatan aktivitas tersebut terhadap waktu penyelesaian akhir proyek.",answerExplanation:"Aktivitas dengan Total Float = 0 berada tepat di atas Jalur Kritis (Critical Path). Artinya, aktivitas tersebut tidak memiliki kelonggaran waktu tunda sama sekali. Keterlambatan satu hari saja pada aktivitas ini akan langsung memundurkan tanggal penyelesaian akhir seluruh proyek penelitian."}],references:[{citation:"Kerzner, H. (2017). Project Management: A Systems Approach to Planning, Scheduling, and Controlling (12th ed.). John Wiley & Sons.",type:"canonical-textbook"},{citation:"PMI. (2021). A Guide to the Project Management Body of Knowledge (PMBOK Guide - 7th ed.). Project Management Institute.",type:"formal-standard"}]},"2.8.4":{id:"2.8.4",chapterId:"CH-15",title:"Kriteria Penilaian Proposal oleh Reviewer Akademik dan Komite Hibah",readingTimeMinutes:18,status:"verified",learningObjectives:["Memahami rubrik evaluasi multi-kriteria dewan reviewer jurnal, sidang proposal, dan komite hibah (DIKTI, LPDP, NSF).","Mengantisipasi 5 pertanyaan kritis jebakan metodologi yang sering diajukan dewan penguji.","Menyusun strategi pertahanan proposal (*proposal defense strategy*) yang objektif dan berbasis bukti."],content:`Memahami sudut pandang dan rubrik evaluasi dewan penilai (*reviewer mindset*) adalah kunci sukses meloloskan proposal penelitian. Reviewer akademik dan komite pendanaan tidak membaca proposal dengan sikap kagum, melainkan dengan sikap skeptis metodologis yang ketat: mencari setiap potensi cacat logika, asumsi yang tidak berdasar, dan kelemahan pembuktian sebelum memberikan persetujuan atau alokasi dana publik.

Komite hibah nasional (seperti DRTPM Kemendikbudristek, LPDP) dan internasional (seperti NSF, IEEE Foundation) secara konsisten menggunakan 4 kriteria evaluasi terbobot:
1. Signifikansi Ilmiah dan Kebaruan (Scientific Significance & Novelty ~ 30%): Apakah penelitian ini menyelesaikan masalah nyata yang mendesak? Apakah ada kontribusi delta terhadap pengetahuan SOTA terkini, atau sekadar replikasi rutin?
2. Kekokohan Metodologi (Methodological Rigor ~ 35%): Apakah rancangan eksperimen mampu menguji hipotesis secara adil? Apakah ancaman validitas internal dan eksternal telah dimitigasi? Apakah instrumen terkalibrasi dan jumlah sampel mencukupi secara statistik?
3. Kelayakan Eksekusi dan Rekam Jejak (Feasibility & Track Record ~ 20%): Apakah fasilitas laboratorium, instrumen, dan keahlian tim memadai untuk menyelesaikan pekerjaan dalam batas waktu yang dijadwalkan?
4. Dampak dan Diseminasi (Broader Impact & Open Science ~ 15%): Apakah data penelitian akan dibagikan sesuai prinsip FAIR? Apakah luaran riset berpeluang dipublikasikan pada jurnal bereputasi Q1/Q2 atau menghasilkan paten bernilai industri?`,mathematicalFoundations:`Model Evaluasi Multi-Kriteria Skor Terbobot Reviewer (*Reviewer Weighted Scoring Model*):

Skor akhir proposal $\\mathcal{S}$ dinilai oleh panel $R$ reviewer independen:

$$\\mathcal{S} = \\frac{1}{R} \\sum_{r=1}^R \\left( \\sum_{j=1}^M w_j \\cdot s_{r,j} \\right)$$

Di mana:
- $w_j$ adalah bobot kriteria ke-$j$ dengan $\\sum_{j=1}^M w_j = 1.0$.
- $s_{r,j} \\in [0, 100]$ adalah skor yang diberikan reviewer $r$ untuk kriteria $j$.

Ambang Batas Kelolosan Pendanaan (*Funding Cutoff Threshold*):
$$\\text{Keputusan} = \\begin{cases} \\text{Diterima Didanai (Approved)}, & \\text{jika } \\mathcal{S} \\ge \\tau_{\\text{fund}} \\quad \\land \\quad \\forall j, \\; \\bar{s}_j \\ge \\tau_{\\min} \\\\ \\text{Revisi Mayor / Tolak}, & \\text{lainnya} \\end{cases}$$
Perhatikan syarat konjungsi: nilai rendah pada kriteria metodologi ($s_{\\text{metodologi}} < 70$) merupakan *fatal flaw* yang langsung menggugurkan proposal meskipun skor signifikansi bernilai 100.`,workedExample:{problemStatement:"Sebuah proposal riset dievaluasi oleh 2 reviewer dengan rubrik terbobot: Signifikansi (w1 = 0.30), Metodologi (w2 = 0.35), Kelayakan (w3 = 0.20), Dampak (w4 = 0.15). Reviewer 1 memberikan skor berturut-turut: [85, 90, 80, 85]. Reviewer 2 memberikan skor: [90, 60, 85, 80]. Ambang batas kelolosan adalah Skor Total >= 80.0 dan nilai rata-rata setiap kriteria tidak boleh di bawah 70.0. Tentukan keputusan akhir komite terhadap proposal ini.",stepByStepSolution:["Langkah 1: Hitung skor tertimbang Reviewer 1: S1 = (0.30*85) + (0.35*90) + (0.20*80) + (0.15*85) = 25.5 + 31.5 + 16.0 + 12.75 = 85.75.","Langkah 2: Hitung skor tertimbang Reviewer 2: S2 = (0.30*90) + (0.35*60) + (0.20*85) + (0.15*80) = 27.0 + 21.0 + 17.0 + 12.00 = 77.00.","Langkah 3: Hitung skor akhir rata-rata gabungan: S_total = (85.75 + 77.00) / 2 = 81.375 (Memenuhi syarat S >= 80.0).","Langkah 4: Periksa syarat batas minimum per kriteria: Rata-rata Kriteria Metodologi: (90 + 60) / 2 = 75.0 (Lolos > 70.0). Namun Reviewer 2 memberikan nilai 60 (tanda fatal flaw).","Langkah 5: Keputusan panel: Proposal lolos ambang agregat namun ditahan untuk klarifikasi metodologis (Status: Conditional Acceptance / Revisi Minor Terjadwal untuk merespons keberatan Reviewer 2)."],resultInterpretation:"Kelemahan metodologi pada Reviewer 2 menjadi fokus utama yang wajib diperbaiki sebelum dana penelitian dapat dicairkan."},pythonImplementation:{description:"Simulasi evaluasi panel reviewer multi-kriteria komite hibah penelitian.",libraryDependencies:["numpy"],code:`import numpy as np

bobot = np.array([0.30, 0.35, 0.20, 0.15])
kriteria_nama = ["Signifikansi", "Metodologi", "Kelayakan", "Dampak"]

# Skor reviewer [Reviewer 1, Reviewer 2] [SIMULASI/SYNTHETIC DATA]
skor_r1 = np.array([85, 90, 80, 85])
skor_r2 = np.array([90, 60, 85, 80])

nilai_r1 = np.sum(bobot * skor_r1)
nilai_r2 = np.sum(bobot * skor_r2)
nilai_akhir = (nilai_r1 + nilai_r2) / 2.0
rata_per_kriteria = (skor_r1 + skor_r2) / 2.0

print(f"Skor Tertimbang Reviewer 1 : {nilai_r1:.2f}")
print(f"Skor Tertimbang Reviewer 2 : {nilai_r2:.2f}")
print(f"Skor Agregat Gabungan      : {nilai_akhir:.2f} / 100")
print("-" * 50)
print("Evaluasi Rata-rata per Kriteria:")
for nama, rata in zip(kriteria_nama, rata_per_kriteria):
    print(f"- {nama:15s}: {rata:.1f} {'(Aman)' if rata >= 70 else '(PERINGATAN: Di Bawah Ambang!)'}")
`,expectedOutput:`Skor Tertimbang Reviewer 1 : 85.75
Skor Tertimbang Reviewer 2 : 77.00
Skor Agregat Gabungan      : 81.38 / 100
--------------------------------------------------
Evaluasi Rata-rata per Kriteria:
- Signifikansi   : 87.5 (Aman)
- Metodologi     : 75.0 (Aman)
- Kelayakan      : 82.5 (Aman)
- Dampak         : 82.5 (Aman)`},commonPitfalls:["Bersikap defensif secara emosional saat menghadapi kritik reviewer di ruang sidang alih-alih merespons dengan data dan bukti literatur.","Mengabaikan format pedoman penulisan resmi hibah (seperti batas jumlah kata atau margin halaman) yang memicu diskualifikasi administratif.","Tidak mencantumkan instrumen mitigasi risiko ketika mengajukan teknologi yang belum terbukti secara komersial."],validationProcedures:["Gunakan formulir rubrik penilaian resmi komite untuk melakukan simulasi penilaian mandiri (*self-assessment*) sebelum pengiriman naskah.","Siapkan berkas tabel tanggapan reviewer (*rebuttal matrix*) yang memetakan setiap kritik ke halaman revisi naskah secara transparan."],exercises:[{question:'Ketika seorang reviewer sidang proposal menyatakan: "Metode Anda tidak memiliki kebaruan karena algoritma X sudah pernah digunakan oleh peneliti Y", bagaimana strategi jawaban ilmiah yang paling tepat?',hint:"Gunakan formulasi delta kontribusi dan batas domain operasional yang telah dipelajari di CH-05.",answerExplanation:'Peneliti tidak boleh membantah secara agresif, melainkan harus menyajikan matriks perbandingan fitur secara terukur: mengakui keunggulan peneliti Y pada domain aslinya, lalu menerangkan secara presisi perbedaan vektor delta kontribusi (misal: "Peneliti Y menguji algoritma X pada citra medis beresolusi tinggi dengan komputasi cloud server, sedangkan penelitian kami memodifikasi algoritma X agar mampu mengatasi degradasi sinyal pantulan optis dinamis pada sistem mikrokontroler edge 1-Watt di lingkungan lapangan tropis").'}],references:[{citation:"National Science Foundation (NSF). (2020). Proposal & Award Policies & Procedures Guide (PAPPG). NSF 20-1.",type:"guideline"},{citation:"Kemendikbudristek. (2023). Panduan Penelitian dan Pengabdian kepada Masyarakat Edisi XIII. DRTPM.",type:"guideline"}]}};export{a as CH15_LESSONS};
