import React from 'react';
import { Search, BookOpen, Compass, Terminal, FileText, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'curriculum' | 'paths' | 'labs' | 'templates';
  setActiveTab: (tab: 'home' | 'curriculum' | 'paths' | 'labs' | 'templates') => void;
  onOpenSearch: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  completedLessonsCount,
  totalLessonsCount,
}) => {
  const percentage = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button
          onClick={() => setActiveTab('home')}
          style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ backgroundColor: '#0f3d59', color: '#c59b27', fontWeight: 800, padding: '0.35rem 0.65rem', borderRadius: '4px', fontSize: '0.88rem', letterSpacing: '0.05em' }}>
            ITERA
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#111827', lineHeight: 1.2 }}>
              Scientific Research Learning Hub
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              From Scientific Thinking to Reproducible Research
            </div>
          </div>
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: '1rem' }}>
          <button
            className={`btn ${activeTab === 'curriculum' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('curriculum')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.84rem' }}
          >
            <BookOpen size={15} />
            Kurikulum Master
          </button>
          <button
            className={`btn ${activeTab === 'paths' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('paths')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.84rem' }}
          >
            <Compass size={15} />
            Learning Paths
          </button>
          <button
            className={`btn ${activeTab === 'labs' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('labs')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.84rem' }}
          >
            <Terminal size={15} />
            Lab Komputasi
          </button>
          <button
            className={`btn ${activeTab === 'templates' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('templates')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.84rem' }}
          >
            <FileText size={15} />
            Template Riset
          </button>
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onOpenSearch}
          className="btn"
          style={{ padding: '0.35rem 0.85rem', color: '#6b7280', fontSize: '0.84rem', minWidth: '180px', justifyContent: 'space-between' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Search size={14} />
            Cari materi...
          </span>
          <kbd style={{ backgroundColor: '#ebecef', padding: '0.1rem 0.4rem', borderRadius: '3px', fontSize: '0.72rem', border: '1px solid #d1d5db' }}>
            /
          </kbd>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid #e5e7eb', paddingLeft: '1rem' }} title={`Progres: ${completedLessonsCount} dari ${totalLessonsCount} lesson selesai`}>
          <CheckCircle2 size={16} color={percentage > 0 ? '#065f46' : '#9ca3af'} />
          <div style={{ fontSize: '0.8rem' }}>
            <div style={{ fontWeight: 600, color: '#111827' }}>{percentage}%</div>
            <div style={{ fontSize: '0.68rem', color: '#6b7280' }}>{completedLessonsCount}/{totalLessonsCount} Selesai</div>
          </div>
        </div>
      </div>
    </header>
  );
};

