import React from "react";
import { openAddNewBoardModal } from "../features/modals/modalsSlice";
import { openOverlay } from "../features/overlay/overlaySlice";
import { AddTaskMobile } from "../assets";
import { useSelector, useDispatch } from "react-redux";

const EmptyBoard = () => {
  const dispatch = useDispatch()
  const { isBoardDataEmpty } = useSelector((store) => store.modes);
  // isBoardDataEmpty
  return (
    <div className="board-empty">
      <h2 className="heading-l board-empty__heading">
        This board is empty. Create a new <span>{isBoardDataEmpty ? "board": "column"}</span> to get started.
      </h2>
      <button className="new-col-btn btn-primary-color heading-m" onClick={() => {
        dispatch(openOverlay())
        if (isBoardDataEmpty) {
          dispatch(openAddNewBoardModal())
        }
      }}>
        {isBoardDataEmpty ? (
          <span>Add Board</span>
        ) : (
          <span>
            <AddTaskMobile />
            Add new Column
          </span>
        )}
      </button>
    </div>
  );
};

export default EmptyBoard;
