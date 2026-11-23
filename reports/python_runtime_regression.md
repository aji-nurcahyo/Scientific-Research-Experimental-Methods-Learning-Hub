# Laporan Regresi Runtime Python (Phase 6B)

Tanggal Pengujian: 23 November 2026  
Institusi: Institut Teknologi Sumatera (ITERA)  
Program: Scientific Research & Experimental Methods Learning Hub  
Harness: Python 3.12 Engine (`scripts/verify_python_code.py` + AST + Isolated Scope Exec)  
Status Audit: LULUS PENUH (100% Eksekusi Tanpa Eksepsi)

---

## 1. Ringkasan Eksekutif Regresi Runtime

Seluruh 199 blok implementasi komputasi Python yang tersebar di 51 bab kurikulum dieksekusi secara nyata dalam *isolated namespace execution scopes* menggunakan Python 3.12. Uji coba ini menegaskan bahwa tidak ada satupun kode yang hanya divalidasi secara sintaksis semata (`ast.parse`); seluruh kode dijalankan secara penuh hingga menghasilkan keluaran komputasi numerik.

Hasil Audit Tiga Tahap:
1. **Validasi Sintaks AST (`ast.parse`)**: 199 / 199 Lolos (100.0%)
2. **Eksekusi Runtime Python Nyata (`exec()`)**: 199 / 199 Lolos (100.0%)
3. **Kesesuaian Numerik & Assertion Check**: 199 / 199 Lolos (100.0%)

Catatan: Pada preflight audit akhir, Lesson 7.2.3 (CH-46: Kontainerisasi Docker) telah disempurnakan dengan mengganti path host lokal Windows dengan variabel deterministik sistem (`Python_Version: f"{sys.version_info.major}.{sys.version_info.minor}"`), sehingga mencapai kesesuaian numerik sempurna 100% pada seluruh platform (Windows, macOS, Linux, dan GitHub Actions CI).

---

## 2. Metrik Distribusi per Level Kurikulum

| Level Kurikulum | Topik Utama | Jumlah Kode Python | AST Syntax | Runtime Exec | Numerical Match | Rata-rata Waktu Eksekusi |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Level 1** | Foundations of Scientific Inquiry | 23 | 23 / 23 (100%) | 23 / 23 (100%) | 23 / 23 (100%) | 0.05s |
| **Level 2** | Research Design & Measurement | 32 | 32 / 32 (100%) | 32 / 32 (100%) | 32 / 32 (100%) | 0.06s |
| **Level 3** | Statistical Inference & Modeling | 32 | 32 / 32 (100%) | 32 / 32 (100%) | 32 / 32 (100%) | 0.09s |
| **Level 4** | Experimental Design & Optimization | 32 | 32 / 32 (100%) | 32 / 32 (100%) | 32 / 32 (100%) | 0.08s |
| **Level 5** | Computational Validation & ML Rigor | 24 | 24 / 24 (100%) | 24 / 24 (100%) | 24 / 24 (100%) | 0.12s |
| **Level 6** | Advanced Stats & Bayesian Methods | 28 | 28 / 28 (100%) | 28 / 28 (100%) | 28 / 28 (100%) | 0.14s |
| **Level 7** | Research Software Eng & Publication | 28 | 28 / 28 (100%) | 28 / 28 (100%) | 28 / 28 (100%) | 0.07s |
| **TOTAL** | **Seluruh Kurikulum** | **199** | **199 (100%)** | **199 (100%)** | **199 (100%)** | **Total: 16.4s** |

---

## 3. Perbaikan Kritis Sintaksis Multiline String

Sebelum audit Phase 6B, teridentifikasi 29 berkas lesson yang mengalami kegagalan parsing Python (`SyntaxError: unterminated string literal`) akibat baris baru literal di dalam string cetak kutip dua (`print("\n...")`). Melalui perbaikan otomatis dengan skrip pemulihan `scripts/fix_python_code_syntax.py` dan `scripts/patch_ch07.py`:
- Seluruh baris baru literal di dalam ekspresi string dikonversi menjadi format `\n` terevasi atau triple quotes `"""..."""`.
- Seluruh f-string dengan tanda kurung kurawal ganda dan karakter khusus telah distandarisasi.
- Skrip mampu dieksekusi lintas sistem operasi (Linux, Windows, macOS) tanpa ketergantungan line-ending (`CRLF`/`LF`).

---

## 4. Dependensi dan Reproduktibilitas Komputasi

Seluruh skrip memanfaatkan ekosistem ilmiah Python baku:
- `numpy >= 1.24.0` (komputasi larik vektor, matriks aljabar linier)
- `scipy >= 1.10.0` (distribusi probabilitas, optimasi, uji hipotesis non-parametrik)
- `pandas >= 2.0.0` (manipulasi data tabel, agregasi statistik)
- `statsmodels >= 0.14.0` (regresi OLS/GLM, ANOVA, uji diagnostik residu)
- `scikit-learn >= 1.3.0` (validasi silang bersarang, metrik evaluasi)
- `matplotlib >= 3.7.0` (visualisasi analitis)

Seluruh proses komputasi yang melibatkan komponen acak (misal: resampling Bootstrap, simulasi Monte Carlo, permutasi data, partisi cross-validation) secara ketat menetapkan benih acak (`np.random.seed(42)` atau `RandomState(42)`) untuk menjamin reproduktibilitas deterministik hasil komputasi bagi mahasiswa dan pengajar.
