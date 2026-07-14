import { KeyboardOptions, Language, Layout } from "@keybr/keyboard";
import { Settings } from "@keybr/settings";
import { ViewSwitch } from "@keybr/widget";
import { views } from "./views.tsx";

setDefaultLayout(window.navigator.language);

// KeybrAR is Arabic-first: the browser's OS locale may only reinforce the
// Arabic default, never override it back to a non-Arabic layout.
function setDefaultLayout(localeId: string) {
  const layout = Layout.findLayout(localeId);
  if (layout != null && layout.language === Language.AR) {
    Settings.addDefaults(
      KeyboardOptions.default()
        .withLanguage(layout.language)
        .withLayout(layout)
        .save(new Settings()),
    );
  }
}

export function PracticePage() {
  return <ViewSwitch views={views} />;
}
