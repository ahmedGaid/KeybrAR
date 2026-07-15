import { type LocalizedText } from "@keybr/content-course";
import { useIntl } from "react-intl";

export function useLocalized(): (text: LocalizedText) => string {
  const { locale } = useIntl();
  return (text) => (locale.startsWith("ar") ? text.ar : text.en);
}

/** Rough words-per-minute from the chars-per-minute the engine computes. */
export function toWpm(charsPerMinute: number): number {
  return charsPerMinute / 5;
}
