const PROGRESS_STORAGE_KEY = 'itera_research_hub_progress_v2';

export interface UserProgress {
  completedLessons: string[]; // List of lesson IDs
  lastVisitedLessonId?: string;
  notes: Record<string, string>; // lessonId -> note
}

export function getStoredProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return { completedLessons: [], notes: {} };
    return JSON.parse(raw);
  } catch {
    return { completedLessons: [], notes: {} };
  }
}

export function toggleLessonCompletion(lessonId: string): boolean {
  const progress = getStoredProgress();
  const index = progress.completedLessons.indexOf(lessonId);
  let isNowCompleted = false;

  if (index >= 0) {
    progress.completedLessons.splice(index, 1);
  } else {
    progress.completedLessons.push(lessonId);
    isNowCompleted = true;
  }

  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // LocalStorage quota or unavailable
  }

  return isNowCompleted;
}

export function isLessonCompleted(lessonId: string): boolean {
  const progress = getStoredProgress();
  return progress.completedLessons.includes(lessonId);
}

export function setLastVisitedLesson(lessonId: string) {
  const progress = getStoredProgress();
  progress.lastVisitedLessonId = lessonId;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore
  }
}

export function getCompletionStats(totalLessons: number): { completed: number; percentage: number } {
  const progress = getStoredProgress();
  const completed = progress.completedLessons.length;
  const percentage = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  return { completed, percentage };
}

