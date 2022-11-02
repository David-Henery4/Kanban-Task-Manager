const checkNameTitleValidtion = (values, type) => {
  if (type === "name") {
    if (values.name.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  }
  if (type === "title") {
    if (values.title.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  }
  // true = errors / false = no errors
};

export default checkNameTitleValidtion;
