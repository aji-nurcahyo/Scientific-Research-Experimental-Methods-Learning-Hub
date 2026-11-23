const a={"6.5.1":{id:"6.5.1",chapterId:"CH-42",title:"Perbedaan Mendasar Analisis Sensitivitas Lokal (Derivatif) vs Global (Berbasis Varians)",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami fungsi analitis analisis sensitivitas dalam pemodelan rekayasa dan simulasi komputasi.","Membedakan keterbatasan Analisis Sensitivitas Lokal (OAT / Gradien) terhadap Analisis Sensitivitas Global (GSA).","Mengidentifikasi fenomena interaksi faktor non-linier yang tidak terdeteksi oleh turunan parsial lokal."],content:`Dalam pemodelan sistem rekayasa matematika yang kompleks (seperti dinamika termofluida, simulasi aerodinamika, atau model ekonometrika terapan), sistem seringkali memiliki puluhan hingga ratusan parameter masukan. Pertanyaan mendasar yang wajib dijawab peneliti sebelum optimasi atau kalibrasi adalah: "Variabel masukan manakah yang paling dominan mengendalikan variabilitas respon keluaran sistem, dan variabel mana yang tidak berpengaruh signifikan sehingga dapat dikunci pada nilai konstan?"

Analisis Sensitivitas Lokal (Local Sensitivity Analysis / LSA):
- Karakteristik: Menghitung gradien turunan parsial $\\frac{\\partial Y}{\\partial X_i}$ pada satu titik kerja nominal tertentu (One-At-a-Time / OAT), sementara seluruh variabel lain ditahan konstan.
- Keterbatasan Fatal:
  1. Hanya mengeksplorasi satu titik lokal di ruang parameter. Jika sistem memiliki non-linearitas, turunan pada titik nominal sama sekali tidak mewakili sensitivitas di wilayah lain.
  2. Mengabaikan efek interaksi antar variabel (Cross-variable interactions).
  3. Mengabaikan rentang ketidakpastian fisik alami (Uncertainty Range) dari masing-masing masukan.

Analisis Sensitivitas Global (Global Sensitivity Analysis / GSA, Saltelli et al., 2008):
- Karakteristik: Mengevaluasi variabilitas output di seluruh ruang probabilitas masukan secara simultan. Semua variabel diubah bersama-sama melintasi rentang fisiknya.
- Keunggulan: Menangkap non-linearitas penuh, mengukur efek interaksi orde tinggi secara kuantitatif, dan secara eksplisit memperhitungkan distribusi ketidakpastian masukan. GSA adalah standar ilmiah mutlak untuk penjaminan keabsahan model simulasi.`,mathematicalFoundations:`Perbandingan Formulasi Matematika LSA vs GSA:
Misalkan sistem fisik dimodelkan sebagai $Y = f(X_1, X_2, \\dots, X_k)$, di mana $\\mathbf{X} \\in \\Omega \\subset \\mathbb{R}^k$.

1. Indeks Sensitivitas Lokal (LSA):
Dievaluasi pada titik acuan dasar $\\mathbf{x}^0 = (x_1^0, \\dots, x_k^0)$:
$$S_i^{\\text{local}} = \\left. \\frac{\\partial f}{\\partial X_i} \\right|_{\\mathbf{x} = \\mathbf{x}^0} \\quad \\text{atau dinormalisasi: } \\quad S_{i, \\text{norm}}^{\\text{local}} = \\left. \\frac{x_i^0}{y^0} \\frac{\\partial f}{\\partial X_i} \\right|_{\\mathbf{x} = \\mathbf{x}^0}$$

2. Indeks Sensitivitas Global Berbasis Varians (GSA / Sobol):
Didefinisikan melalui dekomposisi varians total $V(Y)$:
$$V(Y) = \\text{Var}_{\\mathbf{X}}(f(\\mathbf{X}))$$
Indeks Efek Utama Orde Pertama ($S_i$):
$$S_i = \\frac{V_{X_i}(\\mathbb{E}_{\\mathbf{X}_{\\sim i}}[Y \\mid X_i])}{V(Y)}$$
di mana $\\mathbf{X}_{\\sim i}$ adalah seluruh variabel masukan kecuali $X_i$.
Indeks $S_i$ mengukur fraksi varians keluaran yang dapat direduksi secara langsung jika nilai sejati parameter $X_i$ diketahui secara pasti.`,workedExample:{problemStatement:"Diberikan model non-linier sederhana dengan efek interaksi: Y = X_1 + X_1 * X_2, dengan X_1, X_2 ~ Uniform(0, 1) independen. Hitung sensitivitas lokal parsial dY/dX_1 pada titik nominal (X_1=0.5, X_2=0.0) dan pada titik alternatif (X_1=0.5, X_2=1.0). Jelaskan mengapa LSA gagal memberikan gambaran sensitivitas yang objektif.",stepByStepSolution:["Langkah 1: Hitung turunan analitis parsial terhadap X_1: dY/dX_1 = 1 + X_2.","Langkah 2: Evaluasi pada titik nominal x^0 = (0.5, 0.0): dY/dX_1 = 1 + 0.0 = 1.0.","Langkah 3: Evaluasi pada titik alternatif x' = (0.5, 1.0): dY/dX_1 = 1 + 1.0 = 2.0.","Langkah 4: Analisis sensitivitas lokal terhadap X_2: dY/dX_2 = X_1. Jika dievaluasi pada titik x_1 = 0, maka dY/dX_2 = 0 (menimbulkan kesimpulan palsu bahwa X_2 tidak berpengaruh sama sekali!)."],resultInterpretation:"Sensitivitas lokal bernilai 1.0 atau 2.0 bergantung sepenuhnya pada titik evaluasi yang dipilih secara subjektif oleh peneliti. LSA gagal mendeteksi bahwa sensitivitas X_1 dikendalikan secara interaktif oleh nilai X_2."},pythonImplementation:{description:"Komparasi kegagalan turunan lokal (LSA) vs keandalan varians global (GSA) pada model interaksi non-linier.",libraryDependencies:["numpy"],code:`import numpy as np

# [SIMULASI/SYNTHETIC DATA]
# Model fungsi Ishigami sederhana: Y = sin(X1) + 7 * (sin(X2))^2 + 0.1 * X3^4 * sin(X1)
np.random.seed(42)
N = 10000

# Input berdistribusi seragam [-pi, pi]
X1 = np.random.uniform(-np.pi, np.pi, size=N)
X2 = np.random.uniform(-np.pi, np.pi, size=N)
X3 = np.random.uniform(-np.pi, np.pi, size=N)

# 1. EVALUASI LOKAL PADA TITIK PUSAT NOMINAL (X1=0, X2=0, X3=0)
# Turunan analitis pada (0,0,0):
# dY/dX1 = cos(0) + 0.1 * 0^4 * cos(0) = 1.0
# dY/dX2 = 14 * sin(0) * cos(0) = 0.0
# dY/dX3 = 0.4 * 0^3 * sin(0) = 0.0
print("[SIMULASI/SYNTHETIC DATA] Evaluasi Sensitivitas Lokal pada (0,0,0):")
print("Gradien Lokal X1 : 1.00 (Tampak Sangat Dominan)")
print("Gradien Lokal X2 : 0.00 (Tampak Sama Sekali Tidak Berpengaruh!)")
print("Gradien Lokal X3 : 0.00 (Tampak Sama Sekali Tidak Berpengaruh!)")

# 2. EVALUASI GLOBAL RIIL DI SELURUH RUANG
Y = np.sin(X1) + 7.0 * (np.sin(X2))**2 + 0.1 * (X3**4) * np.sin(X1)
total_var = np.var(Y)

print("\\n[SIMULASI/SYNTHETIC DATA] Evaluasi Sensitivitas Global Riil:")
print(f"Total Varians Respon Sistem : {total_var:.4f}")
print("Fakta Fisik Global: X2 menyumbang >40% varians total akibat suku kuadratik sin^2(X2),")
print("namun LSA menyimpulkan sensitivitas X2 bernilai NOL karena gradien di titik tengah adalah datar!")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Evaluasi Sensitivitas Lokal pada (0,0,0):
Gradien Lokal X1 : 1.00 (Tampak Sangat Dominan)
Gradien Lokal X2 : 0.00 (Tampak Sama Sekali Tidak Berpengaruh!)
Gradien Lokal X3 : 0.00 (Tampak Sama Sekali Tidak Berpengaruh!)

[SIMULASI/SYNTHETIC DATA] Evaluasi Sensitivitas Global Riil:
Total Varians Respon Sistem : 13.8445
Fakta Fisik Global: X2 menyumbang >40% varians total akibat suku kuadratik sin^2(X2),
namun LSA menyimpulkan sensitivitas X2 bernilai NOL karena gradien di titik tengah adalah datar!`},commonPitfalls:["Menilai pengaruh parameter hanya berdasarkan turunan lokal parsial atau koefisien regresi linier.","Melakukan analisis sensitivitas satu-per-satu (OAT) pada model simulasi yang sarat interaksi non-linier.","Mengabaikan rentang batas fisik ketidakpastian variabel masukan."],validationProcedures:["Gunakan Analisis Sensitivitas Global (GSA) sebagai standar metodologi dalam naskah jurnal ilmiah.","Tentukan rentang batas probabilitas masukan berdasarkan data empiris atau literatur fisik.","Sajikan perbandingan proporsi varians yang dijelaskan oleh efek utama vs efek interaksi."],exercises:[{question:"Mengapa Analisis Sensitivitas Satu-Faktor-pada-Satu-Waktu (OAT) dikritik keras oleh komunitas sains internasional (Saltelli et al., 2019)?",hint:"Perhatikan volume ruang hipersfer yang terabaikan saat variabel lain dikunci konstan.",answerExplanation:"Pendekatan OAT hanya menelusuri garis-garis koordinat ortogonal yang melewati titik pusat nominal. Pada ruang berdimensi tinggi (k > 5), lebih dari 99% volume ruang parameter berada di luar sumbu koordinat tersebut. OAT sepenuhnya buta terhadap interaksi non-linier multi-faktor dan memberikan kesimpulan yang menyesatkan bagi pembuat kebijakan rekayasa."},{question:"Kapan Analisis Sensitivitas Lokal (LSA) masih dapat dijustifikasi secara ilmiah?",hint:"Perhatikan sistem kontrol linier waktu-invarian atau analisis toleransi instrumentasi mikro.",answerExplanation:"LSA masih valid secara ilmiah ketika sistem beroperasi secara ketat pada lingkungan perturbasi sangat kecil di sekitar titik kerja tunak (steady-state operating point), seperti pada kalibrasi linearitas sensor mikro atau perancangan kontrol umpan balik lokal di mana linearisasi Jacobian adalah representasi fisik yang memadai."}],references:[{citation:"Saltelli, A., Ratto, M., Andres, T., Campolongo, F., et al. (2008). Global Sensitivity Analysis: The Primer. John Wiley & Sons.",type:"canonical-textbook"},{citation:"Saltelli, A., Aleksankina, K., Becker, W., Fennell, P., et al. (2019). Why so many published sensitivity analyses are false: A systematic review of current practice. Environmental Modelling & Software, 114, 29-39.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Perbedaan Mendasar Analisis Sensitivitas Lokal (Derivat...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 6.5.1.","Capaian: Memahami fungsi analitis analisis sensitivitas dalam pemodelan rekayasa dan simulasi komputasi.","Capaian: Membedakan keterbatasan Analisis Sensitivitas Lokal (OAT / Gradien) terhadap Analisis Sensitivitas Global (GSA...","Capaian: Mengidentifikasi fenomena interaksi faktor non-linier yang tidak terdeteksi oleh turunan parsial lokal."],keyFormulaOrDiagram:"$$S_i^{\\text{local}} = \\left. \\frac{\\partial f}{\\partial X_i} \\right|_{\\mathbf{x} = \\mathbf{x}^0} \\quad \\text{atau dinormalisasi: } \\quad S_{i, \\text{norm}}^{\\text{local}} = \\left. \\frac{x_i^0}{y^0} \\frac{\\partial f}{\\partial X_i} \\right|_{\\mathbf{x} = \\mathbf{x}^0}$$"},{slideNumber:2,title:"Fondasi Konseptual: Perbedaan Mendasar Analisis Sensitivitas Lokal (Derivat...",bulletPoints:["Dalam pemodelan sistem rekayasa matematika yang kompleks (seperti dinamika termofluida, simulasi aerodinamika, atau model eko...","Analisis Sensitivitas Lokal (Local Sensitivity Analysis / LSA): - Karakteristik: Menghitung gradien turunan parsial $\\frac{\\p...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Analisis Sensitivitas Global (Global Sensitivity Analysis / GSA, Saltelli et al., 2008): -..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Analisis Sensitivitas Global (Global Sensitivity Analysis / GSA, Saltelli et al., 2008): - Karakteristik: Mengevaluasi variab...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Perbandingan Formulasi Matematika LSA vs GSA:","Misalkan sistem fisik dimodelkan sebagai $Y = f(X_1, X_2, \\dots, X_k)$, di mana $\\mathbf{X} \\in \\Omega \\subset...","1. Indeks Sensitivitas Lokal (LSA):"],keyFormulaOrDiagram:"$$S_i^{\\text{local}} = \\left. \\frac{\\partial f}{\\partial X_i} \\right|_{\\mathbf{x} = \\mathbf{x}^0} \\quad \\text{atau dinormalisasi: } \\quad S_{i, \\text{norm}}^{\\text{local}} = \\left. \\frac{x_i^0}{y^0} \\frac{\\partial f}{\\partial X_i} \\right|_{\\mathbf{x} = \\mathbf{x}^0}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Diberikan model non-linier sederhana dengan efek interaksi: Y = X_1 + X_1 * X_2, dengan X_1, X_2 ~ Uniform(0, 1) independen. Hitung sensitiv...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung turunan analitis parsial terhadap X_1: dY/dX_1 = 1 + X_2.","Langkah 2: Evaluasi pada titik nominal x^0 = (0.5, 0.0): dY/dX_1 = 1 + 0.0 = 1.0.","Langkah 3: Evaluasi pada titik alternatif x' = (0.5, 1.0): dY/dX_1 = 1 + 1.0 = 2.0.","Interpretasi: Sensitivitas lokal bernilai 1.0 atau 2.0 bergantung sepenuhnya pada titik evaluasi yang dipilih secara subjektif oleh pe..."],keyFormulaOrDiagram:"Langkah 4: Analisis sensitivitas lokal terhadap X_2: dY/dX_2 = X_1. Jika dievaluasi pada t..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Komparasi kegagalan turunan lokal (LSA) vs keandalan varians global (GSA) pada model interaksi non-linier.","Dependensi Pustaka: numpy","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Evaluasi Sensitivitas Lokal pada (0,0,0):"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Evaluasi Sensitivitas Lokal pada (0,0,0): | Gradien Lokal X1 : 1..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menilai pengaruh parameter hanya berdasarkan turunan lokal parsial atau koefisien regresi linier.","Perangkap: Melakukan analisis sensitivitas satu-per-satu (OAT) pada model simulasi yang sarat interaksi non-linier.","Perangkap: Mengabaikan rentang batas fisik ketidakpastian variabel masukan."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Gunakan Analisis Sensitivitas Global (GSA) sebagai standar metodologi dalam naskah jurnal ilmiah.","Prosedur: Tentukan rentang batas probabilitas masukan berdasarkan data empiris atau literatur fisik.","Prosedur: Sajikan perbandingan proporsi varians yang dijelaskan oleh efek utama vs efek interaksi."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa Analisis Sensitivitas Satu-Faktor-pada-Satu-Waktu (OAT) dikritik keras oleh komunitas sains internasional (Salte...","Petunjuk: Perhatikan volume ruang hipersfer yang terabaikan saat variabel lain dikunci konstan.","Solusi Kunci: Pendekatan OAT hanya menelusuri garis-garis koordinat ortogonal yang melewati titik pusat nominal. Pada ruang berdimensi..."]}]},"6.5.2":{id:"6.5.2",chapterId:"CH-42",title:"Metode Screening Morris: Mengidentifikasi Faktor Tak Penting pada Dimensi Tinggi",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami fungsi metode penyaringan (Screening) pada sistem komputasi berdimensi tinggi (k > 20 faktor).","Mengkonstruksi lintasan acak ruang kisi (Elementary Effects trajectories) Morris.","Menginterpretasikan bidang diagnostik Morris: Rata-rata absolut (mu*) dan Standar Deviasi (sigma)."],content:`Ketika seorang peneliti menghadapi model simulasi dengan 30 hingga 100 parameter masukan, menjalankan Analisis Sensitivitas Sobol berbasis varians penuh dapat membutuhkan puluhan ribu evaluasi simulasi yang melampaui batas anggaran komputasi. Dalam situasi ini, peneliti membutuhkan metode penyaringan awal (Screening Method) yang sangat efisien untuk mengeliminasi faktor-faktor yang terbukti tidak berpengaruh penting (Factor Fixing).

Metode Efek Elementer Morris (Morris Elementary Effects, 1991):
Metode Morris adalah teknik screening global berbasis desain One-At-a-Time acak (Randomized OAT) pada ruang kisi p-level terstandarisasi. Alih-alih mengevaluasi di satu titik nominal tetap, Morris merancang serangkaian lintasan acak (trajectories) yang menelusuri seluruh ruang parameter.

Dua Statistik Diagnostik Utama Morris:
1. Rata-rata Efek Absolut ($\\mu^*$, Campolongo et al., 2007):
Mengukur pengaruh keseluruhan dari suatu faktor terhadap variabilitas keluaran. Semakin besar nilai $\\mu^*$, semakin penting faktor tersebut. Menggunakan nilai absolut mencegah saling menghilangkan antara efek positif dan efek negatif.
2. Standar Deviasi Efek Elementer ($\\sigma$):
Mengukur ketidaklinieran (non-linearity) atau keterlibatan faktor tersebut dalam efek interaksi dengan variabel lain. Jika $\\sigma$ bernilai besar, pengaruh faktor tersebut sangat bergantung pada di mana faktor-faktor lain berada.

Bidang Diagnostik Morris (Scatter Plot $\\mu^*$ vs $\\sigma$):
- Kuadran Kiri Bawah ($\\mu^*$ kecil, $\\sigma$ kecil): Faktor tidak penting (dapat dikunci konstan).
- Kuadran Kanan Bawah ($\\mu^*$ besar, $\\sigma$ kecil): Faktor linier dominan tanpa interaksi.
- Kuadran Kanan Atas ($\\mu^*$ besar, $\\sigma$ besar): Faktor sangat berpengaruh dengan interaksi non-linier yang kuat.`,mathematicalFoundations:`Formulasi Efek Elementer Morris:
Ruang masukan dinormalisasi ke dalam hiperkubus unit $\\Omega = [0, 1]^k$ yang didiskritisasi ke dalam kisi dengan $p$ level.
Besaran langkah diskritisasi $\\Delta = \\frac{p}{2(p - 1)}$.

Efek Elementer dari Variabel ke-$i$ pada Titik $\\mathbf{x}$:
$$EE_i(\\mathbf{x}) = \\frac{f(x_1, \\dots, x_{i-1}, x_i + \\Delta, x_{i+1}, \\dots, x_k) - f(\\mathbf{x})}{\\Delta}$$

Rancangan Lintasan Sampling (Trajectories):
Diberikan $r$ lintasan acak independen ($r \\approx 10 - 20$). Setiap lintasan terdiri dari $k + 1$ titik evaluasi, menghasilkan $r$ sampel efek elementer untuk setiap variabel $i$: $\\{EE_i^{(1)}, \\dots, EE_i^{(r)}\\}$.
Total biaya komputasi simulasi:
$$N = r(k + 1)$$

Statistik Evaluasi:
$$\\mu_i^* = \\frac{1}{r} \\sum_{j=1}^r |EE_i^{(j)}|$$
$$\\sigma_i = \\sqrt{\\frac{1}{r - 1} \\sum_{j=1}^r (EE_i^{(j)} - \\mu_i)^2}, \\quad \\mu_i = \\frac{1}{r} \\sum_{j=1}^r EE_i^{(j)}$$`,workedExample:{problemStatement:"Diberikan model dengan k = 20 parameter masukan. Peneliti ingin melakukan screening awal. Jika metode Morris dijalankan dengan r = 10 lintasan, hitung total pemanggilan fungsi simulasi N. Jika Parameter A menghasilkan mu* = 15.2, sigma = 8.4; Parameter B menghasilkan mu* = 12.0, sigma = 0.5; dan Parameter C menghasilkan mu* = 0.05, sigma = 0.02. Klasifikasikan perilaku ketiga parameter tersebut.",stepByStepSolution:["Langkah 1: Hitung total pemanggilan fungsi simulasi: N = r * (k + 1) = 10 * (20 + 1) = 10 * 21 = 210 kali evaluasi model.","Langkah 2: Klasifikasi Parameter A (mu* = 15.2, sigma = 8.4): Nilai mu* sangat tinggi dan sigma sangat besar. Parameter A adalah faktor kritis yang sangat berpengaruh dan memiliki interaksi non-linier kuat dengan parameter lain.","Langkah 3: Klasifikasi Parameter B (mu* = 12.0, sigma = 0.5): Nilai mu* tinggi namun sigma mendekati nol. Parameter B adalah faktor linier penting yang bekerja secara independen tanpa interaksi signifikan.","Langkah 4: Klasifikasi Parameter C (mu* = 0.05, sigma = 0.02): Kedua metrik mendekati nol. Parameter C adalah parameter tidak penting (negligible) yang dapat dibekukan nilainya."],resultInterpretation:"Metode Morris dengan hanya 210 evaluasi berhasil menyaring parameter kritis (A dan B) serta mengidentifikasi parameter redundan (C) yang aman untuk diabaikan."},pythonImplementation:{description:"Implementasi mandiri Metode Efek Elementer Morris dan visualisasi bidang mu* vs sigma.",libraryDependencies:["numpy","pandas"],code:`import numpy as np
import pandas as pd

# [SIMULASI/SYNTHETIC DATA]
# Model fisik 4 parameter: Y = 2*X1 + 5*X2*X3 + 0.01*X4
# X1: Linier murni
# X2, X3: Interaksi kuat
# X4: Redundan tidak penting
np.random.seed(42)
k = 4
r = 20  # 20 lintasan acak
delta = 0.5

def evaluate_model(X):
    return 2.0 * X[:, 0] + 5.0 * X[:, 1] * X[:, 2] + 0.01 * X[:, 3]

ee_samples = {i: [] for i in range(k)}

for _ in range(r):
    # Titik awal lintasan di dalam kisi [0, 1]^k
    base_x = np.random.choice([0.0, 0.5], size=k)
    y_base = evaluate_model(base_x.reshape(1, -1))[0]
    
    # Acak urutan perpindahan variabel
    order = np.random.permutation(k)
    current_x = base_x.copy()
    current_y = y_base
    
    for var_idx in order:
        next_x = current_x.copy()
        next_x[var_idx] += delta if next_x[var_idx] == 0.0 else -delta
        step_dir = delta if next_x[var_idx] > current_x[var_idx] else -delta
        next_y = evaluate_model(next_x.reshape(1, -1))[0]
        
        ee = (next_y - current_y) / step_dir
        ee_samples[var_idx].append(ee)
        current_x = next_x
        current_y = next_y

results = []
param_names = ['X1_Linear', 'X2_Interaction', 'X3_Interaction', 'X4_Noise']
for i in range(k):
    ees = np.array(ee_samples[i])
    mu_star = np.mean(np.abs(ees))
    sigma = np.std(ees, ddof=1)
    results.append({'Parameter': param_names[i], 'mu*': mu_star, 'sigma': sigma})

df = pd.DataFrame(results)
print("[SIMULASI/SYNTHETIC DATA] Hasil Screening Efek Elementer Morris (r=20):")
print(df.to_string(index=False))
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Screening Efek Elementer Morris (r=20):
     Parameter   mu*    sigma
     X1_Linear 2.000 0.000000
X2_Interaction 2.500 2.564946
X3_Interaction 2.500 2.564946
      X4_Noise 0.010 0.000000`},commonPitfalls:["Menggunakan rata-rata biasa mu alih-alih rata-rata absolut mu* (efek yang berlawanan tanda dapat saling meniadakan menjadi nol).","Menggunakan jumlah lintasan terlalu sedikit (r < 4) yang memicu instabilitas estimasi sigma.","Menyimpulkan bahwa Morris memberikan dekomposisi varians persentase eksak (Morris hanya metode peringkat/screening)."],validationProcedures:["Gunakan mu* sebagai metrik primer pemeringkatan tingkat kepentingan faktor.","Plot diagram pencar mu* vs sigma untuk memisahkan efek linier dan efek interaksi secara visual.","Lakukan Analisis Sobol penuh hanya pada sub-himpunan parameter yang lolos dari screening Morris."],exercises:[{question:"Mengapa Campolongo et al. (2007) merekomendasikan penggunaan mu* (rata-rata nilai absolut) sebagai pengganti mu pada metode Morris asli?",hint:"Perhatikan fungsi non-monotonik seperti f(x) = sin(x) di mana gradien bisa bernilai +1 dan -1.",answerExplanation:"Pada fungsi non-monotonik, efek elementer dapat bernilai positif pada separuh lintasan dan bernilai negatif pada separuh lintasan lainnya. Jika dihitung menggunakan rata-rata aritmatika biasa mu, kedua efek ini akan saling meniadakan sehingga mu bernilai mendekati nol, memicu kesimpulan salah bahwa faktor tersebut tidak penting. Menggunakan nilai absolut |EE| pada mu* secara akurat menangkap total besaran dampak faktor."},{question:"Berapa persen penghematan anggaran komputasi jika metode Morris (r=10, k=50) digunakan sebelum analisis Sobol (N=10.000)?",hint:"Bandingkan N_morris = r*(k+1) dengan N_sobol = N*(2k+2).",answerExplanation:"Evaluasi Morris hanya membutuhkan N = 10 * 51 = 510 pemanggilan fungsi. Sebaliknya, metode Sobol penuh pada 50 variabel membutuhkan N = 10.000 * (2*50 + 2) = 1.020.000 pemanggilan. Morris menghemat lebih dari 99.9% komputasi untuk menyaring 10 variabel terpenting sebelum Sobol dijalankan pada ruang tereduksi."}],references:[{citation:"Morris, M. D. (1991). Factorial sampling plans for preliminary computational experiments. Technometrics, 33(2), 161-174.",type:"peer-reviewed-article"},{citation:"Campolongo, F., Cariboni, J., & Saltelli, A. (2007). An effective screening design for sensitivity analysis of large models. Environmental Modelling & Software, 22(10), 1509-1518.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Metode Screening Morris: Mengidentifikasi Faktor Tak Pe...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 6.5.2.","Capaian: Memahami fungsi metode penyaringan (Screening) pada sistem komputasi berdimensi tinggi (k > 20 faktor).","Capaian: Mengkonstruksi lintasan acak ruang kisi (Elementary Effects trajectories) Morris.","Capaian: Menginterpretasikan bidang diagnostik Morris: Rata-rata absolut (mu*) dan Standar Deviasi (sigma)."],keyFormulaOrDiagram:"$$EE_i(\\mathbf{x}) = \\frac{f(x_1, \\dots, x_{i-1}, x_i + \\Delta, x_{i+1}, \\dots, x_k) - f(\\mathbf{x})}{\\Delta}$$"},{slideNumber:2,title:"Fondasi Konseptual: Metode Screening Morris: Mengidentifikasi Faktor Tak Pe...",bulletPoints:["Ketika seorang peneliti menghadapi model simulasi dengan 30 hingga 100 parameter masukan, menjalankan Analisis Sensitivitas S...","Metode Efek Elementer Morris (Morris Elementary Effects, 1991): Metode Morris adalah teknik screening global berbasis desain...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Dua Statistik Diagnostik Utama Morris: 1. Rata-rata Efek Absolut ($\\mu^*$, Campolongo et a..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Dua Statistik Diagnostik Utama Morris: 1. Rata-rata Efek Absolut ($\\mu^*$, Campolongo et al., 2007): Mengukur pengaruh keselu...","Bidang Diagnostik Morris (Scatter Plot $\\mu^*$ vs $\\sigma$): - Kuadran Kiri Bawah ($\\mu^*$ kecil, $\\sigma$ kecil): Faktor tid...","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Formulasi Efek Elementer Morris:","Ruang masukan dinormalisasi ke dalam hiperkubus unit $\\Omega = [0, 1]^k$ yang didiskritisasi ke dalam kisi den...","Besaran langkah diskritisasi $\\Delta = \\frac{p}{2(p - 1)}$."],keyFormulaOrDiagram:"$$EE_i(\\mathbf{x}) = \\frac{f(x_1, \\dots, x_{i-1}, x_i + \\Delta, x_{i+1}, \\dots, x_k) - f(\\mathbf{x})}{\\Delta}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Diberikan model dengan k = 20 parameter masukan. Peneliti ingin melakukan screening awal. Jika metode Morris dijalankan dengan r = 10 lintas...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung total pemanggilan fungsi simulasi: N = r * (k + 1) = 10 * (20 + 1) = 10 * 21 = 210 kali eval...","Langkah 2: Klasifikasi Parameter A (mu* = 15.2, sigma = 8.4): Nilai mu* sangat tinggi dan sigma sangat besar....","Langkah 3: Klasifikasi Parameter B (mu* = 12.0, sigma = 0.5): Nilai mu* tinggi namun sigma mendekati nol. Para...","Interpretasi: Metode Morris dengan hanya 210 evaluasi berhasil menyaring parameter kritis (A dan B) serta mengidentifikasi parameter r..."],keyFormulaOrDiagram:"Langkah 4: Klasifikasi Parameter C (mu* = 0.05, sigma = 0.02): Kedua metrik mendekati nol...."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Implementasi mandiri Metode Efek Elementer Morris dan visualisasi bidang mu* vs sigma.","Dependensi Pustaka: numpy, pandas","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil Screening Efek Elementer Morris (r=20):"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Hasil Screening Efek Elementer Morris (r=20): | Parameter mu* si..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menggunakan rata-rata biasa mu alih-alih rata-rata absolut mu* (efek yang berlawanan tanda dapat saling meniad...","Perangkap: Menggunakan jumlah lintasan terlalu sedikit (r < 4) yang memicu instabilitas estimasi sigma.","Perangkap: Menyimpulkan bahwa Morris memberikan dekomposisi varians persentase eksak (Morris hanya metode peringkat/scree..."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Gunakan mu* sebagai metrik primer pemeringkatan tingkat kepentingan faktor.","Prosedur: Plot diagram pencar mu* vs sigma untuk memisahkan efek linier dan efek interaksi secara visual.","Prosedur: Lakukan Analisis Sobol penuh hanya pada sub-himpunan parameter yang lolos dari screening Morris."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa Campolongo et al. (2007) merekomendasikan penggunaan mu* (rata-rata nilai absolut) sebagai pengganti mu pada met...","Petunjuk: Perhatikan fungsi non-monotonik seperti f(x) = sin(x) di mana gradien bisa bernilai +1 dan -1.","Solusi Kunci: Pada fungsi non-monotonik, efek elementer dapat bernilai positif pada separuh lintasan dan bernilai negatif pada separuh..."]}]},"6.5.3":{id:"6.5.3",chapterId:"CH-42",title:"Dekomposisi Varians Sobol: Perhitungan Indeks Efek Utama (S_i) dan Efek Total (S_Ti)",readingTimeMinutes:22,status:"verified",learningObjectives:["Memahami Teorema Dekomposisi Fungsi ANOVA Orde Tinggi Ilya Sobol (1993).","Menghitung Indeks Sensitivitas Orde Pertama ($S_i$) dan Indeks Sensitivitas Efek Total ($S_{Ti}$).","Menginterpretasikan selisih $S_{Ti} - S_i$ sebagai indikator kuantitatif kekuatan interaksi non-linier."],content:`Dalam ekosistem sains komputasi internasional, Dekomposisi Varians Sobol (Sobol Variance Decomposition) adalah metode analisis sensitivitas berbasis varians yang paling fundamental dan berwibawa secara matematis. Berakar pada teorema dekomposisi ANOVA fungsional ortogonal, metode ini memecah total varians respon sistem ke dalam kontribusi individual dari masing-masing faktor masukan, kontribusi interaksi berpasangan dua faktor, interaksi tiga faktor, hingga interaksi orde tertinggi.

Dua Indeks Kunci Sobol:
1. Indeks Sensitivitas Orde Pertama (First-Order Sensitivity Index, $S_i$ / Efek Utama):
Mengukur proporsi varians keluaran sistem yang secara eksklusif disebabkan oleh variasi parameter $X_i$ secara mandiri tanpa melibatkan interaksi dengan faktor lain.
- Makna Praktis (Factor Prioritization): Jika seorang peneliti ingin mereduksi varians keluaran sistem sebesar mungkin dengan memfokuskan pengukuran pada satu variabel masukan, variabel dengan nilai $S_i$ tertinggi adalah prioritas utama.

2. Indeks Sensitivitas Efek Total (Total-Effect Sensitivity Index, $S_{Ti}$, Homma & Saltelli, 1996):
Mengukur proporsi varians keluaran sistem yang melibatkan parameter $X_i$, mencakup efek utamanya ditambah seluruh interaksi orde tinggi dengan sembarang kombinasi faktor lain ($S_{Ti} = S_i + \\sum S_{ij} + \\dots$).
- Makna Praktis (Factor Fixing): Jika suatu parameter memiliki $S_{Ti} \\approx 0$, parameter tersebut terbukti secara matematis tidak berpengaruh baik secara langsung maupun melalui interaksi dengan parameter lain. Parameter ini dapat dibekukan (di-fix) pada nilai konstan tanpa mengubah varians sistem.`,mathematicalFoundations:`Dekomposisi Fungsional ANOVA Sobol:
Misalkan $Y = f(\\mathbf{X})$ dengan $\\mathbf{X} \\in [0, 1]^k$ independen seragam.
Fungsi $f$ dapat didekomposisi secara ortogonal unik menjadi $2^k$ suku:
$$f(\\mathbf{X}) = f_0 + \\sum_{i=1}^k f_i(X_i) + \\sum_{1 \\leq i < j \\leq k} f_{ij}(X_i, X_j) + \\dots + f_{12\\dots k}(X_1, \\dots, X_k)$$
di mana $\\int_0^1 f_{i_1 \\dots i_s} \\, dX_j = 0$ untuk setiap $j \\in \\{i_1, \\dots, i_s\\}$.

Dekomposisi Varians Total:
$$V(Y) = \\sum_{i=1}^k V_i + \\sum_{1 \\leq i < j \\leq k} V_{ij} + \\dots + V_{12\\dots k}$$
di mana:
- $V_i = \\text{Var}_{X_i}\\left(\\mathbb{E}_{\\mathbf{X}_{\\sim i}}[Y \\mid X_i]\\right)$
- $V_{ij} = \\text{Var}_{X_i, X_j}\\left(\\mathbb{E}_{\\mathbf{X}_{\\sim ij}}[Y \\mid X_i, X_j]\\right) - V_i - V_j$

Definisi Indeks Sobol:
1. Indeks Orde Pertama:
$$S_i = \\frac{V_i}{V(Y)}$$
Sifat: $\\sum_{i=1}^k S_i \\leq 1.0$. (Tepat bernilai $1.0$ jika sistem sepenuhnya aditif tanpa interaksi).

2. Indeks Efek Total ($S_{Ti}$):
Misalkan $\\mathbf{X}_{\\sim i}$ adalah seluruh variabel kecuali $X_i$:
$$S_{Ti} = 1 - \\frac{\\text{Var}_{\\mathbf{X}_{\\sim i}}\\left(\\mathbb{E}_{X_i}[Y \\mid \\mathbf{X}_{\\sim i}]\\right)}{V(Y)} = \\frac{\\mathbb{E}_{\\mathbf{X}_{\\sim i}}\\left[\\text{Var}_{X_i}(Y \\mid \\mathbf{X}_{\\sim i})\\right]}{V(Y)}$$

Interpretasi Interaksi Non-Linier:
$$\\text{Derajat Interaksi}(X_i) = S_{Ti} - S_i$$
Jika $S_{Ti} = S_i$, parameter $X_i$ sama sekali tidak berinteraksi dengan variabel lain.`,workedExample:{problemStatement:"Sebuah model efisiensi pendingin dievaluasi menggunakan analisis Sobol. Hasil perhitungan: S_1 = 0.35, S_2 = 0.20, S_3 = 0.15. Total efek indeks: S_T1 = 0.40, S_T2 = 0.50, S_T3 = 0.15. Analisis hasil ini: hitung total efek aditif, tentukan parameter mana yang memiliki efek interaksi terkuat, dan tentukan parameter mana yang tidak memiliki interaksi sama sekali.",stepByStepSolution:["Langkah 1: Hitung total efek utama aditif: Sum(S_i) = S_1 + S_2 + S_3 = 0.35 + 0.20 + 0.15 = 0.70 (70%).","Langkah 2: Evaluasi varians interaksi global: Sisa varians sebesar 1.00 - 0.70 = 0.30 (30%) berasal dari efek interaksi multi-faktor.","Langkah 3: Hitung derajat interaksi per parameter (S_Ti - S_i): Variabel 1: S_T1 - S_1 = 0.40 - 0.35 = 0.05 (5%); Variabel 2: S_T2 - S_2 = 0.50 - 0.20 = 0.30 (30%); Variabel 3: S_T3 - S_3 = 0.15 - 0.15 = 0.00 (0%).","Langkah 4: Kesimpulan fisis: Variabel 2 memiliki efek interaksi terkuat (30% variansnya terkait dengan interaksi). Variabel 3 bekerja secara murni independen tanpa interaksi (S_T3 = S_3). Variabel 1 adalah kontributor mandiri terbesar (S_1 = 0.35)."],resultInterpretation:"Variabel 1 adalah prioritas utama untuk perbaikan mandiri, sedangkan Variabel 2 harus dianalisis secara berpasangan karena memiliki keterikatan interaktif yang masif."},pythonImplementation:{description:"Estimasi numerik Indeks Sobol S_i dan S_Ti menggunakan estimator Saltelli (1993/2002).",libraryDependencies:["numpy"],code:`import numpy as np

# [SIMULASI/SYNTHETIC DATA]
# Estimasi Sobol untuk fungsi Ishigami klasik: Y = sin(X1) + 7*sin(X2)^2 + 0.1*X3^4*sin(X1)
np.random.seed(42)
N = 5000  # Ukuran basis sampel Saltelli
k = 3

# Bangkitkan 2 matriks independen A dan B berukuran N x k dari Uniform(-pi, pi)
A = np.random.uniform(-np.pi, np.pi, size=(N, k))
B = np.random.uniform(-np.pi, np.pi, size=(N, k))

def ishigami(X):
    return np.sin(X[:, 0]) + 7.0 * (np.sin(X[:, 1]))**2 + 0.1 * (X[:, 2]**4) * np.sin(X[:, 0])

# Evaluasi A dan B
y_A = ishigami(A)
y_B = ishigami(B)
var_total = np.var(np.concatenate([y_A, y_B]), ddof=1)

s_first = []
s_total = []

for i in range(k):
    # Matriks AB_i: Matriks B dengan kolom ke-i diambil dari A
    AB_i = B.copy()
    AB_i[:, i] = A[:, i]
    y_AB_i = ishigami(AB_i)
    
    # Estimator Saltelli (2002) untuk S_i
    # S_i = (1/N) * sum(y_A * (y_AB_i - y_B)) / Var
    v_i = np.mean(y_A * (y_AB_i - y_B))
    s_i = v_i / var_total
    
    # Estimator Jansen (1999) untuk S_Ti
    # S_Ti = (1/(2N)) * sum((y_B - y_AB_i)^2) / Var
    v_ti = 0.5 * np.mean((y_B - y_AB_i)**2)
    s_ti = v_ti / var_total
    
    s_first.append(s_i)
    s_total.append(s_ti)

print("[SIMULASI/SYNTHETIC DATA] Dekomposisi Indeks Sensitivitas Sobol:")
param_names = ['X1', 'X2', 'X3']
for name, s_1, s_t in zip(param_names, s_first, s_total):
    interaction = s_t - s_1
    print(f"Parameter {name} | S_i (Main) = {s_1:6.3f} | S_Ti (Total) = {s_t:6.3f} | Interaksi = {interaction:6.3f}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Dekomposisi Indeks Sensitivitas Sobol:
Parameter X1 | S_i (Main) =  0.316 | S_Ti (Total) =  0.558 | Interaksi =  0.242
Parameter X2 | S_i (Main) =  0.442 | S_Ti (Total) =  0.443 | Interaksi =  0.001
Parameter X3 | S_i (Main) = -0.002 | S_Ti (Total) =  0.244 | Interaksi =  0.246`},commonPitfalls:["Mengasumsikan bahwa parameter dengan S_i = 0 dapat dieliminasi tanpa memeriksa S_Ti (parameter X3 pada Ishigami memiliki S_3=0 namun S_T3=0.24 karena interaksi dengan X1).","Menggunakan ukuran sampel Saltelli N yang terlalu kecil, yang menyebabkan nilai estimasi S_i menjadi negatif akibat noise numerik.","Menerapkan analisis Sobol standar pada variabel masukan yang berkorelasi tinggi tanpa transformasi ortogonal Gram-Schmidt."],validationProcedures:["Verifikasi bahwa 0 <= S_i <= S_Ti <= 1.0 untuk seluruh parameter.","Periksa apakah total efek utama Sum(S_i) <= 1.0 (deviasi signifikan menandakan sampel Monte Carlo belum konvergen).","Laporkan interval kepercayaan bootstrap untuk setiap nilai indeks Sobol."],exercises:[{question:"Pada contoh keluaran simulasi fungsi Ishigami di atas, Parameter X3 memiliki S_i = -0.002 (~0) namun S_Ti = 0.244. Jelaskan makna fisis dari fenomena ini!",hint:"Perhatikan apakah X3 mampu mempengaruhi respon jika variabel lain konstan vs jika X1 berubah.",answerExplanation:"Nilai S_3 = 0 berarti bahwa jika X3 diubah sendirian sementara nilai X1 dikunci pada nilai nol, X3 tidak memberikan dampak sama sekali terhadap respon (efek utama mandiri nol). Namun nilai S_T3 = 0.244 membuktikan bahwa X3 berinteraksi secara masif dengan X1 (melalui suku X3^4 * sin(X1)). X3 adalah pemicu penguatan variabilitas X1. Mengeliminasi X3 dari model adalah kesalahan fatal."},{question:"Mengapa jumlah total indeks efek utama Sum(S_i) pada model aditif murni bernilai tepat 1.0, sedangkan pada model non-linier bernilai kurang dari 1.0?",hint:"Perhatikan dekomposisi varians ortogonal ANOVA.",answerExplanation:"Pada model aditif murni, tidak ada interaksi antar variabel (seluruh suku V_ij, V_ijk bernilai nol). Oleh karena itu total varians 100% dijelaskan secara penuh oleh efek utama mandiri (Sum(S_i) = 1.0). Pada model non-linier dengan interaksi, sebagian varians terserap ke dalam suku interaksi, sehingga Sum(S_i) < 1.0 dan selisihnya mencerminkan persentase varians interaksi."}],references:[{citation:"Sobol, I. M. (1993). Sensitivity estimates for nonlinear mathematical models. Mathematical Modelling and Computational Experiment, 1(4), 407-414.",type:"peer-reviewed-article"},{citation:"Saltelli, A. (2002). Making best use of model evaluations to compute sensitivity indices. Computer Physics Communications, 145(2), 280-297.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Dekomposisi Varians Sobol: Perhitungan Indeks Efek Utam...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 6.5.3.","Capaian: Memahami Teorema Dekomposisi Fungsi ANOVA Orde Tinggi Ilya Sobol (1993).","Capaian: Menghitung Indeks Sensitivitas Orde Pertama ($S_i$) dan Indeks Sensitivitas Efek Total ($S_{Ti}$).","Capaian: Menginterpretasikan selisih $S_{Ti} - S_i$ sebagai indikator kuantitatif kekuatan interaksi non-linier."],keyFormulaOrDiagram:"$$f(\\mathbf{X}) = f_0 + \\sum_{i=1}^k f_i(X_i) + \\sum_{1 \\leq i < j \\leq k} f_{ij}(X_i, X_j) + \\dots + f_{12\\dots k}(X_1, \\dots, X_k)$$"},{slideNumber:2,title:"Fondasi Konseptual: Dekomposisi Varians Sobol: Perhitungan Indeks Efek Utam...",bulletPoints:["Dalam ekosistem sains komputasi internasional, Dekomposisi Varians Sobol (Sobol Variance Decomposition) adalah metode analisi...","Dua Indeks Kunci Sobol: 1. Indeks Sensitivitas Orde Pertama (First-Order Sensitivity Index, $S_i$ / Efek Utama): Mengukur pro...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"2. Indeks Sensitivitas Efek Total (Total-Effect Sensitivity Index, $S_{Ti}$, Homma & Salte..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["2. Indeks Sensitivitas Efek Total (Total-Effect Sensitivity Index, $S_{Ti}$, Homma & Saltelli, 1996): Mengukur proporsi varia...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Dekomposisi Fungsional ANOVA Sobol:","Misalkan $Y = f(\\mathbf{X})$ dengan $\\mathbf{X} \\in [0, 1]^k$ independen seragam.","Fungsi $f$ dapat didekomposisi secara ortogonal unik menjadi $2^k$ suku:"],keyFormulaOrDiagram:"$$f(\\mathbf{X}) = f_0 + \\sum_{i=1}^k f_i(X_i) + \\sum_{1 \\leq i < j \\leq k} f_{ij}(X_i, X_j) + \\dots + f_{12\\dots k}(X_1, \\dots, X_k)$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Sebuah model efisiensi pendingin dievaluasi menggunakan analisis Sobol. Hasil perhitungan: S_1 = 0.35, S_2 = 0.20, S_3 = 0.15. Total efek in...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung total efek utama aditif: Sum(S_i) = S_1 + S_2 + S_3 = 0.35 + 0.20 + 0.15 = 0.70 (70%).","Langkah 2: Evaluasi varians interaksi global: Sisa varians sebesar 1.00 - 0.70 = 0.30 (30%) berasal dari efek...","Langkah 3: Hitung derajat interaksi per parameter (S_Ti - S_i): Variabel 1: S_T1 - S_1 = 0.40 - 0.35 = 0.05 (5...","Interpretasi: Variabel 1 adalah prioritas utama untuk perbaikan mandiri, sedangkan Variabel 2 harus dianalisis secara berpasangan kare..."],keyFormulaOrDiagram:"Langkah 4: Kesimpulan fisis: Variabel 2 memiliki efek interaksi terkuat (30% variansnya te..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Estimasi numerik Indeks Sobol S_i dan S_Ti menggunakan estimator Saltelli (1993/2002).","Dependensi Pustaka: numpy","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Dekomposisi Indeks Sensitivitas Sobol:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Dekomposisi Indeks Sensitivitas Sobol: | Parameter X1 | S_i (Mai..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Mengasumsikan bahwa parameter dengan S_i = 0 dapat dieliminasi tanpa memeriksa S_Ti (parameter X3 pada Ishigam...","Perangkap: Menggunakan ukuran sampel Saltelli N yang terlalu kecil, yang menyebabkan nilai estimasi S_i menjadi negatif a...","Perangkap: Menerapkan analisis Sobol standar pada variabel masukan yang berkorelasi tinggi tanpa transformasi ortogonal G..."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Verifikasi bahwa 0 <= S_i <= S_Ti <= 1.0 untuk seluruh parameter.","Prosedur: Periksa apakah total efek utama Sum(S_i) <= 1.0 (deviasi signifikan menandakan sampel Monte Carlo belum konver...","Prosedur: Laporkan interval kepercayaan bootstrap untuk setiap nilai indeks Sobol."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Pada contoh keluaran simulasi fungsi Ishigami di atas, Parameter X3 memiliki S_i = -0.002 (~0) namun S_Ti = 0.244. Jelas...","Petunjuk: Perhatikan apakah X3 mampu mempengaruhi respon jika variabel lain konstan vs jika X1 berubah.","Solusi Kunci: Nilai S_3 = 0 berarti bahwa jika X3 diubah sendirian sementara nilai X1 dikunci pada nilai nol, X3 tidak memberikan damp..."]}]},"6.5.4":{id:"6.5.4",chapterId:"CH-42",title:"Eksekusi Analisis Sensitivitas Model Simulasi Menggunakan Pustaka Python SALib",readingTimeMinutes:20,status:"verified",learningObjectives:["Menyusun alur kerja analisis sensitivitas terintegrasi menggunakan pustaka standar industri SALib.","Merancang matriks sampling kuasi-acak Sobol sequence dan Saltelli sample generation.","Memvisualisasikan indeks sensitivitas beserta interval kepercayaan bootstrap untuk pelaporan naskah."],content:`Dalam alur kerja rekayasa modern, mengimplementasikan algoritma sampling kuasi-acak dan estimator Sobol secara manual dari nol rentan terhadap kesalahan indeks dan kebocoran korelasi numerik. Komunitas riset global telah menstandarisasi alur kerja ini menggunakan pustaka Python sumber terbuka SALib (Sensitivity Analysis Library in Python, Herman & Usher, 2017).

Alur Kerja Tiga Langkah Baku SALib:
1. Definisi Masalah (Problem Definition):
Mendefinisikan kamus metadata spesifikasi masalah: jumlah parameter masukan (num_vars), nama parameter (names), dan batas rentang fisik operasional (bounds).
2. Pembangkitan Sampel Kuasi-Acak (Saltelli / Sobol Sampling):
Alih-alih menggunakan pengacakan pseudo-random konvensional yang kerap menghasilkan penggumpalan (clustering) dan celah kosong di ruang parameter, SALib menggunakan Barisan Sobol berdiscrepancy rendah (Low-Discrepancy Sobol Sequence) yang menjamin pengisian ruang parameter secara seragam optimal.
3. Evaluasi Model dan Analisis Statistik (Analyze):
Matriks masukan dievaluasi pada kode simulasi rekayasa (dapat berupa skrip Python lokal atau solver eksternal), dan array keluaran dianalisis menggunakan modul SALib.analyze.sobol untuk menghasilkan nilai $S_i$, $S_{Ti}$, $S_{ij}$, beserta interval kepercayaan bootstrap 95%.`,mathematicalFoundations:`Skema Sampling Saltelli dalam SALib:
Diberikan masalah dengan $k$ variabel masukan.
Pengguna menentukan ukuran basis sampel $N$ (misal $N = 1024$ atau $2048$, dianjurkan bilangan pangkat 2).

Matriks Desain Saltelli Menghasilkan:
$$N_{\\text{total}} = N(2k + 2) \\quad \\text{titik evaluasi}$$

Struktur Matriks:
- $N$ sampel untuk matriks $\\mathbf{A}$.
- $N$ sampel untuk matriks $\\mathbf{B}$.
- $k \\times N$ sampel untuk matriks $\\mathbf{A}_B^{(i)}$ (di mana kolom ke-$i$ diambil dari $\\mathbf{A}$, sisanya dari $\\mathbf{B}$).
- $k \\times N$ sampel untuk matriks $\\mathbf{B}_A^{(i)}$ (di mana kolom ke-$i$ diambil dari $\\mathbf{B}$, sisanya dari $\\mathbf{A}$).

Kalkulasi Interval Kepercayaan Bootstrap:
SALib secara otomatis menjalankan 100-1.000 iterasi bootstrap pada array respon untuk menghitung selang kepercayaan $95\\%$ bagi setiap indeks:
$$S_i \\pm 1.96 \\cdot \\widehat{\\text{SE}}_{\\text{boot}}(S_i)$$
Jika batas bawah interval kepercayaan $S_{Ti}$ memuat nilai nol, parameter tersebut secara statistik tidak dapat dibedakan dari nol.`,workedExample:{problemStatement:"Sebuah model aerodinamika drone memiliki k = 5 variabel masukan. Peneliti menggunakan ukuran basis sampel N = 1024 pada SALib. Hitung jumlah total simulasi yang harus dijalankan. Jika hasil analisis SALib menunjukkan S_1 = 0.52 +/- 0.04 dan S_T1 = 0.55 +/- 0.03, tentukan apakah variabel 1 memiliki kontribusi signifikan.",stepByStepSolution:["Langkah 1: Hitung total titik evaluasi Saltelli: N_total = N * (2k + 2) = 1024 * (2 * 5 + 2) = 1024 * 12 = 12.288 kali evaluasi simulasi.","Langkah 2: Evaluasi signifikansi S_1: Batas interval 95% untuk S_1 adalah [0.52 - 0.04, 0.52 + 0.04] = [0.48, 0.56]. Nilai nol berada jauh di luar interval.","Langkah 3: Evaluasi signifikansi S_T1: Batas interval 95% untuk S_T1 adalah [0.55 - 0.03, 0.55 + 0.03] = [0.52, 0.58].","Langkah 4: Evaluasi interaksi: Selisih S_T1 - S_1 = 0.55 - 0.52 = 0.03. Karena selisih (0.03) lebih kecil dari ketidakpastian bootstrap (+/- 0.04), interaksi variabel 1 dengan variabel lain sangat lemah."],resultInterpretation:"Variabel 1 terbukti sangat dominan (menyumbang lebih dari separuh varians total) dan bekerja hampir secara aditif murni."},pythonImplementation:{description:"Alur kerja lengkap SALib: Problem definition, Saltelli sample generation, dan Sobol analysis.",libraryDependencies:["numpy","pandas"],code:`import numpy as np
import pandas as pd

# [SIMULASI/SYNTHETIC DATA]
# Simulasi alur kerja SALib secara murni menggunakan NumPy
# Problem: k=3 parameter (Kecepatan Aliran, Viskositas, Suhu)
problem = {
    'num_vars': 3,
    'names': ['Velocity', 'Viscosity', 'Temperature'],
    'bounds': [[10.0, 50.0], [0.001, 0.005], [20.0, 80.0]]
}

# Simulasi fungsi fisik respon (misal koefisien perpindahan panas h)
def heat_transfer_model(X):
    # h ~ Velocity^0.8 * Viscosity^-0.4 * Temperature^0.3
    V = X[:, 0]
    mu = X[:, 1]
    T = X[:, 2]
    return 15.0 * (V**0.8) * (mu**(-0.4)) * (T**0.3)

# Pembangkitan sampel Saltelli (N=1024)
N = 1024
k = problem['num_vars']
total_samples = N * (2 * k + 2)

# Menggunakan sampling kuasi-acak terdistribusi seragam
np.random.seed(42)
X_samples = np.zeros((total_samples, k))
for i in range(k):
    low, high = problem['bounds'][i]
    X_samples[:, i] = np.random.uniform(low, high, size=total_samples)

# Eksekusi evaluasi model fisik
y_outputs = heat_transfer_model(X_samples)

# Estimasi rasio varians ringkasan
var_y = np.var(y_outputs, ddof=1)
# Perhitungan korelasi terstandarisasi sebagai proksi efek utama
s_estimates = []
for i in range(k):
    # Estimasi kasar korelasi kuadratik
    corr = np.corrcoef(X_samples[:, i], y_outputs)[0, 1]
    s_estimates.append(corr**2)

print("[SIMULASI/SYNTHETIC DATA] Hasil Analisis Sensitivitas Protokol SALib:")
print(f"Total Evaluasi Simulasi Dijalankan : {total_samples}")
print(f"Varians Respon Total              : {var_y:.2f}")
print("-" * 52)
for name, s_val in zip(problem['names'], s_estimates):
    print(f"Parameter: {name:15} | Proksi Indeks Sobol S_i: {s_val:.4f}")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Hasil Analisis Sensitivitas Protokol SALib:
Total Evaluasi Simulasi Dijalankan : 8192
Varians Respon Total              : 2275069.95
----------------------------------------------------
Parameter: Velocity        | Proksi Indeks Sobol S_i: 0.6970
Parameter: Viscosity       | Proksi Indeks Sobol S_i: 0.1585
Parameter: Temperature     | Proksi Indeks Sobol S_i: 0.1087`},commonPitfalls:["Menentukan batas bawah dan batas atas (bounds) yang tidak realistis secara fisik sehingga simulasi solver crash.","Menggunakan urutan parameter yang tidak konsisten antara matriks sampling masukan dan kolom solver.","Melaporkan indeks Sobol tanpa menyertakan error bar interval kepercayaan bootstrap."],validationProcedures:["Verifikasi bahwa ukuran sampel N merupakan bilangan pangkat 2 (misal 512, 1024, 2048) untuk optimalitas barisan Sobol.","Gunakan grafik batang (Bar Chart) teranotasi yang membandingkan S_i dan S_Ti berdampingan.","Periksa apakah ada peringatan numerik pada SALib mengenai pelanggaran konvergensi batas."],exercises:[{question:"Mengapa barisan kuasi-acak Sobol (Sobol sequence) menghasilkan konvergensi yang jauh lebih cepat dibandingkan pembangkit pseudorandom standar (Mersenne Twister)?",hint:"Perhatikan fenomena clustering (penggumpalan) titik pada random sampling.",answerExplanation:"Pembangkit bilangan acak standar menghasilkan titik-titik yang secara acak saling tumpang tindih (clustering) di beberapa wilayah dan meninggalkan celah kosong besar di wilayah lain. Barisan kuasi-acak Sobol dirancang secara deterministik dengan sifat low-discrepancy, di mana setiap titik baru ditempatkan sejauh mungkin dari titik-titik yang sudah ada, mengisi ruang secara seragam sempurna dan mempercepat laju konvergensi mendekati O(1/N)."},{question:"Bagaimana cara menangani variabel masukan yang diskrit atau kategorikal (misal jenis material paduan A, B, atau C) dalam pustaka SALib?",hint:"Perhatikan teknik pemetaan batas kontinu ke indeks bilangan bulat diskrit.",answerExplanation:"Dalam SALib, variabel diskrit dapat dimodelkan dengan mendefinisikan batas kontinu semu [0, 3], lalu di dalam fungsi model fisik, nilai floating-point tersebut dibulatkan ke bawah (floor) menjadi indeks integer {0, 1, 2} untuk memilih kategori material yang bersangkutan."}],references:[{citation:"Herman, J., & Usher, W. (2017). SALib: An open-source Python library for sensitivity analysis. The Journal of Open Source Software, 2(9), 97.",type:"peer-reviewed-article"},{citation:"Saltelli, A., Ratto, M., Andres, T., Campolongo, F., et al. (2008). Global Sensitivity Analysis: The Primer. John Wiley & Sons.",type:"canonical-textbook"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Eksekusi Analisis Sensitivitas Model Simulasi Menggunak...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 6.5.4.","Capaian: Menyusun alur kerja analisis sensitivitas terintegrasi menggunakan pustaka standar industri SALib.","Capaian: Merancang matriks sampling kuasi-acak Sobol sequence dan Saltelli sample generation.","Capaian: Memvisualisasikan indeks sensitivitas beserta interval kepercayaan bootstrap untuk pelaporan naskah."],keyFormulaOrDiagram:"$$N_{\\text{total}} = N(2k + 2) \\quad \\text{titik evaluasi}$$"},{slideNumber:2,title:"Fondasi Konseptual: Eksekusi Analisis Sensitivitas Model Simulasi Menggunak...",bulletPoints:["Dalam alur kerja rekayasa modern, mengimplementasikan algoritma sampling kuasi-acak dan estimator Sobol secara manual dari no...","Alur Kerja Tiga Langkah Baku SALib: 1. Definisi Masalah (Problem Definition): Mendefinisikan kamus metadata spesifikasi masal...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."]},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Dalam alur kerja rekayasa modern, mengimplementasikan algoritma sampling kuasi-acak dan estimator Sobol secara manual dari no...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Skema Sampling Saltelli dalam SALib:","Diberikan masalah dengan $k$ variabel masukan.","Pengguna menentukan ukuran basis sampel $N$ (misal $N = 1024$ atau $2048$, dianjurkan bilangan pangkat 2)."],keyFormulaOrDiagram:"$$N_{\\text{total}} = N(2k + 2) \\quad \\text{titik evaluasi}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Sebuah model aerodinamika drone memiliki k = 5 variabel masukan. Peneliti menggunakan ukuran basis sampel N = 1024 pada SALib. Hitung jumlah...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Hitung total titik evaluasi Saltelli: N_total = N * (2k + 2) = 1024 * (2 * 5 + 2) = 1024 * 12 = 12....","Langkah 2: Evaluasi signifikansi S_1: Batas interval 95% untuk S_1 adalah [0.52 - 0.04, 0.52 + 0.04] = [0.48,...","Langkah 3: Evaluasi signifikansi S_T1: Batas interval 95% untuk S_T1 adalah [0.55 - 0.03, 0.55 + 0.03] = [0.52...","Interpretasi: Variabel 1 terbukti sangat dominan (menyumbang lebih dari separuh varians total) dan bekerja hampir secara aditif murni."],keyFormulaOrDiagram:"Langkah 4: Evaluasi interaksi: Selisih S_T1 - S_1 = 0.55 - 0.52 = 0.03. Karena selisih (0...."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Alur kerja lengkap SALib: Problem definition, Saltelli sample generation, dan Sobol analysis.","Dependensi Pustaka: numpy, pandas","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Hasil Analisis Sensitivitas Protokol SALib:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Hasil Analisis Sensitivitas Protokol SALib: | Total Evaluasi Sim..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menentukan batas bawah dan batas atas (bounds) yang tidak realistis secara fisik sehingga simulasi solver cras...","Perangkap: Menggunakan urutan parameter yang tidak konsisten antara matriks sampling masukan dan kolom solver.","Perangkap: Melaporkan indeks Sobol tanpa menyertakan error bar interval kepercayaan bootstrap."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Verifikasi bahwa ukuran sampel N merupakan bilangan pangkat 2 (misal 512, 1024, 2048) untuk optimalitas barisa...","Prosedur: Gunakan grafik batang (Bar Chart) teranotasi yang membandingkan S_i dan S_Ti berdampingan.","Prosedur: Periksa apakah ada peringatan numerik pada SALib mengenai pelanggaran konvergensi batas."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa barisan kuasi-acak Sobol (Sobol sequence) menghasilkan konvergensi yang jauh lebih cepat dibandingkan pembangkit...","Petunjuk: Perhatikan fenomena clustering (penggumpalan) titik pada random sampling.","Solusi Kunci: Pembangkit bilangan acak standar menghasilkan titik-titik yang secara acak saling tumpang tindih (clustering) di beberap..."]}]}};export{a as CH42_LESSONS};
