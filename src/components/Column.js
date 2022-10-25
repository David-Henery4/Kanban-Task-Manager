import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleDropInfo } from "../features/data/dataSlice";
import { ColumnHeading, ColumnTaskBox } from "../components";

const Column = ({ name, tasks, id, colIndex }) => {
  const [taskLength, setTaskLength] = useState(0);
  const dispatch = useDispatch();
  //
  // const onDragOver = (e) => {
  //   e.preventDefault()
  // };
  //
  // const onDrop = (e,colName) => {
  //   dispatch(handleDropInfo({e,colName}))
  // };
  //
  useEffect(() => {
    if (tasks) {
      setTaskLength(tasks.length);
    }
  }, [tasks]);
  return (
    <div
      className="column"
      // onDragOver={(e) => onDragOver(e)}
      // onDrop={(e) => onDrop(e, name)}
    >
      <ColumnHeading name={name} quantity={taskLength} />
      {tasks &&
        tasks.map((task, i) => {
          return (
            <ColumnTaskBox key={i} {...task} name={name} colId={id} taskIndex={i} colIndex={colIndex}/>
          );
        })}
    </div>
  );
};

export default Column;
