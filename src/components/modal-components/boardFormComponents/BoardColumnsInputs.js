import React from "react";
import { Cross } from "../../../assets";

const BoardColumnsInputs = ({boardColumnsData}) => {
  const {handleColumnValueChange, handleRemoveColumn, boardValues, columnsErrorsList, handleAddNewColumn } = boardColumnsData
  //
  return (
    <div className="new-board-form-columns">
      <label htmlFor="board-columns-name" className="input-heading">
        Board Columns
      </label>
      <div className="new-board-form-columns-inputs-wrap">
        {boardValues.columns.map((col, i) => {
          let isErrorHere = false;
          let errorMsg = "";
          columnsErrorsList.map((errorCols) => {
            if (errorCols.id === col.id) {
              isErrorHere = true;
              errorMsg = errorCols.errorMsg;
            }
          });
          return (
            <div className="new-board-form-columns-input" key={i}>
              {isErrorHere && (
                <label className="error-input-label-2 basicTextMedium">
                  {errorMsg}
                </label>
              )}
              <input
                type="text"
                name="board-columns-name"
                className={
                  isErrorHere
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
  );
};

export default BoardColumnsInputs
