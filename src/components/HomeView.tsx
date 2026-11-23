import React from 'react';
import { BookOpen, Compass, Terminal, ArrowRight } from 'lucide-react';
import { Level } from '../types/curriculum';

interface HomeViewProps {
  levels: Level[];
  onSelectLevel: (levelId: number) => void;
  onNavigateTab: (tab: 'curriculum' | 'paths' | 'labs' | 'templates') => void;
  onSelectChapter: (chapterId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  levels,
  onNavigateTab,
  onSelectChapter,
}) => {
  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      {/* Hero Section - Anti-Slop Academic Styling (No purple gradient, calm palette, authoritative text) */}
      <section style={{ padding: '2.5rem 0 2rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#e8f0f6', color: '#0f3d59', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Institut Teknologi Sumatera (ITERA) &bull; Project Creator: Aji Pamungkas Tri Nurcahyo
        </div>

        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.85rem' }}>
          Scientific Research &amp; Experimental Methods Learning Hub
        </h1>

        <p style={{ fontSize: '1.25rem', color: '#0f3d59', fontWeight: 600, fontStyle: 'italic', marginBottom: '1.25rem' }}>
          From Scientific Thinking to Reproducible Research
        </p>

        <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, maxWidth: '860px', marginBottom: '1.75rem' }} className="academic-prose">
          Pusat pembelajaran mandiri metodologi penelitian ilmiah tingkat lanjut, metrologi rekayasa terstandarisasi, perancangan eksperimen (*Design of Experiments*), inferensi dan pemodelan statistik, evaluasi komparatif algoritma, serta penjaminan reproduksibilitas komputasi.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => onNavigateTab('curriculum')} style={{ padding: '0.65rem 1.25rem' }}>
            <BookOpen size={16} />
            Mulai Belajar (Kurikulum Master)
          </button>
          <button className="btn" onClick={() => onNavigateTab('paths')} style={{ padding: '0.65rem 1.25rem' }}>
            <Compass size={16} />
            Pilih Learning Path Terarah
          </button>
          <button className="btn" onClick={() => onNavigateTab('labs')} style={{ padding: '0.65rem 1.25rem' }}>
            <Terminal size={16} />
            Eksplorasi Lab Komputasi
          </button>
        </div>
      </section>

      {/* Scientific Reasoning Workflow */}
      <section style={{ padding: '2.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', border: 'none' }}>
          Alur Penalaran Ilmiah (The Scientific Reasoning Cycle)
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
          Kurikulum ini dibangun untuk memastikan setiap penelitian rekayasa dapat dipertanggungjawabkan secara epistemologis dan terbebas dari bias empiris:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
          {[
            { step: '1. Reasoning', label: 'Scientific Logic', desc: 'Falsifikasi Popperian & Hipotesis' },
            { step: '2. Design', label: 'Study Architecture', desc: 'Kontrol Variabel & Validitas' },
            { step: '3. Data', label: 'Metrology & FAIR', desc: 'Kalibrasi GUM & Sampling' },
            { step: '4. Analysis', label: 'Inference & Modeling', desc: 'NHST, Effect Size & OLS' },
            { step: '5. Validation', label: 'Evaluation Rigor', desc: 'Benchmark Demšar & Ablasi' },
            { step: '6. Reproduce', label: 'RSE & Docker', desc: 'Pipelines & Artifact Package' },
            { step: '7. Disseminate', label: 'Communication', desc: 'IMRaD & Peer Review' },
          ].map((item, idx) => (
            <div key={idx} style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#c59b27', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                {item.step}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f3d59', marginBottom: '0.25rem' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 User Target Clusters */}
      <section style={{ padding: '2.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', border: 'none' }}>
          Sasaran Pengguna &amp; Profil Pembelajar
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', borderTop: '4px solid #0f3d59' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f3d59', marginBottom: '0.4rem' }}>
              A. Undergraduate Research
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
              Untuk mahasiswa S1 ITERA yang mengerjakan proposal penelitian, Tugas Akhir, Capstone Design, pengujian laboratorium, dan penulisan artikel ilmiah pertama.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#065f46', fontWeight: 600 }}>
              Jalur: LP-01 (Undergraduate Thesis Path)
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', borderTop: '4px solid #c59b27' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#92400e', marginBottom: '0.4rem' }}>
              B. Advanced Engineering Research
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
              Untuk dosen, peneliti, dan asisten riset yang memperdalam metrologi sensor, Design of Experiments (DoE), diagnostik regresi, validasi AI/ML, dan UQ.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#1e40af', fontWeight: 600 }}>
              Jalur: LP-02 s.d. LP-07 (Spesialisasi Rekayasa)
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', borderTop: '4px solid #065f46' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#065f46', marginBottom: '0.4rem' }}>
              C. PhD &amp; Independent Research
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
              Untuk persiapan studi doktoral (S3), perumusan novelty keilmuan, inferensi kausal, studi ablasi ketat, navigasi peer-review jurnal Q1, dan roadmap disertasi.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#92400e', fontWeight: 600 }}>
              Jalur: LP-08 s.d. LP-10 (Doktoral &amp; RSE)
            </div>
          </div>
        </div>
      </section>

      {/* 7 Levels Overview */}
      <section style={{ padding: '2.5rem 0' }}>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', border: 'none' }}>
          Struktur Kurikulum Master (7 Level Pembelajaran)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {levels.map((lvl) => (
            <div
              key={lvl.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'border-color 0.15s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span style={{ backgroundColor: '#0f3d59', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 700 }}>
                    LEVEL {lvl.id}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    {lvl.sections.reduce((acc, s) => acc + s.chapters.length, 0)} Chapter
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.2rem' }}>
                  {lvl.title.split(':')[1] || lvl.title}
                </div>
                <div style={{ fontSize: '0.86rem', color: '#4b5563' }}>
                  {lvl.tagline}
                </div>
              </div>

              <button
                className="btn"
                onClick={() => {
                  const firstCh = lvl.sections[0]?.chapters[0];
                  if (firstCh) onSelectChapter(firstCh.id);
                }}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem', flexShrink: 0 }}
              >
                Buka Level <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

