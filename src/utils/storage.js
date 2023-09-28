const storage = window.localStorage;
export const getItem = (key) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? storedValue : "";
  } catch (e) {
    return "";
  }
};

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};
