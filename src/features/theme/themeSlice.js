import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLightMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, {payload}) => {
      state.isLightMode = !state.isLightMode
    }
  }
})

export const {toggleTheme} = themeSlice.actions

export default themeSlice.reducer