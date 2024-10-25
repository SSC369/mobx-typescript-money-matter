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
