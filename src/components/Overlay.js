import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../features/sidebar/sidebarSlice";
import {
  closeNewTaskModal,
  closeViewTaskModal,
  closeAddNewBoardModal,
  closeDeleteModal,
  closeEditDeleteModals,
} from "../features/modals/modalsSlice";
import {deActivateEditBoard, deActivateDeleteTask, deActivateEditTask} from "../features/edit-delete-modes/modesSlice";
import { closeOverlay } from "../features/overlay/overlaySlice";

const Overlay = () => {
  const { isOverlayActive } = useSelector((store) => store.overlay);
  const dispatch = useDispatch();
  //
  const handleOverlay = () => {
    dispatch(closeSidebar());
    dispatch(closeDeleteModal());
    dispatch(closeOverlay());
    dispatch(closeNewTaskModal());
    dispatch(closeViewTaskModal());
    dispatch(closeAddNewBoardModal());
    dispatch(deActivateEditBoard());
    dispatch(deActivateDeleteTask())
    dispatch(deActivateEditTask())
    dispatch(closeEditDeleteModals());
  };
  //
  return (
    <div
      className={isOverlayActive ? "overlay overlay-active" : "overlay"}
      onClick={handleOverlay}
    ></div>
  );
};

export default Overlay;
