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
      <div className="topbar-main">
        <button
          onClick={() => setActiveTab('home')}
          className="topbar-brand"
        >
          <div className="topbar-logo">
            ITERA
          </div>
          <div className="topbar-titles">
            <div className="topbar-title">
              Scientific Research Learning Hub
            </div>
            <div className="topbar-subtitle">
              From Scientific Thinking to Reproducible Research
            </div>
          </div>
        </button>

        <div className="topbar-right">
          <button
            onClick={onOpenSearch}
            className="btn topbar-search"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Search size={14} />
              <span className="search-text">Cari materi...</span>
            </span>
            <kbd className="search-kbd">/</kbd>
          </button>

          <div className="topbar-progress" title={`Progres: ${completedLessonsCount} dari ${totalLessonsCount} lesson selesai`}>
            <CheckCircle2 size={16} color={percentage > 0 ? '#065f46' : '#9ca3af'} />
            <div style={{ fontSize: '0.8rem' }}>
              <div style={{ fontWeight: 600, color: '#111827' }}>{percentage}%</div>
              <div className="progress-details" style={{ fontSize: '0.68rem', color: '#6b7280' }}>{completedLessonsCount}/{totalLessonsCount}</div>
            </div>
          </div>
        </div>
      </div>

      <nav className="topbar-nav">
        <button
          className={`btn ${activeTab === 'curriculum' ? 'btn-primary' : ''}`}
          onClick={() => setActiveTab('curriculum')}
        >
          <BookOpen size={15} />
          <span>Kurikulum</span>
        </button>
        <button
          className={`btn ${activeTab === 'paths' ? 'btn-primary' : ''}`}
          onClick={() => setActiveTab('paths')}
        >
          <Compass size={15} />
          <span>Learning Paths</span>
        </button>
        <button
          className={`btn ${activeTab === 'labs' ? 'btn-primary' : ''}`}
          onClick={() => setActiveTab('labs')}
        >
          <Terminal size={15} />
          <span>Lab Komputasi</span>
        </button>
        <button
          className={`btn ${activeTab === 'templates' ? 'btn-primary' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <FileText size={15} />
          <span>Template Riset</span>
        </button>
      </nav>
    </header>
  );
};

