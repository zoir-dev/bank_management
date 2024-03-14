import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Uz from "./uz.json";
import Ru from "./ru.json";

i18n.use(initReactI18next).init({
  fallbackLng: "uz",
  debug: true,
  resources: {
    uz: {
      translation: Uz,
    },
    ru: {
      translation: Ru,
    },
  },
});

export default i18n;
