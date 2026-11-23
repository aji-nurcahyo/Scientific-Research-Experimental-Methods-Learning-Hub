import React, { useState } from 'react';
import { Lesson, Chapter } from '../types/curriculum';
import { ContentStatusBadge } from './ContentStatusBadge';
import { MathRenderer } from './MathRenderer';
import { Breadcrumbs } from './Breadcrumbs';
import { SlidesModal } from './SlidesModal';
import { isLessonCompleted, toggleLessonCompletion } from '../utils/progressTracker';
import {
  Clock,
  Printer,
  Presentation,
  CheckCircle,
  HelpCircle,
  Code,
  AlertTriangle,
  BookMarked,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface LessonViewProps {
  chapter: Chapter;
  lesson: Lesson;
  prevLesson?: { chapterId: string; lessonId: string; title: string };
  nextLesson?: { chapterId: string; lessonId: string; title: string };
  onNavigateLesson: (chapterId: string, lessonId: string) => void;
  onNavigateChapter: (chapterId: string) => void;
  onNavigateHome: () => void;
  onToggleComplete: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  chapter,
  lesson,
  prevLesson,
  nextLesson,
  onNavigateLesson,
  onNavigateChapter,
  onNavigateHome,
  onToggleComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(() => isLessonCompleted(lesson.id));
  const [isSlidesOpen, setIsSlidesOpen] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const handleToggleCompleted = () => {
    const newState = toggleLessonCompletion(lesson.id);
    setIsCompleted(newState);
    onToggleComplete();
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const breadcrumbItems = [
    { label: 'Beranda', onClick: onNavigateHome },
    { label: `Level ${chapter.levelId}` },
    { label: `${chapter.id}: ${chapter.title}`, onClick: () => onNavigateChapter(chapter.id) },
    { label: `Lesson ${lesson.id}`, active: true },
  ];

  return (
    <article className="lesson-page" style={{ maxWidth: '920px', margin: '0 auto' }}>
      {/* Top Breadcrumb & Metadata */}
      <Breadcrumbs items={breadcrumbItems} />

      <header style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem', color: '#0f3d59' }}>
              Lesson {lesson.id}
            </span>
            <ContentStatusBadge status={lesson.status} />
            {chapter.gatewayMilestone && (
              <span className="status-badge" style={{ backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', gap: '0.3rem' }}>
                <Sparkles size={11} /> Gateway Milestone
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
            <Clock size={14} />
            <span>{lesson.readingTimeMinutes} menit membaca</span>
          </div>
        </div>

        <h1 style={{ fontSize: '2.1rem', marginBottom: '1rem', color: '#0f172a' }}>
          {lesson.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }} className="no-print">
          <button
            className={`btn ${isCompleted ? 'btn-primary' : ''}`}
            onClick={handleToggleCompleted}
            style={{ fontSize: '0.85rem' }}
          >
            <CheckCircle size={15} />
            {isCompleted ? 'Telah Selesai Dipelajari' : 'Tandai Selesai'}
          </button>

          {lesson.slides && lesson.slides.length > 0 && (
            <button className="btn" onClick={() => setIsSlidesOpen(true)} style={{ fontSize: '0.85rem' }}>
              <Presentation size={15} color="#0f3d59" />
              Buka Slide Perkuliahan ({lesson.slides.length} Slide)
            </button>
          )}

          <button className="btn" onClick={handlePrint} style={{ fontSize: '0.85rem' }}>
            <Printer size={15} />
            Cetak / Ekspor PDF
          </button>
        </div>
      </header>

      {/* 1. Learning Objectives */}
      {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
        <section className="academic-callout" style={{ backgroundColor: '#f8fafc', borderColor: '#0f3d59' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f3d59', marginBottom: '0.5rem' }}>
            Tujuan Pembelajaran Khusus (Learning Objectives)
          </div>
          <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.6rem' }}>
            Setelah menyelesaikan pembelajaran pada lesson ini, Anda diharapkan mampu:
          </p>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.92rem', color: '#334155', lineHeight: 1.7 }}>
            {lesson.learningObjectives.map((obj, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>
                <MathRenderer content={obj} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 2. Conceptual Foundation / Main Content */}
      <section className="academic-prose" style={{ marginTop: '1.75rem' }}>
        <h2>1. Fondasi Konseptual & Landasan Teori</h2>
        <div style={{ whiteSpace: 'pre-line' }}>
          <MathRenderer content={lesson.content} />
        </div>
      </section>

      {/* 3. Mathematical Foundations */}
      {lesson.mathematicalFoundations && (
        <section style={{ marginTop: '2.5rem' }}>
          <h2>2. Formulasi Matematis Formal</h2>
          <p style={{ color: '#4b5563', fontSize: '0.95rem' }}>
            Berikut adalah penurunan matematis formal, notasi terstandarisasi, dan definisi variabel:
          </p>
          <div style={{ backgroundColor: '#ffffff', padding: '1.25rem 1.75rem', borderRadius: '6px', border: '1px solid #e5e7eb', margin: '1.25rem 0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            <MathRenderer content={lesson.mathematicalFoundations} />
          </div>
        </section>
      )}

      {/* 4. Worked Numerical Example */}
      {lesson.workedExample && (
        <section style={{ marginTop: '2.5rem' }}>
          <h2>3. Contoh Perhitungan Numerik Langkah demi Langkah</h2>
          <div className="academic-callout" style={{ borderColor: '#c59b27', backgroundColor: '#fcfbf7' }}>
            <div style={{ fontWeight: 700, color: '#92400e', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
              Studi Kasus / Masalah:
            </div>
            <p style={{ fontSize: '0.95rem', color: '#1f2937' }}>
              <MathRenderer content={lesson.workedExample.problemStatement} />
            </p>

            <div style={{ fontWeight: 700, color: '#1f2937', marginTop: '1rem', marginBottom: '0.5rem', fontSize: '0.92rem' }}>
              Penyelesaian Langkah demi Langkah:
            </div>
            <ol style={{ paddingLeft: '1.25rem', fontSize: '0.92rem', color: '#374151', lineHeight: 1.75 }}>
              {lesson.workedExample.stepByStepSolution.map((step, idx) => (
                <li key={idx} style={{ marginBottom: '0.4rem' }}>
                  <MathRenderer content={step} />
                </li>
              ))}
            </ol>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem', marginTop: '1rem', fontSize: '0.92rem', color: '#065f46', fontWeight: 500 }}>
              <strong>Interpretasi Hasil:</strong> <MathRenderer content={lesson.workedExample.resultInterpretation} />
            </div>
          </div>
        </section>
      )}

      {/* 5. Python Implementation */}
      {lesson.pythonImplementation && (
        <section style={{ marginTop: '2.5rem' }}>
          <h2>4. Implementasi Komputasi Python</h2>
          <p style={{ color: '#4b5563', fontSize: '0.95rem' }}>
            {lesson.pythonImplementation.description}
          </p>

          <div style={{ margin: '1rem 0' }}>
            <div style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '0.5rem 1rem', fontSize: '0.78rem', borderTopLeftRadius: '6px', borderTopRightRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code size={14} color="#38bdf8" /> Python 3 (Scientific Stack)
              </span>
              <span>Pustaka: {lesson.pythonImplementation.libraryDependencies.join(', ')}</span>
            </div>
            <pre style={{ margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              <code>{lesson.pythonImplementation.code}</code>
            </pre>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem 1.25rem', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
            <div style={{ fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Expected Output / Hasil Eksekusi:</div>
            <pre style={{ margin: 0, padding: '0.5rem', backgroundColor: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1' }}>
              <code>{lesson.pythonImplementation.expectedOutput}</code>
            </pre>
          </div>
        </section>
      )}

      {/* 6. Scientific Visualization */}
      {lesson.scientificVisualization && (
        <section style={{ marginTop: '2.5rem' }}>
          <h2>5. Visualisasi Ilmiah & Interpretasi Grafis</h2>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', textAlign: 'center', margin: '1.25rem 0' }}>
            {lesson.scientificVisualization.svgOrData ? (
              <div dangerouslySetInnerHTML={{ __html: lesson.scientificVisualization.svgOrData }} />
            ) : (
              <div style={{ padding: '2rem', backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', color: '#64748b', fontSize: '0.9rem' }}>
                [Scientific Visualization Graphic: {lesson.scientificVisualization.caption}]
              </div>
            )}
            <p style={{ marginTop: '0.75rem', fontSize: '0.86rem', color: '#475569', fontStyle: 'italic' }}>
              Figur: {lesson.scientificVisualization.caption}
            </p>
          </div>
        </section>
      )}

      {/* 7. Common Pitfalls & P-Hacking Warning */}
      {lesson.commonPitfalls && lesson.commonPitfalls.length > 0 && (
        <section style={{ marginTop: '2.5rem' }}>
          <h2>6. Kesalahan Metodologis Umum & Peringatan Peneliti</h2>
          <div className="academic-callout warning">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#b45309', marginBottom: '0.5rem' }}>
              <AlertTriangle size={18} /> Perangkap Konseptual yang Wajib Dihindari:
            </div>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.92rem', color: '#78350f', lineHeight: 1.7 }}>
              {lesson.commonPitfalls.map((pitfall, idx) => (
                <li key={idx} style={{ marginBottom: '0.35rem' }}>
                  <MathRenderer content={pitfall} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 8. Validation Procedures */}
      {lesson.validationProcedures && lesson.validationProcedures.length > 0 && (
        <section style={{ marginTop: '2.5rem' }}>
          <h2>7. Prosedur Validasi Empiris</h2>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.94rem', color: '#374151', lineHeight: 1.75 }}>
            {lesson.validationProcedures.map((proc, idx) => (
              <li key={idx} style={{ marginBottom: '0.4rem' }}>
                <MathRenderer content={proc} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 9. Practical Exercises & Self-Assessment */}
      {lesson.exercises && lesson.exercises.length > 0 && (
        <section style={{ marginTop: '2.5rem' }}>
          <h2>8. Latihan Mandiri & Uji Pemahaman</h2>
          {lesson.exercises.map((ex, idx) => (
            <div key={idx} style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 600, color: '#0f3d59', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                Latihan {idx + 1}:
              </div>
              <p style={{ fontSize: '0.92rem', color: '#1f2937' }}>
                <MathRenderer content={ex.question} />
              </p>

              {ex.hint && (
                <div style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0.5rem 0', fontStyle: 'italic' }}>
                  Petunjuk: <MathRenderer content={ex.hint} />
                </div>
              )}

              <button
                className="btn"
                onClick={() => toggleAnswer(idx)}
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.8rem', marginTop: '0.5rem' }}
              >
                <HelpCircle size={13} />
                {revealedAnswers[idx] ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan Solusi'}
              </button>

              {revealedAnswers[idx] && (
                <div style={{ marginTop: '0.75rem', padding: '0.85rem', backgroundColor: '#f0fdf4', borderRadius: '4px', border: '1px solid #bbf7d0', fontSize: '0.9rem', color: '#14532d' }}>
                  <strong>Pembahasan Ilmiah:</strong> <MathRenderer content={ex.answerExplanation} />
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* 10. Academic References */}
      {lesson.references && lesson.references.length > 0 && (
        <section style={{ marginTop: '2.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '1.1rem', color: '#1f2937', marginBottom: '0.75rem' }}>
            <BookMarked size={18} color="#0f3d59" />
            Referensi Akademik Terverifikasi
          </div>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.7 }}>
            {lesson.references.map((ref, idx) => (
              <li key={idx} style={{ marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 500, color: '#111827' }}>[{idx + 1}]</span> {ref.citation} (
                <span style={{ fontStyle: 'italic', color: '#6b7280' }}>{ref.type}</span>)
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom Navigation Controls */}
      <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '2px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="no-print">
        {prevLesson ? (
          <button
            className="btn"
            onClick={() => onNavigateLesson(prevLesson.chapterId, prevLesson.lessonId)}
            style={{ maxWidth: '45%' }}
          >
            <ArrowLeft size={16} />
            <div style={{ textAlign: 'left', overflow: 'hidden' }}>
              <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Lesson Sebelumnya</div>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.84rem' }}>
                {prevLesson.lessonId}: {prevLesson.title}
              </div>
            </div>
          </button>
        ) : <div />}

        <button
          className={`btn ${isCompleted ? 'btn-primary' : ''}`}
          onClick={handleToggleCompleted}
          style={{ padding: '0.5rem 1.25rem' }}
        >
          <CheckCircle size={16} />
          {isCompleted ? 'Selesai' : 'Tandai Selesai'}
        </button>

        {nextLesson ? (
          <button
            className="btn"
            onClick={() => onNavigateLesson(nextLesson.chapterId, nextLesson.lessonId)}
            style={{ maxWidth: '45%' }}
          >
            <div style={{ textAlign: 'right', overflow: 'hidden' }}>
              <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Lesson Selanjutnya</div>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.84rem' }}>
                {nextLesson.lessonId}: {nextLesson.title}
              </div>
            </div>
            <ArrowRight size={16} />
          </button>
        ) : <div />}
      </footer>

      {/* Slides Presentation Modal */}
      {lesson.slides && (
        <SlidesModal
          isOpen={isSlidesOpen}
          onClose={() => setIsSlidesOpen(false)}
          chapterTitle={`${chapter.id}: ${chapter.title}`}
          lessonTitle={`${lesson.id} ${lesson.title}`}
          slides={lesson.slides}
        />
      )}
    </article>
  );
};

