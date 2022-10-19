import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Cross } from "../../assets";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    subtasks: [
      {
        title: "",
        isCompleted: false,
      }
    ]
  })
  //
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [status, setStatus] = useState("");
  const [numberOfSubtaskInputs, setNumberOfSubtaskInputs] = useState(2);
  //
  const { isAddNewTaskActive } = useSelector((store) => store.modals);
  const { isEditTaskActive } = useSelector((store) => store.modes);
  //
  const handleEditInputs = () => {};
  //
  const handleNewInputs = () => {
    // might add id's
    const newTask = {
      title,
      description,
      status,
    };
  };
  //
  const handleArrayOfInputs = (e) => {
    const subtask = {
      title: "",
      isCompleted: false
    }
    setSubtasks(...subtasks, subtask)
  }
  //
  return (
    <div
      className={isAddNewTaskActive ? "add-task add-task-active" : "add-task"}
    >
      <h4 className="add-task__heading heading-l">
        {isEditTaskActive ? "Edit Task" : "Add New Task"}
      </h4>
      <form name="add-todo" className="add-task-form">
        {/* Title Input */}
        <div className="add-task-form-title field-set-remove-border">
          <h5 className="add-task-form-title__title input-heading">Title</h5>
          <input
            name="title"
            id="title"
            className="add-task-form-title__input input-style-basic"
            type="text"
            placeholder="e.g Take coffee break"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Description Input */}
        <div className="add-task-form-desc field-set-remove-border">
          <h5 className="add-task-form-desc__title input-heading">
            Description
          </h5>
          <textarea
            className="add-task-form-desc__input input-style-basic"
            name="description"
            id="description"
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
            {/* <div className="add-task-form-subtasks-task">
              <input
                name="subtask"
                className="add-task-form-subtasks-task__input input-style-basic"
                type="text"
                placeholder="e.g Make Coffee"
              />
              <Cross className="add-task-form-subtasks-task__icon" />
            </div> */}
            {
            Array.from({ length: numberOfSubtaskInputs }, (_, i) => (
              <div className="add-task-form-subtasks-task" key={i}>
                <input
                  id={`subtask-${i}`}
                  name={`subtask-${i}`}
                  className="add-task-form-subtasks-task__input input-style-basic"
                  type="text"
                  placeholder="e.g Make Coffee"
                />
                <Cross className="add-task-form-subtasks-task__icon" />
              </div>
            ))}
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
        onClick={() => {
          if (isEditTaskActive) {
            handleEditInputs();
          }
          if (!isEditTaskActive) {
            handleNewInputs();
          }
        }}
      >
        {isEditTaskActive ? "Saves Changes" : "Create Task"}
      </button>
    </div>
  );
};

export default AddTask;
