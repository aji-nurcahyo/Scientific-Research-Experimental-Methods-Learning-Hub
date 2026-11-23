# Laporan Verifikasi Saintifik & Komputasi: Evaluasi Numerik dan Validasi Kode

**Proyek:** Scientific Research & Experimental Methods Learning Hub  
**Institusi:** Institut Teknologi Sumatera (ITERA)  
**Pemilik Proyek:** Aji Pamungkas Tri Nurcahyo  
**Hasil Pengujian:** PASS (Tingkat Keberhasilan 100%)  
**Tanggal Eksekusi:** 23 November 2026  

---

## 1. Metodologi Pengujian Komputasi Mandiri

Untuk menjamin standar tertinggi integritas ilmiah dan mencegah angka fiktif (hallucinated data), repositori dilengkapi harness pengujian otomatis (`scripts/verify_python_code.py`). Harness ini bertugas:
1. Mengekstrak blok kode Python dari setiap contoh implementasi (`workedExample.pythonImplementation.code`) pada seluruh 204 lesson.
2. Melakukan audit sintaksis menggunakan modul `ast.parse`.
3. Mengeksekusi blok kode secara terisolasi pada lingkungan Python 3.12 lokal.
4. Memvalidasi bahwa seluruh keluaran numerik konsisten dengan ekspektasi ilmiah dan tidak memicu pengecualian runtime.

---

## 2. Ringkasan Eksekutif Hasil Audit Kode Lesson

```
================================================================================
SCIENTIFIC COMPUTATION VERIFICATION HARNESS
Validating Python code across all 51 chapters & 204 lessons
================================================================================
Total Lessons Processed  : 204
Lessons with Python Code : 199
Syntax Validation Passed : 199 / 199 (100.0%)
Syntax Validation Failed : 0 / 199   (0.0%)
Execution Passed         : 199 / 199 (100.0%)
Execution Failed         : 0 / 199   (0.0%)

STATUS: ALL PYTHON EXAMPLES EXECUTED SUCCESSFULLY WITH ZERO ERRORS!
================================================================================
```

*Catatan Distribusi:* Sebanyak 5 lesson pada Bab CH-01 s.d. CH-03 berfokus murni pada penalaran epistemologis, formalisasi deduktif-induktif, dan taksonomi logika ilmiah tanpa kalkulasi numerik; 199 lesson lainnya memuat modul komputasi Python lengkap.

---

## 3. Remediasi Masalah Teknis Komputasi

Selama siklus audit komprehensif, ditemukan dan diremediasi 3 anomali komputasi:
1. **NumPy 2.x Deprecation pada CH-39 (Lesson 6.2.1):**  
   - *Masalah:* Fungsi `np.trapz` dihapus secara permanen pada versi rilis NumPy 2.0+.  
   - *Remediasi:* Dimigrasikan ke `scipy.integrate.trapezoid` dengan fallback elegan ke `np.trapezoid` / `np.trapz`.
2. **Kutipan String Bertingkat pada CH-49 (Lesson 7.5.3):**  
   - *Masalah:* Kutipan tanda petik bersarang pada f-string template literal memicu syntax error.  
   - *Remediasi:* Direfaktor menjadi kutipan tunggal terstandardisasi `'comment'` yang valid secara sintaksis.
3. **Pembedaan Objek Hasil Indeks pada CH-27 (Lesson 4.4.1):**  
   - *Masalah:* Pustaka statsmodels `MixedLM` mengembalikan array parameter tanpa label kolom saat exog berformat matriks polos `np.ones(N)`, sehingga pemanggilan `.params['Intercept']` memicu `IndexError`.  
   - *Remediasi:* Diubah menjadi `float(np.asarray(result.params)[0])` dan penanganan matriks kovarians acak `float(np.asarray(result.cov_re)[0, 0])`, menjamin kompatibilitas universal baik saat objek berformat Pandas Series/DataFrame maupun NumPy ndarray.

---

## 4. Matriks Pustaka Saintifik Terverifikasi

Pengujian dijalankan pada lingkungan komputasi riil dengan tumpukan pustaka ilmiah:
- **Python:** Versi 3.12.1 (64-bit)
- **NumPy:** 2.2.6 (Komputasi larik terstruktur, dekomposisi matriks, generator seed)
- **SciPy:** 1.15.2 (Distribusi probabilitas, uji parametrik dan non-parametrik, optimasi kuadratik)
- **Pandas:** 2.2.3 (Manipulasi data frames, data longitudinal format panjang, agregasi)
- **Scikit-Learn:** 1.6.1 (Nested cross-validation, standard scaler, PCA, random forest, logistic regression)
- **Statsmodels:** 0.14.4 (OLS regression, MixedLM random intercept, Poisson/Negative Binomial GLM)

---

## 5. Kepatuhan Pelabelan Data Sintetis

Sesuai Aturan Permanen R-01 (Mandatory Synthetic / Lab Data Labeling):
- 100% keluaran skrip dan dataset simulasi diberi penanda eksplisit `[SIMULASI/SYNTHETIC DATA]` atau `[LAB BENCHMARK]`.
- Tidak ada klaim empiris semu yang disajikan sebagai data fisik riil tanpa dokumentasi setup alat ukur atau pembangkitan pseudorandom terkontrol.
