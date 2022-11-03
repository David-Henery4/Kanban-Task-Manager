import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BoardNameInput, BoardColumnsInputs } from "./boardFormComponents";
import {
  checkNameTitleValidtion,
  checkDynamicInputsValidation,
} from "../../validations";
import {
  addNewBoard,
  editBoard,
  resetBoardInputValues,
  changeToNewBoard,
  updateTaskStatusToNewColTitle,
} from "../../features/data/dataSlice";
import { closeAddNewBoardModal } from "../../features/modals/modalsSlice";
import { closeOverlay } from "../../features/overlay/overlaySlice";
import { deActivateEditBoard } from "../../features/edit-delete-modes/modesSlice";

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
      },
    ],
  });
  //
  const dispatch = useDispatch();
  const { activeBoardData, emptyBoardInputValues } = useSelector(
    (store) => store.data
  );
  const { isAddNewBoardActive } = useSelector((store) => store.modals);
  const { isEditBoardActive } = useSelector((store) => store.modes);
  //
  const submitNewBoard = () => {
    // true = errors / false = no errors
    const nameCheckResult = checkNameTitleValidtion(boardValues, "name");
    const { isErrors, errorsList } = checkDynamicInputsValidation(
      boardValues,
      "name"
    );
    //
    setColumnsErrorsList(errorsList);
    setIsBoardNameError(nameCheckResult);
    setIsColumnErrors(isErrors);
    //
    if (!isErrors && !nameCheckResult) {
      dispatch(resetBoardInputValues());
      dispatch(closeAddNewBoardModal());
      dispatch(closeOverlay());
      if (isEditBoardActive) {
        dispatch(deActivateEditBoard());
        dispatch(editBoard(boardValues));
        dispatch(updateTaskStatusToNewColTitle());
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
  }, [emptyBoardInputValues]);
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
        <BoardNameInput
          boardNameData={{
            isBoardNameError,
            boardValues,
            handleBoardNameChange,
          }}
        />
        <BoardColumnsInputs
          boardColumnsData={{
            handleColumnValueChange,
            handleRemoveColumn,
            boardValues,
            columnsErrorsList,
            handleAddNewColumn,
          }}
        />
      </form>
      <button
        className="btn-sml btn-primary-color new-board__btn"
        onClick={() => {
          submitNewBoard();
        }}
      >
        {isEditBoardActive ? "Save Changes" : "Create New Borad"}
      </button>
    </div>
  );
};

export default AddBoard;
