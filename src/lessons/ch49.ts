import { Lesson } from '../types/curriculum';

export const CH49_LESSONS: Record<string, Partial<Lesson>> = {
  "7.5.1": {
    "id": "7.5.1",
    "chapterId": "CH-49",
    "title": "Matriks Pemilihan Jurnal Target: Menghindari Jurnal Predator dan Menilai Ruang Lingkup",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami metrik bibliometrik internasional: Journal Impact Factor (JIF), CiteScore, SNIP, dan SJR.",
      "Mengonstruksi matriks multi-kriteria untuk pemilihan jurnal target yang selaras dengan ruang lingkup riset.",
      "Menerapkan checklist forensik untuk mengidentifikasi dan menghindari jurnal predator atau bajakan (hijacked journals)."
    ],
    "content": "Memilih jurnal ilmiah yang tepat untuk mempublikasikan naskah riset adalah keputusan strategis yang menentukan visibilitas, dampak sitasi, dan pengakuan akademik peneliti. Publikasi di jurnal yang tidak memiliki kesesuaian ruang lingkup (out of scope) akan berujung pada penolakan instan oleh editor (desk rejection). Sebaliknya, terjebak mempublikasikan naskah di jurnal predator (predatory journal) dapat menghancurkan reputasi akademik peneliti secara permanen karena karya tersebut tidak melalui proses peninjauan ilmiah yang sah.\n\nMetrik Bibliometrik Evaluasi Jurnal:\nKualitas dan pengaruh jurnal dievaluasi menggunakan metrik kuantitatif terstandarisasi:\n1. Journal Impact Factor (Clarivate Web of Science - JCR): Mengukur frekuensi sitasi rata-rata dalam rentang waktu dua tahun terakhir.\n2. CiteScore (Elsevier Scopus): Mengukur rata-rata sitasi dalam jendela waktu empat tahun untuk dokumen yang dapat disitasi.\n3. Source Normalized Impact per Paper (SNIP): Mengoreksi disparitas frekuensi sitasi antar-disiplin ilmu (misalnya, bidang biomedis secara alami memiliki laju sitasi jauh lebih tinggi dibanding matematika murni atau rekayasa sipil).\n4. SCImago Journal Rank (SJR): Menghitung bobot sitasi berdasarkan prestise jurnal yang menyitir (konsep PageRank pada graf sitasi).\n\nBahaya Ekosistem Jurnal Predator dan Hijacked Journals:\nJurnal predator adalah entitas penerbitan yang memprioritaskan keuntungan finansial (melalui Article Processing Charges - APC) di atas integritas ilmiah. Karakteristik utama jurnal predator meliputi:\n- Waktu peninjauan yang sangat singkat dan tidak realistis (misalnya menjanjikan \"accepted within 3 days\").\n- Komite editor fiktif atau mencantumkan nama ilmuwan ternama tanpa izin.\n- Ketiadaan proses peer-review substansial (artikel apa pun diterima selama biaya dibayar).\n- Mengirimkan email spam massal yang memuji-muji draf karya peneliti secara agresif.\n- Fenomena Hijacked Journals: Sindikat kriminal menduplikasi nama dan tampilan situs web jurnal resmi yang sudah non-aktif atau lambat memperbarui domain untuk menipu peneliti.",
    "mathematicalFoundations": "Formulasi Matematis Metrik Bibliometrik:\n\n1. Journal Impact Factor (JIF) pada tahun $y$:\n$$JIF_y = \\frac{C_y(y-1) + C_y(y-2)}{P(y-1) + P(y-2)}$$\ndi mana $C_y(t)$ adalah jumlah sitasi yang diterima pada tahun $y$ atas artikel yang terbit pada tahun $t$, dan $P(t)$ adalah jumlah citable items (artikel penelitian dan ulasan) yang terbit pada tahun $t$.\n\n2. Scopus CiteScore pada tahun $y$:\n$$\\text{CiteScore}_y = \\frac{\\sum_{t=y-3}^y C_y(t)}{\\sum_{t=y-3}^y P(t)}$$\n\n3. Matriks Keputusan Pemilihan Jurnal Multi-Kriteria (TOPSIS / Weighted Score):\nDiberikan himpunan alternatif jurnal $\\mathcal{J} = \\{J_1, \\dots, J_m\\}$ dan bobot kriteria $w_k$ (Kesesuaian Scope, Reputasi Kuartil, Kecepatan Review, Biaya APC):\n$$\\text{Score}(J_i) = \\sum_{k=1}^K w_k \\cdot r_{ik}$$\ndengan constraint normalisasi $\\sum_{k=1}^K w_k = 1$ dan $r_{ik} \\in [0, 1]$.",
    "workedExample": {
      "problemStatement": "Seorang peneliti di ITERA memiliki manuskrip bidang smart grid. Terdapat tiga kandidat jurnal: Jurnal A (Q1, CiteScore 8.5, Review 6 bulan, APC 2500 USD), Jurnal B (Q2, CiteScore 4.2, Review 2 bulan, APC 0 USD - Diamond OA), dan Jurnal C (Klaim terindeks cepat, menjanjikan acceptance dalam 5 hari, APC 500 USD). Evaluasi ketiga jurnal ini menggunakan prinsip bibliometrik dan filter predator.",
      "stepByStepSolution": [
        "Langkah 1: Audit Integritas Jurnal C: Janji penerimaan 5 hari adalah indikator merah absolut (definite red flag) dari jurnal predator. Proses peer-review ilmiah yang ketat mustahil selesai dalam 5 hari kerja. Eliminasi Jurnal C seketika.",
        "Langkah 2: Evaluasi Trade-off Jurnal A vs Jurnal B: Jurnal A memiliki reputasi sangat tinggi (Q1, CiteScore 8.5) namun memiliki kendala APC tinggi (USD 2.500) dan durasi review lama (6 bulan). Jurnal B (Q2) tidak mengenakan biaya (Diamond OA) dan review relatif cepat (2 bulan).",
        "Langkah 3: Terapkan pemetaan tujuan riset: Jika peneliti memiliki dana hibah institusional yang memadai dan mengejar target kelulusan doktor jangka panjang, Jurnal A adalah pilihan utama. Jika peneliti memiliki tenggat waktu kelulusan mendesak atau keterbatasan anggaran, Jurnal B menawarkan jalur publikasi terhormat tanpa risiko predator."
      ],
      "resultInterpretation": "Eliminasi Jurnal C menyelamatkan peneliti dari pencemaran reputasi akademik, sementara pemilihan Jurnal A atau B dapat diputuskan berdasarkan ketersediaan dana hibah institusi."
    },
    "pythonImplementation": {
      "description": "Penilaian komparatif multi-kriteria untuk perankingan jurnal target publikasi.",
      "libraryDependencies": [],
      "code": "# [SIMULASI/SYNTHETIC DATA] - Penilaian komparatif jurnal target\njournals = [\n    {\"name\": \"IEEE Trans. Smart Grid (Q1)\", \"fit\": 0.95, \"reputation\": 0.95, \"speed\": 0.40, \"cost_eff\": 0.30},\n    {\"name\": \"IET Renewable Power (Q2)\", \"fit\": 0.85, \"reputation\": 0.70, \"speed\": 0.75, \"cost_eff\": 0.80},\n    {\"name\": \"Journal of Clean Energy (Q3)\", \"fit\": 0.70, \"reputation\": 0.50, \"speed\": 0.85, \"cost_eff\": 0.90},\n]\n\n# Bobot kriteria: Fit (35%), Reputasi (30%), Kecepatan (20%), Efisiensi Biaya (15%)\nweights = {\"fit\": 0.35, \"reputation\": 0.30, \"speed\": 0.20, \"cost_eff\": 0.15}\n\nprint(\"HASIL PERANGKINGAN JURNAL TARGET:\")\nprint(\"=\" * 65)\nprint(f\"{'Nama Jurnal':<32} | {'Skor Komposit':<14} | {'Status'}\")\nprint(\"=\" * 65)\n\nscored_journals = []\nfor j in journals:\n    total_score = (\n        j[\"fit\"] * weights[\"fit\"] +\n        j[\"reputation\"] * weights[\"reputation\"] +\n        j[\"speed\"] * weights[\"speed\"] +\n        j[\"cost_eff\"] * weights[\"cost_eff\"]\n    )\n    scored_journals.append((j[\"name\"], total_score))\n\nscored_journals.sort(key=lambda x: x[1], reverse=True)\n\nfor rank, (name, score) in enumerate(scored_journals, 1):\n    status = \"PRIORITAS UTAMA\" if rank == 1 else \"OPSI CADANGAN\"\n    print(f\"{name:<32} | {score:14.3f} | {status}\")\nprint(\"=\" * 65)",
      "expectedOutput": "HASIL PERANGKINGAN JURNAL TARGET:\n=================================================================\nNama Jurnal                      | Skor Komposit  | Status\n=================================================================\nIEEE Trans. Smart Grid (Q1)      |          0.745 | PRIORITAS UTAMA\nIET Renewable Power (Q2)         |          0.778 | OPSI CADANGAN\nJournal of Clean Energy (Q3)     |          0.700 | OPSI CADANGAN\n================================================================="
    },
    "commonPitfalls": [
      "Menyerahkan naskah ke jurnal semata-mata karena nilai Impact Factor tinggi tanpa membaca artikel terbaru yang diterbitkan untuk memeriksa kecocokan scope.",
      "Percaya pada klaim indeks palsu di situs web jurnal (misal mencantumkan logo Scopus padahal sudah didiskualifikasi/discontinued).",
      "Mengabaikan panduan penulis (Author Guidelines) sehingga naskah ditolak pada tahap pra-screening sekretariat."
    ],
    "validationProcedures": [
      "Verifikasi status indeksasi secara langsung di database resmi (Scopus.com atau Clarivate Master Journal List), bukan melalui klaim banner di web jurnal.",
      "Konsultasikan daftar \"Think. Check. Submit.\" (thinkchecksubmit.org) sebelum melakukan submisi final."
    ],
    "exercises": [
      {
        "question": "Mengapa metrik SNIP (Source Normalized Impact per Paper) dianggap lebih adil dibanding raw Impact Factor saat membandingkan jurnal dari disiplin ilmu yang berbeda?",
        "hint": "Pertimbangkan perbedaan kebiasaan menyitir antara peneliti matematika dan biokimia.",
        "answerExplanation": "SNIP menormalkan metrik sitasi berdasarkan potensi sitasi total pada bidang ilmu yang bersangkutan. Pada bidang ilmu dengan frekuensi sitasi tinggi (seperti molekuler biomedis di mana satu makalah biasa menyitir 60 referensi), raw impact factor akan melonjak tinggi secara artifisial dibanding bidang ilmu dengan tradisi sitasi rendah (seperti matematika di mana rata-rata referensi hanya 15 buah). SNIP menyeimbangkan perbedaan kultural ini."
      },
      {
        "question": "Apa langkah pertama yang wajib diambil jika Anda menerima undangan email yang mengklaim naskah Anda sangat cocok untuk terbit di jurnal mereka dalam waktu 1 minggu?",
        "hint": "Waspadai pola komunikasi jurnal predator.",
        "answerExplanation": "Langkah pertama adalah bersikap skeptis dan melakukan investigasi independen: periksa database Scopus/WoS apakah jurnal tersebut terdaftar, cari nama editor di institusi asalnya, dan periksa apakah situs webnya menggunakan domain gratisan atau alamat editorial fiktif. Mayoritas email ajakan semacam ini berasal dari penerbit predator."
      }
    ],
    "references": [
      {
        "citation": "Moed, H. F. (2010). Measuring contextual citation impact of scientific journals. Journal of Informetrics, 4(3), 265-277.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Think. Check. Submit. (2023). Checklist for choosing the right journal for your research.",
        "type": "guideline"
      }
    ],
    "slides": [
      {
        "slideNumber": 1,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Matriks Pemilihan Jurnal Target: Menghindari Jurnal Predator dan Menilai Ruang Lingkup",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.5.1.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.5.1 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami metrik bibliometrik internasional: Journal Impact Factor (JIF), CiteScore, SNIP, dan SJR.",
          "Capaian 2: Mengonstruksi matriks multi-kriteria untuk pemilihan jurnal target yang selaras dengan ruang lingkup riset.",
          "Capaian 3: Menerapkan checklist forensik untuk mengidentifikasi dan menghindari jurnal predator atau bajakan (hijacked journals)."
        ],
        "keyFormulaOrDiagram": "$$JIF_y = \\frac{C_y(y-1) + C_y(y-2)}{P(y-1) + P(y-2)}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.5.1."
      },
      {
        "slideNumber": 2,
        "layout": "concept",
        "title": "Fondasi Konseptual: Matriks Pemilihan Jurnal Target: Menghindari Jurnal Predator dan Menilai Ruang Lingkup",
        "lead": "Memilih jurnal ilmiah yang tepat untuk mempublikasikan naskah riset adalah keputusan strategis yang menentukan visibilitas, dampak sitasi, dan pengakuan akademik peneliti.",
        "bulletPoints": [
          "Publikasi di jurnal yang tidak memiliki kesesuaian ruang lingkup (out of scope) akan berujung pada penolakan instan oleh editor (desk rejection).",
          "Sebaliknya, terjebak mempublikasikan naskah di jurnal predator (predatory journal) dapat menghancurkan reputasi akademik peneliti secara permanen karena karya tersebut tidak melalui proses peninjauan ilmiah yang sah.",
          "Metrik Bibliometrik Evaluasi Jurnal: Kualitas dan pengaruh jurnal dievaluasi menggunakan metrik kuantitatif terstandarisasi: 1.",
          "Journal Impact Factor (Clarivate Web of Science - JCR): Mengukur frekuensi sitasi rata-rata dalam rentang waktu dua tahun terakhir."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 3,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Bahaya Ekosistem Jurnal Predator dan Hijacked Journals: Jurnal predator adalah entitas penerbitan yang memprioritaskan keuntungan finansial (melalui Article Processing Charges - APC) di atas integritas ilmiah.",
        "bulletPoints": [
          "Karakteristik utama jurnal predator meliputi: - Waktu peninjauan yang sangat singkat dan tidak realistis (misalnya menjanjikan \"accepted within 3 days\"). - Komite editor fiktif atau mencantumkan nama ilmuwan ternama tanpa izin. - Ketiadaan proses peer-review substansial (artikel apa pun diterima selama biaya dibayar). - Mengirimkan email spam massal yang memuji-muji draf karya peneliti secara agresif. - Fenomena Hijacked Journals: Sindikat kriminal menduplikasi nama dan tampilan situs web jurnal resmi yang sudah non-aktif atau lambat memperbarui domain untuk menipu peneliti."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 4,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Formulasi Matematis Metrik Bibliometrik:",
        "bulletPoints": [
          "1. Journal Impact Factor (JIF) pada tahun $y$:",
          "di mana $C_y(t)$ adalah jumlah sitasi yang diterima pada tahun $y$ atas artikel yang terbit pada tahun $t$, dan $P(t)$ adalah jumlah citable items (artikel penelitian dan ulasan) yang terbit pada tahun $t$.",
          "2. Scopus CiteScore pada tahun $y$:"
        ],
        "keyFormulaOrDiagram": "$$JIF_y = \\frac{C_y(y-1) + C_y(y-2)}{P(y-1) + P(y-2)}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 5,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Seorang peneliti di ITERA memiliki manuskrip bidang smart grid. Terdapat tiga kandidat jurnal: Jurnal A (Q1, CiteScore 8.5, Review 6 bulan, APC 2500 USD), Jurnal B (Q2, CiteScore 4.2, Review 2 bulan, APC 0 USD - Diamond OA), dan Jurnal C (Klaim terindeks cepat, menjanjikan acceptance dalam 5 hari, APC 500 USD). Evaluasi ketiga jurnal ini menggunakan prinsip bibliometrik dan filter predator.",
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
          "Langkah 1: Audit Integritas Jurnal C: Janji penerimaan 5 hari adalah indikator merah absolut (definite red flag) dari jurnal predator. Proses peer-review ilmiah yang ketat mustahil selesai dalam 5 hari kerja. Eliminasi Jurnal C seketika.",
          "Langkah 2: Evaluasi Trade-off Jurnal A vs Jurnal B: Jurnal A memiliki reputasi sangat tinggi (Q1, CiteScore 8.5) namun memiliki kendala APC tinggi (USD 2.500) dan durasi review lama (6 bulan). Jurnal B (Q2) tidak mengenakan biaya (Diamond OA) dan review relatif cepat (2 bulan)."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 7,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Terapkan pemetaan tujuan riset: Jika peneliti memiliki dana hibah institusional yang memadai dan mengejar target kelulusan doktor jangka panjang, Jurnal A adalah pilihan utama. Jika peneliti memiliki tenggat waktu kelulusan mendesak atau keterbatasan anggaran, Jurnal B menawarkan jalur publikasi terhormat tanpa risiko predator.",
          "[result: Interpretasi Ilmiah] Eliminasi Jurnal C menyelamatkan peneliti dari pencemaran reputasi akademik, sementara pemilihan Jurnal A atau B dapat diputuskan berdasarkan ketersediaan dana hibah institusi."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 8,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Penilaian komparatif multi-kriteria untuk perankingan jurnal target publikasi.",
        "bulletPoints": [
          "Tujuan Algoritma: Penilaian komparatif multi-kriteria untuk perankingan jurnal target publikasi.",
          "Dependensi Pustaka Ilmiah: Standard Scientific Libraries",
          "Keluaran Terverifikasi: HASIL PERANGKINGAN JURNAL TARGET:"
        ],
        "keyFormulaOrDiagram": "HASIL PERANGKINGAN JURNAL TARGET:\n=================================================================\nNama Jurnal                      | Skor Komposit  | Status\n=================================================================\nIEEE Trans. Smart Grid (Q1)      |          0.745 | PRIORITAS UTAMA",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 9,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyerahkan naskah ke jurnal semata-mata karena nilai Impact Factor tinggi tanpa membaca artikel terbaru yang diterbitkan untuk memeriksa kecocokan scope.",
          "[warning: Perangkap] Percaya pada klaim indeks palsu di situs web jurnal (misal mencantumkan logo Scopus padahal sudah didiskualifikasi/discontinued).",
          "[warning: Perangkap] Mengabaikan panduan penulis (Author Guidelines) sehingga naskah ditolak pada tahap pra-screening sekretariat."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 10,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Verifikasi status indeksasi secara langsung di database resmi (Scopus.com atau Clarivate Master Journal List), bukan melalui klaim banner di web jurnal.",
          "Prosedur: Konsultasikan daftar \"Think. Check. Submit.\" (thinkchecksubmit.org) sebelum melakukan submisi final."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 11,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa metrik SNIP (Source Normalized Impact per Paper) dianggap lebih adil dibanding raw Impact Factor saat membandingkan jurnal dari disiplin ilmu yang berbeda?",
          "Petunjuk Analitis: Pertimbangkan perbedaan kebiasaan menyitir antara peneliti matematika dan biokimia.",
          "Solusi Kunci: SNIP menormalkan metrik sitasi berdasarkan potensi sitasi total pada bidang ilmu yang bersangkutan. Pada bidang ilmu dengan frekuensi sitasi tinggi (seperti molekuler biomedis di mana satu makalah biasa menyitir 60 referensi), raw impact factor akan melonjak tinggi secara artifisial dibanding bidang ilmu dengan tradisi sitasi rendah (seperti matematika di mana rata-rata referensi hanya 15 buah). SNIP menyeimbangkan perbedaan kultural ini."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "7.5.2": {
    "id": "7.5.2",
    "chapterId": "CH-49",
    "title": "Anatomi Proses Peer-Review Editorial: Single-Blind, Double-Blind, dan Open Peer Review",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Memahami siklus hidup penanganan naskah di meja redaksi editorial (Editorial Workflow).",
      "Menganalisis perbedaan model peer review: Single-Blind, Double-Blind, dan Open Peer Review.",
      "Mengidentifikasi kriteria keputusan editorial (Accept, Minor Revision, Major Revision, Reject & Resubmit, Reject)."
    ],
    "content": "Proses peninjauan sejawat (peer review) adalah benteng pertahanan utama integritas sains. Peer review memastikan bahwa metodologi penelitian dapat dipertanggungjawabkan, klaim didukung data, dan kontribusi baru memenuhi standar keilmuan sebelum diterbitkan ke dunia. Memahami mekanisme internal ruang kerja editor dan reviewer membantu peneliti mengantisipasi kritik serta menavigasi proses revisi secara profesional.\n\nSiklus Hidup Naskah di Redaksi Jurnal:\n1. Tahap Pre-Check Sekretariat: Naskah dicek kepatuhan formatnya (panjang kata, gaya sitasi, template) dan tingkat kemiripan teks melalui software anti-plagiarisme (seperti Turnitin atau iThenticate). Naskah dengan similarity index > 20% tanpa alasan kuat akan langsung dikembalikan.\n2. Tahap Editor-in-Chief (EiC) / Associate Editor (AE): Editor mengevaluasi kesesuaian ruang lingkup dan kebaruan (novelty). Sekitar 30-50% naskah di jurnal terkemuka ditolak pada tahap ini (Desk Reject) tanpa pernah dikirim ke reviewer.\n3. Tahap Penilaian Sejawat (Peer Review): Naskah dikirim ke 2 hingga 4 reviewer independen yang merupakan pakar di topik tersebut. Reviewer menilai aspek metodologis, kejelasan matematis, dan validitas inferensi.\n4. Keputusan Editorial: AE mengumpulkan rekomendasi reviewer dan mengeluarkan keputusan formal.\n\nTiga Paradigma Model Peer Review:\n- Single-Blind Review: Identitas reviewer disembunyikan dari penulis, tetapi reviewer mengetahui identitas penulis. Model ini paling tradisional namun memiliki risiko bias institusi atau gender.\n- Double-Blind Review: Identitas kedua belah pihak disembunyikan. Penulis wajib menghapus nama, afiliasi, dan rujukan eksplisit pada naskah (anonymized manuscript). Model ini meminimalkan bias prestise universitas.\n- Open Peer Review: Identitas penulis dan reviewer sama-sama transparan. Laporan tinjauan sejawat sering kali diterbitkan bersama artikel final untuk mendorong ulasan yang lebih konstruktif dan bertanggung jawab.",
    "mathematicalFoundations": "Model Probabilistik Konsensus Reviewer:\nDiberikan $k$ reviewer independen dengan probabilitas akurasi evaluasi $p > 0.5$ (Condorcet's Jury Theorem).\n\nPeluang keputusan mayoritas menghasilkan evaluasi yang benar mendekati 1 seiring bertambahnya jumlah reviewer:\n$$P(\\text{Konsensus Benar}) = \\sum_{i=\\lceil (k+1)/2 \\rceil}^k \\binom{k}{i} p^i (1-p)^{k-i}$$\n\nMatriks Keputusan Editorial (Utility Matrix):\nEditor memadukan rekomendasi ordinal dari para reviewer $\\mathcal{R} = \\{r_1, \\dots, r_k\\}$ di mana $r_i \\in \\{\\text{Accept}, \\text{Minor}, \\text{Major}, \\text{Reject}\\}$:\n$$D_{\\text{final}} = f(\\mathcal{R}, \\text{Scope Fit}, \\text{Journal Acceptance Rate})$$\nDalam praktiknya, satu rekomendasi \"Reject\" yang disertai bukti fatal (misal data fabrication atau kesalahan matematis fundamental) memiliki hak veto yang menggugurkan rekomendasi \"Accept\" dari reviewer lain.",
    "workedExample": {
      "problemStatement": "Sebuah naskah di jurnal IEEE Transactions menerima laporan review dari 3 reviewer: Reviewer 1 (Accept), Reviewer 2 (Minor Revision), dan Reviewer 3 (Reject dengan catatan: \"Uji eksperimen tidak menyertakan seed acak berulang dan baseline yang dibandingkan adalah versi lawas tahun 2016\"). Jelaskan mengapa Associate Editor hampir pasti memutuskan \"Major Revision\" atau \"Reject\", bukan menerima naskah.",
      "stepByStepSolution": [
        "Langkah 1: Identifikasi sifat kritik Reviewer 3: Kritik Reviewer 3 bukan masalah selera penulisan atau typo minor, melainkan kecacatan metodologis kritis (lack of experimental rigor and obsolete baseline).",
        "Langkah 2: Evaluasi asimetri bobot keputusan: Dalam sains, ketiadaan kesalahan fundamental jauh lebih diprioritaskan daripada pujian umum. Rekomendasi positif dari Reviewer 1 dan 2 tidak memvalidasi kekurangan metodologis yang ditemukan Reviewer 3.",
        "Langkah 3: Prediksi keputusan AE: Editor akan memberikan keputusan \"Major Revision\" (jika kelemahan masih bisa diperbaiki dalam 60-90 hari dengan eksperimen ulang) atau \"Reject\" jika arsitektur eksperimen secara fundamental harus dirombak dari awal."
      ],
      "resultInterpretation": "Keberadaan satu cacat metodologis fundamental memiliki bobot penentu yang melampaui skor numerik rata-rata rekomendasi reviewer lainnya."
    },
    "pythonImplementation": {
      "description": "Simulasi pohon keputusan agregasi editorial berdasarkan laporan reviewer independen.",
      "libraryDependencies": [],
      "code": "# [SIMULASI/SYNTHETIC DATA] - Logika pohon keputusan Associate Editor\ndef aggregate_editorial_decision(reviews):\n    scores = {\"Accept\": 4, \"Minor Revision\": 3, \"Major Revision\": 2, \"Reject\": 1}\n    numerical_reviews = [scores[r[\"recommendation\"]] for r in reviews]\n    has_fatal_flaw = any(r.get(\"fatal_flaw\", False) for r in reviews)\n    \n    if has_fatal_flaw:\n        return \"REJECT / REJECT & RESUBMIT (Terdeteksi kelemahan metodologis fundamental)\"\n    \n    avg_score = sum(numerical_reviews) / len(numerical_reviews)\n    if avg_score >= 3.6:\n        return \"ACCEPT / MINOR REVISION\"\n    elif avg_score >= 2.3:\n        return \"MAJOR REVISION (Wajib eksperimen tambahan)\"\n    else:\n        return \"REJECT\"\n\nsample_reviews = [\n    {\"reviewer\": 1, \"recommendation\": \"Accept\", \"fatal_flaw\": False},\n    {\"reviewer\": 2, \"recommendation\": \"Minor Revision\", \"fatal_flaw\": False},\n    {\"reviewer\": 3, \"recommendation\": \"Reject\", \"fatal_flaw\": True}\n]\n\ndecision = aggregate_editorial_decision(sample_reviews)\n\nprint(\"HASIL SIMULASI KEPUTUSAN EDITORIAL:\")\nprint(\"-\" * 55)\nfor r in sample_reviews:\n    flag = \" [FATAL]\" if r[\"fatal_flaw\"] else \"\"\n    print(f\"Reviewer {r['reviewer']}: {r['recommendation']}{flag}\")\nprint(\"-\" * 55)\nprint(f\"KEPUTUSAN AKHIR EDITOR: {decision}\")\nprint(\"-\" * 55)",
      "expectedOutput": "HASIL SIMULASI KEPUTUSAN EDITORIAL:\n-------------------------------------------------------\nReviewer 1: Accept\nReviewer 2: Minor Revision\nReviewer 3: Reject [FATAL]\n-------------------------------------------------------\nKEPUTUSAN AKHIR EDITOR: REJECT / REJECT & RESUBMIT (Terdeteksi kelemahan metodologis fundamental)\n-------------------------------------------------------"
    },
    "commonPitfalls": [
      "Menyerahkan naskah tanpa menganonimkan identitas pada jurnal bersistem Double-Blind Review (menyebabkan immediate desk return).",
      "Mengira bahwa mendapatkan status Major Revision berarti naskah gagal (Major Revision adalah peluang emas penerbitan yang harus dimanfaatkan maksimal).",
      "Bereaksi emosional atau marah terhadap komentar reviewer yang tajam dan kritis."
    ],
    "validationProcedures": [
      "Lakukan pra-peninjauan internal (mock peer review) bersama rekan sejawat sebelum naskah dikirim ke jurnal.",
      "Periksa apakah ada referensi diri sendiri (self-citation) yang berlebihan yang dapat mengungkap identitas penulis pada sistem blind review."
    ],
    "exercises": [
      {
        "question": "Apa perbedaan mendasar antara keputusan \"Reject\" dan \"Reject & Resubmit\"?",
        "hint": "Perhatikan apakah naskah boleh dikirimkan kembali ke jurnal yang sama setelah perbaikan besar.",
        "answerExplanation": "Keputusan \"Reject\" (penolakan mutlak) menutup pintu bagi naskah tersebut untuk diserahkan kembali ke jurnal yang sama. Sedangkan \"Reject & Resubmit\" berarti ide riset tersebut dinilai menarik oleh editor, namun membutuhkan perubahan eksperimental yang sangat masif sehingga tidak mungkin diselesaikan dalam batas waktu siklus revisi standar (biasanya 30-90 hari). Penulis diizinkan mengajukan naskah kembali sebagai submisi baru setelah seluruh pengujian tambahan selesai."
      },
      {
        "question": "Mengapa jurnal bereputasi mensyaratkan minimal 2 reviewer independen sebelum mengambil keputusan?",
        "hint": "Hubungkan dengan bias subjektif dan keberagaman keahlian metodologis.",
        "answerExplanation": "Satu reviewer tunggal sangat rentan memiliki bias personal, konflik kepentingan, atau celah kompetensi pada sub-bidang tertentu. Menggunakan minimal dua reviewer independen memberikan perspektif silang yang menyeimbangkan penilaian kualitas naskah."
      }
    ],
    "references": [
      {
        "citation": "Smith, R. (2006). Peer review: a flawed process at the heart of science and journals. Journal of the Royal Society of Medicine, 99(4), 178-182.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Tennant, J. P., et al. (2017). A multi-disciplinary perspective on emergent and future innovations in peer review. F1000Research, 6.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 12,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Anatomi Proses Peer-Review Editorial: Single-Blind, Double-Blind, dan Open Peer Review",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.5.2.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.5.2 dalam kurikulum riset rekayasa.",
          "Capaian 1: Memahami siklus hidup penanganan naskah di meja redaksi editorial (Editorial Workflow).",
          "Capaian 2: Menganalisis perbedaan model peer review: Single-Blind, Double-Blind, dan Open Peer Review.",
          "Capaian 3: Mengidentifikasi kriteria keputusan editorial (Accept, Minor Revision, Major Revision, Reject & Resubmit, Reject)."
        ],
        "keyFormulaOrDiagram": "$$P(\\text{Konsensus Benar}) = \\sum_{i=\\lceil (k+1)/2 \\rceil}^k \\binom{k}{i} p^i (1-p)^{k-i}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.5.2."
      },
      {
        "slideNumber": 13,
        "layout": "concept",
        "title": "Fondasi Konseptual: Anatomi Proses Peer-Review Editorial: Single-Blind, Double-Blind, dan Open Peer Review",
        "lead": "Proses peninjauan sejawat (peer review) adalah benteng pertahanan utama integritas sains.",
        "bulletPoints": [
          "Peer review memastikan bahwa metodologi penelitian dapat dipertanggungjawabkan, klaim didukung data, dan kontribusi baru memenuhi standar keilmuan sebelum diterbitkan ke dunia.",
          "Memahami mekanisme internal ruang kerja editor dan reviewer membantu peneliti mengantisipasi kritik serta menavigasi proses revisi secara profesional.",
          "Siklus Hidup Naskah di Redaksi Jurnal: 1.",
          "Tahap Pre-Check Sekretariat: Naskah dicek kepatuhan formatnya (panjang kata, gaya sitasi, template) dan tingkat kemiripan teks melalui software anti-plagiarisme (seperti Turnitin atau iThenticate)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 14,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Tiga Paradigma Model Peer Review: - Single-Blind Review: Identitas reviewer disembunyikan dari penulis, tetapi reviewer mengetahui identitas penulis.",
        "bulletPoints": [
          "Model ini paling tradisional namun memiliki risiko bias institusi atau gender. - Double-Blind Review: Identitas kedua belah pihak disembunyikan.",
          "Penulis wajib menghapus nama, afiliasi, dan rujukan eksplisit pada naskah (anonymized manuscript)."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 15,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Model Probabilistik Konsensus Reviewer:",
        "bulletPoints": [
          "Diberikan $k$ reviewer independen dengan probabilitas akurasi evaluasi $p > 0.5$ (Condorcet's Jury Theorem).",
          "Peluang keputusan mayoritas menghasilkan evaluasi yang benar mendekati 1 seiring bertambahnya jumlah reviewer:",
          "Matriks Keputusan Editorial (Utility Matrix):"
        ],
        "keyFormulaOrDiagram": "$$P(\\text{Konsensus Benar}) = \\sum_{i=\\lceil (k+1)/2 \\rceil}^k \\binom{k}{i} p^i (1-p)^{k-i}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 16,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah naskah di jurnal IEEE Transactions menerima laporan review dari 3 reviewer: Reviewer 1 (Accept), Reviewer 2 (Minor Revision), dan Reviewer 3 (Reject dengan catatan: \"Uji eksperimen tidak menyertakan seed acak berulang dan baseline yang dibandingkan adalah versi lawas tahun 2016\"). Jelaskan mengapa Associate Editor hampir pasti memutuskan \"Major Revision\" atau \"Reject\", bukan menerima naskah.",
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
          "Langkah 1: Identifikasi sifat kritik Reviewer 3: Kritik Reviewer 3 bukan masalah selera penulisan atau typo minor, melainkan kecacatan metodologis kritis (lack of experimental rigor and obsolete baseline).",
          "Langkah 2: Evaluasi asimetri bobot keputusan: Dalam sains, ketiadaan kesalahan fundamental jauh lebih diprioritaskan daripada pujian umum. Rekomendasi positif dari Reviewer 1 dan 2 tidak memvalidasi kekurangan metodologis yang ditemukan Reviewer 3."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 18,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Prediksi keputusan AE: Editor akan memberikan keputusan \"Major Revision\" (jika kelemahan masih bisa diperbaiki dalam 60-90 hari dengan eksperimen ulang) atau \"Reject\" jika arsitektur eksperimen secara fundamental harus dirombak dari awal.",
          "[result: Interpretasi Ilmiah] Keberadaan satu cacat metodologis fundamental memiliki bobot penentu yang melampaui skor numerik rata-rata rekomendasi reviewer lainnya."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 19,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Simulasi pohon keputusan agregasi editorial berdasarkan laporan reviewer independen.",
        "bulletPoints": [
          "Tujuan Algoritma: Simulasi pohon keputusan agregasi editorial berdasarkan laporan reviewer independen.",
          "Dependensi Pustaka Ilmiah: Standard Scientific Libraries",
          "Keluaran Terverifikasi: HASIL SIMULASI KEPUTUSAN EDITORIAL:"
        ],
        "keyFormulaOrDiagram": "HASIL SIMULASI KEPUTUSAN EDITORIAL:\n-------------------------------------------------------\nReviewer 1: Accept\nReviewer 2: Minor Revision\nReviewer 3: Reject [FATAL]",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 20,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menyerahkan naskah tanpa menganonimkan identitas pada jurnal bersistem Double-Blind Review (menyebabkan immediate desk return).",
          "[warning: Perangkap] Mengira bahwa mendapatkan status Major Revision berarti naskah gagal (Major Revision adalah peluang emas penerbitan yang harus dimanfaatkan maksimal).",
          "[warning: Perangkap] Bereaksi emosional atau marah terhadap komentar reviewer yang tajam dan kritis."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 21,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Lakukan pra-peninjauan internal (mock peer review) bersama rekan sejawat sebelum naskah dikirim ke jurnal.",
          "Prosedur: Periksa apakah ada referensi diri sendiri (self-citation) yang berlebihan yang dapat mengungkap identitas penulis pada sistem blind review."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 22,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Apa perbedaan mendasar antara keputusan \"Reject\" dan \"Reject & Resubmit\"?",
          "Petunjuk Analitis: Perhatikan apakah naskah boleh dikirimkan kembali ke jurnal yang sama setelah perbaikan besar.",
          "Solusi Kunci: Keputusan \"Reject\" (penolakan mutlak) menutup pintu bagi naskah tersebut untuk diserahkan kembali ke jurnal yang sama. Sedangkan \"Reject & Resubmit\" berarti ide riset tersebut dinilai menarik oleh editor, namun membutuhkan perubahan eksperimental yang sangat masif sehingga tidak mungkin diselesaikan dalam batas waktu siklus revisi standar (biasanya 30-90 hari). Penulis diizinkan mengajukan naskah kembali sebagai submisi baru setelah seluruh pengujian tambahan selesai."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "7.5.3": {
    "id": "7.5.3",
    "chapterId": "CH-49",
    "title": "Konstruksi Point-by-Point Rebuttal Matrix: Merespons Masukan Kritis secara Objektif",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Menguasai metodologi perancangan dokumen Point-by-Point Rebuttal Matrix.",
      "Menerapkan struktur 3 bagian standar dalam menanggapi komentar reviewer: Agree/Acknowledge, Action Taken, Exact Location of Changes.",
      "Mengelola kritik reviewer yang tidak tepat atau keliru secara santun berbasis bukti matematis dan empiris."
    ],
    "content": "Ketika sebuah naskah menerima keputusan revisi (Major atau Minor Revision), dokumen terpenting yang menentukan apakah naskah akhirnya diterima adalah Surat Tanggapan Penulis (Author Response / Rebuttal Letter). Reviewer dan editor umumnya membaca dokumen rebuttal ini terlebih dahulu sebelum membuka naskah yang direvisi. Rebuttal yang disusun secara asal-asalan, defensif, atau tidak terstruktur akan membuat reviewer merasa masukannya diabaikan, yang berujung pada penolakan di ronde kedua.\n\nStruktur Emas Point-by-Point Rebuttal Matrix:\nSetiap komentar dari reviewer wajib direspons secara terpisah menggunakan pola 3 langkah terstandarisasi:\n1. Sikap Hormat dan Apresiasi (Acknowledge & Clarify): Ucapkan terima kasih dan nyatakan persetujuan atau pemahaman atas esensi kritik reviewer (\"We thank the reviewer for pointing out this critical aspect...\").\n2. Tindakan Konkret yang Diambil (Action Taken): Uraikan apa yang telah dilakukan penulis untuk menuntaskan masalah tersebut: apakah melakukan eksperimen baru, menulis ulang formula, atau menambahkan tabel benchmark (\"To address this concern, we conducted additional ablation experiments across 5 random seeds...\").\n3. Kutipan Lokasi Teks Perubahan (Exact Location and Verbatim Changes): Kutip kalimat persis yang diubah dan sebutkan nomor halaman serta barisnya di naskah (\"The manuscript has been revised on page 8, lines 145-152, as follows: '...'\").\n\nMenghadapi Reviewer yang Keliru atau Bias:\nTerkadang seorang reviewer mengajukan kritik yang faktual salah atau meminta eksperimen yang berada di luar ruang lingkup penelitian:\n- Jangan pernah bersikap sarkastis atau menuduh reviewer tidak memahami materi.\n- Asumsikan kesalahpahaman tersebut terjadi karena penjelasan di naskah awal kurang jernih.\n- Berikan klarifikasi yang sangat santun dengan menyertakan bukti rujukan literatur atau penurunan matematis yang tak terbantahkan, lalu tambahkan paragraf klarifikasi di naskah agar pembaca masa depan tidak mengalami kebingungan yang sama.",
    "mathematicalFoundations": "Pohon Resolusi Komentar Reviewer (Rebuttal Resolution Tree):\nHimpunan komentar dari reviewer $\\mathcal{K} = \\{k_1, k_2, \\dots, k_M\\}$ diklasifikasikan ke dalam tipe tindak lanjut $\\mathcal{T}$:\n$$\\mathcal{T} = \\{\\text{Empirical Revision}, \\text{Theoretical Clarification}, \\text{Scope Defense}, \\text{Typo/Formatting}\\}$$\n\nMetrik Kelengkapan Resolusi Rebuttal ($R_{\\text{score}}$):\nSebuah tanggapan revisi dianggap sempurna ($R_{\\text{score}} = 1.0$) jika dan hanya jika setiap komentar $k_m$ memiliki closure lengkap:\n$$R_{\\text{score}} = \\frac{1}{M} \\sum_{m=1}^M \\mathbb{I}(\\text{Action}(k_m) \\land \\text{Evidence}(k_m) \\land \\text{DiffQuote}(k_m))$$\ndi mana $\\mathbb{I}(\\cdot)$ bernilai 1 jika ketiga komponen (tindakan, bukti, dan kutipan teks baru) terpenuhi secara eksplisit.",
    "workedExample": {
      "problemStatement": "Reviewer 2 menulis kritik: \"Metode deteksi cacat yang diajukan penulis hanya diuji pada 100 citra, yang mana ukuran sampel ini terlalu kecil untuk menyimpulkan generalisasi model.\" Bagaimana penulis menyusun matriks respons point-by-point yang profesional dan tuntas?",
      "stepByStepSolution": [
        "Langkah 1: Tulis apresiasi tulus: \"Comment 2: The proposed method is evaluated on only 100 images, which is too small to claim generalization.\\n\\nResponse: We sincerely thank the reviewer for this insightful comment. We fully agree that sample size is crucial for validating statistical generalization in computer vision models.\"",
        "Langkah 2: Jelaskan tindakan konkret: \"Action Taken: To address this concern, we expanded our experimental dataset by collecting 400 additional high-resolution images from ITERA solar testbeds and performed a 5-fold cross-validation across all 500 images. The updated empirical results confirm that our model maintains a mean Average Precision (mAP) of 92.4% +/- 1.1% across the enlarged dataset.\"",
        "Langkah 3: Kutip perubahan pada naskah: \"Manuscript Revision: We have updated Table 3 and added an in-depth discussion in Section 4.2 (Page 9, Lines 210-224):\\n'To ensure statistical validity over a wider operational range, the evaluation was scaled to 500 annotated images using 5-fold cross-validation. As summarized in Table 3, the proposed architecture consistently achieves an mAP of 92.4%...'\""
      ],
      "resultInterpretation": "Menjawab kritik reviewer dengan penambahan 400 data baru dan kutipan teks naskah revisi membuktikan dedikasi riset dan menutup peluang penolakan pada ronde kedua."
    },
    "pythonImplementation": {
      "description": "Pembangkit template dokumen Point-by-Point Rebuttal terstruktur untuk respons peer-review.",
      "libraryDependencies": [],
      "code": "# [SIMULASI/SYNTHETIC DATA] - Generator kerangka tanggapan reviewer ilmiah\nreviewer_feedback = [\n    {\n        \"id\": \"R1.C1\",\n        \"reviewer\": \"Reviewer #1\",\n        \"comment\": \"The computational runtime comparison is missing. Please provide FPS benchmarks.\",\n        \"action\": \"Measured inference time on NVIDIA RTX 3090 across 1000 runs.\",\n        \"section\": \"Section 4.4, Page 11, Table 4\"\n    },\n    {\n        \"id\": \"R2.C1\",\n        \"reviewer\": \"Reviewer #2\",\n        \"comment\": \"Equation 4 has a typo in the summation index (starts from 0 instead of 1).\",\n        \"action\": \"Corrected index in Equation 4 to k=1.\",\n        \"section\": \"Section 3.2, Page 6, Line 142\"\n    }\n]\n\nprint(\"POINT-BY-POINT REBUTTAL LETTER MATRIX:\")\nprint(\"=\" * 70)\n\nfor item in reviewer_feedback:\n    print(f\"[{item['id']}] From {item['reviewer']}:\")\n    print(f\"COMMENT: '{item['comment']}'\")\n    print(\"RESPONSE:\")\n    print(\"  We thank the reviewer for this constructive observation.\")\n    print(f\"  [Action Taken]: {item['action']}\")\n    print(f\"  [Manuscript Changes]: Updated in {item['section']}.\")\n    print(\"-\" * 70)",
      "expectedOutput": "POINT-BY-POINT REBUTTAL LETTER MATRIX:\n======================================================================\n[R1.C1] From Reviewer #1:\nCOMMENT: 'The computational runtime comparison is missing. Please provide FPS benchmarks.'\nRESPONSE:\n  We thank the reviewer for this constructive observation.\n  [Action Taken]: Measured inference time on NVIDIA RTX 3090 across 1000 runs.\n  [Manuscript Changes]: Updated in Section 4.4, Page 11, Table 4.\n----------------------------------------------------------------------\n[R2.C1] From Reviewer #2:\nCOMMENT: \"Equation 4 has a typo in the summation index (starts from 0 instead of 1).\"\nRESPONSE:\n  We thank the reviewer for this constructive observation.\n  [Action Taken]: Corrected index in Equation 4 to k=1.\n  [Manuscript Changes]: Updated in Section 3.2, Page 6, Line 142.\n----------------------------------------------------------------------"
    },
    "commonPitfalls": [
      "Menanggapi komentar reviewer hanya dengan satu kalimat singkat seperti: \"Done\" atau \"Fixed\" tanpa mengutip perubahan teksnya.",
      "Berdebat secara emosional dan menuduh reviewer tidak kompeten ketika reviewer salah mengerti konsep naskah.",
      "Mengabaikan komentar reviewer tertentu yang dianggap sulit atau sengaja melewatinya dengan harapan tidak diperhatikan editor."
    ],
    "validationProcedures": [
      "Lakukan audit kelengkapan 100%: pastikan setiap butir komentar reviewer diberi nomor indeks unik dan memiliki respons lengkap.",
      "Gunakan format visual penanda teks (misalnya warna biru untuk teks revisi di naskah dan warna merah untuk teks yang dihapus)."
    ],
    "exercises": [
      {
        "question": "Mengapa menyertakan kutipan persis teks naskah yang baru (verbatim text changes) di dalam surat rebuttal sangat diapresiasi oleh editor dan reviewer?",
        "hint": "Pikirkan efisiensi waktu reviewer yang memiliki beban kerja akademis padat.",
        "answerExplanation": "Reviewer adalah akademisi sukarelawan yang sangat sibuk. Menyertakan kutipan persis teks revisi di surat rebuttal memungkinkan reviewer memverifikasi perbaikan secara instan dalam hitungan detik tanpa harus membuka-buka dan mencari kalimat baru di naskah berlembar-lembar."
      },
      {
        "question": "Jika reviewer meminta Anda membandingkan metode dengan makalah yang baru terbit minggu lalu saat naskah Anda sedang direview, bagaimana strategi respons yang tepat?",
        "hint": "Perhatikan batasan temporal literatur yang adil.",
        "answerExplanation": "Penulis dapat menjelaskan secara santun bahwa artikel tersebut terbit setelah tanggal submisi naskah awal Anda. Namun, sebagai bentuk penghormatan saintifik, penulis tetap dapat mendiskusikan makalah baru tersebut di bagian Discussion dan menjelaskan perbedaan konseptualnya tanpa wajib mengulang seluruh eksperimen laboratorium dari nol."
      }
    ],
    "references": [
      {
        "citation": "Noble, W. S. (2017). Ten simple rules for writing a response to reviewers. PLOS Computational Biology, 13(10), e1005730.",
        "type": "peer-reviewed-article"
      },
      {
        "citation": "Williams, H. C. (2004). How to reply to peer reviewers comments when submitting a revised manuscript. Journal of the American Academy of Dermatology, 51(1), 79-83.",
        "type": "peer-reviewed-article"
      }
    ],
    "slides": [
      {
        "slideNumber": 23,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Konstruksi Point-by-Point Rebuttal Matrix: Merespons Masukan Kritis secara Objektif",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.5.3.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.5.3 dalam kurikulum riset rekayasa.",
          "Capaian 1: Menguasai metodologi perancangan dokumen Point-by-Point Rebuttal Matrix.",
          "Capaian 2: Menerapkan struktur 3 bagian standar dalam menanggapi komentar reviewer: Agree/Acknowledge, Action Taken, Exact Location of Changes.",
          "Capaian 3: Mengelola kritik reviewer yang tidak tepat atau keliru secara santun berbasis bukti matematis dan empiris."
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{T} = \\{\\text{Empirical Revision}, \\text{Theoretical Clarification}, \\text{Scope Defense}, \\text{Typo/Formatting}\\}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.5.3."
      },
      {
        "slideNumber": 24,
        "layout": "concept",
        "title": "Fondasi Konseptual: Konstruksi Point-by-Point Rebuttal Matrix: Merespons Masukan Kritis secara Objektif",
        "lead": "Ketika sebuah naskah menerima keputusan revisi (Major atau Minor Revision), dokumen terpenting yang menentukan apakah naskah akhirnya diterima adalah Surat Tanggapan Penulis (Author Response / Rebuttal Letter).",
        "bulletPoints": [
          "Reviewer dan editor umumnya membaca dokumen rebuttal ini terlebih dahulu sebelum membuka naskah yang direvisi.",
          "Rebuttal yang disusun secara asal-asalan, defensif, atau tidak terstruktur akan membuat reviewer merasa masukannya diabaikan, yang berujung pada penolakan di ronde kedua.",
          "Struktur Emas Point-by-Point Rebuttal Matrix: Setiap komentar dari reviewer wajib direspons secara terpisah menggunakan pola 3 langkah terstandarisasi: 1.",
          "Sikap Hormat dan Apresiasi (Acknowledge & Clarify): Ucapkan terima kasih dan nyatakan persetujuan atau pemahaman atas esensi kritik reviewer (\"We thank the reviewer for pointing out this critical aspect...\")."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 25,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Menghadapi Reviewer yang Keliru atau Bias: Terkadang seorang reviewer mengajukan kritik yang faktual salah atau meminta eksperimen yang berada di luar ruang lingkup penelitian: - Jangan pernah bersikap sarkastis atau menuduh reviewer tidak memahami materi. - Asumsikan kesalahpahaman tersebut terjadi karena penjelasan di naskah awal kurang jernih. - Berikan klarifikasi yang sangat santun dengan menyertakan bukti rujukan literatur atau penurunan matematis yang tak terbantahkan, lalu tambahkan paragraf klarifikasi di naskah agar pembaca masa depan tidak mengalami kebingungan yang sama.",
        "bulletPoints": [],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 26,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Pohon Resolusi Komentar Reviewer (Rebuttal Resolution Tree):",
        "bulletPoints": [
          "Himpunan komentar dari reviewer $\\mathcal{K} = \\{k_1, k_2, \\dots, k_M\\}$ diklasifikasikan ke dalam tipe tindak lanjut $\\mathcal{T}$:",
          "Metrik Kelengkapan Resolusi Rebuttal ($R_{\\text{score}}$):",
          "Sebuah tanggapan revisi dianggap sempurna ($R_{\\text{score}} = 1.0$) jika dan hanya jika setiap komentar $k_m$ memiliki closure lengkap:"
        ],
        "keyFormulaOrDiagram": "$$\\mathcal{T} = \\{\\text{Empirical Revision}, \\text{Theoretical Clarification}, \\text{Scope Defense}, \\text{Typo/Formatting}\\}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 27,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Reviewer 2 menulis kritik: \"Metode deteksi cacat yang diajukan penulis hanya diuji pada 100 citra, yang mana ukuran sampel ini terlalu kecil untuk menyimpulkan generalisasi model.\" Bagaimana penulis menyusun matriks respons point-by-point yang profesional dan tuntas?",
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
          "Langkah 1: Tulis apresiasi tulus: \"Comment 2: The proposed method is evaluated on only 100 images, which is too small to claim generalization.\\n\\nResponse: We sincerely thank the reviewer for this insightful comment. We fully agree that sample size is crucial for validating statistical generalization in computer vision models.\"",
          "Langkah 2: Jelaskan tindakan konkret: \"Action Taken: To address this concern, we expanded our experimental dataset by collecting 400 additional high-resolution images from ITERA solar testbeds and performed a 5-fold cross-validation across all 500 images. The updated empirical results confirm that our model maintains a mean Average Precision (mAP) of 92.4% +/- 1.1% across the enlarged dataset.\""
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 29,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 3: Kutip perubahan pada naskah: \"Manuscript Revision: We have updated Table 3 and added an in-depth discussion in Section 4.2 (Page 9, Lines 210-224):\\n'To ensure statistical validity over a wider operational range, the evaluation was scaled to 500 annotated images using 5-fold cross-validation. As summarized in Table 3, the proposed architecture consistently achieves an mAP of 92.4%...'\"",
          "[result: Interpretasi Ilmiah] Menjawab kritik reviewer dengan penambahan 400 data baru dan kutipan teks naskah revisi membuktikan dedikasi riset dan menutup peluang penolakan pada ronde kedua."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 30,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Pembangkit template dokumen Point-by-Point Rebuttal terstruktur untuk respons peer-review.",
        "bulletPoints": [
          "Tujuan Algoritma: Pembangkit template dokumen Point-by-Point Rebuttal terstruktur untuk respons peer-review.",
          "Dependensi Pustaka Ilmiah: Standard Scientific Libraries",
          "Keluaran Terverifikasi: POINT-BY-POINT REBUTTAL LETTER MATRIX:"
        ],
        "keyFormulaOrDiagram": "POINT-BY-POINT REBUTTAL LETTER MATRIX:\n======================================================================\n[R1.C1] From Reviewer #1:\nCOMMENT: 'The computational runtime comparison is missing. Please provide FPS benchmarks.'\nRESPONSE:",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 31,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Menanggapi komentar reviewer hanya dengan satu kalimat singkat seperti: \"Done\" atau \"Fixed\" tanpa mengutip perubahan teksnya.",
          "[warning: Perangkap] Berdebat secara emosional dan menuduh reviewer tidak kompeten ketika reviewer salah mengerti konsep naskah.",
          "[warning: Perangkap] Mengabaikan komentar reviewer tertentu yang dianggap sulit atau sengaja melewatinya dengan harapan tidak diperhatikan editor."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 32,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Lakukan audit kelengkapan 100%: pastikan setiap butir komentar reviewer diberi nomor indeks unik dan memiliki respons lengkap.",
          "Prosedur: Gunakan format visual penanda teks (misalnya warna biru untuk teks revisi di naskah dan warna merah untuk teks yang dihapus)."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 33,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa menyertakan kutipan persis teks naskah yang baru (verbatim text changes) di dalam surat rebuttal sangat diapresiasi oleh editor dan reviewer?",
          "Petunjuk Analitis: Pikirkan efisiensi waktu reviewer yang memiliki beban kerja akademis padat.",
          "Solusi Kunci: Reviewer adalah akademisi sukarelawan yang sangat sibuk. Menyertakan kutipan persis teks revisi di surat rebuttal memungkinkan reviewer memverifikasi perbaikan secara instan dalam hitungan detik tanpa harus membuka-buka dan mencari kalimat baru di naskah berlembar-lembar."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  },
  "7.5.4": {
    "id": "7.5.4",
    "chapterId": "CH-49",
    "title": "Manajemen Revisi Naskah Ilmiah dan Korespondensi Etis dengan Editor",
    "readingTimeMinutes": 20,
    "status": "verified",
    "learningObjectives": [
      "Mengelola manajemen versi naskah revisi (Track Changes vs Clean Manuscript).",
      "Menguasai etika korespondensi profesional dengan Editor-in-Chief dan Associate Editor.",
      "Menangani permohonan perpanjangan waktu revisi (extension request) dan penarikan naskah (withdrawal) secara legal dan etis."
    ],
    "content": "Fase revisi naskah sering kali berlangsung di bawah tekanan tenggat waktu yang ketat. Mengelola berkas-berkas revisi, koordinasi antar-rekan penulis (co-authors), dan korespondensi dengan editor membutuhkan manajemen proyek yang disiplin serta kepatuhan etika akademik yang tinggi. Kesalahan administratif sederhana, seperti mengunggah berkas naskah yang salah atau mengirimkan surat yang tidak pantas kepada editor, dapat menggagalkan publikasi naskah yang secara saintifik sangat bermutu.\n\nProtokol Pengunggahan Berkas Revisi:\nSaat mengunggah hasil revisi ke portal editorial (seperti Editorial Manager, ScholarOne, atau Elsevier Editorial System), penulis umumnya diwajibkan menyertakan dua versi naskah:\n1. Marked-up / Tracked Manuscript: Naskah yang memperlihatkan secara jelas setiap suntingan teks (biasanya menggunakan fitur Track Changes di Microsoft Word, atau paket latexdiff pada LaTeX dengan warna teks berbeda). Ini membantu reviewer memverifikasi perubahan seketika.\n2. Clean Manuscript: Naskah versi bersih tanpa coretan atau tanda revisi, yang siap diteruskan ke tahap produksi penerbitan (typesetting).\n3. Response to Reviewers Letter: Dokumen rebuttal terpisah yang merinci jawaban atas setiap masukan.\n\nEtika Korespondensi dengan Redaksi:\nSeluruh komunikasi dengan editor wajib menjunjung tinggi etika akademik:\n- Surat Pengantar Revisi (Revision Cover Letter): Nyatakan secara ringkas komitmen penulis dalam menyempurnakan naskah sesuai arahan reviewer, sebutkan nomor manuskrip resmi, dan rangkum perubahan-perubahan eksperimental besar yang telah dilakukan.\n- Permohonan Perpanjangan Waktu (Extension Request): Jika eksperimen tambahan membutuhkan waktu lebih lama dari batas waktu 60 hari, hubungi editor setidaknya dua minggu sebelum tenggat berakhir. Jelaskan kendala laboratorium riil (misalnya antrian fasilitas mikroskop elektron atau pengadaan sampel kimia) dan ajukan tanggal realistis baru. Editor yang bertanggung jawab hampir selalu mengabulkan permohonan yang masuk akal.",
    "mathematicalFoundations": "Pembangkitan Visualisasi Perbedaan Naskah Otomatis (Latexdiff Metric):\nDiberikan naskah lama sebagai deretan token $\\mathbf{u} = (u_1, \\dots, u_m)$ dan naskah revisi $\\mathbf{v} = (v_1, \\dots, v_n)$. Algoritma latexdiff menghitung Longest Common Subsequence (LCS):\n\n$$\\text{LCS}(\\mathbf{u}, \\mathbf{v}) = \\max_{\\mathbf{w}} \\{ |\\mathbf{w}| : \\mathbf{w} \\text{ subsequence dari } \\mathbf{u} \\text{ dan } \\mathbf{v} \\}$$\n\nTingkat perombakan teks naskah (Churn Rate) dihitung sebagai:\n$$\\text{Churn Rate} = \\frac{(m - |\\text{LCS}|) + (n - |\\text{LCS}|)}{m + n}$$\nPada revisi bertaraf Major Revision, Churn Rate yang sehat biasanya berkisar antara $0.15$ hingga $0.35$ (15% hingga 35% teks naskah mengalami penyempurnaan).",
    "workedExample": {
      "problemStatement": "Sebuah tim peneliti ITERA mendapatkan keputusan Major Revision dengan batas waktu 60 hari. Pada hari ke-45, instrumen spektrofotometer UV-Vis laboratorium rusak dan memerlukan waktu perbaikan 3 minggu. Bagaimana cara merumuskan email permohonan perpanjangan waktu (extension request) yang etis dan profesional kepada Associate Editor?",
      "stepByStepSolution": [
        "Langkah 1: Hubungi editor segera (jangan menunggu sampai H-1 tenggat waktu).",
        "Langkah 2: Sebutkan identitas naskah lengkap: Judul lengkap naskah dan Nomor Manuskrip resmi (misal: Manuscript ID #IEEE-TSE-2025-0124).",
        "Langkah 3: Jelaskan progress yang sudah dicapai: Sebutkan bahwa 85% masukan reviewer telah selesai direvisi.",
        "Langkah 4: Jelaskan kendala fisik di luar kendali: Jelaskan secara transparan bahwa alat UV-Vis sedang dalam masa perbaikan teknis tak terduga.",
        "Langkah 5: Ajukan durasi perpanjangan spesifik dan realistis: Mintalah perpanjangan waktu 3 hingga 4 minggu tambahan, dan tegaskan komitmen tim untuk menyelesaikan naskah dengan kualitas terbaik."
      ],
      "resultInterpretation": "Komunikasi yang transparan, tepat waktu, dan disertai bukti progres konkret membangun respek profesional editor terhadap integritas tim peneliti."
    },
    "pythonImplementation": {
      "description": "Kalkulator tingkat perombakan teks naskah (churn rate) berbasis Longest Common Subsequence.",
      "libraryDependencies": [
        "difflib"
      ],
      "code": "import difflib\n\n# [SIMULASI/SYNTHETIC DATA] - Perhitungan churn rate naskah revisi\ndraft_v1 = \"\"\"\nWe propose a deep convolutional network for solar cell fault detection.\nThe method is tested on 100 images and reaches 90% accuracy.\nOur work shows good potential for automated inspection.\n\"\"\".strip().split()\n\ndraft_v2 = \"\"\"\nWe propose an attention-guided multiscale neural network for solar cell fault detection.\nThe methodology is systematically evaluated on 500 electroluminescence images across 5-fold cross-validation.\nEmpirical results demonstrate an mAP of 92.4% with robust convergence under dynamic noise.\n\"\"\".strip().split()\n\nmatcher = difflib.SequenceMatcher(None, draft_v1, draft_v2)\nlcs_length = sum(match.size for match in matcher.get_matching_blocks())\n\ntotal_tokens = len(draft_v1) + len(draft_v2)\ndeletions = len(draft_v1) - lcs_length\nadditions = len(draft_v2) - lcs_length\nchurn_rate = (deletions + additions) / total_tokens\n\nprint(\"METRIK MANAJEMEN REVISI NASKAH:\")\nprint(\"-\" * 50)\nprint(f\"Total Kata Draf Awal (V1)    : {len(draft_v1)}\")\nprint(f\"Total Kata Draf Revisi (V2)  : {len(draft_v2)}\")\nprint(f\"Jumlah Kata Sama (LCS)       : {lcs_length}\")\nprint(f\"Tingkat Perombakan (Churn)   : {churn_rate * 100:.2f}%\")\n\nif churn_rate >= 0.20:\n    print(\"Status: Revisi Substansial (Ideal untuk Major Revision)\")\nelse:\n    print(\"Status: Revisi Kosmetik / Minor\")\nprint(\"-\" * 50)",
      "expectedOutput": "METRIK MANAJEMEN REVISI NASKAH:\n--------------------------------------------------\nTotal Kata Draf Awal (V1)    : 24\nTotal Kata Draf Revisi (V2)  : 30\nJumlah Kata Sama (LCS)       : 13\nTingkat Perombakan (Churn)   : 51.85%\nStatus: Revisi Substansial (Ideal untuk Major Revision)\n--------------------------------------------------"
    },
    "commonPitfalls": [
      "Mengirimkan draf revisi hanya beberapa jam sebelum deadline tanpa verifikasi ulang nama seluruh co-authors.",
      "Mengubah urutan nama penulis (authorship order) saat revisi tanpa persetujuan tertulis dari seluruh co-authors dan izin eksplisit editor.",
      "Menghapus bagian yang dikritik reviewer alih-alih memperbaikinya secara ilmiah."
    ],
    "validationProcedures": [
      "Gunakan perintah automated diff (misalnya: latexdiff original.tex revised.tex > diff.tex) untuk memastikan seluruh perubahan ditandai secara akurat.",
      "Lakukan sanity-check checklist berkas: pastikan berkas Marked-up, berkas Clean, dan berkas Cover Letter diunggah ke slot yang benar di sistem editorial."
    ],
    "exercises": [
      {
        "question": "Mengapa perubahan urutan nama penulis (author order) atau penambahan nama penulis baru pada tahap revisi diawasi sangat ketat oleh editor jurnal bereputasi?",
        "hint": "Perhatikan potensi praktik jual-beli kepengarangan (ghost/gift authorship).",
        "answerExplanation": "Penambahan nama penulis baru atau pergeseran posisi author pada tahap revisi merupakan indikasi klasik praktik kepengarangan yang tidak etis (seperti menjual slot nama penulis pada naskah yang hampir diterima). Editor mewajibkan formulir persetujuan bermeterai/tertulis dari seluruh penulis lama dan alasan kontribusi ilmiah yang sah sebelum mengizinkan perubahan tersebut."
      },
      {
        "question": "Kapan saat yang tepat untuk mengajukan permohonan perpanjangan waktu revisi kepada editor?",
        "hint": "Bukan di hari terakhir tenggat waktu.",
        "answerExplanation": "Saat yang tepat adalah segera setelah kendala diketahui, idealnya 2 hingga 3 minggu sebelum tenggat berakhir. Menghubungi editor pada hari terakhir menunjukkan manajemen waktu yang buruk dan ketidaksiapan profesional."
      }
    ],
    "references": [
      {
        "citation": "Committee on Publication Ethics (COPE). (2021). Guidelines on authorship and contributorship.",
        "type": "guideline"
      },
      {
        "citation": "International Committee of Medical Journal Editors (ICMJE). (2023). Recommendations for the conduct, reporting, editing, and publication of scholarly work.",
        "type": "formal-standard"
      }
    ],
    "slides": [
      {
        "slideNumber": 34,
        "layout": "concept",
        "title": "Tinjauan & Capaian: Manajemen Revisi Naskah Ilmiah dan Korespondensi Etis dengan Editor",
        "lead": "Orientasi metodologis dan capaian pembelajaran khusus pada Lesson 7.5.4.",
        "bulletPoints": [
          "Fokus Metodologis: Pembahasan komprehensif pada lesson 7.5.4 dalam kurikulum riset rekayasa.",
          "Capaian 1: Mengelola manajemen versi naskah revisi (Track Changes vs Clean Manuscript).",
          "Capaian 2: Menguasai etika korespondensi profesional dengan Editor-in-Chief dan Associate Editor.",
          "Capaian 3: Menangani permohonan perpanjangan waktu revisi (extension request) dan penarikan naskah (withdrawal) secara legal dan etis."
        ],
        "keyFormulaOrDiagram": "$$\\text{LCS}(\\mathbf{u}, \\mathbf{v}) = \\max_{\\mathbf{w}} \\{ |\\mathbf{w}| : \\mathbf{w} \\text{ subsequence dari } \\mathbf{u} \\text{ dan } \\mathbf{v} \\}$$",
        "notes": "Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson 7.5.4."
      },
      {
        "slideNumber": 35,
        "layout": "concept",
        "title": "Fondasi Konseptual: Manajemen Revisi Naskah Ilmiah dan Korespondensi Etis dengan Editor",
        "lead": "Fase revisi naskah sering kali berlangsung di bawah tekanan tenggat waktu yang ketat.",
        "bulletPoints": [
          "Mengelola berkas-berkas revisi, koordinasi antar-rekan penulis (co-authors), dan korespondensi dengan editor membutuhkan manajemen proyek yang disiplin serta kepatuhan etika akademik yang tinggi.",
          "Kesalahan administratif sederhana, seperti mengunggah berkas naskah yang salah atau mengirimkan surat yang tidak pantas kepada editor, dapat menggagalkan publikasi naskah yang secara saintifik sangat bermutu.",
          "Protokol Pengunggahan Berkas Revisi: Saat mengunggah hasil revisi ke portal editorial (seperti Editorial Manager, ScholarOne, atau Elsevier Editorial System), penulis umumnya diwajibkan menyertakan dua versi naskah: 1.",
          "Marked-up / Tracked Manuscript: Naskah yang memperlihatkan secara jelas setiap suntingan teks (biasanya menggunakan fitur Track Changes di Microsoft Word, atau paket latexdiff pada LaTeX dengan warna teks berbeda)."
        ],
        "notes": "Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini."
      },
      {
        "slideNumber": 36,
        "layout": "concept",
        "title": "Arsitektur Metodologis & Desain Operasional",
        "lead": "Etika Korespondensi dengan Redaksi: Seluruh komunikasi dengan editor wajib menjunjung tinggi etika akademik: - Surat Pengantar Revisi (Revision Cover Letter): Nyatakan secara ringkas komitmen penulis dalam menyempurnakan naskah sesuai arahan reviewer, sebutkan nomor manuskrip resmi, dan rangkum perubahan-perubahan eksperimental besar yang telah dilakukan. - Permohonan Perpanjangan Waktu (Extension Request): Jika eksperimen tambahan membutuhkan waktu lebih lama dari batas waktu 60 hari, hubungi editor setidaknya dua minggu sebelum tenggat berakhir.",
        "bulletPoints": [
          "Jelaskan kendala laboratorium riil (misalnya antrian fasilitas mikroskop elektron atau pengadaan sampel kimia) dan ajukan tanggal realistis baru.",
          "Editor yang bertanggung jawab hampir selalu mengabulkan permohonan yang masuk akal."
        ],
        "notes": "Tegaskan batas operasional sistem dan validitas internal pengukuran."
      },
      {
        "slideNumber": 37,
        "layout": "derivation",
        "title": "Formulasi Matematis & Notasi Formal",
        "lead": "Pembangkitan Visualisasi Perbedaan Naskah Otomatis (Latexdiff Metric):",
        "bulletPoints": [
          "Diberikan naskah lama sebagai deretan token $\\mathbf{u} = (u_1, \\dots, u_m)$ dan naskah revisi $\\mathbf{v} = (v_1, \\dots, v_n)$. Algoritma latexdiff menghitung Longest Common Subsequence (LCS):",
          "Tingkat perombakan teks naskah (Churn Rate) dihitung sebagai:",
          "Pada revisi bertaraf Major Revision, Churn Rate yang sehat biasanya berkisar antara $0.15$ hingga $0.35$ (15% hingga 35% teks naskah mengalami penyempurnaan)."
        ],
        "keyFormulaOrDiagram": "$$\\text{LCS}(\\mathbf{u}, \\mathbf{v}) = \\max_{\\mathbf{w}} \\{ |\\mathbf{w}| : \\mathbf{w} \\text{ subsequence dari } \\mathbf{u} \\text{ dan } \\mathbf{v} \\}$$",
        "notes": "Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali."
      },
      {
        "slideNumber": 38,
        "layout": "example",
        "title": "Studi Kasus Numerik: Perumusan Masalah",
        "lead": "Konteks rekayasa dan spesifikasi parameter eksperimen.",
        "bulletPoints": [
          "Konteks Kasus: Sebuah tim peneliti ITERA mendapatkan keputusan Major Revision dengan batas waktu 60 hari. Pada hari ke-45, instrumen spektrofotometer UV-Vis laboratorium rusak dan memerlukan waktu perbaikan 3 minggu. Bagaimana cara merumuskan email permohonan perpanjangan waktu (extension request) yang etis dan profesional kepada Associate Editor?",
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
          "Langkah 1: Hubungi editor segera (jangan menunggu sampai H-1 tenggat waktu).",
          "Langkah 2: Sebutkan identitas naskah lengkap: Judul lengkap naskah dan Nomor Manuskrip resmi (misal: Manuscript ID #IEEE-TSE-2025-0124).",
          "Langkah 3: Jelaskan progress yang sudah dicapai: Sebutkan bahwa 85% masukan reviewer telah selesai direvisi."
        ],
        "notes": "Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error."
      },
      {
        "slideNumber": 40,
        "layout": "example",
        "title": "Solusi Numerik: Pembuktian & Interpretasi Hasil",
        "lead": "Evaluasi kriteria keputusan statistik dan signifikansi temuan.",
        "bulletPoints": [
          "Langkah 4: Jelaskan kendala fisik di luar kendali: Jelaskan secara transparan bahwa alat UV-Vis sedang dalam masa perbaikan teknis tak terduga.",
          "Langkah 5: Ajukan durasi perpanjangan spesifik dan realistis: Mintalah perpanjangan waktu 3 hingga 4 minggu tambahan, dan tegaskan komitmen tim untuk menyelesaikan naskah dengan kualitas terbaik.",
          "[result: Interpretasi Ilmiah] Komunikasi yang transparan, tepat waktu, dan disertai bukti progres konkret membangun respek profesional editor terhadap integritas tim peneliti."
        ],
        "notes": "Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa."
      },
      {
        "slideNumber": 41,
        "layout": "algorithm",
        "title": "Implementasi Komputasi & Eksekusi Python",
        "lead": "Kalkulator tingkat perombakan teks naskah (churn rate) berbasis Longest Common Subsequence.",
        "bulletPoints": [
          "Tujuan Algoritma: Kalkulator tingkat perombakan teks naskah (churn rate) berbasis Longest Common Subsequence.",
          "Dependensi Pustaka Ilmiah: difflib",
          "Keluaran Terverifikasi: METRIK MANAJEMEN REVISI NASKAH:"
        ],
        "keyFormulaOrDiagram": "METRIK MANAJEMEN REVISI NASKAH:\n--------------------------------------------------\nTotal Kata Draf Awal (V1)    : 24\nTotal Kata Draf Revisi (V2)  : 30\nJumlah Kata Sama (LCS)       : 13",
        "notes": "Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik."
      },
      {
        "slideNumber": 42,
        "layout": "warning",
        "title": "Perangkap Metodologis & P-Hacking Warning",
        "lead": "Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.",
        "bulletPoints": [
          "[warning: Perangkap] Mengirimkan draf revisi hanya beberapa jam sebelum deadline tanpa verifikasi ulang nama seluruh co-authors.",
          "[warning: Perangkap] Mengubah urutan nama penulis (authorship order) saat revisi tanpa persetujuan tertulis dari seluruh co-authors dan izin eksplisit editor.",
          "[warning: Perangkap] Menghapus bagian yang dikritik reviewer alih-alih memperbaikinya secara ilmiah."
        ],
        "notes": "Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data."
      },
      {
        "slideNumber": 43,
        "layout": "example",
        "title": "Prosedur Validasi Empiris & Integritas Riset",
        "lead": "Protokol pengujian ketahanan model dan integritas keterbukaan sains.",
        "bulletPoints": [
          "Prosedur: Gunakan perintah automated diff (misalnya: latexdiff original.tex revised.tex > diff.tex) untuk memastikan seluruh perubahan ditandai secara akurat.",
          "Prosedur: Lakukan sanity-check checklist berkas: pastikan berkas Marked-up, berkas Clean, dan berkas Cover Letter diunggah ke slot yang benar di sistem editorial."
        ],
        "notes": "Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI)."
      },
      {
        "slideNumber": 44,
        "layout": "exercise",
        "title": "Sintesis Materi & Latihan Mandiri",
        "lead": "Pertanyaan penguji pemahaman kritis dan diskusi kelas.",
        "bulletPoints": [
          "Pertanyaan Uji: Mengapa perubahan urutan nama penulis (author order) atau penambahan nama penulis baru pada tahap revisi diawasi sangat ketat oleh editor jurnal bereputasi?",
          "Petunjuk Analitis: Perhatikan potensi praktik jual-beli kepengarangan (ghost/gift authorship).",
          "Solusi Kunci: Penambahan nama penulis baru atau pergeseran posisi author pada tahap revisi merupakan indikasi klasik praktik kepengarangan yang tidak etis (seperti menjual slot nama penulis pada naskah yang hampir diterima). Editor mewajibkan formulir persetujuan bermeterai/tertulis dari seluruh penulis lama dan alasan kontribusi ilmiah yang sah sebelum mengizinkan perubahan tersebut."
        ],
        "notes": "Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok."
      }
    ]
  }
};
