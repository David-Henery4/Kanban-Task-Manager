import React from 'react'
import { DownArrow, UpArrow } from '../../../assets';
import { useDispatch } from 'react-redux';
import { updateStatusFromViewTask } from '../../../features/data/dataSlice';

const StatusSelect = ({statusSelectData}) => {
  const dispatch = useDispatch()
  const {isDropdownActive, currentStatus, setIsDropdownActive, setCurrentStatus, activeBoardData, selectedTask} = statusSelectData
  return (
    <div className="view-task-overall-status">
      <h5 className="view-task-overall-status__title">Current Status</h5>
      {/* MIGHT CHANGE TO INPUT SELECT */}
      {isDropdownActive ? (
        <DownArrow className="view-task-overall-status__icon select-dropdown__icon" />
      ) : (
        <UpArrow className="view-task-overall-status__icon select-dropdown__icon" />
      )}
      <input
        className="input-style-basic view-task-overall-status__select"
        type="text"
        readOnly
        value={currentStatus}
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
        {activeBoardData.columns &&
          activeBoardData.columns.map((col, i) => {
            const taskId = selectedTask.id;
            const colId = selectedTask.colId;
            const newStatus = col.name;
            return (
              <p
                key={i}
                className="select-dropdown__option"
                onClick={() => {
                  dispatch(
                    updateStatusFromViewTask({ taskId, colId, newStatus })
                  );
                  setCurrentStatus(newStatus);
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

export default StatusSelect