import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./features/data/dataSlice";
import sidebarSlice from "./features/sidebar/sidebarSlice";
import themeSlice from "./features/theme/themeSlice";


export const store = configureStore({
  reducer: {
    data: dataSlice,
    sidebar: sidebarSlice,
    theme: themeSlice,
  },
})