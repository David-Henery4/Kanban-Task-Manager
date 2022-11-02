import React from "react";

const BoardNameInput = ({ boardNameData }) => {
  const { isBoardNameError, boardValues, handleBoardNameChange } =
    boardNameData;
  //
  return (
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
  );
};

export default BoardNameInput;
