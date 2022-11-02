import React from 'react'
import { TickMark } from '../../../assets';

const SubtasksContainer = ({subtasksContainerData}) => {
  const {subTaskAmount, subTaskCompletedNumber, selectedTask, handleSubTaskCheckboxToggle} = subtasksContainerData
  //
  return (
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
  );
}

export default SubtasksContainer