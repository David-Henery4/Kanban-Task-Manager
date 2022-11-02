import React from 'react'
import { UpArrow, DownArrow } from '../../../assets';

const TaskStatusSelect = ({taskStatusData}) => {
  const {isDropdownActive, task, activeBoardData, setIsDropdownActive, setTask } = taskStatusData
  return (
    <div className="add-task-form-status">
      <h5 className="add-task-form-status__title input-heading">Status</h5>
      {isDropdownActive ? (
        <DownArrow className="add-task-form-status__icon select-dropdown__icon" />
      ) : (
        <UpArrow className="add-task-form-status__icon select-dropdown__icon" />
      )}
      <input
        type="text"
        readOnly
        className="add-task-form-status-select input-style-basic"
        name="status"
        id="status"
        value={task.status}
        onClick={() => {
          setIsDropdownActive(!isDropdownActive);
        }}
      />
      <div
        className={
          isDropdownActive
            ? "select-dropdown basicTextMedium active-status-dropdown"
            : "select-dropdown basicTextMedium"
        }
      >
        {activeBoardData &&
          activeBoardData.columns &&
          activeBoardData.columns.map((col, i) => {
            return (
              <p
                className="select-dropdown__option"
                key={i}
                onClick={() => {
                  setTask({ ...task, status: col.name });
                  setIsDropdownActive(!isDropdownActive);
                }}
              >
                {col.name}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default TaskStatusSelect