import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cross } from "../../assets";
import {
  addNewBoard,
  editBoard,
  resetBoardInputValues,
  changeToNewBoard,
  resetIsNameValid,
} from "../../features/data/dataSlice";
import { closeAddNewBoardModal } from "../../features/modals/modalsSlice";
import { closeOverlay } from "../../features/overlay/overlaySlice";
import { deActivateEditBoard } from "../../features/edit-delete-modes/modesSlice";
import useForm from "../../CustomHook/useForm";

// ** ALSO HAVE TO RESET BOARD VALUES
// & TURN OFF EDIT MODE ON THE OVERLAY CLICK!!**

const AddBoard = () => {
  const [columnsErrorsList, setColumnsErrorsList] = useState([]);
  const [isColumnErrors, setIsColumnErrors] = useState(false);
  const [isBoardNameError, setIsBoardNameError] = useState(false);
  //
  const [boardValues, setBoardValues] = useState({
    id: +new Date(),
    name: "",
    columns: [
      {
        id: +new Date(),
        name: "",
        tasks: [],
        isNameInvalid: false,
      },
    ],
  });
  //
  const dispatch = useDispatch();
  const { activeBoardData, emptyBoardInputValues, overallData } = useSelector(
    (store) => store.data
  );
  const { isAddNewBoardActive } = useSelector((store) => store.modals);
  const { isEditBoardActive } = useSelector((store) => store.modes);
  // new-board-active
  // **Board Functions**
  const resetBoardValues = () => {
    setBoardValues({
      id: +new Date(),
      name: "",
      columns: [
        {
          id: +new Date(),
          name: "",
          tasks: [],
        },
      ],
    });
  };
  //
  const checkBoardNameValidtion = (values) => {
    // true = errors / false = no errors
    if (values.name.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  };
  //
  const checkBoardColumnNameValidation = ({ columns }) => {
    // true = errors / false = no errors
    const columnsCopy = JSON.parse(JSON.stringify(columns));
    const errorsList = [];
    const columnsErrorUpdate = columnsCopy.map((col, i) => {
      if (col.name.trim().length === 0) {
        errorsList.push({
          [col.id]: "Can't be empty",
        });
        col.isNameInvalid = true;
      } 
      if (col.name.trim().length >= 1){
        col.isNameInvalid = false
      }
      return col;
    });
    console.log(errorsList)
    setBoardValues({ ...boardValues, columns: columnsErrorUpdate });
    const isAnyErrors = errorsList.length >= 1;
    return isAnyErrors;
  };
  //
  const submitNewBoard = () => {
    // true = errors / false = no errors
    const nameCheckResult = checkBoardNameValidtion(boardValues);
    const columnNameCheckResult = checkBoardColumnNameValidation(boardValues);
    //
    setIsBoardNameError(nameCheckResult);
    setIsColumnErrors(columnNameCheckResult);
    //
    // if (columnNameCheckResult && nameCheckResult) {
    //   console.log("A column name is inValid & Board name is invalid");
    // }
    if (!columnNameCheckResult && !nameCheckResult) {
      console.log("Columns names are fine & Board name is good");
      dispatch(resetBoardInputValues());
      dispatch(closeAddNewBoardModal());
      dispatch(closeOverlay());
      if (isEditBoardActive) {
        dispatch(deActivateEditBoard());
        dispatch(editBoard(boardValues));
      }
      if (!isEditBoardActive) {
        dispatch(changeToNewBoard());
        dispatch(addNewBoard(boardValues));
      }
    }
  };
  //
  const setEditBoardValues = () => {
    setBoardValues({
      id: activeBoardData.id,
      name: activeBoardData.name,
      columns: activeBoardData.columns,
    });
  };
  //
  const handleBoardNameChange = (e) => {
    setBoardValues({ ...boardValues, name: e.target.value });
  };
  // **Column Functions**
  const handleAddNewColumn = (e) => {
    e.preventDefault();
    setBoardValues({
      ...boardValues,
      columns: [
        ...boardValues.columns,
        {
          id: +new Date(),
          name: "",
          tasks: [],
        },
      ],
    });
  };
  //
  const handleRemoveColumn = (id) => {
    const updatedColumns = boardValues.columns.filter((col) => col.id !== id);
    setBoardValues({ ...boardValues, columns: updatedColumns });
  };
  //
  const handleColumnValueChange = (i) => (e) => {
    const newBoardValue = boardValues.columns.map((col, index) => {
      if (i !== index) return col;
      return { ...col, name: e.target.value };
    });
    setBoardValues({ ...boardValues, columns: newBoardValue });
  };
  //
  useEffect(() => {
    if (isEditBoardActive) {
      setEditBoardValues();
    }
  }, [isEditBoardActive]);
  //
  useEffect(() => {
    setBoardValues(emptyBoardInputValues);
    // resetBoardInputValues
  }, [emptyBoardInputValues]);
  //
  useEffect(() => {
    dispatch(resetIsNameValid());
  }, [overallData])
  //
  return (
    <div
      className={
        isAddNewBoardActive ? "new-board new-board-active" : "new-board"
      }
    >
      <h4 className="heading-l">
        {isEditBoardActive ? "Edit Board" : "Add New Board"}
      </h4>
      <form className="new-board-form">
        <div className="new-board-form-name">
          <label htmlFor="boardName" className="input-heading">
            Board Name
          </label>
          {isBoardNameError && (
            <label htmlFor="" className="error-input-label basicTextMedium">
              Can't be empty
            </label>
          )}
          <input
            type="text"
            name="boardName"
            id="boardName"
            className={
              isBoardNameError
                ? "input-style-basic error-input-style"
                : "input-style-basic"
            }
            placeholder="e.g Web Design"
            value={boardValues.name}
            onChange={(e) => handleBoardNameChange(e)}
          />
        </div>
        <div className="new-board-form-columns">
          <label htmlFor="board-columns-name" className="input-heading">
            Board Columns
          </label>
          <div className="new-board-form-columns-inputs-wrap">
            {boardValues.columns.map((col, i) => {
              return (
                <div className="new-board-form-columns-input" key={i}>
                  {col.isNameInvalid && (
                    <label className="error-input-label-2 basicTextMedium">
                      Can't be empty
                    </label>
                  )}
                  <input
                    type="text"
                    name="board-columns-name"
                    className={
                      col.isNameInvalid
                        ? "input-style-basic error-input-style"
                        : "input-style-basic"
                    }
                    placeholder="e.g Todo"
                    value={col.name}
                    onChange={handleColumnValueChange(i)}
                  />
                  <Cross
                    className="new-board-form-columns-input__close-icon"
                    onClick={() => handleRemoveColumn(col.id)}
                  />
                </div>
              );
            })}
            <button
              className="btn-sml btn-secondary-color new-board-form-columns__btn"
              onClick={(e) => handleAddNewColumn(e)}
            >
              Add New Column
            </button>
          </div>
        </div>
      </form>
      <button
        className="btn-sml btn-primary-color new-board__btn"
        onClick={() => {
          // resetBoardValues()
          // if (isEditBoardActive) {
          //   submitEditedBoard();
          //   dispatch(deActivateEditBoard());
          // }
          // if (!isEditBoardActive) {
          // }
          submitNewBoard();
        }}
      >
        {isEditBoardActive ? "Save Changes" : "Create New Borad"}
      </button>
    </div>
  );
};

export default AddBoard;
