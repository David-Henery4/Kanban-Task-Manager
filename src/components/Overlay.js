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
import {
  resetTaskInputValues,
  resetBoardInputValues,
} from "../features/data/dataSlice";
//
const Overlay = () => {
  const { activeBoardData } = useSelector((store) => store.data);
  const { isOverlayActive } = useSelector((store) => store.overlay);
  const { isBoardDataEmpty } = useSelector((store) => store.modes);
  const dispatch = useDispatch();
  // isBoardDataEmpty (MIGHT HAVE TO CHECK FOR THIS ON SOME CALLS)
  // REMINDER WILL HAVE TO CHECK FOR COL LENGTH ON
  // RESET TASKVALUES
  // || activeBoardData.columns.length > 0
  //
  const handleOverlay = () => {
    dispatch(closeSidebar());
    dispatch(closeDeleteModal());
    dispatch(closeOverlay());
    dispatch(closeNewTaskModal());
    dispatch(closeViewTaskModal());
    dispatch(closeAddNewBoardModal());
    dispatch(deActivateEditBoard());
    dispatch(deActivateDeleteTask());
    dispatch(deActivateEditTask());
    dispatch(closeEditDeleteModals());
    if (!isBoardDataEmpty && activeBoardData.columns.length > 0) {
      dispatch(resetBoardInputValues());
      dispatch(resetTaskInputValues());
      //   console.log("triggered");
    }
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
