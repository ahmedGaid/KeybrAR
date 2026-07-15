import { type Lesson } from "@keybr/content-course";
import { Screen } from "@keybr/pages-shared";
import { useSettings } from "@keybr/settings";
import {
  makeStats,
  type Step,
  toTextDisplaySettings,
  toTextInputSettings,
} from "@keybr/textinput";
import { useEffect, useMemo, useState } from "react";
import { type ReactNode } from "react";
import { toWpm } from "../locale.ts";
import { saveLessonProgress } from "../progress.ts";
import { DrillRunner } from "./DrillRunner.tsx";
import { IntroCard } from "./IntroCard.tsx";
import { LessonResult } from "./LessonResult.tsx";

type Phase = "intro" | "drill" | "result";

export function LessonPlayer({
  lesson,
  hasNext,
  onExit,
  onNext,
}: {
  readonly lesson: Lesson;
  readonly hasNext: boolean;
  readonly onExit: () => void;
  readonly onNext: () => void;
}): ReactNode {
  const { settings } = useSettings();
  const textInputSettings = useMemo(
    () => toTextInputSettings(settings),
    [settings],
  );
  const textDisplaySettings = useMemo(
    () => toTextDisplaySettings(settings),
    [settings],
  );

  const [phase, setPhase] = useState<Phase>("intro");
  const [drillIndex, setDrillIndex] = useState(0);
  const [allSteps, setAllSteps] = useState<readonly Step[]>([]);

  const restart = () => {
    setDrillIndex(0);
    setAllSteps([]);
    setPhase("drill");
  };

  const handleDrillComplete = (steps: readonly Step[]) => {
    const combined = [...allSteps, ...steps];
    setAllSteps(combined);
    if (drillIndex + 1 < lesson.drills.length) {
      setDrillIndex(drillIndex + 1);
    } else {
      setPhase("result");
    }
  };

  const stats = useMemo(() => makeStats(allSteps), [allSteps]);
  const passed =
    phase === "result" &&
    stats.accuracy >= lesson.passGate.minAccuracy &&
    (lesson.passGate.minWpm == null ||
      toWpm(stats.speed) >= lesson.passGate.minWpm);

  useEffect(() => {
    if (phase === "result" && passed) {
      saveLessonProgress(lesson.id, {
        wpm: Math.round(toWpm(stats.speed)),
        accuracy: stats.accuracy,
        completedAt: new Date().toISOString(),
      });
    }
    // Runs once per result phase entry; `passed`/`stats` are derived from it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <Screen>
      {phase === "intro" && <IntroCard lesson={lesson} onStart={restart} />}
      {phase === "drill" && (
        <DrillRunner
          key={drillIndex}
          text={lesson.drills[drillIndex]}
          drillIndex={drillIndex}
          numDrills={lesson.drills.length}
          textInputSettings={textInputSettings}
          textDisplaySettings={textDisplaySettings}
          onComplete={handleDrillComplete}
        />
      )}
      {phase === "result" && (
        <LessonResult
          stats={stats}
          passed={passed}
          hasNext={hasNext}
          onRetry={restart}
          onContinue={passed ? (hasNext ? onNext : onExit) : restart}
        />
      )}
    </Screen>
  );
}
