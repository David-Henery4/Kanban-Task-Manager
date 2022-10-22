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
  // did have "activeBoardColumns"
  const { overallData, activeBoardIndex, activeBoardData } = useSelector((store) => store.data);
  //
  useEffect(() => {
    
  }, [activeBoardData])
  //
  useEffect(() => {
    dispatch(setActiveBoardData(overallData[activeBoardIndex]))
  }, [overallData,activeBoardIndex])
  //
  return (
    <main className="board">
      <div className="board-content flex-start-start">
        <ViewTask />
        {activeBoardData.columns && activeBoardData.columns.length <= 0 && (
          <EmptyBoard />
        )}
        <AddTask />
        <AddBoard />
        <Delete />
        {activeBoardData.columns &&
          activeBoardData.columns.length > 0 &&
          activeBoardData.columns.map((col, i) => {
            // console.log(col)
            return <Column key={i} {...col} />;
          })}

        {/**/}
        <NewColumn />
      </div>
      <ShowSidebarBtn />
    </main>
  );
};

export default Board;
