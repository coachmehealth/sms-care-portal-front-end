export const localStorageToDate = (dateString: string | null) => {
  if (dateString) {
    return new Date(dateString);
  }
  return new Date();
};

export const logOutIfInactive = () => {
  let lastActivityDate = localStorageToDate(
    localStorage.getItem("lastActivityDate")
  );
  let today = new Date();
  if (
    lastActivityDate <
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
  ) {
    localStorage.clear();
  }
};
