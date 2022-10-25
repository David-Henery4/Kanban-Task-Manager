import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDropInfo, handleItemCoords } from "../features/data/dataSlice";
import { ColumnHeading, ColumnTaskBox } from "../components";

const Column = ({ name, tasks, id, colIndex }) => {
  const [taskLength, setTaskLength] = useState(0);
  const { itemCoords, itemNode, overallData, activeBoardIndex } = useSelector(
    (store) => store.data
  );
  const dispatch = useDispatch();
  //
  const handleDragEnter = (e, params) => {
    const colPlace = itemCoords.colIndex;
    const taskPlace = itemCoords.taskIndex;
    // let statusType = e.dataTransfer.getData("status")
    // console.log(statusType)
    if (itemNode !== e.target) {
      const newCols = JSON.parse(
        JSON.stringify(overallData[activeBoardIndex].columns)
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
  useEffect(() => {
    if (tasks) {
      setTaskLength(tasks.length);
    }
  }, [tasks]);
  return (
    <div
      className="column"
      onDragEnter={taskLength <= 0 ? (e) => handleDragEnter(e,{colIndex, taskIndex: 0}) : null}
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
