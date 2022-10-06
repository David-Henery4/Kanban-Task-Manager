import React from "react";
import { EmptyBoard, Column } from "../components";
import {ViewTask} from "../components/modal-components"
import { AddTaskMobile, BoardIcon } from "../assets";

//**WILL BE ADDED CONDITIONALY TO Board**/
// EMPTY-STATE = .flex-cen-cen;
// CONTENT-STATE = .flex-start-start;
//****//


const Board = () => {
  return (
    <main className="board flex-start-start">
      <ViewTask/>
      {/* <EmptyBoard/> */}
      <Column/>
      {/**/}
      <Column/>
    </main>
  );
};

export default Board;
