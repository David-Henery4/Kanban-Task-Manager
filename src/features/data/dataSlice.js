import { createSlice } from "@reduxjs/toolkit";
import InitialTaskData from "../../data.json";

const initialState = {
  overallData: InitialTaskData.boards,
  activeBoardIndex: 0,
  activeBoardData: {},
  selectedTask: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addNewTask: (state, {payload}) => {
      const activeCol = state.overallData[state.activeBoardIndex].columns.find((col) => {
        return col.name === payload.status
      });
      state.overallData[state.activeBoardIndex].columns.find((col) => {
        return col.name === payload.status;
      }).tasks = [...activeCol.tasks, payload]
    },
    changeActiveBoard: (state, { payload }) => {
      state.activeBoardIndex = payload;
    },
    setActiveBoardData: (state, { payload }) => {
      state.activeBoardData = payload;
    },
    selectTask: (state, { payload }) => {
      state.selectedTask = payload;
    },
    toggleSubTaskStatus: (state, { payload }) => {
      const { sub} = payload;
      state.selectedTask.subtasks.find((st) => { 
        return st.id === sub.id;
      }).isCompleted = !state.selectedTask.subtasks.find((st) => {
        return st.id === sub.id;
      }).isCompleted;
      //
      state.overallData
        .find((b, bIndex) => {
          return b.id === state.activeBoardData.id;
        })
        .columns.find((col) => {
          return col.id === state.selectedTask.colId;
        })
        .tasks.find((task) => {
          // was on title
          return task.id === state.selectedTask.id;
        })
        .subtasks.find((st) => {
          return st.id === sub.id;
        }).isCompleted = state.selectedTask.subtasks.find((st) => {
        return st.id === sub.id;
      }).isCompleted;
    },
  },
});

export const {
  changeActiveBoard,
  setActiveBoardData,
  selectTask,
  toggleSubTaskStatus,
  addNewTask
} = dataSlice.actions;

export default dataSlice.reducer;
