import React, { useState } from "react";
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
  AddTaskMobile,
  EditDeleteIcon,
  LogoDark,
  LogoLight,
} from "../assets";

const Navbar = () => {
  const { isSidebarOpen } = useSelector((store) => store.sidebar);
  const { isNavbarEditDeleteActive } = useSelector((store) => store.modals);
  const { activeBoardData } = useSelector((store) => store.data);
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
  // remove-nav-logo
  return (
    <nav className="navbar">
      <MobileNav />
      <div className="navbar-left">
        <MobileLogo className="navbar__logo" />
        <div
          className={
            isSidebarOpen
              ? "navbar__logo--tab-section remove-nav-logo"
              : "navbar__logo--tab-section"
          }
        >
          <LogoLight className="navbar__logo--tab" />
        </div>
        <h1 className="navbar__board-name heading-l">{activeBoardData.name}</h1>
        <DownArrow
          className="navbar__drop-down-icon"
          onClick={handleDropdownClick}
        />
      </div>
      <div className="navbar-right">
        <div className="navbar-add-task" onClick={openAddTask}>
          <AddTaskMobile className="navbar-add-task__icon" />
          <p className="navbar-add-task__text heading-m">Add new task</p>
        </div>
        <EditDeleteIcon
          className="navbar__edit-delete-icon"
          onClick={() => dispatch(openNavbarEditDelete())}
        />
        {isNavbarEditDeleteActive && <EditDelete />}
      </div>
    </nav>
  );
};

export default Navbar;
