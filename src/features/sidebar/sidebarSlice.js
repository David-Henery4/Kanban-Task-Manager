import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers:{
    openSidebar: (state, {payload}) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state, {payload}) => {
      state.isSidebarOpen = false;
    },
  }
})

export const {closeSidebar, openSidebar} = sidebarSlice.actions

export default sidebarSlice.reducer