import { type Lesson } from "@keybr/content-course";
import { Button, Spacer } from "@keybr/widget";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { useLocalized } from "../locale.ts";
import * as styles from "./IntroCard.module.less";

export function IntroCard({
  lesson,
  onStart,
}: {
  readonly lesson: Lesson;
  readonly onStart: () => void;
}): ReactNode {
  const localize = useLocalized();
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{localize(lesson.title)}</h1>
      {lesson.intro.newKeys.length > 0 && (
        <div className={styles.keys}>
          {lesson.intro.newKeys.map((key) => (
            <span key={key} className={styles.key}>
              {key}
            </span>
          ))}
        </div>
      )}
      <p className={styles.hint}>{localize(lesson.intro.fingerHints)}</p>
      <Spacer size={1} />
      <Button
        label={
          <FormattedMessage id="course.lesson.start" defaultMessage="Start" />
        }
        onClick={onStart}
      />
    </div>
  );
}
