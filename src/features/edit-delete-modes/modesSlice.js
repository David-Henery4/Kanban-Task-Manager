import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditBoardActive: false,
  isDeleteBoardActive: false,
  isEditTaskActive: false,
  isDeleteTaskActive: false,
};

const modesSlice = createSlice({
  name: "modes",
  initialState,
  reducers: {
    // DELETE TASK MODE
    activateDeleteTask: (state) => {
      state.isDeleteTaskActive = true
    },
    deActivateDeleteTask: (state) => {
      state.isDeleteTaskActive = false;
    },
    // EDIT TASK MODE
    activateEditTask: (state) => {
      state.isEditTaskActive = true
    },
    deActivateEditTask: (state) => {
      state.isEditTaskActive = false;
    },
    // DELETE BOARD MODE
    activateDeleteBoard: (state) => {
      state.isDeleteBoardActive = true;
    },
    deActivateDeleteBoard: (state) => {
      state.isDeleteBoardActive = false;
    },
    // EDIT BOARD MODE
    activateEditBoard: (state) => {
      state.isEditBoardActive = true;
    },
    deActivateEditBoard: (state) => {
      state.isEditBoardActive = false;
    },
  },
});

export const { activateEditBoard, deActivateEditBoard, activateDeleteBoard, activateDeleteTask, activateEditTask, deActivateDeleteBoard, deActivateDeleteTask, deActivateEditTask } = modesSlice.actions;

export default modesSlice.reducer;
