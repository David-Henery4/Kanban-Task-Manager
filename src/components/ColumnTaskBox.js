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
  sortTasks,
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
  const { activeBoardData } = useSelector((store) => store.data);
  const dispatch = useDispatch();
  //
  // const dragItem = useRef();
  const dragNode = useRef();
  //
  const handleDragStart = (e, params, id) => {
    // item replaced (e.target & node)
    // dispatch(checkNode(e.target));
    dragNode.current = e.target;
    dispatch(handleItemCoords(params));
    // change checknode name & itemNode name in state
    dispatch(checkNode(id));
    dragNode.current.addEventListener("dragend", handleDragEnd);
  };
  //
  const handleDragEnd = (e) => {
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
  const handleGetAllCurrentBoardTasks = () => {
    if (activeBoardData && activeBoardData.columns) {
      const allTasks = [];
      activeBoardData.columns.forEach((col) => {
        allTasks.push(col.tasks);
      });
      dispatch(sortTasks(allTasks.flat()));
    }
  };
  // // semi works to update columns
  // but breaks DRAG N DROP
  // useEffect(() => {
  //   handleGetAllCurrentBoardTasks()
  // },[status])
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
      onDragStart={(e) => handleDragStart(e, { colIndex, taskIndex }, id)}
      // Over call more times than Enter
      // but Over has the drop icon
      onDragEnter={(e) => handleDragEnter(e, { colIndex, taskIndex }, id)}
    >
      <h3 className="column-task__title heading-m">{title}</h3>
      <p className="column-task__status basicTextMedium">
        {subTaskCompleted.length} of {subtasks.length} subtasks
      </p>
    </div>
  );
};

export default ColumnTaskBox;
