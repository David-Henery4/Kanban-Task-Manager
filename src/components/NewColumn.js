import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openOverlay } from "../features/overlay/overlaySlice";
import {
  openAddNewBoardModal,
} from "../features/modals/modalsSlice";
import {activateEditBoard} from "../features/edit-delete-modes/modesSlice";
import { AddTaskMobile } from "../assets";

const NewColumn = () => {
  const dispatch = useDispatch();
  const {} = useSelector((store) => store.modals);
  //
  const handleNewColumnClick = () => {
    dispatch(openAddNewBoardModal());
    dispatch(activateEditBoard());
    dispatch(openOverlay());
  };
  //
  return (
    <div className="new-column">
      <button className="new-column__btn" onClick={handleNewColumnClick}>
        <span>
          <AddTaskMobile />
        </span>
        <p className="heading-xl">New Column</p>
      </button>
    </div>
  );
};

export default NewColumn;
