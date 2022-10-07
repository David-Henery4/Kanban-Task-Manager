import React from "react";
import { Cross } from "../../assets";

const AddBoard = () => {
  return (
    <div className="new-board">
      <h4 className="heading-l">Add New Board</h4>
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
          />
        </div>
        <div className="new-board-form-columns">
          <label htmlFor="board-cols" className="input-heading">
            Board Columns
          </label>
          <div className="new-board-form-columns-inputs-wrap">
            <div className="new-board-form-columns-input">
              <input
                type="text"
                className="input-style-basic"
                placeholder="e.g Todo"
              />
              <Cross />
            </div>
            <div className="new-board-form-columns-input">
              <input
                type="text"
                className="input-style-basic"
                placeholder="e.g Doing"
              />
              <Cross />
            </div>
            <button className="btn-sml btn-secondary-color new-board-form-columns__btn">
              Add New Column
            </button>
          </div>
        </div>
      </form>
      <button className="btn-sml btn-primary-color new-board__btn">
        Create New Borad
      </button>
    </div>
  );
};

export default AddBoard;
