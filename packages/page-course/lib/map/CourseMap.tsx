import { type Unit, units } from "@keybr/content-course";
import { Screen } from "@keybr/pages-shared";
import { Icon } from "@keybr/widget";
import { mdiCheckCircle, mdiLock } from "@mdi/js";
import { clsx } from "clsx";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { useLocalized } from "../locale.ts";
import { type CourseProgress, isLessonDone } from "../progress.ts";
import * as styles from "./CourseMap.module.less";

export function CourseMap({
  progress,
  onSelectLesson,
}: {
  readonly progress: CourseProgress;
  readonly onSelectLesson: (lessonId: string) => void;
}): ReactNode {
  return (
    <Screen>
      <div className={styles.root}>
        {units.map((unit) => (
          <UnitSection
            key={unit.id}
            unit={unit}
            progress={progress}
            onSelectLesson={onSelectLesson}
          />
        ))}
      </div>
    </Screen>
  );
}

function UnitSection({
  unit,
  progress,
  onSelectLesson,
}: {
  readonly unit: Unit;
  readonly progress: CourseProgress;
  readonly onSelectLesson: (lessonId: string) => void;
}): ReactNode {
  const localize = useLocalized();
  return (
    <div className={styles.unit}>
      <h2 className={styles.unitTitle}>{localize(unit.title)}</h2>
      <div className={styles.lessons}>
        {unit.locked ? (
          <div className={clsx(styles.card, styles.cardLocked)}>
            <Icon className={styles.lockIcon} shape={mdiLock} />
            <span className={styles.cardTitle}>
              <FormattedMessage
                id="course.map.premiumPlan"
                defaultMessage="Premium plan"
              />
            </span>
          </div>
        ) : (
          unit.lessons.map((lesson) => {
            const done = isLessonDone(progress, lesson.id);
            return (
              <button
                key={lesson.id}
                type="button"
                className={clsx(styles.card, done && styles.cardDone)}
                onClick={() => onSelectLesson(lesson.id)}
              >
                <span className={styles.cardTitle}>
                  {localize(lesson.title)}
                </span>
                {done ? (
                  <span className={styles.cardMeta}>
                    <Icon className={styles.lockIcon} shape={mdiCheckCircle} />{" "}
                    <FormattedMessage
                      id="course.map.done"
                      defaultMessage="Completed"
                    />
                  </span>
                ) : (
                  <span className={styles.cardMeta}>
                    <FormattedMessage
                      id="course.map.available"
                      defaultMessage="Available"
                    />
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
