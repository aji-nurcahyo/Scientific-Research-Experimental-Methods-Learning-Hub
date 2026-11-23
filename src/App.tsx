import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { ChapterOverview } from './components/ChapterOverview';
import { LessonView } from './components/LessonView';
import { LearningPathsView } from './components/LearningPathsView';
import { LaboratoriesView } from './components/LaboratoriesView';
import { TemplatesView } from './components/TemplatesView';
import { SearchView } from './components/SearchView';
import { LEVELS, CHAPTERS_MAP } from './data/curriculumMeta';
import { getStoredProgress, setLastVisitedLesson } from './utils/progressTracker';
import { getEnrichedLesson, ensureChapterLoaded } from './data/lessonRegistry';
import { Chapter, Lesson } from './types/curriculum';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'curriculum' | 'paths' | 'labs' | 'templates'>('home');
  const [activeChapterId, setActiveChapterId] = useState<string>('CH-01');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [progressState, setProgressState] = useState(() => getStoredProgress());
  const [, setLoadedChapterVersion] = useState(0);

  // Lazy load chapter lesson content on activeChapterId change
  useEffect(() => {
    if (activeChapterId) {
      ensureChapterLoaded(activeChapterId).then(() => {
        setLoadedChapterVersion((v) => v + 1);
      });
    }
  }, [activeChapterId]);

  // Listen for hash change for direct URL links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('lesson-')) {
        const lid = hash.replace('lesson-', '');
        // find chapter
        for (const ch of Object.values(CHAPTERS_MAP)) {
          const l = ch.lessons.find((item) => item.id === lid);
          if (l) {
            setActiveChapterId(ch.id);
            setActiveLessonId(lid);
            setActiveTab('curriculum');
            break;
          }
        }
      } else if (hash.startsWith('chapter-')) {
        const cid = hash.replace('chapter-', '');
        if (CHAPTERS_MAP[cid]) {
          setActiveChapterId(cid);
          setActiveLessonId(null);
          setActiveTab('curriculum');
        }
      } else if (hash === 'paths') {
        setActiveTab('paths');
      } else if (hash === 'labs') {
        setActiveTab('labs');
      } else if (hash === 'templates') {
        setActiveTab('templates');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const totalLessonsCount = Object.values(CHAPTERS_MAP).reduce((sum, ch) => sum + ch.lessons.length, 0);

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setActiveLessonId(null);
    setActiveTab('curriculum');
    window.location.hash = `chapter-${chapterId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (chapterId: string, lessonId: string) => {
    setActiveChapterId(chapterId);
    setActiveLessonId(lessonId);
    setActiveTab('curriculum');
    setLastVisitedLesson(lessonId);
    window.location.hash = `lesson-${lessonId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshProgress = () => {
    setProgressState(getStoredProgress());
  };

  const activeChapter: Chapter = CHAPTERS_MAP[activeChapterId] || CHAPTERS_MAP['CH-01'];
  const rawLesson = activeLessonId
    ? activeChapter.lessons.find((l) => l.id === activeLessonId)
    : undefined;
  const activeLesson: Lesson | undefined = rawLesson
    ? getEnrichedLesson(rawLesson)
    : undefined;

  // Find next and prev lessons in active chapter or across curriculum
  let prevLesson: { chapterId: string; lessonId: string; title: string } | undefined;
  let nextLesson: { chapterId: string; lessonId: string; title: string } | undefined;

  if (activeLesson) {
    const chLessons = activeChapter.lessons;
    const curIdx = chLessons.findIndex((l) => l.id === activeLesson.id);

    if (curIdx > 0) {
      prevLesson = {
        chapterId: activeChapter.id,
        lessonId: chLessons[curIdx - 1].id,
        title: chLessons[curIdx - 1].title,
      };
    }

    if (curIdx < chLessons.length - 1) {
      nextLesson = {
        chapterId: activeChapter.id,
        lessonId: chLessons[curIdx + 1].id,
        title: chLessons[curIdx + 1].title,
      };
    }
  }

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') window.location.hash = '';
          else if (tab === 'paths') window.location.hash = 'paths';
          else if (tab === 'labs') window.location.hash = 'labs';
          else if (tab === 'templates') window.location.hash = 'templates';
          else if (tab === 'curriculum') window.location.hash = `chapter-${activeChapterId}`;
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        completedLessonsCount={progressState.completedLessons.length}
        totalLessonsCount={totalLessonsCount}
      />

      <div className="main-layout">
        <Sidebar
          levels={LEVELS}
          activeChapterId={activeChapterId}
          activeLessonId={activeLessonId || undefined}
          onSelectChapter={handleSelectChapter}
          onSelectLesson={handleSelectLesson}
          completedLessons={progressState.completedLessons}
        />

        <main className="content-area">
          {activeTab === 'home' && (
            <HomeView
              levels={LEVELS}
              onSelectLevel={() => {
                setActiveTab('curriculum');
              }}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.location.hash = tab;
              }}
              onSelectChapter={handleSelectChapter}
            />
          )}

          {activeTab === 'curriculum' && !activeLesson && (
            <ChapterOverview
              chapter={activeChapter}
              onSelectLesson={handleSelectLesson}
              onNavigateChapter={handleSelectChapter}
              onNavigateHome={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'curriculum' && activeLesson && (
            <LessonView
              chapter={activeChapter}
              lesson={activeLesson}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              onNavigateLesson={handleSelectLesson}
              onNavigateChapter={handleSelectChapter}
              onNavigateHome={() => setActiveTab('home')}
              onToggleComplete={handleRefreshProgress}
            />
          )}

          {activeTab === 'paths' && (
            <LearningPathsView onSelectChapter={handleSelectChapter} />
          )}

          {activeTab === 'labs' && (
            <LaboratoriesView onSelectChapter={handleSelectChapter} />
          )}

          {activeTab === 'templates' && (
            <TemplatesView />
          )}
        </main>
      </div>

      <SearchView
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectChapter={handleSelectChapter}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  );
}

