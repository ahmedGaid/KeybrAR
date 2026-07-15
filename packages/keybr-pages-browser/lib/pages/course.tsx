import { KeyboardProvider } from "@keybr/keyboard";
import { CoursePage } from "@keybr/page-course";

export default function Page() {
  return (
    <KeyboardProvider>
      <CoursePage />
    </KeyboardProvider>
  );
}
