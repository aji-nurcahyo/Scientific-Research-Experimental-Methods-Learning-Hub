# Audit Akademik Menyeluruh: Kedalaman Konten, Taksonomi Bloom & Integritas Ilmiah

**Proyek:** Scientific Research & Experimental Methods Learning Hub  
**Institusi:** Institut Teknologi Sumatera (ITERA)  
**Pemilik Proyek:** Aji Pamungkas Tri Nurcahyo  
**Hasil Audit Akademik:** PASS (LULUS SEMPURNA)  
**Tanggal:** 23 November 2026  

---

## 1. Verifikasi Anatomi Akademik 10 Bagian

Sesuai Aturan Permanen Kurikulum v2.0, setiap lesson wajib memiliki 10 elemen esensial:
1. `id` dan metadata bab yang valid.
2. `title` eksplisit tanpa singkatan kabur.
3. `learningObjectives` (minimal 3 sasaran kompetensi per lesson).
4. `readingTimeMinutes` (estimasi realistis 15-25 menit).
5. `content` komprehensif (teori, asumsi, derivasi matematis, interpretasi fisik).
6. `workedExample` lengkap (masalah rekayasa, formulasi matematis, implementasi Python, interpretasi substantif hasil).
7. `commonPitfalls` (minimal 3 kesalahan metodologis atau analisis umum).
8. `validationProcedures` (langkah verifikasi pre-flight, diagnostik, dan audit).
9. `exercises` dengan pertanyaan konseptual/numerik dan panduan solusi.
10. `references` kredibel (buku teks kanonikal atau artikel peer-reviewed bereputasi).
11. `slides` (2-4 slide pengajaran dengan ringkasan poin dan rumus inti).

### Hasil Pemeriksaan Otomatis (`validate_curriculum.py`):
- **Total Pelajaran Diperiksa:** 204 dari 204 Lessons.
- **Kepatuhan Anatomi 10 Bagian:** **100.0% (204 / 204)**.
- **Status:** Seluruh berkas `src/lessons/ch01.ts` hingga `ch51.ts` lolos audit struktural tanpa satupun entri placeholder atau draf rintisan (*stub*).

---

## 2. Cakupan Taksonomi Bloom

Kurikulum didesain secara sengaja untuk mengantarkan pembelajar dari tingkat kognitif dasar hingga tingkat evaluasi dan kreasi riset tingkat tinggi:
- **Remembering & Understanding (Tingkat 1-2):**  
  CH-01 s.d. CH-15: Fondasi filosofis sains, validitas internal-eksternal, teori pengukuran, dan arsitektur data rekayasa.
- **Applying & Analyzing (Tingkat 3-4):**  
  CH-16 s.d. CH-31: Penerapan uji hipotesis klasik, pemodelan OLS/GLM, perancangan faktorial DoE, model campuran hierarkis, dan diagnostik residual.
- **Evaluating & Creating (Tingkat 5-7):**  
  CH-32 s.d. CH-51: Deteksi kebocoran data (*data leakage*), perancangan benchmark multi-dataset berbasis uji Demšar, inferensi Bayesian MCMC, penalaran kausal do-calculus Pearl, struktur paket riset mandiri (*reproducibility package*), serta strategi sanggahan ulasan reviewer jurnal bereputasi.

---

## 3. Integritas Sitasi & Referensi Akademik

Repositori mengompilasi lebih dari 400 referensi literatur ilmiah yang mencakup karya-karya klasik dan mutakhir:
- **Buku Teks Kanonikal:** Montgomery (Design of Experiments), Box, Hunter & Hunter (Statistics for Experimenters), Pearl (Causality), Gelman et al. (Bayesian Data Analysis), Snijders & Bosker (Multilevel Analysis), Demšar (Statistical Comparisons of Classifiers), ISO/IEC Guide 98-3 (GUM).
- **Publikasi Peer-Reviewed Terkemuka:** Artikel dari Journal of the American Statistical Association (JASA), Biometrika, Nature Methods, IEEE Transactions, ACM Computing Surveys, dan Journal of Machine Learning Research (JMLR).

---

## 4. Jalur Pembelajaran Terspesialisasi (10 Specialization Paths)

Tersedia 10 Learning Paths terverifikasi (`LP-01` s.d. `LP-10`) yang memandu peneliti sesuai profil riset masing-masing:
1. `LP-01`: Fondasi Penelitian Sarjana (S1 Skripsi/Tugas Akhir)
2. `LP-02`: Riset Rekayasa Eksperimental & Laboratorium Fisik
3. `LP-03`: Sains Komputasi & Rekayasa Perangkat Lunak Riset
4. `LP-04`: Penilaian Kinerja & Benchmark Machine Learning / AI
5. `LP-05`: Analisis Data Statistik Lanjut & Pemodelan Rekayasa
6. `LP-06`: Metodologi Riset Persiapan Doktor (PhD Preparation)
7. `LP-07`: Inferensi Kausal & Pemodelan Struktural Sistem
8. `LP-08`: Optimasi Proses Industri & Response Surface Methodology
9. `LP-09`: Pengukuran Presisi & Metrologi Rekayasa Terstandarisasi
10. `LP-10`: Integritas Ilmiah, Replikasi & Publikasi Bereputasi
