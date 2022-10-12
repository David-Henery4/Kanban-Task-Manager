import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditBoardActive: false,
};

const modesSlice = createSlice({
  name: "modes",
  initialState,
  reducers: {
    // EDIT BOARD MODE
    activateEditBoard: (state) => {
      state.isEditBoardActive = true;
    },
    deActivateEditBoard: (state) => {
      state.isEditBoardActive = false;
    },
  },
});

export const {activateEditBoard,deActivateEditBoard} = modesSlice.actions

export default modesSlice.reducer