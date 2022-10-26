import React from "react";
import { openAddNewBoardModal } from "../features/modals/modalsSlice";
import { openOverlay } from "../features/overlay/overlaySlice";
import { activateEditBoard } from "../features/edit-delete-modes/modesSlice";
import { AddTaskMobile } from "../assets";
import { useSelector, useDispatch } from "react-redux";

const EmptyBoard = () => {
  const dispatch = useDispatch()
  const { isBoardDataEmpty } = useSelector((store) => store.modes);
  // isBoardDataEmpty
  return (
    <div className="board-empty">
      <h2 className="heading-l board-empty__heading">
        This board is empty. Create a new{" "}
        <span>{isBoardDataEmpty ? "board" : "column"}</span> to get started.
      </h2>
      <button
        className="new-col-btn btn-primary-color heading-m board-empty__btn"
        onClick={() => {
          dispatch(openOverlay());
          if (isBoardDataEmpty) {
            dispatch(openAddNewBoardModal());
          }
          if (!isBoardDataEmpty) {
            dispatch(openAddNewBoardModal());
            dispatch(activateEditBoard());
          }
        }}
      >
        {isBoardDataEmpty ? (
          <span>Add Board</span>
        ) : (
          <span>
            +
            Add new Column
          </span>
        )}
      </button>
    </div>
  );
};

export default EmptyBoard;
