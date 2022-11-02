import React from 'react'

const TaskDescInput = ({taskDescData}) => {
  const {task,setTask} = taskDescData
  return (
    <div className="add-task-form-desc field-set-remove-border">
      <h5 className="add-task-form-desc__title input-heading">Description</h5>
      <textarea
        className="add-task-form-desc__input input-style-basic"
        name="description"
        id="description"
        placeholder="It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      ></textarea>
    </div>
  );
}

export default TaskDescInput