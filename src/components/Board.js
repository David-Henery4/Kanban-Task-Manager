import React, { useEffect, useState } from "react";
import { EmptyBoard, Column, NewColumn, ShowSidebarBtn } from "../components";
import {
  ViewTask,
  AddTask,
  AddBoard,
  Delete,
  MobileNav,
} from "../components/modal-components";
import { AddTaskMobile, BoardIcon, ShowSidebarIcon } from "../assets";
import { setActiveBoardData } from "../features/data/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  activateNoBoardDataMode,
  deActivateNoBoardDataMode,
} from "../features/edit-delete-modes/modesSlice";

//**WILL BE ADDED CONDITIONALY TO Board**/
// EMPTY-STATE = .flex-cen-cen;
// CONTENT-STATE = .flex-start-start;
//****//

const Board = () => {
  const [isColumnsEmpty, setIsColumnsEmpty] = useState(false)
  const dispatch = useDispatch();
  // did have "activeBoardColumns"
  const { overallData, activeBoardIndex, activeBoardData } = useSelector(
    (store) => store.data
  );
  const { isBoardDataEmpty } = useSelector((store) => store.modes);
  //
  useEffect(() => {
    if (overallData.length >= 1) {
      dispatch(deActivateNoBoardDataMode());
    }
    if (overallData.length <= 0) {
      dispatch(activateNoBoardDataMode());
    }
  }, [overallData]);
  //
  useEffect(() => {
    dispatch(setActiveBoardData(overallData[activeBoardIndex]));
  }, [overallData, activeBoardIndex]);
  //
  useEffect(() => {
    if (activeBoardData && activeBoardData.columns){
      const areThereCols = activeBoardData.columns.length <= 0;
      setIsColumnsEmpty(areThereCols)
    }
  }, [activeBoardData])
  //
  return (
    <main
      className={
        isBoardDataEmpty || isColumnsEmpty ? "board no-active-board" : "board"
      }
    >
      <div
        className={
          isBoardDataEmpty || isColumnsEmpty
            ? "board-content flex-cen-cen empty-board-placement"
            : "board-content flex-start-start"
        }
      >
        {activeBoardData &&
          activeBoardData.columns &&
          activeBoardData.columns.length <= 0 && <EmptyBoard />}
        {isBoardDataEmpty || (
          <>
            <ViewTask />
            <AddTask />
            <Delete />
          </>
        )}
        {isBoardDataEmpty && <EmptyBoard />}
        {/* <EmptyBoard /> */}
        <AddBoard />
        {activeBoardData &&
          activeBoardData.columns &&
          activeBoardData.columns.length > 0 &&
          activeBoardData.columns.map((col, i) => {
            
            return <Column key={i} {...col} colIndex={i} />;
          })}
        {activeBoardData &&
          activeBoardData.columns &&
          activeBoardData.columns.length > 0 && <NewColumn />}
      </div>
      <ShowSidebarBtn />
    </main>
  );
};

export default Board;
