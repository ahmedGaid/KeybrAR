export type LocalizedText = {
  readonly ar: string;
  readonly en: string;
};

export type PassGate = {
  readonly minAccuracy: number;
  readonly minWpm?: number;
};

export type LessonIntro = {
  readonly newKeys: readonly string[];
  readonly fingerHints: LocalizedText;
};

/** A single typed-text drill. Plain Arabic, RTL, no harakat. */
export type Lesson = {
  /** Stable id — never rename once shipped, progress records key off it. */
  readonly id: string;
  readonly title: LocalizedText;
  readonly intro: LessonIntro;
  readonly drills: readonly string[];
  readonly passGate: PassGate;
};

export type Unit = {
  /** Stable id — never rename once shipped. */
  readonly id: string;
  readonly title: LocalizedText;
  /** Stub unit with no lessons yet (units 2-5 until S6). */
  readonly locked?: boolean;
  readonly lessons: readonly Lesson[];
};
