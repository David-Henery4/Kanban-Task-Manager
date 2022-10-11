import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {openAddNewBoardModal, openNavbarEditDelete, activateEditBoard} from "../../features/modals/modals.Slice";
import { openOverlay } from "../../features/overlay/overlaySlice";

const EditDelete = ({ isViewTaskActive = false }) => {
  // const [isEditBoard, setIsEditBoard] = useState(true)
  const dispatch = useDispatch()
  //
  const handleEditBoardClick = () => {
    if (isViewTaskActive === false) {
      dispatch(openAddNewBoardModal())
      dispatch(openOverlay())
      dispatch(openNavbarEditDelete())
      dispatch(activateEditBoard()) // might not be toggle
    }
  };
  //
  return (
    <div className="delete-edit">
      <button
        className="delete-edit__edit-btn del-edit-btn basicTextMedium"
        onClick={() => {
          handleEditBoardClick();
        }}
      >
        {isViewTaskActive ? "Edit Task" : "Edit Board"}
      </button>
      <button className="delete-edit__delete-btn del-edit-btn basicTextMedium">
        {isViewTaskActive ? "Delete Task" : "Delete Board"}
      </button>
    </div>
  );
};

export default EditDelete;
