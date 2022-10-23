import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewTask , resetTaskInputValues, editTask} from "../../features/data/dataSlice";
import { closeNewTaskModal, closeViewTaskModal, closeEditDeleteModals } from "../../features/modals/modalsSlice";
import { deActivateEditTask } from "../../features/edit-delete-modes/modesSlice";
import { closeOverlay } from "../../features/overlay/overlaySlice";
import { Cross } from "../../assets";

const AddTask = () => {
  const dispatch = useDispatch();
  const { activeBoardData, selectedTask, emptyTaskInputValues } = useSelector(
    (store) => store.data
  );
  const { isAddNewTaskActive } = useSelector((store) => store.modals);
  const { isEditTaskActive } = useSelector((store) => store.modes);
  //
  const [task, setTask] = useState({
    id: +new Date(),
    title: "",
    description: "",
    status: "",
    subtasks: [
      {
        title: "",
        isCompleted: false,
      },
    ],
  });
  //
  const resetEmptyTaskInputValues = () => {
    // setTask({
    //   id: +new Date(),
    //   title: "",
    //   description: "",
    //   status: activeBoardData.columns && activeBoardData.columns[0].name,
    //   subtasks: [
    //     {
    //       title: "",
    //       isCompleted: false,
    //     },
    //   ],
    // });
  }
  //
  const setEditTaskValues = () => {
    setTask({
      id: selectedTask.id,
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status,
      subtasks: selectedTask.subtasks,
    });
  };
  //
  const handleEditSubmit = () => {
    dispatch(editTask(task))
    // resetEmptyTaskInputValues()
    dispatch(resetTaskInputValues())
  };
  //
  const handleNewSubmit = () => {
    dispatch(addNewTask(task));
    console.log(task)
    // resetEmptyTaskInputValues(); // works here
    // dispatch(resetTaskInputValues()); // doesn't work here
  };
  //
  const handleSubtasksValueChange = (i) => (e) => {
    const newSubtasks = task.subtasks.map((s, ind) => {
      if (i !== ind) return s;
      return { ...s, title: e.target.value, id: +new Date() + i };
    });
    setTask({ ...task, subtasks: newSubtasks });
  };
  //
  const handleRemoveSubtask = (i) => {
    const newSubtasks = task.subtasks.filter((_, tInd) => i !== tInd);
    setTask({ ...task, subtasks: newSubtasks });
  };
  //
  const handleAddSubtask = (e) => {
    e.preventDefault();
    setTask({
      ...task,
      subtasks: [...task.subtasks, { title: "", isCompleted: false }],
    });
  };
  //
  useEffect(() => {
    setTask(emptyTaskInputValues)
  }, [emptyTaskInputValues])
  //
  useEffect(() => {
    if (isEditTaskActive) {
      setEditTaskValues();
      // NEED TO RESET VALUES IN CERTAIN PLACES
    }
  }, [isEditTaskActive]);
  //
  useEffect(() => {
    // activeBoardData.columns > 0;
    if (activeBoardData.columns) {
      if (activeBoardData.columns.length > 0){
        setTask({ ...task, status: activeBoardData.columns[0].name });
        dispatch(resetTaskInputValues());
        
      }
      // to clear inputs when adding new task (might not need!)
      // might! have to change
    }
  }, [activeBoardData.columns]);
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
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
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
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          ></textarea>
        </div>
        {/* SUBTASK INPUT */}
        <div className="add-task-form-subtasks field-set-remove-border">
          <h5 className="add-task-form-subtasks__title input-heading">
            Subtask
          </h5>
          <div className="add-task-form-subtasks-inputs">
            {task.subtasks.map((t, i) => {
              return (
                <div className="add-task-form-subtasks-task" key={i}>
                  <input
                    name="subtask"
                    className="add-task-form-subtasks-task__input input-style-basic"
                    type="text"
                    placeholder="e.g Make Coffee"
                    value={t.title}
                    onChange={handleSubtasksValueChange(i)}
                  />
                  <Cross
                    className="add-task-form-subtasks-task__icon"
                    onClick={() => handleRemoveSubtask(i)}
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
        {/* STATUS INPUT */}
        <div className="add-task-form-status field-set-remove-border">
          {/* Might not use select/might use plain div & p & take text value */}
          <h5 className="add-task-form-status__title input-heading">Status</h5>
          <select
            className="add-task-form-status-select input-style-basic"
            name="status"
            id="status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            {activeBoardData.columns &&
              activeBoardData.columns.map((col, i) => {
                return (
                  <option
                    className="add-task-form-status-select__option"
                    value={col.name}
                    key={i}
                  >
                    {col.name}
                  </option>
                );
              })}
          </select>
        </div>
      </form>
      {/* SUBMIT BTN */}
      <button
        form="add-todo"
        className="add-task__submit-btn btn-sml btn-primary-color"
        onClick={() => {
          dispatch(closeNewTaskModal());
          dispatch(closeOverlay());
          if (isEditTaskActive) {
            // turn edit off when submiting from edit mode.
            handleEditSubmit();
            dispatch(closeEditDeleteModals())
            dispatch(closeViewTaskModal())
            dispatch(deActivateEditTask())
          }
          if (!isEditTaskActive) {
            handleNewSubmit();
          }
        }}
      >
        {isEditTaskActive ? "Saves Changes" : "Create Task"}
      </button>
    </div>
  );
};

export default AddTask;
