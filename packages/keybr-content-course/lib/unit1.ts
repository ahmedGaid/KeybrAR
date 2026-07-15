import { type Unit } from "./types.ts";

const genericHint = {
  ar: "استخدم أصابع السبابة والوسطى لهذه المفاتيح، دون النظر إلى لوحة المفاتيح.",
  en: "Use your index and middle fingers for these keys, without looking down.",
} as const;

export const unit1: Unit = {
  id: "unit-1",
  title: { ar: "الصف الأوسط", en: "Home Row" },
  lessons: [
    {
      id: "unit-1-lesson-1",
      title: { ar: "مفتاحا ش و س", en: "Keys ش and س" },
      intro: { newKeys: ["ش", "س"], fingerHints: genericHint },
      drills: [
        "ش ش ش ش ش",
        "س س س س س",
        "ش س ش س ش س",
        "س ش س ش س ش",
        "شس سش شس سش",
      ],
      passGate: { minAccuracy: 0.85 },
    },
    {
      id: "unit-1-lesson-2",
      title: { ar: "مفتاحا ي و ب", en: "Keys ي and ب" },
      intro: { newKeys: ["ي", "ب"], fingerHints: genericHint },
      drills: [
        "ي ي ي ي ي",
        "ب ب ب ب ب",
        "ي ب ي ب ي ب",
        "شب سي بش يس",
        "شسيب بيسش",
      ],
      passGate: { minAccuracy: 0.85 },
    },
    {
      id: "unit-1-lesson-3",
      title: { ar: "مفتاحا ل و ا", en: "Keys ل and ا" },
      intro: { newKeys: ["ل", "ا"], fingerHints: genericHint },
      drills: [
        "ل ل ل ل ل",
        "ا ا ا ا ا",
        "لا لا لا لا",
        "شا سا لا با",
        "بلا سلا شلا يلا",
      ],
      passGate: { minAccuracy: 0.85, minWpm: 5 },
    },
    {
      id: "unit-1-lesson-4",
      title: { ar: "مفتاحا ت و ن", en: "Keys ت and ن" },
      intro: { newKeys: ["ت", "ن"], fingerHints: genericHint },
      drills: [
        "ت ت ت ت ت",
        "ن ن ن ن ن",
        "تن نت تن نت",
        "تا نا لتا سنا",
        "بنت لبن سنبل",
      ],
      passGate: { minAccuracy: 0.85, minWpm: 5 },
    },
    {
      id: "unit-1-lesson-5",
      title: { ar: "مفتاحا م و ك", en: "Keys م and ك" },
      intro: { newKeys: ["م", "ك"], fingerHints: genericHint },
      drills: [
        "م م م م م",
        "ك ك ك ك ك",
        "مك كم مك كم",
        "كتاب سلم سمك",
        "مكتب لسان بستان",
      ],
      passGate: { minAccuracy: 0.85, minWpm: 6 },
    },
    {
      id: "unit-1-lesson-6",
      title: { ar: "كلمات حقيقية", en: "Real Words" },
      intro: {
        newKeys: [],
        fingerHints: {
          ar: "اكتب الكلمات كاملة دون توقّف، بكل الأصابع التي تعلّمتها.",
          en: "Type the full words without stopping, using every finger you've learned.",
        },
      },
      drills: [
        "بيت كتاب",
        "لبن سمك",
        "سلم تين",
        "بنت مكتب",
        "لسان بستان",
        "كتاب بيت سمك لبن",
      ],
      passGate: { minAccuracy: 0.9, minWpm: 8 },
    },
  ],
} as const;
