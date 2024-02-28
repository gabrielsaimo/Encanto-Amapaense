import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { messages } from "./Languages";
i18n.use(LanguageDetector).init({
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
    wait: true,
  },
});

export { i18n };
