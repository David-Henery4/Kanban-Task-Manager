import React from "react";
import { EmptyBoard, Column } from "../components";
import {ViewTask, AddTask, AddBoard, Delete} from "../components/modal-components"
import { AddTaskMobile, BoardIcon } from "../assets";

//**WILL BE ADDED CONDITIONALY TO Board**/
// EMPTY-STATE = .flex-cen-cen;
// CONTENT-STATE = .flex-start-start;
//****//


const Board = () => {
  return (
    <main className="board flex-start-start">
      {/* <ViewTask/> */}
      {/* <EmptyBoard/> */}
      {/* <AddTask/> */}
      {/* <AddBoard/> */}
      <Column/>
      {/**/}
      <Column/>
    </main>
  );
};

export default Board;
