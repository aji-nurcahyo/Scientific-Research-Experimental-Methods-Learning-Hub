const a={"7.2.1":{id:"7.2.1",chapterId:"CH-46",title:'Krisis Replikasi Komputasi: Mengapa "It Works on My Machine" Ditolak Sains Modern',readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami anatomi krisis reproduksibilitas komputasi (Computational Reproducibility Crisis).",'Menganalisis mengapa alasan klasik "It works on my machine" membatalkan klaim keabsahan ilmiah.',"Membedakan taksonomi Tingkat Reproduksibilitas ACM (Repeatability, Replicability, Reproducibility)."],content:`Dalam epistemologi ilmu pengetahuan, sebuah klaim penemuan tidak dapat diakui sebagai fakta ilmiah sampai klaim tersebut dapat diverifikasi dan direproduksi secara independen oleh peneliti lain. Ironisnya, dalam era komputasi modern di mana hasil penelitian dihasilkan oleh kode biner deterministik, tingkat keterulangan penelitian justru berada pada titik yang sangat mengkhawatirkan.

Survei Monumental Baker (2016) di Jurnal Nature:
Lebih dari 70% peneliti gagal mereproduksi eksperimen ilmuwan lain, dan lebih dari 50% peneliti bahkan gagal mereproduksi eksperimen mereka sendiri yang dikerjakan beberapa tahun sebelumnya! Dalam riset komputasi dan kecerdasan buatan, kegagalan ini jarang disebabkan oleh pemalsuan data sengaja, melainkan karena fenomena "Environment Decay" dan "Dependency Rot".

Mengapa "It Works on My Machine" Ditolak Sains Modern?
Alasan "kode ini berjalan lancar di laptop saya" adalah pengakuan kegagalan metodologis. Di dunia sains, sebuah eksperimen komputasi tidak hanya mencakup skrip analisis, melainkan mencakup seluruh ekosistem komputasi:
1. Versi Spesifik Sistem Operasi dan Kernel (misal perbedaan threading glibc Linux vs Windows).
2. Arsitektur Perangkat Keras dan Instruksi CPU/GPU (misal instruksi AVX-512 vs non-AVX).
3. Pohon Dependensi Pustaka Pihak Ketiga yang Tersembunyi (Transitive Dependencies).
Jika ekosistem ini tidak dibekukan dan dibagikan secara utuh, kode akan berhenti berfungsi segera setelah salah satu pustaka eksternal merilis versi baru.`,mathematicalFoundations:`Taksonomi Standar Keterulangan Komputasi ACM (Association for Computing Machinery):
Diberikan himpunan artefak eksperimen komputasi: Tim Peneliti ($A$), Kode/Perangkat Lunak ($C$), Data ($D$), dan Mesin Komputasi ($M$).

1. Repeatability (Keterulangan Tim Asli):
Tim yang sama ($A_1$) menggunakan kode yang sama ($C_1$), data yang sama ($D_1$), dan mesin yang sama ($M_1$) untuk mereproduksi hasil yang identik.
$$\\text{Verify}(A_1, C_1, D_1, M_1) \\implies \\text{Hasil Identik}$$

2. Replicability (Keterulangan Tim Independen):
Tim independen yang berbeda ($A_2$) menggunakan artefak kode yang sama ($C_1$) dan data yang sama ($D_1$) di lingkungan mesin komputasi baru ($M_2$) untuk mereproduksi hasil yang konsisten.
$$\\text{Verify}(A_2, C_1, D_1, M_2) \\implies \\text{Hasil Konsisten}$$

3. Reproducibility (Reproduksibilitas Konseptual Sejati):
Tim independen yang berbeda ($A_2$) menulis implementasi kode baru dari awal ($C_2$) berdasarkan deskripsi makalah, mengumpulkan data baru ($D_2$), dan mencapai kesimpulan ilmiah yang sama.
$$\\text{Verify}(A_2, C_2, D_2, M_2) \\implies \\text{Konfirmasi Teori}$$`,workedExample:{problemStatement:"Sebuah makalah diterbitkan tahun 2021 dengan dependensi requirements.txt hanya tertulis: numpy, scipy, scikit-learn (tanpa nomor versi). Pada tahun 2024, seorang peneliti mencoba menjalankan kode tersebut di Python 3.12. Kode mengalami crash seketika dengan ImportError: cannot import name ... akibat deprecation API. Identifikasi 3 kesalahan fatal manajemen dependensi dari penulis asli.",stepByStepSolution:["Langkah 1: Kesalahan ketiadaan Pinning Versi (Unpinned Dependencies): Penulis tidak mengunci versi pustaka (misal numpy==1.21.2), sehingga manajer paket mengunduh versi terbaru tahun 2024 yang telah membuang fungsi-fungsi usang tahun 2021.","Langkah 2: Pengabaian versi Runtime Python: Penulis tidak mencantumkan versi penerjemah Python (misal Python 3.8 vs 3.12).","Langkah 3: Ketiadaan Lockfile Transisi: Penulis tidak menyertakan berkas lockfile yang mengunci hash kriptografi dan versi dari seluruh pustaka sub-dependensi perantara."],resultInterpretation:"Penulis gagal mematuhi standar keterulangan komputasi dasar, menyebabkan artefak ilmiah rusak permanen dalam waktu kurang dari 3 tahun."},pythonImplementation:{description:"Audit lingkungan komputasi otomatis: mencatat versi runtime, OS, CPU, dan hash modul.",libraryDependencies:["platform","sys"],code:`import platform
import sys
import hashlib

# [SIMULASI/SYNTHETIC DATA]
# GENERASI RUNTIME MANIFEST ILMIAH
def generate_reproducibility_manifest() -> dict:
    """Mencatat sidik jari lingkungan eksekusi untuk lampiran publikasi."""
    manifest = {
        'Python_Version': sys.version.split()[0],
        'Operating_System': f"{platform.system()} {platform.release()} ({platform.architecture()[0]})",
        'Processor_Architecture': platform.processor() or "Unknown Architecture",
        'Byte_Order': sys.byteorder,
        'Float_Epsilon': sys.float_info.epsilon
    }
    return manifest

manifest_info = generate_reproducibility_manifest()

print("[SIMULASI/SYNTHETIC DATA] Manifest Lingkungan Eksekusi Ilmiah:")
for key, val in manifest_info.items():
    print(f"{key:24}: {val}")

# Simulasi verifikasi hash data input eksperimen
raw_data_bytes = b"2026-11-23 ITERA Sensor Experiment Log Data Stream Validated"
data_sha256 = hashlib.sha256(raw_data_bytes).hexdigest()
print(f"Data Input SHA-256 Digest : {data_sha256[:16]}... (Integritas Data Terkunci)")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Manifest Lingkungan Eksekusi Ilmiah:
Python_Version          : 3.12.6
Operating_System        : Windows 10 (64bit)
Processor_Architecture  : Intel64 Family 6 Model 140 Stepping 1, GenuineIntel
Byte_Order              : little
Float_Epsilon           : 2.220446049250313e-16
Data Input SHA-256 Digest : b33722a42feaa2f9... (Integritas Data Terkunci)`},commonPitfalls:["Menulis requirements.txt tanpa menyertakan nomor versi eksplisit.","Mengasumsikan kode yang berjalan di CPU Intel x86 akan menghasilkan angka floating-point identik di Apple Silicon ARM tanpa verifikasi toleransi.","Menyimpan artefak kode di tautan Google Drive pribadi yang dapat terhapus sewaktu-waktu."],validationProcedures:["Lampirkan berkas environment.yml atau poetry.lock di repositori publik riset.",'Lakukan pengujian replikasi "Clean Slate" pada mesin virtual bersih yang baru diinisialisasi.',"Sertakan badge ACM Replicability pada halaman depan repositori artefak."],exercises:[{question:"Apa perbedaan mendasar antara Replicability dan Reproducibility menurut terminologi resmi ACM (Association for Computing Machinery)?",hint:"Perhatikan apakah tim independen menggunakan kode dan data yang sama dari penulis asli atau membuat artefak baru secara mandiri.",answerExplanation:"Menurut ACM, Replicability berarti tim independen mengeksekusi artefak kode dan data yang sama yang disediakan oleh penulis asli pada sistem komputasi berbeda dan berhasil memperoleh hasil yang sama. Reproducibility adalah tingkatan yang lebih tinggi, di mana tim independen mereplikasi seluruh temuan ilmiah dengan menulis kode baru secara mandiri dan mengumpulkan data baru berdasarkan deskripsi teks makalah."},{question:"Mengapa menyertakan random seed saja tidak menjamin hasil numerik 100% identik di lintas mesin yang berbeda?",hint:"Perhatikan implementasi pustaka aljabar linier tingkat rendah (BLAS/LAPACK) dan versi driver GPU.",answerExplanation:"Meskipun random seed identik, perbedaan versi pustaka BLAS/LAPACK (seperti OpenBLAS vs Intel MKL), perbedaan versi CUDA/cuDNN pada kartu grafis, atau arsitektur mikroprosesor yang berbeda (x86 vs ARM) dapat menggunakan urutan reduksi floating-point paralel yang berbeda. Hal ini memicu sedikit variasi pembulatan pada bit-bit desimal terakhir yang seiring waktu dapat mendivergensikan simulasi."}],references:[{citation:"Baker, M. (2016). 1,500 scientists lift the lid on reproducibility. Nature, 533(7604), 452-454.",type:"peer-reviewed-article"},{citation:"Association for Computing Machinery (ACM). (2020). Artifact Review and Badging Version 1.1.",type:"formal-standard"}],slides:[{slideNumber:1,title:'Tinjauan & Capaian: Krisis Replikasi Komputasi: Mengapa "It Works on My Mac...',bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 7.2.1.","Capaian: Memahami anatomi krisis reproduksibilitas komputasi (Computational Reproducibility Crisis).",'Capaian: Menganalisis mengapa alasan klasik "It works on my machine" membatalkan klaim keabsahan ilmiah.',"Capaian: Membedakan taksonomi Tingkat Reproduksibilitas ACM (Repeatability, Replicability, Reproducibility)."],keyFormulaOrDiagram:"$$\\text{Verify}(A_1, C_1, D_1, M_1) \\implies \\text{Hasil Identik}$$"},{slideNumber:2,title:'Fondasi Konseptual: Krisis Replikasi Komputasi: Mengapa "It Works on My Mac...',bulletPoints:["Dalam epistemologi ilmu pengetahuan, sebuah klaim penemuan tidak dapat diakui sebagai fakta ilmiah sampai klaim tersebut dapa...","Survei Monumental Baker (2016) di Jurnal Nature: Lebih dari 70% peneliti gagal mereproduksi eksperimen ilmuwan lain, dan lebi...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:'Mengapa "It Works on My Machine" Ditolak Sains Modern? Alasan "kode ini berjalan lancar di...'},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:['Mengapa "It Works on My Machine" Ditolak Sains Modern? Alasan "kode ini berjalan lancar di laptop saya" adalah pengakuan kega...',"Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Taksonomi Standar Keterulangan Komputasi ACM (Association for Computing Machinery):","Diberikan himpunan artefak eksperimen komputasi: Tim Peneliti ($A$), Kode/Perangkat Lunak ($C$), Data ($D$), d...","1. Repeatability (Keterulangan Tim Asli):"],keyFormulaOrDiagram:"$$\\text{Verify}(A_1, C_1, D_1, M_1) \\implies \\text{Hasil Identik}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Sebuah makalah diterbitkan tahun 2021 dengan dependensi requirements.txt hanya tertulis: numpy, scipy, scikit-learn (tanpa nomor versi). Pad...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Kesalahan ketiadaan Pinning Versi (Unpinned Dependencies): Penulis tidak mengunci versi pustaka (mi...","Langkah 2: Pengabaian versi Runtime Python: Penulis tidak mencantumkan versi penerjemah Python (misal Python 3...","Langkah 3: Ketiadaan Lockfile Transisi: Penulis tidak menyertakan berkas lockfile yang mengunci hash kriptogra...","Interpretasi: Penulis gagal mematuhi standar keterulangan komputasi dasar, menyebabkan artefak ilmiah rusak permanen dalam waktu kuran..."],keyFormulaOrDiagram:"Langkah 3: Ketiadaan Lockfile Transisi: Penulis tidak menyertakan berkas lockfile yang men..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Audit lingkungan komputasi otomatis: mencatat versi runtime, OS, CPU, dan hash modul.","Dependensi Pustaka: platform, sys","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Manifest Lingkungan Eksekusi Ilmiah:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Manifest Lingkungan Eksekusi Ilmiah: | Python_Version : 3.12.6 |..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menulis requirements.txt tanpa menyertakan nomor versi eksplisit.","Perangkap: Mengasumsikan kode yang berjalan di CPU Intel x86 akan menghasilkan angka floating-point identik di Apple Sili...","Perangkap: Menyimpan artefak kode di tautan Google Drive pribadi yang dapat terhapus sewaktu-waktu."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Lampirkan berkas environment.yml atau poetry.lock di repositori publik riset.",'Prosedur: Lakukan pengujian replikasi "Clean Slate" pada mesin virtual bersih yang baru diinisialisasi.',"Prosedur: Sertakan badge ACM Replicability pada halaman depan repositori artefak."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Apa perbedaan mendasar antara Replicability dan Reproducibility menurut terminologi resmi ACM (Association for Computing...","Petunjuk: Perhatikan apakah tim independen menggunakan kode dan data yang sama dari penulis asli atau membuat...","Solusi Kunci: Menurut ACM, Replicability berarti tim independen mengeksekusi artefak kode dan data yang sama yang disediakan oleh penu..."]}]},"7.2.2":{id:"7.2.2",chapterId:"CH-46",title:"Manajemen Dependensi Terkunci Menggunakan Virtual Environments dan Lockfiles",readingTimeMinutes:20,status:"verified",learningObjectives:["Mengisolasi lingkungan komputasi Python menggunakan Virtual Environments (venv/conda).","Membedakan Manifest Abstrak (requirements.in) vs Lockfile Terkunci Eksak (poetry.lock / requirements.txt ber-hash).","Mencegah konflik dependensi transisi (Transitive Dependency Collisions) secara deterministik."],content:`Dalam ekosistem pemrograman Python yang sangat dinamis, menginstal paket pustaka langsung ke lingkungan sistem operasi global (global Python environment) adalah kesalahan fatal yang sering mengakibatkan kegagalan sistemik. Ketika proyek A membutuhkan scikit-learn versi 0.24 dan proyek B membutuhkan scikit-learn versi 1.3, memperbarui paket untuk proyek B akan secara langsung merusak eksekusi proyek A.

Prinsip Isolasi Virtual Environments:
Setiap proyek penelitian wajib memiliki Virtual Environment mandiri yang sepenuhnya terisolasi dari lingkungan sistem operasi dan proyek lain. Direktori lingkungan virtual menyimpan salinan mandiri dari binari Python dan pustaka paket pihak ketiga yang terisolasi secara kedap.

Dikotomi Manifest Abstrak vs Lockfile Eksak:
1. Manifest Abstrak (Abstract Dependency Specification, misal pyproject.toml atau requirements.in):
Mencantumkan pustaka tingkat tinggi yang dibutuhkan proyek dengan batas rentang toleransi longgar (misal numpy >= 1.20, < 2.0). Berkas ini diperuntukkan bagi manusia untuk membaca dependensi konseptual.
2. Lockfile Terkunci Eksak (Concrete Lockfile, misal poetry.lock, conda-lock.yml, atau pip-compile):
Mencantumkan seluruh pohon dependensi transitif secara tuntas hingga pustaka terdalam, dilengkapi dengan nomor versi eksak hingga digit terakhir dan hash kriptografi SHA-256 dari paket berkas instalasi biner. Lockfile diperuntukkan bagi mesin komputer untuk mereplikasi lingkungan identik secara bit-for-bit di laboratorium mana pun di seluruh dunia.`,mathematicalFoundations:`Verifikasi Kriptografi Integritas Paket (Hash Digest Matching):
Untuk menjamin bahwa paket pustaka yang diunduh oleh rekan sejawat di komputer lain sama persis dan tidak mengalami korupsi atau injeksi kode berbahaya:
$$\\text{SHA-256}(\\text{PackageFile}) == \\text{HashDigest}_{\\text{lockfile}}$$

Contoh Entri Lockfile Terkunci Eksak (Standar PEP 665 / pip hash-checking):
\`\`\`text
numpy==1.26.4     --hash=sha256:7b9d7...c8     --hash=sha256:4a3e1...b2
scipy==1.12.0     --hash=sha256:9f2c0...d1
\`\`\`
Perintah Instalasi Deterministik Mutlak:
\`\`\`bash
pip install --require-hashes -r requirements.lock
\`\`\`
Jika berkas paket yang diunduh berbeda 1 bit saja dari hash yang tercatat di lockfile, proses instalasi akan dibatalkan seketika oleh manajer paket.`,workedExample:{problemStatement:"Sebuah proyek riset memiliki manifest dependensi abstrak: pandas>=2.0. Ketika diinstal hari ini, pip mengunduh pandas 2.2.1 yang secara otomatis mengunduh sub-dependensi numpy 1.26.4 dan pytz 2024.1. Jelaskan bagaimana mekanisme lockfile mencatat pohon dependensi ini dan mengapa lockfile menjamin replikasi 10 tahun ke depan.",stepByStepSolution:["Langkah 1: Resolusi dependensi (Dependency Resolution Graph): Resolver memetakan bahwa pandas 2.2.1 secara kaku membutuhkan numpy >= 1.22.4 dan pytz >= 2020.1.","Langkah 2: Pembekuan snapshot ke lockfile: Lockfile merekam: pandas==2.2.1, numpy==1.26.4, pytz==2024.1, python-dateutil==2.9.0, six==1.16.0 beserta URL unduhan dan hash SHA-256 masing-masing berkas roda (.whl).","Langkah 3: Jaminan 10 tahun ke depan: Ketika peneliti lain mengeksekusi instalasi pada tahun 2034 menggunakan lockfile, resolver tidak melakukan pencarian versi baru di internet, melainkan secara deterministik memasang kelima paket pada versi eksak tersebut dengan verifikasi hash."],resultInterpretation:"Lockfile mengeliminasi seluruh ketidakpastian evolusi pustaka di masa depan, menjamin keterulangan eksekusi lingkungan secara permanen."},pythonImplementation:{description:"Pembangkitan manifes dependensi terkunci (Lockfile Generator) berbasis verifikasi hash SHA-256.",libraryDependencies:["hashlib"],code:`import hashlib

# [SIMULASI/SYNTHETIC DATA]
# Simulasi pembuatan requirements.lock terverifikasi hash kriptografi
mock_packages = [
    {'name': 'numpy', 'version': '1.26.4', 'wheel_mock': b'binary_content_of_numpy_1_26_4_wheel'},
    {'name': 'scipy', 'version': '1.12.0', 'wheel_mock': b'binary_content_of_scipy_1_12_0_wheel'},
    {'name': 'scikit-learn', 'version': '1.4.1', 'wheel_mock': b'binary_content_of_sklearn_1_4_1_wheel'},
]

lockfile_lines = []
for pkg in mock_packages:
    pkg_hash = hashlib.sha256(pkg['wheel_mock']).hexdigest()
    entry = f"{pkg['name']}=={pkg['version']} --hash=sha256:{pkg_hash}"
    lockfile_lines.append(entry)

lockfile_content = "\\n".join(lockfile_lines)

print("[SIMULASI/SYNTHETIC DATA] Berkas Lockfile Terkunci Eksak (requirements.lock):")
print("-" * 65)
print(lockfile_content)
print("-" * 65)
print("Verifikasi: Seluruh sub-dependensi terkunci hingga level digest SHA-256.")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Berkas Lockfile Terkunci Eksak (requirements.lock):
-----------------------------------------------------------------
numpy==1.26.4 --hash=sha256:d8c56fa6e7b78ad94d2627e77a29e24aaefc3ca8a14b306b85635f2ae3e29f0f
scipy==1.12.0 --hash=sha256:399c5855bafe504fa30fcb7498cff7319ec14d0f507ff5b91b92c452441c9f7a
scikit-learn==1.4.1 --hash=sha256:b637ee500f40d125fc7f7fef48bfe438186178c7c94510b1a03975053f7c9e99
-----------------------------------------------------------------
Verifikasi: Seluruh sub-dependensi terkunci hingga level digest SHA-256.`},commonPitfalls:["Menyimpan direktori virtual environment (seperti venv/ atau .conda/) ke dalam repositori Git (ukuran direktori membengkak ratusan megabyte).","Mengedit berkas lockfile secara manual dengan teks editor (merusak integritas hash).","Mengabaikan lockfile dan hanya menyertakan berkas requirements.txt tanpa pin versi."],validationProcedures:["Masukkan venv/, .venv/, dan __pycache__/ ke dalam berkas .gitignore repositori.","Gunakan perkakas modern seperti Poetry (poetry.lock) atau pip-tools (pip-compile) untuk mengelola lockfile.","Uji instalasi dari lockfile di lingkungan CI/CD otomatis (GitHub Actions) pada setiap commit kode."],exercises:[{question:"Mengapa memasukkan folder virtual environment (.venv/) secara langsung ke dalam commit Git merupakan kesalahan fatal bagi reproduksibilitas antar sistem operasi?",hint:"Perhatikan keberadaan file biner dan symlink yang spesifik sistem operasi di dalam .venv.",answerExplanation:"Folder .venv/ berisi file biner penerjemah, symlink, dan pustaka C-extensions terkompilasi yang spesifik untuk satu sistem operasi dan arsitektur perangkat keras tertentu (misal Windows x86). Jika folder ini di-commit ke Git dan di-clone di mesin Linux, seluruh symlink dan biner akan rusak (broken links) dan tidak dapat dieksekusi. Yang wajib di-commit adalah resep deklaratifnya (lockfile)."},{question:"Apa perbedaan mendasar antara perintah pip freeze > requirements.txt dengan penggunaan lockfile terkelola seperti poetry.lock?",hint:"Perhatikan apakah pip freeze membedakan antara dependensi utama proyek dengan dependensi perantara (transitif).",answerExplanation:"Perintah pip freeze mencatat seluruh paket yang ada di environment saat itu secara datar (flat list) tanpa membedakan mana paket yang memang dibutuhkan oleh proyek dan mana yang hanya merupakan sub-dependensi perantara, serta tidak mencatat hash kriptografi dan batas versi Python. Lockfile terkelola (seperti Poetry) mencatat struktur graf dependensi lengkap, metadata versi Python, dan hash integritas berkas."}],references:[{citation:"Poetry Developers. (2023). Dependency Management in Python. Poetry Documentation.",type:"guideline"},{citation:"Python Packaging Authority (PyPA). (2021). PEP 665 - A file format to record Python dependencies for installation reproducibility.",type:"formal-standard"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Manajemen Dependensi Terkunci Menggunakan Virtual Envir...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 7.2.2.","Capaian: Mengisolasi lingkungan komputasi Python menggunakan Virtual Environments (venv/conda).","Capaian: Membedakan Manifest Abstrak (requirements.in) vs Lockfile Terkunci Eksak (poetry.lock / requirements.txt ber-h...","Capaian: Mencegah konflik dependensi transisi (Transitive Dependency Collisions) secara deterministik."],keyFormulaOrDiagram:"$$\\text{SHA-256}(\\text{PackageFile}) == \\text{HashDigest}_{\\text{lockfile}}$$"},{slideNumber:2,title:"Fondasi Konseptual: Manajemen Dependensi Terkunci Menggunakan Virtual Envir...",bulletPoints:["Dalam ekosistem pemrograman Python yang sangat dinamis, menginstal paket pustaka langsung ke lingkungan sistem operasi global...","Prinsip Isolasi Virtual Environments: Setiap proyek penelitian wajib memiliki Virtual Environment mandiri yang sepenuhnya ter...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Dikotomi Manifest Abstrak vs Lockfile Eksak: 1. Manifest Abstrak (Abstract Dependency Spec..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Dikotomi Manifest Abstrak vs Lockfile Eksak: 1. Manifest Abstrak (Abstract Dependency Specification, misal pyproject.toml ata...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Verifikasi Kriptografi Integritas Paket (Hash Digest Matching):","Untuk menjamin bahwa paket pustaka yang diunduh oleh rekan sejawat di komputer lain sama persis dan tidak meng...","Contoh Entri Lockfile Terkunci Eksak (Standar PEP 665 / pip hash-checking):"],keyFormulaOrDiagram:"$$\\text{SHA-256}(\\text{PackageFile}) == \\text{HashDigest}_{\\text{lockfile}}$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Sebuah proyek riset memiliki manifest dependensi abstrak: pandas>=2.0. Ketika diinstal hari ini, pip mengunduh pandas 2.2.1 yang secara otom...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Resolusi dependensi (Dependency Resolution Graph): Resolver memetakan bahwa pandas 2.2.1 secara kak...","Langkah 2: Pembekuan snapshot ke lockfile: Lockfile merekam: pandas==2.2.1, numpy==1.26.4, pytz==2024.1, pytho...","Langkah 3: Jaminan 10 tahun ke depan: Ketika peneliti lain mengeksekusi instalasi pada tahun 2034 menggunakan...","Interpretasi: Lockfile mengeliminasi seluruh ketidakpastian evolusi pustaka di masa depan, menjamin keterulangan eksekusi lingkungan s..."],keyFormulaOrDiagram:"Langkah 3: Jaminan 10 tahun ke depan: Ketika peneliti lain mengeksekusi instalasi pada tah..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Pembangkitan manifes dependensi terkunci (Lockfile Generator) berbasis verifikasi hash SHA-256.","Dependensi Pustaka: hashlib","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Berkas Lockfile Terkunci Eksak (requirements.lock):"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Berkas Lockfile Terkunci Eksak (requirements.lock): | ----------..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menyimpan direktori virtual environment (seperti venv/ atau .conda/) ke dalam repositori Git (ukuran direktori...","Perangkap: Mengedit berkas lockfile secara manual dengan teks editor (merusak integritas hash).","Perangkap: Mengabaikan lockfile dan hanya menyertakan berkas requirements.txt tanpa pin versi."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Masukkan venv/, .venv/, dan __pycache__/ ke dalam berkas .gitignore repositori.","Prosedur: Gunakan perkakas modern seperti Poetry (poetry.lock) atau pip-tools (pip-compile) untuk mengelola lockfile.","Prosedur: Uji instalasi dari lockfile di lingkungan CI/CD otomatis (GitHub Actions) pada setiap commit kode."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa memasukkan folder virtual environment (.venv/) secara langsung ke dalam commit Git merupakan kesalahan fatal bag...","Petunjuk: Perhatikan keberadaan file biner dan symlink yang spesifik sistem operasi di dalam .venv.","Solusi Kunci: Folder .venv/ berisi file biner penerjemah, symlink, dan pustaka C-extensions terkompilasi yang spesifik untuk satu sist..."]}]},"7.2.3":{id:"7.2.3",chapterId:"CH-46",title:"Kontainerisasi Eksperimen Ilmiah Menggunakan Docker untuk Isolasi Penuh",readingTimeMinutes:22,status:"verified",learningObjectives:["Memahami keterbatasan virtual environment bahasa (Python/R) terhadap dependensi level sistem operasi.","Merancang arsitektur kontainer Docker berstandar ilmiah (Reproducible Dockerfile).","Membekukan lapisan sistem operasi, pustaka CUDA, dan driver C/Fortran dalam image kontainer terisolasi."],content:`Meskipun penggunaan virtual environment dan lockfile (seperti Poetry) telah berhasil mengunci dependensi paket Python, proyek komputasi ilmiah tingkat lanjut seringkali bergantung pada pustaka eksternal di luar ranah Python:
- Pustaka komputasi aljabar linier Fortran/C (BLAS, LAPACK, FFTW).
- Driver akselerator perangkat keras (NVIDIA CUDA Toolkit, cuDNN).
- Pustaka grafis rendering dan pemrosesan citra (OpenCV C++ backend, libgl, FFmpeg).
- Versi pustaka sistem operasi dasar (glibc pada Linux).
Jika peneliti lain mencoba menjalankan lockfile Python Anda di distribusi Linux yang berbeda (misal Ubuntu 20.04 vs Alpine Linux), kompilasi C-extensions dapat gagal seketika.

Kontainerisasi Menggunakan Docker:
Docker memecahkan masalah ini dengan mengisolasi seluruh lingkungan sistem operasi ke dalam sebuah Kontainer (Container). Berbeda dengan Mesin Virtual (Virtual Machine) yang lambat karena mengemulasi seluruh perangkat keras (hardware virtualization), kontainer berbagi kernel dengan sistem operasi induk (OS-level virtualization) sehingga sangat ringan, instan dieksekusi, dan memiliki overhead komputasi mendekati 0%.

Prinsip Pembuatan Dockerfile Ilmiah:
1. Base Image Resmi dan Ter-pinning: Gunakan base image spesifik dengan digest hash (misal python:3.10.13-slim-bookworm alih-alih python:latest).
2. Deterministik Layer Caching: Salin berkas lockfile dan lakukan instalasi dependensi sebelum menyalin kode sumber riset, memanfaatkan cache layer Docker secara optimal.
3. Hak Akses Non-Root: Jalankan proses komputasi di bawah user non-root demi keamanan dan kompatibilitas sistem klaster akademik.`,mathematicalFoundations:`Anatomi Dockerfile Ilmiah Terstandarisasi:

\`\`\`dockerfile
# 1. Base Image Resmi Ter-pinning (Debian Bookworm Python 3.10)
FROM python:3.10.13-slim-bookworm@sha256:d55f4...82

# 2. Pengaturan Variabel Lingkungan Deterministik
ENV PYTHONUNBUFFERED=1     PYTHONDONTWRITEBYTECODE=1     PIP_NO_CACHE_DIR=off     PIP_DISABLE_PIP_VERSION_CHECK=on

# 3. Instalasi Dependensi Sistem Operasi Tingkat Rendah (C/Fortran Compiler)
RUN apt-get update && apt-get install -y --no-install-recommends     build-essential     libopenblas-dev     && rm -rf /var/lib/apt/lists/*

# 4. Pembuatan User Non-Root untuk Keamanan Akademik
RUN useradd -m -u 1000 researcher
USER researcher
WORKDIR /home/researcher/experiment

# 5. Instalasi Dependensi Terkunci (Menggunakan Lockfile)
COPY --chown=researcher:researcher requirements.lock .
RUN pip install --no-deps --require-hashes -r requirements.lock

# 6. Salin Kode Sumber dan Titik Masuk Eksekusi
COPY --chown=researcher:researcher src/ ./src
ENTRYPOINT ["python", "src/run_experiments.py"]
\`\`\`

Verifikasi Imutabilitas Kontainer:
Image kontainer yang telah dibangun memiliki identitas unik berupa hash digest SHA-256 yang dapat diunggah ke registry terbuka (seperti Docker Hub atau GitHub Container Registry / GHCR). Peneliti lain di belahan dunia mana pun dapat menjalankan eksperimen dengan tepat satu baris perintah:
\`\`\`bash
docker run --rm -v $(pwd)/results:/home/researcher/experiment/results ghcr.io/itera/research-project:v1.0.0
\`\`\``,workedExample:{problemStatement:"Sebuah model deep learning membutuhkan NVIDIA CUDA 11.8 dan cuDNN 8.6. Jelaskan mengapa mengirimkan kode Python saja ke reviewer jurnal yang memiliki komputer dengan CUDA 12.2 akan memicu kegagalan eksekusi, dan bagaimana Docker dengan NVIDIA Container Toolkit menyelesaikan masalah ini.",stepByStepSolution:["Langkah 1: Masalah ketidakcocokan ABI CUDA (Application Binary Interface): PyTorch yang dikompilasi untuk CUDA 11.8 mencari driver dinamis libcudart.so.11.0. Pada sistem dengan CUDA 12.2, pustaka dinamis tersebut tidak ada, menghasilkan CUDA driver/runtime mismatch error.","Langkah 2: Peran Base Image Kontainer: Peneliti menggunakan base image resmi: FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04. Di dalam kontainer, seluruh pustaka CUDA Toolkit 11.8 terpasang secara kedap.","Langkah 3: Peran NVIDIA Container Toolkit: Memetakan akses GPU fisik dari host OS ke dalam kontainer tanpa mempedulikan versi CUDA toolkit di host OS.","Langkah 4: Hasil eksekusi: Reviewer dapat menjalankan eksperimen secara langsung dengan perintah: docker run --gpus all my-experiment-image tanpa perlu mengubah instalasi CUDA di komputer pribadinya."],resultInterpretation:"Kontainerisasi mengisolasi seluruh tumpukan dependensi perangkat lunak dan pustaka GPU, menjamin kelancaran replikasi eksperimen lintas platform perangkat keras."},pythonImplementation:{description:"Verifikasi isolasi kontainer dan pemeriksaan kesesuaian lingkungan eksekusi via Python script.",libraryDependencies:["os","sys"],code:`import os
import sys

# [SIMULASI/SYNTHETIC DATA]
def verify_container_isolation() -> dict:
    """Memeriksa apakah skrip dieksekusi di dalam lingkungan kontainer terisolasi."""
    in_docker = os.path.exists('/.dockerenv')
    cgroup_docker = False
    
    if os.path.exists('/proc/self/cgroup'):
        with open('/proc/self/cgroup', 'r') as f:
            cgroup_docker = 'docker' in f.read()
            
    is_isolated = in_docker or cgroup_docker
    
    status = {
        'Running_Inside_Container': is_isolated,
        'Environment_Isolation': 'DOCKER_CONTAINER' if is_isolated else 'LOCAL_HOST',
        'Python_Version': f"{sys.version_info.major}.{sys.version_info.minor}",
        'Reproducibility_Readiness': 'VERIFIED' if is_isolated else 'LOCAL_UNISOLATED'
    }
    return status

check = verify_container_isolation()
print("[SIMULASI/SYNTHETIC DATA] Pemeriksaan Integritas Kontainerisasi Docker:")
print("-" * 55)
for k, v in check.items():
    print(f"{k:26}: {v}")
print("-" * 55)
print("Rekomendasi RSE: Jalankan build container sebelum merilis kode publikasi.")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Pemeriksaan Integritas Kontainerisasi Docker:
-------------------------------------------------------
Running_Inside_Container  : False
Environment_Isolation     : LOCAL_HOST
Python_Version            : 3.12
Reproducibility_Readiness : LOCAL_UNISOLATED
-------------------------------------------------------
Rekomendasi RSE: Jalankan build container sebelum merilis kode publikasi.`},commonPitfalls:["Menggunakan tag latest pada base image Docker (FROM ubuntu:latest), yang akan berubah seiring waktu.","Menjalankan kontainer sebagai user root yang dapat memicu masalah perizinan berkas (permission denial) pada volume mount host.","Menyimpan dataset raksasa (puluhan gigabyte) di dalam image Docker (image harus ringan; gunakan volume mount untuk data)."],validationProcedures:["Gunakan Docker Linter (hadolint) untuk mengaudit praktik terbaik penulisan Dockerfile.","Pastikan image akhir memiliki ukuran seringkas mungkin (gunakan multistage builds dan --no-install-recommends).","Publikasikan image terkompilasi ke registry terbuka yang memiliki jaminan retensi permanen (Zenodo atau GHCR)."],exercises:[{question:"Mengapa dataset berukuran besar (misal 50 GB) tidak boleh dimasukkan secara langsung (COPY /data) ke dalam image Docker?",hint:"Perhatikan ukuran image saat diunduh oleh peneliti lain dan prinsip pemisahan kode vs data.",answerExplanation:"Memasukkan dataset besar ke dalam image Docker akan membuat ukuran image membengkak menjadi puluhan gigabyte, membuat proses upload, download, dan distribusi di registry menjadi sangat lambat dan boros bandwidth. Praktik terbaik adalah menjaga image tetap ramping (< 1 GB) hanya berisi kode dan dependensi, sedangkan dataset besar disimpan di repositori data terbuka (seperti Zenodo) dan dihubungkan ke kontainer saat runtime menggunakan Docker Volume Mount (-v /host/data:/container/data)."},{question:"Apa keunggulan dari Multistage Docker Build dalam penyiapan lingkungan riset komputasi C++/CUDA?",hint:"Perhatikan pemisahan antara perkakas kompilasi (compiler) dengan runtime eksekusi biner.",answerExplanation:"Multistage build memungkinkan kompilasi kode dilakukan di stage pertama (yang memuat perkakas berat seperti gcc, cmake, dan CUDA SDK lengkap ~5 GB), lalu hanya mengekstrak biner hasil kompilasi ke stage kedua (runtime ringan yang hanya memuat shared libraries ~200 MB). Hal ini menghasilkan image produksi akhir yang sangat kecil, aman, dan cepat diunduh oleh reviewer."}],references:[{citation:"Merkel, D. (2014). Docker: lightweight linux containers for consistent development and deployment. Linux Journal, 2014(239), 2.",type:"peer-reviewed-article"},{citation:"Nüst, D., Sochat, V., Marwick, B., Eglen, S. J., et al. (2020). Ten simple rules for writing Dockerfiles for reproducible research. PLoS Computational Biology, 16(11), e1008316.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Kontainerisasi Eksperimen Ilmiah Menggunakan Docker unt...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 7.2.3.","Capaian: Memahami keterbatasan virtual environment bahasa (Python/R) terhadap dependensi level sistem operasi.","Capaian: Merancang arsitektur kontainer Docker berstandar ilmiah (Reproducible Dockerfile).","Capaian: Membekukan lapisan sistem operasi, pustaka CUDA, dan driver C/Fortran dalam image kontainer terisolasi."]},{slideNumber:2,title:"Fondasi Konseptual: Kontainerisasi Eksperimen Ilmiah Menggunakan Docker unt...",bulletPoints:["Meskipun penggunaan virtual environment dan lockfile (seperti Poetry) telah berhasil mengunci dependensi paket Python, proyek...","Kontainerisasi Menggunakan Docker: Docker memecahkan masalah ini dengan mengisolasi seluruh lingkungan sistem operasi ke dala...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Prinsip Pembuatan Dockerfile Ilmiah: 1. Base Image Resmi dan Ter-pinning: Gunakan base ima..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Prinsip Pembuatan Dockerfile Ilmiah: 1. Base Image Resmi dan Ter-pinning: Gunakan base image spesifik dengan digest hash (mis...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Anatomi Dockerfile Ilmiah Terstandarisasi:","```dockerfile","# 1. Base Image Resmi Ter-pinning (Debian Bookworm Python 3.10)"]},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Sebuah model deep learning membutuhkan NVIDIA CUDA 11.8 dan cuDNN 8.6. Jelaskan mengapa mengirimkan kode Python saja ke reviewer jurnal yang...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Masalah ketidakcocokan ABI CUDA (Application Binary Interface): PyTorch yang dikompilasi untuk CUDA...","Langkah 2: Peran Base Image Kontainer: Peneliti menggunakan base image resmi: FROM nvidia/cuda:11.8.0-cudnn8-r...","Langkah 3: Peran NVIDIA Container Toolkit: Memetakan akses GPU fisik dari host OS ke dalam kontainer tanpa mem...","Interpretasi: Kontainerisasi mengisolasi seluruh tumpukan dependensi perangkat lunak dan pustaka GPU, menjamin kelancaran replikasi ek..."],keyFormulaOrDiagram:"Langkah 4: Hasil eksekusi: Reviewer dapat menjalankan eksperimen secara langsung dengan pe..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Verifikasi isolasi kontainer dan pemeriksaan kesesuaian lingkungan eksekusi via Python script.","Dependensi Pustaka: os, sys","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Pemeriksaan Integritas Kontainerisasi Docker:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Pemeriksaan Integritas Kontainerisasi Docker: | ----------------..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menggunakan tag latest pada base image Docker (FROM ubuntu:latest), yang akan berubah seiring waktu.","Perangkap: Menjalankan kontainer sebagai user root yang dapat memicu masalah perizinan berkas (permission denial) pada vo...","Perangkap: Menyimpan dataset raksasa (puluhan gigabyte) di dalam image Docker (image harus ringan; gunakan volume mount u..."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Gunakan Docker Linter (hadolint) untuk mengaudit praktik terbaik penulisan Dockerfile.","Prosedur: Pastikan image akhir memiliki ukuran seringkas mungkin (gunakan multistage builds dan --no-install-recommends)...","Prosedur: Publikasikan image terkompilasi ke registry terbuka yang memiliki jaminan retensi permanen (Zenodo atau GHCR)."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa dataset berukuran besar (misal 50 GB) tidak boleh dimasukkan secara langsung (COPY /data) ke dalam image Docker?","Petunjuk: Perhatikan ukuran image saat diunduh oleh peneliti lain dan prinsip pemisahan kode vs data.","Solusi Kunci: Memasukkan dataset besar ke dalam image Docker akan membuat ukuran image membengkak menjadi puluhan gigabyte, membuat pr..."]}]},"7.2.4":{id:"7.2.4",chapterId:"CH-46",title:"Pembangunan Pipeline Eksekusi 1-Klik (One-Click Reproducible Pipeline) via Makefile",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami filosofi otomatisasi eksekusi menyeluruh dari data mentah ke laporan naskah akhir.","Menulis Makefile terotomatisasi yang melacak graf dependensi komputasi (Directed Acyclic Graph).","Mengintegrasikan pipeline 1-klik (One-Click Pipeline) untuk mereproduksi seluruh tabel dan grafik naskah."],content:`Ujian terberat dari reproduksibilitas komputasi adalah apa yang disebut Uji Eksekusi 1-Klik (The One-Click Reproducibility Test): Jika seorang reviewer independen mengkloning repositori penelitian Anda, apakah ia dapat mereproduksi seluruh angka, tabel statistik, dan grafik gambar di dalam naskah hanya dengan mengetik satu perintah tunggal di terminal (seperti make all atau ./reproduce.sh)?

Jika pereplikasian mengharuskan reviewer membaca berkas README setebal 20 halaman, membuka 8 notebook Jupyter yang berbeda secara berurutan ("jalankan sel 1-14 di notebook A, lalu buka notebook B jalankan sel 5, lalu salin angka ke tabel LaTeX"), eksperimen tersebut secara operasional dinyatakan tidak reproduktif. Manusia adalah makhluk yang rentan membuat kesalahan ketik dan lupa urutan langkah.

Peran GNU Make dalam Komputasi Ilmiah:
Meskipun awalnya dirancang untuk mengompilasi program C pada tahun 1970-an, GNU Make adalah perkakas otomatisasi alur kerja ilmiah yang paling tangguh dan universal. Make bekerja berdasarkan Graf Dependensi Berkas:
- Target: Berkas keluaran yang ingin dihasilkan (misal figures/figure1.pdf).
- Prerequisites: Berkas masukan yang menjadi dasar (misal data/clean_data.csv dan src/plot_figure1.py).
- Recipe: Perintah terminal untuk menghasilkan target dari prerequisites.
Keunggulan Unik Make: Make memeriksa stempel waktu berkas (timestamps). Jika data masukan tidak berubah, Make tidak akan membuang waktu menjalankan ulang simulasi yang memakan waktu lama (Incremental Computation).`,mathematicalFoundations:`Struktur Relasi Graf Dependensi Makefile Ilmiah:
Misalkan $T_k$ adalah target berkas ke-$k$, dan $\\mathcal{P}(T_k)$ adalah himpunan prasyaratnya.
Aturan Eksekusi:
$$T_k \\text{ dieksekusi ulang jika dan hanya jika } \\exists p \\in \\mathcal{P}(T_k) \\text{ sedemikian rupa sehingga } \\text{Time}(p) > \\text{Time}(T_k)$$

Contoh Arsitektur Pipeline Makefile Lengkap:

\`\`\`makefile
.PHONY: all clean data test figures paper

# Target Utama (One-Click Entry Point)
all: paper

# 1. Pipeline Pembersihan Data
data/processed/clean_data.parquet: data/raw/raw_sensor.csv src/preprocess.py
	python src/preprocess.py --input $< --output $@

# 2. Pipeline Pelatihan Model dan Uji Statistik
results/model_metrics.json: data/processed/clean_data.parquet src/train_and_evaluate.py
	python src/train_and_evaluate.py --data $< --metrics $@

# 3. Pipeline Pembangkitan Grafik Publikasi
figures/figure1_results.pdf: results/model_metrics.json src/plot_figures.py
	python src/plot_figures.py --input $< --output $@

# 4. Pipeline Kompilasi Naskah Ilmiah LaTeX
paper: paper/manuscript.pdf

paper/manuscript.pdf: paper/manuscript.tex figures/figure1_results.pdf
	cd paper && latexmk -pdf -halt-on-error manuscript.tex

# Pembersihan Artefak Sementara
clean:
	rm -rf data/processed/* results/* figures/* paper/*.aux paper/*.log paper/*.pdf
\`\`\``,workedExample:{problemStatement:"Sebuah proyek riset memiliki waktu komputasi pelatihan model selama 14 jam, sedangkan pembuatan grafik hanya membutuhkan 2 detik. Peneliti ingin mengubah warna garis pada Gambar 1 di naskah. Jelaskan bagaimana Makefile menghemat waktu peneliti dengan mencegah eksekusi ulang simulasi 14 jam tersebut.",stepByStepSolution:["Langkah 1: Analisis perubahan stempel waktu (timestamps): Peneliti hanya mengedit berkas src/plot_figures.py.","Langkah 2: Evaluasi target results/model_metrics.json: Prasyarat berkas ini (data/processed/clean_data.parquet dan src/train_and_evaluate.py) tidak mengalami perubahan (stempel waktu prasyarat lebih lama dari target). Make memutuskan: LEWATI eksekusi pelatihan model 14 jam.","Langkah 3: Evaluasi target figures/figure1_results.pdf: Prasyarat src/plot_figures.py memiliki stempel waktu lebih baru daripada berkas PDF grafik yang ada. Make mengeksekusi resep plotting (2 detik).","Langkah 4: Evaluasi target paper/manuscript.pdf: Karena PDF grafik diperbarui, naskah LaTeX dikompilasi ulang (3 detik)."],resultInterpretation:"Makefile secara cerdas memperbarui naskah dalam 5 detik saja tanpa membuang waktu mengeksekusi ulang simulasi 14 jam yang tidak terpengaruh."},pythonImplementation:{description:"Simulasi eksekutor graf dependensi pipeline ilmiah otomatis mirip Makefile.",libraryDependencies:["time"],code:`import time

# [SIMULASI/SYNTHETIC DATA]
class SimplePipelineTask:
    def __init__(self, name, inputs, action):
        self.name = name
        self.inputs = inputs
        self.action = action
        self.last_modified = 0.0

    def run_if_needed(self, current_time):
        # Jalankan jika belum pernah dibuat atau input lebih baru
        need_run = (self.last_modified == 0.0)
        for inp in self.inputs:
            if inp.last_modified > self.last_modified:
                need_run = True
                break
        if need_run:
            print(f"--> [EKSEKUSI] Menjalankan: {self.name}...")
            self.action()
            self.last_modified = current_time
        else:
            print(f"--> [LEWATI] {self.name} sudah mutakhir (Up-to-date).")

# Simulasi rantai tugas ilmiah
task_data = SimplePipelineTask("Task 1: Preprocess Data", [], lambda: time.sleep(0.01))
task_model = SimplePipelineTask("Task 2: Train Deep Learning", [task_data], lambda: time.sleep(0.01))
task_plot = SimplePipelineTask("Task 3: Generate Figures", [task_model], lambda: time.sleep(0.01))

print("[SIMULASI/SYNTHETIC DATA] Eksekusi Pertama Pipeline 1-Klik:")
t_now = 100.0
task_data.run_if_needed(t_now)
task_model.run_if_needed(t_now)
task_plot.run_if_needed(t_now)

print("\\n[SIMULASI/SYNTHETIC DATA] Eksekusi Kedua Tanpa Perubahan Berkas:")
t_now = 105.0
task_data.run_if_needed(t_now)
task_model.run_if_needed(t_now)
task_plot.run_if_needed(t_now)
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Eksekusi Pertama Pipeline 1-Klik:
--> [EKSEKUSI] Menjalankan: Task 1: Preprocess Data...
--> [EKSEKUSI] Menjalankan: Task 2: Train Deep Learning...
--> [EKSEKUSI] Menjalankan: Task 3: Generate Figures...

[SIMULASI/SYNTHETIC DATA] Eksekusi Kedua Tanpa Perubahan Berkas:
--> [LEWATI] Task 1: Preprocess Data sudah mutakhir (Up-to-date).
--> [LEWATI] Task 2: Train Deep Learning sudah mutakhir (Up-to-date).
--> [LEWATI] Task 3: Generate Figures sudah mutakhir (Up-to-date).`},commonPitfalls:["Menulis instruksi pereplikasian manual yang mengharuskan intervensi klik antarmuka grafis pengguna (GUI).","Mengabaikan target kompilasi dokumen PDF (grafik diperbarui tetapi grafik di dalam PDF naskah tetap versi usang).","Menggunakan spasi alih-alih karakter Tab pada baris resep Makefile (aturan sintaksis ketat GNU Make)."],validationProcedures:["Uji perintah make clean && make all pada lingkungan kontainer Docker yang bersih.","Verifikasi bahwa seluruh angka yang tertulis di naskah PDF berasal dari pembacaan berkas metrics otomatis (tanpa copy-paste manual).","Cantumkan instruksi 1-klik yang jelas di bagian paling atas berkas README.md repositori."],exercises:[{question:"Mengapa praktik menyalin-menempel (copy-pasting) angka hasil kalkulasi terminal secara manual ke dalam tabel naskah LaTeX dianggap sebagai pelanggaran prinsip reproducibility?",hint:"Perhatikan potensi kesalahan manusia (human typo) dan desinkronisasi saat eksperimen diperbarui.",answerExplanation:"Penyalinan manual rentan terhadap salah ketik (typo) dan menghasilkan desinkronisasi fatal. Jika di kemudian hari data diperbarui atau seed diubah, peneliti seringkali lupa memperbarui salah satu angka di tabel, menciptakan kontradiksi internal antara teks pembahasan dan tabel. Praktik reproduktif baku adalah membuat skrip yang secara otomatis menghasilkan berkas tabel .tex yang langsung di-include (\\input{table.tex}) ke dalam naskah utama."},{question:"Apa fungsi target .PHONY dalam Makefile ilmiah?",hint:"Perhatikan apa yang terjadi jika di dalam folder terdapat direktori bernama sama dengan nama target (misal folder bernama clean atau all).",answerExplanation:"Target .PHONY memberi tahu GNU Make bahwa target tersebut adalah nama perintah aksi murni, bukan nama berkas fisik di disk. Tanpa .PHONY, jika terdapat direktori atau berkas bernama clean di repositori, Make akan menganggap target clean sudah mutakhir dan menolak mengeksekusi resep pembersihan."}],references:[{citation:"Stallman, R. M., McGrath, R., & Smith, P. (2004). GNU Make: A Program for Directing Recompilation. Free Software Foundation.",type:"formal-standard"},{citation:"Marwick, B. (2017). Computational reproducibility in archaeological research: Basic principles and a case study of their implementation. Journal of Archaeological Method and Theory, 24(2), 424-450.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Tinjauan & Capaian: Pembangunan Pipeline Eksekusi 1-Klik (One-Click Reprodu...",bulletPoints:["Fokus Metodologis: Pembahasan komprehensif pada lesson 7.2.4.","Capaian: Memahami filosofi otomatisasi eksekusi menyeluruh dari data mentah ke laporan naskah akhir.","Capaian: Menulis Makefile terotomatisasi yang melacak graf dependensi komputasi (Directed Acyclic Graph).","Capaian: Mengintegrasikan pipeline 1-klik (One-Click Pipeline) untuk mereproduksi seluruh tabel dan grafik naskah."],keyFormulaOrDiagram:"$$T_k \\text{ dieksekusi ulang jika dan hanya jika } \\exists p \\in \\mathcal{P}(T_k) \\text{ sedemikian rupa sehingga } \\text{Time}(p) > \\text{Time}(T_k)$$"},{slideNumber:2,title:"Fondasi Konseptual: Pembangunan Pipeline Eksekusi 1-Klik (One-Click Reprodu...",bulletPoints:["Ujian terberat dari reproduksibilitas komputasi adalah apa yang disebut Uji Eksekusi 1-Klik (The One-Click Reproducibility Te...","Jika pereplikasian mengharuskan reviewer membaca berkas README setebal 20 halaman, membuka 8 notebook Jupyter yang berbeda se...","Pentingnya kepatuhan terhadap standar validitas internal dan eksternal."],keyFormulaOrDiagram:"Peran GNU Make dalam Komputasi Ilmiah: Meskipun awalnya dirancang untuk mengompilasi progr..."},{slideNumber:3,title:"Arsitektur Metodologis & Prinsip Operasional",bulletPoints:["Peran GNU Make dalam Komputasi Ilmiah: Meskipun awalnya dirancang untuk mengompilasi program C pada tahun 1970-an, GNU Make a...","Karakterisasi batasan operasional dan domain aplikasi sistem.","Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen."]},{slideNumber:4,title:"Formulasi Matematis & Notasi Formal",bulletPoints:["Struktur Relasi Graf Dependensi Makefile Ilmiah:","Misalkan $T_k$ adalah target berkas ke-$k$, dan $\\mathcal{P}(T_k)$ adalah himpunan prasyaratnya.","Aturan Eksekusi:"],keyFormulaOrDiagram:"$$T_k \\text{ dieksekusi ulang jika dan hanya jika } \\exists p \\in \\mathcal{P}(T_k) \\text{ sedemikian rupa sehingga } \\text{Time}(p) > \\text{Time}(T_k)$$"},{slideNumber:5,title:"Studi Kasus Numerik: Perumusan Masalah",bulletPoints:["Konteks Masalah: Sebuah proyek riset memiliki waktu komputasi pelatihan model selama 14 jam, sedangkan pembuatan grafik hanya membutuhkan 2 detik. Peneliti i...","Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.","Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan."]},{slideNumber:6,title:"Solusi Numerik & Interpretasi Hasil",bulletPoints:["Langkah 1: Analisis perubahan stempel waktu (timestamps): Peneliti hanya mengedit berkas src/plot_figures.py.","Langkah 2: Evaluasi target results/model_metrics.json: Prasyarat berkas ini (data/processed/clean_data.parquet...","Langkah 3: Evaluasi target figures/figure1_results.pdf: Prasyarat src/plot_figures.py memiliki stempel waktu l...","Interpretasi: Makefile secara cerdas memperbarui naskah dalam 5 detik saja tanpa membuang waktu mengeksekusi ulang simulasi 14 jam yan..."],keyFormulaOrDiagram:"Langkah 4: Evaluasi target paper/manuscript.pdf: Karena PDF grafik diperbarui, naskah LaTe..."},{slideNumber:7,title:"Implementasi Komputasi & Eksekusi Python",bulletPoints:["Deskripsi: Simulasi eksekutor graf dependensi pipeline ilmiah otomatis mirip Makefile.","Dependensi Pustaka: time","Keluaran Diharapkan: [SIMULASI/SYNTHETIC DATA] Eksekusi Pertama Pipeline 1-Klik:"],keyFormulaOrDiagram:"[SIMULASI/SYNTHETIC DATA] Eksekusi Pertama Pipeline 1-Klik: | --> [EKSEKUSI] Menjalankan:..."},{slideNumber:8,title:"Perangkap Metodologis & P-Hacking Warning",bulletPoints:["Perangkap: Menulis instruksi pereplikasian manual yang mengharuskan intervensi klik antarmuka grafis pengguna (GUI).","Perangkap: Mengabaikan target kompilasi dokumen PDF (grafik diperbarui tetapi grafik di dalam PDF naskah tetap versi usan...","Perangkap: Menggunakan spasi alih-alih karakter Tab pada baris resep Makefile (aturan sintaksis ketat GNU Make)."]},{slideNumber:9,title:"Prosedur Validasi Empiris & Integritas Riset",bulletPoints:["Prosedur: Uji perintah make clean && make all pada lingkungan kontainer Docker yang bersih.","Prosedur: Verifikasi bahwa seluruh angka yang tertulis di naskah PDF berasal dari pembacaan berkas metrics otomatis (tan...","Prosedur: Cantumkan instruksi 1-klik yang jelas di bagian paling atas berkas README.md repositori."]},{slideNumber:10,title:"Sintesis Materi & Latihan Mandiri",bulletPoints:["Pertanyaan Uji: Mengapa praktik menyalin-menempel (copy-pasting) angka hasil kalkulasi terminal secara manual ke dalam tabel naskah LaTe...","Petunjuk: Perhatikan potensi kesalahan manusia (human typo) dan desinkronisasi saat eksperimen diperbarui.","Solusi Kunci: Penyalinan manual rentan terhadap salah ketik (typo) dan menghasilkan desinkronisasi fatal. Jika di kemudian hari data d..."]}]}};export{a as CH46_LESSONS};
