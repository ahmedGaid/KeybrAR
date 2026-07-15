import { test } from "node:test";
import { isFalse, isNull, isTrue } from "rich-assert";
import { findLesson, units } from "./units.ts";

test("unit and lesson ids are unique", () => {
  const unitIds = units.map(({ id }) => id);
  isTrue(new Set(unitIds).size === unitIds.length);
  const lessonIds = units.flatMap((unit) => unit.lessons.map(({ id }) => id));
  isTrue(new Set(lessonIds).size === lessonIds.length);
});

test("unit 1 is unlocked with lessons, units 2-5 are locked stubs", () => {
  const [unit1, ...rest] = units;
  isFalse(unit1.locked ?? false);
  isTrue(unit1.lessons.length > 0);
  for (const unit of rest) {
    isTrue(unit.locked === true);
    isTrue(unit.lessons.length === 0);
  }
});

test("findLesson locates a lesson by id", () => {
  const found = findLesson("unit-1-lesson-3");
  isTrue(found != null);
  isTrue(found!.unit.id === "unit-1");
  isTrue(found!.lessonIndex === 2);
  isNull(findLesson("does-not-exist"));
});
