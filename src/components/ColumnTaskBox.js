import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { openViewTaskModal } from "../features/modals/modalsSlice";
import { openOverlay } from "../features/overlay/overlaySlice";
import { selectTask } from "../features/data/dataSlice";

const ColumnTaskBox = ({
  title,
  subtasks,
  status,
  description,
  name,
  colId,
  index,
  id,
}) => {
  const [subTaskCompleted, setSubTaskCompleted] = useState([]);
  const dispatch = useDispatch();
  //
  const dragItem = useRef();
  const dragOverItem = useRef();
  //
  const dragStart = (e, pos) => {
    dragItem.current = pos;
    console.log(e.target.innerHTML);
  };
  //
  const dragEnter = (e, pos) => {
    dragOverItem.current = pos;
    console.log(e.target.innerHTML);
  };
  //
  
  //
  const handleViewTask = () => {
    let columnName = name;
    dispatch(openViewTaskModal());
    dispatch(openOverlay());
    dispatch(
      selectTask({
        title,
        subtasks,
        status,
        description,
        subTaskCompleted,
        columnName,
        id,
        colId,
      })
    );
  };
  //
  useEffect(() => {
    const completedTasks = [];
    subtasks.forEach((task) => {
      if (task.isCompleted) {
        completedTasks.push(task);
      }
    });
    setSubTaskCompleted(completedTasks);
  }, [subtasks]);
  //
  return (
    <div
      className="column-task"
      onClick={handleViewTask}
      draggable
      onDragStart={(e) => dragStart(e, index)}
      onDragEnter={(e) => dragEnter(e, index)}
    >
      <h3 className="column-task__title heading-m">{title}</h3>
      <p className="column-task__status basicTextMedium">
        {subTaskCompleted.length} of {subtasks.length} subtasks
      </p>
    </div>
  );
};

export default ColumnTaskBox;
