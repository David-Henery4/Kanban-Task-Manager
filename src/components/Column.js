import React from 'react'
import {ColumnHeading,ColumnTaskBox} from "../components";

const Column = ({name,tasks}) => {
  // console.log(name)
  // console.log(tasks)
  return (
    <div className="column">
      <ColumnHeading name={name} quantity={tasks.length}/>
      {tasks.map((task, i) => {
        // console.log(task)
        return <ColumnTaskBox key={i} {...task}/>;
      })}
    </div>
  );
}

export default Column