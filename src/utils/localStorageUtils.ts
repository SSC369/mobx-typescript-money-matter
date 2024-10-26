import { DEFAULT_LANGUAGE, LOCALSTORAGE_LANGUAGE_KEY } from "../constants";
import { LocalStorageDataType } from "../types";

export const removeDataFromLocalStorage: (key: string) => void = (key) => {
  localStorage.removeItem(key);
};

export const addDataIntoLocalStorage: (
  key: string,
  data: LocalStorageDataType
) => void = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage: (key: string) => LocalStorageDataType = (
  key
) => {
  const data: LocalStorageDataType = JSON.parse(localStorage.getItem(key)!);
  return data;
};

export const getLanguageFromLocalStorage: () => string = () => {
  return localStorage.getItem(LOCALSTORAGE_LANGUAGE_KEY) || DEFAULT_LANGUAGE;
};

export const addLangugageIntoLocalStorage = (language: string): void => {
  localStorage.setItem(LOCALSTORAGE_LANGUAGE_KEY, language);
};
