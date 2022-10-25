import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openViewTaskModal } from "../features/modals/modalsSlice";
import { openOverlay } from "../features/overlay/overlaySlice";
import { selectTask, shuffleCols, handleDropInfo } from "../features/data/dataSlice";

const ColumnTaskBox = ({
  title,
  subtasks,
  status,
  description,
  name,
  colId,
  colIndex,
  taskIndex,
  index,
  id,
}) => {
  const {overallData, activeBoardIndex} = useSelector(store => store.data)
  const [subTaskCompleted, setSubTaskCompleted] = useState([]);
  const [dragging,setDragging] = useState(false)
  const dispatch = useDispatch();
  // console.log(colIndex,taskIndex)
  //
  const dragItem = useRef();
  const dragNode = useRef();
  //
  const handleDragStart = (e, params) => {
    console.log("drag starting", params)
    dragItem.current = params;
    dragNode.current = e.target;
    // dragItem.current = params
    console.log(dragItem.current)
    dragNode.current.addEventListener("dragend", handleDragEnd)
    setTimeout(() => {
      setDragging(true)
    }, 0)
  }
  //
  const handleDragEnter = (e, params) => {
    e.preventDefault()
    console.log("entering drag", params)
    const currentItem = dragItem.current
    console.log(currentItem)
    console.log(dragItem.current)
    console.log(dragNode.current)
    if (e.target !== dragNode.current) {
      console.log("target not the same")
      // console.log(currentItem)
    }
    // dragItem.current = params
  }
  //
  const handleDragEnd = () => {
    console.log("ending drag")
    setDragging(false)
    dragNode.current.removeEventListener("dragend", handleDragEnd)
    dragItem.current = null
    dragNode.current = null
  }
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
      onDragStart={(e) => handleDragStart(e, { colIndex, taskIndex })
      }
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
