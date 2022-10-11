import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/data/dataSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import themeReducer from "./features/theme/themeSlice";
import overlayReducer from "./features/overlay/overlaySlice";
import modalsReducer from "./features/modals/modals.Slice";


export const store = configureStore({
  reducer: {
    data: dataReducer,
    sidebar: sidebarReducer,
    theme: themeReducer,
    overlay: overlayReducer,
    modals: modalsReducer,
  },
})