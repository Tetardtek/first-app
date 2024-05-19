import "server-only";
import type { Locale } from "@/i18n.config";

const dictionaries = {
  en: {
    landing: () =>
      import("@/dictionaries/landing/en.json").then((module) => module.default),
  },
  fr: {
    landing: () =>
      import("@/dictionaries/landing/fr.json").then((module) => module.default),
  },
   es: {
    landing: () =>
      import("@/dictionaries/landing/es.json").then((module) => module.default),
  },
};

export type Pages = keyof (typeof dictionaries)["en"];

export const getDictionary = async <K extends Pages>(
  locale: Locale,
  page: K,
) => {
  return dictionaries[locale][page]() as Promise<
    (typeof dictionaries.en)[K] extends () => Promise<infer R> ? R : never
  >;
};

export type Dictionary = {
  [K in Pages]: ReturnType<(typeof dictionaries.en)[K]> extends Promise<infer R>
    ? R
    : never;
};
