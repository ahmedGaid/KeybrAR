import { type Unit } from "./types.ts";
import { unit1 } from "./unit1.ts";

const lockedTitle = (ar: string, en: string): Unit["title"] => ({ ar, en });

export const units: readonly Unit[] = [
  unit1,
  {
    id: "unit-2",
    title: lockedTitle("الصف العلوي", "Top Row"),
    locked: true,
    lessons: [],
  },
  {
    id: "unit-3",
    title: lockedTitle("الصف السفلي", "Bottom Row"),
    locked: true,
    lessons: [],
  },
  {
    id: "unit-4",
    title: lockedTitle("الأرقام والرموز", "Numbers & Symbols"),
    locked: true,
    lessons: [],
  },
  {
    id: "unit-5",
    title: lockedTitle("الطلاقة", "Fluency"),
    locked: true,
    lessons: [],
  },
];

export function findLesson(
  lessonId: string,
): { readonly unit: Unit; readonly lessonIndex: number } | null {
  for (const unit of units) {
    const lessonIndex = unit.lessons.findIndex(({ id }) => id === lessonId);
    if (lessonIndex !== -1) {
      return { unit, lessonIndex };
    }
  }
  return null;
}
