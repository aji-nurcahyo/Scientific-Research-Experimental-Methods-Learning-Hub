import { Chapter, ContentStatus, Lesson } from '../types/curriculum';

export const VERIFIED_CHAPTER_IDS = new Set<string>([
  'CH-01', 'CH-02', 'CH-03', 'CH-04', 'CH-05', 'CH-06', 'CH-07',
  'CH-08', 'CH-09', 'CH-10', 'CH-11', 'CH-12', 'CH-13', 'CH-14', 'CH-15',
  'CH-16', 'CH-17', 'CH-18', 'CH-19', 'CH-20', 'CH-21', 'CH-22', 'CH-23',
  'CH-24', 'CH-25', 'CH-26', 'CH-27', 'CH-28', 'CH-29', 'CH-30', 'CH-31',
  'CH-32', 'CH-33', 'CH-34', 'CH-35', 'CH-36', 'CH-37',
  'CH-38', 'CH-39', 'CH-40', 'CH-41', 'CH-42', 'CH-43', 'CH-44',
  'CH-45', 'CH-46', 'CH-47', 'CH-48', 'CH-49', 'CH-50', 'CH-51',
]);

// Registry of fully written, production-ready lesson content (loaded on demand)
export const LESSON_CONTENT_REGISTRY: Record<string, Partial<Lesson>> = {};
const LOADED_CHAPTERS = new Set<string>();

export const CHAPTER_LOADERS: Record<string, () => Promise<{ [key: string]: Record<string, Partial<Lesson>> }>> = {
  'CH-01': () => import('../lessons/ch01'),
  'CH-02': () => import('../lessons/ch02'),
  'CH-03': () => import('../lessons/ch03'),
  'CH-04': () => import('../lessons/ch04'),
  'CH-05': () => import('../lessons/ch05'),
  'CH-06': () => import('../lessons/ch06'),
  'CH-07': () => import('../lessons/ch07'),
  'CH-08': () => import('../lessons/ch08'),
  'CH-09': () => import('../lessons/ch09'),
  'CH-10': () => import('../lessons/ch10'),
  'CH-11': () => import('../lessons/ch11'),
  'CH-12': () => import('../lessons/ch12'),
  'CH-13': () => import('../lessons/ch13'),
  'CH-14': () => import('../lessons/ch14'),
  'CH-15': () => import('../lessons/ch15'),
  'CH-16': () => import('../lessons/ch16'),
  'CH-17': () => import('../lessons/ch17'),
  'CH-18': () => import('../lessons/ch18'),
  'CH-19': () => import('../lessons/ch19'),
  'CH-20': () => import('../lessons/ch20'),
  'CH-21': () => import('../lessons/ch21'),
  'CH-22': () => import('../lessons/ch22'),
  'CH-23': () => import('../lessons/ch23'),
  'CH-24': () => import('../lessons/ch24'),
  'CH-25': () => import('../lessons/ch25'),
  'CH-26': () => import('../lessons/ch26'),
  'CH-27': () => import('../lessons/ch27'),
  'CH-28': () => import('../lessons/ch28'),
  'CH-29': () => import('../lessons/ch29'),
  'CH-30': () => import('../lessons/ch30'),
  'CH-31': () => import('../lessons/ch31'),
  'CH-32': () => import('../lessons/ch32'),
  'CH-33': () => import('../lessons/ch33'),
  'CH-34': () => import('../lessons/ch34'),
  'CH-35': () => import('../lessons/ch35'),
  'CH-36': () => import('../lessons/ch36'),
  'CH-37': () => import('../lessons/ch37'),
  'CH-38': () => import('../lessons/ch38'),
  'CH-39': () => import('../lessons/ch39'),
  'CH-40': () => import('../lessons/ch40'),
  'CH-41': () => import('../lessons/ch41'),
  'CH-42': () => import('../lessons/ch42'),
  'CH-43': () => import('../lessons/ch43'),
  'CH-44': () => import('../lessons/ch44'),
  'CH-45': () => import('../lessons/ch45'),
  'CH-46': () => import('../lessons/ch46'),
  'CH-47': () => import('../lessons/ch47'),
  'CH-48': () => import('../lessons/ch48'),
  'CH-49': () => import('../lessons/ch49'),
  'CH-50': () => import('../lessons/ch50'),
  'CH-51': () => import('../lessons/ch51'),
};

export async function ensureChapterLoaded(chapterId: string): Promise<boolean> {
  if (LOADED_CHAPTERS.has(chapterId)) return true;
  const loader = CHAPTER_LOADERS[chapterId];
  if (!loader) return false;
  try {
    const mod = await loader();
    for (const val of Object.values(mod)) {
      if (typeof val === 'object' && val !== null) {
        Object.assign(LESSON_CONTENT_REGISTRY, val);
      }
    }
    LOADED_CHAPTERS.add(chapterId);
    return true;
  } catch (err) {
    console.error(`Failed to load chapter ${chapterId}:`, err);
    return false;
  }
}

export function registerLessons(lessons: Record<string, Partial<Lesson>>) {
  Object.assign(LESSON_CONTENT_REGISTRY, lessons);
}

export function getEnrichedLesson(baseLesson: Lesson): Lesson {
  const enriched = LESSON_CONTENT_REGISTRY[baseLesson.id];
  if (!enriched) return baseLesson;
  return {
    ...baseLesson,
    ...enriched,
    status: (enriched.status as any) || (baseLesson.status === 'planned' ? 'verified' : baseLesson.status),
  };
}

export function getEffectiveChapterStatus(chapter: Chapter): ContentStatus {
  if (chapter.status === 'verified' || chapter.status === 'published') return chapter.status;
  if (VERIFIED_CHAPTER_IDS.has(chapter.id)) return 'verified';
  return chapter.status || 'planned';
}
