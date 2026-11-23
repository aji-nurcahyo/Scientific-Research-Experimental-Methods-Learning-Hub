import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check, Sparkles } from 'lucide-react';
import { Level } from '../types/curriculum';
import { getEffectiveChapterStatus } from '../data/lessonRegistry';

interface SidebarProps {
  levels: Level[];
  activeChapterId?: string;
  activeLessonId?: string;
  onSelectChapter: (chapterId: string) => void;
  onSelectLesson: (chapterId: string, lessonId: string) => void;
  completedLessons: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  levels,
  activeChapterId,
  activeLessonId,
  onSelectChapter,
  onSelectLesson,
  completedLessons,
}) => {
  // Store expanded level IDs, defaulting to Level 1 and Level 2 expanded
  const [expandedLevels, setExpandedLevels] = useState<Record<number, boolean>>({ 1: true, 2: true });
  // Store expanded chapter IDs
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'CH-01': true,
    'CH-02': true,
  });

  const toggleLevel = (levelId: number) => {
    setExpandedLevels((prev) => ({ ...prev, [levelId]: !prev[levelId] }));
  };

  const toggleChapter = (chapterId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  return (
    <aside className="sidebar no-print">
      <div style={{ padding: '0 1.25rem 0.75rem', borderBottom: '1px solid #e5e7eb', marginBottom: '0.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Daftar Isi Kurikulum
        </div>
        <div style={{ fontSize: '0.82rem', color: '#374151', marginTop: '0.2rem' }}>
          51 Chapter • 174+ Lessons
        </div>
      </div>

      {levels.map((level) => {
        const isLevelExpanded = !!expandedLevels[level.id];

        return (
          <div key={level.id} style={{ marginBottom: '0.25rem' }}>
            <div
              className="sidebar-level-title"
              onClick={() => toggleLevel(level.id)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <span>{level.title.split(':')[0]}</span>
              {isLevelExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>

            {isLevelExpanded && (
              <div>
                {level.sections.map((section) => (
                  <div key={section.id}>
                    <div style={{ padding: '0.4rem 1.25rem', fontSize: '0.74rem', color: '#9ca3af', fontWeight: 600 }}>
                      {section.title}
                    </div>

                    {section.chapters.map((chapter) => {
                      const isChActive = activeChapterId === chapter.id;
                      const isChExpanded = !!expandedChapters[chapter.id] || isChActive;

                      return (
                        <div key={chapter.id}>
                          <div
                            className={`sidebar-chapter-item ${isChActive ? 'active' : ''}`}
                            onClick={() => {
                              onSelectChapter(chapter.id);
                              setExpandedChapters((prev) => ({ ...prev, [chapter.id]: true }));
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
                              <button
                                onClick={(e) => toggleChapter(chapter.id, e)}
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit' }}
                              >
                                {isChExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                              </button>
                              <span style={{ fontWeight: 600, fontSize: '0.82rem', flexShrink: 0 }}>
                                {chapter.id}
                              </span>
                              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {chapter.title}
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
                              {chapter.gatewayMilestone && (
                                <span title="Gateway Milestone Chapter" style={{ color: '#c59b27' }}>
                                  <Sparkles size={12} />
                                </span>
                              )}
                              {getEffectiveChapterStatus(chapter) === 'verified' && (
                                <span title="Modul Terverifikasi" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#065f46' }} />
                              )}
                            </div>
                          </div>

                          {isChExpanded && chapter.lessons && chapter.lessons.length > 0 && (
                            <div style={{ borderLeft: '1px solid #e5e7eb', marginLeft: '1.8rem', paddingLeft: '0.2rem' }}>
                              {chapter.lessons.map((lesson) => {
                                const isLessonActive = activeLessonId === lesson.id;
                                const isDone = completedLessons.includes(lesson.id);

                                return (
                                  <div
                                    key={lesson.id}
                                    className={`sidebar-lesson-item ${isLessonActive ? 'active' : ''}`}
                                    onClick={() => onSelectLesson(chapter.id, lesson.id)}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
                                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: isLessonActive ? '#0f3d59' : '#9ca3af' }}>
                                        {lesson.id}
                                      </span>
                                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {lesson.title}
                                      </span>
                                    </div>
                                    {isDone && <Check size={12} color="#065f46" />}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};

