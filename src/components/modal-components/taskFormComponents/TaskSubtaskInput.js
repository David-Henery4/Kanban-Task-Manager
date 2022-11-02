import React from 'react'
import { Cross } from '../../../assets';

const TaskSubtaskInput = ({subtaskInputData}) => {
  const {task, subtaskErrorList, handleAddSubtask, handleRemoveSubtask, handleSubtasksValueChange} = subtaskInputData
  //
  return (
    <div className="add-task-form-subtasks field-set-remove-border">
      <label
        htmlFor="subtask"
        className="add-task-form-subtasks__title input-heading"
      >
        Subtask
      </label>
      <div className="add-task-form-subtasks-inputs">
        {task.subtasks.map((t, i, arr) => {
          let isErrorHere = false;
          let errorMsg = "";
          subtaskErrorList.map((sub) => {
            if (sub.id === t.id) {
              isErrorHere = true;
              errorMsg = sub.errorMsg;
            }
          });
          return (
            <div className="add-task-form-subtasks-task" key={i}>
              {isErrorHere && (
                <p className="error-input-label-2 basicTextMedium">
                  {errorMsg}
                </p>
              )}
              <input
                name="subtask"
                id="subtask"
                className={
                  isErrorHere
                    ? "add-task-form-subtasks-task__input input-style-basic error-input-style"
                    : "add-task-form-subtasks-task__input input-style-basic"
                }
                type="text"
                placeholder="e.g Make Coffee"
                value={t.title}
                onChange={handleSubtasksValueChange(i)}
              />
              <Cross
                className="add-task-form-subtasks-task__icon"
                onClick={arr.length <= 1 ? null : () => handleRemoveSubtask(i)}
              />
            </div>
          );
        })}
        <button
          className="add-task-form-subtasks__add-subtask-btn btn-sml btn-secondary-color"
          onClick={(e) => handleAddSubtask(e)}
        >
          Add New Subtask
        </button>
      </div>
    </div>
  );
}

export default TaskSubtaskInput