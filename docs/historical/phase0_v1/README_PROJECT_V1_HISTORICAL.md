# PROJECT LOG & GOVERNANCE
# Scientific Research & Experimental Methods Learning Hub

> **Project Name:** Scientific Research & Experimental Methods Learning Hub  
> **Subtitle:** From Scientific Thinking to Reproducible Research  
> **Institution:** Institut Teknologi Sumatera (ITERA)  
> **Project Creator:** Aji Pamungkas Tri Nurcahyo  
> **Workspace Path:** `D:\Workstation\Repo My Corses\Scientific Research & Experimental Methods`  
> **Current Project Phase:** Phase 0 (Master Curriculum & Academic Planning)  
> **Last Updated:** 2026-11-22

---

## 1. Project Overview & Governance Rules

Dokumen ini berfungsi sebagai buku catatan kerja internal (*internal logbook*), mesin status (*state machine*), dan panduan kontinuitas sesi antar AI assistant. Proyek ini dijalankan dengan tata kelola akademik dan teknis yang ketat.

### Aturan Tata Kelola Utama (Strict Governance Rules)

1. **Independent Project Boundary:** Proyek ini merupakan repositori independen. Dilarang mengubah, menimpa, atau memodifikasi file dari Learning Hub lain di luar workspace ini.
2. **Approval Gate Requirement:** Setiap transisi fase (Phase 0 hingga Phase 5) dan setiap batch penulisan konten memerlukan persetujuan eksplisit (*explicit approval*) dari Project Creator (Aji Pamungkas Tri Nurcahyo).
3. **No Unapproved Git Operations:** Dilarang melakukan `git commit`, `git push`, atau deployment ke server/GitHub Pages sebelum ada instruksi tertulis.
4. **Zero AI Slop Policy:** Mematuhi pedoman anti-slop:
   - Dilarang menggunakan tanda baca em dash (`—`) dalam teks naratif atau antarmuka; gunakan koma, titik, titik dua, atau tanda kurung.
   - Dilarang menggunakan kata klise pemasaran AI seperti "revolutionary", "cutting edge", "seamless", "powerful", "game changing".
   - Dilarang membuat angka statistik palsu atau testimonial fiktif.
   - Dilarang membuat data eksperimen palsu yang disamarkan seolah-olah data riil. Data sintetis wajib dilabeli `[SIMULASI/SYNTHETIC DATA]`.
5. **No Fabricated Citations:** Semua sitasi, judul buku, standar metrologi, dan DOI wajib terverifikasi secara akademik (e.g., Montgomery, Box Hunter & Hunter, Cohen, NIST, JCGM GUM, Gelman, Pearl).
6. **Separation of Concerns:** Memisahkan README publik (`README.md`) dari catatan kerja internal proyek (`README_PROJECT.md`).
7. **Baseline Control:** Setelah Master Curriculum pada Phase 0 disetujui, dokumen kurikulum menjadi baseline terkontrol. Tidak boleh ada penambahan atau pengubahan struktur chapter tanpa persetujuan.

---

## 2. State Machine & Implementation Phases

```
[Phase 0: Planning & Curriculum] (ACTIVE)
       │
       ▼ (Approval Gate 0: User Approval of Master Curriculum)
[Phase 1: Website Foundation & Academic Design System]
       │
       ▼ (Approval Gate 1: Verification of Shell, Math, & Layout)
[Phase 2: Core Curriculum Production (Batches 1-4)]
       │
       ▼ (Approval Gate 2: Content & Mathematical Review)
[Phase 3: Advanced Curriculum & Specialization Tracks]
       │
       ▼ (Approval Gate 3: Experimental Rigor Audit)
[Phase 4: Practical Labs, Templates & Reproducibility Audit]
       │
       ▼ (Approval Gate 4: Pipeline & Code Execution Verification)
[Phase 5: Public Deployment & Verification]
```

### Rincian Fase:

- **Phase 0: Master Curriculum & Academic Planning (Sedang Berjalan)**
  - Tinjauan kurikulum metodologi penelitian rekayasa dan sains.
  - Evaluasi kritis atas 28 chapter kandidat.
  - Penyusunan Master Curriculum: Core, Advanced, Specialization (S1 - S6), PhD Paths (R1 - R6).
  - Penyusunan katalog 13 Interactive Laboratories dan 14 Research Templates.
  - Desain arsitektur website dan rencana integrasi antar Learning Hub ITERA.
  - Deliverable: `docs/MASTER_CURRICULUM.md`, `README.md`, `README_PROJECT.md`.
  - Gate: Persetujuan Project Creator atas Master Curriculum.

- **Phase 1: Website Foundation & Academic Design System (Menunggu Gate 0)**
  - Setup static site builder kompatibel dengan GitHub Pages.
  - Implementasi tema akademik anti-slop (palet netral, tipografi berkecepatan baca tinggi, WCAG AA).
  - Integrasi rendering KaTeX untuk rumus matematika.
  - Struktur navigasi hierarkis (Core, Advanced, Specializations, PhD Paths, Labs, Templates).

- **Phase 2: Core Curriculum Production (Menunggu Gate 1)**
  - Batch 1: Level 1 (Chapters 1 - 7: Foundations of Scientific Research).
  - Batch 2: Level 2 (Chapters 8 - 14: Research Design & Data Collection).
  - Batch 3: Level 3 (Chapters 15 - 21: Statistical & Computational Analysis).
  - Batch 4: Level 4 (Chapters 22 - 28: Research Evaluation & Communication).

- **Phase 3: Advanced Curriculum & Specializations (Menunggu Gate 2)**
  - 17 Modul Advanced Experimental & Statistical Methods.
  - 6 Tracks Research Specializations (S1 - S6).

- **Phase 4: Practical Labs, Templates & Readiness (Menunggu Gate 3)**
  - 13 Modul Python Interactive Laboratory.
  - 14 Research Templates siap pakai.
  - Cross-reference audit dengan Learning Hub lain di ITERA.

- **Phase 5: Public Deployment (Menunggu Gate 4)**
  - Build verification, responsive check, link integrity check.
  - Persetujuan eksplisit untuk deploy ke GitHub Pages.

---

## 3. Architectural Decision Records (ADR)

### ADR-001: Pemisahan Core Curriculum, Advanced Methods, Specialization Tracks, dan PhD Paths
- **Konteks:** Kebutuhan pengguna terbagi menjadi tiga klaster (S1, Dosen/Peneliti, Persiapan S3). Menumpuk seluruh materi dalam satu alur linier akan membebani mahasiswa S1 atau mengorbankan kedalaman materi tingkat lanjut.
- **Keputusan:** Membagi kurikulum menjadi empat pilar independen namun saling terhubung melalui prerequisite graph.
- **Dampak:** Mahasiswa S1 dapat menyelesaikan Core Curriculum tanpa terintimidasi rumus Bayesian MCMC atau DoE faktorial fraksional, sementara calon mahasiswa S3 memiliki panduan terfokus pada novelty dan reproduksibilitas.

### ADR-002: Penolakan AI Slop dan Pengadopsian Desain Berorientasi Konten
- **Konteks:** Website edukasi buatan AI kerap menggunakan template bento grid, gradien ungu-biru, teks em dash berlebihan, dan animasi dekoratif yang tidak fungsional.
- **Keputusan:** Mengadopsi prinsip desain anti-slop: palet warna tenang berstandar rasio kontras WCAG AA (minimal 4.5:1), eliminasi em dash, tanpa animasi mengambang, serta tipografi proporsional untuk teks ilmiah dan blok kode.
- **Dampak:** Tampilan tampak berwibawa, serius, hemat bandwidth, dan ramah aksesibilitas.

### ADR-003: Pemilihan Arsitektur Statis untuk GitHub Pages dengan KaTeX
- **Konteks:** Learning Hub harus dapat diakses publik tanpa biaya langganan server (free tier), cepat diakses, dan mampu merender ratusan persamaan matematika LaTeX secara instan.
- **Keputusan:** Memilih arsitektur situs statis murni yang kompatibel penuh dengan GitHub Pages, menggunakan KaTeX untuk akselerasi rendering matematika sisi klien.
- **Dampak:** Biaya hosting nol, stabilitas tinggi, serta performa rendering matematika yang instan.

### ADR-004: Penegasan Batas "Statistical Significance" vs "Practical Significance"
- **Konteks:** Banyak publikasi rekayasa menyimpulkan keberhasilan hanya berdasarkan p-value < 0.05 tanpa memperhitungkan effect size atau ketidakpastian pengukuran.
- **Keputusan:** Semua modul statistik dan evaluasi eksperimen wajib membedakan secara tegas nilai p-value, ukuran efek (Cohen's d, partial eta-squared), interval kepercayaan (confidence intervals), dan ketidakpastian pengukuran (GUM).
- **Dampak:** Membentuk budaya berpikir ilmiah yang kokoh dan kebal terhadap perangkap p-hacking.

### ADR-005: Kebijakan Non-Duplikasi dengan Ekosistem Learning Hub ITERA Lainnya
- **Konteks:** ITERA memiliki repositori pembelajaran lain (Python, AI, IoT, Multimedia & CV, Signal Processing, Remote Sensing).
- **Keputusan:** Learning Hub ini membatasi diri pada perancangan riset, metodologi eksperimen, penanganan data, dan validasi ilmiah. Implementasi model machine learning atau pipeline computer vision mendalam diarahkan melalui tautan rujukan (*cross-reference*).
- **Dampak:** Fokus materi tetap murni pada metodologi ilmiah tanpa redundant content.

---

## 4. Phase 0 Progress Checklist

- [x] Verifikasi direktori workspace bersih dan tidak menimpa proyek lain.
- [x] Pembuatan `README.md` (dokumentasi publik institusional ITERA).
- [x] Pembuatan `README_PROJECT.md` (tata kelola internal, ADR, dan log fase).
- [x] Evaluasi kritis terhadap 28 kandidat chapter Core Curriculum.
- [x] Perumusan Master Curriculum lengkap (`docs/MASTER_CURRICULUM.md`):
  - [x] Core Research Curriculum (Level 1 - 4, 28 Chapters).
  - [x] Advanced Experimental & Statistical Methods (17 Modul).
  - [x] Research Specialization Tracks (S1 - S6).
  - [x] Research & PhD Learning Paths (R1 - R6).
  - [x] Practical Research Laboratories (13 Labs).
  - [x] Research Templates Inventory (14 Templates).
  - [x] Referensi Akademik Terverifikasi & Standar Pelaporan.
  - [x] Arsitektur Website & Integrasi Antar-Hub.
  - [x] Roadmap Fase & Approval Gates.
- [ ] Presentasi Master Curriculum kepada Project Creator untuk mendapatkan persetujuan (Gate 0).

---

## 5. Continuity Guide untuk Sesi Berikutnya

Jika sesi ini dijeda atau dilanjutkan pada sesi baru, asisten AI harus:
1. Membaca `README_PROJECT.md` untuk memahami status fase terakhir.
2. Memeriksa status persetujuan Gate 0 dari Project Creator:
   - Jika Gate 0 belum disetujui: Jangan memulai koding website atau penulisan materi chapter. Minta klarifikasi dan persetujuan.
   - Jika Gate 0 telah disetujui: Lanjutkan ke Phase 1 (Setup Website Foundation & Academic Design System).
3. Selalu mematuhi Zero AI Slop Policy (tanpa em dash, tanpa buzzwords, WCAG AA, data riil/simulasi berlabel).

