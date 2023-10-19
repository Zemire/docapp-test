export const getFromStorage = (storageName) => {
  const storageData = localStorage.getItem(storageName);
  return storageData ? JSON.parse(storageData) : null;
};
