import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeOverlay } from "../../features/overlay/overlaySlice";
import {
  deActivateDeleteBoard,
  deActivateDeleteTask,
} from "../../features/edit-delete-modes/modesSlice";
import { closeDeleteModal } from "../../features/modals/modalsSlice";
import { deleteTask, deleteBoard, changeActiveBoard } from "../../features/data/dataSlice";

const Delete = () => {
  const dispatch = useDispatch();
  const { selectedTask, activeBoardData, activeBoardIndex } = useSelector(
    (store) => store.data
  );
  const { isDeleteModalActive } = useSelector((store) => store.modals);
  const { isDeleteTaskActive } = useSelector((store) => store.modes);
  //
  const handleCancelClick = () => {
    dispatch(closeOverlay());
    dispatch(closeDeleteModal());
    dispatch(deActivateDeleteBoard());
    dispatch(deActivateDeleteTask());
  };
  //
  const handleDeleteTask = () => {
    if (isDeleteTaskActive){
      dispatch(deleteTask());
    }
    if (!isDeleteTaskActive){
      dispatch(deleteBoard());
      dispatch(changeActiveBoard(activeBoardIndex))
    }
    //
    dispatch(closeOverlay());
    dispatch(closeDeleteModal());
    dispatch(deActivateDeleteBoard());
    dispatch(deActivateDeleteTask());
  };
  //
  return (
    <div className={isDeleteModalActive ? "delete delete-active" : "delete"}>
      <h4 className="heading-l delete__title">
        {isDeleteTaskActive ? "Delete this task" : "Delete this board"}
      </h4>
      <p className="basicTextMedium delete__text">
        {isDeleteTaskActive
          ? `Are you sure you want to delete the ‘${selectedTask.title}’ task and its subtasks? This action cannot be reversed.`
          : ` Are you sure you want to delete the ‘${activeBoardData &&  activeBoardData.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
      </p>
      <div className="delete-btns">
        <button
          className="btn-sml btn-destructive-color delete-btns__btn"
          onClick={handleDeleteTask}
        >
          Delete
        </button>
        <button
          className="btn-sml btn-secondary-color delete-btns__btn"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Delete;
