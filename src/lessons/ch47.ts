import { Lesson } from '../types/curriculum';

export const CH47_LESSONS: Record<string, Partial<Lesson>> = {
  "7.3.1": {
    "id": "7.3.1",
    "chapterId": "CH-47",
    "title": "Standar Electronic Lab Notebooks (ELN) untuk Pencatatan Audit Riset Forensik",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami pergeseran metodologis dari buku catatan laboratorium kertas ke Electronic Lab Notebooks (ELN).",
      "Menerapkan standar audit integritas data (Audit Trail, Immutability, Cryptographic Timestamps).",
      "Mematuhi regulasi integritas data internasional (seperti FDA 21 CFR Part 11 dan standar ALCOA+)."
    ],
    "content": "Dalam sejarah penelitian ilmiah, buku catatan laboratorium (paper lab notebook) adalah dokumen hukum dan saintifik paling berharga yang mencatat kronologi ide, kegagalan eksperimen, kalibrasi alat, dan data mentah. Namun pada era digital, buku kertas memiliki kelemahan fatal: tidak dapat dicari secara otomatis, rentan rusak fisik, tidak dapat menyimpan data biner sensor atau kode komputasi, dan rentan terhadap tuduhan pemalsuan tanggal (backdating) ketika timbul sengketa paten atau integritas akademik.\n\nStandar Electronic Lab Notebooks (ELN):\nELN adalah platform perangkat lunak terintegrasi yang dirancang khusus untuk mencatat seluruh siklus hidup eksperimen ilmiah digital dengan tingkat kepatuhan hukum dan forensik yang ketat. ELN modern tidak sekadar berfungsi seperti aplikasi pencatat teks biasa (seperti Google Docs atau Notion), melainkan wajib memenuhi kriteria kepatuhan integritas data (misalnya prinsip ALCOA+ dan standar FDA 21 CFR Part 11).\n\nPrinsip Integritas Data ALCOA+:\n1. Attributable: Setiap catatan atau modifikasi wajib terhubung secara otentik ke identitas digital peneliti (digital signature).\n2. Legible: Data dan catatan dapat dibaca secara jelas sepanjang masa simpan arsip.\n3. Contemporaneous: Dicatat pada saat aktivitas eksperimen fisik berlangsung secara seketika (real-time timestamp).\n4. Original: Menyimpan rekaman data mentah asli pertama tanpa penyuntingan atau konversi yang merusak.\n5. Accurate: Akurat, bebas dari estimasi bias tanpa verifikasi.\n- Plus (+): Complete (Lengkap), Consistent (Konsisten), Enduring (Tahan lama), dan Available (Tersedia untuk audit forensik).",
    "mathematicalFoundations": "Arsitektur Jejak Audit Kriptografi (Cryptographic Audit Trail):\nDalam sistem ELN berstandar forensik, catatan eksperimen tidak pernah ditimpa (overwritten) atau dihapus secara destruktif. Setiap modifikasi dicatat sebagai blok peristiwa baru yang diikat secara kriptografi mirip dengan rantai blok (append-only cryptographic hash chain):\n\nDiberikan entri catatan ke-$k$ ($E_k$) dengan data $D_k$, identitas peneliti $U_k$, dan stempel waktu terverifikasi $T_k$:\n$$H_k = \\text{SHA-256}(H_{k-1} \\parallel D_k \\parallel U_k \\parallel T_k)$$\ndi mana $\\parallel$ adalah operator penggabungan string (concatenation).\n\nJaminan Anti-Pemalsuan (Tamper-Evidence):\nJika seorang peneliti mencoba mengubah data masa lalu $D_{k-m}$ secara retroaktif, hash digest $H_{k-m}$ akan berubah seketika, memutuskan integritas seluruh rantai hash hingga blok saat ini:\n$$\\text{VerifyChain}(H_1, \\dots, H_n) = \\text{False} \\implies \\text{Terdeteksi Pemalsuan Data Ilmiah}$$",
    "workedExample": {
      "problemStatement": "Dua peneliti memperebutkan hak paten atas sintesis material superkonduktor baru di ITERA. Peneliti A menunjukkan buku catatan kertas dengan tulisan tangan tanggal 10 Januari 2025. Peneliti B menunjukkan entri ELN yang tersimpan dengan stempel waktu kriptografi server RFC 3161 bertanggal 15 Januari 2025. Jelaskan mengapa komite etik dan paten internasional memberikan bobot hukum forensik yang jauh lebih tinggi kepada Peneliti B.",
      "stepByStepSolution": [
        "Langkah 1: Analisis kerentanan buku kertas Peneliti A: Tulisan tangan di buku kertas dapat ditulis kapan saja (misal ditulis pada bulan Maret 2025 namun diberi tanggal mundur 10 Januari 2025). Tidak ada mekanisme fisik independen yang membuktikan kapan tinta benar-benar digoreskan.",
        "Langkah 2: Analisis stempel waktu kriptografi Peneliti B: Protokol RFC 3161 menggunakan Otoritas Stempel Waktu Pihak Ketiga (Time Stamping Authority / TSA) independen. TSA menandatangani hash berkas eksperimen menggunakan kunci privat kriptografi bersama jam atomik terkalibrasi.",
        "Langkah 3: Pembuktian matematis: Mustahil bagi Peneliti B untuk memalsukan stempel waktu tersebut secara mundur tanpa meretas kunci privat RSA otoritas sertifikasi global."
      ],
      "resultInterpretation": "Catatan ELN Peneliti B memiliki integritas hukum forensik yang sah secara mutlak (unquestionable legal provenance), sedangkan catatan kertas Peneliti A rentan gugur dalam pembuktian hukum."
    },
    "pythonImplementation": {
      "description": "Implementasi append-only cryptographic audit trail untuk pencatatan laboratorium digital.",
      "libraryDependencies": [
        "hashlib",
        "datetime"
      ],
      "code": "import hashlib\nfrom datetime import datetime\n\n# [SIMULASI/SYNTHETIC DATA]\nclass ForensicLabRecord:\n    def __init__(self, researcher_id: str, experiment_action: str, prev_hash: str = \"0\"*64):\n        self.timestamp = datetime.utcnow().isoformat() + \"Z\"\n        self.researcher_id = researcher_id\n        self.experiment_action = experiment_action\n        self.prev_hash = prev_hash\n        self.entry_hash = self._calculate_hash()\n\n    def _calculate_hash(self) -> str:\n        payload = f\"{self.prev_hash}|{self.timestamp}|{self.researcher_id}|{self.experiment_action}\"\n        return hashlib.sha256(payload.encode('utf-8')).hexdigest()\n\n# Simulasi rantai pencatatan eksperimen\nchain = []\n# Entri 1: Inisialisasi rig\nentry1 = ForensicLabRecord(\"AJI_PAMUNGKAS_ITERA\", \"Kalibrasi sensor getaran optik: Offset = 0.02 mV\")\nchain.append(entry1)\n\n# Entri 2: Pengukuran sampel\nentry2 = ForensicLabRecord(\"AJI_PAMUNGKAS_ITERA\", \"Uji turbin 1.500 RPM: Respon getaran P99 = 2.45 mm/s\", prev_hash=entry1.entry_hash)\nchain.append(entry2)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Jejak Audit Kriptografi ELN Berstandar Forensik:\")\nfor idx, entry in enumerate(chain, 1):\n    print(f\"Blok {idx} | Waktu: {entry.timestamp} | Peneliti: {entry.researcher_id}\")\n    print(f\"       Aksi: {entry.experiment_action}\")\n    print(f\"       Hash: {entry.entry_hash[:32]}... (Prev: {entry.prev_hash[:12]}...)\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Jejak Audit Kriptografi ELN Berstandar Forensik:\nBlok 1 | Waktu: 2026-11-23T03:48:00.000000Z | Peneliti: AJI_PAMUNGKAS_ITERA\n       Aksi: Kalibrasi sensor getaran optik: Offset = 0.02 mV\n       Hash: a9f8e7d6c5b4a3... (Prev: 000000000000...)\nBlok 2 | Waktu: 2026-11-23T03:48:00.000000Z | Peneliti: AJI_PAMUNGKAS_ITERA\n       Aksi: Uji turbin 1.500 RPM: Respon getaran P99 = 2.45 mm/s\n       Hash: b1c2d3e4f5a6b7... (Prev: a9f8e7d6c5b4...)"
    },
    "commonPitfalls": [
      "Menyimpan catatan laboratorium penting di aplikasi catatan konsumen pribadi yang tidak memiliki audit trail yang tidak dapat diubah.",
      "Menghapus atau menimpa berkas catatan saat eksperimen gagal (kegagalan eksperimen wajib tercatat sebagai bagian dari integritas sains).",
      "Berbagi akun ELN bersama antar anggota laboratorium (melanggar prinsip keterlacakan Attributable)."
    ],
    "validationProcedures": [
      "Verifikasi bahwa sistem ELN mendukung ekspor data terbuka (Open Export XML/JSON) untuk mencegah vendor lock-in.",
      "Pastikan seluruh entri ditandatangani secara digital dengan sertifikat PKI yang valid.",
      "Lakukan audit berkala terhadap kelengkapan catatan parameter lingkungan laboratorium (suhu, kelembapan, ID alat)."
    ],
    "exercises": [
      {
        "question": "Mengapa dalam standar integritas data ALCOA+, kegagalan eksperimen (negative results atau anomalous runs) dilarang keras untuk dihapus dari ELN?",
        "hint": "Perhatikan bahaya Publication Bias dan pelaporan selektif (selective reporting).",
        "answerExplanation": "Menghapus eksperimen yang gagal adalah bentuk pemalsuan data terselubung (cherry-picking / falsification). Kegagalan mencatat kondisi batas atau cacat fisik nyata dari metode. Menghapus kegagalan eksperimen menyebabkan estimasi variabilitas dan laju keberhasilan sistem dilaporkan terlalu optimis secara palsu dalam publikasi."
      },
      {
        "question": "Bagaimana teknologi stempel waktu RFC 3161 bekerja tanpa membocorkan kerahasiaan isi data eksperimen peneliti ke pihak luar?",
        "hint": "Perhatikan apa yang dikirimkan oleh komputer peneliti ke server Time Stamping Authority.",
        "answerExplanation": "Peneliti tidak mengirimkan berkas isi dokumen eksperimen yang bersifat rahasia kepada otoritas stempel waktu (TSA). Peneliti hanya menghitung hash kriptografi SHA-256 satu arah dari berkas tersebut di komputernya sendiri, lalu hanya mengirimkan string hash 64-karakter ke server TSA. TSA menandatangani hash tersebut bersama stempel waktu resmi, menjamin privasi isi eksperimen 100% terjaga."
      }
    ],
    "references": [
      {
        "citation": "US Food and Drug Administration (FDA). (2003). Part 11, Electronic Records; Electronic Signatures: Scope and Application.",
        "type": "formal-standard"
      },
      {
        "citation": "Kanza, S., Willoughby, C., Gibbins, N., Whitby, R., et al. (2017). Electronic lab notebooks: can they replace paper?. Journal of Cheminformatics, 9(1), 1-19.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Standar Electronic Lab Notebooks (ELN) untuk Pencatatan Audit Riset Forensik",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.3.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.3.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami pergeseran metodologis dari buku catatan laboratorium kertas ke Electronic Lab Notebooks (ELN).",
          "Capaian 2: Menerapkan standar audit integritas data (Audit Trail, Immutability, Cryptographic Timestamps).",
          "Capaian 3: Mematuhi regulasi integritas data internasional (seperti FDA 21 CFR Part 11 dan standar ALCOA+)."
        ],
        "keyFormulaOrDiagram": "$$H_k = \\text{SHA-256}(H_{k-1} \\parallel D_k \\parallel U_k \\parallel T_k)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.3.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Standar Electronic Lab Notebooks (ELN) untuk Pencatatan Audit Riset Forensik",
        "lead": "Dalam sejarah penelitian ilmiah, buku catatan laboratorium (paper lab notebook) adalah dokumen hukum dan saintifik paling berharga yang mencatat kronologi ide, kegagalan eksperimen, kalibrasi alat, dan data mentah.",
        "bulletPoints": [
          "Namun pada era digital, buku kertas memiliki kelemahan fatal: tidak dapat dicari secara otomatis, rentan rusak fisik, tidak dapat menyimpan data biner sensor atau kode komputasi, dan rentan terhadap tuduhan pemalsuan tanggal (backdating) ketika timbul sengketa paten atau integritas akademik.",
          "Standar Electronic Lab Notebooks (ELN): ELN adalah platform perangkat lunak terintegrasi yang dirancang khusus untuk mencatat seluruh siklus hidup eksperimen ilmiah digital dengan tingkat kepatuhan hukum dan forensik yang ketat.",
          "ELN modern tidak sekadar berfungsi seperti aplikasi pencatat teks biasa (seperti Google Docs atau Notion), melainkan wajib memenuhi kriteria kepatuhan integritas data (misalnya prinsip ALCOA+ dan standar FDA 21 CFR Part 11)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Prinsip Integritas Data ALCOA+: 1.",
        "bulletPoints": [
          "Attributable: Setiap catatan atau modifikasi wajib terhubung secara otentik ke identitas digital peneliti (digital signature).",
          "2."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Arsitektur Jejak Audit Kriptografi (Cryptographic Audit Trail):",
        "bulletPoints": [
          "Dalam sistem ELN berstandar forensik, catatan eksperimen tidak pernah ditimpa (overwritten) atau dihapus secara destruktif. Setiap modifikasi dicatat sebagai blok peristiwa baru yang diikat secara kriptografi mirip dengan rantai blok (append-only cryptographic hash chain):",
          "Diberikan entri catatan ke-$k$ ($E_k$) dengan data $D_k$, identitas peneliti $U_k$, dan stempel waktu terverifikasi $T_k$:",
          "di mana $\\parallel$ adalah operator penggabungan string (concatenation)."
        ],
        "keyFormulaOrDiagram": "$$H_k = \\text{SHA-256}(H_{k-1} \\parallel D_k \\parallel U_k \\parallel T_k)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Dua peneliti memperebutkan hak paten atas sintesis material superkonduktor baru di ITERA. Peneliti A menunjukkan buku catatan kertas dengan tulisan tangan tanggal 10 Januari 2025. Peneliti B menunjukkan entri ELN yang tersimpan dengan stempel waktu kriptografi server RFC 3161 bertanggal 15 Januari 2025. Jelaskan mengapa komite etik dan paten internasional memberikan bobot hukum forensik yang jauh lebih tinggi kepada Peneliti B.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 6,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Analisis kerentanan buku kertas Peneliti A: Tulisan tangan di buku kertas dapat ditulis kapan saja (misal ditulis pada bulan Maret 2025 namun diberi tanggal mundur 10 Januari 2025). Tidak ada mekanisme fisik independen yang membuktikan kapan tinta benar-benar digoreskan.",
          "Langkah 2: Analisis stempel waktu kriptografi Peneliti B: Protokol RFC 3161 menggunakan Otoritas Stempel Waktu Pihak Ketiga (Time Stamping Authority / TSA) independen. TSA menandatangani hash berkas eksperimen menggunakan kunci privat kriptografi bersama jam atomik terkalibrasi."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Pembuktian matematis: Mustahil bagi Peneliti B untuk memalsukan stempel waktu tersebut secara mundur tanpa meretas kunci privat RSA otoritas sertifikasi global.",
          "[result: Interpretasi Ilmiah] Catatan ELN Peneliti B memiliki integritas hukum forensik yang sah secara mutlak (unquestionable legal provenance), sedangkan catatan kertas Peneliti A rentan gugur dalam pembuktian hukum."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Implementasi append-only cryptographic audit trail untuk pencatatan laboratorium digital.",
        "bulletPoints": [
          "Tujuan Algoritma: Implementasi append-only cryptographic audit trail untuk pencatatan laboratorium digital.",
          "Dependensi Pustaka Ilmiah: hashlib, datetime",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Jejak Audit Kriptografi ELN Berstandar Forensik:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Jejak Audit Kriptografi ELN Berstandar Forensik:\nBlok 1 | Waktu: 2026-11-23T03:48:00.000000Z | Peneliti: AJI_PAMUNGKAS_ITERA\n       Aksi: Kalibrasi sensor getaran optik: Offset = 0.02 mV\n       Hash: a9f8e7d6c5b4a3... (Prev: 000000000000...)\nBlok 2 | Waktu: 2026-11-23T03:48:00.000000Z | Peneliti: AJI_PAMUNGKAS_ITERA",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpan catatan laboratorium penting di aplikasi catatan konsumen pribadi yang tidak memiliki audit trail yang tidak dapat diubah.",
          "[warning: Perangkap] Menghapus atau menimpa berkas catatan saat eksperimen gagal (kegagalan eksperimen wajib tercatat sebagai bagian dari integritas sains).",
          "[warning: Perangkap] Berbagi akun ELN bersama antar anggota laboratorium (melanggar prinsip keterlacakan Attributable)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Verifikasi bahwa sistem ELN mendukung ekspor data terbuka (Open Export XML/JSON) untuk mencegah vendor lock-in.",
          "Prosedur: Pastikan seluruh entri ditandatangani secara digital dengan sertifikat PKI yang valid.",
          "Prosedur: Lakukan audit berkala terhadap kelengkapan catatan parameter lingkungan laboratorium (suhu, kelembapan, ID alat)."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa dalam standar integritas data ALCOA+, kegagalan eksperimen (negative results atau anomalous runs) dilarang keras untuk dihapus dari ELN?",
          "Petunjuk Analitis: Perhatikan bahaya Publication Bias dan pelaporan selektif (selective reporting).",
          "Solusi Kunci: Menghapus eksperimen yang gagal adalah bentuk pemalsuan data terselubung (cherry-picking / falsification). Kegagalan mencatat kondisi batas atau cacat fisik nyata dari metode. Menghapus kegagalan eksperimen menyebabkan estimasi variabilitas dan laju keberhasilan sistem dilaporkan terlalu optimis secara palsu dalam publikasi."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "7.3.2": {
    "id": "7.3.2",
    "chapterId": "CH-47",
    "title": "Implementasi Model Silsilah Data W3C PROV untuk Melacak Transformasi Data Mentah",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami spesifikasi standar internasional silsilah data W3C PROV-Data Model.",
      "Memetakan hubungan tripartit: Entities, Activities, dan Agents dalam alur kerja komputasi.",
      "Membangkitkan graf provenance berstandar W3C PROV-JSON untuk audit transparansi ilmiah."
    ],
    "content": "Dalam riset ilmiah komputasi yang rumit, sebuah angka atau tabel yang ditampilkan di dalam naskah akhir seringkali telah melewati puluhan tahapan pemrosesan: filtering sinyal, normalisasi, kalibrasi sensor, penggabungan database, pembersihan outlier, dan inferensi model pembelajaran mesin. Ketika seorang pembaca bertanya: \"Bagaimana tepatnya angka 89.4% pada Tabel 2 diturunkan dari data mentah sensor?\", sebagian besar peneliti tidak mampu melacak kembali alur silsilahnya secara eksak.\n\nStandar Silsilah Data W3C PROV (W3C Provenance Data Model):\nKonsorsium World Wide Web (W3C) menerbitkan rekomendasi standar resmi W3C PROV untuk merepresentasikan silsilah data (data provenance) secara interoperabel di seluruh platform komputasi. PROV memodelkan sejarah penciptaan dan transformasi data sebagai sebuah Graf Terarah (Directed Graph) yang menghubungkan tiga konsep ontologi inti:\n\n1. Entity (Entitas Fisik atau Digital):\nObjek data fisik atau digital dalam kondisi tertentu (misalnya berkas CSV mentah, model terlatih berbobot .pt, atau grafik PDF). Dilambangkan sebagai elips.\n2. Activity (Aktivitas Pemrosesan):\nTindakan atau proses komputasi dinamis yang menggunakan dan menghasilkan entitas (misalnya eksekusi skrip run_filtering.py atau proses kalibrasi instrumen). Dilambangkan sebagai persegi panjang.\n3. Agent (Agen Pelaku):\nEntitas otonom yang memikul tanggung jawab atas terlaksananya suatu aktivitas (misalnya peneliti Aji Pamungkas, laboratorium ITERA, atau software bot otomatis). Dilambangkan sebagai poligon rumah.",
    "mathematicalFoundations": "Relasi Inti Graf Silsilah W3C PROV:\nGraf provenance adalah graf asiklik berarah yang menunjuk ke masa lalu (menunjuk ke asal usul):\n\n1. wasGeneratedBy: Menghubungkan Entity dengan Activity yang menciptakannya.\n$$\\text{wasGeneratedBy}(e, a, t)$$\n2. used: Menghubungkan Activity dengan Entity masukan yang dikonsumsinya.\n$$\\text{used}(a, e, t)$$\n3. wasDerivedFrom: Hubungan langsung transformasi antar dua Entity.\n$$\\text{wasDerivedFrom}(e_2, e_1)$$\n4. wasAssociatedWith: Menghubungkan Activity dengan Agent penanggung jawab.\n$$\\text{wasAssociatedWith}(a, ag)$$\n5. wasAttributedTo: Menghubungkan Entity dengan Agent pemilik hak cipta.\n$$\\text{wasAttributedTo}(e, ag)$$\n\nInvarian Validitas Silsilah W3C PROV:\nSebuah graf silsilah dinyatakan valid secara temporal jika urutan stempel waktu memenuhi kausalitas fisik:\n$$\\text{Time}(\\text{used}(a, e_1)) < \\text{Time}(\\text{wasGeneratedBy}(e_2, a))$$\nAktivitas pemrosesan wajib mengonsumsi data masukan $e_1$ sebelum mampu menghasilkan data keluaran $e_2$.",
    "workedExample": {
      "problemStatement": "Diberikan alur riset sederhana: Peneliti Aji menjalankan skrip Python clean_data.py pada pukul 09:00 menggunakan berkas mentah raw_sensor.csv (hash SHA: a1b2) dan menghasilkan berkas clean_sensor.parquet (hash SHA: c3d4) pada pukul 09:05. Petakan skenario ini ke dalam relasi ontologi formal W3C PROV.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi Entities: Entity 1 = e_raw (raw_sensor.csv, hash: a1b2); Entity 2 = e_clean (clean_sensor.parquet, hash: c3d4).",
        "Langkah 2: Identifikasi Activity: Activity 1 = a_clean (Eksekusi skrip clean_data.py, waktu mulai: 09:00, waktu selesai: 09:05).",
        "Langkah 3: Identifikasi Agent: Agent 1 = ag_aji (Aji Pamungkas Tri Nurcahyo, Afiliasi: ITERA).",
        "Langkah 4: Petakan relasi struktural W3C: used(a_clean, e_raw); wasGeneratedBy(e_clean, a_clean); wasDerivedFrom(e_clean, e_raw); wasAssociatedWith(a_clean, ag_aji); wasAttributedTo(e_clean, ag_aji)."
      ],
      "resultInterpretation": "Model ontologi W3C PROV menyediakan bukti rantai kausalitas digital lengkap yang dapat diaudit secara otomatis oleh mesin untuk memverifikasi asal usul data."
    },
    "pythonImplementation": {
      "description": "Pembangkitan dokumen silsilah data W3C PROV dalam format terstandarisasi PROV-JSON.",
      "libraryDependencies": [
        "json",
        "datetime"
      ],
      "code": "import json\nfrom datetime import datetime\n\n# [SIMULASI/SYNTHETIC DATA]\ndef generate_w3c_prov_document() -> dict:\n    \"\"\"Membangkitkan dokumen silsilah data W3C PROV-JSON terstandarisasi.\"\"\"\n    prov_doc = {\n        \"prefix\": {\n            \"itera\": \"https://www.itera.ac.id/research/\",\n            \"prov\": \"http://www.w3.org/ns/prov#\"\n        },\n        \"entity\": {\n            \"itera:raw_sensor_data\": {\n                \"prov:type\": \"prov:Entity\",\n                \"itera:sha256\": \"8f4b23c91a0e...b7\",\n                \"itera:format\": \"CSV\"\n            },\n            \"itera:calibrated_features\": {\n                \"prov:type\": \"prov:Entity\",\n                \"itera:sha256\": \"4c3d2e1f0a9b...c1\",\n                \"itera:format\": \"Parquet\"\n            }\n        },\n        \"activity\": {\n            \"itera:kalibrasi_filtering_run\": {\n                \"prov:type\": \"prov:Activity\",\n                \"prov:startTime\": \"2026-11-23T08:30:00Z\",\n                \"prov:endTime\": \"2026-11-23T08:35:00Z\"\n            }\n        },\n        \"agent\": {\n            \"itera:researcher_aji\": {\n                \"prov:type\": \"prov:Person\",\n                \"prov:label\": \"Aji Pamungkas Tri Nurcahyo\",\n                \"itera:institution\": \"Institut Teknologi Sumatera\"\n            }\n        },\n        \"wasGeneratedBy\": {\n            \"_:gen1\": {\n                \"prov:entity\": \"itera:calibrated_features\",\n                \"prov:activity\": \"itera:kalibrasi_filtering_run\"\n            }\n        },\n        \"used\": {\n            \"_:use1\": {\n                \"prov:activity\": \"itera:kalibrasi_filtering_run\",\n                \"prov:entity\": \"itera:raw_sensor_data\"\n            }\n        },\n        \"wasAssociatedWith\": {\n            \"_:assoc1\": {\n                \"prov:activity\": \"itera:kalibrasi_filtering_run\",\n                \"prov:agent\": \"itera:researcher_aji\"\n            }\n        }\n    }\n    return prov_doc\n\ndoc = generate_w3c_prov_document()\nprint(\"[SIMULASI/SYNTHETIC DATA] Dokumen Silsilah W3C PROV-JSON:\")\nprint(json.dumps(doc, indent=2)[:400] + \"\\n  ... [TRUNCATED] ...\\n}\")\nprint(\"Verifikasi: Model relasi Entity -> Activity -> Agent tervalidasi sesuai W3C.\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Dokumen Silsilah W3C PROV-JSON:\n{\n  \"prefix\": {\n    \"itera\": \"https://www.itera.ac.id/research/\",\n    \"prov\": \"http://www.w3.org/ns/prov#\"\n  },\n  \"entity\": {\n    \"itera:raw_sensor_data\": {\n      \"prov:type\": \"prov:Entity\",\n      \"itera:sha256\": \"8f4b23c91a0e...b7\",\n      \"itera:format\": \"CSV\"\n    },\n    \"itera:calibrated_features\": {\n      \"prov:type\": \"prov:Entity\",\n      \"itera:sha256\": \"4c3d2e1f0a9b...c1\",\n      \"itera:format\": \"Parquet\"\n    }\n  }\n  ... [TRUNCATED] ...\n}\nVerifikasi: Model relasi Entity -> Activity -> Agent tervalidasi sesuai W3C."
    },
    "commonPitfalls": [
      "Menyimpan silsilah data hanya dalam bentuk catatan naratif informal di berkas teks bebas (tidak dapat di-parse mesin).",
      "Mengabaikan pencatatan parameter spesifik (seperti nilai threshold atau nomor versi skrip) pada simpul Activity.",
      "Membuat siklus lingkaran setan (circular cycles) dalam graf silsilah (melanggar sifat Directed Acyclic Graph)."
    ],
    "validationProcedures": [
      "Gunakan validator W3C PROV resmi (seperti prov-check atau pustaka python-prov).",
      "Ekspor graf silsilah ke dalam format visual SVG atau PDF menggunakan prov-dot.",
      "Sertakan metadata silsilah data W3C PROV-JSON di samping berkas artefak data primer."
    ],
    "exercises": [
      {
        "question": "Mengapa panah relasi dalam diagram W3C PROV (seperti wasDerivedFrom atau wasGeneratedBy) mengarah mundur ke masa lalu dan bukan maju ke masa depan?",
        "hint": "Perhatikan tujuan utama silsilah: menjawab pertanyaan dari mana data ini berasal.",
        "answerExplanation": "Dalam ontologi silsilah data, fokus utama adalah investigasi forensik asal usul (\"Dari mana entitas data ini berasal?\"). Oleh karena itu, panah menghubungkan entitas turunan ke entitas induknya (e_child -> e_parent). Hal ini juga menjamin bahwa entitas baru dapat merujuk ke entitas lama tanpa memerlukan pembaruan retrospektif terhadap metadata entitas lama yang sudah terkunci (immutable)."
      },
      {
        "question": "Bagaimana standar W3C PROV memfasilitasi audit forensik jika salah satu instrumen sensor di laboratorium terbukti rusak 6 bulan setelah eksperimen selesai?",
        "hint": "Perhatikan penelusuran graf relasi used dan wasGeneratedBy.",
        "answerExplanation": "Dengan menjalankan kueri graf SPARQL pada basis data PROV, peneliti dapat menelusuri secara instan seluruh Activity yang mengonsumsi (used) instrumen rusak tersebut, dan secara otomatis menandai seluruh Entity turunan (tabel, grafik, model AI) yang terkontaminasi oleh data sensor rusak tersebut untuk ditarik atau dikoreksi."
      }
    ],
    "references": [
      {
        "citation": "Moreau, L., Missier, P., et al. (2013). PROV-DM: The PROV Data Model. W3C Recommendation.",
        "type": "formal-standard"
      },
      {
        "citation": "Missier, P., Dey, S., Belhajjame, K., Cuevas-Vicenttín, V., & Ludäscher, B. (2013). D-PROV: A high-level provenance model for scientific workflows. eScience.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Implementasi Model Silsilah Data W3C PROV untuk Melacak Transformasi Data Mentah",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.3.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.3.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami spesifikasi standar internasional silsilah data W3C PROV-Data Model.",
          "Capaian 2: Memetakan hubungan tripartit: Entities, Activities, dan Agents dalam alur kerja komputasi.",
          "Capaian 3: Membangkitkan graf provenance berstandar W3C PROV-JSON untuk audit transparansi ilmiah."
        ],
        "keyFormulaOrDiagram": "$$\\text{wasGeneratedBy}(e, a, t)$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.3.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Implementasi Model Silsilah Data W3C PROV untuk Melacak Transformasi Data Mentah",
        "lead": "Dalam riset ilmiah komputasi yang rumit, sebuah angka atau tabel yang ditampilkan di dalam naskah akhir seringkali telah melewati puluhan tahapan pemrosesan: filtering sinyal, normalisasi, kalibrasi sensor, penggabungan database, pembersihan outlier, dan inferensi model pembelajaran mesin.",
        "bulletPoints": [
          "Ketika seorang pembaca bertanya: \"Bagaimana tepatnya angka 89.4% pada Tabel 2 diturunkan dari data mentah sensor?\", sebagian besar peneliti tidak mampu melacak kembali alur silsilahnya secara eksak.",
          "Standar Silsilah Data W3C PROV (W3C Provenance Data Model): Konsorsium World Wide Web (W3C) menerbitkan rekomendasi standar resmi W3C PROV untuk merepresentasikan silsilah data (data provenance) secara interoperabel di seluruh platform komputasi.",
          "PROV memodelkan sejarah penciptaan dan transformasi data sebagai sebuah Graf Terarah (Directed Graph) yang menghubungkan tiga konsep ontologi inti:"
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "1.",
        "bulletPoints": [
          "Entity (Entitas Fisik atau Digital): Objek data fisik atau digital dalam kondisi tertentu (misalnya berkas CSV mentah, model terlatih berbobot .pt, atau grafik PDF).",
          "Dilambangkan sebagai elips."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Relasi Inti Graf Silsilah W3C PROV:",
        "bulletPoints": [
          "Graf provenance adalah graf asiklik berarah yang menunjuk ke masa lalu (menunjuk ke asal usul):",
          "1. wasGeneratedBy: Menghubungkan Entity dengan Activity yang menciptakannya.",
          "2. used: Menghubungkan Activity dengan Entity masukan yang dikonsumsinya."
        ],
        "keyFormulaOrDiagram": "$$\\text{wasGeneratedBy}(e, a, t)$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Diberikan alur riset sederhana: Peneliti Aji menjalankan skrip Python clean_data.py pada pukul 09:00 menggunakan berkas mentah raw_sensor.csv (hash SHA: a1b2) dan menghasilkan berkas clean_sensor.parquet (hash SHA: c3d4) pada pukul 09:05. Petakan skenario ini ke dalam relasi ontologi formal W3C PROV.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 17,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Identifikasi Entities: Entity 1 = e_raw (raw_sensor.csv, hash: a1b2); Entity 2 = e_clean (clean_sensor.parquet, hash: c3d4).",
          "Langkah 2: Identifikasi Activity: Activity 1 = a_clean (Eksekusi skrip clean_data.py, waktu mulai: 09:00, waktu selesai: 09:05)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Identifikasi Agent: Agent 1 = ag_aji (Aji Pamungkas Tri Nurcahyo, Afiliasi: ITERA).",
          "Langkah 4: Petakan relasi struktural W3C: used(a_clean, e_raw); wasGeneratedBy(e_clean, a_clean); wasDerivedFrom(e_clean, e_raw); wasAssociatedWith(a_clean, ag_aji); wasAttributedTo(e_clean, ag_aji).",
          "[result: Interpretasi Ilmiah] Model ontologi W3C PROV menyediakan bukti rantai kausalitas digital lengkap yang dapat diaudit secara otomatis oleh mesin untuk memverifikasi asal usul data."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pembangkitan dokumen silsilah data W3C PROV dalam format terstandarisasi PROV-JSON.",
        "bulletPoints": [
          "Tujuan Algoritma: Pembangkitan dokumen silsilah data W3C PROV dalam format terstandarisasi PROV-JSON.",
          "Dependensi Pustaka Ilmiah: json, datetime",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Dokumen Silsilah W3C PROV-JSON:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Dokumen Silsilah W3C PROV-JSON:\n{\n  \"prefix\": {\n    \"itera\": \"https://www.itera.ac.id/research/\",\n    \"prov\": \"http://www.w3.org/ns/prov#\"",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyimpan silsilah data hanya dalam bentuk catatan naratif informal di berkas teks bebas (tidak dapat di-parse mesin).",
          "[warning: Perangkap] Mengabaikan pencatatan parameter spesifik (seperti nilai threshold atau nomor versi skrip) pada simpul Activity.",
          "[warning: Perangkap] Membuat siklus lingkaran setan (circular cycles) dalam graf silsilah (melanggar sifat Directed Acyclic Graph)."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan validator W3C PROV resmi (seperti prov-check atau pustaka python-prov).",
          "Prosedur: Ekspor graf silsilah ke dalam format visual SVG atau PDF menggunakan prov-dot.",
          "Prosedur: Sertakan metadata silsilah data W3C PROV-JSON di samping berkas artefak data primer."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa panah relasi dalam diagram W3C PROV (seperti wasDerivedFrom atau wasGeneratedBy) mengarah mundur ke masa lalu dan bukan maju ke masa depan?",
          "Petunjuk Analitis: Perhatikan tujuan utama silsilah: menjawab pertanyaan dari mana data ini berasal.",
          "Solusi Kunci: Dalam ontologi silsilah data, fokus utama adalah investigasi forensik asal usul (\"Dari mana entitas data ini berasal?\"). Oleh karena itu, panah menghubungkan entitas turunan ke entitas induknya (e_child -> e_parent). Hal ini juga menjamin bahwa entitas baru dapat merujuk ke entitas lama tanpa memerlukan pembaruan retrospektif terhadap metadata entitas lama yang sudah terkunci (immutable)."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "7.3.3": {
    "id": "7.3.3",
    "chapterId": "CH-47",
    "title": "Pengelolaan Repositori Riset Terbuka Menggunakan Open Science Framework (OSF) dan Zenodo",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami fungsi repositori data terbuka terkurasi dalam ekosistem Open Science.",
      "Membedakan peran GitHub/GitLab (pengembangan aktif) vs Zenodo/OSF (pengarsipan statis permanen).",
      "Menerbitkan Digital Object Identifier (DOI) permanen yang memenuhi prinsip FAIR data."
    ],
    "content": "Dalam mempublikasikan kode dan data eksperimen, kesalahan paling lazim di kalangan peneliti rekayasa adalah menaruh tautan repositori GitHub di dalam catatan kaki makalah, lalu menganggap kewajiban keterbukaan data telah terpenuhi. Praktik ini sangat rapuh dan ditolak oleh standar perpustakaan ilmiah modern.\n\nKerapuhan Repositori Kode Aktif (Link Rot & Code Volatility):\n1. Link Rot: Repositori GitHub pribadi dapat diubah namanya, dijadikan privat, atau dihapus sewaktu-waktu oleh pemiliknya. Studi menunjukkan bahwa lebih dari 30% tautan web dalam makalah ilmiah berusia 5 tahun telah rusak (Error 404).\n2. Code Volatility: Repositori Git bersifat dinamis dan terus berkembang. Kode yang diakses reviewer hari ini mungkin berbeda dengan kode saat makalah diterbitkan 2 tahun lalu jika tidak ada rilis snapshot yang dibekukan secara permanen.\n\nRepositori Pengarsipan Permanen: Zenodo dan OSF:\nUntuk menjamin retensi jangka panjang, komunitas ilmiah global mengandalkan repositori arsip terbuka terkurasi seperti Zenodo (dikelola oleh CERN di bawah mandat Uni Eropa) dan Open Science Framework (OSF).\n- Jaminan Retensi Abadi (Long-Term Preservation): Zenodo menjamin bahwa data yang diunggah akan disimpan di media penyimpanan redundan CERN minimal selama masa operasional laboratorium (dijamin lebih dari 20-50 tahun ke depan).\n- Penerbitan DOI Permanen: Setiap rilis snapshot arsip diberikan Digital Object Identifier (DOI) resmi yang dapat disitasi secara terindeks dalam bibliografi akademik formal.\n- Kebal Modifikasi (Immutability): Begitu sebuah rilis snapshot diterbitkan dan mendapatkan DOI, berkas tersebut tidak dapat diubah atau dihapus, menjaga keaslian bukti sejarah sains.",
    "mathematicalFoundations": "Penerapan Prinsip FAIR Data pada Repositori Terbuka:\nWilkinson et al. (2016) merumuskan empat pilar wajib data sains modern:\n\n1. Findable (Dapat Ditemukan):\nData dan artefak diberi pengenal unik global yang persisten (Persistent Identifier / DOI):\n$$\\text{DOI: } 10.5281/\\text{zenodo}.XXXXXXX$$\nMetadata deskriptif lengkap diindeks dalam katalog global (DataCite / CrossRef).\n\n2. Accessible (Dapat Diakses):\nDapat diunduh secara gratis menggunakan protokol komunikasi terbuka dan terstandarisasi (HTTPS / REST API) tanpa batasan lisensi komersial tersembunyi.\n\n3. Interoperable (Dapat Dioperasikan):\nData disimpan dalam format non-proprietary terbuka (CSV, Parquet, HDF5, JSON) dengan skema ontologi formal, bukan dalam format biner tertutup software komersial tertentu.\n\n4. Reusable (Dapat Digunakan Kembali):\nDilengkapi dengan lisensi terbuka yang sah secara hukum (seperti MIT untuk kode dan CC-BY 4.0 untuk data) serta petunjuk eksekusi mandiri yang lengkap.",
    "workedExample": {
      "problemStatement": "Sebuah tim peneliti di ITERA menyelesaikan penelitian visi komputer dan ingin menghubungkan repositori GitHub dengan Zenodo. Rancang alur kerja resmi integrasi otomatis GitHub-Zenodo untuk menerbitkan DOI rilis versi v1.0.0 makalah.",
      "stepByStepSolution": [
        "Langkah 1: Hubungkan akun: Peneliti masuk ke situs zenodo.org, mengaktifkan integrasi GitHub, dan mengaktifkan toggle switch pada repositori proyek riset.",
        "Langkah 2: Pembuatan rilis Git (Release Tag): Di repositori GitHub, peneliti membuat Git Tag dan Release resmi bernama v1.0.0 dengan judul \"Initial Publication Release Artifacts\".",
        "Langkah 3: Pemicuan Webhook otomatis: GitHub secara instan mengirimkan webhook ke Zenodo. Zenodo mengunduh arsip zip repositori, memvalidasi integritas berkas, dan menyimpannya di cluster penyimpanan permanen CERN.",
        "Langkah 4: Penerbitan DOI: Zenodo menerbitkan DOI unik (misal 10.5281/zenodo.1234567) dan mencatat metadata penulis, afiliasi ITERA, dan lisensi terbuka.",
        "Langkah 5: Penyematan sitasi: Peneliti menyematkan badge DOI dan teks sitasi BibTeX resmi di dalam naskah makalah ilmiah."
      ],
      "resultInterpretation": "Integrasi ini mengunci status artefak komputasi pada saat publikasi, menjamin aksesibilitas abadi dan sitabilitas formal yang diakui indeks Scopus dan WoS."
    },
    "pythonImplementation": {
      "description": "Pembangkitan berkas metadata sitasi terstandarisasi CITATION.cff untuk repositori ilmiah terbuka.",
      "libraryDependencies": [
        "datetime"
      ],
      "code": "import datetime\n\n# [SIMULASI/SYNTHETIC DATA]\ndef generate_citation_cff() -> str:\n    \"\"\"Membangkitkan format baku CITATION.cff (Citation File Format) berstandar GitHub/Zenodo.\"\"\"\n    cff_content = f\"\"\"cff-version: 1.2.0\nmessage: \"If you use this research software or dataset, please cite it as below.\"\nauthors:\n  - family-names: \"Tri Nurcahyo\"\n    given-names: \"Aji Pamungkas\"\n    orcid: \"https://orcid.org/0009-0000-0000-0000\"\n    affiliation: \"Institut Teknologi Sumatera (ITERA)\"\ntitle: \"Scientific Research & Experimental Methods Hub: Reproducible Artifact Package\"\nversion: 1.0.0\ndoi: 10.5281/zenodo.9876543\ndate-released: {datetime.date.today().isoformat()}\nurl: \"https://github.com/itera-research/scientific-methods-hub\"\nkeywords:\n  - \"experimental methods\"\n  - \"reproducible research\"\n  - \"computer vision\"\n  - \"metrology\"\nlicense: MIT\n\"\"\"\n    return cff_content\n\ncff_text = generate_citation_cff()\nprint(\"[SIMULASI/SYNTHETIC DATA] Berkas CITATION.cff Terstandarisasi:\")\nprint(\"-\" * 55)\nprint(cff_text)\nprint(\"-\" * 55)\nprint(\"Verifikasi: Berkas CITATION.cff siap diintegrasikan otomatis dengan GitHub & Zenodo.\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Berkas CITATION.cff Terstandarisasi:\n-------------------------------------------------------\ncff-version: 1.2.0\nmessage: \"If you use this research software or dataset, please cite it as below.\"\nauthors:\n  - family-names: \"Tri Nurcahyo\"\n    given-names: \"Aji Pamungkas\"\n    orcid: \"https://orcid.org/0009-0000-0000-0000\"\n    affiliation: \"Institut Teknologi Sumatera (ITERA)\"\ntitle: \"Scientific Research & Experimental Methods Hub: Reproducible Artifact Package\"\nversion: 1.0.0\ndoi: 10.5281/zenodo.9876543\ndate-released: 2026-11-23\nurl: \"https://github.com/itera-research/scientific-methods-hub\"\nkeywords:\n  - \"experimental methods\"\n  - \"reproducible research\"\n  - \"computer vision\"\n  - \"metrology\"\nlicense: MIT\n\n-------------------------------------------------------\nVerifikasi: Berkas CITATION.cff siap diintegrasikan otomatis dengan GitHub & Zenodo."
    },
    "commonPitfalls": [
      "Hanya mengandalkan tautan GitHub dinamis tanpa mengarsipkan rilis snapshot ke Zenodo/OSF.",
      "Mengunggah berkas data dalam format software berpemilik eksklusif (seperti .mat atau .xlsx yang membutuhkan lisensi mahal).",
      "Tidak menyertakan berkas CITATION.cff yang memudahkan peneliti lain mengutip perangkat lunak riset secara benar."
    ],
    "validationProcedures": [
      "Pastikan repositori Zenodo memiliki status pengarsipan permanen dengan nomor DOI terdaftar aktif di DataCite.",
      "Uji tautan DOI menggunakan URL resolver resmi: https://doi.org/<DOI_ANDA>.",
      "Verifikasi kepatuhan terhadap prinsip FAIR menggunakan checklist automated FAIR-checker."
    ],
    "exercises": [
      {
        "question": "Mengapa sebuah rilis snapshot yang telah diterbitkan di Zenodo tidak dapat diedit atau dihapus oleh peneliti yang mengunggahnya?",
        "hint": "Perhatikan integritas catatan sejarah ilmiah dan pencegahan manipulasi bukti retrospektif.",
        "answerExplanation": "Imutabilitas adalah pilar utama integritas ilmiah. Begitu sebuah artefak diterbitkan dengan DOI, artefak tersebut telah menjadi bagian permanen dari catatan sejarah sains global. Jika peneliti dapat mengubah berkas tersebut secara bebas, pembaca tidak dapat memastikan apakah kode yang mereka periksa hari ini adalah kode yang sama yang digunakan untuk menghasilkan angka di dalam makalah yang diterbitkan 5 tahun lalu."
      },
      {
        "question": "Apa fungsi utama dari berkas CITATION.cff di akar repositori GitHub ilmiah?",
        "hint": "Perhatikan tombol \"Cite this repository\" di antarmuka web GitHub.",
        "answerExplanation": "CITATION.cff adalah format standar berbasis YAML yang memungkinkan GitHub, Zenodo, dan manajer referensi (seperti Zotero) untuk secara otomatis mengekstrak metadata sitasi resmi (nama penulis, judul, DOI, tahun, versi) dan menyajikan tombol satu-klik \"Cite this repository\" dalam format BibTeX dan APA bagi para pembaca."
      }
    ],
    "references": [
      {
        "citation": "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 1-9.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "European Organization for Nuclear Research (CERN). (2020). Zenodo General Policies and Principles.",
        "type": "formal-standard"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pengelolaan Repositori Riset Terbuka Menggunakan Open Science Framework (OSF) dan Zenodo",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.3.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.3.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami fungsi repositori data terbuka terkurasi dalam ekosistem Open Science.",
          "Capaian 2: Membedakan peran GitHub/GitLab (pengembangan aktif) vs Zenodo/OSF (pengarsipan statis permanen).",
          "Capaian 3: Menerbitkan Digital Object Identifier (DOI) permanen yang memenuhi prinsip FAIR data."
        ],
        "keyFormulaOrDiagram": "$$\\text{DOI: } 10.5281/\\text{zenodo}.XXXXXXX$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.3.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pengelolaan Repositori Riset Terbuka Menggunakan Open Science Framework (OSF) dan Zenodo",
        "lead": "Dalam mempublikasikan kode dan data eksperimen, kesalahan paling lazim di kalangan peneliti rekayasa adalah menaruh tautan repositori GitHub di dalam catatan kaki makalah, lalu menganggap kewajiban keterbukaan data telah terpenuhi.",
        "bulletPoints": [
          "Praktik ini sangat rapuh dan ditolak oleh standar perpustakaan ilmiah modern.",
          "Kerapuhan Repositori Kode Aktif (Link Rot & Code Volatility): 1.",
          "Link Rot: Repositori GitHub pribadi dapat diubah namanya, dijadikan privat, atau dihapus sewaktu-waktu oleh pemiliknya."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Repositori Pengarsipan Permanen: Zenodo dan OSF: Untuk menjamin retensi jangka panjang, komunitas ilmiah global mengandalkan repositori arsip terbuka terkurasi seperti Zenodo (dikelola oleh CERN di bawah mandat Uni Eropa) dan Open Science Framework (OSF). - Jaminan Retensi Abadi (Long-Term Preservation): Zenodo menjamin bahwa data yang diunggah akan disimpan di media penyimpanan redundan CERN minimal selama masa operasional laboratorium (dijamin lebih dari 20-50 tahun ke depan). - Penerbitan DOI Permanen: Setiap rilis snapshot arsip diberikan Digital Object Identifier (DOI) resmi yang dapat disitasi secara terindeks dalam bibliografi akademik formal. - Kebal Modifikasi (Immutability): Begitu sebuah rilis snapshot diterbitkan dan mendapatkan DOI, berkas tersebut tidak dapat diubah atau dihapus, menjaga keaslian bukti sejarah sains.",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Penerapan Prinsip FAIR Data pada Repositori Terbuka:",
        "bulletPoints": [
          "Wilkinson et al. (2016) merumuskan empat pilar wajib data sains modern:",
          "1. Findable (Dapat Ditemukan):",
          "Data dan artefak diberi pengenal unik global yang persisten (Persistent Identifier / DOI):"
        ],
        "keyFormulaOrDiagram": "$$\\text{DOI: } 10.5281/\\text{zenodo}.XXXXXXX$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah tim peneliti di ITERA menyelesaikan penelitian visi komputer dan ingin menghubungkan repositori GitHub dengan Zenodo. Rancang alur kerja resmi integrasi otomatis GitHub-Zenodo untuk menerbitkan DOI rilis versi v1.0.0 makalah.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 28,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Hubungkan akun: Peneliti masuk ke situs zenodo.org, mengaktifkan integrasi GitHub, dan mengaktifkan toggle switch pada repositori proyek riset.",
          "Langkah 2: Pembuatan rilis Git (Release Tag): Di repositori GitHub, peneliti membuat Git Tag dan Release resmi bernama v1.0.0 dengan judul \"Initial Publication Release Artifacts\".",
          "Langkah 3: Pemicuan Webhook otomatis: GitHub secara instan mengirimkan webhook ke Zenodo. Zenodo mengunduh arsip zip repositori, memvalidasi integritas berkas, dan menyimpannya di cluster penyimpanan permanen CERN."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Penerbitan DOI: Zenodo menerbitkan DOI unik (misal 10.5281/zenodo.1234567) dan mencatat metadata penulis, afiliasi ITERA, dan lisensi terbuka.",
          "Langkah 5: Penyematan sitasi: Peneliti menyematkan badge DOI dan teks sitasi BibTeX resmi di dalam naskah makalah ilmiah.",
          "[result: Interpretasi Ilmiah] Integrasi ini mengunci status artefak komputasi pada saat publikasi, menjamin aksesibilitas abadi dan sitabilitas formal yang diakui indeks Scopus dan WoS."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pembangkitan berkas metadata sitasi terstandarisasi CITATION.cff untuk repositori ilmiah terbuka.",
        "bulletPoints": [
          "Tujuan Algoritma: Pembangkitan berkas metadata sitasi terstandarisasi CITATION.cff untuk repositori ilmiah terbuka.",
          "Dependensi Pustaka Ilmiah: datetime",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Berkas CITATION.cff Terstandarisasi:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Berkas CITATION.cff Terstandarisasi:\n-------------------------------------------------------\ncff-version: 1.2.0\nmessage: \"If you use this research software or dataset, please cite it as below.\"\nauthors:",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Hanya mengandalkan tautan GitHub dinamis tanpa mengarsipkan rilis snapshot ke Zenodo/OSF.",
          "[warning: Perangkap] Mengunggah berkas data dalam format software berpemilik eksklusif (seperti .mat atau .xlsx yang membutuhkan lisensi mahal).",
          "[warning: Perangkap] Tidak menyertakan berkas CITATION.cff yang memudahkan peneliti lain mengutip perangkat lunak riset secara benar."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Pastikan repositori Zenodo memiliki status pengarsipan permanen dengan nomor DOI terdaftar aktif di DataCite.",
          "Prosedur: Uji tautan DOI menggunakan URL resolver resmi: https://doi.org/<DOI_ANDA>.",
          "Prosedur: Verifikasi kepatuhan terhadap prinsip FAIR menggunakan checklist automated FAIR-checker."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa sebuah rilis snapshot yang telah diterbitkan di Zenodo tidak dapat diedit atau dihapus oleh peneliti yang mengunggahnya?",
          "Petunjuk Analitis: Perhatikan integritas catatan sejarah ilmiah dan pencegahan manipulasi bukti retrospektif.",
          "Solusi Kunci: Imutabilitas adalah pilar utama integritas ilmiah. Begitu sebuah artefak diterbitkan dengan DOI, artefak tersebut telah menjadi bagian permanen dari catatan sejarah sains global. Jika peneliti dapat mengubah berkas tersebut secara bebas, pembaca tidak dapat memastikan apakah kode yang mereka periksa hari ini adalah kode yang sama yang digunakan untuk menghasilkan angka di dalam makalah yang diterbitkan 5 tahun lalu."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "7.3.4": {
    "id": "7.3.4",
    "chapterId": "CH-47",
    "title": "Pemilihan Lisensi Terbuka: Perbedaan Lisensi Kode (MIT, Apache 2.0) vs Lisensi Data (CC-BY)",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami implikasi hukum hak cipta intelektual (Intellectual Property / IP) pada publikasi ilmiah terbuka.",
      "Membedakan lisensi perangkat lunak (Permissive vs Copyleft: MIT, Apache 2.0, GPLv3).",
      "Memilih lisensi data terbuka Creative Commons (CC0 vs CC-BY 4.0) untuk dataset rekayasa."
    ],
    "content": "Salah satu kesalahpahaman paling berbahaya di kalangan peneliti adalah anggapan bahwa \"mengunggah kode dan data ke repositori publik di internet otomatis menjadikannya domain publik bebas pakai\". Dalam hukum hak cipta internasional (Konvensi Bern), jika sebuah repositori tidak memiliki berkas lisensi hukum eksplisit, status hukumnya adalah \"All Rights Reserved\" (Seluruh Hak Cipta Dilindungi). Peneliti lain yang mengunduh dan menjalankan kode Anda secara teknis melakukan pelanggaran hak cipta ilegal!\n\nDikotomi Fundamental Lisensi Kode vs Lisensi Data:\nPerangkat lunak dan dataset memiliki sifat ontologi hukum yang berbeda:\n- Kode Perangkat Lunak adalah karya logika instruksi yang dapat dieksekusi (functional text).\n- Data Pengukuran adalah kumpulan fakta empiris alam (facts and observations).\nOleh karena itu, lisensi perangkat lunak (seperti MIT atau GPL) TIDAK BOLEH digunakan untuk melisensikan data, dan lisensi dokumen kreatif (seperti Creative Commons) TIDAK BOLEH digunakan untuk melisensikan kode perangkat lunak.\n\nTaksonomi Lisensi Perangkat Lunak Ilmiah:\n1. Lisensi Permisif (Permissive: MIT, Apache 2.0, BSD-3-Clause):\nMemberikan kebebasan maksimum kepada siapa pun untuk menggunakan, memodifikasi, dan mengintegrasikan kode ke dalam perangkat lunak komersial tertutup dengan syarat mencantumkan atribusi penulis asli. Apache 2.0 menyertakan klausul perlindungan paten eksplisit yang sangat ideal untuk riset inovasi teknologi rekayasa.\n2. Lisensi Timbal-Balik (Copyleft / Viral: GNU GPLv3):\nMewajibkan bahwa sembarang perangkat lunak turunan yang menggunakan kode tersebut wajib dipublikasikan kembali dengan lisensi terbuka yang sama (GPLv3).\n\nLisensi Data Terbuka (Creative Commons):\n- CC0 1.0 (Public Domain Dedication): Melepaskan seluruh hak cipta ke domain publik (standar emas untuk data mentah sensor dan benchmark publik).\n- CC-BY 4.0 (Attribution): Mengizinkan siapa pun menyebarkan dan memodifikasi data dengan syarat wajib mencantumkan sitasi kredit kepada peneliti asli.",
    "mathematicalFoundations": "Matriks Komparasi Hukum Lisensi Ilmiah:\n\n| Kategori Lisensi | Jenis Lisensi | Hak Penggunaan | Hak Komersial | Perlindungan Paten | Syarat Copyleft |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **Software** | **MIT License** | Bebas | Ya | Implisit | Tidak Ada |\n| **Software** | **Apache 2.0** | Bebas | Ya | **Eksplisit (Hibah Paten)** | Tidak Ada |\n| **Software** | **GNU GPLv3** | Bebas Terikat | Ya | Eksplisit | **Wajib Buka Kode** |\n| **Data / Dokumen** | **CC0 1.0** | Domain Publik | Ya | Tidak Relevan | Tidak Ada |\n| **Data / Dokumen** | **CC-BY 4.0** | Bebas Teratribusi | Ya | Tidak Relevan | Hanya Atribusi Sitasi |\n\nKlausul Hibah Paten Apache 2.0 (Patent Grant Clause):\nSetiap kontributor kode memberikan lisensi paten bebas royalti yang tidak dapat dibatalkan (perpetual, irrevocable) kepada seluruh pengguna perangkat lunak untuk klaim paten yang diimplementasikan di dalam kode tersebut. Klausul ini melindungi akademisi dari gugatan paten di kemudian hari.",
    "workedExample": {
      "problemStatement": "Sebuah laboratorium di ITERA merilis paket riset yang memuat: (1) Skrip algoritma ekstraksi fitur gelombang, (2) Dataset pengukuran getaran mesin 100 GB, dan (3) Buku panduan laporan teknis PDF. Tentukan lisensi hukum yang paling tepat untuk masing-masing dari ketiga artefak tersebut.",
      "stepByStepSolution": [
        "Langkah 1: Pemilihan lisensi artefak (1) Skrip Algoritma: Mengingat kode memuat algoritma baru yang berpotensi dipatenkan dan peneliti ingin adopsi seluas-luasnya oleh industri, pilih lisensi perangkat lunak permisif dengan perlindungan paten: Apache License 2.0.",
        "Langkah 2: Pemilihan lisensi artefak (2) Dataset Pengukuran 100 GB: Dataset adalah kumpulan fakta fisik. Pilih Creative Commons Attribution 4.0 International (CC-BY 4.0) agar siapa pun yang menggunakan data wajib mengutip naskah ilmiah ITERA.",
        "Langkah 3: Pemilihan lisensi artefak (3) Buku Panduan PDF: Untuk dokumen narasi teks ilmiah, gunakan Creative Commons Attribution-NoDerivatives (CC-BY-ND 4.0) jika teks tidak boleh diubah sembarangan, atau CC-BY 4.0 untuk keterbukaan penuh."
      ],
      "resultInterpretation": "Pemisahan lisensi ganda (Dual-Licensing Strategy: Apache 2.0 untuk kode + CC-BY untuk data) memberikan kepastian hukum yang sempurna bagi kolaborator dan industri."
    },
    "pythonImplementation": {
      "description": "Audit otomatis keberadaan dan kepatuhan lisensi terbuka (License Compliance Checker) pada proyek riset.",
      "libraryDependencies": [
        "os"
      ],
      "code": "import os\n\n# [SIMULASI/SYNTHETIC DATA]\ndef audit_repository_licenses(repo_files: list[str]) -> dict:\n    \"\"\"Memeriksa kelengkapan lisensi kode dan lisensi data pada repositori ilmiah.\"\"\"\n    has_code_license = any(f.upper() in ['LICENSE', 'LICENSE.TXT', 'LICENSE.MD'] for f in repo_files)\n    has_data_license = any('DATA_LICENSE' in f.upper() or 'LICENSE-DATA' in f.upper() for f in repo_files)\n    \n    compliance = {\n        'Code_License_Present': has_code_license,\n        'Data_License_Present': has_data_license,\n        'Status': 'COMPLIANT' if (has_code_license and has_data_license) else 'PARTIAL_OR_UNLICENSED',\n        'Recommendation': 'Lengkap' if (has_code_license and has_data_license) else 'Tambahkan berkas LICENSE (Apache 2.0) dan LICENSE-DATA (CC-BY 4.0)'\n    }\n    return compliance\n\n# Uji simulasi pada repositori proyek\nmock_files = ['README.md', 'pyproject.toml', 'LICENSE', 'src/model.py', 'data/README.md', 'LICENSE-DATA']\naudit_result = audit_repository_licenses(mock_files)\n\nprint(\"[SIMULASI/SYNTHETIC DATA] Audit Kepatuhan Hukum Lisensi Terbuka Proyek:\")\nprint(\"-\" * 55)\nfor k, v in audit_result.items():\n    print(f\"{k:22}: {v}\")\nprint(\"-\" * 55)\nprint(\"Kepastian Hukum: Repositori memenuhi syarat adopsi akademik dan industri.\")\n",
      "expectedOutput": "[SIMULASI/SYNTHETIC DATA] Audit Kepatuhan Hukum Lisensi Terbuka Proyek:\n-------------------------------------------------------\nCode_License_Present  : True\nData_License_Present  : True\nStatus                : COMPLIANT\nRecommendation        : Lengkap\n-------------------------------------------------------\nKepastian Hukum: Repositori memenuhi syarat adopsi akademik dan industri."
    },
    "commonPitfalls": [
      "Tidak menyertakan berkas LICENSE sama sekali di repositori (menjadikannya berstatus All Rights Reserved secara ilegal).",
      "Menggunakan lisensi Creative Commons (seperti CC-BY) untuk kode perangkat lunak (Creative Commons secara eksplisit menolak penggunaannya untuk software).",
      "Menggunakan lisensi Non-Commercial (CC-BY-NC) yang melarang adopsi data oleh laboratorium komersial atau rumah sakit industri."
    ],
    "validationProcedures": [
      "Sertakan berkas teks LICENSE lengkap di direktori akar repositori.",
      "Tambahkan header lisensi singkat (SPDX License Identifier) di baris pertama setiap berkas kode sumber Python: # SPDX-License-Identifier: Apache-2.0.",
      "Dokumentasikan lisensi dataset secara eksplisit di berkas README data."
    ],
    "exercises": [
      {
        "question": "Mengapa komunitas Open Science sangat tidak menganjurkan penggunaan klausul Non-Commercial (misalnya lisensi CC-BY-NC) untuk dataset riset terbuka?",
        "hint": "Perhatikan ambiguitas hukum dari istilah \"non-komersial\" dan hambatan integrasi dengan riset industri.",
        "answerExplanation": "Istilah \"Non-Commercial\" sangat kabur secara hukum. Apakah seorang peneliti di universitas negeri yang didanai oleh hibah industri dianggap komersial? Apakah penggunaan data untuk pelatihan dokter di rumah sakit swasta dianggap komersial? Ambiguitas ini menakut-nakuti banyak peneliti dan memblokir integrasi dataset ke proyek-proyek open-source global seperti Wikipedia atau database internasional."
      },
      {
        "question": "Apa arti pengenal standar SPDX (Software Package Data Exchange) dalam komentar kode sumber?",
        "hint": "Perhatikan standarisasi pembacaan lisensi oleh robot pemindai otomatis.",
        "answerExplanation": "SPDX adalah pengenal singkatan terstandarisasi internasional (seperti SPDX-License-Identifier: MIT atau Apache-2.0) yang ditempatkan di bagian atas berkas kode. Hal ini memungkinkan robot linter dan perkakas audit otomatis membaca dan memverifikasi kepatuhan hukum dari ribuan berkas kode sumber dalam hitungan detik tanpa perlu membaca teks hukum lisensi yang panjang."
      }
    ],
    "references": [
      {
        "citation": "Stodden, V. (2009). Enabling reproducible research: Open licensing plans for data and code. Science and Technology Law Review, 12, 1.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Creative Commons. (2020). Creative Commons Attribution 4.0 International Legal Code.",
        "type": "formal-standard"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Pemilihan Lisensi Terbuka: Perbedaan Lisensi Kode (MIT, Apache 2.0) vs Lisensi Data (CC-BY)",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.3.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.3.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami implikasi hukum hak cipta intelektual (Intellectual Property / IP) pada publikasi ilmiah terbuka.",
          "Capaian 2: Membedakan lisensi perangkat lunak (Permissive vs Copyleft: MIT, Apache 2.0, GPLv3).",
          "Capaian 3: Memilih lisensi data terbuka Creative Commons (CC0 vs CC-BY 4.0) untuk dataset rekayasa."
        ],
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.3.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Pemilihan Lisensi Terbuka: Perbedaan Lisensi Kode (MIT, Apache 2.0) vs Lisensi Data (CC-BY)",
        "lead": "Salah satu kesalahpahaman paling berbahaya di kalangan peneliti adalah anggapan bahwa \"mengunggah kode dan data ke repositori publik di internet otomatis menjadikannya domain publik bebas pakai\".",
        "bulletPoints": [
          "Dalam hukum hak cipta internasional (Konvensi Bern), jika sebuah repositori tidak memiliki berkas lisensi hukum eksplisit, status hukumnya adalah \"All Rights Reserved\" (Seluruh Hak Cipta Dilindungi).",
          "Peneliti lain yang mengunduh dan menjalankan kode Anda secara teknis melakukan pelanggaran hak cipta ilegal!",
          "Dikotomi Fundamental Lisensi Kode vs Lisensi Data: Perangkat lunak dan dataset memiliki sifat ontologi hukum yang berbeda: - Kode Perangkat Lunak adalah karya logika instruksi yang dapat dieksekusi (functional text). - Data Pengukuran adalah kumpulan fakta empiris alam (facts and observations).",
          "Oleh karena itu, lisensi perangkat lunak (seperti MIT atau GPL) TIDAK BOLEH digunakan untuk melisensikan data, dan lisensi dokumen kreatif (seperti Creative Commons) TIDAK BOLEH digunakan untuk melisensikan kode perangkat lunak."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Taksonomi Lisensi Perangkat Lunak Ilmiah: 1.",
        "bulletPoints": [
          "Lisensi Permisif (Permissive: MIT, Apache 2.0, BSD-3-Clause): Memberikan kebebasan maksimum kepada siapa pun untuk menggunakan, memodifikasi, dan mengintegrasikan kode ke dalam perangkat lunak komersial tertutup dengan syarat mencantumkan atribusi penulis asli.",
          "Apache 2.0 menyertakan klausul perlindungan paten eksplisit yang sangat ideal untuk riset inovasi teknologi rekayasa.",
          "Lisensi Data Terbuka (Creative Commons): - CC0 1.0 (Public Domain Dedication): Melepaskan seluruh hak cipta ke domain publik (standar emas untuk data mentah sensor dan benchmark publik). - CC-BY 4.0 (Attribution): Mengizinkan siapa pun menyebarkan dan memodifikasi data dengan syarat wajib mencantumkan sitasi kredit kepada peneliti asli."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Matriks Komparasi Hukum Lisensi Ilmiah:",
        "bulletPoints": [
          "| Kategori Lisensi | Jenis Lisensi | Hak Penggunaan | Hak Komersial | Perlindungan Paten | Syarat Copyleft |",
          "| :--- | :--- | :--- | :--- | :--- | :--- |",
          "| **Software** | **MIT License** | Bebas | Ya | Implisit | Tidak Ada |"
        ],
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah laboratorium di ITERA merilis paket riset yang memuat: (1) Skrip algoritma ekstraksi fitur gelombang, (2) Dataset pengukuran getaran mesin 100 GB, dan (3) Buku panduan laporan teknis PDF. Tentukan lisensi hukum yang paling tepat untuk masing-masing dari ketiga artefak tersebut.",
          "Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.",
          "Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis."
        ],
        "notes": "Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan."
      },
      {
        "slideNumber": 39,
        "layout": "example",
        "title": "Solusi Numerik: Kalkulasi Langkah demi Langkah",
        "lead": "Prosedur perhitungan analitis dan estimasi parameter.",
        "bulletPoints": [
          "Langkah 1: Pemilihan lisensi artefak (1) Skrip Algoritma: Mengingat kode memuat algoritma baru yang berpotensi dipatenkan dan peneliti ingin adopsi seluas-luasnya oleh industri, pilih lisensi perangkat lunak permisif dengan perlindungan paten: Apache License 2.0.",
          "Langkah 2: Pemilihan lisensi artefak (2) Dataset Pengukuran 100 GB: Dataset adalah kumpulan fakta fisik. Pilih Creative Commons Attribution 4.0 International (CC-BY 4.0) agar siapa pun yang menggunakan data wajib mengutip naskah ilmiah ITERA."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Pemilihan lisensi artefak (3) Buku Panduan PDF: Untuk dokumen narasi teks ilmiah, gunakan Creative Commons Attribution-NoDerivatives (CC-BY-ND 4.0) jika teks tidak boleh diubah sembarangan, atau CC-BY 4.0 untuk keterbukaan penuh.",
          "[result: Interpretasi Ilmiah] Pemisahan lisensi ganda (Dual-Licensing Strategy: Apache 2.0 untuk kode + CC-BY untuk data) memberikan kepastian hukum yang sempurna bagi kolaborator dan industri."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Audit otomatis keberadaan dan kepatuhan lisensi terbuka (License Compliance Checker) pada proyek riset.",
        "bulletPoints": [
          "Tujuan Algoritma: Audit otomatis keberadaan dan kepatuhan lisensi terbuka (License Compliance Checker) pada proyek riset.",
          "Dependensi Pustaka Ilmiah: os",
          "Keluaran Terverifikasi: [SIMULASI/SYNTHETIC DATA] Audit Kepatuhan Hukum Lisensi Terbuka Proyek:"
        ],
        "keyFormulaOrDiagram": "[SIMULASI/SYNTHETIC DATA] Audit Kepatuhan Hukum Lisensi Terbuka Proyek:\n-------------------------------------------------------\nCode_License_Present  : True\nData_License_Present  : True\nStatus                : COMPLIANT",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Tidak menyertakan berkas LICENSE sama sekali di repositori (menjadikannya berstatus All Rights Reserved secara ilegal).",
          "[warning: Perangkap] Menggunakan lisensi Creative Commons (seperti CC-BY) untuk kode perangkat lunak (Creative Commons secara eksplisit menolak penggunaannya untuk software).",
          "[warning: Perangkap] Menggunakan lisensi Non-Commercial (CC-BY-NC) yang melarang adopsi data oleh laboratorium komersial atau rumah sakit industri."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Sertakan berkas teks LICENSE lengkap di direktori akar repositori.",
          "Prosedur: Tambahkan header lisensi singkat (SPDX License Identifier) di baris pertama setiap berkas kode sumber Python: # SPDX-License-Identifier: Apache-2.0.",
          "Prosedur: Dokumentasikan lisensi dataset secara eksplisit di berkas README data."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa komunitas Open Science sangat tidak menganjurkan penggunaan klausul Non-Commercial (misalnya lisensi CC-BY-NC) untuk dataset riset terbuka?",
          "Petunjuk Analitis: Perhatikan ambiguitas hukum dari istilah \"non-komersial\" dan hambatan integrasi dengan riset industri.",
          "Solusi Kunci: Istilah \"Non-Commercial\" sangat kabur secara hukum. Apakah seorang peneliti di universitas negeri yang didanai oleh hibah industri dianggap komersial? Apakah penggunaan data untuk pelatihan dokter di rumah sakit swasta dianggap komersial? Ambiguitas ini menakut-nakuti banyak peneliti dan memblokir integrasi dataset ke proyek-proyek open-source global seperti Wikipedia atau database internasional."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
