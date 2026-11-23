# PERMANENT ACADEMIC & QUALITY STANDARDS
## Scientific Research & Experimental Methods Learning Hub
### Institut Teknologi Sumatera (ITERA)

> **Dokumen Status:** Permanent Policy Baseline (Berlaku Permanen untuk Seluruh Sesi)  
> **Klasifikasi:** Quality Assurance, Anti-Slop, Language & Typography Hygiene  
> **Penyusun:** Aji Pamungkas Tri Nurcahyo  
> **Tanggal:** 22 November 2026

---

## 1. PENDAHULUAN DAN RUANG LINGKUP

Dokumen ini memuat standar permanen yang mengikat seluruh proses perencanaan, penulisan konten, desain visual, implementasi komputasi, dan evaluasi kualitas pada *Scientific Research & Experimental Methods Learning Hub*. Standar ini berlaku bagi seluruh asisten AI dan pengembang manusia pada sesi saat ini maupun sesi mendatang.

---

## 2. KERANGKA PENJAMINAN MUTU (15 QUALITY GATES)

Setiap materi yang diproduksi wajib melalui audit kepatuhan terhadap 15 kriteria kualitas terukur (*Quality Gates*). Status pengujian wajib dicatat secara jujur: `NOT TESTED`, `PENDING`, `REJECTED`, atau `PASS` (hanya jika bukti verifikasi objektif telah dipenuhi).

| Gate ID | Dimensi Kualitas | Kriteria Keberterimaan Terukur (*Acceptance Criteria*) |
| :--- | :--- | :--- |
| **QG-01** | **Academic Completeness** | Seluruh 15 elemen chapter wajib (Tujuan s.d. PDF Export) hadir lengkap tanpa bagian yang dikosongkan. |
| **QG-02** | **Competency Alignment** | Seluruh learning outcomes menggunakan kata kerja operasional teramati yang selaras dengan taksonomi Bloom revisi dan memetakan Competency ID. |
| **QG-03** | **Prerequisite Consistency** | Graf prasyarat bebas dari dependensi melingkar (*no circular dependencies*) dan diverifikasi secara topologis. |
| **QG-04** | **Mathematical Correctness** | Seluruh persamaan matematika memiliki penurunan rumus formal, definisi variabel eksplisit, dan indeks dimensi yang konsisten. |
| **QG-05** | **Statistical Validity** | Membedakan secara tegas antara p-value, effect size, confidence intervals, dan signifikansi praktis. Bebas dari penalaran p-hacking. |
| **QG-06** | **Methodological Validity** | Mengidentifikasi ancaman validitas internal/eksternal dan mengendalikan variabel perancu pada setiap desain perlakuan. |
| **QG-07** | **Scientific Reference Verification** | Seluruh sitasi merujuk pada standar formal (ISO/GUM), buku teks kanonikal, atau artikel jurnal peer-reviewed yang dapat diverifikasi (bebas sitasi fiktif). |
| **QG-08** | **Computational Correctness** | Seluruh kode Python dapat dieksekusi tanpa error pada lingkungan Python 3.10+ dengan pustaka ilmiah standar (`numpy`, `scipy`, `statsmodels`, `scikit-learn`). |
| **QG-09** | **Experiment Reproducibility** | Angka keluaran simulasi atau eksperimen dapat direproduksi ulang dengan seed pseudorandom terkontrol dalam batas toleransi numerik terdefinisi. |
| **QG-10** | **Pedagogical Progression** | Struktur materi beralih secara logis dari konsep intuitif, formulasi formal, contoh hitungan manual, hingga implementasi komputasi. |
| **QG-11** | **Language Consistency** | Bahasa Indonesia akademik baku yang natural dengan istilah teknis bahasa Inggris mapan; bebas kalimat canggung atau alih-kode sembarangan. |
| **QG-12** | **Anti-AI-Slop Compliance** | Bebas tanda baca em dash (`—`), bebas jargon pemasaran AI, bebas elemen dekoratif mengambang, dan berorientasi substansi ilmiah. |
| **QG-13** | **Typography & Symbol Hygiene** | Bebas dari artefak Markdown mentah, bebas simbol Unicode dekoratif, rendering rumus KaTeX sempurna tanpa teks terpotong. |
| **QG-14** | **Website Accessibility** | Rasio kontras teks minimal 4.5:1 (WCAG AA), navigasi keyboard penuh, target sentuh minimal 44px, bebas overflow horizontal. |
| **QG-15** | **Slides & PDF Export Quality** | Dokumen cetak bersih tanpa elemen navigasi website, pemotongan halaman rapi (`page-break`), dan tata letak tabel proporsional. |

---

## 3. PERMANENT ANTI-AI-SLOP POLICY

Diadaptasikan secara kritis dari prinsip [anti-slop](https://github.com/miqdadbadjuber/anti-slop) untuk platform edukasi ilmiah berbobot tinggi.

### A. Larangan Keras (Hard Gates)
1. **Dilarang Menggunakan Tanda Baca Em Dash (`—`):**
   Seluruh teks naratif, antarmuka, slide, template, dan dokumentasi dilarang menggunakan karakter em dash. Gunakan koma, titik, titik dua, atau tanda kurung. (Pengecualian hanya untuk rumus matematika minus atau tanda hubung tanda kata ganda).
2. **Dilarang Menggunakan Kata Klise Pemasaran AI:**
   Dilarang menggunakan kata-kata superlatif tak berbukti seperti: "revolutionary", "game-changing", "cutting-edge", "seamless", "powerful", "effortless", "state-of-the-art" (kecuali merujuk istilah teknis perbandingan SOTA), dan "next-generation".
3. **Dilarang Mengarang Data Statistik & Testimonial:**
   Dilarang menampilkan angka statistik tiruan (misal: "digunakan oleh 10.000+ peneliti") atau testimonial pengguna fiktif.
4. **Dilarang Menyamarkan Data Sintetis:**
   Data yang dibangkitkan secara komputasi wajib dilabeli secara eksplisit `[SIMULASI/SYNTHETIC DATA]`. Dilarang menampilkan data simulasi seolah-olah data observasi laboratorium riil.
5. **Dilarang Menyediakan Dead Controls:**
   Seluruh tombol, tab, tautan, dan form interaktif wajib berfungsi nyata atau dihilangkan dari antarmuka.

### B. Prinsip Desain Berorientasi Tujuan (Purpose-Driven Design)
Sebelum menambahkan elemen visual, antarmuka wajib lulus **Uji Tujuan**:
- *Warna:* Maksimal 2-3 warna inti netral + 1 warna aksen fungsional. Dilarang menggunakan gradien ungu-biru, radial orb, atau efek glow berlebihan.
- *Layout:* Struktur halaman dibangun berdasarkan kebutuhan konten akademik, bukan template bento grid atau landing page pemasaran.
- *Elemen Dekoratif:* Dilarang menggunakan animasi mengambang (*floating animations*), ikon terminal palsu di hero section, atau badge kapsul dekoratif tanpa fungsi status nyata.

---

## 4. PERMANENT LANGUAGE POLICY

### A. Bahasa Utama
Bahasa pengantar utama adalah **Bahasa Indonesia akademik yang natural, presisi, dan bermartabat**.

### B. Penggunaan Istilah Teknis Bahasa Inggris Terpilih
Istilah teknis ilmiah yang telah mapan secara internasional dipertahankan dalam bahasa Inggris aslinya untuk menjaga ketepatan makna dan mencegah kerancuan konseptual:
- *Research design, research gap, scientific reasoning.*
- *Dataset, ground truth, baseline, benchmark.*
- *Data leakage, cross-validation, ablation study.*
- *Reproducibility, replicability, repeatability.*
- *Statistical power, effect size, confidence interval, p-value.*
- *Virtual environment, pipeline, module, package.*
- *Design of Experiments, blocking, randomization, full factorial.*
- *Uncertainty quantification, sensitivity analysis, outlier.*

### C. Batasan Penulisan
- Dilarang menerjemahkan istilah teknis mapan secara harfiah jika menghasilkan kata yang canggung (misal: jangan menerjemahkan *ground truth* menjadi "kebenaran darat", atau *data leakage* menjadi "bocoran data").
- Dilarang memaksakan istilah bahasa Inggris untuk kata-kata umum yang memiliki padanan bahasa Indonesia yang lugas dan tepat.
- Gunakan bahasa Inggris akademik yang alami dan elegan saat menyusun contoh abstrak, kutipan naskah, atau berkas referensi berbahasa Inggris.

---

## 5. TYPOGRAPHY AND SYMBOL HYGIENE

Seluruh materi wajib bebas dari artefak penulisan dan polusi simbol:
1. **Bebas Emoji Dekoratif:** Dilarang menyisipkan emoji visual dalam materi akademik, slide, atau template.
2. **Bebas Artefak Markdown:** Dilarang membiarkan karakter sintaks mentah seperti `####`, `**`, atau baris pemisah tak beraturan muncul sebagai teks biasa di browser.
3. **Bebas Tanda Dolar Mentah:** Karakter literal `$` wajib di-escape sebagai `\$` dalam teks naratif agar tidak terurai sebagai blok matematika LaTeX yang rusak.
4. **Rendering Matematika Sempurna:** Seluruh ekspresi matematis wajib menggunakan sintaks KaTeX yang valid:
   - Inline math: `\( ... \)` atau `$ ... $`.
   - Display math: `\[ ... \]` atau `$$ ... $$` pada baris mandiri.
5. **Kebersihan Notasi Ilmiah:** Notasi ilmiah sah (huruf Yunani $\alpha, \beta, \sigma, \mu$, operator diferensial, integral, superskrip, subskrip) wajib dipertahankan secara akurat dalam lingkungan rendering matematika formal.

