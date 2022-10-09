import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers:{
    openSidebar: (state, {payload}) => {
      
    }
  }
})

export const {} = sidebarSlice.actions

export default sidebarSlice.reducer