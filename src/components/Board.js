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
  const { overallData, activeBoardIndex, activeBoardColumns, activeBoardData } = useSelector(
    (store) => store.data
  );
  //
  // console.log(activeBoardData.columns)
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
