import React from "react";
import { EmptyBoard, Column, NewColumn, ShowSidebarBtn } from "../components";
import {ViewTask, AddTask, AddBoard, Delete, MobileNav} from "../components/modal-components"
import { AddTaskMobile, BoardIcon, ShowSidebarIcon } from "../assets";

//**WILL BE ADDED CONDITIONALY TO Board**/
// EMPTY-STATE = .flex-cen-cen;
// CONTENT-STATE = .flex-start-start;
//****//


const Board = () => {
  return (
    <main className="board">
      <div className="board-content flex-start-start">
        <ViewTask/>
        {/* <EmptyBoard/> */}
        <AddTask/>
        <AddBoard/>
        {/* <Delete/> */}
        <Column />
        {/**/}
        <Column />
        {/**/}
        <NewColumn />
      </div>
      <ShowSidebarBtn/>
    </main>
  );
};

export default Board;
