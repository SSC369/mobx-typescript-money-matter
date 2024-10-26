import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import { getLanguageFromLocalStorage } from "./utils/localStorageUtils";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Specify your default language
    lng: getLanguageFromLocalStorage(),
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
