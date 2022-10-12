import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddNewTaskActive: false,
  isAddNewColumnActive: false,
  isAddNewBoardActive: false,
  isViewTaskActive: false,
  isDeleteModalActive: false,
  isNavbarEditDeleteActive: false,
  isViewTaskEditDeleteActive: false,
}

// change toggles to open/close

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    // OPEN EDIT/DELETE MODAL ON NAVBAR (Might change to toggle)
    openNavbarEditDelete: (state) => {
      state.isNavbarEditDeleteActive = !state.isNavbarEditDeleteActive;
      // state.isNavbarEditDeleteActive = true
    },
    // OPEN EDIT/DELETE MODAL ON VIEWTASK (Might change to toggle)
    openViewTaskEditDelete: (state) => {
      state.isViewTaskEditDeleteActive = !state.isViewTaskEditDeleteActive;
    },
    // CLOSE BOTH EDIT/DELETE MODALS
    closeEditDeleteModals: (state) => {
      state.isNavbarEditDeleteActive = false
      state.isViewTaskEditDeleteActive = false
    },
    // OPEN NEW TASK MODAL
    openNewTaskModal: (state) => {
      state.isAddNewTaskActive = true;
    },
    closeNewTaskModal: (state) => {
      state.isAddNewTaskActive = false;
    },
    // OPEN VIEW TASK MODAL
    openViewTaskModal: (state) => {
      state.isViewTaskActive = true;
    },
    closeViewTaskModal: (state) => {
      state.isViewTaskActive = false;
    },
    // OPEN NEW BOARD MODAL
    openAddNewBoardModal: (state) => {
      state.isAddNewBoardActive = true;
    },
    closeAddNewBoardModal: (state) => {
      state.isAddNewBoardActive = false;
    },
    // OPEN DELETE MODAL
    openDeleteModal: (state) => {
      state.isDeleteModalActive = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalActive = false;
    },
    // MIGHT NOT NEED
    toggleAddNewColumnModal: (state) => {
      state.isAddNewColumnActive = !state.isAddNewColumnActive;
    },
  },
});

export const {
  toggleAddNewColumnModal,
  openDeleteModal,
  closeDeleteModal,
  openNavbarEditDelete,
  openViewTaskEditDelete,
  closeAddNewBoardModal,
  openAddNewBoardModal,
  closeViewTaskModal,
  openViewTaskModal,
  closeNewTaskModal,
  openNewTaskModal,
  closeEditDeleteModals,
} = modalsSlice.actions;

export default modalsSlice.reducer