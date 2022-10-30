import React, { useState } from "react";

const useForm = (callbackSubmit) => {
  //Form Values
  const [values, setValues] = useState({});
  //Form Errors
  const [errors, setErrors] = useState({});
  //
  // Validate Input Values
  const validate = (e, value, name, cols = []) => {
    //
    console.log(cols);
    switch (name) {
      //
      case "boardName":
        if (value.length <= 2) {
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
      case "columnName":
        if (value.length <= 2) {
          //SetErrorState
          const tempName = `${name}${cols.length}`;
          setErrors({
            ...errors,
            [tempName]: "Can't be empty",
          });
        } else {
          const newObj = errors;
          delete newObj.tempName;
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
    if (e) e.preventDefault();
    if (Object.keys(errors).length <= 0 && Object.keys(values).length >= 1) {
      callbackSubmit();
    }
  };
  //
  // HandleFormInputs
  const handleChange = (e, boardColumnsInfo) => {
    e.preventDefault();
    //
    // console.log(boardColumnsInfo)
    let name = e.target.name;
    let value = e.target.value;
    let newBoardColumns;
    //
    if (name === "columnName") {
      const { i, boardColumns } = boardColumnsInfo;
      const newBoardValue = boardColumns.map((col, index, arr) => {
        console.log(col);
        console.log(name);
        if (i !== index) {
          console.log("not hit");
          return col;
        }
        validate(e, col.name, name, arr);
        return { ...col, name: value };
      });
      console.log(newBoardValue);
      // newBoardColumns = newBoardValue
      setValues({
        ...values,
        columns: newBoardValue,
      });
    }
    validate(e, value, name);
    // set state values
    if (name !== "columnName")
      setValues({
        ...values,
        [name]: value,
      });
    console.log(values);
    console.log(errors);
  };
  //
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
