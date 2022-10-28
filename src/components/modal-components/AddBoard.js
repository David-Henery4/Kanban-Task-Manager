import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cross } from "../../assets";
import {
  addNewBoard,
  editBoard,
  resetBoardInputValues,
  changeToNewBoard,
} from "../../features/data/dataSlice";
import { closeAddNewBoardModal } from "../../features/modals/modalsSlice";
import { closeOverlay } from "../../features/overlay/overlaySlice";
import { deActivateEditBoard } from "../../features/edit-delete-modes/modesSlice";
import useForm from "../../CustomHook/useForm";

// ** ALSO HAVE TO RESET BOARD VALUES
// & TURN OFF EDIT MODE ON THE OVERLAY CLICK!!**

const AddBoard = () => {
  //
  const callBackSubmit = () => {
    // handle submit when validated
    console.log(values)
    console.log("validated")
  }
  // HOOK
  const {handleChange,handleSubmit, values, errors} = useForm(callBackSubmit)
  // check individual inputs
  const [checkBoardName, setCheckBoardName] = useState(false)
  const [checkColumnName, setCheckColumnName] = useState(false)
  //
  useEffect(() => {
    setCheckBoardName(errors.boardName && values.boardName.length >= 1)
    setCheckColumnName(errors.columnName && values.columnName.length >= 1);
  }, [errors, values])
  //
  const [boardValues, setBoardValues] = useState({
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
  const dispatch = useDispatch()
  const { activeBoardData, emptyBoardInputValues } = useSelector(
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
  }
  //
  const submitNewBoard = () => {
    dispatch(addNewBoard(boardValues))
  };
  //
  const submitEditedBoard = () => {
    dispatch(editBoard(boardValues))
  }
  //
  const setEditBoardValues = () => {
    setBoardValues({
      id: activeBoardData.id,
      name: activeBoardData.name,
      columns: activeBoardData.columns,
    })
  };
  //
  const handleBoardNameChange = (e) => {
    setBoardValues({...boardValues, name: e.target.value})
  }
  // **Column Functions**
  const handleAddNewColumn = (e) => {
    e.preventDefault()
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
    if(isEditBoardActive){
      setEditBoardValues()
    }
  }, [isEditBoardActive])
  //
  useEffect(() => {
    setBoardValues(emptyBoardInputValues)
    // resetBoardInputValues
  }, [emptyBoardInputValues])
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
          <label htmlFor="board-name" className="input-heading">
            Board Name
          </label>
          {checkBoardName && (
            <label
              htmlFor="board-name"
              className="error-input-label basicTextMedium"
            >
              Can't be empty
            </label>
          )}
          <input
            type="text"
            name="board-name"
            id="board-name"
            className={
              checkBoardName
                ? "input-style-basic error-input-style"
                : "input-style-basic"
            }
            placeholder="e.g Web Design"
            value={boardValues.name}
            onChange={(e) => handleBoardNameChange(e)}
          />
        </div>
        <div className="new-board-form-columns">
          <label htmlFor="board-cols" className="input-heading">
            Board Columns
          </label>
          <div className="new-board-form-columns-inputs-wrap">
            {boardValues.columns.map((col, i) => {
              return (
                <div className="new-board-form-columns-input" key={i}>
                  {checkColumnName && (
                    <label
                      htmlFor="column-name"
                      className="error-input-label-2 basicTextMedium"
                    >
                      Can't be empty
                    </label>
                  )}
                  <input
                    type="text"
                    name="column-name"
                    className={
                      checkColumnName
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
          dispatch(resetBoardInputValues());
          dispatch(closeAddNewBoardModal());
          dispatch(closeOverlay());
          if (isEditBoardActive) {
            submitEditedBoard();
            dispatch(deActivateEditBoard());
          }
          if (!isEditBoardActive) {
            submitNewBoard();
            dispatch(changeToNewBoard());
          }
        }}
      >
        {isEditBoardActive ? "Save Changes" : "Create New Borad"}
      </button>
    </div>
  );
};

export default AddBoard;
