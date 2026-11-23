import { ResearchTemplate } from '../types/curriculum';

export const RESEARCH_TEMPLATES: ResearchTemplate[] = [
  {
    "id": "TMPL-01",
    "title": "Research Proposal Specification Template",
    "cycle": "planning",
    "purpose": "Menyediakan struktur formal proposal penelitian rekayasa yang terintegrasi, koheren, dan memenuhi standar evaluasi komite akademik serta penyedia hibah.",
    "targetUser": "Mahasiswa S1 (Tugas Akhir/Capstone), mahasiswa S2/S3, dan dosen pengusul proposal penelitian.",
    "whenUsed": "Pada fase inisiasi sebelum pengumpulan data atau perancangan rig eksperimen dimulai.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Proposal Tugas Akhir Teknik Elektro ITERA: \"Pengembangan Algoritma Estimasi State of Charge (SoC) Baterai LiFePO4 Menggunakan Adaptive Extended Kalman Filter di Bawah Variasi Suhu Ambien\".",
    "commonMistakes": [
      "Mengisi seksi metodologi hanya dengan alur perangkat lunak (\"langkah 1: buka Python, langkah 2: training model\") tanpa merinci variabel perlakuan dan prosedur kontrol eksperimen."
    ],
    "methodologicalReference": "Creswell & Creswell (2018), *Research Design* (5th ed.)."
  },
  {
    "id": "TMPL-02",
    "title": "Systematic Literature Review Matrix",
    "cycle": "planning",
    "purpose": "Menyediakan tabel ekstraksi dan sintesis bukti literatur multidimensi yang memfasilitasi komparasi kritis antar-naskah ilmiah primer.",
    "targetUser": "Seluruh jenjang peneliti (S1, S2, S3, Dosen).",
    "whenUsed": "Saat menjalankan tinjauan pustaka sistematis pada fase perumusan proposal dan penulisan naskah artikel.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Matriks perbandingan 25 artikel jurnal Q1 tentang algoritma deteksi keretakan permukaan jalan berbasis computer vision (memetakan arsitektur YOLO vs Faster R-CNN vs Transformer).",
    "commonMistakes": [
      "Mengisi kolom hasil hanya dengan ringkasan abstrak tanpa mengekstrak metrik numerik spesifik dan keterbatasan metodologis paper rujukan."
    ],
    "methodologicalReference": "Page et al. (2021), *The PRISMA 2020 statement: an updated guideline for reporting systematic reviews*."
  },
  {
    "id": "TMPL-03",
    "title": "Research Gap & Novelty Formulation Manifesto",
    "cycle": "planning",
    "purpose": "Memandu peneliti mengisolasi celah keilmuan (*gap*) nyata dari literatur dan merumuskan pernyataan klaim kebaruan (*novelty claim*) yang rasional, terukur, dan dapat dipertahankan.",
    "targetUser": "Mahasiswa tingkat akhir, kandidat doktor, dan dosen peneliti utama.",
    "whenUsed": "Setelah penelusuran pustaka selesai, sebelum menetapkan desain metodologi.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "\"Meskipun metode deteksi objek berbasis vision transformer mencapai akurasi tinggi pada citra beresolusi tinggi, metode tersebut mengalami penurunan akurasi 35% pada citra drone pertanian berkabut akibat degradasi kontras lokal (Methodological Gap). Kami mengusulkan modul atensi berbasis dekomposisi frekuensi wavelet yang mempertahankan akurasi deteksi di atas 85% mAP dengan penambahan latensi komputasi < 5 ms.\"",
    "commonMistakes": [
      "Mengklaim novelty hanya karena \"belum pernah dilakukan di lokasi penelitian ITERA\" tanpa ada perbedaan metodologis keilmuan yang nyata."
    ],
    "methodologicalReference": "Swales (1990), *Genre Analysis: English in academic and research settings*."
  },
  {
    "id": "TMPL-04",
    "title": "Research Questions & Hypotheses Alignment Matrix",
    "cycle": "planning",
    "purpose": "Menjamin keselarasan logis mutlak antara rumusan masalah, pertanyaan penelitian, hipotesis konseptual, hipotesis statistik ($H_0/H_1$), dan bukti data yang diperlukan.",
    "targetUser": "Mahasiswa S1/S2/S3 dan pembimbing riset.",
    "whenUsed": "Pada fase finalisasi proposal penelitian.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Pemetaan pertanyaan \"Apakah penambahan material doping graphene oksida meningkatkan konduktivitas termal polimer?\" menjadi $H_0: \\mu_{\\text{graphene}} \\leq \\mu_{\\text{base}}$ vs $H_1: \\mu_{\\text{graphene}} > \\mu_{\\text{base}}$, diuji via One-Tailed Two-Sample t-test pada $\\alpha = 0.05$.",
    "commonMistakes": [
      "Menyusun pertanyaan penelitian yang tidak memiliki pasangan hipotesis statistik teruji atau merumuskan hipotesis yang tidak dapat difalsifikasi."
    ],
    "methodologicalReference": "Cohen (1988), *Statistical Power Analysis for the Behavioral Sciences*."
  },
  {
    "id": "TMPL-05",
    "title": "Experimental Design Plan (EDP) Protocol",
    "cycle": "design-data",
    "purpose": "Mendokumentasikan rancangan arsitektur eksperimen secara formal sebelum eksperimen dijalankan guna mengunci prosedur uji dan mencegah p-hacking.",
    "targetUser": "Seluruh peneliti yang menjalankan eksperimen laboratorium, rig fisik, atau komputasi.",
    "whenUsed": "Sebelum pelaksanaan eksperimen (fase pra-registrasi internal laboratorium).",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "EDP pengujian ketahanan aus bantalan mesin: Desain Faktorial Penuh $2^3$ dengan 4 replikasi acak, blocking pada batch pelumas, dan kontrol suhu ruangan pada $23 \\pm 1^\\circ\\text{C}$.",
    "commonMistakes": [
      "Menjalankan eksperimen secara ad-hoc tanpa menetapkan variabel kontrol dan mengubah jumlah sampel di tengah jalan (*optional stopping*)."
    ],
    "methodologicalReference": "Montgomery (2017), *Design and Analysis of Experiments* (9th ed.)."
  },
  {
    "id": "TMPL-06",
    "title": "Measurement, Calibration & GUM Uncertainty Protocol",
    "cycle": "design-data",
    "purpose": "Memandu kalibrasi instrumen sensorik, membangun kurva kalibrasi tertelusur SI, dan menyusun tabel anggaran ketidakpastian pengukuran berstandar internasional.",
    "targetUser": "Peneliti laboratorium rekayasa, metrologi, dan IoT sensing.",
    "whenUsed": "Sebelum pengambilan data sensor dilakukan dan secara berkala selama siklus eksperimen.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Protokol kalibrasi sensor load-cell pengukur gaya dorong roket padat: estimasi $U = \\pm 1.25$ N pada beban nominal 500 N.",
    "commonMistakes": [
      "Mengabaikan evaluasi Tipe B dan hanya melaporkan deviasi standar data observasi sebagai total ketidakpastian pengukuran."
    ],
    "methodologicalReference": "JCGM 100:2008 (GUM), *Evaluation of measurement data - Guide to the expression of uncertainty in measurement*."
  },
  {
    "id": "TMPL-07",
    "title": "Data Collection SOP & Field Sampling Sheet",
    "cycle": "design-data",
    "purpose": "Menstandarisasi langkah pengumpulan data di lapangan atau laboratorium agar konsisten antar-operator dan meminimalkan bias lingkungan.",
    "targetUser": "Asisten riset, teknisi laboratorium, dan pengumpul data survei.",
    "whenUsed": "Selama proses akuisisi data mentah berlangsung.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "SOP pengambilan sampel tanah dan pengukuran spektral lapangan menggunakan spektrometer portabel untuk kalibrasi citra satelit di lahan pertanian ITERA.",
    "commonMistakes": [
      "Tidak mencatat kondisi suhu dan kelembaban ruangan yang dapat mendistorsi pembacaan sensor elektronik presisi tinggi."
    ],
    "methodologicalReference": "ISO/IEC 17025:2017, *General requirements for the competence of testing and calibration laboratories*."
  },
  {
    "id": "TMPL-08",
    "title": "Dataset Documentation Card (Datasheets for Datasets)",
    "cycle": "design-data",
    "purpose": "Mendokumentasikan riwayat hidup, komposisi, proses pengumpulan, dan batasan penggunaan dataset riset sesuai standar transparansi internasional.",
    "targetUser": "Pengembang dataset ilmiah, peneliti machine learning, dan manajer repositori data.",
    "whenUsed": "Saat dataset selesai dikumpulkan dan dibersihkan, sebelum digunakan untuk analisis atau dirilis publik.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Dataset Card untuk \"ITERA-CoffeeLeaf-2026\": 5.000 citra daun kopi beresolusi tinggi dengan anotasi bounding box 4 jenis penyakit tanaman, dikumpulkan di perkebunan Lampung.",
    "commonMistakes": [
      "Menyimpan file CSV/dataset tanpa penjelasan definisi kolom (*data dictionary*), format tanggal, unit metrik, dan kriteria inklusi data."
    ],
    "methodologicalReference": "Gebru et al. (2021), *Datasheets for Datasets*. Communications of the ACM, 64(12), 86-92."
  },
  {
    "id": "TMPL-09",
    "title": "Experimental Run-Sheet & Forensic Lab Notebook Log",
    "cycle": "analysis-evaluation",
    "purpose": "Menyediakan catatan kronologis pelaksanaan eksperimen secara forensik yang menjamin ketertelusuran data dan mencegah manipulasi retrospektif.",
    "targetUser": "Mahasiswa dan peneliti yang mengeksekusi pengujian di laboratorium atau simulasi komputer.",
    "whenUsed": "Diisi secara *real-time* selama eksperimen berlangsung di meja lab.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Run-sheet pengujian 16 variasi aerodinamika drone di terowongan angin (*wind tunnel*).",
    "commonMistakes": [
      "Mencatat data di kertas buram lepas tanpa tanggal dan baru memindahkannya ke komputer beberapa minggu kemudian."
    ],
    "methodologicalReference": "Guidelines for Responsible Data Management in Scientific Research (ORI/HHS)."
  },
  {
    "id": "TMPL-10",
    "title": "Statistical Analysis Plan (SAP) Pre-Registration Protocol",
    "cycle": "analysis-evaluation",
    "purpose": "Mengunci seluruh rencana pengujian statistik, kriteria pembersihan data, dan penanganan data hilang sebelum analisis dilakukan guna mencegah p-hacking dan HARKing.",
    "targetUser": "Peneliti utama dan analis data kuantitatif.",
    "whenUsed": "Setelah data terkumpul tetapi sebelum analisis statistik inferensial dijalankan.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Protokol SAP untuk uji perbandingan efisiensi dua kontroler motor listrik industri pada 5 skenario beban.",
    "commonMistakes": [
      "Memilih uji statistik setelah melihat data mana yang menghasilkan nilai $p < 0.05$ (*data fishing*)."
    ],
    "methodologicalReference": "Wasserstein & Lazar (2016), *The ASA Statement on p-Values*."
  },
  {
    "id": "TMPL-11",
    "title": "Benchmark Evaluation & Comparative Performance Report",
    "cycle": "analysis-evaluation",
    "purpose": "Menstandarisasi laporan evaluasi komparatif algoritma/sistem komputasi terhadap metode baseline SOTA secara objektif dan adil.",
    "targetUser": "Peneliti AI/ML, computer vision, rekayasa perangkat lunak, dan optimasi numerik.",
    "whenUsed": "Setelah eksekusi benchmark multi-algoritma selesai.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Laporan benchmark komparasi algoritma pelacakan visual objek jamak (MOT) pada 10 video benchmark benchmark MOTChallenge.",
    "commonMistakes": [
      "Hanya membandingkan dengan baseline kuno (*weak baseline*) dan tidak menyertakan variasi random seeds dalam pelaporan metrik."
    ],
    "methodologicalReference": "Demšar (2006), *Statistical Comparisons of Classifiers over Multiple Data Sets*."
  },
  {
    "id": "TMPL-12",
    "title": "Component Ablation Study Matrix & Failure Analysis Report",
    "cycle": "analysis-evaluation",
    "purpose": "Mendokumentasikan dekonstruksi modular sistem komputasi guna memvalidasi kontribusi masing-masing komponen inovasi dan mengidentifikasi batas kegagalan sistem.",
    "targetUser": "Peneliti yang mengembangkan arsitektur model baru dengan multi-komponen.",
    "whenUsed": "Pada fase evaluasi akhir sebelum penulisan naskah publikasi.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Laporan studi ablasi sistem segmentasi citra medis: membedah kontribusi modul attention gate, loss focal, dan fitur augmentasi elastis.",
    "commonMistakes": [
      "Melaporkan sistem sebagai kesatuan utuh tanpa membuktikan apakah modul tambahan benar-benar berkontribusi atau sekadar menambah kompleksitas komputasi."
    ],
    "methodologicalReference": "IEEE/CVPR Author Guidelines on Rigorous Empirical Evaluation."
  },
  {
    "id": "TMPL-13",
    "title": "ACM/IEEE Reproducibility Checklist & Artifact Descriptor",
    "cycle": "reporting-publication",
    "purpose": "Memandu peneliti menyusun paket artefak komputasi yang memenuhi kriteria pengujian independen (*Artifact Evaluated - Functional and Reusable*).",
    "targetUser": "Seluruh peneliti yang mempublikasikan kode dan data eksperimen komputasi.",
    "whenUsed": "Saat finalisasi repositori riset publik sebelum submission artikel ilmiah.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Berkas `REPRODUCIBILITY.md` pada repositori GitHub publik penelitian estimasi sinyal telemetri IoT.",
    "commonMistakes": [
      "Mengklaim riset reproduktif padahal kode memerlukan modifikasi path lokal secara manual atau dependensi library yang sudah usang (*broken dependencies*)."
    ],
    "methodologicalReference": "ACM Artifact Review and Badging Guidelines v2.0 (2020)."
  },
  {
    "id": "TMPL-14",
    "title": "Scientific Manuscript Outline (IMRaD Claims-Evidence Map)",
    "cycle": "reporting-publication",
    "purpose": "Memandu penyusunan naskah artikel ilmiah berstruktur IMRaD dengan jaminan bahwa setiap klaim yang ditulis didukung langsung oleh data empiris.",
    "targetUser": "Penulis artikel jurnal internasional dan prosiding konferensi bereputasi.",
    "whenUsed": "Pada fase draf penulisan sebelum penulisan teks lengkap dimulai.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Kerangka naskah artikel IEEE Transactions on Instrumentation and Measurement untuk metode kalibrasi sensor cerdas.",
    "commonMistakes": [
      "Mengklaim \"metode ini meningkatkan akurasi secara dramatis\" pada abstrak tanpa menyebutkan angka persentase peningkatan dan interval kepercayaannya."
    ],
    "methodologicalReference": "Day & Gastel (2012), *How to Write and Publish a Scientific Paper* (7th ed.)."
  },
  {
    "id": "TMPL-15",
    "title": "Point-by-Point Peer Review Rebuttal Matrix",
    "cycle": "reporting-publication",
    "purpose": "Menyediakan format terstruktur untuk menanggapi kritik reviewer jurnal secara profesional, santun, transparan, dan berbasis bukti eksperimental tambahan.",
    "targetUser": "Pengarang naskah yang menerima keputusan revisi (Major/Minor Revision) dari editor jurnal.",
    "whenUsed": "Selama proses penyiapan berkas naskah revisi jurnal.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Rebuttal matrix 15 halaman menanggapi 12 masukan kritis reviewer Elsevier Journal of Systems Architecture mengenai kelemahan analisis baseline.",
    "commonMistakes": [
      "Menolak masukan reviewer secara defensif tanpa menyertakan data eksperimen tambahan atau berjanji mengubah teks tetapi lupa memperbaruinya di naskah."
    ],
    "methodologicalReference": "COPE Guidelines for Authors on Peer Review Responses."
  },
  {
    "id": "TMPL-16",
    "title": "Strategic Multi-Year PhD Research Roadmap",
    "cycle": "reporting-publication",
    "purpose": "Memetakan payung penelitian doktoral 3-4 tahun ke dalam sub-proyek riset yang saling terkait dan memandu publikasi kumulatif (*thesis-by-publication*).",
    "targetUser": "Mahasiswa S3, calon mahasiswa doktoral, dan promotor/pembimbing disertasi.",
    "whenUsed": "Pada fase pendaftaran doktoral, penyusunan proposal disertasi, dan evaluasi progres tahunan.",
    "instructions": [
      "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
      "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
      "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
      "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
    ],
    "structureFields": [
      {
        "fieldName": "Project Title & Metadata",
        "description": "Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.",
        "required": true
      },
      {
        "fieldName": "Methodological Specification",
        "description": "Rincian parameter teknis, instrumen, dan model matematika.",
        "required": true
      },
      {
        "fieldName": "Empirical Evidence Table",
        "description": "Matriks data observasi, pembacaan sensor, atau skor benchmark.",
        "required": true
      },
      {
        "fieldName": "Validation & Uncertainty Limits",
        "description": "Batas ketidakpastian pengukuran dan kriteria falsifikasi.",
        "required": true
      }
    ],
    "realisticExample": "Peta jalan doktoral 4 tahun bidang Computer Vision: \"Robust 3D Visual Perception under Adverse Weather Conditions for Autonomous Systems\".",
    "commonMistakes": [
      "Memilih topik yang terlalu luas tanpa tonggak publikasi tahunan yang realistis sehingga menumpuk seluruh publikasi di akhir masa studi."
    ],
    "methodologicalReference": "Mullins & Kiley (2002), *It's a PhD, not a Nobel Prize: How to write a doctoral dissertation*."
  }
];
