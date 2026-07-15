import { test } from "node:test";
import { FakeIntlProvider } from "@keybr/intl";
import { KeyboardOptions, Language, Layout } from "@keybr/keyboard";
import { type PageData, PageDataContext } from "@keybr/pages-shared";
import { FakePhoneticModel } from "@keybr/phonetic-model";
import { PhoneticModelLoader } from "@keybr/phonetic-model-loader";
import { FakeResultContext, ResultFaker } from "@keybr/result";
import { FakeSettingsContext, Settings } from "@keybr/settings";
import { fireEvent, render } from "@testing-library/react";
import { PracticePage } from "./PracticePage.tsx";

const faker = new ResultFaker();

// FakePhoneticModel only ever provides English letters, so the fixture must
// pin an English keyboard layout regardless of KeybrAR's Arabic-first
// default (@keybr/keyboard settings.ts) or the guided lesson generator finds
// zero letters in common between the model and the keyboard and throws.
const englishSettings = KeyboardOptions.default()
  .withLanguage(Language.EN)
  .withLayout(Layout.EN_US)
  .save(new Settings());

test("render", async () => {
  PhoneticModelLoader.loader = FakePhoneticModel.loader;

  const r = render(
    <FakeIntlProvider>
      <PageDataContext.Provider
        value={{ publicUser: { id: "abc" } } as PageData}
      >
        <FakeSettingsContext initialSettings={englishSettings}>
          <FakeResultContext initialResults={faker.nextResultList(100)}>
            <PracticePage />
          </FakeResultContext>
        </FakeSettingsContext>
      </PageDataContext.Provider>
    </FakeIntlProvider>,
  );

  fireEvent.click(
    await r.findByTitle("Change lesson settings", { exact: false }),
  );
  fireEvent.click(await r.findByText("Done"));

  r.unmount();
});
