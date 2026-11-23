import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation } from 'lucide-react';
import { MathRenderer } from './MathRenderer';

interface SlideData {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  keyFormulaOrDiagram?: string;
}

interface SlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterTitle: string;
  lessonTitle: string;
  slides: SlideData[];
}

export const SlidesModal: React.FC<SlidesModalProps> = ({
  isOpen,
  onClose,
  chapterTitle,
  lessonTitle,
  slides,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  if (!isOpen || slides.length === 0) return null;

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '960px',
          height: '620px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          border: '1px solid #334155',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          padding: 0,
        }}
      >
        {/* Slide Topbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.75rem', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Presentation size={18} color="#c59b27" />
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              {chapterTitle} &bull; {lessonTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.2rem' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Slide Body */}
        <div style={{ flex: 1, padding: '2.5rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Slide {currentSlide.slideNumber} of {slides.length}
          </div>
          <h2 style={{ fontSize: '1.9rem', color: '#f8fafc', marginBottom: '1.75rem', fontWeight: 700, border: 'none', padding: 0 }}>
            {currentSlide.title}
          </h2>

          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', fontSize: '1.15rem', lineHeight: 1.8, color: '#e2e8f0', marginBottom: '1.5rem' }}>
            {currentSlide.bulletPoints.map((pt, idx) => (
              <li key={idx} style={{ marginBottom: '0.6rem' }}>
                <MathRenderer content={pt} />
              </li>
            ))}
          </ul>

          {currentSlide.keyFormulaOrDiagram && (
            <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '6px', border: '1px solid #334155', marginTop: '1rem', textAlign: 'center' }}>
              <MathRenderer content={currentSlide.keyFormulaOrDiagram} block={true} />
            </div>
          )}
        </div>

        {/* Slide Controls Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.75rem', borderTop: '1px solid #1e293b', backgroundColor: '#090d16' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Gunakan tombol panah &larr; / &rarr; atau Spasi untuk berpindah slide
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className="btn"
              disabled={currentSlideIndex === 0}
              onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
              style={{ padding: '0.35rem 0.75rem', backgroundColor: '#1e293b', color: '#f8fafc', borderColor: '#334155', opacity: currentSlideIndex === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} /> Sebelumnya
            </button>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', padding: '0 0.5rem' }}>
              {currentSlideIndex + 1} / {slides.length}
            </span>
            <button
              className="btn"
              disabled={currentSlideIndex === slides.length - 1}
              onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))}
              style={{ padding: '0.35rem 0.75rem', backgroundColor: '#1e293b', color: '#f8fafc', borderColor: '#334155', opacity: currentSlideIndex === slides.length - 1 ? 0.4 : 1 }}
            >
              Selanjutnya <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

