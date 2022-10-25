import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openViewTaskModal } from "../features/modals/modalsSlice";
import { openOverlay } from "../features/overlay/overlaySlice";
import {
  selectTask,
  shuffleCols,
  handleDropInfo,
  handleItemCoords,
  checkNode,
} from "../features/data/dataSlice";

const ColumnTaskBox = ({
  title,
  subtasks,
  status,
  description,
  name,
  colId,
  colIndex,
  taskIndex,
  handleDragEnter,
  index,
  id,
}) => {
  const [subTaskCompleted, setSubTaskCompleted] = useState([]);
  const dispatch = useDispatch();
  //
  // const dragItem = useRef();
  const dragNode = useRef();
  //
  const handleDragStart = (e, params, statusType) => {
    // dragItem.current = params;
    // console.log(statusType)
    // e.dataTransfer.setData("status", statusType)
    dragNode.current = e.target;
    dispatch(handleItemCoords(params));
    dispatch(checkNode(e.target));
    dragNode.current.addEventListener("dragend", handleDragEnd);
  };
  //
  const handleDragEnd = (e) => {
    // dragItem.current = null;
    // let statusType = e.dataTransfer.getData("status")
    // console.log(statusType)
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
  };
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
      onDragStart={(e) => handleDragStart(e, { colIndex, taskIndex }, status)}
      onDragEnter={(e) => handleDragEnter(e, { colIndex, taskIndex })}
    >
      <h3 className="column-task__title heading-m">{title}</h3>
      <p className="column-task__status basicTextMedium">
        {subTaskCompleted.length} of {subtasks.length} subtasks
      </p>
    </div>
  );
};

export default ColumnTaskBox;
