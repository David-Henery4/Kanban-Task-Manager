import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cross } from "../../assets";
import {addNewBoard, deleteBoard, editBoard } from "../../features/data/dataSlice";
import { closeAddNewBoardModal } from "../../features/modals/modalsSlice";
import { closeOverlay } from "../../features/overlay/overlaySlice";
import { deActivateEditBoard } from "../../features/edit-delete-modes/modesSlice";

// ** ALSO HAVE TO RESET BOARD VALUES
// & TURN OFF EDIT MODE ON THE OVERLAY CLICK!!**

const AddBoard = () => {
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
  const { activeBoardData } = useSelector((store) => store.data);
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
    // dispatch(deleteBoard(boardValues))
    // console.log(boardValues)
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
          <input
            type="text"
            name="board-name"
            id="board-name"
            className="input-style-basic"
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
                  <input
                    type="text"
                    className="input-style-basic"
                    placeholder="e.g Todo"
                    value={col.name}
                    onChange={handleColumnValueChange(i)}
                  />
                  <Cross onClick={() => handleRemoveColumn(col.id)} />
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
      <button className="btn-sml btn-primary-color new-board__btn" onClick={() => {
        resetBoardValues()
        dispatch(closeAddNewBoardModal())
        dispatch(closeOverlay())
        if (isEditBoardActive) {
          submitEditedBoard()
          dispatch(deActivateEditBoard())
        }
        if (!isEditBoardActive) {
          submitNewBoard()
        }
      }}>
        {isEditBoardActive ? "Save Changes" : "Create New Borad"}
      </button>
    </div>
  );
};

export default AddBoard;
