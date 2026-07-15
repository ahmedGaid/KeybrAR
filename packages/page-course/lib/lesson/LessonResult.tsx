import { type Stats } from "@keybr/textinput";
import { Button } from "@keybr/widget";
import { clsx } from "clsx";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { toWpm } from "../locale.ts";
import * as styles from "./LessonResult.module.less";

export function LessonResult({
  stats,
  passed,
  hasNext,
  onRetry,
  onContinue,
}: {
  readonly stats: Stats;
  readonly passed: boolean;
  readonly hasNext: boolean;
  readonly onRetry: () => void;
  readonly onContinue: () => void;
}): ReactNode {
  return (
    <div className={styles.root}>
      <h1 className={clsx(styles.headline, passed ? styles.pass : styles.fail)}>
        {passed ? (
          <FormattedMessage
            id="course.result.pass"
            defaultMessage="Well done!"
          />
        ) : (
          <FormattedMessage
            id="course.result.fail"
            defaultMessage="Try again"
          />
        )}
      </h1>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>
            {Math.round(toWpm(stats.speed))}
          </div>
          <div className={styles.statLabel}>
            <FormattedMessage id="course.result.wpm" defaultMessage="WPM" />
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>
            {Math.round(stats.accuracy * 100)}%
          </div>
          <div className={styles.statLabel}>
            <FormattedMessage
              id="course.result.accuracy"
              defaultMessage="Accuracy"
            />
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <Button
          label={
            <FormattedMessage id="course.result.retry" defaultMessage="Retry" />
          }
          onClick={onRetry}
        />
        {passed && hasNext && (
          <Button
            label={
              <FormattedMessage
                id="course.result.continue"
                defaultMessage="Next"
              />
            }
            onClick={onContinue}
          />
        )}
        {passed && !hasNext && (
          <Button
            label={
              <FormattedMessage
                id="course.result.backToMap"
                defaultMessage="Course Map"
              />
            }
            onClick={onContinue}
          />
        )}
      </div>
    </div>
  );
}
