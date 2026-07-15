import { findLesson } from "@keybr/content-course";
import { Pages } from "@keybr/pages-shared";
import { type ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LessonPlayer } from "./lesson/LessonPlayer.tsx";
import { CourseMap } from "./map/CourseMap.tsx";
import { loadProgress } from "./progress.ts";

export function CoursePage(): ReactNode {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(() => loadProgress());

  const goToMap = () => {
    setProgress(loadProgress());
    navigate(Pages.course.path);
  };

  if (lessonId == null) {
    return (
      <CourseMap
        progress={progress}
        onSelectLesson={(id) => navigate(`${Pages.course.path}/${id}`)}
      />
    );
  }

  const found = findLesson(lessonId);
  if (found == null) {
    return <RedirectToMap />;
  }
  const { unit, lessonIndex } = found;
  const nextLesson = unit.lessons[lessonIndex + 1];

  return (
    <LessonPlayer
      key={lessonId}
      lesson={unit.lessons[lessonIndex]}
      hasNext={nextLesson != null}
      onExit={goToMap}
      onNext={() => {
        setProgress(loadProgress());
        if (nextLesson != null) {
          navigate(`${Pages.course.path}/${nextLesson.id}`);
        }
      }}
    />
  );
}

function RedirectToMap(): ReactNode {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(Pages.course.path, { replace: true });
  }, [navigate]);
  return null;
}
