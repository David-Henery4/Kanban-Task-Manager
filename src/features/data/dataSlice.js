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
      const { sub, i } = payload;
      state.selectedTask.subtasks.find((st, stIndex) => {
        return stIndex === i;
      }).isCompleted = !state.selectedTask.subtasks.find((st, stIndex) => {
        return stIndex === i;
      }).isCompleted;
      //
      state.overallData
        .find((b, bIndex) => {
          return b.id === state.activeBoardData.id;
        })
        .columns.find((col) => {
          return col.name === state.selectedTask.columnName;
        })
        .tasks.find((task) => {
          return task.title === state.selectedTask.title;
        })
        .subtasks.find((st, stIndex) => {
          return stIndex === i;
        }).isCompleted = state.selectedTask.subtasks.find((st, stIndex) => {
        return stIndex === i;
      }).isCompleted;
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
