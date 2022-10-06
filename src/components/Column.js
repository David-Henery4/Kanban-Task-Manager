import React from 'react'
import {ColumnHeading,ColumnTaskBox} from "../components";

const Column = () => {
  return (
    <div className="column">
      <ColumnHeading />
      <ColumnTaskBox />
      <ColumnTaskBox />
      <ColumnTaskBox />
      <ColumnTaskBox />
    </div>
  );
}

export default Column