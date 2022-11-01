import React, { useEffect, useState } from "react";
import { EmptyBoard, Column, NewColumn, ShowSidebarBtn } from "../components";
import {
  ViewTask,
  AddTask,
  AddBoard,
  Delete,
} from "../components/modal-components";

import { setActiveBoardData } from "../features/data/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  activateNoBoardDataMode,
  deActivateNoBoardDataMode,
} from "../features/edit-delete-modes/modesSlice";

const Board = () => {
  const [activeColumns, setActiveColumns] = useState([])
  const [isColumnsEmpty, setIsColumnsEmpty] = useState(false);
  const dispatch = useDispatch();
  const { overallData, activeBoardIndex, activeBoardData } = useSelector(
    (store) => store.data
  );
  const { isBoardDataEmpty } = useSelector((store) => store.modes);
  //
  const handleGetAllCurrentBoardTasks = () => {
    const allTasks = [];
    if (activeBoardData && activeBoardData.columns) {
      activeBoardData.columns.forEach((col) => {
        allTasks.push(col.tasks);
      });
      //
      const newTasks = activeBoardData.columns.map((col) => {
        const groups = [];
        allTasks.flat().map((t) => {
          if (col.name === t.status) {
            groups.push(t);
          }
          return t;
        });
        return groups;
      });
      //
      const columnsCopy = JSON.parse(JSON.stringify(activeBoardData.columns))
      columnsCopy.map((col,i) => col.tasks = newTasks[i])
      console.log(columnsCopy)
      setActiveColumns(columnsCopy)
    }
  };
  //
  useEffect(() => {
    handleGetAllCurrentBoardTasks()
  },[activeBoardData])
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
    if (activeBoardData && activeBoardData.columns) {
      const areThereCols = activeBoardData.columns.length <= 0;
      setIsColumnsEmpty(areThereCols);
    }
  }, [activeBoardData]);
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
          activeColumns.map((col, i, arr) => {
            return (
              <Column key={i} {...col} colIndex={i} updatedColumns={arr} />
            );
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
