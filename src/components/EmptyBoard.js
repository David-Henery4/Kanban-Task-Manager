import React from 'react'
import {AddTaskMobile} from "../assets";

const EmptyBoard = () => {
  return (
    <div className="board-empty">
      <h2 className="heading-l board-empty__heading">
        This board is empty. Create a new column to get started.
      </h2>
      <button className="new-col-btn btn-primary-color heading-m">
        <AddTaskMobile />
        Add new Column
      </button>
    </div>
  );
}

export default EmptyBoard