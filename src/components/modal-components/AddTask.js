import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TaskTitleInput, TaskDescInput, TaskSubtaskInput, TaskStatusSelect } from "./taskFormComponents";
import {
  checkNameTitleValidtion,
  checkDynamicInputsValidation,
} from "../../validations";
import {
  addNewTask,
  resetTaskInputValues,
  editTask,
} from "../../features/data/dataSlice";
import {
  closeNewTaskModal,
  closeViewTaskModal,
  closeEditDeleteModals,
} from "../../features/modals/modalsSlice";
import { deActivateEditTask } from "../../features/edit-delete-modes/modesSlice";
import { closeOverlay } from "../../features/overlay/overlaySlice";

const AddTask = () => {
  const [subtaskErrorList, setSubtaskErrorList] = useState([]);
  const [isSubtaskNameError, setIsSubtaskNameError] = useState(false);
  const [isTaskNameError, setIsTaskNameError] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  //
  const dispatch = useDispatch();
  //
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
        id: +new Date(),
        title: "",
        isCompleted: false,
      },
    ],
  });
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
  // HERE DOING TASK NAME VALIDATION
  const handleSubmit = () => {
    const { isErrors, errorsList } = checkDynamicInputsValidation(
      task,
      "title"
    );
    const checkTitleResult = checkNameTitleValidtion(task, "title");
    //
    setSubtaskErrorList(errorsList);
    setIsSubtaskNameError(isErrors);
    setIsTaskNameError(checkTitleResult);
    //
    if (!checkTitleResult && !isErrors) {
      console.log("task name is good");
      dispatch(closeNewTaskModal());
      dispatch(closeOverlay());
      if (isEditTaskActive) {
        dispatch(editTask(task));
        dispatch(resetTaskInputValues());
        dispatch(closeEditDeleteModals());
        dispatch(closeViewTaskModal());
        dispatch(deActivateEditTask());
      }
      if (!isEditTaskActive) {
        dispatch(addNewTask(task));
      }
    }
  };
  //
  const handleSubtasksValueChange = (i) => (e) => {
    const newSubtasks = task.subtasks.map((s, ind) => {
      if (i !== ind) return s;
      return { ...s, title: e.target.value };
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
      subtasks: [
        ...task.subtasks,
        { id: +new Date(), title: "", isCompleted: false },
      ],
    });
  };
  //
  useEffect(() => {
    setTask(emptyTaskInputValues);
  }, [emptyTaskInputValues]);
  //
  useEffect(() => {
    if (isEditTaskActive) {
      setEditTaskValues();
      // NEED TO RESET VALUES IN CERTAIN PLACES
    }
  }, [isEditTaskActive]);
  //
  useEffect(() => {
    if (activeBoardData && activeBoardData.columns) {
      if (activeBoardData.columns.length > 0) {
        setTask({ ...task, status: activeBoardData.columns[0].name });
        dispatch(resetTaskInputValues());
      }
    }
  }, [activeBoardData]);
  //
  return (
    <div
      className={isAddNewTaskActive ? "add-task add-task-active" : "add-task"}
    >
      <h4 className="add-task__heading heading-l">
        {isEditTaskActive ? "Edit Task" : "Add New Task"}
      </h4>
      <form id="add-todo" name="add-todo" className="add-task-form">
        {/* Title Input */}
        <TaskTitleInput taskTitleData={{ isTaskNameError, task, setTask }} />
        {/* Description Input */}
        <TaskDescInput taskDescData={{ task, setTask }} />
        {/* SUBTASK INPUT */}
        <TaskSubtaskInput
          subtaskInputData={{
            task,
            subtaskErrorList,
            handleAddSubtask,
            handleRemoveSubtask,
            handleSubtasksValueChange,
          }}
        />
        {/* STATUS INPUT */}
        <TaskStatusSelect
          taskStatusData={{
            isDropdownActive,
            task,
            activeBoardData,
            setIsDropdownActive,
            setTask,
          }}
        />
      </form>
      {/* SUBMIT BTN */}
      <button
        form="add-todo"
        className="add-task__submit-btn btn-sml btn-primary-color"
        onClick={() => {
          handleSubmit();
        }}
      >
        {isEditTaskActive ? "Saves Changes" : "Create Task"}
      </button>
    </div>
  );
};

export default AddTask;
