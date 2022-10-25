import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./features/data/dataSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import themeReducer from "./features/theme/themeSlice";
import overlayReducer from "./features/overlay/overlaySlice";
import modalsReducer from "./features/modals/modalsSlice";
import modesReducer from "./features/edit-delete-modes/modesSlice";

// export const store = configureStore({
//   reducer: {
//     data: dataReducer,
//     sidebar: sidebarReducer,
//     theme: themeReducer,
//     overlay: overlayReducer,
//     modals: modalsReducer,
//     modes: modesReducer,
//   },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware({
//       serializableCheck: false,
//     });
//   },
// });

const rootReducer = combineReducers({
  data: dataReducer,
  sidebar: sidebarReducer,
  theme: themeReducer,
  overlay: overlayReducer,
  modals: modalsReducer,
  modes: modesReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
let persistor = persistStore(store)

export { store, persistor}