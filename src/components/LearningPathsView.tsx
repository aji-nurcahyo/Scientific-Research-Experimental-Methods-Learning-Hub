import React, { useState } from 'react';
import { LEARNING_PATHS } from '../data/learningPathsData';
import { LearningPath } from '../types/curriculum';
import { Compass, BookOpen, ArrowRight, Target } from 'lucide-react';

interface LearningPathsViewProps {
  onSelectChapter: (chapterId: string) => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({ onSelectChapter }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'undergraduate' | 'advanced-engineering' | 'doctoral-publication'>('all');
  const [activePath, setActivePath] = useState<LearningPath | null>(LEARNING_PATHS[0]);

  const filteredPaths = selectedFilter === 'all'
    ? LEARNING_PATHS
    : LEARNING_PATHS.filter((p) => p.category === selectedFilter);

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f3d59', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
          <Compass size={18} />
          Jalur Pembelajaran Terarah (Learning Paths)
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
          10 Kurikulum Jalur Spesialisasi
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>
          Learning Paths merangkai bab-bab Master Curriculum tanpa duplikasi konten untuk mengarahkan pembelajar mencapai luaran riset yang spesifik.
        </p>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Semua Jalur (10 Path)' },
            { id: 'undergraduate', label: 'Undergraduate S1 (Tugas Akhir)' },
            { id: 'advanced-engineering', label: 'Advanced Engineering (Metrologi & Model)' },
            { id: 'doctoral-publication', label: 'PhD & Publikasi (Disertasi & RSE)' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`btn ${selectedFilter === tab.id ? 'btn-primary' : ''}`}
              onClick={() => setSelectedFilter(tab.id as any)}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Grid: Path List on Left, Active Path Detail on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(360px, 1.6fr)', gap: '1.5rem' }}>
        {/* Path List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {filteredPaths.map((path) => {
            const isSelected = activePath?.id === path.id;

            return (
              <div
                key={path.id}
                onClick={() => setActivePath(path)}
                style={{
                  padding: '1rem 1.25rem',
                  backgroundColor: isSelected ? '#e8f0f6' : '#ffffff',
                  border: `1px solid ${isSelected ? '#0f3d59' : '#e5e7eb'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${isSelected ? '#0f3d59' : '#cbd5e1'}`,
                  transition: 'background-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#0f3d59' }}>
                    {path.id}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#6b7280' }}>
                    {path.requiredChapterIds.length} Chapter Wajib
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.94rem', color: '#0f172a' }}>
                  {path.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Path Detail */}
        {activePath && (
          <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ backgroundColor: '#0f3d59', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 700 }}>
                {activePath.id}
              </span>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: 600 }}>
                {activePath.category.replace('-', ' ')}
              </span>
            </div>

            <h2 style={{ fontSize: '1.4rem', margin: '0.25rem 0 1rem', border: 'none', padding: 0 }}>
              {activePath.title}
            </h2>

            <div style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              <strong>Profil Sasaran:</strong> {activePath.targetAudience}
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '1.25rem', fontSize: '0.86rem' }}>
              <div style={{ fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Prasyarat Masuk (*Entry Requirements*):</div>
              <p style={{ margin: 0, color: '#475569' }}>{activePath.entryRequirements}</p>
            </div>

            {/* Required Chapters */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f3d59', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={16} />
                Chapter Wajib Dituntaskan ({activePath.requiredChapterIds.length}):
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {activePath.requiredChapterIds.map((cid) => (
                  <button
                    key={cid}
                    onClick={() => onSelectChapter(cid)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.82rem',
                      color: '#0f3d59',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontWeight: 600,
                    }}
                  >
                    <span>{cid}</span>
                    <ArrowRight size={12} color="#94a3b8" />
                  </button>
                ))}
              </div>
            </div>

            {/* Practical Assignments */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1f2937', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Target size={16} color="#c59b27" />
                Penugasan Praktis Mandiri:
              </div>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#374151', lineHeight: 1.65 }}>
                {activePath.practicalAssignments.map((task, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>
                    {task}
                  </li>
                ))}
              </ol>
            </div>

            {/* Deliverable */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', fontSize: '0.88rem', color: '#065f46', fontWeight: 600 }}>
              Luaran Terukur (*Assessable Deliverables*):
              <div style={{ fontWeight: 400, color: '#1e293b', marginTop: '0.2rem' }}>
                {activePath.assessableDeliverables}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

