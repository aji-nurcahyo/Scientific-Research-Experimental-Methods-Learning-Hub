# Audit Fungsional 15 Modul Laboratorium Riset Komputasi

**Proyek:** Scientific Research & Experimental Methods Learning Hub  
**Institusi:** Institut Teknologi Sumatera (ITERA)  
**Pemilik Proyek:** Aji Pamungkas Tri Nurcahyo  
**Hasil Audit:** PASS (15 dari 15 Modul Lolos Pengujian)  
**Tanggal:** 23 November 2026  

---

## 1. Arsitektur Modul Laboratorium

Sistem menyediakan 15 modul laboratorium komputasi mandiri (`LAB-01` s.d. `LAB-15`) yang dirancang untuk mengonfirmasi prinsip-prinsip metodologi penelitian secara kuantitatif. Setiap laboratorium dilengkapi dengan:
- Berkas skrip Python mandiri di direktori `labs/` (`lab01_*.py` s.d. `lab15_*.py`).
- Antarmuka CLI fleksibel dengan argumen `--seed`, parameter iterasi, dan keluaran terstruktur.
- Simulator interaktif in-browser berbasis client-side JavaScript/KaTeX.
- Kriteria validasi ilmiah dan batas toleransi numerik eksplisit.

---

## 2. Hasil Eksekusi Mandiri (`scripts/verify_labs.py`)

Seluruh 15 berkas skrip Python telah diuji secara otomatis melalui runner audit laboratorium:

| Kode Lab | Berkas Skrip | Topik Metodologis | Durasi | Status Eksekusi |
| :--- | :--- | :--- | :--- | :--- |
| **LAB-01** | `lab01_nhst_pitfalls.py` | NHST Pitfalls & P-Value Misconceptions | 3.58s | **PASS** |
| **LAB-02** | `lab02_confidence_coverage.py` | Frequentist CI Coverage Probability | 0.97s | **PASS** |
| **LAB-03** | `lab03_power_analysis.py` | Statistical Power & Sample Size Planning | 2.99s | **PASS** |
| **LAB-04** | `lab04_berkson_bias.py` | Collider Stratification & Berkson Paradox | 0.86s | **PASS** |
| **LAB-05** | `lab05_gum_uncertainty.py` | ISO GUM Uncertainty Budget Calculation | 0.17s | **PASS** |
| **LAB-06** | `lab06_anova_decomposition.py` | ANOVA Sum of Squares Decomposition | 0.84s | **PASS** |
| **LAB-07** | `lab07_ols_diagnostics.py` | Classical OLS Gauss-Markov Diagnostics | 0.86s | **PASS** |
| **LAB-08** | `lab08_full_factorial_doe.py` | Full Factorial Design & Yates Algorithm | 0.14s | **PASS** |
| **LAB-09** | `lab09_nested_cv_leakage.py` | Nested Cross-Validation & Data Leakage | 0.18s | **PASS** |
| **LAB-10** | `lab10_demsar_algorithm_benchmarking.py` | Demšar Non-Parametric Multi-Classifier Benchmark | 0.88s | **PASS** |
| **LAB-11** | `lab11_systematic_ablation.py` | Systematic Multi-Factor Ablation Study | 0.84s | **PASS** |
| **LAB-12** | `lab12_bca_bootstrap.py` | BCa Non-Parametric Bootstrap Inference | 0.91s | **PASS** |
| **LAB-13** | `lab13_bayesian_mcmc.py` | Metropolis-Hastings MCMC Bayesian Sampling | 0.93s | **PASS** |
| **LAB-14** | `lab14_causal_pearl_backdoor.py` | Pearl Backdoor Criterion & Confounder Adjustment | 0.17s | **PASS** |
| **LAB-15** | `lab15_reproducibility_package.py` | Research Artifact Verification & Checksum Audit | 0.05s | **PASS** |

**Total Durasi Eksekusi:** 14.38 detik  
**Tingkat Kelulusan:** 15 / 15 Modul (100.0%)

---

## 3. Peningkatan Antarmuka Laboratorium (`LaboratoriesView.tsx`)

Berdasarkan hasil audit UI, antarmuka laboratorium telah diperkaya secara signifikan:
1. **Interactive In-Browser Simulators:**
   - **LAB-01:** Simulator Monte Carlo p-value dan inflasi kesalahan Tipe I akibat optional stopping.
   - **LAB-02:** Simulator cakupan interval kepercayaan Student-t (1.000 interval mandiri dengan visualisasi cakupan 90%, 95%, dan 99%).
   - **LAB-03:** Kalkulator Statistical Power dan penentuan ukuran sampel minimal a priori untuk dua kelompok independen.
   - **LAB-05:** Kalkulator uncertainty budget GUM menggabungkan Tipe A (presisi berulang) dan Tipe B (resolusi sensor + sertifikat kalibrasi pabrik).
2. **Penampil Kode & Arsitektur Python:**
   - Bagian implementasi komputasi menampilkan kode lengkap dari `src/data/labScriptsData.ts`.
   - Tombol "Salin Kode" dengan feedback visual.
   - Tombol "Unduh Script (.py)" yang mengekspor berkas Python langsung ke perangkat pengguna.
3. **Hasil yang Diharapkan & Kriteria Validasi:**
   - Menampilkan baseline hasil numerik dan kriteria pengujian ilmiah (misalnya Kolmogorov-Smirnov p > 0.05 untuk sebaran p-value di bawah H0).
4. **Latihan Eksperimental & Asesmen Mandiri:**
   - Menyajikan tantangan investigasi mandiri dan rubrik asesmen kompetensi peneliti.
