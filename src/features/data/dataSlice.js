import { createSlice } from "@reduxjs/toolkit";
import InitialTaskData from "../../data.json";

const initialState = {
  overallData: InitialTaskData.boards,
  activeBoardIndex: 0,
  activeBoardData: {},
  activeBoardColumns: [],
  selectedTask: {},
  selectedSubTasks: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    changeActiveBoard: (state, { payload }) => {
      state.activeBoardIndex = payload;
    },
    setActiveBoardData: (state, { payload }) => {
      state.activeBoardData = payload;
      state.activeBoardColumns = payload.columns;
    },
    selectTask: (state, { payload }) => {
      state.selectedTask = payload;
      state.selectedSubTasks = payload.subtasks;
    },
    toggleSubTaskStatus: (state, { payload }) => {
      const { i, sub } = payload;
      console.log(i);
      const currentSubTask = state.selectedSubTasks.find((subTask, index) => {
        return index === i;
      });
      currentSubTask.isCompleted = !currentSubTask.isCompleted;
      state.selectedTask.subtasks = state.selectedSubTasks;
      state.activeBoardColumns.find((col) => {
          return col.name === state.selectedTask.columnName;
        })
        .tasks.find((t) => {
          return t.title === state.selectedTask.title;
        })
        
      // was here trying to up date overall data.

      // const currentTasks = state.overallData[
      //   state.activeBoardIndex
      // ].columns.find((col) => {
      //   return col.name === state.selectedTask.columnName;
      // }).tasks;
      // console.log(i, sub)
      // console.log(currentTasks)
    },
  },
});

export const {
  changeActiveBoard,
  setActiveBoardData,
  selectTask,
  toggleSubTaskStatus,
} = dataSlice.actions;

export default dataSlice.reducer;
