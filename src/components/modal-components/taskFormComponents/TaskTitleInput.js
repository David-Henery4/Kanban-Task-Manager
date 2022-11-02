import React from 'react'

const TaskTitleInput = ({taskTitleData}) => {
  const {isTaskNameError,task ,setTask} = taskTitleData
  return (
    <div className="add-task-form-title field-set-remove-border">
      <label
        className="add-task-form-title__title input-heading"
        htmlFor="title"
      >
        Title
      </label>
      {isTaskNameError && (
        <p className="error-input-label basicTextMedium">Can't be empty</p>
      )}
      <input
        name="title"
        id="title"
        className={
          isTaskNameError
            ? "add-task-form-title__input input-style-basic error-input-style"
            : "add-task-form-title__input input-style-basic"
        }
        type="text"
        placeholder="e.g Take coffee break"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
    </div>
  );
}

export default TaskTitleInput