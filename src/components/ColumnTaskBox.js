import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openViewTaskModal } from "../features/modals/modalsSlice";
import { openOverlay } from "../features/overlay/overlaySlice";

const ColumnTaskBox = ({title,subtasks,status}) => {
  const [subTaskCompleted, setSubTaskCompleted] = useState([])
  const dispatch = useDispatch();
  const handleViewTask = () => {
    dispatch(openViewTaskModal());
    dispatch(openOverlay());
  };
  //
  useEffect(() => {
    const completedTasks = []
    subtasks.forEach((task) => {
      if (task.isCompleted){
        completedTasks.push(task)
      }
    })
    setSubTaskCompleted(completedTasks)
  }, [subtasks])
  //
  return (
    <div className="column-task" onClick={handleViewTask}>
      <h3 className="column-task__title heading-m">{title}</h3>
      <p className="column-task__status basicTextMedium">
        {subTaskCompleted.length} of {subtasks.length} subtasks
      </p>
    </div>
  );
};

export default ColumnTaskBox;
