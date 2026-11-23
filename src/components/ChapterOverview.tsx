import React, { useState } from 'react';
import { Chapter } from '../types/curriculum';
import { ContentStatusBadge } from './ContentStatusBadge';
import { Breadcrumbs } from './Breadcrumbs';
import { SlidesModal } from './SlidesModal';
import { Sparkles, ArrowRight, CheckCircle2, BookOpen, Presentation, Download, Printer } from 'lucide-react';
import { isLessonCompleted } from '../utils/progressTracker';
import { getEffectiveChapterStatus, getEnrichedLesson, getChapterSlides } from '../data/lessonRegistry';
import { exportChapterToPPTX } from '../utils/pptxExport';

interface ChapterOverviewProps {
  chapter: Chapter;
  onSelectLesson: (chapterId: string, lessonId: string) => void;
  onNavigateChapter: (chapterId: string) => void;
  onNavigateHome: () => void;
}

export const ChapterOverview: React.FC<ChapterOverviewProps> = ({
  chapter,
  onSelectLesson,
  onNavigateChapter,
  onNavigateHome,
}) => {
  const effectiveStatus = getEffectiveChapterStatus(chapter);
  const [isSlidesOpen, setIsSlidesOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const chapterSlides = getChapterSlides(chapter);

  const handleExportPPTX = async () => {
    setIsExporting(true);
    try {
      await exportChapterToPPTX({
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        subtitle: chapter.overview,
        slides: chapterSlides,
      });
    } catch (err) {
      console.error('Failed to export PPTX:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Beranda', onClick: onNavigateHome },
    { label: `Level ${chapter.levelId}` },
    { label: `${chapter.id}: ${chapter.title}`, active: true },
  ];

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto' }}>
      <Breadcrumbs items={breadcrumbItems} />

      <header style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: '#0f3d59' }}>
            {chapter.id}
          </span>
          <ContentStatusBadge status={effectiveStatus} />
          {chapter.gatewayMilestone && (
            <span className="status-badge" style={{ backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', gap: '0.3rem' }}>
              <Sparkles size={12} /> Gateway Milestone Chapter
            </span>
          )}
        </div>

        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: '#0f172a' }}>
          {chapter.title}
        </h1>

        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.6 }}>
          {chapter.overview}
        </p>

        {/* Action Controls for Slides, PPTX, PDF */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.25rem' }} className="no-print">
          {chapterSlides.length > 0 && (
            <button
              className="btn btn-primary"
              onClick={() => setIsSlidesOpen(true)}
              style={{ fontSize: '0.85rem' }}
            >
              <Presentation size={15} />
              Buka Slide Bab ({chapterSlides.length} Slide)
            </button>
          )}

          {chapterSlides.length > 0 && (
            <button
              className="btn"
              onClick={handleExportPPTX}
              disabled={isExporting}
              style={{ fontSize: '0.85rem' }}
            >
              <Download size={15} color="#0f3d59" />
              {isExporting ? 'Mengekspor PPTX...' : 'Unduh PPTX Lengkap'}
            </button>
          )}

          <button
            className="btn"
            onClick={() => window.print()}
            style={{ fontSize: '0.85rem' }}
          >
            <Printer size={15} />
            Cetak / Ekspor PDF
          </button>
        </div>

        {/* Prerequisites & Competency Mappings */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1.25rem', padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.86rem' }}>
          <div>
            <div style={{ fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Prasyarat Langsung:</div>
            {chapter.prerequisites.length > 0 ? (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {chapter.prerequisites.map((prereqId) => (
                  <button
                    key={prereqId}
                    onClick={() => onNavigateChapter(prereqId)}
                    style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '3px', padding: '0.15rem 0.5rem', fontSize: '0.8rem', color: '#0f3d59', cursor: 'pointer', fontWeight: 500 }}
                  >
                    {prereqId}
                  </button>
                ))}
              </div>
            ) : (
              <span style={{ color: '#065f46', fontStyle: 'italic' }}>Tidak ada (Titik Masuk Dasar)</span>
            )}
          </div>

          <div>
            <div style={{ fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Pemetaan Kompetensi:</div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {chapter.competencyMappings.map((compId) => (
                <span key={compId} style={{ backgroundColor: '#e2e8f0', color: '#1e293b', padding: '0.15rem 0.5rem', borderRadius: '3px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                  {compId}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Lesson List */}
      <section>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem', borderBottom: 'none' }}>
          Daftar Pelajaran (Lessons)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {chapter.lessons.map((baseLesson) => {
            const lesson = getEnrichedLesson(baseLesson);
            const isDone = isLessonCompleted(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(chapter.id, lesson.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.1rem 1.4rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0f3d59';
                  e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isDone ? '#ecfdf5' : '#f1f5f9',
                    color: isDone ? '#065f46' : '#0f3d59',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}>
                    {isDone ? <CheckCircle2 size={18} /> : <BookOpen size={17} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                        Lesson {lesson.id}
                      </span>
                      <ContentStatusBadge status={lesson.status} />
                    </div>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '1.02rem' }}>
                      {lesson.title}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#0f3d59' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>Pelajari</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Chapter Slides Modal */}
      {chapterSlides.length > 0 && (
        <SlidesModal
          isOpen={isSlidesOpen}
          onClose={() => setIsSlidesOpen(false)}
          chapterTitle={`${chapter.id}: ${chapter.title}`}
          lessonTitle={`Slide Perkuliahan Lengkap (${chapterSlides.length} Slide)`}
          slides={chapterSlides}
        />
      )}
    </div>
  );
};

