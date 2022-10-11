import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {closeSidebar} from "../features/sidebar/sidebarSlice";
import { closeNewTaskModal,closeViewTaskModal, closeAddNewBoardModal, deActivateEditBoard } from '../features/modals/modals.Slice';
import {closeOverlay} from "../features/overlay/overlaySlice";

const Overlay = () => {
  const { isOverlayActive } = useSelector((store) => store.overlay);
  const dispatch = useDispatch()
  //
  const handleOverlay = () => {
    dispatch(closeSidebar());
    dispatch(closeOverlay());
    dispatch(closeNewTaskModal())
    dispatch(closeViewTaskModal())
    dispatch(closeAddNewBoardModal())
    dispatch(deActivateEditBoard());
  }
  //
  return (
    <div
      className={isOverlayActive ? "overlay overlay-active" : "overlay"}
      onClick={handleOverlay}
    ></div>
  );
}

export default Overlay