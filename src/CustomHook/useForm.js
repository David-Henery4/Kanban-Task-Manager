import React, { useState } from "react";

const useForm = (callbackSubmit) => {
  //Form Values
  const [values, setValues] = useState({});
  //Form Errors
  const [errors, setErrors] = useState({});
  //
  // Validate Input Values
  const validate = (e, value, name) => {
    //
    switch (name) {
      //
      case "board-name":
        if (value.length < 1) {
          // setErrorState
          setErrors({
            ...errors,
            boardName: "Can't be empty",
          });
        } else {
          const newObj = errors;
          delete newObj.boardName;
          setErrors(newObj);
        }
        break;
      //
      case "column-name":
        if (value.length < 1) {
          //SetErrorState
          setErrors({
            ...errors,
            columnName: "Can't be empty",
          });
        } else {
          const newObj = errors;
          delete newObj.columnName;
          setErrors(newObj);
        }
        break;
      //
      case "task-title":
        if (value.length < 1) {
          //SetErrorState
          setErrors({
            ...errors,
            taskTitle: "Can't be empty",
          });
        } else {
          const newObj = errors;
          delete newObj.taskTitle;
          setErrors(newObj);
        }
        break;
      //
      case "subtask-title":
        if (value.length < 1) {
          //SetErrorState
          setErrors({
            ...errors,
            subTaskTitle: "Can't be empty",
          });
        } else {
          const newObj = errors;
          delete newObj.subTaskTitle;
          setErrors(newObj);
        }
        break;
      //
      default:
        break;
    }
  };
  // handleSubmit
  //
  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (Object.keys(errors).length <= 0 && Object.keys(values).length >= 1){
      callbackSubmit()
    }
  }
  //
  // HandleFormInputs
  const handleChange = (e) => {
    e.preventDefault()
    let name = e.target.name
    let value = e.target.value
    validate(e,value,name)
    // set state values
    setValues({
      ...values,
      [name]: value
    })
  }
  //
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
