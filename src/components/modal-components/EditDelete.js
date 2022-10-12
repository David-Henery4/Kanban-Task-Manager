import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  openAddNewBoardModal,
  openNavbarEditDelete,
  openNewTaskModal,
  openDeleteModal,
  closeViewTaskModal,
  openViewTaskEditDelete,
  closeEditDeleteModals,
} from "../../features/modals/modalsSlice";
import {
  activateEditBoard,
  activateDeleteTask,
  activateEditTask
} from "../../features/edit-delete-modes/modesSlice";
import { openOverlay } from "../../features/overlay/overlaySlice";

const EditDelete = ({ isViewTaskActive = false }) => {
  // const [isEditBoard, setIsEditBoard] = useState(true)
  const dispatch = useDispatch();
  //
  const handleEditBoardClick = () => {
    if (!isViewTaskActive) {
      dispatch(openAddNewBoardModal());
      dispatch(openOverlay());
      dispatch(openNavbarEditDelete());
      dispatch(activateEditBoard()); // might not be toggle
    }
  };
  //
  const handleEditTaskClick = () => {
    if (isViewTaskActive){
      dispatch(activateEditTask())
      dispatch(openNewTaskModal())
    }
  }
  //
  const handleDeleteClick = () => {
    if (isViewTaskActive){
      dispatch(activateDeleteTask())
      dispatch(closeViewTaskModal());
    }
    dispatch(openDeleteModal());
    dispatch(openOverlay());
    dispatch(closeEditDeleteModals());
  };
  //
  return (
    <div className="delete-edit">
      <button
        className="delete-edit__edit-btn del-edit-btn basicTextMedium"
        onClick={() => {
          handleEditBoardClick()
          handleEditTaskClick()
        }}
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
