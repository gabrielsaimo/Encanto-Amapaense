import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { messages } from "./Languages";

const options = {
  resources: messages,
  fallbackLng: "pt",
  debug: false,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    useSuspense: false,
  },
};

i18n.use(LanguageDetector).init(options);

export { i18n };
