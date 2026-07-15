import { Pages } from "@keybr/pages-shared";
import { type ReactNode } from "react";
import { Link as RouterLink } from "react-router";
import * as styles from "./Logo.module.less";

export function Logo(): ReactNode {
  return (
    <RouterLink className={styles.root} to={Pages.practice.path}>
      <span className={styles.mark}>K</span>
      <span className={styles.word}>eybrAR</span>
    </RouterLink>
  );
}
