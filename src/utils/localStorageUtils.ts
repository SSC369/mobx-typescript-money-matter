export const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const addDataIntoLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};
