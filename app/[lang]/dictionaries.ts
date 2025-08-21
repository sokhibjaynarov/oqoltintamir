import "server-only"

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
  uz: () => import("./dictionaries/uz.json").then((m) => m.default),
}

export const getDictionary = async (locale: "en" | "ru" | "uz") => dictionaries[locale]()
