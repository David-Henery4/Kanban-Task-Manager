import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openSidebar } from "../features/sidebar/sidebarSlice";
import {
  openNewTaskModal,
  openNavbarEditDelete,
} from "../features/modals/modalsSlice";
import { openOverlay } from "../features/overlay/overlaySlice";
import { MobileNav, EditDelete } from "../components/modal-components";
import {
  MobileLogo,
  DownArrow,
  EditDeleteIcon,
  LogoDark,
  LogoLight,
} from "../assets";

const Navbar = () => {
  const [isThereNoColumns, setIsThereNoColumns] = useState(false)
  const { isSidebarOpen } = useSelector((store) => store.sidebar);
  const { isNavbarEditDeleteActive } = useSelector((store) => store.modals);
  const { activeBoardData} = useSelector((store) => store.data);
  const { isBoardDataEmpty } = useSelector((store) => store.modes);
  const { isLightMode } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  //
  const openAddTask = () => {
    dispatch(openNewTaskModal());
    dispatch(openOverlay());
  };
  //
  const handleDropdownClick = () => {
    dispatch(openSidebar());
    dispatch(openOverlay());
  };
  //
  useEffect(() => {
    if (activeBoardData && activeBoardData.columns){
      const cols =  activeBoardData.columns.length <= 0
      setIsThereNoColumns(cols)
    }
  }, [activeBoardData])
  // remove-nav-logo
  return (
    <nav className="navbar">
      <MobileNav />
      <div className="navbar-left">
        {/* {isLightMode ? "" : ""} */}
        <MobileLogo className="navbar__logo" />
        <div
          className={
            isSidebarOpen
              ? "navbar__logo--tab-section remove-nav-logo"
              : "navbar__logo--tab-section"
          }
        >
          {isLightMode ? (
            <LogoDark className="navbar__logo--tab" />
          ) : (
            <LogoLight className="navbar__logo--tab" />
          )}
        </div>
        <h1 className="navbar__board-name heading-l">
          {activeBoardData ? activeBoardData.name : "Task Manager"}
        </h1>
        <DownArrow
          className="navbar__drop-down-icon"
          onClick={handleDropdownClick}
        />
      </div>
      <div className="navbar-right">
        <button
          className="navbar-add-task heading-m del-edit-btn"
          disabled={isBoardDataEmpty || isThereNoColumns ? true : false}
          onClick={openAddTask}
        >
          <span className="navbar-add-task__icon">+ </span>
          <span className="navbar-add-task__text">Add new task</span>
        </button>
        <EditDeleteIcon
          className="navbar__edit-delete-icon"
          onClick={() => {
            if (!isBoardDataEmpty) {
              dispatch(openNavbarEditDelete());
            }
          }}
        />
        {isNavbarEditDeleteActive && <EditDelete />}
      </div>
    </nav>
  );
};

export default Navbar;
