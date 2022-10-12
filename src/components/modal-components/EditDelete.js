import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  openAddNewBoardModal,
  openNavbarEditDelete,
  openDeleteModal,
  closeViewTaskModal,
  openViewTaskEditDelete,
  closeEditDeleteModals,
} from "../../features/modals/modalsSlice";
import {activateEditBoard} from "../../features/edit-delete-modes/modesSlice";
import { openOverlay } from "../../features/overlay/overlaySlice";

const EditDelete = ({ isViewTaskActive = false }) => {
  // const [isEditBoard, setIsEditBoard] = useState(true)
  const dispatch = useDispatch();
  //
  const handleEditBoardClick = () => {
    if (isViewTaskActive === false) {
      dispatch(openAddNewBoardModal());
      dispatch(openOverlay());
      dispatch(openNavbarEditDelete());
      dispatch(activateEditBoard()); // might not be toggle
    }
  };
  //
  const handleDeleteClick = () => {
    dispatch(openDeleteModal());
    dispatch(closeViewTaskModal());
    dispatch(openOverlay());
    dispatch(closeEditDeleteModals());
  };
  //
  return (
    <div className="delete-edit">
      <button
        className="delete-edit__edit-btn del-edit-btn basicTextMedium"
        onClick={handleEditBoardClick}
      >
        {isViewTaskActive ? "Edit Task" : "Edit Board"}
      </button>
      <button
        className="delete-edit__delete-btn del-edit-btn basicTextMedium"
        onClick={handleDeleteClick}
      >
        {isViewTaskActive ? "Delete Task" : "Delete Board"}
      </button>
    </div>
  );
};

export default EditDelete;
