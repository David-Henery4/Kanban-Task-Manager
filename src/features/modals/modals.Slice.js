import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddNewTaskActive: false,
  isAddNewColumnActive: false,
  isAddNewBoardActive: false,
  isViewTaskActive: false,
  isDeleteModalActive: false,
  isNavbarEditDeleteActive: false,
  isEditBoardActive: false,
}

// change toggles to open/close

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    activateEditBoard: (state) => {
      state.isEditBoardActive = true  
    },
    deActivateEditBoard: (state) => {
      state.isEditBoardActive = false 
    },
    openNavbarEditDelete: (state) => {
      state.isNavbarEditDeleteActive = !state.isNavbarEditDeleteActive
      // state.isNavbarEditDeleteActive = true
    },
    //
    openNewTaskModal: (state) => {
      state.isAddNewTaskActive = true;
    },
    closeNewTaskModal: (state) => {
      state.isAddNewTaskActive = false;
    },
    //
    openViewTaskModal: (state) => {
      state.isViewTaskActive = true;
    },
    closeViewTaskModal: (state) => {
      state.isViewTaskActive = false;
    },
    //
    openAddNewBoardModal: (state) => {
      state.isAddNewBoardActive = true;
    },
    closeAddNewBoardModal: (state) => {
      state.isAddNewBoardActive = false;
    },
    //
    toggleAddNewColumnModal: (state) => {
      state.isAddNewColumnActive = !state.isAddNewColumnActive;
    },
    toggleDeleteModal: (state) => {
      state.isDeleteModalActive = !state.isDeleteModalActive;
    },
  },
});

export const {
  toggleAddNewColumnModal,
  toggleDeleteModal,
  openNavbarEditDelete,
  activateEditBoard,
  deActivateEditBoard,
  closeAddNewBoardModal,
  openAddNewBoardModal,
  closeViewTaskModal,
  openViewTaskModal,
  closeNewTaskModal,
  openNewTaskModal,
} = modalsSlice.actions;

export default modalsSlice.reducer