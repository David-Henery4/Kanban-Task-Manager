import React from 'react'
import { useSelector } from 'react-redux';

const Delete = () => {
  const { isDeleteModalActive, isViewTaskActive } = useSelector(
    (store) => store.modals
  );
  //
  return (
    <div className={isDeleteModalActive ? "delete delete-active" : "delete"}>
      <h4 className="heading-l delete__title">
        {isViewTaskActive ? "Delete this task" : "Delete this board"}
      </h4>
      <p className="basicTextMedium delete__text">
        {isViewTaskActive
          ? "Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed."
          : " Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed."}
      </p>
      <div className="delete-btns">
        <button className="btn-sml btn-destructive-color delete-btns__btn">
          Delete
        </button>
        <button className="btn-sml btn-secondary-color delete-btns__btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Delete