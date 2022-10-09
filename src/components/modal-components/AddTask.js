import React from "react";
import { Cross } from "../../assets";

const AddTask = () => {
  return (
    <div className="add-task">
      <h4 className="add-task__heading heading-l">Add New Task</h4>
      <form name="add-todo" className="add-task-form">
        {/* Title Input */}
        <div className="add-task-form-title field-set-remove-border">
          <h5 className="add-task-form-title__title input-heading">Title</h5>
          <input
            className="add-task-form-title__input input-style-basic"
            type="text"
            placeholder="e.g Take coffee break"
          />
        </div>
        {/* Description Input */}
        <div className="add-task-form-desc field-set-remove-border">
          <h5 className="add-task-form-desc__title input-heading">
            Description
          </h5>
          <textarea
            className="add-task-form-desc__input input-style-basic"
            name=""
            id=""
            placeholder="It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          ></textarea>
        </div>
        {/* SUBTASK INPUT */}
        <div className="add-task-form-subtasks field-set-remove-border">
          <h5 className="add-task-form-subtasks__title input-heading">
            Subtask
          </h5>
          <div className="add-task-form-subtasks-inputs">
            <div className="add-task-form-subtasks-task">
              <input
                className="add-task-form-subtasks-task__input input-style-basic"
                type="text"
                placeholder="e.g Make Coffee"
              />
              <Cross className="add-task-form-subtasks-task__icon" />
            </div>
            <div className="add-task-form-subtasks-task">
              <input
                className="add-task-form-subtasks-task__input input-style-basic"
                type="text"
                placeholder="e.g Drink coffee & smile"
              />
              <Cross className="add-task-form-subtasks-task__icon" />
            </div>
            <button className="add-task-form-subtasks__add-subtask-btn btn-sml btn-secondary-color">
              Add New Subtask
            </button>
          </div>
        </div>
        {/* STATUS INPUT */}
        <div className="add-task-form-status field-set-remove-border">
          {/* Might not use select/might use plain div & p & take text value */}
          <h5 className="add-task-form-status__title input-heading">Status</h5>
          <select
            className="add-task-form-status-select input-style-basic"
            name="status"
            id="status"
          >
            <option
              className="add-task-form-status-select__option"
              value="doing"
            >
              Todo
            </option>
            <option
              className="add-task-form-status-select__option"
              value="doing"
            >
              Doing
            </option>
            <option
              className="add-task-form-status-select__option"
              value="done"
            >
              Done
            </option>
          </select>
        </div>
      </form>
      {/* SUBMIT BTN */}
      <button
        form="add-todo"
        className="add-task__submit-btn btn-sml btn-primary-color"
      >
        Create Task
      </button>
    </div>
  );
};

export default AddTask;