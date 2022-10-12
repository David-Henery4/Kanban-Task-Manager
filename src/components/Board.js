import React, { useEffect, useState } from "react";
import { EmptyBoard, Column, NewColumn, ShowSidebarBtn } from "../components";
import {ViewTask, AddTask, AddBoard, Delete, MobileNav} from "../components/modal-components"
import { AddTaskMobile, BoardIcon, ShowSidebarIcon } from "../assets";
import { setActiveBoardData } from "../features/data/dataSlice";
import { useSelector, useDispatch } from "react-redux";

//**WILL BE ADDED CONDITIONALY TO Board**/
// EMPTY-STATE = .flex-cen-cen;
// CONTENT-STATE = .flex-start-start;
//****//


const Board = () => {
  const dispatch = useDispatch()
  const [activeColumns, setActiveColumns] = useState([])
  const {overallData, activeBoardIndex} = useSelector((store) => store.data)
  //
  useEffect(() => {
    const {columns} = overallData[activeBoardIndex]
    dispatch(setActiveBoardData(overallData[activeBoardIndex]))
    setActiveColumns(columns)
  }, [overallData,activeBoardIndex])
  //
  return (
    <main className="board">
      <div className="board-content flex-start-start">
        <ViewTask/>
        {/* <EmptyBoard/> */}
        <AddTask/>
        <AddBoard/>
        <Delete/>
        {activeColumns.map((col, i) => {
          return <Column key={i} {...col}/>;
        })}
        
        {/**/}
        <NewColumn />
      </div>
      <ShowSidebarBtn/>
    </main>
  );
};

export default Board;
