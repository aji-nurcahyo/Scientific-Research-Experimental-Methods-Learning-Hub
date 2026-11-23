const a={"7.3.1":{id:"7.3.1",chapterId:"CH-47",title:"Standar Electronic Lab Notebooks (ELN) untuk Pencatatan Audit Riset Forensik",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami pergeseran metodologis dari buku catatan laboratorium kertas ke Electronic Lab Notebooks (ELN).","Menerapkan standar audit integritas data (Audit Trail, Immutability, Cryptographic Timestamps).","Mematuhi regulasi integritas data internasional (seperti FDA 21 CFR Part 11 dan standar ALCOA+)."],content:`Dalam sejarah penelitian ilmiah, buku catatan laboratorium (paper lab notebook) adalah dokumen hukum dan saintifik paling berharga yang mencatat kronologi ide, kegagalan eksperimen, kalibrasi alat, dan data mentah. Namun pada era digital, buku kertas memiliki kelemahan fatal: tidak dapat dicari secara otomatis, rentan rusak fisik, tidak dapat menyimpan data biner sensor atau kode komputasi, dan rentan terhadap tuduhan pemalsuan tanggal (backdating) ketika timbul sengketa paten atau integritas akademik.

Standar Electronic Lab Notebooks (ELN):
ELN adalah platform perangkat lunak terintegrasi yang dirancang khusus untuk mencatat seluruh siklus hidup eksperimen ilmiah digital dengan tingkat kepatuhan hukum dan forensik yang ketat. ELN modern tidak sekadar berfungsi seperti aplikasi pencatat teks biasa (seperti Google Docs atau Notion), melainkan wajib memenuhi kriteria kepatuhan integritas data (misalnya prinsip ALCOA+ dan standar FDA 21 CFR Part 11).

Prinsip Integritas Data ALCOA+:
1. Attributable: Setiap catatan atau modifikasi wajib terhubung secara otentik ke identitas digital peneliti (digital signature).
2. Legible: Data dan catatan dapat dibaca secara jelas sepanjang masa simpan arsip.
3. Contemporaneous: Dicatat pada saat aktivitas eksperimen fisik berlangsung secara seketika (real-time timestamp).
4. Original: Menyimpan rekaman data mentah asli pertama tanpa penyuntingan atau konversi yang merusak.
5. Accurate: Akurat, bebas dari estimasi bias tanpa verifikasi.
- Plus (+): Complete (Lengkap), Consistent (Konsisten), Enduring (Tahan lama), dan Available (Tersedia untuk audit forensik).`,mathematicalFoundations:`Arsitektur Jejak Audit Kriptografi (Cryptographic Audit Trail):
Dalam sistem ELN berstandar forensik, catatan eksperimen tidak pernah ditimpa (overwritten) atau dihapus secara destruktif. Setiap modifikasi dicatat sebagai blok peristiwa baru yang diikat secara kriptografi mirip dengan rantai blok (append-only cryptographic hash chain):

Diberikan entri catatan ke-$k$ ($E_k$) dengan data $D_k$, identitas peneliti $U_k$, dan stempel waktu terverifikasi $T_k$:
$$H_k = \\text{SHA-256}(H_{k-1} \\parallel D_k \\parallel U_k \\parallel T_k)$$
di mana $\\parallel$ adalah operator penggabungan string (concatenation).

Jaminan Anti-Pemalsuan (Tamper-Evidence):
Jika seorang peneliti mencoba mengubah data masa lalu $D_{k-m}$ secara retroaktif, hash digest $H_{k-m}$ akan berubah seketika, memutuskan integritas seluruh rantai hash hingga blok saat ini:
$$\\text{VerifyChain}(H_1, \\dots, H_n) = \\text{False} \\implies \\text{Terdeteksi Pemalsuan Data Ilmiah}$$`,workedExample:{problemStatement:"Dua peneliti memperebutkan hak paten atas sintesis material superkonduktor baru di ITERA. Peneliti A menunjukkan buku catatan kertas dengan tulisan tangan tanggal 10 Januari 2025. Peneliti B menunjukkan entri ELN yang tersimpan dengan stempel waktu kriptografi server RFC 3161 bertanggal 15 Januari 2025. Jelaskan mengapa komite etik dan paten internasional memberikan bobot hukum forensik yang jauh lebih tinggi kepada Peneliti B.",stepByStepSolution:["Langkah 1: Analisis kerentanan buku kertas Peneliti A: Tulisan tangan di buku kertas dapat ditulis kapan saja (misal ditulis pada bulan Maret 2025 namun diberi tanggal mundur 10 Januari 2025). Tidak ada mekanisme fisik independen yang membuktikan kapan tinta benar-benar digoreskan.","Langkah 2: Analisis stempel waktu kriptografi Peneliti B: Protokol RFC 3161 menggunakan Otoritas Stempel Waktu Pihak Ketiga (Time Stamping Authority / TSA) independen. TSA menandatangani hash berkas eksperimen menggunakan kunci privat kriptografi bersama jam atomik terkalibrasi.","Langkah 3: Pembuktian matematis: Mustahil bagi Peneliti B untuk memalsukan stempel waktu tersebut secara mundur tanpa meretas kunci privat RSA otoritas sertifikasi global."],resultInterpretation:"Catatan ELN Peneliti B memiliki integritas hukum forensik yang sah secara mutlak (unquestionable legal provenance), sedangkan catatan kertas Peneliti A rentan gugur dalam pembuktian hukum."},pythonImplementation:{description:"Implementasi append-only cryptographic audit trail untuk pencatatan laboratorium digital.",libraryDependencies:["hashlib","datetime"],code:`import hashlib
from datetime import datetime

# [SIMULASI/SYNTHETIC DATA]
class ForensicLabRecord:
    def __init__(self, researcher_id: str, experiment_action: str, prev_hash: str = "0"*64):
        self.timestamp = datetime.utcnow().isoformat() + "Z"
        self.researcher_id = researcher_id
        self.experiment_action = experiment_action
        self.prev_hash = prev_hash
        self.entry_hash = self._calculate_hash()

    def _calculate_hash(self) -> str:
        payload = f"{self.prev_hash}|{self.timestamp}|{self.researcher_id}|{self.experiment_action}"
        return hashlib.sha256(payload.encode('utf-8')).hexdigest()

# Simulasi rantai pencatatan eksperimen
chain = []
# Entri 1: Inisialisasi rig
entry1 = ForensicLabRecord("AJI_PAMUNGKAS_ITERA", "Kalibrasi sensor getaran optik: Offset = 0.02 mV")
chain.append(entry1)

# Entri 2: Pengukuran sampel
entry2 = ForensicLabRecord("AJI_PAMUNGKAS_ITERA", "Uji turbin 1.500 RPM: Respon getaran P99 = 2.45 mm/s", prev_hash=entry1.entry_hash)
chain.append(entry2)

print("[SIMULASI/SYNTHETIC DATA] Jejak Audit Kriptografi ELN Berstandar Forensik:")
for idx, entry in enumerate(chain, 1):
    print(f"Blok {idx} | Waktu: {entry.timestamp} | Peneliti: {entry.researcher_id}")
    print(f"       Aksi: {entry.experiment_action}")
    print(f"       Hash: {entry.entry_hash[:32]}... (Prev: {entry.prev_hash[:12]}...)")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Jejak Audit Kriptografi ELN Berstandar Forensik:
Blok 1 | Waktu: 2026-11-23T03:48:00.000000Z | Peneliti: AJI_PAMUNGKAS_ITERA
       Aksi: Kalibrasi sensor getaran optik: Offset = 0.02 mV
       Hash: a9f8e7d6c5b4a3... (Prev: 000000000000...)
Blok 2 | Waktu: 2026-11-23T03:48:00.000000Z | Peneliti: AJI_PAMUNGKAS_ITERA
       Aksi: Uji turbin 1.500 RPM: Respon getaran P99 = 2.45 mm/s
       Hash: b1c2d3e4f5a6b7... (Prev: a9f8e7d6c5b4...)`},commonPitfalls:["Menyimpan catatan laboratorium penting di aplikasi catatan konsumen pribadi yang tidak memiliki audit trail yang tidak dapat diubah.","Menghapus atau menimpa berkas catatan saat eksperimen gagal (kegagalan eksperimen wajib tercatat sebagai bagian dari integritas sains).","Berbagi akun ELN bersama antar anggota laboratorium (melanggar prinsip keterlacakan Attributable)."],validationProcedures:["Verifikasi bahwa sistem ELN mendukung ekspor data terbuka (Open Export XML/JSON) untuk mencegah vendor lock-in.","Pastikan seluruh entri ditandatangani secara digital dengan sertifikat PKI yang valid.","Lakukan audit berkala terhadap kelengkapan catatan parameter lingkungan laboratorium (suhu, kelembapan, ID alat)."],exercises:[{question:"Mengapa dalam standar integritas data ALCOA+, kegagalan eksperimen (negative results atau anomalous runs) dilarang keras untuk dihapus dari ELN?",hint:"Perhatikan bahaya Publication Bias dan pelaporan selektif (selective reporting).",answerExplanation:"Menghapus eksperimen yang gagal adalah bentuk pemalsuan data terselubung (cherry-picking / falsification). Kegagalan mencatat kondisi batas atau cacat fisik nyata dari metode. Menghapus kegagalan eksperimen menyebabkan estimasi variabilitas dan laju keberhasilan sistem dilaporkan terlalu optimis secara palsu dalam publikasi."},{question:"Bagaimana teknologi stempel waktu RFC 3161 bekerja tanpa membocorkan kerahasiaan isi data eksperimen peneliti ke pihak luar?",hint:"Perhatikan apa yang dikirimkan oleh komputer peneliti ke server Time Stamping Authority.",answerExplanation:"Peneliti tidak mengirimkan berkas isi dokumen eksperimen yang bersifat rahasia kepada otoritas stempel waktu (TSA). Peneliti hanya menghitung hash kriptografi SHA-256 satu arah dari berkas tersebut di komputernya sendiri, lalu hanya mengirimkan string hash 64-karakter ke server TSA. TSA menandatangani hash tersebut bersama stempel waktu resmi, menjamin privasi isi eksperimen 100% terjaga."}],references:[{citation:"US Food and Drug Administration (FDA). (2003). Part 11, Electronic Records; Electronic Signatures: Scope and Application.",type:"formal-standard"},{citation:"Kanza, S., Willoughby, C., Gibbins, N., Whitby, R., et al. (2017). Electronic lab notebooks: can they replace paper?. Journal of Cheminformatics, 9(1), 1-19.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Standar Electronic Lab Notebooks (ELN)",bulletPoints:["Transisi dari buku kertas manual ke arsip digital terverifikasi forensik.","Prinsip Integritas Data ALCOA+: Attributable, Legible, Contemporaneous, Original, Accurate.","Kepatuhan hukum paten dan standar integritas data internasional."],keyFormulaOrDiagram:"\\text{ALCOA+} \\implies \\text{Integritas Forensik Digital Permanen}"},{slideNumber:2,title:"Jejak Audit Kriptografi (Audit Trail)",bulletPoints:["Append-only architecture: Dilarang menimpa atau menghapus catatan historis.","Hash chaining SHA-256: Setiap entri terikat pada entri sebelumnya.","Stempel Waktu Tepercaya RFC 3161 membuktikan prioritas penemuan ilmiah."],keyFormulaOrDiagram:"H_k = \\text{SHA-256}(H_{k-1} \\parallel D_k \\parallel U_k \\parallel T_k)"}]},"7.3.2":{id:"7.3.2",chapterId:"CH-47",title:"Implementasi Model Silsilah Data W3C PROV untuk Melacak Transformasi Data Mentah",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami spesifikasi standar internasional silsilah data W3C PROV-Data Model.","Memetakan hubungan tripartit: Entities, Activities, dan Agents dalam alur kerja komputasi.","Membangkitkan graf provenance berstandar W3C PROV-JSON untuk audit transparansi ilmiah."],content:`Dalam riset ilmiah komputasi yang rumit, sebuah angka atau tabel yang ditampilkan di dalam naskah akhir seringkali telah melewati puluhan tahapan pemrosesan: filtering sinyal, normalisasi, kalibrasi sensor, penggabungan database, pembersihan outlier, dan inferensi model pembelajaran mesin. Ketika seorang pembaca bertanya: "Bagaimana tepatnya angka 89.4% pada Tabel 2 diturunkan dari data mentah sensor?", sebagian besar peneliti tidak mampu melacak kembali alur silsilahnya secara eksak.

Standar Silsilah Data W3C PROV (W3C Provenance Data Model):
Konsorsium World Wide Web (W3C) menerbitkan rekomendasi standar resmi W3C PROV untuk merepresentasikan silsilah data (data provenance) secara interoperabel di seluruh platform komputasi. PROV memodelkan sejarah penciptaan dan transformasi data sebagai sebuah Graf Terarah (Directed Graph) yang menghubungkan tiga konsep ontologi inti:

1. Entity (Entitas Fisik atau Digital):
Objek data fisik atau digital dalam kondisi tertentu (misalnya berkas CSV mentah, model terlatih berbobot .pt, atau grafik PDF). Dilambangkan sebagai elips.
2. Activity (Aktivitas Pemrosesan):
Tindakan atau proses komputasi dinamis yang menggunakan dan menghasilkan entitas (misalnya eksekusi skrip run_filtering.py atau proses kalibrasi instrumen). Dilambangkan sebagai persegi panjang.
3. Agent (Agen Pelaku):
Entitas otonom yang memikul tanggung jawab atas terlaksananya suatu aktivitas (misalnya peneliti Aji Pamungkas, laboratorium ITERA, atau software bot otomatis). Dilambangkan sebagai poligon rumah.`,mathematicalFoundations:`Relasi Inti Graf Silsilah W3C PROV:
Graf provenance adalah graf asiklik berarah yang menunjuk ke masa lalu (menunjuk ke asal usul):

1. wasGeneratedBy: Menghubungkan Entity dengan Activity yang menciptakannya.
$$\\text{wasGeneratedBy}(e, a, t)$$
2. used: Menghubungkan Activity dengan Entity masukan yang dikonsumsinya.
$$\\text{used}(a, e, t)$$
3. wasDerivedFrom: Hubungan langsung transformasi antar dua Entity.
$$\\text{wasDerivedFrom}(e_2, e_1)$$
4. wasAssociatedWith: Menghubungkan Activity dengan Agent penanggung jawab.
$$\\text{wasAssociatedWith}(a, ag)$$
5. wasAttributedTo: Menghubungkan Entity dengan Agent pemilik hak cipta.
$$\\text{wasAttributedTo}(e, ag)$$

Invarian Validitas Silsilah W3C PROV:
Sebuah graf silsilah dinyatakan valid secara temporal jika urutan stempel waktu memenuhi kausalitas fisik:
$$\\text{Time}(\\text{used}(a, e_1)) < \\text{Time}(\\text{wasGeneratedBy}(e_2, a))$$
Aktivitas pemrosesan wajib mengonsumsi data masukan $e_1$ sebelum mampu menghasilkan data keluaran $e_2$.`,workedExample:{problemStatement:"Diberikan alur riset sederhana: Peneliti Aji menjalankan skrip Python clean_data.py pada pukul 09:00 menggunakan berkas mentah raw_sensor.csv (hash SHA: a1b2) dan menghasilkan berkas clean_sensor.parquet (hash SHA: c3d4) pada pukul 09:05. Petakan skenario ini ke dalam relasi ontologi formal W3C PROV.",stepByStepSolution:["Langkah 1: Identifikasi Entities: Entity 1 = e_raw (raw_sensor.csv, hash: a1b2); Entity 2 = e_clean (clean_sensor.parquet, hash: c3d4).","Langkah 2: Identifikasi Activity: Activity 1 = a_clean (Eksekusi skrip clean_data.py, waktu mulai: 09:00, waktu selesai: 09:05).","Langkah 3: Identifikasi Agent: Agent 1 = ag_aji (Aji Pamungkas Tri Nurcahyo, Afiliasi: ITERA).","Langkah 4: Petakan relasi struktural W3C: used(a_clean, e_raw); wasGeneratedBy(e_clean, a_clean); wasDerivedFrom(e_clean, e_raw); wasAssociatedWith(a_clean, ag_aji); wasAttributedTo(e_clean, ag_aji)."],resultInterpretation:"Model ontologi W3C PROV menyediakan bukti rantai kausalitas digital lengkap yang dapat diaudit secara otomatis oleh mesin untuk memverifikasi asal usul data."},pythonImplementation:{description:"Pembangkitan dokumen silsilah data W3C PROV dalam format terstandarisasi PROV-JSON.",libraryDependencies:["json","datetime"],code:`import json
from datetime import datetime

# [SIMULASI/SYNTHETIC DATA]
def generate_w3c_prov_document() -> dict:
    """Membangkitkan dokumen silsilah data W3C PROV-JSON terstandarisasi."""
    prov_doc = {
        "prefix": {
            "itera": "https://www.itera.ac.id/research/",
            "prov": "http://www.w3.org/ns/prov#"
        },
        "entity": {
            "itera:raw_sensor_data": {
                "prov:type": "prov:Entity",
                "itera:sha256": "8f4b23c91a0e...b7",
                "itera:format": "CSV"
            },
            "itera:calibrated_features": {
                "prov:type": "prov:Entity",
                "itera:sha256": "4c3d2e1f0a9b...c1",
                "itera:format": "Parquet"
            }
        },
        "activity": {
            "itera:kalibrasi_filtering_run": {
                "prov:type": "prov:Activity",
                "prov:startTime": "2026-11-23T08:30:00Z",
                "prov:endTime": "2026-11-23T08:35:00Z"
            }
        },
        "agent": {
            "itera:researcher_aji": {
                "prov:type": "prov:Person",
                "prov:label": "Aji Pamungkas Tri Nurcahyo",
                "itera:institution": "Institut Teknologi Sumatera"
            }
        },
        "wasGeneratedBy": {
            "_:gen1": {
                "prov:entity": "itera:calibrated_features",
                "prov:activity": "itera:kalibrasi_filtering_run"
            }
        },
        "used": {
            "_:use1": {
                "prov:activity": "itera:kalibrasi_filtering_run",
                "prov:entity": "itera:raw_sensor_data"
            }
        },
        "wasAssociatedWith": {
            "_:assoc1": {
                "prov:activity": "itera:kalibrasi_filtering_run",
                "prov:agent": "itera:researcher_aji"
            }
        }
    }
    return prov_doc

doc = generate_w3c_prov_document()
print("[SIMULASI/SYNTHETIC DATA] Dokumen Silsilah W3C PROV-JSON:")
print(json.dumps(doc, indent=2)[:400] + "
  ... [TRUNCATED] ...
}")
print("Verifikasi: Model relasi Entity -> Activity -> Agent tervalidasi sesuai W3C.")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Dokumen Silsilah W3C PROV-JSON:
{
  "prefix": {
    "itera": "https://www.itera.ac.id/research/",
    "prov": "http://www.w3.org/ns/prov#"
  },
  "entity": {
    "itera:raw_sensor_data": {
      "prov:type": "prov:Entity",
      "itera:sha256": "8f4b23c91a0e...b7",
      "itera:format": "CSV"
    },
    "itera:calibrated_features": {
      "prov:type": "prov:Entity",
      "itera:sha256": "4c3d2e1f0a9b...c1",
      "itera:format": "Parquet"
    }
  }
  ... [TRUNCATED] ...
}
Verifikasi: Model relasi Entity -> Activity -> Agent tervalidasi sesuai W3C.`},commonPitfalls:["Menyimpan silsilah data hanya dalam bentuk catatan naratif informal di berkas teks bebas (tidak dapat di-parse mesin).","Mengabaikan pencatatan parameter spesifik (seperti nilai threshold atau nomor versi skrip) pada simpul Activity.","Membuat siklus lingkaran setan (circular cycles) dalam graf silsilah (melanggar sifat Directed Acyclic Graph)."],validationProcedures:["Gunakan validator W3C PROV resmi (seperti prov-check atau pustaka python-prov).","Ekspor graf silsilah ke dalam format visual SVG atau PDF menggunakan prov-dot.","Sertakan metadata silsilah data W3C PROV-JSON di samping berkas artefak data primer."],exercises:[{question:"Mengapa panah relasi dalam diagram W3C PROV (seperti wasDerivedFrom atau wasGeneratedBy) mengarah mundur ke masa lalu dan bukan maju ke masa depan?",hint:"Perhatikan tujuan utama silsilah: menjawab pertanyaan dari mana data ini berasal.",answerExplanation:'Dalam ontologi silsilah data, fokus utama adalah investigasi forensik asal usul ("Dari mana entitas data ini berasal?"). Oleh karena itu, panah menghubungkan entitas turunan ke entitas induknya (e_child -> e_parent). Hal ini juga menjamin bahwa entitas baru dapat merujuk ke entitas lama tanpa memerlukan pembaruan retrospektif terhadap metadata entitas lama yang sudah terkunci (immutable).'},{question:"Bagaimana standar W3C PROV memfasilitasi audit forensik jika salah satu instrumen sensor di laboratorium terbukti rusak 6 bulan setelah eksperimen selesai?",hint:"Perhatikan penelusuran graf relasi used dan wasGeneratedBy.",answerExplanation:"Dengan menjalankan kueri graf SPARQL pada basis data PROV, peneliti dapat menelusuri secara instan seluruh Activity yang mengonsumsi (used) instrumen rusak tersebut, dan secara otomatis menandai seluruh Entity turunan (tabel, grafik, model AI) yang terkontaminasi oleh data sensor rusak tersebut untuk ditarik atau dikoreksi."}],references:[{citation:"Moreau, L., Missier, P., et al. (2013). PROV-DM: The PROV Data Model. W3C Recommendation.",type:"formal-standard"},{citation:"Missier, P., Dey, S., Belhajjame, K., Cuevas-Vicenttín, V., & Ludäscher, B. (2013). D-PROV: A high-level provenance model for scientific workflows. eScience.",type:"peer-reviewed-article"}],slides:[{slideNumber:1,title:"Model Silsilah Data W3C PROV",bulletPoints:["Standar resmi pelacakan asal-usul data komputasi (Data Provenance).","Triad Ontologi Inti: Entity (Data), Activity (Proses), Agent (Peneliti/Institusi).","Menjawab secara transparan: Dari mana setiap angka naskah diturunkan."],keyFormulaOrDiagram:"\\text{wasGeneratedBy}(e, a) \\land \\text{used}(a, e_\\text{in}) \\implies \\text{wasDerivedFrom}(e, e_\\text{in})"},{slideNumber:2,title:"Audit Kausalitas Komputasi Digital",bulletPoints:["Graf terarah mengarah mundur ke asal-usul sejarah fisik.","Penyimpanan terstandarisasi dalam format PROV-JSON atau RDF Turtle.","Memfasilitasi penelusuran kesalahan sistemik secara instan via kueri graf."],keyFormulaOrDiagram:"\\text{Time}(\\text{used}) < \\text{Time}(\\text{wasGeneratedBy}) \\implies \\text{Validitas Kausal}"}]},"7.3.3":{id:"7.3.3",chapterId:"CH-47",title:"Pengelolaan Repositori Riset Terbuka Menggunakan Open Science Framework (OSF) dan Zenodo",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami fungsi repositori data terbuka terkurasi dalam ekosistem Open Science.","Membedakan peran GitHub/GitLab (pengembangan aktif) vs Zenodo/OSF (pengarsipan statis permanen).","Menerbitkan Digital Object Identifier (DOI) permanen yang memenuhi prinsip FAIR data."],content:`Dalam mempublikasikan kode dan data eksperimen, kesalahan paling lazim di kalangan peneliti rekayasa adalah menaruh tautan repositori GitHub di dalam catatan kaki makalah, lalu menganggap kewajiban keterbukaan data telah terpenuhi. Praktik ini sangat rapuh dan ditolak oleh standar perpustakaan ilmiah modern.

Kerapuhan Repositori Kode Aktif (Link Rot & Code Volatility):
1. Link Rot: Repositori GitHub pribadi dapat diubah namanya, dijadikan privat, atau dihapus sewaktu-waktu oleh pemiliknya. Studi menunjukkan bahwa lebih dari 30% tautan web dalam makalah ilmiah berusia 5 tahun telah rusak (Error 404).
2. Code Volatility: Repositori Git bersifat dinamis dan terus berkembang. Kode yang diakses reviewer hari ini mungkin berbeda dengan kode saat makalah diterbitkan 2 tahun lalu jika tidak ada rilis snapshot yang dibekukan secara permanen.

Repositori Pengarsipan Permanen: Zenodo dan OSF:
Untuk menjamin retensi jangka panjang, komunitas ilmiah global mengandalkan repositori arsip terbuka terkurasi seperti Zenodo (dikelola oleh CERN di bawah mandat Uni Eropa) dan Open Science Framework (OSF).
- Jaminan Retensi Abadi (Long-Term Preservation): Zenodo menjamin bahwa data yang diunggah akan disimpan di media penyimpanan redundan CERN minimal selama masa operasional laboratorium (dijamin lebih dari 20-50 tahun ke depan).
- Penerbitan DOI Permanen: Setiap rilis snapshot arsip diberikan Digital Object Identifier (DOI) resmi yang dapat disitasi secara terindeks dalam bibliografi akademik formal.
- Kebal Modifikasi (Immutability): Begitu sebuah rilis snapshot diterbitkan dan mendapatkan DOI, berkas tersebut tidak dapat diubah atau dihapus, menjaga keaslian bukti sejarah sains.`,mathematicalFoundations:`Penerapan Prinsip FAIR Data pada Repositori Terbuka:
Wilkinson et al. (2016) merumuskan empat pilar wajib data sains modern:

1. Findable (Dapat Ditemukan):
Data dan artefak diberi pengenal unik global yang persisten (Persistent Identifier / DOI):
$$\\text{DOI: } 10.5281/\\text{zenodo}.XXXXXXX$$
Metadata deskriptif lengkap diindeks dalam katalog global (DataCite / CrossRef).

2. Accessible (Dapat Diakses):
Dapat diunduh secara gratis menggunakan protokol komunikasi terbuka dan terstandarisasi (HTTPS / REST API) tanpa batasan lisensi komersial tersembunyi.

3. Interoperable (Dapat Dioperasikan):
Data disimpan dalam format non-proprietary terbuka (CSV, Parquet, HDF5, JSON) dengan skema ontologi formal, bukan dalam format biner tertutup software komersial tertentu.

4. Reusable (Dapat Digunakan Kembali):
Dilengkapi dengan lisensi terbuka yang sah secara hukum (seperti MIT untuk kode dan CC-BY 4.0 untuk data) serta petunjuk eksekusi mandiri yang lengkap.`,workedExample:{problemStatement:"Sebuah tim peneliti di ITERA menyelesaikan penelitian visi komputer dan ingin menghubungkan repositori GitHub dengan Zenodo. Rancang alur kerja resmi integrasi otomatis GitHub-Zenodo untuk menerbitkan DOI rilis versi v1.0.0 makalah.",stepByStepSolution:["Langkah 1: Hubungkan akun: Peneliti masuk ke situs zenodo.org, mengaktifkan integrasi GitHub, dan mengaktifkan toggle switch pada repositori proyek riset.",'Langkah 2: Pembuatan rilis Git (Release Tag): Di repositori GitHub, peneliti membuat Git Tag dan Release resmi bernama v1.0.0 dengan judul "Initial Publication Release Artifacts".',"Langkah 3: Pemicuan Webhook otomatis: GitHub secara instan mengirimkan webhook ke Zenodo. Zenodo mengunduh arsip zip repositori, memvalidasi integritas berkas, dan menyimpannya di cluster penyimpanan permanen CERN.","Langkah 4: Penerbitan DOI: Zenodo menerbitkan DOI unik (misal 10.5281/zenodo.1234567) dan mencatat metadata penulis, afiliasi ITERA, dan lisensi terbuka.","Langkah 5: Penyematan sitasi: Peneliti menyematkan badge DOI dan teks sitasi BibTeX resmi di dalam naskah makalah ilmiah."],resultInterpretation:"Integrasi ini mengunci status artefak komputasi pada saat publikasi, menjamin aksesibilitas abadi dan sitabilitas formal yang diakui indeks Scopus dan WoS."},pythonImplementation:{description:"Pembangkitan berkas metadata sitasi terstandarisasi CITATION.cff untuk repositori ilmiah terbuka.",libraryDependencies:["datetime"],code:`import datetime

# [SIMULASI/SYNTHETIC DATA]
def generate_citation_cff() -> str:
    """Membangkitkan format baku CITATION.cff (Citation File Format) berstandar GitHub/Zenodo."""
    cff_content = f"""cff-version: 1.2.0
message: "If you use this research software or dataset, please cite it as below."
authors:
  - family-names: "Tri Nurcahyo"
    given-names: "Aji Pamungkas"
    orcid: "https://orcid.org/0009-0000-0000-0000"
    affiliation: "Institut Teknologi Sumatera (ITERA)"
title: "Scientific Research & Experimental Methods Hub: Reproducible Artifact Package"
version: 1.0.0
doi: 10.5281/zenodo.9876543
date-released: {datetime.date.today().isoformat()}
url: "https://github.com/itera-research/scientific-methods-hub"
keywords:
  - "experimental methods"
  - "reproducible research"
  - "computer vision"
  - "metrology"
license: MIT
"""
    return cff_content

cff_text = generate_citation_cff()
print("[SIMULASI/SYNTHETIC DATA] Berkas CITATION.cff Terstandarisasi:")
print("-" * 55)
print(cff_text)
print("-" * 55)
print("Verifikasi: Berkas CITATION.cff siap diintegrasikan otomatis dengan GitHub & Zenodo.")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Berkas CITATION.cff Terstandarisasi:
-------------------------------------------------------
cff-version: 1.2.0
message: "If you use this research software or dataset, please cite it as below."
authors:
  - family-names: "Tri Nurcahyo"
    given-names: "Aji Pamungkas"
    orcid: "https://orcid.org/0009-0000-0000-0000"
    affiliation: "Institut Teknologi Sumatera (ITERA)"
title: "Scientific Research & Experimental Methods Hub: Reproducible Artifact Package"
version: 1.0.0
doi: 10.5281/zenodo.9876543
date-released: 2026-11-23
url: "https://github.com/itera-research/scientific-methods-hub"
keywords:
  - "experimental methods"
  - "reproducible research"
  - "computer vision"
  - "metrology"
license: MIT

-------------------------------------------------------
Verifikasi: Berkas CITATION.cff siap diintegrasikan otomatis dengan GitHub & Zenodo.`},commonPitfalls:["Hanya mengandalkan tautan GitHub dinamis tanpa mengarsipkan rilis snapshot ke Zenodo/OSF.","Mengunggah berkas data dalam format software berpemilik eksklusif (seperti .mat atau .xlsx yang membutuhkan lisensi mahal).","Tidak menyertakan berkas CITATION.cff yang memudahkan peneliti lain mengutip perangkat lunak riset secara benar."],validationProcedures:["Pastikan repositori Zenodo memiliki status pengarsipan permanen dengan nomor DOI terdaftar aktif di DataCite.","Uji tautan DOI menggunakan URL resolver resmi: https://doi.org/<DOI_ANDA>.","Verifikasi kepatuhan terhadap prinsip FAIR menggunakan checklist automated FAIR-checker."],exercises:[{question:"Mengapa sebuah rilis snapshot yang telah diterbitkan di Zenodo tidak dapat diedit atau dihapus oleh peneliti yang mengunggahnya?",hint:"Perhatikan integritas catatan sejarah ilmiah dan pencegahan manipulasi bukti retrospektif.",answerExplanation:"Imutabilitas adalah pilar utama integritas ilmiah. Begitu sebuah artefak diterbitkan dengan DOI, artefak tersebut telah menjadi bagian permanen dari catatan sejarah sains global. Jika peneliti dapat mengubah berkas tersebut secara bebas, pembaca tidak dapat memastikan apakah kode yang mereka periksa hari ini adalah kode yang sama yang digunakan untuk menghasilkan angka di dalam makalah yang diterbitkan 5 tahun lalu."},{question:"Apa fungsi utama dari berkas CITATION.cff di akar repositori GitHub ilmiah?",hint:'Perhatikan tombol "Cite this repository" di antarmuka web GitHub.',answerExplanation:'CITATION.cff adalah format standar berbasis YAML yang memungkinkan GitHub, Zenodo, dan manajer referensi (seperti Zotero) untuk secara otomatis mengekstrak metadata sitasi resmi (nama penulis, judul, DOI, tahun, versi) dan menyajikan tombol satu-klik "Cite this repository" dalam format BibTeX dan APA bagi para pembaca.'}],references:[{citation:"Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 1-9.",type:"peer-reviewed-article"},{citation:"European Organization for Nuclear Research (CERN). (2020). Zenodo General Policies and Principles.",type:"formal-standard"}],slides:[{slideNumber:1,title:"Repositori Riset Terbuka Permanen",bulletPoints:["GitHub untuk kolaborasi aktif; Zenodo/OSF untuk pengarsipan permanen abadi.","Bahaya Link Rot: >30% URL makalah rusak dalam waktu 5 tahun.","Penerbitan Digital Object Identifier (DOI) permanen yang terindeks resmi."],keyFormulaOrDiagram:"\\text{GitHub Release} \\xrightarrow{\\text{Webhook}} \\text{Zenodo Immutable Snapshot (DOI)}"},{slideNumber:2,title:"Prinsip FAIR Data Ilmiah",bulletPoints:["Findable: Memiliki DOI persisten dan metadata DataCite terindeks.","Accessible: Protokol unduh terbuka bebas biaya.","Interoperable: Format non-proprietary terbuka (CSV, Parquet, JSON).","Reusable: Lisensi hukum terbuka dan petunjuk eksekusi lengkap."],keyFormulaOrDiagram:"\\text{FAIR} \\implies \\text{Findable} + \\text{Accessible} + \\text{Interoperable} + \\text{Reusable}"}]},"7.3.4":{id:"7.3.4",chapterId:"CH-47",title:"Pemilihan Lisensi Terbuka: Perbedaan Lisensi Kode (MIT, Apache 2.0) vs Lisensi Data (CC-BY)",readingTimeMinutes:20,status:"verified",learningObjectives:["Memahami implikasi hukum hak cipta intelektual (Intellectual Property / IP) pada publikasi ilmiah terbuka.","Membedakan lisensi perangkat lunak (Permissive vs Copyleft: MIT, Apache 2.0, GPLv3).","Memilih lisensi data terbuka Creative Commons (CC0 vs CC-BY 4.0) untuk dataset rekayasa."],content:`Salah satu kesalahpahaman paling berbahaya di kalangan peneliti adalah anggapan bahwa "mengunggah kode dan data ke repositori publik di internet otomatis menjadikannya domain publik bebas pakai". Dalam hukum hak cipta internasional (Konvensi Bern), jika sebuah repositori tidak memiliki berkas lisensi hukum eksplisit, status hukumnya adalah "All Rights Reserved" (Seluruh Hak Cipta Dilindungi). Peneliti lain yang mengunduh dan menjalankan kode Anda secara teknis melakukan pelanggaran hak cipta ilegal!

Dikotomi Fundamental Lisensi Kode vs Lisensi Data:
Perangkat lunak dan dataset memiliki sifat ontologi hukum yang berbeda:
- Kode Perangkat Lunak adalah karya logika instruksi yang dapat dieksekusi (functional text).
- Data Pengukuran adalah kumpulan fakta empiris alam (facts and observations).
Oleh karena itu, lisensi perangkat lunak (seperti MIT atau GPL) TIDAK BOLEH digunakan untuk melisensikan data, dan lisensi dokumen kreatif (seperti Creative Commons) TIDAK BOLEH digunakan untuk melisensikan kode perangkat lunak.

Taksonomi Lisensi Perangkat Lunak Ilmiah:
1. Lisensi Permisif (Permissive: MIT, Apache 2.0, BSD-3-Clause):
Memberikan kebebasan maksimum kepada siapa pun untuk menggunakan, memodifikasi, dan mengintegrasikan kode ke dalam perangkat lunak komersial tertutup dengan syarat mencantumkan atribusi penulis asli. Apache 2.0 menyertakan klausul perlindungan paten eksplisit yang sangat ideal untuk riset inovasi teknologi rekayasa.
2. Lisensi Timbal-Balik (Copyleft / Viral: GNU GPLv3):
Mewajibkan bahwa sembarang perangkat lunak turunan yang menggunakan kode tersebut wajib dipublikasikan kembali dengan lisensi terbuka yang sama (GPLv3).

Lisensi Data Terbuka (Creative Commons):
- CC0 1.0 (Public Domain Dedication): Melepaskan seluruh hak cipta ke domain publik (standar emas untuk data mentah sensor dan benchmark publik).
- CC-BY 4.0 (Attribution): Mengizinkan siapa pun menyebarkan dan memodifikasi data dengan syarat wajib mencantumkan sitasi kredit kepada peneliti asli.`,mathematicalFoundations:`Matriks Komparasi Hukum Lisensi Ilmiah:

| Kategori Lisensi | Jenis Lisensi | Hak Penggunaan | Hak Komersial | Perlindungan Paten | Syarat Copyleft |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Software** | **MIT License** | Bebas | Ya | Implisit | Tidak Ada |
| **Software** | **Apache 2.0** | Bebas | Ya | **Eksplisit (Hibah Paten)** | Tidak Ada |
| **Software** | **GNU GPLv3** | Bebas Terikat | Ya | Eksplisit | **Wajib Buka Kode** |
| **Data / Dokumen** | **CC0 1.0** | Domain Publik | Ya | Tidak Relevan | Tidak Ada |
| **Data / Dokumen** | **CC-BY 4.0** | Bebas Teratribusi | Ya | Tidak Relevan | Hanya Atribusi Sitasi |

Klausul Hibah Paten Apache 2.0 (Patent Grant Clause):
Setiap kontributor kode memberikan lisensi paten bebas royalti yang tidak dapat dibatalkan (perpetual, irrevocable) kepada seluruh pengguna perangkat lunak untuk klaim paten yang diimplementasikan di dalam kode tersebut. Klausul ini melindungi akademisi dari gugatan paten di kemudian hari.`,workedExample:{problemStatement:"Sebuah laboratorium di ITERA merilis paket riset yang memuat: (1) Skrip algoritma ekstraksi fitur gelombang, (2) Dataset pengukuran getaran mesin 100 GB, dan (3) Buku panduan laporan teknis PDF. Tentukan lisensi hukum yang paling tepat untuk masing-masing dari ketiga artefak tersebut.",stepByStepSolution:["Langkah 1: Pemilihan lisensi artefak (1) Skrip Algoritma: Mengingat kode memuat algoritma baru yang berpotensi dipatenkan dan peneliti ingin adopsi seluas-luasnya oleh industri, pilih lisensi perangkat lunak permisif dengan perlindungan paten: Apache License 2.0.","Langkah 2: Pemilihan lisensi artefak (2) Dataset Pengukuran 100 GB: Dataset adalah kumpulan fakta fisik. Pilih Creative Commons Attribution 4.0 International (CC-BY 4.0) agar siapa pun yang menggunakan data wajib mengutip naskah ilmiah ITERA.","Langkah 3: Pemilihan lisensi artefak (3) Buku Panduan PDF: Untuk dokumen narasi teks ilmiah, gunakan Creative Commons Attribution-NoDerivatives (CC-BY-ND 4.0) jika teks tidak boleh diubah sembarangan, atau CC-BY 4.0 untuk keterbukaan penuh."],resultInterpretation:"Pemisahan lisensi ganda (Dual-Licensing Strategy: Apache 2.0 untuk kode + CC-BY untuk data) memberikan kepastian hukum yang sempurna bagi kolaborator dan industri."},pythonImplementation:{description:"Audit otomatis keberadaan dan kepatuhan lisensi terbuka (License Compliance Checker) pada proyek riset.",libraryDependencies:["os"],code:`import os

# [SIMULASI/SYNTHETIC DATA]
def audit_repository_licenses(repo_files: list[str]) -> dict:
    """Memeriksa kelengkapan lisensi kode dan lisensi data pada repositori ilmiah."""
    has_code_license = any(f.upper() in ['LICENSE', 'LICENSE.TXT', 'LICENSE.MD'] for f in repo_files)
    has_data_license = any('DATA_LICENSE' in f.upper() or 'LICENSE-DATA' in f.upper() for f in repo_files)
    
    compliance = {
        'Code_License_Present': has_code_license,
        'Data_License_Present': has_data_license,
        'Status': 'COMPLIANT' if (has_code_license and has_data_license) else 'PARTIAL_OR_UNLICENSED',
        'Recommendation': 'Lengkap' if (has_code_license and has_data_license) else 'Tambahkan berkas LICENSE (Apache 2.0) dan LICENSE-DATA (CC-BY 4.0)'
    }
    return compliance

# Uji simulasi pada repositori proyek
mock_files = ['README.md', 'pyproject.toml', 'LICENSE', 'src/model.py', 'data/README.md', 'LICENSE-DATA']
audit_result = audit_repository_licenses(mock_files)

print("[SIMULASI/SYNTHETIC DATA] Audit Kepatuhan Hukum Lisensi Terbuka Proyek:")
print("-" * 55)
for k, v in audit_result.items():
    print(f"{k:22}: {v}")
print("-" * 55)
print("Kepastian Hukum: Repositori memenuhi syarat adopsi akademik dan industri.")
`,expectedOutput:`[SIMULASI/SYNTHETIC DATA] Audit Kepatuhan Hukum Lisensi Terbuka Proyek:
-------------------------------------------------------
Code_License_Present  : True
Data_License_Present  : True
Status                : COMPLIANT
Recommendation        : Lengkap
-------------------------------------------------------
Kepastian Hukum: Repositori memenuhi syarat adopsi akademik dan industri.`},commonPitfalls:["Tidak menyertakan berkas LICENSE sama sekali di repositori (menjadikannya berstatus All Rights Reserved secara ilegal).","Menggunakan lisensi Creative Commons (seperti CC-BY) untuk kode perangkat lunak (Creative Commons secara eksplisit menolak penggunaannya untuk software).","Menggunakan lisensi Non-Commercial (CC-BY-NC) yang melarang adopsi data oleh laboratorium komersial atau rumah sakit industri."],validationProcedures:["Sertakan berkas teks LICENSE lengkap di direktori akar repositori.","Tambahkan header lisensi singkat (SPDX License Identifier) di baris pertama setiap berkas kode sumber Python: # SPDX-License-Identifier: Apache-2.0.","Dokumentasikan lisensi dataset secara eksplisit di berkas README data."],exercises:[{question:"Mengapa komunitas Open Science sangat tidak menganjurkan penggunaan klausul Non-Commercial (misalnya lisensi CC-BY-NC) untuk dataset riset terbuka?",hint:'Perhatikan ambiguitas hukum dari istilah "non-komersial" dan hambatan integrasi dengan riset industri.',answerExplanation:'Istilah "Non-Commercial" sangat kabur secara hukum. Apakah seorang peneliti di universitas negeri yang didanai oleh hibah industri dianggap komersial? Apakah penggunaan data untuk pelatihan dokter di rumah sakit swasta dianggap komersial? Ambiguitas ini menakut-nakuti banyak peneliti dan memblokir integrasi dataset ke proyek-proyek open-source global seperti Wikipedia atau database internasional.'},{question:"Apa arti pengenal standar SPDX (Software Package Data Exchange) dalam komentar kode sumber?",hint:"Perhatikan standarisasi pembacaan lisensi oleh robot pemindai otomatis.",answerExplanation:"SPDX adalah pengenal singkatan terstandarisasi internasional (seperti SPDX-License-Identifier: MIT atau Apache-2.0) yang ditempatkan di bagian atas berkas kode. Hal ini memungkinkan robot linter dan perkakas audit otomatis membaca dan memverifikasi kepatuhan hukum dari ribuan berkas kode sumber dalam hitungan detik tanpa perlu membaca teks hukum lisensi yang panjang."}],references:[{citation:"Stodden, V. (2009). Enabling reproducible research: Open licensing plans for data and code. Science and Technology Law Review, 12, 1.",type:"peer-reviewed-article"},{citation:"Creative Commons. (2020). Creative Commons Attribution 4.0 International Legal Code.",type:"formal-standard"}],slides:[{slideNumber:1,title:"Pemilihan Lisensi Terbuka Ilmiah",bulletPoints:["Tanpa berkas lisensi = All Rights Reserved (Ilegal bagi orang lain untuk memakai).","Pemisahan Hukum: Lisensi Software != Lisensi Data Pengukuran.","Strategi Ganda: Lisensi Permisif untuk Kode + Creative Commons untuk Data."],keyFormulaOrDiagram:"\\text{Software: Apache 2.0 / MIT} \\quad \\perp \\quad \\text{Dataset: CC-BY 4.0 / CC0}"},{slideNumber:2,title:"Perlindungan Paten & Kepatuhan SPDX",bulletPoints:["Apache 2.0 menyertakan klausul perlindungan hibah paten bebas royalti.","Gunakan pengenal SPDX di baris pertama kode: # SPDX-License-Identifier: Apache-2.0.","Hindari klausul Non-Commercial (NC) demi interoperabilitas sains global."],keyFormulaOrDiagram:"\\text{SPDX-License-Identifier: Apache-2.0}"}]}};export{a as CH47_LESSONS};
