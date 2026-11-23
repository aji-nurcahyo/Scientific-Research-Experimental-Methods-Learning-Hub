import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Sun,
  Moon,
  Download,
  X,
  Presentation,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Code2,
  Variable,
  Layers,
} from 'lucide-react';
import { renderInlineText } from './MathRenderer';
import { exportChapterToPPTX } from '../utils/pptxExport';

export type SlideTheme = 'dark' | 'light';

export interface SlideData {
  slideNumber: number;
  layout?: 'concept' | 'derivation' | 'example' | 'algorithm' | 'warning' | 'exercise' | 'comparison' | 'summary';
  title: string;
  subtitle?: string;
  lead?: string;
  bulletPoints: string[];
  keyFormulaOrDiagram?: string;
  notes?: string;
}

export interface PresentationViewerProps {
  slides: SlideData[];
  chapterNumber: string;
  chapterTitle: string;
  lessonTitle?: string;
  onClose?: () => void;
}

export const PresentationViewer: React.FC<PresentationViewerProps> = ({
  slides,
  chapterNumber,
  chapterTitle,
  lessonTitle,
  onClose,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [slideTheme, setSlideTheme] = useState<SlideTheme>(() => {
    try {
      const saved = localStorage.getItem('sr_slide_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides?.length || 0;
  const safeIndex = Math.min(currentSlideIndex, Math.max(0, totalSlides - 1));
  const currentSlide = slides?.[safeIndex] || slides?.[0];

  useEffect(() => {
    setCurrentSlideIndex(0);
    setShowNotes(false);
  }, [chapterNumber]);

  const toggleSlideTheme = useCallback(() => {
    setSlideTheme((prev) => {
      const next: SlideTheme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('sr_slide_theme', next);
      } catch {
        // Storage blocked
      }
      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
      console.error('Fullscreen toggle error:', e);
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        void toggleFullscreen();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        toggleSlideTheme();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key === '?' || e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setShowHelp((prev) => !prev);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlideIndex(totalSlides - 1);
      } else if (e.key === 'Escape' && !document.fullscreenElement && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, toggleFullscreen, toggleSlideTheme, totalSlides, onClose]);

  const handleExportPPTX = async () => {
    setIsExporting(true);
    try {
      const chId = chapterNumber.startsWith('CH-') ? chapterNumber : `CH-${chapterNumber}`;
      await exportChapterToPPTX({
        chapterId: chId,
        chapterTitle: chapterTitle.replace(/^CH-\d+:\s*/, ''),
        subtitle: lessonTitle,
        slides,
      });
    } catch (err) {
      console.error('Failed to export PPTX:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Determine slide category from title or layout
  const getSlideCategory = (slide: SlideData) => {
    if (slide.layout) return slide.layout;
    const titleLower = slide.title.toLowerCase();
    if (titleLower.includes('tinjauan') || titleLower.includes('capaian')) return 'concept';
    if (titleLower.includes('fondasi') || titleLower.includes('konseptual')) return 'concept';
    if (titleLower.includes('arsitektur') || titleLower.includes('prinsip')) return 'concept';
    if (titleLower.includes('matematis') || titleLower.includes('notasi')) return 'derivation';
    if (titleLower.includes('kasus') || titleLower.includes('masalah') || titleLower.includes('solusi')) return 'example';
    if (titleLower.includes('komputasi') || titleLower.includes('python') || titleLower.includes('eksekusi')) return 'algorithm';
    if (titleLower.includes('perangkap') || titleLower.includes('p-hacking') || titleLower.includes('warning')) return 'warning';
    if (titleLower.includes('validasi') || titleLower.includes('integritas')) return 'example';
    if (titleLower.includes('sintesis') || titleLower.includes('latihan')) return 'exercise';
    return 'concept';
  };

  const category = currentSlide ? getSlideCategory(currentSlide) : 'concept';

  const categoryIcons: Record<string, React.ReactNode> = {
    concept: <BookOpen size={13} />,
    derivation: <Variable size={13} />,
    example: <Layers size={13} />,
    algorithm: <Code2 size={13} />,
    warning: <AlertTriangle size={13} />,
    exercise: <CheckCircle2 size={13} />,
    comparison: <Layers size={13} />,
    summary: <BookOpen size={13} />,
  };

  const categoryLabels: Record<string, string> = {
    concept: 'Fondasi Konseptual',
    derivation: 'Formulasi Matematis',
    example: 'Studi Kasus & Pembuktian',
    algorithm: 'Implementasi Komputasi',
    warning: 'Peringatan Metodologis & P-Hacking',
    exercise: 'Sintesis & Latihan Mandiri',
    comparison: 'Komparasi Metodologis',
    summary: 'Rangkuman Materi',
  };

  const progressPct = totalSlides > 0 ? ((safeIndex + 1) / totalSlides) * 100 : 0;

  if (!slides || slides.length === 0 || !currentSlide) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Slide presentasi untuk bab ini belum tersedia.
      </div>
    );
  }

  return (
    <div
      className="presentation-container"
      data-slide-theme={slideTheme}
      ref={containerRef}
      aria-label="Presentation Slide Viewer"
    >
      {/* Top Header */}
      <div className="presentation-header">
        <div className="presentation-title">
          <Presentation size={15} color="#c59b27" />
          <span>Institut Teknologi Sumatera</span>
          <span className="presentation-title-sep">·</span>
          <span className="presentation-title-chapter">
            {chapterNumber}: {chapterTitle}
          </span>
          {lessonTitle && (
            <>
              <span className="presentation-title-sep">·</span>
              <span style={{ opacity: 0.85 }}>{lessonTitle}</span>
            </>
          )}
        </div>
        <div className="presentation-actions">
          <button
            className="btn"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.35rem' }}
            onClick={toggleSlideTheme}
            title={`Ubah Tema Slide (T) - Mode saat ini: ${slideTheme === 'dark' ? 'Dark' : 'Light'}`}
          >
            {slideTheme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            <span>{slideTheme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button
            className="btn"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.35rem' }}
            onClick={() => setShowNotes((prev) => !prev)}
            title="Catatan Pengajar / Speaker Notes (N)"
          >
            <FileText size={13} />
            <span>Notes</span>
          </button>
          <button
            className="btn"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.35rem' }}
            onClick={handleExportPPTX}
            disabled={isExporting}
            title="Unduh slide presentasi dalam format Microsoft PowerPoint (.pptx) yang dapat diedit"
          >
            <Download size={13} />
            <span>{isExporting ? 'Mengekspor...' : 'Unduh PPTX'}</span>
          </button>
          <button
            className="btn"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.35rem' }}
            onClick={() => setShowHelp((prev) => !prev)}
            title="Bantuan Navigasi (?)"
          >
            <HelpCircle size={13} />
          </button>
          <button
            className="btn"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.35rem' }}
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Keluar Layar Penuh (F)' : 'Layar Penuh (F)'}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'var(--slide-text-muted)', cursor: 'pointer', padding: '0.2rem' }}
              title="Tutup Presentasi (Esc)"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* 16:9 Presentation Screen */}
      <div className="presentation-screen">
        <div className="slide-content-area">
          {/* Category Badge */}
          <div className={`slide-category-badge slide-category-${category}`}>
            {categoryIcons[category] || <BookOpen size={13} />}
            <span>{categoryLabels[category] || 'Materi Perkuliahan'}</span>
          </div>

          {/* Slide Title */}
          <h2 className="slide-title">{renderInlineText(currentSlide.title)}</h2>

          {/* Optional Lead / Subtitle */}
          {currentSlide.lead && <div className="slide-lead">{renderInlineText(currentSlide.lead)}</div>}

          {/* Bullet Points */}
          <ul className="slide-body-bullets">
            {currentSlide.bulletPoints.map((pt, idx) => (
              <li key={idx} className="slide-list-item">
                <span className="slide-bullet-dot">&bull;</span>
                <div>{renderInlineText(pt)}</div>
              </li>
            ))}
          </ul>

          {/* Key Formula, Diagram, or Callout */}
          {currentSlide.keyFormulaOrDiagram && (
            <div className={`slide-callout-box ${category === 'warning' ? 'border-rose-500/50 bg-rose-950/20' : ''}`}>
              <div className="slide-callout-header">
                {category === 'warning' ? 'Peringatan Metodologis Kritis:' : category === 'algorithm' ? 'Struktur Algoritma & Formula Kunci:' : 'Formulasi & Rujukan Kunci:'}
              </div>
              <div style={{ textAlign: currentSlide.keyFormulaOrDiagram.includes('$$') ? 'center' : 'left' }}>
                {renderInlineText(currentSlide.keyFormulaOrDiagram)}
              </div>
            </div>
          )}
        </div>

        {/* Slide Footer */}
        <div className="presentation-footer">
          <div className="presentation-branding">
            Scientific Research &amp; Experimental Methods • ITERA
          </div>
          <div className="presentation-counter-footer">
            Slide {currentSlide.slideNumber} of {totalSlides}
          </div>
        </div>

        {/* Progress Track */}
        <div className="presentation-progress-track" style={{ width: `${progressPct}%` }} />
      </div>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <div className="slide-notes-drawer">
          <div className="slide-notes-heading">Catatan Pengajar / Pedagogical Notes:</div>
          <div>
            {currentSlide.notes
              ? renderInlineText(currentSlide.notes)
              : renderInlineText(`Fokus pengajaran pada slide ${currentSlide.slideNumber}: tekankan pemahaman konsep inti dan kaitannya dengan integritas metodologis riset komputasi.`)}
          </div>
        </div>
      )}

      {/* Keyboard Help Modal */}
      {showHelp && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--slide-help-overlay)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '2rem',
          }}
          onClick={() => setShowHelp(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--slide-help-modal-bg)',
              border: '1px solid var(--slide-help-modal-border)',
              borderRadius: '8px',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slide-help-modal-title)', margin: 0 }}>
                Navigasi Keyboard Slide
              </h3>
              <button onClick={() => setShowHelp(false)} style={{ background: 'none', border: 'none', color: 'var(--slide-text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem 1.25rem', fontSize: '0.9rem', color: 'var(--slide-help-modal-text)' }}>
              <div><kbd style={{ padding: '0.2rem 0.5rem', background: 'var(--slide-help-kbd-bg)', borderRadius: '4px', border: '1px solid var(--slide-border)' }}>&rarr;</kbd> / <kbd style={{ padding: '0.2rem 0.5rem', background: 'var(--slide-help-kbd-bg)', borderRadius: '4px', border: '1px solid var(--slide-border)' }}>Space</kbd></div>
              <div>Slide Selanjutnya</div>
              <div><kbd style={{ padding: '0.2rem 0.5rem', background: 'var(--slide-help-kbd-bg)', borderRadius: '4px', border: '1px solid var(--slide-border)' }}>&larr;</kbd></div>
              <div>Slide Sebelumnya</div>
              <div><kbd style={{ padding: '0.2rem 0.5rem', background: 'var(--slide-help-kbd-bg)', borderRadius: '4px', border: '1px solid var(--slide-border)' }}>F</kbd></div>
              <div>Layar Penuh (Fullscreen)</div>
              <div><kbd style={{ padding: '0.2rem 0.5rem', background: 'var(--slide-help-kbd-bg)', borderRadius: '4px', border: '1px solid var(--slide-border)' }}>T</kbd></div>
              <div>Ubah Tema (Dark / Light)</div>
              <div><kbd style={{ padding: '0.2rem 0.5rem', background: 'var(--slide-help-kbd-bg)', borderRadius: '4px', border: '1px solid var(--slide-border)' }}>N</kbd></div>
              <div>Tampilkan / Sembunyikan Catatan</div>
              <div><kbd style={{ padding: '0.2rem 0.5rem', background: 'var(--slide-help-kbd-bg)', borderRadius: '4px', border: '1px solid var(--slide-border)' }}>Home</kbd> / <kbd style={{ padding: '0.2rem 0.5rem', background: 'var(--slide-help-kbd-bg)', borderRadius: '4px', border: '1px solid var(--slide-border)' }}>End</kbd></div>
              <div>Slide Pertama / Terakhir</div>
              <div><kbd style={{ padding: '0.2rem 0.5rem', background: 'var(--slide-help-kbd-bg)', borderRadius: '4px', border: '1px solid var(--slide-border)' }}>Esc</kbd></div>
              <div>Tutup Presentasi</div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="presentation-controls-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="btn"
            style={{ padding: '0.35rem 0.75rem' }}
            onClick={handlePrev}
            disabled={safeIndex === 0}
            title="Slide Sebelumnya (&larr;)"
          >
            <ChevronLeft size={16} />
            <span>Sebelumnya</span>
          </button>
          <button
            className="btn"
            style={{ padding: '0.35rem 0.75rem' }}
            onClick={handleNext}
            disabled={safeIndex >= totalSlides - 1}
            title="Slide Selanjutnya (&rarr;)"
          >
            <span>Selanjutnya</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="slide-counter">
          Slide {safeIndex + 1} dari {totalSlides}
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--slide-footer-text)' }}>
          Tekan <kbd style={{ padding: '0.1rem 0.35rem', background: 'var(--slide-btn-bg)', borderRadius: '3px' }}>F</kbd> untuk Layar Penuh
        </div>
      </div>
    </div>
  );
};
