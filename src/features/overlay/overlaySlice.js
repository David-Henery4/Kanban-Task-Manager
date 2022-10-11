import { createSlice } from "@reduxjs/toolkit";

const initialState = {
isOverlayActive: false,
}

const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    openOverlay: (state, {payload}) => {
      state.isOverlayActive = true
    },
    closeOverlay: (state, {payload}) => {
      state.isOverlayActive = false
    }
  }
})

export const {closeOverlay, openOverlay} = overlaySlice.actions

export default overlaySlice.reducer