import { Pages } from "@keybr/pages-shared";
import { Icon } from "@keybr/widget";
import { mdiChartAreaspline, mdiKeyboard, mdiSchool } from "@mdi/js";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router";
import * as styles from "./Landing.module.less";

export function Landing(): ReactNode {
  return (
    <section className={styles.root}>
      <div className={styles.hero}>
        <h1 className={styles.tagline}>
          <FormattedMessage
            id="landing.hero.tagline"
            defaultMessage="Learn touch typing in Arabic"
          />
        </h1>
        <p className={styles.subtitle}>
          <FormattedMessage
            id="landing.hero.subtitle"
            defaultMessage="Lessons that adapt to your level — no boring repetition."
          />
        </p>
      </div>

      <div className={styles.features}>
        <Feature icon={mdiKeyboard}>
          <h2 className={styles.featureTitle}>
            <FormattedMessage
              id="landing.feature.practice.title"
              defaultMessage="Adaptive Practice"
            />
          </h2>
          <p className={styles.featureDescription}>
            <FormattedMessage
              id="landing.feature.practice.description"
              defaultMessage="A smart algorithm generates exercises tailored to your weak keys."
            />
          </p>
        </Feature>
        <Feature icon={mdiSchool}>
          <h2 className={styles.featureTitle}>
            <FormattedMessage
              id="landing.feature.course.title"
              defaultMessage="Structured Course"
            />
          </h2>
          <p className={styles.featureDescription}>
            <FormattedMessage
              id="landing.feature.course.description"
              defaultMessage="Five structured units that take you from zero to fluent."
            />
          </p>
        </Feature>
        <Feature icon={mdiChartAreaspline}>
          <h2 className={styles.featureTitle}>
            <FormattedMessage
              id="landing.feature.progress.title"
              defaultMessage="Progress Tracking"
            />
          </h2>
          <p className={styles.featureDescription}>
            <FormattedMessage
              id="landing.feature.progress.description"
              defaultMessage="Detailed stats on your speed and accuracy with every lesson."
            />
          </p>
        </Feature>
      </div>

      <div className={styles.coursePitch}>
        <p className={styles.coursePitchText}>
          <FormattedMessage
            id="landing.course.pitch"
            defaultMessage="Ready for the next level?"
          />
        </p>
        <RouterLink className={styles.cta} to={Pages.course.path}>
          <FormattedMessage
            id="landing.course.cta"
            defaultMessage="Start the Course"
          />
        </RouterLink>
      </div>
    </section>
  );
}

function Feature({
  icon,
  children,
}: {
  readonly icon: string;
  readonly children: ReactNode;
}): ReactNode {
  return (
    <div className={styles.feature}>
      <Icon className={styles.featureIcon} shape={icon} />
      {children}
    </div>
  );
}
