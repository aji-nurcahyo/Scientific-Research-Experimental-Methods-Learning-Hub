# ACADEMIC BENCHMARKING REPORT
## Scientific Research & Experimental Methods Learning Hub
### Institut Teknologi Sumatera (ITERA)

> **Dokumen Status:** Dokumen Baseline Phase 0 (Reset v2.0)  
> **Klasifikasi:** Academic Planning & Methodological Benchmarking  
> **Penyusun:** Aji Pamungkas Tri Nurcahyo  
> **Tanggal:** 22 November 2026

---

## 1. TUJUAN DAN METODOLOGI BENCHMARKING

Laporan benchmarking ini disusun untuk menetapkan fondasi keilmuan yang kokoh bagi perancangan kurikulum *Scientific Research & Experimental Methods Learning Hub*. Berbeda dengan kompilasi pustaka informal, benchmarking ini melakukan komparasi analitis terhadap standar internasional, pedoman profesional, buku teks rujukan utama, literatur saintifik peer-reviewed, dan kurikulum metodologi penelitian tingkat pascasarjana di universitas teknik terkemuka dunia.

Untuk menjamin keabsahan epistemologis dan mencegah klaim sepihak, setiap rujukan diklasifikasikan ke dalam 6 kategori status bukti:
1. **Formal Standards:** Standar resmi badan standardisasi internasional (ISO, IEC, BIPM/JCGM).
2. **Professional Guidelines:** Pedoman konsensus organisasi profesi ilmiah (IEEE, ACM, COPE, EQUATOR Network).
3. **Academic Textbooks:** Buku teks foundational dengan tinjauan sejawat yang diakui secara global.
4. **Peer-Reviewed Scientific Literature:** Artikel ilmiah primer yang memperkenalkan metodologi atau terobosan analisis data.
5. **Institutional Curriculum Examples:** Silabus dan modul metodologi riset dari perguruan tinggi bereputasi.
6. **Project-Specific Curriculum Decisions:** Keputusan perancangan mandiri yang diadaptasikan khusus untuk konteks ITERA dan riset rekayasa multidisiplin.

---

## 2. KAJIAN STANDAR DAN PEDOMAN INTERNASIONAL

### A. Metrologi dan Ketidakpastian Pengukuran
- **JCGM 100:2008 (GUM 1995 with minor corrections):** *Evaluation of measurement data - Guide to the expression of uncertainty in measurement*. Joint Committee for Guides in Metrology (BIPM, IEC, IFCC, ILAC, ISO, IUPAC, IUPAP, OIML).
  - *Kontribusi Metodologis:* Menjadi landasan formal untuk evaluasi ketidakpastian Tipe A (evaluasi statistik dari rangkaian observasi) dan Tipe B (evaluasi berbasis informasi non-statistik, kalibrasi, spesifikasi pabrikan). GUM menetapkan hukum perambatan ketidakpastian (*propagation of uncertainty*) berbasis deret Taylor linier yang wajib diajarkan dalam kurikulum rekayasa.
- **ISO/IEC 17025:2017:** *General requirements for the competence of testing and calibration laboratories*. International Organization for Standardization.
  - *Kontribusi Metodologis:* Mengatur rantai ketertelusuran metrologi (*metrological traceability*), prosedur kalibrasi berkala, pengendalian data, serta penjaminan mutu hasil pengujian fisik dan komputasi.
- **NIST/SEMATECH (2012):** *e-Handbook of Statistical Methods*. National Institute of Standards and Technology.
  - *Kontribusi Metodologis:* Menyediakan protokol baku untuk karakterisasi instrumen, analisis varians komponen sistem pengukuran (Gauge R&R), deteksi drift sensor, dan visualisasi diagnostik data teknik.

### B. Integritas Riset, Etika Publikasi, dan Manajemen Data
- **Committee on Publication Ethics (COPE) Core Practices (2021):**
  - *Kontribusi Metodologis:* Standar baku dalam penanganan isu kepengarangan (*authorship disputes*), manipulasi data/citra, plagiarisme, pengajuan ganda (*redundant publication*), serta transparansi benturan kepentingan.
- **ICMJE Authorship Criteria (2023):** International Committee of Medical Journal Editors (diadopsi luas di bidang engineering dan biomedical).
  - *Kontribusi Metodologis:* Menetapkan 4 syarat mutlak hak kepengarangan untuk mengeliminasi praktik *guest authorship* dan *ghost authorship*.
- **FAIR Guiding Principles (Wilkinson et al., 2016, Scientific Data):**
  - *Kontribusi Metodologis:* Standar pengelolaan data riset modern: *Findable* (metadata persisten, DOI), *Accessible* (protokol komunikasi terbuka), *Interoperable* (format baku, kosakata terkontrol), dan *Reusable* (lisensi jelas, silsilah data terperinci).
- **ACM Artifact Review and Badging Version 2.0 (2020):** Association for Computing Machinery.
  - *Kontribusi Metodologis:* Menetapkan kriteria evaluasi artefak komputasi: *Artifacts Evaluated - Functional*, *Artifacts Evaluated - Reusable*, serta *Results Replicated*. Menjadi standar evaluasi komputasi dalam kurikulum.

---

## 3. KAJIAN BUKU TEKS RUJUKAN UTAMA (CANONICAL TEXTBOOKS)

### A. Perancangan Eksperimen dan Statistika Terapan
- **Montgomery, D. C. (2017).** *Design and Analysis of Experiments* (9th ed.). John Wiley & Sons.
  - *Kekuatan:* Cakupan terlengkap mengenai desain faktorial $2^k$, faktorial fraksional $2^{k-p}$, Response Surface Methodology (RSM), Blocking, Randomized Complete Block Design (RCBD), dan Split-Plot designs.
  - *Adopsi dalam Kurikulum:* Menjadi tulang punggung modul *Design of Experiments (DoE)* untuk tingkat sarjana tingkat lanjut dan pascasarjana.
- **Box, G. E. P., Hunter, J. S., & Hunter, W. G. (2005).** *Statistics for Experimenters: Design, Innovation, and Discovery* (2nd ed.). Wiley-Interscience.
  - *Kekuatan:* Penekanan pada proses induktif-deduktif dalam penyelidikan ilmiah, desain eksperimen adaptif, dan interpretasi fisis efek interaksi.
  - *Adopsi dalam Kurikulum:* Digunakan untuk menanamkan penalaran ilmiah (*scientific reasoning*) dan perancangan eksperimen eksploratori.
- **Cohen, J. (1988).** *Statistical Power Analysis for the Behavioral Sciences* (2nd ed.). Lawrence Erlbaum Associates.
  - *Kekuatan:* Fondasi formal mengenai relasi matematis antara $\alpha$, $\beta$ (power $1-\beta$), effect size ($d, r, \eta^2$), dan ukuran sampel ($N$).
  - *Adopsi dalam Kurikulum:* Dijadikan rujukan wajib untuk menghentikan praktik penentuan ukuran sampel secara sembarangan (*arbitrary sample size*).

### B. Analisis Data Lanjutan dan Kausalitas
- **Gelman, A., Carlin, J. B., Stern, H. S., Dunson, D. B., Vehtari, A., & Rubin, D. B. (2013).** *Bayesian Data Analysis* (3rd ed.). Chapman and Hall/CRC.
  - *Kekuatan:* Pembahasan komprehensif mengenai penetapan prior, penentuan fungsi likelihood, inferensi posterior, komputasi MCMC (Gibbs, Metropolis, NUTS), dan evaluasi kecocokan model posterior (*posterior predictive checks*).
  - *Adopsi dalam Kurikulum:* Menjadi rujukan utama kurikulum inferensi statistik Bayesian.
- **Pearl, J. (2009).** *Causality: Models, Reasoning, and Inference* (2nd ed.). Cambridge University Press.
  - *Kekuatan:* Formalisasi Structural Causal Models (SCM), Directed Acyclic Graphs (DAGs), kriteria d-separation, backdoor/frontdoor criterion, dan kalkulus intervensi (*do-calculus*).
  - *Adopsi dalam Kurikulum:* Digunakan dalam perancangan kerangka konseptual untuk mencegah confounding bias pada riset rekayasa dan kecerdasan buatan.
- **Efron, B., & Tibshirani, R. J. (1993).** *An Introduction to the Bootstrap*. Chapman and Hall/CRC.
  - *Kekuatan:* Penurunan matematis metode resampling non-parametrik, estimasi varians bootstrap, dan pembentukan interval kepercayaan BCa.
  - *Adopsi dalam Kurikulum:* Landasan modul komputasi statistika non-parametrik.

### C. Metodologi Penelitian Umum dan Komputasi
- **Creswell, J. W., & Creswell, J. D. (2018).** *Research Design: Qualitative, Quantitative, and Mixed Methods Approaches* (5th ed.). SAGE Publications.
  - *Kekuatan:* Panduan komparasi paradigma riset (post-positivisme, konstruktivisme, pragmatisme) dan struktur perumusan masalah.
  - *Adopsi dalam Kurikulum:* Landasan pengenalan paradigma ilmiah pada tingkat sarjana.
- **Saltelli, A., Ratto, M., Andres, T., Campolongo, F., Cariboni, J., Gatelli, D., Saisana, M., & Tarantola, S. (2008).** *Global Sensitivity Analysis: The Primer*. John Wiley & Sons.
  - *Kekuatan:* Formulasi dekomposisi varians indeks Sobol untuk analisis sensitivitas model simulasi numerik.
  - *Adopsi dalam Kurikulum:* Modul evaluasi sensitivitas simulasi komputasi dan teknik rekayasa.

---

## 4. KAJIAN LITERATUR PEER-REVIEWED TENTANG PRAKTIK SAINS MODERN

### A. Krisis Replikasi dan Reformasi Statistika
- **Wasserstein, R. L., & Lazar, N. A. (2016).** *The ASA Statement on p-Values: Context, Process, and Purpose*. The American Statistician, 70(2), 129-133.
  - *Pelajaran Kunci:* $p$-value bukan probabilitas kebenaran hipotesis null, dan bukan ukuran besaran efek empiris. Kurikulum wajib melarang kesimpulan biner berbasis batas arbitrer $p < 0.05$ tanpa pelaporan effect size dan confidence intervals.
- **Ioannidis, J. P. A. (2005).** *Why Most Published Research Findings Are False*. PLoS Medicine, 2(8), e124.
  - *Pelajaran Kunci:* Pengaruh *low statistical power*, fleksibilitas desain (*researcher degrees of freedom*), bias publikasi, dan implikasinya terhadap distorsi literatur ilmiah.
- **Benjamini, Y., & Hochberg, Y. (1995).** *Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing*. Journal of the Royal Statistical Society: Series B, 57(1), 289-300.
  - *Pelajaran Kunci:* Prosedur koreksi tingkat temuan palsu (FDR) yang esensial dalam era pengujian komputasi masif dan screening sensor.

### B. Metodologi Komparasi Algoritma dan Machine Learning
- **Demšar, J. (2006).** *Statistical Comparisons of Classifiers over Multiple Data Sets*. Journal of Machine Learning Research, 7, 1-30.
  - *Pelajaran Kunci:* Kesalahan umum penggunaan uji t berpasangan pada perbandingan multi-dataset; rekomendasi formal uji Friedman dan Nemenyi post-hoc serta pembuatan *Critical Difference Diagrams*.
- **Kapoor, S., & Narayanan, A. (2023).** *Leakage and the Reproducibility Crisis in Machine-Learning-Based Science*. Patterns, 4(9), 100804.
  - *Pelajaran Kunci:* Taksonomi 8 bentuk kebocoran data (*data leakage*) dalam riset terapan (kebocoran pra-pemrosesan, kebocoran sampel berulang, kebocoran temporal) yang menyebabkan klaim akurasi palsu.

---

## 5. BENCHMARKING KURIKULUM UNIVERSITAS BEREPUTASI

| Institusi | Program / Mata Kuliah Acuan | Elemen Pedagogis Unggulan | Adaptasi dalam Learning Hub ITERA |
| :--- | :--- | :--- | :--- |
| **MIT (Massachusetts Institute of Technology)** | *Experimental Design and Statistical Analysis for Engineers* | Integrasi langsung antara teori error fisik dan estimasi numerik komputasional. | Penyelarasan modul GUM Uncertainty dengan simulasi Monte Carlo Python. |
| **Stanford University** | *Scientific Computing & Reproducible Research Seminar* | Setiap temuan numerik wajib memiliki skrip verifikasi otomatis dan manifest lingkungan. | Pembuatan Research Software Engineering track dan Docker/venv reproducible bundles. |
| **TU Delft** | *Research Methodology for Engineering Design* | Pendekatan terstruktur siklus rekayasa: Problem Scoping $\rightarrow$ Lab Prototyping $\rightarrow$ Validation. | Penyelarasan siklus capstone dengan tahapan tugas akhir mahasiswa rekayasa ITERA. |
| **Oxford University** | *Doctoral Training Centre Research Foundations* | Penekanan pada dekonstruksi klaim paper, pencarian asumsi implisit, dan pembacaan kritis. | Perancangan Learning Path R1 (Critical Paper Evaluation) untuk persiapan S3. |

---

## 6. SINTESIS TEMUAN DAN KEPUTUSAN REDESAIN

Berdasarkan kajian di atas, ditetapkan 5 perubahan mendasar terhadap arsitektur kurikulum Learning Hub:

1. **Dekoupling Kurikulum dari Angka 28/17 Arbitrer:**
   Kurikulum tidak lagi dipaksakan memuat tepat 28 chapter atau 17 modul lanjutan. Jumlah level, section, chapter, dan lesson diturunkan langsung dari pemenuhan *Research Competency Framework*.
2. **Penyatuan Metrologi dan Pengukuran ke Jalur Inti:**
   Ketidakpastian pengukuran (GUM), kalibrasi instrumen, dan penanganan drift tidak boleh diisolasi hanya pada spesialisasi sempit. Peneliti rekayasa wajib memahami dasar pengukuran sebelum menyentuh data.
3. **Penegasan Wajib Koreksi Pengujian Jamak (Multiple Testing):**
   Memasukkan prosedur False Discovery Rate (FDR) dan Family-Wise Error Rate (FWER) sebagai standar inti pada inferensi statistik untuk membasmi budaya p-hacking.
4. **Research Software Engineering (RSE) sebagai Kompetensi Wajib:**
   Reproduksibilitas komputasi bukan sekadar etika tambahan, melainkan keterampilan teknis: isolasi environment, determinisme pseudo-random, dan pencatatan provenance.
5. **Pemisahan Tegas antara Jalur Kurikulum dan Learning Paths:**
   Kurikulum Master menyediakan seluruh materi secara sistematis. Learning Paths memetakan jalur lintas-chapter sesuai tujuan spesifik pembelajar tanpa menduplikasi isi.

