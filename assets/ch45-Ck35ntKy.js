const a={"7.1.1":{id:"7.1.1",chapterId:"CH-45",title:"Prinsip RSE: Mengapa Skrip Riset Kriptik Sekali-Pakai Berbahaya bagi Sains",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami filosofi gerakan Research Software Engineering (RSE) global.","Menganalisis dampak negatif kode ilmiah yang tidak terstruktur terhadap krisis reproduksibilitas.","Menerapkan prinsip parsimoni kode, clean architecture, dan modularitas dalam penulisan algoritma riset."],content:`Dalam beberapa dekade terakhir, komputasi telah menjadi pilar ketiga metode ilmiah di samping teori dan eksperimen laboratorium. Namun, sebagian besar perangkat lunak yang digunakan dalam publikasi ilmiah bereputasi tinggi ditulis oleh mahasiswa pascasarjana atau peneliti tanpa pelatihan formal dalam rekayasa perangkat lunak (software engineering). Akibatnya, ekosistem sains dipenuhi oleh apa yang disebut skrip sekali-pakai kriptik ("spaghetti research scripts"): skrip Python atau MATLAB sepanjang 3.000 baris dalam satu berkas, variabel bernama a1, temp2, final_fix_v3, jalur direktori yang di-hardcode ke komputer pribadi peneliti, dan ketiadaan pengujian otomatis.

Bahaya Epistemologis Kode Kriptik:
1. Kesalahan Tersembunyi (Undetected Scientific Bugs): Studi Merali (2010) di jurnal Nature mengungkapkan bahwa sebagian besar kesalahan dalam kalkulasi ilmiah terjadi bukan karena kesalahan teori matematika, melainkan karena kesalahan indeks array, off-by-one errors, atau mutasi variabel global tersembunyi.
2. Kehilangan Keberlanjutan Laboratorium: Ketika mahasiswa yang menulis kode tersebut lulus, kode tersebut tidak dapat dijalankan oleh peneliti lain, mematikan akumulasi pengetahuan laboratorium.
3. Ketidakmampuan Audit Ilmiah: Klaim terobosan baru tidak dapat diverifikasi oleh rekan sejawat (peer reviewers) karena kode tidak dapat dieksekusi ulang secara independen.

Gerakan Research Software Engineering (RSE):
Gerakan RSE menetapkan bahwa kode ilmiah bukan sekadar catatan kasar pribadi, melainkan artefak ilmiah kelas satu (first-class research artifact) yang wajib memenuhi standar keterbacaan, keandalan, dan modularitas yang setara dengan penulisan artikel ilmiah itu sendiri.`,mathematicalFoundations:`Metrik Kompleksitas Kode Ilmiah:

1. Kompleksitas Siklomatis Thomas McCabe (Cyclomatic Complexity, $M$):
Mengukur jumlah jalur independen linier yang melintasi graf alur kendali kode:
$$M = E - N + 2P$$
di mana:
- $E$: Jumlah busur (edges) dalam graf alur kendali.
- $N$: Jumlah simpul (nodes / blok keputusan linier).
- $P$: Jumlah komponen terhubung (biasanya $P = 1$).
Kaidah RSE: Fungsi ilmiah dengan $M > 10$ dianggap memiliki risiko kesalahan logika tersembunyi yang sangat tinggi dan wajib dipecah menjadi modul-modul yang lebih kecil.

2. Kohesi dan Keterpasangan (Coupling & Cohesion):
- Coupling (Keterpasangan): Derajat ketergantungan antar modul. RSE menuntut Loose Coupling: modul pemrosesan data tidak boleh bergantung pada format visualisasi grafik.
- Cohesion (Kohesi): Derajat keterfokusan tanggung jawab suatu fungsi. RSE menuntut High Cohesion: Satu fungsi hanya melakukan tepat satu tugas matematis (Single Responsibility Principle).`,workedExample:{problemStatement:"Diberikan skrip riset analisis getaran sensor dengan kompleksitas siklomatis M = 22 yang memuat pembacaan berkas CSV, kalkulasi FFT, filtering sinyal, pencarian puncak spektrum, dan penggambaran plot Matplotlib dalam satu fungsi tunggal setebal 250 baris. Rancang dekomposisi modularitas RSE untuk mereduksi kompleksitas siklomatis menjadi M <= 4 pada setiap sub-fungsi.",stepByStepSolution:["Langkah 1: Identifikasi batas tanggung jawab domain: Terdapat 4 domain ortogonal: (1) I/O Data, (2) Pemrosesan Sinyal, (3) Analisis Statistik Puncak, (4) Presentasi Visual.","Langkah 2: Dekomposisi Modul 1 (I/O Data): Fungsi load_sensor_stream(filepath) -> pd.DataFrame. Tugas tunggal: parsing CSV dan validasi skema (M=2).","Langkah 3: Dekomposisi Modul 2 (Pemrosesan Sinyal): Fungsi compute_fft_spectrum(signal, sampling_rate) -> (freqs, power). Fungsi bandpass_filter(signal, low, high) -> signal (M=2).","Langkah 4: Dekomposisi Modul 3 (Deteksi Anomali): Fungsi identify_spectral_peaks(freqs, power, threshold) -> peak_indices (M=3).","Langkah 5: Dekomposisi Modul 4 (Visualisasi): Fungsi plot_frequency_diagnostics(freqs, power, peaks, output_path) -> None (M=2)."],resultInterpretation:"Dekomposisi modular berhasil memangkas fungsi monolitik berisiko tinggi (M=22) menjadi lima fungsi atomik terisolasi yang mudah diuji dengan unit testing mandiri."},pythonImplementation:{description:"Refactoring skrip riset kriptik monolitik menjadi modul RSE clean architecture berorientasi fungsi atomik.",libraryDependencies:["numpy"],code:`import numpy as np

# [SIMULASI/SYNTHETIC DATA]
# CONTOH KODE RSE BAKU: Memisahkan Logika Matematika dari Pengambilan Data dan Presentasi

def generate_synthetic_signal(sampling_rate: float, duration: float, freq: float) -> np.ndarray:
    """Membangkitkan sinyal uji sintetis murni."""
    t = np.linspace(0, duration, int(sampling_rate * duration), endpoint=False)
    noise = np.random.normal(0, 0.2, size=len(t))
    return np.sin(2 * np.pi * freq * t) + noise

def compute_fft_power(signal: np.ndarray, sampling_rate: float) -> tuple[np.ndarray, np.ndarray]:
    """Menghitung spektrum daya FFT satu sisi secara murni tanpa efek samping I/O."""
    n = len(signal)
    fft_vals = np.fft.rfft(signal)
    freqs = np.fft.rfftfreq(n, d=1.0 / sampling_rate)
    power_spectrum = (np.abs(fft_vals) / n)**2
    return freqs, power_spectrum

def detect_dominant_frequency(freqs: np.ndarray, power: np.ndarray) -> float:
    """Mendeteksi frekuensi dominan tertinggi."""
    peak_idx = np.argmax(power)
    return float(freqs[peak_idx])

# Pipeline Eksekusi Bersih
np.random.seed(42)
raw_signal = generate_synthetic_signal(sampling_rate=100.0, duration=2.0, freq=12.5)
frequencies, power = compute_fft_power(raw_signal, sampling_rate=100.0)
peak_f = detect_dominant_frequency(frequencies, power)

print("[SIMULASI/SYNTHETIC DATA] Eksekusi Arsitektur Modular RSE:")
print(f"Jumlah Titik Sinyal Terproses : {len(raw_signal)}")
print(f"Frekuensi Dominan Terdeteksi  : {peak_f:.2f} Hz (Eksak: 12.50 Hz)")
print("Karakteristik Kode: Bebas variabel global, fungsi murni tanpa efek samping.")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Eksekusi Arsitektur Modular RSE:
Jumlah Titik Sinyal Terproses : 200
Frekuensi Dominan Terdeteksi  : 12.50 Hz (Eksak: 12.50 Hz)
Karakteristik Kode: Bebas variabel global, fungsi murni tanpa efek samping.`},commonPitfalls:["Menyimpan seluruh alur riset dalam satu notebook Jupyter raksasa tanpa mengekstrak modul Python.","Menggunakan variabel global yang dapat dimutasi secara implisit oleh berbagai fungsi berbeda.","Menulis jalur berkas lokal absolut (seperti C:\\Users\\NamaSaya\\Desktop\\data.csv)."],validationProcedures:["Audit kode menggunakan static linter (seperti flake8, ruff, atau pylint).","Ukur kompleksitas siklomatis fungsi menggunakan pustaka radon: pastikan seluruh fungsi memiliki nilai M < 10.","Gunakan pathlib.Path untuk seluruh penanganan berkas agar portabel lintas sistem operasi (Linux, Windows, macOS)."],exercises:[{question:"Mengapa penggunaan notebook Jupyter (.ipynb) saja tanpa modul kode (.py) yang terpisah dianggap sebagai praktik berisiko tinggi untuk proyek riset jangka panjang?",hint:"Perhatikan masalah pelacakan versi Git diff dan urutan eksekusi sel (hidden state).",answerExplanation:"Notebook Jupyter rentan terhadap masalah eksekusi sel di luar urutan (out-of-order execution) yang menciptakan variabel tersembunyi (hidden states) yang tidak dapat direproduksi. Selain itu, berkas JSON notebook menghasilkan git diff yang sangat berantakan dan sulit ditinjau oleh reviewer. Praktik RSE baku adalah mengekstrak logika inti ke modul .py dan hanya menggunakan notebook untuk visualisasi pelaporan akhir."},{question:"Apa prinsip dasar dari fungsi murni (pure functions) dalam komputasi ilmiah dan mengapa hal itu krusial bagi verifikasi eksperimen?",hint:"Perhatikan hubungan antara input yang sama dengan output yang dihasilkan serta ketiadaan efek samping (side effects).",answerExplanation:"Fungsi murni adalah fungsi matematika yang selalu menghasilkan keluaran yang identik jika diberikan masukan yang sama, dan tidak memodifikasi variabel di luar cakupannya (tidak mengubah variabel global atau menulis ke disk secara implisit). Sifat deterministik ini sangat krusial agar pengujian unit (unit testing) dapat dijalankan secara terisolasi dan dapat diandalkan."}],references:[{citation:"Wilson, G., Aruliah, D. A., Brown, C. T., Chue Hong, N. P., et al. (2014). Best practices for scientific computing. PLoS Biology, 12(1), e1001745.",type:"peer-reviewed-article"},{citation:"Merali, Z. (2010). Computational science: Error, why scientific programming does not compute. Nature, 467(7317), 775-777.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Gerakan Research Software Engineering (RSE)",bulletPoints:["Kode ilmiah adalah artefak penelitian kelas satu (bukan skrip sekali-pakai).","Sebagian besar kesalahan ilmiah bersumber dari bug pemrograman, bukan teori.","Prinsip parsimoni, modularitas, dan keterbacaan kode (Clean Architecture)."],keyFormulaOrDiagram:"M = E - N + 2P \\leq 10 \\implies \\text{Ambang Batas Kompleksitas Sehat}"},{slideNumber:2,title:"Prinsip Desain Kode Ilmiah",bulletPoints:["Single Responsibility: Satu fungsi hanya melakukan satu tugas matematis.","Loose Coupling: Pisahkan pemrosesan logika data dari presentasi grafik.","Gunakan jalur relatif (pathlib) untuk portabilitas lintas sistem operasi."],keyFormulaOrDiagram:"\\text{Data Pipeline} \\perp \\text{Math Engine} \\perp \\text{Visualization UI}"}]},"7.1.2":{id:"7.1.2",chapterId:"CH-45",title:"Modularitas Kode Ilmiah: Memisahkan Logika Matematika, Data Pipeline, dan Visualisasi",readingTimeMinutes:20,status:"verified",learningObjectives:["Merancang arsitektur perangkat lunak riset modular berbasis pola Model-View-Controller teradaptasi.","Memisahkan logika matematika murni (core engine) dari manipulasi I/O dan visualisasi presentasi.","Menerapkan antarmuka API fungsional yang stabil untuk memfasilitasi interoperabilitas komputasi."],content:`Salah satu cacat struktural yang paling umum dalam kode riset pemula adalah percampuran aduk antara tiga lapisan operasional: membaca data dari sensor, melakukan pemfilteran matematika, dan memplot grafik matplotlib dalam satu blok kode yang saling terikat erat. Akibatnya, jika peneliti ingin menguji algoritma matematika pada data baru, peneliti terpaksa menyalin-tempel (copy-paste) ratusan baris kode, melipatgandakan redundansi dan risiko bug.

Arsitektur Tiga Lapisan RSE (Three-Tier Scientific Architecture):
Sistem komputasi riset profesional wajib memisahkan kode ke dalam tiga direktori modul yang independen:
1. Lapisan Data Pipeline (Ingestion & Preprocessing):
Bertanggung jawab secara eksklusif untuk parsing format berkas mentah (CSV, HDF5, Parquet, citra), menangani data hilang, dan validasi skema tipe data. Lapisan ini menghasilkan struktur data bersih terstandarisasi (misal NumPy array atau dataclass).
2. Lapisan Inti Matematika (Core Mathematical Engine):
Merupakan jantung inovasi ilmiah. Berisi fungsi-fungsi matematika murni, algoritma optimasi, atau model jaringan syaraf tiruan. Lapisan ini SAMA SEKALI TIDAK BOLEH mengimpor pustaka grafis (seperti Matplotlib atau Seaborn) dan tidak boleh menyentuh operasi I/O disk.
3. Lapisan Visualisasi & Pelaporan (Presentation & Reporting):
Menerima hasil kalkulasi matematika dan menghasilkan grafik vektor, tabel LaTeX, atau dasbor interaktif. Jika gaya visualisasi diubah dari grafik garis menjadi diagram kotak, lapisan matematika tidak terpengaruh sama sekali.`,mathematicalFoundations:`Pemisahan Dependensi Grafis (Dependency Inversion Principle):
Misalkan $\\mathcal{D}$ adalah modul I/O Data, $\\mathcal{M}$ adalah modul Inti Matematika, dan $\\mathcal{V}$ adalah modul Visualisasi.

Arah Dependensi yang Sah Secara Ilmiah:
$$\\mathcal{V} \\longrightarrow \\mathcal{M} \\longleftarrow \\mathcal{D}$$
Kedua modul pendukung (Data dan Visualisasi) bergantung pada modul matematika atau abstraksi antarmuka bersama, namun modul inti matematika $\\mathcal{M}$ sama sekali tidak bergantung pada modul lain (Zero External Side-Effect Dependencies).

Uji Kekompakan Antarmuka Fungsi Matematika:
Fungsi inti matematika diformulasikan sebagai pemetaan fungsional deterministik:
$$f_{\\text{core}}: \\mathbb{R}^n \\times \\Theta \\to \\mathbb{R}^m$$
Tanda tangan fungsi (Type Signature) wajib dideklarasikan secara eksplisit menggunakan Python Type Hints untuk mencegah kesalahan tipe run-time:
$$\\text{def solve}(\\mathbf{x}: \\text{np.ndarray}, \\; \\boldsymbol{\\theta}: \\text{Config}) \\to \\text{Result}$$`,workedExample:{problemStatement:"Sebuah fungsi monolitik analyze_and_plot_ecg(filename) membaca berkas sinyal jantung, mendeteksi puncak gelombang R, dan langsung memanggil plt.show(). Jelaskan mengapa desain ini melanggar prinsip modularitas RSE jika peneliti ingin menjalankan optimasi hyperparameter ambang deteksi pada 10.000 rekaman pasien.",stepByStepSolution:["Langkah 1: Identifikasi bottleneck eksekusi: Pemanggilan plt.show() memblokir alur komputasi (intervensi grafis manual), menghentikan eksekusi batch otomatis.","Langkah 2: Evaluasi redundansi I/O: Setiap kali hyperparameter diubah, fungsi membaca ulang berkas dari disk berulang kali (disk I/O thrashing).","Langkah 3: Pelanggaran testability: Algoritma deteksi puncak tidak dapat diuji secara otomatis dengan unit testing karena hasilnya terkunci di dalam grafik visual alih-alih mengembalikan array indeks numerik.","Langkah 4: Rekomendasi restrukturisasi: Pisahkan menjadi 3 fungsi: load_ecg_record(filename), detect_r_peaks(signal, threshold) -> indices, dan plot_ecg_annotated(signal, peaks)."],resultInterpretation:"Pemisahan modular memungkinkan fungsi deteksi puncak dievaluasi 10.000 kali dalam memori RAM murni dalam hitungan detik untuk optimasi parameter tanpa hambatan I/O dan grafik."},pythonImplementation:{description:"Implementasi struktur paket modular RSE: pemisahan I/O, matematika analitis, dan pelaporan.",libraryDependencies:["numpy","dataclasses"],code:`import numpy as np
from dataclasses import dataclass

# [SIMULASI/SYNTHETIC DATA]
# 1. LAPISAN DATA TIPE (Domain Data Contract)
@dataclass(frozen=True)
class SensorExperimentData:
    timestamps: np.ndarray
    voltages: np.ndarray
    sampling_freq: float

# 2. LAPISAN INTI MATEMATIKA (Bebas Grafis dan Bebas File I/O)
def calculate_rms_and_crest_factor(voltages: np.ndarray) -> tuple[float, float]:
    """Menghitung Root Mean Square (RMS) dan Crest Factor dari sinyal tegangan."""
    rms = np.sqrt(np.mean(voltages**2))
    peak = np.max(np.abs(voltages))
    crest_factor = peak / (rms + 1e-12)
    return float(rms), float(crest_factor)

# 3. LAPISAN PRESENTASI / PELAPORAN
def format_latex_table_row(label: str, rms: float, crest: float) -> str:
    """Mengonversi hasil komputasi matematika menjadi format baris tabel LaTeX."""
    return f"{label} & {rms:.3f} \\\\text{{ V}} & {crest:.3f} \\\\\\\\"

# Eksekusi Terintegrasi
np.random.seed(42)
t = np.linspace(0, 1, 1000)
v = 220.0 * np.sqrt(2) * np.sin(2 * np.pi * 50 * t) + np.random.normal(0, 5, size=1000)
experiment = SensorExperimentData(timestamps=t, voltages=v, sampling_freq=1000.0)

rms_val, crest_val = calculate_rms_and_crest_factor(experiment.voltages)
latex_output = format_latex_table_row("Jaringan Listrik ITERA", rms_val, crest_val)

print("[SIMULASI/SYNTHETIC DATA] Hasil Eksekusi Pemisahan Modular:")
print(f"Hasil RMS Matematis          : {rms_val:.2f} V")
print(f"Hasil Crest Factor Matematis : {crest_val:.4f}")
print(f"Format Pelaporan LaTeX       : {latex_output}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Eksekusi Pemisahan Modular:
Hasil RMS Matematis          : 220.04 V
Hasil Crest Factor Matematis : 1.4880
Format Pelaporan LaTeX       : Jaringan Listrik ITERA & 220.041 \\text{ V} & 1.488 \\\\`},commonPitfalls:["Mengimpor pustaka matplotlib di dalam modul kalkulasi algoritma inti.","Menulis fungsi yang melakukan kalkulasi matematika sekaligus mencetak hasil ke layar menggunakan print() tanpa return value.","Mengubah struktur data masukan di dalam fungsi secara mutatif (in-place modification) tanpa memberi tahu pemanggil."],validationProcedures:["Pastikan modul matematika inti dapat berjalan di lingkungan server headless (tanpa GUI/Display server).","Gunakan dataclass atau NamedTuple untuk membungkus parameter masukan dan keluaran secara terstruktur.","Verifikasi bahwa fungsi visualisasi menerima data mentah hasil kalkulasi, bukan membaca ulang dari disk."],exercises:[{question:"Mengapa modul matematika inti (Core Engine) dalam proyek riset ilmiah dilarang keras mengimpor pustaka matplotlib atau seaborn?",hint:"Perhatikan lingkungan eksekusi komputasi klaster HPC (High Performance Computing) headless.",answerExplanation:"Lingkungan komputasi klaster (HPC cluster atau cloud runner) seringkali berjalan tanpa server tampilan grafis (headless). Mengimpor modul visualisasi di dalam modul inti dapat memicu kesalahan konfigurasi display backend (seperti RuntimeError: Invalid DISPLAY variable) dan menggagalkan seluruh pekerjaan komputasi paralel yang memakan waktu lama."},{question:"Apa keuntungan penggunaan objek yang tidak dapat diubah (immutable objects seperti frozen=True pada dataclass) dalam pemodelan data eksperimen?",hint:"Perhatikan bahaya mutasi tidak disengaja terhadap data mentah selama proses analisis.",answerExplanation:"Objek yang immutable menjamin integritas data mentah eksperimen tidak akan pernah termutasi secara tidak sengaja oleh fungsi-fungsi pemrosesan perantara. Jika suatu fungsi mencoba mengubah nilai atribut, sistem secara instan melemparkan exception, mencegah terjadinya korupsi data tersembunyi."}],references:[{citation:"Martin, R. C. (2017). Clean Architecture: A Craftsman's Guide to Software Structure and Design. Prentice Hall.",type:"canonical-textbook"},{citation:"Wilson, G. et al. (2017). Good enough practices in scientific computing. PLoS Computational Biology, 13(6), e1005510.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Arsitektur Tiga Lapisan RSE",bulletPoints:["Lapisan Data: Khusus parsing I/O berkas dan validasi skema tipe.","Lapisan Inti: Logika matematika murni (bebas I/O dan bebas grafis).","Lapisan Presentasi: Pembuatan grafik visual dan tabel LaTeX."],keyFormulaOrDiagram:"\\text{Data Layer} \\longrightarrow \\text{Math Core} \\longleftarrow \\text{Visualization}"},{slideNumber:2,title:"Kekompakan Antarmuka API",bulletPoints:["Gunakan Python Type Hints secara eksplisit pada seluruh fungsi.","Gunakan dataclass untuk standarisasi struktur pertukaran data.","Dukung eksekusi headless pada klaster komputasi performa tinggi."],keyFormulaOrDiagram:"\\text{def f}(x: \\text{np.ndarray}, \\theta: \\text{Config}) \\to \\text{Result}"}]},"7.1.3":{id:"7.1.3",chapterId:"CH-45",title:"Pengujian Unit (Unit Testing) untuk Model Matematika Menggunakan pytest",readingTimeMinutes:22,status:"verified",learningObjectives:["Memahami fungsi penjaminan mutu ilmiah pengujian otomatis (Automated Unit Testing).","Merancang kasus uji batas matematis (Edge Cases, Invariants, Symmetries) menggunakan pustaka pytest.","Menerapkan pengujian berbasis properti (Property-Based Testing) dengan toleransi presisi numerik."],content:`Dalam rekayasa perangkat lunak komersial, unit testing dirancang untuk memverifikasi fungsionalitas bisnis (misal apakah keranjang belanja menghitung total harga dengan benar). Namun dalam sains komputasi, Pengujian Unit Ilmiah (Scientific Unit Testing) memiliki fungsi epistemologis yang jauh lebih sakral: membuktikan bahwa implementasi kode patuh secara eksak terhadap hukum-hukum matematika dan prinsip kekekalan fisika.

Mengapa Menguji Kode Ilmiah Sangat Menantang?
Dalam komputasi ilmiah, kita seringkali tidak mengetahui solusi sejati dari masalah riset baru (The Oracle Problem): "Jika kita tahu berapa solusi eksak dari persamaan non-linier baru tersebut, kita tidak perlu repot-repot menulis program komputasi untuk menyelesaikannya!"

Tiga Strategi Pengujian Matematika Tanpa Solusi Analitis (Oracle-Free Testing):
1. Pengujian Nilai Batas dan Solusi Trivial (Trivial Known Cases):
Meskipun solusi umum tidak diketahui, sistem selalu memiliki kasus khusus di mana solusinya diketahui secara sepele. Contoh: Untuk kode simulasi fluida Navier-Stokes yang rumit, jika viskositas dan kecepatan fluida nol, tekanan di seluruh ruang harus bernilai konstan seragam.
2. Pengujian Invarian Fisika dan Hukum Konservasi (Physical Invariants):
Meskipun dinamika partikel sangat kacau (chaotic), energi total, momentum linier, atau massa total sistem tertutup wajib kekal konstan di setiap langkah waktu numerik.
3. Pengujian Sifat Matematika Formal (Symmetry & Monotonicity):
Matriks kovarians wajib selalu simetris dan bernilai eigen non-negatif (definit positif). Jarak Euclidean $d(a, b)$ wajib memenuhi ketidaksamaan segitiga $d(a, c) \\leq d(a, b) + d(b, c)$.`,mathematicalFoundations:`Formulasi Asersi Toleransi Numerik:
Karena aritmatika floating-point IEEE 754 memiliki galat pembulatan alami, pengujian matematika tidak boleh menggunakan perbandingan eksak $a == b$. Asersi wajib menggunakan uji toleransi ganda (relatif dan absolut):
$$|a - b| \\leq \\text{atol} + \\text{rtol} \\cdot |b|$$
- atol (Absolute Tolerance): Melindungi perbandingan saat $b$ mendekati nol.
- rtol (Relative Tolerance): Menjamin toleransi persentase proporsional pada angka besar.

Standar Pengujian Properti (Property-Based Testing / Invariant Assertion):
Misalkan $T_h$ adalah operator transformasi diskritisasi numerik terhadap keadaan fisik $\\mathbf{u}_t$.
Asersi Konservasi Energi:
$$\\mathcal{H}(\\mathbf{u}) = \\frac{1}{2} m v^2 + V(x)$$
$$\\forall t, \\quad \\left| \\frac{\\mathcal{H}(\\mathbf{u}_{t+1}) - \\mathcal{H}(\\mathbf{u}_t)}{\\mathcal{H}(\\mathbf{u}_0)} \\right| < \\epsilon_{\\text{tol}}$$
Jika asersi ini gagal, integrator numerik terbukti mengalami divergensi energi atau disipasi artifisial palsu.`,workedExample:{problemStatement:"Sebuah fungsi softmax_stable(logits) menerima vektor logit x dan menghasilkan probabilitas p_i. Rancang 3 asersi unit testing matematis yang wajib dipenuhi oleh fungsi tersebut tanpa bergantung pada nilai numerik masukan acak apa pun.",stepByStepSolution:["Langkah 1: Asersi Invarian Akumulasi Probabilitas (Unit Sum Invariant): Jumlah total probabilitas di seluruh kelas wajib bernilai tepat 1.0 (dengan toleransi numerik): sum(p_i) == 1.0 (pytest.approx).","Langkah 2: Asersi Rentang Probabilitas (Range Bound): Setiap elemen probabilitas wajib berada dalam rentang probabilitas yang sah: 0.0 <= p_i <= 1.0 untuk semua i.","Langkah 3: Asersi Monotonitas Pengurutan (Monotonicity Invariant): Jika x_i > x_j pada vektor masukan logit, maka probabilitas hasil wajib memenuhi p_i > p_j.","Langkah 4: Asersi Invariansi Translasi (Shift Invariance): Menambahkan konstanta c ke seluruh elemen logit tidak boleh mengubah probabilitas keluaran: softmax(x + c) == softmax(x)."],resultInterpretation:"Keempat pengujian properti matematika ini secara komprehensif membuktikan kebenaran implementasi fungsi Softmax tanpa perlu membandingkannya dengan output acuan eksternal."},pythonImplementation:{description:"Implementasi unit test pytest untuk memvalidasi invarian fisika kekekalan massa dan stabilitas Softmax.",libraryDependencies:["numpy","pytest"],code:`import numpy as np

# [SIMULASI/SYNTHETIC DATA]
# Kode Ilmiah yang Diuji
def softmax_stable(logits: np.ndarray) -> np.ndarray:
    """Implementasi Softmax stabil numerik dengan trik pengurangan nilai maksimum."""
    shifted_logits = logits - np.max(logits, axis=-1, keepdims=True)
    exp_vals = np.exp(shifted_logits)
    return exp_vals / np.sum(exp_vals, axis=-1, keepdims=True)

# Kumpulan Uji Unit Matematika (pytest test suite)
def test_softmax_sum_to_one():
    logits = np.array([1.2, 5.5, -2.1, 0.4])
    probs = softmax_stable(logits)
    assert np.isclose(np.sum(probs), 1.0, atol=1e-7), "Jumlah probabilitas wajib 1.0"

def test_softmax_bounds():
    logits = np.array([100.0, -50.0, 0.0])
    probs = softmax_stable(logits)
    assert np.all(probs >= 0.0) and np.all(probs <= 1.0), "Probabilitas harus dalam [0, 1]"

def test_softmax_shift_invariance():
    logits = np.array([2.0, 3.0, 5.0])
    probs_orig = softmax_stable(logits)
    probs_shifted = softmax_stable(logits + 1000.0)  # Menghindari overflow
    assert np.allclose(probs_orig, probs_shifted, atol=1e-7), "Softmax wajib invarian translasi"

def test_softmax_extreme_large_inputs():
    # Menguji ketahanan terhadap overflow (angka besar)
    logits_extreme = np.array([1000.0, 1001.0, 999.0])
    probs = softmax_stable(logits_extreme)
    assert not np.isnan(probs).any(), "Tidak boleh menghasilkan NaN pada angka besar"

# Eksekusi seluruh uji
print("[SIMULASI/SYNTHETIC DATA] Menjalankan Unit Testing Matematis...")
test_softmax_sum_to_one()
test_softmax_bounds()
test_softmax_shift_invariance()
test_softmax_extreme_large_inputs()
print("Hasil: SELURUH 4 UNIT TEST MATEMATIKA LOLOS 100% SECARA VALID!")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Menjalankan Unit Testing Matematis...
Hasil: SELURUH 4 UNIT TEST MATEMATIKA LOLOS 100% SECARA VALID!`},commonPitfalls:["Menulis unit test yang menggunakan assert a == b pada bilangan riil pecahan (selalu gunakan np.isclose atau pytest.approx).","Menguji kode ilmiah hanya pada data bersih yang ideal tanpa menguji kasus batas (seperti matriks singular, array kosong, atau nilai tak terhingga).","Membiarkan unit test bergantung pada jaringan internet eksternal atau berkas lokal yang tidak disertakan dalam repositori."],validationProcedures:["Jalankan eksekusi pengujian otomatis dengan memanggil pytest tests/ pada terminal.","Ukur cakupan pengujian (Code Coverage) menggunakan pytest-cov: targetkan minimal > 85% cakupan baris pada modul matematika inti.","Sertakan pengujian regresi (Regression Tests) setiap kali bug matematika berhasil diperbaiki."],exercises:[{question:"Bagaimana cara seorang insinyur melakukan unit testing pada algoritma integrasi fisika (seperti simulasi orbit satelit) ketika solusi persamaan diferensial analitisnya tidak diketahui?",hint:"Perhatikan hukum kekekalan momentum sudut dan energi mekanik total.",answerExplanation:"Insinyur dapat menguji hukum kekekalan fisika (Invariance Testing). Pada medan gravitasi sentral, energi mekanik total (kinetik + potensial) dan momentum sudut orbital satelit wajib bernilai konstan sepanjang waktu. Unit test dapat memverifikasi bahwa deviasi relatif energi total setelah 10.000 langkah waktu berada di bawah ambang batas toleransi integrator (misal < 10^-5)."},{question:"Apa fungsi dari pengujian regresi (Regression Testing) dalam siklus hidup pengembangan perangkat lunak riset?",hint:"Kaitkan dengan pencegahan kambuhnya bug lama saat fitur baru ditambahkan.",answerExplanation:"Pengujian regresi adalah kumpulan unit test yang dirancang berdasarkan bug atau kesalahan matematika yang pernah ditemukan di masa lalu. Setiap kali ada perubahan kode atau penambahan modul baru, pengujian regresi dijalankan untuk menjamin bahwa pembaruan tersebut tidak secara tidak sengaja memicu kembali kesalahan logika lama yang sebelumnya telah diperbaiki."}],references:[{citation:"Hook, D., & Kelly, D. (2009). Testing for trustworthiness in scientific software. IEEE Software, 26(6), 26-31.",type:"peer-reviewed-article"},{citation:"Farrell, P. E., Piggott, M. D., Funke, S. W., & Gorman, G. J. (2011). Automated derivation of the adjoint of high-level transient finite element models. SISC.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Pengujian Unit Ilmiah (Scientific Testing)",bulletPoints:["Fungsi epistemologis: Bukti kepatuhan kode pada hukum fisika dan matematika.","The Oracle Problem: Menguji kode ketika solusi sejati tidak diketahui.","Tiga strategi: Kasus trivial, hukum kekekalan fisik, dan invarian aljabar."],keyFormulaOrDiagram:"\\|a - b\\| \\leq \\text{atol} + \\text{rtol} \\cdot \\|b\\|"},{slideNumber:2,title:"Pengujian Berbasis Properti Fisika",bulletPoints:["Verifikasi kekekalan massa, energi total, dan momentum.","Uji simetri dan ketidaksamaan segitiga pada fungsi jarak.","Target cakupan uji (Code Coverage) > 85% pada modul inti matematika."],keyFormulaOrDiagram:"\\left| \\frac{\\mathcal{H}(t) - \\mathcal{H}(0)}{\\mathcal{H}(0)} \\right| < \\epsilon_\\text{tol}"}]},"7.1.4":{id:"7.1.4",chapterId:"CH-45",title:"Dokumentasi Kode Otomatis dan Standar Docstrings Standar Ilmiah",readingTimeMinutes:20,status:"verified",learningObjectives:["Menerapkan format docstrings standar industri ilmiah (NumPy/SciPy format atau Google style).","Mendokumentasikan landasan teori matematika, parameter tipe, dan persamaan KaTeX langsung di dalam kode sumber.","Membangun portal dokumentasi ilmiah otomatis menggunakan Sphinx atau MkDocs."],content:`Sebuah modul perangkat lunak riset yang tidak memiliki dokumentasi adalah modul yang tidak dapat digunakan oleh komunitas ilmiah ("undocumented code is unusable code"). Peneliti lain yang tertarik menggunakan algoritma Anda tidak akan mau membaca ribuan baris implementasi batiniah hanya untuk mengetahui apa format masukan yang diharapkan dan apa batasan fisik dari fungsi tersebut.

Format Docstrings Standar Ilmiah (NumPy/SciPy Style):
Komunitas rekayasa komputasi dan sains data global telah menstandarisasi format dokumentasi menggunakan NumPy Docstring Standard. Format ini dirancang khusus untuk memenuhi kebutuhan investigasi kuantitatif, memisahkan parameter masukan, dimensi tensor, tipe data, dan catatan persamaan matematika.

Anatomi Docstring Ilmiah yang Lengkap:
1. One-line Summary: Ringkasan satu baris mengenai fungsi matematis modul.
2. Extended Description: Penjelasan substantif mekanisme algoritma dan batasan fisik asumsi.
3. Parameters: Daftar lengkap argumen masukan, tipe data, dimensi array (misal shape (N, D)), dan satuan fisik (misal Kelvin, Pascal, meter).
4. Returns: Definisi tipe data dan dimensi keluaran yang dihasilkan.
5. Notes & Mathematical References: Persamaan matematika formal (menggunakan sintaks LaTeX) dan sitasi bibliografi naskah primer asal penurunan rumus.
6. Examples: Contoh kode runnable doctest yang dapat langsung dijalankan oleh pembaca.`,mathematicalFoundations:`Struktur Standar NumPy Docstring dengan Notasi KaTeX:
Dokumentasi ilmiah memungkinkan generator otomatis (seperti Sphinx atau MkDocs dengan ekstensi mathjax) untuk merender persamaan matematika langsung dari kode sumber:

\`\`\`python
def generalized_reynolds_number(velocity: float, diameter: float, density: float, viscosity: float) -> float:
    r"""
    Menghitung Bilangan Reynolds untuk aliran fluida di dalam pipa sirkular.

    Persamaan Fisika:
    .. math::

        	ext{Re} = \frac{\rho cdot v cdot D}{mu}

    Parameters
    ----------
    velocity : float
        Kecepatan rata-rata aliran fluida [m/s]. Wajib bernilai >= 0.
    diameter : float
        Diameter internal pipa [m]. Wajib bernilai > 0.
    density : float
        Massa jenis fluida [kg/m^3]. Wajib bernilai > 0.
    viscosity : float
        Viskositas dinamik fluida [Pa.s]. Wajib bernilai > 0.

    Returns
    -------
    reynolds_num : float
        Bilangan Reynolds tanpa dimensi (dimensionless).
    """
\`\`\``,workedExample:{problemStatement:"Diberikan fungsi perhitungan koefisien gesek pipa colebrook_white(reynolds, roughness, diameter). Tuliskan seksi Parameters dan Notes dari NumPy docstring yang mendokumentasikan persamaan implisit Colebrook-White secara lengkap dengan satuan internasional.",stepByStepSolution:["Langkah 1: Tulis seksi deskripsi: Persamaan implisit Colebrook (1939) untuk menentukan faktor gesekan Darcy f pada rezim aliran turbulen transisi dan kasar.","Langkah 2: Tulis seksi persamaan matematika: 1 / sqrt(f) = -2.0 * log10((epsilon / (3.7 * D)) + (2.51 / (Re * sqrt(f)))).","Langkah 3: Tulis seksi parameter: reynolds (float, bilangan tanpa dimensi Re >= 4000); roughness (float, kekasaran mutlak permukaan pipa epsilon [m]); diameter (float, diameter hidrolik internal pipa D [m]).","Langkah 4: Tulis seksi referensi: Colebrook, C. F. (1939). Turbulent flow in pipes. Journal of the ICE, 11(4), 133-156."],resultInterpretation:"Docstring tersebut memberikan seluruh informasi fisika, satuan ukur, dan referensi literatur yang dibutuhkan oleh peneliti lain untuk memverifikasi dan menggunakan fungsi tanpa keraguan."},pythonImplementation:{description:"Implementasi fungsi ilmiah teranotasi lengkap dengan NumPy docstring dan eksekusi doctest.",libraryDependencies:["numpy"],code:`import numpy as np

def compute_kinematic_energy(mass: float, velocity: np.ndarray) -> float:
    r"""
    Menghitung energi kinetik translasi dari sebuah benda bermassa m.

    Persamaan Fisik:
    .. math::

        E_k = \\frac{1}{2} m \\sum_{i=1}^d v_i^2

    Parameters
    ----------
    mass : float
        Massa fisik benda dalam satuan kilogram [kg]. Wajib bernilai > 0.
    velocity : np.ndarray
        Vektor kecepatan benda dalam satuan meter per detik [m/s].
        Dapat berupa vektor 1D, 2D, atau 3D berdimensi (d,).

    Returns
    -------
    energy : float
        Total energi kinetik dalam satuan Joule [J].

    Raises
    ------
    ValueError
        Jika massa bernilai negatif atau nol.

    Examples
    --------
    >>> v = np.array([3.0, 4.0])  # Kecepatan resultan 5 m/s
    >>> compute_kinematic_energy(2.0, v)
    25.0
    """
    if mass <= 0.0:
        raise ValueError(f"Massa fisik harus positif, diterima: {mass}")
    
    speed_squared = np.sum(velocity**2)
    return float(0.5 * mass * speed_squared)

# Uji eksekusi dan inspeksi docstring
print("[SIMULASI/SYNTHETIC DATA] Verifikasi Dokumentasi Docstring Otomatis:")
vel = np.array([3.0, 4.0])
ek = compute_kinematic_energy(2.0, vel)
print(f"Hasil Kalkulasi Energi Kinetik : {ek:.2f} Joule")
print(f"Docstring Tersemat (First line) : {compute_kinematic_energy.__doc__.strip().splitlines()[0]}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Verifikasi Dokumentasi Docstring Otomatis:
Hasil Kalkulasi Energi Kinetik : 25.00 Joule
Docstring Tersemat (First line) : Menghitung energi kinetik translasi dari sebuah benda bermassa m.`},commonPitfalls:["Menulis docstring tanpa mencantumkan satuan fisik variabel (misal menulis sudut tanpa keterangan radian vs derajat).","Tidak mencantumkan dimensi/shape array (misal tidak menjelaskan apakah masukan berupa matriks (N, D) atau (D, N)).","Mengabaikan pembaruan docstring saat implementasi matematika fungsi diperbarui."],validationProcedures:["Gunakan perkakas pydocstyle untuk mengaudit kepatuhan format NumPy/Google docstring.","Jalankan doctest otomatis menggunakan pytest --doctest-modules untuk memastikan contoh kode di docstring selalu valid.","Bangun portal dokumentasi HTML menggunakan MkDocs Material atau Sphinx secara otomatis via CI/CD."],exercises:[{question:"Mengapa mencantumkan satuan fisik (Physical Units) pada setiap parameter di dalam docstrings ilmiah bersifat kritis bagi keselamatan rekayasa?",hint:"Ingat kembali insiden Mars Climate Orbiter NASA tahun 1999.",answerExplanation:"Insiden hilangnya wahana antariksa Mars Climate Orbiter ($125 juta) disebabkan oleh ketidakcocokan satuan: satu modul perangkat lunak menghasilkan gaya dalam satuan Imperial (Pound-force detik), sementara modul navigasi lain mengasumsikan satuan Metrik (Newton detik). Mencantumkan satuan internasional [SI] secara eksplisit pada setiap parameter docstring mencegah bencana konversi antar tim peneliti."},{question:"Apa fungsi dari modul doctest dalam ekosistem pengujian perangkat lunak ilmiah Python?",hint:"Perhatikan bagaimana potongan kode di seksi Examples dievaluasi.",answerExplanation:"Modul doctest secara otomatis memindai blok docstring, mencari seksi Examples yang diawali dengan tanda prompt >>>, mengeksekusi perintah tersebut secara riil, dan membandingkan hasilnya dengan teks yang tertulis. Jika kode fungsi berubah dan contoh menjadi usang, doctest akan melempar error, menjamin bahwa dokumentasi tidak pernah kadaluwarsa."}],references:[{citation:"NumPy Developers. (2023). NumPy Docstring Standard Guide.",type:"formal-standard"},{citation:"van Rossum, G., Warsaw, B., & Coghlan, N. (2001). PEP 257 – Docstring Conventions.",type:"formal-standard"}],slides:[{slideNumber:1,title:"Dokumentasi Kode Standar Ilmiah",bulletPoints:["Kode tanpa dokumentasi adalah kode yang tidak dapat direplikasi.","Format Standar NumPy/SciPy: Parameters, Returns, Notes, References.","Wajib menyertakan satuan fisik internasional [SI] dan dimensi tensor."],keyFormulaOrDiagram:"\\text{NumPy Docstring Standard} \\implies \\text{Parameters} + \\text{Math Equations} + \\text{Doctest}"},{slideNumber:2,title:"Integrasi Otomatisasi Sphinx & MkDocs",bulletPoints:["Konversi docstring kode menjadi situs dokumentasi web interaktif.","Render persamaan matematika KaTeX langsung dari komentar kode.","Uji keabsahan contoh kode menggunakan pytest --doctest-modules."],keyFormulaOrDiagram:"\\text{Code Docstring} \\xrightarrow{\\text{Sphinx/MkDocs}} \\text{HTML Documentation Portal}"}]}};export{a as CH45_LESSONS};
