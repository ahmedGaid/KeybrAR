import {
  type Step,
  type TextDisplaySettings,
  TextInput,
  type TextInputSettings,
} from "@keybr/textinput";
import { useSoundPlayer } from "@keybr/textinput-sounds";
import { TextArea } from "@keybr/textinput-ui";
import { type Focusable } from "@keybr/widget";
import { type ReactNode, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import * as styles from "./DrillRunner.module.less";

export function DrillRunner({
  text,
  drillIndex,
  numDrills,
  textInputSettings,
  textDisplaySettings,
  onComplete,
}: {
  readonly text: string;
  readonly drillIndex: number;
  readonly numDrills: number;
  readonly textInputSettings: TextInputSettings;
  readonly textDisplaySettings: TextDisplaySettings;
  readonly onComplete: (steps: readonly Step[]) => void;
}): ReactNode {
  const focusRef = useRef<Focusable>(null);
  const player = useSoundPlayer();
  const input = useMemo(
    () => new TextInput(text, textInputSettings),
    [text, textInputSettings],
  );
  const [lines, setLines] = useState(() => input.lines);
  return (
    <div className={styles.root}>
      <div className={styles.progress}>
        <FormattedMessage
          id="course.lesson.drillProgress"
          defaultMessage="Drill {current} of {total}"
          values={{ current: drillIndex + 1, total: numDrills }}
        />
      </div>
      <TextArea
        focusRef={focusRef}
        settings={textDisplaySettings}
        lines={lines}
        wrap={false}
        onKeyDown={() => {}}
        onKeyUp={() => {}}
        onInput={(event) => {
          if (input.completed) {
            return;
          }
          const feedback = input.onInput(event);
          player(feedback);
          setLines(input.lines);
          if (input.completed) {
            onComplete(input.steps);
          }
        }}
      />
    </div>
  );
}
