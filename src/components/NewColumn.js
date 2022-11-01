import React from "react";
import { useDispatch} from "react-redux";
import { openOverlay } from "../features/overlay/overlaySlice";
import {
  openAddNewBoardModal,
} from "../features/modals/modalsSlice";
import {activateEditBoard} from "../features/edit-delete-modes/modesSlice";

const NewColumn = () => {
  const dispatch = useDispatch();
  //
  const handleNewColumnClick = () => {
    dispatch(openAddNewBoardModal());
    dispatch(activateEditBoard());
    dispatch(openOverlay());
  };
  //
  return (
    <div className="new-column">
      <button
        className="new-column__btn heading-xl"
        onClick={handleNewColumnClick}
      >
        <span className="new-column__btn--icon">+</span>
        <p>New Column</p>
      </button>
    </div>
  );
};

export default NewColumn;
