import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDropInfo,
  handleItemCoords,
  updateTaskStatus,
  sortTasks
} from "../features/data/dataSlice";
import { ColumnHeading, ColumnTaskBox } from "../components";

const Column = ({ name, tasks, id, colIndex, updatedColumns }) => {
  const [taskLength, setTaskLength] = useState(0);
  const {
    itemCoords,
    itemNode,
    overallData,
    activeBoardIndex,
    activeBoardData,
  } = useSelector((store) => store.data);
  const dispatch = useDispatch();
  //
  const handleDragEnter = (e, params, id) => {
    e.preventDefault();
    // id replaced (e.target & node)
    console.log(params)
    const colPlace = itemCoords.colIndex;
    const taskPlace = itemCoords.taskIndex;
    // console.log(id , itemNode)
    // change checknode name & itemNode name in state
    // (ALSO ABSTRACT THIS TO THE STATE!!!!)
    if (itemNode !== id) {
      const newCols = JSON.parse(
        JSON.stringify(updatedColumns) // was activeboard data
      );
      newCols[params.colIndex].tasks.splice(
        params.taskIndex,
        0,
        newCols[colPlace].tasks.splice(taskPlace, 1)[0]
      );
      dispatch(handleItemCoords(params));
      dispatch(handleDropInfo(newCols));
    }
  };
  //
  // const handleGetAllCurrentBoardTasks = () => {
  //   if (activeBoardData && activeBoardData.columns) {
  //     const allTasks = [];
  //     activeBoardData.columns.forEach((col) => {
  //       allTasks.push(col.tasks);
  //     });
  //     dispatch(sortTasks(allTasks.flat()));
  //   }
  // };
  //
  // useEffect(() => {
  // handleGetAllCurrentBoardTasks()
  // },[tasks])
  //
  // SETTING ALL TASK STATUSES TO THE COLUMN NAME,
  // WHEN DRAG N DROPPIN
  // MIGHT HAVE TO DO DIFFERENT
  // useEffect(() => {
  //   if (tasks){
  //     if (tasks.length > 0){
  //       dispatch(updateTaskStatus({name,id}))
  //     }
  //   }
  // }, [overallData])
  // ******WASH HERE*******

  //
  useEffect(() => {
    if (tasks) {
      setTaskLength(tasks.length);
    }
  }, [tasks]);
  return (
    <div
      className="column"
      onDragEnter={
        taskLength <= 0
          ? (e) => handleDragEnter(e, { colIndex, taskIndex: 0 }, id)
          : null
      }
    >
      <ColumnHeading name={name} quantity={taskLength} />
      {tasks &&
        tasks.map((task, i) => {
          return (
            <ColumnTaskBox
              key={i}
              {...task}
              name={name}
              colId={id}
              taskIndex={i}
              colIndex={colIndex}
              handleDragEnter={handleDragEnter}
            />
          );
        })}
    </div>
  );
};

export default Column;
