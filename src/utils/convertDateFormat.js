const convertDateFormat = (date) => {
  if (date) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }
  return 0;
};

export default convertDateFormat;
