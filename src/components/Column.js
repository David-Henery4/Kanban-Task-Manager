import React from 'react'
import {ColumnHeading,ColumnTaskBox} from "../components";

const Column = ({name,tasks,id}) => {
  // console.log(name)
  // console.log(tasks)
  // console.log(id)
  return (
    <div className="column">
      <ColumnHeading name={name} quantity={tasks.length}/>
      {tasks.map((task, i) => {
        return <ColumnTaskBox key={i} {...task} name={name} colId={id} index={i}/>;
      })}
    </div>
  );
}

export default Column