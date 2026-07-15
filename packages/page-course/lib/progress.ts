const storageKey = "keybrar.course.progress";

export type LessonProgress = {
  readonly wpm: number;
  readonly accuracy: number;
  readonly completedAt: string;
};

export type CourseProgress = Readonly<Record<string, LessonProgress>>;

export function loadProgress(): CourseProgress {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw == null) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed != null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveLessonProgress(
  lessonId: string,
  progress: LessonProgress,
): CourseProgress {
  const next = { ...loadProgress(), [lessonId]: progress };
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode, quota) — progress just won't persist.
  }
  return next;
}

export function isLessonDone(
  progress: CourseProgress,
  lessonId: string,
): boolean {
  return progress[lessonId] != null;
}
