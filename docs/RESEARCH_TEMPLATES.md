# RESEARCH TEMPLATES INVENTORY
## Scientific Research & Experimental Methods Learning Hub
### Institut Teknologi Sumatera (ITERA)

> **Dokumen Status:** Proposed Baseline v2.0  
> **Klasifikasi:** Standardized Academic Instruments & Operational Templates  
> **Penyusun:** Aji Pamungkas Tri Nurcahyo  
> **Tanggal:** 22 November 2026

---

## 1. STRUKTUR DAN SIKLUS PENGGUNAAN TEMPLATE

Seluruh template akademik dirancang mengikuti siklus hidup riset ilmiah formal (*scientific research lifecycle*):

$$\text{Research Planning} \longrightarrow \text{Study Design} \longrightarrow \text{Data Collection} \longrightarrow \text{Analysis} \longrightarrow \text{Evaluation} \longrightarrow \text{Reporting} \longrightarrow \text{Publication}$$

Setiap template memuat panduan komprehensif: Tujuan, Target Pengguna, Kapan Digunakan, Petunjuk Pengisian Lapangan demi Lapangan (*field-by-field instructions*), Contoh Kasus Nyata Bidang Rekayasa/Sains Komputasi, Kesalahan Konsep Umum (*common mistakes*), dan Referensi Metodologis Terverifikasi.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ SIKLUS 1: RESEARCH PLANNING (TMPL-01 s.d. TMPL-04)                      │
│ - TMPL-01: Research Proposal Specification Template                     │
│ - TMPL-02: Systematic Literature Review Matrix                          │
│ - TMPL-03: Research Gap & Novelty Formulation Manifesto                │
│ - TMPL-04: Research Questions & Hypotheses Alignment Matrix             │
├─────────────────────────────────────────────────────────────────────────┤
│ SIKLUS 2: STUDY DESIGN & DATA PROTOCOLS (TMPL-05 s.d. TMPL-08)          │
│ - TMPL-05: Experimental Design Plan (EDP) Protocol                      │
│ - TMPL-06: Measurement, Calibration & GUM Uncertainty Protocol          │
│ - TMPL-07: Data Collection SOP & Field Sampling Sheet                   │
│ - TMPL-08: Dataset Documentation Card (Datasheets for Datasets)         │
├─────────────────────────────────────────────────────────────────────────┤
│ SIKLUS 3: ANALYSIS & EVALUATION (TMPL-09 s.d. TMPL-12)                  │
│ - TMPL-09: Experimental Run-Sheet & Forensic Lab Notebook Log           │
│ - TMPL-10: Statistical Analysis Plan (SAP) Pre-Registration Protocol    │
│ - TMPL-11: Benchmark Evaluation & Comparative Performance Report        │
│ - TMPL-12: Component Ablation Study Matrix & Failure Analysis Report    │
├─────────────────────────────────────────────────────────────────────────┤
│ SIKLUS 4: REPORTING, REPRODUCIBILITY & PUBLICATION (TMPL-13 s.d. 16)    │
│ - TMPL-13: ACM/IEEE Reproducibility Checklist & Artifact Descriptor     │
│ - TMPL-14: Scientific Manuscript Outline (IMRaD Claims-Evidence Map)    │
│ - TMPL-15: Point-by-Point Peer Review Rebuttal Matrix                   │
│ - TMPL-16: Strategic Multi-Year PhD Research Roadmap                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. INVENTARIS 16 TEMPLATE RISET TERSTANDARISASI

### SIKLUS 1: RESEARCH PLANNING

#### TMPL-01: Research Proposal Specification Template
- **Tujuan:** Menyediakan struktur formal proposal penelitian rekayasa yang terintegrasi, koheren, dan memenuhi standar evaluasi komite akademik serta penyedia hibah.
- **Target Pengguna:** Mahasiswa S1 (Tugas Akhir/Capstone), mahasiswa S2/S3, dan dosen pengusul proposal penelitian.
- **Kapan Digunakan:** Pada fase inisiasi sebelum pengumpulan data atau perancangan rig eksperimen dimulai.
- **Petunjuk Pengisian:**
  - *Seksi 1 (Problem Scoping):* Uraikan latar belakang masalah rekayasa, batas lingkup, dan pohon masalah terarah.
  - *Seksi 2 (Literature Positioning):* Cantumkan pemetaan state-of-the-art dan rumusan kebaruan kontribusi delta.
  - *Seksi 3 (Methodology & Design):* Definisikan variabel, hipotesis operasional, instrumen, dan protokol validasi data.
  - *Seksi 4 (Work Breakdown & Risk):* Cantumkan jadwal Gantt chart, alokasi anggaran, dan matriks mitigasi risiko teknis.
- **Contoh Realistis:** Proposal Tugas Akhir Teknik Elektro ITERA: "Pengembangan Algoritma Estimasi State of Charge (SoC) Baterai LiFePO4 Menggunakan Adaptive Extended Kalman Filter di Bawah Variasi Suhu Ambien".
- **Common Mistakes:** Mengisi seksi metodologi hanya dengan alur perangkat lunak ("langkah 1: buka Python, langkah 2: training model") tanpa merinci variabel perlakuan dan prosedur kontrol eksperimen.
- **Referensi Metodologis:** Creswell & Creswell (2018), *Research Design* (5th ed.).

#### TMPL-02: Systematic Literature Review Matrix
- **Tujuan:** Menyediakan tabel ekstraksi dan sintesis bukti literatur multidimensi yang memfasilitasi komparasi kritis antar-naskah ilmiah primer.
- **Target Pengguna:** Seluruh jenjang peneliti (S1, S2, S3, Dosen).
- **Kapan Digunakan:** Saat menjalankan tinjauan pustaka sistematis pada fase perumusan proposal dan penulisan naskah artikel.
- **Petunjuk Pengisian:** Kolom wajib memuat: Sitasi Lengkap, Masalah Spesifik yang Diselesaikan, Metode/Arsitektur Usulan, Karakteristik Dataset/Instrumen, Metrik Evaluasi Kunci, Hasil Kuantitatif Utama, Keterbatasan yang Diakui Pengarang (*Acknowledged Limitations*), dan Relevansi terhadap Riset Peneliti.
- **Contoh Realistis:** Matriks perbandingan 25 artikel jurnal Q1 tentang algoritma deteksi keretakan permukaan jalan berbasis computer vision (memetakan arsitektur YOLO vs Faster R-CNN vs Transformer).
- **Common Mistakes:** Mengisi kolom hasil hanya dengan ringkasan abstrak tanpa mengekstrak metrik numerik spesifik dan keterbatasan metodologis paper rujukan.
- **Referensi Metodologis:** Page et al. (2021), *The PRISMA 2020 statement: an updated guideline for reporting systematic reviews*.

#### TMPL-03: Research Gap & Novelty Formulation Manifesto
- **Tujuan:** Memandu peneliti mengisolasi celah keilmuan (*gap*) nyata dari literatur dan merumuskan pernyataan klaim kebaruan (*novelty claim*) yang rasional, terukur, dan dapat dipertahankan.
- **Target Pengguna:** Mahasiswa tingkat akhir, kandidat doktor, dan dosen peneliti utama.
- **Kapan Digunakan:** Setelah penelusuran pustaka selesai, sebelum menetapkan desain metodologi.
- **Petunjuk Pengisian:**
  - *Kategori Gap:* Pilih antara Theoretical, Methodological, Empirical, atau Application Gap.
  - *Bukti Literatur Pendukung:* Kutip minimal 3 artikel bereputasi terkini yang membuktikan keberadaan gap tersebut.
  - *Keterbatasan SOTA:* Uraikan mengapa metode pembanding yang ada saat ini gagal menyelesaikan masalah tersebut.
  - *Formulasi Kontribusi Delta:* Rumuskan $\Delta = \text{Metode Usulan} - \text{SOTA}$ secara terukur dalam 1 kalimat terpadu.
- **Contoh Realistis:** "Meskipun metode deteksi objek berbasis vision transformer mencapai akurasi tinggi pada citra beresolusi tinggi, metode tersebut mengalami penurunan akurasi 35% pada citra drone pertanian berkabut akibat degradasi kontras lokal (Methodological Gap). Kami mengusulkan modul atensi berbasis dekomposisi frekuensi wavelet yang mempertahankan akurasi deteksi di atas 85% mAP dengan penambahan latensi komputasi < 5 ms."
- **Common Mistakes:** Mengklaim novelty hanya karena "belum pernah dilakukan di lokasi penelitian ITERA" tanpa ada perbedaan metodologis keilmuan yang nyata.
- **Referensi Metodologis:** Swales (1990), *Genre Analysis: English in academic and research settings*.

#### TMPL-04: Research Questions & Hypotheses Alignment Matrix
- **Tujuan:** Menjamin keselarasan logis mutlak antara rumusan masalah, pertanyaan penelitian, hipotesis konseptual, hipotesis statistik ($H_0/H_1$), dan bukti data yang diperlukan.
- **Target Pengguna:** Mahasiswa S1/S2/S3 dan pembimbing riset.
- **Kapan Digunakan:** Pada fase finalisasi proposal penelitian.
- **Petunjuk Pengisian:** Tabel 6 kolom yang memetakan: Nomor Rumusan Masalah $\to$ Pertanyaan Penelitian Spesifik $\to$ Hipotesis Riset Konseptual $\to$ Hipotesis Statistik Formal ($H_0$ dan $H_1$) $\to$ Variabel Pengukuran $\to$ Rencana Uji Statistik.
- **Contoh Realistis:** Pemetaan pertanyaan "Apakah penambahan material doping graphene oksida meningkatkan konduktivitas termal polimer?" menjadi $H_0: \mu_{\text{graphene}} \leq \mu_{\text{base}}$ vs $H_1: \mu_{\text{graphene}} > \mu_{\text{base}}$, diuji via One-Tailed Two-Sample t-test pada $\alpha = 0.05$.
- **Common Mistakes:** Menyusun pertanyaan penelitian yang tidak memiliki pasangan hipotesis statistik teruji atau merumuskan hipotesis yang tidak dapat difalsifikasi.
- **Referensi Metodologis:** Cohen (1988), *Statistical Power Analysis for the Behavioral Sciences*.

---

### SIKLUS 2: STUDY DESIGN & DATA PROTOCOLS

#### TMPL-05: Experimental Design Plan (EDP) Protocol
- **Tujuan:** Mendokumentasikan rancangan arsitektur eksperimen secara formal sebelum eksperimen dijalankan guna mengunci prosedur uji dan mencegah p-hacking.
- **Target Pengguna:** Seluruh peneliti yang menjalankan eksperimen laboratorium, rig fisik, atau komputasi.
- **Kapan Digunakan:** Sebelum pelaksanaan eksperimen (fase pra-registrasi internal laboratorium).
- **Petunjuk Pengisian:**
  - *Unit Eksperimen:* Deskripsikan objek uji fisik atau sampel komputasi.
  - *Faktor & Level:* Cantumkan variabel bebas yang dimanipulasi beserta nilai levelnya (misal: Level Suhu $25^\circ\text{C}, 40^\circ\text{C}, 60^\circ\text{C}$).
  - *Variabel Terikat:* Cantumkan respon fisik/metrik kinerja yang diukur dan instrumennya.
  - *Skema Kontrol:* Deskripsikan prosedur randomisasi, kelompok kontrol, dan teknik blocking variabel pengganggu.
  - *Power Analysis:* Lampirkan bukti perhitungan ukuran sampel minimum berdasarkan target power $80\%$.
- **Contoh Realistis:** EDP pengujian ketahanan aus bantalan mesin: Desain Faktorial Penuh $2^3$ dengan 4 replikasi acak, blocking pada batch pelumas, dan kontrol suhu ruangan pada $23 \pm 1^\circ\text{C}$.
- **Common Mistakes:** Menjalankan eksperimen secara ad-hoc tanpa menetapkan variabel kontrol dan mengubah jumlah sampel di tengah jalan (*optional stopping*).
- **Referensi Metodologis:** Montgomery (2017), *Design and Analysis of Experiments* (9th ed.).

#### TMPL-06: Measurement, Calibration & GUM Uncertainty Protocol
- **Tujuan:** Memandu kalibrasi instrumen sensorik, membangun kurva kalibrasi tertelusur SI, dan menyusun tabel anggaran ketidakpastian pengukuran berstandar internasional.
- **Target Pengguna:** Peneliti laboratorium rekayasa, metrologi, dan IoT sensing.
- **Kapan Digunakan:** Sebelum pengambilan data sensor dilakukan dan secara berkala selama siklus eksperimen.
- **Petunjuk Pengisian:**
  - *Spesifikasi Alat:* Nama instrumen, pabrikan, nomor seri, resolusi pembacaan, dan nomor sertifikat kalibrasi terakhir.
  - *Evaluasi Tipe A:* Tabel hasil pengukuran berulang standar acuan ($n \geq 10$) beserta rata-rata dan deviasi standar empiris.
  - *Evaluasi Tipe B:* Komponen ketidakpastian dari spesifikasi pabrikan, drift termal, dan ketidakpastian kalibrator acuan.
  - *Tabel Anggaran GUM:* Kolom memuat Sumber Ketidakpastian, Nilai $u(x_i)$, Distribusi Probabilitas (Normal, Persegi, Segitiga), Koefisien Sensitivitas $c_i$, dan Kontribusi Varians $u_i^2(y)$.
  - *Expanded Uncertainty:* Hitung $U = k \cdot u_c$ dengan $k=2$ (tingkat kepercayaan 95%).
- **Contoh Realistis:** Protokol kalibrasi sensor load-cell pengukur gaya dorong roket padat: estimasi $U = \pm 1.25$ N pada beban nominal 500 N.
- **Common Mistakes:** Mengabaikan evaluasi Tipe B dan hanya melaporkan deviasi standar data observasi sebagai total ketidakpastian pengukuran.
- **Referensi Metodologis:** JCGM 100:2008 (GUM), *Evaluation of measurement data - Guide to the expression of uncertainty in measurement*.

#### TMPL-07: Data Collection SOP & Field Sampling Sheet
- **Tujuan:** Menstandarisasi langkah pengumpulan data di lapangan atau laboratorium agar konsisten antar-operator dan meminimalkan bias lingkungan.
- **Target Pengguna:** Asisten riset, teknisi laboratorium, dan pengumpul data survei.
- **Kapan Digunakan:** Selama proses akuisisi data mentah berlangsung.
- **Petunjuk Pengisian:** Prosedur langkah-demi-langkah: Pemeriksaan instrumen pra-pengujian, Pencatatan kondisi cuaca/ambien harian, Langkah pengambilan sampel, Prosedur penyimpanan/penanganan sampel fisik, Tindakan darurat saat anomali alat terjadi, dan Lembar verifikasi tanda tangan operator.
- **Contoh Realistis:** SOP pengambilan sampel tanah dan pengukuran spektral lapangan menggunakan spektrometer portabel untuk kalibrasi citra satelit di lahan pertanian ITERA.
- **Common Mistakes:** Tidak mencatat kondisi suhu dan kelembaban ruangan yang dapat mendistorsi pembacaan sensor elektronik presisi tinggi.
- **Referensi Metodologis:** ISO/IEC 17025:2017, *General requirements for the competence of testing and calibration laboratories*.

#### TMPL-08: Dataset Documentation Card (Datasheets for Datasets)
- **Tujuan:** Mendokumentasikan riwayat hidup, komposisi, proses pengumpulan, dan batasan penggunaan dataset riset sesuai standar transparansi internasional.
- **Target Pengguna:** Pengembang dataset ilmiah, peneliti machine learning, dan manajer repositori data.
- **Kapan Digunakan:** Saat dataset selesai dikumpulkan dan dibersihkan, sebelum digunakan untuk analisis atau dirilis publik.
- **Petunjuk Pengisian:** Mengikuti 7 seksi Gebru et al.: Motivasi Pembuatan, Komposisi Data, Proses Koleksi Data, Prosedur Pre-Processing/Pembersihan, Distribusi & Format Berkas, Rekomendasi Penggunaan yang Absah & Penggunaan yang Dilarang, serta Tata Kelola Pemeliharaan Jangka Panjang.
- **Contoh Realistis:** Dataset Card untuk "ITERA-CoffeeLeaf-2026": 5.000 citra daun kopi beresolusi tinggi dengan anotasi bounding box 4 jenis penyakit tanaman, dikumpulkan di perkebunan Lampung.
- **Common Mistakes:** Menyimpan file CSV/dataset tanpa penjelasan definisi kolom (*data dictionary*), format tanggal, unit metrik, dan kriteria inklusi data.
- **Referensi Metodologis:** Gebru et al. (2021), *Datasheets for Datasets*. Communications of the ACM, 64(12), 86-92.

---

### SIKLUS 3: ANALYSIS & EVALUATION

#### TMPL-09: Experimental Run-Sheet & Forensic Lab Notebook Log
- **Tujuan:** Menyediakan catatan kronologis pelaksanaan eksperimen secara forensik yang menjamin ketertelusuran data dan mencegah manipulasi retrospektif.
- **Target Pengguna:** Mahasiswa dan peneliti yang mengeksekusi pengujian di laboratorium atau simulasi komputer.
- **Kapan Digunakan:** Diisi secara *real-time* selama eksperimen berlangsung di meja lab.
- **Petunjuk Pengisian:** Kolom memuat Run ID, Tanggal & Jam Menit Mulai-Selesai, Operator Pelaksana, Konfigurasi Parameter Perlakuan, Nilai Pembacaan Sensor Mentah, Catatan Kejadian Luar Biasa (misal: listrik padam, sensor terlepas), dan Hash Checksum (SHA-256) file data mentah yang tersimpan.
- **Contoh Realistis:** Run-sheet pengujian 16 variasi aerodinamika drone di terowongan angin (*wind tunnel*).
- **Common Mistakes:** Mencatat data di kertas buram lepas tanpa tanggal dan baru memindahkannya ke komputer beberapa minggu kemudian.
- **Referensi Metodologis:** Guidelines for Responsible Data Management in Scientific Research (ORI/HHS).

#### TMPL-10: Statistical Analysis Plan (SAP) Pre-Registration Protocol
- **Tujuan:** Mengunci seluruh rencana pengujian statistik, kriteria pembersihan data, dan penanganan data hilang sebelum analisis dilakukan guna mencegah p-hacking dan HARKing.
- **Target Pengguna:** Peneliti utama dan analis data kuantitatif.
- **Kapan Digunakan:** Setelah data terkumpul tetapi sebelum analisis statistik inferensial dijalankan.
- **Petunjuk Pengisian:**
  - *Kriteria Eksklusi:* Aturan objektif penghapusan sampel outlier (misal: $z > 3.0$ atau kegagalan instrumen).
  - *Penanganan Missing Data:* Metode imputasi yang ditetapkan di awal.
  - *Uji Hipotesis Primer & Sekunder:* Uji statistik spesifik yang akan dijalankan beserta rumus uji dan taraf $\alpha$.
  - *Koreksi Multiple Testing:* Cantumkan metode koreksi (misal: Benjamini-Hochberg FDR pada $Q = 0.05$).
  - *Signifikansi Praktis:* Tentukan ambang batas efek terkecil yang bermakna (*Smallest Effect Size of Interest* - SESOI).
- **Contoh Realistis:** Protokol SAP untuk uji perbandingan efisiensi dua kontroler motor listrik industri pada 5 skenario beban.
- **Common Mistakes:** Memilih uji statistik setelah melihat data mana yang menghasilkan nilai $p < 0.05$ (*data fishing*).
- **Referensi Metodologis:** Wasserstein & Lazar (2016), *The ASA Statement on p-Values*.

#### TMPL-11: Benchmark Evaluation & Comparative Performance Report
- **Tujuan:** Menstandarisasi laporan evaluasi komparatif algoritma/sistem komputasi terhadap metode baseline SOTA secara objektif dan adil.
- **Target Pengguna:** Peneliti AI/ML, computer vision, rekayasa perangkat lunak, dan optimasi numerik.
- **Kapan Digunakan:** Setelah eksekusi benchmark multi-algoritma selesai.
- **Petunjuk Pengisian:** Deskripsi Baseline Pembanding (spesifikasi arsitektur & parameter), Lingkungan Uji Terstandarisasi (Hardware CPU/GPU, OS, Driver), Matriks Hasil Kuantitatif per Dataset, Hasil Uji Statistik Non-Parametrik (Friedman $\chi_F^2$ dan p-value), Diagram Critical Difference (CD), dan Analisis Trade-off Efisiensi (Waktu Inferensi vs Akurasi vs Memori).
- **Contoh Realistis:** Laporan benchmark komparasi algoritma pelacakan visual objek jamak (MOT) pada 10 video benchmark benchmark MOTChallenge.
- **Common Mistakes:** Hanya membandingkan dengan baseline kuno (*weak baseline*) dan tidak menyertakan variasi random seeds dalam pelaporan metrik.
- **Referensi Metodologis:** Demšar (2006), *Statistical Comparisons of Classifiers over Multiple Data Sets*.

#### TMPL-12: Component Ablation Study Matrix & Failure Analysis Report
- **Tujuan:** Mendokumentasikan dekonstruksi modular sistem komputasi guna memvalidasi kontribusi masing-masing komponen inovasi dan mengidentifikasi batas kegagalan sistem.
- **Target Pengguna:** Peneliti yang mengembangkan arsitektur model baru dengan multi-komponen.
- **Kapan Digunakan:** Pada fase evaluasi akhir sebelum penulisan naskah publikasi.
- **Petunjuk Pengisian:**
  - *Deskripsi Modul Usulan:* Rincikan modul $M_1, M_2, \dots, M_k$ yang ditambahkan ke baseline dasar.
  - *Matriks Varian:* Tabel $2^k$ kombinasi konfigurasi (Active/Inactive) beserta skor metrik yang dihasilkan.
  - *Analisis Nilai Tambah Marjinal:* Hitung kontribusi spesifik tiap modul terhadap peningkatan performa.
  - *Failure Case Forensics:* Dokumentasikan 5 contoh kasus kegagalan terburuk dari sistem final dan jelaskan penyebab fisiknya.
- **Contoh Realistis:** Laporan studi ablasi sistem segmentasi citra medis: membedah kontribusi modul attention gate, loss focal, dan fitur augmentasi elastis.
- **Common Mistakes:** Melaporkan sistem sebagai kesatuan utuh tanpa membuktikan apakah modul tambahan benar-benar berkontribusi atau sekadar menambah kompleksitas komputasi.
- **Referensi Metodologis:** IEEE/CVPR Author Guidelines on Rigorous Empirical Evaluation.

---

### SIKLUS 4: REPORTING, REPRODUCIBILITY & PUBLICATION

#### TMPL-13: ACM/IEEE Reproducibility Checklist & Artifact Descriptor
- **Tujuan:** Memandu peneliti menyusun paket artefak komputasi yang memenuhi kriteria pengujian independen (*Artifact Evaluated - Functional and Reusable*).
- **Target Pengguna:** Seluruh peneliti yang mempublikasikan kode dan data eksperimen komputasi.
- **Kapan Digunakan:** Saat finalisasi repositori riset publik sebelum submission artikel ilmiah.
- **Petunjuk Pengisian:** Kebutuhan Perangkat Keras Minimum, Petunjuk Instalasi Dependensi Terkunci (Docker/Lockfile), Perintah Eksekusi 1-Klik (*One-Click Run Command*), Lokasi Penyimpanan Dataset Terbuka (Zenodo DOI), Pemetaan Skrip ke Tabel/Figur Paper, dan Hasil Uji Verifikasi pada Mesin Bersih.
- **Contoh Realistis:** Berkas `REPRODUCIBILITY.md` pada repositori GitHub publik penelitian estimasi sinyal telemetri IoT.
- **Common Mistakes:** Mengklaim riset reproduktif padahal kode memerlukan modifikasi path lokal secara manual atau dependensi library yang sudah usang (*broken dependencies*).
- **Referensi Metodologis:** ACM Artifact Review and Badging Guidelines v2.0 (2020).

#### TMPL-14: Scientific Manuscript Outline (IMRaD Claims-Evidence Map)
- **Tujuan:** Memandu penyusunan naskah artikel ilmiah berstruktur IMRaD dengan jaminan bahwa setiap klaim yang ditulis didukung langsung oleh data empiris.
- **Target Pengguna:** Penulis artikel jurnal internasional dan prosiding konferensi bereputasi.
- **Kapan Digunakan:** Pada fase draf penulisan sebelum penulisan teks lengkap dimulai.
- **Petunjuk Pengisian:**
  - *Title & Abstract:* Judul informatif berbasis temuan; Abstrak 5 elemen (Background, Problem, Method, Key Results, Significance).
  - *Introduction:* Terapkan 3 gerakan retoris Swales CARS (Territory, Niche, Occupation).
  - *Methods:* Rincikan desain, instrumen, dan prosedur validasi hingga dapat direplikasi pihak lain.
  - *Claims-to-Evidence Matrix:* Tabel pemetaan: Klaim Naratif $\leftrightarrow$ Nomor Tabel/Figur Pendukung $\leftrightarrow$ Nilai Statistik/Effect Size.
  - *Discussion:* Bahas keselarasan temuan dengan literatur, implikasi rekayasa, dan keterbatasan studi.
- **Contoh Realistis:** Kerangka naskah artikel IEEE Transactions on Instrumentation and Measurement untuk metode kalibrasi sensor cerdas.
- **Common Mistakes:** Mengklaim "metode ini meningkatkan akurasi secara dramatis" pada abstrak tanpa menyebutkan angka persentase peningkatan dan interval kepercayaannya.
- **Referensi Metodologis:** Day & Gastel (2012), *How to Write and Publish a Scientific Paper* (7th ed.).

#### TMPL-15: Point-by-Point Peer Review Rebuttal Matrix
- **Tujuan:** Menyediakan format terstruktur untuk menanggapi kritik reviewer jurnal secara profesional, santun, transparan, dan berbasis bukti eksperimental tambahan.
- **Target Pengguna:** Pengarang naskah yang menerima keputusan revisi (Major/Minor Revision) dari editor jurnal.
- **Kapan Digunakan:** Selama proses penyiapan berkas naskah revisi jurnal.
- **Petunjuk Pengisian:** Tabel 4 kolom: Nomor Komentar Reviewer $\to$ Kutipan Persis Komentar Asli Reviewer $\to$ Tanggapan Objektif Pengarang (*Author's Response*) $\to$ Perubahan Spesifik pada Naskah (*Changes in Manuscript* disertai nomor halaman, baris, dan kutipan teks baru).
- **Contoh Realistis:** Rebuttal matrix 15 halaman menanggapi 12 masukan kritis reviewer Elsevier Journal of Systems Architecture mengenai kelemahan analisis baseline.
- **Common Mistakes:** Menolak masukan reviewer secara defensif tanpa menyertakan data eksperimen tambahan atau berjanji mengubah teks tetapi lupa memperbaruinya di naskah.
- **Referensi Metodologis:** COPE Guidelines for Authors on Peer Review Responses.

#### TMPL-16: Strategic Multi-Year PhD Research Roadmap
- **Tujuan:** Memetakan payung penelitian doktoral 3-4 tahun ke dalam sub-proyek riset yang saling terkait dan memandu publikasi kumulatif (*thesis-by-publication*).
- **Target Pengguna:** Mahasiswa S3, calon mahasiswa doktoral, dan promotor/pembimbing disertasi.
- **Kapan Digunakan:** Pada fase pendaftaran doktoral, penyusunan proposal disertasi, dan evaluasi progres tahunan.
- **Petunjuk Pengisian:**
  - *Pohon Disertasi:* Peta dekomposisi masalah besar menjadi 3 sub-proyek independen yang koheren.
  - *Target Publikasi:* Rencana target submit 3 naskah jurnal Q1/Q2 (Tahun 1: Metodologi & Baseline, Tahun 2: Arsitektur Utama & Eksperimen, Tahun 3: Evaluasi Skala Besar & Disertasi).
  - *Milestone Semesteran:* Rincian target capaian teknis per semester (Work Breakdown Structure).
  - *Kill Criteria:* Kriteria objektif kapan suatu pendekatan eksperimen harus dihentikan jika hipotesis terfalsifikasi.
  - *Rencana Diseminasi & Open Science:* Jadwal rilis dataset terbuka dan repositori kode publik.
- **Contoh Realistis:** Peta jalan doktoral 4 tahun bidang Computer Vision: "Robust 3D Visual Perception under Adverse Weather Conditions for Autonomous Systems".
- **Common Mistakes:** Memilih topik yang terlalu luas tanpa tonggak publikasi tahunan yang realistis sehingga menumpuk seluruh publikasi di akhir masa studi.
- **Referensi Metodologis:** Mullins & Kiley (2002), *It's a PhD, not a Nobel Prize: How to write a doctoral dissertation*.

