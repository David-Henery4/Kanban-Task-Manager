import { createSlice } from "@reduxjs/toolkit";
import InitialTaskData from "../../data.json";

const initialState = {
  overallData : InitialTaskData.boards,
  activeBoardIndex: 0,
  activeBoardData: {}
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers:{
    changeActiveBoard: (state, {payload}) => {
      state.activeBoardIndex = payload
    },
    setActiveBoardData: (state, {payload}) => {
      state.activeBoardData = payload
    }
  }
})

export const {changeActiveBoard,setActiveBoardData} = dataSlice.actions;

export default dataSlice.reducer;
