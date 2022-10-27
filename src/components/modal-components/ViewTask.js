import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openViewTaskEditDelete } from "../../features/modals/modalsSlice";
import { EditDelete } from "../modal-components";
import {
  toggleSubTaskStatus,
  updateSubTaskCompletedQuantity,
} from "../../features/data/dataSlice";
import { TickMark, DownArrow, EditDeleteIcon } from "../../assets";

const ViewTask = () => {
  const [subTaskCompletedNumber, setSubTaskCompletedNumber] = useState(0);
  const [subTaskAmount, setSubTaskAmount] = useState(0);
  const dispatch = useDispatch();
  const { selectedTask,  activeBoardData, overallData } = useSelector(
    (store) => store.data
  );
  const { isViewTaskActive, isViewTaskEditDeleteActive } = useSelector(
    (store) => store.modals
  );
  //
  const handleSubTaskCheckboxToggle = (sub, i) => {
    dispatch(toggleSubTaskStatus({ sub, i }));
  };
  //
  useEffect(() => {
    if (activeBoardData){
      let curTasks;
      if (Object.entries(activeBoardData).length > 0) {
        const update = activeBoardData.columns.find((col) => {
        return col.name === selectedTask.columnName;
      });
      curTasks = update;
    }
    let task;
    if (curTasks) {
      const currrentTask = curTasks.tasks.find((t) => {
        return t.title === selectedTask.title;
      });
      task = currrentTask
    }
    if (task) {
      setSubTaskAmount(task.subtasks.length);
      const completedTasks = [];
      task.subtasks.forEach((task) => {
        if (task.isCompleted) {
          completedTasks.push(task);
        }
      });
      setSubTaskCompletedNumber(completedTasks.length);
    }
  }
  }, [activeBoardData, selectedTask, overallData]);
  //
  return (
    <div
      className={isViewTaskActive ? "view-task-active view-task" : "view-task"}
    >
      <div className="view-task-desc-container">
        <div className="view-task-heading">
          <h4 className="view-task__title heading-l">{selectedTask.title}</h4>
          <div className="view-task-heading__icon">
            <EditDeleteIcon
              className="view-task-heading__icon--icon"
              onClick={() => dispatch(openViewTaskEditDelete())}
            />
          </div>
          {isViewTaskEditDeleteActive && (
            <EditDelete isViewTaskActive={isViewTaskActive} />
          )}
        </div>
        <p className="view-task__text basicTextMedium">
          {selectedTask.description}
        </p>
      </div>
      <div className="view-task-subtasks">
        <h5 className="view-task-subtasks__status">
          Subtasks ({subTaskCompletedNumber} of {subTaskAmount})
        </h5>
        {/* SUBTASKS */}
        <div className="view-task-subtasks-container">
          {selectedTask.subtasks &&
            selectedTask.subtasks.map((sub, i) => {
              // console.log(sub)
              return (
                <div
                  className={
                    sub.isCompleted
                      ? "view-task-subtask"
                      : "view-task-subtask non-completed-task"
                  }
                  key={i}
                >
                  <div
                    className={
                      sub.isCompleted
                        ? "view-task-subtask-checkbox checkbox-completed"
                        : "view-task-subtask-checkbox"
                    }
                    onClick={() => handleSubTaskCheckboxToggle(sub, i)}
                  >
                    {sub.isCompleted && (
                      <TickMark className="view-task-subtask-checkbox__icon" />
                    )}
                  </div>
                  <p
                    className="view-task-subtask__text"
                    style={{
                      textDecoration: sub.isCompleted && "line-through",
                    }}
                  >
                    {sub.title}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="view-task-overall-status">
        <h5 className="view-task-overall-status__title">Current Status</h5>
        {/* MIGHT CHANGE TO INPUT SELECT */}
        <div className="view-task-overall-status-select flex-cen-cen">
          <p className="view-task-overall-status__text basicTextMedium">
            {selectedTask.status}
          </p>
          <DownArrow className="view-task-overall-status__icon" />
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
