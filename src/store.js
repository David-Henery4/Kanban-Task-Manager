import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/data/dataSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import themeReducer from "./features/theme/themeSlice";
import overlayReducer from "./features/overlay/overlaySlice";
import modalsReducer from "./features/modals/modalsSlice";
import modesReducer from "./features/edit-delete-modes/modesSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    sidebar: sidebarReducer,
    theme: themeReducer,
    overlay: overlayReducer,
    modals: modalsReducer,
    modes: modesReducer,
  },
});
