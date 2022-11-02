import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubtasksContainer, DescContainer, StatusSelect } from "./viewTaskComponents";
import {
  toggleSubTaskStatus,
} from "../../features/data/dataSlice";


const ViewTask = () => {
  const [subTaskCompletedNumber, setSubTaskCompletedNumber] = useState(0);
  const [subTaskAmount, setSubTaskAmount] = useState(0);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const dispatch = useDispatch();
  const { selectedTask, activeBoardData, overallData } = useSelector(
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
  const handleSetDefaultStatus = () => {
    if (selectedTask.status) {
      setCurrentStatus(selectedTask.status);
    }
  };
  //
  useEffect(() => {
    handleSetDefaultStatus();
  }, [selectedTask]);
  //
  useEffect(() => {
    if (activeBoardData) {
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
        task = currrentTask;
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
      <DescContainer
        descContainerData={{
          selectedTask,
          isViewTaskActive,
          isViewTaskEditDeleteActive,
        }}
      />
      <SubtasksContainer
        subtasksContainerData={{
          subTaskAmount,
          subTaskCompletedNumber,
          selectedTask,
          handleSubTaskCheckboxToggle,
        }}
      />
      <StatusSelect
        statusSelectData={{
          isDropdownActive,
          currentStatus,
          setIsDropdownActive,
          setCurrentStatus,
          activeBoardData,
          selectedTask,
        }}
      />
    </div>
  );
};

export default ViewTask;
