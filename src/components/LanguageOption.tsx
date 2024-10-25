import React from "react";
import { LANGUAGE_OPTIONS, LANGUAGES_FOLDER } from "../constants";
import i18next from "i18next";
import { VoidFunctionType } from "../types";

const LanguageOption: React.FC<{
  language: string;
  handleMenuClose: VoidFunctionType;
}> = ({ language, handleMenuClose }) => {
  const currentLanguage: string = i18next.language;
  const changeLanguage = (lng: string) => i18next.changeLanguage(lng);

  return (
    <li
      onClick={() => {
        changeLanguage(
          LANGUAGES_FOLDER[language as keyof typeof LANGUAGES_FOLDER]
        );
        handleMenuClose();
      }}
      className={` cursor-pointer ${
        currentLanguage ===
        LANGUAGES_FOLDER[language as keyof typeof LANGUAGES_FOLDER]
          ? "text-blue-600 font-semibold"
          : "text-slate-500 dark:text-slate-200"
      }`}
    >
      <button>
        {LANGUAGE_OPTIONS[language as keyof typeof LANGUAGE_OPTIONS]}
      </button>
    </li>
  );
};

export default LanguageOption;
