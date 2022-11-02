
const checkDynamicInputsValidation = (inputs,type) => {
  const errorsList = [];
  if (type === "name"){
        const inputsCopy = [...inputs.columns];
        inputsCopy.map((input, i) => {
          if (input.name.trim().length === 0) {
            errorsList.push({
              id: input.id,
              errorMsg: "Can't be empty",
            });
          }
          return input;
        });
  }
  //
  if (type === "title"){
    const inputsCopy = [...inputs.subtasks];
    inputsCopy.map((input, i) => {
      if (input.title.trim().length === 0) {
        errorsList.push({
          id: input.id,
          errorMsg: "Can't be empty",
        });
      }
      return input;
    });
  }
  const isErrors = errorsList.length >= 1;
  return { isErrors , errorsList};
};

export default checkDynamicInputsValidation