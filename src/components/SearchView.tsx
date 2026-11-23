import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, ArrowRight } from 'lucide-react';
import { CHAPTERS_MAP } from '../data/curriculumMeta';

interface SearchViewProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapterId: string) => void;
  onSelectLesson: (chapterId: string, lessonId: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  onSelectLesson,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        // open search handled by parent or shortcut
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search through all chapters and lessons
  const results: {
    type: 'chapter' | 'lesson';
    chapterId: string;
    lessonId?: string;
    title: string;
    subtitle?: string;
    levelId: number;
  }[] = [];

  if (trimmed.length > 0) {
    Object.values(CHAPTERS_MAP).forEach((ch) => {
      // Check chapter
      if (
        ch.id.toLowerCase().includes(trimmed) ||
        ch.title.toLowerCase().includes(trimmed) ||
        ch.overview.toLowerCase().includes(trimmed) ||
        ch.competencyMappings.some((c) => c.toLowerCase().includes(trimmed))
      ) {
        results.push({
          type: 'chapter',
          chapterId: ch.id,
          title: `${ch.id}: ${ch.title}`,
          subtitle: `Level ${ch.levelId} &bull; ${ch.lessons.length} Lesson`,
          levelId: ch.levelId,
        });
      }

      // Check lessons
      ch.lessons.forEach((l) => {
        if (
          l.id.toLowerCase().includes(trimmed) ||
          l.title.toLowerCase().includes(trimmed)
        ) {
          results.push({
            type: 'lesson',
            chapterId: ch.id,
            lessonId: l.id,
            title: `Lesson ${l.id}: ${l.title}`,
            subtitle: `${ch.id}: ${ch.title}`,
            levelId: ch.levelId,
          });
        }
      });
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', padding: 0, overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb' }}>
          <Search size={18} color="#64748b" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari konsep, rumus, nomor bab (e.g., GUM, DoE, regression, CH-11)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: '#0f172a',
              background: 'transparent',
            }}
          />
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.2rem' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '0.5rem' }}>
          {trimmed.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.88rem' }}>
              Ketikkan kata kunci untuk mencari di antara 51 Chapter dan 174+ Lesson...
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.88rem' }}>
              Tidak ditemukan hasil untuk "{query}". Coba kata kunci lain.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {results.slice(0, 20).map((res, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (res.type === 'chapter') {
                      onSelectChapter(res.chapterId);
                    } else if (res.lessonId) {
                      onSelectLesson(res.chapterId, res.lessonId);
                    }
                    onClose();
                  }}
                  style={{
                    padding: '0.65rem 0.9rem',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      backgroundColor: res.type === 'chapter' ? '#e8f0f6' : '#f1f5f9',
                      color: res.type === 'chapter' ? '#0f3d59' : '#64748b',
                      padding: '0.3rem',
                      borderRadius: '4px',
                    }}>
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>
                        {res.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }} dangerouslySetInnerHTML={{ __html: res.subtitle || '' }} />
                    </div>
                  </div>

                  <ArrowRight size={14} color="#94a3b8" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '0.6rem 1.25rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e5e7eb', fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
          <span>Hasil pencarian: {results.length} item</span>
          <span>Tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
};

